// Individually authored T25 M.Stat audited-v4 cards 149-150.
export const T25_ATOMIC_V4_149_150 = [
  {
    id: "T25-ARC843-A1149",
    routeOrder: 149,
    syllabusCode: "S1.1",
    targetCode: "S1",
    parentId: "ARC843",
    title: "Derive SRSWR/SRSWOR mean and total variances under one population convention.",
    focus: "Derive expectation and variance for simple-random-sample estimators under sampling with replacement and without replacement, while declaring one finite-population variance convention and carrying the finite-population correction consistently.",
    purpose: "Make design-based sampling variance transparent instead of memorised, and prevent factor-of-N or factor-of-(N-1) mistakes caused by silently switching population-variance conventions midway through a derivation.",
    centralCapability: "Given a finite population of size N and a simple random sample of size n, derive unbiasedness and variance for the sample mean and expanded total under SRSWR and SRSWOR, express the without-replacement variance through a declared finite-population correction, and check limiting cases such as n=N.",
    principalObstacle: "The main trap is mixing superpopulation intuition with design randomness or combining incompatible definitions of finite-population variance, which produces missing N factors, wrong denominators, or an FPC that fails the census limit.",
    entryPrerequisites: ["D1 expectation and variance for discrete random variables", "J2 conditioning and independence on finite supports", "N1 sums and covariance of random variables"],
    requiredOwnership: [
      "State clearly that the finite population values are fixed and the randomness comes from the sampling design",
      "Define one finite-population mean and one variance convention before deriving any sampling variance",
      "Derive unbiasedness of the SRSWR sample mean and total estimator",
      "Derive the SRSWR variance of the sample mean from independent draws",
      "Derive the SRSWOR variance of the sample mean using inclusion indicators, covariance, or an equivalent finite-population argument",
      "Express the without-replacement variance with the correct finite-population correction under the chosen convention",
      "Scale the mean variance correctly to obtain the variance of the estimated population total",
      "Check the census limit n=N under SRSWOR and explain why the variance must vanish",
      "Compare SRSWR and SRSWOR precision under the same population convention rather than by mismatched formulas"
    ],
    inScope: [
      "SRS with replacement and without replacement from a finite population",
      "Sample-mean and population-total unbiasedness and variance",
      "Finite-population correction under an explicitly declared variance convention",
      "Census-limit and precision comparisons between SRSWR and SRSWOR"
    ],
    outOfScope: [
      "Stratified estimators and optimal allocation, which begin at S2",
      "Unequal-probability Horvitz-Thompson estimation, which belongs to S3",
      "Ratio and regression survey estimators",
      "Asymptotic survey inference beyond the exact design-based variance identities required here"
    ],
    applicationScope: "Entrance questions asking for expectation or variance of the sample mean/total under SRSWR or SRSWOR, comparison of the two designs, or verification of the finite-population correction and census limit.",
    transferScope: "An unfamiliar notation or variance convention where the learner must translate carefully between denominator N and N-1 definitions, recover the correct total-estimator scaling, or reject a proposed FPC that does not vanish when the whole population is observed.",
    exitCondition: "From first principles and under one declared finite-population variance convention, independently derive the SRSWR and SRSWOR variances for the mean and total, compare them, and verify the n=N census limit without switching conventions.",
    nextArcBoundary: "150 S1.2 shifts from estimator variance to the combinatorial definition of SRSWOR itself: every subset of the stated size must receive the correct equal probability."
  },
  {
    id: "T25-ARC843-A1150",
    routeOrder: 150,
    syllabusCode: "S1.2",
    targetCode: "S1",
    parentId: "ARC843",
    title: "Verify a proposed sampling algorithm assigns the right probability to every possible subset.",
    focus: "Audit whether a concrete sampling procedure really implements simple random sampling without replacement by computing the induced probability of each unordered sample rather than trusting labels such as 'random' or 'uniform at each step'.",
    purpose: "Build design literacy: an algorithm is SRSWOR only if every size-n subset has probability 1 over choose(N,n), and sequential descriptions must be converted to unordered-sample probabilities before that claim is accepted.",
    centralCapability: "Given a multistage, sequential, or rule-based sampling algorithm, calculate the probability of an arbitrary unordered sample of size n, account for all orderings or paths that lead to it, and decide whether the design is genuinely SRSWOR.",
    principalObstacle: "A procedure can look symmetric locally while inducing unequal subset probabilities globally; another common error is comparing ordered-sequence probabilities with unordered-sample probabilities without summing over every admissible ordering.",
    entryPrerequisites: ["S1.1 design-based SRS notation and finite-population setup", "P4 counting and combinatorial probability", "J1 event decomposition on finite sample spaces"],
    requiredOwnership: [
      "State the defining SRSWOR requirement that every unordered size-n subset has probability 1/binomial(N,n)",
      "Distinguish an ordered draw sequence from the final unordered sample",
      "Compute the probability of one ordered path through a sequential sampling algorithm",
      "Sum over all admissible orderings or branches that produce the same unordered subset",
      "Use symmetry only after verifying that the algorithm treats all relevant labels or states symmetrically",
      "Produce a counterexample subset when a proposed algorithm is not simple random sampling",
      "Recognise standard sequential sampling without replacement as SRSWOR by its induced subset probability",
      "Separate equal marginal inclusion probability from the stronger requirement of equal subset probability"
    ],
    inScope: [
      "Exact verification of SRSWOR from a concrete sampling algorithm",
      "Ordered versus unordered sample probabilities",
      "Counting paths leading to the same subset",
      "Distinction between equal first-order inclusion probabilities and equal subset probabilities"
    ],
    outOfScope: [
      "General unequal-probability sampling theory and Horvitz-Thompson estimation",
      "Systematic sampling variance theory",
      "Cluster or multistage survey estimators",
      "Stratified allocation, which begins at S2"
    ],
    applicationScope: "Entrance problems that describe a sampling rule verbally and ask whether it is simple random sampling, or that require computing the exact probability of a given sample under a sequential design.",
    transferScope: "A disguised algorithm with apparently uniform local choices where the learner must aggregate path probabilities, detect hidden asymmetry, or show that equal individual inclusion probabilities still do not guarantee equal probabilities for all subsets.",
    exitCondition: "For one valid and one invalid proposed without-replacement sampling algorithm, independently compute induced subset probabilities and justify the classification, including the ordered-to-unordered conversion and a concrete witness of failure when needed.",
    nextArcBoundary: "151 S2.1 begins stratified sampling, where the population is partitioned first and separate within-stratum designs are combined using population-share weights."
  }
];
