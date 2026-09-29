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


## S05 — Same eigenspace, different theorem

### Gate 4 — teaching
PASS. Equal-eigenvalue closure is derived directly from linearity; distinct-eigenvalue independence is proved first for two vectors and then extended by the ((A-\lambda_n I)) induction architecture. The lesson explicitly states that same-eigenvalue status alone implies neither dependence nor independence.

### Gate 5 — evidence
Main is **proof reconstruction**: it asks for the general equal-eigenvalue closure argument and a three-vector distinct-eigenvalue independence reconstruction. Transfer is **changed-surface Transfer** after repair: a universal verbal claim is tested inside the fresh eigenspace of (5I_2), which contains both a dependent pair and an independent pair. Wrong solver “all eigenvectors are independent” fails on (w=3u); wrong solver “same eigenvalue means dependent” fails on (u=(1,1),z=(1,-1)).

### Gate 6 — reconstruction/fairness
Main proof is valid: applying (A-\lambda_3I) to (c_1v_1+c_2v_2+c_3v_3=0) removes the third term; the two-vector distinct-eigenvalue theorem forces (c_1=c_2=0), then (c_3=0). Same-eigenvalue closure follows by one linearity calculation.

For Transfer, every nonzero vector under (5I_2) has λ=5; (w=(3,3)=3u) is dependent with (u=(1,1)), while (u,z=(1,-1)) are independent. All scoring requirements are explicitly public.

### Gate 7 — claims
PASS. The public Main literally observes arbitrary two-vector equal-eigenvalue closure and a three-vector distinct-eigenvalue proof; Transfer literally observes rejection of universal eigenvector independence. The claim is intentionally three-vector bounded rather than falsely claiming the learner publicly proved the full finite theorem.

### Gate 8 — separation
The first Transfer draft was **BLOCKED** because it reused the exact (2I,e_1,2e_1,e_2) worked contrast. Before advancing, it was replaced by (5I_2) with (u=(1,1),w=(3,3),z=(1,-1)). The repaired task preserves the misconception but not the solved mathematical instance. Re-audit: CLEAR.

**S05 local disposition: PASS after Gate-8 repair. S06 may open.**


## S06 — Repeated roots are not repeated directions

### Gate 4 — teaching
PASS. Algebraic multiplicity is defined as root multiplicity; geometric multiplicity as (\dim E_\lambda). The general finite-dimensional bound (1\le g_\lambda\le a_\lambda) is labelled a sourced support theorem, not falsely presented as a proof obligation before the similarity machinery needed for the clean structural proof. The session owns the distinction and concrete calculations.

### Gate 5 — evidence
Main is **retrieval** through a fresh same-polynomial/different-eigenspace comparison. Transfer is **changed-surface Transfer**: a factored polynomial is embedded in a report that has already made the invalid inference (a_3=2\Rightarrow g_3=2). Wrong solver equating the two counts fails the eigenspace and diagnosis rows.

### Gate 6 — reconstruction/fairness
Both (2I_2) and ([[2,1],[0,2]]) have ((2-t)^2), hence (a_2=2); their eigenspace dimensions are respectively 2 and 1. For (C=[[3,1,0],[0,3,0],[0,0,1]]), (p_C=(3-t)^2(1-t)) while (E_3=\mathrm{span}\{e_1\}), so (a_3=2,g_3=1). Rubrics request no Jordan terminology or proof of the general inequality.

### Gate 7 — claims
PASS. Claims are concrete multiplicity computations and misconception diagnosis. None claims the learner publicly proved (g\le a) in general.

### Gate 8 — separation
PASS. Worked contrast uses eigenvalue 4, guided example uses diagonal eigenvalue 5, Main uses eigenvalue 2, and Transfer uses a distinct 3×3 eigenvalue-3 instance. No fixed answer is exposed.

**S06 local disposition: PASS. S07 may open.**


## S07 — When eigenvectors form a basis

### Gate 4 — teaching
PASS. Diagonalizability is introduced as the existence of an eigenbasis, with actual P/D construction deferred to S08. Repeated eigenvalues are handled through eigenspace dimensions, and the n-distinct-real-eigenvalues corollary is derived from S05 independence plus the basis-size theorem.

### Gate 5 — evidence
Main is **proof reconstruction**: fresh eigenspace calculations plus the general distinct-root corollary. Transfer is **changed-surface Transfer**: the matrix disappears and only polynomial/eigenspace data remain, so the learner must decide from dimension rather than elimination.

### Gate 6 — reconstruction/fairness
For (A=[[4,2,0],[2,4,0],[0,0,6]]), (p_A=(6-t)^2(2-t)), (E_6=\mathrm{span}\{(1,1,0),(0,0,1)\}), (E_2=\mathrm{span}\{(-1,1,0)\}). The three directions form an eigenbasis. The general corollary proof is valid by S05. The Transfer's supplied dimensions 2+1=3 likewise give an eigenbasis.

### Gate 7 — claims
PASS. Eigenbasis criterion, dimension decision and n-distinct-real-eigenvalue corollary are all publicly observed.

### Gate 8 — separation
PASS. Worked diagonal, guided symmetric block, Main different symmetric block, and data-only Transfer are mathematically distinct. No fixed answer is exposed.

**S07 local disposition: PASS. S08 may open.**


## S08 — Build the diagonal coordinates

### Gate 4 — teaching
PASS. P and D are defined from an ordered eigenbasis; AP=PD is derived columnwise before A=PDP^-1. P's invertibility is tied to the basis property, not merely a determinant calculation. Column/eigenvalue order is an explicit distinction.

### Gate 5 — evidence
Main is **proof reconstruction** on a fresh eigenbasis. Transfer is **changed-surface Transfer**: a complete-looking but corrupted P,D pair is supplied and must be diagnosed by BP versus PD. Wrong solver that treats D as freely reorderable fails immediately.

### Gate 6 — reconstruction/fairness
For A=[[5,2],[0,1]], P=[[1,1],[0,-2]], D=diag(5,1), P^-1=[[1,1/2],[0,-1/2]], AP=PD and PDP^-1=A. For Transfer B=[[2,0],[1,4]], P=[(-2,1),(0,1)] gives BP=[[-4,0],[2,4]]; proposed diag(4,2) gives a different PD, while diag(2,4) matches. Every rubric row is publicly requested.

### Gate 7 — claims
PASS. Ordered construction, columnwise derivation/invertibility and order-mismatch diagnosis are each literally observed.

### Gate 8 — separation
PASS. Worked/guided/Main/Transfer use four distinct matrices/eigenbases; only the general AP=PD method is shared.

**S08 local disposition: PASS. S09 may open.**


## S09 — Powers without brute force

### Gate 4 — teaching
PASS. A^k=PD^kP^-1 is derived by adjacent P^-1P cancellations and explicitly conditioned on a valid diagonalization. The finite recurrence bridge is shown through eigen-coordinates; asymptotic claims remain deferred.

### Gate 5 — evidence
Main is **proof reconstruction**; Transfer is **changed-surface Transfer** from a matrix-power request to a recurrence/initial-state decomposition. Brute-force multiplication cannot earn the modal-decomposition rows.

### Gate 6 — reconstruction/fairness
For A=[[3,2],[2,3]], the supplied eigenbasis gives D=diag(5,1) and A^4=[[313,312],[312,313]]. For B=[[2,0],[1,3]], x0=(2,1)=2(1,-1)+3(0,1), hence x4=(32,211). Independent direct matrix-power computation matches both results.

### Gate 7 — claims
The first draft overclaimed the general all-k theorem from a k=4 public proof. It was narrowed before clearance to the observed capability: justify the power formula for a specified finite exponent using the cancellation mechanism. Exact matrix-power and finite-recurrence claims are directly scored.

### Gate 8 — separation
PASS. Worked, guided, Main and Transfer matrices/states are distinct. No earlier fixed power/state problem is reused.

**S09 local disposition: PASS after claim narrowing. S10 may open.**
