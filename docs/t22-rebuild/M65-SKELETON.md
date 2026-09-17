# T22 Elite — M65 Macro Skeleton

Status: **macro architecture candidate — no atomic authoring yet**

Design target: take a learner from roughly Class-10 mathematics to unusually strong quantitative-trading / quantitative-research capability, while letting each macro module expand into a large prerequisite-safe set of atomic sessions, investigations, transfer tasks, coding labs and artifacts.

This file defines **macro ownership only**. A module is not an hour, lecture or chapter. It is a capability family. The internal atomic count is intentionally unconstrained until that module is opened and designed.

## Macro design rules

1. Start below the old T22 admission floor: numeracy, algebra, functions and reasoning must be taught, not assumed.
2. Keep genuine trading/uncertainty decisions early so the mathematics has a reason to exist.
3. Use two programming modules rather than one giant ARC515 box: first code as a mathematical/simulation instrument, later scientific-computing/research-engineering discipline.
4. Give temporal research design its own ownership boundary before market-data research.
5. Revisit capabilities later through harder contexts instead of treating a completed module as forgotten history.
6. Projects are a second axis across the route, not extra macro modules.
7. Do not split a module merely because it contains many atomic sessions. Split only when the learner is acquiring a distinct capability family with a distinct exit standard.

## Final proposed chronology

### Phase 0 — mathematical launchpad

**M01 · Quantitative Foundations I — Numeracy & Algebra**  
Stable ID: `T22E-FND01`  
Fractions, ratios, percentages, rates, units, estimation, signed arithmetic, powers, algebraic manipulation, equations, inequalities and absolute value. Includes the readiness diagnostic/remediation logic rather than making diagnosis its own module.

**M02 · Quantitative Foundations II — Functions & Precalculus**  
Stable ID: `T22E-FND02`  
Functions as objects, domains/ranges, graphs, coordinate geometry, parameters, transformations, exponentials/logarithms, sequences, sigma notation and only the trigonometry needed by later quantitative work.

**M03 · Mathematical Reasoning & Discrete Foundations**  
Stable ID: `T22E-DISC01`  
Claims, implication, quantifiers, counterexamples, direct/contrapositive/inductive proof habits, sets/maps, finite counting and combinatorics. This owns the prerequisite counting layer that the old T22 lacked before probability.

### Phase 1 — uncertainty, trading motivation and first code

**M04 · Finite Probability, Conditional Probability, Independence & Expectation**  
Stable ID: `ARC048`

**M05 · Trading Games & Decisions Under Uncertainty**  
Stable ID: `T22E-TRD01`  
Payoff tables, expected value, fair price, break-even, probability of loss, bankroll, drawdown, finite-horizon ruin intuition, utility/risk preferences, adversarial games and rapid quantitative decision drills. This absorbs the Stage-A T00 and T01 ideas into one substantial macro family.

**M06 · Bayes, Base Rates & Sequential Updating**  
Stable ID: `ARC502`

**M07 · Markets 0 — Prices, Returns & Trading Mechanics**  
Stable ID: `T22E-MKT01`  
Prices versus payoffs, cashflows, arithmetic/log returns, long/short P&L, bid/ask, spreads, basic order types, fills and the market vocabulary required by later research.

**M08 · Quant Programming & Simulation Foundations**  
Stable ID: `T22E-CODE01`  
Python primitives, control flow, functions, decomposition, core containers, exact enumeration, explicit random-generator state, reproducible small simulations and code as a checker of mathematics rather than a substitute for it.

### Phase 2 — analysis and linear-algebra engine

**M09 · Sequences, Convergence & Limits** — `SIDE263`  
**M10 · Derivatives & Local Linearity** — `ARC053`  
**M11 · Integration & Accumulation** — `ARC510`  
**M12 · Taylor Approximation, Asymptotics & Error** — `SIDE267`  
**M13 · Vectors, Span, Basis & Dot Products** — `ARC511`  
**M14 · Matrices, Linear Maps & Linear Systems** — `SIDE276`  
**M15 · Orthogonality, Projection & Least Squares Geometry** — `SIDE278`  
**M16 · Eigenvalues, Eigenvectors & Spectral Structure** — `SIDE279`  
**M17 · PSD Matrices, QR, Cholesky & SVD** — `SIDE280`  
**M18 · Multivariable Calculus — Gradients, Jacobians & Hessians** — `SIDE271`  
**M19 · Matrix Calculus for Quantitative Models** — `ARC711`  
**M20 · Differential Equations & Dynamical Systems** — `ARC512`

### Phase 3 — scientific-computing craft

**M21 · Scientific Computing & Research Engineering**  
Stable ID: `T22E-CODE02`  
NumPy shape/indexing/broadcasting/vectorization, pandas tables/alignment, diagnostic plotting, debugging, minimal reproductions, assertions/tests/invariants, basic Git/versioned changes, reproducible mini-project structure and simple time/memory-complexity reasoning.

**M22 · Quant Coding & Core Algorithms** — `ARC717`  
**M23 · Numerical Linear Algebra & Conditioning** — `ARC585`  
**M24 · Performance-Aware Scientific Computing** — `ARC713`

### Phase 4 — statistical research spine

**M25 · Sampling, Empirical Distributions & Bias** — `ARC503`  
**M26 · Random Variables, Distributions, Covariance & Conditioning** — `ARC517`  
**M27 · Estimation, Standard Error & Confidence Intervals** — `ARC504`  
**M28 · LLN, CLT & Concentration** — `ARC712`  
**M29 · Measurement Uncertainty & Error Propagation** — `SIDE476`  
**M30 · Monte Carlo Methods & Simulation Diagnostics** — `ARC513`  
**M31 · Hypothesis Tests, Power & Multiple Testing** — `ARC505`  
**M32 · Bootstrap, Permutation & Resampling Inference** — `ARC537`  
**M33 · Likelihood, MLE & Identifiability** — `ARC531`  
**M34 · Fisher Information, Efficiency & Asymptotic Precision** — `ARC533`  
**M35 · Likelihood-Ratio & Optimal Testing Theory** — `ARC534`  
**M36 · Regression, Diagnostics & Research Lab** — `ARC539`  
**M37 · Causal Skepticism & Observational Identification** — `ARC506`  
**M38 · Experimental Design & Randomized Evidence** — `ARC507`  
**M39 · Leakage, Validation, Baselines & Distribution Shift** — `ARC508`  
**M40 · Research Provenance, Reproducibility & Falsification** — `ARC509`  
**M41 · Multivariate Covariance, PCA & Discrimination** — `ARC541`  
**M42 · Time Series, Stationarity, ARMA & Forecasting** — `ARC542`

### Phase 5 — temporal and market-data reality

**M43 · Temporal Research Design & Walk-Forward Validation**  
Stable ID: `T22E-TEMP01`  
Information sets, decision timestamps, label horizons, chronological splits, gaps/embargo where justified, walk-forward evaluation, as-of reasoning, temporal leakage and the invariant that information used by a decision must have been knowable at that decision time.

**M44 · SQL, Joins, Windows & Out-of-Core Query Workflows** — `ARC716`  
**M45 · Market Data Engineering & Temporal Alignment** — `ARC714`  
**M46 · Dirty Financial Data, Revisions, Missingness & Selection Bias** — `ARC715`  
**M47 · Market Microstructure & Order-Book Mechanics** — `ARC558`

### Phase 6 — stochastic-process depth

**M48 · State-Space Models & Sequential Estimation** — `ARC543`  
**M49 · Discrete-Time Stochastic Processes — Markov Chains, Martingale/Stopping Foundations** — `ARC524`  
The existing Markov-chain ownership remains, but the eventual Pandora box may add prerequisite-safe martingale/stopping foundations when justified; this is not permission to smuggle advanced material into early atomic sessions.

**M50 · Continuous-Time Event Processes — Poisson, Renewal & Brownian Foundations** — `ARC525`  
The existing Poisson/renewal ownership remains. Brownian/continuous-time foundations may be added internally only where they form a coherent progression and do not turn the shared route into derivatives-specialist training.

### Phase 7 — optimization, control and finance

**M51 · Optimization Problems & First/Second-Order Conditions** — `ARC514`  
**M52 · Convex Sets, Functions & Convexity Geometry** — `ARC581`  
**M53 · Constrained Convex Optimization, Duality & KKT** — `ARC582`  
**M54 · Asset Pricing, Replication, No-Arbitrage & Derivatives Foundations** — `ARC553`  
**M55 · Portfolio Construction, Covariance Risk & Robustness** — `ARC554`  
**M56 · Execution Costs, Impact, Scheduling & TCA** — `ARC559`  
**M57 · Numerical Optimization, Finite Differences & Autodiff** — `ARC586`  
**M58 · Stochastic Gradient Methods** — `ARC589`  
**M59 · Deterministic Dynamic Programming** — `ARC211`  
**M60 · Markov Decision Processes** — `ARC590`

### Phase 8 — statistical learning and modern modeling

**M61 · Statistical Learning, ERM & Generalization** — `ARC593`  
**M62 · Regularization, Ridge/Lasso & Model Selection** — `ARC594`  
**M63 · Trees, Bagging, Random Forests & Boosting** — `ARC595`  
**M64 · Neural Networks, Backpropagation & Modern Representation Learning** — `ARC599`

### Phase 9 — research apprenticeship / defense

**M65 · End-to-End Empirical Strategy Research & Adversarial Defense** — `ARC560`  
This is not the first project. Projects and professional artifacts begin much earlier. M65 owns the final integration standard: defensible question selection, data lineage, temporal validity, baselines, inference, robustness, costs/impact, portfolio context, reproducibility, written research memo, reproducible code/artifacts and hostile defense.

## Why no further macro merges were made

The Pandora-box model removes the need to create extra modules merely because a topic is large. It does **not** justify merging capability families whose exit standards are materially different.

After reviewing the candidates, no additional merge is clean enough to improve the route:

- Fisher information/efficiency and likelihood-ratio/optimal testing share ancestry but train different inferential capabilities.
- Causal identification and experimental design are related but differ in evidence source, failure modes and research design.
- Markov chains and Poisson/renewal processes are different stochastic-process geometries; each can support a large internal progression.
- Numerical optimization and stochastic-gradient methods differ enough in diagnostics and convergence behavior to retain separate ownership.
- Deterministic DP and MDPs are separated deliberately so state/action/value recursion is learned before stochastic control.
- Market microstructure and execution are not merged: understanding how the market works is prerequisite knowledge for deciding how to trade through it.

Therefore the macro skeleton remains **exactly 65 modules**.

## Project axis — not additional modules

Projects should be unlocked and revisited across the route rather than appended as M66+:

- Probability Casino / fair-value game
- tiny market maker
- simulation and Monte Carlo laboratory
- statistical detective / planted-leakage lab
- factor or signal research mini-lab
- time-series walk-forward study
- market-data reconstruction
- order-book / microstructure study
- execution/TCA laboratory
- portfolio robustness study
- ML alpha study
- published-result reproduction
- deliberate failure project: build a convincing result, then destroy it correctly
- independent research project
- final quant thesis / defense

Exact project gates are deferred until their owning modules are designed.

## Freeze rule

Once this skeleton passes one final dependency-order audit, module count and macro ownership should be treated as frozen. Future discoveries should normally become atomic sessions, prerequisite bridges, project tasks or optional depth inside an existing module. A new macro module requires a written argument that no existing module can own the capability without corrupting its exit standard.
