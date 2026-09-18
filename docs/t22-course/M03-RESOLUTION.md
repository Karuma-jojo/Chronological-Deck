# M03 RESOLUTION — Astra findings M03-01 through M03-04

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Reviewed findings source: `docs/t22-course/M03-ASTRA-REVIEW.md`  
Repair implementation checkpoint: `439e0bc55ff694d9d188f8b76bfb8dabca4b7adb`  
Full implementation validation: GitHub Actions run `35329318149` — **SUCCESS**  
Status: **ALL FOUR FINDINGS IMPLEMENTED AND VALIDATED; BOUNDED INDEPENDENT RE-REVIEW REQUIRED BEFORE M04**

## Repair scope

This pass repaired M03 only. It did not author M04, merge to `main`, deploy GitHub Pages, migrate historical T22 progress, alter T25 state, or change the T22 Elite evidence key.

The repair chain after the independent review head is:

1. `91d34e52b8ca5b6a39838bb932a45b0781782723` — repaired teaching, assessments and provenance; added focused repair gates.
2. `995c10729a1bcfbf0873b8d948dbcc93b9c98685` — repaired a validator helper omission and added real Chromium M03 legacy-exposure regression.
3. `439e0bc55ff694d9d188f8b76bfb8dabca4b7adb` — repaired null-unsafe browser wait timing; complete suite green.

Changed implementation/test files:

- `course/t22/authoring/m03.json`
- `js/t22-course/core.js`
- `js/t22-course/ui.js`
- `scripts/test-t22-elite-m03.mjs`
- `scripts/test-t22-elite-course-browser.mjs`
- `docs/t22-course/audit/m03-repair-checks.mjs`
- `.github/workflows/t22-elite-checks.yml`

## M03-01 — instruction / fixed-assessment overlap

**Resolved.**

Repairs:

- Completed a recorded semantic lesson-vs-Main-vs-Transfer audit for all **30/30 sessions** in `semanticSeparationAudit`. This is a manual semantic record in addition to literal separation fingerprints.
- **S11:** replaced the exact “greatest integer N / N+1” Transfer rehearsal with a distinct no-smallest-positive-rational worked contradiction and a different guided contradiction.
- **S12:** replaced the decisive modulo-4 Main rehearsal with a complete modulo-3 square proof and a different parity-cube guided check.
- **S22:** replaced the parity-class answer-bearing example with a fully worked “same last digit” equivalence relation on `{11,12,21,22}`.
- **S29:** replaced the exact 25-record / 6-category / at-least-5 answer and the 13/12 subtask with a distinct 17-files / 4-folders ceiling proof plus a 10-socks / 3-drawers check.
- **S18 Transfer:** replaced `A\B=A∩B^c` with the genuinely different distributive identity
  `A∩(B∪C)=(A∩B)∪(A∩C)`; its `obligationVersion` is now **2** with a task-specific evaluator.

### Historical exposure preservation

M03 instruction version is now:

`m03-instruction-astra-r1`

The authoring pack contains a targeted historical-overlap ledger for still-current fixed tasks whose old lesson materially rehearsed or revealed them:

- S11 → Transfer
- S12 → Main
- S22 → Main
- S29 → Main

The runtime migration was generalized from an M01-only course policy to module-pack policies and now compares each session against its own current `instructionVersion`.

This preserves the original attempt records and timestamps. A legacy lesson exposure is converted to `lessonAnswerSeenAt` / `referenceSeenAt` only from the historical exposure timestamp onward. Attempts before that timestamp remain preserved and are not retroactively rewritten.

S18-T and S30-T are materially new `obligationVersion=2` assessments; old lesson exposure is deliberately **not** projected onto their new content.

The evidence key remains unchanged:

`chrono_t22_elite_course_evidence_v1`

## M03-02 — novice instruction hidden behind labels

**Resolved.**

The cited sessions now contain actual worked reasoning rather than request-only placeholders:

- **S14:** complete strong-induction example for every `n≥12` being representable as `4a+5b`: four bases, all-prior hypothesis, `k−3` range check, reduction and conclusion.
- **S17:** union/intersection/difference/complement example is fully computed.
- **S18:** complete arbitrary-element iff proof of `(A∩B)^c=A^c∪B^c`.
- **S22:** reflexive, symmetric and transitive are defined with quantified conditions; equivalence class and partition are defined and exemplified.
- **S27:** stars-and-bars now gives the object-to-string bijection, explains the `n+k−1` positions and works a 5-token/3-box example.
- **S29:** `⌈x⌉` is locally defined as the least integer ≥x and the generalized occupancy bound is justified by capacity contradiction.

The short scan also strengthened thin worked reasoning in S10, S13, S19, S20, S21, S23, S24, S28 and S30 without adding sessions.

Prerequisite audits were made concrete for S14, S17, S18, S22, S27, S29 and S30. New symbols/objects now point either to exact prior sessions or to an explicit bounded JIT definition inside the current lesson.

The new `m03-repair-checks.mjs` gate goes beyond marker presence: it checks substantive worked-example length on the repaired bottleneck sessions and pins exact definitions/derivations for equivalence relations, stars-and-bars and ceiling notation.

## M03-03 — S21 claim 5 mapped to the wrong task

**Resolved.**

Claim 5, “Explain non-bijection lacks a two-sided inverse,” is now mapped to **Transfer**, where the public task actually supplies a surjective noninjective map.

Main was rebalanced to score only its real requests:

- injectivity;
- surjectivity;
- bijectivity;
- inverse construction;
- verification of both inverse compositions.

Transfer now has concrete criteria for:

- the collision `g(1)=g(2)=a`;
- surjectivity;
- why one inverse output cannot recover both colliding inputs;
- the no-two-sided-inverse conclusion;
- preimage versus inverse-function distinction.

The standing Transfer-direction regression is now:

- S21 claim 5;
- S25 claim 3;
- S28 claim 5;
- S29 claim 4;
- S30 claims 4–5.

Thus **150/150 links exist** remains separate from the stronger statement **150/150 were semantically re-audited**.

## M03-04 — three-event inclusion–exclusion missing bridge

**Resolved.**

S28 now derives the three-set identity from the already owned two-set rule on generic set data:

`|A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|`.

S30 Transfer is materially revised and versioned to `obligationVersion=2`. It now explicitly asks the learner to:

1. prove noninjectivity by pigeonhole;
2. count all functions;
3. define `Ei` as the **set of functions** missing codomain value `ci`;
4. derive/justify the three-event correction from the two-set rule (or via membership multiplicities);
5. compute single-event, pairwise-intersection and triple-intersection sizes;
6. use those sets to count surjections.

The reference now makes the structure explicit:

- total functions: `3^4=81`;
- each `|Ei|=2^4=16`;
- each `|Ei∩Ej|=1`;
- `|E1∩E2∩E3|=0`;
- nonsurjective union: `48−3=45`;
- surjections: `81−45=36`.

The evaluator gives credit for deriving or justifying the three-event signs; merely quoting 36 is insufficient.

## Validation evidence

### Failed-but-useful repair runs

- Run `35329062270` at `91d34e5…`: syntax passed; M01/M02 gates passed; M03 validation stopped because the strengthened test referenced an undefined local helper `by`. This was a **test-harness defect**, not a content assertion.
- Run `35329197291` at `995c107…`: all static/semantic/evidence gates passed. Chromium stopped because the new reload wait dereferenced `#session` before DOM attachment. This was a **browser-test timing defect**; the provenance test itself had not failed.

Neither defect was bypassed; both checks were repaired.

### Full green repair implementation

Run `35329318149` at `439e0bc55ff694d9d188f8b76bfb8dabca4b7adb`: **SUCCESS**.

Passed:

- syntax;
- M01 and M02 standing regressions;
- M03 30 sessions / 60 tasks / 150 claims;
- 30/30 semantic-separation audit presence;
- substantive repaired worked-example checks;
- S18-T and S30-T obligationVersion-2 checks;
- S21 claim-5 Transfer mapping;
- targeted historical-overlap ledger;
- timestamp-aware migration idempotence;
- independent M03 enumeration checks;
- 65-module semantic gate;
- handoff/current-state gates;
- real Chromium with M01+M02+M03;
- real Chromium M03 historical lesson migration preserving a pre-exposure attempt and marking later work revealed;
- cross-module drafts/evidence/export-import;
- corrupt-storage preservation;
- mobile-width invariant.

## Bounded re-review target

The independent reviewer does **not** need to re-audit unchanged M01/M02 or all unchanged M03 material. Review the repaired surfaces:

- S11, S12, S18, S22, S29 semantic separation;
- S14, S17, S18, S22, S27, S29 novice instruction;
- S21 claim/evaluator direction;
- S28 three-set bridge;
- S30 revised Transfer;
- targeted historical-exposure migration behavior.

If these repairs are accepted, M03 may be frozen and M04 can be explicitly opened under a fresh boundary audit.

**STOP: M04 remains un-authored pending this bounded repair review.**


## Independent bounded acceptance supplement

See `M03-ASTRA-FOLLOWUP.md`: all four findings accepted after independent review of Sol head `dee1d3b2057b61b2cc7bc27acaffc2ba7734b3e5`. The reviewer removed the unasked S21 Transfer preimage-comparison scoring criterion described above and reassigned its 2 marks to the required collision-based inverse-impossibility explanation. Focused gates passed, including evidence qualification before/after historical exposure. The former stop-for-re-review instruction is now superseded: the next authoring boundary is M04 only, followed by review.
