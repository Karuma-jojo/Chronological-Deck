import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC594";
const expectedIds = Array.from({ length: 14 }, (_, i) => `T22-M48-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "High-Dimensional Regimes",
  "Ill-Conditioning & Unstable Coefficients",
  "Regularization as Controlled Bias",
  "Ridge Regression",
  "Ridge Geometry",
  "Ridge Bias-Variance Behaviour",
  "Lasso",
  "Sparsity Geometry",
  "Lasso Optimization",
  "Elastic Net",
  "Penalized Likelihood",
  "Hyperparameter Selection Without Leakage",
  "Feature Selection Instability",
  "High-Dimensional Regularization Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M48 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[47] === moduleId && T22_ORDER[46] === "ARC593" && T22_ORDER[48] === "ARC595", "M48 must remain ARC594 between ARC593 and ARC595 in T22_ORDER.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC593")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC582")), "M48 must build on supervised-learning theory and convex optimization.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC582")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC593")), "M48 must not steal generic convex/generalization theory ownership.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC595")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC599")), "M48 must preserve downstream tree/neural ownership.");
expect(richModule?.arcs?.["T22-M48-A01"]?.requiredMastery?.some((x) => x.includes("p>=n")), "M48 A01 must operationalize nonunique high-dimensional least squares.");
expect(richModule?.arcs?.["T22-M48-A02"]?.requiredMastery?.some((x) => x.includes("condition number")), "M48 A02 must diagnose ill-conditioning quantitatively.");
expect(richModule?.arcs?.["T22-M48-A03"]?.target?.includes("lambda"), "M48 A03 must make regularization strength operational.");
expect(richModule?.arcs?.["T22-M48-A04"]?.target?.includes("ridge") && richModule?.arcs?.["T22-M48-A04"]?.requiredMastery?.some((x) => x.includes("X^T X+lambda I")), "M48 A04 must derive ridge normal equations.");
expect(richModule?.arcs?.["T22-M48-A05"]?.target?.includes("d_j^2/(d_j^2+lambda)"), "M48 A05 must expose spectral ridge shrinkage.");
expect(richModule?.arcs?.["T22-M48-A06"]?.requiredMastery?.some((x) => x.includes("E[beta_hat_ridge]")), "M48 A06 must operationalize ridge bias-variance behavior.");
expect(richModule?.arcs?.["T22-M48-A07"]?.requiredMastery?.some((x) => x.includes("soft threshold")), "M48 A07 must derive lasso soft thresholding.");
expect(richModule?.arcs?.["T22-M48-A08"]?.requiredMastery?.some((x) => x.includes("causal")), "M48 A08 must reject sparse-support causal overinterpretation.");
expect(richModule?.arcs?.["T22-M48-A09"]?.requiredMastery?.some((x) => x.includes("KKT")), "M48 A09 must include lasso optimality diagnostics.");
expect(richModule?.arcs?.["T22-M48-A10"]?.requiredMastery?.some((x) => x.includes("correlated")), "M48 A10 must cover elastic-net stabilization of correlated predictors.");
expect(richModule?.arcs?.["T22-M48-A11"]?.requiredMastery?.some((x) => x.includes("separation")), "M48 A11 must transfer penalization to unstable likelihood models.");
expect(richModule?.arcs?.["T22-M48-A12"]?.requiredMastery?.some((x) => x.includes("standardization inside")) && richModule?.arcs?.["T22-M48-A12"]?.requiredMastery?.some((x) => x.includes("final test")), "M48 A12 must enforce leakage-safe preprocessing/tuning boundaries.");
expect(richModule?.arcs?.["T22-M48-A13"]?.requiredMastery?.some((x) => x.includes("selection frequencies")), "M48 A13 must measure feature-selection instability.");
expect(richModule?.arcs?.["T22-M48-A14"]?.requiredMastery?.some((x) => x.includes("unregularized/simple baseline")), "M48 lab must include a baseline comparison.");
expect(richModule?.arcs?.["T22-M48-A14"]?.nextArcBoundary?.includes("ARC595"), "M48 must hand tree-ensemble ownership to ARC595.");

if (errors.length) {
  console.error(`T22 M48 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M48 rich syllabus OK: ${expectedIds.length} stable high-dimensional-regularization mission cards validated.`);
