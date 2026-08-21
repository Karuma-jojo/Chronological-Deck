-- Chrono-Deck admin semantic completion filter fix
-- Run AFTER arc-clearance-semantic-completion-v1.sql.
-- The private MCP uses admin RPCs through arc-archive-access, so those RPCs
-- must use academic clearance exactly like the authenticated user RPCs.

begin;

create or replace function public.chrono_load_arc_bundle_admin(p_user_id uuid, p_logical_arc_id text)
returns jsonb
language sql
stable
security definer
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
  where d.user_id = p_user_id
    and d.logical_arc_id = p_logical_arc_id;
$$;

create or replace function public.chrono_hybrid_search_arc_chunks_admin(
  p_user_id uuid,
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
security definer
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
    where e.user_id = p_user_id
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

create or replace function public.chrono_semantic_related_arcs_admin(
  p_user_id uuid,
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
security definer
set search_path = public, extensions
as $$
  with source_chunks as (
    select e.embedding
    from public.arc_section_embeddings e
    join public.arc_documents d
      on d.user_id = e.user_id and d.arc_id = e.arc_id
    where e.user_id = p_user_id
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
    where c.user_id = p_user_id
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

commit;
