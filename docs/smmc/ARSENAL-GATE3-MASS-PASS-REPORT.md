# SMMC Arsenal — Gate 3 repaired mass-pass report

Status: **MASS-PASS REVIEW CANDIDATE — Gate 3 is not yet accepted or complete**

Accepted ruler:
- independent calibration acceptance SHA: `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`
- accepted Gate-2 SHA: `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`
- Gate-2 merge SHA: `7600dd377192aafe6ca777636d94474736ea4e4f`

Independent graduation review **5406340053** rejected the first 616-row application for four systematic shortcuts. Independent repaired graduation review **5436149362** then rejected exact SHA `7ea6d64d8a0bf0424a3b23925ff8c5e77bd487a2` for two narrower application defects: an over-corrected one-ID mass bundle allowlist and drift from the accepted explicit-target trigger semantics. This report describes the current bounded v3 repair.

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

### G3-M03 / G3-M05 — exhaustive candidate-expression bundle audit

The earlier proof-sequencing heuristic was correctly removed, but the first repair over-corrected to a one-ID mass allowlist. Review 5436149362 exposed three missed candidate-level bundles.

The current classifier now separates:

1. a deterministic **surface** that scans all 616 mass candidate expressions for multiple operation heads joined by `and / plus / then / slash`;
2. an explicit decision table for every surfaced mass candidate;
3. the manually preserved `RAW-OFFICIAL-098` bundle from the earlier audit.

The validator requires every surfaced mass expression to have exactly one explicit decision. A newly added or newly visible multi-operation expression cannot silently bypass this audit.

The final BUNDLED_MOVES set contains exactly **8** rows:

1. `RAW-BRIDGE-063` — Matrix-to-incidence-graph translation and block decomposition by components
2. `RAW-BRIDGE-070` — Clearing denominators and primitive-integer normalization
3. `RAW-BRIDGE-072` — Coefficient extraction from shifted polynomials and reduction modulo a prime
4. `RAW-OFFICIAL-088` — Extend a Vector to a Basis and Count Free Images
5. `RAW-OFFICIAL-095` — Dilation–Derivative Boundedness Bootstrap
6. `RAW-OFFICIAL-098` — One-Variable Root Factorization plus Antisymmetry
7. `RAW-OFFICIAL-107` — Determinant Reduction by Row Replacement and Cofactor Expansion
8. `RAW-SOURCE-h-combining-techniques` — Combining Techniques

Four of these are frozen accepted calibration rows; four are mass-pass rows.

The three fresh false negatives from review 5436149362 are now pinned:
- `RAW-BRIDGE-063` → MACRO + BUNDLED_MOVES
- `RAW-BRIDGE-072` → MACRO + BUNDLED_MOVES
- `RAW-OFFICIAL-088` → MACRO + BUNDLED_MOVES + EXPLICIT_ACTION

The same eight former proof-sequencing shortcuts remain regression-protected as **not BUNDLED_MOVES**:
RAW-OFFICIAL-074, 075, 077, 080, 084, 099, 102, 108.

### G3-M04 — contextReach now fails closed

GENERAL is no longer the default.

The classifier now requires positive source-independent semantics in the current expression: recognizable mathematical vocabulary, a clear mathematical action/method form, or an accepted broad topic expression.

Opaque expressions fall to UNRESOLVED.

Source-authored semantics remain SOURCE_LOCAL when supported by candidate-owned evidence. In particular:

- Engel `Great Ideas` → SOURCE_LOCAL
- Zeitz `Crossover Tactic` → SOURCE_LOCAL
- the accepted Zeitz Strategy / Tactic / Tool / Crux calibration rows remain SOURCE_LOCAL

Problem-local semantics remain separate.

### G3-M06 — accepted explicit-target trigger semantics restored

Removing fake preposition triggers was correct, but the previous repair also removed a real accepted ruler behavior.

The frozen calibration row:

`RAW-ROUTE-029 — Diagonalize a 2-by-2 Polynomial Matrix`

has `triggerBoundary: CLEAR`, with the accepted rationale that the **object itself supplies the trigger**.

The mass classifier now distinguishes:

- generic grammatical prepositions such as `for / of / in / with` → **not triggers**;
- an explicit action whose mathematically specific direct object states the object/situation being acted on → lexical trigger can be **CLEAR**, exactly as accepted calibration demonstrates.

Therefore:

`RAW-OFFICIAL-091 — Diagonalize a 2-by-2 Polynomial Matrix`

now agrees with the frozen calibration:
- actionShape = EXPLICIT_ACTION
- triggerBoundary = CLEAR

`Search for a Pattern` remains trigger UNRESOLVED; “for a pattern” is still not treated as a trigger condition.

## 3. Repaired final distribution

### Reference scale

| Scale | Count |
|---|---:|
| MICRO | 1 |
| DEPLOYABLE | 190 |
| MACRO | 89 |
| CROSS_SCALE | 1 |
| UNRESOLVED | 380 |
| **Total** | **661** |

The rise in UNRESOLVED is intentional. Removing semantic shortcuts means strict evidence mode refuses to infer meaning from opaque tags, thin headings, or familiar mathematical terminology when the accepted candidate/evidence pair does not support the finer call.

### Bundle structure

| Bundle state | Count |
|---|---:|
| SINGLE_PRIMARY_MOVE | 191 |
| BUNDLED_MOVES | 8 |
| UNRESOLVED | 462 |

### Action shape

| Action shape | Count |
|---|---:|
| EXPLICIT_ACTION | 53 |
| IMPLICIT_ACTION | 236 |
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
| CLEAR | 51 | 181 | 93 |
| PARTIAL | 10 | 108 | 56 |
| ABSENT | 82 | 82 | 81 |
| UNRESOLVED | 518 | 290 | 431 |

### Confidence

| Confidence | Count |
|---|---:|
| HIGH | 619 |
| MEDIUM | 41 |
| LOW | 1 |

## 4. Distribution by origin

| Origin | Total | DEPLOYABLE | MACRO | MICRO | CROSS_SCALE | UNRESOLVED |
|---|---:|---:|---:|---:|---:|---:|
| Official SMMC solution occurrences | 127 | 120 | 4 | 0 | 0 | 3 |
| Zeitz | 102 | 23 | 6 | 0 | 1 | 72 |
| Engel | 46 | 5 | 3 | 0 | 0 | 38 |
| Hammack | 30 | 8 | 2 | 0 | 0 | 20 |
| Velleman | 26 | 17 | 0 | 0 | 0 | 9 |
| Putnam and Beyond | 84 | 2 | 30 | 1 | 0 | 51 |
| Ledger audit-note routes | 34 | 5 | 1 | 0 | 0 | 28 |
| Ledger bridgeNeeds | 129 | 7 | 28 | 0 | 0 | 94 |
| Legacy method tags | 44 | 3 | 4 | 0 | 0 | 37 |
| Secondary/content tags | 39 | 0 | 11 | 0 | 0 | 28 |

Secondary-tag rows now demonstrate the intended strict behavior: only readable broad expressions become MACRO; 28 opaque/insufficient expressions remain UNRESOLVED.

## 5. Repaired mass-rule usage

| Rule | Count |
|---|---:|
| MP01 | 39 |
| MP02 | 4 |
| MP03 | 113 |
| MP04 | 14 |
| MP05 | 12 |
| MP06 | 25 |
| MP07 | 9 |
| MP08 | 178 |
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

- DEPLOYABLE: **120**
- MACRO: **4**
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
- **12** have the same complete granularity signature;
- **13** differ.

The 13 differing groups are:

1. Chinese Remainder Theorem
2. Contrapositive
3. Contrapositive Proof
4. Cyclic-Symmetry Order Reduction
5. Half-Total Vector Centering
6. Information-State Counting Lower Bound
7. Lowest/Highest-Power Asymptotic Comparison
8. Mod-2 Normal-Form Reduction
9. Parity
10. Polynomial Identity from Infinitely Many Values
11. Recoverability Lemma
12. Roots-of-Unity/Cosine Parametrization
13. Strong Induction

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
4. the exact eight BUNDLED_MOVES rows, the exhaustive mass bundle surface/decision closure, and the eight rejected old bundle shortcuts;
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
