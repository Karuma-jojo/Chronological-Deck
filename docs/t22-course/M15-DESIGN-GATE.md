# T22 Elite M15 / SIDE278 — pre-authoring design gate

Status: **Gates 0–3 complete; BUILD authorized; M15 remains unpublished and outside the learner route.**  
Date: 2026-09-26  
Recovered authoritative base: `bcb86a1a6ee6ab141a884c819cde07f5e41491c5`.

This document applies the T22 Module Builder and Adversarial Checker v1.2 to **M15 · SIDE278 · Orthogonality, Projection & Least Squares Geometry**. It is a planning and pilot gate, not an acceptance record.

## 0. Recovery receipt

- Repository: `Karuma-jojo/Chronological-Deck`.
- Required branch: `codex/t22-pedagogical-rebuild`.
- At recovery the branch was 30 commits behind `main` and 0 ahead. It was fast-forwarded without force to the exact published-M14 main head `bcb86a1a6ee6ab141a884c819cde07f5e41491c5`.
- Published learner frontier: **M14 / SIDE276**.
- M15 canonical authoring pack did not exist at recovery. The legacy `js/data/t22-rich-module-6.js` is a topic inventory/comparator only, not accepted pedagogy or a session-count mandate.
- M15's semantic prerequisite row is `pending-boundary-audit`; roadmap remains planned; `course-meta.json` contains only M01–M14.
- Accepted predecessor: `course/t22/authoring/m14-side276.json`, 19 sessions / 38 fixed assessments / 60 ownership claims, independently accepted and published.
- Frozen out of scope for this assignment: M01–M14 learning semantics, M16+, T25, SMMC, legacy-progress migration, main merge and deployment.

## 1. Boundary Contract

**Destination.** The learner can work in finite-dimensional real Euclidean coordinate spaces and independently: construct and reason with orthogonal/orthonormal sets; use orthonormal coordinates; form orthogonal complements and unique orthogonal decompositions; derive and compute orthogonal projections and nearest points; construct orthonormal bases by Gram–Schmidt with dependence/order diagnostics; derive the transpose/column-orthogonality bridge needed for projection; derive and solve exact Euclidean least-squares problems; distinguish unique fitted vectors from possibly non-unique coefficients; and justify residual orthogonality and global optimality.

**Entry.** M14 / SIDE276 is the only declared direct prerequisite. Through accepted ancestry, M15 may reuse:
- M13 finite real vectors, linear combinations, span/subspaces, independence, bases/coordinates, dimension, Euclidean dot products/norms, Cauchy–Schwarz, triangle inequality, angles and basic vector orthogonality;
- M14 matrix-vector action, exact linear systems/elimination, column space, null space, rank/nullity, full-column-rank/invertibility logic and exact inverse construction;
- M03 counterexample/proof habits inherited through accepted prerequisites.

**Previous-module exit state.** M14 explicitly defers projection, Gram–Schmidt and least squares to M15. M14 does **not** teach matrix transpose as an owned capability; M15 therefore supplies the bounded transpose bridge before normal equations.

**New objects.**
- orthogonal and orthonormal lists/bases as developed computational objects;
- orthogonal complement `W^perp`;
- orthogonal direct decomposition `v=p+r`;
- orthogonal projection and residual;
- nearest-point characterization;
- Gram–Schmidt orthogonalization;
- matrix transpose `A^T` only to the depth required for Euclidean projection/least-squares geometry;
- orthogonal projector matrix;
- Euclidean least-squares objective and normal equations;
- fitted vector versus coefficient vector.

**Declared prerequisites.** Exactly `SIDE276`. No new formal dependency is added. M13 capabilities are transitive through the accepted route and are cited explicitly where consumed.

**Deferred topics / future ownership.**
- M16 / SIDE279: eigenvalues, eigenvectors, characteristic polynomial, eigenspaces, diagonalization, spectral theorem.
- M17 / SIDE280: quadratic forms/PSD, named QR factorization, Cholesky, SVD, Moore–Penrose pseudoinverse, rank-deficient canonical minimum-norm solutions.
- M23 / ARC585: floating-point conditioning, numerical rank, stable least-squares algorithms, modified Gram–Schmidt, Householder/Givens, numerical QR/SVD.
- M36 / ARC539: statistical regression assumptions, sampling, inference, leverage, diagnostics and research workflow.
- M62: ridge/lasso and regularized least squares.
- General complex/infinite-dimensional Hilbert-space projection theory is excluded.

**Forbidden future machinery.** No eigenvalue arguments, spectral theorem, PSD language as a premise, QR as a named factorization, SVD/pseudoinverse, numerical-conditioning claims, statistical-regression inference or regularization.

**Synthesis.** Given a small nonorthogonal model subspace and target vector, the learner must decide whether exact reachability holds, build an orthonormal basis if useful, compute the orthogonal projection/residual, recover least-squares coefficients when appropriate, audit uniqueness, and reject an invalid shortcut without importing future factorizations.

### Prerequisite audit

| Operation consumed | Earlier source / local bridge | First use | Decision |
| --- | --- | --- | --- |
| Dot product, norm, vector orthogonality | M13 S13–S17 accepted pack | S01 | Reuse; do not re-own elementary dot-product geometry. |
| Span, basis, independence, dimension | M13 S05–S12 | S01–S04 | Reuse explicitly. |
| Column space, null space, rank, full column rank | M14 S08–S13 | S10–S14 | Reuse exactly. |
| Exact linear-system solving/inverse | M14 S06–S14 | S11 onward | Reuse for small exact normal equations. |
| Orthogonal/orthonormal list consequences | Not previously developed | S01–S02 | Teach/prove locally. |
| Orthogonal complement | NONE as owned algorithmic capability | S03 | Define/prove locally. |
| Orthogonal decomposition | NONE | S04 | Prove locally in finite-dimensional real spaces. |
| Projection formula | NONE | S05–S06 | Derive from residual orthogonality. |
| Nearest-point theorem | NONE | S07 | Prove by Pythagorean decomposition. |
| Gram–Schmidt | NONE | S08–S09 | Derive from repeated projection subtraction. |
| Matrix transpose | M14 uses rows but does not own transpose | S10 | Bounded local bridge: definition, shape and column-dot identity. |
| `A^T A` invertible under full column rank | NONE | S11 | Prove from `x^T A^T A x=||Ax||^2` and M14 null-space/invertibility logic, without naming PSD. |
| Product-transpose and inverse-transpose identities | NONE | S12 | Supply/prove only as exact finite-matrix support facts needed to verify symmetry of an orthogonal projector. |
| Normal equations | NONE | S11/S13 | Derive from residual orthogonality, not memorize. |
| Rank-deficient least-squares coefficient nonuniqueness | M14 null space + M15 projection | S14 | Prove directly; pseudoinverse remains deferred. |

### Support-Theorem Ledger

| Support result | Why needed / first consumer | Hypotheses / object type | M15 treatment | Why no future ownership theft |
| --- | --- | --- | --- | --- |
| Nonzero pairwise-orthogonal vectors are linearly independent | S01 | finite real inner-product space | Prove by dotting a zero combination with each vector | M13 owns independence and orthogonality separately; M15 owns their interaction. |
| Orthonormal coefficient formula `v=sum <v,q_i>q_i` for an ON basis | S02 | finite-dimensional real space, complete ON basis | Derive from unique coordinates and orthonormality | Core M15 geometry. |
| Pythagorean identity for finite orthogonal sums | S02 onward | finite orthogonal list | Prove from dot-product expansion | Extends M13 pairwise geometry, no factorization. |
| `W^perp` is a subspace | S03 | subspace `W⊆R^n` | Prove from dot-product linearity | Core M15. |
| Orthogonality to a spanning set is equivalent to orthogonality to its span | S03 | finite span | Prove directly | Needed to make complement tests finite. |
| `R^n=W⊕W^perp` and `dim W^perp=n-dim W` | S04 | finite-dimensional real Euclidean space | Prove using an ON basis extended/constructed within the finite setting | No spectral theory. |
| Projection onto nonzero line `span(a)` has coefficient `(v·a)/(a·a)` | S05 | `a≠0` | Derive from residual orthogonality | Core M15. |
| Projection on ON basis is `sum (v·q_i)q_i` | S06 | ON basis of target subspace | Derive from S02/S04 | Core M15. |
| Orthogonal projection is the unique nearest point in a subspace | S07 | finite-dimensional subspace | Prove by Pythagoras | Core M15 minimization geometry. |
| Gram–Schmidt preserves each prefix span and zero residual signals dependence | S08–S09 | finite ordered list | Prove inductively/directly | QR naming/factorization deferred to M17. |
| `(A^T y)_j=a_j·y` for columns `a_j` | S10 | real `m×n` matrix | Prove from transpose/matrix-vector definitions | Tiny bridge; no adjoint/operator theory. |
| `A^T A` is invertible when A has full column rank | S11 | real full-column-rank A | If `A^TAx=0`, dot with x to get `||Ax||^2=0`, then M14 kernel logic | Avoids PSD ownership. |
| `P=A(A^TA)^{-1}A^T` is symmetric and idempotent for full-column-rank A | S12 | real full-column-rank A | Algebraic proof with bounded transpose identities | Orthogonal projector structure is M15; QR/SVD not used. |
| Symmetric idempotent P is an orthogonal projector onto its range | S12 | real square matrix | Prove residual is orthogonal to `Range(P)` | No eigenvalue/spectral proof. |
| Least squares `min ||Ax-b||^2` equals projection of b onto `Col(A)` | S13 | finite real matrix A | Prove by identifying attainable vectors as Col(A) and invoking nearest point | Core M15. |
| Least-squares fitted vector is unique; coefficient minimizer is unique iff `N(A)={0}` | S14 | finite real A | Prove by projection uniqueness and M14 null-space description | Pseudoinverse/minimum-norm selection deferred. |

## 2. Source Dossier

### Repository / curriculum authority
**Source:** current T22 repository at recovered head.  
**Role:** curriculum authority.  
**Inspected:** M65 skeleton/dependencies, semantic ledger, accepted M13/M14 packs and handoffs, legacy SIDE278/SIDE279/SIDE280 inventories.  
**Supports:** exact ownership, direct prerequisite, downstream boundaries and publication stop.  
**Not imported:** legacy four-arc count, old acceptance assumptions or later-factorization content.

### Gilbert Strang, Introduction to Linear Algebra, 4th ed. — user-supplied scan
**Type:** deep first-course textbook comparator.  
**Inspected:** Chapter 4 §§4.1–4.4: orthogonality of subspaces, projections, least-squares approximations, orthogonal bases and Gram–Schmidt.  
**Supports:** geometry-first sequence; residual orthogonality; projection as closest point; normal equations as a consequence of projection; Gram–Schmidt as repeated removal of explained components.  
**Limit:** Strang naturally continues Gram–Schmidt to QR and treats four-subspace orthogonality more broadly than M15 needs.  
**Deliberate non-import:** named QR factorization, SVD/pseudoinverse, numerical algorithms and exercises/problem instances.

### MIT OpenCourseWare 18.06 / 18.06SC
**Type:** canonical university route comparator.  
**Inspected:** Unit II sessions “Orthogonal Vectors and Subspaces,” “Projections onto Subspaces,” “Projection Matrices and Least Squares,” and “Orthogonal Matrices and Gram-Schmidt”; resource index/readings.  
**Supports:** conventional progression and expected first-course problem types; confirms projection/least-squares/Gram–Schmidt cluster.  
**Deliberate non-import:** MIT’s same-session QR continuation and broader four-subspaces route do not override T22 ownership.

### Sheldon Axler, Linear Algebra Done Right, 4th ed., official open-access PDF
**Type:** rigorous theorem/hypothesis source.  
**Inspected:** Ch.6 §§6A–6C, especially orthonormal bases/coordinate formula, Gram–Schmidt 6.32, orthogonal complements 6.48–6.52 and finite-dimensional minimization/projection results.  
**Supports:** exact finite-dimensional hypotheses, proof architecture for ON coordinates, orthogonal decomposition and Gram–Schmidt span preservation.  
**Deliberate non-import:** general complex inner-product conventions, Riesz machinery, pseudoinverse in §6C, adjoints/spectral theory and QR/Cholesky in Ch.7.

### Jim Hefferon, Linear Algebra, official open textbook
**Type:** broad coverage / developmental comparator.  
**Inspected:** developmental treatment around Chapter Three, Section VI, including orthogonal projection and “Gram-Schmidt Orthogonalization”; public companion materials confirm the section structure and worked-step style.  
**Supports:** motivation-before-abstraction, explicit computational examples, and treating Gram–Schmidt as projection subtraction rather than a memorized recipe.  
**Limit:** full course lists calculus as a prerequisite; M15 uses no calculus-dependent material.

### MAA Instructional Practices Guide
**Type:** undergraduate mathematics pedagogy baseline.  
**Inspected:** design and assessment practices, especially alignment of learning outcomes with assessments and use of multiple meaningful measures.  
**Supports:** public tasks must measure the mathematical actions worth learning, not merely easily graded arithmetic; comparison/explanation tasks are legitimate evidence.  
**Limit:** general undergraduate guidance, not an M15 efficacy study.

### IES / WWC — Organizing Instruction and Study to Improve Student Learning
**Type:** general learning evidence.  
**Inspected:** recommendations 2–4 and 7. Recommendations 2–4 are rated Moderate Evidence in the guide; the guide spans K–postsecondary contexts.  
**Supports:** worked-example/problem alternation, graphics plus verbal explanation, abstract/concrete representation links, deep explanatory questions.  
**Limit:** heterogeneous populations; used cautiously, not as direct experimental validation of T22.

### Dorier (ed.), On the Teaching of Linear Algebra (2000), especially Hillel and Sierpinska
**Type:** domain-specific linear-algebra education synthesis.  
**Inspected:** Hillel “Modes of Description and the Problem of Representation in Linear Algebra” and Sierpinska on student thinking.  
**Supports:** movement among geometric, algebraic, matrix and abstract modes is not automatic; proof/quantifier/necessary-sufficient distinctions deserve explicit tasks.  
**Limit:** historical synthesis and varied populations; used as design evidence, not outcome prediction.

### Caglayan (2018), Journal of Mathematical Behavior 52, on visual/analytic coordination in inner-product-space work
**Type:** domain-specific qualitative study.  
**Inspected:** abstract/highlights and discussion of coordinating visual and analytic representations for orthogonality, orthonormal bases and inner-product ideas.  
**Supports:** M15 deliberately reconnects geometric residual pictures to symbolic dot-product/matrix conditions.  
**Limit:** specific university math-major/technology-assisted context and polynomial inner-product setting; no frequency generalization.

### Inquiry-based linear-algebra orthogonal-projection lesson literature
**Type:** domain-specific pedagogy comparator.  
**Inspected:** published abstract describing a college linear-algebra lesson using image-processing motivation for orthogonal projection.  
**Supports:** projection benefits from a concrete approximation/decomposition question before formula introduction.  
**Limit:** abstract-level inspection; no claim about effect size or universal superiority.

## Pedagogy-Evidence Ledger

| Concept | Documented/credible difficulty | Evidence level / context | False mental model to attack | Design consequence |
| --- | --- | --- | --- | --- |
| Orthogonal vs orthonormal | Procedural confusion is a standard first-course risk; Axler/Strang sharply distinguish norm-1 from perpendicularity | textbook + plausible prior-T22 risk | “orthogonal already means unit length” | S01 forces normalization and a counterexample. |
| Multiple representations | Hillel/Dorier: switching geometric/algebraic/matrix modes is nontrivial | research synthesis | “a picture/formula automatically transfers to another register” | Same decomposition appears as geometry, dot products, columns and `A^T r=0`. |
| Projection formula | Strang/MIT motivate from orthogonal residual; inquiry lesson literature uses concrete application | course/textbook + pedagogy comparator | “projection is a memorized scalar formula” | S05 derives the coefficient from the defining residual condition before formula use. |
| Nonorthogonal basis | Standard source treatments distinguish ON coefficient formula from general-basis solve | mathematical/design risk | “use `v·a_i` as coefficients for any basis” | S06/S11 contrast ON and nonorthogonal columns and score hypothesis recognition. |
| Nearest point | Source proofs use Pythagorean decomposition | theorem-scope issue | “orthogonal residual is merely a nice picture, not optimality” | S07 proves and independently uses the global nearest-point identity. |
| Gram–Schmidt | Hefferon/Axler emphasize repeated projection subtraction and span preservation | textbook/developmental | “subtract one component and you are done” or “zero residual is a numerical accident” | S08–S09 include missing-component and dependence wrong-solvers. |
| Transpose/normal equations | M14 did not teach transpose; MIT/Strang assume it earlier | repository-specific prerequisite gap | “`A^T r=0` is a formula to memorize” | S10 locally derives transpose/column-dot meaning before S11. |
| Least squares | Literature on curve-fitting presentations distinguishes black-box formulas from projection derivations | textbook-analysis comparator | “least squares makes `Ax=b` exact” | S13 starts from unattainable b and keeps residual nonzero but orthogonal. |
| Rank deficiency | M14 null-space capability plus later pseudoinverse boundary | repository/downstream risk | “singular `A^TA` means least squares does not exist” or “fit uniqueness = coefficient uniqueness” | S14 gives a rank-deficient fit with many coefficients and one fitted vector. |

## 3. Pre-authoring maps

### Concept dependency graph

`M13 dot product + M14 subspaces/rank`
→ orthogonal vs orthonormal lists
→ ON coordinates/Pythagorean decomposition
→ orthogonal complement
→ unique orthogonal decomposition
→ line projection
→ ON-subspace projection
→ nearest-point theorem
→ Gram–Schmidt construction
→ transpose/column-dot bridge
→ general-column projection / normal equations
→ projector matrix structure
→ least-squares objective/global minimality
→ coefficient/fitted-value uniqueness
→ deterministic fitting
→ synthesis/method choice.

No node depends on eigenstructure, QR, SVD, pseudoinverse, conditioning or statistical inference.

### Conceptual-distinction map

1. vector orthogonality vs orthogonal set vs orthonormal set;
2. basis coordinates in an arbitrary basis vs dot-product coefficients in an ON basis;
3. `W` vs `W^perp`;
4. direct-sum decomposition vs an arbitrary vector split;
5. projection **definition/characterization** vs a coordinate formula;
6. projected vector vs scalar coefficient;
7. orthogonal residual vs zero residual;
8. nearest attainable vector vs exact solution;
9. Gram–Schmidt orthogonalization vs normalization;
10. span preservation vs preserving the original vectors;
11. transpose as re-indexed matrix / column-dot operator vs inverse;
12. full-column-rank normal-equation inverse vs rank-deficient case;
13. idempotent projection vs **orthogonal** projection (symmetry matters);
14. fitted vector uniqueness vs coefficient uniqueness;
15. deterministic least squares vs statistical regression.

### Misconception / failure-mode map

| Failure mode | Evidence tag | Required discriminator |
| --- | --- | --- |
| Orthogonal means orthonormal | T/R | Nonunit perpendicular pair; learner must normalize. |
| Pairwise orthogonal list may contain 0 and still prove independence | T | Zero-vector boundary case. |
| Dot-product coefficients work for any basis | T/R | Nonorthogonal basis counterexample. |
| `W^perp` lives in a different ambient space | R | Explicit `W,W^perp⊂R^n` typing. |
| Any decomposition `v=p+r` is an orthogonal decomposition | T | Require `p∈W,r∈W^perp` and uniqueness. |
| Projection is “drop a coordinate” in all subspaces | T | Oblique line/subspace not aligned with axes. |
| Orthogonal residual does not imply nearest point | T | Pythagorean distance comparison. |
| Gram–Schmidt subtracts only the immediately previous vector | T/R | Three-vector case with nonzero earlier components. |
| Zero Gram–Schmidt residual is a divide-by-zero nuisance | T | Dependent input; explain structural meaning. |
| Gram–Schmidt output is order-independent | T | Reordered input produces a different ON basis. |
| Transpose is an inverse / shape unchanged | R | Rectangular `A`; derive shape and column-dot identity. |
| `A^T r=0` means r=0 | T | Nonzero residual orthogonal to a proper column space. |
| `(A^TA)^{-1}` may be used without full column rank | T/R | Rank-deficient counterexample. |
| Idempotent alone means orthogonal projector | T | `[[1,1],[0,0]]` is idempotent but nonsymmetric. |
| Least squares forces exact equality `Ax=b` | T | Inconsistent system with nonzero optimum residual. |
| Least-squares solution never exists when columns are dependent | T | Rank-deficient example with many coefficient minimizers. |
| Unique fitted vector implies unique coefficients | T/R | Same fitted vector from coefficients differing by a null vector. |
| Deterministic line fit justifies statistical inference | R | Explicit out-of-scope statement and rubric boundary. |

Tags: T = theorem/textbook-supported risk, R = repository-specific risk. No population frequency is claimed.

### Representation progression map

| Representation / learner action | Introduction → connection → reuse | Independent evidence |
| --- | --- | --- |
| vector arrows/right-angle geometry | M13 → S01/S05 → residual geometry S07 | S05–S07 |
| ON coordinate table / coefficient list | S02 → subspace projection S06 → Gram–Schmidt S08–S09 | S02/S06/S09 |
| `W^perp` constraints | S03 → decomposition S04 → residual spaces S06/S07 | S03/S04 |
| decomposition `v=p+r` | S04 → projection S05–S07 → least squares S13 | S04/S07/S13 |
| ordered vector list under Gram–Schmidt | S08 → S09 dependence/order | S08/S09 |
| rectangular matrix and transpose | S10 → `A^Tr=0` S11/S13 | S10/S11 |
| Gram matrix `A^TA` | S11 → projector S12 → least squares S13 | S11–S13 |
| projector matrix P and I−P | S12 → residual operator checks | S12 Transfer |
| attainable column-space fit | S11 → least squares S13 → rank-deficient coefficients S14 | S13/S14 |
| data table ↔ design matrix | S15 | S15 Main/Transfer |
| unlabeled method-choice problem | S16 | S16 Main/Transfer |

### Downstream obligation map

| Later owner | M15 exit capability required | Keep for later |
| --- | --- | --- |
| M17 SIDE280 | ON bases, projection geometry, least-squares residuals, Gram–Schmidt concept | named QR factorization, Cholesky, SVD, pseudoinverse |
| M23 ARC585 | exact geometry to compare with numerical algorithms | conditioning, stable QR/Householder/MGS, numerical rank |
| M36 ARC539 | least-squares geometry, fitted values/residuals, rank warnings | statistical assumptions, inference, leverage/diagnostics |
| M41 ARC541 | projection/residual geometry and orthonormal coordinates | covariance PCA and data-analysis interpretation |
| M51+ optimization | nearest-point/minimization intuition | general gradient/KKT optimization machinery |

M16 SIDE279 branches directly from M14 rather than M15; M15 must not require eigenstructure.

### Narrative spine

The module asks one question repeatedly: **when a target is not already one of our model directions, what does “closest explainable part” mean and how can we compute it without lying about what is exact?**

The route begins by making orthonormal directions computationally valuable, builds the complementary-space decomposition that makes an orthogonal residual meaningful, derives projection and its nearest-point property, then learns to manufacture orthonormal coordinates by Gram–Schmidt. Only after that geometry is secure does the matrix transpose appear as a compact way to say “residual orthogonal to every model column.” Normal equations and least squares then become consequences of the geometry, not magic formulas. The final sessions separate fitted-vector uniqueness from coefficient uniqueness and transfer the machinery to deterministic fitting without stealing statistical regression.

### Candidate pedagogical atoms and split/merge decisions

| Session | Central atom | Why separate / why merged |
| --- | --- | --- |
| S01 | Orthogonal vs orthonormal sets; normalization; independence | Foundational distinction before coordinate formulas. |
| S02 | Orthonormal coordinates and finite Pythagorean/Parseval identity | Coefficient extraction is a distinct computational payoff. |
| S03 | Orthogonal complements | New subspace construction and ambient-space typing. |
| S04 | Unique orthogonal decomposition | Structural theorem needed before defining projection as a component. |
| S05 | Projection onto a line | Smallest nontrivial derivation; isolates scalar coefficient meaning. |
| S06 | Projection onto a subspace with an ON basis | Generalizes line projection without matrix normal equations. |
| S07 | Nearest-point theorem | Optimality proof is conceptually distinct from computation. |
| S08 | Gram–Schmidt as repeated projection subtraction | Introduces algorithmic idea on two vectors. |
| S09 | Multi-vector Gram–Schmidt; span/dependence/order diagnostics | Needs its own cognitive load and failure cases. |
| S10 | Transpose bridge and column-wise orthogonality | Repository prerequisite gap; must precede normal equations. |
| S11 | Projection from general full-rank columns; normal equations | Connects geometry to nonorthogonal matrix representation. |
| S12 | Orthogonal projector matrices | Structural properties/idempotent-vs-orthogonal contrast warrant separate evidence. |
| S13 | Least squares as projection / global minimization | Formalizes objective and inconsistent-system meaning. |
| S14 | Rank-deficient least squares and uniqueness distinctions | Cannot be hidden in S13 because it reverses the inverse shortcut. |
| S15 | Deterministic line/calibration fitting | Representation change from vectors to a data/design table. |
| S16 | Synthesis and method choice | No new theorem; learner must organize the route. |

**Sizing decision: KEEP 16.** Fewer than 16 merges either transpose with normal equations before its meaning is secure, hides nearest-point proof inside formula practice, or compresses rank-deficient uniqueness into a footnote. More than 16 would mostly split single formulas from the conceptual decisions they justify. The count is design-derived, not inherited from M14 or the four legacy arcs.

### Candidate session architecture

1. Orthogonal is not orthonormal.
2. Orthonormal coordinates make geometry auditable.
3. Orthogonal complements.
4. Every vector splits into model part plus perpendicular part.
5. Projection onto one direction.
6. Projection onto an orthonormal subspace.
7. Why projection is the unique nearest point.
8. Gram–Schmidt: remove what earlier directions already explain.
9. Gram–Schmidt at full depth: span, dependence and order.
10. Transpose as the column-orthogonality bridge.
11. General-column projection and the normal equations.
12. Orthogonal projector matrices: symmetry + idempotence.
13. Least squares: best attainable answer to an inconsistent system.
14. Rank-deficient least squares: one fit, many coefficients.
15. Deterministic line/calibration fitting.
16. Synthesis: choose the geometry, not a memorized formula.

### Pilot choice

**S11 — General-column projection and the normal equations** is the representative pilot. It contains a genuinely new bridge (`A^T` meaning already taught in S10), a nontrivial derivation, a rank hypothesis, an exact calculation, a changed-surface audit task and a direct route into least squares. It is high-risk enough that a weak authoring pattern should surface before the remaining assessments are multiplied.

Gate 4–8 pilot evidence is recorded separately in `M15-PILOT-REVIEW.md`.

## Gate-3 receipt

- All twelve pre-authoring artifacts are present.
- Every material prerequisite has an earlier owner or scheduled M15 bridge.
- Transpose is explicitly repaired as a local semantic bridge rather than silently assumed from M14.
- Strang/Axler/Hefferon remain the deep source stack, with MIT as route comparator and pedagogy/math-ed sources in distinct epistemic roles.
- QR, eigenstructure, SVD/pseudoinverse, numerical conditioning and statistical regression remain deferred in substance.
- Session count was chosen only after dependency/distinction/misconception/representation/sizing passes.
- Next action: build and falsify S11 pilot through Gates 4–8 before bulk authoring.
