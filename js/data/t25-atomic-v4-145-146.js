// Individually authored T25 M.Stat audited-v4 cards 145-146.
export const T25_ATOMIC_V4_145_146 = [
  {
    id: "T25-ARC837-A1145",
    routeOrder: 145,
    syllabusCode: "R3.1",
    targetCode: "R3",
    parentId: "ARC837",
    title: "Derive a coefficient covariance or omitted-variable bias.",
    focus: "Work from the fixed-design multiple-regression model to derive coefficient expectation/covariance under zero-mean homoskedastic uncorrelated errors, and diagnose the direction and source of omitted-variable bias when a relevant regressor is excluded.",
    purpose: "Replace memorised matrix formulas with a derivation that separates algebraic projection facts from stochastic assumptions and makes bias mechanisms visible rather than mystical.",
    centralCapability: "Given a full-column-rank design matrix, derive beta-hat, its expectation and covariance, identify the exact assumptions needed for each statement, and express the omitted-variable bias term for a reduced model in projection/cross-product form.",
    principalObstacle: "Treating normality as necessary for unbiasedness/covariance, ignoring the fixed-design/full-rank assumptions, or asserting omitted-variable bias merely because a variable is omitted instead of checking both relevance and correlation with retained regressors.",
    entryPrerequisites: ["R2 normal equations and residual orthogonality", "M2 linear systems and rank", "M5 projection and quadratic-form geometry"],
    requiredOwnership: [
      "Write the full-rank least-squares estimator as (X'X)^(-1)X'Y",
      "Derive E[beta-hat]=beta from E[epsilon]=0 without invoking normality",
      "Derive Cov(beta-hat)=sigma^2(X'X)^(-1) under homoskedastic uncorrelated errors",
      "State what changes when the error covariance is not sigma^2 I",
      "Partition the design into retained and omitted regressors and derive the reduced-model expectation",
      "Identify that omitted-variable bias requires an omitted effect plus nonzero projection/correlation with retained regressors",
      "Distinguish algebraic design rank conditions from probabilistic distribution assumptions"
    ],
    inScope: [
      "Fixed-design full-column-rank multiple regression",
      "Coefficient unbiasedness under zero-mean errors",
      "Coefficient covariance under homoskedastic uncorrelated errors",
      "Elementary omitted-variable bias derivation using partitioned regressors or projection"
    ],
    outOfScope: [
      "Generalised least squares derivations beyond identifying the changed covariance form",
      "Heteroskedasticity-consistent sandwich estimators",
      "Endogeneity/instrumental-variable theory",
      "t/F inference, which belongs to R4"
    ],
    applicationScope: "Entrance problems asking for a coefficient variance/covariance, an unbiasedness check, or the sign/form of omitted-variable bias under a stated fixed-design linear model.",
    transferScope: "An unfamiliar regression specification where the learner must decide which conclusions survive without normality or homoskedasticity, and derive the bias created by projecting an omitted signal onto included columns.",
    exitCondition: "For a stated multiple-regression model, derive beta-hat expectation and covariance with each assumption declared, and derive one omitted-variable bias expression while explaining precisely when that bias is zero.",
    nextArcBoundary: "146 R3.2 moves from full-rank coefficient behaviour to rank-deficient designs, where separate coefficients may fail to be identifiable even though some linear combinations remain estimable."
  },
  {
    id: "T25-ARC837-A1146",
    routeOrder: 146,
    syllabusCode: "R3.2",
    targetCode: "R3",
    parentId: "ARC837",
    title: "Identify an estimable linear combination when separate coefficients are not identifiable.",
    focus: "Analyse a rank-deficient design by distinguishing non-unique coefficient vectors from unique fitted values, and determine whether a requested linear combination of coefficients is invariant across all solutions and hence estimable.",
    purpose: "Make nonidentifiability concrete: singularity does not mean the regression problem contains no information, only that the data identify certain directions/combinations rather than every coordinate separately.",
    centralCapability: "Detect column dependence, characterise the null-space ambiguity in beta, identify estimable contrasts as those orthogonal to the coefficient null space/equivalently lying in the row space of X, and compute residual degrees of freedom from rank rather than column count.",
    principalObstacle: "Declaring every coefficient or contrast meaningless once X'X is singular, using p rather than rank(X) for residual degrees of freedom, or assuming a particular generalized-inverse solution gives uniquely identified individual coefficients.",
    entryPrerequisites: ["R3.1 full-rank covariance/bias derivation", "M2 rank, null spaces and solution sets", "M5 projections onto column spaces"],
    requiredOwnership: [
      "Detect rank deficiency from linear dependence among design columns",
      "Explain why beta and beta+h generate the same fitted mean whenever Xh=0",
      "Distinguish non-uniqueness of coefficients from uniqueness of the projection X beta-hat",
      "Test whether c'beta is invariant over the null-space ambiguity",
      "Recognise the row-space/orthogonality criterion for estimability",
      "Compute residual degrees of freedom as n-rank(X)",
      "Avoid interpreting one generalized-inverse coefficient vector as uniquely identified parameters"
    ],
    inScope: [
      "Rank-deficient fixed-design linear models",
      "Null-space ambiguity of coefficient vectors",
      "Estimability of linear combinations/contrasts",
      "Residual degrees of freedom based on design rank"
    ],
    outOfScope: [
      "General Moore-Penrose pseudoinverse theory beyond what is needed for one regression problem",
      "Regularisation methods such as ridge or lasso",
      "Bayesian identification",
      "Regression t/F tests and confidence intervals, which begin in R4"
    ],
    applicationScope: "Entrance problems with aliased columns, redundant dummy coding or linear constraints where the task is to identify what coefficient information is actually recoverable and what the correct residual degrees of freedom are.",
    transferScope: "A disguised singular design where the learner must find a null-space relation and decide whether a proposed contrast changes under beta -> beta+h, rather than relying on whether a software coefficient happens to be printed.",
    exitCondition: "Given one rank-deficient design, exhibit a coefficient ambiguity, identify at least one estimable and one non-estimable linear combination with justification, and compute residual degrees of freedom from rank(X).",
    nextArcBoundary: "147 R4.1 adds normal-error distributional assumptions and begins formal regression inference through t contrasts and nested-model F tests; those inferential claims are deliberately absent from R3."
  }
];
