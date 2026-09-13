-- Chrono-Deck review / retention v1. Apply after arc-logical-authority-v1.sql
-- and arc-logical-delete-grant-fix-v1.sql. Generic schema only: no learner seed.
-- Generated with `supabase migration new arc_review_retention_v1`, then named
-- according to this repository's standalone SQL deployment convention.
begin;

create schema if not exists chrono_review_private;
revoke all on schema chrono_review_private from public, anon;
grant usage on schema chrono_review_private to authenticated;

create table if not exists public.arc_review_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  id uuid not null,
  logical_arc_id text,
  curriculum_scope text,
  source_key text not null check (length(source_key) between 1 and 160),
  item_type text not null check (item_type in ('recall','concept_discrimination','error_repair','mini_problem','unfamiliar_transfer','mixed_review')),
  prompt text not null check (length(trim(prompt)) between 1 and 12000),
  reference text not null default '' check (length(reference) <= 16000),
  personal_note text not null default '' check (length(personal_note) <= 4000),
  provenance text not null check (provenance in ('user_created','extractor_suggested','error_derived','assistance_derived','parent_mixed')),
  state text not null check (state in ('pending','active','archived')),
  stage integer not null default 0 check (stage between 0 and 5),
  due_on date,
  repair_recommended boolean not null default false,
  last_reviewed_at timestamptz,
  lock_version integer not null default 1 check (lock_version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id,id),
  unique (user_id,source_key),
  foreign key (user_id,logical_arc_id) references public.arc_logical_arcs(user_id,logical_arc_id) on delete cascade,
  check (logical_arc_id is null or (logical_arc_id ~ '^T25-ARC[0-9]+-A[0-9]+$')),
  check (curriculum_scope is null or curriculum_scope ~ '^ARC[0-9]+$'),
  check (logical_arc_id is not null or (curriculum_scope is not null and provenance = 'parent_mixed' and item_type = 'mixed_review')),
  check ((state = 'active') = (due_on is not null))
);
create index if not exists arc_review_items_logical_idx on public.arc_review_items(user_id,logical_arc_id);
create index if not exists arc_review_items_due_idx on public.arc_review_items(user_id,due_on) where state = 'active';

create table if not exists public.arc_review_attempts (
  user_id uuid not null,
  id uuid not null,
  item_id uuid not null,
  attempted_at timestamptz not null default now(),
  reviewed_on date not null,
  result text not null check (result in ('clean','shaky','failed')),
  error_kind text not null check (error_kind in ('none','clerical','conceptual','mixed','unknown')),
  assistance text not null check (assistance in ('none','hint','forge0','guided')),
  unfamiliar_transfer boolean not null default false,
  learner_response text not null default '' check (length(learner_response) <= 16000),
  notes text not null default '' check (length(notes) <= 4000),
  item_snapshot jsonb not null,
  request_payload jsonb not null,
  stage_before integer not null,
  stage_after integer not null,
  due_before date not null,
  due_after date not null,
  repair_after boolean not null,
  schedule_reason text not null,
  primary key (user_id,id),
  foreign key (user_id,item_id) references public.arc_review_items(user_id,id) on delete cascade
);
create index if not exists arc_review_attempts_item_idx on public.arc_review_attempts(user_id,item_id,attempted_at desc);

alter table public.arc_review_items enable row level security;
alter table public.arc_review_attempts enable row level security;
revoke all on public.arc_review_items, public.arc_review_attempts from public, anon, authenticated;
grant select on public.arc_review_items, public.arc_review_attempts to authenticated;
drop policy if exists arc_review_items_read_own on public.arc_review_items;
create policy arc_review_items_read_own on public.arc_review_items for select to authenticated
  using ((select auth.uid()) is not null and user_id = (select auth.uid()));
drop policy if exists arc_review_attempts_read_own on public.arc_review_attempts;
create policy arc_review_attempts_read_own on public.arc_review_attempts for select to authenticated
  using ((select auth.uid()) is not null and user_id = (select auth.uid()));

-- Private mutation workers enforce authenticated ownership and RPC-only writes.
-- Public wrappers are invoker functions. No exposed definer or browser admin key.
create or replace function chrono_review_private.create_item(p_item jsonb,p_today date)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  u uuid := auth.uid(); i public.arc_review_items; k text := trim(p_item->>'source_key');
  lid text := nullif(regexp_replace(trim(p_item->>'logical_arc_id'), '-(RAW|POLISHED)$', '', 'i'),'');
  scope text := nullif(trim(p_item->>'curriculum_scope'),'');
  prov text := coalesce(p_item->>'provenance','user_created');
begin
  if u is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_item) is distinct from 'object' then raise exception 'Review item object required'; end if;
  -- Stable source keys make repeated setup/response-loss retries non-destructive.
  select * into i from public.arc_review_items where user_id=u and source_key=k;
  if found then
    if i.logical_arc_id is distinct from lid or i.curriculum_scope is distinct from scope then raise exception 'REVIEW_CONFLICT: source key belongs to another scope'; end if;
    return to_jsonb(i);
  end if;
  if p_today is null or p_today not between current_date-1 and current_date+1 then raise exception 'Use your current local calendar date'; end if;
  if lid is not null and not exists(select 1 from public.arc_logical_arcs where user_id=u and logical_arc_id=lid) then
    raise exception 'Archive this logical ARC to your account before adding its review item';
  end if;
  insert into public.arc_review_items(user_id,id,logical_arc_id,curriculum_scope,source_key,item_type,prompt,reference,personal_note,provenance,state,due_on)
  values(u,(p_item->>'id')::uuid,lid,scope,k,p_item->>'item_type',p_item->>'prompt',coalesce(p_item->>'reference',''),coalesce(p_item->>'personal_note',''),prov,
    case when prov='user_created' then 'active' else 'pending' end,
    case when prov='user_created' then p_today+3 else null end)
  on conflict(user_id,source_key) do nothing returning * into i;
  if not found then
    select * into i from public.arc_review_items where user_id=u and source_key=k;
    if i.logical_arc_id is distinct from lid or i.curriculum_scope is distinct from scope then raise exception 'REVIEW_CONFLICT: source key belongs to another scope'; end if;
  end if;
  return to_jsonb(i);
end $$;

create or replace function chrono_review_private.update_item(p_item_id uuid,p_patch jsonb,p_expected_version integer,p_today date)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid(); i public.arc_review_items; n public.arc_review_items; reset_evidence boolean;
begin
  if u is null then raise exception 'Authentication required'; end if;
  if p_today is null or p_today not between current_date-1 and current_date+1 then raise exception 'Use your current local calendar date'; end if;
  if jsonb_typeof(p_patch) is distinct from 'object' then raise exception 'Review patch object required'; end if;
  if exists(select 1 from jsonb_object_keys(p_patch) k where k not in ('prompt','reference','personal_note','item_type','state')) then raise exception 'Review identity and provenance are immutable'; end if;
  select * into i from public.arc_review_items where user_id=u and id=p_item_id for update;
  if not found then raise exception 'Review item not found'; end if;
  if i.lock_version is distinct from p_expected_version then raise exception 'REVIEW_CONFLICT: refresh before editing'; end if;
  n := jsonb_populate_record(i,p_patch);
  reset_evidence := (n.prompt,n.reference,n.item_type) is distinct from (i.prompt,i.reference,i.item_type)
    or (n.state='active' and i.state<>'active');
  update public.arc_review_items set prompt=n.prompt,reference=n.reference,personal_note=n.personal_note,item_type=n.item_type,state=n.state,
    stage=case when reset_evidence then 0 else i.stage end,
    due_on=case when n.state<>'active' then null when reset_evidence then p_today+3 else i.due_on end,
    last_reviewed_at=case when reset_evidence then null else i.last_reviewed_at end,
    repair_recommended=case when reset_evidence then false else i.repair_recommended end,
    lock_version=i.lock_version+1,updated_at=now()
  where user_id=u and id=p_item_id returning * into n;
  return to_jsonb(n);
end $$;

create or replace function chrono_review_private.record_attempt(p_item_id uuid,p_attempt_id uuid,p_expected_version integer,p_attempt jsonb,p_reviewed_on date)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  u uuid := auth.uid(); i public.arc_review_items; a public.arc_review_attempts;
  req jsonb := jsonb_build_object('item_id',p_item_id,'expected_version',p_expected_version,'attempt',p_attempt,'reviewed_on',p_reviewed_on);
  result text := p_attempt->>'result'; err text := coalesce(p_attempt->>'error_kind','none');
  assist text := coalesce(p_attempt->>'assistance','none');
  stage integer; due date; repair boolean; reason text;
begin
  if u is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_attempt) is distinct from 'object' then raise exception 'Review attempt object required'; end if;
  select * into i from public.arc_review_items where user_id=u and id=p_item_id for update;
  if not found then raise exception 'Review item not found'; end if;
  -- Same-item submissions serialize on the row lock, including retry lookups.
  select * into a from public.arc_review_attempts where user_id=u and id=p_attempt_id;
  if found then
    if a.request_payload is distinct from req then raise exception 'REVIEW_CONFLICT: attempt ID reused with different data'; end if;
    return jsonb_build_object('attempt',to_jsonb(a)-'request_payload','item',to_jsonb(i),'replayed',true);
  end if;
  if i.lock_version is distinct from p_expected_version then raise exception 'REVIEW_CONFLICT: item changed on another session; refresh'; end if;
  if i.state<>'active' then raise exception 'Only accepted active items can be reviewed'; end if;
  if p_reviewed_on is null or p_reviewed_on not between current_date-1 and current_date+1 then raise exception 'Use your current local calendar date'; end if;
  if result='clean' and err in ('conceptual','mixed') then raise exception 'A conceptual error cannot be marked clean'; end if;
  stage := i.stage; repair := i.repair_recommended;
  if result='failed' and err<>'clerical' then
    stage:=0; due:=p_reviewed_on+1; repair:=true; reason:='conceptual_or_uncertain_failure';
  elsif result='failed' then
    due:=p_reviewed_on+3; reason:='clerical_recheck';
  elsif result='shaky' then
    stage:=greatest(0,stage-1); due:=p_reviewed_on+3; reason:='shaky_recheck';
  elsif assist<>'none' then
    due:=p_reviewed_on+3; reason:='assisted_recheck';
  elsif p_reviewed_on<i.due_on then
    due:=i.due_on; repair:=false; reason:='early_practice_no_promotion';
  else
    stage:=least(5,stage+1); due:=p_reviewed_on+(array[3,7,21,60,180,180])[stage+1];
    repair:=false; reason:='independent_clean';
  end if;
  insert into public.arc_review_attempts(user_id,id,item_id,reviewed_on,result,error_kind,assistance,unfamiliar_transfer,learner_response,notes,
    item_snapshot,request_payload,stage_before,stage_after,due_before,due_after,repair_after,schedule_reason)
  values(u,p_attempt_id,p_item_id,p_reviewed_on,result,err,assist,coalesce((p_attempt->>'unfamiliar_transfer')::boolean,false),
    coalesce(p_attempt->>'learner_response',''),coalesce(p_attempt->>'notes',''),
    jsonb_build_object('prompt',i.prompt,'reference',i.reference,'personal_note',i.personal_note,'item_type',i.item_type,
      'provenance',i.provenance,'logical_arc_id',i.logical_arc_id,'curriculum_scope',i.curriculum_scope,'lock_version',i.lock_version),
    req,i.stage,stage,i.due_on,due,repair,reason) returning * into a;
  update public.arc_review_items set stage=stage_after,due_on=due_after,repair_recommended=repair_after,
    last_reviewed_at=a.attempted_at,lock_version=i.lock_version+1,updated_at=now()
  from (select a.stage_after,a.due_after,a.repair_after) s
  where user_id=u and id=p_item_id returning public.arc_review_items.* into i;
  return jsonb_build_object('attempt',to_jsonb(a)-'request_payload','item',to_jsonb(i),'replayed',false);
end $$;

create or replace function public.chrono_create_arc_review_item(p_item jsonb,p_today date)
returns jsonb language sql security invoker set search_path='' as $$ select chrono_review_private.create_item(p_item,p_today) $$;
create or replace function public.chrono_update_arc_review_item(p_item_id uuid,p_patch jsonb,p_expected_version integer,p_today date)
returns jsonb language sql security invoker set search_path='' as $$ select chrono_review_private.update_item(p_item_id,p_patch,p_expected_version,p_today) $$;
create or replace function public.chrono_record_arc_review_attempt(p_item_id uuid,p_attempt_id uuid,p_expected_version integer,p_attempt jsonb,p_reviewed_on date)
returns jsonb language sql security invoker set search_path='' as $$ select chrono_review_private.record_attempt(p_item_id,p_attempt_id,p_expected_version,p_attempt,p_reviewed_on) $$;
create or replace function public.chrono_load_arc_review(p_logical_arc_id text,p_curriculum_scope text default null)
returns jsonb language sql security invoker set search_path='' as $$
 select coalesce(jsonb_agg(to_jsonb(i) order by i.due_on nulls last,i.created_at),'[]'::jsonb)
 from public.arc_review_items i where user_id=(select auth.uid()) and
 ((p_logical_arc_id is not null and i.logical_arc_id=regexp_replace(trim(p_logical_arc_id),'-(RAW|POLISHED)$','','i'))
 or (p_logical_arc_id is null and i.logical_arc_id is null and i.curriculum_scope=p_curriculum_scope))
$$;
create or replace function public.chrono_list_arc_review_attempts(p_item_id uuid)
returns jsonb language sql security invoker set search_path='' as $$
 select coalesce(jsonb_agg(to_jsonb(a)-'request_payload' order by a.attempted_at desc,a.id),'[]'::jsonb)
 from public.arc_review_attempts a where user_id=(select auth.uid()) and item_id=p_item_id
$$;

revoke all on all functions in schema chrono_review_private from public, anon;
grant execute on all functions in schema chrono_review_private to authenticated;
revoke all on function public.chrono_create_arc_review_item(jsonb,date),public.chrono_update_arc_review_item(uuid,jsonb,integer,date),
 public.chrono_record_arc_review_attempt(uuid,uuid,integer,jsonb,date),public.chrono_load_arc_review(text,text),public.chrono_list_arc_review_attempts(uuid) from public,anon;
grant execute on function public.chrono_create_arc_review_item(jsonb,date),public.chrono_update_arc_review_item(uuid,jsonb,integer,date),
 public.chrono_record_arc_review_attempt(uuid,uuid,integer,jsonb,date),public.chrono_load_arc_review(text,text),public.chrono_list_arc_review_attempts(uuid) to authenticated;
comment on table public.arc_review_items is 'Private delayed-review state, independent of academic clearance. Scheduling intervals are configurable implementation heuristics, not an optimal learning law. Logical deletion cascades.';
comment on table public.arc_review_attempts is 'Immutable self-evaluated review evidence with item snapshots. No automatic mathematical grading or academic authority updates.';
notify pgrst, 'reload schema';
commit;
