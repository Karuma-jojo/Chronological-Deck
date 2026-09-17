# T25 course build — recovery checkpoint

Updated: 2026-09-17. Status: IN PROGRESS. Not deployed and not learner-piloted.

## Resume here, do not restart

Repository: https://github.com/Karuma-jojo/Chronological-Deck

Working branch: `codex/t25-complete-course`.

Base: `43ae1373bc33083dbe5a14eba174300dae44f5d8` (six audited card repairs, PR #155).

Latest problem-bank checkpoint before this log: `6a8dc334ea57dceb0b0824c9e4f2472e046b4d22`.
The branch tip and this file's Git history are authoritative for later checkpoints.

**User instruction:** push completed work to this branch as it is made. Update this log with each completed batch. Do not leave the sole copy in scratch. Do not repeat completed authoring because a chat context or workspace disappears. Clone/fetch this branch first, read this log, inspect the diff and continue from the first incomplete item.

## Scope and constraints

Build a complete ISI M.Stat T25 course around the existing audited 80-target / 162-session chronology: original problems, evaluator references, prerequisites, review/mixed assessment, an optional anime campaign, and compiler integration. Keep stable IDs, current card contracts, previous clearances and the frozen SPIRE Master/Guardian/extractor unchanged. WALL must never acquire clues through dialogue, imagery, reactions or story consequences. No penalties for pauses or incorrect attempts. Do not promise admission or claim a numeric quality rating has been validated.

## What is durable now

All seven `course/authoring/phase-N.mjs` files are on this branch. Each row is:
`[routeOrder, learningNote, mainPrompt, mainReference, transferPrompt, transferReference]`.

| File | Sessions | Original problems |
| --- | --- | --- |
| phase-1.mjs | 1–26 | 52 |
| phase-2.mjs | 27–50 | 48 |
| phase-3.mjs | 51–80 | 60 |
| phase-4.mjs | 81–100 | 40 |
| phase-5.mjs | 101–118 | 36 |
| phase-6.mjs | 119–142 | 48 |
| phase-7.mjs | 143–162 | 40 |

Total: 162 lessons, 324 original tasks and corresponding evaluator references. The tasks were reconstructed after the first uncommitted workspace disappeared. They are not byte-identical to that lost build. Do not report the old build's checks as checks of these files.

Each rebuilt phase passed `node --check` locally. Remote file fetch confirmed phase 7 is accessible on the branch. No complete mathematical, coverage or browser validation has run on this rebuilt bank yet.

## Next work (ordered)

1. Fix session 70 main wording: it currently requests a false bound as a proof; change to explicitly ask the learner to prove or refute that bound (reference already identifies the correct direction).
2. Recover/copy the v2 syllabus traceability metadata; current repository contracts remain authoritative over historical source wording. Local recovery found the complete 2026-09-14 audit package (80 targets / 162 sessions), including the 392-row classification ledger and 47-row scope crosswalk. Preserve source provenance; do not claim independently solving all 392 problems.
3. Add 3 prerequisite bridges (induction; integer/parity; partial derivatives and planar integration), 7 phase synthesis tasks, objective calibration questions, 7 phase sets and 5 cumulative written sets. Label reused problems as exposed, never as unseen mocks.
4. Add deterministic build script for public course data, separate evaluator data, current-contract hashes and generated syllabus. Enforce exact 162-card mapping and source crosswalk validity.
5. Add browser study page, isolated local evidence log with export/import, answer-before-reference gate, exposure tracking, optional notes, delayed review and campaign. No automatic academic clearance.
6. Update λ compiler with optional frozen course packet and ANIME narrative contract; preserve original runtime authority. Link new page from existing T25 selector.
7. Run structural/evidence tests, selected independent symbolic/exhaustive mathematics checks, existing T25 checks and desktop/mobile browser tests. Record actual results and limitations in this log and release notes. Fix defects before publication.
8. Finish documentation and PR. Keep draft status while validation is incomplete. Do not claim website deployment merely because a branch/PR exists.

## Known review points

- References are concise and some spacing needs editorial cleanup, especially phase 7.
- A pair of problems does not automatically establish every item in a card's required ownership. Compiler/evaluator must map observed evidence and request a bounded fresh probe for any unobserved obligation.
- Delayed repetitions from this bank are retention evidence, not unseen transfer.
- Static files can hide solutions from normal display but cannot provide cryptographic secrecy.
- Session 124 intentionally distinguishes density endpoint conventions and a supremum from an attained MLE.
- Preserve six repaired distinctions: null vs empty overlap (35), Cauchy negative powers (89), singular diagonal mass (110), valid consistency counterexamples (114), two distinct MVUE certificates (130), zero residual df at Latin square p=2 (160).

## Recovery and publication mechanics

A normal HTTPS git push had no available terminal credentials. The authenticated GitHub connector successfully created trees, commits and advanced this branch without force. This is a real remote branch, not merely a local commit. Continue using that connector if terminal authentication is unavailable; do not seek or print credentials.

For a checkpoint: read complete changed UTF-8 files, create a tree based on the current remote tree SHA, create a commit with current remote head as parent, update the branch without force, then verify returned success. Preserve concurrent remote work. Record the checkpoint's contents and checks in this file. A commit cannot contain its own SHA; use the branch tip/Git history or record the preceding checkpoint SHA.

Local paths are disposable. Do not depend on them for future recovery. Current reconstruction workspace: `/workspace/scratch/a9cd1ef83eb4/t25-course`.

## Checkpoint: source recovery and assessment supplements

Completed after the initial log:
- Fixed session70 wording to explicitly ask for proof/refutation of the false bound.
- Recovered the historical v2 audit package and copied its 392-row classification ledger, 47-row official-scope crosswalk and audit notes into `course/sources/`. These are historical classifications, not a newly verified answer key. Current repaired cards remain authoritative.
- Added `course/authoring/supplements.mjs`: 9 prerequisite-bridge tasks, 7 phase synthesis problems and 21 original objective questions, each with reference/answer. Total authored tasks now361 (324+9+7+21).
- `node --check course/authoring/supplements.mjs` passed. Complete content/coverage/browser verification remains pending.
Next: deterministic data build, study interface and anime/compiler integration.

## Checkpoint: deterministic build and narrative campaign

- Added seven original campaign episodes in `course/authoring/campaign.mjs`, with public stakes, character motives, optional nonacademic choices and closure. No task answers or structural clue metaphors appear in these scene texts.
- Added `scripts/build-t25-course.mjs`; it rebuilds public course data, separately fetched evaluator references and a current-contract syllabus from authored source plus the current registry.
- Build completed successfully: 162 sessions, 361 tasks, 19 assessment sets, 47 crosswalk rows, 392 historical question routes.
- Sets comprise 7 phase written checkpoints, 7 short objective calibrations and 5 cumulative written sets. They reuse the bank; they are not 5 fresh complete PSA/PSB mock papers. Provisional timing is explicitly labeled.
- Generated files include contract hashes, required-ownership requirements, prerequisite target links and warnings against automatic clearance.
- Live official-syllabus and programme-page requests failed (timeout/502); no claim of a newer syllabus verification is made. The supplied 2026 baseline remains the source.
Next: isolated evidence helpers and browser UI; then compiler integration and validation.

## Checkpoint: study interface and evidence helpers

- Added `t25-course.html`, `css/t25-course.css`, `js/course/core.js` and `js/course/ui.js`.
- Features: 162-session navigation/search, main/transfer tasks, explicitly assisted learning notes, plain/anime presentation, prerequisite bridges, 19 practice sets, answer-before-reference gate, separate immutable saved attempts and self-review records, exposure history, 7/21/60-day retention queue, JSON export/import and story choices.
- Storage key `chrono_t25_course_evidence_v1` is separate from existing clearance/review data. No Supabase/schema or academic-clearance writes occur.
- References fetch only on explicit reveal or engine-packet export. Async reveal captures task/visit/attempt identity and aborts if the user navigates before fetch completion.
- Failed/corrupt local storage is not overwritten; new work remains in memory with an export warning. Import validates known task IDs, fields, dates and review links; conflicting IDs are rejected rather than silently overwritten.
- `node --check` passed for both JavaScript modules. Browser tests and edge-case verification still pending.
Next: λ compiler integration, release instructions, structure/evidence/math/browser tests. The new HTML currently links to a release guide that is still to be authored.

## Checkpoint: compiler and existing-deck integration

- Updated λ compiler to V1.2 with §41: current-card provenance, obligation/evidence mapping, exact mathematical task preservation, assisted/exposed evidence distinctions, optional ANIME contract, leak checks and strict Guardian precedence. Master/Guardian/extractor remain unchanged.
- Added a session-specific course link to the existing T25 panel and bumped its module cache key.
- Added `RELEASE.md` with study instructions, rebuilding commands, limitations, evidence handling and honest source/validation status.
- Fixed exposure recording for engine-packet exports of a main task not previously displayed (view count must be at least1 for a valid importable log).
- Existing-panel JavaScript syntax passed. Full structural/math/browser tests are the next step. Commands listed in the release guide are the intended complete suite; remaining new scripts will be added before release.

## Validation checkpoint: structure and evidence tests

- Added `scripts/test-t25-course.mjs`. PASS on current rebuilt files: all162 contract hashes,361 public/reference pairs,324 plain/anime opening isolation checks,47 scope mappings,392 historical question IDs,19 assessment sets,objective answer bounds,evidence import/merge validation,packet exposure edge,delayed-review and repair scheduling.
- Added `scripts/check-t25-course-math.py` for selected independent symbolic/exhaustive computations. First execution was blocked because SymPy was not installed; dependency installation is in progress. No mathematical-check pass is claimed yet.
- Existing `scripts/test-t25.mjs` is running. Browser dependency setup is in progress; browser tests have not yet run.
Next: complete math/browser checks and record their actual output. Preserve current work even if dependency setup fails.

## Checkpoint: browser regression script and mixed-task isolation fix

- Added `scripts/test-t25-course-browser.mjs` covering all162 navigation choices, deferred references, WALL clipboard text, saved attempts/reviews, import/export, assisted-note provenance, mixed/objective sets, story continuity, narrow layout, an asynchronous reveal/navigation race, corrupt-storage preservation and the existing-deck link.
- Code review found that a mixed-bank task could retain the previously selected session's scene/title. Fixed external-task context: mixed work hides the topic contract and scene, including after a presentation toggle. Bridge tasks use their own heading.
- Bumped the site entrypoint/bootstrap cache chain so the existing-panel course link can refresh on deployment.
- Browser script syntax passed; execution awaits browser installation. Dependency/test sessions are still being polled. These are authored checks, not a browser-pass claim yet.

## Validation checkpoint: mathematics and existing T25 suite

- Installed SymPy1.14.0; `python scripts/check-t25-course-math.py` PASSED all55 selected symbolic/exhaustive checks. Detailed IDs/results are in `course/generated/math-validation.json`. This is not certification of every reference.
- `node scripts/test-t25.mjs` PASSED: 7 topological plans,108 unique units,stable50-parent context,80 targets/162 cards,source mappings,T22 links,evidence validation,unchanged legacy routes,146 reachable JS modules.
- Browser execution initially failed because the Chromium executable was absent; CDN installation attempts encountered502/timeouts. An earlier workspace contains a Chromium binary being checked as a fallback. The browser test now accepts `REVIEW_CHROMIUM_PATH` for a known local binary. Browser PASS is not yet claimed.
Next: browser execution/visual QA; then final reproducibility and PR status update.

## Checkpoint: CI wiring and browser-test correction

- Added structural/reproducible-build checks to frontend CI and the course browser test to the existing review-retention workflow. Browser loading supports that workflow's installed Playwright dependency.
- Added `course/sources/PROVENANCE.md` to distinguish the recovered historical classification package from current card authority and newly authored references.
- Added `test-artifacts/` to ignore generated screenshots locally.
- The local fallback Chromium153 executable works. The first full browser run passed navigation,reference gates,copying,attempt/review/import checks,all162 sessions,mixed/objective isolation,story,narrow layout and the async reveal race before a test-harness timeout waiting for an option element to be visible. Options need only be attached; that wait was corrected. Rerun in progress; full browser PASS remains pending.
- User reiterated: continue without restarting and push progress as it is made. Current work remains on the same branch and PR156.

## Validation checkpoint: complete browser pass

- `REVIEW_CHROMIUM_PATH=/workspace/scratch/348b562d24c0/tmp/review-browser/chromium node scripts/test-t25-course-browser.mjs` PASSED after correcting the hidden-option test wait.
- Passed: all162 sessions; no early reference fetch; public WALL clipboard isolation; save/reveal/review; export/import and invalid-import rejection; learning-note assistance; mixed-task scene/topic isolation; objective options; story continuity;390px no-overflow layout; async reference-navigation race; corrupt-record preservation; course link in the existing T25 panel.
- Desktop/mobile screenshots generated and inspected. Text and controls are legible with no horizontal clipping; full-page capture needs scroll reset to place sticky navigation at its initial position. This is a screenshot refinement, not a runtime navigation failure.
- Current concrete remaining work: final presentation/readability pass, deterministic rebuild verification, push final results and update PR156. Do not reauthor the bank or repeat source recovery.

## Checkpoint: presentation polish and release build

- Reworked public cast scenes into short dialogue and action; engine-policy explanations remain in the compiler/guide instead of dominating character speech.
- Added two explicit closing outcomes per episode. Saved story choices now alter the rendered closure and survive evidence export/import.
- Cleaned spacing in all authored task/reference files. Verified that this edit changed only whitespace against the remote version; no non-whitespace mathematical content changed.
- Set course data version1.0.0; regenerated public/evaluator data. Structural/evidence tests and all55 selected mathematical checks passed again.
- Added the SymPy check and deterministic result-file comparison to frontend CI. Documented Node/Python/Playwright dependencies in the release guide.
- Updated screenshots to reset desktop scroll before capture.
- The runtime's global Python user install disappeared after a session refresh; local validation now uses SymPy1.14.0 installed in a workspace dependency directory. This does not affect committed source; normal reproduction uses the documented dependency or CI installation.
Next: final browser rerun for the changed story closure, deterministic rebuild comparison, remote/local file comparison and PR update. No reauthoring is needed.
