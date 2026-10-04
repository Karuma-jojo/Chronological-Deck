# SMMC Arsenal — Gate 3 mass-pass report

Status: **MASS-PASS REVIEW CANDIDATE — Gate 3 is not yet accepted or complete**

Accepted ruler:
- independent calibration acceptance SHA: `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`
- accepted Gate-2 SHA: `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`
- Gate-2 merge SHA: `7600dd377192aafe6ca777636d94474736ea4e4f`

This report records the completed application of the accepted Gate-3 ruler to all **661** accepted Gate-2 raw candidates. It is a graduation-review artifact, not a tribunal result.

## 1. Population

| Population | Count |
|---|---:|
| Independently accepted calibration rows | 45 |
| Newly mass-reviewed rows | 616 |
| **Total REVIEWED** | **661** |
| UNREVIEWED | **0** |

The mass pass did **not** change the accepted ruler semantics or evidence mode.

Evidence mode remains:

`STRICT_CANDIDATE_OWNED_GATE2`

For every row, the classifier may use only:
1. the accepted raw candidate expression; and
2. the accepted Gate-2 evidence records owned by that exact candidate.

The mass classifier never emits a new CROSS_SCALE result. The only active CROSS_SCALE sentinel remains Zeitz's already-reviewed `Crux Move`.

## 2. Final distribution

### Reference scale

| Scale | Count |
|---|---:|
| MICRO | 1 |
| DEPLOYABLE | 213 |
| MACRO | 115 |
| CROSS_SCALE | 1 |
| UNRESOLVED | 331 |
| **Total** | **661** |

The **331 UNRESOLVED** rows are not unfinished work. They are reviewed rows where the accepted strict evidence does not support a responsible finer grain call.

### Bundle structure

| Bundle state | Count |
|---|---:|
| SINGLE_PRIMARY_MOVE | 214 |
| BUNDLED_MOVES | 13 |
| UNRESOLVED | 434 |

### Action shape

| Action shape | Count |
|---|---:|
| EXPLICIT_ACTION | 53 |
| IMPLICIT_ACTION | 238 |
| LABEL_ONLY | 369 |
| UNRESOLVED | 1 |

### Semantic context reach

| Reach | Count |
|---|---:|
| GENERAL | 649 |
| SOURCE_LOCAL | 4 |
| PROBLEM_LOCAL | 7 |
| UNRESOLVED | 1 |

The four SOURCE_LOCAL rows are the source-authored Zeitz Strategy / Tactic / Tool / Crux meanings. Source provenance alone never creates SOURCE_LOCAL.

### Trigger / operation / output boundaries

| State | Trigger | Operation | Output |
|---|---:|---:|---:|
| CLEAR | 74 | 182 | 103 |
| PARTIAL | 29 | 109 | 85 |
| ABSENT | 103 | 103 | 102 |
| UNRESOLVED | 455 | 267 | 371 |

Recall the accepted distinction:

- ABSENT = the current expression/evidence is affirmatively non-operational for that boundary at its present grain;
- UNRESOLVED = the boundary plausibly matters, but candidate-owned evidence cannot determine it.

### Confidence

| Confidence | Count |
|---|---:|
| HIGH | 591 |
| MEDIUM | 69 |
| LOW | 1 |

LOW remains the accepted calibration stress case `RAW-OFFICIAL-048 — Finite-Field Quotient Model of the Projective Plane`.

## 3. Distribution by origin

| Origin | Total | DEPLOYABLE | MACRO | MICRO | CROSS_SCALE | UNRESOLVED |
|---|---:|---:|---:|---:|---:|---:|
| Official SMMC solution occurrences | 127 | 113 | 11 | 0 | 0 | 3 |
| Zeitz | 102 | 24 | 5 | 0 | 1 | 72 |
| Engel | 46 | 5 | 3 | 0 | 0 | 38 |
| Hammack | 30 | 8 | 1 | 0 | 0 | 21 |
| Velleman | 26 | 17 | 0 | 0 | 0 | 9 |
| Putnam and Beyond | 84 | 4 | 25 | 1 | 0 | 54 |
| Ledger audit-note routes | 34 | 14 | 1 | 0 | 0 | 19 |
| Ledger bridgeNeeds | 129 | 21 | 26 | 0 | 0 | 82 |
| Legacy method tags | 44 | 7 | 4 | 0 | 0 | 33 |
| Secondary/content tags | 39 | 0 | 39 | 0 | 0 | 0 |

The large source-book UNRESOLVED counts are a direct consequence of strict evidence mode: a TOC/index naming fact does not become an operational description merely because the underlying mathematics is familiar.

## 4. Mass-pass rule usage

The 616 newly reviewed rows were classified under ten bounded implementation rules. These implement the accepted ruler; they do not add new ontology.

| Rule | Count | Purpose |
|---|---:|---|
| MP01 | 55 | broad topic/family/scope expression |
| MP02 | 9 | evidence-supported multi-operation bundle |
| MP03 | 106 | verified official single-move occurrence |
| MP04 | 14 | canonical Discovery heuristic with action support |
| MP05 | 12 | operational proof-structure evidence |
| MP06 | 26 | explicit action in the raw expression |
| MP07 | 38 | compressed operation + meaningful result wording |
| MP08 | 153 | plausibly operational but evidence-thin |
| MP09 | 36 | static non-operational scope/content expression |
| MP10 | 167 | strict fail-closed fallback |
| **Total** | **616** | |

The validator pins these counts. Any later classification drift changes CI.

## 5. Deliberate official-solution audit

Official Battle evidence is the richest Gate-2 channel, so all official scale-UNRESOLVED outcomes received a deliberate follow-up.

Of **127** official occurrences:
- **113** are DEPLOYABLE;
- **11** are MACRO;
- **3** remain UNRESOLVED.

The three unresolved official rows are deliberate:

| Candidate | Why Gate 3 stays unresolved |
|---|---|
| `RAW-OFFICIAL-010 — Newton-Polygon Alternative` | the attached official claim says only that the solution presents a Newton-polygon alternative route; it does not state the operation |
| `RAW-OFFICIAL-017 — 2-adic Valuation` | the attached claim records a partial route using the 2-adic valuation but does not say what valuation operation/inference is made |
| `RAW-OFFICIAL-028 — Bijective Counting Route` | the attached claim says the booklet gives a distinct bijective-counting solution but does not describe the bijection |

This audit also deliberately removed over-permissive claim parsing: generic provenance verbs such as “presents”, “records”, and passive “used in the text” do not themselves establish an operation.

## 6. Bundled-move audit

Exactly **13** rows are currently `BUNDLED_MOVES`. They are exposed as a dedicated audit set:

1. Clearing denominators and primitive-integer normalization
2. Invariance Under Squaring after Renormalization
3. Incidence-Geometry Injectivity Bootstrap
4. UFD Assembly from Frobenius-Orbit Factors
5. Monotone Two-Cycle Collapse to Fixed Points
6. Generating-Function Recurrence to Linear ODE
7. Dilation–Derivative Boundedness Bootstrap
8. One-Variable Root Factorization plus Antisymmetry
9. Coprime-Factor Perfect-Power Splitting
10. Epigraph Convex-Hull Construction
11. Determinant Reduction by Row Replacement and Cofactor Expansion
12. Local Replacement Closure for a Construction
13. Hammack's Combining Techniques

Multiple verbs do **not** automatically imply BUNDLED_MOVES. A proof route may contain internal steps while still expressing one primary move. Bundle status is reserved for wording/evidence that actually packages independently meaningful operations.

## 7. Extreme-scale sentinels

Only two rows occupy the nonstandard ends of the ruler:

- **MICRO:** `Positivity of Squares (x² ≥ 0)`
- **CROSS_SCALE:** Zeitz `Crux Move`

No mass-pass row created a new CROSS_SCALE interpretation. The deferred `MIXED_GRAIN_EXPRESSION` branch remains closed.

## 8. Duplicate-looking / cross-origin consistency audit

The accepted raw pool contains **25 exact normalized-name duplicate groups**. Gate 3 does not merge them.

At the current mass-pass candidate:
- **15** groups have the same granularity signature;
- **10** groups differ.

The differing groups are:

1. Chinese Remainder Theorem
2. Contrapositive Proof
3. Cyclic-Symmetry Order Reduction
4. Half-Total Vector Centering
5. Information-State Counting Lower Bound
6. Lowest/Highest-Power Asymptotic Comparison
7. Mod-2 Normal-Form Reduction
8. Polynomial Identity from Infinitely Many Values
9. Recoverability Lemma
10. Roots-of-Unity/Cosine Parametrization

These differences are **review targets**, not merge or alias decisions.

The dominant pattern is evidence richness:
- a project index / TOC-only row may remain UNRESOLVED;
- a same-named official occurrence may become DEPLOYABLE because its own Battle record explicitly states the operation;
- a Velleman proof-structure row may resolve where a same-named Hammack TOC row does not.

The self-audit caught and repaired cases where identical wording was accidentally receiving weaker lexical treatment merely because it passed through a different rule. For example, the duplicate `Diagonalize a 2-by-2 Polynomial Matrix` rows now agree on all granularity dimensions.

## 9. Fail-closed protections retained

The mass pass keeps all accepted calibration protections:

- exact 661-candidate ID equality;
- exactly 661 REVIEWED / zero UNREVIEWED;
- exact candidate-name and origin snapshots;
- supporting evidence IDs must belong to the exact candidate;
- exact Gate-3 allowed-key schema;
- unknown authoring keys rejected before destructuring;
- no merge/split/type/rank/prerequisite/relation/product fields;
- ruler anchored to accepted calibration SHA `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`;
- strict candidate-owned Gate-2 evidence mode;
- mass classifier prohibited from emitting CROSS_SCALE;
- sole active CROSS_SCALE sentinel remains Crux Move;
- deferred mixed-grain branch remains closed;
- accepted Gate-2 files byte-checked against eleven Git blob SHA-1 values;
- accepted Gate-2 semantic/provenance payload pinned to SHA-256 `f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f`.

## 10. What Gate 3 still needs

The mass pass is **not self-accepted**.

Before Tribunal may open, an independent reviewer must attack the final exact SHA for:

1. consistency with the accepted ruler across all 661 rows;
2. strict candidate-owned evidence discipline;
3. MACRO vs DEPLOYABLE and bundle consistency;
4. ABSENT vs UNRESOLVED consistency;
5. all 13 BUNDLED_MOVES cases;
6. the three official UNRESOLVED cases;
7. the 25 duplicate-name groups, especially the 10 differing signatures;
8. the sole MICRO and sole CROSS_SCALE sentinels;
9. Gate-2 byte/semantic freeze;
10. hidden later-gate leakage;
11. exact-head CI.

Only an explicit independent acceptance of that exact mass-pass SHA can close Gate 3.

Current state:

`Gate 0 ✅ → Gate 1 ✅ → Gate 2 ✅ → Gate 3 🟡 MASS-PASS REVIEW CANDIDATE → Tribunal 🔒`
