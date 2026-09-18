# M06 review handoff — Bayes, Base Rates & Sequential Updating

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M06 · ARC502 — Bayes, Base Rates & Sequential Updating**  
M06 content/integration checkpoint: `66deecfa1f21b7730e702c4c0587a1f021212319`  
Forward-compatibility guard checkpoint: `4b9ab7d2dd81575018aaaa4ede0a524525eb933f`  
Status: **INTERNAL ACCEPTED — REVIEW HANDOFF CREATED; STOP BEFORE M07**

## Authority

Direct macro prerequisite: **M04 · ARC048**.

M04 is independently accepted in `M04-ASTRA-FOLLOWUP.md`.

M06 also preserves the core intent of the historical ARC502 authority in `js/data/t22-rich-module-19.js`:

- base-rate problems;
- Bayes from conditional probability;
- odds and likelihood ratios;
- sequential updating;
- prior sensitivity and model dependence.

The new 24-session pack expands those five macro arcs into novice-usable, independently assessable sessions while preserving later-module boundaries.

M05 is separately completed, but M06 does **not** depend on M05 utility/bankroll decision theory.

## What M06 owns

At finite/discrete level, M06 owns:

- P(E|H) versus P(H|E) denominator discipline;
- base rates / prevalence through natural-frequency tables;
- hit/false-positive interpretation;
- posterior reconstruction directly from counts;
- posterior identifiability / missing-input diagnosis;
- Bayes derivation from two joint factorizations;
- total-probability evidence denominators;
- binary Bayes calculation;
- finite multi-hypothesis normalization;
- frequency-table versus algebra cross-checking;
- incomplete hypothesis-set / omitted-alternative diagnosis;
- probability ↔ odds conversion;
- likelihood ratios as evidence multipliers;
- derivation of posterior odds = prior odds × LR;
- LR >1, =1, <1 interpretation;
- same-LR / different-prior behavior;
- sequential posterior-as-next-prior updating;
- chain-rule joint evidence likelihood;
- conditional independence given each hypothesis;
- LR multiplication only when both hypothesis-conditional factorizations justify it;
- duplicate/dependent evidence and double-counting diagnosis;
- exact-joint update-order discipline;
- prior-sensitivity analysis;
- likelihood/model-sensitivity analysis;
- integrated calibrated Bayesian evidence audit.

## Explicit non-ownership

M06 does **not** own:

- M05 utility, bankroll or decision policy;
- M07 prices, returns, long/short P&L, bid/ask, order types or fills;
- M26 continuous/formal random-variable distribution machinery;
- M33 likelihood construction/MLE;
- M35 likelihood-ratio hypothesis-test optimality;
- conjugate priors, posterior predictive modeling or Bayesian parameter estimation;
- continuous-density Bayes;
- MCMC / particle methods;
- Bayesian networks / HMM / filtering;
- Bayes-optimal actions / formal Bayesian decision theory.

## Package state

- Sessions: **24**
- Fixed assessments: **48**
- Required ownership claims: **120**
- Claim observability: **120/120 exact Main public-task → exact rubric criterion**
- Evaluator totals: **48/48 = 10**
- Semantic instruction-separation: **24/24**
- Instruction version: `m06-instruction-v1`
- Authoring version: `m06-authoring-v1.0-internal-accepted`
- Course metadata: `T22E-course-0.6.0-m06`
- Shared evidence key unchanged: `chrono_t22_elite_course_evidence_v1`

## Teaching safeguards carried forward

Every session teaches before testing with a worked example and guided check distinct from both fixed tasks.

The module repeatedly forces the learner to distinguish:

- conditioning direction and denominator;
- prior/base rate versus posterior;
- likelihood versus posterior;
- evidence probability versus likelihood;
- likelihood ratio versus probability;
- prior odds versus posterior odds;
- marginal evidence likelihood from chain-rule conditional likelihood;
- unconditional independence from conditional independence;
- genuinely new evidence from duplicated evidence;
- exact Bayesian arithmetic from uncertainty about the model inputs.

Bayes is derived before odds-form shortcuts are used.

Natural frequencies precede formula-heavy work.

## Assessment safeguards carried forward

Every required ownership claim is explicitly requested in Main and pinned to the exact rubric criterion that scores it.

Scoring treats these as first-class obligations rather than optional prose:

- denominator direction;
- mutually exclusive/exhaustive hypothesis set;
- nonzero conditioning denominator;
- conditional-independence assumption;
- missing-input / non-identifiability diagnosis;
- no unsupported posterior from an LR alone;
- no double-counting of duplicated evidence;
- sensitivity conclusions conditional on stated priors/likelihoods.

All new M06 fixed tasks launch at `obligationVersion=1`.

## Provenance / runtime safeguards

No new evidence store was introduced.

Evidence key remains:

`chrono_t22_elite_course_evidence_v1`

The six-module runtime preserves:

- prompt/evaluator assessment fingerprints;
- lesson assistance provenance;
- save/reveal/review attachment;
- answer-bearing packet exposure for both fixed tasks;
- M06→M01→M06 unsaved Main/Transfer draft + assistance provenance;
- M01–M06 evidence coexistence/export/import;
- corrupt-store preservation.

No historical answer-exposure migration is required for M06 because it launches with separated instruction.

## Persistent validation

New gates:

1. `scripts/test-t22-elite-m06.mjs`
   - 24/48/120 structure;
   - exact claim/request/rubric links;
   - 10-point evaluator totals;
   - prerequisite and semantic-separation ledgers;
   - denominator/completeness/dependence boundary guards.

2. `docs/t22-course/audit/m06-independent-math.mjs`
   - independently re-derives base-rate counts;
   - Bayes denominators and binary/multi-hypothesis posteriors;
   - odds/LR conversions;
   - sequential odds;
   - chain-rule joint likelihoods;
   - conditional-independence factorization;
   - duplicate-evidence LR;
   - prior and likelihood sensitivity;
   - S24 integrated posterior.

3. Shared Chromium regression source now covers M06:
   - six module options;
   - 24-session M06 scoping;
   - save/reveal/review under stable `ARC502` IDs;
   - M06 draft/provenance round trip;
   - answer-bearing packet exposure;
   - M01–M06 export/import coexistence.

4. Older M04/M05 handoff gates were made forward-compatible:
   - they continue to freeze their own module invariants and source registration;
   - they no longer falsely require the global course-meta version to remain at the historical M04/M05 value;
   - both retain the hard M07 stop.

Connector-side final deterministic checks found:

- no session/claim/rubric/separation failures;
- all M06 structural scripts parse;
- 38 sampled/repair-sensitive mathematical equalities/checks pass;
- M04, M05 and M06 semantic statuses all remain `accepted`;
- module sources are exactly M01–M06;
- M07 remains `planned`.

The GitHub connector available here does not enumerate push-triggered Actions runs, so this handoff does not fabricate a CI run number. The workflow includes M01–M06 static/math/handoff gates and the real Chromium evidence workflow; reviewers should inspect the Actions run attached to the exact final head.

## Reviewer attack targets

1. Does any base-rate lesson still invite P(E|H) ↔ P(H|E) reversal?
2. Are all Bayes denominators complete and explicit?
3. Does S05 correctly refuse non-identifiable posteriors instead of inventing missing inputs?
4. Is multi-hypothesis normalization complete and is omitted-model risk clear?
5. Are odds and LR kept separate from probabilities/posteriors?
6. Is posterior-odds form genuinely derived from Bayes?
7. Does sequential updating use each evidence item exactly once?
8. Are chain-rule conditionals used before any independence shortcut?
9. Does LR multiplication require conditional independence under **both** hypotheses?
10. Does duplicate evidence correctly contribute conditional LR=1 after the original?
11. Are sensitivity analyses careful to distinguish arithmetic certainty conditional on a model from uncertainty about priors/likelihoods?
12. Does S24 avoid drifting into a recommendation/decision rule?
13. Are all 120 ownership links semantically real rather than positional?
14. Does the six-module evidence runtime remain provenance-safe?
15. Is M07 still completely untouched?

## Stop boundary

**STOP HERE. Do not author M07.**

Next work should be independent review of the M05 and M06 handoffs/checkpoints (or a bounded follow-up if reviewers find issues).

No merge to `main`, deployment, T25 modification, legacy T22 migration or M07 authoring was performed.
