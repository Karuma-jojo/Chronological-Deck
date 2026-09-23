# M05–M06 repair resolution

Date: 2026-09-23. Branch: `codex/t22-pedagogical-rebuild`.

**Implementation complete; validation and remote checkpoint verification in progress. M07 remains closed.**

## Recovered state and ancestry

Remote head was `bd0b54f71524b831ec264d9fcae1afb3d2dfd7dc`, parent `9efe72ee1c87579b4ba5ab491f31f259a976752e`. The prior M01 packet fixes and M05/M06 implementation are in its ancestry. No later resolution/acceptance records existed. All471 tree entries were inspected and every recovered blob matched its Git SHA. No AGENTS.md exists. Git transport was unavailable locally; reads and fast-forward writes use the connected GitHub API against the exact original parent/tree. Unrelated files remain in that base tree.

## Finding dispositions

| Finding | Disposition and exact scope |
| --- | --- |
| BATCH-01: failing gate/no full run | Replaced M05 S12 literal-word guard with checks for the taught finite horizon, first-hit rule, absorption and prefix reasoning. Preserved all unrelated gates. Full local execution also exposed obsolete M03-handoff assertions forbidding the already-authorized M05/M06 packs; only these progression guards were advanced to verify M05/M06 registration and keep M07 closed, with all M03 repair pins retained. Full Actions verification pending below. |
| M05-01: repeated learning exercises | `course/t22/authoring/m05.json`: changed S15/S16 guided data and S18 worked utility table. Also changed S20 worked table so its chosen guarantee is distinct. All24 lessons and both tasks reviewed in the semantic audit. |
| M06-01: worked/practice answer overlap | `course/t22/authoring/m06.json`: changed worked/practice data in S05,S10,S18,S19,S20,S22,S23,S24. S10/S19/S24 include additional cross-session/subanswer overlaps found during repair. S05 now explains the example with frequencies before S06 derives Bayes. |
| BATCH-02: positional claim links | Both packs: all240 claims compared with the actual96 tasks and rubrics. Non-positional/multi-row mappings repaired in M05 S02,S03,S09,S12,S13,S14,S20 and M06 S01,S03,S06,S12,S17,S22,S23. M05 S12 path claims deliberately observe Transfer. Overstated claims narrowed in M05 S20 and M06 S03,S05,S09,S10,S11,S24. Main S09 in M05 now requests the total-payoff sum instead of supplying it. |
| BATCH-03: unrequested scoring | Public requests/evaluators aligned across all96 pairs. Specific added explanation/range/meaning requests and exact v2 task IDs are listed in each handoff. Negative accuracy/scope guards explicitly require no unasked disclaimer. M06 S13 Transfer now scores relative likelihood magnitude, without requiring the posterior-odds identity introduced in S14. Equivalent valid solutions remain acceptable. |
| M05-02: endpoint-only ruin task | S12 Transfer now starts at1 with three potential ±1 plays, win probability.6, absorption at0. First-hit prefixes L and WLL have probabilities.4 and.096, total.496. Unstopped LWW ends positive but hit0 earlier. Endpoint-only counting gives.352, demonstrably different. Reference, five rubric rows, claim coverage and obligationVersion2 updated. |
| Historical exposure/version handling | Both instruction versions are `m0X-instruction-astra-r1`. Only changed fixed contracts become obligationVersion2; stable IDs remain. Historical solved-answer ledgers contain one M05 and21 M06 source→task links; separate unsolved-practice ledgers create no reveal. `core.js` migrates each validated merge input before coalescing version summaries. |

## Detailed review and guards

`M05-M06-SEMANTIC-AUDIT.md` records a task-specific rationale for each session, both exact public requests and all240 observing links. `audit/m05-m06-reviewed-contracts.json` pins the reviewed session/lesson/task/evaluator/map payload and historical baseline fingerprints. `audit/m05-m06-semantic-checks.mjs` rejects unreviewed drift and permits genuinely observing Main/Transfer and multi-row evidence. The four module/handoff scripts no longer enforce positional mapping. Mutation regression demonstrates that an existing but semantically wrong row is rejected by the reviewed record.

Numerical checks: existing separate Main calculation scripts plus `audit/m05-m06-transfer-math.mjs` independently recompute all48 Transfer numeric references, the first-hit counterexample and repaired worked examples. The manual review separately covers symbolic derivations, interpretation and scope. A passing hash or arithmetic check is not treated as proof of pedagogy.

## Provenance detail

M05 old S18 → S18 Main. Old S15/S16 unsolved guided exercises are not fabricated answer reveals.

M06 old source sessions:

- S05,S10,S23 → Main S01,S05,S22,S23 (shared exact posterior subcases).
- S18 → S18 Main; its old guided Transfer is unsolved practice only.
- S19 → S19 Transfer (solved first conditional-independence subcase); its old Main guided product check is unsolved practice only.
- S20,S24 → S20 Main (same full likelihood-pair calculation).
- S22 → Main S01,S05,S16,S22,S23 (shared exact posterior subcases).

The links preserve an answer-bearing numeric core even when a public explanation/rubric changed; old fingerprints independently mark obsolete assessment obligations stale. Pre-exposure current-contract attempts can still qualify; post-exposure attempts cannot. Old response text/timestamps are preserved, including stale responses. New separated lesson visits do not permanently expose fixed answers. No claim is made about unrecorded outside exposure.

## Verification checkpoint

Pending implementation commit and full Actions run. Do not infer success from this file or the workflow definition.

Local browser launch currently reports no installed Chromium executable. The required real-browser result must therefore come from the pushed implementation's complete Actions job, with every required step inspected, not from a passing subset.

## Learner continuity

The user's supplied SPIRE RAW/POLISHED account reports M01's17 sessions completed, transfers and targeted FORGE0 clarification. The retained-state reconstruction is not a complete independent audit trail. Continue with M02; use brief later checks for specific gaps rather than restarting M01. Preserve established reusable principles. Extraction typo: hours→seconds multiplies by3600; per-hour→per-second rates divide by3600. The recorded72 km/h=20 m/s was correct. This repair does not import or recertify those external judgments as runtime mastery.

## Recovery / stop

Finish local required gates, push coherent changes to the named branch with a non-forced ref update, read back the head, inspect full Actions results, repair any real failures, then record the exact implementation SHA/run URL and final documentation checkpoint. Stop before M07. No merge, deployment, T25 edits or legacy progress migration.

## Local verification before implementation push

All46 non-browser commands in the updated full workflow passed on2026-09-23 (syntax plus structural, mathematical, semantic, evidence-provenance and handoff checks). `git diff --check` passed. Local browser launch was attempted and failed solely because Chromium is not installed. Remote full-suite browser validation remains required. The stale M03 progression guard was advanced without changing accepted module content.
