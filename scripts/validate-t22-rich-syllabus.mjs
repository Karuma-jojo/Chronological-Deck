import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");

const {
  T22_ATOMIC_MODULES,
} = await import("../js/data/t22-atomic-arcs.js");
const {
  T22_RICH_SYLLABUS_VERSION,
  getT22RichModule,
  enrichT22AtomicArc,
} = await import("../js/data/t22-rich-syllabus.js");

const errors = [];
function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be registered before rich syllabus validation.");

const moduleId = "ARC053";
const baseArcs = T22_ATOMIC_MODULES[moduleId] || [];
const richModule = getT22RichModule(moduleId);

expect(T22_RICH_SYLLABUS_VERSION === "3.0", `Expected rich syllabus v3.0; found ${T22_RICH_SYLLABUS_VERSION}.`);
expect(Boolean(richModule), "ARC053 must have a rich syllabus contract.");
expect(richModule?.syllabusVersion === "3.0", `ARC053 should expose syllabusVersion=3.0; found ${richModule?.syllabusVersion}.`);
expect(baseArcs.length === 6, `ARC053 should retain six stable atomic arcs; found ${baseArcs.length}.`);
expect(Object.keys(richModule?.arcs || {}).length === 6, "ARC053 rich syllabus should cover all six atomic arcs.");
expect(Boolean(richModule?.roleTarget), "ARC053 rich syllabus is missing roleTarget.");
expect(Boolean(richModule?.modulePurpose), "ARC053 rich syllabus is missing modulePurpose.");
expect(Boolean(richModule?.moduleDestination), "ARC053 rich syllabus is missing moduleDestination.");
expect(Array.isArray(richModule?.entryPrerequisites) && richModule.entryPrerequisites.length > 0, "ARC053 needs module entry prerequisites.");
expect(Array.isArray(richModule?.explicitlyOutOfScope) && richModule.explicitlyOutOfScope.length > 0, "ARC053 needs a module scope boundary.");

const requiredScalarFields = [
  "focus",
  "roleRelevance",
  "purpose",
  "principalObstacle",
  "target",
  "applicationScope",
  "transferScope",
  "nextArcBoundary",
];
const requiredListFields = [
  "entryPrerequisites",
  "requiredMastery",
  "explicitlyOutOfScope",
];

for (const baseArc of baseArcs) {
  const rich = richModule?.arcs?.[baseArc.id];
  const arc = enrichT22AtomicArc(moduleId, baseArc);
  expect(Boolean(rich), `${baseArc.id} is missing its rich syllabus card.`);
  expect(arc.id === baseArc.id, `${baseArc.id} rich enrichment must preserve the stable atomic ID.`);
  expect(arc.title === baseArc.title, `${baseArc.id} rich enrichment must preserve the audited v2 title.`);
  expect(arc.targetHours === baseArc.targetHours, `${baseArc.id} rich enrichment must preserve bookkeeping hours.`);
  expect(arc.syllabusVersion === "3.0", `${baseArc.id} should expose syllabusVersion=3.0.`);
  for (const field of requiredScalarFields) {
    expect(typeof arc[field] === "string" && arc[field].trim().length > 0, `${baseArc.id} is missing non-empty ${field}.`);
  }
  for (const field of requiredListFields) {
    expect(Array.isArray(arc[field]) && arc[field].length > 0, `${baseArc.id} is missing non-empty ${field}.`);
  }
  expect(arc.requiredMastery.length >= 5, `${baseArc.id} should have at least five observable mastery checks.`);
}

const expectedIds = [
  "T22-M01-A01",
  "T22-M01-A02",
  "T22-M01-A03",
  "T22-M01-A04",
  "T22-M01-A05",
  "T22-M01-A06",
];
expect(
  JSON.stringify(baseArcs.map((arc) => arc.id)) === JSON.stringify(expectedIds),
  `ARC053 stable IDs drifted: ${JSON.stringify(baseArcs.map((arc) => arc.id))}.`,
);

if (errors.length) {
  console.error(`T22 rich syllabus validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `T22 rich syllabus v${T22_RICH_SYLLABUS_VERSION} OK: ARC053 has ${baseArcs.length} stable quant-research mission cards; v2 progress semantics preserved.`,
);
