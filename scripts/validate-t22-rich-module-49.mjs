import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC595";
const expectedIds = Array.from({ length: 14 }, (_, i) => `T22-M49-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Recursive Partitioning",
  "Regression-Tree Split Criteria",
  "Classification-Tree Split Criteria",
  "Tree Depth & Complexity",
  "Tree Overfitting & Pruning",
  "Instability of Individual Trees",
  "Bagging",
  "Random Forests",
  "Out-of-Bag Evaluation",
  "Feature Importance & Its Failure Modes",
  "Boosting",
  "Gradient Boosting",
  "Shrinkage, Depth & Boosting Regularization",
  "Tree-Ensemble Research Lab",
];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M49 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[48] === moduleId && T22_ORDER[47] === "ARC594" && T22_ORDER[49] === "ARC599", "M49 must remain ARC595 between ARC594 and ARC599 in T22_ORDER.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC593")), "M49 must build on supervised-learning theory.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC599")), "M49 must preserve regularization and neural-network ownership boundaries.");
expect(richModule?.arcs?.["T22-M49-A02"]?.requiredMastery?.some((x) => x.includes("sample mean")), "M49 A02 must derive the regression-tree leaf optimum.");
expect(richModule?.arcs?.["T22-M49-A03"]?.requiredMastery?.some((x) => x.includes("Gini")) && richModule?.arcs?.["T22-M49-A03"]?.requiredMastery?.some((x) => x.includes("entropy")), "M49 A03 must operationalize classification impurity.");
expect(richModule?.arcs?.["T22-M49-A05"]?.requiredMastery?.some((x) => x.includes("R(T)+alpha")), "M49 A05 must expose cost-complexity pruning.");
expect(richModule?.arcs?.["T22-M49-A06"]?.requiredMastery?.some((x) => x.includes("root split")), "M49 A06 must make single-tree instability concrete.");
expect(richModule?.arcs?.["T22-M49-A07"]?.target?.includes("Var(mean)"), "M49 A07 must derive bagging variance reduction with correlation.");
expect(richModule?.arcs?.["T22-M49-A08"]?.requiredMastery?.some((x) => x.includes("candidate features")), "M49 A08 must distinguish random forests from ordinary bagging.");
expect(richModule?.arcs?.["T22-M49-A09"]?.requiredMastery?.some((x) => x.includes("only OOB-tree predictions")), "M49 A09 must enforce observation-level OOB exclusion.");
expect(richModule?.arcs?.["T22-M49-A10"]?.requiredMastery?.some((x) => x.includes("causal")), "M49 A10 must reject causal overinterpretation of importance.");
expect(richModule?.arcs?.["T22-M49-A11"]?.requiredMastery?.some((x) => x.includes("F_m(x)")), "M49 A11 must make stagewise boosting operational.");
expect(richModule?.arcs?.["T22-M49-A12"]?.target?.includes("pseudo-residuals"), "M49 A12 must derive gradient boosting through loss gradients.");
expect(richModule?.arcs?.["T22-M49-A13"]?.requiredMastery?.some((x) => x.includes("learning-rate")), "M49 A13 must couple shrinkage and stage count.");
expect(richModule?.arcs?.["T22-M49-A14"]?.requiredMastery?.some((x) => x.includes("simple non-tree baseline")), "M49 lab must include a simple baseline.");
expect(richModule?.arcs?.["T22-M49-A14"]?.nextArcBoundary?.includes("ARC599"), "M49 must hand downstream neural-network ownership to ARC599.");

if (errors.length) {
  console.error(`T22 M49 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M49 rich syllabus OK: ${expectedIds.length} stable tree-ensemble mission cards validated.`);
