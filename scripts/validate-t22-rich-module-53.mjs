import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
const { T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES, T22_ATOMIC_COUNT } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC715";
const expectedIds = Array.from({ length: 13 }, (_, i) => `T22-M53-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "Missingness Mechanisms in Financial Data",
  "Stale Observations",
  "Forward Fill, Interpolation & Fabricated Information",
  "Bad Ticks & Outliers",
  "Duplicates, Gaps & Corrupted Records",
  "Corporate Actions & Price Adjustments",
  "Identifiers, Symbol Changes & Mapping Errors",
  "Delistings & Survivorship Bias",
  "Universe Construction & Selection Bias",
  "Look-Ahead Leakage & Data Revisions",
  "Vendor Discrepancies",
  "Data Quality Rules, Audit Trails & Bias Tests",
  "Dirty Financial Data Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M53 validation.");
expect(T22_ORDER.length === 58, `T22 route must remain exactly 58 modules; found ${T22_ORDER.length}.`);
expect(T22_ATOMIC_COUNT === 596, `T22 route must remain exactly 596 Atomic ARCs; found ${T22_ATOMIC_COUNT}.`);
expect(!T22_ORDER.some((id) => ["ARC735", "ARC736", "ARC737", "ARC738"].includes(id)), "Deleted ARC735-ARC738 must not re-enter T22_ORDER.");
expect(T22_ORDER[52] === moduleId && T22_ORDER[51] === "ARC714" && T22_ORDER[53] === "ARC553", "M53 must remain ARC715 between ARC714 and ARC553 in T22_ORDER.");
expect(JSON.stringify(T22_PREREQS[moduleId]) === JSON.stringify(["ARC714", "ARC509"]), "M53 route prerequisites drifted.");

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

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC714")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC509")), "M53 must build on both route prerequisites.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC714")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC560")), "M53 must preserve temporal-alignment and downstream backtest ownership boundaries.");
expect(richModule?.arcs?.["T22-M53-A01"]?.requiredMastery?.some((x) => x.includes("structural missingness")), "M53 A01 must distinguish structural missingness.");
expect(richModule?.arcs?.["T22-M53-A02"]?.requiredMastery?.some((x) => x.includes("observation age")), "M53 A02 must operationalize staleness.");
expect(richModule?.arcs?.["T22-M53-A03"]?.requiredMastery?.some((x) => x.includes("future information")), "M53 A03 must expose interpolation look-ahead.");
expect(richModule?.arcs?.["T22-M53-A04"]?.requiredMastery?.some((x) => x.includes("sensitivity")), "M53 A04 must require sensitivity to disputed outliers.");
expect(richModule?.arcs?.["T22-M53-A06"]?.requiredMastery?.some((x) => x.includes("split factors")) && richModule?.arcs?.["T22-M53-A06"]?.requiredMastery?.some((x) => x.includes("total-return")), "M53 A06 must operationalize corporate-action adjustment semantics.");
expect(richModule?.arcs?.["T22-M53-A07"]?.requiredMastery?.some((x) => x.includes("valid-from/valid-to")), "M53 A07 must require time-bounded identifier mappings.");
expect(richModule?.arcs?.["T22-M53-A08"]?.requiredMastery?.some((x) => x.includes("survivorship")), "M53 A08 must expose survivor-only bias.");
expect(richModule?.arcs?.["T22-M53-A09"]?.requiredMastery?.some((x) => x.includes("point-in-time membership")), "M53 A09 must enforce point-in-time universes.");
expect(richModule?.arcs?.["T22-M53-A10"]?.requiredMastery?.some((x) => x.includes("vintage")) && richModule?.arcs?.["T22-M53-A10"]?.requiredMastery?.some((x) => x.includes("decision time")), "M53 A10 must enforce data-vintage causality.");
expect(richModule?.arcs?.["T22-M53-A11"]?.requiredMastery?.some((x) => x.includes("definitions")), "M53 A11 must distinguish vendor-definition differences from errors.");
expect(richModule?.arcs?.["T22-M53-A12"]?.requiredMastery?.some((x) => x.includes("reason codes")) && richModule?.arcs?.["T22-M53-A12"]?.requiredMastery?.some((x) => x.includes("survivor")), "M53 A12 must make cleaning and bias tests auditable.");
expect(richModule?.arcs?.["T22-M53-A13"]?.requiredMastery?.some((x) => x.includes("false signal")) && richModule?.arcs?.["T22-M53-A13"]?.nextArcBoundary?.includes("ARC553"), "M53 lab must adversarially test cleaning and hand off to ARC553.");

if (errors.length) {
  console.error(`T22 M53 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M53 rich syllabus OK: ${expectedIds.length} stable dirty-financial-data mission cards validated.`);
