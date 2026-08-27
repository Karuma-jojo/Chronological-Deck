export function buildT22RichModule19(syllabusVersion) {
  return {
    moduleId: "ARC502",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build Bayesian updating as disciplined conditional-probability reasoning: make base rates explicit, derive Bayes' rule instead of memorizing it, use odds and likelihood ratios to separate prior information from evidential weight, update sequentially without double-counting evidence, and stress-test conclusions against prior and model assumptions.",
    moduleDestination:
      "The learner can translate a verbal evidence problem into hypotheses, priors, likelihoods and posteriors; derive and apply Bayes' rule; express evidence through likelihood ratios and posterior odds; perform coherent sequential updates when conditional assumptions are stated; and diagnose when a posterior is being driven by fragile priors, misspecified likelihoods, dependent evidence or an incomplete hypothesis set.",
    entryPrerequisites: [
      "ARC048 probability foundations, especially conditional probability, independence and expectation intuition",
      "Basic algebra, ratios and percentages",
      "Ability to distinguish P(A|B) from P(B|A)",
      "Comfort stating assumptions explicitly before calculating",
    ],
    explicitlyOutOfScope: [
      "Continuous-distribution Bayes calculations requiring densities — ARC517",
      "Bayesian parameter estimation, conjugate-prior families or posterior predictive modelling",
      "Likelihood construction and maximum likelihood estimation — ARC531",
      "Formal decision theory, utility and Bayes-optimal actions",
      "Sampling-based posterior computation such as MCMC",
      "Bayesian networks or graphical-model algorithms",
    ],
    arcs: {
      "T22-M19-A01": {
        focus: "Base rates, diagnostic evidence and why intuitive reversal of conditionals fails.",
        roleRelevance:
          "Quantitative researchers constantly evaluate signals, screens, alerts and rare-event hypotheses; ignoring prevalence can make apparently strong evidence produce weak posterior odds.",
        purpose:
          "Make the base-rate problem operational before introducing Bayes' rule so updating is motivated by a concrete failure of naive evidence interpretation.",
        principalObstacle:
          "A high hit rate P(E|H) does not imply a high probability P(H|E); the posterior also depends on how common H was before observing E and how often E occurs when H is false.",
        entryPrerequisites: ["ARC048 conditional probability", "Event complements", "Ratios and percentages"],
        target:
          "Given a rare-hypothesis evidence problem, reconstruct the population or probability table, distinguish the two conditional directions, and explain quantitatively how the base rate changes the posterior conclusion.",
        requiredMastery: [
          "Distinguish sensitivity-like quantities P(E|H) from posterior quantities P(H|E)",
          "Construct a finite-frequency/table representation of a base-rate problem",
          "Compute true positives and false positives under an explicit prevalence",
          "Explain why a strong test or signal can still yield a modest posterior when the hypothesis is rare",
          "Diagnose a base-rate-neglect argument without relying on a memorized formula",
          "Identify what additional probability information is required before the posterior is identifiable",
          "Transfer the reasoning to an unfamiliar fraud, anomaly, medical-screening or trading-signal setting",
        ],
        applicationScope:
          "Rare-event screens, anomaly detectors, alerts, hypothesis filters and binary signals where prevalence and false positives materially affect interpretation.",
        transferScope:
          "A new domain with different surface language but the same conditional-reversal and prevalence structure.",
        explicitlyOutOfScope: [
          "General Bayesian parameter estimation",
          "Continuous densities",
          "Decision thresholds or expected-utility optimization",
        ],
        nextArcBoundary:
          "A02 owns the general algebraic identity that converts prior probability and likelihood information into posterior probability.",
      },
      "T22-M19-A02": {
        focus: "Deriving Bayes' rule from conditional probability and total probability.",
        roleRelevance:
          "Bayes' rule is a reusable research identity for reversing conditional direction without hand-waving, provided the hypotheses and evidence model are stated correctly.",
        purpose:
          "Derive Bayes' rule from definitions and make every denominator term interpretable rather than treat the formula as a black box.",
        principalObstacle:
          "The posterior requires normalization over all ways the evidence could occur; omitting competing hypotheses or using the wrong denominator produces numerically plausible but logically invalid answers.",
        entryPrerequisites: ["T22-M19-A01", "ARC048 conditional probability", "Law of total probability for a finite partition"],
        target:
          "Derive P(H|E)=P(E|H)P(H)/P(E), expand P(E) across a finite mutually exclusive and exhaustive hypothesis partition, and use the result only when conditioning events have nonzero probability.",
        requiredMastery: [
          "Derive Bayes' rule by equating two factorizations of a joint probability",
          "Expand the evidence probability with the law of total probability over a finite partition",
          "State the mutually-exclusive/exhaustive and nonzero-conditioning requirements",
          "Compute a posterior for binary and small multi-hypothesis cases",
          "Check that posterior probabilities normalize to one across the hypothesis set",
          "Diagnose a calculation that silently omits a plausible competing hypothesis",
          "Reconstruct the same answer from a frequency table and from algebra to verify consistency",
        ],
        applicationScope:
          "Finite hypothesis comparisons involving classifications, competing regimes, signal explanations or diagnostic evidence.",
        transferScope:
          "An unfamiliar multi-hypothesis problem where the learner must build the denominator rather than plug values into a prewritten binary formula.",
        explicitlyOutOfScope: [
          "Density-based Bayes theorem",
          "Improper priors",
          "Model evidence integrals over parameter spaces",
        ],
        nextArcBoundary:
          "A03 owns the odds form of Bayes' rule and likelihood ratios as a clean measure of how evidence changes relative support.",
      },
      "T22-M19-A03": {
        focus: "Prior odds, posterior odds and likelihood ratios as evidence multipliers.",
        roleRelevance:
          "Likelihood ratios separate evidential strength from prevalence and make it easier to compare signals across different prior environments without confusing probability with evidence weight.",
        purpose:
          "Reexpress Bayesian updating multiplicatively so the learner can reason about evidence strength independently of the initial odds.",
        principalObstacle:
          "A likelihood ratio is not itself a posterior probability, and a large ratio can still leave posterior probability modest when prior odds are extremely small.",
        entryPrerequisites: ["T22-M19-A01-A02", "Ratios", "Odds p/(1-p) and inverse-odds conversion"],
        target:
          "Derive posterior odds = prior odds × likelihood ratio for two hypotheses, interpret LR>1, LR=1 and LR<1, and move correctly between probability and odds representations.",
        requiredMastery: [
          "Convert probability to odds and odds back to probability",
          "Derive the posterior-odds identity from Bayes' rule",
          "Compute and interpret the likelihood ratio P(E|H1)/P(E|H0)",
          "Explain why LR=1 means the evidence does not change relative odds",
          "Show numerically how the same likelihood ratio produces different posteriors under different priors",
          "Distinguish likelihood ratio, posterior odds and posterior probability",
          "Diagnose the error of calling a likelihood ratio a probability or confidence score",
          "Transfer odds updating to an unfamiliar signal or model-comparison problem",
        ],
        applicationScope:
          "Binary model comparison, screening signals and hypothesis-ranking problems where evidential weight and prior plausibility should be kept conceptually separate.",
        transferScope:
          "A new problem where odds form reveals the update more transparently than direct probability arithmetic.",
        explicitlyOutOfScope: [
          "Likelihood-ratio hypothesis tests and Neyman-Pearson optimality — ARC534",
          "Likelihood construction over unknown parameters — ARC531",
          "Log-likelihood optimization",
        ],
        nextArcBoundary:
          "A04 owns repeated evidence: when successive updates can be chained, how order behaves, and when dependence makes naive multiplication invalid.",
      },
      "T22-M19-A04": {
        focus: "Sequential Bayesian updating and conditional evidence dependence.",
        roleRelevance:
          "Research conclusions evolve as new observations arrive; coherent updating must use only genuinely new information and account for evidence dependence rather than counting the same signal twice.",
        purpose:
          "Show how posterior beliefs become the next prior and establish the exact assumptions under which likelihood ratios multiply across observations.",
        principalObstacle:
          "Repeated evidence is not automatically independent evidence; multiplying marginal likelihood ratios can double-count shared information and create severe overconfidence.",
        entryPrerequisites: ["T22-M19-A01-A03", "ARC048 independence and conditional probability", "Products of conditional probabilities"],
        target:
          "Perform sequential updates by using the current posterior as the next prior, derive the chain-rule likelihood for multiple observations, and distinguish conditionally independent evidence from dependent or duplicated evidence.",
        requiredMastery: [
          "Update a prior with one observation and carry the posterior forward as the next prior",
          "Derive the joint likelihood of sequential observations with the probability chain rule",
          "Show when conditional independence given each hypothesis allows likelihood ratios to multiply",
          "Explain why update order is irrelevant when the same joint evidence model is used exactly",
          "Diagnose double counting when two features are deterministic, highly overlapping or share an upstream source",
          "Compare a correct dependent-evidence update with an incorrect naive-independent update",
          "Identify what conditional probabilities would be needed to model dependence explicitly",
          "Transfer sequential updating to streaming signals, repeated tests or accumulating research evidence",
        ],
        applicationScope:
          "Sequences of discrete observations, alerts or research findings with explicit conditional dependence assumptions.",
        transferScope:
          "An unfamiliar case where multiple apparently distinct pieces of evidence are partially redundant and naive likelihood multiplication must be rejected.",
        explicitlyOutOfScope: [
          "Hidden Markov models and filtering — ARC543/ARC524",
          "Continuous-time Bayesian filtering",
          "General graphical models",
          "MCMC or particle filters",
        ],
        nextArcBoundary:
          "A05 owns robustness: how much the posterior depends on prior choices, likelihood assumptions and the hypothesis/model set itself.",
      },
      "T22-M19-A05": {
        focus: "Prior sensitivity, likelihood misspecification and model dependence of posterior conclusions.",
        roleRelevance:
          "A posterior can look mathematically precise while being substantively fragile; quantitative research requires knowing whether evidence overwhelms reasonable priors or whether conclusions mostly reflect modelling choices.",
        purpose:
          "Turn Bayesian updating into an auditable research argument by stress-testing the prior, likelihood and hypothesis set instead of reporting a single posterior as if it were assumption-free.",
        principalObstacle:
          "Bayes' rule is exact conditional on the model, but the model inputs are not automatically true; a posterior can be highly sensitive to prior odds, evidence probabilities or omitted alternatives.",
        entryPrerequisites: ["T22-M19-A01-A04", "Scenario analysis", "Basic plotting or tabulation helpful but not required"],
        target:
          "Stress-test a posterior over plausible priors and likelihood values, identify which assumptions dominate, and state conclusions with calibrated language that distinguishes conditional mathematical certainty from empirical model uncertainty.",
        requiredMastery: [
          "Recompute posterior conclusions across a defensible range of prior probabilities",
          "Identify when evidence is strong enough that reasonable prior variation has little practical effect",
          "Identify when posterior conclusions remain prior-dominated",
          "Stress-test sensitivity to false-positive/false-negative or likelihood assumptions",
          "Explain how omitted hypotheses can distort normalization and posterior interpretation",
          "Distinguish uncertainty inside a specified probabilistic model from uncertainty about whether that model is appropriate",
          "Diagnose a falsely precise posterior claim whose assumptions are untested",
          "Write a concise posterior conclusion that states the key prior/model dependence and what new evidence would be most informative",
          "Transfer the robustness audit to an unfamiliar research claim or signal-evaluation problem",
        ],
        applicationScope:
          "Small Bayesian evidence analyses where priors and likelihoods can be varied explicitly and the stability of the substantive conclusion can be inspected.",
        transferScope:
          "A new claim whose posterior appears decisive under one modelling choice but changes materially under another plausible prior or evidence model.",
        explicitlyOutOfScope: [
          "Hierarchical Bayesian modelling",
          "Formal Bayesian model averaging",
          "Posterior predictive checks requiring full distribution theory",
          "Bayesian decision theory",
        ],
        nextArcBoundary:
          "M20 / ARC503 owns how samples are generated, selected and summarized; later ARC517 supplies general random-variable/distribution machinery and ARC531 owns formal likelihood-based statistical models.",
      },
    },
  };
}
