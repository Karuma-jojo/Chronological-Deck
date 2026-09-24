# T22 Elite — M12 S06 Pilot Adversarial Review

Date: 2026-09-24  
Module: M12 · `SIDE267`  
Pilot: `T22V3::SIDE267::S06@1`  
Artifact: `docs/t22-course/audit/m12-pilot-s06.json`  
Status: **PASS_WITH_EVIDENCE — authoring pattern may be propagated; findings below are already incorporated**

## Gate 4 — teaching from fundamentals

**Scope tested:** full S06 lesson.

- Entry facts are explicit: derivative-matching polynomial, residual, and the S05 Rolle/MVT support bridge.
- The theorem is typed correctly: one-variable real function on the closed interval joining the center and evaluation point; lower derivatives are continuous on that interval; the next derivative exists at every interior point.
- The unknown Lagrange point (c) is explicitly distinguished from the center (a).
- The proof architecture is exposed rather than replaced by “Taylor's theorem says so”: choose an auxiliary residual, force endpoint zeros, use derivative matching at the center, then apply Rolle repeatedly.
- The worked example ((ln t), center 1, (x=1.2), degree 1) is fully solved to the theorem-level remainder statement but deliberately stops before S07's numerical bounding task.
- Guided practice uses a distinct exponential instance and does not reveal either fixed assessment.

**Adversarial theorem-type check:** no sequence theorem is transferred to a real-variable object; no M11 integration result is required. A later separation attack found that the original degree-2 worked proof was too close to the fixed Main. The lesson was repaired to teach the repeated-Rolle architecture on degree 1 while Main reconstructs degree 2, then Gates 4–8 were reopened and rechecked.

**Receipt:** PASS_WITH_EVIDENCE.

## Gate 5 — independent evidence design

### Main

The Main asks for a degree-2 proof under supplied legal hypotheses. The lesson now teaches the same theorem architecture on the distinct degree-1 case, so the honest evidence class remains **proof reconstruction**, but the exact fixed proof is no longer worked in instruction.

Wrong solver attacked: quote the final formula with (f'''(a)) merely because the polynomial coefficients are evaluated at (a). This cannot earn the proof/intermediate-point rows.

### Transfer

The Transfer changes the mathematical surface to (f(t)=|t|^3) across an interval containing an interior nonsmooth third derivative. It asks for theorem legality plus a concrete contradiction witness.

For (t<0):
- (f=-t^3),
- (f'=-3t^2),
- (f''=-6t),
- (f'''=-6).

For (t>0):
- (f=t^3),
- (f'=3t^2),
- (f''=6t),
- (f'''=6).

At 0, (f'') is continuous but (f''') does not exist. With (a=-1/2,x=1/2),
(P_2(x)=1/8-3/4+3/2=7/8), so the actual remainder is (1/8-7/8=-3/4). Since ((x-a)^3=1) and (f'''/6) is only (-1) or (1) where defined, no legal Lagrange point can produce the actual remainder.

This is a genuine **changed-surface Transfer** rather than coefficient replacement.

**Receipt:** PASS_WITH_EVIDENCE.

## Gate 6 — independent solution and rubric fairness

The two reference arguments were reconstructed from the public prompts.

- Main data are sufficient and the conclusion is unique as an existence theorem.
- Main rubric scores proof obligations that are explicitly public; no points require a particular auxiliary-function symbol.
- Transfer's Taylor polynomial exists at the center, so the intended failure is genuinely the interval-wide (f''') hypothesis rather than a cheaper center failure.
- Exact arithmetic cross-check gives (P_2(1/2)=7/8) and remainder (-3/4).
- A valid alternative Main proof via an equivalent Cauchy-MVT/Rolle construction remains admissible.

**Receipt:** PASS_WITH_EVIDENCE.

## Gate 7 — ownership observability

Three retained claims are literally observed:

1. degree-2 Lagrange-remainder proof → Main proof request and all four Main criteria;
2. center versus intermediate point (c) → Main request plus interior-point criteria;
3. interval-wide next-derivative hypothesis audit → Transfer derivative audit and failed-hypothesis criterion.

Escape tests are recorded in the pilot JSON. Quoting the theorem cannot earn the proof claim; saying merely “not smooth” cannot earn the hypothesis-audit claim.

**Receipt:** PASS_WITH_EVIDENCE.

## Gate 8 — separation / exposure

Instructional instances:
- worked: (ln t) about 1 at 1.2, degree 1;
- guided: (e^t) about 0 at 0.3, degree 1.

Fixed instances:
- Main: symbolic degree-2 proof;
- Transfer: (|t|^3) across ([-1/2,1/2]).

There is no solved fixed-task answer in the lesson. The previous degree-2 proof overlap was removed; Main is intentionally proof reconstruction from the degree-1 architecture and labeled accordingly. Transfer's decisive object/hypothesis failure is not rehearsed.

**Receipt:** PASS_WITH_EVIDENCE.

## Pattern decision

The pilot validates the M12 authoring pattern:

**motivate the approximation claim → define object and theorem role → expose exact hypotheses → derive/justify at permitted level → solve a distinct example → guide on another instance → assess with honest evidence distance → attack a concrete misconception/hypothesis failure.**

No pilot finding requires changing the 19-session design. Batch authoring may proceed session-by-session using this pattern. M13 remains closed.
