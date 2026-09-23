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
  validateSmmcState,
} from "../course/smmc/runtime/exposure.mjs";
import { unlockStatus } from "../course/smmc/runtime/unlock.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const problemIds = new Set(ledger.map(x => x.id));
const moduleIds = new Set([
  ...SMMC_CONTENT_MODULES.map(x => x.id),
  ...SMMC_METHOD_MODULES.map(x => x.id),
]);
const unitIds = new Set(SMMC_UNITS_V1.map(x => x.id));

expect(unitIds.size === SMMC_UNITS_V1.length, "Duplicate SMMC unit ID.");
expect(Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length === 8, "Expected eight authored public problems.");
expect(Object.keys(SMMC_EVALUATOR_V1).length === 8, "Expected eight authored evaluator references.");

for (const unit of SMMC_UNITS_V1) {
  expect(moduleIds.has(unit.moduleId), `Unknown module for ${unit.id}`);
  expect(["method", "bridge"].includes(unit.kind), `Bad unit kind for ${unit.id}`);
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
  for (const moduleId of required) {
    expect(moduleIds.has(moduleId), `Unknown module ${moduleId} required by ${problemId}`);
  }
}

// Exposure semantics.
const state = emptySmmcState();
expect(exposureClass(state, "SMMC-2022-A1").class === "sealed", "Fresh problem must be sealed.");
markExposure(state, "SMMC-2022-A1", "statementSeenAt", "2026-09-23T12:00:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "transfer", "Statement-only exposure should remain transfer-eligible.");
markExposure(state, "SMMC-2022-A1", "materialHintSeenAt", "2026-09-23T12:05:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "development", "Material hint must contaminate unseen transfer.");
validateSmmcState(state, ledger, [...moduleIds]);

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
