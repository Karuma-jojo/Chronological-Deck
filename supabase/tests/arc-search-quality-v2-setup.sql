-- Isolated CI database only: minimal schema for executing the real migration.
create schema extensions;
create extension vector with schema extensions;
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;
grant usage on schema auth, extensions to authenticated, service_role;
create table public.arc_documents (
  user_id uuid, arc_id text, logical_arc_id text, document_type text, title text, clearance text,
  primary key (user_id, arc_id)
);
create table public.arc_logical_arcs (
  user_id uuid, logical_arc_id text, clearance text, primary key (user_id, logical_arc_id)
);
create table public.arc_sections (
  user_id uuid, arc_id text, section_id text, heading text, content_markdown text,
  primary key (user_id, arc_id, section_id)
);
create table public.arc_section_embeddings (
  id uuid primary key default gen_random_uuid(), user_id uuid, arc_id text, logical_arc_id text,
  document_type text, section_id text, section_heading text, chunk_index integer, content text,
  embedding extensions.vector(384),
  search_vector tsvector generated always as
    (to_tsvector('english', coalesce(section_heading,'') || ' ' || coalesce(content,''))) stored
);
create index on public.arc_section_embeddings using gin (search_vector);
create index on public.arc_section_embeddings using hnsw (embedding extensions.vector_cosine_ops);
grant select on all tables in schema public to authenticated, service_role;
alter table public.arc_documents enable row level security;
alter table public.arc_logical_arcs enable row level security;
alter table public.arc_sections enable row level security;
alter table public.arc_section_embeddings enable row level security;
create policy owner_read on public.arc_documents for select to authenticated using (user_id = (select auth.uid()));
create policy owner_read on public.arc_logical_arcs for select to authenticated using (user_id = (select auth.uid()));
create policy owner_read on public.arc_sections for select to authenticated using (user_id = (select auth.uid()));
create policy owner_read on public.arc_section_embeddings for select to authenticated using (user_id = (select auth.uid()));
