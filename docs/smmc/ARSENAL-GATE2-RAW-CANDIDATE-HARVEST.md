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

Current Batch-1 inventory:

- **44** current `SMMC_METHOD_TAGS`, each preserved verbatim as a separate `PROJECT_DERIVED + NONE + INDEX_SIGNAL` retrieval lead;
- **55** source-specific book candidates from the five Gate-1 canonical books;
- **99 total raw candidates**;
- **99 evidence records**;
- **0 typed candidates**;
- **0 alias merges**;
- **0 adjudications**;
- **0 prerequisite edges**;
- **0 rankings**.

The metadata intentionally says `RAW-HARVEST-IN-PROGRESS`. This is not a self-declared Gate-2 pass.

## 3. Batch-1 source inspection

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

Current raw source-specific candidates:
- Invariance Principle;
- Coloring Proofs;
- Extremal Principle;
- Box Principle;
- Induction Principle;
- Working Backwards.

### Hammack

Inspected:
- physical PDF page 5: proof-structure contents for Direct, Cases, Contrapositive, Contradiction, iff, existence/uniqueness, constructive/non-constructive proof, induction, strong induction, and smallest counterexample.

Current raw source-specific candidates preserve those labels independently.

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
- Strong Induction.

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

These are raw candidate leads only. A named theorem/inequality may later fail the Gate-3 granularity test; Gate 2 intentionally does not decide that.

## 4. Batch-1 invariants

The authoring validator must enforce:

- all 44 current method tags are represented exactly once as legacy raw candidates;
- every evidence record passes Gate-1 evidence validation;
- every candidate has `ontologyType: null`;
- aliases remain empty;
- adjudication/rank/rarity/prerequisite/relation fields remain null;
- candidate IDs and evidence IDs are unique;
- every candidate evidence reference resolves;
- harvest metadata stays `RAW-HARVEST-IN-PROGRESS`.

## 5. What remains before Gate 2 can be reviewed for acceptance

Batch 1 is deliberately not the full harvest.

Still required:

1. inspect deeper relevant sections/index material across all five books for plausible candidates not captured by the first contents/summary pass;
2. harvest additional source-specific aliases/names without merging them;
3. audit the complete 88-row ledger for candidate concepts that may be present in solution descriptions or current project metadata but absent from `SMMC_METHOD_TAGS`;
4. confirm every current legacy method tag has at least one research lead and no tag vanished through prettification;
5. run a duplicate-name report **without resolving the duplicates**;
6. run a missing-source / orphan-evidence report;
7. independent adversarial review of the finished raw pool.

## 6. Gate boundary

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
