# T22 Elite — M14 v1.2 Gate-9 Integration Review

Date: 2026-09-26  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**  
Review provenance: **builder-side integration review after independent R01–R11 repair; not an independent acceptance**

## Gate / scope

Gate 9 — review the assembled M14 as a learner route after the v1.2 bounded repairs.

Reviewed implementation checkpoint:
- `59f6ceaea143255d024fcb0b2b78460035024cfa`

Full workflow:
- https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36221875839
- run #462
- conclusion: **SUCCESS**

Artifacts inspected:
- `course/t22/authoring/m14-side276.json`
- all 19 lesson/guided surfaces
- all 38 current public tasks
- all 38 references and complete rubrics
- 60 ownership rows
- 38-task semantic-separation ledger
- 21 decision-audit rows
- 13 wrong-solver cases
- design/pilot/resolution/version receipts
- actual learner UI via `scripts/test-t22-elite-m14-browser.mjs`

## Learner-only pass

The first pass ignored evidence labels, builder verdicts and ownership rationales and read the route in delivery order from the learner-facing lesson/task surfaces.

### Entry and conceptual route

The route is coherent from the actual M13 exit:

basis/coordinates  
→ linear maps  
→ matrices as representations  
→ matrix-vector action  
→ composition/product  
→ `Ax=b`  
→ reversible elimination  
→ pivots/free variables  
→ null space  
→ complete affine solution  
→ column space  
→ rank/nullity  
→ injective/surjective structure  
→ invertibility  
→ inverse construction  
→ determinant algebra/geometry  
→ coordinate change  
→ similarity  
→ synthesis.

No learner-facing step requires projection, least squares, eigenstructure or numerical-conditioning machinery.

### Pedagogy

**PASS_WITH_EVIDENCE.**

Strong learner-facing features:
- maps precede matrix arithmetic;
- row and column meanings recur rather than appearing once;
- elimination is justified through reversible equations before it becomes a procedure;
- null space and column space are repeatedly typed in different ambient spaces;
- invertibility is structurally owned before determinant is allowed to certify it;
- coordinate arrows precede similarity;
- guided feedback remains staged after an attempt.

The independent review's S19 criticism was valid: the prior Main was a good integration exercise but supplied the organizing recipe. The repaired `S19-M@2` now requires the learner to choose an attack order and justify at least two representation/method choices while preserving explicit, fair output obligations.

### Coherence

**PASS_WITH_EVIDENCE.**

The three later strands remain connected:
- systems → kernel/image/rank → invertibility;
- square-map structure → determinant;
- basis coordinates → change of basis → similarity.

S19 reunites these without importing M15/M16 machinery. No session was found that needs to move, split or merge after the R01–R11 repairs.

### Information flow

**PASS_WITH_EVIDENCE.**

Definitions and support arrive before use:
- echelon form before pivot/free classification;
- nullspace before complete solution;
- column-space/original-pivot-column distinction before rank;
- rank-nullity before rectangular injective/surjective classification;
- square equivalences before inverse construction;
- determinant row rules before singularity/geometry;
- coordinate conversion before similarity.

The S14 elementary-matrix bridge remains explicit, and S11 now publicly observes the general rank-nullity derivation rather than leaving it only in instruction.

### Syllabus coverage

**PASS_WITH_EVIDENCE.**

The declared SIDE276 boundary is covered without pulling:
- projection / Gram–Schmidt / least squares;
- eigenvalues / eigenvectors / diagonalization;
- QR / Cholesky / SVD / pseudoinverse;
- numerical rank / conditioning / stable pivoting;
- Jacobians / Hessians / matrix calculus.

## Different-order integration pass

### 1. Prerequisite walk

Walking S01→S19 using only M13 plus earlier M14 ownership revealed no unresolved hidden mathematical prerequisite after the S14 elementary-matrix and S11 rank-nullity repairs.

### 2. Public assessments read together

The 38 current prompts were read without their evidence labels.

Findings:
- no current fixed Main duplicates the answer-bearing worked/guided instance in S05, S06, S07 or S17;
- `S07-T@2` is now an error-diagnosis surface rather than a coefficient/right-hand-side perturbation;
- `S11-M@2`, `S18-M@2` and `S19-M@2` visibly contain their new public obligations;
- no current prompt consumes future M15+ machinery.

### 3. Ownership mappings grouped by capability

All 60 claims now include generalization distance.

The mandatory pass found and repaired overreach beyond the independent review:
- S04 product-column wording;
- S13 missing-pivot branch;
- S16 n-dimensional volume wording;
- S01 finite-dimensional scope.

No remaining claim requires ownership merely because a stronger nearby theorem implies it.

### 4. Rubrics against prompts

Changed-task rubrics were reread against their current prompts:
- S07-T@2 scores all three no/one/many classifications and the general rule;
- S11-M@2 separately scores the concrete count and general `r+(n-r)=n` argument;
- S18-M@2 scores the determinant-invariance proof, not only the numerical equality;
- S19-M@2 scores the organizing route choice in addition to mathematical outputs.

The 13 deliberate wrong solvers fail actual cited rubric rows rather than an invented evaluator contract.

### 5. Cross-session exposure

The old literal matrix scan remains only a candidate finder.

The authoritative Gate-8 artifact is now the 38-task semantic ledger. For every current task it records:
- closest relevant answer-bearing instruction;
- the mathematical difference;
- an exposure disposition.

No unresolved exact-answer exposure remains in the current unpublished candidate.

### 6. Transfer and synthesis

Every Transfer slot is now primarily classified `changed-surface Transfer` and stores a separate mechanism description.

The most material repair is S07-T@2. It changes from solving a near-copy to auditing three already-reduced systems with incorrect labels.

S19-M@2 now leaves the organizing decision to the learner. It does not make the output requirements ambiguous; it requires a coherent audit and scored method/representation justification.

## Artifact-first Gate-11 finding

The first M14 learner-UI browser run after adding the unpublished-candidate probe failed because a long evaluator surface caused horizontal overflow at 390px mobile width.

This was a genuine rendering defect.

Repair:
- `css/t22-course.css` now adds bounded wrapping/min-width behavior to learner text/problem surfaces;
- the exact new CSS blob is pinned in the M11 preserved-runtime baseline with an explicit M14 shared-runtime repair receipt;
- no accepted curriculum content blob was changed.

Retest:
- full run #462 passed every inherited structural regression;
- M01–M13 browser checks passed;
- the unpublished M14 probe rendered **355 learner surfaces** across all 19 lessons/guided states and 38 prompt/reference/rubric paths;
- export/import/reload also passed;
- no text corruption or horizontal overflow remained.

This is the strongest new Gate-11 evidence produced by the v1.2 repair round.

## Remaining limits

- This Gate-9 pass is still builder-side reasoning, not independent acceptance.
- There has been no real learner trial of M14.
- Automated math gates are not machine proof oracles for prose proofs; they combine executable arithmetic/property checks with reviewed semantic assertions.
- The independent reviewer must still confirm that R01–R11 are actually closed.

## Gate-9 result

**PASS_WITH_EVIDENCE for the repaired candidate.**

Architecture decision:
- **KEEP 19 sessions**
- no rebuild
- no session split/merge currently justified

Acceptance decision:
- **NOT independently accepted**
- repaired candidate should proceed only to focused independent follow-up

## Stop boundary

M14 remains unpublished.  
M13 remains the learner frontier.  
M15 remains closed.  
Do not merge/publish until independent follow-up accepts the repaired M14 candidate.
