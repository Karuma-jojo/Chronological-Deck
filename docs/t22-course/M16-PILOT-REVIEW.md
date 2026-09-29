# T22 Elite M16 / SIDE279 — S01 pilot Gate 4–8 review

Status: **builder-reviewed pilot PASS for S01 only; permits opening S02. Not independent acceptance. M16 remains unpublished.**  
Date: 2026-09-30  
Branch: `codex/t22-m16-builder-candidate`  
Protocol: T22 Module Builder and Adversarial Checker v1.2  
Design gate: `docs/t22-course/M16-DESIGN-GATE.md`  
Pilot pack: `course/t22/authoring/m16-side279.json`  
Pilot oracle: `docs/t22-course/audit/m16-pilot-math-checks.mjs`

This review applies the local Gates 4–8 only to **M16-S01 · A direction the map does not turn away**. It does not certify the module, publish anything, or substitute for a later independent adversarial review.

## Gate 4 — teaching from fundamentals

### Orient

The session begins from an already-owned M14 object: a finite real linear map / matrix action. The motivating question is not “solve `det(A-lambda I)=0)” but “is there a nonzero direction that the map does not turn away from itself?”

This is a genuine conceptual need for the new object and avoids turning the characteristic equation into the definition.

### Define

Before use, the lesson defines:

- eigenvector: nonzero (v) with (Av=\lambda v);
- eigenvalue: the corresponding scalar (\lambda);
- invariant one-dimensional subspace: (operatorname{span}(v));
- the zero-vector exclusion and why it is logically necessary;
- the fact that (\lambda=0) is legal even though (v=0) is not.

The lesson separately labels fixed-vector behaviour ((\lambda=1)), preserved length and preserved direction. These are not treated as synonyms.

### Connect

Only accepted prerequisites are consumed:

- M13: vectors, scalar multiples and (operatorname{span}(v));
- M14: matrix-vector action and linearity;
- earlier powers/induction habits for the finite repeated-action derivation.

No characteristic polynomial, complex arithmetic, diagonalization, projection, PSD/SVD or numerical eigensolver is needed.

### Explain

Two relationships are justified rather than asserted:

1. If (Av=\lambda v), then (A(cv)=cAv=\lambda(cv)), so the invariant object is a line/direction rather than one coordinate representative.
2. Repeated action along a verified eigenvector follows from repeated linearity: (A^2v=\lambda^2v), and the lesson states the induction extension.

The public Main is intentionally not credited as fresh invention of these arguments; their architecture is already taught.

### Worked example

The worked example uses (A=\begin{bmatrix}2&1\\0&1\end{bmatrix}) and fully computes three candidates:

- (e_1) with (\lambda=2);
- (w=(1,-1)) with (\lambda=1);
- (e_2), rejected because its image is not proportional.

The givens, target, computations, conclusion and interpretation are all present.

### Guided practice

The guided practice uses a distinct matrix (C=\begin{bmatrix}3&0\\2&1\end{bmatrix}), leaves the classification and repeated-action work to the learner, and places the answers in the separate `guidedFeedback` field. It is therefore practice rather than another silently solved worked example.

### Fade

The Main changes to a symmetric off-diagonal matrix and includes a negative eigenvalue plus a rescaled eigenvector representative. The Transfer changes to a 90-degree rotation and a false report. Neither fixed instance is solved in the lesson.

### Distinction check

The ending contrast is explicit:

- fixed vector: (\lambda=1);
- preserved norm: (\|Av\|=\|v\|);
- eigenvector: (Av) is an exact scalar multiple of nonzero (v).

The contrast is instruction; it does not expose the Transfer's specific rotation or its no-real-eigenvector conclusion.

### Theorem-type guard

No theorem is silently moved across object classes. The only structural arguments use finite real linear maps and vectors, exactly the object types owned by M13/M14. The Transfer stays over the real numbers and does not require the future bounded complex bridge.

**Gate-4 disposition: PASS for S01.**

## Gate 5 — independent evidence design

### Main

Task: `T22V3::SIDE279::S01-M@1`.

Purpose: observe direct eigenpair verification, scalar-rescaling invariance and one specified use of repeated eigen-action on material not solved in instruction.

Honest evidence-distance class: **retrieval**.

Reason: the reasoning architecture is explicitly taught in the worked/guided sequence. Different numbers and the negative eigenvalue make it worthwhile retrieval/application, not fresh proof invention.

Decision audit: candidate vectors are supplied; the learner still decides which satisfy exact proportionality and what (\lambda) is. The task now explicitly requests the general linearity step (A(cv)=\lambda(cv)) for (c\ne0), preventing the ownership ledger from claiming a general rescaling argument that the prompt never asked for.

### Transfer

Task: `T22V3::SIDE279::S01-T@1`.

Honest class: **changed-surface Transfer**.

Changed structure:

- forward candidate verification → audit of a false report;
- stretch/shear-style examples → orthogonal 90-degree rotation;
- local candidate decision → global decision whether any nonzero real eigendirection exists;
- familiar cue “same direction” is obscured by a true but irrelevant preserved-length property.

No untaught complex-number theorem is necessary. The real-coordinate equations or geometric rotation argument suffice.

### Wrong-solver attacks

| Wrong response | Why plausible | Criterion that rejects it |
| --- | --- | --- |
| “Only (\lambda=1) counts, so q is not an eigenvector.” | conflates eigenvector with fixed vector | Main classification row: (Aq=-q), so (\lambda=-1) must be accepted |
| “q and (1,-1) are two different eigendirections because they are different vectors.” | treats representatives as directions | Main rescaling row explicitly requires the (A(cv)=\lambda(cv)) linearity argument |
| “Compute (A^5p) only by five matrix multiplications.” | misses the structural purpose | numerical answer alone cannot earn the full repeated-action reasoning row |
| “R preserves length, therefore every vector is an eigenvector.” | confuses norm preservation with invariant direction | Transfer first row explicitly scores rejection of that implication |
| “e1 is fixed because its length stays 1.” | same misconception on one vector | Transfer direct test gives (Re_1=(0,1)), not proportional to (e_1) |
| “Maybe another real direction works.” | checks one vector only | Transfer final row requires a decisive global argument that no nonzero real eigendirection exists |

Valid alternative deliberately preserved: for the Transfer's global conclusion, either a coordinate proof leading to (\lambda^2=-1) over (mathbb R), or a correct geometric argument that a 90-degree rotation changes every nonzero real line, receives full relevant credit.

**Gate-5 disposition: PASS after evidence-label and claim-scope repair.**

## Gate 6 — reconstruction and rubric fairness

This is a same-context reconstruction, **not** a claim of blind or independent review.

### Main reconstruction from public prompt

For
[
A=\begin{bmatrix}1&2\\2&1\end{bmatrix},
quad p=(1,1),quad q=(2,-2),quad r=(1,0),
]

direct multiplication gives:

- (Ap=(3,3)=3p), so (p) is an eigenvector with (\lambda=3);
- (Aq=(-2,2)=-q), so (q) is an eigenvector with (\lambda=-1);
- (Ar=(1,2)), not a scalar multiple of (r), so (r) is not an eigenvector.

Because (q=2(1,-1)), linearity gives
[
A(c v)=cAv=c\lambda v=\lambda(cv),
]
so nonzero rescaling preserves the represented eigendirection and eigenvalue.

From (Ap=3p),
[
A^5p=3^5p=243(1,1)=(243,243).
]

A separate exact computation of (A^5p) reproduces ((243,243)).

### Transfer reconstruction from public prompt

For
[
R=\begin{bmatrix}0&-1\\1&0\end{bmatrix},
]
(Re_1=(0,1)), so (e_1) is not fixed and is not an eigenvector.

If (R(a,b)=\lambda(a,b)) over the reals, then
[
-b=\lambda a,qquad a=\lambda b.
]
Any nonzero solution would force (\lambda^2=-1), impossible for real (\lambda). Equivalently, (R^2=-I); an assumed real eigenpair would imply (-v=\lambda^2v), again (\lambda^2=-1). Thus no nonzero real eigenvector exists.

### Bidirectional fairness

Every positive rubric row has a corresponding explicit public request:

- three candidate computations/classifications ↔ Main (a);
- rescaling/eigendirection argument ↔ Main (b);
- eigenpair-based fifth power ↔ Main (c);
- length-versus-direction audit ↔ Transfer audit request;
- direct (e_1) test ↔ Transfer request;
- global no-real-eigenvector conclusion ↔ Transfer request.

Conversely, every important public request is scored. No point requires an unrequested essay, complex-number notation, characteristic polynomial, diagram or named theorem.

**Gate-6 disposition: PASS.**

## Gate 7 — claim-to-evidence audit

The first draft failed literal observability in one place: it claimed more about possible eigenvalue signs / arbitrary powers than the fixed evidence observed. That wording was repaired before this receipt.

Current claims:

| Claim | Observer | Why literal | Escape test | Disposition |
| --- | --- | --- | --- | --- |
| Verify eigenpair status for supplied nonzero real candidates by exact proportionality, recovering (\lambda). | S01 Main (a), rubric row 1 | learner computes all three images and accepts/rejects each candidate | naming vectors without the scalar relation loses the row | adequate |
| Use linearity to justify nonzero scalar rescaling preserves eigendirection/eigenvalue. | S01 Main (b), rubric row 2 | prompt explicitly requests general (A(cv)=\lambda(cv)) step | “q is twice the other vector” alone is insufficient | adequate |
| Distinguish preserved direction from fixed/preserved-length claims and use a verified eigenpair for a specified repeated action. | Main (c) + Transfer, rows 3 / 1 | two public surfaces literally ask for these actions | brute-force power or norm-only reasoning misses relevant row | adequate |

The executable pilot guard checks that every cited rubric-evidence string exists on one of the mapped task evaluators and contains a bounded known-bad mutation where a real but wrong rubric row is substituted for a reviewed observer; that mutation is required to fail.

**Gate-7 disposition: PASS for the three narrowed S01 claims.**

## Gate 8 — separation and answer exposure

### Within-session comparison

**Main closest instruction**

- worked: (A=\begin{bmatrix}2&1\\0&1\end{bmatrix}), (e_1,(1,-1),e_2);
- guided: (C=\begin{bmatrix}3&0\\2&1\end{bmatrix}), ((1,1),(0,1),(1,0)).

Main instead uses symmetric (A=\begin{bmatrix}1&2\\2&1\end{bmatrix}), includes a negative eigenvalue, changes representative scale, and asks for a fifth power. This is **general instruction / retrieval**, not solved-answer exposure.

**Transfer closest instruction**

The lesson states the general distinction “preserved length is not the eigenvector condition.” It does **not** show the rotation matrix, (Re_1=(0,1)), the equations (-b=\lambda a, a=\lambda b), (R^2=-I), or the no-real-eigenvector conclusion.

This is general instruction supporting a changed-surface Transfer, not a solved subanswer.

### Earlier-session search

A repository search over the accepted authoring packs M01–M15 for `eigenvector` returned only M14/M15 **boundary/exclusion metadata** naming M16 as future ownership. No earlier learner-facing worked eigenvalue/eigenvector example was found.

Searches of current main for the distinctive fixed-instance strings:

- `Let A=[[1,2],[2,1]]`;
- `R=[[0,-1],[1,0]]`;
- `A^5 p`;

returned no earlier code-search hits. The fixed problems are therefore not reused from accepted T22 learner instruction.

### Provenance decision

This is a new unpublished module with no prior learner attempts. No exposure migration is required. If these tasks are later changed after publication, Gate 10 must be reopened.

**Gate-8 disposition: PASS for S01.**

## Pilot conclusion

S01 now passes the builder's local Gates 4–8 under v1.2.

What this establishes:

- the first eigenstructure lesson is prerequisite-safe and teachable from the accepted route;
- its fixed references recompute correctly;
- its rubric is bidirectionally fair;
- its three ownership claims are literally observed;
- Main is honestly labelled retrieval;
- Transfer is a genuine changed-surface rotation audit;
- no exact-answer exposure was found in S01 or accepted M01–M15 instruction.

What this does **not** establish:

- independent adversarial acceptance;
- learner mastery;
- whole-module coherence;
- browser/rendering correctness;
- Gate 9–12 completion;
- permission to publish M16.

**Protocol consequence:** Gate 8 is clear for S01, so S02 may now be authored and must itself pass Gates 4–8 before S03 is completed.
