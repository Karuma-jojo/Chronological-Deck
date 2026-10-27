# P06 — Graph family, reformulation and component reduction

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `aead2141d4666cd6514f0a4c604649e18d7dac0e`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `GRAPH_FAMILY_TRANSFORM`, its complete five-candidate option.

## Research answer

The inspected graph chapters contain several different kinds of mathematical work: defining objects, encoding another problem, proving facts about an already specified graph, and applying graph facts to a concrete task. They support treating graph theory as a subject/method family rather than identifying the entire family with one graph-reformulation operation.

The official sparse-matrix argument supplies a particularly useful separation. Encoding rows as edges does not itself perform cofactor elimination or justify a determinant product over components. A component decomposition initially gives rectangular incidence blocks; square blocks require a separate balance condition. In the official residual 2-regular situation that condition holds. In a more general square incidence matrix it can fail component by component, forcing determinant zero instead.

The bridge expression names translation **and** component decomposition, while its owned record remains a project index assertion. The graph-reformulation tag itself names an operation and an output, as Gate 3 already recognizes; its schema record still does not specify a complete input contract or intended scope. These are useful differences, not automatic final SPLIT, COMBO or alias decisions.

## Exact participants and candidate-owned evidence

| Candidate | Frozen owned record | Current evidentiary reach |
| --- | --- | --- |
| `RAW-SOURCE-e-graph-theory` — Graph Theory | `E-RAW-SOURCE-e-graph-theory-source` | Engel PDF 373, section 14.1; the area is explicitly identified and introduced |
| `RAW-SOURCE-z-graph-tactic` — Graph Theory as a Tactic | `E-RAW-SOURCE-z-graph-tactic-source` | Zeitz PDF 382, tactics index; graph theory is indexed as a tactic/topic, printed 109–120 |
| `RAW-LEGACY-graph-reformulation` — GRAPH-REFORMULATION | `E-RAW-LEGACY-graph-reformulation-schema` | Frozen project vocabulary membership; the expression names representational action, without a full usage definition |
| `RAW-BRIDGE-063` — Matrix-to-incidence-graph translation and block decomposition by components | `E-RAW-BRIDGE-063-01` | A bridge need named in the frozen 2021 A3 project entry, line 46 |
| `RAW-OFFICIAL-116` — Graph-Core Reduction by Laplace Elimination | `E-RAW-OFFICIAL-116-source` | Verified official occurrence of cofactor reduction, graph interpretation and a 2-regular core; original locator PDF 4 |

The official participant was also investigated in [P01](P01-Recast-Viewpoint-Graph-Reduction-v1.md). Its appearance here is a required comparison dependency, not a newly discovered distinct candidate. This batch adds no evidence row or final treatment.

Original records and locators remain unchanged. The new body readings and reconstructions below need owner-specific supplemental admission before stronger formal use. The official candidate's display name is the project's harvested descriptor, not a claim that the competition document christens a general method with that exact name.

## Sources inspected directly

| Source | Identity and locator | Reading used here |
| --- | --- | --- |
| `S2-ENGEL-1998` | Uploaded Problem-Solving Strategies, 401 pages; SHA-256 `abc16cf21b4389bc357246140c88422a387aceb741c539de5f5da27f954cc096` | PDF 373–374, section 14.1: graph objects, finite self-maps/permutations, and varied graph problems |
| `S1-ZEITZ-2007-2E` | Uploaded The Art and Craft of Problem Solving, 383 pages; SHA-256 `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565` | PDF 126–132, printed 109–115, section 4.1: representation, nap intervals, degree/connectivity/tree facts and an Eulerian construction; PDF 382, printed 365, tactics index |
| `S0-SMMC-SOLUTION-2021` | [Official 2021 solutions](https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2021-solutions.pdf), PDF 4–5, A3; registry pin SHA-256 `c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00`, 22 pages | The primary-site problem and solution text, including component blocks |
| `S0-PROJECT-LEDGER` | [Frozen 2021 ledger](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/ledger-2021.mjs#L37-L49) | A3 entry and exact bridgeNeeds wording; blob `e490f72cc14dab2e88860ead609ec3949b0eda57` |
| `S0-PROJECT-SCHEMA` | [Frozen schema](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/schema.mjs#L27-L38) | The GRAPH-REFORMULATION vocabulary entry, read at that exact commit during the preceding batch |

Both book byte hashes were checked again. Engel PDF 373 and Zeitz PDF 126–127 were rendered and visually inspected; the remaining listed text was read directly. The official text was reopened on the primary competition site. Its hash above is the existing frozen pin: no fresh live-binary hash or successful official-pixel inspection is claimed.

## Source observations and operation profiles

Engel introduces connectivity, trees, directed edges, degree and functional digraphs. His permutation-cycle observation requires a bijection, not merely an arbitrary self-map. The adjacent problems use different tasks and structures; the heading is not one recipe with one fixed output.

Zeitz first describes converting objects and their relations into vertices and edges. The nap example chooses **individual intervals**, not people, as vertices. The chapter then reasons inside that representation, proving degree and forest facts and discussing edge-traversal constructions. This is direct source support for distinguishing representation choice from the subsequent graph mathematics.

The official A3 solution combines row/column cofactor reductions with a loopless multigraph whose vertices are columns and whose edges are rows. Its terminal degree argument gives cycles, which support square component blocks. This is a specific determinant calculation, not a definition of all graph theory.

| Function | Input/trigger on the inspected scope | Solver action | Output and obligation |
| --- | --- | --- | --- |
| Graph vocabulary / method family | Graph objects or a problem amenable to graph reasoning | Choose among definitions, transformations and internal graph results | Many possible outputs; the family label alone is not a single executable move |
| Graph reformulation | Objects and a relation relevant to the target | Specify vertices, edges, labels, multiplicities/directions as needed, and the inference bridge | A graph plus a justified relationship between its properties and the original goal |
| Reasoning inside a graph | A graph already specified, with hypotheses for a theorem | Apply or prove a degree, cycle, connectivity or traversal fact | A graph conclusion; no fresh cross-domain translation is logically required |
| Incidence component decomposition | A correctly encoded matrix/graph and its connected components | Group rows/columns and inspect each block's dimensions | Rectangular blocks in general; a signed product of determinants only when the relevant blocks are square |
| Official core reduction | The sparse binary matrix and available zero/unit rows or columns | Use cofactor identities and the residual degree count | Zero, an exhausted case, or cycle-block data with determinant bookkeeping |

This profile preserves the accepted Gate-3 distinction: the legacy graph expression has a named action/output, and the bridge is already diagnosed as bundled. It does not erase those facts by calling every project record opaque. It also does not turn the diagnoses into automatic Gate-4 dispositions.

## Mathematical reconstruction and attempted falsifiers

### M1. Internal graph facts require hypotheses even after a successful encoding

For a finite undirected graph, count vertex-edge incidences. Each edge contributes two incidences, so $\sum_v d(v)=2e$. A finite tree with $v$ vertices has $v-1$ edges: a longest path provides a leaf when $v\ge2$; removing it leaves a smaller tree, giving induction, with the one-vertex tree as the initial case.

A forest with $k$ components therefore has $e=v-k$. Since a nonempty finite graph has $k\ge1$, $e\ge v$ implies a cycle. This is reasoning about an already given graph; it does not select an encoding for an external problem.

For Engel's finite permutation digraph, each vertex has exactly one incoming and one outgoing edge. Iteration is eventually repetitive, and injectivity excludes a tail entering a cycle. Thus every vertex lies on a directed cycle. Our original boundary self-map $f(0)=f(1)=1$ instead has a tail $0\to1$ and the fixed point $1\to1$: outdegree one alone is insufficient.

The script checks all 1,099 simple labeled graphs on 1–5 vertices against the degree/forest implications, and all 288 self-maps on 1–4 points. Exactly 33 of the latter are permutations, and exactly those have every vertex on a cycle. General arguments above establish the claims; these finite controls do not prove them by sampling.

### M2. The nap example needs its representation-to-time bridge

Here is an author reconstruction of the source example, using positive-length open nap intervals and interpreting an edge as positive overlap.

Five people, each with two disjoint naps, give ten interval vertices. Each pair of people supplies at least one overlap edge. The ten distinct person pairs supply distinct edges, so $e\ge10=v$. The forest bound gives a cycle.

That abstract cycle is not yet the desired simultaneous event. On the cycle choose an interval $I$ with the largest left endpoint $a$. Its two cycle neighbors have left endpoints at most $a$ and right endpoints strictly greater than $a$, because they overlap $I$. A time strictly between $a$ and the minimum of these three right endpoints belongs to all three intervals. Since two naps of one person are disjoint, these are three different people.

This proves the missing bridge for a cycle of any finite length. In contrast, an abstract four-cycle has $e=v$ but no triangle: “cycle exists” does not imply “three vertices are pairwise adjacent” in arbitrary graphs. The interval structure is doing additional work.

Choosing people instead of naps as vertices can also discard essential information. Our original three-person schedules

$$
A:(0,1)\cup(4,5),\quad
B:(0,1)\cup(2,3),\quad
C:(2,3)\cup(4,5)
$$

are pairwise overlapping, yet have no common time. This refutes a generic inference from a triangle of pairwise person-overlaps to simultaneous presence. It does not refute the five-person source theorem: its hypotheses and interval-count argument are different.

The script exhausts 10,000 ordered four-interval families drawn from endpoints $0,\ldots,4$. Of these, 3,226 have the four required positive-overlap edges; the largest-left-endpoint argument produces a strict common overlap for the selected triple in every case. It also verifies the abstract four-cycle and the three-person boundary controls.

### M3. Component separation is not automatically a determinant factorization

Let $B$ be an $n\times n$ binary matrix with exactly two ones in each row. Its row $i$ specifies an edge between its two distinct column vertices. Preserve row identities, parallel edges and column identities.

For graph component $j$, let $r_j$ be its number of edges and $c_j$ its number of vertices. Grouping the associated rows and columns gives a block supported on an $r_j\times c_j$ rectangle, with zero entries between different components. Globally $\sum_j r_j=\sum_j c_j=n$; this does not imply $r_j=c_j$ for each component.

If some component is unbalanced,

$$
\operatorname{rank} B
\le\sum_j\min(r_j,c_j)
=n-\frac12\sum_j|r_j-c_j|<n.
$$

Hence $\det B=0$. This argument does not assign a determinant to a rectangular block.

If every component is balanced, the grouped blocks $B_j$ are square. Let $\rho,\kappa$ be the row/column grouping orders. Then

$$
\det B
=\operatorname{sgn}(\rho)\operatorname{sgn}(\kappa)
\prod_j\det B_j.
$$

The signs remain necessary for the signed determinant even though components determine a magnitude factorization.

Our original boundary matrix is

$$
B=
\begin{pmatrix}
1&1&0&0&0\\
0&1&1&0&0\\
0&0&0&1&1\\
0&0&0&1&1\\
0&0&0&1&1
\end{pmatrix}.
$$

Its components have shapes $2\times3$ and $3\times2$. It is globally square, but the component balance fails and its determinant is zero. Thus translation plus finding components is not sufficient justification for multiplying square-block determinants.

In the official terminal core, every vertex has degree at least two and $e=v$. The degree sum forces every degree to equal two, so each connected component is a cycle and has the same number of edges and vertices. This supplies the missing square-block hypothesis in that situation. Merely requiring minimum degree two, without $e=v$, would not suffice; for example, $K_4$ has every degree three.

The new script checks all 1,324 ordered loopless edge-incidence matrices with $e=v=n$ for $n=2,3,4$: 345 have an unbalanced component and determinant zero; 979 are balanced and satisfy the signed product formula, including 294 with nonzero determinant. The determinant oracle is direct Leibniz expansion, independent of the component computation.

This finite input subclass overlaps P01's earlier enumeration. These are new **component-factorization checks**, not 1,324 additional unseen or statistically independent calibration cases. P01's note and reduction script are unchanged and were not rerun for a new acceptance claim.

### M4. Translation, reduction and a broader family cannot be identified by one output

M1 supplies operations inside a graph without changing the representation. M2 supplies an encoding whose usefulness depends on a proved bridge to the original time problem. M3 supplies extra algebra after encoding; it can terminate at zero rather than a nonzero cycle product.

These separate tasks falsify an undifferentiated operational profile that says every graph-theory use is just graph reformulation. They also falsify the claim that finding connected components automatically completes the official determinant calculation. They do not prove that two source headings about the broad subject have different full intended domains, nor that a multi-step proof must become a compound Arsenal card.

## Alternatives and research recommendations

| Comparison | Serious alternatives | Bounded finding |
| --- | --- | --- |
| Engel / Zeitz graph headings | Same broad method family; distinct instructional organization; different eventual family boundaries | Both contain vocabulary, representations and internal graph reasoning. Neither inspected heading specifies one universal operation; full family aliasing is still a scope question |
| Graph family / GRAPH-REFORMULATION | A move within a broad family; one useful emphasis; excessive aliasing | Internal graph proofs and cross-domain encoding have different local tasks. The tag names the latter but its project usage is not fully defined by the schema |
| Bridge translation / component decomposition | Coupled submoves; one planned bridge lesson; a compound at some chosen grain | The expression explicitly names both, and M3 exposes their separate obligations. This is grounds to investigate component ownership, not an automatic SPLIT/COMBO |
| Bridge / official core reduction | Related preparation and application; partial overlap; different intended operational scope | The official residual condition justifies cycle blocks. The bridge's index provenance does not inherit the official proof or prescribe all cofactor reductions |
| Official operation / general reformulation | A concrete workflow using a representation; excessive whole-workflow aliasing | Encoding does not itself execute determinant-preserving elimination or factorization. A candidate-level containment relation needs a fully stated scope on both sides |

The provisional recommendation is to preserve the family/move/application distinction and require an explicit input dictionary and inference bridge in any future graph-reformulation profile. For component-based determinant use, record the balance or zero-determinant branch rather than assuming every connected component supplies a square determinant factor.

## Reproduction, remaining questions and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P06-P07-mathematical-checks.py

P06 controls passed with the counts stated above. The first author draft covers the complete registered option and all five participants. Independent review, final family scope/grain and stronger owner-specific evidence admission remain open. The project bridge does not become an official occurrence, and no canonical component handle is created.

No production source record, Gate-3 measurement, candidate primary or formal relation changes. All 661 production cases remain PENDING. Formal Calibration PASS and Gate 4 graduation remain pending.
