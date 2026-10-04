# SMMC × T25 companion — run log

Updated: 2026-09-23.

## Safety boundary

This work is additive on branch `codex/smmc-t25-companion`, created from `main`.

No existing T25 file has been modified. In particular, this companion does not change:

- the 162-session T25 route;
- any T25 atomic contract or clearance;
- `t25-course.html` or the existing Aster campaign;
- the λ compiler;
- SPIRE Master/Guardian/extractor;
- generated T25 course/evaluator data;
- database/storage schemas.

## Batch 1 — taxonomy + 2017 crosswalk

Added:

- `docs/smmc/README.md` — canonical six-domain taxonomy, secondary tags, method layer, T25 overlap rules, corpus-preservation policy and Aster compatibility boundary.
- `course/smmc/ledger-2017.mjs` — all eight official 2017 A/B problems classified and mapped to current T25 support.
- `scripts/validate-smmc-ledger.mjs` — structural validation scaffold.

### 2017 first-pass result

- GREEN: 1
- AMBER: 4
- RED: 3
- East-relevant: 8/8
- Open-problem item: B4, explicitly excluded from ordinary full-solution readiness expectations.

## Batch 2 — 2018 + schema stabilization

Added:

- `course/smmc/ledger-2018.mjs` — all eight official 2018 A/B problems.
- `course/smmc/ledger.mjs` — year aggregator.
- `course/smmc/schema.mjs` — controlled primary-domain, overlap, assessment-role, secondary-tag and method-tag vocabularies.
- Expanded validator to cover both years and reject unknown tags or invalid T25 session numbers.

### 2018 first-pass result

- GREEN: 2
- AMBER: 2
- RED: 4
- East-relevant: 8/8
- Open-problem item: B4.

### Combined 2017–2018 result

- Problems: 16
- GREEN: 3
- AMBER: 6
- RED: 7

These overlap labels mean prerequisite coverage, not problem difficulty or predicted score.

### Taxonomy finding

The six primary domains remain adequate after 2018. The main new item is **generating functions**, exposed by 2018 A4. It is retained as secondary tag `GF` and method `GENERATING-FUNCTION`, not promoted to a top-level domain. This is evidence that the primary-domain + secondary-tag + method architecture is doing useful compression without information loss.

## Aster decision

Reuse the existing Aster philosophy, not its T25 episode progression mechanically.

For SMMC, narrative must remain:

1. optional;
2. downstream of a frozen mathematical task;
3. clue-free under WALL;
4. unable to grant mathematical clearance;
5. free of penalties for delay, struggle or wrong attempts.

A future SMMC Aster arc may present competition/expedition stakes, but it may not encode domain, method, answer shape, number of cases or likely breakthrough.

## Next safe batch

1. Audit 2019 under the frozen schema; only extend the controlled vocabularies when a real official problem requires it.
2. Re-check GREEN/AMBER/RED decisions against exact current T25 contracts as each year is frozen.
3. Begin extracting repeated RED/AMBER bridge needs into candidate S-BRIDGE units only after recurrence across multiple years.
4. Keep whole later East papers reserved for sealed assessment; do not wire SMMC into the T25 UI yet.


## Verification checkpoint

Remote-source structural validation passed after the 2017/2018 schema stabilization:

- 16/16 problem records parsed successfully;
- unique problem IDs;
- exactly 8 A/B problems per year;
- all 2017–2018 A/B rows marked East-relevant;
- all primary domains, overlap labels, assessment roles, secondary tags and method tags belong to the controlled schema;
- all T25 session references are integer route positions in 1–162;
- both historical B4 rows remain explicitly marked `open-problem`;
- overlap counts: GREEN 3, AMBER 6, RED 7.

A branch comparison against `main` after the checkpoint showed the branch ahead only by additive SMMC work, with no changed/deleted pre-existing files. The diff consists of seven new paths under `course/smmc/`, `docs/smmc/` and `scripts/validate-smmc-ledger.mjs`.

The local container could not resolve github.com, so validation was executed directly against the remote file contents fetched through the authenticated GitHub connector rather than a local clone. No CI run is claimed.


## Batch 3 — 2019 audit

Source basis: official Simon Marais Mathematics Competition 2019 solutions PDF from simonmarais.org. The official solution text and page images were inspected before classification.

Added:
- `course/smmc/ledger-2019.mjs`;
- 2019 aggregation in `ledger.mjs`;
- `SERIES` secondary content tag;
- `EXCHANGE-ARGUMENT` method tag;
- validator coverage through 2019.

### 2019 first-pass result

- GREEN: 1
- AMBER: 3
- RED: 4
- East-relevant: 8/8
- Open-problem item: B4.

### Combined 2017–2019 result

- Problems: 24
- GREEN: 4
- AMBER: 9
- RED: 11

### 2019 findings

- A2 reveals adjacent-swap/exchange reasoning as a reusable SMMC method that is not an independent content domain.
- A4 and B2 confirm that general infinite-series convergence/remainder machinery is a real SMMC gap: current T25 explicitly leaves general series-convergence tests outside its scope.
- B3 reinforces finite graph/clique/extremal-compression reasoning as a recurring RED family rather than an isolated curiosity.
- The six primary domains remain sufficient. No seventh primary domain was added.

The overlap labels continue to mean prerequisite coverage/fairness, not predicted difficulty or expected score.


## 2019 verification checkpoint

Remote-source validation after Batch 3 passed:

- 24/24 records parse under the controlled schema;
- unique IDs;
- exactly four A and four B problems for each of 2017, 2018 and 2019;
- every primary domain, overlap label, assessment role, secondary tag and method tag is schema-controlled;
- all T25 route references lie in 1–162;
- 2017 B4, 2018 B4 and 2019 B4 remain explicitly marked `open-problem`;
- combined overlap counts are GREEN 4, AMBER 9, RED 11.

A fresh comparison with `main` shows the companion branch ahead with zero divergence behind and only additive SMMC paths. No pre-existing T25/Aster/compiler/runtime file is modified. No CI run is claimed for this documentation/data-only checkpoint.


## Crosswalk repair — stable T25 target codes

During the 2020 pre-write audit, the previous `t25Sessions` numeric links were found to be partly inherited from an older T25 numbering layout. The old validator checked only that a number lay in 1–162, so it could not detect semantic drift.

Repair completed before freezing 2020:

- all 2017–2019 rows now use stable `t25Targets` codes;
- `course/smmc/t25-crosswalk.mjs` resolves those codes to live route positions when needed;
- the validator now checks target codes against canonical T25 rather than trusting raw route numbers;
- no canonical T25 file was changed.

## Batch 4 — 2020 audit

Source basis: official 2020 SMMC problem/solution material stored in the Simon Marais project.

Added:
- `course/smmc/ledger-2020.mjs`;
- 2020 aggregation in `ledger.mjs`;
- `PROJECTIVE-GEO` secondary tag;
- `BIJECTION` method tag;
- validator coverage through 2020.

### 2020 first-pass result

- GREEN: 4
- AMBER: 3
- RED: 1
- East-relevant: 8/8
- Open-problem item: B4.

### Combined 2017–2020 result

- Problems: 32
- GREEN: 8
- AMBER: 12
- RED: 12

### 2020 findings

- A1 and A2 are strong examples of SMMC problems that need creativity but essentially no new mathematical content beyond T25 plus existing bridges.
- A4 looks like difficult spatial geometry on the surface, but an official route reduces it to Gram structure, fifth roots of unity, eigenstructure and rank-nullity; this makes it an AMBER rather than a RED problem.
- B1 is a direct linear-algebra/combinatorics transfer and is GREEN.
- B4 is a genuine specialist extension: the official prime-case construction uses finite fields, cyclic multiplicative groups and projective geometry, while the full classification is open.

### Verification

A remote-source validation against the live canonical T25 manifest passed:

- 32/32 problem rows parsed;
- unique IDs;
- exactly four A and four B problems per year for 2017–2020;
- all primary domains/tags/methods controlled by schema;
- every `t25Targets` entry resolves to one of the 80 canonical T25 targets;
- all four historical B4 items remain explicitly `open-problem`;
- overlap totals: GREEN 8, AMBER 12, RED 12.


## Batch 5 — 2021 audit

Source basis: official `smmc-2021-solutions.pdf` from the Simon Marais project.

Added:
- `course/smmc/ledger-2021.mjs`;
- 2021 aggregation in `ledger.mjs`;
- `GCD` and `FLOOR` secondary tags;
- validator coverage through 2021.

### 2021 first-pass result

- GREEN: 3
- AMBER: 4
- RED: 1
- East-relevant: 8/8
- Open-problem item: B4.

### Combined 2017–2021 result

- Problems: 40
- GREEN: 11
- AMBER: 16
- RED: 13

### 2021 findings

- A1 is a clean algebra/discriminant transfer and GREEN.
- A2 reinforces the need for contest number theory beyond the existing basic `BR-N`.
- A3 reinforces graph-reformulation as a recurring bridge: determinant machinery is T25-owned, while 2-regular graph/cycle decomposition is not.
- A4 is RED: part (a) is ordinary monotone convergence, but the full range proof uses nested compact sets and one-sided regularity of parameter-dependent limits beyond T25.
- B1 and B2 are strong direct-transfer examples: their main difficulty is creative counting/construction, not missing content.
- B3 needs only a bounded real-analysis bridge around Riemann-integrable boundedness/regularity.
- B4 remains an open problem overall, but its five-point prime-degree part is elementary enough to classify AMBER.

### Five-year bridge synthesis

Added `docs/smmc/BRIDGE-CANDIDATES-2017-2021.md`.

High-confidence provisional bridge families:
- contest number theory beyond `BR-N`;
- graph language and structural reductions;
- infinite series/asymptotic constructions.

Medium candidates:
- elementary real-analysis compactness/regularity;
- generating functions + elementary ODE.

High-confidence method families:
- bounding/comparison;
- construction/encoding/bijection;
- auxiliary objects + cross-domain translation;
- stronger induction/invariant design;
- lemma extraction/case architecture.

These are not yet authored learning objects. 2022–2025 remains the freeze gate.

### Verification

Remote validation against the live T25 80-target manifest passed:

- 40/40 rows;
- unique IDs;
- four A and four B problems for each 2017–2021 year;
- all schema tags/methods valid;
- all stable `t25Targets` resolve to canonical T25 targets;
- all five historical B4s remain explicitly `open-problem`;
- totals: GREEN 11, AMBER 16, RED 13.


## Batch 6 — 2022 A/B/C audit

Source basis: official `smmc-2022-solutions.pdf` from the Simon Marais project.

Structural change:
- 2022 introduces the 12-problem A/B/C era;
- A+B remain East-core;
- C is retained as official supplementary material with `eastRelevant: false`;
- the validator now enforces pre-2022 eight-problem years versus 2022+ twelve-problem years.

Added:
- `course/smmc/ledger-2022.mjs`;
- 2022 aggregation in `ledger.mjs`;
- `CEIL` secondary tag;
- generalized A/B/C validator logic.

### 2022 result

All official 2022 problems:
- GREEN: 8
- AMBER: 2
- RED: 2

East-core A+B only:
- GREEN: 5
- AMBER: 2
- RED: 1

C supplementary:
- GREEN: 3
- AMBER: 0
- RED: 1

### Combined 2017–2022 result

Official problems audited: 52
- GREEN: 19
- AMBER: 18
- RED: 15

East-core audited: 48
- GREEN: 16
- AMBER: 18
- RED: 14

Supplementary C audited: 4
- GREEN: 3
- RED: 1

### 2022 findings

- A1, A2, A3, B1 and B2 are direct T25 transfer problems despite very different surface forms.
- A4 is a strong RED confirmation for `S-BRIDGE-N1`: the official number-theory route uses multiplicative orders, unit groups, p-adic valuations and factorial-valuation estimates beyond T25/BR-N.
- B3 supports a bounded game-strategy bridge rather than a full combinatorial-game-theory course; elementary P/N-position induction is sufficient for one official route.
- B4 reinforces invariant-region / discrete-dynamics methods. Part (a) is accessible with a dedicated method bridge; part (b) remains unresolved in the official solution document and is retained as `open-problem`.
- C2 is an independent RED confirmation for `S-BRIDGE-A1`: comparison/subseries divergence and the harmonic benchmark are genuinely outside current T25.
- C3 demonstrates why C is useful supplementary material: a probability/random-walk problem becomes GREEN through a recurrence-and-induction route without requiring generating functions.
- The six primary domains remain sufficient.

### Verification

Remote validation against the controlled SMMC schema and live canonical 80-target T25 manifest passed:
- 52/52 official rows;
- 48 East-core + 4 supplementary;
- unique IDs;
- correct A/B structure before 2022 and A/B/C structure from 2022;
- all A/B rows East-relevant and all 2022 C rows supplementary;
- all controlled tags/methods valid;
- all stable `t25Targets` resolve;
- B4 open-problem protection remains intact through 2022.


## Batch 7 — 2023 A/B/C audit

Source basis: official `smmc2023solutions.pdf` from the Simon Marais project.

Added:
- `course/smmc/ledger-2023.mjs`;
- 2023 aggregation in `ledger.mjs`;
- validator coverage through 2023.

No schema vocabulary expansion was required.

### 2023 result

All official 2023 problems:
- GREEN: 8
- AMBER: 4
- RED: 0

East-core A+B:
- GREEN: 6
- AMBER: 2
- RED: 0

C supplementary:
- GREEN: 2
- AMBER: 2
- RED: 0

### Combined 2017–2023 result

Official problems audited: 64
- GREEN: 27
- AMBER: 22
- RED: 15

East-core audited: 56
- GREEN: 22
- AMBER: 20
- RED: 14

Supplementary C audited: 8
- GREEN: 5
- AMBER: 2
- RED: 1

### 2023 findings

- A1 is a direct T25 transfer through geometric series/coordinates or complex recurrence.
- A2 needs only a bounded convex-function/upper-envelope bridge; this does not justify a new primary domain.
- A3 and A4 are strong examples where ordinary T25 content is enough but SMMC demands inventive construction/invariant thinking.
- B1 is a clean vector-geometry/triangle-inequality transfer.
- B2 is a direct expectation + induction transfer.
- B3 is an especially strong validation of T25 linear algebra: the official proof is essentially basis/dimension/direct-sum reasoning already owned by M1/M2.
- B4 remains `open-problem`: part (a) is accessible with a small quadratic-irrational conjugation bridge, while the official document provides only known partial results for part (b), including a 2-adic valuation argument.
- C1 strengthens the provisional contest-number-theory bridge via CRT/totient/coprime residue counting.
- C2 and C3 are direct coordinate-geometry and inequality/Riemann-sum transfers.
- C4 strengthens the SMMC methods case for pursuit/guarding and adversarial construction, but still does not require a new mathematical domain.

### Verification

Remote validation against the controlled SMMC schema and live canonical 80-target T25 manifest passed:
- 64/64 official rows;
- 56 East-core + 8 supplementary;
- unique IDs;
- correct pre-2022 A/B and 2022+ A/B/C structure;
- all A/B rows East-relevant and all C rows supplementary;
- all controlled tags/methods valid;
- all stable `t25Targets` resolve;
- all B4 open-problem protections remain intact through 2023;
- totals: GREEN 27, AMBER 22, RED 15.


## Batch 8–9 — 2024 and 2025 final corpus pass

Source basis:
- official 2024 SMMC solutions from simonmarais.org;
- official 2025 SMMC solutions from simonmarais.org.

The 2024/2025 Library index was not reliable, so these final two year ledgers were source-audited directly from the official SMMC PDFs. PDF page images were also inspected during the audit.

Added:
- `course/smmc/ledger-2024.mjs`;
- `course/smmc/ledger-2025.mjs`;
- final 2017–2025 aggregation in `ledger.mjs`;
- final method vocabulary additions required by the source audit.

### 2024 result

All 12:
- GREEN 7
- AMBER 1
- RED 4

East A+B:
- GREEN 5
- AMBER 1
- RED 2

### 2025 result

All 12:
- GREEN 5
- AMBER 4
- RED 3

East A+B:
- GREEN 3
- AMBER 3
- RED 2

### Complete corpus result

Official problems: 88
- GREEN 39
- AMBER 27
- RED 22

East-core: 72
- GREEN 30
- AMBER 24
- RED 18

Supplementary C: 16
- GREEN 9
- AMBER 3
- RED 4

All B4 rows remain explicitly protected as `open-problem`.

## Full-corpus primary-domain reconciliation finding

A final aggregate check found that the independently authored per-problem primary labels do not reproduce the newer SMMC-2027 six-domain benchmark counts.

No labels were changed merely to force agreement.

Added:
- `docs/smmc/DOMAIN-RECONCILIATION-2017-2025.md`.

The six-domain vocabulary is frozen. Only the single primary label of some hybrid problems remains pending reconciliation. Frequency-based study allocation must use the newer aggregate benchmark until the per-problem rubric is reconciled.

## Companion architecture v1.0 freeze

Added:
- `course/smmc/curriculum-v1.mjs`;
- `scripts/validate-smmc-curriculum.mjs`;
- `docs/smmc/FINAL-SYNTHESIS-2017-2025.md`.

Architecture:
- 6 mandatory core SMMC bridges;
- 3 optional specialist extensions;
- 9 explicit problem-solving method modules;
- demand-driven GREEN/AMBER/RED unlock policy;
- private metadata rules for transfer/sealed PYQs;
- exposure-aware historical-corpus preservation;
- timed S-PAPER evidence as the final readiness measure;
- Aster remains optional, clue-free and academically powerless.

### Full remote-source validation

Passed:
- 88/88 official problem rows;
- 72 East / 16 supplementary;
- unique IDs;
- correct pre-2022 A/B and 2022+ A/B/C structure;
- all controlled tags and methods;
- every stable `t25Targets` code resolves against the live 80-target canonical T25 manifest;
- every 2017–2025 B4 remains `open-problem`;
- all curriculum content-module evidence IDs resolve to real ledger problems;
- 9 content modules and 9 method modules have unique IDs;
- Aster optional/anti-leak contract remains present.

No canonical T25/Aster/compiler/runtime file was modified by this companion build.


## Arsenal Gate 0 — historical corpus protection candidate (2026-09-30)

Branch: `codex/smmc-arsenal-gate0-corpus-protection`.

This bounded gate repairs the mismatch between the frozen exposure policy and the learner UI before Arsenal ontology research begins.

Implemented:

- additive paper/session exposure state on top of the existing problem exposure ledger;
- backward-compatible validation for pre-paper-ledger v1 records;
- persistent paper states: pristine, breached, opened, attempted and arena-consumed;
- isolated ledger-summary reveal as statement exposure for one problem only;
- GREEN/AMBER/RED method/research reveal as material-hint exposure for one problem only;
- full official session-paper opening as statement exposure for every problem in that session;
- pristine East A/B paper inventory;
- earliest-timestamp merge semantics for paper exposure;
- preservation of optional historical attempt score and reattempt-eligibility fields;
- browser export/import coverage for the new exposure state;
- source-level and Chromium assertions that exposure does not spill into sibling sessions.

The previous UI claim that research metadata and official-paper viewing were reversible/no-contamination actions has been removed.

**Stop:** this is an implementation candidate, not a self-accepted gate. Gate 1 (Arsenal Research Contract) remains closed until exact-head CI passes and an independent reviewer accepts Gate 0.


### Gate 0 adversarial repair — R01–R04

Independent review of the first Gate-0 candidate returned CHANGES REQUIRED.

Bounded repairs on the same branch:
- **R01 search oracle:** pristine problem search no longer indexes synopsis text; exposed summaries may become searchable after exposure.
- **R02 fail-open persistence:** historical reveals are now transactional, record-first/reveal-second, and fail closed if the historical local-storage write fails.
- **R03 stale cloud race:** returned cloud state is merged with current live state before application; newer local evidence triggers a follow-up sync rather than being overwritten.
- **R04 route side channel:** protected problems expose only coarse readiness; exact T25 mappings, bridge identity and class-distinguishing unlock labels stay hidden until the problem is already development material.

The Chromium gate now includes explicit regressions for all four findings, including forced \`localStorage.setItem()\` failure and a delayed stale cloud response.

**Status remains STOP / Gate 1 CLOSED until independent follow-up accepts the repaired exact head.**


### Gate 0 follow-up repair — F01–F02

Independent follow-up confirmed R01–R04 but found two narrower holes.

- **F01 research-first search oracle:** synopsis search now requires \`statementSeenAt\` specifically. Material-hint/development exposure by itself does not make hidden synopsis text searchable.
- **F02 state coherence/import bypass:** \`validateSmmcState()\` now normalizes stronger evidence into necessary weaker exposure facts, preserving earliest timestamps. This covers individual solution exposure, historical attempts, paper opened, solution paper opened, paper attempted and Arena consumed states; cloud merge inherits the same normalization.

Regression additions:
- Chromium research-first path verifies no synopsis-keyword search result until explicit statement exposure.
- Source validator exercises every stronger→weaker implication plus earliest-timestamp preservation and malformed remote merge.
- Chromium imports an intentionally incoherent paper-open record and verifies all session statements are normalized before the already-opened paper path is usable.

**Gate 1 remains CLOSED pending independent final confirmation of the repaired exact head.**


### Gate 0 final repair — G01

Final independent attack confirmed R01–R04 and F01–F02, then found one surgical timestamp-ordering defect.

- **G01 timestamp ordering:** evidence timestamps are now required to include an explicit timezone, canonicalized to UTC during validation, and compared by absolute instant rather than lexicographic string order.
- Timezone-less historical timestamps are rejected.
- Cross-offset regressions cover both validation/normalization and \`mergeSmmcState()\`.
- The concrete counterexample \`2026-09-20T09:00:00+05:30\` versus \`2026-09-20T04:00:00.000Z\` must retain the former instant, canonically \`2026-09-20T03:30:00.000Z\`.

**Gate 1 remains CLOSED until the exact repaired head passes complete CI and receives independent closure confirmation.**


## Arsenal Gate 0 closure / Gate 1 start — 2026-09-30

Gate 0 was independently accepted on exact reviewed head \`37cd46553ebccc6f5fa47b45beb2bf4ad3381251\` after the full R01–R04, F01–F02 and G01 review chain. PR #181 was merged to \`main\` as \`761023355678bc9088236e79bc12e68aa5107cb6\`.

Gate 1 has begun on branch \`codex/smmc-arsenal-gate1-research-contract\`.

Gate-1 scope is evidence discipline only:
- canonical source register;
- claim-specific source roles;
- HISTORICAL_BATTLE / SOURCE_HEURISTIC / PROOF_STRUCTURE / PREREQUISITE_MATHEMATICS / PROJECT_SYNTHESIS evidence classes;
- Battle / Discovery / Transfer separation;
- provenance requirements;
- conflict rules and forbidden shortcuts;
- Gate-0 inheritance.

No Arsenal ability has been accepted, typed, merged, split, ranked or ordered.

**STOP:** Gate 2 raw-candidate harvesting remains closed until independent review accepts the Gate-1 research contract.


## Arsenal Gate 1 adversarial repair — G1-R01–G1-R05 (2026-10-01)

Independent review of Gate-1 candidate head \`594e80420ad12b77980974c4e24e9b65b4e3d76a\` returned **CHANGES REQUIRED**. The source research was confirmed, but the contract itself had five structural problems.

Accepted findings and bounded repairs:

- **G1-R01 hidden ontology freeze:** removed Gate-1 mandates that Proof Form/Foundation must be separate or that Crux must be an event/non-card. Strategy/Tactic/Tool, Proof Form, Foundation, Specialist and every Crux representation are now explicitly research hypotheses only. Gate 1 cannot reject a later representation because it differs from the current hypothesis.
- **G1-R02 mixed evidence dimensions:** replaced the old five “evidence classes” with orthogonal axes:
  - \`evidenceBasis = SOURCE_FACT | PROJECT_DERIVED | LEARNER_EMPIRICAL | PROJECT_SYNTHESIS\`;
  - \`recordChannel = BATTLE | DISCOVERY | TRANSFER | NONE\`;
  - controlled \`claimKind\`;
  - independent \`verificationStatus\`;
  - future \`ontologyType\`, explicitly null/unset through Gate 2.
  Learner scratch-work / Forge / Boss / Arena observations now have an honest \`LEARNER_EMPIRICAL\` basis.
- **G1-R03 permissive Battle evidence:** “compatible with” is no longer Battle evidence. A ledger tag is an \`INDEX_LEAD\` until the move is traced to exact audited official evidence. Verified Battle occurrence requires problem ID + official source locator + an actual productive occurrence.
- **G1-R04 non-reproducible source set:** added \`docs/smmc/ARSENAL-SOURCE-REGISTER-v1.md\` with exact edition/version identities and SHA-256 fingerprints for the five canonical book artifacts, plus the frozen S0 repository snapshot. New sources require a reviewed source-register amendment; otherwise they remain \`UNVERIFIED_SOURCE_LEAD\`.
- **G1-R05 over-generalized source claims:** narrowed claims to what each edition actually establishes. Hammack's dependency tree is explicitly the dependency structure of his book, Velleman's sequence is evidence about his pedagogy rather than a universal prerequisite order, and Putnam/Engel study advice is source training evidence rather than automatic project law.

No raw candidate harvest, merge/split decision, ontology typing, ranking, prerequisite DAG, Forge, Boss or Arena build was started.

**STOP:** Gate 2 remains CLOSED pending independent follow-up acceptance of the repaired Gate-1 exact head.


## Arsenal Gate 1 follow-up repair — F1–F3 (2026-10-01)

Independent follow-up on \`71dcfd4f82411548313bfaec51f57138d44d5c5b\` confirmed the major G1-R01–R05 repair, then found three bounded provenance/schema holes.

Accepted repairs:

- **F1 S0 solution provenance:** added authoring-only \`course/smmc/official-solution-sources-v1.mjs\` with exact official year page, solution URL, page count and SHA-256 for every 2017–2025 solution booklet. VERIFIED solution-backed Battle evidence now requires the frozen artifact hash. \`sources-v1.mjs\` remains learner-safe and contains only problem-paper links.
- **F2 Battle co-occurrence loophole:** raw ledger-tag co-occurrence is now explicitly \`PROJECT_DERIVED + recordChannel:NONE + HISTORICAL_COOCCURRENCE\`. A BATTLE co-occurrence requires two linked VERIFIED official HISTORICAL_OCCURRENCE records for the same problem, each independently traceable to frozen official evidence.
- **F3 noncanonical source leads:** added \`SOURCE_LEAD\` as an explicit \`evidenceBasis\`. Noncanonical sources may be inspected and logged honestly, but must remain \`SOURCE_LEAD + NONE + UNVERIFIED_SOURCE_LEAD\` until a reviewed source-register amendment admits them.

The official solution registry is source-validated in \`validate-smmc-authoring-v1.mjs\` for complete 2017–2025 coverage, organiser-domain URLs, positive page counts and 64-hex SHA-256 fingerprints.

A 2025 source-version drift was discovered while repairing F1: the older 2026-09-28 inventory recorded a 26-page 2025 booklet, while the current official-linked revision is 25 pages. Gate 1 freezes the current 25-page artifact exactly and records the older revision as provenance history rather than treating the two as interchangeable.

No Gate-2 candidate harvest or ontology work was started.

**STOP:** Gate 2 remains CLOSED pending independent closure review of the repaired Gate-1 exact head.


## Arsenal Gate 1 closure-cycle repair — C01–C03 (2026-10-01)

Independent closure attack on \`6485f06bc35413bc2661cc7f61c45963fb77093f\` confirmed G1-R01–R05 and F1–F3, then found three narrower contract holes.

Accepted repairs:

- **C01 delayed reconstruction ≠ Transfer:** same-task delayed reconstruction is now explicitly \`LEARNER_EMPIRICAL + NONE + RETENTION\`. Transfer requires a fresh task, unprompted method selection, and unseen route/solution exposure. The executable validator rejects \`SAME_TASK_DELAYED\` Transfer records.
- **C02 complete axis admissibility:** added \`course/smmc/arsenal/evidence-contract-v1.mjs\` as an explicit allow-list for every \`evidenceBasis × recordChannel × claimKind\` combination and for basis × verification-status combinations. Unlisted combinations are forbidden. In particular SOURCE_FACT+TRANSFER, PROJECT_DERIVED+DISCOVERY, LEARNER_EMPIRICAL+BATTLE, and SOURCE_LEAD with any non-NONE channel are rejected.
- **C03 sourceLocator grammar:** source locators are now structured tagged objects. PDF locators use a 1-based physical \`pdfPage\` plus optional printed-page label/section/anchor; repository locators use exact path and inclusive 1-based line range with commit stored separately; web locators use URL plus optional heading/retrieval time. Free text such as “page 3” is invalid.

The SMMC authoring validator now regression-tests:
- allowed and forbidden basis/channel/claim combinations;
- basis/status restrictions;
- SOURCE_LEAD isolation;
- raw co-occurrence remaining channel NONE;
- fresh/unprompted/unseen Transfer;
- delayed same-task retention;
- rejection of delayed Transfer;
- rejection of SOURCE_FACT+TRANSFER;
- structured PDF/REPO/WEB locators;
- rejection of ambiguous scalar locators;
- same-problem requirement for verified Battle co-occurrence.

No Gate-2 candidate harvesting or ontology decisions were started.

**STOP:** Gate 2 remains CLOSED pending independent closure review of the new exact head.


## Arsenal Gate 1 final implementation repair — D01–D02 (2026-10-01)

Independent closure attack on \`76b6008bc11dc48b14b7b9975e81d164c9ea08f5\` found two concrete validator bypasses after C01–C03 otherwise held.

Accepted repairs:

- **D01 canonical source identity:** added \`course/smmc/arsenal/canonical-sources-v1.mjs\` as the machine-readable canonical Source-ID allow-list. It contains the five canonical book artifacts, all 22 official SMMC problem papers, and all nine official SMMC solution artifacts with exact page counts and SHA-256 values. Every \`SOURCE_FACT\` must now resolve to this registry, match the exact registered hash, and use an in-bounds PDF locator. Battle additionally requires the registered source kind to be official SMMC paper/solution evidence. Invented book IDs and invented \`S0-SMMC-*\` prefixes therefore fail closed.
- **D02 duplicate co-occurrence:** Battle co-occurrence now requires exactly two distinct linked occurrence record IDs and, after collection resolution, two distinct candidate/move IDs. Both linked occurrences must still be VERIFIED official occurrences for the same historical problem. \`["occ-a","occ-a"]\` and two records representing the same candidate are rejected.

Regression additions include:
- canonical registry integrity and expected 5 + 22 + 9 source count;
- accepted canonical Zeitz Discovery source fact;
- invented canonical-book SOURCE_FACT rejection;
- invented \`S0-SMMC-NOT-REGISTERED\` Battle rejection;
- wrong canonical hash rejection;
- duplicate linked occurrence rejection;
- duplicate candidate/move co-occurrence rejection.

No Gate-2 candidate harvesting, typing, ranking, prerequisite work, Forge, Boss or Arena work was started.

**STOP:** Gate 2 remains CLOSED pending independent closure acceptance of the repaired exact head.


## Arsenal Gate 1 closure / Gate 2 start — 2026-10-02

Gate 1 was independently accepted on exact head \`3052b8c53dd9e8bd598f51bc8423470086776625\` and merged to \`main\` as \`1a485cf7a2c495ab717cadee60a7762d96994f34\`.

Gate 2 began on branch \`codex/smmc-arsenal-gate2-raw-candidate-harvest\`.

Batch 1 created \`course/smmc/arsenal/candidates-v0.mjs\`:
- 44/44 current SMMC method tags preserved verbatim as index leads;
- 55 source-specific candidate rows harvested from inspected passages in Zeitz, Engel, Hammack, Velleman, and Putnam and Beyond;
- 99 raw candidates / 99 evidence records total;
- ontologyType remains null;
- no aliases merged;
- no adjudication, ranking, prerequisite graph, parent/child relation, or combo work started.

The authoring validator now checks Gate-2 boundary invariants and exact legacy-tag coverage.

This is an **initial harvest batch**, not Gate-2 completion.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 expanded harvest checkpoint — 2026-10-02

The initial 99-candidate batch was deliberately expanded rather than treated as exhaustive.

Current raw pool:
- 44 legacy method-tag leads;
- 39 secondary-tag leads;
- 129 distinct \`bridgeNeeds\` harvested from all 88 ledger rows;
- 34 curated route leads from a complete pass over all 88 \`auditNote\` fields;
- 102 source-specific candidates from the five canonical books;
- **348 raw candidates / 348 evidence records total**.

A non-adjudicating audit module now reports duplicate names and orphan/missing evidence. Current normalized duplicate-name groups: **9**. No duplicate has been merged.

Still unchanged:
- \`ontologyType: null\`;
- aliases empty;
- adjudication/rank/rarity/prerequisite/relation fields null;
- no Gate-3 granularity decision;
- no Battle occurrence claim created from project metadata.

The remaining Gate-2 work is deeper source coverage plus a final official-solution-route lead sweep and independent review.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 deep-source checkpoint — 420 raw candidates (2026-10-02)

The raw harvest was expanded again after the 348-candidate checkpoint.

Current pool:
- 44 frozen legacy method-tag leads;
- 39 frozen secondary-tag leads;
- 129 distinct ledger bridge-need leads from all 88 historical rows;
- 34 problem-specific route leads from the complete auditNote pass;
- 174 source-specific candidates from the five canonical books;
- **420 raw candidates / 420 evidence records** total.

The deeper source pass explicitly added material that a contents-only harvest would miss, including Zeitz's indexed strategies/tactics/tools, fine-grained tools, Crux Move, Problem Investigation and Numerical Experimentation; Engel's index-level algorithm/counting/strategy vocabulary and Great Ideas; Velleman's logical-form/definition-expansion proof-planning heuristics; and a wider Putnam-and-Beyond technique/topic sweep.

Current normalized duplicate-name report: **10 groups**, deliberately unresolved.

No Gate-3 decision has been made:
- ontologyType remains null;
- aliases remain empty;
- rank/rarity/prerequisite/relation/adjudication fields remain null;
- project metadata remains index evidence, not Battle evidence.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 official-solution route checkpoint — 428 raw candidates (2026-10-02)

The exact frozen official solution booklets were parsed for explicit solution-route structure.

Structural lower bound:
- 88 historical problem IDs;
- 132 explicitly labelled Solution / Solution N / Solution via ... sections;
- 32 problems with multiple explicitly labelled routes;
- 2 problems with no labelled solution section in the booklet (2017-B4, 2018-B4).

This route count is not an ability count and is recorded only as a lower bound on mathematical-route diversity.

A first direct official-solution concept pass added 8 SOURCE_FACT + NONE raw leads:
- winding-number parity coloring;
- perturb-away-degeneracies;
- parity tracking under continuous deformation;
- Taylor-series expansion;
- Mean Value Theorem as a contradiction tool;
- dense-set Riemann-sum approximation;
- Lagrange's theorem in a finite-group counting route;
- upper-Riemann-sum bounding.

Current raw pool: **428 candidates / 428 evidence records**.

No Battle matrix, merge/split decision, type, rank, prerequisite relation, or combo decision was created.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 broad official-solution sweep — 450 raw candidates (2026-10-02)

The direct official-solution harvest expanded from 8 to 30 SOURCE_FACT + NONE concept leads across the exact frozen solution booklets.

Current raw pool:
- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 distinct bridge-need leads;
- 34 auditNote route leads;
- 30 direct official-solution source leads;
- 174 canonical-book source leads;
- **450 candidates / 450 evidence records**.

Book-source coverage:
- Zeitz 62;
- Engel 36;
- Hammack 17;
- Velleman 19;
- Putnam and Beyond 40.

Current normalized duplicate-name report: **11 groups**, deliberately unresolved.

Official solution structural lower bound remains:
- 88 historical problems;
- 132 explicitly labelled solution sections;
- 32 multi-route problems;
- 2017-B4 and 2018-B4 have no labelled solution section in the frozen booklet.

No Battle matrix or Gate-3 adjudication was created.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 full canonical-book TOC/index sweep — 477 raw candidates (2026-10-02)

The canonical-book harvest was expanded from 174 to **201** source-specific rows after completing the broad Putnam-and-Beyond TOC sweep.

Current source counts:
- Zeitz 62;
- Engel 36;
- Hammack 17;
- Velleman 19;
- Putnam and Beyond 67.

Overall raw pool is now **477 candidates / 477 evidence records**.

The extra Putnam rows deliberately include named reusable or specialist techniques that may later be rejected by the granularity tribunal; Gate 2 does not pre-prune them.

No merge/split/type/rank/prerequisite/combo decision was made.

**STOP:** Gate 3 remains CLOSED.


## Arsenal Gate 2 review candidate frozen — 477 raw candidates (2026-10-02)

The raw harvest is now marked \`RAW-HARVEST-REVIEW-CANDIDATE\`, not accepted.

Review-candidate inventory:
- 44 legacy method-tag leads;
- 39 secondary-tag leads;
- 129 ledger bridge-need leads;
- 34 auditNote route leads;
- 30 direct official-solution SOURCE_FACT/NONE leads;
- 201 canonical-book source leads;
- **477 candidates / 477 evidence records**.

Independent review contract now explicitly attacks coverage, book/solution blind spots, accidental merging, ontology leakage, evidence/channel misuse, Battle leakage, source integrity, duplicate preservation, route-count misinterpretation, and any Gate-3+ leakage.

Any repair changes the review SHA and requires a fresh exact-head review.

**STOP:** Gate 3 remains CLOSED until independent Gate-2 acceptance.

## Arsenal Gate 2 independent coverage repair — 531 raw candidates (2026-10-02)

Independent review of the first 477-row candidate found substantive source-specific omissions while preserving the Gate-2 boundary.

Added **54** canonical-book raw candidates only:
- Zeitz +17;
- Engel +6;
- Hammack +8;
- Velleman +6;
- Putnam and Beyond +17.

The book-source harvest is now **255** rows and the complete raw pool is **531 candidates / 531 evidence records**.

The additions are source-specific raw ore only. No aliases were merged; no candidate was typed, ranked, prerequisite-linked, parented, related, or adjudicated. Project-derived ledger evidence remains NONE channel, and the direct official-solution rows remain SOURCE_FACT + NONE.

The previous 477-row review SHA is therefore superseded. Gate 2 remains **REVIEW CANDIDATE**, Gate 3 remains closed, and the repaired exact head requires fresh CI plus independent exact-head review before any merge.

## Arsenal Gate 2 deep official-solution coverage repair — 603 raw candidates (2026-10-02)

A second independent pass over the exact frozen 2017–2025 official solution booklets found that the existing 30 direct source rows were still materially under-harvested.

Added **72** direct official-solution raw candidates as SOURCE_FACT + NONE, increasing that source channel from 30 to **102**. The new rows include source-specific discovery/proof moves across every competition year, from potential functions and hidden sum-of-squares identities through finite-field, valuation, game, compactness, convexity, recurrence/generating-function, linear-algebra, and parity/encoding constructions.

Current complete Gate-2 pool:
- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 102 direct official-solution SOURCE_FACT + NONE leads;
- 255 canonical-book source leads;
- **603 candidates / 603 evidence records**.

No Gate-3 adjudication was introduced. All candidate ontology types remain null; aliases remain empty; rank, rarity, prerequisites, candidate relations, and adjudication fields remain null. Project-derived historical indexes remain NONE-channel evidence.

The previous 531-row review target is superseded. Gate 2 remains REVIEW CANDIDATE and requires fresh exact-head CI plus independent exact-head review before it can close.

## Arsenal Gate 2 official-solution stabilization pass — 627 raw candidates (2026-10-02)

A bounded third official-solution pass targeted historical problems still lacking any direct source lead after the 603-row checkpoint.

Added **24** further SOURCE_FACT + NONE candidates, taking the direct official-solution harvest from 102 to **126**. A subsequent coverage check matches all 126 official rows to registered historical problem IDs, with no duplicate or missing RAW-OFFICIAL IDs, and finds direct official-source candidate coverage on **75 / 88** frozen historical problems.

The remaining uncovered historical problems were inspected against the project ledger/audit notes rather than force-filled for symmetry. Their routes are either ordinary applications already represented elsewhere in the raw pool or the historical open-problem cases without a labelled full solution in the frozen booklet. No 88/88 quota is being imposed at Gate 2.

Current Gate-2 pool:
- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 126 direct official-solution SOURCE_FACT + NONE leads;
- 255 canonical-book source leads;
- **627 candidates / 627 evidence records**.

This is still a REVIEW CANDIDATE. No ontology, merge/split, ranking, prerequisite, relation, or learning-order decision has been made. The exact head must pass fresh CI and then receive independent exact-head review before Gate 2 can close.

## Arsenal Gate 2 final one-row gap repair — 628 raw candidates (2026-10-02)

A final bounded historical-gap check preserved one additional official-source move from 2017-B2: **Modulo-4 Square Obstruction for Odd Primes**.

This adds one SOURCE_FACT + NONE row and moves the direct official-solution harvest from 126 to **127**, with direct official-source candidate coverage on **76 / 88** frozen historical problems.

Current Gate-2 pool:
- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 127 direct official-solution SOURCE_FACT + NONE leads;
- 255 canonical-book source leads;
- **628 candidates / 628 evidence records**.

The remaining 12 historical problems were inspected rather than force-filled to an artificial 88/88 quota. Gate 2 remains REVIEW CANDIDATE; Gate 3 remains closed. Any acceptance must bind to the final exact head after fresh CI.

## Arsenal Gate 2 independent-review repair G2-R01–R03 — 631 raw candidates (2026-10-02)

Independent review of the old 477-row head found three substantive issues. This repair addresses them without opening Gate 3.

**G2-R01 — direct official evidence semantics**
- All **127** direct official-solution evidence records now use SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE.
- Each remains tied to one historical problem and the exact frozen official source/hash/page locator.
- The authoring validator now asserts the occurrence tuple for every direct official-solution row.
- This is occurrence evidence only; no co-occurrence matrix, ranking, ontology, prerequisite graph, or learning order is created.

**G2-R02 — Zeitz source omissions**
- Added **Average Principle** from physical PDF page 193.
- Added **Repeated Bisection Method** from physical PDF page 344.
- Added **Algorithmic Proof** from physical PDF page 369.
- Earlier coverage repair had already added the reviewer's other named examples: Symmetry-Product Principle, Euclidean Algorithm, Bisection Method, and Well-Ordering Principle.
- Zeitz source rows move from 79 to **82**; five-book source rows move from 255 to **258**.

The final bounded book-pass rule is to preserve source-specific terms explicitly presented as strategies, tactics, tools, principles, methods, algorithm/proof styles, or structured proof moves, plus named specialist methods in the canonical TOC/index when they are plausible contest-solving machinery. Same-looking terms remain separate.

**G2-R03 — documentation drift**
- Current Gate-2 state is consistently RAW-HARVEST-REVIEW-CANDIDATE.
- Obsolete RAW-HARVEST-IN-PROGRESS wording is not used as the current invariant.

Current pool: **631 candidates / 631 evidence records** = 44 method tags + 39 secondary tags + 129 bridgeNeeds + 34 project-derived audit-note route leads + 127 verified official historical occurrences + 258 canonical-book source leads.

The prior review SHA is superseded. Fresh exact-head CI and independent follow-up are required. Gate 3 remains CLOSED.

## Arsenal Gate 2 systematic source-closure repair — 653 raw candidates (2026-10-02)

The independent exact-head follow-up on `5f4ffc2d4bc93f960ac32ce358267283bf8f709b` accepted the G2-R01 evidence-semantics repair and G2-R03 status repair, but correctly kept **G2-R02** open because the positive source-saturation sentinels did not prove exhaustion of the declared inclusion rule.

A single bounded closure pass was therefore run across designated TOC/index/summary/strategy zones for all five canonical books.

### Auditable closure artifact

Added:

`course/smmc/arsenal/source-closure-manifest-v0.mjs`

The manifest records:
- the exact source zones reviewed;
- the exact canonical-book HARVEST candidate-ID set;
- explicit EXCLUDE decisions with physical PDF page, section, and reason.

The validator now requires exact set equality between the canonical-book candidate IDs and the manifest HARVEST set. It also validates source-zone and exclusion page bounds against the canonical source registry, uniqueness of decisions, substantive exclusion reasons, and HARVEST/EXCLUDE disjointness.

### New raw source rows from the closure pass

The source-book pool moved from **258 to 280**.

Zeitz moved 82 → **94** with:
- Mental Toughness;
- Creativity;
- Argument by Contradiction;
- Mathematical Induction;
- Crossover Tactic;
- Division Algorithm;
- Combinatorial Proof;
- Rigid Motions and Vectors;
- Translation;
- Glide Reflection;
- Rotation;
- Logarithmic Differentiation.

Engel moved 42 → **46** with:
- Graph Theory;
- Equations, Functions, and Iterations;
- Integer Functions;
- Get Rid of Floor and Ceiling Brackets.

Hammack moved 25 → **30** with:
- Proving Statements with Contradiction;
- Proving Conditional Statements by Contradiction;
- Combining Techniques;
- Equivalent Statements;
- Existence-and-Uniqueness Proof.

Velleman moved 25 → **26** with:
- Instantiate a Unique-Existence Given.

Putnam and Beyond remains **84** after its complete TOC closure; generic organizational/problem-bucket headings are recorded as explicit exclusions rather than silently ignored.

### Current Gate-2 pool

- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 127 direct official-solution SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE leads;
- 280 canonical-book source leads;
- **653 candidates / 653 evidence records**.

No aliases were merged. No ontology type, granularity disposition, rank, rarity, prerequisite, parent/child relation, candidate relation, learning order, Forge, Boss, or Arena work was introduced.

Gate 2 remains **REVIEW CANDIDATE** and Gate 3 remains CLOSED. A fresh exact-head CI pass and fresh bounded independent follow-up are required before Gate 2 can close.

## Arsenal Gate 2 final closure-integrity repair — 661 raw candidates (2026-10-02)

Independent review **5389173535** on exact SHA `4505699b92899e21e87559b1e0c696fd220fc59c` confirmed G2-R01 and G2-R03 remain closed, confirmed green exact-head CI and no Gate-3 leakage, but kept G2-R02 narrowly open for one architectural reason:

the 280-candidate HARVEST set and 62 EXCLUDE records were internally validated, but there was no complete reviewed-item inventory proving that every candidate-like source item encountered in the declared bounded zones had received a disposition.

### Repair

`course/smmc/arsenal/source-closure-manifest-v0.mjs` is now an **item-level closure certificate**.

It contains a single reviewed decision inventory with:
- **386 reviewed source items**;
- **311 HARVEST decisions**;
- **288 unique harvested canonical-book candidates**;
- **75 EXCLUDE decisions**.

Every reviewed item has exactly one disposition:
- HARVEST → an existing same-source raw candidate ID; or
- EXCLUDE → a substantive Gate-2 source-qualification reason.

The validator now enforces:
- unique reviewed-item IDs;
- unique item identity within source/zone/label/context;
- exactly one valid disposition;
- HARVEST/EXCLUDE field exclusivity;
- same-source HARVEST mappings;
- exact equality between the unique HARVEST candidate-ID projection and the actual canonical-book candidate set;
- at least one reviewed HARVEST justification for every canonical-book candidate;
- valid bounded source zones/selectors and frozen-PDF page bounds;
- EXCLUDE locators inside their declared source zones;
- exact compatibility projections for the derived HARVEST and EXCLUDE exports.

### Final Zeitz source additions from the reviewed-item partition

Added 8 raw candidates:
- Algebraic Proof;
- Geometric Proof;
- Deductive Argument (Direct Proof);
- Contrapositive;
- Algorithmic Construction;
- Dissection;
- Similar Triangles;
- Composition of Transformations.

The reviewer's remaining proof/index examples are now explicitly decisioned. Items such as induction proof, combinatorial proof, proof using area/trigonometry/auxiliary construction/complex numbers/inversion/shearing map to already preserved same-source candidates; local attributions/descriptions such as Cauchy's proof, classical/Euler proof of infinitude of primes, and generic theorem-proof cross-references carry explicit EXCLUDE reasons.

### Current Gate-2 pool

- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 127 direct official-solution SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE leads;
- 288 canonical-book source leads:
  - Zeitz 102;
  - Engel 46;
  - Hammack 30;
  - Velleman 26;
  - Putnam and Beyond 84;
- **661 candidates / 661 evidence records**.

No alias merge, ontology type, granularity disposition, rank, rarity, prerequisite, parent/child relation, combo graph, learning order, Forge, Boss, or Arena work was introduced.

Gate 2 remains **REVIEW CANDIDATE** and Gate 3 remains CLOSED. The repaired exact head requires fresh exact-head CI and one fresh independent adversarial follow-up before closure.

## Arsenal Gate 2 literal family-child + locator hardening — 661 raw candidates (2026-10-02)

Independent review **5393058455** on exact SHA `8f004a237fcb09c386138cd5abdf7580fdb081a8` accepted the item-level closure-certificate architecture but found two narrow R02 integrity holes:

1. Zeitz's selector explicitly promised every child of the Strategies / Tactics / Tools / Transformations / Combinatorial Strategies and Tactics index families, but some literal child entries still lacked a reviewed-item disposition.
2. HARVEST reviewed items lacked their own physical `pdfPage` locator, so the validator could not prove that the reviewed source occurrence itself lay inside the declared bounded source zone.

### Repair

No new raw candidates were added. The Gate-2 pool remains **661 candidates / 661 evidence records**, including **288 canonical-book candidates**.

The closure certificate now contains:
- **458 reviewed source items**;
- **375 HARVEST decisions**;
- **288 unique harvested book candidates**;
- **83 EXCLUDE decisions**.

Added **72** literal Zeitz family-child reviewed items, covering every child on the declared index families. Existing same-source methods are mapped with HARVEST; contextual/application-only children receive EXCLUDE reasons. Examples include Strategy/Tactic/Tool `defined` children, all named tactic children, all named tool children, every concrete transformation child, the Felix Klein / Henri Poincare contextual entries, the Homothety/concurrence application entry, and all four Combinatorial Strategies and Tactics children.

Every reviewed item now carries:
- an explicit physical PDF page;
- section/context;
- exactly one disposition.

The source-zone model now distinguishes:
- **enumerationSegments** — surfaces that carry the exhaustiveness claim;
- **verificationSegments** — exact point pages used only to validate reviewed-item locators for already-admitted source items.

The validator now rejects any reviewed item whose page is missing, outside the frozen canonical artifact, or outside its declared source zone. Existing partition checks remain in force: unique review identities, one disposition, HARVEST/EXCLUDE exclusivity, same-source candidate mappings, exact unique-HARVEST projection, and substantive EXCLUDE reasons.

Gate 2 remains **REVIEW CANDIDATE**. Gate 3 remains CLOSED. Fresh exact-head CI and one fresh independent attack are required.

## Arsenal Gate 3 opened — granularity calibration (2026-10-03)

Gate 2 is frozen and accepted at exact SHA `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`, preserved on `main` by merge commit `7600dd377192aafe6ca777636d94474736ea4e4f`.

Gate 3 begins as a **granularity-measurement overlay** on the immutable 661-candidate raw pool. It does not reopen harvest and does not permit merge/split, ontology, ranking, prerequisites, candidate relations, learning order, or Forge/Boss/Arena work.

Added:
- `course/smmc/arsenal/granularity-contract-v1.mjs`
- `course/smmc/arsenal/granularity-ledger-v0.mjs`
- `docs/smmc/ARSENAL-GATE3-GRANULARITY-CONTRACT.md`
- executable Gate-3 checks in `scripts/validate-smmc-authoring-v1.mjs`

The diagnostic ruler measures each candidate independently on:
- reference scale: MICRO / DEPLOYABLE / MACRO / CROSS_SCALE / UNRESOLVED;
- bundle structure;
- action shape;
- semantic context reach;
- trigger / operation / output boundary clarity;
- confidence.

The initial calibration deliberately reviews **43** mixed candidates across all Gate-2 origin families and leaves **618** explicitly UNREVIEWED. The calibration includes broad content labels, source category terms, clean deployable moves, problem-local micro expressions, explicit bundles, theorem labels, proof structures, and an unresolved legacy shorthand.

No raw candidate/evidence record was mutated.

## Arsenal Gate 3 calibration repair after review 5397001542 (2026-10-03)

Independent review **5397001542** on exact SHA `7a93f88c7ba813f8d1c6de3f46b8b52d0dc15ef9` accepted the overall granularity architecture but found five bounded ruler/certificate blockers before the 661-row mass pass.

### G3-R01 — evidence-supported MICRO + orthogonal context anchors

- `RAW-ROUTE-004 — Recoverability Lemma` no longer borrows semantics from the richer official Recoverability candidate. Its candidate-owned audit-note evidence supports only the label and attachment to SMMC-2020-A2, so scale and trigger/operation/output boundaries are now `UNRESOLVED`; `PROBLEM_LOCAL` remains supported by the explicit historical-problem attachment.
- Added `RAW-SOURCE-p-positivity-squares` as an independent **MICRO + GENERAL** anchor: the expression is a reusable fact `x² ≥ 0`, narrower than a complete deliberate move and with no operation boundary.
- Added `RAW-OFFICIAL-115` as an independent **DEPLOYABLE + PROBLEM_LOCAL** anchor: one coherent recurrence-specific prime-support step.
- Calibration is now **45 REVIEWED / 616 UNREVIEWED**.

### G3-R02 — Crux Move / CROSS_SCALE semantics

`CROSS_SCALE` now has exactly two permitted meanings:
1. the current expression packages independently meaningful moves at more than one grain; or
2. a source-defined role/label is explicitly stated to occur at more than one grain.

Zeitz's `Crux Move` is now `CROSS_SCALE + SINGLE_PRIMARY_MOVE`, not MACRO and not BUNDLED_MOVES, because the accepted source fact explicitly says a crux may occur at strategic, tactical, or tool level.

### G3-R03 — actionShape is lexical/current-expression only

`EXPLICIT_ACTION` now requires the candidate wording itself to state the action through an imperative/verb phrase or action gerund. Noun-like/compressed labels whose operation is recoverable from candidate-owned evidence are `IMPLICIT_ACTION`. Evidence may justify that an operation exists but cannot promote noun-like wording to EXPLICIT.

Affected calibration rows were repaired, including the official noun-like labels highlighted by review: finite-field quotient model, information-state counting lower bound, threat-pair forcing strategy, modulo-4 obstruction, and similar noun-phrase candidates.

### G3-R04 — fail-closed exact key schema

Gate-3 records now have an executable exact allowlist, `ARSENAL_GATE3_RECORD_KEYS`. Any unknown field fails validation. A regression probe explicitly verifies that an injected `difficulty` key is rejected.

A small rationale-leak check also rejects explicit later-gate recommendations such as merge-into / split-into / drop / keep-as-card / final-representation language.

### G3-R05 — accepted Gate-2 ore is mechanically fingerprinted

Added `course/smmc/arsenal/gate2-accepted-snapshot-v1.mjs`.

The validator computes SHA-256 over the canonical JSON payload containing:
- all 661 raw candidates;
- all 661 raw evidence records;
- official route index + structural meta;
- source-closure rule, zones, reviewed-item partition, and closure meta.

Accepted fingerprint:

`f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f`

Any mutation to those accepted Gate-2 semantic/provenance objects now fails Gate-3 CI even when candidate IDs/names/origins remain unchanged.

### Confidence semantics

Confidence now explicitly means confidence in the **Gate-3 assessment**, not in the mathematical truth or source. HIGH + UNRESOLVED is valid when we are highly confident that the accepted evidence does not justify a finer call. LOW is now exercised by the Chinese Remainder Theorem stress case.

No 618-row mass pass has begun. Tribunal/ontology/prerequisite/ranking/product gates remain closed.

## Arsenal Gate 3 second calibration repair after review 5400107346 (2026-10-03)

Independent review **5400107346** on exact SHA `c805ffba749d49f5eb055a94da1da33c7ede47bf` kept four bounded issues open before the 616-row mass pass.

### G3-R06 — MACRO vs CROSS_SCALE made reproducible

The ruler now applies this priority:

- a bundle of multiple operations is **MACRO + BUNDLED_MOVES** unless the accepted candidate expression/evidence actually establishes that its components live at different reference grains;
- **CROSS_SCALE** is reserved for evidence-supported mixed-grain expressions or source-defined roles explicitly stated to occur at multiple grains.

Accordingly, the following calibration rows are now MACRO + BUNDLED_MOVES:
- forcing-strategy trees + threat-pair reasoning;
- clearing denominators + primitive-integer normalization;
- convex-envelope + epigraph/convex-hull construction;
- Dilation–Derivative Boundedness Bootstrap;
- row replacement + cofactor expansion;
- Hammack Combining Techniques.

Zeitz's Crux Move remains CROSS_SCALE + SINGLE_PRIMARY_MOVE as the explicit scale-variable-role anchor.

### G3-R07 — strict candidate-owned Gate-2 evidence mode

Gate 3 now states explicitly that it may use only:
- the accepted raw candidate expression; and
- the accepted evidence records already attached to that exact candidate.

No richer canonical-PDF reading or general mathematical familiarity may silently fill missing semantics during this gate.

`RAW-SOURCE-p-crt — Chinese Remainder Theorem` is therefore now:
- referenceScale UNRESOLVED;
- bundleStructure UNRESOLVED;
- actionShape LABEL_ONLY;
- contextReach SOURCE_LOCAL;
- trigger / operation / output UNRESOLVED;
- confidence HIGH in the unresolved call.

LOW confidence is now calibrated on `RAW-OFFICIAL-048 — Finite-Field Quotient Model of the Projective Plane`, where the attached official evidence genuinely supports a representation operation but leaves a plausible evidence-supported boundary ambiguity.

LOW is explicitly uncertainty **among evidence-supported assessments**; it cannot authorize an otherwise unsupported dimensional call.

### G3-R04 final closure — validate authoring input before destructuring

`assessed({...})` was replaced by exported `buildGate3AssessedCalibration(input)`.

The helper validates the exact authoring-key set **before** destructuring. Unknown input keys therefore cannot disappear silently.

CI now tests both:
- an unknown key injected into a final exported Gate-3 record; and
- `difficulty: "HARD"` supplied through the actual assessed authoring helper.

Both must be rejected.

### G3-R05 hardening — accepted Git blob freeze plus semantic digest

The validator now contains accepted Git blob SHA-1 literals copied from exact accepted Gate-2 SHA `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7` for eleven frozen Gate-2 source/provenance files:

- `course/smmc/schema.mjs`
- `course/smmc/arsenal/candidates-v0.mjs`
- `course/smmc/arsenal/ledger-bridge-candidates-v0.mjs`
- `course/smmc/arsenal/ledger-route-candidates-v0.mjs`
- `course/smmc/arsenal/official-solution-candidates-v0.mjs`
- `course/smmc/arsenal/official-solution-route-index-v0.mjs`
- `course/smmc/arsenal/source-closure-manifest-v0.mjs`
- `course/smmc/arsenal/raw-harvest-audit-v0.mjs`
- `course/smmc/arsenal/canonical-sources-v1.mjs`
- `course/smmc/arsenal/evidence-contract-v1.mjs`
- `course/smmc/official-solution-sources-v1.mjs`

CI computes each current checkout's Git-blob SHA-1 from raw bytes and compares it to the accepted literal.

The semantic/provenance SHA-256 `f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f` remains a second layer, and the validator pins that literal independently of the mutable snapshot module.

### Documentation cleanup

- duplicate actionShape `UNRESOLVED` bullet removed;
- Trigger / operation / output boundaries renumbered from section E to section F.

The calibration remains **45 REVIEWED / 616 UNREVIEWED**. No mass pass, tribunal, ontology, prerequisite, ranking, relation, learning-order, or product work has started.

## Arsenal Gate 3 strict-mode calibration consistency repair after review 5401367313 (2026-10-04)

Independent review **5401367313** on exact SHA `bb8bc47d83e326463cbf06ad2e30e09824662d10` confirmed that the freeze/schema/CRT/bundle repairs were real, but kept the 616-row mass pass closed for three remaining calibration-consistency issues.

### G3-R08 — complete 45-row strict-evidence re-audit

Every one of the 45 REVIEWED calibration rows was re-audited against **only**:
1. the current raw candidate expression; and
2. the accepted Gate-2 evidence records attached to that exact candidate.

No richer PDF content, general theorem familiarity, or another candidate's evidence was used to fill dimensions.

The re-audit deliberately downgraded unsupported calls. Examples:

- `RAW-SOURCE-h-direct-proof` is now `UNRESOLVED + LABEL_ONLY` with trigger/operation/output absent; its attached evidence establishes only a Direct Proof chapter heading, not the familiar proof schema.
- `RAW-BRIDGE-052 — Gram-matrix viewpoint for vectors` is now unresolved on grain/bundle/operation/output; its project-index evidence merely preserves the label.
- `RAW-LEGACY-small-cases` and `RAW-LEGACY-cross-domain` no longer import unstated action/grain semantics from familiar contest vocabulary.
- `RAW-SOURCE-z-factor-tactic` keeps only the lexical implication of a factor operation as partial; deployable grain/payoff remain unresolved because the attached source fact only says the tactic is named/developed.
- project bridge/route leads now use only what their labels themselves support; exact operational details are not reconstructed from model knowledge.
- rich official SOURCE_FACT + BATTLE rows retain stronger trigger/operation/output calls only where the attached official evidence claim explicitly states them.

The ledger records:
`strictEvidenceReauditVersion: "v1-45-complete"`

Calibration remains **45 REVIEWED / 616 UNREVIEWED**.

### G3-R09 — contextReach repaired to measure semantics, not provenance

The contract now states explicitly:

- source origin alone never makes a candidate SOURCE_LOCAL;
- generic mathematical expressions are GENERAL even when harvested from a book;
- SOURCE_LOCAL requires author/source-specific meaning established by candidate-owned evidence;
- PROBLEM_LOCAL requires the wording itself to depend materially on one historical problem/route context, not merely to carry a historicalProblemId.

Repaired examples:
- `GRAPH` → GENERAL
- Engel `Graph Theory` → GENERAL
- Putnam-and-Beyond `Groups` → GENERAL
- Putnam-and-Beyond `Chinese Remainder Theorem` → GENERAL
- Putnam-and-Beyond `Counting Strategies` → GENERAL
- `Diagonalize a 2-by-2 Polynomial Matrix` → GENERAL
- official finite-field quotient / dilation-bootstrap / determinant-reduction wording → GENERAL

Source-authored meanings remain SOURCE_LOCAL:
- Zeitz Strategy
- Zeitz Tactic
- Zeitz Tool
- Zeitz Crux Move

Problem-local stress cases remain independently represented:
- audit-note Recoverability Lemma
- Newton-Polygon Alternative
- Smallest Nondivisible Multiplier Advances Prime Support

Validator regressions pin these contrasts.

### G3-R10 — both legal CROSS_SCALE branches are now calibrated

CROSS_SCALE still has only two allowed meanings:

1. **mixed-grain expression**: the current candidate expression/evidence itself supports components at different reference grains;
2. **scale-variable source role**: candidate-owned evidence explicitly states that one role may occur at multiple grains.

Both branches now have explicit calibration anchors:

- **branch 1:** `RAW-BRIDGE-127 — Convex envelope and epigraph/convex-hull construction`
  - `CROSS_SCALE`
  - `bundleStructure: UNRESOLVED`
  - the wording itself couples a named target concept/object with a construction expression;
  - no claim of multiple executable moves is manufactured.

- **branch 2:** `RAW-SOURCE-z-crux-move`
  - `CROSS_SCALE`
  - `SINGLE_PRIMARY_MOVE`
  - Zeitz's attached source fact explicitly says a crux move may occur at strategic, tactical, or tool level.

The human contract also requires fail-closed `UNRESOLVED` if a future mass-pass candidate appears CROSS_SCALE for a reason outside these two calibrated branches.

### Current calibration distribution

- 45 REVIEWED / 616 UNREVIEWED
- referenceScale:
  - UNRESOLVED 10
  - DEPLOYABLE 17
  - MACRO 15
  - CROSS_SCALE 2
  - MICRO 1
- contextReach:
  - GENERAL 37
  - SOURCE_LOCAL 4
  - PROBLEM_LOCAL 3
  - UNRESOLVED 1

No mass-pass, tribunal, ontology, prerequisite, ranking, relation, learning-order, or product work has started.

## Arsenal Gate 3 final ruler-semantics repair after review 5402888871 (2026-10-04)

Independent review **5402888871** on exact SHA `dba5155fc7dc69142a4ec998bc4501dc5c61a0b3` confirmed the 45-row strict-evidence re-audit, contextReach repair, Gate-2 freeze, and CI, but kept two ruler-level ambiguities open before the 616-row mass pass.

### G3-R10 — mixed-grain CROSS_SCALE branch deferred

The attempted mixed-grain anchor `Convex envelope and epigraph/convex-hull construction` was rejected as insufficient: concept/object wording plus construction wording proves heterogeneous semantic roles, not different MICRO / DEPLOYABLE / MACRO reference grains.

Gate 3 now has **one active CROSS_SCALE meaning only**:

- a source-defined role/label whose candidate-owned evidence explicitly states that the role can occur at more than one reference grain.

The calibration anchor is:

- `RAW-SOURCE-z-crux-move` → `CROSS_SCALE + SINGLE_PRIMARY_MOVE`.

The formerly proposed `MIXED_GRAIN_EXPRESSION` branch is explicitly deferred in the executable contract.

`RAW-BRIDGE-127 — Convex envelope and epigraph/convex-hull construction` now fails closed to:
- `referenceScale: UNRESOLVED`;
- `bundleStructure: UNRESOLVED`.

Its wording still supports only partial construction operation/output semantics. During the mass pass, any candidate that appears to require the deferred mixed-grain branch must remain UNRESOLVED and reopen calibration rather than inventing a new CROSS_SCALE meaning.

### G3-R11 — ABSENT vs UNRESOLVED defined and normalized

Boundary states are now operationally distinct:

- **CLEAR** — the raw expression + candidate-owned accepted evidence identifies the boundary specifically enough to state it.
- **PARTIAL** — the permitted evidence positively identifies some boundary content but leaves material detail unspecified.
- **ABSENT** — the current expression/evidence is affirmatively non-operational with respect to that boundary at its present grain. **Mere silence is not ABSENT.**
- **UNRESOLVED** — the boundary is plausibly relevant/implied, but strict candidate-owned evidence is insufficient to determine it.

The 45 calibration rows received a bounded boundary-state consistency pass.

Pinned contrasts now include:

**ABSENT**
- `GRAPH`
- `ODE`
- `Groups`
- `CROSS-DOMAIN`

These are broad subject/scope labels that are non-operational at the current expression grain.

**UNRESOLVED**
- `Direct Proof`
- `Chinese Remainder Theorem`
- `Recoverability Lemma`
- `Gram-matrix viewpoint for vectors`
- `SMALL-CASES`

These expressions plausibly carry operational boundaries, but the accepted candidate-owned evidence does not determine them.

Additional normalizations:
- Graph Reformulation / Base-three encoding / Adjacent-Swap Optimality Argument / Look for Patterns / Combining Techniques now use UNRESOLVED rather than ABSENT for missing triggers when a deployment trigger is plausibly relevant.
- Crux Move now uses operationBoundary UNRESOLVED rather than ABSENT because the role implies an operation exists but does not identify it.

The calibration audit marker is now:

`strictEvidenceReauditVersion: "v2-45-boundary-normalized"`

The population remains **45 REVIEWED / 616 UNREVIEWED**. No mass-pass, tribunal, ontology, prerequisite, ranking, relation, learning-order, or product work has started.

## Arsenal Gate 3 full 616-row mass pass — review candidate (2026-10-04)

Independent review **5404589125** accepted the Gate-3 calibration ruler on exact SHA `177a8efa24ebca15e2c84dbb18e96a72be5e1d08` and explicitly opened the remaining 616-row mass pass.

The accepted ruler semantics and evidence mode were not changed.

### Mass implementation

Added:
- `course/smmc/arsenal/granularity-mass-pass-v1.mjs`
- `course/smmc/arsenal/granularity-audit-v1.mjs`
- `docs/smmc/ARSENAL-GATE3-MASS-PASS-REPORT.md`

The mass classifier:
- is anchored to the accepted calibration SHA;
- receives only the raw candidate expression plus candidate-owned accepted Gate-2 evidence;
- emits no CROSS_SCALE rows;
- uses ten bounded implementation rules MP01–MP10;
- fails thin operational-looking rows closed to UNRESOLVED rather than using general mathematical familiarity.

The ledger now contains **661 REVIEWED / 0 UNREVIEWED** rows:
- 45 independently accepted calibration rows;
- 616 mass-pass rows.

### Deliberate self-audits before handoff

The builder did not stop at the first green 661-row run.

Self-audit passes repaired:
- an ordering bug in the validator that initially prevented the mass run from validating;
- lexical trigger/result consistency for explicit action wording;
- over-permissive official/source claim parsing;
- passive/provenance verbs such as `presents`, `records`, and `used in the text` no longer count as executable source operations;
- official Battle claim parsing was widened only for verbs actually present in the accepted candidate-owned claims;
- obvious explicit action wording such as `Define a Function`, `Create Order out of Chaos`, `Search for a Pattern`, `How to Prove Membership`, etc.;
- compressed operation nouns such as compression/recognition/centering/coloring/guarding/cancellation/summation.

A dedicated official high-risk audit reduced the official UNRESOLVED set to exactly three evidence-thin cases:
- Newton-Polygon Alternative;
- 2-adic Valuation;
- Bijective Counting Route.

A dedicated bundled audit exposes all **13** BUNDLED_MOVES rows.

A duplicate-name audit checks all **25** exact normalized-name duplicate groups. **10** have different granularity signatures, all retained as explicit review targets rather than being merged/adjudicated.

### Final pinned distribution

Reference scale:
- MICRO 1
- DEPLOYABLE 213
- MACRO 115
- CROSS_SCALE 1
- UNRESOLVED 331

Bundle structure:
- BUNDLED_MOVES 13
- SINGLE_PRIMARY_MOVE 214
- UNRESOLVED 434

Action shape:
- EXPLICIT_ACTION 53
- IMPLICIT_ACTION 238
- LABEL_ONLY 369
- UNRESOLVED 1

Context reach:
- GENERAL 649
- SOURCE_LOCAL 4
- PROBLEM_LOCAL 7
- UNRESOLVED 1

Trigger boundaries:
- CLEAR 74
- PARTIAL 29
- ABSENT 103
- UNRESOLVED 455

Operation boundaries:
- CLEAR 182
- PARTIAL 109
- ABSENT 103
- UNRESOLVED 267

Output boundaries:
- CLEAR 103
- PARTIAL 85
- ABSENT 102
- UNRESOLVED 371

Confidence:
- HIGH 591
- MEDIUM 69
- LOW 1

Mass-rule usage:
- MP01 55
- MP02 9
- MP03 106
- MP04 14
- MP05 12
- MP06 26
- MP07 38
- MP08 153
- MP09 36
- MP10 167

These counts are now executable regression expectations in the validator.

### Gate state

Gate 3 is **not accepted yet**. This is the full mass-pass review candidate.

`Gate 0 ✅ → Gate 1 ✅ → Gate 2 ✅ → Gate 3 🟡 MASS-PASS REVIEW CANDIDATE → Tribunal 🔒`

A fresh exact-head independent graduation attack is required before Tribunal may open.

