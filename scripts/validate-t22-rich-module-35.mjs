import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC541";
const expectedIds = [
  "T22-M35-A01", "T22-M35-A02", "T22-M35-A03", "T22-M35-A04", "T22-M35-A05", "T22-M35-A06",
  "T22-M35-A07", "T22-M35-A08", "T22-M35-A09", "T22-M35-A10", "T22-M35-A11", "T22-M35-A12",
];
const expectedTitles = [
  "Multivariate Data as Random Vectors",
  "Covariance Matrices",
  "Covariance Geometry",
  "Multivariate Normal Distribution",
  "Mahalanobis Distance",
  "PCA as a Variance-Maximization Problem",
  "PCA & Eigenstructure",
  "Projection into Principal-Component Coordinates",
  "Choosing Dimensionality",
  "Linear Discriminant Analysis",
  "Quadratic Discrimination & Covariance Differences",
  "High-Dimensional Covariance Failure",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M35 validation.");
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

expect(richModule?.arcs?.["T22-M35-A02"]?.requiredMastery?.some((item) => item.includes("Cov(AX+b)" ) || item.includes("affine covariance")), "M35 A02 must operationalize covariance propagation.");
expect(richModule?.arcs?.["T22-M35-A06"]?.requiredMastery?.some((item) => item.includes("eigenvalue equation")), "M35 A06 must derive PCA from variance maximization rather than software ritual.");
expect(richModule?.arcs?.["T22-M35-A09"]?.requiredMastery?.some((item) => item.includes("low-variance direction")), "M35 A09 must reject explained-variance-only dimensionality folklore.");
expect(richModule?.arcs?.["T22-M35-A10"]?.requiredMastery?.some((item) => item.includes("cancellation")), "M35 A10 must derive why LDA has a linear boundary.");
expect(richModule?.arcs?.["T22-M35-A11"]?.requiredMastery?.some((item) => item.includes("quadratic terms")), "M35 A11 must derive why QDA retains quadratic terms.");
expect(richModule?.arcs?.["T22-M35-A12"]?.requiredMastery?.some((item) => item.includes("min(p,n-1)")), "M35 A12 must expose the centered sample-covariance rank ceiling.");
expect(richModule?.arcs?.["T22-M35-A12"]?.nextArcBoundary?.includes("ARC542"), "M35 A12 must hand time-indexed dependence to ARC542.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC539")), "M35 must preserve regression ownership in ARC539.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC593")), "M35 must defer general supervised-learning theory to ARC593.");

if (errors.length) {
  console.error(`T22 M35 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M35 rich syllabus OK: ${expectedIds.length} stable multivariate-statistics mission cards validated.`);
