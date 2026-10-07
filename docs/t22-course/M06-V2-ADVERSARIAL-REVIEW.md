# M06 v2 adversarial review and bounded repair

Reviewed head: `9ef4031053f6eca3384a83230086c5b8106961fa`. Base main: `9458e9e6b114c3366f6b009982f26de2e40234f6`. Date: 2026-10-07. Reviewer: the original builder, at the user's request; no delegated agents or independent reviewer. This is a substantive self-review, not independent acceptance or learner-pilot evidence.

The frozen head was technically green: all 37 triggered workflows, including [T22 Elite run37650726089](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/37650726089), job112893043160, succeeded. Green automation did not prevent the findings below.

## Findings and dispositions

| ID | Severity | Location | Reproducible defect and consequence | Repair |
|---|---|---|---|---|
| R01 | High | S34 Main joint prediction | “Independent of E and of each other” permits a pairwise reading. Pairwise conditions do not preserve the future pair's conditional joint law after E. The required table was not uniquely implied by that reading. | Publicly supply three-way factorization given each hypothesis, teach the distinction, and bind it to the typed model. Obligation1→2. |
| R02 | Medium | S30 and S33 learning route | S30 uses negative LR before S13 introduces it; S33 Transfer tests within-hypothesis independence before S19 develops that definition. Learners should not need forward reading. | Add exact JIT definitions and prerequisite-audit entries in these earlier lessons. Route and assessed obligations stay unchanged. |
| R03 | Medium | S34 Transfer rubric row2 | The rubric scored a partition derivation, while the prompt only requested an explanation of non-identifiability and compatible models. | Explicitly request the formula and its derivation; add the supported partition derivation to the reference. Obligation1→2. |
| R04 | Medium | S33 Main general proof | The general reference wrote `q_i*l_i` for every hypothesis. For a supported overall prefix, one hypothesis may have zero prefix mass and its `l_i` is undefined. The lesson had already fixed this, but the scored reference had not. | Define the support index set, cancel the common normalizer only there, use joint-mass subset monotonicity for zero cells, and iterate on supported prefixes. Public request and rubric explicitly observe this boundary. Obligation1→2. |
| C01 | Low | S24 orientation | “Close M06” remained even though prediction, posterior averaging and information decisions follow it. | Describe S24 as the cumulative evidence-model checkpoint. Lesson-only repair. |

Every finding above is implemented in the r1 candidate. Final repaired-head technical receipts are in [PR191](https://github.com/Karuma-jojo/Chronological-Deck/pull/191); read the exact head/run, not an ancestor's success.

## Exact R01 witness

Use the actual S34 inputs: priors `(1/3,2/3)`, evidence rates `(3/4,1/4)`, and each future trial's success rates `(4/5,1/5)`. Start with an independent law for binary `(X,Y,1_E)` inside each hypothesis. Add `delta*(-1)^(3-x-y-e)` to each of its eight atom masses, with `delta=1/200`.

All masses remain nonnegative and normalized. Summing over any coordinate cancels the perturbation, so every two-variable marginal is unchanged. Thus X/Y, X/E and Y/E remain pairwise independent under both hypotheses, with exactly the supplied rates. The posterior stays `(3/5,2/5)` and the one-trial prediction stays `14/25`. Yet the future table after E changes from `(2/5,4/25,4/25,7/25)` to `(103/250,37/250,37/250,73/250)`. This proves the weaker reading cannot determine the required joint answer.

`audit/m06-v2-adversarial-math.py` enumerates both complete laws with exact rational arithmetic, checks every pairwise cell, and computes the changed prediction directly from joint masses. The explicit three-way factorization in the repaired task rules out this perturbation. [MIT's independence lecture](https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/0efce5573e22478ef2bde873d509d4ac_UbQcqFH33G0.pdf) supplies the primary-source distinction; this witness is original to the task inputs.

## Coverage of the manual review

All 36 lessons, worked/guided examples and feedback, all 72 prompts/references/rubrics, and the 180 claim-observer mappings were read. The rows below record the main adversarial question per session, not a claim that two tasks certify every variation.

| Stable session | Main question checked | Outcome |
|---|---|---|
| S01 | Reverse-conditioning denominator | Correct distinct populations and values |
| S02 | False-evidence contribution at low base rate | Correct counts and posterior |
| S03 | Sensitivity versus positive predictive value | Correct meanings and prevalence effect |
| S04 | Direct conditioned-subset count | Correct support and denominator |
| S05 | Missing input and two compatible answers | Correct constructive non-identifiability |
| S06 | Joint derivation and positive-mass conditions | Ordinary conditional restriction taught explicitly |
| S07 | Complete binary partition | Correct two contributions |
| S08 | Normalized binary posterior | Correct model-qualified interpretation |
| S09 | Exhaustive multi-hypothesis law | Correct prior/posterior normalization |
| S10 | Representation agreement versus empirical validity | Correctly limits the cross-check |
| S11 | Omitted alternatives | Correct full and additionally conditioned truncated answers |
| S12 | Odds as ratios, not probabilities | Correct conversion and boundary teaching |
| S13 | LR direction and magnitude | Correct evidence ratio, no unsupported posterior |
| S14 | Legitimate normalizer cancellation | Correct ordinary-support qualification and arithmetic |
| S15 | Neutral and opposing evidence | Correct multiplicative interpretation |
| S16 | Same LR, different priors | Correct distinct posteriors |
| S17 | Posterior-as-prior with conditional LR | Correct one-use evidence accounting |
| S18 | Chain factors versus marginal products | Correct history conditionals, no inserted independence |
| S19 | Independence separately in both hypotheses | Correct product checks and rejected shortcut |
| S20 | Licensed marginal LR multiplication | Correct joint/product agreement |
| S21 | Deterministic duplicates | Conditional LR1 and correct joint LR |
| S22 | Sensitivity versus identifying a true prior | Correct calculation and no unconditional truth convergence |
| S23 | Input uncertainty versus Bayes arithmetic | Correct sensitivity and proposed input check |
| S24 | Dependence failure and cumulative model qualification | Correct exact and unlicensed posteriors; C01 repaired |
| S25 | Probability versus payoff-dependent action | Correct thresholds, ties and pre-action timing |
| S26 | Statewise maxima and information cost | Correct finite proof and monetary units |
| S27 | All report branches and utility/currency distinction | Correct EVSI/EVPI and unidentified currency fee |
| S28 | Informative but zero-value report; three-action exit | Correct policy, accounting, fee and protocol limits |
| S29 | Zero prior, zero cell, impossible report | Correct distinction and explicit model revision |
| S30 | Measured negative versus silence | Correct channel algebra; R02 definition repaired |
| S31 | Uniform labelled atoms versus selected report | Correct likelihoods for every specified protocol |
| S32 | Hidden mixture and selected independent bits | Correct conditioning-level counterexamples |
| S33 | Three-stage/reversed order and general support | Numeric results correct; R02/R04 repaired |
| S34 | Prediction versus hypothesis posterior | R01/R03 repaired; both non-identification constructions legal |
| S35 | Sharp endpoints, support and robust utility threshold | Correct four-atom endpoint laws and ties |
| S36 | Weighted posterior identity versus empirical calibration | Correct zero-report handling and selected archive population |

The fixed examples are structurally close to their instruction in many sessions. Existing retrieval/reconstruction labels are retained; different numbers do not establish an unseen transfer. Symbolic proofs and model-choice explanations were read manually; computational enumeration is not substituted for universal proofs.

## Handoffs and retained limits

The default route has only earlier required sessions; R02 removes the two implicit future-definition dependencies without reordering IDs. M04 supplies finite conditioning, full-history chains, reporting atoms and sharp bounds. M05 supplies finite payoffs, utility scales, feasibility and thresholds. M06's laboratory remains supplied-code assistance until the M08 independent coding gate.

M07 owns market accounting/execution. M26/M33 precede planned M33-B continuous parameter Bayes; M35 owns test optimality, M39/M40 empirical validation, M48 linear-Gaussian filtering and M49-S stopping theory. M09-U and M53-G utility/game existence branches remain planned. This review found no reason to add sessions or require another M06 PDF. Future ownership is not implemented coverage, and the whole course is not certified as PG-complete.

## Evidence preservation and verification

Architecture stays 36 sessions /72 tasks /180 claim observers. All 54 unchanged historical core/bridge assessment fingerprints remain identical. Relative to the reviewed v2 candidate, 69 fingerprints remain identical and S33-M/S34-M/S34-T are explicitly versioned. Their three previous assessments and all72 prior fingerprints are retained in `audit/m06-v2-previous-assessments.json`. Together with S24-T/S28-T's historical versions, five stale attempts are tested through actual browser import, export and reload. No previous answer is deleted or silently accepted as current.

New checks include the exact R01 counterexample, zero-cell coherent updating in both orders, four deliberate semantic-regression mutations independently of the whole-file hash, old fingerprint reconstruction, and verbatim preservation of all five stale records. The existing 72 typed model checks, original mutation attacks and inherited runtime checks remain active.

Independent pedagogical confirmation and a learner pilot are still absent. The original builder can strengthen and falsify its candidate; it cannot turn this recheck into independent approval. Draft status remains honest.

Local repair verification:125/125 workflow checks passed; the R04 explicit-request refinement also passes the focused checker. Remote repaired-head browser/CI receipts are recorded in PR191.
