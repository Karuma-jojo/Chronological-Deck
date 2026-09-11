// Coverage routes point to study contracts, not to completed lessons or proofs.
// Read the linked official syllabus alongside these groupings. A unit can serve
// more than one clause; selected exam extensions include prerequisite closure.
function row(label, keys) { return { label, keys: keys.split(" ") }; }
export const T25_COVERAGE = {
  mstat: [
    row("Progressions; trigonometry; coordinate geometry and conics", "progressions trig lines conics"),
    row("Sets, functions, relations, permutations/combinations; binomial/multinomial theorems", "sets counting"),
    row("Theory of equations; complex numbers and De Moivre", "equations complex"),
    row("Vector spaces; determinant, rank, trace, inverse, systems and eigenstructure", "vectors matrices eigen"),
    row("One-variable limits, continuity, differentiation, integration and extrema", "limits derivatives extrema integrals"),
    row("Sample spaces, probability, combinatorial reasoning, conditioning, independence and Bayes", "events counting conditional independence"),
    row("Random variables, expectations, moments, MGFs and standard distributions", "expectation discrete continuous"),
    row("Transformations and order statistics", "transform order"),
    row("Joint, marginal and conditional laws; multinomial and multivariate normal", "joint mvn"),
    row("Sampling distributions; statements and applications of WLLN and CLT", "samplinglaws asymptotics"),
    row("Descriptive statistics, correlation, rank correlation and regression", "descriptive regression multiple"),
    row("Unbiasedness, minimum variance, sufficiency, maximum likelihood and moments", "estimators sufficiency mle mom"),
    row("Testing, Neyman–Pearson, confidence intervals and regression inference", "testing intervals regtests"),
    row("ANOVA, CRD, RBD, Latin squares and factorial designs", "crd rbd lsd factorial"),
    row("SRS with/without replacement and stratified sampling", "srswr srswor stratified"),
  ],
  cmi: [
    row("School mathematics: algebra, progressions, means, functions, matrices, calculus and elementary number theory", "language equations progressions sets matrices derivatives integrals numbertheory"),
    row("Discrete mathematics: sets, relations, counting, pigeonhole, induction and Boolean logic", "sets counting discreteproof"),
    row("Probability, distributions and statistical interpretation", "events conditional independence expectation discrete continuous descriptive"),
    row("Interpreting pseudocode: variables, conditionals and loops", "pseudocode"),
  ],
  st: [
    row("1. Calculus", "analysis multicalc"), row("2. Matrix theory", "matrices eigen complexmatrix"),
    row("3. Probability", "events conditional expectation probextras"), row("4. Univariate distributions", "discrete continuous probextras"),
    row("5. Joint distributions", "joint mvn order transform samplinglaws"), row("6. Convergence", "rvconvergence"),
    row("7. Stochastic processes", "markov poissonprocess brownian"), row("8. Estimation", "advancedestimation intervals"),
    row("9. Testing hypotheses", "advancedtests"), row("10. Nonparametric statistics", "nonparametric"),
    row("11. Multivariate analysis", "multivariateinference"), row("12. Regression", "regtests quadraticlaws"),
  ],
  da: [
    row("Probability and statistics", "expectation discrete continuous joint samplinglaws asymptotics intervals testing"),
    row("Linear algebra", "vectors matrices eigen numericmatrix"), row("Calculus and optimisation", "derivatives extrema"),
    row("Programming, data structures and algorithms", "python datastructures graphs"),
    row("Database management and warehousing", "databases warehousing"),
    row("Machine learning", "linearml neuralml treesmargin clustering"), row("Artificial intelligence", "aisearch aiprobability"),
  ],
  msqe: [
    row("Algebra, linear algebra and calculus/optimisation", "equations progressions counting vectors matrices eigen integrals econmath"),
    row("Probability and statistics", "events conditional discrete continuous descriptive samplinglaws estimators intervals testing regression"),
    row("Microeconomics", "choice production marketpower welfare"),
    row("Macroeconomics", "macroaccounts macroshort macrogrowth"),
  ],
  ma: [
    row("1. Calculus", "multicalc vectorcalculus"), row("2. Linear algebra", "advancedlinear"),
    row("3. Real analysis", "realadvanced"), row("4. Complex analysis", "complexanalysis"),
    row("5. Ordinary differential equations", "odes"), row("6. Algebra", "abstractalgebra"),
    row("7. Functional analysis", "functional"), row("8. Numerical analysis", "numerical"),
    row("9. Partial differential equations", "pdes"), row("10. Topology", "topology"),
    row("11. Linear programming", "linearprogramming"),
  ],
  cs: [
    row("1. Engineering mathematics", "csdiscrete matrices numericmatrix derivatives integrals expectation discrete continuous"),
    row("2. Digital logic", "digitallogic"), row("3. Computer organisation", "architecture"),
    row("4. Programming and data structures", "cprogramming csalgorithms"), row("5. Algorithms", "csalgorithms"),
    row("6. Theory of computation", "automata"), row("7. Compiler design", "compilers"),
    row("8. Operating systems", "operatingsystems"), row("9. Databases", "databases transactions"),
    row("10. Computer networks", "networks"),
  ],
  ga: [row("Verbal, quantitative, analytical and spatial aptitude (15 marks in GATE 2027)", "aptitude")],
};
