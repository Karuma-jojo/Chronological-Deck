import { WORLD } from "./world.js";

const T22_ID = "T22";
export const T22_ATOMIC_AUDIT_VERSION = "2.0";
export const T22_ATOMIC_TARGET_HOURS_PER_ARC = 4;
export const T22_ATOMIC_WORK_RANGE_HOURS = [2, 6];

const ENTRANCE_EXTENSION_PLAN = {
  ARC735: [
    "Propositions, Quantifiers & Negation",
    "Implication, Equivalence & Counterexamples",
    "Direct Proof, Contrapositive & Contradiction",
    "Mathematical Induction & Recursive Arguments",
    "Sets, Functions, Images & Preimages",
    "Relations, Equivalence Classes & Partitions",
    "Proof Diagnosis & Entrance Transfer Forge",
  ],
  ARC736: [
    "Algebraic Identities, Factorization & Simplification",
    "Equations, Polynomial Roots & Vieta Structure",
    "Inequalities, Absolute Value & Bounding",
    "Functions, Composition, Inverses & Graph Transformations",
    "Arithmetic & Geometric Progressions",
    "Exponentials, Logarithms & Growth Equations",
    "Complex Numbers & Plane Representation",
    "Trigonometric / Coordinate Algebra Transfer Forge",
  ],
  ARC737: [
    "Sum/Product Rules & Bijection-Based Counting",
    "Permutations with Restrictions",
    "Combinations & Binomial Coefficients",
    "Binomial / Multinomial Identities by Counting",
    "Inclusion-Exclusion",
    "Pigeonhole Principle & Extremal Counting",
    "Recurrence Relations & Recursive Counting",
    "Counting Probability & Entrance Transfer Forge",
  ],
  ARC738: [
    "Graph Models, Degrees & Handshaking",
    "Walks, Paths, Cycles & Connectivity",
    "Trees & Structural Characterizations",
    "Spanning Trees & Cut/Cycle Reasoning",
    "Bipartite Graphs & Two-Coloring",
    "Matchings & Hall-Style Reasoning",
    "Euler Trails, Hamiltonian Questions & Invariants",
    "Shortest Paths, MSTs & Correctness Reasoning",
    "Graph Proof & Entrance Transfer Forge",
  ],
};

export const T22_ENTRANCE_EXTENSION_IDS = Object.keys(ENTRANCE_EXTENSION_PLAN);

export const T22_ENTRANCE_EXTENSION_NODES = [
  {
    id: "ARC735",
    arc: "ARC 735",
    title: "Proof, Sets & Logical Reasoning",
    kind: "new",
    level: "L2",
    domains: ["Mathematics", "Statistics", "Computer Science"],
    summary:
      "Build the proof language and discrete mathematical reasoning repeatedly tested across quantitative master's entrances and technical problem solving.",
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: [],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T22 Quantitative Research Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS"],
    terminalTags: [T22_ID],
    requiredByCount: 1,
    stage: "Universal entrance extension",
    masteryScope:
      "Propositions and quantifiers; negation; implication and equivalence; counterexamples; direct proof, contrapositive and contradiction; induction; sets and functions; images and preimages; relations, equivalence relations, classes and partitions; proof diagnosis under unfamiliar entrance-style prompts.",
  },
  {
    id: "ARC736",
    arc: "ARC 736",
    title: "Classical Algebra & Function Problem Solving",
    kind: "new",
    level: "L2",
    domains: ["Mathematics", "Statistics", "Computer Science"],
    summary:
      "Restore fast, exact classical algebra and function fluency so advanced T22 mathematics is not undermined by entrance-exam school-math bottlenecks.",
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: ["ARC735"],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T22 Quantitative Research Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS"],
    terminalTags: [T22_ID],
    requiredByCount: 1,
    stage: "Universal entrance extension",
    masteryScope:
      "Algebraic identities and factorization; equations and polynomial roots; Vieta relations; inequalities and absolute value; functions, composition and inverses; AP/GP and finite sums; exponentials and logarithms; complex numbers; compact trigonometric and coordinate-algebra transfer problems.",
  },
  {
    id: "ARC737",
    arc: "ARC 737",
    title: "Combinatorics & Discrete Counting",
    kind: "new",
    level: "L2",
    domains: ["Mathematics", "Statistics", "Computer Science"],
    summary:
      "Develop counting structure that supports probability, algorithms and the discrete reasoning common to ISI/CMI-style quantitative entrances.",
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: ["ARC735", "ARC736"],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T22 Quantitative Research Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS"],
    terminalTags: [T22_ID],
    requiredByCount: 1,
    stage: "Universal entrance extension",
    masteryScope:
      "Sum/product rules; bijective counting; permutations and combinations with restrictions; binomial and multinomial coefficients; inclusion-exclusion; pigeonhole arguments; recurrence relations and recursive counting; counting-based probability and unfamiliar transfer problems.",
  },
  {
    id: "ARC738",
    arc: "ARC 738",
    title: "Graph Theory & Discrete Structures",
    kind: "new",
    level: "L3",
    domains: ["Mathematics", "Computer Science"],
    summary:
      "Add mathematical graph reasoning beyond basic traversal so T22 supports CMI/ISI-style discrete questions as well as algorithmic interviews.",
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: ["ARC735", "ARC717"],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T22 Quantitative Research Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS"],
    terminalTags: [T22_ID],
    requiredByCount: 1,
    stage: "Universal entrance extension",
    masteryScope:
      "Graph models and degree invariants; walks, paths, cycles and connectivity; trees and spanning trees; bipartite graphs; matching and Hall-style reasoning; Euler/Hamilton questions; cut/cycle reasoning; shortest paths and MST correctness; proof-oriented graph transfer.",
  },
];

const T22_ENTRANCE_PREREQS = {
  ARC735: [],
  ARC736: ["ARC735"],
  ARC737: ["ARC735", "ARC736"],
  ARC738: ["ARC735", "ARC717"],
};

const T22_ENTRANCE_STAGES = {
  ARC735: 0,
  ARC736: 0,
  ARC737: 1,
  ARC738: 1,
};

// Count is deliberately an output of the decomposition, never a design target.
const PLAN = {
  ARC053: [
    "Instantaneous Rate from Secants",
    "Vanishing Intervals & the Difference Quotient",
    "Tangent Slope & Local Linearity",
    "The Power Rule from First Principles",
    "Product & Quotient Rules from Structure",
    "The Chain Rule & Composition",
  ],
  SIDE263: [
    "Convergence, Divergence & Oscillation",
    "The Epsilon-N Challenge",
    "Limit Laws from the Definition",
    "Bounds, Squeezing & Failure Cases",
  ],
  ARC510: [
    "Accumulation from Finite Sums",
    "Riemann Sums & the Definite Integral",
    "Structure of the Definite Integral",
    "Accumulation Functions & FTC Part I",
    "Antiderivatives & FTC Part II",
    "Substitution / Change of Variables",
    "Integration by Parts",
    "Improper Integrals",
  ],
  ARC511: [
    "Vectors & Coordinate Arithmetic",
    "Linear Combinations & Span",
    "Linear Independence & Dependence",
    "Basis & Dimension",
    "Dot Products, Norms & Angles",
  ],
  SIDE276: [
    "Linear Transformations",
    "Matrix Representation & Matrix-Vector Action",
    "Composition & Matrix Multiplication",
    "Linear Systems & Gaussian Elimination",
    "Column Space, Null Space & Rank",
    "Invertibility & Inverse Maps",
    "Determinants",
    "Change of Basis & Similarity",
  ],
  SIDE278: [
    "Inner Products, Orthogonality & Orthonormal Sets",
    "Projection onto a Subspace",
    "Gram-Schmidt Orthogonalization",
    "Least Squares from Geometry",
  ],
  SIDE279: [
    "Invariant Directions",
    "Characteristic Equation & Eigenspaces",
    "Multiplicity & Repeated Eigenvalues",
    "Diagonalization & Matrix Powers",
    "Defective Matrices",
    "Symmetric Matrices & the Spectral Theorem",
    "Eigenstructure in Linear Dynamics",
  ],
  SIDE280: [
    "Quadratic Forms & Definiteness",
    "Positive-Semidefinite Matrices & Covariance Structure",
    "QR Factorization",
    "QR for Least Squares",
    "Cholesky Factorization",
    "Cholesky & Correlated Simulation",
    "Singular Values & SVD Geometry",
    "Pseudoinverse & Rank-Deficient Problems",
    "Low-Rank Approximation",
  ],
  SIDE267: [
    "Local Polynomial Approximation",
    "Higher-Order Taylor Polynomials",
    "Taylor Series & Canonical Expansions",
    "Remainders & Error Control",
    "Convergence & Failure of Taylor Representation",
  ],
  SIDE271: [
    "Partial Derivatives",
    "Directional Derivatives & the Gradient",
    "Total Differential & Local Linearity",
    "Multivariable Chain Rule",
    "Jacobians",
    "Hessians",
    "Second-Order Geometry",
  ],
  ARC711: [
    "Derivative Shapes & Matrix-Calculus Notation",
    "Differentials as a Calculation Language",
    "Quadratic Forms & Least-Squares Gradients",
    "Trace Calculus",
    "Derivatives of Matrix Inverses",
    "Determinants & Log-Determinants",
    "Matrix Calculus in Statistical Objectives",
    "Matrix-Gradient Forensics & Transfer",
  ],
  ARC512: [
    "From Rate Laws to Differential Equations",
    "Initial Conditions & Trajectories",
    "First-Order Solvable Models",
    "Equilibria & Phase-Line Reasoning",
    "Coupled Linear Systems",
    "Eigenvalues & Dynamical Stability",
    "Nonlinear Systems & Local Linearization",
    "Numerical Evolution & Model Failure",
  ],
  ARC515: [
    "Python Expressions, Types & Control Flow",
    "Functions & Decomposition",
    "Core Python Data Structures",
    "NumPy Arrays, Shape & Indexing",
    "Broadcasting",
    "Vectorization",
    "Random Numbers & Computational Experiments",
    "Tabular Research Data",
    "Plotting & Research Visualization",
    "Debugging, Assertions & Tests",
    "Reproducible Mini Research Project",
  ],
  ARC717: [
    "Time & Space Complexity",
    "Arrays & Strings as Algorithmic Objects",
    "Hash Maps & Sets",
    "Stacks, Queues & Deques",
    "Heaps & Priority Queues",
    "Sorting",
    "Binary Search",
    "Recursion & Divide-and-Conquer",
    "Graph Representation & Traversal",
    "Algorithm Selection & Interview Synthesis",
  ],
  ARC585: [
    "Floating-Point Arithmetic",
    "Conditioning vs Numerical Stability",
    "Direct Linear Solves & LU Structure",
    "Numerical QR & Least Squares",
    "Numerical Cholesky",
    "Eigenvalue Algorithms",
    "Computing the SVD",
    "Iterative Linear Solvers",
    "Sparse & Large-Scale Linear Algebra",
  ],
  ARC713: [
    "Measure Before Optimizing",
    "Memory Layout & Strides",
    "Views, Copies & Allocation",
    "Performance Through Vectorization",
    "Cache Locality & Access Patterns",
    "Batching & Memory-Constrained Computation",
    "Parallelism: When It Helps & When It Doesn't",
    "Performance Optimization Lab",
  ],
  ARC048: [
    "Sample Spaces & Events",
    "Counting Outcomes",
    "Probability Rules",
    "Conditional Probability",
    "Independence",
    "Expectation, Fair Games & the Problem of Points",
  ],
  SIDE476: [
    "Measurement Error & Uncertainty",
    "Absolute, Relative & Scale-Dependent Error",
    "Propagation of Uncertainty",
    "Error Budgets",
    "Numerical Uncertainty & Honest Reporting",
  ],
  ARC502: [
    "The Base-Rate Problem",
    "Bayes' Rule from Conditional Probability",
    "Odds & Likelihood Ratios",
    "Sequential Updating",
    "Prior Sensitivity & Model Dependence",
  ],
  ARC503: [
    "Population, Sample & Estimand",
    "Sampling Mechanisms",
    "Sampling Bias",
    "Empirical Distributions",
    "Sample Statistics & Variability",
    "Distributional Diagnostics & Selection Effects",
  ],
  ARC517: [
    "Random Variables as Functions",
    "Discrete Random Variables & PMFs",
    "Continuous Random Variables & Densities",
    "Cumulative Distribution Functions",
    "Expectation",
    "Variance, Standard Deviation & Moments",
    "Transformations of Random Variables",
    "Joint Distributions & Marginals",
    "Conditional Distributions & Conditional Expectation",
    "Independence of Random Variables",
    "Covariance & Correlation",
    "Canonical Discrete Distributions",
    "Canonical Continuous Distributions",
  ],
  ARC504: [
    "Estimands, Estimators & Estimates",
    "Sampling Distributions of Estimators",
    "Bias",
    "Variance & Mean-Squared Error of Estimators",
    "Standard Error",
    "Confidence Intervals & Coverage",
    "Effect Size & Practical Significance",
  ],
  ARC712: [
    "Sums, Averages & Repeated Sampling",
    "Law of Large Numbers",
    "Central Limit Theorem",
    "Standardization & Normal Approximation",
    "The Square-Root-n Law",
    "Markov & Chebyshev Bounds",
    "Exponential Concentration",
    "Heavy Tails, Dependence & Asymptotic Failure",
  ],
  ARC505: [
    "Null & Alternative Hypotheses",
    "Test Statistics & Null Distributions",
    "p-Values",
    "Significance Levels & Type-I Error",
    "Type-II Error & Statistical Power",
    "Power & Sample-Size Reasoning",
    "One-Sided, Two-Sided & Rejection Regions",
    "Multiple Testing & Family-Wise Error",
    "False Discovery Rate",
  ],
  ARC539: [
    "Simple Linear Regression as Approximation",
    "Least Squares Derivation",
    "Regression in Matrix Form",
    "Projection Geometry of OLS",
    "Multiple Regression & Partial Effects",
    "Residuals",
    "Linear-Model Assumptions",
    "Sampling Variability of Regression Coefficients",
    "Standard Errors & Confidence Intervals in Regression",
    "Categorical Predictors",
    "Interactions",
    "Transformations & Nonlinear Features",
    "Multicollinearity",
    "Leverage, Influence & Outlier Diagnostics",
    "Regression Research Lab",
  ],
  ARC531: [
    "Statistical Models & Parametric Families",
    "Probability vs Likelihood",
    "Constructing Likelihoods",
    "Log-Likelihood",
    "Maximum Likelihood Estimation",
    "Multiparameter & Constrained MLE",
    "Score Functions",
    "Hessian & Likelihood Curvature",
    "Numerical Maximum Likelihood",
    "Identifiability",
  ],
  ARC533: [
    "Information as Parameter Sensitivity",
    "Score Variability",
    "Fisher Information",
    "Observed vs Expected Information",
    "Information Additivity",
    "Cramer-Rao Lower Bound",
    "Efficiency & Asymptotic MLE Behaviour",
  ],
  ARC534: [
    "Simple-vs-Simple Hypothesis Testing",
    "Likelihood Ratios as Evidence",
    "Neyman-Pearson Optimality",
    "Power Functions",
    "Likelihood-Ratio Tests",
    "Composite Hypotheses",
    "Uniformly Most Powerful Tests",
    "Limits of Optimal Testing",
  ],
  ARC537: [
    "The Resampling Idea",
    "Empirical Distribution & Bootstrap Samples",
    "Bootstrap Sampling Distributions",
    "Bootstrap Standard Errors & Bias",
    "Bootstrap Confidence Intervals",
    "When the Bootstrap Fails",
    "Permutation Tests",
    "Rank-Based & Distribution-Free Reasoning",
    "Resampling Inference Lab",
  ],
  ARC506: [
    "Association vs Causation",
    "Confounding",
    "Reverse Causality",
    "Selection Bias",
    "Collider Bias",
    "Omitted Variables & Regression Coefficients",
    "Prediction vs Causal Estimation",
    "Identification & Causal Skepticism",
  ],
  ARC507: [
    "Observation vs Intervention",
    "Treatment & Comparison Groups",
    "Random Assignment",
    "Control Groups, Placebos & Counterfactual Thinking",
    "Blocking & Stratification",
    "Blinding & Measurement Bias",
    "Replication vs Repeated Measurement",
    "Factorial Experiments",
    "Experimental Design Forge",
  ],
  ARC508: [
    "Model vs Data-Generating Process",
    "Underfitting",
    "Overfitting",
    "Data Leakage",
    "Train / Validation / Test Separation",
    "Cross-Validation",
    "Hyperparameter Selection & Nested Evaluation",
    "Baselines & Null Models",
    "Time-Ordered Validation",
    "Distribution Shift",
    "Adversarial Out-of-Sample Defense",
  ],
  ARC509: [
    "Claims, Predictions & Falsifiability",
    "Research Logs",
    "Data Provenance",
    "Code & Environment Reproducibility",
    "Deterministic Pipelines & Artifacts",
    "Replication",
    "Negative Results & Researcher Degrees of Freedom",
    "Reproducible Research Defense",
  ],
  ARC513: [
    "Simulation as a Mathematical Experiment",
    "Monte Carlo Estimation",
    "Monte Carlo Error",
    "Accuracy vs Computational Cost",
    "Sampling Transformations",
    "Antithetic Variates",
    "Control Variates",
    "Importance Sampling",
    "Monte Carlo Design & Diagnostics Lab",
  ],
  ARC541: [
    "Multivariate Data as Random Vectors",
    "Covariance Matrices",
    "Covariance Geometry",
    "Multivariate Normal Distribution",
    "Mahalanobis Distance",
    "PCA as a Variance-Maximization Problem",
    "PCA & Eigenstructure",
    "Projection into Principal-Component Coordinates",
    "Choosing Dimensionality",
    "Linear Discriminant Analysis",
    "Quadratic Discrimination & Covariance Differences",
    "High-Dimensional Covariance Failure",
  ],
  ARC542: [
    "Time-Indexed Random Variables",
    "Temporal Dependence & Lag",
    "Stationarity",
    "Autocovariance",
    "Autocorrelation",
    "White Noise",
    "Trend & Deterministic Structure",
    "Differencing & Nonstationarity",
    "Autoregressive Models",
    "Higher-Order AR Models",
    "Moving-Average Models",
    "ARMA Models",
    "ACF & PACF Identification",
    "Parameter Estimation & Model Fitting",
    "Forecasting & Forecast Uncertainty",
    "Residual Diagnostics, Regimes & Time-Series Lab",
  ],
  ARC543: [
    "Hidden State vs Observation",
    "State-Space Representation",
    "Prediction of the Hidden State",
    "Prediction Uncertainty",
    "Measurement Update as Information Fusion",
    "Gaussian Conditioning Behind the Update",
    "Kalman Gain",
    "Full Kalman Recursion",
    "Multivariate Kalman Filtering",
    "Initialization & Filter Transients",
    "Smoothing",
    "Model Mismatch & Kalman Diagnostics",
  ],
  ARC524: [
    "The Markov Property",
    "Transition Matrices",
    "Multi-Step Evolution",
    "Communication & State Classes",
    "Recurrence & Transience",
    "Hitting & Return Times",
    "Stationary Distributions",
    "Reversibility & Detailed Balance",
    "Convergence & Mixing",
    "Markov Simulation & MCMC Bridge",
  ],
  ARC525: [
    "Counting Processes & Event Time",
    "Poisson Process Assumptions",
    "Poisson Counts",
    "Exponential Waiting Times",
    "Superposition & Thinning",
    "Nonhomogeneous Poisson Processes",
    "Renewal Processes",
    "Intensities & Conditional Arrival Rates",
    "Event-Time Modelling Lab",
  ],
  ARC514: [
    "Optimization Problems",
    "Local vs Global Optima",
    "First-Order Optimality",
    "Second-Order Optimality",
    "Constraints & Feasible Geometry",
    "Equality Constraints & Lagrange Multipliers",
    "Shadow Prices & Sensitivity",
    "Optimization Modelling Forge",
  ],
  ARC581: [
    "Affine Combinations & Affine Sets",
    "Convex Combinations & Convex Sets",
    "Operations that Preserve Convexity",
    "Hyperplanes & Halfspaces",
    "Separation",
    "Supporting Hyperplanes",
    "Convex Functions & Epigraphs",
    "First-Order Characterization of Convexity",
    "Second-Order Characterization",
    "Strict & Strong Convexity",
    "Subgradients & Nondifferentiable Convexity",
    "Convex Conjugates & Duality Intuition",
  ],
  ARC582: [
    "Standard Constrained Convex Programs",
    "The Lagrangian",
    "The Dual Function",
    "The Dual Problem & Weak Duality",
    "Duality Gap",
    "Strong Duality & Constraint Qualifications",
    "KKT Stationarity",
    "Primal & Dual Feasibility",
    "Complementary Slackness",
    "KKT Necessity",
    "KKT Sufficiency in Convex Problems",
    "Sensitivity & Shadow Prices",
    "Barrier Methods, Central Paths & Interior-Point Intuition",
  ],
  ARC586: [
    "Iterative Optimization",
    "Gradient Descent",
    "Step Size & Stability",
    "Line Search",
    "Optimization Stopping Criteria",
    "Newton's Method from Quadratic Approximation",
    "Newton Failure Modes",
    "Quasi-Newton Reasoning",
    "BFGS",
    "Projected Gradient Methods",
    "Penalty-Based Numerical Constraint Handling",
    "Computational Graphs",
    "Forward-Mode Automatic Differentiation",
    "Reverse-Mode Automatic Differentiation",
    "Finite Differences & Gradient Checking",
    "Numerical Optimization Lab",
  ],
  ARC589: [
    "Finite-Sum & Expected Objectives",
    "Stochastic Gradient Estimates",
    "Stochastic Gradient Descent",
    "Mini-Batches",
    "Learning-Rate Schedules",
    "Momentum",
    "Adaptive Coordinate Scaling",
    "Adam",
    "Gradient Noise & Variance",
    "Convergence Diagnostics",
    "Stochastic Optimization Failure Modes",
    "SGD Research Lab",
  ],
  ARC211: [
    "Sequential Decision Problems",
    "State Representation",
    "Optimal Substructure",
    "Bellman Recurrences",
    "Backward Induction",
    "Memoization",
    "Tabulation",
    "State-Space Explosion",
    "Dynamic-Programming Forge",
  ],
  ARC590: [
    "From Markov Chains to Controlled Markov Processes",
    "Rewards & Costs",
    "Policies",
    "Trajectories & Returns",
    "Finite vs Infinite Horizons",
    "Discounting",
    "State-Value Functions",
    "Action-Value Functions",
    "Bellman Expectation Equation",
    "Bellman Optimality Equation",
    "Policy Evaluation",
    "Policy Improvement & Policy Iteration",
    "Value Iteration",
    "MDP Modelling & Transfer",
  ],
  ARC593: [
    "Supervised Learning as a Mathematical Problem",
    "Loss Functions",
    "Population Risk",
    "Empirical Risk",
    "Empirical Risk Minimization",
    "Hypothesis Classes",
    "Approximation vs Estimation Error",
    "Bias-Variance Structure",
    "Model Capacity",
    "Shattering & VC-Dimension Intuition",
    "Generalization Bounds",
    "Sample Complexity & Learning Curves",
    "Distribution Shift & Limits of Learning Guarantees",
  ],
  ARC594: [
    "High-Dimensional Regimes",
    "Ill-Conditioning & Unstable Coefficients",
    "Regularization as Controlled Bias",
    "Ridge Regression",
    "Ridge Geometry",
    "Ridge Bias-Variance Behaviour",
    "Lasso",
    "Sparsity Geometry",
    "Lasso Optimization",
    "Elastic Net",
    "Penalized Likelihood",
    "Hyperparameter Selection Without Leakage",
    "Feature Selection Instability",
    "High-Dimensional Regularization Lab",
  ],
  ARC595: [
    "Recursive Partitioning",
    "Regression-Tree Split Criteria",
    "Classification-Tree Split Criteria",
    "Tree Depth & Complexity",
    "Tree Overfitting & Pruning",
    "Instability of Individual Trees",
    "Bagging",
    "Random Forests",
    "Out-of-Bag Evaluation",
    "Feature Importance & Its Failure Modes",
    "Boosting",
    "Gradient Boosting",
    "Shrinkage, Depth & Boosting Regularization",
    "Tree-Ensemble Research Lab",
  ],
  ARC599: [
    "Artificial Neurons",
    "Why Nonlinear Activations Matter",
    "Feed-Forward Networks",
    "Hidden Representations",
    "Output Layers & Loss Functions",
    "Forward Propagation",
    "Computational Graph of a Neural Network",
    "Backpropagation in a Scalar Network",
    "Backpropagation Through a Layer",
    "Parameter Gradients",
    "Full Training Loop",
    "Activation Functions & Saturation",
    "Weight Initialization",
    "Vanishing & Exploding Gradients",
    "Normalization",
    "Weight Decay & Neural Regularization",
    "Dropout",
    "Neural Optimization Diagnostics",
    "Network from Scratch",
    "Framework Training & Autodiff",
    "Neural Research Lab",
  ],
  ARC716: [
    "Relational Data Models, Tables & Keys",
    "Filtering & Projection with SQL",
    "Grouping & Aggregation",
    "Joins & Relationship Logic",
    "Window Functions for Ordered Data",
    "Subqueries, CTEs & Composable Queries",
    "Query Plans, Indexes & Cost Awareness",
    "Columnar Storage & Analytical File Formats",
    "Partitioning & Predicate Pushdown",
    "Lazy and Out-of-Core Query Workflows",
    "Reproducible Time-Series Query Pipeline Lab",
  ],
  ARC714: [
    "Market Data as an Event Stream",
    "Trades, Quotes & Order-Book Schemas",
    "Event Time vs Receive Time",
    "Clocks, Time Zones & Synchronization Assumptions",
    "Sequence Numbers, Duplicates & Missing Events",
    "Asynchronous Feeds",
    "As-Of Joins",
    "Trade-Quote Alignment",
    "Order-Book Event Reconstruction",
    "Sessions, Symbols & Market Boundaries",
    "Known-at-the-Time Causality",
    "Bars, Aggregation & Information Loss",
    "Dataset Invariants & Temporal Audits",
    "Raw-to-Research Market Dataset Lab",
  ],
  ARC715: [
    "Missingness Mechanisms in Financial Data",
    "Stale Observations",
    "Forward Fill, Interpolation & Fabricated Information",
    "Bad Ticks & Outliers",
    "Duplicates, Gaps & Corrupted Records",
    "Corporate Actions & Price Adjustments",
    "Identifiers, Symbol Changes & Mapping Errors",
    "Delistings & Survivorship Bias",
    "Universe Construction & Selection Bias",
    "Look-Ahead Leakage & Data Revisions",
    "Vendor Discrepancies",
    "Data Quality Rules, Audit Trails & Bias Tests",
    "Dirty Financial Data Lab",
  ],
  ARC553: [
    "Prices, Cash Flows & Returns",
    "Discounting & Present Value",
    "Compounding, Numeraire & Risk-Free Growth",
    "Arbitrage as a Trading Contradiction",
    "Law of One Price",
    "Replication",
    "State-Contingent Payoffs",
    "State Prices",
    "Risk-Neutral Probability Intuition",
    "Stochastic Discount Factors / Pricing Kernels",
    "Risk Premia & Expected Returns",
    "No-Arbitrage Pricing Forge",
  ],
  ARC554: [
    "Portfolio Returns as Linear Combinations",
    "Portfolio Variance & Covariance",
    "Diversification Geometry",
    "Two-Asset Risk-Return Frontiers",
    "Mean-Variance Optimization",
    "The Efficient Frontier",
    "Global Minimum-Variance Portfolio",
    "Risk-Free Asset & Tangency Portfolio",
    "Estimation Error in Portfolio Optimization",
    "Covariance Shrinkage for Portfolios",
    "Realistic Portfolio Constraints",
    "Factor Models for Returns",
    "Factor Exposures & Betas",
    "Factor Covariance & Idiosyncratic Risk",
    "Risk Attribution & Decomposition",
    "Portfolio Construction Research Lab",
  ],
  ARC558: [
    "Market Structure, Venues & Participants",
    "Bid, Ask, Midprice & Spread",
    "Market, Limit & Cancel Orders",
    "Limit-Order-Book Mechanics",
    "Matching Rules & Price-Time Priority",
    "Depth & Liquidity",
    "Price Formation",
    "Order Flow & Signed Volume",
    "Spread Components",
    "Adverse Selection",
    "Dealer / Market-Maker Inventory Risk",
    "Effective & Realized Spreads",
    "Queue Position & Priority",
    "Order-Book Imbalance & Microprice Intuition",
    "Empirical Microstructure Stylized Facts",
    "Microstructure Event-Data Lab",
  ],
  ARC559: [
    "The Execution Problem",
    "Implementation Shortfall",
    "Explicit vs Implicit Trading Costs",
    "Temporary vs Permanent Market Impact",
    "Estimating Impact from Data",
    "Urgency, Risk & Impact Trade-Offs",
    "TWAP, VWAP & Execution Benchmarks",
    "Participation-Rate Scheduling",
    "Optimal Execution under Price Risk",
    "Market vs Limit Order Choice",
    "Fill Probability & Queue Risk",
    "Liquidity Regimes & Adaptive Execution",
    "Transaction-Cost Analysis",
    "Execution Simulation & Evaluation Lab",
  ],
  ARC560: [
    "Research Question & Testable Hypothesis",
    "Economic / Market Mechanism",
    "Research Pre-Mortem & Failure Criteria",
    "Universe & Tradable-Set Definition",
    "Raw Data Provenance",
    "Timestamp & Temporal-Causality Audit",
    "Baseline & Null Strategy",
    "Feature Construction",
    "Target / Label Construction",
    "Sampling Horizon & Overlapping Observations",
    "Train, Validation, Test & Walk-Forward Design",
    "Backtest Engine Mechanics",
    "Positions, Returns & PnL Accounting",
    "Fees, Spreads & Transaction Costs",
    "Market Impact & Capacity",
    "Performance Metrics",
    "Risk & Drawdown Metrics",
    "Sampling Uncertainty of Backtest Results",
    "Multiple Testing & Data Snooping",
    "Backtest Overfitting & Researcher Degrees of Freedom",
    "Robustness & Sensitivity Analysis",
    "Regime and Subperiod Stability",
    "Position Sizing & Kelly Logic",
    "Portfolio Risk Limits & Failure Containment",
    "Reproducible Research Memo & Adversarial Final Defense",
  ],
};

const BASE_T22_ATOMIC_MODULES = Object.fromEntries(
  Object.entries(PLAN).map(([moduleId, titles], moduleIndex) => [
    moduleId,
    titles.map((title, index) => ({
      id: `T22-M${String(moduleIndex + 1).padStart(2, "0")}-A${String(index + 1).padStart(2, "0")}`,
      title,
      targetHours: T22_ATOMIC_TARGET_HOURS_PER_ARC,
    })),
  ]),
);

const ENTRANCE_T22_ATOMIC_MODULES = Object.fromEntries(
  Object.entries(ENTRANCE_EXTENSION_PLAN).map(([moduleId, titles], extensionIndex) => [
    moduleId,
    titles.map((title, index) => ({
      id: `T22-M${String(59 + extensionIndex).padStart(2, "0")}-A${String(index + 1).padStart(2, "0")}`,
      title,
      targetHours: T22_ATOMIC_TARGET_HOURS_PER_ARC,
    })),
  ]),
);

export const T22_ATOMIC_MODULES = {
  ...BASE_T22_ATOMIC_MODULES,
  ...ENTRANCE_T22_ATOMIC_MODULES,
};

export const T22_ATOMIC_COUNT = Object.values(T22_ATOMIC_MODULES)
  .reduce((total, arcs) => total + arcs.length, 0);

export const T22_ATOMIC_TARGET_HOURS =
  T22_ATOMIC_COUNT * T22_ATOMIC_TARGET_HOURS_PER_ARC;

export const T22_ATOMIC_POLICY = {
  unit: "Atomic ARC",
  targetHours: T22_ATOMIC_TARGET_HOURS_PER_ARC,
  normalRangeHours: [...T22_ATOMIC_WORK_RANGE_HOURS],
  designRule: "Atomic-arc count is bookkeeping only. There is no per-module cap, batch target or final T22 target. Split according to actual conceptual content until each unit is plausibly a 2–6 focused-hour WALL investigation.",
  scopeRule: "One principal conceptual obstacle, a coherent derivation/reasoning or implementation burden, enough operational use to make the idea usable, and one unfamiliar transfer. If the unit cannot reasonably close in one or two serious sessions, split it or move misplaced material to its natural module.",
  masteryRule: "T22 mastery is role-targeted mastery for quantitative research plus a compact universal entrance foundation, not field-complete mastery. Later modules deliberately reactivate and deepen earlier material instead of duplicating it.",
};

function addEntranceExtensionNodes(world) {
  const existing = new Set((world.nodes || []).map((node) => node.id));
  for (const template of T22_ENTRANCE_EXTENSION_NODES) {
    if (existing.has(template.id)) throw new Error(`T22 entrance extension cannot add duplicate node ${template.id}.`);
    const node = {
      ...template,
      domains: [...template.domains],
      storyPrereqs: [...template.storyPrereqs],
      crossLinks: [...template.crossLinks],
      masteryPrereqs: [...template.masteryPrereqs],
      gatewayTags: [...template.gatewayTags],
      terminalTags: [...template.terminalTags],
      terminalMasteryPrereqs: { [T22_ID]: [...T22_ENTRANCE_PREREQS[template.id]] },
      terminalStages: { [T22_ID]: T22_ENTRANCE_STAGES[template.id] },
    };
    world.nodes.push(node);
    existing.add(node.id);
  }
  world.worldCount = world.nodes.length;
  world.newCount = Number(world.newCount || 0) + T22_ENTRANCE_EXTENSION_NODES.length;
}

function applyT22AtomicArcs(world = WORLD) {
  const terminal = (world.terminals || []).find((candidate) => candidate.id === T22_ID);
  if (!terminal) throw new Error("T22 atomic plan requires the T22 terminal to be loaded first.");

  const baseOrder = terminal.order || terminal.required || [];
  if (baseOrder.length !== 58) {
    throw new Error(`T22 entrance extension expects the stable 58-module base route; found ${baseOrder.length}.`);
  }

  addEntranceExtensionNodes(world);
  terminal.required = [...(terminal.required || baseOrder), ...T22_ENTRANCE_EXTENSION_IDS];
  terminal.order = [...baseOrder, ...T22_ENTRANCE_EXTENSION_IDS];
  terminal.count = terminal.required.length;

  const moduleIds = terminal.order;
  if (moduleIds.length !== 62) {
    throw new Error(`T22 atomic plan expects 62 modules after the universal entrance extension; found ${moduleIds.length}.`);
  }

  const planIds = Object.keys(T22_ATOMIC_MODULES);
  if (planIds.length !== moduleIds.length) {
    throw new Error(`T22 atomic plan covers ${planIds.length} modules instead of ${moduleIds.length}.`);
  }
  moduleIds.forEach((moduleId, index) => {
    if (planIds[index] !== moduleId) {
      throw new Error(`T22 atomic module order drift at ${index + 1}: expected ${moduleId}, found ${planIds[index]}.`);
    }
  });

  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));
  const atomicIds = new Set();

  moduleIds.forEach((moduleId, moduleIndex) => {
    const node = byId.get(moduleId);
    if (!node) throw new Error(`T22 atomic plan cannot find module node ${moduleId}.`);
    const atomicArcs = T22_ATOMIC_MODULES[moduleId];
    if (!Array.isArray(atomicArcs) || !atomicArcs.length) {
      throw new Error(`T22 module ${moduleId} has no atomic arcs.`);
    }

    for (const atomic of atomicArcs) {
      if (atomicIds.has(atomic.id)) throw new Error(`Duplicate T22 atomic ID ${atomic.id}.`);
      atomicIds.add(atomic.id);
      if (atomic.targetHours !== T22_ATOMIC_TARGET_HOURS_PER_ARC) {
        throw new Error(`T22 atomic arc ${atomic.id} drifted from the normalized target time.`);
      }
    }

    node.terminalAtomicArcs = {
      ...(node.terminalAtomicArcs || {}),
      [T22_ID]: atomicArcs.map((atomic) => ({ ...atomic })),
    };
    node.terminalModuleWeights = {
      ...(node.terminalModuleWeights || {}),
      [T22_ID]: atomicArcs.length,
    };
    node.terminalModuleIndices = {
      ...(node.terminalModuleIndices || {}),
      [T22_ID]: moduleIndex,
    };
  });

  if (atomicIds.size !== 628 || T22_ATOMIC_COUNT !== 628) {
    throw new Error(`T22 atomic audit v2 with universal entrance extension must contain exactly 628 content-derived atomic arcs; found ${atomicIds.size}.`);
  }

  terminal.moduleCount = moduleIds.length;
  terminal.atomicCount = T22_ATOMIC_COUNT;
  terminal.atomicTargetHours = T22_ATOMIC_TARGET_HOURS;
  terminal.atomicTargetHoursPerArc = T22_ATOMIC_TARGET_HOURS_PER_ARC;
  terminal.atomicNormalRangeHours = [...T22_ATOMIC_WORK_RANGE_HOURS];
  terminal.atomicAuditVersion = T22_ATOMIC_AUDIT_VERSION;
  terminal.atomicPolicy = { ...T22_ATOMIC_POLICY, normalRangeHours: [...T22_ATOMIC_POLICY.normalRangeHours] };
  terminal.entranceExtensionModules = [...T22_ENTRANCE_EXTENSION_IDS];
  terminal.summary =
    `A 62-module / ${T22_ATOMIC_COUNT}-atomic-arc quantitative-research strike path with a compact four-module universal entrance foundation for proof/logic, classical algebra, combinatorics and graph/discrete reasoning. The original 58-module career spine and all existing T22-M01–M58 atomic IDs remain stable.`;
  terminal.routePolicy =
    `T22 keeps its original 58 prerequisite-ordered quantitative-research modules and appends four universal entrance modules as stable M59–M62. They are displayed in the mathematically appropriate early columns without renumbering any existing module or atomic ARC. M.Stat/MS(QE)/CMI-specific depth remains deferred to later optional packs. Each atomic arc targets about ${T22_ATOMIC_TARGET_HOURS_PER_ARC} focused hours (${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]} normal range); oversized units must split or move misplaced content instead of silently expanding.`;

  world.version = "1.7";
  world.title = "Chrono-Deck Scientific Mastery World v1.7";
  world.t22AtomicCount = T22_ATOMIC_COUNT;
  world.t22AtomicTargetHours = T22_ATOMIC_TARGET_HOURS;
  world.t22AtomicAuditVersion = T22_ATOMIC_AUDIT_VERSION;

  return world;
}

applyT22AtomicArcs();