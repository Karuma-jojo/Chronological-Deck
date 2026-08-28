import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC514";
const expectedIds = [
  "T22-M40-A01", "T22-M40-A02", "T22-M40-A03", "T22-M40-A04",
  "T22-M40-A05", "T22-M40-A06", "T22-M40-A07", "T22-M40-A08",
];
const expectedTitles = [
  "Optimization Problems",
  "Local vs Global Optima",
  "First-Order Optimality",
  "Second-Order Optimality",
  "Constraints & Feasible Geometry",
  "Equality Constraints & Lagrange Multipliers",
  "Shadow Prices & Sensitivity",
  "Optimization Modelling Forge",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M40 validation.");
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

expect(richModule?.arcs?.["T22-M40-A01"]?.requiredMastery?.some((item) => item.includes("decision variables")) && richModule?.arcs?.["T22-M40-A01"]?.requiredMastery?.some((item) => item.includes("units")), "M40 A01 must operationalize modelling variables and dimensional checks.");
expect(richModule?.arcs?.["T22-M40-A02"]?.requiredMastery?.some((item) => item.includes("strict local minimum") && item.includes("not global")), "M40 A02 must separate local from global optimality.");
expect(richModule?.arcs?.["T22-M40-A03"]?.target?.includes("grad f(x*)=0") && richModule?.arcs?.["T22-M40-A03"]?.requiredMastery?.some((item) => item.includes("candidate generation")), "M40 A03 must encode first-order necessity without sufficiency theft.");
expect(richModule?.arcs?.["T22-M40-A04"]?.requiredMastery?.some((item) => item.includes("positive definiteness")) && richModule?.arcs?.["T22-M40-A04"]?.requiredMastery?.some((item) => item.includes("inconclusive")), "M40 A04 must handle Hessian sufficiency and degenerate failure cases.");
expect(richModule?.arcs?.["T22-M40-A05"]?.requiredMastery?.some((item) => item.includes("grad g(x*)^T h=0")) && richModule?.arcs?.["T22-M40-A05"]?.requiredMastery?.some((item) => item.includes("feasible first-order descent direction")), "M40 A05 must operationalize constrained tangent geometry.");
expect(richModule?.arcs?.["T22-M40-A06"]?.target?.includes("J_g(x*)^T lambda") && richModule?.arcs?.["T22-M40-A06"]?.requiredMastery?.some((item) => item.includes("rank regularity")), "M40 A06 must derive equality-constrained multipliers with regularity.");
expect(richModule?.arcs?.["T22-M40-A07"]?.requiredMastery?.some((item) => item.includes("sign") && item.includes("convention")) && richModule?.arcs?.["T22-M40-A07"]?.requiredMastery?.some((item) => item.includes("objective-units")), "M40 A07 must make shadow-price sign and units operational.");
expect(richModule?.arcs?.["T22-M40-A08"]?.requiredMastery?.some((item) => item.includes("necessary-versus-sufficient")) && richModule?.arcs?.["T22-M40-A08"]?.requiredMastery?.some((item) => item.includes("failed formulations")), "M40 A08 must defend conclusion strength and preserve failed formulations.");
expect(richModule?.arcs?.["T22-M40-A08"]?.nextArcBoundary?.includes("ARC581"), "M40 A08 must hand the route to ARC581.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC581")), "M40 must preserve convexity ownership in ARC581.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC582")), "M40 must preserve KKT/duality ownership in ARC582.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC586")), "M40 must preserve numerical-optimization ownership in ARC586.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC593")), "M40 must preserve ML/generalization ownership in ARC593.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M40 must preserve production integration ownership in ARC560.");

if (errors.length) {
  console.error(`T22 M40 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M40 rich syllabus OK: ${expectedIds.length} stable optimization mission cards validated.`);
