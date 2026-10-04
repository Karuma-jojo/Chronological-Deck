# M03 v2 — Strategy Lab supplement

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

### A4 — quantifier-order stress test

Let X = {1,2,3,4} and Y = {1,2,3,4}. The relation R(x,y) means x + y = 5.

Decide each statement and justify the order of choice:

- ∀x ∈ X, ∃y ∈ Y such that R(x,y);
- ∃y ∈ Y, ∀x ∈ X such that R(x,y).

Do not begin by swapping symbols; explain who is chosen first and what may depend on what.

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
