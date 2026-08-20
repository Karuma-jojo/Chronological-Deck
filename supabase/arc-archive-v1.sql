-- Chrono-Deck ARC Archive Pipeline v1
-- Non-breaking migration for paired RAW + POLISHED documents.
-- Keeps arc_id as the unique document key while adding logical_arc_id
-- to group multiple representations of the same learning event.

begin;

alter table public.arc_documents
  add column if not exists logical_arc_id text,
  add column if not exists document_type text not null default 'canonical',
  add column if not exists media_status text not null default 'none',
  add column if not exists tags text[] not null default '{}';

-- Backfill existing notes conservatively. Existing canonical ARC ids remain unchanged.
update public.arc_documents
set logical_arc_id = case
  when arc_id ~* '-RAW$' then regexp_replace(arc_id, '-RAW$', '', 'i')
  when arc_id ~* '-POLISHED$' then regexp_replace(arc_id, '-POLISHED$', '', 'i')
  else arc_id
end
where logical_arc_id is null or btrim(logical_arc_id) = '';

alter table public.arc_documents
  alter column logical_arc_id set not null;

alter table public.arc_documents
  drop constraint if exists arc_documents_document_type_check,
  add constraint arc_documents_document_type_check
    check (document_type in ('canonical','raw_dump','polished_extract','proof','recovery','supplementary_artifact'));

alter table public.arc_documents
  drop constraint if exists arc_documents_media_status_check,
  add constraint arc_documents_media_status_check
    check (media_status in ('none','pending','partial','complete'));

create index if not exists arc_documents_user_logical_type_idx
  on public.arc_documents (user_id, logical_arc_id, document_type);

create index if not exists arc_documents_user_tags_idx
  on public.arc_documents using gin (tags);

-- Section-level lexical search. This is immediately useful and does not require
-- an embedding provider or external API key.
alter table public.arc_sections
  add column if not exists search_vector tsvector
  generated always as (
    to_tsvector('english', coalesce(heading, '') || ' ' || coalesce(content_markdown, ''))
  ) stored;

create index if not exists arc_sections_search_vector_idx
  on public.arc_sections using gin (search_vector);

-- Media references stay metadata-first. Binary assets can later live in R2
-- without blocking the Markdown document or ARC clearance.
create table if not exists public.arc_media_items (
  media_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arc_id text not null,
  logical_arc_id text not null,
  slot_key text not null,
  media_type text not null default 'image'
    check (media_type in ('image','gif','video','audio','diagram','file','other')),
  status text not null default 'pending'
    check (status in ('pending','linked','uploaded','missing','skipped')),
  purpose text not null default '',
  source_url text,
  object_key text,
  alt_text text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, arc_id, slot_key),
  foreign key (user_id, arc_id)
    references public.arc_documents(user_id, arc_id)
    on delete cascade
);

create index if not exists arc_media_items_user_logical_idx
  on public.arc_media_items (user_id, logical_arc_id, status, position);

alter table public.arc_media_items enable row level security;
grant select, insert, update, delete on public.arc_media_items to authenticated;

drop policy if exists "arc_media_items_select_own" on public.arc_media_items;
drop policy if exists "arc_media_items_insert_own" on public.arc_media_items;
drop policy if exists "arc_media_items_update_own" on public.arc_media_items;
drop policy if exists "arc_media_items_delete_own" on public.arc_media_items;

create policy "arc_media_items_select_own"
  on public.arc_media_items for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_items_insert_own"
  on public.arc_media_items for insert to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_items_update_own"
  on public.arc_media_items for update to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "arc_media_items_delete_own"
  on public.arc_media_items for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

-- Retrieve every representation of one learning event.
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

-- Section-level full-text search across RAW and POLISHED documents.
create or replace function public.chrono_search_arc_sections(
  p_query text,
  p_logical_arc_id text default null,
  p_document_type text default null,
  p_limit integer default 20
)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with q as (
    select websearch_to_tsquery('english', coalesce(p_query, '')) as query
  ), ranked as (
    select
      d.arc_id,
      d.logical_arc_id,
      d.document_type,
      d.title,
      s.section_id,
      s.heading,
      s.content_markdown,
      s.position,
      ts_rank_cd(s.search_vector, q.query) as rank
    from public.arc_sections s
    join public.arc_documents d
      on d.user_id = s.user_id and d.arc_id = s.arc_id
    cross join q
    where d.user_id = (select auth.uid())
      and (p_logical_arc_id is null or d.logical_arc_id = p_logical_arc_id)
      and (p_document_type is null or d.document_type = p_document_type)
      and q.query @@ s.search_vector
    order by rank desc, d.updated_at desc, s.position
    limit greatest(1, least(coalesce(p_limit, 20), 100))
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'arcId', arc_id,
    'logicalArcId', logical_arc_id,
    'documentType', document_type,
    'title', title,
    'sectionId', section_id,
    'heading', heading,
    'contentMarkdown', content_markdown,
    'position', position,
    'rank', rank
  )), '[]'::jsonb)
  from ranked;
$$;

grant execute on function public.chrono_load_arc_bundle(text) to authenticated;
grant execute on function public.chrono_search_arc_sections(text, text, text, integer) to authenticated;

commit;
