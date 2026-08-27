export function buildT22RichModule18(syllabusVersion) {
  return {
    moduleId: "SIDE476",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Train disciplined reasoning about measurement uncertainty so empirical quantities are never treated as exact by accident: distinguish measured value from latent quantity, choose meaningful error scales, propagate uncertainty through derived quantities, assemble auditable error budgets, and report numerical results with precision justified by evidence rather than formatting.",
    moduleDestination:
      "The learner can represent a measurement as estimate plus uncertainty, distinguish random scatter from systematic offset without overclaiming either, choose absolute or relative error according to scale, derive first-order uncertainty propagation for common functions, combine identifiable sources into an error budget under stated dependence assumptions, and communicate numerical conclusions at a precision commensurate with measurement and computational uncertainty.",
    entryPrerequisites: [
      "ARC048 probability foundations, especially events, conditional reasoning and expectation intuition",
      "ARC053 derivative/local-linearity foundations for first-order sensitivity arguments",
      "Basic algebra, units, percentages and scientific notation",
      "Comfort comparing repeated numerical observations",
    ],
    explicitlyOutOfScope: [
      "Full probability-distribution theory, variance and covariance — ARC517",
      "Sampling distributions, standard errors and confidence intervals — ARC504",
      "Formal metrology standards or laboratory accreditation procedures",
      "Bayesian uncertainty quantification — ARC502 and later statistical modelling",
      "Floating-point conditioning and algorithmic stability — ARC585 except for boundary-level comparison",
      "Monte Carlo uncertainty propagation — ARC513",
    ],
    arcs: {
      "T22-M18-A01": {
        focus: "Measured values, latent quantities, repeatability, bias and uncertainty statements.",
        roleRelevance:
          "Quantitative research is built from observations whose recorded numbers are not identical to the underlying quantities of interest; failing to model that distinction creates false precision before any statistical analysis begins.",
        purpose:
          "Establish a precise vocabulary for measurement error and uncertainty and make the learner separate what was observed from what is being inferred about the underlying quantity.",
        principalObstacle:
          "Repeated measurements can scatter, instruments can be systematically shifted, and the true value may be unknown; learners must avoid equating observed spread with total error or treating an unknown bias as if it were random noise.",
        entryPrerequisites: ["ARC048", "Arithmetic averages", "Units and scientific notation"],
        target:
          "Given repeated measurements and instrument/context information, construct a defensible measurement statement that distinguishes estimate, repeatability, possible systematic effects and what cannot be identified from the data alone.",
        requiredMastery: [
          "Distinguish measured value, underlying quantity, measurement error and uncertainty",
          "Separate random/repeatability effects from systematic/bias-like effects in concrete examples",
          "Explain why repeated measurements alone cannot reveal every systematic offset",
          "Use replicate measurements to summarize center and observed spread without calling either the exact truth",
          "Diagnose false precision created by reporting more digits than the measurement process supports",
          "Identify when calibration or an external reference is needed to detect a systematic error",
          "Transfer the distinction between observation and latent quantity to an unfamiliar sensor, price, timing or laboratory context",
        ],
        applicationScope:
          "Repeated observations from instruments, clocks, sensors, quotes or experimental measurements where both scatter and possible systematic effects matter.",
        transferScope:
          "A new measurement system in which several plausible causes of disagreement must be classified before any numerical propagation is attempted.",
        explicitlyOutOfScope: [
          "Formal estimation theory",
          "Confidence intervals",
          "Distribution fitting",
          "Variance-component models",
        ],
        nextArcBoundary:
          "A02 owns how error magnitude should be expressed relative to the scale and units of the quantity being measured.",
      },
      "T22-M18-A02": {
        focus: "Absolute error, relative error, percentage error and scale-aware comparison.",
        roleRelevance:
          "Research systems compare quantities with radically different units and magnitudes; an error that is negligible at one scale can dominate another, so raw differences alone are often misleading.",
        purpose:
          "Build scale-aware error reasoning and force explicit handling of units, denominators and near-zero reference values.",
        principalObstacle:
          "Absolute and relative error answer different questions; relative error becomes unstable or meaningless when the reference value is zero or very small, while percentage language can hide the chosen denominator.",
        entryPrerequisites: ["T22-M18-A01", "Ratios", "Percentages", "Units"],
        target:
          "Choose, compute and interpret absolute versus relative error appropriately, preserve units, and recognize cases where a dimensionless relative metric is ill-conditioned or undefined.",
        requiredMastery: [
          "Compute absolute error with correct units",
          "Compute relative and percentage error with an explicitly stated reference quantity",
          "Explain why the same absolute error can have radically different practical importance at different scales",
          "Diagnose division-by-small-reference pathologies in relative error",
          "Compare measurements across units only after forming a justified dimensionless or normalized quantity",
          "Reject ambiguous statements such as '5% error' when the denominator/reference is unspecified",
          "Transfer scale-aware reasoning to returns, sensor calibration, timing, price changes or normalized model residuals",
        ],
        applicationScope:
          "Cross-scale comparison of measured or computed quantities where units, magnitude and normalization affect the interpretation of error.",
        transferScope:
          "An unfamiliar case where a tempting percentage error is misleading because the natural reference value is near zero or context-dependent.",
        explicitlyOutOfScope: ["Statistical standardized residuals", "Likelihood-based scale models", "Formal condition numbers — ARC585"],
        nextArcBoundary:
          "A03 owns how input uncertainty changes derived quantities through mathematical transformations.",
      },
      "T22-M18-A03": {
        focus: "Propagation of uncertainty through sums, products and nonlinear transformations.",
        roleRelevance:
          "Quantitative models rarely use raw measurements directly; research conclusions depend on derived ratios, transforms and composites whose uncertainty is shaped by local sensitivity.",
        purpose:
          "Derive first-order uncertainty propagation from local linearity rather than memorize isolated error formulas.",
        principalObstacle:
          "Uncertainty does not propagate by one universal add-the-errors rule: the effect of each input depends on the function's local sensitivity and on whether input errors can reinforce, cancel or depend on one another.",
        entryPrerequisites: ["T22-M18-A01-A02", "ARC053 local linearity", "Basic multivariable notation is helpful but not required"],
        target:
          "Use first-order perturbation reasoning to estimate how small input uncertainties affect a derived scalar quantity, state the assumptions behind worst-case versus independence-style combinations, and identify when linearization is unreliable.",
        requiredMastery: [
          "Derive the one-variable relation Δy ≈ f'(x)Δx from local linearity",
          "Extend first-order reasoning to several inputs as a sum of sensitivity-weighted perturbations",
          "Propagate bounded/worst-case uncertainty through simple sums and differences using triangle-inequality reasoning",
          "Explain why independent random uncertainty would combine differently from fully aligned worst-case errors without requiring the full variance theory of ARC517",
          "Apply sensitivity reasoning to products, ratios or nonlinear transformations and track units",
          "Diagnose a case where first-order propagation fails because perturbations are too large, the derivative is near singular, or the function is strongly nonlinear",
          "Transfer uncertainty propagation to an unfamiliar derived research quantity and defend the chosen approximation",
        ],
        applicationScope:
          "Derived quantities such as rates, ratios, calibrated values, transformed measurements or model inputs where small perturbations can be linearized.",
        transferScope:
          "A new nonlinear expression where the learner must derive sensitivity from structure rather than retrieve a canned propagation formula.",
        explicitlyOutOfScope: [
          "General covariance-matrix propagation — ARC517/ARC541",
          "Monte Carlo propagation — ARC513",
          "Second-order delta-method theory",
          "Automatic differentiation",
        ],
        nextArcBoundary:
          "A04 owns combining multiple identified uncertainty sources into a transparent budget and testing which sources dominate the final conclusion.",
      },
      "T22-M18-A04": {
        focus: "Constructing, stress-testing and prioritizing uncertainty/error budgets.",
        roleRelevance:
          "Research effort should target uncertainty sources that materially affect the result; an explicit budget reveals whether better sensors, cleaner data or tighter modelling assumptions would actually change the conclusion.",
        purpose:
          "Turn a collection of local uncertainty sources into an auditable decomposition of total result sensitivity.",
        principalObstacle:
          "Sources can differ in units, dependence and mechanism; blindly summing quoted uncertainties can either exaggerate or understate risk, while tiny individually ignored terms may matter when numerous or correlated.",
        entryPrerequisites: ["T22-M18-A01-A03", "Tables/spreadsheets or simple Python arithmetic", "Basic scenario analysis"],
        target:
          "Build an uncertainty budget that names each source, maps it through sensitivity to the reported quantity, states the aggregation assumption, ranks contributors and tests whether the scientific/research conclusion survives plausible perturbations.",
        requiredMastery: [
          "List identifiable uncertainty sources without double counting the same mechanism under multiple labels",
          "Convert heterogeneous source uncertainties into contributions on a common output scale",
          "State whether contributions are being combined as worst-case bounds, scenarios or an independence-motivated approximation",
          "Rank contributions and identify the dominant source or sources",
          "Perform a sensitivity/stress test showing how the final conclusion changes under plausible source perturbations",
          "Diagnose hidden shared-cause dependence that makes naive independent aggregation unsafe",
          "Decide which measurement or modelling improvement would most reduce decision-relevant uncertainty",
          "Transfer budget construction to an unfamiliar empirical pipeline or derived metric",
        ],
        applicationScope:
          "Small auditable measurement or research pipelines with several identifiable uncertainty sources and a scalar reported output.",
        transferScope:
          "A new pipeline where the largest raw measurement error is not necessarily the largest contribution after sensitivity scaling.",
        explicitlyOutOfScope: ["Full probabilistic risk aggregation", "Hierarchical error models", "Formal variance decomposition/ANOVA"],
        nextArcBoundary:
          "A05 owns final numerical communication: precision, rounding, computational uncertainty and claims that remain honest after all error sources are considered.",
      },
      "T22-M18-A05": {
        focus: "Numerical uncertainty, significant digits, rounding and honest quantitative reporting.",
        roleRelevance:
          "A research result is only as trustworthy as the precision of the claim attached to it; excessive digits and hidden numerical tolerance can create an illusion of certainty even when underlying data and algorithms do not support it.",
        purpose:
          "Integrate measurement uncertainty with practical numerical reporting and teach learners to communicate what the calculation establishes without laundering uncertainty through formatting.",
        principalObstacle:
          "Stored/computed precision, measurement precision and decision-relevant precision are different; rounding too early can distort results, while rounding only at the end does not justify digits unsupported by inputs or model assumptions.",
        entryPrerequisites: ["T22-M18-A01-A04", "Scientific notation", "Basic computational arithmetic"],
        target:
          "Report derived numerical results with justified significant precision, preserve guard digits during computation, compare measurement uncertainty with numerical tolerance, and state conclusions whose strength matches the uncertainty budget.",
        requiredMastery: [
          "Distinguish machine/stored digits from empirically justified significant digits",
          "Carry guard digits through intermediate calculations and round at the reporting boundary",
          "Choose a reporting precision consistent with the dominant uncertainty scale",
          "Explain why extra decimal places do not reduce uncertainty",
          "Compare a computational discrepancy with measurement uncertainty and determine which is decision-relevant",
          "Recognize catastrophic-looking percentage changes caused only by near-zero denominators or rounding conventions",
          "Write a concise numerical claim that includes estimate, uncertainty/limitation and any key aggregation assumption",
          "Diagnose a report whose numerical formatting materially overstates the evidence",
          "Transfer honest-reporting discipline to a new model output, backtest statistic or experimental estimate",
        ],
        applicationScope:
          "Final tables, model diagnostics, measurement summaries and research memos where readers must be able to distinguish numerical resolution from evidential precision.",
        transferScope:
          "An unfamiliar result containing many computed decimal places but materially uncertain inputs, requiring the learner to decide what should actually be reported and defended.",
        explicitlyOutOfScope: [
          "Detailed IEEE-754 floating-point analysis and backward stability — ARC585",
          "Confidence intervals and standard errors — ARC504",
          "Formal scientific-publication style guides",
        ],
        nextArcBoundary:
          "M19 / ARC502 owns Bayesian updating from evidence; M20 onward builds sampling and distributional uncertainty on top of this measurement-discipline foundation.",
      },
    },
  };
}
