# T22 Elite M16 — sequential local Gate 4–8 receipts

Status: **builder-local development record; not independent acceptance and not publication evidence.**  
Branch: `codex/t22-m16-builder-candidate`  
Protocol: T22 Module Builder and Adversarial Checker v1.2

S01 has the fuller pilot receipt in `M16-PILOT-REVIEW.md`. This file records later session-local clearances required before advancing.

## S02 — An eigenspace is a kernel

### Gate 4 — teaching
PASS. The lesson defines (E_\lambda=\mathrm{Null}(A-\lambda I)) only after S01's (Av=\lambda v), reuses M14 homogeneous systems explicitly, solves one full example, leaves a distinct 3×3 guided calculation, and keeps characteristic-polynomial discovery out of scope. The definition/subspace/eigenvector distinction is explicit: (0\in E_\lambda), but (0) is not an eigenvector.

### Gate 5 — evidence
Main is honestly **retrieval**: shift, solve and span for two supplied λ values. Transfer is **changed-surface Transfer**: a punctured eigenline is presented as a report to audit, changing from forward calculation to subspace/set diagnosis. Wrong-solver controls: (i) “remove zero because zero is not an eigenvector” loses both Transfer distinction rows; (ii) “all listed vectors are eigenvectors, therefore the set is an eigenspace” loses the subspace row. Valid alternative: any equivalent basis/parametrization of the null space passes.

### Gate 6 — reconstruction/fairness
For (A=[[4,1,0],[0,4,0],[0,0,2]]):

- (A-4I=[[0,1,0],[0,0,0],[0,0,-2]]), so (y=z=0), (E_4=\mathrm{span}\{(1,0,0)\}).
- (A-2I=[[2,1,0],[0,2,0],[0,0,0]]), so (x=y=0), (E_2=\mathrm{span}\{(0,0,1)\}).

For (C=\mathrm{diag}(5,1)), (E_5=\mathrm{span}\{(1,0)\}=\{t(1,0):t\in\mathbb R\}). The punctured line is not a subspace because it omits zero. Every positive rubric requirement is explicitly requested and every important public request is scored.

### Gate 7 — claims
PASS after literal audit. Claim 1 is bounded to supplied λ values; it does not claim independent discovery of eigenvalues. Claim 2 is the publicly scored eigenspace/eigenvector zero distinction. Claim 3 is an audit capability, matching the Transfer's direction rather than pretending the learner constructed the erroneous set.

### Gate 8 — separation
PASS. Worked example: 2×2 Jordan-style matrix with λ=2/1. Guided: different 3×3 matrix with a two-dimensional (E_3). Main: different 3×3 matrix with two one-dimensional eigenspaces. Transfer: distinct diagonal matrix and a punctured-set report. No S01 task or answer is reused. General null-space method is shared instruction, not answer exposure.

**S02 local disposition: PASS. S03 may open.**


## S03 — Why the characteristic equation appears

### Gate 4 — teaching
PASS. The determinant equation is derived through the exact M14 object chain ((A-\lambda I)v=0\) → nontrivial kernel → singular shifted matrix → zero determinant. The lesson explicitly says this is a consequence, not the definition. One full 2×2 example and a distinct guided matrix are solved; λ discovery is now in scope, while multiplicity/diagonalization remain deferred.

### Gate 5 — evidence
Main is **proof reconstruction** because the determinant derivation architecture is taught and reconstructed on a fresh matrix. Transfer is **changed-surface Transfer** because it begins from the false report `det(T)=6 ⇒ λ=6` and requires identifying the wrong object before repairing the calculation. Wrong solver: using `det(A)` instead of `det(A-λI)` cannot earn the derivation or eigenvalue rows. Opposite characteristic-polynomial sign convention is explicitly accepted.

### Gate 6 — reconstruction/fairness
For (A=[[4,2],[1,3]]), (\det(A-\lambda I)=\lambda^2-7\lambda+10=(\lambda-5)(\lambda-2)). The eigenspaces are (E_5=\mathrm{span}\{(2,1)\}) and (E_2=\mathrm{span}\{(-1,1)\}). Direct multiplication verifies (A(2,1)=5(2,1)).

For (T=[[2,1],[0,3]]), (\det(T-\lambda I)=(2-\lambda)(3-\lambda)), so λ=2,3 with (E_2=\mathrm{span}\{(1,0)\}), (E_3=\mathrm{span}\{(1,1)\}). A draft reference sentence invoking the future product-of-eigenvalues invariant was removed before clearance; the evaluator now uses only owned machinery.

Every scoring row is publicly requested and every public subpart is scored.

### Gate 7 — claims
PASS. The three claims are literally observed: general determinant derivation, exact small-matrix characteristic computation, and eigenspace follow-through. None claims high-degree polynomial solving, multiplicity theory or numerical eigenvalue computation.

### Gate 8 — separation
PASS. Worked/guided matrices differ from both fixed tasks. Transfer reuses only the general distinction between `det(A)` and the shifted determinant, not a solved instance. No S01/S02 fixed matrix or answer is reused.

**S03 local disposition: PASS. S04 may open.**


## S04 — Structure before expansion

### Gate 4 — teaching
PASS. Triangular eigenvalues are derived from the shifted triangular determinant, not guessed from the diagonal. The 2×2 trace/determinant relationships are derived from the characteristic polynomial and labelled checks rather than definitions. Eigenspace information remains a separate null-space computation.

### Gate 5 — evidence
Main is **retrieval**: triangular factorization plus scalar checks on a fresh matrix. Transfer is **changed-surface Transfer**: correct eigenvalues/checks are embedded in a false eigenvector conclusion, forcing the learner to diagnose an information mismatch. Wrong solver “trace/det confirm e1,e2” fails the eigenspace rows.

### Gate 6 — reconstruction/fairness
For (U=[[6,4,1],[0,2,5],[0,0,-3]]), (p_U(\lambda)=(6-\lambda)(2-\lambda)(-3-\lambda)), giving 6,2,-3; sum 5 matches trace and product -36 matches determinant.

For (A=[[0,2],[-3,5]]), (E_2=\mathrm{span}\{(1,1)\}) and (E_3=\mathrm{span}\{(2,3)\}). Thus the supplied scalar checks do not identify coordinate-axis directions. All rubric requirements are explicitly requested.

### Gate 7 — claims
PASS. Structural triangular factorization, bounded consistency-check use and scalar-to-direction audit are each directly observed. No general n×n coefficient theorem or multiplicity claim is made.

### Gate 8 — separation
PASS. Worked/guided triangular instances and the 2×2 check example are distinct from Main and Transfer. No prior fixed task is reused; only the general method/limitation transfers.

**S04 local disposition: PASS. S05 may open.**
