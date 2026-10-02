# M04 Deep-Source Audit v1.0 — Finite Probability, Conditional Probability, Independence & Expectation

Date: 2026-10-02  
Audit branch: `codex/t22-m04-deep-source-audit`  
Exact baseline audited: `main@8e0120b228d900f0ff5c520560c02df7020c658d`  
Authoring pack audited: `course/t22/authoring/m04.json`  
Baseline pack version: `m04-authoring-v1.2-astra-r1`  
Status: **AUDIT ONLY — NO CONTENT REPAIR, REORDERING, TASK VERSIONING OR DISPOSITION DECISION IN THIS DOCUMENT**

This audit deliberately reopens the *design case* for M04 after the later T22 v1.2 protocol became substantially stricter. Historical M04 acceptance, the Astra repairs and their green CI remain valid provenance. They are not treated as proof that M04 satisfies the newer source-dossier, representation-progression, evidence-distance, learner-decision and wrong-solver requirements.

The next decision is intentionally deferred. This document supplies the evidence needed to choose later among **accept with documentary retrofit**, **bounded/deep repair**, or **structural rebuild**.

---

## 1. Audit question

> If M04 were being designed today from the repository boundary plus serious probability texts and probability-education evidence, would the current 24-session route, instruction, representations and fixed evidence be the route we would deliberately choose?

Subquestions:

1. Is the mathematical boundary correct?
2. Is the concept order justified rather than inherited?
3. Are the major distinctions and misconceptions actually taught and tested?
4. Are the representations probability learners need actually delivered, connected and reused?
5. Do Main/Transfer tasks demonstrate the claimed reasoning distance rather than merely use different numbers?
6. Does M04 leave M05 and M06 the right prerequisites without stealing their content?
7. Which parts of the historical module are strong enough to preserve?

---

# 2. Source-role stack actually inspected

## A. Repository / curriculum authority

Inspected:

- `course/t22/authoring/m04.json`
- `docs/t22-course/M04-BOUNDARY.md`
- `docs/t22-course/M04-REVIEW-HANDOFF.md`
- `docs/t22-course/M04-ASTRA-REVIEW.md`
- `docs/t22-course/M04-RESOLUTION.md`
- `docs/t22-course/M04-ASTRA-FOLLOWUP.md`
- `docs/t22-course/audit/m04-independent-math.mjs`
- `scripts/test-t22-elite-m04.mjs`
- downstream prerequisite use in current `m05.json` and `m06.json`
- historical richer ARC048 design in `js/data/t22-rich-module-17.js`
- current T22 Module Builder and Adversarial Checker v1.2

Repository authority remains decisive on ownership. No textbook is allowed to move Bayes, utility, PMFs, variance, simulation engineering or LLN/CLT into M04 merely because a textbook teaches them nearby.

## B. Canonical university-course route comparator

**MIT OpenCourseWare 6.041 / 6.041SC — Probabilistic Systems Analysis and Applied Probability**

Inspected the official lecture route:

1. Probability Models and Axioms
2. Conditioning and Bayes’ Rule
3. Independence
4. Counting
5. Discrete Random Variables / PMFs / Expectations
6+ later probability machinery

Relevant route lesson: conditioning, multiplication/total-probability structure and independence form one early conceptual cluster. MIT of course includes Bayes and random variables that T22 intentionally defers.

Source:
- https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/pages/unit-i/
- https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/pages/lecture-notes/

## C. User-supplied deep textbook comparator

**Joseph K. Blitzstein & Jessica Hwang, _Introduction to Probability_, 2nd ed.**  
User Drive copy inspected directly.

Relevant sections inspected:

- Ch. 1: sample spaces / Pebble World; equiprobable “naive” probability; counting; general finite probability
- Ch. 2: conditioning; multiplication/total probability; independence; pitfalls/paradoxes
- Ch. 4: expectation; linearity; indicators

Design lessons extracted:

- favourable/total is a special equiprobable model, not the definition of probability;
- conditioning changes the reference probability space/reference population;
- (P(Amid B)) and (P(Bmid A)) are structurally different;
- independence is a factorization/invariance property, not vague “unrelatedness”;
- linearity of expectation does not require independence;
- indicators are a powerful bridge from event probabilities to expected counts.

Deliberately not imported: Bayes/posterior updating into M04, formal PMF/random-variable development, variance, continuous probability and later processes.

## D. Independent broad/open mathematical comparator

**Charles M. Grinstead & J. Laurie Snell, _Introduction to Probability_, 2nd ed. / CHANCE edition**

Relevant sections inspected:

- Ch. 1: discrete probability models
- Ch. 3: combinatorial probability as a comparator only; M03 owns the counting machinery
- Ch. 4.1: discrete conditional probability and independence
- Ch. 6.1: expected value

Use: cross-check definitions, finite examples, conditional probability, independence and expectation against a second mature treatment.

Deliberately not imported: simulation as M04 ownership, early full random-variable formalism, continuous probability or asymptotics.

## E. General undergraduate mathematics pedagogy

**MAA Instructional Practices Guide (2018)**

Relevant sections inspected:

- CP.2 — selecting mathematical tasks
- AP.1 — assessment aligned to learning outcomes
- AP.3.3 — what a problem intends to assess versus what it actually assesses
- AP.5 — conceptual understanding versus procedural performance
- Design Practices / learning outcomes

Important audit implication: a learner can execute a procedure correctly while lacking the conceptual model that makes the computation valid. A task must be inspected for the actual reasoning it elicits.

## F. General learning evidence

**Pashler et al. / IES-NCER, _Organizing Instruction and Study to Improve Student Learning_**

Relevant recommendations used cautiously:

- alternate/interleave worked examples with problem solving;
- combine verbal and graphical representations;
- connect abstract and concrete representations;
- use retrieval/quizzing;
- ask deep explanatory questions.

Population/evidence warning: heterogeneous evidence base, not direct experimental validation of an adult T22 learner or of this module.

## G. Domain-specific probability-education synthesis

**Carmen Batanero & Rocío Álvarez-Arroyo, “Teaching and learning of probability,” ZDM Mathematics Education**

Relevant findings inspected:

- persistent learner difficulties with sample-space evaluation, proportionality, independence and equiprobability;
- representativeness and base-rate related biases can survive formal education;
- probability instruction increasingly studies multiple visual representations;
- Venn diagrams, two-way tables, trees/double trees, icon arrays and unit-square representations can lead to different strategies and different errors;
- conditional-probability performance is representation-sensitive;
- probability modelling connects mathematical models to context and different meanings of probability.

Population warning: synthesis spans varied ages, countries and tasks. It informs failure-mode/representation design; it does not prove one unique optimal M04 sequence.

## H. Conditional-probability misconception evidence

**Carmen Díaz & Carmen Batanero (2009), “University Students’ Knowledge and Biases in Conditional Probability Reasoning”**

Relevant difficulties:

- transposed conditional (P(Amid B)leftrightarrow P(Bmid A));
- wrong restricted-sample-space denominator;
- time-axis / causal misinterpretations of conditioning;
- independence versus mutual exclusivity confusion;
- joint versus conditional confusion;
- union/intersection rule confusion;
- total-probability errors from ignoring branch prevalence.

Important result for assessment design: formal instruction improved several formal tasks, while some reasoning biases persisted. Correct formal calculation therefore cannot be the only diagnostic target.

Population warning: psychology students in introductory statistics; frequencies are not generalized to this learner.

## I. Probability reasoning / spurious-correct-answer evidence

**Konold, Pollatsek, Well, Lohmeier & Lipson (1993), “Inconsistencies in Students’ Reasoning about Probability,” JRME 24(5)**

Core audit lesson:

- a correct answer on a familiar chance item can arise from nonnormative reasoning;
- learners can switch between incompatible reasoning frameworks on nearby tasks;
- exact-sequence questions can be answered “equally likely” for reasons such as “anything can happen,” without a coherent independence model;
- assessments should discriminate the *reasoning model*, not only the selected numerical answer.

This is highly relevant to S11–S17 and to the current M04 fixed-task design.

---

# 3. Deliberate non-imports

The source audit does **not** use textbook adjacency as permission to steal downstream ownership.

Still deferred:

- Bayes inversion, base rates, likelihood ratios and posterior updating → M06
- fair price as policy, bankroll, utility/risk preference, ruin/drawdown decisions → M05
- formal random variables, PMFs/CDFs, variance/covariance, named distributions and conditional expectation → M26
- Monte Carlo implementation → later coding/statistics modules
- LLN / CLT
- continuous probability
- measure theory

A source may motivate a distinction that M04 should prepare; it does not automatically move the later capability upstream.

---

# 4. What survives the deep source comparison

Several parts of M04 are genuinely strong and should not be erased casually.

1. **Finite nonuniform probability precedes favourable/total counting.** S02 makes equal weights a special case, and S03 requires equiprobability before count ratios.
2. **The Bayes boundary is explicit.** S18/S24 perform forward marginalization and refuse posterior inversion.
3. **Independence has a real hierarchy.** S11 product criterion → S12 conditioning criterion → S13 exclusivity contrast → S14 pairwise versus mutual is a coherent conceptual block.
4. **Historical repairs matter.** S11 complement-independence is actually derived; S22 positional marginals are derived from labelled ordered samples; S21 genuinely derives finite linearity; S04 no longer uses independence prematurely.
5. **Expectation is kept distinct from preference.** S23 leaves real decision theory for M05.
6. **M05/M06 downstream edges are concrete.** Current M05 consumes M04 finite models, event probabilities, trees, repeated trials and expectation; current M06 directly consumes S07 conditioning, S08 multiplication, S18 total probability, S11 independence and complements.

So the deep audit does **not** find “everything is wrong.”

It does find that mathematical correctness and old CI success concealed substantial newer-standard pedagogy/evidence holes.

---

# 5. Source-comparison route audit

## Current route

[
	ext{objects/models}
	o 	ext{event rules}
	o 	ext{conditioning}
	o 	ext{trees/replacement}
	o 	ext{independence}
	o 	ext{repeated trials}
	o 	ext{total probability}
	o 	ext{expectation}.
]

## Source pressure after respecting T22 boundaries

MIT and Blitzstein/Hwang place total-probability structure inside the early conditioning cluster. Once Bayes is removed to M06 and counting is already owned by M03, the source-supported T22 spine naturally looks closer to:

[
	ext{finite models/event algebra}
	o
	ext{conditioning + joint rule}
	o
	ext{table/tree/partition representations + total probability}
	o
	ext{replacement/dependence}
	o
	ext{independence hierarchy}
	o
	ext{repeated trials}
	o
	ext{finite expectation/linearity/indicators}
	o
	ext{synthesis}.
]

This does **not** prove S18 must move. It creates a real sequencing question: current M04 uses forward branch marginalization in S09 and again in S12 before the law of total probability is named/organized in S18. The mathematics is legal because disjoint leaf addition was already taught, but the conceptual tool is fragmented across the module.

**Audit status: 🟠 sequence issue requiring a deliberate keep/move decision.**

---

# 6. Representation Progression Audit

The current authoring pack has no Representation Progression Map.

Repository search of M04 learner-facing text shows:

- “tree” occurs in fixed S09 tasks, but the S09 lesson contains no actual rendered tree artifact;
- “table” occurs only as prose in S07 Transfer (“A table has 40 records…”);
- no M04 learner-facing Venn diagram;
- no two-way table artifact;
- no probability grid/area model;
- no explicit conversion task among sample-space list ↔ table ↔ tree ↔ algebra;
- no independent evidence requiring the learner to choose a representation.

The domain-specific literature specifically warns that conditional-probability strategy/error patterns depend on representation. The current T22 v1.2 protocol also says a promised representation must actually be delivered and later reused; a decorative one-off does not count.

### Current representation path

| Representation | Current state | Later reuse/evidence | Audit |
| --- | --- | --- | --- |
| explicit finite sample-space list | S01/S03 text | some counting/event tasks | 🟡 useful but weakly connected |
| event set notation | S01–S06 | independence examples | 🟢 real reuse |
| restricted sample space | S07 prose/list | S07 Main | 🟡 only uniform/list form |
| contingency/two-way table | **not actually delivered**; S07 Transfer only says “A table has 40 records” in prose | none | 🔴 |
| probability tree | S09 named; calculations described in prose | S09 tasks, S12 branch language | 🔴 representation promised but not actually shown/constructed instructionally |
| partition/tree weighting | S18 formula/prose | S24 formula/prose | 🟠 no table↔tree↔algebra conversion |
| indicator decomposition | S22 symbolic | S22 tasks | 🟢 coherent symbolic representation |

**Finding DSA-01 — 🔴 Representation progression is missing as a designed system.**

This is not “add pretty pictures.” It affects conditioning, joint/marginal reasoning and downstream M06 readiness.

---

# 7. Conditional probability deep audit

## What current M04 does well

S07 explicitly asks for:

- a restricted reference set;
- both (P(Amid B)) and (P(Bmid A));
- denominator explanation;
- zero-probability conditioning caveat.

S08 derives the multiplication rule and checks joint-probability bounds.

These are mathematically sound.

## What the sources expose

### Hole 1 — instruction is effectively uniform-count conditioning

The S07 worked example is uniform numbers 1–10; the guided example is a uniform die. A learner can therefore encode:

> conditional probability = favourable count / restricted count

without ever seeing the defining *probability-mass* restriction work in a genuinely nonuniform finite model.

S08 moves to abstract probabilities, but it does not repair this representational gap.

### Hole 2 — the “table” Transfer is not a table representation

S07-T gives record counts in prose. The learner never has to read, complete or translate an actual two-way table.

### Hole 3 — time-axis reasoning is untested

Díaz/Batanero document the belief that later information cannot condition an earlier event because it cannot “cause the past.” Current M04 never gives a clean static/chronological counterexample in which conditioning is information restriction rather than causal influence.

This can coexist with perfect performance on all current S07/S08 calculations.

### Hole 4 — no cross-representation equivalence

The learner never has to show that the same finite model can be read from a sample-space restriction, a two-way table and a tree/branch representation.

**Finding DSA-02 — 🔴 S07–S09 are mathematically correct but conceptually under-represented for the documented failure modes and for M06’s downstream dependence on conditioning.**

---

# 8. Sample-space / probability-model audit

S01–S03 have a good mathematical skeleton:

- outcome versus event;
- explicit finite model;
- nonuniform weights before equiprobable counting;
- warning that possible die sums are not equiprobable.

But the current S01 evidence mostly says “construct the obvious sample space from supplied labels.” It does not require:

- diagnosing an invalid overlapping/non-exhaustive sample space;
- deciding the atomicity/granularity of a model;
- comparing two legitimate sample spaces for different recorded experiments.

The older rich ARC048 design itself explicitly wanted these capabilities, and recent probability-education synthesis continues to report difficulty evaluating sample spaces.

**Finding DSA-03 — 🟠 M04 teaches notation for a supplied finite model better than it teaches the act of choosing/auditing a finite model.**

This matters because later conditional-probability and Bayesian errors often begin with the wrong reference population/model, not with algebra.

---

# 9. Independence and repeated-trial audit

## Strong block: S11–S14

This is currently one of M04’s strongest regions.

- S11 product definition is explicit and causal intuition is rejected as the definition.
- complement-independence is derived.
- S12 connects conditional invariance to the product rule.
- S13 explicitly separates disjointness and independence.
- S14’s XOR construction is genuinely useful pairwise-but-not-mutual evidence.

**Audit: 🟢 core mathematics; preserve unless a later decision finds a better route.**

## Weak block: S15–S17 conceptual diagnostics

S15 teaches exact ordered-path multiplication correctly. But the tasks can all be passed while retaining classic erroneous beliefs about randomness:

- gambler’s fallacy after a run;
- representativeness (“mixed-looking sequences are more random/more likely”);
- outcome approach (“anything can happen, therefore all are equally likely”).

Konold et al. specifically warn that a correct “equal probability” response need not demonstrate normative reasoning.

Current S15 asks why two paths with the same success/failure counts match, but it does not stage a discriminator where the common misconception predicts a *different* answer.

**Finding DSA-04 — 🔴 the repeated-trials block is procedurally correct but does not robustly discriminate normative independence reasoning from documented nonnormative frameworks.**

S16/S17 are useful derived tools once the repeated-trial model is secure.

---

# 10. Total probability audit

S18 is mathematically correct and respects the M06 boundary.

However:

1. it arrives late, after branch marginalization has already been used;
2. its lesson and both fixed tasks explicitly supply the partition and branch rates;
3. the learner is told to compute branch contributions;
4. there is no diagnostic contrast against the common error of taking a simple average of conditional rates when branch prevalences differ;
5. there is no two-way-table/tree/algebra conversion.

A learner can therefore follow the weighted formula without demonstrating that they understand *why* the branch weights are required.

Díaz/Batanero explicitly report total-probability errors from ignoring population proportions/branch weights.

**Finding DSA-05 — 🟠/🔴 S18 needs a stronger conceptual and representational contract; its position also needs a deliberate sequencing decision.**

---

# 11. Expectation audit

The expectation block is materially stronger than the first half of the module.

### S19
Finite weighted average; expectation may be unattainable. Sound.

### S20
Uniform atomic averaging and multiplicity. Useful distinction.

### S21
Historical repair made this strong: finite-sum derivation of linearity, direct verification, no-independence statement and nonlinear counterexample.

### S22
Historical repair made this strong: indicator expectation, expected counts under dependence and an actual derivation of fixed-position marginals.

### S23
Expectation versus mode/attainability/guarantee/preference; clean M05 boundary.

Main caution: the notation (X(omega)), (E[X]) and indicators is already proto-random-variable language. The pack does explicitly keep PMF/distribution machinery out of M04, so this is a controlled finite bridge rather than a demonstrated ownership theft.

**Finding DSA-06 — 🟢/🟡 preserve the S19–S23 mathematical spine; mostly improve pedagogy/evidence consistency rather than replacing it.**

---

# 12. S24 synthesis audit

Current S24 says, in effect:

1. build the leaves;
2. compute a specified joint;
3. compute the marginal **by total probability**;
4. test independence **by comparing the named probabilities**;
5. compute expectation.

The lesson immediately before it tells essentially the same organizing sequence:

> use path multiplication → total probability → conditional/marginal comparison → weighted average.

The Transfer then repeats the same architecture with different labels and numbers.

Under the current T22 v1.2 synthesis rule, the learner should organize a meaningful part of the reasoning. Here the prompt supplies the reasoning pipeline.

**Finding DSA-07 — 🔴 S24 is integration-by-recipe, not strong synthesis evidence.**

This is a fixed-assessment issue, not merely a documentation issue.

---

# 13. Worked-instruction depth audit

The M04 lessons are generally mathematically correct, but many are **compressed formula miniatures** relative to the current Gate-4 teaching contract.

Examples:

- S02: legal weights + one event sum;
- S04: complement formula + one spinner;
- S06: inclusion–exclusion formula + decimal substitution;
- S08: rearrange conditional definition + decimal substitution;
- S09: leaf-product rules + four numbers, but no actual tree;
- S10: one with/without-replacement calculation;
- S15–S18: direct formulas with little misconception contrast.

The current protocol expects the builder to orient, define, connect, explain/derive, fully work an example, leave meaningful guided work, fade support and check an important distinction where useful.

Not every session needs eight visible headings. But the *substance* of those moves is absent or extremely compressed in a substantial fraction of M04.

**Finding DSA-08 — 🟠 the module is much closer to a concise annotated problem set than to the richer novice-teaching standard now used in later T22 modules.**

This is systemic, not a single-session bug.

---

# 14. Evidence-distance audit of the 48 fixed tasks

The baseline pack has no current-standard `evidenceDistance`, `decisionAudit` or `wrongSolverAudit`.

A fresh semantic classification of the **current baseline tasks**, without changing them, gives this working audit:

- **38 retrieval**
- **3 proof/reasoning reconstruction**
- **1 fresh Main evidence**
- **6 changed-surface Transfer**

This is a reviewer classification, not a machine truth. It is recorded to expose the scale of the issue.

## Per-session working classification

| S | Main | Transfer | Comment |
| ---: | --- | --- | --- |
| 01 | retrieval | retrieval | same sample-space/event construction |
| 02 | retrieval | retrieval | same normalization/event-sum procedure |
| 03 | retrieval | retrieval | nonuniform counterfactual is already directly taught |
| 04 | retrieval | retrieval | same complement structure |
| 05 | retrieval | retrieval | Main overlap / Transfer disjoint addition, both cued |
| 06 | retrieval | retrieval | same inclusion–exclusion algebra |
| 07 | retrieval | changed-surface Transfer | list-based conditioning → count-record surface |
| 08 | retrieval | retrieval | same joint/conditional rearrangement |
| 09 | retrieval | retrieval | same two-stage tree recipe |
| 10 | retrieval | retrieval | same replacement comparison |
| 11 | retrieval | retrieval | same product criterion |
| 12 | retrieval | changed-surface Transfer | sequential sampling → static marginal/joint data |
| 13 | proof reconstruction | changed-surface Transfer | Transfer must construct independent non-disjoint pair |
| 14 | **fresh Main evidence** | changed-surface Transfer | XOR/set systems expose pairwise-not-mutual |
| 15 | retrieval | retrieval | same exact-path product |
| 16 | retrieval | retrieval | same count × one-path derivation |
| 17 | retrieval | retrieval | same complement formulas |
| 18 | retrieval | retrieval | same supplied weighted-partition recipe |
| 19 | retrieval | retrieval | same finite weighted average |
| 20 | retrieval | changed-surface Transfer | repeated labels force atomic multiplicity reasoning |
| 21 | proof reconstruction | retrieval | Main reconstructs taught finite-sum derivation |
| 22 | proof reconstruction | changed-surface Transfer | draw-position indicators → member-selection indicators |
| 23 | retrieval | retrieval | same interpretation checklist |
| 24 | retrieval | retrieval | prompt supplies synthesis pipeline |

The issue is **not** that retrieval is bad. Retrieval is necessary.

The issue is that the baseline’s 24 “Transfer” slots are not honestly distinguished under the current protocol. Most semantic-separation notes justify separation by **different numbers or contexts**, exactly what the current protocol says is insufficient for changed-surface transfer.

**Finding DSA-09 — 🔴 the historical 24/24 “semantic separation” record is not equivalent to a current-standard evidence-distance audit.**

If the product contract expects a genuine Transfer task in each Transfer slot, most of these slots require redesign or honest narrowing.

---

# 15. Learner-decision audit

The baseline has no explicit decision ledger.

The most important absences are:

- S03: learner is told the counting setup and the counterfactual;
- S06: formula choice is effectively supplied;
- S09: “build the tree” supplies the representation;
- S16: “derive from combinations” supplies the method;
- S17: prompt explicitly asks for complement comparison;
- S18: prompt supplies the partition/branch-product method;
- S24: the entire synthesis pipeline is enumerated.

The learner is often executing a correct method rather than deciding which probability structure applies.

That is appropriate for retrieval sessions; it becomes a defect when the evidence is used to claim transfer, modeling or synthesis.

**Finding DSA-10 — 🟠/🔴 method-selection evidence is thin outside S13–S14 and parts of S20/S22.**

---

# 16. Wrong-solver audit

The baseline has no permanent wrong-solver ledger. The following flawed models can survive too much of the current assessment path:

| Misconception | Current exposure |
| --- | --- |
| favourable/total works for any finite model | S03 partly attacks |
| wrong conditional denominator | S07 attacks numerically |
| (P(Amid B)=P(Bmid A)) | S07 attacks numerically |
| conditioning is causal / later information cannot condition earlier events | **not directly attacked** |
| disjoint = independent | S13 strongly attacks |
| pairwise = mutual independence | S14 strongly attacks |
| replacement does not change the second-draw state | S10 attacks |
| irregular-looking exact sequence is more likely / “random-looking” | **not directly attacked** |
| gambler’s fallacy after a run | **not directly attacked** |
| overall conditional rate = unweighted average of branch rates | S18 formula would mark wrong, but method is heavily cued |
| linearity requires independence | S21 strongly attacks |
| (E[g(X)]=g(E[X])) for nonlinear (g) | S21 strongly attacks |
| expectation = most likely / guaranteed / preference-optimal | S19/S23 strongly attack |

**Finding DSA-11 — 🟠 misconception coverage is uneven: the repaired expectation/independence distinctions are much stronger than the conditioning/random-sequence distinctions.**

---

# 17. Downstream-risk audit

## M05

Current M05 directly consumes:

- M04-S02 finite probability models
- M04-S19 expectation
- M04-S21 linearity
- M04-S04 complements
- M04-S03 event probability
- M04-S09 probability trees
- M04-S15 repeated independent trials

Most of these mathematical prerequisites exist. M05 risk is therefore mostly about **robustness**, not missing formulas.

## M06

Current M06 directly consumes:

- M04-S07 conditional probability/direction
- M04-S08 multiplication rule
- M04-S18 total probability/partitions
- M04-S11 independence
- complements

This makes the weaknesses in the conditional/representation/total-probability block more consequential. M06 should not have to reteach the meaning of a conditional denominator just before teaching posterior inversion.

**Finding DSA-12 — 🔴 the highest downstream risk is M06 readiness, not M05 readiness.**

---

# 18. Documentation / contract drift found

`M04-BOUNDARY.md` still includes a “finite stopping/problem-of-points style synthesis” ownership phrase from an older design lineage, while the current authoring pack’s actual boundary and 24-session route do not contain a problem-of-points session and explicitly leave decision/fair-price machinery to M05.

The historical rich ARC048 design also included fair games/problem-of-points before the boundary was refactored.

**Finding DSA-13 — 🟡 clean the authority stack later so the current authoring pack, boundary prose and historical rich design cannot be mistaken for three simultaneous ownership contracts.**

No content decision is made here about reintroducing problem of points.

---

# 19. Session-level hostile audit

Legend:

- 🔴 major current-standard defect or downstream risk
- 🟠 meaningful repair/sequence/assessment issue
- 🟡 minor/narrowing/documentation/pedagogy issue
- 🟢 strong enough to preserve conceptually

| S | Verdict | Deep-source audit |
| ---: | --- | --- |
| 01 | 🟠 | correct definitions, but weak modeling/audit of sample-space granularity and invalid spaces |
| 02 | 🟡 | good nonuniform finite-model foundation; mostly procedural |
| 03 | 🟢 | strong equiprobability boundary and unequal-multiplicity trap |
| 04 | 🟢/🟡 | correct and clean; straightforward retrieval is appropriate |
| 05 | 🟢/🟡 | repaired observability is sound; a representation bridge would help |
| 06 | 🟡 | correct inclusion–exclusion, but formula application dominates |
| 07 | 🔴 | downstream-critical conditioning block lacks nonuniform mass example, actual table representation and time-axis diagnostic |
| 08 | 🟠 | mathematically correct multiplication rule; too algebraic/representation-light |
| 09 | 🔴 | session promises probability trees but no actual learner-facing tree artifact is delivered |
| 10 | 🟡/🟠 | good state-change idea; could participate in a stronger tree/table/dependence progression |
| 11 | 🟢 | strong repaired definition-based independence |
| 12 | 🟢/🟡 | good dependence diagnosis and branch derivation |
| 13 | 🟢 | strong exclusivity/independence contrast and constructive Transfer |
| 14 | 🟢 | strongest fresh-evidence session; pairwise-not-mutual discovery is valuable |
| 15 | 🔴 | exact-path arithmetic correct, but documented representativeness/outcome/gambler misconceptions remain untested |
| 16 | 🟡 | sound derivation from combinations; mostly same-surface retrieval |
| 17 | 🟡 | sound complement strategy; mostly same-surface retrieval |
| 18 | 🟠/🔴 | correct theorem, but late sequencing, weak representation, supplied method and missing equal-average diagnostic |
| 19 | 🟢/🟡 | sound finite expectation introduction |
| 20 | 🟢 | useful atomic-multiplicity distinction |
| 21 | 🟢 | strong repaired derivation and nonlinear guard |
| 22 | 🟢 | strong repaired indicator/dependence reasoning |
| 23 | 🟢 | strong expectation-interpretation and M05 boundary |
| 24 | 🔴 | recipe-driven near-isomorphic Main/Transfer; not convincing synthesis/method-selection evidence |

This is substantially more critical than the historical four-finding Astra pass because the question is different: not “are the old repairs correct?” but “does M04 meet the later source-driven v1.2 product standard?”

---

# 20. Audit conclusions without choosing the final disposition

The deep source audit changes the picture materially.

### What is *not* in doubt

- M04’s mathematical boundary is basically sensible.
- Its strongest repaired mathematics is worth preserving.
- The module is not garbage and does not need deletion merely because it is old.
- Historical CI/Chromium/evidence provenance remains valuable.

### What *is* now in doubt

- whether the 24-session order is still the best order, especially S18;
- whether “Probability Trees” exists as a real representation lesson rather than prose arithmetic;
- whether conditioning is conceptually robust enough for M06;
- whether repeated-trial reasoning distinguishes normative probability from documented heuristic reasoning;
- whether 24 Transfer slots deserve that name;
- whether S24 supplies genuine synthesis evidence;
- whether the compressed lesson style is sufficient for the present T22 novice-teaching standard.

### Decision pressure for the next step

An **as-is re-freeze is not supported by this audit**. That statement is not yet the requested repair/rebuild disposition.

The next decision should compare two concrete options:

1. **Deep bounded reconstruction preserving the 24 stable sessions/IDs** — reorder only if justified, build a real representation progression, expand thin instruction, repair Transfers/synthesis, add modern evidence ledgers, preserve strong S11–S14 and S19–S23 work.
2. **Structural rebuild of the M04 architecture** — only if a session-sizing/dependency pass shows the representation/conditioning/total-probability problems cannot be repaired cleanly without forcing the old 24-session skeleton.

Before choosing, the decision pass should build the missing twelve pre-authoring artifacts from the current v1.2 protocol and ask whether they independently regenerate approximately this architecture or a materially different one.

**No M04 content has been edited in this audit branch. No M05/M06 content has been edited.**
