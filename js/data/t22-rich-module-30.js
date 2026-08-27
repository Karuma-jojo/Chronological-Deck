export function buildT22RichModule30(syllabusVersion) {
  return {
    moduleId: "ARC506",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build a disciplined causal-skepticism layer between statistical association and later experimental or econometric identification: separate association from intervention claims, diagnose confounding, reverse causality, selection and collider mechanisms, understand how omitted structure contaminates regression coefficients, distinguish predictive usefulness from causal estimands, and require an explicit identification argument before treating a coefficient or pattern as causal.",
    moduleDestination:
      "The learner can take an observational quantitative-research claim, write the competing causal stories that could produce the same association, construct or interpret small causal diagrams and structural examples, diagnose common conditioning and selection errors, derive the direction of omitted-variable distortion in simple linear settings when the sign information is available, separate prediction from intervention questions, and state exactly what additional design or assumption would be needed for causal identification without pretending that correlation or regression adjustment supplies it automatically.",
    entryPrerequisites: [
      "ARC503 sampling mechanisms, sampling bias and selection effects",
      "ARC517 covariance, correlation, conditional distributions and conditional expectation",
      "ARC539 multiple regression, partial effects, interactions, multicollinearity and regression diagnostics",
      "ARC504 estimands and uncertainty language",
      "Basic conditional-probability reasoning from ARC048/ARC502",
    ],
    explicitlyOutOfScope: [
      "Potential-outcomes theory in full generality, SUTVA/consistency formalism and semiparametric causal estimation",
      "Do-calculus, complete DAG identification algorithms and formal causal graphical-model theory",
      "Instrumental variables, regression discontinuity, difference-in-differences, synthetic control and panel causal estimators",
      "Detailed randomized-experiment design, blocking, blinding and factorial design, owned by ARC507",
      "Production causal-inference libraries or automated causal discovery",
      "Treating financial predictability as evidence of manipulable causal effect",
    ],
    arcs: {
      "T22-M30-A01": {
        focus: "Association versus intervention: why an observed dependence does not by itself answer a causal question.",
        roleRelevance:
          "Quant research routinely discovers correlations that are useful for forecasting yet unsafe to interpret as effects of changing a variable; separating observational and intervention claims prevents mechanism stories from outrunning evidence.",
        purpose:
          "Establish the basic causal question as a contrast between what is observed under the data-generating process and what would happen under a specified intervention or policy change.",
        principalObstacle:
          "The same joint distribution can be compatible with multiple causal stories, so stronger correlation, smaller p-values or more data do not by themselves determine causal direction or intervention response.",
        entryPrerequisites: ["ARC517 covariance/correlation", "ARC504 estimands", "Conditional probability"],
        target:
          "Given an observed association, distinguish descriptive, predictive and causal questions, construct at least two causal mechanisms compatible with the same association, and state the additional evidence needed before making an intervention claim.",
        requiredMastery: [
          "Write separate observational and intervention-style questions for the same variables",
          "Construct two distinct causal stories that yield the same sign of correlation",
          "Explain why statistical significance and large sample size do not identify causal direction",
          "Distinguish a useful predictive feature from a manipulable causal lever",
          "Reject a causal conclusion when only an association has been established",
          "Transfer the distinction to an unfamiliar market, biomedical or operational example",
        ],
        applicationScope:
          "Observational relationships such as advertising and sales, volatility and volume, rates and asset prices, or risk factors and outcomes where prediction and intervention claims can diverge.",
        transferScope:
          "An unfamiliar domain in which the learner must classify the scientific question before choosing an analysis.",
        explicitlyOutOfScope: ["Formal potential-outcomes notation", "Randomized-experiment design", "Causal effect estimation methods"],
        nextArcBoundary:
          "A02 introduces confounding as a concrete mechanism that can generate or distort association between exposure and outcome.",
      },
      "T22-M30-A02": {
        focus: "Confounding as a common-cause structure that mixes causal and noncausal association.",
        roleRelevance:
          "Candidate signals, factor exposures and policy variables often share common drivers; failing to model those drivers can turn regime, sector or liquidity effects into fictional direct mechanisms.",
        purpose:
          "Make confounding operational through conditional distributions, stratification thought experiments and small structural models rather than treating it as a vague synonym for 'other variables matter.'",
        principalObstacle:
          "A variable is not a confounder merely because it is correlated with treatment or outcome; it must participate in a structure that opens a noncausal path relevant to the causal contrast under study.",
        entryPrerequisites: ["T22-M30-A01", "ARC517 conditional distributions", "ARC539 multiple regression"],
        target:
          "Diagnose common-cause confounding in a stated causal question, demonstrate how aggregation can differ from within-stratum relationships, and explain what adjustment would need to accomplish without assuming every covariate should be controlled.",
        requiredMastery: [
          "Identify exposure, outcome and candidate common causes in a causal claim",
          "Construct a simple structural or tabular example where confounding creates a misleading marginal association",
          "Compare marginal and conditional relationships without equating conditioning with automatic causal repair",
          "Explain why temporal precedence alone does not eliminate common-cause confounding",
          "Distinguish a true pre-exposure common cause from a downstream variable",
          "Diagnose an invalid 'control for everything available' strategy",
        ],
        applicationScope:
          "Small observational datasets and regression-style examples where a plausible common driver can be represented explicitly.",
        transferScope:
          "A new research setting requiring the learner to justify why a proposed variable is or is not a confounder relative to a precise causal question.",
        explicitlyOutOfScope: ["Propensity scores", "Doubly robust estimation", "High-dimensional confounder selection algorithms"],
        nextArcBoundary:
          "A03 separates confounding from reverse causality, where the outcome or its precursor helps generate the putative exposure.",
      },
      "T22-M30-A03": {
        focus: "Reverse causality and feedback: observed timing is not enough to establish direction of effect.",
        roleRelevance:
          "Market variables frequently co-evolve or respond to anticipated outcomes, so a feature that precedes a measured response can still be endogenous to the same information or feedback process.",
        purpose:
          "Develop concrete diagnostics for causal-direction ambiguity and feedback without collapsing every endogeneity problem into generic confounding.",
        principalObstacle:
          "Measurement order is not causal order: anticipation, latent state, feedback or coarse timestamps can make an apparent predictor partly a consequence of the outcome process it is claimed to cause.",
        entryPrerequisites: ["T22-M30-A01-A02", "Time-order reasoning"],
        target:
          "Given a claimed directional mechanism, construct a plausible reverse or feedback explanation, identify observable implications that might discriminate the stories, and state why lagging a variable alone does not prove exogeneity.",
        requiredMastery: [
          "Distinguish reverse causality from common-cause confounding",
          "Construct a feedback example in which both directional effects may operate",
          "Explain why using X at time t-1 to predict Y at time t does not by itself identify X→Y",
          "Identify anticipation or simultaneous-information channels in a market example",
          "Propose evidence that would weaken a reverse-causality story without overstating certainty",
          "Transfer the diagnosis to an unfamiliar temporal dataset",
        ],
        applicationScope:
          "Lagged observational relationships, market microstructure, policy anticipation and other settings with rapid feedback or endogenous response.",
        transferScope:
          "A new time-ordered association where the learner must distinguish temporal predictability from causal direction.",
        explicitlyOutOfScope: ["Granger causality as a full topic", "Simultaneous-equations estimation", "Instrumental variables"],
        nextArcBoundary:
          "A04 moves from causal direction to sample membership: selection can create associations that are absent or different in the target population.",
      },
      "T22-M30-A04": {
        focus: "Selection bias from conditioning analysis on who or what enters the observed sample.",
        roleRelevance:
          "Tradable universes, surviving firms, available histories and filtered events are selected datasets; the research sample can therefore encode dependence that is not present in the target population or live decision set.",
        purpose:
          "Connect sampling-mechanism reasoning to causal claims by showing how inclusion criteria can change the association being estimated.",
        principalObstacle:
          "Selection is not merely missing data: when inclusion depends on variables related to exposure and outcome, conditioning on being observed can alter or manufacture dependence.",
        entryPrerequisites: ["ARC503 sampling bias", "T22-M30-A01-A03", "Conditional probability"],
        target:
          "Represent a selection mechanism, construct a small example where restricting the sample changes an exposure-outcome relationship, and determine whether the desired estimand refers to the selected sample or a broader target population.",
        requiredMastery: [
          "State the target population separately from the observed sample",
          "Identify variables that influence inclusion or survival",
          "Construct a numeric or graphical example where conditioning on inclusion changes an association",
          "Distinguish selection bias from ordinary random sampling variability",
          "Recognize survivorship and case-only filters as potential causal-selection mechanisms",
          "Diagnose a backtest whose universe definition makes its causal interpretation population-dependent",
        ],
        applicationScope:
          "Survivorship-filtered assets, event studies, hospital/case samples and platform/user datasets where observation depends on underlying variables.",
        transferScope:
          "An unfamiliar dataset where the learner must reconstruct the inclusion rule and decide which population the estimate can legitimately describe.",
        explicitlyOutOfScope: ["Inverse-probability weighting", "Missing-not-at-random estimation", "Detailed survivorship-bias engineering owned later by ARC715"],
        nextArcBoundary:
          "A05 isolates the particularly treacherous case where conditioning on a common effect—a collider—creates dependence between its causes.",
      },
      "T22-M30-A05": {
        focus: "Collider bias: conditioning can create association rather than remove it.",
        roleRelevance:
          "Feature filtering, sample selection and post-event conditioning can inadvertently couple otherwise independent causes, making aggressive adjustment a source of bias rather than a cure.",
        purpose:
          "Build a precise counterexample to the rule 'control for more variables is safer' by analyzing conditioning on a common effect.",
        principalObstacle:
          "Conditioning on a collider can open a noncausal path: variables independent marginally can become dependent after restricting or adjusting for their shared effect.",
        entryPrerequisites: ["T22-M30-A02", "T22-M30-A04", "Conditional independence intuition"],
        target:
          "Construct and analyze a simple collider example, explain why conditioning changes dependence, and distinguish colliders from confounders before choosing an adjustment set.",
        requiredMastery: [
          "Identify a common-effect structure in a verbal or arrow diagram",
          "Construct a small probability/table example where independent causes become dependent conditional on their effect",
          "Explain why a collider should not be adjusted for merely because it predicts the outcome",
          "Distinguish collider bias from confounding and ordinary selection bias",
          "Diagnose a post-treatment or eligibility filter that behaves as a collider",
          "Transfer the logic to an unfamiliar screening or market-selection problem",
        ],
        applicationScope:
          "Admissions/selection examples, conditioned event samples and filtered research universes that make the dependence reversal visible.",
        transferScope:
          "A new adjustment proposal where the learner must classify a covariate by causal role rather than by predictive importance.",
        explicitlyOutOfScope: ["Full d-separation calculus", "Automated DAG adjustment-set discovery", "M-bias edge cases in depth"],
        nextArcBoundary:
          "A06 connects these structural ideas to regression, showing exactly when omitted variables contaminate coefficient interpretation.",
      },
      "T22-M30-A06": {
        focus: "Omitted variables and regression coefficients: association parameters are causal only under additional structure.",
        roleRelevance:
          "Quant researchers routinely inspect regression coefficients; understanding omitted-variable distortion prevents a partial association from being sold as a structural effect.",
        purpose:
          "Derive the simple omitted-variable-bias relation and use it as a diagnostic bridge between regression algebra and causal structure.",
        principalObstacle:
          "A coefficient can be estimated with tiny standard error yet target the wrong causal quantity when omitted determinants are associated with the included regressor; precision does not repair identification.",
        entryPrerequisites: ["ARC539 multiple regression and partial effects", "T22-M30-A02", "Covariance algebra"],
        target:
          "In a two-regressor linear structural example, derive how omitting a relevant variable shifts the coefficient on the included regressor, determine the sign of distortion when the relevant signs are known, and state the assumptions required for causal interpretation.",
        requiredMastery: [
          "Derive the population omitted-variable-bias expression in a simple linear model",
          "Separate the true structural coefficient from the short-regression coefficient",
          "Determine bias direction from the omitted variable's outcome effect and its association with the included regressor when sign information suffices",
          "Construct a case where adding a variable improves prediction but worsens causal interpretation because it is downstream or colliding",
          "Explain why low p-values, high R² and robust standard errors do not establish exogeneity",
          "Diagnose an unfamiliar regression coefficient whose causal interpretation depends on an unstated assumption",
        ],
        applicationScope:
          "Two- or three-variable linear models where omitted-variable algebra is transparent enough to derive by hand and verify computationally.",
        transferScope:
          "A new regression claim where the learner must map algebraic controls to hypothesized causal roles before interpreting coefficients.",
        explicitlyOutOfScope: ["Instrumental-variable estimation", "Fixed effects", "High-dimensional causal variable selection", "Nonlinear structural models in depth"],
        nextArcBoundary:
          "A07 makes the research objective explicit: a model optimized for prediction need not estimate a causal effect, and vice versa.",
      },
      "T22-M30-A07": {
        focus: "Prediction versus causal estimation: different estimands, losses and validation questions.",
        roleRelevance:
          "Most quantitative trading research is predictive; causal language is unnecessary unless the goal concerns intervention, policy, mechanism or market impact. Keeping objectives separate prevents invalid causal narratives from contaminating useful forecasting work.",
        purpose:
          "Show concretely why predictive performance and causal-effect accuracy can diverge even when they use the same variables and models.",
        principalObstacle:
          "Cross-validation can establish predictive generalization under a data distribution, but it cannot by itself validate an intervention effect or remove confounding.",
        entryPrerequisites: ["T22-M30-A01-A06", "ARC539 regression", "Basic validation concepts"],
        target:
          "For a research problem, specify whether the target is prediction or causal effect, choose evaluation evidence consistent with that target, and diagnose analyses that answer one while claiming the other.",
        requiredMastery: [
          "Write a predictive estimand/target separately from a causal intervention contrast",
          "Construct a confounded setting where a variable predicts well but is a poor causal lever",
          "Construct a causal-effect setting where excluding a strong noncausal predictor can still be appropriate for interpretation",
          "Explain why held-out predictive accuracy does not identify causal effects",
          "Explain when causal reasoning is unnecessary for a purely predictive trading signal",
          "Audit an unfamiliar research memo for slippage between predictive and causal language",
        ],
        applicationScope:
          "Forecasting, policy, mechanism and intervention examples where the same covariates support different scientific objectives.",
        transferScope:
          "A new model proposal requiring the learner to align the estimand, data split/evidence and claims with either prediction or causal inference.",
        explicitlyOutOfScope: ["Full train/validation/test methodology owned by ARC508", "Uplift modeling", "Policy learning"],
        nextArcBoundary:
          "A08 closes the module by turning causal skepticism into an explicit identification checklist and boundary statement.",
      },
      "T22-M30-A08": {
        focus: "Identification and causal skepticism: state what would make the desired effect learnable from the available data.",
        roleRelevance:
          "The durable research skill is not attaching causal terminology to a model; it is knowing when the data and assumptions do or do not determine the causal quantity being claimed.",
        purpose:
          "Make identification the stopping rule for causal claims: define the estimand, list the assumptions/design information that connect observed data to it, and refuse point identification when those conditions are unsupported.",
        principalObstacle:
          "Estimation answers 'how precisely can I compute this model-dependent quantity?'; identification answers the prior question 'does the observed-data law plus stated assumptions determine the causal quantity at all?'",
        entryPrerequisites: ["T22-M30-A01-A07", "ARC504 estimands", "ARC539 regression interpretation"],
        target:
          "Given an observational causal claim, produce an identification audit that names the estimand, competing causal structures, required assumptions or design leverage, falsifiable implications where available, and the strongest conclusion justified by the evidence.",
        requiredMastery: [
          "State the causal quantity before choosing an estimator",
          "Distinguish identification failure from large standard error or weak statistical power",
          "List the untestable and partially testable assumptions supporting a proposed causal interpretation",
          "Construct two observationally compatible stories with different intervention consequences to demonstrate non-identification",
          "Name the kind of added design evidence—randomization, natural experiment, instrument, discontinuity, panel contrast or stronger structural assumption—that could address the ambiguity without claiming mastery of those methods",
          "Downgrade a causal claim to association/prediction when identification support is absent",
          "Defend the audit on an unfamiliar quantitative-research case",
        ],
        applicationScope:
          "Observational regression and signal-research claims where causal language is tempting but design leverage is limited.",
        transferScope:
          "An unfamiliar empirical claim requiring a concise identification memo: estimand, threat map, assumptions, evidence and justified conclusion.",
        explicitlyOutOfScope: ["Detailed design of randomized experiments", "Formal IV/RD/DiD estimation", "Do-calculus", "Semiparametric efficiency"],
        nextArcBoundary:
          "ARC507 owns experimental design and randomization as a concrete route to causal identification; deeper quasi-experimental/econometric identification remains deferred to ARC545–ARC550.",
      },
    },
  };
}
