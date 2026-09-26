# T22 Elite M14 / SIDE276 — S04 pilot review

Status: **local Gates 4–8 passed after one real repair; independent full-module review still required.**  
Branch: `codex/t22-pedagogical-rebuild`  
Pilot session: `T22V3::SIDE276::S04@1` — *Composition makes matrix multiplication inevitable*

This is the representative vertical slice selected by `M14-DESIGN-GATE.md`. It is not an acceptance or publication record for M14.

## 1. Pilot setup

Why S04: matrix multiplication is an ideal falsification target because a learner can perform row-by-column arithmetic while still misunderstanding the mathematical object, product order, dimensions, column meaning or noncommutativity. The pilot therefore tests whether the authoring pattern observes the *composition structure* rather than rewarding arithmetic alone.

Required entry chain:
- S01: map-level linearity and basis-determines-map;
- S02: basis-dependent matrix representation;
- S03: `Ax` as column combination, row-dot reconciliation and shape typing.

The fixed Main uses an unseen rectangular chain `R² --B→ R³ --A→ R²` where **both** `AB` and `BA` are legal. This defeats the weak strategy “pick the only dimensionally legal order.” The Transfer changes to a verbal two-stage square pipeline and makes both orders legal again.

## 2. Gate 4 — teaching audit

**Orient / define.** S04 begins from compatible represented maps `T:U→V` and `S:V→W`; multiplication is introduced only after S01–S03 establish maps, matrices and matrix-vector action.

**Connect.** The core derivation is
`x → Bx → A(Bx) = (AB)x`.
Thus `[S∘T]=[S][T]` is derived from the already-owned coordinate action, not asserted as an unrelated row-by-column rule.

**Worked example.** The displayed 2×2 matrices are fully multiplied in both orders:
- `AB=[[3,1],[2,2]]`;
- `BA=[[2,2],[1,3]]`.
This makes the noncommutativity contrast concrete and distinguishes “both products legal” from “same process.”

**Guided practice.** The guided rectangular pair is distinct from both fixed tasks. The learner must determine the 2×2 shape, compute `CD=[[0,3],[2,3]]`, and interpret the first product column before seeing feedback.

**Associativity.** The lesson explains that compatible matrix multiplication is associative because function composition is associative and the matrix representation in fixed bases is unique. No eigenvalue, factorization or numerical machinery is used.

**Distinction check.** The session explicitly separates:
- dimension compatibility from process semantics;
- matrix multiplication from entrywise multiplication;
- associativity from commutativity.

Gate 4 result: **pass**.

## 3. Gate 5 — independent evidence audit

### Main

Public obligations now require the learner to:
1. choose `AB` for `S∘T` and justify the 2×2 shape from the map chain;
2. compute `AB=[[5,4],[1,-4]]`;
3. interpret/verify the first product column as `S(T(e1))=(5,1)^T`;
4. identify `BA` as a legal 3×3 representation of the reversed composition `T∘S:R³→R³`;
5. explain `(CA)B=C(AB)` from associativity of the same three-stage map.

The Main is not merely a new arithmetic instance: it checks order, map type, product arithmetic, column semantics, reverse-composition semantics and associativity.

Classification: **fresh Main evidence** on a distinct instance.

### Transfer

The Transfer gives no abstract map names. It says “stage 1 uses C; stage 2 uses D,” asks the learner to choose `DC`, compute it, apply it to a fresh input, compute `CD`, and use `DC≠CD` to refute commutativity.

Classification: **changed-surface Transfer** — abstract composition notation is replaced by an operational pipeline, while the decisive obstacle (both orders legal) is preserved.

Gate 5 result: **pass** after the Gate-7 repair below.

## 4. Gate 6 — independent reconstruction of references and rubrics

Builder-side arithmetic was reconstructed independently from the public givens.

Main:
- `AB=[[5,4],[1,-4]]`;
- `BA=[[-1,6,4],[1,-3,-1],[1,3,5]]`, confirming that it is legal and 3×3;
- first column of `AB` is `A(1,0,2)^T=(5,1)^T`.

Transfer:
- `DC=[[3,6],[0,2]]`;
- `DC(1,-1)^T=(-3,-2)^T`;
- `CD=[[3,4],[0,2]]`;
- hence `DC≠CD`.

Guided practice:
- `CD=[[0,3],[2,3]]` for the lesson's distinct rectangular matrices.

All Main and Transfer rubric totals are exactly 10. A complete mathematically equivalent explanation can earn full credit; no rubric requires wording absent from the public prompt.

Gate 6 result: **pass**.

## 5. Gate 7 — observer / ownership audit

Four ownership claims were checked against literal public actions.

1. **Composition order + dimensions:** observed by Main and Transfer. Both reversed products are legal, so the learner cannot escape by a dimension-only heuristic.
2. **Product computation + product-column meaning:** observed by Main through separate arithmetic and first-column rows.
3. **Associativity from composition:** **initially failed.** The lesson taught associativity, but the first draft of the Main did not ask the learner to demonstrate it. A response could earn every public point without exhibiting the claimed capability.
4. **Noncommutativity:** observed by Transfer through explicit computation of two legal unequal products.

### Repair M14-PILOT-01

The associativity claim was not narrowed away because it is a core property required by later matrix work. Instead the Main was changed **before learner publication** to add a public request:
> if `R:R²→R²` has compatible matrix `C`, explain why `(CA)B=C(AB)` represents the same three-stage map `R∘S∘T`.

The rubric now contains a dedicated two-point row for that explanation and the other rows were rebalanced to preserve a 10-point task. The claim→task→rubric link now has a literal observer.

No assessment ID/version bump is required by exposure policy because M14 is not in the learner registry and no M14 learner attempt exists; the repair is nevertheless recorded in Git history and in the authoring pack.

Gate 7 result: **pass after one substantive repair**.

## 6. Gate 8 — semantic-separation audit

The audit compared mathematical instances, not prompt strings.

- S04 worked example matrices are not reused by either fixed assessment.
- S04 guided matrices are not reused by either fixed assessment.
- S01–S03 contain no fixed S04 product, product column or reversed-product answer.
- Main and Transfer use different matrices, different surface forms and different output obligations.
- General instruction “first-applied map appears on the right” is reusable method instruction, not solved-answer exposure.
- The lesson's proof of associativity is general instruction. The Main asks the learner to reconstruct that reasoning on the named three-map chain; its evidence is therefore proof reconstruction/fresh application, not an unrehearsed theorem discovery claim.
- The Transfer's noncommutativity numbers are nowhere solved earlier.

Gate 8 result: **pass**.

## 7. Source-grounding note

The pilot's route is deliberate rather than copied from one text.

- Strang 4e §2.3–2.4 treats matrix multiplication from several viewpoints; the user-supplied full scan is the deep comparator.
- MIT 18.06 explicitly describes its multiplication lecture as treating matrix multiplication from multiple points of view and separately teaches linear transformations and their matrices.
- Axler 4e, Theorem 3.43, states the matrix-of-product result `M(ST)=M(S)M(T)` under compatible basis choices.
- Trigueros & Possani (2018), *The Journal of Mathematical Behavior* 52, study matrix multiplication through transformations using an APOS-based didactical sequence.
- Oktaç (2018), *Understanding and Visualizing Linear Transformations*, synthesizes documented difficulties with linear transformations and multiple registers of representation.

These sources support route comparison and misconception design; none supplies the fixed assessment instance.

## 8. Pilot disposition

**S04 local disposition: PASS.**

What the pilot changed in the authoring pattern:
- never claim a structural property merely because it appears in the lesson;
- when both product orders can be made legal, prefer that stronger discriminator over an “illegal reversed product” toy case;
- score matrix multiplication at three levels: process semantics, exact computation, and representation meaning;
- maintain a separate public observer for associativity and for noncommutativity.

The 19-session architecture remains viable. Authoring may proceed to S05, but every later session must still pass its own Gates 4–8 and the final M14 integration/adversarial review may reopen this pilot if a downstream dependency exposes a defect.
