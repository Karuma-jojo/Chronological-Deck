# T22 Stage A Inventory

Status: architecture inventory for Astra review. This file does not mutate the live T22 route or learner evidence.

Source branch: `codex/t22-pedagogical-rebuild`
Audit base commit: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Checked: 2026-09-17

## 1. Current T22 route surfaces

### `js/data/t22-quant-research.js`

- Registers the live T22 macro route as 58 modules.
- Current admission text assumes basic arithmetic, algebraic manipulation, elementary functions and ordinary deductive reasoning.
- Current first module is `ARC053` (derivatives); finite probability is not reached until current module 17 (`ARC048`).
- Market/finance practice is heavily back-loaded: `ARC553`, `ARC554`, `ARC558`, `ARC559`, `ARC560` are the final five macro modules.
- The live file therefore represents a strong advanced-content inventory but not yet the desired weak-entry prerequisite route.

### `js/data/t22-atomic-arcs.js`

- Atomic audit version: `2.0`.
- 58 macro modules, 596 current atomic arcs.
- Nominal bookkeeping target: 4 focused hours per atomic arc / 2–6 hour normal range.
- Atomic IDs are generated from macro *position*: `T22-Mxx-Axx`.
- Reordering a module while retaining those IDs would change the intellectual meaning attached to an existing progress key. This is a migration blocker, not a cosmetic concern.

### `js/data/t22-rich-syllabus.js` and `js/data/t22-rich-module-*.js`

- Rich syllabus version: `3.0`.
- Existing authored arcs contain useful fields such as focus, role relevance, purpose, principal obstacle, entry prerequisites, mastery requirements, application scope, transfer scope, out-of-scope boundary and next-arc boundary.
- These files are valuable reusable content. The rebuild should not discard them merely because the route needs restructuring.
- Representative late modules show strong domain realism. For example, `ARC558` already covers order-book mechanics, spreads, queue position, adverse selection, event-data interpretation and a microstructure lab.

### `js/t22-atomic-ui.js`

- Current atomic progress key: `chrono_t22_atomic_progress_v2`.
- Legacy v1 key is archived rather than silently reinterpreted when v2 is initialized.
- Existing macro completion can currently promote all atomic children of that macro to complete.
- That inheritance rule is only safe while the child obligations are semantically equivalent. It must not be reused blindly for a v3 rebuild that changes or splits obligations.

### Validators and workflows

- `scripts/validate-t22-atomic.mjs` hard-codes the present 58-module route, 596-arc total, positional ID format and exact module indices.
- `scripts/validate-t22-rich-syllabus.mjs` and the per-module validators protect the present rich contract.
- `.github/workflows/t22-atomic-checks.yml` and rich-module workflows provide useful implementation guardrails.
- Stage B should version or replace route-specific checks instead of editing them until the old route appears to validate as the new route.

## 2. Archive / evidence surfaces

- `js/data/arc-store.js` stores ARC documents under stable ARC IDs in IndexedDB. This is a content/archive surface, not by itself a mastery-equivalence proof.
- The repository also contains Supabase logical-authority, clearance, review-retention and archive migrations. Stage A does not alter any of them.
- No learner progress storage, cloud clearance, archive rows, or T25 state is changed in this stage.

## 3. T25 implementation reference — selective reuse only

T25 remains its own product and evidence authority. It is not restarted, regenerated or used as the source of T22 content.

Useful implementation ideas observed in `course/authoring/*` and generated T25 course artifacts:

1. Keep learner-facing teaching separate from independently attempted main tasks.
2. Keep evaluator/reference derivations hidden from the learner surface.
3. Add a structurally changed transfer task rather than a cosmetic number swap.
4. Validate authored mathematics separately from display/UI concerns.
5. Treat generated course/evaluator artifacts as derived products from an explicit authoring source.

These are implementation patterns only. T22 requires its own route, role target, tasks and evidence semantics.

## 4. Current content worth preserving

The existing T22 corpus contains substantial useful material in:

- calculus and approximation;
- linear algebra, matrix factorization and multivariable calculus;
- probability, statistics, likelihood and resampling;
- regression, ML and time series;
- scientific computing, SQL and market-data handling;
- no-arbitrage pricing, portfolios, microstructure, execution and end-to-end strategy research.

Stage A therefore treats the rebuild as **re-sequencing + bridging + evidence-versioning + role-path repair**, not as a green-field rewrite.

## 5. Stage A boundary

This inventory intentionally does **not**:

- change `T22_ORDER`;
- change 596 existing atomic arcs;
- modify the T22 UI;
- migrate any progress;
- merge or deploy anything;
- claim that all 596 current arcs have been individually content-audited.

The architecture proposal is documented separately in `ROUTE.md`, `route.dependencies.json` and `MIGRATION.md`, followed by three bounded sample modules for Astra review.
