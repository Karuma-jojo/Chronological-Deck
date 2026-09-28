# T22 Elite M15 / SIDE278 — Repaired Verification Receipt

Status: **INDEPENDENT-REVIEW REPAIRED · BUILDER/CI VERIFIED · INDEPENDENT FOLLOW-UP PENDING · UNPUBLISHED**  
Branch: `codex/t22-m15-review-candidate`

## Exact tested implementation

- Repair content head: `6a662c4e2564b2890dc9d952c9ba30c983494959`
- Exact tested implementation head after oracle-alignment-only fix: `3d0cade34f3c43df5927a808fb82d77c189c89ee`
- Full T22 Elite Actions: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36303833184
- Run: **#552**
- Job: `108576459161`
- Result: **SUCCESS**

The difference from `6a662c4...` to `3d0cade...` changes only the independent math-oracle string to match the already-correct expanded S15 reference equation. Learner content is unchanged between those two SHAs.

This receipt is a later documentation artifact and must not be confused with the tested implementation SHA.

## Repair contract tested

Independent review at `aa01b191...` opened R01–R04.

### R01
S10 no longer uses row-rank = column-rank. It proves `Q^T(Qc)=c`, hence surjectivity of `Q^T`, then uses M14 rank/rank-nullity.

### R02
S11 derives the Gram scalar identity from the S10 column-dot bridge rather than product-transpose algebra. S12 proves product transpose entrywise and inverse transpose before use.

### R03
Current Transfer is `T22V3::SIDE278::S14-T@2` / obligationVersion 2. It uses nonduplicate dependence `c3=c1+c2` and a false-report audit.

### R04
Current Transfer is `T22V3::SIDE278::S15-T@2` / obligationVersion 2. It runs least-squares reasoning backward from orthogonality constraints to reconstruct a missing observation and audit a supplied line.

## Structural / semantic / evidence results

PASS on exact tested head:
- 16 sessions;
- 32 current fixed assessments;
- 48 literal ownership claims;
- 32 semantic-separation rows;
- 17 decision audits;
- 18 wrong-solver discriminators;
- correct @2 task/version guards for S14-T/S15-T;
- retired @1 tasks absent from the current problem/evaluator maps;
- exact pre-repair fingerprints preserved separately;
- all Transfers retain the `changed-surface Transfer` label only after the two disputed surfaces were replaced.

## Independent mathematics

`docs/t22-course/audit/m15-math-checks.mjs` passed.

New repair-specific oracles verify:
- S14-T@2 plane projection `p=(2,-1,0)`, residual `(0,0,3)`, coefficient family `(2-t,-1-t,t)`, and null direction `(-1,-1,1)`;
- S15-T@2 `Y=6`, residual `(2,-3,1)`, and `A^Tr=0`;
- all previous high-risk projection, Gram–Schmidt, projector, least-squares and S16 synthesis oracles remain green.

## Browser / provenance

Chromium workflow PASS on exact tested head.

The M15 candidate browser:
- confirmed persisted learner registry still M01–M14;
- injected M15 only in the test browser;
- rendered all 16 lessons/guided states;
- exercised all 32 current prompt/reference/rubric paths, including the @2 Transfers;
- saved attempts;
- revealed references;
- exported/imported/reloaded evidence;
- found no text corruption or horizontal overflow;
- checked **304 learner surfaces**.

## Version / evidence disposition

Pre-repair receipt:
`docs/t22-course/audit/m15-pre-independent-repair-version-receipt.json`

Instruction:
`m15-side278-instruction-v1` → `m15-side278-instruction-v2-independent-repair`.

Changed reviewed assessment obligations:
- `S14-T@1` → `S14-T@2`;
- `S15-T@1` → `S15-T@2`.

M15 is unpublished; no real M15 learner evidence exists. The version bumps are still deliberate because the @1 tasks were independently reviewed artifacts and must not be silently rewritten.

## Limits

Green CI does not itself establish independent pedagogical acceptance. R03/R04's semantic Transfer quality and R01/R02's support-theorem closure require the requested human follow-up.

## Disposition

**PASS for bounded independent follow-up.**

No publication, main merge, M16 opening or independent-acceptance claim is authorized.
