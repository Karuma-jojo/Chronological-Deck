export function buildT22RichModule20(syllabusVersion) {
  return {
    moduleId: "ARC503",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build sampling as the bridge between a target population and empirical data: define the population and estimand before collecting observations, model how units enter the sample, diagnose selection mechanisms that destroy representativeness, construct empirical distributions and sample summaries, and distinguish ordinary sample variability from structural selection effects.",
    moduleDestination:
      "The learner can specify a population, sampling frame, sample, unit and estimand; describe or critique a sampling mechanism; identify major selection biases; construct and interpret empirical distributions; compare sample statistics across repeated or resampled datasets; and diagnose whether an apparent empirical pattern is plausibly due to ordinary sampling variability or to a biased observation process.",
    entryPrerequisites: [
      "ARC048 probability foundations, especially events, conditional probability and expectation intuition",
      "Basic algebra, ratios and percentages",
      "Ability to distinguish a target question from the data actually observed",
      "Basic plotting/tabulation helpful but not required",
    ],
    explicitlyOutOfScope: [
      "General random-variable, density and named-distribution theory — ARC517",
      "Formal estimator sampling distributions, standard errors and confidence intervals — ARC504",
      "Law of large numbers, central limit theorem and concentration bounds — ARC712",
      "Hypothesis testing — ARC505",
      "Causal inference, treatment assignment and identification",
      "Survey-weighting theory, complex multistage designs and finite-population correction depth",
    ],
    arcs: {
      "T22-M20-A01": {
        focus: "Population, sampling frame, sample, observational unit and estimand as distinct objects.",
        roleRelevance:
          "Quantitative research fails early when the dataset is silently substituted for the population of interest; disciplined target specification is required before any statistic can be interpreted.",
        purpose:
          "Force the research target to be defined before sampling mechanics or numerical summaries enter the analysis.",
        principalObstacle:
          "The observed rows are not the population, the sampling frame may not equal the population, and a vague research question is not yet an estimand.",
        entryPrerequisites: ["ARC048 probability foundations", "Sets/categories", "Ratios and percentages"],
        target:
          "Given a research scenario, identify the target population, sampling frame, observational unit, realized sample and numerical estimand, and state the mismatch if any of these objects differ.",
        requiredMastery: [
          "Distinguish target population from realized sample",
          "Distinguish the sampling frame from both the target population and realized sample",
          "Identify the observational unit and avoid unit-of-analysis ambiguity",
          "Translate a verbal research goal into a concrete estimand such as a population mean, proportion or difference",
          "Explain why a statistic computed from a sample is not automatically the estimand itself",
          "Diagnose coverage gaps created when the frame omits part of the target population",
          "Transfer the distinctions to an unfamiliar market, survey, experiment-log or platform-data setting",
        ],
        applicationScope:
          "Research questions involving users, securities, transactions, firms, households, devices or other finite/operational populations where the observed dataset is only a subset of what the claim concerns.",
        transferScope:
          "A new dataset where the apparent row set tempts the analyst to skip population/frame/estimand specification.",
        explicitlyOutOfScope: [
          "Estimator bias/variance formalism — ARC504",
          "Causal estimands",
          "Complex survey weighting",
        ],
        nextArcBoundary:
          "A02 owns the mechanism that maps a frame or population into an observed sample and the assumptions under which selection can be treated as random.",
      },
      "T22-M20-A02": {
        focus: "Sampling mechanisms, inclusion probabilities and the difference between random selection and arbitrary data availability.",
        roleRelevance:
          "A sample is only interpretable through the process that generated it; quantitative researchers must know whether observed cases were selected probabilistically, systematically or merely because they were easy to obtain.",
        purpose:
          "Make the sampling mechanism an explicit stochastic or procedural object rather than an invisible assumption behind the dataset.",
        principalObstacle:
          "Calling a sample 'random' without specifying how units were selected hides unequal inclusion chances, dependence between selections and convenience sampling.",
        entryPrerequisites: ["T22-M20-A01", "ARC048 probability rules", "Basic combinatorial intuition"],
        target:
          "Describe simple random, stratified/systematic-style and convenience/voluntary-response mechanisms at a working level; compute or reason about inclusion probabilities in simple cases; and identify which population claims the mechanism can plausibly support.",
        requiredMastery: [
          "State a concrete sampling rule rather than label data as random without mechanism",
          "Explain equal-probability simple random sampling in a finite frame",
          "Distinguish sampling with replacement from sampling without replacement and describe the dependence consequence",
          "Reason about simple unequal inclusion probabilities",
          "Recognize convenience and voluntary-response samples as nonprobability mechanisms",
          "Identify when stratification or systematic selection changes the sampling design without automatically creating bias",
          "Diagnose a mechanism from a procedural description",
          "Transfer the design critique to an unfamiliar data-acquisition pipeline",
        ],
        applicationScope:
          "Finite frames, API/event samples, panel construction, surveys and operational datasets where inclusion is governed by an explicit or implicit rule.",
        transferScope:
          "A new collection process where the learner must reconstruct who could enter the sample, with what chance, and through which dependencies.",
        explicitlyOutOfScope: [
          "Horvitz-Thompson estimation and survey-weighting theory",
          "Advanced cluster/multistage sampling",
          "Asymptotic design-based inference",
        ],
        nextArcBoundary:
          "A03 owns the structural ways sampling mechanisms can make the observed sample systematically unrepresentative of the target population.",
      },
      "T22-M20-A03": {
        focus: "Selection bias, undercoverage, nonresponse, survivorship and self-selection.",
        roleRelevance:
          "Most damaging empirical failures in finance and observational research are not algebra mistakes but selection mechanisms that make the observed data systematically unlike the target population.",
        purpose:
          "Build a taxonomy of sampling bias tied to causal selection mechanisms rather than memorized labels.",
        principalObstacle:
          "A large sample can remain badly biased when inclusion depends on variables related to the outcome or target estimand; more rows do not repair structural selection.",
        entryPrerequisites: ["T22-M20-A01-A02", "Conditional probability intuition", "Basic percentage reasoning"],
        target:
          "Given a data-generation story, identify the selection path, show how it can distort the target quantity, and state what additional data or redesign would reduce the bias.",
        requiredMastery: [
          "Distinguish random sampling variability from systematic selection bias",
          "Diagnose undercoverage when parts of the target population cannot enter the frame/sample",
          "Diagnose nonresponse or attrition when inclusion depends on participation or persistence",
          "Diagnose survivorship bias when failed/exited units disappear from the observed record",
          "Diagnose voluntary-response/self-selection mechanisms",
          "Construct a small numerical counterexample where a larger biased sample converges toward the wrong population quantity",
          "Explain why post hoc precision cannot compensate for a biased sample-generation process",
          "Propose a concrete redesign, auxiliary data source or sensitivity check targeted at the actual selection mechanism",
          "Transfer the diagnosis to an unfamiliar quant-research dataset",
        ],
        applicationScope:
          "Historical constituent databases, strategy universes, customer datasets, survey responses, platform activity and any observational dataset with entry/exit filters.",
        transferScope:
          "A new setting where selection occurs through a subtle operational filter rather than an explicitly labelled survey bias.",
        explicitlyOutOfScope: [
          "Causal-selection models and inverse-probability weighting depth",
          "Missing-data mechanism theory beyond basic selection reasoning",
          "Corporate-action and look-ahead leakage engineering — ARC715",
        ],
        nextArcBoundary:
          "A04 owns what can be learned descriptively from the realized sample itself through its empirical distribution, without yet making formal population-level inference.",
      },
      "T22-M20-A04": {
        focus: "Empirical distributions as the observed allocation of mass across sample values.",
        roleRelevance:
          "Quant researchers must inspect the shape, tails, discreteness and support of observed data before fitting models or relying on a few summary numbers.",
        purpose:
          "Turn a raw sample into a distributional object that preserves more information than a single average.",
        principalObstacle:
          "A sample mean or median can conceal multimodality, skew, heavy concentration, truncation or tail behaviour that is visible in the empirical distribution.",
        entryPrerequisites: ["T22-M20-A01-A03", "Sorting", "Fractions/percentages", "Basic plotting intuition"],
        target:
          "Construct empirical frequencies/proportions and an empirical cumulative distribution from observed values, and use them to answer distributional questions without assuming a named population distribution.",
        requiredMastery: [
          "Construct a frequency or relative-frequency table from a sample",
          "Interpret the empirical distribution as assigning mass 1/n to each observation with duplicates accumulating appropriately",
          "Construct and read an empirical cumulative distribution function at specified thresholds",
          "Extract sample quantiles or percentile-style summaries from ordered data with a stated convention",
          "Compare two samples through location, spread, skew, discreteness, tails and support rather than only their means",
          "Diagnose when identical means hide materially different empirical distributions",
          "Recognize truncation/censoring-like visible support restrictions without performing later formal modelling",
          "Transfer empirical-distribution reasoning to an unfamiliar return, latency, volume or outcome dataset",
        ],
        applicationScope:
          "Observed returns, spreads, response times, transaction sizes, scores and other one-dimensional samples where distribution shape matters operationally.",
        transferScope:
          "A new sample whose key structure is only visible when the full empirical distribution is examined rather than compressed to one statistic.",
        explicitlyOutOfScope: [
          "General random-variable CDF/density theory — ARC517",
          "Kernel density estimation",
          "Formal goodness-of-fit tests",
        ],
        nextArcBoundary:
          "A05 owns numerical summaries of a sample and how those summaries fluctuate when the observed sample changes.",
      },
      "T22-M20-A05": {
        focus: "Sample statistics, resampling thought experiments and ordinary finite-sample variability.",
        roleRelevance:
          "Every empirical estimate changes when the realized sample changes; researchers need an operational sense of instability before formal estimator sampling-distribution theory arrives.",
        purpose:
          "Separate the fixed population target from the random statistic produced by a particular sample, and build concrete intuition for how sample summaries vary across repeated selections.",
        principalObstacle:
          "A statistic computed once looks like a fixed number, which makes it easy to forget that under repeated sampling the same procedure would generally produce different values.",
        entryPrerequisites: ["T22-M20-A01-A04", "Arithmetic mean/median/proportion", "Basic random-sampling intuition"],
        target:
          "Compute representative sample statistics, compare them across repeated or simulated samples from a simple population, and explain qualitatively how sample size and population heterogeneity affect observed variability without claiming formal standard-error results.",
        requiredMastery: [
          "Compute and interpret sample mean, median, proportion and simple spread summaries",
          "Distinguish a statistic as a function of the observed sample from the fixed estimand it is intended to inform",
          "Generate or reason through several repeated samples from a simple finite population and compare the resulting statistics",
          "Explain why repeated samples from the same population need not give identical statistics",
          "Show empirically or combinatorially in a simple case that larger samples tend to reduce ordinary sampling fluctuation while not repairing selection bias",
          "Diagnose an argument that treats one realized estimate as exact because the calculation itself was deterministic",
          "Compare robustness of mean and median under a deliberately contaminated sample at a descriptive level",
          "Transfer the variability reasoning to an unfamiliar empirical metric",
        ],
        applicationScope:
          "Repeated samples or small simulations used to inspect the stability of descriptive statistics before formal inference.",
        transferScope:
          "A new metric where the learner must distinguish computational determinism from sampling uncertainty and reason about what would change under a different realized sample.",
        explicitlyOutOfScope: [
          "Formal sampling distributions, estimator bias/variance/MSE and standard errors — ARC504",
          "LLN/CLT rates and asymptotic normality — ARC712",
          "Bootstrap inference",
        ],
        nextArcBoundary:
          "A06 owns integrated distributional diagnosis: detecting when observed sample shape is itself evidence of filtering, truncation or selection and deciding what can safely be concluded.",
      },
      "T22-M20-A06": {
        focus: "Distributional diagnostics, range restriction and selection effects in observed samples.",
        roleRelevance:
          "Quantitative datasets often arrive after screens, eligibility rules, survivorship filters or operational truncation; the resulting distribution can look clean precisely because the observation process removed inconvenient cases.",
        purpose:
          "Integrate sampling mechanism and empirical-distribution reasoning into a research audit that separates genuine population structure from artifacts of selection.",
        principalObstacle:
          "Observed distributional shape is jointly produced by the population and the selection/measurement process, so a smooth or stable sample distribution is not proof that the underlying population shares that shape.",
        entryPrerequisites: ["T22-M20-A01-A05", "Conditional-probability intuition", "Empirical CDF/frequency reasoning"],
        target:
          "Audit an observed sample by comparing its empirical distribution with known collection rules or subgroup information, identify plausible selection-induced distortions, and state which descriptive conclusions remain defensible and which population claims require stronger evidence.",
        requiredMastery: [
          "Identify range restriction or truncation induced by explicit eligibility/screening rules",
          "Compare subgroup empirical distributions to expose composition shifts hidden in the pooled sample",
          "Detect suspicious absence of failures, exits or extreme observations when the collection mechanism could remove them",
          "Explain Simpson-like composition changes at a descriptive sampling level without importing causal inference",
          "Construct a simple before/after selection example showing how conditioning on inclusion changes an empirical distribution",
          "Distinguish a descriptive statement about the realized sample from a claim about the target population",
          "Design a concrete diagnostic such as inclusion-rate tables, subgroup comparisons, frame reconciliation or attrition tracking",
          "Write an auditable conclusion stating what the sample supports, what selection mechanism threatens it, and what evidence would resolve the ambiguity",
          "Transfer the audit to an unfamiliar financial or platform dataset",
        ],
        applicationScope:
          "Backtest universes, screened securities, user cohorts, filtered transaction logs and observational samples whose inclusion rules can reshape the observed distribution.",
        transferScope:
          "A new dataset where apparently benign distributional regularity may be created by selection rather than by the target population itself.",
        explicitlyOutOfScope: [
          "Formal missing-data models and bias correction",
          "Causal inference and collider-bias theory",
          "Production-grade financial data cleaning and vendor/corporate-action bias controls — ARC715",
          "Formal estimator inference — ARC504",
        ],
        nextArcBoundary:
          "M21 / ARC517 owns general random variables, PMFs, densities, CDFs, moments, transformations, joint/conditional distributions, covariance and named distribution families; M22 / ARC504 then formalizes estimator sampling distributions and uncertainty.",
      },
    },
  };
}
