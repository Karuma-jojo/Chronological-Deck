# T22 Elite — M11 Pre-Authoring Design Gate

Date: 2026-09-24  
Module: **M11 · Integration & Accumulation**  
Stable ID: `ARC510`  
Mode: **BUILD**  
Stop boundary: **M11 review handoff; M12 remains closed**  
Recovered branch head before authoring: `2805a56d8d0376c72243fdaecfe0d0dedf8bad2e`  
Status: **PASS_WITH_EVIDENCE — pre-authoring gate complete; lesson authoring may begin**

This file is the hard pre-authoring gate required for M11. Session count was not inherited from M09, M10 or the legacy ARC510 rich module. Boundary, source research, distinctions, dependencies, failure modes and narrative were settled before the 20 candidate learner-state transitions below were chosen.

The build preserves M01–M10. M12 is not opened or used as a premise.

## 0. Recovery receipt

- Target branch: `codex/t22-pedagogical-rebuild`.
- Recovered head: `2805a56d8d0376c72243fdaecfe0d0dedf8bad2e`.
- Latest head commit: documentation-only M10 post-repair handoff update.
- Repaired M10 implementation checkpoint recorded by its handoff: `207db95e3186dc9127c92222dea2dd68ca6fc37f`.
- Current-head T22 Elite run: `35996827021`, job `107623629964`, **SUCCESS**. Syntax, semantic/evidence regressions, Chromium installation and browser evidence workflow all completed successfully.
- M09 canonical source: `course/t22/authoring/m09.json`, instruction `m09-instruction-v1`.
- M10 canonical source: `course/t22/authoring/m10-arc053.json`, instruction `m10-arc053-instruction-v2`.
- Dependency authority: `docs/t22-rebuild/m65.dependencies.json` gives ARC510 exactly `SIDE263` and `ARC053` as prerequisites.
- M10 remains intentionally absent from the shared nine-module learner runtime. M11 authoring must not silently change that historical/runtime decision.
- Legacy `js/data/t22-rich-module-3.js` is a source of historical scope ideas only; it is not the new session architecture or evidence contract.

## 1. Boundary Contract

### Destination

After M11 the learner can independently:

1. construct finite accumulation from local quantity × width with correct units and sign;
2. represent nonuniform tagged Riemann sums and use mesh size as the refinement control;
3. state and reason with the one-variable definite Riemann integral as a partition/tag-independent limit;
4. distinguish a plausible discretization sequence from evidence of actual Riemann integrability;
5. use linearity, interval orientation/additivity, comparison and absolute-value bounds of proper definite integrals;
6. interpret signed accumulation, geometric area and average value without conflating them;
7. reason about accumulation functions and reconstruct the local mechanism behind FTC recovery at a continuity point;
8. differentiate ordinary variable-endpoint accumulation functions with chain/orientation logic;
9. distinguish antiderivative families, definite integrals and net change;
10. justify FTC endpoint evaluation from the established accumulation bridge plus the bounded derivative-zero support lemma;
11. recover a deliberately small antiderivative repertoire from M10 derivative facts with domains visible;
12. derive and use one-variable substitution from the chain rule/FTC, including transformed bounds and orientation;
13. derive and use integration by parts from the product rule/FTC, including boundary terms;
14. choose among direct evaluation, substitution, integration by parts or “none of these” by structure rather than by mnemonic;
15. define improper integrals through explicit limits, identify every problematic endpoint and decide representative convergence/divergence cases;
16. derive the one-sided p-integral thresholds on positive domains, use elementary comparison, and reject cancellation/principal-value reasoning as ordinary improper convergence;
17. synthesize local rate → finite accumulation → continuum integral → FTC/transform → existence audit without importing later machinery.

### Exact entry capabilities received from M09 / SIDE263

M11 may reuse, with exact prior source:

- M09-S01–S06: tail language, convergence, negation, uniqueness and boundedness discipline.
- M09-S07–S09: limit algebra, quotient safety, order/squeeze reasoning.
- M09-S12: monotone bounded convergence, reused in the improper-comparison proof.
- M09-S14: divergence to ±∞ versus unbounded oscillation.
- M09-S15–S20: function limits, punctured neighborhoods, epsilon-delta/local-bound reasoning, one-sided limits and algebraic transformations.
- M09-S22–S23: limits at infinity and infinite limits near a point.
- M09-S24: pointwise continuity and removable-extension discipline.
- M09-S26: the Extreme Value Theorem for continuous functions on closed bounded intervals.
- M09-S27: domain/limit/continuity synthesis discipline.

M09 does **not** supply derivatives, Riemann sums, definite integrals, FTC or integration techniques.

### Exact entry capabilities received from M10 / ARC053

M11 may reuse:

- M10-S01–S05: derivative as local rate/difference-quotient limit, units and derivative-function/domain discipline.
- M10-S06: differentiability implies continuity.
- M10-S07–S08: first-order local linearity and local approximation boundaries.
- M10-S09–S13: derivative linearity, positive-integer power, polynomial, product, reciprocal and quotient structure.
- M10-S14–S15: chain rule and nested-domain auditing.
- M10-S16–S17: elementary trigonometric derivatives with radian/domain conditions.
- M10-S20–S21: exponential/logarithmic derivatives and logarithmic differentiation.
- M10-S23–S24: domain/hypothesis/method forensics and first-order synthesis.

M10 explicitly left integration, Riemann sums and FTC to M11. M10 also did **not** establish a general Mean Value Theorem unit. M11 therefore may not treat derivative-zero ⇒ constant as an invisible prerequisite.

### Bounded local bridge required inside M11

FTC endpoint evaluation needs the fact that a differentiable function with zero derivative on an interval is constant. Before using it, M11 will state the Mean Value Theorem with its hypotheses, give a short proof route from the already available EVT/Fermat/Rolle structure, and derive only the derivative-zero consequence needed for antiderivative uniqueness and FTC evaluation.

This is a **supporting bridge**, not a full MVT applications unit. M11 will not use MVT for optimization, global approximation-error bounds, curve sketching or any later application.

### New objects / notation introduced here, before first use

- partition `P={x_0,...,x_n}` of `[a,b]`;
- subinterval width `Δx_i=x_i-x_{i-1}`;
- tag/sample point `t_i∈[x_{i-1},x_i]`;
- mesh `||P||=max_i Δx_i`;
- tagged sum `S(f;P,t)=Σ f(t_i)Δx_i`;
- proper definite integral `∫_a^b f(x) dx` as a common refinement limit;
- accumulation function `A(x)=∫_a^x f(t)dt`;
- antiderivative and the conventional indefinite-integral notation;
- transformed variable in substitution, including what `du=g'(x)dx` abbreviates;
- integration-by-parts symbols `u,v,du,dv`;
- improper-integral notation as a limit, never as literal arithmetic with infinity;
- ordinary improper convergence versus symmetric principal-value-style cancellation (the latter named only to reject equivalence).

Every symbol is defined in prose before it is used as an assessment obligation.

### Intentionally deferred

M11 does **not** own or use as premises:

- M12 Taylor polynomials/series, higher derivatives as an approximation engine, asymptotic expansions, big-O/little-o integration rules or remainder theorems;
- Lebesgue integration, measure theory, almost-everywhere arguments or general measurable-function machinery;
- a full Riemann-integrability characterization or a full compactness/uniform-continuity analysis course;
- multivariable integration, Jacobian determinants, surface/volume integrals or multidimensional change of variables;
- continuous random variables, probability-density semantics, expectations or likelihood integrals as a subject — later ARC517;
- differential-equation solution families — later ARC512;
- systematic numerical quadrature, floating-point/stability or error-order analysis;
- differentiation under the integral sign or parameter-dependent integrand theorems;
- L'Hôpital's rule;
- optimization or a broad MVT applications unit;
- trigonometric-substitution catalogues, partial fractions as a catalogue, reduction-formula catalogues, special functions, Gamma/Beta theory;
- stochastic integration.

### Decisive prohibition

**M11 builds one-variable accumulation from finite sums and M09 limits, connects it to M10 local rates through FTC, and develops only the structural transformations needed downstream. No theorem, proof or reference answer may use M12+ machinery, measure theory, multivariable integration, numerical quadrature, L'Hôpital, probability-density semantics or advanced integration tricks as a premise.**

### Downstream obligations

- ARC512 may assume proper one-variable integrals, FTC, substitution and integration by parts when it later treats ODEs.
- ARC517 may assume one-variable proper/improper integration and normalization arithmetic, but M11 must not pre-teach random-variable/density/expectation theory.
- ARC525 may later interpret integrated intensities in continuous-time event models.
- M12 starts from M10 derivative/local-linearity foundations; M11 neither depends on M12 nor pre-solves its asymptotic/Taylor content.

## 2. Source Dossier

Sources have assigned epistemic roles. None is treated as a complete syllabus authority.

| ID | Source / exact section | Question settled | M11 use / limit |
| --- | --- | --- | --- |
| MIT-1801-RS | MIT OCW 18.01SC, Session 46 Riemann Sums | Does an independent-study calculus route motivate integrals from finite sums? | Route comparator for finite sums → integral; do not copy exercises or its broader syllabus. |
| MIT-1801-IMP | MIT OCW 18.01SC, Session 91 Improper Integrals | How are infinite-bound integrals presented as limits? | Coverage comparator only; MIT's neighboring L'Hôpital material is not imported. |
| OS-52 | OpenStax Calculus V1 §5.2 Definite Integral | Riemann sum definition, regular vs nonregular partitions, mesh requirement, continuity as a sufficient integrability condition | Definition/coverage anchor. M11 states continuous⇒integrable as a source-supported theorem; a full proof through uniform continuity/compactness is out of scope. |
| OS-53 | OpenStax Calculus V1 §5.3 FTC | Exact FTC statements/hypotheses | FTC hypothesis audit and endpoint-evaluation comparator. |
| OS-44 | OpenStax Calculus V1 §4.4 Mean Value Theorem | What supports derivative-zero⇒constant? | Bounded support bridge only; not a new applications unit. |
| OS-55 | OpenStax Calculus V1 §5.5 Substitution | Chain-rule reverse structure and transformed bounds | Hypothesis/bounds comparator; M11 derives the identity from established derivative/FTC structure. |
| OS2-31 | OpenStax Calculus V2 §3.1 Integration by Parts | Product-rule reversal and definite boundary terms | Structural derivation and method-choice comparator; LIATE is not elevated to a theorem. |
| OS2-37 | OpenStax Calculus V2 §3.7 Improper Integrals | Infinite/singular definitions and comparison theorem | Definition and comparison anchor. Examples requiring L'Hôpital are excluded. |
| LEBL-RIEMANN | Jiří Lebl, Basic Analysis, Ch.5 §§5.1–5.3 | Rigorous Riemann/FTC hypotheses and proof structure | Proof/hypothesis audit. Full real-analysis prerequisites are not silently imported. |
| LEBL-MVT | Lebl, Basic Analysis §4.2 | Fermat/Rolle/MVT and derivative-zero⇒constant | Confirms the bounded bridge and its interval hypotheses. |
| IES-WWC | IES/WWC, Organizing Instruction and Study | Worked-example/problem alternation, spacing, representations | Pedagogical constraint only; does not validate T22. |
| PED-JONES | Jones (2015), ERIC EJ1061209 | Are area/antiderivative-only conceptions enough for contextual definite integrals? | Motivates repeated rate×width/Riemann-sum meaning; population is two US colleges (n=150), not a universal causal claim. |
| PED-WAGNER | Wagner (2018), ERIC EJ1189820 | What obstacles arise with Riemann-sum interpretations? | Motivates explicit sum-based sense-making rather than FTC algebra alone. |
| PED-SIGN | Bajracharya, Sealey & Thompson (2023), ERIC EJ1377710 | Where do sign/orientation misconceptions appear? | Motivates signed accumulation, backward bounds and physical interpretation before formula manipulation. |

Checked 2026-09-24.

URLs:

- https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-3-the-definite-integral-and-its-applications/part-a-definition-of-the-definite-integral-and-first-fundamental-theorem/session-46-riemann-sums/
- https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/resources/improper-integrals/
- https://openstax.org/books/calculus-volume-1/pages/5-2-the-definite-integral
- https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus
- https://openstax.org/books/calculus-volume-1/pages/4-4-the-mean-value-theorem
- https://openstax.org/books/calculus-volume-1/pages/5-5-substitution
- https://openstax.org/books/calculus-volume-2/pages/3-1-integration-by-parts
- https://openstax.org/books/calculus-volume-2/pages/3-7-improper-integrals
- https://www.jirka.org/ra/html/int_chapter.html
- https://www.jirka.org/ra/html/sec_ftc.html
- https://www.jirka.org/ra/html/sec_mvt.html
- https://ies.ed.gov/ncee/wwc/PracticeGuide/1
- https://eric.ed.gov/?id=EJ1061209
- https://eric.ed.gov/?id=EJ1189820
- https://eric.ed.gov/?id=EJ1377710

### Source-ledger decisions

- **Source-supported theorem:** every continuous real function on a closed interval is Riemann integrable. M11 may use this as a stated sufficient theorem but will not claim its full proof as M11 ownership.
- **Independently derived in M11:** finite contribution architecture, integral operator laws from sums/limits, accumulation continuity bound, FTC local-average mechanism, substitution from chain rule/FTC, integration by parts from product rule/FTC, p-integral thresholds and elementary nonnegative comparison.
- **Chosen modelling convention:** signed local contribution = local rate/intensity × signed/positive interval width according to the oriented integral convention; contexts will state units and sign semantics.
- **Unresolved essentials:** none. Advanced integrability criteria and measure-theoretic generalizations are intentionally deferred rather than treated as gaps.

## 3. Concept Dependency Graph

Core edges are `REQUIRES → NODE → UNLOCKS`.

1. Finite arithmetic + functions + units  
   → local contribution = local quantity × width  
   → finite accumulation model.

2. Finite accumulation + interval notation  
   → partitions, tags, nonuniform widths and mesh  
   → tagged Riemann sums.

3. M09 limit discipline + tagged sums  
   → partition/tag-independent refinement limit  
   → definite Riemann integral.

4. Riemann definition + M09 counterexample discipline  
   → integrability diagnostics / tag dependence / finite point perturbations  
   → ability to distinguish candidate stabilization from existence.

5. Riemann sums + M09 limit algebra  
   → linearity, interval additivity and orientation  
   → reliable integral algebra.

6. Order + integrability  
   → positivity/comparison/bounds/absolute inequality and average value  
   → signed accumulation with quantitative sanity checks.

7. Proper integral + boundedness  
   → accumulation function continuity bound  
   → safe variable-endpoint object.

8. Accumulation difference quotient + continuity at active point  
   → FTC local recovery `A'(x)=f(x)`  
   → local rate ↔ cumulative amount bridge.

9. FTC local recovery + M10 chain rule + orientation  
   → variable upper/lower endpoint derivatives  
   → compositional cumulative models.

10. M09 EVT + M10 derivative definition  
    → bounded MVT support / derivative-zero⇒constant  
    → uniqueness of antiderivatives.

11. Accumulation derivative + derivative-zero⇒constant  
    → FTC endpoint evaluation  
    → exact proper integrals/net change from antiderivatives.

12. M10 derivative repertoire + FTC  
    → verified small antiderivative repertoire  
    → practical exact evaluation without a trick catalogue.

13. M10 chain rule + FTC  
    → one-dimensional substitution  
    → nested integral transformations.

14. M10 product rule + FTC  
    → integration by parts  
    → product-structured transformations.

15. Substitution + parts + direct evaluation  
    → method forensics  
    → choosing a legal simplification rather than pattern hunting.

16. Proper integrals on truncations + M09 limits at infinity  
    → improper infinite-bound integral  
    → tail convergence and p-tail threshold.

17. Proper one-sided truncations + M09 one-sided limits  
    → singular-endpoint/interior improper integral  
    → separate-side convergence discipline.

18. Nonnegative order + M09 monotone bounded convergence  
    → comparison theorem  
    → convergence without exact antiderivatives.

19. Every proper/improper node above  
    → final synthesis  
    → downstream ARC512/ARC517 readiness.

Delayed retrieval:
- M09-S12 monotone bounded convergence is deliberately retrieved in S19.
- M09-S22/S23 infinite/one-sided limit discipline returns in S17–S19.
- M10-S14 chain rule returns in S13–S14.
- M10-S12 product rule returns in S15.
- M10-S20/S21 exponential/log derivatives return in S12 and improper examples.

## 4. Conceptual-Distinction Map

| Distinction | Why it is easy to conflate | Forced in |
| --- | --- | --- |
| finite sampled total ≠ continuum integral | a fine grid can look “exact” numerically | S01–S04 |
| number of subintervals →∞ ≠ mesh →0 for arbitrary partitions | one wide interval can survive while n grows | S02–S03 |
| one convenient sequence of sums converges ≠ Riemann integrable | integrability requires tag/partition independence | S03–S04 |
| definite integral ≠ geometric area | negative values and reversed orientation can make the signed total negative | S01, S05–S06 |
| signed integral ≠ integral of absolute value | cancellation changes magnitude | S06 |
| changing finitely many point values ≠ necessarily changing a Riemann integral | a finite set contributes vanishing total width | S04 |
| continuous ⇒ integrable (sufficient) ≠ integrable ⇒ continuous | jump examples are integrable | S04/S07 |
| accumulation function continuous ≠ its derivative equals integrand everywhere | derivative recovery needs continuity at the active point | S07–S08 |
| “derivative cancels integral” ≠ theorem | FTC has an averaging mechanism and hypotheses | S08–S09 |
| variable endpoint rule ≠ differentiation under a parameterized integrand | only bounds vary in M11 | S09 |
| antiderivative family ≠ definite integral number | +C belongs to families, not endpoint difference | S10–S12 |
| derivative-zero theorem ≠ self-evident algebra | interval/differentiability hypotheses matter | S10 |
| FTC evaluation ≠ definition of the integral | Riemann definition precedes endpoint computation | S03 vs S11 |
| substitution ≠ free symbol replacement | chain factor, bounds, orientation and domains must transform coherently | S13–S14 |
| integration by parts ≠ a product rule for integrals | it transfers a derivative and creates a boundary/product term | S15–S16 |
| a transformation is legal ≠ it is useful | some substitutions/parts choices cycle or worsen the problem | S16 |
| infinity as a bound ≠ a real endpoint | improper integral is a limit of proper integrals | S17 |
| symmetric cancellation ≠ ordinary improper convergence | each required side must converge separately | S18–S19 |
| eventual numerical stability ≠ convergence proof | slow divergence can masquerade as stabilization | S17–S19 |
| integrable total/normalization ≠ probability model | probability semantics are later | S19–S20 |

Every distinction must appear in instruction and at least one fixed task or final synthesis. A taught distinction without an observer is not an ownership claim.

## 5. Misconception / Failure-Mode Map

| False model | Why tempting | Diagnostic repair | Downstream damage |
| --- | --- | --- | --- |
| “Add sampled rates; widths do not matter.” | tables foreground values, not exposure lengths | unequal widths where unweighted sum/mean fails | wrong mass/cost/exposure totals |
| “Use one sample times total width.” | constant-rate formula overgeneralized | varying rate with nonuniform pieces | destroys continuum modelling |
| “More rectangles always means a Riemann proof.” | n is visible; mesh is not | partitions with n→∞ but one wide interval | false integrability claims |
| “A left-endpoint sequence converged, so the integral exists.” | one sequence gives a clean number | supplied dense 0/1 tag counterexample | confuses candidate with partition-independent limit |
| “Integral means positive area.” | geometric area dominates early calculus | signed flow and reversed bounds | sign/orientation errors |
| “∫|f|=|∫f|.” | absolute values feel like harmless magnitude | cancellation case | invalid risk/magnitude reasoning |
| “If f jumps, accumulation also jumps.” | local and cumulative objects conflated | bounded jump integrand with continuous accumulated total | breaks CDF/intensity intuition later |
| “FTC is literal cancellation of d and ∫.” | notation encourages symbolic cancellation | reconstruct short-interval-average proof | theorem misuse at discontinuities |
| “Any antiderivative differs only by C, obviously.” | memorized convention hides theorem | derivative-zero bridge with interval hypotheses | unjustified global family claims |
| “Definite integral needs +C.” | indefinite notation leaks into endpoint evaluation | same antiderivative with different C cancels | evaluator/formula confusion |
| “Substitution means replace a symbol.” | du notation resembles algebra | missing chain-factor and untransformed-bounds attacks | wrong change-of-variable results |
| “Integration by parts is ∫uv=∫u∫v.” | differentiation product rule is mirrored naively | reconstruct product-rule identity | invalid analytic manipulations |
| “Always use LIATE / always use substitution.” | mnemonic offers certainty | method-forensics cases where it cycles/fails | trick hunting instead of structure |
| “Plug ∞ into F(x).” | endpoint bracket notation looks literal | force explicit truncation T and limit | invalid tail calculations |
| “A symmetric limit of 0 proves ∫_{-∞}^{∞} exists.” | cancellation looks convincing | require both one-sided improper integrals | false normalization/existence |
| “A singular point can be skipped because it has zero width.” | finite-point-change result is overgeneralized | unbounded 1/|x-c|^p case | invalid singular integrals |
| “Comparison direction does not matter.” | inequalities are easy to reverse under convergence language | wrong-solver comparison task | false convergence/divergence |
| “Improper convergence is an asymptotic-series question.” | later tools are famous | solve p/comparison cases only with M09 limits + FTC | M12 contamination |

## 6. Narrative Spine

The module story is:

**A local rate has units per input-unit → over a finite piece it contributes rate × width → varying rates force a partitioned signed sum → the grid itself must disappear from the answer, so M09 limit discipline turns sums into a Riemann integral → the new operator has algebra, orientation and order structure → accumulated totals are smoother than individual local contributions → shrinking an accumulation interval exposes a local average, and continuity turns that average back into the local rate → this is the first direction of FTC → a small derivative-zero bridge makes antiderivatives unique up to constants and closes the reverse endpoint-evaluation direction → M10’s chain and product rules can now be reversed structurally into substitution and integration by parts → method choice is audited rather than memorized → finally, infinite intervals and singularities are not “special endpoints” but new limit claims whose convergence must be proved → synthesis reconnects local change, finite sums, continuum totals, theorem hypotheses and existence.**

The unresolved question after M11 is **not** “what is the next integration trick?” M11 stops with a complete one-variable accumulation machine and explicit limits on it. Higher-order approximation/asymptotics are not needed to justify anything here.

## 7. Candidate Session Boundaries and Sizing Audit

The dependency graph yields **20 pedagogical atoms**.

| S | Learner-state transition |
| --- | --- |
| 01 | From a varying local rate/intensity table to finite signed accumulation as Σ(local quantity × width), with units. |
| 02 | From ad-hoc pieces to formal partitions, tags, nonuniform widths, sigma notation and mesh. |
| 03 | From tagged sums to the definite Riemann integral as a common mesh→0 limit, not one favorite grid. |
| 04 | From “the sums seem stable” to integrability diagnostics: continuous-sufficient theorem, tag dependence and finite point changes. |
| 05 | From one integral value to operator structure: linearity, adjacent-interval additivity, zero width and reversed orientation. |
| 06 | From algebra to order/signed meaning: comparison bounds, |∫f|≤∫|f|, cancellation and average value. |
| 07 | From a fixed interval total to a variable accumulation function, including the boundedness continuity estimate. |
| 08 | From cumulative amount back to local rate via the short-interval-average proof of FTC at continuity points. |
| 09 | From fixed endpoint FTC to composite upper/lower endpoints using M10 chain rule and orientation. |
| 10 | From “+C folklore” to antiderivative uniqueness, with the bounded MVT/derivative-zero support bridge made explicit. |
| 11 | From accumulation derivative + uniqueness to FTC endpoint evaluation and net-change reasoning. |
| 12 | From M10 derivative facts to a small verified antiderivative repertoire with domains and +C discipline. |
| 13 | From chain-rule derivative structure to substitution as a derived integral identity. |
| 14 | From informal u-sub notation to definite substitution with transformed bounds, orientation and domain checks. |
| 15 | From the product rule to integration by parts, including definite boundary terms. |
| 16 | From isolated techniques to method forensics: direct / substitution / parts / neither, with verification by differentiation or bounds. |
| 17 | From finite bounds to infinite-interval improper integrals and the p-tail threshold. |
| 18 | From infinite bounds to endpoint/interior singularities, one-sided splits and the near-zero p threshold. |
| 19 | From exact evaluation to comparison and convergence forensics, including rejection of symmetric cancellation as ordinary convergence. |
| 20 | From isolated integration skills to synthesis: build a total, justify the integral, invoke FTC legally, transform if useful and audit existence. |

### Split/merge justification

- S01/S02 are split: modelling local quantity×width is conceptually prior to formal partition/tag/mesh notation.
- S02/S03 are split: constructing a Riemann sum and quantifying its partition-independent limit are different capabilities.
- S03/S04 are split: definition/proper construction should be stable before adversarial nonintegrability and finite-point invariance.
- S05/S06 are split: algebra/orientation and order/magnitude/average-value reasoning have different misconception profiles.
- S07/S08 are split: continuity of accumulated total does not imply FTC derivative recovery; the latter needs pointwise continuity of the integrand.
- S08/S09 are split: proving the local FTC mechanism and composing it with moving endpoints are distinct.
- S10 is not merged into S11: the derivative-zero support theorem is a previously absent prerequisite and must become visible before FTC endpoint evaluation consumes it.
- S11/S12 are split: theorem-level endpoint evaluation is different from building a usable but deliberately small antiderivative repertoire.
- S13/S14 are split: deriving substitution and executing definite transformed bounds/domain/orientation are separate failure modes.
- S15/S16 are split: deriving integration by parts does not teach when it is a productive choice; the forensics atom attacks formula hunting.
- S17/S18 are split: infinity and finite singularities require different limit directions and split logic.
- S18/S19 are split: defining all problematic endpoints precedes comparison/cancellation forensics.
- S20 is synthesis, not an extra worksheet. It forces the learner to organize the route without being told which theorem or technique to use.

### Rejected sizing alternatives

- **Legacy 8-arc compression:** rejected because each legacy arc bundled several independently fragile transitions and would hide prerequisite/failure-mode boundaries.
- **Copy M10's 24 sessions:** rejected; M11 has fewer independent rule families but more theorem/existence distinctions. No numerical inheritance is valid.
- **16-session compression:** rejected because it merges Riemann definition with integrability diagnostics, FTC proof with moving endpoints, or improper definitions with comparison/cancellation; each merge would conceal a documented misconception.
- **22+ sessions:** rejected because separate sessions for geometric area, average value, antiderivative tables or repeated-integration tricks would fragment coherent capabilities or inflate a technique catalogue outside the route's downstream needs.

## 8. Pre-Authoring Adversarial Findings and Repairs

1. **Temptation: define `∫` as “area under the curve.”** Rejected. Signed rate×width accumulation is primary; geometry is one interpretation.
2. **Temptation: define the integral using equal-width sums only.** Rejected as the conceptual contract. Equal-width examples are allowed, but the learner must know why arbitrary fine partitions require mesh control.
3. **Temptation: prove integrability from one convergent sampling scheme.** Rejected. S04 contains a tag-dependence counterexample.
4. **Temptation: import a full uniform-continuity/compactness proof that continuous functions are integrable.** Rejected as scope inflation. The theorem is stated with source/support status; M11 proves the relationships it actually owns.
5. **Temptation: use FTC before defining the integral.** Rejected. The Riemann object and its structure are established first.
6. **Temptation: smuggle derivative-zero⇒constant in as “obvious.”** Rejected. S10 makes the supporting theorem/hypotheses explicit.
7. **Temptation: call substitution symbolic `du` cancellation.** Rejected. S13 starts from the chain rule and an antiderivative; S14 audits bounds and domains.
8. **Temptation: copy an integration-tricks chapter.** Rejected. Only reverse-chain and reverse-product structure plus method forensics are retained.
9. **Temptation: use L'Hôpital in improper examples.** Rejected. M09 limits, exact antiderivatives and comparison are sufficient for the selected tasks.
10. **Temptation: use M12 asymptotics to compare tails.** Rejected. M12 stays closed.
11. **Temptation: let a symmetric truncation certify a two-sided improper integral.** Rejected. Each side must converge separately under the ordinary definition.
12. **Temptation: teach density/expectation while motivating normalization.** Rejected. A “finite total mass/weight” example may appear, but probability semantics remain later.

## 9. Pre-Authoring Gate Receipt

| Gate item | Evidence | Status |
| --- | --- | --- |
| Boundary Contract | exact M09/M10 sources, local bridge, owned/deferred lists, decisive prohibition | PASS_WITH_EVIDENCE |
| Source Dossier | MIT/OpenStax/Lebl + IES + calculus-education studies; claim roles and caveats recorded | PASS_WITH_EVIDENCE |
| Concept Dependency Graph | 19 prerequisite/ unlock nodes plus delayed retrieval | PASS_WITH_EVIDENCE |
| Conceptual-Distinction Map | 20 distinctions with planned observer locations | PASS_WITH_EVIDENCE |
| Failure-Mode Map | 18 concrete wrong models with diagnostic repairs | PASS_WITH_EVIDENCE |
| Narrative Spine | finite contribution → Riemann limit → FTC → structural transforms → improper existence | PASS_WITH_EVIDENCE |
| Session sizing | 20 atoms with split/merge and rejected alternatives | PASS_WITH_EVIDENCE |

## 10. Authoring instruction

Authoring may now proceed, one session at a time through teaching → Main/Transfer → independent solution reconstruction → rubric fairness → claim observability → answer-exposure audit.

Permanent evidence rules for M11:

- no fixed ownership-claim count;
- no fixed rubric-row count;
- every retained claim has a literal public request and actual scoring evidence;
- evidence class is one of `retrieval`, `proof reconstruction`, `fresh Main evidence`, `changed-surface Transfer`;
- a proof already taught in the lesson can only yield proof reconstruction when the fixed task asks for that proof;
- every fixed task is compared semantically against all legally available prior instruction, including all M09/M10 lessons and earlier M11 instruction;
- related mathematics does not imply ownership;
- valid alternate notation/methods are accepted when they satisfy the public obligations;
- domains, continuity/integrability hypotheses, interval orientation and exceptional endpoints are never silently discarded;
- M12+ machinery is forbidden as a premise.

**Next bounded action:** build and adversarially verify S01 as the pilot vertical slice before multiplying the pattern across S02–S20.
