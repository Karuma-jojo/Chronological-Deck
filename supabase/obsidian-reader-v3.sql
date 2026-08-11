-- Chrono-Deck Obsidian v0.3: bounded revision retention
-- Run once AFTER arc-vault.sql, obsidian-bridge.sql, and obsidian-sync-v2.sql.
--
-- Policy:
--   * keep revision 1
--   * keep the most recent N revisions (default 50)
--   * keep every Kth older revision as a milestone (default every 25)
--
-- Revision numbers remain monotonic even when old snapshots are pruned.

begin;

grant delete on public.arc_revisions to authenticated;

drop policy if exists "arc_revisions_delete_own" on public.arc_revisions;
create policy "arc_revisions_delete_own"
  on public.arc_revisions for delete to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create or replace function public.chrono_prune_arc_revisions(
  p_arc_id text,
  p_keep_recent integer default 50,
  p_keep_every integer default 25
)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_arc_id text := nullif(trim(p_arc_id), '');
  v_keep_recent integer := greatest(coalesce(p_keep_recent, 50), 1);
  v_keep_every integer := greatest(coalesce(p_keep_every, 25), 0);
  v_deleted integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if v_arc_id is null then
    raise exception 'ARC id is required';
  end if;

  with recent as (
    select r.revision
    from public.arc_revisions r
    where r.user_id = v_user_id
      and r.arc_id = v_arc_id
    order by r.revision desc
    limit v_keep_recent
  )
  delete from public.arc_revisions r
  where r.user_id = v_user_id
    and r.arc_id = v_arc_id
    and r.revision <> 1
    and not exists (
      select 1 from recent x where x.revision = r.revision
    )
    and (
      v_keep_every = 0
      or mod(r.revision, v_keep_every) <> 0
    );

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

create or replace function public.chrono_arc_revision_stats(p_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'arcId', p_arc_id,
    'snapshotCount', count(*),
    'latestRevision', coalesce(max(r.revision), 0),
    'approxSnapshotBytes', coalesce(sum(pg_column_size(r.snapshot)), 0)
  )
  from public.arc_revisions r
  where r.user_id = (select auth.uid())
    and r.arc_id = p_arc_id;
$$;

revoke all on function public.chrono_prune_arc_revisions(text, integer, integer) from public, anon;
grant execute on function public.chrono_prune_arc_revisions(text, integer, integer) to authenticated;
revoke all on function public.chrono_arc_revision_stats(text) from public, anon;
grant execute on function public.chrono_arc_revision_stats(text) to authenticated;

commit;
