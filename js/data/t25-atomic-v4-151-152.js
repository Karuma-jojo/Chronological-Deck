// Individually authored T25 M.Stat audited-v4 cards 151-152.
export const T25_ATOMIC_V4_151_152 = [
  {
    id: "T25-ARC845-A1151",
    routeOrder: 151,
    syllabusCode: "S2.1",
    targetCode: "S2",
    parentId: "ARC845",
    title: "Calculate a stratified estimate and its sampling variance.",
    focus: "Build the stratified estimator from stratum-specific simple random samples, weighting stratum means by population shares and propagating each stratum's design variance with its own finite-population correction.",
    purpose: "Make the learner derive stratified precision from the sampling design rather than memorize a weighted-average formula detached from stratum sizes, within-stratum variation, or sampling fractions.",
    centralCapability: "Given stratum sizes, sample sizes, stratum sample means and a declared finite-population variance convention, construct an unbiased stratified mean or total estimator and derive its sampling variance under independent within-stratum SRSWOR.",
    principalObstacle: "The main trap is mixing population-share and sample-share weights, dropping stratum-specific finite-population corrections, or pooling variances as though the whole sample were one SRS; each stratum contributes according to its own population weight and sampling design.",
    entryPrerequisites: ["S1 SRSWR/SRSWOR design expectation and variance", "J4 variance addition under conditioning/independence", "finite-population variance convention declared in S1"],
    requiredOwnership: [
      "Define W_h=N_h/N and distinguish population-share weights from sample proportions n_h/n",
      "Construct the stratified mean estimator as sum_h W_h ybar_h and the total estimator as sum_h N_h ybar_h",
      "State why independent sampling across strata makes cross-stratum covariance terms vanish",
      "Derive the variance contribution of each stratum under SRSWOR using its own n_h, N_h and finite-population correction",
      "Keep the chosen S_h^2 convention consistent with the S1 formulas instead of silently changing denominators",
      "Translate correctly between the variance of a stratified mean and the variance of the corresponding total",
      "Check limiting cases such as a fully enumerated stratum n_h=N_h contributing zero sampling variance",
      "Compare a proposed pooled or unweighted estimator with the correct population-share-weighted construction"
    ],
    inScope: [
      "Stratified mean and total estimation with known stratum population sizes",
      "Independent within-stratum SRSWOR variance calculation",
      "Stratum-specific finite-population corrections",
      "Design-based comparison of how strata contribute to overall variance"
    ],
    outOfScope: [
      "Optimal or cost-constrained choice of n_h, which belongs to S2.2",
      "Unequal-probability inverse-inclusion estimators, which begin at S3",
      "Post-stratification with random realised stratum counts",
      "Model-based regression or ratio estimators"
    ],
    applicationScope: "Entrance problems that provide a population partition into strata and ask for a stratified mean/total, its exact design variance, or a correction of an estimator that used the wrong weights or ignored finite-population effects.",
    transferScope: "A disguised multi-group sampling problem where the learner must recognise strata, recover the correct population weights, and diagnose whether a proposed variance expression incorrectly pools heterogeneous strata or omits one stratum's census effect.",
    exitCondition: "Given a finite population split into at least two strata, independently construct the stratified mean or total estimator, derive its sampling variance under independent within-stratum SRSWOR using one declared variance convention, and verify a boundary case such as n_h=N_h.",
    nextArcBoundary: "152 S2.2 keeps the same stratified estimator but changes the question from evaluating variance at fixed n_h values to choosing the allocation n_h under size or cost constraints."
  },
  {
    id: "T25-ARC845-A1152",
    routeOrder: 152,
    syllabusCode: "S2.2",
    targetCode: "S2",
    parentId: "ARC845",
    title: "Derive an allocation under fixed size or stated costs, then check feasibility.",
    focus: "Choose stratum sample sizes to minimise the stratified-estimator variance under a fixed total sample size or a stated linear cost constraint, then convert the continuous optimum into a feasible integer allocation without violating stratum bounds.",
    purpose: "Turn Neyman and proportional allocation into optimisation results with visible assumptions, so the learner knows when each rule is legal and when cost or feasibility constraints change it.",
    centralCapability: "Starting from the S2.1 variance expression, derive proportional or Neyman allocation under equal-cost fixed-size sampling, derive the short unequal-cost rule n_h proportional to N_h S_h/sqrt(c_h) when its cost model applies, and check that the proposed allocation is feasible.",
    principalObstacle: "The common mistake is quoting n_h proportional to N_h S_h automatically, even when costs differ, a stratum bound is hit, S_h is zero, or the optimisation objective/constraint is not the one that yields Neyman allocation.",
    entryPrerequisites: ["S2.1 stratified estimator and sampling variance", "C5 constrained one-variable optimisation intuition", "S1 finite-population feasibility bounds"],
    requiredOwnership: [
      "Express the part of stratified variance that depends on n_h before optimising",
      "Derive proportional allocation n_h proportional to N_h when stratum standard deviations are treated as equal",
      "Derive Neyman allocation n_h proportional to N_h S_h for fixed total n under equal per-unit costs",
      "For the stated linear cost model derive n_h proportional to N_h S_h/sqrt(c_h)",
      "Normalise proportionality constants so the allocation satisfies the total-size or total-cost constraint",
      "Check 0<=n_h<=N_h, minimum-sample requirements and integer feasibility instead of reporting an impossible continuous optimum",
      "Explain how a zero-variation stratum or a binding census cap changes the naive proportional solution",
      "Compare two feasible allocations by their implied variance rather than by slogan"
    ],
    inScope: [
      "Proportional allocation under fixed total sample size",
      "Neyman allocation under equal per-unit sampling costs",
      "Elementary unequal-cost allocation using the audited square-root cost rule",
      "Feasibility checks and simple reallocation when a stratum bound binds"
    ],
    outOfScope: [
      "General nonlinear cost functions or integer-programming algorithms",
      "Adaptive or two-phase allocation designs",
      "Unequal inclusion probabilities and Horvitz-Thompson estimation, which begin at S3",
      "Advanced optimum allocation with estimated variance components and stochastic costs"
    ],
    applicationScope: "Entrance questions asking how to split a fixed sample across strata, compare proportional with Neyman allocation, incorporate stated unequal per-unit costs, or detect an allocation that violates a stratum's population bound.",
    transferScope: "An unfamiliar allocation problem where the learner must infer the correct proportionality from the supplied variance and constraint, recognise when the textbook Neyman rule does not apply verbatim, and repair an infeasible continuous optimum.",
    exitCondition: "Given stratum sizes, variability measures and either a fixed total n or the audited linear cost constraint, independently derive the appropriate allocation rule, compute a feasible allocation, and justify why an attractive competing rule is suboptimal or illegal.",
    nextArcBoundary: "153 S3.1 leaves fixed within-stratum SRS allocation and begins general inclusion-probability reasoning, where one- and two-unit inclusion probabilities rather than stratum sample sizes drive unbiased estimation."
  }
];
