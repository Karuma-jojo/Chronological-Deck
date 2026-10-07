# M05 v2.1 whole-curriculum candidate review handoff

Date: 2026-10-07. Branch: `codex/t22-m05-whole-curriculum-rebuild`.
Authoring: `m05-authoring-v2.1-whole-curriculum-candidate`.
Instruction: `m05-instruction-v2.1-whole-curriculum-candidate`.
Status: **builder candidate awaiting independent adversarial review**.

Start with [the source and all-module audit](M05-WHOLE-CURRICULUM-AUDIT-2026-10-07.md), [the design gate](M05-V2.1-DESIGN-GATE.md), [the boundary](M05-BOUNDARY.md), and current `course/t22/authoring/m05.json`.

The recovered main is `5ecb2806fda6c1904c7eb10739bd5e553801e5eb`; prior M05 blob is `af37d469c95c65f3584e1dc9df97d113f2fe5a6e`. The earlier v2 R01–R08 review/repair remains recorded in its original immutable design/review files. It does not independently certify this expanded candidate.

Current contract: 28 sessions, 56 fixed Main/Transfer task slots, 56 evaluators and 140 ownership claims. The semantic separation, wrong-solver, prerequisite and evidence-distance ledgers cover every session/task. There are zero fixed Mains labelled fresh, zero changed-surface Transfer claims, and zero current decision-audit entries. S24’s two exit tasks are integrated reasoning reconstruction. All eight new tasks are reasoning reconstruction.

S25 adds finite risk/chord comparisons and table CE limits. S26 adds decisions under incomplete joint laws. S27 adds constrained comparison of supplied stopped policies. S28 adds mixed support/probability/deviation checks. S01–S24 keep their stable IDs, with learner positions changed only by insertion. S20-T’s false counterexample is fixed, S15-T/S21-T expose the requested rubric obligations, and S19 separates unconstrained rankings from feasible choices.

Provenance: 48 prior r1 assessment fingerprints and 24 session contract hashes are retained in the pack. Seven existing public tasks increment their obligation versions; 41 existing assessment fingerprints remain unchanged. Eight new tasks start at version 1. The older reconstruction’s twelve preserved / thirty-six changed contracts and subsequent ten repair surfaces remain historical records. They are not re-labelled as new-review acceptance. S12 public assessment meaning is unchanged but its added M04-S28 prerequisite can stale the session contract. Every stale attempt remains stored verbatim.

Instructional overlap audit removes the discovered answer reuse and records its historical target tasks, including cross-session S20 → S22-T. Current per-session instruction versions are respected; an unchanged lesson is not falsely stamped with the new global version. Unsolved guided practice remains distinct from answer exposure. Import/merge order cannot erase old answer exposure.

Checks to reproduce:

- `node scripts/test-t22-elite-m05.mjs`
- `node docs/t22-course/audit/m05-candidate-math.mjs`
- `node docs/t22-course/audit/m05-independent-math.mjs`
- `node docs/t22-course/audit/m05-m06-transfer-math.mjs`
- `node scripts/test-t22-elite-m05-m06-repairs.mjs`
- `node docs/t22-course/audit/m05-handoff-checks.mjs`
- `node scripts/test-t22-elite-m05-v2-browser.mjs`
- full `.github/workflows/t22-elite-checks.yml`

Math scope is explicit: seventeen critical actual public models are independently calculated and bound to reference/rubric roles; 69 deliberate corruptions must fail and one coherent model edit must pass. All 28 actual lesson/task/rubric/claim payloads additionally have builder semantic hashes. Supplemental historical examples are not described as independent computation of every current task.

The Chromium test walks all 28 learner positions and 56 task/reference/rubric surfaces, attempts every guided check before feedback, verifies all four new representations, tests mobile width and Unicode, imports all 48 prior evidence records with exact current/stale classification, probes the newly found cross-session exposure migration, and performs save/reveal/export/import/reload. Full regression checks preserve other authoring packs and pin the authorized M05 exception to the exact candidate bytes.

Reviewer attacks: recompute the S20-T response/minimizer mismatch; seek hidden assumptions in S26/S24 joint laws; enumerate S27 prefixes and normalization; check S25’s finite/global risk distinction and unobserved exact CE; check S28 support, illegal mixing probabilities and both-player deviations; compare all worked examples against public tasks; verify rubric/public-request observability; inspect evidence-distance honesty and historical migration. Inspect whole-curriculum seams, especially M04’s ownership and M06’s remaining posterior-to-action bridge.

Do not merge to main. Do not self-declare acceptance. Freeze the final exact commit and subject this candidate to independent review before promotion. M06 and later authoring packs remain outside this implementation pass.
