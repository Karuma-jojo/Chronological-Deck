# M03 independent review — bounded repairs required

Date: 2026-09-18
Reviewed branch: `codex/t22-pedagogical-rebuild`
Reviewed head: `e0fc59c36e79bee8e6767e666803020461c5e32e`
M03 authored source: `course/t22/authoring/m03.json`
Verdict at review time: **Mathematical backbone passed; independent pedagogical acceptance was withheld pending M03-01 through M03-04.** Current status: **all four repairs implemented and validated; bounded re-review pending.**

This is a review of the new T22 Elite M03, not historical T22. No course tasks, runtime or user evidence were modified by this review. Do not propagate the affected authoring patterns to later modules before repair.

## Resolution update — 2026-09-18

M03-01 through M03-04 have been implemented and fully validated in the bounded repair pass. Repair implementation checkpoint: `439e0bc55ff694d9d188f8b76bfb8dabca4b7adb`; GitHub Actions run `35329318149` — **SUCCESS**. See `M03-RESOLUTION.md` for exact changes, provenance handling and validation history.

The original findings below remain as the immutable review record. Status is now **repaired, awaiting bounded independent re-review before M04**.

## What was checked

- Read every session's lesson, all 150 ownership claims, all 60 public Main/Transfer tasks, and all 60 evaluator references.
- Inspected proof assessments S09–S14, mapping S20–S22, counting S23–S30, coverage directions and representative marking contracts.
- Re-ran `scripts/test-t22-elite-m03.mjs` and `docs/t22-course/audit/m03-handoff-checks.mjs`: both PASS on the reviewed snapshot.
- Verified GitHub Actions run 35325912278 actually completed successfully at accepted implementation `2fab663fea7395a6c20ba49b338708e52c562b8b`; run 35325699018 also succeeded at `d3f3e8b70abf51e297c545fdc739ad506262e90f`.
- Read the recorded browser-test implementation. Did not rerun Chromium locally in this review; browser evidence above is the verified remote run.
- Added and ran `docs/t22-course/audit/m03-independent-math.mjs`: independent enumeration confirms repeated-letter/labeled-team counts, distributions, divisibility union, consecutive-integer pigeonhole guarantee, mixed-parity subsets and surjections. In particular, the synthesis counts 48 and 36 are correct.
- No incorrect mathematical result was found in the manual review. This is not a proof that every possible interpretation or future learner response is covered.

The structural gates pass despite the findings below. Literal phrase separation and a rubric that repeats a claim do not establish semantic separation or observability.

## M03-01 — Instruction and fixed assessment overlap (high)

Concrete evidence:

- **S29:** lesson's solved example is exactly the Main's 25 records / 6 categories / at least 5 result. Its guided check is also the Main's 13 people / 12 months subtask.
- **S22:** lesson already states that same remainder modulo 2 partitions integers into even and odd classes. Main asks the same relation in parity language and the same classes. The proof obligations remain, but part of the fixed answer is supplied.
- **S11:** guided check is the Transfer theorem itself, with the same greatest integer N and N+1 route. This is exact prior rehearsal, although the guided check does not itself print a complete proof.
- **S12:** guided check asks for the squares of 2q and 2q+1 modulo 4, the decisive cases of Main. This is targeted rehearsal, not merely generic prerequisite instruction.
- **S18:** Main explicitly asks for the identity A\\B=A∩B^c, and its reference supplies it; Transfer asks for the same identity's proof. A completed Main may already include exactly this proof. It is a valid extension if so labeled, but not a reliably fresh transfer probe.

Do not call all these exposures identical: solved fixed-answer leakage, guided rehearsal and a same-problem follow-up have different provenance implications. Shared methods are expected; exact task reuse cannot be labeled unfamiliar independent transfer.

Required repair:
1. Audit all 30 lessons against both fixed tasks semantically, replacing the examples/guided checks that rehearse the fixed task or reveal its answer; retain proper teaching.
2. Replace S18 Transfer with a genuinely different set-identity application, or explicitly treat the current item as scaffolded follow-up and add the needed independent transfer.
3. Protect historical exact-answer exposure (at least S22/S29) using the established versioned, timestamp-aware provenance mechanism; preserve pre-exposure evidence and avoid contaminating every ordinary lesson indiscriminately. Document how rehearsed items are treated.
4. Update instruction versions, changed assessment obligation versions/fingerprints, separation ledger and task-specific regressions. A changed wording prefix is not sufficient evidence of separation.

## M03-02 — Novice explanations are missing behind “Worked example” labels (high)

Concrete examples:

- **S14:** “Representing sufficiently large integers using 2s and 3s can use several base cases and an earlier reduction” is a suggestion, not a worked strong-induction proof. It never supplies a threshold, verifies bases or shows that the reduced case falls inside the hypothesis.
- **S17:** the worked example gives sets and says “compute each operation,” but never computes any.
- **S18:** the worked example says “Prove the complement-of-intersection De Morgan law” without a membership argument. The guided check similarly asks for an unspecified generic identity.
- **S22:** reflexive, symmetric, transitive, equivalence class and partition are named without defining their conditions. These definitions are absent from its stated M03 prerequisites and are the new objects the student must use.
- **S27:** the formula is given and a two-box answer asserted, but no stars/separators construction explains the bijection or the n+k−1 positions. This leaves the purported fundamentals route relying on memorization.
- **S29:** the ceiling symbol is used without an explicit local definition or a precise earlier owner in the prerequisite audit.

Required repair:
- Supply actual complete worked reasoning on distinct instructional data for the affected sessions; complete a short scan of all 30 to catch other request-only examples.
- Define each genuinely new term/symbol at first use or cite its exact earlier taught session. Expand the prerequisite audit beyond a list of general prerequisite module names.
- For S14 show bases, hypothesis range, reduction, range check and conclusion. For S22 give the quantified conditions and explain classes/partition. For S27 show the objects-to-stars-and-bars correspondence and why it counts each distribution once.
- Do not inflate the course with extra sessions just to satisfy these repairs. Bounded inline instruction is sufficient unless a substantive new capability is identified.
- Strengthen the quality gate beyond testing that the strings “Worked example:” and “Guided check:” occur.

## M03-03 — S21 claim 5 still maps to a task that does not ask it (medium)

S21 claim 5: “Explain non-bijection lacks a two-sided inverse.”

Its `claimEvidence` and `coverage` point to **Main**, which supplies a bijection and asks for its inverse. Main does not ask about any non-bijection. Its rubric nevertheless awards this ownership claim.

Transfer already supplies a surjective noninjective map and explicitly asks why no two-sided inverse exists. Map the claim there, with a concrete evaluator criterion, and remove the unasked Main scoring obligation. Rebalance scores without weakening the real Main requests.

Audit the other mappings for the same error. The existing validator checks that the task and rubric strings match the ledger, not that the task actually observes the claim. Pin this corrected direction in a regression. “150/150 links exist” must remain distinct from “150/150 semantically observed.”

## M03-04 — Three-event inclusion–exclusion enters synthesis without a bridge (medium)

S28 teaches and assesses only two-set inclusion–exclusion. S30 Transfer asks the learner to use inclusion–exclusion on three missing-output events. Its reference/rubric expect subtracting single-missing events and adding pairwise intersections. Neither S28's lesson nor S30's brief synthesis note explains the three-event correction or explicitly frames deriving it as the task.

The answer 36 is correct. The problem is the learning/assessment contract.

Required repair, choose one:
- Teach/derive the three-set identity earlier on distinct data and assess the correction logic before this transfer; OR
- Explicitly make derivation from previously owned two-set counting the new investigation, with a prerequisite-safe instruction path and a rubric that accepts the derivation. Do not imply it was already taught.

For the surjection count, make clear that missing-output events are sets of functions, determine their intersections, and account for the triple intersection. This remains deterministic finite counting; probability is not needed.

## Additional quality notes (nonblocking unless they prevent the repairs)

- 26 of the 30 Transfer rubrics use the same five generic criteria. References often help, but task-specific proof/assumption criteria would make review more reliable. Prioritize repaired tasks and proof bottlenecks; do not rebuild all rubrics for appearance.
- Some Main prompts prescribe the proof route heavily. That is acceptable for initial method acquisition, but later synthesis should provide genuine method choice. Avoid treating the existence of Main + Transfer labels as sufficient evidence of independent reconstruction.
- RUN-LOG had obsolete active-sounding M02/M03 “next” sections and an r1 dependency-version reference despite r2. This review updates its current status and labels those old next steps historical.
- Automated mathematics checks are finite examples/enumerations. They do not replace checking a universal proof or piloting the teaching with a real novice.

## Acceptance and efficient continuation

1. Sol repairs **M03-01–M03-04** only, records exact changes and validation in `M03-RESOLUTION.md`, updates the handoff, and pushes a verified checkpoint.
2. Reviewer checks the changed content and exposure/coverage regressions, not a fresh audit of unchanged M01–M03.
3. After acceptance, build **M04 only** and stop for review. Probability is a high-dependency foundation for M05/M06, so a mistaken convention or hidden prerequisite could spread immediately.
4. If M04 has no substantial unresolved findings, try a **two-module batch M05–M06**, still completing, validating, documenting and pushing each module separately.
5. Move to batches of up to three only after that trial is clean. Stop earlier for semantic/prerequisite uncertainty, any failed gate, exposure/evidence-runtime changes, or a new high-dependency technical foundation.
6. Keep per-module handoffs and checkpoints even when external reviews are batched. Batching reviews must not mean batching unfinished validation or withholding pushes.

Recommendation: **not yet three modules unattended**. The implementation workflow is improving, but recurring semantic separation and observability defects mean “green checks” still need a human-quality content review. These are bounded repairs, not grounds to discard M03 or restart the course.
