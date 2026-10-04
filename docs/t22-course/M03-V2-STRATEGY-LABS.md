# M03 v2 — Strategy Lab supplement

Date: 2026-10-04  
Candidate: `m03-authoring-v2.0-six-tools-candidate-r3`  
Status: **unscored diagnostic/practice only; never canonical ownership evidence**

These labs extend the published v1.7.2 Spire strategy labs for the six-tool M03 candidate. They are
run only after the relevant fixed assessments. A correct lab solution does not retroactively make
a contaminated or assisted fixed attempt independent.

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

### A1 — reverse-divisibility claim

For every integer (n), if (3mid n^2), then (3mid n).

### A2 — existence plus uniqueness without a linear equation

Prove that there exists exactly one real number (x) satisfying

[
x^3+x=2.
]

The final proof must visibly contain both the existence and the at-most-one parts.

### A3 — diagnose and repair

Audit the claim:

> For all integers (a,b), if (a^2=b^2), then (a=b).

If it is false, give a legal counterexample, repair the conclusion as economically as possible,
and prove the repaired statement.

### A4 — quantifier-order stress test

Let (X={1,2,3,4}) and (Y={1,2,3,4}). The relation (R(x,y)) means
(x+y=5).

Decide each statement and justify the order of choice:

- (orall xin X,exists yin Y,R(x,y));
- (exists yin Y,orall xin X,R(x,y)).

Do not begin by trying to swap the symbols; explain who is chosen first and what may depend on
what.

### A5 — choose induction or minimal-counterexample reasoning yourself

Prove that for every integer (nge1),

[
5^nge4n+1.
]

The method is deliberately not named. If your first route becomes awkward, record the failed
first move briefly, change route, and present only the clean argument as the final proof.

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

### B1 — constrained strings

How many length-6 strings over ({0,1,2,3}) contain at least one (0) and at least one
(1)?

### B2 — spacing representation

How many 5-element subsets of ({1,2,ldots,12}) contain no two consecutive integers?

### B3 — bounded allocation

Count the nonnegative integer solutions of

[
x+y+z=14
]

subject to (xle5).

### B4 — finite existence by a useful partition

Six points with integer coordinates are placed in the plane. Prove that two of them have a
midpoint whose coordinates are both integers.

### B5 — avoid two fixed positions

How many permutations of ({1,2,3,4,5,6}) fix neither (1) nor (2)?

### B6 — choose a counting representation

How many length-5 strings over {A,B,C} contain exactly two A's and at least one B?

Define the objects before using a formula, and give a second representation or decomposition that
checks your count.

### B7 — an invariant must actually decide something

Start at ((0,0)). A legal move adds either ((2,1)) or ((1,2)).
Can the state ((10,10)) ever be reached? Give a proof, not a search.

### B8 — preservation is not termination

A state is a finite nonempty list of positive integers. A legal move replaces two entries
(a,b) by the single entry (a+b).

Prove that every legal play terminates and determine what the final single entry must be.
State separately what proves termination and what determines the terminal value.

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
