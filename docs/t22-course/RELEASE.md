# T22 Elite Quant Course — M01 Study Guide

Status: **M01-only development release on `codex/t22-pedagogical-rebuild`**. Not merged or deployed.

## What exists

- Dedicated learner surface: `t22-course.html?module=1&session=1`.
- Frozen 65-module roadmap visible in the sidebar; only M01 is marked authored.
- M01: **Quantitative Foundations I — Numeracy & Algebra**.
- 17 bounded sessions, each with a stable versioned session ID, explicit capability contract, main investigation, transfer investigation, learning note and evaluator rubric.
- 34 original tasks total.
- Separate evidence storage key: `chrono_t22_elite_course_evidence_v1`.
- Export/import, exposure tracking, assistance tracking, contract-hash tracking, self-review, attempt history and delayed review queue.

## Study sequence

1. Open the dedicated course page through a web server / deployed GitHub Pages build. Do not open the HTML directly from `file://` because JSON/module loading may be blocked.
2. Read the session title, focus and capability contract.
3. Attempt the **Main investigation** before opening the learning note when possible.
4. Save the attempt. Only then may the evaluator reference be opened.
5. Review the saved attempt honestly. A correct answer with a reference already exposed is not fresh independent evidence.
6. Attempt the **Transfer investigation** without copying the main solution route.
7. Return when the review queue calls the session back. Delayed retrieval is part of the course, not optional polish.
8. Session/task evidence does not automatically clear M01. The page reports evidence coverage only.

## M01 boundary

M01 owns signed arithmetic, exact fractions, ratios/rates, percentages, sequential percentage changes, units, estimation, powers/roots/scientific notation, symbolic manipulation, factoring, linear equations, formula rearrangement, 2×2 linear systems, linear inequalities, absolute value and elementary quadratic equations.

M02 owns functions, domains/ranges, graphs, coordinate geometry, transformations, exponentials/logarithms, sequences, sigma notation and essential trigonometry. M01 should not silently expand into those topics.

## Evidence identity

Session IDs use the Stage-A stable/versioned pattern, e.g. `T22V3::T22E-FND01::S01@1`. Problem obligations append `-M@1` or `-T@1`. Route position is presentation metadata, not mastery identity.

Each saved attempt stores the session contract hash that was current when the work was done. If a future edit changes the contract, old evidence is preserved but is shown as stale rather than silently reinterpreted as current mastery.

## Safety boundary

This M01 development release does not migrate or overwrite the historical T22 `chrono_t22_atomic_progress_v2` state, does not modify T25 evidence, and does not claim legacy atomic clearance.
