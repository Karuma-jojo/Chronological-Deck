// Gate 2 raw candidate leads taken directly from inspected official SMMC solution
// passages. These are SOURCE_FACT + NONE observations, deliberately NOT Battle-channel
// records: Gate 2 harvests the concepts without constructing the later Battle matrix.

const RAW = Object.freeze([
  [
    "RAW-OFFICIAL-001",
    "Winding-Number Parity Coloring",
    "SMMC-2020-A1",
    "S0-SMMC-SOLUTION-2020",
    "d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",
    2,
    "Solution 3",
    "The official solution treats an odd cycle as a closed curve, colors complementary regions by winding-number parity, and tracks parity across crossings."
  ],
  [
    "RAW-OFFICIAL-002",
    "Perturb Away Degeneracies",
    "SMMC-2020-A1",
    "S0-SMMC-SOLUTION-2020",
    "d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",
    3,
    "Comment after Solution 3",
    "The official solution explicitly replaces a line by an arbitrarily small perturbation to avoid self-intersections while preserving which relevant line segments are met."
  ],
  [
    "RAW-OFFICIAL-003",
    "Track Parity Under Continuous Deformation",
    "SMMC-2020-A1",
    "S0-SMMC-SOLUTION-2020",
    "d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",
    3,
    "Solution 4",
    "The official solution rotates a line from a zero-intersection position and observes that its intersection count changes only by even amounts."
  ],
  [
    "RAW-OFFICIAL-004",
    "Taylor-Series Expansion",
    "SMMC-2019-B2",
    "S0-SMMC-SOLUTION-2019",
    "a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e",
    8,
    "Solution",
    "The official solution begins from the Taylor series expansion of the exponential function."
  ],
  [
    "RAW-OFFICIAL-005",
    "Mean Value Theorem as a Convexity Contradiction Tool",
    "SMMC-2021-B3",
    "S0-SMMC-SOLUTION-2021",
    "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
    20,
    "Solution 3",
    "The official solution explicitly proposes applying the Mean Value Theorem twice to force a nonpositive second derivative and obtain a contradiction."
  ],
  [
    "RAW-OFFICIAL-006",
    "Dense-Set Riemann-Sum Approximation",
    "SMMC-2021-B3",
    "S0-SMMC-SOLUTION-2021",
    "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
    20,
    "Solution 3",
    "The official solution justifies equality of integrals for Riemann-integrable functions agreeing on a dense set by using Riemann sums sampled in that dense set."
  ],
  [
    "RAW-OFFICIAL-007",
    "Lagrange's Theorem in a Finite-Group Counting Argument",
    "SMMC-2022-A4",
    "S0-SMMC-SOLUTION-2022",
    "3e1670aef22b83cd2be13d027728ebed119072011e4150d7c3aa8dba3101295f",
    7,
    "Alternative group-theoretic route",
    "The official solution invokes Lagrange's theorem to deduce divisibility from the orders of a finite general linear group and a subgroup."
  ],
  [
    "RAW-OFFICIAL-008",
    "Upper Riemann-Sum Bounding",
    "SMMC-2023-C3",
    "S0-SMMC-SOLUTION-2023",
    "446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",
    21,
    "Solution 2",
    "The official solution interprets the finite expression through an upper Riemann sum for a decreasing function."
  ]
]);

export const ARSENAL_GATE2_OFFICIAL_SOLUTION_CANDIDATES = Object.freeze(
  RAW.map(([candidateId,candidateName,problemId,sourceId,sourceArtifactSha256,pdfPage,section]) => Object.freeze({
    candidateId,
    candidateName,
    origin: "OFFICIAL_SMMC_SOLUTION",
    sourceTerminology: candidateName,
    ontologyType: null,
    aliases: Object.freeze([]),
    evidenceRecordIds: Object.freeze([`E-${candidateId}-source`]),
    trigger: null,
    operation: null,
    failureModes: null,
    hardPrerequisites: null,
    softPrerequisites: null,
    candidateRelations: null,
    adjudication: null,
    adjudicationRationale: null,
    rank: null,
    rarity: null,
    note: `Raw official-solution lead from ${problemId}; final granularity/type/status unresolved.`,
  }))
);

export const ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE = Object.freeze(
  RAW.map(([candidateId,candidateName,problemId,sourceId,sourceArtifactSha256,pdfPage,section,claim]) => Object.freeze({
    recordId: `E-${candidateId}-source`,
    candidateId,
    candidateName,
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "NONE",
    claimKind: "OTHER",
    verificationStatus: "VERIFIED",
    ontologyType: null,
    sourceId,
    sourceVersionOrCommit: sourceId,
    sourceLocator: Object.freeze({ kind: "PDF", pdfPage, section }),
    sourceArtifactSha256,
    historicalProblemIds: Object.freeze([problemId]),
    learnerAttemptIds: Object.freeze([]),
    learnerContext: null,
    claim,
    sourceTerminology: candidateName,
    supports: Object.freeze(["RAW_CANDIDATE_HARVEST"]),
    doesNotEstablish: "Does not establish final candidate granularity/type, importance, prerequisite status, rank, learner Transfer, or a completed Battle matrix.",
    confidence: "verified source observation; candidate status intentionally unresolved",
    linkedRecordIds: Object.freeze([]),
    researcherNote: "Directly inspected in the exact frozen official solution artifact.",
  }))
);

export const ARSENAL_GATE2_OFFICIAL_SOLUTION_META = Object.freeze({ candidates: RAW.length, evidenceRecords: RAW.length });
