import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const {
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

expect(Boolean(t22), "T22 terminal must exist before applying atomic metadata.");
expect(WORLD.nodes.length === 734, `Atomic overlay must not add world nodes; found ${WORLD.nodes.length}.`);
expect(WORLD.worldCount === 734, `Atomic overlay must preserve worldCount=734; found ${WORLD.worldCount}.`);
expect(WORLD.version === "1.6", `Atomic overlay should promote WORLD.version to 1.6; found ${WORLD.version}.`);
expect(T22_ORDER.length === 58, `T22 macro route should remain 58 modules; found ${T22_ORDER.length}.`);
expect(Object.keys(T22_ATOMIC_MODULES).length === 58, `Atomic plan should cover 58 modules; found ${Object.keys(T22_ATOMIC_MODULES).length}.`);
expect(T22_ATOMIC_COUNT === 187, `Expected 187 normalized atomic arcs; found ${T22_ATOMIC_COUNT}.`);
expect(uniqueAtomicIds.size === atomicIds.length, "T22 atomic IDs must be globally unique.");
expect(T22_ATOMIC_TARGET_HOURS_PER_ARC === 4, "T22 atomic target should remain 4 focused hours per arc.");
expect(
  JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS) === JSON.stringify([2, 6]),
  `T22 normal atomic work range should remain 2–6h; found ${JSON.stringify(T22_ATOMIC_WORK_RANGE_HOURS)}.`,
);
expect(T22_ATOMIC_TARGET_HOURS === 748, `Expected nominal T22 target effort of 748h; found ${T22_ATOMIC_TARGET_HOURS}.`);
expect(t22?.moduleCount === 58, `T22 terminal should expose moduleCount=58; found ${t22?.moduleCount}.`);
expect(t22?.atomicCount === 187, `T22 terminal should expose atomicCount=187; found ${t22?.atomicCount}.`);
expect(t22?.atomicTargetHours === 748, `T22 terminal should expose atomicTargetHours=748; found ${t22?.atomicTargetHours}.`);

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
    expect(arc.targetHours === 4, `${arc.id} should target 4 focused hours.`);
    expect(/^T22-M\d{2}-A\d{2}$/.test(arc.id), `${arc.id} does not use the stable T22-Mxx-Axx format.`);
    expect(Boolean(arc.title), `${arc.id} is missing a daily atomic-arc title.`);
  }
}

expect(T22_ATOMIC_MODULES.ARC053?.length === 4, "The opening calculus module should be split into four atomic arcs.");
expect(
  T22_ATOMIC_MODULES.ARC053?.[0]?.title === "Instantaneous Rate from Secants",
  "T22 should begin with Instantaneous Rate from Secants.",
);
expect(T22_ATOMIC_MODULES.SIDE263?.length === 2, "Sequences & Limits should remain a compact two-arc module.");
expect(T22_ATOMIC_MODULES.ARC515?.length === 5, "Scientific Python should contain five atomic arcs.");
expect(T22_ATOMIC_MODULES.ARC542?.length === 5, "Time-series foundations should contain five atomic arcs.");
expect(T22_ATOMIC_MODULES.ARC558?.length === 4, "Market microstructure should contain four atomic arcs.");
expect(T22_ATOMIC_MODULES.ARC560?.length === 4, "The final quant-research capstone should contain four atomic arcs.");

if (errors.length) {
  console.error(`T22 atomic validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `T22 Atomic Plan OK: 58 macro modules, ${T22_ATOMIC_COUNT} normalized atomic arcs, ` +
    `~${T22_ATOMIC_TARGET_HOURS_PER_ARC}h target per arc, ${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]}h normal range, ` +
    `~${T22_ATOMIC_TARGET_HOURS} nominal focused hours total; 734-node world preserved.`,
);
