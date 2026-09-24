// SMMC final-engine evidence contracts v1.
// Pure scaffolding only: these helpers do not auto-certify units, mutate T25 evidence,
// or write historical attempts into durable state yet.

export const SMMC_T25_READINESS_CONTRACT = Object.freeze({
  preferredSource: "canonical-t25-evidence",
  debugSource: "manual-debug",
  authoritativeKey: "stable T25 target codes",
  manualEntryPolicy: "Keep manual target entry only as a debugging/admin override once canonical ingestion exists."
});

export function normalizeT25ReadinessSnapshot(value = {}) {
  const source = value.source === "canonical-t25-evidence" ? value.source :
    value.source === "manual-debug" ? value.source : null;
  if (!source) throw new Error("Unknown SMMC T25 readiness source");
  if (!Array.isArray(value.clearedTargetCodes)) throw new Error("T25 readiness must supply clearedTargetCodes");
  const codes = [...new Set(value.clearedTargetCodes)];
  if (codes.some(code => typeof code !== "string" || !code.trim())) {
    throw new Error("Invalid T25 target code in readiness snapshot");
  }
  return Object.freeze({
    source,
    clearedTargetCodes: Object.freeze(codes),
    capturedAt: typeof value.capturedAt === "string" ? value.capturedAt : null
  });
}

export const SMMC_CERTIFICATION_POLICY = Object.freeze({
  selfReportCertifies: false,
  requiredNeutralRoles: Object.freeze(["main", "transfer"]),
  separateReviewDecisionRequired: true,
  automaticCertificationFromTwoSavedAttempts: false,
  principle: "Saved work creates reviewable evidence; certification is an explicit academic decision."
});

export function unitCertificationEvidence(unit, studyState, historicalState) {
  if (!unit) throw new Error("Missing SMMC unit");
  const attempts = Array.isArray(studyState?.attempts) ? studyState.attempts : [];
  const main = attempts.filter(a => a.taskId === unit.mainTaskId);
  const transfer = attempts.filter(a => a.taskId === unit.transferTaskId);
  const certifiedAt = historicalState?.units?.[unit.id]?.certifiedAt || null;
  const selfReported = Boolean(historicalState?.units?.[unit.id]?.selfReportedComplete);
  const missingRoles = [];
  if (!main.length) missingRoles.push("main");
  if (!transfer.length) missingRoles.push("transfer");
  return Object.freeze({
    unitId: unit.id,
    selfReported,
    certifiedAt,
    certified: Boolean(certifiedAt),
    mainAttempts: main.length,
    transferAttempts: transfer.length,
    missingRoles: Object.freeze(missingRoles),
    status: certifiedAt ? "certified" : missingRoles.length ? "needs-attempts" : "review-required",
    certifiableAutomatically: false
  });
}

export const SMMC_XFER_CONTRACT = Object.freeze({
  scoreMin: 0,
  scoreMax: 7,
  lifecycle: Object.freeze(["sealed", "in-progress", "submitted", "reviewed"]),
  durableFields: Object.freeze([
    "problemId",
    "startedAt",
    "submittedAt",
    "answer",
    "minutes",
    "assistance",
    "exposureSnapshot",
    "score",
    "reviewNote"
  ]),
  firstUnseenPrinciple: "First-unseen evidence must remain distinguishable from later reattempts.",
  storageWiring: "pending historical-state v2"
});

export function isSmmcScore(value) {
  return Number.isInteger(value) &&
    value >= SMMC_XFER_CONTRACT.scoreMin &&
    value <= SMMC_XFER_CONTRACT.scoreMax;
}

export function createHistoricalAttemptScaffold({
  problemId,
  startedAt,
  timeLimitMinutes = 180
} = {}) {
  if (typeof problemId !== "string" || !problemId) throw new Error("Missing SMMC problemId");
  if (typeof startedAt !== "string" || !Number.isFinite(Date.parse(startedAt))) {
    throw new Error("Invalid SMMC attempt start time");
  }
  if (!Number.isFinite(timeLimitMinutes) || timeLimitMinutes <= 0) {
    throw new Error("Invalid SMMC attempt time limit");
  }
  return {
    version: 1,
    problemId,
    lifecycle: "in-progress",
    startedAt,
    timeLimitMinutes,
    submittedAt: null,
    answer: "",
    minutes: null,
    assistance: "independent",
    exposureSnapshot: null,
    score: null,
    reviewNote: ""
  };
}
