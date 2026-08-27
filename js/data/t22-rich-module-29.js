export function buildT22RichModule29(syllabusVersion) {
  return {
    moduleId: "ARC537",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build resampling inference as a model-auditing and uncertainty-estimation toolkit: derive the bootstrap from the empirical distribution, use it to approximate estimator sampling behavior, quantify standard error and bias, construct and critique bootstrap confidence intervals, identify failure regimes, develop permutation tests from exchangeability, connect rank-based procedures to invariance/distribution-free reasoning, and finish with an end-to-end resampling study.",
    moduleDestination:
      "The learner can design and implement bootstrap and permutation procedures from explicit resampling assumptions, explain what distribution each procedure is approximating, estimate uncertainty without treating simulation output as automatic truth, choose and defend interval/test constructions, detect invalid resampling schemes under dependence, heavy tails, boundaries or non-smooth statistics, and produce an auditable resampling analysis for an unfamiliar quantitative-research problem.",
    entryPrerequisites: [
      "ARC503 population/sample/estimand and sampling-mechanism reasoning",
      "ARC504 estimators, sampling distributions, bias, variance, standard error and confidence-interval coverage",
      "ARC505 null hypotheses, p-values, Type-I error and testing logic",
      "ARC517 random variables and empirical distributions",
      "ARC531 likelihood/MLE context for parametric-vs-nonparametric contrast",
      "ARC515 Python/NumPy and reproducible computational experiments",
    ],
    explicitlyOutOfScope: [
      "Full empirical-process bootstrap theory and measure-theoretic consistency proofs",
      "Advanced block/stationary/bootstrap theory for dependent time series beyond conceptual boundary-setting",
      "Bayesian posterior simulation or MCMC",
      "Sequential testing, selective inference and optional-stopping corrections",
      "Production-scale distributed resampling systems",
      "Regression-specific wild/cluster bootstrap details except as downstream pointers",
    ],
    arcs: {
      "T22-M29-A01": {
        focus: "The resampling idea: use repeated synthetic datasets to approximate repeated-sampling behavior.",
        roleRelevance:
          "Quantitative research often needs uncertainty estimates when analytic sampling distributions are unavailable or fragile; resampling provides a computational approximation only when its data-generating assumptions are defensible.",
        purpose:
          "Separate the conceptual target—an estimator's repeated-sampling distribution—from the computational device of repeatedly recomputing it on resampled data.",
        principalObstacle:
          "Resampling is not 'more data' and does not create new independent information; it approximates a hypothetical repeated-sampling experiment under a chosen resampling law.",
        entryPrerequisites: ["ARC504 sampling distributions", "ARC515 reproducible simulation"],
        target:
          "Given an estimator and observed sample, state the repeated-sampling quantity of interest, design a generic resampling loop, and explain exactly what assumptions make the synthetic replicates relevant to that target.",
        requiredMastery: [
          "Distinguish original observations, resampled datasets and resampled estimator values",
          "Write the estimator-resample-recompute algorithm abstractly before coding",
          "Explain why resampling does not increase the original sample's information content",
          "Identify which features of the observed data the procedure preserves and which it randomizes",
          "Diagnose a resampling scheme that targets the wrong repeated-sampling experiment",
          "Transfer the idea to an unfamiliar statistic with no closed-form standard error",
        ],
        applicationScope:
          "Means, medians, quantiles and simple model summaries where the inferential target can be stated clearly.",
        transferScope:
          "A new estimator for which the learner must define the resampling unit and the synthetic repeated-sampling experiment before writing code.",
        explicitlyOutOfScope: ["Bootstrap mechanics in detail", "Permutation null distributions", "Time-series block bootstrap"],
        nextArcBoundary:
          "A02 specializes the generic resampling idea to sampling with replacement from the empirical distribution.",
      },
      "T22-M29-A02": {
        focus: "The empirical distribution as a plug-in population and bootstrap samples drawn from it.",
        roleRelevance:
          "The nonparametric bootstrap is useful precisely because it replaces an unknown population distribution with the observed empirical distribution rather than imposing a fully parametric model.",
        purpose:
          "Derive bootstrap sampling-with-replacement from the empirical distribution and make the plug-in approximation explicit.",
        principalObstacle:
          "A bootstrap sample is iid from the empirical distribution conditional on the data; sampling without replacement, silently changing sample size, or resampling the wrong unit changes the target procedure.",
        entryPrerequisites: ["T22-M29-A01", "ARC503 empirical distributions", "ARC517 discrete probability laws"],
        target:
          "Construct the empirical distribution, derive the probability law of a bootstrap draw, generate size-n bootstrap samples with replacement, and justify why this mimics iid sampling from an estimated population law.",
        requiredMastery: [
          "Represent the empirical distribution with mass 1/n on observed sample points",
          "Explain why iid draws from that law correspond to sampling indices with replacement",
          "Show that duplicate and omitted observations in bootstrap samples are expected rather than errors",
          "Distinguish nonparametric bootstrap from a parametric bootstrap",
          "Identify the correct resampling unit when rows contain linked measurements",
          "Reject without-replacement resampling when the goal is ordinary nonparametric bootstrap behavior",
        ],
        applicationScope:
          "Independent observational samples with a clearly defined observational unit.",
        transferScope:
          "A dataset with repeated values or compound records where the learner must reconstruct the empirical-law argument and choose the correct resampling unit.",
        explicitlyOutOfScope: ["Dependent-data block resampling", "Weighted/bootstrap variants", "Bayesian bootstrap"],
        nextArcBoundary:
          "A03 studies the distribution of estimator values induced by repeated bootstrap samples.",
      },
      "T22-M29-A03": {
        focus: "Bootstrap distributions as approximations to estimator sampling distributions.",
        roleRelevance:
          "Most practical bootstrap inference is built on the distribution of the statistic across resamples, not on the resampled raw data themselves.",
        purpose:
          "Connect the conditional bootstrap law of an estimator to the unknown repeated-sampling law that inference actually requires.",
        principalObstacle:
          "The bootstrap distribution is conditional on the observed dataset and is only an approximation to the population sampling distribution; visual similarity or many replicates do not prove validity.",
        entryPrerequisites: ["T22-M29-A02", "ARC504 sampling distributions"],
        target:
          "Generate and summarize a bootstrap distribution of an estimator, compare its center/spread/shape with analytic or simulation truth when available, and state the approximation being asserted.",
        requiredMastery: [
          "Compute many bootstrap replicates reproducibly",
          "Distinguish the empirical distribution of observations from the bootstrap distribution of a statistic",
          "Estimate center, spread, skewness or tail behavior of bootstrap replicates",
          "Compare bootstrap and exact/analytic sampling distributions in a tractable example",
          "Separate Monte Carlo error from bootstrap approximation error",
          "Diagnose apparent stability caused merely by using an enormous number of replicates from a poor bootstrap model",
        ],
        applicationScope:
          "Smooth scalar estimators plus at least one skewed statistic where distribution shape matters.",
        transferScope:
          "An unfamiliar estimator where the learner must decide which features of the bootstrap distribution are inferentially relevant.",
        explicitlyOutOfScope: ["Confidence-interval recipes", "Formal bootstrap consistency theorems"],
        nextArcBoundary:
          "A04 extracts standard-error and bias estimates from bootstrap replicates and distinguishes their targets.",
      },
      "T22-M29-A04": {
        focus: "Bootstrap estimates of standard error and estimator bias.",
        roleRelevance:
          "Research reports often need uncertainty and finite-sample bias diagnostics for estimators whose analytic formulas are awkward or model-dependent.",
        purpose:
          "Derive bootstrap standard error as replicate dispersion and bootstrap bias as a plug-in estimate of repeated-sampling displacement.",
        principalObstacle:
          "Bootstrap bias and standard error estimate properties of the estimator under the plug-in population; they are not corrections for sampling bias, confounding, bad data or model misspecification.",
        entryPrerequisites: ["T22-M29-A03", "ARC504 bias and standard error"],
        target:
          "Compute bootstrap SE and bias estimates, quantify their Monte Carlo uncertainty, and explain when bias correction helps or can worsen mean-squared error.",
        requiredMastery: [
          "Compute bootstrap standard error from replicate variability",
          "Compute bootstrap bias as mean bootstrap estimate minus original estimate",
          "Distinguish estimator bias from data-selection or measurement bias",
          "Compare bootstrap SE with a known analytic SE in a benchmark problem",
          "Explain the bias-variance trade-off in naive bias correction",
          "Assess sensitivity to the number of bootstrap replicates rather than treating B as irrelevant",
        ],
        applicationScope:
          "Statistics with analytic benchmarks and one case where the estimator is visibly biased at finite n.",
        transferScope:
          "A new estimator where the learner must decide whether bootstrap SE, bias, both or neither answer the actual research question.",
        explicitlyOutOfScope: ["Jackknife theory", "Higher-order bias correction", "Regression-specific sandwich alternatives"],
        nextArcBoundary:
          "A05 uses the bootstrap distribution to construct confidence intervals and audit coverage claims.",
      },
      "T22-M29-A05": {
        focus: "Bootstrap confidence intervals and the difference between computational convenience and coverage validity.",
        roleRelevance:
          "Interval estimates are central to empirical research, but bootstrap intervals can differ materially when the estimator distribution is skewed or biased.",
        purpose:
          "Construct and compare standard/basic and percentile-style bootstrap intervals while tying every method back to repeated-sampling coverage.",
        principalObstacle:
          "Quantiles of bootstrap replicates do not automatically produce a valid confidence interval; the interval construction encodes an approximation that can fail under bias, skewness, boundaries or nonregularity.",
        entryPrerequisites: ["T22-M29-A03-A04", "ARC504 confidence intervals and coverage"],
        target:
          "Construct at least two bootstrap interval types, explain their transformations, and evaluate empirical coverage in a controlled simulation rather than trusting nominal labels.",
        requiredMastery: [
          "Construct a percentile bootstrap interval",
          "Construct a basic/reverse-percentile interval and explain its recentering logic",
          "Contrast bootstrap intervals with a normal-SE interval in a skewed example",
          "Evaluate interval coverage by outer simulation when ground truth is available",
          "Explain why more bootstrap replicates reduce Monte Carlo noise but do not repair systematic coverage failure",
          "Reject post-data probability interpretations of fixed-parameter confidence intervals",
        ],
        applicationScope:
          "Scalar estimands with one near-regular and one skewed/boundary-sensitive example.",
        transferScope:
          "A new statistic where the learner must choose an interval construction, justify it and test coverage empirically.",
        explicitlyOutOfScope: ["Full BCa derivation", "Studentized bootstrap theory in depth", "Bayesian credible intervals"],
        nextArcBoundary:
          "A06 catalogues structural situations where the ordinary iid bootstrap can be misleading or invalid.",
      },
      "T22-M29-A06": {
        focus: "Failure modes of the ordinary bootstrap: dependence, non-smoothness, extremes, boundaries and weak empirical support.",
        roleRelevance:
          "Financial and market datasets routinely violate iid assumptions, so recognizing when the default bootstrap is invalid matters more than mechanically generating thousands of replicates.",
        purpose:
          "Develop a diagnostic map from data/statistic structure to bootstrap validity risks and safer next steps.",
        principalObstacle:
          "The ordinary bootstrap reproduces only the empirical iid mechanism; if the true dependence or tail/extreme-value structure is inferentially essential, naive row resampling destroys the thing that controls uncertainty.",
        entryPrerequisites: ["T22-M29-A01-A05", "ARC712 heavy-tail/dependence caveats"],
        target:
          "Given a proposed bootstrap analysis, identify at least one structural reason it may fail, demonstrate the failure in simulation or counterexample where feasible, and propose an appropriate conceptual alternative without pretending advanced methods are mastered.",
        requiredMastery: [
          "Explain why iid resampling breaks serial dependence",
          "Identify sample maxima/minima and boundary statistics as potentially nonregular",
          "Diagnose small-sample empirical distributions that poorly represent important tails",
          "Construct a dependent-data counterexample where naive bootstrap uncertainty is too small",
          "Distinguish more replicates from a better resampling model",
          "Name a principled next-step class such as block, parametric or model-based resampling while explicitly deferring its full theory",
        ],
        applicationScope:
          "Simple dependent sequences, extremes/quantiles and constrained or non-smooth statistics chosen to expose ordinary-bootstrap limitations.",
        transferScope:
          "An unfamiliar dataset where the learner must decide whether the observational unit is exchangeable/iid enough for naive resampling.",
        explicitlyOutOfScope: ["Formal block-bootstrap consistency", "Stationary bootstrap tuning theory", "Extreme-value bootstrap theory"],
        nextArcBoundary:
          "A07 switches from approximating a sampling distribution to constructing a null distribution through exchangeability-preserving permutations.",
      },
      "T22-M29-A07": {
        focus: "Permutation tests from exchangeability under a null hypothesis.",
        roleRelevance:
          "Permutation methods give transparent finite-sample randomization logic in many comparison problems and teach researchers to derive null distributions from invariances rather than imported asymptotics.",
        purpose:
          "Derive a permutation reference distribution by identifying which labels/assignments are exchangeable under H0 and recomputing the test statistic over allowed rearrangements.",
        principalObstacle:
          "Permutation validity comes from a null symmetry/exchangeability claim; arbitrary shuffling is invalid when labels, time order or paired structure are not exchangeable.",
        entryPrerequisites: ["ARC505 testing logic", "T22-M29-A01 resampling distinction"],
        target:
          "For a clearly specified null, identify the valid permutation group, construct the permutation distribution, compute an exact or Monte Carlo p-value, and justify finite-sample calibration from exchangeability.",
        requiredMastery: [
          "State the null hypothesis in a form that implies a specific exchangeability symmetry",
          "Generate all permutations in a tiny example and Monte Carlo permutations in a larger one",
          "Compute a permutation p-value with appropriate treatment of the observed arrangement",
          "Distinguish permutation tests from the bootstrap in target and resampling mechanism",
          "Preserve paired/block structure when the null only permits restricted permutations",
          "Diagnose a time-series shuffling scheme that destroys dependence and invalidates the null reference distribution",
        ],
        applicationScope:
          "Two-sample, paired and simple randomized-assignment settings where exchangeability can be stated explicitly.",
        transferScope:
          "A new comparison problem requiring the learner to derive rather than assume the admissible permutation group.",
        explicitlyOutOfScope: ["Randomization inference for complex experimental designs", "Sequential permutation testing"],
        nextArcBoundary:
          "A08 broadens the invariance idea to ranks and procedures whose validity depends less on exact parametric distribution shape.",
      },
      "T22-M29-A08": {
        focus: "Rank-based and distribution-free reasoning as invariance-driven inference.",
        roleRelevance:
          "Rank methods can provide robust comparisons when exact magnitudes or distributional forms are unreliable, but their guarantees still depend on explicit sampling and null assumptions.",
        purpose:
          "Understand why replacing values by ranks removes some nuisance scale information while preserving order, and derive simple rank-statistic null behavior from symmetry/permutation logic.",
        principalObstacle:
          "'Nonparametric' does not mean assumption-free: rank procedures discard magnitude information and their interpretation can change under unequal shapes, dependence or ties.",
        entryPrerequisites: ["T22-M29-A07", "Ordering/ranks", "ARC505 hypothesis testing"],
        target:
          "Construct a simple rank-based statistic, derive or simulate its null distribution under exchangeability, compare robustness/power trade-offs with a magnitude-based test, and state what assumptions remain.",
        requiredMastery: [
          "Convert observations to ranks with an explicit tie convention",
          "Explain which transformations leave a rank statistic invariant",
          "Derive a small-sample rank null distribution by enumeration/permutation",
          "Compare a rank test and mean-based test under an outlier/heavy-tail scenario",
          "Explain why unequal distribution shapes can complicate a pure location-shift interpretation",
          "Reject the phrase 'distribution-free' when dependence or design assumptions needed for validity are absent",
        ],
        applicationScope:
          "Simple two-sample or paired rank procedures used to study robustness and invariance, not a catalogue of named tests.",
        transferScope:
          "An unfamiliar monotone-transformation or outlier-contaminated setting where the learner must decide whether ranks preserve the scientifically relevant information.",
        explicitlyOutOfScope: ["Large catalogue of nonparametric tests", "Asymptotic rank-test efficiency theory", "Copula/rank-correlation theory in depth"],
        nextArcBoundary:
          "A09 integrates bootstrap, permutation and rank reasoning into a reproducible inferential workflow with explicit method-selection logic.",
      },
      "T22-M29-A09": {
        focus: "Resampling inference lab: method selection, implementation, validation and research communication.",
        roleRelevance:
          "A quantitative researcher must choose a resampling scheme from the scientific design and data structure, not from whichever library function returns a confidence interval or p-value.",
        purpose:
          "Integrate the module into one auditable study that states the estimand/null, chooses a resampling law, validates implementation, quantifies Monte Carlo stability and reports limitations honestly.",
        principalObstacle:
          "A computationally elaborate resampling analysis can still be invalid if the wrong unit is resampled, dependence is destroyed, the inferential target drifts, or Monte Carlo precision is confused with statistical validity.",
        entryPrerequisites: ["T22-M29-A01-A08", "ARC515 reproducible research code"],
        target:
          "Produce a clean-state reproducible resampling analysis containing a defended target, resampling mechanism, implementation tests, uncertainty/test output, stability diagnostics, failure audit and concise research conclusion.",
        requiredMastery: [
          "State estimand or null and observational/resampling unit before computation",
          "Choose bootstrap, permutation or rank reasoning based on assumptions rather than habit",
          "Implement deterministic seeding and verify the statistic on hand-checkable cases",
          "Report number of replicates/permutations and assess Monte Carlo stability",
          "Check at least one analytic or simulation benchmark when available",
          "Audit dependence, selection, tail, boundary and exchangeability assumptions",
          "Communicate inferential results without overstating nominal confidence or p-values",
          "Transfer the complete workflow to an unfamiliar quantitative-research dataset",
        ],
        applicationScope:
          "One end-to-end study with a scalar estimator or comparison statistic and at least one deliberately tested failure/robustness scenario.",
        transferScope:
          "A new research problem where the learner must select and defend the resampling mechanism from first principles and refuse invalid default resampling.",
        explicitlyOutOfScope: ["Production distributed resampling", "Advanced dependent bootstrap theory", "Selective/sequential inference"],
        nextArcBoundary:
          "M30 / ARC506 moves into classical experimental design, where randomization and study architecture become primary sources of inferential validity.",
      },
    },
  };
}
