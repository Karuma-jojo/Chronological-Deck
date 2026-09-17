# T22 Stage A Architecture Findings

Status: audit findings for architecture review, not a claim that every existing atomic arc has been individually verified.

Audit base commit: `2b2d595b7eba84455f3225a545a96835d5d428fc`

## Blocking findings

### F-001 — BLOCKER — the live entry contract assumes the very foundations the rebuild is meant to teach

`js/data/t22-quant-research.js` admits the learner only after assuming arithmetic, algebraic manipulation, elementary functions and ordinary deductive reasoning. A learner arriving from uncertain school mathematics therefore has no explicit bridge into T22.

**Repair:** add a diagnostic/readiness gate followed by explicit numeracy, algebra, functions, exponents/sequences and proof-habit foundations before university-level analysis.

### F-002 — BLOCKER — current atomic IDs are positional, so route reordering can silently corrupt evidence meaning

`js/data/t22-atomic-arcs.js` generates `T22-Mxx-Axx` from each parent module's position in the route. If module 17 moves to module 9, an existing checkmark keyed only by the positional string can be reinterpreted as mastery of a different obligation.

**Repair:** freeze v2 evidence as historical and introduce a v3 identity that is parent-keyed and obligation-versioned. Route position must never be part of evidence identity.

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

## Medium-severity findings

### F-008 — MEDIUM — programming is too concentrated rather than progressively integrated

The current macro route places a large Python/software module after twelve math modules. Later modules use code well, but the learner would benefit from tiny exact enumeration/simulation soon after finite probability, then scientific-array/table tooling after basic vectors.

**Repair:** staged coding: primitives → exact enumeration/simulation → scientific Python/data tables. Coding supports the mathematics; it does not replace derivation.

### F-009 — MEDIUM — the current required path is broader than a defensible first-hire core

Matrix calculus, ODEs, numerical linear algebra, performance engineering, causal inference, formal test theory, state-space models, MDPs and deep neural nets are all valuable. Requiring all of them before the learner can claim a coherent quant-trader/researcher core creates avoidable route bloat.

**Repair:** preserve these modules as explicit optional depth branches, each with prerequisites and retained achievements.

### F-010 — MEDIUM — T22 rich contracts are not yet a full learner lesson/evaluator architecture

Current rich arcs provide excellent mission metadata, but Stage A's target requires a clear learner-facing lesson, independent public task, private reference derivation, transfer task, coding boundary and rubric. T25 provides a useful implementation pattern for this separation.

**Repair:** samples adopt that separation without copying T25 content.

### F-011 — MEDIUM — dependency text is rich but not yet a machine-checkable prerequisite DAG

Many rich `entryPrerequisites` values are free text. They are pedagogically useful but cannot alone prove that every dependency exists and occurs before its dependent unit.

**Repair:** add `route.dependencies.json` as a proposed Stage A DAG; validate missing references and cycles independently.

### F-012 — MEDIUM — nominal hour/count targets can become false precision

The 596-arc / 2384-hour bookkeeping total describes the current decomposition. It should not be treated as a sacred target for the rebuild.

**Repair:** size v3 units by coherent capability and mastery evidence; preserve old totals only as historical metadata.

## Positive findings to preserve

### P-001 — strong authored content already exists

The rich v3 syllabus contains detailed boundaries, obstacles, transfer scopes and mastery requirements. Reuse is preferable to wholesale deletion.

### P-002 — late finance modules contain realistic failure modes

Market-data chronology, survivorship/revision bias, adverse selection, queue uncertainty, transaction costs and adversarial backtest review are already represented. The rebuild should preserve these strengths.

### P-003 — T25 demonstrates useful assessment separation

T25's authored lesson/main/reference/transfer pattern is a useful implementation precedent for independent evidence. It should be copied as an architectural idea, not as T22 curriculum content or learner state.

## Architecture conclusion for Astra

The current T22 is best understood as a **large advanced-content library with a route and evidence layer that were designed for a stronger entrant**. Stage A therefore proposes a versioned route overlay rather than destructive rewriting. The key review questions are prerequisite order, core-vs-optional scope, early trader/researcher practice and evidence migration safety.
