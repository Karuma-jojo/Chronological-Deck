// Individually authored T25 M.Stat audited-v4 cards 137-138.
export const T25_ATOMIC_V4_137_138 = [
  {
    id: "T25-ARC834-A1137",
    routeOrder: 137,
    syllabusCode: "T4.1",
    targetCode: "T4",
    parentId: "ARC834",
    title: "Invert a pivot with a declared quantile-tail convention.",
    focus: "Start from a genuine parameter-free pivot, state exactly which lower/upper quantiles are being used, solve the corresponding probability inequality for the fixed parameter, and distinguish exact finite-sample coverage from an approximation.",
    purpose: "Make confidence intervals a controlled inversion of a legal pivot rather than a memorised endpoint formula whose tail convention and coverage meaning are left implicit.",
    centralCapability: "Identify an exact pivot for a normal mean, normal variance, exponential mean or simple support-endpoint model, assign the correct tail probabilities, invert the inequalities without reversing endpoints incorrectly, and state the resulting coverage claim.",
    principalObstacle: "Using ambiguous quantile notation, forgetting that inversion can reverse inequalities when dividing by a positive parameter-dependent quantity, or calling an approximate standardisation exact can produce intervals with the wrong endpoints or wrong coverage interpretation.",
    entryPrerequisites: ["N2 exact normal chi-square/t/F pivots", "E1 sampling distributions and estimator variability", "T3 exact normal-model pivots and tail calibration"],
    requiredOwnership: [
      "Write the pivot and verify that its distribution is parameter-free under the stated model",
      "Declare whether q_p denotes a lower-tail p quantile or use an equivalent unambiguous convention",
      "Allocate alpha across one or two tails before algebraic inversion",
      "Invert the probability event carefully and preserve the legal parameter space",
      "Use a t pivot for an unknown normal mean only when the exact N2 conditions hold",
      "Use chi-square quantiles with n-1 degrees of freedom for a normal variance interval",
      "State whether the resulting coverage is exact finite-sample or only approximate",
      "Interpret the interval as a random set covering a fixed parameter with repeated-sampling probability 1-alpha"
    ],
    inScope: [
      "Exact confidence intervals for a normal mean with known or unknown variance",
      "Exact confidence intervals for a normal variance",
      "Elementary exponential-mean or support-endpoint pivots supplied or derivable from established laws",
      "One-sided and two-sided intervals with explicit quantile-tail conventions"
    ],
    outOfScope: [
      "Bootstrap intervals",
      "Bayesian credible intervals",
      "General asymptotic Wald intervals, which belong to T5",
      "Prediction intervals for a future observation, which belong to T4.2"
    ],
    applicationScope: "Entrance problems asking for an exact confidence interval from a known pivot, often with enough notation ambiguity that the learner must make the quantile convention explicit before solving for the parameter.",
    transferScope: "An unfamiliar pivot where the statistic is a monotone function of the parameter and the learner must decide which inequalities reverse, which endpoint uses which quantile, and whether the final interval respects the parameter's support.",
    exitCondition: "Given one exact mean pivot and one exact scale/support pivot, derive the confidence set from a declared tail convention, verify endpoint order and parameter legality, and state the correct repeated-sampling coverage interpretation.",
    nextArcBoundary: "138 T4.2 distinguishes confidence for a fixed parameter from prediction for a future observation and from a one-sided confidence bound."
  },
  {
    id: "T25-ARC834-A1138",
    routeOrder: 138,
    syllabusCode: "T4.2",
    targetCode: "T4",
    parentId: "ARC834",
    title: "Contrast parameter coverage with prediction or a one-sided bound.",
    focus: "Decide whether the target is a fixed model parameter, a future random observation or a one-sided parameter bound, then construct and interpret the appropriate interval/bound without recycling a confidence interval for the wrong target.",
    purpose: "Separate three statements that often share similar algebra but answer different probability questions: confidence about an unknown fixed parameter, prediction of a future random quantity, and one-sided coverage for a parameter.",
    centralCapability: "Read the target of inference from the problem statement, choose or derive the corresponding pivot including any additional future-observation variability, and state the correct coverage or prediction probability without conditioning on the realised interval after the fact.",
    principalObstacle: "Treating a 95% confidence interval for a mean as if 95% of future observations fall inside it, or converting a two-sided interval to a one-sided bound without reallocating alpha, confuses the random object whose probability is being controlled.",
    entryPrerequisites: ["T4.1 pivot inversion and quantile conventions", "N2 exact normal pivots and independence", "J3/J4 conditional and predictive probability language"],
    requiredOwnership: [
      "Identify whether the unknown target is fixed across repetitions or newly random in each repetition",
      "Explain why a confidence interval for mu does not automatically predict X_new",
      "Include the extra variance term contributed by a future observation when constructing a normal prediction interval",
      "Use a one-sided tail allocation alpha rather than alpha/2 for a one-sided confidence bound",
      "State the exact or approximate assumptions behind the bound or interval",
      "Interpret confidence as long-run parameter coverage rather than a posterior probability for the realised parameter",
      "Interpret prediction as repeated-sampling coverage of a future random outcome under the model",
      "Check that the requested direction of a bound matches the alternative or practical claim being made"
    ],
    inScope: [
      "Normal-model prediction intervals for one future observation when an exact pivot is available",
      "One-sided confidence bounds obtained by pivot inversion",
      "Comparison of parameter intervals and prediction intervals",
      "Coverage interpretation for fixed versus future-random targets"
    ],
    outOfScope: [
      "Simultaneous prediction bands",
      "Tolerance intervals",
      "Bayesian posterior predictive intervals",
      "Large-sample plug-in intervals, which begin in T5"
    ],
    applicationScope: "Entrance questions that deliberately change the inferential target—from a mean or variance to a future observation or one-sided guarantee—and test whether the learner adjusts both the pivot and interpretation.",
    transferScope: "A superficially familiar normal problem where the same sample statistics appear but the target changes, forcing the learner to detect the added prediction variance or the changed one-sided tail allocation.",
    exitCondition: "Given one fixed-parameter problem and one future-observation or one-sided-bound problem, construct the correct interval/bound for each and explain precisely why their probability statements are not interchangeable.",
    nextArcBoundary: "139 T5.1 leaves exact pivot inversion and begins CLT-based approximate testing or confidence intervals with explicit plug-in and reliability conditions."
  }
];
