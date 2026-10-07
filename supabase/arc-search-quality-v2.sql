-- Retrieval-only upgrade; no source documents, authority rows or embeddings change.
-- Apply after arc-logical-authority-v1.sql. Rollback: restore the two hybrid
-- RPC definitions from that migration (the private helpers may remain unused).
begin;

create schema if not exists chrono_search_private;
revoke all on schema chrono_search_private from public, anon;
grant usage on schema chrono_search_private to authenticated, service_role;

-- Plain natural language uses ANY non-stopword term for retrieval. Explicit
-- websearch operators retain their phrase/OR/exclusion semantics.
create or replace function chrono_search_private.query_terms(p_query text)
returns table (strict_query tsquery, retrieval_query tsquery, terms text[])
language sql immutable security invoker set search_path = pg_catalog
as $$
  with parsed as (
    select websearch_to_tsquery('english', coalesce(p_query, '')) as strict,
      tsvector_to_array(to_tsvector('english', coalesce(p_query, ''))) as words,
      coalesce(p_query, '') ~ '("|\mOR\M|(^|[[:space:]])-[^[:space:]])' as explicit
  )
  select strict,
    case when explicit then strict else
      coalesce((select string_agg(quote_literal(w), ' | ')::tsquery
        from unnest(words) w), ''::tsquery) end,
    words
  from parsed;
$$;

-- Expand only the selected snippets using the actual archived section. Exact
-- matching handles both historical literal \n separators and normal newlines.
create or replace function chrono_search_private.passage_context(
  p_heading text, p_section text, p_chunk text
)
returns text language plpgsql immutable security invoker
set search_path = pg_catalog
as $$
declare
  source text := btrim(coalesce(p_heading, '') || E'\n\n' || coalesce(p_section, ''));
  start_at integer; end_at integer; boundary integer; before_text text; after_text text;
begin
  if coalesce(p_chunk, '') = '' then return p_chunk; end if;
  start_at := strpos(source, p_chunk);
  if start_at = 0 then
    source := btrim(coalesce(p_heading, '') || E'\\n\\n' || coalesce(p_section, ''));
    start_at := strpos(source, p_chunk);
  end if;
  if start_at = 0 then return p_chunk; end if;
  if char_length(source) <= 2600 then return source; end if;
  end_at := start_at + char_length(p_chunk) - 1;
  before_text := substr(source, greatest(1, start_at - 400), least(400, start_at - 1));
  boundary := strpos(reverse(before_text), E'\n\n');
  if boundary > 0 then start_at := start_at - boundary + 1; end if;
  after_text := substr(source, end_at + 1, 400);
  boundary := strpos(after_text, E'\n\n');
  if boundary > 0 then end_at := end_at + boundary - 1; end if;
  return case when start_at > char_length(coalesce(p_heading, '')) + 2
    then coalesce(p_heading, '') || E'\n\n' else '' end ||
    substr(source, start_at, end_at - start_at + 1);
end;
$$;

create or replace function chrono_search_private.search_chunks(
  p_user_id uuid, p_query text, p_query_embedding extensions.vector(384),
  p_logical_arc_id text, p_document_type text, p_completed_only boolean, p_limit integer
)
returns table (
  arc_id text, logical_arc_id text, document_type text, title text,
  section_id text, section_heading text, chunk_index integer, content text,
  semantic_score double precision, lexical_score double precision, hybrid_score double precision
)
language sql stable security invoker set search_path = pg_catalog, extensions
as $$
  with q as materialized (
    select * from chrono_search_private.query_terms(p_query)
  ), eligible as not materialized (
    select e.*, d.title
    from public.arc_section_embeddings e
    join public.arc_documents d on d.user_id = e.user_id and d.arc_id = e.arc_id
    left join public.arc_logical_arcs l on l.user_id = e.user_id and l.logical_arc_id = e.logical_arc_id
    where e.user_id = p_user_id and e.embedding is not null
      and (p_logical_arc_id is null or e.logical_arc_id = p_logical_arc_id)
      and (p_document_type is null or e.document_type = p_document_type)
      and (not coalesce(p_completed_only, true)
        or coalesce(l.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered'))
      and btrim(coalesce(p_query, '')) <> '' and p_query_embedding is not null
  ), semantic_candidates as materialized (
    -- Keep the distance operator unwrapped so the existing HNSW index is usable.
    select e.id, (e.embedding <=> p_query_embedding) as distance
    from eligible e order by e.embedding <=> p_query_embedding
    limit 200
  ), semantic as (
    select id, distance, row_number() over (order by distance, id) as rank
    from semantic_candidates
  ), lexical_candidates as materialized (
    select e.id,
      -- Coverage rewards several query concepts, rather than repetitions of one
      -- word in a long RAW passage. Normalized rank breaks coverage ties.
      ((select count(*) from unnest(q.terms) w
        where e.search_vector @@ quote_literal(w)::tsquery)::double precision
        / greatest(1, cardinality(q.terms))
       + ts_rank_cd(e.search_vector, q.retrieval_query, 32)::double precision
       + case when e.search_vector @@ q.strict_query then 0.25 else 0 end) as score
    from eligible e cross join q
    where e.search_vector @@ q.retrieval_query
    order by score desc, e.id
    limit 200
  ), lexical as (
    select id, score, row_number() over (order by score desc, id) as rank
    from lexical_candidates
  ), fused as (
    select coalesce(s.id, k.id) as id,
      (coalesce(1.0 / (60 + s.rank), 0) + coalesce(1.0 / (60 + k.rank), 0))::double precision as score,
      coalesce(k.score, 0)::double precision as lexical_score
    from semantic s full outer join lexical k on k.id = s.id
  ), diversified as (
    select f.*, row_number() over (
      partition by e.arc_id, e.section_id order by f.score desc, e.chunk_index, e.id
    ) as section_rank
    from fused f join eligible e on e.id = f.id
  ), selected as (
    select e.*, f.score as fused_score, f.lexical_score
    from diversified f join eligible e on e.id = f.id
    -- At most two windows from one section; overlapping RAW chunks cannot
    -- occupy the whole first page. RAW and POLISHED remain independently usable.
    where f.section_rank <= 2
    order by f.score desc, e.logical_arc_id, e.arc_id, e.section_id, e.chunk_index
    limit greatest(1, least(coalesce(p_limit, 20), 100))
  )
  select e.arc_id, e.logical_arc_id, e.document_type, e.title,
    e.section_id, e.section_heading, e.chunk_index,
    chrono_search_private.passage_context(e.section_heading, s.content_markdown, e.content),
    greatest(-1.0, least(1.0, 1.0 - (e.embedding <=> p_query_embedding)))::double precision,
    e.lexical_score, e.fused_score
  from selected e left join public.arc_sections s
    on s.user_id = e.user_id and s.arc_id = e.arc_id and s.section_id = e.section_id
  order by e.fused_score desc, e.logical_arc_id, e.arc_id, e.section_id, e.chunk_index;
$$;

create or replace function public.chrono_hybrid_search_arc_chunks(
  p_query text, p_query_embedding extensions.vector(384), p_logical_arc_id text default null,
  p_document_type text default null, p_completed_only boolean default true, p_limit integer default 20
)
returns table (
  arc_id text, logical_arc_id text, document_type text, title text,
  section_id text, section_heading text, chunk_index integer, content text,
  semantic_score double precision, lexical_score double precision, hybrid_score double precision
)
language sql stable security invoker set search_path = pg_catalog, extensions
as $$
  select * from chrono_search_private.search_chunks(
    (select auth.uid()), p_query, p_query_embedding,
    p_logical_arc_id, p_document_type, p_completed_only, p_limit);
$$;

create or replace function public.chrono_hybrid_search_arc_chunks_admin(
  p_user_id uuid, p_query text, p_query_embedding extensions.vector(384),
  p_logical_arc_id text default null, p_document_type text default null,
  p_completed_only boolean default true, p_limit integer default 20
)
returns table (
  arc_id text, logical_arc_id text, document_type text, title text,
  section_id text, section_heading text, chunk_index integer, content text,
  semantic_score double precision, lexical_score double precision, hybrid_score double precision
)
language sql stable security definer set search_path = pg_catalog, extensions
as $$
  select * from chrono_search_private.search_chunks(
    p_user_id, p_query, p_query_embedding,
    p_logical_arc_id, p_document_type, p_completed_only, p_limit);
$$;

revoke all on all functions in schema chrono_search_private from public, anon;
grant execute on all functions in schema chrono_search_private to authenticated, service_role;
revoke all on function public.chrono_hybrid_search_arc_chunks(text,extensions.vector,text,text,boolean,integer) from public, anon;
grant execute on function public.chrono_hybrid_search_arc_chunks(text,extensions.vector,text,text,boolean,integer) to authenticated, service_role;
revoke all on function public.chrono_hybrid_search_arc_chunks_admin(uuid,text,extensions.vector,text,text,boolean,integer) from public, anon, authenticated;
grant execute on function public.chrono_hybrid_search_arc_chunks_admin(uuid,text,extensions.vector,text,text,boolean,integer) to service_role;

commit;
