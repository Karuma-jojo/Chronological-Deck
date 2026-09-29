# T22 Elite M16 / SIDE279 — pre-authoring design gate

Status: **Gate 0 recovered; Gates 1–3 builder design candidate. No learner-facing M16 authoring exists yet. M17 remains closed.**  
Date: 2026-09-30  
Protocol: **T22 Module Builder and Adversarial Checker v1.2**  
Repository: `Karuma-jojo/Chronological-Deck`  
Build branch: `codex/t22-m16-builder-candidate`  
Recovered base: `main@1524ff9d8ab622afa9f5b1fe3ce006a64e0352d9`

This file is the controlling planning record for **M16 · SIDE279 · Eigenvalues, Eigenvectors & Spectral Structure**. It is not an acceptance record and does not authorize publication.

## 0. Gate-0 recovery receipt

- Current authoritative project head at opening: `main@1524ff9d8ab622afa9f5b1fe3ce006a64e0352d9`.
- Accepted learner frontier: **M15 / SIDE278**, published and independently accepted.
- Canonical accepted predecessors used here:
  - `course/t22/authoring/m14-side276.json`
  - `course/t22/authoring/m15-side278.json`
  - `docs/t22-course/M14-*.md`
  - `docs/t22-course/M15-*.md`
- Macro authority: `docs/t22-rebuild/M65-SKELETON.md`, `docs/t22-rebuild/m65.dependencies.json`, `docs/t22-rebuild/SEMANTIC-PREREQUISITES.json`, `course/t22/generated/roadmap.json`.
- M16 currently has no canonical authoring pack and is `planned` / `pending-boundary-audit`.
- Legacy comparator only: `js/data/t22-rich-module-7.js` (SIDE279). Its seven-arc shape is **not** a session-count mandate.
- Naming trap explicitly rejected: `js/data/t22-rich-module-16.js` is ARC713 Performance-Aware Scientific Computing and is not the rebuilt M16.
- Current CI authority: `.github/workflows/t22-elite-checks.yml`; any later M16 implementation must add its own structural/semantic/math/browser guards before publication.
- Authorization for this branch: **BUILD M16 only**. No M17 learner-facing authoring, publication or unrelated route work.

### Gate-0 discrepancy recorded

The older `codex/t22-pedagogical-rebuild` branch is stale relative to current `main`; M16 therefore starts from current main rather than resurrecting that historical branch.

## 1. Boundary Contract

### Destination

After M16, the learner can independently:

1. interpret an eigenvector as a nonzero direction preserved by a linear map up to scalar scaling;
2. derive ((A-\lambda I)v=0) from (Av=\lambda v), use singularity to obtain the characteristic equation, and compute exact eigenvalues/eigenspaces for small matrices;
3. reason correctly about eigenspaces, repeated eigenvalues, algebraic versus geometric multiplicity and independent eigenvectors;
4. determine whether a finite real matrix is diagonalizable, construct (A=PDP^{-1}) when justified, and use it to compute powers and interpret repeated action;
5. diagnose defective matrices without pretending ordinary diagonalization still works;
6. explain what similarity preserves about eigenstructure and how eigenvectors change under coordinate change;
7. handle the minimum complex-eigenvalue language needed to recognize real matrices with no real eigenvectors and conjugate-pair/rotation behaviour, without developing general complex inner-product theory;
8. prove/use the key real-symmetric consequences needed here: real eigenvalues, orthogonality of eigenspaces for distinct eigenvalues, and the finite-dimensional real spectral theorem / orthogonal diagonalization;
9. analyze small discrete linear systems by eigenmodes with explicit initial-condition, diagonalizability and complex/defective caveats.

### Entry

Accepted earlier capabilities actually available:

- **M13 / ARC511:** finite real vectors, span, basis, linear independence, dimension, dot product, norm, orthogonality, Cauchy–Schwarz/angle-level Euclidean reasoning.
- **M14 / SIDE276:** finite real linear maps, matrix representations, composition/multiplication, exact systems, null space/column space/rank/rank-nullity, invertibility, determinant algebra/singularity, coordinate change and similar matrix representations.
- **M15 / SIDE278:** orthogonal/orthonormal sets, orthonormal coordinates, orthogonal complements/decomposition, Gram–Schmidt, transpose bridge, projection and exact least-squares geometry.
- Earlier foundation modules: exact algebra, quadratics/polynomials at school level, powers/sequences, proof/counterexample/induction habits.

### Previous-module exit state

M15 leaves the learner able to reason with orthonormal bases and Gram–Schmidt in finite real Euclidean spaces, distinguish exact algebra from later numerical conditioning, and use transpose/orthogonality safely. M16 may reuse those capabilities but does not re-own them.

### New objects

`eigenvalue`, `eigenvector`, `eigenpair`, `eigenspace`, characteristic polynomial/equation, algebraic multiplicity, geometric multiplicity, eigenbasis, diagonalizable/defective, spectral coordinates, spectral theorem (finite real symmetric case), complex-conjugate eigenvalue pair at bounded working depth, modal coefficient / eigenmode.

### Declared prerequisites

**Decision from the boundary audit:** M16 semantically consumes both **SIDE276 and SIDE278**.

The frozen macro files currently list only SIDE276. That edge is insufficient for the planned finite real spectral-theorem route because M16 consumes accepted M15 orthonormal-basis / Gram–Schmidt / orthogonal-complement capability. Before publication, dependency metadata must be reconciled to make this explicit. Topological position alone is not treated as evidence.

### Deferred topics / future ownership

- **M17 / SIDE280:** quadratic forms; positive definite / semidefinite matrices; covariance PSD geometry; named QR/Cholesky/SVD; pseudoinverse; low-rank approximation.
- **M20 / ARC512:** continuous-time ODE systems, matrix exponentials as an ODE method, continuous-time stability and nonlinear linearization.
- **M23 / ARC585:** numerical eigensolvers, power/QR iteration as algorithms, conditioning, sensitivity, floating-point stability, numerical rank.
- **M41 / ARC541:** PCA as a statistical workflow, explained variance, covariance estimation and discrimination.
- **M48 / ARC543:** state-space estimation / Kalman filtering.
- **M49 / ARC524:** Markov-chain probability, stationary distributions/mixing and martingale/stopping foundations.
- Jordan canonical form, generalized eigenvectors and full complex spectral theory are not core-M16 capabilities.

### Downstream obligations

| Later owner | What it needs from M16 | What M16 must not steal |
| --- | --- | --- |
| M17 / SIDE280 | exact eigenvalues/eigenspaces, real symmetric spectral theorem, orthogonal diagonalization, repeated-eigenvalue discipline | PSD/quadratic forms, QR, Cholesky, SVD, pseudoinverse |
| M20 / ARC512 | diagonalization, mode decomposition, repeated linear action, bounded complex-eigenvalue interpretation | continuous-time ODE solution/stability machinery |
| M23 / ARC585 | mathematical eigenproblem and exact structural distinctions | numerical algorithms/conditioning |
| M41 / ARC541 | spectral theorem and eigen-direction interpretation | PCA/statistical covariance workflow |
| M48 / ARC543 | spectral modes of finite linear transitions | filtering/state estimation |
| M49 / ARC524 | repeated finite linear maps and mode language where later useful | Markov probability/stationarity/mixing |

A separate architecture discrepancy is recorded: current M65 dependency metadata for M20 does not yet list SIDE279 even though the legacy ARC512 contract consumes it. This is a future dependency-reconciliation item, not permission to author M20 here.

### Forbidden future machinery

No PSD test via eigenvalue signs, no SVD/pseudoinverse, no QR eigensolver, no condition numbers, no Jordan chains, no PCA, no Markov-chain theorem catalogue, no ODE phase portraits/matrix-exponential course, no floating-point stability claims.

### Synthesis

Given an unfamiliar small real matrix, the learner must choose a defensible route: find/verify eigenpairs, determine eigenspace dimensions, decide diagonalizability, construct/use spectral coordinates when allowed, reject them when defective, and explain repeated action. If the matrix is symmetric, the learner must identify the stronger orthogonal-diagonalization guarantee and state exactly which later conclusions are still out of scope.

## 2. Prerequisite trace

| Operation consumed | Earlier source / local bridge | Needed before | Decision |
| --- | --- | --- | --- |
| finite linear map / matrix action | M14 S01–S04 | S01 | reuse |
| span of one direction; basis / independence / dimension | M13 | S01 onward | reuse |
| null spaces and singularity | M14 systems/rank/invertibility sequence | S02 | reuse |
| determinant algebra and `det B=0 iff B singular` for square B | M14 determinant ownership | S03 | reuse |
| low-degree polynomial solving | M02 foundations + exact algebra | S03 | reuse; audit actual quadratic coverage in pilot prep |
| similarity / coordinate change | M14 final coordinate-change ownership | S10 | reuse |
| orthonormal bases, orthogonal complements and Gram–Schmidt | M15 S01–S09 | S12 onward | **reuse; therefore add SIDE278 semantic prerequisite** |
| transpose and (A^T=A) syntax | M15 S10 plus M14 matrix typing | S12 | reuse; define “symmetric” locally |
| basic complex number (i), conjugate pair and modulus/rotation language | NONE in accepted T22 authoring | S11 | bounded local bridge |
| Fundamental Theorem of Algebra / existence of a complex root | NONE | spectral-theorem existence proof | state with rigorous source; do not prove complex analysis |
| induction on dimension | M03 proof habits | spectral-theorem proof architecture | reuse |
| asymptotic behaviour of scalar powers (\lambda^k) | M02 sequences/powers + M09 limits | S15 | reuse |
| continuous-time (e^{\lambda t}) stability | future M20 | — | defer |

Evaluator/reference solutions must not invoke any additional theorem without adding it here or to the support ledger.

## 3. Support-Theorem Ledger

| Support result | Why needed / first consumer | Already owned? | Source role | Hypotheses / type | M16 action | Why no future theft |
| --- | --- | --- | --- | --- | --- | --- |
| nonzero solution of (Bv=0) exists iff square (B) is singular iff (det B=0) | derive characteristic equation / S03 | M14 | repository + MIT/Strang | finite square real matrix | reuse | determinant/singularity already M14 |
| eigenspace (E_\lambda=\ker(A-\lambda I)) is a subspace | S02 | M14 kernel theorem + M16 definition | Axler/Strang | fixed eigenvalue of finite linear operator | prove locally | core eigenspace structure |
| eigenvectors for distinct eigenvalues are linearly independent | S05 | NO | Axler / standard theorem | finite list of eigenvectors for pairwise distinct eigenvalues | prove locally | central M16 fact |
| (1\le g_\lambda\le a_\lambda) | repeated eigenvalues / S06 | NO | rigorous source + independent derivation | finite matrix, eigenvalue root multiplicity | prove at intended level or narrow assessed claim | M16 multiplicity ownership |
| diagonalizable iff there is a basis of eigenvectors | S07 | NO | Axler/Strang/Hefferon | finite-dimensional operator | derive/prove locally | core M16 |
| distinct (n) eigenvalues imply diagonalizable | S07 | NO | consequence of independence theorem | (n\times n) with n distinct eigenvalues | prove as corollary | core M16 |
| (A=PDP^{-1}\Rightarrow A^k=PD^kP^{-1}) | S08 | M14 multiplication/inverse supports algebra | Strang/MIT | integer (k\ge0) | derive locally | repeated-action core |
| similar matrices have same characteristic polynomial/eigenvalues | S10 | M14 similarity + determinant algebra | Strang/Hefferon | (B=M^{-1}AM), invertible (M) | prove locally | connects M14 representation to M16 structure |
| nonreal roots of a real polynomial occur in conjugate pairs | S11 | NO | polynomial/complex reference | real-coefficient polynomial | state + bounded proof from conjugation | minimum complex bridge only |
| Fundamental Theorem of Algebra | spectral theorem existence | NO | Axler Ch.4–5 | nonconstant complex polynomial | state/source for use | no later core owner; not a complex-analysis lesson |
| for real symmetric A, (langle Av,w\rangle=langle v,Aw\rangle) | S12 | transpose/dot machinery earlier | Axler/Strang | real symmetric matrix | derive locally | core spectral theorem bridge |
| eigenvectors of real symmetric A for distinct eigenvalues are orthogonal | S12 | NO | Axler/Strang | distinct eigenvalues | prove locally | core M16 |
| finite-dimensional real spectral theorem | S13 | NO | Axler 7B + Strang 6.4 | real symmetric operator/matrix | prove at bounded finite-dimensional level using existence + invariant orthogonal complement induction; use in tasks | M17 consumes it |
| orthogonal diagonalization (A=QDQ^T) for real symmetric A | S13 | M15 gives ON basis; theorem new | Strang/MIT/Axler | real symmetric A | derive locally | core M16, PSD consequences deferred |

## 4. Source Dossier

Access/recheck date for public sources: **2026-09-30**.

### Repository / curriculum authority

**Source:** current T22 repository at recovered main head.  
**Type / role:** repository contract; curriculum authority.  
**Inspected:** M65 skeleton/dependencies, semantic prerequisite ledger, generated roadmap, accepted M14/M15 packs/handoffs, legacy SIDE279/SIDE280/ARC512 contracts, active T22 Elite workflow.  
**Supports:** exact M16 ownership, accepted entry state, naming/provenance, downstream boundaries, publication stop.  
**Not imported:** legacy seven-arc session count or legacy acceptance assumptions.

### Gilbert Strang, *Introduction to Linear Algebra*, 4th ed. — user-supplied scan

**Type / role:** user-supplied deep first-course comparator.  
**Inspected:** Ch.6 route and representative pages: §6.1 *Introduction to Eigenvalues* (text p.284), §6.2 *Diagonalizing a Matrix* (p.299), §6.4 *Symmetric Matrices* (p.331), §6.6 *Similar Matrices* (p.356); chapter TOC also shows §6.3 differential equations, §6.5 positive definite matrices and §6.7 SVD.  
**Supports:** begin from preserved directions, derive determinant/nullspace computation, connect powers to eigenmodes, diagonalization, symmetric orthogonal eigenvectors, similarity invariants.  
**Not imported:** §6.3 as an ODE course; §6.5 PSD; §6.7 SVD; Jordan-form depth in §6.6. No textbook exercise is copied.

### MIT OpenCourseWare 18.06, Spring 2010

**URL:** https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/  
**Type / role:** canonical university route comparator.  
**Inspected:** readings/lectures 21–22 (eigenvalues/eigenvectors; diagonalization and powers), lecture 25 / symmetric matrices, and surrounding route.  
**Supports:** conventional progression and problem types: eigenpairs → diagonalization/powers → later symmetric matrices; positive definiteness and SVD remain later. MIT's eigenvalue tools also explicitly use visual demonstrations of invariant directions/powers.  
**Not imported:** Markov-chain, differential-equation, positive-definite, Jordan or SVD units as M16-owned material.

### Sheldon Axler, *Linear Algebra Done Right*, 4th ed.

**URL:** https://linear.axler.net/LADR4e.pdf  
**Type / role:** rigorous theorem/hypothesis source.  
**Inspected:** Ch.5 §5A invariant subspaces/eigenvalues, §5D diagonalizable operators; Ch.6 orthonormal bases/orthogonal complements as prerequisite comparator; Ch.7 §7A self-adjoint operators and §7B real spectral theorem.  
**Supports:** operator-first definition, exact finite-dimensional hypotheses, eigenvalue/eigenvector theorems, diagonalizability conditions and rigorous real spectral theorem.  
**Not imported:** minimal-polynomial/commuting-operator breadth, positive operators, QR/Cholesky/SVD, generalized eigenspaces/Jordan form, arbitrary complex-inner-product depth.

### Jim Hefferon, *Linear Algebra*

**Canonical page:** https://hefferon.net/linearalgebra/  
**Type / role:** broad coverage / notation and developmental comparator.  
**Inspected:** canonical text description plus Chapter Five *Similarity* route; open-text TOC records §II.1 definition/examples, §II.2 diagonalizability and §II.3 eigenvalues/eigenvectors, with later nilpotence/Jordan and application topics.  
**Supports:** developmental motivation, first-course notation, similarity/diagonalizability/eigenvalue coverage, and the warning that Jordan/material beyond ordinary diagonalization is substantial rather than a footnote.  
**Not imported:** Jordan form, method-of-powers algorithmics, or application chapters as required M16 ownership.

### MAA, *Instructional Practices Guide* (2018)

**URL:** https://maa.org/resource/instructional-practices-guide/  
**Type / role:** required undergraduate mathematics pedagogy baseline.  
**Supports:** student-produced reasoning, active comparison/explanation, multiple meaningful representations and assessment aligned to actual outcomes.  
**Limit:** general undergraduate guidance, not direct experimental evidence for this learner or M16.

### IES / What Works Clearinghouse, *Organizing Instruction and Study to Improve Student Learning* (2007)

**URL:** https://ies.ed.gov/ncee/wwc/PracticeGuide/1  
**Type / role:** general learning-evidence comparator.  
**Population/context:** K–postsecondary, multiple domains.  
**Evidence:** worked-example/problem interleaving, graphics+verbal and abstract+concrete integration are rated Moderate Evidence; deep explanatory questions are Strong Evidence on the WWC page.  
**Supports:** alternating worked and independent eigenstructure reasoning; coordinated matrix/geometric representations; deep “why is this direction invariant?” questions.  
**Limit:** heterogeneous population; not presented as direct M16 efficacy evidence.

### Domain-specific eigentheory education: Wawro, Watson & Zandieh (2019)

**Record:** ERIC EJ1234977; ZDM 51(7), 1111–1123.  
**Type / role:** peer-reviewed domain-specific empirical mathematics-education research.  
**Supports:** documented student difficulties with linear combinations of eigenvectors, including conflating coefficients with eigenvalues, assuming eigenvectors must be linearly independent, and reasoning incorrectly about eigenspace dimension.  
**Design consequence:** M16 must separately assess “same eigenvalue eigenspace closure” versus “different eigenvalue independence”; repeated-eigenvalue tasks must expose dimension reasoning rather than only polynomial roots.  
**Limit:** focused task set / advanced-course context; no prevalence estimate is generalized to this learner.

### Domain-specific representation research: Tabaghi & Sinclair (2013); Tabaghi (2014)

**Records:** ERIC EJ1037529 and EJ1037996.  
**Type / role:** qualitative higher-education studies using dynamic geometry.  
**Supports:** geometric/dynamic representations can make preserved-direction meaning visible and reveal shifts in students' eigenvalue/eigenvector conceptions.  
**Design consequence:** S01 begins with transformation behaviour and proportional direction before determinant machinery; graphical/geometric representation is connected to algebra and later faded.  
**Limit:** technology-mediated qualitative contexts; not proof that one visualization sequence is universally superior.

### Domain-specific modelling / APOS: teaching eigenvalues/eigenvectors using models (2015)

**DOI:** 10.1016/j.jmathb.2015.06.005  
**Type / role:** Journal of Mathematical Behavior classroom/case-study comparator.  
**Supports:** modelling activities were used to let eigenvalue/eigenvector ideas emerge from previously learned concepts before formal definitions; the paper also summarizes prior difficulties manipulating the definitions.  
**Design consequence:** use one meaningful repeated-transformation problem as motivation, but keep fixed assessments original and mathematically explicit.  
**Limit:** one course / small deep-analysis sample; “promising” is not generalized into a universal causal claim.

## 5. Pedagogy-Evidence Ledger

| Concept | Documented / design difficulty | Context / evidence | Likely false model | Representation / contrast | Sequencing / assessment consequence |
| --- | --- | --- | --- | --- | --- |
| eigenvector/eigenvalue meaning | literature reports predominantly analytic-arithmetic/procedural reasoning; dynamic studies expose geometric meaning | qualitative undergraduate studies | “eigenvector = vector found after solving determinant” | transformation of arrows / line through origin ↔ (Av=\lambda v) | S01 before characteristic polynomial; Main must verify/refute fresh directions |
| linear combinations of eigenvectors | Wawro et al. identify coefficient/eigenvalue conflation and independence assumptions | peer-reviewed task study | “any linear combination of eigenvectors is an eigenvector” or “eigenvectors must be independent” | same-eigenvalue eigenspace vs different-eigenvalue contrast | separate closure and independence tasks |
| repeated eigenvalues | mathematical + pedagogical risk | theorem structure + eigenspace research | “double root means two eigenvectors” | same characteristic polynomial, different eigenspace dimensions | explicit defective/diagonalizable pair with same eigenvalues |
| diagonalization | representation-change risk | standard course + prior T22 similarity ownership | “PDP^-1 is a trick” | basis of eigenvectors ↔ coordinate decoupling | derive AP=PD before formula; score basis justification |
| symmetric theorem | overgeneralization risk | theorem scope | “all eigenvectors are orthogonal” | arbitrary matrix vs verified symmetric matrix | task first checks (A^T=A); theorem use loses credit without hypothesis |
| complex eigenvalues | hidden-domain risk | standard eigentheory | “every real matrix has real eigenvectors” | planar rotation vs stretch | bounded bridge before first nonreal example; no general complex LA |
| dominant mode | modelling shortcut risk | mathematical consequence | “largest |lambda| controls every trajectory” | same A, different initial states with zero/nonzero dominant coefficient | Transfer must change initial condition and require caveat |

## 6. Concept Dependency Graph

`M14 linear map + M13 span`
→ invariant one-dimensional direction
→ (Av=\lambda v)
→ ((A-\lambda I)v=0)
→ singularity / characteristic equation
→ eigenvalues + eigenspaces
→ eigenspace closure + distinct-eigenvalue independence
→ repeated roots / algebraic vs geometric multiplicity
→ eigenbasis criterion
→ diagonalization (A=PDP^{-1})
→ powers / repeated action
→ defective diagnosis
→ similarity invariants
→ bounded complex pair / rotation contrast
→ symmetric self-adjoint identity
→ real eigenvalues + orthogonal distinct eigenspaces
→ finite real spectral theorem / (A=QDQ^T)
→ discrete modal dynamics / synthesis.

Prior-owned: determinant/singularity, basis/rank/similarity, orthonormal bases/Gram–Schmidt.  
M16-owned: every eigenstructure arrow above.  
Local support: minimal complex arithmetic + FTA statement.  
Future-owned: PSD/SVD/numerics/ODE/Markov/PCA consequences.

## 7. Conceptual-Distinction Map

1. invariant direction vs fixed vector;
2. nonzero eigenvector vs eigenspace (which also contains zero);
3. eigenvalue vs eigenvector vs eigenspace;
4. characteristic-polynomial root multiplicity vs eigenspace dimension;
5. repeated eigenvalue vs repeated/independent eigenvectors;
6. necessary vs sufficient conditions for diagonalizability;
7. diagonal matrix vs diagonalizable matrix;
8. diagonalization vs orthogonal diagonalization;
9. arbitrary similarity vs eigenvector-basis similarity;
10. eigenvalues preserved under similarity vs coordinate entries of eigenvectors changing;
11. real matrix vs real eigenvalues;
12. complex eigenpair language vs general complex inner-product theory;
13. symmetric matrix hypothesis vs arbitrary square matrix;
14. distinct-eigenvalue orthogonality vs arbitrary eigenvector orthogonality;
15. largest-magnitude eigenvalue vs actually excited mode of a given initial condition.

## 8. Misconception / Failure-Mode Map

- **Empirically documented:** coefficient/eigenvalue conflation in linear combinations; assumption that eigenvectors must be independent; eigenspace-dimension difficulty; procedural symbolic dominance over geometric meaning.
- **Theoretically plausible / standard-course risk:** zero vector called an eigenvector; determinant equation used without singular-system derivation; double root assumed to yield two directions; singular (P) still used in diagonalization; eigenvectors of arbitrary matrices assumed orthogonal; all real matrices assumed to have real eigenvectors; dominant eigenvalue invoked despite zero modal coefficient.
- **Repository-specific risks:** silently consuming M15 while graph names only M14; importing M17 PSD/SVD because Strang places them nearby; importing M20 differential-equation applications; importing M23 power/QR iteration; reusing legacy seven-arc count as final architecture.

Each fixed assessment must target at least one declared failure mode without exposing its answer in the preceding worked instance.

## 9. Representation Progression Map

| Representation | Introduced | Connected to | Fade / reuse | Independent evidence |
| --- | --- | --- | --- | --- |
| geometric arrow / invariant line | S01 | scalar proportionality (Av=\lambda v) | visual scaffold reduced after S03 | S01 Main/Transfer; later dynamics |
| matrix-vector equation | S01 | nullspace equation | permanent | every computational task |
| nullspace/eigenspace | S02 | subspace/basis language | permanent | S02 onward |
| characteristic polynomial | S03 | singularity + roots | computational scaffold later shortened | multiplicity / diagonalization tasks |
| eigenspace dimension table | S05–S06 | algebraic/geometric multiplicity | reused in defect diagnosis | S06/S09 |
| eigenbasis coordinate picture | S07 | similarity / (PDP^{-1}) | permanent | S08/S10/S15 |
| modal powers | S08 | scalar (\lambda^k) sequences | reused in synthesis | S08/S15/S16 |
| complex plane / rotation sketch | S11 | conjugate pair / no real direction | bounded; not general complex LA | S11 Transfer |
| orthogonal eigenbasis | S12–S13 | M15 ON coordinates + symmetry | reused by M17 | S13/S16 |
| spectral decomposition (QDQ^T) | S13 | symmetric geometry | reused downstream | S13/S16 |

## 10. Downstream Obligation Map

- **M17:** must be able to invoke a proved/owned real spectral theorem and orthogonal diagonalization immediately; M16 therefore cannot leave symmetry as a slogan.
- **M20:** must be able to reuse diagonalizable mode decomposition and bounded complex-pair intuition; M16 teaches discrete powers, not (e^{At}).
- **M23:** must receive a clear exact mathematical eigenproblem so numerical approximation has a target; no numerical-stability claims here.
- **M41:** must receive eigen-directions/eigenvalues and repeated-eigenvalue nonuniqueness; PCA objective and estimated covariance remain later.
- **M48/M49:** may reuse finite repeated-map spectral language; probability/state-estimation theory remains theirs.

## 11. Narrative Spine

**Question 1:** Are there directions a linear transformation does not turn away from themselves?  
**Question 2:** How can we find all such directions systematically?  
**Question 3:** What changes when an eigenvalue repeats?  
**Question 4:** When do these special directions form an entire coordinate system?  
**Question 5:** What exactly fails when they do not?  
**Question 6:** Which parts of eigenstructure belong to the operator rather than a chosen coordinate system?  
**Question 7:** What happens when a real transformation has no real invariant direction?  
**Question 8:** Why are real symmetric matrices radically better behaved?  
**Question 9:** How does spectral structure explain repeated discrete evolution?

The route deliberately delays the determinant recipe until invariant-direction meaning exists, and delays the spectral theorem until multiplicity/diagonalization failure modes are understood.

## 12. Candidate Pedagogical Atoms

A01 invariant one-dimensional directions and eigenpair meaning  
A02 eigenspace as kernel / subspace  
A03 characteristic equation from singularity; exact low-degree computation  
A04 structural checks: triangular cases, trace/determinant as checks rather than definitions  
A05 eigenspace closure and independence across distinct eigenvalues  
A06 algebraic vs geometric multiplicity  
A07 eigenbasis and diagonalizability criteria  
A08 construct (P,D); powers and repeated action  
A09 defective matrices and why ordinary eigen-coordinates fail  
A10 similarity invariance and coordinate-change interpretation  
A11 bounded complex eigenvalues/conjugate pairs/rotation contrast  
A12 real symmetric matrices: self-adjoint identity, real spectrum, orthogonality  
A13 finite real spectral theorem and orthogonal diagonalization  
A14 discrete modal dynamics / initial-condition dependence  
A15 integrated method-choice / theorem-hypothesis synthesis

## 13. Split / Merge Justification

- A01 and A02 are separated because the first is conceptual/geometric while the second changes representation to kernels/subspaces.
- A03 owns the determinant/polynomial computation route; A04 is merged into the same neighbourhood only if pilot evidence shows trace/determinant checks do not create a distinct decision capability.
- A05 and A06 remain separate: “vectors from different eigenvalues are independent” and “repeated root does not imply repeated directions” are different misconceptions and require different evidence.
- A07 and A08 remain separate: deciding whether an eigenbasis exists precedes constructing/using a diagonalization.
- A09 is separate because failure/defectiveness must be learned as a positive diagnostic capability, not a footnote after success cases.
- A10 is separate because similarity is inherited from M14 and needs explicit reconciliation with eigenstructure.
- A11 is a bounded bridge with a domain change from real to minimal complex language; it should not be buried inside another session.
- A12 and A13 are separated: local symmetry consequences precede the global spectral theorem / orthogonal diagonalization.
- A14 and A15 are separated because dynamics is an application of the module while final synthesis must force method/hypothesis choice across arbitrary/symmetric/defective/nonreal cases.

## 14. Candidate Session Architecture

Current justified candidate: **16 sessions**. This count is derived from the atom/dependency split above, not copied from M15 or the legacy seven arcs.

1. **S01 — Directions a matrix does not turn**: invariant lines, (Av=\lambda v), fixed vs scaled direction.
2. **S02 — Eigenspaces are kernels**: ((A-\lambda I)v=0), eigenspace basis and zero-vector distinction.
3. **S03 — Why the characteristic equation appears**: singularity → determinant zero → exact 2×2 / manageable 3×3 roots.
4. **S04 — Structural eigenvalue checks**: triangular/diagonal cases, trace/determinant only as consistency checks.
5. **S05 — Eigenspace algebra**: same-eigenvalue linear combinations; distinct-eigenvalue independence.
6. **S06 — Repeated roots are not repeated directions**: algebraic vs geometric multiplicity.
7. **S07 — When eigenvectors form a basis**: diagonalizable iff eigenbasis; distinct eigenvalues corollary.
8. **S08 — Build the diagonal coordinates**: (AP=PD), (A=PDP^{-1}), order discipline.
9. **S09 — Powers without brute force**: (A^k=PD^kP^{-1}), finite repeated action.
10. **S10 — Defective matrices and similarity**: diagnose failure; same operator in different coordinates; spectral invariants.
11. **S11 — Real matrix, nonreal modes**: minimal complex bridge, conjugate pairs, planar rotation/oscillation meaning.
12. **S12 — Symmetry changes the game**: (A^T=A), self-adjoint identity, real eigenvalues, orthogonality of distinct eigenspaces.
13. **S13 — Spectral theorem**: orthonormal eigenbasis and (A=QDQ^T), repeated eigenspace handling using M15.
14. **S14 — Spectral coordinates for discrete dynamics**: (x_k=A^k x_0), modal coefficients, growth/decay/sign alternation.
15. **S15 — Dominant modes with caveats**: initial-condition dependence, tied magnitudes, complex/defective limitations.
16. **S16 — Eigenstructure synthesis**: choose and defend the valid theorem/method on mixed unfamiliar matrices; explicit M17/M20/M23 boundary check.

### Representative pilot

**S01** is selected for the Gate-4–8 vertical slice because it introduces the central new object and tests the most important representation transition: geometric preserved direction ↔ exact proportionality equation. The pilot will not introduce the characteristic polynomial, so its independence can be audited before the computational recipe appears.

## 15. Gate status and next permitted work

- Gate 0: **PASS for build start**.
- Gate 1: **builder boundary candidate complete**, with one required dependency reconciliation: SIDE279 must explicitly consume SIDE278 before publication.
- Gate 2: **source-role stack covered for pre-authoring**, with source limitations/non-imports recorded.
- Gate 3 planning artifacts: **all twelve present at candidate granularity**.
- Representative vertical slice: **S01 passed builder-local Gates 4–8** in `docs/t22-course/M16-PILOT-REVIEW.md` after evidence-label/claim-scope repair. This is not independent acceptance.
- Next permitted work under v1.2: **author S02**, then require its own Gates 4–8 before S03.
- M17 remains closed.
