# T25 review / retention v1

The learner-facing panel is **Revision Stack**. Its data and APIs use **review / retention** terminology; this is unrelated to document or logical-authority version history.

## Ownership and boundaries

- `arc_logical_arcs` remains the sole academic clearance/recovery/debt authority.
- `arc_review_items` owns each review target's current schedule and current retention evidence.
- `arc_review_attempts` preserves immutable self-evaluation history, including question/reference snapshots and the schedule outcome.
- ARC-level retention is derived from its active items; there is no second mutable ARC summary.

`clearance: fully_mastered` and `retention: repair_recommended` are valid together. A later conceptual failure says that a target needs attention now. It never rewrites earlier clearance, assistance, proof debt, recovery debt, or authority history. A mini-SPIRE repair recommendation is advisory; there is no automatic recovery workflow in v1.

The existing T25 → atomic card → λ Compiler → sealed mission → frozen ω runtime → λ Extractor → RAW/POLISHED V3 → Obsidian Bridge → Supabase → logical authority flow is unchanged. No changes to the compiler/extractor contracts, ω prompts, T22 curriculum, archive frontmatter, embeddings or Obsidian plugin are needed.

## Use it

1. Sign in using the existing **Cross-device cloud sync** panel. No second login is added.
2. Open T25 and choose the desired **001–162 audited session** in the map/dropdown. Parent grouping is secondary context.
3. Expand **Revision Stack**. Clearance loads from logical authority; retention is displayed separately.
4. Choose **Add review item**. Enter a type, prompt/problem, optional reference/rubric and personal note. Save.
5. Use **Start due review**, or **View review stack → Practice early** before the scheduled date.
6. Work on paper or enter your reasoning. Only then reveal/check the reference.
7. Self-evaluate as clean, shaky or failed; specify error kind, assistance and whether this was unfamiliar transfer. Record the result.
8. The saved result supplies the next date. **View history** shows the original question/reference, response, assistance and scheduling outcome.

There is no string-matching grader or LLM grading dependency. A checkbox that work was attempted is an explicit self-report, not verification of mathematical mastery. Reference text is rendered as safe plain text, including Unicode mathematics; v1 does not add a formula renderer.

### The legacy A01 target and current route

The current 162-session selector uses fresh IDs (for example, `T25-ARC801-A1001` for F1.1 and `T25-ARC801-A1002` for F1.2). It does not select legacy `T25-ARC801-A01`, migrate its existing reviews, or inherit its clearance. The legacy prefill below applies only when that legacy identity is selected through a compatible interface; it is not a button on the new F1.1/F1.2 cards.

On a current card, use the ordinary **Add review item** form for a new target associated with that card's existing logical authority. New authority rows are established through the existing archive flow, not by the review scheduler. If an absolute-value review already exists under the legacy A01 identity, leave that evidence there; do not recreate it merely because the curriculum has a new route. A cross-version review/history browser is not supplied by this finalization patch.

Under `T25-ARC801-A01`, choose **Add review item → Prepare A01 absolute-value target → Save review item**. This prefills the ordinary authenticated create form:

- Type: `concept_discrimination`.
- Prompt: for real `u`, why is `√(u²) = |u|`, rather than simply `u`? Explain both signs and give a counterexample.
- Reference: the principal square root is nonnegative; `|u| = u` for `u ≥ 0`, and `|u| = −u` for `u < 0`. For `u = −3`, `√9 = 3`.
- Personal context: sign behavior was understood during A01, but absolute value was not independently learned deeply as its own concept. This is a delayed-retention target, **not A01 failure, proof/recovery debt, or a reason to reopen A01**.
- Provenance: `user_created`, because the learner explicitly requested this target and confirms Save.
- Stable source key: `a01-absolute-value-v1`. Repeating setup returns the existing item without duplicating or overwriting it. To alter a saved target, use Edit.

No account UUID or personal item is inserted by the migration. Rational powers and exact logarithm-law hypotheses remain plausible later learner-selected targets after FORGE0 assistance; v1 generates no extra A01 deck.

## Item identity, provenance and acceptance

Items have client-generated UUIDs and a unique `(user_id, source_key)` creation key. Atomic items reference the existing `(user_id, logical_arc_id)` authority key. RAW/POLISHED suffixes are normalized at the create/load API boundary; both representations resolve to the same logical ARC. There can be several distinct targets for one ARC, but no representation-specific schedule or retention identity. Archive upload/resync does not call or write this review layer.

Supported types: `recall`, `concept_discrimination`, `error_repair`, `mini_problem`, `unfamiliar_transfer`, `mixed_review`.

Provenance: `user_created`, `extractor_suggested`, `error_derived`, `assistance_derived`, `parent_mixed`. Only `user_created` starts active. Other origins start **pending**, without a due date; the learner can edit, accept or ignore/archive them. V1 generates no archive suggestions automatically. Assistance is provenance, not proof of failure.

A source key is an idempotent creation key, not an upsert instruction: retrying with the same key returns existing content. Identity/provenance cannot be changed by Edit; create a distinct item for a different origin or scope.

## Scheduling heuristic

These intervals are **implementation heuristics for spaced retrieval**, not a scientifically unique or optimal schedule. They can be changed in the single SQL scheduling worker in a future reviewed migration; v1 has no per-learner schedule editor.

| Event | Stage / next date |
| --- | --- |
| New user item, accepted suggestion or reactivated item | Stage 0; local today + 3 days |
| Independent clean result on/after due date | Advance one stage; intervals 7, 21, 60, 180, then 180 days in maintenance |
| Independent clean early practice | No promotion and no postponement of the existing due date |
| Shaky | Step back one stage (minimum 0); +3 days |
| Clean with assistance | No promotion; +3 days |
| Failed with clerical error only | Preserve stage; +3 days; no new conceptual repair recommendation |
| Failed with conceptual, mixed, unknown or unspecified error | Stage 0; +1 day; `repair_recommended` |

A clean independent result clears the item's advisory repair flag. Shaky or assisted results preserve an existing flag. `clean` with `conceptual`/`mixed` error is rejected as contradictory. Assistance values are `none`, `hint`, `forge0`, `guided`; notes can explain finer distinctions. Unfamiliar-transfer evidence is recorded, but does not receive an extra multiplier.

Derived retention over **active** items:

- `repair_recommended`: any item has that flag.
- `unverified`: no active items, or at least one target lacks a current attempt (including mathematically edited targets).
- `maintaining`: every active item has current evidence and stage ≥3.
- `in_review`: other reviewed combinations.

These are modest operational summaries, not psychometric mastery probabilities. Pending/archived items do not count as active work. **Overdue** is shown separately and never means **forgotten**. No automatic parent clearance follows from child summaries.

Due dates are SQL `DATE` values, transported as `YYYY-MM-DD`. The browser supplies its local calendar date; SQL accepts server today ±1 day to accommodate time zones and rejects clearly incorrect device dates. Attempt timestamps remain server `timestamptz`. Display constructs local date components, avoiding UTC date-only parsing shifts. A retry keeps its original date/body even across midnight.

## Atomic writes and cross-device behavior

`chrono_record_arc_review_attempt` locks the owner's item, checks `lock_version`, inserts the attempt snapshot and advances scheduling **in one database transaction**. Any error rolls back both writes.

A client-generated attempt UUID is retained for a response-loss retry. Matching retries return the existing attempt without advancing again. Reusing the ID with a different payload is rejected. Two sessions with different IDs but the same stale item version cannot both advance the schedule. Item edits use the same optimistic version check.

After sending, the browser freezes that submission's payload and offers **Retry same submission** on uncertain network failure. Do not start a replacement attempt merely because a response was lost. On a version conflict, copy any working you want to keep, then Refresh and reconcile; v1 does not merge drafts automatically. Drafts are in memory only and disappear on reload/navigation/account change. The review layer has no local-only database or offline queue.

Use Refresh when returning from another device. A currently open answer is not automatically replaced by a background schedule reload. Shared login changes/sign-out clear private review content; stale async responses are ignored. An expired session uses the existing cloud panel's refresh/sign-in path.

## Editing, archiving and deletion

Each attempt snapshots prompt, reference, personal note, type, provenance, scope and item version. Editing prompt/reference/type resets current stage and verification, while those historical snapshots stay immutable. Editing only personal notes preserves the schedule/evidence. This conservative rule also treats typographical prompt edits as a fresh target; it avoids guessing whether mathematics changed.

Archive removes an item from due work without deleting attempts. Normal UI has no hard-delete action. Deleting a whole logical ARC through the **existing confirmed deletion RPC** deletes its review items via the composite foreign key, and their attempts cascade in turn. No orphan review rows remain; other learners' data is unaffected. Existing deletion counts are unchanged and do not enumerate the new cascading rows.

Parent mixed review remains possible: an item may have `logical_arc_id = NULL`, `curriculum_scope = 'ARC801'`, `item_type = 'mixed_review'`, provenance `parent_mixed`. It starts pending and requires no fake ARC801 authority row. V1 exposes this schema/API capability but does not generate parent reviews or add their UI. Such an independent parent item survives deletion of one child ARC; its scope is not a child ownership FK.

## API and security

| Public RPC | Purpose |
| --- | --- |
| `chrono_load_arc_review(text,text)` | Load owned items for a logical ARC, or parent-only curriculum scope |
| `chrono_create_arc_review_item(jsonb,date)` | Idempotent authenticated creation |
| `chrono_update_arc_review_item(uuid,jsonb,integer,date)` | Version-checked edit/accept/archive |
| `chrono_record_arc_review_attempt(uuid,uuid,integer,jsonb,date)` | Atomic idempotent attempt + scheduling |
| `chrono_list_arc_review_attempts(uuid)` | Owned immutable history |

The browser repository composes the existing `SupabaseArcRepository` transport, session and headers. Academic status uses the existing `chrono_load_logical_arc_authority` RPC independently.

Both new tables enable owner-only authenticated SELECT RLS and revoke direct client writes. Public mutation wrappers are SECURITY INVOKER; narrowly scoped workers in the **non-exposed** `chrono_review_private` schema are SECURITY DEFINER, with empty `search_path`, explicit object qualification and mandatory `auth.uid()` ownership checks. Authenticated users can execute workers through wrappers but cannot impersonate an owner parameter. PUBLIC/anon execution is revoked. Do not expose the private schema through the Data API. No service-role credential, public review access, semantic embedding or external grader is introduced.

## Deployment and progressive enhancement

Apply `supabase/arc-review-retention-v1.sql` after logical authority and its existing deletion grant fix. It is additive, transaction-wrapped and repeatable under repository standalone-SQL conventions. It was initially generated with the CLI migration command, then named consistently with the existing SQL files. Do not use `supabase db push` to infer a complete migration history from this repository.

Deploying the frontend first is safe: missing review schema shows **Review layer not installed**. Signed out shows the existing sign-in route. Network failures leave ordinary study intact and an unconfirmed draft visible. The review module is loaded in its own guarded import; it cannot prevent the atomic module, copying or λ links from loading. Only the selected atomic card receives controls.

The only shared UI changes are a selected-atomic event, preserving an already selected atomic child across parent redraws, a credential-free cloud-context event, and guarded bootstrap/cache/CSS wiring.

## Validation

From the repository root:

```sh
npm ci --prefix scripts/review-tests
node --test scripts/review-tests/database.test.mjs scripts/review-tests/contracts.test.mjs
node scripts/review-tests/node_modules/playwright/cli.js install chromium --only-shell
node --test scripts/review-tests/browser.test.mjs
```

`REVIEW_CHROMIUM_PATH` can select an existing Chromium binary. Test dependencies are isolated under `scripts/review-tests`, with no frontend runtime dependency.

SQL tests run real PostgreSQL via PGlite, including actual authority DDL/identity refresh and the unmodified logical deletion RPC against isolated fixture users. Minimal unrelated archive/media tables stand in for the rest of production; semantic/vector functions are outside the fixture. PGlite serializes calls, so stale-session/duplicate tests verify locking/version/idempotency logic but are not a multi-connection production load test.

Browser tests load the actual index/T25 interface in Chromium and route authenticated test requests to those real SQL RPC bodies, not a fake scheduling implementation. They cover A01 setup, answer-first behavior, response-loss retries, clearance separation, edit/history, archive, narrow layout, signed-out/missing-schema/offline behavior, atomic-selection preservation and sign-out clearing. They do not use a real learner token or write production learning evidence.

See [the implementation verification record](t25-review-verification.md) for actual run results and deployment/seed status.
