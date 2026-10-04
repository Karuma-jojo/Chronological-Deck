# T22 Elite M03 — Master Tutor Pack v2.0 r4

**Module:** T22E-DISC01 · Mathematical Reasoning & Discrete Foundations
**Authoring candidate:** `m03-authoring-v2.0-six-tools-candidate-r4`
**Architecture:** 36 learner positions · 72 fixed tasks · 180 ownership claims
**Status:** independent-review repair candidate. Acceptance requires exact-head full validation and follow-up adversarial confirmation; this wording does not claim either gate is pending or passed.

## How to use this pack

- Teach the canonical lesson/vocabulary before assessment. Definitions are not hidden-password tests.
- Do not reveal a fixed Main/Transfer prompt before its normal attempt stage, and do not reveal evaluator references before the learner commits a complete attempt.
- Grade **each task only against the ownership claims and public obligations assigned to that task below**. Do not require all five session ownership claims in both Main and Transfer.
- Recompute arithmetic and substitute final answers into the original task before accepting them.
- Preserve domains, quantifier scope, set universes, mapping codomains, counting assumptions and stated boundaries.
- Record assistance honestly. A decisive hint, supplied proof route or exposed reference answer changes the evidential meaning of the attempt.
- Distinguish learned-today evidence, unaided application, and delayed retrieval.
- Strategy labs are unscored diagnostic/practice. They do not overwrite canonical task evidence.

## Module destination

State claims precisely; construct, prove or refute them; choose finite representations; justify counting correspondences; and use elementary extremal/invariant reasoning before probability.

## Boundary after M03

M04 still owns probability, conditional probability, independence and expectation. M09 still owns epsilon-limit theory. M08/M22 may consume the new invariant/rank foundation without importing programming or graph algorithms into M03.

## Fixed-task grading rule

For session S, the canonical `claimEvidence[S]` ledger assigns every owned claim to Main or Transfer. A task passes only if its own public request and rubric obligations are satisfied. A supplied representation, state model or method cue cannot be credited as if the learner invented it.

---

# Position 01 · Mathematical statements, truth values & predicates

**Stable session ID:** `T22V3::T22E-DISC01::S01@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build mathematical statements, truth values & predicates as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M01 algebra
- M02 input/output intuition

## Required ownership

- Distinguish a truth-evaluable statement from an expression/question.
- Determine a closed statement's truth value.
- Distinguish an open predicate from a closed statement.
- Identify a predicate's free variable.
- Evaluate a predicate at a supplied input.

## Canonical lesson

A statement is a complete sentence that is true or false; expressions and questions are not statements, while a predicate becomes closed only after its free variable is supplied or quantified. Worked example: “9 is odd” is a true statement; “u+7” is an expression; “u>7” is a predicate. Guided check: Classify “2+5=8”, “v²−1”, and “v²=1”, then evaluate the predicate at v=1 and v=3.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S01-M@1` · **obligationVersion:** `1`

Classify (i) 12/3=4, (ii) z²+1, (iii) z²=9, (iv) Is 5>2? as statement/expression/question/predicate. Give truth values for closed statements, identify the free variable, and evaluate the predicate at z=3 and z=2.

**Claims observed in Main:**
- Distinguish a truth-evaluable statement from an expression/question.
- Determine a closed statement's truth value.
- Distinguish an open predicate from a closed statement.
- Identify a predicate's free variable.
- Evaluate a predicate at a supplied input.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Distinguish a truth-evaluable statement from an expression/question.
- **2 pts:** Demonstrates: Determine a closed statement's truth value.
- **2 pts:** Demonstrates: Distinguish an open predicate from a closed statement.
- **2 pts:** Demonstrates: Identify a predicate's free variable.
- **2 pts:** Demonstrates: Evaluate a predicate at a supplied input.

**Reference answer — keep hidden until the learner has committed an attempt:** (i) true statement; (ii) expression; (iii) predicate with free variable z, true at3 and false at2; (iv) question.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S01-T@1` · **obligationVersion:** `2`

A model uses R(r):r<0. Explain why it is not closed, identify r, evaluate R(−0.02),R(0.01), and translate it to plain language.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Explains that R(r):r<0 is an open predicate because r is free and no truth value is fixed until r is assigned.
- **2 pts:** Identifies r as the free variable.
- **2 pts:** Evaluates R(−0.02) as true.
- **2 pts:** Evaluates R(0.01) as false.
- **2 pts:** Translates R(r) correctly as 'the return r is negative' or equivalent plain language.

**Reference answer — keep hidden until the learner has committed an attempt:** Open predicate; free variable r; true at−0.02, false at0.01; 'the return is negative.'

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Mathematical statements, truth values & predicates. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 02 · AND, OR, NOT & truth tables

**Stable session ID:** `T22V3::T22E-DISC01::S02@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build and, or, not & truth tables as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S01

## Required ownership

- Evaluate conjunction P∧Q.
- Use mathematical OR P∨Q inclusively.
- Negate a proposition with ¬.
- Respect parentheses in a compound formula.
- Construct all four two-variable truth rows.

## Canonical lesson

P∧Q requires both true; P∨Q is inclusive; ¬P flips truth; parentheses determine grouping. Worked example: For P=true,Q=false, conjunction is false, disjunction true, and ¬P false. Guided check: List all four P,Q rows and evaluate (¬P)∧Q.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S02-M@1` · **obligationVersion:** `1`

Build the complete four-row truth table for P,Q,P∧Q,P∨Q,¬P, and ¬P∨(P∧Q). State what P∨Q does when both inputs are true.

**Claims observed in Main:**
- Evaluate conjunction P∧Q.
- Use mathematical OR P∨Q inclusively.
- Negate a proposition with ¬.
- Respect parentheses in a compound formula.
- Construct all four two-variable truth rows.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Evaluate conjunction P∧Q.
- **2 pts:** Demonstrates: Use mathematical OR P∨Q inclusively.
- **2 pts:** Demonstrates: Negate a proposition with ¬.
- **2 pts:** Demonstrates: Respect parentheses in a compound formula.
- **2 pts:** Demonstrates: Construct all four two-variable truth rows.

**Reference answer — keep hidden until the learner has committed an attempt:** Rows TT,TF,FT,FF; P∧Q=TFFF; P∨Q=TTTF; ¬P=FFTT; final=TFTT; OR is inclusive.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S02-T@1` · **obligationVersion:** `2`

Let A='badge valid', B='PIN valid', C='manual override active'. Access requires A∧(B∨C). Evaluate (T,F,T),(T,F,F),(F,T,T) and explain inclusive OR.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Parses access as A∧(B∨C), with the parenthesized OR evaluated before the AND.
- **2 pts:** Evaluates (T,F,T) as true.
- **2 pts:** Evaluates (T,F,F) as false.
- **2 pts:** Evaluates (F,T,T) as false.
- **2 pts:** Explains that inclusive OR allows B∨C to be true when one or both of B,C are true.

**Reference answer — keep hidden until the learner has committed an attempt:** true,false,false; B∨C remains true if both B and C are true.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for AND, OR, NOT & truth tables. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 03 · Implication, converse, inverse & contrapositive

**Stable session ID:** `T22V3::T22E-DISC01::S03@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build implication, converse, inverse & contrapositive as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S02
- M01 inequalities

## Required ownership

- State P→Q is false only when P is true and Q false.
- Write the converse Q→P.
- Write the inverse ¬P→¬Q.
- Write the contrapositive ¬Q→¬P.
- Recognize original/contrapositive equivalence.

## Canonical lesson

P→Q fails only at P=true,Q=false. Converse is Q→P; inverse ¬P→¬Q; contrapositive ¬Q→¬P; original and contrapositive are equivalent. Worked example: x>6→x>2 is true over reals, but the converse fails at x=4. Guided check: Write all four forms of x<−1→x<3.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S03-M@1` · **obligationVersion:** `1`

Over reals let P:x>4 and Q:x>1. State the sole false truth row, write converse/inverse/contrapositive, decide which hold universally, give counterexamples to false forms, and state the equivalence pairing.

**Claims observed in Main:**
- State P→Q is false only when P is true and Q false.
- Write the converse Q→P.
- Write the inverse ¬P→¬Q.
- Write the contrapositive ¬Q→¬P.
- Recognize original/contrapositive equivalence.

### Main rubric — 10 points

- **2 pts:** Demonstrates: State P→Q is false only when P is true and Q false.
- **2 pts:** Demonstrates: Write the converse Q→P.
- **2 pts:** Demonstrates: Write the inverse ¬P→¬Q.
- **2 pts:** Demonstrates: Write the contrapositive ¬Q→¬P.
- **2 pts:** Demonstrates: Recognize original/contrapositive equivalence.

**Reference answer — keep hidden until the learner has committed an attempt:** False only T,F. Converse and inverse fail at2; contrapositive true. Original↔contrapositive; converse↔inverse.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S03-T@1` · **obligationVersion:** `2`

Let P:x=0 and Q:x²=0 over reals. Write converse and contrapositive, decide both directions, and explain the relationship.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Writes the converse Q→P as x²=0→x=0.
- **2 pts:** Writes the contrapositive of P→Q as x²≠0→x≠0.
- **2 pts:** Correctly establishes P→Q over the reals.
- **2 pts:** Correctly establishes the converse Q→P over the reals.
- **2 pts:** Explains that P and Q are equivalent here and distinguishes the converse from the logically equivalent contrapositive.

**Reference answer — keep hidden until the learner has committed an attempt:** Both directions true; contrapositive x²≠0→x≠0; equivalent in this case.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Implication, converse, inverse & contrapositive. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 04 · Biconditionals; necessary & sufficient conditions

**Stable session ID:** `T22V3::T22E-DISC01::S04@1`
**Instruction version:** `m03-s04-instruction-v2-jit-divisibility-r1`

## Purpose

Build biconditionals; necessary & sufficient conditions as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S03

## Required ownership

- Interpret P↔Q as both directions.
- Label sufficient conditions correctly.
- Label necessary conditions correctly.
- Distinguish necessary from sufficient when reverse fails.
- Establish/refute iff by checking both directions.

## Canonical lesson

P↔Q means both P→Q and Q→P. If P→Q, then P is sufficient for Q and Q is necessary for P; the reverse direction must be checked separately. Just-in-time notation for this example: for integers d,n, d|n means n=dk for some integer k. This notation is used here only to read the example; S08 owns the full divisibility/parity proof language. Worked example: over integers, 4|n implies n is even, so divisibility by4 is sufficient for evenness and evenness is necessary for divisibility by4. The reverse fails, for example at n=6. Guided check: compare “n is divisible by6” with “n is divisible by3”; check both arrows and give a counterexample to any failed direction.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S04-M@1` · **obligationVersion:** `1`

Over reals let P:x=3 and Q:x²=9. Check both directions, decide P↔Q, label necessary/sufficient relationships, and use x=−3 to expose the failed reverse.

**Claims observed in Main:**
- Interpret P↔Q as both directions.
- Label sufficient conditions correctly.
- Label necessary conditions correctly.
- Distinguish necessary from sufficient when reverse fails.
- Establish/refute iff by checking both directions.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Interpret P↔Q as both directions.
- **2 pts:** Demonstrates: Label sufficient conditions correctly.
- **2 pts:** Demonstrates: Label necessary conditions correctly.
- **2 pts:** Demonstrates: Distinguish necessary from sufficient when reverse fails.
- **2 pts:** Demonstrates: Establish/refute iff by checking both directions.

**Reference answer — keep hidden until the learner has committed an attempt:** P→Q true; Q→P false at−3; no biconditional. P sufficient for Q, Q necessary for P; reverse labels fail.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S04-T@1` · **obligationVersion:** `2`

Over reals compare A:x>0 with B:x³>0. Prove both directions, state A↔B, and describe necessary/sufficient relationships.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Proves x>0→x³>0 over the reals.
- **2 pts:** Proves x³>0→x>0 over the reals.
- **2 pts:** States the resulting biconditional x>0↔x³>0.
- **2 pts:** Correctly states that A is necessary and sufficient for B.
- **2 pts:** Correctly states the reciprocal necessary/sufficient relationship for B relative to A.

**Reference answer — keep hidden until the learner has committed an attempt:** Both directions true; each is necessary and sufficient for the other.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Biconditionals; necessary & sufficient conditions. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 05 · Universal & existential quantifiers

**Stable session ID:** `T22V3::T22E-DISC01::S05@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build universal & existential quantifiers as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S01
- M03-S03

## Required ownership

- Track and explain the stated quantifier domain.
- Interpret universal quantification.
- Interpret existential quantification.
- Use a witness for an existential.
- Use a counterexample against a universal.

## Canonical lesson

∀ requires every legal value in the stated domain; ∃ requires at least one. A witness establishes an existential; one legal counterexample refutes a universal. Worked example: over integers, ∃n(n²=25) is true because n=5 is a witness, while ∀n(n+1>n) is true because adding1 increases every integer. Guided check: on the domain {0,1,2,3}, decide ∀m(m<4) and ∃m(m²=4), explicitly naming the domain before deciding.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S05-M@1` · **obligationVersion:** `2`

Use real numbers as domain. Decide (i) ∀x x²≥0, (ii) ∃x x²=2, (iii) ∀x x²≥x. Give witnesses/counterexamples and explain why the domain matters.

**Claims observed in Main:**
- Track and explain the stated quantifier domain.
- Interpret universal quantification.
- Interpret existential quantification.
- Use a witness for an existential.
- Use a counterexample against a universal.

### Main rubric — 10 points

- **2 pts:** Uses the stated real-number domain consistently when deciding all three quantified claims.
- **2 pts:** Correctly decides the universal claim ∀x x²≥0 over the reals.
- **2 pts:** Correctly decides the existential claim ∃x x²=2 and gives a legal real witness such as √2 or −√2.
- **2 pts:** Refutes ∀x x²≥x with a legal real counterexample such as x=1/2.
- **2 pts:** Explains why changing the domain can change which witnesses or counterexamples are legal and therefore can change a quantified statement's truth.

**Reference answer — keep hidden until the learner has committed an attempt:** (i) true; (ii) true with√2; (iii) false at1/2; domain controls legal witnesses/counterexamples.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S05-T@1` · **obligationVersion:** `2`

Let the domain be exactly {−2,−1,0,1,2} and R(x):x+1>0. Decide ∀xR(x),∃xR(x), give the smallest witness and one counterexample.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Correctly decides that ∀xR(x) is false on the stated finite domain.
- **2 pts:** Gives a legal counterexample such as x=−2 or x=−1.
- **2 pts:** Correctly decides that ∃xR(x) is true.
- **2 pts:** Gives the smallest witness x=0.
- **2 pts:** Keeps every witness/counterexample inside the exact domain {−2,−1,0,1,2} and distinguishes the universal from existential decision.

**Reference answer — keep hidden until the learner has committed an attempt:** Universal false; −2 or−1 counterexample. Existential true; smallest witness0.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Universal & existential quantifiers. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 06 · Negating quantified claims correctly

**Stable session ID:** `T22V3::T22E-DISC01::S06@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build negating quantified claims correctly as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S05
- M01 inequalities

## Required ownership

- Negate ∀ as ∃¬.
- Negate ∃ as ∀¬.
- Negate inequalities correctly.
- Preserve the domain.
- Translate the exact negation to ordinary language.

## Canonical lesson

Negation switches ∀↔∃, negates the predicate, and keeps the same domain. The negation of u>3 is u≤3. Worked example: The negation of 'every real x has x²>1' is 'some real x has x²≤1.' Guided check: Negate 'there exists an integer n with n<−4.'

## Main task

**Task ID:** `T22V3::T22E-DISC01::S06-M@1` · **obligationVersion:** `1`

Negate exactly: (i) every real x has x²+1>0; (ii) there exists an integer n with n²=5; (iii) every integer k has k≤10. Give symbolic and ordinary forms.

**Claims observed in Main:**
- Negate ∀ as ∃¬.
- Negate ∃ as ∀¬.
- Negate inequalities correctly.
- Preserve the domain.
- Translate the exact negation to ordinary language.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Negate ∀ as ∃¬.
- **2 pts:** Demonstrates: Negate ∃ as ∀¬.
- **2 pts:** Demonstrates: Negate inequalities correctly.
- **2 pts:** Demonstrates: Preserve the domain.
- **2 pts:** Demonstrates: Translate the exact negation to ordinary language.

**Reference answer — keep hidden until the learner has committed an attempt:** (i) ∃ real x:x²+1≤0; (ii) ∀ integer n:n²≠5; (iii) ∃ integer k:k>10.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S06-T@1` · **obligationVersion:** `2`

Negate: (a) Every trading day in the sample has loss at most 2 units. (b) There exists a sampled day with positive return.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Negates 'Every sampled day has loss at most2' as existence of a sampled day with loss greater than2.
- **2 pts:** Negates 'There exists a sampled day with positive return' as every sampled day having return at most0.
- **2 pts:** Switches ∀ to ∃ and ∃ to ∀ correctly.
- **2 pts:** Complements the inequalities ≤2 and >0 correctly.
- **2 pts:** Preserves the original scope 'sampled day' rather than changing the universe of discourse.

**Reference answer — keep hidden until the learner has committed an attempt:** (a) Some sampled day has loss>2. (b) Every sampled day has return≤0.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Negating quantified claims correctly. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 07 · Quantifier order & witness dependence

**Stable session ID:** `T22V3::T22E-DISC01::S31@1`
**Instruction version:** `m03-s31-instruction-v2-r1`

## Purpose

Make nested quantifier order operational before later proof and analysis modules require parameter-dependent choices.

## Entry prerequisites

- M03-S05 universal/existential quantifiers over stated domains
- M03-S06 exact negation of quantified claims
- M02 function input/output intuition

## Required ownership

- Read nested ∀∃ and ∃∀ claims in the stated order over explicit domains.
- Explain when an existential witness may depend on an earlier universally quantified variable.
- Distinguish input-dependent witnesses from one global witness that must work for every input.
- Negate a two-quantifier claim by switching each quantifier, preserving domains and complementing the predicate.
- Refute a false quantifier order with a legal adversarial choice made after the proposed global witness.

## Canonical lesson

A quantified sentence is read in order. In ∀x∈X ∃y∈Y P(x,y), x is chosen first; after seeing that x, you may choose a y that can depend on x. A useful way to record this is y=f(x). In ∃y∈Y ∀x∈X P(x,y), y is chosen first, so the same y must survive every legal x; it may not be changed after x is revealed. To negate nested quantifiers, switch each quantifier and negate the final predicate while keeping the same domains: ¬(∀x∈X ∃y∈Y P(x,y)) is ∃x∈X ∀y∈Y ¬P(x,y), and ¬(∃y∈Y ∀x∈X P(x,y)) is ∀y∈Y ∃x∈X ¬P(x,y). Worked example: over integers, consider ∀n∈Z ∃k∈Z with k=n+2. It is true: once n is given, choose k=n+2. The reversed claim ∃k∈Z ∀n∈Z with k=n+2 is false: after a fixed k is proposed, choosing n=k makes the required equality k=k+2 impossible. The lesson is not that ∀∃ is always true or ∃∀ is always false; the predicate decides truth, while the quantifier order decides what dependence is allowed. Guided check: over real numbers, compare ∀x∈R ∃y∈R with y=3x−1 and ∃y∈R ∀x∈R with y=3x−1. For the first, write a witness rule. For the second, explain what a single y would have to do and give one x-choice that defeats a proposed y.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S31-M@1` · **obligationVersion:** `1`

Over the integers compare A: ∀n∈Z ∃m∈Z such that m>n and m−n is odd, with B: ∃m∈Z ∀n∈Z such that m>n and m−n is odd. For A, state the order of choice, give a witness rule m=m(n), and verify it. For B, state the order of choice and refute the claim by choosing a legal n after an arbitrary proposed m. Then write the exact logical negation of B, preserving the integer domains, and explain precisely why A permits dependence on n while B does not.

**Claims observed in Main:**
- Read nested ∀∃ and ∃∀ claims in the stated order over explicit domains.
- Explain when an existential witness may depend on an earlier universally quantified variable.
- Negate a two-quantifier claim by switching each quantifier, preserving domains and complementing the predicate.
- Refute a false quantifier order with a legal adversarial choice made after the proposed global witness.

### Main rubric — 10 points

- **2 pts:** Reads A in the correct order: n is arbitrary first and the existential m may then be chosen as a function of n.
- **2 pts:** Uses a legal witness such as m=n+1 and verifies m∈Z, m>n and the odd difference.
- **2 pts:** Reads B in the correct order and refutes every proposed global m by a legal later choice such as n=m.
- **2 pts:** Writes the exact negation ∀m∈Z ∃n∈Z ¬(m>n and m−n is odd), or a logically equivalent form with the same domains.
- **2 pts:** Explains that A permits m to depend on n because the existential choice comes later, whereas B requires one fixed m to work for every n.

**Reference answer — keep hidden until the learner has committed an attempt:** A is true: n is chosen first, then m=n+1 is an integer, m>n, and m−n=1 is odd. B is false: m would be fixed before n; for any proposed integer m choose n=m, making m>n false. The exact negation of B is ∀m∈Z ∃n∈Z such that ¬(m>n and m−n is odd), equivalently ∀m∈Z ∃n∈Z such that m≤n or m−n is even. A allows m to depend on n because ∃m occurs after ∀n; B requires one m before all n.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S31-T@1` · **obligationVersion:** `1`

Let X={a,b,c} and Y={1,2,3}. The allowed outputs are A(a)={1,2}, A(b)={2,3}, A(c)={1,3}. Decide whether (i) ∀x∈X ∃y∈Y with y∈A(x) and (ii) ∃y∈Y ∀x∈X with y∈A(x) are true. For (i), construct an explicit function f:X→Y whose value is allowed for every input and verify all three assignments. For (ii), either give one common y or prove that none exists by checking the candidates. Finish by explaining how this table represents input-dependent witnesses versus one global witness.

**Claims observed in Transfer:**
- Distinguish input-dependent witnesses from one global witness that must work for every input.

### Transfer rubric — 10 points

- **2 pts:** Correctly decides that the ∀x∃y statement is true and supplies an explicit function f:X→Y.
- **2 pts:** Verifies all three assigned outputs are in Y and in the corresponding allowed sets A(a), A(b) and A(c).
- **2 pts:** Correctly decides that the ∃y∀x statement is false.
- **2 pts:** Proves no common y exists, for example by checking y=1,2,3 against the three allowed sets or by showing their intersection is empty.
- **2 pts:** Explains that f records input-dependent witnesses chosen after x, while the reversed order demands one global y that works for every input.

**Reference answer — keep hidden until the learner has committed an attempt:** (i) is true, for example f(a)=1,f(b)=2,f(c)=3; each value lies in Y and in the corresponding allowed set. (ii) is false because A(a)∩A(b)∩A(c)=∅: y=1 fails at b, y=2 fails at c, and y=3 fails at a. The function f records a witness chosen after x; (ii) asks for one y chosen before x and common to all three allowed sets.

## Exit condition

Solve the integer Main and finite-assignment Transfer while explicitly identifying who is chosen first, who may depend on whom, and why the reversed order succeeds or fails. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 08 · Counterexamples, boundary cases & claim debugging

**Stable session ID:** `T22V3::T22E-DISC01::S07@1`
**Instruction version:** `m03-s07-instruction-v2-repair-proof-r1`

## Purpose

Build counterexample search into a complete debugging cycle: refute a false universal claim, repair it economically, and prove the repaired theorem.

## Entry prerequisites

- M03-S03 implication language
- M03-S05 universal/existential quantifiers
- M01 algebra and integer divisibility

## Required ownership

- Search strategically near sign, zero or domain boundaries and verify counterexample legality/hypotheses.
- Verify conclusion failure and use one legal counterexample to refute a universal implication.
- Explain why confirming examples do not prove a universal claim.
- Repair a false statement while preserving the original domain/hypothesis unless a change is explicitly justified.
- Prove the repaired statement rather than merely testing additional examples.

## Canonical lesson

A mathematical counterexample must be legal, satisfy every hypothesis and make the conclusion false. One such example refutes a universal statement; many confirming examples do not prove it. Debugging should then continue: repair the statement as economically as possible and prove the repair. Worked example: over integers, the claim 6|n⇒4|n is false because n=6 satisfies 6|n but not 4|n. A useful repair is 6|n⇒3|n. If 6|n, then n=6k=3(2k) for some integer k, so the repaired conclusion follows for every legal n. Guided check: audit 10|n⇒6|n. Find a legal counterexample, propose a divisor conclusion that really follows from 10|n, and write the witness form you would use to prove your repaired claim. Search first near small multiples and divisor boundaries; do not call a repair proved until the universal argument is complete.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S07-M@1` · **obligationVersion:** `2`

Audit: for every real x, if x²>4 then x>2. Before giving a counterexample, name one search family you would inspect (for example sign, zero, or a boundary) and use that search to produce a valid counterexample. Verify the hypothesis and conclusion failure, explain why one case refutes the universal, and why checking x=3,4,5 does not prove it.

**Claims observed in Main:**
- Search strategically near sign, zero or domain boundaries and verify counterexample legality/hypotheses.
- Verify conclusion failure and use one legal counterexample to refute a universal implication.
- Explain why confirming examples do not prove a universal claim.

### Main rubric — 10 points

- **2 pts:** Names a plausible sign/zero/boundary search family before presenting the counterexample and connects it to the chosen test value.
- **2 pts:** Gives a legal real counterexample such as x=−3 and verifies x²>4.
- **2 pts:** Verifies that the conclusion x>2 fails for the same counterexample.
- **2 pts:** Explains why one legal hypothesis-true/conclusion-false case refutes the universal implication.
- **2 pts:** Explains why checking only positive examples such as 3,4,5 cannot prove a claim over all real numbers.

**Reference answer — keep hidden until the learner has committed an attempt:** A negative-value search is productive; x=−3 is valid because x²=9>4 while x>2 is false. One legal counterexample refutes the universal; positive confirmations cannot prove all reals.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S07-T@1` · **obligationVersion:** `3`

Audit the claim: for all real a,b, if ab=0 then a=0 and b=0. Give a legal counterexample and verify the failure. Repair the conclusion without changing the real domain or the hypothesis ab=0, then prove your repaired statement for arbitrary real a,b rather than checking more examples.

**Claims observed in Transfer:**
- Repair a false statement while preserving the original domain/hypothesis unless a change is explicitly justified.
- Prove the repaired statement rather than merely testing additional examples.

### Transfer rubric — 10 points

- **2 pts:** Gives a legal real counterexample such as a=0,b=1, verifies ab=0, and identifies why the original AND conclusion fails.
- **2 pts:** Uses that single legal hypothesis-true/conclusion-false pair to refute the original universal implication.
- **2 pts:** Repairs the conclusion to the inclusive statement a=0 or b=0 while preserving the real domain and hypothesis ab=0.
- **2 pts:** Proves the repaired implication for arbitrary real a,b, for example by separating a=0 from a≠0 and using division by nonzero a to obtain b=0.
- **2 pts:** Makes clear that the repaired universal statement is established by proof, not by checking additional numerical examples.

**Reference answer — keep hidden until the learner has committed an attempt:** For example a=0,b=1 has ab=0 but the AND conclusion fails. The repaired theorem is: for all real a,b, if ab=0 then a=0 OR b=0 (inclusive OR). Proof: take arbitrary real a,b with ab=0. If a=0 the conclusion holds. If a≠0, divide ab=0 by the nonzero real a to get b=0. Thus a=0 or b=0 for every legal pair.

## Exit condition

Independently refute the Main claim and, on Transfer, refute a different false statement, repair it and prove the repaired theorem. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 09 · Integers, divisibility & parity language

**Stable session ID:** `T22V3::T22E-DISC01::S08@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build integers, divisibility & parity language as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M01 integer algebra

## Required ownership

- Interpret a|b via an integer witness.
- Provide a witness when divisibility holds.
- Recognize nondivisibility.
- Represent even and odd integers.
- Handle negative divisors with the same definition.

## Canonical lesson

For integers, a|b means b=ak for some integer k. Even integers are2k and odd integers2k+1; negative divisors use the same definition. Worked example: 7|−35 with witness−5, while6∤25. Guided check: Give witnesses for−3|18 and8|56.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S08-M@1` · **obligationVersion:** `1`

Decide 6|42,8|42,−4|20. Give witnesses for true claims, explain the false one, and write generic even/odd forms.

**Claims observed in Main:**
- Interpret a|b via an integer witness.
- Provide a witness when divisibility holds.
- Recognize nondivisibility.
- Represent even and odd integers.
- Handle negative divisors with the same definition.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Interpret a|b via an integer witness.
- **2 pts:** Demonstrates: Provide a witness when divisibility holds.
- **2 pts:** Demonstrates: Recognize nondivisibility.
- **2 pts:** Demonstrates: Represent even and odd integers.
- **2 pts:** Demonstrates: Handle negative divisors with the same definition.

**Reference answer — keep hidden until the learner has committed an attempt:** 6|42 with7; 8∤42; −4|20 with−5; even2m, odd2m+1.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S08-T@1` · **obligationVersion:** `2`

Translate '3 divides n−1' and 'n is odd' into witness equations and give one integer n satisfying both.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Translates 3|(n−1) into n−1=3k for some integer k.
- **2 pts:** Translates odd n into n=2m+1 for some integer m.
- **2 pts:** Gives an integer satisfying both conditions, such as n=7.
- **2 pts:** Identifies integer witnesses k and m for the chosen n.
- **2 pts:** Verifies the chosen n satisfies both witness equations.

**Reference answer — keep hidden until the learner has committed an attempt:** n−1=3k and n=2m+1; n=7 works.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Integers, divisibility & parity language. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 10 · Direct proof architecture

**Stable session ID:** `T22V3::T22E-DISC01::S09@1`
**Instruction version:** `m03-s09-instruction-v2-proof-search-r1`

## Purpose

Build direct proof architecture as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S08
- M01 algebra

## Required ownership

- Start with arbitrary objects satisfying hypotheses.
- Unpack definitions.
- Derive symbolically.
- Match the target definition.
- Explain why examples are not universal proof.

## Canonical lesson

A direct proof of a universal implication starts with arbitrary legal objects satisfying the hypotheses, unpacks definitions, derives symbolically, and finishes by matching the conclusion definition. Worked example: if n is odd, then n+2 is odd. Write n=2k+1 for some integer k; then n+2=2(k+1)+1, which has the required odd form. Guided check: if 6|n, unpack the divisibility witness and show directly that n is even, naming the integer witness that matches the even definition. Search discipline: scratchwork and final proof have different jobs. In scratchwork, write the givens and the target definition, work backward from the target to identify a useful witness or intermediate statement, and allow failed routes. Once the connection is found, the final proof should start from arbitrary legal givens and present only the justified forward logical spine. Working backward is a discovery device, not permission to assume the conclusion.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S09-M@1` · **obligationVersion:** `1`

Prove directly: for arbitrary integers a,b, if 5|a and5|b then5|(a+b). Introduce witnesses, keep variables arbitrary, derive the required form, name the final witness, and explain why examples are insufficient.

**Claims observed in Main:**
- Start with arbitrary objects satisfying hypotheses.
- Unpack definitions.
- Derive symbolically.
- Match the target definition.
- Explain why examples are not universal proof.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Start with arbitrary objects satisfying hypotheses.
- **2 pts:** Demonstrates: Unpack definitions.
- **2 pts:** Demonstrates: Derive symbolically.
- **2 pts:** Demonstrates: Match the target definition.
- **2 pts:** Demonstrates: Explain why examples are not universal proof.

**Reference answer — keep hidden until the learner has committed an attempt:** a=5r,b=5s ⇒ a+b=5(r+s); r+s integer. Numeric checks are not a universal proof.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S09-T@1` · **obligationVersion:** `2`

Prove directly: if e is even and m any integer, then em is even. Identify the final witness.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Starts from e=2k for some integer k because e is even.
- **2 pts:** Uses m∈Z and forms em=2(km).
- **2 pts:** Explains that km is an integer.
- **2 pts:** Concludes em has the defining form of an even integer.
- **2 pts:** Identifies km (or an equivalent integer expression) as the final evenness witness.

**Reference answer — keep hidden until the learner has committed an attempt:** e=2k ⇒ em=2(km); km integer.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Direct proof architecture. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 11 · Constructive existence & uniqueness

**Stable session ID:** `T22V3::T22E-DISC01::S32@1`
**Instruction version:** `m03-s32-instruction-v2-r1`

## Purpose

Separate constructing a legal object from proving that no other legal object can satisfy the same property.

## Entry prerequisites

- M03-S05 existential language
- M03-S09 direct proof architecture
- M01 equation solving and factoring
- M02 domain checks

## Required ownership

- Decompose an exactly-one claim into existence and at-most-one obligations.
- Construct a candidate and verify both its domain membership and the original defining property.
- Prove uniqueness by taking two arbitrary legal objects with the property and showing they are equal.
- Distinguish at-least-one, at-most-one and exactly-one conclusions.
- Audit how changing the domain can preserve existence while changing uniqueness.

## Canonical lesson

The symbol ∃! means exactly one, and an exactly-one proof has two logically separate jobs. Existence: construct at least one legal object and check it in the original domain and property. Uniqueness: assume u and v are any two legal objects with the property and prove u=v. A solver output or transformed equation is only a candidate until it is checked against the original conditions. Worked example: fix a real parameter t. For 5x−2t=9, the candidate x=(9+2t)/5 is real and substitution verifies existence. If u and v both satisfy the equation, then 5u−2t=9=5v−2t, hence 5u=5v and u=v, proving uniqueness. Guided check: for a real parameter c, solve 3x+c=12, verify the candidate in the original equation, then write a one-line two-solution uniqueness argument. Finally say which line proves existence and which proves at most one.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S32-M@1` · **obligationVersion:** `1`

For an arbitrary real parameter t, prove that there exists exactly one real x satisfying 4x+t=2x+7. Your proof must (i) construct a candidate, (ii) verify it in the original equation, and (iii) prove uniqueness by taking two arbitrary real solutions u and v and showing u=v. Label which part establishes existence and which establishes at most one.

**Claims observed in Main:**
- Decompose an exactly-one claim into existence and at-most-one obligations.
- Construct a candidate and verify both its domain membership and the original defining property.
- Prove uniqueness by taking two arbitrary legal objects with the property and showing they are equal.
- Distinguish at-least-one, at-most-one and exactly-one conclusions.

### Main rubric — 10 points

- **2 pts:** Separates the exactly-one claim into an existence obligation and an at-most-one/uniqueness obligation.
- **2 pts:** Constructs x=(7−t)/2, or an algebraically equivalent candidate, for arbitrary real t.
- **2 pts:** Verifies the constructed candidate in the original equation and notes it is a legal real number.
- **2 pts:** Takes two arbitrary real solutions u and v and derives u=v without assuming uniqueness.
- **2 pts:** Labels correctly which argument establishes existence and which establishes at most one, hence exactly one.

**Reference answer — keep hidden until the learner has committed an attempt:** Solve 4x+t=2x+7 to get x=(7−t)/2. This is real for every real t; substitution verifies the equation. If u,v are solutions, then 4u+t=2u+7 and 4v+t=2v+7, so 2u=7−t=2v, hence u=v. The first part gives existence; the two-solution comparison gives at most one.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S32-T@1` · **obligationVersion:** `1`

Compare the equation x²=16 on two domains. On R, prove that a solution exists but uniqueness fails by exhibiting two distinct legal solutions. On D=[0,∞), prove that exactly one solution exists: construct the solution and then prove any y∈D with y²=16 must equal it. State explicitly how the domain change alters the uniqueness conclusion.

**Claims observed in Transfer:**
- Audit how changing the domain can preserve existence while changing uniqueness.

### Transfer rubric — 10 points

- **2 pts:** On R, constructs a legal solution and correctly states that existence holds.
- **2 pts:** On R, exhibits the two distinct legal solutions 4 and −4 and uses them to refute uniqueness.
- **2 pts:** On [0,∞), constructs and verifies the legal solution x=4.
- **2 pts:** Proves any y≥0 with y²=16 equals 4, for example via (y−4)(y+4)=0 and y+4>0.
- **2 pts:** Explains that the domain restriction removes the negative solution, so existence remains while uniqueness changes.

**Reference answer — keep hidden until the learner has committed an attempt:** On R, x=4 and x=−4 are distinct solutions, so existence holds and uniqueness fails. On [0,∞), x=4 is legal. If y≥0 and y²=16, then (y−4)(y+4)=0; since y+4>0, y−4=0, so y=4. Thus the restricted domain removes the negative solution and restores uniqueness.

## Exit condition

Produce a checked witness and a separate uniqueness proof, then correctly diagnose a domain change that alters uniqueness. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 12 · Proof by contraposition

**Stable session ID:** `T22V3::T22E-DISC01::S10@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build proof by contraposition as an independently observable capability before later probability/research modules.

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

## Canonical lesson

To prove P→Q by contraposition, prove the logically equivalent ¬Q→¬P; proving Q→P would be the converse, not the same theorem. Worked example: Prove “if n² is odd, then n is odd.” Its contrapositive is “if n is even, then n² is even.” Write n=2k; then n²=4k²=2(2k²), so the contrapositive holds and therefore the original implication holds. Guided check: For |x|<3→x²<9, write the contrapositive exactly and identify which inequality endpoints change under negation.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S10-M@1` · **obligationVersion:** `1`

Prove by contraposition: for every integer n, if n² is even then n is even. Write the exact contrapositive, prove it from n=2k+1, distinguish the converse, and reconnect to the original.

**Claims observed in Main:**
- Write the exact contrapositive.
- Use logical equivalence correctly.
- Prove the contrapositive.
- Avoid proving the converse.
- Reconnect to the original implication.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Write the exact contrapositive.
- **2 pts:** Demonstrates: Use logical equivalence correctly.
- **2 pts:** Demonstrates: Prove the contrapositive.
- **2 pts:** Demonstrates: Avoid proving the converse.
- **2 pts:** Demonstrates: Reconnect to the original implication.

**Reference answer — keep hidden until the learner has committed an attempt:** Contrapositive: odd n⇒odd n². (2k+1)²=2(2k²+2k)+1. Thus original true; converse is even n⇒even n².

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S10-T@1` · **obligationVersion:** `2`

Prove by contraposition over real x: if x²<1 then |x|<1.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** States the correct contrapositive |x|≥1→x²≥1.
- **2 pts:** Uses x²=|x|² or an equivalent valid real-number argument.
- **2 pts:** Justifies that squaring a nonnegative quantity at least1 preserves the ≥1 conclusion.
- **2 pts:** Completes the contrapositive proof without assuming the original conclusion.
- **2 pts:** Invokes logical equivalence of an implication and its contrapositive to conclude the original statement.

**Reference answer — keep hidden until the learner has committed an attempt:** Contrapositive |x|≥1⇒x²≥1 because x²=|x|².

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Proof by contraposition. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 13 · Proof by contradiction

**Stable session ID:** `T22V3::T22E-DISC01::S11@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build proof by contradiction as an independently observable capability before later probability/research modules.

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

## Canonical lesson

A contradiction proof assumes the exact negation of the target, derives consequences using valid steps, reaches an explicit impossibility, and then rejects the assumption. Failed search is not a contradiction. Worked example: There is no smallest positive rational number. If r>0 were the smallest positive rational, then r/2 would also be a positive rational and would satisfy 0<r/2<r, contradicting minimality. Guided check: Assume there is a largest negative rational q and use q/2 to identify the contradiction.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S11-M@1` · **obligationVersion:** `1`

Prove by contradiction that no integer n can be both even and odd. Assume the negation, unpack parity forms, derive an explicit impossibility, name it, and explain why 'I found no example' is not proof.

**Claims observed in Main:**
- Assume the negation.
- Derive consequences.
- Identify an impossibility.
- Discharge the assumption.
- Distinguish contradiction from failed search.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Assume the negation.
- **2 pts:** Demonstrates: Derive consequences.
- **2 pts:** Demonstrates: Identify an impossibility.
- **2 pts:** Demonstrates: Discharge the assumption.
- **2 pts:** Demonstrates: Distinguish contradiction from failed search.

**Reference answer — keep hidden until the learner has committed an attempt:** Assume n=2a=2b+1; then2(a−b)=1, impossible. Reject the assumption. Failed search is not proof.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S11-T@1` · **obligationVersion:** `2`

Prove by contradiction that there is no greatest integer, using N+1.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Assumes for contradiction that a greatest integer N exists.
- **2 pts:** Notes that N+1 is also an integer.
- **2 pts:** Shows N+1>N.
- **2 pts:** Identifies the contradiction with the assumed maximality of N.
- **2 pts:** Concludes that no greatest integer exists.

**Reference answer — keep hidden until the learner has committed an attempt:** Assume greatest N. N+1 is an integer and larger, contradiction.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Proof by contradiction. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 14 · Remainder classes & exhaustive proof cases

**Stable session ID:** `T22V3::T22E-DISC01::S12@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build remainder classes & exhaustive proof cases as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S08
- M03-S09

## Required ownership

- Write n=dq+r with0≤r<d.
- List all small remainder classes.
- Prove every exhaustive case.
- Recombine into a universal result.
- Distinguish exhaustive proof from finite examples.

## Canonical lesson

For positive d, every integer has exactly one form n=dq+r with 0≤r<d. An exhaustive case proof lists every possible r and proves the claim symbolically in each case; checking a few numerical inputs is not the same thing. Worked example: Every integer square has remainder 0 or 1 on division by 3. If n=3q, n²=9q²; if n=3q+1, n²=3(3q²+2q)+1; if n=3q+2, n²=3(3q²+4q+1)+1. These three cases exhaust the integers. Guided check: Using the two parity forms n=2q and n=2q+1, show that n³ has the same parity as n.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S12-M@1` · **obligationVersion:** `2`

Begin by stating the general remainder form n=dq+r with 0≤r<d for integer d>0. Then prove every integer square leaves remainder0 or1 when divided by4. Use exhaustive parity/remainder forms, compute both cases, combine them, and explain why checking n=1,2,3,4 alone is not proof.

**Claims observed in Main:**
- Write n=dq+r with0≤r<d.
- List all small remainder classes.
- Prove every exhaustive case.
- Recombine into a universal result.
- Distinguish exhaustive proof from finite examples.

### Main rubric — 10 points

- **2 pts:** States the general remainder decomposition n=dq+r with 0≤r<d for integer d>0.
- **2 pts:** Uses exhaustive parity forms n=2q or n=2q+1 for an arbitrary integer n.
- **2 pts:** Computes the even and odd square cases to obtain remainders 0 and 1 modulo 4.
- **2 pts:** Explains that the two parity cases exhaust all integers and therefore establish the universal claim.
- **2 pts:** Explains why checking only n=1,2,3,4 would be finite evidence rather than a proof for all integers.

**Reference answer — keep hidden until the learner has committed an attempt:** Even square4q² gives0; odd square4(q²+q)+1 gives1; parity exhausts integers.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S12-T@1` · **obligationVersion:** `2`

Prove by exhaustive parity cases that n(n+1) is even for every integer n.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Splits an arbitrary integer n into the exhaustive even and odd cases.
- **2 pts:** Shows the product n(n+1) is even when n is even.
- **2 pts:** Shows the product n(n+1) is even when n is odd because n+1 is even.
- **2 pts:** Explains that the two parity cases exhaust all integers.
- **2 pts:** Concludes the universal evenness statement rather than only checking examples.

**Reference answer — keep hidden until the learner has committed an attempt:** If n even product even; if n odd then n+1 even; cases exhaust integers.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Remainder classes & exhaustive proof cases. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 15 · Mathematical induction

**Stable session ID:** `T22V3::T22E-DISC01::S13@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build mathematical induction as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M02 sequences/sigma
- M03-S09

## Required ownership

- State induction domain/start.
- Verify base case.
- State induction hypothesis.
- Use it in k+1 step.
- Conclude by induction.

## Canonical lesson

Ordinary induction proves an integer-indexed claim by verifying the first case, assuming the claim for an arbitrary k, and using that exact hypothesis to derive the k+1 case. Worked example: prove 7|(8^n−1) for n≥1. The base n=1 gives 8−1=7. Assume 8^k−1=7q for some integer q; then 8^(k+1)−1=8(8^k−1)+7=7(8q+1), so the next case follows. Guided check: for 1+2+⋯+n=n(n+1)/2, state the base case, induction hypothesis, and exact k+1 target, but do not finish the algebra.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S13-M@1` · **obligationVersion:** `1`

Prove by induction 1+3+5+⋯+(2n−1)=n² for every integer n≥1. State domain, base, hypothesis, k+1 step and final conclusion.

**Claims observed in Main:**
- State induction domain/start.
- Verify base case.
- State induction hypothesis.
- Use it in k+1 step.
- Conclude by induction.

### Main rubric — 10 points

- **2 pts:** Demonstrates: State induction domain/start.
- **2 pts:** Demonstrates: Verify base case.
- **2 pts:** Demonstrates: State induction hypothesis.
- **2 pts:** Demonstrates: Use it in k+1 step.
- **2 pts:** Demonstrates: Conclude by induction.

**Reference answer — keep hidden until the learner has committed an attempt:** Base1. Assume sum through2k−1=k². Add2k+1 to obtain(k+1)²; conclude all n≥1.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S13-T@1` · **obligationVersion:** `2`

Prove by induction 2^n≥n+1 for every integer n≥0.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Verifies the base case n=0.
- **2 pts:** States a valid induction hypothesis 2^k≥k+1 for arbitrary k≥0.
- **2 pts:** Uses the hypothesis to obtain 2^(k+1)=2·2^k≥2k+2.
- **2 pts:** Justifies 2k+2≥k+2 for k≥0.
- **2 pts:** Concludes the k+1 case and therefore the statement for all n≥0.

**Reference answer — keep hidden until the learner has committed an attempt:** Base0; assume2^k≥k+1; then2^(k+1)≥2k+2≥k+2.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Mathematical induction. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 16 · Strong induction & recursive claims

**Stable session ID:** `T22V3::T22E-DISC01::S14@1`
**Instruction version:** `m03-s14-instruction-v2-prime-composite-r1`

## Purpose

Build strong induction & recursive claims as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S13 ordinary induction
- M02-S20 recurrence notation

## Required ownership

- Verify all required bases.
- State an all-prior hypothesis.
- Reduce target to earlier covered cases.
- Avoid circularity.
- Explain why strong induction fits.

## Canonical lesson

Strong induction assumes every earlier case from the starting index through k, which is useful when the next case reduces to more than one possible earlier value. For this worked example, an integer p≥2 is prime if its only positive divisors are 1 and p; an integer n≥2 is composite if it can be written n=ab with integers 2≤a,b<n. Worked example: every integer n≥2 is either prime or a product of primes. Base n=2 is prime. Assume the statement holds for every integer from2 through k. For k+1, if it is prime we are done; if it is composite, write k+1=ab with 2≤a,b≤k, apply the all-prior hypothesis to a and b, and combine their prime factorizations. Guided check: if a future target P(n) naturally reduces to a case P(m) with m<n but not necessarily m=n−1, explain why an all-prior hypothesis is useful and what must be true of the base range.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S14-M@1` · **obligationVersion:** `2`

Use strong induction to prove every integer n≥8 can be written n=3a+5b for nonnegative integers a,b. Check enough bases, state the all-prior hypothesis, reduce k+1 to a strictly earlier covered integer, avoid circularity, conclude, and explain why access to more than only the immediately previous case is useful in this proof.

**Claims observed in Main:**
- Verify all required bases.
- State an all-prior hypothesis.
- Reduce target to earlier covered cases.
- Avoid circularity.
- Explain why strong induction fits.

### Main rubric — 10 points

- **2 pts:** Verifies a sufficient base block, for example n=8,9,10.
- **2 pts:** States an all-prior strong-induction hypothesis covering every integer from 8 through k.
- **2 pts:** Reduces k+1 to a strictly earlier covered integer and converts its representation into one for k+1.
- **2 pts:** Keeps the reduction strictly within already assumed cases and therefore avoids circularity.
- **2 pts:** Explains why access to an earlier case other than only k is useful for the chosen reduction, motivating strong induction.

**Reference answer — keep hidden until the learner has committed an attempt:** Bases8,9,10. Assume8..k. For k≥10, k−2 is covered; represent it and add3.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S14-T@1` · **obligationVersion:** `2`

Let F1=1,F2=1,Fn=F(n−1)+F(n−2). Use strong induction to prove Fn≤2^(n−1) for all n≥1.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Verifies the required base cases n=1 and n=2.
- **2 pts:** States a strong/all-prior induction hypothesis sufficient to use bounds for both F_k and F_(k−1).
- **2 pts:** Uses the recurrence F_(k+1)=F_k+F_(k−1) with the induction bounds.
- **2 pts:** Derives F_(k+1)≤3·2^(k−2)≤2^k correctly.
- **2 pts:** Concludes F_n≤2^(n−1) for all n≥1 with no circular use of the target case.

**Reference answer — keep hidden until the learner has committed an attempt:** Check n=1,2; use bounds for Fk and F(k−1) to get F(k+1)≤3·2^(k−2)≤2^k.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Strong induction & recursive claims. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 17 · Well-ordering, least counterexamples & finite extrema

**Stable session ID:** `T22V3::T22E-DISC01::S33@1`
**Instruction version:** `m03-s33-instruction-v2-r1`

## Purpose

Connect induction-style reduction to the legal choice of a least integer counterexample and to justified extremal choices in finite sets.

## Entry prerequisites

- M03-S11 contradiction
- M03-S13 ordinary induction
- M03-S14 strong induction
- M01 integer order and inequalities

## Required ownership

- Invoke the well-ordering principle correctly to justify a least element of a nonempty subset of the nonnegative integers.
- Define a nonempty counterexample set before selecting a least counterexample.
- Reduce a supposed least counterexample to a smaller legal case and derive a contradiction.
- Reject an unjustified claim that every nonempty set of real numbers has a minimum.
- Choose and use a justified extremal element of a nonempty finite set.

## Canonical lesson

Well-ordering says every nonempty subset of the nonnegative integers has a least element. A least-counterexample proof therefore has obligations: define the counterexample set, assume it is nonempty, choose its least member N, verify N is not a protected base case, and use the failure at N to produce a smaller legal counterexample or a contradiction. This principle is about nonnegative integers; it does not say every nonempty set of real numbers has a minimum. For example, the positive reals have no least element because x/2 is smaller than any proposed x>0. A nonempty finite set of reals does have a minimum, so finite extremal choices are also legitimate. Worked example: prove 3 divides 4^n−1 for every integer n≥1 by least counterexample. If C were nonempty, let N be its least element. N≠1 because 4−1=3. Then N−1 is not a counterexample, so 3 divides 4^(N−1)−1. Since 4^N−1=4(4^(N−1)−1)+3, the N case is also divisible by 3, contradiction. Guided check: outline the same least-counterexample obligations for the claim 2^n≥n+1 for n≥0 without completing the final algebra; explicitly name the counterexample set and explain why a least element exists.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S33-M@1` · **obligationVersion:** `1`

Use a least-counterexample proof to show that 3^n≥2n+1 for every integer n≥1. Define the counterexample set, justify the existence of a least counterexample if that set were nonempty, handle the base boundary, and reduce the least counterexample to the smaller integer N−1. Also explain why the same well-ordering principle would not by itself justify choosing a least element from an arbitrary nonempty set of positive real numbers.

**Claims observed in Main:**
- Invoke the well-ordering principle correctly to justify a least element of a nonempty subset of the nonnegative integers.
- Define a nonempty counterexample set before selecting a least counterexample.
- Reduce a supposed least counterexample to a smaller legal case and derive a contradiction.
- Reject an unjustified claim that every nonempty set of real numbers has a minimum.

### Main rubric — 10 points

- **2 pts:** Defines the integer counterexample set C for n≥1 and makes the nonempty assumption explicit.
- **2 pts:** Invokes well-ordering legally to choose the least N∈C and verifies N≠1, so N−1 remains in the allowed integer domain.
- **2 pts:** Uses minimality to obtain 3^(N−1)≥2N−1 and derives 3^N≥6N−3≥2N+1.
- **2 pts:** Closes the contradiction and concludes that the counterexample set is empty, hence the universal claim holds.
- **2 pts:** Explains that ordinary positive reals need not have a least element, for example because x/2 is smaller than any proposed x>0.

**Reference answer — keep hidden until the learner has committed an attempt:** Let C={n∈Z:n≥1 and 3^n<2n+1}. If C is nonempty, well-ordering gives a least N. N≠1 because 3=3. Hence N≥2 and N−1≥1. By minimality N−1∉C, so 3^(N−1)≥2(N−1)+1=2N−1. Thus 3^N≥6N−3≥2N+1 for N≥1, contradicting N∈C. Positive reals are not well-ordered by the usual order; for any x>0, x/2 is a smaller positive real.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S33-T@1` · **obligationVersion:** `1`

Let A be a nonempty finite set of positive integers with the property that whenever a∈A and a>1, then a−1∈A. Prove that 1∈A by choosing a justified extremal element. Your proof must state why that extremal element exists and why assuming it is greater than 1 contradicts its extremality.

**Claims observed in Transfer:**
- Choose and use a justified extremal element of a nonempty finite set.

### Transfer rubric — 10 points

- **2 pts:** Chooses the least element m of A as the extremal object.
- **2 pts:** Justifies that m exists because A is nonempty and finite.
- **2 pts:** Assumes m>1 and correctly applies the given property to obtain m−1∈A.
- **2 pts:** Uses m−1<m to contradict the minimality of m.
- **2 pts:** Concludes m=1 and therefore 1∈A without importing a stronger theorem.

**Reference answer — keep hidden until the learner has committed an attempt:** Because A is nonempty and finite, it has a least element m. If m>1, the closure property gives m−1∈A, but m−1<m, contradicting minimality. Therefore m=1, so 1∈A.

## Exit condition

Use a least counterexample only after establishing its legal existence, and separately justify a finite extremal choice without overgeneralizing to arbitrary real sets. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 18 · Sets, membership, subsets & equality

**Stable session ID:** `T22V3::T22E-DISC01::S15@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build sets, membership, subsets & equality as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S01

## Required ownership

- Interpret x∈A.
- Interpret C⊆A.
- Determine equality by same elements.
- Recognize repetition/order do not matter.
- Distinguish x∈A from {x}⊆A.

## Canonical lesson

Sets are unordered and duplicate listings collapse. x∈A is membership; C⊆A means every C-element lies in A. Worked example: {1,1,3}={3,1};1∈{1,3};{1}⊆{1,3}. Guided check: Compare{a,b} with{b,a,a}.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S15-M@1` · **obligationVersion:** `1`

Let A={1,2,2,3},B={3,2,1},C={1,2}. Decide 2∈A,C⊆A,A=B,A=C,{2}⊆A. Explain repetition/order and distinguish membership from singleton-subset.

**Claims observed in Main:**
- Interpret x∈A.
- Interpret C⊆A.
- Determine equality by same elements.
- Recognize repetition/order do not matter.
- Distinguish x∈A from {x}⊆A.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Interpret x∈A.
- **2 pts:** Demonstrates: Interpret C⊆A.
- **2 pts:** Demonstrates: Determine equality by same elements.
- **2 pts:** Demonstrates: Recognize repetition/order do not matter.
- **2 pts:** Demonstrates: Distinguish x∈A from {x}⊆A.

**Reference answer — keep hidden until the learner has committed an attempt:** 2∈A true; C⊆A true; A=B true; A=C false; {2}⊆A true; duplicates/order irrelevant.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S15-T@1` · **obligationVersion:** `2`

Let D={−1,0,1} and E={x among −2,−1,0,1,2 such that x²≤1}. Write E, decide D=E,{−1,1}⊆D and2∈E.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Computes E={−1,0,1} from the defining condition x²≤1 on the supplied finite search set.
- **2 pts:** Correctly decides D=E.
- **2 pts:** Correctly decides {−1,1}⊆D.
- **2 pts:** Correctly decides 2∉E.
- **2 pts:** Keeps membership, subset and equality claims distinct.

**Reference answer — keep hidden until the learner has committed an attempt:** E=D={−1,0,1}; subset true;2∉E.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Sets, membership, subsets & equality. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 19 · Power sets & finite cardinality

**Stable session ID:** `T22V3::T22E-DISC01::S16@1`
**Instruction version:** `m03-s16-instruction-v2-cardinality-notation-r1`

## Purpose

Build power sets & finite cardinality as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S15
- M01 powers

## Required ownership

- Interpret P(A) as all subsets.
- Include ∅ and A.
- Use |P(A)|=2^|A|.
- Distinguish ∅ from {∅}.
- List a small power set without omissions.

## Canonical lesson

For a finite set A, |A| means its cardinality: the number of elements in A. P(A) contains every subset of A, including ∅ and A itself. Each element has an independent include/exclude choice, so an n-element set has 2^n subsets; equivalently |P(A)|=2^|A|. Worked example: P({x,y})={∅,{x},{y},{x,y}}, so |{x,y}|=2 and |P({x,y})|=4. Guided check: Find P({1}), state both cardinalities, and compare ∅ with {∅}.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S16-M@1` · **obligationVersion:** `1`

Let A={a,b,c}. List P(A), identify ∅ and A, compute |P(A)| by list and2^|A|, and explain why ∅≠{∅}.

**Claims observed in Main:**
- Interpret P(A) as all subsets.
- Include ∅ and A.
- Use |P(A)|=2^|A|.
- Distinguish ∅ from {∅}.
- List a small power set without omissions.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Interpret P(A) as all subsets.
- **2 pts:** Demonstrates: Include ∅ and A.
- **2 pts:** Demonstrates: Use |P(A)|=2^|A|.
- **2 pts:** Demonstrates: Distinguish ∅ from {∅}.
- **2 pts:** Demonstrates: List a small power set without omissions.

**Reference answer — keep hidden until the learner has committed an attempt:** Eight subsets; size8=2³;∅ has0 elements and{∅} has1.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S16-T@1` · **obligationVersion:** `2`

Let B=∅ and C={∅}. Find P(B),P(C) and cardinalities.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Computes P(∅)={∅}.
- **2 pts:** States |P(∅)|=1.
- **2 pts:** Computes P({∅})={∅,{∅}}.
- **2 pts:** States |P({∅})|=2.
- **2 pts:** Explicitly distinguishes the empty set ∅ from the one-element set {∅}.

**Reference answer — keep hidden until the learner has committed an attempt:** P(B)={∅},size1; P(C)={∅,{∅}},size2.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Power sets & finite cardinality. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 20 · Union, intersection, difference & complement

**Stable session ID:** `T22V3::T22E-DISC01::S17@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build union, intersection, difference & complement as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S15 finite sets
- JIT set-operation definitions in this lesson

## Required ownership

- Compute union.
- Compute intersection.
- Compute difference.
- Compute complement relative to U.
- Explain complement depends on U.

## Canonical lesson

For subsets of a stated universe U, A∪B contains elements in A or B, A∩B contains elements in both, A\B contains elements in A but not B, and A^c contains the elements of U outside A. Complement therefore depends on the chosen universe. Worked example: Let U={1,2,3,4,5}, A={1,3,5}, B={3,4}. Then A∪B={1,3,4,5}, A∩B={3}, A\B={1,5}, B\A={4}, and A^c={2,4}. Guided check: With U={0,1,2,3,4}, C={0,2,4}, D={2,3}, compute C∪D, C∩D, C\D and C^c.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S17-M@1` · **obligationVersion:** `1`

Let U={1,2,3,4,5,6,7,8},A={2,4,6,8},B={5,6,7,8}. Compute union, intersection, both differences, A^c,B^c and explain universe dependence.

**Claims observed in Main:**
- Compute union.
- Compute intersection.
- Compute difference.
- Compute complement relative to U.
- Explain complement depends on U.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Compute union.
- **2 pts:** Demonstrates: Compute intersection.
- **2 pts:** Demonstrates: Compute difference.
- **2 pts:** Demonstrates: Compute complement relative to U.
- **2 pts:** Demonstrates: Explain complement depends on U.

**Reference answer — keep hidden until the learner has committed an attempt:** Union{2,4,5,6,7,8}; intersection{6,8}; differences{2,4},{5,7}; complements{1,3,5,7},{1,2,3,4}.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S17-T@1` · **obligationVersion:** `2`

Let U={1,2,…,12}. Let A be the even elements of U and B the elements of U divisible by3. Determine A∪B, A∩B, A\B and A^c, and give the cardinality of each. Explain each result from the defining properties before or while listing the elements.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Uses the verbal definitions to identify the union A∪B and lists {2,3,4,6,8,9,10,12}.
- **2 pts:** Identifies A∩B={6,12}.
- **2 pts:** Identifies A\B={2,4,8,10}.
- **2 pts:** Identifies A^c={1,3,5,7,9,11} relative to U.
- **2 pts:** Gives the corresponding cardinalities 8,2,4,6 and ties them to the defining membership conditions.

**Reference answer — keep hidden until the learner has committed an attempt:** A={2,4,6,8,10,12}, B={3,6,9,12}. A∪B={2,3,4,6,8,9,10,12} size8; A∩B={6,12} size2; A\B={2,4,8,10} size4; A^c={1,3,5,7,9,11} size6.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Union, intersection, difference & complement. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 21 · Set identities & De Morgan laws

**Stable session ID:** `T22V3::T22E-DISC01::S18@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build set identities & de morgan laws as an independently observable capability before later probability/research modules.

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

## Canonical lesson

To prove two sets X and Y are equal, take an arbitrary element x and prove x∈X iff x∈Y; the iff chain establishes both containments at once. Also, x∈A\B means x∈A and x∉B. Worked example: Prove (A∩B)^c=A^c∪B^c. For arbitrary x, x∈(A∩B)^c iff x∉A∩B iff x∉A or x∉B iff x∈A^c or x∈B^c iff x∈A^c∪B^c. Guided check: Prove (A^c)^c=A elementwise by starting from an arbitrary x and writing an iff chain.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S18-M@1` · **obligationVersion:** `2`

Prove for arbitrary A,B⊆U that (A∪B)^c=A^c∩B^c using an arbitrary x and iff chain. Rewrite A\B, verify the identity on U={1,2,3,4},A={1,2},B={2,3}, and explain why the finite check is not universal proof.

**Claims observed in Main:**
- Translate a supplied De Morgan identity into elementwise membership logic.
- Rewrite difference as intersection with complement.
- Prove equality elementwise.
- Use iff to establish both containments.
- Distinguish finite check from universal proof.

### Main rubric — 10 points

- **2 pts:** Translates x∈(A∪B)^c into x∉A and x∉B, then into x∈A^c∩B^c.
- **2 pts:** Rewrites A\B correctly as A∩B^c.
- **2 pts:** Uses an arbitrary element x and an iff chain to prove the set identity elementwise.
- **2 pts:** Explains why the arbitrary-element iff establishes equality rather than only one containment.
- **2 pts:** Checks the supplied finite example correctly and explains why that check alone is not a universal proof.

**Reference answer — keep hidden until the learner has committed an attempt:** x∈(A∪B)^c iff x∉A and x∉B iff x∈A^c∩B^c. A\B=A∩B^c. Finite instance yields{4} on both sides only as a check.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S18-T@1` · **obligationVersion:** `2`

Prove the distributive identity A∩(B∪C)=(A∩B)∪(A∩C) elementwise for arbitrary subsets A,B,C⊆U. Use an arbitrary x and an iff chain, and explain why the argument establishes set equality.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Begins with an arbitrary element x and the left-hand membership statement.
- **2 pts:** Expands intersection and union membership correctly.
- **2 pts:** Uses the distributive logic step correctly.
- **2 pts:** Reassembles the right-hand set membership in an iff chain.
- **2 pts:** Explains why the arbitrary-element iff proves set equality.

**Reference answer — keep hidden until the learner has committed an attempt:** For arbitrary x: x∈A∩(B∪C) iff x∈A and (x∈B or x∈C) iff (x∈A and x∈B) or (x∈A and x∈C) iff x∈(A∩B)∪(A∩C). Hence the sets are equal.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Set identities & De Morgan laws. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 22 · Cartesian products & relations

**Stable session ID:** `T22V3::T22E-DISC01::S19@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build cartesian products & relations as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S15
- M03-S16

## Required ownership

- Respect ordered-pair order.
- Construct A×B.
- Use |A×B|=|A||B|.
- Interpret a relation as subset of A×B.
- Recognize two outputs for one input violates function condition.

## Canonical lesson

A Cartesian product A×B contains ordered pairs (a,b), so (a,b) and (b,a) are generally different objects. A relation from A to B is any subset of A×B; it is a function only when every input in A occurs with exactly one output. Worked example: {1,2}×{p,q}={(1,p),(1,q),(2,p),(2,q)}. The relation {(1,p),(2,q)} is a function from {1,2} to {p,q}, whereas {(1,p),(1,q)} is not because input 1 has two outputs. Guided check: Build {u,v}×{0,1,2} and give one relation on it that is a function and one that is not.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S19-M@1` · **obligationVersion:** `2`

Let A={1,2,3},B={x,y}. List A×B, then compute its size both by counting the listed pairs and by using |A×B|=|A||B|. Let R={(1,x),(2,x),(2,y)}. Verify R⊆A×B and decide whether R is a function A→B, explaining the exact function-condition failure.

**Claims observed in Main:**
- Respect ordered-pair order.
- Construct A×B.
- Use |A×B|=|A||B|.
- Interpret a relation as subset of A×B.
- Recognize two outputs for one input violates function condition.

### Main rubric — 10 points

- **2 pts:** Lists all six ordered pairs of A×B with coordinate order respected.
- **2 pts:** Computes |A×B|=6 both by counting the listed pairs and by |A||B|=3·2.
- **2 pts:** Verifies that every ordered pair of R lies in A×B and therefore R is a relation from A to B.
- **2 pts:** Identifies that input2 has two outputs in R.
- **2 pts:** Also notices input3 has no output, and correctly concludes that R is not a function A→B.

**Reference answer — keep hidden until the learner has committed an attempt:** A×B has6 ordered pairs and |A×B|=3·2=6. R is a relation because all pairs lie in A×B, but it is not a function A→B because input2 has two outputs and input3 has none.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S19-T@1` · **obligationVersion:** `2`

Let C={x,y,z},D={0,1},S={(x,0),(y,0),(z,1)}. Compute |C×D|, verify relation and decide function condition.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Computes |C×D|=3·2=6.
- **2 pts:** Verifies every ordered pair of S lies in C×D, so S is a relation from C to D.
- **2 pts:** Checks each input x,y,z has exactly one output under S.
- **2 pts:** Correctly concludes that S satisfies the function condition C→D.
- **2 pts:** Bases the conclusion on the input-output condition rather than on pair count alone.

**Reference answer — keep hidden until the learner has committed an attempt:** Size6; relation; each input has exactly one output, so function.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Cartesian products & relations. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 23 · Functions as mappings; domain, codomain, image & preimage

**Stable session ID:** `T22V3::T22E-DISC01::S20@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build functions as mappings; domain, codomain, image & preimage as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M02 functions/inverses
- M03-S19

## Required ownership

- Verify one-output-per-input condition.
- Distinguish domain/codomain/range.
- Compute image f(S).
- Compute preimage f⁻¹(T) without invertibility.
- Recognize codomain may exceed range.

## Canonical lesson

For f:A→B, A is the domain and B the codomain; the range is only the codomain values actually hit. For S⊆A, f(S) is the image of S. For T⊆B, f⁻¹(T) means all inputs whose outputs lie in T and does not require f to have an inverse function. Worked example: Let h:{p,q,r}→{0,1,2,3} satisfy h(p)=1,h(q)=1,h(r)=3. The range is {1,3}; h({p,r})={1,3}; h⁻¹({1})={p,q}; 0 and 2 are codomain values outside the range. Guided check: For k:{a,b,c,d}→{x,y,z} with a,b↦x, c↦y, d↦z, find the range and the preimage of {x,z}.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S20-M@1` · **obligationVersion:** `1`

Let f:A→B with A={1,2,3},B={a,b,c},f(1)=a,f(2)=b,f(3)=a. Verify function condition, state domain/codomain/range, compute f({1,3}), f⁻¹({a}), and identify the unused codomain value.

**Claims observed in Main:**
- Verify one-output-per-input condition.
- Distinguish domain/codomain/range.
- Compute image f(S).
- Compute preimage f⁻¹(T) without invertibility.
- Recognize codomain may exceed range.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Verify one-output-per-input condition.
- **2 pts:** Demonstrates: Distinguish domain/codomain/range.
- **2 pts:** Demonstrates: Compute image f(S).
- **2 pts:** Demonstrates: Compute preimage f⁻¹(T) without invertibility.
- **2 pts:** Demonstrates: Recognize codomain may exceed range.

**Reference answer — keep hidden until the learner has committed an attempt:** Function; domainA,codomainB,range{a,b}; image{a}; preimage{1,3}; c unused.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S20-T@1` · **obligationVersion:** `2`

On D={−2,−1,0,1,2},g(x)=x² with codomain C={0,1,4,9}. Find range,g({−2,1}),g⁻¹({1,4}) and unused codomain.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Finds the range {0,1,4}.
- **2 pts:** Computes g({−2,1})={4,1}.
- **2 pts:** Computes g⁻¹({1,4})={−2,−1,1,2}.
- **2 pts:** Identifies 9 as the unused codomain element.
- **2 pts:** Keeps image, preimage, range and codomain roles distinct.

**Reference answer — keep hidden until the learner has committed an attempt:** Range{0,1,4}; image{4,1}; preimage{−2,−1,1,2}; unused9.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Functions as mappings; domain, codomain, image & preimage. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 24 · Injective, surjective, bijective & inverse claims

**Stable session ID:** `T22V3::T22E-DISC01::S21@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build injective, surjective, bijective & inverse claims as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S20
- M02-S08

## Required ownership

- Apply injective definition.
- Apply surjective definition.
- Identify bijective iff both.
- Construct inverse of a finite bijection.
- Explain non-bijection lacks a two-sided inverse.

## Canonical lesson

Injective means distinct inputs never collide; surjective means every codomain value is hit; bijective means both and is exactly the finite-map situation in which a two-sided inverse can undo the map in both directions. Worked example: Let h:{1,2}→{a,b,c} with h(1)=a,h(2)=b. It is injective but not surjective because c is never hit, so no two-sided inverse h⁻¹:{a,b,c}→{1,2} can satisfy h∘h⁻¹=id on the whole codomain. Guided check: Classify the map {u,v,w}→{0,1,2} given u↦2,v↦0,w↦1, and if possible write its inverse.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S21-M@1` · **obligationVersion:** `1`

Let f:{1,2,3}→{a,b,c} with f(1)=b,f(2)=c,f(3)=a. Decide injective/surjective/bijective, construct f⁻¹, and verify it is two-sided.

**Claims observed in Main:**
- Apply injective definition.
- Apply surjective definition.
- Identify bijective iff both.
- Construct inverse of a finite bijection.

### Main rubric — 10 points

- **2 pts:** Shows that distinct domain inputs have distinct outputs, establishing injectivity.
- **2 pts:** Shows that every codomain value a,b,c is hit, establishing surjectivity.
- **2 pts:** Concludes bijectivity from injectivity plus surjectivity.
- **2 pts:** Constructs f⁻¹ correctly as a↦3,b↦1,c↦2.
- **2 pts:** Verifies both f⁻¹∘f and f∘f⁻¹ act as the appropriate identity maps.

**Reference answer — keep hidden until the learner has committed an attempt:** Injective and surjective, hence bijective. Inverse a↦3,b↦1,c↦2; both compositions identity.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S21-T@1` · **obligationVersion:** `1`

Let g:{1,2,3}→{a,b},g(1)=a,g(2)=a,g(3)=b. Classify and explain why no two-sided inverse exists.

**Claims observed in Transfer:**
- Explain non-bijection lacks a two-sided inverse.

### Transfer rubric — 10 points

- **2 pts:** Identifies the collision g(1)=g(2)=a and correctly concludes g is not injective.
- **2 pts:** Shows both codomain values a and b are hit, so g is surjective.
- **4 pts:** Explains concretely why one inverse value at a cannot recover both original inputs 1 and 2.
- **2 pts:** Concludes that g is not bijective and has no two-sided inverse function.

**Reference answer — keep hidden until the learner has committed an attempt:** Surjective but not injective because1 and2 collide at a; no inverse can undo both.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Injective, surjective, bijective & inverse claims. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 25 · Equivalence relations & partitions

**Stable session ID:** `T22V3::T22E-DISC01::S22@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build equivalence relations & partitions as an independently observable capability before later probability/research modules.

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

## Canonical lesson

For a relation R on a set D: reflexive means ∀x∈D, xRx; symmetric means ∀x,y∈D, xRy⇒yRx; transitive means ∀x,y,z∈D, (xRy and yRz)⇒xRz. Only when all three hold is R an equivalence relation. The class [x]={y∈D:yRx}; equivalence classes cover D and any two classes are either identical or disjoint, so they form a partition. Worked example: On D={11,12,21,22}, define xRy when x and y have the same last digit. Reflexivity holds because every number has its own last digit; symmetry holds because “same last digit” is symmetric; transitivity holds because if x and y, then y and z, have the same last digit, x and z do too. The classes are {11,21} and {12,22}. Guided check: On {p,q,r}, verify that ordinary equality is an equivalence relation and list its classes.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S22-M@1` · **obligationVersion:** `1`

On integers define a~b when a,b have the same parity. Prove reflexivity, symmetry and transitivity generally, conclude equivalence, and identify the classes.

**Claims observed in Main:**
- Verify reflexivity.
- Verify symmetry.
- Verify transitivity.
- Conclude equivalence only after all three.
- Identify classes/partition.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Verify reflexivity.
- **2 pts:** Demonstrates: Verify symmetry.
- **2 pts:** Demonstrates: Verify transitivity.
- **2 pts:** Demonstrates: Conclude equivalence only after all three.
- **2 pts:** Demonstrates: Identify classes/partition.

**Reference answer — keep hidden until the learner has committed an attempt:** Reflexive/symmetric; transitive because even differences add; classes are evens and odds.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S22-T@1` · **obligationVersion:** `2`

On D={0,1,2,3,4,5}, xRy when x,y have the same remainder on division by3. Verify equivalence and list classes.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Verifies reflexivity of the same-remainder-mod3 relation on D.
- **2 pts:** Verifies symmetry.
- **2 pts:** Verifies transitivity.
- **2 pts:** Lists the equivalence classes {0,3},{1,4},{2,5}.
- **2 pts:** Explains that these classes partition D.

**Reference answer — keep hidden until the learner has committed an attempt:** Properties hold; classes{0,3},{1,4},{2,5}.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Equivalence relations & partitions. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 26 · Addition & product counting principles

**Stable session ID:** `T22V3::T22E-DISC01::S23@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build addition & product counting principles as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M01 arithmetic
- M03-S16

## Required ownership

- Use addition for mutually exclusive alternatives.
- Use product for sequential stages.
- Distinguish alternatives from stages.
- Check a count with tree/table/decomposition.
- State direct addition needs disjointness or correction.

## Canonical lesson

Use addition for disjoint alternative branches and multiplication for sequential stages. If alternative branches overlap, direct addition double-counts and needs correction. Worked example: choosing the first coordinate from {α,β} and the second coordinate from {1,2,3,4,5} gives 2·5 ordered pairs by the product rule. Separately, if E={2,4,6,8} and O={1,3,5} are disjoint, then |E∪O|=4+3=7 by the addition rule. Guided check: a path chooses one of3 gates and then one of4 rooms; separately, two disjoint boxes contain5 and2 objects. Identify which count is sequential and which is alternative before calculating.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S23-M@1` · **obligationVersion:** `1`

A shop offers4 shirts and3 trousers; an outfit chooses one each. A commuter chooses exactly one of5 bus routes or3 train routes. Compute both counts, identify the rule, give a table/tree check, and state the disjointness condition.

**Claims observed in Main:**
- Use addition for mutually exclusive alternatives.
- Use product for sequential stages.
- Distinguish alternatives from stages.
- Check a count with tree/table/decomposition.
- State direct addition needs disjointness or correction.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Use addition for mutually exclusive alternatives.
- **2 pts:** Demonstrates: Use product for sequential stages.
- **2 pts:** Demonstrates: Distinguish alternatives from stages.
- **2 pts:** Demonstrates: Check a count with tree/table/decomposition.
- **2 pts:** Demonstrates: State direct addition needs disjointness or correction.

**Reference answer — keep hidden until the learner has committed an attempt:** 12 outfits by product;8 routes by addition; a4×3 table checks12; addition needs disjointness.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S23-T@1` · **obligationVersion:** `2`

An event badge is made in exactly one of two disjoint formats. A Visitor badge chooses one of3 colors and then one of4 digits. A Staff badge chooses one of2 departments and then one of5 levels. How many badges are possible in total? Explain why choices within a format combine differently from the two alternative formats.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Counts Visitor badges as3·4=12 using sequential choices within that format.
- **2 pts:** Counts Staff badges as2·5=10 using sequential choices within that format.
- **2 pts:** Recognizes the two formats as disjoint alternatives rather than sequential stages.
- **2 pts:** Adds the branch totals to obtain22 badges.
- **2 pts:** Explains why multiplication applies within each format while addition combines the two disjoint formats.

**Reference answer — keep hidden until the learner has committed an attempt:** Visitor:3·4=12. Staff:2·5=10. Formats are disjoint alternatives, so total22.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Addition & product counting principles. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 27 · Permutations, factorials & ordered selections

**Stable session ID:** `T22V3::T22E-DISC01::S24@1`
**Instruction version:** `m03-s24-instruction-v2-factorial-range-r1`

## Purpose

Build permutations, factorials & ordered selections as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S23
- M03-S21

## Required ownership

- Use n! for distinct arrangements.
- Interpret factorial as descending product.
- Use nPr for ordered selection without replacement.
- Explain why labels/ranks make order matter.
- Check with sequential-choice factors.

## Canonical lesson

For every nonnegative integer n, define n!=n(n−1)⋯1 when n≥1 and define 0!=1. For integers n≥0 and 0≤r≤n, filling r labeled positions without replacement gives P(n,r)=n!/(n−r)! because the available choices decrease at every stage; in particular P(n,0)=1, the one empty ordered selection. For n distinct objects, n! counts all orderings. Worked example: five runners can receive gold, silver and bronze in 5·4·3=P(5,3)=60 ways; the medal labels make the order matter. Guided check: from eight candidates, count the ordered choices for captain and deputy as 8·7=P(8,2), state the permitted values of n and r, and explain why reversing the two people gives a different assignment.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S24-M@1` · **obligationVersion:** `1`

Six distinct books are arranged on a shelf; separately gold/silver/bronze are awarded to3 distinct people from6 finalists. Compute both by factorial/permutation notation, expand products, explain medal order, and verify sequentially.

**Claims observed in Main:**
- Use n! for distinct arrangements.
- Interpret factorial as descending product.
- Use nPr for ordered selection without replacement.
- Explain why labels/ranks make order matter.
- Check with sequential-choice factors.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Use n! for distinct arrangements.
- **2 pts:** Demonstrates: Interpret factorial as descending product.
- **2 pts:** Demonstrates: Use nPr for ordered selection without replacement.
- **2 pts:** Demonstrates: Explain why labels/ranks make order matter.
- **2 pts:** Demonstrates: Check with sequential-choice factors.

**Reference answer — keep hidden until the learner has committed an attempt:** 6!=720;P(6,3)=6·5·4=120; medal positions are labeled.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S24-T@1` · **obligationVersion:** `2`

Let D={a,b,c} and let C be a7-element codomain. How many injective functions f:D→C are possible? Count sequentially, express the result as P(7,3), and explain why the labels a,b,c make the output assignments ordered.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Counts injective assignments sequentially as7·6·5.
- **2 pts:** Obtains the correct total210.
- **2 pts:** Expresses the same count as P(7,3).
- **2 pts:** Explains why previously used codomain values cannot be reused under injectivity.
- **2 pts:** Explains why the labeled domain elements a,b,c make the assignments ordered.

**Reference answer — keep hidden until the learner has committed an attempt:** 7 choices for f(a), then6 for f(b), then5 for f(c): 7·6·5=210=P(7,3). Domain labels distinguish which output is assigned to which input.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Permutations, factorials & ordered selections. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 28 · Bijections, encodings & uniform fibres

**Stable session ID:** `T22V3::T22E-DISC01::S34@1`
**Instruction version:** `m03-s34-instruction-v2-r1`

## Purpose

Turn 'same number of objects' and 'divide the overcount' into explicit mapping arguments with checked inverses or constant fibre sizes.

## Entry prerequisites

- M03-S16 finite cardinality/power sets
- M03-S20 image/preimage
- M03-S21 bijections/inverses
- M03-S23 sum/product rules
- M03-S24 ordered selections

## Required ownership

- Formalize and use a supplied explicit finite encoding map between two collections.
- Construct and verify an inverse map to prove a counting correspondence is bijective.
- Transfer a finite count through a proved bijection without losing or duplicating objects.
- Interpret a fibre as the preimage of one output under a finite map.
- Audit a proposed multiplicity division by inspecting fibre sizes and reject it when the relevant fibres are not constant.

## Canonical lesson

A counting encoding is trustworthy when the map is explicit and reversible. To prove a finite map φ:A→B is a bijection, define how an object of A is encoded, define a reverse map ψ:B→A, and check that applying one after the other returns the original object. For a many-to-one map, the fibre over b∈B is φ⁻¹({b}), the set of inputs that map to b. If every b has exactly the same positive number q of preimages, then A is partitioned into equal fibres and |A|=q|B|. Division by q is legal only after this constant-fibre fact is proved. Worked example: a function f:{1,2,3}→{A,B} can be encoded as the three-letter string f(1)f(2)f(3); reading the three positions gives the inverse map, so the correspondence is bijective and there are 2^3 such functions. For a constant-fibre contrast, the absolute-value map from {−4,−3,−2,−1,1,2,3,4} onto {1,2,3,4} has exactly two preimages over each output. Guided check: for the map that forgets the sign from {−3,−2,−1,1,2,3} to {1,2,3}, list every fibre and explain why division by 2 is justified.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S34-M@1` · **obligationVersion:** `1`

Let A be the set of all subsets of {1,2,3,4,5} and B the set of all 5-bit strings. Define φ:A→B by making the ith bit 1 exactly when i belongs to the subset. Define an explicit inverse map ψ:B→A, verify both compositions on an arbitrary object, and use the bijection to rederive |A|=2^5.

**Claims observed in Main:**
- Formalize and use a supplied explicit finite encoding map between two collections.
- Construct and verify an inverse map to prove a counting correspondence is bijective.
- Transfer a finite count through a proved bijection without losing or duplicating objects.

### Main rubric — 10 points

- **2 pts:** Defines the forward encoding φ using membership of i in the subset.
- **2 pts:** Defines the inverse ψ by collecting exactly the positions whose bits are 1.
- **2 pts:** Verifies ψ∘φ is the identity on an arbitrary subset.
- **2 pts:** Verifies φ∘ψ is the identity on an arbitrary 5-bit string, establishing bijectivity.
- **2 pts:** Uses the bijection and the two independent choices per bit to conclude |A|=|B|=2^5=32.

**Reference answer — keep hidden until the learner has committed an attempt:** φ sends S to its membership-indicator string. Define ψ(b1…b5)={i:bi=1}. For any subset S, ψ(φ(S))=S; for any bit string b, φ(ψ(b))=b. Hence φ is bijective. There are 2 choices per bit, so |B|=2^5=32 and therefore |A|=32.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S34-T@1` · **obligationVersion:** `1`

Let P be the set of pairs (w,i) where w is a 3-bit string, i∈{1,2,3}, and the ith bit of w is 1. Let B be the set of nonzero 3-bit strings, and let π:P→B forget the marked position: π(w,i)=w. A proposed solution says |B|=|P|/3 because there are three possible marker positions. Audit the argument: compute |P|, inspect enough fibres to determine whether their sizes are constant, explain whether division by 3 is legal, and then count |B| correctly.

**Claims observed in Transfer:**
- Interpret a fibre as the preimage of one output under a finite map.
- Audit a proposed multiplicity division by inspecting fibre sizes and reject it when the relevant fibres are not constant.

### Transfer rubric — 10 points

- **2 pts:** Computes |P|=3·2²=12 by choosing the marked 1-position and the two remaining bits.
- **2 pts:** Identifies the fibre π⁻¹({w}) as the possible marked 1-positions of the output string w.
- **2 pts:** Exhibits unequal fibre sizes, for example 1 for 100, 2 for 110 and 3 for 111.
- **2 pts:** Concludes that division by 3 is invalid because the relevant fibres do not all have the same size.
- **2 pts:** Counts the nonzero 3-bit strings correctly as 2³−1=7.

**Reference answer — keep hidden until the learner has committed an attempt:** Choose the marked position i first (3 choices) and then the other two bits freely (4 choices), so |P|=12. Fibre size equals the number of 1s in w: for example 100 has one preimage, 110 has two and 111 has three. The fibres are not constant, so |P|/3 is not a valid count of B. B contains every 3-bit string except 000, so |B|=2^3−1=7.

## Exit condition

Prove one count by a reversible encoding and correctly reject a division argument whose fibre multiplicity is not constant. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 29 · Permutations with repeated objects & multinomial grouping

**Stable session ID:** `T22V3::T22E-DISC01::S25@1`
**Instruction version:** `m03-s25-instruction-v2-multinomial-range-r1`

## Purpose

Build permutations with repeated objects & multinomial grouping as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S24
- M03-S23

## Required ownership

- Recognize indistinguishable objects.
- Use repeated-object factorial quotient.
- Use multinomial count for labeled groups.
- Explain internal-permutation division.
- Validate on a small repeated-object example.

## Canonical lesson

If swapping identical copies changes nothing visible, n! overcounts and internal repeat factorials must be divided out. All multiplicities are nonnegative integers whose total is n; the S24 convention 0!=1 makes a zero multiplicity contribute a neutral denominator factor. Worked example: AABC has4!/2!=12 distinct strings. Guided check: count AABB arrangements. Labeled-group bridge: if n distinct objects are split into labeled groups of fixed nonnegative sizes n1,…,nk with n1+⋯+nk=n, first imagine a temporary ordering of all n objects. There are n! such orders. Within each labeled group, however, its n_i! internal rearrangements do not change the assignment, so divide them out. Therefore the number of labeled-group assignments is n!/(n1!⋯nk!). The group labels remain distinct and are not divided out. For example, assigning6 distinct cards to labeled boxes A(2),B(1),C(3) gives6!/(2!1!3!) assignments.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S25-M@1` · **obligationVersion:** `2`

How many distinct strings can be formed from BALLOON? Identify repeats, write the corrected factorial formula, explain the overcounting divided out, and validate on AAB by listing its distinct strings.

**Claims observed in Main:**
- Recognize indistinguishable objects.
- Use repeated-object factorial quotient.
- Explain internal-permutation division.
- Validate on a small repeated-object example.

### Main rubric — 10 points

- **2 pts:** Identifies the repeated letters in BALLOON and treats identical copies as indistinguishable.
- **3 pts:** Uses the repeated-object factorial quotient 7!/(2!2!) and obtains1260.
- **3 pts:** Explains why permutations among identical copies are overcounted and divided out.
- **2 pts:** Validates the correction on AAB by listing exactly AAB, ABA and BAA.

**Reference answer — keep hidden until the learner has committed an attempt:** 7!/(2!2!)=1260; L and O repeat twice. AAB has AAB,ABA,BAA.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S25-T@1` · **obligationVersion:** `3`

Nine distinct students are assigned to labeled shifts Morning(4), Afternoon(3), Night(2), and student A must be in Morning. Count the valid assignments. Explain what is fixed first, why internal order within each shift is irrelevant, and why the shift labels remain distinct.

**Claims observed in Transfer:**
- Use multinomial count for labeled groups.

### Transfer rubric — 10 points

- **2 pts:** Fixes student A in Morning before counting the remaining assignments.
- **2 pts:** Uses the remaining labeled group sizes3,3,2 to obtain the factorial quotient 8!/(3!3!2!).
- **2 pts:** Obtains the correct count560.
- **2 pts:** Explains why internal order within each shift does not create a new assignment and is divided out.
- **2 pts:** Explains why Morning, Afternoon and Night remain distinct labels and are not divided out.

**Reference answer — keep hidden until the learner has committed an attempt:** Fix A in Morning. The remaining8 students fill labeled groups of sizes3,3,2. Temporarily order all8, then divide out internal permutations within Morning, Afternoon and Night: 8!/(3!3!2!)=560. Internal order is irrelevant but shift labels are not.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Permutations with repeated objects & multinomial grouping. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 30 · Combinations, binomial coefficients, subsets & binomial expansion

**Stable session ID:** `T22V3::T22E-DISC01::S26@1`
**Instruction version:** `m03-s26-instruction-v2-combination-range-r1`

## Purpose

Own combinations as subset counts, preserve the ordered↔unordered counting bridge, and establish the finite binomial theorem strongly enough for M10's arbitrary-positive-integer power-rule proof.

## Entry prerequisites

- M03-S24
- M03-S16

## Required ownership

- Use nCr formula.
- Explain order irrelevance.
- Use nCr symmetry.
- Connect combinations to subsets.
- State and use the finite binomial theorem for positive integer n, and explain combinatorially why the coefficient of x^(n−k)y^k is C(n,k).

## Canonical lesson

For integers n≥0 and 0≤r≤n, a combination selects an r-element subset, so internal order is irrelevant: C(n,r)=n!/[r!(n−r)!]. With 0!=1, the endpoint values are C(n,0)=C(n,n)=1. An ordered r-selection can be built in two stages: first choose the r-element subset in C(n,r) ways, then order its r chosen elements in r! ways. Therefore P(n,r)=C(n,r)·r!, which explains the factorial formula rather than treating division by r! as a cancellation trick. Choosing the included r items is symmetric with choosing the excluded n−r items, so C(n,r)=C(n,n−r). The same subset-counting idea gives the finite binomial theorem. In the product of n factors (x+y), a term x^(n−k)y^k is produced by choosing exactly which k of the n factors contribute y; there are C(n,k) such choices. Hence for every positive integer n, (x+y)^n=Σ(k=0..n) C(n,k)x^(n−k)y^k. The endpoint terms k=0 and k=n are legal precisely because 0!=1 gives C(n,0)=C(n,n)=1. Worked example: (x+y)^3=x³+3x²y+3xy²+y³ because the coefficients are C(3,0),C(3,1),C(3,2),C(3,3). Guided check: in (p+q)^6, do not expand the whole expression. Explain why the coefficient of p^4q^2 is C(6,2)=15 by choosing which two factors contribute q, state the allowed k-range 0≤k≤6, and connect that choice-count to the general coefficient C(n,k).

## Main task

**Task ID:** `T22V3::T22E-DISC01::S26-M@1` · **obligationVersion:** `5`

For a committee of4 chosen from10 distinct people, compute the number of committees using combination notation and explain why internal order is irrelevant. State the finite binomial theorem for positive integer n, including the general coefficient of x^(n−k)y^k. Explain combinatorially why that coefficient is C(n,k), and then use the theorem to expand (u+v)^5 completely.

**Claims observed in Main:**
- Use nCr formula.
- Explain order irrelevance.
- State and use the finite binomial theorem for positive integer n, and explain combinatorially why the coefficient of x^(n−k)y^k is C(n,k).

### Main rubric — 10 points

- **2 pts:** Computes the committee count as C(10,4)=210 using combination notation.
- **2 pts:** Explains why internal order does not create a different committee.
- **2 pts:** States the finite binomial theorem for positive integer n with general term C(n,k)x^(n−k)y^k, without the formula being supplied in the task.
- **2 pts:** Explains combinatorially that C(n,k) chooses which k of the n factors contribute y.
- **2 pts:** Uses the theorem to expand (u+v)^5 with coefficients1,5,10,10,5,1.

**Reference answer — keep hidden until the learner has committed an attempt:** C(10,4)=210; internal order does not create a different committee. For positive integer n, (x+y)^n=Σ(k=0..n) C(n,k)x^(n−k)y^k. The coefficient C(n,k) counts the choices of which k among the n factors contribute y. For n=5, (u+v)^5=u^5+5u^4v+10u^3v^2+10u^2v^3+5uv^4+v^5.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S26-T@1` · **obligationVersion:** `3`

For an 8-element set, count its 3-element subsets using C(8,3), explain why this is an unordered subset count, explain the complementary-subset symmetry C(8,3)=C(8,5), then count the ordered triples obtained by ordering each selected subset.

**Claims observed in Transfer:**
- Use nCr symmetry.
- Connect combinations to subsets.

### Transfer rubric — 10 points

- **2 pts:** Computes the number of3-element subsets as C(8,3)=56.
- **2 pts:** Explains that C(8,3) counts unordered 3-element subsets rather than ordered triples.
- **2 pts:** Explains complementary-subset symmetry C(8,3)=C(8,5) by choosing included versus excluded elements.
- **2 pts:** Recognizes that each3-element subset has3!=6 orderings.
- **2 pts:** Multiplies56·6 to obtain336 ordered triples with distinct entries from the8-element set.

**Reference answer — keep hidden until the learner has committed an attempt:** C(8,3)=56 unordered 3-element subsets. Choosing the included3 elements is equivalent to choosing the excluded5, so C(8,3)=C(8,5). Each selected subset has3!=6 orderings, giving56·6=336 ordered triples.

## Exit condition

State the finite binomial theorem for positive integer n, justify its coefficient C(n,k) by factor-choice counting, and apply it on a fresh finite expansion while retaining the subset/complement interpretation of combinations. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 31 · Double counting & combinatorial identities

**Stable session ID:** `T22V3::T22E-DISC01::S35@1`
**Instruction version:** `m03-s35-instruction-v2-r1`

## Purpose

Turn algebraic counting identities into explanations by defining one finite collection and decomposing it in two independent ways.

## Entry prerequisites

- M03-S23 finite sum/product rules
- M03-S26 combinations/binomial coefficients
- M03-S34 encodings and finite fibres
- M02 finite sums

## Required ownership

- Use an explicitly supplied finite incidence or pair set as the common object in a double-counting proof.
- Partition and count that set by one feature without omissions or overlap.
- Count the same set by a different feature and justify that every object is counted exactly once.
- Equate the two counts and state the summation/boundary conventions used.
- Invent a combinatorial interpretation for an algebraic-looking finite sum using already-owned finite objects.

## Canonical lesson

Double counting proves an equality by counting one finite set of objects in two different valid ways. The key obligation is sameness: both calculations must count exactly the same objects, exactly once. Worked example: with five people, let I be the incidences (p,T) where T is a two-person team and p is a member of T. Counting by teams gives 2·C(5,2). Counting by the marked person gives 5·4 because after choosing p there are four choices for the teammate. Therefore 2C(5,2)=20=5·4. This is not two unrelated computations; both count I. Guided check: define incidences (p,T) for six people and three-person teams, then write—but do not simplify—the count by teams and the count by the marked person. State why each incidence appears once in each decomposition.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S35-M@1` · **obligationVersion:** `1`

Let U={1,2,3,4,5} and let I={(S,i): S⊆U and i∈U\S}. Count I in two ways. First partition by k=|S| to obtain a finite sum. Then count by choosing i first. Equate the two counts to prove Σ(k=0..5)(5−k)C(5,k)=5·2^4, and explain the k=5 boundary term.

**Claims observed in Main:**
- Use an explicitly supplied finite incidence or pair set as the common object in a double-counting proof.
- Partition and count that set by one feature without omissions or overlap.
- Count the same set by a different feature and justify that every object is counted exactly once.
- Equate the two counts and state the summation/boundary conventions used.

### Main rubric — 10 points

- **2 pts:** Defines/uses the single incidence set I of a subset together with a marked element outside it.
- **2 pts:** Counts by subset size as Σ(k=0..5)(5−k)C(5,k), with the factor 5−k justified.
- **2 pts:** Counts the same I by choosing i first and then choosing any subset of the remaining four elements, giving 5·2^4.
- **2 pts:** Explains that both decompositions count every pair (S,i) exactly once and therefore may be equated.
- **2 pts:** Explains the k=5 boundary term as zero because no element of U lies outside S=U.

**Reference answer — keep hidden until the learner has committed an attempt:** I consists of a subset S together with a marked element outside it. If |S|=k, choose S in C(5,k) ways and i from the 5−k outside elements, giving Σ(5−k)C(5,k). Alternatively choose i first (5 ways); each of the other four elements may independently be in or out of S, giving 5·2^4=80. At k=5 there is no outside element, so the term is 0·C(5,5)=0.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S35-T@1` · **obligationVersion:** `1`

Give a combinatorial proof that Σ(k=0..4) C(4,k)2^k=81. Your proof must define one finite set of objects and count that same set in two genuinely different ways. Do not justify the identity by expanding the sum arithmetically.

**Claims observed in Transfer:**
- Invent a combinatorial interpretation for an algebraic-looking finite sum using already-owned finite objects.

### Transfer rubric — 10 points

- **2 pts:** Defines a single finite set of objects whose size is represented by the given sum.
- **2 pts:** Justifies a first count producing C(4,k)2^k for objects in the kth class and sums over k=0,…,4.
- **2 pts:** Provides a second, genuinely different count of the same objects that yields 81.
- **2 pts:** Explains why both counts enumerate every chosen object exactly once, rather than merely matching algebraic values.
- **2 pts:** Reaches the identity Σ(k=0..4)C(4,k)2^k=81 with valid finite boundary conventions.

**Reference answer — keep hidden until the learner has committed an attempt:** One model is J={(T,S):T⊆S⊆{1,2,3,4}}. If |S|=k, choose S in C(4,k) ways and then T⊆S in 2^k ways, giving the sum. Alternatively, each ground-set element has three states: outside S, in S\T, or in T, so |J|=3^4=81.

## Exit condition

Derive one identity from an explicitly supplied incidence set and independently invent a valid two-way counting model for a new finite sum. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 32 · Stars-and-bars: combinations with repetition

**Stable session ID:** `T22V3::T22E-DISC01::S27@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build stars-and-bars: combinations with repetition as an independently observable capability before later probability/research modules.

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

## Canonical lesson

Stars-and-bars encodes a nonnegative solution x1+⋯+xk=n by writing n identical stars and k−1 separators; the numbers of stars between separators are x1,…,xk. This is a bijection: every distribution gives one string and every string gives one distribution, so choosing the separator positions among n+k−1 positions gives C(n+k−1,k−1). Worked example: Five identical tokens in three labeled boxes can be written ★★|★|★★ for (2,1,2). There are 5 stars and 2 bars, so C(7,2)=21 distributions. If each box must be nonempty, reserve one token per box first. Guided check: Encode all nonnegative solutions of x+y=4 with four stars and one bar, and verify there are C(5,1)=5.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S27-M@1` · **obligationVersion:** `1`

Count nonnegative integer solutions to x1+x2+x3=7. Then count positive solutions y1+y2+y3=8 by shifting. Explain identical-object/labeled-box interpretation and why xi≤3 invalidates the plain formula.

**Claims observed in Main:**
- Model nonnegative solutions with stars-and-bars.
- Use C(n+k−1,k−1).
- Convert positive constraints by shifting.
- Interpret identical objects into labeled boxes.
- Recognize upper bounds require correction.

### Main rubric — 10 points

- **2 pts:** Demonstrates: Model nonnegative solutions with stars-and-bars.
- **2 pts:** Demonstrates: Use C(n+k−1,k−1).
- **2 pts:** Demonstrates: Convert positive constraints by shifting.
- **2 pts:** Demonstrates: Interpret identical objects into labeled boxes.
- **2 pts:** Demonstrates: Recognize upper bounds require correction.

**Reference answer — keep hidden until the learner has committed an attempt:** C(9,2)=36; positive shift gives C(7,2)=21; labeled boxes/identical units; cap needs correction.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S27-T@1` · **obligationVersion:** `3`

For a monomial x^a y^b z^c w^d, define its total degree as a+b+c+d, where a,b,c,d are nonnegative integers. How many such monomials have total degree10? How many have all four exponents positive? Explain the exponent-vector ↔ stars-and-bars correspondence.

**Claims observed in Transfer:**
- None.

### Transfer rubric — 10 points

- **2 pts:** Translates total degree10 into the nonnegative integer equation a+b+c+d=10.
- **2 pts:** Uses stars-and-bars to obtain C(13,3)=286 total-degree10 monomials.
- **2 pts:** Handles positive exponents by shifting each exponent down by1.
- **2 pts:** Counts the positive-exponent case as C(9,3)=84.
- **2 pts:** Explains the bijection between exponent vectors and stars-and-bars distributions.

**Reference answer — keep hidden until the learner has committed an attempt:** Total degree10 corresponds to a+b+c+d=10 with nonnegative exponents, so C(13,3)=286. If all exponents are positive, set a'=a−1,b'=b−1,c'=c−1,d'=d−1; then a'+b'+c'+d'=6, so C(9,3)=84.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Stars-and-bars: combinations with repetition. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 33 · Complement counting & inclusion-exclusion

**Stable session ID:** `T22V3::T22E-DISC01::S28@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build complement counting & inclusion-exclusion as an independently observable capability before later probability/research modules.

## Entry prerequisites

- M03-S17
- M03-S23

## Required ownership

- Use two-set inclusion-exclusion.
- Explain overlap subtraction.
- Use complement to count neither.
- Compute exactly-one counts.
- Apply inclusion-exclusion to divisibility counting.

## Canonical lesson

For two finite sets, |A∪B|=|A|+|B|−|A∩B| because naive addition counts each overlap element twice. Worked example: let A={1,2,3,4} and B={3,4,5}. Listing gives A∪B={1,2,3,4,5}; the count 4+3 overcounts the two shared elements, so 4+3−2=5. Guided check: with X={a,b,c} and Y={c,d}, list X∪Y and explain exactly which element naive addition counts twice; then, in a six-element universe where |X∪Y|=4, determine how many elements lie outside the union. Bridge for later synthesis: derive the three-set rule by adding C to A∪B. Since |(A∪B)∩C|=|A∩C|+|B∩C|−|A∩B∩C|, substitution gives |A∪B∪C|=|A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S28-M@1` · **obligationVersion:** `2`

Among100 users,60 use A,45 use B,25 use both. Find union, explain the correction, find neither, find exactly one, and write the set logic.

**Claims observed in Main:**
- Use two-set inclusion-exclusion.
- Explain overlap subtraction.
- Use complement to count neither.
- Compute exactly-one counts.

### Main rubric — 10 points

- **2 pts:** Applies two-set inclusion-exclusion to obtain |A∪B|=60+45−25=80.
- **2 pts:** Explains that the25 users in A∩B were counted twice before the subtraction.
- **2 pts:** Uses the complement in the100-user universe to obtain20 users in neither set.
- **2 pts:** Computes exactly-one users as (60−25)+(45−25)=55.
- **2 pts:** Writes correct set logic connecting A∪B, A∩B, neither and exactly-one classes.

**Reference answer — keep hidden until the learner has committed an attempt:** Union80; neither20; exactly-one55.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S28-T@1` · **obligationVersion:** `1`

How many integers1 through100 are divisible by2 or5? Use inclusion-exclusion and identify overlap.

**Claims observed in Transfer:**
- Apply inclusion-exclusion to divisibility counting.

### Transfer rubric — 10 points

- **2 pts:** Counts multiples of 2 in 1..100 correctly.
- **2 pts:** Counts multiples of 5 in 1..100 correctly.
- **2 pts:** Identifies the overlap as multiples of 10.
- **2 pts:** Applies inclusion-exclusion to the divisibility-by-2-or-5 count.
- **2 pts:** Obtains the final union count 60.

**Reference answer — keep hidden until the learner has committed an attempt:** 50+20−10=60; overlap multiples of10.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Complement counting & inclusion-exclusion. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 34 · Pigeonhole principle

**Stable session ID:** `T22V3::T22E-DISC01::S29@1`
**Instruction version:** `m03-instruction-v12-evidence-retrofit-r1`

## Purpose

Build pigeonhole principle as an independently observable capability before later probability/research modules.

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

## Canonical lesson

The pigeonhole principle says that if N objects are placed into k boxes, some box contains at least ⌈N/k⌉ objects, where ⌈x⌉ is the least integer greater than or equal to x. If every box held at most ⌈N/k⌉−1, the total capacity would be too small. The theorem proves that a collision exists, not which box contains it. Worked example: Put 17 files into 4 folders. Since ⌈17/4⌉=5, one folder has at least 5 files; otherwise four folders with at most 4 files each could hold only 16. Guided check: Ten socks are placed into three drawers. State the guaranteed occupancy and justify it by the same capacity argument.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S29-M@1` · **obligationVersion:** `2`

Twenty-five records are assigned to6 categories. Identify pigeons/holes, compute the guaranteed minimum occupancy, prove the ceiling bound, explain existence-not-identity, and state the simpler collision for13 people assigned to12 birth months.

**Claims observed in Main:**
- Identify pigeons and holes.
- Force collision with more pigeons than holes.
- Use generalized ceiling bound.
- Explain existence-not-identity.

### Main rubric — 10 points

- **2 pts:** Identifies the25 records as pigeons and the6 categories as holes.
- **2 pts:** Uses the generalized ceiling bound to obtain a guaranteed occupancy of⌈25/6⌉=5.
- **2 pts:** Justifies the bound by showing that six categories with at most4 records each could hold only24.
- **2 pts:** Explains that the theorem guarantees existence of some crowded category without identifying which category.
- **2 pts:** Correctly states that13 people assigned to12 birth months force at least two people to share a month.

**Reference answer — keep hidden until the learner has committed an attempt:** At least5, otherwise at most24; category not identified; 13/12 forces a shared month.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S29-T@1` · **obligationVersion:** `1`

Eleven distinct integers are chosen from {1,2,…,20}. Prove two chosen integers must be consecutive by designing10 pigeonholes.

**Claims observed in Transfer:**
- Design non-obvious holes.

### Transfer rubric — 10 points

- **2 pts:** Uses the eleven selected integers as pigeons.
- **2 pts:** Designs the ten consecutive-pair pigeonholes {1,2},{3,4},...,{19,20}.
- **2 pts:** Applies pigeonhole correctly to force two selected integers into one pair.
- **2 pts:** Concludes those two selected integers are consecutive.
- **2 pts:** Does not claim a particular pair is forced.

**Reference answer — keep hidden until the learner has committed an attempt:** Use pair holes{1,2},{3,4},…,{19,20};11 into10 forces two in one pair.

## Exit condition

Solve Main and Transfer while visibly satisfying the five ownership claims for Pigeonhole principle. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 35 · Invariants, integer ranks & termination

**Stable session ID:** `T22V3::T22E-DISC01::S36@1`
**Instruction version:** `m03-s36-instruction-v2-r1`

## Purpose

Introduce a mathematical language for proving impossibility and finite termination before M08 turns the same ideas into program invariants and loop variants.

## Entry prerequisites

- M03-S08 parity/divisibility language
- M03-S13 induction
- M03-S33 well-ordering
- M03-S19 relations
- M02 recurrence/state intuition

## Required ownership

- Interpret and model a supplied state space, legal moves, initial state and target/terminal condition of a finite process.
- Propose and prove an invariant by checking it initially and after every legal move.
- Use an invariant to rule out a target without claiming that every invariant-compatible target is reachable.
- Choose a nonnegative integer rank that strictly decreases at every legal move and use it to prove termination.
- Distinguish termination from identification of the terminal state, and combine an invariant with termination when needed.

## Canonical lesson

A state records all information needed to describe the process at one moment; a legal move specifies which transitions are allowed. An invariant is a property true in the initial state and preserved by every legal move. It can rule out any target that violates the property, but preservation alone does not prove that every other target is reachable and does not prove termination. A rank for termination is a nonnegative integer attached to each state that strictly decreases after every legal move. Such a rank cannot decrease forever, so an infinite legal sequence is impossible. The integer condition matters: a positive real quantity can decrease forever through 1,1/2,1/4,… without reaching zero in finitely many steps. Worked example: a board state is (x,y)∈Z² and a move sends (x,y) to (x+1,y−1); x+y is invariant because the +1 and −1 cancel. Separately, if a process on a nonnegative integer n replaces n by n−2 whenever n≥2, the rank n strictly decreases and proves termination. Guided check: a list operation replaces two adjacent entries by their sum. Identify one preserved numerical quantity and one nonnegative integer rank that strictly decreases, but do not infer the final value until you state the terminal rule.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S36-M@1` · **obligationVersion:** `1`

A state is a pair (x,y) of nonnegative integers. A legal move transfers exactly 2 units from one coordinate to the other: (x,y)→(x−2,y+2) when x≥2, or (x,y)→(x+2,y−2) when y≥2. Starting from (3,8), decide whether (4,7) is reachable. Find an invariant that decides the question, prove it is preserved by every legal move, and explain why your invariant proves non-reachability here but would not by itself prove that every invariant-compatible state is reachable.

**Claims observed in Main:**
- Interpret and model a supplied state space, legal moves, initial state and target/terminal condition of a finite process.
- Propose and prove an invariant by checking it initially and after every legal move.
- Use an invariant to rule out a target without claiming that every invariant-compatible target is reachable.

### Main rubric — 10 points

- **2 pts:** Models both allowed transitions and notes the nonnegative-state legality condition.
- **2 pts:** Identifies a decisive invariant such as the parity of x (or equivalently the parity of y).
- **2 pts:** Proves the invariant is preserved under both legal move types, not just in sampled moves.
- **2 pts:** Uses the mismatch between the initial and target invariant values to prove (4,7) is unreachable.
- **2 pts:** Explains that an invariant can rule out incompatible targets but does not by itself prove reachability of all compatible states.

**Reference answer — keep hidden until the learner has committed an attempt:** The parity of x is invariant because every legal move changes x by ±2. Initially x=3 is odd, while the target has x=4 even, so the target is unreachable. Both move types preserve this parity. The invariant rules out states with even x but does not prove that every state with odd x and the same other constraints is reachable.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S36-T@1` · **obligationVersion:** `1`

Two piles contain 17 and 11 tokens. While both piles are nonempty, one legal move removes exactly one token from each pile. Find (i) a useful invariant and (ii) a nonnegative integer rank that strictly decreases on every move. Use the rank to prove the process terminates, then use the invariant together with the terminal rule to determine the terminal state and the number of moves. State clearly which conclusion comes from the invariant and which comes from the rank.

**Claims observed in Transfer:**
- Choose a nonnegative integer rank that strictly decreases at every legal move and use it to prove termination.
- Distinguish termination from identification of the terminal state, and combine an invariant with termination when needed.

### Transfer rubric — 10 points

- **2 pts:** Identifies and proves a useful invariant, such as a−b=6, under the simultaneous removal move.
- **2 pts:** Chooses a nonnegative integer rank such as a+b and proves it strictly decreases on every legal move.
- **2 pts:** Uses the rank to conclude that an infinite legal move sequence is impossible, so the process terminates.
- **2 pts:** Uses the invariant plus the terminal rule to determine the terminal state (6,0), rather than attributing that state to termination alone.
- **2 pts:** Determines that exactly 11 moves occur and distinguishes the invariant's role from the rank's role.

**Reference answer — keep hidden until the learner has committed an attempt:** The difference a−b is invariant because both coordinates decrease by 1. The rank a+b is a nonnegative integer and decreases by 2 each move, so the process terminates. The invariant begins at 6. At termination at least one pile is zero; because the difference remains +6, the terminal state must be (6,0). Eleven moves occur, since the second pile loses one token per move from 11 to 0.

## Exit condition

Prove one target impossible by an invariant and solve a different terminating process using both an invariant and a valid nonnegative integer rank. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

# Position 36 · M03 synthesis — representation, proof & finite counting

**Stable session ID:** `T22V3::T22E-DISC01::S30@1`
**Instruction version:** `m03-s30-instruction-v2-unlabeled-synthesis-r1`

## Purpose

Observe whether the learner can independently select a finite representation and combine previously owned proof/counting tools after all 35 earlier learner positions.

## Entry prerequisites

- All earlier M03 learner positions 1–35
- M03-S21 finite mappings/preimages
- M03-S28 inclusion-exclusion
- M03-S29 finite capacity/pigeonhole
- M03-S35 double counting and incidence representations

## Required ownership

- Define the finite objects or states and relevant constraints before selecting a method.
- Select and justify a useful representation or method without a method label being supplied.
- Combine two or more previously owned M03 tools coherently in one solution.
- Verify edge, overlap or capacity conditions and distinguish guaranteed existence from identification where relevant.
- Communicate a complete proof/count whose logical and counting stages are justified, while allowing valid alternative routes.

## Canonical lesson

A synthesis problem should begin before a formula is chosen. First define the objects, target and constraints; then ask which representation makes the obstruction or count visible. Scratchwork may try more than one route, but the final solution should state why each chosen tool applies and how the stages fit together. Worked example: count length-4 binary strings that are not constant. The objects are the 2^4 binary strings; exactly two are constant, so the desired count is 2^4−2. The same objects can be viewed as functions from four labelled positions to {0,1}, which checks that the representation is faithful. Guided check: consider 3-person committees chosen from seven people with the requirement that at least one of two named people serves. Before calculating, state a natural universe and a complementary bad class, and say what must be checked before subtraction is valid. Do not calculate the final number yet. In final synthesis, a method name is less important than a correct object model, justified hypotheses and a complete argument.

## Main task

**Task ID:** `T22V3::T22E-DISC01::S30-M@1` · **obligationVersion:** `3`

A family F consists of 13 distinct 4-element subsets of U={1,2,…,8}. Prove that some element of U belongs to at least 7 members of F. No method name is supplied. Give a complete proof: define any auxiliary finite objects or counts you introduce, justify every counting/guarantee step, and explain why the conclusion guarantees existence without identifying which element is forced.

**Claims observed in Main:**
- Define the finite objects or states and relevant constraints before selecting a method.
- Select and justify a useful representation or method without a method label being supplied.
- Combine two or more previously owned M03 tools coherently in one solution.

### Main rubric — 10 points

- **2 pts:** Defines a legitimate finite object/counting representation for membership across the 13 four-element sets, such as subset–element incidences.
- **2 pts:** Justifies that the total membership/incidence count is 13·4=52.
- **2 pts:** Uses a valid second grouping/capacity argument: if every one of the 8 elements occurred in at most 6 sets, the same total would be at most 8·6=48.
- **2 pts:** Derives the contradiction 52>48 and concludes that some element belongs to at least 7 members of F.
- **2 pts:** Explains that the proof guarantees existence of at least one such element without identifying which element is forced, and presents the stages as one coherent argument.

**Reference answer — keep hidden until the learner has committed an attempt:** One clean route counts incidences I={(S,u):S∈F,u∈S}. Every one of the 13 sets contributes 4 incidences, so |I|=52. If every u∈U belonged to at most 6 sets, grouping the same incidences by u would give at most 8·6=48, contradiction. Hence some u belongs to at least 7 members of F. The argument guarantees at least one such u; it does not identify which element it is.

## Transfer task

**Task ID:** `T22V3::T22E-DISC01::S30-T@1` · **obligationVersion:** `4`

Let D be a 5-element set and C={c1,c2,c3}. Determine exactly how many functions f:D→C use every output value at least once. Separately prove that every such function has some output with at least two preimages. No named-method checklist is supplied: define whatever sets or representation you use, justify any overlap correction or boundary case, and distinguish what your existence argument guarantees from what it identifies.

**Claims observed in Transfer:**
- Verify edge, overlap or capacity conditions and distinguish guaranteed existence from identification where relevant.
- Communicate a complete proof/count whose logical and counting stages are justified, while allowing valid alternative routes.

### Transfer rubric — 10 points

- **2 pts:** Defines the finite function-counting universe and correctly obtains 3^5=243 total functions before imposing surjectivity.
- **2 pts:** Introduces and justifies an exact correction for missed outputs (or an equivalent exact route), with single-missed counts 2^5=32, pair-missed counts 1 and the all-missed boundary count 0.
- **2 pts:** Accounts for overlaps with the correct alternating correction and obtains exactly 150 functions that use all three outputs.
- **2 pts:** Proves that every such function has an output with at least two preimages by a valid finite-capacity/fibre argument on 5 domain elements and 3 outputs.
- **2 pts:** Distinguishes the guaranteed existence of a fibre of size at least 2 from identification of a particular output, and communicates both counting and existence parts coherently.

**Reference answer — keep hidden until the learner has committed an attempt:** There are 3^5=243 total functions. Let Ei be the functions missing ci (the learner may use equivalent notation). Then |Ei|=2^5=32; each pair intersection has size 1^5=1; the triple intersection is empty because D is nonempty. Thus functions missing at least one output number 3·32−3·1+0=93, so the onto functions number 243−93=150. For the second claim, five domain elements are distributed among three nonempty fibres; if every fibre had size at most 1 there would be at most three domain elements, impossible. Hence some output has at least two preimages. This guarantees such an output exists but need not identify which ci it is.

## Exit condition

Solve both unlabeled mixed tasks by defining the objects, choosing/justifying the route, combining owned tools and checking the relevant overlap/capacity boundaries. Clear the session only from the task-specific evidence above; do not require every ownership claim in both tasks.

---

## Strategy-lab supplement

The following labs are unscored diagnostic/practice and deliberately separated from fixed-task grading.

Date: 2026-10-05  
Candidate: `m03-authoring-v2.0-six-tools-candidate-r4`  
Status: **unscored diagnostic/practice only; never canonical ownership evidence**

These labs extend the published v1.7.2 Spire strategy labs for the six-tool M03 candidate. They run
only after the relevant fixed assessments. A correct lab solution does not retroactively make a
contaminated or assisted fixed attempt independent.

## Strategy Lab A — proof construction and reduction

**Placement:** after learner position 17, i.e. after new stable S33.  
At this point the learner has seen quantifier dependence, direct/contrapositive/contradiction
proof, existence/uniqueness, induction, well-ordering and least-counterexample reasoning.

For every probe:

1. decide first whether the statement is true as written;
2. write a two- or three-sentence orientation note before carrying out algebra;
3. if false, give a legal counterexample and propose the smallest useful correction you can prove;
4. if true, choose a proof route without selecting from a menu;
5. separate scratch search from the final argument.

Do **not** announce the intended proof method before the learner commits to a plan.

### A1 — direct inequality without a named route

Let x and y be real numbers with x < y. Prove

**x < (x+y)/2 < y.**

A complete argument must start from the stated hypothesis and justify both strict inequalities.

### A2 — existence plus uniqueness without a linear equation

Prove that there exists exactly one real number x satisfying

**x³ + x = 2.**

The final proof must visibly contain both the existence and the at-most-one parts.

### A3 — diagnose and repair

Audit the claim:

> For all integers a,b, if a² = b², then a = b.

If it is false, give a legal counterexample, repair the conclusion as economically as possible,
and prove the repaired statement.

### A4 — absolute value and proof by cases

Prove that for every real number x,

**|x| ≥ x.**

Determine exactly when equality holds. Do not cite a graph; give a complete argument from the
meaning of absolute value.

### A5 — recursive claim without a method label

A sequence is defined by a₁ = 1 and, for every n ≥ 1,

**aₙ₊₁ = aₙ + 2n + 1.**

Compute the first few terms, conjecture an exact formula for aₙ, and prove your formula for every
integer n ≥ 1. The proof method is deliberately not named.

**Diagnostic target:** Can the learner select a legal proof architecture from the logical form and
mathematical structure rather than from a prompt label?

---

## Strategy Lab B — representation, counting and process reasoning

**Placement:** after learner position 36, i.e. after stable S30 final synthesis.  
Run only after all M03 fixed Main/Transfer tasks have been attempted.

For every probe, begin with an orientation note:

- What are the objects/states?
- What information is preserved or forgotten by the representation?
- What would be overcounted?
- What is the natural finite universe?
- If there is a process, what could rule out a target and what could force termination?

Do not reveal method names until the learner has committed to an organizing plan.

### B1 — mixed ordered selection

How many length-4 strings can be formed from the symbols {0,1,2,3,4,5} if no symbol repeats and
exactly two positions contain even symbols?

Define what is being chosen and which parts are ordered before calculating.

### B2 — pair even and odd subsets by a reversible move

How many subsets of {1,2,3,4,5,6,7,8} have even cardinality?

Give a counting argument that does not list all subsets. If you use a correspondence, state the
forward move and why it is reversible.

### B3 — justify a symmetry division

Eight distinct people are split into two teams of four, but the two teams have no labels.
How many different splits are possible?

If you begin by choosing one four-person team, justify carefully why and by what constant factor
that procedure overcounts each final split.

### B4 — invent the holes

Prove that among any five integers, two have a difference divisible by 4.

The integers are arbitrary; define the finite categories that make the guarantee unavoidable.

### B5 — complement on a subset universe

How many subsets of {1,2,…,10} contain at least one of the elements 1, 2, 3?

State the universe you are counting and justify any complement you use.

### B6 — rectangles from a representation

A rectangular grid has 4 columns of unit squares and 3 rows of unit squares.
How many axis-aligned rectangles are determined by the grid lines?

Explain the representation of one rectangle before using combinations or products.

### B7 — an invariant must actually decide something

Start at (0,0). A legal move adds either (2,1) or (1,2).
Can the state (10,10) ever be reached? Give a proof, not a search.

### B8 — difference process: preservation versus termination

Start with the multiset {1,2,3,4,5,6,7,8,9,10}. A legal move chooses any two current entries a,b,
deletes both, and inserts |a−b|.

Prove that every legal play terminates after finitely many moves. Then prove a nontrivial property
that every possible final single entry must satisfy. State separately what proves termination and
what restricts the final entry.

**Diagnostic target:** Can the learner invent or choose a representation, distinguish invariant
from rank/termination, and combine previously learned tools when the procedure is not named?

---

## Clone / contamination boundary

These probes are intentionally outside the fixed task bank. They must remain unscored unless a
future version deliberately promotes one to a versioned assessment with a new identity and
independent separation audit.

Before changing any probe, compare it against:

- all 72 current fixed M03 tasks;
- the visible lessons/guided checks for all 36 positions;
- the published v1.7.2 Strategy Labs;
- any previously exposed diagnostic probe used with the learner.

A changed constant or renamed story is not enough to call a probe fresh.


---

## Review-repair provenance

- r3 exact SHA reviewed: `05d7bae1e7e2dc55a292de649fd9a013129476a7`.
- Independent review record: `docs/t22-course/M03-V2-INDEPENDENT-ADVERSARIAL-REVIEW-r1.md`.
- r4 repair branch: `codex/t22-m03-v2-review-repair-r1`.
- This pack does not self-declare acceptance. See the post-validation repair-resolution receipt and follow-up adversarial disposition.