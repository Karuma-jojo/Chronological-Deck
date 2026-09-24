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

Initial checkpoint status: authored; local structural/semantic/evidence and mathematical checks passed. Browser/full workflow and final main publication receipts are pending below. Do not infer their success from this handoff alone.
