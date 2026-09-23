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

`POLY LA CX FF FE INEQ CONVEX GRAPH GAME TILING REC GF CONST SEQ ASYM INT ODE FUNC MOD DIO VAL PRIME EUCLID COORD VECTOR-GEO CONVEX-GEO LATTICE POLYHEDRAL COND EXPECT INDICATOR RANDOM-WALK STOPPING RANDOM-PROCESS`.

The 2018 audit added `GF` for generating functions. That is intentionally a secondary tag rather than a seventh primary domain.

## Method layer

Methods are independent of domain. The controlled vocabulary is also in `schema.mjs`.

It includes proof architectures, structural methods, transformations, analytic methods and exploration tools such as induction, minimal counterexample, invariants, parity, symmetry, extremal reasoning, double counting, normalization, graph reformulation, recurrence reformulation, bounding, monotonicity, construction, parameterization and generating functions.

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

Batches 1–2 establish the taxonomy/schema and audit all 16 East-relevant problems from 2017–2018. See `RUN-LOG.md`, `ledger-2017.mjs`, `ledger-2018.mjs` and `ledger.mjs`.
