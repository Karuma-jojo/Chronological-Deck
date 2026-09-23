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


## Checkpoint D — exact-unit certification hardening

The original module-level certification model was found to be too coarse.

Example failure mode:
- `S-BRIDGE-N1-U01` teaches Euclid/Bézout/linear congruences;
- the broader `S-BRIDGE-N1` module also contains later CRT, valuations, rational-root and divisibility material;
- certifying the module after only U01 could therefore unlock historical problems whose exact missing content had not been taught.

Repair:
- learner state now has separate `units`;
- historical requirement rows reference exact authored unit IDs;
- `certifyUnit` / `certifiedUnitIds` are the only SMMC authoring credentials accepted by the unlock runtime;
- module-level self-report remains progress metadata only;
- the requirement map was deliberately reduced from 38 coarse rows to exact rows that are fully justified by authored units;
- all other non-GREEN problems remain `requirement-map-pending`.

Currently exact historical unlock rows are:
- `SMMC-2021-A3` -> `S-BRIDGE-GR1-U01`;
- `SMMC-2022-C2` -> `S-BRIDGE-AN1-U01`;
- `SMMC-2023-C1` -> `S-BRIDGE-N1-U01` + `S-BRIDGE-N1-U02`.

## Checkpoint E — series, translation, CRT and induction units

Added:

### S-BRIDGE-AN1-U01 — Positive-series comparison and harmonic divergence
- dyadic-block proof of harmonic divergence;
- comparison direction for positive series;
- divergent benchmark transfer.

### S-METHOD-X1-U01 — Introduce an auxiliary object that exposes structure
- transformed variables/aggregate identities;
- proving the transformed claim;
- translating back to the original problem.

### S-BRIDGE-N1-U02 — Chinese remainders and coprime residue counting
- constructive CRT for pairwise coprime moduli;
- uniqueness modulo the product;
- square-free totient/coprime coordinate counting.

### S-METHOD-I1-U01 — Strengthen the induction claim until the step closes
- block/state induction;
- strengthened hypotheses;
- multi-base induction windows;
- recurrence/invariant carry-forward.

The authoring bank now contains:
- 8 units;
- 16 original neutral learner-facing tasks;
- 16 separate evaluator references.

No historical SMMC statement has been consumed by the neutral bank.

## Checkpoint E validation

Remote semantic simulation passed:
- 8 unique units;
- 16 public tasks;
- 16 evaluator references;
- every exact requirement references an authored unit;
- learner self-report does not certify a unit;
- exact unit certification is preserved through state validation;
- 2021 A3 unlocks as transfer only after GR1-U01;
- 2022 C2 unlocks as development only after AN1-U01;
- 2023 C1 unlocks as transfer only after both N1-U01 and N1-U02;
- an unrelated unmapped AMBER problem remains `requirement-map-pending` even when all current units are certified.

No browser/UI work has been started.


## Checkpoint F — learner-facing SMMC page

Added:
- `smmc-course.html`;
- `css/smmc-course.css`;
- `js/smmc/ui.js`;
- `scripts/test-smmc-course-browser.mjs`;
- dedicated `SMMC authoring checks` GitHub Actions workflow.

### Access model

The SMMC companion now has its own page instead of living only in internal ledgers.

Study view:
- browse authored bridge/method units;
- open main/transfer neutral tasks;
- save neutral attempts;
- open evaluator references only after saving;
- self-report unit completion;
- neutral practice is stored separately from historical-PYQ exposure.

Historical map:
- browse all 88 official problem records;
- preview T25 prerequisite status from manually entered target codes;
- exact-unit certification gates remain fail-closed;
- GREEN/AMBER/RED is hidden by default;
- explicit research-label reveal records private-metadata exposure for only that selected problem;
- another unrevealed historical problem remains sealed.

This is intentional: color/domain/method metadata is useful for planning but is not automatically shown for a problem the learner may want to preserve as unseen competition evidence.

### Browser contract

The new browser smoke test checks:
- page reaches Ready state;
- exactly 8 authored units;
- exactly 16 neutral tasks;
- neutral attempt save/reveal works;
- self-report does not create certification;
- historical map has 88 problems;
- research metadata starts hidden;
- 2021 A3 remains bridge-locked when only T25 targets are entered;
- revealing 2021 A3 research metadata displays AMBER and contaminates only 2021 A3;
- 2022 C2 remains sealed when its research metadata has not been revealed.

GitHub Pages target path after merge:
`https://karuma-jojo.github.io/Chronological-Deck/smmc-course.html`.


## Home-page access link

The main `index.html` now includes a direct link:
`SMMC · competition companion` -> `smmc-course.html`.

The SMMC browser smoke test verifies this navigation contract in addition to the study/historical-map behavior.


## Access-fix checkpoint — reversible metadata + official problem papers

User-facing correction:
- GREEN/AMBER/RED research metadata is now a reversible show/hide control;
- showing metadata does not write exposure state;
- legacy `domainMetadataSeenAt` values remain import-compatible but no longer affect `exposureClass`;
- only actual solution/evaluator/material-hint evidence can demote a problem to development through the existing contamination path.

Historical-question access:
- added `course/smmc/sources-v1.mjs` with official organiser-hosted problem-paper URLs for every 2017–2025 A/B/C session represented in the 88-problem ledger;
- every selected historical problem now exposes an official-paper control;
- the paper opens at PDF page 2, where that session's four problems are printed;
- the interface states the selected identifier (for example A3) so the learner can read the exact official problem;
- an in-page PDF preview and an external-paper link are both available;
- opening/closing the official paper does not automatically mutate the historical exposure record;
- the ledger synopsis is explicitly labeled as a summary, not the full statement.

Regression coverage:
- all 88 ledger rows must resolve to an official Simon Marais problem-paper URL ending in `#page=2`;
- planning metadata must not contaminate exposure;
- statement-only evidence remains transfer-eligible under the evidence model;
- material hints remain contaminating;
- browser smoke test checks the 2021 A3 official paper URL, reversible metadata visibility, reversible paper preview, and absence of automatic exposure writes.
