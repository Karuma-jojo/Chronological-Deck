# T22 Elite — M10 Review Handoff

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M10 · Derivatives & Local Linearity (`ARC053`)**

## Status

**Builder-verified authored candidate. Independent pedagogical acceptance is still a separate review.**

The verified implementation checkpoint is:

- head: `b4d4339afe6b81d65c775c0f49c0959334ed6dfe`
- T22 Elite Actions run: `35991270412`
- job: `107605664844`
- conclusion: **SUCCESS**
- syntax: PASS
- inherited M01–M09 structural/semantic/evidence/math regressions: PASS
- M10 structural/pedagogy gate: PASS
- M10 independent mathematics gate: PASS
- Chromium install: PASS
- real browser evidence workflow: PASS

Run URL: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35991270412

## Scope of this build

This build obeys the explicit instruction to build M10 without changing M09 or any earlier module content.

The M10 implementation adds:

1. `docs/t22-course/M10-DESIGN-GATE.md`
2. `course/t22/authoring/m10-arc053.json`
3. `scripts/test-t22-elite-m10.mjs`
4. `docs/t22-course/audit/m10-math-checks.mjs`
5. `docs/t22-course/audit/m10-preserved-baseline.json`

The only pre-existing file changed is:

6. `.github/workflows/t22-elite-checks.yml` — four additive lines invoke the two new M10 validators in syntax and execution phases.

No M01–M09 authoring pack, shared runtime source, roadmap, semantic-prerequisite ledger, T25 source or SMMC source was changed.

The M10 preservation validator pins the accepted M01–M09 authoring/runtime blobs and passed at the verified head.

## Deliberate runtime decision

M10 is **not registered in `course/t22/generated/course-meta.json` yet**.

This is intentional, not an unfinished authoring omission.

Several inherited M07–M09 historical stop-boundary validators assert that no order-10 module is loaded and that `course/t22/authoring/m10.json` is absent. The user explicitly prohibited touching M09 or the earlier modules. The new source therefore lives at `course/t22/authoring/m10-arc053.json`, and the accepted nine-module runtime remains byte-preserved.

Consequences:

- M10 content is fully authored and independently machine-checkable.
- Existing M01–M09 browser/runtime behavior remains unchanged and passed Chromium.
- M10 does not yet appear as a selectable learner module in the shared T22 page.
- Activating it later requires a deliberate progression-gate/runtime integration change, which should be treated as a separate operation rather than silently rewriting historical acceptance records during this M10-only build.

## Boundary

M10 owns first-order one-variable differential structure:

- derivative at a point as a difference-quotient limit;
- secant/tangent/instantaneous-rate interpretation and units;
- finite derivative existence and one-sided diagnostics;
- derivative as a function and derivative-domain discipline;
- differentiability implies continuity, with converse failures;
- differentiability as local linearity `f(a+h)=f(a)+f'(a)h+r(h)`, `r(h)/h→0`;
- linear approximation without inventing a finite error theorem;
- linearity, positive-integer power, product, reciprocal and quotient rules;
- chain rule derived from local linearity;
- trigonometric derivatives from M09's radian limits;
- a bounded inverse-derivative result with hypotheses visible;
- implicit differentiation conditional on an assumed differentiable local branch;
- natural exponential/logarithm and arbitrary-base derivatives with construction/normalization assumptions surfaced;
- logarithmic differentiation;
- first-order sensitivity/elasticity;
- domain/hypothesis/method forensics;
- final synthesis.

M10 explicitly does **not** own:

- M11 integration/FTC;
- M12 Taylor/higher-order asymptotics;
- a full Rolle/MVT unit or MVT-based global error control;
- optimization/Newton machinery;
- L'Hôpital;
- multivariable derivatives/Jacobians/Hessians;
- numerical differentiation;
- a general inverse-function or implicit-function theorem.

The decisive prohibition is recorded in the design gate:

> Use limits to build first-order local change; do not justify M10 with integration, Taylor expansion, MVT-based global control, optimization machinery or multivariable differential structure.

## Pedagogical architecture

The pre-authoring hard gate was completed before sessions were chosen:

- boundary contract;
- source dossier;
- concept dependency graph;
- conceptual-distinction map;
- failure-mode map;
- narrative spine;
- split/merge audit;
- candidate session boundaries.

The resulting count is **24 sessions**. It was not copied from any earlier module.

The narrative moves from finite change to the need for a local rate; limits create the derivative; existence failures make the boundary visible; the derivative becomes a function; differentiability is recast as first-order local linearity; algebraic and compositional rules are then derived; M09's trigonometric limits pay off; inverse/implicit/exp/log structure is added with explicit hypotheses; the module ends in sensitivity, forensic legality and synthesis.

## Authored assessment surface

Current pack:

- 24 sessions;
- 48 fixed tasks: one Main + one Transfer per session;
- 48 stored evaluator references;
- 72 explicit ownership claims;
- every rubric totals 10;
- every ownership claim maps to a public request and exact rubric evidence;
- every lesson contains worked reasoning and guided learner work;
- Transfer changes structure, representation, domain/branch assumptions, inverse direction or interpretation rather than merely changing numbers.

The M10 validator compares every fixed prompt/reference against all legally available lessons through that session. At the verified head there are **zero 12-token instruction→assessment overlaps**.

This is a conservative machine screen, not a claim that lexical separation alone proves pedagogical independence.

## Adversarial repairs made during the build

The initial authoring pass was not frozen merely because it existed. The following issues were found and repaired:

1. S05 Main was too close to its quadratic worked example; rebuilt around a cubic derivative-function derivation.
2. S06 initially rehearsed the same differentiability⇒continuity proof supplied by instruction; rebuilt as a direct epsilon-delta proof using a bounded difference quotient.
3. An attempted S06 sequence-based proof was rejected because it would have leaned on the converse sequential criterion for continuity, which M09 had not established as owned machinery.
4. S08 Main was a number-swapped quadratic approximation; rebuilt around a cubic with an explicit nontrivial remainder.
5. S15 Main was too close to the nested reciprocal worked surface; rebuilt on a different nesting structure.
6. S16 Main leaked the sine proof architecture almost verbatim; rebuilt so instruction fully derives sine while Main completes the cosine proof and audits radian normalization.
7. S19 Main was too close to the worked circle; rebuilt on a product-plus-polynomial implicit relation.
8. S21 Main replayed a formula already derived in the lesson; rebuilt to derive `(log_b x)'` by the inverse identity `b^{log_b x}=x`.
9. S23 Main reused the exact worked forensic examples; all three audit surfaces were replaced.
10. S24 Main/Transfer mirrored the worked/guided synthesis too closely; both were rebuilt on different dependency structures.
11. S11's evaluator reference was mathematically correct but too terse for the hardened reference-quality check; the rule basis was made explicit.
12. S06 contained a logically impossible dead sentence after defining `M=|L|+1>0`; it was removed.

The point of these repairs was not cosmetic diversity. Each repair increased the amount of reasoning the learner must independently perform after legally available instruction.

## Source stack used

Mathematical/course sources:

- MIT 18.01SC Single Variable Calculus, Unit 1 Differentiation — route comparator.
- OpenStax Calculus Volume 1 §§3.1–3.9 — definition, coverage, notation and hypothesis anchor.
- Jiří Lebl, Basic Analysis, Chapter 4 §4.1 — proof/hypothesis audit.
- MIT 18.014 Calculus with Theory — proof-oriented comparator; its later MVT material remains outside M10.

Pedagogy:

- IES / What Works Clearinghouse, *Organizing Instruction and Study to Improve Student Learning* — spacing/retrieval, worked-example/problem alternation, connected representations and explanatory questioning.

The exact source ledger and URLs are stored in `course/t22/authoring/m10-arc053.json` and the design rationale in `M10-DESIGN-GATE.md`.

## Verification

The successful run at `b4d4339...` reports:

- `PASS M09`: 27 sessions / 54 tasks / 82 semantic links, preserving prior M09 regressions.
- `PASS M10 structural/pedagogy`: 24 sessions / 48 fixed tasks/evaluators / 72 ownership links; global 12-token instruction separation; M01–M09/runtime blobs preserved; M10 intentionally unregistered.
- `PASS M09 mathematics`.
- `PASS M10 independent mathematics`: all 24 sessions / 48 stored references checked against separately encoded symbolic, numerical, domain and hypothesis oracles.
- `PASS browser`: inherited learner runtime/evidence workflow.

Earlier red runs were used diagnostically rather than ignored:
- one caught the intentionally strict minimum-reference check on S11;
- later runs exposed brittle oracle-marker wording in the new math checker.
The content issue was repaired; checker markers were aligned to the exact stored derivations without relaxing the mathematical expectations. The final implementation run is green.

## Independent review target

An independent reviewer should attack, in this order:

1. boundary leakage into M11/M12/later modules;
2. correctness and hidden assumptions in S07 local linearity, S14 chain-rule proof, S18 inverse derivative, S19 implicit differentiation and S20–S21 exponential/logarithmic development;
3. global semantic contamination beyond the mechanical 12-token screen;
4. whether Main still contains enough fresh reasoning after all instruction;
5. whether Transfer genuinely changes method selection or representation;
6. rubric observability versus stated ownership;
7. source-to-session coverage completeness;
8. the overall learner-state progression from S01→S24.

Do not modify M01–M09 merely to make the review convenient.

## Stop boundary

Stop after M10 review handoff.

- Do not open M11.
- Do not silently register M10 into the shared runtime.
- Do not call this independent acceptance.
- Do not modify M09 or earlier accepted module content.

