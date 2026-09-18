# M04 REVIEW-HANDOFF — Finite Probability, Conditional Probability, Independence & Expectation

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Status: **FINAL INTERNAL ACCEPTED — STOP FOR INDEPENDENT REVIEW; M05/M06 NOT AUTHORED**  
Pre-M04 baseline: `829699fce941cdedf59b76aa2d656ca93d283e0b`  
Accepted M04 state: `d23b9d3b1b618904f907f8f6d6bfaef55c72873e`

## Exact M04 commit chain

1. `b5e9834d028d2f8a892eb3aced1fa6edbb769c7a` — Audit and freeze M04 probability boundary.
2. `482d519371c1db2908fdf11f9cfff6cb9c9035b4` — Author M04 finite probability candidate under hardened quality gates.
3. `9a827267b3e692f8d857777bc97c8a2f98a789cf` — Advance T22 stop boundary from M03 to M04.
4. `1738b6a9f1a79b1a6cd406a01698c0a65c224354` — Integrate M04 into shared T22 Elite validation runtime.
5. `d8c8bd678ff816e62c859ac4d3add327fcafd23f` — Harden M04 pedagogy and semantic separation before acceptance.
6. `d23b9d3b1b618904f907f8f6d6bfaef55c72873e` — Accept M04 after hardened probability quality gates.

This chain is 6 commits ahead / 0 behind the accepted M03 baseline.

## Changed files across the M04 implementation chain

- `.github/workflows/t22-elite-checks.yml`
- `course/t22/authoring/m04.json`
- `course/t22/generated/course-meta.json`
- `course/t22/generated/roadmap.json`
- `docs/t22-course/M04-BOUNDARY.md`
- `docs/t22-course/audit/m03-handoff-checks.mjs`
- `docs/t22-course/audit/m04-independent-math.mjs`
- `docs/t22-rebuild/RUN-LOG.md`
- `docs/t22-rebuild/SEMANTIC-PREREQUISITES.json`
- `scripts/test-t22-elite-course-browser.mjs`
- `scripts/test-t22-elite-m04.mjs`
- `scripts/test-t22-semantic-gates.mjs`

No M05 or M06 authoring pack was created. No merge or deployment was performed. Historical T22 progress and T25 were not modified.

## Semantic boundary

Required macro prerequisite:

- **M03 · T22E-DISC01** — events-as-sets, finite counting/combinatorics, inclusion-exclusion, proof/counterexample discipline.

M04 owns:

- finite experiments, outcomes, sample spaces and events;
- legal finite probability models and normalization;
- equally likely counting probability;
- complements, unions, intersections and inclusion-exclusion;
- conditional probability with denominator discipline;
- multiplication/intersection rule;
- finite trees and sequential paths;
- with/without-replacement sampling;
- event independence by product and conditional criteria;
- exclusivity versus independence;
- pairwise versus mutual independence;
- repeated independent trials and exactly-k counting;
- complement strategies;
- partitions and law of total probability;
- finite expectation as a weighted average;
- uniform/symmetry expectation;
- linearity of expectation;
- indicators and expected counts without independence;
- expectation interpretation limits;
- one integrated conditioning/independence/expectation synthesis.

Explicitly deferred:

- **M05 · T22E-TRD01** — fair price as decision policy, bankroll, drawdown/ruin, utility/risk preference, adversarial trading-game decisions;
- **M06 · ARC502** — Bayes inversion, base rates, likelihood ratios, sequential posterior updating;
- **M26 · ARC517** — formal random variables, PMFs/CDFs, variance, covariance/correlation, named distributions and conditional expectation;
- Monte Carlo coding/simulation;
- LLN/CLT;
- measure-theoretic probability.

## Atomic coverage

M04 has **24 bounded sessions**.

- Sessions: **24/24** contiguous.
- Fixed assessments: **48/48** — one Main + one Transfer per session.
- Required-ownership claims: **120/120**.
- Claim observability: **120/120 exact Main public-task + exact rubric links**.
- Evaluators: **48/48**, each totaling 10 points.
- Prerequisite/JIT audits: **24/24**.
- Semantic lesson/task separation audit: **24/24**.
- Every lesson has actual instruction + `Worked example:` + `Guided check:`.
- Independent probability/expectation math checks cover dice counting, conditioning, trees, replacement, independence, pairwise-vs-mutual independence, exact-k paths, total probability, linearity, indicators and synthesis.
- Stable evidence identity continues to use versioned task IDs and assessment fingerprints.

## Preacceptance audit findings repaired before publication

A manual semantic read after static authoring found five weaknesses before M04 was accepted:

1. **S11** — Main quietly required complement-independence. Repaired so it only uses the product definition actually taught and recomputes the same joint after independence is established.
2. **S12** — used an unexplained second-draw symmetry shortcut. Repaired to derive the unconditional second-draw probability from explicit first-stage branches.
3. **S14** — worked example had essentially the same pairwise-but-not-mutual structure as the fixed assessment. Replaced with a genuinely mutually independent three-coin example plus an ordinary dependent pair.
4. **S21** — drifted into `E[XY]=E[X]E[Y]` / random-variable independence, which belongs later. Replaced with the finite nonlinear counterexample `E[X²]≠(E[X])²`.
5. **S24** — worked synthesis was too close in surface/data to the fixed task. Reworked to a distinct North/South damage model with different probabilities and values.

These were fixed in `d8c8bd678ff816e62c859ac4d3add327fcafd23f` before acceptance.

## Validation history

- Boundary run `35357495764` — **SUCCESS**.
- Initial content run `35358108648` — **FAILURE**, but M04's own static/pedagogy/math checks had passed. Failure was the historical M03 handoff checker still asserting that `m04.json` must not exist.
- Stop-boundary update run `35358184350` — **SUCCESS**.
- Shared-runtime integration run `35358320673` — **SUCCESS**.
- Preacceptance hardening run `35358556729` — **SUCCESS**, including four-module Chromium.
- Accepted-state run `35358756035` — **SUCCESS**, including four-module Chromium.

The old M03 stop guard was not weakened generically: it was advanced to protect M05/M06 after explicit user authorization to begin M04.

## Browser/evidence validation

The real Chromium workflow now verifies:

- module selector loads **M01 + M02 + M03 + M04**;
- M04 exposes exactly **24** local sessions;
- M04 task/session IDs resolve under stable `ARC048` IDs;
- M04 lesson use records guided provenance;
- navigate-away/back does not erase provenance state;
- M04 save records current contract hash + assessment fingerprint;
- evaluator reference remains save-locked;
- reveal/review attaches review to the original attempt;
- unsaved M04 Main and Transfer drafts survive M04→M01→M04;
- restored lesson provenance cannot be silently relabeled independent;
- answer-bearing compiler packet marks both M04 fixed tasks as reference-exposed;
- M01/M02/M03/M04 evidence coexists under one store;
- four-module export/import round-trips;
- corrupt evidence is preserved instead of silently reset;
- mobile-width invariant remains green.

Evidence key remains exactly:

`chrono_t22_elite_course_evidence_v1`

## Reviewer targets / remaining uncertainties

Astra should especially attack these areas:

1. **Conditional denominator discipline** — S07/S08: confirm every reversal or conditioning base is explicit and no hidden Bayes inversion occurs.
2. **Replacement protocol** — S10/S12: verify state updates and denominators are novice-safe.
3. **Independence hierarchy** — S11–S14: product criterion, conditional criterion, exclusivity distinction, and pairwise-vs-mutual independence.
4. **Repeated trials** — S15–S17: ensure exactly-k reasoning is derived from path counting rather than smuggling in a named distribution.
5. **Total probability / Bayes boundary** — S18: forward marginalization should be complete enough for M06 without teaching posterior inversion early.
6. **Expectation boundary** — S19–S23: weighted average, symmetry, linearity and indicators should be rigorous without drifting into formal distribution/variance machinery.
7. **S21 nonlinear guard** — verify `E[X²]≠(E[X])²` is enough to block the common “linearity applies to everything” misconception without prematurely teaching variance.
8. **Indicators under dependence** — S22: confirm the no-independence requirement is explicit and mathematically sound.
9. **Decision-theory boundary** — S23: expectation is explicitly not a universal preference/decision rule; M05 should still have real work to do.
10. **S24 synthesis** — verify it integrates M04 concepts without answer-equivalent rehearsal or posterior inversion.
11. **Semantic separation** — the 24/24 ledger is an audit record, not proof against every possible semantic echo; inspect classic probability examples manually.
12. **Difficulty calibration** — automated gates do not establish real learner retention or psychometric balance.

## Independent-review acceptance question

> Given accepted M03 foundations, does M04 teach enough finite probability, conditioning, independence and expectation for M05/M06/M26 to build cleanly, while keeping every assessment genuinely observable, novice-safe and within the stated boundary?

Any finding should be written as a bounded M04 finding. Do not repair M05 or M06 during M04 review.

## Review boundary

**STOP HERE. M04 is internally accepted and ready for independent review. M05 and M06 have not been authored.**

After review:

- repair bounded M04 findings and rerun the same gates; or
- if M04 is accepted, explicitly open the next agreed module boundary.

No merge to `main` and no deployment were performed.
