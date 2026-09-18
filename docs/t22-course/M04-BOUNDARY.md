# M04 boundary & authoring contract — ARC048

Date: 2026-09-18  
Status: **semantic boundary accepted; content candidate may be authored; M05/M06 remain closed**

## Semantic ancestry

Required macro prerequisite:

- **M03 · T22E-DISC01** — sets/events, finite counting, combinations, inclusion-exclusion, mappings, proof/counterexample discipline.

M01/M02 are inherited transitively through M03 and are not duplicated as direct macro edges.

## Ownership

M04 owns:

- experiments, outcomes, finite sample spaces and events;
- finite probability models and normalization;
- equally likely finite models and favorable/total counting;
- complements, unions, intersections and finite probability addition rules;
- conditional probability as a restricted/reweighted sample space;
- the multiplication/intersection rule;
- finite probability trees and sequential probability;
- sampling with and without replacement;
- event independence via both product and conditional criteria;
- dependence diagnosis and the difference between independence and mutual exclusivity;
- pairwise versus mutual independence in finite examples;
- repeated independent trials, ordered paths, exactly-k success counts and complement strategies;
- partitions and the law of total probability;
- expectation of a finite numerical payoff/function as a probability-weighted average;
- linearity of expectation in finite settings;
- indicators and expected counts without requiring independence;
- expectation-versus-most-likely/guaranteed-result distinctions;
- a finite stopping/problem-of-points style synthesis using conditional branches;
- one mixed M04 synthesis.

M04 explicitly does **not** own:

- payoff optimization, fair price as a trading decision, bankroll, drawdown, ruin, utility or adversarial decision strategy → **M05 · T22E-TRD01**;
- Bayes' rule, base-rate inversion, likelihood ratios or sequential posterior updating → **M06 · ARC502**;
- formal random variables, PMFs/CDFs, variance, covariance/correlation, named distributions, continuous densities or conditional expectation → **M26 · ARC517**;
- Monte Carlo simulation/coding → **M08/M31**;
- asymptotic laws such as LLN/CLT → **M28 · ARC712**;
- measure-theoretic probability.

## Atomic route — 24 sessions

01. Random experiments, outcomes, sample spaces & events  
02. Finite probability models, axioms & normalization  
03. Equally likely outcomes & counting probability  
04. Complements, certainty, impossibility & “at least one” basics  
05. Union, intersection & the addition rule  
06. Two-event inclusion–exclusion in probability  
07. Conditional probability as a restricted universe  
08. Multiplication rule & intersections from conditionals  
09. Probability trees & multi-stage paths  
10. Sampling with vs without replacement  
11. Independence via the product rule  
12. Independence via conditioning; diagnosing dependence  
13. Mutual exclusivity vs independence  
14. Pairwise vs mutual independence  
15. Repeated independent trials & ordered success/failure paths  
16. Exactly-k successes via combinations  
17. Complement strategy for none / at least one / all  
18. Partitions & the law of total probability  
19. Finite expectation as a probability-weighted average  
20. Expectation under equally likely finite outcomes & symmetry  
21. Linearity of expectation  
22. Indicators & expected counts without independence  
23. Expectation is not “most likely”, “guaranteed” or a decision rule  
24. M04 synthesis — conditioning, independence, counting & expectation

## Downstream bridge obligations

M04 must leave the learner ready for:

- **M05:** evaluate finite payoff tables and compare uncertainty structures without having M04 teach bankroll/utility/fair-price policy;
- **M06:** derive Bayes from conditional probability + total probability rather than memorizing a formula;
- **M25/M26:** interpret samples/events and then formalize random variables/distributions later;
- **M54:** understand finite-state payoff probabilities before asset-pricing/no-arbitrage work.

## Publication gate

Before M04 is marked authored:

1. all 24 sessions have novice instruction, a genuinely worked example, guided check, Main + Transfer and 10-point evaluators;
2. every ownership claim is tied to the exact public task that actually observes it, not mechanically defaulted to Main;
3. every new symbol/operation has an M03/prior-M04/JIT source;
4. all 48 fixed tasks pass both literal **and recorded semantic** instruction-separation audit;
5. conditional-probability denominators and zero-probability edge cases are explicit;
6. independence claims are checked by definition, not inferred from intuition;
7. expectation tasks distinguish weighted average from probability, typical value and decision quality;
8. all references/counts are independently re-derived;
9. changed assessment contracts use obligation versions/fingerprints rather than equivalence shortcuts;
10. M04 loads through the existing shared runtime and retains `chrono_t22_elite_course_evidence_v1`;
11. Chromium validates M04 module/session scope, save/reveal/review, draft provenance, packet exposure and 4-module export/import;
12. only after all gates pass may semantic status/roadmap become accepted/authored;
13. create `M04-REVIEW-HANDOFF.md` and stop. Do not author M05 or M06.

## Review emphasis

Independent review should especially attack:

- conditional-probability denominator discipline;
- independence versus exclusivity;
- pairwise versus mutual independence;
- with/without-replacement reasoning;
- total-probability partition logic;
- expectation linearity without accidental independence assumptions;
- indicator expectations;
- semantic lesson/task leakage in classic probability puzzles;
- whether any M05/M06/M26 concept was pulled upstream prematurely.
