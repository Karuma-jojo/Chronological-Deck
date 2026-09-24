# Astra A-01 through A-07 resolution record

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Reviewed Astra content checkpoint: `da0776048f47f1b9d98ad71589e015d132c309f9`  
Astra review commit: `a2e45d168436d7875fcdfbe0efd5de850d806c0f`

## Resolution table

| Finding | Resolution | Persistent acceptance check |
| --- | --- | --- |
| **A-01 assessment mutations did not stale evidence** | Added SHA-256 assessment fingerprints over problem ID, obligation version, kind, prompt, session ID and evaluator reference/rubric/marking. Saved attempts carry the fingerprint. Legacy/pre-fingerprint evidence is preserved but is historical/stale, never silently upgraded. Explicit per-problem fingerprint equivalence is the only opt-in route for reviewed nonsemantic wording changes. | `docs/t22-rebuild/audit/check-current.mjs` mutates prompt only, rubric only and reference only and requires all three to stale earlier evidence; it also tests explicit equivalence and round-trip preservation. |
| **A-02 evaluator packet leaked both references while recording only one exposure** | The packet is explicitly labeled answer-bearing. Export snapshots session/problem/visit, cancels if navigation changed, then marks **both fixed tasks** `packetExportedAt` and `referenceSeenAt` before copying. Attempts saved after exposure are `revealed`/non-independent. A separate fresh-probe request contains no reference. | Unit regression checks both task exposures and pre-vs-post export evidence; browser test checks clipboard packet, both local-storage exposures, post-exposure transfer provenance and no spill into the next session. |
| **A-03 review records counted as extra practice / transfer could be missing** | Reviews now attach only to an original attempt and change its effective judgment; review timestamps do not become practice days. Main and transfer evidence are tracked separately. Repeated genuine mathematical attempts count as retrieval. Fixed-reference exposure routes the learner toward a fresh replacement probe. | Regression requires review-date invariance, explicit missing-transfer queue reason and due-date change only after a genuinely new mathematical attempt. Browser test exercises save/reveal/review/export/import/reload. |
| **A-04 hidden prerequisites in early M01** | S01 assessment no longer uses fractions/radicals; S07 no longer requires scientific notation; S08 now teaches rational exponents and real-domain caveats before assessment; S14 teaches interval notation. A machine-readable S01-S08 prerequisite-source audit names the prior/JIT teaching source for each new notation/operation. | `scripts/test-t22-elite-m01.mjs` rejects the old S01/S07 leakage and requires prerequisite-audit rows plus the repaired S08/S14 instruction. |
| **A-05 notes/assessment under-covered ownership** | All 17 learning notes now contain a novice explanation, worked example and guided check. Targeted tasks now observe fraction multiplication, ratio reduction, percent-decimal conversion, dimensionless percentages, estimate type, GCF/illegal cancellation, formula verification/exception branches, elimination, interval checks, negative absolute-value thresholds and a genuine quadratic-formula case. Added an 85-claim machine-readable coverage map. | Validator requires `Worked example`, `Guided check`, and exactly one nonempty evidence mapping for every one of 17×5 required-ownership claims; all active evaluator rubrics must total 10. |
| **A-06 topological graph was not a semantic-prerequisite proof** | Added 65-row `SEMANTIC-PREREQUISITES.json`. Only accepted modules may be learner-facing. Added missing graph edges M07←M02, M26←M18, M33←M21 and M42←M02. Locked bounded bridge owners: M09-B01 limits without derivatives; M26-B01 iterated integration/support geometry; M33-B01 basic numerical-MLE solver interpretation; M42-B01 complex roots/modulus for AR stability. | `scripts/test-t22-semantic-gates.mjs` requires all 65 ledger rows, topological validity, named edges/bridges and semantic acceptance for every roadmap module marked authored. The same gate is required module-by-module going forward. |
| **A-07 worked instruction repeated live assessment answers** | Re-authored all 17 M01 lessons so worked/guided examples use distinct data from both fixed tasks. Added a 17-row instruction-separation ledger plus historical exact-answer overlap ledger. Legacy exposures are migrated at their original timestamp; attempts before exposure remain valid and later attempts are excluded from independent evidence. New lesson exposures carry an instruction-content version so general method study is not permanently contaminated. | M01 validator checks all 17 separation rows against both tasks. Browser regression tests current lesson→navigate→return as independent method study and legacy answer-containing lesson→navigate→return as revealed evidence. |

## Additional audit corrections incorporated

- S12 now preserves the exceptional original branches instead of claiming a solved-form denominator restriction proves no solution: `r=-1, V1=0, V0≠0 arbitrary`, and `q=1, b=0, a≠0 arbitrary`.
- Review intervals are labeled product-default scheduling intervals, not validated memory estimates.
- Session lookup is by stable task/session identity rather than positional `sessions[p.order-1]` indexing.
- M01 authoring provenance is explicit: checked-in base JSON plus `course/t22/authoring/m01-repairs-1.1.json` is the current canonical authored source.
- The old Stage-A `REVIEW-PACKET.md` is explicitly historical and no longer acts as the current stop instruction.

## Verified checkpoints

1. `29c15b627f1f9f7a452761d2ca5befa597b188fa` — A-01 through A-03 evidence-integrity repair.
2. `7b20db2cd90d22cee9a4499e3909521b9a121fa7` — A-04 through A-06 pedagogy/semantic repair plus reusable validation workflow.
3. `68f963dfacf2eb22d4c351188aecbab19bb5ed27` — validator tolerance correction + semantic test added to workflow.
4. `95f49e6d1737109149a1cab33e3ba1f9f30b3702` — scale-aware independent-numerics validator correction.

## Validation evidence

GitHub Actions workflow: **T22 Elite checks**, run `35271225456`, head `95f49e6d1737109149a1cab33e3ba1f9f30b3702`.

All workflow steps completed successfully:

- JavaScript syntax checks;
- M65 topological validation;
- M01 17-session / 34-task structure;
- novice worked-instruction checks;
- **85/85 ownership claims mapped**;
- targeted A-04/A-05 probes;
- 65-row semantic gate and named A-06 bridges/edges;
- A-01/A-02/A-03 evidence-integrity regressions;
- independently re-derived arithmetic/math checks;
- Playwright/Chromium browser workflow covering load, note-assistance provenance, save/reveal/review, export/import/reload, dual-task packet exposure, post-exposure provenance, fresh-probe request, corrupt-storage preservation and 390px mobile width.

The first two workflow attempts failed on overly strict floating-point assertions in the test harness; the expected mathematics was correct. These were repaired to scale-aware tolerances before the successful run above.

## Boundary after resolution

A-01 through A-06 are accepted for the current M01 implementation. M02 may now open, but it must pass the same sequence before it can be exposed as authored:

semantic ancestry → prerequisite-symbol audit → novice lesson/worked/guided path → claim-to-task coverage → assessment fingerprints/evidence semantics → independent math/reference checks → browser workflow → green checkpoint.

No merge or deployment has occurred.

## A-07 verified checkpoint

Implementation head: `1dc914c3d505abc7dd7b38b29ff1be0d3ea5c3d8`.  
GitHub Actions **T22 Elite checks** run: `35303082691` — **SUCCESS**.

The first A-07 runs intentionally failed on two useful gates: one separation-fragment collision / retained prerequisite-teaching check, then a missing UI import that prevented browser startup. Both were repaired before acceptance. The successful run passed syntax, structural/pedagogy/semantic/evidence checks, Chromium workflow, historical exposure migration, and current-vs-legacy lesson navigation behavior.
