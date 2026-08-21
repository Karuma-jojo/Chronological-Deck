-- Chrono-Deck ARC media placement + cloud cleanup v2
-- Adds exact document placement metadata for media references and a conservative
-- orphan registry so R2 objects can be explicitly purged without deleting media
-- that is still referenced by any current ARC manifest.

begin;

alter table public.arc_media_items
  add column if not exists source_path text,
  add column if not exists line_number integer,
  add column if not exists source_heading text,
  add column if not exists embed_target text,
  add column if not exists embed_syntax text;

create index if not exists arc_media_items_user_source_line_idx
  on public.arc_media_items (user_id, arc_id, source_path, line_number, position);

create table if not exists public.arc_media_orphans (
  user_id uuid not null references auth.users(id) on delete cascade,
  object_key text not null,
  logical_arc_id text,
  content_hash text,
  file_name text,
  mime_type text,
  byte_size bigint,
  first_unreferenced_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  primary key (user_id, object_key)
);

create index if not exists arc_media_orphans_user_time_idx
  on public.arc_media_orphans (user_id, first_unreferenced_at, logical_arc_id);

alter table public.arc_media_orphans enable row level security;
grant select, insert, update, delete on public.arc_media_orphans to authenticated;

drop policy if exists "arc_media_orphans_select_own" on public.arc_media_orphans;
drop policy if exists "arc_media_orphans_insert_own" on public.arc_media_orphans;
drop policy if exists "arc_media_orphans_update_own" on public.arc_media_orphans;
drop policy if exists "arc_media_orphans_delete_own" on public.arc_media_orphans;

create policy "arc_media_orphans_select_own"
  on public.arc_media_orphans for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_orphans_insert_own"
  on public.arc_media_orphans for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_orphans_update_own"
  on public.arc_media_orphans for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_orphans_delete_own"
  on public.arc_media_orphans for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create or replace function public.chrono_sync_arc_media_manifest(
  p_arc_id text,
  p_logical_arc_id text,
  p_items jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_old_r2 jsonb := '[]'::jsonb;
  v_count integer := 0;
  v_ready integer := 0;
  v_pending integer := 0;
  v_orphans_added integer := 0;
  v_status text := 'none';
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if nullif(trim(p_arc_id), '') is null then raise exception 'arc_id is required'; end if;
  if nullif(trim(p_logical_arc_id), '') is null then raise exception 'logical_arc_id is required'; end if;
  if not exists (
    select 1 from public.arc_documents d
    where d.user_id = v_user_id and d.arc_id = p_arc_id
  ) then
    raise exception 'ARC document % does not exist', p_arc_id;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'objectKey', m.object_key,
    'logicalArcId', m.logical_arc_id,
    'contentHash', m.content_hash,
    'fileName', m.file_name,
    'mimeType', m.mime_type,
    'byteSize', m.byte_size
  )), '[]'::jsonb)
  into v_old_r2
  from public.arc_media_items m
  where m.user_id = v_user_id
    and m.arc_id = p_arc_id
    and m.storage_backend = 'r2'
    and m.status = 'uploaded'
    and m.object_key is not null;

  delete from public.arc_media_items
  where user_id = v_user_id and arc_id = p_arc_id;

  insert into public.arc_media_items (
    user_id, arc_id, logical_arc_id, slot_key, media_type, status,
    purpose, source_url, object_key, alt_text, position,
    content_hash, file_name, mime_type, byte_size, local_path,
    storage_backend, remote_etag, uploaded_at,
    source_path, line_number, source_heading, embed_target, embed_syntax,
    created_at, updated_at
  )
  select
    v_user_id,
    p_arc_id,
    p_logical_arc_id,
    coalesce(nullif(trim(item.value->>'slotKey'), ''), 'M' || lpad(item.ordinality::text, 3, '0')),
    case lower(coalesce(nullif(trim(item.value->>'mediaType'), ''), 'file'))
      when 'image' then 'image'
      when 'gif' then 'gif'
      when 'video' then 'video'
      when 'audio' then 'audio'
      when 'diagram' then 'diagram'
      when 'file' then 'file'
      else 'other'
    end,
    case lower(coalesce(nullif(trim(item.value->>'status'), ''), 'pending'))
      when 'linked' then 'linked'
      when 'uploaded' then 'uploaded'
      when 'missing' then 'missing'
      when 'skipped' then 'skipped'
      else 'pending'
    end,
    coalesce(item.value->>'purpose', ''),
    nullif(trim(item.value->>'sourceUrl'), ''),
    nullif(trim(item.value->>'objectKey'), ''),
    coalesce(item.value->>'altText', ''),
    case when (item.value->>'position') ~ '^[0-9]+$'
      then (item.value->>'position')::integer
      else (item.ordinality - 1)::integer end,
    nullif(trim(item.value->>'contentHash'), ''),
    nullif(trim(item.value->>'fileName'), ''),
    nullif(trim(item.value->>'mimeType'), ''),
    case when (item.value->>'byteSize') ~ '^[0-9]+$' then (item.value->>'byteSize')::bigint else null end,
    nullif(trim(item.value->>'localPath'), ''),
    case lower(coalesce(nullif(trim(item.value->>'storageBackend'), ''),
      case when nullif(trim(item.value->>'sourceUrl'), '') is not null
             and nullif(trim(item.value->>'objectKey'), '') is null
           then 'external' else 'r2' end))
      when 'supabase' then 'supabase'
      when 'external' then 'external'
      else 'r2'
    end,
    nullif(trim(item.value->>'remoteEtag'), ''),
    case
      when nullif(trim(item.value->>'uploadedAt'), '') is null then null
      else (item.value->>'uploadedAt')::timestamptz
    end,
    nullif(trim(item.value->>'sourcePath'), ''),
    case when (item.value->>'lineNumber') ~ '^[1-9][0-9]*$' then (item.value->>'lineNumber')::integer else null end,
    nullif(trim(item.value->>'sourceHeading'), ''),
    nullif(trim(item.value->>'embedTarget'), ''),
    nullif(item.value->>'embedSyntax', ''),
    now(),
    now()
  from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) with ordinality as item(value, ordinality);

  -- If an object became referenced again, it is no longer an orphan.
  delete from public.arc_media_orphans o
  where o.user_id = v_user_id
    and exists (
      select 1 from public.arc_media_items m
      where m.user_id = v_user_id and m.object_key = o.object_key
    );

  -- Preserve metadata for objects that disappeared from this ARC manifest and are
  -- not referenced by any other current ARC manifest. Nothing is deleted from R2
  -- automatically; the Obsidian purge command performs the destructive step.
  with old_items as (
    select value
    from jsonb_array_elements(v_old_r2)
  ), candidates as (
    select distinct on (value->>'objectKey')
      value->>'objectKey' as object_key,
      nullif(trim(value->>'logicalArcId'), '') as logical_arc_id,
      nullif(trim(value->>'contentHash'), '') as content_hash,
      nullif(trim(value->>'fileName'), '') as file_name,
      nullif(trim(value->>'mimeType'), '') as mime_type,
      case when (value->>'byteSize') ~ '^[0-9]+$' then (value->>'byteSize')::bigint else null end as byte_size
    from old_items
    where nullif(trim(value->>'objectKey'), '') is not null
  ), inserted as (
    insert into public.arc_media_orphans (
      user_id, object_key, logical_arc_id, content_hash, file_name, mime_type, byte_size,
      first_unreferenced_at, last_seen_at
    )
    select
      v_user_id, c.object_key, c.logical_arc_id, c.content_hash, c.file_name, c.mime_type, c.byte_size,
      now(), now()
    from candidates c
    where not exists (
      select 1 from public.arc_media_items m
      where m.user_id = v_user_id and m.object_key = c.object_key
    )
    on conflict (user_id, object_key) do update set
      logical_arc_id = coalesce(excluded.logical_arc_id, public.arc_media_orphans.logical_arc_id),
      content_hash = coalesce(excluded.content_hash, public.arc_media_orphans.content_hash),
      file_name = coalesce(excluded.file_name, public.arc_media_orphans.file_name),
      mime_type = coalesce(excluded.mime_type, public.arc_media_orphans.mime_type),
      byte_size = coalesce(excluded.byte_size, public.arc_media_orphans.byte_size),
      last_seen_at = now()
    returning 1
  )
  select count(*) into v_orphans_added from inserted;

  select
    count(*),
    count(*) filter (where status in ('uploaded','linked')),
    count(*) filter (where status in ('pending','missing'))
  into v_count, v_ready, v_pending
  from public.arc_media_items
  where user_id = v_user_id and arc_id = p_arc_id;

  v_status := case
    when v_count = 0 then 'none'
    when v_ready = v_count then 'complete'
    when v_ready > 0 then 'partial'
    else 'pending'
  end;

  update public.arc_documents
  set media_status = v_status, updated_at = now()
  where user_id = v_user_id and arc_id = p_arc_id;

  return jsonb_build_object(
    'arcId', p_arc_id,
    'logicalArcId', p_logical_arc_id,
    'mediaStatus', v_status,
    'items', v_count,
    'ready', v_ready,
    'pending', v_pending,
    'orphanCandidates', v_orphans_added
  );
end;
$$;

create or replace function public.chrono_load_arc_media_manifest(p_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'slotKey', m.slot_key,
      'mediaType', m.media_type,
      'status', m.status,
      'purpose', m.purpose,
      'sourceUrl', m.source_url,
      'objectKey', m.object_key,
      'altText', m.alt_text,
      'position', m.position,
      'contentHash', m.content_hash,
      'fileName', m.file_name,
      'mimeType', m.mime_type,
      'byteSize', m.byte_size,
      'localPath', m.local_path,
      'storageBackend', m.storage_backend,
      'remoteEtag', m.remote_etag,
      'uploadedAt', m.uploaded_at,
      'sourcePath', m.source_path,
      'lineNumber', m.line_number,
      'sourceHeading', m.source_heading,
      'embedTarget', m.embed_target,
      'embedSyntax', m.embed_syntax
    ) order by m.position, m.slot_key
  ), '[]'::jsonb)
  from public.arc_media_items m
  where m.user_id = (select auth.uid())
    and m.arc_id = p_arc_id;
$$;

create or replace function public.chrono_list_orphaned_arc_media(
  p_logical_arc_id text default null,
  p_limit integer default 500
)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'objectKey', o.object_key,
    'logicalArcId', o.logical_arc_id,
    'contentHash', o.content_hash,
    'fileName', o.file_name,
    'mimeType', o.mime_type,
    'byteSize', o.byte_size,
    'firstUnreferencedAt', o.first_unreferenced_at,
    'lastSeenAt', o.last_seen_at,
    'storageBackend', 'r2'
  ) order by o.first_unreferenced_at, o.object_key), '[]'::jsonb)
  from (
    select o.*
    from public.arc_media_orphans o
    where o.user_id = (select auth.uid())
      and (p_logical_arc_id is null or o.logical_arc_id = p_logical_arc_id)
      and not exists (
        select 1 from public.arc_media_items m
        where m.user_id = o.user_id and m.object_key = o.object_key
      )
    order by o.first_unreferenced_at, o.object_key
    limit greatest(1, least(coalesce(p_limit, 500), 2000))
  ) o;
$$;

create or replace function public.chrono_forget_orphaned_arc_media(p_object_key text)
returns boolean
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_deleted boolean := false;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if nullif(trim(p_object_key), '') is null then raise exception 'object_key is required'; end if;
  if exists (
    select 1 from public.arc_media_items m
    where m.user_id = v_user_id and m.object_key = p_object_key
  ) then
    raise exception 'Object is referenced by a current ARC manifest';
  end if;

  delete from public.arc_media_orphans
  where user_id = v_user_id and object_key = p_object_key;
  v_deleted := found;
  return v_deleted;
end;
$$;

revoke all on function public.chrono_sync_arc_media_manifest(text, text, jsonb) from public, anon;
revoke all on function public.chrono_load_arc_media_manifest(text) from public, anon;
revoke all on function public.chrono_list_orphaned_arc_media(text, integer) from public, anon;
revoke all on function public.chrono_forget_orphaned_arc_media(text) from public, anon;
grant execute on function public.chrono_sync_arc_media_manifest(text, text, jsonb) to authenticated;
grant execute on function public.chrono_load_arc_media_manifest(text) to authenticated;
grant execute on function public.chrono_list_orphaned_arc_media(text, integer) to authenticated;
grant execute on function public.chrono_forget_orphaned_arc_media(text) to authenticated;

commit;
