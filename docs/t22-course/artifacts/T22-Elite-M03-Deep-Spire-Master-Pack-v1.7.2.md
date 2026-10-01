# T22 Elite — M03 Deep Spire Master Pack

**Module:** `T22E-DISC01` — **Mathematical Reasoning & Discrete Foundations**  
**Base canonical status:** `published-v1.4-lang-final-stitch-accepted`  
**Canonical authoring basis:** `m03-authoring-v1.7.2-publication-state-r1`  
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`
**Pack status:** v1.7.2 final Spire pack — canonical M03 content closed; same-model hostile review passed; external independent review not performed

> **Learner-safe, source-enriched pack.** The canonical authority is the current v1.7 repair branch of `course/t22/authoring/m03.json` in `Karuma-jojo/Chronological-Deck`. The 30-session architecture, 60 stable task IDs, and 150 ownership claims are preserved. v1.7 repairs S24 lesson→Transfer separation and historical exposure provenance, removes pre-S26 combination notation from S25, makes S26 request↔rubric ownership literal, and tightens evidence-distance/decision metadata. Sealed references/rubrics/answers remain omitted. Explanatory enrichment is informed by Velleman *How to Prove It*, Hammack *Book of Proof*, MIT *Mathematics for Computer Science*, and Zeitz *The Art and Craft of Problem Solving*; those sources improve pedagogy but do not override canonical ownership.

## Runtime guidance for Spire Master

- Run **S01 → S30** in order unless the installed runtime explicitly authorizes remediation or review.
- Treat definitions, lesson examples and guided checks as **instructional assistance**, not independent assessment evidence.
- Do **not** solve, hint through, or reveal a fixed Main/Transfer task before the learner attempts it.
- When a proof is required, first ask the learner to identify the logical form, domain, hypotheses and target before suggesting a method.
- Assistance during Main/Transfer must be recorded. Assisted work is not equivalent to independent ownership.
- A session pass is evidence for that session only; it does not automatically clear M03.
- Preserve exact domains, quantifier scope, set universes, mapping codomains, parity/divisibility witness conditions, and finite-counting assumptions.
- The four textbooks are **pedagogical references**, not answer banks. Do not quote or expose a textbook solution that is materially equivalent to a live fixed task.
- There are **no canonical task-level supplied graphs/tables/images in M03**; unlike M02, no fixed task depends on an omitted representation.
- **No pre-assessment method gate:** never expose a fixed Main/Transfer statement in a strategy-choice exercise before its canonical attempt.
- **Interleaved strategy labs:** after S14 and after S30, run the fresh unscored Spire labs in this pack. Hide method labels until the learner commits to a route. These labs are diagnostic/practice, not automatic canonical ownership credit.
- **Evidence honesty:** use the evidence role/class stated in each session. Retrieval and proof reconstruction are valid evidence classes; a Transfer slot is not automatically changed-surface evidence.
- **S24 provenance:** old v1.6 S24 lesson exposure rehearsed the fixed injective-map Transfer instance. The runtime must preserve that historical contamination timestamp; cleaning the lesson in v1.7 does not retroactively make later old attempts independent.

## Module destination

State claims precisely, prove or refute them, reason with sets and mappings, and execute deterministic finite counting before probability.

## Historical boundary / current freeze gate

Historical v1.4 Lang-foundation boundary acceptance remains part of the audit trail. The current v1.7 evidence/provenance repair is **not frozen yet**: it still requires independent confirmation, the live nasty-session/Strategy-Lab pilot, and an exact-SHA T22 Elite + Chromium pass. M03 remains **30 sessions / 60 fixed tasks / 150 ownership claims**. S26 continues to own the **general finite binomial theorem** with a combinatorial `C(n,k)` coefficient argument; later M10 may consume that ownership.

## Boundary after M03

M04 owns probability, conditional probability, independence and expectation. M03 stops at deterministic finite counting.

## Downstream-contamination audit

This pack has been checked against the frozen M04–M65 macro ownership map. Enrichment may motivate or foreshadow later work, but it must not teach or certify later-module capabilities. In particular, M03 does **not** own probability/expectation, convergence/limits, calculus, linear algebra, programming/algorithms, stochastic processes, optimization, statistical inference, market mechanics, or ML. References to recurrence are limited to the M02-owned notation needed for strong-induction proof structure; remainder classes stay at the elementary exhaustive-cases level; finite mappings/relations stop before infinite-cardinality theory; counting stops before probability.

## Source roles

- **Velleman — _How to Prove It_:** proof-structure grammar, logical form → strategy, quantifiers, relations/functions, induction.
- **Hammack — _Book of Proof_:** beginner-friendly proof exposition, set language, direct/contrapositive/contradiction, induction, counting.
- **MIT — _Mathematics for Computer Science_:** independent rigor check, proof-writing discipline, induction, relations, finite cardinality, counting and binomial reasoning.
- **Zeitz — _The Art and Craft of Problem Solving_:** strategy/tactics, counterexample search, recasting, pigeonhole/combinatorics, and unfamiliar-problem maturity. Used cautiously so canonical fixed tasks remain unrehearsed.

---
# M03 · S01 — Mathematical statements, truth values & predicates

**Session ID:** `T22V3::T22E-DISC01::S01@1`

## Entry prerequisites

- M01 algebra
- M02 input/output intuition

## Required ownership

- Distinguish a truth-evaluable statement from an expression/question.
- Determine a closed statement's truth value.
- Distinguish an open predicate from a closed statement.
- Identify a predicate's free variable.
- Evaluate a predicate at a supplied input.

## Canonical learning content

A statement is a complete sentence that is true or false; expressions and questions are not statements, while a predicate becomes closed only after its free variable is supplied or quantified. Worked example: “9 is odd” is a true statement; “u+7” is an expression; “u>7” is a predicate. Guided check: Classify “2+5=8”, “v²−1”, and “v²=1”, then evaluate the predicate at v=1 and v=3.

## Deep learning overlay

Treat this as a language session, not an algebra session. Velleman’s useful distinction is between an expression that names an object, a sentence that has a truth value, and a predicate whose truth still depends on a free variable. The important habit is to ask “What kind of mathematical object is this?” before trying to calculate anything.

**Construction scaffold:** first classify the syntax; only then ask for truth. For a predicate P(x), substituting a legal input closes the sentence. Do not call an expression false merely because it has no stated value. A question is also not false—it is simply not a proposition. This category discipline will matter later when quantifiers bind variables and when sets/functions are treated as objects rather than claims.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Classify (i) 12/3=4, (ii) z²+1, (iii) z²=9, (iv) Is 5>2? as statement/expression/question/predicate. Give truth values for closed statements, identify the free variable, and evaluate the predicate at z=3 and z=2.

**Task ID:** `T22V3::T22E-DISC01::S01-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

A model uses R(r):r<0. Explain why it is not closed, identify r, evaluate R(−0.02),R(0.01), and translate it to plain language.

**Task ID:** `T22V3::T22E-DISC01::S01-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S02 — AND, OR, NOT & truth tables

**Session ID:** `T22V3::T22E-DISC01::S02@1`

## Entry prerequisites

- M03-S01

## Required ownership

- Evaluate conjunction P∧Q.
- Use mathematical OR P∨Q inclusively.
- Negate a proposition with ¬.
- Respect parentheses in a compound formula.
- Construct all four two-variable truth rows.

## Canonical learning content

P∧Q requires both true; P∨Q is inclusive; ¬P flips truth; parentheses determine grouping. Worked example: For P=true,Q=false, conjunction is false, disjunction true, and ¬P false. Guided check: List all four P,Q rows and evaluate (¬P)∧Q.

## Deep learning overlay

A truth table is not primarily a memorization grid; it is an exhaustive model of all possible truth assignments. MIT MCS and Velleman both use this exhaustiveness to distinguish valid reasoning from plausible wording.

**Construction scaffold:** for two primitive propositions there are exactly four rows. Evaluate the smallest subformulas first and respect parentheses. Mathematical “or” is inclusive unless explicitly stated otherwise. A common failure is to read English tone into the connective instead of using its mathematical truth rule.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Build the complete four-row truth table for P,Q,P∧Q,P∨Q,¬P, and ¬P∨(P∧Q). State what P∨Q does when both inputs are true.

**Task ID:** `T22V3::T22E-DISC01::S02-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let A='badge valid', B='PIN valid', C='manual override active'. Access requires A∧(B∨C). Evaluate (T,F,T),(T,F,F),(F,T,T) and explain inclusive OR.

**Task ID:** `T22V3::T22E-DISC01::S02-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S03 — Implication, converse, inverse & contrapositive

**Session ID:** `T22V3::T22E-DISC01::S03@1`

## Entry prerequisites

- M03-S02
- M01 inequalities

## Required ownership

- State P→Q is false only when P is true and Q false.
- Write the converse Q→P.
- Write the inverse ¬P→¬Q.
- Write the contrapositive ¬Q→¬P.
- Recognize original/contrapositive equivalence.

## Canonical learning content

P→Q fails only at P=true,Q=false. Converse is Q→P; inverse ¬P→¬Q; contrapositive ¬Q→¬P; original and contrapositive are equivalent. Worked example: x>6→x>2 is true over reals, but the converse fails at x=4. Guided check: Write all four forms of x<−1→x<3.

## Deep learning overlay

The central move is to stop treating implication as causation. P→Q says only that the forbidden situation P true/Q false never occurs. Velleman’s treatment is especially useful here: converse and contrapositive are different syntactic transforms, and only the contrapositive is logically equivalent to the original.

**Construction scaffold:** write the four forms mechanically before judging truth. When negating inequalities, change the boundary correctly. To refute a direction, search for a legal input where its antecedent is true and consequent false. Do not “prove” the converse by proving the original.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Over reals let P:x>4 and Q:x>1. State the sole false truth row, write converse/inverse/contrapositive, decide which hold universally, give counterexamples to false forms, and state the equivalence pairing.

**Task ID:** `T22V3::T22E-DISC01::S03-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let P:x=0 and Q:x²=0 over reals. Write converse and contrapositive, decide both directions, and explain the relationship.

**Task ID:** `T22V3::T22E-DISC01::S03-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S04 — Biconditionals; necessary & sufficient conditions

**Session ID:** `T22V3::T22E-DISC01::S04@1`

## Entry prerequisites

- M03-S03

## Required ownership

- Interpret P↔Q as both directions.
- Label sufficient conditions correctly.
- Label necessary conditions correctly.
- Distinguish necessary from sufficient when reverse fails.
- Establish/refute iff by checking both directions.

## Canonical learning content

P↔Q means both P→Q and Q→P. If P→Q, then P is sufficient for Q and Q is necessary for P; the reverse direction must be checked separately. Worked example: over integers, 4|n implies n is even, so divisibility by4 is sufficient for evenness and evenness is necessary for divisibility by4. The reverse fails, for example at n=6. Guided check: compare “n is divisible by6” with “n is divisible by3”; check both arrows and give a counterexample to any failed direction.

## Deep learning overlay

Necessary/sufficient language is easiest when tied back to arrows rather than memorized phrases. If P→Q, then P guarantees Q, so P is sufficient; Q is required whenever P occurs, so Q is necessary for P.

**Construction scaffold:** split an iff claim into two independent implications. One failed direction kills the biconditional. The failure often appears at symmetry/sign boundaries, so actively search there before declaring equivalence.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Over reals let P:x=3 and Q:x²=9. Check both directions, decide P↔Q, label necessary/sufficient relationships, and use x=−3 to expose the failed reverse.

**Task ID:** `T22V3::T22E-DISC01::S04-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Over reals compare A:x>0 with B:x³>0. Prove both directions, state A↔B, and describe necessary/sufficient relationships.

**Task ID:** `T22V3::T22E-DISC01::S04-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S05 — Universal & existential quantifiers

**Session ID:** `T22V3::T22E-DISC01::S05@1`

## Entry prerequisites

- M03-S01
- M03-S03

## Required ownership

- Track and explain the stated quantifier domain.
- Interpret universal quantification.
- Interpret existential quantification.
- Use a witness for an existential.
- Use a counterexample against a universal.

## Canonical learning content

∀ requires every legal value in the stated domain; ∃ requires at least one. A witness establishes an existential; one legal counterexample refutes a universal. Worked example: over integers, ∃n(n²=25) is true because n=5 is a witness, while ∀n(n+1>n) is true because adding1 increases every integer. Guided check: on the domain {0,1,2,3}, decide ∀m(m<4) and ∃m(m²=4), explicitly naming the domain before deciding.

## Deep learning overlay

Quantifiers are where informal examples stop being enough. Velleman emphasizes that the universe of discourse is part of the meaning of the statement: the same predicate can change truth value when the domain changes.

**Construction scaffold:** before solving, write the domain. For ∃, search for one legal witness. For ∀, either prove an arbitrary legal case or refute with one legal counterexample. Never treat many confirming examples as a universal proof.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Use real numbers as domain. Decide (i) ∀x x²≥0, (ii) ∃x x²=2, (iii) ∀x x²≥x. Give witnesses/counterexamples and explain why the domain matters.

**Task ID:** `T22V3::T22E-DISC01::S05-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Let the domain be exactly {−2,−1,0,1,2} and R(x):x+1>0. Decide ∀xR(x),∃xR(x), give the smallest witness and one counterexample.

**Task ID:** `T22V3::T22E-DISC01::S05-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S06 — Negating quantified claims correctly

**Session ID:** `T22V3::T22E-DISC01::S06@1`

## Entry prerequisites

- M03-S05
- M01 inequalities

## Required ownership

- Negate ∀ as ∃¬.
- Negate ∃ as ∀¬.
- Negate inequalities correctly.
- Preserve the domain.
- Translate the exact negation to ordinary language.

## Canonical learning content

Negation switches ∀↔∃, negates the predicate, and keeps the same domain. The negation of u>3 is u≤3. Worked example: The negation of “every real x has x²>1” is “some real x has x²≤1.” Guided check: Negate “there exists an integer n with n<−4.”

## Deep learning overlay

The safest approach is structural rather than verbal. Push the negation one layer inward at a time: ¬∀ becomes ∃¬ and ¬∃ becomes ∀¬. Then negate the predicate exactly.

**Construction scaffold:** preserve the domain and all scope. “Not every” means “there exists at least one that fails,” not “none.” For inequalities, negate the relation rather than merely flipping the sign symbol by intuition.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Negate exactly: (i) every real x has x²+1>0; (ii) there exists an integer n with n²=5; (iii) every integer k has k≤10. Give symbolic and ordinary forms.

**Task ID:** `T22V3::T22E-DISC01::S06-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Negate: (a) Every trading day in the sample has loss at most 2 units. (b) There exists a sampled day with positive return.

**Task ID:** `T22V3::T22E-DISC01::S06-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S07 — Counterexamples, boundary cases & claim debugging

**Session ID:** `T22V3::T22E-DISC01::S07@1`

## Entry prerequisites

- M03-S03
- M03-S05
- M01 algebra

## Required ownership

- Check counterexample legality/hypothesis.
- Check conclusion failure.
- Use one valid counterexample to refute a universal.
- Explain confirming examples do not prove universality.
- Search strategically near sign/zero/boundaries.

## Canonical learning content

A valid counterexample is legal, satisfies the hypothesis, and falsifies the conclusion. One refutes a universal; confirmations do not prove one. Worked example: over reals, the claim a+b>0⇒(a>0 and b>0) fails at a=2,b=−1: the hypothesis is true but one conclusion component is false. Guided check: audit the claim x²=x⇒x=1 by testing the boundary value x=0 and explicitly checking hypothesis and conclusion.

## Deep learning overlay

This is the first session where Zeitz’s problem-solving mindset becomes useful. Do not search randomly. Inspect the hypothesis and conclusion for fragile features: sign, zero, endpoints, equality cases, symmetry, and hidden domain restrictions.

**Construction scaffold:** a candidate is only a counterexample if it satisfies the hypothesis and violates the conclusion. Verify both explicitly. If the statement is false, a single valid counterexample finishes the job; if repeated tests succeed, you have evidence for a conjecture, not a proof.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Audit: for every real x, if x²>4 then x>2. Before giving a counterexample, name one search family you would inspect (for example sign, zero, or a boundary) and use that search to produce a valid counterexample. Verify the hypothesis and conclusion failure, explain why one case refutes the universal, and why checking x=3,4,5 does not prove it.

**Task ID:** `T22V3::T22E-DISC01::S07-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Audit: for all real a,b, if ab=0 then a=0 and b=0. Give a counterexample and repair the conclusion.

**Task ID:** `T22V3::T22E-DISC01::S07-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S08 — Integers, divisibility & parity language

**Session ID:** `T22V3::T22E-DISC01::S08@1`

## Entry prerequisites

- M01 integer algebra

## Required ownership

- Interpret a|b via an integer witness.
- Provide a witness when divisibility holds.
- Recognize nondivisibility.
- Represent even and odd integers.
- Handle negative divisors with the same definition.

## Canonical learning content

For integers, a|b means b=ak for some integer k. Even integers are 2k and odd integers 2k+1; negative divisors use the same definition. Worked example: 7|−35 with witness −5, while 6∤25. Guided check: Give witnesses for −3|18 and 8|56.

## Deep learning overlay

Divisibility proofs become easy only when the notation is converted back into its witness definition. The symbol a|b is not a fraction and does not mean “a/b looks integral”; it means there exists an integer k with b=ak.

**Construction scaffold:** translate every divisibility/parity statement into an integer-witness equation before manipulating it. This definition-driven habit is the backbone of S09–S12.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Decide 6|42,8|42,−4|20. Give witnesses for true claims, explain the false one, and write generic even/odd forms.

**Task ID:** `T22V3::T22E-DISC01::S08-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Translate '3 divides n−1' and 'n is odd' into witness equations and give one integer n satisfying both.

**Task ID:** `T22V3::T22E-DISC01::S08-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S09 — Direct proof architecture

**Session ID:** `T22V3::T22E-DISC01::S09@1`

## Entry prerequisites

- M03-S08
- M01 algebra

## Required ownership

- Start with arbitrary objects satisfying hypotheses.
- Unpack definitions.
- Derive symbolically.
- Match the target definition.
- Explain why examples are not universal proof.

## Canonical learning content

A direct proof of a universal implication starts with arbitrary legal objects satisfying the hypotheses, unpacks definitions, derives symbolically, and finishes by matching the conclusion definition. Worked example: if n is odd, then n+2 is odd. Write n=2k+1 for some integer k; then n+2=2(k+1)+1, which has the required odd form. Guided check: if 6|n, unpack the divisibility witness and show directly that n is even, naming the integer witness that matches the even definition.

## Deep learning overlay

Velleman’s structured-proof idea is ideal here: the logical form of the goal tells you how to open the proof. For a universal implication, take arbitrary legal objects, suppose the hypothesis, and aim to manufacture the conclusion’s defining form.

**Construction scaffold:** do not start with examples. Unpack each hypothesis into witnesses; keep them arbitrary; manipulate until the target definition is visible; explicitly name the final witness. The proof is complete only when the conclusion’s definition has been met for the arbitrary objects.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction**: the direct-proof architecture is already taught. Method-selection practice happens later in Strategy Lab A, after S14, on fresh statements.

## Main task — learner-facing

Prove directly: for arbitrary integers a,b, if 5|a and5|b then5|(a+b). Introduce witnesses, keep variables arbitrary, derive the required form, name the final witness, and explain why examples are insufficient.

**Task ID:** `T22V3::T22E-DISC01::S09-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Prove directly: if e is even and m any integer, then em is even. Identify the final witness.

**Task ID:** `T22V3::T22E-DISC01::S09-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S10 — Proof by contraposition

**Session ID:** `T22V3::T22E-DISC01::S10@1`

## Entry prerequisites

- M03-S03
- M03-S08
- M03-S09

## Required ownership

- Write the exact contrapositive.
- Use logical equivalence correctly.
- Prove the contrapositive.
- Avoid proving the converse.
- Reconnect to the original implication.

## Canonical learning content

To prove P→Q by contraposition, prove the logically equivalent ¬Q→¬P; proving Q→P would be the converse, not the same theorem. Worked example: Prove “if n² is odd, then n is odd.” Its contrapositive is “if n is even, then n² is even.” Write n=2k; then n²=4k²=2(2k²), so the contrapositive holds and therefore the original implication holds. Guided check: For |x|<3→x²<9, write the contrapositive exactly and identify which inequality endpoints change under negation.

## Deep learning overlay

Contraposition is not a different theorem; it is a logically equivalent route to the same implication. Use it when ¬Q gives a more concrete algebraic form than P.

**Construction scaffold:** write the exact contrapositive before doing algebra. Then prove that statement directly. At the end, explicitly reconnect the proved contrapositive to the original implication. A proof of the converse—even a correct one—does not establish the target.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** because contraposition is named and its architecture has been taught. Strategy choice is practiced later on fresh mixed-method problems.

## Main task — learner-facing

Prove by contraposition: for every integer n, if n² is even then n is even. Write the exact contrapositive, prove it from n=2k+1, distinguish the converse, and reconnect to the original.

**Task ID:** `T22V3::T22E-DISC01::S10-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Prove by contraposition over real x: if x²<1 then |x|<1.

**Task ID:** `T22V3::T22E-DISC01::S10-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S11 — Proof by contradiction

**Session ID:** `T22V3::T22E-DISC01::S11@1`

## Entry prerequisites

- M03-S06
- M03-S08
- M03-S09

## Required ownership

- Assume the negation.
- Derive consequences.
- Identify an impossibility.
- Discharge the assumption.
- Distinguish contradiction from failed search.

## Canonical learning content

A contradiction proof assumes the exact negation of the target, derives consequences using valid steps, reaches an explicit impossibility, and then rejects the assumption. Failed search is not a contradiction. Worked example: There is no smallest positive rational number. If r>0 were the smallest positive rational, then r/2 would also be a positive rational and would satisfy 0<r/2<r, contradicting minimality. Guided check: Assume there is a largest negative rational q and use q/2 to identify the contradiction.

## Deep learning overlay

MIT MCS stresses that a contradiction must be a logically impossible consequence, not merely an inconvenient or surprising outcome. The opening assumption must be the exact negation of the target.

**Construction scaffold:** negate the claim carefully, derive consequences, and identify the explicit collision—such as P and ¬P, an impossible inequality, or violation of the defining property being assumed. Then discharge the assumption. “I tried values and found none” is search failure, not contradiction.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction**. The canonical wording names contradiction (and Transfer supplies `N+1`), so this is execution evidence, not method discovery.

## Main task — learner-facing

Prove by contradiction that no integer n can be both even and odd. Assume the negation, unpack parity forms, derive an explicit impossibility, name it, and explain why 'I found no example' is not proof.

**Task ID:** `T22V3::T22E-DISC01::S11-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Prove by contradiction that there is no greatest integer, using N+1.

**Task ID:** `T22V3::T22E-DISC01::S11-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S12 — Remainder classes & exhaustive proof cases

**Session ID:** `T22V3::T22E-DISC01::S12@1`

## Entry prerequisites

- M03-S08
- M03-S09

## Required ownership

- Write n=dq+r with 0≤r<d.
- List all small remainder classes.
- Prove every exhaustive case.
- Recombine into a universal result.
- Distinguish exhaustive proof from finite examples.

## Canonical learning content

For positive d, every integer has exactly one form n=dq+r with 0≤r<d. An exhaustive case proof lists every possible r and proves the claim symbolically in each case; checking a few numerical inputs is not the same thing. Worked example: Every integer square has remainder 0 or 1 on division by 3. If n=3q, n²=9q²; if n=3q+1, n²=3(3q²+2q)+1; if n=3q+2, n²=3(3q²+4q+1)+1. These three cases exhaust the integers. Guided check: Using the two parity forms n=2q and n=2q+1, show that n³ has the same parity as n.

## Deep learning overlay

Proof by cases is valid only when the cases cover the entire domain. Remainder classes are powerful because the division algorithm gives exactly such an exhaustive partition.

**Construction scaffold:** choose a modulus that matches the target, write every possible remainder form symbolically, prove the claim in each branch, and state why those branches are exhaustive. Do not replace symbolic cases with a handful of sample integers.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** of exhaustive-case reasoning. Strategy selection is not inferred from a task that already asks for exhaustive cases.

## Main task — learner-facing

Begin by stating the general remainder form n=dq+r with 0≤r<d for integer d>0. Then prove every integer square leaves remainder0 or1 when divided by4. Use exhaustive parity/remainder forms, compute both cases, combine them, and explain why checking n=1,2,3,4 alone is not proof.

**Task ID:** `T22V3::T22E-DISC01::S12-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Prove by exhaustive parity cases that n(n+1) is even for every integer n.

**Task ID:** `T22V3::T22E-DISC01::S12-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S13 — Mathematical induction

**Session ID:** `T22V3::T22E-DISC01::S13@1`

## Entry prerequisites

- M02 sequences/sigma
- M03-S09

## Required ownership

- State induction domain/start.
- Verify base case.
- State induction hypothesis.
- Use it in k+1 step.
- Conclude by induction.

## Canonical learning content

Ordinary induction proves an integer-indexed claim by verifying the first case, assuming the claim for an arbitrary k, and using that exact hypothesis to derive the k+1 case. Worked example: prove 7|(8^n−1) for n≥1. The base n=1 gives 8−1=7. Assume 8^k−1=7q for some integer q; then 8^(k+1)−1=8(8^k−1)+7=7(8q+1), so the next case follows. Guided check: for 1+2+⋯+n=n(n+1)/2, state the base case, induction hypothesis, and exact k+1 target, but do not finish the algebra.

## Deep learning overlay

Induction is best understood as a proof architecture for a chain of indexed claims, not as “checking lots of examples.” The hypothesis is temporary and applies to an arbitrary k in the allowed range.

**Construction scaffold:** write P(n), state the starting index, verify the base, assume P(k), then derive P(k+1) while visibly using the hypothesis. Avoid circularity: you may not assume the k+1 claim itself. Finish by stating exactly which n are covered.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** of induction. Their value is correct base/hypothesis/step execution, not recognition of an unnamed method.

## Main task — learner-facing

Prove by induction 1+3+5+⋯+(2n−1)=n² for every integer n≥1. State domain, base, hypothesis, k+1 step and final conclusion.

**Task ID:** `T22V3::T22E-DISC01::S13-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Prove by induction 2^n≥n+1 for every integer n≥0.

**Task ID:** `T22V3::T22E-DISC01::S13-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S14 — Strong induction & recursive claims

**Session ID:** `T22V3::T22E-DISC01::S14@1`

## Entry prerequisites

- M03-S13 ordinary induction
- M02-S20 recurrence notation

## Required ownership

- Verify all required bases.
- State an all-prior hypothesis.
- Reduce target to earlier covered cases.
- Avoid circularity.
- Explain why strong induction fits.

## Canonical learning content

Strong induction assumes every earlier case from the starting index through k, which is useful when the next case reduces to more than one possible earlier value. Worked example: every integer n≥2 is either prime or a product of primes. Base n=2 is prime. Assume the statement holds for every integer from2 through k. For k+1, if it is prime we are done; if it is composite, write k+1=ab with 2≤a,b≤k, apply the all-prior hypothesis to a and b, and combine their prime factorizations. Guided check: if a future target P(n) naturally reduces to a case P(m) with m<n but not necessarily m=n−1, explain why an all-prior hypothesis is useful and what must be true of the base range.

## Deep learning overlay

Strong induction is ordinary induction with a stronger usable hypothesis, not a logically stronger theorem. Hammack and MIT MCS both emphasize its value when the next case reduces to an earlier case other than k, or depends on several earlier cases.

**Construction scaffold:** determine how far backward the step may reach; that tells you how many initial bases must be verified. In the step, reduce k+1 to a strictly earlier index that is actually inside the covered range. If your reduction lands before the base range, the proof has a gap.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** of strong induction. A fresh mixed-method diagnostic appears only after this session.

## Main task — learner-facing

Use strong induction to prove every integer n≥8 can be written n=3a+5b for nonnegative integers a,b. Check enough bases, state the all-prior hypothesis, reduce k+1 to a strictly earlier covered integer, avoid circularity, conclude, and explain why access to more than only the immediately previous case is useful in this proof.

**Task ID:** `T22V3::T22E-DISC01::S14-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Let F1=1,F2=1,Fn=F(n−1)+F(n−2). Use strong induction to prove Fn≤2^(n−1) for all n≥1.

**Task ID:** `T22V3::T22E-DISC01::S14-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# Spire Strategy Lab A — Proof-route selection after S14

**Status:** unscored diagnostic/practice; **not** canonical M03 ownership evidence.

Run this only **after S14 Main and Transfer have been attempted**. Hide session titles and method names. For each statement, the learner must first record:

1. the logical form / target;
2. at least one plausible proof route;
3. why that route might simplify the problem;
4. the first mathematical move.

Only after commitment may Spire discuss alternative routes. Do not map success here backward into a fixed-task pass.

### Fresh diagnostic probe A1
Let \(a,b\in\mathbb Z\). Prove that if \(a+b\) is odd, then exactly one of \(a,b\) is odd.

### Fresh diagnostic probe A2
Prove that \(n^3-n\) is divisible by \(3\) for every integer \(n\).

### Fresh diagnostic probe A3
Prove that there is no integer \(n\) satisfying \(n^2=2\).

### Fresh diagnostic probe A4
Prove
\[
1+2+4+\cdots+2^n=2^{n+1}-1
\]
for every integer \(n\ge0\).

### Fresh diagnostic probe A5
Prove that every positive integer can be written as a sum of distinct powers of \(2\).

**Diagnostic target:** can the learner choose among parity/cases, contradiction, ordinary induction and all-prior reasoning without being told which named method to use? These probes were clone-audited against S01–S14 so the decisive route is not merely the same assessed archetype with changed constants.

---

# M03 · S15 — Sets, membership, subsets & equality

**Session ID:** `T22V3::T22E-DISC01::S15@1`

## Entry prerequisites

- M03-S01

## Required ownership

- Interpret x∈A.
- Interpret C⊆A.
- Determine equality by same elements.
- Recognize repetition/order do not matter.
- Distinguish x∈A from {x}⊆A.

## Canonical learning content

Sets are unordered and duplicate listings collapse. x∈A is membership; C⊆A means every C-element lies in A. Worked example: {1,1,3}={3,1}; 1∈{1,3}; {1}⊆{1,3}. Guided check: Compare {a,b} with {b,a,a}.

## Deep learning overlay

Hammack and Velleman both treat set notation as mathematical language, not decoration. The most important distinction is elementhood versus subset inclusion: x∈A is a claim about an object; {x}⊆A is a claim about a set.

**Construction scaffold:** reduce equality to “same elements,” not same written order. Duplicates do not create new elements. When nested braces appear, count levels carefully—∅, {∅}, and {{∅}} are different objects.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Let A={1,2,2,3},B={3,2,1},C={1,2}. Decide 2∈A,C⊆A,A=B,A=C,{2}⊆A. Explain repetition/order and distinguish membership from singleton-subset.

**Task ID:** `T22V3::T22E-DISC01::S15-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let D={−1,0,1} and E={x among −2,−1,0,1,2 such that x²≤1}. Write E, decide D=E,{−1,1}⊆D and2∈E.

**Task ID:** `T22V3::T22E-DISC01::S15-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S16 — Power sets & finite cardinality

**Session ID:** `T22V3::T22E-DISC01::S16@1`

## Entry prerequisites

- M03-S15
- M01 powers

## Required ownership

- Interpret P(A) as all subsets.
- Include ∅ and A.
- Use |P(A)|=2^|A|.
- Distinguish ∅ from {∅}.
- List a small power set without omissions.

## Canonical learning content

P(A) contains every subset, including ∅ and A. Each element has include/exclude choice, so an n-element set has 2^n subsets. Worked example: P({x,y})={∅,{x},{y},{x,y}}. Guided check: Find P({1}) and compare ∅ with {∅}.

## Deep learning overlay

The formula 2^n should be understood as a product-rule argument: every one of n elements creates a binary include/exclude decision. That gives a bijection between subsets and length-n binary choice strings.

**Construction scaffold:** when listing a small power set, organize by subset size or binary choices to avoid omissions. Remember that ∅ is a subset of every set, while {∅} is a one-element set only when ∅ itself is an allowed element.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Let A={a,b,c}. List P(A), identify ∅ and A, compute |P(A)| by list and2^|A|, and explain why ∅≠{∅}.

**Task ID:** `T22V3::T22E-DISC01::S16-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let B=∅ and C={∅}. Find P(B),P(C) and cardinalities.

**Task ID:** `T22V3::T22E-DISC01::S16-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S17 — Union, intersection, difference & complement

**Session ID:** `T22V3::T22E-DISC01::S17@1`

## Entry prerequisites

- M03-S15 finite sets
- JIT set-operation definitions in this lesson

## Required ownership

- Compute union.
- Compute intersection.
- Compute difference.
- Compute complement relative to U.
- Explain complement depends on U.

## Canonical learning content

For subsets of a stated universe U, A∪B contains elements in A or B, A∩B contains elements in both, A\B contains elements in A but not B, and A^c contains the elements of U outside A. Complement therefore depends on the chosen universe. Worked example: Let U={1,2,3,4,5}, A={1,3,5}, B={3,4}. Then A∪B={1,3,4,5}, A∩B={3}, A\B={1,5}, B\A={4}, and A^c={2,4}. Guided check: With U={0,1,2,3,4}, C={0,2,4}, D={2,3}, compute C∪D, C∩D, C\D and C^c.

## Deep learning overlay

Translate every set operation into an elementhood sentence. This is the bridge to S18: union corresponds to “or,” intersection to “and,” difference to “in A and not in B,” and complement to negation relative to a stated universe.

**Construction scaffold:** write U first whenever complements appear. Difference is directional: A\B is generally not B\A. Complement is undefined until the ambient universe is known.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The canonical Transfer is a **close-surface set-operation check**, not unfamiliar Transfer. It can support fluency evidence but should not be used as evidence of spontaneous method selection.

## Main task — learner-facing

Let U={1,2,3,4,5,6,7,8},A={2,4,6,8},B={5,6,7,8}. Compute union, intersection, both differences, A^c,B^c and explain universe dependence.

**Task ID:** `T22V3::T22E-DISC01::S17-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let U={1,2,…,12}. Let A be the even elements of U and B the elements of U divisible by3. Determine A∪B, A∩B, A\B and A^c, and give the cardinality of each. Explain each result from the defining properties before or while listing the elements.

**Task ID:** `T22V3::T22E-DISC01::S17-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S18 — Set identities & De Morgan laws

**Session ID:** `T22V3::T22E-DISC01::S18@1`

## Entry prerequisites

- M03-S17 set operations
- M03-S04 iff reasoning
- M03-S09 arbitrary-object proof structure

## Required ownership

- Translate a supplied De Morgan identity into elementwise membership logic.
- Rewrite difference as intersection with complement.
- Prove equality elementwise.
- Use iff to establish both containments.
- Distinguish finite check from universal proof.

## Canonical learning content

To prove two sets X and Y are equal, take an arbitrary element x and prove x∈X iff x∈Y; the iff chain establishes both containments at once. Also, x∈A\B means x∈A and x∉B. Worked example: Prove (A∩B)^c=A^c∪B^c. For arbitrary x, x∈(A∩B)^c iff x∉A∩B iff x∉A or x∉B iff x∈A^c or x∈B^c iff x∈A^c∪B^c. Guided check: Prove (A^c)^c=A elementwise by starting from an arbitrary x and writing an iff chain.

## Deep learning overlay

This is where logic and set theory fuse. Velleman explicitly develops set identities by translating membership claims into propositional formulas; the proof becomes an equivalence chain.

**Construction scaffold:** choose an arbitrary x. Expand membership on the left one definition at a time, use a justified logical equivalence, and rebuild the right side. Because the chain is iff throughout, both containments are proved simultaneously. A finite Venn/check can build intuition but does not prove the universal identity.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** of arbitrary-element set equality. The method is intentionally explicit; no independent method-selection claim is made.

## Main task — learner-facing

Prove for arbitrary A,B⊆U that (A∪B)^c=A^c∩B^c using an arbitrary x and iff chain. Rewrite A\B, verify the identity on U={1,2,3,4},A={1,2},B={2,3}, and explain why the finite check is not universal proof.

**Task ID:** `T22V3::T22E-DISC01::S18-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Prove the distributive identity A∩(B∪C)=(A∩B)∪(A∩C) elementwise for arbitrary subsets A,B,C⊆U. Use an arbitrary x and an iff chain, and explain why the argument establishes set equality.

**Task ID:** `T22V3::T22E-DISC01::S18-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S19 — Cartesian products & relations

**Session ID:** `T22V3::T22E-DISC01::S19@1`

## Entry prerequisites

- M03-S15
- M03-S16

## Required ownership

- Respect ordered-pair order.
- Construct A×B.
- Use |A×B|=|A||B|.
- Interpret a relation as subset of A×B.
- Recognize two outputs for one input violates function condition.

## Canonical learning content

A Cartesian product A×B contains ordered pairs (a,b), so (a,b) and (b,a) are generally different objects. A relation from A to B is any subset of A×B; it is a function only when every input in A occurs with exactly one output. Worked example: {1,2}×{p,q}={(1,p),(1,q),(2,p),(2,q)}. The relation {(1,p),(2,q)} is a function from {1,2} to {p,q}, whereas {(1,p),(1,q)} is not because input 1 has two outputs. Guided check: Build {u,v}×{0,1,2} and give one relation on it that is a function and one that is not.

## Deep learning overlay

Cartesian products turn “pairing choices” into a set of ordered objects. The order matters because the first and second coordinates have different roles. A relation is deliberately broad: any subset of A×B qualifies.

**Construction scaffold:** first build the ambient product, then test whether every listed relation pair belongs to it. For a function A→B, check two conditions: every domain input appears, and no domain input has two different outputs.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The canonical Transfer is a **close-surface relation/function classification task**. It is useful for representation fluency but not for unfamiliar-transfer claims.

## Main task — learner-facing

Let A={1,2,3},B={x,y}. List A×B, then compute its size both by counting the listed pairs and by using |A×B|=|A||B|. Let R={(1,x),(2,x),(2,y)}. Verify R⊆A×B and decide whether R is a function A→B, explaining the exact function-condition failure.

**Task ID:** `T22V3::T22E-DISC01::S19-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Let C={x,y,z},D={0,1},S={(x,0),(y,0),(z,1)}. Compute |C×D|, verify relation and decide function condition.

**Task ID:** `T22V3::T22E-DISC01::S19-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S20 — Functions as mappings; domain, codomain, image & preimage

**Session ID:** `T22V3::T22E-DISC01::S20@1`

## Entry prerequisites

- M02 functions/inverses
- M03-S19

## Required ownership

- Verify one-output-per-input condition.
- Distinguish domain/codomain/range.
- Compute image f(S).
- Compute preimage f⁻¹(T) without invertibility.
- Recognize codomain may exceed range.

## Canonical learning content

For f:A→B, A is the domain and B the codomain; the range is only the codomain values actually hit. For S⊆A, f(S) is the image of S. For T⊆B, f⁻¹(T) means all inputs whose outputs lie in T and does not require f to have an inverse function. Worked example: Let h:{p,q,r}→{0,1,2,3} satisfy h(p)=1,h(q)=1,h(r)=3. The range is {1,3}; h({p,r})={1,3}; h⁻¹({1})={p,q}; 0 and 2 are codomain values outside the range. Guided check: For k:{a,b,c,d}→{x,y,z} with a,b↦x, c↦y, d↦z, find the range and the preimage of {x,z}.

## Deep learning overlay

This session repairs a common ambiguity from elementary function notation: codomain is declared structure, range is what is actually reached. Preimage notation is set-theoretic and exists for any function; it does not assert an inverse function exists.

**Construction scaffold:** keep four objects separate: domain, codomain, range, and the image/preimage of selected subsets. When computing f⁻¹(T), collect every domain element whose output lands anywhere in T.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

Let f:A→B with A={1,2,3},B={a,b,c},f(1)=a,f(2)=b,f(3)=a. Verify function condition, state domain/codomain/range, compute f({1,3}), f⁻¹({a}), and identify the unused codomain value.

**Task ID:** `T22V3::T22E-DISC01::S20-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

On D={−2,−1,0,1,2},g(x)=x² with codomain C={0,1,4,9}. Find range,g({−2,1}),g⁻¹({1,4}) and unused codomain.

**Task ID:** `T22V3::T22E-DISC01::S20-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S21 — Injective, surjective, bijective & inverse claims

**Session ID:** `T22V3::T22E-DISC01::S21@1`

## Entry prerequisites

- M03-S20
- M02-S08

## Required ownership

- Apply injective definition.
- Apply surjective definition.
- Identify bijective iff both.
- Construct inverse of a finite bijection.
- Explain non-bijection lacks a two-sided inverse.

## Canonical learning content

Injective means distinct inputs never collide; surjective means every codomain value is hit; bijective means both and is exactly the finite-map situation in which a two-sided inverse can undo the map in both directions. Worked example: Let h:{1,2}→{a,b,c} with h(1)=a,h(2)=b. It is injective but not surjective because c is never hit, so no two-sided inverse h⁻¹:{a,b,c}→{1,2} can satisfy h∘h⁻¹=id on the whole codomain. Guided check: Classify the map {u,v,w}→{0,1,2} given u↦2,v↦0,w↦1, and if possible write its inverse.

## Deep learning overlay

Injective and surjective answer different questions: collisions among inputs versus coverage of the codomain. For finite sets, diagrams can help, but the definitions—not the diagram—must decide the classification.

**Construction scaffold:** test injectivity by asking whether two distinct inputs can share an output; test surjectivity by scanning the declared codomain for missed values. Only after both hold should you build a two-sided inverse.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **retrieval** of finite bijection/inverse classification. Transfer is **changed-surface Transfer** from bijection/inverse construction to a collision/surjection surface and impossibility of a two-sided inverse.

## Main task — learner-facing

Let f:{1,2,3}→{a,b,c} with f(1)=b,f(2)=c,f(3)=a. Decide injective/surjective/bijective, construct f⁻¹, and verify it is two-sided.

**Task ID:** `T22V3::T22E-DISC01::S21-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let g:{1,2,3}→{a,b},g(1)=a,g(2)=a,g(3)=b. Classify and explain why no two-sided inverse exists.

**Task ID:** `T22V3::T22E-DISC01::S21-T@1`  
**Obligation version:** `1`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S22 — Equivalence relations & partitions

**Session ID:** `T22V3::T22E-DISC01::S22@1`

## Entry prerequisites

- M03-S19 relations
- M03-S09 proof structure
- JIT equivalence-relation definitions in this lesson

## Required ownership

- Verify reflexivity.
- Verify symmetry.
- Verify transitivity.
- Conclude equivalence only after all three.
- Identify classes/partition.

## Canonical learning content

For a relation R on a set D: reflexive means ∀x∈D, xRx; symmetric means ∀x,y∈D, xRy⇒yRx; transitive means ∀x,y,z∈D, (xRy and yRz)⇒xRz. Only when all three hold is R an equivalence relation. The class [x]={y∈D:yRx}; equivalence classes cover D and any two classes are either identical or disjoint, so they form a partition. Worked example: On D={11,12,21,22}, define xRy when x and y have the same last digit. Reflexivity holds because every number has its own last digit; symmetry holds because “same last digit” is symmetric; transitivity holds because if x and y, then y and z, have the same last digit, x and z do too. The classes are {11,21} and {12,22}. Guided check: On {p,q,r}, verify that ordinary equality is an equivalence relation and list its classes.

## Deep learning overlay

An equivalence relation is not “a relation that seems similar.” It is a relation satisfying three separate quantified laws. The reward is structural: the equivalence classes partition the domain into disjoint blocks that cover it.

**Construction scaffold:** prove reflexivity, symmetry, and transitivity separately with arbitrary legal elements. Do not infer one property from another. Afterward, identify classes by the actual defining relation and verify they cover the domain without overlapping except when identical.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The fixed Main and Transfer are **proof reconstruction** of equivalence-relation verification. The learner must execute all three properties and classes; method choice is not claimed.

## Main task — learner-facing

On integers define a~b when a,b have the same parity. Prove reflexivity, symmetry and transitivity generally, conclude equivalence, and identify the classes.

**Task ID:** `T22V3::T22E-DISC01::S22-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

On D={0,1,2,3,4,5}, xRy when x,y have the same remainder on division by3. Verify equivalence and list classes.

**Task ID:** `T22V3::T22E-DISC01::S22-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S23 — Addition & product counting principles

**Session ID:** `T22V3::T22E-DISC01::S23@1`

## Entry prerequisites

- M01 arithmetic
- M03-S16

## Required ownership

- Use addition for mutually exclusive alternatives.
- Use product for sequential stages.
- Distinguish alternatives from stages.
- Check a count with tree/table/decomposition.
- State direct addition needs disjointness or correction.

## Canonical learning content

Use addition for disjoint alternative branches and multiplication for sequential stages. If alternative branches overlap, direct addition double-counts and needs correction. Worked example: choosing the first coordinate from {α,β} and the second coordinate from {1,2,3,4,5} gives 2·5 ordered pairs by the product rule. Separately, if E={2,4,6,8} and O={1,3,5} are disjoint, then |E∪O|=4+3=7 by the addition rule. Guided check: a path chooses one of3 gates and then one of4 rooms; separately, two disjoint boxes contain5 and2 objects. Identify which count is sequential and which is alternative before calculating.

## Deep learning overlay

Counting is model-building before arithmetic. Ask whether you are traversing sequential stages (product) or choosing among disjoint alternative branches (addition). Zeitz’s “recast the problem” attitude is useful: a tree, table, or explicit decomposition should agree with the formula.

**Construction scaffold:** define what a single outcome is. Then decide whether each decision extends an outcome or creates an alternative category. If alternatives overlap, raw addition is invalid and S28-style correction will eventually be needed.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Main task — learner-facing

A shop offers4 shirts and3 trousers; an outfit chooses one each. A commuter chooses exactly one of5 bus routes or3 train routes. Compute both counts, identify the rule, give a table/tree check, and state the disjointness condition.

**Task ID:** `T22V3::T22E-DISC01::S23-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

An event badge is made in exactly one of two disjoint formats. A Visitor badge chooses one of3 colors and then one of4 digits. A Staff badge chooses one of2 departments and then one of5 levels. How many badges are possible in total? Explain why choices within a format combine differently from the two alternative formats.

**Task ID:** `T22V3::T22E-DISC01::S23-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S24 — Permutations, factorials & ordered selections

**Session ID:** `T22V3::T22E-DISC01::S24@1`

**Session instruction version:** `m03-s24-instruction-v17-separation-r1`  
**Historical provenance:** old v1.6 S24 lesson exposure maps to S24-T answer exposure; pre-exposure attempts remain historically distinct.

## Entry prerequisites

- M03-S23
- M03-S21

## Required ownership

- Use n! for distinct arrangements.
- Interpret factorial as descending product.
- Use nPr for ordered selection without replacement.
- Explain why labels/ranks make order matter.
- Check with sequential-choice factors.

## Canonical learning content

For n distinct objects, n!=n(n−1)⋯1 counts all orderings. Filling r labeled positions without replacement gives P(n,r)=n!/(n−r)! because the available choices decrease at every stage. Worked example: five runners can receive gold, silver and bronze in 5·4·3=P(5,3)=60 ways; the medal labels make the order matter. Guided check: from eight candidates, count the ordered choices for captain and deputy as 8·7=P(8,2), and explain why reversing the two people gives a different assignment.

## Deep learning overlay

Permutation formulas should be derived from sequential choices, not treated as magic notation. The decisive question is whether swapping selected objects changes the outcome. If positions are labeled, order matters.

**Construction scaffold:** write the descending product first, then compress it into factorial or P(n,r) notation. This makes it easier to audit whether replacement is allowed and whether the positions are genuinely distinct.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **retrieval/fluency** on factorial/permutation structure. Transfer is **changed-surface Transfer**: after the v1.7 lesson repair, the learner must recast ordered selection as an injective finite map; that function representation is no longer rehearsed in visible S24 instruction.

## Main task — learner-facing

Six distinct books are arranged on a shelf; separately gold/silver/bronze are awarded to3 distinct people from6 finalists. Compute both by factorial/permutation notation, expand products, explain medal order, and verify sequentially.

**Task ID:** `T22V3::T22E-DISC01::S24-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

Let D={a,b,c} and let C be a7-element codomain. How many injective functions f:D→C are possible? Count sequentially, express the result as P(7,3), and explain why the labels a,b,c make the output assignments ordered.

**Task ID:** `T22V3::T22E-DISC01::S24-T@1`  
**Obligation version:** `2`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S25 — Permutations with repeated objects & multinomial grouping

**Session ID:** `T22V3::T22E-DISC01::S25@1`

**Session instruction version:** `m03-s25-instruction-v17-factorial-boundary-r1`  
**Provenance note:** this records the v1.7 factorial-only lesson change. It does **not** declare historical answer contamination for S25.

## Entry prerequisites

- M03-S24
- M03-S23

## Required ownership

- Recognize indistinguishable objects.
- Use repeated-object factorial quotient.
- Use multinomial count for labeled groups.
- Explain internal-permutation division.
- Validate on a small repeated-object example.

## Canonical learning content

If swapping identical copies changes nothing visible, n! overcounts and internal repeat factorials must be divided out. Worked example: AABC has4!/2!=12 distinct strings. Guided check: count AABB arrangements. Labeled-group bridge: if n distinct objects are split into labeled groups of fixed sizes n1,…,nk with n1+⋯+nk=n, first imagine a temporary ordering of all n objects. There are n! such orders. Within each labeled group, however, its n_i! internal rearrangements do not change the assignment, so divide them out. Therefore the number of labeled-group assignments is n!/(n1!⋯nk!). The group labels remain distinct and are not divided out. For example, assigning6 distinct cards to labeled boxes A(2),B(1),C(3) gives6!/(2!1!3!) assignments.

## Deep learning overlay

The denominator in a repeated-object count corrects a specific overcount: naive n! distinguishes internal swaps of identical copies even though those swaps do not produce a new visible arrangement. MIT MCS’s “bookkeeper” perspective is useful because it makes the division structural rather than mnemonic.

**Construction scaffold:** first imagine temporarily labeling identical copies; count all labeled arrangements; then identify which internal swaps leave the visible outcome unchanged and divide by those factorials. For labeled groups, group labels remain meaningful even though order inside a group does not.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **retrieval** of repeated-object correction. Transfer is **changed-surface Transfer** with a fixed-member constraint and labeled-group quotient. S25 must stay factorial-only: combination notation belongs to S26.

## Main task — learner-facing

How many distinct strings can be formed from BALLOON? Identify repeats, write the corrected factorial formula, explain the overcounting divided out, and validate on AAB by listing its distinct strings.

**Task ID:** `T22V3::T22E-DISC01::S25-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Nine distinct students are assigned to labeled shifts Morning(4), Afternoon(3), Night(2), and student A must be in Morning. Count the valid assignments. Explain what is fixed first, why internal order within each shift is irrelevant, and why the shift labels remain distinct.

**Task ID:** `T22V3::T22E-DISC01::S25-T@1`  
**Obligation version:** `3`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S26 — Combinations, binomial coefficients, subsets & binomial expansion

**Session ID:** `T22V3::T22E-DISC01::S26@1`

## Entry prerequisites

- M03-S24
- M03-S16

## Required ownership

- Use nCr formula.
- Explain order irrelevance.
- Use nCr symmetry.
- Connect combinations to subsets.
- State and use the finite binomial theorem for positive integer n, and explain combinatorially why the coefficient of x^(n−k)y^k is C(n,k).

## Canonical learning content

A combination selects an r-element subset, so internal order is irrelevant: C(n,r)=n!/[r!(n−r)!]. An ordered r-selection can be built in two stages: first choose the r-element subset in C(n,r) ways, then order its r chosen elements in r! ways. Therefore P(n,r)=C(n,r)·r!, which explains the factorial formula rather than treating division by r! as a cancellation trick. Choosing the included r items is symmetric with choosing the excluded n−r items, so C(n,r)=C(n,n−r). The same subset-counting idea gives the finite binomial theorem. In the product of n factors (x+y), a term x^(n−k)y^k is produced by choosing exactly which k of the n factors contribute y; there are C(n,k) such choices. Hence for every positive integer n, (x+y)^n=Σ(k=0..n) C(n,k)x^(n−k)y^k. Worked example: (x+y)^3=x³+3x²y+3xy²+y³ because the coefficients are C(3,0),C(3,1),C(3,2),C(3,3). Guided check: in (p+q)^6, do not expand the whole expression. Explain why the coefficient of p^4q^2 is C(6,2)=15 by choosing which two factors contribute q, and connect that choice-count to the general coefficient C(n,k).

## Deep learning overlay

This is a high-importance ownership session because downstream M10 consumes the **general** finite binomial theorem, not merely a memorized small expansion. MIT MCS gives the right conceptual picture: each expanded term corresponds to choosing which factors contribute one of the two summands.

**Construction scaffold:** keep three layers separate: (1) unordered subset count C(n,r), (2) the bridge P(n,r)=C(n,r)r!, and (3) the factor-choice argument for the coefficient C(n,k) in the general theorem. Complementary-subset symmetry is conceptual, not just a factorial identity. The Main must still require the learner to state/use the theorem and explain the general coefficient mechanism independently.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **retrieval/production evidence**: the theorem and coefficient mechanism are explicitly taught, but the learner must produce them without the formula being printed in the task. Transfer is **retrieval** for subset interpretation, complementary symmetry, and ordered↔unordered conversion. These labels are descriptive, not prestige scores.

## Main task — learner-facing

For a committee of4 chosen from10 distinct people, compute the number of committees using combination notation and explain why internal order is irrelevant. State the finite binomial theorem for positive integer n, including the general coefficient of x^(n−k)y^k. Explain combinatorially why that coefficient is C(n,k), and then use the theorem to expand (u+v)^5 completely.

**Task ID:** `T22V3::T22E-DISC01::S26-M@1`  
**Obligation version:** `5`

## Transfer task — release only at normal transfer stage

For an 8-element set, count its 3-element subsets using C(8,3), explain why this is an unordered subset count, explain the complementary-subset symmetry C(8,3)=C(8,5), then count the ordered triples obtained by ordering each selected subset.

**Task ID:** `T22V3::T22E-DISC01::S26-T@1`  
**Obligation version:** `3`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S27 — Stars-and-bars: combinations with repetition

**Session ID:** `T22V3::T22E-DISC01::S27@1`

## Entry prerequisites

- M03-S26 combinations
- M01 equations
- JIT stars-and-bars encoding in this lesson

## Required ownership

- Model nonnegative solutions with stars-and-bars.
- Use C(n+k−1,k−1).
- Convert positive constraints by shifting.
- Interpret identical objects into labeled boxes.
- Recognize upper bounds require correction.

## Canonical learning content

Stars-and-bars encodes a nonnegative solution x1+⋯+xk=n by writing n identical stars and k−1 separators; the numbers of stars between separators are x1,…,xk. This is a bijection: every distribution gives one string and every string gives one distribution, so choosing the separator positions among n+k−1 positions gives C(n+k−1,k−1). Worked example: Five identical tokens in three labeled boxes can be written ★★|★|★★ for (2,1,2). There are 5 stars and 2 bars, so C(7,2)=21 distributions. If each box must be nonempty, reserve one token per box first. Guided check: Encode all nonnegative solutions of x+y=4 with four stars and one bar, and verify there are C(5,1)=5.

## Deep learning overlay

Stars-and-bars is a bijection, not a formula to deploy by keyword. You are translating integer solutions into strings of identical stars and separators. That translation is what justifies the binomial coefficient.

**Construction scaffold:** identify the number of identical objects, the number of labeled boxes/variables, and whether zero is allowed. Positive lower bounds are handled by shifting first. Upper bounds break the plain bijection and require a new correction method; recognizing that failure is part of ownership.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

The canonical Transfer remains within the same stars-and-bars model. Treat it as model fluency rather than unfamiliar-method evidence.

## Main task — learner-facing

Count nonnegative integer solutions to x1+x2+x3=7. Then count positive solutions y1+y2+y3=8 by shifting. Explain identical-object/labeled-box interpretation and why xi≤3 invalidates the plain formula.

**Task ID:** `T22V3::T22E-DISC01::S27-M@1`  
**Obligation version:** `1`

## Transfer task — release only at normal transfer stage

For a monomial x^a y^b z^c w^d, define its total degree as a+b+c+d, where a,b,c,d are nonnegative integers. How many such monomials have total degree10? How many have all four exponents positive? Explain the exponent-vector ↔ stars-and-bars correspondence.

**Task ID:** `T22V3::T22E-DISC01::S27-T@1`  
**Obligation version:** `3`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S28 — Complement counting & inclusion-exclusion

**Session ID:** `T22V3::T22E-DISC01::S28@1`

## Entry prerequisites

- M03-S17
- M03-S23

## Required ownership

- Use two-set inclusion-exclusion.
- Explain overlap subtraction.
- Use complement to count neither.
- Compute exactly-one counts.
- Apply inclusion-exclusion to divisibility counting.

## Canonical learning content

For two finite sets, |A∪B|=|A|+|B|−|A∩B| because naive addition counts each overlap element twice. Worked example: let A={1,2,3,4} and B={3,4,5}. Listing gives A∪B={1,2,3,4,5}; the count 4+3 overcounts the two shared elements, so 4+3−2=5. Guided check: with X={a,b,c} and Y={c,d}, list X∪Y and explain exactly which element naive addition counts twice; then, in a six-element universe where |X∪Y|=4, determine how many elements lie outside the union. Bridge for later synthesis: derive the three-set rule by adding C to A∪B. Since |(A∪B)∩C|=|A∩C|+|B∩C|−|A∩B∩C|, substitution gives |A∪B∪C|=|A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|.

## Deep learning overlay

Inclusion–exclusion is bookkeeping for multiplicity. Count how many times an object is included by naive addition, then correct that multiplicity. Zeitz’s “count the complement” tactic is often the cleaner route when the forbidden set is easier to describe.

**Construction scaffold:** name the sets before inserting numbers. For two sets, singles count the overlap twice, so subtract it once. For “neither,” count the union and subtract from the universe. For “exactly one,” remove the overlap from each side separately.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **retrieval/application evidence** for the two-set inclusion-exclusion and complement structures taught immediately beforehand. Transfer is **changed-surface Transfer** from population categories to divisibility sets.

## Main task — learner-facing

Among100 users,60 use A,45 use B,25 use both. Find union, explain the correction, find neither, find exactly one, and write the set logic.

**Task ID:** `T22V3::T22E-DISC01::S28-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

How many integers1 through100 are divisible by2 or5? Use inclusion-exclusion and identify overlap.

**Task ID:** `T22V3::T22E-DISC01::S28-T@1`  
**Obligation version:** `1`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S29 — Pigeonhole principle

**Session ID:** `T22V3::T22E-DISC01::S29@1`

## Entry prerequisites

- M03-S23 counting principles
- M03-S16 finite cardinality
- JIT ceiling notation in this lesson

## Required ownership

- Identify pigeons and holes.
- Force collision with more pigeons than holes.
- Use generalized ceiling bound.
- Design non-obvious holes.
- Explain existence-not-identity.

## Canonical learning content

The pigeonhole principle says that if N objects are placed into k boxes, some box contains at least ⌈N/k⌉ objects, where ⌈x⌉ is the least integer greater than or equal to x. If every box held at most ⌈N/k⌉−1, the total capacity would be too small. The theorem proves that a collision exists, not which box contains it. Worked example: Put 17 files into 4 folders. Since ⌈17/4⌉=5, one folder has at least 5 files; otherwise four folders with at most 4 files each could hold only 16. Guided check: Ten socks are placed into three drawers. State the guaranteed occupancy and justify it by the same capacity argument.

## Deep learning overlay

The easy pigeonhole problems announce the holes; the interesting ones require you to invent them. Zeitz treats this as a major tactic because a good grouping can turn an opaque existence problem into a one-line capacity contradiction.

**Construction scaffold:** identify the objects to place, design classes, intervals, or already-owned remainder classes as holes, and prove the hole count. Then use the capacity argument. The conclusion is existential: it guarantees some collision but usually does not identify which specific pair or box.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **proof reconstruction** of the taught generalized pigeonhole ceiling/capacity argument on new numbers. Transfer is **changed-surface Transfer** because the learner must design the consecutive-pair holes.

## Main task — learner-facing

Twenty-five records are assigned to6 categories. Identify pigeons/holes, compute the guaranteed minimum occupancy, prove the ceiling bound, explain existence-not-identity, and state the simpler collision for13 people assigned to12 birth months.

**Task ID:** `T22V3::T22E-DISC01::S29-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Eleven distinct integers are chosen from {1,2,…,20}. Prove two chosen integers must be consecutive by designing10 pigeonholes.

**Task ID:** `T22V3::T22E-DISC01::S29-T@1`  
**Obligation version:** `1`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# M03 · S30 — M03 synthesis — claims, proof, sets & finite counting

**Session ID:** `T22V3::T22E-DISC01::S30@1`

## Entry prerequisites

- M03-S21 finite mappings
- M03-S26 combinations
- M03-S28 inclusion-exclusion
- M03-S29 pigeonhole

## Required ownership

- Execute a correct pigeonhole proof of a universal finite claim.
- Count fixed-size subsets.
- Use complement counting for a subset class.
- Use pigeonhole to prove noninjectivity.
- Count surjective finite functions by inclusion-exclusion.

## Canonical learning content

A synthesis problem may combine proof and counting tools, so first identify the mathematical objects and decide which earlier capability each subproblem appears to need. Finite-function bridge: if a domain has m elements and a codomain has r available values, each domain element independently has r output choices, so there are r^m total functions. If one specified codomain value is forbidden, only r−1 outputs remain for each input, giving (r−1)^m functions. Worked example: from a 3-element domain to a 4-element codomain there are 4^3 total functions; if one specified output value is forbidden there are 3^3. Guided check: for a separate finite-map problem, identify which quantities are determined by domain size, codomain size, and a forbidden-output restriction before choosing any counting formula.

## Deep learning overlay

The final fixed tasks are deliberately **not** treated as method-unlabelled: their wording names or scaffolds several tools. Contest/research-style orientation is trained separately in the fresh post-assessment strategy lab so canonical evidence is never pre-exposed.

**Construction scaffold:** separate the problem into mathematical objects and claims. The fixed task is allowed to scaffold named tools because it is reconstruction/integration evidence. For strategy-choice practice, use the post-S30 lab instead. Within the fixed task, justify the event sets, intersection sizes, and overlap correction rather than merely quoting a final count.

## Spire Master handling

Before the fixed task, ask the learner to state the relevant definitions/objects and the shape of a possible argument **without carrying out the ownership-critical steps for them**. If the learner stalls, give the smallest definition-level or representation-level prompt first; do not jump directly to the proof/count. Keep scratchwork separate from the final proof or explanation.

## Evidence role

Main is **proof reconstruction/integration** and Transfer is **changed-surface integration** over a function-space representation. Neither fixed task is claimed to be uncued method-selection evidence; fresh counting-strategy practice occurs only after S30.

## Main task — learner-facing

Let A={1,2,3,4,5,6,7,8}. Prove every 3-element subset contains two elements with the same parity by pigeonhole. Count all3-subsets, count all-same-parity subsets, and by complement count those containing both parities.

**Task ID:** `T22V3::T22E-DISC01::S30-M@1`  
**Obligation version:** `2`

## Transfer task — release only at normal transfer stage

Let D have4 elements and C={c1,c2,c3}. First prove no f:D→C can be injective and count all functions. Next define Ei as the set of functions that miss ci. Use the three-set inclusion-exclusion rule taught/derived in S28 (or justify the same correction by membership multiplicities), determine |Ei|, |Ei∩Ej| and |E1∩E2∩E3|, and use these sets to count the surjective functions.

**Task ID:** `T22V3::T22E-DISC01::S30-T@1`  
**Obligation version:** `3`

## Exit condition

Clear only when the learner independently satisfies all five ownership claims in both the Main/Transfer evidence expected by the runtime; correct final arithmetic without the required reasoning does not by itself establish ownership.

---

# Spire Strategy Lab B — Finite-counting route selection after S30

**Status:** unscored diagnostic/practice; **not** canonical M03 ownership evidence.

Run this only **after S30 Main and Transfer have been attempted**. Do not announce “product rule,” “complement,” “permutation,” “combination,” “stars-and-bars,” “inclusion–exclusion,” or “pigeonhole” before the learner commits to an organizing plan.

For each probe, require a short orientation note before calculation: **what are the objects, what would be overcounted, what is the natural universe, and what structural choice seems decisive?**

### Fresh diagnostic probe B1
How many length-5 strings over \(\{0,1,2,3\}\) contain at least one \(0\)?

### Fresh diagnostic probe B2
How many 4-element subsets of \(\{1,2,\ldots,10\}\) contain no two consecutive integers?

### Fresh diagnostic probe B3
Count the nonnegative integer solutions of
\[
x+y+z=12
\]
subject to \(x\le4\).

### Fresh diagnostic probe B4
Five points with integer coordinates are placed in the plane. Prove that two of them have a midpoint whose coordinates are both integers.

### Fresh diagnostic probe B5
How many permutations of \(\{1,2,3,4,5\}\) fix neither \(1\) nor \(2\)?

**Diagnostic target:** can the learner recognize and reconstruct a finite-counting model when the procedure is not named? These probes deliberately avoid replaying the fixed S23–S30 task archetypes with only changed constants or nouns. Success is diagnostic/practice evidence only and does not recertify a canonical task.

---

# Appendix A — Proof-construction discipline for M03

This appendix is learner-safe and contains no fixed-task answers.

## Read the goal before choosing a method

A recurring theme across Velleman, Hammack and MIT MCS is that proof construction begins by reading the **logical form** of the target.

- To prove `P → Q`, assume `P` and aim for `Q`, unless a cleaner equivalent route such as the contrapositive is deliberately chosen.
- To prove `P ↔ Q`, prove both directions.
- To prove `∀x P(x)`, choose an arbitrary legal `x` and prove `P(x)` without using special features of a chosen example.
- To prove `∃x P(x)`, construct a legal witness and verify the predicate.
- To prove a set equality, use arbitrary-element membership and an iff chain, or prove two containments.
- To prove an integer-indexed family, decide whether ordinary or strong induction matches the dependency structure.

The point of these structures is not to produce robotic prose. They prevent invalid moves while leaving the mathematical crux—the actual insight connecting hypotheses to target—to the learner.

## Scratchwork versus final proof

Exploration may include examples, failed algebra, diagrams, tables, testing boundary cases, or changing representation. Final proof should contain the clean logical spine only. A failed exploratory path is useful evidence about the problem, but it is not itself proof.

## Counterexample protocol

For a universal implication, a legal counterexample must satisfy all three:

1. the input lies in the stated domain;
2. the hypothesis is true;
3. the conclusion is false.

Search strategically around zero, signs, endpoints, symmetry, repeated values, and other places where an implication can change character.

## Counting protocol

Before a formula, define the outcomes. Then ask:

- alternative branches or sequential stages?
- ordered or unordered?
- replacement or no replacement?
- distinguishable or indistinguishable objects?
- lower/upper bounds?
- overlaps requiring inclusion-exclusion?
- existence forced by a capacity/pigeonhole argument?

A formula without a model is fragile; a model usually tells you the formula.

# Appendix B — Source-to-session crosswalk

This is a reading map, not required homework.

- **S01–S07:** Velleman Chs. 1–2; Hammack Ch. 2; MIT MCS Chs. 1 & 3.
- **S08–S12:** Hammack direct/contrapositive/contradiction chapters plus divisibility; MIT MCS proof templates and number-theory language; Zeitz parity/recasting as optional maturity enrichment.
- **S13–S14:** Velleman Ch. 6; Hammack Ch. 10; MIT MCS Ch. 5.
- **S15–S22:** Velleman Chs. 1, 4, 5; Hammack Chs. 1, 8, 11, 12; MIT MCS mathematical data types and relations.
- **S23–S30:** Hammack Ch. 3; MIT MCS cardinality rules; Zeitz counting, inclusion-exclusion, pigeonhole and combinatorial tactics.

# Appendix C — Canonical v1.7 repair notes that must remain intact

- **S24 instruction is session-versioned** as `m03-s24-instruction-v17-separation-r1`; old v1.6 S24 lesson exposure remains historical answer exposure for S24-T.
- **S25 Transfer is obligation version 3.** S25 derives labeled-group counting only through factorial quotients; it must not introduce `C(n,r)` notation before S26.
- **S26 Main is obligation version 5.** It explicitly asks for combination notation, the general finite binomial theorem for positive integer `n`, the combinatorial reason for coefficient `C(n,k)`, and a fresh full `n=5` expansion. Main does **not** score subset interpretation or complementary symmetry.
- **S26 Transfer is obligation version 3.** It explicitly owns the unordered-subset interpretation and complementary-subset symmetry `C(8,3)=C(8,5)` before converting to ordered triples.
- The bridge `P(n,r)=C(n,r)·r!` remains instructional support and must not disappear.
- S26 Guided is coefficient-only on a different exponent pattern; it must not become a clone of the fixed Main expansion.
- **S30 Transfer remains obligation version 3.** It applies the three-set inclusion-exclusion bridge taught/derived in S28; this wording does not invent a sixth S28 ownership claim.
- **Evidence harness v1.7.1:** `evidenceDistance.version = m03-evidence-distance-v17-r1`; S21-M and S28-M are retrieval, S29-M is proof reconstruction, and S30-M is proof reconstruction/integration.
- **Decision audit v1.7.1:** S29-T's consecutive-pair hole decision is neither prompt-supplied nor visibly rehearsed; S25-T is prompt-cued but not lesson-rehearsed; the monomial/divisibility recasts in S27-T/S28-T are not visibly rehearsed.
- **S25 provenance:** session instruction version is `m03-s25-instruction-v17-factorial-boundary-r1`, with no historical answer-overlap mapping.
- M03 must not claim probability ownership; M04 begins that boundary.


---

## Appendix D — Source roles and evidence limitations

This pack is learner-facing; the permanent engineering record is the repository document `docs/t22-course/M03-SOURCE-DOSSIER-AND-PEDAGOGY-EVIDENCE.md`. Source roles are separated there into curriculum authority, mathematical route comparators, problem-solving texts, general pedagogy guidance and domain-specific proof-education research. In particular, Keith Weber (2001) is used only to motivate explicit strategy-selection practice: the study concerned proof construction in abstract algebra and does **not** directly validate this M03 implementation or this learner population.

# Bounded-repair status

This learner pack is the **v1.7.2 final Spire pack** built on the closed v1.7.2 publication-state M03 contract. A hostile same-model follow-up found no canonical mathematical defect. Formal external independence is not claimed. The 30-session architecture, 60 stable task IDs and 150 ownership claims remain intact. Several prompts/evaluators were deliberately versioned during the repair; the task **IDs**, not all prompt texts, are the stable invariant. Historical v1.4 semantic/boundary acceptance is preserved separately from the current v1.7 evidence status. Exact-SHA T22 Elite + Chromium evidence is established by workflow run #604 (`36921555847`), job `110568597589`, on canonical implementation SHA `1da2268efe0b284c2c54cdccb563a315f565bf31`. The final v1.7.2 Spire probes were then clone-audited and repaired without changing S01–S30. External independent review remains a provenance limitation rather than an unrecorded claim.