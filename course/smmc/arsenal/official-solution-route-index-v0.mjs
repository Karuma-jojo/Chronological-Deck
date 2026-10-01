// Gate 2 structural index of explicitly labelled solution routes in the frozen
// official SMMC 2017-2025 solution booklets.
//
// This is a LOWER BOUND on mathematical route diversity. A booklet can contain
// unlabelled variants, shared lemmas, comments, or partial/open-problem discussion
// inside one labelled Solution section. No route count is an ability count.

import { SMMC_OFFICIAL_SOLUTION_SOURCES_V1 } from "../official-solution-sources-v1.mjs";

const ROUTE_COUNTS = Object.freeze({
  "2017": {
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 1,
    "B2": 1,
    "B3": 1,
    "B4": 0
  },
  "2018": {
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 1,
    "B2": 1,
    "B3": 1,
    "B4": 0
  },
  "2019": {
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 1,
    "B2": 1,
    "B3": 1,
    "B4": 1
  },
  "2020": {
    "A1": 4,
    "A2": 2,
    "A3": 1,
    "A4": 3,
    "B1": 1,
    "B2": 4,
    "B3": 1,
    "B4": 1
  },
  "2021": {
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 2,
    "B2": 5,
    "B3": 3,
    "B4": 1
  },
  "2022": {
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 2,
    "B2": 1,
    "B3": 2,
    "B4": 1,
    "C1": 3,
    "C2": 2,
    "C3": 2,
    "C4": 1
  },
  "2023": {
    "A1": 3,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "B1": 1,
    "B2": 2,
    "B3": 2,
    "B4": 1,
    "C1": 1,
    "C2": 1,
    "C3": 2,
    "C4": 1
  },
  "2024": {
    "A1": 2,
    "A2": 2,
    "A3": 2,
    "A4": 1,
    "B1": 2,
    "B2": 1,
    "B3": 2,
    "B4": 2,
    "C1": 1,
    "C2": 3,
    "C3": 2,
    "C4": 1
  },
  "2025": {
    "A1": 2,
    "A2": 1,
    "A3": 2,
    "A4": 2,
    "B1": 1,
    "B2": 1,
    "B3": 3,
    "B4": 2,
    "C1": 2,
    "C2": 2,
    "C3": 3,
    "C4": 1
  }
});

export const ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX = Object.freeze(
  Object.entries(ROUTE_COUNTS).flatMap(([yearText, paper]) => {
    const year = Number(yearText);
    const source = SMMC_OFFICIAL_SOLUTION_SOURCES_V1[year];
    return Object.entries(paper).map(([problem, labeledRouteCount]) => {
      const routeLabels = year === 2022 && problem === "C3"
        ? ["Solution via a recurrence relation", "Solution via a generating function"]
        : labeledRouteCount === 0
          ? []
          : labeledRouteCount === 1
            ? ["Solution"]
            : Array.from({length:labeledRouteCount}, (_,i) => `Solution ${i+1}`);
      return Object.freeze({
        problemId: `SMMC-${year}-${problem}`,
        sourceId: source.sourceId,
        sourceArtifactSha256: source.sha256,
        sourcePages: source.pages,
        labeledRouteCount,
        routeLabels: Object.freeze(routeLabels),
        interpretation: "lower-bound structural count only; not candidate count or Battle-method annotation",
      });
    });
  })
);

export const ARSENAL_GATE2_OFFICIAL_ROUTE_META = Object.freeze({
  historicalProblems: ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX.length,
  labeledSolutionSections: ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX.reduce((n,row)=>n+row.labeledRouteCount,0),
  multiRouteProblems: ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX.filter(row=>row.labeledRouteCount>1).length,
  zeroLabelledRouteProblems: ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX.filter(row=>row.labeledRouteCount===0).map(row=>row.problemId),
  note: "Counts were extracted from explicit Solution / Solution N / Solution via ... headings in the exact frozen official booklets. They are a lower bound on route diversity.",
});
