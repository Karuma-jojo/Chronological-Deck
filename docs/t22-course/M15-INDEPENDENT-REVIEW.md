# T22 Elite M15 / SIDE278 — Independent Adversarial Review

Reviewed head: `aa01b1914fd69709919651f14e27487cef7fbbe6`  
Branch: `codex/t22-m15-review-candidate`  
Disposition: **REPAIRS REQUIRED · BOUNDED REPAIR ONLY · UNPUBLISHED**

The independent reviewer preserved the 16-session architecture and mathematical spine and found four material issues. No fixed reference answer was found wrong; no core least-squares mathematics failed; no publication leak was found; M14 does not reopen.

## R01 — S10 complement-dimension proof has an unowned theorem jump

**Severity:** Medium / material.

S10 moves from independence of the rows (q_i^T) of (Q^T) to (operatorname{rank}(Q^T)=k), which silently consumes row-rank = column-rank under M14's column-space/pivot definition of rank.

**Required repair:** avoid row-rank theory. For (cinmathbb R^k), prove componentwise (Q^T(Qc)=c) from orthonormality. Hence (Q^T:mathbb R^n	omathbb R^k) is onto, so M14 surjectivity/rank logic gives rank (k); then rank-nullity gives (dim W^perp=n-k).

## R02 — S11 consumes transpose algebra before support is established

**Severity:** Medium / material.

The S11 proof (x^TA^TAx=(Ax)^T(Ax)=|Ax|^2) is written as if product-transpose algebra is already available, while product transpose is only introduced in S12.

**Required repair:** in S11 derive the scalar identity directly from S10's column-dot bridge:
[
xcdot A^T(Ax)=sum_jx_j(a_jcdot Ax)=left(sum_jx_ja_jight)cdot Ax=(Ax)cdot(Ax).
]
In S12, prove ((XY)^T=Y^TX^T) entrywise and then derive ((M^{-1})^T=(M^T)^{-1}).

## R03 — S14 Transfer is retrieval, not changed-surface Transfer

**Severity:** Medium / material.

The reviewed S14-T@1 repeats the worked/guided one-fit/many-coefficients structure using duplicate columns and new numbers.

**Required repair:** replace only S14-T with genuinely different rank deficiency, such as three columns with (a_3=a_1+a_2), and require unique fitted vector + affine coefficient family and/or a false “singular ⇒ projection nonunique” audit.

## R04 — S15 Transfer does not clear the changed-surface bar

**Severity:** Medium / material.

Irregular (t)-spacing changes arithmetic but not the reasoning surface because the guided practice already performs table → design matrix → normal equations → residual checks.

**Required repair:** replace only S15-T with reverse-direction/diagnostic reasoning, e.g. infer a missing observation/residual from the two residual-orthogonality conditions and audit whether a supplied line is least-squares.

## Low-severity cleanup folded into repair

1. Representation progression says “projector matrix P and I−P” although canonical M15 never actually introduces (I-P). Remove the unimplemented promise or add a bounded supported use.
2. Strang §4.4 locator should stop at printed p.243 because Chapter 5 begins on printed p.244.

## What survived the attack

The reviewer independently recomputed and accepted the high-risk mathematics in S09, S11, S12, S13 and S16; accepted the repaired S04→S09 decomposition dependency order; accepted S06–S07 separation; accepted S10's central transpose/column-dot bridge; accepted S11–S14 core least-squares geometry; accepted S16's fresh Main label; and spot-checked the major source-role claims.

## Repair boundary

- Preserve all 16 sessions.
- Preserve every unaffected fixed task.
- Repair R01/R02 only in instruction/support-theorem exposition.
- Replace only S14-T and S15-T.
- Re-solve those tasks and regenerate their claim/separation/decision/misconception receipts.
- Apply explicit version treatment.
- Rerun Gates 5–11.
- Return the repaired head for independent follow-up.
- No publication, main merge or M16.
