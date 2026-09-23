// Explicit SMMC module requirements.
// This registry is intentionally fail-closed and initially partial.
// GREEN problems need only mapped T25 prerequisites.
// AMBER/RED problems without an explicit row stay locked as requirement-map-pending.

export const SMMC_REQUIREMENTS_V1 = Object.freeze({
  "SMMC-2017-A3": ["S-BRIDGE-N1"],
  "SMMC-2017-B2": ["S-BRIDGE-N1"],
  "SMMC-2019-A1": ["S-BRIDGE-N1"],
  "SMMC-2019-A3": ["S-BRIDGE-N1"],
  "SMMC-2019-B2": ["S-BRIDGE-N1", "S-BRIDGE-AN1"],
  "SMMC-2021-A2": ["S-BRIDGE-N1"],
  "SMMC-2021-B4": ["S-BRIDGE-N1"],
  "SMMC-2022-A4": ["S-BRIDGE-N1"],
  "SMMC-2023-B4": ["S-BRIDGE-N1"],
  "SMMC-2023-C1": ["S-BRIDGE-N1"],
  "SMMC-2025-C2": ["S-BRIDGE-N1"],

  "SMMC-2017-B3": ["S-BRIDGE-GR1", "S-BRIDGE-GEO1"],
  "SMMC-2018-B3": ["S-BRIDGE-GR1"],
  "SMMC-2019-B3": ["S-BRIDGE-GR1"],
  "SMMC-2021-A3": ["S-BRIDGE-GR1"],
  "SMMC-2022-B3": ["S-BRIDGE-GR1"],
  "SMMC-2023-C4": ["S-BRIDGE-GR1"],

  "SMMC-2019-A4": ["S-BRIDGE-AN1"],
  "SMMC-2020-A3": ["S-BRIDGE-AN1"],
  "SMMC-2022-C2": ["S-BRIDGE-AN1"],
  "SMMC-2024-C3": ["S-BRIDGE-AN1"],

  "SMMC-2017-A4": ["S-BRIDGE-AN2"],
  "SMMC-2021-A4": ["S-BRIDGE-AN2"],
  "SMMC-2021-B3": ["S-BRIDGE-AN2"],
  "SMMC-2023-A2": ["S-BRIDGE-AN2"],
  "SMMC-2025-C4": ["S-BRIDGE-AN2"],

  "SMMC-2018-A3": ["S-BRIDGE-GF1"],
  "SMMC-2018-A4": ["S-BRIDGE-GF1"],
  "SMMC-2024-C4": ["S-BRIDGE-GF1"],

  "SMMC-2017-B1": ["S-BRIDGE-GEO1"],
  "SMMC-2018-A1": ["S-BRIDGE-GEO1"],
  "SMMC-2020-A4": ["S-BRIDGE-GEO1"],
  "SMMC-2025-B2": ["S-BRIDGE-GEO1"],

  "SMMC-2020-B4": ["S-SPECIAL-ALG1"],
  "SMMC-2024-B4": ["S-SPECIAL-ALG1"],
  "SMMC-2025-A2": ["S-SPECIAL-ALG1"],

  "SMMC-2025-A4": ["S-SPECIAL-ALG2"],
  "SMMC-2025-B4": ["S-SPECIAL-NT2"],
});
