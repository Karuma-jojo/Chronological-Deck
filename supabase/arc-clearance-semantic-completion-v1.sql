-- Chrono-Deck academic clearance + semantic completion filter v1
-- Run AFTER arc-archive-v1.sql, arc-archive-sync-v1.sql, and arc-semantic-search-v1.sql.
-- Separates academic clearance from planning_status so completedOnly semantic search
-- does not depend on workflow/planning metadata.

begin;

alter table public.arc_documents
  add column if not exists clearance text not null default 'incomplete';

alter table public.arc_documents
  drop constraint if exists arc_documents_clearance_check,
  add constraint arc_documents_clearance_check
    check (clearance in ('incomplete','core_cleared','core_cleared_mastery_pending','fully_mastered'));

create index if not exists arc_documents_user_clearance_idx
  on public.arc_documents (user_id, clearance, logical_arc_id, document_type);

create or replace function public.chrono_normalize_clearance(p_value text)
returns text
language sql
immutable
set search_path = public
as $$
  select case regexp_replace(lower(btrim(coalesce(p_value, ''))), '[^a-z0-9]+', '_', 'g')
    when 'incomplete' then 'incomplete'
    when 'core_cleared' then 'core_cleared'
    when 'core_cleared_mastery_pending' then 'core_cleared_mastery_pending'
    when 'core_cleared_mastery_pending_' then 'core_cleared_mastery_pending'
    when 'fully_mastered' then 'fully_mastered'
    when 'mastered' then 'fully_mastered'
    else null
  end;
$$;

create or replace function public.chrono_extract_clearance_from_markdown(p_markdown text)
returns text
language plpgsql
immutable
set search_path = public
as $$
declare
  v_text text := coalesce(p_markdown, '');
  v_match text[];
  v_clearance text;
  v_status text;
  v_mastery text;
begin
  if btrim(v_text) = '' then return null; end if;

  v_match := regexp_match(v_text, '(?im)^[[:space:]]*clearance[[:space:]]*:[[:space:]]*["'']?([^"''\r\n]+)["'']?[[:space:]]*$');
  if v_match is not null then
    v_clearance := public.chrono_normalize_clearance(v_match[1]);
    if v_clearance is not null then return v_clearance; end if;
  end if;

  -- Legacy canonical ARC notes sometimes used `status: CORE CLEARED`
  -- for academic clearance before document_status and clearance were separated.
  v_match := regexp_match(v_text, '(?im)^[[:space:]]*status[[:space:]]*:[[:space:]]*["'']?([^"''\r\n]+)["'']?[[:space:]]*$');
  if v_match is not null then
    v_status := public.chrono_normalize_clearance(v_match[1]);
  end if;

  if v_status = 'core_cleared' then
    v_match := regexp_match(v_text, '(?im)^[[:space:]]*mastery[[:space:]]*:[[:space:]]*["'']?([^"''\r\n]+)["'']?[[:space:]]*$');
    if v_match is not null then v_mastery := lower(btrim(v_match[1])); end if;
    if coalesce(v_mastery, '') like 'pending%' then
      return 'core_cleared_mastery_pending';
    end if;
    return 'core_cleared';
  end if;

  if v_status = 'fully_mastered' then return 'fully_mastered'; end if;
  if v_status = 'incomplete' then return 'incomplete'; end if;
  return null;
end;
$$;

update public.arc_documents d
set clearance = public.chrono_extract_clearance_from_markdown(d.source_markdown)
where public.chrono_extract_clearance_from_markdown(d.source_markdown) is not null;

-- Legacy imported notes may have no source_markdown but still contain an explicit
-- clearance statement in their section text. Only recognize explicit phrases.
update public.arc_documents d
set clearance = 'core_cleared'
where d.clearance = 'incomplete'
  and exists (
    select 1
    from public.arc_sections s
    where s.user_id = d.user_id
      and s.arc_id = d.arc_id
      and (
        lower(s.content_markdown) like '%**clearance:** core cleared%'
        or lower(s.content_markdown) like '%status: "core cleared"%'
        or lower(s.content_markdown) like '%status: core cleared%'
      )
  );

create or replace function public.chrono_load_arc_bundle(p_logical_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'arcId', d.arc_id,
      'logicalArcId', d.logical_arc_id,
      'documentType', d.document_type,
      'title', d.title,
      'status', d.status,
      'clearance', d.clearance,
      'mediaStatus', d.media_status,
      'tags', d.tags,
      'revision', d.revision,
      'updatedAt', d.updated_at
    ) order by
      case d.document_type when 'polished_extract' then 0 when 'canonical' then 1 when 'raw_dump' then 2 else 3 end,
      d.updated_at desc
  ), '[]'::jsonb)
  from public.arc_documents d
  where d.user_id = (select auth.uid())
    and d.logical_arc_id = p_logical_arc_id;
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
  v_logical_arc_id text;
  v_document_type text;
  v_media_status text;
  v_clearance text;
  v_previous_revision integer;
  v_existing_created_at timestamptz;
  v_existing_clearance text;
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

  v_clearance := coalesce(
    public.chrono_normalize_clearance(p_document->>'clearance'),
    public.chrono_extract_clearance_from_markdown(p_document->>'sourceMarkdown')
  );

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || v_arc_id, 0));

  select d.revision, d.created_at, d.clearance
    into v_previous_revision, v_existing_created_at, v_existing_clearance
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id
  for update;

  if coalesce(v_previous_revision, 0) <> p_expected_revision then
    raise exception 'SYNC_CONFLICT: cloud revision %, expected %',
      coalesce(v_previous_revision, 0), p_expected_revision;
  end if;

  v_clearance := coalesce(v_clearance, v_existing_clearance, 'incomplete');
  v_revision := coalesce(v_previous_revision, 0) + 1;
  v_created_at := coalesce(v_existing_created_at, now());

  insert into public.arc_documents (
    user_id, arc_id, logical_arc_id, document_type, media_status, clearance,
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
    v_clearance,
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
      'mediaStatus', v_media_status,
      'clearance', v_clearance
    ),
    v_updated_at
  );

  return v_saved || jsonb_build_object(
    'logicalArcId', v_logical_arc_id,
    'documentType', v_document_type,
    'mediaStatus', v_media_status,
    'clearance', v_clearance
  );
end;
$$;

revoke all on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) from public, anon;
grant execute on function public.chrono_sync_obsidian_arc_v2(jsonb, jsonb, integer, text) to authenticated;

create or replace function public.chrono_hybrid_search_arc_chunks(
  p_query text,
  p_query_embedding extensions.vector(384),
  p_logical_arc_id text default null,
  p_document_type text default null,
  p_completed_only boolean default true,
  p_limit integer default 20
)
returns table (
  arc_id text,
  logical_arc_id text,
  document_type text,
  title text,
  section_id text,
  section_heading text,
  chunk_index integer,
  content text,
  semantic_score double precision,
  lexical_score double precision,
  hybrid_score double precision
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with q as (
    select case
      when btrim(coalesce(p_query, '')) = '' then null::tsquery
      else websearch_to_tsquery('english', p_query)
    end as query
  ), scored as (
    select
      e.arc_id,
      e.logical_arc_id,
      e.document_type,
      d.title,
      e.section_id,
      e.section_heading,
      e.chunk_index,
      e.content,
      greatest(-1.0, least(1.0, 1.0 - (e.embedding <=> p_query_embedding)))::double precision as semantic_score,
      case
        when q.query is null then 0.0
        else ts_rank_cd(e.search_vector, q.query)::double precision
      end as raw_lexical_score
    from public.arc_section_embeddings e
    join public.arc_documents d
      on d.user_id = e.user_id and d.arc_id = e.arc_id
    cross join q
    where e.user_id = (select auth.uid())
      and e.embedding is not null
      and (p_logical_arc_id is null or e.logical_arc_id = p_logical_arc_id)
      and (p_document_type is null or e.document_type = p_document_type)
      and (
        not p_completed_only
        or d.clearance in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      )
  )
  select
    s.arc_id,
    s.logical_arc_id,
    s.document_type,
    s.title,
    s.section_id,
    s.section_heading,
    s.chunk_index,
    s.content,
    s.semantic_score,
    (s.raw_lexical_score / (1.0 + s.raw_lexical_score))::double precision as lexical_score,
    (
      0.72 * greatest(0.0, s.semantic_score)
      + 0.28 * (s.raw_lexical_score / (1.0 + s.raw_lexical_score))
    )::double precision as hybrid_score
  from scored s
  order by hybrid_score desc, semantic_score desc, logical_arc_id, arc_id, section_id, chunk_index
  limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;

create or replace function public.chrono_semantic_related_arcs(
  p_logical_arc_id text,
  p_limit integer default 8
)
returns table (
  logical_arc_id text,
  title text,
  similarity double precision
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with source_chunks as (
    select e.embedding
    from public.arc_section_embeddings e
    join public.arc_documents d
      on d.user_id = e.user_id and d.arc_id = e.arc_id
    where e.user_id = (select auth.uid())
      and e.logical_arc_id = p_logical_arc_id
      and e.embedding is not null
      and d.clearance in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and e.document_type in ('polished_extract', 'canonical')
  ), pair_scores as (
    select
      c.logical_arc_id,
      d.title,
      (1.0 - (c.embedding <=> s.embedding))::double precision as similarity,
      row_number() over (
        partition by c.logical_arc_id
        order by (1.0 - (c.embedding <=> s.embedding)) desc
      ) as rn
    from source_chunks s
    cross join public.arc_section_embeddings c
    join public.arc_documents d
      on d.user_id = c.user_id and d.arc_id = c.arc_id
    where c.user_id = (select auth.uid())
      and c.logical_arc_id <> p_logical_arc_id
      and c.embedding is not null
      and d.clearance in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and c.document_type in ('polished_extract', 'canonical')
  ), aggregated as (
    select
      p.logical_arc_id,
      max(p.title) as title,
      avg(p.similarity) filter (where p.rn <= 3)::double precision as similarity
    from pair_scores p
    group by p.logical_arc_id
  )
  select a.logical_arc_id, a.title, a.similarity
  from aggregated a
  where a.similarity is not null
  order by a.similarity desc, a.logical_arc_id
  limit greatest(1, least(coalesce(p_limit, 8), 50));
$$;

grant execute on function public.chrono_normalize_clearance(text) to authenticated;
grant execute on function public.chrono_extract_clearance_from_markdown(text) to authenticated;
grant execute on function public.chrono_load_arc_bundle(text) to authenticated;
grant execute on function public.chrono_hybrid_search_arc_chunks(text, extensions.vector, text, text, boolean, integer) to authenticated;
grant execute on function public.chrono_semantic_related_arcs(text, integer) to authenticated;

commit;
