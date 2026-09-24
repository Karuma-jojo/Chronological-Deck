# M08 Review Handoff — Independent Repair Candidate

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: M08 · `T22E-CODE01` — Quant Programming & Simulation Foundations  
Current status: **independent-review repaired and fully green; bounded follow-up pending**  
Stop boundary: **M09 remains closed**

## Why this handoff changed

The first builder candidate passed its structural/oracle/browser gates, but a severe independent review found genuine semantic weaknesses that those gates did not detect. The review is preserved in `M08-INDEPENDENT-REVIEW.md`; repairs are enumerated in `M08-RESOLUTION.md`.

The important lesson is procedural: a lexical lesson/task separation check was not sufficient to establish semantic assessment independence. Several Mains were mathematically identical or too close to worked examples despite passing the old guard.

## Independent findings repaired

- **M08-R01 BLOCKER:** S02, S13, S15, S21, S22, S23 fixed Mains were pre-solved in substance; S19 was partially contaminated.
- **M08-R02 HIGH:** separation checker was lexical rather than semantic.
- **M08-R03 HIGH:** S06 named M02 even though the canonical module boundary is M01+M03+M04.
- **M08-R04 HIGH:** several ownership claims scored consequences rather than observable programming actions.
- **M08-R05 HIGH:** imports/namespaces, callable-as-data and real traceback reading were hidden prerequisite gaps.
- **M08-R06 MEDIUM:** S14-S16 could regress into math-only M04 exercises.
- **M08-R07 MEDIUM:** float comparison policy under-taught tolerance choice and near-zero `abs_tol`.
- **M08-R08 MEDIUM:** S11 omitted `zip(..., strict=True)` for required equal-length alignment.

## Repaired session route

The 24-session spine remains because the missing foundations fit naturally inside existing ownership boundaries; the number 24 is not treated as a target.

1. Names, values & assignment as state change
2. Integer division, remainders & floating-point comparison — now teaches `import math`, explicit tolerance policy and near-zero `abs_tol`
3. Boolean conditions & boundary-safe branching — now distinguishes exact classification from computed-float near-zero policy
4. For loops, range & accumulator invariants
5. While loops, state updates & termination
6. Functions as explicit quantitative mappings — prerequisite corrected to M03-S20
7. Decompose a checker into single-purpose functions — now teaches function objects/callable parameters explicitly
8. Lists & tuples as finite ordered records — Main requires an actual unpacking loop
9. Sets & dictionaries for membership and counts — Main requires dictionary updates from observations
10. Mutation, aliasing & defensive copying
11. Pairing data safely with zip and enumerate — now uses `strict=True` when equal lengths are required
12. Exact Cartesian enumeration as a mathematical oracle — explicit `itertools.product` import
13. Exact rational probabilities with Fraction — fresh Main and explicit Fraction import
14. Conditional probability by filtering the universe — executable filtering required
15. Independence checks by exact enumeration — fresh two-die executable Main
16. Exact expectation from enumerated payoffs — executable payoff mapping required
17. Assertions, invariants & known-case tests
18. Exceptions, tracebacks & smallest failing cases — actual traceback reading required
19. Explicit pseudorandom generators & reproducibility — fresh Main and explicit Random import
20. Implement one finite random trial from a stated model
21. Repeated simulation & empirical frequency — fresh prescribed run: seed31415, N1200, p=.4 → 492 hits / .41
22. Checkpoint and restore random-generator state — fresh three-draw suffix replay
23. Adversarial simulator audit against an exact oracle — fresh sum9 diagnostic, exact intended probability1/9
24. M08 synthesis — now requires explicit Model/Event/Payoff before code

## Assessment/provenance handling

Changed fixed assessments increment `obligationVersion` to 2 so old evidence cannot silently certify the repaired obligation. Stable IDs and the shared evidence store remain unchanged.

A new `assessmentIndependenceAudit` records worked-example and Main surfaces for the high-risk repaired sessions and pins forbidden regression strings. This is intentionally a regression witness, not a claim that string matching proves semantic independence.

The 120 claim→task→rubric mappings were regenerated after the repair. Programming-action claims now require observable actions rather than only numerical consequences.

## Primary-source verification

The existing official Python source ledger remains, with additional sources for:
- Python modules/import statements;
- errors/exceptions and traceback context;
- `zip(..., strict=True)`.

Current Python documentation supports:
- qualified imports / direct imports;
- strict zip raising `ValueError` on length mismatch;
- traceback context plus final exception type/message;
- the existing Fraction / Random / assert / float claims.

## Fresh executable oracles

`docs/t22-course/audit/m08-independent-oracles.mjs` was rebuilt around the repaired public surfaces. It now checks, among other things:
- 29//6 / remainder / explicit isclose policy;
- callable predicate passing;
- tuple iteration and dictionary accumulation;
- strict zip triples and weighted sum61;
- exact 3/4 Fraction event;
- two-die independence 1/2,1/2,1/4;
- explicit invalid-total ValueError;
- fresh Random(41) state divergence;
- seed31415/N1200/p=.4 → 492 / .41;
- fresh state suffix replay;
- reused-draw sum9 bug versus exact1/9;
- synthesis P(sum8)=5/36 and EV=-11/18.

## Verified post-repair checkpoint

The repaired tree passed the complete T22 Elite workflow on commit `42c112a45ea177f8dad5ea3c6c16ab9d041db0f1`, Actions run `35965698526`. Syntax, structural/pedagogy/semantic/evidence checks, the rebuilt Python 3.12 oracle, Chromium installation and the eight-module browser evidence workflow all succeeded. A later documentation-only supersession note does not change the repaired curriculum semantics.

## Required bounded follow-up

Do **not** merely rerun CI. Independently attack:

1. all repaired Mains for semantic independence from their lessons and earlier sessions;
2. whether S01-S13 now contain enough Python syntax/namespace knowledge for a true novice;
3. every new claim→rubric mapping for observability;
4. whether S14-S16 now genuinely assess programming as well as previously taught math;
5. S02 tolerance wording against current Python docs and numerical-analysis common sense;
6. S11 strict zip behavior;
7. S18 traceback interpretation;
8. S19-S23 RNG/state claims and fresh oracle values;
9. answer-exposure/evidence migration after obligationVersion2 changes;
10. real eight-module browser save/reveal/review/export/import behavior on the repaired head.

## Acceptance rule

M08 must not be called accepted/frozen until:
- complete T22 Elite structural/semantic/evidence checks pass;
- the repaired Python oracle passes;
- Chromium/eight-module browser checks pass;
- a bounded independent follow-up finds no remaining material defect.

M09 remains closed.
