# M08 Independent Review Resolution — 2026-09-24

This file records repairs for M08-R01 through M08-R08.

## R01 — fresh assessment surfaces
Replaced contaminated/fatally similar Mains:
- S02: 29÷6 plus 0.2+0.2+0.2 vs 0.6 and explicit tolerance policy.
- S13: 3/8,1/4,3/8 exact rational model.
- S15: two-die even-first / odd-sum independence test.
- S19: Random(41), four matched draws plus two extra draws.
- S21: Random(31415), N=1200, p=.4; prescribed run 492/1200=.41.
- S22: Random(17), two-draw prefix plus replayed three-draw suffix.
- S23: reused-draw sum9 diagnostic, intended exact probability1/9.
All changed fixed tasks increment `obligationVersion` so previous evidence is stale.

## R02 — checker hardening
Added `assessmentIndependenceAudit` with explicit worked-surface/Main-surface witnesses and forbidden regression strings. The M08 test now checks these guards, repaired obligation versions and programming-observability pins. These are regression witnesses; human semantic review remains required.

## R03 — prerequisite correction
S06 now cites `M03-S20 functions as mappings`, consistent with the module-level M01+M03+M04 boundary. M02 is not silently introduced as a dependency.

## R04 — observable programming actions
- S08 Main requires an actual unpacking loop.
- S09 Main requires dictionary initialization/update from observations.
- S11 Main requires explicit strict paired iteration.
- S18 Main requires reading a supplied traceback.
- S21 Main requires explicit hit accumulation.
- S24 Main requires Model/Event/Payoff before code.

## R05 — novice bridges
Added explicit:
- `import math`
- `from itertools import product`
- `from fractions import Fraction`
- `from random import Random`
- function objects passed without parentheses vs calls with parentheses
- traceback type/source-line interpretation.

## R06 — executable probability oracles
S14-S16 now require code/pseudocode for filtering, exact independence enumeration and payoff mapping, rather than accepting math-only consequences.

## R07 — float discipline
S02 now distinguishes relative/absolute tolerance and near-zero `abs_tol`; S03 states that exact zero equality is a model decision, not a universal rule for computed floats.

## R08 — strict zip
S11 now uses `zip(..., strict=True)` when equal-length alignment is required and teaches the resulting `ValueError` on mismatch.

## Verification contract
- Repaired claim evidence regenerated against the new public prompts/rubrics.
- Semantic contract regenerated.
- Independent Python oracle rebuilt on fresh surfaces.
- Complete T22 Elite CI + Chromium must pass before status can advance.
- M09 remains closed.


## Session-sizing follow-up

A sizing-only pass found one remaining structural load issue: former S02 mixed exact quotient/remainder arithmetic with binary floating-point comparison/tolerance policy. It is split into S02 exact integer division and new visible S03 floating-point comparison. No other session is merged or split. Existing stable IDs are preserved; the new floating session uses `T22V3::T22E-CODE01::S02F@1`.


## Bounded independent follow-up repair — 2026-09-24

The required post-sizing follow-up did **not** rubber-stamp the published tree. It re-read all 25 lessons, 50 fixed tasks/references/rubrics and all 125 ownership links, then attacked the previously repaired high-risk surfaces semantically.

### M08-F09-01 — HIGH — S13 ownership was not fully observable
The Main gave the exact event predicate and its total-count row did not require the claimed product-rule verification. Repair: the learner now writes the sum-to-8 Boolean predicate and explicitly cross-checks 36 as 6×6. S13-M advances to `obligationVersion=2`.

### M08-F09-02 — HIGH — S23 state actions were supplied rather than performed
The Main displayed the entire `getstate`/`setstate` trace while ownership claimed the learner could capture and restore state; its fifth link also pointed to a row unrelated to seed-vs-mid-run-state meaning. Repair: the learner now constructs the state checkpoint/replay code and explains what the snapshot carries beyond the initial seed. S23-M advances to `obligationVersion=3`.

### M08-F09-03 — HIGH — S24 semantic independence still failed
The lesson solved the same two-dice `b=a` dependence defect using sum7, while Main merely substituted sum9. The old lexical guard passed because strings differed. Repair: Main now returns the buggy pair and requires the learner to choose a diagnostic event **different from the lesson's sum-7 example**, derive both model probabilities, and repair the simulator. Sum9 remains only one evaluator/reference witness, not a supplied learner decision. S24-M advances to `obligationVersion=3`.

### M08-F09-04 — MEDIUM — several ownership contracts were stronger than their observers
Bounded wording/mapping repairs were made where evidence showed explanation/justification rather than independent construction, or where the linked row observed a nearby concept:
- S02 claim5: exact quotient/remainder reconstruction versus ordinary ratio;
- S03 claim4: state tolerances and explain roles; scale-justified near-zero choice remains claim5;
- S09 claims3–4: justify tuple/list choices, with tuple claim mapped to the Main justification row;
- S11 claim3: explain `.copy()` as an independent shallow list copy;
- S17 claim4: mapped to the finite-tests-do-not-prove-all-behavior row;
- S18 claim3: identify a minimal failing input/operation from traceback context;
- S21 claim4: output-result evidence added alongside seed/N metadata;
- S24 synthesis claim4: invariants + interpretation of oracle/simulation agreement, without claiming an estimate was actually produced.

These ownership-contract changes preserve stable session/problem IDs. They change session contract hashes where required; fixed-task obligation versions are bumped only for the three public Main changes above.

### Provenance
The shared evidence key remains `chrono_t22_elite_course_evidence_v1`. Stable IDs are retained, including `T22V3::T22E-CODE01::S02F@1`. Changed fixed tasks are versioned so prior evidence cannot silently certify stronger obligations; changed capability contracts change the session contract hash. No historical attempts are deleted.

### Next gate
Run the complete structural/semantic/oracle/Chromium workflow on the repair checkpoint, inspect the actual job steps, then perform one final bounded follow-up. M09 remains closed.
