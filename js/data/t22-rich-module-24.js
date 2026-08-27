export function buildT22RichModule24(syllabusVersion) {
  return {
    moduleId: "ARC505",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build hypothesis testing as a calibrated decision procedure under uncertainty: formulate testable null/alternative claims, derive and interpret null distributions and p-values, control Type-I error, reason about Type-II error and power, design sample size from detectable effects, distinguish one- from two-sided tests, and control error across many simultaneous hypotheses.",
    moduleDestination:
      "The learner can construct and audit a hypothesis test from assumptions through rejection logic; explain what a p-value does and does not mean; derive size/power behaviour in tractable cases; reason quantitatively about sample size and effect size; choose tail direction before seeing results; and apply family-wise-error or false-discovery controls without confusing multiplicity adjustment with evidence creation.",
    entryPrerequisites: [
      "ARC504 estimands, estimators, sampling distributions, standard error and confidence-interval coverage",
      "ARC712 normal approximation, square-root-n scaling and concentration/failure conditions",
      "ARC517 random variables, distributions, CDFs and conditional probability",
      "ARC048 probability rules and conditional probability",
    ],
    explicitlyOutOfScope: [
      "Regression-specific t/F tests and coefficient inference — ARC539",
      "Likelihood-ratio, score and Wald testing from likelihood theory — ARC534 after ARC531/ARC533",
      "Bootstrap and permutation procedures — ARC537",
      "Sequential testing, optional-stopping corrections and alpha-spending in depth",
      "Bayesian hypothesis comparison and Bayes factors",
      "Domain-specific trading-strategy validation and backtest protocol — later empirical-research modules",
    ],
    arcs: {
      "T22-M24-A01": {
        focus: "Null and alternative hypotheses as precise, falsifiable claims about an estimand or data-generating mechanism.",
        roleRelevance:
          "Quantitative research fails quickly when vague stories are converted into post-hoc statistical claims; disciplined hypotheses define what evidence could count against a benchmark before the data are inspected.",
        purpose:
          "Turn a research question into mutually interpretable null/alternative statements with the parameter, direction and decision target made explicit.",
        principalObstacle:
          "A null hypothesis is not 'the thing we believe is true' and an alternative is not merely 'something happened'; both must be stated on a common estimand/model scale so a sampling distribution can later be constructed under H0.",
        entryPrerequisites: ["ARC504 estimands and estimators", "ARC517 probability models", "Basic logical negation and set complements"],
        target:
          "Given a research claim, formulate H0 and H1 on an explicit parameter or distributional feature, distinguish simple from composite claims when relevant, and diagnose formulations that cannot support a coherent test.",
        requiredMastery: [
          "Identify the estimand or model feature actually being tested",
          "Write compatible null and alternative parameter sets",
          "Distinguish equality-style benchmark nulls from directional or two-sided alternatives",
          "Explain why failing to reject H0 is not proof that H0 is true",
          "Reject a post-hoc hypothesis that was defined after inspecting the same result without acknowledging the selection step",
          "Translate an unfamiliar quantitative-research story into a falsifiable H0/H1 pair",
        ],
        applicationScope:
          "Mean effects, proportions, forecast-skill differences or other simple estimands where the research benchmark can be stated before observing the decisive statistic.",
        transferScope:
          "An unfamiliar scientific or financial claim where the learner must identify the actual estimand and formulate testable parameter sets rather than mimic familiar wording.",
        explicitlyOutOfScope: ["p-values", "Decision thresholds", "Power", "Multiple testing"],
        nextArcBoundary:
          "A02 owns the statistic and its sampling distribution under the null.",
      },
      "T22-M24-A02": {
        focus: "Test statistics and null distributions as calibrated measures of discrepancy from H0.",
        roleRelevance:
          "A research statistic becomes evidential only after its behaviour under the benchmark model is known or defensibly approximated.",
        purpose:
          "Connect a chosen statistic to the distribution it would have if H0 generated the data, separating observed discrepancy from its null calibration.",
        principalObstacle:
          "A large-looking estimate is not inherently surprising: scale, variance, sample size and model assumptions determine whether the observed statistic is unusual under H0.",
        entryPrerequisites: ["T22-M24-A01", "ARC504 sampling distributions and standard error", "ARC712 standardization and normal approximation"],
        target:
          "Construct a standardized or otherwise calibrated statistic in a tractable problem, derive or justify its null distribution, and identify which assumptions are responsible for that calibration.",
        requiredMastery: [
          "Distinguish an estimator from a test statistic and from its realized value",
          "Derive a simple z-style statistic from null centering and standard-error scaling",
          "State the null distribution or approximation being invoked",
          "Show how the same raw effect can produce different evidence at different uncertainty levels",
          "Diagnose a test statistic whose null calibration ignores dependence, variance estimation or distributional assumptions",
          "Use simulation as a diagnostic for a stated null distribution without treating simulation as a substitute for assumptions",
          "Transfer calibration logic to an unfamiliar statistic with a supplied or derivable null law",
        ],
        applicationScope:
          "Simple mean/proportion/difference statistics whose null behaviour is exact or defensibly approximated from previous modules.",
        transferScope:
          "A new statistic where the learner must identify the null centering, scale and law before interpreting magnitude.",
        explicitlyOutOfScope: ["General likelihood-ratio theory", "Bootstrap/permutation null distributions", "Regression-specific t/F distributions"],
        nextArcBoundary:
          "A03 owns tail probability under the null: the p-value.",
      },
      "T22-M24-A03": {
        focus: "p-values as tail probabilities computed under H0, with exact interpretation and common fallacies excluded.",
        roleRelevance:
          "p-values remain common in empirical research and interviews; misreading them as posterior probabilities or effect sizes creates false certainty and bad model selection.",
        purpose:
          "Derive p-values from null tail events and enforce their conditional-on-H0 interpretation.",
        principalObstacle:
          "P(data-or-more-extreme | H0) is not P(H0 | data), is not the probability results arose 'by chance', and does not measure economic or scientific importance.",
        entryPrerequisites: ["T22-M24-A02", "ARC048 conditional probability", "ARC517 CDF/tail probabilities"],
        target:
          "Compute one- or two-tail p-values from a stated null distribution, define 'as or more extreme' through the chosen statistic, and refute posterior-probability/effect-size interpretations.",
        requiredMastery: [
          "Construct the correct null tail event for an observed statistic",
          "Compute a p-value from a continuous or discrete null law when supplied",
          "Explain why a p-value is conditional on H0 rather than a probability assigned to H0",
          "Distinguish statistical evidence from practical effect magnitude",
          "Explain how optional analysis choices or cherry-picking can destroy naive p-value calibration",
          "Diagnose the fallacy 'p=0.03 means a 3% chance the null is true'",
          "Transfer p-value logic to an unfamiliar test statistic without relying on memorized software output",
        ],
        applicationScope:
          "Auditable p-value calculations for pre-specified simple tests under explicit null distributions.",
        transferScope:
          "A new testing problem in which the extremeness ordering and null tail must be reconstructed from the research question.",
        explicitlyOutOfScope: ["Bayesian posterior odds", "e-values", "Sequential/always-valid p-values"],
        nextArcBoundary:
          "A04 owns pre-specified significance thresholds and long-run Type-I error control.",
      },
      "T22-M24-A04": {
        focus: "Significance levels, rejection regions and Type-I error as a procedure-level long-run guarantee.",
        roleRelevance:
          "Quant research needs calibrated false-positive control; an alpha level constrains a repeated decision rule, not the probability that any particular rejection is false.",
        purpose:
          "Derive rejection regions from a chosen alpha and null law, and distinguish procedure size from realized p-values or posterior error probabilities.",
        principalObstacle:
          "Alpha is fixed before the decisive result and controls P(reject H0 | H0) for the procedure; it is not the observed p-value and not P(H0 | reject).",
        entryPrerequisites: ["T22-M24-A02-A03", "ARC048 conditional probability"],
        target:
          "Construct a level-alpha rejection rule, verify its Type-I error under the null, and explain how discreteness or approximation can make achieved size differ from nominal alpha.",
        requiredMastery: [
          "Define Type-I error as rejecting H0 when H0 holds",
          "Construct critical values/rejection regions from a null CDF or quantile",
          "Verify the achieved null rejection probability in a tractable case",
          "Distinguish nominal alpha, achieved size and observed p-value",
          "Explain why choosing alpha after seeing p invalidates the intended calibration",
          "Diagnose a procedure whose actual size exceeds its claimed level",
          "Transfer size-control reasoning to an unfamiliar null distribution",
        ],
        applicationScope:
          "Simple fixed-sample testing rules where null rejection probabilities can be calculated or checked.",
        transferScope:
          "A new decision rule where the learner must compute its false-positive probability rather than trust a threshold label.",
        explicitlyOutOfScope: ["Multiple-comparison adjustment", "Sequential testing", "Bayesian false-positive probabilities"],
        nextArcBoundary:
          "A05 owns the complementary miss probability under alternatives and statistical power.",
      },
      "T22-M24-A05": {
        focus: "Type-II error and statistical power as functions of the true alternative, effect scale and sampling variability.",
        roleRelevance:
          "A non-rejection in an underpowered study says little; researchers must know what effects their procedure would reliably detect before interpreting absence of significance.",
        purpose:
          "Evaluate the same rejection rule under alternative parameter values and derive miss/detection probabilities.",
        principalObstacle:
          "Type-II error is not one fixed number for a composite alternative: beta and power vary with the true effect, sample size, noise and test direction.",
        entryPrerequisites: ["T22-M24-A04", "ARC504 sampling distributions", "ARC712 standardization"],
        target:
          "Given a fixed rejection region and an alternative sampling distribution, compute beta(theta) and power(theta), sketch or interpret a power curve, and use it to distinguish weak evidence from weak design.",
        requiredMastery: [
          "Define Type-II error and power conditionally on a specific alternative",
          "Compute beta and 1-beta in a tractable normal-mean test",
          "Explain why power generally rises with effect magnitude and information",
          "Distinguish 'not significant' from evidence of equivalence or no effect",
          "Construct a case with low Type-I error but unacceptably low power",
          "Interpret a power curve rather than quote a single power number without its alternative",
          "Transfer power reasoning to a new rejection rule and alternative distribution",
        ],
        applicationScope:
          "Detection probabilities for fixed-sample tests of simple effects under transparent variance/distribution assumptions.",
        transferScope:
          "An unfamiliar experiment or backtest where the learner must ask what effect sizes the procedure can actually detect.",
        explicitlyOutOfScope: ["Equivalence/non-inferiority testing in depth", "Sequential power", "Adaptive experimental design"],
        nextArcBoundary:
          "A06 owns inversion of power requirements into sample-size and minimum-detectable-effect reasoning.",
      },
      "T22-M24-A06": {
        focus: "Power and sample-size reasoning through effect size, noise, alpha and square-root-n information scaling.",
        roleRelevance:
          "Before collecting data or evaluating a strategy universe, researchers need to know whether the available information can distinguish economically relevant effects from noise.",
        purpose:
          "Connect the power function to design: solve approximately for n or minimum detectable effect under explicit assumptions and quantify diminishing returns.",
        principalObstacle:
          "Sample-size formulas are not magic constants; they inherit the assumed effect, variance, alpha, target power and independence structure, and nominal n may dramatically overstate effective information under dependence.",
        entryPrerequisites: ["T22-M24-A05", "ARC712 square-root-n law", "ARC504 effect size and standard error"],
        target:
          "Derive or reconstruct a simple normal-theory sample-size/MDE relation, solve it for a design target, and audit sensitivity to variance, effect size, alpha, power and dependence assumptions.",
        requiredMastery: [
          "Relate standardized signal-to-noise to effect size divided by standard error",
          "Derive the qualitative n proportional to variance/effect^2 scaling in a simple design",
          "Compute how halving a target effect changes required sample size under fixed assumptions",
          "Explain the trade-off between stricter alpha and power at fixed n",
          "Distinguish nominal observations from effectively independent observations",
          "Perform sensitivity analysis when variance or effect assumptions are uncertain",
          "Reject a sample-size calculation whose input effect was chosen solely because it makes the available n look adequate",
        ],
        applicationScope:
          "Simple fixed-sample mean/proportion-style designs and approximate minimum-detectable-effect calculations.",
        transferScope:
          "A new research design where the learner must reconstruct what determines detectability rather than paste numbers into a memorized formula.",
        explicitlyOutOfScope: ["Optimal experimental design", "Cluster/HAC sample-size formulas", "Sequential/adaptive designs"],
        nextArcBoundary:
          "A07 owns directional versus two-sided alternatives and the corresponding allocation of rejection probability.",
      },
      "T22-M24-A07": {
        focus: "One-sided versus two-sided tests and rejection regions chosen from the scientific alternative rather than the observed sign.",
        roleRelevance:
          "Directional choices alter power and false-positive allocation; selecting the favorable tail after seeing data effectively performs an unacknowledged multiple choice.",
        purpose:
          "Derive tail allocation from H1, compare one- and two-sided critical values/p-values, and enforce pre-specification of direction.",
        principalObstacle:
          "A one-sided test gains power in one pre-specified direction by giving up rejection ability in the other; it is not a license to inspect the sign and then choose the cheaper tail.",
        entryPrerequisites: ["T22-M24-A01-A06", "Symmetric null distributions when used"],
        target:
          "Choose a one- or two-sided design from the research claim, construct the corresponding rejection region/p-value, and quantify the consequences of changing tail allocation.",
        requiredMastery: [
          "Match directional and two-sided alternatives to rejection regions",
          "Compute critical values for one- versus two-sided alpha allocation in a symmetric null model",
          "Explain the power trade-off created by concentrating alpha in one tail",
          "Diagnose post-hoc tail selection as invalid calibration",
          "Explain why an effect in the untested direction can be scientifically important even when the one-sided procedure cannot reject",
          "Compare one- and two-sided p-values for the same observed statistic under a stated convention",
          "Transfer tail-choice reasoning to an unfamiliar directional claim",
        ],
        applicationScope:
          "Pre-specified directional or two-sided tests where scientific meaning of sign is clear.",
        transferScope:
          "A new claim where the learner must justify the direction structure before inspecting the decisive statistic.",
        explicitlyOutOfScope: ["Data-dependent directional selection", "Multiple testing across many hypotheses"],
        nextArcBoundary:
          "A08 owns family-wise false-positive inflation when many hypotheses are tested together.",
      },
      "T22-M24-A08": {
        focus: "Multiple testing and family-wise error control when a research process examines many hypotheses.",
        roleRelevance:
          "Signal research routinely searches many features, horizons and models; without multiplicity control, seemingly rare null rejections become common somewhere in the search.",
        purpose:
          "Quantify multiplicity-driven false positives and derive simple family-wise controls such as Bonferroni rather than treating each p-value in isolation.",
        principalObstacle:
          "Per-test alpha does not imply family-wise alpha. The probability of at least one false rejection grows with the number and dependence structure of tested hypotheses.",
        entryPrerequisites: ["T22-M24-A04", "ARC048 unions/complements", "Basic inequalities"],
        target:
          "Compute or bound family-wise error across multiple null tests, derive Bonferroni control from the union bound, and distinguish FWER control from the stronger claim that every reported discovery is probably true.",
        requiredMastery: [
          "Define family-wise error as at least one false rejection in a specified family",
          "Compute FWER exactly under independent identical level-alpha tests in a tractable case",
          "Derive the Bonferroni alpha/m threshold from the union bound without requiring independence",
          "Explain conservatism and the role of dependence",
          "Diagnose p-hacking/model-search situations where the true testing family is larger than reported",
          "Distinguish adjusted testing from retroactively pretending only the selected hypothesis was tested",
          "Transfer family-definition and FWER reasoning to an unfamiliar research search space",
        ],
        applicationScope:
          "Finite collections of pre-specified hypotheses, model variants or feature screens where family-wise false-positive risk matters.",
        transferScope:
          "A new search procedure where the learner must define the effective hypothesis family before choosing an error-control method.",
        explicitlyOutOfScope: ["Selective-inference theory", "Random-field/max-t methods", "Full data-snooping correction for adaptive research pipelines"],
        nextArcBoundary:
          "A09 owns false discovery rate: controlling the expected proportion of false discoveries rather than the probability of any false discovery.",
      },
      "T22-M24-A09": {
        focus: "False discovery rate and Benjamini-Hochberg-style control as a distinct multiplicity objective.",
        roleRelevance:
          "Large-scale signal screening often tolerates some false discoveries in exchange for greater detection power, making FDR a different and sometimes more appropriate research objective than FWER.",
        purpose:
          "Define the false-discovery proportion, distinguish FDR from FWER, execute a Benjamini-Hochberg-style step-up procedure under stated validity conditions, and interpret what the guarantee does and does not promise.",
        principalObstacle:
          "FDR is an expectation over the random proportion V/max(R,1), not the probability that a particular selected hypothesis is false and not a guarantee that every realized discovery set has at most q false fraction.",
        entryPrerequisites: ["T22-M24-A08", "Ordered p-values", "Expectation from ARC517"],
        target:
          "Given a finite family of valid p-values, apply a BH-style thresholding procedure, identify the selected rejection set, distinguish its control target from FWER, and audit dependence/selection assumptions before claiming FDR control.",
        requiredMastery: [
          "Define discoveries R, false discoveries V, false-discovery proportion and FDR",
          "Distinguish FDR from family-wise error with a concrete example",
          "Execute the ordered-p-value BH step-up rule for a supplied q and family size",
          "Explain why the threshold depends on rank and total family size",
          "Interpret the guarantee as an expectation-level property rather than a posterior probability for each discovery",
          "Identify that arbitrary dependence/adaptive reuse can require conditions or modified procedures beyond the basic statement",
          "Compare when a conservative FWER objective versus an FDR objective better matches a research program",
          "Transfer multiplicity-objective selection to an unfamiliar high-dimensional screening problem",
        ],
        applicationScope:
          "Finite collections of valid p-values in exploratory screening where the chosen dependence assumptions support a BH-style procedure.",
        transferScope:
          "A new multi-hypothesis research program where the learner must first choose the scientific error target, then justify the corresponding procedure.",
        explicitlyOutOfScope: ["Knockoffs", "Local FDR/empirical Bayes", "Online FDR", "Post-selection inference", "Production backtest selection protocols"],
        nextArcBoundary:
          "M25 / ARC539 owns regression modelling and regression-specific uncertainty; later ARC534 revisits testing through likelihood-ratio/Wald/score machinery and ARC537 owns resampling-based inference.",
      },
    },
  };
}
