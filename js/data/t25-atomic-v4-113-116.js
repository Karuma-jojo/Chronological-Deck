// Individually authored T25 M.Stat audited-v4 cards 113-116.
export const T25_ATOMIC_V4_113_116 = [
  {
    id: "T25-ARC829-A1113",
    routeOrder: 113,
    syllabusCode: "L2.1",
    targetCode: "L2",
    parentId: "ARC829",
    title: "State WLLN and prove one iid-average consistency claim.",
    focus: "State convergence in probability and the weak law precisely, then prove consistency of an iid sample average under the audited moment assumptions rather than invoking a vague law-of-large-numbers slogan.",
    purpose: "Turn finite-sample probability bounds into a formal asymptotic statement while keeping the estimator, target, assumptions and mode of convergence explicit.",
    centralCapability: "Prove that an iid average converges in probability to its population mean and identify exactly which assumptions justify the argument used.",
    principalObstacle: "Confusing almost-sure convergence with convergence in probability, omitting the finite-mean assumption, or treating unbiasedness by itself as a proof of consistency.",
    entryPrerequisites: ["L1 Markov/Chebyshev bounds", "N1 sample averages and moments", "P3 probability events"],
    requiredOwnership: [
      "State convergence in probability using an epsilon probability statement",
      "State the iid WLLN with a finite absolute mean assumption",
      "Identify the probability limit and the estimator sequence before calculating",
      "Prove a sample-average consistency claim by WLLN or by a valid vanishing-variance argument when stronger moments are available",
      "Distinguish unbiasedness from consistency",
      "Explain why a finite-variance Chebyshev proof is sufficient but not the only route to the audited WLLN statement",
      "Keep the target parameter fixed while n changes"
    ],
    inScope: [
      "Convergence in probability",
      "Consistency of iid sample averages",
      "WLLN under finite absolute mean",
      "Chebyshev/MSE consistency proofs when finite variance is available"
    ],
    outOfScope: [
      "Strong law of large numbers",
      "General modes of weak convergence",
      "Ergodic theorems",
      "Triangular-array laws of large numbers"
    ],
    applicationScope: "Entrance problems asking whether a simple average or similarly structured estimator approaches its target in probability and requiring assumptions to be stated rather than hidden.",
    transferScope: "A new iid estimator that can be rewritten as an average or a term plus a vanishing error, requiring the learner to choose a legal consistency argument rather than pattern-match notation.",
    exitCondition: "Given an iid sample-average estimator, state the target and convergence mode, verify the required moment assumptions, and produce a complete proof of consistency with no appeal to unbiasedness alone.",
    nextArcBoundary: "114 L2.2 removes the iid safety net and asks for a valid probability-level consistency argument when overlap or dependence changes the usual concentration calculation."
  },
  {
    id: "T25-ARC829-A1114",
    routeOrder: 114,
    syllabusCode: "L2.2",
    targetCode: "L2",
    parentId: "ARC829",
    title: "Prove or refute consistency when terms overlap or remain correlated.",
    focus: "Analyse an estimator built from overlapping or dependent terms by tracking its actual error structure. Use expectation, covariance, variance or MSE when they provide valid sufficient control, but make the final consistency decision from convergence in probability rather than from moment behaviour alone.",
    purpose: "Prevent illegal iid-WLLN applications and a subtler error: moments can be useful for proving concentration, but nonvanishing bias or variance does not by itself refute convergence in probability without additional assumptions.",
    centralCapability: "For a dependent or overlapping estimator T_n of a fixed target theta, prove consistency by showing P(|T_n-theta|>epsilon)→0 for every epsilon>0—possibly via a justified MSE/Chebyshev bound—or refute consistency by exhibiting some fixed epsilon>0 for which the error probability stays bounded away from zero along an infinite subsequence; use moment calculations only in directions that are logically valid.",
    principalObstacle: "The learner may correctly discover overlap or persistent covariance and then overreach: MSE→0 is sufficient for consistency, but failure of variance or bias to vanish is not a general converse because rare large errors can keep moments large while their probabilities vanish.",
    entryPrerequisites: ["L2.1 convergence in probability and WLLN", "J2 covariance and variance of sums", "L1 finite-sample probability bounds"],
    requiredOwnership: [
      "Identify shared observations or other dependence among summands before applying any iid law",
      "Compute covariance contributions rather than replacing them by zero when a second-moment route is being used",
      "Write Var of an average with all diagonal and off-diagonal terms when those moments are finite and relevant",
      "Use E[(T_n-theta)^2]→0, or equivalently vanishing MSE, as a sufficient route to T_n→theta in probability via Markov/Chebyshev",
      "When using bias and variance, require both bias→0 and variance→0 to obtain MSE→0; vanishing variance alone may concentrate around the wrong mean",
      "Refute consistency only with a valid probability-level obstruction, for example a fixed epsilon>0 and an infinite subsequence n_k with P(|T_{n_k}-theta|>epsilon) bounded below by a positive constant, or an equivalent direct contradiction to convergence in probability",
      "Treat persistent bias or nonvanishing variance as a diagnostic that demands further analysis, not as an automatic inconsistency certificate unless extra assumptions making the converse valid are explicitly supplied",
      "Explain a rare-large-error counterexample in which T_n→theta in probability while a first or second moment fails to converge appropriately, showing why moment nonconvergence alone is insufficient",
      "Explain why asymptotic unbiasedness alone is also insufficient for consistency",
      "Recognise when regrouping into genuinely independent blocks is legal and when overlap prevents it"
    ],
    inScope: [
      "Overlapping-window averages",
      "Repeated-use estimators",
      "Persistent-correlation examples",
      "Direct epsilon-probability proofs and refutations of consistency",
      "MSE/Chebyshev as sufficient consistency tools",
      "Moment nonconvergence as a warning rather than a general converse"
    ],
    outOfScope: [
      "Mixing conditions",
      "Martingale convergence theorems",
      "General dependent-process LLNs",
      "Long-memory asymptotic theory",
      "Uniform-integrability theory except a brief note that extra assumptions can restore some moment converses"
    ],
    applicationScope: "Entrance questions where an estimator resembles an average but its terms reuse observations or remain correlated, forcing the learner to justify concentration directly rather than invoking an iid theorem or reading consistency off its moments.",
    transferScope: "An unfamiliar dependent statistic where covariance calculations may reveal useful structure but the learner must still decide the convergence-in-probability question with a logically sufficient proof or a genuine fixed-epsilon obstruction.",
    exitCondition: "For one dependent or overlapping estimator, identify the dependence structure, derive any relevant finite moments without dropping covariance terms, and then independently prove consistency by a valid probability bound or refute it by a fixed-epsilon nonvanishing error probability; explicitly explain why nonvanishing bias or variance alone would not settle the question.",
    nextArcBoundary: "115 L3.1 strengthens asymptotic control from convergence in probability to a correctly centred and square-root-scaled normal approximation."
  },
  {
    id: "T25-ARC829-A1115",
    routeOrder: 115,
    syllabusCode: "L3.1",
    targetCode: "L3",
    parentId: "ARC829",
    title: "Centre/scale a sum and calibrate a normal quantile.",
    focus: "Apply the iid finite-positive-variance central limit theorem with the exact centring and square-root scaling, then convert a probability or quantile request into the corresponding standard-normal approximation.",
    purpose: "Make CLT use structurally correct: identify the sum's mean and variance first, standardise second, and mark the resulting statement as an approximation or limit rather than an exact finite-sample law.",
    centralCapability: "Construct the standardised statistic (S_n-nmu)/(sigma sqrt(n)) or its average equivalent and use a normal quantile with the correct direction and scale.",
    principalObstacle: "Using n instead of sqrt(n), centring at the wrong value, forgetting the variance factor, or reporting an asymptotic normal approximation as an exact distribution produces deceptively tidy errors.",
    entryPrerequisites: ["L2 convergence in probability", "D3 normal standardisation", "N1 means and variances of sums"],
    requiredOwnership: [
      "State the iid finite-positive-variance CLT assumptions",
      "Compute the exact finite-sample mean and variance of the sum or average",
      "Centre by n mu for sums or mu for averages",
      "Scale by sigma sqrt(n) for sums or sigma/sqrt(n) for averages",
      "Translate the target event into a standard-normal inequality without reversing signs",
      "Use an appropriate normal quantile and clearly label the result as asymptotic or approximate",
      "Apply continuity correction when approximating a lattice probability and the problem warrants it"
    ],
    inScope: [
      "iid finite-variance sums and averages",
      "Normal approximation to lattice sums with continuity correction",
      "Quantile calibration from a CLT approximation",
      "Differences of independent sums after mean/variance aggregation"
    ],
    outOfScope: [
      "Berry-Esseen error bounds",
      "Stable-law limits",
      "General triangular-array CLTs",
      "Functional central limit theorems"
    ],
    applicationScope: "Entrance problems requiring a limiting normal law or approximate tail/quantile for a large iid sum or average after correct finite-sample mean and variance bookkeeping.",
    transferScope: "A new sum or difference of independent blocks where the learner must derive the combined centring and scaling before invoking a normal approximation.",
    exitCondition: "Given an iid sum or average, state the CLT assumptions, derive the exact centring and square-root scaling, obtain the requested normal approximation or quantile, and mark its asymptotic status explicitly.",
    nextArcBoundary: "116 L3.2 tests whether a nonstandard statistic can be reduced to independent blocks or a consistent plug-in without invoking general weak-convergence machinery."
  },
  {
    id: "T25-ARC829-A1116",
    routeOrder: 116,
    syllabusCode: "L3.2",
    targetCode: "L3",
    parentId: "ARC829",
    title: "Justify a block grouping or consistent plug-in approximation.",
    focus: "Extend an elementary CLT argument by grouping genuinely independent blocks or replacing an unknown deterministic scale with a consistent plug-in term through a stated Slutsky/continuous-mapping step.",
    purpose: "Handle the mild asymptotic manipulations that appear in entrance problems without smuggling in unjustified independence or an oversized weak-convergence toolkit.",
    centralCapability: "Reduce a structured statistic to a standard CLT plus a legal consistency argument, while stating precisely why blocking or plug-in replacement preserves the limiting conclusion.",
    principalObstacle: "Grouping overlapping blocks as though they were independent, replacing a random denominator merely because it looks stable, or invoking Slutsky without first establishing the required probability limit invalidates the approximation.",
    entryPrerequisites: ["L3.1 iid CLT standardisation", "L2 consistency", "J2 covariance and independence"],
    requiredOwnership: [
      "Verify that proposed blocks are independent before applying a blockwise CLT",
      "Compute each block contribution's mean and variance on the chosen scale",
      "Establish convergence in probability of every plug-in term before replacement",
      "Use an elementary Slutsky or continuous-mapping statement only after its ingredients are proved",
      "Keep random-denominator limits away from zero when division is used",
      "Distinguish an exact algebraic regrouping from an asymptotic approximation",
      "State the final limiting distribution with its centring and scale intact"
    ],
    inScope: [
      "Independent block regrouping",
      "Consistent variance or scale plug-ins",
      "Elementary Slutsky arguments",
      "Simple continuous mappings of consistent quantities"
    ],
    outOfScope: [
      "General weak-convergence theory",
      "Delta method beyond elementary continuous mappings",
      "Dependent-block CLTs",
      "Empirical-process asymptotics"
    ],
    applicationScope: "Entrance problems where a statistic is almost a standard CLT form except for independent grouping or a nuisance scale that can be replaced by a consistent estimate.",
    transferScope: "An unfamiliar asymptotic statistic requiring the learner to decide whether its blocks are truly independent and whether each plug-in replacement is justified in probability.",
    exitCondition: "For a structured asymptotic statistic, justify the block decomposition or plug-in convergence, apply the appropriate elementary CLT/Slutsky step, and state the limiting law without hiding any legality condition.",
    nextArcBoundary: "117 O4.1 returns to order statistics and expresses a sample-quantile tail event as an empirical-count event before any asymptotic limit is taken."
  }
];
