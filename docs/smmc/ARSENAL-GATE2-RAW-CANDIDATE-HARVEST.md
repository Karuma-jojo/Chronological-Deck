# SMMC Arsenal — Gate 2 raw candidate harvest

Status: **REVIEW CANDIDATE — independent acceptance required; no merge/split/type/rank/adjudication decisions permitted**

Accepted predecessor:
- Gate 0 merged;
- Gate 1 independently accepted on `3052b8c53dd9e8bd598f51bc8423470086776625`;
- Gate 1 merged to `main` as `1a485cf7a2c495ab717cadee60a7762d96994f34`.

## 1. Gate-2 purpose

Gate 2 collects plausible Arsenal candidate concepts **before** any granularity tribunal.

The job is intentionally inclusive:

- preserve every existing SMMC method tag;
- preserve source-specific terminology even when two names look synonymous;
- add plausible book-derived problem-solving/proof candidates;
- attach auditable Gate-1 evidence;
- keep `ontologyType: null`;
- do not merge, split, rank, prerequisite-link, parent/child-link, or adjudicate.

This gate is allowed to be redundant. Redundancy is safer than premature collapse.

## 2. Current raw harvest implementation

Canonical working file:

`course/smmc/arsenal/candidates-v0.mjs`

Current expanded harvest inventory:

- **44** current `SMMC_METHOD_TAGS`, each preserved verbatim as a separate `PROJECT_DERIVED + NONE + INDEX_SIGNAL` retrieval lead;
- **39** current `SMMC_SECONDARY_TAGS`, preserved separately so tool/topic/specialist possibilities are not lost;
- **129** distinct ledger `bridgeNeeds` harvested across all **88** official 2017–2025 problem rows as raw project-index leads;
- **34** additional problem-specific route leads curated from the complete 88-row `auditNote` pass;
- **280** source-specific book candidates from the five Gate-1 canonical books after the systematic closure pass;
- **653 total raw candidates**;
- **653 evidence records**;
- **0 typed candidates**;
- **0 alias merges**;
- **0 adjudications**;
- **0 prerequisite edges**;
- **0 rankings**.

The metadata says `RAW-HARVEST-REVIEW-CANDIDATE`. This means the harvest is ready to be attacked; it is **not** a self-declared Gate-2 pass.

## 3. Source inspection completed so far

The initial source harvest inspected actual passages/contents in all five canonical books.

### Zeitz

Inspected:
- physical PDF page 14: contents covering getting-started/other strategies and core tactics;
- physical PDF page 20: §1.2 terminology around Strategy / Tactics / Tools;
- physical PDF page 42: §2.2, which explicitly names the penultimate-step, get-your-hands-dirty, wishful-thinking, and make-it-easier strategies.

Representative raw source-specific candidates include:
- Orientation;
- Penultimate Step;
- Get Your Hands Dirty;
- Wishful Thinking;
- Make It Easier;
- Draw a Picture;
- Recast the Problem in Other Ways;
- Change Your Point of View;
- Symmetry;
- Extreme Principle;
- Pigeonhole Principle;
- Invariants;
- Parity;
- Modular Arithmetic and Coloring;
- Monovariants.

These are source-specific rows. They are not merged with same-looking legacy tags.

### Engel

Inspected:
- physical PDF page 5: contents with Invariance, Coloring, Extremal, Box, Induction and other major chapters;
- physical PDF page 377: §14.3 Working Backwards, including Engel's explicit low-branching description and relation to descent.

Representative raw source-specific candidates include:
- Invariance Principle;
- Coloring Proofs;
- Extremal Principle;
- Box Principle;
- Induction Principle;
- Working Backwards;
- Greedy Algorithm;
- Divide and Conquer;
- Sum Rule;
- Product Rule;
- Product-Sum Rule;
- Counting by Bijection;
- Count the Same Objects in Two Different Ways;
- Infinite Descent;
- Conjugate Numbers.

### Hammack

Inspected:
- physical PDF page 5: proof-structure contents for Direct, Cases, Contrapositive, Contradiction, iff, existence/uniqueness, constructive/non-constructive proof, induction, strong induction, and smallest counterexample.

The source-specific harvest preserves those labels independently and also retains Combinatorial Proof, Counterexample, Disproving Existence Statements, Disproof by Contradiction, Treating Similar Cases, explicit set-proof structures, and counting principles.

### Velleman

Inspected:
- physical PDF page 390: Summary of Proof Techniques.

Representative raw source-specific candidates include:
- Reexpress a Negative Goal;
- Proof by Contradiction;
- Direct Conditional Proof;
- Contrapositive Proof;
- Split a Conjunction Goal;
- Prove a Disjunction;
- Proof by Cases;
- Biconditional Proof;
- Arbitrary Object for a Universal Goal;
- Existence Witness;
- Mathematical Induction;
- Strong Induction;
- Modus Ponens;
- Modus Tollens;
- Existential Instantiation;
- Universal Instantiation;
- Disjunctive Syllogism.

### Putnam and Beyond

Inspected the frozen PDF contents and chapter-start material. The current Batch-1 rows use physical PDF page 6 for source terminology such as:
- Argument by Contradiction;
- Mathematical Induction;
- Pigeonhole Principle;
- Ordered Sets and Extremal Elements;
- Invariants and Semi-Invariants;
- Algebraic Identities;
- Cauchy–Schwarz;
- Triangle Inequality;
- AM–GM;
- Viète's Relations.

The Putnam harvest has also expanded into Search for a Pattern, telescoping, convex functions, functional equations, trigonometric substitution, infinite descent, factorization/divisibility, CRT, generating functions, counting strategies, inclusion–exclusion, and probability-relation methods.

These are raw candidate leads only. A named theorem/inequality/topic may later fail the Gate-3 granularity test; Gate 2 intentionally does not decide that.

### Explicit meta / discovery terms retained

The deeper pass also preserves terms that are easy to lose if the harvest only looks for named techniques:

- Zeitz: `Strategy`, `Tactic`, `Tool`, `Crux Move`, `Problem Investigation`, `Numerical Experimentation`;
- Velleman: `Analyze the Logical Form of the Goal`, `Expand Definitions to Expose Logical Form`;
- Engel: `Great Ideas`.

These are especially important because Gate 1 deliberately refused to pre-decide whether such concepts become ontology classes, cards, events, annotations, or are rejected later. Gate 2 therefore keeps them as raw candidates with `ontologyType: null`.

### Independent coverage repair after the first review candidate

An independent Gate-2 coverage attack found that the 477-row review candidate was still missing explicit source-specific leads. The repair added **54** raw book rows without changing any Gate-2 semantics:

- **17 Zeitz** index-level discovery/proof/specialist leads, including Look for Patterns, Brainstorming, Restating a Problem, Backward Induction, Area as a Proof Tactic, Euclidean Algorithm, Möbius Inversion, Pick's Theorem, Well-Ordering, Homothety, and Inversion;
- **6 Engel** indexed algorithm/encoding/recurrence leads, including Euclidean Algorithm, Involution, Prüfer Code, Difference Equations, Cayley's Formula, and Binet's Formula;
- **8 Hammack** explicit proof/counting headings, including logical inference, counting principles, and the source's set-membership/subset/set-equality proof structures;
- **6 Velleman** explicit goal/given transformations from the Summary of Proof Techniques, including unique-existence handling and splitting conjunction/biconditional givens;
- **17 Putnam and Beyond** substantive named TOC sections omitted by the first broad sweep, including matrix operations, groups/rings, series/continuity/integration, differential-equation techniques, conics, higher-dimensional coordinate geometry, prime numbers, set combinatorics, and binomial/counting methods.

These additions are **coverage repairs only**. They do not decide whether any of the new rows survive Gate 3, merge with existing rows, become prerequisites, or receive any ontology type.

### Source-specific book coverage

Current raw book harvest, still without adjudication:

| Canonical source | Raw source-specific candidates |
|---|---:|
| Zeitz | 94 |
| Engel | 46 |
| Hammack | 30 |
| Velleman | 26 |
| Putnam and Beyond | 84 |
| **Total** | **280** |

The counts are deliberately not interpreted as source importance. They reflect the current harvest granularity and how explicitly each source names techniques.

### Complete Putnam TOC inspection

The Putnam-and-Beyond harvest now also preserves named candidates from the full table of contents where they plausibly represent reusable contest tools or specialist methods: Sturm's Principle, polynomial-derivative and irreducibility methods, Chebyshev polynomials, matrix inversion, linear systems and bases, Cayley-Hamilton, Perron-Frobenius, Mean Value Theorem, Riemann sums, integral inequalities, Stokes-type methods, higher-order ODEs, vector/coordinate geometry, Fermat/Wilson, linear Diophantine equations, planar-graph Euler formula, and related items.

These remain raw candidates. Their inclusion does not claim that every named theorem deserves a final Arsenal card.

## 4. Corpus-wide structured harvest

The full 88-row project ledger has now been swept in three independent structured ways:

1. all 44 method tags;
2. all 39 secondary tags;
3. all 129 nonempty `bridgeNeeds`.

A separate manual pass over all 88 `auditNote` fields added 34 route leads that risk disappearing in a tag-only harvest, including examples such as adjacent-swap optimality, subset encoding, membership-bit encoding, half-total vector centering, information-state counting, invariance under squaring, first-step decomposition, polynomial identity from infinitely many values, roots-of-unity/cosine parametrization, and mod-2 normal-form reduction.

All of those remain `PROJECT_DERIVED + NONE + INDEX_SIGNAL`. They are **not** claimed as verified historical Battle occurrences.

## 5. Official-solution route-diversity sweep

The exact frozen 2017–2025 solution booklets were also parsed structurally.

`course/smmc/arsenal/official-solution-route-index-v0.mjs` records a **lower bound** on route diversity from explicit `Solution`, `Solution N`, and `Solution via ...` headings:

- **88** historical problems indexed;
- **132** explicitly labelled solution sections;
- **32** problems with more than one explicitly labelled route;
- **2** problems with no labelled solution section in the booklet: 2017 B4 and 2018 B4.

This is intentionally not treated as “132 methods.” A single labelled solution may contain several moves, and multiple labelled solutions may share most of their mathematics.

The direct official-solution concept pass now contains **127** SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE raw leads. It includes the earlier winding-number/perturbation/deformation ideas plus named tools and routes such as Vandermonde-matrix invertibility, Newton polygons, CRT, generating functions, recurrence relations, projective-plane methods, Gaussian integers, p-adic valuations, rational-root arguments, convex envelopes/hulls, alternating/comparison/subseries arguments, IVT, triangle-inequality sharpness, AM-GM, eigenvector reduction, bijective counting, compact-space subsequences, and geometric-series summation.

These direct source observations are verified historical Battle occurrences under the Gate-1 contract. They still do **not** constitute the later completed Battle matrix: Gate 2 does not create co-occurrence edges, frequencies, rankings, ontology types, or learning-order conclusions.



### Deep official-solution coverage repair

A second independent pass over the frozen official 2017–2025 solution booklets found that the first 30 direct source rows were still far too selective for a raw-ore gate. It added **72** additional verified official-occurrence candidates, bringing the direct official-solution harvest to **102**.

The new source-grounded rows preserve reusable moves that were explicit in the official prose but easy to lose in a tag/bridge-only sweep. Examples include potential-function/gradient reformulation, hidden sum-of-squares and covariance representations, adjacent-swap improvement, support compression to a clique, recoverability and subset encoding, recursive-infimum reasoning, finite-field quotient/difference-set constructions, prime-divisibility recurrence invariants, nested compact sets, moving-average regularity, multiplicative orders modulo prime powers, unique-lowest-valuation arguments, P/N and Sprague–Grundy game reductions, roots-of-unity filters, direct-sum basis construction, ternary forced-pair recursion, Frobenius/UFD finite-field moves, binary no-carry counting, first-step decomposition, finite-field rank-nullity counting, root interlacing, Jordan-form dilation arguments, Vandermonde-factor forcing, and piecewise-linear parity induction.

These 72 additions are still raw candidates only. They do not establish final granularity, type, importance, prerequisite status, historical Battle annotations, or learning order. The earlier 531-row checkpoint is superseded; this repaired checkpoint contained **603 candidates / 603 evidence records** and was subsequently superseded by the stabilization pass below.



### Official-solution stabilization pass

A third bounded pass concentrated on historical problems that still had no direct official-solution raw lead after the 603-row checkpoint. It added **24** further verified official-occurrence rows, bringing the official-solution harvest to **126** and the complete Gate-2 pool to **627 candidates / 627 evidence records**.

The pass deliberately targeted source-specific moves that were not adequately represented by broad method tags alone: forcing forks in finite games, reciprocal self-bounds for divergent partial sums, alternating subset-sign cancellation, determinant-preserving row replacement, local-replacement closure of constructions, discriminant-robust strategies, concavity and infimum/tangent contradictions in an ODE route, radical approximation from rational density, graph-distance pursuit phases, graph-core reduction by Laplace elimination, cycle-block determinant factorization, elementwise membership-pattern factorization, inverse-graph area symmetry, attracting invariant strips for discrete maps, conditional hitting-probability bounds, cyclic order reduction, root-orbit factorization, interval divisibility collisions, and four-step balancing induction.

A problem-by-problem coverage check now finds direct official-source leads on **75 of the 88** frozen historical problems. The remaining uncovered problems are not being force-filled merely to reach 88/88: they are dominated by ordinary applications already represented elsewhere in the raw pool or by the two historical open-problem slots whose frozen booklets do not contain a labelled full solution. This is a coverage observation only, not a Gate-3 merge/granularity decision.



### Final one-row gap repair

The stabilization review then identified one remaining official move worth preserving independently rather than leaving implicit under generic parity/number-theory tags: the **modulo-4 square obstruction for two odd primes** in 2017-B2. That exact verified historical occurrence was added as one further official-source row.

The official-solution stabilization checkpoint therefore contained **127 direct official-solution rows** and **628 total candidates / 628 evidence records** before the final Zeitz source repair described below. Direct official-source candidate coverage now reaches **76 of 88** frozen historical problems. The remaining 12 were inspected but are not being force-filled merely to manufacture 88/88 symmetry; two are the historical open-problem slots without labelled full solutions, while the others do not currently expose a materially new reusable move beyond raw candidates already harvested elsewhere.



### Independent-review repairs G2-R01–G2-R03

The first independent review of the old 477-row head identified three real defects. The repaired Gate-2 candidate now resolves them as follows:

- **G2-R01 — evidence semantics:** direct official-solution rows no longer park verified historical-use claims under SOURCE_FACT + NONE + OTHER. All **127** direct solution observations are now SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE, each bound to exactly one historical problem and exact frozen official source/hash/page locator. The authoring validator now asserts this tuple for every direct official-solution evidence record. This records verified occurrence only; it does not build co-occurrence, ranking, ontology, prerequisites, or the later completed Battle matrix.
- **G2-R02 — book-source omissions:** the follow-up source pass added the reviewer's missing Zeitz terms and continued through the source's explicit strategy/tactic/tool/index vocabulary. The final bounded repair adds **Average Principle**, **Algorithmic Proof**, and **Repeated Bisection Method**; earlier repair commits had already added **Symmetry-Product Principle**, **Euclidean Algorithm**, **Bisection Method**, and **Well-Ordering Principle**. Zeitz now contributes **82** source-specific rows, and the five-book total is **258**.
- **G2-R03 — documentation drift:** the Gate-2 invariant is synchronized to RAW-HARVEST-REVIEW-CANDIDATE; the obsolete RAW-HARVEST-IN-PROGRESS wording is gone.

For source-saturation purposes, the bounded inclusion rule is: preserve source-specific terms explicitly presented by the source as a strategy, tactic, tool, principle, method, algorithm/proof style, or structured proof move; also preserve named specialist methods from the designated TOC/index/summary zones when they are plausible contest-solving machinery. Same-looking terms remain separate. This is a raw-harvest rule only, not a claim that every preserved term deserves a final Arsenal card. The reviewed decision set is now stored in `course/smmc/arsenal/source-closure-manifest-v0.mjs`, and the authoring validator requires the canonical-book candidate IDs to match that manifest exactly.

After the first R01–R03 repair checkpoint the pool was **631 candidates / 631 evidence records**. That checkpoint was not accepted because the independent follow-up kept G2-R02 open; the systematic closure pass below supersedes it.


### Systematic source-saturation closure after independent follow-up

The independent follow-up on `5f4ffc2d4bc93f960ac32ce358267283bf8f709b` closed G2-R01 and G2-R03 but correctly kept **G2-R02** open: the positive sentinel list did not prove that the declared source-harvest rule had actually been exhausted.

Gate 2 therefore performed one bounded source-closure pass across the designated zones for **all five canonical books**, and recorded the result in:

`course/smmc/arsenal/source-closure-manifest-v0.mjs`

The manifest has three auditable parts:

1. the exact source zones reviewed;
2. the exact **HARVEST** candidate-ID set;
3. explicit **EXCLUDE** decisions with PDF page, section, and a short reason.

The validator now requires exact set equality between the **280 canonical-book raw candidates** and the manifest HARVEST set. It also checks every closure zone and exclusion against the canonical frozen PDF page bounds, rejects duplicate decisions, requires substantive exclusion reasons, and guards against a term being both HARVEST and EXCLUDE.

This closure pass naturally recovered the independent reviewer's four examples:

- Engel — **Graph Theory**;
- Engel — **Get Rid of Floor and Ceiling Brackets**;
- Hammack — **Combining Techniques**;
- Hammack — **Equivalent Statements**.

It also recovered further items exposed by the same rule rather than stopping at those four:

- Zeitz — **Mental Toughness**, **Creativity**, **Argument by Contradiction**, **Mathematical Induction**, **Crossover Tactic**, **Division Algorithm**, **Combinatorial Proof**, **Rigid Motions and Vectors**, **Translation**, **Glide Reflection**, **Rotation**, and **Logarithmic Differentiation**;
- Engel — **Equations, Functions, and Iterations** and **Integer Functions** in the chapter explicitly titled *Further Strategies*;
- Hammack — **Proving Statements with Contradiction**, **Proving Conditional Statements by Contradiction**, and **Existence-and-Uniqueness Proof** in addition to the two reviewer examples;
- Velleman — **Instantiate a Unique-Existence Given** from the complete Summary of Proof Techniques.

The manifest also records explicit bounded exclusions for organizational umbrellas, generic problem buckets, software-specific scaffolding, subject/example headings without an independent move, and implementation details subordinate to an already harvested named method. Those exclusions are **Gate-2 source-qualification decisions only**; they are not ontology, granularity, importance, ranking, or prerequisite judgments.

Current source counts after closure:

| Canonical book | Raw source candidates |
| --- | ---: |
| Zeitz | 94 |
| Engel | 46 |
| Hammack | 30 |
| Velleman | 26 |
| Putnam and Beyond | 84 |
| **Total** | **280** |

Current complete Gate-2 pool after this closure pass is **653 candidates / 653 evidence records**:

- 44 method-tag leads;
- 39 secondary-tag leads;
- 129 bridgeNeed leads;
- 34 project-derived audit-note route leads;
- 127 verified official historical occurrences;
- 280 canonical-book source leads.

Gate 2 remains **REVIEW CANDIDATE** until a fresh independent reviewer accepts the new exact head. Gate 3 remains closed.

## 5. Non-adjudicating duplicate/orphan audit

`course/smmc/arsenal/raw-harvest-audit-v0.mjs` now reports:

- normalized duplicate-name groups without merging them;
- orphan evidence;
- candidates missing evidence;
- SOURCE_FACT records whose Source ID is outside the canonical registry;
- candidate counts by origin.

The audit reports normalized duplicate-name groups dynamically. Their exact count is not frozen as a quality target; collisions are expected and desirable at Gate 2, and they must remain unresolved.

The validator requires:
- zero orphan evidence;
- zero candidates with missing evidence;
- zero unknown canonical SOURCE_FACT IDs;
- duplicate groups to remain visible rather than silently collapsed.

## 6. Gate-2 invariants

The authoring validator must enforce:

- all 44 current method tags are represented exactly once as legacy raw candidates;
- every evidence record passes Gate-1 evidence validation;
- every candidate has `ontologyType: null`;
- aliases remain empty;
- adjudication/rank/rarity/prerequisite/relation fields remain null;
- candidate IDs and evidence IDs are unique;
- every candidate evidence reference resolves;
- harvest metadata stays `RAW-HARVEST-REVIEW-CANDIDATE`.

## 7. Independent review contract

The raw pool is now a review candidate, not an accepted ontology.

The reviewer should attack at least these questions:

1. **Coverage:** did any current method tag, secondary tag, ledger bridge need, or recurring problem-specific route disappear?
2. **Book blind spots:** does the reviewed source-closure manifest still omit an obvious item satisfying its own bounded inclusion rule?
3. **Solution blind spots:** do the official solution booklets contain recurring or structurally important methods absent from the 653-row raw pool?
4. **Premature merging:** were any same-looking source terms silently collapsed instead of preserved separately?
5. **Premature ontology:** is any candidate typed, ranked, parented, prerequisite-linked, or adjudicated?
6. **Evidence honesty:** does every row use the Gate-1 basis/channel/claim-kind contract correctly?
7. **Battle leakage:** did project tags, bridge notes, or audit notes become historical Battle evidence without exact official verification?
8. **Source integrity:** do all SOURCE_FACT rows resolve to canonical Source IDs, hashes and in-bounds locators?
9. **Duplicate preservation:** does the duplicate report surface collisions without resolving them?
10. **Route diversity:** does the structural 88-problem/132-labelled-solution index remain a lower bound rather than being misread as a method count?
11. **Gate leakage:** did any Gate-3 granularity rule, candidate tribunal, ontology decision, ranking, prerequisite DAG, combo graph, Forge, Boss or Arena work sneak in?

Any accepted review must bind to an exact SHA. Any repair changes that SHA and requires re-review.

## 8. Gate boundary

Gate 2 must not answer:

- Which candidates are the same?
- Which candidates should split?
- What ontology type is correct?
- Which is parent/child?
- Which is more important?
- Which should be learned first?
- Which pair is a true combo?
- Which prerequisites are hard/soft?

Those belong to later gates.

**STOP:** Gate 3 remains closed until Gate 2 is complete and independently accepted.
