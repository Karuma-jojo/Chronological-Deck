-- Chrono-Deck ARC Vault cloud storage
-- Run this once in the Supabase SQL editor for the same project used by Chrono-Deck cloud sync.

begin;

create table if not exists public.arc_documents (
  user_id uuid not null references auth.users(id) on delete cascade,
  arc_id text not null,
  schema_version integer not null default 1,
  canonical_label text not null,
  title text not null,
  status text not null default 'raw' check (status in ('raw','editing','polished')),
  visibility text not null default 'private' check (visibility in ('private','public')),
  short_conclusion text not null default '',
  experience text not null default '',
  revision integer not null default 0 check (revision >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, arc_id)
);

create table if not exists public.arc_sections (
  user_id uuid not null,
  arc_id text not null,
  section_id text not null,
  type text not null default 'notes',
  heading text not null,
  content_markdown text not null default '',
  visibility text not null default 'private' check (visibility in ('private','public')),
  position integer not null default 0 check (position >= 0),
  primary key (user_id, arc_id, section_id),
  foreign key (user_id, arc_id)
    references public.arc_documents(user_id, arc_id)
    on delete cascade
);

create table if not exists public.arc_revisions (
  revision_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arc_id text not null,
  revision integer not null check (revision > 0),
  note text not null default 'Saved',
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (user_id, arc_id, revision),
  foreign key (user_id, arc_id)
    references public.arc_documents(user_id, arc_id)
    on delete cascade
);

create index if not exists arc_documents_user_updated_idx
  on public.arc_documents (user_id, updated_at desc);
create index if not exists arc_sections_user_arc_position_idx
  on public.arc_sections (user_id, arc_id, position);
create index if not exists arc_revisions_user_arc_revision_idx
  on public.arc_revisions (user_id, arc_id, revision desc);

alter table public.arc_documents enable row level security;
alter table public.arc_sections enable row level security;
alter table public.arc_revisions enable row level security;

grant select, insert, update, delete on public.arc_documents to authenticated;
grant select, insert, update, delete on public.arc_sections to authenticated;
grant select, insert on public.arc_revisions to authenticated;

-- Documents: authenticated users can access only their own rows.
drop policy if exists "arc_documents_select_own" on public.arc_documents;
drop policy if exists "arc_documents_insert_own" on public.arc_documents;
drop policy if exists "arc_documents_update_own" on public.arc_documents;
drop policy if exists "arc_documents_delete_own" on public.arc_documents;
create policy "arc_documents_select_own"
  on public.arc_documents for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_documents_insert_own"
  on public.arc_documents for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_documents_update_own"
  on public.arc_documents for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_documents_delete_own"
  on public.arc_documents for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

-- Sections: same ownership rule, duplicated deliberately so every exposed table is protected directly.
drop policy if exists "arc_sections_select_own" on public.arc_sections;
drop policy if exists "arc_sections_insert_own" on public.arc_sections;
drop policy if exists "arc_sections_update_own" on public.arc_sections;
drop policy if exists "arc_sections_delete_own" on public.arc_sections;
create policy "arc_sections_select_own"
  on public.arc_sections for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_sections_insert_own"
  on public.arc_sections for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_sections_update_own"
  on public.arc_sections for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_sections_delete_own"
  on public.arc_sections for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

-- Revision snapshots are append-only from the browser: select + insert only.
drop policy if exists "arc_revisions_select_own" on public.arc_revisions;
drop policy if exists "arc_revisions_insert_own" on public.arc_revisions;
create policy "arc_revisions_select_own"
  on public.arc_revisions for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_revisions_insert_own"
  on public.arc_revisions for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create or replace function public.chrono_load_arc_document(p_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'schemaVersion', d.schema_version,
    'arcId', d.arc_id,
    'canonicalLabel', d.canonical_label,
    'title', d.title,
    'status', d.status,
    'visibility', d.visibility,
    'shortConclusion', d.short_conclusion,
    'experience', d.experience,
    'sections', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', s.section_id,
          'type', s.type,
          'heading', s.heading,
          'contentMarkdown', s.content_markdown,
          'visibility', s.visibility,
          'position', s.position
        ) order by s.position, s.section_id
      )
      from public.arc_sections s
      where s.user_id = d.user_id and s.arc_id = d.arc_id
    ), '[]'::jsonb),
    'revision', d.revision,
    'createdAt', d.created_at,
    'updatedAt', d.updated_at
  )
  from public.arc_documents d
  where d.user_id = (select auth.uid())
    and d.arc_id = p_arc_id;
$$;

create or replace function public.chrono_save_arc_document(
  p_document jsonb,
  p_note text default 'Saved'
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_arc_id text := nullif(trim(p_document->>'arcId'), '');
  v_previous_revision integer;
  v_existing_created_at timestamptz;
  v_revision integer;
  v_created_at timestamptz;
  v_updated_at timestamptz := now();
  v_saved jsonb;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if v_arc_id is null then
    raise exception 'ARC document is missing arcId';
  end if;

  -- Serialize saves for this user's ARC so two tabs/devices cannot reuse a revision number.
  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || v_arc_id, 0));

  select d.revision, d.created_at
    into v_previous_revision, v_existing_created_at
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id
  for update;

  v_revision := coalesce(v_previous_revision, 0) + 1;
  v_created_at := coalesce(v_existing_created_at, now());

  insert into public.arc_documents (
    user_id, arc_id, schema_version, canonical_label, title, status, visibility,
    short_conclusion, experience, revision, created_at, updated_at
  ) values (
    v_user_id,
    v_arc_id,
    coalesce((p_document->>'schemaVersion')::integer, 1),
    coalesce(nullif(p_document->>'canonicalLabel', ''), v_arc_id),
    coalesce(nullif(p_document->>'title', ''), coalesce(nullif(p_document->>'canonicalLabel', ''), v_arc_id)),
    coalesce(nullif(p_document->>'status', ''), 'raw'),
    coalesce(nullif(p_document->>'visibility', ''), 'private'),
    coalesce(p_document->>'shortConclusion', ''),
    coalesce(p_document->>'experience', ''),
    v_revision,
    v_created_at,
    v_updated_at
  )
  on conflict (user_id, arc_id) do update set
    schema_version = excluded.schema_version,
    canonical_label = excluded.canonical_label,
    title = excluded.title,
    status = excluded.status,
    visibility = excluded.visibility,
    short_conclusion = excluded.short_conclusion,
    experience = excluded.experience,
    revision = excluded.revision,
    updated_at = excluded.updated_at;

  delete from public.arc_sections
  where user_id = v_user_id and arc_id = v_arc_id;

  insert into public.arc_sections (
    user_id, arc_id, section_id, type, heading, content_markdown, visibility, position
  )
  select
    v_user_id,
    v_arc_id,
    coalesce(nullif(section.value->>'id', ''), gen_random_uuid()::text),
    coalesce(nullif(section.value->>'type', ''), 'notes'),
    coalesce(nullif(section.value->>'heading', ''), 'Untitled section'),
    coalesce(section.value->>'contentMarkdown', ''),
    coalesce(nullif(section.value->>'visibility', ''), 'private'),
    (section.ordinality - 1)::integer
  from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb))
       with ordinality as section(value, ordinality);

  select public.chrono_load_arc_document(v_arc_id) into v_saved;

  insert into public.arc_revisions (
    user_id, arc_id, revision, note, snapshot, created_at
  ) values (
    v_user_id,
    v_arc_id,
    v_revision,
    coalesce(nullif(trim(p_note), ''), 'Saved'),
    v_saved,
    v_updated_at
  );

  return v_saved;
end;
$$;

create or replace function public.chrono_restore_arc_revision(
  p_arc_id text,
  p_revision_id uuid
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_snapshot jsonb;
  v_revision integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select r.snapshot, r.revision
    into v_snapshot, v_revision
  from public.arc_revisions r
  where r.user_id = v_user_id
    and r.arc_id = p_arc_id
    and r.revision_id = p_revision_id;

  if v_snapshot is null then
    raise exception 'Revision not found for this ARC';
  end if;

  return public.chrono_save_arc_document(
    v_snapshot,
    format('Restored revision %s', v_revision)
  );
end;
$$;

revoke all on function public.chrono_load_arc_document(text) from public, anon;
revoke all on function public.chrono_save_arc_document(jsonb, text) from public, anon;
revoke all on function public.chrono_restore_arc_revision(text, uuid) from public, anon;
grant execute on function public.chrono_load_arc_document(text) to authenticated;
grant execute on function public.chrono_save_arc_document(jsonb, text) to authenticated;
grant execute on function public.chrono_restore_arc_revision(text, uuid) to authenticated;

commit;
