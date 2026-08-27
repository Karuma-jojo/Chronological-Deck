import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");

const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC506";
const expectedIds = [
  "T22-M30-A01", "T22-M30-A02", "T22-M30-A03", "T22-M30-A04",
  "T22-M30-A05", "T22-M30-A06", "T22-M30-A07", "T22-M30-A08",
];
const expectedTitles = [
  "Association vs Causation",
  "Confounding",
  "Reverse Causality",
  "Selection Bias",
  "Collider Bias",
  "Omitted Variables & Regression Coefficients",
  "Prediction vs Causal Estimation",
  "Identification & Causal Skepticism",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M30 validation.");
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

expect(richModule?.arcs?.["T22-M30-A07"]?.explicitlyOutOfScope?.some((item) => item.includes("ARC508")), "M30 A07 must explicitly defer full validation methodology to ARC508.");
expect(richModule?.arcs?.["T22-M30-A08"]?.nextArcBoundary?.includes("ARC507"), "M30 A08 must hand experimental design to ARC507.");
expect(richModule?.arcs?.["T22-M30-A08"]?.nextArcBoundary?.includes("ARC545") && richModule.arcs["T22-M30-A08"].nextArcBoundary.includes("ARC550"), "M30 A08 must defer deeper econometric identification to ARC545-ARC550.");

if (errors.length) {
  console.error(`T22 M30 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M30 rich syllabus OK: ${expectedIds.length} stable causal-skepticism mission cards validated.`);
