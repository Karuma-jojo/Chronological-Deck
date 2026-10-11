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

- `RAW-OFFICIAL-087`: A matrix–eigenvector *pair* is introduced as the **counting representation**, not a pre-existing trigger; propose UNRESOLVED trigger.
- `RAW-OFFICIAL-089`: The map `A ↦ Av` is solver-introduced, not a given trigger; the computed **rank and kernel size** are actual output.
- `RAW-OFFICIAL-101`: “Working modulo two” is an operation, not a hypothesis inviting that operation.
- `RAW-OFFICIAL-054 / 092 / 096`: “After normalization/diagonalization” locates a prior procedural step, but does not independently specify the applicability conditions of the later move.
- `RAW-OFFICIAL-111`: An ODE names a broad setting, not the precise concavity criterion; propose **PARTIAL** trigger. The stated **strict concavity** is CLEAR output.
- `RAW-OFFICIAL-091`: The raw expression itself contains the existing constrained input “2-by-2 Polynomial Matrix”; keep **CLEAR** lexical trigger.
- `RAW-OFFICIAL-098`: Factorization by known roots supplies a real intermediate payoff, but the resulting factors are not specified; propose **PARTIAL** output.
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
