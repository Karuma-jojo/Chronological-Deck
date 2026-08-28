import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC586";
const expectedIds = Array.from({ length: 16 }, (_, i) => `T22-M43-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Iterative Optimization",
  "Gradient Descent",
  "Step Size & Stability",
  "Line Search",
  "Optimization Stopping Criteria",
  "Newton's Method from Quadratic Approximation",
  "Newton Failure Modes",
  "Quasi-Newton Reasoning",
  "BFGS",
  "Projected Gradient Methods",
  "Penalty-Based Numerical Constraint Handling",
  "Computational Graphs",
  "Forward-Mode Automatic Differentiation",
  "Reverse-Mode Automatic Differentiation",
  "Finite Differences & Gradient Checking",
  "Numerical Optimization Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M43 validation.");
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

expect(richModule?.arcs?.["T22-M43-A02"]?.requiredMastery?.some((x) => x.includes("directional derivative")), "M43 A02 must derive the descent direction from local geometry.");
expect(richModule?.arcs?.["T22-M43-A03"]?.requiredMastery?.some((x) => x.includes("eigenvalues")), "M43 A03 must connect step stability to spectral curvature.");
expect(richModule?.arcs?.["T22-M43-A04"]?.requiredMastery?.some((x) => x.includes("Armijo")), "M43 A04 must operationalize sufficient-decrease line search.");
expect(richModule?.arcs?.["T22-M43-A05"]?.requiredMastery?.some((x) => x.includes("feasibility/KKT residuals")), "M43 A05 must use constrained residuals in stopping diagnostics.");
expect(richModule?.arcs?.["T22-M43-A06"]?.requiredMastery?.some((x) => x.includes("linear solve rather than explicit inverse")), "M43 A06 must use a Newton linear solve, not explicit inversion.");
expect(richModule?.arcs?.["T22-M43-A07"]?.requiredMastery?.some((x) => x.includes("indefinite Hessians")), "M43 A07 must diagnose Newton curvature failure.");
expect(richModule?.arcs?.["T22-M43-A08"]?.target?.includes("secant condition"), "M43 A08 must derive quasi-Newton secant structure.");
expect(richModule?.arcs?.["T22-M43-A09"]?.requiredMastery?.some((x) => x.includes("curvature condition")), "M43 A09 must audit the BFGS curvature condition.");
expect(richModule?.arcs?.["T22-M43-A10"]?.requiredMastery?.some((x) => x.includes("projection")), "M43 A10 must operationalize convex projection.");
expect(richModule?.arcs?.["T22-M43-A11"]?.requiredMastery?.some((x) => x.includes("conditioning deterioration")), "M43 A11 must expose penalty-conditioning tradeoffs.");
expect(richModule?.arcs?.["T22-M43-A12"]?.requiredMastery?.some((x) => x.includes("primitive operations")), "M43 A12 must build computational graphs from primitives.");
expect(richModule?.arcs?.["T22-M43-A13"]?.requiredMastery?.some((x) => x.includes("Jv products")), "M43 A13 must operationalize forward-mode Jv products.");
expect(richModule?.arcs?.["T22-M43-A14"]?.requiredMastery?.some((x) => x.includes("reverse topological order")), "M43 A14 must operationalize reverse-mode accumulation.");
expect(richModule?.arcs?.["T22-M43-A15"]?.requiredMastery?.some((x) => x.includes("cancellation")), "M43 A15 must expose finite-difference cancellation.");
expect(richModule?.arcs?.["T22-M43-A16"]?.requiredMastery?.some((x) => x.includes("Verify derivatives independently")), "M43 A16 must require independent derivative verification.");
expect(richModule?.arcs?.["T22-M43-A16"]?.nextArcBoundary?.includes("ARC589"), "M43 must hand stochastic optimization ownership to ARC589.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC589")), "M43 must preserve stochastic optimization ownership in ARC589.");
expect(
  richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC593 onward")) &&
    ["T22-M43-A12", "T22-M43-A14", "T22-M43-A16"].some((id) => richModule?.arcs?.[id]?.explicitlyOutOfScope?.some((x) => x.includes("ARC599"))),
  "M43 must preserve later learning/neural-training ownership, including ARC599.",
);

if (errors.length) {
  console.error(`T22 M43 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M43 rich syllabus OK: ${expectedIds.length} stable numerical-optimization/autodiff mission cards validated.`);
