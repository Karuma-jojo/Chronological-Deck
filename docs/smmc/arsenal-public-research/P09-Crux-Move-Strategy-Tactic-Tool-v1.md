# P09 — Crux move, strategy, tactic and tool

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `472547490be7c1bcfc82ecd7e89f02a17679c30a`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `CRUX_SOURCE_DEFINED`, its complete four-candidate option.

## Research answer

The strongest interpretation supported by these passages is that **crux move is an explanatory role played by a concrete move in a particular solution**, rather than the name of one fixed mathematical transformation. Zeitz explicitly allows that role at strategic, tactical or tool level, allows several crux moves, and allows none.

The examples give that distinction mathematical content. Reaching a conjecture in the four-consecutive-number problem, adding and subtracting a term to factor a polynomial, and cancelling a shifted series have different inputs, actions and outputs. The source nevertheless calls them crux moves in their respective contexts. There is no single algebraic operation common to those occurrences.

This does not prove that recognizing a useful obstacle-clearing step is untrainable, or that a broader problem-solving ability cannot be defined. It means the bare source term does not yet specify that ability's reusable procedure. Strategy, Tactic and Tool are likewise the author's category names, not three particular executable moves or a universal ontology to adopt wholesale.

## Exact registered participants and candidate-owned evidence

| Candidate | Frozen owned record | Evidentiary reach |
| --- | --- | --- |
| `RAW-SOURCE-z-crux-move` — Crux Move | `E-RAW-SOURCE-z-crux-move-source` | A source-defined obstacle-clearing role that may occur at any of the three levels |
| `RAW-SOURCE-z-strategy-term` — Strategy | `E-RAW-SOURCE-z-strategy-term-source` | Zeitz's broad category for starting and pursuing problems |
| `RAW-SOURCE-z-tactic-term` — Tactic | `E-RAW-SOURCE-z-tactic-term-source` | His category for broadly applicable mathematical methods |
| `RAW-SOURCE-z-tool-term` — Tool | `E-RAW-SOURCE-z-tool-term-source` | His category for focused techniques/tricks |

All four frozen locators identify PDF 20, section 1.2. The explicit crux definition is on PDF 21. This new span is recorded as a developmental observation, without silently editing the frozen locator.

Gate 3's Crux Move measurement remains CROSS_SCALE / SINGLE_PRIMARY_MOVE, with an unresolved actual operation. That measurement recognizes the scale-variable role; it is not a completed proof that the term denotes one invariant algorithm. The three category terms retain their SOURCE_LOCAL / MACRO measurements. A category whose members may be narrow tools is still a broad category **as an expression**.

The stronger readings below remain unadmitted research observations. Original evidence records and all production measurements are unchanged.

## Canonical source inspected directly

Source: uploaded `S1-ZEITZ-2007-2E`, The Art and Craft of Problem Solving, 383 pages. The local bytes were rehashed as SHA-256 `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565`.

| Passage | Reading relevant to this question |
| --- | --- |
| PDF 20, printed 3, section 1.2 | The three category definitions and an explicit warning that these are the author's nonstandard definitions |
| PDF 21, printed 4 | Crux move's obstacle-clearing role, levels, and allowance of several or none |
| PDF 21–23, printed 4–6, Example 1.2.1 and retrospective analysis | A strategic conjecture is identified as the crux, while the completion can use different concrete algebraic routes |
| PDF 166, printed 149, Example 5.2.9 | Adding/subtracting a term reveals a polynomial factorization and is explicitly called the crux |
| PDF 175, printed 158, geometric series and telescope discussion | Shifted-series cancellation is identified as a crux/tool, followed by a rational-series example |

Text for all listed passages was read. PDF 20, 21, 23, 166 and 175 were rendered and visually inspected. The last two are additional supporting examples beyond the four registered participants; their associated raw IDs and complete same-name clusters are recorded in the exposure appendix below.

The source's descriptions of relative importance concern its examples and pedagogy. They are not competition-frequency measurements, learner-performance data or Arsenal rankings.

## Source observations and bounded interpretation

On PDF 20, the three levels distinguish breadth and function in problem solving: broad plans, methods usable across settings, and more focused techniques. The source expressly does not present these definitions as standard mathematical terminology.

On PDF 21, crux refers to clearing a key obstacle. The analogy also makes the problem/exercise distinction depend on prior ability and experience. The text allows the role at any level, rather than defining a fourth level above the other three.

On PDF 23, arriving at the useful conjecture is described as the crux. The following algebra can be completed by substitution or by coefficient comparison, not only by the first displayed factorization. PDF 166 and 175 supply explicit uses at the level of focused algebraic techniques.

| Expression | What the source supplies | What it does not yet supply as one move |
| --- | --- | --- |
| Strategy | A category of broad plans and ways of investigating | One universal mathematical input, transformation and output for all strategies |
| Tactic | A category of methods with broad applicability | One operation performed by every tactic |
| Tool | A category of focused techniques | One shared procedure identical to each category member |
| Crux Move | A contextual obstacle-clearing role for a concrete move, potentially at any level | A fixed operation independent of which move plays the role |

The leading research model therefore separates two questions: **what did the solver do?** and **what role did that occurrence play in this route?** A move can have a Zeitz level and also play the crux role. The labels need not be mutually exclusive alternatives.

## Mathematical comparisons and attempted falsifiers

### M1. A strategic conjecture can precede several different completion routes

In the source's four-consecutive-number example, let

$$
f(n)=n(n+1)(n+2)(n+3).
$$

The crux identified by the retrospective analysis is reaching the conjecture that $f(n)+1$ is a square. The source then offers alternative completions. With $u=n^2+3n$, the expression becomes $u(u+2)+1=(u+1)^2$. Alternatively, expand and match coefficients of a quadratic square. Both yield

$$
f(n)+1=(n^2+3n+1)^2.
$$

The conjecture-making occurrence and the later algebra have different functions. The term crux does not select one obligatory factorization route.

The identity and its domain boundary were already reconstructed and checked in [P02](P02-Experimentation-Smaller-Cases-Patterns-v1.md). For the nonsquare conclusion we retain $n\ge1$; the integer identity alone does not make $f(0)=0$ a nonsquare. No new independent test of that old identity is claimed here, and the P02 note/script remain unchanged.

### M2. An explicitly named crux can instead be a focused algebraic rewrite

For the source's real-coefficient factorization task, the useful rewrite is

$$
x^4+4
=x^4+4x^2+4-4x^2
=(x^2+2)^2-(2x)^2
=(x^2+2x+2)(x^2-2x+2).
$$

The added pair cancels to zero, preserving the polynomial while exposing a difference of squares. The input is a polynomial expression and the output is a factorization. That is different from producing a conjecture from numerical investigation.

The new script multiplies the two quadratic coefficient lists exactly and obtains $[4,0,0,0,1]$, in increasing degree order. It independently checks the square-minus-term form. This verifies the algebraic identity, not a theorem that every addition of zero is useful or deserves a crux annotation.

### M3. Another source crux/tool performs cancellation across a finite sum

Let

$$
S_N=a+ar+\cdots+ar^{N-1},\qquad N\ge1.
$$

Subtracting the shifted sum $rS_N$ cancels all intermediate terms and yields

$$
(1-r)S_N=a(1-r^N).
$$

This identity holds for real $a,r$, including $r=1$. To divide by $1-r$, one must separately assume $r\ne1$. At $r=1$, the sum is instead $Na$.

The source's next rational-series task illustrates a different way to create cancellation. Completing the displayed term decomposition gives the author reconstruction

$$
\sum_{k=1}^{N}\frac1{k(k+1)}
=\sum_{k=1}^{N}\left(\frac1k-\frac1{k+1}\right)
=1-\frac1{N+1}.
$$

At $N=99$ the value is $99/100$. The denominators are nonzero on the stated positive-integer domain.

The script checks 168 exact rational geometric-series inputs, including 24 ratio-one cases, and 21 rational telescoping sums. The general cancellation arguments above supply the proofs.

These operations share the source's crux role in their contexts but do not have the same immediate input/output contract as M1 or M2. Even inside telescoping, the way cancellation is exposed can vary.

### M4. What the successful comparisons actually falsify

| Proposed definition or rule | Discriminating evidence | Result |
| --- | --- | --- |
| Crux Move always means numerical conjecturing | Source explicitly calls the polynomial rewrite and telescope tool crux moves | Too narrow |
| Crux Move always means polynomial factorization | Strategic conjecturing and finite-sum cancellation have different local tasks | Too narrow |
| Crux is a fourth fixed level, above Strategy/Tactic/Tool | The definition permits it at any of the three levels | Inconsistent with the source definition |
| Every problem has exactly one crux move | The definition permits several or none | Inconsistent with the stated cardinality |
| Strategy/Tactic/Tool must be global Arsenal types | The source explicitly makes its definitions author-specific | Adoption would require a separate justified ontology decision |
| No general skill of recognizing a useful key step can exist | The inspected passages do not establish this negative claim | Not supported |

“Clears a key obstacle” remains a shared explanatory feature. A possible future operational ability such as selecting or recognizing a productive step would need a usable procedure, task scope and evidence of its own. Merely rephrasing the role as an imperative does not supply them.

The mathematical controls do not classify human insight, infer which stage is hardest for a learner, or establish that a proof has zero/one/many crux moves. Those are source observations or later research questions, not outputs of the Python script.

## Representation alternatives and provisional recommendation

| Alternative | Support | Remaining requirement |
| --- | --- | --- |
| One standalone operation named Crux Move | The term names an important action occurrence in the source | Identify an invariant reusable procedure beyond the common success role; the current examples do not supply one |
| A cross-level explanatory role attached to a concrete move | Direct definition and different worked occurrences | State how such annotation would be used and justified; no universal mechanical classifier is assumed |
| A source-local pedagogical/glossary concept | Explicit nonstandard category definitions and the mountaineering analogy | Decide later whether/how it belongs in the learner-facing representation |
| Aliases between Crux and one of the three category names | Some crux occurrences operate at that level | Occurrence overlap is insufficient; the source explicitly allows other levels |

The leading research recommendation is to preserve Crux as a contextual role hypothesis and the three level names as source-local categories. This avoids mistaking a label about a move for the move's complete operational specification. It is not a formal retirement, reclassification, final ontology or accepted canonical-card decision.

## Additional public exposure from the supporting examples

The five registered focus candidates in P08–P09 are new to the cumulative P01–P07 focus count. In addition, M2 and M3 materially read two concrete source examples associated with existing raw candidates outside the original 48-ID reservation. Under the operating amendment, record them as **public exposure**, even though this note is not a complete separate treatment of those candidates.

| Additional raw ID | Existing associated owned record, for identification only | Normalized-name cluster / complete raw membership | Public source span |
| --- | --- | --- | --- |
| `RAW-SOURCE-z-add-zero` | `E-RAW-SOURCE-z-add-zero-source` | `add zero creatively`; sole member is this raw ID | Zeitz PDF 166, printed 149 |
| `RAW-SOURCE-z-telescope-tool` | `E-RAW-SOURCE-z-telescope-tool-source` | `telescope tool`; sole member is this raw ID | Zeitz PDF 175, printed 158 |

The cluster keys follow the existing normalized-name rule, and full membership was checked across all 661 frozen raw names. These associated record IDs identify exposure; their claims are not borrowed as evidence for a formal Crux treatment or silently expanded.

The explicit reservation is now **50 raw IDs in 44 normalized-name clusters**: the unchanged Step-3 reservation of 48 IDs / 42 clusters plus these two singleton clusters. The frozen Step-3 status record is not rewritten. This appendix and the public progress index record the later exposure.

Progress counts remain **33 distinct registered focus candidates**, not 35 accepted treatments. The two supporting-example IDs are disclosed separately. No future challenge may call these examples or associated exposed candidates fresh/unseen. The original requirement to inspect cross-owner exposure conflicts and use a separately reviewed unseen-selection procedure remains; these notes do not implement such a filter or claim that every possible indirect exposure has been exhausted.

## Reproduction, remaining questions and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P08-P09-mathematical-checks.py

P09 controls passed: the exact factorization coefficient equality, 168 finite geometric-series cases with the ratio-one boundary, and 21 rational telescoping sums. They verify the example mathematics; they do not automatically validate the role interpretation. That interpretation rests on the cited definitions and source uses and still awaits independent review.

The complete registered option and all four participants have been investigated in this first author draft. Final scope/grain, representation and independent mathematical acceptance remain open. All 661 production cases remain PENDING, with zero primary dispositions and zero formal relations. No evidence record, source pin, seed, cohort, formal Calibration PASS or Gate 4 graduation is created.
