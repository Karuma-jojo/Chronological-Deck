# Independent Gate 3 v4 adversarial review

**Disposition: REQUEST CHANGES — Gate 3 is not accepted on this head. Tribunal remains locked.**

Reviewed exact implementation/report head: `12f0c10d2aab6b0600acb50bd5bb640fb9a760e4`.

[PR #186](https://github.com/Karuma-jojo/Chronological-Deck/pull/186) was open and draft when inspected. This is an independent review report for the user; no GitHub review/comment, implementation edit, commit, or merge was submitted.

## Scope and evidence

I fetched the exact-head implementation, Gate 3 contract, ledger, audit, bundle decisions, validator, and their SMMC dependencies. I ran the SMMC authoring validator locally using files verified against the repository's Git blob hashes. I inspected the actual candidate expressions and their own accepted Gate 2 claims, and ran fresh adversarial probes against the exported classifier.

This review uses the accepted strict evidence rule: the raw candidate expression and its own attached Gate 2 records. The supplied book PDFs were not used to enrich those records: the Gate 3 contract explicitly excludes richer PDF inspection for this pass. Findings below do not depend on recalling the underlying mathematics from outside sources.

## What survives independent verification

- All **eleven frozen Gate 2 files** have the same Git blob SHA as accepted Gate 2 head `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`.
- The executable granularity contract matches accepted calibration head `177a8efa24ebca15e2c84dbb18e96a72be5e1d08`.
- The complete **45-entry CALIBRATION text is identical** to that accepted head.
- The full local SMMC authoring validator passes, including the frozen semantic digest, population/evidence ownership checks, previous sentinels, distributions, and schema protections.
- There are **661 REVIEWED / 0 UNREVIEWED** rows: 45 calibration and 616 mass rows.
- Bundle discovery surfaces **87 mass expressions**; all have one explicit decision, **8 BUNDLE / 79 NOT_BUNDLE**. Together with four calibration bundles, the ledger has **12 BUNDLED_MOVES**.
- The earlier bridge repairs 040, 053, 063, 072, 080 and official 088/098 are present; bridge 080 is IMPLICIT_ACTION.
- The Define-a-Function, Factor-a-Polynomial, and Construct-a-Polynomial-Matrix negative trigger probes pass. The diagonalization and Search-for-a-Pattern sentinels survive.
- All eight previous rejected proof-sequencing shortcuts stay outside BUNDLED_MOVES.
- The duplicate audit contains **25 groups / 13 differing signatures**. Differences generally reflect stronger official evidence versus thin project/source labels; they do not themselves require merging.
- The three official UNRESOLVED scale calls remain defensible under strict mode: RAW-OFFICIAL-010 (Newton-Polygon Alternative), 017 (2-adic Valuation), and 028 (Bijective Counting Route).
- I found no concrete later-gate keep/drop, ontology, merge/split, prerequisite, ranking, or product decision introduced by this repair.

The primary exact-head workflow results are genuinely SUCCESS:

| Workflow | Run |
|---|---|
| SMMC authoring | [37818793756](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/37818793756) |
| Frontend integrity | [37818793747](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/37818793747) |
| T22 atomic curriculum | [37818793438](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/37818793438) |

Only the SMMC validator was rerun locally. The other two results were verified through GitHub's workflow records.

## G3-M09 — Blocking: object-as-trigger logic still matches created results

[Classifier, lines 54–66](https://github.com/Karuma-jojo/Chronological-Deck/blob/12f0c10d2aab6b0600acb50bd5bb640fb9a760e4/course/smmc/arsenal/granularity-mass-pass-v1.mjs#L54-L66)

The v4 rule restricts the opening action verb, then searches the **whole name** for a constrained mathematical object. It does not establish that the matched object is the existing input of that verb.

Fresh synthetic probes, with thin candidate-owned terminology evidence, produce:

| Expression | Current trigger | Problem |
|---|---|---|
| Reduce a Problem to a Finite Graph | CLEAR | “finite graph” is the constructed destination of the reduction |
| Translate a Recurrence into a Polynomial Matrix | CLEAR | “polynomial matrix” is the resulting representation |
| Eliminate a Variable to Obtain a Symmetric Matrix | CLEAR | “symmetric matrix” is explicitly something to obtain |

These are synthetic tests of the exported helper, **not additional Gate 2 candidates**. The accepted corpus was not changed.

The generic input words “problem”, “recurrence”, and “variable” do not establish the constrained input class that the rule claims to require. A resulting representation does not, by itself, identify the situation that invites its construction. Under the accepted strict rule, the output cue cannot justify CLEAR trigger; additional evidence is required.

Positive contrast: “Diagonalize a 2-by-2 Polynomial Matrix” still has a specifically constrained existing object and remains CLEAR.

**Required bounded repair:** recognize the grammatical role of the matched object, or use an explicit evidence-bounded adjudication for cases the parser cannot safely resolve. A whole-name modifier/noun match is insufficient. Add the three fresh negative probes while preserving accepted positive diagonalization and the existing negatives.

Do not solve this by declaring every occurrence of “to” or “into” negative: some phrases genuinely contain a constrained input followed by a result.

## G3-M10 — Blocking: boundary assessment loses content already stated in owned evidence

[Boundary regexes, lines 46–48](https://github.com/Karuma-jojo/Chronological-Deck/blob/12f0c10d2aab6b0600acb50bd5bb640fb9a760e4/course/smmc/arsenal/granularity-mass-pass-v1.mjs#L46-L48)  
[Boundary assessment, lines 205–258](https://github.com/Karuma-jojo/Chronological-Deck/blob/12f0c10d2aab6b0600acb50bd5bb640fb9a760e4/course/smmc/arsenal/granularity-mass-pass-v1.mjs#L205-L258)

The accepted ruler requires a semantic reading of the permitted text. The mass classifier instead uses token presence as the decisive boundary test.

Three actual corpus counterexamples:

| Candidate | Current assessment | Content already in its own accepted claim | Required correction |
|---|---|---|---|
| RAW-OFFICIAL-052 — Riemann Integrability to Local Boundedness | output UNRESOLVED | integrability on compact intervals is used to obtain boundedness | output CLEAR: boundedness is explicitly identified |
| RAW-OFFICIAL-117 — Cycle-Block Determinant Decomposition | trigger UNRESOLVED; output UNRESOLVED | starts once the graph core is 2-regular; produces block diagonal form and determinant factors by cycle blocks | trigger CLEAR and output CLEAR |
| RAW-SOURCE-v-unique-existence — Existence-and-Uniqueness Goal | output UNRESOLVED | splitting produces existence and uniqueness obligations | output CLEAR: the two obligations are explicitly stated |

No theorem expansion or richer PDF reading is needed to identify these conditions and results.

Meaning-preserving probes expose the mechanism:

- RAW-OFFICIAL-052: replacing “to obtain boundedness” with “and obtains boundedness” changes output **UNRESOLVED → CLEAR**.
- RAW-OFFICIAL-117: replacing “Once the graph core” with “When the graph core” changes trigger **UNRESOLVED → CLEAR**.
- RAW-OFFICIAL-110: replacing “positive discriminant” with “discriminant greater than zero” changes trigger **CLEAR → UNRESOLVED**, while output stays CLEAR.

These altered claims were used only in memory for diagnostics. They were not saved into the accepted data.

The last probe demonstrates sensitivity to a result adjective; it is not necessary to insist that RAW-OFFICIAL-110's trigger must be UNRESOLVED. The unambiguous false negatives in 052/117 and Velleman's goal split already establish the blocker.

**Required bounded repair:** re-audit trigger and output boundaries against the actual owned claims, using identified condition/result spans rather than a bare token hit. Regexes may assist discovery, but matching a word is not the assessment. Preserve strict mode: genuinely missing content must remain UNRESOLVED.

At minimum, pin the three corpus corrections and the meaning-preserving condition/result contrasts. Inspect other similarly affected rows such as Perturb Away Degeneracies, Nested-Compact-Set Intersection, and Compact-Space Subsequence.

## G3-M11 — Blocking: imperative action shapes remain vocabulary-dependent

[Action parser, line 20 and explicitAction helper](https://github.com/Karuma-jojo/Chronological-Deck/blob/12f0c10d2aab6b0600acb50bd5bb640fb9a760e4/course/smmc/arsenal/granularity-mass-pass-v1.mjs#L20)

Two actual mass rows violate the accepted **lexical/current-expression** actionShape definition:

| Candidate | Current | Required |
|---|---|---|
| RAW-OFFICIAL-002 — Perturb Away Degeneracies | IMPLICIT_ACTION | EXPLICIT_ACTION |
| RAW-OFFICIAL-003 — Track Parity Under Continuous Deformation | IMPLICIT_ACTION | EXPLICIT_ACTION |

“Perturb” and “Track” directly tell the solver to perform an action. Their wording is imperative, not a noun-like label whose operation must be recovered from evidence.

Both are missed because their opening verbs are absent from EXPLICIT_ACTION_RE. Their rich official evidence then routes them to MP03 with IMPLICIT_ACTION. This is the same finite-vocabulary limitation in another dimension.

**Required bounded repair:** inspect the action wording across the full fixed mass population and adjudicate uncertain grammatical heads. Add both actual corpus regressions and maintain the previous noun/verb exclusions such as Set Theory and Use of….

## Bundle review observations

The new structural discovery surface is substantially better than v3. I did not establish another unequivocal missed bundle in the fixed population.

Most NOT_BUNDLE decisions are defensible: topic/object compounds, alternative descriptions, and a method coupled to its target do not prove joint execution of independently meaningful operations. In particular, Velleman's unique-existence goal names **one split operation** producing two obligations; this does not require BUNDLED_MOVES.

RAW-OFFICIAL-093 — “Root Interlacing by Sign Changes and IVT” remains a borderline positive. Its owned claim establishes alternating signs and IVT as ingredients, but does not explicitly distinguish independently meaningful sign-analysis and theorem-application moves. A sign check can also be an internal applicability step of one IVT argument.

I am **not treating that ambiguity as an additional blocker**, because the frozen ruler allows meaningful internal steps within one move and leaves judgment at this edge. Its rationale should explain why this is two primary operations rather than merely two ingredients. Automatic HIGH confidence based on official provenance is not a sufficient explanation.

The bundle surface is broad over this particular corpus, not a general exhaustive natural-language parser: fresh forms such as “Normalize before Factorization” and “Expand; Control the Remainder” are not surfaced. No such missed fixed-corpus row was established in this review, so this is a coverage limitation rather than a graduation blocker.

## Recomputed distribution

| Dimension | Counts |
|---|---|
| referenceScale | MICRO 1; DEPLOYABLE 189; MACRO 93; CROSS_SCALE 1; UNRESOLVED 377 |
| bundleStructure | SINGLE_PRIMARY_MOVE 190; BUNDLED_MOVES 12; UNRESOLVED 459 |
| actionShape | EXPLICIT_ACTION 53; IMPLICIT_ACTION 238; LABEL_ONLY 369; UNRESOLVED 1 |
| contextReach | GENERAL 442; SOURCE_LOCAL 6; PROBLEM_LOCAL 7; UNRESOLVED 206 |
| triggerBoundary | CLEAR 49; PARTIAL 11; ABSENT 82; UNRESOLVED 519 |
| operationBoundary | CLEAR 181; PARTIAL 110; ABSENT 82; UNRESOLVED 288 |
| outputBoundary | CLEAR 93; PARTIAL 56; ABSENT 81; UNRESOLVED 431 |
| confidence | HIGH 616; MEDIUM 44; LOW 1 |

All reported counts reproduce. Matching them proves reproducibility of the current implementation; it does not establish that every assessment applies the accepted ruler correctly.

## Repair and re-review conditions

1. Preserve all eleven Gate 2 blobs, all 45 calibration entries, and the executable accepted contract.
2. Repair M09's result-object trigger confusion with fresh role-sensitive contrasts.
3. Correct M10's actual evidence-supported condition/result misses and audit the remaining boundary decisions for the same mechanism.
4. Correct M11's imperative shapes and audit the fixed mass population for omitted action heads.
5. Explain the 093 bundle judgment without treating official source provenance as a confidence shortcut.
6. Regenerate the ledger, distribution, duplicate audit, and report; update expected counts only after the semantic repairs.
7. Run the validator and exact-head primary CI, then hand back the new SHA for independent review.

**Final disposition:** the v4 data protections and earlier bounded repairs survive. The mass classifier still misapplies the accepted ruler in three reproducible ways. Gate 3 must remain unaccepted and the Tribunal locked on `12f0c10d2aab6b0600acb50bd5bb640fb9a760e4`.

