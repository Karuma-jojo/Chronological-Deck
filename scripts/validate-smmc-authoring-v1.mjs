import { FOUNDATION_MODULE, FOUNDATION_UNITS } from '../course/smmc/authoring/foundation-ladder.mjs';
import ledger from "../course/smmc/ledger.mjs";
import {
  SMMC_CONTENT_MODULES,
  SMMC_METHOD_MODULES,
} from "../course/smmc/curriculum-v1.mjs";
import { SMMC_REQUIREMENTS_V1 } from "../course/smmc/requirements-v1.mjs";
import { SMMC_UNITS_V1 } from "../course/smmc/authoring/units-v1.mjs";
import { SMMC_PUBLIC_PROBLEMS_V1 } from "../course/smmc/authoring/public-problems-v1.mjs";
import { SMMC_EVALUATOR_V1 } from "../course/smmc/authoring/evaluator-v1.mjs";
import {
  emptySmmcState,
  markExposure,
  exposureClass,
  markPaperExposure,
  paperExposureClass,
  paperKeyForProblem,
  paperKeysForLedger,
  pristinePaperKeys,
  mergeSmmcState,
  validateSmmcState,
} from "../course/smmc/runtime/exposure.mjs";
import { unlockStatus } from "../course/smmc/runtime/unlock.mjs";
import { officialPaperUrl } from "../course/smmc/sources-v1.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const problemIds = new Set(ledger.map(x => x.id));
const moduleIds = new Set([
  FOUNDATION_MODULE.id,
  ...SMMC_CONTENT_MODULES.map(x => x.id),
  ...SMMC_METHOD_MODULES.map(x => x.id),
]);
const unitIds = new Set(SMMC_UNITS_V1.map(x => x.id));

for (const problem of ledger) {
  const paper = officialPaperUrl(problem);
  expect(typeof paper === "string" && paper.startsWith("https://www.simonmarais.org/"), `Missing official paper URL for ${problem.id}`);
  expect(paper.endsWith("#page=2"), `Official paper should open on problem page for ${problem.id}`);
}

expect(unitIds.size === SMMC_UNITS_V1.length, "Duplicate SMMC unit ID.");
expect(Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length === 28, "Expected twenty-eight authored public problems.");
expect(Object.keys(SMMC_EVALUATOR_V1).length === 28, "Expected twenty-eight authored evaluator references.");

for (const unit of SMMC_UNITS_V1) {
  expect(moduleIds.has(unit.moduleId), `Unknown module for ${unit.id}`);
  expect(["method", "bridge", "foundation"].includes(unit.kind), `Bad unit kind for ${unit.id}`);
  expect(Array.isArray(unit.t25Targets), `Missing T25 prerequisites for ${unit.id}`);
  expect(typeof unit.learningNote === "string" && unit.learningNote.length > 120, `Weak learning note for ${unit.id}`);
  expect(SMMC_PUBLIC_PROBLEMS_V1[unit.mainTaskId], `Missing main problem for ${unit.id}`);
  expect(SMMC_PUBLIC_PROBLEMS_V1[unit.transferTaskId], `Missing transfer problem for ${unit.id}`);
  expect(SMMC_EVALUATOR_V1[unit.mainTaskId], `Missing main evaluator for ${unit.id}`);
  expect(SMMC_EVALUATOR_V1[unit.transferTaskId], `Missing transfer evaluator for ${unit.id}`);
}

for (const [id, problem] of Object.entries(SMMC_PUBLIC_PROBLEMS_V1)) {
  expect(problem.id === id, `Public problem key/id mismatch for ${id}`);
  expect(unitIds.has(problem.unitId), `Unknown unit for public problem ${id}`);
  expect(["main", "transfer"].includes(problem.role), `Bad role for ${id}`);
  expect(typeof problem.prompt === "string" && problem.prompt.length > 40, `Weak prompt for ${id}`);
  expect(!/SMMC-20\d\d-[ABC][1-4]/.test(problem.prompt), `Historical problem identifier leaked into ${id}`);
  expect(!/Simon Marais/i.test(problem.prompt), `Historical source name leaked into neutral prompt ${id}`);
}

for (const [id, ref] of Object.entries(SMMC_EVALUATOR_V1)) {
  expect(SMMC_PUBLIC_PROBLEMS_V1[id], `Evaluator has no public task: ${id}`);
  expect(typeof ref.reference === "string" && ref.reference.length > 80, `Weak evaluator reference for ${id}`);
  expect(Array.isArray(ref.rubric) && ref.rubric.length > 0, `Missing rubric for ${id}`);
}

for (const [problemId, required] of Object.entries(SMMC_REQUIREMENTS_V1)) {
  expect(problemIds.has(problemId), `Requirement map references unknown problem ${problemId}`);
  const problem = ledger.find(x => x.id === problemId);
  expect(problem.overlap !== "green", `GREEN problem ${problemId} should not require SMMC bridge completion`);
  expect(Array.isArray(required) && required.length > 0, `Empty requirement row for ${problemId}`);
  for (const unitId of required) {
    expect(unitIds.has(unitId), `Unknown authored unit ${unitId} required by ${problemId}`);
  }
}

// Exposure semantics.
const state = emptySmmcState();
const eastPaperKeys = paperKeysForLedger(ledger, { eastOnly: true });
expect(eastPaperKeys.length === 18, "Expected eighteen East A/B historical sessions.");
expect(pristinePaperKeys(state, ledger, { eastOnly: true }).length === 18, "Fresh corpus must begin with eighteen pristine East papers.");
expect(paperExposureClass(state, ledger, "2022-A").class === "pristine", "Fresh paper must be pristine.");
expect(exposureClass(state, "SMMC-2022-A1").class === "sealed", "Fresh problem must be sealed.");

markExposure(state, "SMMC-2022-A1", "domainMetadataSeenAt", "2026-09-23T12:00:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "sealed", "Planning metadata must not contaminate exposure status.");
expect(paperExposureClass(state, ledger, "2022-A").class === "pristine", "Non-hint planning metadata must not breach a paper.");

markExposure(state, "SMMC-2022-A1", "statementSeenAt", "2026-09-23T12:01:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "transfer", "Statement-only exposure should remain transfer-eligible.");
expect(exposureClass(state, "SMMC-2022-A2").class === "sealed", "Isolated statement access must not expose a sibling problem.");
expect(exposureClass(state, "SMMC-2022-B1").class === "sealed", "Isolated statement access must not spill into another paper.");
expect(paperExposureClass(state, ledger, "2022-A").class === "breached", "One isolated statement must breach, not open, its paper.");
expect(pristinePaperKeys(state, ledger, { eastOnly: true }).length === 17, "One breached East paper must leave seventeen pristine sessions.");

markExposure(state, "SMMC-2022-A1", "materialHintSeenAt", "2026-09-23T12:05:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "development", "Material hint must contaminate unseen transfer.");

const wholePaper = emptySmmcState();
markPaperExposure(wholePaper, ledger, "2022-A", "paperOpenedAt", "2026-09-23T13:00:00.000Z");
expect(paperExposureClass(wholePaper, ledger, "2022-A").class === "opened", "Opening a full paper must persist an opened paper state.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(Boolean(wholePaper.exposures[problem.id]?.statementSeenAt), `Full-paper opening failed to mark ${problem.id} statement seen.`);
}
expect(exposureClass(wholePaper, "SMMC-2022-B1").class === "sealed", "Opening 2022-A must not expose 2022-B.");
expect(pristinePaperKeys(wholePaper, ledger, { eastOnly: true }).length === 17, "One opened East paper must leave seventeen pristine sessions.");

markPaperExposure(wholePaper, ledger, "2022-A", "solutionOpenedAt", "2026-09-23T13:05:00.000Z");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(exposureClass(wholePaper, problem.id).class === "development", `Full-solution exposure failed for ${problem.id}.`);
}

const paperProgress = emptySmmcState();
markPaperExposure(paperProgress, ledger, "2023-B", "attemptedAt", "2026-09-23T14:00:00.000Z");
expect(paperExposureClass(paperProgress, ledger, "2023-B").class === "attempted", "Paper attempt must outrank opened state.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2023-B")) {
  expect(Boolean(paperProgress.exposures[problem.id]?.statementSeenAt), `Paper attempt failed to mark ${problem.id} statement seen.`);
}
markPaperExposure(paperProgress, ledger, "2023-B", "arenaConsumedAt", "2026-09-23T14:05:00.000Z");
expect(paperExposureClass(paperProgress, ledger, "2023-B").class === "arena-consumed", "Arena use must be the terminal paper vault state.");

// F02: validator/merge normalization must repair semantically impossible imported/cloud states.
const openedOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {
    "SMMC-2021-A1": { statementSeenAt: "2026-09-20T09:00:00.000Z" },
  },
  papers: {
    "2021-A": { paperOpenedAt: "2026-09-20T10:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2021-A")) {
  expect(Boolean(openedOnly.exposures[problem.id]?.statementSeenAt), `paperOpenedAt did not imply statement exposure for ${problem.id}`);
}
expect(
  openedOnly.exposures["SMMC-2021-A1"].statementSeenAt === "2026-09-20T09:00:00.000Z",
  "Normalization failed to preserve an earlier existing statement timestamp."
);

const solutionOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2021-B": { solutionOpenedAt: "2026-09-20T11:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  solutionOnly.papers["2021-B"].paperOpenedAt === "2026-09-20T11:00:00.000Z",
  "solutionOpenedAt must imply paperOpenedAt."
);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2021-B")) {
  expect(solutionOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T11:00:00.000Z", `solution paper did not imply statement exposure for ${problem.id}`);
  expect(solutionOnly.exposures[problem.id]?.solutionSeenAt === "2026-09-20T11:00:00.000Z", `solution paper did not imply solution exposure for ${problem.id}`);
}

const attemptedOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2022-A": { attemptedAt: "2026-09-20T12:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(attemptedOnly.papers["2022-A"].paperOpenedAt === "2026-09-20T12:00:00.000Z", "attemptedAt must imply paperOpenedAt.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(attemptedOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T12:00:00.000Z", `paper attempt did not imply statement exposure for ${problem.id}`);
}

const arenaOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2022-B": { arenaConsumedAt: "2026-09-20T13:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(arenaOnly.papers["2022-B"].attemptedAt === "2026-09-20T13:00:00.000Z", "arenaConsumedAt must imply attemptedAt.");
expect(arenaOnly.papers["2022-B"].paperOpenedAt === "2026-09-20T13:00:00.000Z", "arenaConsumedAt must imply paperOpenedAt.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-B")) {
  expect(arenaOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T13:00:00.000Z", `arena consumption did not imply statement exposure for ${problem.id}`);
}

const historicalAttemptOnly = validateSmmcState({
  version: 1,
  attempts: [{
    id: "normalization-attempt-1",
    problemId: "SMMC-2023-A2",
    at: "2026-09-20T14:00:00.000Z",
    answer: "Historical attempt evidence.",
    assistance: "independent",
    result: "unreviewed",
    minutes: 20,
    statementSeenBefore: false,
    domainMetadataSeenBefore: false,
    materialHintSeenBefore: false,
    evaluatorSeenBefore: false,
    solutionSeenBefore: false,
  }],
  exposures: {},
  papers: {},
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  historicalAttemptOnly.exposures["SMMC-2023-A2"].statementSeenAt === "2026-09-20T14:00:00.000Z",
  "Historical attempt evidence must imply that problem statement was seen by attempt time."
);

const individualSolutionOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {
    "SMMC-2024-A1": { solutionSeenAt: "2026-09-20T15:00:00.000Z" },
  },
  papers: {},
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  individualSolutionOnly.exposures["SMMC-2024-A1"].statementSeenAt === "2026-09-20T15:00:00.000Z",
  "Individual solution exposure must imply statement exposure."
);

// Merge must normalize malformed remote evidence before joining it with local state.
const normalizedRemoteMerge = mergeSmmcState(
  emptySmmcState(),
  {
    version: 1,
    attempts: [],
    exposures: {},
    papers: { "2024-B": { paperOpenedAt: "2026-09-20T16:00:00.000Z" } },
    modules: {},
    units: {},
  },
  ledger,
  [...moduleIds],
  [...unitIds]
);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2024-B")) {
  expect(Boolean(normalizedRemoteMerge.exposures[problem.id]?.statementSeenAt), `Merged remote paper-open evidence did not normalize ${problem.id}`);
}

const legacyShape = JSON.parse(JSON.stringify(wholePaper));
delete legacyShape.papers;
const legacyValidated = validateSmmcState(legacyShape, ledger, [...moduleIds], [...unitIds]);
expect(Object.keys(legacyValidated.papers).length === 0, "Legacy v1 state without paper ledger must remain import-compatible.");

const remotePaper = emptySmmcState();
markPaperExposure(remotePaper, ledger, "2022-A", "paperOpenedAt", "2026-09-23T12:55:00.000Z");
const mergedPaper = mergeSmmcState(wholePaper, remotePaper, ledger, [...moduleIds], [...unitIds]);
expect(mergedPaper.papers["2022-A"].paperOpenedAt === "2026-09-23T12:55:00.000Z", "Cloud merge must preserve earliest paper exposure.");
validateSmmcState(state, ledger, [...moduleIds], [...unitIds]);
validateSmmcState(wholePaper, ledger, [...moduleIds], [...unitIds]);

// Unlock semantics.
const green = ledger.find(x => x.id === "SMMC-2022-A1");
const greenMissing = unlockStatus(green, { clearedT25Targets: [] });
expect(greenMissing.status === "locked-t25", "GREEN problem should remain locked before T25 prerequisites.");
const greenReady = unlockStatus(green, { clearedT25Targets: green.t25Targets });
expect(greenReady.status === "ready-transfer" && greenReady.ready, "GREEN problem should unlock after T25 prerequisites.");

const amber = ledger.find(x => x.id === "SMMC-2021-A3");
const amberBlocked = unlockStatus(amber, { clearedT25Targets: amber.t25Targets });
expect(amberBlocked.status === "locked-smmc-bridge", "Mapped AMBER problem should require its bridge.");
const amberReady = unlockStatus(amber, {
  clearedT25Targets: amber.t25Targets,
  certifiedUnits: ["S-BRIDGE-GR1-U01"],
});
expect(amberReady.status === "ready-transfer" && amberReady.ready, "Mapped AMBER should unlock after bridge completion.");

const red = ledger.find(x => x.id === "SMMC-2025-A4");
const redReady = unlockStatus(red, {
  clearedT25Targets: red.t25Targets,
  certifiedUnits: ["S-BRIDGE-GR1-U01"],
});
expect(redReady.status === "requirement-map-pending" && !redReady.ready, "Unmapped RED problem must stay fail-closed.");

const pending = ledger.find(x => x.id === "SMMC-2019-A2");
const pendingStatus = unlockStatus(pending, { clearedT25Targets: pending.t25Targets });
expect(pendingStatus.status === "requirement-map-pending", "Unmapped non-GREEN problem must fail closed.");

console.log(
  `SMMC authoring v1 validation passed: ${SMMC_UNITS_V1.length} units, ` +
  `${Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length} neutral tasks, ` +
  `${Object.keys(SMMC_REQUIREMENTS_V1).length} explicit non-GREEN requirement rows.`
);
