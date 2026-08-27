import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");

const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC507";
const expectedIds = [
  "T22-M31-A01", "T22-M31-A02", "T22-M31-A03", "T22-M31-A04", "T22-M31-A05",
  "T22-M31-A06", "T22-M31-A07", "T22-M31-A08", "T22-M31-A09",
];
const expectedTitles = [
  "Observation vs Intervention",
  "Treatment & Comparison Groups",
  "Random Assignment",
  "Control Groups, Placebos & Counterfactual Thinking",
  "Blocking & Stratification",
  "Blinding & Measurement Bias",
  "Replication vs Repeated Measurement",
  "Factorial Experiments",
  "Experimental Design Forge",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M31 validation.");
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

expect(
  richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC537")),
  "M31 must defer permutation/randomization inference procedures to ARC537.",
);
expect(
  richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC545") && item.includes("ARC550")),
  "M31 must defer deeper quasi-experimental/econometric identification to ARC545-ARC550.",
);
expect(
  richModule?.arcs?.["T22-M31-A03"]?.requiredMastery?.some((item) => item.includes("random sampling") && item.includes("random assignment")),
  "M31 A03 must distinguish random sampling from random assignment.",
);
expect(
  richModule?.arcs?.["T22-M31-A07"]?.nextArcBoundary?.includes("ARC509"),
  "M31 A07 must hand full study/pipeline replication to ARC509.",
);
expect(
  richModule?.arcs?.["T22-M31-A09"]?.nextArcBoundary?.includes("ARC508") &&
    richModule.arcs["T22-M31-A09"].nextArcBoundary.includes("ARC509") &&
    richModule.arcs["T22-M31-A09"].nextArcBoundary.includes("ARC560"),
  "M31 A09 must hand model validation to ARC508, reproducibility to ARC509, and terminal integration to ARC560.",
);

if (errors.length) {
  console.error(`T22 M31 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M31 rich syllabus OK: ${expectedIds.length} stable experimental-design mission cards validated.`);
