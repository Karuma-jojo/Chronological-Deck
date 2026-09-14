// Individually authored T25 M.Stat audited-v4 cards 135-136.
export const T25_ATOMIC_V4_135_136 = [
  {
    id: "T25-ARC835-A1135",
    routeOrder: 135,
    syllabusCode: "T3.1",
    targetCode: "T3",
    parentId: "ARC835",
    title: "Select and derive a normal mean or variance test.",
    focus: "Choose the correct z, t or chi-square pivot for a one-sample normal mean or variance problem from the stated known/unknown quantities, then derive the rejection region with the correct null law, degrees of freedom and tail direction.",
    purpose: "Turn normal-model testing into a legality check on assumptions and pivots rather than pattern-matching a formula from the appearance of a ratio.",
    centralCapability: "Read a normal-model testing problem, identify the exact parameter being tested and what nuisance quantities are known, derive the appropriate null pivot, and calibrate a one- or two-sided rejection rule from its exact distribution.",
    principalObstacle: "Automatically using z when sigma is estimated, calling any normal-over-square-root expression t, or forgetting that variance tests use a chi-square pivot with n-1 degrees of freedom leads to formally plausible but invalid tests.",
    entryPrerequisites: ["T1 size, power and rejection-rule language", "N2 exact chi-square/t/F pivots and independence", "D3 standard normal law; D4 chi-square as a gamma law"],
    requiredOwnership: [
      "State the null and alternative before selecting a statistic",
      "Distinguish known sigma from unknown sigma in a mean test",
      "Use a standard normal pivot only when its variance scale is genuinely known",
      "Use the t pivot only after establishing the normal numerator, independent chi-square denominator and correct degrees of freedom",
      "Use (n-1)S^2/sigma0^2 with chi-square n-1 for a normal variance test",
      "Choose upper, lower or two-sided critical regions from the alternative rather than from memorised symmetry",
      "Express the rejection threshold using declared null quantiles and verify the test's null calibration"
    ],
    inScope: [
      "One-sample normal mean tests with known variance",
      "One-sample normal mean tests with unknown variance",
      "One-sample normal variance tests",
      "One-sided and two-sided exact critical regions with explicit degrees of freedom"
    ],
    outOfScope: [
      "Generalized likelihood-ratio derivations for arbitrary models",
      "Non-normal robustness theory",
      "Asymptotic z tests when the exact normal-model pivot is unavailable",
      "Two-sample and ANOVA equivalence, which belongs to T3.2"
    ],
    applicationScope: "Entrance problems asking which exact normal-model test is legal, what its statistic and degrees of freedom are, and how its rejection region changes with the stated alternative.",
    transferScope: "An unfamiliar-looking statistic where the learner must decompose numerator and denominator into the N2 pivot ingredients and either justify the named law or reject the claimed z/t/chi-square form.",
    exitCondition: "Given one mean-testing case and one variance-testing case under normal sampling, derive the legal pivot, state its exact null law and degrees of freedom, and calibrate the correct one- or two-sided rejection region without formula guessing.",
    nextArcBoundary: "136 T3.2 moves from one-sample normal pivots to two-sample mean comparison and the exact equivalence with a two-group one-way ANOVA when their assumptions coincide."
  },
  {
    id: "T25-ARC835-A1136",
    routeOrder: 136,
    syllabusCode: "T3.2",
    targetCode: "T3",
    parentId: "ARC835",
    title: "Compare a two-sample test and its equivalent two-group ANOVA when assumptions match.",
    focus: "Derive the equal-variance two-sample normal mean test and show how its squared t statistic matches the one-factor, two-group ANOVA F statistic under the same independent normal, common-variance assumptions.",
    purpose: "Unify two procedures that often look unrelated while making clear that their equivalence disappears when the sampling assumptions, variance treatment or sidedness no longer match.",
    centralCapability: "Construct the pooled two-sample t statistic with the correct standard error and n1+n2-2 degrees of freedom, derive the corresponding two-group ANOVA decomposition, and establish F=t^2 for the matching two-sided hypothesis.",
    principalObstacle: "Using a pooled variance without a common-variance assumption, confusing paired and independent samples, or claiming that a two-sided ANOVA F test reproduces a one-sided t test erases the conditions under which the equivalence is actually true.",
    entryPrerequisites: ["T3.1 exact normal mean/variance test selection", "N2 t and F pivots with degrees of freedom", "M5 squared-length decomposition for orthogonal components"],
    requiredOwnership: [
      "Distinguish independent two-sample data from paired observations",
      "State the independent normal and common-variance assumptions before pooling",
      "Form the pooled variance with n1+n2-2 residual degrees of freedom",
      "Build the standard error for Xbar1-Xbar2 using the pooled variance",
      "State the exact t law under the equal-means null",
      "Decompose total variation into between-group and within-group sums of squares for two groups",
      "Show that the two-group ANOVA statistic satisfies F(1,n1+n2-2)=t^2 for the matching two-sided test",
      "Explain why unequal-variance, paired or one-sided alternatives require a different comparison"
    ],
    inScope: [
      "Independent two-sample pooled t tests under equal normal variances",
      "Two-group one-way ANOVA sums of squares and degrees of freedom",
      "Exact algebraic equivalence F=t^2",
      "Comparison of assumptions, null hypotheses and two-sided rejection decisions"
    ],
    outOfScope: [
      "Welch-Satterthwaite approximations beyond identifying that pooling is illegal",
      "Paired t-test derivation",
      "ANOVA with three or more groups",
      "General linear models or multiple-comparison procedures"
    ],
    applicationScope: "Entrance questions that present the same two-group normal data through either a two-sample t-test or one-way ANOVA and ask for the statistic, degrees of freedom, assumptions or equivalence.",
    transferScope: "A problem where the learner must detect that a claimed t/ANOVA equivalence fails because variances are not assumed equal, samples are paired, or the t alternative is one-sided while ANOVA is inherently nondirectional.",
    exitCondition: "For two independent normal samples with a common unknown variance, derive the pooled t test and two-group ANOVA F test, prove F=t^2 with matching degrees of freedom, and state exactly which assumption or alternative changes break that equivalence.",
    nextArcBoundary: "137 T4.1 leaves hypothesis-test rejection regions and starts confidence-interval construction by inverting a genuine parameter-free pivot with an explicit quantile-tail convention."
  }
];
