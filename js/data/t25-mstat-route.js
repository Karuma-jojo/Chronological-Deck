// Canonical M.Stat parent-ARC route for T25.
//
// The legacy contracts in t25-units.js remain stable because companion exam
// branches reuse them. This overlay reshuffles and sharpens the M.Stat core,
// and appends genuinely missing parent ARCs without recycling old IDs.
//
// Pedagogy rule: T25_CORE order is intentional. The later 120-card atomic route
// is nested into these parents and must preserve its global 001 -> 120 order.

import { T25_CORE as LEGACY_CORE, T25_EXTRAS } from "./t25-units.js";

const legacy = new Map(LEGACY_CORE.map(unit => [unit.key, unit]));

function take(key, stage, overrides = {}) {
  const base = legacy.get(key);
  if (!base) throw new Error(`Missing legacy T25 unit: ${key}`);
  return {
    ...base,
    ...overrides,
    stage,
    prerequisites: overrides.prerequisites ?? [...base.prerequisites],
    mastery: overrides.mastery ?? [...base.mastery],
    reuse: overrides.reuse ?? [...base.reuse],
  };
}

function added(number, key, title, stage, prerequisites, target, mastery, reuse = [], project = "", mode = "investigate") {
  return {
    id: `ARC${number}`,
    key,
    title,
    stage,
    prerequisites,
    source: "mstat",
    target,
    mastery,
    reuse,
    project,
    mode,
  };
}

// IDs 905+ are appended parent contracts. Never repurpose an existing 801-904 ID.
const SEQUENCES = added(
  905,
  "sequences",
  "Sequences: Boundedness, Monotonicity & Convergence",
  0,
  ["progressions", "language"],
  "Reason about deterministic sequences as indexed functions and justify elementary convergence claims before probability limit theory.",
  [
    "Distinguish a sequence from its set of attained values and track indexing correctly",
    "Establish boundedness and monotonicity from a formula, recurrence or comparison",
    "Decide elementary convergence/divergence claims and use monotone-bounded reasoning with stated hypotheses",
  ],
  ["T22-M02-A02"],
  "Mathematical Escape Room"
);

const ORTHOGONAL = added(
  906,
  "orthogonal",
  "Orthogonality, Symmetric Matrices & Quadratic Forms",
  1,
  ["eigen", "vectors"],
  "Connect Euclidean geometry, spectral structure and quadratic forms without conflating general matrices with the symmetric case.",
  [
    "Compute orthogonal projections and interpret orthogonal complements",
    "Use the spectral structure of real symmetric matrices and orthogonal diagonalisation",
    "Classify quadratic forms by eigenvalue/sign structure and test positive definiteness or semidefiniteness",
  ],
  ["T22-M06-A02", "T22-M08-A01", "T22-M08-A02"],
  "Matrix Worlds"
);

const PROBABILITY_BOUNDS = added(
  907,
  "probbounds",
  "Probability Bounds: Markov & Chebyshev",
  2,
  ["expectation"],
  "Turn moment information into rigorous probability bounds and use those bounds as the bridge to elementary consistency arguments.",
  [
    "Apply Markov's inequality only to nonnegative random variables and choose the transformed variable deliberately",
    "Derive and apply Chebyshev's inequality from variance information",
    "Use probability bounds to prove elementary convergence-in-probability or consistency statements without claiming stronger modes of convergence",
  ],
  ["T22-M23-A06"],
  "Random-Variable Laboratory"
);

const ROBUST_LOSS = added(
  908,
  "robustloss",
  "Medians, Absolute Loss & Elementary LAD",
  3,
  ["descriptive", "extrema", "regression"],
  "Understand why absolute loss leads to medians and solve elementary least-absolute-deviation structures by piecewise-linear reasoning.",
  [
    "Prove or justify the median as a minimiser of total absolute deviation",
    "Analyse one-dimensional piecewise-linear absolute-loss objectives including nonunique minimisers",
    "Solve elementary LAD regression structures and distinguish their geometry from least squares",
  ],
  [],
  "Regression Observatory"
);

export const T25_CORE = [
  // 001-027: foundations -> counting -> elementary probability -> first random variables.
  take("language", 0, {
    title: "Mathematical Language & Domain-Safe Algebra",
    target: "Make symbolic statements precise, preserve domains and solution sets, and read elementary mathematical claims correctly.",
    mastery: [
      "Manipulate fractions, powers, roots and logarithms while preserving their legal domains and excluded points",
      "Treat equations and inequalities as solution-set claims; distinguish reversible steps from implication-only transformations",
      "Evaluate functions at changed inputs and distinguish variables, parameters and constants",
      "Use implication, quantifiers, negation, witnesses and counterexamples; distinguish definitions from theorems",
    ],
  }),
  take("sets", 0, {
    title: "Sets, Relations & Function Structure",
    mastery: [
      "Use union, intersection, complement and Cartesian products",
      "Check equivalence relations and identify equivalence classes",
      "Analyse composition, inverses, injectivity, surjectivity, bijectivity and periodic function claims",
    ],
  }),
  take("equations", 0, {
    title: "Polynomials, Roots & Theory of Equations",
    mastery: [
      "Apply factor and remainder reasoning and Vieta relations",
      "Track repeated roots and multiplicity through polynomial and derivative structure",
      "Locate and constrain real roots by signs, monotonicity and parameter cases without replacing proof by numerical evidence",
    ],
  }),
  take("progressions", 0, {
    title: "Progressions, Weighted Sums & Infinite GP",
    mastery: [
      "Derive AP, GP and HP relations with correct indexing and exceptional cases",
      "Derive finite and weighted geometric sums rather than memorising disconnected formulas",
      "Handle infinite geometric series only under the appropriate convergence condition",
    ],
  }),
  SEQUENCES,
  take("trig", 0, {
    title: "Trigonometric Structure & Periodic Equations",
    mastery: [
      "Use the unit circle to control signs, periodicity and core identities",
      "Derive and use addition, multiple-angle and transformation identities with valid domains",
      "Solve trigonometric equations with complete periodic solution families",
    ],
  }),
  take("counting", 0, {
    title: "Counting, Symmetry & Binomial/Multinomial Structure",
    mastery: [
      "Distinguish ordered from unordered constructions and justify product/permutation/combination counts",
      "Use cases, complements, bijections, symmetry and overcounting corrections",
      "Derive binomial and multinomial coefficient structure and apply the corresponding expansions",
    ],
  }),
  take("events", 0, {
    title: "Events, Probability Arithmetic & Sample Spaces",
    mastery: [
      "Construct a coherent sample space and justify equiprobability before using favourable-over-total counting",
      "Use complements, unions, intersections and inclusion-exclusion for events",
      "Handle nonuniform finite spaces and continuity-of-probability style event limits at the elementary level",
    ],
  }),
  take("conditional", 0, { title: "Conditioning, Total Probability & Bayes" }),
  take("independence", 0, { title: "Independence, Disjointness & Dependence" }),
  take("expectation", 0, {
    title: "Random Variables, Indicators, Moments & Covariance",
    prerequisites: ["events"],
    target: "Turn outcomes into numerical random variables and compute expectations and second-moment structure before continuous-calculus machinery is required.",
    mastery: [
      "Define a discrete random variable from an experiment and work with its support and PMF",
      "Use indicator variables and linearity of expectation without imposing unnecessary independence assumptions",
      "Compute moments, variance and covariance when they exist and distinguish zero covariance from independence",
    ],
  }),
  take("discrete", 0, {
    title: "Discrete Laws, Waiting Times & First-Step Recurrences",
    mastery: [
      "Recognise Bernoulli, binomial, hypergeometric and multinomial laws from their sampling mechanisms",
      "Work with geometric and negative-binomial waiting-time conventions and memorylessness where applicable",
      "Derive elementary first-step recurrences and Poisson sums/factorial moments under the stated assumptions",
    ],
  }),

  // 028-054: linear algebra -> complex/eigen structure -> one-variable calculus.
  take("vectors", 1, { title: "Vector Spaces, Span, Basis & Dimension" }),
  take("matrices", 1, {
    title: "Linear Systems, Rank, Determinants & Invertibility",
    mastery: [
      "Use row reduction to determine consistency, rank and solution structure",
      "Relate null spaces and rank-nullity to free variables and general solutions",
      "Use determinant, trace and inverse identities with their hypotheses and exploit determinant structure or recurrences",
    ],
  }),
  take("complex", 1, { title: "Complex Numbers, Polar Form & Roots of Unity" }),
  take("eigen", 1, {
    title: "Eigenvalues, Eigenspaces & Diagonalisation",
    mastery: [
      "Find eigenvalues and eigenspaces from the characteristic equation",
      "Distinguish algebraic and geometric multiplicity and decide diagonalizability",
      "Use diagonalisation to analyse matrix powers without assuming every matrix is diagonalizable",
    ],
  }),
  ORTHOGONAL,
  take("limits", 1, { title: "Limits, One-Sided Limits & Continuity" }),
  take("derivatives", 1, {
    title: "Differentiation from First Principles to Composite Rules",
    mastery: [
      "Use the derivative definition and distinguish continuity from differentiability",
      "Derive/use product, quotient and chain rules with their conditions",
      "Differentiate composites while preserving domains and checking exceptional points",
    ],
  }),
  take("extrema", 1, {
    title: "Mean-Value Reasoning, Root Location & Optimisation",
    mastery: [
      "Apply Rolle and mean-value theorems only after checking their hypotheses",
      "Use derivative signs to prove monotonicity, locate/count roots and analyse parameter cases",
      "Solve one-variable optimisation with endpoints/boundaries and use AM-GM or Cauchy-Schwarz with equality conditions",
    ],
  }),
  take("integrals", 1, {
    title: "Integration, FTC, Symmetry & Improper Convergence",
    mastery: [
      "Use the fundamental theorem of calculus and substitution with stated regularity and transformed bounds",
      "Choose integration by parts or symmetry deliberately",
      "Treat improper integrals as limits and determine convergence before manipulating their values",
    ],
  }),

  // 055-082: continuous/joint laws -> sampling laws -> descriptive/order -> probability limits.
  take("continuous", 2, {
    title: "Continuous Laws, Gamma/Beta Families & MGFs",
    prerequisites: ["expectation", "integrals"],
    mastery: [
      "Work with uniform, exponential and normal distributions including memorylessness and standardisation",
      "Work with gamma, beta and chi-square families and the relevant beta-gamma identities",
      "Use MGFs and moments only where they exist and derive independent-sum results with explicit conditions",
    ],
  }),
  take("transform", 2, {
    title: "Univariate Transformations, Branches & Convolution",
    mastery: [
      "Derive transformed laws by CDF or change-of-variables reasoning with transformed supports",
      "Account for every inverse branch, absolute Jacobian and any atom created by a transformation",
      "Derive independent sums by convolution and recognise moment/MGF failures such as Cauchy-type exceptions",
    ],
  }),
  take("joint", 2, {
    title: "Joint Laws, Conditioning & Multivariate Transformations",
    mastery: [
      "Respect nonrectangular joint supports while deriving marginals and conditional laws",
      "Test independence from the joint law and use total expectation/total variance",
      "Apply multivariate Jacobians and derive sums or ratios with valid support geometry",
    ],
  }),
  take("samplinglaws", 2, {
    title: "Sampling Means, Variances & Normal Pivots",
    prerequisites: ["continuous", "expectation"],
    mastery: [
      "Derive the mean and variance of a sample mean under stated sampling assumptions",
      "Understand sample variance, the n-1 correction and unbiasedness",
      "Use normal-sample mean/residual independence and the resulting chi-square, Student-t and F pivots",
    ],
  }),
  take("mvn", 2, {
    title: "Multivariate Normal Vectors & Linear Forms",
    prerequisites: ["joint", "matrices", "eigen", "samplinglaws"],
    mastery: [
      "Work with multivariate-normal vectors and distributions of linear forms",
      "Recognise covariance conditions for independence of Gaussian linear forms",
      "Derive conditional-normal means/covariances when the conditioning covariance is invertible and handle degeneracy separately",
    ],
  }),
  take("descriptive", 2, {
    title: "Descriptive Measures, Quantiles & Correlation",
    mastery: [
      "Compute and interpret location, dispersion, quantiles, skewness and kurtosis with explicit conventions",
      "Compute Pearson covariance/correlation and explain why association is not causation",
      "Compute Spearman rank correlation including tie handling",
    ],
  }),
  take("order", 2, {
    title: "Order Statistics, Ranges & Sample Quantiles",
    mastery: [
      "Derive minimum, maximum and kth-order laws for iid continuous samples",
      "Use joint order-statistic laws and ordering support to derive ranges and related quantities",
      "Reason about sample quantiles and elementary quantile consistency, noting how atoms or ties alter arguments",
    ],
  }),
  PROBABILITY_BOUNDS,
  take("asymptotics", 2, {
    title: "Weak Law, Consistency & Central Limit Approximation",
    prerequisites: ["probbounds", "expectation", "independence", "continuous"],
    mastery: [
      "Apply a weak law under stated assumptions and distinguish stabilization from an exact sampling distribution",
      "Prove elementary consistency using variance or MSE bounds, including simple dependence-aware cases when justified",
      "Standardise sums, means and proportions correctly for the CLT and audit finite-sample approximation limits",
    ],
  }),

  // 083-117: estimation -> regression -> tests/CIs -> survey sampling -> design.
  take("estimators", 3, { title: "Bias, Variance & Mean Squared Error" }),
  take("mom", 3, { title: "Method of Moments" }),
  take("mle", 3, {
    title: "Likelihood, Support, Boundaries & Constrained MLE",
    mastery: [
      "Build likelihoods with the correct support and sampling factorisation",
      "Find interior, boundary and support-dependent maximisers rather than blindly solving score equations",
      "Use MLE invariance and constrained likelihood carefully while checking identifiability and parameter-space restrictions",
    ],
  }),
  take("sufficiency", 3, {
    title: "Sufficiency, Rao-Blackwell & Minimum-Variance Certificates",
    prerequisites: ["estimators", "joint", "mle"],
    mastery: [
      "Use conditional-law reasoning and the factorization criterion for sufficiency, including parameter-dependent supports",
      "Apply Rao-Blackwell conditioning to improve an unbiased estimator when applicable",
      "Use completeness, Lehmann-Scheffe style reasoning or Cramer-Rao bounds as certificates/tools only when their hypotheses are satisfied",
    ],
  }),
  take("regression", 3, {
    title: "Least Squares, Residual Identities & Identifiability",
    mastery: [
      "Derive least-squares coefficients from minimisation rather than memorising the fitted line",
      "Derive normal equations and residual identities with their intercept assumptions",
      "Recognise identifiability/rank failures and distinguish correlation from regression claims",
    ],
  }),
  ROBUST_LOSS,
  take("multiple", 3, {
    title: "Multiple Regression, Projection Geometry & Covariance",
    mastery: [
      "Interpret multiple regression through projection geometry and normal equations",
      "State full-column-rank conditions and diagnose rank deficiency or multicollinearity",
      "Derive coefficient expectation and covariance under explicit error assumptions",
    ],
  }),
  take("testing", 3, {
    title: "Hypothesis Testing, Power & Neyman-Pearson",
    prerequisites: ["samplinglaws", "conditional", "mle", "estimators"],
    mastery: [
      "Specify hypotheses, critical regions, Type-I/II errors, size, power and p-values",
      "Handle discrete tests and boundary randomisation when exact size cannot otherwise be attained",
      "Apply Neyman-Pearson to simple-vs-simple problems and choose z, t, chi-square or F tests from model assumptions rather than surface appearance",
    ],
  }),
  take("intervals", 3, {
    title: "Confidence Intervals, Coverage & Pivot Inversion",
    prerequisites: ["testing", "samplinglaws", "asymptotics", "estimators"],
    mastery: [
      "Construct exact intervals by pivot inversion and respect parameter constraints",
      "Construct justified CLT-based approximate intervals when exact pivots are unavailable",
      "Interpret repeated-sampling coverage correctly and distinguish confidence, prediction and parameter-probability statements",
    ],
  }),
  take("regtests", 3, { title: "Regression Contrasts, t/F Tests & Prediction" }),
  take("srswr", 3, { title: "SRS with Replacement: Means & Totals" }),
  take("srswor", 3, {
    title: "SRS without Replacement & Inclusion Indicators",
    mastery: [
      "Derive mean/total estimators under SRSWOR and the finite-population correction",
      "Use inclusion indicators/probabilities to establish unbiasedness of inverse-probability style estimators in elementary settings",
      "Check sample-size-one and census-limit cases and keep finite-population variance conventions explicit",
    ],
  }),
  take("stratified", 3, { title: "Stratified Sampling, Variance & Allocation" }),
  take("crd", 3, { title: "Completely Randomised Designs & One-Way ANOVA" }),
  take("rbd", 3, { title: "Randomised Block Designs & Additive ANOVA" }),
  take("lsd", 3, { title: "Latin-Square Designs & ANOVA" }),
  take("factorial", 3, { title: "Factorial Effects, Interactions & Replication" }),

  // 118-120: deliberate final breadth block, then mixed exam synthesis.
  take("lines", 4, { title: "Lines, Circles, Intersections & Tangency" }),
  take("conics", 4, { title: "Conics, Classification, Parametrisation & Tangents" }),
  take("exam", 4, {
    title: "M.Stat PSA/PSB Synthesis & Error Repair",
    prerequisites: [
      "conics", "complex", "sequences", "orthogonal", "order", "probbounds", "asymptotics",
      "sufficiency", "mom", "mle", "intervals", "robustloss", "regtests", "lsd", "factorial", "stratified",
    ],
  }),
];

export { T25_EXTRAS };
export const T25_UNITS = [...T25_CORE, ...T25_EXTRAS];

export const T25_MSTAT_PARENT_ROUTE_VERSION = "2.0-parent-first";
export const T25_MSTAT_PARENT_IDS = T25_CORE.map(unit => unit.id);
