// Individually authored T25 M.Stat audited-v4 cards 155-156.
export const T25_ATOMIC_V4_155_156 = [
  {
    id: "T25-ARC839-A1155",
    routeOrder: 155,
    syllabusCode: "V1.1",
    targetCode: "V1",
    parentId: "ARC839",
    title: "Specify a CRD model and derive its sum-of-squares decomposition.",
    focus: "Build one-way completely randomized design analysis from the treatment-plus-error model and randomization structure, then derive the total, treatment and error sum-of-squares decomposition rather than memorizing an ANOVA table.",
    purpose: "Tie one-way ANOVA to experimental design: treatment labels are assigned by randomization, the additive model states what is being compared, and the sum-of-squares identity follows from orthogonal decomposition around treatment means and the grand mean.",
    centralCapability: "Given a balanced or elementary unbalanced one-factor completely randomized experiment, state the treatment/error model, identify the role of random assignment, define treatment and grand means, and derive SSTotal = SSTreatments + SSE with the corresponding degrees-of-freedom accounting.",
    principalObstacle: "The main trap is treating any grouped observational data as a CRD, writing ANOVA formulas without stating the design/model, or using degrees of freedom and sums of squares that do not match the number of treatments and observations.",
    entryPrerequisites: ["R2 least-squares minimisation and residual decomposition", "T3 normal-model testing", "N2 chi-square/F construction under normal models"],
    requiredOwnership: [
      "State a one-way CRD model such as Y_ij=mu+tau_i+epsilon_ij with an explicit identifiability convention",
      "Explain that treatments are assigned to experimental units by randomization and distinguish this from merely observing pre-existing groups",
      "Define treatment means and the grand mean from the observed responses",
      "Derive the total sum of squares around the grand mean",
      "Derive the treatment sum of squares and residual/error sum of squares and prove their decomposition",
      "Assign treatment degrees of freedom a-1 and error degrees of freedom N-a, with total N-1",
      "Recognise the least-squares/projection interpretation behind the decomposition",
      "State that exact F inference additionally needs the error assumptions reserved for V1.2"
    ],
    inScope: [
      "Completely randomized one-factor designs",
      "Treatment-plus-error model and identifiability conventions",
      "One-way ANOVA sums-of-squares decomposition",
      "Treatment, error and total degrees of freedom"
    ],
    outOfScope: [
      "Exact F-test calibration and treatment contrasts, reserved for V1.2",
      "Randomized block designs, reserved for V2",
      "Latin squares and two blocking factors",
      "Factorial interaction models"
    ],
    applicationScope: "Entrance problems asking the learner to recognize a valid one-way randomized design, derive or complete the ANOVA decomposition, or recover a missing sum of squares/degrees of freedom from the model structure.",
    transferScope: "An unfamiliar grouped-experiment description where the learner must decide whether CRD assumptions/design language apply, reconstruct the decomposition from means, and reject an ANOVA table whose degrees of freedom or treatment structure are inconsistent.",
    exitCondition: "Given a one-factor randomized experiment, independently state the CRD model and randomization, derive the three sums of squares and all associated degrees of freedom, and explain why the decomposition is valid.",
    nextArcBoundary: "156 V1.2 keeps the same CRD and adds the exact F test plus one estimable treatment contrast under the stated normal equal-variance error assumptions."
  },
  {
    id: "T25-ARC839-A1156",
    routeOrder: 156,
    syllabusCode: "V1.2",
    targetCode: "V1",
    parentId: "ARC839",
    title: "Construct the exact F test and one treatment contrast with valid error assumptions.",
    focus: "Use the CRD decomposition to construct the exact one-way ANOVA F test and one treatment contrast, making the independent normal equal-variance error assumptions explicit and keeping omnibus treatment equality separate from a chosen contrast.",
    purpose: "Prevent mechanical ANOVA use by forcing the learner to connect the numerator and denominator mean squares to the null hypothesis, degrees of freedom, randomization, and exact F distribution assumptions.",
    centralCapability: "Under independent normal errors with common variance in a valid CRD, form MSTreatments/MSE for testing equality of treatment means, identify both degrees of freedom, and derive the standard error/test for one estimable contrast using the pooled error variance.",
    principalObstacle: "The main trap is treating the F ratio as exact without normal independent equal-variance errors, confusing the omnibus null with pairwise or contrast hypotheses, or using a contrast whose coefficients do not sum to zero for treatment effects under the usual parameterization.",
    entryPrerequisites: ["V1.1 CRD model and sum-of-squares decomposition", "T3 exact F and t testing", "N2 independence and chi-square/F pivots under normal models"],
    requiredOwnership: [
      "State the independent normal common-variance error assumptions required for the exact finite-sample F law",
      "Write the omnibus null of equal treatment means and distinguish it from a specific contrast null",
      "Form MSTreatments=SSTreatments/(a-1) and MSE=SSE/(N-a)",
      "Construct F=MSTreatments/MSE and identify numerator and denominator degrees of freedom",
      "Explain why randomization justifies the treatment comparison while the normal/equal-variance assumptions justify the exact reference distribution",
      "Define an estimable treatment contrast with coefficients summing to zero under the usual treatment-mean formulation",
      "Use MSE to derive the standard error for one stated contrast, with sample-size weights handled correctly",
      "Distinguish an omnibus rejection from evidence about any particular treatment pair or contrast"
    ],
    inScope: [
      "Exact one-way ANOVA F test in a CRD",
      "Independent normal equal-variance error assumptions",
      "One pre-specified treatment contrast and its pooled-error standard error",
      "Interpretation of omnibus versus contrast hypotheses"
    ],
    outOfScope: [
      "Multiple-comparison procedures and familywise-error adjustments",
      "Heteroskedastic or nonnormal robust ANOVA",
      "Randomized block ANOVA, which begins at V2",
      "Factorial main effects and interactions"
    ],
    applicationScope: "Entrance questions asking for a complete one-way ANOVA table, the exact F test for equal treatment means, or one valid treatment contrast using the residual mean square as the common-variance estimate.",
    transferScope: "A partially specified ANOVA or treatment-comparison problem where the learner must recover missing mean squares/df, reject an invalid exact-F claim when assumptions fail, or separate an omnibus null from a particular contrast claim.",
    exitCondition: "Given a valid CRD under independent normal common-variance errors, independently construct and interpret the exact F test and one treatment contrast with the correct degrees of freedom and pooled-error standard error.",
    nextArcBoundary: "157 V2.1 leaves one-factor CRD and introduces randomized blocks, where a nuisance blocking factor is separated from treatment and randomization occurs within blocks."
  }
];
