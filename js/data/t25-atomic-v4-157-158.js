// Individually authored T25 M.Stat audited-v4 cards 157-158.
export const T25_ATOMIC_V4_157_158 = [
  {
    id: "T25-ARC840-A1157",
    routeOrder: 157,
    syllabusCode: "V2.1",
    targetCode: "V2",
    parentId: "ARC840",
    title: "Justify randomisation within blocks and the additive model.",
    focus: "Recognise when a nuisance source of heterogeneity should be controlled by blocks, state the randomized-block additive treatment-plus-block model, and justify treatment randomisation within each block rather than treating blocking as an after-the-fact ANOVA label.",
    purpose: "Make randomized blocks a design principle before they become an ANOVA formula: comparable units are grouped first, treatments are randomized inside blocks, and the additive model separates treatment signal from systematic block variation.",
    centralCapability: "Given a complete randomized-block experiment with one observation per treatment-block cell, identify treatments and blocks, state an additive model such as Y_ij=mu+tau_i+beta_j+epsilon_ij with suitable constraints, describe valid within-block randomisation, and explain why blocking can reduce residual variation when blocks capture a relevant nuisance factor.",
    principalObstacle: "The main trap is confusing a block with a second treatment factor, randomizing treatments globally instead of within each block, or assuming the additive model contains a treatment-by-block interaction even though one observation per cell leaves that interaction inseparable from error.",
    entryPrerequisites: ["V1 CRD randomisation, treatment model and ANOVA decomposition"],
    requiredOwnership: [
      "Identify the treatment factor and the nuisance blocking factor from an experimental description",
      "State the complete-block requirement that every block contains every treatment once in the elementary RBD setting",
      "Describe treatment randomisation separately within each block and distinguish it from unrestricted CRD randomisation",
      "Write an additive model Y_ij=mu+tau_i+beta_j+epsilon_ij with an explicit identifiability convention",
      "Explain that the additive model assigns systematic variation to treatment and block effects but contains no separately estimable treatment-by-block interaction",
      "Explain why useful blocking can improve treatment precision by removing predictable between-block variation from residual error",
      "Recognise that a blocking variable is normally chosen before observing treatment responses rather than manufactured post hoc",
      "Keep exact normal-theory ANOVA inference separate from the design/randomisation justification itself"
    ],
    inScope: [
      "Complete randomized-block design structure",
      "Randomisation of treatments within blocks",
      "Additive treatment-plus-block model and identifiability constraints",
      "Conceptual precision benefit and limitation of blocking"
    ],
    outOfScope: [
      "RBD sums of squares, mean squares and F table, reserved for V2.2",
      "Estimating treatment-by-block interaction with replication",
      "Latin squares with two blocking factors, reserved for V3",
      "Factorial treatment interactions, reserved for V4"
    ],
    applicationScope: "Entrance problems asking whether a proposed blocking scheme/randomisation is valid, which variable is treatment versus block, what additive RBD model applies, or why blocking can outperform a CRD when a nuisance gradient is present.",
    transferScope: "An unfamiliar experiment arranged by batches, days, fields or matched groups where the learner must reconstruct the within-block randomisation, reject a global-randomisation or second-treatment interpretation, and state exactly what additivity assumes.",
    exitCondition: "Given a complete blocked experiment, independently identify treatment and block roles, specify valid within-block randomisation and an identifiable additive model, and explain both the precision rationale and the unmodelled-interaction limitation.",
    nextArcBoundary: "158 V2.2 keeps this same additive RBD and derives its ANOVA decomposition/degrees of freedom, then diagnoses what treatment-by-block interaction would contaminate when there is one observation per cell."
  },
  {
    id: "T25-ARC840-A1158",
    routeOrder: 158,
    syllabusCode: "V2.2",
    targetCode: "V2",
    parentId: "ARC840",
    title: "Build the RBD ANOVA and identify the interaction/error limitation.",
    focus: "Derive the complete randomized-block ANOVA decomposition and degrees of freedom from the additive model, use the residual mean square as the treatment-test denominator under the stated assumptions, and identify why unmodelled treatment-by-block interaction is absorbed into residual error without replication.",
    purpose: "Turn the RBD table into a consequence of the design and model while making its main diagnostic limitation visible: with one observation in each treatment-block cell, interaction and pure experimental error cannot be separately estimated.",
    centralCapability: "For t treatments and b complete blocks with one observation per cell, construct treatment, block, residual and total sums of squares and degrees of freedom, form the treatment F ratio under independent normal common-variance additive errors, and explain how treatment-by-block interaction compromises the residual/error interpretation.",
    principalObstacle: "The main trap is importing CRD residual degrees of freedom, using the block mean square as the treatment-test denominator, or claiming that a one-observation-per-cell RBD can estimate treatment-by-block interaction separately from experimental error.",
    entryPrerequisites: ["V2.1 within-block randomisation and additive RBD model", "V1 one-way ANOVA sums of squares and exact F logic"],
    requiredOwnership: [
      "Compute or derive total, treatment and block sums of squares from treatment means, block means and the grand mean",
      "Obtain residual SSE by decomposition after removing treatment and block sums of squares",
      "Assign degrees of freedom t-1 for treatments, b-1 for blocks, (t-1)(b-1) for residual and tb-1 total",
      "Form MSTreatment and MSE and use F=MSTreatment/MSE for the treatment test under the stated additive independent normal common-variance error model",
      "Recognise that the block mean square measures block variation and is not the denominator for the treatment F test in the standard fixed-effects RBD",
      "Explain why one observation per cell leaves treatment-by-block interaction confounded with the residual term",
      "State that material interaction can inflate or structurally alter the residual and undermine the additive-model treatment test interpretation",
      "Check the ANOVA degrees of freedom sum and the sum-of-squares decomposition as independent consistency diagnostics"
    ],
    inScope: [
      "Complete RBD sums of squares and ANOVA table",
      "Treatment, block, residual and total degrees of freedom",
      "Standard treatment F test under additive normal equal-variance errors",
      "Confounding of treatment-by-block interaction with residual error without replication"
    ],
    outOfScope: [
      "Replicated block designs that separately estimate interaction and pure error",
      "Missing-cell or incomplete-block analysis",
      "Latin-square row/column blocking, reserved for V3",
      "General factorial interaction ANOVA, reserved for V4"
    ],
    applicationScope: "Entrance questions giving raw or partially summarized blocked data and asking for missing ANOVA entries, treatment-test degrees of freedom, the correct denominator mean square, or an explanation of the no-interaction/additivity limitation.",
    transferScope: "A partially specified blocked ANOVA where the learner must reconstruct residual SS/df, detect an impossible table, or explain why apparent treatment rankings that change strongly across blocks cannot be cleanly represented by the unreplicated additive RBD model.",
    exitCondition: "Given a complete t-by-b randomized-block experiment, independently construct and audit the ANOVA table and treatment F test, then explain precisely why treatment-by-block interaction cannot be separated from residual error with one observation per cell.",
    nextArcBoundary: "159 V3.1 adds a second nuisance blocking factor through a Latin square; it does not extend RBD by estimating treatment-by-block interaction."
  }
];
