# SMMC Arsenal — Gate 3 v7 semantic-role audit: preliminary, non-integrated

**Status: builder-proposed audit / independently unaccepted.** This document does not declare Gate 3 repaired, completed, or graduated. Gate 4 Candidate Tribunal is **LOCKED**. PR #186 stays draft and unmerged.

## Why v7 cannot be another regex patch

The independent v6 review ([PR #186 comment 6094252207](https://github.com/Karuma-jojo/Chronological-Deck/pull/186#issuecomment-6094252207)) reproduced both directions of the same failure: real mathematical outputs missed by vocabulary matching (official 089, 094, 111, 119, 120, also 077/102), and nonexistent outputs manufactured when a theorem or input noun is merely *mentioned* (official 016 and 018). It also identified genuinely general expressions incorrectly marked context-UNRESOLVED (official 029, 052, 064, 094). Meaning-preserving paraphrases of official 031, 045, and 048 caused boundary and even grain instability.

All v6 primary workflows were green; green CI was insufficient to validate the **mathematical semantics** of each official candidate/evidence pair.

## New immutable-input audit layer

**Source:** [`course/smmc/arsenal/granularity-official-role-audit-v7.mjs`](../../course/smmc/arsenal/granularity-official-role-audit-v7.mjs)

This is the first **separate semantic-review data file**, containing an individually inspectable row for **each of the 127** verified official `SOURCE_FACT / BATTLE / HISTORICAL_OCCURRENCE` claims. The rows repeat their *unchanged accepted claim* solely for independent human inspection, and record:

- exact official candidate ID and candidate name;
- a **literal candidate-owned triggering premise/input witness**, or null with a fail-closed justification;
- a **literal mathematical-output witness** (constructed object, equivalence, property, count, bound or conclusion), or null with a fail-closed justification;
- suggested `triggerBoundary`, `outputBoundary` and `contextReach`, with rationale;
- `frozenCalibration: true` on the **nine** official occurrences that already belong to the independently accepted 45 calibration cases.

All 127 proposals are labeled `BUILDER_REVIEW_CANDIDATE`, not accepted. The 9 calibration rows are **observations only**. Their accepted classifications are not modified, overridden or reinterpreted. The remaining **118** official mass candidates are eligible for a future bounded implementation *after semantic review*.

The SMMC authoring validator now verifies that the 127 proposal IDs exactly cover the 127 accepted official evidence records, each output/trigger witness is a literal substring of that **same candidate's** frozen verified Battle claim, and all nine frozen calibration observations exactly match calibration ownership. It checks known reviewer counterexamples.

**Crucial limitation:** A literal phrase appearing in evidence is necessary for a suggested `CLEAR` role, but not sufficient by itself. The phrase must *actually play the semantic role* asserted (existing premise vs generated product, tool vs result). This builder proposal is **not automatically authoritative** simply because its strings pass tests. Similarly, the preliminary context suggestions must not be treated as a fallback rule that everything readable is GENERAL.

## Reviewer attack priorities

- **False positives:** Official 016 and 018 propose **UNRESOLVED output** even though the claim mentions valuation/divisibility or a root theorem. Inspect all other output-positive rows for the same input/tool/result confusion.
- **False negatives:** Official 089, 094, 111, 119, 120 (and 077/102) propose explicit outputs; audit whether those and *all other positives* identify genuine produced mathematical conclusions. Check ambiguous intermediate representations separately.
- **Context:** Specifically examine 029, 052, 064 and 094 for warranted GENERAL, then adversarially challenge the **other GENERAL proposals** rather than accepting a blanket name-recognition heuristic. `RAW-OFFICIAL-044` and `115` are proposed PROBLEM_LOCAL; `010`, `069`, `126` remain provisionally UNRESOLVED.
- **Trigger roles:** A quoted mathematical object can be a constructed output rather than a condition. Audit any `CLEAR` trigger proposal for that confusion. Cases with no independently identified premise remain UNRESOLVED, not ABSENT.
- **Paraphrase stability:** Rephrase `is equivalent to`, `is reversible`, and `identifies a quotient` using equivalent mathematical English. A mere verb change must not silently remove a mathematical role or promote/demote grain.

## Guardrail before classifier integration

The v7 data is **not imported into** `buildGate3MassAssessment` or `granularity-ledger-v0.mjs`. The output of the existing v6 mass classifier and its distributions remains unchanged. An explicit further implementation and an **independent exact-head reviewer** are required before claiming any v7 classifier fix.

A robust v7 completion would first adjudicate the 127 role proposals (including negatives, disputed output spans and context), then apply only accepted candidate-owned evidence interpretations to **118 mass official** entries while mechanically preserving the nine calibration entries. It must test false-CLEAR and missed-CLEAR cases, paraphrase invariance and non-official thin-index fail-closed behavior; regenerate all 616 mass rows, their frozen distribution checks and duplicate-name audit; run exact-head CI; and seek fresh independent acceptance.

Nothing here starts the Gate 4 Tribunal, ontology, merging, splitting, prerequisites, rankings, combos, learning progression or productization.
