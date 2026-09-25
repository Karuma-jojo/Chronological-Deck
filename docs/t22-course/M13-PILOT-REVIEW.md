# M13 S04 pilot review — builder reconstruction

Scope: `course/t22/authoring/m13-arc511.json` S01–S04 at the local pilot snapshot `m13-arc511-pilot-v0.1`; 2026-09-25. This is self-review, not an independent acceptance or a published module. The canonical candidate later grew to 17 sessions; this receipt describes the pilot state and subsequent S04 overlap correction.

## Gate 4 — instruction: PASS_WITH_EVIDENCE

Entry skills are taught in S01–S03: typed vectors, interpreting components, unrestricted real linear combinations. M03 S05 provides existential witnesses, and M01 S13 provides elementary simultaneous-equation solving. S04 defines span as a set of *all* combinations, then works an R³ example with complete coefficient calculation and coordinate verification. The guided R² example works the two equations and checks the generated vector. The all-target quantifier is contrasted with one-target membership. No matrix/rank language is used as a premise.

The worked example's `u=(1,0,3)`, `v=(0,1,-2)`, `t=(3,-2,13)` has coefficient witness `(3,-2)`. The fixed Main uses `u=(1,2,0)`, `v=(0,-1,1)`, `t=(2,3,1)`; it is a distinct instance, not an answer-bearing rehearsal. The fixed Transfer is a parameterized family with different generators.

## Gate 5 — purpose and decision: PASS_WITH_EVIDENCE

Main asks the learner to construct and check coefficients for a fresh target, then state why that does not prove all of R³ is generated. The prompt prescribes coordinate equations, so the evidence claim does **not** say the learner chose this method. Main is labeled fresh instance evidence, not fresh method invention. Transfer changes the quantifier from one target to all values of `(r,s)`, requiring symbolic witnesses valid for arbitrary reals. The prompt does not supply the coefficients.

Wrong solver: answering “yes, because there are two nonzero vectors” gives no coordinate witness and fails Main rows 1–3. Answering the Transfer using only `r=s=1` fails its arbitrary-parameter and all-coordinate rows. A correct alternate solution can use equations in another order; the rubric scores the mathematical witness, not a unique presentation.

## Gate 6 — independent solution and fair rubric: PASS_WITH_EVIDENCE

Main: `au+bv=(a,2a-b,b)`. Matching `(2,3,1)` forces `a=2,b=1`, and the middle coordinate checks `2a-b=3`. The one-target existence statement is logically weaker than `∀w∈R³ ∃a,b: au+bv=w`. The reference's optional counterexample `(0,1,0)` is correct but the public prompt does not demand one; the rubric gives no points specifically for it.

Transfer: `ag+bh=(a,2b,a+b)`. For arbitrary `r,s`, `a=r,b=s` yields `(r,2s,r+s)`. All three rubric rows correspond to explicit public requests. Neither task requires a determinant, rank theorem or M14 algorithm.

## Gate 7 — ownership observability: PASS_WITH_EVIDENCE

Three narrowed claims have exact public prompts and rubric rows. The initial wording “Define the span of a finite generator list” exceeded Main's public request, which asks for coordinate equations but not a general definition. It was repaired to “Represent span{u,v} as a family with arbitrary real coefficient choices.” The remaining claims cite the literal coefficient witness and the explicit single-target versus entire-space explanation. Correct answers cannot earn these rows through an unsupported yes/no alone.

## Gate 8 — answer exposure: PASS_WITH_EVIDENCE, local scope

S04 instruction gives the reusable technique but neither fixed generator/target instance nor its numeric coefficients. Earlier S01–S03 lessons have no solved S04 target. Main and Transfer differ in objects and in one-target versus whole-parameter-family quantification. A later whole-module check found that the first S04 worked generator pair exactly repeated S03 Transfer's unrestricted generator pair; it was replaced with the distinct `(1,0,3),(0,1,-2)` instance above. The S03 Transfer is now free of that exact solved-subanswer exposure. The full module still needs a fresh integration check.

## Local status and next action

Pilot S01–S04 has a complete lesson/Main/Transfer/reference/rubric/claim slice and a builder-only Gates 4–8 receipt. Before publishing, the remaining sessions must be authored one at a time and the entire module must pass integration, canonical-state, mathematical, browser and pushed-head checks. M13 remains absent from the shared learner registry.
