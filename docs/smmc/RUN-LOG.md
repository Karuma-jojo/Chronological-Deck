# SMMC × T25 companion — run log

Updated: 2026-09-23.

## Safety boundary

This work is additive on branch `codex/smmc-t25-companion`, created from `main`.

No existing T25 file has been modified in Batch 1. In particular, this batch does not change:

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
- `scripts/validate-smmc-ledger.mjs` — structural validation for the first ledger batch.

### 2017 first-pass result

- GREEN: 1
- AMBER: 4
- RED: 3
- East-relevant: 8/8
- Open-problem item: B4, explicitly excluded from ordinary full-solution readiness expectations.

These overlap labels mean prerequisite coverage, not problem difficulty or predicted score.

## Aster decision

Reuse the existing Aster philosophy, not its T25 episode progression mechanically.

For SMMC, narrative must remain:

1. optional;
2. downstream of a frozen mathematical task;
3. clue-free under WALL;
4. unable to grant mathematical clearance;
5. free of penalties for delay, struggle or wrong attempts.

A future SMMC Aster arc may present tournament/hearing/expedition stakes, but it may not encode domain, method, answer shape, number of cases or likely breakthrough.

## Next safe batch

1. Audit 2018 against the same schema.
2. Re-check the 2017 GREEN/AMBER/RED decisions against the current T25 card text before freezing.
3. Add a shared schema/constants module only after at least two years reveal which tags are genuinely stable.
4. Do not wire SMMC into the T25 UI until the ledger/taxonomy is stable and validated.
