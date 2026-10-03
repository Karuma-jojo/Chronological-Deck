# M05 v2 boundary — Trading Games & Decisions Under Uncertainty

Date: 2026-10-03  
Branch: `codex/t22-m05-deep-source-restart`  
Stable module ID: `T22E-TRD01`  
Status: **V2 DEEP-SOURCE BUILDER CANDIDATE — NOT INDEPENDENTLY ACCEPTED**

Authority:

- `M05-DEEP-SOURCE-AUDIT-v1.0.md`
- `M05-V2-DESIGN-GATE.md`
- published M04 v2.1 prerequisite authority
- T22 Module Builder / Adversarial Checker v1.2

The historical Astra M05 remains part of the provenance record. Its prior independent acceptance does not automatically certify this materially reconstructed v2 candidate.

## Entry authority

Direct macro prerequisite: **M04 · ARC048**.

M05 may assume from published M04:

- legal finite probability models;
- event probabilities, complements and finite trees;
- repeated independent finite paths when explicitly stated;
- finite expectation;
- linearity of expectation without independence;
- expectation is not a mode, one-play guarantee or preference rule.

M05 must apply those ideas rather than quietly reclaim their theorem ownership.

## V2 destination

The learner should be able to turn a finite known-probability situation into an auditable decision analysis by separating:

1. what can be chosen;
2. what is exogenous chance;
3. what consequences occur;
4. what wealth/path constraints apply;
5. what preference or decision criterion is actually supplied;
6. whether uncertainty comes from nature or from another strategic chooser.

## Canonical candidate 24-session route

1. Decision anatomy: actions, states/chance, consequences & criterion
2. Money accounting: cost/fee, gross receipt, net payoff & terminal wealth
3. Expected monetary value as a criterion; zero-EMV entry fee
4. One-stage decision trees: decision nodes, chance nodes & rollback
5. Break-even thresholds: probability, payoff or fee
6. Sensitivity & model-input audit
7. Downside profile: loss frequency, magnitude, skew & modal outcome
8. Statewise dominance before probabilities
9. Fixed-horizon repetition: expected total versus realized path
10. Bankroll stock, payoff increments & cumulative P&L
11. Running peaks & drawdown
12. Finite-horizon first-hit ruin
13. Hard bankroll/stake constraints: feasible set, not optimal stake
14. Multiplicative wealth factors & recovery after drawdown
15. Preferences over certain consequences & ordinal representation
16. Lottery preferences: when expected utility is licensed
17. Expected utility versus expected money; risk-neutral money as a special case
18. Certainty equivalent & finite risk premium
19. Decision-criteria audit: dominance, EMV, constraints, maximin & EU
20. Chance states versus strategic opponents: general bimatrix anatomy
21. Pure best responses, dominance & mutual best response
22. Strictly competitive 2×2 games: security levels & pure saddle
23. Mixed strategies in 2×2: expected payoff & indifference
24. Fresh integrated decision audit

## Explicit ownership

M05 v2 owns:

- action–state–consequence decision models;
- gross/cost/net/terminal-wealth accounting;
- expected monetary value when explicitly named as the criterion;
- zero-EMV entry fees and elementary break-even thresholds;
- one-stage decision trees and rollback;
- one-input sensitivity analysis;
- descriptive downside summaries;
- statewise monetary dominance;
- finite repeated-play expected totals as an M04 application;
- realized bankroll paths, running peaks and drawdown;
- small finite-horizon first-hit ruin by explicit enumeration;
- hard stake/bankroll feasibility constraints;
- multiplicative wealth and recovery arithmetic;
- deterministic preference ordering versus lottery-preference structure;
- supplied finite Bernoulli/vNM utility, expected utility, certainty equivalents and finite risk premiums;
- criterion-labelled maximin in finite payoff tables;
- general finite two-player bimatrices and pure best responses;
- explicitly strictly competitive 2×2 security/saddle calculations;
- elementary 2×2 mixed-strategy indifference calculations.

## Explicit exclusions

M05 v2 must not own:

- Bayes, base-rate inversion, likelihood ratios, posterior updating or value of information — M06;
- market prices, returns, long/short mechanics, bid/ask, orders or fills — M07;
- simulation/programming — M08;
- formal variance/covariance/distribution theory;
- Kelly/log-optimal sizing, portfolio construction or general optimization;
- stochastic dominance as a formal distribution topic;
- dynamic programming, MDPs or infinite-horizon ruin;
- full expected-utility representation-theorem proofs;
- multiattribute utility, prospect theory or a behavioral-decision-theory survey;
- general Nash/minimax existence theorems, repeated/Bayesian games, auctions or mechanism design;
- no-arbitrage, replication or derivative pricing.

## Utility boundary

This boundary is strict.

S15 may represent preferences over **certain outcomes** by ordinal numerical labels. Those labels need only preserve order.

S16 may average utility values only after the problem explicitly supplies/assumes a Bernoulli/vNM-style utility representation of **lottery preferences**. Positive-affine changes preserve expected-utility rankings; arbitrary increasing relabelings need not.

M05 does not prove the full representation theorem and does not claim the supplied model describes universal human behavior.

## Strategic-game boundary

A general strategic game is first represented as a bimatrix with one payoff for each player.

The one-number row-payoff / minimizing-column convention is introduced only after the problem explicitly supplies a strictly competitive interpretation.

A strategic opponent is never silently treated as an exogenous chance state.

## Evidence-distance policy

`main` and `transfer` remain stable task slots for runtime compatibility. They are not prestige labels.

The candidate evidence ledger currently classifies:

- one fresh Main: S24-M;
- four changed-surface Transfers: S04-T, S16-T, S22-T, S24-T;
- derivation/reasoning-reconstruction Mains where applicable;
- the remaining tasks honestly as retrieval.

Changed numbers, names or stories alone never establish transfer.

## Provenance policy

The shared store remains exactly:

`chrono_t22_elite_course_evidence_v1`

Stable module/session/task IDs are retained.

Thirty-six materially changed public task contracts are `obligationVersion=3`. Twelve compatible public contracts are preserved at their historical obligation versions. Historical attempts are retained rather than deleted or silently recertified.

Historical answer-bearing and guided-practice exposure records remain in the authoring pack.

## Acceptance policy

This boundary permits builder-side implementation and validation only.

M05 v2 becomes independently accepted only after:

- deterministic mathematical validation;
- structural/pedagogical/semantic/provenance checks;
- actual learner-facing Chromium traversal;
- rendering/mobile checks;
- a frozen exact candidate head;
- a fresh independent adversarial review;
- repair of every justified material finding;
- exact-head independent confirmation.

Do not describe this v2 candidate as accepted merely because the historical Astra M05 was accepted.
