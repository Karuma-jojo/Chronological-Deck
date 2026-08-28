import { WORLD } from "../js/data/world.js";
await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC553";
const expectedIds = Array.from({ length: 12 }, (_, i) => `T22-M54-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = ["Prices, Cash Flows & Returns", "Discounting & Present Value", "Compounding, Numeraire & Risk-Free Growth", "Arbitrage as a Trading Contradiction", "Law of One Price", "Replication", "State-Contingent Payoffs", "State Prices", "Risk-Neutral Probability Intuition", "Stochastic Discount Factors / Pricing Kernels", "Risk Premia & Expected Returns", "No-Arbitrage Pricing Forge"];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M54 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[53] === moduleId && T22_ORDER[52] === "ARC715" && T22_ORDER[54] === "ARC554", "M54 must remain ARC553 between ARC715 and ARC554.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC048", "ARC514"]), "M54 route prerequisites drifted.");
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
expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC048")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC514")), "M54 must build on both route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC554")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC560")), "M54 must preserve downstream ownership boundaries.");
expect(richModule?.arcs?.["T22-M54-A01"]?.requiredMastery?.some((x) => x.includes("double counting")), "M54 A01 must protect cash-flow/return accounting.");
expect(richModule?.arcs?.["T22-M54-A04"]?.requiredMastery?.some((x) => x.includes("positive expected profit")), "M54 A04 must distinguish arbitrage from expected profit.");
expect(richModule?.arcs?.["T22-M54-A06"]?.requiredMastery?.some((x) => x.includes("replicating")), "M54 A06 must operationalize replication.");
expect(richModule?.arcs?.["T22-M54-A08"]?.requiredMastery?.some((x) => x.includes("physical probabilities")), "M54 A08 must distinguish state prices from physical probabilities.");
expect(richModule?.arcs?.["T22-M54-A09"]?.requiredMastery?.some((x) => x.includes("sum to one")), "M54 A09 must normalize risk-neutral weights.");
expect(richModule?.arcs?.["T22-M54-A10"]?.requiredMastery?.some((x) => x.includes("E[mX]")) && richModule?.arcs?.["T22-M54-A10"]?.requiredMastery?.some((x) => x.includes("covariance")), "M54 A10 must operationalize SDF pricing.");
expect(richModule?.arcs?.["T22-M54-A11"]?.requiredMastery?.some((x) => x.includes("risk premium")), "M54 A11 must distinguish risk premia from arbitrage.");
expect(richModule?.arcs?.["T22-M54-A12"]?.requiredMastery?.some((x) => x.includes("Reconcile prices")) && richModule?.arcs?.["T22-M54-A12"]?.nextArcBoundary?.includes("ARC554"), "M54 forge must reconcile pricing representations and hand off to ARC554.");
if (errors.length) { console.error(`T22 M54 rich validation failed with ${errors.length} issue(s):`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log(`T22 M54 rich syllabus OK: ${expectedIds.length} stable no-arbitrage-pricing mission cards validated.`);
