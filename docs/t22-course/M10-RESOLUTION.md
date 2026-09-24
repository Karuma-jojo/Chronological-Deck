# T22 Elite — M10 Semantic/Evidence Resolution

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M10 · Derivatives & Local Linearity (`ARC053`)**

## Status

This document records a **bounded semantic/evidence repair of M10 only**.

It does **not** claim independent pedagogical acceptance.

The mathematically repaired implementation was verified at:

- implementation head: `207db95e3186dc9127c92222dea2dd68ca6fc37f`
- T22 Elite Actions run: `35996509740`
- job: `107622609998`
- conclusion: **SUCCESS**

The exact logs report:

- PASS M09 — existing M09 structural/semantic/evidence/provenance checks remain green.
- PASS M10 semantic/evidence repair — all 72 original ownership claims audited; 69 observable claims retained; five versioned task repairs; arbitrary claim/rubric counts; M09+M10 global instruction separation; asymptotic notation repaired; M01–M09/runtime blobs preserved.
- PASS M09 mathematics.
- PASS M10 independent mathematics after semantic repair — unchanged answers retained and all five version-2 assessments independently reconstructed with symbolic, numerical, domain and hypothesis checks.
- PASS browser — inherited real Chromium learner/evidence workflow.

Run URL: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35996509740

## 1. Repair boundary

Preserved:

- the 24-session M10 route;
- session order and stable session/task IDs;
- derivative/local-linearity mathematical spine;
- M09→M10 dependency flow;
- source dossier;
- theorem/domain/hypothesis discipline;
- M01–M09 content and baseline hashes;
- shared learner runtime/evidence identifiers;
- M10's unregistered status in the shared runtime;
- M11 closed.

No M01–M09 authoring pack was modified.

No M11 file was opened or authored.

## 2. All-72 ownership audit

Machine-readable audit:

`docs/t22-course/audit/m10-ownership-audit.json`

Every one of the original 72 claims was reviewed against the actual public Main/Transfer request and the exact cited rubric rows using the question:

> Does the learner actually perform this capability in the cited fixed assessment, rather than merely encounter related mathematics?

Results:

- original ownership claims: **72**
- repaired observable ownership claims: **69**
- unsupported claims removed: **3**
- materially changed public fixed assessments: **5**

The three removed ownership claims were:

1. **S06** — “Use discontinuity as a valid screen against differentiability.”  
   The theorem was taught, but neither fixed task directly asked the learner to use the contrapositive screen.

2. **S10** — “Use the proved rule only within its established exponent scope.”  
   The tasks stayed inside positive-integer exponents but did not ask the learner to identify or defend the scope boundary.

3. **S13** — “Extend the power rule to negative integer exponents on their legal domain.”  
   Negative powers were taught, but neither fixed task directly assessed that extension.

These were removed rather than inferred from nearby mathematics.

## 3. Five material assessment repairs

Stable task IDs were retained and `obligationVersion` was incremented to **2**.

### S12 Main — product rule

`T22V3::ARC053::S12-M@1`

Old defect: Main merely applied the product rule while ownership claimed derivation.

Repair: Main now reconstructs the rule from an exact product increment, explicitly controls the cross term, then applies the rule numerically.

The claim is deliberately worded **“Reconstruct the product rule…”**, not “freshly prove,” because the lesson already teaches the derivation.

### S14 Transfer — chain rule proof safety

`T22V3::ARC053::S14-T@1`

Old defect: the task produced a chain-rule coefficient but did not observe the claimed avoidance of division by a possibly zero inner increment.

Repair: Transfer now requires the learner to compose local models, show `k(h)/h` is locally bounded, and handle values with `k(h)=0` explicitly.

### S15 Transfer — missing factor versus domain restoration

`T22V3::ARC053::S15-T@1`

Old defect: Transfer mainly audited domain restoration, while ownership also claimed diagnosis of a missing chain factor/wrong evaluation.

Repair: Transfer now presents both errors explicitly and requires diagnosis of each before giving the correct derivative/domain.

### S20 Main — natural exponential foundation

`T22V3::ARC053::S20-M@1`

Old defect: ownership claimed the normalization and derivation of `(e^x)'=e^x`, but fixed tasks merely applied the exponential derivative.

Repair: Main now requires the learner to state the adopted zero-point normalization and reconstruct the derivative of `e^x` before applying the chain rule.

Classification: **proof reconstruction**, not fresh proof evidence.

### S21 Main — arbitrary-base exponential/logarithm family

`T22V3::ARC053::S21-M@1`

Old defect: `(b^x)'=b^x ln b` was claimed but not directly assessed; the ln/log_b mapping was also broader than the public task.

Repair: Main now directly derives:

- `(b^x)'=b^x ln b`;
- `(log_b x)'=1/(x ln b)`;
- `(ln x)'=1/x` as the `b=e` case;

and then applies the log derivative through a composition.

S21 remains one session. Main observes the inverse-linked exp/log derivative family; Transfer separately observes logarithmic differentiation with positivity. Splitting would duplicate the same prerequisite structure without resolving an evidence problem.

## 4. High-priority claims repaired without rewriting strong tasks

### S13

Ownership was narrowed to what the fixed tasks actually observe:

- use the quotient rule with denominator condition;
- preserve the original domain after simplification.

The untested negative-integer power ownership claim was removed.

### S16

The cosine Main is explicitly classified as **proof reconstruction**.

The guided practice already supplies:

- the cosine addition identity;
- the two M09 normalized limits required to finish the proof.

The task remains valuable, but it is no longer treated as fresh independent proof evidence.

### S17

The original mapping mixed derivation, composition and domain evidence.

Ownership was rebuilt as:

- use established tan/sec/cot/csc rules with correct signs;
- apply a non-sine/cosine trig derivative through composition;
- state inherited denominator-domain restrictions.

Rubric links now match those actions directly.

### S18

The lesson already proves the scoped inverse-derivative theorem.

Ownership was narrowed from “state and prove” to **apply the scoped relation with hypotheses visible**.

Branch choice, inverse-point matching and the nonzero forward derivative remain directly assessed.

### S23

The tasks were preserved.

Only the semantic mappings were repaired:

- Main A/C observe domain/definition legality;
- Transfer observes differentiability without continuity of `g'`;
- Main B/C observe correct formula-on-domain versus illegal restored-point evaluation.

## 5. Asymptotic-notation prerequisite repair

M09 does not own little-o or big-O notation.

M10 now introduces little-o explicitly in **S07**:

> `r(h)=o(h)` as `h→0` means exactly `r(h)/h→0`.

This is described as shorthand only; systematic asymptotic notation remains M12.

S14 no longer uses formal `O(h)`.

Instead it proves the concrete fact needed for the chain-rule argument:

- `k(h)/h` tends to a finite limit;
- therefore `k(h)/h` is locally bounded;
- the outer remainder is controlled without assuming `k(h)≠0` for every nearby `h`.

The validator rejects any formal `O(h)`/ `O(k)` leak in M10.

## 6. Global assessment-independence audit

Every Main and Transfer was re-read against:

- every legally available M09 lesson;
- every preceding/current M10 lesson;
- worked examples;
- guided practice.

Primary classifications after repair:

- **10 retrieval** Main tasks;
- **7 proof reconstruction** Main tasks;
- **7 fresh Main evidence** tasks;
- **24 changed-surface Transfer** tasks.

These labels are descriptive, not mastery grades.

In particular, reconstruction is not promoted to fresh proof evidence.

The global mechanical screen now also includes **all M09 instruction**, not only M10 instruction, and checks prompts/references against legally available text. The semantic classification remains the controlling interpretation; lexical separation alone is not treated as proof of independence.

Machine-readable reviewed contract:

`docs/t22-course/audit/m10-semantic-contract.json`

## 7. Rubric-shape repair

M10 no longer assumes:

- exactly three ownership claims per session;
- exactly three rubric rows per task;
- a Main / Main+Transfer / Transfer ownership pattern.

The repaired validator accepts the shape required by the mathematics while requiring:

- every retained claim to be in `requiredOwnership`;
- every cited task to appear in the public request;
- every cited rubric row to belong to the cited task;
- at least one observable rubric action for every ownership claim;
- every task rubric to total 10 points.

## 8. Evidence / version handling

Five materially changed public assessments use `obligationVersion: 2`.

All other fixed task IDs and obligation versions remain unchanged.

M10 has never been registered in the shared learner runtime. Therefore:

- no M10 runtime learner evidence exists to silently recertify;
- no historical M10 answer exposure requires migration;
- the pack explicitly records the unregistered/no-migration condition.

The existing M01–M09 evidence/provenance behavior remains untouched and passed the inherited browser workflow.

## 9. Flow and hidden-prerequisite reread

The complete S01→S24 progression was reread after repair.

No new mathematical-spine defect was found.

Key dependency sequence remains coherent:

- S01–S06: derivative object, interpretation, existence, derivative function, continuity;
- S07–S08: local linearity and first-order approximation;
- S09–S13: linearity, powers, polynomials, product, quotient/domain;
- S14–S15: chain rule and nested/domain forensics;
- S16–S17: trig derivatives from M09 radian limits;
- S18–S19: inverse and conditional implicit differentiation;
- S20–S21: natural exponential → arbitrary-base exponential/logarithms → logarithmic differentiation;
- S22–S24: sensitivity, forensics and synthesis.

No integration, MVT-based global control, Taylor machinery, optimization machinery, multivariable calculus, L'Hôpital or numerical differentiation was introduced as a premise.

## 10. Verification boundary

The verified implementation head `207db95e...` passed the complete T22 workflow, including real Chromium.

This establishes:

- builder verification: **yes**;
- semantic/evidence repair: **verified at the implementation head**;
- independent pedagogical acceptance: **not claimed**.

A genuinely separate reviewer should still perform a bounded independent pedagogical review if independent acceptance is desired.

## Stop boundary

Stop after M10.

Do not open M11.

Do not register M10 into the shared learner runtime as part of this repair.

Do not alter M01–M09 to simplify M10 review.
