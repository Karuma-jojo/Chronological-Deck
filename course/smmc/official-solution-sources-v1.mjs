// Authoring-only official Simon Marais Mathematics Competition solution sources.
//
// IMPORTANT:
// - This module is provenance infrastructure for reviewer/authoring code.
// - Learner-facing SMMC UI must not import it.
// - Exact hashes freeze the bytes used for VERIFIED historical Battle claims.
// - If the organiser revises a solution booklet at the same/year-adjacent URL,
//   add a reviewed source-register amendment instead of silently replacing a hash.

export const SMMC_OFFICIAL_SOLUTION_SOURCES_V1 = Object.freeze({
  2017: Object.freeze({
    yearPage: "https://www.simonmarais.org/20171.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2017-solutions-preliminary_1.pdf",
    pages: 12,
    sha256: "c272a72239ef4c2ccd54df0702140179e0a9b85f5a9028c87d485841eb1a2c12",
    label: "2017 SOLUTIONS (PRELIMINARY VERSION)",
  }),
  2018: Object.freeze({
    yearPage: "https://www.simonmarais.org/2018.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2018-solutions_1.pdf",
    pages: 17,
    sha256: "b19562352d09bf6fbb43974339b82c2a59c0d2276eb69f357a752772ce0f83cb",
    label: "2018 SOLUTIONS",
  }),
  2019: Object.freeze({
    yearPage: "https://www.simonmarais.org/20191.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2019-solutions_1.pdf",
    pages: 12,
    sha256: "a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e",
    label: "2019 SOLUTIONS",
  }),
  2020: Object.freeze({
    yearPage: "https://www.simonmarais.org/20201.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2020-solutions_1.pdf",
    pages: 28,
    sha256: "d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",
    label: "2020 SOLUTIONS",
  }),
  2021: Object.freeze({
    yearPage: "https://www.simonmarais.org/20211.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2021-solutions.pdf",
    pages: 22,
    sha256: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
    label: "2021 SOLUTIONS",
  }),
  2022: Object.freeze({
    yearPage: "https://www.simonmarais.org/2022.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2022-solutions.pdf",
    pages: 30,
    sha256: "3e1670aef22b83cd2be13d027728ebed119072011e4150d7c3aa8dba3101295f",
    label: "2022 SOLUTIONS",
  }),
  2023: Object.freeze({
    yearPage: "https://www.simonmarais.org/20231.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2023solutions.pdf",
    pages: 23,
    sha256: "446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",
    label: "2023 SOLUTIONS",
  }),
  2024: Object.freeze({
    yearPage: "https://www.simonmarais.org/20241.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc_2024_solutions.pdf",
    pages: 24,
    sha256: "1566dc8c2088cbbc851f7c91d357f9c453f2d28578df7694aa9a13584a80eed2",
    label: "2024 SOLUTIONS",
  }),
  2025: Object.freeze({
    yearPage: "https://www.simonmarais.org/2025.html",
    url: "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2025_solutions.pdf",
    pages: 25,
    sha256: "0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",
    label: "2025 SOLUTIONS",
    revisionNote: "Current official-linked revision frozen 2026-10-01; differs from the 26-page 2026-09-28 inventory revision.",
  }),
});

export function officialSolutionSource(year) {
  return SMMC_OFFICIAL_SOLUTION_SOURCES_V1[Number(year)] || null;
}
