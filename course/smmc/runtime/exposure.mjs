// SMMC learner evidence/exposure state.
// Isolated from canonical T25 evidence. This file does not grant T25 clearance.

export const SMMC_STATE_VERSION = 1;

export const emptySmmcState = () => ({
  version: SMMC_STATE_VERSION,
  attempts: [],
  exposures: {},
  modules: {},
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

export function validateSmmcState(value, ledger, knownModuleIds = []) {
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

  const problemIds = new Set(ledger.map(x => x.id));
  const moduleIds = new Set(knownModuleIds);
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
    const safe = { completed: Boolean(moduleState.completed) };
    if (moduleState.completedAt !== undefined) {
      if (!stamp(moduleState.completedAt)) throw new Error("Invalid module completion timestamp");
      safe.completedAt = moduleState.completedAt;
    }
    out.modules[moduleId] = safe;
  }

  return out;
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
    e.domainMetadataSeenAt ? "domain-metadata-seen" :
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

export function completeModule(state, moduleId, at = new Date().toISOString()) {
  state.modules[moduleId] = { completed: true, completedAt: at };
  return state.modules[moduleId];
}
