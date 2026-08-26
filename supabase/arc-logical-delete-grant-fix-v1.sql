-- Chrono-Deck logical ARC deletion permission fix v1
--
-- chrono_delete_logical_arc runs as SECURITY INVOKER. PostgreSQL therefore
-- requires the authenticated caller to hold the table-level DELETE privilege in
-- addition to satisfying the owner-only RLS DELETE policy on arc_logical_arcs.
-- The original delete migration added the RLS policy but omitted this grant.

grant delete on table public.arc_logical_arcs to authenticated;
