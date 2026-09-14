// Individually authored T25 M.Stat audited-v4 cards 143-144.
export const T25_ATOMIC_V4_143_144 = [
  {
    id: "T25-ARC836-A1143",
    routeOrder: 143,
    syllabusCode: "R2.1",
    targetCode: "R2",
    parentId: "ARC836",
    title: "Derive simple-regression normal equations with/without intercept.",
    focus: "Derive simple least-squares normal equations directly from minimising the residual sum of squares, both with an intercept and through the origin, and isolate exactly where centring and slope identifiability enter.",
    purpose: "Make regression coefficients consequences of an optimisation problem rather than memorised formulas, while separating the intercept and no-intercept geometries that students often conflate.",
    centralCapability: "Start from the stated least-squares objective, differentiate with respect to the fitted coefficients, obtain and solve the normal equations, and state the denominator/nonidentifiability condition for the slope in each model.",
    principalObstacle: "Importing the centred-sum slope formula into a through-origin model, silently assuming an intercept, or dividing by a zero design denominator can produce an algebraically familiar answer for a model that was never posed.",
    entryPrerequisites: ["M2 linear systems, rank and uniqueness", "J2 covariance and centred-sum algebra", "C3 differentiation and first-order optimality"],
    requiredOwnership: [
      "Write the residual sum of squares for the exact model being fitted",
      "Differentiate the objective with respect to every fitted coefficient",
      "Derive the intercept normal equation sum of residuals equals zero when an intercept is present",
      "Derive the slope normal equation weighted residual orthogonality to the predictor",
      "Solve the intercept model using centred sums Sxx and Sxy",
      "Derive the distinct through-origin slope formula without importing centring",
      "State when the slope is not identifiable because the relevant predictor denominator vanishes",
      "Distinguish an algebraic minimiser from additional probabilistic assumptions that are not needed for least-squares fitting"
    ],
    inScope: [
      "Simple least squares with an intercept",
      "Simple least squares through the origin",
      "Normal equations and residual orthogonality",
      "Centred-sum coefficient identities and zero-denominator identifiability checks"
    ],
    outOfScope: [
      "Sampling distributions or t/F inference for regression coefficients",
      "Generalised least squares or heteroskedastic weighting",
      "Penalised regression such as ridge or lasso",
      "Multiple-regression projection matrices, which begin in R3"
    ],
    applicationScope: "Entrance problems that ask for a least-squares slope/intercept, a coefficient identity, or a comparison between fitting with and without an intercept, especially when a zero denominator or degenerate predictor must be noticed.",
    transferScope: "An unfamiliar one-predictor objective or recoded predictor where the learner must re-derive the normal equations from minimisation rather than guess whether the standard centred formula still applies.",
    exitCondition: "Given one intercept model and one through-origin model, derive the normal equations from the objective, solve for the coefficients when identifiable, and state precisely the design degeneracy that destroys slope identification.",
    nextArcBoundary: "144 R2.2 stays in simple least squares but shifts from deriving the coefficient system to proving residual, dummy-variable or changed-observation identities from the normal equations."
  },
  {
    id: "T25-ARC836-A1144",
    routeOrder: 144,
    syllabusCode: "R2.2",
    targetCode: "R2",
    parentId: "ARC836",
    title: "Prove a residual, dummy-variable or changed-observation identity.",
    focus: "Use the already-derived least-squares normal equations and residual orthogonality to prove coefficient, residual-sum, dummy-variable or changed-observation identities without refitting the model numerically from scratch.",
    purpose: "Turn normal equations into reusable structural tools so regression manipulations can be proved quickly and safely instead of reduced to repeated arithmetic fitting.",
    centralCapability: "Translate a proposed regression identity into the normal-equation constraints, residual orthogonality and centred-sum relations that actually govern it, then prove the claim or identify the assumption under which it fails.",
    principalObstacle: "Treating residual properties as universal facts, forgetting that sum of residuals equals zero only when the fitted design includes an intercept, or changing an observation without tracking how centred sums and fitted coefficients move leads to false identities.",
    entryPrerequisites: ["R2.1 least-squares minimisation and normal equations", "J2 covariance/centred-sum identities", "M2 uniqueness of linear systems"],
    requiredOwnership: [
      "Use the intercept normal equation to justify zero residual sum only when an intercept is fitted",
      "Use predictor-residual orthogonality to simplify coefficient identities",
      "Express simple-regression slope and intercept through centred sums when the model contains an intercept",
      "Analyse a binary dummy predictor by reducing the least-squares equations to group means when appropriate",
      "Track how a changed or shifted observation alters the sufficient centred sums before asserting a coefficient change",
      "Distinguish translation of all responses from alteration of one response",
      "Check whether a claimed identity depends on nonzero Sxx or another identifiability condition",
      "Prove or reject a proposed identity algebraically rather than relying on a numerical example"
    ],
    inScope: [
      "Residual-sum and predictor-residual orthogonality identities",
      "Binary dummy-variable interpretation in simple least squares",
      "Response shifts or single-observation changes handled through normal equations/centred sums",
      "Coefficient identities derived from the least-squares first-order conditions"
    ],
    outOfScope: [
      "Influence-function or leverage diagnostics as a general theory",
      "Cook's distance or deletion diagnostics",
      "Multiple-regression covariance matrices and omitted-variable bias",
      "Regression hypothesis testing and confidence intervals"
    ],
    applicationScope: "Entrance questions that present a fitted-line identity, binary regressor, shifted response or changed data point and ask for a proof or coefficient consequence without demanding a full numerical refit.",
    transferScope: "A novel algebraic perturbation of a simple least-squares problem where the learner must decide which normal-equation identities survive and which fail because the design, intercept status or centring has changed.",
    exitCondition: "Prove one residual or dummy-variable identity and one changed-observation/coefficient identity from the least-squares equations, explicitly stating every intercept and nondegeneracy condition used.",
    nextArcBoundary: "145 R3.1 leaves simple-regression minimisation and begins multiple regression, where matrix projection, coefficient covariance and omitted-variable bias require the fixed-design linear-model framework."
  }
];
