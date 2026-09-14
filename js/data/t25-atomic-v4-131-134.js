// Individually authored T25 M.Stat audited-v4 cards 131-134.
export const T25_ATOMIC_V4_131_134 = [
  {
    id: "T25-ARC835-A1131",
    routeOrder: 131,
    syllabusCode: "T1.1",
    targetCode: "T1",
    parentId: "ARC835",
    title: "Compute actual size, Type II error and power of a specified rule.",
    focus: "Evaluate a stated rejection rule under the null and alternative laws, taking the supremum over a composite null when required, and distinguish nominal level from the test's actual size.",
    purpose: "Make testing quantities operational probabilities under specified parameter values rather than interchangeable labels attached to a critical region.",
    centralCapability: "Compute rejection and non-rejection probabilities under each relevant law, identify actual size and Type II error, and write the power function with the correct parameter dependence.",
    principalObstacle: "Using the nominal alpha as the answer without evaluating the discrete rejection probability, or computing every probability under the null law, destroys the distinction between size, Type II error and power.",
    entryPrerequisites: ["D1/D2 discrete laws and D3 continuous laws with their supports", "D3 continuous distribution probabilities and standardisation", "N2 sampling pivots and their quantiles when a sample statistic is used"],
    requiredOwnership: [
      "State the null and alternative parameter sets before calculating probabilities",
      "Translate the rejection rule into an event under the model",
      "Compute the rejection probability under each null value relevant to size",
      "Take the supremum over a composite null rather than evaluating an arbitrary null point",
      "Compute Type II error as a non-rejection probability at a specified alternative",
      "Write power as the rejection probability under the alternative parameter",
      "Distinguish nominal level, actual size and pointwise power in a discrete test"
    ],
    inScope: [
      "Simple and elementary composite null/alternative hypotheses",
      "Exact rejection probabilities for binomial, Poisson, normal or similarly established laws",
      "Actual size versus nominal level in discrete tests",
      "Pointwise Type II error and power functions"
    ],
    outOfScope: [
      "Neyman-Pearson optimality proofs",
      "Uniformly most powerful theory",
      "Asymptotic local power",
      "Multiple-testing procedures beyond the elementary union control in T1.2"
    ],
    applicationScope: "Entrance questions giving a test statistic and critical region and asking for its level/size, Type II error or power at one or more parameter values.",
    transferScope: "An unfamiliar discrete rule where the nominal alpha is unattainable exactly and the learner must calculate the true rejection probability instead of assuming equality.",
    exitCondition: "For a specified discrete test, compute its actual size and power at a stated alternative, derive the corresponding Type II error, and explain why the actual size can be strictly below a requested nominal level.",
    nextArcBoundary: "132 T1.2 separates the data-dependent p-value from the pre-data size and adds elementary union-bound control for several rejection events."
  },
  {
    id: "T25-ARC835-A1132",
    routeOrder: 132,
    syllabusCode: "T1.2",
    targetCode: "T1",
    parentId: "ARC835",
    title: "Distinguish a p-value from size and control a union of rejection events.",
    focus: "Compute or interpret a p-value from the observed statistic under the null while keeping it distinct from a test's fixed size, and use the union bound to control several possibly dependent rejection events.",
    purpose: "Prevent two common testing errors: treating a realised p-value as the probability that the null is true, and adding dependent rejection probabilities as though the events were disjoint or independent.",
    centralCapability: "Define the p-value as an appropriate null-tail extremeness probability for the observed data and bound the probability of a union of rejection events without assuming independence.",
    principalObstacle: "Confusing a random pre-data p-value with the fixed design size, reversing conditional meaning, or multiplying/adding event probabilities under unstated independence leads to invalid inference.",
    entryPrerequisites: ["T1.1 size and power", "P3 union/intersection probability and the union bound", "D1 null distributions and support"],
    requiredOwnership: [
      "Identify the null distribution used to calibrate extremeness",
      "Use the tail or two-sided convention stated by the test rather than inventing one",
      "Explain that the p-value is computed from the observed statistic whereas size is a property of the rejection rule",
      "Reject the interpretation p-value = P(H0 is true | data)",
      "Express a combined rejection event as a union",
      "Apply P(union Ai) <= sum P(Ai) without requiring independence",
      "Recognise when the resulting bound is conservative rather than an exact union probability"
    ],
    inScope: [
      "Exact elementary one-sided p-values",
      "Declared two-sided p-value conventions in symmetric standard tests",
      "Size versus realised p-value distinctions",
      "Boole/union-bound control for finitely many dependent rejection events"
    ],
    outOfScope: [
      "False discovery rate",
      "Bonferroni optimality or advanced familywise-error procedures",
      "Bayesian posterior probabilities of hypotheses",
      "General selective-inference theory"
    ],
    applicationScope: "Entrance problems asking for a p-value from an observed statistic or a guaranteed upper bound on the probability that at least one among several rejection events occurs.",
    transferScope: "A problem with dependent component tests where only marginal null rejection probabilities are supplied and the learner must know that the union bound remains legal while an independence formula does not.",
    exitCondition: "Given observed data and a null law, compute/interpret the appropriate p-value, contrast it with test size, and obtain a valid union-probability bound for several rejection events without assuming independence.",
    nextArcBoundary: "133 T2.1 starts Neyman-Pearson simple-versus-simple testing by ranking sample outcomes using the alternative/null likelihood ratio."
  },
  {
    id: "T25-ARC835-A1133",
    routeOrder: 133,
    syllabusCode: "T2.1",
    targetCode: "T2",
    parentId: "ARC835",
    title: "Order observations by the alternative/null likelihood ratio.",
    focus: "For two simple hypotheses, form the likelihood ratio f1(x)/f0(x), determine how it orders the sample space, and express the most-powerful candidate rejection region in the correct inequality direction.",
    purpose: "Make Neyman-Pearson reasoning a comparison of relative evidence for the specified alternative against the null, not a memorised rule about large or small values of a statistic.",
    centralCapability: "Derive and simplify the alternative/null likelihood ratio, establish its monotone ordering where possible, and identify which observations should enter the rejection region first.",
    principalObstacle: "Reversing f1/f0 to f0/f1 without reversing the inequality, dropping support differences, or assuming 'large statistic = reject' before checking monotonicity can invert the optimal region.",
    entryPrerequisites: ["T1 testing language and rejection probabilities", "E3 likelihood construction with support", "D4 standard parametric families"],
    requiredOwnership: [
      "State the two simple parameter values and their likelihoods",
      "Form the alternative-over-null likelihood ratio on the common/legal support",
      "Handle points where one hypothesis assigns zero probability or density",
      "Simplify the ratio without discarding parameter-independent monotone transformations",
      "Determine whether the ratio increases, decreases or is nonmonotone in a useful statistic",
      "Order outcomes by evidence for H1 relative to H0",
      "Write the candidate rejection region as likelihood-ratio values above a threshold"
    ],
    inScope: [
      "Neyman-Pearson ordering for simple versus simple hypotheses",
      "Discrete and continuous one-parameter examples",
      "Monotone simplification of likelihood ratios",
      "Support-aware ranking of observations"
    ],
    outOfScope: [
      "Composite-alternative UMP theory",
      "General monotone likelihood-ratio theorems",
      "Generalized likelihood-ratio tests",
      "Asymptotic likelihood-ratio chi-square theory"
    ],
    applicationScope: "Entrance questions with fully specified null and alternative laws where the optimal ordering must be derived before any critical threshold is calibrated.",
    transferScope: "An unfamiliar pair of simple distributions where the useful statistic and rejection direction are not visually obvious until the likelihood ratio is simplified.",
    exitCondition: "Given two simple hypotheses, derive f1/f0 with support intact, rank the observations correctly, and state the likelihood-ratio rejection ordering with the correct direction before choosing its size.",
    nextArcBoundary: "134 T2.2 calibrates that ordering under H0 to obtain an exact most-powerful test and introduces boundary randomisation only when discreteness makes it necessary."
  },
  {
    id: "T25-ARC835-A1134",
    routeOrder: 134,
    syllabusCode: "T2.2",
    targetCode: "T2",
    parentId: "ARC835",
    title: "Calibrate an exact MP rejection region, including randomisation if required.",
    focus: "Choose the Neyman-Pearson likelihood-ratio threshold from the null distribution so the rejection probability meets the required level, using boundary randomisation in a discrete model only when exact calibration requires it.",
    purpose: "Complete the simple-versus-simple argument by separating evidence ordering from null-probability calibration and by making discrete boundary randomisation explicit rather than silently overshooting alpha.",
    centralCapability: "Convert a likelihood-ratio ordering into an exact level-alpha most-powerful test, solve for any boundary randomisation probability, and compute the resulting power under the alternative.",
    principalObstacle: "Selecting a threshold from the alternative law, forcing an unattainable deterministic discrete size, or randomising away from the likelihood-ratio boundary violates the Neyman-Pearson construction.",
    entryPrerequisites: ["T2.1 likelihood-ratio ordering", "T1.1 actual size and power", "D1/D2 discrete and D3 continuous probability calculations"],
    requiredOwnership: [
      "Calibrate the critical region using probabilities under H0",
      "Choose the largest deterministic likelihood-ratio region whose null probability does not exceed alpha when appropriate",
      "Identify a boundary likelihood-ratio class when exact alpha is not attainable deterministically",
      "Solve for a randomisation probability gamma in [0,1] that gives exact null rejection probability alpha",
      "Keep all higher likelihood-ratio outcomes fully rejected before randomising at the boundary",
      "Compute the power of the calibrated test under H1",
      "State when no randomisation is needed because the threshold can already attain the desired level"
    ],
    inScope: [
      "Exact Neyman-Pearson calibration for simple versus simple tests",
      "Continuous thresholds from a known null distribution",
      "Discrete boundary randomisation",
      "Power calculation for the resulting MP test"
    ],
    outOfScope: [
      "Randomised tests outside boundary calibration",
      "UMP tests for composite alternatives",
      "Decision-theoretic loss optimisation",
      "Asymptotic likelihood-ratio testing"
    ],
    applicationScope: "Entrance problems asking for a most-powerful level-alpha test between two simple hypotheses and, in discrete cases, whether randomisation is required to attain alpha exactly.",
    transferScope: "A discrete sample space with tied likelihood-ratio values where the learner must preserve the NP ordering, identify the correct boundary class and solve the exact randomisation probability.",
    exitCondition: "Starting from an LR ordering, construct an exact level-alpha MP test, derive any necessary boundary randomisation probability, and verify both null size and alternative power.",
    nextArcBoundary: "135 T3.1 leaves generic simple-versus-simple optimality and starts model-specific normal mean/variance test selection under stated known/unknown quantities and distributional assumptions."
  }
];
