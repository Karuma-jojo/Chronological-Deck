# SMMC × T25 companion

This namespace adds Simon Marais Mathematics Competition preparation without changing the canonical T25 M.Stat route.

## Hard boundary

- T25 remains the 162-session M.Stat core.
- Existing T25 IDs, contracts, Aster course, compiler, Master/Guardian, extractor, generated data and clearance state are not modified by this companion.
- SMMC material may depend on T25 evidence, but SMMC completion never grants T25 clearance.
- T25 completion never automatically certifies an SMMC problem as solved.

## Canonical SMMC content taxonomy

Every SMMC problem receives exactly one primary domain:

- **S1 — Algebra + Linear Algebra**
- **S2 — Combinatorics + Discrete Mathematics**
- **S3 — Analysis + Calculus**
- **S4 — Number Theory**
- **S5 — Geometry**
- **S6 — Probability**

This six-domain layer is intentionally coarse. It answers *where the problem principally lives*, not *what every useful idea inside it is*.

## Secondary content tags

The ledger preserves compressed structure with secondary tags. The current controlled vocabulary lives in `course/smmc/schema.mjs`.

Important examples include:

`POLY LA CX FF FE INEQ CONVEX GRAPH GAME TILING REC GF CONST SEQ SERIES ASYM INT ODE FUNC MOD DIO VAL PRIME EUCLID COORD VECTOR-GEO CONVEX-GEO LATTICE POLYHEDRAL COND EXPECT INDICATOR RANDOM-WALK STOPPING RANDOM-PROCESS`.

The 2018 audit added `GF` for generating functions. That is intentionally a secondary tag rather than a seventh primary domain.

## Method layer

Methods are independent of domain. The controlled vocabulary is also in `schema.mjs`.

It includes proof architectures, structural methods, transformations, analytic methods and exploration tools such as induction, minimal counterexample, invariants, parity, symmetry, extremal reasoning, double counting, normalization, graph reformulation, recurrence reformulation, bounding, monotonicity, construction, parameterization, generating functions and exchange arguments.

## T25 overlap

Each problem is classified:

- **GREEN** — current T25 plus its existing prerequisite bridges supply the mathematical content needed to make the problem a fair unfamiliar transfer.
- **AMBER** — T25 supplies substantial prerequisites, but a bounded SMMC bridge is still required.
- **RED** — important mathematical content or contest technique lies materially outside T25 and requires an SMMC mini-route.

Overlap is about prerequisite fairness, not predicted solve probability. A GREEN SMMC problem can still be extremely hard.

## Learning objects

- **S-BRIDGE** — bounded missing content.
- **S-METHOD** — reusable problem-solving method.
- **S-XFER** — historical SMMC problem attempted unseen after prerequisites are ready.
- **S-PAPER** — sealed timed paper simulation.

## Historical problem preservation

The finite official corpus is not a disposable worksheet bank. Problems will be partitioned into development, transfer and sealed-assessment uses. Whole East A/B papers must remain sealed for later timed evidence.

## Aster compatibility

The existing T25 Aster design is the narrative model: fiction is optional, public and clue-free; it does not change the mathematical task or certify mathematical success. The SMMC companion may later add an Aster competition arc, but only as a presentation shell over frozen problem content.

No structural metaphor, character reaction, story consequence, hidden answer count or narrative hint may reveal a method during WALL. Pauses and incorrect attempts never cause story penalties.

The SMMC story layer should reuse Aster's separation of:
1. public story state;
2. frozen mathematical task;
3. private evaluator/reference material;
4. academic evidence and clearance.

It should not mechanically reuse the seven T25 episode boundaries.

## Current build status

Batches 1–9 audit the complete 88-problem official corpus through 2025: 72 East-core A/B problems and 16 C-session supplementary problems. See `RUN-LOG.md`, the year ledgers and `ledger.mjs`.


The 2019 audit added `SERIES` as a secondary content tag and `EXCHANGE-ARGUMENT` as a reusable method. Neither requires a new top-level domain.


## Stable T25 linkage

SMMC ledgers use `t25Targets` (stable audited target codes such as `A5`, `M3`, `C4`) as the authoritative crosswalk. Raw 1–162 route positions are derived from the live T25 manifest by `course/smmc/t25-crosswalk.mjs`.

This replaces the earlier raw-number linkage, which was vulnerable to semantic drift when T25 was reordered. The validator now rejects unknown target codes against the canonical 80-target T25 manifest.

The 2020 audit added `PROJECTIVE-GEO` as a secondary content tag and `BIJECTION` as a reusable method. The six primary domains remain unchanged.


## Five-year bridge synthesis

After completing 2017–2021, repeated non-T25 gaps are recorded provisionally in `docs/smmc/BRIDGE-CANDIDATES-2017-2021.md`.

No candidate is yet canonical curriculum. The 2022–2025 audit is an explicit authoring gate.

The 2021 audit added `GCD` and `FLOOR` as secondary content tags. The six primary domains remain unchanged.


## A/B/C era handling

Beginning in 2022, the official corpus contains A, B and C sessions.

For the East preparation track:
- A and B are `eastRelevant: true`;
- C is retained in the canonical official corpus but marked `eastRelevant: false` as supplementary material.

The validator enforces this distinction so official-corpus counts and East-core counts cannot silently mix.

The 2022 audit added `CEIL` as a secondary tag. No new primary domain was required.


## 2023 taxonomy result

The 2023 audit required no new primary domain, no new secondary content tag and no new method tag. Existing vocabulary was sufficient for all twelve official problems.

This is evidence in favour of keeping the six-domain backbone stable and allowing richness to live in secondary tags, method tags and bridge needs rather than proliferating top-level subjects.


## Full-corpus architecture freeze

The complete evidence synthesis is in `docs/smmc/FINAL-SYNTHESIS-2017-2025.md`.

Structured curriculum contracts live in `course/smmc/curriculum-v1.mjs` and define:
- six mandatory core bridges;
- three optional specialist modules;
- nine method modules;
- GREEN/AMBER/RED unlock behavior;
- learner/evaluator visibility rules;
- Aster anti-leak rules.

The full ledger currently validates at:
- 88 official problems;
- 72 East-core;
- 16 supplementary C;
- GREEN 39 / AMBER 27 / RED 22 overall;
- East GREEN 30 / AMBER 24 / RED 18.

The six-domain top-level taxonomy remains canonical. Per-problem primary labels on several hybrids remain under explicit reconciliation because the independently authored ledger does not yet reproduce the newer SMMC-2027 aggregate domain table. See `docs/smmc/DOMAIN-RECONCILIATION-2017-2025.md`.

Do not allocate study hours from the provisional independent primary-domain counts until that reconciliation closes. Bridge, method, prerequisite and overlap metadata are already safe to use.


## Final-engine completion scaffold

The completion spine is documented in `docs/smmc/FINAL-ENGINE-SCAFFOLD.md` and encoded in `course/smmc/engine-roadmap-v1.mjs`.

It preserves the frozen research architecture while making the unfinished work explicit:

- finish fundamental/core neutral authoring;
- map every East AMBER/RED problem to exact authored units;
- connect canonical T25 readiness and explicit SMMC certification;
- implement S-XFER attempts with durable 0-7 review;
- protect the finite official corpus with a whole-paper vault;
- implement S-PAPER only after preservation rules are enforceable.

The proposed contest-algebra `S-BRIDGE-ALG1` remains a candidate pending an exact-gap pass; it is not part of the canonical 18-module architecture yet.
