# M08 Review Handoff — Independently Accepted / Frozen

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: M08 · `T22E-CODE01` — Quant Programming & Simulation Foundations  
Current status: **INDEPENDENTLY ACCEPTED / FROZEN after bounded follow-up**  
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

1. Names, values & assignment as state change
2. Integer division, quotient/remainder & exact reconstruction
3. Floating-point representation & tolerance-aware comparison
4. Boolean conditions & boundary-safe branching
5. For loops, range & accumulator invariants
6. While loops, state updates & termination
7. Functions as explicit quantitative mappings
8. Decompose a checker into single-purpose functions
9. Lists & tuples as finite ordered records
10. Sets & dictionaries for membership and counts
11. Mutation, aliasing & defensive copying
12. Pairing data safely with zip and enumerate
13. Exact Cartesian enumeration as a mathematical oracle
14. Exact rational probabilities with Fraction
15. Conditional probability by filtering the universe
16. Independence checks by exact enumeration
17. Exact expectation from enumerated payoffs
18. Assertions, invariants & known-case tests
19. Exceptions, tracebacks & smallest failing cases
20. Explicit pseudorandom generators & reproducibility
21. Implement one finite random trial from a stated model
22. Repeated simulation & empirical frequency
23. Checkpoint and restore random-generator state
24. Adversarial simulator audit against an exact oracle
25. M08 synthesis — exact oracle, reproducible simulation & audit

Sizing authority: `M08-SESSION-SIZING-AUDIT.md`. Existing stable IDs are preserved; only visible order after old S02 shifts by one.

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

## Verified 25-session sizing checkpoint

The exact 25-session route passed the complete T22 Elite workflow at commit `44b78d327c78fcc7ddf02fe56d1b293901637ee9`, Actions run `35967257130`, job `107528549359`. Syntax, structural/pedagogy/semantic/evidence checks, Python oracles, Chromium installation and the eight-module browser workflow all succeeded.

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


## Session-sizing addendum

`M08-SESSION-SIZING-AUDIT.md` is the authority for the **25 sessions; add one, merge none** decision. Existing stable IDs from old S03 onward were intentionally retained; visible order alone shifts by one, avoiding unnecessary evidence-identity churn. The new floating-point session uses stable ID `T22V3::T22E-CODE01::S02F@1`.


## Final bounded follow-up acceptance — 2026-09-24

The post-sizing follow-up found concrete defects rather than rubber-stamping the published candidate. Those bounded repairs are recorded in `M08-INDEPENDENT-FOLLOWUP.md` and `M08-RESOLUTION.md`.

Validated repair head: `f048a93b8cf0fff8bcd915437b8ba2ec8bacefd5`  
T22 Elite Actions run: `35970605448`  
Job: `107539182656`  
Result: **SUCCESS**

The inspected run completed syntax, structural/pedagogy/semantic/evidence regressions, M08 executable Python oracles, the M08-specific stale-fingerprint/stable-ID provenance regression, Chromium installation and the real eight-module browser evidence workflow.

Final disposition: **M08 INDEPENDENTLY ACCEPTED / FROZEN.**  
M09 remains **CLOSED**.  
No accepted M01–M06 content, M07 state, T25, SMMC or legacy evidence namespace was changed by this follow-up.

The accepted/frozen state is on `codex/t22-pedagogical-rebuild`. The previously published `main` baseline `2f8bd161fc9b9a0163713ed0c7f4341879b47419` does not yet contain these bounded follow-up repairs; publication is a separate action.
