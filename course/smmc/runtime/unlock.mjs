import { SMMC_REQUIREMENTS_V1 } from "../requirements-v1.mjs";

export function unlockStatus(problem, {
  clearedT25Targets = [],
  certifiedUnits = [],
  requirements = SMMC_REQUIREMENTS_V1,
} = {}) {
  const clearedTargets = new Set(clearedT25Targets);
  const certified = new Set(certifiedUnits);

  const missingT25 = problem.t25Targets.filter(code => !clearedTargets.has(code));
  if (missingT25.length) {
    return {
      status: "locked-t25",
      ready: false,
      missingT25,
      missingUnits: [],
    };
  }

  if (problem.overlap === "green") {
    return {
      status: "ready-transfer",
      ready: true,
      missingT25: [],
      missingUnits: [],
    };
  }

  const required = requirements[problem.id];
  if (!required || required.length === 0) {
    return {
      status: "requirement-map-pending",
      ready: false,
      missingT25: [],
      missingUnits: [],
    };
  }

  const missingUnits = required.filter(id => !certified.has(id));
  if (missingUnits.length) {
    return {
      status: problem.overlap === "red" ? "locked-specialist" : "locked-smmc-bridge",
      ready: false,
      missingT25: [],
      missingUnits,
    };
  }

  return {
    status: problem.overlap === "red" ? "ready-development" : "ready-transfer",
    ready: true,
    missingT25: [],
    missingUnits: [],
  };
}

export function canOpenAsTransfer(problem, context, exposureInfo) {
  const unlock = unlockStatus(problem, context);
  if (!unlock.ready || unlock.status === "ready-development") {
    return { allowed: false, unlock, reason: unlock.status };
  }
  if (!exposureInfo?.transferEligible) {
    return { allowed: false, unlock, reason: "exposure-contaminated" };
  }
  return { allowed: true, unlock, reason: "ready" };
}

export function canOpenAsSealedPaper(problem, context, exposureInfo) {
  const unlock = unlockStatus(problem, context);
  if (!unlock.ready || unlock.status === "ready-development") {
    return { allowed: false, unlock, reason: unlock.status };
  }
  if (!exposureInfo?.sealedPaperEligible) {
    return { allowed: false, unlock, reason: "not-sealed" };
  }
  return { allowed: true, unlock, reason: "ready" };
}
