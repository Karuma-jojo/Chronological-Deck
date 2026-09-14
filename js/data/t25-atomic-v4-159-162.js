// Individually authored T25 M.Stat audited-v4 cards 159-162.
export const T25_ATOMIC_V4_159_162 = [
  {
    id: "T25-ARC841-A1159",
    routeOrder: 159,
    syllabusCode: "V3.1",
    targetCode: "V3",
    parentId: "ARC841",
    title: "Construct a valid Latin square and state its randomisation/model.",
    focus: "Recognise a Latin square as a treatment design controlling two nuisance directions, construct a valid square with each treatment appearing once in every row and column, and state a valid randomisation plus additive row-column-treatment model.",
    purpose: "Make Latin squares a design object rather than a memorised ANOVA table: validity comes from the combinatorial treatment arrangement and randomisation, while the additive model states which systematic sources are being removed before treatment comparison.",
    centralCapability: "Given p treatments and two blocking factors each with p levels, construct or verify a p-by-p Latin square, identify rows, columns and treatments, describe valid random relabelling/permutation steps, and state an additive model Y_ijk=mu+rho_i+kappa_j+tau_k+epsilon with an identifiability convention and no separately modelled interactions.",
    principalObstacle: "The main trap is calling any p-by-p treatment grid a Latin square, forgetting that every treatment must occur exactly once in each row and each column, or treating row and column blocks as treatment factors whose interactions are estimable from the unreplicated square.",
    entryPrerequisites: ["V2 randomized-block design, within-block randomisation and additive nuisance control"],
    requiredOwnership: [
      "State the defining Latin-square condition: p treatments arranged in p rows and p columns with each treatment appearing once in every row and every column",
      "Construct a small valid Latin square, for example by cyclic generation, and verify both row and column treatment counts",
      "Identify the treatment factor separately from the two nuisance blocking factors represented by rows and columns",
      "Describe valid randomisation through appropriate permutations/relabelings of rows, columns and treatment labels rather than arbitrary cellwise reassignment",
      "Write an additive row-plus-column-plus-treatment model with an explicit identifiability convention",
      "Explain why one observation per cell leaves row-treatment, column-treatment and other interaction structure outside the elementary additive analysis",
      "Reject an invalid proposed square when a treatment repeats within a row or column even if global treatment counts are balanced",
      "Distinguish the combinatorial validity of the square from the normal/equal-variance assumptions used later for exact ANOVA inference"
    ],
    inScope: [
      "Elementary p-by-p Latin-square construction and verification",
      "Two blocking factors plus one treatment factor",
      "Valid row/column/treatment relabelling randomisation",
      "Additive row-column-treatment model and no-interaction limitation"
    ],
    outOfScope: [
      "Latin-square sums of squares, mean squares and F test, reserved for V3.2",
      "Graeco-Latin squares and higher-order blocking designs",
      "Missing-cell Latin-square analysis",
      "General factorial treatment interactions, reserved for V4"
    ],
    applicationScope: "Entrance questions asking whether a treatment grid is a valid Latin square, how to complete a small partially filled square, which variables are the two blocks versus the treatment, or what additive model/randomisation corresponds to the design.",
    transferScope: "An unfamiliar experiment with two directional nuisance gradients where the learner must decide whether a Latin square is appropriate, construct or repair a valid treatment layout, and identify exactly which interaction claims the unreplicated additive design cannot support.",
    exitCondition: "Given p treatments and two p-level blocking factors, independently construct and verify a valid Latin square, state a legitimate randomisation scheme and identifiable additive model, and explain the no-interaction limitation.",
    nextArcBoundary: "160 V3.2 keeps this Latin-square design and derives its ANOVA degrees of freedom and treatment test using the residual mean square; it does not introduce factorial treatment interactions."
  },
  {
    id: "T25-ARC841-A1160",
    routeOrder: 160,
    syllabusCode: "V3.2",
    targetCode: "V3",
    parentId: "ARC841",
    title: "Derive its degrees of freedom and compare treatments with the right error term.",
    focus: "Build the elementary Latin-square ANOVA decomposition and degrees of freedom, use residual mean square rather than a row or column mean square to compare treatments, and make the residual/no-interaction limitation explicit.",
    purpose: "Connect the Latin-square table to the design structure: total variation is partitioned among rows, columns, treatments and residual, with the treatment F ratio calibrated against residual variation under the additive normal common-variance model.",
    centralCapability: "For a p-by-p Latin square with one observation per cell, derive row, column, treatment, residual and total degrees of freedom, construct the corresponding sums-of-squares decomposition, and form the treatment F statistic using MSTreatment/MSE while explaining what residual absorbs under violated additivity.",
    principalObstacle: "The main trap is using RBD degrees of freedom, forgetting the second blocking source, using row or column mean square as the treatment denominator, or claiming the residual is pure error when interactions cannot be separately estimated from one observation per cell.",
    entryPrerequisites: ["V3.1 valid Latin-square construction, randomisation and additive model", "V2.2 blocked ANOVA decomposition and residual-error logic"],
    requiredOwnership: [
      "Assign p-1 degrees of freedom each to rows, columns and treatments",
      "Derive residual degrees of freedom (p-1)(p-2) and total degrees of freedom p^2-1",
      "Construct or recover row, column and treatment sums of squares from marginal totals/means and obtain residual by subtraction",
      "Check independently that both degrees of freedom and sums of squares partition consistently",
      "Form the treatment test F=MSTreatment/MSE under independent normal common-variance additive errors",
      "Explain why row and column mean squares are nuisance-block summaries rather than the standard denominator for treatment comparison",
      "State that unmodelled interactions are inseparable from residual variation in the elementary unreplicated square",
      "Recognise impossible or overparameterised ANOVA tables from inconsistent df or claimed separately estimated interactions"
    ],
    inScope: [
      "Latin-square ANOVA decomposition",
      "Row, column, treatment, residual and total degrees of freedom",
      "Treatment F test using residual mean square",
      "Residual interpretation under the additive/no-interaction limitation"
    ],
    outOfScope: [
      "Replicated Latin squares with separately estimable interaction components",
      "Missing-value corrections",
      "Graeco-Latin or crossover extensions",
      "Factorial main-effect and interaction contrasts, which begin at V4"
    ],
    applicationScope: "Entrance problems with raw or partial Latin-square ANOVA information asking for missing sums of squares, degrees of freedom, the correct treatment-test denominator, or diagnosis of an invalid analysis.",
    transferScope: "A partially specified p-by-p design where the learner must infer p from the ANOVA table, reconstruct residual df or SS, and explain why strong row-by-treatment or column-by-treatment behaviour would undermine the elementary additive analysis.",
    exitCondition: "Given a valid p-by-p Latin square, independently construct and audit its ANOVA table, form the treatment F test with the correct residual denominator, and state precisely what interaction structure is hidden in residual error.",
    nextArcBoundary: "161 V4.1 leaves nuisance-block designs and begins factorial treatment structure, where interactions are themselves target effects rather than unmodelled contamination."
  },
  {
    id: "T25-ARC842-A1161",
    routeOrder: 161,
    syllabusCode: "V4.1",
    targetCode: "V4",
    parentId: "ARC842",
    title: "Construct factorial main-effect and interaction contrasts.",
    focus: "Translate a small factorial treatment layout into main-effect and interaction contrasts, declare the chosen effect scaling, and distinguish a genuine interaction from separate marginal main effects.",
    purpose: "Make factorial effects operational rather than verbal: the learner must derive signed contrasts from cell means, state the coding/scaling convention, and recognize interaction as a difference of differences.",
    centralCapability: "For a 2^k or simple mixed-level factorial experiment, identify treatment combinations, construct main-effect and interaction contrasts from cell means or totals, state whether the reported quantity is a contrast, half-contrast, or effect under the chosen coding, and interpret interaction without collapsing it into marginal main effects.",
    principalObstacle: "The main trap is losing signs or scaling factors, treating an interaction as the sum of two main effects, or interpreting a main effect in isolation when the corresponding interaction is substantial.",
    entryPrerequisites: ["V1 one-way treatment contrasts and ANOVA logic", "P2 product counting for the 2^k treatment combinations; J1 finite weighted averages"],
    requiredOwnership: [
      "Enumerate treatment combinations correctly for a 2^k or small mixed-level factorial design",
      "Construct a main-effect contrast by averaging/comparing the appropriate high-versus-low or level-specific cell means",
      "Construct a two-factor interaction as a difference of differences with a consistent sign convention",
      "Declare the scaling convention explicitly so a raw contrast is not confused with the reported factorial effect",
      "Interpret zero interaction as additivity on the response scale being analysed, not as absence of both main effects",
      "Explain why a substantial interaction makes a single marginal main-effect summary potentially misleading",
      "Recover a missing cell contrast coefficient from orthogonality/balance in elementary 2-level designs",
      "Keep design effects at entrance-exam depth without importing response-surface or high-order research methodology"
    ],
    inScope: [
      "Main-effect contrasts in 2-level and simple mixed-level factorials",
      "Two-factor interaction as a difference of differences",
      "Explicit effect/contrast scaling conventions",
      "Interpretation of main effects in the presence or absence of interaction"
    ],
    outOfScope: [
      "Full general linear-model treatment of arbitrary unbalanced factorials",
      "Fractional-factorial alias structures and design generators",
      "Response-surface methodology",
      "ANOVA error degrees of freedom and pooling rules, reserved for V4.2"
    ],
    applicationScope: "Entrance questions presenting a 2x2, 2^k or small factorial table and asking for a main effect, interaction contrast, sign pattern, missing contrast coefficient, or interpretation of whether effects are additive.",
    transferScope: "An unfamiliar factorial table with relabelled factor levels or nonstandard numerical coding where the learner must reconstruct the contrast from the treatment combinations, declare scaling, and detect interaction from changing simple effects.",
    exitCondition: "Given a small factorial design, independently derive specified main-effect and interaction contrasts with correct signs and declared scaling, then explain what a nonzero interaction means for marginal main-effect interpretation.",
    nextArcBoundary: "162 V4.2 keeps these factorial effects and supplies the ANOVA degrees of freedom and legitimate error term, including the distinction between replication and pooling assumed-negligible interactions."
  },
  {
    id: "T25-ARC842-A1162",
    routeOrder: 162,
    syllabusCode: "V4.2",
    targetCode: "V4",
    parentId: "ARC842",
    title: "Complete an ANOVA table and explain which error/interaction assumptions supply its degrees of freedom.",
    focus: "Complete a small factorial ANOVA table from the declared model and replication structure, count effect and residual degrees of freedom, and distinguish genuine replicated error from an error term manufactured by pooling interactions assumed negligible.",
    purpose: "Close the route with the central factorial-inference discipline: an F denominator needs defensible error degrees of freedom, and those degrees of freedom come either from replication or from an explicit modelling assumption that selected interactions are negligible—not from wishful arithmetic.",
    centralCapability: "For a balanced 2^k or simple mixed-level factorial experiment, assign degrees of freedom to main effects and interactions, recover missing ANOVA entries, identify the available residual/error degrees of freedom from replication, and, when no replication exists, explain exactly what assumption is made if higher-order interactions are pooled as error.",
    principalObstacle: "The main trap is inventing residual degrees of freedom in an unreplicated factorial, silently pooling interactions without declaring the negligible-interaction assumption, or treating pooled interaction variation as if it were independently observed pure experimental error.",
    entryPrerequisites: ["V4.1 factorial main-effect and interaction contrasts", "V1 exact F-test and residual mean-square logic", "P2 product counting for factorial treatment combinations"],
    requiredOwnership: [
      "Count main-effect and interaction degrees of freedom from factor level counts, including the 1-df effects of balanced two-level factors",
      "Determine total degrees of freedom from the number of observations and reconcile them with all model and error components",
      "Use replication to identify genuine within-cell/residual error degrees of freedom when repeated observations are present",
      "Complete missing sums of squares, mean squares or F ratios in a partially specified factorial ANOVA table",
      "State which mean square is the denominator for a requested effect test under the declared fixed-effects model",
      "Recognise that a saturated unreplicated 2^k model has no independent pure-error degrees of freedom",
      "Explain that pooling selected higher-order interactions as error requires an explicit assumption that those interactions are negligible",
      "Distinguish pooled model-based error from replicated pure error and state how a wrong pooling assumption can invalidate the test"
    ],
    inScope: [
      "Balanced 2^k and simple mixed-level factorial ANOVA degree-of-freedom accounting",
      "Replicated residual/error degrees of freedom",
      "Completion and auditing of partial factorial ANOVA tables",
      "Explicit pooling of assumed-negligible interactions when an elementary unreplicated problem authorizes it"
    ],
    outOfScope: [
      "Fractional-factorial alias/confounding theory",
      "Random-effects and mixed-model expected mean squares",
      "General unbalanced Type I/II/III sums of squares",
      "Post-entrance design-optimization or industrial DOE depth"
    ],
    applicationScope: "Entrance questions asking for missing factorial ANOVA degrees of freedom or mean squares, whether an F test is actually available, which interaction may be pooled under a stated assumption, or why an unreplicated saturated design has no pure-error estimate.",
    transferScope: "A deceptively complete-looking factorial table where the learner must detect nonexistent error df, distinguish replication from model-based pooling, and refuse an F test unless the proposed denominator is justified by the design or an explicit negligible-interaction assumption.",
    exitCondition: "Given a balanced factorial design and its declared replication/model assumptions, independently complete and audit the ANOVA table, identify the legitimate error degrees of freedom and denominator, and explain exactly when interaction pooling is assumption-dependent rather than pure error.",
    nextArcBoundary: "This is route position 162, the terminal bounded session of the audited T25 M.Stat v2 chronology. No later learner-facing card exists; further work is cumulative review, retrieval and sealed-mission use, not extension of the retired 120-route."
  }
];
