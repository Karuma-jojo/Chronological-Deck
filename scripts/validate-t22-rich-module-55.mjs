import { WORLD } from "../js/data/world.js";
await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC554";
const expectedIds = Array.from({ length: 16 }, (_, i) => `T22-M55-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Portfolio Returns as Linear Combinations",
  "Portfolio Variance & Covariance",
  "Diversification Geometry",
  "Two-Asset Risk-Return Frontiers",
  "Mean-Variance Optimization",
  "The Efficient Frontier",
  "Global Minimum-Variance Portfolio",
  "Risk-Free Asset & Tangency Portfolio",
  "Estimation Error in Portfolio Optimization",
  "Covariance Shrinkage for Portfolios",
  "Realistic Portfolio Constraints",
  "Factor Models for Returns",
  "Factor Exposures & Betas",
  "Factor Covariance & Idiosyncratic Risk",
  "Risk Attribution & Decomposition",
  "Portfolio Construction Research Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M55 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[54] === moduleId && T22_ORDER[53] === "ARC553" && T22_ORDER[55] === "ARC558", "M55 must remain ARC554 between ARC553 and ARC558.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC541", "ARC553", "ARC582"]), "M55 route prerequisites drifted.");

const baseArcs = T22_ATOMIC_MODULES[moduleId] || [];
const richModule = getT22RichModule(moduleId);
expect(Boolean(richModule), `${moduleId} must have a rich syllabus contract.`);
expect(richModule?.moduleId === moduleId, `${moduleId} rich moduleId mismatch.`);
expect(richModule?.syllabusVersion === "3.0", `${moduleId} must use syllabusVersion=3.0.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.id)) === JSON.stringify(expectedIds), `${moduleId} stable IDs drifted.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.title)) === JSON.stringify(expectedTitles), `${moduleId} audited titles drifted.`);
expect(baseArcs.every((arc) => arc.targetHours === 4), `${moduleId} targetHours drifted from 4h bookkeeping.`);
expect(Object.keys(richModule?.arcs || {}).length === expectedIds.length, `${moduleId} rich coverage mismatch.`);
expect(Boolean(richModule?.roleTarget) && Boolean(richModule?.modulePurpose) && Boolean(richModule?.moduleDestination), `${moduleId} module contract incomplete.`);
expect(Array.isArray(richModule?.entryPrerequisites) && richModule.entryPrerequisites.length > 0, `${moduleId} missing entryPrerequisites.`);
expect(Array.isArray(richModule?.explicitlyOutOfScope) && richModule.explicitlyOutOfScope.length > 0, `${moduleId} missing explicitlyOutOfScope.`);

for (const baseArc of baseArcs) {
  const enriched = enrichT22AtomicArc(moduleId, baseArc);
  expect(enriched.id === baseArc.id && enriched.title === baseArc.title && enriched.targetHours === baseArc.targetHours, `${baseArc.id} stable bookkeeping changed.`);
  expect(enriched.syllabusVersion === "3.0", `${baseArc.id} missing syllabusVersion=3.0.`);
  for (const field of scalarFields) expect(typeof enriched[field] === "string" && enriched[field].trim(), `${baseArc.id} missing ${field}.`);
  for (const field of listFields) expect(Array.isArray(enriched[field]) && enriched[field].length > 0, `${baseArc.id} missing ${field}.`);
  expect(enriched.requiredMastery.length >= 5, `${baseArc.id} needs at least five mastery checks.`);
}

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC541")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC553")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC582")), "M55 must build on all three route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC558")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC559")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC560")), "M55 must preserve microstructure/execution/capstone ownership boundaries.");
expect(richModule?.arcs?.["T22-M55-A01"]?.requiredMastery?.some((x) => x.includes("look-ahead")), "M55 A01 must enforce weight-timing causality.");
expect(richModule?.arcs?.["T22-M55-A02"]?.requiredMastery?.some((x) => x.includes("w^T Sigma w")), "M55 A02 must operationalize quadratic portfolio variance.");
expect(richModule?.arcs?.["T22-M55-A03"]?.requiredMastery?.some((x) => x.includes("effective diversification")), "M55 A03 must distinguish name count from effective diversification.");
expect(richModule?.arcs?.["T22-M55-A05"]?.requiredMastery?.some((x) => x.includes("convexity")), "M55 A05 must connect mean-variance optimization to PSD covariance.");
expect(richModule?.arcs?.["T22-M55-A07"]?.requiredMastery?.some((x) => x.includes("Sigma^{-1}1")), "M55 A07 must operationalize the GMV formula.");
expect(richModule?.arcs?.["T22-M55-A08"]?.requiredMastery?.some((x) => x.includes("Sigma^{-1}(mu-r_f1)")), "M55 A08 must operationalize the tangency direction.");
expect(richModule?.arcs?.["T22-M55-A09"]?.requiredMastery?.some((x) => x.includes("held-out")) && richModule?.arcs?.["T22-M55-A09"]?.requiredMastery?.some((x) => x.includes("benchmark")), "M55 A09 must expose optimizer instability out of sample.");
expect(richModule?.arcs?.["T22-M55-A10"]?.requiredMastery?.some((x) => x.includes("condition number")) && richModule?.arcs?.["T22-M55-A10"]?.requiredMastery?.some((x) => x.includes("shrinkage")), "M55 A10 must connect shrinkage to conditioning.");
expect(richModule?.arcs?.["T22-M55-A11"]?.requiredMastery?.some((x) => x.includes("infeasible")), "M55 A11 must diagnose infeasible constraints.");
expect(richModule?.arcs?.["T22-M55-A14"]?.requiredMastery?.some((x) => x.includes("B F B^T + D")), "M55 A14 must operationalize factor covariance decomposition.");
expect(richModule?.arcs?.["T22-M55-A15"]?.requiredMastery?.some((x) => x.includes("sum to portfolio variance")), "M55 A15 must enforce risk-attribution add-up.");
expect(richModule?.arcs?.["T22-M55-A16"]?.requiredMastery?.some((x) => x.includes("untouched held-out")) && richModule?.arcs?.["T22-M55-A16"]?.nextArcBoundary?.includes("ARC558"), "M55 lab must require held-out defense and hand off to ARC558.");

if (errors.length) {
  console.error(`T22 M55 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M55 rich syllabus OK: ${expectedIds.length} stable portfolio-construction mission cards validated.`);
