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

  // 2022 C2 needs positive-series comparison, a divergent subseries benchmark,
  // and harmonic-series divergence; AN1-U01 covers exactly that gap.
  "SMMC-2022-C2": ["S-BRIDGE-AN1-U01"],

  // 2023 C1 needs CRT plus square-free totient/coprime residue counting.
  // N1-U01 supplies congruence/inverse foundations; N1-U02 supplies CRT and φ.
  "SMMC-2023-C1": ["S-BRIDGE-N1-U01", "S-BRIDGE-N1-U02"],
});
