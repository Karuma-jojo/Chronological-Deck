import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC525";
const expectedIds = [
  "T22-M39-A01", "T22-M39-A02", "T22-M39-A03", "T22-M39-A04", "T22-M39-A05",
  "T22-M39-A06", "T22-M39-A07", "T22-M39-A08", "T22-M39-A09",
];
const expectedTitles = [
  "Counting Processes & Event Time",
  "Poisson Process Assumptions",
  "Poisson Counts",
  "Exponential Waiting Times",
  "Superposition & Thinning",
  "Nonhomogeneous Poisson Processes",
  "Renewal Processes",
  "Intensities & Conditional Arrival Rates",
  "Event-Time Modelling Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M39 validation.");
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
  const arc = enrichT22AtomicArc(moduleId, baseArc);
  expect(arc.id === baseArc.id, `${baseArc.id} ID changed.`);
  expect(arc.title === baseArc.title, `${baseArc.id} title changed.`);
  expect(arc.targetHours === baseArc.targetHours, `${baseArc.id} targetHours changed.`);
  expect(arc.syllabusVersion === "3.0", `${baseArc.id} missing syllabusVersion=3.0.`);
  for (const field of scalarFields) expect(typeof arc[field] === "string" && arc[field].trim(), `${baseArc.id} missing ${field}.`);
  for (const field of listFields) expect(Array.isArray(arc[field]) && arc[field].length > 0, `${baseArc.id} missing ${field}.`);
  expect(arc.requiredMastery.length >= 5, `${baseArc.id} needs at least five mastery checks.`);
}

expect(richModule?.arcs?.["T22-M39-A01"]?.target?.includes("{T_n <= t}") && richModule?.arcs?.["T22-M39-A01"]?.requiredMastery?.some((item) => item.includes("calendar time")), "M39 A01 must connect count-time and event-time representations.");
expect(richModule?.arcs?.["T22-M39-A02"]?.requiredMastery?.some((item) => item.includes("independent increments")) && richModule?.arcs?.["T22-M39-A02"]?.requiredMastery?.some((item) => item.includes("stationary increments")), "M39 A02 must operationalize homogeneous Poisson assumptions.");
expect(richModule?.arcs?.["T22-M39-A02"]?.requiredMastery?.some((item) => item.includes("marginal count") && item.includes("full Poisson-process")), "M39 A02 must distinguish a Poisson marginal from a Poisson process.");
expect(richModule?.arcs?.["T22-M39-A03"]?.target?.includes("Poisson(lambda(t-s))"), "M39 A03 must encode exposure-aware interval counts.");
expect(richModule?.arcs?.["T22-M39-A04"]?.target?.includes("exp(-lambda t)") && richModule?.arcs?.["T22-M39-A04"]?.requiredMastery?.some((item) => item.includes("memoryless")), "M39 A04 must derive exponential waiting and memorylessness.");
expect(richModule?.arcs?.["T22-M39-A05"]?.requiredMastery?.some((item) => item.includes("thinned") && item.includes("rate")), "M39 A05 must operationalize Poisson thinning.");
expect(richModule?.arcs?.["T22-M39-A06"]?.requiredMastery?.some((item) => item.includes("integrated intensity")), "M39 A06 must use integrated intensity for NHPP counts.");
expect(richModule?.arcs?.["T22-M39-A06"]?.target?.includes("deterministic") && richModule?.arcs?.["T22-M39-A06"]?.requiredMastery?.some((item) => item.includes("history dependence")), "M39 A06 must separate deterministic time variation from history dependence.");
expect(richModule?.arcs?.["T22-M39-A07"]?.requiredMastery?.some((item) => item.includes("Poisson process") && item.includes("special case")), "M39 A07 must recover Poisson as the exponential-renewal special case.");
expect(richModule?.arcs?.["T22-M39-A08"]?.requiredMastery?.some((item) => item.includes("rate and probability distinct")), "M39 A08 must keep conditional intensity distinct from probability.");
expect(richModule?.arcs?.["T22-M39-A09"]?.requiredMastery?.some((item) => item.includes("dispersion")) && richModule?.arcs?.["T22-M39-A09"]?.requiredMastery?.some((item) => item.includes("negative results")), "M39 A09 must diagnose event models adversarially without post-hoc rescue.");
expect(richModule?.arcs?.["T22-M39-A09"]?.nextArcBoundary?.includes("ARC514"), "M39 A09 must hand the route to ARC514.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC524")), "M39 must preserve Markov-chain ownership in ARC524.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC542")), "M39 must preserve classical time-series ownership in ARC542.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC543")), "M39 must preserve state-space ownership in ARC543.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC714")), "M39 must preserve market-data engineering ownership in ARC714.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M39 must preserve production integration ownership in ARC560.");

if (errors.length) {
  console.error(`T22 M39 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M39 rich syllabus OK: ${expectedIds.length} stable event-time mission cards validated.`);
