# M02 bounded independent review

Reviewed head: `f49479068d8fb3416dbe823e9fdacd628d90e268`.
Branch: `codex/t22-pedagogical-rebuild`.
Disposition: **M02-01 through M02-04 RESOLVED AND VALIDATED**. The 24-session structure and existing work were preserved. The repaired module is cleared for M03 to open under the established gates; no redesign or compulsory Astra re-audit is required.

## Verified scope

Read all 24 M02 contracts, lessons, main/transfer prompts and references; inspected rubrics for identified coverage risks, source/prerequisite/separation maps, validator, M02 handoff and boundary, and shared runtime changes. Checked the repaired M01 examples and historical-overlap ledger. The former S08/S10/S16 exact-answer overlap is removed from those lessons.

The M02 structural/numerical validator was rerun locally and passed. Independently verified GitHub Actions run 35305984203 succeeded at `3bccf31d457b6698b351b29bd9b8185be62741c5`. That run includes the submitted Chromium suite; the current head adds the handoff. No fresh local Chromium run was performed because the local browser binary is absent.

Independently reasoned through high-risk domain, log, inverse, recurrence and trig items and recalculated representative numerical answers. Most references are correct. This is not an exhaustive symbolic proof of every problem, a learner pilot or a guarantee that “120/120 mapped” means 120 independently observed skills.

## M02-01 — P1: recurrence reference rewards an invalid justification

Location: S20 transfer reference and rubric in `course/t22/authoring/m02.json`.

The recurrence y0=0, y(n+1)=2y(n)−1 does not converge to its fixed point 1. The conclusion is correct. The reference justifies it by the three terms −1,−3,−7 “moving away,” calling this an immediate counterexample. The rubric awards rejection “using terms.”

A finite prefix alone does not settle long-run behavior. This directly undermines the intended distinction between a stationary candidate and justified behavior.

Repair: add elementary forward-invariance reasoning: starting at 0, every next term from y≤0 is ≤−1, so all terms remain ≤0 and cannot approach 1. Alternatively derive y_n=1−2^n with appropriate prior instruction. No full convergence curriculum is needed. Require the recurrence-based reason, not merely three observed values. If retaining strictly pre-proof scope, ask what the displayed terms establish and defer a convergence verdict; align the rubric accordingly.

Acceptance: a response containing only the first three terms plus “therefore it diverges” does not earn the reasoning points. A valid invariant is accepted.

## M02-02 — P1: switching modules discards unsaved working

Location: `js/t22-course/ui.js:selectModule/showProblem`.

Within-module navigation saves the textarea into the drafts map inside showProblem. selectModule clears problemId before calling showProblem, so that save is skipped. Reproduction: type an unsaved M01 derivation → switch to M02 → return to M01: textarea empty.

The attached `audit/m02-review-checks.mjs` reproduces this with the actual function bodies in a minimal mocked DOM. It is a focused code reproduction, not a browser test. Saved attempt records are not affected.

Repair: capture the outgoing draft under its stable problem ID before resetting module/session state. Preserve assistance/draft provenance when restoring it; a restored assisted draft must not silently become independent.

Acceptance: browser test unsaved main/transfer draft → other module → original module/task restores the exact text and relevant assistance state. Saved history and module-scoped queues still behave correctly.

## M02-03 — P1: several ownership mappings are not observable evidence

Location: requiredOwnership, coverage, public tasks and rubrics.

Examples confirmed against both task pairs:
- S08 claim 1 distinguishes inverse notation from reciprocal notation. Neither task asks this; a learner can apply the inverse algorithm correctly without establishing that distinction.
- S13 claim 2 states b>0, b≠1. All tasks use fixed valid bases; no prompt/rubric asks for base conditions.
- S18 claim 1 identifies a constant ratio, but both tasks give the ratio. Claim 5 requires a scale/count check, but neither prompt or rubric requires one.
- S12 claim 3 translates a percent rate into a base. Both tasks supply the base and ask for the rate, establishing the reverse direction.

Repair: add concise targeted probes or narrow/split the asserted obligation and its mapping. Example: compare f⁻¹(y) with 1/f(y); classify legal real-log bases; infer a geometric ratio from terms and bound/check its finite sum; build a model from a supplied percentage change. Preserve all logically valid solution methods and avoid unnecessary drills.

Acceptance: for each retained claim, point to the exact public request and rubric evidence that observes it. Manually review all 120 mappings once for this direction-of-task error. Array length and nonempty main/transfer labels are only structural checks.

## M02-04 — P1: two introductory concepts lack the promised novice bridge

Locations: S02 lesson/audit and S21–S22 lessons/audits.

S02 defines domain but does not explain range or demonstrate finding one before asking for ranges. Its worked example only finds a domain. The prerequisite audit lists root legality/intervals/intersection but no range bridge.

S21 states a unit-circle coordinate at 120° and asks for 150°/−45° without teaching standard reference-angle values or quadrant/reflection rules. S22 then assumes that foundation. M01 contains no triangle/trigonometry instruction to supply it.

Repair inside existing sessions:
- define range as attainable outputs, demonstrate bounding plus attainability in a distinct square/root example, and explain the union notation needed for disconnected results;
- introduce radians/orientation, derive or explicitly supply justified 30°/45°/60° unit-circle values and reference-angle/quadrant rules before unfamiliar-angle assessment. Use instructional examples distinct from fixed tasks.

Acceptance: a learner with M01 only has a named teaching source for every step needed in these tasks. Add appropriate prerequisite audit entries. No extra macro module is needed.

## P2 improvements for the next authoring pass

- The S18 geometric-sum formula is stated without showing the finite subtract-and-cancel derivation. A short demonstration would support reconstruction.
- S16's discrete doubling time ln2/ln1.04 is correct for a real-valued interpolation of period count. State that convention, or also distinguish the first integer period at or above doubling (18).
- S23's period formula requires B≠0 (and the ordinary nonconstant amplitude interpretation assumes A≠0); state the scope rather than applying it to degenerate constants.
- The numerical validator often checks standalone arithmetic unrelated to reading the stored reference. Such assertions would still pass if a reference were edited incorrectly. Keep human derivations and add parsed structured expected results or task-linked checks where useful. Exact text-fragment separation also cannot certify semantic independence.
- “FINAL ACCEPTED” before independent review should mean author-validated, with review status separate. Green CI does not close the above semantic findings.

## Next action for Sol

Resolve M02-01 through M02-04 on the existing branch. Update references/prompts and their assessment fingerprints automatically through the established mechanism; preserve old evidence as historical when changed. Convert the draft-loss reproduction into a passing browser regression. Run M01, M02, semantic, evidence and browser gates. Record a resolution table with exact commits and verified runs, push and verify. Then open M03 only and stop with its review handoff.

No legacy T22/T25 changes, migration, merge or deployment are required by this review.


## Resolution checkpoint

Resolved implementation head: `5fa0ab4ec6059d3726dcfff4198843bf6a5e61a9`.  
Successful GitHub Actions run: `35307392781` — **SUCCESS**.

| Finding | Resolution | Persistent acceptance evidence |
| --- | --- | --- |
| M02-01 recurrence reference | S20 transfer now requires an all-future recurrence argument. Reference proves forward invariance: from (y_n≤0), (y_{n+1}=2y_n−1≤−1), so every term stays at least distance 1 from fixed point 1. A finite prefix alone explicitly earns no reasoning points. | M02 validator asserts invariant/reference/rubric wording; focused audit iterates the closed form/invariant; Chromium suite remains green. |
| M02-02 module-switch draft loss | Drafts are keyed by stable problem ID and preserve exact nonempty text, assistance, minutes and note provenance across module switches. Empty/no-working navigation is not treated as an assisted draft, preserving the existing fresh-reconstruction behavior. | Focused audit now expects restoration; Chromium tests main+transfer drafts across M01→M02→M01 and verifies a restored note-assisted draft cannot be silently saved as independent. |
| M02-03 unobservable ownership mappings | Manually reviewed all 120 claims. Added explicit public requests/rubric evidence where direction was missing, including S01 rule/output distinction, S08 inverse-vs-reciprocal, S12 percent→base, S13 inverse/base/ln conditions, S17 indexed-function view, S18 inferred ratio/check, S19 expansion, S20 iteration, and S21 radian ratio. Added machine-readable `claimEvidence` with exact public request + rubric criterion(s) for 120/120 claims. | M02 validator checks 120/120 exact claim/request/rubric links and targeted semantic guards. This is observability, not psychometric mastery certification. |
| M02-04 novice bridges | S02 now defines range, demonstrates bound+attainability, and introduces union notation. S21 now teaches orientation, radians, derives 30°/45°/60° values and reference-angle/quadrant rules; S22 names S21 as source. | Prerequisite audit entries and lesson-content guards are executable in M02 validator. |

Also incorporated review P2 clarifications while touching affected material: finite geometric-sum subtract/cancel derivation; real-valued-vs-first-integer discrete doubling convention; and A/B≠0 scope for ordinary sinusoid period/amplitude language.

Repair commit chain after reviewed head `e08f273f53be5741e2e41d038edd462655837a85`:

- `7aa89f2c3817cb0f036dfae63f8d07bcf3e9455f` — content + 120-claim observability repair.
- `80e7755e675f60c11fc587b4240f34a71a3f0bcd` — module-switch draft/provenance repair + browser regression.
- `0f51845864b6f09d179dcb94ec8d802e1cff7581` and `d27f3d27ba42ae24b23edd0af6a697bd9f428529` — tighten exact instruction-separation markers.
- `1e87a00697bc4c3e3147003c41c48aed79cb88c6` — convert/fix focused review regression harness.
- `7cd060f9894f7314f0e1861656d90fbdee13bbec` — ensure audit-regression edits trigger CI.
- `5fa0ab4ec6059d3726dcfff4198843bf6a5e61a9` — scope saved assistance provenance to actual nonempty drafts, reconciling M02-02 with fresh reconstruction behavior.

Earlier repair runs intentionally failed on exact separation markers, a focused-test harness collision, and a browser expectation that encoded the old provenance behavior. Those failures were repaired rather than bypassed. Run `35307392781` is the first full green repair run.
