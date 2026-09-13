// T25 atomic investigation cards.
// Parent ARCs are broad curriculum containers; these cards are bounded learning events.
// Global route order is canonical: study routeOrder 001 -> 120 even when a later card
// deliberately revisits an earlier parent ARC.

function card(id, parentId, title, centralCapability, principalObstacle, requiredOwnership, inScope, outOfScope, exitCondition, mode = "learn", routeOrder = null, syllabusCode = "") {
  return {
    id,
    parentId,
    title,
    centralCapability,
    principalObstacle,
    requiredOwnership,
    inScope,
    outOfScope,
    exitCondition,
    mode,
    routeOrder,
    syllabusCode,
  };
}

export const T25_ATOMIC_AUDIT_VERSION = "2.0-mstat-120";

// These four audited cards predated MSTAT-120 and are preserved as written.
export const T25_ATOMIC_CARDS = [
  card(
    "T25-ARC801-A01",
    "ARC801",
    "Domain-Safe Algebra",
    "Manipulate elementary real-valued algebraic expressions while preserving both value and the conditions under which the expression is defined.",
    "Algebraic simplification can preserve a formula on its legal domain while silently changing the domain itself.",
    [
      "Determine the real domain of a supplied elementary expression.",
      "Simplify rational expressions without silently restoring excluded points.",
      "State conditions required by common power, root and logarithm manipulations.",
      "Detect invalid cancellation, illegal denominators and domain loss.",
      "Distinguish agreement on the original domain from equality as unrestricted functions.",
      "Audit an unfamiliar algebraic simplification for legality.",
    ],
    [
      "Fractions and rational expressions",
      "Integer and elementary rational powers",
      "Roots in the real-number setting",
      "Elementary logarithmic expressions",
      "Denominator, logarithm and root restrictions",
      "Expression simplification with preserved domains",
    ],
    [
      "Polynomial-root theory and Vieta relations (ARC803)",
      "Trigonometric identities (ARC805)",
      "Complex branch behaviour (ARC806)",
      "Limits, differentiation and integration",
      "Advanced function theory (ARC802)",
    ],
    "The learner performs ordinary algebra without losing track of where each step and expression are legally defined.",
    "learn", 1, "F1"
  ),

  card(
    "T25-ARC801-A02",
    "ARC801",
    "Equations & Inequalities as Solution Sets",
    "Treat equations and inequalities as claims about solution sets, distinguishing reversible transformations from transformations that may add or lose candidates.",
    "A useful transformed statement is not automatically logically equivalent to the original one.",
    [
      "Describe an equation by its solution set rather than only its displayed syntax.",
      "Distinguish equivalence-preserving steps from one-way implications.",
      "Explain why squaring can introduce candidates requiring verification.",
      "Avoid illegal division by an expression that may be zero, or split the relevant cases.",
      "Manipulate inequalities while tracking sign conditions correctly.",
      "Intersect algebraic candidates with the original domain and verify final answers in the original statement.",
    ],
    [
      "Elementary linear and nonlinear equations",
      "Rational equations",
      "Elementary equations involving roots, powers or logarithms",
      "Inequalities and sign-dependent operations",
      "Extraneous and lost solutions",
      "Candidate-versus-verified solution reasoning",
    ],
    [
      "Theory of polynomial equations (ARC803)",
      "Coordinate-geometry equation solving (ARC807)",
      "Trigonometric-equation theory (ARC805)",
      "Optimization (ARC812)",
      "Numerical root finding and abstract algebra",
    ],
    "The learner sees solving as preserving, narrowing or carefully relating solution sets rather than blindly moving symbols.",
    "learn", 2, "F2"
  ),

  card(
    "T25-ARC801-A03",
    "ARC801",
    "Functions, Changed Inputs & Parameters",
    "Interpret function notation operationally: know what the input is, what is substituted, and which symbols vary versus label a fixed member of a family.",
    "Notation such as f(x+h), f(a) or f_theta(x) must be interpreted by substitution and role rather than visual pattern matching.",
    [
      "Evaluate functions at unfamiliar changed inputs by actual substitution.",
      "Distinguish the expression used as input from the function output.",
      "Identify variable, parameter and fixed constant from context.",
      "Reinterpret the same formula when a different symbol is designated as the variable.",
      "Handle parameterized families without confusing parameter variation with input variation.",
      "Preserve domain restrictions after substitution.",
    ],
    [
      "Function as input-output rule on a domain",
      "Variables, parameters and constants",
      "Dummy-variable naming",
      "Changed inputs such as x+h, 2x, a and x^2",
      "Parameterized families",
      "Domain checking after substitution",
    ],
    [
      "Injectivity, surjectivity and bijections (ARC802)",
      "Inverse functions and systematic composition (ARC802)",
      "Relation theory (ARC802)",
      "Limits (ARC810)",
      "Derivatives and difference quotients (ARC811 / T22 calculus)",
      "Multivariable calculus",
    ],
    "Changed-input notation and parameter roles no longer create conceptual ambiguity.",
    "learn", 3, "F3"
  ),

  card(
    "T25-ARC801-A04",
    "ARC801",
    "Mathematical Claims, Quantifiers & Counterexamples",
    "Read elementary mathematical statements according to logical structure and identify what kind of evidence could establish or refute them.",
    "Examples, definitions, conjectures, implications and quantified claims have different evidential requirements.",
    [
      "Identify hypothesis and conclusion in an implication.",
      "Distinguish a statement from its converse and use the contrapositive correctly.",
      "Translate simple universal and existential statements between words and symbols.",
      "Negate elementary universal and existential statements correctly.",
      "Explain why one example cannot prove a universal statement.",
      "Refute a false universal statement with a valid counterexample.",
      "Provide a witness for an existential statement.",
      "Distinguish a definition from a theorem requiring proof.",
      "Determine whether an argument actually establishes its stated claim.",
    ],
    [
      "Implication, converse and contrapositive",
      "Necessary and sufficient conditions at an elementary level",
      "Universal and existential quantification",
      "Negation of simple quantified statements",
      "Examples, witnesses and counterexamples",
      "Definition versus theorem, assumption versus conclusion",
    ],
    [
      "A formal logic course",
      "Truth-table drill beyond operational usefulness",
      "Proof by induction as a dedicated technique",
      "Set-theoretic foundations",
      "Equivalence relations (ARC802)",
      "Olympiad proof training and advanced proof methods belonging to later units",
    ],
    "The learner can tell what an elementary mathematical claim says, what assumptions it uses, and what evidence would establish or refute it.",
    "learn", 4, "F4"
  ),
];

// Exact user-approved MSTAT-120 route after the four preserved audited cards.
// [routeOrder, syllabusCode, parentId, title]
const ROUTE_SPECS = [
  [5,"F5a","ARC802","Sets, Set Operations & Cartesian Products"],
  [6,"F5b","ARC802","Relations & Equivalence Classes"],
  [7,"F5c","ARC802","Injectivity, Surjectivity & Inverse Functions"],
  [8,"A1a","ARC803","Polynomial Factors, Remainders & Vieta"],
  [9,"A2a","ARC804","AP, GP, HP, Indexing & Finite Sums"],
  [10,"A2b","ARC804","Weighted Geometric Sums & Infinite GP"],
  [11,"A5a","ARC802","Composition, Inverse Claims & Periodicity"],
  [12,"A5b","ARC905","Sequences: Boundedness, Monotonicity & Convergence"],
  [13,"G1a","ARC805","Unit Circle & Core Trigonometric Identities"],
  [14,"G1b","ARC805","Trigonometric Equations & Periodic Solution Families"],
  [15,"P1","ARC809","Ordered vs Unordered Counting"],
  [16,"P2a","ARC809","Restricted Counting by Cases, Complements & Bijections"],
  [17,"P2b","ARC809","Overcounting, Symmetry, Binomial/Multinomial Theorems & Coefficients"],
  [18,"P3","ARC817","Event Arithmetic, Nonuniform Spaces & Continuity of Probability"],
  [19,"P4a","ARC818","Conditional Probability, Total Probability & Bayes"],
  [20,"P4b","ARC819","Independence, Disjointness & Pairwise/Mutual Independence"],
  [21,"J1","ARC820","Random Variables, Indicator Variables & Linearity of Expectation"],
  [22,"D1a","ARC821","Bernoulli, Binomial & Hypergeometric Laws"],
  [23,"D1b","ARC821","Multinomial Laws & Indicator Derivations"],
  [24,"D2a","ARC821","Geometric & Negative-Binomial Laws"],
  [25,"P5","ARC821","Geometric Waiting Times & First-Step Recurrences"],
  [26,"J2a","ARC820","Moments, Variance & Covariance"],
  [27,"D2b","ARC821","Poisson Laws, Sums & Factorial Moments"],
  [28,"M1a","ARC814","Subspaces & Span"],
  [29,"M1b","ARC814","Linear Independence, Basis & Dimension"],
  [30,"M2a","ARC815","Row Reduction, Rank & Consistency"],
  [31,"M2b","ARC815","Null Spaces, Rank-Nullity & General Solution Structure"],
  [32,"M3a","ARC815","Determinants, Trace, Inverse & Invertibility"],
  [33,"M3b","ARC815","Determinant Structure & Recurrences"],
  [34,"A4a","ARC806","Complex Arithmetic, Conjugates & Polar Form"],
  [35,"A4b","ARC806","De Moivre, Complex Roots & Roots of Unity"],
  [36,"M4a","ARC816","Eigenvalues & Eigenspaces"],
  [37,"M4b","ARC816","Diagonalizability & Matrix Powers"],
  [38,"M5a","ARC906","Orthogonality & Projections"],
  [39,"M5b","ARC906","Symmetric Matrices & Orthogonal Diagonalization"],
  [40,"M5c","ARC906","Quadratic Forms & Positive (Semi)definiteness"],
  [41,"C1a","ARC810","Limits & One-Sided Limits"],
  [42,"C1b","ARC810","Continuity, Piecewise Functions & Sequential Counterexamples"],
  [43,"C2","ARC811","Derivatives from First Principles & Differentiability"],
  [44,"C3a","ARC811","Product, Quotient & Chain Rules"],
  [45,"C3b","ARC811","Domain-Safe Composite Differentiation"],
  [46,"A1b","ARC803","Repeated Roots & Multiplicity"],
  [47,"C4a","ARC812","Rolle’s Theorem & Mean Value Theorem Hypotheses"],
  [48,"C4b","ARC812","Monotonicity, Root Counts & Parameter Cases"],
  [49,"A3a","ARC803","Real-Root Location, Signs & Monotonicity"],
  [50,"C5","ARC812","One-Variable Optimisation & Boundary Checks"],
  [51,"A3b","ARC812","AM–GM, Cauchy–Schwarz & Equality Conditions"],
  [52,"C6a","ARC813","Fundamental Theorem of Calculus & Substitution"],
  [53,"C6b","ARC813","Integration by Parts & Symmetry"],
  [54,"C6c","ARC813","Improper Integrals & Convergence"],
  [55,"D3a","ARC822","Uniform, Exponential & Memorylessness"],
  [56,"D3b","ARC822","Normal Distribution & Standardisation"],
  [57,"D4a","ARC822","Gamma, Beta, Chi-Square & Beta–Gamma Identities"],
  [58,"D4b","ARC822","MGFs, Moments, Independent Sums & Existence Conditions"],
  [59,"D5","ARC823","Univariate Transformations, Multiple Branches, Atoms & Cauchy Exceptions"],
  [60,"J2b","ARC820","Dependent Sums & Moment-Existence Checks"],
  [61,"J3a","ARC824","Joint Supports, Marginals & Region Geometry"],
  [62,"J3b","ARC824","Conditional Laws & Independence from Joint Laws"],
  [63,"J4","ARC824","Total Expectation & Total Variance"],
  [64,"J5a","ARC824","Multivariate Transformations & Jacobians"],
  [65,"J5b","ARC824","Convolution, Sums & Ratio Transformations"],
  [66,"N1a","ARC828","Sampling Means & Their Variance"],
  [67,"N1b","ARC828","Sample Variance, n−1 Correction & Unbiasedness"],
  [68,"N2a","ARC828","Normal Mean/Residual Independence & Chi-Square Structure"],
  [69,"N2b","ARC828","Student-t & F Pivots"],
  [70,"N3a","ARC825","Multivariate Normal Vectors & Linear Forms"],
  [71,"N3b","ARC825","Conditional Normals & Independence of Linear Forms"],
  [72,"R1a","ARC827","Descriptive Measures, Quantiles, Skewness & Kurtosis"],
  [73,"R1b","ARC827","Pearson Correlation, Covariance & Dependence"],
  [74,"R1c","ARC827","Spearman Rank Correlation & Ties"],
  [75,"O1","ARC826","Sample Minima & Maxima"],
  [76,"O2","ARC826","The k-th Order Statistic"],
  [77,"O3a","ARC826","Joint Order Statistics & Sample Range"],
  [78,"L1","ARC907","Markov & Chebyshev Bounds"],
  [79,"L2a","ARC829","Weak Law of Large Numbers"],
  [80,"L2b","ARC829","Consistency by Variance/MSE, Including Dependence"],
  [81,"O3b","ARC826","Sample Quantiles & Quantile Consistency"],
  [82,"L3","ARC829","CLT Standardisation & Normal Approximation"],
  [83,"E1","ARC830","Bias, Variance & Mean Squared Error"],
  [84,"E2","ARC832","Method of Moments"],
  [85,"E3a","ARC833","Building Likelihoods with Support"],
  [86,"E3b","ARC833","Interior, Boundary & Support-Dependent MLEs"],
  [87,"E4a","ARC833","Invariance of MLEs"],
  [88,"E4b","ARC833","Constrained Likelihood"],
  [89,"E5","ARC831","Factorization, Sufficiency & Conditional-Law Reasoning"],
  [90,"E6a","ARC831","Rao–Blackwell Improvement"],
  [91,"E6b","ARC831","Minimum-Variance Certificates; Completeness/CRLB as Tools"],
  [92,"R2a","ARC836","Least Squares from Minimisation"],
  [93,"R2b","ARC836","Normal Equations, Residual Identities & Identifiability"],
  [94,"R5a","ARC908","Medians & Absolute-Loss Minimisation"],
  [95,"R5b","ARC908","Piecewise-Linear Loss & Elementary LAD Structures"],
  [96,"R3a","ARC837","Multiple Regression & Projection Geometry"],
  [97,"R3b","ARC837","Regression Covariance & Rank Deficiency"],
  [98,"T1a","ARC835","Hypotheses, Type-I/II Error, Size & Power"],
  [99,"T1b","ARC835","p-Values, Discrete Tests & Boundary Randomisation"],
  [100,"T2","ARC835","Neyman–Pearson Simple-vs-Simple Testing"],
  [101,"T3a","ARC835","Normal Mean Tests"],
  [102,"T3b","ARC835","Variance Tests & Choosing z/t/χ²/F Correctly"],
  [103,"T4","ARC834","Confidence Intervals by Pivot Inversion, Coverage & Constraints"],
  [104,"T5","ARC834","CLT-Based Approximate Inference"],
  [105,"R4a","ARC838","Regression Contrasts & t-Inference"],
  [106,"R4b","ARC838","Nested F-Tests, Mean-Response & Prediction Intervals"],
  [107,"S1a","ARC843","SRSWR/SRSWOR Means & Totals"],
  [108,"S1b","ARC844","Sampling Variance & Finite-Population Correction"],
  [109,"S2a","ARC845","Stratified Estimation & Variance"],
  [110,"S2b","ARC845","Proportional & Neyman Allocation"],
  [111,"S3","ARC844","Inclusion Probabilities, Indicators & Inverse-Probability Unbiasedness"],
  [112,"V1a","ARC839","CRD Model, Randomisation & Assumptions"],
  [113,"V1b","ARC839","One-Way ANOVA: Sums of Squares, df, F & Contrasts"],
  [114,"V2","ARC840","Randomised Block Designs: Model, ANOVA & Interaction Limits"],
  [115,"V3","ARC841","Latin-Square Design: Structure, Randomisation & ANOVA"],
  [116,"V4a","ARC842","Factorial Main Effects & Interactions"],
  [117,"V4b","ARC842","Replication, Unreplicated Designs & Identifiability"],
  [118,"G2","ARC807","Lines, Circles, Intersections, Tangency & Degenerate Cases"],
  [119,"G3","ARC808","Conics: Definitions, Standard Forms, Classification, Focus & Directrix"],
  [120,"G4","ARC808","Conic Parametrisations, Tangents, Normals & Exceptional Cases"],
];

function generatedCard([routeOrder, syllabusCode, parentId, title]) {
  const n = String(routeOrder).padStart(3, "0");
  return card(
    `T25-MSTAT-${n}`,
    parentId,
    title,
    `Independently solve and explain entrance-level problems whose central capability is ${title}, while stating the assumptions that make each method valid.`,
    `The main failure mode is pattern-matching a familiar formula or theorem without checking the structure, support, domain, hypotheses, or exceptional cases that this atomic card is meant to isolate.`,
    [
      `State the definitions, notation and assumptions needed for ${title}.`,
      `Derive or justify the core identities, procedures or claims used in ${title} instead of relying on unexplained memorisation.`,
      `Solve representative unfamiliar problems in ${title} and explain why the chosen method applies.`,
      `Detect boundary cases, counterexamples, degeneracies or assumption failures relevant to ${title}.`,
      `Connect this card to already-cleared prerequisites without importing results reserved for later MSTAT-120 cards.`,
    ],
    [
      title,
      "Definitions and notation directly required by this atomic capability",
      "Standard derivations and entrance-level problem forms for this capability",
      "Boundary, support, domain, hypothesis and exceptional-case checks intrinsic to this capability",
    ],
    [
      "Later MSTAT-120 atomic cards except where a previously cleared prerequisite is explicitly needed",
      "Advanced postgraduate theory not needed to establish this card's entrance-level capability",
      "Unrelated techniques from the parent ARC merely because they share a broad subject label",
    ],
    `Clear only when the learner can independently reconstruct the key reasoning for ${title}, solve a fresh representative problem, and identify when the method does not apply.`,
    "learn",
    routeOrder,
    syllabusCode
  );
}

T25_ATOMIC_CARDS.push(...ROUTE_SPECS.map(generatedCard));

// Canonical route invariants: fail loudly if an edit creates a gap, duplicate order,
// duplicate syllabus code, or malformed parent assignment.
T25_ATOMIC_CARDS.sort((a, b) => a.routeOrder - b.routeOrder);
if (T25_ATOMIC_CARDS.length !== 120) throw new Error(`MSTAT-120 must contain 120 atomic cards; found ${T25_ATOMIC_CARDS.length}.`);
for (let i = 0; i < T25_ATOMIC_CARDS.length; i += 1) {
  const expected = i + 1;
  if (T25_ATOMIC_CARDS[i].routeOrder !== expected) throw new Error(`MSTAT-120 route gap at ${expected}.`);
}
if (new Set(T25_ATOMIC_CARDS.map(c => c.id)).size !== 120) throw new Error("Duplicate T25 atomic ID.");
if (new Set(T25_ATOMIC_CARDS.map(c => c.syllabusCode)).size !== 120) throw new Error("Duplicate MSTAT-120 syllabus code.");

export const T25_ATOMIC_BY_ID = new Map(T25_ATOMIC_CARDS.map(c => [c.id, c]));
export const T25_ATOMIC_BY_ORDER = new Map(T25_ATOMIC_CARDS.map(c => [c.routeOrder, c]));
export const T25_ATOMIC_BY_PARENT = new Map();
for (const c of T25_ATOMIC_CARDS) {
  if (!T25_ATOMIC_BY_PARENT.has(c.parentId)) T25_ATOMIC_BY_PARENT.set(c.parentId, []);
  T25_ATOMIC_BY_PARENT.get(c.parentId).push(c);
}
for (const cards of T25_ATOMIC_BY_PARENT.values()) cards.sort((a, b) => a.routeOrder - b.routeOrder);
