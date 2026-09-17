# T25 course: use and release status

This course layer keeps the current 80 targets and 162 stable session IDs. It adds concrete practice, evaluator references, prerequisites, mixed review and optional anime fiction around the existing curriculum.

**Status:** see [RUN-LOG.md](RUN-LOG.md) for the exact checkpoint and validation evidence. Authored material is not a learner-piloted or independently certified “9.9/10” course. A branch or draft PR does not mean the live site has changed.

## What is included

- 162 short learning notes, 162 main problems and 162 transfer problems with evaluator references.
- 9 prerequisite exercises across induction, integer/parity reasoning and partial derivatives/planar integration.
- 7 phase synthesis problems and 21 objective calibration questions: 361 original tasks in total.
- 7 phase written checkpoints, 7 objective calibrations and 5 cumulative written sets. Sets reuse bank questions; they are not complete unseen official-format mock papers. Time guides are provisional.
- A current-contract syllabus, 47 official-scope mappings and the recovered historical 392-question classification ledger. Classification is not solution certification.
- Plain or anime presentation, seven original expedition episodes, optional story choices and closure.
- Saved attempts, separate self-review records, exposure tracking, delayed review, import/export and compiler-packet copying.

## Study sequence

1. Open `t25-course.html` from the deployed repository site, or serve the repository locally with `python -m http.server 8765` and visit `http://localhost:8765/t25-course.html`. Opening the file directly without a web server may block data loading.
2. Choose the current session. Read its scope and prerequisites. Use an assigned bridge only if needed. Learning notes explicitly count as assistance; they are not shown automatically in WALL.
3. For your usual SPIRE workflow, choose plain/anime and copy the **engine-only compiler packet** into the λ compiler. Give the complete compiled mission to your unchanged Master/Guardian environment. The packet contains references and must not be pasted as a player-facing prompt. The separate **WALL opening** contains only public scene/task text.
4. Alternatively, solve the visible practice task on paper, record your working and assistance, then save the attempt. Only then can the reference be opened. The reference is one valid route, not a required proof style.
5. Review the saved attempt honestly. A self-rating does not certify a proof or clear an ARC. Required ownership that has not been demonstrated remains pending; the compiler must add a bounded fresh probe when needed.
6. Use phase and cumulative sets to practise selecting methods without topic labels. The interface records prior display and reference exposure. A familiar question can test retention but cannot become unseen transfer through relabeling.
7. Export your study record regularly. It is stored in this browser only; it is not automatically synchronized to the existing cloud review system. Import merges records and rejects conflicting attempt IDs.

The review queue uses 7, 21 and 60-day gaps after secure independent self-reviews on distinct dates. These are provisional study intervals, not a validated memory model. Shaky/incorrect records are prioritized for repair. Historical clearance is never revoked because retention needs work.

## Anime without clues

The fictional Aster expedition has public incidents, competing motives and optional choices. A certified mathematical record can authorize a hearing or story milestone. Fiction neither changes the problem nor certifies real engineering safety. No pause, mistake or elapsed time causes penalties. The story completion button records the learner's report of actual SPIRE certification; it grants no academic authority.

The λ compiler freezes the academic task first, maps required evidence, then wraps it. Structural metaphors, suggestive character reactions, hidden answer counts and early transfer disclosure are forbidden. The installed Guardian still controls live response grammar.

## What the release does not establish

These concise notes are not a full textbook. The bank gives two worked assessment opportunities per session, not a claim that those two prompts exhaust every contract. Some sessions are dense and can be split across sittings while retaining the same logical identity. Foundational material already owned can be cleared diagnostically when the runtime permits.

References are authored and checked to the extent recorded in the validation log; they have not been independently certified by an external examiner. No complete held-out-paper learner pilot, admission prediction or empirically calibrated timing is claimed. Reserve genuinely unseen official papers and apply the instructions printed for those papers. Historical source issues are documented in `course/sources/HISTORICAL-AUDIT.md`; check the original statement before using a disputed item as a diagnostic.

The supplied 2026 syllabus remains the baseline. Live official retrieval during this build failed; no newer syllabus verification is claimed. The historical metadata predates the six current card repairs; the current repository contracts control whenever wording differs.

Static source files are inspectable: hiding references is a normal-display boundary, not encryption. Existing Master, Guardian, extractor, card clearances, T22 and database schemas are unchanged.

## Maintain and reproduce

Edit `course/authoring/phase-*.mjs` for lesson/main/transfer material, `supplements.mjs` for bridges/synthesis/objectives, and `campaign.mjs` for fiction. Rebuild with:

```sh
node scripts/build-t25-course.mjs
node scripts/test-t25-course.mjs
python scripts/check-t25-course-math.py
node scripts/test-t25-course-browser.mjs
node scripts/test-t25.mjs
```

The build records current-card SHA-256 hashes so a contract change cannot silently retain a stale derived course. It separates public problem data from evaluator references. The public JSON still includes optional learning notes and future practice tasks; the engine alone controls release order during a sealed mission.

Follow `RUN-LOG.md` for incremental remote checkpoints. Never leave the only copy of new authoring in a temporary workspace.
