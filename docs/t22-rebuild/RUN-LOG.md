# T22 rebuild recovery state

Date: 2026-09-18
State: **T22 ELITE M65 MACRO SKELETON WRITTEN — STOP BEFORE ATOMIC AUTHORING**
Branch: `codex/t22-pedagogical-rebuild`
Repository: `Karuma-jojo/Chronological-Deck`
Historical Stage-A architecture checkpoint: `c7c66737b84b7951973c31d40c6895a3bdb9d94b`
Historical Stage-A handoff head: `f3632cd8a326c6acc3658d2c8eba234d5a2db363`
Current enhanced macro-skeleton artifact: `docs/t22-rebuild/M65-SKELETON.md`

## Current decision

The original live T22 has 58 required macro modules and was designed as a first-hire strike path with arithmetic/algebra/functions/reasoning assumed at admission. The new target is broader and deeper: begin around Class-10 mathematics and build toward unusually strong quantitative-trading / quantitative-research capability, with projects and research artifacts threaded through the route.

A new **65-module macro skeleton** has therefore been written before any further atomic authoring.

The design deliberately uses large macro modules as capability families. Each module may later contain many atomic sessions, main/transfer investigations, coding labs, prerequisite bridges, delayed reviews, cumulative challenges and project artifacts. Module count is not a proxy for workload.

## M58 -> M65 structural changes

The enhanced skeleton adds seven net macro capabilities while retaining the substantive ownership of the original 58-module route:

1. `T22E-FND01` — Quantitative Foundations I: numeracy & algebra.
2. `T22E-FND02` — Quantitative Foundations II: functions & precalculus.
3. `T22E-DISC01` — mathematical reasoning & discrete foundations, including the counting/combinatorics prerequisite for finite probability.
4. `T22E-TRD01` — trading games & decisions under uncertainty, absorbing the Stage-A T00/T01 ideas into one substantial macro family.
5. `T22E-MKT01` — Markets 0: prices, returns & trading mechanics.
6. Historical `ARC515` is replaced prospectively by two staged macro capabilities:
   - `T22E-CODE01` — quant programming & simulation foundations;
   - `T22E-CODE02` — scientific computing & research engineering.
   This replacement contributes +1 net macro module.
7. `T22E-TEMP01` — temporal research design & walk-forward validation.

Arithmetic check: 58 - 1 historical broad programming module + 2 replacement programming modules + 3 foundations + 1 trading-decision module + 1 market-basics module + 1 temporal-research module = **65**.

## Placement decisions

- Foundations occupy M01-M03 so no university topic relies on hidden school-math assumptions.
- Finite probability is M04; the first genuine trading-decision family immediately follows at M05.
- Bayes is M06, market mechanics M07, and first code/simulation M08.
- Analysis and linear algebra follow only after the launchpad is owned.
- Scientific-computing/research-engineering depth appears at M21 after the learner has mathematics worth computing with.
- Statistical research occupies M25-M42.
- Temporal validation is M43, before SQL/market-data alignment and dirty-data work at M44-M46.
- Microstructure follows real market-data handling at M47.
- Stochastic-process depth occupies M48-M50.
- Optimization/control/finance occupies M51-M60.
- Statistical learning occupies M61-M64.
- M65 remains the end-to-end empirical strategy research and adversarial-defense capstone.

## Merge audit

No additional macro merge was accepted.

The following candidate pairs remain separate because they have distinct capability/exit standards even under the Pandora-box module model:

- Fisher information/efficiency vs likelihood-ratio/optimal testing;
- causal identification vs experimental design;
- Markov-chain / martingale-stopping depth vs Poisson-renewal / continuous-time-event depth;
- numerical optimization vs stochastic-gradient methods;
- deterministic dynamic programming vs Markov decision processes;
- market microstructure vs execution/TCA.

Large internal scope is not by itself a reason to split or merge a module.

## Project policy

Projects are now explicitly a second axis rather than extra macro modules. The route may repeatedly reopen the same project at higher mathematical/research maturity. Candidate artifacts include a probability casino, tiny market maker, Monte Carlo lab, planted-leakage study, signal/factor research lab, walk-forward time-series study, market-data reconstruction, microstructure study, execution/TCA lab, portfolio robustness study, ML-alpha study, reproduction project, deliberate failure project, independent research project and final thesis/defense.

Exact project gates are deferred until their owning modules are individually designed.

## Historical Stage-A work retained

The earlier Stage-A audit remains useful evidence and is preserved in git history and the existing documentation set:

- `INVENTORY.md`
- `FINDINGS.md`
- `SOURCE-MAP.md`
- `ROUTE.md`
- `route.dependencies.json`
- `MIGRATION.md`
- three Stage-A sample modules
- `REVIEW-PACKET.md`

Those documents describe the previous 56-core + 17-optional proposal and should now be treated as **historical design/audit material**, not the current macro-count decision. The new current macro skeleton is `M65-SKELETON.md`.

## Runtime / learner-state safety

No live T22 runtime route, learner-progress storage, cloud schema, T25 course/evidence, merge target or deployed site was changed by this macro-skeleton step. No progress migration was executed. `ARC515` has not yet been replaced in runtime; the two-code-module split is architectural only until implementation is deliberately authorized.

## Stop boundary

**Stop here. Do not author M01 atomics, rewrite runtime T22, migrate progress, merge or deploy yet.**

The next permitted design action is a bounded dependency/order audit of `M65-SKELETON.md`. After the macro skeleton is accepted/frozen, open **M01 only** and design it to T25-style atomic rigor before touching M02.
