import { WORLD } from "./world.js";

const T22_ID = "T22";
export const T22_ATOMIC_TARGET_HOURS_PER_ARC = 4;
export const T22_ATOMIC_WORK_RANGE_HOURS = [2, 6];

const PLAN = {
  ARC053: [
    "Instantaneous Rate from Secants",
    "Derivative as a Limit",
    "Derivative Rules from Structure",
    "Local Linearity, Sensitivity & Transfer",
  ],
  SIDE263: [
    "Convergence and the Epsilon Challenge",
    "Limit Laws, Bounds & Failure Cases",
  ],
  ARC510: [
    "Accumulation from Sums",
    "Definite Integral as a Limit",
    "Fundamental Theorem of Calculus",
  ],
  ARC511: [
    "Vectors, Coordinates & Linear Combinations",
    "Span, Independence, Basis & Dimension",
    "Dot Products, Norms & Geometry",
  ],
  SIDE276: [
    "Linear Maps and Matrix Representation",
    "Composition, Inverses & Change of Coordinates",
    "Rank, Null Space & Solving Systems",
  ],
  SIDE278: [
    "Orthogonality and Projection",
    "Least Squares from Geometry",
  ],
  SIDE279: [
    "Eigenvectors as Invariant Directions",
    "Characteristic Equation & Diagonalization",
    "Dynamics, Covariance & Spectral Transfer",
  ],
  SIDE280: [
    "Positive-Definite Geometry",
    "QR Factorization & Least Squares",
    "Cholesky Factorization & Correlated Simulation",
    "SVD, Low Rank & Conditioning",
  ],
  SIDE267: [
    "Taylor Approximation from Local Derivatives",
    "Remainders, Error & When Taylor Fails",
  ],
  SIDE271: [
    "Partial Derivatives and Gradients",
    "Multivariable Chain Rule & Jacobians",
    "Hessians, Curvature & Local Approximation",
  ],
  ARC711: [
    "Vector Derivatives and Matrix Differentials",
    "Quadratic Forms and Trace Tricks",
    "Inverse, Determinant & Log-Det Derivatives",
  ],
  ARC512: [
    "State, ODEs & Initial-Value Problems",
    "Equilibria and Stability",
    "Linear Systems and Phase Portraits",
    "Nonlinear Dynamics, Feedback & Modelling Transfer",
  ],

  ARC515: [
    "Python as a Research Calculator",
    "Arrays, Vectorization & Broadcasting",
    "Functions, Data Structures & Clean Experiments",
    "Plotting, Notebooks & Reproducibility",
    "Testing, Git & a Small Research Package",
  ],
  ARC717: [
    "Complexity and Cost Models",
    "Arrays, Strings, Hash Maps & Sets",
    "Stacks, Queues, Heaps & Priority Problems",
    "Sorting, Binary Search & Selection",
    "Recursion, Graph Traversal & Interview Synthesis",
  ],
  ARC585: [
    "Floating Point, Conditioning & Stability",
    "Direct Linear Solves and Factorizations",
    "Eigenvalue and SVD Algorithms",
    "Iterative Solvers and Large Problems",
  ],
  ARC713: [
    "Memory Layout, Allocation & Copies",
    "Vectorization, Batching & Cache Locality",
    "Profiling and Performance Experiments",
  ],
  ARC048: [
    "Counting, Sample Spaces & Conditional Probability",
    "Expectation, Fair Games & the Problem of Points",
  ],
  SIDE476: [
    "Measurement Error, Propagation & Significant Information",
    "Numerical Uncertainty and Error Budgets",
  ],
  ARC502: [
    "Base Rates and Conditional Evidence",
    "Bayes Rule, Odds and Sequential Updating",
  ],
  ARC503: [
    "Populations, Samples and Sampling Bias",
    "Variability, Empirical Distributions & Sampling Error",
    "Selection Effects and Distributional Diagnostics",
  ],
  ARC517: [
    "Random Variables, PMF/PDF/CDF",
    "Expectation, Variance and Moments",
    "Joint Distributions, Covariance and Correlation",
    "Conditioning, Independence and Transformations",
    "Canonical Distributions and Modelling Choices",
  ],
  ARC504: [
    "Point Estimation, Bias and Variance",
    "Standard Errors and Interval Logic",
    "Effect Size, Practical Significance & Uncertainty Communication",
  ],
  ARC712: [
    "Law of Large Numbers and Stabilization",
    "Central Limit Theorem and Normal Approximation",
    "Concentration Bounds and Finite-Sample Control",
    "Dependence, Heavy Tails and Asymptotic Failure",
  ],

  ARC505: [
    "Null Models, Test Statistics and p-Values",
    "Type I/II Error, Power and Sample Size",
    "Multiple Testing and False Discovery",
    "Testing Discipline and Quant Research Failure Modes",
  ],
  ARC539: [
    "Least Squares from Projection",
    "Multiple Regression and Coefficient Meaning",
    "Residuals, Diagnostics and Assumption Failure",
    "Uncertainty, Interactions and Transformations",
    "Regression Research Lab",
  ],
  ARC531: [
    "Statistical Models and Likelihood",
    "Maximum Likelihood Estimation",
    "Score, Hessian and Identifiability",
    "Likelihood Diagnostics and Numerical Fitting",
  ],
  ARC533: [
    "Fisher Information and Curvature",
    "Cramer-Rao Bounds and Efficiency",
  ],
  ARC534: [
    "Neyman-Pearson Optimality",
    "Likelihood-Ratio Tests",
    "Composite Hypotheses, Power & UMP Limits",
  ],
  ARC537: [
    "Bootstrap and Jackknife",
    "Permutation Tests, Cross-Validation & Resampling Failure",
  ],
  ARC506: [
    "Confounding, Selection and Reverse Causality",
    "Causal Questions versus Predictive Questions",
  ],
  ARC507: [
    "Controls, Randomization, Blocking and Blinding",
    "Replication, Factorial Design and Pre-Specified Outcomes",
  ],
  ARC508: [
    "Assumptions, Leakage and Researcher Degrees of Freedom",
    "Train/Validation/Test and Walk-Forward Logic",
    "Overfitting, Baselines and Out-of-Sample Survival",
  ],
  ARC509: [
    "Falsification, Research Logs and Provenance",
    "Reproducible Pipelines, Replication and Honest Reporting",
  ],
  ARC513: [
    "Monte Carlo Estimation and Error",
    "Variance Reduction and Correlated Simulation",
    "Simulation Design, Diagnostics and Reproducibility",
  ],
  ARC541: [
    "Covariance Geometry and Multivariate Normal Intuition",
    "Principal Components from Eigenstructure",
    "Discrimination, Multivariate Distances and Classification",
    "High-Dimensional Covariance Failure and Regularization",
  ],
  ARC542: [
    "Stationarity, Autocovariance and Dependence",
    "Autoregressive Models",
    "Moving-Average and ARMA Models",
    "Forecasting, Diagnostics and Residual Whiteness",
    "Time-Series Research Lab and Regime Failure",
  ],
  ARC543: [
    "State-Space Representation",
    "Kalman Prediction and Update",
    "Filtering, Smoothing and Model Diagnostics",
  ],
  ARC524: [
    "Transition Matrices and the Markov Property",
    "Recurrence, Transience and Hitting Times",
    "Stationary Distributions and Reversibility",
    "Mixing, Simulation and MCMC Intuition",
  ],
  ARC525: [
    "Poisson Process and Exponential Waiting Times",
    "Renewal Processes and Arrival Structure",
    "Point-Process Intensities and Event-Time Modelling",
  ],

  ARC514: [
    "Objectives, Constraints and Local/Global Optima",
    "Lagrange Multipliers and Trade-Off Geometry",
  ],
  ARC581: [
    "Convex Sets and Separation",
    "Convex Functions and First-Order Geometry",
    "Conjugates and Dual Problems",
    "Strong Duality and Economic Interpretation",
  ],
  ARC582: [
    "Constrained Convex Problems and Lagrangians",
    "KKT Conditions",
    "Complementary Slackness and Sensitivity",
    "Barrier and Interior-Point Methods",
  ],
  ARC586: [
    "Gradient Descent and Line Search",
    "Newton, Quasi-Newton & Constrained Optimization",
    "Automatic Differentiation and Gradient Checking",
  ],
  ARC589: [
    "Stochastic Approximation and Noisy Gradients",
    "SGD Variants, Mini-Batches and Variance",
    "Convergence Diagnostics and Stochastic Failure Modes",
  ],
  ARC211: [
    "Bellman Principle and Optimal Substructure",
    "Dynamic Programming from Recurrences",
  ],
  ARC590: [
    "MDPs, Policies and Returns",
    "Bellman Expectation and Optimality Equations",
    "Value Iteration, Policy Iteration and Transfer",
  ],
  ARC593: [
    "Prediction as Empirical Risk Minimization",
    "Bias-Variance, Capacity and Generalization",
    "Validation, Distribution Shift and Learning Curves",
  ],
  ARC594: [
    "Ridge and Shrinkage",
    "Lasso, Sparsity and Penalized Likelihood",
    "High-Dimensional Failure, Selection and Stability",
  ],
  ARC595: [
    "Decision Trees and Recursive Partitioning",
    "Bagging and Random Forests",
    "Gradient Boosting and Tabular Research",
  ],
  ARC599: [
    "Feed-Forward Networks and Representation",
    "Backpropagation from the Chain Rule",
    "Initialization, Normalization and Optimization",
    "Regularization, Diagnostics and a Small Neural Research Lab",
  ],
  ARC716: [
    "Relational Thinking and SQL Basics",
    "Joins, Aggregation and Window Operations",
    "Columnar Storage, Partitioning and Out-of-Core Queries",
  ],
  ARC714: [
    "Event Time, Receive Time and Clock Assumptions",
    "As-Of Joins and Asynchronous Feed Alignment",
    "Trades, Quotes and Order-Book Event Reconstruction",
    "Temporal Causality and Reproducible Market Datasets",
  ],
  ARC715: [
    "Missingness, Stale Data and Bad Ticks",
    "Corporate Actions, Delistings and Survivorship Bias",
    "Look-Ahead Leakage, Universe Construction and Data Audits",
  ],

  ARC553: [
    "Discounting, Cash Flows and No-Arbitrage",
    "Replication and State-Price Intuition",
    "Risk, Expected Return and Stochastic Discount Factors",
  ],
  ARC554: [
    "Mean-Variance Geometry and Efficient Portfolios",
    "Covariance Estimation, Shrinkage and Estimation Error",
    "Factor Models and Risk Decomposition",
    "Portfolio Construction under Realistic Constraints",
  ],
  ARC558: [
    "Spreads, Depth and Price Formation",
    "Limit Orders, Market Orders and the Order Book",
    "Adverse Selection, Inventory and Order Flow",
    "Microstructure Data Lab and Empirical Stylized Facts",
  ],
  ARC559: [
    "Implementation Shortfall and Trading Costs",
    "Temporary/Permanent Impact and Execution Scheduling",
    "Liquidity Risk, Fills and Execution Evaluation",
  ],
  ARC560: [
    "Research Hypothesis, Baselines and Pre-Mortem",
    "Leakage-Safe Backtest and Walk-Forward Evaluation",
    "Multiple Testing, Kelly and Risk Limits",
    "Costs, Impact, Robustness and Final Defense",
  ],
};

export const T22_ATOMIC_MODULES = Object.fromEntries(
  Object.entries(PLAN).map(([moduleId, titles], moduleIndex) => [
    moduleId,
    titles.map((title, index) => ({
      id: `T22-M${String(moduleIndex + 1).padStart(2, "0")}-A${String(index + 1).padStart(2, "0")}`,
      title,
      targetHours: T22_ATOMIC_TARGET_HOURS_PER_ARC,
    })),
  ]),
);

export const T22_ATOMIC_COUNT = Object.values(T22_ATOMIC_MODULES)
  .reduce((total, arcs) => total + arcs.length, 0);

export const T22_ATOMIC_TARGET_HOURS =
  T22_ATOMIC_COUNT * T22_ATOMIC_TARGET_HOURS_PER_ARC;

export const T22_ATOMIC_POLICY = {
  unit: "Atomic ARC",
  targetHours: T22_ATOMIC_TARGET_HOURS_PER_ARC,
  normalRangeHours: [...T22_ATOMIC_WORK_RANGE_HOURS],
  scopeRule:
    "One central conceptual breakthrough plus enough technique to use it, one meaningful application or implementation when appropriate, and one unfamiliar transfer. If an atomic arc exceeds about 6 focused hours without advancing its central objective, split or defer the excess rather than silently expanding the unit.",
  masteryRule:
    "T22 mastery is role-targeted mastery for quantitative research, not field-complete mastery. Later modules deliberately reactivate and deepen earlier material.",
};

function applyT22AtomicArcs(world = WORLD) {
  const terminal = (world.terminals || []).find((candidate) => candidate.id === T22_ID);
  if (!terminal) throw new Error("T22 atomic plan requires the T22 terminal to be loaded first.");

  const moduleIds = terminal.order || terminal.required || [];
  if (moduleIds.length !== 58) {
    throw new Error(`T22 atomic plan expects 58 modules; found ${moduleIds.length}.`);
  }

  const planIds = Object.keys(T22_ATOMIC_MODULES);
  if (planIds.length !== moduleIds.length) {
    throw new Error(`T22 atomic plan covers ${planIds.length} modules instead of ${moduleIds.length}.`);
  }

  const moduleSet = new Set(moduleIds);
  for (const id of planIds) {
    if (!moduleSet.has(id)) throw new Error(`T22 atomic plan contains non-route module ${id}.`);
  }

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

  if (atomicIds.size !== 187 || T22_ATOMIC_COUNT !== 187) {
    throw new Error(`T22 atomic plan must contain exactly 187 atomic arcs; found ${atomicIds.size}.`);
  }

  terminal.moduleCount = moduleIds.length;
  terminal.atomicCount = T22_ATOMIC_COUNT;
  terminal.atomicTargetHours = T22_ATOMIC_TARGET_HOURS;
  terminal.atomicTargetHoursPerArc = T22_ATOMIC_TARGET_HOURS_PER_ARC;
  terminal.atomicNormalRangeHours = [...T22_ATOMIC_WORK_RANGE_HOURS];
  terminal.atomicPolicy = { ...T22_ATOMIC_POLICY, normalRangeHours: [...T22_ATOMIC_POLICY.normalRangeHours] };
  terminal.summary =
    `A 58-module / ${T22_ATOMIC_COUNT}-atomic-arc first-hire strike path. The macro graph preserves prerequisites; normalized atomic arcs make daily work and progress comparable while keeping mathematical modelling, probability/statistics, optimization, machine learning, research coding, market-data handling, microstructure, execution and adversarial empirical validation in one coherent route.`;
  terminal.routePolicy =
    `T22 uses 58 prerequisite-ordered modules containing ${T22_ATOMIC_COUNT} normalized atomic arcs. Each atomic arc targets about ${T22_ATOMIC_TARGET_HOURS_PER_ARC} focused hours (${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]} normal range). Module clearance requires its atomic arcs; the wider Chrono-Deck remains parallel lifelong study and does not block first-hire readiness.`;

  world.version = "1.6";
  world.title = "Chrono-Deck Scientific Mastery World v1.6";
  world.t22AtomicCount = T22_ATOMIC_COUNT;
  world.t22AtomicTargetHours = T22_ATOMIC_TARGET_HOURS;

  return world;
}

applyT22AtomicArcs();
