import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER } = await import("../js/data/t22-quant-research.js");
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
expect(T22_RICH_SYLLABUS_VERSION === "3.0", `Expected rich syllabus v3.0; found ${T22_RICH_SYLLABUS_VERSION}.`);

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

const MODULE_SPECS = [
  {
    moduleId: "ARC053",
    expectedIds: [
      "T22-M01-A01",
      "T22-M01-A02",
      "T22-M01-A03",
      "T22-M01-A04",
      "T22-M01-A05",
      "T22-M01-A06",
    ],
  },
  {
    moduleId: "SIDE263",
    expectedIds: [
      "T22-M02-A01",
      "T22-M02-A02",
      "T22-M02-A03",
      "T22-M02-A04",
    ],
  },
  {
    moduleId: "ARC510",
    expectedIds: [
      "T22-M03-A01",
      "T22-M03-A02",
      "T22-M03-A03",
      "T22-M03-A04",
      "T22-M03-A05",
      "T22-M03-A06",
      "T22-M03-A07",
      "T22-M03-A08",
    ],
  },
  {
    moduleId: "ARC511",
    expectedIds: [
      "T22-M04-A01",
      "T22-M04-A02",
      "T22-M04-A03",
      "T22-M04-A04",
      "T22-M04-A05",
    ],
  },
  {
    moduleId: "SIDE276",
    expectedIds: [
      "T22-M05-A01",
      "T22-M05-A02",
      "T22-M05-A03",
      "T22-M05-A04",
      "T22-M05-A05",
      "T22-M05-A06",
      "T22-M05-A07",
      "T22-M05-A08",
    ],
  },
  {
    moduleId: "SIDE278",
    expectedIds: [
      "T22-M06-A01",
      "T22-M06-A02",
      "T22-M06-A03",
      "T22-M06-A04",
    ],
  },
  {
    moduleId: "SIDE279",
    expectedIds: [
      "T22-M07-A01",
      "T22-M07-A02",
      "T22-M07-A03",
      "T22-M07-A04",
      "T22-M07-A05",
      "T22-M07-A06",
      "T22-M07-A07",
    ],
  },
  {
    moduleId: "SIDE280",
    expectedIds: [
      "T22-M08-A01",
      "T22-M08-A02",
      "T22-M08-A03",
      "T22-M08-A04",
      "T22-M08-A05",
      "T22-M08-A06",
      "T22-M08-A07",
      "T22-M08-A08",
      "T22-M08-A09",
    ],
  },
  {
    moduleId: "SIDE267",
    expectedIds: [
      "T22-M09-A01",
      "T22-M09-A02",
      "T22-M09-A03",
      "T22-M09-A04",
      "T22-M09-A05",
    ],
  },
  {
    moduleId: "SIDE271",
    expectedIds: [
      "T22-M10-A01",
      "T22-M10-A02",
      "T22-M10-A03",
      "T22-M10-A04",
      "T22-M10-A05",
      "T22-M10-A06",
      "T22-M10-A07",
    ],
  },
  {
    moduleId: "ARC711",
    expectedIds: [
      "T22-M11-A01",
      "T22-M11-A02",
      "T22-M11-A03",
      "T22-M11-A04",
      "T22-M11-A05",
      "T22-M11-A06",
      "T22-M11-A07",
      "T22-M11-A08",
    ],
  },
  {
    moduleId: "ARC512",
    expectedIds: [
      "T22-M12-A01",
      "T22-M12-A02",
      "T22-M12-A03",
      "T22-M12-A04",
      "T22-M12-A05",
      "T22-M12-A06",
      "T22-M12-A07",
      "T22-M12-A08",
    ],
  },
  {
    moduleId: "ARC515",
    expectedIds: [
      "T22-M13-A01",
      "T22-M13-A02",
      "T22-M13-A03",
      "T22-M13-A04",
      "T22-M13-A05",
      "T22-M13-A06",
      "T22-M13-A07",
      "T22-M13-A08",
      "T22-M13-A09",
      "T22-M13-A10",
      "T22-M13-A11",
    ],
  },
  {
    moduleId: "ARC717",
    expectedIds: [
      "T22-M14-A01",
      "T22-M14-A02",
      "T22-M14-A03",
      "T22-M14-A04",
      "T22-M14-A05",
      "T22-M14-A06",
      "T22-M14-A07",
      "T22-M14-A08",
      "T22-M14-A09",
      "T22-M14-A10",
    ],
  },
];

expect(
  JSON.stringify(T22_ORDER.slice(0, MODULE_SPECS.length)) === JSON.stringify(MODULE_SPECS.map((spec) => spec.moduleId)),
  `Rich syllabus modules must form the exact T22 prefix; found ${JSON.stringify(MODULE_SPECS.map((spec) => spec.moduleId))} against route prefix ${JSON.stringify(T22_ORDER.slice(0, MODULE_SPECS.length))}.`,
);

for (const spec of MODULE_SPECS) {
  const { moduleId, expectedIds } = spec;
  const baseArcs = T22_ATOMIC_MODULES[moduleId] || [];
  const richModule = getT22RichModule(moduleId);

  expect(Boolean(richModule), `${moduleId} must have a rich syllabus contract.`);
  expect(richModule?.moduleId === moduleId, `${moduleId} rich syllabus moduleId mismatch: ${richModule?.moduleId}.`);
  expect(richModule?.syllabusVersion === "3.0", `${moduleId} should expose syllabusVersion=3.0; found ${richModule?.syllabusVersion}.`);
  expect(baseArcs.length === expectedIds.length, `${moduleId} should retain ${expectedIds.length} stable atomic arcs; found ${baseArcs.length}.`);
  expect(Object.keys(richModule?.arcs || {}).length === expectedIds.length, `${moduleId} rich syllabus should cover all ${expectedIds.length} atomic arcs.`);
  expect(Boolean(richModule?.roleTarget), `${moduleId} rich syllabus is missing roleTarget.`);
  expect(Boolean(richModule?.modulePurpose), `${moduleId} rich syllabus is missing modulePurpose.`);
  expect(Boolean(richModule?.moduleDestination), `${moduleId} rich syllabus is missing moduleDestination.`);
  expect(Array.isArray(richModule?.entryPrerequisites) && richModule.entryPrerequisites.length > 0, `${moduleId} needs module entry prerequisites.`);
  expect(Array.isArray(richModule?.explicitlyOutOfScope) && richModule.explicitlyOutOfScope.length > 0, `${moduleId} needs a module scope boundary.`);

  expect(
    JSON.stringify(baseArcs.map((arc) => arc.id)) === JSON.stringify(expectedIds),
    `${moduleId} stable IDs drifted: ${JSON.stringify(baseArcs.map((arc) => arc.id))}.`,
  );

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
}

if (errors.length) {
  console.error(`T22 rich syllabus validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const totalCards = MODULE_SPECS.reduce(
  (total, spec) => total + (T22_ATOMIC_MODULES[spec.moduleId]?.length || 0),
  0,
);
console.log(
  `T22 rich syllabus v${T22_RICH_SYLLABUS_VERSION} OK: ${MODULE_SPECS.length} modules expose ${totalCards} stable quant-research mission cards; exact route prefix and audit-v2 IDs/titles/progress semantics preserved.`,
);
