export function buildT22RichModule34(syllabusVersion) {
  return {
    moduleId: "ARC513",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build Monte Carlo simulation as a controlled numerical-inference method: define the stochastic experiment, construct estimators from simulated draws, quantify simulation error, trade precision against compute, generate nontrivial target laws from simpler random sources, apply core variance-reduction methods, and defend the simulation design with diagnostics rather than trusting a large sample count by itself.",
    moduleDestination:
      "The learner can formulate a Monte Carlo target, implement a reproducible estimator, derive its expectation and sampling error under stated assumptions, choose sample size from an accuracy objective, transform pseudo-random inputs into required laws, deploy antithetic variates, control variates and importance sampling when justified, and diagnose bias, instability, dependence, weight degeneracy or false precision in unfamiliar simulation studies.",
    entryPrerequisites: [
      "ARC517 random variables, expectation, variance, transformations and joint structure",
      "ARC504 estimator bias, variance, standard error and sampling-distribution reasoning",
      "ARC712 LLN/CLT and concentration intuition for empirical averages",
      "ARC515 reproducible Python experiments and random-number handling",
      "ARC509 code/environment reproducibility, provenance and explicit stochastic-state policy",
    ],
    explicitlyOutOfScope: [
      "Bootstrap and permutation/randomization inference — ARC537",
      "General Markov-chain theory and MCMC convergence — ARC524 and later specialized methods",
      "Time-series stochastic modelling — ARC542",
      "State-space simulation/filtering — ARC543",
      "Poisson/renewal event-process modelling — ARC525",
      "Quasi-Monte Carlo, multilevel Monte Carlo, sequential Monte Carlo and rare-event asymptotics beyond a brief boundary mention",
      "Production backtest architecture, market-data simulation and transaction-cost modelling — ARC560",
    ],
    arcs: {
      "T22-M34-A01": {
        focus: "Simulation as a mathematical experiment: define the probability model, target functional, random inputs and estimator before generating numbers.",
        roleRelevance:
          "Simulation is useful only when the numerical experiment corresponds to a clearly specified probabilistic quantity; otherwise code can produce convincing but scientifically meaningless output.",
        purpose:
          "Turn a probability or expectation problem into an explicit simulated experiment whose target, assumptions, generated variables and computed statistic can be audited.",
        principalObstacle:
          "The act of drawing random numbers is not itself Monte Carlo inference: the simulated law, target functional and estimator must align exactly, and changing any one changes the scientific question.",
        entryPrerequisites: ["ARC517 probability models and transformations", "ARC515 reproducible Python experiments"],
        target:
          "Given an analytically difficult probability/expectation problem, specify a complete Monte Carlo experiment including target quantity, data-generating law, independent/random inputs, estimator and validation checks before implementation.",
        requiredMastery: [
          "State the exact target quantity before simulation",
          "Map each simulated variable to an explicit probability law",
          "Construct the statistic whose average or frequency estimates the target",
          "Distinguish simulation-model error from Monte Carlo sampling error",
          "Identify when independent draws are assumed and when dependence would change uncertainty calculations",
          "Design sanity checks against analytically solvable special cases",
          "Diagnose a simulation whose code runs but estimates the wrong mathematical object",
        ],
        applicationScope:
          "Expected payoff, tail probability, nonlinear risk functional or other probabilistic quantity that can be represented as an expectation or event probability under a specified model.",
        transferScope:
          "An unfamiliar probabilistic model where the learner must construct the simulation experiment from first principles rather than imitate existing code.",
        explicitlyOutOfScope: ["Estimator convergence-rate derivation", "Variance reduction", "Bootstrap resampling"],
        nextArcBoundary:
          "A02 owns the canonical Monte Carlo estimator and why empirical averages estimate expectations.",
      },
      "T22-M34-A02": {
        focus: "Monte Carlo estimation: empirical averages, indicator estimators and unbiasedness/consistency under explicit assumptions.",
        roleRelevance:
          "Many quantitative quantities are expectations that are easier to approximate by simulation than integrate analytically; researchers need to know exactly why the sample average targets the desired number.",
        purpose:
          "Derive the basic Monte Carlo estimator for expectations and probabilities and connect its behavior to expectation linearity and the law of large numbers.",
        principalObstacle:
          "A simulated average can look numerically stable while targeting the wrong expectation, using biased samples or violating assumptions needed for convergence.",
        entryPrerequisites: ["T22-M34-A01", "ARC517 expectation", "ARC712 LLN"],
        target:
          "Construct and justify Monte Carlo estimators for E[g(X)] and P(A), derive their expectation under i.i.d. sampling, and state the conditions under which increasing simulation size converges toward the intended target.",
        requiredMastery: [
          "Derive the sample-mean estimator for an expectation",
          "Use indicator variables to estimate event probabilities",
          "Show unbiasedness when draws come from the stated target law and the expectation exists",
          "Invoke LLN assumptions correctly rather than treating convergence as automatic",
          "Compare two mathematically equivalent estimators that may have different variances",
          "Diagnose bias introduced by sampling from the wrong distribution or applying the wrong transformation",
          "Transfer the construction to an unfamiliar payoff or probability target",
        ],
        applicationScope:
          "Expectations, probabilities and integrals expressible under a simulatable probability law.",
        transferScope:
          "A new target where the learner must discover an expectation representation and estimator rather than receive one prewritten.",
        explicitlyOutOfScope: ["CLT-based precision calculations — A03", "Importance sampling — A08"],
        nextArcBoundary:
          "A03 owns the random error of a Monte Carlo estimator and how to quantify it from replicated draws.",
      },
      "T22-M34-A03": {
        focus: "Monte Carlo error: estimator variance, standard error, confidence intervals and convergence diagnostics for independent simulation.",
        roleRelevance:
          "A reported Monte Carlo estimate without simulation uncertainty can imply false precision; researchers must distinguish numerical randomness from model uncertainty and data uncertainty.",
        purpose:
          "Quantify the sampling variability induced solely by finite simulation size and report precision in units meaningful for the target.",
        principalObstacle:
          "The estimate changes from run to run, and its uncertainty shrinks only at square-root rate; apparent decimal stability is not evidence of adequate precision.",
        entryPrerequisites: ["T22-M34-A02", "ARC504 standard error", "ARC712 CLT"],
        target:
          "Derive the standard error of an i.i.d. Monte Carlo sample mean, estimate it from simulated output, construct an approximate confidence interval where justified, and use repeated runs or diagnostics to detect misleading precision.",
        requiredMastery: [
          "Derive Var(mean)=Var(Y)/n under independent sampling",
          "Compute estimated Monte Carlo standard error from simulated values",
          "Explain the n^{-1/2} error rate and its practical implications",
          "Construct and interpret a CLT-based interval when finite-variance/large-sample conditions are plausible",
          "Separate Monte Carlo error from parameter/model/data uncertainty",
          "Diagnose heavy-tail or dependence cases where naive standard-error formulas fail",
          "Use repeated seeds or batch summaries as diagnostics without confusing them with independent empirical replication",
        ],
        applicationScope:
          "Finite-variance Monte Carlo estimators where simulation uncertainty can be estimated from generated observations.",
        transferScope:
          "An unfamiliar estimator whose output variability must be decomposed into Monte Carlo versus non-Monte-Carlo sources.",
        explicitlyOutOfScope: ["MCMC effective sample size", "Bootstrap confidence intervals — ARC537"],
        nextArcBoundary:
          "A04 turns the square-root convergence law into explicit accuracy-versus-compute design decisions.",
      },
      "T22-M34-A04": {
        focus: "Accuracy versus computational cost: choose simulation size from error tolerances and diagnose when brute-force sampling is wasteful.",
        roleRelevance:
          "Quant research often faces expensive pricing, risk or scenario calculations; knowing that ten times more precision can require roughly one hundred times more draws motivates better estimators rather than blind scaling.",
        purpose:
          "Translate an accuracy target into a simulation budget and compare computational improvements against variance-reduction opportunities.",
        principalObstacle:
          "Monte Carlo convergence is slow: doubling sample size does not halve error, and runtime-per-draw matters alongside estimator variance.",
        entryPrerequisites: ["T22-M34-A03", "Basic computational-cost reasoning"],
        target:
          "Given a pilot variance estimate, desired standard error or confidence half-width and per-draw cost, estimate required sample size, test whether the budget is credible and identify whether reducing variance or reducing per-draw cost is the more effective intervention.",
        requiredMastery: [
          "Derive sample-size scaling from the standard-error formula",
          "Estimate the additional draws required for a requested precision improvement",
          "Combine variance and cost-per-sample into a simple efficiency comparison",
          "Explain why more draws cannot remove model bias",
          "Diagnose stopping based solely on visually stable running averages",
          "Construct an adaptive pilot-then-budget workflow without outcome-driven target changes",
          "Transfer the cost/precision analysis to a computationally expensive unfamiliar simulation",
        ],
        applicationScope:
          "Pricing, risk, probability or scenario simulations where per-draw cost and precision can be measured.",
        transferScope:
          "A new simulation engine where the learner must decide whether to spend compute on more draws or redesign the estimator.",
        explicitlyOutOfScope: ["Low-level performance engineering — ARC713", "Parallel/distributed systems"],
        nextArcBoundary:
          "A05 owns constructing target-distribution draws from simpler pseudo-random inputs.",
      },
      "T22-M34-A05": {
        focus: "Sampling transformations: generate target laws from uniform pseudo-random inputs with support and Jacobian/CDF logic kept explicit.",
        roleRelevance:
          "Simulation engines rarely provide every distribution directly; quantitative researchers must know when inverse-CDF or other transformations genuinely produce the intended law.",
        purpose:
          "Construct valid transformed samples from simple random sources and verify the resulting distribution rather than trusting a library call blindly.",
        principalObstacle:
          "A deterministic transform of a uniform draw produces the desired target law only when the transformation is mathematically correct; support mistakes, endpoint issues and invalid inverse-CDF assumptions silently corrupt simulations.",
        entryPrerequisites: ["ARC517 CDFs and transformations", "T22-M34-A01-A04"],
        target:
          "Derive inverse-transform sampling for continuous monotone CDFs, implement representative transformations, and validate generated samples against known moments/quantiles or analytic special cases.",
        requiredMastery: [
          "Derive inverse-CDF sampling from P(F^{-1}(U)<=x)=F(x) under appropriate conditions",
          "Track support and endpoint behavior correctly",
          "Construct at least one nontrivial target law from simpler random inputs",
          "Use analytic moments/CDF values as distributional validation checks",
          "Diagnose a transformation that produces the wrong target density",
          "Explain when numerical inversion or alternative sampling algorithms would be required",
          "Transfer transformation logic to an unfamiliar target distribution",
        ],
        applicationScope:
          "Scalar probability models with tractable inverse transforms or simple constructive representations.",
        transferScope:
          "A new target law where the learner must derive or reject an attempted transformation using distributional reasoning.",
        explicitlyOutOfScope: ["General rejection sampling theory in depth", "Normalizing flows", "MCMC"],
        nextArcBoundary:
          "A06 begins variance reduction by coupling negatively related estimators through antithetic variates.",
      },
      "T22-M34-A06": {
        focus: "Antithetic variates: induce useful negative dependence between paired simulation outputs while preserving the target mean.",
        roleRelevance:
          "Variance reduction can buy more precision without proportionally more compute, but only when the induced dependence actually reduces covariance for the target statistic.",
        purpose:
          "Derive the paired antithetic estimator, prove its expectation is unchanged, and analyze when its covariance term lowers or raises variance.",
        principalObstacle:
          "Using U and 1-U is not automatically beneficial; the payoff transformation must create sufficiently negative dependence, otherwise the pairing provides little gain or can be counterproductive.",
        entryPrerequisites: ["T22-M34-A03-A05", "ARC517 covariance"],
        target:
          "Construct an antithetic estimator for a suitable simulation problem, derive its variance including the covariance term, compare efficiency with independent sampling and diagnose cases where antithetic pairing fails.",
        requiredMastery: [
          "Show that each antithetic marginal still has the target distribution",
          "Derive the variance of the average of a paired estimator",
          "Identify the role of negative covariance in variance reduction",
          "Measure empirical variance reduction fairly at comparable computational cost",
          "Construct a counterexample where antithetic pairing gives no meaningful benefit",
          "Diagnose invalid pairing that changes the target law",
          "Transfer antithetic reasoning to an unfamiliar monotone payoff structure",
        ],
        applicationScope:
          "Simulation targets driven by transformable common random inputs where monotonic structure can induce negative output dependence.",
        transferScope:
          "A new payoff where the learner must predict whether antithetic coupling should help before running the experiment.",
        explicitlyOutOfScope: ["Common-random-number experimental-design depth", "Quasi-Monte Carlo"],
        nextArcBoundary:
          "A07 owns control variates: reduce variance using a correlated quantity with known expectation.",
      },
      "T22-M34-A07": {
        focus: "Control variates: exploit correlation with a known-mean auxiliary quantity to reduce estimator variance without changing the target expectation.",
        roleRelevance:
          "Quantitative models often contain related quantities with known or cheaply computed expectations; using them correctly can materially improve simulation precision.",
        purpose:
          "Derive the control-variate estimator, its unbiasedness under fixed coefficients, and the variance-minimizing coefficient from covariance geometry.",
        principalObstacle:
          "A strongly correlated auxiliary variable helps only if its expectation is genuinely known and coefficient estimation is handled without hidden bias or optimistic efficiency claims.",
        entryPrerequisites: ["T22-M34-A03", "ARC517 covariance/correlation", "Basic quadratic minimization"],
        target:
          "Given a target variable Y and control C with known E[C], derive Y-b(C-E[C]), obtain the optimal population coefficient, estimate a practical coefficient with appropriate sample discipline, and compare variance reduction honestly.",
        requiredMastery: [
          "Prove the control adjustment preserves the target expectation for fixed b",
          "Derive the variance as a quadratic in b",
          "Derive b*=Cov(Y,C)/Var(C) when Var(C)>0",
          "Relate attainable reduction to correlation strength",
          "Explain the consequences of estimating b from the same versus separate pilot data",
          "Diagnose a control with uncertain or misspecified known mean",
          "Transfer the method to an unfamiliar simulated payoff with a plausible auxiliary control",
        ],
        applicationScope:
          "Monte Carlo problems with an auxiliary simulated quantity whose expectation is analytically known or independently established.",
        transferScope:
          "A new model where the learner must invent and justify a control rather than select one from a supplied list.",
        explicitlyOutOfScope: ["Regression-adjustment causal inference", "High-dimensional learned control variates"],
        nextArcBoundary:
          "A08 owns importance sampling: change the sampling law and correct the estimator with likelihood weights.",
      },
      "T22-M34-A08": {
        focus: "Importance sampling: sample from a proposal distribution and reweight correctly to estimate targets dominated by poorly sampled regions.",
        roleRelevance:
          "Rare events and tail-sensitive expectations can make naive Monte Carlo extremely inefficient; importance sampling can help dramatically but unstable weights can make estimates worse than brute force.",
        purpose:
          "Derive the change-of-measure identity for densities/PMFs, construct the weighted estimator and diagnose support mismatch and weight degeneracy.",
        principalObstacle:
          "Changing the sampling distribution changes the expectation unless every draw is corrected by the target-to-proposal likelihood ratio; even unbiased weighting can have catastrophic variance if the proposal undersamples important regions.",
        entryPrerequisites: ["T22-M34-A02-A04", "ARC517 densities/support", "Basic likelihood-ratio algebra"],
        target:
          "Derive and implement a simple importance-sampling estimator, justify its support conditions, inspect weight behavior and compare its effective efficiency with naive Monte Carlo on a tail-oriented target.",
        requiredMastery: [
          "Derive E_p[h(X)]=E_q[h(X)p(X)/q(X)] under explicit support/integrability conditions",
          "Construct the corresponding weighted Monte Carlo estimator",
          "Explain why q must be positive wherever the target integrand contributes materially",
          "Inspect maximum weights, dispersion or effective-weight concentration as instability diagnostics",
          "Design a proposal that deliberately oversamples an important region without excluding target support",
          "Construct a bad proposal whose weight variance makes estimation unstable",
          "Distinguish self-normalized weighting from the basic known-normalization estimator and avoid claiming they are identical",
          "Transfer proposal-design reasoning to an unfamiliar rare-event problem",
        ],
        applicationScope:
          "Tail probabilities and expectations where naive sampling allocates too few draws to regions that dominate the target.",
        transferScope:
          "A new rare-event or concentrated-integrand problem where the learner must reason about proposal support and weight stability before coding.",
        explicitlyOutOfScope: ["Sequential Monte Carlo", "Formal rare-event large-deviation theory", "MCMC change-of-measure methods"],
        nextArcBoundary:
          "A09 integrates target specification, sampling, error control, variance reduction and diagnostics into a defended Monte Carlo study.",
      },
      "T22-M34-A09": {
        focus: "Monte Carlo design and diagnostics lab: build, benchmark and adversarially defend a complete simulation study.",
        roleRelevance:
          "A production-quality research simulation must survive more than a successful run: the target, generator, estimator, uncertainty, computational budget and diagnostics must all align and remain reproducible.",
        purpose:
          "Integrate the module into one auditable simulation mission that compares naive and improved estimators under controlled cost and reports both precision gains and failure modes.",
        principalObstacle:
          "Variance-reduction methods can appear impressive because of cherry-picked seeds, incomparable compute budgets, unstable weights or incorrect error formulas; the final design must separate genuine estimator improvement from presentation artifacts.",
        entryPrerequisites: ["T22-M34-A01-A08", "ARC509 reproducibility discipline"],
        target:
          "Design and defend a complete Monte Carlo study for an unfamiliar target, including mathematical specification, reproducible generator, naive baseline, at least one justified variance-reduction method, uncertainty estimates, cost-normalized comparison, diagnostics and explicit failure criteria.",
        requiredMastery: [
          "Write the target integral/expectation and estimator before reporting results",
          "Validate the generator against analytic or structural checks",
          "Report Monte Carlo standard error alongside the estimate",
          "Compare naive and variance-reduced estimators at matched or explicitly normalized computational cost",
          "Use multiple seeds/batches to expose unstable conclusions without treating reruns as new empirical evidence",
          "Diagnose bias, dependence, heavy tails, support mismatch or weight degeneracy where relevant",
          "Preserve code/configuration/random-state provenance consistent with ARC509",
          "State what the simulation does not validate about the underlying real-world model",
          "Defend the design under an unfamiliar adversarial modification of payoff, tail region or computational budget",
        ],
        applicationScope:
          "A medium-complexity quantitative simulation such as nonlinear payoff expectation, risk/tail probability or synthetic probabilistic experiment with at least one meaningful variance-reduction opportunity.",
        transferScope:
          "A novel simulation target where the learner must choose the estimator and diagnostics independently and explain why each design choice remains mathematically valid.",
        explicitlyOutOfScope: ["MCMC convergence — ARC524 bridge only", "Time-series model simulation — ARC542", "Terminal market backtest design — ARC560"],
        nextArcBoundary:
          "ARC541 next owns multivariate random-vector geometry and covariance-matrix structure; later ARC524 provides the Markov-chain foundation needed before MCMC-style dependent Monte Carlo is treated as a separate technique.",
      },
    },
  };
}
