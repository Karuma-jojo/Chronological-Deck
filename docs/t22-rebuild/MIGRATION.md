# T22 v2 → proposed v3 Evidence and Content Migration

Status: architecture proposal only. No migration is executed in Stage A.

## Non-negotiable invariant

**A learner's old evidence may remain historical evidence, but it must never be silently reinterpreted as a different intellectual obligation.**

The current v2 atomic IDs (`T22-Mxx-Axx`) are route-position based. The proposed v3 route changes order, adds bridges, splits some capabilities and makes some existing advanced modules optional. Therefore a direct in-place reuse of positional IDs is unsafe.

## 1. Freeze existing evidence

Preserve without rewriting:

- `chrono_t22_atomic_progress_v2`;
- any archived v1/v2 local-progress records;
- existing macro completion in `chrono_mastery_world_v1_progress`;
- existing ARC archive documents and cloud clearance/review records;
- all T25 route/evidence state.

Stage B may expose v2 history in the UI, but Stage A creates no v3 checkmarks.

## 2. Proposed v3 session identity

Evidence identity must be independent of route order.

Recommended shape:

`T22V3::<stable-parent-id>::<stable-local-obligation-id>@<obligation-version>`

Examples:

- `T22V3::ARC048::A01@1`
- `T22V3::T22V3-T00::A01@1`
- `T22V3::T22V3-R00::A03@1`

The exact delimiter is an implementation detail for Astra/Stage B review. The semantic requirements are not:

1. stable parent/capability identity;
2. stable local obligation identity;
3. explicit obligation version;
4. route position stored separately and never used as mastery identity.

A future v3 progress record should also retain provenance such as clearance timestamp, evidence source and prior-equivalence mapping when applicable.

## 3. Migration classes

### Class A — unchanged semantic obligation, reordered only

Example: a current `ARC048` task is moved earlier but its task, rubric and mastery threshold are genuinely unchanged.

Policy:
- retain v2 completion as historical;
- v3 may inherit completion **only** through an explicit evidence-equivalence row identifying the exact old obligation and new obligation;
- reorder alone never changes the evidence ID.

### Class B — enriched or materially changed obligation

Policy:
- increment obligation version or create a new obligation ID;
- do not inherit completion;
- retain old evidence visibly as prior learning/history.

A changed prompt with a new transfer requirement is not the same obligation merely because its title is similar.

### Class C — split module

Likely example: the current broad Python/software capability is decomposed into `C00` primitives, `C01` exact enumeration/simulation and `C02` scientific Python/data work.

Policy:
- never mark all split children complete from one old macro checkmark;
- exact sub-obligations may inherit only after manual/content-hash equivalence review;
- otherwise the learner receives recognition/history without a false v3 clearance.

### Class D — early bridge extracted from advanced content

Example: `MKT00` teaches only prices/payoffs/returns/bid-ask/basic orders while deep `ARC553` and `ARC558` remain later.

Policy:
- create a new bridge identity;
- do not erase or downgrade existing `ARC553`/`ARC558` evidence;
- an old advanced clearance does not automatically clear a newly authored bridge unless explicit equivalence is declared.

### Class E — optionalized module

Examples: matrix calculus, ODEs, formal efficiency theory, MDPs, deep neural nets.

Policy:
- keep the module addressable;
- preserve all historical completions and archive links;
- remove only the requirement that it be completed on the default path;
- no evidence is deleted or downgraded.

## 4. Macro-completion inheritance must change for v3

Current T22 UI can infer all v2 atomic children complete when a macro is already cleared. That is not safe for a v3 parent whose children differ materially.

For v3:

- macro completion may remain a historical badge/state;
- v3 child evidence is derived only from v3 completion or explicit equivalence;
- a newly added child never receives completion solely because its parent was historically complete;
- aggregate v3 macro status should be computed from the versioned v3 child obligations, not the reverse.

## 5. Proposed equivalence manifest

Stage B should introduce a version-controlled manifest with rows similar to:

```json
{
  "fromEvidenceId": "T22-M17-A01",
  "fromAuditVersion": "2.0",
  "toEvidenceId": "T22V3::ARC048::A01@1",
  "equivalence": "exact",
  "reviewedBy": "...",
  "reason": "same public task, rubric, transfer obligation and threshold"
}
```

Allowed equivalence should be narrow (`exact` or an equally strict reviewed class), not title similarity.

If the old task cannot be reconstructed unambiguously from its positional ID plus route snapshot, no automatic mapping occurs.

## 6. Snapshot old identity before any runtime migration

Before Stage B changes the live route, persist a v2 identity snapshot containing at minimum:

- old atomic ID;
- parent macro ID at the v2 route position;
- old title/target;
- audit/rich-syllabus version;
- optional content hash for task/rubric when available.

This makes old checkmarks interpretable even after the route is reordered.

## 7. Storage proposal

Stage B may introduce a new local key such as `chrono_t22_atomic_progress_v3`, but it must not overwrite v2. A record-oriented form is preferable to a bare array of strings, for example:

```json
{
  "sessionId": "T22V3::ARC048::A01@1",
  "clearedAt": "...",
  "provenance": "direct-v3|explicit-v2-equivalence",
  "sourceEvidenceId": null
}
```

Cloud schema changes, if required, are a separate reviewed migration. Stage A performs none.

## 8. Rollback rule

Because v2 is frozen rather than rewritten, rolling back the v3 route must not destroy v2 evidence. The v3 route/equivalence manifest can be disabled while historical evidence remains intact.

## 9. T25 boundary

No T25 IDs, route files, generated course artifacts, review-retention state or learner progress are part of this migration. T25 is a reference implementation only.

## 10. Astra migration questions

Astra should explicitly decide whether:

1. parent-keyed ID + local obligation ID + obligation version is sufficient, or a content hash should be part of authoritative identity;
2. any macro-level historical completion should be allowed to map to v3 without child-level evidence;
3. exact-equivalence mapping should require two independent checks (mechanical hash + human review);
4. new bridge obligations should ever be auto-cleared from a stronger old module, or merely shown as "prior evidence available" until reviewed.

Bulk authoring must not begin until these evidence semantics are accepted or repaired.
