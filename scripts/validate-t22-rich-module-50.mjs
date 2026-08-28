import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC599";
const expectedIds = Array.from({ length: 21 }, (_, i) => `T22-M50-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
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
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M50 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[49] === moduleId && T22_ORDER[48] === "ARC595" && T22_ORDER[50] === "ARC716", "M50 must remain ARC599 between ARC595 and ARC716 in T22_ORDER.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC593", "ARC589", "ARC711"]), "M50 route prerequisites drifted.");

const baseArcs = T22_ATOMIC_MODULES[moduleId] || [];
const richModule = getT22RichModule(moduleId);
expect(Boolean(richModule), `${moduleId} must have a rich syllabus contract.`);
expect(richModule?.moduleId === moduleId, `${moduleId} rich moduleId mismatch.`);
expect(richModule?.syllabusVersion === "3.0", `${moduleId} must use syllabusVersion=3.0.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.id)) === JSON.stringify(expectedIds), `${moduleId} stable IDs drifted.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.title)) === JSON.stringify(expectedTitles), `${moduleId} audited titles drifted.`);
expect(baseArcs.every((arc) => arc.targetHours === 4), `${moduleId} targetHours drifted from 4h bookkeeping.`);
expect(Object.keys(richModule?.arcs || {}).length === expectedIds.length, `${moduleId} rich coverage mismatch.`);
expect(Boolean(richModule?.roleTarget), `${moduleId} missing roleTarget.`);
expect(Boolean(richModule?.modulePurpose), `${moduleId} missing modulePurpose.`);
expect(Boolean(richModule?.moduleDestination), `${moduleId} missing moduleDestination.`);
expect(Array.isArray(richModule?.entryPrerequisites) && richModule.entryPrerequisites.length > 0, `${moduleId} missing entryPrerequisites.`);
expect(Array.isArray(richModule?.explicitlyOutOfScope) && richModule.explicitlyOutOfScope.length > 0, `${moduleId} missing explicitlyOutOfScope.`);

for (const baseArc of baseArcs) {
  const enriched = enrichT22AtomicArc(moduleId, baseArc);
  expect(enriched.id === baseArc.id, `${baseArc.id} ID changed.`);
  expect(enriched.title === baseArc.title, `${baseArc.id} title changed.`);
  expect(enriched.targetHours === baseArc.targetHours, `${baseArc.id} targetHours changed.`);
  expect(enriched.syllabusVersion === "3.0", `${baseArc.id} missing syllabusVersion=3.0.`);
  for (const field of scalarFields) expect(typeof enriched[field] === "string" && enriched[field].trim(), `${baseArc.id} missing ${field}.`);
  for (const field of listFields) expect(Array.isArray(enriched[field]) && enriched[field].length > 0, `${baseArc.id} missing ${field}.`);
  expect(enriched.requiredMastery.length >= 5, `${baseArc.id} needs at least five mastery checks.`);
}

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC593")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC589")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC711")), "M50 must build on its three route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC593")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC711")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC595")), "M50 must preserve upstream ownership boundaries.");
expect(richModule?.arcs?.["T22-M50-A02"]?.requiredMastery?.some((x) => x.includes("composite remains affine")), "M50 A02 must prove affine-layer collapse without nonlinearities.");
expect(richModule?.arcs?.["T22-M50-A03"]?.requiredMastery?.some((x) => x.includes("parameter counts")), "M50 A03 must operationalize network shapes and parameter counts.");
expect(richModule?.arcs?.["T22-M50-A05"]?.requiredMastery?.some((x) => x.includes("logits")), "M50 A05 must distinguish logits and probabilities.");
expect(richModule?.arcs?.["T22-M50-A08"]?.requiredMastery?.some((x) => x.includes("finite differences")), "M50 A08 must numerically verify scalar backprop.");
expect(richModule?.arcs?.["T22-M50-A09"]?.requiredMastery?.some((x) => x.includes("dL/dW")), "M50 A09 must derive layer parameter gradients.");
expect(richModule?.arcs?.["T22-M50-A11"]?.requiredMastery?.some((x) => x.includes("final test")), "M50 A11 must preserve untouched final evaluation.");
expect(richModule?.arcs?.["T22-M50-A13"]?.requiredMastery?.some((x) => x.includes("Xavier")) && richModule?.arcs?.["T22-M50-A13"]?.requiredMastery?.some((x) => x.includes("He-style")), "M50 A13 must operationalize variance-aware initialization.");
expect(richModule?.arcs?.["T22-M50-A14"]?.requiredMastery?.some((x) => x.includes("vanishing")) && richModule?.arcs?.["T22-M50-A14"]?.requiredMastery?.some((x) => x.includes("exploding")), "M50 A14 must diagnose both gradient pathologies.");
expect(richModule?.arcs?.["T22-M50-A16"]?.requiredMastery?.some((x) => x.includes("decoupled weight decay")), "M50 A16 must distinguish L2 penalty from decoupled decay.");
expect(richModule?.arcs?.["T22-M50-A19"]?.requiredMastery?.some((x) => x.includes("gradient checks")), "M50 A19 must require scratch gradient checking.");
expect(richModule?.arcs?.["T22-M50-A20"]?.requiredMastery?.some((x) => x.includes("Compare selected parameter gradients")), "M50 A20 must cross-check autodiff against the scratch implementation.");
expect(richModule?.arcs?.["T22-M50-A21"]?.requiredMastery?.some((x) => x.includes("simple non-neural baseline")), "M50 lab must include a non-neural baseline.");
expect(richModule?.arcs?.["T22-M50-A21"]?.nextArcBoundary?.includes("ARC716"), "M50 must hand downstream ownership to ARC716.");

if (errors.length) {
  console.error(`T22 M50 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M50 rich syllabus OK: ${expectedIds.length} stable neural-network mission cards validated.`);
