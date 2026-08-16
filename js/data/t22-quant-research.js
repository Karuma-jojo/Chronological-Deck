import { WORLD } from "./world.js";

const T22_ID = "T22";

function createT22Node(number, title, level, summary, masteryPrereqs, masteryScope) {
  return {
    id: `ARC${number}`,
    arc: `ARC ${number}`,
    title,
    kind: "new",
    level,
    domains: ["Mathematics", "Statistics", "Computer Science", "Economics/Finance"],
    summary,
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: [...masteryPrereqs],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T22 Quantitative Research Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS", "Econ"],
    terminalTags: [T22_ID],
    requiredByCount: 1,
    stage: "Quantitative research strike path",
    masteryScope,
  };
}

export const T22_NEW_NODES = [
  createT22Node(
    711,
    "Matrix Calculus for Quantitative Models",
    "L3",
    "Differentiate scalar, vector and matrix expressions used in optimization, likelihood models, portfolio problems and machine learning.",
    ["SIDE271", "SIDE276"],
    "Matrix differentials; gradients, Jacobians and Hessians; quadratic forms; trace identities; derivatives of inverse and determinant expressions; gradient derivations for least squares, likelihoods, portfolio objectives and backpropagation.",
  ),
  createT22Node(
    712,
    "LLN, CLT & Concentration for Empirical Research",
    "L3",
    "Build working asymptotic and finite-sample intuition for why averages stabilize, when normal approximations work and how sharply random quantities can deviate.",
    ["ARC517", "ARC504"],
    "Weak/working forms of the law of large numbers and central limit theorem without measure-theoretic prerequisites; standard errors; normal approximation; Chebyshev/Hoeffding-style concentration intuition; failure conditions and dependence caveats.",
  ),
  createT22Node(
    713,
    "Performance-Aware Scientific Computing",
    "L3",
    "Make research code fast and memory-conscious enough for large datasets without turning the route into a systems-engineering degree.",
    ["ARC515", "ARC585"],
    "Time and memory complexity in numerical workloads; contiguous memory and cache locality; allocation costs; vectorization; batching; profiling; avoiding accidental copies; memory-aware algorithms; when parallelism helps; performance measurement before optimization.",
  ),
  createT22Node(
    714,
    "Market Data Engineering & Temporal Alignment",
    "L4",
    "Reconstruct trustworthy market datasets from asynchronous, event-driven observations while preserving what was actually knowable at each instant.",
    ["ARC515", "ARC542", "ARC716"],
    "Event time versus receive time; timestamps and clock assumptions; as-of joins; asynchronous feeds; quote/trade alignment; order-book event reconstruction; symbol/session boundaries; causal temporal ordering; reproducible dataset construction.",
  ),
  createT22Node(
    715,
    "Dirty Financial Data, Missingness & Bias",
    "L4",
    "Detect and control the mundane data defects that otherwise turn a beautiful model into a fictional backtest.",
    ["ARC714", "ARC509"],
    "Missingness mechanisms; stale observations; forward-fill decisions; bad ticks and outliers; corporate actions; delistings; survivorship and selection bias; look-ahead leakage; universe construction; revisions; vendor inconsistencies; audit trails and bias tests.",
  ),
  createT22Node(
    716,
    "Efficient Data Querying for Time-Series Research",
    "L3",
    "Retrieve, join and aggregate large research datasets without loading the entire world into memory.",
    ["ARC515", "ARC713"],
    "Relational and columnar thinking; SQL fundamentals; filtering and projection; joins and as-of joins; grouping/window operations; partitioning; predicate pushdown; columnar file formats; lazy/out-of-core workflows; reproducible query pipelines.",
  ),
  createT22Node(
    717,
    "Quant Coding & Core Algorithms",
    "L3",
    "Compress the interview-relevant algorithm toolkit into one practical arc centered on research programming rather than general software engineering.",
    ["ARC515"],
    "Big-O and memory complexity; arrays, strings, hash maps/sets, stacks, queues and heaps; sorting and binary search; recursion; basic graph traversal when useful; implementation trade-offs; debugging; representative quantitative-research coding interviews.",
  ),
];

// T22 is deliberately a separate career gate. The wider Chrono-Deck can retain
// historically rich global masteryPrereqs while this terminal uses the lean,
// job-directed prerequisite graph below.
export const T22_ORDER = [
  // Phase 1 — mathematical engine.
  "ARC053",
  "SIDE263",
  "ARC510",
  "ARC511",
  "SIDE276",
  "SIDE278",
  "SIDE279",
  "SIDE280",
  "SIDE267",
  "SIDE271",
  "ARC711",
  "ARC512",

  // Phase 2 — research computing & probability.
  "ARC515",
  "ARC717",
  "ARC585",
  "ARC713",
  "ARC048",
  "SIDE476",
  "ARC502",
  "ARC503",
  "ARC517",
  "ARC504",
  "ARC712",

  // Phase 3 — statistical research & stochastic models.
  "ARC505",
  "ARC539",
  "ARC531",
  "ARC533",
  "ARC534",
  "ARC537",
  "ARC506",
  "ARC507",
  "ARC508",
  "ARC509",
  "ARC513",
  "ARC541",
  "ARC542",
  "ARC543",
  "ARC524",
  "ARC525",

  // Phase 4 — optimization, learning & data systems.
  "ARC514",
  "ARC581",
  "ARC582",
  "ARC586",
  "ARC589",
  "ARC211",
  "ARC590",
  "ARC593",
  "ARC594",
  "ARC595",
  "ARC599",
  "ARC716",
  "ARC714",
  "ARC715",

  // Phase 5 — markets & capstone.
  "ARC553",
  "ARC554",
  "ARC558",
  "ARC559",
  "ARC560",
];

export const T22_PREREQS = {
  ARC053: [],
  SIDE263: ["ARC053"],
  ARC510: ["ARC053", "SIDE263"],
  ARC511: [],
  SIDE276: ["ARC511"],
  SIDE278: ["SIDE276"],
  SIDE279: ["SIDE276"],
  SIDE280: ["SIDE278", "SIDE279"],
  SIDE267: ["ARC053", "SIDE263"],
  SIDE271: ["ARC510", "SIDE276"],
  ARC711: ["SIDE271", "SIDE276"],
  ARC512: ["ARC510", "SIDE276"],

  ARC515: ["ARC053"],
  ARC717: ["ARC515"],
  ARC585: ["SIDE280", "ARC515"],
  ARC713: ["ARC515", "ARC585"],
  ARC048: [],
  SIDE476: ["ARC048"],
  ARC502: ["ARC048"],
  ARC503: ["ARC048"],
  ARC517: ["ARC048", "ARC503"],
  ARC504: ["ARC503", "ARC517"],
  ARC712: ["ARC517", "ARC504"],

  ARC505: ["ARC504", "ARC712"],
  ARC539: ["ARC504", "SIDE278", "ARC517"],
  ARC531: ["ARC504", "ARC517"],
  ARC533: ["ARC531"],
  ARC534: ["ARC505", "ARC531", "ARC533"],
  ARC537: ["ARC531", "ARC515"],
  ARC506: ["ARC503", "ARC539"],
  ARC507: ["ARC505", "ARC506"],
  ARC508: ["ARC507", "ARC539", "ARC531"],
  ARC509: ["ARC508", "ARC515"],
  ARC513: ["ARC517", "ARC515"],
  ARC541: ["SIDE280", "ARC539"],
  ARC542: ["ARC539", "SIDE263"],
  ARC543: ["ARC542", "SIDE276"],
  ARC524: ["ARC517", "SIDE279"],
  ARC525: ["ARC517"],

  ARC514: ["SIDE271", "SIDE276"],
  ARC581: ["ARC514", "SIDE278"],
  ARC582: ["ARC581"],
  ARC586: ["ARC582", "ARC585", "ARC711"],
  ARC589: ["ARC582", "ARC531"],
  ARC211: ["ARC514"],
  ARC590: ["ARC211", "ARC514", "ARC524"],
  ARC593: ["ARC508", "ARC531", "ARC539"],
  ARC594: ["ARC593", "ARC582"],
  ARC595: ["ARC593"],
  ARC599: ["ARC593", "ARC589", "ARC711"],
  ARC716: ["ARC515", "ARC713"],
  ARC714: ["ARC515", "ARC542", "ARC716"],
  ARC715: ["ARC714", "ARC509"],

  ARC553: ["ARC048", "ARC514"],
  ARC554: ["ARC541", "ARC553", "ARC582"],
  ARC558: ["ARC553", "ARC503", "ARC714"],
  ARC559: ["ARC558", "ARC514", "ARC713"],
  ARC560: ["ARC554", "ARC559", "ARC505", "ARC508", "ARC715"],
};

export const T22_REQUIRED = [...T22_ORDER];

export const T22_DEFERRED_BRANCHES = {
  historicalScientificCorpus: [
    "ARC001",
    "ARC002",
    "ARC008",
    "ARC009",
    "ARC024",
    "ARC025",
    "ARC045",
    "ARC061",
    "ARC063",
    "SIDE474",
    "SIDE478",
    "ARC501",
    "ARC570",
  ],
  deepProbabilityAndStochasticCalculus: [
    "SIDE274",
    "ARC516",
    "ARC518",
    "ARC520",
    "ARC521",
    "ARC522",
    "ARC523",
    "ARC526",
    "ARC528",
    "ARC529",
  ],
  deskSpecificFinance: ["ARC555", "ARC556", "ARC557"],
  econometricsAndCausalDepth: ["ARC545", "ARC546", "ARC547", "ARC548", "ARC549", "ARC550"],
  deepMachineLearning: ["ARC596", "ARC597", "ARC598", "ARC600", "ARC601", "ARC602", "ARC603", "ARC604"],
  systemsEngineering: ["ARC168", "ARC208", "ARC216", "SIDE437", "SIDE441", "SIDE445"],
};

export const T22_TERMINAL = {
  name: "Mathematical Quantitative Research & Capital Building",
  field: "Economics/Finance",
  umbrella: "Economics, Decisions & Finance",
  summary:
    "A 58-node first-hire strike path: mathematical modelling, probability/statistics, optimization and machine learning, research coding, real market-data handling, microstructure, execution and adversarial empirical validation. The historical Chrono spine remains available in parallel but no longer blocks career readiness.",
  exit:
    "Complete three defended artifacts: (1) reconstruct a raw market dataset with correct temporal alignment and bias controls; (2) build a leakage-safe signal research pipeline with baselines, uncertainty, multiple-testing control, walk-forward evaluation, costs and market impact; and (3) profile and materially improve a slow or memory-hungry research implementation. Then defend the work as a research memo and pass representative probability, statistics, optimization and quant-coding interviews.",
  id: T22_ID,
  required: [...T22_REQUIRED],
  order: [...T22_ORDER],
  count: T22_REQUIRED.length,
  gateways: ["MathStats", "CS", "Econ"],
  stageNames: [
    "Mathematical engine",
    "Research computing & probability",
    "Statistical research & stochastic models",
    "Optimization, learning & data systems",
    "Markets & capstone",
  ],
  admissionAssumptions:
    "Basic arithmetic, algebra, functions and deductive reasoning are entry assumptions for the career gate. Chrono-Deck historical arcs can teach and deepen them, but they do not block T22 progress.",
  routePolicy:
    "T22 uses terminal-specific prerequisites rather than inheriting every historical/global mastery prerequisite. Its 58 required nodes are ordered as a validated topological learning path. Deeper probability, stochastic calculus, desk-specific finance, econometrics, systems engineering and broader historical study remain optional/post-hire branches unless a target role later makes them necessary.",
};

const T22_PHASES = [
  T22_ORDER.slice(0, 12),
  T22_ORDER.slice(12, 23),
  T22_ORDER.slice(23, 39),
  T22_ORDER.slice(39, 53),
  T22_ORDER.slice(53),
];

const T22_PRESENTATION_OVERRIDES = {
  SIDE280: {
    title: "Matrix Factorizations & Positive-Definite Matrices",
    scope:
      "Positive-definite matrices; covariance geometry; eigendecomposition, SVD, QR and Cholesky factorization; stable linear solves; correlated simulation; choosing a factorization by numerical and statistical purpose.",
  },
  ARC509: {
    title: "Epistemic Discipline & Research Reproducibility",
    scope:
      "Falsification discipline; research logs; data/model provenance; reproducible pipelines; replication; versioned assumptions; communicating uncertainty and failure honestly.",
  },
  ARC513: {
    title: "Monte Carlo Methods & Simulation",
    scope:
      "Pseudo-random simulation; Monte Carlo estimators; convergence/error diagnostics; variance reduction intuition; correlated simulation; reproducible experiments and computational trade-offs.",
  },
};

function addTerminalTag(node, terminalId) {
  const tags = Array.isArray(node.terminalTags) ? node.terminalTags : [];
  if (!tags.includes(terminalId)) {
    tags.push(terminalId);
    node.terminalTags = tags;
    node.requiredByCount = Number(node.requiredByCount || 0) + 1;
  }
}

function addT22Nodes(world) {
  const existing = new Set((world.nodes || []).map((node) => node.id));
  for (const node of T22_NEW_NODES) {
    if (existing.has(node.id)) throw new Error(`T22 cannot add duplicate node ${node.id}.`);
    world.nodes.push({ ...node, masteryPrereqs: [...node.masteryPrereqs], terminalTags: [...node.terminalTags] });
    existing.add(node.id);
  }
}

function validateT22Order(world) {
  if (new Set(T22_ORDER).size !== T22_ORDER.length) throw new Error("T22 order contains duplicate node IDs.");
  if (T22_ORDER.length !== 58) throw new Error(`T22 strike path must contain exactly 58 nodes; found ${T22_ORDER.length}.`);

  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));
  const position = new Map(T22_ORDER.map((id, index) => [id, index]));

  for (const id of T22_ORDER) {
    if (!byId.has(id)) throw new Error(`T22 requires missing node ${id}.`);
    const prereqs = T22_PREREQS[id];
    if (!Array.isArray(prereqs)) throw new Error(`T22 is missing terminal-specific prerequisites for ${id}.`);
    for (const prereq of prereqs) {
      if (!position.has(prereq)) throw new Error(`T22 prerequisite ${prereq} for ${id} is outside the 58-node strike path.`);
      if (position.get(prereq) >= position.get(id)) {
        throw new Error(`T22 order is not topological: ${id} appears before prerequisite ${prereq}.`);
      }
    }
  }
}

function attachT22Metadata(world) {
  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));

  T22_PHASES.forEach((ids, stageIndex) => {
    for (const id of ids) {
      const node = byId.get(id);
      addTerminalTag(node, T22_ID);
      node.terminalMasteryPrereqs = { ...(node.terminalMasteryPrereqs || {}), [T22_ID]: [...T22_PREREQS[id]] };
      node.terminalStages = { ...(node.terminalStages || {}), [T22_ID]: stageIndex };
    }
  });

  for (const [id, override] of Object.entries(T22_PRESENTATION_OVERRIDES)) {
    const node = byId.get(id);
    node.terminalTitles = { ...(node.terminalTitles || {}), [T22_ID]: override.title };
    node.terminalMasteryScope = { ...(node.terminalMasteryScope || {}), [T22_ID]: override.scope };
  }
}

export function applyT22QuantResearch(world = WORLD) {
  if (world.terminals?.some((terminal) => terminal.id === T22_ID)) return world;

  if ((world.nodes || []).length !== 710 || (world.terminals || []).length !== 21) {
    throw new Error(
      `T22 expects the post-law 710-node / 21-terminal registry; found ${world.nodes?.length || 0} nodes and ${world.terminals?.length || 0} terminals.`,
    );
  }

  addT22Nodes(world);
  validateT22Order(world);
  attachT22Metadata(world);

  world.version = "1.3";
  world.title = "Chrono-Deck Scientific Mastery World v1.3";
  world.worldCount = world.nodes.length;
  world.newCount = Number(world.newCount || 0) + T22_NEW_NODES.length;
  world.terminals.push({
    ...T22_TERMINAL,
    required: [...T22_TERMINAL.required],
    order: [...T22_TERMINAL.order],
    gateways: [...T22_TERMINAL.gateways],
    stageNames: [...T22_TERMINAL.stageNames],
  });

  world.coreFrozenLabel = "39-node scientific core for T01–T20; T22 runs a separate 58-node career strike path";
  world.corePolicy =
    "The 39-node scientific core remains frozen for T01–T20. T21 is a separate law and jurisprudence route. T22 preserves the broader Chrono-Deck as parallel lifelong study but uses its own validated 58-node prerequisite graph so historical depth cannot silently block first-hire quantitative-research readiness.";

  return world;
}

applyT22QuantResearch();
