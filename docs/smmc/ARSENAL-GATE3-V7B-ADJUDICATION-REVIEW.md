# SMMC Arsenal — Gate 3 v7B adjudication checkpoint

**Status:** builder research only; **not independently accepted**. The original 127-row v7 semantic-role proposals remain preserved in `granularity-official-role-audit-v7.mjs`. A separate [v7B four-state adjudication ledger](../../course/smmc/arsenal/granularity-official-adjudication-v7b.mjs) is now available for adversarial review. Gate 3 remains unaccepted, Gate 4 remains locked, and PR #186 must stay draft/unmerged.

## Independent finding motivating the redesign

The independent v7 audit checkpoint review ([PR #186 comment 6101839931](https://github.com/Karuma-jojo/Chronological-Deck/pull/186#issuecomment-6101839931)) established that the original audit had only binary CLEAR/UNRESOLVED suggestions, four conflicts with frozen calibration, several false-CLEAR triggers, an omitted lexical trigger, a potentially missed partial output, and generic rationales.

The accepted ruler distinguishes four states for **each** boundary: `CLEAR`, `PARTIAL`, `ABSENT`, `UNRESOLVED`. The new v7B ledger explicitly supports these four. **A null decision means “DEFER adjudication”; it does not mean UNRESOLVED** and is never inserted into Gate 3's official boundary fields. ABSENT must only be used with evidence that the boundary is affirmatively non-operational at the expression's grain; mere missing detail remains UNRESOLVED.

## 127-case audit partition

| Status | Records | Meaning |
|---|---:|---|
| FROZEN_REFERENCE | 9 | Accepted calibration is quoted for consistency and cannot be overwritten |
| REVISE_OR_SUPPORT_BUILDER_PROPOSAL | 26 | At least one boundary/context dimension has an individually explained **builder proposal** |
| DEFER_PENDING_INDIVIDUAL_ADJUDICATION | 92 | No substantive new boundary decision; every earlier v7 proposal is retained solely for traceability |
| **Total** | **127** | All official occurrence cases covered |

The 26 builder-reviewed mass rows are **not independently accepted**. The 92 deferred mass rows must undergo proper candidate-specific mathematical role checking before the ledger could become a source of authoritatively applied classifications.

## Frozen calibration conflicts explicitly reconciled

| Raw ID | Original v7 trigger proposal | Independently accepted trigger (must remain) |
|---|---|---|
| RAW-OFFICIAL-048 | UNRESOLVED | **PARTIAL** |
| RAW-OFFICIAL-095 | CLEAR | **PARTIAL** |
| RAW-OFFICIAL-103 | UNRESOLVED | **CLEAR** |
| RAW-OFFICIAL-107 | UNRESOLVED | **PARTIAL** |

All nine accepted calibration observations have their accepted trigger, output and context values quoted exactly. These observations **never** update the 45-case calibration ledger.

## Mathematical-role examples needing scrutiny

- `RAW-OFFICIAL-054`: “After normalization” is a procedural stage, **not the trigger**. The same claim says that coefficient comparison modulo a prime uses **divisibility of interior binomial coefficients** to derive divisibility of polynomial coefficients. This is positive trigger information, but the full applicability conditions remain unspecified: propose **PARTIAL**, with the mathematical premise as the witness.
- `RAW-OFFICIAL-087`: A matrix–eigenvector *pair* is introduced as the **counting representation**, not a pre-existing trigger; propose UNRESOLVED trigger.
- `RAW-OFFICIAL-089`: The map `A ↦ Av` is solver-introduced, not a given trigger; the computed **rank and kernel size** are actual output.
- `RAW-OFFICIAL-101`: “Working modulo two” is an operation, not a hypothesis inviting that operation.
- `RAW-OFFICIAL-054 / 092 / 096`: “After normalization/diagonalization” locates a prior procedural step, but does not independently specify the applicability conditions of the later move.
- `RAW-OFFICIAL-111`: An ODE names a broad setting, not the precise concavity criterion; propose **PARTIAL** trigger. The stated **strict concavity** is CLEAR output.
- `RAW-OFFICIAL-091`: The raw expression itself contains the existing constrained input “2-by-2 Polynomial Matrix”; keep **CLEAR** lexical trigger.
- `RAW-OFFICIAL-098`: Freezing the other variables and factoring using known roots produces an identifiable **one-variable root-based factorization**, a **CLEAR** output even without a full symbolic expansion. `RAW-OFFICIAL-077` likewise receives CLEAR for reconstructing the required base-field factorization. Both follow the accepted ruler's identified-output criterion; lack of printed factors alone does not lower a boundary to PARTIAL.
- `RAW-OFFICIAL-016 / 018`: Mentions of valuation information or Rational Root Theorem do not establish an immediate result; propose **UNRESOLVED** output, not false CLEAR and not ABSENT.
- `RAW-OFFICIAL-029 / 052 / 064 / 094`: Mathematical subsequence, Riemann-integrability, convex-envelope and Jordan-normal-form meanings are readable without the historical problem; propose **GENERAL** contextual reach.

Each newly chosen role records a case-specific explanation and a witness drawn from either its own accepted claim or the raw candidate expression. A literal match is a guardrail, **not a proof** that the mathematical adjudication is correct.

## No silent authority transfer

1. The audit uses `FROZEN_REFERENCE`, `REVISE_PROPOSAL`, `SUPPORT_PROPOSAL` and `DEFER` as **review dispositions**, distinct from the ruler's four boundary states.
2. Deferred rows have **null** decisions. There is no unprincipled defaulting to GENERAL, CLEAR or UNRESOLVED.
3. The accepted 11 Gate-2 blobs, 45 accepted calibration cases and old bundle decisions are not edited.
4. The existing v6 mass classifier is **not** imported from or overridden by v7B. Its 616 mass rows and distribution remain unchanged; this is not Gate 3 graduation.
5. Independent reviewers should attack each of the 26 builder proposals, calibrations reconciliation, and every remaining deferred record. Paraphrase stability of mathematical roles remains a distinct unsatisfied exit condition.

**Exit condition:** individually adjudicate the still-deferred cases and obtain independent acceptance of the 127-case semantic ledger before building an evidence-controlled v7 mass-classifier integration; thereafter regenerate all 616 rows, update distribution/regressions, pass exact-head CI, and seek a further independent graduation review.

## v7B bounded response to independent checkpoint review 6106217042

The [independent reviewer](https://github.com/Karuma-jojo/Chronological-Deck/pull/186#issuecomment-6106217042) inspected 26 substantively touched mass cases (**30 proposed dimension judgments: 15 triggers, 11 outputs, 4 contexts**), conditionally supported 24, and required revision to **054** and **098**. Their original v7B decisions are preserved in commit `0633b407cea3b7b3513208a1b1411cda5b89ccdf` for traceability. This bounded amendment changes only these two adjudication proposals and their regression checks; it **does not** change the existing v6 classifier, the 616 classified rows, the original source evidence, frozen calibrations or existing bundle decisions.

- **G3-B01 — 054:** trigger revised **UNRESOLVED → PARTIAL** because the actual owned claim explicitly supplies a mathematical premise—interior binomial-coefficient divisibility—in its prime-modulus coefficient-comparison setting. The earlier witness *After normalization* remains a procedural marker but is no longer used as the adjudicated trigger witness.
- **G3-B02 — 098:** output revised **PARTIAL → CLEAR** because factoring with known roots has an identifiable resulting one-variable factorization. The independent comparison `RAW-OFFICIAL-077` likewise receives CLEAR from an explicitly reconstructed factorization without enumerated symbolic factors. This is an output-role judgment, not a declaration that the entire multi-move procedure or ultimate goal is resolved.

The partition stays **9 frozen calibration observations, 26 partially adjudicated builder mass rows, 92 fully deferred mass rows**. These 26 still consist of **15 trigger, 11 output and 4 context** proposals, not complete three-dimensional reviews. All remain independent-review-pending, and the 92 deferred rows are not given default boundaries. There is **no v7 classifier integration or Gate 3 graduation**.
