# T22 Stage A Architecture Findings

Status: completed Stage A architecture audit for bounded Astra review. This is not a claim that every existing atomic arc has been individually verified.

Audit base commit: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Stage A repair basis: current T22 route/atomic/rich contracts plus selective T25 implementation inspection.

## Blocking findings

### F-001 — BLOCKER — the live entry contract assumes the very foundations the rebuild is meant to teach

`js/data/t22-quant-research.js` admits the learner only after assuming arithmetic, algebraic manipulation, elementary functions and ordinary deductive reasoning. A learner arriving from uncertain school mathematics therefore has no explicit bridge into T22.

**Repair:** add a diagnostic/readiness gate followed by explicit numeracy, algebra, functions, exponents/sequences and proof-habit foundations before university-level analysis.

**Stage A state:** repaired in the proposed v3 route; runtime unchanged pending review.

### F-002 — BLOCKER — current atomic IDs are positional, so route reordering can silently corrupt evidence meaning

`js/data/t22-atomic-arcs.js` generates `T22-Mxx-Axx` from each parent module's position in the route. If a module moves while those IDs are reused, an existing checkmark can be reinterpreted as mastery of a different obligation.

**Repair:** freeze v2 evidence as historical and introduce a v3 identity that is parent-keyed and obligation-versioned. Route position must never be part of evidence identity.

**Stage A state:** migration rule specified in `MIGRATION.md`; no migration executed.

## High-severity findings

### F-003 — HIGH — existing validators encode the old architecture as truth

`validate-t22-atomic.mjs` asserts 58 modules, 596 arcs, exact indices, the present beginning and the present ending. Those checks are useful for the existing route but cannot be edited in place and then presented as proof that a materially different route preserves evidence semantics.

**Repair:** retain v2 validation for historical integrity; add v3 route/dependency/evidence validators in Stage B.

### F-004 — HIGH — derivative-first ordering is unsuitable for the declared weak-entry learner

The current route begins with derivatives before an explicit functions/graphs/limits bridge. Even if the rich derivative material is good, this is not a safe first prerequisite step for the target learner.

**Repair:** functions and sequences/limits precede derivatives; derivative content can then be reused.

### F-005 — HIGH — probability arrives too late for early trading judgment

Finite probability and expectation are currently module 17. That delays the simplest genuine trading games—payoff tables, expected value, fair price, break-even cost and loss-risk distinctions—until after a large calculus/linear-algebra/programming block.

**Repair:** counting → finite probability/expectation → finite trading-decision lab near the beginning.

### F-006 — HIGH — trading practice is concentrated at the end

The deepest finance modules are good but clustered at the final five macro slots. A learner can therefore spend a very long time studying mathematics without seeing how uncertainty, payoff, price, bid/ask, execution or research decisions connect to markets.

**Repair:** add minimal early trading/market bridges while keeping deep asset pricing, microstructure and execution at their natural advanced prerequisites.

### F-007 — HIGH — changed v3 obligations cannot inherit completion from macro checkmarks automatically

Current UI logic promotes all children of an already-cleared macro module. That is reasonable only if the child obligations are semantically unchanged. Split/enriched v3 modules would make blanket inheritance false evidence.

**Repair:** no v3 completion from old macro completion unless an explicit evidence-equivalence mapping proves the obligation is unchanged.

### F-013 — HIGH — `ARC586` cannot be reused unchanged under the draft's lighter prerequisites

The first Stage A route draft kept `ARC586` in the core with only `ARC514`, `SIDE271` and scientific Python. The existing rich `ARC586` contract explicitly builds on `ARC582` constrained optimization, `ARC585` numerical linear algebra/conditioning, `ARC711` matrix calculus and `ARC514`. Its content includes Newton/quasi-Newton methods, numerical conditioning, computational graphs, forward/reverse autodiff and gradient checking.

**Learner consequence:** reusing the existing module under the weaker prerequisite list would create hidden prerequisites and false readiness.

**Repair:** retain the current advanced `ARC586` as optional depth under its actual prerequisite chain. The default core keeps optimization formulation, convexity, KKT and model-selection practice without pretending that the full numerical-optimization/autodiff module is prerequisite-free.

**Stage A state:** repaired in `ROUTE.md` and `route.dependencies.json`; Astra should decide whether a smaller future core numerical-optimization bridge is necessary.

## Medium-severity findings

### F-008 — MEDIUM — programming is too concentrated rather than progressively integrated

The current macro route places a large Python/software module after twelve math modules. Later modules use code well, but the learner benefits from tiny exact enumeration/simulation soon after finite probability, then scientific-array/table tooling after basic vectors.

**Repair:** staged coding: primitives → exact enumeration/controlled randomness → scientific Python/data tables → research engineering. Coding supports the mathematics; it does not replace derivation.

### F-009 — MEDIUM — the current required path is broader than a defensible shared first-hire core

Matrix calculus, ODEs, numerical linear algebra, performance engineering, causal inference, formal test theory, state-space models, dynamic programming/MDPs, stochastic optimization, full numerical optimization/autodiff and deep neural nets are valuable, but requiring all of them before a coherent trader/researcher core creates avoidable route bloat.

**Repair:** preserve them as explicit prerequisite-gated optional depth, with achievements retained.

### F-010 — MEDIUM — T22 rich contracts are not yet a full learner lesson/evaluator architecture

Current rich arcs provide strong mission metadata, but Stage A's target requires a learner-facing lesson, independent public task, private reference derivation, transfer task, coding boundary and rubric. T25 provides a useful implementation pattern for this separation.

**Repair:** samples adopt that separation without copying T25 content.

### F-011 — MEDIUM — dependency text is rich but not yet a machine-checkable prerequisite DAG

Many rich `entryPrerequisites` values are free text. They are pedagogically useful but cannot alone prove that every dependency exists and occurs before its dependent unit.

**Repair:** `route.dependencies.json` supplies the proposed Stage A DAG; Stage A checks unique IDs, reference existence and topological order.

### F-012 — MEDIUM — nominal hour/count targets can become false precision

The 596-arc / 2384-hour bookkeeping total describes the current decomposition. It should not be treated as a sacred target for the rebuild.

**Repair:** size v3 units by coherent capability and mastery evidence; preserve old totals only as historical metadata.

### F-014 — MEDIUM — deterministic dynamic programming (`ARC211`) disappeared from the first route proposal

The first proposal omitted `ARC211` entirely while retaining `ARC590` Markov decision processes. The existing `ARC590` route/rich contract depends on deterministic DP concepts, and `ARC211` itself is a substantial existing achievement with state design, optimal substructure, Bellman recurrences, backward induction, memoization and tabulation.

**Repair:** retain `ARC211` as optional depth and restore `ARC211` as an explicit prerequisite of optional `ARC590`. No existing achievement is retired or erased.

### F-015 — MEDIUM — the `ARC515` split initially lacked an explicit home for all research-programming obligations

The existing `ARC515` contains eleven atomic themes: scalar/control-flow reasoning, functions, containers, NumPy shape/indexing, broadcasting, vectorization, controlled randomness, pandas tables, diagnostic plotting, debugging/tests and an end-to-end reproducible mini project. Splitting it only into `C00/C01/C02` made debugging/tests and the build specification's version-control/complexity requirement too implicit.

**Repair:** use four staged capabilities:
- `C00`: Python primitives, functions and core containers;
- `C01`: exact enumeration, explicit RNG state and simulation checks;
- `C02`: NumPy arrays/shape/broadcasting/vectorization, pandas tables and plotting;
- `C03`: debugging, assertions/tests, Git/version-control basics, small complexity audits and a clean reproducible mini-project.

`ARC509` later deepens provenance, falsification and research reproducibility. `ARC717` remains optional depth for interview algorithms rather than being the first place complexity appears.

### F-016 — MEDIUM — some reused rich modules require deliberate prerequisite retargeting, not silent relabeling

Examples include `ARC558`, whose current rich contract names `ARC553` market vocabulary, and `ARC559`, whose current route depends on `ARC713` performance-aware computing. The proposed core uses the new `MKT00` bridge for basic market vocabulary and does not make performance engineering universal.

**Repair:** treat these as materially adapted v3 obligations unless Stage B proves exact task-level equivalence. Do not copy old clearance automatically. Astra should specifically challenge whether `MKT00 + ARC714 + R00` is enough for the revised core microstructure entry.

## Positive findings to preserve

### P-001 — strong authored content already exists

The rich v3 syllabus contains detailed boundaries, obstacles, transfer scopes and mastery requirements. Reuse is preferable to wholesale deletion.

### P-002 — late finance modules contain realistic failure modes

Market-data chronology, survivorship/revision bias, adverse selection, queue uncertainty, transaction costs and adversarial backtest review are already represented. The rebuild should preserve these strengths.

### P-003 — T25 demonstrates useful assessment separation

T25's authored lesson/main/reference/transfer pattern is a useful implementation precedent for independent evidence. It should be copied as an architectural idea, not as T22 curriculum content or learner state.

## Architecture conclusion for Astra

The current T22 is best understood as a **large advanced-content library with a route and evidence layer designed for a stronger entrant**. Stage A proposes a versioned route overlay rather than destructive rewriting. The main review questions are prerequisite order, the four-stage programming split, core-vs-optional scope (especially numerical optimization), early trader/researcher practice, intentional prerequisite retargeting for market modules, and evidence migration safety.
