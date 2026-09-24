# SMMC bridge and method candidates — 2017–2021 evidence pass

Status: **PROVISIONAL — DO NOT AUTHOR/FREEZE YET**

Evidence base: the 40 East-relevant A/B problems from 2017–2021 currently present in the SMMC ledger.

The purpose of this document is to identify repeated gaps after five years of source-backed crosswalking. It is not a syllabus. Candidate bridges must survive the 2022–2025 audit before they become learning objects.

## Existing T25 bridges are not duplicated

T25 already has:

- `BR-I — Induction and indexed arguments`;
- `BR-N — Integers, divisibility and parity`.

Those remain prerequisite support. SMMC candidates below either extend them materially or cover content T25 does not own.

---

## High-confidence content bridge candidates

### S-BRIDGE-N1 — Contest number theory beyond BR-N

**Why it exists:** `BR-N` teaches basic integer/divisibility/parity/congruence language, but repeated SMMC problems need substantially more.

Candidate scope:
- gcd/Euclidean reasoning and prime-factor support;
- square-free structure;
- modular reduction beyond parity;
- prime residues and legal modular cancellation;
- rational-root/integer-polynomial obstructions;
- factorial/binomial divisibility;
- elementary valuations where genuinely needed;
- Diophantine normalization/descent at an introductory contest level.

Current evidence includes:
- SMMC-2017-A3;
- SMMC-2017-B2;
- SMMC-2019-A1;
- SMMC-2019-A3;
- SMMC-2019-B2;
- SMMC-2021-A2;
- SMMC-2021-B4.

**Status:** HIGH confidence.

### S-BRIDGE-G1 — Graph language and structural reductions

Candidate scope:
- vertices/edges/degrees and handshake reasoning;
- components, paths and cycles;
- trees at the level needed for contest arguments;
- 2-regular graphs as disjoint cycle unions;
- clique and support-compression language;
- graph distance and guarding/pursuit vocabulary;
- translating matrices/geometric constraints into graphs.

Current non-GREEN evidence includes:
- SMMC-2017-A1;
- SMMC-2017-B3;
- SMMC-2018-B3;
- SMMC-2019-B3;
- SMMC-2021-A3.

SMMC-2020-A1 is already GREEN and acts as evidence that once the language is available, some graph-flavoured problems become direct transfer.

**Status:** HIGH confidence.

### S-BRIDGE-A1 — Infinite series and asymptotic constructions

Candidate scope:
- positive-series comparison;
- convergence/divergence beyond geometric/telescoping series;
- alternating-series/remainder reasoning;
- block constructions for counterexamples;
- asymptotic comparison of recursively defined quantities;
- finite-to-infinite lower-bound passage with explicit justification.

Current evidence:
- SMMC-2019-A4;
- SMMC-2019-B2;
- SMMC-2020-A3.

T25 explicitly does not own general series-convergence tests, so this is a genuine addition rather than duplicated calculus.

**Status:** HIGH/MEDIUM confidence; verify against 2022–2025.

---

## Medium-confidence content bridge candidates

### S-BRIDGE-A2 — Elementary real-analysis compactness and regularity

Candidate scope:
- extrema on compact intervals;
- infimum/supremum arguments;
- nested compact-set existence;
- one-sided semicontinuity / limsup-liminf reasoning at contest depth;
- boundedness consequences of Riemann integrability;
- regularity bootstrapping from integral/averaging identities.

Current evidence:
- SMMC-2021-A4;
- SMMC-2021-B3;
- parts of SMMC-2017-A4.

This must remain elementary and problem-driven. It is **not** a measure-theory route.

**Status:** MEDIUM confidence.

### S-BRIDGE-D1 — Generating functions + elementary first-order ODE reasoning

Candidate scope:
- first-order separable/transformable ODEs;
- qualitative monotonicity/concavity of a solution;
- ordinary generating functions as formal encodings;
- convolution-to-product translation;
- simple differential equations for generating functions.

Current evidence:
- SMMC-2018-A3;
- SMMC-2018-A4.

**Status:** MEDIUM confidence. Two problems are enough to retain the candidate, not enough to author a large route.

---

## Specialist candidates — retain but do not generalise yet

### Finite fields / projective geometry

Current decisive evidence: SMMC-2020-B4.

The official route uses extension fields, cyclic multiplicative groups and a projective-plane/difference-set construction. This is clearly outside T25, but one specialist open problem is not enough evidence for a general mandatory bridge.

**Status:** HOLD.

### Structural/spatial/convex/lattice geometry

The first five years contain several geometry gaps, but they are heterogeneous:
- vector/optimization geometry;
- tetrahedral incidence;
- lattice/convex arguments;
- tilings;
- Gram/circulant structure.

Do not prematurely compress these into one giant geometry bridge.

**Status:** HOLD pending 2022–2025.

---

# Method candidates

These are not content courses. They are short reusable training objects whose examples should span multiple domains.

The counts below refer to AMBER/RED problems only in the current 2017–2021 ledger.

## S-METHOD-B — Bounding and comparison

`BOUNDING` appears on 14 current non-GREEN problems.

Train:
- identify a quantity that can be bounded;
- choose the direction that is actually useful;
- preserve strict/non-strict inequalities;
- search for equality cases;
- turn local bounds into global impossibility/existence arguments.

**Status:** HIGH confidence.

## S-METHOD-C — Construction, encoding and bijection

`CONSTRUCTION` appears on 10 current non-GREEN problems, with additional direct GREEN examples such as 2020 A2 and 2021 B2.

Train:
- explicit constructions;
- recursive constructions;
- recoverability/injectivity;
- bijective counting;
- encode a complicated process by a simpler object.

**Status:** HIGH confidence.

## S-METHOD-X — Auxiliary objects and cross-domain translation

Current non-GREEN counts:
- `AUXILIARY-OBJECT`: 11;
- `CROSS-DOMAIN`: 9;
- `GRAPH-REFORMULATION`: 3.

Train:
- replace geometry with vectors/matrices;
- replace a sparse matrix with a graph;
- replace a probability process with a recurrence;
- introduce a potential/function/invariant chosen for the desired property.

**Status:** HIGH confidence.

## S-METHOD-I — Stronger induction + invariant design

`INDUCTION` appears on 7 current non-GREEN problems, while ordinary induction is already supplied by T25's `BR-I`.

SMMC should therefore **extend**, not duplicate, BR-I:
- strengthen the induction hypothesis;
- choose the right invariant statement;
- simultaneous/structural induction where needed;
- induct on a parameter other than the one visible in the statement;
- use recurrence structure to discover the induction claim.

**Status:** HIGH confidence.

## S-METHOD-P — Lemma extraction and case architecture

Current non-GREEN counts:
- `CASE-DECOMPOSITION`: 11;
- `LEMMA-EXTRACTION`: 5.

Train:
- isolate the reusable subclaim;
- choose exhaustive, non-overlapping cases;
- prove a classification before doing computation;
- separate existence, uniqueness and sharpness.

**Status:** HIGH confidence.

## S-METHOD-E — Extremal / minimal-counterexample reasoning

Current non-GREEN evidence includes repeated `EXTREMAL` and `MINIMAL-COUNTEREXAMPLE` use, especially in graph/geometry settings.

**Status:** MEDIUM/HIGH confidence.

---

# Authoring gate

Do **not** create S-BRIDGE or S-METHOD lessons merely because the names above exist.

A candidate may be frozen only after the 2022–2025 audit if:

1. it remains supported by multiple official problems or is clearly prerequisite to a repeatedly observed family;
2. its scope is not already owned by canonical T25 or an existing T25 bridge;
3. it can be bounded tightly enough that it does not become a generic olympiad course;
4. it improves access to historical SMMC problems without leaking their solutions;
5. at least one problem can remain sealed as transfer evidence after the bridge is taught.

Until then, this document is evidence synthesis, not curriculum.
