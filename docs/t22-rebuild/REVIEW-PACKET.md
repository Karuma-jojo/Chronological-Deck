# T22 Stage A — Astra Architecture Review Packet

Stage: **A complete; stop here for Astra architecture review**
Repository: `Karuma-jojo/Chronological-Deck`
Branch: `codex/t22-pedagogical-rebuild`
Architecture checkpoint to audit: `c7c66737b84b7951973c31d40c6895a3bdb9d94b`
Scaffold/audit base: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Date: 2026-09-17

This packet is a review handoff, not approval of the architecture. Astra should independently inspect the recorded checkpoint and produce `ASTRA-FINDINGS.md` under the contract in `ASTRA-AUDIT.md` before any bulk v3 authoring or runtime migration begins.

## 1. Files in the architecture checkpoint

Stage A deliverables at `c7c66737b84b7951973c31d40c6895a3bdb9d94b`:

- `docs/t22-rebuild/INVENTORY.md`
- `docs/t22-rebuild/FINDINGS.md`
- `docs/t22-rebuild/SOURCE-MAP.md`
- `docs/t22-rebuild/ROUTE.md`
- `docs/t22-rebuild/route.dependencies.json`
- `docs/t22-rebuild/MIGRATION.md`
- `docs/t22-rebuild/samples/T22V3-F01-percentages-units.md`
- `docs/t22-rebuild/samples/T22V3-T00-finite-trading-decision.md`
- `docs/t22-rebuild/samples/T22V3-R00-temporal-validation.md`

Review context already present on the branch:

- `docs/t22-rebuild/START-HERE.md`
- `docs/t22-rebuild/SOL-BUILD-SPEC.md`
- `docs/t22-rebuild/ASTRA-AUDIT.md`
- `docs/t22-rebuild/RUN-LOG.md` (updated in the handoff/meta checkpoint containing this packet)

## 2. Boundary verification

A compare from scaffold base `2b2d595b7eba84455f3225a545a96835d5d428fc` to architecture checkpoint `c7c66737b84b7951973c31d40c6895a3bdb9d94b` reports **5 commits ahead, 0 behind** and changes only under `docs/t22-rebuild/`.

No runtime route file, T22 learner-progress authority, T25 file, deployment surface, cloud schema or published site was changed in Stage A.

This is intentional. The proposal remains an architecture overlay until Astra accepts or repairs the route/evidence model.

## 3. Proposed route in one paragraph

The repaired Stage A proposal has **56 default/core capabilities and 17 optional depth capabilities (73 total graph nodes)**. It starts with numeracy/algebra/functions/proof habits, moves quickly into finite probability and a genuine payoff/EV trading-decision lab, introduces programming in four earned layers, then builds calculus/linear algebra, inference/validation/time series, temporal market-data discipline and microstructure, followed by optimization/statistical learning/asset pricing/portfolio/execution and an adversarial empirical capstone.

Advanced material remains addressable rather than deleted. The optional set includes matrix calculus, ODEs, algorithms, numerical linear algebra, performance engineering, causal/experimental depth, formal likelihood theory, state-space models, Markov chains/processes, deterministic DP/MDPs, stochastic optimization, full numerical optimization/autodiff and neural networks.

## 4. Important Stage A decisions Astra should challenge

### D-01 — Improve T22; do not create T26

The rebuild remains T22. Existing v2 records are frozen as historical evidence; v3 introduces a new versioned evidence namespace rather than rewriting old positional checkmarks.

### D-02 — Weak-entry foundations are core

The current live T22 assumes arithmetic/algebra/functions/deductive reasoning at admission. The proposed v3 teaches and diagnoses those capabilities explicitly before derivative-level content.

### D-03 — Real trading judgment appears early

`P00 → ARC048 → T00` puts finite probability/expectation and payoff decisions near the beginning. The first trading sample is deliberately finite and cost-aware; it does not require Bayes, calculus, simulation or advanced finance.

### D-04 — Current `ARC515` is split, not discarded

The current eleven-theme programming/research module is mapped across:

- `C00`: scalar Python, control flow, functions, core containers;
- `C01`: exact enumeration, controlled RNG and simulation checks;
- `C02`: NumPy shape/broadcasting/vectorization, pandas tables/alignment and plotting;
- `C03`: debugging, assertions/tests, Git/version-control basics, simple complexity audits and a clean rerunnable mini-project.

Old `ARC515` evidence remains historical. No old macro checkmark automatically clears all four v3 capabilities.

### D-05 — `ARC211` is restored as optional depth

The first draft accidentally dropped deterministic dynamic programming while keeping MDPs. The repaired graph preserves `ARC211` and restores `ARC211 + ARC524 + ARC514 → ARC590`.

### D-06 — full existing `ARC586` is optional under its real prerequisites

The current rich `ARC586` teaches Newton/quasi-Newton methods, conditioning, computational graphs, forward/reverse autodiff and gradient checking, and explicitly assumes `ARC582`, `ARC585`, `ARC711` and `ARC514`. Stage A therefore does **not** pretend it can remain core under a much lighter entry contract.

The core still contains optimization formulation, convexity, KKT, statistical learning/model selection and execution optimization. Astra should decide whether a smaller new numerical-solver bridge is needed in the shared core.

### D-07 — early market vocabulary is separated from no-arbitrage pricing

`MKT00` owns prices/payoffs/returns/bid-ask/basic order vocabulary. The proposed v3 adaptation of `ARC558` therefore enters from `MKT00 + ARC714 + R00 + sampling` instead of requiring the full `ARC553` asset-pricing module first.

This is a **material prerequisite/content-boundary change**, not exact reuse. Old child evidence must not auto-transfer unless equivalence is proven.

### D-08 — research validation is a prerequisite, not an epilogue

Sampling, uncertainty, multiple testing, leakage/baselines, reproducibility, time series and a dedicated temporal-validation firewall appear before the market-data/execution/capstone claims that depend on them.

## 5. Migration/evidence proposal

Proposed stable v3 evidence identity:

`T22V3::<stable-parent-id>::<stable-local-obligation-id>@<obligation-version>`

Semantic rules:

- route position never determines mastery identity;
- old v2 progress is never overwritten;
- reorder-only inheritance requires explicit exact-equivalence mapping;
- materially changed tasks or transfers receive a new obligation/version and do not inherit clearance;
- split modules never blanket-clear all new children from one old macro state;
- newly extracted bridges are new obligations unless exact equivalence is proved;
- optionalizing an existing module does not delete or downgrade historical completion.

See `MIGRATION.md` for the `ARC515` split ledger and adapted-module classes.

## 6. Three complete architecture samples

### Sample A — `T22V3-F01`

File: `samples/T22V3-F01-percentages-units.md`

Tests the lowest end of the route: percentages, changing bases, percentage points, units and estimation. Contains learner teaching, an independent main task, private derivation, transfer, rubric, coding boundary and validation evidence.

Independent arithmetic recheck during Stage A completion:

- `24000 × 1.125 × 0.875 = 23625`;
- fee `24000 × 0.004 = 96`;
- final `23529`;
- net change `−1.9625%`;
- transfer fall `p = 12.5%`, net change from original `+5%`.

### Sample B — `T22V3-T00`

File: `samples/T22V3-T00-finite-trading-decision.md`

Tests the early trader decision layer: gross/net EV, probability of loss, worst modeled loss, break-even cost and objective-conditional choice. It explicitly avoids treating expected-value maximization as a universal risk preference.

Independent arithmetic recheck:

- Trade A gross EV `0.95`, net EV `0.65`, loss probability `0.20`, worst net `−6.30`, break-even fixed cost `0.95`;
- Trade B gross EV `0.925`, net EV `0.775`, loss probability `0.35`, worst net `−2.15`, break-even fixed cost `0.925`;
- shared-state transfer net payoff `1.60` in both stated states, so net EV `1.60` and loss probability `0`.

### Sample C — `T22V3-R00`

File: `samples/T22V3-R00-temporal-validation.md`

Tests the advanced research-safety layer: forward-label overlap, train-only transforms, point-in-time data vintages and causal temporal joins. Direct prerequisites are `ARC508`, `ARC542`, `C03` and `MKT00`.

Independent numerical recheck:

- training mean `13`;
- population variance `5`;
- population SD `√5 ≈ 2.2360679`;
- earliest test after train rows `1–4` with a 3-step forward label is decision row `8`; gap rows are `5,6,7`;
- `z_8 = 89/√5 ≈ 39.80201`;
- `z_9 = 91/√5 ≈ 40.69644`.

The pandas documentation was also rechecked: backward `merge_asof` selects the last right key `<=` the left key, while nearest chooses the closest key and can therefore select a future observation.

## 7. Dependency validation performed in Stage A

The proposed machine graph was independently checked for:

- 56 core IDs;
- 17 optional IDs;
- 73 total unique IDs;
- every prerequisite resolving to a graph node;
- every declared prerequisite appearing earlier in the declared core+optional topological order;
- no backward dependency edge/cycle under that order;
- 57 of the current 58 T22 macro IDs retained explicitly;
- `ARC515` as the sole current macro intentionally split/replaced;
- `ARC211` restored before `ARC590`;
- `ARC586` advanced prerequisite chain restored.

Manual ancestry traces for all three samples are in `ROUTE.md`.

## 8. Current public-source checks performed

Primary/current sources were rechecked on 2026-09-17:

- Jane Street current Quantitative Researcher role: experiment design, dataset generation, time-series analysis, feature engineering/model building and market-data/model systems work;
- IMC 2027 Graduate Quantitative Trader: analytical problem solving, strategy/algorithm work, fast decisions, programming as a plus, prior market knowledge not required;
- IMC 2027 Graduate Quantitative Researcher: rigorous quantitative methods, custom tools, mathematical models, implementation/deployment and programming;
- Two Sigma Quantitative Research & Data Science: scientific thinking, systematic hypothesis testing and large real-world datasets;
- MIT OCW 18.05 probability/statistics scope;
- MIT OCW 18.06SC linear-algebra scope/order;
- current pandas `merge_asof` semantics;
- current scikit-learn temporal evaluation/leakage guidance.

See `SOURCE-MAP.md` for URLs and limits of inference.

## 9. What was *not* tested or changed

- No browser/UI learner workflow was executed for v3 because v3 is not wired into runtime.
- No v3 progress migration was executed.
- Existing T22 Node/browser validators were not rewritten or claimed as v3 validation; they intentionally encode the current v2 route.
- No live-market profitability, execution quality or capacity was tested or claimed.
- No learner pilot was performed.
- No merge, deployment, cloud-schema change or T25 rebuild occurred.
- Stage A does not certify all existing 596 v2 atomic arcs; it audited the architecture surfaces and dependency-sensitive representative rich modules needed to make the route proposal.

## 10. Specific Astra questions

Astra should answer these explicitly rather than merely saying the route looks reasonable:

1. **Entry:** Is `F00–F06` sufficient and correctly ordered for a learner whose Class 12 mathematics is still developing? Identify any hidden prerequisite in the first 15 nodes.
2. **Probability/trading:** Is `P00 → ARC048 → T00` mathematically sufficient for the first finite trading-decision lab without smuggling in Bayes/calculus/finance assumptions?
3. **Programming:** Does `C00 → C01 → C02 → C03` preserve the essential current `ARC515` obligations while giving a better earned progression? Is Git/testing/basic complexity in `C03` too late, too early or incorrectly scoped?
4. **Numerical optimization:** Is moving full `ARC586` to optional depth correct for the shared trader/researcher core, or should a smaller new solver-literacy capability be core? Do not move the existing full `ARC586` back to core unless its actual prerequisites are satisfied.
5. **Microstructure:** Can the revised `ARC558` legitimately enter from `MKT00 + ARC714 + R00 + ARC503`, or does some no-arbitrage/asset-pricing material from `ARC553` remain a real prerequisite? Give a concrete content dependency, not a title-based judgment.
6. **DP/MDP:** Is restoring optional `ARC211 → ARC590` sufficient, and are either of those actually core for the selected shared target roles?
7. **Inference route:** Check the order `sampling → random variables → estimation → asymptotics → testing/resampling/likelihood/regression → validation`. Flag any hidden calculus/linear-algebra prerequisite in the reused rich modules.
8. **Temporal research:** Independently solve the `R00` main and transfer tasks. Is `C03` a justified direct prerequisite for the session's executable-invariant requirement?
9. **Evidence identity:** Is parent + local obligation + obligation version enough, or should content hashes be authoritative/auxiliary? Should any old macro completion ever auto-map to v3 children?
10. **Adapted reused IDs:** For materially retargeted parents such as proposed `ARC558`, should the parent ID remain with versioned child obligations, or should the whole adapted capability receive a new parent ID?
11. **Core/optional boundary:** Identify any current optional module that is demonstrably required by the selected current role evidence, or any core module that is unjustifiably universal.
12. **Sample schema:** Are the three samples sufficient architectural templates for bulk replication, including public/private boundaries, transfer strength, coding boundaries and rubric semantics?

## 11. Stop condition

**Do not begin bulk Stage B authoring from this packet.**

Astra should now review the architecture checkpoint, write `docs/t22-rebuild/ASTRA-FINDINGS.md`, record the exact reviewed SHA and disposition, commit/push that review on the same branch, and stop unless the workflow explicitly calls for bounded repairs.

No merge or deploy is authorized.
