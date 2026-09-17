# Astra review contract

Purpose: spend reviewer effort on expensive-to-miss errors, not on reformatting the entire course. Read START-HERE.md, RUN-LOG.md, REVIEW-PACKET.md and relevant original files. Use current branch contents; record exact audited SHA. The author model's summaries are leads, not proof.

Do not assume the work needs only minor tweaks. Do not silently redesign the route or widen the scope. Do not call a model audit human/expert certification.

## Architecture mode

Review before bulk production:
1. Does the entry point fit a learner whose Class 12 foundations are still developing?
2. Trace concrete prerequisites, including notation, programming, probability and calculus; a DAG alone does not prove pedagogical order.
3. Check the full default route, shared core, trading/research distinction, optional branches and T25 reuse.
4. Inspect migration rules and whether existing archived achievements remain faithfully represented.
5. Solve all three sample main/transfer tasks independently before comparing keys. Evaluate coding correctness using an independent check where feasible.
6. Check that main/transfer tasks actually assess the stated intellectual capability.
7. Inspect teaching/WALL/reference boundaries and whether narrative gives structural clues.
8. Check that coding has an earned progression and that a beginner can begin practical work early.
9. Flag role claims not supported by current primary sources and employment/profitability overclaims.
10. Decide whether samples/schema are suitable for replication.

Output ASTRA-FINDINGS.md:
- reviewed SHA and files;
- P0: wrong mathematical result, data loss/migration error, answer leakage or similarly release-blocking fault;
- P1: missing prerequisite, missing core role capability, invalid assessment or misleading empirical claim;
- P2: bounded usability/clarity defect;
- evidence, counterexample, affected IDs, proposed repair and resolution criterion for each finding;
- explicit unreviewed scope;
- disposition: architecture usable / usable after listed repairs / architecture needs revision.

Absence of found defects is not proof of perfection. Sol can execute concrete repairs; reserve another reviewer pass for substantive unresolved changes.

## Final mode

Read deltas since the reviewed architecture rather than rediscovering the whole repository. Inventory all content and review status.

Review every identified high-risk claim/reference: dependence, asymptotics, optimiser existence, singular/degenerate cases, uncertainty quantification, Kelly/ruin, leakage, multiple testing, costs and capacity. Choose a recorded, representative sample from the remaining lower-risk content across every phase. Explicitly list IDs checked and not checked; sampling is not whole-bank certification.

Independently derive selected answers before examining the author key. Inspect primary sources and research-code tests. Run or inspect actual outputs for appropriate checks; do not accept an unverified PASS label.

Audit:
- default prerequisite route and available bridges;
- completeness of trading and research branches;
- realistic entry-level versus advanced scope;
- assisted/exposed versus independent evidence;
- old-progress migration and unrelated route preservation;
- public task/engine-only reference separation;
- deterministic build, meaningful tests and essential UI workflows;
- practical project reproducibility and holdout integrity;
- readiness claims and learner-pilot limits.

Output REVIEW-REPORT.md and update ASTRA-FINDINGS.md, RUN-LOG.md:
- exact commit, coverage, source checks, tests and known limits;
- issues with concrete evidence;
- disposition: not ready / ready for limited learner pilot / ready for user merge review;
- no employment, profit or pedagogical-perfection guarantee.

Commit and push review documents on the existing branch, checking for concurrent updates first. Do not merge or deploy. Small surgical fixes are acceptable if independently validated and recorded; leave larger construction work to Sol.
