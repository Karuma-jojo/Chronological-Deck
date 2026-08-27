export function buildT22RichModule23(syllabusVersion) {
  return {
    moduleId: "ARC712",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build the probabilistic machinery that explains when empirical averages stabilize, when standardized sums become approximately Gaussian, why uncertainty commonly contracts at a square-root-n rate, how finite-sample concentration bounds certify deviations without asymptotic approximation, and exactly where these conclusions fail under heavy tails or dependence.",
    moduleDestination:
      "The learner can derive and distinguish LLN-, CLT- and concentration-style claims; standardize sums and averages correctly; justify or reject normal approximations from stated hypotheses; derive square-root-n scaling from variance structure; compute conservative moment-based and exponential tail bounds; and diagnose heavy-tail/dependence regimes where naive iid asymptotics are not defensible.",
    entryPrerequisites: [
      "ARC517 random variables and distributions: expectation, variance, covariance, independence and canonical families",
      "ARC504 estimator sampling distributions, variance and standard error",
      "Basic limits and convergence intuition from SIDE263",
      "Python/NumPy simulation from ARC515 when empirical verification is useful",
    ],
    explicitlyOutOfScope: [
      "Formal measure-theoretic almost-sure/probability/distribution convergence theory",
      "General dependent-process limit theorems, mixing conditions and martingale CLTs",
      "Stable laws and extreme-value theory in depth",
      "Hypothesis tests, p-values, power and multiple testing — ARC505",
      "Bootstrap/permutation asymptotics — ARC537",
      "Regression-specific asymptotics and robust covariance estimators — ARC539/later econometric work",
    ],
    arcs: {
      "T22-M23-A01": {
        focus: "Sums, averages and repeated sampling as random objects whose scale changes with sample size.",
        roleRelevance:
          "Nearly every backtest mean, forecast score and empirical moment is an aggregate of random observations; before invoking asymptotics, a researcher must know exactly how its center and dispersion transform under summation and averaging.",
        purpose:
          "Establish the algebraic backbone for later LLN, CLT and concentration arguments by deriving expectation and variance scaling for sums and sample means under explicit dependence assumptions.",
        principalObstacle:
          "A sum grows in location with n while an average preserves the target mean; variance adds only under the right covariance structure, so the familiar n and 1/n scalings are not assumption-free identities.",
        entryPrerequisites: ["ARC517 expectation, variance and covariance", "ARC504 sampling-distribution and standard-error reasoning"],
        target:
          "Given a finite collection of random variables, derive the expectation and variance of their sum/average, expose covariance terms rather than silently dropping them, and predict how repeated-sample dispersion changes with n under iid versus dependent designs.",
        requiredMastery: [
          "Derive E[sum Xi] and E[Xbar] using linearity of expectation",
          "Derive Var(sum Xi) with covariance terms and specialize correctly to independent observations",
          "Derive Var(Xbar)=sigma^2/n under iid finite-variance assumptions rather than quote it",
          "Explain why averaging changes dispersion without changing the common mean",
          "Construct a dependence counterexample where the iid 1/n variance law fails",
          "Use simulation to distinguish sum scale from average scale without treating simulation as proof",
          "Transfer the aggregate-scaling logic to an unfamiliar empirical statistic built from repeated observations",
        ],
        applicationScope:
          "Sample means, cumulative returns or losses, repeated forecast errors and other additive empirical summaries under explicitly stated covariance assumptions.",
        transferScope:
          "A new aggregate where the learner must reconstruct center and dispersion from first principles before invoking any asymptotic theorem.",
        explicitlyOutOfScope: ["Law of Large Numbers", "Central Limit Theorem", "Tail inequalities beyond elementary variance reasoning"],
        nextArcBoundary:
          "A02 owns probabilistic stabilization of averages: the Law of Large Numbers.",
      },
      "T22-M23-A02": {
        focus: "Law of Large Numbers as convergence of empirical averages to their population mean under stated conditions.",
        roleRelevance:
          "Quant research depends on empirical averages behaving like population quantities; LLN reasoning clarifies what increasing sample size can and cannot repair.",
        purpose:
          "Turn the shrinking variance of suitable sample means into a controlled probabilistic statement that averages concentrate around their expectation, while separating stabilization from normality or finite-sample accuracy guarantees.",
        principalObstacle:
          "The LLN is not a claim that every long sample is close, that observations themselves become less variable, or that the sampling distribution becomes Gaussian; it is a convergence statement whose validity depends on the data-generating structure.",
        entryPrerequisites: ["T22-M23-A01", "ARC517 probability and variance", "SIDE263 convergence intuition"],
        target:
          "State and justify a working weak LLN for iid finite-variance observations, derive it via Chebyshev reasoning when appropriate, and identify cases where its assumptions or interpretation fail.",
        requiredMastery: [
          "State a precise tolerance-probability form of a working weak LLN",
          "Derive P(|Xbar-mu|>=epsilon) <= sigma^2/(n epsilon^2) under iid finite variance",
          "Explain why this implies probabilistic stabilization of the sample mean",
          "Distinguish LLN convergence from unbiasedness, low finite-sample error and asymptotic normality",
          "Construct or analyze a case where systematic sampling bias is not repaired by larger n",
          "Identify heavy-tail or dependence features that make the simple proof unavailable",
          "Transfer LLN logic to an unfamiliar empirical average while stating the required assumptions",
        ],
        applicationScope:
          "Repeated-sample averages of returns, losses, indicators or simulation outputs under transparent iid/finite-variance assumptions.",
        transferScope:
          "A new averaging procedure where the learner must decide whether increasing n justifies convergence to the intended target and what theorem actually supports that claim.",
        explicitlyOutOfScope: ["Strong LLN proofs", "Ergodic theorems", "Mixing-process LLNs", "Central Limit Theorem"],
        nextArcBoundary:
          "A03 owns distributional shape after centering and square-root-n scaling: the Central Limit Theorem.",
      },
      "T22-M23-A03": {
        focus: "Central Limit Theorem as a distributional approximation for standardized sums/means.",
        roleRelevance:
          "Normal approximations underlie approximate standard errors, confidence procedures and many research diagnostics, but only when the standardized aggregate is in a regime where a CLT is defensible.",
        purpose:
          "Establish what the CLT actually approximates, why centering and square-root-n scaling are essential, and how it differs logically from the LLN.",
        principalObstacle:
          "The CLT does not say raw data become normal or that sample means converge to a normal random variable without rescaling; it describes the limiting distribution of a centered, standardized aggregate under hypotheses.",
        entryPrerequisites: ["T22-M23-A01-A02", "ARC517 normal distribution and standardization", "ARC504 sampling distributions"],
        target:
          "State a working iid finite-variance CLT, transform it correctly between standardized sums and sample means, and use simulation/diagnostics to assess approximation quality without mistaking finite-n resemblance for theorem validity.",
        requiredMastery: [
          "State the standardized sample-mean CLT with the correct centering and sigma/sqrt(n) scale",
          "Rewrite the theorem equivalently for sums",
          "Distinguish convergence in distribution from LLN-style concentration of Xbar around mu",
          "Explain why non-normal observations can still yield approximately normal standardized means",
          "Diagnose the false claim that the observations themselves become normal as n grows",
          "Compare approximation quality across skewed/light-tailed examples at increasing n",
          "Identify assumptions whose failure blocks the elementary iid CLT being invoked",
        ],
        applicationScope:
          "Approximate distributions of iid finite-variance sample means and sums, including non-Gaussian source distributions.",
        transferScope:
          "A new aggregate where the learner must determine the correct centering/scaling and whether an iid CLT is a defensible approximation tool.",
        explicitlyOutOfScope: ["Berry-Esseen constants", "Lindeberg-Feller theory", "Dependent-data CLTs", "Stable-law limits"],
        nextArcBoundary:
          "A04 owns operational standardization and normal approximation, including continuity/tail checks and the distinction between theorem and approximation quality.",
      },
      "T22-M23-A04": {
        focus: "Standardization and normal approximation as an auditable finite-sample procedure.",
        roleRelevance:
          "Researchers routinely convert estimated means into z-like scales; doing so responsibly requires correct units, tail mapping, parameter treatment and approximation diagnostics rather than automatic Gaussian lookup.",
        purpose:
          "Translate CLT structure into practical probability approximations while making every centering, scaling and tail event explicit.",
        principalObstacle:
          "A normal approximation can be algebraically correct but scientifically poor if n is too small, tails are too heavy, dependence is ignored or unknown scale is silently replaced without acknowledging the extra estimation step.",
        entryPrerequisites: ["T22-M23-A03", "ARC517 CDF/normal distribution", "ARC504 standard error"],
        target:
          "Standardize sample-mean events, map them to approximate normal probabilities or quantiles under explicit assumptions, and audit the approximation rather than treating z-conversion as universally valid.",
        requiredMastery: [
          "Convert an event about Xbar into the corresponding standardized z-event",
          "Preserve inequality direction and tail orientation through standardization",
          "Compute approximate central/tail probabilities from a stated CLT regime",
          "Distinguish known population scale from a plug-in estimated standard error",
          "Check whether skewness, discreteness, tail behavior or sample size makes the approximation questionable",
          "Compare exact/simulated and normal-approximate probabilities in a tractable case",
          "Reject an approximation whose assumptions are materially unsupported even if the arithmetic is easy",
        ],
        applicationScope:
          "Finite-n probability and quantile approximations for sample means/proportions or other explicitly CLT-supported aggregates.",
        transferScope:
          "An unfamiliar approximation request where the learner must first establish the standardized object and defend whether Gaussian approximation is fit for purpose.",
        explicitlyOutOfScope: ["Formal hypothesis testing and p-values — ARC505", "Student-t theory in depth", "Bootstrap approximations — ARC537"],
        nextArcBoundary:
          "A05 owns the square-root-n scaling law itself and the practical diminishing returns of collecting more effectively independent observations.",
      },
      "T22-M23-A05": {
        focus: "The square-root-n law for standard errors and signal-to-noise scaling.",
        roleRelevance:
          "Sample-size planning and interpretation of backtest precision depend on knowing that independent information often accumulates with diminishing returns: halving standard error typically needs about four times as many observations.",
        purpose:
          "Derive square-root-n scaling from variance addition and expose exactly why it is an iid/effective-sample-size statement rather than a universal law of more data.",
        principalObstacle:
          "The 1/sqrt(n) standard-error rate follows from variance structure, not from the CLT itself; dependence, heteroskedasticity and changing populations can make calendar observation count very different from effective information count.",
        entryPrerequisites: ["T22-M23-A01", "ARC504 standard error", "T22-M23-A03 for asymptotic context"],
        target:
          "Derive the square-root-n uncertainty law, invert it for sample-size ratios, and diagnose when nominal n overstates independent information.",
        requiredMastery: [
          "Derive SE(Xbar)=sigma/sqrt(n) under iid finite-variance assumptions",
          "Show algebraically why multiplying n by k shrinks SE by 1/sqrt(k)",
          "Compute the sample-size factor required for a target precision improvement",
          "Explain why the rate comes from variance scaling rather than Gaussian shape",
          "Construct a perfectly correlated counterexample where increasing nominal n adds no variance reduction",
          "Relate positive serial dependence qualitatively to reduced effective sample size",
          "Transfer the scaling logic to simulation budget, experiment design or repeated-return estimation",
        ],
        applicationScope:
          "Precision/sample-size trade-offs for simple averages or Monte Carlo-style estimators under effectively independent observations.",
        transferScope:
          "A new data-collection setting where nominal sample count must be translated into a defensible information/precision claim.",
        explicitlyOutOfScope: ["Formal power calculations — ARC505", "Time-series HAC/effective-sample-size formulas in depth", "Optimal experimental design"],
        nextArcBoundary:
          "A06 owns finite-sample deviation certificates that require only nonnegativity or moments rather than asymptotic normality.",
      },
      "T22-M23-A06": {
        focus: "Markov and Chebyshev inequalities as assumption-light finite-sample deviation bounds.",
        roleRelevance:
          "When distributional shape is unknown or Gaussian approximation is indefensible, moment-based inequalities provide conservative but auditable guarantees that expose exactly what information is being used.",
        purpose:
          "Derive Markov's inequality from nonnegativity and Chebyshev's inequality from Markov applied to squared deviation, then interpret both as worst-case certificates rather than expectedly tight forecasts.",
        principalObstacle:
          "These bounds are deliberately distribution-agnostic and can be very loose; their value is guaranteed validity under weak assumptions, not predictive sharpness.",
        entryPrerequisites: ["ARC517 expectation and variance", "Basic event/probability inequalities from ARC048"],
        target:
          "Derive and apply Markov/Chebyshev bounds, state their assumptions exactly, compare them with actual probabilities in known distributions, and recognize when looseness is the price of weak assumptions.",
        requiredMastery: [
          "Prove Markov's inequality for a nonnegative random variable",
          "Derive Chebyshev's inequality by applying Markov to (X-mu)^2",
          "Apply both bounds with correct units and thresholds",
          "Use Chebyshev to recover a finite-n LLN-style bound for the iid sample mean",
          "Compare a bound with an exact or simulated tail probability and explain the gap",
          "Identify why Markov is invalid if its nonnegativity requirement is ignored",
          "Transfer moment-bound reasoning to an unfamiliar risk or error quantity",
        ],
        applicationScope:
          "Finite-sample upper bounds on losses, deviations, estimation error or simulation quantities when only means/variances are defensible.",
        transferScope:
          "A new random quantity where the learner must decide whether nonnegativity or finite variance is enough to obtain a rigorous bound.",
        explicitlyOutOfScope: ["Chernoff method derivations in full generality", "Sub-Gaussian theory in depth", "Martingale inequalities"],
        nextArcBoundary:
          "A07 owns exponentially sharper concentration when boundedness or similarly strong tail structure is genuinely available.",
      },
      "T22-M23-A07": {
        focus: "Exponential concentration for bounded independent observations, with Hoeffding-style guarantees.",
        roleRelevance:
          "Researchers need finite-sample control stronger than Chebyshev when data or simulation outputs are genuinely bounded; exponential tails explain why moderate deviations can become rapidly unlikely.",
        purpose:
          "Introduce the structural leap from moment-only polynomial bounds to exponential concentration under stronger assumptions, using a Hoeffding-style bound as the operational exemplar.",
        principalObstacle:
          "Exponential concentration is not free: boundedness and independence (or other specific structure) do the work. Applying a sharp-looking bound after violating those assumptions is worse than using a loose valid bound.",
        entryPrerequisites: ["T22-M23-A06", "Exponentials/logarithms", "Independence from ARC517"],
        target:
          "Apply and invert a Hoeffding-style bound for bounded independent averages, compare its scaling with Chebyshev, and audit whether the required support/dependence assumptions are actually justified.",
        requiredMastery: [
          "State a Hoeffding-style two-sided deviation bound for independent bounded observations with explicit ranges",
          "Specialize the bound to iid observations in a common interval",
          "Solve the bound for epsilon, n or a target failure probability",
          "Compare exponential-in-n decay with Chebyshev's 1/n-type guarantee in a matched problem",
          "Explain why a boundedness assumption cannot be inferred merely from a finite observed sample",
          "Diagnose invalid use under dependence or unbounded heavy-tailed data",
          "Transfer concentration reasoning to bounded indicators, clipped losses or simulation outputs",
        ],
        applicationScope:
          "Independent bounded observations such as indicators, bounded scores or deliberately bounded simulation quantities where finite-sample guarantees matter.",
        transferScope:
          "A new finite-sample guarantee request where the learner must choose between weak moment bounds and stronger exponential concentration based on defensible assumptions.",
        explicitlyOutOfScope: ["Full Chernoff/MGF machinery", "Bernstein/Bennett/sub-exponential families", "Dependent-data concentration"],
        nextArcBoundary:
          "A08 owns failure analysis: what heavy tails, dependence and nonstationarity do to LLN/CLT/concentration heuristics.",
      },
      "T22-M23-A08": {
        focus: "Heavy tails, dependence and asymptotic failure as explicit threats to naive large-sample reasoning.",
        roleRelevance:
          "Financial data are often dependent, regime-changing and heavy-tailed; treating iid finite-variance asymptotics as automatic can manufacture false precision and invalid research conclusions.",
        purpose:
          "Integrate the module by diagnosing which earlier result fails, weakens or needs replacement when variance is unstable/infinite, observations are dependent, or the data-generating law changes.",
        principalObstacle:
          "'Large n' is not a universal solvent. The theorem invoked matters, its assumptions matter, and nominal sample size can be almost irrelevant when tails or dependence destroy the mechanism that delivered concentration or Gaussian approximation.",
        entryPrerequisites: ["T22-M23-A01-A07", "ARC517 tail/distribution reasoning", "ARC503 sampling mechanisms"],
        target:
          "Given an empirical data-generating story, identify which LLN/CLT/concentration claims are justified, which are not, what diagnostic evidence would matter, and what narrower claim can still be defended without importing advanced stochastic-process theory.",
        requiredMastery: [
          "Separate failure of finite variance from failure of independence and failure of stationarity",
          "Explain why infinite/poorly behaved variance undermines variance-based standard errors and the elementary finite-variance CLT",
          "Construct a dependence example where nominal n grossly overstates information",
          "Explain why a regime shift can invalidate convergence to the historical target even with many observations",
          "Audit a research claim that says only 'n is large, therefore normal approximation is safe'",
          "Propose defensible diagnostics or sensitivity analyses without pretending they prove iid assumptions",
          "State clearly when advanced dependent/heavy-tail theory is required and defer it rather than inventing certainty",
          "Transfer the full assumption-audit framework to an unfamiliar empirical or simulation setting",
        ],
        applicationScope:
          "Return series, clustered observations, heavy-tailed losses, changing regimes and other settings where textbook iid asymptotics may be scientifically fragile.",
        transferScope:
          "A new dataset description where the learner must choose and defend the strongest valid probabilistic claim rather than reflexively invoking LLN or CLT.",
        explicitlyOutOfScope: ["Stable-law derivations", "Mixing/martingale limit theory", "HAC estimators", "Extreme-value theory", "Full time-series dependence modelling — later modules"],
        nextArcBoundary:
          "M24 / ARC505 owns formal hypothesis testing and power; later time-series/stochastic modules own dependence-specific probabilistic machinery.",
      },
    },
  };
}
