# M01 + M02 v1.2 retrospective retrofit — resolution and review handoff

> **Independent-review follow-up — 2026-09-27**  
> The first independent adversarial pass on the green retrofit head `cb4240fb34c28826182e838aae9943d1bd406f15` opened R01–R08: six semantic-observability defects plus two metadata/representation-hardening defects. They are repaired on `codex/t22-m01-m02-v12-followup` without changing the 17+24 architecture. See `M01-M02-V12-FOLLOWUP-RESOLUTION.md`. The retrofit remains **awaiting independent reconfirmation** until that bounded follow-up is accepted.


Date: 2026-09-27  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Recovered pre-retrofit head: `11b0cb369af2e26ad595a7f5a6bc7ef102d55306`  
Green implementation head: `16e2eb2e4d8863eda10ddc97418bd1f066a06671`  
Full T22 workflow: run `36291523103`, job `108542408541` — **SUCCESS**

## Current status

**IMPLEMENTED + FULLY GREEN; AWAITING INDEPENDENT CONFIRMATION.**

This document does not erase the earlier independent acceptance of the pre-retrofit M01/M02 states. It records a later, explicitly authorized retrospective repair under the stronger T22 v1.2 methodology. Because learner-facing lessons, fixed assessments and shared representation/runtime behavior changed, the retrofit itself is not self-declared independently accepted.

M01 remains **17 sessions / 34 fixed tasks**.  
M02 remains **24 sessions / 48 fixed tasks**.  
Stable session/task IDs remain unchanged.  
No M03+ curriculum content was intentionally redesigned by this repair.

A concurrent M15 candidate commit landed on the same long-lived branch during the retrofit. The branch was re-read before and during repair; the M15 change was not treated as part of the M01/M02 repair and was preserved.

## Repair contract

The retrofit was bounded to the defects identified by the final M01/M02 audit:

1. make mathematical representations literal learner-facing objects rather than prose-only claims;
2. make representation use independently observable where the module claims it;
3. retrofit M01 to exact claim → public request → rubric evidence rather than positional coverage only;
4. classify fixed-task evidence distance honestly;
5. add a routing-only M01 readiness diagnostic if the promised diagnostic was absent;
6. tighten rational-exponent real-domain precision;
7. make the M01 quadratic formula arise from a bounded completing-square derivation;
8. add delayed mixed retrieval without adding review sessions;
9. strengthen M01→M02 conceptual bridges;
10. make selected weak "Transfer" tasks genuinely changed-surface or decision-rich;
11. fingerprint assessed visuals as part of the assessment contract;
12. preserve every later-module boundary and standing regression guard.

The repair did **not** authorize session-count inflation, a new precalculus syllabus, formal proof/set material in M02, limits/convergence in M02, calculus in M02, or any redesign of M03+.

## M01 resolution

Canonical overlay version: `m01-repairs-1.3-v12-retrofit`  
Instruction version: `m01-instruction-v12-representation-r1`

### Architecture

**KEEP 17.** The quantitative/algebraic spine remains unchanged.

### Exact ownership evidence

M01 now carries **85/85 exact claim-evidence rows**. Each required-ownership claim records:

- the exact fixed Main or Transfer task;
- the exact public request;
- the exact rubric criterion(s) that observe the claimed learner action.

The old positional `coverage` ledger remains for compatibility, but it is no longer the strongest semantic authority.

### Evidence distance

All **34/34 fixed tasks** have an explicit v1.2 evidence-distance classification and rationale using the allowed vocabulary:

- retrieval;
- proof reconstruction;
- fresh Main evidence;
- changed-surface Transfer.

The ledger deliberately keeps ordinary new-instance practice classified as retrieval rather than upgrading it merely because the numbers or context changed.

### Representation progression

M01 now records an explicit representation progression across:

- signed-number order on a number line;
- fraction magnitude;
- ratio tables/common scale factors;
- percentage multipliers;
- dimensional cancellation;
- inequality ↔ interval ↔ shaded number line;
- absolute value as distance;
- discriminant/root classification as a bridge into M02 graphical roots.

The S14 Transfer now literally renders number-line solution sets and requires the learner to reconstruct interval and inequality forms.

### Readiness diagnostic

M01 now exposes a **13-item routing-only readiness check** spanning signed-number structure, fractions, rates, percentage change, sequential multipliers, units, estimation, powers, algebra, factoring, equations, inequalities and quadratics.

It does not grant mastery or session clearance. Its only purpose is to route a prepared learner past material they already know or identify an appropriate starting/revisit point.

### Mathematical precision repairs

S08 now states the real-number convention for a reduced rational exponent (p/q):

- reduce the exponent first;
- a negative base is allowed when the reduced denominator (q) is odd;
- an even denominator requires a nonnegative base;
- zero cannot carry a negative exponent.

S16 now gives a bounded completing-square path into the quadratic formula, so the discriminant is motivated by the square-root step rather than presented as an isolated mnemonic.

### Versioned fixed-task repairs made by this retrofit

The retrofit materially changed these M01 fixed contracts and therefore bumped their obligation versions:

- S03 Transfer → obligationVersion 3;
- S05 Main → obligationVersion 2;
- S08 Transfer → obligationVersion 3;
- S11 Main → obligationVersion 2;
- S13 Main → obligationVersion 2;
- S14 Transfer → obligationVersion 2;
- S16 Transfer → obligationVersion 3.

Other M01 version-2 tasks predate this retrofit and are historical repairs, not newly claimed here.

## M02 resolution

Canonical authoring version: `m02-authoring-v12-representation-r2`  
Instruction version: `m02-instruction-v12-representation-r2`

### Architecture

**KEEP 24.** The functions/precalculus spine remains unchanged.

### Literal representation repair

The largest defect class was repaired by adding actual learner-facing mathematical representations rather than describing graphical capabilities in prose.

Instruction now uses rendered:

- function tables and coordinate graphs;
- line intersections;
- absolute-value V graphs;
- parent/transformed function graphs;
- inverse reflection across (y=x);
- polynomial multiplicity graphs;
- rational holes/asymptotes;
- exponential and logarithmic graphs;
- integer-domain sequence tables;
- unit-circle diagrams;
- sinusoidal graphs with exact authored (pi)-tick labels.

### Assessed graphical evidence

Changed-surface fixed evidence now includes literal rendered representations in:

- **S03 Transfer:** graph → values/intercepts/distance/midpoint;
- **S06 Transfer:** parent/transformed graphs → infer transformation and formula;
- **S09 Transfer:** polynomial graph → zeros/cross-touch/multiplicity/factor structure/end behavior;
- **S10 Transfer:** rational graph → hole/asymptote/large-|x| level and algebraic cause;
- **S23 Transfer:** sinusoidal graph → amplitude/midline/period before equation solving;
- **S24 Transfer:** unlabeled table → choose linear/exponential/sinusoidal family before constructing the model.

All six are obligationVersion 2.

### Function concept and cross-module bridges

S01 now explicitly teaches **function ≠ formula** by coordinating verbal rule, table, graph and formula as representations of the same input-output object.

Bounded bridges now make earlier M01 structure reappear in M02:

- M01 simultaneous equations → intersection of lines;
- M01 absolute-value distance → V-shaped function;
- M01 quadratic roots/discriminant → x-intercepts/tangency;
- M01 percentage multipliers → repeated exponential multiplication.

The unit-circle sequence is also continuous: S21 names ((cos	heta,sin	heta)) as moving coordinates and S23 explicitly unwraps those coordinates into cosine/sine waveforms.

### Exact ownership and evidence distance

M02 retains **120/120 exact claim → public request → rubric mappings**, re-audited after the representation/task changes.

All **48/48 fixed tasks** now have explicit v1.2 evidence-distance classifications. Retrieval tasks remain retrieval; selected changed-surface tasks are labeled Transfer only where the representation, direction, obstacle or model-selection demand actually changes.

## Shared learner/runtime repair

A new authored mathematical representation renderer is used by the real learner route. It supports:

- number lines and intervals;
- tables;
- coordinate plots;
- polynomial/rational/root/exponential/log/trigonometric families;
- holes and asymptotes;
- exact authored axis labels including (pi)-based ticks;
- unit-circle diagrams.

Assessed problem representations are now included in the assessment fingerprint. A substantive visual change therefore stales earlier evidence just as a prompt/rubric/reference change does.

The shared learner UI also gained:

- M01 optional readiness routing;
- lesson-level representation surfaces;
- fixed-task representation surfaces;
- delayed mixed-retrieval surfaces.

The renderer and all changed UI paths are syntax-checked in standing CI.

## Useful failures during repair

Failures were investigated rather than bypassed.

1. **M01 S08 separation failure.** The first retrofit accidentally reused the exact (81^{-1/2}) instance in guided instruction and Transfer. The guided value was changed to a distinct instance; the separation guard stayed strict.
2. **Later-module preservation guards.** M09/M10/M11/M12 baselines correctly rejected authorized upstream M01/M02 changes until the exact new upstream blobs and related validators were explicitly re-pinned. Other protected curriculum hashes remained preserved.
3. **M02 focused DOM harness.** The historical minimal VM mock did not implement the new `replaceChildren()` learner-UI call. The mock was extended rather than deleting the focused draft/provenance regression.
4. **Readiness browser assertion.** The first Chromium check looked for the literal word "routing" instead of the actual user-facing route text. The assertion was repaired to require per-item `route:` output plus the routing guidance itself.

These red runs are part of the repair evidence; only the final exact-head green run is the acceptance-quality execution receipt.

## Exact-head verification

Full T22 workflow run `36291523103` on exact head `16e2eb2e4d8863eda10ddc97418bd1f066a06671` completed **SUCCESS**.

Inspected job `108542408541` passed:

- syntax checks;
- structural/pedagogy/semantic/evidence regressions;
- all inherited module guards through the current M15 candidate;
- M01 exact 85/85 claim evidence and 34-task evidence-distance guards;
- M02 exact 120/120 claim evidence and 48-task evidence-distance guards;
- existing independent mathematics gates;
- Playwright dependency/Chromium install;
- real browser evidence workflow;
- the new 390px mobile M01/M02 representation traversal;
- M01 readiness reveal;
- M01 rendered lesson representations and assessed S14 number line;
- M02 rendered lesson representations and assessed S03/S06/S09/S10/S23/S24 visual tasks;
- no horizontal overflow from the new representation layer;
- existing save/reveal/review/export/import/evidence workflows.

## What remains unclaimed

This repair does **not** establish:

- learner mastery or retention;
- psychometric reliability;
- external classroom effectiveness;
- that every novice experiences every transition optimally;
- independent reviewer acceptance of the new v1.2 task/representation changes.

The earlier independent M01/M02 acceptance remains historical evidence for the earlier state. The current retrofit is a new semantic/assessment surface and therefore needs a bounded independent confirmation.

## Independent reviewer handoff

Review only this retrofit. Do not reopen the 17/24-session architecture unless a concrete new defect requires it.

The reviewer should try to falsify the following claims:

1. every new representation is mathematically correct, readable and actually used where claimed;
2. S03/S06/S09/S10/S23/S24 M02 Transfers genuinely require the rendered representation rather than allowing the same solution from leaked prose;
3. the seven versioned M01 repairs literally observe the claims they were intended to close;
4. all 85 M01 and 120 M02 claim-evidence rows point to genuine learner actions rather than nearby mathematics;
5. evidence-distance classifications are honest;
6. the M01 readiness check is routing-only and cannot create mastery evidence;
7. assessed representations are fingerprinted and stale old evidence correctly;
8. M01 rational-exponent and quadratic derivation repairs are mathematically sound and proportionate;
9. the new representation renderer remains legible at mobile width and does not distort mathematical meaning;
10. no M03+ ownership boundary has been stolen.

If those survive review, the retrofit may be marked independently confirmed. Until then, the correct state is:

**M01/M02 v1.2 retrofit implemented + fully green; independent confirmation pending.**
