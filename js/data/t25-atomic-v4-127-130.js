// Individually authored T25 M.Stat audited-v4 cards 127-130.
export const T25_ATOMIC_V4_127_130 = [
  {
    id: "T25-ARC831-A1127",
    routeOrder: 127,
    syllabusCode: "E5.1",
    targetCode: "E5",
    parentId: "ARC831",
    title: "Factor a likelihood with its support to establish sufficiency.",
    focus: "Use the factorisation criterion on the actual likelihood, including any parameter-dependent support, to identify a statistic that retains all sample information relevant to the parameter.",
    purpose: "Make sufficiency an information-preservation statement grounded in the full likelihood rather than a pattern-matched claim based only on familiar algebraic summaries.",
    centralCapability: "Factor a likelihood into a parameter-and-statistic term times a parameter-free remainder while preserving support restrictions, then state and justify a sufficient statistic.",
    principalObstacle: "Dropping a support indicator, hiding parameter dependence in the alleged remainder, or naming a familiar statistic without a valid factorisation can falsely certify sufficiency.",
    entryPrerequisites: ["E3 likelihood construction", "D1 support-aware laws", "J3 conditional and joint laws"],
    requiredOwnership: [
      "Write the full likelihood for the observed sample before attempting factorisation",
      "Retain every parameter-dependent support or feasibility indicator",
      "Separate the likelihood into a parameter/statistic factor and a parameter-free sample factor",
      "Identify exactly which sample features enter the parameter-dependent factor",
      "Explain why the displayed factorisation satisfies the sufficiency criterion",
      "Recognise when a proposed summary omits support information and is therefore insufficient",
      "Distinguish sufficiency from unbiasedness, consistency and efficiency"
    ],
    inScope: [
      "Neyman-Fisher factorisation for elementary one-parameter families",
      "Parameter-dependent support carried inside the sufficient statistic when necessary",
      "Likelihood-based identification of low-dimensional sufficient summaries",
      "Direct comparison of plausible statistics by retained likelihood information"
    ],
    outOfScope: [
      "Minimal sufficiency via general likelihood-ratio equivalence classes",
      "Sigma-field formulations of sufficiency",
      "Ancillarity and Basu's theorem",
      "General exponential-family theory beyond the specific factorisation used"
    ],
    applicationScope: "Entrance-level families where the sample enters the likelihood through sums, counts, extrema or support restrictions and the task is to justify, not merely guess, a sufficient statistic.",
    transferScope: "An unfamiliar family with a nonstandard support condition where the learner must decide which sample features the parameter-dependent likelihood genuinely needs.",
    exitCondition: "Given a one-parameter sample model, write the complete likelihood, factor it with all support restrictions visible, and justify a sufficient statistic while rejecting one plausible information-losing alternative.",
    nextArcBoundary: "128 E5.2 tests whether sufficiency survives a recoding and why many-to-one coarsening can destroy parameter information even when the original statistic was sufficient."
  },
  {
    id: "T25-ARC831-A1128",
    routeOrder: 128,
    syllabusCode: "E5.2",
    targetCode: "E5",
    parentId: "ARC831",
    title: "Test what happens when a sufficient statistic is recoded or coarsened.",
    focus: "Determine whether sufficiency is preserved under a one-to-one transformation of a sufficient statistic and diagnose information loss under many-to-one coarsening using factorisation or conditional-law reasoning.",
    purpose: "Prevent the false idea that any function of a sufficient statistic remains sufficient by separating reversible recoding from irreversible compression.",
    centralCapability: "Prove sufficiency is preserved by an invertible recoding, and show why a coarsened statistic may fail by exhibiting parameter dependence that the coarsening no longer retains.",
    principalObstacle: "Confusing 'function of a sufficient statistic' with 'sufficient' ignores whether the transformation is reversible and can erase distinctions that the likelihood still needs.",
    entryPrerequisites: ["E5.1 factorisation and support-aware sufficiency", "F3 functions and inverse mappings", "J3 conditional laws"],
    requiredOwnership: [
      "Explain why a one-to-one transform of a sufficient statistic is sufficient",
      "Recover the original sufficient statistic from an invertible recoding",
      "Distinguish invertible recoding from many-to-one coarsening",
      "Test a coarsened statistic by rebuilding the likelihood factorisation or a conditional law",
      "Exhibit the parameter-relevant distinction lost by an insufficient coarsening",
      "Avoid using unbiasedness or consistency as evidence for sufficiency",
      "State the conclusion for the exact statistic supplied rather than a nearby familiar summary"
    ],
    inScope: [
      "One-to-one recodings of sufficient statistics",
      "Many-to-one coarsening and information loss",
      "Factorisation-based sufficiency checks after transformation",
      "Elementary conditional-distribution checks of sufficiency"
    ],
    outOfScope: [
      "Blackwell ordering of experiments",
      "Deficiency and statistical decision theory",
      "General minimal-sufficiency theory",
      "Measure-theoretic equivalence of generated sigma-fields"
    ],
    applicationScope: "Entrance problems asking whether replacing a sufficient statistic by its square, sign, rounded value, indicator, or other transformed summary preserves all parameter information.",
    transferScope: "A novel transformation where the learner must first decide whether it is invertible on the statistic's legal range before claiming sufficiency is preserved.",
    exitCondition: "Given one invertible recoding and one coarsening of a sufficient statistic, justify the first as sufficient and prove or disprove sufficiency of the second from likelihood or conditional-law information.",
    nextArcBoundary: "129 E6.1 uses a sufficient statistic operationally: condition an unbiased estimator on it and prove the resulting Rao-Blackwell estimator has no larger variance."
  },
  {
    id: "T25-ARC831-A1129",
    routeOrder: 129,
    syllabusCode: "E6.1",
    targetCode: "E6",
    parentId: "ARC831",
    title: "Improve an unbiased estimator by conditioning on a sufficient statistic.",
    focus: "Apply Rao-Blackwell to an unbiased estimator by computing its conditional expectation given a sufficient statistic, then verify unbiasedness and the resulting variance improvement.",
    purpose: "Turn sufficiency from a structural label into an estimator-improvement tool while keeping clear that variance reduction alone does not yet prove global minimum variance.",
    centralCapability: "Compute a Rao-Blackwellised estimator explicitly and justify its unbiasedness and variance comparison by conditional expectation and total variance.",
    principalObstacle: "Conditioning on the wrong statistic, failing to compute the conditional expectation as a function of the sufficient statistic alone, or declaring UMVU merely because variance decreased over one starting estimator.",
    entryPrerequisites: ["E5 sufficient statistics", "J4 total expectation and variance", "E1 bias and variance"],
    requiredOwnership: [
      "Start from an estimator whose unbiasedness for the target is established",
      "Condition on a statistic already justified as sufficient",
      "Compute or characterise E[U|T] as a function of T alone",
      "Use total expectation to verify the conditioned estimator remains unbiased",
      "Use total variance or the Rao-Blackwell theorem to show variance cannot increase",
      "Identify when the improvement is strict versus equal",
      "State explicitly that Rao-Blackwell improvement alone is not a UMVU certificate"
    ],
    inScope: [
      "Elementary Rao-Blackwell calculations",
      "Conditional expectation given a sufficient count, sum or order statistic",
      "Unbiasedness preservation under conditioning",
      "Variance comparison through total variance"
    ],
    outOfScope: [
      "General Hilbert-space projection theory",
      "Doob martingales",
      "Bayesian conditional estimators",
      "Automatic UMVU claims without a separate completeness or bound argument"
    ],
    applicationScope: "Entrance-level models where a simple unbiased estimator can be conditioned on a low-dimensional sufficient statistic to produce a cleaner estimator with weakly smaller variance.",
    transferScope: "A new unbiased estimator/sufficient-statistic pair where the learner must derive the conditional expectation rather than rely on a memorised improved estimator.",
    exitCondition: "Given an unbiased estimator and sufficient statistic, compute the Rao-Blackwellised estimator, prove it is unbiased, compare variances correctly, and state why this alone does not establish minimum variance among all unbiased estimators.",
    nextArcBoundary: "130 E6.2 adds the missing certificate: either completeness plus Lehmann-Scheffe or an attained information bound under valid regularity conditions."
  },
  {
    id: "T25-ARC831-A1130",
    routeOrder: 130,
    syllabusCode: "E6.2",
    targetCode: "E6",
    parentId: "ARC831",
    title: "Use one justified completeness or information-bound certificate of minimum variance.",
    focus: "Certify a minimum-variance unbiased estimator using either completeness plus sufficiency or an attained Cramer-Rao bound in a regular standard model, with every hypothesis and comparator class stated.",
    purpose: "Separate genuine optimality proofs from mere local variance comparisons and make regularity assumptions visible, especially where moving support invalidates routine information-bound arguments.",
    centralCapability: "Recognise and execute one valid UMVU/minimum-variance certificate, and refuse a Cramer-Rao argument when its differentiability/support hypotheses are not satisfied.",
    principalObstacle: "Calling the smallest variance seen so far 'minimum variance', invoking completeness without proving or being given it, or applying Cramer-Rao blindly to parameter-dependent-support models can produce false optimality claims.",
    entryPrerequisites: ["E6.1 Rao-Blackwell improvement", "E5 sufficiency", "C3 differentiation", "E1 unbiasedness and variance"],
    requiredOwnership: [
      "State the unbiased comparator class for the minimum-variance claim",
      "Use a supplied or established complete sufficient statistic with Lehmann-Scheffe correctly",
      "Explain why a function of a complete sufficient statistic that is unbiased is unique in the relevant class",
      "State the regularity assumptions needed before using a Cramer-Rao information bound",
      "Compute the score/information and compare an estimator variance to the bound in a standard regular model",
      "Recognise attainment of the bound as a valid certificate only when the hypotheses hold",
      "Reject routine Cramer-Rao use in moving-support models and state that another argument is required"
    ],
    inScope: [
      "One elementary Lehmann-Scheffe certificate",
      "One attained Cramer-Rao bound in a regular standard family",
      "Explicit comparator-class and regularity statements",
      "Recognition of moving-support failure of standard information-bound machinery"
    ],
    outOfScope: [
      "General information geometry",
      "Bhattacharyya or Chapman-Robbins bounds",
      "Semiparametric efficiency",
      "Full completeness theory for arbitrary exponential families"
    ],
    applicationScope: "Entrance problems asking for a justified UMVU/minimum-variance conclusion in a familiar regular family or from a complete sufficient statistic supplied or established in the problem.",
    transferScope: "An unfamiliar optimality claim where the learner must decide which certificate, if any, is legally available before doing algebra and must identify a failed regularity condition when none is.",
    exitCondition: "For one estimator, give a valid completeness/Lehmann-Scheffe or attained-Cramer-Rao certificate of minimum variance with hypotheses stated, and explain why the same argument may fail for a moving-support model.",
    nextArcBoundary: "131 T1.1 leaves point estimation and starts hypothesis testing: size, power and error probabilities for a specified rejection rule."
  }
];
