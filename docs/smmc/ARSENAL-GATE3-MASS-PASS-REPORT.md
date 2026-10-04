# SMMC Arsenal — Gate 3 repaired mass-pass report

Status: **MASS-PASS REVIEW CANDIDATE — Gate 3 is not yet accepted or complete**

Accepted ruler:
- independent calibration acceptance SHA: `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`
- accepted Gate-2 SHA: `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`
- Gate-2 merge SHA: `7600dd377192aafe6ca777636d94474736ea4e4f`

Independent graduation review **5406340053** rejected the first 616-row application at exact SHA `3881c09390a6923e969043f582c9cb5054e90ab2` for four systematic classifier shortcuts. This report describes the bounded classifier repair and regenerated 661-row ledger.

The accepted 45-row calibration is unchanged.

## 1. Population

| Population | Count |
|---|---:|
| Independently accepted calibration rows | 45 |
| Re-generated mass-reviewed rows | 616 |
| **Total REVIEWED** | **661** |
| UNREVIEWED | **0** |

Evidence mode remains:

`STRICT_CANDIDATE_OWNED_GATE2`

For every row the classifier may use only:
1. the accepted raw candidate expression; and
2. the accepted Gate-2 evidence records owned by that exact candidate.

The mass classifier still emits no CROSS_SCALE result. Zeitz's accepted `Crux Move` calibration row remains the sole active CROSS_SCALE sentinel.

## 2. Classifier repairs after review 5406340053

### G3-M01 — no provenance-driven mathematical meaning

The first mass classifier contained:

`candidate.origin === "SMMC_SECONDARY_TAG" => broad`

That shortcut is gone.

Origin metadata cannot establish mathematical meaning. Opaque secondary vocabulary tokens such as `POLY`, `LA`, `CX`, `FF`, `FE`, `INEQ`, `REC`, `GF`, `CONST`, `ASYM`, `INT`, `MOD`, `DIO`, `VAL`, `GCD`, `EUCLID`, `COND`, and `EXPECT` now fail closed to UNRESOLVED unless their current expression itself supplies semantics.

Readable broad expressions can still be MACRO because of their wording, not their origin.

### G3-M02 — lexical parser repaired

Three independent shortcuts were removed:

1. **noun/verb collision** — `Set Theory and Combinatorics of Sets` can no longer be read as imperative “Set ...”.
2. **operation/result self-overlap** — MP07 now requires a result signal semantically distinct from the operation noun; words such as factorization/reduction/construction/reformulation/representation/decomposition/encoding cannot satisfy both tests by themselves.
3. **preposition-as-trigger** — grammatical `for / of / in / with / on / at` no longer count as trigger conditions. `Search for a Pattern` therefore has trigger UNRESOLVED rather than gaining a fake trigger from “for”.

Negative regression tests pin these failures.

### G3-M03 — all former bundle rows re-audited at the candidate-expression level

The first pass reported 13 BUNDLED_MOVES rows. Review showed that several were only single named moves followed by later proof steps.

The repaired final BUNDLED_MOVES set contains exactly **5** rows:

1. `RAW-BRIDGE-070` — Clearing denominators and primitive-integer normalization
2. `RAW-OFFICIAL-095` — Dilation–Derivative Boundedness Bootstrap
3. `RAW-OFFICIAL-098` — One-Variable Root Factorization plus Antisymmetry
4. `RAW-OFFICIAL-107` — Determinant Reduction by Row Replacement and Cofactor Expansion
5. `RAW-SOURCE-h-combining-techniques` — Combining Techniques

The latter four except RAW-OFFICIAL-098 are already part of the frozen accepted calibration. RAW-OFFICIAL-098 is the sole audited mass-pass bundle.

These eight former mass-pass bundle shortcuts are explicitly regression-protected as **not BUNDLED_MOVES**:

- RAW-OFFICIAL-074 — Invariance Under Squaring after Renormalization
- RAW-OFFICIAL-075 — Incidence-Geometry Injectivity Bootstrap
- RAW-OFFICIAL-077 — UFD Assembly from Frobenius-Orbit Factors
- RAW-OFFICIAL-080 — Monotone Two-Cycle Collapse to Fixed Points
- RAW-OFFICIAL-084 — Generating-Function Recurrence to Linear ODE
- RAW-OFFICIAL-099 — Coprime-Factor Perfect-Power Splitting
- RAW-OFFICIAL-102 — Epigraph Convex-Hull Construction
- RAW-OFFICIAL-108 — Local Replacement Closure for a Construction

Later proof steps no longer make the named candidate itself a bundle.

### G3-M04 — contextReach now fails closed

GENERAL is no longer the default.

The classifier now requires positive source-independent semantics in the current expression: recognizable mathematical vocabulary, a clear mathematical action/method form, or an accepted broad topic expression.

Opaque expressions fall to UNRESOLVED.

Source-authored semantics remain SOURCE_LOCAL when supported by candidate-owned evidence. In particular:

- Engel `Great Ideas` → SOURCE_LOCAL
- Zeitz `Crossover Tactic` → SOURCE_LOCAL
- the accepted Zeitz Strategy / Tactic / Tool / Crux calibration rows remain SOURCE_LOCAL

Problem-local semantics remain separate.

## 3. Repaired final distribution

### Reference scale

| Scale | Count |
|---|---:|
| MICRO | 1 |
| DEPLOYABLE | 191 |
| MACRO | 86 |
| CROSS_SCALE | 1 |
| UNRESOLVED | 382 |
| **Total** | **661** |

The rise in UNRESOLVED is intentional. Removing semantic shortcuts means strict evidence mode refuses to infer meaning from opaque tags, thin headings, or familiar mathematical terminology when the accepted candidate/evidence pair does not support the finer call.

### Bundle structure

| Bundle state | Count |
|---|---:|
| SINGLE_PRIMARY_MOVE | 192 |
| BUNDLED_MOVES | 5 |
| UNRESOLVED | 464 |

### Action shape

| Action shape | Count |
|---|---:|
| EXPLICIT_ACTION | 52 |
| IMPLICIT_ACTION | 237 |
| LABEL_ONLY | 371 |
| UNRESOLVED | 1 |

### Semantic context reach

| Reach | Count |
|---|---:|
| GENERAL | 440 |
| SOURCE_LOCAL | 6 |
| PROBLEM_LOCAL | 7 |
| UNRESOLVED | 208 |

This is the largest intentional change from the first mass pass: GENERAL is no longer a fallback.

### Trigger / operation / output boundaries

| State | Trigger | Operation | Output |
|---|---:|---:|---:|
| CLEAR | 47 | 181 | 93 |
| PARTIAL | 11 | 108 | 55 |
| ABSENT | 82 | 82 | 81 |
| UNRESOLVED | 521 | 290 | 432 |

### Confidence

| Confidence | Count |
|---|---:|
| HIGH | 621 |
| MEDIUM | 39 |
| LOW | 1 |

## 4. Distribution by origin

| Origin | Total | DEPLOYABLE | MACRO | MICRO | CROSS_SCALE | UNRESOLVED |
|---|---:|---:|---:|---:|---:|---:|
| Official SMMC solution occurrences | 127 | 121 | 3 | 0 | 0 | 3 |
| Zeitz | 102 | 23 | 6 | 0 | 1 | 72 |
| Engel | 46 | 5 | 3 | 0 | 0 | 38 |
| Hammack | 30 | 8 | 2 | 0 | 0 | 20 |
| Velleman | 26 | 17 | 0 | 0 | 0 | 9 |
| Putnam and Beyond | 84 | 2 | 30 | 1 | 0 | 51 |
| Ledger audit-note routes | 34 | 5 | 1 | 0 | 0 | 28 |
| Ledger bridgeNeeds | 129 | 7 | 26 | 0 | 0 | 96 |
| Legacy method tags | 44 | 3 | 4 | 0 | 0 | 37 |
| Secondary/content tags | 39 | 0 | 11 | 0 | 0 | 28 |

Secondary-tag rows now demonstrate the intended strict behavior: only readable broad expressions become MACRO; 28 opaque/insufficient expressions remain UNRESOLVED.

## 5. Repaired mass-rule usage

| Rule | Count |
|---|---:|
| MP01 | 39 |
| MP02 | 1 |
| MP03 | 114 |
| MP04 | 14 |
| MP05 | 12 |
| MP06 | 25 |
| MP07 | 9 |
| MP08 | 180 |
| MP09 | 31 |
| MP10 | 191 |
| **Total** | **616** |

The validator pins every final distribution above.

## 6. Official-solution audit

The three official scale-UNRESOLVED rows remain unchanged and independently defensible:

- `RAW-OFFICIAL-010 — Newton-Polygon Alternative`
- `RAW-OFFICIAL-017 — 2-adic Valuation`
- `RAW-OFFICIAL-028 — Bijective Counting Route`

The repaired official distribution is:

- DEPLOYABLE: **121**
- MACRO: **3**
- UNRESOLVED: **3**

The reduction in official MACRO calls comes from removing false bundle promotions caused by later proof steps.

## 7. Extreme-scale sentinels

Still exactly:

- MICRO: `Positivity of Squares (x² ≥ 0)`
- CROSS_SCALE: Zeitz `Crux Move`

The mass classifier emits no CROSS_SCALE result and the deferred mixed-grain branch remains closed.

## 8. Duplicate-looking consistency audit

The raw pool still contains **25** exact normalized-name duplicate groups.

After the classifier repair:
- **11** have the same complete granularity signature;
- **14** differ.

The 14 differing groups are:

1. Chinese Remainder Theorem
2. Contrapositive
3. Contrapositive Proof
4. Cyclic-Symmetry Order Reduction
5. Diagonalize a 2-by-2 Polynomial Matrix
6. Half-Total Vector Centering
7. Information-State Counting Lower Bound
8. Lowest/Highest-Power Asymptotic Comparison
9. Mod-2 Normal-Form Reduction
10. Parity
11. Polynomial Identity from Infinitely Many Values
12. Recoverability Lemma
13. Roots-of-Unity/Cosine Parametrization
14. Strong Induction

These remain **review targets only**. Gate 3 does not merge or adjudicate duplicate-looking candidates.

Several new differences are intentional consequences of removing provenance defaults. For example, an opaque legacy tag can now remain contextReach UNRESOLVED while the same readable term from a source is GENERAL.

## 9. Fail-closed protections retained

The repaired mass pass still enforces:

- exactly 661 raw candidate IDs and exactly 661 REVIEWED Gate-3 rows;
- exact candidate name/origin snapshots;
- candidate-owned evidence only;
- accepted ruler SHA `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`;
- exact Gate-3 allowed-key schema;
- authoring-key validation before destructuring;
- strict evidence mode;
- no new CROSS_SCALE results;
- Gate-2 byte freeze over eleven accepted Git blobs;
- independently pinned Gate-2 semantic/provenance SHA-256 `f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f`;
- no ontology / merge / split / rank / prerequisites / relations / learning order / Forge / Boss / Arena / final representation fields.

## 10. What Gate 3 still needs

The repaired mass pass remains a **review candidate**, not self-accepted.

A fresh independent exact-head graduation review must attack:

1. the four repaired systematic failure modes from review 5406340053;
2. the 28 opaque secondary-tag UNRESOLVED calls versus the 11 readable MACRO calls;
3. lexical negative regressions for Set Theory, operation/result overlap, and trigger prepositions;
4. the exact five BUNDLED_MOVES rows and the eight rejected old bundle shortcuts;
5. evidence-supported GENERAL / SOURCE_LOCAL / PROBLEM_LOCAL / UNRESOLVED contextReach calls;
6. the three official UNRESOLVED rows;
7. all 25 duplicate-name groups, especially the 14 differing signatures;
8. the sole MICRO and CROSS_SCALE sentinels;
9. Gate-2 byte/semantic freeze;
10. hidden later-gate leakage;
11. exact-head CI.

Only explicit independent acceptance of the new exact repaired SHA may close Gate 3.

Current state:

`Gate 0 ✅ → Gate 1 ✅ → Gate 2 ✅ → Gate 3 🟡 REPAIRED MASS-PASS REVIEW CANDIDATE → Tribunal 🔒`
