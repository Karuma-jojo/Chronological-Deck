# T22 Elite — M14 Verification & Publication Receipt

Date: 2026-09-26  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**  
Branch during publication: `codex/publish-m14`

## Current authoritative state

M14 is **published** in the shared T22 learner route.

- learner registry: M01–M14
- current learner frontier: **M14 / SIDE276**
- roadmap availability: **authored**
- semantic prerequisite status: **accepted**
- M15: **closed / planned**
- M14 architecture: **19 sessions**
- fixed assessments: **38**
- ownership claims: **60**

Publication was explicitly authorized by the user after independent adversarial acceptance.

## Accepted pre-publication evidence

The accepted candidate head before publication was:

`7558dc4a2b4454e1e99d601c318a3351455f963a`

Exact-head workflow:
- run #483
- run ID: `36224537927`
- conclusion: **SUCCESS**

That run included:
- syntax;
- inherited M01–M13 structural/semantic/evidence regressions;
- M14 structural/evidence contract;
- fixed-assessment math gate;
- 19/19 instructional-math gate;
- handoff-state checks;
- Chromium;
- real learner UI probe across 355 M14 learner surfaces.

The independent reviewer then closed FU-01 through FU-04 and accepted M14 content, architecture, pedagogy, assessments, ownership, Transfer/evidence distance, semantic separation, misconception discrimination and browser implementation.

## Publication changes

Publication advances only route/canonical state:

- `course/t22/generated/course-meta.json` registers SIDE276 as module 14;
- `course/t22/generated/roadmap.json` marks SIDE276 `authored`;
- `docs/t22-rebuild/SEMANTIC-PREREQUISITES.json` marks SIDE276 `accepted`;
- `course/t22/authoring/m14-side276.json` records user-authorized publication;
- M14 structural/browser tests now verify the **persisted published registry**, not test-only metadata interception.

No M15 content was opened or imported.

## Published evidence contract

The current M14 package preserves:

- 19 design-derived sessions;
- 38 current assessments;
- 60 ownership mappings with generalization-distance judgments;
- 38/38 semantic-separation rows;
- 21 decision audits;
- 19 concrete wrong-solver attacks;
- explicit 16/16 design-gate misconception coverage;
- versioned S07-T@2, S09-T@2, S11-M@2, S18-M@2 and S19-M@2 obligations.

The fixed-assessment math checker remains a hybrid arithmetic/property/review gate, not a machine proof oracle for prose proofs.

## Published browser contract

`scripts/test-t22-elite-m14-browser.mjs` now loads M14 through the **actual persisted M01–M14 course metadata**.

It verifies:
- 14 modules appear in the selector;
- SIDE276 loads as module 14;
- all 19 lessons;
- all 19 guided-feedback states;
- all 38 prompts;
- all 38 references and rubric surfaces;
- save → reveal → export → import → reload;
- no replacement-character or escaped-newline corruption;
- no 390px horizontal overflow.

## Closure rule

After publication, the required full workflow must pass on the exact publication head before the publication PR is merged to `main`. After merge, the normal `main` workflows/deployment are expected to run on the merge commit.

M14 should not be pedagogically reopened without new concrete evidence.

M15 remains closed until separately authorized.
