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
- 29 changed public obligations are versioned to 2.
- Semantic contract was rebuilt from the repaired public tasks/rubric rows.
- Executable Python oracle now exercises the repaired tasks, including explicit tolerances, callable predicates, dict accumulation, strict zip, traceback/runtime validation and multi-value RNG-state replay.
- M09 remains closed.

## Repair-head validation

The earlier repair content head `772e5dc12bcd44340bbf1d96a093d1b802c10699` passed the complete dedicated and repository-wide suites, but the bounded follow-up above intentionally reopened the content. That green head is now historical evidence rather than current validation authority. Final follow-up repair-head validation is pending.

## Bounded follow-up findings

After the first fully green repair head, a fresh novice-path pass found four additional hidden-syntax/import-contract defects:

- **M08-F01:** S12 taught `from itertools import product` but Main still named `itertools.product`; from-import binds `product`, not `itertools`. Main now uses the taught binding and is obligationVersion2.
- **M08-F02:** S22 Main quietly used list comprehensions never taught in M08. It now uses previously taught loops plus list append and is obligationVersion3.
- **M08-F03:** S07 lesson used a conditional expression and S14 lesson a list comprehension without teaching either syntax. Both were rewritten using already-owned `if`/loop/list operations.
- **M08-F04:** S17 reference used `lambda` even though named functions were already taught. The reference now uses a named `is_even` helper.

These findings did not justify extra sessions: they were local syntax-contract defects inside existing capability owners.
- **M08-F05:** several code-looking snippets used invalid compressed Python such as `statement; for ...`, `statement; while ...`, or `statement; def ...`. Compound statements cannot be introduced that way. All learner-facing cases were rewritten as valid multiline Python. Public fixed prompts changed by this repair were versioned instead of silently reusing prior evidence.

