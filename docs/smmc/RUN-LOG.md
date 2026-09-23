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
