// Individually authored T25 M.Stat audited-v4 cards 119-122.
export const T25_ATOMIC_V4_119_122 = [
  {
    id: "T25-ARC830-A1119",
    routeOrder: 119,
    syllabusCode: "E1.1",
    targetCode: "E1",
    parentId: "ARC830",
    title: "Compute bias, variance and MSE of one estimator.",
    focus: "Compute an estimator's expectation, bias, variance and mean squared error under the sampling law actually specified, using direct, factorial, transformed or dependent-sum moments only when justified.",
    purpose: "Make estimator quality a calculation under a probability model rather than a label, and establish the exact decomposition linking variance, bias and squared-error risk.",
    centralCapability: "Starting from a stated estimator and sampling distribution, derive its bias, variance and MSE correctly and audit every moment, covariance and parameter dependence used in the calculation.",
    principalObstacle: "Substituting memorised moments from the wrong parameterisation, silently assuming independence inside a variance, or comparing estimators by bias alone can produce a polished but irrelevant risk calculation.",
    entryPrerequisites: ["J2 expectation, variance and covariance", "N1 sample statistics", "D3 standard distribution moments"],
    requiredOwnership: [
      "Define bias as E_theta[T]-theta, or relative to the stated estimand rather than automatically to a raw model parameter",
      "Compute E_theta[T] from the actual sampling law and parameterisation",
      "Compute Var_theta(T) with covariance terms retained whenever summands are dependent",
      "Derive or verify MSE_theta(T)=Var_theta(T)+Bias_theta(T)^2 when the required second moments are finite",
      "Use factorial or transformed moments when they shorten the calculation without changing the estimand",
      "Keep n and theta visible so finite-sample and parameter-dependent behaviour is not lost",
      "State when an expectation, variance or MSE is undefined instead of manipulating a nonexistent moment"
    ],
    inScope: [
      "Bias, variance and mean squared error under a specified sampling law",
      "Sample means, counts and simple transformed estimators",
      "Factorial-moment or transformed-moment calculations",
      "Dependent-sum variance expansions when dependence is supplied"
    ],
    outOfScope: [
      "General decision-theoretic loss functions beyond squared error",
      "Bayes risk and prior averaging",
      "Asymptotic efficiency theory",
      "Minimax estimation"
    ],
    applicationScope: "Entrance problems asking whether a proposed estimator is biased, how variable it is, or what its exact squared-error risk is for a given parameter and sample size.",
    transferScope: "An unfamiliar estimator built from dependent or transformed sample quantities where the learner must reconstruct moments from the model instead of using a canned variance formula.",
    exitCondition: "For one estimator under a fully stated sampling model, compute bias, variance and MSE from first principles, retain every dependence term and parameter restriction, and verify the MSE decomposition.",
    nextArcBoundary: "120 E1.2 turns those separate risk calculations into a parameter- and sample-size-aware comparison between competing estimators."
  },
  {
    id: "T25-ARC830-A1120",
    routeOrder: 120,
    syllabusCode: "E1.2",
    targetCode: "E1",
    parentId: "ARC830",
    title: "Compare two candidates, preserving dependence and parameter ranges.",
    focus: "Compare two estimators by exact MSE over the admissible parameter and sample-size ranges, preserving covariance structure and solving the resulting risk inequality rather than declaring one estimator globally better without proof.",
    purpose: "Train the exam-relevant skill of turning bias-variance trade-offs into explicit regions where each estimator is preferable, including ties and boundary cases.",
    centralCapability: "Derive both MSE functions on a common parameter space, compare them algebraically and report the exact theta/n regions in which one estimator has smaller, equal or larger squared-error risk.",
    principalObstacle: "A lower variance or smaller absolute bias need not mean lower MSE, and cancelling parameter-dependent terms or ignoring covariance can reverse the winner on part of the parameter space.",
    entryPrerequisites: ["E1.1 exact bias/variance/MSE", "F2 inequality solution sets", "J2 covariance-aware variance"],
    requiredOwnership: [
      "Put both estimators under the same stated sampling model and estimand before comparing them",
      "Compute each MSE with any dependence or covariance contribution retained",
      "Form the exact risk difference or inequality instead of comparing bias and variance separately by eye",
      "Solve the inequality only on the legal parameter and sample-size domain",
      "Identify crossing points, equality cases and boundary values explicitly",
      "Explain a genuine bias-variance trade-off when the preferred estimator changes with theta or n",
      "Refuse a global dominance claim when the risk ordering is parameter dependent"
    ],
    inScope: [
      "Exact finite-sample MSE comparison",
      "Parameter-dependent risk ordering",
      "Sample-size thresholds and equality cases",
      "Comparisons involving dependent statistics when covariance is known or derivable"
    ],
    outOfScope: [
      "General admissibility theory",
      "Minimax estimators",
      "Bayesian estimator comparison",
      "Asymptotic relative efficiency as a substitute for exact MSE"
    ],
    applicationScope: "Entrance questions asking which of two candidate estimators is better under squared-error loss and for which parameter values or sample sizes that conclusion holds.",
    transferScope: "A new estimator pair whose risk curves cross, requiring the learner to discover the comparison regions rather than assume an unbiased estimator must dominate a biased one.",
    exitCondition: "Given two estimators, derive their exact MSEs, preserve all dependence terms, solve the MSE comparison over the admissible theta/n domain, and report every strict and equality region correctly.",
    nextArcBoundary: "121 E2.1 leaves risk comparison and begins construction of estimators by equating population moments to their empirical counterparts."
  },
  {
    id: "T25-ARC832-A1121",
    routeOrder: 121,
    syllabusCode: "E2.1",
    targetCode: "E2",
    parentId: "ARC832",
    title: "Construct a one-parameter moment estimator.",
    focus: "Construct a one-parameter method-of-moments estimator by choosing an identifying population moment, equating it to the corresponding empirical moment, solving for the parameter and checking the model's admissible parameter space.",
    purpose: "Teach method of moments as an estimating equation derived from the model, not as a memorised formula or a disguised likelihood calculation.",
    centralCapability: "Select a useful population moment, compute it under the model, match it to the sample analogue and solve for a legal one-parameter estimator while keeping identifiability and admissibility visible.",
    principalObstacle: "Matching the wrong empirical quantity, using a moment that does not identify the parameter, or accepting a formal algebraic solution outside the parameter space can create an estimator that is not actually valid for the model.",
    entryPrerequisites: ["D1 discrete distribution moments", "D4 gamma/beta and moment calculations", "J1 expectations of statistics; J2 variance algebra"],
    requiredOwnership: [
      "Choose a population moment whose value depends on the unknown parameter and can identify it on the stated model space",
      "Compute that theoretical moment with the correct distribution parameterisation",
      "Match it to the corresponding empirical raw or factorial moment rather than an unrelated sample summary",
      "Solve the resulting estimating equation and retain all algebraically possible roots until admissibility is checked",
      "Check the estimator against positivity, probability, integer or other model constraints",
      "Recognise when the moment equation has no admissible solution for a particular sample",
      "Distinguish the method-of-moments construction from maximising a likelihood"
    ],
    inScope: [
      "One-parameter method-of-moments estimation",
      "Raw or simple factorial moment matching",
      "Count and standard one-parameter distribution models",
      "Admissibility and identifiability checks"
    ],
    outOfScope: [
      "Generalised method of moments",
      "Optimal estimating equations",
      "Likelihood maximisation",
      "Bayesian moment matching"
    ],
    applicationScope: "Entrance problems where a distribution or finite count model supplies a simple parameter-dependent moment and the estimator must be constructed rather than recalled.",
    transferScope: "An unfamiliar one-parameter model where the learner must decide which tractable moment identifies the parameter and whether the formal solution is legal for the observed sample.",
    exitCondition: "For a one-parameter model, derive a method-of-moments estimating equation from a valid population/sample moment pair, solve it and certify that the resulting estimator lies in the admissible parameter space when defined.",
    nextArcBoundary: "122 E2.2 extends moment matching to two equations or finite-population/count constraints, where multiple roots and inadmissible formal solutions become central."
  },
  {
    id: "T25-ARC832-A1122",
    routeOrder: 122,
    syllabusCode: "E2.2",
    targetCode: "E2",
    parentId: "ARC832",
    title: "Solve a two-moment or finite-population problem and check admissibility.",
    focus: "Solve a two-parameter or finite-population method-of-moments problem from enough identifying moments, then audit all roots against positivity, ordering, discreteness and sample-implied feasibility constraints.",
    purpose: "Prevent formal equation solving from being mistaken for estimation by making parameter-space admissibility an inseparable part of multi-moment construction.",
    centralCapability: "Build and solve a coupled moment system, interpret each algebraic candidate in the original statistical model and retain only solutions that satisfy every model and observation constraint.",
    principalObstacle: "Two moment equations can create extraneous, swapped or inadmissible roots; finite-population parameters may also require integer or sample-size constraints that ordinary algebra does not enforce.",
    entryPrerequisites: ["E2.1 one-parameter method of moments", "F2 solution-set discipline", "A1 polynomial/root algebra"],
    requiredOwnership: [
      "Choose two population moments that jointly identify the two unknown parameters when the model permits it",
      "Match each theoretical moment to the correct empirical counterpart with consistent normalisation",
      "Solve the coupled equations without discarding alternative algebraic roots prematurely",
      "Check positivity, ordering, support and any integer or finite-population constraints after solving",
      "Detect samples for which the formal moment equations have no admissible model parameter",
      "Explain when two roots represent the same model up to label symmetry and when they do not",
      "Keep method of moments conceptually separate from an MLE even if the numerical answers happen to coincide"
    ],
    inScope: [
      "Two-parameter moment estimators",
      "Finite-population or count-model moment equations",
      "Multiple-root and admissibility analysis",
      "Samples producing boundary or impossible formal solutions"
    ],
    outOfScope: [
      "High-dimensional method of moments",
      "Generalised method of moments weighting matrices",
      "Numerical nonlinear estimation algorithms",
      "Asymptotic covariance theory for moment estimators"
    ],
    applicationScope: "Entrance problems requiring simultaneous recovery of two model parameters or a population/count parameter from empirical moments, with model constraints deciding which algebraic solution is meaningful.",
    transferScope: "A new two-moment system whose formal solution includes impossible parameter values, forcing the learner to use the statistical parameter space rather than algebra alone to finish the problem.",
    exitCondition: "Construct and solve the required two-moment or finite-population estimating system, list all algebraic candidates, and justify exactly which candidates are admissible under the model and observed sample.",
    nextArcBoundary: "123 E3.1 begins likelihood: write and maximise the likelihood for the observations actually recorded, including support indicators and parameter constraints."
  }
];
