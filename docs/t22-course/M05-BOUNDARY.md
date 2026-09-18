# M05 boundary — Trading Games & Decisions Under Uncertainty

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Stable module ID: `T22E-TRD01`  
Status: **BOUNDARY ACCEPTED FOR M05 AUTHORING ONLY**

## Entry authority

M04 · `ARC048` is independently accepted in `M04-ASTRA-FOLLOWUP.md`, including full-suite run `35368721291` on reviewed head `87ccf3e...`.

Direct macro prerequisite: **M04 only**.

M05 may reuse:

- finite sample spaces, event probabilities, complements, unions/intersections;
- conditional probability and independence;
- repeated finite trials;
- finite expectation and linearity;
- indicators/expected counts;
- algebra, ratios, percentages and elementary finite sums from M01–M03.

## M05 destination

A learner should be able to turn a finite uncertain game into an auditable decision object:

1. separate stake, gross payoff, net payoff and terminal wealth;
2. compute expected net payoff and fair/break-even entry prices;
3. solve break-even probability/payoff conditions;
4. distinguish expected value from probability of loss, typical outcome and guaranteed outcome;
5. aggregate expected payoff across repeated plays without assuming more than linearity requires;
6. track bankroll and running peak, compute drawdown and reason through small finite-horizon ruin trees;
7. compare stake sizes under explicit bankroll/loss constraints without inventing a universal sizing rule;
8. explain why multiplicative wealth paths can matter even when one-play expectation looks attractive;
9. represent explicit risk preferences through finite utility tables / certainty equivalents;
10. reason about statewise dominance, worst-case guarantees and simple adversarial payoff matrices;
11. make rapid quantitative decisions while stating which criterion is being used.

## Frozen 24-session route

S01 payoff-table anatomy: stake, gross payoff, net payoff, terminal wealth  
S02 expected net payoff from finite games  
S03 fair entry fee / fair price  
S04 break-even probability  
S05 break-even payoff and price sensitivity  
S06 probability of gain/loss/zero versus EV  
S07 skewed games: EV versus most-likely outcome  
S08 comparing games on multiple reported metrics without hidden preference claims  
S09 repeated plays and linearity of total expected payoff  
S10 bankroll accounting and wealth paths  
S11 running peaks and drawdown  
S12 finite-horizon ruin by explicit tree/enumeration  
S13 stake size as fraction of bankroll; hard loss constraints  
S14 additive payoff versus multiplicative wealth mechanics  
S15 repeated multiplicative bets: path dependence and recovery arithmetic  
S16 preference is extra structure: same EV, different choices  
S17 expected utility on finite outcomes with supplied utility values  
S18 certainty equivalent and risk premium in finite games  
S19 statewise dominance and dominated choices  
S20 worst-case payoff and maximin guarantee in a finite table  
S21 adversarial 2×2 payoff matrices and best responses  
S22 mixed-strategy expected payoff and indifference in a 2×2 game  
S23 rapid fair-price / break-even / bankroll decision drills  
S24 integrated decision audit: EV, loss probability, drawdown constraint, utility and adversarial sensitivity

## Explicitly out of scope

M05 must **not** own:

- posterior probabilities, Bayes' rule, base-rate updating, likelihood ratios or sequential belief updating — M06;
- prices/returns, long/short P&L, bid/ask, order types, fills or market vocabulary — M07;
- formal random-variable distribution theory, variance/covariance or conditional expectation — M26;
- Kelly criterion, logarithmic-growth optimality or general portfolio optimization;
- dynamic programming, Markov decision processes or infinite-horizon ruin;
- formal game-theoretic minimax theorem / equilibrium existence;
- no-arbitrage, replication or derivative pricing — M54;
- empirical calibration of risk preferences.

## Teaching safeguards

Every session must contain:

- novice-usable explanation before assessment;
- a worked example with distinct numbers/surface from both fixed tasks;
- a guided check;
- explicit prerequisite source or JIT bridge for every new symbol/operation;
- no answer-equivalent rehearsal;
- exact distinction between descriptive metrics and preference-dependent decisions.

A learner must never be told that higher EV is automatically “better” without an explicit decision criterion.

## Assessment safeguards

- Two fixed tasks per session: Main + Transfer.
- Five ownership claims per session.
- Every claim maps to the exact fixed task and exact rubric criterion(s) that observe it.
- Cross-task ownership is allowed when semantically necessary; do not force positional Main mappings.
- Every evaluator totals 10 points.
- Fixed-task changes after publication require `obligationVersion` changes.
- Assessment fingerprints and shared evidence provenance remain unchanged.

## Provenance / runtime safeguards

Use the existing evidence key exactly:

`chrono_t22_elite_course_evidence_v1`

Do not add a parallel M05 evidence store. Preserve:

- prompt/evaluator fingerprinting;
- lesson assistance provenance;
- answer-exposure semantics;
- unsaved draft provenance across module switching;
- review attachment to the original attempt;
- export/import coexistence across authored modules;
- corrupt-store preservation.

## Stop boundary

Complete, validate, push and hand off **M05 separately** before opening M06 content.

M06 may open only after the M05 checkpoint is internally verified.

**M07 authoring is forbidden in this pass.**
