// Exact SMMC authored-unit requirements.
// GREEN problems need only mapped T25 prerequisites.
// AMBER/RED problems unlock only when every exact required unit is certified.
// This map is intentionally sparse and fail-closed: no row means requirement-map-pending.
//
// IMPORTANT: module membership alone is never sufficient. A unit may cover only one
// slice of a larger bridge module, so historical unlocks reference authored unit IDs.

export const SMMC_REQUIREMENTS_V1 = Object.freeze({
  // 2021 A3 specifically needs the finite 2-regular-graph -> cycle decomposition
  // supplied by GR1-U01; its determinant/counting prerequisites remain T25-owned.
  "SMMC-2021-A3": ["S-BRIDGE-GR1-U01"],
});
