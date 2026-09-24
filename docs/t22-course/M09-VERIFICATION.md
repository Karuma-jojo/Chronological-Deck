# M09 verification and repair record

Date: 2026-09-24. Status: builder verified and published to main. Full Actions and actual Chromium passed at the implementation SHA; see the receipt below.

## What was checked

Canonical pack: `course/t22/authoring/m09.json`: 27 sessions, 54 public tasks and references, 82 ownership claims. Every claim was read against its actual public request and selected rubric rows. Links are variable in number and can target Transfer or multiple criteria; no positional claim-to-rubric assumption is used.

Every task was solved from its prompt; references and rubric obligations were then compared with that solution. Every lesson has definitions/conventions before use, a worked derivation and guided practice with a check. Equivalent correct proofs and conservative cutoffs earn full credit unless minimality is expressly requested. Neither unexplained samples nor a correct candidate value earns requested proof credit.

## Bounded repair decisions before first publication

| Finding | Affected surface | Disposition |
| --- | --- | --- |
| A function-limit/subsequence implication was used before being explained | S21 Transfer and lesson | Added the neighborhood-to-sequence argument before the task |
| Pole diagnosis precedes the formal local-infinity definition | S19 Transfer and lesson | Added a sign/size explanation for failure of a finite limit; S23 retains formal threshold ownership |
| S27 reference used an unnecessary rational/irrational construction | S27 Transfer reference | Replaced with a piecewise sine construction using S21's established material; alternative valid constructions remain accepted |
| Inherited tests froze the runtime at M08 | M06/M07/M08 handoff guards; M08 content test | Changed only future-module guards to permit authorized M09 and retain M10 stop; M01–M08 content/contract pins remain intact |
| Main pushes did not run the full T22 workflow | `.github/workflows/t22-elite-checks.yml` | Added main trigger and M09 checks; retained all inherited mathematical, semantic, provenance and real Chromium steps |
| Draft oracle searched for a differently spelled intermediate expression | M09 math-check script | Corrected the test witness to the actual equivalent reference expression; no learner obligation changed |

## Mathematical review map

| Sessions | Reviewed reasoning and adversarial checks |
| --- | --- |
| S01–S04 | Eventual vs infinitely often; strict 7/n boundary; indistinguishable finite prefixes; arbitrary-epsilon cutoffs; least strict/non-strict cutoffs; uniform bound vs actual error; fixed-tolerance negation and sparse exceptions |
| S05–S09 | Triangle inequality and synchronized cutoffs; entire-sequence boundedness including N=1; linear error propagation; weak order in limits; denominator lower bounds; shrinking envelopes and bounded counterexamples |
| S10–S14 | Bernoulli induction and signed geometric cases; parity indices and common-tail reconstruction; least-upper-bound proof; rational monotonicity; affine invariant and convergence before fixed point; threshold growth versus recurring zeros |
| S15–S18 | Accumulation-point convention; isolated point vs punctured limit; affine and zero-slope delta choices; nonlinear upper/reciprocal lower bounds; parameter joins and absolute-value branches |
| S19–S23 | Factor-only cancellation with holes; pole sign/size; radical domains and exact error rationalization; non-circular radian squeeze; two approaching paths; negative-tail absolute values; signed local threshold neighborhoods |
| S24–S27 | Continuous extensions and endpoint continuity; IVT hypotheses versus uniqueness; exact bisection signs, midpoint error and least iteration count; EVT hypotheses versus converse; attained extrema versus bounds; radical synthesis and whole-function counterexamples |

`audit/m09-math-checks.mjs` independently reconstructs the fixed numerical results, algebraic identities, threshold boundary cases and adversarial witnesses across all 27 pairs. It checks actual stored references against these results. Finite certificate probes are regression evidence, not proofs of quantified statements. The universal arguments are the written derivations reviewed above. No formal proof assistant or external independent reviewer was used.

## Assessment separation and observability

Every session has a concrete wrong-solver witness and a lesson/Main/Transfer distinction in `semanticSeparationAudit`. The audit checked mathematical meaning across all lessons, not merely identical strings. Necessary theorem instruction is allowed: S05 teaches uniqueness before asking reconstruction, while its Transfer combines unequal budgets. S13 openly demonstrates an affine recurrence proof; the fixed Main requires a new invariant and recurrence, and Transfer exposes a nonconvergent trajectory. S21 establishes the sine theorem; its Main requires normalized quotient/domain/radian reasoning and Transfer reconstructs an error bound plus opposing input paths.

The strongest synthesis is S27: the lesson uses rational envelopes, Main independently derives a radical extension and sequence certificate, and Transfer constructs different whole functions consistent with the same sampled data. No lesson supplies that fixed pair of constructed functions. The analogous radical technique in S20 is a prerequisite method, with different target, domain and assessment obligations.

`audit/m09-semantic-contract.json` pins the reviewed wording, links and scoring. Mutation tests reject existing-but-wrong rubric rows/tasks, changed prompts and lesson drift. These pins detect regression; they cannot prove the original links sound. The builder's semantic review is the basis, and independent review remains a distinct possible next step.

## Instruction, assessment and historical exposure

- Initial instruction version: `m09-instruction-v1`; authoring pack `m09-authoring-v1-builder-verified`.
- 27 stable session IDs `T22V3::SIDE263::S01@1` through `S27@1`; 54 fixed tasks `...-M@1`/`...-T@1`, initially `obligationVersion: 1`.
- Legacy SIDE263 and Elite M09 are not declared equivalent. No legacy progress or answer exposure is migrated, and no old attempt is silently certified against these new tasks.
- No earlier Elite M09 release was present at recovery. Prepublication local edits therefore do not stale published M09 attempts; initial historical exact-answer maps are empty, not fabricated histories.
- The shared evidence key remains `chrono_t22_elite_course_evidence_v1`. Contract/assessment fingerprints are prepared by the existing engine. Changed prompt, reference, rubric or ownership contract stales prior evidence; regression tests exercise all four.
- Lesson assistance during an attempt remains guided. Fresh navigation after distinct instruction can be independent. Revealing or copying the answer packet records exposure to the appropriate fixed tasks. Later exposure preserves earlier independent timestamps but blocks relabeling later work as independent.
- M01–M08 canonical packs are hash-pinned to recovered `de020e0…`; their existing progress IDs, obligations and histories are untouched.

## Verification limits

The local environment initially lacked a Chromium executable. That failed launch is not a browser pass. The full GitHub workflow installs Chromium and must actually complete the browser step before publication is called verified. A workflow file or passing mathematical subset alone is insufficient. Record exact run/head/job and outcome below after inspection.

No assertion here says the module is perfect or independently accepted. The deliverable is a coherent, mathematically reviewed builder checkpoint with executable regression coverage and explicit limits.

## Verified publication receipt — 2026-09-24

Implementation commit: `1eb834ef93ca7ab36cc8ded0abd0cbc9479d4b0f`. Pushed to `codex/t22-pedagogical-rebuild`, read back, then fast-forwarded to `main` and read back. Both heads were checked before publication; main had not moved. All six accepted follow-up commits beyond the recovered main remain ancestors. Remote tree hashes verified all 19 implementation files.

- Branch full T22 run: [35983499159](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983499159), job `107580669242`, **SUCCESS**.
- Main full T22 run: [35983644114](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35983644114), job `107581139237`, **SUCCESS** at the exact implementation SHA.
- Actual logs from both jobs were inspected: inherited checks, M09 mathematical/semantic/provenance checks and the real Chromium browser step all passed. Browser coverage includes every M09 lesson and task, mobile width, assistance/draft persistence, save/reveal/review, packet exposure, fresh navigation and nine-module export/import.
- All 64 local non-browser workflow commands passed. Local Chromium was absent; browser success is the executed GitHub result, not a claim that the failed local launch passed.
- All 40 observed workflow runs at the implementation SHA reported success, including the repository's existing main-triggered integrity and publication workflows. No T25 or SMMC source changes were made.
- Machine-readable receipt: `docs/t22-course/audit/m09-validation-receipt.json`.

A subsequent documentation-only receipt commit records these facts; the validated implementation remains the SHA above. M01–M08 canonical files and progress identifiers are preserved. M09 is builder verified, not independently accepted. **Stop here: M10 remains closed.**
