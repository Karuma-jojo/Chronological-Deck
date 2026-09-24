# SMMC primary-domain reconciliation — 2017–2025

Status: **CLOSED 2026-09-24 — PRIMARY TAGS RECONCILED; SIX-DOMAIN TAXONOMY FROZEN**

## Scope

The complete ledger contains 88 official problems: 72 East-core A/B and 16 supplementary C. The six primary domains remain S1 Algebra + Linear Algebra, S2 Combinatorics + Discrete Mathematics, S3 Analysis + Calculus, S4 Number Theory, S5 Geometry and S6 Probability.

This pass changes only the lossy `primaryDomain` field on eight hybrid problems. Stable IDs, synopses, secondary tags, method tags, T25 mappings, overlap labels, bridge needs and assessment roles remain unchanged.

## Tie-break

Primary domain answers:

> **What body of mathematical structure would most naturally own the problem if it appeared in an undergraduate problem-solving course?**

Use, in order:

1. the structure whose definitions make the statement meaningful;
2. the structure carrying the decisive obstruction/construction in the shortest official route;
3. the structure requiring the largest prerequisite bridge for a prepared T25 learner.

Do not classify by the final algebraic line, the most advanced optional theorem, visual surface alone or aggregate-count pressure. Secondary and method tags retain the other structure.

## Before reconciliation

| Domain | Ledger all 88 | Ledger East 72 | Independent benchmark all | Benchmark East |
| --- | ---: | ---: | ---: | ---: |
| S1 | 22 | 18 | 22 | 17 |
| S2 | 16 | 14 | 17 | 16 |
| S3 | 20 | 16 | 14 | 12 |
| S4 | 9 | 8 | 12 | 10 |
| S5 | 12 | 10 | 14 | 11 |
| S6 | 9 | 6 | 9 | 6 |

The disputed queue was reviewed against the written tie-break, the existing year audits and the official Simon Marais solution material for the affected years. The moves below were selected problem-by-problem; matching the benchmark is corroboration, not the selection rule.

## Eight reconciled labels

- **SMMC-2017-A3: S1 → S4.** Divisibility and square-free prime-factor structure supply the decisive obstruction; matrix mechanics are the representation.
- **SMMC-2020-B2: S3 → S2.** The shortest route is induction plus finite pigeonhole/order reduction on unit-fraction denominators, not analytic convergence.
- **SMMC-2020-B3: S3 → S5.** The statement and construction are planar pursuit with Euclidean position, speed and capture; continuity/integration justify the geometric control strategy.
- **SMMC-2023-A2: S3 → S2.** Convexity characterizes admissible maxima, but the requested result and decisive second half are finite structural enumeration over affine-line arrangements.
- **SMMC-2023-C3: S3 → S1.** The core is a sharp product-constrained inequality with AM-GM/equality structure; the limiting/integral step extracts the sharp constant.
- **SMMC-2024-A3: S3 → S4.** Integer quotient/remainder, floors and the division algorithm control the threshold indexed by integer pairs.
- **SMMC-2024-C3: S3 → S4.** Pascal parity modulo two and binary/no-carry self-similarity create the decisive growth law; series block comparison is downstream.
- **SMMC-2025-C1: S2 → S5.** The optimized object is Euclidean distance in the plane; parity/partition/induction construct optimal coordinate totals.

## Borderline Analysis rows deliberately retained

The pass also tried to falsify the move-set. In particular:

- **SMMC-2022-B1 stays S3:** a positive-real existence problem naturally owned by continuity/convexity/logarithmic or sign-change analysis.
- **SMMC-2023-A4 stays S3:** nonlinear recurrence boundedness uses derivative/critical-point analysis with invariant-range/growth arguments.
- **SMMC-2024-B2 stays S3:** continuity and convergent-sequence behavior under repeated squaring are essential to the functional-equation classification.
- **SMMC-2025-C4 stays S3:** convex-envelope/epigraph structure is genuinely convex analytic.

The clear ODE, infinite-series, Riemann-integrability, inverse-function/FTC and real-limit rows likewise remain S3.

## Final frozen counts

| Domain | All 88 | East 72 |
| --- | ---: | ---: |
| S1 | **22** | **17** |
| S2 | **17** | **16** |
| S3 | **14** | **12** |
| S4 | **12** | **10** |
| S5 | **14** | **11** |
| S6 | **9** | **6** |

These exactly reproduce the independent SMMC-2027 benchmark.

## Future-change rule

The research layer is frozen. A later primary-label change requires a named problem, new source evidence or a demonstrated tie-break inconsistency, an explicit old→new rationale, updated aggregate validation and preservation of richer metadata unless separately justified. Counts alone are never grounds for relabelling.

Executable guard: `scripts/validate-smmc-domain-reconciliation.mjs`.
