-- Chrono-Deck ARC media R2 metadata v1
-- Keeps Supabase as metadata/index while allowing binary objects to live in R2.
-- The existing private Supabase Storage bucket remains a temporary fallback until
-- R2 upload/download is validated end-to-end.

begin;

alter table public.arc_media_items
  add column if not exists storage_backend text not null default 'r2',
  add column if not exists remote_etag text,
  add column if not exists uploaded_at timestamptz;

alter table public.arc_media_items
  drop constraint if exists arc_media_items_storage_backend_check,
  add constraint arc_media_items_storage_backend_check
    check (storage_backend in ('r2','supabase','external'));

create index if not exists arc_media_items_user_backend_idx
  on public.arc_media_items (user_id, storage_backend, logical_arc_id, status);

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
  v_count integer := 0;
  v_ready integer := 0;
  v_pending integer := 0;
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

  delete from public.arc_media_items
  where user_id = v_user_id and arc_id = p_arc_id;

  insert into public.arc_media_items (
    user_id, arc_id, logical_arc_id, slot_key, media_type, status,
    purpose, source_url, object_key, alt_text, position,
    content_hash, file_name, mime_type, byte_size, local_path,
    storage_backend, remote_etag, uploaded_at,
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
    (item.ordinality - 1)::integer,
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
    now(),
    now()
  from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) with ordinality as item(value, ordinality);

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
    'pending', v_pending
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
      'uploadedAt', m.uploaded_at
    ) order by m.position, m.slot_key
  ), '[]'::jsonb)
  from public.arc_media_items m
  where m.user_id = (select auth.uid())
    and m.arc_id = p_arc_id;
$$;

revoke all on function public.chrono_sync_arc_media_manifest(text, text, jsonb) from public, anon;
revoke all on function public.chrono_load_arc_media_manifest(text) from public, anon;
grant execute on function public.chrono_sync_arc_media_manifest(text, text, jsonb) to authenticated;
grant execute on function public.chrono_load_arc_media_manifest(text) to authenticated;

commit;
