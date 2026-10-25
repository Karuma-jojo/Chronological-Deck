# P02 — Experimentation, easier cases and patterns

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `150346c4778cbd3b07e29f94ad0a109883e9dd84`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `SMALL_CASES_UMBRELLA`. Both registered options are investigated.

## Research answer

The inspected source presents a discovery process with distinguishable functions: changing an instance to make it easier, generating examples or calculations, noticing regularities, proposing a conjecture, and proving it. These functions often cooperate. Zeitz explicitly combines the easier-case and hands-dirty strategies in the locker and card investigations, and separately describes numerical experimentation as leading to a conjecture in the four-consecutive-integers example.

This supports an overlapping discovery-workflow interpretation. It does not establish four full aliases, identify one final umbrella ability, or prove a proper containment relation between the raw expressions. In particular, the source's Get Your Hands Dirty instruction includes seeking patterns and reasons, so it must not be reduced to mere number generation in order to manufacture a distinction.

The mathematical boundary is clear: a small example, numerical table or easier cousin does not automatically justify a universal conclusion. However, exhaustive treatment of a genuinely finite domain, or a proved reduction to finitely many cases, can constitute proof. The crucial distinction is the justified coverage/inference, not whether numbers were used.

## Exact options and owned records

| Option | Candidate | Candidate-owned frozen evidence |
| --- | --- | --- |
| 1 and 2 | `RAW-SOURCE-z-numerical-experiment` — Numerical Experimentation | `E-RAW-SOURCE-z-numerical-experiment-source` |
| 1 | `RAW-SOURCE-z-make-easier` — Make It Easier | `E-RAW-SOURCE-z-make-easier-source` |
| 1 | `RAW-SOURCE-z-hands-dirty` — Get Your Hands Dirty | `E-RAW-SOURCE-z-hands-dirty-source` |
| 2 | `RAW-SOURCE-z-look-patterns` — Look for Patterns | `E-RAW-SOURCE-z-look-patterns-source` |

Option 1 is the complete three-way comparison; option 2 is the complete two-way comparison. Their union contains four distinct raw candidates. No Small Cases candidate is minted.

The existing numerical-experiment record cites PDF 23; the two startup records cite PDF 42; the patterns record cites the index at PDF 380. These records establish their literal discovery/terminology claims. The additional body readings and operation descriptions below are new public observations, not silently enlarged frozen claims. Formal use requires the existing candidate-owned supplemental-evidence process. Gate-3 labels do not decide granularity or relation type.

## Canonical source inspection

All four candidates name `S1-ZEITZ-2007-2E`, Paul Zeitz, The Art and Craft of Problem Solving, 2nd edition. The uploaded 383-page PDF matches SHA-256 `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565`.

| Inspected pages | Source content and use |
| --- | --- |
| PDF 21–23; printed 4–6; Example 1.2.1 | Numerical trials, conjecture, factoring and proof are separately described |
| PDF 42–44; printed 25–27; section 2.2 | Startup strategies, hands-dirty instruction, easier-problem investigation and its limits |
| PDF 45–46; printed 28–29; Examples 2.2.2–2.2.3 | Tables, parameter simplification, conjectures and the still-needed proof work |
| PDF 47–48; printed 30–31; Example 2.2.4 | Even-card counterexamples expose a parity boundary in an easier analogue |
| PDF 380; printed 363; patterns index entry | References printed pages 5, 10, 19, 26, 61 and 147; we do not claim every indexed passage was exhausted |
| PDF 164–165; printed 147–148; section 5.2, Example 5.2.1 | The indexed discussion includes symbolic/symmetric patterns, not only tables of numerical trials |

The cited text was read directly. PDF 44 and 47 were also rendered and visually inspected. No historical claim about a mathematician's discovery or priority is needed for this investigation.

## What the source actually distinguishes

In Example 1.2.1, numbers suggest a square-related pattern. The source then changes the task to proving the conjecture and performs algebraic manipulation. The existence of the successful identity does not retroactively make the preceding table a proof.

The startup passage permits temporarily removing a difficulty even when the modified problem is not a justified equivalent of the original. That is permission to investigate, not permission to transfer a conclusion without a bridge. In the locker example the source explicitly chooses a smaller size, constructs a table, identifies square-numbered candidates and then identifies divisibility/parity as the reason to investigate. These are cooperating actions with different intermediate outputs.

In the card example, an even number of people admits permanently unmatched pairs. The smaller analogue therefore reveals a missing parity condition in a naive generalization. It does not refute the original odd-sized target. The inspected discussion remains a partial investigation; this note does not assert a general odd-case proof on the strength of a few simulations.

The index points the patterns term to a symbolic algebra passage. Its worked argument uses symmetric expressions of two quantities instead of first numerically solving for them. This supports a broader pattern-seeking role in the inspected contexts. It does not determine the complete intended domain of either raw heading.

## Operation profiles and comparison limits

| Candidate expression | Source-bounded action | Typical intermediate output | Boundary needing attention |
| --- | --- | --- | --- |
| Numerical Experimentation | Calculate concrete values to investigate the target | Data, a conjecture or a counterexample | A finite prefix can fit several incompatible general rules |
| Make It Easier | Temporarily simplify size, parameters or difficult terms | A more accessible problem or example | Its answer needs a justified bridge back to the original |
| Get Your Hands Dirty | Explore concretely, seek a pattern, and investigate why it occurs | Familiarity, observations, a conjecture and possible explanatory leads | The source describes a process broader than bare computation |
| Look for Patterns | Seek a regularity or structural relationship in the available material | A candidate relationship, formula or organizing structure | Recognition is not its own universal justification; inspected material includes symbolic patterns |

These profiles identify functions within the inspected investigations. They are not a final partition of abilities. Two labels may refer to overlapping portions of a workflow, and an experiment may fail to reveal a pattern while still being useful.

## Discriminating mathematics

### M1. A successful conjecture still needs its algebraic proof

Reconstructing the source's four-consecutive-integers example, set

$$
f(n)=n(n+1)(n+2)(n+3).
$$

Grouping the outside and inside factors gives, with $a=n^2+3n$,

$$
f(n)+1=a(a+2)+1=(a+1)^2.
$$

The identity holds for every integer $n$. On the explicit domain $n\ge1$, the integer $a+1\ge5$, and $(a+1)^2-1$ lies strictly between consecutive squares. Hence $f(n)$ is not a square there. At $n=0$, $f(n)=0$ is a square: the identity survives, while an unqualified nonsquare claim on an enlarged domain fails.

The sibling script also multiplies the polynomials exactly. Both sides of the identity have coefficient vector $[0,6,11,6,1]$, ordered from constant term upward. That coefficient comparison is an algebraic identity check, unlike agreement at a chosen set of numerical inputs. The positive-instance checks in the script are supplementary controls, not the reason the identity is universal.

### M2. Arbitrarily long finite agreement cannot identify a rule without extra assumptions

For any positive integer $m$, define our original comparison polynomial

$$
F_m(n)=n^2+\prod_{j=1}^{m}(n-j).
$$

For $n=1,\ldots,m$, it agrees with $n^2$, while

$$
F_m(m+1)-(m+1)^2=m!\ne0.
$$

Thus increasing the number of matching observations, without restricting the admissible rule class or proving the relationship, does not remove the inference gap. This does not falsify Zeitz's true conjecture; it falsifies a proposed rule for accepting conjectures from prefixes alone.

The countertest does not imply that finite computations can never prove something. For example, every integer is $4q+r$ with $r\in\{0,1,2,3\}$, and

$$
(4q+r)^2-r^2=4(4q^2+2qr).
$$

That proved reduction justifies checking the four residues, which yield only 0 or 1 modulo 4. The case list is finite and complete because the reduction is proved.

### M3. A smaller analogue can uncover a domain restriction

In the source's card process, each person keeps the larger card and passes the smaller one rightward. For $2m$ people, assign each person one label from $1,\ldots,m$ and one from $m+1,\ldots,2m$, with two copies of every label in total. Only a low label is passed. Every later pair therefore still contains one low and one high label, so its two labels can never coincide.

This is an invariant proof for the even construction, not a claim based on observing a short run. The script constructs one valid configuration for each even size 2–16, checks the complete deterministic orbit and returns to the starting state; the periods are 1–8. A complete repeated state certifies the future evolution of those particular configurations. It does not establish all behavior at odd sizes or all configurations at any size.

The exploratory benefit is substantive: replacing the original size by a smaller one exposed a parity distinction instead of simply confirming the desired answer.

### M4. An easier problem may give only a necessary condition

As an original control, delete one edge of an odd cycle to obtain a path. The path admits a proper two-coloring by alternating colors. Restoring the edge forces the equal-colored endpoints to be adjacent, so the odd cycle is not two-colorable.

Colorability of the original cycle implies colorability of the path; the converse fails. A correct solution of the easier problem has therefore not solved the original. This demonstrates the missing bridge rather than discrediting easier-case exploration.

## Both registered options and rival explanations

| Comparison | Serious possibilities | What the investigation establishes |
| --- | --- | --- |
| Option 1: Numerical Experimentation / Make It Easier / Get Your Hands Dirty | Full aliases; one broad discovery process; complementary submoves; a specific coupled workflow | The source explicitly combines simplification and exploration, and separates data, conjecture and proof. Full operation identity and final grain are not established |
| Option 2: Numerical Experimentation / Look for Patterns | Same practical heuristic; an experiment feeding pattern recognition; wider pattern-seeking with numerical experimentation as one means | The numerical example couples them, while the indexed symbolic passage supports pattern-seeking beyond that particular numerical workflow. Full-domain equivalence or proper containment remains unproved |

We rejected two tempting but unsupported boundaries: Get Your Hands Dirty is not merely unstructured trial with no search for reasons, and Look for Patterns is not evidenced as exclusively numerical tabulation. Neither correction by itself establishes a final MERGE, SPLIT, COMBO or PARENT_CHILD relation.

The inspected examples support coupling among investigative functions. They do not yet define what an alleged Numerical Experimentation umbrella would own as separable components, or establish that generic co-use constitutes a single new compound technique. No temporary component handle or canonical card is created.

## Reproduction, open work and ledger state

Run the sibling script from repository root:

    python3 docs/smmc/arsenal-public-research/P02-P03-mathematical-checks.py

P02 controls passed: exact coefficient equality; 1,000 positive nonsquare instances with the zero boundary; eight arbitrary-prefix countertests; four square residues; complete even-card cycles for sizes 2–16; and exhaustive two-color assignments for paths/cycles of sizes 3–6. General claims above have arguments separate from finite checks.

Open questions are the complete intended scopes of the four expressions and whether a later precise operational convention supports an umbrella, aliases or distinct coupled submoves. Any stronger claim needs its own scope justification and candidate-owned evidence admission. The two registered options and all four participants have been investigated in this first author draft; independent review and those relation questions remain open.

No source record, candidate primary, formal relation or production status is changed. This is public developmental research, not formal Calibration PASS. All 661 production cases remain PENDING.
