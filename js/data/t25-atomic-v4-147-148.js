// Individually authored T25 M.Stat audited-v4 cards 147-148.
export const T25_ATOMIC_V4_147_148 = [
  {
    id: "T25-ARC838-A1147",
    routeOrder: 147,
    syllabusCode: "R4.1",
    targetCode: "R4",
    parentId: "ARC838",
    title: "Derive a t contrast or nested-model F test under normal errors.",
    focus: "Under the normal linear model, derive exact inference for an estimable linear contrast or for a set of linear restrictions by connecting R3 covariance geometry to the t and F pivots already established in T3.",
    purpose: "Keep regression inference anchored to model assumptions, estimability and residual degrees of freedom instead of treating every reported coefficient or RSS difference as automatically testable.",
    centralCapability: "Given a fixed-design normal linear model and a stated coefficient contrast or nested-model null, derive the correct standard error or extra-sum-of-squares statistic, identify the exact t or F null law, and calibrate the rejection rule with the correct numerator and denominator degrees of freedom.",
    principalObstacle: "The main trap is importing t/F formulas without checking estimability, normal-error assumptions, model nesting, rank differences or the correct residual variance estimator; the algebra can look familiar while the inference is illegal.",
    entryPrerequisites: ["R3 fixed-design OLS covariance and estimability", "T3 exact t and F testing under normal models", "T4 pivotal confidence-interval logic"],
    requiredOwnership: [
      "State the normal linear model assumptions needed for exact finite-sample t/F inference",
      "Check that a requested linear contrast is estimable before assigning it a standard error",
      "Derive Var(c^T beta_hat)=sigma^2 c^T(X^TX)^{-1}c in the full-rank case",
      "Replace sigma^2 by the residual mean square with residual degrees of freedom n-rank(X)",
      "Form the exact t statistic for one estimable restriction and identify its residual degrees of freedom",
      "For nested models, express the numerator through the reduction in residual sum of squares divided by the rank difference",
      "Form the exact nested-model F statistic and state both numerator and denominator degrees of freedom",
      "Distinguish a one-dimensional t test from a multi-restriction F test and recognise the F=t^2 equivalence when the restriction count is one"
    ],
    inScope: [
      "Exact t tests for estimable linear contrasts in a normal fixed-design linear model",
      "Exact F tests for nested linear-model restrictions",
      "Residual variance estimation and residual degrees of freedom",
      "Rank-difference accounting for the numerator degrees of freedom"
    ],
    outOfScope: [
      "Asymptotic sandwich or heteroskedasticity-robust regression inference",
      "Generalized linear models or nonlinear regression",
      "Model-selection criteria such as AIC or BIC",
      "Mean-response and prediction intervals, which belong to R4.2"
    ],
    applicationScope: "Entrance problems asking for a regression coefficient/contrast test, a joint test of several linear restrictions, or an exact nested-model comparison under normal homoskedastic errors.",
    transferScope: "A disguised nested-model question where the learner must recover the restriction dimension from ranks, reject a non-estimable contrast, or recognise that a claimed t/F law fails because normality, nesting or the residual degrees of freedom are wrong.",
    exitCondition: "Given one estimable contrast problem and one nested-model comparison under a normal linear model, independently derive the legal t or F statistic, state every degree of freedom, and explain why a plausible incorrect test is invalid.",
    nextArcBoundary: "148 R4.2 keeps the same normal linear model but shifts from testing restrictions to interval estimation for a mean response versus prediction of a future observation."
  },
  {
    id: "T25-ARC838-A1148",
    routeOrder: 148,
    syllabusCode: "R4.2",
    targetCode: "R4",
    parentId: "ARC838",
    title: "Construct mean-response and prediction intervals and explain their difference.",
    focus: "Construct exact t-based intervals at a stated covariate vector for the unknown conditional mean and for a future response, and isolate the extra irreducible observation-noise term that makes prediction wider.",
    purpose: "Prevent the common collapse of estimation and prediction into one formula by forcing the target random quantity, variance decomposition and leverage contribution to be identified before an interval is written.",
    centralCapability: "For a fixed covariate vector x0 under the normal linear model, derive the standard error for x0^T beta_hat, add the new-observation variance when predicting Y0, and use the residual t pivot to build and interpret both intervals with the same declared confidence level.",
    principalObstacle: "Using the mean-response standard error for prediction omits future noise, while treating x0 as random or ignoring leverage changes the target and variance; another trap is giving a confidence interval for a realised future observation rather than a prediction interval.",
    entryPrerequisites: ["R4.1 exact regression t/F inference", "R3 covariance of beta_hat and projection geometry", "T4 distinction between parameter coverage and prediction"],
    requiredOwnership: [
      "Define the mean-response target x0^T beta separately from a future observation Y0 at x0",
      "Derive Var(x0^T beta_hat)=sigma^2 x0^T(X^TX)^{-1}x0 in the full-rank fixed-design case",
      "Use the residual mean square and residual t degrees of freedom for exact interval construction",
      "Construct the confidence interval for the conditional mean response",
      "Add sigma^2 for independent future observation noise when constructing the prediction interval",
      "Explain why the prediction interval is wider at the same x0 and confidence level",
      "Track leverage through x0^T(X^TX)^{-1}x0 and explain how extrapolation inflates uncertainty",
      "Interpret repeated-sampling coverage without assigning posterior probability to the fixed unknown mean"
    ],
    inScope: [
      "Exact mean-response confidence intervals in the normal fixed-design linear model",
      "Exact single-future-observation prediction intervals",
      "Leverage contribution to interval width",
      "Comparison of parameter-estimation uncertainty with additional future-response noise"
    ],
    outOfScope: [
      "Simultaneous confidence bands such as Scheffe or Working-Hotelling bands",
      "Random-design regression theory",
      "Heteroskedastic or autocorrelated prediction intervals",
      "Survey-sampling variance and finite-population correction, which begin at S1"
    ],
    applicationScope: "Entrance questions that ask for a regression confidence interval at a covariate value, a future-response prediction interval, or a conceptual comparison of the two widths and their variance terms.",
    transferScope: "An unfamiliar interval formula where the learner must decide whether the target is a fixed conditional mean or a future random response and detect a missing or extra sigma-squared term, wrong leverage term, or wrong residual degrees of freedom.",
    exitCondition: "At a stated x0, derive both the exact mean-response and future-response intervals under the normal linear model, identify every variance component and degree of freedom, and explain precisely why the prediction interval has extra uncertainty.",
    nextArcBoundary: "149 S1.1 leaves model-based regression inference and begins design-based simple random sampling, where randomness comes from the sampling design and finite-population conventions must be declared explicitly."
  }
];
