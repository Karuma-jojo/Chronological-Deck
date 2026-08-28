import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC543";
const expectedIds = [
  "T22-M37-A01", "T22-M37-A02", "T22-M37-A03", "T22-M37-A04", "T22-M37-A05", "T22-M37-A06",
  "T22-M37-A07", "T22-M37-A08", "T22-M37-A09", "T22-M37-A10", "T22-M37-A11", "T22-M37-A12",
];
const expectedTitles = [
  "Hidden State vs Observation",
  "State-Space Representation",
  "Prediction of the Hidden State",
  "Prediction Uncertainty",
  "Measurement Update as Information Fusion",
  "Gaussian Conditioning Behind the Update",
  "Kalman Gain",
  "Full Kalman Recursion",
  "Multivariate Kalman Filtering",
  "Initialization & Filter Transients",
  "Smoothing",
  "Model Mismatch & Kalman Diagnostics",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M37 validation.");
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

expect(richModule?.arcs?.["T22-M37-A02"]?.requiredMastery?.some((item) => item.includes("Q") && item.includes("R")), "M37 A02 must distinguish process and measurement covariance.");
expect(richModule?.arcs?.["T22-M37-A04"]?.requiredMastery?.some((item) => item.includes("F P F^T")), "M37 A04 must operationalize covariance propagation.");
expect(richModule?.arcs?.["T22-M37-A05"]?.requiredMastery?.some((item) => item.includes("innovation covariance")), "M37 A05 must construct innovation uncertainty.");
expect(richModule?.arcs?.["T22-M37-A06"]?.requiredMastery?.some((item) => item.includes("Gaussian")), "M37 A06 must derive the update from Gaussian conditioning.");
expect(richModule?.arcs?.["T22-M37-A07"]?.requiredMastery?.some((item) => item.includes("linear solve")), "M37 A07 must prefer stable solves over blind matrix inversion.");
expect(richModule?.arcs?.["T22-M37-A08"]?.requiredMastery?.some((item) => item.includes("Joseph form")), "M37 A08 must preserve numerically safer covariance-update awareness.");
expect(richModule?.arcs?.["T22-M37-A10"]?.requiredMastery?.some((item) => item.includes("warm-up") || item.includes("transient")), "M37 A10 must make initialization transients explicit.");
expect(richModule?.arcs?.["T22-M37-A11"]?.requiredMastery?.some((item) => item.includes("look-ahead leakage")), "M37 A11 must distinguish smoothing from online filtering without leakage.");
expect(richModule?.arcs?.["T22-M37-A12"]?.requiredMastery?.some((item) => item.includes("innovation")), "M37 A12 must use innovation diagnostics for model criticism.");
expect(richModule?.arcs?.["T22-M37-A12"]?.nextArcBoundary?.includes("ARC524"), "M37 A12 must hand general Markov-chain ownership to ARC524.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC525")), "M37 must preserve event-time modelling ownership in ARC525.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC714")), "M37 must preserve market-data temporal engineering ownership in ARC714.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M37 must preserve terminal backtest integration ownership in ARC560.");

if (errors.length) {
  console.error(`T22 M37 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M37 rich syllabus OK: ${expectedIds.length} stable state-space/Kalman mission cards validated.`);
