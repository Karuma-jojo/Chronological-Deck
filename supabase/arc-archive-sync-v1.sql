-- Chrono-Deck ARC Archive Pipeline v1 — Obsidian sync integration
-- Run AFTER obsidian-sync-v2.sql and arc-archive-v1.sql.
-- Existing plugin versions need no change: logical identity and document type
-- are inferred from stable -RAW / -POLISHED document ids when the richer
-- fields are not present in the payload.

begin;

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
  v_logical_arc_id text;
  v_document_type text;
  v_media_status text;
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

  v_logical_arc_id := coalesce(
    nullif(trim(p_document->>'logicalArcId'), ''),
    case
      when v_arc_id ~* '-RAW$' then regexp_replace(v_arc_id, '-RAW$', '', 'i')
      when v_arc_id ~* '-POLISHED$' then regexp_replace(v_arc_id, '-POLISHED$', '', 'i')
      else v_arc_id
    end
  );

  v_document_type := coalesce(
    nullif(trim(p_document->>'documentType'), ''),
    case
      when v_arc_id ~* '-RAW$' then 'raw_dump'
      when v_arc_id ~* '-POLISHED$' then 'polished_extract'
      else 'canonical'
    end
  );

  v_media_status := coalesce(
    nullif(trim(p_document->>'mediaStatus'), ''),
    case when v_document_type = 'polished_extract' then 'pending' else 'none' end
  );

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
    user_id, arc_id, logical_arc_id, document_type, media_status,
    schema_version, canonical_label, title, status, visibility,
    curriculum_role, priority, planning_status, source_system, source_path,
    source_markdown, source_markdown_revision,
    short_conclusion, experience, revision, created_at, updated_at
  ) values (
    v_user_id,
    v_arc_id,
    v_logical_arc_id,
    v_document_type,
    v_media_status,
    coalesce((p_document->>'schemaVersion')::integer, 2),
    coalesce(nullif(p_document->>'canonicalLabel', ''), v_logical_arc_id),
    coalesce(nullif(p_document->>'title', ''), v_logical_arc_id),
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
    logical_arc_id = excluded.logical_arc_id,
    document_type = excluded.document_type,
    media_status = case
      when public.arc_documents.media_status in ('partial','complete')
        and excluded.media_status = 'pending'
      then public.arc_documents.media_status
      else excluded.media_status
    end,
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
    (v_saved - 'sourceMarkdown') || jsonb_build_object(
      'logicalArcId', v_logical_arc_id,
      'documentType', v_document_type,
      'mediaStatus', v_media_status
    ),
    v_updated_at
  );

  return v_saved || jsonb_build_object(
    'logicalArcId', v_logical_arc_id,
    'documentType', v_document_type,
    'mediaStatus', v_media_status
  );
end;
$$;

revoke all on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) from public, anon;
grant execute on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) to authenticated;

commit;
