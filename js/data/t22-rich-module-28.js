export function buildT22RichModule28(syllabusVersion) {
  return {
    moduleId: "ARC534",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build likelihood-based hypothesis testing from first principles: start with simple-vs-simple decisions, interpret likelihood ratios as evidence, derive Neyman-Pearson optimality, analyze power functions, generalize to likelihood-ratio tests for composite models, examine uniformly most powerful structure when it exists, and finish by diagnosing the assumptions and trade-offs that prevent 'optimal test' claims from being universal.",
    moduleDestination:
      "The learner can construct and justify likelihood-based tests from stated models and error constraints, derive rejection rules rather than memorize them, compute and compare power functions, distinguish simple from composite hypotheses, recognize when UMP claims are available or impossible, and audit regularity, nuisance-parameter, multiplicity and model-misspecification limits before trusting asymptotic or optimality claims.",
    entryPrerequisites: [
      "ARC505 null/alternative hypotheses, Type-I/II error, power and rejection regions",
      "ARC531 likelihoods, log-likelihoods and MLE",
      "ARC533 score, information and regular asymptotic likelihood geometry",
      "ARC517 probability distributions and expectation",
      "ARC712 asymptotic and repeated-sampling reasoning",
    ],
    explicitlyOutOfScope: [
      "Bootstrap and permutation inference — ARC537",
      "Regression-specific testing beyond illustrative examples — ARC539",
      "Sequential testing, optional-stopping theory and always-valid inference",
      "Advanced selective inference and post-selection correction",
      "Full decision-theoretic Bayes risk/minimax testing theory",
      "High-dimensional likelihood theory and nonstandard empirical-process asymptotics",
    ],
    arcs: {
      "T22-M28-A01": {
        focus: "Simple-vs-simple hypothesis testing as a constrained decision problem.",
        roleRelevance:
          "Quantitative research often compares two explicit data-generating stories; the essential task is to choose a rejection rule whose error probabilities are mathematically controlled rather than visually persuasive.",
        purpose:
          "Rebuild testing from acceptance/rejection regions and repeated-sampling error probabilities before invoking any optimality theorem.",
        principalObstacle:
          "A test is a rule on the sample space, not a statement that one hypothesis is probably true; controlling Type-I error and achieving useful power are distinct design requirements.",
        entryPrerequisites: ["ARC505 testing vocabulary", "ARC517 simple probability models"],
        target:
          "Given fully specified H0 and H1, construct a test rule, compute its Type-I error and power exactly or numerically, and compare alternative rejection regions under a fixed size constraint.",
        requiredMastery: [
          "Represent a deterministic test as a rejection region or indicator rule",
          "Compute size under H0 and power under H1",
          "Distinguish a test rule from a posterior probability claim",
          "Compare two same-size tests by their power",
          "Construct a discrete example where naive 'most extreme-looking' rejection is not most powerful",
          "Transfer the design logic to an unfamiliar pair of simple models",
        ],
        applicationScope:
          "Finite/discrete and low-dimensional continuous simple-vs-simple models where size and power can be computed transparently.",
        transferScope:
          "A new pair of data-generating models requiring the learner to define the sample-space decision rule and audit both errors from first principles.",
        explicitlyOutOfScope: ["Neyman-Pearson optimality", "Composite hypotheses", "Asymptotic chi-square likelihood-ratio tests"],
        nextArcBoundary:
          "A02 identifies the likelihood ratio as the natural evidence ordering between two simple models.",
      },
      "T22-M28-A02": {
        focus: "Likelihood ratios as relative evidence for two specified hypotheses.",
        roleRelevance:
          "Likelihood ratios compress model comparison into the relative support that the observed data provide under two competing mechanisms.",
        purpose:
          "Derive why f1(x)/f0(x) orders observations by evidence for H1 versus H0 without confusing that ratio with posterior odds.",
        principalObstacle:
          "The likelihood ratio is a data-dependent comparison of model fit, not P(H1|x)/P(H0|x) unless prior odds and a Bayesian model are explicitly supplied.",
        entryPrerequisites: ["T22-M28-A01", "ARC531 probability versus likelihood"],
        target:
          "Compute likelihood ratios, interpret their direction and scale correctly, and translate thresholds on the ratio into rejection regions.",
        requiredMastery: [
          "Compute a likelihood ratio for discrete and continuous simple models",
          "Explain why ratios above one favor H1 relative to H0 without producing posterior probabilities",
          "Convert a likelihood-ratio threshold into an equivalent statistic/rejection region when monotonicity permits",
          "Diagnose arbitrary reparameterizations or rescalings that leave likelihood-ratio ordering unchanged",
          "Construct an example where raw likelihood magnitude is misleading but the ratio is informative",
          "Transfer LR ordering to a new model pair",
        ],
        applicationScope:
          "Simple parametric hypotheses with explicit densities or mass functions.",
        transferScope:
          "An unfamiliar pair of models where the learner must derive the evidential ordering and separate it from Bayesian updating.",
        explicitlyOutOfScope: ["Prior odds/posterior odds except as contrast", "Composite likelihood maximization"],
        nextArcBoundary:
          "A03 proves that LR-threshold tests are most powerful at fixed size under the simple-vs-simple assumptions.",
      },
      "T22-M28-A03": {
        focus: "Neyman-Pearson optimality for simple-vs-simple testing.",
        roleRelevance:
          "The lemma is the cleanest theorem-level example of optimal test construction and teaches exactly what an 'optimal' statistical procedure means relative to a constrained criterion.",
        purpose:
          "Derive the most-powerful LR test at level alpha and make the theorem's scope visible.",
        principalObstacle:
          "Optimality is conditional on two simple hypotheses and a size constraint; it does not say LR tests dominate every procedure for every statistical objective.",
        entryPrerequisites: ["T22-M28-A01-A02", "Inequality/algebraic reasoning"],
        target:
          "State and prove the key Neyman-Pearson comparison argument in a tractable setting, construct the MP rejection region, and handle discrete boundary/randomization issues when exact size alpha is unattainable deterministically.",
        requiredMastery: [
          "State the simple-vs-simple and fixed-size hypotheses of the lemma",
          "Derive the LR rejection form",
          "Give the core integral/sum comparison proving no other level-alpha test has higher power",
          "Handle a discrete example where boundary randomization is required for exact size",
          "Distinguish 'most powerful for this H1' from UMP over a composite alternative",
          "Identify a case where Neyman-Pearson does not directly apply",
        ],
        applicationScope:
          "Simple models where the LR ordering and alpha calibration are analytic or finitely enumerable.",
        transferScope:
          "A fresh simple-vs-simple problem in which the learner must derive rather than quote the MP test.",
        explicitlyOutOfScope: ["General UMP theory", "Bayesian decision optimality", "Composite nuisance parameters"],
        nextArcBoundary:
          "A04 treats power as a function of the true parameter rather than a single number at one alternative.",
      },
      "T22-M28-A04": {
        focus: "Power functions across parameter values.",
        roleRelevance:
          "Research decisions need to know which departures from a null are detectable, not merely whether one selected alternative has high power.",
        purpose:
          "Promote power from a single H1 probability to a function that exposes operating characteristics across the parameter space.",
        principalObstacle:
          "A test can have the advertised size yet have sharply uneven sensitivity across alternatives; one scalar power calculation can hide that structure.",
        entryPrerequisites: ["T22-M28-A01-A03", "ARC505 power"],
        target:
          "Derive and plot/analyze a power function beta(theta), identify its null-region constraints and alternative-region behavior, and compare competing tests across multiple parameter values.",
        requiredMastery: [
          "Define the power function P_theta(reject H0)",
          "Recover Type-I error values on the null parameter set",
          "Compute power at multiple alternatives",
          "Compare crossing power curves without claiming global dominance",
          "Explain how sample size or effect magnitude changes the function in a tractable model",
          "Transfer power-function analysis to a new statistic/test",
        ],
        applicationScope:
          "One-parameter families with analytically or numerically tractable rejection probabilities.",
        transferScope:
          "A different testing problem where the learner must inspect the whole operating-characteristic curve instead of a single headline power number.",
        explicitlyOutOfScope: ["Full optimal experimental design", "Sequential sample-size adaptation"],
        nextArcBoundary:
          "A05 generalizes the LR idea when hypotheses contain parameter sets rather than single parameter points.",
      },
      "T22-M28-A05": {
        focus: "Likelihood-ratio tests for composite hypotheses.",
        roleRelevance:
          "Most quantitative models compare restrictions on a parameter vector rather than two fully specified distributions.",
        purpose:
          "Construct the generalized likelihood-ratio statistic by comparing constrained and unconstrained maximum likelihoods and connect its asymptotic calibration to regular model geometry.",
        principalObstacle:
          "Replacing each composite hypothesis by its best-fitting parameter value changes the theorem: finite-sample Neyman-Pearson optimality is lost, and chi-square calibration requires regularity conditions.",
        entryPrerequisites: ["T22-M28-A02-A04", "ARC531 constrained/unconstrained MLE", "ARC533 regular likelihood curvature"],
        target:
          "Construct Lambda = sup_{Theta0} L / sup_{Theta} L, use -2 log Lambda as an evidence statistic, and state the regular nested-model conditions under which Wilks-style chi-square calibration is defensible.",
        requiredMastery: [
          "Compute constrained and unconstrained MLEs in a tractable model",
          "Form the generalized likelihood-ratio statistic",
          "Explain why smaller Lambda or larger -2 log Lambda favors departure from H0",
          "Relate degrees of freedom to the number of regular independent restrictions in simple nested cases",
          "Diagnose boundary/non-identifiable/nonnested cases where standard chi-square calibration can fail",
          "Distinguish asymptotic LRT calibration from exact finite-sample Neyman-Pearson optimality",
          "Transfer the construction to a new nested parametric model",
        ],
        applicationScope:
          "Regular low-dimensional nested likelihood models with one deliberately nonregular contrast.",
        transferScope:
          "A new restricted-vs-unrestricted model where the learner must derive the statistic and audit Wilks assumptions before using a reference distribution.",
        explicitlyOutOfScope: ["General nonnested model selection", "AIC/BIC theory", "Bootstrap calibration — ARC537"],
        nextArcBoundary:
          "A06 makes composite null and alternative sets explicit and introduces nuisance-parameter and uniformity problems.",
      },
      "T22-M28-A06": {
        focus: "Composite hypotheses, nuisance parameters and uniform error control.",
        roleRelevance:
          "Real research hypotheses rarely pin down every parameter; validity must therefore hold across a set of plausible null states rather than at one convenient point.",
        purpose:
          "Make the sup-over-null meaning of test size explicit and distinguish pointwise calibration from uniform control over a composite null.",
        principalObstacle:
          "A rule calibrated at one null parameter value can exceed the intended Type-I error elsewhere, especially when nuisance parameters change the statistic's distribution.",
        entryPrerequisites: ["T22-M28-A04-A05", "ARC505 significance levels"],
        target:
          "For a composite null, evaluate or bound sup_{theta in Theta0} P_theta(reject), identify nuisance-parameter dependence, and explain common strategies such as conditioning, invariance or conservative worst-case calibration at a conceptual level.",
        requiredMastery: [
          "Distinguish simple and composite parameter sets",
          "Define size as a supremum over a composite null",
          "Construct a counterexample where pointwise alpha at one null value is not uniform alpha control",
          "Identify nuisance parameters in a likelihood/test statistic",
          "Explain why plug-in nuisance estimates may alter finite-sample calibration",
          "Transfer the uniformity audit to an unfamiliar composite-null problem",
        ],
        applicationScope:
          "Low-dimensional composite hypotheses with transparent nuisance structure.",
        transferScope:
          "A new testing problem in which the learner must decide what must be controlled uniformly and what is merely pointwise.",
        explicitlyOutOfScope: ["Advanced ancillary-statistic theory", "General invariant-testing theory", "Semiparametric nuisance functions"],
        nextArcBoundary:
          "A07 asks when one test can be most powerful simultaneously over an entire composite alternative.",
      },
      "T22-M28-A07": {
        focus: "Uniformly most powerful tests and monotone-likelihood-ratio structure.",
        roleRelevance:
          "UMP results are rare but instructive: they show how model structure can turn many pointwise optimality problems into one uniformly dominant procedure.",
        purpose:
          "Understand what UMP means, derive it in a simple one-parameter monotone-likelihood-ratio setting, and recognize why two-sided or multiparameter alternatives often destroy uniform dominance.",
        principalObstacle:
          "Being most powerful against one alternative does not imply being most powerful against all alternatives; uniformity is a much stronger claim that requires special structure.",
        entryPrerequisites: ["T22-M28-A03-A06", "Order/monotonicity reasoning"],
        target:
          "Define UMP precisely, derive a threshold test from monotone likelihood-ratio structure in a tractable one-sided family, and demonstrate a case where no UMP test exists because power preferences conflict across alternatives.",
        requiredMastery: [
          "State the UMP criterion over an alternative parameter set",
          "Connect monotone likelihood-ratio ordering to one-sided rejection regions",
          "Derive a UMP test in a simple exponential-family example",
          "Compare power at different alternatives to verify uniform dominance",
          "Construct or explain a two-sided case where pointwise optimal tests conflict",
          "Reject unjustified UMP language in a multiparameter/nuisance setting",
          "Transfer the structure audit to an unfamiliar family",
        ],
        applicationScope:
          "Canonical one-parameter families with monotone-likelihood-ratio structure plus contrasts where UMP fails.",
        transferScope:
          "A new family where the learner must decide whether sufficient monotonic structure exists for a uniform optimality claim.",
        explicitlyOutOfScope: ["Full Karlin-Rubin theorem proof in maximal generality", "Locally most powerful and unbiased-test theory in depth"],
        nextArcBoundary:
          "A08 closes by cataloguing the assumptions and competing objectives that limit optimal-testing claims in real research.",
      },
      "T22-M28-A08": {
        focus: "Limits of optimal testing: regularity, misspecification, multiplicity and objective mismatch.",
        roleRelevance:
          "A mathematically optimal test can be scientifically poor if the model, null family, loss criterion or data-generation assumptions are wrong.",
        purpose:
          "Turn optimal-testing theory into a research audit discipline rather than a license to trust any test carrying an optimality theorem.",
        principalObstacle:
          "Optimality is always relative to assumptions and a criterion; dependence, misspecification, boundary parameters, data-dependent hypothesis selection, multiplicity or a different practical loss can invalidate the claimed guarantee.",
        entryPrerequisites: ["T22-M28-A01-A07", "ARC505 multiple testing", "ARC531 identifiability", "ARC533 regularity failures"],
        target:
          "Audit a likelihood-based testing workflow end to end, identifying which claims are exact, asymptotic, model-dependent or unsupported, and propose a safer next step when assumptions fail.",
        requiredMastery: [
          "Separate exact finite-sample, asymptotic and heuristic guarantees",
          "Diagnose model misspecification and dependence as threats to nominal calibration",
          "Identify boundary/non-identifiability cases that can break standard LRT asymptotics",
          "Explain why choosing hypotheses or directions after seeing the data changes the error analysis",
          "Integrate multiplicity concerns from ARC505 with likelihood-based testing",
          "Compare statistical optimality with practical loss/effect-size relevance",
          "Recommend resampling or other downstream validation when analytic calibration is doubtful",
          "Transfer the full audit to an unfamiliar quantitative-research testing scenario",
        ],
        applicationScope:
          "End-to-end audits of low-dimensional likelihood-based tests, including at least one deliberately misspecified or nonregular case.",
        transferScope:
          "A new research claim where the learner must classify every inferential guarantee and refuse unsupported optimality language.",
        explicitlyOutOfScope: ["Bootstrap/permutation construction — ARC537", "Sequential/selective inference", "Full robust/sandwich testing theory"],
        nextArcBoundary:
          "M29 / ARC537 owns resampling-based inference, including bootstrap and permutation methods used when analytic sampling distributions are unavailable or suspect.",
      },
    },
  };
}
