# M04 bounded independent follow-up — ACCEPTED

Date: 2026-09-18
Branch: `codex/t22-pedagogical-rebuild`
Reviewed repair/handoff head: `87ccf3ef9686de47af25232dce27f818de033b05`
Repair implementation checkpoint: `10df637dbb46bd4985a1f98fc298c746b52bf1fd`
Prior independent review: `M04-ASTRA-REVIEW.md`

## Decision

**M04-01 through M04-04 are closed. M04 is accepted and may be frozen.** No further content repair was needed in this follow-up.

This is a bounded review of the repairs after the earlier full M04 review, not a claim that a new end-to-end audit of unchanged M01–M04 was performed.

## Findings verified

- **M04-01:** S11 explicitly derives complemented-event independence by decomposing A into disjoint pieces, subtracting the joint, and applying the product definition and complement rule. The prerequisite ledger owns the derivation. S11 Transfer is now supported without changing its fixed task.
- **M04-02:** Read all 120 revised claim-to-criterion mappings against the corresponding public tasks. The earlier positional mismatches are corrected. S05 claim 3 points to its revised disjoint-event Transfer; S13 claim 5 points to its example-construction Transfer. S21 Main explicitly requests the finite weighted-sum derivation and scores it. Multiple criteria are used where appropriate.
- **M04-03:** S22 explains equiprobable ordered samples of labelled objects and equal occurrence of each label at a fixed position before using the red fraction. This supplies the missing marginal argument; linearity is explicitly valid under dependence.
- **M04-04:** S04's guided check specifies a uniform eight-string sample space without invoking undeclared independence.

## Versioning and scope

Compared the current authoring pack with original handoff `733b7bcba34a9adbeaa327b06e344511587e353e`:

- only S05-T and S21-M have changed fixed problem/evaluator contracts; both are obligationVersion 2;
- only S04, S11 and S22 lessons changed;
- remaining task contracts are unchanged;
- instruction version is `m04-instruction-astra-r1`;
- existing assessment fingerprinting preserves older attempts while distinguishing the two revised assessments;
- no global evidence invalidation, new evidence store or historical answer-exposure migration is needed.

This approval commit changes review documentation only. It does not modify tasks, evaluator contracts, runtime, M05/M06 content, T25 or historical T22 state.

## Validation verified

Remote full-suite run [35368721291](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35368721291) completed successfully on the exact reviewed head `87ccf3e…`. The run and job/step results were checked directly.

Locally reran, all PASS:

1. `node scripts/test-t22-elite-m04.mjs`
2. `node docs/t22-course/audit/m04-independent-math.mjs`
3. `node docs/t22-course/audit/m04-handoff-checks.mjs`

The independent mathematics checks cover the repaired disjoint union, complemented independence, positional marginals by ordered-sample enumeration, and existing conditioning/expectation examples. A green structural audit alone was not used as the basis for pedagogical acceptance.

## Next boundary

The next recommended authoring pass is a **two-module trial: M05, then M06**. Each module must be completed, validated, documented and pushed separately. Stop after M06 with both review handoffs; do not author M07 in that pass.

When the user starts that authoring pass, advance the old stop guards deliberately to protect M07 rather than deleting boundary checks. Stop earlier if a mathematical/prerequisite uncertainty, semantic assessment problem, failed gate or evidence-runtime change requires independent attention.

No M05/M06 authoring was performed by this approval. No merge or deployment was performed.

M04 is suitable to proceed with as the finite-probability foundation. Actual learner pacing and retention remain to be tested through use; approval does not establish perfect difficulty calibration or guaranteed mastery.
