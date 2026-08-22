-- Chrono-Deck Obsidian Archive Contract V3
-- Repository-side compatibility migration for the V3 Obsidian bridge.
--
-- Safe deployment order:
--   1. merge/release Obsidian Bridge 0.5.0 (it falls back to v2 automatically)
--   2. apply this migration
--
-- This migration does not create the future arc_logical_arcs authority table.
-- It makes the existing representation storage lossless enough for V3 imports.

begin;

alter table public.arc_documents
  add column if not exists source_frontmatter jsonb not null default '{}'::jsonb,
  add column if not exists archive_metadata jsonb not null default '{}'::jsonb;

alter table public.arc_sections
  add column if not exists section_role text not null default 'notes';

alter table public.arc_sections
  drop constraint if exists arc_sections_section_role_check,
  add constraint arc_sections_section_role_check
    check (section_role in (
      'opening','mission','starting_facts','investigation','false_starts','breakthrough','main_ideas',
      'proof','application','transfer','error_ledger','provenance','debt','media','conclusion',
      'chronicle','clearance','notes'
    ));

-- Paired representation identity. NOT VALID avoids retroactively rejecting an
-- old installation that may still contain legacy malformed rows, while every
-- newly inserted/updated V3 pair is checked immediately.
alter table public.arc_documents
  drop constraint if exists arc_documents_pair_identity_check,
  add constraint arc_documents_pair_identity_check
    check (
      document_type not in ('raw_dump','polished_extract')
      or (
        document_type = 'raw_dump'
        and arc_id ~* '-RAW$'
        and logical_arc_id = regexp_replace(arc_id, '-RAW$', '', 'i')
      )
      or (
        document_type = 'polished_extract'
        and arc_id ~* '-POLISHED$'
        and logical_arc_id = regexp_replace(arc_id, '-POLISHED$', '', 'i')
      )
    ) not valid;

-- One RAW and one POLISHED representation at most per logical ARC. Other
-- document types (proof/recovery/supplementary artifacts) remain repeatable.
create unique index if not exists arc_documents_user_logical_pair_unique_idx
  on public.arc_documents (user_id, logical_arc_id, document_type)
  where document_type in ('raw_dump','polished_extract');

create index if not exists arc_sections_user_role_idx
  on public.arc_sections (user_id, arc_id, section_role, position);

-- Modern cloud payload. This replaces the older reduced document loader while
-- preserving all previously returned keys.
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
    'logicalArcId', d.logical_arc_id,
    'documentType', d.document_type,
    'canonicalLabel', d.canonical_label,
    'title', d.title,
    'status', d.status,
    'visibility', d.visibility,
    'curriculumRole', d.curriculum_role,
    'priority', d.priority,
    'planningStatus', d.planning_status,
    'clearance', d.clearance,
    'mediaStatus', d.media_status,
    'tags', to_jsonb(d.tags),
    'sourceFrontmatter', d.source_frontmatter,
    'archiveMetadata', d.archive_metadata,
    'sourceSystem', d.source_system,
    'sourcePath', d.source_path,
    'shortConclusion', d.short_conclusion,
    'experience', d.experience,
    'sections', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', s.section_id,
          'sectionRole', s.section_role,
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

-- V3 deliberately wraps the already-hardened v2 transaction/revision logic.
-- This keeps the existing conflict/no-op/section-diff behavior in one place,
-- then persists the additional lossless V3 metadata.
create or replace function public.chrono_sync_obsidian_arc_v3(
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
  v_v2_saved jsonb;
  v_saved jsonb;
  v_no_op boolean := false;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_arc_id is null then raise exception 'ARC document is missing arcId'; end if;

  select public.chrono_sync_obsidian_arc_v2(
    p_document,
    p_relationships,
    p_expected_revision,
    p_note
  ) into v_v2_saved;

  v_no_op := coalesce((v_v2_saved->>'noOp')::boolean, false);

  update public.arc_documents d
  set
    tags = case
      when jsonb_typeof(p_document->'tags') = 'array'
      then array(select jsonb_array_elements_text(p_document->'tags'))
      else d.tags
    end,
    source_frontmatter = case
      when jsonb_typeof(p_document->'sourceFrontmatter') = 'object'
      then p_document->'sourceFrontmatter'
      else d.source_frontmatter
    end,
    archive_metadata = case
      when jsonb_typeof(p_document->'archiveMetadata') = 'object'
      then p_document->'archiveMetadata'
      else d.archive_metadata
    end,
    updated_at = now()
  where d.user_id = v_user_id
    and d.arc_id = v_arc_id;

  with incoming as (
    select
      nullif(section.value->>'id', '') as section_id,
      coalesce(nullif(section.value->>'sectionRole', ''), 'notes') as section_role
    from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb))
      with ordinality as section(value, ordinality)
  )
  update public.arc_sections s
  set section_role = i.section_role
  from incoming i
  where s.user_id = v_user_id
    and s.arc_id = v_arc_id
    and i.section_id is not null
    and s.section_id = i.section_id
    and s.section_role is distinct from i.section_role;

  select public.chrono_load_obsidian_arc(v_arc_id) into v_saved;
  return v_saved || jsonb_build_object('noOp', v_no_op);
end;
$$;

revoke all on function public.chrono_sync_obsidian_arc_v3(jsonb, jsonb, integer, text) from public, anon;
grant execute on function public.chrono_sync_obsidian_arc_v3(jsonb, jsonb, integer, text) to authenticated;

commit;
