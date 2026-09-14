// Individually authored T25 M.Stat audited-v4 cards 141-142.
export const T25_ATOMIC_V4_141_142 = [
  {
    id: "T25-ARC835-A1141",
    routeOrder: 141,
    syllabusCode: "T6.1",
    targetCode: "T6",
    parentId: "ARC835",
    title: "Specify the signs, null Bernoulli probability and treatment of zeros.",
    focus: "Translate a one-sample median or paired-difference sign problem into independent Bernoulli sign indicators under the null, making the target parameter, null sign probability and treatment of zero differences explicit before any binomial calculation.",
    purpose: "Make the sign test a model-and-count construction rather than a memorised Binomial(n, 1/2) recipe that silently assumes away ties, dependence or the wrong null hypothesis.",
    centralCapability: "Define the sign variables from the observed differences or centred observations, justify their Bernoulli null law from the continuity/no-zero assumptions or a stated tie rule, and identify the effective sample size used by the count statistic.",
    principalObstacle: "Automatically assigning probability 1/2 to every sign, dropping zero observations without saying so, or confusing a paired median-difference null with equality of two arbitrary population medians produces a test for a different problem than the one stated.",
    entryPrerequisites: ["T1 exact rejection-rule, size and power language", "D1 Bernoulli and binomial laws", "J1 indicator encoding; P6 independence of trials and events"],
    requiredOwnership: [
      "State the parameter/null claim the signs are intended to test",
      "Define each positive/negative sign indicator from the actual observation or paired difference",
      "Justify why the null sign probability is 1/2, or use the different supplied null probability instead",
      "State the continuity/no-tie assumption when using the ordinary sign test",
      "If zeros can occur, declare whether they are removed, split, randomised or handled by a supplied rule",
      "Update the effective binomial sample size after any legitimate removal of zero differences",
      "Distinguish paired-difference inference from a claim about two unrelated marginal medians",
      "Check the independence assumption needed for the Bernoulli count law"
    ],
    inScope: [
      "One-sample median sign tests under a continuous distribution",
      "Paired-difference sign tests",
      "Null sign probabilities other than one half when explicitly supplied",
      "Explicit treatment of zeros and its effect on the count sample size"
    ],
    outOfScope: [
      "Wilcoxon signed-rank procedures",
      "Rank-sum or Mann-Whitney tests",
      "Permutation-test theory beyond the elementary sign count",
      "General nonparametric efficiency comparisons"
    ],
    applicationScope: "Entrance questions where raw observations or paired differences must first be converted into a legitimate Bernoulli sign experiment before an exact binomial test can be calibrated.",
    transferScope: "An unfamiliar sign-count setup containing ties, a nonstandard null sign probability or a misleading statement about medians, where the learner must repair or reject the proposed Binomial(n,1/2) model before testing.",
    exitCondition: "Given a one-sample or paired sign-test problem, define the sign indicators, state and justify the null Bernoulli probability, handle zeros explicitly, identify the effective sample size and explain exactly what population claim the construction tests.",
    nextArcBoundary: "142 T6.2 keeps the sign model fixed and calibrates an exact binomial rejection region, including the actual discrete size and what changes when the null sign probability or tie rule differs."
  },
  {
    id: "T25-ARC835-A1142",
    routeOrder: 142,
    syllabusCode: "T6.2",
    targetCode: "T6",
    parentId: "ARC835",
    title: "Calibrate an exact binomial sign-test rejection region.",
    focus: "Use the binomial null law of the sign count to construct a one- or two-sided exact rejection region, compute its actual discrete size, and explain how the region changes with the alternative, null sign probability or tie treatment.",
    purpose: "Close elementary exact testing with a fully calibrated finite-sample count test, preserving the distinction between a nominal level and the attainable size of a discrete rejection region.",
    centralCapability: "Choose the correct lower, upper or two-tail binomial rejection set from the alternative, evaluate its exact null probability, report the attained size and modify the calibration when p0 is not one half or the effective sample size changes.",
    principalObstacle: "Forcing an unattainable nominal alpha, mechanically doubling one tail in an asymmetric binomial law, or using the pre-tie sample size can make the reported 'exact' test have the wrong size.",
    entryPrerequisites: ["T6.1 valid sign construction and tie handling", "T1 actual size versus nominal level", "D1 exact binomial probability calculations"],
    requiredOwnership: [
      "Write the exact null law S~Binomial(m,p0) with the correct effective m",
      "Select lower- or upper-tail rejection from the direction of the alternative",
      "For a two-sided test, define the exact tail convention rather than assuming symmetry when p0 is not one half",
      "Compute the actual null rejection probability of the chosen region",
      "State when discreteness prevents an unrandomised test from attaining the requested nominal level",
      "Recognise that changing p0 changes both tail probabilities and any symmetric-looking cutoff",
      "Recompute the null law when the stated tie rule changes the effective count",
      "Relate the exact count test back to the specific median or paired-difference claim from T6.1"
    ],
    inScope: [
      "Exact one-sided binomial sign-test calibration",
      "Exact two-sided elementary sign-test calibration with a declared convention",
      "Actual size under discreteness",
      "Changed null probability or changed effective sample size"
    ],
    outOfScope: [
      "Randomisation machinery beyond noting when exact nominal alpha is unattainable",
      "Large-sample normal approximation to the sign statistic",
      "Signed-rank and other rank-based tests",
      "Multiple-testing or sequential sign procedures"
    ],
    applicationScope: "Entrance problems asking for the exact rejection set, p-value/count-tail calculation or attained significance level of an elementary sign test in finite samples.",
    transferScope: "A discrete test where the requested nominal level cannot be hit exactly, or where p0 is not 1/2, requiring the learner to calibrate from the actual binomial mass rather than copy a memorised symmetric cutoff.",
    exitCondition: "Given a valid sign-count model, construct the exact rejection region for the stated alternative, calculate its attained size, and explain precisely how discreteness, a changed p0 or a changed tie rule alters the calibration.",
    nextArcBoundary: "143 R2.1 begins Phase 7 regression by leaving elementary exact hypothesis testing and deriving least-squares normal equations from minimisation."
  }
];
