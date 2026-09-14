// Individually authored T25 M.Stat audited-v4 cards 093-096.
export const T25_ATOMIC_V4_093_096 = [
  {
    id: "T25-ARC824-A1093",
    routeOrder: 93,
    syllabusCode: "J4.1",
    targetCode: "J4",
    parentId: "ARC824",
    title: "Find an expectation by conditioning on useful information.",
    focus: "Choose a conditioning variable or partition that simplifies the calculation, compute the corresponding conditional means, and recover the unconditional expectation without losing any cases.",
    purpose: "Turn complicated mixtures, staged experiments and re-sampling schemes into simpler conditional subproblems while keeping the conditioning structure mathematically explicit.",
    centralCapability: "Use the law of total expectation as a deliberate decomposition tool rather than as a formula applied after the hard work has already been done.",
    principalObstacle: "Conditioning on irrelevant information, omitting a branch of the partition, or averaging conditional means with the wrong weights can produce plausible-looking but incorrect answers.",
    entryPrerequisites: ["J3 joint/marginal/conditional laws", "J1 expectation", "P4 conditioning and partitions"],
    requiredOwnership: [
      "State the conditioning partition or random variable before calculating",
      "Compute E[X|Y=y] or branchwise conditional expectations on the correct support",
      "Weight conditional expectations by the corresponding probabilities or law of Y",
      "Use E[X]=E(E[X|Y]) with all branches retained",
      "Choose a conditioning variable that genuinely simplifies the problem",
      "Cross-check a small finite mixture directly when feasible"
    ],
    inScope: [
      "Finite mixtures and partitions",
      "Conditioning on a discrete state or count",
      "Re-sampling or staged experiments",
      "Expectation calculations where conditional structure removes algebra"
    ],
    outOfScope: [
      "Measure-theoretic conditional expectation",
      "Martingale theory",
      "Optional stopping",
      "Asymptotic conditioning arguments"
    ],
    applicationScope: "Entrance-level probability problems in which a hidden state, first-stage outcome, mixture label or useful count reduces a difficult expectation to simple conditional pieces.",
    transferScope: "An unfamiliar experiment where the learner must invent the useful conditioning variable rather than being told what to condition on.",
    exitCondition: "Given a staged or mixture experiment, choose a useful conditioning variable, derive every conditional mean, combine them with correct weights, and verify the result against a direct calculation when one is practical.",
    nextArcBoundary: "094 J4.2 adds the second-moment decomposition and requires separating within-condition variance from variance of the conditional means."
  },
  {
    id: "T25-ARC824-A1094",
    routeOrder: 94,
    syllabusCode: "J4.2",
    targetCode: "J4",
    parentId: "ARC824",
    title: "Derive total variance and apply it to a mixture or re-sampling scheme.",
    focus: "Derive and use Var(X)=E[Var(X|Y)]+Var(E[X|Y]), keeping the within-group and between-group contributions visibly separate.",
    purpose: "Prevent the classic missing-component error in mixtures and hierarchical experiments by making both sources of variability explicit.",
    centralCapability: "Decompose total variance into average conditional variance plus variance of conditional means, and diagnose which component a proposed calculation has dropped.",
    principalObstacle: "Averaging conditional variances alone ignores variation between conditional means; computing only Var(E[X|Y]) ignores within-condition randomness.",
    entryPrerequisites: ["J4.1 total expectation", "J2 variance and covariance", "J3 conditional laws"],
    requiredOwnership: [
      "Derive the total-variance identity from E[X^2] and total expectation",
      "Compute E[Var(X|Y)] on the correct conditioning law",
      "Compute Var(E[X|Y]) as a separate random quantity",
      "Explain the within-condition versus between-condition interpretation",
      "Detect a solution that omits one variance component",
      "Verify a small mixture variance by direct second-moment calculation"
    ],
    inScope: [
      "Finite and simple continuous mixtures",
      "Re-sampling schemes",
      "Hierarchical two-stage experiments",
      "Variance diagnostics using conditional decomposition"
    ],
    outOfScope: [
      "ANOVA theory beyond the identity",
      "Random-effects estimation",
      "Doob decompositions",
      "General Hilbert-space projection theory"
    ],
    applicationScope: "Mixture, hierarchical and re-sampling questions where variability comes from both randomness inside groups and random movement of group means.",
    transferScope: "A new two-stage mechanism where the learner must identify the conditioning structure and determine which variance component carries each source of randomness.",
    exitCondition: "For a mixture or re-sampling problem, compute the mean and variance by conditioning, exhibit both variance components explicitly, and explain why deleting either component changes the answer.",
    nextArcBoundary: "095 J5.1 leaves scalar conditioning and moves to distributions of sums or ratios derived from joint support by regions or convolution."
  },
  {
    id: "T25-ARC824-A1095",
    routeOrder: 95,
    syllabusCode: "J5.1",
    targetCode: "J5",
    parentId: "ARC824",
    title: "Find one sum/ratio law by regions or convolution.",
    focus: "Derive the distribution of a sum or ratio from the joint law using support geometry, CDF regions or convolution, with bounds obtained from the actual feasible region rather than memorised templates.",
    purpose: "Build reliable transformed-pair intuition before Jacobians by forcing the learner to see exactly which original points contribute to a requested transformed value.",
    centralCapability: "Translate a transformed event such as X+Y<=z or X/Y<=r into the correct region, derive the induced law, and normalise it over the transformed support.",
    principalObstacle: "Using constant integration limits, forgetting sign changes in ratio inequalities, or convolving densities without intersecting their supports gives formally neat but invalid laws.",
    entryPrerequisites: ["J3 joint/marginal laws", "D5 univariate transformations", "C6 definite integrals"],
    requiredOwnership: [
      "Sketch or describe the original joint support before integrating",
      "Translate a sum or ratio event into inequalities in the original variables",
      "Derive integration limits from support intersections",
      "Use convolution only when its hypotheses and support are appropriate",
      "Handle ratio sign cases or denominator restrictions explicitly",
      "Check the resulting density or CDF is normalised on its transformed support"
    ],
    inScope: [
      "Sums of independent continuous variables",
      "Sums from simple joint densities",
      "Ratios with controlled sign/support",
      "CDF-region and convolution derivations"
    ],
    outOfScope: [
      "Characteristic-function convolution machinery",
      "High-dimensional convolutions",
      "Stable-law theory",
      "General measure-theoretic pushforwards"
    ],
    applicationScope: "Entrance problems asking for the law of a sum or ratio when the decisive work is geometric support analysis and correctly bounded integration.",
    transferScope: "An unfamiliar joint-support shape where the learner must derive changing integration limits instead of reusing the standard triangular-convolution picture.",
    exitCondition: "Derive one nontrivial sum or ratio law from its joint model, obtain the transformed support and piecewise limits correctly, and verify total probability one.",
    nextArcBoundary: "096 J5.2 introduces two-variable derivatives and the absolute Jacobian determinant for invertible branchwise transformations."
  },
  {
    id: "T25-ARC824-A1096",
    routeOrder: 96,
    syllabusCode: "J5.2",
    targetCode: "J5",
    parentId: "ARC824",
    title: "Establish and use a two-variable Jacobian on an invertible branch.",
    focus: "Construct the needed two-variable partial-derivative matrix, compute its determinant, invert the transformation branchwise, and use the absolute Jacobian factor with the transformed support.",
    purpose: "Make the change-of-variables formula a justified local area-scaling argument rather than a memorised determinant pasted onto an inverse map.",
    centralCapability: "Apply a two-dimensional density transformation only on branches where the map is invertible, include every relevant branch, and carry support and absolute determinant factors correctly.",
    principalObstacle: "Ignoring non-invertibility, dropping an inverse branch, using the determinant without absolute value, or failing to transform the support can all yield a density that still looks algebraically plausible.",
    entryPrerequisites: ["J5.1 transformed laws by regions", "M3 determinants", "C3 derivatives", "D5 branchwise univariate transformations"],
    requiredOwnership: [
      "Compute the 2x2 Jacobian matrix from partial derivatives",
      "Compute and interpret the determinant as local area scaling",
      "Solve for the inverse map on a stated branch",
      "Use the absolute determinant of the inverse Jacobian in the density formula",
      "Transform the original support into the new variables",
      "Sum contributions from multiple valid branches when necessary",
      "Recognise a shared-variable construction whose law is singular and has no two-dimensional density"
    ],
    inScope: [
      "Invertible two-variable transformations",
      "Branchwise changes of variables",
      "Absolute Jacobian determinants",
      "Support transformation and normalisation checks"
    ],
    outOfScope: [
      "Differential forms",
      "General multivariate transformation theorems",
      "Manifold integration",
      "Singular-distribution theory beyond recognising absence of a 2D density"
    ],
    applicationScope: "Small transformed-pair problems involving sums/differences, products/ratios or similarly elementary maps where an explicit inverse and support can be obtained.",
    transferScope: "A new transformation with more than one possible inverse branch, requiring the learner to determine which branches and support pieces actually contribute.",
    exitCondition: "For a supplied two-variable transformation, derive the inverse branch or branches, compute the absolute Jacobian factor, transform the support, obtain a normalised law, and identify any case where a two-dimensional density does not exist.",
    nextArcBoundary: "097 J6.1 shifts from transformed joint laws to optimisation under squared versus absolute loss and the mean-versus-median distinction."
  }
];
