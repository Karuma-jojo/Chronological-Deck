# T22 Elite M15 / SIDE278 — pre-authoring design gate

Status: **Gates 0–3 revalidated after recovery cleanup; the existing S01–S16 draft is being re-audited sequentially through Gates 4–8. M15 remains unpublished and outside the learner route.**  
Date: 2026-09-26  
Recovered authoritative base: `bcb86a1a6ee6ab141a884c819cde07f5e41491c5`.

This document applies the T22 Module Builder and Adversarial Checker v1.2 to **M15 · SIDE278 · Orthogonality, Projection & Least Squares Geometry**. It is a planning and pilot gate, not an acceptance record. Recovery note: an earlier stalled run scaled the draft after the pilot before completing the required sequential Gate-4–8 checks. The authored material is therefore treated as an existing draft under repair, not as evidence that those gates passed.

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
| Orthogonal decomposition | NONE | S04/S09 | S04 proves uniqueness and constructs ON-basis-accessible cases; S09 closes general finite-dimensional existence after Gram–Schmidt can produce an ON basis. |
| Projection formula | NONE | S05–S06 | Derive from residual orthogonality. |
| Nearest-point theorem | NONE | S07 | Prove by Pythagorean decomposition. |
| Gram–Schmidt | NONE | S08–S09 | Derive from repeated projection subtraction. |
| Matrix transpose | M14 uses rows but does not own transpose | S10 | Bounded local bridge: definition, shape and column-dot identity; then combine with M14 rank–nullity to obtain `dim W^perp=n-dim W`. |
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
| `R^n=W⊕W^perp` (existence + uniqueness) | S04 uniqueness; general existence closes S09 | finite-dimensional real Euclidean space | S04 proves `W∩W^perp={0}` and constructs the split when an ON basis is available; S09 uses Gram–Schmidt on an arbitrary finite basis of W to close general existence | No spectral theory; dependency order is explicit. |
| `dim W^perp=n-dim W` | S10 | finite-dimensional `W⊆R^n` with ON basis matrix Q | Use S10 `W^perp=Null(Q^T)`, independence of the ON rows of `Q^T`, and M14 rank–nullity | No eigenvalue/spectral argument. |
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

Access/recheck date for public web sources: **27 September 2026**. The user-supplied Strang scan was inspected locally from the uploaded 571-page PDF; Chapter 4 was rendered page-by-page for visual verification before using it as a design source.

### Repository / curriculum authority
**Source:** current T22 repository on `codex/t22-pedagogical-rebuild`, recovered from published-M14 base `bcb86a1a6ee6ab141a884c819cde07f5e41491c5`.  
**Type / epistemic role:** repository contract; curriculum authority.  
**Specific material inspected:** `M65-SKELETON.md`, `m65.dependencies.json`, `SEMANTIC-PREREQUISITES.json`, accepted M13/M14 canonical packs and M14 review/verification handoffs, legacy SIDE278/SIDE279/SIDE280 inventories.  
**Supports:** exact M15 boundary, direct prerequisite, previous exit state, downstream ownership and publication stop.  
**Limit / deliberately not imported:** the legacy four-arc SIDE278 shape is only a topic inventory; it does not dictate pedagogy, session count or acceptance.

### Gilbert Strang, *Introduction to Linear Algebra*, 4th ed. — user-supplied scan
**Type / epistemic role:** user-supplied deep first-course textbook comparator.  
**Specific material inspected:** Chapter 4 **Orthogonality** in the supplied scan: §4.1 *Orthogonality of the Four Subspaces* pp.196–206, §4.2 *Projections* pp.207–218, §4.3 *Least Squares Approximations* pp.219–230, §4.4 *Orthogonal Bases and Gram-Schmidt* pp.231–244 (PDF pages 199–246 in the supplied file).  
**Supports:** complement/decomposition geometry; line/subspace projection from perpendicular residuals; projection as nearest attainable point; least squares as projection onto the column space; normal equations from residual orthogonality; Gram–Schmidt as repeated projection subtraction.  
**Limit / deliberately not imported:** Strang also develops the four-subspace picture broadly and continues Gram–Schmidt into `A=QR`. T22 keeps named QR in M17; no Strang exercise or solved instance is copied into fixed T22 tasks.

### MIT OpenCourseWare 18.06, Spring 2010
**URL / locator:** MIT OCW 18.06 syllabus/readings/video lectures; readings sessions **14–17**: Orthogonality (4.1), Projections and subspaces (4.2), Least squares approximations (4.3), Gram–Schmidt and `A=QR` (4.4).  
**Type / epistemic role:** canonical university-course route comparator.  
**Supports:** conventional conceptual cluster, prerequisite expectations, standard problem types and the progression orthogonality → projection → least squares → Gram–Schmidt.  
**Limit / deliberately not imported:** MIT's same-session QR continuation and broader course ownership do not override T22; QR remains M17.

### Sheldon Axler, *Linear Algebra Done Right*, 4th ed.
**URL / locator:** official open-access edition at `linear.axler.net`; Chapter 6 **Inner Product Spaces**, especially §6B *Orthonormal Bases* (Gram–Schmidt result 6.32 and examples) and §6C *Orthogonal Complements and Minimization Problems*.  
**Type / epistemic role:** rigorous theorem / hypothesis source.  
**Supports:** exact finite-dimensional hypotheses; orthonormal-coordinate reasoning; Gram–Schmidt span preservation; orthogonal complement/decomposition and finite-dimensional minimization.  
**Limit / deliberately not imported:** general complex inner-product conventions, Riesz/adjoint/spectral machinery, pseudoinverse and Chapter-7 factorizations. M15 stays finite, real and Euclidean.

### Jim Hefferon, *Linear Algebra*
**URL / locator:** official free text at `hefferon.net/linearalgebra/`; Chapter Three, Section VI **Projection**: Three.VI.1 *Orthogonal Projection Into a Line*, Three.VI.2 *Gram-Schmidt Orthogonalization*, Three.VI.3 *Projection Into a Subspace*, followed by the *Line of Best Fit* topic.  
**Type / epistemic role:** broad coverage / notation and developmental comparator.  
**Supports:** first-course motivation, explicit computations, line→Gram–Schmidt→subspace projection development and projection subtraction as a construction rather than a memorized recipe.  
**Population/context limit:** textbook, not empirical pedagogy. The full text lists one semester of calculus as a course prerequisite; no calculus-dependent content is imported into M15.

### Mathematical Association of America, *Instructional Practices Guide*
**URL / locator:** MAA open-access guide, 2018 edition, `maa.org/.../InstructPracGuide_web.pdf`.  
**Type / epistemic role:** required undergraduate-mathematics pedagogy baseline.  
**Supports:** alignment of learning outcomes with public assessment; student-produced reasoning, comparison and multiple meaningful forms of evidence.  
**Limit:** practice guidance, not direct experimental evidence that M15 works for this learner.

### IES / What Works Clearinghouse, *Organizing Instruction and Study to Improve Student Learning*
**URL / locator:** WWC Practice Guide, released September 2007. Recommendations **2–4** (worked examples/problems, graphics+verbal, abstract+concrete) are rated **Moderate Evidence**; recommendation **7** (deep explanatory questions) is rated **Strong Evidence** on the WWC page.  
**Type / epistemic role:** general learning-evidence comparator.  
**Population/context:** guide spans K–postsecondary and multiple content domains.  
**Supports:** worked-example/problem alternation, explicit representation links and explanatory prompts.  
**Limit:** heterogeneous evidence base; these recommendations are not presented as direct experimental validation for an adult T22 learner.

### Jean-Luc Dorier (ed.), *On the Teaching of Linear Algebra* (2000)
**URL / locator:** Springer Mathematics Education Library 23, DOI `10.1007/0-306-47224-4`; Joel Hillel, *Modes of Description and the Problem of Representation in Linear Algebra*, pp.191–207; Anna Sierpinska, *On Some Aspects of Students' Thinking in Linear Algebra*, pp.209–246.  
**Type / epistemic role:** domain-specific mathematics-education research synthesis.  
**Population/context:** multiple tertiary linear-algebra teaching/research settings summarized in the volume.  
**Supports:** movement among geometric, algebraic and abstract/representation modes is not automatic; definitions and representation changes deserve explicit coordination and assessment.  
**Limit:** historical synthesis across varied populations; no frequency claim is generalized to this learner.

### Günhan Caglayan, *Coordinating analytic and visual approaches...*, Journal of Mathematical Behavior 52 (2018), 37–60
**DOI:** `10.1016/j.jmathb.2018.03.006`.  
**Type / epistemic role:** domain-specific qualitative math-education study.  
**Population/context:** university mathematics majors in the United States, technology-assisted work with polynomial inner-product spaces.  
**Supports:** deliberate coordination of visual and analytic representations for inner products, orthogonality/orthonormality and related concepts.  
**Limit:** specific population, technology setting and polynomial object class; used to support representation coordination, not to claim measured effectiveness for M15.

### Aina Appova & Tetyana Berezovski, *Commonly Identified Students' Misconceptions About Vectors and Vector Operations*, RUME16 proceedings
**Locator:** 16th Annual Conference on Research in Undergraduate Mathematics Education, Volume 2, pp.2-8ff in the proceedings.  
**Type / epistemic role:** domain-specific empirical misconception comparator.  
**Population/context:** **23 freshmen, non-mathematics majors pursuing liberal-arts degrees** after a freshman-level linear-algebra course; qualitative analysis of student work.  
**Supports:** the study reports difficulties with vector operations/projections and vector-versus-scalar distinctions; this supports explicit projected-vector-vs-scalar-coefficient contrasts and misconception checks rather than formula-only teaching.  
**Limit:** small, specific sample; the reported percentages are not generalized to the T22 learner.

## Pedagogy-Evidence Ledger

| Mathematical concept | Documented learner difficulty / design risk | Population/context | Evidence strength / limitation | Likely false mental model | Useful contrast / sequencing implication | Assessment consequence |
| --- | --- | --- | --- | --- | --- | --- |
| Orthogonal vs orthonormal | Representation/concept coordination is nontrivial; textbook distinction is mathematically essential. | Caglayan: US math majors in technology-assisted polynomial inner-product work; Strang/Axler are mathematical comparators. | Qualitative/domain-specific + theorem necessity; no prevalence claim. | “perpendicular already means unit length” | S01 separates pairwise zero dot products from norm-one normalization and includes the zero-vector boundary. | Score classification and actual normalization separately. |
| Vector vs scalar projection quantities | Appova/Berezovski report vector/projection difficulties and vector-vs-scalar confusion. | 23 freshman non-math liberal-arts students. | Small qualitative sample; directly relevant misconception family but not generalizable frequency. | “the projection coefficient is the projected vector” | S05 names coefficient, projected vector and residual as distinct objects; scaled-generator contrast follows. | Transfer changes generator scale and scores coefficient-vs-vector reconciliation. |
| Multiple representations | Hillel/Dorier analyze difficulties moving among geometric, algebraic and abstract modes. | Tertiary linear-algebra research synthesis. | Historical/multi-context; used as design hypothesis. | “a correct formula automatically transfers to another representation” | Geometry → dot products → column space → `A^T r=0` are connected explicitly. | Transfers change representation, not only constants. |
| Projection formula | Strang/MIT derive it from orthogonal residual geometry. | Mathematical course/textbook evidence, not empirical efficacy. | Strong mathematical route evidence; pedagogy effect unmeasured. | “projection is a memorized scalar recipe” | S04 decomposition precedes S05 line formula; S07 proves nearest-point meaning later. | Main derives the coefficient; wrong-solvers that quote formulas without hypotheses lose reasoning credit. |
| ON vs nonorthogonal coordinates | Strang/Axler/Hefferon distinguish ON coefficient extraction from general-column solving. | Mathematical comparators. | Theorem-supported design risk. | “`v·a_i` gives coordinates for any basis” | S02 ON coordinates precede S06 ON projection; S11 introduces coupled general-column equations. | S16 adversarial report uses raw dot products on nonorthogonal columns and must be rejected. |
| Gram–Schmidt | Source treatments require subtracting every earlier orthogonal component and preserve span. | Mathematical comparators; representation concern supported by domain research. | Mathematical necessity, not a prevalence estimate. | “subtract only the previous vector” / “zero residual is numerical failure” | S08 handles two vectors; S09 separately handles full multi-vector, zero residual and order. | S08 debugging Transfer and S09 dependence/order Transfer target both failure modes. |
| Transpose / normal equations | Repository-specific prerequisite gap: accepted M14 does not own transpose, while Strang/MIT use it in projection/least squares. | T22-specific + standard mathematical sources. | Direct dependency evidence. | “`A^T r=0` is magic notation” / “transpose is inverse” | S10 locally derives transpose shape and column-dot meaning before S11. | S10 rectangular task + nonzero `Null(B^T)` Transfer. |
| Least squares | Strang/MIT make the nonzero error vector central: nearest attainable point, not exact solution. | Mathematical course/textbook evidence. | Strong mathematical interpretation; no learner prevalence claim. | “least squares makes `Ax=b` exact” | S13 starts with an inconsistent system and proves global minimality from orthogonal decomposition. | Require a nonzero residual and `A^T r=0`, not only coefficients. |
| Rank-deficient least squares | M14 null-space structure + M15 projection imply unique fitted vector but potentially many coefficients. | Repository/theorem-derived risk. | Mathematical consequence; no empirical frequency claim. | “singular `A^T A` means no fit exists” / “unique fit means unique coefficients” | S14 follows full-rank least squares and explicitly removes the inverse shortcut. | Main must produce the full coefficient family and preserve one unique fitted vector. |
| Deterministic line fit vs statistical regression | T22 ownership boundary, not an empirical misconception claim. | Repository-specific. | Curriculum boundary. | “least-squares line ⇒ statistical significance/causality” | S15 states deterministic scope before M36. | Public rubric requires naming an inferential claim not justified here. |

## 3. Pre-authoring maps

### Concept dependency graph

`M13 dot product + M14 subspaces/rank`
→ orthogonal vs orthonormal lists
→ ON coordinates/Pythagorean decomposition
→ orthogonal complement
→ concrete/ON-basis-accessible orthogonal decomposition + uniqueness
→ line projection
→ ON-subspace projection
→ nearest-point theorem
→ Gram–Schmidt construction + general finite-dimensional decomposition existence
→ transpose/column-dot bridge + complement dimension
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

Canonical-state note: M15's current learner surface is text/math based. It does **not** claim a new graph/diagram-reading capability and therefore does not pretend that an unimplemented visual counts as evidence. Geometric meaning is coordinated through explicit coordinate vectors, subspace membership, dot products, decompositions and residual conditions. A later visual enhancement may aid exposition, but it would be enrichment unless the ownership contract is changed.


| Representation / learner action | Introduction → connection → reuse | Independent evidence |
| --- | --- | --- |
| coordinate-vector right-angle / residual geometry | M13 dot-product geometry → S01/S05 → decomposition and residual geometry S07 | S05–S07; no new diagram-reading capability is claimed |
| ON coefficient list / reconstruction | S02 → subspace projection S06 → Gram–Schmidt S08–S09 | S02/S06/S09 |
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
