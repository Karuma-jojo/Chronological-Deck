# T22 Elite M13 / ARC511 — pre-authoring design gate

Status: pre-authoring boundary/source checkpoint at branch head `935e98c73282192e3d891b0bb2ef2de283a4db62` (2026-09-25). Subsequent authoring produced the 17-session M13 builder candidate; this design checkpoint is not an acceptance record. The learner route still ends at M12 at this checkpoint.

## 0. Recovery receipt

- Clean branch `codex/t22-pedagogical-rebuild` at `935e98c`; no M13 authoring file or local competing changes at recovery.
- Authority: `docs/t22-rebuild/M65-SKELETON.md`, `m65.dependencies.json`, `SEMANTIC-PREREQUISITES.json`, M01/M03 canonical teaching, M12 handoff, and the legacy `js/data/t22-rich-module-4.js` ARC511 inventory. The legacy ARC number 4 is not the current M65 order 13.
- Formal prerequisites: `T22E-FND01` and `T22E-DISC01`. M12 is chronologically preceding but not a mathematical prerequisite. The semantic prerequisite row is currently `pending-boundary-audit`.
- Downstream: M14/SIDE276 explicitly consumes vector arithmetic, span, independence, basis/dimension and dot-product geometry. M15/SIDE278 later consumes dot products and orthogonality; M18/SIDE271 consumes vectors and norms.
- Canonical candidate will be `course/t22/authoring/m13-arc511.json`. Stable runtime IDs use `T22V3::ARC511::Sxx@1`; no old progress is deleted or recertified.

## 1. Boundary Contract

**Destination.** A learner independently treats elements of real coordinate spaces as vectors with typed dimensions and coordinate meaning; constructs and interprets linear combinations; proves span membership with coefficient witnesses and nonmembership with a valid obstruction; checks elementary subspaces; diagnoses dependence with a nontrivial zero relation and independence with a universal argument; constructs and verifies bases and unique coordinates; justifies dimension invariance in bounded finite-dimensional form; computes and interprets the Euclidean dot product, norm, angle and orthogonality, including Cauchy–Schwarz and triangle bounds and zero-vector exceptions.

**Entry.** M01 S13 teaches solving two scalar linear equations by substitution/elimination; M01 covers scalar algebra and units. M03 S05–S07 teach quantifiers, witnesses and counterexamples; M03 S09–S11 teach direct proof, contraposition and contradiction; M03 S19 teaches ordered pairs. Earlier coordinate-plane exposure in M02 is chronologically available but is not a formal M13 prerequisite. The first sessions locally introduce coordinate-vector and displacement conventions. No calculus, matrices, rank, determinants or projection are assumed.

**New objects.** `R^n` coordinate vectors, ambient dimension, scalar/vector types, zero vector, linear combination, generated span, subspace, linear independence/dependence, basis, unique basis coordinates, finite dimension, Euclidean dot product and norm, angle between nonzero vectors, orthogonality, Cauchy–Schwarz and triangle bounds.

**Deferred.** M14 owns matrices as linear maps, elimination, rank/nullspaces, change-of-basis matrices and systematic algorithms. M15 owns orthogonal projection, Gram–Schmidt and least squares. M16–17 own eigenstructure and factorizations. M18 owns gradients/Jacobians/Hessians. General inner-product spaces and arbitrary-field axioms are not required here.

**Synthesis.** Given a small, unlabeled component library and a target, the learner decides whether the target is generated, removes justified redundancy, selects a basis, computes coordinates, then chooses an appropriate magnitude/alignment diagnostic with its domain conditions.

### Prerequisite audit

| Operation consumed | Earlier teaching or local bridge | First use | Decision |
| --- | --- | --- | --- |
| Scalar arithmetic and two-equation solving | M01 S13 and earlier algebra | S01/S04 | Reuse; do not require matrix elimination. |
| Witness, counterexample, universal proof | M03 S05–S07, S09–S11 | S04 onward | Reuse explicitly in membership/independence arguments. |
| Ordered coordinates versus point/displacement | M03 S19 ordered pairs; M02 coordinate plane is not a formal prerequisite | S01–S02 | Supply typed local bridge; avoid treating a point as automatically a vector. |
| Cosine and planar angle | No exact formal M01/M03 owner established in this audit | S15 | Define bounded geometric interpretation locally before using angle; algebraic dot product comes first. |
| Finite sums and coefficient manipulation | M01 algebra, M03 finite-sum notation | S03 | Introduce `sum c_i v_i` after concrete two-vector cases. |
| Independence implies uniqueness | Not prior-owned | S09 | Prove by subtracting two representations. |
| All finite bases have same size | Not prior-owned; Strang 4e §3.5 uses a matrix proof unavailable here | S11 | Supply a finite replacement lemma without rank/elimination before defining dimension as basis-independent. |
| Dot-product angle denominator | Not prior-owned | S15 | Establish norm positivity and Cauchy–Schwarz first; exclude the zero vector. |

### Support-Theorem Ledger

| Result | First consumer | Hypotheses / object | M13 treatment | Future boundary |
| --- | --- | --- | --- | --- |
| Span is a subspace and is the smallest subspace containing generators | S05 | Finite subset of real `R^n` | Prove closure and containment from the definition | No column-space algorithm. |
| Dependent finite list iff a member lies in the span of the rest | S08 | Finite nonempty list; nonzero coefficient in a nontrivial relation | Prove both directions, including zero-vector case | No rank shortcut. |
| Uniqueness of coefficients iff generating list is independent | S09 | Representation in its span | Prove by subtraction and a nontrivial zero relation | No inverse matrix. |
| Finite replacement / length bound | S11 | A spanning list of `m` vectors and an independent list of `n` vectors in the same subspace `V⊆R^N` | Prove elementary replacement in stages, hence `n≤m`; apply both ways to bases | No matrix elimination/rank or untaught abstract vector-space axioms. |
| `|u·v|≤||u||||v||` | S14 | Real Euclidean vectors of equal ambient dimension | Prove via nonnegative `||u-tv||²`, handling `v=0` | No projection algorithm. |
| `||u+v||≤||u||+||v||` | S14 | Real Euclidean vectors of equal ambient dimension | Expand squares and apply Cauchy–Schwarz | No abstract normed spaces. |
| Planar law of cosines / geometric interpretation | S15 | Two nonzero planar displacement vectors with angle θ | Supply the elementary planar law as a local geometric fact; compare with the algebraic squared-distance expansion, then define the angle by arccos in `R^n` | No projection or unproved general angle claim. |

## 2. Source Dossier

Every source has a role. Dates below are inspection dates, not publication dates.

| Source | Role and inspected section | Decision supported; deliberate non-import | Limit |
| --- | --- | --- | --- |
| Current repository authority | M65 skeleton/dependencies, semantic ledger, M01/M03 teaching, M12 handoff, legacy ARC511 | M13 owns vector foundations; legacy five arcs are a topic inventory. M14/15 machinery is excluded. | Earlier acceptance labels are not proof of every prerequisite; local bridges are specified. |
| MIT OCW 18.06SC resource index, https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/resource-index/ (checked 2026-09-25) | University route comparator: geometry of linear equations; vector spaces; independence/basis/dimension; orthogonal vectors | Standard course interleaves elimination before bases. T22 instead proves a bounded dimension fact without it. | Course order does not override M65 ownership. |
| Gilbert Strang, *Introduction to Linear Algebra*, 4th ed., user PDF: §1.1 pp.2–10, §1.2 pp.11–21, §3.1 pp.121–132, §3.5 pp.169–184 (PDF pp.5–23, 14–24, 124–135, 172–187, approximate) | User-supplied deep comparator: linear combination as generator, subspace closure, basis/coordinate uniqueness, dot-product geometry, worked-to-problem progression | Retain multiple representations, zero/degenerate cases and proof of coordinate uniqueness. Replace the book's rank/elimination-based dimension proof with a bounded replacement proof. Do not copy prose, examples or exercise data. | Scanned PDF; OCR used only to locate pages, with page images for notation and mathematical checks. |
| Hefferon, *Linear Algebra*, https://hefferon.net/linearalgebra/ (checked 2026-09-25) | Full open-book scope comparator | Confirms a developmental course can prove results through many computational examples. | Site summary inspected; exact sections must be opened before claiming detailed theorem support. |
| Sheldon Axler, *Linear Algebra Done Right*, 4th ed., §§1B–1C, 2A–2C (especially theorem 2.22), §6A, https://linear.axler.net/LADR4e.pdf (checked 2026-09-25) | Rigorous definition/proof route comparator | Span, independence, bases and the replacement length bound can precede matrix methods; Euclidean Cauchy–Schwarz and triangle inequalities have stated hypotheses. | Second-course audience; use only real finite coordinate cases, not arbitrary fields or general inner-product theory. |
| OpenStax *Calculus Volume 3* §2.3, https://openstax.org/books/calculus-volume-3/pages/2-3-the-dot-product (checked 2026-09-25) | Broad notation/dot-product comparator | Scalar output, equal-coordinate dimensions, symmetry/linearity/positivity and nonzero angle denominator. | Projection/application material belongs later. |
| MAA *Instructional Practices Guide*, https://maa.org/resource/instructional-practices-guide/ (checked 2026-09-25) | Undergraduate mathematics pedagogy baseline | Students should explain and test mathematical links, not merely receive assertions. | General guide, not an M13 outcome study. |
| Deng, Pizarro, Mesa & Judson, “Conceptions of span in linear algebra through analysis of student exam responses,” *Educational Studies in Mathematics* 123 (2026), 119–141, https://doi.org/10.1007/s10649-026-10496-3 (checked 2026-09-25) | Domain-specific mathematics-education evidence | 196 undergraduate exam responses across six semesters/institutions; some correct calculations led to invalid span conclusions. Require a public justification linking coefficient or obstruction evidence to a conclusion. | Matrix-based end-of-course question; its frequency findings do not directly estimate M13 learner outcomes. |
| IES/WWC, *Organizing Instruction and Study to Improve Student Learning*, recommendations 2, 3, 4, https://ies.ed.gov/ncee/wwc/practiceguide/1 (checked 2026-09-25) | General learning comparator | Interleave worked examples and problems; pair graphics with verbal descriptions; connect abstract and concrete representations. Each is rated **Moderate Evidence** by this guide. | The guide lists K–12 and postsecondary, but its heterogeneous study base does not directly validate this particular adult T22 route. |

### Pedagogy-Evidence Ledger

| Concept | Documented difficulty / population | Limit and plausible false model | Design consequence |
| --- | --- | --- | --- |
| Span conclusion | Deng et al. 2026: among undergraduate end-of-semester responses to whether matrix columns span `R³`, correct procedures could accompany invalid inferences. | Matrix setting and existing rank tools differ from M13. A plausible M13 failure is “the vectors look numerous, so they span.” | S04–S06 tasks score a coefficient witness or all-target argument, and an actual obstruction for nonmembership. A verdict alone earns little. |
| Abstract/algebraic/geometric connection | Deng et al. background synthesis identifies coordination of registers as difficult in tertiary linear algebra. | Not a direct test of this route or specific vector task. | Revisit the same generated set in coordinate equations, geometric line/plane, and membership evidence; assess the translation. |
| Pairwise versus collective dependence | Legacy ARC511 identifies this as a failure mode; not attributed to the Deng sample. | Theoretically plausible, not labelled empirical here. | Include three vectors with no parallel pair but a zero relation; require a certificate. |

## 3. Pre-authoring maps

### Concept dependency graph

`M01 scalar algebra + M03 proof` → typed `R^n` vectors → arithmetic → linear combination → span and subspace → nonmembership/redundancy → dependence → basis and unique coordinates → finite replacement/dimension; arithmetic → dot product → norm → Cauchy–Schwarz/triangle → nonzero angle/orthogonality. The final synthesis draws on both branches. None of the arrows uses an M14 matrix result.

### Conceptual-distinction map

- Point versus free displacement vector; coordinate order and unit meaning versus unlabeled lists.
- Scalar zero versus the zero vector; ambient `R^n` versus a subspace's dimension.
- One linear combination versus the set of *all* combinations; target membership versus spanning the entire ambient space.
- Counting generators versus proving span; a member of a span versus a basis of it.
- Pairwise non-parallel versus full linear independence; one trivial zero combination versus only trivial zero combination.
- Basis vector objects versus coordinates relative to a selected basis; basis nonuniqueness versus dimension invariance.
- Dot product as scalar versus componentwise vector product; alignment versus magnitude; orthogonality versus statistical independence.
- Zero dot product for nonzero vectors versus an undefined angle with a zero vector.

### Misconception / failure-mode map

Evidence tags: `D` = domain-specific study, `L` = legacy ARC511 requirement, `T` = theoretical counterexample.

| Failure | Tag | Discriminator |
| --- | --- | --- |
| Bare procedure or count asserted to prove span without a valid implication | D | Three or four generators where redundancy and missing direction must be reasoned separately. |
| Span mistaken for the original finite list or a single sum | L/T | Ask for the whole locus and an unlisted member. |
| Affine translated line/plane called a subspace | L/T | Test the zero vector and closure. |
| Pairwise nonparallel mistaken for full independence | L/T | Three-vector relation with each pair nonparallel. |
| A basis checked for only span or only independence | L/T | Two near misses, one for each missing condition. |
| `R³` coordinate length confused with plane dimension two | L/T | Construct basis of an origin-plane in `R³`. |
| Cosine computed with a zero vector or raw dot product called normalized similarity | L/T | Zero and differing-scale examples. |

### Representation progression map

| Representation | Introduced → connected → faded/reused | Independent evidence |
| --- | --- | --- |
| Ordered tuple and typed component table | S01 → displacement and units S02 → coefficient coordinates S03 | S02 Main and S17 synthesis. |
| Geometric arrow/line/plane | S02 → coordinate span S04–S05 → nonparallel/dependence S07 | S04 Transfer, S07 Main, S12 Transfer. |
| Coefficient equations | S03 → membership S04 → nonmembership S05 → dependence S07 → basis coordinates S10 | S04–S10 Main and S17. |
| Definition/proof of whole-set statement | M03 prior → subspace S06 → basis S09 → replacement S11 | S06, S09 and S11 Main. |
| Dot-product/norm table versus geometric angle | S13 → inequality S14 → angle/orthogonality S15–S16 | S14–S17 tasks. |

### Downstream obligation map

| Later owner | M13 handoff | Keep for later |
| --- | --- | --- |
| M14 SIDE276 | vectors, combinations, span, independence, bases/coordinates, finite dimension | matrices, elimination, rank/nullspace, change-of-basis matrices |
| M15 SIDE278 | dot product, norm, orthogonality, Cauchy–Schwarz and triangle | projections, Gram–Schmidt, least squares |
| M18 SIDE271 | vector inputs, norm and dimensional typing | total derivative, gradients/Jacobians/Hessians |
| Later numerical/statistical modules | independent directions and geometric language | conditioning, covariance models, inference |

### Narrative spine

First identify what can be added and scaled, then ask **what can this collection generate?** Ask whether a proposed target is reachable and whether the collection is redundant. From those two questions, build a basis that gives each reachable vector unique coordinates; justify why its size is intrinsic. Finally give those directions Euclidean magnitude and alignment, with proofs and boundary cases. Apply both strands to a new representation problem.

### Candidate pedagogical atoms and split/merge decisions

| Session | Central atom | Why this boundary |
| --- | --- | --- |
| S01 | typed vectors, zero and coordinate arithmetic | Start with object type; no geometric interpretation is assumed. |
| S02 | point/displacement and quantitative component meaning | Separate representation transfer and invalid operations from arithmetic. |
| S03 | finite linear combinations with variable coefficients | One calculation becomes a parameterized family. |
| S04 | span membership and coefficient witnesses | Pilot: first existential reasoning about a generated set. |
| S05 | nonmembership by obstruction; generator change | Universal nonexistence needs a distinct argument from finding a witness. |
| S06 | subspace closure and affine contrast | Generalizes span into a reusable set structure without matrices. |
| S07 | linear independence as zero-relation test | New universal/existential logical contract. |
| S08 | redundancy and collective dependence | Separate common pairwise fallacy from definition practice. |
| S09 | basis: two obligations and uniqueness | Integrates span and independence; proof of uniqueness. |
| S10 | constructing and comparing bases/coordinates | Moves from deciding to producing representation. |
| S11 | replacement bound and invariant finite dimension | Support proof must precede unqualified dimension claims. |
| S12 | subspace dimension and zero-dimensional case | Apply invariant in ambient versus internal geometry. |
| S13 | dot product and Euclidean norm | Algebraic definition and scalar/vector type before angle. |
| S14 | Cauchy–Schwarz and triangle bounds | Justify geometry before dividing by norms. |
| S15 | cosine/angle and zero-vector exception | Interpretation has domain and is not the definition. |
| S16 | orthogonality and magnitude-versus-alignment diagnosis | Contrasts useful interpretations without projection. |
| S17 | whole-module synthesis | Learner chooses an ordered basis and a scale-invariant directional diagnostic while organizing reachability, coordinates and geometry. |

**Sizing judgment.** Seventeen candidate sessions arise from 17 distinct acquisition/decision transitions above, not neighboring counts or the five historical arcs. Recheck after the S04 pilot; merge or split if its real learning load warrants it. No finished sessions beyond the pilot are authored before Gates 4–8 pass locally.

## 4. Pilot definition and next gate

S04 is representative: it introduces span as an infinite generated set and asks for coefficient witnesses, not mere arithmetic. Entry: S01–S03 and M03 existential witnesses. Support: finite combination definition. New capability: prove an elementary membership claim; explicitly distinguish a found target from spanning an entire space. Representation: coefficient equations ↔ geometric locus. Main will use a fresh generator pair; Transfer changes to a set with a constrained coordinate invariant and asks for a justified nonmembership or a coefficient witness. An independent assessment must not repeat the lesson's numerical instance. Build S04 only after the preceding three entry lessons exist or provide a pilot-only explicit bridge; review public prompts, references, rubrics and ownership literally before later authoring.

**Gate status at pre-authoring:** Gate 0 recovered; Gates 1–2 researched; Gate 3 selected S04 for the pilot and a 17-session candidate architecture. The pilot receipt is in `M13-PILOT-REVIEW.md`. Subsequent authoring followed this architecture; full-module integration and publication require separate evidence.
