import { WORLD } from "../js/data/world.js";
await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC560";
const expectedIds = Array.from({ length: 25 }, (_, i) => `T22-M58-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = ["Research Question & Testable Hypothesis","Economic / Market Mechanism","Research Pre-Mortem & Failure Criteria","Universe & Tradable-Set Definition","Raw Data Provenance","Timestamp & Temporal-Causality Audit","Baseline & Null Strategy","Feature Construction","Target / Label Construction","Sampling Horizon & Overlapping Observations","Train, Validation, Test & Walk-Forward Design","Backtest Engine Mechanics","Positions, Returns & PnL Accounting","Fees, Spreads & Transaction Costs","Market Impact & Capacity","Performance Metrics","Risk & Drawdown Metrics","Sampling Uncertainty of Backtest Results","Multiple Testing & Data Snooping","Backtest Overfitting & Researcher Degrees of Freedom","Robustness & Sensitivity Analysis","Regime and Subperiod Stability","Position Sizing & Kelly Logic","Portfolio Risk Limits & Failure Containment","Reproducible Research Memo & Adversarial Final Defense"];
const scalarFields = ["focus","roleRelevance","purpose","principalObstacle","target","applicationScope","transferScope","nextArcBoundary"];
const listFields = ["entryPrerequisites","requiredMastery","explicitlyOutOfScope"];
const forbiddenRouteIds = ["ARC735","ARC736","ARC737","ARC738"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M58 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => forbiddenRouteIds.includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[57] === moduleId && T22_ORDER[56] === "ARC559", "M58 must remain final T22 module ARC560 immediately after ARC559.");
expect(!T22_ORDER[58], "T22 must end at M58; no M59 route entry is permitted.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC554","ARC559","ARC505","ARC508","ARC715"]), "M58 route prerequisites drifted.");
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
for (const prereq of ["ARC554","ARC559","ARC505","ARC508","ARC715"]) expect(richModule?.entryPrerequisites?.some((x)=>x.includes(prereq)), `M58 must build explicitly on route prerequisite ${prereq}.`);
expect(richModule?.explicitlyOutOfScope?.some((x)=>x.includes("Module 59") || x.includes("ARC735")), "M58 must explicitly forbid a post-M58 entrance extension.");
expect(richModule?.arcs?.["T22-M58-A06"]?.requiredMastery?.some((x)=>x.includes("publication") || x.includes("receive")), "M58 A06 must distinguish timestamp/availability semantics.");
expect(richModule?.arcs?.["T22-M58-A11"]?.requiredMastery?.some((x)=>x.includes("test-set access")), "M58 A11 must protect final test integrity.");
expect(richModule?.arcs?.["T22-M58-A12"]?.requiredMastery?.some((x)=>x.includes("same-bar")), "M58 A12 must forbid impossible same-bar fills.");
expect(richModule?.arcs?.["T22-M58-A13"]?.requiredMastery?.some((x)=>x.includes("invariant")), "M58 A13 must include PnL/accounting invariants.");
expect(richModule?.arcs?.["T22-M58-A15"]?.requiredMastery?.some((x)=>x.includes("capacity")), "M58 A15 must operationalize capacity.");
expect(richModule?.arcs?.["T22-M58-A18"]?.requiredMastery?.some((x)=>x.includes("dependence-aware")), "M58 A18 must account for dependent backtest samples.");
expect(richModule?.arcs?.["T22-M58-A19"]?.requiredMastery?.some((x)=>x.includes("abandoned signals")), "M58 A19 must preserve the search denominator.");
expect(richModule?.arcs?.["T22-M58-A20"]?.requiredMastery?.some((x)=>x.includes("repeated test peeking")), "M58 A20 must cover researcher degrees of freedom beyond formal model tuning.");
expect(richModule?.arcs?.["T22-M58-A23"]?.requiredMastery?.some((x)=>x.includes("fractional Kelly")), "M58 A23 must treat Kelly sizing conservatively under estimation error.");
expect(richModule?.arcs?.["T22-M58-A25"]?.requiredMastery?.some((x)=>x.includes("proceed/revise/reject")), "M58 A25 must require a calibrated final research decision.");
expect(richModule?.arcs?.["T22-M58-A25"]?.nextArcBoundary?.includes("T22 ends here") && richModule?.arcs?.["T22-M58-A25"]?.nextArcBoundary?.includes("58 modules") && richModule?.arcs?.["T22-M58-A25"]?.nextArcBoundary?.includes("596 Atomic ARCs"), "M58 A25 must terminate T22 and hand off to the route-wide final audit, not M59.");
if (errors.length) { console.error(`T22 M58 rich validation failed with ${errors.length} issue(s):`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log(`T22 M58 rich syllabus OK: ${expectedIds.length} stable capstone mission cards validated; T22 terminates at M58.`);