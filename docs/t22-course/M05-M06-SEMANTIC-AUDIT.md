# M05–M06 semantic repair audit

Date: 2026-09-23. Baseline: `bd0b54f71524b831ec264d9fcae1afb3d2dfd7dc`.

Scope: 48 lessons, 96 public task/evaluator pairs, 240 claim links. This is the principal builder’s manual review record, not a new independent acceptance. Source snapshots are pinned by `m05-m06-reviewed-contracts.json`; a matching hash prevents unreviewed drift but does not prove pedagogy.

All scoring rows were compared with the public request. Computation rows accept equivalent valid calculation routes. Negative accuracy/scope guards do not require unasked disclaimers. Corrections to positive explanation obligations are explicit in the prompts. Earlier mathematical principles, symbolic derivations and lone repeated simple answers are reusable; the prohibited overlap is the same fixed exercise/model or decisive worked subexercise. Historical solved overlaps are handled separately from offered unsolved practice.

## M05 S01 — Payoff-table anatomy: stake, gross payoff, net payoff & terminal wealth

Instruction uses fees3/2 and starting wealth20/30; Main uses fee4/start40, Transfer fee5/start60. Full payoff accounting, not a reused result.

**Main public request (obligation v1):** A game costs 4 to enter. Gross payoffs are 15 with probability .25, 5 with probability .50, and 0 with probability .25. From initial wealth 40, build a complete probability/gross/net/terminal-wealth table, verify the probabilities, and classify each outcome as gain, loss or break-even.

**Transfer public request (obligation v1):** A ticket costs 5. It pays gross 18 with probability .20, gross 7 with probability .30 and gross 2 with probability .50. Starting from wealth 60, construct the full payoff table, verify normalization and classify the net outcomes.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Validate the outcome probabilities of a finite game. | main 1 | Probabilities are checked and sum to 1. |
| Distinguish gross payoff from net payoff after an entry stake. | main 2 | Gross and net payoffs are distinguished; net values 11,1,−4 are correct. |
| Compute terminal wealth from initial wealth and net payoff. | main 3 | Terminal wealth values 51,41,36 are correct. |
| Identify gain, loss and break-even outcomes from net payoff. | main 4 | Gain/loss/break-even classifications are correct. |
| Represent the game in a complete finite payoff table. | main 5 | A complete table links each probability to gross, net and terminal wealth. |

## M05 S02 — Expected net payoff from a finite game

Instruction has +6/−2 at .3/.7 and a three-state +4/+1/−3 check; tasks use +9/+2/−5 and +7/+1/−4. Claims1–3 map to setup, value and normalization in that semantic order.

**Main public request (obligation v1):** A finite game has net payoffs +9 with probability .20, +2 with probability .50 and −5 with probability .30. Verify the states are exhaustive, write the expectation, compute it, interpret its sign, and explain what the answer does not guarantee about one play.

**Transfer public request (obligation v2):** A game has net +7 with probability .25, net +1 with probability .35 and net −4 with probability .40. Compute and interpret its expected net payoff, including an explicit one-play caveat. Verify the probability weights before computing.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write expected net payoff as a probability-weighted sum. | main 2 | Expectation is written as .20(9)+.50(2)+.30(−5). |
| Compute expected net payoff exactly for a finite game. | main 3 | Expected net payoff 1.3 is computed correctly. |
| Check that all payoff states included in the expectation are exhaustive. | main 1 | The three payoff states are verified exhaustive by probability sum 1. |
| Interpret positive, zero or negative expected net payoff correctly. | main 4 | Positive EV is interpreted as a model-based probability-weighted average gain. |
| Explain why expected value is not a guaranteed one-play result. | main 5 | The answer explicitly rejects treating 1.3 as a guaranteed one-play payoff. |

## M05 S03 — Fair entry fee & fair price

Instruction gross12/4/0 and10/2 differs from task tables20/8/2 and9/3/0. Fair-fee definition and solving share row3; quoted-fee evaluation is row4, with criterion scope in row5.

**Main public request (obligation v1):** A game pays gross 20 with probability .10, gross 8 with probability .40 and gross 2 with probability .50. Compute expected gross payoff, write expected net payoff at fee f, find the EV-fair entry fee, evaluate EV at quoted fee 7, and state what 'fair' means here.

**Transfer public request (obligation v2):** A game pays gross 9 with probability .30, gross 3 with probability .50 and 0 otherwise. Find its EV-fair fee and the expected net payoff if the actual fee is 5.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute expected gross payoff of a finite game. | main 1 | Expected gross payoff 6.2 is correct. |
| Express expected net payoff as expected gross payoff minus entry fee. | main 2 | Expected net payoff is written 6.2−f. |
| Define a fair entry fee by the zero-EV condition. | main 3,5 | Fair fee f=6.2 follows from zero EV. / The narrow EV meaning of 'fair' is stated without a preference/market claim. |
| Solve the fair fee exactly. | main 3 | Fair fee f=6.2 follows from zero EV. |
| Evaluate whether a quoted fee gives positive, zero or negative EV without calling it universally desirable. | main 4,5 | At fee7, EV=−0.8 is correct. / The narrow EV meaning of 'fair' is stated without a preference/market claim. |

## M05 S04 — Break-even success probability

Taught +9/−3 and guided +6/−2 share a threshold with Main +12/−4, but do not disclose its full EV function or EV at .35. Transfer +5/−2 changes the ratio; threshold range is explicitly requested.

**Main public request (obligation v2):** A binary game pays net +12 on success and −4 on failure. Write EV as a function of success probability p, solve the break-even p, verify it is a valid probability, and compute EV if p=.35. Interpret the sign of that EV.

**Transfer public request (obligation v2):** A binary game pays +5 on success and −2 on failure. Find its break-even success probability and compute EV at p=.40. Check that the threshold is a valid probability.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write the binary expected-payoff equation in terms of success probability p. | main 1 | EV is written as 12p−4(1−p) or equivalent. |
| Set expected payoff to zero for break-even. | main 2 | The zero-EV equation is set correctly. |
| Solve the break-even probability exactly. | main 3 | Break-even p=.25 is solved exactly. |
| Check the threshold lies in [0,1]. | main 4 | The threshold is checked as a valid probability. |
| Evaluate EV at a probability above or below the threshold. | main 5 | EV at p=.35 is 1.6 and its sign is interpreted correctly. |

## M05 S05 — Break-even payoff & price sensitivity

Instruction fee5,p=.25 and guided fee3,p=.6 differ from Main fee6,p=.4 and Transfer fee4,p=.25. Probability/price distinction is observable in the held-fixed input and fee sensitivity.

**Main public request (obligation v1):** A game charges fee 6. With probability .40 it pays gross prize x and otherwise pays gross 0. Write expected net payoff, solve the break-even prize x, compute EV if x=18, state the effect of raising the fee from 6 to 7, and identify which inputs are probability assumptions versus payoff/price assumptions.

**Transfer public request (obligation v1):** A fee of 4 buys a game paying gross x with probability .25 and zero otherwise. Find the break-even x and EV when x=20; then state how EV changes if only the fee rises to 5.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write expected net payoff when a prize amount is unknown. | main 1 | Expected net payoff .40x−6 is correct. |
| Solve the zero-EV prize or payoff threshold. | main 2 | Break-even prize x=15 is solved correctly. |
| Evaluate EV at a stated prize away from threshold. | main 3 | EV at x=18 is 1.2. |
| State how a one-unit fee change shifts expected net payoff. | main 4 | A one-unit fee increase is correctly identified as a one-unit EV decrease. |
| Separate probability assumptions from payoff/price assumptions. | main 5 | Probability and payoff/price assumptions are separated explicitly. |

## M05 S06 — Probability of gain/loss/zero versus expected payoff

Instruction +10/−1 at .2/.8 and a zero-state check differ from Main +15/+1/−4 and Transfer +20/−1. The rare-win explanation demonstrates why loss frequency and EV coexist.

**Main public request (obligation v1):** A game has net +15 with probability .15, +1 with probability .55 and −4 with probability .30. Identify gain/loss/zero events, compute P(gain), P(loss), P(zero), compute EV, and explain why the EV does not replace the loss-probability report.

**Transfer public request (obligation v2):** A game pays net +20 with probability .10 and −1 with probability .90. Compute EV and P(loss), then explain how both can be simultaneously positive/high.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Identify gain, loss and zero-payoff events from a payoff table. | main 1 | Gain/loss/zero states are classified correctly. |
| Compute probability of gain. | main 2 | P(gain)=.70 is correct. |
| Compute probability of loss and break-even. | main 3 | P(loss)=.30 and P(zero)=0 are correct. |
| Compute EV from the same model. | main 4 | EV=1.60 is correct. |
| Explain why EV and loss probability answer different questions. | main 5 | The distinction between magnitude-weighted EV and event probability is explained. |

## M05 S07 — Skewed games: EV versus most-likely outcome

Worked +49 at .03 and guided +19 at .05 differ from Main +99 at .02 and Transfer +14 at .1. A repeated −1 outcome alone is not exercise equivalence.

**Main public request (obligation v1):** A game pays net +99 with probability .02 and −1 with probability .98. Identify the most-likely payoff, compute EV, compare those two summaries, quantify the contribution of the rare gain to EV, and explain why calling EV the 'typical one-play result' would be misleading.

**Transfer public request (obligation v2):** A game pays +14 with probability .10 and −1 with probability .90. Compute EV, identify the most-likely payoff and explain the skew in one sentence. State the probability of the most-likely payoff.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Identify the most-likely payoff in a finite game. | main 1 | Most-likely payoff −1 with probability .98 is identified. |
| Compute EV of a strongly skewed payoff table. | main 2 | EV=1.00 is correct. |
| Compare the most-likely outcome with EV without conflating them. | main 3 | EV and most-likely outcome are explicitly distinguished. |
| Explain how a rare large payoff can dominate EV. | main 4 | Rare-gain contribution +1.98 is computed/interpreted correctly. |
| Avoid calling EV a typical or median outcome without justification. | main 5 | The 'typical result' misuse of EV is rejected. |

## M05 S08 — Comparing games on multiple metrics without hidden preference claims

Worked +3/−1 versus +8/0, guided +5/−1 versus sure1 differ from fixed A/B and C/D pairs. Main requests all metrics and a genuine trade-off, matching all five claims.

**Main public request (obligation v1):** Game A pays +4 with probability .50 and −2 with .50. Game B pays +11 with probability .20 and −1 with .80. For each game compute EV, P(loss), worst payoff and best payoff; then identify the trade-off and state why these metrics alone do not define a universal winner.

**Transfer public request (obligation v2):** Game C pays +6(.30),−1(.70). Game D pays +2(.70),−3(.30). Compute EV, P(loss), worst/best payoff for both and describe the trade-off without choosing a universal winner.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute EV for each of two games. | main 1 | Both EVs are correct: A=1,B=1.4. |
| Compute loss probability for each game. | main 2 | Both loss probabilities are correct: A=.5,B=.8. |
| Report best and worst one-play payoff for each game. | main 3 | Worst/best payoffs are correct for both games. |
| Identify metric trade-offs between the games. | main 4 | At least one genuine metric trade-off is identified accurately. |
| State that an overall choice requires an explicit criterion or preference. | main 5 | The response states that an overall choice needs an explicit criterion/preference. |

## M05 S09 — Repeated plays & linearity of total expected payoff

Worked5 plays at .4 and guided1,−.5,2 differ from seven-play Main and four-play Transfer. Main now asks the learner to define the sum; independence and realized-total distinctions are publicly requested.

**Main public request (obligation v2):** One play pays +3 with probability .60 and −2 with probability .40. Let X_i be the net payoff on play i and let T be the seven-play total. Write T as a sum. Compute one-play EV, compute E[T], state exactly why independence is not required for that expectation calculation, and explain why E[T] does not guarantee the realized seven-play total.

**Transfer public request (obligation v2):** Four plays have expected net payoffs 1.5,−.5,2 and0, with unspecified dependence. Compute expected total and explain which fact justifies the calculation. Distinguish this expectation from a guaranteed realized total.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Define total net payoff as a sum of play-level payoffs. | main 1 | Total payoff is represented as a sum of seven play-level payoffs. |
| Use linearity to compute expected total payoff. | main 3 | Expected total E[T]=7 is correct. |
| Explain that independence is not required for linearity. | main 4 | The no-independence requirement for linearity is stated correctly. |
| Apply identical-play EV over n plays. | main 2,3 | One-play EV=1 is correct. / Expected total E[T]=7 is correct. |
| Distinguish expected total payoff from a guarantee about the realized total. | main 5 | Expected total is not presented as a guaranteed realized total. |

## M05 S10 — Bankroll accounting & wealth paths

Instruction paths begin50/30; Main100 and Transfer75 have different increments. Transfer now explicitly requests level-versus-increment meaning.

**Main public request (obligation v1):** Start with bankroll 100. Four realized net payoffs are −20,+15,−10,+30. Construct the wealth path including time0, compute cumulative net P&L after each play, verify the final accounting identity, and explain the difference between a bankroll level and a one-play payoff.

**Transfer public request (obligation v2):** Start with bankroll 75 and realized net payoffs +5,+10,−25,+8. List the wealth path, cumulative P&L path and final accounting check. Distinguish a wealth level from a payoff increment.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Update bankroll recursively by adding realized net payoff. | main 1 | Recursive bankroll update is used correctly. |
| Construct the complete wealth path from an initial bankroll. | main 2 | Wealth path 100,80,95,85,115 is correct. |
| Compute cumulative net P&L from the path. | main 3 | Cumulative P&L path 0,−20,−5,−15,15 is correct. |
| Check final wealth equals initial wealth plus cumulative P&L. | main 4 | Final identity W4=W0+cumulative P&L is verified. |
| Distinguish bankroll level from per-play payoff. | main 5 | Bankroll level and one-play payoff are distinguished. |

## M05 S11 — Running peaks & drawdown

Instruction paths100,110,99,105 and50,60,54,63 differ from both task paths. Same percentage answers in distinct paths do not disclose peak tracking.

**Main public request (obligation v1):** A realized wealth path is 100,120,90,108,130,104. Compute the running peak at every time, the drawdown amount and percentage at every time, identify maximum drawdown amount and maximum drawdown percentage, and explain why final wealth 104 is not a loss relative to the initial bankroll even though it is in drawdown from the running peak.

**Transfer public request (obligation v1):** For wealth path 200,240,216,252,189, compute running peaks and percentage drawdowns, then identify maximum percentage drawdown.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute the running peak of a wealth path. | main 1 | Running peaks 100,120,120,120,130,130 are correct. |
| Compute drawdown amount from running peak. | main 2 | Drawdown amounts 0,0,30,12,0,26 are correct. |
| Compute drawdown percentage using the running peak denominator. | main 3 | Drawdown percentages 0,0,25%,10%,0,20% are correct. |
| Find maximum drawdown over a finite path. | main 4 | Maximum drawdown amount30 and percentage25% are identified. |
| Distinguish drawdown from loss relative to initial bankroll. | main 5 | Drawdown-from-peak is distinguished from gain/loss versus initial wealth. |

## M05 S12 — Finite-horizon ruin by explicit tree/enumeration

Worked start2/two fair plays and guided start1/one play precede easy Main start3. New Transfer start1/three plays at .6/.4 requires first-hit prefixes and an unstopped recovery counterexample. Ownership of path distinction and nonduplicated sum is Transfer-based.

**Main public request (obligation v1):** Start bankroll 3. On each of three independent plays, win +2 with probability .40 or lose −1 with probability .60. Ruin means bankroll hits 0 at or before play3. Enumerate the eight W/L paths, track bankroll enough to identify ruin paths, compute the three-play ruin probability, and state why this is a finite-horizon result rather than a general ruin formula.

**Transfer public request (obligation v2):** Start bankroll 1. At most three independent potential plays win +1 with probability .60 or lose −1 with probability .40. Stop at the first hit of 0; after stopping, bankroll stays 0. Define ruin by this three-play horizon, list all possible first-hit W/L prefixes, compute their probabilities and the total without double-counting continuations. Compare the hypothetical unstopped path LWW with its stopped bankroll path and explain why checking only the unstopped endpoint would miss ruin.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Define ruin as bankroll hitting zero within the stated finite horizon. | main 1 | Ruin is correctly defined as hitting zero by play3. |
| Enumerate finite play paths under an explicit independence model. | main 2 | All eight W/L paths are accounted for under independence. |
| Track bankroll along each path rather than only final increments. | transfer 5 | LWW is compared as 1→0→1→2 unstopped versus 1→0→0→0 stopped, explaining the endpoint error. |
| Identify which paths hit zero. | transfer 2 | First-hit prefixes L and WLL are identified as exhaustive. |
| Sum probabilities of ruin paths without invoking infinite-horizon theory. | transfer 3,4 | Prefix probabilities .4 and .096 are computed under independence. / Total .496=62/125 is obtained with disjoint prefixes and no double-counting. |

## M05 S13 — Stake size as a fraction of bankroll & hard loss constraints

Worked bankroll100/cap12 and guided80/cap10% differ from Main80/cap12 and Transfer150/cap10%. Stake fraction is row3; worst-loss and bound are row2, not the unrelated EV row1.

**Main public request (obligation v2):** Bankroll is 80. A proposed bet stakes s; on success it earns net +1.5s with probability .50 and on failure loses the full stake with probability .50. A hard rule says one-play loss may not exceed 12. Compute EV as a function of s, translate the hard rule into a stake bound and bankroll fraction, classify stakes 8,12,20 as feasible/infeasible, and explain why the bound does not identify an optimal stake.

**Transfer public request (obligation v2):** Bankroll150; the full stake can be lost and a hard rule caps one-play loss at 10% of bankroll. Find the maximum feasible stake and fraction, then explain why positive EV would not by itself authorize a larger stake.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Express stake as a fraction of current bankroll. | main 3 | Maximum stake fraction15% is correct. |
| Compute worst one-play loss for a stated stake rule. | main 2 | Worst possible loss is s, so the hard cap gives s≤12 (for a nonnegative stake). |
| Translate a hard loss cap into a stake inequality. | main 2 | Worst possible loss is s, so the hard cap gives s≤12 (for a nonnegative stake). |
| Identify feasible and infeasible stake sizes. | main 4 | Stakes8,12 feasible and20 infeasible are classified correctly. |
| Explain that a feasibility bound is not an optimal sizing rule. | main 5 | Feasibility is explicitly distinguished from optimal sizing. |

## M05 S14 — Additive payoff versus multiplicative wealth mechanics

Instruction symmetric20% and10% differs from Main50% and Transfer+25%/−20%. Claims on successive percentage updates and additive comparison need rows3 and2+3.

**Main public request (obligation v2):** Starting wealth is 100. Compare two sequences: (A) an additive +50 dollars then −50 dollars; (B) a +50% wealth change then a −50% wealth change. Compute both wealth paths, express the percentage updates as factors, explain why the percentage changes do not cancel, and keep the conclusion in bankroll-percentage language rather than importing market-return terminology.

**Transfer public request (obligation v2):** Starting wealth100 changes +25% and then −20%. Compute final wealth and explain why these unequal percentages happen to restore the initial bankroll.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Convert a percentage wealth change into a multiplicative factor. | main 1 | Percentage changes are correctly converted to factors1.5 and.5. |
| Update wealth through successive percentage changes. | main 3 | Multiplicative path100→150→75 is correct. |
| Compare additive fixed-dollar changes with multiplicative percentage changes. | main 2,3 | Additive path100→150→100 is correct. / Multiplicative path100→150→75 is correct. |
| Show why +q% followed by −q% does not generally restore wealth. | main 4 | Non-cancellation is explained by the changed base / factor product. |
| Keep the discussion about bankroll mechanics rather than market-return definitions. | main 5 | The answer stays within bankroll-percentage mechanics, not market-return theory. |

## M05 S15 — Recovery arithmetic after a percentage loss

Worked40% recovery; guided changed20% to10% because20% rehearsed Transfer. Main25% and Transfer20% remain; old guided problem had no displayed solution and does not create a reveal.

**Main public request (obligation v1):** A bankroll at peak100 loses25%. Compute the new wealth, solve directly for the percentage gain needed to recover to100, derive the general recovery formula g=L/(1−L), verify it for L=.25, and explain why simply gaining25% after the loss is insufficient.

**Transfer public request (obligation v2):** A bankroll loses20% from its peak. Find the exact percentage gain needed to recover and verify it with a starting peak of200. Explain the changed-base reason that the loss and recovery percentages differ.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute wealth after a percentage loss. | main 1 | Post-loss wealth75 is correct. |
| Solve the percentage gain required to return to the prior peak. | main 2 | Direct recovery gain 1/3 (33.33%) is correct. |
| Derive the recovery formula g=L/(1−L). | main 3 | General formula g=L/(1−L) is derived correctly. |
| Apply the formula to a finite drawdown. | main 4 | Formula is verified at L=.25. |
| Explain why symmetric loss/gain percentages do not cancel. | main 5 | The failure of a symmetric +25% recovery is demonstrated/explained. |

## M05 S16 — Preference is extra structure: same EV, different choices

Worked sure5 versus12/−2 differs from Main sure5 versus14/−1 at .4/.6; same EV alone is insufficient to copy distribution reasoning. Guided now sure3 versus12/0; removed exact sure2/8/0 Transfer rehearsal.

**Main public request (obligation v1):** Option A gives a sure net payoff of5. Option B gives +14 with probability .40 and −1 with probability .60. Compute both EVs, determine whether EV alone distinguishes them, compare their payoff distributions, state what extra preference/constraint information would be needed for an overall choice, and give two coherent choice rationales using the same probability model.

**Transfer public request (obligation v1):** Compare sure payoff2 with a game paying8 with probability .25 and0 otherwise. Compute EVs and explain why identical EV does not force identical preference.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute EV for two alternatives. | main 1 | Both EVs are correctly computed as5. |
| Identify when two alternatives have equal EV. | main 2 | EV tie is identified. |
| Explain that equal EV does not imply identical payoff distributions. | main 3 | Difference between sure payoff and risky payoff distribution is described. |
| State that preference/constraints are additional decision inputs. | main 4 | Need for explicit preference/constraint information is stated. |
| Give a coherent reason two people could choose differently without changing the probability model. | main 5 | Two coherent differing rationales are given without changing model probabilities. |

## M05 S17 — Expected utility on finite outcomes

Instruction utility tables80/100/140 and50/70/90 differ from Main70/100/150 and Transfer40/60/100. Equal EU is a recurring concept; the utility and wealth calculations still require the task table.

**Main public request (obligation v1):** A decision maker supplies utility values u(70)=1, u(100)=5, u(150)=9. Option A gives wealth100 for sure. Option B gives wealth70 with probability .50 and150 with probability .50. Compute EU of both, apply the explicitly stated expected-utility criterion, distinguish this from comparing expected monetary wealth, and state why these utility numbers must not be treated as universal.

**Transfer public request (obligation v2):** Given u(40)=0,u(60)=4,u(100)=10, compare sure wealth60 with a lottery giving40 or100 each with probability .50 under expected utility; also report expected monetary wealth.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Treat supplied utility values as preference inputs rather than monetary payoffs. | main 1 | Supplied utility values are used as utilities, not dollars. |
| Compute expected utility as a probability-weighted utility sum. | main 2 | EU(A)=5 and EU(B)=5 are correct. |
| Compare options by expected utility only when that criterion is explicitly specified. | main 3 | Expected-utility criterion is applied as a tie. |
| Distinguish expected monetary payoff from expected utility. | main 4 | Expected monetary wealth100 versus110 is distinguished from EU. |
| Avoid inferring a universal utility function from one exercise. | main 5 | Utility specification is explicitly described as decision-maker/model specific, not universal. |

## M05 S18 — Certainty equivalent & finite risk premium

Worked table replaced by50/80/130 with utilities1/4/7; guided60/90/120. Main80/100/140 and Transfer100/120/140 are distinct. Old worked Main answers remain historically exposed; premium interpretation is now public in Transfer.

**Main public request (obligation v1):** A supplied utility table has u(80)=2, u(100)=5, u(140)=8. A lottery gives wealth80 or140 with probability .50 each. Compute its expected utility, identify the certainty equivalent from the table, compute expected monetary wealth, compute E[wealth]−CE, and interpret that difference only within the supplied preference model.

**Transfer public request (obligation v2):** Utility table: u(100)=4,u(120)=7,u(140)=8. A lottery gives wealth100 with probability .25 and140 with probability .75. Find EU, CE from the table, expected wealth and E[W]−CE. Interpret the premium within this supplied preference model.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute expected utility of a finite lottery. | main 1 | Expected utility5 is correct. |
| Identify a certainty equivalent from a supplied utility table. | main 2 | Certainty equivalent100 is identified from u(100)=5. |
| Compute expected monetary wealth separately. | main 3 | Expected wealth110 is correct. |
| Define finite risk premium as expected wealth minus certainty equivalent. | main 4 | Risk premium110−100=10 is correct. |
| Interpret the sign only relative to the supplied utility/preference model. | main 5 | Interpretation is explicitly conditional on the supplied preference model. |

## M05 S19 — Statewise dominance & dominated choices

Worked vectors5/2/0 versus4/1/−1 and guided crossing3/0 versus2/1 differ from tasks. Main now explicitly requests the inequality/strictness test; Transfer explains probability irrelevance.

**Main public request (obligation v2):** Three common states are s1,s2,s3. Choice X pays (6,1,−2); choice Y pays (5,1,−4). Represent the payoff vectors, test weak statewise dominance, identify any dominated choice, explain why no state probabilities are needed, and state what would change if the vectors instead crossed as X=(6,0,−4), Y=(5,1,−4). State the statewise inequalities and strict-improvement condition used in your test.

**Transfer public request (obligation v2):** Over states A,B,C, option P pays (2,4,1) and Q pays (2,3,1). Determine whether either statewise dominates and explain whether probabilities are needed.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Represent each option as a payoff vector over common states. | main 1 | Payoff vectors over the common states are represented correctly. |
| Define weak statewise dominance as no lower payoff in every state and higher in at least one. | main 2 | The statewise ≥ test and at least one strict inequality correctly establish X dominating Y. |
| Diagnose a dominated option from a finite table. | main 3 | Y is correctly identified as dominated. |
| Explain why state probabilities are unnecessary for statewise dominance. | main 4 | Irrelevance of state probabilities for pointwise dominance is explained. |
| Recognize when crossing payoffs mean no statewise dominance. | main 5 | Crossing-vector variant is correctly diagnosed as no dominance. |

## M05 S20 — Worst-case payoff & maximin guarantee

Worked table now6/−4,2/3,9/−6 with guarantee2; fixed Main guarantee1 and Transfer guarantee0. Claim1 needs both minima rows; applying maximin is row3, not the isolated second minimum.

**Main public request (obligation v2):** Against two possible adverse states L,R, action A pays (4,−3), B pays (1,1), and C pays (7,−8). Compute each action's worst payoff, apply the maximin criterion, state the guaranteed payoff, and explain why this conclusion does not say B has the highest EV or is universally preferred. State the maximin rule you apply.

**Transfer public request (obligation v2):** Actions X,Y,Z have state payoffs X=(2,−1,3), Y=(0,0,0), Z=(5,−4,6). Apply maximin and state the guarantee. Explain briefly what the guarantee means under this worst-case criterion.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute the worst payoff of each available action. | main 1,2 | Worst payoff of A is −3. / Worst payoff of B is1 and of C is−8. |
| Apply maximin by comparing the row minima of a finite payoff table. | main 3 | The maximin rule compares row minima and correctly selects B. |
| Select the maximin action from a finite table. | main 3 | The maximin rule compares row minima and correctly selects B. |
| State the guaranteed payoff under that criterion. | main 4 | Guaranteed payoff1 is stated correctly. |
| Explain that maximin is an explicit decision rule, not a universal mandate. | main 5 | Criterion-specific nature is explained without an EV/universal-choice claim. |

## M05 S21 — Adversarial 2×2 payoff matrices & best responses

Instruction matrices2/0;1/3 and1/2;0/3 differ from both fixed matrices. Transfer now asks the saddle payoff required by its rubric.

**Main public request (obligation v2):** The row player's payoff matrix is [[3,−1],[0,2]], with row actions U,D and an adversarial column player choosing L,R to minimize row payoff. Find the row best response to L and to R, find the column minimizing response to U and to D, determine whether a pure mutual-best-response cell exists, and explain why no probability-weighted EV can be computed until a strategy/probability model is specified.

**Transfer public request (obligation v2):** For row payoff matrix [[2,1],[0,−1]], find pure best responses of both players under the same adversarial interpretation and determine whether a pure saddle exists. If a saddle exists, state its payoff.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Interpret rows and columns as joint action choices with entries equal to row-player payoff. | main 1 | Matrix/action interpretation is correct. |
| Find the row player's best response to each column. | main 2 | Row best responses are U to L and D to R. |
| Find the minimizing column response to each row in an adversarial interpretation. | main 3 | Column minimizing responses are R to U and L to D. |
| Identify whether a pure mutual best-response/saddle cell exists. | main 4 | No pure mutual-best-response/saddle cell is identified correctly. |
| Distinguish best-response analysis from expected payoff under a probability model. | main 5 | Need for strategy probabilities before probability-weighted EV is stated. |

## M05 S22 — Mixed-strategy expected payoff & indifference in a 2×2 game

Worked symmetric2/0 and guided3/1;0/2 differ from Main3/0;1/2 and Transfer2/−1;−1/2. Shared q=.5 alone is not a disclosed payoff derivation. Valid direct algebra is accepted.

**Main public request (obligation v2):** Row payoff matrix is [[3,0],[1,2]]. The column chooses L with probability q. Derive the expected payoff of U and D as functions of q, solve q that makes U and D indifferent, compute the common payoff, then let the row choose U with probability p and solve p that makes columns L and R give equal expected row payoff. State why this finite algebra does not establish a general minimax/equilibrium theorem.

**Transfer public request (obligation v2):** For payoff matrix [[2,−1],[−1,2]], find the column probability q of L that makes the two row actions indifferent and the common expected payoff.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute expected payoff of a pure row action against a randomized column action. | main 1 | Expected payoff functions 3q and2−q are correct. |
| Solve the column mixing probability that makes two row actions indifferent. | main 2 | Indifference q=.5 is solved correctly. |
| Compute expected payoff at the indifference probability. | main 3 | Common payoff1.5 is correct. |
| Solve the symmetric row mixing condition that makes columns yield equal expected row payoff. | main 4 | Row mixing condition gives p=.25 correctly. |
| State that this algebraic indifference calculation is not a proof of a general equilibrium theorem. | main 5 | Scope is limited to finite indifference algebra; no general theorem is claimed. |

## M05 S23 — Rapid fair-price / break-even / bankroll decision drills

Worked fee4,threshold.25,cap5 and guided peak80/current68 differ from Main fee3,threshold.2,cap10,drawdown20% and Transfer fee3,threshold.5,cap9,drawdown15%. Labels bind each answer to its actual criterion.

**Main public request (obligation v1):** Solve this four-part drill and label each criterion: (i) a game pays gross10 with probability .30 and0 otherwise—find the EV-fair fee; (ii) net +8 on success and−2 on failure—find break-even success probability; (iii) bankroll50 with a hard one-play loss cap10 and full-stake loss—find maximum feasible stake; (iv) wealth peaked at60 and is now48—find percentage drawdown. Then explain why these four answers are not interchangeable decision rules.

**Transfer public request (obligation v1):** Drill: gross12 with probability .25 else0; net +5/−5 binary game; bankroll90 with loss cap9 and full-stake loss; peak100/current85. Find fair fee, break-even p, max stake and drawdown percentage.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute an EV-fair fee from gross payoff probabilities. | main 1 | EV-fair fee3 is correct and labeled. |
| Compute a break-even success probability from binary net payoffs. | main 2 | Break-even probability.20 is correct and labeled. |
| Translate a hard bankroll loss cap into a maximum stake. | main 3 | Maximum feasible stake10 is correct and labeled as a constraint. |
| Compute drawdown from a running peak. | main 4 | Drawdown20% using peak60 is correct. |
| Name the decision criterion used in each calculation instead of merging them. | main 5 | The four calculations are distinguished as different criteria/questions. |

## M05 S24 — Integrated decision audit: EV, loss probability, drawdown constraint, utility & sensitivity

Worked +20/−5 versus sure6 and utilities3/7/9 differs from Main +30/−10 versus4 and Transfer+16/−8 versus3. Independent synthesis requires monetary, feasibility and utility conclusions plus a new threshold.

**Main public request (obligation v1):** Start bankroll100. Option A pays net +30 with probability p and−10 with probability1−p; current model uses p=.40. Option B pays sure +4. A hard rule allows at most12 one-play loss. Supplied terminal-wealth utilities are u(90)=4,u(104)=7,u(130)=10. Compute A's EV and P(loss) at p=.40 and compare monetary EV with B; check the hard loss/drawdown constraint for A; compute expected utility of A and B under the supplied table; solve the p threshold where monetary EV(A)=4; then write a short conclusion labeling which criterion favors which option.

**Transfer public request (obligation v1):** Start bankroll80. Option C pays +16 with probability p and−8 otherwise; model p=.50. Option D pays sure +3. Hard loss cap is10. Utilities: u(72)=2,u(83)=6,u(96)=9. Compute EV/P(loss) for C, feasibility, EU(C), EU(D), and the p where EV(C)=3; give a criterion-labeled conclusion.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute EV and loss probability for an uncertain option versus a sure alternative. | main 1 | At p=.40, EV(A)=6,P(loss)=.60 and EV(B)=4 are correct. |
| Check a stated one-play bankroll/drawdown constraint. | main 2 | A's worst loss10 / 10% one-step drawdown is checked against cap12 correctly. |
| Apply a supplied utility table to compare expected utility. | main 3 | EU(A)=6.4 and EU(B)=7 are correct under the supplied utility table. |
| Solve a probability threshold at which the EV ranking changes. | main 4 | EV-ranking threshold p=.35 is solved correctly. |
| Write a criterion-labeled conclusion that separates model facts from preference/constraint choices. | main 5 | Conclusion explicitly labels monetary-EV, hard-constraint and supplied-utility criteria without declaring a universal winner. |

## M06 S01 — Conditioning direction: P(E|H) versus P(H|E)

Worked20 H/16 H-evidence/20 non-H evidence and guided30/18/12 differ from Main100/80/180 and Transfer50/35/45. Claims1–2 map to interpreted denominators, claim3 to both calculations, claim4 to both denominators. Later old S05/S10/S22/S23 disclosed Main subanswers; source-ledger links preserve that history.

**Main public request (obligation v2):** In a population of1000 cases,100 satisfy hypothesis H. Evidence E appears in80 of the H cases and180 of the900 non-H cases. Compute P(E|H), compute P(H|E), state the denominator used in each calculation, compare the two values, and explain the conditioning-direction error that would occur if they were equated. Explain what population each conditional refers to.

**Transfer public request (obligation v1):** Among500 records,50 are in class C. Signal S appears in35 class-C records and45 non-C records. Compute P(S|C) and P(C|S) and identify both denominators.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| State the meaning of P(E\|H). | main 3 | The H-population denominator100 and meaning of P(E\|H) are stated. |
| State the meaning of P(H\|E). | main 4 | The E-population denominator260 and meaning of P(H\|E) are stated. |
| Compute both directions from one finite table. | main 1,2 | P(E\|H)=.80 is correct. / P(H\|E)=4/13≈.3077 is correct. |
| Identify the different conditioning denominators. | main 3,4 | The H-population denominator100 and meaning of P(E\|H) are stated. / The E-population denominator260 and meaning of P(H\|E) are stated. |
| Explain why P(E\|H) and P(H\|E) are not generally equal. | main 5 | The two directions are compared and the reversal error is explained. |

## M06 S02 — Base rates by finite frequency table

Worked prevalence2%,hit.9,false.05 and guided5%,.8,.1 differ from Main1%,.9,.05 and Transfer2%,.75,.02. Different prior/likelihood combinations require new frequency counts.

**Main public request (obligation v1):** Use a hypothetical population of10000. H has base rate1%; P(E|H)=.90 and P(E|H^c)=.05. Compute the H and non-H counts, the expected E counts from each group, total E count, and the fraction of E cases that are H.

**Transfer public request (obligation v1):** In20000 cases, prevalence of H is2%, P(E|H)=.75 and P(E|H^c)=.02. Build the frequency counts and compute the fraction of evidence-positive cases that are H.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Translate a prior/base rate into finite counts. | main 1 | Base-rate counts100 H and9900 H^c are correct. |
| Compute true-evidence counts under H. | main 2 | True-evidence count90 is correct. |
| Compute false-evidence counts under H^c. | main 3 | False-evidence count495 is correct. |
| Combine evidence counts across H and H^c. | main 4 | Total evidence count585 is correct. |
| Compute the posterior fraction among evidence-positive cases. | main 5 | Posterior frequency90/585=2/13≈.1538 is correct. |

## M06 S03 — True positives, false positives & prevalence

Worked1%,.9,.02 and guided10% with same rates differ from Main2%,.95,.04 and Transfer3%,.8,.01. Both likelihood meanings are now requested; false-positive direction maps to the non-H computation, not total positives.

**Main public request (obligation v2):** In5000 cases, H prevalence is2%. P(E|H)=.95 and P(E|H^c)=.04. Compute true-positive and false-positive counts, total positive-evidence count, P(H|E), and explain quantitatively why .95 must not be reported as the posterior probability. State the meaning of each supplied likelihood in its own denominator population.

**Transfer public request (obligation v2):** Among10000 cases, prevalence3%, P(S|H)=.80 and P(S|H^c)=.01. Compute true/false signal counts and P(H|S).

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Interpret P(E\|H) as a hit/sensitivity-like rate. | main 1 | P(E\|H)=.95 is interpreted in the correct direction. |
| Apply the false-positive-like rate P(E\|H^c) to the non-H group. | main 2 | False-positive rate .04 is applied to non-H cases; true-positive95 and false-positive196 counts are correct. |
| Compute true-positive and false-positive counts from prevalence. | main 2 | False-positive rate .04 is applied to non-H cases; true-positive95 and false-positive196 counts are correct. |
| Compute posterior among positive evidence cases. | main 4 | Posterior95/291≈.3265 is correct. |
| Explain why prevalence can dominate the count of positive cases. | main 5 | The .95-versus-posterior denominator distinction is explained quantitatively. |

## M06 S04 — Reconstruct a posterior from counts before formulas

Worked42/58 and guided24/36 evidence counts differ from Main42/94 and Transfer30/70. Shared numerator42 does not determine the new denominator.

**Main public request (obligation v1):** A frequency table has60 H cases and940 H^c cases. Of the H cases,42 show evidence E; of the H^c cases,94 show E. Compute H∩E and H^c∩E counts, total E count, P(H|E), verify the probability range, and explain the denominator in words.

**Transfer public request (obligation v2):** A table records30 A∩B cases and70 A^c∩B cases. Compute P(A|B) directly and state the conditioning denominator.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Read H∩E and H^c∩E counts from a finite table. | main 1 | Intersection counts42 and94 are identified correctly. |
| Compute total E count. | main 2 | Total evidence count136 is correct. |
| Compute P(H\|E) directly from counts. | main 3 | Posterior21/68≈.3088 is correct. |
| Check the result lies in [0,1]. | main 4 | Probability-range check is correct. |
| Explain the answer using the conditioned evidence subset. | main 5 | Denominator is explained as the evidence-positive subset. |

## M06 S05 — Posterior identifiability: what inputs are required?

Worked example now prior.2/hit.6 with false rates.1/.3, derived by counts before Bayes is taught. Main prior.1/hit.8 and Transfer missing prior use distinct data. Claim4 compares supplied alternatives rather than claiming learner-constructed countermodels.

**Main public request (obligation v1):** You are told P(H)=.10 and P(E|H)=.80, but P(E|H^c) is not given. State the information needed for a binary posterior, identify the missing term, explain why P(H|E) is not uniquely identifiable, compute P(H|E) under alternative values P(E|H^c)=.05 and .20, and state what extra information would resolve the problem.

**Transfer public request (obligation v1):** Given P(E|H)=.9 and P(E|H^c)=.1 but no prior P(H), explain whether P(H|E) is identifiable and demonstrate with priors .1 and .5.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| List the binary inputs needed to determine P(H\|E). | main 1 | Required binary inputs are stated correctly. |
| Identify a missing likelihood or base-rate input. | main 2 | Missing P(E\|H^c) is identified. |
| Explain why the posterior is then non-identifiable. | main 3 | Non-identifiability is explained rather than guessed through. |
| Compare two supplied compatible missing-input values and show that they produce different posteriors. | main 4 | Posterior examples .64 and4/13≈.3077 are correct. |
| State what additional information would resolve the ambiguity. | main 5 | A sufficient additional input is stated. |

## M06 S06 — Derive binary Bayes from joint probability factorizations

General Bayes derivation is taught openly; tasks require reconstruction plus distinct .3/.7/.4 and .2/.9/.3 data. The P(E)>0 claim belongs to derivation row4, not numerical row5. Transfer explicitly requests the condition.

**Main public request (obligation v1):** Starting only from the multiplication rule, write the two factorizations of P(H∩E), equate them, derive Bayes' rule for P(H|E), state the nonzero-denominator condition, then apply it to P(H)=.30,P(E|H)=.70,P(E)=.40.

**Transfer public request (obligation v2):** Derive P(A|B)=P(B|A)P(A)/P(B) from the multiplication rule and evaluate it when P(A)=.2,P(B|A)=.9,P(B)=.3. State the condition needed for the division.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write P(H∩E)=P(E\|H)P(H). | main 1 | First joint factorization P(E\|H)P(H) is correct. |
| Write P(H∩E)=P(H\|E)P(E). | main 2 | Reverse factorization P(H\|E)P(E) is correct. |
| Equate the two joint factorizations. | main 3 | The equality of the two joint expressions is used. |
| Derive P(H\|E)=P(E\|H)P(H)/P(E). | main 4 | Bayes' rule is derived and P(E)>0 stated. |
| State the requirement P(E)>0. | main 4 | Bayes' rule is derived and P(E)>0 stated. |

## M06 S07 — Construct the Bayes denominator with total probability

Worked prior.3/rates.8/.2 and guided.5/.6/.1 differ from Main.2/.8/.1 and Transfer.4/.7/.2. Partition assumption, each route and normalized posterior are separately observable.

**Main public request (obligation v1):** Let P(H)=.20,P(E|H)=.80 and P(E|H^c)=.10. Verify the binary partition, compute both joint contributions to E, construct P(E), and compute P(H|E).

**Transfer public request (obligation v1):** P(A)=.4,P(B|A)=.7,P(B|A^c)=.2. Build P(B) from the partition and compute P(A|B).

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| State that H,H^c form a disjoint exhaustive partition. | main 1 | Binary partition H,H^c is stated correctly. |
| Compute P(H∩E) from prior and likelihood. | main 2 | H∩E contribution .16 is correct. |
| Compute P(H^c∩E) from complement prior and likelihood. | main 3 | H^c∩E contribution .08 is correct. |
| Build P(E) by adding the two routes. | main 4 | Evidence denominator P(E)=.24 is correct. |
| Use that denominator to compute the posterior. | main 5 | Posterior2/3 is correct. |

## M06 S08 — Direct binary Bayes calculation

Worked prior.1/rates.9/.2 and guided.25/.6/.1 differ from Main.05/.9/.1 and Transfer.2/.75/.25. Main interpretation now matches its final rubric row.

**Main public request (obligation v2):** A rare condition H has prior probability .05. Evidence E appears with probability .90 under H and .10 under H^c. Identify the prior/complement and both likelihoods, compute the numerator, construct the denominator, and compute P(H|E). Interpret the posterior under the stated model.

**Transfer public request (obligation v1):** Prior P(H)=.2; P(E|H)=.75; P(E|H^c)=.25. Compute P(H|E) with a fully shown denominator.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Identify prior P(H) and complement prior P(H^c). | main 1 | Prior .05 and complement .95 are correct. |
| Identify likelihoods under H and H^c. | main 2 | Likelihoods .90 and .10 are assigned to the correct hypotheses. |
| Compute the Bayes numerator. | main 3 | Numerator .045 is correct. |
| Compute the normalized evidence denominator. | main 4 | Denominator .14 is correct. |
| Compute and interpret P(H\|E) as a posterior under the stated model. | main 5 | Posterior9/28≈.3214 is correct and interpreted conditionally on the model. |

## M06 S09 — Multi-hypothesis Bayes normalization

Worked two-hypothesis model and guided priors.4/.4/.2 differ from both three-hypothesis assessments. Claims recognize the given partition and check prior normalization; they do not claim to infer exhaustiveness from numbers. Transfer now states the partition assumption.

**Main public request (obligation v2):** H1,H2,H3 are mutually exclusive and exhaustive with priors .50,.30,.20. Evidence likelihoods are P(E|H1)=.10,P(E|H2)=.40,P(E|H3)=.50. Compute all prior-weighted evidence contributions, P(E), all three posterior probabilities, and verify normalization. Also check the prior normalization and identify the stated partition assumption.

**Transfer public request (obligation v2):** Three mutually exclusive and exhaustive hypotheses have priors .2,.5,.3 and evidence likelihoods .6,.2,.4. Compute the normalized posterior vector.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Identify the declared mutually exclusive exhaustive hypothesis partition and check prior normalization. | main 1 | The declared disjoint exhaustive partition is identified and prior sum1 is checked. |
| Compute prior-weighted evidence contribution for each hypothesis. | main 2 | Contributions .05,.12,.10 are correct. |
| Sum contributions to obtain P(E). | main 3 | Evidence denominator .27 is correct. |
| Normalize each contribution into a posterior probability. | main 4 | Posteriors5/27,12/27,10/27 are correct. |
| Check posterior probabilities sum to one. | main 5 | Posterior normalization to1 is verified. |

## M06 S10 — Frequency-table versus algebra cross-check

Worked cross-check changed to prior.3/hit.7/false.2; guided.25/.6/.1. Main.1/.75/.05 and Transfer.2/.5/.1 remain distinct. Claim1 computes supplied-population counts rather than choosing the population; Transfer purpose is now public. Old S10 mapped to earlier shared posterior tasks.

**Main public request (obligation v1):** Model: P(H)=.10,P(E|H)=.75,P(E|H^c)=.05. Use a population of2000 to compute P(H|E) from counts, compute it again algebraically, show equality, and state what a disagreement between the two methods would signal.

**Transfer public request (obligation v2):** P(H)=.2,P(E|H)=.5,P(E|H^c)=.1. Use1000 cases and algebra to compute the posterior two ways. State what the cross-check can diagnose.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Translate a prior into counts in a supplied finite population. | main 1 | Population counts200 and1800 are correct. |
| Compute posterior from frequency counts. | main 2 | Evidence counts150 and90 and frequency posterior.625 are correct. |
| Compute the same posterior from Bayes algebra. | main 3 | Bayes algebra numerator/denominator .075/.12 is correct. |
| Show the two representations agree. | main 4 | The two answers are explicitly shown equal. |
| Use disagreement as a diagnostic of setup/arithmetic error. | main 5 | A disagreement is correctly described as a setup/arithmetic diagnostic. |

## M06 S11 — Incomplete hypothesis sets & omitted alternatives

Worked contributions.20/.05/.15 and guided.1/.1/.2 differ from Main.20/.06/.16 and Transfer.12/.08/.20. Both tasks explicitly use exhaustive disjoint alternatives. Claim1 concerns including the declared set, not independently proving completeness.

**Main public request (obligation v2):** H1,H2,H3 are mutually exclusive and exhaustive with priors .50,.30,.20 and likelihoods P(E|Hi)=.40,.20,.80. Compute the correct evidence denominator and P(H1|E). Then compute the value an analyst would report if H3 were wrongly omitted and normalization used only H1,H2. Explain the modeling error. State why the full denominator must include all three hypotheses.

**Transfer public request (obligation v2):** Evidence contributions from mutually exclusive and exhaustive H1,H2,H3 are .12,.08,.20. Compute P(H1|E) fully and after wrongly omitting H3; explain the difference.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Explain why normalization must include every member of the declared complete partition. | main 1 | The need to include every member of the declared complete partition is stated. |
| Compute the correct evidence denominator with all hypotheses. | main 2 | Full contributions and denominator .42 are correct. |
| Compute the correct posterior. | main 3 | Correct posterior10/21≈.4762 is correct. |
| Compute the distorted posterior after omitting an alternative. | main 4 | Omitted-H3 posterior10/13≈.7692 is correct. |
| Explain why Bayes is exact conditional on the specified model but cannot repair an incomplete model set. | main 5 | The error is identified as model-set incompleteness, not Bayes arithmetic failure. |

## M06 S12 — Probability ↔ odds conversion

Worked probability.2 and ratio3:1; guided.6 and2:3 differ from Main.3 and4:1 and Transfer.75 and1:4. Transfer reuses the inverse relation of the worked example, a taught conversion, rather than a repeated whole task. Claims use formula/calculation/interpretation rows by meaning.

**Main public request (obligation v1):** For p=.30, compute odds in decimal and ratio form. Then convert odds4:1 back to probability. State both conversion formulas, interpret 4:1 in words, and explain why odds4 is not probability4.

**Transfer public request (obligation v2):** Convert probability.75 to odds, and odds1:4 to probability. State both ratio interpretations.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Define odds O=p/(1−p) for 0<p<1. | main 1 | Probability-to-odds formula is stated and p=.30 gives3/7. |
| Convert probability to odds. | main 1,2 | Probability-to-odds formula is stated and p=.30 gives3/7. / Ratio form3:7 is correct. |
| Interpret odds as a ratio H:H^c. | main 4 | 4:1 is interpreted as four units of H support per one of H^c. |
| Invert odds via p=O/(1+O). | main 3 | Odds-to-probability formula is stated and4:1 gives.8. |
| Distinguish odds from probability. | main 5 | Odds-versus-probability distinction is explicit. |

## M06 S13 — Likelihood ratios as evidence multipliers

Worked likelihood pairs.6/.2 and.1/.4 differ from Main.72/.24 and.1/.5, Transfer.35/.70. Transfer now scores relative likelihood magnitude rather than requiring the not-yet-derived posterior-odds identity.

**Main public request (obligation v1):** For evidence E, P(E|H1)=.72 and P(E|H0)=.24. Define and compute LR(E), interpret its direction and magnitude. For evidence F, likelihoods are .10 under H1 and .50 under H0; compute and interpret LR(F). Finally explain why neither LR is a posterior probability.

**Transfer public request (obligation v2):** P(S|H1)=.35,P(S|H0)=.70. Compute LR and interpret it without converting to a posterior.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Define LR(E)=P(E\|H1)/P(E\|H0). | main 1 | Likelihood-ratio definition is correct. |
| Compute a likelihood ratio from two evidence likelihoods. | main 2 | LR(E)=3 is correct. |
| Interpret LR>1 as relative support toward H1. | main 3 | LR(E)>1 interpretation is correct. |
| Interpret LR<1 as relative support toward H0. | main 4 | LR(F)=.2 and its H0-favoring interpretation are correct. |
| State that an LR is neither a probability nor a posterior. | main 5 | LR-versus-posterior distinction is explicit. |

## M06 S14 — Derive posterior odds = prior odds × likelihood ratio

Worked prior.25/LR6 and guided odds1:4/LR2 differ from Main.2/LR3 and Transfer.5/LR.25. Symbolic cancellation is explicitly taught; reconstruction is accompanied by fresh numeric application.

**Main public request (obligation v1):** Derive the posterior-odds identity from Bayes' rule for H1 versus H0. Then let prior P(H1)=.20 and LR(E)=3. Compute prior odds, posterior odds and posterior probability.

**Transfer public request (obligation v1):** Prior P(H1)=.5 and LR=.25. Use odds form to find the posterior probability.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write posterior odds P(H1\|E)/P(H0\|E). | main 1 | Posterior odds ratio is written correctly. |
| Substitute Bayes expressions for numerator and denominator. | main 2 | Bayes substitution is correct. |
| Cancel the common P(E) normalizer. | main 3 | Common P(E) is canceled legitimately. |
| Derive posterior odds = prior odds × LR. | main 4 | Posterior-odds identity is derived. |
| Apply the identity and convert posterior odds back to probability. | main 5 | Numeric prior odds1/4, posterior odds3/4 and posterior3/7 are correct. |

## M06 S15 — LR interpretation: >1, =1, <1

Worked LRs4/1/.5 and guided2 versus5 differ from Main likelihood pairs yielding2/1/.2 and Transfer5/1/.25. Neutral LR1 is reusable principle, not a hidden fixed-answer reveal.

**Main public request (obligation v1):** Evidence A has likelihoods .80 under H1 and .40 under H0; B has .30 and .30; C has .10 and .50. Compute LR(A),LR(B),LR(C), classify each direction, explain what LR=1 does to prior odds, and compare their evidential roles without calling any LR a posterior probability.

**Transfer public request (obligation v2):** Classify evidence with LRs5,1,.25 and state the multiplicative effect on H1:H0 odds.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute LRs for several evidence items. | main 1 | All three LRs2,1,.2 are correct. |
| Interpret LR>1 as shifting odds toward H1. | main 2 | LR>1 interpretation for A is correct. |
| Interpret LR=1 as leaving odds unchanged. | main 3 | LR=1 neutral/no-odds-change interpretation is correct. |
| Interpret LR<1 as shifting odds toward H0. | main 4 | LR<1 interpretation for C is correct. |
| Compare relative evidence strength without calling an LR a posterior. | main 5 | Evidence-multiplier versus posterior distinction is maintained. |

## M06 S16 — Same likelihood ratio under different priors

Worked LR10 with priors.01/.5 and guidedLR2 with.1/.5 differ from fixed LR4 and LR3 pairs. Transfer now asks the comparison. Old S22 disclosed Main prior.5/LR4 subanswer and is linked historically.

**Main public request (obligation v1):** Use the same LR=4 in two settings. Setting A has prior P(H)=.01; setting B has prior P(H)=.50. Convert each prior to odds, update by LR4, convert to posterior probability, compare the results, and explain the role of the base rate.

**Transfer public request (obligation v2):** LR3 is observed under priors.10 and.40. Compute both posterior probabilities using odds. Compare the results and explain why a common LR does not erase the prior difference.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Convert two different priors to odds. | main 1 | Prior odds1/99 and1 are correct. |
| Apply the same LR to both prior odds. | main 2 | Posterior odds4/99 and4 are correct. |
| Convert both posterior odds back to probabilities. | main 3 | Posteriors4/103≈.0388 and.8 are correct. |
| Compare the resulting posteriors. | main 4 | The two posterior outcomes are compared accurately. |
| Explain why fixed evidential strength does not erase base-rate differences. | main 5 | Base-rate versus evidence-strength roles are explained. |

## M06 S17 — Sequential updating: posterior becomes the next prior

Worked prior odds1:3/LRs2,3 and guided1:4/LRs2,.5 differ from Main prior.2/LRs3,2 and Transfer1:2/LRs3,.5. Claim1 uses prior conversion and first update rows together; final claim combines numeric update and evidence accounting.

**Main public request (obligation v1):** Start with prior P(H)=.20. Evidence E1 has LR1=3. After E1, evidence E2 arrives with conditional LR2=P(E2|H,E1)/P(E2|H^c,E1)=2. Compute prior odds, posterior after E1, carry that state forward, update with E2, compute the final posterior, and state why neither E1 nor E2 has been counted twice.

**Transfer public request (obligation v2):** Prior odds1:2. New evidence arrives with conditional LRs3 then.5. Compute the posterior probability after each update.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Update prior odds with a first likelihood ratio. | main 1,2 | Prior odds.25 are correct. / After-E1 odds.75 and posterior3/7 are correct. |
| Convert the first posterior odds to probability. | main 2 | After-E1 odds.75 and posterior3/7 are correct. |
| Use the first posterior as the next prior state. | main 3 | Posterior-as-next-prior/current-odds step is explicit. |
| Apply a second conditional likelihood ratio to current odds. | main 4 | After-E2 odds1.5 and final posterior.6 are correct. |
| Compute the final posterior and identify exactly which evidence was used once. | main 4,5 | After-E2 odds1.5 and final posterior.6 are correct. / Evidence accounting explains why each item is used once. |

## M06 S18 — Joint evidence likelihood via the chain rule

Worked pairs now.7,.6 and.2,.3; guided.8,.4 and.5,.2. Fixed Main.5,.8 and.4,.25, Transfer.6,.5 and.3,.4 differ. Old worked Main disclosure and unsolved Transfer rehearsal receive different provenance handling.

**Main public request (obligation v2):** Under H1, P(E1|H1)=.50 and P(E2|E1,H1)=.80. Under H0, P(E1|H0)=.40 and P(E2|E1,H0)=.25. Write the chain-rule factorization under each hypothesis, compute both joint evidence likelihoods, compute their joint LR, and explain why multiplying unconditional P(E1|H)P(E2|H) would require an extra assumption.

**Transfer public request (obligation v2):** Under A, P(X|A)=.6,P(Y|X,A)=.5; under A^c, P(X|A^c)=.3,P(Y|X,A^c)=.4. Compute the joint LR for X,Y. Show both chain-rule products, keeping the given conditional second factors.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Write P(E1∩E2\|H)=P(E1\|H)P(E2\|E1,H). | main 1 | Chain-rule factorizations under both H1 and H0 use the conditional second factor correctly. |
| Compute a joint evidence likelihood under H. | main 2 | H1 joint likelihood.40 is correct. |
| Compute the analogous joint likelihood under H0. | main 3 | H0 joint likelihood.10 is correct. |
| Form a joint likelihood ratio. | main 4 | Joint LR4 is correct. |
| Explain why the conditional second factor is required unless conditional independence is established. | main 5 | Need for conditional-independence before using marginal products is explained. |

## M06 S19 — Conditional independence given a hypothesis

Worked changed to.7,.4,.28 and.3,.2,.09; guided.8,.5,.4. Main.6,.5,.30 versus.2,.4,.12 and Transfer.5,.4,.2 versus.25,.2,.05 remain distinct. Old worked first Transfer check is historical answer exposure; old Main guided check had no displayed solution.

**Main public request (obligation v1):** Under H, P(E1|H)=.60,P(E2|H)=.50 and P(E1,E2|H)=.30. Under H0, the corresponding values are .20,.40 and joint .12. Test conditional independence under each hypothesis, show the product comparisons, explain whether the same conclusion holds in both worlds, and state whether marginal LRs may be multiplied directly.

**Transfer public request (obligation v1):** Under A, likelihoods .5,.4,joint.2; under A^c, likelihoods .25,.2,joint.05. Test conditional independence in both and state whether marginal LRs may multiply.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Define conditional independence of E1,E2 given H using a product equality. | main 1 | Conditional-independence product criterion is stated. |
| Test conditional independence numerically under H. | main 2 | H calculation .30=.6(.5) is correct. |
| Test it separately under H0. | main 3 | H0 calculation .12≠.08 is correct. |
| Explain that the condition may hold under one hypothesis and fail under another. | main 4 | Different conclusions under H and H0 are recognized. |
| State why LR multiplication from marginal likelihoods needs factorization under both hypotheses. | main 5 | Direct marginal-LR multiplication is correctly rejected. |

## M06 S20 — Multiplying likelihood ratios under conditional independence

Worked pairs now.7/.35 and.6/.2; guided different LRs2,4 with prior1:5. Main.6/.2 and.5/.25, Transfer.8/.4 and.3/.1 require their own likelihood ratios. Old S20 and S24 disclosed Main pair; both sources are linked.

**Main public request (obligation v1):** Assume E1,E2 are conditionally independent under both H1 and H0. P(E1|H1)=.60,P(E1|H0)=.20; P(E2|H1)=.50,P(E2|H0)=.25. Compute LR1 and LR2, compute both joint likelihoods, verify joint LR=LR1×LR2, then update prior odds1:2 and convert to posterior probability.

**Transfer public request (obligation v2):** Evidence conditionally independent under both H1 and H0 has likelihood pairs(.8,.4) and(.3,.1) under H1 versus H0. Prior odds1:4. Compute product LR and posterior probability.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute marginal LR for each evidence item. | main 1 | LR1=3 and LR2=2 are correct. |
| Use conditional independence to factor both joint likelihoods. | main 2 | Joint likelihoods .30 and .05 are correct. |
| Show joint LR equals product of marginal LRs. | main 3 | Joint LR6 equals product LR1×LR2. |
| Update prior odds with the product LR. | main 4 | Prior odds1:2 update to posterior odds3. |
| Convert the resulting odds to posterior probability. | main 5 | Posterior probability.75 is correct. |

## M06 S21 — Dependent/duplicated evidence, double counting & update-order discipline

The general duplicate-evidence rule and conditional LR1 must be taught; worked LR4 differs from Main5 and Transfer3. Numeric joint/naive comparisons are fresh applications, not claims that the underlying rule was never seen.

**Main public request (obligation v1):** Evidence E has P(E|H1)=.50 and P(E|H0)=.10, so LR(E)=5. D is a deterministic duplicate: D occurs exactly when E occurs. Compute the correct joint LR for observing E and D, compute the naive-independent product, compute the second conditional LR after E is known, and explain both the double-counting error and why an exact joint model gives the same final update regardless of processing order.

**Transfer public request (obligation v2):** A signal S has LR3 and a second field C is an exact copy of S. Compare correct joint LR with naive independent multiplication and state the conditional LR of C after S.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Recognize deterministic duplicate evidence as dependent. | main 1 | Duplicate evidence is recognized as dependent/redundant. |
| Compute the correct joint likelihood ratio for duplicated evidence. | main 2 | Correct joint LR5 is computed. |
| Compute the incorrect naive-independent product for comparison. | main 3 | Naive-independent product25 is computed and rejected. |
| Use the conditional second-step LR to show duplicated evidence adds no new odds shift. | main 4 | Conditional second-step LR1 is derived. |
| Explain why exact joint modeling makes update order irrelevant for the same evidence set. | main 5 | Double counting and exact-order invariance are explained correctly. |

## M06 S22 — Prior-sensitivity analysis

Worked now LR3 with priors.25/.75, guidedLR2 with.2/.4. MainLR4 with.01/.1/.5 and TransferLR3 with.2/.6 differ. Claim2 uses both posterior rows; sensitivity claims use the comparison row. Old lesson shared exact posterior cases with multiple tasks, recorded in source ledger.

**Main public request (obligation v1):** Keep P(E|H)=.80 and P(E|H^c)=.20 fixed. Compute P(H|E) for priors .01,.10,.50. Compare the three posteriors, state whether the result is prior-sensitive over this range, and explain what the exercise can and cannot tell you about which prior is empirically correct.

**Transfer public request (obligation v2):** With likelihoods P(E|H)=.9,P(E|H^c)=.3, compute posteriors for priors.2 and.6 and comment on sensitivity.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Hold the evidence likelihood model fixed while varying the prior. | main 1 | Likelihood model is held fixed correctly. |
| Compute posteriors for several prior values. | main 2,3 | Posterior4/103≈.0388 for prior.01 is correct. / Posteriors4/13≈.3077 and.8 are correct. |
| Compare posterior sensitivity across the prior range. | main 4 | Strong prior sensitivity is identified. |
| Identify when the posterior remains materially prior-dependent. | main 4 | Strong prior sensitivity is identified. |
| State that the sensitivity table audits an assumption rather than choosing the true prior. | main 5 | Sensitivity-versus-empirical-prior distinction is explained. |

## M06 S23 — Likelihood/model sensitivity & robustness

Worked now prior.3/hit.7/false.1,.4 and guided prior.2/hit.7/false.1,.3. Main.1/.8 and Transfer.2/.75 are distinct. Three numeric rows jointly demonstrate multiple models; identification/conditional correctness are row4.

**Main public request (obligation v1):** Fix prior P(H)=.10 and P(E|H)=.80. Compute P(H|E) when P(E|H^c)=.05,.10,.20. Compare the results, identify the model input causing the change, explain why Bayes itself is not contradicted, and name one empirical check or dataset quantity that would help constrain that input.

**Transfer public request (obligation v2):** Prior.2 and P(S|H)=.75 are fixed. Compare posteriors when P(S|H^c)=.05 versus.25 and state the model-sensitivity conclusion.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Hold the prior fixed while varying a likelihood assumption. | main 4 | Likelihood-model sensitivity and conditional correctness of Bayes are explained. |
| Compute posteriors under multiple evidence models. | main 1,2,3 | Posterior .64 for false-positive .05 is correct. / Posterior8/17≈.4706 for .10 is correct. / Posterior4/13≈.3077 for .20 is correct. |
| Identify which likelihood change drives the posterior. | main 4 | Likelihood-model sensitivity and conditional correctness of Bayes are explained. |
| Explain that Bayes is exact conditional on the model but the likelihood model can be wrong. | main 4 | Likelihood-model sensitivity and conditional correctness of Bayes are explained. |
| State what data/model check would reduce the uncertainty. | main 5 | A relevant empirical calibration/check for the likelihood input is named. |

## M06 S24 — Integrated Bayesian evidence audit & calibrated conclusion

Worked now prior.2 with pairs.9/.3 and.4/.2, sensitivity prior.1. Main prior.05 with.8/.1 and.6/.3 and Transferprior.1 with.7/.2 and.4/.1 differ. Claim3 justifies using the stated assumptions; it does not assert empirical validation. Old worked pair disclosed S20 Main intermediates.

**Main public request (obligation v1):** Binary H versus H^c has prior P(H)=.05. Evidence E1 has likelihoods .80 under H and .10 under H^c. Evidence E2 has likelihoods .60 under H and .30 under H^c, and E1,E2 are conditionally independent given both hypotheses. Compute the joint-likelihood Bayes posterior, reproduce it from prior odds and product LR, explicitly justify the LR multiplication, recompute the posterior if the prior were .02 with likelihoods unchanged, and write a calibrated conclusion that states the model assumptions without making a decision recommendation.

**Transfer public request (obligation v2):** Prior P(A)=.10. Two evidence items conditionally independent under both A and A^c have likelihood pairs(.70,.20) and(.40,.10) under A versus A^c. Compute posterior by product LR and again by joint Bayes, then recompute for prior.05 and state the sensitivity. State the model assumptions supporting the calculation.

| Claim | Observing task / rubric rows | Exact scoring evidence |
| --- | --- | --- |
| Compute a posterior from prior and joint/conditional evidence likelihoods. | main 1 | Joint likelihoods, Bayes denominator and posterior16/35≈.4571 are correct. |
| Reproduce the update in odds/LR form. | main 2 | Odds/LR reproduction with product LR16 is correct. |
| Justify LR multiplication using the stated conditional-independence assumption under both hypotheses. | main 3 | Conditional-independence justification for LR multiplication is explicit. |
| Stress-test the posterior to a changed prior. | main 4 | Prior-.02 sensitivity posterior16/65≈.2462 is correct. |
| Write a calibrated conclusion stating the hypothesis/evidence-model assumptions and avoiding a decision recommendation. | main 5 | Conclusion states model/prior assumptions and avoids an unasked decision recommendation. |

