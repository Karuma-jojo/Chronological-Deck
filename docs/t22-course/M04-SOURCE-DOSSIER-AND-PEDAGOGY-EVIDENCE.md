# M04 Source Dossier & Pedagogy-Evidence Ledger — v2.0

Date: 2026-10-02  
Module: **ARC048 · Finite Probability, Conditional Probability, Independence & Expectation**  
Design authority: `docs/t22-course/M04-V2-DESIGN-GATE.md`  
Deep-source audit: `docs/t22-course/M04-DEEP-SOURCE-AUDIT-v1.0.md`

This is a permanent source/provenance record for the M04 v2 reconstruction. It distinguishes mathematical route comparators from mathematics-education evidence. No source below is treated as proof that this exact T22 learner will achieve a specified outcome.

## 1. Repository / curriculum authority

Inspected current repository authority:

- `course/t22/authoring/m04.json`
- `docs/t22-course/M04-BOUNDARY.md`
- `docs/t22-course/M04-REVIEW-HANDOFF.md`
- `docs/t22-course/M04-ASTRA-REVIEW.md`
- `docs/t22-course/M04-RESOLUTION.md`
- `docs/t22-course/M04-ASTRA-FOLLOWUP.md`
- current M03 v1.7.2 publication/source-evidence standard;
- current M05/M06 prerequisite audits and M26 boundary;
- current T22 Module Builder and Adversarial Checker v1.2.

**Decision supported.** Keep stable module ID `ARC048`, 24 session IDs, historical evidence key and closed Astra fixes. Rebuild pedagogy/evidence inside that architecture. M04 ends at forward finite probability + finite expectation.

**Not imported.** M05 decision theory, M06 Bayes/posterior updating, M26 formal distributions/variance/covariance, simulation engineering, LLN/CLT and measure theory.

---

## 2. Canonical mathematical route comparator — MIT OpenCourseWare 6.041 / 6.041SC

Inspected the official early-unit sequence covering probability models/axioms, conditioning, independence, counting and discrete expectation.

**Role.** Route comparator, prerequisite/order check and conventional representation/problem-type reference.

**Decision supported.**

- probability models precede conditioning;
- conditioning/joint multiplication/branch reasoning and independence belong in one early conceptual spine;
- expectation follows a coherent finite probability model;
- trees/branch decompositions are not decorative but mathematical representations.

**T22 divergence.** MIT includes Bayes and random-variable machinery earlier than T22. Those are deliberately deferred.

**Limit.** A university syllabus is not evidence that the route is optimal for this learner.

---

## 3. User-supplied deep comparator — Blitzstein & Hwang, *Introduction to Probability*, 2nd ed.

User Drive copy inspected directly.

Relevant material:

- Ch.1: sample spaces / Pebble World, equiprobable “naive” probability, counting and general finite probability;
- Ch.2: conditional probability, multiplication/total probability, independence, pitfalls/paradoxes;
- Ch.4: finite expectation, linearity and indicators.

**Design decisions supported.**

- favourable/total must be taught as a special equiprobable case;
- conditioning is a changed/restricted reference space, not a denominator mnemonic;
- (P(Amid B)) and (P(Bmid A)) are different quantities;
- independence is factorization/invariance, not casual “unrelatedness”;
- linearity does not need independence;
- indicators turn event probabilities into expected counts.

**Not imported.** Bayes as an updating framework, formal random-variable/PMF development, variance, continuous probability and later processes.

**Limit.** A textbook is a mathematical/pedagogical comparator, not learner-outcome evidence.

---

## 4. Independent mathematical comparator — Grinstead & Snell, *Introduction to Probability*

Relevant chapters/sections inspected: finite/discrete probability, conditional probability and independence, expected value.

**Role.** Independent definition/example check.

**Decision supported.** The M04 finite definitions and formulas are standard; the reconstruction problem is pedagogy/representation/evidence rather than mathematical novelty.

**Not imported.** Simulation as an M04-owned coding skill, continuous probability or asymptotics.

---

## 5. General undergraduate mathematics pedagogy — MAA *Instructional Practices Guide*

Relevant sections inspected:

- selecting appropriate mathematical tasks;
- formative/summative assessment aligned to learning outcomes;
- creating/selecting assessment problems;
- conceptual understanding versus procedural fluency;
- instructional design around learning outcomes.

**Design decisions supported.**

- public tasks must elicit the claimed capability rather than merely a nearby procedure;
- correct symbolic execution can coexist with weak conceptual understanding;
- representations and task demands should be aligned with stated outcomes;
- rubrics must score public obligations rather than hidden expectations.

**Limit.** General collegiate mathematics guidance, not a validation study of ARC048.

---

## 6. General learning comparator — IES/WWC, *Organizing Instruction and Study to Improve Student Learning*

Relevant recommendations used:

- interleave worked examples and problem solving;
- combine graphical/visual and verbal representations;
- connect abstract and concrete representations;
- retrieval/quizzing as appropriate.

**Design decisions supported.**

- M04 lessons use complete worked examples followed by guided work and faded independent evidence;
- table/tree/set/algebra representations are connected rather than one-off decorations;
- retrieval remains honestly labelled retrieval rather than being artificially upgraded to “fresh.”

**Limit.** Heterogeneous evidence base spanning different ages/subjects. No direct T22 effect-size claim.

---

## 7. Domain-specific evidence — Díaz & Batanero (2009), conditional probability reasoning

Study inspected: university students in introductory statistics, focusing on formal conditional probability and reasoning biases.

Documented/analysed difficulties include:

- transposed conditional;
- time-axis/causal misconception;
- base-rate related errors;
- restricted-sample-space denominator errors;
- confusion of independence and mutual exclusivity;
- total-probability/product-rule errors.

The study reported substantial improvement on several formal/open problem types after instruction while some psychological biases changed little.

**Design consequences.**

- S07 uses nonuniform conditional mass, an actual two-way table, direction reversal and a time-axis information-versus-causation discriminator.
- S18 includes unequal branch weights and explicitly rejects simple averaging.
- Correct formula use is not treated as sufficient evidence of conceptual understanding.

**Limit.** Population is not the T22 learner; reported percentages are not generalized.

---

## 8. Domain-specific evidence — Konold, Pollatsek, Well, Lohmeier & Lipson (1993)

Focus: inconsistencies in students' probability reasoning and the “outcome approach.”

Relevant implications:

- a correct answer can arise from nonnormative reasoning;
- learners may switch between incompatible frameworks on nearby tasks;
- exact-sequence questions are especially vulnerable to representativeness and “anything can happen” explanations.

**Design consequences.**

- S15 explicitly contrasts exact path probability with “more random-looking” and “failure is due” reasoning.
- S15 Main/Transfer score the explanation, not just the equal numerical probabilities.
- S16 then builds exactly-k counting only after the exact-path model is secured.

**Limit.** Older and varied student populations; used to design discriminators, not to estimate T22 performance.

---

## 9. Domain-specific synthesis — Batanero & Álvarez-Arroyo, *Teaching and learning of probability* (ZDM)

Relevant themes inspected:

- sample-space/equiprobability/independence difficulties;
- visual representations in conditional probability;
- Venn diagrams, two-way tables, trees/double trees, icon arrays and unit-square representations;
- representation-dependent strategies/errors;
- probability modelling as a connection between chance, mathematical structure and context.

**Design consequences.**

- S01 includes sample-space audit rather than only notation.
- S07/S09/S18 form an explicit table → tree → partition-algebra progression.
- M04 records where each representation reappears in independent evidence.

**Limit.** Broad synthesis across populations/settings; no claim that one representation is universally superior.

---

# Pedagogy-Evidence Ledger

Evidence level:
- **E** = domain-specific empirical/review evidence;
- **R** = repository/historical M04 defect;
- **T** = theoretically plausible mathematical misconception/counterexample.

| Concept | Evidence | Likely false mental model | Representation/contrast | Sequencing consequence | Worked-example consequence | Assessment consequence |
| --- | --- | --- | --- | --- | --- | --- |
| Sample space | E/T | “list every relevant word” | complete atomic record / invalid overlapping label list | S01 before probability mass | show model repair | Main/Transfer must repair invalid spaces |
| Equiprobability | E/T | “fair mechanism ⇒ derived labels equally likely” | atom multiplicity ledger | S02 nonuniform before S03 counting | dice/coin aggregated labels | score atom-level justification |
| Complement | T | “opposite-sounding event” | exact membership | before repeated-trial complements | at-least-one vs none | error-diagnosis Transfer |
| Conditional denominator | E | “divide by original total” | restricted set + two-way table | S07 before joint/tree | nonuniform mass and row/column table | denominator is explicit rubric evidence |
| Conditional direction | E | (P(A|B)=P(B|A)) | same overlap, different row/column | S07 before M06 | compute both directions | reversed bar must change denominator |
| Time-axis | E | “later info cannot affect earlier probability” | archived joint table | S07/S08 | distinguish information from causation | conceptual criterion required |
| Tree paths | T | add along a path / branch=leaf | actual tree | S09 before replacement | branch→leaf calculation | malformed-tree repair |
| Replacement | E/T | same second denominator | paired protocol branches | S10 before dependence criterion | update state explicitly | infer protocol from branch values |
| Independence | E/R/T | “separate stories” or disjoint=independent | factorization + conditional invariance | S11→S14 block | numerical criteria + counterexamples | product/conditional/triple checks |
| Random sequences | E | representativeness / gambler's fallacy | exact S/F strings | S15 before exactly-k | equal-count differently shaped paths | score rejection of heuristic explanation |
| Exactly-k | T | one representative path is the event | path family + combination count | S16 after S15 | count placements | one-path wrong solver must fail |
| Total probability | E | simple average of subgroup rates | contribution table/tree | S18 after concrete trees | unequal branch shares | unweighted-average wrong solver fails |
| Expectation | T | mode/guarantee/preference | payoff table | S19 then S23 boundary | unattainable EV / equal-EV models | score interpretation limits |
| Linearity | R/T | requires independence; works through nonlinear (g) | finite weighted sum | S21 after definition | derive, then square counterexample | proof + nonlinear guard |
| Indicators | R/T | dependence blocks additive expectation | 0/1 sum | S22 after linearity | without-replacement count | dependent-indicator task |
| Synthesis | R/T | formula keyword matching | learner-chosen list/table/tree/algebra | S24 last | model choice demonstrated but not prescribed | representation/method organization is scored |

---

## Evidence limitation statement

The source stack supports the *design concerns* and mathematical route. It does not scientifically validate the finished module. Final publication still requires exact-task mathematics, semantic exposure review, rendered-surface inspection, full CI/browser evidence and a fresh adversarial confirmation pass.
