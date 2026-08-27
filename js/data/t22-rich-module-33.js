export function buildT22RichModule33(syllabusVersion) {
  return {
    moduleId: "ARC509",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build epistemic discipline and reproducibility as part of the research method rather than post-hoc documentation: formulate falsifiable claims, preserve a chronological research record, trace data provenance, capture code/environment state, build deterministic or explicitly stochastic pipelines, distinguish rerun reproducibility from independent replication, preserve negative results and researcher degrees of freedom, and defend a complete research package against an external rerun.",
    moduleDestination:
      "The learner can turn a quantitative-research result into an auditable evidence package whose claim, data lineage, code, environment, parameters, random seeds, artifacts, research decisions, failed alternatives and replication status can be reconstructed by another researcher; they can diagnose hidden flexibility or irreproducibility and state exactly what has and has not been independently replicated.",
    entryPrerequisites: [
      "ARC508 model-validation discipline, leakage control, frozen evaluation and adversarial out-of-sample defense",
      "ARC507 pre-specification, experimental units and replication-versus-repeated-measurement reasoning",
      "ARC505 multiplicity, hypothesis testing and researcher-choice consequences",
      "ARC515 reproducible Python experiments, assertions and tests",
      "Basic version-control concepts and file-system literacy",
    ],
    explicitlyOutOfScope: [
      "Choosing or validating predictive models, cross-validation and final holdout governance — ARC508",
      "Experimental randomization, controls, blinding and factorial design — ARC507",
      "Monte Carlo estimator theory, pseudo-random simulation and variance reduction — ARC513",
      "Market-feed reconstruction, timestamp alignment and known-at-the-time dataset engineering — ARC714",
      "Dirty financial-data repair, corporate actions, survivorship and vendor-bias engineering — ARC715",
      "Production CI/CD, cloud deployment, orchestration platforms, MLOps and general software-engineering infrastructure",
      "Terminal backtest integration, transaction costs, capacity and the final market-research memo — ARC560",
    ],
    arcs: {
      "T22-M33-A01": {
        focus: "Claims, predictions and falsifiability: state in advance what the research result asserts and what evidence would count against it.",
        roleRelevance:
          "Quantitative research becomes unfalsifiable when the story, target, horizon or success criterion shifts after results are known; an auditable claim must expose its possible failure before interpretation begins.",
        purpose:
          "Convert a research idea into a precise empirical claim with a target population, observable prediction, primary evidence criterion and explicit failure conditions.",
        principalObstacle:
          "A plausible narrative can survive almost any dataset if its definitions and success conditions are allowed to move after inspection; falsifiability requires fixing enough of the claim that adverse evidence cannot simply be redescribed away.",
        entryPrerequisites: ["ARC508 frozen evaluation and baselines", "ARC505 null/alternative and multiplicity logic", "ARC504 estimands"],
        target:
          "Given a quantitative-research idea, write a claim that specifies the object, population/regime, prediction or effect, evaluation criterion and failure conditions, then diagnose formulations that are too elastic to be meaningfully tested.",
        requiredMastery: [
          "Separate a mechanistic story from the empirical claim actually tested",
          "State the target population or deployment regime and primary observable outcome",
          "Write at least one concrete result that would count against the claim",
          "Distinguish exploratory hypotheses from confirmatory claims",
          "Diagnose post-hoc changes of horizon, subgroup, metric or sign that rescue a failed claim",
          "Construct two superficially similar claims with different falsification conditions",
          "Transfer claim-formulation discipline to an unfamiliar quantitative domain",
        ],
        applicationScope:
          "Signal, forecasting, model-comparison, experimental or statistical research questions where observable success/failure criteria can be stated before final interpretation.",
        transferScope:
          "A new research narrative in which the learner must identify what exact proposition the evidence could support or refute.",
        explicitlyOutOfScope: ["Research-log mechanics", "Data lineage", "Replication execution"],
        nextArcBoundary:
          "A02 owns the chronological record of how claims, analyses and decisions evolved during the research process.",
      },
      "T22-M33-A02": {
        focus: "Research logs as chronological evidence of decisions, hypotheses, failures and analysis changes.",
        roleRelevance:
          "Without a contemporaneous record, researchers reconstruct tidy stories from messy adaptive searches and lose the ability to distinguish pre-specified reasoning from hindsight.",
        purpose:
          "Create a research log that captures decision time, motivation, inputs inspected, code/data version, result, interpretation and next action without turning documentation into a diary of irrelevant detail.",
        principalObstacle:
          "A log written after the fact can look complete while erasing researcher degrees of freedom; useful logs must be chronological enough to reveal when evidence influenced subsequent choices.",
        entryPrerequisites: ["T22-M33-A01", "ARC508 adaptive-overfitting and final-test governance"],
        target:
          "Maintain and audit a chronological research record that allows another researcher to reconstruct which decisions were made before versus after each substantive result.",
        requiredMastery: [
          "Record hypothesis/decision timestamps and the evidence available at that point",
          "Link substantive decisions to exact code/data/config versions or immutable identifiers",
          "Record failed analyses and abandoned branches rather than only the winning path",
          "Distinguish exploratory notes from pre-specified commitments",
          "Diagnose a polished retrospective narrative whose chronology cannot be reconstructed",
          "Use the log to identify when a nominal holdout or hypothesis became contaminated by feedback",
          "Compress a noisy research history into an auditable decision trail without deleting material failures",
        ],
        applicationScope:
          "Iterative quantitative projects involving multiple analyses, features, models, hypotheses or data revisions.",
        transferScope:
          "An unfamiliar project history where the learner must infer which missing log entries prevent trustworthy reconstruction.",
        explicitlyOutOfScope: ["Git internals", "Project-management systems", "Full provenance metadata"],
        nextArcBoundary:
          "A03 owns provenance of the data themselves: where each input came from and how it was transformed.",
      },
      "T22-M33-A03": {
        focus: "Data provenance: trace every research dataset from source acquisition through immutable raw inputs and transformation lineage.",
        roleRelevance:
          "A result is not reproducible if the data cannot be identified exactly; vendor revisions, undocumented filters or silent preprocessing can change conclusions while code remains unchanged.",
        purpose:
          "Build a lineage record that identifies source, retrieval/version information, raw-file integrity and every transformation needed to reconstruct analysis-ready data.",
        principalObstacle:
          "A filename or download URL is not sufficient provenance: mutable upstream sources, undocumented filters and overwritten intermediates make it impossible to know which observations actually generated a reported result.",
        entryPrerequisites: ["T22-M33-A02", "ARC503 sampling mechanisms", "ARC515 tabular research data"],
        target:
          "Given a research dataset, produce an auditable provenance chain from source to analysis artifact, including immutable identifiers/checksums, transformation order and inclusion/exclusion rules.",
        requiredMastery: [
          "Record source, retrieval date/version and relevant access/query parameters",
          "Preserve or uniquely identify immutable raw inputs rather than overwriting them",
          "Use hashes/checksums or equivalent identifiers to distinguish exact file contents",
          "Represent transformation lineage from raw input to final analytical table",
          "Record row/entity inclusion, exclusion and filtering rules",
          "Diagnose a result whose dataset cannot be reconstructed because an intermediate or upstream version is ambiguous",
          "Transfer provenance design to an unfamiliar data source with mutable or query-generated outputs",
        ],
        applicationScope:
          "Public, vendor, experimental or internally generated datasets whose exact bytes/query result and transformations can be identified.",
        transferScope:
          "A new data pipeline where the learner must choose the minimum metadata needed to establish exact lineage without yet solving domain-specific cleaning problems.",
        explicitlyOutOfScope: ["Market event-time reconstruction — ARC714", "Corporate actions/vendor discrepancy repair — ARC715", "Database administration"],
        nextArcBoundary:
          "A04 owns reconstruction of the executable environment that transformed those inputs into results.",
      },
      "T22-M33-A04": {
        focus: "Code and environment reproducibility: identify the executable program, dependencies, runtime settings and stochastic state needed for rerun equivalence.",
        roleRelevance:
          "Research code can change meaning under different package versions, numerical libraries, locale/timezone settings or random states; 'the code is on GitHub' does not prove reproducibility.",
        purpose:
          "Capture enough software/environment state that a second machine can recreate the intended computation and diagnose meaningful deviations.",
        principalObstacle:
          "Source code alone underdetermines execution: unpinned dependencies, hidden configuration, implicit environment variables and uncontrolled randomness can make ostensibly identical reruns diverge.",
        entryPrerequisites: ["T22-M33-A03", "ARC515 environments/tests and random-number use"],
        target:
          "Package a research computation with an exact code revision, dependency/environment specification, configuration and random-state policy, then verify a clean rerun or explain why bitwise identity is not a legitimate requirement.",
        requiredMastery: [
          "Identify the exact source revision used for a reported result",
          "Capture dependency versions and runtime/interpreter information",
          "Externalize and version substantive configuration rather than relying on hidden local state",
          "Control random seeds/streams when determinism is scientifically appropriate",
          "Identify hardware/library nondeterminism that can make bitwise equality unrealistic while preserving substantive reproducibility",
          "Run or design a clean-environment reproduction check",
          "Diagnose an environment description that is too weak to recreate the original computation",
        ],
        applicationScope:
          "Python-based quantitative research with manageable dependencies, configuration files and stochastic components.",
        transferScope:
          "A new computational project where the learner must distinguish scientifically relevant environment capture from unnecessary machine trivia.",
        explicitlyOutOfScope: ["Production deployment", "Container orchestration", "Performance tuning", "Monte Carlo convergence theory"],
        nextArcBoundary:
          "A05 owns deterministic pipeline structure and immutable artifacts across the entire computational chain.",
      },
      "T22-M33-A05": {
        focus: "Deterministic pipelines and artifacts: make the path from immutable inputs to reported outputs executable, inspectable and resistant to hidden manual steps.",
        roleRelevance:
          "A reproducible environment still fails if the result depends on notebook cell order, manual file edits, stale caches or undocumented commands; research outputs should arise from an explicit dependency chain.",
        purpose:
          "Turn data preparation, analysis and reporting into an ordered pipeline whose stages declare inputs, parameters and outputs and whose final artifacts can be tied to exact upstream state.",
        principalObstacle:
          "Hidden state makes reruns path-dependent: running cells in a different order, reusing stale intermediates or manually copying values can generate an artifact that no documented command reproduces.",
        entryPrerequisites: ["T22-M33-A03-A04", "ARC515 functions/tests and reproducible mini-project"],
        target:
          "Construct or audit a compact research pipeline in which a clean invocation regenerates the claimed tables/figures/metrics from identified inputs with explicit treatment of stochastic stages.",
        requiredMastery: [
          "Specify stage inputs, outputs, parameters and dependencies",
          "Eliminate or expose manual transformations and notebook-order dependence",
          "Use immutable or content-identified artifacts where stale-cache confusion would be dangerous",
          "Regenerate a reported result from a clean starting state",
          "Differentiate deterministic computation from explicitly stochastic computation with controlled randomness",
          "Add assertions/invariants that catch mismatched or stale upstream artifacts",
          "Diagnose a pipeline whose final figure cannot be traced to a unique configuration and dataset",
          "Transfer pipeline design to an unfamiliar multi-stage quantitative workflow",
        ],
        applicationScope:
          "Small-to-medium research pipelines spanning data transformation, model/analysis execution and report artifact generation.",
        transferScope:
          "A new workflow where the learner must find hidden state and redesign the minimal dependency graph needed for reliable reruns.",
        explicitlyOutOfScope: ["Distributed workflow engines", "CI/CD platform design", "Production data orchestration"],
        nextArcBoundary:
          "A06 distinguishes successful reruns of the same pipeline from stronger independent replication of the research claim.",
      },
      "T22-M33-A06": {
        focus: "Replication: distinguish computational reproducibility, independent reimplementation and genuinely new evidence for the same claim.",
        roleRelevance:
          "A script producing the same number twice checks execution; it does not establish that an empirical result survives new code, new data or an independent research team.",
        purpose:
          "Build a hierarchy of replication strength and require claims to state which level has actually been achieved.",
        principalObstacle:
          "Researchers often use 'replicated' for any rerun, collapsing very different evidential achievements: same-code reproducibility, independent implementation, robustness on alternative data and independent confirmatory evidence.",
        entryPrerequisites: ["T22-M33-A01-A05", "ARC507 replication versus repeated measurement", "ARC508 final-test discipline"],
        target:
          "Given a published research package or internal study, design replication attempts at increasing independence, predict which shared failure modes each attempt can or cannot detect, and report the achieved replication level without exaggeration.",
        requiredMastery: [
          "Distinguish same-code rerun, clean-environment reproduction and independent reimplementation",
          "Distinguish repeated measurement/extra rows from a new independent empirical replication",
          "Identify shared data/code assumptions that make two nominal replications non-independent",
          "Design an independent implementation from a written specification rather than copying the original code path",
          "Explain what new-data replication adds beyond exact computational reproducibility",
          "Diagnose a claim of replication that only reran the same artifact",
          "State residual common-mode failure risks after a successful replication",
          "Transfer the replication hierarchy to an unfamiliar quantitative study",
        ],
        applicationScope:
          "Computational empirical studies where same-code, independent-code and/or fresh-data reproduction can be meaningfully distinguished.",
        transferScope:
          "A new research result where the learner must choose the strongest feasible replication and explain precisely what confidence it adds.",
        explicitlyOutOfScope: ["Meta-analysis", "Multi-site experimental-trial methodology", "Formal reproducibility statistics"],
        nextArcBoundary:
          "A07 owns preservation of failed results and explicit accounting for the research choices that produced the surviving specification.",
      },
      "T22-M33-A07": {
        focus: "Negative results and researcher degrees of freedom: preserve the full search history needed to judge the surviving result honestly.",
        roleRelevance:
          "Quant research can manufacture apparent edges by trying many plausible features, filters, horizons and definitions and reporting only the winner; discarded failures are part of the evidence about selection risk.",
        purpose:
          "Make negative results scientifically useful and expose the effective search space, post-hoc choices and abandoned hypotheses behind a reported finding.",
        principalObstacle:
          "Publication/selective-reporting bias occurs inside a single research desk too: if failed specifications vanish, later readers cannot distinguish one pre-specified success from the maximum of a large adaptive search.",
        entryPrerequisites: ["T22-M33-A02", "ARC505 multiplicity", "ARC508 overfitting/nested evaluation"],
        target:
          "Given an adaptive research history, construct a decision/search ledger that records meaningful alternatives and negative results, identifies researcher degrees of freedom and limits the final claim accordingly.",
        requiredMastery: [
          "Record substantively attempted hypotheses/specifications rather than only the final winner",
          "Separate principled debugging from outcome-driven rescue tuning",
          "Identify choices of feature, horizon, universe, metric, exclusions or stopping rule that expanded the search space",
          "Explain why a negative result can constrain future hypotheses and prevent repeated rediscovery",
          "Diagnose HARKing or selective reporting from a research chronology",
          "Relate hidden researcher degrees of freedom to multiplicity/adaptive-overfitting concerns without pretending a simple correction always solves them",
          "Write a failure note that preserves the rejected mechanism and exact specification",
          "Transfer the audit to an unfamiliar research program with many informal analyst choices",
        ],
        applicationScope:
          "Exploratory signal/model research where many plausible specifications or hypotheses are considered sequentially.",
        transferScope:
          "A new apparently successful result where the learner must reconstruct what unreported search history would materially alter its interpretation.",
        explicitlyOutOfScope: ["Full selective-inference theory", "Online testing procedures", "Production experiment registries"],
        nextArcBoundary:
          "A08 integrates claims, logs, provenance, environment, pipelines, replication and negative results into one reproducible research defense.",
      },
      "T22-M33-A08": {
        focus: "Reproducible research defense: package and adversarially audit the complete evidence chain from claim to regenerated artifact.",
        roleRelevance:
          "A quantitative researcher should be able to hand a result to a skeptical colleague who can reconstruct what was claimed, rerun the computation, inspect the search history and identify which conclusions are supported without relying on oral context.",
        purpose:
          "Integrate the module into a portable research package and adversarial defense that tests whether the result survives loss of the original researcher's memory and workstation state.",
        principalObstacle:
          "Each component can look adequate in isolation while the package remains irreproducible globally: missing raw inputs, untracked configs, undocumented manual steps, stale artifacts or hidden negative results can break the chain between claim and evidence.",
        entryPrerequisites: ["T22-M33-A01-A07"],
        target:
          "Produce and defend a compact research package containing a falsifiable claim, chronological log, provenance manifest, exact code/environment specification, executable artifact pipeline, replication statement and negative-result/search ledger; then have the package rerun or audit it as if the original researcher were unavailable.",
        requiredMastery: [
          "Trace every headline result backward to exact artifact, configuration, code revision and data provenance",
          "Regenerate the primary reported artifact from a clean invocation or document a scientifically justified nondeterministic tolerance",
          "Show from the log which decisions were pre-specified, exploratory and post-result",
          "Expose failed specifications and researcher degrees of freedom relevant to interpreting the winner",
          "State exactly which reproduction/replication level has been achieved",
          "Perform an adversarial missing-context audit and identify any information that lives only in the researcher's memory",
          "Use checksums/assertions/manifests or equivalent controls to detect mismatched inputs or stale outputs",
          "Defend the strongest conclusion justified while stating unresolved reproducibility and external-validity limits",
          "Transfer the complete defense to an unfamiliar quantitative project",
        ],
        applicationScope:
          "An end-to-end computational research study whose data, analysis and report artifacts are small enough for another researcher to reconstruct independently.",
        transferScope:
          "A hostile reproducibility review of an unfamiliar research repository or paper package with hidden-state and selective-reporting traps.",
        explicitlyOutOfScope: ["Monte Carlo method theory — ARC513", "Market-data reconstruction — ARC714", "Dirty-data bias engineering — ARC715", "Full trading research/backtest integration — ARC560"],
        nextArcBoundary:
          "M34 / ARC513 owns simulation as a mathematical experiment: Monte Carlo estimators, error, sampling transformations and variance-reduction methods; later ARC715 and ARC560 reactivate this reproducibility discipline for financial data and terminal research defense.",
      },
    },
  };
}
