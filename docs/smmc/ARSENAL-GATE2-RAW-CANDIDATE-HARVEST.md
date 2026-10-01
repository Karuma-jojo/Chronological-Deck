# SMMC Arsenal — Gate 2 raw candidate harvest

Status: **IN PROGRESS — no merge/split/type/rank/adjudication decisions permitted**

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
- **174** source-specific book candidates from deeper inspection of the five Gate-1 canonical books;
- **450 total raw candidates**;
- **450 evidence records**;
- **9 currently reported normalized duplicate-name groups**, deliberately unresolved;
- **0 typed candidates**;
- **0 alias merges**;
- **0 adjudications**;
- **0 prerequisite edges**;
- **0 rankings**.

The metadata intentionally says `RAW-HARVEST-IN-PROGRESS`. This is not a self-declared Gate-2 pass.

## 3. Source inspection completed so far

The initial source harvest inspected actual passages/contents in all five canonical books.

### Zeitz

Inspected:
- physical PDF page 14: contents covering getting-started/other strategies and core tactics;
- physical PDF page 20: §1.2 terminology around Strategy / Tactics / Tools;
- physical PDF page 42: §2.2, which explicitly names the penultimate-step, get-your-hands-dirty, wishful-thinking, and make-it-easier strategies.

Raw source-specific candidates currently include:
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

Current raw source-specific candidates include:
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

Current raw source-specific candidates preserve those labels independently and also retain Combinatorial Proof, Counterexample, Disproving Existence Statements, Disproof by Contradiction, and Treating Similar Cases.

### Velleman

Inspected:
- physical PDF page 390: Summary of Proof Techniques.

Current raw source-specific candidates include:
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

### Source-specific book coverage

Current raw book harvest, still without adjudication:

| Canonical source | Raw source-specific candidates |
|---|---:|
| Zeitz | 62 |
| Engel | 36 |
| Hammack | 17 |
| Velleman | 19 |
| Putnam and Beyond | 40 |
| **Total** | **174** |

The counts are deliberately not interpreted as source importance. They reflect the current harvest granularity and how explicitly each source names techniques.

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

The direct official-solution concept pass now contains **30** SOURCE_FACT/NONE raw leads. It includes the earlier winding-number/perturbation/deformation ideas plus named tools and routes such as Vandermonde-matrix invertibility, Newton polygons, CRT, generating functions, recurrence relations, projective-plane methods, Gaussian integers, p-adic valuations, rational-root arguments, convex envelopes/hulls, alternating/comparison/subseries arguments, IVT, triangle-inequality sharpness, AM-GM, eigenvector reduction, bijective counting, compact-space subsequences, and geometric-series summation.

These direct source observations still do **not** build the later Battle matrix.

## 5. Non-adjudicating duplicate/orphan audit

`course/smmc/arsenal/raw-harvest-audit-v0.mjs` now reports:

- normalized duplicate-name groups without merging them;
- orphan evidence;
- candidates missing evidence;
- SOURCE_FACT records whose Source ID is outside the canonical registry;
- candidate counts by origin.

At the current 450-candidate checkpoint there are **11 duplicate-name groups**. That is expected and desirable at Gate 2.

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
- harvest metadata stays `RAW-HARVEST-IN-PROGRESS`.

## 7. What remains before Gate 2 can be reviewed for acceptance

Batch 1 is deliberately not the full harvest.

Still required:

1. continue the deeper book/index pass until each canonical source has had an explicit method/tool/strategy sweep rather than only selected-section harvesting;
2. inspect the official solution-route material for candidate *leads* that are absent even from method tags, secondary tags, bridge needs, and audit notes, while keeping any unverified occurrence as an index lead;
3. confirm every current legacy method and secondary tag has at least one research lead and no tag vanished through prettification;
4. produce a final source-by-source harvest coverage table;
5. run exact-head CI on the finished pool;
6. independent adversarial review of the finished raw pool.

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
