-- Chrono-Deck Obsidian bridge v0.2: bidirectional pull + revision-safe push
-- Run this once AFTER supabase/obsidian-bridge.sql.

begin;

alter table public.arc_documents
  add column if not exists source_markdown text not null default '',
  add column if not exists source_markdown_revision integer not null default 0 check (source_markdown_revision >= 0);

create or replace function public.chrono_load_obsidian_arc(p_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select public.chrono_load_arc_document(d.arc_id) || jsonb_build_object(
    'sourceMarkdown', case
      when d.source_markdown_revision = d.revision then d.source_markdown
      else ''
    end
  )
  from public.arc_documents d
  where d.user_id = (select auth.uid())
    and d.arc_id = p_arc_id;
$$;

create or replace function public.chrono_list_obsidian_arcs()
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'arcId', d.arc_id,
      'title', d.title,
      'revision', d.revision,
      'updatedAt', d.updated_at,
      'sourceSystem', d.source_system,
      'sourcePath', d.source_path
    ) order by d.arc_id
  ), '[]'::jsonb)
  from public.arc_documents d
  where d.user_id = (select auth.uid());
$$;

create or replace function public.chrono_sync_obsidian_arc_v2(
  p_document jsonb,
  p_relationships jsonb default '[]'::jsonb,
  p_expected_revision integer default 0,
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
  if p_expected_revision is null or p_expected_revision < 0 then
    raise exception 'Expected revision must be zero or greater';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || v_arc_id, 0));

  select d.revision, d.created_at
    into v_previous_revision, v_existing_created_at
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id
  for update;

  if coalesce(v_previous_revision, 0) <> p_expected_revision then
    raise exception 'SYNC_CONFLICT: cloud revision %, expected %',
      coalesce(v_previous_revision, 0), p_expected_revision;
  end if;

  v_revision := coalesce(v_previous_revision, 0) + 1;
  v_created_at := coalesce(v_existing_created_at, now());

  insert into public.arc_documents (
    user_id, arc_id, schema_version, canonical_label, title, status, visibility,
    curriculum_role, priority, planning_status, source_system, source_path,
    source_markdown, source_markdown_revision,
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
    coalesce(p_document->>'sourceMarkdown', ''),
    v_revision,
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
    source_markdown = excluded.source_markdown,
    source_markdown_revision = excluded.source_markdown_revision,
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
  insert into public.arc_relationships (
    user_id, from_arc_id, to_arc_id, relation_type, position, updated_at
  )
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

  select public.chrono_load_obsidian_arc(v_arc_id) into v_saved;

  insert into public.arc_revisions (user_id, arc_id, revision, note, snapshot, created_at)
  values (
    v_user_id,
    v_arc_id,
    v_revision,
    coalesce(nullif(trim(p_note), ''), 'Synced from Obsidian'),
    v_saved - 'sourceMarkdown',
    v_updated_at
  );

  return v_saved;
end;
$$;

revoke all on function public.chrono_load_obsidian_arc(text) from public, anon;
revoke all on function public.chrono_list_obsidian_arcs() from public, anon;
revoke all on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) from public, anon;

grant execute on function public.chrono_load_obsidian_arc(text) to authenticated;
grant execute on function public.chrono_list_obsidian_arcs() to authenticated;
grant execute on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) to authenticated;

commit;
