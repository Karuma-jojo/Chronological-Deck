# T22 Elite M04 / ARC048 — v2.0 pre-authoring design gate

Date: 2026-10-02  
Branch: `codex/t22-m04-godlike-v2`  
Baseline: `main@8e0120b228d900f0ff5c520560c02df7020c658d` plus deep-source audit `94663f536d5024a22579d4eb56ecb49f8677f319`  
Mode: **REPAIR / deep bounded reconstruction**  
Status: **Gate 0–3 design decision: preserve the 24 stable sessions and module ID; rebuild the pedagogy/evidence contract inside that architecture.**

This document applies the current T22 v1.2 builder/adversarial protocol after the deep-source audit. It does not treat the historical M04 freeze as invalid; it treats that freeze as provenance for an older quality standard. Stable IDs and prior learner evidence are preserved wherever their fixed assessment contracts remain unchanged. Materially changed public assessments receive new obligation versions/fingerprints.

---

## 0. Recovery receipt

- Repository authority: `Karuma-jojo/Chronological-Deck`.
- Stable module ID: `ARC048`.
- Historical pack: `m04-authoring-v1.2-astra-r1`, 24 sessions / 48 fixed tasks / 120 ownership claims.
- Historical evidence key remains `chrono_t22_elite_course_evidence_v1`.
- Historical accepted repairs that may not regress:
  - S11 derives complement-independence rather than assuming it;
  - all 120 claim mappings were semantically re-audited, with S05 claim 3 and S13 claim 5 intentionally Transfer-owned;
  - S22 derives without-replacement positional marginals from labelled ordered samples;
  - S04 does not invoke independence before S11.
- Fresh audit: `docs/t22-course/M04-DEEP-SOURCE-AUDIT-v1.0.md`.
- No M05/M06/M26 ownership is moved into M04.

The deep audit found a **systemic pedagogy/evidence deficit but not a fundamentally unsound mathematical skeleton**. Therefore this is not a structural rebuild. The 24-session identity is preserved, but the lesson surfaces, representation progression, evidence-distance ledger, wrong-solver tests, decision audits and selected fixed assessment contracts are rebuilt.

---

# 1. Boundary Contract

## Destination

After M04 the learner can independently:

1. define and audit a finite uncertainty model;
2. distinguish atomic outcomes, events and numerical payoffs;
3. assign/check finite probability mass without assuming uniformity;
4. use complements, unions, intersections and inclusion-exclusion coherently;
5. condition by changing the reference population/mass and track the denominator;
6. compute joints from conditionals and forward marginals through finite branches;
7. construct/read a finite probability tree and translate it to algebra or a two-way table;
8. distinguish replacement/dependence protocols;
9. establish or reject independence from probability criteria rather than causal intuition;
10. distinguish exclusivity, pairwise independence and mutual independence;
11. derive repeated-trial path, exactly-k and complement calculations from independence/counting;
12. use finite partitions and the law of total probability without reversing into Bayes;
13. compute and interpret finite expectations, use linearity and indicators, including under dependence;
14. organize an unfamiliar finite-probability problem without being handed the complete method.

## Entry

Direct macro prerequisite:

- **M03 · T22E-DISC01** — sets, Cartesian products, finite counting, combinations, inclusion-exclusion, proof/counterexample discipline.

Inherited through M03/M01/M02 where explicitly cited:

- fraction/decimal arithmetic;
- algebraic rearrangement;
- finite sums;
- ordered pairs;
- set complement/union/intersection;
- direct proof and counterexample habits.

No prior formal probability course is assumed.

## New objects / conventions

- random experiment;
- atomic outcome and finite sample space;
- event as subset;
- finite probability mass assignment;
- conditional probability notation and restricted reference population;
- probability tree branches/leaves;
- finite partition;
- event independence;
- pairwise versus mutual independence;
- repeated independent Bernoulli-style success/failure trials **without naming/owning a formal distribution**;
- finite payoff/value function notation;
- indicator variables as finite 0/1 functions;
- finite expectation.

## Deferred topics

Remain later-owned:

- Bayes inversion, base rates, posterior odds, likelihood ratios and sequential posterior updating → **M06**;
- fair-price decision policy, bankroll, drawdown/ruin, utility/risk preference, adversarial finite-game decisions → **M05**;
- formal random variables, PMFs/CDFs, variance, covariance/correlation, named distributions and conditional expectation → **M26**;
- Monte Carlo implementation/simulation engineering;
- LLN/CLT;
- continuous probability;
- measure-theoretic probability.

## Downstream obligations

- **M05:** must be able to consume finite event probabilities, complements, probability trees, repeated independent paths, finite expectation and linearity without reteaching them.
- **M06:** must be able to assume denominator discipline, conditioning direction, joint factorization, partitions/total probability and event independence before teaching posterior inversion.
- **M26:** must be able to treat M04 expectation/indicator notation as a bounded finite precursor, then formalize random variables/distributions.
- Later quant/statistics modules: need model-first probability reasoning rather than formula selection by keyword.

## Synthesis

Given an unfamiliar finite scenario containing partial counts/probabilities and a numerical outcome value, the learner must choose a usable representation, identify what is joint/conditional/marginal, compute only justified quantities, test an independence claim if relevant, and evaluate an expectation—while explicitly refusing an unavailable posterior or decision-theory conclusion.

---

# 2. Source Dossier

This dossier records epistemic roles, not a bibliography contest.

| Source | Role / material inspected | Design decision supported | Limits / deliberate non-import |
| --- | --- | --- | --- |
| Current repository authority | current M04, M05, M06, M26 boundaries; M03 v1.7.2 evidence standard; historical M04 review/repairs | Preserve ARC048 and 24 stable sessions; preserve closed Astra repairs; strengthen M06-facing conditioning and evidence machinery without stealing Bayes | Historical green CI proves its tested contract, not current pedagogy |
| MIT OCW 6.041/6.041SC | early probability models, conditioning/Bayes, independence, counting, expectation route | Treat conditioning, joint-factorization, branch/partition reasoning and independence as a connected early spine | MIT includes Bayes/random variables earlier than T22 ownership permits; do not import them |
| Blitzstein & Hwang, *Introduction to Probability*, 2e, user Drive copy | Ch.1 sample spaces/equiprobability/general finite probability; Ch.2 conditioning/independence; Ch.4 expectation/linearity/indicators | Equiprobable favourable/total is a special case; condition by changing reference mass; independence is factorization/invariance; indicators connect events to expected counts | Do not import Bayes, formal PMF development, variance or continuous probability into M04 |
| Grinstead & Snell, *Introduction to Probability* | finite models; conditional probability/independence; expectation | Independent mathematical comparator for finite definitions/examples | Simulation-rich route does not transfer Monte Carlo ownership into M04 |
| MAA *Instructional Practices Guide* | task selection, formative/summative alignment, conceptual versus procedural understanding | Tasks must observe intended reasoning; correct procedure is not automatically conceptual mastery | General undergraduate mathematics guidance, not validation of this learner |
| IES/WWC *Organizing Instruction and Study* | worked example/problem alternation; graphical+verbal and abstract+concrete connections; retrieval | Build explicit representation links and fade scaffolding | Heterogeneous evidence base; not a direct trial of T22 |
| Díaz & Batanero (2009), conditional-probability reasoning | transposed conditionals, time-axis misconception, base-rate/partition errors, independence/exclusivity confusion | S07–S09/S18 need denominator, direction, chronological-information and branch-weight discriminators | Population is introductory-statistics psychology students; frequencies are not treated as T22 forecasts |
| Konold et al. (1993), probability reasoning | outcome approach, representativeness, inconsistent reasoning, spurious correct answers | S15–S17 assessment must discriminate normative sequence reasoning from “anything can happen”/representativeness/gambler frameworks | Older college/secondary research; used as failure-mode evidence, not a unique optimal curriculum |
| Batanero & Álvarez-Arroyo, ZDM survey | sample-space/equiprobability/independence difficulties; multiple representations for conditional probability; probability modelling | Build a representation progression: explicit outcomes → two-way table → tree → partition algebra; reconnect model to context | Broad synthesis across populations/settings; no claim of direct outcome validation |

Deliberate non-imports: Bayes inversion, utility, formal distributions, variance/covariance, Monte Carlo implementation and asymptotic probability remain out.

---

# 3. Support-Theorem Ledger

| Result / bridge | Why needed | First consumer | Earlier owner? | M04 treatment | Boundary note |
| --- | --- | --- | --- | --- | --- |
| Event probability is the sum of atomic masses | nonuniform finite events | S02 | no probability owner | derive from disjoint atomic decomposition | finite only |
| Complement rule | S04 and later | S04 | set complement only in M03 | derive from partition of Ω | no independence language |
| Two-event inclusion-exclusion | overlapping unions | S06 | set version M03-S28 | derive probabilistically from disjoint pieces | finite events |
| Conditional probability | restricted reference mass | S07 | no | define and connect to table/list | finite (P(B)>0) |
| Multiplication rule | joint from conditional | S08 | no | algebraic rearrangement of definition | no Bayes inversion |
| Two-branch marginalization | tree totals | S09/S12 | no named law | derive by disjoint leaf addition | S18 later generalizes |
| Fixed-position marginal without replacement | indicator counts | S22 | historical repair | retain labelled ordered-sample proof | no symmetry handwave |
| Complement-independence | S11 Transfer | S11 | not prior-owned | retain explicit derivation from product definition + complement | no hidden theorem |
| Three-event mutual independence condition | S14 | pairwise only after S11 | define full three-event factorization condition locally | finite 3-event case |
| Exact-k path count | S16 | M03 combinations + S15 path product | components prior-owned | derive count × one-path probability | do not name binomial distribution |
| Finite total probability | S18 | two-branch concrete version S09 | no general owner | prove from partition and multiplication rule | no posterior inversion |
| Linearity of finite expectation | S21 | finite sums in M02 | probability-specific result new | derive from finite weighted sum | no independence required |
| (E[I_A]=P(A)) | S22 | no | derive from 0/1 values | finite indicators only |

---

# 4. Concept Dependency Graph

```text
M03 sets/counting
   │
   ├──> S01 experiment → atomic outcomes → sample-space audit
   │      │
   │      └──> S02 finite probability mass
   │              │
   │              ├──> S03 equiprobable counting
   │              ├──> S04 complement
   │              └──> S05 union/intersection
   │                         └──> S06 inclusion–exclusion
   │
   └──────────────────────────────> S07 conditioning / restricted reference mass
                                      │
                                      └──> S08 multiplication / joint
                                              │
                                              ├──> S09 tree + branch marginalization
                                              │       └──> S10 replacement protocols
                                              │               └──> S12 dependence via conditioning
                                              ├──> S11 product independence
                                              │       ├──> S12 conditional criterion
                                              │       ├──> S13 exclusivity contrast
                                              │       └──> S14 pairwise vs mutual
                                              └──> S18 general partition / total probability
                                                       ▲
S11 independence ──> S15 exact independent paths ──> S16 exactly-k ──> S17 complements
                                                       │
                                                       └──────────────> S18 uses partition thinking

S02 finite mass ──> S19 expectation ──> S20 uniform/symmetry
                                      └──> S21 linearity ──> S22 indicators
                                                           └──> S23 interpretation limits

all owned strands ───────────────────────────────────────────────> S24 synthesis
```

Why S18 stays at session 18: the module intentionally uses **concrete branch marginalization first** (S09/S12), then abstracts that operation to arbitrary finite partitions after the learner has experienced dependence, repeated paths and complement structure. This preserves stable IDs and creates a concrete→abstract progression rather than silently invoking a theorem before ownership. M06 then consumes the named general law.

---

# 5. Conceptual-Distinction Map

The learner must not collapse:

- experiment versus outcome versus event;
- sample-space choice versus physical object;
- event label versus atomic outcome;
- finite probability mass versus “all outcomes equally likely”;
- equiprobable atomic outcomes versus aggregated labels with unequal multiplicities;
- complement versus an “opposite-looking” event;
- disjoint versus independent;
- (Acup B) versus (Acap B);
- (P(Amid B)) versus (P(Bmid A));
- conditioning/information restriction versus physical causation;
- conditional probability versus joint probability;
- tree branch probability versus leaf probability;
- with replacement versus without replacement state;
- independence as a probability equality versus “separate stories”;
- pairwise versus mutual independence;
- exact sequence identity versus exact sequence probability;
- “random-looking” versus more probable;
- a partition-weighted overall rate versus the unweighted mean of subgroup rates;
- expectation versus probability, mode, attainable value, guarantee or preference;
- linearity of expectation versus nonlinear transformations;
- dependence of indicators versus validity of expectation linearity;
- forward total probability versus posterior inversion/Bayes.

---

# 6. Misconception / Failure-Mode Map

Evidence tag: `E` empirical/domain-specific; `T` mathematically plausible/T22-specific; `H` historically observed in prior M04 review.

| Failure model | Evidence | Required discriminator |
| --- | --- | --- |
| “The story determines the sample space automatically.” | E/T | S01 asks learner to reject an overlapping/insufficient recording scheme and choose atomic records. |
| “Finite = favourable/total.” | E/T | S02/S03 include nonuniform atoms where count ratio is wrong. |
| “The possible sums of two dice are equally likely.” | E | S03 multiplicity table/trap. |
| “The complement is the opposite-looking extreme.” | T | S04 at-least-one versus all. |
| “Add event probabilities even when they overlap.” | T | S05/S06 overlapping diagnostic. |
| “Conditioning means divide by the original total.” | E | S07 two-way-table denominator and nonuniform mass restriction. |
| (P(Amid B)=P(Bmid A)) | E | S07 direction-reversal pair. |
| “Later evidence cannot affect probability of an earlier event.” | E | S07/S08 chronological information problem; explicitly separate information from causation. |
| “Multiply marginals to get a joint.” | E/T | S08/S11 require a conditional or proven independence before factorization. |
| “Tree path = add branch probabilities.” | T | S09 wrong-solver leaf test. |
| “Replacement does not alter the next state.” | E/T | S10 paired protocols. |
| “Separate physical objects/events must be independent.” | T | S11 probability criterion dominates story. |
| “Disjoint = independent.” | E/H | S13 positive-probability counterexample. |
| “Pairwise independent = mutually independent.” | H/T | S14 XOR-style counterexample. |
| “After a run, the opposite is due.” | E | S15 run-following diagnostic. |
| “Mixed-looking sequence is more likely.” | E | S15 exact-sequence comparison. |
| “Exactly k = one representative path.” | T | S16 arrangement count. |
| “At least one should be direct-added.” | T | S17 complement comparison. |
| “Overall rate is the simple average of subgroup rates.” | E | S18 unequal branch weights and wrong-solver table. |
| “Total probability answers the reverse conditional.” | E | S18 explicitly withholds posterior. |
| “Expected value is the most likely/guaranteed result.” | E/T | S19/S23. |
| “Average distinct payoff labels regardless of multiplicity.” | T | S20. |
| “Linearity needs independence.” | H/T | S21. |
| (E[g(X)]=g(E[X])) | H/T | S21 square counterexample. |
| “Dependent indicators cannot be added in expectation.” | H/T | S22 without-replacement count. |
| “Largest/equal expectation decides preference.” | T | S23 M05 boundary. |
| “One memorized formula can organize any probability problem.” | T | S24 requires representation/method choice. |

---

# 7. Representation Progression Map

The learner-facing delivery surface is text-based, so representations are constructed with rendered-safe labelled rows and Unicode branch markers; no capability is claimed from decorative formatting alone.

| Representation / action | Introduce → connect → fade/reuse | Independent evidence |
| --- | --- | --- |
| Atomic outcome register / explicit sample-space list | S01 construct and audit → S03 multiplicity → later finite examples | S01 Main/Transfer |
| Atomic probability ledger | S02 → S03 nonuniform contrast → S19 payoff weighting | S02, S19 |
| Event-region ledger (inside A only / B only / both / neither) | S05 → S06 inclusion-exclusion | S06 Transfer |
| Two-way count/mass table | S07 read/construct → connect to conditional numerator/denominator → reuse S18 | S07 Transfer, S18 Transfer |
| Restricted-universe list | S07 connect to table and probability mass | S07 Main |
| Probability tree | S09 actual branch artifact → S10 state change → S12 dependence → S18 partition relation | S09 Main/Transfer, S10 |
| Path/sequence string | S15 → combination-of-paths S16 → complement S17 | S15–S17 |
| Partition contribution table | S18 connect table ↔ tree ↔ (sum P(B_i)P(Amid B_i)) | S18 Main/Transfer |
| Payoff/value table | S19 → multiplicity/symmetry S20 → affine transformations S21 | S19–S21 |
| Indicator sum | S22 connect event probability to expected count | S22 |
| Representation-choice synthesis | S24 no representation supplied; learner chooses list/table/tree/algebra and justifies | S24 Main/Transfer |

A representation only counts as “owned” when the public task actually asks the learner to read/construct/translate it.

---

# 8. Downstream Obligation Map

| Later module | Exact M04 exit capability | Tempting machinery kept later |
| --- | --- | --- |
| M05 T22E-TRD01 | finite models, event probabilities, complements, trees, repeated independent paths, expectation, linearity | utility, bankroll, ruin, fair-price policy, adversarial decisions |
| M06 ARC502 | directionally correct conditional probability, joint rule, two-way table/tree reading, total probability, independence | Bayes inversion, posterior odds/LRs, sequential updates |
| M26 ARC517 | finite numerical functions/payoffs, expectation, indicators | PMF/CDF formalism, named distributions, variance/covariance, conditional expectation |
| Later quant/stat modules | choose and audit finite probability structures | asymptotics, stochastic processes, inference |

The largest downstream repair priority is M06 readiness.

---

# 9. Narrative Spine

The module follows one question:

> **What changes when uncertainty is modeled more precisely?**

1. First decide **what one outcome is** and whether the finite model is legal.
2. Then combine events without double-counting.
3. Next ask what happens when **information changes the reference population**.
4. Turn conditionals into joints and make multi-stage structure visible with trees.
5. Ask when observing one event **does or does not change** another: dependence and independence.
6. Use independence to build repeated paths, then count/complement whole families of paths.
7. Generalize branch addition into partition-weighted total probability.
8. Attach numerical values to outcomes and aggregate them by expectation.
9. End by forcing the learner to decide what structure/representation is appropriate rather than following a supplied recipe.

This is a model-building route, not a formula catalogue.

---

# 10. Candidate Pedagogical Atoms

The 24 existing atoms remain mathematically defensible after the deep audit. Their pedagogy is rebuilt.

| S | Central atom | Why it remains separate |
| ---: | --- | --- |
| 01 | atomic outcomes, sample-space construction/audit, events | model granularity must precede probability |
| 02 | finite probability mass and normalization | separates probability assignment from counting |
| 03 | equiprobability + multiplicity counting | explicit special case and common trap |
| 04 | complement and boundary events | foundational event transformation |
| 05 | union/intersection + disjoint addition | semantic event algebra before overlap correction |
| 06 | inclusion-exclusion | new overlap-correction mechanism |
| 07 | conditioning as restricted/renormalized reference mass | denominator/direction concept merits its own acquisition |
| 08 | multiplication rule / joint-conditional translation | turns restricted probability into joint structure |
| 09 | tree representation + concrete branch marginalization | new representation and path logic |
| 10 | replacement protocol/state update | same tree machinery, new data-generating state |
| 11 | product independence | definition-level factorization |
| 12 | conditional criterion / dependence diagnosis | invariance interpretation and branch computation |
| 13 | exclusivity versus independence | documented misconception contrast |
| 14 | pairwise versus mutual independence | higher-order structural distinction |
| 15 | exact repeated independent paths + randomness misconceptions | sequence probability before count aggregation |
| 16 | exactly-k via combinations | many equal-probability paths |
| 17 | none/at-least-one/all via complement | strategy compression |
| 18 | general partitions + total probability | abstract generalization of S09 branch marginalization |
| 19 | finite expectation | new numerical aggregation object |
| 20 | uniform atomic averaging + multiplicity/symmetry | protects against averaging labels |
| 21 | linearity | powerful structural law and nonlinear boundary |
| 22 | indicators / expected counts under dependence | converts event probabilities to counts |
| 23 | expectation interpretation limits | explicit M05 handoff |
| 24 | whole-module model/representation choice | independent synthesis rather than recipe following |

---

# 11. Split/Merge Justification

No merge is justified:

- S07 and S08 should not merge because the learner first needs the meaning/denominator of conditioning before algebraically rearranging it.
- S09 and S10 should not merge because “read/build a tree” and “update the state under removal” are distinct learner decisions.
- S11–S14 are deliberately separated because each attacks a different independence misconception and the historical repaired block is strong.
- S15–S17 remain separate: exact path → count family → complement strategy is a useful fade.
- S19–S23 remain separate because expectation definition, atomic averaging, linearity, indicator decomposition and interpretation limits are distinct acquisitions.

No new session is added merely for representations. Representations are threaded through the existing atoms and then independently assessed.

The architecture is therefore **KEEP 24**, but this is a reasoned re-derivation, not inertia.

---

# 12. Candidate Session Architecture and evidence intent

| S | Modernized title / emphasis | Main intent | Transfer intent |
| ---: | --- | --- | --- |
| 01 | Experiments, atomic outcomes & sample-space audits | fresh model audit | changed recording scheme / repair invalid space |
| 02 | Finite probability mass, axioms & normalization | retrieval/application | error diagnosis in proposed mass ledger |
| 03 | Equiprobable counting & multiplicity | fresh multiplicity check | changed representation: aggregate labels → atoms |
| 04 | Complements & boundary events | retrieval | reverse-direction/error diagnosis |
| 05 | Union/intersection & disjoint addition | retrieval | region-ledger changed surface |
| 06 | Inclusion–exclusion | retrieval/application | infer missing overlap from region/account data |
| 07 | Conditional probability: restricted mass, tables & direction | fresh Main evidence | changed-surface two-way table + time-axis diagnostic |
| 08 | Joint ↔ conditional multiplication | retrieval | diagnose illegal marginal multiplication |
| 09 | Probability trees: branch, path & marginal | fresh representation evidence | changed-surface tree repair |
| 10 | Replacement as state change | retrieval | compare protocols from a partially specified tree |
| 11 | Product independence | retrieval/proof reconstruction | changed-surface factorization diagnosis |
| 12 | Conditioning criterion & dependence | retrieval/application | changed surface: static table/marginal data |
| 13 | Disjointness versus independence | proof/reasoning | construct independent non-disjoint example |
| 14 | Pairwise versus mutual independence | fresh Main | changed-surface finite-set construction |
| 15 | Exact paths & randomness fallacies | fresh misconception discriminator | error diagnosis of representativeness/gambler reasoning |
| 16 | Exactly-k from path count | retrieval derivation | reversed direction: infer one-path/count component |
| 17 | Complement strategy | strategy choice | error diagnosis/direct-vs-complement choice |
| 18 | Partitions, tables & total probability | fresh weighted-marginal evidence | changed-surface table/tree/error diagnosis |
| 19 | Finite expectation | retrieval/application | changed surface payoff table |
| 20 | Uniform expectation, multiplicity & symmetry | retrieval/application | changed-surface duplicated-label audit |
| 21 | Linearity & nonlinear boundary | proof reconstruction | changed-surface affine expression/error diagnosis |
| 22 | Indicators & expected counts | proof/application | changed-surface committee count |
| 23 | Expectation is not a decision rule | interpretation | error diagnosis of “higher/equal EV decides” |
| 24 | Synthesis: choose the probability model | fresh synthesis | changed-surface audit of another solver/model |

---

# 13. Pilot decision

The representative repair pilot is **S07** because it is both a deep-audit blocker and a direct M06 prerequisite.

S07 must pass this vertical slice before the same pattern is propagated:

- Orient around a denominator disagreement, not a formula.
- Define conditioning as restriction and renormalization of probability mass.
- Connect explicit sample-space lists and a real 2×2 count table.
- Work one **nonuniform** example, not only equiprobable counting.
- Guided practice leaves the denominator/reference-population step to the learner.
- Main does not print the complete method.
- Transfer uses an actual table and a chronological-information misconception.
- Wrong solver using the original denominator or reversed conditional loses targeted credit.
- No Bayes inversion is requested or supplied.
- Rendered table/tree text remains readable in the learner UI.

Once S07 passes, S09/S15/S18/S24 receive the same blocker-level treatment; then the full 24-session lesson/evidence retrofit can be completed.

---

## Gate 3 disposition

**PASS_WITH_EVIDENCE for 24-session sizing.**

The deep audit does not justify a destructive structural rebuild. It justifies a **deep bounded reconstruction** that preserves module/session IDs while materially upgrading instruction, representations and evidence.

No M05/M06 authoring is authorized by this repair.
