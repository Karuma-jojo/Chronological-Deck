import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC589";
const expectedIds = Array.from({ length: 12 }, (_, i) => `T22-M44-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Finite-Sum & Expected Objectives",
  "Stochastic Gradient Estimates",
  "Stochastic Gradient Descent",
  "Mini-Batches",
  "Learning-Rate Schedules",
  "Momentum",
  "Adaptive Coordinate Scaling",
  "Adam",
  "Gradient Noise & Variance",
  "Convergence Diagnostics",
  "Stochastic Optimization Failure Modes",
  "SGD Research Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M44 validation.");
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

expect(richModule?.arcs?.["T22-M44-A01"]?.target?.includes("finite-sum") && richModule?.arcs?.["T22-M44-A01"]?.target?.includes("expectation"), "M44 A01 must formulate both finite-sum and expectation objectives.");
expect(richModule?.arcs?.["T22-M44-A02"]?.requiredMastery?.some((x) => x.includes("E[g_k | theta_k]")), "M44 A02 must test stochastic-gradient unbiasedness conditionally.");
expect(richModule?.arcs?.["T22-M44-A03"]?.requiredMastery?.some((x) => x.includes("pathwise ascent")), "M44 A03 must distinguish pathwise noise from expected progress.");
expect(richModule?.arcs?.["T22-M44-A04"]?.requiredMastery?.some((x) => x.includes("1/b variance reduction")), "M44 A04 must derive the ideal mini-batch variance law and state its assumptions.");
expect(richModule?.arcs?.["T22-M44-A05"]?.target?.includes("sum alpha_k"), "M44 A05 must connect schedules to classical stochastic-approximation step conditions.");
expect(richModule?.arcs?.["T22-M44-A06"]?.target?.includes("scalar quadratic recurrence"), "M44 A06 must analyze momentum dynamics rather than merely quote the update.");
expect(richModule?.arcs?.["T22-M44-A07"]?.requiredMastery?.some((x) => x.includes("epsilon")), "M44 A07 must operationalize stabilizing epsilon in adaptive scaling.");
expect(richModule?.arcs?.["T22-M44-A08"]?.requiredMastery?.some((x) => x.includes("bias") && x.includes("1-beta^t")), "M44 A08 must derive Adam bias correction.");
expect(richModule?.arcs?.["T22-M44-A09"]?.requiredMastery?.some((x) => x.includes("sampling variance") && x.includes("gradient-check error")), "M44 A09 must separate stochastic gradient noise from derivative bugs/numerical error.");
expect(richModule?.arcs?.["T22-M44-A10"]?.requiredMastery?.some((x) => x.includes("optimizer convergence") && x.includes("model validity")), "M44 A10 must not confuse optimization convergence with model validity.");
expect(richModule?.arcs?.["T22-M44-A11"]?.requiredMastery?.some((x) => x.includes("falsifying diagnostic")), "M44 A11 must require diagnosis before optimizer shopping.");
expect(richModule?.arcs?.["T22-M44-A12"]?.requiredMastery?.some((x) => x.includes("Separate optimization error from statistical/model error")), "M44 A12 must separate optimizer performance from statistical/model quality.");
const finalBoundary = richModule?.arcs?.["T22-M44-A12"]?.nextArcBoundary || "";
expect(finalBoundary.includes("ARC593") && (finalBoundary.includes("ARC599") || finalBoundary.includes("ARC593/594/599")), "M44 final boundary must preserve later learning and neural-training ownership.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC593")), "M44 must preserve generalization ownership in ARC593.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")), "M44 must preserve regularization ownership in ARC594.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC599")), "M44 must preserve neural training ownership in ARC599.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC508")), "M44 must preserve validation protocol ownership in ARC508.");

if (errors.length) {
  console.error(`T22 M44 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M44 rich syllabus OK: ${expectedIds.length} stable stochastic-optimization mission cards validated.`);
