import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC542";
const expectedIds = [
  "T22-M36-A01", "T22-M36-A02", "T22-M36-A03", "T22-M36-A04", "T22-M36-A05", "T22-M36-A06",
  "T22-M36-A07", "T22-M36-A08", "T22-M36-A09", "T22-M36-A10", "T22-M36-A11", "T22-M36-A12",
  "T22-M36-A13", "T22-M36-A14", "T22-M36-A15", "T22-M36-A16",
];
const expectedTitles = [
  "Time-Indexed Random Variables",
  "Temporal Dependence & Lag",
  "Stationarity",
  "Autocovariance",
  "Autocorrelation",
  "White Noise",
  "Trend & Deterministic Structure",
  "Differencing & Nonstationarity",
  "Autoregressive Models",
  "Higher-Order AR Models",
  "Moving-Average Models",
  "ARMA Models",
  "ACF & PACF Identification",
  "Parameter Estimation & Model Fitting",
  "Forecasting & Forecast Uncertainty",
  "Residual Diagnostics, Regimes & Time-Series Lab",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M36 validation.");
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

expect(richModule?.arcs?.["T22-M36-A03"]?.requiredMastery?.some((item) => item.includes("finite-dimensional distributions")), "M36 A03 must distinguish strict stationarity operationally.");
expect(richModule?.arcs?.["T22-M36-A06"]?.requiredMastery?.some((item) => item.includes("iid")), "M36 A06 must distinguish white noise from iid noise.");
expect(richModule?.arcs?.["T22-M36-A09"]?.requiredMastery?.some((item) => item.includes("sigma_epsilon^2/(1-phi^2)")), "M36 A09 must derive stationary AR(1) variance.");
expect(richModule?.arcs?.["T22-M36-A10"]?.requiredMastery?.some((item) => item.includes("unit circle")), "M36 A10 must operationalize AR root stability.");
expect(richModule?.arcs?.["T22-M36-A13"]?.requiredMastery?.some((item) => item.includes("sample plots")), "M36 A13 must reject deterministic ACF/PACF chart reading.");
expect(richModule?.arcs?.["T22-M36-A14"]?.requiredMastery?.some((item) => item.includes("chronological")), "M36 A14 must preserve time-ordered model selection.");
expect(richModule?.arcs?.["T22-M36-A16"]?.nextArcBoundary?.includes("ARC543"), "M36 A16 must hand latent-state/state-space ownership to ARC543.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC525")), "M36 must preserve event-time modelling ownership in ARC525.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC714")), "M36 must preserve market-data temporal engineering ownership in ARC714.");
expect(richModule?.explicitlyOutOfScope?.some((item) => item.includes("ARC560")), "M36 must preserve terminal backtest integration ownership in ARC560.");

if (errors.length) {
  console.error(`T22 M36 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M36 rich syllabus OK: ${expectedIds.length} stable time-series mission cards validated.`);
