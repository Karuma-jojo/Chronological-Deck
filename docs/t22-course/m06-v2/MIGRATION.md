# M06 v2 evidence migration

The current runtime registers only `course/t22/authoring/m06-v2.json`. The old independently reviewed24-session core and the builder-candidate four-session bridge remain byte-identical historical sources. They are not loaded a second time.

All28 earlier session IDs and scored contract fields remain identical. Their learner-facing positions change according to the design route; positions never serve as evidence identity. New S29–S36 receive their own IDs and16 new fixed tasks.

Of the56 earlier tasks,54 preserve their exact assessment fingerprints. S24 Transfer increments obligationVersion2→3 and S28 Transfer1→2. Old attempts remain stored, readable and exportable, but cannot qualify as current evidence for these two tasks. No equivalence override accepts their old fingerprints.

S01–S24 instruction now has its own v2 content version, guided feedback and scaffold/fade/remediation. Opening the lesson is guided assistance; revealing a reference or copying an answer-bearing packet keeps the existing separate exposure rules. A lesson version change alone does not cancel unchanged independent mathematics. Historical exposure/overlap metadata remains present.

The node check imports every old fixed-task record into the new model and checks retention/currentness. Chromium checks the two stale attempts through actual import, all36 navigation positions,72 save/reveal/review surfaces, packet copying, export/import/reload and mobile layout. Automated browser answers are workflow fixtures, not examples of learner mastery.

Current status: builder-checked candidate awaiting independent review. The old semantic ledger establishes historical prerequisite ancestry, not independent approval of changed lessons or added obligations.

## Adversarial r1 migration

The same-builder recheck of head9ef4031053f6eca3384a83230086c5b8106961fa changes three additional obligations: S33-M1→2, S34-M1→2 and S34-T1→2. Their previous prompts/references/rubrics/session contracts and fingerprints are retained in `../audit/m06-v2-previous-assessments.json`. All69 other v2 assessment fingerprints remain identical; all54 unchanged historical-core/bridge fingerprints also remain identical. The earlier two historical stale tasks and these three candidate stale tasks remain stored/readable/exportable but cannot clear current obligations. No equivalence override is added. Chromium checks all five records verbatim before and after export/import/reload.

Instruction version is `m06-instruction-v2.0-r1-adversarial-repair-candidate`; mathematical evidence on unchanged assessments is not invalidated by new lesson wording. Current authoring version is `m06-authoring-v2.0-r1-adversarial-repair-candidate`.
