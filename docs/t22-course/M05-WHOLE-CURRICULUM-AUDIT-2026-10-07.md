# M05 whole-curriculum source audit and rebuild contract

Date: 2026-10-07. Recovered main: `5ecb2806fda6c1904c7eb10739bd5e553801e5eb`.
M05 blob: `af37d469c95c65f3584e1dc9df97d113f2fe5a6e`.
Scope: audit all 65 macro destinations and their available authored/legacy contracts,
then repair M05. Later legacy contracts are comparators, not accepted atomic teaching.

## Disposition

**Retain the 24 stable identities; repair mistakes and add four distinct foundations.**

The existing route is strong: decision anatomy, accounting, EMV, decision trees,
thresholds, sensitivity, downside, dominance, repeated expectation, bankroll paths,
drawdown, first-hit ruin, constraints, multiplicative recovery, ordinal versus
lottery utility, CE, criteria audits, bimatrices, pure responses, security and mixing.
Do not duplicate those sessions or import calculus, general optimization or Bayes.

The current pack is a builder candidate with eight historical reviewer repairs.
Its status and handoff do not supply an exact-head independent confirmation.
Historical semantic `accepted` rows refer to older work and must not be presented
as acceptance of a new expanded candidate.

## Verified defects and gaps

| Finding | Evidence | Repair contract |
|---|---|---|
| F01: false strategic counterexample | S20-T has D,L=(2,3), D,R=(3,1). Column's own-payoff maximizer chooses L and the row-payoff minimizer also chooses L. The reference falsely calls this a contradiction. | Change the D-row column payoffs so the two rules disagree; score the actual contradiction and version the task. |
| F02: detached math checks | Independent scripts recompute hard-coded examples, including only `4>0&&3>1` for S20-T. They do not compare those computations with the public task/reference/rubric. | Bind critical public inputs to computations and scored numeric/strategic conclusions; exercise public/reference/rubric mutations and a coherent positive control. |
| F03: solved assessment cores remain in instruction | S06-M, S07-M, S16-M, S19-M, S20-M, S21-M, S22-M and S23-M repeat their lessons' numerical cores; S20/S21/S22 also contaminate other tasks with the same game. Generic separation notes say distinct data where that is false. | Separate worked examples and public tasks; retain explicit historical cross-session answer exposure. Do not invent reveal timestamps for unsolved guided checks. |
| F04: unasked rubric obligations | S15-T scores preference intensity without asking for it; S21-T scores dominance absence without asking for it. | State those requests publicly and retain exact claim-to-task-to-rubric links. |
| F05: risk attitude remains a label | Utility/CE arithmetic is present, but comparison with sure expected wealth, finite chord inequalities, and the limits of table-only CE/global risk claims are absent. | Add S25: finite risk attitudes, chord comparison, CE brackets and local-versus-global scope. |
| F06: incomplete joint information has no decision application | S06 varies one supplied p; it does not propagate M04-S25 sharp joint bounds through action differences. | Add S26: legal joint region, action-difference interval, endpoint witnesses, robust ordering versus an explicitly stated worst-case-EMV criterion. |
| F07: stopped policies are not compared | S12 computes first-hit ruin; S13 gives a hard constraint. Neither evaluates terminal wealth across explicitly supplied stopped policies or explains why n times one-play EV fails with stopping. | Add S27: terminal-prefix law, policy feasibility and finite policy comparison. No search over dynamic policies. |
| F08: mixing stops at algebra | S23 gives interior indifference numbers but does not check legal probabilities, all deviations, independent joint randomization or nonzero-sum own-payoff calculations. | Add S28: finite bimatrix mixture audit, support and unilateral deviations; include a dominated-row invalid interior solution. |
| F09: constrained and unconstrained rankings can be confused | S19 reports A as EU-best although A is forbidden by the hard cap. It says criteria separately, but never gives the constrained EU conclusion. | Explicitly report unconstrained rankings and maximize only over the feasible set when the hard rule applies. |
| F10: prerequisite/provenance documents lag M04 | Sources cite M04 v2.1, and S12 does not reuse new M04-S28 stopping authority. | Cite the merged 28-session M04; preserve stable IDs, strengthen specific prerequisite links, and keep M04 bytes unchanged. |

## Drive source dossier

All eight PDFs in the verified [M05 sources folder](https://drive.google.com/drive/folders/1PaXmxKDQm45UNGydH0LP40m_2CrWy3hZ)
were fetched as complete readable text. The following sections were read for this
design; five originals were also downloaded and mathematical pages visually checked.
This is targeted source reading, not a claim to have reviewed every page of two books.

| Source | Relevant reading and role | Imported boundary |
|---|---|---|
| [Martin Peterson, An Introduction to Decision Theory, 2nd ed.](https://drive.google.com/file/d/1jGAuzxgeKqIb0y6iMJsjGGwVHL2jSENj/view) | Ch.2; Ch.3.1–3.2, printed pp.17–44; Ch.4–5; Ch.10–12 as decision/risk/game comparators. | Distinguish states/actions, dominance and named criteria. Do not import philosophical paradoxes or the full survey. |
| [Giacomo Bonanno, Game Theory, 3rd ed.](https://drive.google.com/file/d/1idoA70EZcHQyiG9GkaCkDOAgHwM7CpmR/view) | Ch.2,5,6; pp.204–215: cardinal lottery payoffs, independent randomizers, support and best responses. PDF p.215 visually checked: indifference alone is insufficient if another action improves payoff. | Direct finite 2×2 calculations and deviation checks, not an existence theorem. Original T22 examples; no textbook exercise adaptations. |
| [MIT 14.123 Chapter 2](https://drive.google.com/file/d/1vTNv3-YA0Oaiwn69Fv_7bYO7bTi5tr7Z/view) | pp.1–14: lottery preferences and positive-affine representation. | Supplied finite vNM representation; no full theorem proof. |
| [MIT 14.123 Chapter 3](https://drive.google.com/file/d/1K98XdmhrFhyvB_lBNzXlW5Dj7qaoODaz/view) | Printed pp.19–21, especially p.20 / PDF p.2 visually checked. | Finite comparison EU versus u(mean), chord inequality and CE. Jensen, Arrow–Pratt derivatives, risk sharing and portfolio calculus stay downstream. |
| [MIT decision-under-risk slides](https://drive.google.com/file/d/1F1fi0eFjPoTlfkDpFZ5nCySC7BjPOz-m/view) | Whole short deck: preferences before averaging and utility invariance. | Reinforce S15–S17 progression. |
| [MIT Problem Set 1](https://drive.google.com/file/d/10ZN9YbfToMiYDQGMc5mTk0WBotG24pNg/view) and [solutions](https://drive.google.com/file/d/1s65xta8qcNb0Iyv0q4xGBWp1oeiIGzTv/view) | Whole short files checked as level comparators: CARA risk sharing and optimal investment. | Exclude this graduate/calculus content from M05; do not mistake available material for a prerequisite-safe lesson. |
| [Kahneman–Tversky 1979](https://drive.google.com/file/d/1RzZXfhAJR5Mi2RALTy_Ze3r6ovkyj_R1/view) | Abstract and opening critique of expected utility as a descriptive account. | Keep supplied-EU conclusions model conditional. No prospect-theory ownership or universal claims about actual people. |

Official primary-source counterparts were verified at
[MIT OCW](https://ocw.mit.edu/courses/14-123-microeconomic-theory-iii-spring-2015/pages/lecture-notes-and-slides/)
and [Bonanno's UC Davis textbook page](https://faculty.econ.ucdavis.edu/faculty/bonanno/GT_Book.html).
The finite robust-decision and stopped-policy tasks below are original constructions
derived from M04's finite laws. These sources support concepts and design choices;
they do not validate the effectiveness of this exact learning experience.

## Stable-ID route and rationale

S01–S08 → S26 → S09–S13 → S27 → S14–S18 → S25 → S19–S23 → S28 → S24.

S25 belongs after EU/CE because it compares sure expected wealth with a lottery.
S26 belongs after sensitivity/dominance because it adds model-set uncertainty.
S27 belongs after first-hit ruin/constraints because it compares explicit stopped policies.
S28 belongs after pure and mixed calculations because it checks their validity.
S24 must be rebuilt to consume these foundations; no quota of fresh evidence is imposed.

## Downstream handoffs

M06 retains posterior updating and finite posterior-to-action/EVSI/EVPI ownership.
Its current 24 sessions still stop at calibrated posterior conclusions: the earlier
requested decision/value-of-information bridge remains a documented M06 build need,
not an M05 topic silently stolen or a claim that the bridge already exists.
M07 consumes accounting, wealth factors and constraints but owns actual prices/returns/fills.
M08 can implement exact stopped-policy ledgers before simulation. M26 owns formal
distributions, variance/covariance and conditional expectation. M28/M30 own limit
and simulation theory; M49 owns general stopping/process theory. M51–M53 own
optimization/convexity, M54–M56 finance/portfolio/execution theory, and M59–M60
general policy search/dynamic programming/control. M65 consumes criterion-labelled
research judgment. None is a hidden M05 entry prerequisite.

## Implementation/validation obligations

28 sessions, 56 fixed tasks/evaluators, 140 literal claims. Preserve S01–S24 IDs.
Version only materially changed public contracts; preserve attempts and prior
fingerprints. Bind mathematical inputs and outputs to actual learner/scoring text.
Rerun semantic/structural/evidence checks, math and hostile mutation cases, all
learner positions and assessment surfaces in Chromium, mobile layout and evidence
round trip. Pin downstream compatibility to exact M05 bytes. Produce a frozen
draft PR with exact-head dedicated and full CI; do not claim independent acceptance.

## All-module ownership scan

The table below records every canonical M65 identity. Authored packs were read
where available; remaining rich contracts were resolved by stable module ID rather
than their old positional module number. For M01, generated packs plus the repair
pack supply the entry authority. M21/M43 retain their macro-only contracts.

| M | Stable ID | Destination | Authority read | Relation to M05 |
|---|---|---|---|---|
| M01 | T22E-FND01 | Quantitative Foundations I — Numeracy & Algebra | generated + repair packs | Entry foundation; owned concepts reused. |
| M02 | T22E-FND02 | Quantitative Foundations II — Functions & Precalculus | authored | Entry foundation; owned concepts reused. |
| M03 | T22E-DISC01 | Mathematical Reasoning & Discrete Foundations | authored | Entry foundation; owned concepts reused. |
| M04 | ARC048 | Finite Probability, Conditional Probability, Independence & Expectation | authored | Entry foundation; owned concepts reused. |
| M05 | T22E-TRD01 | Trading Games & Decisions Under Uncertainty | authored | Current target. |
| M06 | ARC502 | Bayes, Base Rates & Sequential Updating | authored | Posterior-to-action/EVSI/EVPI bridge remains downstream. |
| M07 | T22E-MKT01 | Markets 0 — Prices, Returns & Trading Mechanics | authored | Market prices, returns and mechanics remain downstream. |
| M08 | T22E-CODE01 | Quant Programming & Simulation Foundations | authored | Exact enumeration and simulation apply policy ledgers. |
| M09 | SIDE263 | Sequences, Convergence & Limits | authored | Later ownership; M05 supplies finite decision context only. |
| M10 | ARC053 | Derivatives & Local Linearity | authored | Later ownership; M05 supplies finite decision context only. |
| M11 | ARC510 | Integration & Accumulation | authored | Later ownership; M05 supplies finite decision context only. |
| M12 | SIDE267 | Taylor Approximation, Asymptotics & Error | authored | Later ownership; M05 supplies finite decision context only. |
| M13 | ARC511 | Vectors, Span, Basis & Dot Products | authored | Later ownership; M05 supplies finite decision context only. |
| M14 | SIDE276 | Matrices, Linear Maps & Linear Systems | authored | Later ownership; M05 supplies finite decision context only. |
| M15 | SIDE278 | Orthogonality, Projection & Least Squares Geometry | authored | Later ownership; M05 supplies finite decision context only. |
| M16 | SIDE279 | Eigenvalues, Eigenvectors & Spectral Structure | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M17 | SIDE280 | PSD Matrices, QR, Cholesky & SVD | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M18 | SIDE271 | Multivariable Calculus — Gradients, Jacobians & Hessians | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M19 | ARC711 | Matrix Calculus for Quantitative Models | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M20 | ARC512 | Differential Equations & Dynamical Systems | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M21 | T22E-CODE02 | Scientific Computing & Research Engineering | macro-contract | Later ownership; M05 supplies finite decision context only. |
| M22 | ARC717 | Quant Coding & Core Algorithms | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M23 | ARC585 | Numerical Linear Algebra & Conditioning | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M24 | ARC713 | Performance-Aware Scientific Computing | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M25 | ARC503 | Sampling, Empirical Distributions & Bias | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M26 | ARC517 | Random Variables, Distributions, Covariance & Conditioning | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M27 | ARC504 | Estimation, Standard Error & Confidence Intervals | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M28 | ARC712 | LLN, CLT & Concentration | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M29 | SIDE476 | Measurement Uncertainty & Error Propagation | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M30 | ARC513 | Monte Carlo Methods & Simulation Diagnostics | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M31 | ARC505 | Hypothesis Tests, Power & Multiple Testing | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M32 | ARC537 | Bootstrap, Permutation & Resampling Inference | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M33 | ARC531 | Likelihood, MLE & Identifiability | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M34 | ARC533 | Fisher Information, Efficiency & Asymptotic Precision | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M35 | ARC534 | Likelihood-Ratio & Optimal Testing Theory | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M36 | ARC539 | Regression, Diagnostics & Research Lab | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M37 | ARC506 | Causal Skepticism & Observational Identification | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M38 | ARC507 | Experimental Design & Randomized Evidence | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M39 | ARC508 | Leakage, Validation, Baselines & Distribution Shift | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M40 | ARC509 | Research Provenance, Reproducibility & Falsification | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M41 | ARC541 | Multivariate Covariance, PCA & Discrimination | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M42 | ARC542 | Time Series, Stationarity, ARMA & Forecasting | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M43 | T22E-TEMP01 | Temporal Research Design & Walk-Forward Validation | macro-contract | Later ownership; M05 supplies finite decision context only. |
| M44 | ARC716 | SQL, Joins, Windows & Out-of-Core Query Workflows | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M45 | ARC714 | Market Data Engineering & Temporal Alignment | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M46 | ARC715 | Dirty Financial Data, Revisions, Missingness & Selection Bias | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M47 | ARC558 | Market Microstructure & Order-Book Mechanics | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M48 | ARC543 | State-Space Models & Sequential Estimation | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M49 | ARC524 | Discrete-Time Stochastic Processes — Markov Chains, Martingale/Stopping Foundations | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M50 | ARC525 | Continuous-Time Event Processes — Poisson, Renewal & Brownian Foundations | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M51 | ARC514 | Optimization Problems & First/Second-Order Conditions | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M52 | ARC581 | Convex Sets, Functions & Convexity Geometry | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M53 | ARC582 | Constrained Convex Optimization, Duality & KKT | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M54 | ARC553 | Asset Pricing, Replication, No-Arbitrage & Derivatives Foundations | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M55 | ARC554 | Portfolio Construction, Covariance Risk & Robustness | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M56 | ARC559 | Execution Costs, Impact, Scheduling & TCA | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M57 | ARC586 | Numerical Optimization, Finite Differences & Autodiff | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M58 | ARC589 | Stochastic Gradient Methods | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M59 | ARC211 | Deterministic Dynamic Programming | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M60 | ARC590 | Markov Decision Processes | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
| M61 | ARC593 | Statistical Learning, ERM & Generalization | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M62 | ARC594 | Regularization, Ridge/Lasso & Model Selection | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M63 | ARC595 | Trees, Bagging, Random Forests & Boosting | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M64 | ARC599 | Neural Networks, Backpropagation & Modern Representation Learning | legacy-rich-contract | Later ownership; M05 supplies finite decision context only. |
| M65 | ARC560 | End-to-End Empirical Strategy Research & Adversarial Defense | legacy-rich-contract | Direct boundary: finite preparation; no formal theory imported. |
