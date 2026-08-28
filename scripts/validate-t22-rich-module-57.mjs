import { WORLD } from "../js/data/world.js";
await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC559";
const expectedIds = Array.from({ length: 14 }, (_, i) => `T22-M57-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = ["The Execution Problem","Implementation Shortfall","Explicit vs Implicit Trading Costs","Temporary vs Permanent Market Impact","Estimating Impact from Data","Urgency, Risk & Impact Trade-Offs","TWAP, VWAP & Execution Benchmarks","Participation-Rate Scheduling","Optimal Execution under Price Risk","Market vs Limit Order Choice","Fill Probability & Queue Risk","Liquidity Regimes & Adaptive Execution","Transaction-Cost Analysis","Execution Simulation & Evaluation Lab"];
const scalarFields = ["focus","roleRelevance","purpose","principalObstacle","target","applicationScope","transferScope","nextArcBoundary"];
const listFields = ["entryPrerequisites","requiredMastery","explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M57 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735","ARC736","ARC737","ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[56] === moduleId && T22_ORDER[55] === "ARC558" && T22_ORDER[57] === "ARC560", "M57 must remain ARC559 between ARC558 and ARC560.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC558","ARC514","ARC713"]), "M57 route prerequisites drifted.");
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
expect(richModule?.entryPrerequisites?.some((x)=>x.includes("ARC558")) && richModule?.entryPrerequisites?.some((x)=>x.includes("ARC514")) && richModule?.entryPrerequisites?.some((x)=>x.includes("ARC713")), "M57 must build on all route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x)=>x.includes("ARC560")), "M57 must preserve M58 capstone ownership.");
expect(richModule?.arcs?.["T22-M57-A02"]?.requiredMastery?.some((x)=>x.includes("opportunity cost")), "M57 A02 must include unfilled-order opportunity cost.");
expect(richModule?.arcs?.["T22-M57-A05"]?.requiredMastery?.some((x)=>x.includes("causal impact")), "M57 A05 must distinguish prediction/association from causal impact.");
expect(richModule?.arcs?.["T22-M57-A07"]?.requiredMastery?.some((x)=>x.includes("realized VWAP")), "M57 A07 must protect against hindsight VWAP leakage.");
expect(richModule?.arcs?.["T22-M57-A09"]?.requiredMastery?.some((x)=>x.includes("inventory state")), "M57 A09 must operationalize the execution state equation.");
expect(richModule?.arcs?.["T22-M57-A10"]?.requiredMastery?.some((x)=>x.includes("non-fill")), "M57 A10 must include passive non-fill cost.");
expect(richModule?.arcs?.["T22-M57-A13"]?.requiredMastery?.some((x)=>x.includes("Stratify")), "M57 A13 must require conditioned TCA.");
expect(richModule?.arcs?.["T22-M57-A14"]?.requiredMastery?.some((x)=>x.includes("false superiority")) && richModule?.arcs?.["T22-M57-A14"]?.nextArcBoundary?.includes("ARC560"), "M57 lab must adversarially test simulator assumptions and hand off to ARC560.");
if (errors.length) { console.error(`T22 M57 rich validation failed with ${errors.length} issue(s):`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log(`T22 M57 rich syllabus OK: ${expectedIds.length} stable execution mission cards validated.`);
