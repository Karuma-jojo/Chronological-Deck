export function buildT22RichModule31(syllabusVersion) {
  return {
    moduleId: "ARC507",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Turn causal skepticism into constructive experimental design: define interventions and comparison groups, randomize at the correct unit, use controls/placebos and blocking deliberately, protect outcome measurement from bias, distinguish genuine replication from pseudoreplication, exploit factorial structure, and assemble an experiment whose causal claim is auditable before results are seen.",
    moduleDestination:
      "The learner can design and defend a randomized experiment for a quantitative-research question by specifying the treatment, experimental unit, assignment mechanism, comparison condition, blocking variables, measurement/blinding plan, replication structure, factorial structure when useful, estimand, pre-specified analysis and concrete failure modes; they can also diagnose designs whose apparent sample size, controls or randomization do not support the claimed causal conclusion.",
    entryPrerequisites: [
      "ARC505 hypothesis tests, Type-I/II error, power, sample-size reasoning and multiplicity",
      "ARC506 association-versus-causation, confounding, selection/collider bias and identification skepticism",
      "ARC503 sampling mechanisms and target-population reasoning",
      "ARC504 estimands, estimators and uncertainty language",
      "ARC539 regression adjustment and interaction terms as descriptive/analysis tools",
    ],
    explicitlyOutOfScope: [
      "Formal potential-outcomes theory, SUTVA notation and semiparametric treatment-effect estimation",
      "Permutation/randomization tests as inference procedures — owned by ARC537",
      "Quasi-experiments, instrumental variables, regression discontinuity, difference-in-differences and synthetic control — deferred to ARC545-ARC550",
      "Full train/validation/test, cross-validation, leakage and model-selection methodology — ARC508",
      "End-to-end reproducibility, provenance and independent study reproduction — ARC509",
      "Industrial response-surface methodology, fractional-factorial aliasing theory and optimal design",
    ],
    arcs: {
      "T22-M31-A01": {
        focus: "Observation versus intervention: convert a causal question into a manipulable experimental contrast.",
        roleRelevance:
          "Quantitative researchers often have abundant observational data but weak leverage on causal mechanisms; an experiment begins by defining what is actually changed, for whom, and against what reference state.",
        purpose:
          "Bridge ARC506 identification skepticism to experimental construction by making the intervention, unit, outcome and causal contrast explicit before assignment or analysis.",
        principalObstacle:
          "A variable appearing in data is not automatically an experimentally manipulable treatment, and a predictive association does not tell us which intervention or outcome contrast would answer the scientific question.",
        entryPrerequisites: ["ARC506 association vs causation and identification", "ARC504 estimands", "ARC503 target populations"],
        target:
          "Given a research claim, specify a feasible intervention, experimental unit, outcome, target population and causal contrast, and reject designs that silently substitute observation for intervention.",
        requiredMastery: [
          "Separate the observed predictor from the intervention actually under experimental control",
          "Identify the experimental unit and the target population separately",
          "State the primary outcome and when it is measured",
          "Write the causal contrast the experiment is intended to identify",
          "Construct two different interventions that could correspond to the same observational variable and explain why they answer different questions",
          "Diagnose an impossible or ill-defined intervention",
          "Transfer the intervention-design step to an unfamiliar market, product or operational setting",
        ],
        applicationScope:
          "A/B-style interventions, execution-policy changes, information displays, pricing/quote policies or other settings where a treatment can actually be assigned to units.",
        transferScope:
          "A new observational claim where the learner must invent a defensible intervention rather than merely re-label the predictor as treatment.",
        explicitlyOutOfScope: ["Assignment mechanisms", "Statistical power calculation beyond reusing ARC505", "Quasi-experimental identification"],
        nextArcBoundary:
          "A02 owns construction of treatment and comparison groups once the intervention and unit are explicit.",
      },
      "T22-M31-A02": {
        focus: "Treatment and comparison groups as the operational structure for estimating a causal contrast.",
        roleRelevance:
          "A causal experiment needs a comparison that represents what would have happened without the active treatment; poorly chosen comparison conditions can change the estimand or import systematic differences.",
        purpose:
          "Design treatment and comparison conditions that differ in the intended intervention while matching operational exposure as closely as the scientific question requires.",
        principalObstacle:
          "The comparison group is not just 'everyone untreated': its protocol, eligibility, timing and exposure define the counterfactual approximation and therefore the meaning of the estimated effect.",
        entryPrerequisites: ["T22-M31-A01", "ARC506 counterfactual/identification intuition", "ARC503 sampling mechanisms"],
        target:
          "Specify treatment and comparison protocols, eligibility, timing and primary contrast so that the resulting group difference answers the intended question rather than a changed one.",
        requiredMastery: [
          "Define treatment and comparison conditions operationally enough to be reproducible",
          "Explain what counterfactual state the comparison is intended to represent",
          "Distinguish no-treatment, status-quo and active-control comparisons",
          "Identify contamination or unequal co-interventions that make groups differ in more than the intended treatment",
          "Show how changing the comparison condition changes the causal estimand",
          "Diagnose a treatment-control setup with asymmetric measurement or follow-up",
          "Transfer comparison-group design to an unfamiliar quantitative experiment",
        ],
        applicationScope:
          "Parallel-group experiments with explicit baseline, status-quo or active-comparison conditions.",
        transferScope:
          "A new intervention where several plausible comparison conditions exist and the learner must justify which one matches the research claim.",
        explicitlyOutOfScope: ["Random assignment", "Blinding mechanics", "Factorial combinations"],
        nextArcBoundary:
          "A03 owns random assignment and the unit at which allocation occurs.",
      },
      "T22-M31-A03": {
        focus: "Random assignment as a design mechanism for breaking systematic treatment-selection differences.",
        roleRelevance:
          "Randomization is one of the cleanest ways to identify an average treatment contrast, but only when assignment, analysis unit and interference structure are correctly understood.",
        purpose:
          "Make randomization operational: define the randomization unit, allocation mechanism and allocation probabilities, then explain what balance randomization guarantees in expectation rather than in every realized sample.",
        principalObstacle:
          "Calling a study randomized is not enough: randomizing the wrong unit, rerandomizing until favorable balance appears, allowing post-assignment switching, or treating correlated observations as independently randomized can invalidate the claimed design.",
        entryPrerequisites: ["T22-M31-A01-A02", "ARC048 probability", "ARC506 confounding and identification"],
        target:
          "Construct a reproducible random-assignment scheme, identify its randomization unit and allocation probabilities, justify the causal leverage it provides, and diagnose violations involving interference, noncompliance or pseudo-random allocation.",
        requiredMastery: [
          "Specify the experimental/randomization unit unambiguously",
          "Construct a valid complete-randomization allocation mechanism from a seed or auditable random source",
          "Explain why randomization balances pre-treatment causes in distribution rather than guaranteeing exact covariate equality",
          "Distinguish random sampling from random assignment",
          "Identify spillover/interference that makes one unit's treatment affect another unit's outcome",
          "Diagnose deterministic alternation, time-of-day assignment or discretionary overrides masquerading as randomization",
          "Explain why analysis that pretends lower-level repeated observations were independently randomized creates pseudoreplication",
          "Transfer assignment design to an unfamiliar clustered or interacting system without claiming a formal cluster-RCT treatment",
        ],
        applicationScope:
          "Simple individual/unit randomization and conceptually transparent grouped settings where the allocation unit can be identified and audited.",
        transferScope:
          "A new system with multiple possible assignment units where the learner must choose the unit and surface interference risks.",
        explicitlyOutOfScope: ["Formal cluster-randomized trial theory", "Noncompliance estimands", "Randomization/permutation inference"],
        nextArcBoundary:
          "A04 owns why controls, placebos and counterfactual thinking are still necessary after assignment is randomized.",
      },
      "T22-M31-A04": {
        focus: "Control groups, placebos and counterfactual discipline: isolate the intended treatment effect from operational and expectation effects.",
        roleRelevance:
          "In research systems, treatment delivery can change attention, latency, monitoring, expectations or measurement behavior; a good control exposes whether the active ingredient rather than the surrounding protocol caused the difference.",
        purpose:
          "Choose and justify a control condition that makes the treatment contrast scientifically interpretable, including placebo/sham logic when expectation or handling effects matter.",
        principalObstacle:
          "A nominal control can fail if it receives different attention, timing, instrumentation or ancillary actions; conversely, an active or placebo control can answer a narrower but cleaner causal question than no treatment.",
        entryPrerequisites: ["T22-M31-A02-A03", "ARC506 identification skepticism"],
        target:
          "Given a treatment protocol, construct an appropriate comparison/control condition, state which nuisance pathways it controls, and identify residual pathways that remain uncontrolled.",
        requiredMastery: [
          "Distinguish untreated, status-quo, placebo/sham and active controls by the causal contrast they create",
          "Identify handling, expectation, attention or instrumentation differences that can masquerade as treatment effects",
          "Construct a placebo/sham condition when conceptually feasible without pretending it controls mechanisms it does not match",
          "Explain why the control group is evidence about the missing counterfactual only through the assignment/design assumptions",
          "Use a negative-control-style idea as a diagnostic without claiming it proves absence of bias",
          "Diagnose a control condition that changes more than one scientific factor",
          "Transfer control-design reasoning to an unfamiliar algorithmic or operational experiment",
        ],
        applicationScope:
          "Experiments where treatment delivery itself can alter participant/system behavior or measurement and where comparison protocols can be matched explicitly.",
        transferScope:
          "A novel intervention where the learner must decide which parts of the protocol should be shared by treatment and control.",
        explicitlyOutOfScope: ["Formal negative-control identification theory", "Blinding implementation details", "Factorial decomposition of multiple active factors"],
        nextArcBoundary:
          "A05 owns blocking and stratified randomization for precision and protected balance on important pre-treatment structure.",
      },
      "T22-M31-A05": {
        focus: "Blocking and stratification: randomize within important pre-treatment groups to control design variance without conditioning on post-treatment information.",
        roleRelevance:
          "Quant experiments often span assets, venues, regimes, customer segments or hardware classes with large baseline heterogeneity; blocking can improve precision and protect against unlucky imbalance when chosen before treatment.",
        purpose:
          "Design blocked/stratified randomization, explain when it helps, and preserve the block structure in analysis and interpretation.",
        principalObstacle:
          "Blocking is useful only when based on pre-treatment variables and implemented within blocks; arbitrary post-hoc subgrouping or blocking on a treatment consequence can create bias or multiplicity rather than precision.",
        entryPrerequisites: ["T22-M31-A03", "ARC505 power/sample-size reasoning", "ARC539 categorical predictors/interactions"],
        target:
          "Choose defensible blocking variables, construct within-block assignment, explain the precision/balance rationale, and diagnose designs that use post-treatment or overly sparse strata.",
        requiredMastery: [
          "Distinguish blocking/stratified randomization from simple randomization and from post-hoc subgroup analysis",
          "Construct a valid within-block allocation table for unequal block sizes",
          "Explain why strong prognostic pre-treatment variables can reduce residual variance",
          "Identify when too many tiny strata make implementation fragile",
          "Reject blocking variables defined using post-treatment outcomes or future information",
          "Explain why the analysis must respect the design rather than pool blindly when block effects matter",
          "Compare the expected precision/balance trade-off of simple versus blocked assignment in a concrete example",
          "Transfer blocking logic to an unfamiliar heterogeneous research system",
        ],
        applicationScope:
          "Pre-specified blocking by regime, venue, asset class, cohort or other baseline factors with enough units per block to randomize meaningfully.",
        transferScope:
          "A new experiment where the learner must decide which heterogeneity deserves design-stage blocking and which should remain analysis-stage exploration.",
        explicitlyOutOfScope: ["Optimal matching", "Covariate-adaptive randomization theory", "Post-selection subgroup inference"],
        nextArcBoundary:
          "A06 owns blinding and measurement design after assignment has been constructed.",
      },
      "T22-M31-A06": {
        focus: "Blinding and measurement bias: prevent knowledge of assignment from changing treatment delivery, outcome measurement or analytic judgment.",
        roleRelevance:
          "Many quantitative experiments cannot blind the software that executes a policy, but they can still blind human raters, labels, adjudication, discretionary overrides or parts of analysis; measurement contamination can erase the benefit of clean randomization.",
        purpose:
          "Map who can know assignment, which behaviors that knowledge could change, and which measurement procedures can be made objective or blinded.",
        principalObstacle:
          "Randomization protects assignment, not measurement. If treatment knowledge changes outcome recording, exclusion decisions, manual intervention or stopping, the observed difference may reflect the measurement process rather than the treatment alone.",
        entryPrerequisites: ["T22-M31-A03-A04", "ARC503 measurement/sampling bias concepts", "ARC506 selection bias"],
        target:
          "Produce a blinding/measurement plan that identifies exposed roles, pre-specifies objective endpoints where possible, and diagnoses differential measurement, attrition or discretionary exclusion.",
        requiredMastery: [
          "Distinguish participant, operator, outcome-assessor and analyst blinding as different protections",
          "State when blinding is impossible and replace slogans with concrete objective measurement safeguards",
          "Identify differential attrition or exclusion as a post-assignment threat",
          "Design an outcome definition that can be computed identically across groups",
          "Diagnose a manual adjudication process that leaks treatment labels",
          "Explain why unblinded stopping or selective data cleaning can reintroduce researcher discretion",
          "Construct an auditable masking scheme for group labels during an initial analysis stage when feasible",
          "Transfer measurement-bias diagnosis to an unfamiliar automated/human hybrid experiment",
        ],
        applicationScope:
          "Experiments with automated metrics, human review, manual overrides or treatment-aware operational processes where measurement procedures can be audited.",
        transferScope:
          "A new design where full blinding is impossible and the learner must identify the specific bias channels that still can be controlled.",
        explicitlyOutOfScope: ["Clinical-trial regulatory standards", "Missing-data estimation methods", "End-to-end reproducibility infrastructure"],
        nextArcBoundary:
          "A07 owns genuine replication, repeated measurement and the independence structure of the evidence.",
      },
      "T22-M31-A07": {
        focus: "Replication versus repeated measurement: count independent experimental units, not merely rows, ticks or repeated observations.",
        roleRelevance:
          "Quantitative datasets can contain millions of observations generated by very few independent experimental assignments; treating repeated measurements as independent replication creates spectacularly overconfident inference.",
        purpose:
          "Separate biological/experimental replication from repeated measurements on the same unit, identify pseudoreplication, and connect the design's effective independent information to ARC505 power reasoning.",
        principalObstacle:
          "More measurements per randomized unit can improve measurement precision but do not create the same information as more independently assigned units; the unit of assignment and dependence structure determine replication.",
        entryPrerequisites: ["T22-M31-A03", "ARC505 standard error/power", "ARC517 dependence/covariance"],
        target:
          "Given a hierarchical dataset, identify independent experimental units, repeated measurements and technical repeats, diagnose pseudoreplication, and redesign the experiment or analysis summary so uncertainty is tied to the correct replication level.",
        requiredMastery: [
          "Count independent randomized units separately from the number of recorded observations",
          "Distinguish repeated measurement, technical repetition and independent experimental replication",
          "Construct a counterexample where thousands of within-unit measurements still provide only a handful of independent treatment assignments",
          "Explain why naive row-level tests can understate uncertainty under within-unit dependence",
          "Relate additional independent units versus additional repeated measurements to different sources of uncertainty",
          "Diagnose a design whose nominal sample size is inflated by clustering or repeated ticks",
          "Specify what new independent replication would actually mean in an unfamiliar experiment",
        ],
        applicationScope:
          "Repeated observations within users, assets, days, servers, experimental runs or other assigned units where dependence is structurally obvious.",
        transferScope:
          "A new hierarchical dataset where the learner must reconstruct the assignment/measurement hierarchy before interpreting n.",
        explicitlyOutOfScope: ["Mixed-effects models in depth", "Cluster-robust/HAC variance derivations", "Independent reproduction of an entire research pipeline — ARC509"],
        nextArcBoundary:
          "A08 owns experiments with multiple deliberately manipulated factors and their interactions; ARC509 later owns independent reproduction of the entire study/pipeline rather than within-design replication.",
      },
      "T22-M31-A08": {
        focus: "Factorial experiments: vary multiple factors jointly to estimate main effects and interactions efficiently.",
        roleRelevance:
          "Quant systems often change several controllable components at once; factorial design reveals whether components combine additively or interact instead of relying on serial one-factor-at-a-time experiments.",
        purpose:
          "Construct and interpret a small full-factorial design, identify main effects and interactions, and enforce random assignment across treatment combinations.",
        principalObstacle:
          "A factor's effect can depend on the level of another factor; averaging blindly or changing one factor at a time can miss interactions and confound conclusions with time/regime changes.",
        entryPrerequisites: ["T22-M31-A01-A07", "ARC539 interaction terms", "Basic combinatorics"],
        target:
          "Design a two-factor full experiment, enumerate treatment combinations, define main-effect and interaction contrasts, and diagnose interpretations that ignore interaction or use nonrandom sequential changes.",
        requiredMastery: [
          "Enumerate all treatment combinations in a 2x2 or similarly small full-factorial design",
          "Define a main effect as an average contrast across levels of the other factor",
          "Construct and interpret an interaction contrast",
          "Show numerically how strong interaction can make a single unconditional main effect misleading",
          "Randomize units across treatment combinations rather than introducing factors in fixed time order",
          "Connect factorial multiplicity to ARC505 without treating every exploratory contrast as pre-specified",
          "Diagnose a one-factor-at-a-time design that cannot distinguish interaction from drift",
          "Transfer factorial reasoning to an unfamiliar algorithmic or operational system",
        ],
        applicationScope:
          "Small full-factorial experiments with a few controllable factors and interpretable interactions.",
        transferScope:
          "A new multi-component intervention where the learner must decide whether joint manipulation is needed to separate main and interaction effects.",
        explicitlyOutOfScope: ["Fractional factorials", "Alias structures", "Response-surface methodology", "High-dimensional automated experimentation platforms"],
        nextArcBoundary:
          "A09 integrates intervention, controls, randomization, blocking, measurement, replication and factorial choices into one defended design.",
      },
      "T22-M31-A09": {
        focus: "Experimental Design Forge: build, pre-mortem and defend a complete randomized experiment under realistic constraints.",
        roleRelevance:
          "The durable quant-research capability is not naming design components but assembling them coherently enough that a skeptical reviewer can trace the causal claim from intervention through assignment, measurement and analysis.",
        purpose:
          "Synthesize the module into a pre-specified experimental protocol with explicit estimand, design choices, analysis commitments and failure diagnostics.",
        principalObstacle:
          "Individually sensible ingredients can still form an invalid experiment if the unit, assignment, comparison, outcome, blocking, replication or analysis target are inconsistent with each other.",
        entryPrerequisites: ["T22-M31-A01-A08", "ARC505 power/multiplicity", "ARC506 identification audit"],
        target:
          "Given a messy quantitative-research intervention, produce and defend a complete experimental protocol: target population, unit, treatment/control, randomization, blocking, measurement/blinding, replication, factorial structure if justified, primary estimand, power assumptions, pre-specified analysis, multiplicity policy and failure/stop criteria.",
        requiredMastery: [
          "Write a one-page design table linking research question, estimand, unit, assignment, outcome and analysis",
          "Construct an auditable randomization procedure and explain its causal leverage",
          "Justify the comparison/control condition and any blocking variables",
          "Identify interference, noncompliance, attrition, measurement leakage and pseudoreplication threats before seeing results",
          "Reuse ARC505 power/sample-size reasoning with the correct independent unit rather than raw row count",
          "Specify primary versus exploratory outcomes/contrasts and a multiplicity policy",
          "Pre-specify objective exclusions and stopping/failure conditions that do not depend on favorable results",
          "Explain which conclusions remain valid if one design assumption fails",
          "Defend the protocol under an unfamiliar transfer and revise it when a reviewer exposes a hidden assumption",
        ],
        applicationScope:
          "A realistic A/B, execution-policy, operational or product experiment with enough complexity to require explicit design trade-offs but not advanced quasi-experimental machinery.",
        transferScope:
          "A new experimental domain where the surface changes but the design invariants—unit, intervention, assignment, comparison, measurement, replication and claim—must be reconstructed from scratch.",
        explicitlyOutOfScope: [
          "Full model-validation methodology and leakage-safe train/validation/test pipelines — ARC508",
          "End-to-end provenance, deterministic artifacts and independent replication of the complete research pipeline — ARC509",
          "Production trading backtest governance and adversarial final research defense — ARC560",
          "Quasi-experimental causal estimators — ARC545-ARC550",
        ],
        nextArcBoundary:
          "M32 / ARC508 owns adversarial model validation, leakage control and out-of-sample design; M33 / ARC509 owns reproducibility and independent study/pipeline replication; ARC560 later integrates these with market-data, costs and backtest governance in the terminal research forge.",
      },
    },
  };
}
