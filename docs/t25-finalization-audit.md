# T25 finalization audit — 14 September 2026

**Verdict: the current M.Stat route is ready for study.** It contains 80 audited targets and 162 individually authored bounded session contracts, with no missing route positions. Use one selected session's exit condition to bound the work. A session may take more than one sitting; the parent heading is not the assignment.

Audited base: `c25819622c85cb09d88d1a2c3c0982dd06b7b45f` (main after sessions 159–162). The completed high-impact M.Stat syllabus was treated as the scope authority for this check. All 80 target titles, prerequisites, exact scopes, exit checks and step lists matched the existing final syllabus manifest. This patch does not redo the paper research or change the chosen learning sequence.

## Verified corrections

- Corrected 35 prerequisite labels across 28 cards. Some numbered links pointed at another topic; for example, `041–042 / J2` actually selected discrete distributions rather than covariance (039–040). Several F3 references included the first F4 session instead of the two changed-input sessions.
- Corrected concept/code mismatches: union bounds and inclusion–exclusion belong to P3, not P1/P4; geometric waiting laws belong to D2, not D1; conditional expectation and normal sampling pivots need their actual J4/N2 references. Factorial-design prerequisites now describe product counting and finite averages, not conditional-probability content attributed to P2.
- Updated current navigation documentation from the old 46-parent/120-session descriptions to 50 parent contexts, 80 targets and 162 sessions. The full catalogue has 108 parents and the loaded world has 842 nodes.
- Marked the old ARC801 four-card document as historical, and clarified the separate current IDs. Removed wording suggesting that a failed review automatically reopens historical academic clearance.
- Made the release test require all 162 finished contracts. Added checks for prerequisite code/position consistency and next-session boundaries. Frontend CI now checks the active v4 interface rather than the superseded 120-session file.
- Added a real browser regression that visits every session and checks the copied contract, selected logical identity, map selection and enabled copying. It also exercises search, keyboard selection, first/last boundaries, optional-plan switching, T22 round trips, reload persistence, canonical prompt links and narrow-screen layout.

The card edits are confined to prerequisite text. IDs, titles, target order, capabilities, ownership requirements, in/out-of-scope boundaries and exit conditions are unchanged. The seven canonical target-phase files and route manifest are unchanged.

## Evidence and identity

- **Authored:** a usable session contract exists. Green authored nodes are not learner mastery claims.
- **Academic clearance:** remains owned by the logical ARC authority and its evidence/history.
- **Retention:** remains owned by review items and attempts. A failed delayed review can recommend repair without changing academic clearance.
- **Historical work:** current IDs such as `T25-ARC801-A1001` are distinct from legacy `T25-ARC801-A01`. The route update neither deletes old work nor grants old clearance to a new identity. Established evidence may satisfy a learning prerequisite through a diagnostic; that does not automatically rewrite cloud authority.
- **Parents:** clearing children does not automatically clear a parent. A mixed parent-readiness check remains a separate evidence requirement.

No Supabase migration, account data change, archive rewrite, automatic review-item creation or clearance migration is part of this patch. T22, the canonical λ Compiler/Extractor, SPIRE runtime, RAW/POLISHED contract and Obsidian Bridge are unchanged.

## Validation actually run

| Check | Result |
| --- | --- |
| `node scripts/test-t25.mjs` | Pass: 7 prerequisite-closed plans, 108 parent units, 80 targets, all 162 contracts, identity/reference checks and entrypoint integration |
| All shell steps in `frontend-checks.yml` | Pass: JavaScript syntax, world/T22 validators, T25, Markdown round trip, archive V3, Bridge build/syntax and deployment wiring |
| All shell steps in `cloud-archive-polish-checks.yml` | Pass |
| `node scripts/validate-t22-rich-syllabus.mjs` | Pass |
| `node scripts/test-logical-authority-v1.mjs` | Pass |
| `npm test --prefix scripts/review-tests` | **32 passed, 0 failed, 0 skipped** |
| Desktop and 390px mobile session-panel screenshots | Inspected; controls and text fit, full contract remains scrollable |
| Canonical syllabus comparison | All 80 target contracts match the completed source manifest |

Local browser tests used Chromium through `REVIEW_CHROMIUM_PATH`; normal CI installs Playwright Chromium using the existing review workflow. Review tests execute real PostgreSQL RPC bodies in PGlite with synthetic users, including RLS, retries, transaction rollback, snapshots and deletion cascades. They do not use a production learner token. GitHub-hosted check results are recorded on the delivery PR, separately from these local results.

## Remaining limits

This certifies curriculum structure and tested integration, not every proof a study model may later generate. Individual derivations still need checking during study. No admission probability or future-paper prediction follows from completing the route. Continue topical written PSA/PSB work alongside learning, keeping some questions unseen for later assessment.

The 2026 M.Stat syllabus remains the source baseline; compare the application-year syllabus before relying on future exam alignment. Companion-exam research was not repeated in this finalization pass.

The current session selector does not provide a cross-version browser for reviews attached to legacy A01 identities. Those reviews retain their original ownership; this patch does not migrate or duplicate them. See the [review guide](t25-review-retention.md) for the current manual creation path and its archive-authority prerequisite.

## Next study action

Open **T25 → M.Stat core only → audited session position**. Choose the first capability you have not independently established. Read the entry prerequisites and session exit condition, copy that one authored card, and use the linked λ Compiler. Supply definitions and allowed earlier lemmas before a WALL; preserve the existing explicit help controls. Stop the mission at that session's boundary, archive the actual evidence and use written practice plus delayed review to check that it lasts.

There is no need for another curriculum redesign before starting. Record concrete problems found in use and patch those with evidence.
