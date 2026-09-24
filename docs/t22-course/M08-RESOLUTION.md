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
