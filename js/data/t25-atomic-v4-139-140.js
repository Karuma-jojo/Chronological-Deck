// Individually authored T25 M.Stat audited-v4 cards 139-140.
export const T25_ATOMIC_V4_139_140 = [
  {
    id: "T25-ARC834-A1139",
    routeOrder: 139,
    syllabusCode: "T5.1",
    targetCode: "T5",
    parentId: "ARC834",
    title: "Construct one CLT-based test or confidence interval.",
    focus: "Use a justified central-limit approximation to standardise an estimator, insert any plug-in standard error only where consistency makes that replacement legal, and construct one asymptotic test or confidence interval with its approximation status stated explicitly.",
    purpose: "Separate genuinely approximate large-sample inference from the exact pivot methods of T4, while preserving the sampling target, scale and tail convention throughout the construction.",
    centralCapability: "Identify an asymptotically normal estimator, derive or recognise its limiting variance, replace unknown nuisance quantities only with justified consistent estimates, and translate the resulting standardisation into a test or confidence interval.",
    principalObstacle: "Writing a z-shaped formula does not make an argument asymptotically valid: the CLT conditions, centring, scaling and plug-in step must all match the actual estimator and parameter regime.",
    entryPrerequisites: ["T4 exact pivot inversion and coverage", "L3 CLT standardisation and plug-in approximations", "T1 test size and rejection language"],
    requiredOwnership: [
      "State the estimator and fixed parameter being targeted before standardising",
      "Identify the CLT or asymptotic-normality statement being used and its centring and scaling",
      "Derive the asymptotic variance rather than importing an unrelated standard error",
      "Use a consistent plug-in estimate only when Slutsky-type replacement is justified by established convergence",
      "Construct the requested one- or two-sided rejection region or interval using a declared normal-quantile convention",
      "Label the resulting inference as approximate/asymptotic rather than exact",
      "For a sample proportion, distinguish the null standard error used in a test from a plug-in standard error commonly used in an interval"
    ],
    inScope: [
      "CLT-based inference for sample means with finite variance",
      "Large-sample inference for a binomial/sample proportion",
      "Consistent plug-in standard errors in elementary one-parameter settings",
      "Approximate normal critical values and confidence intervals"
    ],
    outOfScope: [
      "Delta-method inference for general nonlinear functionals beyond what is explicitly supplied",
      "Bootstrap or resampling confidence intervals",
      "General M-estimation or sandwich covariance theory",
      "Higher-order asymptotic corrections"
    ],
    applicationScope: "Entrance questions that ask for a large-sample z-style test or interval when an exact finite-sample pivot is unavailable but a CLT and a justified standard-error estimate are available.",
    transferScope: "An unfamiliar estimator whose asymptotic normal form is supplied or easily derived, requiring the learner to map its limiting variance to a legal plug-in standard error and state the result as approximate rather than exact.",
    exitCondition: "Starting from a stated CLT or a standard sample-mean/proportion setting, derive the standardised statistic, justify any plug-in variance estimate, and construct the requested asymptotic test or confidence interval with its target and approximation status explicit.",
    nextArcBoundary: "140 T5.2 stress-tests the approximation by identifying boundary, small-sample or unstable plug-in regimes in which the nominal normal calibration can fail badly."
  },
  {
    id: "T25-ARC834-A1140",
    routeOrder: 140,
    syllabusCode: "T5.2",
    targetCode: "T5",
    parentId: "ARC834",
    title: "State why a boundary, small sample or plug-in assumption can invalidate it.",
    focus: "Diagnose when a CLT-based test or confidence interval is poorly calibrated because the sample is too small, the true parameter lies near a boundary, the estimated standard error can degenerate, or the plug-in approximation is unstable.",
    purpose: "Make asymptotic inference conditional on its regime of validity rather than a universal replacement for exact probability calculations.",
    centralCapability: "Inspect an approximate test or interval, identify the assumption carrying its normal calibration, and explain concretely how small counts, parameter boundaries or unstable nuisance estimation can distort size or coverage.",
    principalObstacle: "Treating asymptotic validity as a guarantee at every finite n, or checking only the nominal formula while ignoring discreteness and boundary degeneracy, can produce intervals outside the parameter space and tests with badly distorted size.",
    entryPrerequisites: ["T5.1 CLT-based construction", "D1 discrete support and exact probabilities", "T4 exact coverage interpretation"],
    requiredOwnership: [
      "Distinguish an asymptotic statement from a finite-sample guarantee",
      "Recognise sparse-count regimes in which a normal approximation to a binomial or similar count can be poor",
      "Explain why a parameter near 0 or 1 can make a Wald proportion interval unstable or leave the legal parameter space",
      "Identify when a plug-in standard error is nearly zero, highly variable or otherwise unreliable",
      "Compare an approximate procedure with an available exact alternative when the problem supplies one",
      "State whether the main failure concerns size, coverage, interval geometry or standard-error estimation",
      "Avoid inventing a universal numerical sample-size threshold when the approximation quality depends on the underlying parameter"
    ],
    inScope: [
      "Small-sample failure of elementary normal approximations",
      "Boundary behaviour for proportions and other constrained parameters",
      "Instability of plug-in standard errors",
      "Qualitative comparison of approximate versus exact finite-sample inference"
    ],
    outOfScope: [
      "Berry-Esseen rate calculations unless explicitly supplied",
      "Variance-stabilising transforms as a separate theory",
      "Bootstrap diagnostics",
      "Advanced robust or higher-order asymptotic methods"
    ],
    applicationScope: "Entrance questions that present a familiar large-sample interval or test and ask whether its calibration is credible for the stated n, observed counts or parameter boundary.",
    transferScope: "A new bounded or discrete model where the learner must inspect the standard-error formula and support, then identify why nominal Gaussian calibration can fail even though the formal CLT statement is asymptotically correct.",
    exitCondition: "Given one asymptotic test or interval, identify the exact approximation and plug-in assumptions it uses, exhibit a concrete boundary or small-sample regime where they become unreliable, and state which inferential guarantee is thereby compromised.",
    nextArcBoundary: "141 T6.1 leaves approximate Gaussian inference and starts an exact sign/count test by defining Bernoulli signs, their null probability and the treatment of zero differences."
  }
];
