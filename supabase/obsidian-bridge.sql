-- Chrono-Deck Obsidian bridge schema extension
-- Run this once AFTER supabase/arc-vault.sql in the same Supabase project.

begin;

alter table public.arc_documents
  add column if not exists curriculum_role text not null default 'core',
  add column if not exists priority text not null default 'should_do',
  add column if not exists planning_status text not null default 'pending',
  add column if not exists source_system text not null default 'vault',
  add column if not exists source_path text not null default '';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'arc_documents_curriculum_role_check') then
    alter table public.arc_documents add constraint arc_documents_curriculum_role_check
      check (curriculum_role in ('core','supplementary','optional'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'arc_documents_priority_check') then
    alter table public.arc_documents add constraint arc_documents_priority_check
      check (priority in ('must_do','should_do','nice_to_have'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'arc_documents_planning_status_check') then
    alter table public.arc_documents add constraint arc_documents_planning_status_check
      check (planning_status in ('pending','active','deferred','parked'));
  end if;
end $$;

create table if not exists public.arc_relationships (
  relationship_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  from_arc_id text not null,
  to_arc_id text not null,
  relation_type text not null check (relation_type in (
    'prerequisite','supplementary','supplementary_to','related','deepens',
    'historical_next','depends_on','replaces','part_of','redirect_to'
  )),
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, from_arc_id, to_arc_id, relation_type),
  foreign key (user_id, from_arc_id)
    references public.arc_documents(user_id, arc_id)
    on delete cascade
);

create index if not exists arc_relationships_user_from_idx
  on public.arc_relationships (user_id, from_arc_id, relation_type, position);
create index if not exists arc_relationships_user_to_idx
  on public.arc_relationships (user_id, to_arc_id, relation_type);

alter table public.arc_relationships enable row level security;
grant select, insert, update, delete on public.arc_relationships to authenticated;

drop policy if exists "arc_relationships_select_own" on public.arc_relationships;
drop policy if exists "arc_relationships_insert_own" on public.arc_relationships;
drop policy if exists "arc_relationships_update_own" on public.arc_relationships;
drop policy if exists "arc_relationships_delete_own" on public.arc_relationships;
create policy "arc_relationships_select_own"
  on public.arc_relationships for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_relationships_insert_own"
  on public.arc_relationships for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_relationships_update_own"
  on public.arc_relationships for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_relationships_delete_own"
  on public.arc_relationships for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

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
    'curriculumRole', d.curriculum_role,
    'priority', d.priority,
    'planningStatus', d.planning_status,
    'sourceSystem', d.source_system,
    'sourcePath', d.source_path,
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
    'relationships', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'fromArcId', r.from_arc_id,
          'toArcId', r.to_arc_id,
          'relationType', r.relation_type,
          'position', r.position
        ) order by r.position, r.relation_type, r.to_arc_id
      )
      from public.arc_relationships r
      where r.user_id = d.user_id and r.from_arc_id = d.arc_id
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
  v_existing_role text;
  v_existing_priority text;
  v_existing_planning text;
  v_existing_source_system text;
  v_existing_source_path text;
  v_revision integer;
  v_created_at timestamptz;
  v_updated_at timestamptz := now();
  v_saved jsonb;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_arc_id is null then raise exception 'ARC document is missing arcId'; end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || v_arc_id, 0));

  select d.revision, d.created_at, d.curriculum_role, d.priority, d.planning_status, d.source_system, d.source_path
    into v_previous_revision, v_existing_created_at, v_existing_role, v_existing_priority,
         v_existing_planning, v_existing_source_system, v_existing_source_path
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id
  for update;

  v_revision := coalesce(v_previous_revision, 0) + 1;
  v_created_at := coalesce(v_existing_created_at, now());

  insert into public.arc_documents (
    user_id, arc_id, schema_version, canonical_label, title, status, visibility,
    curriculum_role, priority, planning_status, source_system, source_path,
    short_conclusion, experience, revision, created_at, updated_at
  ) values (
    v_user_id,
    v_arc_id,
    coalesce((p_document->>'schemaVersion')::integer, 1),
    coalesce(nullif(p_document->>'canonicalLabel', ''), v_arc_id),
    coalesce(nullif(p_document->>'title', ''), coalesce(nullif(p_document->>'canonicalLabel', ''), v_arc_id)),
    coalesce(nullif(p_document->>'status', ''), 'raw'),
    coalesce(nullif(p_document->>'visibility', ''), 'private'),
    coalesce(nullif(p_document->>'curriculumRole', ''), v_existing_role, 'core'),
    coalesce(nullif(p_document->>'priority', ''), v_existing_priority, 'should_do'),
    coalesce(nullif(p_document->>'planningStatus', ''), v_existing_planning, 'pending'),
    coalesce(nullif(p_document->>'sourceSystem', ''), v_existing_source_system, 'vault'),
    coalesce(p_document->>'sourcePath', v_existing_source_path, ''),
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
    curriculum_role = excluded.curriculum_role,
    priority = excluded.priority,
    planning_status = excluded.planning_status,
    source_system = excluded.source_system,
    source_path = excluded.source_path,
    short_conclusion = excluded.short_conclusion,
    experience = excluded.experience,
    revision = excluded.revision,
    updated_at = excluded.updated_at;

  delete from public.arc_sections where user_id = v_user_id and arc_id = v_arc_id;

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

  insert into public.arc_revisions (user_id, arc_id, revision, note, snapshot, created_at)
  values (v_user_id, v_arc_id, v_revision, coalesce(nullif(trim(p_note), ''), 'Saved'), v_saved, v_updated_at);

  return v_saved;
end;
$$;

create or replace function public.chrono_sync_obsidian_arc(
  p_document jsonb,
  p_relationships jsonb default '[]'::jsonb,
  p_note text default 'Synced from Obsidian'
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
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_arc_id is null then raise exception 'ARC document is missing arcId'; end if;

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
    curriculum_role, priority, planning_status, source_system, source_path,
    short_conclusion, experience, revision, created_at, updated_at
  ) values (
    v_user_id,
    v_arc_id,
    coalesce((p_document->>'schemaVersion')::integer, 2),
    coalesce(nullif(p_document->>'canonicalLabel', ''), v_arc_id),
    coalesce(nullif(p_document->>'title', ''), v_arc_id),
    coalesce(nullif(p_document->>'status', ''), 'raw'),
    coalesce(nullif(p_document->>'visibility', ''), 'private'),
    coalesce(nullif(p_document->>'curriculumRole', ''), 'core'),
    coalesce(nullif(p_document->>'priority', ''), 'should_do'),
    coalesce(nullif(p_document->>'planningStatus', ''), 'pending'),
    'obsidian',
    coalesce(p_document->>'sourcePath', ''),
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
    curriculum_role = excluded.curriculum_role,
    priority = excluded.priority,
    planning_status = excluded.planning_status,
    source_system = excluded.source_system,
    source_path = excluded.source_path,
    short_conclusion = excluded.short_conclusion,
    experience = excluded.experience,
    revision = excluded.revision,
    updated_at = excluded.updated_at;

  delete from public.arc_sections where user_id = v_user_id and arc_id = v_arc_id;
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

  delete from public.arc_relationships where user_id = v_user_id and from_arc_id = v_arc_id;
  insert into public.arc_relationships (user_id, from_arc_id, to_arc_id, relation_type, position, updated_at)
  select
    v_user_id,
    v_arc_id,
    nullif(trim(rel.value->>'toArcId'), ''),
    nullif(trim(rel.value->>'relationType'), ''),
    (rel.ordinality - 1)::integer,
    v_updated_at
  from jsonb_array_elements(coalesce(p_relationships, '[]'::jsonb))
       with ordinality as rel(value, ordinality)
  where nullif(trim(rel.value->>'toArcId'), '') is not null
    and nullif(trim(rel.value->>'relationType'), '') is not null
    and nullif(trim(rel.value->>'toArcId'), '') <> v_arc_id;

  select public.chrono_load_arc_document(v_arc_id) into v_saved;

  insert into public.arc_revisions (user_id, arc_id, revision, note, snapshot, created_at)
  values (v_user_id, v_arc_id, v_revision, coalesce(nullif(trim(p_note), ''), 'Synced from Obsidian'), v_saved, v_updated_at);

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
  if v_user_id is null then raise exception 'Authentication required'; end if;
  select r.snapshot, r.revision into v_snapshot, v_revision
  from public.arc_revisions r
  where r.user_id = v_user_id and r.arc_id = p_arc_id and r.revision_id = p_revision_id;
  if v_snapshot is null then raise exception 'Revision not found for this ARC'; end if;
  return public.chrono_sync_obsidian_arc(
    v_snapshot,
    coalesce(v_snapshot->'relationships', '[]'::jsonb),
    format('Restored revision %s', v_revision)
  );
end;
$$;

revoke all on function public.chrono_sync_obsidian_arc(jsonb, jsonb, text) from public, anon;
grant execute on function public.chrono_sync_obsidian_arc(jsonb, jsonb, text) to authenticated;
revoke all on function public.chrono_load_arc_document(text) from public, anon;
revoke all on function public.chrono_save_arc_document(jsonb, text) from public, anon;
revoke all on function public.chrono_restore_arc_revision(text, uuid) from public, anon;
grant execute on function public.chrono_load_arc_document(text) to authenticated;
grant execute on function public.chrono_save_arc_document(jsonb, text) to authenticated;
grant execute on function public.chrono_restore_arc_revision(text, uuid) to authenticated;

commit;
