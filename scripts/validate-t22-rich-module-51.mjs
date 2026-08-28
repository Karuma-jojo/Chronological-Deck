import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC716";
const expectedIds = Array.from({ length: 11 }, (_, i) => `T22-M51-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Relational Data Models, Tables & Keys",
  "Filtering & Projection with SQL",
  "Grouping & Aggregation",
  "Joins & Relationship Logic",
  "Window Functions for Ordered Data",
  "Subqueries, CTEs & Composable Queries",
  "Query Plans, Indexes & Cost Awareness",
  "Columnar Storage & Analytical File Formats",
  "Partitioning & Predicate Pushdown",
  "Lazy and Out-of-Core Query Workflows",
  "Reproducible Time-Series Query Pipeline Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M51 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[50] === moduleId && T22_ORDER[49] === "ARC599" && T22_ORDER[51] === "ARC714", "M51 must remain ARC716 between ARC599 and ARC714 in T22_ORDER.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC515", "ARC713"]), "M51 route prerequisites drifted.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC515")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC713")), "M51 must build on both route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC714")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC715")), "M51 must preserve downstream market-data ownership boundaries.");
expect(richModule?.arcs?.["T22-M51-A01"]?.requiredMastery?.some((x) => x.includes("many-to-many")), "M51 A01 must operationalize relationship cardinality.");
expect(richModule?.arcs?.["T22-M51-A02"]?.requiredMastery?.some((x) => x.includes("NULL")), "M51 A02 must handle SQL NULL semantics.");
expect(richModule?.arcs?.["T22-M51-A04"]?.requiredMastery?.some((x) => x.includes("many-to-many")), "M51 A04 must detect join multiplication.");
expect(richModule?.arcs?.["T22-M51-A05"]?.requiredMastery?.some((x) => x.includes("deterministic key")), "M51 A05 must require deterministic ordered windows.");
expect(richModule?.arcs?.["T22-M51-A07"]?.requiredMastery?.some((x) => x.includes("Measure elapsed")), "M51 A07 must require measured plan/cost evidence.");
expect(richModule?.arcs?.["T22-M51-A08"]?.requiredMastery?.some((x) => x.includes("column projection")), "M51 A08 must connect columnar layout to reduced I/O.");
expect(richModule?.arcs?.["T22-M51-A09"]?.requiredMastery?.some((x) => x.includes("partition pruning")) && richModule?.arcs?.["T22-M51-A09"]?.requiredMastery?.some((x) => x.includes("predicate pushdown")), "M51 A09 must operationalize pruning and pushdown.");
expect(richModule?.arcs?.["T22-M51-A10"]?.requiredMastery?.some((x) => x.includes("peak memory")), "M51 A10 must enforce a bounded-memory workflow.");
expect(richModule?.arcs?.["T22-M51-A11"]?.requiredMastery?.some((x) => x.includes("independently computed reference")), "M51 lab must cross-check against a trusted reference.");
expect(richModule?.arcs?.["T22-M51-A11"]?.nextArcBoundary?.includes("ARC714"), "M51 must hand temporal-alignment ownership to ARC714.");

if (errors.length) {
  console.error(`T22 M51 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M51 rich syllabus OK: ${expectedIds.length} stable efficient-querying mission cards validated.`);
