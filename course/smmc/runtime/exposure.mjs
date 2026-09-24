// SMMC learner evidence/exposure state.
// Isolated from canonical T25 evidence. This file does not grant T25 clearance.

export const SMMC_STATE_VERSION = 1;

export const emptySmmcState = () => ({
  version: SMMC_STATE_VERSION,
  attempts: [],
  exposures: {},
  modules: {},
  units: {},
});

const stamp = value =>
  typeof value === "string" &&
  /^\d{4}-\d\d-\d\dT/.test(value) &&
  Number.isFinite(Date.parse(value));

const assistanceLevels = new Set([
  "independent",
  "neutral-tool",
  "hint",
  "guided",
  "revealed",
]);

const results = new Set([
  "unreviewed",
  "partial",
  "secure",
  "incorrect",
]);

export function validateSmmcState(value, ledger, knownModuleIds = [], knownUnitIds = []) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid SMMC state");
  }
  if (value.version !== SMMC_STATE_VERSION) {
    throw new Error("Unsupported SMMC state version");
  }
  if (!Array.isArray(value.attempts) || value.attempts.length > 10000) {
    throw new Error("Invalid SMMC attempts");
  }
  if (!value.exposures || typeof value.exposures !== "object" || Array.isArray(value.exposures)) {
    throw new Error("Invalid SMMC exposures");
  }
  if (!value.modules || typeof value.modules !== "object" || Array.isArray(value.modules)) {
    throw new Error("Invalid SMMC module state");
  }
  if (!value.units || typeof value.units !== "object" || Array.isArray(value.units)) {
    throw new Error("Invalid SMMC unit state");
  }

  const problemIds = new Set(ledger.map(x => x.id));
  const moduleIds = new Set(knownModuleIds);
  const unitIds = new Set(knownUnitIds);
  const seenAttempts = new Set();
  const out = emptySmmcState();

  for (const attempt of value.attempts) {
    if (
      !attempt ||
      typeof attempt !== "object" ||
      typeof attempt.id !== "string" ||
      attempt.id.length > 120 ||
      seenAttempts.has(attempt.id) ||
      !problemIds.has(attempt.problemId) ||
      !stamp(attempt.at) ||
      typeof attempt.answer !== "string" ||
      attempt.answer.length > 100000 ||
      !assistanceLevels.has(attempt.assistance) ||
      !results.has(attempt.result) ||
      !Number.isFinite(attempt.minutes) ||
      attempt.minutes < 0 ||
      attempt.minutes > 100000 ||
      typeof attempt.statementSeenBefore !== "boolean" ||
      typeof attempt.domainMetadataSeenBefore !== "boolean" ||
      typeof attempt.materialHintSeenBefore !== "boolean" ||
      typeof attempt.evaluatorSeenBefore !== "boolean" ||
      typeof attempt.solutionSeenBefore !== "boolean"
    ) {
      throw new Error("Invalid or duplicate SMMC attempt");
    }
    seenAttempts.add(attempt.id);
    out.attempts.push({
      id: attempt.id,
      problemId: attempt.problemId,
      at: attempt.at,
      answer: attempt.answer,
      assistance: attempt.assistance,
      result: attempt.result,
      minutes: attempt.minutes,
      statementSeenBefore: attempt.statementSeenBefore,
      domainMetadataSeenBefore: attempt.domainMetadataSeenBefore,
      materialHintSeenBefore: attempt.materialHintSeenBefore,
      evaluatorSeenBefore: attempt.evaluatorSeenBefore,
      solutionSeenBefore: attempt.solutionSeenBefore,
    });
  }

  for (const [problemId, exposure] of Object.entries(value.exposures)) {
    if (!problemIds.has(problemId) || !exposure || typeof exposure !== "object") {
      throw new Error("Invalid SMMC exposure");
    }
    const safe = {};
    for (const key of [
      "statementSeenAt",
      "materialHintSeenAt",
      "solutionSeenAt",
      "evaluatorSeenAt",
      "domainMetadataSeenAt",
    ]) {
      if (exposure[key] !== undefined) {
        if (!stamp(exposure[key])) throw new Error("Invalid SMMC exposure timestamp");
        safe[key] = exposure[key];
      }
    }
    out.exposures[problemId] = safe;
  }

  for (const [moduleId, moduleState] of Object.entries(value.modules)) {
    if (!moduleIds.has(moduleId)) throw new Error(`Unknown SMMC module ${moduleId}`);
    if (!moduleState || typeof moduleState !== "object") throw new Error("Invalid SMMC module state");
    const safe = { selfReportedComplete: Boolean(moduleState.selfReportedComplete) };
    if (moduleState.selfReportedAt !== undefined) {
      if (!stamp(moduleState.selfReportedAt)) throw new Error("Invalid module self-report timestamp");
      safe.selfReportedAt = moduleState.selfReportedAt;
    }
    out.modules[moduleId] = safe;
  }

  for (const [unitId, unitState] of Object.entries(value.units)) {
    if (!unitIds.has(unitId)) throw new Error(`Unknown SMMC unit ${unitId}`);
    if (!unitState || typeof unitState !== "object") throw new Error("Invalid SMMC unit state");
    const safe = { selfReportedComplete: Boolean(unitState.selfReportedComplete) };
    if (unitState.selfReportedAt !== undefined) {
      if (!stamp(unitState.selfReportedAt)) throw new Error("Invalid unit self-report timestamp");
      safe.selfReportedAt = unitState.selfReportedAt;
    }
    if (unitState.certifiedAt !== undefined) {
      if (!stamp(unitState.certifiedAt)) throw new Error("Invalid unit certification timestamp");
      safe.certifiedAt = unitState.certifiedAt;
    }
    out.units[unitId] = safe;
  }

  return out;
}


function earliest(a,b) {
  return [a,b].filter(Boolean).sort()[0];
}

export function mergeSmmcState(local, remote, ledger, knownModuleIds = [], knownUnitIds = []) {
  const a = validateSmmcState(local, ledger, knownModuleIds, knownUnitIds);
  const b = remote
    ? validateSmmcState(remote, ledger, knownModuleIds, knownUnitIds)
    : emptySmmcState();

  const attempts = new Map(a.attempts.map(x => [x.id,x]));
  for (const x of b.attempts) {
    const old = attempts.get(x.id);
    if (old && JSON.stringify(old) !== JSON.stringify(x)) {
      throw new Error("Conflicting SMMC historical attempt ID");
    }
    attempts.set(x.id,x);
  }

  const exposures = {};
  for (const problemId of new Set([...Object.keys(a.exposures),...Object.keys(b.exposures)])) {
    const x=a.exposures[problemId]||{}, y=b.exposures[problemId]||{}, joined={};
    for (const key of ["statementSeenAt","materialHintSeenAt","solutionSeenAt","evaluatorSeenAt","domainMetadataSeenAt"]) {
      const value=earliest(x[key],y[key]);
      if(value)joined[key]=value;
    }
    exposures[problemId]=joined;
  }

  const modules = {};
  for (const id of new Set([...Object.keys(a.modules),...Object.keys(b.modules)])) {
    const x=a.modules[id]||{}, y=b.modules[id]||{};
    modules[id]={
      selfReportedComplete:Boolean(x.selfReportedComplete||y.selfReportedComplete),
      ...(earliest(x.selfReportedAt,y.selfReportedAt)?{selfReportedAt:earliest(x.selfReportedAt,y.selfReportedAt)}:{}),
    };
  }

  const units = {};
  for (const id of new Set([...Object.keys(a.units),...Object.keys(b.units)])) {
    const x=a.units[id]||{}, y=b.units[id]||{};
    units[id]={
      selfReportedComplete:Boolean(x.selfReportedComplete||y.selfReportedComplete),
      ...(earliest(x.selfReportedAt,y.selfReportedAt)?{selfReportedAt:earliest(x.selfReportedAt,y.selfReportedAt)}:{}),
      ...(earliest(x.certifiedAt,y.certifiedAt)?{certifiedAt:earliest(x.certifiedAt,y.certifiedAt)}:{}),
    };
  }

  return validateSmmcState({
    version:SMMC_STATE_VERSION,
    attempts:[...attempts.values()].sort((x,y)=>x.at.localeCompare(y.at)),
    exposures,
    modules,
    units,
  }, ledger, knownModuleIds, knownUnitIds);
}

export function markExposure(state, problemId, kind, at = new Date().toISOString()) {
  const allowed = new Set([
    "statementSeenAt",
    "materialHintSeenAt",
    "solutionSeenAt",
    "evaluatorSeenAt",
    "domainMetadataSeenAt",
  ]);
  if (!allowed.has(kind)) throw new Error(`Unknown exposure kind ${kind}`);
  state.exposures[problemId] ??= {};
  state.exposures[problemId][kind] ??= at;
  return state.exposures[problemId];
}

export function exposureClass(state, problemId) {
  const e = state.exposures[problemId] || {};
  const contaminationReason =
    e.solutionSeenAt ? "solution-seen" :
    e.evaluatorSeenAt ? "evaluator-seen" :
    e.materialHintSeenAt ? "material-hint-seen" :
    null;
  if (contaminationReason) {
    return {
      class: "development",
      sealedPaperEligible: false,
      transferEligible: false,
      reason: contaminationReason,
    };
  }
  if (e.statementSeenAt) {
    return {
      class: "transfer",
      sealedPaperEligible: false,
      transferEligible: true,
      reason: "statement-seen-only",
    };
  }
  return {
    class: "sealed",
    sealedPaperEligible: true,
    transferEligible: true,
    reason: "unexposed",
  };
}

export function selfReportModuleComplete(state, moduleId, at = new Date().toISOString()) {
  state.modules[moduleId] = {
    ...state.modules[moduleId],
    selfReportedComplete: true,
    selfReportedAt: state.modules[moduleId]?.selfReportedAt || at,
  };
  return state.modules[moduleId];
}

export function selfReportUnitComplete(state, unitId, at = new Date().toISOString()) {
  state.units[unitId] = {
    ...state.units[unitId],
    selfReportedComplete: true,
    selfReportedAt: state.units[unitId]?.selfReportedAt || at,
  };
  return state.units[unitId];
}

export function certifyUnit(state, unitId, at = new Date().toISOString()) {
  state.units[unitId] = {
    ...state.units[unitId],
    certifiedAt: state.units[unitId]?.certifiedAt || at,
  };
  return state.units[unitId];
}

export function certifiedUnitIds(state) {
  return Object.entries(state.units)
    .filter(([, value]) => Boolean(value?.certifiedAt))
    .map(([unitId]) => unitId);
}
