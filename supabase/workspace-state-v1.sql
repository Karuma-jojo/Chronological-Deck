-- Cross-device T25 / SMMC workspace state.
-- Account-private durable snapshots; academic authority remains elsewhere.

create table if not exists public.chrono_workspace_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  scope text not null check (scope in ('t25_course','smmc_historical','smmc_study','workspace_nav')),
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  lock_version integer not null default 1 check (lock_version > 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, scope)
);

comment on table public.chrono_workspace_state is
  'Private cross-device learner workspace snapshots. Navigation/study evidence only; never academic clearance authority.';

alter table public.chrono_workspace_state enable row level security;

grant select, insert, update, delete
on table public.chrono_workspace_state
to authenticated;

drop policy if exists "workspace_select_own" on public.chrono_workspace_state;
drop policy if exists "workspace_insert_own" on public.chrono_workspace_state;
drop policy if exists "workspace_update_own" on public.chrono_workspace_state;
drop policy if exists "workspace_delete_own" on public.chrono_workspace_state;

create policy "workspace_select_own"
on public.chrono_workspace_state
for select to authenticated
using ((select auth.uid()) = user_id);

create policy "workspace_insert_own"
on public.chrono_workspace_state
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "workspace_update_own"
on public.chrono_workspace_state
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "workspace_delete_own"
on public.chrono_workspace_state
for delete to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.chrono_workspace_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists chrono_workspace_state_updated_at on public.chrono_workspace_state;
create trigger chrono_workspace_state_updated_at
before update on public.chrono_workspace_state
for each row execute function public.chrono_workspace_set_updated_at();
