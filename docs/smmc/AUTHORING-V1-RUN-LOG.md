# SMMC authoring/runtime v1 — run log

Updated: 2026-09-23.

Branch: `codex/smmc-authoring-v1`, created from merged `main` after PR #157.

## Safety boundary

This phase may add or modify files only inside the SMMC namespace plus dedicated SMMC validation scripts.

It does not modify:
- canonical T25 targets, cards or clearances;
- T25 Aster campaign;
- λ compiler;
- Master/Guardian/extractor;
- T25 UI/runtime;
- historical SMMC problem statements.

## Checkpoint A — exposure + unlock runtime

Added:
- `course/smmc/runtime/exposure.mjs`;
- `course/smmc/runtime/unlock.mjs`;
- `course/smmc/requirements-v1.mjs`.

### Exposure rules

Historical problems can be:
- `sealed`: statement, solution, material hint and private metadata unseen;
- `transfer`: statement seen, but no material hint/solution/private domain metadata;
- `development`: contaminated by solution, evaluator, material hint or private domain metadata.

Domain/method metadata is treated as material contamination for unseen-transfer purposes.

### Unlock rules

- GREEN: mapped T25 prerequisites are sufficient.
- AMBER/RED: require an explicit SMMC requirement row.
- Missing requirement row: `requirement-map-pending` and remains locked.
- RED unlocks only as `ready-development`, never as pristine transfer.
- Requirement mapping is intentionally fail-closed.

### Certification boundary

Learner self-report and academic unlock are separate.

- `selfReportModuleComplete` records learner progress only.
- `certifyModule` records a certification event.
- `unlockStatus` accepts only `certifiedModules`.
- A self-report alone cannot unlock a historical SMMC problem.

## Checkpoint B — first neutral authoring units

Added:
- `course/smmc/authoring/units-v1.mjs`;
- `course/smmc/authoring/public-problems-v1.mjs`;
- `course/smmc/authoring/evaluator-v1.mjs`.

Authored:

### S-METHOD-B1-U01 — Choose the quantity before bounding it

Focus:
- bound direction;
- positive-denominator reasoning;
- equality conditions;
- sharpness versus mere validity.

### S-BRIDGE-N1-U01 — Euclid, Bézout and solvable congruences

Focus:
- Euclidean algorithm;
- Bézout back-substitution;
- solvability criterion for ax ≡ c (mod m);
- legal modular cancellation/division;
- complete residue-class answers.

All four tasks are original neutral training problems. They do not reproduce or identify historical SMMC PYQs.

Public task text and evaluator/reference text are stored separately.

## Validation

Added `scripts/validate-smmc-authoring-v1.mjs`.

Remote source-level semantic validation passed for the first batch:

- 2 authored units;
- 4 neutral public tasks;
- 4 evaluator references;
- 38 explicit non-GREEN requirement rows;
- all authored unit module IDs resolve to the frozen curriculum;
- public prompts contain no historical SMMC problem IDs/source names;
- fresh problem -> sealed;
- statement-only exposure -> transfer;
- private domain metadata exposure -> development/contaminated;
- GREEN unlocks after T25 prerequisites;
- AMBER remains locked without certified bridge;
- self-reported bridge completion does not unlock;
- certified bridge completion unlocks mapped AMBER transfer;
- mapped RED unlocks only as development.

This is a source-level runtime simulation against fetched branch contents, not a browser/UI test. No UI has been added yet.

## Next safe work

1. Continue neutral S-METHOD and S-BRIDGE units.
2. Expand explicit requirement mappings only when the exact bridge has been authored/certification-scoped.
3. Add a dedicated SMMC study UI only after unit/runtime contracts stabilize.
4. Preserve historical PYQ statements and evaluator metadata behind the existing exposure contract.


## Checkpoint C — graph + encoding units

Added two more original neutral units:

### S-BRIDGE-GR1-U01 — Degrees, components and cycle structure

Focus:
- finite simple graph language;
- degree and connected components;
- proof that finite connected 2-regular graphs are cycles;
- translating mutual-acquaintance statements into graph structure.

### S-METHOD-K1-U01 — Encode an object so it can be recovered

Focus:
- explicit reversible encodings;
- recovery/uniqueness;
- positive compositions;
- nonnegative stars-and-bars transfer;
- distinguishing a forward map from a genuine bijection.

The public bank now contains 8 original neutral tasks and 8 separate evaluator references.

Source-level syntax/structure validation passed:
- 4 unique unit IDs;
- 8 public prompts;
- 8 evaluator entries;
- every unit has both main and transfer tasks;
- learner-facing prompts contain no historical SMMC problem identifier or Simon Marais source name;
- learner self-report remains non-certifying;
- explicit module certification remains separately represented;
- unlock runtime remains syntactically valid.

No historical SMMC problem was consumed by these training units.
