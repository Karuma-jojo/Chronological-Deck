# T22 build specification

## 1. Goal and boundaries

Improve T22, not create T26. Develop a learner from uncertain school-mathematics foundations towards independently demonstrable quantitative trading and empirical research capability. M.Stat remains an optional educational route; this build is not an admissions guarantee or an employment credential.

Produce actual lessons, problems, evaluator references, transfer, computation, simulations, projects and a usable progression. No fixed target module/card count. Do not promise perfection, a salary, live profitability, or mastery through reading.

Preserve existing learner records and identifiers. A materially changed obligation requires explicit versioning and evidence migration. Preserve the frozen Master, Guardian and extractor unless a reproducible runtime defect warrants a separately documented fix. Leave T25's current route and evidence authority intact.

## 2. Repository recovery and reuse

At every resumption read RUN-LOG.md first; verify actual remote branch head and working tree before proceeding. Read applicable AGENTS.md instructions. Detect concurrent changes, preserve them, and never force push.

Inspect these starting points, then trace their imports and consumers rather than assuming this list is exhaustive:
- js/data/t22-quant-research.js
- js/data/t22-rich-syllabus.js
- js/data/t22-atomic-arcs.js
- js/data/t22-rich-module-*.js
- scripts/validate-t22-atomic.mjs
- scripts/validate-t22-rich-syllabus.mjs
- scripts/validate-t22-rich-module-*.mjs

T25 patterns available for selective reuse:
- course/authoring/phase-1.mjs through phase-7.mjs: original main/transfer tasks and reference organisation.
- course/authoring/supplements.mjs and campaign.mjs: supplementary sets and optional fiction.
- scripts/build-t25-course.mjs: deterministic authoring-to-generated build.
- js/course/core.js and ui.js, t25-course.html: attempts, exposure, review, export/import and navigation.
- scripts/test-t25-course.mjs, test-t25-course-browser.mjs, check-t25-course-math.py.
- docs/t25-course/RELEASE.md and RUN-LOG.md.
- prompts directory: inspect actual T22 compiler/runtime contracts before proposing integration.

Reuse architecture and valid content after inspection. T25 is not a flawless oracle: its compact notes, task pairs, review intervals and selected mathematical checks do not prove comprehensive mastery or empirical retention. Do not copy fixed intervals as scientifically calibrated learner parameters.

Use original task IDs with versioned references if sharing a bank; do not silently duplicate exposed tasks and label them fresh. Conceptual overlap does not automatically transfer clearance. Separate current-course evidence from self-ratings.

## 3. Initial audit outputs

Create docs/t22-rebuild/INVENTORY.md: authoritative registries, UI entry points, current identifiers, known archived evidence locations, validation commands and source commit.
Create FINDINGS.md: ID, location, defect, evidence, learner consequence, severity, proposed repair, state.
Create SOURCE-MAP.md: capability, primary source URL, date checked, role/curriculum relevance, limits of inference.
Create ROUTE.md plus a machine-readable dependency representation using a schema that fits the repository.
Create MIGRATION.md: unchanged, split, merged, replaced and retired obligations with explicit evidence-transfer rules.

Use current employer job descriptions, interview guidance, university courses, textbooks and documentation. Distinguish role requirements from optional specialisations and marketing claims. Do not copy copyrighted problem banks wholesale. Link official external assessments and write original local tasks.

## 4. Provisional learning architecture

This is an architectural starting point, not an approved final order. Expand, combine and reorder from the audit. Every formal prerequisite must occur earlier in the default linear route or in an explicit diagnostic bridge. Introduce a motivation early without pretending the necessary theory is already mastered.

| Phase | Conceptual work | Computational progression | Observable exit |
|---|---|---|---|
| F0: readiness | Signed arithmetic, fractions, ratios, percentages, units, elementary algebra | Calculator use, expressions, variables | Correctly interpret and compute an unfamiliar quantity |
| F1: mathematical language | Equations, inequalities, functions, graphs, domains, quantifiers, elementary proof | Conditions, small functions, assertions and edge cases | Explain a legal transformation and refute an invalid one |
| F2: finite uncertainty | Sets, counting, sample spaces, conditional probability, independence, finite expectation/variance | Lists, loops, enumeration, random simulation and reproducible seeds | Derive a finite law and independently check it |
| F3: change and structure | Sequences, limits, derivatives, integrals; vectors, systems, matrices, orthogonality | Arrays, plotting, numerical error and small linear systems | Connect a derivation to a checked numerical result |
| F4: continuous probability and inference | Densities/CDFs, joint laws, conditioning, sampling, estimation, intervals, testing and asymptotics | Simulation studies, uncertainty summaries, reproducible notebooks/scripts | Explain estimand, assumptions, sampling variability and limitations |
| F5: statistical models | Regression, diagnostics, multivariable/matrix calculus as needed, optimisation, regularisation, model selection | Fit a baseline, inspect residuals, separate fitting and evaluation | Defend validation choices and diagnose a misleading result |
| F6: dependent data | Time-series dependence, stationarity assumptions, forecasting baselines, conditional volatility at justified depth | SQL, timestamp-aware joins, temporal splits, train-only transforms | Construct an evaluation with no future information leakage |
| T1: trading decisions | Payoffs, conditional decisions, utility, bankroll constraints, drawdowns, sizing and leverage | Finite decision simulators and stress cases | Defend a decision before seeing its random outcome |
| T2: markets and execution | Instruments and cash flows, order types, spread, order book, inventory, adverse selection, costs and impact | Toy execution/making simulator with explicit fill assumptions | Account for cash, inventory, P&L and execution limitations |
| R1: empirical investigation | Hypothesis, provenance, baselines, missingness, bias, uncertainty and multiple testing | Versioned data pipeline and experiment log | Produce a falsifiable, reproducible study |
| R2: strategy evaluation | Walk-forward evaluation, overfitting, turnover, capacity, regimes and implementation risk | Costs-aware backtest with independent accounting checks | Explain why attractive backtest performance may not be actionable |
| C: synthesis | Trading simulation, research defence, communication and interview practice | Reproducible project releases and unseen modifications | Independent defence of assumptions, code and conclusions |

Give one numbered default itinerary that interleaves ready trading/research tasks with foundations. Do not make the table's row order an accidental mandate to postpone all trading until F6. Finite payoff games can follow F2; formal utility sizing needs its actual calculus/probability prerequisites. Each branch module must name those prerequisites.

Keep derivatives pricing, advanced stochastic calculus/PDEs, deep learning, low-latency systems and sophisticated market microstructure as justified specialisations. Promote them into core only with evidence for the selected target roles. Do not remove necessary multivariable calculus or linear algebra merely to keep the course short.

## 5. Learner experience and session contract

One central intellectual obstacle per session. A meaningful unit can span multiple sittings. Each session includes:
- Stable ID and content version; prior mapping; branch and default order.
- Central capability and observable exit.
- Exact mathematical and coding prerequisites, with earlier IDs or diagnostic bridges.
- Definitions allowed before assessment; what requires explicit teaching.
- A short learn mode, useful examples and remedial branches outside WALL.
- An independent main task with complete givens, domains, conventions and deliverable.
- Evaluator reference with derivation, cases, acceptable alternate routes and common errors.
- A transfer with changed structure/surface sufficient to test reasoning, not just new numbers.
- Coding/computational extension where useful, independently scoped and assessed.
- Assessment rubric, stopping condition and later retrieval links.
- Out-of-scope list, provisional time estimate and source provenance.
- Validation status for each task/reference: authored, self-reviewed, independently checked, externally reviewed or learner-piloted.

Do not make every module merely an audit of someone else's solution. Include discovery, construction, modelling, estimation, debugging, decisions and communication.

A right answer alone may not establish reasoning; an algebraic route need not match the reference. One successful pair is not certification of all topic variations.

## 6. Mathematical and coding assistance

Use separate evidence fields for conceptual hints, syntax help, supplied code, reference exposure, independent explanation, debugging and transfer.

A learner may derive mathematics under WALL and then request syntax help explicitly. This does not retrospectively erase independent mathematical evidence, but does not establish independent coding either.

Before asking for simulation, teach the needed loop, random variable generation, seed and frequency interpretation. Before regression code, teach arrays and relevant model assumptions. Before temporal validation, establish dependence and what information exists at prediction time.

Teach enough Python, debugging, tests, data handling, SQL, version control and complexity to meet the selected roles. Do not require a separate broad software-engineering course. Do not assume programming competence from copied AI code.

## 7. Trading and research realism

Trading: distinguish gross/net payoff, expected/realised results, drawdown/risk measures and mathematical assumptions. Include adverse selection and inventory, not just probability riddles. Teach finite-horizon ruin/stress cases before presenting growth-optimal sizing as advice. Kelly results must declare odds, dependence and parameter assumptions. All activity is simulated or paper-based.

Research: include prediction-time data availability, corrections/revisions, corporate actions, survivorship, universe construction, fit-only preprocessing, temporal dependence, multiple trials, selection bias and uncertain costs/capacity. A model with no useful effect is a legitimate successful research outcome if the investigation is sound.

Toy market simulators cannot establish live fill quality, impact, profitability or capacity. Document their known idealisations. Mathematical validity, simulated validity and real-world validity are separate.

## 8. Projects and readiness

Build a prerequisite-gated ladder, reusing outputs where educationally useful:
1. Finite payoff laboratory: exact derivation, exhaustive small-case checks, simulation and uncertainty.
2. Estimator/model laboratory: known synthetic truth, competing methods and documented failure conditions.
3. Forecasting investigation: declared prediction time, temporal baseline, train-only preprocessing and honest holdout.
4. Trading simulator: decisions made with available information, inventory/cash accounting and execution stress.
5. Capstone: data provenance, hypothesis register, costs-aware evaluation, negative controls, sensitivity and written defence.

Select permitted public/synthetic datasets with a reproducible fallback. Dataset changes must not silently invalidate answer keys.

A portfolio release includes README, assumptions, data permissions/source, environment instructions, runnable code, independent checks, results, limitations and a short presentation. Require an unseen modification and explanation; do not accept only screenshots or a high Sharpe ratio.

Define readiness to seek project feedback, apply to eligible internships, attempt interviews and pursue advanced research separately. Actual offers and professional performance are not course completion fields.

## 9. Stage A: complete before bulk authoring

Deliver the inventory, evidence-backed findings, source map, proposed full route/dependencies and migration plan. Then author three complete sample modules:
A. A genuinely accessible foundation session for the learner's entry point.
B. A finite trading-decision session with explicit earlier prerequisites.
C. A research-validation session with explicit advanced prerequisites; it need not be immediately accessible to the beginner.

For each provide learn content, public task, evaluator derivation, transfer, coding boundary, rubric and validation evidence. Samples are not permission to publish later problems out of order.

Validate dependency existence/order and manually trace the prerequisite ancestry of all three samples. Create REVIEW-PACKET.md with exact files/commit, decisions, unresolved risks, tests performed and specific questions for Astra. Push and stop at the agreed architecture checkpoint. No whole-course content dump.

## 10. Subsequent build stages

Stage B: repair architecture/sample findings. Maintain their resolution evidence and architecture baseline.
Stage C: implement the smallest complete vertical slice: source -> deterministic build -> UI -> public/hidden separation -> saved attempt -> review/export -> resume.
Stage D: author cohesive batches, default around 4-8 bounded sessions, smaller for difficult mathematics. Complete references and verification with the batch. Advance in dependency order; reuse validated material.
Stage E: complete branch projects, mixed retrieval, diagnostic compression, interview/readiness guide and migration.
Stage F: prepare final audit packet and release candidate. Keep the new route on the branch until user merge approval.

If unresolved architecture risks affect only one branch, continue independent verified work and flag that branch rather than inventing a resolution.

## 11. Tests and honest validation

Use schema checks for IDs, versions, required fields, dependency cycles/order, source references and evidence mappings. Run existing relevant T22 regressions before and after integration.

Check mathematics by explicit derivations and appropriate independent symbolic/exhaustive/numerical methods. Examples of necessary boundary checks: zero denominators; degenerate variance; singular matrices; support-dependent likelihood; dependent observations; non-existent moments; optimiser existence; finite-sample versus asymptotic statements.

Simulation is not a proof. A formula tested by reproducing its own implementation is not an independent check. State exactly which references were manually or independently checked.

Research-code tests include timestamp cutoff violations, train/test contamination, cash/inventory invariants, zero-cost benchmarks, adverse cost scenarios and null data. Avoid testing cosmetic reversible edits for ceremony.

Browser checks cover route navigation, prompt copying, reference exposure, async navigation, persistence/export/import, malformed records, mobile layout and unchanged existing progress. Static evaluator files may be hidden in normal use but are not encrypted secrets.

A final audit must distinguish automated structure checks, mathematical review, source verification and learner pilots. Do not label authoring completion as validated pedagogy.

## 12. Durable checkpoint contract

Use branch codex/t22-pedagogical-rebuild, starting from current scaffold head. Commit and actually push each coherent checkpoint; verify returned remote SHA. No force push, merge or deployment.

RUN-LOG.md records stage, source commit, latest previously verified remote checkpoint, files, decisions, tests/results, blockers and exact next actions. The commit containing the log is discoverable from git; do not create endless commits solely to insert a file's own commit SHA.

When uploads use Git blobs, verify complete content/blob hashes before updating the branch. Never silently accept truncated tool output. Do not mark blocked tests as passed.

Keep small manifests and summaries so later runs read relevant files instead of the entire bank. Create one canonical authoring source and generate derived files deterministically. Do not repeatedly re-author already accepted content.

No unsolicited parallel agents or repeated whole-repository audits. If credits run low, finish a coherent small checkpoint and leave exact resumption instructions. A new conversation resumes from the remote log, not from a fresh proposal.
