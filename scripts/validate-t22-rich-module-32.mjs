import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC508";
const expectedIds = [
  "T22-M32-A01", "T22-M32-A02", "T22-M32-A03", "T22-M32-A04", "T22-M32-A05", "T22-M32-A06",
  "T22-M32-A07", "T22-M32-A08", "T22-M32-A09", "T22-M32-A10", "T22-M32-A11",
];
const expectedTitles = [
  "Model vs Data-Generating Process", "Underfitting", "Overfitting", "Data Leakage", "Train / Validation / Test Separation",
  "Cross-Validation", "Hyperparameter Selection & Nested Evaluation", "Baselines & Null Models", "Time-Ordered Validation",
  "Distribution Shift", "Adversarial Out-of-Sample Defense",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M32 validation.");
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
  const arc = enrichT22AtomicArc(moduleId, baseArc);
  expect(arc.id === baseArc.id, `${baseArc.id} ID changed.`);
  expect(arc.title === baseArc.title, `${baseArc.id} title changed.`);
  expect(arc.targetHours === baseArc.targetHours, `${baseArc.id} targetHours changed.`);
  expect(arc.syllabusVersion === "3.0", `${baseArc.id} missing syllabusVersion=3.0.`);
  for (const field of scalarFields) expect(typeof arc[field] === "string" && arc[field].trim(), `${baseArc.id} missing ${field}.`);
  for (const field of listFields) expect(Array.isArray(arc[field]) && arc[field].length > 0, `${baseArc.id} missing ${field}.`);
  expect(arc.requiredMastery.length >= 5, `${baseArc.id} needs at least five mastery checks.`);
}

expect(richModule?.arcs?.["T22-M32-A04"]?.nextArcBoundary?.includes("A05"), "M32 A04 must hand role-separated splitting to A05.");
expect(richModule?.arcs?.["T22-M32-A09"]?.explicitlyOutOfScope?.some((item) => item.includes("ARC542")), "M32 A09 must defer time-series model theory to ARC542.");
expect(richModule?.arcs?.["T22-M32-A11"]?.nextArcBoundary?.includes("ARC509"), "M32 A11 must hand reproducibility/provenance to ARC509.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC593")), "M32 must defer learning-theoretic generalization to ARC593.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M32 must defer full production backtest integration to ARC560.");

if (errors.length) {
  console.error(`T22 M32 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M32 rich syllabus OK: ${expectedIds.length} stable model-validation mission cards validated.`);
