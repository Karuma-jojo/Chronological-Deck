# T22 rebuild recovery state

Date: 2026-09-18
State: **M65 DEPENDENCY-AUDITED / MACRO-FROZEN; DEDICATED T22 COURSE SCAFFOLD + M01 AUTHORED; STOP BEFORE M02**
Branch: `codex/t22-pedagogical-rebuild`
Repository: `Karuma-jojo/Chronological-Deck`
Historical Stage-A architecture checkpoint: `c7c66737b84b7951973c31d40c6895a3bdb9d94b`
Historical Stage-A handoff head: `f3632cd8a326c6acc3658d2c8eba234d5a2db363`
Current macro skeleton: `docs/t22-rebuild/M65-SKELETON.md`
Current machine-readable dependency graph: `docs/t22-rebuild/m65.dependencies.json`
Current dependency audit: `docs/t22-rebuild/M65-DEPENDENCY-AUDIT.md`
Dedicated learner surface: `t22-course.html`

## Current architecture decision

The old live T22 remains a 58-module / 596-atomic first-hire route and is not rewritten in place. The enhanced course uses a separate 65-module macro skeleton beginning around Class-10 mathematics and progressing toward quantitative trading/research, empirical projects and adversarial research defense.

The M65 macro order has now passed a bounded explicit dependency audit: 65 unique modules, every declared prerequisite resolves, and every declared prerequisite occurs earlier in the proposed order. Macro ownership/count is therefore frozen for M01 authoring. A future M66 requires a written argument that the capability cannot live inside an existing module without corrupting that module's exit standard.

## Dedicated course architecture

A separate `t22-course.html` learner surface now exists on this branch. It is intentionally separate from the historical Chrono-Deck T22 route/map surface.

Key rules:

- stable evidence identity is based on stable module/session/obligation IDs, not route position;
- M01 session IDs follow `T22V3::T22E-FND01::Sxx@1`;
- main/transfer obligations are separately versioned;
- saved attempts record the current session contract hash;
- if a future contract changes, old evidence is preserved but treated as stale for current independent-evidence summaries;
- learning-note use, reference exposure and assistance are recorded;
- the T22 Elite evidence key is `chrono_t22_elite_course_evidence_v1`, separate from historical T22 and T25 storage;
- study evidence never automatically grants legacy T22 atomic clearance.

## M01 authored — and only M01

`T22E-FND01` — **Quantitative Foundations I — Numeracy & Algebra**

17 bounded sessions:

1. signed numbers, order & operation structure;
2. fractions as numbers;
3. ratios, proportions & rates;
4. percentages & percentage points;
5. sequential percentage change & reverse percentages;
6. units, conversions & dimensional reasoning;
7. estimation, scale & numerical sanity checks;
8. powers, roots & scientific notation;
9. algebraic expressions, substitution & expansion;
10. factoring & algebraic identities;
11. linear equations & reversible transformations;
12. formulas, rearrangement & parameters;
13. simultaneous linear equations & constraint intersection;
14. inequalities & sign-aware algebra;
15. absolute value as distance;
16. quadratic equations as algebraic constraints;
17. integrated M01 quantitative-algebra synthesis.

Every session has a bounded capability contract, principal obstacle, entry prerequisites, five required-ownership claims, in/out-of-scope boundary, exit condition, learning note, main investigation, transfer investigation and evaluator rubric.

Total current M01 bank: **34 original main/transfer tasks**.

## Validation completed before repository write

Local deterministic validation passed:

- M65 graph: 65 unique modules, all prerequisite IDs resolve, all edges point backward in the declared topological order;
- M01: 17 contiguous sessions and 34 unique tasks/evaluators;
- every session has a stable versioned ID and recomputable SHA-256 contract hash;
- every evaluator rubric totals 10 points;
- representative numerical references were independently rechecked;
- JS syntax checks passed for the T22 course core and UI;
- static HTTP smoke test successfully served `t22-course.html` and loaded the M01 course JSON.

One cross-runtime contract-hash serialization mismatch was found during local validation and fixed before repository write.

## Historical Stage-A work retained

The earlier 56-core + 17-optional Stage-A route and its audit material remain useful historical evidence but are no longer the current macro-count decision. They remain in `docs/t22-rebuild/` and git history.

## Explicit non-actions / safety boundary

- No M02 atomic authoring.
- No historical T22 runtime-route replacement.
- No migration of `chrono_t22_atomic_progress_v2`.
- No T25 course/evidence modification.
- No cloud-schema migration.
- No merge to `main`.
- No deployment.

## Next action

**Stop at M01.** The next content action is a dedicated M01 audit/use pass: inspect the learner surface, challenge session order/boundaries, independently solve a sample of main/transfer tasks, and repair M01 if needed. Only after M01 is accepted should M02 be opened.
