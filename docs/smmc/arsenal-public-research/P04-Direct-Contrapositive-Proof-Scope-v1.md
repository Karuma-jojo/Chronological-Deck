# P04 — Direct proof, contraposition and opaque project tags

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `ce8f957fa3f8a40dd2ee502da6374fa8033b5eab`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `CONTRAPOSITIVE_DIRECT_OPAQUE`, its complete six-candidate option.

## Research answer

Hammack and Velleman describe the same conditional-proof transformation on the inspected classical scope: replace the task of deriving $Q$ from $P$ by deriving $\neg P$ from $\neg Q$, retaining the common hypotheses and variable domains. Zeitz explicitly supplies the underlying equivalence and distinguishes it from the converse. This is strong support for a shared **operational kernel**, with different amounts of procedural exposition in the inspected passages.

The equivalence of the propositions does not make every proof of them an identical operation. Hammack proves one conditional in two ways, with different assumptions, intermediate goals and arithmetic witnesses. At the same time, his description explicitly implements contraposition by directly proving the transformed conditional. Thus neither “same conclusion, therefore one undifferentiated move” nor “two disjoint methods that cannot occur inside one another” survives the source reading.

The frozen DIRECT and CONTRAPOSITIVE tags establish vocabulary membership. Their own records do not establish which of these meanings, scopes or compositions the project intended. A textbook explanation is a research lead for a tag, not its retroactively authenticated definition.

## Exact participants and candidate-owned evidence

| Candidate | Frozen owned record | Evidentiary reach before this draft |
| --- | --- | --- |
| `RAW-LEGACY-direct` — DIRECT | `E-RAW-LEGACY-direct-schema` | Project-derived index signal: the tag occurs in the frozen method vocabulary |
| `RAW-LEGACY-contrapositive` — CONTRAPOSITIVE | `E-RAW-LEGACY-contrapositive-schema` | A separate vocabulary entry, without an operational definition |
| `RAW-SOURCE-h-direct-proof` — Direct Proof | `E-RAW-SOURCE-h-direct-proof-source` | Original locator PDF 5, chapter 4: the book gives the term a chapter |
| `RAW-SOURCE-h-contrapositive-proof` — Contrapositive Proof | `E-RAW-SOURCE-h-contrapositive-proof-source` | Original locator PDF 5, chapter 5: the book gives the term a chapter |
| `RAW-SOURCE-v-contrapositive` — Contrapositive Proof | `E-RAW-SOURCE-v-contrapositive-source` | Original locator PDF 390, summary: proving a conditional through its contrapositive |
| `RAW-SOURCE-z-contrapositive` — Contrapositive | `E-RAW-SOURCE-z-contrapositive-source` | Original locator PDF 58, section 2.3: the equivalent logical form is explicitly presented |

All six participants and their owned witness IDs are included. Original claims and locators stay unchanged. The body readings below are new developmental observations; stronger formal use requires owner-specific supplemental evidence admission. In particular, the two Hammack contents-page records do not silently become records of all the chapter arguments.

Gate-3's UNRESOLVED boundaries on thin records measure the admitted evidence. They neither certify that an operation is absent nor erase Velleman's already recorded operational proof outline.

## Sources inspected directly

| Source | Verified identity | Passages read |
| --- | --- | --- |
| `S3-HAMMACK-BOOK-OF-PROOF-3.4` | Uploaded Book of Proof 3.4, 380 pages; SHA-256 `e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd` | PDF 5; PDF 130–131, printed 118–119, section 4.3; PDF 140–142, printed 128–130, section 5.1 |
| `S4-VELLEMAN-2006-2E` | Uploaded How to Prove It, 398 pages; SHA-256 `eca0a0a955668e721df2f2e2aaf0d1e31044844a8c6e1435541c5531c863c142` | PDF 63, printed 49, the logical equivalence; PDF 104–107, printed 90–93, proof strategies and Example 3.1.3; PDF 390, printed 376, summary |
| `S1-ZEITZ-2007-2E` | Uploaded The Art and Craft of Problem Solving, 383 pages; SHA-256 `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565` | PDF 58, printed 41, section 2.3, deduction and symbolic logic |
| `S0-PROJECT-SCHEMA` | [Schema at the frozen commit](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/schema.mjs#L27-L38) | Lines 27–38, `SMMC_METHOD_TAGS`; both literal strings are present |

The three book byte hashes were checked again in this batch. Text was read directly, and Zeitz PDF 58, Velleman PDF 105 and 390, and Hammack PDF 130 and 141 were rendered and visually inspected. The frozen schema was fetched at its exact commit; its blob is `6d92a8f5a37b38b1ab5fb521b7e3542925920652`. No historical contest occurrence is inferred from a book chapter or project vocabulary.

## Source observations and bounded operation profiles

Hammack's direct-proof outline starts with the antecedent and aims at the consequent, filling the gap with justified reasoning. His contrapositive outline switches to the negated consequent and aims at the negated antecedent. It uses direct reasoning on that new conditional. The following page gives both proofs of the same integer proposition, then explains why transforming information about $x$ into information about an expression in $x$ may be easier than reversing that flow.

Velleman makes the change in givens and goal explicit, while preserving the other givens. The outline leaves a mathematical gap to solve; it is not an algorithm that automatically proves an arbitrary conditional. His next example chooses contraposition after trying alternatives. The summary repeats the two proof strategies separately.

Zeitz presents contraposition at the level of logically equivalent statements. On the same page he allows an overall deductive structure to contain locally different forms of argument. This supports composition of proof moves and warns against classifying a whole argument solely by its last implication.

Let $\Gamma$ denote the fixed background assumptions, and let $P,Q$ be statements with all variables and quantifiers interpreted on their stated domains.

| Function | Recognizable task | Solver action | Local output and obligation |
| --- | --- | --- | --- |
| Direct conditional proof in Hammack's outline | Establish $P\Rightarrow Q$ under $\Gamma$ | Add $P$ to the givens and derive $Q$ | A justified derivation $\Gamma,P\vdash Q$, with the temporary assumption discharged |
| Contrapositive proof in Hammack/Velleman | The same conditional, where working from $\neg Q$ is productive | Retain $\Gamma$, add $\neg Q$, derive $\neg P$, then use the equivalent conditional | A derivation $\Gamma,\neg Q\vdash\neg P$ that proves the original conditional in the stated classical setting |
| Contrapositive form in the inspected Zeitz passage | An implication to reformulate or recognize | Replace $P\Rightarrow Q$ with $\neg Q\Rightarrow\neg P$ | Equivalent target; the mathematical derivation is still required |
| Either frozen project tag alone | A retrieval label | No complete operation is specified by its owned schema record | Vocabulary evidence only; intended mathematical use remains unestablished |

This table describes the inspected scope. It does not certify final ontology, grain, prerequisites or full-domain alias relations.

## Mathematical reconstruction and attempted falsifiers

### M1. Equivalent targets have the same falsifying situation

In classical two-valued logic, $P\Rightarrow Q$ fails precisely when $P$ is true and $Q$ is false. Its contrapositive $\neg Q\Rightarrow\neg P$ fails in exactly that situation. Hence

$$
(P\Rightarrow Q)\ \Longleftrightarrow\ (\neg Q\Rightarrow\neg P).
$$

This equivalence is pointwise, so the same background restrictions and outer universal quantifiers may be retained. It does not authorize changing the variable domain or dropping $\Gamma$. The sibling script exhausts the four truth assignments, and all eight assignments including a background proposition.

An original falsifier distinguishes converse/inverse substitution. For integers, take $P(n)$ to mean $4\mid n$ and $Q(n)$ to mean $2\mid n$. The universal conditional is true because $n=4k$ implies $n=2(2k)$. Its contrapositive is also true. At $n=2$, the converse and inverse are both false. Reversing an arrow, or negating both sides without reversing it, is not contraposition.

### M2. Two source proofs of one conditional expose different local tasks

Hammack's proposition is, for $x\in\mathbb Z$,

$$
7x+9\text{ even}\quad\Rightarrow\quad x\text{ odd}.
$$

In the **direct reconstruction**, write $7x+9=2a$ with $a\in\mathbb Z$. Rearrangement gives

$$
x=2a-6x-9=2(a-3x-5)+1.
$$

The witness $a-3x-5$ is an integer because both $a$ and $x$ are integers. Its dependence on the known input $x$ is allowed; it is not a circular assumption that $x$ is already odd.

In the **contrapositive reconstruction**, assume $x$ is not odd. On the integer domain that means $x=2a$ for some integer $a$, and

$$
7x+9=14a+9=2(7a+4)+1.
$$

The expression is odd, so it is not even. The two proofs establish the same proposition, but their assumed data and produced witnesses differ.

The script checks all 101 integers from $-50$ through $50$: 50 direct antecedent cases and 51 contrapositive antecedent cases. The displayed identities and parity dichotomy supply the general argument; the finite checks do not replace it.

The integer domain matters. If “odd” still means $2k+1$ for an integer $k$, extending the implication to all rationals fails at our original control $x=1/7$: $7x+9=10$ is an even integer, but $x$ has no such odd-integer representation. This is a failed scope extension, not a defect in the source proposition.

### M3. Shared background assumptions must survive the transformation

Velleman's example assumes real $a,b,c$ with $a>b$ and asks for

$$
ac\le bc\quad\Rightarrow\quad c\le0.
$$

Its source contrapositive starts from $c>0$ and multiplies $a>b$ by that positive number to obtain $ac>bc$.

As an author-supplied alternative direct proof, $ac\le bc$ gives $(a-b)c\le0$; division by the positive $a-b$ yields $c\le0$. These are two valid local routes on the same background domain. Neither entails a universal claim that one route is easier for every problem.

Dropping $a>b$ falsifies the statement: $a=b=c=1$ satisfies the antecedent and violates the conclusion. The script checks 324 rational instances with $a>b$ on a specified half-integer grid, plus this missing-hypothesis counterexample. The order argument above establishes the real-domain result.

### M4. Negation is mathematical work, not a label substitution

For compound statements one must compute the negations correctly. In the classical setting,

$$
\neg(A\land B)\equiv\neg A\lor\neg B,\qquad
\neg(A\lor B)\equiv\neg A\land\neg B.
$$

With the domains retained,

$$
\neg\bigl(\forall x\in D\ \exists y\in E:\ R(x,y)\bigr)
\equiv
\exists x\in D\ \forall y\in E:\ \neg R(x,y).
$$

As an original falsifier of simply negating the predicate while leaving the quantifiers unchanged, let $D=E=\{0,1\}$ and $R(x,y)$ mean $x=y$. Every $x$ has an equal $y$, so the left negated statement is false. Yet every $x$ also has an unequal $y$, so $\forall x\exists y:\neg R(x,y)$ is true.

The script verifies the correct negation across all 16 binary relations on these two-element domains and checks the identity-relation counterexample. These controls test proof obligations inside contraposition; they are not additional harvested candidates.

## Comparison alternatives and research recommendations

| Comparison | Serious alternatives | Bounded finding |
| --- | --- | --- |
| Hammack / Velleman contrapositive outlines | Full aliases at an agreed grain; common move with different instructional packaging | Their inspected assumption/goal transformations coincide. This is the strongest operational match in the option; full-domain and grain certification still need explicit scope and admitted owned evidence |
| Zeitz / the two outlines | Same move stated logically; a formulation-only role; part of a larger proof-planning routine | The logical target conversion agrees. The inspected Zeitz paragraph alone supplies less of the procedural organization; this is not proof of mathematical nonidentity |
| Hammack direct / contrapositive | One broad conditional-proof family; distinct local strategies; transformed direct subproblem | Equal provability does not identify local operations. The source also explicitly uses direct reasoning inside contraposition, so mutual exclusivity and an unsupported proper-containment claim both fail |
| DIRECT / Hammack Direct Proof | Intended match; broader project shorthand; multiple uses; unresolved tag | Schema membership establishes none of these operational meanings |
| CONTRAPOSITIVE / any sourced counterpart | Intended match; narrower or broader project use; unresolved tag | The familiar spelling makes a useful research lead, but the tag's owned evidence does not authenticate the source profile as its definition |
| The two project tags with each other | Separate operational choices; overlapping project labels; unresolved semantics | Separate vocabulary entries alone establish neither distinction nor equivalence |

The provisional mathematical recommendation is to preserve the common contrapositive kernel as a strong comparison hypothesis while distinguishing target reformulation from completing a proof. No final MERGE, SPLIT, COMBO, PARENT_CHILD or primary disposition follows automatically. Missing project-tag semantics remain an evidence problem; they are not grounds to assert that the mathematical methods do not exist.

## Reproduction, remaining questions and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P04-P05-mathematical-checks.py

P04 controls passed: complete conditional/contrapositive/converse/inverse truth tables, eight common-background truth cases, 101 source-example integer inputs, the rational-domain counterexample, 324 ordered-field sample instances, the missing-background counterexample, De Morgan controls, and all 16 finite quantified-relation cases.

The first author draft investigates the complete registered option and all six participants. Open work is independent mathematical review, the final operational grain and full intended scopes, and admissible owner-specific clarification of the project tags and newly read book passages. This draft does not manufacture that evidence or an independent acceptance.

No production source record, Gate-3 measurement, candidate primary or formal relation is changed. All 661 production cases remain PENDING. Formal Calibration PASS and Gate 4 graduation remain pending.
