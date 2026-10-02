# M04 Source Dossier & Pedagogy-Evidence Ledger — source-driven modernization v1.0

Date: 2026-10-02  
Module: `ARC048 — Finite Probability, Conditional Probability, Independence & Expectation`  
Status: **modernization source dossier; current 24-session architecture retained pending full v1.2 evidence reconfirmation**

This dossier supports a source-driven modernization of the existing M04. It does **not** make external sources the curriculum owner and it does **not** import all elementary probability into M04. Repository ownership remains authoritative: M04 ends at forward finite probability and finite expectation; M05 owns decision/risk criteria, M06 owns Bayes/posterior inversion, and M26 owns formal random-variable distributions, variance/covariance and conditional expectation.

The purpose of the source stack is adversarial triangulation:

> repository boundary → mature probability treatments → undergraduate-mathematics pedagogy → probability-education misconception evidence → exact M04 design decisions.

No source below is treated as experimental validation of T22 itself.

---

## 1. Curriculum authority

### Repository / current M04 authority

**Inspected**

- `course/t22/authoring/m04.json`
- `docs/t22-course/M04-BOUNDARY.md`
- `docs/t22-course/M04-REVIEW-HANDOFF.md`
- `docs/t22-course/M04-ASTRA-REVIEW.md`
- `docs/t22-course/M04-RESOLUTION.md`
- `docs/t22-course/M04-ASTRA-FOLLOWUP.md`
- current M03 v1.7.2 source/evidence material
- current T22 v1.2 builder/adversarial protocol

**Role**

Defines ownership, prerequisite state, evidence/provenance requirements and downstream prohibitions.

**Boundary retained**

M04 owns finite experiments/sample spaces/events; finite probability models; counting probability; complements/unions/intersections; conditional probability; multiplication rule; finite trees; replacement protocols; independence; pairwise versus mutual independence; repeated independent finite trials; exactly-k counting; finite total probability; finite expectation, linearity and indicators.

**Not imported**

Bayes/posterior inversion, decision/utility/risk policy, formal distribution machinery, variance/covariance, Monte Carlo engineering, LLN/CLT or measure theory.

---

## 2. Mathematical route comparators

### Joseph K. Blitzstein & Jessica Hwang — *Introduction to Probability*, 2nd ed.

**Source available**

Connected Drive copy: `Blitzstein & Hwang — Introduction to Probability.pdf`.

**Material inspected / used**

- Chapter 1: sample spaces, naive/equiprobable probability, counting, general finite probability;
- Chapter 2: conditional probability, conditioning as a problem-solving tool, independence, pitfalls/paradoxes;
- Chapter 4: expectation, linearity and indicators.

**Role**

Primary conceptual probability comparator. The text explicitly emphasizes stories, pictures, named problem-solving strategies, multiple solutions and proactive treatment of misunderstandings.

**Design implications for M04**

- Probability objects should be constructed before formulas are applied.
- Equiprobable favourable/total reasoning must be visibly conditional on equal atomic probabilities.
- Conditioning should be understood as changing the reference universe, not as symbol manipulation.
- Independence should be a mathematical criterion rather than a causal/verbal guess.
- Expectation should be developed as a weighted average and then made powerful through linearity/indicators.

**Not imported**

Bayes rule/posterior updating from Chapter 2; formal random-variable distribution development; variance; later continuous/stochastic-process material; copied exercises.

### Charles M. Grinstead & J. Laurie Snell — *Introduction to Probability*, 2nd ed. / CHANCE Project edition

**Source available**

User-supplied `prob.pdf`.

**Material inspected / used**

- Chapter 1 discrete probability;
- Chapter 3 combinatorial probability as a comparator only, because counting is already owned by M03;
- Chapter 4 discrete conditional probability;
- Chapter 6.1 expected value.

**Role**

Independent classical probability comparator and stress test against overfitting M04 to one textbook's route.

**Design implications**

- Unequal atomic probabilities must appear early enough to prevent "probability = favourable/total" from becoming the definition.
- Finite/discrete examples are sufficient for M04's boundary.
- Nonintuitive examples are useful when they expose a false model, but simulation/continuous material is not required to establish M04 ownership.

**Important boundary difference**

Grinstead & Snell introduce random-variable language very early and also use simulation heavily. M04 deliberately does **not** copy that sequence: formal random-variable/distribution ownership remains M26 and simulation engineering remains later.

---

## 3. General pedagogy comparators

### Mathematical Association of America — *Instructional Practices Guide* (2018)

**Source available**

User-supplied `InstructPracGuide_web.pdf`; the accompanying `Book-Study-Guide-for-The-MAA-Instructional-Practices-Guide.pdf` is used only as a navigation/reflection aid.

**Role**

General undergraduate-mathematics pedagogy baseline.

**Material used**

- Classroom Practices: active student engagement and selection of appropriate mathematical tasks;
- Assessment Practices: explicit learning outcomes; formative assessment that elicits actual reasoning; summative assessment aligned to outcomes;
- Design Practices: course/session design begins from student learning outcomes rather than content accumulation.

**M04 implications**

- A numerically correct answer is insufficient when the ownership claim is about the denominator, model, conditioning direction or independence criterion.
- Main/Transfer rubrics must score the relevant reasoning action explicitly.
- Diagnostic tasks should reveal the learner's mental model, not merely whether a familiar formula produced the right number.

**Limitation**

General undergraduate-mathematics guidance; it does not establish the effectiveness of this exact T22 implementation.

### IES / NCER — Pashler et al. (2007), *Organizing Instruction and Study to Improve Student Learning*

**Source available**

User-supplied `cog-practice-guide.pdf`.

**Role**

Evidence-graded general learning-practice comparator.

**Recommendations used cautiously**

- space learning over time;
- interleave worked examples and problem solving;
- combine graphics with verbal descriptions;
- connect abstract and concrete representations;
- use quizzing/retrieval;
- ask and answer deep explanatory questions.

**M04 implications**

- Worked examples should not consume every decision required by the fixed task.
- Probability trees/tables/set restrictions should connect to equations rather than become decorative representations.
- Follow-up questions should force explanation of why a denominator/product/addition is legal.

**Population/evidence limitation**

The guide synthesizes heterogeneous educational populations and explicitly cautions against treating itself as a cookbook. Its evidence grades vary by recommendation. We use it as a design input, not direct causal evidence for an adult T22 learner.

---

## 4. Domain-specific probability-education evidence

### Carmen Batanero & Rocío Álvarez-Arroyo — “Teaching and learning of probability,” *ZDM – Mathematics Education* (2023/2024)

**Source available**

User-supplied `ZDM.pdf`.

**Role**

Recent research synthesis / domain-specific education comparator.

**Relevant findings used**

- probability education has persistent intuition and learning-difficulty research across psychology, mathematics education and statistics education;
- classical favourable/total probability is valid only under equally likely elementary outcomes;
- formal education does not automatically remove reasoning biases;
- misconceptions involving randomness, sample spaces, independence, representativeness and compound events can persist even in older or technically trained learners.

**M04 implications**

- S03 must explicitly reject favourable/total outside equiprobable models.
- S11–S15 must assess independence/repeated-trial reasoning rather than rely on familiar coin/die answers.
- Correctness on one standard surface is not enough evidence of robust probabilistic reasoning.

**Limitation**

A research synthesis over varied populations and topics; not a direct test of T22 or of the exact 24-session route.

### Carmen Díaz & Carmen Batanero (2009) — “University Students’ Knowledge and Biases in Conditional Probability Reasoning”

**Source available**

User-supplied `IEJME_p02_diazbatanero_E.pdf`.

**Population/context**

University psychology students in introductory statistics; pre-instruction and post-instruction samples.

**Documented difficulties relevant to M04**

- transposed conditional: confusing (P(A\mid B)) with (P(B\mid A));
- time-axis/causal interpretations of conditioning;
- failure to restrict the denominator/sample space correctly;
- confusing independence and mutual exclusivity;
- confusing joint and conditional probability;
- applying union/intersection rules incorrectly;
- total-probability errors caused by averaging conditional rates without weighting branch prevalence.

Formal problem-solving performance improved after instruction, while several psychological biases changed little.

**M04 design response**

- S07 must make the new denominator/reference population visible, including a nonuniform example.
- S07/S08 must contrast the two directions of a conditional without teaching Bayes inversion.
- S13 must contrast disjointness with independence in both product and conditional terms.
- S18 must explicitly show why conditional rates cannot normally be averaged equally across unequal partition weights.
- Wrong-solvers for these sessions must be able to produce plausible numbers while still failing the conceptual distinction.

**Limitation**

Specific disciplinary/cultural/course context; observed frequencies are not generalized to this learner.

### Clifford Konold, Alexander Pollatsek, Arnold Well, Jill Lohmeier & Abigail Lipson (1993) — “Inconsistencies in Students’ Reasoning about Probability,” *Journal for Research in Mathematics Education* 24(5), 392–414

**Source available**

User-supplied `Konoldetal.1993.pdf`.

**Population/context**

Secondary-school and college-age participants, with follow-up interviews in the reported studies.

**Documented difficulty**

Correct multiple-choice answers about coin sequences did not reliably imply a coherent independence concept. Learners could answer “equally likely” for a most-likely question and then contradict that reasoning on the corresponding least-likely question. The authors discuss an “outcome approach” and switching among incompatible reasoning frameworks.

**M04 design response**

- S15 must distinguish the probability of one exact ordered path from informal judgments about which path “looks random.”
- Assessments should require a reason/criterion, not only a selected sequence or number.
- Wrong-solver audits should include representativeness and “anything can happen” reasoning that can accidentally land on a correct answer.
- Cognitive conflict alone is not assumed to repair a misconception; the lesson must supply a coherent replacement model.

**Limitation**

Historical studies and specific task designs; this supports adversarial task design, not a claim that every T22 learner will show the same misconception.

---

## 5. Pedagogy-Evidence Ledger

| M04 concept | Documented / source-supported learner risk | Likely false mental model | Useful representation / contrast | Sequencing consequence | Worked-example consequence | Assessment consequence |
| --- | --- | --- | --- | --- | --- | --- |
| Finite probability model | favourable/total overgeneralized beyond equiprobable atoms | “Probability always means favourable ÷ total” | weighted atoms versus uniform atoms | legal finite model before counting probability | include unequal atomic weights before S03 | require explicit equiprobability justification |
| Conditional probability | original denominator retained after conditioning | “Conditioning changes the numerator only” | restricted universe / renormalized mass | S07 before multiplication trees | include nonuniform restricted-mass example | score denominator/reference population |
| Direction of conditioning | (P(A\mid B)) and (P(B\mid A)) conflated | vertical bar is symmetric association | compute both directions from one finite model | explicit in S07 before Bayes is deferred to M06 | same intersection, different denominators | wrong-solver must fail if conditional is reversed |
| Sequential conditioning | causal/time order mistaken for logical conditioning | condition must happen earlier in time | event restriction versus causal story | distinguish probability information from causality | use both sequential and static examples | changed surface should include a non-temporal conditional |
| Independence | verbal separateness substituted for product/conditional criterion | “different-looking events are independent” | product equality + conditional invariance | S11 product criterion before repeated trials | compute both sides before naming independence | rubric must score the criterion, not the label alone |
| Exclusivity vs independence | concepts conflated | “cannot happen together = unrelated” | (A\cap B=\varnothing) versus (P(A\cap B)=P(A)P(B)) | dedicated S13 retained | positive-probability disjoint contrast + zero-probability edge | require classification + calculation |
| Repeated trials | representativeness / outcome approach | irregular-looking exact sequence is “more random” and hence more likely | compare exact sequences with same success/failure counts | one-path reasoning before exactly-k aggregation | explicitly contrast exact path with multi-path event | require reason equality follows from constant-p independence |
| Total probability | conditional rates averaged equally | “overall rate is mean of branch rates” | weighted partition tree/table | partition weights before summing | show wrong plain average against unequal branch weights | score branch weights and partition validity |
| Expectation | expectation confused with typical/attainable/guaranteed/decision-optimal value | “expected value is what will happen” | weighted center versus modal/guaranteed outcomes | interpretation limits after computation/linearity | include unattainable expectation and same-EV/different-shape contrast | S23 must separate mathematical expectation from M05 preference |
| Linearity / indicators | independence assumed unnecessarily | “all expectation rules need independence” | finite-sum derivation; indicator decomposition | derive linearity before indicators | use dependent without-replacement count | rubric explicitly asks why independence is unnecessary |

---

## 6. Concrete modernization decisions from this dossier

### Retain the 24-session architecture

The current route is not structurally broken. It has a coherent dependency chain:

finite objects/model → event algebra → conditioning → trees/protocols → independence → repeated trials → total probability → expectation/linearity/indicators → synthesis.

The source stack supplies reasons to strengthen particular sessions, not reasons to erase this architecture.

### Source-driven instructional repairs authorized in v1.3 candidate

- **S07:** add a nonuniform restricted-mass example and an explicit two-direction conditional contrast.
- **S13:** strengthen the independence/exclusivity contrast with the conditional interpretation that positive-probability disjointness makes the other event impossible once one occurs.
- **S15:** explicitly distinguish exact-sequence probability from “looks random” / representativeness reasoning; defer multi-path counting to S16.
- **S18:** explicitly contrast correct partition weighting with the wrong unweighted average of conditional rates.
- **S24:** replace the old formula-by-formula synthesis scaffold with a genuinely organized three-branch Main and a count-surface Transfer; both fixed contracts advance to obligationVersion 2.

S07/S13/S15/S18 are instruction-only repairs. S24 is a material assessment repair and is versioned accordingly; historical attempts are retained but do not silently certify the revised contract.

### Evidence modernization still required before publication

The historical M04 acceptance predates the full post-M03-v1.7.2 evidence harness. Before M04 is re-frozen:

- classify all 48 fixed assessments with the current evidence-distance vocabulary;
- write decision audits wherever fresh/changed-surface evidence is claimed;
- write one plausible wrong-solver discriminator for every session;
- rebuild semantic-separation records against the current session instruction versions;
- verify claim→public request→exact rubric observability for all 120 claims;
- run deterministic math, inherited protections and real Chromium workflow;
- obtain a fresh adversarial follow-up on the exact implementation head.

Historical acceptance remains part of provenance; it is not erased by modernization.
