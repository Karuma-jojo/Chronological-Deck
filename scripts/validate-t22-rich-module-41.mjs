import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC581";
const expectedIds = Array.from({ length: 12 }, (_, i) => `T22-M41-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Affine Combinations & Affine Sets",
  "Convex Combinations & Convex Sets",
  "Operations that Preserve Convexity",
  "Hyperplanes & Halfspaces",
  "Separation",
  "Supporting Hyperplanes",
  "Convex Functions & Epigraphs",
  "First-Order Characterization of Convexity",
  "Second-Order Characterization",
  "Strict & Strong Convexity",
  "Subgradients & Nondifferentiable Convexity",
  "Convex Conjugates & Duality Intuition",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M41 validation.");
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

expect(richModule?.arcs?.["T22-M41-A01"]?.requiredMastery?.some((x) => x.includes("affine hull")), "M41 A01 must operationalize affine hulls.");
expect(richModule?.arcs?.["T22-M41-A02"]?.requiredMastery?.some((x) => x.includes("nonconvex witness")), "M41 A02 must require a constructive nonconvexity witness.");
expect(richModule?.arcs?.["T22-M41-A05"]?.requiredMastery?.some((x) => x.includes("weak, strict and strong separation")), "M41 A05 must distinguish separation strengths.");
expect(richModule?.arcs?.["T22-M41-A07"]?.requiredMastery?.some((x) => x.includes("local minimum") && x.includes("global")), "M41 A07 must connect convexity to global minima.");
expect(richModule?.arcs?.["T22-M41-A08"]?.target?.includes("f(y)>=f(x)+grad f(x)^T(y-x)"), "M41 A08 must encode the first-order convexity inequality.");
expect(richModule?.arcs?.["T22-M41-A09"]?.requiredMastery?.some((x) => x.includes("Hessian PSD")), "M41 A09 must operationalize the Hessian criterion.");
expect(richModule?.arcs?.["T22-M41-A10"]?.requiredMastery?.some((x) => x.includes("strictly convex") && x.includes("not strongly")), "M41 A10 must separate strict from strong convexity.");
expect(richModule?.arcs?.["T22-M41-A11"]?.target?.includes("0 in partial f(x*)"), "M41 A11 must encode subgradient optimality.");
expect(richModule?.arcs?.["T22-M41-A12"]?.requiredMastery?.some((x) => x.includes("Fenchel-Young")), "M41 A12 must operationalize conjugacy through Fenchel-Young.");
expect(richModule?.arcs?.["T22-M41-A12"]?.nextArcBoundary?.includes("ARC582"), "M41 must hand route ownership to ARC582.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC582")), "M41 must preserve duality/KKT ownership in ARC582.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC586")), "M41 must preserve numerical optimization ownership in ARC586.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC589")), "M41 must preserve stochastic optimization ownership in ARC589.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")), "M41 must preserve regularization ownership in ARC594.");

if (errors.length) {
  console.error(`T22 M41 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M41 rich syllabus OK: ${expectedIds.length} stable convex-geometry mission cards validated.`);
