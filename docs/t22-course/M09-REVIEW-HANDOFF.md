# M09 handoff

Scope: M09 only; M10 remains closed. User authorized this build and main publication, with M01–M08 preserved as their accepted baseline.

Recovery base: `de020e0e7a3a37d62b0d7570512be46755b70ec2`, including six accepted follow-up commits beyond recovered main `2f8bd161fc9b9a0163713ed0c7f4341879b47419`. See `M09-BOUNDARY.md` for ancestry, prerequisite/source and sizing decisions; `M09-VERIFICATION.md` for review, repairs and evidence limits.

Deliverable: 27 sessions, 54 fixed assessments and references, 82 semantic ownership links. Stable module ID `SIDE263`; Elite IDs start `T22V3::SIDE263::`. Instruction `m09-instruction-v1`; initial obligations version1. This is builder verification, not independent acceptance or learner mastery certification.

Canonical files:

- `course/t22/authoring/m09.json`
- `docs/t22-course/audit/m09-semantic-contract.json`
- `docs/t22-course/audit/m09-preserved-baseline.json`
- `scripts/test-t22-elite-m09.mjs`
- `docs/t22-course/audit/m09-math-checks.mjs`
- `scripts/test-t22-elite-m09-browser.mjs`, called by the full existing browser suite

Recovery instructions: read the latest remote heads and ancestry first; do not regenerate the accepted baseline. Run the exact workflow commands, inspect actual Actions at the implementation SHA, and preserve any intervening main changes. Future public obligation edits must increment obligationVersion and respect existing fingerprints/exposure; do not create an equivalence merely to keep an old green status.

Current status: builder verified and published. The exact successful branch/main Actions receipts follow.

## Verified publication receipt — 2026-09-24

Implementation commit: `1eb834ef93ca7ab36cc8ded0abd0cbc9479d4b0f`. Pushed to `codex/t22-pedagogical-rebuild`, read back, then fast-forwarded to `main` and read back. Both heads were checked before publication; main had not moved. All six accepted follow-up commits beyond the recovered main remain ancestors. Remote tree hashes verified all 19 implementation files.

- Branch full T22 run: [35983499159](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983499159), job `107580669242`, **SUCCESS**.
- Main full T22 run: [35983644114](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983644114), job `107581139237`, **SUCCESS** at the exact implementation SHA.
- Actual logs from both jobs were inspected: inherited checks, M09 mathematical/semantic/provenance checks and the real Chromium browser step all passed. Browser coverage includes every M09 lesson and task, mobile width, assistance/draft persistence, save/reveal/review, packet exposure, fresh navigation and nine-module export/import.
- All 64 local non-browser workflow commands passed. Local Chromium was absent; browser success is the executed GitHub result, not a claim that the failed local launch passed.
- All 40 observed workflow runs at the implementation SHA reported success, including the repository's existing main-triggered integrity and publication workflows. No T25 or SMMC source changes were made.
- Machine-readable receipt: `docs/t22-course/audit/m09-validation-receipt.json`.

A subsequent documentation-only receipt commit records these facts; the validated implementation remains the SHA above. M01–M08 canonical files and progress identifiers are preserved. M09 is builder verified, not independently accepted. **Stop here: M10 remains closed.**
