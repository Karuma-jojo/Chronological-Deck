# T22 Elite — M14 Review Handoff

Date: 2026-09-26  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**

## Current authority

Canonical candidate:
- `course/t22/authoring/m14-side276.json`

Builder/adversarial resolution:
- `docs/t22-course/M14-RESOLUTION.md`

Verification dossier:
- `docs/t22-course/M14-VERIFICATION.md`

Latest green full workflow before this handoff/status documentation:
- run: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36219131246
- head: `9b2a61aa4059dabdae60dd2217361849347ff4be`
- conclusion: **SUCCESS**

A final exact-head workflow must also be green after this handoff and its checker land.

**Current status: builder-verified and adversarially repaired; awaiting independent review. M14 is not published.**

## Architecture preserved

M14 has **19 design-derived sessions**, **38 fixed assessments** and **60 literal ownership claims**:

1. Linear maps before matrices
2. A matrix is a map written in chosen coordinates
3. Matrix-vector action is a column combination
4. Composition makes matrix multiplication inevitable
5. A linear system has row and column meanings
6. Row operations preserve the solution set
7. Pivots and free variables classify exact solutions
8. The null space records inputs erased by a map
9. Every consistent solution set is a translated null space
10. Column space is the set of reachable outputs
11. Rank and nullity count reachable and invisible directions
12. Injective and surjective mean different things for rectangular maps
13. For square maps, the invertibility conditions collapse together
14. Construct an inverse only after it exists
15. Determinant algebra before determinant folklore
16. Determinant measures oriented volume collapse, not conditioning
17. Changing coordinates does not change the vector
18. Similar matrices are the same operator in different bases
19. Synthesis: one map, many representations

No session count was borrowed from M13 or the legacy eight-arc SIDE276 inventory.

## Source stack actually used

### Deep textbook comparator

The complete user-supplied **571-page Strang 4e** scan was used, especially:
- Ch.2 §§2.1–2.5;
- Ch.3 §§3.2–3.4;
- Ch.5 §§5.1, 5.3;
- Ch.7 §§7.1–7.2.

It shaped the row/column/system/map interplay, elimination/rank/nullspace progression, determinant meaning and change-of-basis route.

### Other roles

- MIT OCW 18.06 / 18.06SC — university route comparator
- Axler 4e — theorem/hypothesis and basis-direction comparator
- Hefferon — developmental first-course comparator
- MAA + IES/WWC — pedagogy/evidence baseline
- Dorier/Hillel/Sierpinska — representation coordination
- Oktaç — linear-transformation learning difficulty
- Trigueros/Possani — matrix multiplication through transformations
- Ramirez/Oktaç — equivalent-system meaning
- Caglayan — similarity/change-of-basis coordination
- Kazunga & Bansilal (2018) — determinant misconception comparator with exact DOI/population limits now pinned

## Formal boundary

Prerequisite:
- **M13 / ARC511 only**

M14 owns:
- finite real linear maps and basis-dependent matrices;
- matrix-vector action and composition/product;
- exact systems/elimination;
- null space / column space / rank / nullity;
- injective/surjective structure;
- square invertibility and exact inverse construction;
- determinant algebra/singularity/geometry;
- vector coordinate change and operator similarity.

M14 explicitly does **not** own:
- M15 projection / Gram–Schmidt / least squares;
- M16 eigenvalues / eigenvectors / diagonalization;
- M17 QR / Cholesky / SVD / pseudoinverse / PSD;
- M23 numerical conditioning / numerical rank / stable pivoting / LU;
- M18–M19 Jacobians, Hessians or matrix calculus.

## Material findings already repaired

Do not assume the clean current candidate was clean on first draft. The builder-side adversarial pass found real defects:

- S04 associativity was taught but not observed;
- S05 Main duplicated a worked system;
- S06 Main duplicated guided practice;
- S07 Main duplicated the worked system;
- S17 Main reused the guided basis-change matrix/inverse;
- S14 silently consumed the elementary-matrix left-multiplication fact;
- the echelon definition was under-explicit;
- several ownership claims exceeded literal public observers;
- several Main evidence labels were too optimistic;
- fixed-task mathematics and instructional mathematics lacked separate executable gates;
- determinant-pedagogy sourcing was too vague.

Every item above is repaired and documented in `M14-RESOLUTION.md`.

## Evidence semantics after repair

Main classifications:
- proof reconstruction: **5**
- retrieval: **6**
- proof reconstruction + application: **3**
- retrieval + structural classification: **1**
- retrieval + integration: **1**
- retrieval + proof reconstruction: **1**
- proof reconstruction + fresh application: **1**
- fresh Main evidence: **1** — S19 synthesis only

Transfers:
- changed-surface Transfer: **12**
- failure-mode Transfer: **1**
- changed-constraint Transfer: **1**
- misconception-audit Transfer: **2**
- forensic Transfer: **1**
- direction-audit Transfer: **1**
- adversarial synthesis Transfer: **1**

These labels describe distance from instruction, not task quality.

## Verification already available

### Structure / evidence

`scripts/test-t22-elite-m14.mjs` checks:
- 19 sessions / 38 tasks / 60 claims;
- exact stable IDs;
- 10-point evaluators;
- claim→task→current-public-prompt→rubric locators;
- adequate dispositions;
- design/pilot/source roles;
- answer-bearing matrix overlap;
- explicit regressions for the non-matrix exposure defects;
- future-boundary non-consumption;
- selected independent mathematics.

### Fixed-task mathematics

`docs/t22-course/audit/m14-math-checks.mjs` reconstructs/checks all 38 fixed assessments across S01–S19.

### Instructional mathematics

`docs/t22-course/audit/m14-instruction-math-checks.mjs` separately checks worked/guided mathematics across **19/19 sessions**.

### Inherited regression / browser

The complete T22 workflow remains mandatory. M14 is not registered in the learner route, so the Chromium workflow verifies that the accepted M01–M13 route still renders and behaves correctly while M14 remains isolated.

## Independent reviewer: priority attack list

A good review should try to break the candidate, not simply confirm the builder's receipts.

### 1. S01–S04 — representation foundation

Ask:
- Is the map really primary, or does matrix syntax creep in before meaning?
- Does S01's basis-determines-map reasoning rely only on M13?
- Does S04 genuinely establish product order and associativity without rote mnemonics?
- Can a learner pass S04 by dimension matching while misunderstanding process order?

### 2. S05–S07 — systems/elimination

Ask:
- Are row and column pictures kept distinct but connected?
- Is every row operation justified as reversible on the **whole augmented equation**?
- Does S07 truly discriminate no/one/many solutions instead of equation-count heuristics?
- Are the repaired Main objects genuinely fresh from worked/guided answers?

### 3. S08–S12 — kernel/image/rank

Ask:
- Are nullspace and column space always placed in the correct ambient spaces?
- Does S10's original-pivot-column argument really establish why RREF columns are not the answer?
- Is S11's free-variable basis proof sufficient for rank-nullity?
- Are injective/full-column and surjective/full-row distinctions preserved for rectangular maps?

### 4. S13–S16 — invertibility/determinant

Ask:
- Does S13 derive equal-dimension equivalences without determinant circularity?
- Is the S14 elementary-matrix bridge mathematically sufficient and learner-level clear?
- Does S15 use determinant multilinearity correctly without turning determinant into a cofactor drill?
- Does S16 prove singularity equivalence without smuggling in eigenvalues?
- Is conditioning mentioned only as a non-import boundary?

### 5. S17–S19 — coordinates/similarity/synthesis

Ask:
- Is every `P_{B←C}` direction consistent?
- Does S18 derive, rather than memorize, `P^{-1}AP`?
- Are rank/determinant/invertibility invariants justified without eigenstructure?
- Does S19 actually require choosing/connecting representations rather than replaying isolated chapter exercises?

### 6. Ownership audit

For every one of the **60** claims ask:

> Does the learner literally perform this capability in the cited public task and rubric, or is the mapping merely mathematically related?

Do not award ownership because:
- the lesson teaches it;
- the reference contains it;
- another nearby criterion could imply it;
- the theorem is true.

### 7. Checker audit

Attack both new math gates:
- do they independently reconstruct mathematics or only pin current prose?
- can a wrong worked example survive because only fixed references are checked?
- can a wrong fixed reference survive because only strings are checked?

## Files for review

Primary:
- `course/t22/authoring/m14-side276.json`
- `docs/t22-course/M14-DESIGN-GATE.md`
- `docs/t22-course/M14-PILOT-REVIEW.md`
- `docs/t22-course/M14-RESOLUTION.md`
- `docs/t22-course/M14-VERIFICATION.md`

Executable evidence:
- `scripts/test-t22-elite-m14.mjs`
- `docs/t22-course/audit/m14-math-checks.mjs`
- `docs/t22-course/audit/m14-instruction-math-checks.mjs`
- `.github/workflows/t22-elite-checks.yml`

Repository authority/boundary:
- `docs/t22-rebuild/M65-SKELETON.md`
- `docs/t22-rebuild/m65.dependencies.json`
- `docs/t22-rebuild/SEMANTIC-PREREQUISITES.json`
- `course/t22/authoring/m13-arc511.json`

## Stop boundary

**Independent review M14 only.**

Do not:
- publish/register M14;
- open M15;
- merge to main;
- alter accepted M01–M13;
- migrate legacy progress.

If the independent review finds bounded defects, repair M14 only and rerun the complete suite. Reopen the 19-session architecture only if concrete evidence requires it.
