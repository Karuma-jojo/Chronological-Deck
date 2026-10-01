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
