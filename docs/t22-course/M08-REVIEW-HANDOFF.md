# M08 Review Handoff — Quant Programming & Simulation Foundations

Date: 2026-09-24
Repository: `Karuma-jojo/Chronological-Deck`
Branch: `codex/t22-pedagogical-rebuild`
Module: M08 · `T22E-CODE01`
Builder status: **builder-validated candidate awaiting independent review**
Stop boundary: **M09 CLOSED**

## Recovery anchor

The first complete green M08 implementation checkpoint is:

- implementation SHA: `c261410fb40809dc44cddb9dccf50e612ae0f1be`
- T22 Elite Actions run: `35956181744`
- job: `107494885143`
- result: **SUCCESS**
- run URL: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35956181744

The job was inspected, not inferred from workflow existence. Syntax, structural/pedagogy/semantic/evidence regressions, Python 3.12 executable oracles, Chromium installation and the real eight-module browser evidence workflow all completed successfully.

## Recovered boundary and prerequisite decision

Canonical dependency graph: M08 depends on:

- M01 · `T22E-FND01`
- M03 · `T22E-DISC01`
- M04 · `ARC048`

M07 is not a prerequisite. M01–M06 remain accepted/frozen. M07 remains an independently reviewed/repaired candidate with its separate bounded follow-up status; this M08 build does not silently accept or modify M07 teaching content.

M08 owns core Python execution semantics, finite control flow, functions/decomposition, core containers and state, exact finite enumeration, exact rational checking, elementary debugging/invariants, explicit pseudorandom-generator state, and small reproducible simulations checked against exact mathematics.

Deferred owners are preserved:

- M21: NumPy/pandas/vectorization/plotting and broader research-computing engineering;
- M22–M24: deeper algorithms/performance;
- M27–M31: inference, LLN/CLT and later statistics;
- M30: formal Monte Carlo convergence/error diagnostics;
- M43–M46: market-data/backtesting/temporal research engineering.

## Built state

- 24 sessions.
- 48 fixed assessments: one Main + one Transfer per session.
- 48 evaluator references.
- 240 rubric rows; every assessment totals 10 points.
- 120 ownership claims.
- 120/120 builder-reviewed claim → public task → exact rubric-evidence links.
- 24/24 semantic instruction/task separation records.
- all fixed tasks begin at `obligationVersion=1`; M08 was unpublished before this build.
- stable shared evidence key retained: `chrono_t22_elite_course_evidence_v1`.
- runtime metadata exposes M08 as `validation`, not independently accepted/frozen.

Primary authoring source: `course/t22/authoring/m08.json`.

## Session route

1. Names, values & assignment as state change
2. Integer division, remainders & floating-point comparison
3. Boolean conditions & boundary-safe branching
4. For loops, range & accumulator invariants
5. While loops, state updates & termination
6. Functions as explicit quantitative mappings
7. Decompose a checker into single-purpose functions
8. Lists & tuples as finite ordered records
9. Sets & dictionaries for membership and counts
10. Mutation, aliasing & defensive copying
11. Pairing data safely with zip and enumerate
12. Exact Cartesian enumeration as a mathematical oracle
13. Exact rational probabilities with Fraction
14. Conditional probability by filtering the universe
15. Independence checks by exact enumeration
16. Exact expectation from enumerated payoffs
17. Assertions, invariants & known-case tests
18. Exceptions, tracebacks & smallest failing cases
19. Explicit pseudorandom generators & reproducibility
20. Implement one finite random trial from a stated model
21. Repeated simulation & empirical frequency
22. Checkpoint and restore random-generator state
23. Adversarial simulator audit against an exact oracle
24. M08 synthesis — exact oracle, reproducible simulation & audit

The representative pilot was S12. Its Main exactly enumerates two fair six-sided dice and derives P(sum=8)=5/36. Its Transfer changes the surface and attacks a strict-versus-nonstrict event bug, producing 2/3 under the intended predicate versus 1/3 under the buggy predicate.

## Research provenance

Primary technical claims were checked against official Python documentation on 2026-09-24 and recorded in the authoring pack source ledger:

- control flow / `range` / functions;
- lists, tuples, sets, dictionaries and looping;
- binary floating point and `math.isclose`;
- `fractions.Fraction`;
- `itertools.product`;
- `random.Random`, seeding, `getstate`/`setstate`, reproducibility limits;
- `assert` semantics and optimization;
- aliasing/mutable-object behavior.

The builder deliberately avoids a stronger reproducibility claim than Python documents: the recorded deterministic oracle pins the `random()` call path used by S21, while helper algorithms such as `randrange` are not presented as an eternal cross-version fixed-output contract.

## Adversarial findings repaired during build

### M08-B01 — scoring asked for an unrequested S17 boundary discriminator

S17 ownership required a comparison-boundary test, but the first Main draft did not publicly ask for one.

Repair: Main now explicitly asks for a boundary input distinguishing `x>=5` from `x>5`; the evaluator gives that request its own row.

Replay result: a learner who supplies only a generic invariant cannot earn the boundary-discrimination credit.

### M08-B02 — S18 taught broad exception suppression risk without observing it

The lesson correctly warned against hiding exceptions, but the first Transfer did not ask the learner to apply that judgment.

Repair: Transfer now asks why `try/except Exception: pass` is an unacceptable repair; its rubric scores the explanation.

Replay result: merely naming `IndexError` cannot earn the suppression-diagnosis credit.

### M08-B03 — S10 ownership was broader than its public evidence

The first ownership wording mixed rebinding/mutation distinctions with alias-versus-copy behavior.

Repair: ownership narrowed to the observable capability: distinguish shared aliasing from an independent copied container.

### M08-B04 — four separation witnesses were too generic

The first automated separation witnesses in S04, S13, S19 and S20 selected generic code tokens also present in instruction. CI correctly rejected S04.

Repair: all four were replaced with task-instance-specific fragments. A complete rescan found zero witness fragments in their lessons, and the repaired implementation head passed the full workflow.

## High-risk misconception discriminators

Review these especially rather than sampling easy arithmetic:

- S03: an earlier `x>=0` makes a later `x==0` branch unreachable.
- S04: half-open `range` creates an off-by-one omission.
- S05: equality-only stopping can be nonterminating when the update jumps over the target.
- S09: set conversion destroys multiplicity and can create an impossible frequency 1.5.
- S10: `[[0,0]]*3` repeats references to one inner mutable list.
- S11: default `zip` silently truncates a misaligned pair of sequences.
- S12: `>` versus `>=` changes the exact finite event.
- S13: `Fraction(0.1)` preserves the supplied binary float rather than recovering decimal intent.
- S14: dividing conditional hits by the original 36 outcomes computes a joint probability, not the conditional.
- S15: “different properties” is not evidence of independence.
- S16: averaging distinct payoff values discards probability multiplicity.
- S17: `assert` is not the sole required runtime validation mechanism.
- S19: reseeding inside every trial restarts the generator.
- S20: `U>p` simulates the complement; larger N cannot repair the model.
- S22: a mid-run state snapshot replays the suffix; the original seed alone is not the same recovery point.
- S23: reusing one die draw collapses an intended 36-pair independent support to six diagonal pairs.
- S24: missing face 6, reused draw and `>=8` versus `==8` are three independent semantic defects that must be repaired before discussing sample size.

## Verification evidence

Persistent gates added:

- `scripts/test-t22-elite-m08.mjs`
  - 24/48/120 structure;
  - rubric totals;
  - prerequisite/boundary pins;
  - source-ledger pins;
  - instruction/task separation;
  - exact semantic-contract matching;
  - mutation tests proving wrong-but-existing semantic evidence is rejected;
  - hard M09 stop.

- `docs/t22-course/audit/m08-independent-oracles.mjs`
  - launches Python 3.12 in CI;
  - re-executes representative programming semantics and mathematical oracles;
  - confirms exact product/Fraction/conditioning/independence/expectation calculations;
  - confirms S21's documented `Random(2026)` / 1000 successive-`random()` run gives 322 hits;
  - confirms `getstate`/`setstate` suffix replay;
  - confirms synthesis P(sum=8)=5/36 and EV=-11/18.

- `scripts/test-t22-elite-course-browser.mjs`
  - eight-module module/session loading;
  - M08 save → reveal → review;
  - shared evidence preservation;
  - eight-module export/import;
  - answer-bearing packet exposure through M08;
  - corrupt-storage preservation;
  - mobile-width regression.

Implementation-head log excerpts include:

- `PASS M08 structural/pedagogy: 24 sessions, 48 tasks, 120 reviewed semantic links...`
- `PASS M08 independent executable oracles...`
- `PASS browser: M01+...+M08 ... eight-module export/import; packet exposure through M08...`

## Independent review targets

Do not merely rerun structural checks. Independently attack at least:

1. whether S01–S11 teach enough Python for a novice to solve S12 without hidden syntax knowledge;
2. whether exact enumeration before simulation creates the intended mathematical anchor without overloading the learner;
3. every S12–S16 exact probability/expectation reference from public givens;
4. all S19–S24 RNG claims against current Python documentation and the exact wording of the public tasks;
5. whether the 120 semantic links truly observe their ownership claims rather than only sharing vocabulary;
6. whether any Main/Transfer is answer-exposed by its lesson or an earlier session in mathematical substance;
7. whether S21's fixed 322-hit reproducibility example is appropriately scoped to the documented `random()` path rather than overclaimed;
8. whether M08 accidentally imports M21/M30 machinery;
9. real browser evidence/provenance behavior on the actual branch head.

## Remaining limitations

- Builder self-review is not independent acceptance.
- No real learner trial is claimed.
- Correctness of representative executable oracles does not prove every possible learner implementation.
- The fixed rubric cannot enumerate every valid equivalent Python formulation; marking explicitly accepts equivalent correct Python or precise pseudocode where behavior is unambiguous.
- Long-term retention is not established by this build.

## Review status / next action

**M08 is a builder-validated candidate awaiting independent review.**

M09 remains closed. Do not author M09, merge, deploy, modify T25 or migrate legacy progress under this handoff.
