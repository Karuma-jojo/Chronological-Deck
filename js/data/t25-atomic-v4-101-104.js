// Individually authored T25 M.Stat audited-v4 cards 101-104.
export const T25_ATOMIC_V4_101_104 = [
  {
    id: "T25-ARC825-A1101",
    routeOrder: 101,
    syllabusCode: "N3.1",
    targetCode: "N3",
    parentId: "ARC825",
    title: "Calculate covariance and independence of jointly normal linear forms.",
    focus: "Track means and covariance through linear transformations of a jointly normal vector, then use joint normality—not zero covariance by itself—to decide independence of the resulting linear forms.",
    purpose: "Build a precise operational distinction between covariance, correlation and independence while exploiting the special closure properties of multivariate normal laws.",
    centralCapability: "Given a jointly normal vector and linear forms a^T X and b^T X, compute their covariance from the covariance matrix, obtain their marginal normal laws, and justify independence exactly when the covariance vanishes.",
    principalObstacle: "The seductive but false general rule 'uncorrelated means independent' becomes especially dangerous here; the implication is valid only because the forms are jointly normal, and singular covariance cases need separate treatment.",
    entryPrerequisites: ["D3 normal distribution", "J3 joint and marginal laws", "M5 quadratic forms and covariance-matrix geometry"],
    requiredOwnership: [
      "Compute the mean of a linear form a^T X from the mean vector",
      "Compute Var(a^T X)=a^T Sigma a and Cov(a^T X,b^T X)=a^T Sigma b",
      "State that linear transformations of a jointly normal vector remain jointly normal",
      "Use zero covariance to conclude independence only after joint normality has been established",
      "Distinguish covariance from correlation and handle zero-variance components separately",
      "Recognise when a covariance matrix is singular and avoid pretending a nonsingular density exists"
    ],
    inScope: [
      "Linear transformations of jointly normal vectors",
      "Covariance matrices and linear-form variances",
      "Independence of jointly normal linear forms",
      "Singular perfect-correlation cases at an elementary structural level"
    ],
    outOfScope: [
      "General Gaussian-process theory",
      "Spectral decomposition beyond what the supplied covariance calculation needs",
      "Measure-theoretic characterisations of Gaussian vectors",
      "Nonlinear transformations of multivariate normals"
    ],
    applicationScope: "Entrance problems asking whether two normal linear combinations are independent, or requiring the variance/covariance of transformed jointly normal quantities from a supplied covariance matrix.",
    transferScope: "An unfamiliar linear reparameterisation where the learner must build the transformed covariance matrix and decide which zero covariances genuinely imply independence.",
    exitCondition: "For a jointly normal vector and two supplied linear forms, compute their means, variances and covariance, decide independence with the correct hypothesis stated, and identify any singular case rather than forcing a density argument.",
    nextArcBoundary: "102 N3.2 turns the same joint-normal structure into a conditional normal law and requires singular limits to be handled separately rather than by dividing by a vanishing variance."
  },
  {
    id: "T25-ARC825-A1102",
    routeOrder: 102,
    syllabusCode: "N3.2",
    targetCode: "N3",
    parentId: "ARC825",
    title: "Obtain a conditional normal law; handle a singular limit separately.",
    focus: "Derive or use the bivariate normal conditional mean and variance with all centring, covariance and variance terms in the correct places, and separate the perfect-correlation singular case from the ordinary formula.",
    purpose: "Turn conditional-normal formulas into understandable covariance regression statements instead of fragile memorised expressions that fail when the conditioning variance or residual variance degenerates.",
    centralCapability: "Given a bivariate jointly normal pair, compute the conditional normal distribution and diagnose whether the conditional variance is positive, zero or undefined under the stated parametrisation.",
    principalObstacle: "Common errors include swapping covariance and correlation, forgetting the conditioning mean shift, squaring the wrong scale factor, or substituting a perfect-correlation case into a formula whose derivation assumes a nonsingular covariance structure.",
    entryPrerequisites: ["N3.1 jointly normal linear forms", "J3 conditional laws", "D3 normal standardisation"],
    requiredOwnership: [
      "Write the conditional mean in centred covariance form",
      "Write the conditional variance with the correct covariance-squared divided by conditioning variance term",
      "Convert correctly between covariance and correlation parametrisations",
      "Check that the conditioning variance is positive before division",
      "Interpret zero conditional variance as deterministic linear dependence in the singular case",
      "Standardise the resulting conditional normal law correctly for probability calculations"
    ],
    inScope: [
      "Bivariate normal conditional distributions",
      "Conditional mean and variance",
      "Correlation versus covariance parametrisations",
      "Perfect-correlation singular limits"
    ],
    outOfScope: [
      "General block-matrix Schur-complement theory",
      "High-dimensional Gaussian graphical models",
      "Regular conditional probability theory",
      "Bayesian conjugate-normal models beyond a supplied elementary calculation"
    ],
    applicationScope: "Entrance questions requiring a conditional probability, conditional expectation or conditional variance from a bivariate normal specification, including edge cases near perfect correlation.",
    transferScope: "A changed-input normal pair where the conditional law must first be reconstructed from means, variances and covariance rather than read from a canned standard-normal formula.",
    exitCondition: "From a supplied bivariate normal model, obtain the full conditional normal law, compute one requested probability or moment, and separately explain what happens when the covariance structure becomes singular.",
    nextArcBoundary: "103 N2.1 moves from general joint-normal conditioning to the special orthogonal-coordinate structure behind the independence of the normal sample mean and residual components."
  },
  {
    id: "T25-ARC828-A1103",
    routeOrder: 103,
    syllabusCode: "N2.1",
    targetCode: "N2",
    parentId: "ARC828",
    title: "Establish normal mean/residual independence using orthogonal coordinates.",
    focus: "Represent a normal sample in orthogonal coordinates so that the sample-mean direction is separated from residual directions, then use joint normality and zero covariance to justify independence.",
    purpose: "Expose the structural reason behind normal mean/residual independence instead of treating it as an isolated theorem to memorise before t and F pivots.",
    centralCapability: "Show that the normal sample mean is independent of orthogonal residual coordinates and connect the residual squared length to a chi-square variable with the correct dimension loss.",
    principalObstacle: "Memorising independence without seeing the one-dimensional mean direction, forgetting the lost degree of freedom, or assuming residual independence for nonnormal samples destroys the logic needed for later pivots.",
    entryPrerequisites: ["N1 sample mean and sample variance", "N3 jointly normal linear forms", "M5 orthogonality and squared lengths", "D4 chi-square connection"],
    requiredOwnership: [
      "Identify the unit vector in the sample-mean direction",
      "Construct or reason with an orthogonal change of coordinates separating mean and residual subspaces",
      "Use invariance of a standard multivariate normal under orthogonal transformation",
      "Show zero covariance between the mean coordinate and residual coordinates",
      "Conclude independence from joint normality",
      "Explain why the residual sum of squares has n-1 rather than n independent normal directions"
    ],
    inScope: [
      "Normal samples",
      "Orthogonal-coordinate decomposition",
      "Independence of sample mean and residual vector",
      "Residual sum of squares and chi-square degrees of freedom"
    ],
    outOfScope: [
      "Full Cochran theorem in general quadratic-form form",
      "General ANOVA decomposition",
      "Non-Gaussian mean/residual independence claims",
      "Wishart theory"
    ],
    applicationScope: "Entrance-level derivations that need the independence of a normal sample mean and sample variance, or need the origin of the n-1 residual degrees of freedom explained rather than quoted.",
    transferScope: "A reparameterised normal sample where the learner must identify the mean direction and orthogonal residual space before concluding independence or a chi-square law.",
    exitCondition: "For an iid normal sample, justify mean/residual independence through an orthogonal-coordinate argument and explain precisely why the residual squared length contributes n-1 chi-square degrees of freedom.",
    nextArcBoundary: "104 N2.2 uses that independence structure to assemble—or reject—chi-square, t and F pivots with exact centring, scaling and degrees of freedom."
  },
  {
    id: "T25-ARC828-A1104",
    routeOrder: 104,
    syllabusCode: "N2.2",
    targetCode: "N2",
    parentId: "ARC828",
    title: "Assemble or reject one chi-square/t/F pivot with explicit degrees of freedom.",
    focus: "Construct central chi-square, t or F pivots only from correctly centred/scaled normal and chi-square ingredients with the required independence, and reject near-miss ratios that violate those conditions.",
    purpose: "Train recognition of the exact structural ingredients of classical pivots so that familiar-looking but invalid ratios do not get mislabeled as t or F distributions.",
    centralCapability: "Given a statistic built from normal-sample components, identify its law when justified or state exactly which centring, scaling, independence or degrees-of-freedom requirement fails.",
    principalObstacle: "Pattern-matching any normal-over-square-root ratio to t, or any ratio of quadratic forms to F, ignores the independence and normalisation conditions that define those distributions.",
    entryPrerequisites: ["N2.1 normal mean/residual independence", "D4 gamma and chi-square laws", "N1 sample mean and variance"],
    requiredOwnership: [
      "Recognise a central chi-square as a sum of squared independent standard normals",
      "Assemble a t variable from a standard normal numerator and an independent chi-square denominator divided by its degrees of freedom",
      "Assemble an F variable from two independent chi-square variables each divided by its own degrees of freedom",
      "Track centring and scale constants explicitly",
      "State numerator and denominator degrees of freedom",
      "Reject a proposed t/F law when independence, centring, scaling or ingredient distribution is wrong",
      "Distinguish a bounded or otherwise structurally constrained normal ratio from a genuine t variable"
    ],
    inScope: [
      "Central chi-square pivots",
      "Student t pivots",
      "F pivots",
      "Near-miss pivot diagnostics"
    ],
    outOfScope: [
      "Noncentral chi-square/t/F laws",
      "General likelihood-ratio theory",
      "Asymptotic chi-square approximations",
      "Multivariate Wishart pivots"
    ],
    applicationScope: "ISI-style questions where a statistic resembles a classical pivot but must be checked ingredient by ingredient before a distributional label is justified.",
    transferScope: "A novel ratio involving normal-sample pieces where the learner must reconstruct the numerator and denominator laws and independence rather than relying on visual resemblance to a textbook t or F statistic.",
    exitCondition: "Given a proposed chi-square, t or F statistic, derive every ingredient law and degrees of freedom, verify the required independence, state the final distribution if valid, or identify the exact failed condition if invalid.",
    nextArcBoundary: "105 O1.1 leaves normal-pivot structure and begins order statistics by deriving minimum or maximum laws from CDF or survival products."
  }
];
