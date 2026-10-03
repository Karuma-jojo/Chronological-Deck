# M05 v2 pre-authoring design gate

Date: 2026-10-03  
Module: **T22E-TRD01 · Trading Games & Decisions Under Uncertainty**  
Authority: `M05-DEEP-SOURCE-AUDIT-v1.0.md`  
Status: **PRE-AUTHORING DESIGN CASE COMPLETE — implementation not yet accepted**

This document converts the source-first audit into a concrete reconstruction contract. It is deliberately independent of the old S01–S24 order.

---

# 1. Architecture decision

## **DEEP BOUNDED RECONSTRUCTION — preserve 24 stable session IDs, regenerate their instructional jobs**

Why this is not merely documentary:

- four missing conceptual/representation atoms must be added;
- four old standalone sessions should be merged/distributed;
- the utility block needs a new prerequisite distinction;
- the game-theory block needs a new model bridge;
- current Transfer evidence is overwhelmingly retrieval and must be relabelled/redesigned.

Why this is not a wholesale module replacement:

- module ID and ownership boundary remain useful;
- 24 sessions is independently regenerated as a reasonable size;
- the bankroll/drawdown/finite-ruin block is strong;
- threshold, dominance, utility, CE and 2×2 indifference remain useful atoms;
- M06/M07 downstream boundaries remain intact.

Stable session IDs `S01@1`–`S24@1` may be retained for historical continuity, but changed public task contracts must receive new obligation versions. Historical attempts remain stale/current according to the existing evidence-store rules; no silent recertification.

---

# 2. Support-theorem / principle ledger

M05 may use these results only at the stated depth.

| Item | M05 status | Prerequisite / source | Required learner meaning | Explicit non-import |
| --- | --- | --- | --- | --- |
| Finite expectation (sum p_i x_i) | prerequisite application | M04 / Ross | probability-weighted monetary average | no re-ownership of expectation theory |
| Linearity of expectation | prerequisite application | M04 / Ross | expected total is sum of expected components without independence | no variance/distribution consequences |
| Zero-EMV condition | derive | algebra + finite expectation | solve an unknown input where monetary expectation is zero | not a market-pricing theorem |
| One-stage decision-tree rollback | derive by local expectation | MIT DA comparators | evaluate chance branches under a stated criterion and compare actions | no value of information / Bayes |
| Statewise dominance | define/derive | finite order comparison | one action is never monetarily worse over common states | no stochastic-dominance theory |
| Running peak / drawdown | define | path arithmetic; CFA/MSCI terminology | decline from prior running maximum | no portfolio-risk optimization |
| Finite first-hit ruin | explicit enumeration | M04 finite paths; Ross comparator | ruin is a path event with stopping/absorption | no gambler-ruin recurrence / infinite horizon |
| Feasible stake inequality | derive | elementary inequalities | hard constraint defines admissible set | no optimum / Kelly |
| Percentage wealth factor (1+r) | derive | elementary algebra | percentage changes act on current wealth | not market return machinery |
| Recovery (g=L/(1-L)) | derive | elementary algebra | changed-base recovery | no asymptotics |
| Ordinal representation of certain preferences | define at elementary level | Osborne Ch.1 | higher numerical label means preferred certain consequence | no cardinal-intensity claim |
| Expected utility on lotteries | conditional model assumption | Osborne Ch.4 / Levin / MIT | average a supplied Bernoulli utility index only when it represents lottery preferences | no universal behavior law |
| Positive-affine invariance of Bernoulli utility | finite derivation | Osborne Appendix 4.12 | (a+bu, b>0), preserves EU ranking; arbitrary increasing transform need not | no full representation-theorem proof |
| Certainty equivalent | define finite-table | Stanford/MIT utility comparators | sure wealth with same supplied utility as lottery EU | no continuous inverse required |
| Finite risk premium (E[W]-CE) | define locally | utility comparator | gap relative to supplied utility model/lottery | no global risk-aversion coefficient |
| Maximin | explicit criterion | Osborne / elementary matrix reasoning | maximize the minimum listed payoff | not universal rationality |
| Best response | define | Osborne / MIT/Yale | best action given other player's action/mix | no iterative rationalizability |
| Pure mutual best response | define narrowly | game-theory comparator | each action is a best response to the other | no existence theorem required |
| Strictly competitive row-payoff reduction | specialize | Osborne Ch.11 | one player's gain ordering is opposed by the other's | not general games |
| Mixed indifference in 2×2 | derive | Osborne/Yale/MIT | opponent mixing can equalize expected payoffs of supported pure actions | no general minimax/Nash theorem |

---

# 3. Narrative spine

The module should feel like one escalating question:

> **“A probability model tells me what can happen. How do I make a disciplined decision without smuggling in a criterion—and what changes when my wealth path matters or another decision-maker is actively responding?”**

Four acts:

1. **Model the decision.**  
   What can I choose? What is chance? What happens in each state? What criterion am I using?

2. **Survive the path.**  
   Positive expectation is not a guarantee; wealth travels through paths, peaks, drawdowns, constraints and possible ruin.

3. **Say what you value.**  
   Probability plus money still does not determine preference. Utility/CE become legitimate only after the preference model is supplied.

4. **Replace chance with an opponent.**  
   Another chooser is not a probability distribution. Best responses, strictly competitive structure and mixed indifference require a different model.

This narrative prevents the title “Trading Games” from becoming premature market mechanics.

---

# 4. Candidate session architecture and ownership claims

Exactly five candidate ownership claims are specified per session to preserve the 120-claim scale. These claims are provisional until public tasks/rubrics are built and adversarially checked.

## S01 — Decision anatomy: actions, states/chance, consequences & criterion

1. Identify the available actions in a finite decision problem.
2. Identify the mutually exclusive chance states/outcomes relevant after an action.
3. Record the consequence/payoff associated with each action–state pair.
4. Distinguish model facts (probabilities/consequences) from a decision criterion.
5. Build an auditable action–state–consequence table from prose.

Representation: decision matrix.

Wrong solver: starts calculating EV without first noticing that two actions use different consequences/states or that no criterion was specified.

Evidence target: Main may be reasoning reconstruction; Transfer candidate should convert prose with a differently organized state description into the matrix.

## S02 — Money accounting: cost/fee, gross receipt, net payoff & terminal wealth

1. Distinguish deterministic entry cost/fee from gross receipt.
2. Compute net payoff state by state.
3. Compute terminal wealth from initial wealth and net payoff.
4. Classify gain/loss/break-even from net payoff.
5. Validate that the finite outcome probabilities are exhaustive before using the table.

Representation: accounting payoff table.

Wrong solver: adds gross receipt directly to starting wealth without subtracting fee.

## S03 — Expected monetary value as a criterion; zero-EMV entry fee

1. Compute EMV of an action from its finite monetary consequences.
2. Compare actions by EMV only when EMV is explicitly the stated criterion.
3. Derive expected net payoff as expected gross receipt minus deterministic fee.
4. Solve the zero-EMV entry fee.
5. State that zero-EMV/“EV-fair” fee is model-relative and not a market-price or universal-preference claim.

Wrong solver: “higher EMV = universally better.”

## S04 — One-stage decision trees and rollback

1. Distinguish decision nodes from chance nodes.
2. Put actions on decision branches and chance outcomes/probabilities on chance branches.
3. Put consequences at terminal leaves without double-counting costs.
4. Roll back a chance node using the explicitly stated monetary criterion.
5. Compare root actions after rollback while preserving the model/criterion distinction.

Representation: decision tree.

Wrong solver: averages across actions as though the decision node were random.

## S05 — Break-even thresholds

1. Write EMV as a function of one unknown probability/payoff/fee.
2. Set the relevant comparison or zero condition correctly.
3. Solve the threshold exactly.
4. verify the threshold is legal in its domain.
5. Interpret which side of the threshold changes the stated EMV comparison.

Wrong solver: changes (p) without changing (1-p) in a binary model.

## S06 — Sensitivity and model-input audit

1. Label each supplied input as probability, payoff/cost, constraint or preference input.
2. Vary one input while holding the others fixed.
3. Compute the resulting EMV or threshold change.
4. Identify which conclusion is robust over a supplied interval.
5. Distinguish sensitivity analysis from Bayesian updating or parameter estimation.

Representation: small sensitivity table / threshold line.

Wrong solver: treats “try (p=.3,.4,.5)” as evidence that posterior probability changed.

## S07 — Downside profile: loss frequency, magnitude, skew & modal outcome

1. Compute probability of gain/loss/zero.
2. Report best and worst one-play monetary outcomes.
3. Identify the most-likely payoff when defined by the finite model.
4. Compute EMV and explain how rare large outcomes contribute.
5. Explain why win rate, loss probability, worst loss, mode and EMV are different summaries.

Wrong solvers: high win rate implies positive EMV; EMV is “typical next result.”

## S08 — Statewise dominance before probabilities

1. Represent alternatives as payoff vectors over common states.
2. Test statewise weak dominance.
3. Identify dominated choices.
4. Explain why probabilities are unnecessary for the dominance comparison.
5. Recognize crossing payoff vectors where dominance does not decide.

Wrong solver: invents equal state probabilities to decide a dominance question.

## S09 — Fixed-horizon repetition: expected total versus realized path

1. Express total net payoff as a finite sum of play-level payoffs.
2. Apply M04 linearity to compute expected total.
3. State that independence is not required for this expectation identity.
4. Use (nmu) only when the play-level expectations are genuinely equal.
5. Distinguish expected total from a realized total or guarantee.

Wrong solver: refuses to add expectations because dependence is unspecified.

## S10 — Bankroll stock, payoff increments & cumulative P&L

1. Update bankroll recursively under realized net payoffs.
2. Build the full wealth path including time 0.
3. Compute cumulative P&L from initial wealth.
4. Reconcile final wealth with initial wealth plus cumulative P&L.
5. Distinguish wealth stock from payoff/P&L increment.

Wrong solver: treats a wealth level as if it were that period's payoff.

## S11 — Running peak and drawdown

1. Compute the running peak at each time.
2. Compute drawdown amount from the running peak.
3. Compute drawdown percentage using the running-peak denominator.
4. Identify maximum drawdown over a finite path.
5. Distinguish drawdown from loss relative to initial wealth.

Representation: wealth/peak/drawdown table.

Wrong solver: denominator is starting wealth rather than running peak.

## S12 — Finite-horizon first-hit ruin

1. Define ruin as the first hit of a stated boundary within a finite horizon.
2. Apply stopping/absorption after ruin.
3. Enumerate complete paths or disjoint first-hit prefixes under an explicit probability model.
4. Sum ruin probability without double-counting continuations of an already-ruined prefix.
5. Reject endpoint-only reasoning when a path can hit ruin and hypothetically recover.

Representation: probability tree → first-hit prefix ledger.

Wrong solver: only checks final unstopped bankroll.

## S13 — Hard bankroll/stake feasibility constraints

1. Express a stake as a fraction of current bankroll.
2. Compute worst one-step loss under the stated payoff rule.
3. Translate a hard loss cap into an inequality.
4. identify the feasible stake interval/set.
5. Explain why a feasible set does not supply an optimal stake.

Representation: inequality / feasible interval.

Wrong solver: maximizes stake merely because EMV is positive and linear in stake.

## S14 — Multiplicative wealth factors and recovery

1. Convert a percentage wealth change to a multiplicative factor.
2. Chain successive percentage changes on current wealth.
3. Contrast additive dollar changes with multiplicative percentage changes.
4. Derive (g=L/(1-L)) for recovery from a fractional loss (0le L<1).
5. Explain changed-base asymmetry and the total-loss boundary.

Representation: wealth-factor chain.

Wrong solver: (+q%) cancels (-q%).

## S15 — Preferences over certain consequences; ordinal payoff representation

1. Distinguish a person's preference ordering from the probability model.
2. Represent a finite ordering of certain outcomes with numerical payoff/utility labels.
3. Explain that these deterministic labels need only preserve order, not preference intensity.
4. Recognize that many increasing relabelings can represent the same ordering of certain outcomes.
5. State that the deterministic ranking alone does not determine preferences among lotteries.

Representation: ordered outcome list / deterministic preference table.

Wrong solver: reads a label gap of 100 as “100 times stronger preference.”

## S16 — Lottery preferences and when expected utility is licensed

1. Explain why preferences among certain outcomes do not by themselves determine preferences among lotteries.
2. Treat a supplied Bernoulli/vNM-style utility index as additional lottery-preference structure.
3. Compute expected utility of a finite lottery under that supplied representation.
4. Show that positive-affine rescaling preserves expected-utility rankings.
5. Produce/diagnose an arbitrary increasing relabeling that preserves deterministic order but need not preserve lottery ranking.

Representation: lottery + utility table.

Wrong solver: “any increasing transform is safe before averaging utility.”

## S17 — Expected utility versus expected money; risk-neutral special case

1. Compute expected monetary wealth/payoff.
2. Compute expected utility from the supplied Bernoulli utility representation.
3. Compare alternatives under the explicitly stated expected-utility criterion.
4. Explain that risk-neutral monetary choice is the special case where the relevant utility is affine in money.
5. Avoid treating one supplied utility table as universal or empirically estimated.

Wrong solver: replaces utility values with dollar outcomes when ranking by EU.

## S18 — Certainty equivalent and finite risk premium

1. Compute expected utility of a finite lottery.
2. Identify a certainty-equivalent sure wealth from a supplied utility table.
3. Compute expected monetary wealth separately.
4. Compute the finite premium (E[W]-CE).
5. Interpret the sign/size only relative to the supplied lottery-preference model and lottery.

Representation: utility table + indifference row.

Wrong solver: sets CE equal to expected wealth by definition.

## S19 — Decision-criteria audit

1. Apply statewise dominance before using an optional criterion.
2. Apply EMV when probabilities and the monetary-EMV criterion are supplied.
3. Apply a hard feasibility constraint independently of preference ranking.
4. Apply maximin only when explicitly specified as the criterion.
5. Apply expected utility only when a valid/supplied lottery-utility representation is given, and report disagreements without declaring a universal winner.

Representation: criterion comparison table.

Wrong solver: silently chooses the criterion that gives the numerically largest-looking answer.

## S20 — Chance states versus strategic opponents; general bimatrix anatomy

1. Explain the difference between an exogenous chance state and another chooser's action.
2. Identify players and available actions in a 2-player finite strategic game.
3. Read a bimatrix with one payoff for each player in every joint-action cell.
4. State whose preference each payoff component represents.
5. Avoid assuming that one player's gain is the other player's loss unless strict competition/zero-sum structure is supplied.

Representation: bimatrix with ordered payoff pairs.

Wrong solver: minimizes player 1's payoff to infer player 2's action without looking at player 2's payoffs.

## S21 — Pure best responses, dominance and mutual best response

1. Find each player's best response to each pure action of the other player.
2. Identify a strictly/weakly dominant or dominated action in a small supplied game where appropriate.
3. Mark best responses on the bimatrix.
4. Identify a pure mutual-best-response cell if one exists.
5. State the narrow scope of the conclusion without invoking equilibrium existence or repeated-game claims.

Representation: best-response annotated bimatrix.

Wrong solver: finds a cell with highest total payoff and calls it the strategic solution.

## S22 — Strictly competitive 2×2 games: security and saddle

1. Verify/accept the supplied strictly competitive interpretation before reducing to one row-payoff matrix.
2. Compute the row player's minimum payoff for each row and maximin security level.
3. Compute the column player's maximum row payoff for each column and minimax bound.
4. Identify a pure saddle when the corresponding cell is simultaneously row-max-in-column / column-min-in-row.
5. Explain that this finite pure-saddle analysis is not a proof of a general minimax theorem.

Representation: one-number row-payoff matrix only after the strict-competition gate.

Wrong solver: applies “column minimizes row” to an arbitrary bimatrix.

## S23 — Mixed strategies: expected payoff and indifference

1. Write a pure action's expected payoff against an opponent's stated mixing probability.
2. Solve the opponent mixing probability that makes two pure actions indifferent.
3. Compute the common expected payoff at indifference.
4. Solve the reciprocal mixing condition in a 2×2 strictly competitive case when requested.
5. State that elementary indifference algebra does not itself prove existence/uniqueness of a general equilibrium.

Representation: expected-payoff equations; optional line plot only if it aids reasoning.

Wrong solver: assumes the mixing probability is (1/2) because there are two actions.

## S24 — Fresh integrated decision audit

1. Classify a fresh situation as chance decision, path-dependent bankroll problem, strategic game, or a clearly separated combination.
2. Choose/build an appropriate auditable representation rather than receiving it by instruction.
3. Compute the finite quantities actually needed by the supplied criterion/constraint.
4. Identify at least one invalid inference caused by importing the wrong model/criterion.
5. Produce a concise criterion-labelled conclusion with scope/boundary statement.

Freshness requirement: the S24 lesson's worked synthesis must use a mathematically different combination of representations/decisions from the fixed Main.

---

# 5. Retrieval/interleaving plan

Old S23's useful function is retained **without** consuming a concept-owning session.

Add short retrieval strips approximately at:

- start S05: accounting + zero-EMV;
- start S09: EMV/downside/dominance;
- start S13: wealth path + drawdown;
- start S15: percentage recovery + hard constraint;
- start S19: EMV + utility + CE;
- start S22: best responses / dominance;
- S24 warm-up: one problem each from monetary decision, path risk and strategic game.

Retrieval strips are not counted as fresh evidence.

---

# 6. Evidence-distance design targets

Do **not** set quotas. The design aims for honest evidence, not many green labels.

Likely evidence classes:

- most early Mains: retrieval or reasoning reconstruction;
- derivation Mains (threshold/recovery/affine-invariance): proof/reasoning reconstruction;
- selected Transfers may become changed-surface only when they change the mathematical action, e.g.:
  - table → construct decision tree;
  - complete path list → first-hit prefix repair;
  - deterministic ordinal relabeling → diagnose invalid lottery averaging;
  - general bimatrix → reject illegal zero-sum reduction;
  - pure strategic analysis → choose whether mixing/indifference is needed;
- S24-M is the natural candidate for the module's canonical fresh synthesis.

Every fresh/changed-surface claim must answer:

1. What exact mathematical decision is new?
2. Does the public prompt supply that decision?
3. Did visible instruction already rehearse it?
4. Would a mechanical copier of the lesson succeed?

If the answer fails, label retrieval/reconstruction.

---

# 7. Assessment-version policy

Because the route changes materially, many existing fixed tasks will need new public contracts.

Rules:

- retain stable module/session IDs;
- retain historical task IDs where the runtime contract requires them, but increment `obligationVersion` for materially changed public obligations;
- do not overwrite history;
- preserve prior lesson-answer exposure records;
- recalculate fingerprints;
- current mastery excludes stale contracts according to existing runtime policy;
- evaluator changes that alter obligations travel with the new obligation version.

A final change ledger must list every Sxx-M/Sxx-T whose public obligation changed.

---

# 8. Validation contract for implementation

Before independent review:

1. deterministic math oracle for all 48 fixed references;
2. structural checks for 24 sessions / task and claim wiring;
3. source/boundary assertions;
4. evidence-distance ledger shape and mutation tests;
5. wrong-solver mutation tests for the targeted misconceptions;
6. semantic-separation checks beyond literal-fragment absence;
7. complete claim → public request → exact rubric observer checks;
8. representation-delivery checks;
9. actual Chromium walk of all lessons, staged guided feedback and all 48 Main/Transfer/reference/rubric surfaces;
10. save → reveal → export → import → reload;
11. mobile overflow/render checks;
12. full inherited T22 workflow.

Builder green is not acceptance. Freeze an exact implementation head and run an independent adversarial review.

---

# 9. Pre-authoring verdict

The source-led design **does not reproduce the old M05 route**. Therefore the old route cannot be treated as canonical and merely polished.

The design does, however, reproduce the same broad module mission and an approximately 24-session footprint. The justified action is:

> **deep bounded reconstruction with stable identity and provenance, not structural demolition and not documentary retrofit.**

The next repository change may edit `course/t22/authoring/m05.json` against this design contract.
