# Current M15 bounded follow-up — provenance correction — 2026-09-27

Independent bounded follow-up confirms **R01–R04 PASS** at reviewed head `3eb72ede248eed619f48d054bfb9328733094e8f`. No further learner-content, mathematics, task, rubric, architecture, reference-answer or obligation-version repair is required. A Gate-10/12 provenance contradiction was found: prior docs overclaimed that all 48 ownership claims were Main-observed. The actual unchanged ledger is **35 Main-only / 11 Transfer-only / 2 both**; all six S14/S15 claims remain Main-observed and were not remapped to the @2 Transfers. This patch also makes the design-gate Strang §4.4 locator consistently pp.231–243 and removes stale verification/follow-up-pending canonical wording. M15 remains unpublished; next check is provenance-only diff/read-back confirmation.

---
# Current M15 independent-review repair — 2026-09-27

Independent review at `aa01b1914fd69709919651f14e27487cef7fbbe6` opened four bounded findings. R01/R02 support-theorem order is repaired in S10–S12; R03/R04 replace only S14-T and S15-T as `@2` / obligationVersion 2 changed-surface Transfers. Pre-repair fingerprints are preserved in `audit/m15-pre-independent-repair-version-receipt.json`. Exact repaired implementation head `3d0cade34f3c43df5927a808fb82d77c189c89ee` passed full T22 Elite run [36303833184](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36303833184), job `108576459161`, **SUCCESS**, including independent M15 math oracles, inherited regressions, Chromium and the 304-surface M15 browser workflow.

Status: **independent-review repaired; bounded independent follow-up pending; unpublished.** No main merge, publication or M16.

See `M15-INDEPENDENT-REVIEW.md`, `M15-RESOLUTION.md`, `M15-VERIFICATION.md` and `M15-REVIEW-HANDOFF.md`.

---

# Current M15 review candidate — 2026-09-27

M15 · `SIDE278` has completed builder recovery and full v1.2 verification on isolated branch `codex/t22-m15-review-candidate`. Canonical implementation commit `3f5943024691501ff1678c9222cb1c6ac01d4203`; exact tested head `bb62dac23871496bb1f51626f5f3cfd4d14c2274`. Full T22 Elite run [36290674513](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36290674513), job `108540011754`, **SUCCESS**, including structural/semantic guards, independent M15 math oracles and real Chromium browser validation of 304 M15 learner surfaces. Structure: 16 sessions / 32 fixed tasks / 48 ownership claims. M15 remains outside the persisted M01–M14 learner registry. **Next action: independent adversarial review of M15 only. No publication, main merge or M16.**

See `M15-DESIGN-GATE.md`, `M15-PILOT-REVIEW.md`, `M15-RESOLUTION.md`, `M15-VERIFICATION.md` and `M15-REVIEW-HANDOFF.md`.

---

# M09 publication — current receipt

See `M09-BOUNDARY.md`, `M09-VERIFICATION.md`, `M09-REVIEW-HANDOFF.md` and the authoritative recovery entry in `docs/t22-rebuild/RUN-LOG.md`.

## Verified publication receipt — 2026-09-24

Implementation commit: `1eb834ef93ca7ab36cc8ded0abd0cbc9479d4b0f`. Pushed to `codex/t22-pedagogical-rebuild`, read back, then fast-forwarded to `main` and read back. Both heads were checked before publication; main had not moved. All six accepted follow-up commits beyond the recovered main remain ancestors. Remote tree hashes verified all 19 implementation files.

- Branch full T22 run: [35983499159](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983499159), job `107580669242`, **SUCCESS**.
- Main full T22 run: [35983644114](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983644114), job `107581139237`, **SUCCESS** at the exact implementation SHA.
- Actual logs from both jobs were inspected: inherited checks, M09 mathematical/semantic/provenance checks and the real Chromium browser step all passed. Browser coverage includes every M09 lesson and task, mobile width, assistance/draft persistence, save/reveal/review, packet exposure, fresh navigation and nine-module export/import.
- All 64 local non-browser workflow commands passed. Local Chromium was absent; browser success is the executed GitHub result, not a claim that the failed local launch passed.
- All 40 observed workflow runs at the implementation SHA reported success, including the repository's existing main-triggered integrity and publication workflows. No T25 or SMMC source changes were made.
- Machine-readable receipt: `docs/t22-course/audit/m09-validation-receipt.json`.

A subsequent documentation-only receipt commit records these facts; the validated implementation remains the SHA above. M01–M08 canonical files and progress identifiers are preserved. M09 is builder verified, not independently accepted. **Stop here: M10 remains closed.**

---

# Pre-publication ancestry sync — 2026-09-24

Current `main` merge commit `4e8755b0d0060390b18ccba846d0d7f5e6750328` was merged into the T22 branch via PR #168 with zero changed files, making the branch 0 commits behind main. This checkpoint exists solely to force the complete T22 Elite validation on the ancestry-clean 25-session M08 tree before publication back to main.

# M08 session-sizing rebalance — 2026-09-24

Sizing-only decision: **25 sessions; add one, merge none**. Former S02 was the only clear overload, combining exact quotient/remainder count semantics with binary floating-point/tolerance policy. It is now S02 exact integer division plus new visible S03 floating-point comparison. All pre-existing stable session IDs are preserved; old S03–S24 shift only in displayed order.

Current structure: **25 sessions / 50 fixed tasks / 125 ownership claims**. Full T22 Elite validation passed at commit `44b78d327c78fcc7ddf02fe56d1b293901637ee9`, Actions run `35967257130`, job `107528549359`, including Chromium and the eight-module browser workflow. See `M08-SESSION-SIZING-AUDIT.md` and `M08-REVIEW-HANDOFF.md`. Current status: **fully green; bounded follow-up pending**. M09 remains closed.

# M08 independent-review repair — 2026-09-24

Severe independent review found eight material findings (M08-R01 through M08-R08), including worked-example/Main contamination, lexical-only separation checks, S06 prerequisite inconsistency, weak programming observability and missing Python novice bridges. Repairs are recorded in `M08-INDEPENDENT-REVIEW.md` and `M08-RESOLUTION.md`. Fresh assessment surfaces, obligationVersion2 changes, imports/callable passing/strict zip/traceback reading, executable S14-S16 tasks, regenerated 120-link semantic contract and fresh Python oracles are now in place. Full repaired-tree validation passed at commit `42c112a45ea177f8dad5ea3c6c16ab9d041db0f1`, Actions run `35965698526`, including Chromium/eight-module browser evidence. Current status: **independent-review repaired and fully green; bounded follow-up pending**. M09 remains closed.

# Main-sync integration checkpoint — 2026-09-24

Before publication, current `main` at `cd91d131856a34b6ce99247b05060b86e0e6f535` was merged into the T22 branch via PR #165. The only file changed on both histories since their common ancestor was `index.html`; it was deliberately reconciled by preserving current main's SMMC/cloud-sync UI and adding only the T22 Elite entry link. After the merge, the T22 branch is 0 commits behind main. This log commit exists to trigger the complete T22 Elite validation on the combined tree before any PR back to main.

# Current M08 builder candidate — 2026-09-24

M08 · `T22E-CODE01` — Quant Programming & Simulation Foundations — is built as a **builder-validated candidate awaiting independent review**. It contains 24 sessions, 48 fixed Main/Transfer assessments and 120 builder-reviewed ownership links. The first complete green implementation head is `c261410fb40809dc44cddb9dccf50e612ae0f1be`, T22 Elite Actions run `35956181744`, job `107494885143`: syntax, structural/pedagogy/semantic/evidence checks, executable Python 3.12 oracles, Chromium and the eight-module browser workflow all passed. M08 depends canonically on M01 + M03 + M04; M07 is not a prerequisite and retains its separate bounded follow-up status. Read `M08-BOUNDARY.md`, `M08-CERBERUS-AUDIT.md`, and `M08-REVIEW-HANDOFF.md`. **Next action: independent M08 review only. M09 remains closed.** No merge/deploy/T25/legacy-progress changes.

# Current M07 Astra repair — 2026-09-24

M07 · `T22E-MKT01` has completed the bounded M07-01 through M07-05 repair. Authoring/instruction versions are `m07-authoring-astra-r1` / `m07-instruction-astra-r1`. Exact repair head `a0f76357f5e36de6e77799e2a30707c950ce1060` passed complete T22 Elite Actions run `35952806534` (job `107484744356`), including the mutation-sensitive 120-claim semantic contract, version/provenance migration checks and real Chromium seven-module workflow. M07 is **repaired and builder-verified, not independently accepted/frozen**. Next action: bounded Astra follow-up only. M01–M06 remain accepted; M08 remains closed. Read `M07-ASTRA-REVIEW.md`, `M07-RESOLUTION.md`, and `M07-REVIEW-HANDOFF.md`.

# Current M07 candidate — 2026-09-24

M01–M06 remain accepted/frozen. M07 · `T22E-MKT01` is a 24-session / 48-assessment / 120-claim CERBERUS-hardened candidate, fully verified on implementation head `84baddc69643f4654eb87bf05ed907febf37b077` by T22 Elite Actions run `35927759177` (job `107406819179`), including real Chromium and the seven-module evidence workflow. M07 is **not independently accepted/frozen yet**; next action is bounded Astra review. M08 remains closed. See `M07-BOUNDARY.md`, `M07-CERBERUS-AUDIT.md`, and `M07-REVIEW-HANDOFF.md`.

# Current bounded repair — 2026-09-23

M05/M06 repairs are independently accepted and frozen. Implementation `efea44476e30a0daf45675e15889788e082900a2` passed the complete [Actions run35917978076](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35917978076), including real Chromium. The bounded follow-up is recorded in `M05-M06-ASTRA-FOLLOWUP.md`; see `M05-M06-RESOLUTION.md` and `../t22-rebuild/RUN-LOG.md` for recovery. That M05/M06 checkpoint remains historical authority for those modules; M07 was subsequently explicitly authorized. Earlier internal acceptance below is historical.

# T22 Elite course build log

## 2026-09-18 — M01 platform + authored-module checkpoint

### Architecture
- Dependency-audited the M65 skeleton and wrote `docs/t22-rebuild/m65.dependencies.json` plus `M65-DEPENDENCY-AUDIT.md`.
- 65 unique modules; every declared prerequisite resolves and occurs earlier in the declared order.
- Macro ownership is frozen for M01 authoring. New macro modules now require a written ownership/exit-standard argument.

### Dedicated course surface
- Added `t22-course.html` as a separate learner surface rather than overloading the historical T22 route UI.
- Added T22-specific CSS and JS runtime under `css/t22-course.css` and `js/t22-course/`.
- Kept evidence isolated under `chrono_t22_elite_course_evidence_v1`.
- Stable versioned obligation IDs and contract hashes are independent of route positions.
- Previous-reference exposure, learning-note use and assistance are recorded.
- Old-contract evidence is preserved but does not count as current independent evidence.

### M01 authored
- Module: `T22E-FND01` — Quantitative Foundations I — Numeracy & Algebra.
- 17 bounded sessions.
- 34 original main/transfer tasks.
- Every task has a 10-point evaluator rubric and reference solution.
- Session 17 is an integrated synthesis rather than a new topic.

### Validation performed locally before repository write
- `node --check` passed for `js/t22-course/core.js` and `js/t22-course/ui.js`.
- `scripts/test-t22-elite-m01.mjs` passed:
  - 65/65 topological macro modules;
  - 17 contiguous M01 sessions;
  - 34 unique problems/evaluators;
  - stable versioned IDs;
  - recomputed SHA-256 contract hashes;
  - every rubric totals 10;
  - selected numerical references checked.
- Static HTTP smoke test served `t22-course.html` and loaded the M01 JSON successfully.
- A cross-runtime contract-hash mismatch was caught during testing and repaired before repository write.

### Explicit non-actions
- No M02 atomic authoring.
- No historical T22 progress migration.
- No T25 modification.
- No merge to `main`.
- No deployment.
