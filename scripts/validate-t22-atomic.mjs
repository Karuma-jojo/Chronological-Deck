import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const {
  T22_ATOMIC_AUDIT_VERSION,
  T22_ATOMIC_MODULES,
  T22_ATOMIC_COUNT,
  T22_ATOMIC_TARGET_HOURS,
  T22_ATOMIC_TARGET_HOURS_PER_ARC,
  T22_ATOMIC_WORK_RANGE_HOURS,
  T22_ENTRANCE_EXTENSION_IDS,
} = await import("../js/data/t22-atomic-arcs.js");

const errors = [];
function expect(condition, message) {
  if (!condition) errors.push(message);
}

const t22 = WORLD.terminals.find((terminal) => terminal.id === "T22");
const byId = new Map(WORLD.nodes.map((node) => [node.id, node]));
const moduleIds = t22?.order || [];
const atomicIds = Object.values(T22_ATOMIC_MODULES).flat().map((arc) => arc.id);
const uniqueAtomicIds = new Set(atomicIds);
const baseModuleCounts = T22_ORDER.map((moduleId) => T22_ATOMIC_MODULES[moduleId]?.length || 0);
const batchTotals = [0, 10, 20, 30, 40, 50].map((start, index) => {
  const end = index < 5 ? start + 10 : 58;
  return baseModuleCounts.slice(start, end).reduce((sum, count) => sum + count, 0);
});

expect(Boolean(t22), "T22 terminal must exist before applying atomic metadata.");
expect(WORLD.nodes.length === 738, `Atomic entrance overlay should produce 738 world nodes; found ${WORLD.nodes.length}.`);
expect(WORLD.worldCount === 738, `Atomic entrance overlay should expose worldCount=738; found ${WORLD.worldCount}.`);
expect(WORLD.version === "1.7", `Atomic overlay should promote WORLD.version to 1.7; found ${WORLD.version}.`);
expect(T22_ATOMIC_AUDIT_VERSION === "2.0", `Expected T22 atomic audit v2.0; found ${T22_ATOMIC_AUDIT_VERSION}.`);
expect(T22_ORDER.length === 58, `Stable T22 career spine must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(moduleIds.length === 62, `Extended T22 route should expose 62 modules; found ${moduleIds.length}.`);
expect(
  JSON.stringify(moduleIds.slice(0, 58)) === JSON.stringify(T22_ORDER),
  "Universal entrance extension must preserve the original 58-module T22 order exactly.",
);
expect(
  JSON.stringify(moduleIds.slice(58)) === JSON.stringify(T22_ENTRANCE_EXTENSION_IDS),
  `Expected entrance extension tail ${JSON.stringify(T22_ENTRANCE_EXTENSION_IDS)}; found ${JSON.stringify(moduleIds.slice(58))}.`,
);
expect(Object.keys(T22_ATOMIC_MODULES).length === 62, `Atomic plan should cover 62 modules; found ${Object.keys(T22_ATOMIC_MODULES).length}.`);
expect(T22_ATOMIC_COUNT === 628, `Expected 628 content-derived atomic arcs; found ${T22_ATOMIC_COUNT}.`);
expect(uniqueAtomicIds.size === atomicIds.length, "T22 atomic IDs must be globally unique.");
expect(T22_ATOMIC_TARGET_HOURS_PER_ARC === 4, "T22 atomic bookkeeping target should remain 4 focused hours per arc.");
expect(
  JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS) === JSON.stringify([2, 6]),
  `T22 normal atomic work range should remain 2–6h; found ${JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS)}.`,
);
expect(T22_ATOMIC_TARGET_HOURS === 2512, `Expected nominal T22 bookkeeping effort of 2512h; found ${T22_ATOMIC_TARGET_HOURS}.`);
expect(t22?.count === 62, `T22 terminal should expose count=62; found ${t22?.count}.`);
expect(t22?.moduleCount === 62, `T22 terminal should expose moduleCount=62; found ${t22?.moduleCount}.`);
expect(t22?.atomicCount === 628, `T22 terminal should expose atomicCount=628; found ${t22?.atomicCount}.`);
expect(t22?.atomicTargetHours === 2512, `T22 terminal should expose atomicTargetHours=2512; found ${t22?.atomicTargetHours}.`);
expect(t22?.atomicAuditVersion === "2.0", `T22 terminal should expose atomicAuditVersion=2.0; found ${t22?.atomicAuditVersion}.`);
expect(
  JSON.stringify(t22?.entranceExtensionModules || []) === JSON.stringify(T22_ENTRANCE_EXTENSION_IDS),
  "T22 terminal should expose the four universal entrance extension modules explicitly.",
);
expect(
  JSON.stringify(batchTotals) === JSON.stringify([63, 76, 94, 104, 138, 121]),
  `Original 58-module audited batch totals drifted; found ${JSON.stringify(batchTotals)}.`,
);

for (const [moduleIndex, moduleId] of moduleIds.entries()) {
  const node = byId.get(moduleId);
  const plan = T22_ATOMIC_MODULES[moduleId];
  expect(Boolean(node), `Missing T22 macro module node ${moduleId}.`);
  expect(Array.isArray(plan) && plan.length > 0, `T22 module ${moduleId} must contain at least one atomic arc.`);
  expect(
    JSON.stringify(node?.terminalAtomicArcs?.T22 || []) === JSON.stringify(plan || []),
    `${moduleId} live terminalAtomicArcs drifted from the atomic plan.`,
  );
  expect(
    node?.terminalModuleWeights?.T22 === plan?.length,
    `${moduleId} terminal module weight should equal its atomic arc count.`,
  );
  expect(
    node?.terminalModuleIndices?.T22 === moduleIndex,
    `${moduleId} terminal module index should remain ${moduleIndex}.`,
  );
  for (const arc of plan || []) {
    expect(arc.targetHours === 4, `${arc.id} should retain 4h bookkeeping metadata.`);
    expect(/^T22-M\d{2}-A\d{2}$/.test(arc.id), `${arc.id} does not use the stable T22-Mxx-Axx format.`);
    expect(Boolean(arc.title), `${arc.id} is missing a daily atomic-arc title.`);
  }
}

for (const [index, moduleId] of T22_ORDER.entries()) {
  const firstArc = T22_ATOMIC_MODULES[moduleId]?.[0]?.id || "";
  const expectedPrefix = `T22-M${String(index + 1).padStart(2, "0")}-`;
  expect(firstArc.startsWith(expectedPrefix), `${moduleId} lost its stable pre-extension module number ${expectedPrefix}.`);
}

const expectedWeights = {
  ARC053: 6,
  SIDE263: 4,
  ARC515: 11,
  ARC539: 15,
  ARC542: 16,
  ARC599: 21,
  ARC716: 11,
  ARC714: 14,
  ARC715: 13,
  ARC553: 12,
  ARC554: 16,
  ARC558: 16,
  ARC559: 14,
  ARC560: 25,
  ARC735: 7,
  ARC736: 8,
  ARC737: 8,
  ARC738: 9,
};
for (const [moduleId, expected] of Object.entries(expectedWeights)) {
  expect(T22_ATOMIC_MODULES[moduleId]?.length === expected, `${moduleId} should contain ${expected} audited atomic arcs.`);
}
expect(
  T22_ATOMIC_MODULES.ARC053?.[0]?.title === "Instantaneous Rate from Secants",
  "Original T22 career spine should still begin with Instantaneous Rate from Secants.",
);
expect(
  T22_ATOMIC_MODULES.ARC560?.at(-1)?.title === "Reproducible Research Memo & Adversarial Final Defense",
  "Original 58-module career spine should still end with the adversarial research defense.",
);
expect(
  T22_ATOMIC_MODULES.ARC738?.at(-1)?.title === "Graph Proof & Entrance Transfer Forge",
  "Universal entrance extension should end with the graph proof transfer forge.",
);
expect(byId.get("ARC735")?.terminalStages?.T22 === 0, "Proof/logic entrance module should render in T22 column 1.");
expect(byId.get("ARC736")?.terminalStages?.T22 === 0, "Classical algebra entrance module should render in T22 column 1.");
expect(byId.get("ARC737")?.terminalStages?.T22 === 1, "Combinatorics entrance module should render in T22 column 2.");
expect(byId.get("ARC738")?.terminalStages?.T22 === 1, "Graph-theory entrance module should render in T22 column 2.");
expect(
  !Object.values(T22_ATOMIC_MODULES).flat().some((arc) => /Cross-Validation/.test(arc.title) && !arc.id.startsWith("T22-M32-")),
  "Cross-validation should live in M32 rather than leaking into resampling modules.",
);

if (errors.length) {
  console.error(`T22 atomic validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `T22 Atomic Audit v${T22_ATOMIC_AUDIT_VERSION} OK: 62 macro modules (58 stable career + 4 universal entrance), ` +
    `${T22_ATOMIC_COUNT} content-derived atomic arcs, ${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]}h normal range, ` +
    `~${T22_ATOMIC_TARGET_HOURS_PER_ARC}h bookkeeping target per arc / ~${T22_ATOMIC_TARGET_HOURS} nominal hours; ` +
    `original career batch totals ${batchTotals.join("/")}; 738-node world validated; T22-M01–M58 numbering preserved.`,
);