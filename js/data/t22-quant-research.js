import { WORLD } from "./world.js";

export const T22_REQUIRED = [
  // Frozen 39-node scientific core.
  "ARC002",
  "ARC008",
  "ARC009",
  "SIDE478",
  "SIDE474",
  "SIDE476",
  "ARC501",
  "ARC502",
  "ARC503",
  "ARC504",
  "ARC505",
  "ARC506",
  "ARC507",
  "ARC508",
  "ARC509",
  "ARC570",
  "ARC001",
  "ARC024",
  "ARC045",
  "ARC063",
  "ARC053",
  "SIDE263",
  "ARC510",
  "ARC511",
  "SIDE276",
  "SIDE278",
  "ARC048",
  "ARC512",
  "ARC025",
  "ARC513",
  "ARC514",
  "ARC176",
  "ARC515",
  "SIDE267",
  "SIDE271",
  "SIDE279",
  "ARC517",
  "ARC539",
  "ARC061",

  // Statistical research and inference.
  "ARC531",
  "ARC533",
  "ARC534",
  "SIDE280",
  "ARC541",
  "ARC542",
  "ARC543",
  "ARC524",
  "ARC525",

  // Optimization, numerical methods and sequential decisions.
  "ARC581",
  "ARC582",
  "ARC585",
  "ARC586",
  "ARC589",
  "ARC211",
  "ARC590",

  // Practical statistical learning for research.
  "ARC593",
  "ARC594",
  "ARC595",

  // Markets, portfolios, microstructure and empirical quant research.
  "ARC553",
  "ARC554",
  "ARC558",
  "ARC559",
  "ARC560",

  // Research-coding / interview minimum rather than systems specialization.
  "SIDE420",
  "SIDE425",
  "SIDE430",
  "SIDE435",
  "SIDE466",
];

export const T22_DEFERRED_BRANCHES = {
  deepProbabilityAndStochasticCalculus: [
    "SIDE274",
    "ARC516",
    "ARC518",
    "ARC520",
    "ARC522",
    "ARC523",
    "ARC526",
    "ARC528",
    "ARC529",
  ],
  deskSpecificFinance: ["ARC555", "ARC556", "ARC557"],
  econometricsAndCausalDepth: ["ARC545", "ARC546", "ARC547", "ARC548", "ARC549", "ARC550"],
  deepMachineLearning: [
    "ARC596",
    "ARC597",
    "ARC598",
    "ARC599",
    "ARC600",
    "ARC601",
    "ARC602",
    "ARC603",
    "ARC604",
  ],
  systemsEngineering: ["ARC168", "ARC208", "SIDE437", "SIDE441"],
};

export const T22_TERMINAL = {
  name: "Mathematical Quantitative Research & Capital Building",
  field: "Economics/Finance",
  umbrella: "Economics, Decisions & Finance",
  summary:
    "Research-first quantitative path through probability and statistical inference, time series, statistical learning, optimization, numerical methods, portfolio/factor reasoning, market microstructure and execution. It is deliberately optimized for first-hire quantitative-research readiness rather than systems engineering or desk-specific product depth.",
  exit:
    "Form an empirical market hypothesis; build a leakage-safe reproducible research pipeline; implement and compare statistical/ML baselines; quantify uncertainty, multiple testing, transaction costs, market impact and failure modes; defend a research memo; and solve representative probability, statistics, optimization and algorithms interview problems. Research code must be independently executable, but production systems engineering is not part of this first-hire gate.",
  id: "T22",
  required: [...T22_REQUIRED],
  count: T22_REQUIRED.length,
  gateways: ["MathStats", "CS", "Econ"],
  routePolicy:
    "First-hire critical path. Deeper probability/stochastic calculus, desk-specific derivatives and fixed income, advanced econometrics, deep-learning stacks and systems engineering remain available as post-hire or target-role branches rather than blocking initial quantitative-research readiness.",
};

function addTerminalTag(node, terminalId) {
  const tags = Array.isArray(node.terminalTags) ? node.terminalTags : [];
  if (!tags.includes(terminalId)) {
    tags.push(terminalId);
    node.terminalTags = tags;
    node.requiredByCount = Number(node.requiredByCount || 0) + 1;
  }
}

function assertPrerequisiteClosure(world, requiredIds) {
  const required = new Set(requiredIds);
  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));

  for (const id of requiredIds) {
    const node = byId.get(id);
    if (!node) throw new Error(`T22 requires missing node ${id}.`);

    for (const prereq of node.masteryPrereqs || []) {
      if (!required.has(prereq)) {
        throw new Error(`T22 prerequisite closure failed: ${id} requires ${prereq}.`);
      }
    }
  }
}

export function applyT22QuantResearch(world = WORLD) {
  if (world.terminals?.some((terminal) => terminal.id === "T22")) return world;

  if ((world.nodes || []).length !== 710 || (world.terminals || []).length !== 21) {
    throw new Error(
      `T22 expects the post-law 710-node / 21-terminal registry; found ${world.nodes?.length || 0} nodes and ${world.terminals?.length || 0} terminals.`,
    );
  }

  if (new Set(T22_REQUIRED).size !== T22_REQUIRED.length) {
    throw new Error("T22 required-node list contains duplicate stable IDs.");
  }

  assertPrerequisiteClosure(world, T22_REQUIRED);

  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));
  for (const id of T22_REQUIRED) addTerminalTag(byId.get(id), "T22");

  world.version = "1.2";
  world.title = "Chrono-Deck Scientific Mastery World v1.2";
  world.terminals.push({
    ...T22_TERMINAL,
    required: [...T22_TERMINAL.required],
    gateways: [...T22_TERMINAL.gateways],
  });

  world.coreFrozenLabel = "39-node scientific core for T01–T20 and T22";
  world.corePolicy =
    "Frozen for scientific routes T01–T20 and T22; T21 is a separate law and jurisprudence terminal that reuses only relevant reasoning and evidence nodes. T22 is a focused first-hire quantitative-research route that reuses the frozen scientific core and defers nonessential specialization rather than adding new nodes.";

  return world;
}

applyT22QuantResearch();
