# SMMC Arsenal — Canonical Source Register v1

Status: **Gate-1 canonical source identity register — review candidate**

This file freezes the exact evidence sources used by the Gate-1 research contract. It freezes **source identity**, not the Arsenal ontology.

A same-title but different edition/file is not silently interchangeable with the artifact listed here.

## S0 — SMMC corpus snapshot

**Source ID:** `S0-SMMC-2017-2025@761023355678bc9088236e79bc12e68aa5107cb6`  
**Status:** CANONICAL  
**Repository snapshot:** merge commit `761023355678bc9088236e79bc12e68aa5107cb6`

Frozen project paths include:

- `course/smmc/ledger-2017.mjs` through `course/smmc/ledger-2025.mjs`
- `course/smmc/ledger.mjs`
- `course/smmc/schema.mjs`
- `course/smmc/sources-v1.mjs` — learner-safe official problem-paper links only
- `course/smmc/official-solution-sources-v1.mjs` — authoring-only frozen official solution identities
- `docs/smmc/FINAL-SYNTHESIS-2017-2025.md`
- `docs/smmc/ARSENAL-GATE0-CORPUS-PROTECTION.md`

### Frozen official solution artifacts

A VERIFIED historical Battle occurrence that relies on an official solution must use one of these exact artifacts, or a later independently reviewed source-register amendment.

| Year | Official solution artifact | Pages | SHA-256 |
|---|---|---:|---|
| 2017 | `smmc-2017-solutions-preliminary_1.pdf` | 12 | `c272a72239ef4c2ccd54df0702140179e0a9b85f5a9028c87d485841eb1a2c12` |
| 2018 | `smmc-2018-solutions_1.pdf` | 17 | `b19562352d09bf6fbb43974339b82c2a59c0d2276eb69f357a752772ce0f83cb` |
| 2019 | `smmc-2019-solutions_1.pdf` | 12 | `a865c3f68e9082e3cce457cb5f10a9df5f33feed16ae63c16a70f885fe59199e` |
| 2020 | `smmc-2020-solutions_1.pdf` | 28 | `d77ecfa277a693f57992ca2286c01e95f50821c02abc6ff63a41966f578f09b3` |
| 2021 | `smmc-2021-solutions.pdf` | 22 | `c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00` |
| 2022 | `smmc-2022-solutions.pdf` | 30 | `3e1670aef22b83cd2be13d027728ebed119072011e4150d7c3aa8dba3101295f` |
| 2023 | `smmc2023solutions.pdf` | 23 | `446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c` |
| 2024 | `smmc_2024_solutions.pdf` | 24 | `1566dc8c2088cbbc851f7c91d357f9c453f2d28578df7694aa9a13584a80eed2` |
| 2025 | `smmc2025_solutions.pdf` | 25 | `0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345` |

The exact official URLs and year-page identities are machine-readable in `course/smmc/official-solution-sources-v1.mjs`.

**2025 revision note:** a source inventory checked on 2026-09-28 recorded a previous 26-page official-linked 2025 booklet under a different filename/hash. Gate 1 freezes the 25-page revision currently linked by the official source at the time of this repair. The older revision is provenance history only and is not treated as byte-identical.

### Role

The frozen official SMMC problem/solution documents are primary historical sources for what actually appears in those documents.

The ledgers, tags, counts, overlap labels and synthesis documents are project-derived records.

For a VERIFIED historical Battle occurrence that relies on a solution booklet, the evidence record must identify:
- exact year/problem ID;
- exact canonical solution source/registry row;
- exact source locator;
- the canonical SHA-256 above.

The SHA-256 is mandatory, not “when practical.”

A ledger method tag alone is an index lead, not verified official occurrence.

---

## S1 — Paul Zeitz

**Source ID:** `S1-ZEITZ-2007-2E`  
**Status:** CANONICAL  
**Author:** Paul Zeitz  
**Title:** *The Art and Craft of Problem Solving*  
**Edition:** Second Edition  
**Publisher/year:** John Wiley & Sons, 2007  
**ISBN-13:** 978-0-471-78901-7  
**Canonical artifact name:** `Paul Zeitz - The art & craft of problem solving`  
**PDF pages:** 383  
**SHA-256:** `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565`

### Required Gate-1 anchors

- Chapter 1, especially §1.2, *The Three Levels of Problem Solving*
- Chapter 2, *Strategies for Investigating Problems*
- Chapter 3, *Tactics for Solving Problems*
- exact later sections when a candidate requires them

### Allowed claim roles

- source terminology
- discovery/search heuristic
- source-authored granularity distinction
- investigation/final-argument distinction
- technique-specific evidence from an inspected section

### Does not establish

- the mandatory Arsenal ontology
- a universal Strategy/Tactic/Tool taxonomy
- a mandatory representation for crux

---

## S2 — Arthur Engel

**Source ID:** `S2-ENGEL-1998`  
**Status:** CANONICAL  
**Author:** Arthur Engel  
**Title:** *Problem-Solving Strategies*  
**Publisher/year:** Springer-Verlag New York, 1998  
**ISBN:** 0-387-98219-1  
**Canonical artifact name:** `Engel-Problem-Solving Strategies.pdf`  
**PDF pages:** 401  
**SHA-256:** `abc16cf21b4389bc357246140c88422a387aceb741c539de5f5da27f954cc096`

### Required Gate-1 anchors

- Preface
- candidate-relevant chapters
- Chapter 14 when further strategies are relevant

### Allowed claim roles

- source terminology
- training-design evidence
- Great-Idea/method-family leads
- discovery heuristic evidence
- source warning about training-dependent difficulty

### Does not establish

- the project ontology
- stable absolute problem difficulty
- project learning order merely from chapter order

---

## S3 — Richard Hammack

**Source ID:** `S3-HAMMACK-BOOK-OF-PROOF-3.4`  
**Status:** CANONICAL  
**Author:** Richard Hammack  
**Title:** *Book of Proof*  
**Edition:** Third Edition; file identifies itself as Edition 3.4  
**Copyright edition year:** 2018  
**Canonical artifact name:** `Hammack-BookOfProofs.pdf`  
**PDF pages:** 380  
**SHA-256:** `e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd`

### Required Gate-1 anchors

- Introduction and its chapter dependency tree
- Chapters 4–6
- Chapter 7
- Chapter 9
- Chapter 10

### Allowed claim roles

- source terminology
- proof-technique distinctions
- proof-writing structures covered by this edition
- dependency organization **of this book**

### Does not establish

- a universal proof-architecture DAG
- a mandatory top-level Arsenal Proof Form class
- project prerequisite edges solely from chapter order

---

## S4 — Daniel J. Velleman

**Source ID:** `S4-VELLEMAN-2006-2E`  
**Status:** CANONICAL  
**Author:** Daniel J. Velleman  
**Title:** *How To Prove It: A Structured Approach*  
**Edition:** Second Edition  
**Publisher/year:** Cambridge University Press, 2006  
**ISBN-13 (hardback):** 978-0-521-86124-3  
**ISBN-13 (paperback):** 978-0-521-67599-4  
**Canonical artifact name:** `Howtoproveit_Vellemen.pdf`  
**PDF pages:** 398  
**SHA-256:** `eca0a0a955668e721df2f2e2aaf0d1e31044844a8c6e1435541c5531c863c142`

### Required Gate-1 anchors

- Preface
- Chapters 1–2
- Chapter 3
- Chapter 6

### Allowed claim roles

- source terminology
- structured-proof evidence
- logical-form-guided proof planning
- pedagogical sequence **within this edition**

### Does not establish

- a universal proof prerequisite order
- a mandatory separation of Foundation and Proof Form in the Arsenal ontology
- project learning order merely from the book's chapter sequence

---

## S5 — Razvan Gelca and Titu Andreescu

**Source ID:** `S5-GELCA-ANDREESCU-2007`  
**Status:** CANONICAL  
**Authors:** Razvan Gelca; Titu Andreescu  
**Title:** *Putnam and Beyond*  
**Publisher/year:** Springer Science+Business Media, 2007  
**ISBN-13:** 978-0-387-25765-5  
**e-ISBN-13:** 978-0-387-68445-1  
**Canonical artifact name:** `putnam-and-beyond.pdf`  
**PDF pages:** 807  
**SHA-256:** `143c74f8267984e34a6f260d1e20c51cd63e7e73c499161f85c4981e0f620fba`

### Required Gate-1 anchors

- *A Study Guide*
- Chapter 1, *Methods of Proof*
- exact later sections when a candidate requires them

### Allowed claim roles

- source training advice
- source terminology
- source treatment of proof/problem-solving methods
- candidate-specific mathematical evidence from an inspected section

### Does not establish

- mandatory project training order
- the Arsenal ontology
- a project prerequisite merely because the book recommends a study sequence

---

# Source integrity rule

Before a future builder claims to have verified a canonical book source:

1. match the Source ID;
2. match the bibliographic edition;
3. match the artifact SHA-256 when working from the canonical PDF;
4. inspect the relevant passage;
5. record a locator.

If the hash differs, the source may still be a legitimate edition, but it is **not automatically the canonical Gate-1 artifact**.

It must either:

- be treated as an unverified/source-amendment lead; or
- receive an explicit source-register amendment.

# Source-register amendment protocol

Adding or replacing a canonical source requires its own reviewed change.

The amendment must include:

- new Source ID;
- exact author/title/edition/publisher/year;
- stable URL or artifact filename;
- artifact SHA-256 where applicable;
- permitted claim roles;
- explicit limitations;
- rationale for addition/replacement;
- independent review.

Until accepted, evidence from the new source must use `evidenceBasis: SOURCE_LEAD`, `recordChannel: NONE`, and `verificationStatus: UNVERIFIED_SOURCE_LEAD`.

# Copyright hygiene

The repository should store:

- bibliographic metadata;
- hashes;
- source locators;
- short paraphrases;
- brief quotations only when genuinely necessary.

Do not copy long source passages into the repository.
