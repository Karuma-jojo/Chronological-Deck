# M08 Independent Review Resolution

Date: 2026-09-24
Branch: `codex/t22-m08-independent-repair`
Module: M08 / `T22E-CODE01`
Status: **independent-audit repaired candidate; bounded follow-up still required**

## Resolution map

- **M08-R01:** Fresh lesson/Main instances established. Public tasks changed where needed and carry `obligationVersion=2`; lesson-only repairs preserve task versions. Historical contamination is retained in `historicalLessonAnswerOverlap` rather than erased.
- **M08-R02:** Added `assessmentSeparationAudit` with explicit lesson-model/Main-model keys, curated forbidden lesson fragments, and mutation canaries. CI now fails if the known answer-exposure patterns return.
- **M08-R03:** S06 prerequisite corrected from M02 to M03-S20 functions-as-mappings, matching the canonical M01+M03+M04 module boundary.
- **M08-R04:** Imports/name binding are taught before first use: `import math` (S02), `from itertools import product` (S12), `from fractions import Fraction` (S13), `from random import Random` (S19).
- **M08-R05:** S07 explicitly teaches function objects, passing a callable without parentheses and invoking `predicate(x)`; Main must actually implement the callable-consuming loop.
- **M08-R06:** S08/S09/S11/S18/S21/S24 prompts and rubrics now require the owned action itself: iteration/destructuring, keyed updates, strict paired iteration/enumerate, traceback localization/minimal failure, hit accumulation, and pre-code model/event/payoff specification.
- **M08-R07:** S14–S16 are now coding-oracle sessions: filter the conditioned universe, enumerate an independence criterion, and encode a payoff function before exact expectation.
- **M08-R08:** S03 uses exact integer state changes for `==0`; S02 now teaches explicit `rel_tol`/`abs_tol` policy and the special importance of positive absolute tolerance near zero.
- **M08-R09:** S11 teaches and assesses `zip(..., strict=True)`, while retaining explicit length validation as an alternative.
- **M08-R10:** S18 Main now contains a real traceback and scores exception type, innermost failing line, violated precondition and explicit repair.

## Session-count decision

M08 remains at **24 sessions** after repair, not because 24 is a target. The missing pieces were local prerequisites that belong at first use, and the M04-overlap cluster was strengthened rather than expanded. No capability currently justifies a separate extra session without creating unnecessary fragmentation.

## Verification architecture after repair

- 24 sessions / 48 fixed tasks / 120 ownership claims remain.
- 23 changed public obligations are versioned to 2.
- Semantic contract was rebuilt from the repaired public tasks/rubric rows.
- Executable Python oracle now exercises the repaired tasks, including explicit tolerances, callable predicates, dict accumulation, strict zip, traceback/runtime validation and multi-value RNG-state replay.
- M09 remains closed.

## Repair-head validation

Repair content head `772e5dc12bcd44340bbf1d96a093d1b802c10699` passed dedicated T22 Elite run `35961691590` / job `107511449788`, including the rebuilt semantic/evidence suite, executable Python oracle, Chromium and real eight-module browser workflow. The full main-targeted PR matrix on that same head finished **37/37 green with zero failures**. This closes implementation validation, not independent pedagogical freeze.
