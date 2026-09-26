# T22 Elite — M14 Verification

Date: 2026-09-26  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**  
Branch: `codex/t22-pedagogical-rebuild`

## Authoritative current state

M14 is **unpublished**. M13 remains the learner frontier and M15 remains closed.

The 19-session architecture and mathematical spine survived both independent review rounds. The current candidate contains the final bounded follow-up repairs:

- **FU-01:** S14 ownership now says **apply and justify** the inverse-order rule rather than overclaiming a general proof.
- **FU-02:** `S09-T@1 → S09-T@2`; the Transfer now starts from a same-output collision and false finite-settings report, requiring reconstruction of the hidden zero-output direction and complete preimage family without a nullspace cue.
- **FU-03:** the wrong-solver ledger explicitly accounts for **all 16/16 design-gate failure modes**; 19 concrete current-task attacks are retained.
- **FU-04:** stale construction-state language and obsolete #462-as-current wording have been removed from the canonical verification/handoff contract.

The pre-follow-up fully green baseline was:
- head `41f3de9bf2e055efe8f2f717da55f0e56fd540b2`
- workflow #469 / `36222070177`
- all steps green, including the unpublished-M14 Chromium probe.

That run is historical evidence for the state before FU-01…FU-04. It is **not** used to self-certify a later commit.

## Exact-head verification rule

This file deliberately does not embed a supposedly permanent “latest” run number.

For independent acceptance, verify that the **required GitHub Actions workflow attached to the current branch HEAD** is green on that exact SHA. An older green run is insufficient after any content, evaluator, test or canonical-state edit.

Required layers:

1. syntax checks;
2. inherited M01–M13 structural/semantic/evidence regressions;
3. `scripts/test-t22-elite-m14.mjs`;
4. `docs/t22-course/audit/m14-math-checks.mjs`;
5. `docs/t22-course/audit/m14-instruction-math-checks.mjs`;
6. `docs/t22-course/audit/m14-handoff-checks.mjs`;
7. existing learner-browser regressions;
8. `scripts/test-t22-elite-m14-browser.mjs`.

The handoff message to the independent reviewer must name the exact final SHA and successful run URL/ID observed after these edits.

## Current evidence package

### Architecture / boundary
- 19 design-derived sessions
- 38 current fixed assessments
- 60 retained ownership claims
- formal prerequisite: M13 / ARC511
- no projection/least-squares, eigenstructure, QR/SVD, conditioning or matrix-calculus leakage

### Gate 5
Primary evidence classes use only:
- `retrieval`
- `proof reconstruction`
- `fresh Main evidence`
- `changed-surface Transfer`

Every Transfer slot is audited separately from its descriptive mechanism.

`S09-T@2` is the final material Transfer repair: it reverses the information direction from “particular solution + null direction → family” to “two unexplained colliding inputs → infer hidden zero-output structure → reconstruct every preimage.”

### Gate 7
All 60 ownership rows contain:
- precise claim;
- exact current public request;
- exact current rubric evidence;
- literal observer rationale;
- escape attempt;
- generalization distance;
- disposition.

S14's third ownership claim is now bounded to what its fixed observer literally elicits:
> Apply and justify the inverse-order rule ((AB)^{-1}=B^{-1}A^{-1}) for compatible invertible square matrices, and reject a two-sided inverse for a nonsquare matrix from unequal domain/codomain dimensions.

### Gate 8
The semantic-separation ledger covers exactly the 38 current tasks. Each row records:
- closest answer-bearing instructional comparator(s);
- mathematical-instance difference;
- exposure disposition.

The S09 row is keyed to current `S09-T@2`, not the retired `@1` obligation.

### Misconception falsification
The design gate lists 16 explicit failure modes. The canonical audit now has:
- 19 concrete wrong-solver cases with stable case IDs;
- a 16-row `designGateCoverage` table;
- exact current task and rubric rows for each attack or paired coverage.

New explicit attacks include:
- basis images falsely treated as insufficient;
- row-dot-only matrix-vector understanding;
- row operations falsely believed to alter the solution set;
- rank confused with row/column count;
- nonsquare matrix treated as having a two-sided inverse;
- area/volume scaling substituted as determinant definition.

### Mathematical verification scope
`m14-math-checks.mjs` is a hybrid gate:
- executable arithmetic/property reconstruction where appropriate;
- targeted invariants and counterexamples;
- reviewed reference assertions for prose obligations.

It is not a machine proof oracle for prose mathematics. Human semantic review remains required.

`m14-instruction-math-checks.mjs` separately checks learner-facing worked/guided mathematics across all 19 sessions.

### Learner UI
`scripts/test-t22-elite-m14-browser.mjs` loads unpublished M14 into the **real learner UI** through test-only metadata interception. It exercises:
- 19 session/lesson surfaces;
- 19 staged guided-feedback states;
- 38 public prompts;
- 38 evaluator references and all rubric rows;
- save → reveal → export → import → reload;
- text corruption checks;
- 390px horizontal-overflow checks.

The persisted learner registry remains M01–M13.

## Version / provenance

Earlier v1.2 version receipt:
- `docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json`

Final follow-up version receipt:
- `docs/t22-course/audit/m14-followup-pre-fu-repair-version-receipt.json`

Current versioned assessment obligations:
- `S07-T@1 → S07-T@2`
- `S09-T@1 → S09-T@2`
- `S11-M@1 → S11-M@2`
- `S18-M@1 → S18-M@2`
- `S19-M@1 → S19-M@2`

M14 has never been placed in the shared learner registry, so these repairs do not silently recertify learner-route M14 evidence.

## Independent acceptance boundary

Builder-side verification can establish that the repaired candidate is internally coherent and implementation-green. It cannot create independence.

The focused independent reviewer should now recheck:
1. S14 ownership verb versus actual Transfer/rubric;
2. S09-T@2 evidence distance and decision audit;
3. 16/16 design-gate misconception coverage;
4. canonical-state hygiene;
5. exact current branch SHA and its required full green workflow.

Only that reviewer may close the remaining independent-acceptance hold.

**Do not publish M14, merge it to main, or open M15 before that closure.**
