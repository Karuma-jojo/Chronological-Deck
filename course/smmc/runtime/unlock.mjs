import { SMMC_REQUIREMENTS_V1 } from "../requirements-v1.mjs";

export function unlockStatus(problem, {
  clearedT25Targets = [],
  certifiedModules = [],
  requirements = SMMC_REQUIREMENTS_V1,
} = {}) {
  const clearedTargets = new Set(clearedT25Targets);
  const certified = new Set(certifiedModules);

  const missingT25 = problem.t25Targets.filter(code => !clearedTargets.has(code));
  if (missingT25.length) {
    return {
      status: "locked-t25",
      ready: false,
      missingT25,
      missingModules: [],
    };
  }

  if (problem.overlap === "green") {
    return {
      status: "ready-transfer",
      ready: true,
      missingT25: [],
      missingModules: [],
    };
  }

  const required = requirements[problem.id];
  if (!required || required.length === 0) {
    return {
      status: "requirement-map-pending",
      ready: false,
      missingT25: [],
      missingModules: [],
    };
  }

  const missingModules = required.filter(id => !certified.has(id));
  if (missingModules.length) {
    return {
      status: problem.overlap === "red" ? "locked-specialist" : "locked-smmc-bridge",
      ready: false,
      missingT25: [],
      missingModules,
    };
  }

  return {
    status: problem.overlap === "red" ? "ready-development" : "ready-transfer",
    ready: true,
    missingT25: [],
    missingModules: [],
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
