# M05 review handoff — Trading Games & Decisions Under Uncertainty

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M05 · T22E-TRD01 — Trading Games & Decisions Under Uncertainty**  
M05 internal content/integration checkpoint: `4b5aadb607b3a7f06b7444f4f3b3dc0ba9322399`  
Status: **INTERNAL ACCEPTED — REVIEW HANDOFF CREATED; M06 MAY OPEN ONLY AFTER THIS SEPARATE CHECKPOINT**

## Authority and ancestry

M04 is independently accepted in `M04-ASTRA-FOLLOWUP.md`; its verified remote run was `35368721291`.

M05 began from that accepted state and used `docs/t22-course/M05-BOUNDARY.md` as the frozen boundary.

Direct macro prerequisite: **ARC048 only**.

## What M05 owns

M05 now owns, at finite elementary level:

- payoff tables: probability, gross payoff, net payoff, terminal wealth;
- finite expected net payoff;
- EV-fair entry fee / zero-EV fair price;
- break-even probability and payoff thresholds;
- probability of gain/loss/zero versus EV;
- skew: EV versus most-likely payoff;
- descriptive comparison metrics without hidden preference claims;
- repeated-play expected total through linearity;
- bankroll accounting and wealth paths;
- running peaks and drawdown;
- finite-horizon ruin by explicit enumeration;
- stake fraction and hard one-play-loss feasibility constraints;
- additive versus multiplicative bankroll arithmetic;
- recovery percentage after drawdown;
- preference as extra structure;
- expected utility with supplied finite utility tables;
- certainty equivalent and finite risk-premium calculation;
- statewise dominance;
- maximin as an explicitly named conservative criterion;
- finite 2×2 adversarial best responses;
- mixed-strategy expected payoff / indifference algebra without a general minimax theorem;
- rapid drills and integrated criterion-labelled decision audit.

## Explicit non-ownership

M05 intentionally does **not** teach:

- Bayes, base rates, posterior probability, likelihood ratios or sequential belief updating — M06;
- prices, returns, long/short P&L, bid/ask, order types/fills — M07;
- variance/covariance/formal random-variable distributions — M26;
- Kelly criterion, log-optimality or general optimization;
- DP/MDPs or infinite-horizon ruin;
- formal minimax/equilibrium existence theorems;
- no-arbitrage/replication/derivatives pricing.

## Package state

- Sessions: **24**
- Fixed assessments: **48** (Main + Transfer)
- Required ownership claims: **120**
- Claim observability: **120/120 exact Main public-task → exact rubric criterion**
- Evaluator totals: **48/48 = 10 points**
- Semantic instruction-separation records: **24/24**
- Instruction version: `m05-instruction-v1`
- Authoring version: `m05-authoring-v1.0-internal-accepted`
- Course metadata: `T22E-course-0.5.0-m05`
- Shared evidence key unchanged: `chrono_t22_elite_course_evidence_v1`

## Teaching safeguards carried forward

Every M05 lesson contains novice explanation, a worked example and guided check before the fixed tasks.

The course repeatedly distinguishes:

- expected value from a guaranteed/typical result;
- expected value from probability of loss;
- descriptive metrics from preferences;
- hard feasibility constraints from optimization;
- supplied utility from money and from a universal preference law;
- maximin from an all-purpose rationality rule;
- finite 2×2 indifference algebra from a general equilibrium/minimax theorem.

Worked/guided data are surface- and number-distinct from fixed Main/Transfer tasks.

## Assessment / provenance safeguards carried forward

- Every ownership claim is publicly requested and scored.
- No hidden answer-equivalence was intentionally introduced.
- `obligationVersion=1` is used for all new M05 assessments.
- Assessment fingerprints continue to hash prompt + obligation version + full evaluator marking contract.
- Lesson use records assistance provenance.
- Answer-bearing packet export marks both fixed tasks reference-exposed.
- Unsaved Main/Transfer working and assistance provenance are tested across module switches.
- Review events attach to original attempts.
- M01–M05 evidence remains in one store and export/import path.
- No historical answer-exposure migration is required because M05 launches with separated instruction.

## Persistent validation

New gates:

1. `scripts/test-t22-elite-m05.mjs`
   - 24/48/120 structure;
   - 120 exact claim/request/rubric mappings;
   - 10-point evaluators;
   - prerequisite and semantic-separation ledgers;
   - decision-boundary leakage guards.

2. `docs/t22-course/audit/m05-independent-math.mjs`
   - independently re-derives payoff accounting, EV/fair fee, break-even, loss metrics, repeated expectation, drawdown/ruin, stake bounds, multiplicative recovery, utility/CE, dominance/maximin, adversarial indifference and synthesis arithmetic.

3. Shared browser regression now includes M05:
   - module load / 24-session scoping;
   - save/reveal/review under stable M05 IDs;
   - M05→M01→M05 unsaved draft + assistance provenance;
   - packet exposure of both S01 fixed tasks;
   - M01–M05 export/import coexistence.

4. CI workflow now includes M05 syntax/static/math gates plus the existing real Chromium workflow.

Connector-side deterministic validation at checkpoint `4b5aadb...` found:
- no structural/claim/rubric/separation failures;
- selected independent calculations all passed;
- M05 semantic status = accepted;
- roadmap status = authored;
- M06 and M07 remained planned.

The GitHub connector exposed here does not list push-triggered workflow runs, so this handoff does not invent a CI run ID. Reviewers should inspect the Actions run for the exact handoff head when available.

## Reviewer attack targets

1. Is EV-fair pricing consistently described as zero-EV arithmetic rather than market value or preference?
2. Does any positive-EV example accidentally imply unlimited/optimal stake size?
3. Are drawdown and initial-bankroll loss kept distinct?
4. Does finite ruin stay finite-horizon and avoid importing DP/Markov/infinite-horizon results?
5. Is multiplicative bankroll arithmetic taught without prematurely defining market returns?
6. Are utility/CE examples mathematically correct while clearly model/preference-specific?
7. Is statewise dominance used only when states are common/comparable and more payoff is preferred?
8. Are maximin and adversarial best-response criteria explicitly labelled rather than universalized?
9. Does S22 stop at direct 2×2 indifference rather than smuggling a minimax/equilibrium theorem?
10. Are all 120 ownership mappings genuinely semantic, not merely positional?
11. Does shared evidence provenance still behave correctly with a fifth authoring pack?
12. Is the M06 boundary still clean enough that Bayes has real work to do?

## Next boundary

After this M05 checkpoint is verified, open **M06 · ARC502 — Bayes, Base Rates & Sequential Updating**.

Complete and validate M06 separately, create its own handoff, then **STOP before M07**.

No merge to `main`, deployment, T25 modification or legacy-T22 progress migration is authorized.
