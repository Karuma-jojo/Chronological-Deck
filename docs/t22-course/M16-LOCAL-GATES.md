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
