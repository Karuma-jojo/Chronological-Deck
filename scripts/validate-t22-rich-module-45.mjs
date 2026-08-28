import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC211";
const expectedIds = Array.from({ length: 9 }, (_, i) => `T22-M45-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Sequential Decision Problems",
  "State Representation",
  "Optimal Substructure",
  "Bellman Recurrences",
  "Backward Induction",
  "Memoization",
  "Tabulation",
  "State-Space Explosion",
  "Dynamic-Programming Forge",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M45 validation.");
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

expect(richModule?.arcs?.["T22-M45-A01"]?.requiredMastery?.some((x) => x.includes("greedy")), "M45 A01 must distinguish sequential optimization from greedy choice.");
expect(richModule?.arcs?.["T22-M45-A02"]?.requiredMastery?.some((x) => x.includes("equal states") || x.includes("same")), "M45 A02 must test state sufficiency across histories.");
expect(richModule?.arcs?.["T22-M45-A03"]?.requiredMastery?.some((x) => x.includes("replacement")), "M45 A03 must justify optimal substructure by replacement reasoning.");
expect(richModule?.arcs?.["T22-M45-A04"]?.target?.includes("Bellman recurrence"), "M45 A04 must derive an operational Bellman recurrence.");
expect(richModule?.arcs?.["T22-M45-A04"]?.requiredMastery?.some((x) => x.includes("brute force")), "M45 A04 must validate the recurrence independently on tiny instances.");
expect(richModule?.arcs?.["T22-M45-A05"]?.requiredMastery?.some((x) => x.includes("dependency")), "M45 A05 must justify backward evaluation order.");
expect(richModule?.arcs?.["T22-M45-A06"]?.requiredMastery?.some((x) => x.includes("canonical cache keys")), "M45 A06 must operationalize memoization state identity.");
expect(richModule?.arcs?.["T22-M45-A07"]?.requiredMastery?.some((x) => x.includes("fill order")), "M45 A07 must operationalize tabulation dependency order.");
expect(richModule?.arcs?.["T22-M45-A08"]?.requiredMastery?.some((x) => x.includes("exponential state")), "M45 A08 must expose state-space explosion.");
expect(richModule?.arcs?.["T22-M45-A09"]?.requiredMastery?.some((x) => x.includes("exhaustive search")), "M45 forge must require independent small-instance validation.");
expect(richModule?.arcs?.["T22-M45-A09"]?.nextArcBoundary?.includes("ARC590"), "M45 must hand controlled stochastic-process ownership to ARC590.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC590")), "M45 must preserve MDP/stochastic-control ownership in ARC590.");
expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC717")), "M45 should build on, not duplicate, the earlier algorithms module.");

if (errors.length) {
  console.error(`T22 M45 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M45 rich syllabus OK: ${expectedIds.length} stable deterministic-DP mission cards validated.`);
