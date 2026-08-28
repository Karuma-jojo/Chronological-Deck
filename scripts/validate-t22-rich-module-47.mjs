import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC593";
const expectedIds = Array.from({ length: 13 }, (_, i) => `T22-M47-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Supervised Learning as a Mathematical Problem",
  "Loss Functions",
  "Population Risk",
  "Empirical Risk",
  "Empirical Risk Minimization",
  "Hypothesis Classes",
  "Approximation vs Estimation Error",
  "Bias-Variance Structure",
  "Model Capacity",
  "Shattering & VC-Dimension Intuition",
  "Generalization Bounds",
  "Sample Complexity & Learning Curves",
  "Distribution Shift & Limits of Learning Guarantees",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M47 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[46] === moduleId && T22_ORDER[47] === "ARC594", "M47 must remain ARC593 immediately before ARC594 in T22_ORDER.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC508")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC531")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC539")), "M47 must build on its validated modelling/statistical prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC508")), "M47 must preserve practical validation ownership in ARC508.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC595")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC599")), "M47 must preserve downstream regularization/tree/neural ownership.");
expect(richModule?.arcs?.["T22-M47-A01"]?.target?.includes("(X,Y)~P"), "M47 A01 must formalize the supervised data distribution.");
expect(richModule?.arcs?.["T22-M47-A02"]?.requiredMastery?.some((x) => x.includes("conditional mean")) && richModule?.arcs?.["T22-M47-A02"]?.requiredMastery?.some((x) => x.includes("conditional median")), "M47 A02 must connect representative losses to their conditional risk targets.");
expect(richModule?.arcs?.["T22-M47-A03"]?.target?.includes("population risk"), "M47 A03 must operationalize population risk.");
expect(richModule?.arcs?.["T22-M47-A04"]?.requiredMastery?.some((x) => x.includes("data-dependent")), "M47 A04 must distinguish fixed-predictor risk estimation from adaptive selection.");
expect(richModule?.arcs?.["T22-M47-A05"]?.target?.includes("ERM"), "M47 A05 must formulate empirical risk minimization.");
expect(richModule?.arcs?.["T22-M47-A06"]?.requiredMastery?.some((x) => x.includes("nested classes")), "M47 A06 must treat hypothesis classes as explicit function sets.");
expect(richModule?.arcs?.["T22-M47-A07"]?.target?.includes("approximation error") && richModule?.arcs?.["T22-M47-A07"]?.target?.includes("estimation error"), "M47 A07 must separate approximation from estimation error.");
expect(richModule?.arcs?.["T22-M47-A08"]?.requiredMastery?.some((x) => x.includes("irreducible")) && richModule?.arcs?.["T22-M47-A08"]?.explicitlyOutOfScope?.some((x) => x.includes("ARC594")), "M47 A08 must scope the squared-error bias-variance identity and hand ridge/lasso behavior downstream.");
expect(richModule?.arcs?.["T22-M47-A09"]?.requiredMastery?.some((x) => x.includes("uniform")), "M47 A09 must motivate uniform generalization control from capacity.");
expect(richModule?.arcs?.["T22-M47-A10"]?.principalObstacle?.includes("quantifiers") && richModule?.arcs?.["T22-M47-A10"]?.requiredMastery?.some((x) => x.includes("intervals")), "M47 A10 must enforce correct shattering quantifiers with operational examples.");
expect(richModule?.arcs?.["T22-M47-A11"]?.target?.includes("sqrt((log |H| + log(1/delta))/n)"), "M47 A11 must derive a representative finite-class uniform-convergence scaling.");
expect(richModule?.arcs?.["T22-M47-A11"]?.requiredMastery?.some((x) => x.includes("vacuous")), "M47 A11 must diagnose vacuous but valid bounds.");
expect(richModule?.arcs?.["T22-M47-A12"]?.requiredMastery?.some((x) => x.includes("1/epsilon^2")) && richModule?.arcs?.["T22-M47-A12"]?.requiredMastery?.some((x) => x.includes("dependent financial")), "M47 A12 must connect sample-complexity scaling to effective information limits.");
expect(richModule?.arcs?.["T22-M47-A13"]?.target?.includes("training distribution P") && richModule?.arcs?.["T22-M47-A13"]?.target?.includes("deployment distribution Q"), "M47 A13 must make distribution shift explicit.");
expect(richModule?.arcs?.["T22-M47-A13"]?.requiredMastery?.some((x) => x.includes("support shift")), "M47 A13 must identify unsupported deployment regions.");
expect(richModule?.arcs?.["T22-M47-A13"]?.nextArcBoundary?.includes("ARC594"), "M47 must hand concrete regularization ownership to ARC594.");

if (errors.length) {
  console.error(`T22 M47 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M47 rich syllabus OK: ${expectedIds.length} stable supervised-learning-theory mission cards validated.`);
