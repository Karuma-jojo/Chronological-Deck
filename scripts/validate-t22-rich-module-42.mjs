import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC582";
const expectedIds = Array.from({ length: 13 }, (_, i) => `T22-M42-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Standard Constrained Convex Programs",
  "The Lagrangian",
  "The Dual Function",
  "The Dual Problem & Weak Duality",
  "Duality Gap",
  "Strong Duality & Constraint Qualifications",
  "KKT Stationarity",
  "Primal & Dual Feasibility",
  "Complementary Slackness",
  "KKT Necessity",
  "KKT Sufficiency in Convex Problems",
  "Sensitivity & Shadow Prices",
  "Barrier Methods, Central Paths & Interior-Point Intuition",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M42 validation.");
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

expect(richModule?.arcs?.["T22-M42-A01"]?.requiredMastery?.some((x) => x.includes("affine equalities")), "M42 A01 must enforce affine equality constraints in convex form.");
expect(richModule?.arcs?.["T22-M42-A02"]?.target?.includes("lambda>=0"), "M42 A02 must encode inequality multiplier signs.");
expect(richModule?.arcs?.["T22-M42-A03"]?.requiredMastery?.some((x) => x.includes("lower-bound property")), "M42 A03 must prove the dual-function lower bound.");
expect(richModule?.arcs?.["T22-M42-A04"]?.requiredMastery?.some((x) => x.includes("weak duality")), "M42 A04 must prove weak duality.");
expect(richModule?.arcs?.["T22-M42-A06"]?.requiredMastery?.some((x) => x.includes("Slater")), "M42 A06 must operationalize a Slater-type constraint qualification.");
expect(richModule?.arcs?.["T22-M42-A07"]?.target?.includes("KKT stationarity"), "M42 A07 must own KKT stationarity.");
expect(richModule?.arcs?.["T22-M42-A09"]?.requiredMastery?.some((x) => x.includes("inactive implies zero multiplier")), "M42 A09 must operationalize complementary slackness carefully.");
expect(richModule?.arcs?.["T22-M42-A10"]?.requiredMastery?.some((x) => x.includes("regularity dependence")), "M42 A10 must qualify KKT necessity.");
expect(richModule?.arcs?.["T22-M42-A11"]?.requiredMastery?.some((x) => x.includes("global optimality")), "M42 A11 must make convex KKT sufficiency global.");
expect(richModule?.arcs?.["T22-M42-A12"]?.requiredMastery?.some((x) => x.includes("local value-function sensitivity")), "M42 A12 must qualify shadow-price sensitivity.");
expect(richModule?.arcs?.["T22-M42-A13"]?.requiredMastery?.some((x) => x.includes("central path")), "M42 A13 must operationalize central-path intuition.");
expect(richModule?.arcs?.["T22-M42-A13"]?.nextArcBoundary?.includes("ARC586"), "M42 must hand numerical optimization ownership to ARC586.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC586")), "M42 must preserve numerical optimization ownership in ARC586.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC589")), "M42 must preserve stochastic optimization ownership in ARC589.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")), "M42 must preserve regularization ownership in ARC594.");

if (errors.length) {
  console.error(`T22 M42 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M42 rich syllabus OK: ${expectedIds.length} stable convex-duality/KKT mission cards validated.`);
