# M08 Boundary & Research Ledger — T22E-CODE01

Date: 2026-09-24
Mode: INDEPENDENT REPAIR
Status: boundary preserved; independent-audit repaired content candidate awaiting bounded follow-up
Stop boundary: M08 only. M09 remains closed.

## Gate 0 recovery receipt

- Repository: `Karuma-jojo/Chronological-Deck`
- Repair branch: `codex/t22-m08-independent-repair`
- Accepted/frozen frontier recovered from the live branch: M01–M06.
- M07 is present as `authored-astra-repaired-awaiting-independent-followup`; its verified implementation checkpoint remains `a0f76357f5e36de6e77799e2a30707c950ce1060`.
- The canonical dependency graph gives M08 prerequisites `T22E-FND01`, `T22E-DISC01`, `ARC048`. M07 is not an M08 prerequisite.
- Canonical M08 title: **Quant Programming & Simulation Foundations**.
- Canonical M08 scope from the 65-module skeleton: Python primitives, control flow, functions, decomposition, core containers, exact enumeration, explicit random-generator state, reproducible small simulations and code as a checker of mathematics.
- M21 remains the owner of NumPy/pandas/vectorization/plotting and broader scientific-computing/research-engineering craft.
- M30 remains the owner of Monte Carlo diagnostics/convergence/error methodology.
- Existing T22 evidence key is preserved: `chrono_t22_elite_course_evidence_v1`.
- No merge, deploy, T25 change or legacy-progress migration is authorized.

## Gate 1 capability boundary

### Destination

A learner completing M08 should be able to turn already-known finite mathematics into small auditable Python programs: trace state, control branches and loops, decompose functions, choose core containers, enumerate small finite models exactly, use exact rationals where appropriate, diagnose common state/boundary bugs, and run reproducible small simulations with explicit generator state while keeping simulation distinct from proof.

### Entry capabilities actually reused

| Required capability | Earlier owner |
| --- | --- |
| Signed arithmetic, ratios, equations and numeric manipulation | M01 |
| Logical conditions, counterexamples, sets, Cartesian products and finite counting | M03 |
| Finite probability, conditioning, independence and finite expectation | M04 |

The build does **not** require M07 market mechanics. Examples therefore remain probability/numeracy-first rather than silently importing market vocabulary.

### New objects introduced here

Python expression/assignment semantics; booleans and branches; `range`; `for`/`while`; function parameters/returns; functions as passable callable objects; list/tuple/set/dict behavior; aliasing; `zip`/`enumerate` with strict equal-length pairing; standard-library import/name binding at first use; `Fraction`; `itertools.product`; development assertions; traceback reading and basic exception diagnosis; `random.Random`; generator state; `getstate`/`setstate`; empirical frequency.

### Deferred

NumPy/pandas/vectorization/plotting/testing frameworks/Git/project layout → M21; algorithmic/performance depth → M22–M24; inference/LLN/CLT → M27–M31; formal Monte Carlo diagnostics → M30; market-data/backtesting/temporal research engineering → M43–M46.

## Gate 2 research ledger

Research questions were written before source lookup. Search snippets were not treated as verification; the relevant official documentation was opened/read and the content was then encoded in the authoring source ledger.

| ID | Exact question | Primary source | Supported use in M08 | Limit |
| --- | --- | --- | --- | --- |
| PY-CF | What are the core semantics of branching, looping, half-open `range` and function definitions? | Python Tutorial — More Control Flow Tools | S03–S07 | Documentation establishes semantics, not pedagogy. |
| PY-DS | What are the relevant list/tuple/set/dict and paired-loop semantics? | Python Tutorial — Data Structures | S08–S11 | Container choice remains task-dependent. |
| PY-FLOAT | How should introductory quantitative code treat decimal binary floats? | Python Tutorial — Floating-Point Arithmetic | S02 | Binary decimal approximations must not be mistaken for exact decimal values. |
| PY-MATH | How is closeness defined and what happens near zero? | Python Library — `math.isclose` | S02 | Relative/absolute tolerances are an explicit numerical contract; near zero a positive `abs_tol` may be required. |
| PY-IMPORT | How do `import` and `from ... import ...` bind standard-library names? | Python Language Reference — import statement | S02/S12/S13/S19 | Teach the binding step before first use; no package-management material is implied. |
| PY-FRAC | How can small finite probability oracles remain exact? | `fractions.Fraction` docs | S13–S16 | Avoid `Fraction(float)` when the intended rational is the decimal text. |
| PY-ITER | What is the standard-library Cartesian enumerator? | `itertools.product` docs | S12 onward | Only small finite spaces are in scope. |
| PY-ZIP | How should equal-length paired data avoid silent truncation? | Python built-ins — `zip` | S11 | Use `strict=True` when equal lengths are part of the contract, or perform an explicit precondition check. |
| PY-RNG | What does Python document about explicit PRNG objects, state and reproducibility? | `random` docs | S19–S24 | M08 does not treat helper algorithms such as `randrange` output sequences as a cross-version fixed-output contract. |
| PY-ASSERT | Can `assert` be used as essential runtime validation? | Python Language Reference — assert | S17 | No; optimization can remove assertions. |
| PY-FAQ | Why do aliases and repeated mutable references surprise learners? | Python Programming FAQ | S10 | Teach the object/reference consequence, not implementation trivia. |
| PY-TRACE | What information does a traceback expose for a novice debugger? | Python Tutorial — Errors and Exceptions / traceback format | S18 | Read the final exception type/message and localize the innermost failing source operation; advanced exception chaining is deferred. |

Primary URLs are stored directly in `course/t22/authoring/m08.json::sourceLedger` with checked date 2026-09-24.

## Progression decision

After the independent hostile audit, M08 **still uses 24 sessions**, but the count is no longer treated as a template target. Imports/name binding are taught at first use; callable-function semantics fit S07; real traceback reading fits S18; and S14–S16 were strengthened into executable mathematical-oracle sessions rather than expanded into redundant probability sessions.

M08 uses 24 sessions in four layers:

1. execution semantics and control flow (S01–S07);
2. containers, alignment and mutable state (S08–S11);
3. exact finite coding oracles (S12–S18);
4. explicit pseudorandom state, simulation and adversarial synthesis (S19–S24).

The original representative vertical-slice pilot was S12, **Exact Cartesian enumeration as a mathematical oracle**. Independent review later found lesson/Main contamination elsewhere, so the repaired pack adds a separate semantic assessment-separation contract for all 24 sessions. It was completed through teaching, Main, Transfer, independent exact solution, semantic claim links and answer-separation review before the remaining exact/simulation pattern was finalized. Its Transfer changes the event boundary from `>=` to the buggy `>`, forcing diagnosis rather than a number swap.

## Hard stop

M09 is not authored by this build.
