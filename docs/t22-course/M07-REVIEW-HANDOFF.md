# M07 REVIEW-HANDOFF — Markets 0: Prices, Returns & Trading Mechanics

Date: 2026-09-24  
Branch: `codex/t22-pedagogical-rebuild`  
Stable module: `T22E-MKT01`  
Status: **CERBERUS-HARDENED CANDIDATE — FULL SUITE VERIFIED; INDEPENDENT ASTRA REVIEW NEXT; M08 CLOSED**

## Scope

M07 only. This handoff does not authorize M08, merge to main, deployment, T25 modification or legacy T22 migration.

## Candidate structure

- 24 sessions.
- 48 fixed assessments: Main + Transfer per session.
- 120/120 required-ownership claims with explicit public-request/rubric evidence.
- 48 evaluators, each totaling10 points.
- Stable new IDs under `T22V3::T22E-MKT01::...`.
- Shared evidence key remains `chrono_t22_elite_course_evidence_v1`.
- Authoring version: `m07-authoring-v1-cerberus`.
- Instruction version: `m07-instruction-v1-cerberus`.

## Prerequisite boundary

M07 requires M01, M02 and M05. M02 is explicit because log-return work depends on logarithms/exponentials.

M07 deliberately stops before:
- M45/M46 market-data engineering;
- M47 order-book microstructure;
- M54 asset-pricing/no-arbitrage/derivatives;
- M55 portfolio theory;
- M56 execution optimization/TCA.

## CERBERUS pre-review

Read `M07-CERBERUS-AUDIT.md`.

The builder adversary found and repaired four classes before handoff:
- M02 prerequisite drift between dependency graph and learner roadmap;
- hidden positive Transfer rubric obligations;
- an avoidable early quote/fill ambiguity;
- obsolete historical M07 stop/version guards.

High-risk capability-discrimination tasks are pinned by `scripts/test-t22-elite-m07.mjs`; independent arithmetic/counterexample checks live in `docs/t22-course/audit/m07-independent-math.mjs`.

## Runtime integration

M07 is registered as a **validation** candidate in the roadmap and loaded as module7 in the shared learner runtime. It is not marked independently accepted.

The browser regression is extended through M07:
- 7 module options;
- 24-session M07 surface;
- save/reveal/review with current hashes;
- unsaved draft + assistance provenance round-trip;
- packet answer exposure for both fixed M07 tasks;
- seven-module export/import.

## Validation state

Verified implementation head: `84baddc69643f4654eb87bf05ed907febf37b077`.

Complete T22 Elite Actions run `35927759177` succeeded on that exact SHA. Job `107406819179` completed successfully, including:
- syntax checks;
- structural/pedagogy/semantic/evidence regressions;
- M07 CERBERUS structural/pedagogy gate: PASS;
- M07 independent market-arithmetic/counterexample checks: PASS;
- M07 handoff/integration gate: PASS;
- Chromium installation: PASS;
- real seven-module browser evidence workflow: PASS.

The browser log explicitly confirms M01+M02+M03+M04+M05+M06+M07 module scoping, M07 unsaved-draft/assistance provenance, save/reveal/review, seven-module export/import, packet exposure through M07, corrupt-storage preservation and mobile width.

This is builder-side verification, not independent acceptance. M07 remains a candidate for Astra review.

## Reviewer mission

Astra should attack semantic observability, instruction/fixed-assessment separation, hidden prerequisites, finance terminology/convention precision, prompt/rubric fairness, task discrimination and downstream-boundary leakage. Do not spend the expensive pass primarily on formatting.

## Stop

**STOP HERE. M08 CLOSED.**  
No M08 authoring until M07 receives the next bounded independent disposition.
