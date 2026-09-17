# T22 v2 → proposed v3 Evidence and Content Migration

Status: architecture proposal only. No migration is executed in Stage A.

## Non-negotiable invariant

**A learner's old evidence may remain historical evidence, but it must never be silently reinterpreted as a different intellectual obligation.**

The current v2 atomic IDs (`T22-Mxx-Axx`) are route-position based. The proposed v3 route changes order, adds bridges, splits one broad programming capability and makes some existing advanced modules optional. Therefore direct in-place reuse of positional IDs is unsafe.

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

A changed prompt with a new transfer requirement or changed prerequisite contract is not the same obligation merely because its title is similar.

### Class C — split module

The current `ARC515` is deliberately decomposed in the proposed route. This is a content migration, not a claim that one old macro checkmark proves all new children.

Proposed responsibility map:

| Current `ARC515` theme | Proposed v3 owner |
|---|---|
| A01 Python expressions/types/control flow | `T22V3-C00` |
| A02 functions/decomposition/interfaces | `T22V3-C00` |
| A03 core containers/representation | `T22V3-C00` |
| A04 NumPy shape/indexing | `T22V3-C02` |
| A05 broadcasting | `T22V3-C02` |
| A06 vectorization/equivalence | `T22V3-C02` |
| A07 controlled RNG/reproducible random experiments | `T22V3-C01` |
| A08 pandas tables/alignment/transformation | `T22V3-C02` |
| A09 plotting as diagnostic evidence | `T22V3-C02` |
| A10 debugging/assertions/tests/invariants | `T22V3-C03` |
| A11 clean rerunnable mini research artifact | `T22V3-C03`, later deepened by `ARC509` |
| build-spec version-control + basic complexity requirement | `T22V3-C03`; optional `ARC717` deepens algorithms |

Policy:
- never mark all split children complete from one old macro checkmark;
- exact sub-obligations may inherit only after task/rubric equivalence review;
- otherwise the learner receives recognition/history without false v3 clearance;
- old `ARC515` remains visible as historical evidence even though it is not an explicit v3 route node.

### Class D — early bridge extracted from advanced content

Example: `MKT00` teaches prices/payoffs/returns/bid-ask/basic orders while deep `ARC553` and `ARC558` remain later.

Policy:
- create a new bridge identity;
- do not erase or downgrade existing `ARC553`/`ARC558` evidence;
- an old advanced clearance does not automatically clear a newly authored bridge unless explicit equivalence is declared.

### Class E — optionalized module

Examples include matrix calculus, ODEs, numerical linear algebra, deterministic DP/MDPs, full numerical optimization/autodiff, formal efficiency theory and deep neural nets.

Policy:
- keep the module addressable;
- preserve all historical completions and archive links;
- remove only the requirement that it be completed on the default route;
- no evidence is deleted or downgraded.

`ARC211` and `ARC586` are explicitly retained under this class. `ARC211` remains upstream of optional `ARC590`; `ARC586` remains available under its actual advanced prerequisites rather than being reused under a weaker entry contract.

### Class F — reused ID with materially retargeted v3 prerequisite/content boundary

Some current rich modules can be educationally reused only after a bounded v3 adaptation. Examples:

- proposed core `ARC558` uses new `MKT00` plus `ARC714/R00` rather than requiring full `ARC553` first;
- proposed core `ARC559` does not require optional performance-engineering `ARC713` as a universal prerequisite.

Policy:
- preserve the stable parent/content lineage, but treat affected child obligations as new versions unless exact equivalence is proven;
- no automatic child clearance merely because the old macro ID matches;
- document the changed prerequisite/content boundary in the authoring source and equivalence manifest.

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
4. new bridge obligations should ever be auto-cleared from a stronger old module, or merely shown as `prior evidence available` until reviewed;
5. a reused parent such as adapted `ARC558` should retain the parent ID while all materially changed child obligations receive new versions, or whether the adaptation warrants a new parent capability ID.

Bulk authoring must not begin until these evidence semantics are accepted or repaired.
