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


## Workspace-navigation checkpoint — T25 ↔ Aster ↔ SMMC

Goal: treat T25, Aster presentation and SMMC companion as one continuous mathematics workspace rather than separate destinations.

Added:
- `js/workspace-nav.js` — device-local UI-location memory only;
- top-level T25 / Aster / SMMC workspace navigation on both course pages;
- bidirectional mathematical cross-links;
- URL-addressable resume positions.

Shared navigation state remembers only:
- last T25 session number;
- plain vs Aster presentation;
- last SMMC tab;
- last SMMC authored unit;
- last SMMC neutral task;
- last SMMC historical problem.

It does **not** store or grant:
- T25 clearance;
- SMMC certification;
- attempt scores;
- evaluator exposure;
- story completion authority.

### T25 → SMMC

For the current T25 session, the page derives its stable target code and lists historical SMMC problems whose `t25Targets` contain that target.

Connections reveal only:
- year/problem identifier;
- East vs C-supplementary status.

They do not reveal:
- GREEN/AMBER/RED;
- method tags;
- bridge diagnosis;
- solution route.

Clicking a connection opens the SMMC historical map on that exact problem.

### SMMC → T25 / Aster

For an authored SMMC unit or selected historical problem, stable T25 target codes are resolved through the live audited T25 manifest.

Each mapped session exposes:
- Open T25;
- Open in Aster.

Both point to the same exact T25 session. Aster is treated as presentation state over T25, not a separate academic route.

### Resume behavior

Examples:
- T25 session 007 → SMMC problem → T25 returns to session 007;
- T25 session 007 Plain → Aster remains session 007;
- SMMC historical problem → T25/Aster → SMMC returns to the same historical problem;
- SMMC unit + transfer task → T25/Aster → SMMC returns to the same unit and task.

URLs also carry the visible position:
- `t25-course.html?session=N&presentation=plain|anime`;
- `smmc-course.html?tab=study&unit=...&task=...`;
- `smmc-course.html?tab=map&problem=...`.

Added `scripts/test-math-workspace-browser.mjs` and included it in the SMMC CI gate.


## Workspace flow v2 — exact resume instead of page restart

The first shared-navigation release remembered the selected T25 session and SMMC unit/problem, but cross-page navigation still felt like a reload because scroll position and T25 main-vs-transfer task were not preserved.

Flow v2 adds:

- workspace navigation state v2 with migration from v1;
- exact T25 main/transfer task memory;
- exact plain/Aster presentation memory;
- per-page/per-SMMC-tab scroll restoration;
- explicit deep-link focus for mathematical cross-links;
- sticky T25/Aster/SMMC workspace dock;
- same-tab unsaved working preservation using sessionStorage;
- T25 and SMMC drafts remain separate from assessment/evidence storage;
- direct bare-page reopen resumes the last remembered workspace location.

### Intentional behavior

Generic workspace switching is a resume action:
- T25 -> SMMC -> T25 restores the previous T25 session/task/scroll;
- SMMC -> T25 -> SMMC restores the previous SMMC tab/unit/task/problem/scroll.

Mathematical connection links are deep links:
- T25 -> a mapped SMMC problem focuses the selected historical problem;
- SMMC -> a mapped T25 session focuses the T25 task area;
- these intentional deep links override old scroll only for that navigation.

Aster remains presentation state over the same T25 task. Switching Plain <-> Aster therefore preserves both session and main/transfer task.

### Draft boundary

Unsaved textarea working is kept in sessionStorage only:
- it survives same-tab page switches and reloads;
- it is not academic evidence;
- it is not exported as a study record;
- it is scoped separately for T25 and SMMC tasks.

The browser regression `scripts/test-math-workspace-browser.mjs` now checks:
- exact T25 transfer-task resume;
- T25 unsaved draft survival;
- T25 scroll restoration;
- mapped T25 -> SMMC deep link;
- Plain -> Aster same-session/same-task preservation;
- exact SMMC historical-problem resume;
- exact SMMC unit/transfer-task resume;
- SMMC unsaved draft survival;
- SMMC scroll restoration;
- sticky workspace dock;
- SMMC -> T25 deep links focus the task area.


## Checkpoint G — contest proof-writing unit

Continuation branch: `codex/smmc-final-engine-v1`, cut from current `main` at `2f8bd161fc9b9a0163713ed0c7f4341879b47419`.

Added:

### S-METHOD-W1-U01 — Turn scratch reasoning into a marker-ready proof

Focus:
- explicit assumptions and target;
- auditable implication chains;
- justified cancellation/factorization/substitution;
- complete case closure;
- explicit final conclusion;
- honest partial-credit boundaries rather than overclaiming.

Two original neutral tasks were added:
- a parity implication designed to train proof strategy and logical closure;
- a zero-sum cubic identity designed to train assumption use, factorization and exact conclusion.

The historical requirement map is intentionally unchanged. W1 is a universal writing method, but this checkpoint does **not** make it a blanket prerequisite that would lock all 88 historical problems.

The authored bank is now expected to contain:
- 9 units;
- 18 learner-facing neutral tasks;
- 18 separate evaluator references.

No historical SMMC statement is quoted or consumed by these tasks.


## Checkpoint H — final-engine broad scaffold

Continuation branch: `codex/smmc-final-engine-v1`.

This checkpoint does not rebuild the companion and does not claim the missing learning/practice engine is complete. It creates executable contracts for the remaining work.

Added:

- `course/smmc/engine-roadmap-v1.mjs`;
- `course/smmc/runtime/final-engine-v1.mjs`;
- `course/smmc/paper-vault-v1.mjs`;
- `scripts/validate-smmc-engine-scaffold.mjs`;
- `docs/smmc/FINAL-ENGINE-SCAFFOLD.md`.

### Build spine

The scaffold now makes seven stages explicit:

1. primary-domain reconciliation;
2. core bridge/method authoring;
3. exact East AMBER/RED requirement mapping;
4. canonical T25 readiness + genuine unit certification;
5. protected historical S-XFER attempts and 0-7 review;
6. whole-paper vault + S-PAPER;
7. rare RED/open-problem specialists.

All 18 canonical modules have explicit unit-level build slots. Existing authored unit IDs are detected from the real authoring bank; planned IDs do not become learner-facing merely because they exist in the roadmap.

`S-BRIDGE-ALG1` is recorded only as `candidate-not-canonical`. Its addition requires a later exact-gap decision.

### Evidence scaffold

The new contracts preserve these boundaries:

- self-report never certifies;
- two saved neutral tasks do not auto-certify;
- canonical T25 evidence is the intended normal readiness source;
- manual T25 target input is future debug/admin fallback;
- historical S-XFER uses a 0-7 review scale;
- first-unseen evidence must remain distinct from later reattempts.

No historical-attempt UI or automatic grading is claimed yet.

### Paper-vault scaffold

The 2017-2025 ledger is grouped into:

- 18 East A/B papers;
- 4 supplementary C papers;
- 4 problems per session paper.

A whole organiser PDF is now explicitly modeled as a whole-paper statement reveal. The safe runtime primitive marks all four sibling statements seen together; the current UI has not yet been rewired to invoke it.

The future single-problem route must genuinely isolate one problem before it may preserve sibling questions as pristine.

### Validation

The dedicated scaffold validator checks:

- all 18 canonical modules are represented exactly once;
- existing authored units cannot be falsely marked planned or vice versa;
- W1 proof writing is recognized as authored;
- candidate ALG1 remains outside the canonical module set;
- the complete East non-GREEN requirement backlog is represented;
- the paper vault contains exactly 18 East A/B papers covering 72 unique East problems;
- self-report cannot satisfy certification;
- 0-7 S-XFER scoring boundaries;
- whole-paper reveal consumes pristine status for all four statements.

The SMMC workflow now runs this validator on `main`, pull requests, and `codex/smmc-final-engine-v1` pushes.

No canonical T25 card, target, clearance, Aster campaign or historical SMMC statement was changed by this scaffold.


### Checkpoint H validation receipt

Validated scaffold head: `1a854b822d0dd1df56cabd6d827c88ef341f7c42`  
SMMC authoring checks run: `35976910332`  
Job: `107559446709`  
Result: **SUCCESS**

Inspected successful steps include:

- existing SMMC authoring contracts;
- final-engine scaffold validator;
- compact SMMC connection index;
- lean T25 learner payload;
- workspace cloud conflict handling;
- SMMC browser workflow;
- exact T25/Aster/SMMC navigation restore;
- same-account cross-device T25/SMMC restore.

The scaffold validator reports: 18 canonical modules planned, 9 currently authored units recognized, all 42 East non-GREEN problems represented in the requirement backlog, 18 East paper-vault objects, and fail-closed certification/T25/S-XFER/S-PAPER contracts.


## Checkpoint I — primary-domain research freeze

Before further mass authoring, the open 2017–2025 hybrid-label reconciliation was completed under the repository's written ownership tie-break.

Eight `primaryDomain` fields changed and no other historical-problem contract field changed. Final all-corpus and East-only counts now exactly match the independently recorded benchmark.

Roadmap phase `research-freeze` is now `complete`; `SMMC_ENGINE_FEATURES.domainReconciliation` is `frozen`.

CI now runs the complete ledger validator, frozen curriculum validator, dedicated domain-reconciliation validator and the existing authoring/runtime/browser/workspace checks.

This closes the research-classification gate. Core bridge/method authoring is the active content-build phase; historical unlock mappings remain fail-closed until exact authored units exist.


## Checkpoint J — case architecture + lemma extraction

Added:

### S-METHOD-C1-U01 — Build exhaustive cases and extract reusable lemmas

Corpus motivation:
- CASE-DECOMPOSITION is tagged on 34 problems across the full corpus;
- LEMMA-EXTRACTION is tagged on 12;
- the frozen curriculum therefore treats their combined signal as a high-frequency reusable method rather than a subject-specific bridge.

The unit trains:
- choosing an exhaustive, nonoverlapping outer partition;
- assigning equality/boundary cases explicitly;
- extracting one reusable subclaim instead of repeating local reasoning;
- closing every case and reassembling the global result;
- separating necessity from sufficiency in classifications.

Two original neutral tasks were added:
- max/min identities from a learner-chosen order partition and reusable absolute-value lemma;
- classification of equality in |x+y|≤|x|+|y| from a learner-designed sign partition.

The tasks use no historical SMMC statement, identifier or solution route. The exact historical requirement map remains unchanged: C1 is a broadly useful method unit, not a blanket prerequisite that should newly lock the corpus.

Expected authored bank after this checkpoint:
- 10 units;
- 20 learner-facing neutral tasks;
- 20 separate evaluator references.


### Checkpoint J validation receipt

C1 repaired head: `7ce762d7db2359642594b57b1a228c992c0baac6`.  
SMMC authoring checks run: `35985729271`, job `107587818157`: **SUCCESS**.

The first draft was intentionally not accepted: both assessments had supplied the very case partitions C1 claimed the learner should choose. The repaired Main now requires a learner-chosen order partition, and Transfer a learner-designed sign partition; evaluator rubrics accept mathematically equivalent complete partitions. Full ledger/curriculum/reconciliation, authoring, scaffold, T25 payload, SMMC browser, workspace-navigation and cross-device checks passed.

## Checkpoint K — extremal and minimal-counterexample reasoning

Added:

### S-METHOD-E1-U01 — Choose an extremal object or minimal counterexample

Corpus basis:
- EXTREMAL appears on 6 historical rows;
- MINIMAL-COUNTEREXAMPLE appears on 2;
- the method is retained as a compact reusable unit, not a subject bridge.

The unit separates two related architectures:
- extremal/local-improvement: choose an optimizer, preserve constraints, calculate a strict improvement, infer forced structure;
- minimal-counterexample descent: choose the least bad input, reduce to strictly smaller valid inputs, and reconstruct a contradiction.

Neutral assessments:
- maximize ab over nonnegative integer pairs with fixed sum using a one-unit compression move;
- prove prime-factor existence by a genuine minimal-counterexample descent.

No historical requirement row is added: E1 is method training and does not by itself supply missing mathematical content for a particular AMBER/RED problem.

Expected bank:
- 11 authored units;
- 22 neutral public tasks;
- 22 separate evaluator references.


### Checkpoint K validation receipt

E1 head: `0052e78239dc30cd67466f6e71f0e28289fe21f5`.  
SMMC authoring checks run: `35985991948`, job `107588662007`: **SUCCESS**.

The complete ledger/curriculum/domain-freeze gates, 11-unit authoring bank, engine scaffold, T25 payload, SMMC browser workflow, workspace navigation and same-account cross-device restore all passed.

## Checkpoint L — symmetry, parity and normalization

Added:

### S-METHOD-S1-U01 — Exploit symmetry, parity and normalization

Corpus basis:
- SYMMETRY appears on 13 historical rows;
- PARITY on 8;
- NORMALIZATION on 12;
- the frozen curriculum records a combined signal of 33 method tags, allowing overlap.

The lesson distinguishes three proof operations rather than treating them as slogans:
- symmetry: prove the transformation preserves the problem before using WLOG;
- normalization: prove scale/location invariance and keep the inverse interpretation;
- parity: compute the effect of one legal move before declaring an invariant.

Neutral assessments:
- exact range of a symmetric scale-invariant two-variable ratio, requiring reversible normalization, justified swap symmetry and attainability;
- exact reachable on-counts in a two-toggle switch system, requiring parity obstruction plus construction.

No historical SMMC problem is quoted, paraphrased or newly unlocked. This remains method training.

Expected bank:
- 12 authored units;
- 24 neutral public tasks;
- 24 separate evaluator references.


### Checkpoint L validation receipt

S1 head: `23c2b6b53b21786e9f2c508ecbbf5fd5b831bc44`.  
SMMC authoring checks run: `35986226414`, job `107589412914`: **SUCCESS**.

All ledger/curriculum/domain-freeze, 12-unit authoring, scaffold, T25 payload, SMMC browser, workspace-navigation and cross-device checks passed.

## Checkpoint M — AN2 compactness/integrability bridge

Added:

### S-BRIDGE-AN2-U01 — Extrema, compactness and integrability consequences

Boundary discipline:
- this is a bounded contest-analysis bridge, not a full real-analysis course;
- it teaches supremum as a proof tool, shrinking nested closed intervals, compact-interval extrema, and exact Riemann-integrability consequences;
- it explicitly avoids the false inference that Riemann integrability implies continuity or attained extrema;
- under the ordinary compact-interval Riemann/Darboux convention used in this project, boundedness is treated as part of/required by integrability rather than smuggled in later.

Neutral assessments:
- prove the shrinking nested-interval theorem using a supremum and length→0 uniqueness;
- audit boundedness/continuity/supremum-attainment for a Riemann-integrable function, with a finite-point modification counterexample and an integral bound.

No historical requirement row is added yet. AN2-U01 alone does not cover the full regularity/one-sided/floor-recurrence machinery behind the relevant historical AMBER/RED problems, so those problems remain fail-closed.

Expected bank:
- 13 authored units;
- 26 neutral public tasks;
- 26 separate evaluator references.


### Checkpoint M validation receipt

AN2-U01 head: `e20a11b3867dfefd1b11e28bf4d462853b729004`.  
SMMC authoring checks run: `35986582040`, job `107590567785`: **SUCCESS**.

The theorem-level bridge passed complete ledger/curriculum/domain reconciliation, 13-unit authoring, final-engine scaffold, T25 payload, browser, workspace and cross-device checks.

## Checkpoint N — AN2 convex-envelope bridge

Added:

### S-BRIDGE-AN2-U02 — Convex envelopes and contest optimization

The unit is intentionally one-dimensional and finite:
- convexity through chord inequalities;
- maxima of finitely many affine functions;
- active-piece analysis for upper envelopes;
- supporting-chord domination;
- construction + maximality proof for a greatest convex minorant under finite pointwise caps.

Neutral assessments:
- analyze and optimize the upper envelope max{-x,x-2,2x-5}, including a pairwise crossing that is not active;
- construct the greatest convex function below three pointwise caps on [0,2] and prove pointwise maximality.

No historical requirement mapping is added at this checkpoint. Although this unit targets the convex-structure gap behind 2023 A2/2025 C4, sufficiency for any exact historical unlock is reserved for a separate problem-by-problem mapping audit.

Expected bank:
- 14 authored units;
- 28 neutral public tasks;
- 28 separate evaluator references.


### Checkpoint N validation receipt

AN2-U02 head: `b20b5f75059f8205484c5535a0efdffa5fdea2a4`.  
SMMC authoring checks run: `35986844747`, job `107591410214`: **SUCCESS**.

The complete ledger, frozen curriculum, primary-domain reconciliation, 14-unit/28-task authoring bank, final-engine scaffold, connection index, T25 runtime payload, cloud conflict handling, SMMC browser workflow, T25/Aster/SMMC navigation and same-account cross-device restore all passed.

Phase-2 checkpoint status:
- fundamental reusable methods B1, C1, K1, X1, I1, E1, S1 and W1 are authored;
- O1 remains intentionally later for open-problem/research work;
- AN2 now has both planned core units authored;
- no new historical problem was consumed;
- no new historical requirement row was opened without a separate exact-sufficiency audit.

Next bounded content block: S-BRIDGE-GF1, followed by S-BRIDGE-GEO1 and the planned N1/GR1/AN1 deepening units.
