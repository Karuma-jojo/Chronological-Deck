# T22 Elite M15 / SIDE278 — Resolution

Status: **INDEPENDENT REVIEW REPAIRED · FOLLOW-UP PENDING · UNPUBLISHED**

This file preserves the earlier builder-recovery resolution and records the later independent-review repair. It does not claim independent acceptance.

## Independent adversarial review repair — controlling current disposition

Reviewed head: `aa01b1914fd69709919651f14e27487cef7fbbe6`  
Review record: `M15-INDEPENDENT-REVIEW.md`  
Pre-repair version receipt: `audit/m15-pre-independent-repair-version-receipt.json`  
Exact repaired implementation head: `3d0cade34f3c43df5927a808fb82d77c189c89ee`  
Full verification: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36303833184 — run #552, job `108576459161`, **SUCCESS**

| Finding | Disposition | Exact repair | Version treatment |
| --- | --- | --- | --- |
| R01 — S10 complement-dimension proof used an unowned row-rank jump | **REPAIRED** | S10 now proves componentwise `Q^T(Qc)=c` for every `c∈R^k`, hence `Q^T` is onto; M14 surjectivity/rank logic gives rank `k`, and M14 rank-nullity gives `dim W^perp=n-k`. | Instruction-only; instruction version v1 → v2. No fixed task changed. |
| R02 — S11 consumed product-transpose algebra before support | **REPAIRED** | S11 derives `x·A^T(Ax)=Σ_jx_j(a_j·Ax)=(Ax)·(Ax)` directly from S10's column-dot identity. S12 proves `(XY)^T=Y^TX^T` entrywise and then derives `(M^{-1})^T=(M^T)^{-1}` before using projector symmetry. | Instruction-only; no S11/S12 assessment obligation changed. |
| R03 — S14-T@1 was retrieval dressed as Transfer | **REPAIRED** | Current `S14-T@2` uses three distinct columns `c1=(1,0,0), c2=(0,1,0), c3=c1+c2`, requires the unique plane projection, the affine coefficient family, the null direction, and a false “singular ⇒ projection nonunique” audit. | `S14-T@1` → `S14-T@2`, obligationVersion 1 → 2. Old fingerprint preserved in pre-repair receipt. |
| R04 — S15-T@1 changed arithmetic but not reasoning surface | **REPAIRED** | Current `S15-T@2` supplies `y_hat=1+2t` on an incomplete irregular-grid table and requires reverse reconstruction of `Y=6` from both residual-orthogonality equations, then a least-squares fit audit. | `S15-T@1` → `S15-T@2`, obligationVersion 1 → 2. Old fingerprint preserved in pre-repair receipt. |

## Low-severity cleanup

- Representation progression now promises projector matrix `P` only; the unimplemented `I-P` promise is gone.
- Strang 4e §4.4 locator is printed pp.231–243; the supplied-PDF range remains pages 199–246.

## Claim / evidence treatment

All **48 ownership claims remain unchanged and Main-observed**. The repair does not manufacture new claim ownership merely because two Transfers changed.

For the two changed Transfers, the following were regenerated:
- current task IDs/prompts/evaluators;
- evidence-distance mechanisms;
- semantic-separation comparators/differences;
- decision audits;
- S14 wrong-solver discriminator;
- instruction-separation receipts;
- independent math oracles.

S15's existing deterministic-vs-statistical misconception guard remains correctly observed by S15 Main; it was not remapped cosmetically to the new Transfer.

## Historical evidence and provenance

M15 remains absent from the persisted learner registry, so there are no real M15 learner attempts to migrate. Even so, the two independently reviewed public obligations were versioned to `@2` to preserve review provenance and prevent silent recertification of the reviewed `@1` surfaces.

Top-level versions:
- authoring: `m15-side278-v2-independent-repair-candidate`
- instruction: `m15-side278-instruction-v2-independent-repair`
- status: `independent-review-repaired-awaiting-followup-unpublished`

## Exact repaired verification

Run #552 / `36303833184` passed on exact head `3d0cade34f3c43df5927a808fb82d77c189c89ee`.

Executed successfully:
- syntax checks;
- full inherited structural/pedagogy/semantic/evidence regressions;
- M15 structural/semantic/version guards;
- M15 independent math oracles;
- M14 publication-frontier guard;
- browser dependency + Chromium installation;
- real browser evidence workflow;
- M15 test-only learner route over **304 surfaces**, including save → reveal → export → import → reload and mobile overflow/text-corruption checks.

## Stop boundary

**Independent follow-up on R01–R04 only.**

Do not publish M15, merge to main, open M16, or claim independent acceptance until that follow-up explicitly accepts the repairs.

---

## Historical builder-recovery resolution

Before the independent review, builder recovery had already repaired the original stalled-run process, cross-session solved-instance collisions, claim-observability mappings, evidence-distance labels, S04→S09 theorem order, source dossier and representation promises. Those historical details remain in Git history and the pre-review handoff; they are superseded only where the independent review above required stronger repairs.
