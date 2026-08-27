export function buildT22RichModule27(syllabusVersion) {
  return {
    moduleId: "ARC533",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Turn the score and likelihood curvature from ARC531 into a rigorous information framework: define Fisher information through score variability and expected curvature under explicit regularity conditions, distinguish observed from expected information, prove information additivity for independent samples, derive and interpret the Cramer-Rao lower bound with its hypotheses, and connect information geometry to finite-sample estimator variance and regular asymptotic MLE behavior without overclaiming exact efficiency.",
    moduleDestination:
      "The learner can compute scalar and matrix Fisher information from a stated regular model, justify equivalence of common definitions when assumptions permit, distinguish data-dependent observed information from model-expected information, derive n-sample information growth, apply the Cramer-Rao bound only to eligible estimators, and explain when inverse information is or is not a defensible uncertainty approximation for an MLE.",
    entryPrerequisites: [
      "ARC531 likelihoods, log-likelihoods, score functions, Hessians, MLE and identifiability",
      "ARC504 estimator variance, bias and sampling distributions",
      "ARC517 expectation, variance, covariance and joint distributions",
      "ARC712 repeated-sampling and asymptotic reasoning",
      "SIDE271/ARC711 gradients, Hessians and matrix-calculus notation for vector parameters",
    ],
    explicitlyOutOfScope: [
      "Neyman-Pearson theory, likelihood-ratio tests, Wald tests and score tests — ARC534",
      "Bootstrap or permutation uncertainty — ARC537",
      "Bayesian posterior curvature or Bernstein-von Mises theory",
      "Semiparametric efficiency, influence functions and information bounds",
      "Advanced differential-geometric information geometry",
      "Nonregular asymptotics beyond diagnosing why regular conclusions fail",
    ],
    arcs: {
      "T22-M27-A01": {
        focus: "Information as local parameter sensitivity of a probability model.",
        roleRelevance:
          "Quantitative researchers need a principled way to compare how sharply different datasets or models can distinguish nearby parameter values before choosing estimators or reporting uncertainty.",
        purpose:
          "Build the conceptual bridge from likelihood sensitivity to statistical information without introducing a formula before the object it measures is clear.",
        principalObstacle:
          "A sharply changing likelihood can indicate local parameter distinguishability, but raw curvature at one realized sample is data-dependent and parameterization-sensitive; information must be defined through a repeated-sampling object with explicit regularity conditions.",
        entryPrerequisites: ["ARC531 score and likelihood curvature", "ARC504 estimator variability"],
        target:
          "Explain information as local distinguishability of nearby parameter values, relate it to score/curvature intuition, and state why repeated-sampling averaging is needed before claiming a model-level information quantity.",
        requiredMastery: [
          "Compare two models whose likelihoods react differently to small parameter perturbations",
          "Explain why flatter likelihood regions imply weaker local parameter determination",
          "Distinguish realized likelihood curvature from a model-level expected quantity",
          "Identify support or differentiability changes that make naive local-sensitivity reasoning unsafe",
          "Construct a counterexample where a sharp realized likelihood does not justify a universal information claim",
          "Transfer local distinguishability reasoning to an unfamiliar parametric model",
        ],
        applicationScope:
          "Low-dimensional regular parametric models where local likelihood sensitivity can be visualized or computed directly.",
        transferScope:
          "A new model in which the learner must decide what local perturbation of the parameter means and what repeated-sampling quantity could summarize distinguishability.",
        explicitlyOutOfScope: ["Formal Fisher-information formulas", "Hypothesis testing", "Bayesian information measures"],
        nextArcBoundary:
          "A02 turns the score into a random variable under the model and studies its variability.",
      },
      "T22-M27-A02": {
        focus: "Score variability as a repeated-sampling measure of local likelihood sensitivity.",
        roleRelevance:
          "The score is the local evidence direction used later in information matrices, score tests and asymptotic variance calculations.",
        purpose:
          "Treat the score as a random variable under P_theta and derive its mean-zero and variance structure only when the required interchange/support conditions hold.",
        principalObstacle:
          "E_theta[score]=0 is not an algebraic identity valid for every model; it relies on differentiating a normalized probability law without hidden support or boundary failures.",
        entryPrerequisites: ["T22-M27-A01", "ARC531 score functions", "ARC517 expectation/variance"],
        target:
          "For a regular scalar model, justify E_theta[U(theta)]=0, compute Var_theta(U(theta)), and diagnose cases where the identity fails because regularity conditions break.",
        requiredMastery: [
          "Compute a score as a data-dependent random variable",
          "Derive the mean-zero score identity in a finite/discrete or otherwise justified model",
          "State the differentiation-sum/integral interchange step explicitly",
          "Compute score variance from first principles",
          "Diagnose a parameter-dependent-support counterexample",
          "Transfer the calculation to a new one-parameter family",
        ],
        applicationScope:
          "Bernoulli, Poisson, exponential, normal-location or similarly transparent regular models plus at least one nonregular contrast.",
        transferScope:
          "A different family where the learner must check regularity before using the score-variance machinery.",
        explicitlyOutOfScope: ["Score tests — ARC534", "General empirical-process score theory"],
        nextArcBoundary:
          "A03 defines Fisher information and proves equivalence of score-variance and expected-curvature forms under suitable conditions.",
      },
      "T22-M27-A03": {
        focus: "Fisher information from score variance and expected negative log-likelihood curvature.",
        roleRelevance:
          "Fisher information controls local estimator precision, asymptotic covariance and design comparisons throughout quantitative statistics.",
        purpose:
          "Derive Fisher information rather than memorizing I(theta)=E[U^2]=-E[l''(theta)] as an unconditional identity.",
        principalObstacle:
          "The two common formulas are equivalent only under regularity conditions that justify differentiating the score expectation and exchanging differentiation with expectation.",
        entryPrerequisites: ["T22-M27-A02", "ARC531 Hessian/curvature"],
        target:
          "Define scalar Fisher information I(theta)=E[U(theta)^2] and, when justified, derive I(theta)=-E[l''(theta)]; extend the structure to vector parameters as a score covariance / expected negative Hessian matrix.",
        requiredMastery: [
          "Compute Fisher information from score variance",
          "Derive the expected-curvature identity from the differentiated mean-zero score relation",
          "State the regularity assumptions or interchange steps used",
          "Form a Fisher information matrix for a simple vector parameter",
          "Check positive-semidefiniteness from covariance structure",
          "Diagnose singular information and connect it to weak/local non-identifiability",
          "Transfer the derivation to an unfamiliar regular family",
        ],
        applicationScope:
          "Regular scalar and low-dimensional parametric families with analytic score/Hessian calculations.",
        transferScope:
          "A new model where the learner chooses the safer definition and verifies whether the alternate form is valid.",
        explicitlyOutOfScope: ["Cramer-Rao bound", "Likelihood-ratio/Wald/score tests", "Global model comparison"],
        nextArcBoundary:
          "A04 separates realized observed curvature from expected Fisher information and shows why the distinction matters in finite samples.",
      },
      "T22-M27-A04": {
        focus: "Observed information versus expected Fisher information.",
        roleRelevance:
          "Practical likelihood software often reports curvature at the fitted sample, while theory may invoke expectation under the model; confusing the two can hide finite-sample instability.",
        purpose:
          "Keep data-dependent observed information and model-averaged expected information conceptually and computationally distinct.",
        principalObstacle:
          "Observed information J(theta;x)=-l''(theta;x) can vary sharply across datasets and may even be indefinite away from a local maximum, whereas Fisher information is an expectation under the model.",
        entryPrerequisites: ["T22-M27-A03", "ARC531 likelihood Hessians"],
        target:
          "Compute and compare observed and expected information in tractable models, explain when they coincide or differ, and interpret what each object can support.",
        requiredMastery: [
          "Define observed information for scalar and vector parameters",
          "Compute observed and expected information in the same model",
          "Explain why one is sample-dependent and the other is model-expected",
          "Identify a model where observed information depends materially on the realized data",
          "Diagnose an invalid uncertainty claim based on curvature at a nonmaximum or near-boundary point",
          "Transfer the distinction to numerical likelihood output",
        ],
        applicationScope:
          "Finite-sample likelihoods in which Hessian curvature can be computed analytically or numerically.",
        transferScope:
          "A fitted-model output where the learner must identify exactly which information object is being reported and what assumptions justify using it.",
        explicitlyOutOfScope: ["General sandwich/robust covariance estimators", "Bootstrap curvature replacement"],
        nextArcBoundary:
          "A05 studies how information combines across independent observations and why the familiar n-scaling requires an actual factorization assumption.",
      },
      "T22-M27-A05": {
        focus: "Information additivity across independent observations and experiments.",
        roleRelevance:
          "Sample-size planning, experimental design and asymptotic covariance all rely on understanding how independent evidence accumulates.",
        purpose:
          "Derive information growth from additive scores/log-likelihoods rather than treating I_n=nI_1 as a universal sample-size law.",
        principalObstacle:
          "Information adds because independent joint log-likelihoods and score covariances combine in a specific way; dependence or heterogeneous observations change the formula.",
        entryPrerequisites: ["T22-M27-A03-A04", "ARC517 independence/covariance", "ARC531 joint likelihoods"],
        target:
          "Prove information additivity for independent observations, derive nI(theta) for iid samples, and generalize to independent non-identically distributed observations while diagnosing dependence failures.",
        requiredMastery: [
          "Derive the sample score as a sum of individual scores",
          "Show why cross-covariance terms vanish under independence and mean-zero scores",
          "Derive I_n(theta)=n I_1(theta) in the iid regular case",
          "Compute total information for heterogeneous independent observations",
          "Construct a dependence counterexample where naive n-scaling exaggerates information",
          "Connect information growth to the square-root-n uncertainty scale without treating it as a new CLT proof",
        ],
        applicationScope:
          "Independent repeated measurements, heterogeneous exposures or simple design comparisons.",
        transferScope:
          "A new sampling scheme where the learner must determine whether information adds and what replaces the iid formula.",
        explicitlyOutOfScope: ["Time-series information rates", "Optimal experimental design theory"],
        nextArcBoundary:
          "A06 converts information into a lower bound on the variance of unbiased estimators under explicit hypotheses.",
      },
      "T22-M27-A06": {
        focus: "Cramer-Rao lower bound as a conditional efficiency limit, not a universal variance guarantee.",
        roleRelevance:
          "The bound provides a benchmark for estimator precision and reveals what information can and cannot buy under a specified regular model.",
        purpose:
          "Derive the scalar unbiased Cramer-Rao inequality and make every assumption visible before applying it.",
        principalObstacle:
          "The familiar Var(T)>=1/I(theta) statement can fail or be inapplicable for biased estimators, boundary/nonregular models, parameter-dependent support, or estimands other than theta without the correct derivative factor.",
        entryPrerequisites: ["T22-M27-A03-A05", "ARC504 unbiasedness/variance", "Cauchy-Schwarz inequality"],
        target:
          "Derive the scalar Cramer-Rao bound from the covariance between an unbiased estimator and the score, apply it only under eligible regularity conditions, and adapt it to unbiased estimation of g(theta) with the appropriate derivative term.",
        requiredMastery: [
          "Derive Cov(T,U)=1 for unbiased estimation of theta under justified differentiation",
          "Apply Cauchy-Schwarz to obtain the lower bound",
          "State unbiasedness and regularity conditions before use",
          "Use the generalized [g'(theta)]^2/I(theta) form for an unbiased estimator of g(theta)",
          "Identify an estimator/model for which the standard bound is inapplicable rather than 'violated'",
          "Explain equality conditions and what efficient estimation would require",
          "Transfer the derivation to a new regular one-parameter family",
        ],
        applicationScope:
          "Textbook-regular one-parameter models where the score and estimator covariance can be derived explicitly.",
        transferScope:
          "An unfamiliar estimator/model pair where eligibility for the bound must be audited before calculation.",
        explicitlyOutOfScope: ["Biased Cramer-Rao variants in full generality", "Semiparametric efficiency bounds", "Bayesian lower bounds"],
        nextArcBoundary:
          "A07 closes the module by connecting information to regular asymptotic MLE covariance and by cataloguing the cases where that approximation should not be trusted.",
      },
      "T22-M27-A07": {
        focus: "Efficiency and regular asymptotic MLE behaviour through inverse Fisher information.",
        roleRelevance:
          "Likelihood-based quantitative models routinely report inverse-information standard errors, so researchers must know the theorem-shaped assumptions behind those numbers.",
        purpose:
          "Connect MLEs, information additivity and asymptotic normality without converting a regular large-sample result into an exact finite-sample guarantee.",
        principalObstacle:
          "The heuristic sqrt(n)(hat-theta-theta0) approximately Normal(0,I(theta0)^-1) requires consistency, interior identifiability, smoothness, nonsingular information and suitable sampling conditions; finite samples or nonregular models can behave very differently.",
        entryPrerequisites: ["T22-M27-A03-A06", "ARC531 MLE/identifiability", "ARC712 CLT/asymptotic reasoning"],
        target:
          "Explain and use the regular asymptotic covariance relation for MLEs, compare efficient and inefficient estimators in tractable examples, and reject inverse-information uncertainty when regularity diagnostics fail.",
        requiredMastery: [
          "State the regular asymptotic MLE normality claim with its scaling and covariance",
          "Connect n-sample information to 1/sqrt(n) standard-error decay",
          "Compare an MLE's variance with the information benchmark in a tractable model",
          "Distinguish exact finite-sample efficiency from asymptotic efficiency",
          "Diagnose singular information, weak identification, boundary parameters or changing support as warning signs",
          "Explain why observed-information and expected-information standard errors may differ in finite samples",
          "Transfer the audit to numerical likelihood output from an unfamiliar model",
        ],
        applicationScope:
          "Regular low-dimensional MLEs with analytically tractable information and one deliberately nonregular contrast.",
        transferScope:
          "A fitted quantitative model where the learner must decide whether inverse-information uncertainty is theorem-supported, merely heuristic, or indefensible.",
        explicitlyOutOfScope: [
          "Formal proofs of the most general MLE asymptotic-normality theorem",
          "Likelihood-ratio, Wald and score tests — ARC534",
          "Bootstrap alternatives — ARC537",
          "Sandwich covariance under misspecification",
        ],
        nextArcBoundary:
          "M28 / ARC534 owns likelihood-based hypothesis testing, including likelihood-ratio, Wald and score-test structures built on M24-M27.",
      },
    },
  };
}
