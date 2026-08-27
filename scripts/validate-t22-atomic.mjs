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
} = await import("../js/data/t22-atomic-arcs.js");

const errors = [];
function expect(condition, message) {
  if (!condition) errors.push(message);
}

const t22 = WORLD.terminals.find((terminal) => terminal.id === "T22");
const byId = new Map(WORLD.nodes.map((node) => [node.id, node]));
const atomicIds = Object.values(T22_ATOMIC_MODULES).flat().map((arc) => arc.id);
const uniqueAtomicIds = new Set(atomicIds);
const moduleCounts = T22_ORDER.map((moduleId) => T22_ATOMIC_MODULES[moduleId]?.length || 0);
const batchTotals = [0, 10, 20, 30, 40, 50].map((start, index) => {
  const end = index < 5 ? start + 10 : 58;
  return moduleCounts.slice(start, end).reduce((sum, count) => sum + count, 0);
});

expect(Boolean(t22), "T22 terminal must exist before applying atomic metadata.");
expect(WORLD.nodes.length === 734, `Atomic overlay must not add world nodes; found ${WORLD.nodes.length}.`);
expect(WORLD.worldCount === 734, `Atomic overlay must preserve worldCount=734; found ${WORLD.worldCount}.`);
expect(WORLD.version === "1.7", `Atomic overlay should promote WORLD.version to 1.7; found ${WORLD.version}.`);
expect(T22_ATOMIC_AUDIT_VERSION === "2.0", `Expected T22 atomic audit v2.0; found ${T22_ATOMIC_AUDIT_VERSION}.`);
expect(T22_ORDER.length === 58, `T22 macro route should remain 58 modules; found ${T22_ORDER.length}.`);
expect(Object.keys(T22_ATOMIC_MODULES).length === 58, `Atomic plan should cover 58 modules; found ${Object.keys(T22_ATOMIC_MODULES).length}.`);
expect(T22_ATOMIC_COUNT === 596, `Expected 596 content-derived atomic arcs; found ${T22_ATOMIC_COUNT}.`);
expect(uniqueAtomicIds.size === atomicIds.length, "T22 atomic IDs must be globally unique.");
expect(T22_ATOMIC_TARGET_HOURS_PER_ARC === 4, "T22 atomic bookkeeping target should remain 4 focused hours per arc.");
expect(
  JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS) === JSON.stringify([2, 6]),
  `T22 normal atomic work range should remain 2–6h; found ${JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS)}.`,
);
expect(T22_ATOMIC_TARGET_HOURS === 2384, `Expected nominal T22 bookkeeping effort of 2384h; found ${T22_ATOMIC_TARGET_HOURS}.`);
expect(t22?.moduleCount === 58, `T22 terminal should expose moduleCount=58; found ${t22?.moduleCount}.`);
expect(t22?.atomicCount === 596, `T22 terminal should expose atomicCount=596; found ${t22?.atomicCount}.`);
expect(t22?.atomicTargetHours === 2384, `T22 terminal should expose atomicTargetHours=2384; found ${t22?.atomicTargetHours}.`);
expect(t22?.atomicAuditVersion === "2.0", `T22 terminal should expose atomicAuditVersion=2.0; found ${t22?.atomicAuditVersion}.`);
expect(
  JSON.stringify(batchTotals) === JSON.stringify([63, 76, 94, 104, 138, 121]),
  `Audited batch totals drifted; found ${JSON.stringify(batchTotals)}.`,
);

for (const [moduleIndex, moduleId] of T22_ORDER.entries()) {
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
};
for (const [moduleId, expected] of Object.entries(expectedWeights)) {
  expect(T22_ATOMIC_MODULES[moduleId]?.length === expected, `${moduleId} should contain ${expected} audited atomic arcs.`);
}
expect(
  T22_ATOMIC_MODULES.ARC053?.[0]?.title === "Instantaneous Rate from Secants",
  "T22 should begin with Instantaneous Rate from Secants.",
);
expect(
  T22_ATOMIC_MODULES.ARC560?.at(-1)?.title === "Reproducible Research Memo & Adversarial Final Defense",
  "T22 should end with the adversarial research defense.",
);
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
  `T22 Atomic Audit v${T22_ATOMIC_AUDIT_VERSION} OK: 58 macro modules, ${T22_ATOMIC_COUNT} content-derived atomic arcs, ` +
    `${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]}h normal range, ` +
    `~${T22_ATOMIC_TARGET_HOURS_PER_ARC}h bookkeeping target per arc / ~${T22_ATOMIC_TARGET_HOURS} nominal hours; ` +
    `batch totals ${batchTotals.join("/")}; 734-node world preserved.`,
);
