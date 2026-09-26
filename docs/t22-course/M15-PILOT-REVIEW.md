# T22 Elite M15 / SIDE278 — S11 pilot review

Status: **pilot PASS after Gates 4–8 self-falsification; not independent acceptance.**  
Design authority: `docs/t22-course/M15-DESIGN-GATE.md`.  
Pilot: **S11 · General-column projection and the normal equations**.

The pilot exists to test the M15 authoring pattern before bulk session authoring. Its data are original to T22; no Strang/MIT/Axler/Hefferon exercise is copied.

## Candidate contract

**Entry capabilities**
- M14 column space, rank/full-column-rank, exact matrix multiplication and 2×2 system solving.
- M15 S01–S07 orthogonal decomposition/projection/nearest-point geometry.
- M15 S10 transpose definition and `(A^T y)_j=a_j·y`.

**Central capability**  
For full-column-rank `A`, derive `A^T(b-Ac)=0` from the projection condition, derive the normal equations, justify invertibility of `A^TA` from full column rank, solve the exact coefficient system, and verify the residual is orthogonal to every column.

**Principal obstacle**  
Treating `A^TAc=A^Tb` as a memorized algebraic recipe, or using `(A^TA)^{-1}` without checking full column rank.

## Gate 4 — complete learner-facing pilot

### Lesson

**Orient.** In S06, an orthonormal basis made projection easy: take dot products and use them directly as coefficients. Real model columns are often not orthonormal. Suppose the columns of a real `m×n` matrix `A=[a1 ... an]` span the model subspace. We want the point `p=Ac` in `Col(A)` closest to a target `b`.

**Define.** The coefficient vector `c` selects a linear combination of the columns. The residual is `r=b-Ac`. Orthogonal projection means exactly two things: `Ac∈Col(A)` and `r⊥Col(A)`. From S10, `r⊥Col(A)` is equivalent to every column dot product being zero, which is the compact condition `A^T r=0`.

**Connect.** Substitute `r=b-Ac`:
[
A^T(b-Ac)=0
quadLongleftrightarrowquad
A^TAc=A^Tb.
]
These are the **normal equations**. They are not the definition of projection; they are the matrix form of residual orthogonality.

**Why the inverse is legal under full column rank.** If `A` has independent columns and `A^TAx=0`, then
[
0=x^TA^TAx=(Ax)^T(Ax)=||Ax||^2.
]
Hence `Ax=0`; full column rank gives `x=0`. Thus `A^TA` has trivial null space and is invertible by M14's square-matrix criterion. This argument is finite, real and exact; M15 does not invoke positive-definiteness or spectral theory.

**Worked example.** Let
[
A=egin{bmatrix}1&0\\0&1\\1&1end{bmatrix},qquad b=egin{bmatrix}2\\1\\0end{bmatrix}.
]
The columns are independent. Compute
[
A^TA=egin{bmatrix}2&1\\1&2end{bmatrix},qquad
A^Tb=egin{bmatrix}2\\1end{bmatrix}.
]
Solving gives `c=(1,0)^T`. Therefore
[
p=Ac=(1,0,1)^T,qquad r=b-p=(1,1,-1)^T.
]
Check:
[
A^Tr=(0,0)^T,
]
so the residual is orthogonal to both model columns. By S07, `p` is the unique closest vector in `Col(A)`.

**Guided practice.** For
[
C=egin{bmatrix}1&0\\1&1\\0&1end{bmatrix},qquad d=(0,2,1)^T,
]
first compute `C^TC` and `C^Td`. Before solving, answer: what exact statement about the residual will the resulting coefficient vector guarantee?

**Guided feedback, shown only after an attempt.**  
`C^TC=[[2,1],[1,2]]` and `C^Td=(2,3)^T`. Solving gives `c=(1/3,4/3)^T`. The guarantee is not “zero residual”; it is `C^T(d-Cc)=0`, meaning the residual is orthogonal to every column and therefore to `Col(C)`.

**Fade.** The independent tasks do not tell the learner which residual test to use in the changed-surface audit.

**Distinction check.** “Normal equations have a solution” and “`Ax=b` has an exact solution” are different claims. Least-squares/projection can have a nonzero residual. Also, `(A^TA)^{-1}` is justified here only after full column rank has been established.

### Gate-4 falsification

- **First hidden prerequisite?** None found. Transpose/column-dot meaning is deliberately owned by S10; full-column-rank and null-space/invertibility logic are inherited from M14.
- **Theorem-type check:** objects are finite real matrices/vectors; no complex adjoint or infinite-dimensional theorem is used.
- **Worked-example completeness:** all givens, `A^TA`, `A^Tb`, coefficient solve, fitted vector, residual and orthogonality verification are explicit.
- **Guided-practice check:** the learner must compute the two matrix products and state the residual meaning before feedback appears.
- **Future-boundary check:** the proof avoids PSD/eigenvalue/QR/SVD/pseudoinverse language.

## Gate 5 — independent evidence design

### Main — `T22V3::SIDE278::S11-M@1`

> Let `A=[[1,0],[0,1],[1,1]]` and `b=(2,1,0)^T`.  
> (a) Starting from the requirement that `r=b-Ac` be orthogonal to `Col(A)`, derive `A^T A c=A^T b`.  
> (b) Compute `A^TA` and `A^Tb`, solve for `c`, then compute `p=Ac` and `r=b-p`.  
> (c) Verify `A^Tr=0`.  
> (d) Explain why full column rank makes `A^TA` invertible, using `x^TA^TAx=||Ax||^2` and M14 null-space logic.

**Evidence distance:** **proof reconstruction**. The derivation architecture is taught; the task reconstructs it and executes it on the fixed public instance.

### Transfer — `T22V3::SIDE278::S11-T@1`

> Let `B=[[1,1],[1,-1],[0,1]]`, `d=(1,2,0)^T`, and consider two proposed coefficient vectors  
> `c1=(3/2,-1/3)^T` and `c2=(1,0)^T`.  
> Without solving the normal equations from scratch, decide which candidate produces the orthogonal projection of `d` onto `Col(B)`. For each candidate compute the residual and the diagnostic `B^T r`. Explain why the passing candidate is the unique coefficient vector for the projection.

**Evidence distance:** **changed-surface Transfer**. The learner is not asked to derive coefficients; the surface reverses direction into an audit of proposed solutions and removes the normal-equation solve as the obvious route.

### Decision audit

| Claimed learner decision | Supplied? | Decisively rehearsed? | Scored action |
| --- | --- | --- | --- |
| Main: connect residual orthogonality to normal equations | The condition is supplied, the algebraic bridge is not | Yes, in lesson | Derivation from `A^Tr=0`. |
| Transfer: choose which proposed coefficient vector is the projection | No | No exact candidate-audit instance is shown | Residual + `B^Tr` for both candidates and justified selection. |
| Transfer: justify coefficient uniqueness | No | Full-rank criterion is taught, but must be applied to fresh B | Establish independent columns/full column rank and connect to uniqueness. |

## Gate 6 — independent solution and rubric audit

### Main reference

Residual orthogonality means `A^T(b-Ac)=0`, hence `A^TAc=A^Tb`. Here
[
A^TA=egin{bmatrix}2&1\\1&2end{bmatrix},quad
A^Tb=egin{bmatrix}2\\1end{bmatrix},
]
so `c=(1,0)^T`. Then `p=(1,0,1)^T` and `r=(1,1,-1)^T`; multiplying gives `A^Tr=(0,0)^T`. If `A^TAx=0`, then `0=x^TA^TAx=||Ax||^2`, hence `Ax=0`; full column rank forces `x=0`, so `A^TA` is invertible.

**Main rubric — 10 points**
- 3: Derives `A^T(b-Ac)=0` and the normal equations from residual orthogonality rather than quoting them.
- 3: Computes `A^TA=[[2,1],[1,2]]`, `A^Tb=(2,1)^T`, and `c=(1,0)^T`.
- 2: Computes `p=(1,0,1)^T`, `r=(1,1,-1)^T`, and verifies `A^Tr=0`.
- 2: Gives the full-column-rank invertibility argument through `||Ax||^2` and trivial null space.

### Transfer reference

For `c1=(3/2,-1/3)^T`,
[
Bc_1=(7/6,11/6,-1/3)^T,quad
r_1=(-1/6,1/6,1/3)^T,
]
and `B^Tr1=(0,0)^T`, so `c1` produces the projection. For `c2=(1,0)^T`, `Bc2=(1,1,0)^T`, `r2=(0,1,0)^T`, and `B^Tr2=(1,-1)^T
eq0`; it fails the defining residual condition. The columns of B are independent, so B has full column rank and the projection coefficient vector is unique.

**Transfer rubric — 10 points**
- 4: Computes `r1=(-1/6,1/6,1/3)^T` and verifies `B^Tr1=0`.
- 3: Computes `r2=(0,1,0)^T` and `B^Tr2=(1,-1)^T
eq0`.
- 2: Chooses `c1` for the orthogonal projection and explains the diagnostic in column-orthogonality terms.
- 1: Justifies coefficient uniqueness from full column rank / independent columns.

### Wrong-solver attacks

1. **Memorized-inverse solver:** writes `c=(A^TA)^{-1}A^Tb` with no rank justification. Loses the Main derivation and invertibility rows.
2. **Exact-solution misconception:** rejects the Main because `Ac≠b`. Loses fitted/residual and orthogonality credit.
3. **Residual-sum heuristic:** in Transfer chooses the smaller-looking residual without checking `B^Tr`. Cannot earn diagnostic/selection credit.
4. **Transpose-as-inverse misconception:** attempts `B^{-1}r`; B is rectangular, so the error is exposed immediately.
5. **“Any stationary candidate” escape:** `c2` visibly fails `B^Tr=0`; no rubric path awards projection credit.

Rubric fairness check found no requested public obligation absent from the rubric and no rubric obligation absent from the prompt.

## Gate 7 — claim-to-evidence links

| Ownership claim | Observer | Exact scored evidence | Escape attempt | Disposition |
| --- | --- | --- | --- | --- |
| Derive normal equations from residual orthogonality | Main | rubric row 1 | Quote formula only | Fails row 1; adequate. |
| Solve a full-column-rank projection problem exactly | Main | rows 2–3 | Give c only | Misses p/r/orthogonality; adequate. |
| Justify invertibility of `A^TA` under full column rank | Main | row 4 | Say “det nonzero” without link | Does not satisfy required `||Ax||^2` argument; adequate. |
| Audit a proposed projection using `A^Tr` | Transfer | rows 1–3 | Pick candidate numerically | Diagnostic calculations are required; adequate. |
| Connect independent columns to coefficient uniqueness | Transfer | row 4 | State unique without reason | Loses row; adequate. |

Generalization distance: Main is proof reconstruction on fresh exact data; Transfer changes the direction of work from “derive/solve” to “audit competing outputs,” so it cannot be completed by substituting new numbers into the worked solve.

## Gate 8 — semantic separation / exposure audit

| Task | Closest answer-bearing instruction | Mathematical difference | Disposition |
| --- | --- | --- | --- |
| S11-M | S11 worked example in the eventual lesson must use data distinct from the fixed Main. The pilot text above currently demonstrates the Main data for mathematical verification only and **must not be copied verbatim into the final learner lesson**. | Final lesson will use a different matrix/target; Main remains the fixed A,b above. | **REPAIR BEFORE BULK AUTHORING:** change final worked-example data. |
| S11-T | No solved candidate-audit instance in pilot instruction. | Reversed task direction, two candidates, residual diagnostics; B,d are unique to Transfer. | CLEAR. |

### Pilot repair triggered by Gate 8

The first pilot draft used the Main matrix in the worked example. Gate 8 correctly rejects that as solved-answer exposure. The final authoring pattern therefore changes the worked example to
[
C=[[1,0],[1,1],[0,1]],quad d=(0,2,1)^T,
]
with solution `c=(1/3,4/3)^T`, while the fixed Main retains `A=[[1,0],[0,1],[1,1]]`, `b=(2,1,0)^T`.

This is a real Gate-8 repair, not a wording change. The final S11 lesson must use only C,d as its complete worked example and a third distinct instance for guided practice. The fixed Main and Transfer remain solution-free until reveal.

## Pilot disposition

**PASS after the exposure repair is incorporated into the canonical authoring pack.**

The pilot established the module-wide pattern:
- formulas are derived from geometry before use;
- rank hypotheses are public and scored where needed;
- worked examples and fixed tasks use semantically distinct data;
- guided practice leaves a real action before feedback;
- Main evidence labels remain honest even when the reasoning architecture is taught;
- Transfer must change the mathematical direction/surface, not merely constants;
- wrong-solver attacks are tied to actual rubric rows;
- future M17/M23 machinery is excluded.

Bulk authoring may proceed one session at a time using this repaired pattern. M15 remains unpublished.
