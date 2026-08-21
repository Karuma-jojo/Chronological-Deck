-- Chrono-Deck ARC storage hygiene v1
-- Run after arc-clearance-semantic-completion-v1.sql and obsidian-reader-v3.sql.

begin;

-- The unique (user_id, arc_id, revision) index already supports reverse scans.
drop index if exists public.arc_revisions_user_arc_revision_idx;

create or replace function public.chrono_markdown_content_hash(p_markdown text)
returns text
language sql
immutable
set search_path = public
as $$
  select md5(
    regexp_replace(
      regexp_replace(
        replace(coalesce(p_markdown, ''), E'\r\n', E'\n'),
        '(?m)^chrono_[A-Za-z0-9_-]+[[:space:]]*:.*(?:\n|$)',
        '',
        'g'
      ),
      '[[:space:]]+$',
      '',
      'g'
    )
  );
$$;

create or replace function public.chrono_archive_storage_health()
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'logicalArcs', (select count(distinct d.logical_arc_id) from public.arc_documents d where d.user_id = (select auth.uid())),
    'documents', (select count(*) from public.arc_documents d where d.user_id = (select auth.uid())),
    'sections', (select count(*) from public.arc_sections s where s.user_id = (select auth.uid())),
    'embeddingChunks', (select count(*) from public.arc_section_embeddings e where e.user_id = (select auth.uid())),
    'embeddingReady', (select count(*) from public.arc_section_embeddings e where e.user_id = (select auth.uid()) and e.embedding is not null),
    'embeddingPending', (select count(*) from public.arc_section_embeddings e where e.user_id = (select auth.uid()) and e.embedding is null),
    'revisions', (select count(*) from public.arc_revisions r where r.user_id = (select auth.uid())),
    'markdownBytes', (select coalesce(sum(octet_length(d.source_markdown)), 0) from public.arc_documents d where d.user_id = (select auth.uid())),
    'revisionSnapshotBytes', (select coalesce(sum(pg_column_size(r.snapshot)), 0) from public.arc_revisions r where r.user_id = (select auth.uid())),
    'mediaItems', (select count(*) from public.arc_media_items m where m.user_id = (select auth.uid())),
    'mediaManifestBytes', (select coalesce(sum(m.byte_size), 0) from public.arc_media_items m where m.user_id = (select auth.uid()) and m.byte_size is not null),
    'projectRelationBytes', jsonb_build_object(
      'arcDocuments', pg_total_relation_size('public.arc_documents'::regclass),
      'arcSections', pg_total_relation_size('public.arc_sections'::regclass),
      'arcEmbeddings', pg_total_relation_size('public.arc_section_embeddings'::regclass),
      'arcRevisions', pg_total_relation_size('public.arc_revisions'::regclass),
      'arcMediaItems', pg_total_relation_size('public.arc_media_items'::regclass)
    )
  );
$$;
revoke all on function public.chrono_archive_storage_health() from public, anon;
grant execute on function public.chrono_archive_storage_health() to authenticated;

create or replace function public.chrono_prune_all_arc_revisions(
  p_keep_recent integer default 20,
  p_keep_every integer default 50
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_deleted integer := 0;
  v_arc_count integer := 0;
  r record;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  for r in select d.arc_id from public.arc_documents d where d.user_id = v_user_id order by d.arc_id loop
    v_arc_count := v_arc_count + 1;
    v_deleted := v_deleted + public.chrono_prune_arc_revisions(
      r.arc_id,
      greatest(coalesce(p_keep_recent, 20), 1),
      greatest(coalesce(p_keep_every, 50), 0)
    );
  end loop;
  return jsonb_build_object(
    'documentsScanned', v_arc_count,
    'revisionsDeleted', v_deleted,
    'keepRecent', greatest(coalesce(p_keep_recent, 20), 1),
    'keepEvery', greatest(coalesce(p_keep_every, 50), 0)
  );
end;
$$;
revoke all on function public.chrono_prune_all_arc_revisions(integer, integer) from public, anon;
grant execute on function public.chrono_prune_all_arc_revisions(integer, integer) to authenticated;

-- Incremental sync: unchanged sections remain in place and therefore retain
-- their existing semantic chunks/embeddings. A content no-op creates no revision.
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
  v_clearance text;
  v_previous_revision integer;
  v_existing_created_at timestamptz;
  v_existing_clearance text;
  v_existing_markdown text;
  v_revision integer;
  v_created_at timestamptz;
  v_updated_at timestamptz := now();
  v_saved jsonb;
  v_incoming_markdown text := coalesce(p_document->>'sourceMarkdown', '');
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_arc_id is null then raise exception 'ARC document is missing arcId'; end if;
  if p_expected_revision is null or p_expected_revision < 0 then raise exception 'Expected revision must be zero or greater'; end if;

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
  v_clearance := coalesce(
    public.chrono_normalize_clearance(p_document->>'clearance'),
    public.chrono_extract_clearance_from_markdown(v_incoming_markdown)
  );

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || v_arc_id, 0));
  select d.revision, d.created_at, d.clearance, d.source_markdown
    into v_previous_revision, v_existing_created_at, v_existing_clearance, v_existing_markdown
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id
  for update;

  if coalesce(v_previous_revision, 0) <> p_expected_revision then
    raise exception 'SYNC_CONFLICT: cloud revision %, expected %', coalesce(v_previous_revision, 0), p_expected_revision;
  end if;
  v_clearance := coalesce(v_clearance, v_existing_clearance, 'incomplete');

  if v_previous_revision is not null
     and public.chrono_markdown_content_hash(v_existing_markdown) = public.chrono_markdown_content_hash(v_incoming_markdown)
  then
    update public.arc_documents d
    set source_system = 'obsidian',
        source_path = coalesce(p_document->>'sourcePath', d.source_path),
        source_markdown = v_incoming_markdown,
        updated_at = v_updated_at
    where d.user_id = v_user_id and d.arc_id = v_arc_id;
    select public.chrono_load_obsidian_arc(v_arc_id) into v_saved;
    return v_saved || jsonb_build_object(
      'logicalArcId', v_logical_arc_id,
      'documentType', v_document_type,
      'mediaStatus', coalesce(v_saved->>'mediaStatus', v_media_status),
      'clearance', coalesce(v_saved->>'clearance', v_clearance),
      'noOp', true
    );
  end if;

  v_revision := coalesce(v_previous_revision, 0) + 1;
  v_created_at := coalesce(v_existing_created_at, now());

  insert into public.arc_documents (
    user_id, arc_id, logical_arc_id, document_type, media_status, clearance,
    schema_version, canonical_label, title, status, visibility,
    curriculum_role, priority, planning_status, source_system, source_path,
    source_markdown, source_markdown_revision,
    short_conclusion, experience, revision, created_at, updated_at
  ) values (
    v_user_id, v_arc_id, v_logical_arc_id, v_document_type, v_media_status, v_clearance,
    coalesce((p_document->>'schemaVersion')::integer, 2),
    coalesce(nullif(p_document->>'canonicalLabel', ''), v_logical_arc_id),
    coalesce(nullif(p_document->>'title', ''), v_logical_arc_id),
    coalesce(nullif(p_document->>'status', ''), 'raw'),
    coalesce(nullif(p_document->>'visibility', ''), 'private'),
    coalesce(nullif(p_document->>'curriculumRole', ''), 'core'),
    coalesce(nullif(p_document->>'priority', ''), 'should_do'),
    coalesce(nullif(p_document->>'planningStatus', ''), 'pending'),
    'obsidian', coalesce(p_document->>'sourcePath', ''), v_incoming_markdown, v_revision,
    coalesce(p_document->>'shortConclusion', ''), coalesce(p_document->>'experience', ''),
    v_revision, v_created_at, v_updated_at
  )
  on conflict (user_id, arc_id) do update set
    logical_arc_id = excluded.logical_arc_id,
    document_type = excluded.document_type,
    media_status = case
      when public.arc_documents.media_status in ('partial','complete') and excluded.media_status = 'pending'
      then public.arc_documents.media_status else excluded.media_status end,
    clearance = excluded.clearance,
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

  -- New sections only: INSERT fires the semantic chunk trigger.
  with incoming as (
    select
      coalesce(nullif(section.value->>'id', ''), 'section-' || section.ordinality::text) as section_id,
      coalesce(nullif(section.value->>'type', ''), 'notes') as type,
      coalesce(nullif(section.value->>'heading', ''), 'Untitled section') as heading,
      coalesce(section.value->>'contentMarkdown', '') as content_markdown,
      coalesce(nullif(section.value->>'visibility', ''), 'private') as visibility,
      (section.ordinality - 1)::integer as position
    from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb)) with ordinality as section(value, ordinality)
  )
  insert into public.arc_sections (user_id, arc_id, section_id, type, heading, content_markdown, visibility, position)
  select v_user_id, v_arc_id, i.section_id, i.type, i.heading, i.content_markdown, i.visibility, i.position
  from incoming i
  on conflict (user_id, arc_id, section_id) do nothing;

  -- Searchable-content changes only: this intentionally fires re-embedding.
  with incoming as (
    select
      coalesce(nullif(section.value->>'id', ''), 'section-' || section.ordinality::text) as section_id,
      coalesce(nullif(section.value->>'type', ''), 'notes') as type,
      coalesce(nullif(section.value->>'heading', ''), 'Untitled section') as heading,
      coalesce(section.value->>'contentMarkdown', '') as content_markdown,
      coalesce(nullif(section.value->>'visibility', ''), 'private') as visibility,
      (section.ordinality - 1)::integer as position
    from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb)) with ordinality as section(value, ordinality)
  )
  update public.arc_sections s
  set type = i.type, heading = i.heading, content_markdown = i.content_markdown, visibility = i.visibility, position = i.position
  from incoming i
  where s.user_id = v_user_id and s.arc_id = v_arc_id and s.section_id = i.section_id
    and (s.heading is distinct from i.heading or s.content_markdown is distinct from i.content_markdown);

  -- Metadata-only changes: no heading/content assignment, so no re-embedding.
  with incoming as (
    select
      coalesce(nullif(section.value->>'id', ''), 'section-' || section.ordinality::text) as section_id,
      coalesce(nullif(section.value->>'type', ''), 'notes') as type,
      coalesce(nullif(section.value->>'heading', ''), 'Untitled section') as heading,
      coalesce(section.value->>'contentMarkdown', '') as content_markdown,
      coalesce(nullif(section.value->>'visibility', ''), 'private') as visibility,
      (section.ordinality - 1)::integer as position
    from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb)) with ordinality as section(value, ordinality)
  )
  update public.arc_sections s
  set type = i.type, visibility = i.visibility, position = i.position
  from incoming i
  where s.user_id = v_user_id and s.arc_id = v_arc_id and s.section_id = i.section_id
    and s.heading is not distinct from i.heading
    and s.content_markdown is not distinct from i.content_markdown
    and (s.type is distinct from i.type or s.visibility is distinct from i.visibility or s.position is distinct from i.position);

  -- Deleted sections cascade-delete their semantic chunks.
  delete from public.arc_sections s
  where s.user_id = v_user_id and s.arc_id = v_arc_id
    and not exists (
      select 1
      from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb)) with ordinality as section(value, ordinality)
      where coalesce(nullif(section.value->>'id', ''), 'section-' || section.ordinality::text) = s.section_id
    );

  delete from public.arc_relationships where user_id = v_user_id and from_arc_id = v_arc_id;
  insert into public.arc_relationships (user_id, from_arc_id, to_arc_id, relation_type, position, updated_at)
  select v_user_id, v_arc_id,
         nullif(trim(rel.value->>'toArcId'), ''),
         nullif(trim(rel.value->>'relationType'), ''),
         (rel.ordinality - 1)::integer,
         v_updated_at
  from jsonb_array_elements(coalesce(p_relationships, '[]'::jsonb)) with ordinality as rel(value, ordinality)
  where nullif(trim(rel.value->>'toArcId'), '') is not null
    and nullif(trim(rel.value->>'relationType'), '') is not null
    and nullif(trim(rel.value->>'toArcId'), '') <> v_arc_id;

  select public.chrono_load_obsidian_arc(v_arc_id) into v_saved;
  insert into public.arc_revisions (user_id, arc_id, revision, note, snapshot, created_at)
  values (
    v_user_id, v_arc_id, v_revision,
    coalesce(nullif(trim(p_note), ''), 'Synced from Obsidian'),
    (v_saved - 'sourceMarkdown') || jsonb_build_object(
      'logicalArcId', v_logical_arc_id,
      'documentType', v_document_type,
      'mediaStatus', v_media_status,
      'clearance', v_clearance
    ),
    v_updated_at
  );

  return v_saved || jsonb_build_object(
    'logicalArcId', v_logical_arc_id,
    'documentType', v_document_type,
    'mediaStatus', v_media_status,
    'clearance', v_clearance,
    'noOp', false
  );
end;
$$;
revoke all on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) from public, anon;
grant execute on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) to authenticated;

commit;
