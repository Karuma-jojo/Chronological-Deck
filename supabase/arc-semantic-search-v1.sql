-- Chrono-Deck ARC Semantic Search v1
-- Run AFTER arc-archive-v1.sql and arc-archive-sync-v1.sql.
-- Uses Supabase pgvector + built-in gte-small embeddings (384 dimensions).
--
-- Design:
--   arc_sections -> trigger-generated semantic chunks
--   arc_section_embeddings -> Database Webhook -> Edge Function -> embedding
--   chrono_hybrid_search_arc_chunks() -> keyword + semantic retrieval
--   chrono_semantic_related_arcs() -> optional cross-ARC relationship suggestions

begin;

create extension if not exists vector with schema extensions;

create table if not exists public.arc_section_embeddings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arc_id text not null,
  logical_arc_id text not null,
  document_type text not null default 'canonical',
  section_id text not null,
  section_heading text not null default '',
  chunk_index integer not null default 0 check (chunk_index >= 0),
  content text not null,
  content_hash text not null,
  embedding_model text not null default 'gte-small',
  embedding extensions.vector(384),
  embedded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    to_tsvector('english', coalesce(section_heading, '') || ' ' || coalesce(content, ''))
  ) stored,
  unique (user_id, arc_id, section_id, chunk_index),
  foreign key (user_id, arc_id, section_id)
    references public.arc_sections(user_id, arc_id, section_id)
    on delete cascade,
  foreign key (user_id, arc_id)
    references public.arc_documents(user_id, arc_id)
    on delete cascade
);

create index if not exists arc_section_embeddings_user_logical_idx
  on public.arc_section_embeddings (user_id, logical_arc_id, document_type, arc_id, section_id, chunk_index);

create index if not exists arc_section_embeddings_pending_idx
  on public.arc_section_embeddings (user_id, embedded_at, created_at)
  where embedding is null;

create index if not exists arc_section_embeddings_search_idx
  on public.arc_section_embeddings using gin (search_vector);

-- HNSW is appropriate for the read-heavy archive search use case.
create index if not exists arc_section_embeddings_embedding_hnsw_idx
  on public.arc_section_embeddings using hnsw (embedding vector_cosine_ops);

alter table public.arc_section_embeddings enable row level security;

grant select, insert, update, delete on public.arc_section_embeddings to authenticated;

drop policy if exists "arc_section_embeddings_select_own" on public.arc_section_embeddings;
drop policy if exists "arc_section_embeddings_insert_own" on public.arc_section_embeddings;
drop policy if exists "arc_section_embeddings_update_own" on public.arc_section_embeddings;
drop policy if exists "arc_section_embeddings_delete_own" on public.arc_section_embeddings;

create policy "arc_section_embeddings_select_own"
  on public.arc_section_embeddings for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "arc_section_embeddings_insert_own"
  on public.arc_section_embeddings for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "arc_section_embeddings_update_own"
  on public.arc_section_embeddings for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "arc_section_embeddings_delete_own"
  on public.arc_section_embeddings for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

-- Rebuild semantic chunks whenever an H2-backed arc_section is inserted or changed.
-- Chunk size is deliberately conservative for gte-small and keeps RAW dumps searchable
-- below the level of one giant H2 section.
create or replace function public.chrono_seed_section_embedding_chunks()
returns trigger
language plpgsql
security invoker
set search_path = public, extensions
as $$
declare
  v_logical_arc_id text;
  v_document_type text;
  v_text text;
  v_length integer;
  v_position integer := 1;
  v_chunk_index integer := 0;
  v_chunk_size integer := 1800;
  v_step integer := 1600;
  v_chunk text;
begin
  delete from public.arc_section_embeddings
  where user_id = new.user_id
    and arc_id = new.arc_id
    and section_id = new.section_id;

  select d.logical_arc_id, d.document_type
    into v_logical_arc_id, v_document_type
  from public.arc_documents d
  where d.user_id = new.user_id
    and d.arc_id = new.arc_id;

  if v_logical_arc_id is null then
    return new;
  end if;

  v_text := btrim(
    coalesce(new.heading, '') ||
    case when coalesce(new.content_markdown, '') <> '' then E'\n\n' else '' end ||
    coalesce(new.content_markdown, '')
  );

  if v_text = '' then
    return new;
  end if;

  v_length := char_length(v_text);

  while v_position <= v_length loop
    v_chunk := btrim(substr(v_text, v_position, v_chunk_size));

    if v_chunk <> '' then
      insert into public.arc_section_embeddings (
        user_id,
        arc_id,
        logical_arc_id,
        document_type,
        section_id,
        section_heading,
        chunk_index,
        content,
        content_hash,
        embedding_model,
        embedding,
        embedded_at,
        updated_at
      ) values (
        new.user_id,
        new.arc_id,
        v_logical_arc_id,
        coalesce(v_document_type, 'canonical'),
        new.section_id,
        coalesce(new.heading, ''),
        v_chunk_index,
        v_chunk,
        md5(v_chunk),
        'gte-small',
        null,
        null,
        now()
      );

      v_chunk_index := v_chunk_index + 1;
    end if;

    exit when v_position + v_chunk_size > v_length;
    v_position := v_position + v_step;
  end loop;

  return new;
end;
$$;

-- The sync RPC replaces section rows, so INSERT is enough for normal Obsidian sync.
-- UPDATE support keeps direct database edits correct as well.
drop trigger if exists chrono_seed_section_embedding_chunks_trg on public.arc_sections;
create trigger chrono_seed_section_embedding_chunks_trg
after insert or update of heading, content_markdown
on public.arc_sections
for each row
execute function public.chrono_seed_section_embedding_chunks();

-- Seed chunk rows for sections that existed before this migration.
-- Their embedding column remains NULL until the embedding webhook/backfill function runs.
do $$
declare
  r record;
  v_logical_arc_id text;
  v_document_type text;
  v_text text;
  v_length integer;
  v_position integer;
  v_chunk_index integer;
  v_chunk text;
begin
  for r in
    select s.user_id, s.arc_id, s.section_id, s.heading, s.content_markdown
    from public.arc_sections s
  loop
    delete from public.arc_section_embeddings
    where user_id = r.user_id
      and arc_id = r.arc_id
      and section_id = r.section_id;

    select d.logical_arc_id, d.document_type
      into v_logical_arc_id, v_document_type
    from public.arc_documents d
    where d.user_id = r.user_id and d.arc_id = r.arc_id;

    if v_logical_arc_id is null then
      continue;
    end if;

    v_text := btrim(
      coalesce(r.heading, '') ||
      case when coalesce(r.content_markdown, '') <> '' then E'\n\n' else '' end ||
      coalesce(r.content_markdown, '')
    );

    if v_text = '' then
      continue;
    end if;

    v_length := char_length(v_text);
    v_position := 1;
    v_chunk_index := 0;

    while v_position <= v_length loop
      v_chunk := btrim(substr(v_text, v_position, 1800));
      if v_chunk <> '' then
        insert into public.arc_section_embeddings (
          user_id, arc_id, logical_arc_id, document_type,
          section_id, section_heading, chunk_index,
          content, content_hash, embedding_model, embedding, embedded_at, updated_at
        ) values (
          r.user_id, r.arc_id, v_logical_arc_id, coalesce(v_document_type, 'canonical'),
          r.section_id, coalesce(r.heading, ''), v_chunk_index,
          v_chunk, md5(v_chunk), 'gte-small', null, null, now()
        )
        on conflict (user_id, arc_id, section_id, chunk_index) do update set
          logical_arc_id = excluded.logical_arc_id,
          document_type = excluded.document_type,
          section_heading = excluded.section_heading,
          content = excluded.content,
          content_hash = excluded.content_hash,
          embedding_model = 'gte-small',
          embedding = null,
          embedded_at = null,
          updated_at = now();
        v_chunk_index := v_chunk_index + 1;
      end if;

      exit when v_position + 1800 > v_length;
      v_position := v_position + 1600;
    end loop;
  end loop;
end;
$$;

-- Hybrid keyword + semantic search.
-- Semantic score dominates; exact wording still receives a lexical boost.
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
      and (not p_completed_only or d.planning_status = 'parked')
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

-- Optional automatic cross-link suggestions. These are NOT authoritative frontmatter.
-- They are candidate "related" links for later review/enrichment.
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
      and d.planning_status = 'parked'
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
      and d.planning_status = 'parked'
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

create or replace function public.chrono_semantic_embedding_status()
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'totalChunks', count(*),
    'readyChunks', count(*) filter (where embedding is not null),
    'pendingChunks', count(*) filter (where embedding is null),
    'logicalArcs', count(distinct logical_arc_id),
    'model', 'gte-small'
  )
  from public.arc_section_embeddings
  where user_id = (select auth.uid());
$$;

revoke all on function public.chrono_hybrid_search_arc_chunks(text, extensions.vector, text, text, boolean, integer) from public, anon;
revoke all on function public.chrono_semantic_related_arcs(text, integer) from public, anon;
revoke all on function public.chrono_semantic_embedding_status() from public, anon;

grant execute on function public.chrono_hybrid_search_arc_chunks(text, extensions.vector, text, text, boolean, integer) to authenticated;
grant execute on function public.chrono_semantic_related_arcs(text, integer) to authenticated;
grant execute on function public.chrono_semantic_embedding_status() to authenticated;

commit;
