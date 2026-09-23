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
