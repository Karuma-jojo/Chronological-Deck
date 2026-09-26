# T22 Elite M14 / SIDE276 — pre-authoring design gate

Status: **pre-authoring boundary/source checkpoint — BUILD authorized, no M14 learner-route publication yet**. Recovered 26 September 2026 from `codex/t22-pedagogical-rebuild` at `c8858f650f0aa80d71c96243deb2d654815c917d`. Main is `854f202db878fbc0676a4069620ef92b6d38c8d6`; both refs currently point to the same tree `ea115fd6a54409c6e48e35203206952c70f2b15e`. M13 is the accepted/published frontier. This file records Gates 0–3 for M14; it is not an acceptance record.

## 0. Recovery receipt

- Target: M14 / `SIDE276`, **BUILD** only. Stop before M15, T25, legacy-progress migration, main merge or learner-route publication.
- Canonical new authoring candidate: `course/t22/authoring/m14-side276.json`; stable session IDs use `T22V3::SIDE276::Sxx@1`.
- Authority: `docs/t22-rebuild/M65-SKELETON.md`, `m65.dependencies.json`, `SEMANTIC-PREREQUISITES.json`, accepted `course/t22/authoring/m13-arc511.json`, and later-module boundaries in legacy SIDE278/SIDE279/SIDE280 packs. The legacy `js/data/t22-rich-module-5.js` is a topic inventory, not the new pedagogy or session architecture.
- Formal prerequisite is exactly `ARC511`. M13 hands off finite real vectors, span/subspaces, independence, bases/coordinates, finite dimension, and Euclidean dot-product geometry.
- Current semantic row for SIDE276 is `pending-boundary-audit`; no M14 authoring pack exists at recovery.
- Downstream direct consumers in `m65.dependencies.json`: M15/SIDE278, M16/SIDE279, M18/SIDE271, M19/ARC711, M20/ARC512 and M21/T22E-CODE02.

## 1. Boundary Contract

**Destination.** The learner treats a real matrix as a basis-dependent coordinate representation of a finite-dimensional linear map, constructs and interprets matrix-vector action, composes maps through matrix multiplication with correct order and dimensions, translates and solves finite exact linear systems by justified elimination, organizes all solutions through column space/image, null space and rank, uses rank-nullity to reason about reachability and ambiguity, recognizes and constructs inverses only under valid hypotheses, computes and interprets determinants structurally, and changes vector/operator coordinates while preserving the underlying map.

**Entry.** M13 owns typed real vectors, finite linear combinations, span, subspaces, independence, bases, unique coordinates and finite dimension. Those capabilities are inspected rather than inferred from a syllabus heading. M01 algebra supports scalar equation manipulation. No matrix arithmetic, elimination, rank, determinant, inverse-matrix algorithm or change-of-basis matrix is assumed.

**New objects.** Linear transformation/map; domain/codomain/range/kernel language; matrix representation in chosen bases; matrix-vector and matrix-matrix product; identity matrix; matrix equation `Ax=b`; augmented matrix; elementary row operations; echelon form, pivots and free variables; null space; column space/image; rank and nullity; injective/surjective map; invertible linear map/matrix; inverse matrix; determinant; coordinate-change matrix; similar matrix representations of one operator.

**Deferred / forbidden future machinery.**
- M15/SIDE278: orthogonal complements as a developed tool, projection, Gram–Schmidt and least squares.
- M16/SIDE279: eigenvalues/eigenvectors, eigenspaces, characteristic polynomial, diagonalization, spectral theorem and eigenbasis selection.
- M17/SIDE280: quadratic forms/PSD, QR, Cholesky, SVD, pseudoinverse and rank-deficient least-squares machinery.
- M23/ARC585: floating-point conditioning, pivoting strategy/stability, LU/QR numerical algorithms, backward error and numerical rank.
- M18–M19: Jacobians/Hessians and matrix calculus.
- Infinite-dimensional/operator-theory generality, arbitrary fields and complex Fourier machinery.

**Synthesis.** Given a small unfamiliar finite-dimensional map/model described partly by basis action and partly by equations, the learner builds its matrix, predicts reachability and ambiguity, solves a requested system, diagnoses rank/invertibility, uses determinant only for claims it actually supports, then rewrites the same operator in a new basis and checks that the observable map has not changed.

### Prerequisite audit

| Operation consumed | Earlier source / local bridge | First use | Decision |
| --- | --- | --- | --- |
| Vector addition, scaling, span, subspace | M13 S01–S06 | S01 | Reuse explicitly. |
| Independence, basis, coordinates, dimension | M13 S07–S12 | S01–S03 | Reuse; basis action becomes the bridge to matrix columns. |
| Function composition / inverse-function language | M02 function foundations are chronologically available but not a formal dependency; M13 uses maps only lightly | S01/S04/S13 | Define the needed finite-map language locally; do not rely on an unverified prerequisite. |
| Solving small scalar systems | M01 algebra | S05–S07 | Reuse, then systematize by row operations. |
| Existential witness / universal counterexample / proof | M03 is upstream of M13 and M13 repeatedly exercises these | S01 onward | Reuse through M13's accepted exit capabilities. |
| Matrix notation and row/column conventions | NONE | S02 | Teach locally before any calculation. |
| Matrix multiplication | NONE | S04 | Derive from composition; row-by-column is a computational consequence, not the meaning. |
| Equivalent systems under row operations | NONE | S06 | Prove each elementary operation preserves the solution set. |
| Affine solution set `x_p+N(A)` | M13 span/subspace only | S09 | Prove from linearity. |
| Rank-nullity | M13 finite dimension only | S11 | Prove from pivot/free-variable structure and M13 basis/dimension. |
| Injective/surjective equivalence for equal finite dimensions | NONE | S12–S13 | Derive from rank-nullity and dimension. |
| General determinant | NONE | S15 | Introduce by a precise characterization/existence statement; separate it from geometric interpretation. |
| Coordinate-change matrices / similarity | M13 basis coordinates only | S17–S18 | Construct from the identity map between coordinate systems, then derive the operator formula. |

### Support-Theorem Ledger

| Support result | Why needed / first consumer | Hypotheses / object type | M14 treatment | Why it does not steal later ownership |
| --- | --- | --- | --- | --- |
| A linear map preserves every finite linear combination and sends 0 to 0 | S01 | Real finite-dimensional vector spaces | Prove from the two linearity laws | No matrix machinery required. |
| Arbitrary images of a basis determine a unique linear map | S01–S02 | Finite basis of the domain; chosen codomain vectors | Prove by unique coordinates | M13 supplies basis uniqueness; M14 owns the map consequence. |
| Every finite real linear map has a matrix in chosen bases; columns are transformed basis vectors | S02 | Finite-dimensional real spaces + ordered bases | Prove constructively | This is M14's core representation theorem. |
| Matrix of a composition is the product in composition order | S04 | Compatible bases/domain-codomain dimensions | Derive on basis vectors / coordinate columns | No eigenstructure or factorization. |
| Each elementary row operation preserves the solution set of an augmented system | S06 | Finite exact linear equations; nonzero row scaling | Prove operation-by-operation with reversible equation transformations | Numerical stability is deferred. |
| A legal row operation is represented by left multiplication with the elementary matrix obtained by applying that operation to I | S14 | Finite exact matrices; legal row swap/nonzero scale/row replacement | Define and verify locally before Gauss–Jordan inversion | Exact representation only; numerical LU/pivoting remains deferred. |
| Echelon pivots/free variables parameterize every solution | S07 | Exact finite system | Derive by elimination/back substitution | No numerical solver claims. |
| `N(A)` is a subspace and every consistent solution is `x_p+N(A)` | S08–S09 | Linear map/matrix equation | Prove directly | Projection is not used. |
| Pivot columns of the **original** A form a basis of Col(A); row reduction preserves pivot positions/rank, not literal column space | S10 | Exact row-equivalent matrices | Prove by preserved coefficient relations / echelon structure | No orthogonal complements. |
| Rank-nullity `rank A + nullity A = n` | S11 | `A:R^n→R^m` | Prove by free-variable basis or fundamental theorem of linear maps | M13 already owns finite dimension. |
| In equal finite dimensions, injective ⇔ surjective; square full-rank map is invertible | S12–S13 | Finite-dimensional domain/codomain of equal dimension | Derive from rank-nullity | Eigenvalues/determinants not used as premises. |
| Inverse of a linear bijection is linear; matrix inverse represents it; `(AB)^{-1}=B^{-1}A^{-1}` | S13–S14 | Bijective compatible finite maps | Prove by composition | Pseudoinverse deferred. |
| Determinant exists uniquely with `det I=1`, alternating row behavior and row-linearity; row replacement preserves det; triangular det is diagonal product | S15 | Square real matrices | State the finite existence/uniqueness theorem with Leibniz formula as an existence witness; derive computational consequences | Characteristic polynomials deferred. |
| `det(AB)=det A det B`; `det A≠0 ⇔ A` invertible | S15–S16 | Square real matrices of equal size | State multiplicativity with source; prove singularity equivalence using prior invertibility/rank plus determinant properties | No eigenvalue argument. |
| `|det A|` is the volume-scaling factor and sign records orientation | S16 | Real square linear map; Euclidean coordinate volume | Present as a theorem/interpretation, not the definition | Jacobian determinants deferred. |
| Coordinate-change matrices for identity maps are mutual inverses; operator matrices obey a similarity relation | S17–S18 | Two ordered bases of one finite real space; same operator | Derive by composition with identity coordinate maps | Diagonalization/eigenbasis selection is explicitly excluded. |

## 2. Source Dossier

Every source below has an epistemic role. Repository ownership remains authoritative.

| Source | Role and inspected material | Design decision supported / deliberate non-import | Limitation |
| --- | --- | --- | --- |
| Current T22 repository | M65 skeleton, dependency graph, semantic ledger, accepted M13 canonical pack, legacy SIDE276/SIDE278/SIDE279/SIDE280 inventories | Exact ownership boundary and downstream obligations; legacy eight SIDE276 arcs are topic inventory only. | Legacy quality/ordering is not presumed accepted. |
| Gilbert Strang, *Introduction to Linear Algebra*, 4th ed., user-supplied full 571-page scan | Deep textbook comparator. Inspected Ch.2 §§2.1–2.5 (Ax=b, elimination, matrix products, inverse), Ch.3 §§3.2–3.4 (nullspace, rank/RREF, complete solution), Ch.5 §§5.1 and 5.3 (determinant rules, singularity, area/volume), Ch.7 §§7.1–7.2 (linear transformations, matrix representation, composition, change of basis). The raw attachment is 571 PDF pages even though the conversation file parser exposes only the first 150. | Preserve row/column/system/map viewpoints and Strang's recurring question “what does Ax=b mean?”, derive multiplication from transformations, distinguish singularity from numerical conditioning, and treat determinant geometry as meaning rather than a cofactor drill. | Do not copy prose/exercises. Do not import Ch.4 projection/least squares, Ch.6 eigenstructure, §7.3 pseudoinverse, or numerical-LU/conditioning material into M14. |
| MIT OCW 18.06 / 18.06SC resource index and syllabus | Canonical university route comparator: elimination, complete solution, rank/nullspace, determinants, linear transformations and change of basis | Confirms conventional scope and downstream expectations; T22 reorders transformations before systematic elimination to make matrices representations rather than unexplained tables. | MIT course order does not override T22 ownership; projection/eigenvalue lectures remain later. |
| Sheldon Axler, *Linear Algebra Done Right*, 4th ed. (official open-access PDF), Ch.3 especially 3.31, 3.43, 3.76, 3.81–3.86; Ch.9 determinant results | Rigorous theorem/hypothesis source | Matrix of a map depends on ordered bases; matrix product matches composition; change-of-basis formula is derived with explicit basis direction; injectivity/null-space and finite-dimensional map theorems provide clean scope checks. | Second-course abstraction; restrict to finite real coordinate spaces and do not import operator/spectral machinery. |
| Jim Hefferon, *Linear Algebra*, official open textbook, especially Linear Maps/Matrices and Change of Basis | First-course developmental comparator | Confirms that change-of-basis is best taught as identity acting between coordinate descriptions; supports proof-plus-computation progression. | Calculus is listed as a course prerequisite, but M14 uses no calculus-dependent content. |
| MAA, *Instructional Practices Guide* | Undergraduate-mathematics pedagogy baseline | Require explanation, comparison, student-produced reasoning, and assessment aligned to actual mathematical actions. | General guidance; not an M14 outcome study. |
| IES/WWC, *Organizing Instruction and Study to Improve Student Learning*, recommendations 2–4 | General learning evidence | Interleave worked examples with problems, combine graphics/verbal descriptions, and explicitly connect abstract/concrete representations; all three are rated Moderate Evidence in the guide. | Heterogeneous K–postsecondary evidence; no direct efficacy claim for this T22 learner. |
| Dorier (ed.), *On the Teaching of Linear Algebra* (2000), especially Hillel “Modes of Description and the Problem of Representation” and Sierpinska “On Some Aspects of Students' Thinking in Linear Algebra” | Domain-specific research synthesis | Treat movement among algebraic, geometric, matrix and abstract/function modes as a learned capability rather than automatic transfer. | Historical synthesis and varied populations; used for design hypotheses, not outcome prediction. |
| Asuman Oktaç, “Understanding and Visualizing Linear Transformations” (ICME-13/Springer, 2018) | Domain-specific linear-transformation evidence | Reported difficulties include requiring an explicit formula when unnecessary, confusing line-preservation with linearity, and converting among graphical/algebraic/matrix registers. S01–S04 therefore use basis-action, formula, geometric and matrix representations with counterexamples. | Preliminary/qualitative studies in specific settings; do not universalize frequencies. |
| Trigueros & Possani, “Matrix multiplication and transformations: an APOS approach,” *Journal of Mathematical Behavior* 52 (2018) | Domain-specific matrix-multiplication research | Supports teaching multiplication through transformation/composition structure rather than isolated row-by-column arithmetic. | Didactical study in a particular instructional design; no claim that one sequence is uniquely optimal. |
| Ramirez, *A Cognitive Approach to Solving Systems of Linear Equations* (2009) and Oktaç synthesis in *Challenges and Strategies in Teaching Linear Algebra* (2018) | Systems-of-equations conceptual comparator | Equivalent systems and solution-set preservation must be explicit; elimination is not merely arithmetic simplification. | Small/qualitative research; used to motivate S05–S07 design. |
| Caglayan, “Linear Algebra Students' Understanding of Similar Matrices and Matrix Representations of Linear Transformations…” (2018, ERIC EJ1203340) | Similarity/change-of-basis comparator | Similar matrices should be tied to one underlying linear transformation under different bases, with conversion direction tracked explicitly. | Qualitative technology-assisted setting; no outcome generalization. |
| Cathrine Kazunga & Sarah Bansilal, “Misconceptions About Determinants,” in *Challenges and Strategies in Teaching Linear Algebra* (Springer, 2018), pp.127–145, DOI 10.1007/978-3-319-66811-6_6 | Determinant misconception comparator; study of 116 Zimbabwean in-service mathematics teachers | Avoid rule-overextension; distinguish row multilinearity from false whole-matrix linearity and require determinant claims to name their hypotheses. | Specific teacher population and determinant tasks; frequencies are not generalized to the T22 learner. |

### Pedagogy-Evidence Ledger

| Concept | Documented learner difficulty / context | False model to attack | Design consequence |
| --- | --- | --- | --- |
| Linear transformations | Research syntheses and Oktaç (2018): students can struggle moving between function, graphical and matrix registers and may demand an explicit formula even when basis action suffices. | “A linear map is just a matrix/formula” or “straight lines stay straight, so it is linear.” | S01 begins with map laws before matrices; assessments include basis-action and affine/nonlinear counterexamples. |
| Matrix multiplication | Trigueros/Possani; textbook-analysis literature reports varied rationales and a need to connect multiplication to transformations. | “Multiply because row-by-column is the rule,” with no composition/order meaning. | S04 derives product from composition and scores order/dimension interpretation separately from arithmetic. |
| Systems/elimination | Ramirez/Oktaç line of work emphasizes equivalent systems and solution meaning. | Row operations change the problem, or elimination is a bag of arithmetic tricks. | S05 defines the solution set before S06 proves each row operation reversible; S07 classifies no/one/many from pivots/free variables. |
| Multiple representations | Hillel/Sierpinska and later synthesis: cognitive flexibility across geometric, symbolic and matrix modes is nontrivial. | A correct procedure in one register automatically transfers to another. | Same objects recur as maps, columns, equations, transformed geometry and coordinate descriptions; transfer tasks deliberately switch representation. |
| Similar matrices | Caglayan's qualitative study focuses on coordinating similarity and matrix representations of one map. | `P^{-1}AP` is a magic formula or produces a new operator. | S17 establishes coordinate conversion first; S18 derives similarity by a labelled three-step route and audits every intermediate basis. |
| Determinant | Undergraduate misconception studies report difficulties with matrix/determinant concepts. | “det is a cofactor recipe,” “large det means stable,” or “square means invertible.” | S15 separates characterization/computation; S16 separates algebraic determinant from geometric interpretation and explicitly rejects conditioning claims. |

## 3. Pre-authoring maps

### Concept dependency graph

`M13 basis/coordinates + finite linear combinations`
→ **linear map laws**
→ basis determines map
→ **matrix representation**
→ matrix-vector action / shape
→ **composition**
→ matrix multiplication
→ **Ax=b representation**
→ equivalent row operations
→ echelon pivots/free variables
→ homogeneous solutions / nullspace
→ complete solution `x_p+N(A)`
→ column space / reachability
→ rank + nullity
→ injective/surjective structure
→ square invertibility
→ inverse construction.

A second branch begins after invertibility:
square matrices → determinant characterization/computation → singularity + volume/orientation.

A representation branch begins from M13 coordinates + invertibility:
vector coordinate conversion → same operator in two bases → similarity.

S19 reunites all three branches. No path requires M15 projection or M16 eigenstructure.

### Conceptual-distinction map

- Linear map **object** versus its matrix **representation** in selected bases.
- Domain vector versus its coordinate column; changing coordinates versus changing the underlying vector.
- A matrix's columns as output vectors versus rows as scalar output functionals.
- `AB` as “B then A” composition versus elementwise multiplication or an order-free product.
- Equation system versus augmented representation; row operation on equations versus changing the unknown vector.
- Echelon form versus the original matrix; same solution set does not mean same column space.
- Pivot **positions** in the reduced matrix versus pivot **columns from the original A**.
- Null space (inputs erased) versus column space/range (outputs reachable).
- Rank (dimension of image) versus matrix dimensions; rank deficiency versus “small determinant”.
- Homogeneous solution subspace versus nonhomogeneous affine translate `x_p+N(A)`.
- Full column rank/uniqueness versus full row rank/reachability; rectangular injectivity versus surjectivity.
- Square versus invertible.
- Solving `Ax=b` versus explicitly forming `A^{-1}`.
- Determinant definition/characterization versus area-volume interpretation; singularity test versus numerical conditioning.
- Basis-change matrix direction versus its inverse.
- Similar matrices as representations of the same operator versus arbitrary matrices that happen to share some numbers.

### Misconception / failure-mode map

Evidence tags: `R` domain-specific research, `S` Strang/Axler/Hefferon structural comparator, `L` legacy SIDE276, `T` deliberately constructed theoretical trap.

| Failure | Tag | Required discriminator |
| --- | --- | --- |
| Affine translation accepted as linear because its graph “looks straight” | R/T | Test T(0) and arbitrary superposition. |
| Basis images treated as insufficient to define a map | R/S | Build the action on an arbitrary coordinate combination from basis images only. |
| Matrix-vector product treated only as row-dot arithmetic | R/S | Require column-combination interpretation and dimension meaning. |
| `AB=BA` or composition order reversed | R/L/T | Use compatible noncommuting transformations with an operational order. |
| Row operation believed to alter the solution set | R/S | Ask for the reversible equation argument, not just a row-reduced answer. |
| Number of equations/unknowns used alone to classify solutions | L/T | Include dependent/inconsistent systems with misleading counts. |
| Columns of RREF used as a basis for Col(A) | S/L/T | Task explicitly asks which **original** columns form a basis and why. |
| Null space and column space placed in the same ambient space | L/T | Rectangular matrix with different domain/codomain dimensions. |
| Rank confused with rows/columns count | R/T | Rectangular rank-deficient examples; require dimension statement. |
| Square assumed invertible | R/L/T | Singular square counterexample with nontrivial kernel. |
| Inverse used on nonsquare/singular matrix | L/T | Method-choice task with rank evidence. |
| Determinant treated as linear in the whole matrix, e.g. det(A+B)=det A+det B | S/T | Counterexample and row-linearity distinction. |
| Large `|det A|` claimed to imply numerical stability | L/T | Ask exactly what determinant establishes; conditioning deferred. |
| Area/volume scaling silently substituted as the definition | S/T | Require algebraic determinant rules first, then label geometry a theorem/interpretation. |
| Change-of-basis direction reversed | R/S/T | Track the basis of every coordinate vector before and after P. |
| Similarity formula memorized without basis semantics | R/T | Ask learner to reconstruct the conversion–apply–convert-back chain. |

### Representation progression map

| Representation / learner action | Introduction → connection → reuse | Independent evidence |
| --- | --- | --- |
| Map arrow `T:V→W` and basis-action table | S01 → columns S02 → composition S04 → similarity S18 | S01/S04/S18 |
| Matrix columns / coordinate action | S02 → Ax as column combination S03 → column space S10 | S03/S10/S19 |
| Geometric transformation picture | S01/S03 → determinant area/volume S16 | S03 Transfer, S16, S19 |
| Scalar equations ↔ augmented matrix | S05 → row operations S06 → echelon classification S07 | S05–S07 |
| Parametric solution description | S07 → nullspace basis S08 → affine complete solution S09 | S08/S09/S19 |
| Original A versus row-reduced R | S06 → pivot/free S07 → original pivot columns S10 → rank S11 | S10/S11 |
| Rank/nullity diagram `domain → image` | S10 → rank-nullity S11 → injective/surjective S12 | S11/S12/S19 |
| Inverse map / inverse matrix | S13 → augmented construction S14 → coordinate changes S17 | S14/S17 |
| Determinant scalar + transformed region | S15 algebra → S16 geometry | S15/S16/S19 |
| Coordinate labels `[v]_B` | M13 coordinates → S17 conversion → S18 operator similarity | S17/S18/S19 |

### Downstream obligation map

| Later owner | M14 exit capability required | Keep for later |
| --- | --- | --- |
| M15 SIDE278 | matrix-vector action, systems, Col(A), N(A), rank, invertibility | projection, orthogonal complement algorithms, Gram–Schmidt, normal equations, least squares |
| M16 SIDE279 | composition/products, invertibility, determinants, similarity/change of basis | eigenvalues/eigenvectors, characteristic equation, diagonalization, spectral theorem |
| M17 SIDE280 | rank, matrix products, exact systems, invertibility | PSD/quadratic forms, QR/Cholesky/SVD/pseudoinverse |
| M18 SIDE271 | matrices as typed linear maps and dimension logic | derivative matrices/Jacobians/Hessians |
| M19 ARC711 | products, inverse, determinant, trace-ready representation discipline | matrix differentials and derivative identities |
| M20 ARC512 | linear systems and map iteration language | differential-equation dynamics/eigen stability |
| M21 T22E-CODE02 | shapes, matrix-vector action, exact algorithmic structure | NumPy implementation, floating point, complexity/performance |

### Narrative spine

Start with a question M13 cannot yet answer efficiently: **how do we package a rule that acts linearly on every vector?** A basis lets us specify the rule using only basis images; placing those images into columns gives a matrix. Once a matrix is understood as a represented map, its unusual product becomes inevitable from composition. Then ask the inverse problem: **given an output b, which inputs x produce it?** This creates `Ax=b`, elimination, nullspace, complete solutions and column-space reachability. Rank compresses those observations into dimensions and makes injectivity, surjectivity and invertibility structural rather than procedural. Determinant then supplies one scalar invariant for square maps—useful, but deliberately narrower than “everything about a matrix.” Finally, revisit M13's basis coordinates: coordinates may change while the underlying vector/map does not, leading naturally to change-of-basis matrices and similarity. The synthesis asks the learner to move among all of these views without confusing representation with object.

### Candidate pedagogical atoms and split/merge decisions

| Session | Central atom | Split/merge justification |
| --- | --- | --- |
| S01 | Linear maps before matrices | Function/object meaning and linearity tests need to exist before representation. Includes basis-determines-map theorem; no matrix arithmetic yet. |
| S02 | Matrix representation from basis images | Constructing a representation is distinct from using one; basis order and shape are the main risks. |
| S03 | Matrix-vector action and column meaning | Learner now uses the representation and reconciles column-combination, row-dot and geometric action; separate from construction load. |
| S04 | Composition and matrix multiplication | New binary operation with noncommutative order and dimension constraints; selected pilot because rote arithmetic can mask conceptual failure. |
| S05 | Systems as `Ax=b`: row and column pictures | Formulation/reachability precedes the elimination algorithm. |
| S06 | Equivalent systems and elementary row operations | Establish why elimination is legal before doing long procedures. |
| S07 | Echelon form, pivots/free variables, no/one/many | Classification and parameterization are new structural decisions beyond row operations. |
| S08 | Homogeneous systems and nullspace basis | Turns free-variable mechanics into a subspace/object with domain meaning. |
| S09 | Complete solution `x_p+N(A)` and consistency | Nonhomogeneous solution sets are affine translates, not subspaces; distinct conceptual transition. |
| S10 | Column space/image, reachability and original pivot columns | Connects M13 span to matrix outputs; explicitly separates A from R. |
| S11 | Rank, nullity and rank-nullity | Compresses pivot/nullspace structure into dimensions and proves the central finite-dimensional relation. |
| S12 | Injective versus surjective rectangular maps | Uses rank-nullity to reason without square-matrix shortcuts. |
| S13 | Square invertibility equivalences | Integrates injective/onto/full rank/unique solvability into one map-level contract before inverse algorithms. |
| S14 | Constructing and auditing inverse matrices | Procedural construction plus inverse-composition order; intentionally follows existence logic. |
| S15 | Determinant algebra and exact computation | Introduces determinant's characterization and row-operation/triangular computation without geometry-as-definition. |
| S16 | Determinant meaning: singularity, orientation, volume | Separates what determinant proves from its geometric interpretation and from numerical-conditioning claims. |
| S17 | Coordinate change for vectors | Identity map between two bases; direction/inverse tracking deserves its own acquisition stage. |
| S18 | Same operator in two bases: similarity | Derive conversion–apply–convert-back; explicitly stop before eigenbasis/diagonalization. |
| S19 | Whole-module synthesis / representation forensics | Learner chooses representations and methods across map, matrix, system, rank, determinant and basis-change views. |

**Sizing judgment.** Nineteen sessions arise from nineteen distinct acquisition/decision transitions above. The old SIDE276 eight-arc outline is not a session-count constraint, and M13's 17 sessions are not used as a symmetry target. S04 is the representative pilot. If its vertical slice shows S02–S04 should be merged or split, the architecture is reopened before batch authoring.

## 4. Pilot definition

**Pilot: S04 — Composition makes matrix multiplication inevitable.**

Entry capabilities: S01 linearity/basis-action, S02 matrix representation, S03 matrix-vector action and shapes.  
Support facts: compatible composition of functions; matrix representation theorem.  
Central capability: derive and use `[S∘T]=[S][T]` with explicit intermediate space/basis, then calculate a small product and interpret its columns.  
Obstacle: the learner may compute row-by-column correctly while reversing the process order or treating multiplication as commutative.  
Representations: map chain `U→V→W`, basis-action table, matrix shapes, product columns.  
Main: unfamiliar pair of maps with compatible but non-square shapes; learner must choose product order, compute, and state what composed map it represents.  
Transfer: process described verbally with one tempting reversed product that is also dimensionally legal; learner must reject it by semantics rather than dimension alone.  
Misconception attack: choose noncommuting square maps so `AB` and `BA` are both legal and numerically different.  
Evidence class: Main should be fresh evidence if its map/action instance and decisive order are not rehearsed; Transfer must be changed-surface because the representation shifts from formulas/matrices to an operational pipeline.

**Gate status:** Gate 0 recovered; Gate 1 boundary/prerequisites and support theorems traced; Gate 2 source and pedagogy dossiers researched; Gate 3 proposes 19 sessions and selects S04. Author S01–S03 only as the minimum instructional bridge required to test the S04 vertical slice, then run Gates 4–8 on the pilot before completing S05–S19.
