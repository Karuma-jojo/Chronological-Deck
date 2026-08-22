# Chrono-Deck Logical ARC Authority

`arc_logical_arcs` is the academic/mastery authority for one logical learning event.

It exists because RAW, POLISHED, canonical, proof, recovery, and supplementary documents are **representations**. They can preserve different prose, lifecycle states, or historical snapshots without being allowed to disagree about what the learner has actually cleared.

## Ownership split

### `arc_logical_arcs` owns

- `logical_arc_id`
- canonical curriculum coordinates
- academic `clearance`
- nominal final control state
- highest effective assistance
- recovery state and unresolved gate
- proof / implementation / transfer / recovery debt
- assistance and provenance summaries/events
- start/completion dates and focused hours
- an optimistic-lock `authority_revision`

### `arc_documents` owns

- document `arc_id`
- `document_type`
- document lifecycle/status
- representation title and Markdown
- sections and semantic section roles
- tags, media state, source path, revision history

RAW and POLISHED therefore remain valuable historical records. They are not the mutable mastery ledger.

## Seed rule

When the authority migration is first applied, one existing representation is selected deterministically for each logical ARC:

1. `polished_extract`
2. `canonical`
3. `raw_dump`
4. any other representation

That document seeds authority revision 1.

For a brand-new logical ARC created after the migration, the first synced representation seeds the row. If a better representation later appears (for example POLISHED after RAW), only identity/curriculum fields may refresh automatically.

**Ordinary document sync never overwrites established academic authority.**

This is deliberate. Re-syncing an old RAW note must never be able to roll back a later recovery decision.

## Explicit authority updates

Academic/mastery changes use:

```sql
chrono_update_logical_arc_authority(
  p_logical_arc_id,
  p_patch,
  p_expected_revision,
  p_note
)
```

Example conceptual patch after a successful independent recovery:

```json
{
  "recoveryState": "cleared",
  "unresolvedGate": null,
  "recoveryDebt": [],
  "clearance": "Fully Mastered"
}
```

The caller must supply the authority revision it last read. A stale revision raises `AUTHORITY_CONFLICT` rather than silently overwriting newer state.

Only these academic fields are patchable through the v1 RPC:

- `clearance`
- `nominalControlStateFinal`
- `highestEffectiveAssistance`
- `recoveryState`
- `unresolvedGate`
- `focusedHours`
- `startedAt`
- `completedAt`
- `proofDebt`
- `implementationDebt`
- `transferDebt`
- `recoveryDebt`
- `assistanceSummary`
- `provenanceSummary`
- `assistanceEvents`

Curriculum identity stays derived from the best canonical representation instead of being casually hand-edited through the mastery RPC.

## Revision ledger

Every actual authority change is snapshotted in:

```text
arc_logical_arc_revisions
```

Each snapshot stores:

- logical ARC ID
- authority revision
- change note
- complete authority JSON
- timestamp

No-op patches do not increment the revision.

Identity/curriculum refreshes also increment authority revision, because an optimistic-lock reader must be told that the authoritative row changed even when the academic fields did not.

## Representation drift

A later recovery/mastery update intentionally does **not** rewrite old RAW/POLISHED Markdown.

That means historical documents can legitimately differ from current authority. For audit purposes the migration exposes:

```sql
chrono_logical_authority_drift_admin(...)
```

It reports drift for duplicated fields such as clearance, recovery state, effective assistance, and unresolved gate.

Drift is therefore visible and auditable instead of being silently erased.

## Search semantics

`completedOnly` semantic search and related-ARC discovery now use:

```text
arc_logical_arcs.clearance
```

when a logical authority row exists.

`arc_documents.clearance` remains only as a compatibility fallback for installations or rows that predate the authority migration.

Semantic similarity remains non-authoritative. It may suggest `related` links, but it cannot set clearance, provenance, recovery state, prerequisites, or curriculum identity.

## Access control

Authenticated users can read their own authority rows and revision history under RLS.

Direct authenticated INSERT/UPDATE/DELETE on authority tables is revoked. Mutation happens through the reviewed RPCs only.

The private archive service receives authority through the service-role bundle RPC. The Edge Function keeps a fallback to the legacy document-only bundle during rolling deployment.

## Deployment order

After this change is merged:

1. apply `supabase/arc-logical-authority-v1.sql`;
2. verify the backfilled logical rows and revision-1 snapshots;
3. verify `T22-M01-A02` authority matches its current V3 pair;
4. deploy the updated `arc-archive-access` Edge Function;
5. verify archive bundle/search/related behavior;
6. run the drift audit;
7. only then treat the authority layer as production-complete for bulk imports.

The migration is additive. It does not rewrite existing ARC Markdown or embeddings.
