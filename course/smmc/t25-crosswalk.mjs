import {
  T25_MSTAT_ROUTE,
  T25_TARGET_BY_CODE,
} from "../../js/data/t25-mstat-audit-v4.js";

// Stable target codes are the authoritative SMMC -> T25 linkage.
// Route-order numbers are derived from the live audited T25 manifest so an
// ordinary T25 reorder cannot silently stale the SMMC crosswalk.
export function validateT25Targets(targetCodes) {
  if (!Array.isArray(targetCodes) || targetCodes.length === 0) return false;
  return targetCodes.every(code => T25_TARGET_BY_CODE.has(code));
}

export function routeOrdersForT25Targets(targetCodes) {
  if (!validateT25Targets(targetCodes)) {
    throw new Error(`Unknown or empty T25 target list: ${JSON.stringify(targetCodes)}`);
  }
  const wanted = new Set(targetCodes);
  return T25_MSTAT_ROUTE
    .filter(step => wanted.has(step.targetCode))
    .map(step => step.routeOrder);
}

export function routeStepsForT25Targets(targetCodes) {
  if (!validateT25Targets(targetCodes)) {
    throw new Error(`Unknown or empty T25 target list: ${JSON.stringify(targetCodes)}`);
  }
  const wanted = new Set(targetCodes);
  return T25_MSTAT_ROUTE.filter(step => wanted.has(step.targetCode));
}
