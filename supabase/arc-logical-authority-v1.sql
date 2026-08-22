-- Chrono-Deck logical ARC authority v1
--
-- One logical learning event gets one authoritative academic state.
-- RAW/POLISHED/canonical documents remain representations/snapshots.
--
-- Safety rules:
--   * ordinary document sync can seed authority and refresh identity/curriculum;
--   * ordinary document sync NEVER overwrites established academic authority;
--   * later clearance/recovery/provenance/debt changes use an explicit,
--     optimistic-lock authority RPC;
--   * every authority change gets a revision snapshot;
--   * semantic completedOnly filtering reads logical authority first and only
--     falls back to document clearance for pre-authority compatibility.
--
-- Run AFTER obsidian-archive-contract-v3.sql.

begin;

create table if not exists public.arc_logical_arcs (
  user_id uuid not null,
  logical_arc_id text not null,
  schema_version integer not null default 1,
  canonical_label text not null,
  title text not null,

  terminal_id text,
  terminal_title text,
  module_id text,
  module_index integer,
  module_title text,
  canonical_node text,
  atomic_position integer,
  atomic_total_in_module integer,
  atomic_audit_version text,

  clearance text not null default 'incomplete',
  nominal_control_state_final text,
  highest_effective_assistance text,
  recovery_state text not null default 'unknown',
  unresolved_gate text,
  focused_hours numeric,
  started_at date,
  completed_at date,

  proof_debt jsonb not null default '[]'::jsonb,
  implementation_debt jsonb not null default '[]'::jsonb,
  transfer_debt jsonb not null default '[]'::jsonb,
  recovery_debt jsonb not null default '[]'::jsonb,
  assistance_summary text,
  provenance_summary text,
  assistance_events jsonb not null default '[]'::jsonb,

  authority_revision integer not null default 1,
  identity_source_arc_id text,
  identity_source_document_type text,
  seeded_from_arc_id text,
  seeded_from_document_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  primary key (user_id, logical_arc_id),
  constraint arc_logical_arcs_schema_version_check check (schema_version >= 1),
  constraint arc_logical_arcs_module_index_check check (module_index is null or module_index >= 0),
  constraint arc_logical_arcs_atomic_position_check check (atomic_position is null or atomic_position >= 0),
  constraint arc_logical_arcs_atomic_total_check check (atomic_total_in_module is null or atomic_total_in_module >= 0),
  constraint arc_logical_arcs_atomic_range_check check (
    atomic_position is null or atomic_total_in_module is null or atomic_total_in_module = 0 or atomic_position <= atomic_total_in_module
  ),
  constraint arc_logical_arcs_clearance_check check (
    clearance in ('incomplete','core_cleared','core_cleared_mastery_pending','fully_mastered')
  ),
  constraint arc_logical_arcs_nominal_assistance_check check (
    nominal_control_state_final is null or nominal_control_state_final in (
      'WALL','HINT','FORGE','FORGE0','FORGE1','FORGE2','FORGE3','FORGE4','FORGE5','GUIDE','REVEAL'
    )
  ),
  constraint arc_logical_arcs_effective_assistance_check check (
    highest_effective_assistance is null or highest_effective_assistance in (
      'WALL','HINT','FORGE','FORGE0','FORGE1','FORGE2','FORGE3','FORGE4','FORGE5','GUIDE','REVEAL'
    )
  ),
  constraint arc_logical_arcs_recovery_state_check check (
    recovery_state in ('not_owed','owed','cleared','unknown')
  ),
  constraint arc_logical_arcs_focused_hours_check check (focused_hours is null or focused_hours >= 0),
  constraint arc_logical_arcs_dates_check check (
    started_at is null or completed_at is null or completed_at >= started_at
  ),
  constraint arc_logical_arcs_proof_debt_array_check check (jsonb_typeof(proof_debt) = 'array'),
  constraint arc_logical_arcs_implementation_debt_array_check check (jsonb_typeof(implementation_debt) = 'array'),
  constraint arc_logical_arcs_transfer_debt_array_check check (jsonb_typeof(transfer_debt) = 'array'),
  constraint arc_logical_arcs_recovery_debt_array_check check (jsonb_typeof(recovery_debt) = 'array'),
  constraint arc_logical_arcs_assistance_events_array_check check (jsonb_typeof(assistance_events) = 'array'),
  constraint arc_logical_arcs_authority_revision_check check (authority_revision >= 1)
);

create table if not exists public.arc_logical_arc_revisions (
  user_id uuid not null,
  logical_arc_id text not null,
  authority_revision integer not null,
  note text not null default '',
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, logical_arc_id, authority_revision),
  foreign key (user_id, logical_arc_id)
    references public.arc_logical_arcs(user_id, logical_arc_id)
    on delete cascade,
  constraint arc_logical_arc_revisions_revision_check check (authority_revision >= 1),
  constraint arc_logical_arc_revisions_snapshot_object_check check (jsonb_typeof(snapshot) = 'object')
);

create index if not exists arc_logical_arcs_user_clearance_idx
  on public.arc_logical_arcs (user_id, clearance, logical_arc_id);
create index if not exists arc_logical_arcs_user_recovery_idx
  on public.arc_logical_arcs (user_id, recovery_state, logical_arc_id);
create index if not exists arc_logical_arcs_curriculum_idx
  on public.arc_logical_arcs (user_id, terminal_id, module_id, module_index, atomic_position);
create index if not exists arc_logical_arc_revisions_user_updated_idx
  on public.arc_logical_arc_revisions (user_id, logical_arc_id, created_at desc);

alter table public.arc_logical_arcs enable row level security;
alter table public.arc_logical_arc_revisions enable row level security;

drop policy if exists arc_logical_arcs_select_own on public.arc_logical_arcs;
create policy arc_logical_arcs_select_own
  on public.arc_logical_arcs for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists arc_logical_arc_revisions_select_own on public.arc_logical_arc_revisions;
create policy arc_logical_arc_revisions_select_own
  on public.arc_logical_arc_revisions for select to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

-- Authority mutation is RPC-only.
revoke insert, update, delete on public.arc_logical_arcs from anon, authenticated;
revoke insert, update, delete on public.arc_logical_arc_revisions from anon, authenticated;
grant select on public.arc_logical_arcs to authenticated;
grant select on public.arc_logical_arc_revisions to authenticated;

-- Shared serializer. SECURITY INVOKER keeps ordinary authenticated direct calls
-- inside RLS, while service-role/security-definer callers can use it for admin
-- reads without duplicating the JSON shape.
create or replace function public.chrono_logical_arc_authority_json_internal(
  p_user_id uuid,
  p_logical_arc_id text
)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'schemaVersion', l.schema_version,
    'logicalArcId', l.logical_arc_id,
    'canonicalLabel', l.canonical_label,
    'title', l.title,
    'terminalId', l.terminal_id,
    'terminalTitle', l.terminal_title,
    'moduleId', l.module_id,
    'moduleIndex', l.module_index,
    'moduleTitle', l.module_title,
    'canonicalNode', l.canonical_node,
    'atomicPosition', l.atomic_position,
    'atomicTotalInModule', l.atomic_total_in_module,
    'atomicAuditVersion', l.atomic_audit_version,
    'clearance', l.clearance,
    'nominalControlStateFinal', l.nominal_control_state_final,
    'highestEffectiveAssistance', l.highest_effective_assistance,
    'recoveryState', l.recovery_state,
    'unresolvedGate', l.unresolved_gate,
    'focusedHours', l.focused_hours,
    'startedAt', l.started_at,
    'completedAt', l.completed_at,
    'proofDebt', l.proof_debt,
    'implementationDebt', l.implementation_debt,
    'transferDebt', l.transfer_debt,
    'recoveryDebt', l.recovery_debt,
    'assistanceSummary', l.assistance_summary,
    'provenanceSummary', l.provenance_summary,
    'assistanceEvents', l.assistance_events,
    'authorityRevision', l.authority_revision,
    'identitySourceArcId', l.identity_source_arc_id,
    'identitySourceDocumentType', l.identity_source_document_type,
    'seededFromArcId', l.seeded_from_arc_id,
    'seededFromDocumentType', l.seeded_from_document_type,
    'createdAt', l.created_at,
    'updatedAt', l.updated_at
  )
  from public.arc_logical_arcs l
  where l.user_id = p_user_id
    and l.logical_arc_id = p_logical_arc_id;
$$;

create or replace function public.chrono_load_logical_arc_authority(p_logical_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select public.chrono_logical_arc_authority_json_internal((select auth.uid()), p_logical_arc_id);
$$;

create or replace function public.chrono_load_logical_arc_revisions(
  p_logical_arc_id text,
  p_limit integer default 50
)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'authorityRevision', r.authority_revision,
      'note', r.note,
      'snapshot', r.snapshot,
      'createdAt', r.created_at
    ) order by r.authority_revision desc
  ), '[]'::jsonb)
  from (
    select *
    from public.arc_logical_arc_revisions
    where user_id = (select auth.uid())
      and logical_arc_id = p_logical_arc_id
    order by authority_revision desc
    limit greatest(1, least(coalesce(p_limit, 50), 500))
  ) r;
$$;

-- Backfill deterministically: POLISHED > canonical > RAW > other.
with ranked as (
  select
    d.*,
    row_number() over (
      partition by d.user_id, d.logical_arc_id
      order by
        case d.document_type
          when 'polished_extract' then 0
          when 'canonical' then 1
          when 'raw_dump' then 2
          else 3
        end,
        d.updated_at desc,
        d.arc_id
    ) as rn
  from public.arc_documents d
), chosen as (
  select * from ranked where rn = 1
)
insert into public.arc_logical_arcs (
  user_id, logical_arc_id, canonical_label, title,
  terminal_id, terminal_title, module_id, module_index, module_title,
  canonical_node, atomic_position, atomic_total_in_module, atomic_audit_version,
  clearance, nominal_control_state_final, highest_effective_assistance,
  recovery_state, unresolved_gate, focused_hours, started_at, completed_at,
  proof_debt, implementation_debt, transfer_debt, recovery_debt,
  assistance_summary, provenance_summary, assistance_events,
  identity_source_arc_id, identity_source_document_type,
  seeded_from_arc_id, seeded_from_document_type,
  created_at, updated_at
)
select
  d.user_id,
  d.logical_arc_id,
  d.canonical_label,
  d.title,
  nullif(d.archive_metadata->>'terminalId', ''),
  nullif(d.archive_metadata->>'terminalTitle', ''),
  nullif(d.archive_metadata->>'moduleId', ''),
  case when nullif(d.archive_metadata->>'moduleIndex', '') is null then null else (d.archive_metadata->>'moduleIndex')::integer end,
  nullif(d.archive_metadata->>'moduleTitle', ''),
  nullif(d.archive_metadata->>'canonicalNode', ''),
  case when nullif(d.archive_metadata->>'atomicPosition', '') is null then null else (d.archive_metadata->>'atomicPosition')::integer end,
  case when nullif(d.archive_metadata->>'atomicTotalInModule', '') is null then null else (d.archive_metadata->>'atomicTotalInModule')::integer end,
  nullif(d.archive_metadata->>'atomicAuditVersion', ''),
  d.clearance,
  nullif(d.archive_metadata->>'nominalControlStateFinal', ''),
  nullif(d.archive_metadata->>'highestEffectiveAssistance', ''),
  coalesce(nullif(d.archive_metadata->>'recoveryState', ''), 'unknown'),
  nullif(d.archive_metadata->>'unresolvedGate', ''),
  case when nullif(d.archive_metadata->>'focusedHours', '') is null then null else (d.archive_metadata->>'focusedHours')::numeric end,
  case when nullif(d.archive_metadata->>'startedAt', '') is null then null else (d.archive_metadata->>'startedAt')::date end,
  case when nullif(d.archive_metadata->>'completedAt', '') is null then null else (d.archive_metadata->>'completedAt')::date end,
  case when jsonb_typeof(d.archive_metadata->'proofDebt') = 'array' then d.archive_metadata->'proofDebt' else '[]'::jsonb end,
  case when jsonb_typeof(d.archive_metadata->'implementationDebt') = 'array' then d.archive_metadata->'implementationDebt' else '[]'::jsonb end,
  case when jsonb_typeof(d.archive_metadata->'transferDebt') = 'array' then d.archive_metadata->'transferDebt' else '[]'::jsonb end,
  case when jsonb_typeof(d.archive_metadata->'recoveryDebt') = 'array' then d.archive_metadata->'recoveryDebt' else '[]'::jsonb end,
  nullif(d.archive_metadata->>'assistanceSummary', ''),
  nullif(d.archive_metadata->>'provenanceSummary', ''),
  case when jsonb_typeof(d.archive_metadata->'assistanceEvents') = 'array' then d.archive_metadata->'assistanceEvents' else '[]'::jsonb end,
  d.arc_id,
  d.document_type,
  d.arc_id,
  d.document_type,
  d.created_at,
  d.updated_at
from chosen d
on conflict (user_id, logical_arc_id) do nothing;

insert into public.arc_logical_arc_revisions (
  user_id, logical_arc_id, authority_revision, note, snapshot, created_at
)
select
  l.user_id,
  l.logical_arc_id,
  l.authority_revision,
  'Backfilled logical authority from ' || coalesce(l.seeded_from_arc_id, 'existing document'),
  public.chrono_logical_arc_authority_json_internal(l.user_id, l.logical_arc_id),
  l.updated_at
from public.arc_logical_arcs l
on conflict (user_id, logical_arc_id, authority_revision) do nothing;

-- Seed if absent. If authority already exists, only identity/curriculum fields
-- can refresh from the best representation. Academic fields are untouched.
create or replace function public.chrono_refresh_logical_arc_identity(
  p_user_id uuid,
  p_logical_arc_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auth_user_id uuid := (select auth.uid());
  v_doc public.arc_documents%rowtype;
  v_meta jsonb;
  v_existing public.arc_logical_arcs%rowtype;
  v_new_revision integer;
  v_snapshot jsonb;
begin
  if p_user_id is null or nullif(btrim(p_logical_arc_id), '') is null then
    raise exception 'user_id and logical_arc_id are required';
  end if;
  if v_auth_user_id is not null and v_auth_user_id <> p_user_id then
    raise exception 'Not authorized for this logical ARC';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_logical_arc_id, 0));

  select d.* into v_doc
  from public.arc_documents d
  where d.user_id = p_user_id
    and d.logical_arc_id = p_logical_arc_id
  order by
    case d.document_type
      when 'polished_extract' then 0
      when 'canonical' then 1
      when 'raw_dump' then 2
      else 3
    end,
    d.updated_at desc,
    d.arc_id
  limit 1;

  if not found then return null; end if;
  v_meta := coalesce(v_doc.archive_metadata, '{}'::jsonb);

  select * into v_existing
  from public.arc_logical_arcs l
  where l.user_id = p_user_id and l.logical_arc_id = p_logical_arc_id
  for update;

  if not found then
    insert into public.arc_logical_arcs (
      user_id, logical_arc_id, canonical_label, title,
      terminal_id, terminal_title, module_id, module_index, module_title,
      canonical_node, atomic_position, atomic_total_in_module, atomic_audit_version,
      clearance, nominal_control_state_final, highest_effective_assistance,
      recovery_state, unresolved_gate, focused_hours, started_at, completed_at,
      proof_debt, implementation_debt, transfer_debt, recovery_debt,
      assistance_summary, provenance_summary, assistance_events,
      identity_source_arc_id, identity_source_document_type,
      seeded_from_arc_id, seeded_from_document_type,
      authority_revision, created_at, updated_at
    ) values (
      p_user_id,
      p_logical_arc_id,
      v_doc.canonical_label,
      v_doc.title,
      nullif(v_meta->>'terminalId', ''),
      nullif(v_meta->>'terminalTitle', ''),
      nullif(v_meta->>'moduleId', ''),
      case when nullif(v_meta->>'moduleIndex', '') is null then null else (v_meta->>'moduleIndex')::integer end,
      nullif(v_meta->>'moduleTitle', ''),
      nullif(v_meta->>'canonicalNode', ''),
      case when nullif(v_meta->>'atomicPosition', '') is null then null else (v_meta->>'atomicPosition')::integer end,
      case when nullif(v_meta->>'atomicTotalInModule', '') is null then null else (v_meta->>'atomicTotalInModule')::integer end,
      nullif(v_meta->>'atomicAuditVersion', ''),
      v_doc.clearance,
      nullif(v_meta->>'nominalControlStateFinal', ''),
      nullif(v_meta->>'highestEffectiveAssistance', ''),
      coalesce(nullif(v_meta->>'recoveryState', ''), 'unknown'),
      nullif(v_meta->>'unresolvedGate', ''),
      case when nullif(v_meta->>'focusedHours', '') is null then null else (v_meta->>'focusedHours')::numeric end,
      case when nullif(v_meta->>'startedAt', '') is null then null else (v_meta->>'startedAt')::date end,
      case when nullif(v_meta->>'completedAt', '') is null then null else (v_meta->>'completedAt')::date end,
      case when jsonb_typeof(v_meta->'proofDebt') = 'array' then v_meta->'proofDebt' else '[]'::jsonb end,
      case when jsonb_typeof(v_meta->'implementationDebt') = 'array' then v_meta->'implementationDebt' else '[]'::jsonb end,
      case when jsonb_typeof(v_meta->'transferDebt') = 'array' then v_meta->'transferDebt' else '[]'::jsonb end,
      case when jsonb_typeof(v_meta->'recoveryDebt') = 'array' then v_meta->'recoveryDebt' else '[]'::jsonb end,
      nullif(v_meta->>'assistanceSummary', ''),
      nullif(v_meta->>'provenanceSummary', ''),
      case when jsonb_typeof(v_meta->'assistanceEvents') = 'array' then v_meta->'assistanceEvents' else '[]'::jsonb end,
      v_doc.arc_id,
      v_doc.document_type,
      v_doc.arc_id,
      v_doc.document_type,
      1,
      v_doc.created_at,
      v_doc.updated_at
    );

    v_snapshot := public.chrono_logical_arc_authority_json_internal(p_user_id, p_logical_arc_id);
    insert into public.arc_logical_arc_revisions (
      user_id, logical_arc_id, authority_revision, note, snapshot, created_at
    ) values (
      p_user_id,
      p_logical_arc_id,
      1,
      'Seeded logical authority from ' || v_doc.arc_id,
      v_snapshot,
      v_doc.updated_at
    );
    return v_snapshot;
  end if;

  update public.arc_logical_arcs l
  set
    canonical_label = v_doc.canonical_label,
    title = v_doc.title,
    terminal_id = nullif(v_meta->>'terminalId', ''),
    terminal_title = nullif(v_meta->>'terminalTitle', ''),
    module_id = nullif(v_meta->>'moduleId', ''),
    module_index = case when nullif(v_meta->>'moduleIndex', '') is null then null else (v_meta->>'moduleIndex')::integer end,
    module_title = nullif(v_meta->>'moduleTitle', ''),
    canonical_node = nullif(v_meta->>'canonicalNode', ''),
    atomic_position = case when nullif(v_meta->>'atomicPosition', '') is null then null else (v_meta->>'atomicPosition')::integer end,
    atomic_total_in_module = case when nullif(v_meta->>'atomicTotalInModule', '') is null then null else (v_meta->>'atomicTotalInModule')::integer end,
    atomic_audit_version = nullif(v_meta->>'atomicAuditVersion', ''),
    identity_source_arc_id = v_doc.arc_id,
    identity_source_document_type = v_doc.document_type,
    authority_revision = l.authority_revision + 1,
    updated_at = now()
  where l.user_id = p_user_id
    and l.logical_arc_id = p_logical_arc_id
    and row(
      l.canonical_label, l.title, l.terminal_id, l.terminal_title,
      l.module_id, l.module_index, l.module_title, l.canonical_node,
      l.atomic_position, l.atomic_total_in_module, l.atomic_audit_version,
      l.identity_source_arc_id, l.identity_source_document_type
    ) is distinct from row(
      v_doc.canonical_label,
      v_doc.title,
      nullif(v_meta->>'terminalId', ''),
      nullif(v_meta->>'terminalTitle', ''),
      nullif(v_meta->>'moduleId', ''),
      case when nullif(v_meta->>'moduleIndex', '') is null then null else (v_meta->>'moduleIndex')::integer end,
      nullif(v_meta->>'moduleTitle', ''),
      nullif(v_meta->>'canonicalNode', ''),
      case when nullif(v_meta->>'atomicPosition', '') is null then null else (v_meta->>'atomicPosition')::integer end,
      case when nullif(v_meta->>'atomicTotalInModule', '') is null then null else (v_meta->>'atomicTotalInModule')::integer end,
      nullif(v_meta->>'atomicAuditVersion', ''),
      v_doc.arc_id,
      v_doc.document_type
    )
  returning l.authority_revision into v_new_revision;

  if v_new_revision is not null then
    v_snapshot := public.chrono_logical_arc_authority_json_internal(p_user_id, p_logical_arc_id);
    insert into public.arc_logical_arc_revisions (
      user_id, logical_arc_id, authority_revision, note, snapshot, created_at
    ) values (
      p_user_id,
      p_logical_arc_id,
      v_new_revision,
      'Refreshed logical identity from ' || v_doc.arc_id,
      v_snapshot,
      now()
    );
  end if;

  return public.chrono_logical_arc_authority_json_internal(p_user_id, p_logical_arc_id);
end;
$$;

-- Explicit academic-authority mutation. No representation document is rewritten.
create or replace function public.chrono_update_logical_arc_authority(
  p_logical_arc_id text,
  p_patch jsonb,
  p_expected_revision integer,
  p_note text default 'Updated logical ARC authority'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_current public.arc_logical_arcs%rowtype;
  v_unknown text;
  v_clearance text;
  v_nominal text;
  v_effective text;
  v_recovery_state text;
  v_unresolved_gate text;
  v_focused_hours numeric;
  v_started_at date;
  v_completed_at date;
  v_proof_debt jsonb;
  v_implementation_debt jsonb;
  v_transfer_debt jsonb;
  v_recovery_debt jsonb;
  v_assistance_summary text;
  v_provenance_summary text;
  v_assistance_events jsonb;
  v_new_revision integer;
  v_changed_count bigint := 0;
  v_snapshot jsonb;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if nullif(btrim(p_logical_arc_id), '') is null then raise exception 'logicalArcId is required'; end if;
  if p_patch is null or jsonb_typeof(p_patch) <> 'object' then raise exception 'patch must be a JSON object'; end if;
  if p_expected_revision is null or p_expected_revision < 1 then raise exception 'expected authority revision must be >= 1'; end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text || ':' || p_logical_arc_id, 0));

  select * into v_current
  from public.arc_logical_arcs l
  where l.user_id = v_user_id and l.logical_arc_id = p_logical_arc_id
  for update;

  if not found then raise exception 'Logical ARC authority not found: %', p_logical_arc_id; end if;
  if v_current.authority_revision <> p_expected_revision then
    raise exception 'AUTHORITY_CONFLICT: cloud revision %, expected %', v_current.authority_revision, p_expected_revision;
  end if;

  select string_agg(k.key, ', ' order by k.key) into v_unknown
  from jsonb_object_keys(p_patch) as k(key)
  where not (k.key = any(array[
    'clearance','nominalControlStateFinal','highestEffectiveAssistance','recoveryState',
    'unresolvedGate','focusedHours','startedAt','completedAt','proofDebt',
    'implementationDebt','transferDebt','recoveryDebt','assistanceSummary',
    'provenanceSummary','assistanceEvents'
  ]::text[]));
  if v_unknown is not null then raise exception 'Unsupported authority patch fields: %', v_unknown; end if;

  if p_patch ? 'proofDebt' and jsonb_typeof(p_patch->'proofDebt') is distinct from 'array' then raise exception 'proofDebt must be an array'; end if;
  if p_patch ? 'implementationDebt' and jsonb_typeof(p_patch->'implementationDebt') is distinct from 'array' then raise exception 'implementationDebt must be an array'; end if;
  if p_patch ? 'transferDebt' and jsonb_typeof(p_patch->'transferDebt') is distinct from 'array' then raise exception 'transferDebt must be an array'; end if;
  if p_patch ? 'recoveryDebt' and jsonb_typeof(p_patch->'recoveryDebt') is distinct from 'array' then raise exception 'recoveryDebt must be an array'; end if;
  if p_patch ? 'assistanceEvents' and jsonb_typeof(p_patch->'assistanceEvents') is distinct from 'array' then raise exception 'assistanceEvents must be an array'; end if;

  v_clearance := case when p_patch ? 'clearance'
    then public.chrono_normalize_clearance(p_patch->>'clearance') else v_current.clearance end;
  if v_clearance is null then raise exception 'Unsupported clearance value'; end if;

  v_nominal := case when p_patch ? 'nominalControlStateFinal'
    then nullif(upper(btrim(p_patch->>'nominalControlStateFinal')), '') else v_current.nominal_control_state_final end;
  v_effective := case when p_patch ? 'highestEffectiveAssistance'
    then nullif(upper(btrim(p_patch->>'highestEffectiveAssistance')), '') else v_current.highest_effective_assistance end;
  v_recovery_state := case when p_patch ? 'recoveryState'
    then lower(btrim(p_patch->>'recoveryState')) else v_current.recovery_state end;

  if v_recovery_state is null or v_recovery_state not in ('not_owed','owed','cleared','unknown') then
    raise exception 'Unsupported recoveryState value';
  end if;
  if v_nominal is not null and v_nominal not in ('WALL','HINT','FORGE','FORGE0','FORGE1','FORGE2','FORGE3','FORGE4','FORGE5','GUIDE','REVEAL') then
    raise exception 'Unsupported nominalControlStateFinal value';
  end if;
  if v_effective is not null and v_effective not in ('WALL','HINT','FORGE','FORGE0','FORGE1','FORGE2','FORGE3','FORGE4','FORGE5','GUIDE','REVEAL') then
    raise exception 'Unsupported highestEffectiveAssistance value';
  end if;

  v_unresolved_gate := case when p_patch ? 'unresolvedGate' then nullif(p_patch->>'unresolvedGate', '') else v_current.unresolved_gate end;
  v_focused_hours := case when p_patch ? 'focusedHours'
    then case when p_patch->'focusedHours' = 'null'::jsonb then null else (p_patch->>'focusedHours')::numeric end
    else v_current.focused_hours end;
  v_started_at := case when p_patch ? 'startedAt' then nullif(p_patch->>'startedAt', '')::date else v_current.started_at end;
  v_completed_at := case when p_patch ? 'completedAt' then nullif(p_patch->>'completedAt', '')::date else v_current.completed_at end;
  v_proof_debt := case when p_patch ? 'proofDebt' then p_patch->'proofDebt' else v_current.proof_debt end;
  v_implementation_debt := case when p_patch ? 'implementationDebt' then p_patch->'implementationDebt' else v_current.implementation_debt end;
  v_transfer_debt := case when p_patch ? 'transferDebt' then p_patch->'transferDebt' else v_current.transfer_debt end;
  v_recovery_debt := case when p_patch ? 'recoveryDebt' then p_patch->'recoveryDebt' else v_current.recovery_debt end;
  v_assistance_summary := case when p_patch ? 'assistanceSummary' then nullif(p_patch->>'assistanceSummary', '') else v_current.assistance_summary end;
  v_provenance_summary := case when p_patch ? 'provenanceSummary' then nullif(p_patch->>'provenanceSummary', '') else v_current.provenance_summary end;
  v_assistance_events := case when p_patch ? 'assistanceEvents' then p_patch->'assistanceEvents' else v_current.assistance_events end;

  if v_focused_hours is not null and v_focused_hours < 0 then raise exception 'focusedHours must be >= 0 or null'; end if;
  if v_started_at is not null and v_completed_at is not null and v_completed_at < v_started_at then raise exception 'completedAt cannot precede startedAt'; end if;

  update public.arc_logical_arcs l
  set
    clearance = v_clearance,
    nominal_control_state_final = v_nominal,
    highest_effective_assistance = v_effective,
    recovery_state = v_recovery_state,
    unresolved_gate = v_unresolved_gate,
    focused_hours = v_focused_hours,
    started_at = v_started_at,
    completed_at = v_completed_at,
    proof_debt = v_proof_debt,
    implementation_debt = v_implementation_debt,
    transfer_debt = v_transfer_debt,
    recovery_debt = v_recovery_debt,
    assistance_summary = v_assistance_summary,
    provenance_summary = v_provenance_summary,
    assistance_events = v_assistance_events,
    authority_revision = l.authority_revision + 1,
    updated_at = now()
  where l.user_id = v_user_id
    and l.logical_arc_id = p_logical_arc_id
    and row(
      l.clearance, l.nominal_control_state_final, l.highest_effective_assistance,
      l.recovery_state, l.unresolved_gate, l.focused_hours, l.started_at, l.completed_at,
      l.proof_debt, l.implementation_debt, l.transfer_debt, l.recovery_debt,
      l.assistance_summary, l.provenance_summary, l.assistance_events
    ) is distinct from row(
      v_clearance, v_nominal, v_effective,
      v_recovery_state, v_unresolved_gate, v_focused_hours, v_started_at, v_completed_at,
      v_proof_debt, v_implementation_debt, v_transfer_debt, v_recovery_debt,
      v_assistance_summary, v_provenance_summary, v_assistance_events
    )
  returning l.authority_revision into v_new_revision;
  get diagnostics v_changed_count = row_count;

  if v_changed_count > 0 then
    v_snapshot := public.chrono_logical_arc_authority_json_internal(v_user_id, p_logical_arc_id);
    insert into public.arc_logical_arc_revisions (
      user_id, logical_arc_id, authority_revision, note, snapshot, created_at
    ) values (
      v_user_id,
      p_logical_arc_id,
      v_new_revision,
      coalesce(nullif(btrim(p_note), ''), 'Updated logical ARC authority'),
      v_snapshot,
      now()
    );
  end if;

  return coalesce(
    public.chrono_logical_arc_authority_json_internal(v_user_id, p_logical_arc_id),
    '{}'::jsonb
  ) || jsonb_build_object('noOp', v_changed_count = 0);
end;
$$;

-- V3 representation sync persists V3 document metadata/section roles, then
-- seeds or refreshes logical identity only.
create or replace function public.chrono_sync_obsidian_arc_v3(
  p_document jsonb,
  p_relationships jsonb default '[]'::jsonb,
  p_expected_revision integer default 0,
  p_note text default 'Synced from Obsidian'
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_arc_id text := nullif(trim(p_document->>'arcId'), '');
  v_logical_arc_id text;
  v_v2_saved jsonb;
  v_saved jsonb;
  v_authority jsonb;
  v_no_op boolean := false;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_arc_id is null then raise exception 'ARC document is missing arcId'; end if;

  select public.chrono_sync_obsidian_arc_v2(
    p_document,
    p_relationships,
    p_expected_revision,
    p_note
  ) into v_v2_saved;

  v_no_op := coalesce((v_v2_saved->>'noOp')::boolean, false);

  update public.arc_documents d
  set
    tags = case
      when jsonb_typeof(p_document->'tags') = 'array'
      then array(select jsonb_array_elements_text(p_document->'tags'))
      else d.tags
    end,
    source_frontmatter = case
      when jsonb_typeof(p_document->'sourceFrontmatter') = 'object'
      then p_document->'sourceFrontmatter'
      else d.source_frontmatter
    end,
    archive_metadata = case
      when jsonb_typeof(p_document->'archiveMetadata') = 'object'
      then p_document->'archiveMetadata'
      else d.archive_metadata
    end,
    updated_at = now()
  where d.user_id = v_user_id and d.arc_id = v_arc_id;

  with incoming as (
    select
      nullif(section.value->>'id', '') as section_id,
      coalesce(nullif(section.value->>'sectionRole', ''), 'notes') as section_role
    from jsonb_array_elements(coalesce(p_document->'sections', '[]'::jsonb))
      with ordinality as section(value, ordinality)
  )
  update public.arc_sections s
  set section_role = i.section_role
  from incoming i
  where s.user_id = v_user_id
    and s.arc_id = v_arc_id
    and i.section_id is not null
    and s.section_id = i.section_id
    and s.section_role is distinct from i.section_role;

  select d.logical_arc_id into v_logical_arc_id
  from public.arc_documents d
  where d.user_id = v_user_id and d.arc_id = v_arc_id;

  select public.chrono_refresh_logical_arc_identity(v_user_id, v_logical_arc_id)
    into v_authority;

  select public.chrono_load_obsidian_arc(v_arc_id) into v_saved;
  return v_saved || jsonb_build_object(
    'noOp', v_no_op,
    'logicalAuthority', v_authority
  );
end;
$$;

-- Additive bundle RPCs. The older document-array bundle stays unchanged.
create or replace function public.chrono_load_arc_bundle_with_authority(p_logical_arc_id text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object(
    'logicalArcId', p_logical_arc_id,
    'authority', public.chrono_load_logical_arc_authority(p_logical_arc_id),
    'documents', public.chrono_load_arc_bundle(p_logical_arc_id)
  );
$$;

create or replace function public.chrono_load_logical_arc_authority_admin(
  p_user_id uuid,
  p_logical_arc_id text
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select public.chrono_logical_arc_authority_json_internal(p_user_id, p_logical_arc_id);
$$;

create or replace function public.chrono_load_arc_bundle_with_authority_admin(
  p_user_id uuid,
  p_logical_arc_id text
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'logicalArcId', p_logical_arc_id,
    'authority', public.chrono_load_logical_arc_authority_admin(p_user_id, p_logical_arc_id),
    'documents', public.chrono_load_arc_bundle_admin(p_user_id, p_logical_arc_id)
  );
$$;

create or replace function public.chrono_logical_authority_drift_admin(
  p_user_id uuid,
  p_logical_arc_id text default null
)
returns table (
  logical_arc_id text,
  arc_id text,
  document_type text,
  clearance_drift boolean,
  recovery_state_drift boolean,
  effective_assistance_drift boolean,
  unresolved_gate_drift boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    d.logical_arc_id,
    d.arc_id,
    d.document_type,
    d.clearance is distinct from l.clearance,
    case when d.archive_metadata ? 'recoveryState'
      then (d.archive_metadata->>'recoveryState') is distinct from l.recovery_state else false end,
    case when d.archive_metadata ? 'highestEffectiveAssistance'
      then (d.archive_metadata->>'highestEffectiveAssistance') is distinct from l.highest_effective_assistance else false end,
    case when d.archive_metadata ? 'unresolvedGate'
      then nullif(d.archive_metadata->>'unresolvedGate', '') is distinct from l.unresolved_gate else false end
  from public.arc_documents d
  join public.arc_logical_arcs l
    on l.user_id = d.user_id and l.logical_arc_id = d.logical_arc_id
  where d.user_id = p_user_id
    and (p_logical_arc_id is null or d.logical_arc_id = p_logical_arc_id)
  order by d.logical_arc_id, d.arc_id;
$$;

-- Authority-aware semantic completion filtering.
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
    select case when btrim(coalesce(p_query, '')) = '' then null::tsquery
      else websearch_to_tsquery('english', p_query) end as query
  ), scored as (
    select
      e.arc_id, e.logical_arc_id, e.document_type, d.title,
      e.section_id, e.section_heading, e.chunk_index, e.content,
      greatest(-1.0, least(1.0, 1.0 - (e.embedding <=> p_query_embedding)))::double precision as semantic_score,
      case when q.query is null then 0.0 else ts_rank_cd(e.search_vector, q.query)::double precision end as raw_lexical_score
    from public.arc_section_embeddings e
    join public.arc_documents d on d.user_id = e.user_id and d.arc_id = e.arc_id
    left join public.arc_logical_arcs l on l.user_id = e.user_id and l.logical_arc_id = e.logical_arc_id
    cross join q
    where e.user_id = (select auth.uid())
      and e.embedding is not null
      and (p_logical_arc_id is null or e.logical_arc_id = p_logical_arc_id)
      and (p_document_type is null or e.document_type = p_document_type)
      and (
        not p_completed_only
        or coalesce(l.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      )
  )
  select
    s.arc_id, s.logical_arc_id, s.document_type, s.title,
    s.section_id, s.section_heading, s.chunk_index, s.content,
    s.semantic_score,
    (s.raw_lexical_score / (1.0 + s.raw_lexical_score))::double precision as lexical_score,
    (0.72 * greatest(0.0, s.semantic_score) + 0.28 * (s.raw_lexical_score / (1.0 + s.raw_lexical_score)))::double precision as hybrid_score
  from scored s
  order by hybrid_score desc, semantic_score desc, logical_arc_id, arc_id, section_id, chunk_index
  limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;

create or replace function public.chrono_semantic_related_arcs(
  p_logical_arc_id text,
  p_limit integer default 8
)
returns table (logical_arc_id text, title text, similarity double precision)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with source_chunks as (
    select e.embedding
    from public.arc_section_embeddings e
    join public.arc_documents d on d.user_id = e.user_id and d.arc_id = e.arc_id
    left join public.arc_logical_arcs l on l.user_id = e.user_id and l.logical_arc_id = e.logical_arc_id
    where e.user_id = (select auth.uid())
      and e.logical_arc_id = p_logical_arc_id
      and e.embedding is not null
      and coalesce(l.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and e.document_type in ('polished_extract','canonical')
  ), pair_scores as (
    select
      c.logical_arc_id,
      coalesce(cl.title, d.title) as title,
      (1.0 - (c.embedding <=> s.embedding))::double precision as similarity,
      row_number() over (partition by c.logical_arc_id order by (1.0 - (c.embedding <=> s.embedding)) desc) as rn
    from source_chunks s
    cross join public.arc_section_embeddings c
    join public.arc_documents d on d.user_id = c.user_id and d.arc_id = c.arc_id
    left join public.arc_logical_arcs cl on cl.user_id = c.user_id and cl.logical_arc_id = c.logical_arc_id
    where c.user_id = (select auth.uid())
      and c.logical_arc_id <> p_logical_arc_id
      and c.embedding is not null
      and coalesce(cl.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and c.document_type in ('polished_extract','canonical')
  ), aggregated as (
    select p.logical_arc_id, max(p.title) as title,
      avg(p.similarity) filter (where p.rn <= 3)::double precision as similarity
    from pair_scores p group by p.logical_arc_id
  )
  select a.logical_arc_id, a.title, a.similarity
  from aggregated a where a.similarity is not null
  order by a.similarity desc, a.logical_arc_id
  limit greatest(1, least(coalesce(p_limit, 8), 50));
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
    select case when btrim(coalesce(p_query, '')) = '' then null::tsquery
      else websearch_to_tsquery('english', p_query) end as query
  ), scored as (
    select
      e.arc_id, e.logical_arc_id, e.document_type, d.title,
      e.section_id, e.section_heading, e.chunk_index, e.content,
      greatest(-1.0, least(1.0, 1.0 - (e.embedding <=> p_query_embedding)))::double precision as semantic_score,
      case when q.query is null then 0.0 else ts_rank_cd(e.search_vector, q.query)::double precision end as raw_lexical_score
    from public.arc_section_embeddings e
    join public.arc_documents d on d.user_id = e.user_id and d.arc_id = e.arc_id
    left join public.arc_logical_arcs l on l.user_id = e.user_id and l.logical_arc_id = e.logical_arc_id
    cross join q
    where e.user_id = p_user_id
      and e.embedding is not null
      and (p_logical_arc_id is null or e.logical_arc_id = p_logical_arc_id)
      and (p_document_type is null or e.document_type = p_document_type)
      and (
        not p_completed_only
        or coalesce(l.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      )
  )
  select
    s.arc_id, s.logical_arc_id, s.document_type, s.title,
    s.section_id, s.section_heading, s.chunk_index, s.content,
    s.semantic_score,
    (s.raw_lexical_score / (1.0 + s.raw_lexical_score))::double precision as lexical_score,
    (0.72 * greatest(0.0, s.semantic_score) + 0.28 * (s.raw_lexical_score / (1.0 + s.raw_lexical_score)))::double precision as hybrid_score
  from scored s
  order by hybrid_score desc, semantic_score desc, logical_arc_id, arc_id, section_id, chunk_index
  limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;

create or replace function public.chrono_semantic_related_arcs_admin(
  p_user_id uuid,
  p_logical_arc_id text,
  p_limit integer default 8
)
returns table (logical_arc_id text, title text, similarity double precision)
language sql
stable
security definer
set search_path = public, extensions
as $$
  with source_chunks as (
    select e.embedding
    from public.arc_section_embeddings e
    join public.arc_documents d on d.user_id = e.user_id and d.arc_id = e.arc_id
    left join public.arc_logical_arcs l on l.user_id = e.user_id and l.logical_arc_id = e.logical_arc_id
    where e.user_id = p_user_id
      and e.logical_arc_id = p_logical_arc_id
      and e.embedding is not null
      and coalesce(l.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and e.document_type in ('polished_extract','canonical')
  ), pair_scores as (
    select
      c.logical_arc_id,
      coalesce(cl.title, d.title) as title,
      (1.0 - (c.embedding <=> s.embedding))::double precision as similarity,
      row_number() over (partition by c.logical_arc_id order by (1.0 - (c.embedding <=> s.embedding)) desc) as rn
    from source_chunks s
    cross join public.arc_section_embeddings c
    join public.arc_documents d on d.user_id = c.user_id and d.arc_id = c.arc_id
    left join public.arc_logical_arcs cl on cl.user_id = c.user_id and cl.logical_arc_id = c.logical_arc_id
    where c.user_id = p_user_id
      and c.logical_arc_id <> p_logical_arc_id
      and c.embedding is not null
      and coalesce(cl.clearance, d.clearance) in ('core_cleared','core_cleared_mastery_pending','fully_mastered')
      and c.document_type in ('polished_extract','canonical')
  ), aggregated as (
    select p.logical_arc_id, max(p.title) as title,
      avg(p.similarity) filter (where p.rn <= 3)::double precision as similarity
    from pair_scores p group by p.logical_arc_id
  )
  select a.logical_arc_id, a.title, a.similarity
  from aggregated a where a.similarity is not null
  order by a.similarity desc, a.logical_arc_id
  limit greatest(1, least(coalesce(p_limit, 8), 50));
$$;

-- Tight function ACLs.
revoke all on function public.chrono_logical_arc_authority_json_internal(uuid, text) from public, anon;
revoke all on function public.chrono_refresh_logical_arc_identity(uuid, text) from public, anon;
revoke all on function public.chrono_update_logical_arc_authority(text, jsonb, integer, text) from public, anon;
revoke all on function public.chrono_load_logical_arc_authority_admin(uuid, text) from public, anon, authenticated;
revoke all on function public.chrono_load_arc_bundle_with_authority_admin(uuid, text) from public, anon, authenticated;
revoke all on function public.chrono_logical_authority_drift_admin(uuid, text) from public, anon, authenticated;

grant execute on function public.chrono_logical_arc_authority_json_internal(uuid, text) to authenticated, service_role;
grant execute on function public.chrono_load_logical_arc_authority(text) to authenticated;
grant execute on function public.chrono_load_logical_arc_revisions(text, integer) to authenticated;
grant execute on function public.chrono_refresh_logical_arc_identity(uuid, text) to authenticated;
grant execute on function public.chrono_update_logical_arc_authority(text, jsonb, integer, text) to authenticated;
grant execute on function public.chrono_sync_obsidian_arc_v3(jsonb, jsonb, integer, text) to authenticated;
grant execute on function public.chrono_load_arc_bundle_with_authority(text) to authenticated;
grant execute on function public.chrono_hybrid_search_arc_chunks(text, extensions.vector, text, text, boolean, integer) to authenticated;
grant execute on function public.chrono_semantic_related_arcs(text, integer) to authenticated;

grant execute on function public.chrono_load_logical_arc_authority_admin(uuid, text) to service_role;
grant execute on function public.chrono_load_arc_bundle_with_authority_admin(uuid, text) to service_role;
grant execute on function public.chrono_logical_authority_drift_admin(uuid, text) to service_role;
grant execute on function public.chrono_hybrid_search_arc_chunks_admin(uuid, text, extensions.vector, text, text, boolean, integer) to service_role;
grant execute on function public.chrono_semantic_related_arcs_admin(uuid, text, integer) to service_role;

commit;
