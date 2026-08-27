import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC509";
const expectedIds = [
  "T22-M33-A01", "T22-M33-A02", "T22-M33-A03", "T22-M33-A04",
  "T22-M33-A05", "T22-M33-A06", "T22-M33-A07", "T22-M33-A08",
];
const expectedTitles = [
  "Claims, Predictions & Falsifiability",
  "Research Logs",
  "Data Provenance",
  "Code & Environment Reproducibility",
  "Deterministic Pipelines & Artifacts",
  "Replication",
  "Negative Results & Researcher Degrees of Freedom",
  "Reproducible Research Defense",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M33 validation.");
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

expect(richModule?.arcs?.["T22-M33-A01"]?.nextArcBoundary?.includes("A02"), "M33 A01 must hand chronology to A02.");
expect(richModule?.arcs?.["T22-M33-A03"]?.explicitlyOutOfScope?.some((item) => item.includes("ARC714")), "M33 A03 must defer market temporal reconstruction to ARC714.");
expect(richModule?.arcs?.["T22-M33-A06"]?.requiredMastery?.some((item) => item.includes("independent reimplementation")), "M33 A06 must distinguish independent reimplementation from rerunning the same artifact.");
expect(richModule?.arcs?.["T22-M33-A07"]?.requiredMastery?.some((item) => item.includes("rescue tuning")), "M33 A07 must distinguish principled debugging from outcome-driven rescue tuning.");
expect(richModule?.arcs?.["T22-M33-A08"]?.nextArcBoundary?.includes("ARC513"), "M33 A08 must hand Monte Carlo theory to ARC513.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC508")), "M33 must defer model-validation ownership to ARC508.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M33 must defer terminal market-research integration to ARC560.");

if (errors.length) {
  console.error(`T22 M33 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M33 rich syllabus OK: ${expectedIds.length} stable reproducibility mission cards validated.`);
