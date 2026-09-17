# T22 v3 Stage A Prerequisite Route Proposal

Status: **proposal for Astra architecture review**. This is not the live `T22_ORDER` and does not change learner progress.

Audit base: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Machine-readable companion: `route.dependencies.json`

## Design target

Build one default itinerary that can take a learner with uncertain school mathematics toward defensible quantitative-trading and empirical-research capability without requiring every advanced specialization before the route becomes useful.

The route obeys six rules:

1. No university topic may rely on hidden school-math assumptions.
2. Real uncertainty/trading decisions appear early, not after the entire math stack.
3. Programming arrives in layers and supports derivation rather than replacing it.
4. Statistics/research validation precede end-to-end strategy claims.
5. Market data, microstructure and execution appear before the capstone.
6. Valuable but non-universal advanced material remains available as prerequisite-gated optional depth.

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
14. `T22V3-C00` — Python primitives for quantitative work
15. `T22V3-C01` — Exact enumeration, loops & simulation checks

**Why this comes early:** position 10 is already a genuine trading-decision module. The learner can compare a payoff distribution after costs, distinguish expected value from probability of loss, calculate break-even fees and defend a choice under an explicit objective. Market vocabulary then arrives before deep finance theory. Tiny code follows the hand calculation so code becomes a checker and experiment tool rather than a black box.

### Phase F2 — analysis and linear algebra

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
26. `T22V3-C02` — Scientific Python: arrays, tables, plots & tests

**Ordering repair:** limits/functions now precede derivatives. Linear systems precede projection/eigen/factorization work. Scientific-array tooling waits until the learner has basic vector language but arrives before statistical data labs.

### Phase F3 / R1 — probability-to-inference research spine

27. `ARC503` — Sampling, empirical distributions & bias
28. `ARC517` — Random variables, distributions, covariance & conditioning
29. `ARC504` — Estimation, standard error & confidence intervals
30. `ARC712` — LLN, CLT & concentration
31. `SIDE476` — Measurement uncertainty & error propagation
32. `ARC505` — Hypothesis tests, power & multiple testing
33. `ARC537` — Bootstrap, permutation & resampling inference
34. `ARC531` — Likelihood, MLE & identifiability
35. `ARC539` — Regression, diagnostics & research lab
36. `ARC508` — Leakage, validation, baselines & distribution shift
37. `ARC509` — Research provenance, reproducibility & falsification discipline
38. `ARC513` — Monte Carlo methods & simulation diagnostics
39. `ARC541` — Multivariate covariance, PCA & discrimination
40. `ARC542` — Time series, stationarity, ARMA & forecasting

**Gate:** a learner may not call a model a strategy merely because a fit statistic looks good. Sampling, uncertainty, testing, leakage, reproducibility and temporal structure are explicit prerequisites for later empirical finance work.

### Phase R2 / T2 — temporal data and market realism

41. `T22V3-R00` — Temporal validation firewall & walk-forward design
42. `ARC716` — SQL, joins, windows & out-of-core query workflows
43. `ARC714` — Market data engineering & temporal alignment
44. `ARC715` — Dirty financial data, revisions, survivorship & selection bias
45. `ARC558` — Market microstructure & order-book mechanics

`T22V3-R00` is deliberately before the market-data modules: the learner first learns the invariant that information must be available at the decision timestamp, then applies it to joins, revisions and event data. Deep microstructure stays advanced; only basic bid/ask/order vocabulary was moved early into `MKT00`.

### Phase F4 / F5 — optimization, learning, asset pricing and portfolio/execution

46. `ARC514` — Optimization problems & first/second-order conditions
47. `ARC581` — Convex sets/functions & convexity geometry
48. `ARC582` — Constrained convex optimization, duality & KKT
49. `ARC586` — Numerical optimization, finite differences & autodiff
50. `ARC593` — Statistical learning, ERM & generalization
51. `ARC594` — Regularization, ridge/lasso & model selection
52. `ARC595` — Trees, bagging, random forests & boosting
53. `ARC553` — Asset pricing, replication & no-arbitrage
54. `ARC554` — Portfolio construction, covariance risk & robustness
55. `ARC559` — Execution costs, impact, scheduling & TCA

This phase intentionally does not require deep neural networks. A first core should make the learner excellent at validation, baselines, linear/statistical models, tree ensembles, optimization, portfolio risk and execution costs before adding architecture fashion.

### Capstone C — adversarial empirical research

56. `ARC560` — End-to-end empirical strategy research & adversarial defense

The capstone depends on dirty-data discipline, execution realism, inference, validation, time series, portfolio construction, reproducibility and the temporal-validation firewall. It is not a first backtest.

## Optional depth branches — 15 preserved modules

These are not deleted. Existing achievements remain achievements. They leave the default first-hire path because they are valuable specializations rather than universal prerequisites for both target roles.

- `ARC711` — Matrix calculus for quantitative models
- `ARC512` — Differential equations & dynamical systems
- `ARC717` — Algorithms & quant coding interview toolkit
- `ARC585` — Numerical linear algebra
- `ARC713` — Performance-aware scientific computing
- `ARC506` — Causal skepticism & observational identification
- `ARC507` — Experimental design
- `ARC533` — Fisher information & efficiency
- `ARC534` — Likelihood-ratio and optimal testing theory
- `ARC543` — State-space models & Kalman filtering
- `ARC524` — Markov chains
- `ARC525` — Poisson and renewal processes
- `ARC590` — Markov decision processes
- `ARC589` — Stochastic gradient methods
- `ARC599` — Neural networks & backpropagation

Suggested depth bundles, without making them new required tracks:

- **trader/system depth:** `ARC717`, `ARC585`, `ARC713`, `ARC524`, `ARC590`;
- **research/inference depth:** `ARC506`, `ARC507`, `ARC533`, `ARC534`, `ARC543`;
- **ML/numerics depth:** `ARC711`, `ARC585`, `ARC713`, `ARC589`, `ARC599`.

## Direct-prerequisite highlights

The complete edge list is in `route.dependencies.json`. Important architectural edges include:

- `T22V3-F04` (functions) + `SIDE263` (limits) → `ARC053` (derivatives).
- `T22V3-P00` → `ARC048` → `T22V3-T00`.
- `ARC048` + `T22V3-C00` → `T22V3-C01`.
- `ARC511` → `SIDE276` → `SIDE278` / `SIDE279` → `SIDE280`.
- `ARC503` + `ARC517` → `ARC504` → `ARC505`.
- `ARC539` + `ARC503` + scientific Python → `ARC508`.
- `ARC539` + probability + limits → `ARC542`.
- validation + time series + market basics → `T22V3-R00`.
- SQL + time series + market basics → `ARC714` → `ARC715` / `ARC558`.
- microstructure + optimization + market data → `ARC559`.
- `ARC541` + asset pricing + constrained optimization → `ARC554`.
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
- vectors → matrices → projection/least squares;
- scientific Python;
- sampling + random variables → estimation;
- regression → leakage/validation;
- limits + random variables + regression → time series;
- early market basics;
- then `ARC508` + `ARC542` + `T22V3-C02` + `T22V3-MKT00` → `T22V3-R00`.

The sample therefore makes its advanced prerequisites explicit instead of pretending a novice should solve temporal leakage immediately.

## Machine-check performed for Stage A

The proposed 71-node graph (56 core + 15 optional) was checked independently for:

- unique IDs;
- every prerequisite resolving to a node in the proposal;
- default/optional insertion order respecting every declared prerequisite;
- no missing edge target.

Stage A does not write this DAG into runtime code. Astra should challenge the edges before Stage B implementation.
