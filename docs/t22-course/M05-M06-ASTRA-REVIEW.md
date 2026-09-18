# Independent M05–M06 review — repairs required

Date: 2026-09-18
Branch: `codex/t22-pedagogical-rebuild`
Reviewed head: `9efe72ee1c87579b4ba5ab491f31f259a976752e`
Content/integration checkpoints: M05 `4b5aadb607b3a7f06b7444f4f3b3dc0ba9322399`; M06 `66deecfa1f21b7730e702c4c0587a1f021212319`; batch handoff `182ff837e140f69b9f7736f9b1164678e6c76836`.

**Decision: M05 and M06 are not independently accepted/frozen. Repair this batch before M07.**
The internal-accepted labels in their authoring packs and earlier handoffs do not supersede this review. Preserve the authored work; this is a bounded repair, not a restart.

## Scope and strengths

Reviewed both 24-session packs, their lessons, Main/Transfer prompts and reference answers, rubric/claim mappings, prerequisite and separation records, boundaries, handoffs, validation scripts and current GitHub Actions evidence. This is 48 sessions, 96 fixed assessments and 240 ownership claims.

The route architecture is useful: M05 separates EV from loss probability, feasibility, preferences, utility and adversarial criteria; M06 moves from frequencies and conditioning direction to Bayes, odds, joint/conditional evidence and sensitivity. Direct dependency on M04 is sensible for both. No M07 pack was present. Existing M01–M04 acceptance is not reopened.

The numerical references inspected are largely sound; no material numerical-answer correction is the main reason for rejection. The blockers are assessment independence, evidence mapping and validation. Passing arithmetic checks cannot establish those properties.

## BATCH-01 — Actual full-suite validation is red (high)

GitHub Actions run [35376362609](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35376362609), commit `cf4873364e1c1e6aad46fa20b0457a37a1444e9d`, failed in the structural/pedagogy/evidence step. Job `105701848540` fails at `scripts/test-t22-elite-m05.mjs:45`:

```js
assert(by(12).lesson.includes('finite') && by(12).lesson.includes('ruin'));
```

S12 explains a finite horizon but does not contain the literal word `finite`. Thus this particular failure is a brittle wording guard, not evidence of wrong ruin arithmetic. Nevertheless it stops the workflow: later checks and Chromium installation/browser validation were skipped. The batch handoff run [35374639677](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35374639677) also reports failure. Latest head has subsequent packet-document commits, not a demonstrated green replacement run.

Local execution of the exact current M05 test reproduces this error. Fix the meaningful assertion/content agreement, then run the entire suite; do not equate syntax parsing, connector-side samples or a workflow file containing tests with executing those tests successfully. Do not weaken unrelated gates or merely delete the failing assertion.

The handoffs candidly lacked a run ID; they did not claim a fabricated successful Actions run. But opening/marking authored modules before the required green gate remains a process failure. Available GitHub fetch of `/actions/runs?branch=...` and run jobs/log tools can inspect push-triggered runs; a PR-only convenience wrapper is not the limit of available evidence.

## M05-01 — Fixed-assessment rehearsal in learning notes (high)

Source: `course/t22/authoring/m05.json`, sessions and corresponding problems.

- **S18 Main:** the worked example uses the identical table u(80)=2, u(100)=5, u(140)=8 and the identical equiprobable lottery over 80 and 140. It explicitly supplies EU=5, CE=100, expected wealth=110 and premium=10. These are the Main's requested answers.
- **S15 Transfer:** the guided check asks the required recovery after a 20% loss; Transfer asks that same recovery, adding verification from peak 200. The central calculation has already been rehearsed.
- **S16 Transfer:** the guided check is sure 2 versus 8 with probability .25 and 0 with .75, exactly the fixed Transfer's game.

Distinguish the first case (explicit answer disclosure) from the latter two (repeated practice task, not necessarily a revealed solution). All violate the promised numerically distinct instruction/assessment contract. The stored `reviewed-separated` declarations are inaccurate.

Replace instructional/practice data or affected assessments coherently; inspect all 24 lessons against both fixed tasks and relevant earlier lessons. Ordinary teaching of the general method is allowed. Matching a lone simple answer is not by itself contamination; matching the whole exercise data and decisive outputs is.

## M06-01 — Repeated exact worked answers across assessments (high)

Source: `course/t22/authoring/m06.json`.

| Session/task | Concrete overlap |
| --- | --- |
| S05 Main | Same prior .10, hit rate .80, alternative false-positive rates .05/.20; the lesson gives both requested posteriors .64 and 4/13. |
| S18 Main | Same conditional likelihood pairs (.5,.8) and (.4,.25); lesson gives both joint likelihoods .4/.1 and LR=4. |
| S18 Transfer | Guided check uses exactly the Transfer's pairs (.6,.5) and (.3,.4). |
| S20 Main | Worked example uses the same marginal likelihood pairs (.6,.2), (.5,.25), explicitly giving LRs 3,2 and joint LR 6. The changed prior only makes the last part new. |
| S22 Main | Lesson supplies two of the three exact requested posterior cases: priors .1/.5 with likelihoods .8/.2. |
| S23 Main | Lesson supplies two of the three exact requested cases: prior .1, hit rate .8, false-positive .05/.2. This also repeats S05's worked data. |

All listed records currently claim distinct worked/guided data and fresh reconstruction. A passing current M06 test does not detect these overlaps: it checks that a selected prose fragment of each prompt is absent from the lesson, which differences in whitespace/wording trivially satisfy.

Repair the instructional/assessment separation and manually document task-specific evidence for all 24 sessions. Keep examples, scaffolding and general derivations; remove the exact fixed-exercise rehearsal.

## BATCH-02 — Coverage gates enforce positional, not semantic mappings (high)

Both module tests and both handoff scripts require claim i to map to Main rubric row i, with `task === 'main'` and `coverage === ['main']`. This expressly defeats the boundary's permission to use the genuinely observing rubric rows/tasks.

Examples of current wrong links:

- **M05 S02:** claim 1 is writing the expected-payoff sum; row 1 checks probability normalization. Claim 2 is computing EV; row 2 only sets up the sum. Claim 3 is exhaustiveness; row 3 computes EV.
- **M05 S13:** claim 1 is expressing stake as a bankroll fraction; it maps to row 1, which computes EV(s)=.25s. The fraction is row 3.
- **M06 S01:** claim 3 is computing both conditional directions; it maps only to row 3 identifying the H denominator. Both numerical directions are scored in rows 1 and 2.
- **M06 S10:** claim 1 says choose a convenient finite population, but Main supplies the population of 2000. Computing supplied counts is not evidence of independently selecting the representation.
- **M06 S05:** claim 4 says construct two compatible missing-input values; Main supplies both values. Either request construction or make the claim accurately describe comparing supplied completions.

Re-audit all 240 mappings against actual public requests and evaluator criteria. Preserve legitimate mappings; allow one or more actual rubric rows and Main/Transfer evidence as needed. Do not replace this with another arbitrary index permutation. If a capability genuinely is not requested/scored, fix the assessment or accurately narrow an overstated claim within the accepted module boundary. Version changed assessment obligations/evaluators.

## BATCH-03 — Some rubrics charge for unrequested conclusions (medium, required)

Examples:

- **M05 S18 Transfer:** prompt asks EU, CE, expected wealth and premium; final 2-point row demands a model-specific interpretation.
- **M05 S09 Transfer:** prompt asks expected total and its justifying fact; last 2-point row requires distinguishing the realized total from expectation.
- **M06 S10 Transfer:** prompt asks two computations; last 2-point row requires stating the cross-check purpose.
- **M06 S16 Transfer:** prompt asks two posterior probabilities using odds; last 2-point row requires stating the same-LR/different-prior conclusion.

Those interpretations are useful, but useful is not the same as publicly requested. Add concise explicit requests or align scoring; inspect all 96 public prompt/evaluator pairs. Do not automatically penalize a complete answer to the actual prompt for omitting an unstated mini-essay.

## M05-02 — Ruin transfer does not test the path distinction (medium, required)

S12 claims ownership of tracking the path rather than only terminal bankroll. Main starts at 3 with maximum loss 1 for three plays; Transfer starts at 2 with maximum loss 1 for two plays. In both, ruin can only first happen on the last all-loss path. Thus checking terminal wealth alone happens to recover every answer; the pair cannot discriminate the advertised first-passage understanding.

Keep one easy opening if useful, but use a small finite transfer where ruin may occur before the horizon and endpoint-only reasoning is insufficient. Explicitly define stopping/absorption and identify first-hit paths without double-counting prefixes. This needs no Markov chains, recursion or infinite-horizon theory. Update its reference, rubric, obligation version and independent calculation.

## Provenance obligations during repair

These packs have already been exposed on the branch; deleting exact answers from current lessons does not undo a learner's earlier exposure.

- Increase affected instruction versions.
- Use the established historical lesson-overlap mechanism for actual answer-bearing instruction, preserving earlier genuinely independent attempts and marking only appropriate subsequent evidence.
- Distinguish guided practice exposure from an actually disclosed solution; do not invent a reveal event merely because an exercise was offered.
- Increment affected assessment obligation versions whenever fixed task/evaluator obligations change; keep stable IDs and the shared evidence store.
- Preserve historical evidence as stale/assisted/exposed according to the existing contracts, rather than silently relabeling it independent or deleting it.
- Verify lesson exposure, changed-task fingerprints and export/import behavior in the full runtime/browser suite.
- Correct the handoffs' claims that no historical exposure handling is necessary.

## Verification performed at the reviewed head

Exact current source executed locally:

| Check | Result |
| --- | --- |
| M05 structural/pedagogy script | FAIL, S12 literal-word guard above |
| M06 structural/pedagogy script | PASS, despite the documented semantic leaks |
| M05 independent-math script | PASS |
| M06 independent-math script | PASS |
| M05 handoff script | PASS, despite inaccurate semantic claims |
| M06 handoff script | PASS, despite inaccurate semantic claims |

The arithmetic scripts cover selected explicit computations, not all pedagogical assertions. The handoff scripts check internal consistency of declarations, not independent truth. The local review snapshot did not rerun Chromium; remote logs establish that browser checks were skipped. No green six-module runtime acceptance is claimed here.

## Repair assignment for Sol

1. Read this report and existing M05/M06 boundaries. Preserve completed M01–M04 and the current module architecture.
2. Repair M05-01, M06-01, BATCH-02, BATCH-03 and M05-02; make task-specific audit records instead of copying generic success sentences.
3. Apply necessary instruction/history/assessment provenance changes using existing runtime mechanisms. Keep changes bounded.
4. Repair BATCH-01, execute all required static/math/semantic/evidence/browser gates, and inspect the successful Actions run on the pushed repair head.
5. Write `M05-M06-RESOLUTION.md` mapping every finding to concrete files/session changes, independent checks, version/exposure handling, commit SHA and successful run URL. Commit/push/verify incremental checkpoints.
6. Stop for independent review. **M07 remains closed.** Do not merge main, deploy, modify T25 or migrate legacy T22.

## Autonomy decision

Sol can remain the principal author; these modules do not need rebuilding from scratch. This batch does **not** justify unattended completion of all upcoming modules or widening to three-module batches. The exact-answer and positional-mapping issues are recurrences of previously established review concerns.

After this repair is accepted, use **M07 alone** as the next trial. With two consecutive clean module reviews and verified full-suite runs, consider batches of two; retain earlier review around new mathematical prerequisites, proof techniques, empirical research and runtime changes. Reconsider cadence from evidence, not from model labels or self-authored acceptance declarations.
