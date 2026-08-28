import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC524";
const expectedIds = [
  "T22-M38-A01", "T22-M38-A02", "T22-M38-A03", "T22-M38-A04", "T22-M38-A05",
  "T22-M38-A06", "T22-M38-A07", "T22-M38-A08", "T22-M38-A09", "T22-M38-A10",
];
const expectedTitles = [
  "The Markov Property",
  "Transition Matrices",
  "Multi-Step Evolution",
  "Communication & State Classes",
  "Recurrence & Transience",
  "Hitting & Return Times",
  "Stationary Distributions",
  "Reversibility & Detailed Balance",
  "Convergence & Mixing",
  "Markov Simulation & MCMC Bridge",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M38 validation.");
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

expect(richModule?.arcs?.["T22-M38-A01"]?.requiredMastery?.some((item) => item.includes("independence")), "M38 A01 must distinguish Markov dependence from independence.");
expect(richModule?.arcs?.["T22-M38-A02"]?.requiredMastery?.some((item) => item.includes("row sums")), "M38 A02 must enforce stochastic-matrix validity.");
expect(richModule?.arcs?.["T22-M38-A03"]?.focus?.includes("Chapman-Kolmogorov") && richModule?.arcs?.["T22-M38-A03"]?.requiredMastery?.some((item) => item.includes("Chapman-Kolmogorov")), "M38 A03 must operationalize Chapman-Kolmogorov composition.");
expect(richModule?.arcs?.["T22-M38-A04"]?.requiredMastery?.some((item) => item.includes("closed")), "M38 A04 must distinguish closed communicating classes.");
expect(richModule?.arcs?.["T22-M38-A05"]?.requiredMastery?.some((item) => item.includes("finite irreducible")), "M38 A05 must scope the finite irreducible recurrence result.");
expect(richModule?.arcs?.["T22-M38-A06"]?.requiredMastery?.some((item) => item.includes("first-step")), "M38 A06 must derive first-step hitting-time equations.");
expect(richModule?.arcs?.["T22-M38-A07"]?.requiredMastery?.some((item) => item.includes("existence") && item.includes("uniqueness")), "M38 A07 must separate stationary existence, uniqueness and convergence.");
expect(richModule?.arcs?.["T22-M38-A08"]?.requiredMastery?.some((item) => item.includes("implies")), "M38 A08 must establish detailed balance as sufficient for stationarity.");
expect(richModule?.arcs?.["T22-M38-A09"]?.requiredMastery?.some((item) => item.includes("periodic")), "M38 A09 must expose periodic non-convergence.");
expect(richModule?.arcs?.["T22-M38-A09"]?.target?.includes("aperiodicity"), "M38 A09 must state finite irreducible aperiodic convergence conditions.");
expect(richModule?.arcs?.["T22-M38-A10"]?.requiredMastery?.some((item) => item.includes("dependent")), "M38 A10 must distinguish Markov-chain output from iid Monte Carlo draws.");
expect(richModule?.arcs?.["T22-M38-A10"]?.requiredMastery?.some((item) => item.includes("stationary law")), "M38 A10 must state the MCMC stationary-target bridge.");
expect(richModule?.arcs?.["T22-M38-A10"]?.nextArcBoundary?.includes("ARC525"), "M38 A10 must hand event-time process ownership to ARC525.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC543")), "M38 must preserve Kalman/state-space ownership in ARC543.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC513")), "M38 must preserve general Monte Carlo ownership in ARC513.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M38 must preserve terminal integration ownership in ARC560.");

if (errors.length) {
  console.error(`T22 M38 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M38 rich syllabus OK: ${expectedIds.length} stable Markov-chain mission cards validated.`);
