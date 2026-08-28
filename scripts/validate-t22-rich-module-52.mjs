import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC714";
const expectedIds = Array.from({ length: 14 }, (_, i) => `T22-M52-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Market Data as an Event Stream",
  "Trades, Quotes & Order-Book Schemas",
  "Event Time vs Receive Time",
  "Clocks, Time Zones & Synchronization Assumptions",
  "Sequence Numbers, Duplicates & Missing Events",
  "Asynchronous Feeds",
  "As-Of Joins",
  "Trade-Quote Alignment",
  "Order-Book Event Reconstruction",
  "Sessions, Symbols & Market Boundaries",
  "Known-at-the-Time Causality",
  "Bars, Aggregation & Information Loss",
  "Dataset Invariants & Temporal Audits",
  "Raw-to-Research Market Dataset Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M52 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[51] === moduleId && T22_ORDER[50] === "ARC716" && T22_ORDER[52] === "ARC715", "M52 must remain ARC714 between ARC716 and ARC715 in T22_ORDER.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC515", "ARC542", "ARC716"]), "M52 route prerequisites drifted.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC515")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC542")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC716")), "M52 must build on all three route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC716")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC715")), "M52 must preserve data-query and dirty-data ownership boundaries.");
expect(richModule?.arcs?.["T22-M52-A03"]?.requiredMastery?.some((x) => x.includes("event time")) && richModule?.arcs?.["T22-M52-A03"]?.requiredMastery?.some((x) => x.includes("receive")), "M52 A03 must distinguish event and receive time.");
expect(richModule?.arcs?.["T22-M52-A04"]?.requiredMastery?.some((x) => x.includes("timezone")) && richModule?.arcs?.["T22-M52-A04"]?.requiredMastery?.some((x) => x.includes("synchronization")), "M52 A04 must separate timezone conversion from clock synchronization.");
expect(richModule?.arcs?.["T22-M52-A05"]?.requiredMastery?.some((x) => x.includes("sequence gaps")), "M52 A05 must audit sequence gaps.");
expect(richModule?.arcs?.["T22-M52-A07"]?.requiredMastery?.some((x) => x.includes("backward direction")) && richModule?.arcs?.["T22-M52-A07"]?.requiredMastery?.some((x) => x.includes("right timestamp")), "M52 A07 must enforce causal backward as-of joins.");
expect(richModule?.arcs?.["T22-M52-A09"]?.requiredMastery?.some((x) => x.includes("sequence order")) && richModule?.arcs?.["T22-M52-A09"]?.requiredMastery?.some((x) => x.includes("Invalidate")), "M52 A09 must make book reconstruction gap-aware.");
expect(richModule?.arcs?.["T22-M52-A11"]?.requiredMastery?.some((x) => x.includes("max source availability time")), "M52 A11 must audit feature availability lineage.");
expect(richModule?.arcs?.["T22-M52-A12"]?.requiredMastery?.some((x) => x.includes("non-uniqueness")), "M52 A12 must demonstrate information loss under bar aggregation.");
expect(richModule?.arcs?.["T22-M52-A13"]?.requiredMastery?.some((x) => x.includes("right_time <= left_time")), "M52 A13 must encode the causal join invariant.");
expect(richModule?.arcs?.["T22-M52-A14"]?.transferScope?.includes("source events") && richModule?.arcs?.["T22-M52-A14"]?.nextArcBoundary?.includes("ARC715"), "M52 lab must prove provenance and hand dirty-data ownership to ARC715.");
expect(richModule?.arcs?.["T22-M52-A14"]?.nextArcBoundary?.includes("ARC715"), "M52 must hand downstream ownership to ARC715.");

if (errors.length) {
  console.error(`T22 M52 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M52 rich syllabus OK: ${expectedIds.length} stable market-data temporal-alignment mission cards validated.`);
