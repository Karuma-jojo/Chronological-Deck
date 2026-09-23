# M05–M06 bounded independent follow-up — ACCEPTED

Date: 2026-09-24  
Branch: `codex/t22-pedagogical-rebuild`  
Reviewed branch head: `26fa5afcd7e0beeb68606317da9d1cc626f27fb6`  
Repair implementation checkpoint: `efea44476e30a0daf45675e15889788e082900a2`  
Prior independent review: `M05-M06-ASTRA-REVIEW.md`  
Repair resolution: `M05-M06-RESOLUTION.md`

## Decision

**All Astra M05–M06 findings are closed. M05 and M06 are accepted and may be frozen. M07 remains unopened.**

This is a bounded independent follow-up of the repaired batch, not a new claim that unchanged M01–M04 were re-audited end to end.

## Findings independently verified

- **BATCH-01 — full-suite validation:** closed. The repaired implementation passed T22 Elite Actions run `35917978076` at exact `head_sha=efea44476e30a0daf45675e15889788e082900a2`. Syntax, structural/pedagogy/semantic/evidence regressions, browser dependency installation, Chromium installation and the real browser evidence workflow all completed successfully.
- **M05-01 — fixed-assessment rehearsal:** closed. The repaired M05 instruction uses distinct worked/guided data for the previously overlapping S15, S16 and S18 material; S20 was also separated during the repair audit. Fixed Main/Transfer obligations remain versioned where materially changed.
- **M06-01 — repeated exact worked answers:** closed. The named S05, S18, S20, S22 and S23 overlaps are removed, and the repair also corrected additional cross-session/subanswer overlaps in S10, S19 and S24. Current lessons teach the method without replaying the fixed assessment answers.
- **BATCH-02 — positional claim mappings:** closed. All 240 ownership claims were re-audited against the actual public requests and semantic rubric rows. Main/Transfer and multi-row mappings are permitted where they are the genuine observer. Persistent semantic checks pin the reviewed contracts and reject wrong-row mutation.
- **BATCH-03 — unrequested scoring:** closed. The affected public prompts/evaluators now request the explanations or comparisons that are scored; negative accuracy/scope guards do not invent extra essay requirements.
- **M05-02 — ruin path distinction:** closed. M05 S12 Transfer now has absorption at zero and first-hit prefixes `L` and `WLL`; first-passage ruin probability is `.496`, while endpoint-only counting gives `.352`. The task therefore discriminates the intended path reasoning.
- **Historical exposure/version handling:** closed. Old answer-bearing lesson exposure is migrated conservatively; unsolved guided practice is not fabricated as a reveal. Changed fixed contracts use obligation version 2 while stable IDs and the shared evidence store are retained.

## Independent content checks

The follow-up re-read the repaired high-risk sessions rather than relying on the resolution prose alone.

### M05

- S02 explicitly separates normalization, expectation setup/value, sign interpretation and one-play caveat.
- S09 publicly requests both linearity reasoning and the realized-total distinction that the rubric scores.
- S12 teaches finite first-hit/absorption/prefix accounting and tests it with a transfer where endpoint reasoning fails.
- S13 distinguishes a hard feasibility constraint from an optimal sizing rule.
- S15 guided data are distinct from the fixed 20% recovery transfer.
- S16 guided data are distinct from the fixed sure-2 versus 8(.25)/0(.75) transfer.
- S18 worked utility table is distinct from the fixed `u(80),u(100),u(140)` assessment and explicitly limits interpretation to the supplied preference model.
- S20 states maximin as an explicit criterion rather than a universal recommendation.

### M06

- S01 makes both conditioning denominators explicit.
- S05 now demonstrates non-identifiability with distinct instructional data while the fixed assessment compares its own supplied completions.
- S10's ownership claim accurately says the finite population is supplied, not independently chosen.
- S13 scores relative likelihood magnitude without importing the posterior-odds identity from S14.
- S16 Transfer explicitly requests the same-LR/different-prior comparison that is scored.
- S18 uses chain-rule conditional likelihoods and no hidden independence assumption.
- S19 tests conditional independence separately under both hypotheses.
- S20 multiplies LRs only under stated conditional independence under both hypotheses.
- S22/S23 separate prior sensitivity from likelihood/model sensitivity.
- S24 requires a calibrated model-conditional conclusion and no decision recommendation.

## Provenance and evidence verification

The shared key remains:

`chrono_t22_elite_course_evidence_v1`

The repair runtime preserves:

- stable session/task IDs;
- assessment fingerprints and obligation versions;
- stale prior-contract attempts rather than deleting them;
- pre-exposure attempts where legitimately independent;
- post-exposure disqualification for answer-bearing historical lesson overlap;
- merge-order invariance for historical exposure migration;
- export/import/reload behavior;
- no automatic macro-module clearance.

M05's old S18 solved lesson overlap is tracked. M06's documented solved-overlap sources are mapped to their affected fixed tasks. Old unsolved guided exercises remain practice provenance only.

## Validation evidence

Verified directly from GitHub:

- Workflow: **T22 Elite checks**
- Run: **35917978076**
- Exact repair SHA: `efea44476e30a0daf45675e15889788e082900a2`
- Run status: `completed`
- Conclusion: `success`
- Job: `107374356454` — `validate`
- Every workflow step concluded `success`, including:
  - Syntax checks
  - Structural, pedagogy, semantic and evidence regressions
  - Browser-test dependency install
  - Chromium install
  - Browser evidence workflow

The current branch head `26fa5afc...` is exactly one documentation-only commit after that repair implementation. Comparing implementation → reviewed head changes only M05/M06 resolution/handoff/RUN-LOG documentation; no authoring/runtime/test content changed after the green implementation.

## Scope and freeze

No new repair is required in M05 or M06.

This acceptance does **not**:

- author M07;
- merge the rebuild branch into `main`;
- deploy the T22 Elite course;
- modify T25;
- migrate legacy T22 progress;
- claim learner-piloted difficulty/retention calibration.

M05 and M06 may now be treated as the accepted six-module course frontier. Per the original autonomy recommendation, **M07 alone** should be the next authoring trial when authorized; do not jump directly to unattended multi-module batches.

## Final state

**M05: accepted/frozen.**  
**M06: accepted/frozen.**  
**All findings in `M05-M06-ASTRA-REVIEW.md`: closed.**  
**M07: closed / not authored.**
