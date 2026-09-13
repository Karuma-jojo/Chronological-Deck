// T25 MSTAT-120 atomic investigation cards.
//
// IMPORTANT AUTHORING RULE:
// The 120-item route manifest is canonical, but a route entry is NOT an authored card.
// Only add an item to T25_ATOMIC_CARDS after its bounded learning contract has been
// individually designed and audited. This prevents generic boilerplate cards from
// masquerading as finished curriculum.
//
// Global pedagogy rule: study routeOrder 001 -> 120 exactly. Parent ARC grouping is
// organizational only and never overrides the global route.

function route(routeOrder, syllabusCode, parentId, title) {
  return { routeOrder, syllabusCode, parentId, title };
}

function card({
  id,
  routeOrder,
  syllabusCode,
  parentId,
  title,
  focus,
  purpose,
  centralCapability,
  principalObstacle,
  entryPrerequisites,
  requiredOwnership,
  applicationScope,
  transferScope,
  inScope,
  outOfScope,
  exitCondition,
  nextArcBoundary,
  mode = "learn",
}) {
  return {
    id,
    routeOrder,
    syllabusCode,
    parentId,
    title,
    focus,
    purpose,
    centralCapability,
    principalObstacle,
    entryPrerequisites,
    requiredOwnership,
    applicationScope,
    transferScope,
    inScope,
    outOfScope,
    exitCondition,
    nextArcBoundary,
    mode,
  };
}

export const T25_ATOMIC_AUDIT_VERSION = "3.0-mstat-120-progressive";

// Canonical route manifest. Exact global order is frozen unless the user explicitly
// changes the MSTAT-120 route. Entries may exist here before their full cards do.
export const T25_MSTAT_120_ROUTE = [
  route(1, "F1", "ARC801", "Domain-Safe Algebra"),
  route(2, "F2", "ARC801", "Equations & Inequalities as Solution Sets"),
  route(3, "F3", "ARC801", "Functions, Changed Inputs & Parameters"),
  route(4, "F4", "ARC801", "Mathematical Claims, Quantifiers & Counterexamples"),
  route(5, "F5a", "ARC802", "Sets, Set Operations & Cartesian Products"),
  route(6, "F5b", "ARC802", "Relations & Equivalence Classes"),
  route(7, "F5c", "ARC802", "Injectivity, Surjectivity & Inverse Functions"),
  route(8, "A1a", "ARC803", "Polynomial Factors, Remainders & Vieta"),
  route(9, "A2a", "ARC804", "AP, GP, HP, Indexing & Finite Sums"),
  route(10, "A2b", "ARC804", "Weighted Geometric Sums & Infinite GP"),
  route(11, "A5a", "ARC802", "Composition, Inverse Claims & Periodicity"),
  route(12, "A5b", "ARC905", "Sequences: Boundedness, Monotonicity & Convergence"),
  route(13, "G1a", "ARC805", "Unit Circle & Core Trigonometric Identities"),
  route(14, "G1b", "ARC805", "Trigonometric Equations & Periodic Solution Families"),
  route(15, "P1", "ARC809", "Ordered vs Unordered Counting"),
  route(16, "P2a", "ARC809", "Restricted Counting by Cases, Complements & Bijections"),
  route(17, "P2b", "ARC809", "Overcounting, Symmetry, Binomial/Multinomial Theorems & Coefficients"),
  route(18, "P3", "ARC817", "Event Arithmetic, Nonuniform Spaces & Continuity of Probability"),
  route(19, "P4a", "ARC818", "Conditional Probability, Total Probability & Bayes"),
  route(20, "P4b", "ARC819", "Independence, Disjointness & Pairwise/Mutual Independence"),
  route(21, "J1", "ARC820", "Random Variables, Indicator Variables & Linearity of Expectation"),
  route(22, "D1a", "ARC821", "Bernoulli, Binomial & Hypergeometric Laws"),
  route(23, "D1b", "ARC821", "Multinomial Laws & Indicator Derivations"),
  route(24, "D2a", "ARC821", "Geometric & Negative-Binomial Laws"),
  route(25, "P5", "ARC821", "Geometric Waiting Times & First-Step Recurrences"),
  route(26, "J2a", "ARC820", "Moments, Variance & Covariance"),
  route(27, "D2b", "ARC821", "Poisson Laws, Sums & Factorial Moments"),
  route(28, "M1a", "ARC814", "Subspaces & Span"),
  route(29, "M1b", "ARC814", "Linear Independence, Basis & Dimension"),
  route(30, "M2a", "ARC815", "Row Reduction, Rank & Consistency"),
  route(31, "M2b", "ARC815", "Null Spaces, Rank-Nullity & General Solution Structure"),
  route(32, "M3a", "ARC815", "Determinants, Trace, Inverse & Invertibility"),
  route(33, "M3b", "ARC815", "Determinant Structure & Recurrences"),
  route(34, "A4a", "ARC806", "Complex Arithmetic, Conjugates & Polar Form"),
  route(35, "A4b", "ARC806", "De Moivre, Complex Roots & Roots of Unity"),
  route(36, "M4a", "ARC816", "Eigenvalues & Eigenspaces"),
  route(37, "M4b", "ARC816", "Diagonalizability & Matrix Powers"),
  route(38, "M5a", "ARC906", "Orthogonality & Projections"),
  route(39, "M5b", "ARC906", "Symmetric Matrices & Orthogonal Diagonalization"),
  route(40, "M5c", "ARC906", "Quadratic Forms & Positive (Semi)definiteness"),
  route(41, "C1a", "ARC810", "Limits & One-Sided Limits"),
  route(42, "C1b", "ARC810", "Continuity, Piecewise Functions & Sequential Counterexamples"),
  route(43, "C2", "ARC811", "Derivatives from First Principles & Differentiability"),
  route(44, "C3a", "ARC811", "Product, Quotient & Chain Rules"),
  route(45, "C3b", "ARC811", "Domain-Safe Composite Differentiation"),
  route(46, "A1b", "ARC803", "Repeated Roots & Multiplicity"),
  route(47, "C4a", "ARC812", "Rolle’s Theorem & Mean Value Theorem Hypotheses"),
  route(48, "C4b", "ARC812", "Monotonicity, Root Counts & Parameter Cases"),
  route(49, "A3a", "ARC803", "Real-Root Location, Signs & Monotonicity"),
  route(50, "C5", "ARC812", "One-Variable Optimisation & Boundary Checks"),
  route(51, "A3b", "ARC812", "AM–GM, Cauchy–Schwarz & Equality Conditions"),
  route(52, "C6a", "ARC813", "Fundamental Theorem of Calculus & Substitution"),
  route(53, "C6b", "ARC813", "Integration by Parts & Symmetry"),
  route(54, "C6c", "ARC813", "Improper Integrals & Convergence"),
  route(55, "D3a", "ARC822", "Uniform, Exponential & Memorylessness"),
  route(56, "D3b", "ARC822", "Normal Distribution & Standardisation"),
  route(57, "D4a", "ARC822", "Gamma, Beta, Chi-Square & Beta–Gamma Identities"),
  route(58, "D4b", "ARC822", "MGFs, Moments, Independent Sums & Existence Conditions"),
  route(59, "D5", "ARC823", "Univariate Transformations, Multiple Branches, Atoms & Cauchy Exceptions"),
  route(60, "J2b", "ARC820", "Dependent Sums & Moment-Existence Checks"),
  route(61, "J3a", "ARC824", "Joint Supports, Marginals & Region Geometry"),
  route(62, "J3b", "ARC824", "Conditional Laws & Independence from Joint Laws"),
  route(63, "J4", "ARC824", "Total Expectation & Total Variance"),
  route(64, "J5a", "ARC824", "Multivariate Transformations & Jacobians"),
  route(65, "J5b", "ARC824", "Convolution, Sums & Ratio Transformations"),
  route(66, "N1a", "ARC828", "Sampling Means & Their Variance"),
  route(67, "N1b", "ARC828", "Sample Variance, n−1 Correction & Unbiasedness"),
  route(68, "N2a", "ARC828", "Normal Mean/Residual Independence & Chi-Square Structure"),
  route(69, "N2b", "ARC828", "Student-t & F Pivots"),
  route(70, "N3a", "ARC825", "Multivariate Normal Vectors & Linear Forms"),
  route(71, "N3b", "ARC825", "Conditional Normals & Independence of Linear Forms"),
  route(72, "R1a", "ARC827", "Descriptive Measures, Quantiles, Skewness & Kurtosis"),
  route(73, "R1b", "ARC827", "Pearson Correlation, Covariance & Dependence"),
  route(74, "R1c", "ARC827", "Spearman Rank Correlation & Ties"),
  route(75, "O1", "ARC826", "Sample Minima & Maxima"),
  route(76, "O2", "ARC826", "The k-th Order Statistic"),
  route(77, "O3a", "ARC826", "Joint Order Statistics & Sample Range"),
  route(78, "L1", "ARC907", "Markov & Chebyshev Bounds"),
  route(79, "L2a", "ARC829", "Weak Law of Large Numbers"),
  route(80, "L2b", "ARC829", "Consistency by Variance/MSE, Including Dependence"),
  route(81, "O3b", "ARC826", "Sample Quantiles & Quantile Consistency"),
  route(82, "L3", "ARC829", "CLT Standardisation & Normal Approximation"),
  route(83, "E1", "ARC830", "Bias, Variance & Mean Squared Error"),
  route(84, "E2", "ARC832", "Method of Moments"),
  route(85, "E3a", "ARC833", "Building Likelihoods with Support"),
  route(86, "E3b", "ARC833", "Interior, Boundary & Support-Dependent MLEs"),
  route(87, "E4a", "ARC833", "Invariance of MLEs"),
  route(88, "E4b", "ARC833", "Constrained Likelihood"),
  route(89, "E5", "ARC831", "Factorization, Sufficiency & Conditional-Law Reasoning"),
  route(90, "E6a", "ARC831", "Rao–Blackwell Improvement"),
  route(91, "E6b", "ARC831", "Minimum-Variance Certificates; Completeness/CRLB as Tools"),
  route(92, "R2a", "ARC836", "Least Squares from Minimisation"),
  route(93, "R2b", "ARC836", "Normal Equations, Residual Identities & Identifiability"),
  route(94, "R5a", "ARC908", "Medians & Absolute-Loss Minimisation"),
  route(95, "R5b", "ARC908", "Piecewise-Linear Loss & Elementary LAD Structures"),
  route(96, "R3a", "ARC837", "Multiple Regression & Projection Geometry"),
  route(97, "R3b", "ARC837", "Regression Covariance & Rank Deficiency"),
  route(98, "T1a", "ARC835", "Hypotheses, Type-I/II Error, Size & Power"),
  route(99, "T1b", "ARC835", "p-Values, Discrete Tests & Boundary Randomisation"),
  route(100, "T2", "ARC835", "Neyman–Pearson Simple-vs-Simple Testing"),
  route(101, "T3a", "ARC835", "Normal Mean Tests"),
  route(102, "T3b", "ARC835", "Variance Tests & Choosing z/t/χ²/F Correctly"),
  route(103, "T4", "ARC834", "Confidence Intervals by Pivot Inversion, Coverage & Constraints"),
  route(104, "T5", "ARC834", "CLT-Based Approximate Inference"),
  route(105, "R4a", "ARC838", "Regression Contrasts & t-Inference"),
  route(106, "R4b", "ARC838", "Nested F-Tests, Mean-Response & Prediction Intervals"),
  route(107, "S1a", "ARC843", "SRSWR/SRSWOR Means & Totals"),
  route(108, "S1b", "ARC844", "Sampling Variance & Finite-Population Correction"),
  route(109, "S2a", "ARC845", "Stratified Estimation & Variance"),
  route(110, "S2b", "ARC845", "Proportional & Neyman Allocation"),
  route(111, "S3", "ARC844", "Inclusion Probabilities, Indicators & Inverse-Probability Unbiasedness"),
  route(112, "V1a", "ARC839", "CRD Model, Randomisation & Assumptions"),
  route(113, "V1b", "ARC839", "One-Way ANOVA: Sums of Squares, df, F & Contrasts"),
  route(114, "V2", "ARC840", "Randomised Block Designs: Model, ANOVA & Interaction Limits"),
  route(115, "V3", "ARC841", "Latin-Square Design: Structure, Randomisation & ANOVA"),
  route(116, "V4a", "ARC842", "Factorial Main Effects & Interactions"),
  route(117, "V4b", "ARC842", "Replication, Unreplicated Designs & Identifiability"),
  route(118, "G2", "ARC807", "Lines, Circles, Intersections, Tangency & Degenerate Cases"),
  route(119, "G3", "ARC808", "Conics: Definitions, Standard Forms, Classification, Focus & Directrix"),
  route(120, "G4", "ARC808", "Conic Parametrisations, Tangents, Normals & Exceptional Cases"),
];

// ---------------------------------------------------------------------------
// AUTHORED CARDS — progressive implementation
// ---------------------------------------------------------------------------

export const T25_ATOMIC_CARDS = [
  card({
    id: "T25-ARC801-A01",
    routeOrder: 1,
    syllabusCode: "F1",
    parentId: "ARC801",
    title: "Domain-Safe Algebra",
    focus: "Algebraic rewriting that preserves both numerical meaning and the legal real domain of the original expression.",
    purpose: "Make domain conditions part of the mathematics from the first line, so later equation solving, calculus, likelihoods and transformations do not inherit silent illegal steps.",
    centralCapability: "Manipulate elementary real-valued algebraic expressions while recording denominator, even-root and logarithm restrictions and preserving excluded points through simplification.",
    principalObstacle: "Two formulas can agree at every point where the original expression is defined while still representing different unrestricted functions because cancellation or rewriting has silently restored forbidden inputs.",
    entryPrerequisites: [
      "Elementary arithmetic and algebra notation",
      "Basic real-number order and arithmetic operations",
      "No earlier MSTAT-120 card is required",
    ],
    requiredOwnership: [
      "Determine the real domain of rational, even-root and logarithmic expressions before simplifying them.",
      "Simplify rational expressions while retaining holes/excluded points created by the original denominator.",
      "State the real-domain conditions behind common root, power and logarithm manipulations instead of using them as unconditional symbol rules.",
      "Detect illegal cancellation, division by a possibly zero expression and other rewrites that change the legal input set.",
      "Distinguish equality of values on the original domain from equality as unrestricted functions.",
      "Carry original domain restrictions through a multi-step rewrite and audit an unfamiliar simplification for legality.",
    ],
    applicationScope: "A mixed root/log/rational expression in which the shortest simplification removes at least one visible restriction; the learner must report both the simplified form and the original legal domain.",
    transferScope: "A differently surfaced algebraic rewrite where the final formula looks harmless but one or more original exclusions must still be recovered without prompting.",
    inScope: [
      "Fractions and rational expressions",
      "Integer and elementary rational powers in the real setting",
      "Even-root restrictions",
      "Elementary logarithmic restrictions",
      "Excluded points and domain intersection",
      "Value-preserving simplification on a stated domain",
    ],
    outOfScope: [
      "Solving equations and inequalities as solution sets — owned by 002 / F2",
      "General function composition, injectivity or inverses — later foundation cards",
      "Polynomial-root theory and Vieta relations — later A1 cards",
      "Complex logarithms, branch cuts or complex-root conventions",
      "Limits, derivatives and integration",
    ],
    exitCondition: "Independently compare (x²−1)/(x−1) with x+1 as functions, explaining the missing point, and determine the real domain of a fresh composite containing at least a rational denominator plus a root or logarithm; no domain restriction may be silently lost.",
    nextArcBoundary: "002 / F2 keeps these domain habits but changes the object of study from expressions to solution sets, especially when algebraic transformations are only one-way implications.",
  }),

  card({
    id: "T25-ARC801-A02",
    routeOrder: 2,
    syllabusCode: "F2",
    parentId: "ARC801",
    title: "Equations & Inequalities as Solution Sets",
    focus: "Solving by tracking sets of valid solutions and the logical direction of each transformation, not by treating symbol movement as automatically reversible.",
    purpose: "Build a reliable solving discipline before polynomial, trigonometric, calculus and statistical parameter problems introduce transformations that can add, lose or condition solutions.",
    centralCapability: "Treat an equation or inequality as a claim about a solution set, distinguish equivalence-preserving transformations from implication-only steps, and verify candidates against the original domain and statement.",
    principalObstacle: "A transformed equation can be easier to solve while no longer being equivalent to the original; squaring may add candidates, division may discard zero cases, and inequality direction depends on sign information.",
    entryPrerequisites: [
      "001 / F1 — Domain-Safe Algebra",
      "Elementary linear-equation manipulation",
      "Basic ordering of real numbers",
    ],
    requiredOwnership: [
      "Describe solving as determining the set of inputs that make the original statement true.",
      "Label common transformations as equivalences or one-way implications and explain the consequence for candidate checking.",
      "Reject extraneous candidates introduced by squaring or other non-injective transformations by substituting into the original statement.",
      "Avoid dividing by an expression that may be zero; split cases when the zero case can carry solutions.",
      "Solve rational inequalities using sign intervals or equivalent justified case reasoning while respecting excluded points.",
      "Reverse an inequality only when multiplication/division by a negative quantity is established; split cases when its sign is unknown.",
      "Intersect algebraic candidates with the original domain and state the final solution set explicitly.",
    ],
    applicationScope: "One rational inequality requiring critical-point/sign analysis and one equation in which an apparently natural transformation introduces an extraneous candidate.",
    transferScope: "A parameterized or root/log equation where the learner must decide which transformations are reversible and identify a special zero/sign case without being told where it is.",
    inScope: [
      "Elementary equations and inequalities over the reals",
      "Rational equations and rational inequalities",
      "Equations involving elementary roots or logarithms where F1 supplies the domain",
      "Equivalent transformations versus implication-only transformations",
      "Extraneous and lost solutions",
      "Sign-dependent multiplication/division",
    ],
    outOfScope: [
      "Polynomial factor/Vieta theory — 008 / A1a",
      "Trigonometric equation families — 014 / G1b",
      "Root-count theorems using derivatives — later calculus cards",
      "Coordinate-geometry equation systems — 118 / G2",
      "Numerical root-finding algorithms",
    ],
    exitCondition: "Independently solve a fresh rational inequality by justified sign intervals and solve a separate equation where squaring or another one-way step creates at least one candidate that must be rejected in the original statement; every excluded point and case must be accounted for.",
    nextArcBoundary: "003 / F3 uses the same domain and substitution discipline inside function notation, changed inputs and parameterized families rather than solving for an unknown.",
  }),

  card({
    id: "T25-ARC801-A03",
    routeOrder: 3,
    syllabusCode: "F3",
    parentId: "ARC801",
    title: "Functions, Changed Inputs & Parameters",
    focus: "Function notation as an input-output rule: substitute the entire new input correctly and keep variables, parameters and constants in their proper roles.",
    purpose: "Prevent notation errors from contaminating difference quotients, transformations, parameterized distributions, likelihoods and every later topic that evaluates a function away from the literal symbol x.",
    centralCapability: "Interpret and evaluate changed-input function notation such as f(x+h), f(ax+b) and parameterized families while preserving the function's domain and distinguishing the varying input from fixed or separately varying parameters.",
    principalObstacle: "Visual pattern matching encourages errors such as f(x+h)=f(x)+h and makes symbols look as though their mathematical roles are fixed by their letters rather than by the definition and context.",
    entryPrerequisites: [
      "001 / F1 — Domain-Safe Algebra",
      "002 / F2 — Equations & Inequalities as Solution Sets",
      "Elementary idea of a function as a rule with a domain and codomain/target set",
    ],
    requiredOwnership: [
      "Evaluate a function at a changed input by substituting the entire input expression wherever the original input variable occurs.",
      "Distinguish f(x+h), f(x)+h and f(x+h)−f(x) both symbolically and conceptually.",
      "Identify from context which symbols are input variables, fixed constants and parameters indexing a family of functions.",
      "Reinterpret the same displayed formula correctly when a different symbol is declared to be the variable.",
      "Work with a parameterized family without confusing variation in the parameter with variation in the function input.",
      "Determine the legal input set of f(ax+b) or another changed-input expression by pulling the original domain restriction back through the substitution.",
      "Handle parameter values that qualitatively change the legal domain rather than assuming one answer works for every parameter.",
    ],
    applicationScope: "A domain-restricted function evaluated at several changed inputs, including f(ax+b), where a parameter changes the preimage of the original domain.",
    transferScope: "An unfamiliar notation for a family such as g_t(u) or h_θ(z), requiring the learner to identify roles and legal inputs without relying on the letters x and a.",
    inScope: [
      "Function as a rule on a stated domain",
      "Changed inputs and whole-expression substitution",
      "Variables, parameters and constants",
      "Dummy-variable renaming",
      "Parameterized one-variable families",
      "Domain pullback under elementary input transformations",
    ],
    outOfScope: [
      "Injectivity, surjectivity and inverse functions — 007 / F5c",
      "Systematic composition/inverse claims and periodicity — 011 / A5a",
      "Relations and equivalence classes — 006 / F5b",
      "Limits and continuity — 041–042",
      "Difference quotients as derivatives — 043 / C2",
      "Multivariable calculus",
    ],
    exitCondition: "Given a fresh domain-restricted function and a parameterized changed input f(ax+b), independently derive the legal x-domain for all relevant parameter cases, then explain in words and symbols why f(x+h), f(x)+h and f(x+h)−f(x) are different objects.",
    nextArcBoundary: "004 / F4 shifts from manipulating expressions to reading mathematical claims: quantifiers, implications, negations and counterexamples become explicit objects of reasoning.",
  }),

  card({
    id: "T25-ARC801-A04",
    routeOrder: 4,
    syllabusCode: "F4",
    parentId: "ARC801",
    title: "Mathematical Claims, Quantifiers & Counterexamples",
    focus: "The logical shape of elementary mathematical claims and the kind of evidence required to establish, negate or refute them.",
    purpose: "Create enough proof-language discipline for later theorem hypotheses, parameter cases, independence claims and statistical arguments without expanding into a standalone formal-logic course.",
    centralCapability: "Parse elementary implications and quantified statements, negate them correctly, distinguish necessary from sufficient conditions, and choose valid evidence such as a proof, witness or counterexample.",
    principalObstacle: "Mathematical sentences that look similar can demand completely different evidence: one example proves an existential claim but not a universal one, a converse is not the original implication, and negating quantifiers reverses both the quantifier and the predicate.",
    entryPrerequisites: [
      "002 / F2 — Equations & Inequalities as Solution Sets",
      "Comfort reading elementary algebraic statements",
    ],
    requiredOwnership: [
      "Identify hypotheses and conclusions in an implication and distinguish the implication from its converse.",
      "Use the contrapositive as a logically equivalent route to an implication while not confusing it with the converse.",
      "Interpret necessary and sufficient conditions in elementary mathematical language.",
      "Translate simple universal and existential claims between words and symbols.",
      "Negate elementary universal and existential statements correctly, including the predicate negation.",
      "Explain why examples cannot establish a universal claim and use a single valid counterexample to refute one.",
      "Provide a valid witness for an existential claim and distinguish witnessing from proving uniqueness or universality.",
      "Distinguish definitions from propositions/theorems that require justification.",
      "Audit a short argument and identify whether its conclusion actually follows from its stated assumptions.",
    ],
    applicationScope: "A small collection of algebra/function claims requiring different responses: one direct implication, one false converse, one quantified negation and one existential witness.",
    transferScope: "An unfamiliar entrance-style statement where the learner must first identify the logical form and decide whether proof, contradiction, contrapositive, witness or counterexample is the appropriate burden of evidence.",
    inScope: [
      "Implication, converse and contrapositive",
      "Necessary and sufficient conditions at an operational level",
      "Universal and existential quantifiers",
      "Negation of simple quantified statements",
      "Witnesses and counterexamples",
      "Definition versus theorem/proposition",
      "Assumption versus conclusion",
    ],
    outOfScope: [
      "A full formal-logic or proof-theory course",
      "Truth-table drill beyond what is useful for implication/equivalence",
      "Mathematical induction as a dedicated technique",
      "Set-theoretic foundations or axiomatic set theory",
      "Equivalence relations — 006 / F5b",
      "Olympiad-specific proof tricks unrelated to the entrance route",
    ],
    exitCondition: "Independently negate one statement containing both an all/exists structure and a mathematical predicate, refute a supplied false converse with a genuine counterexample, and write a short implication proof whose assumptions and conclusion are explicitly identified.",
    nextArcBoundary: "005 / F5a gives these logical tools a concrete language of sets, membership and products; relation properties and inverse-function questions remain reserved for 006–007.",
  }),

  card({
    id: "T25-ARC802-A01",
    routeOrder: 5,
    syllabusCode: "F5a",
    parentId: "ARC802",
    title: "Sets, Set Operations & Cartesian Products",
    focus: "Reading and manipulating sets precisely: membership, subset structure, set operations, complements relative to a universe, and ordered pairs in Cartesian products.",
    purpose: "Build the set language used everywhere later — events, supports, solution regions, relations and function domains — while keeping relation theory and inverse-function structure for the next two cards.",
    centralCapability: "Translate between verbal, set-builder and explicit descriptions of sets; compute and justify unions, intersections, differences/complements and Cartesian products; and distinguish elements, subsets and ordered pairs without type confusion.",
    principalObstacle: "Set notation hides type information: x∈A and {x}⊆A are different claims, complements are meaningless without an ambient universe, and A×B contains ordered pairs so swapping factors generally changes the set.",
    entryPrerequisites: [
      "003 / F3 — Functions, Changed Inputs & Parameters",
      "004 / F4 — Mathematical Claims, Quantifiers & Counterexamples",
      "Elementary arithmetic and interval notation",
    ],
    requiredOwnership: [
      "Distinguish element membership, subset inclusion, proper inclusion and equality of sets, including empty-set edge cases.",
      "Translate finite, interval and simple condition-defined sets among roster, interval and set-builder descriptions where appropriate.",
      "Compute unions, intersections and set differences/complements and state the ambient universe whenever complement notation depends on it.",
      "Use and justify basic set identities such as De Morgan laws by element-wise reasoning rather than only visual memorisation.",
      "Interpret A×B as a set of ordered pairs, distinguish it from an unordered pairing, and compute cardinality in finite cases.",
      "Recognize that A×B and B×A need not be equal and identify the exceptional situations where equality can occur.",
      "Translate simultaneous conditions into intersections and alternative conditions into unions, preserving domain restrictions from earlier cards.",
      "Audit a proposed set equality by proving both inclusions or destroying it with a counterexample.",
    ],
    applicationScope: "A mixed finite/interval/set-builder task requiring several operations and a Cartesian product, with at least one complement whose universe must be made explicit and one proposed identity that needs proof or counterexample.",
    transferScope: "A probability- or geometry-flavoured description converted into set language, where the learner must infer the correct intersections/unions/products without relation or probability machinery being supplied.",
    inScope: [
      "Elements, subsets, proper subsets and equality",
      "Empty set and universal/ambient set",
      "Roster, interval and elementary set-builder notation",
      "Union, intersection, difference and complement",
      "Elementary set identities including De Morgan laws",
      "Cartesian products and ordered pairs",
      "Finite-set cardinality of products",
    ],
    outOfScope: [
      "Relations and equivalence classes — 006 / F5b",
      "Injectivity, surjectivity, bijectivity and inverse functions — 007 / F5c",
      "Composition, inverse claims and periodicity — 011 / A5a",
      "Probability axioms and event arithmetic — 018 / P3",
      "Infinite-cardinality theory, countability and axiomatic set theory",
    ],
    exitCondition: "On a fresh problem, independently translate stated conditions into sets, compute a nontrivial combination of union/intersection/complement with the universe declared, form the relevant Cartesian product, and prove or refute one proposed set equality by element-wise reasoning or a counterexample without using relation/function results from later cards.",
    nextArcBoundary: "006 / F5b promotes subsets of Cartesian products to relations and asks when a relation is reflexive, symmetric and transitive enough to form equivalence classes.",
  }),
];

// ---------------------------------------------------------------------------
// Validation and lookup indexes
// ---------------------------------------------------------------------------

if (T25_MSTAT_120_ROUTE.length !== 120) {
  throw new Error(`MSTAT-120 route manifest must contain 120 entries; found ${T25_MSTAT_120_ROUTE.length}.`);
}
for (let i = 0; i < T25_MSTAT_120_ROUTE.length; i += 1) {
  const expected = i + 1;
  const spec = T25_MSTAT_120_ROUTE[i];
  if (spec.routeOrder !== expected) throw new Error(`MSTAT-120 route manifest gap at ${expected}.`);
}
if (new Set(T25_MSTAT_120_ROUTE.map(r => r.syllabusCode)).size !== 120) {
  throw new Error("Duplicate MSTAT-120 syllabus code in route manifest.");
}

T25_ATOMIC_CARDS.sort((a, b) => a.routeOrder - b.routeOrder);
if (new Set(T25_ATOMIC_CARDS.map(c => c.id)).size !== T25_ATOMIC_CARDS.length) {
  throw new Error("Duplicate authored T25 atomic ID.");
}
if (new Set(T25_ATOMIC_CARDS.map(c => c.routeOrder)).size !== T25_ATOMIC_CARDS.length) {
  throw new Error("Duplicate authored T25 route position.");
}
for (const c of T25_ATOMIC_CARDS) {
  const spec = T25_MSTAT_120_ROUTE[c.routeOrder - 1];
  if (!spec || spec.syllabusCode !== c.syllabusCode || spec.parentId !== c.parentId || spec.title !== c.title) {
    throw new Error(`Authored card ${c.id} does not match canonical MSTAT-120 route position ${c.routeOrder}.`);
  }
  for (const field of ["focus", "purpose", "centralCapability", "principalObstacle", "applicationScope", "transferScope", "exitCondition", "nextArcBoundary"]) {
    if (!c[field] || c[field].length < 20) throw new Error(`${c.id} has an incomplete ${field}.`);
  }
  if (c.entryPrerequisites.length === 0 || c.requiredOwnership.length < 5 || c.inScope.length < 4 || c.outOfScope.length < 4) {
    throw new Error(`${c.id} has an incomplete atomic learning contract.`);
  }
}

export const T25_ATOMIC_BY_ID = new Map(T25_ATOMIC_CARDS.map(c => [c.id, c]));
export const T25_ATOMIC_BY_ORDER = new Map(T25_ATOMIC_CARDS.map(c => [c.routeOrder, c]));
export const T25_ROUTE_BY_ORDER = new Map(T25_MSTAT_120_ROUTE.map(r => [r.routeOrder, r]));
export const T25_ATOMIC_BY_PARENT = new Map();
for (const c of T25_ATOMIC_CARDS) {
  if (!T25_ATOMIC_BY_PARENT.has(c.parentId)) T25_ATOMIC_BY_PARENT.set(c.parentId, []);
  T25_ATOMIC_BY_PARENT.get(c.parentId).push(c);
}
for (const cards of T25_ATOMIC_BY_PARENT.values()) cards.sort((a, b) => a.routeOrder - b.routeOrder);
