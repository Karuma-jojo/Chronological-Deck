-- Chrono-Deck logical ARC deletion v1
--
-- Deletes one authenticated user's logical ARC from the searchable archive while
-- deliberately preserving local Obsidian files and R2 binaries. R2 objects that
-- become unreferenced are registered in arc_media_orphans for the existing
-- explicit purge workflow.

create or replace function public.chrono_delete_logical_arc(
  p_logical_arc_id text,
  p_confirm_logical_arc_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  v_user_id uuid := auth.uid();
  v_logical_arc_id text := trim(coalesce(p_logical_arc_id, ''));
  v_confirm text := trim(coalesce(p_confirm_logical_arc_id, ''));
  v_document_ids text[] := array[]::text[];
  v_media_object_keys text[] := array[]::text[];
  v_documents integer := 0;
  v_sections integer := 0;
  v_embedding_chunks integer := 0;
  v_revisions integer := 0;
  v_logical_revisions integer := 0;
  v_relationships integer := 0;
  v_media_rows integer := 0;
  v_media_orphans integer := 0;
  v_logical_rows integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if v_logical_arc_id = '' then
    raise exception 'logical_arc_id is required';
  end if;

  if v_confirm <> v_logical_arc_id then
    raise exception 'Deletion confirmation must exactly match logical ARC ID %', v_logical_arc_id;
  end if;

  select coalesce(array_agg(d.arc_id order by d.arc_id), array[]::text[])
  into v_document_ids
  from public.arc_documents d
  where d.user_id = v_user_id
    and d.logical_arc_id = v_logical_arc_id;

  if cardinality(v_document_ids) = 0
     and not exists (
       select 1
       from public.arc_logical_arcs a
       where a.user_id = v_user_id
         and a.logical_arc_id = v_logical_arc_id
     ) then
    raise exception 'Logical ARC % does not exist for the signed-in user', v_logical_arc_id;
  end if;

  select count(*) into v_sections
  from public.arc_sections s
  where s.user_id = v_user_id
    and s.arc_id = any(v_document_ids);

  select count(*) into v_embedding_chunks
  from public.arc_section_embeddings e
  where e.user_id = v_user_id
    and e.arc_id = any(v_document_ids);

  select count(*) into v_revisions
  from public.arc_revisions r
  where r.user_id = v_user_id
    and r.arc_id = any(v_document_ids);

  select count(*) into v_logical_revisions
  from public.arc_logical_arc_revisions r
  where r.user_id = v_user_id
    and r.logical_arc_id = v_logical_arc_id;

  select count(*) into v_media_rows
  from public.arc_media_items m
  where m.user_id = v_user_id
    and (m.logical_arc_id = v_logical_arc_id or m.arc_id = any(v_document_ids));

  select coalesce(array_agg(distinct m.object_key), array[]::text[])
  into v_media_object_keys
  from public.arc_media_items m
  where m.user_id = v_user_id
    and (m.logical_arc_id = v_logical_arc_id or m.arc_id = any(v_document_ids))
    and m.storage_backend = 'r2'
    and m.status = 'uploaded'
    and m.object_key is not null;

  -- Register candidate R2 objects before arc_media_items disappear via cascade.
  insert into public.arc_media_orphans (
    user_id,
    object_key,
    logical_arc_id,
    content_hash,
    file_name,
    mime_type,
    byte_size,
    first_unreferenced_at,
    last_seen_at
  )
  select distinct on (m.object_key)
    v_user_id,
    m.object_key,
    v_logical_arc_id,
    m.content_hash,
    m.file_name,
    m.mime_type,
    m.byte_size,
    now(),
    now()
  from public.arc_media_items m
  where m.user_id = v_user_id
    and (m.logical_arc_id = v_logical_arc_id or m.arc_id = any(v_document_ids))
    and m.storage_backend = 'r2'
    and m.status = 'uploaded'
    and m.object_key is not null
  order by m.object_key, m.updated_at desc
  on conflict (user_id, object_key) do update set
    logical_arc_id = excluded.logical_arc_id,
    content_hash = coalesce(excluded.content_hash, public.arc_media_orphans.content_hash),
    file_name = coalesce(excluded.file_name, public.arc_media_orphans.file_name),
    mime_type = coalesce(excluded.mime_type, public.arc_media_orphans.mime_type),
    byte_size = coalesce(excluded.byte_size, public.arc_media_orphans.byte_size),
    last_seen_at = now();

  -- arc_relationships only has a cascading FK for from_arc_id. Remove inbound
  -- references explicitly, including logical-ID targets used by paired ARCs.
  delete from public.arc_relationships rel
  where rel.user_id = v_user_id
    and (
      rel.from_arc_id = any(v_document_ids)
      or rel.to_arc_id = any(v_document_ids)
      or rel.from_arc_id = v_logical_arc_id
      or rel.to_arc_id = v_logical_arc_id
    );
  get diagnostics v_relationships = row_count;

  -- Deleting document rows cascades sections, embeddings, revisions, and media rows.
  delete from public.arc_documents d
  where d.user_id = v_user_id
    and d.logical_arc_id = v_logical_arc_id;
  get diagnostics v_documents = row_count;

  -- Logical authority revisions cascade from this authority row.
  delete from public.arc_logical_arcs a
  where a.user_id = v_user_id
    and a.logical_arc_id = v_logical_arc_id;
  get diagnostics v_logical_rows = row_count;

  -- A content-addressed R2 object can be shared by another ARC/document. In that
  -- case it is not an orphan and must never be offered to the purge command.
  if cardinality(v_media_object_keys) > 0 then
    delete from public.arc_media_orphans o
    where o.user_id = v_user_id
      and o.object_key = any(v_media_object_keys)
      and exists (
        select 1
        from public.arc_media_items m
        where m.user_id = v_user_id
          and m.object_key = o.object_key
      );

    select count(*) into v_media_orphans
    from public.arc_media_orphans o
    where o.user_id = v_user_id
      and o.object_key = any(v_media_object_keys)
      and not exists (
        select 1
        from public.arc_media_items m
        where m.user_id = v_user_id
          and m.object_key = o.object_key
      );
  end if;

  return jsonb_build_object(
    'logicalArcId', v_logical_arc_id,
    'documentIds', to_jsonb(v_document_ids),
    'documentsDeleted', v_documents,
    'sectionsDeleted', v_sections,
    'embeddingChunksDeleted', v_embedding_chunks,
    'revisionSnapshotsDeleted', v_revisions,
    'logicalRevisionSnapshotsDeleted', v_logical_revisions,
    'relationshipsDeleted', v_relationships,
    'mediaRowsDeleted', v_media_rows,
    'r2ObjectsQueuedForSafePurge', v_media_orphans,
    'logicalAuthorityRowsDeleted', v_logical_rows,
    'r2ObjectsDeletedNow', 0
  );
end;
$function$;

revoke all on function public.chrono_delete_logical_arc(text, text) from public;
revoke execute on function public.chrono_delete_logical_arc(text, text) from anon;
grant execute on function public.chrono_delete_logical_arc(text, text) to authenticated;

comment on function public.chrono_delete_logical_arc(text, text) is
  'Deletes one authenticated user logical ARC and searchable derivatives. Keeps R2 binaries intact; newly unreferenced objects are queued in arc_media_orphans for explicit purge.';
