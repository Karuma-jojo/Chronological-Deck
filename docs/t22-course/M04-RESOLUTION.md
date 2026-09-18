# M04 Astra resolution — bounded repair pass

Date: 2026-09-18  
Branch: `codex/t22-pedagogical-rebuild`  
Independent review: `docs/t22-course/M04-ASTRA-REVIEW.md`  
Review commit: `7d377d847728a7ebec6e4b81f2864238bd0b1683`  
Repair implementation head: `10df637dbb46bd4985a1f98fc298c746b52bf1fd`  
Status: **M04-01 through M04-04 implemented; stop for bounded follow-up review before M05/M06**

## Scope

This repair pass changes M04 only. It does not author M05 or M06, merge to `main`, deploy, migrate historical T22 progress, modify T25, or replace the shared evidence runtime.

## M04-01 — S11 complement-independence hidden prerequisite

**Status: repaired.**

S11 now derives the needed consequence explicitly from already-owned rules:

[
P(A\cap B^c)
=P(A)-P(A\cap B)
=P(A)-P(A)P(B)
=P(A)(1-P(B))
=P(A)P(B^c).
]

The prerequisite audit now names M04-S04 complement probability and records complement-independence as a JIT derivation in S11. The fixed S11 Transfer is unchanged, so its assessment identity/fingerprint contract is not deliberately version-bumped.

No prior learner assessment evidence requires migration. The M04 instruction version is bumped to `m04-instruction-astra-r1`; ordinary prior lesson consultation remains study provenance, not answer exposure.

## M04-02 — false 120/120 observability claim

**Status: repaired with a complete 120-claim semantic re-audit.**

The previous ledger mechanically paired claim position with rubric position. The new ledger manually pins every claim to the fixed task and one or more criteria that actually observe it.

Two claims intentionally point to Transfer because Transfer is the genuine observer:

- S05 claim 3 — use the disjoint-event addition rule → **Transfer**.
- S13 claim 5 — give/diagnose examples of the relationship types, including independent non-disjoint events → **Transfer**.

All other claims remain on Main after manual inspection.

### Material assessment changes

Two fixed contracts had real observability holes and are versioned:

1. **S05-T → obligationVersion 2**
   - now uses disjoint events (C=) multiples of 3 and (D={10,11}) on ({1,ldots,12});
   - explicitly requires establishing disjointness and using
     (P(C\cup D)=P(C)+P(D));
   - evaluator directly scores the disjoint addition rule.

2. **S21-M → obligationVersion 2**
   - now explicitly requires deriving
     (E[aX+bY+c]=aE[X]+bE[Y]+c)
     from the finite weighted-sum definition, distributivity and (sum P(\omega)=1);
   - then applies and directly verifies the identity, states the no-independence requirement, and blocks the nonlinear (E[X^2]=(E[X])^2) misuse.

The shared assessment-fingerprint mechanism will preserve older attempts while treating attempts under these two old contracts as stale for current evidence. No global M04 evidence invalidation is performed.

Pure ledger-direction/criterion corrections do not migrate learner evidence.

## M04-03 — S22 positional symmetry shortcut

**Status: repaired lesson-side.**

S22 now derives the positional marginal in sampling without replacement:

- temporarily label the objects;
- ordered samples of distinct labelled objects are equiprobable;
- at a fixed position, each original labelled object occurs equally often;
- therefore the probability that the position is red equals the initial red fraction.

The worked example then obtains (P(\text{red at position }i)=3/5) before applying indicators and linearity. The prerequisite audit records the ordered-sample/counting source plus the JIT positional derivation.

The fixed S22 tasks are unchanged. No assessment version bump or evidence migration is required.

## M04-04 — premature independence wording in S04

**Status: repaired.**

The guided check now chooses uniformly from the eight 3-bit strings. It no longer invokes “independently” before independence is defined in S11.

No assessment or learner-evidence change is involved.

## Persistent regressions strengthened

`scripts/test-t22-elite-m04.mjs` now contains the complete human-audited 120-claim task/rubric plan and verifies:

- every claim's exact task direction;
- exact public-request identity;
- exact evaluator criterion links;
- exact `coverage` direction;
- S05-T and S21-M obligationVersion 2;
- S11 complement-independence derivation/prerequisite source;
- S13 claim 5 Transfer direction;
- S22 positional-marginal derivation;
- S04 removal of premature independence language;
- all previous 24-session / 48-task / rubric-total / semantic-separation invariants.

`docs/t22-course/audit/m04-independent-math.mjs` now independently re-derives additional repair-sensitive mathematics:

- repaired S05 disjoint addition;
- S11 complement-independence on a finite die model;
- S22 positional red marginal by exhaustive ordered sampling;
- plus the existing conditioning, trees, replacement, pairwise-vs-mutual independence, exact-k, total probability, linearity and S24 synthesis checks.

## Provenance and migration decision

- Evidence key remains exactly `chrono_t22_elite_course_evidence_v1`.
- Session/task IDs are unchanged.
- Only **S05-T** and **S21-M** are new fixed assessment contracts; both use `obligationVersion=2`.
- All other fixed assessment contracts are unchanged.
- Instruction version is now `m04-instruction-astra-r1`.
- No historical M04 lesson contained an exact fixed answer requiring timestamp migration; no `historicalLessonAnswerOverlap` entry is added.
- M01–M04 coexistence, packet exposure, review attachment and draft provenance remain on the shared runtime.

## Validation state

The implementation was written and re-read from the branch at `10df637dbb46bd4985a1f98fc298c746b52bf1fd`. Connector-side deterministic checks confirm:

- 24 sessions;
- 48 fixed tasks;
- 48 evaluators;
- 120 ownership claims;
- 120/120 manually pinned claim/task/rubric records;
- all evaluator rubrics total 10;
- S05-T and S21-M are the only intentionally version-bumped fixed tasks;
- M04-01/M04-03/M04-04 instructional repairs are present;
- independent repair-sensitive calculations are encoded in the persistent math audit.

The repository workflow is push-triggered for these changed paths. The available GitHub connector in this session does not enumerate push-triggered workflow-run IDs, so this document does **not** invent or claim a remote run number. The final handoff checker is updated below to make the repair state executable in the normal T22 Elite workflow.

## Stop boundary

**STOP FOR BOUNDED FOLLOW-UP REVIEW OF M04-01 THROUGH M04-04. Do not author M05 or M06 yet.**
