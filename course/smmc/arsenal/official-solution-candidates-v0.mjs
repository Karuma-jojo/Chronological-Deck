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
  ],
  ["RAW-OFFICIAL-009","Vandermonde-Matrix Invertibility","SMMC-2025-A4","S0-SMMC-SOLUTION-2025","0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",9,"Solution 1","The official solution obtains a linear system whose coefficient matrix is Vandermonde and uses distinct nodes to conclude invertibility."],
  ["RAW-OFFICIAL-010","Newton-Polygon Alternative","SMMC-2025-C2","S0-SMMC-SOLUTION-2025","0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",23,"Solution 2","The official solution presents a Newton-polygon-based alternative route."],
  ["RAW-OFFICIAL-011","Chinese Remainder Theorem","SMMC-2023-C1","S0-SMMC-SOLUTION-2023","446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",17,"Solution","The official solution explicitly uses the Chinese remainder theorem in its congruence construction."],
  ["RAW-OFFICIAL-012","Generating-Function Route","SMMC-2018-A4","S0-SMMC-SOLUTION-2018","b19562352d09bf6fbb43974339b82c2a59c0d2276eb69f357a752772ce0f83cb",8,"Solution","The official solution derives and uses a generating function from the recurrence."],
  ["RAW-OFFICIAL-013","Recurrence-Relation Route","SMMC-2018-A4","S0-SMMC-SOLUTION-2018","b19562352d09bf6fbb43974339b82c2a59c0d2276eb69f357a752772ce0f83cb",7,"Solution","The official solution first derives a recurrence relation for the target probabilities."],
  ["RAW-OFFICIAL-014","Projective-Plane Method","SMMC-2020-B4","S0-SMMC-SOLUTION-2020","d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",25,"Solution to part (a)","The official solution uses finite-projective-plane structure in the solved part."],
  ["RAW-OFFICIAL-015","Gaussian-Integer Factorization","SMMC-2025-B4","S0-SMMC-SOLUTION-2025","0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",17,"Solution 1 to part (a)","The official solution factors in the Gaussian integers."],
  ["RAW-OFFICIAL-016","p-adic Valuation","SMMC-2022-A4","S0-SMMC-SOLUTION-2022","3e1670aef22b83cd2be13d027728ebed119072011e4150d7c3aa8dba3101295f",7,"Solution","The official solution uses p-adic valuation information in the divisibility analysis."],
  ["RAW-OFFICIAL-017","2-adic Valuation","SMMC-2023-B4","S0-SMMC-SOLUTION-2023","446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",15,"Known partial-results discussion","The official booklet records a known partial-result route using the 2-adic valuation."],
  ["RAW-OFFICIAL-018","Rational Root Theorem","SMMC-2019-A3","S0-SMMC-SOLUTION-2019","a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e",4,"Solution","The official solution invokes the rational root theorem as part of the obstruction argument."],
  ["RAW-OFFICIAL-019","Convex Envelope","SMMC-2025-C4","S0-SMMC-SOLUTION-2025","0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",25,"Solution","The official solution explicitly uses the convex envelope construction."],
  ["RAW-OFFICIAL-020","Convex-Hull Reduction","SMMC-2017-B3","S0-SMMC-SOLUTION-2017","c272a72239ef4c2ccd54df0702140179e0a9b85f5a9028c87d485841eb1a2c12",10,"Solution","The official solution uses the convex hull as a structural reduction."],
  ["RAW-OFFICIAL-021","Alternating-Series Control","SMMC-2019-B2","S0-SMMC-SOLUTION-2019","a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e",8,"Solution","The official solution uses alternating-series structure after the Taylor expansion."],
  ["RAW-OFFICIAL-022","Comparison Test for Series","SMMC-2019-A4","S0-SMMC-SOLUTION-2019","a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e",5,"Solution","The official solution explicitly applies a comparison test in the convergence argument."],
  ["RAW-OFFICIAL-023","Subseries Comparison","SMMC-2022-C2","S0-SMMC-SOLUTION-2022","3e1670aef22b83cd2be13d027728ebed119072011e4150d7c3aa8dba3101295f",23,"Solution 1","The official solution isolates a subseries and compares it to control convergence/divergence."],
  ["RAW-OFFICIAL-024","Intermediate Value Theorem","SMMC-2020-B3","S0-SMMC-SOLUTION-2020","d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",23,"Solution","The official solution explicitly invokes the Intermediate Value Theorem."],
  ["RAW-OFFICIAL-025","Triangle-Inequality Sharpness","SMMC-2023-B1","S0-SMMC-SOLUTION-2023","446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",9,"Solution","The official solution uses the triangle inequality for the upper bound and an aligned construction for sharpness."],
  ["RAW-OFFICIAL-026","AM-GM Bound","SMMC-2020-A3","S0-SMMC-SOLUTION-2020","d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",10,"Solution","The official solution uses AM-GM in a lower-bound argument."],
  ["RAW-OFFICIAL-027","Eigenvector Reduction","SMMC-2020-A4","S0-SMMC-SOLUTION-2020","d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3",14,"Solution 3","The official vector/Gram route reduces the structure using eigenvector information."],
  ["RAW-OFFICIAL-028","Bijective Counting Route","SMMC-2021-B1","S0-SMMC-SOLUTION-2021","c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",11,"Solution 2","The official booklet gives a distinct bijective counting solution."],
  ["RAW-OFFICIAL-029","Compact-Space Subsequence","SMMC-2025-A4","S0-SMMC-SOLUTION-2025","0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345",9,"Solution 1","The official solution places a sequence in a compact torus and extracts a convergent subsequence."],
  ["RAW-OFFICIAL-030","Geometric-Series Summation","SMMC-2023-A1","S0-SMMC-SOLUTION-2023","446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c",2,"Solution 1","The official solution uses geometric-series summation in its coordinate route."]
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
