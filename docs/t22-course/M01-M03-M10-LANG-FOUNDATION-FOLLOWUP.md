# T22 M01–M03 + M10 Lang-foundation follow-up — L01–L10 resolution

Date: 2026-09-27  
Repository: `Karuma-jojo/Chronological-Deck`  
Repair branch: `codex/t22-lang-foundation-followup`  
Base head: `15e2e54fe1a05c442f008da134048231092f6ff5`

## Status

**BOUNDED FOUNDATION REPAIR IMPLEMENTED + FULL EXACT-HEAD WORKFLOW GREEN; INDEPENDENT RECONFIRMATION PENDING.**

This follow-up does not rebuild M01 or M02. M01 remains 17 sessions; M02 remains 24 sessions. It repairs false or too-shallow prerequisite provenance exposed by a Lang-grounded end-to-end audit, plus the downstream M03/M10 edges that actually consume those prerequisites.

## L01 — fictitious M01 Pythagorean prerequisite

**Finding:** M02-S03 said coordinate distance was JIT “using M01 Pythagorean/root arithmetic,” but M01 never taught the Pythagorean theorem.

**Repair:**
- M02-S03 now explicitly states the Pythagorean theorem as a JIT geometric fact.
- It constructs the coordinate right triangle with legs `Δx` and `Δy`.
- It derives `d²=(Δx)²+(Δy)²`, then the distance formula.
- A rendered coordinate diagram shows the two legs and hypotenuse.
- The prerequisite ledger now says Pythagoras is JIT in S03 and explicitly does **not** attribute it to M01.

## L02 — angle-addition formulas missing before M10

**Finding:** M10-S16 consumes sine/cosine addition identities, but no earlier module owned them.

**Repair:**
- M02-S22 now owns “Reconstruct and use sine/cosine angle-addition identities.”
- The lesson derives `cos(A−B)` from unit-circle chord distance and coordinate distance.
- It derives `cos(A+B)` by substituting `−B`.
- It obtains the sine sum/difference formulas through the cofunction relation.
- S22 Transfer now requires reconstruction plus exact use.
- M10-S16 explicitly names `M02-S22 sine/cosine angle-addition identities` as an entry prerequisite.

## L03 — rational powers jumped silently to real exponentials

**Finding:** M01 taught rational exponents, but M02-S12 immediately used `b^t` for real `t`; M10-S20 later consumed `e^(x+h)=e^x e^h`.

**Repair:**
- M02-S12 now says explicitly that positive-base exponentiation is extended from rational powers to all real inputs.
- A full real-analysis construction of irrational exponents is explicitly out of scope.
- The standard laws are stated as established properties at this level, especially `b^(x+y)=b^x b^y`.
- S12 Main publicly requires using that law to derive `f(t+h)=f(t)b^h`.
- The law is a required-ownership row with exact rubric evidence.
- M10-S20 now explicitly names the S12 real-exponential law as a prerequisite and identifies it in the derivative proof.

## L04 — fictitious “M01 binomial algebra” prerequisite

**Finding:** M10-S10 claimed M01 supplied binomial algebra/theorem; it did not.

**Repair:**
- M03-S26, already the combinations/binomial-coefficients session, now owns finite binomial expansion.
- It derives coefficient `C(n,k)` by choosing which factors contribute `y` in `(x+y)^n`.
- Main requires an explicit `(x+y)^4` expansion using `C(4,k)`.
- M10-S10 now names `M03-S26 finite binomial theorem/expansion` and ordinary M01 factorization separately.
- The false “M01 binomial” entry is removed.

## L05 — arithmetic-series “pairing derivation” was only a formula statement

**Repair:** M02-S17 now literally writes the arithmetic sum forward and backward, adds them termwise, obtains `2S=n(a₁+aₙ)`, and derives `S=n(a₁+aₙ)/2`. A rendered table shows the forward/reverse pairing. The prerequisite ledger now matches the actual lesson.

## L06 — special-angle “triangle derivations” were only named

**Repair:** M02-S21 now explicitly derives:
- the 45° values from a `1,1,√2` triangle;
- the 30°/60° values from half an equilateral triangle with sides `1,√3,2`.

Both right triangles are rendered as learner-facing geometric diagrams before the unit-circle application.

## L07 — algebraic structural laws were too implicit

**Repair, instruction-only:**
- M01-S01 names commutativity, associativity, additive inverse and multiplicative inverse, including where the laws do **not** apply.
- S02 explains cancellation as inverse multiplication, not visual cross-out permission.
- S09 names distributivity plus commutative/associative regrouping behind symbolic simplification.
- S11 explains equation moves through inverse operations applied equally to both sides.

No extra session or new proof-theory ownership was added.

## L08 — systems exposed only the unique case

**Repair, bounded instruction:**
- M01-S13 now distinguishes one solution, no solution (`0=5`) and infinitely many solutions (`0=0`).
- M02-S04 renders all three geometric cases: intersecting, distinct parallel and coincident lines.

No rank/determinant theory is imported.

## L09 — readiness routing undersampled M01

**Repair:** the readiness router grows from 13 to **17 items**, adding direct samples of:
- S12 formula rearrangement/parameter branches;
- S13 simultaneous equations;
- S15 absolute value;
- S17 synthesis/model coordination.

The UI wording is tightened: even a perfect readiness score is routing evidence only and does not certify M01 mastery.

## L10 — coordinate geometry was too compressed

Closed together with L01. S03 now develops ordered pairs, coordinate changes, the right-triangle construction, Pythagorean distance and midpoint meaning as a coherent algebra↔geometry bridge rather than presenting formulas as an API.

## Downstream dependency assertions

The repair adds executable dependency pins:

- **M10-S10 ⇒ M03-S26 finite binomial expansion**
- **M10-S16 ⇒ M02-S22 angle-addition identities**
- **M10-S20 ⇒ M02-S12 real-exponential addition law**

Each assertion checks both sides: the consumer names the prerequisite and the upstream owner actually owns/teaches it.

## Renderer and browser hardening

The shared representation renderer now supports authored geometric line segments and optional hidden axes/grid. Browser regression is extended to verify:

- S03 coordinate right-triangle segments;
- S04 three linear-system geometry cases;
- S21 two rendered special triangles;
- S12 public real-exponential-law evidence;
- S22 public addition-formula evidence;
- M03-S26 public binomial expansion;
- M10-S10/S16/S20 visible owner links;
- the 17-item M01 readiness router.

## Exact-head implementation validation

Implementation head: `60d0e9377ca49f5ee43de6c141c4368d557cd3ee`  
T22 Elite workflow: run `36309623039`, job `108592921204` — **SUCCESS**

The inspected logs confirm:

- **M01 Lang-foundation PASS:** 17 sessions / 34 tasks; structural-law spine, one/no/infinite systems and the 17-item routing diagnostic are pinned; earlier R02/R03/R06/R08 protections remain.
- **M02 Lang-foundation PASS:** 24 sessions / 48 tasks; Pythagorean coordinate derivation, positive-base real-exponential law, arithmetic-sum pairing, special-triangle derivations, angle-addition identities and three-way system geometry are pinned; earlier R01/R04/R05/R07 protections remain.
- **M03 Lang-foundation PASS:** 30 sessions / 60 tasks / 150 ownership claims; S26 finite binomial theorem ownership and explicit `(x+y)^4` evidence are pinned; earlier Astra repairs remain.
- **M10 and all later standing gates PASS:** the derivative module still passes its semantic/evidence and independent-math suites with the repaired upstream provenance, and the later M11–M15 protections remain green.
- **Real Chromium PASS:** 17-item readiness; S03 coordinate-right-triangle rendering; S04 one/no/infinite system geometry; S21 special triangles; S12 real-exponential-law public evidence; S22 angle-addition public evidence; M03-S26 binomial evidence; M10-S10/S16/S20 visible upstream-owner links; shared evidence, save/reveal/review, export/import, historical provenance, corrupt-storage safety and mobile width.

Useful red runs before the green head were treated as findings rather than bypassed:

- run 557 caught loss of the explicit `cos45°=sin45°=√2/2` invariant during the deeper S21 triangle derivation; the statement was restored and the guard remained strict;
- run 558 required S04 to state the literal category “no solution” rather than only “one, no or infinitely many solutions”;
- runs 559–560 exposed historical M03 handoff/repair gates pinned to the old instruction-version/status strings; the old review history was preserved while the new S26 stitch was recorded explicitly.

This is builder verification, **not** independent reconfirmation.

## Boundaries preserved

- M01: 17 sessions
- M02: 24 sessions
- M03: 30 sessions
- M10: 24 sessions
- no M01 geometry chapter added
- no real-analysis construction of irrational exponents added
- no trig formula catalogue beyond the identities actually consumed downstream
- no rank/determinant theory added to systems
- no new M10 assessment ownership added

Correct status until independent review completes:

**Lang-foundation L01–L10 repaired; independent reconfirmation pending.**
