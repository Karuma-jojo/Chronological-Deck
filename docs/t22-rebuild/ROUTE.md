# T22 v3 Stage A Prerequisite Route Proposal

Status: **proposal for Astra architecture review**. This is not the live `T22_ORDER` and does not change learner progress.

Audit base: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Machine-readable companion: `route.dependencies.json`

## Design target

Build one default itinerary that can take a learner with uncertain school mathematics toward defensible quantitative-trading and empirical-research capability without requiring every advanced specialization before the route becomes useful.

The route obeys six rules:

1. No university topic may rely on hidden school-math assumptions.
2. Real uncertainty/trading decisions appear early, not after the entire math stack.
3. Programming arrives in earned layers and supports derivation rather than replacing it.
4. Statistics/research validation precede end-to-end strategy claims.
5. Market data, microstructure and execution appear before the capstone.
6. Valuable but non-universal advanced material remains available as prerequisite-gated optional depth.

## Reconciliation with the current 58-node T22

The architecture audit found that the first proposal accidentally omitted `ARC211` and understated the scope of the current `ARC515` programming foundation. It also tried to keep the existing advanced `ARC586` numerical-optimization/autodiff module in the core under prerequisites weaker than its rich contract actually requires.

The repaired proposal has **56 core capabilities + 17 optional depth capabilities = 73 route nodes**.

- 57 of the current 58 T22 macro IDs remain explicit v3 nodes.
- `ARC515` is the one current macro intentionally replaced by four staged capabilities (`C00`–`C03`); its historical evidence is preserved, not reinterpreted.
- `ARC211` remains available as optional deterministic-DP depth and is again a prerequisite of optional `ARC590`.
- `ARC586` remains available unchanged in spirit as optional advanced numerical-optimization depth under `ARC582 + ARC585 + ARC711 + ARC514`, rather than being silently reused with missing prerequisites.

## Default route — 56 core capabilities

### Phase F0 — readiness and mathematical language

1. `T22V3-F00` — Readiness diagnostic & numeracy reset
2. `T22V3-F01` — Ratios, percentages, units & estimation
3. `T22V3-F02` — Algebraic expressions, equations & rearrangement
4. `T22V3-F03` — Inequalities, absolute value & sign
5. `T22V3-F04` — Functions, domains, graphs & parameters
6. `T22V3-F05` — Exponents, logarithms, sequences & sigma notation
7. `T22V3-F06` — Claims, quantifiers, counterexamples & proof habits

**Gate:** the learner can manipulate expressions, track units/bases, read a function/graph, reason about signs and state a claim precisely. The diagnostic is not a permanent blocker; it selects remediation inside this phase.

### Phase F1 / T1 — finite uncertainty, first trading decisions and first code

8. `T22V3-P00` — Counting & combinatorics
9. `ARC048` — Finite probability, conditional probability, independence & expectation
10. `T22V3-T00` — Payoff tables, expected value, fair price & break-even
11. `ARC502` — Bayes, base rates & sequential updating
12. `T22V3-T01` — Bankroll, drawdown, finite-horizon ruin & utility intuition
13. `T22V3-MKT00` — Prices, payoffs, returns, bid/ask & basic orders
14. `T22V3-C00` — Python primitives, functions & core containers
15. `T22V3-C01` — Exact enumeration, controlled randomness & simulation checks

**Why this comes early:** position 10 is already a genuine trading-decision module. The learner can compare a payoff distribution after costs, distinguish expected value from probability of loss, calculate break-even fees and defend a choice under an explicit objective. Tiny code then becomes a checker/experiment tool rather than a black box.

### Phase F2 — analysis, linear algebra and research-programming foundations

16. `SIDE263` — Sequences, convergence & limits
17. `ARC053` — Derivatives & local linearity
18. `ARC510` — Integration & accumulation
19. `ARC511` — Vectors, span, basis & dot products
20. `SIDE276` — Matrices, linear maps & linear systems
21. `SIDE278` — Orthogonality, projection & least squares
22. `SIDE279` — Eigenvalues, eigenvectors & spectral structure
23. `SIDE280` — PSD matrices, QR, Cholesky & SVD
24. `SIDE267` — Taylor approximation & error
25. `SIDE271` — Multivariable derivatives, gradients, Jacobians & Hessians
26. `T22V3-C02` — Scientific Python: arrays, tables, vectorization & plots
27. `T22V3-C03` — Research engineering: debugging, tests, Git & complexity basics

**Programming split of current `ARC515`:**

- `C00` owns scalar execution, functions/decomposition and lists/tuples/dicts/sets.
- `C01` owns explicit random-generator state, exact finite enumeration and simulation-as-check.
- `C02` owns NumPy shape/indexing/broadcasting/vectorization, pandas alignment/tables and diagnostic plotting.
- `C03` owns tracebacks/minimal reproductions, assertions/tests/invariants, basic Git/versioned changes, simple time/memory-complexity estimates and a clean rerunnable mini-project.

This closes the Stage A requirement that debugging, tests, version control and complexity are taught without turning T22 into a general software-engineering degree. `ARC509` later deepens research provenance and falsification; optional `ARC717` deepens algorithms/interview work.

### Phase F3 / R1 — probability-to-inference research spine

28. `ARC503` — Sampling, empirical distributions & bias
29. `ARC517` — Random variables, distributions, covariance & conditioning
30. `ARC504` — Estimation, standard error & confidence intervals
31. `ARC712` — LLN, CLT & concentration
32. `SIDE476` — Measurement uncertainty & error propagation
33. `ARC505` — Hypothesis tests, power & multiple testing
34. `ARC537` — Bootstrap, permutation & resampling inference
35. `ARC531` — Likelihood, MLE & identifiability
36. `ARC539` — Regression, diagnostics & research lab
37. `ARC508` — Leakage, validation, baselines & distribution shift
38. `ARC509` — Research provenance, reproducibility & falsification discipline
39. `ARC513` — Monte Carlo methods & simulation diagnostics
40. `ARC541` — Multivariate covariance, PCA & discrimination
41. `ARC542` — Time series, stationarity, ARMA & forecasting

**Gate:** a learner may not call a model a strategy merely because a fit statistic looks good. Sampling, uncertainty, testing, leakage, reproducibility and temporal structure are explicit prerequisites for later empirical finance work.

### Phase R2 / T2 — temporal data and market realism

42. `T22V3-R00` — Temporal validation firewall & walk-forward design
43. `ARC716` — SQL, joins, windows & out-of-core query workflows
44. `ARC714` — Market data engineering & temporal alignment
45. `ARC715` — Dirty financial data, revisions, survivorship & selection bias
46. `ARC558` — Market microstructure & order-book mechanics

`R00` is deliberately before the market-data modules: first learn the invariant that information must be available at the decision timestamp, then apply it to joins, revisions and event data. The v3 adaptation of `ARC558` uses `MKT00` for price/bid-ask/order vocabulary rather than requiring the full no-arbitrage `ARC553` module first. That is a material prerequisite retargeting and therefore cannot inherit old child evidence automatically.

### Phase F4 / F5 — optimization, learning, asset pricing and portfolio/execution

47. `ARC514` — Optimization problems & first/second-order conditions
48. `ARC581` — Convex sets/functions & convexity geometry
49. `ARC582` — Constrained convex optimization, duality & KKT
50. `ARC593` — Statistical learning, ERM & generalization
51. `ARC594` — Regularization, ridge/lasso & model selection
52. `ARC595` — Trees, bagging, random forests & boosting
53. `ARC553` — Asset pricing, replication & no-arbitrage
54. `ARC554` — Portfolio construction, covariance risk & robustness
55. `ARC559` — Execution costs, impact, scheduling & TCA

The shared core intentionally stops short of the current full `ARC586` Newton/quasi-Newton/autodiff module because that module's actual rich prerequisites include optional numerical linear algebra and matrix calculus. Core learners still receive optimization formulation, convexity, KKT, model fitting/selection and execution optimization. Astra should decide whether a smaller future numerical-solver bridge is needed before bulk authoring.

### Capstone C — adversarial empirical research

56. `ARC560` — End-to-end empirical strategy research & adversarial defense

The capstone depends on dirty-data discipline, execution realism, inference, validation, time series, portfolio construction, reproducibility and the temporal-validation firewall. It is not a first backtest.

## Optional depth branches — 17 preserved modules

These are not deleted. Existing achievements remain achievements. They leave the default shared first-hire path because they are valuable specializations rather than universal prerequisites for both target roles.

1. `ARC711` — Matrix calculus for quantitative models
2. `ARC512` — Differential equations & dynamical systems
3. `ARC717` — Algorithms & quant coding interview toolkit
4. `ARC585` — Numerical linear algebra
5. `ARC713` — Performance-aware scientific computing
6. `ARC506` — Causal skepticism & observational identification
7. `ARC507` — Experimental design
8. `ARC533` — Fisher information & efficiency
9. `ARC534` — Likelihood-ratio and optimal testing theory
10. `ARC543` — State-space models & Kalman filtering
11. `ARC524` — Markov chains
12. `ARC525` — Poisson and renewal processes
13. `ARC211` — Deterministic dynamic programming
14. `ARC590` — Markov decision processes
15. `ARC589` — Stochastic gradient methods
16. `ARC586` — Numerical optimization, finite differences & autodiff
17. `ARC599` — Neural networks & backpropagation

Suggested depth bundles, without making them new required tracks:

- **trader/system depth:** `ARC717`, `ARC585`, `ARC713`, `ARC524`, `ARC211`, `ARC590`;
- **research/inference depth:** `ARC506`, `ARC507`, `ARC533`, `ARC534`, `ARC543`;
- **ML/numerics depth:** `ARC711`, `ARC585`, `ARC589`, `ARC586`, `ARC599`.

## Direct-prerequisite highlights

The complete edge list is in `route.dependencies.json`. Important architectural edges include:

- `T22V3-F04` (functions) + `SIDE263` (limits) → `ARC053` (derivatives).
- `T22V3-P00` → `ARC048` → `T22V3-T00`.
- `ARC048` + `T22V3-C00` → `T22V3-C01`.
- `ARC511` → `SIDE276` → `SIDE278` / `SIDE279` → `SIDE280`.
- `C00 + C01 + C02` → `C03`; validation/provenance consume `C03` rather than assuming testing/version-control competence.
- `ARC503` + `ARC517` → `ARC504` → `ARC505`.
- `ARC539` + sampling + `C03` → `ARC508` → `ARC509`.
- `ARC539` + probability + limits → `ARC542`.
- validation + time series + research engineering + market basics → `T22V3-R00`.
- `R00` + SQL + time series + market basics → `ARC714` → `ARC715` / adapted `ARC558`.
- `ARC514` → `ARC581` → `ARC582`.
- `ARC582 + ARC585 + ARC711 + ARC514` → optional advanced `ARC586`.
- `ARC717 + ARC514` → optional `ARC211`; `ARC211 + ARC524 + ARC514` → optional `ARC590`.
- `ARC048 + linear systems + random variables + market basics + ARC514` → `ARC553`.
- `ARC541 + ARC553 + ARC582` → `ARC554`.
- microstructure + optimization + market data + research engineering → `ARC559`.
- data integrity + execution + inference + validation + time series + portfolio + reproducibility + temporal firewall → `ARC560`.

## Manual ancestry traces for the three Stage A samples

### Sample 1 — `T22V3-F01`

`T22V3-F00` → `T22V3-F01`

No calculus, probability, finance or code is assumed.

### Sample 2 — `T22V3-T00`

`T22V3-F00` → `F01` → `F02` → (`F03`, `F04`) → `F06` → `P00` → `ARC048` → `T22V3-T00`.

Only finite probability/expectation is required; Bayes is deliberately *not* required for this first trading lab.

### Sample 3 — `T22V3-R00`

Core ancestry includes:

- foundations → finite probability;
- `C00` → `C01`, and vectors → `C02` → `C03` research-engineering discipline;
- vectors → matrices → projection/least squares;
- sampling + random variables → estimation;
- regression → leakage/validation;
- limits + random variables + regression → time series;
- early market basics;
- then `ARC508 + ARC542 + C03 + MKT00 → R00`.

The sample therefore makes its advanced prerequisites explicit instead of pretending a novice should solve temporal leakage immediately.

## Stage A dependency checks

The repaired proposed graph has 73 unique nodes (56 core + 17 optional). It was checked for:

- unique IDs;
- every prerequisite resolving to a node in the proposal;
- default-plus-optional order respecting every declared prerequisite;
- no backward dependency edge, which also rules out a cycle under this declared topological order;
- preservation of 57/58 current T22 macro IDs as explicit nodes, with only `ARC515` intentionally split/replaced;
- explicit restoration of `ARC211 → ARC590` ancestry;
- advanced `ARC586` prerequisites consistent with the current rich-module contract.

Stage A does not write this DAG into runtime code. Astra should challenge the edges before Stage B implementation.
