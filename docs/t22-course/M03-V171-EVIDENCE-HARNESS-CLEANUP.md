> **Superseded for current-state claims by `M03-FINAL-PUBLICATION.md`.** v1.7.1 remains the tested evidence-harness history; the v1.7.2 closeout adds no S01–S30 mathematics and records final source/pedagogy documentation plus clone-audited Spire labs.\n\n# M03 v1.7.1 evidence-harness cleanup

Status: **candidate — independent confirmation required**

This is a narrow cleanup of the machinery that proves the already-closed M03 content contract. It adds **no new mathematics, sessions, tasks, ownership or pedagogy**.

## Baseline

Independent review baseline: `4dd7b5b063c8d3f8e37089bbb31f9336de62f24e`.

The reviewer accepted:

- mathematical correctness;
- 30/60/150 architecture;
- S24 instruction/Transfer repair;
- S25 factorial-only boundary repair;
- S26 Main-v5 / Transfer-v3 observability;
- the v1.7 learner pack in substance.

Freeze remained withheld because the evidence harness itself contained stale or semantically inaccurate metadata/tests.

## v1.7.1 repairs

### 1. Static T22 Elite harness

`scripts/test-t22-elite-m03.mjs` now tests the current contract rather than the superseded v1.2/v1.6 state:

- current coverage/status text;
- `awaiting-independent-confirmation`;
- builder-updated semantic-receipt states;
- effective session-level instruction versions;
- S26 v5 observer semantics;
- evidence-distance v17;
- S25 session-specific provenance;
- exact decision-audit adjudications.

Cross-module/downstream guards were also reconciled without disabling them:

- M10 now consumes S26-M v5;
- the protected M03 semantic row in M10 is refreshed while all other protected semantic rows remain unchanged;
- M09/M10/M11/M12 preserved-baseline M03 hashes are advanced to the authorized v1.7.1 M03 source.

### 2. Semantic-receipt truth

The stale S21/S28/S29/S30 narratives are repaired:

- S21-M = retrieval;
- S28-M = retrieval/application;
- S29-M = proof reconstruction;
- S30-M = proof reconstruction/integration;
- S28 teaches/derives the three-set inclusion-exclusion bridge;
- S30 is the first fixed synthesis assessment applying that bridge.

`evidenceDistance.version` is now `m03-evidence-distance-v17-r1`.

### 3. Decision-audit readjudication

All 16 fresh/changed-surface rows are adjudicated against the **specific named decision**, not merely whether the underlying theorem is known.

Each row separately records:

- whether that decision is effectively supplied/cued by the public prompt;
- whether that same decision/representation is visibly rehearsed in the session lesson.

Key hostile-review cases:

- S29-T consecutive-pair hole design: **false / false**;
- S25-T fixed-member constraint: **true / false**;
- S27-T monomial/exponent-vector recast: prompt-cued, **not visibly rehearsed**;
- S28-T divisibility-set recast: prompt-cued, **not visibly rehearsed**.

These booleans are descriptive metadata, not task-quality scores.

### 4. S25 lesson provenance

S25 now has session instruction version:

`m03-s25-instruction-v17-factorial-boundary-r1`.

This records the real v1.7 lesson change from combination-based multinomial derivation to the factorial-only bridge.

S25 is **not** added to `historicalLessonAnswerOverlap`: content-version provenance does not imply historical answer contamination.

### 5. End-to-end S24 provenance browser regression

The Chromium course-browser suite now checks the entire runtime path:

- loader preserves S24's session-specific instruction version;
- a clean current S24 lesson view stores `m03-s24-instruction-v17-separation-r1`;
- S25 stores its own provenance version without generating answer exposure;
- seeded old-v1.6 S24 lesson exposure migrates to S24-T answer exposure after reload;
- a later S24-T attempt is recorded as reference-seen/revealed.

This complements the core/unit migration test.

## Current truth

- **M03 content:** closed.
- **M03 mathematics:** unchanged from accepted v1.7 repair.
- **Architecture:** 30 sessions / 60 stable task IDs / 150 ownership claims.
- **Historical semantic boundary:** accepted.
- **Current evidence-harness candidate:** awaiting independent confirmation.
- **Freeze:** withheld.

## Remaining freeze gates

Do not claim freeze from PR-green checks alone.

Still required on the exact final SHA:

1. the real `T22 Elite checks` workflow via `workflow_dispatch`;
2. successful static/semantic/evidence jobs;
3. successful Chromium browser evidence workflow;
4. recorded exact SHA + workflow run ID + T22 Elite job ID + Chromium result;
5. live nasty-session + both Strategy-Lab pilot;
6. fresh independent confirmation of the exact SHA and v1.7.1 learner pack.

No further speculative M03 content changes are authorized in this cycle.
