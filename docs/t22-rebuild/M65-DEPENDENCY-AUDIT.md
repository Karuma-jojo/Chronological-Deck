# T22 Elite M65 — Dependency Audit & Freeze Record

Status: **macro skeleton dependency-audited and frozen for M01 authoring**

This audit applies to `M65-SKELETON.md` and `m65.dependencies.json`. It freezes macro ownership/order, not the eventual internal atomic-session counts.

## Audit result

- 65 unique macro modules.
- Every declared prerequisite resolves to one of the 65 modules.
- Every prerequisite occurs earlier than the module that consumes it.
- Therefore the declared chronology is a valid topological order of the explicit dependency graph.
- M01 has no hidden module prerequisite.
- School-level numeracy/algebra/functions/reasoning are no longer admission assumptions: M01-M03 own them.
- Finite uncertainty appears by M04 and a genuine trading-decision family by M05.
- Code first appears only after arithmetic/discrete/probability foundations (M08), then matures into research engineering at M21.
- Temporal validation is an explicit gate (M43) before market-data reconstruction (M45), dirty-data research (M46) and the final capstone.
- Market mechanics (M07) precede market data, microstructure, asset pricing and execution.
- The final capstone (M65) depends on inference, validation, provenance, time series, temporal validity, dirty-data discipline, portfolio context, execution and statistical learning.

## Important dependency decisions

1. **M02 and M03 are not forced into a single chain.** Both consume M01. M03 appears after M02 pedagogically, but its discrete/proof ownership does not pretend to require all of precalculus.
2. **M04 probability requires M03**, making counting/sets/reasoning explicit rather than hidden.
3. **M05 trading games requires M04**, but **M07 market mechanics is conceptually light** and does not require calculus or statistics.
4. **M08 simulation requires M04 and M03**, preventing code from becoming a substitute for the finite mathematics it is meant to check.
5. **M21 scientific computing follows the linear-algebra engine**, so array shapes/vectorization can be connected to real mathematical objects.
6. **M26 random variables waits until integration exists**, so continuous distributions need no hidden calculus bridge.
7. **M43 temporal research design requires both generic validation (M39) and time-series structure (M42)** plus market vocabulary and research-engineering discipline.
8. **M47 microstructure precedes M56 execution**; knowing how the market behaves is distinct from choosing how to trade through it.
9. **M49 precedes M50** so Brownian/continuous-time extensions can reuse discrete stochastic-process/martingale intuition without making them mandatory earlier.
10. **M57 numerical optimization consumes matrix calculus, numerical linear algebra, constrained optimization and research engineering**; it is no longer smuggled into a lighter prerequisite chain.
11. **M59 deterministic DP precedes M60 MDP**, preserving the recursion/value-function prerequisite.
12. **M64 neural networks consumes statistical learning, matrix calculus and stochastic-gradient machinery** rather than teaching those prerequisites implicitly.

## Freeze rule

From this checkpoint onward, a new macro module requires written evidence that no existing module can own the capability without corrupting that module's exit standard. Normal discoveries should become one of:

- an atomic session inside the owning module;
- a just-in-time prerequisite bridge;
- a project/lab;
- a delayed transfer/review task;
- optional specialization depth.

The module number is presentation only. Stable IDs, not positions, own evidence identity.
