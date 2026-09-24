# M08 Review Handoff — Independent Repair Candidate

Date: 2026-09-24
Repository: `Karuma-jojo/Chronological-Deck`
Repair branch: `codex/t22-m08-independent-repair`
Module: M08 · `T22E-CODE01`
Current status: **independent-audit repaired candidate awaiting full repair-head validation and bounded follow-up**
Stop boundary: **M09 remains closed**

## Baseline and reason for reopening

Published baseline reviewed: `4e8755b0d0060390b18ccba846d0d7f5e6750328`.

The prior builder suite was green, but independent hostile content review found material semantic defects. This is exactly why the module is reopened rather than frozen. The authoritative finding set is `M08-INDEPENDENT-REVIEW.md`; the bounded implementation response is `M08-RESOLUTION.md`.

Material findings are identified as **M08-R01 through M08-R10**:

- fixed Main contamination by solved lesson instances;
- lexical separation falsely standing in for semantic separation;
- a stray S06 M02 prerequisite attribution;
- hidden standard-library import/name-binding prerequisites;
- un-taught function-object/callable passing in S07;
- programming ownership inferred from numeric results instead of observed actions;
- S14–S16 drifting toward M04 replay;
- incomplete float-comparison policy;
- missing `zip(..., strict=True)`;
- traceback competence advertised without reading a real traceback.

## Boundary after repair

Canonical prerequisites remain exactly:

- M01 · `T22E-FND01`
- M03 · `T22E-DISC01`
- M04 · `ARC048`

M07 is not an M08 prerequisite. S06 now correctly reuses M03-S20 functions-as-mappings rather than naming M02.

Downstream ownership remains unchanged: M21 scientific-computing/research engineering, M22–M24 deeper algorithms/performance, M27–M31 later statistics, M30 formal Monte Carlo diagnostics, M43–M46 market-data/backtest/temporal engineering.

## Repaired authored state

- 24 sessions retained after an explicit session-count reconsideration.
- 48 fixed assessments and 48 evaluator references.
- 120 ownership claims and 120 repaired semantic claim→task→rubric links.
- 23 changed public obligations carry `obligationVersion=2`; unchanged obligations remain version1.
- `assessmentSeparationAudit` now records explicit lesson-model/Main-model identities for all24 sessions plus curated forbidden lesson fragments.
- Historical contamination is preserved in `historicalLessonAnswerOverlap`; it is not erased.
- M08 authoring version: `m08-authoring-v2-independent-repair`.
- M08 instruction version: `m08-instruction-v2-independent-repair`.
- Semantic contract: `m08-semantic-contract-independent-r2-2026-09-24`.
- Stable evidence storage key remains `chrono_t22_elite_course_evidence_v1`.

## Capability repairs

### Fresh fixed assessments

S02, S13, S15, S21 and S22 now use fresh Main instances. S19 and S23 preserve their public obligations but use different lesson examples. The exact 322/0.322 S21 result is no longer exposed by instruction.

### Python prerequisites taught at first use

- S02: `import math` and explicit `rel_tol`/`abs_tol`, including near-zero absolute tolerance.
- S12: `from itertools import product`.
- S13: `from fractions import Fraction`.
- S19: `from random import Random`.

### Programming actions made observable

- S07 must pass and call a function object through `predicate(x)`.
- S08 must actually iterate/destructure records and grow the outer list.
- S09 must update keyed counts one observation at a time.
- S11 must actually use `enumerate(zip(..., strict=True))`.
- S18 must read a concrete traceback and localize the innermost failing line.
- S21 must independently run/construct the aggregation and produce the fixed documented output.
- S24 must state model/event/payoff before code.

### M04 mathematics converted into code oracles

S14 filters a conditioned universe in code; S15 enumerates exact independence through code; S16 encodes a payoff function and cross-checks atomwise/grouped exact expectation.

## Primary-source recheck

Current Python documentation was rechecked for:

- import/name-binding semantics;
- `math.isclose` relative/absolute tolerance and comparison near zero;
- `zip(..., strict=True)` equal-length validation;
- traceback format/exception localization;
- Random reproducibility/state scope.

The existing Fraction/product/assert/aliasing sources remain authoritative. Source IDs are pinned in the authoring ledger.

## Verification architecture after repair

`scripts/test-t22-elite-m08.mjs` now checks:

- repaired status/version and canonical prerequisites;
- no stray M02 session prerequisite;
- 24/48/120 structure;
- v1/v2 obligation-version correctness;
- exact semantic-contract mappings;
- explicit lesson-model/Main-model distinction for every session;
- curated answer-exposure guards;
- mutation canaries for semantic mappings and assessment leakage;
- source pins and hard M09 stop.

`docs/t22-course/audit/m08-independent-oracles.mjs` was rebuilt around repaired tasks: tolerance behavior, callable predicates, container iteration/counting, strict zip failure, exact finite filters/independence/expectation, traceback/runtime validation, documented `Random(2026)` 322-hit path, three-value state replay and final synthesis.

## Validation state

The repair branch must obtain a complete green T22 Elite workflow including real Chromium/browser evidence before this handoff can claim implementation validation. Until that run is recorded here, status remains **repaired candidate, validation pending**.

## Bounded follow-up targets

The follow-up reviewer should attack, not merely rerun:

1. whether any fixed Main is still mathematically/programmatically solved by its lesson or an earlier session;
2. whether the new 120 evidence mappings really observe the claimed programming action;
3. whether imports/callables/strict zip/traceback instruction are sufficient for a novice;
4. whether S14–S16 now earn their place as programming sessions rather than M04 repetition;
5. whether S02's tolerance language avoids both blind equality and blind `isclose`;
6. whether S19–S24 remain within Python's documented reproducibility scope;
7. actual browser/evidence-version behavior for v2 obligations;
8. whether 24 sessions remains the natural granularity after all repairs.

No M09 authoring is authorized by this handoff.
