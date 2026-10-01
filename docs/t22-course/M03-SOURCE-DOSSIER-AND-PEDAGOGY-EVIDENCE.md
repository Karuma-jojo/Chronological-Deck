# M03 Source Dossier & Pedagogy-Evidence Ledger

Date: 2026-10-02  
Module: `T22E-DISC01 — Mathematical Reasoning & Discrete Foundations`  
Status: **final v1.7.2 publication support document**

This document closes the Source-Dossier / Pedagogy-Evidence requirement for the already-built 30-session M03. It does **not** reopen S01–S30, add ownership, or claim that cited sources validate this implementation experimentally.

## 1. Curriculum authority and scope

### Repository / curriculum authority

**Sources inspected**

- `docs/t22-course/M03-BOUNDARY.md`
- `course/t22/authoring/m03.json`
- `docs/t22-rebuild/M65-SKELETON.md`
- `docs/t22-rebuild/m65.dependencies.json`
- `docs/t22-rebuild/SEMANTIC-PREREQUISITES.json`
- M01/M02 accepted authoring packs for inherited algebra/function language
- M04 boundary/authoring material for the downstream probability boundary
- M09/M10 material for downstream proof/binomial consumption

**Epistemic role**

Defines what M03 owns, what it may consume, what it must defer, and which later modules depend on it.

**Design decisions supported**

- M03 stops at deterministic finite logic/proof/set/counting work.
- Probability, conditional probability, independence and expectation remain M04.
- The general finite binomial theorem remains in S26 because M10 consumes that exact ownership.
- M03 formalizes mappings/functions beyond M02's elementary function intuition.
- Infinite-cardinality theory, calculus, advanced graph theory and abstract algebra remain out of scope.

**What was deliberately not imported**

Probability machinery; limits/convergence; calculus; generating functions; abstract algebra; general infinite-cardinality theory; graph algorithms; contest-number-theory machinery not needed for the M03 boundary.

---

## 2. Mathematical route comparators

### Daniel J. Velleman — *How to Prove It: A Structured Approach*, 2nd ed.

**Type** — rigorous proof-construction textbook.

**Specific material inspected**

- 2nd ed., especially Chapter 3 proof strategies (conditionals, contraposition and contradiction), plus the surrounding quantifier/set/function proof-development chapters;
- proof strategies for conditionals, contraposition and contradiction;
- givens/goal transformations;
- separation between scratch work / strategic search and final proof;
- quantifier/set/function proof structure.

**Claims / design decisions supported**

- S09–S14 explicitly distinguish proof architecture from the final proof text;
- Strategy Lab A asks the learner to identify logical form and commit to a plausible route before method discussion;
- scratch work may include failed routes; final proof should contain the justified logical spine.

**Evidence limitations**

Textbook pedagogy and expert exposition, not an experimental evaluation of T22 learners.

**Not imported**

Later material or exercises that would enlarge M03's boundary.

### Richard Hammack — *Book of Proof*

**Type** — beginner-oriented proof textbook.

**Specific material inspected**

- Chapter 2 logic and Chapter 3 counting, together with the later direct/contrapositive/contradiction/induction/set/function proof sequence;
- logic as background language for proof;
- counting with sets/lists;
- direct/contrapositive/contradiction proof progression;
- induction, sets, relations and functions.

**Claims / design decisions supported**

- beginner-facing exposition of logic before proof;
- explicit element/subset and ordered/unordered distinctions;
- counting objects must be defined before formulas are used.

**Evidence limitations**

Textbook comparator; no causal claim about this exact sequencing.

**Not imported**

Topics beyond the current deterministic finite boundary.

### Lehman, Leighton & Meyer — *Mathematics for Computer Science*

**Type** — university discrete-mathematics course text / route comparator.

**Specific material inspected**

- MIT *Mathematics for Computer Science* proof-method/induction material and the finite sets, mappings and cardinality/counting chapters (including the cardinality-rules chapter used for combinatorial-proof comparison);
- proof methods and induction;
- sets, relations and functions;
- cardinality rules and combinatorial proofs;
- finite mappings and counting;
- pigeonhole / discrete argument patterns.

**Claims / design decisions supported**

- the proof→sets/functions→counting route is mathematically conventional;
- combinatorial arguments require choosing the counted object/representation, not only manipulating formulas;
- S30 may combine already-owned finite-function and inclusion-exclusion tools without introducing probability.

**Evidence limitations**

MIT-oriented discrete-mathematics comparator, not a learner-study of this product.

**Not imported**

Generating functions, graph theory, infinite-cardinality development and other later material.

### Paul Zeitz — *The Art and Craft of Problem Solving*

**Type** — contest/problem-solving strategy text.

**Specific material inspected**

- Chapters 1–3 (exercise vs problem; orientation; strategy/tactics/tools) and the combinatorics/problem-solving material used only as a transfer/strategy comparator;
- exercise versus problem distinction;
- orientation before tactics;
- strategy / tactics / tools separation;
- recasting a problem and trying alternate routes.

**Claims / design decisions supported**

- the post-assessment Strategy Labs must test orientation and route selection rather than merely replay a recently assessed archetype;
- method names are withheld until the learner commits to an organizing plan;
- close clones with changed constants are treated as practice, not as fresh strategy evidence.

**Evidence limitations**

Problem-solving text and expert advice, not a controlled learning study.

**Not imported**

Advanced contest topics that belong to the separate SMMC Companion rather than M03.

---

## 3. General pedagogy comparators

### Mathematical Association of America — *Instructional Practices Guide* (2017)

Locator: https://maa.org/resource/instructional-practices-guide/

**Type** — undergraduate-mathematics instructional-practices guide.

**Epistemic role**

General undergraduate-mathematics design comparator covering classroom, assessment and course-design practices.

**Design implications used in M03**

- require active learner reasoning rather than answer display;
- align assessment with stated learning outcomes;
- use tasks that require explanation and mathematical decision-making;
- separate formative practice from summative/canonical evidence;
- keep representations and task demands visible and purposeful.

**Population/context**

Undergraduate mathematics instruction broadly.

**Evidence limitations**

A general practice guide. It does not establish that this exact M03 implementation, Spire runtime or learner population will produce a measured learning gain.

### IES / What Works Clearinghouse — *Organizing Instruction and Study to Improve Student Learning* (2007)

Locator: https://ies.ed.gov/ncee/wwc/PracticeGuide/1

**Type** — evidence-rated general learning / instructional practice guide.

**Recommendations used cautiously**

- space learning over time;
- interleave worked examples with problem solving;
- connect concrete and abstract representations;
- use quizzing/retrieval;
- ask deep explanatory questions.

**Design implications used in M03**

- Worked example → guided action → independent Main/Transfer instead of continuous answer exposition;
- Strategy Labs occur after the canonical assessments rather than contaminating them;
- explanatory prompts are scored where explanation is part of the public obligation.

**Population/context**

Broad education / content-learning contexts, not specifically adult transition-to-proof learners.

**Evidence limitations**

Recommendation evidence strengths differ. These principles are design inputs, not direct validation of M03.

---

## 4. Domain-specific mathematics-education evidence

### Keith Weber (2001), “Student Difficulty in Constructing Proofs: The Need for Strategic Knowledge,” *Educational Studies in Mathematics* 48(1), 101–119. DOI: 10.1023/A:1015535614355

Locators: https://eric.ed.gov/?id=EJ649521 and DOI 10.1023/A:1015535614355

**Type** — peer-reviewed mathematics-education research.

**Population/context**

Undergraduates and doctoral students constructing proofs in abstract algebra.

**Documented difficulty**

Undergraduates may know relevant facts and be able to apply them locally yet still fail to construct a proof because they lack strategic knowledge about which facts, theorems or proof approaches are likely to be useful.

**Evidence strength / limitation**

Directly relevant to undergraduate proof construction and strategy selection, but domain/context is abstract algebra, sample/task context differs from this M03, and the study does not test the T22 sequence or Spire runtime. It therefore motivates a design hypothesis rather than proving effectiveness here.

**Likely false mental model addressed**

“If I know all the definitions/theorems, the proof method will be obvious.”

**Useful design response**

- teach named proof architectures in S09–S14;
- then separately practise **method selection** on post-assessment probes where the route is not named;
- require an orientation note / first useful move before revealing alternatives;
- clone-audit strategy probes so “fresh strategy” is not merely the fixed assessment with changed constants.

**Assessment implication**

Canonical fixed tasks may honestly be retrieval/proof reconstruction. Method-selection practice is kept separate and unscored unless a task truly observes route choice.

---

## 5. Pedagogy-Evidence Ledger

| Mathematical concept | Documented learner difficulty | Population/context | Evidence strength / limitation | Likely false mental model | Useful representation / contrast | Sequencing implication | Worked-example implication | Assessment implication |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Proof construction / strategy selection | Learner may know facts but fail to choose productive facts/approaches | Undergraduate/doctoral abstract-algebra proof construction (Weber 2001) | Domain-specific peer-reviewed evidence; not a direct T22 trial | Knowing facts automatically determines a proof route | Orientation note; compare plausible routes; first useful reduction | Teach architectures first, then faded strategy-choice practice | Worked examples expose architecture but must not pre-solve later strategy probes | Do not call a clone “fresh”; score route choice only where publicly requested |
| Conditional / quantified proof structure | Logical form must be transformed into workable givens/goals | Proof-textbook comparator (Velleman) | Expert textbook, not empirical outcome evidence | Proof is a stream of algebra rather than goal-directed reasoning | givens/goal scratch work versus ordinary-language final proof | Logic/quantifiers precede proof methods | Show strategic transformation and final proof as distinct products | Rubric may require exact contrapositive/quantifier move where requested |
| Logic as mathematical language | Symbols can become foreground mechanics instead of support for meaning | Beginner proof-textbook comparator (Hammack) | Textbook comparator | Symbol manipulation equals proof | translate symbolic form ↔ ordinary statement | logic precedes proof, then recedes into background | examples must connect notation to meaning | tasks require interpretation, not symbol copying alone |
| Counting model selection | Formula use without defining objects leads to fragile reasoning | Hammack / MIT MCS route comparators | Textbook/course comparators | every “how many” problem maps immediately to a memorized formula | ordered vs unordered; distinguishable vs identical; universe/overlap | sum/product → permutations → repeated objects → combinations → stars-and-bars → IE → pigeonhole | define outcomes before formula | Strategy Lab B requires organizing plan before calculation |
| Worked examples and problem solving | Continuous exposition can suppress retrieval/independent construction | IES/WWC general learning guide | General evidence; population not M03-specific | seeing a solution equals being able to construct one | worked example → guided action → independent task | alternate explanation with learner work | guided practice must leave a real action | fixed evidence remains independent from answer-revealing instruction |
| Undergraduate task/assessment alignment | Misaligned tasks/rubrics can reward unasked behavior | MAA IP Guide general undergraduate comparator | General practice guide; not module-specific | rubric may test “everything taught” rather than public obligations | explicit learning outcome ↔ task ↔ scoring evidence | design outcomes before assessment claims | examples support outcomes but do not determine rubric | bidirectional request↔rubric fairness is mandatory |

---

## 6. Final strategy-lab clone audit

The v1.7.2 Spire pack keeps both labs **post-assessment and unscored**. The following close-clone probes were replaced:

- A1: square-divisibility clone → odd-product proof surface;
- A5: linear-combination strong-induction clone → prime-factorization strong-induction surface;
- B2: repeated-letter string clone → shortest-grid-path surface;
- B4: consecutive-pair pigeonhole clone → congruence-class difference surface;
- B5: explicit onto-function clone → nonempty labeled-team assignment surface.

These changes do not alter S01–S30, task IDs, ownership, evaluators, historical evidence or downstream prerequisites.

## 7. Sources deliberately not treated as validation

- Velleman, Hammack, MIT MCS and Zeitz are mathematical/pedagogical comparators, not learner-outcome studies.
- MAA IPG and IES/WWC inform design principles; neither certifies this product.
- Weber (2001) supports concern about strategic knowledge in proof construction; it does not establish that these exact Strategy Labs improve SMMC performance.
- No source here is used to override the repository's M03/M04 boundary.

## 8. Publication disposition

This dossier closes the missing v1.2 research-documentation gate identified in the final hostile review.

The canonical M03 content remains unchanged. Publication status must continue to state review provenance honestly: same-model hostile follow-up passed; formal external independent review was not performed.
