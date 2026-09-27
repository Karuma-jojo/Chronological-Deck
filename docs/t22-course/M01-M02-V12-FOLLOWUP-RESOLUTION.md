# M01 + M02 v1.2 independent-review follow-up — R01–R08 resolution

> **Lang-foundation continuation — 2026-09-27**  
> R01–R08 remain repaired. A subsequent independent Lang-grounded end-to-end audit found L01–L10: false or too-shallow prerequisite provenance around coordinate/Pythagorean distance, real exponentials, trig addition formulas, binomial expansion, AP pairing, special triangles, algebraic laws, system cases and readiness coverage. Those are handled in `M01-M03-M10-LANG-FOUNDATION-FOLLOWUP.md`. The earlier R01–R08 acceptance question is therefore superseded by this broader prerequisite-depth reconfirmation gate.


Date: 2026-09-27  
Repository: `Karuma-jojo/Chronological-Deck`  
Repair branch: `codex/t22-m01-m02-v12-followup`  
Independent-review target: `cb4240fb34c28826182e838aae9943d1bd406f15`  
Scope: **R01–R08 only. No rebuild. Preserve M01=17 sessions and M02=24 sessions.**

## Status

**BOUNDED REPAIR IMPLEMENTED; INDEPENDENT RECONFIRMATION PENDING.**

The independent review correctly identified a distinction the generic validators could not prove: referential integrity of a claim-evidence row is weaker than semantic observability of the claimed learner action.

The repair therefore keeps the general 85/85 and 120/120 integrity checks, but adds pinned semantic assertions for the exact rows that failed adversarial review.

## R01 — M02 S23 graph leaked its own parameters

**Finding:** the Transfer told the learner to read amplitude/midline/period from a graph while the same visible prompt disclosed `y=−3cos(2x)+4`, so the graph was unnecessary.

**Repair:** the graph-reading stage now discloses no algebraic rule. The learner must:

- read amplitude and midline from the rendered curve;
- determine the period from the graph;
- cite matching extrema one full cycle apart as evidence.

A separate equation, `cos(4x)=0` on `[0,π/2)`, tests bounded cosine solving but is explicitly unrelated to the graph and uses different frequency information.

The Transfer is now `obligationVersion=3`.

Pinned regression: the S23 public prompt must start with graph-only reading, must not contain the graph's underlying formula, and the rubric must require matching-extrema evidence.

## R02 — M01 S09 equality preservation was inferential

**Finding:** “Preserve equality at each simplification step” pointed to a final-answer rubric. A learner could jump directly to `7x−27`.

**Repair:** S09 Transfer now explicitly requires a visible equality chain with at least two intermediate equivalent expressions, including the fully distributed line before collecting like terms.

The rubric separately scores:

- correct distribution/like-term collection;
- a displayed chain in which every line is equivalent to the previous line;
- numerical verification;
- correct interpretation of the numerical check as a check, not proof.

The Transfer is now `obligationVersion=2`.

Pinned regression: the exact ownership row must point to the explicit equality-chain rubric criterion.

## R03 — M01 S14 interval/ray testing mapped to the wrong task

**Finding:** “Express and test the resulting interval or ray” pointed to Transfer, which reads a supplied number line but contains no test point.

**Repair:** the exact claim-evidence row now points to **Main**, which already requires exact interval/ray descriptions plus satisfying and failing test points.

Coverage for that compound ownership row is narrowed to Main.

Pinned regression: the row must map to Main and include the existing inside/outside-test rubric criterion.

## R04 — M02 S21 claimed radians↔degrees but assessed one direction

**Finding:** both fixed tasks converted degrees to radians; neither required radians to degrees.

**Repair:** S21 Transfer now requires:

- `−45° → −π/4`;
- `7π/6 radians → 210°`;
- unit-circle coordinates for `−45°`;
- oriented arc displacement for radius 10.

The Transfer is now `obligationVersion=2`.

The bidirectional ownership row maps to that Transfer and names both conversion rubric criteria.

Pinned regression: both directions must remain public and separately scored.

## R05 — M02 S24 domain-check ownership was unobserved

**Finding:** the integrated Transfer selected/modelled a sinusoid but never asked for a domain check.

**Repair:** S24 Transfer now explicitly requires the learner to distinguish:

- the natural real domain of `p(θ)=2+3sinθ`, namely `θ∈ℝ`;
- the restricted solution interval used by the task, `[0,2π]`.

The Transfer remains table→model changed-surface evidence and is now `obligationVersion=3`.

Pinned regression: the public prompt, rubric and exact claim-evidence row must all include the natural-versus-restricted domain distinction.

## R06 — M01 S08 exponent-law observer named only a prohibition

**Finding:** the assessment did positively exercise exponent laws, but the exact metadata pointed to “does not misuse exponent laws across addition.”

**Repair:** no task change. The ownership row now points to the positive rubric observers:

- scientific-notation multiplication;
- `16^(3/4)=8` with valid power/root reasoning.

Pinned regression: the row must retain those positive observers.

## R07 — M02 S23 period ownership did not require 2π/|B|

**Finding:** the period claim said “Compute period `2π/|B|`,” while the exact observer merely read period from the graph.

**Repair:** S23 Main is now `y=2sin(4(x−π/6))+1` and explicitly requires the learner to substitute `B=4` into `2π/|B|`, giving `π/2`.

The Main is now `obligationVersion=2`.

The period ownership row maps to this explicit formula computation. Graph-period reading remains separately useful Transfer evidence but is no longer used as the exact observer for the formula-computation claim.

Pinned regression: the Main prompt and rubric must literally require `2π/|B|`.

## R08 — M01 infinite ray relied on the axis arrow

**Finding:** Set A touched the frame edge and prose explained continuation, but the visible arrowhead belonged to the number-line axis rather than the interval itself.

**Repair:** the number-line representation schema now supports `continueFrom` / `continueTo`. Set A carries `continueFrom:true`, and the renderer draws a blue interval-specific continuation arrow on the ray itself.

Because the assessed representation changed materially, S14 Transfer is now `obligationVersion=3`; its fingerprint therefore changes.

Pinned regressions:

- authored representation must declare `continueFrom:true`;
- real Chromium must render exactly one `.repr-interval-arrow` on the S14 assessed surface.

## Semantic-validator lesson

The generic validators remain valuable but are intentionally not misrepresented.

They prove:

- required-ownership text matches the canonical claim;
- the mapped fixed task exists;
- the public request is current;
- the named rubric criterion exists verbatim.

They do **not** by themselves prove that the rubric semantically observes the claim. For the eight reviewed defects, dedicated assertions now encode the stronger semantic contract.

This follow-up does not attempt to solve semantic observability generically with keyword heuristics.

## Architecture and boundary disposition

- M01: **17 sessions / 34 fixed tasks — KEEP**
- M02: **24 sessions / 48 fixed tasks — KEEP**
- M03+ ownership: unchanged
- readiness routing: unchanged
- assessed-representation fingerprinting: unchanged
- delayed retrieval: unchanged
- rational-exponent repair: unchanged
- completing-square derivation: unchanged
- no new syllabus topics added

## Exact-head repair validation

Repair implementation head: `ea31220ef08b298efd6f176b2a6eb0b537ffd7c2`  
T22 Elite workflow: run `36303881977`, job `108576593815` — **SUCCESS**

Inspected logs confirm:

- M01 v1.2 follow-up PASS: 17 sessions / 34 tasks / 85 exact claim-evidence rows; R02/R03/R06/R08 semantic observers pinned; interval-specific ray arrow guarded; inherited separation/exposure/fingerprint/math checks green.
- M02 v1.2 follow-up PASS: 24 sessions / 48 tasks / 120 exact claim-evidence rows; R01/R04/R05/R07 semantic observers pinned; graph-only S23 evidence, bidirectional degree/radian conversion and S24 domain checks guarded.
- Real Chromium PASS: R01/R04/R05/R08 public surfaces, readiness/rendered-representation traversal, mobile width, shared evidence preservation, save/reveal/review, export/import, packet exposure, fresh-probe and historical-provenance workflows all passed.

This is builder/repair verification, not independent reconfirmation.

## Validation gate

Do not mark the retrofit independently confirmed from this builder repair.

Required closure sequence:

1. exact repair branch is structurally/semantically coherent;
2. shared T22 branch must still equal the reviewed `cb4240…` head before publication;
3. fast-forward the shared branch only if that condition holds;
4. run the complete standing T22 workflow on the exact published head;
5. inspect syntax, structural/pedagogy/semantic/evidence and real Chromium results;
6. stop for the independent reviewer's bounded R01–R08 follow-up.

Correct status until step 6 is accepted:

**M01/M02 v1.2 retrofit — R01–R08 repaired; independent reconfirmation pending.**
