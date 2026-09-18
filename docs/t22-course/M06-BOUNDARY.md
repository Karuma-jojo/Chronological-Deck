# M06 boundary — Bayes, Base Rates & Sequential Updating

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Stable module ID: `ARC502`  
Status: **INTERNAL ACCEPTED — REVIEW HANDOFF CREATED; M07 CLOSED**

## Entry authority

M04 · `ARC048` is the direct macro prerequisite and is independently accepted.

M05 has its own separate completed checkpoint, but M06 does **not** depend on M05 decision theory. M06 must remain a probability-updating module.

M06 may reuse from M04:

- conditional probability and conditioning-direction discipline;
- multiplication rule / joint factorizations;
- complements;
- finite partitions and total probability;
- probability trees;
- independence and conditional-probability reasoning;
- finite arithmetic, ratios and algebra from transitive M01–M03 foundations.

## M06 destination

The learner should be able to:

1. distinguish P(E|H) from P(H|E) and diagnose base-rate neglect;
2. reconstruct posteriors from finite frequency tables before relying on formulas;
3. derive Bayes' rule from two joint factorizations and total probability;
4. normalize correctly over a complete finite hypothesis partition;
5. identify when a posterior is not identifiable because required inputs are missing;
6. convert between probability and odds;
7. interpret a likelihood ratio as an evidence multiplier, not a probability;
8. derive posterior odds = prior odds × likelihood ratio;
9. perform sequential updates using posterior-as-next-prior;
10. derive joint evidence likelihoods with the chain rule;
11. multiply likelihood ratios only when conditional-independence assumptions justify it;
12. diagnose duplicated/dependent evidence and explain why naive repeated multiplication overstates support;
13. stress-test posterior conclusions to plausible prior and likelihood/model changes;
14. state posterior conclusions as conditional on the stated hypothesis set and evidence model.

## Frozen 24-session route

S01 conditioning direction: P(E|H) versus P(H|E)  
S02 base rates by finite frequency table  
S03 true positives / false positives under prevalence  
S04 reconstruct posterior from counts without a memorized formula  
S05 posterior identifiability: what inputs are required?  
S06 derive binary Bayes from joint probability factorizations  
S07 denominator construction with total probability  
S08 direct binary Bayes calculation  
S09 multi-hypothesis Bayes normalization  
S10 frequency-table versus algebra cross-check  
S11 incomplete hypothesis sets and omitted alternatives  
S12 probability ↔ odds conversion  
S13 likelihood ratios as evidence multipliers  
S14 posterior-odds identity derivation  
S15 LR interpretation: >1, =1, <1  
S16 same likelihood ratio under different priors  
S17 sequential updating: posterior becomes next prior  
S18 joint evidence likelihood via the chain rule  
S19 conditional independence given a hypothesis  
S20 multiplying likelihood ratios under conditional independence  
S21 dependent/duplicated evidence, double counting and update-order discipline  
S22 prior-sensitivity analysis  
S23 likelihood/model sensitivity and omitted-hypothesis robustness  
S24 integrated Bayesian evidence audit and calibrated conclusion

## Explicitly out of scope

M06 must not own:

- finite decision utility, bankroll or trading-game choice rules — M05;
- market prices, returns or trading mechanics — M07;
- formal random-variable distributions, densities, conditional expectation or covariance — M26;
- likelihood construction/MLE over unknown parameters — M33 / ARC531;
- likelihood-ratio hypothesis testing optimality — M35 / ARC534;
- Bayesian parameter estimation, conjugate priors, posterior predictive distributions;
- continuous-density Bayes;
- MCMC/particle methods;
- Bayesian networks/HMM/filtering;
- Bayes-optimal actions / formal Bayesian decision theory.

## Teaching safeguards

Every session must:

- derive before naming shortcuts where possible;
- use a worked example and guided check numerically/surface-distinct from fixed assessments;
- explicitly name conditioning denominators;
- keep priors, likelihoods, evidence probability, likelihood ratios, posterior odds and posterior probabilities distinct;
- state completeness/exclusivity of hypothesis partitions when normalizing;
- state any conditional-independence assumption before multiplying evidence terms;
- treat model inputs as assumptions, not automatically true facts.

## Assessment safeguards

- 24 sessions, two fixed tasks per session.
- Five ownership claims per session.
- Exact public-task → exact rubric evidence mapping for every claim.
- No claim gets credit for a nearby but different concept.
- Every evaluator totals 10 points.
- New fixed tasks start at `obligationVersion=1`.
- Any material later change must version only that assessment, preserving stale prior evidence through fingerprints.

## Provenance safeguards

Continue the unchanged shared evidence key:

`chrono_t22_elite_course_evidence_v1`

Preserve shared fingerprints, lesson provenance, packet exposure, unsaved-draft provenance, review attachment, cross-module export/import and corrupt-store preservation.

## Stop boundary

Complete, validate and hand off M06 separately.

**STOP AFTER M06. Do not author M07.**


## Completion update

M06 is internally accepted at authoring version `m06-authoring-v1.0-internal-accepted` and integrated in course metadata `T22E-course-0.6.0-m06`.

Review handoff: `M06-REVIEW-HANDOFF.md`.

**M07 remains closed.**
