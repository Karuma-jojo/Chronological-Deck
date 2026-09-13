# T25 review / retention implementation verification

Verified 2026-09-13 against repository main `31a9239ce3a7add3585a7fe3aec9ca8560c81916` and the connected Chrono-Deck Supabase project. See [the user/developer guide](t25-review-retention.md) for behavior and APIs.

## Completed

- Inspected T25 parent and atomic data, atomic/study UI, existing Supabase transport/auth, archive documents/sections, logical authority updates/deletion, V3 Bridge contract, existing tests and standalone SQL conventions.
- Added separate owner-private review items and immutable attempt history, transactional scheduling RPCs, existing-session browser transport and the selected-card UI.
- Applied generic migration `arc_review_retention_v1`, version **20260913025337**, to project **locvizvoqdwmdvnqofsv**. No account IDs or personal item inserts were included.
- Verified both tables have RLS; authenticated users have SELECT only and no direct writes; anon has no SELECT or function execution. All five public RPCs are invoker functions. The three private mutation workers have locked search paths and mandatory owner checks.
- Verified composite cascading FKs: logical authority → owned items → owned attempts, plus account deletion → items.
- Compared A01 authority and complete RAW/POLISHED row fingerprints before/after deployment: **identical**. A01 remains `fully_mastered`, recovery `not_owed`, authority version 1.
- Supabase security advisor: two pre-existing notices before and after; **no new notices**. This is not a claim that unrelated legacy security findings were repaired.
- New production tables contain **zero personal items and zero attempts** after deployment. The A01 target is prepared in the ordinary authenticated UI; it has not been inserted through an administrative impersonation path.

## Tests actually run

| Suite | Result |
| --- | --- |
| Existing `scripts/test-*.mjs` and `scripts/validate-*.mjs` | 43 scripts passed, including T25, T22 modules, world, markdown, V3 archive and logical authority |
| Existing `chatgpt-app` tests | 12 passed after installing its existing dependencies |
| New review SQL, browser and boundary checks | 31 tests passed, including Node's parent test group |

The SQL fixture executes PostgreSQL using **PGlite 0.5.8**. Browser tests use **Playwright 1.63.0** and Chromium 153 against the real local index page, with test HTTP routes executing the real SQL RPCs. The standard Playwright CDN download failed in this environment; the run used the matching Chromium 153 binary distributed through `@sparticuz/chromium`, outside the repository. CI uses the standard Playwright browser installation. No browser package is an application runtime dependency.

The first ChatGPT-app test run lacked its SDK dependency, and the first SQL fixture run used a prepared-statement helper for multi-statement setup. Both setup issues were corrected and the suites rerun successfully; neither initial run is counted as passing.

## Requested coverage

| Requirement | Evidence |
| --- | --- |
| Logical ownership; RAW/POLISHED deduplication | SQL creation/load/retry plus actual identity-refresh function after representation updates |
| Manual creation; A01 without clearance changes | SQL and browser ordinary create path; full authority row comparison |
| Clean/shaky/failed scheduling; clerical distinction | SQL interval/error/assistance tests; browser conceptual failure |
| Atomic attempt and schedule | Injected schedule-update failure rolls back the inserted attempt |
| Duplicate retries and stale sessions | Identical UUID/payload retry and stale-version rejection; browser drops a successful response then retries |
| Historical meaning after editing | Snapshot immutability and current-evidence reset; browser history still shows the old prompt |
| Archive removes due work | SQL active summary and browser archive behavior; history preserved |
| Logical deletion cleanup | Existing unmodified delete RPC executed with owner role; cascades verified; other learner retained |
| Private owner access | Two isolated users, anon, missing UID, direct-write denial, cross-owner RPC denial |
| Independent UI clearance/retention | Fully Mastered remains displayed after failed conceptual review |
| Signed out, schema missing, cloud failure | Actual page stays usable; card text, copy button and λ link verified |
| Atomic/T22/archive unchanged | Baseline content hashes plus existing regression suites |
| Parent scope without authority row | Pending mixed item under ARC801 with NULL logical ID |
| Calendar dates | SQL DATE across time zones and local browser-format helper in three zones |
| Presentation and session isolation | Narrow-panel overflow check, escaped content, no browser page errors, selection preservation, token-refresh draft preservation, sign-out clearing |

## Limits and remaining release steps

- There was no authenticated **learner browser session** available for a real production item/attempt. Production schema/grants/FKs were inspected, but the browser end-to-end run uses isolated test users and the local SQL fixture. No fake production learning evidence was recorded.
- PGlite serializes requests; stale-device behavior is tested, but there was no multi-connection production contention/load test.
- Remote GitHub Actions and the final Pages deployment must be checked on the published branch/PR. Local tests do not certify a future deployment.
- V1 has no automatic archive target generation, parent mixed-review UI, automatic grading, offline queue, notification schedule, Anki algorithm or mastery-recovery integration.

Once the feature branch is merged and Pages has deployed, sign in normally, open **T25 → ARC801 → T25-ARC801-A01 → Revision Stack → Add review item → Prepare A01 absolute-value target → Save review item**. The database migration is already applied; do not create a second account or run a user-specific SQL seed. The initial due date is the local save date +3 days. To try the flow immediately, use **View review stack → Practice early**.
