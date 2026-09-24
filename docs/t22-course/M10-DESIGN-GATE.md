# T22 Elite — M10 Design Gate

Date: 2026-09-24  
Module: **M10 · Derivatives & Local Linearity**  
Stable ID: `ARC053`  
Status: **boundary/research architecture accepted for authoring; no runtime publication claim**

This is the pre-authoring gate required by the M09/Astra standard. No session count was chosen before the boundary, source triangulation, dependency graph, conceptual distinctions, failure modes and narrative spine were settled.

## 1. Boundary contract

### M10 owns

1. The derivative at a point as a limit of difference quotients, in both `x→a` and `h→0` forms.
2. The relation among secant slope, tangent slope and instantaneous rate, including units.
3. Differentiability as a local existence claim; finite one-sided derivative checks and representative failure modes.
4. The derivative as a function and its domain.
5. Differentiability implies continuity; continuity does not imply differentiability.
6. One-variable differentiability as first-order local linearity:
   `f(a+h)=f(a)+f'(a)h+r(h)` with `r(h)/h→0`.
7. Linear approximation and first-order sensitivity, while making clear that a local approximation is not a global error theorem.
8. Constant, sum/difference and constant-multiple derivative laws.
9. Positive-integer power rule from first principles; polynomial differentiation.
10. Product, reciprocal and quotient rules with domain/nonzero-denominator conditions.
11. The one-variable chain rule derived from local change/local linearity, with no unsafe division by an inner increment.
12. Derivatives of sine and cosine from M09 trigonometric limits; remaining elementary trig derivatives from established rules with their domains.
13. A deliberately bounded inverse-derivative result, with hypotheses visible rather than an unqualified reciprocal-slope mnemonic.
14. Elementary implicit differentiation as chain-rule bookkeeping **conditional on a differentiable local branch**; no implicit-function existence theorem is claimed.
15. Exponential and logarithmic derivative formulas with the assumptions used to establish the natural exponential explicitly stated.
16. Logarithmic differentiation as an algebraic consequence of the established log/chain/product rules.
17. Mixed differentiation forensics: method selection, domain preservation, hypothesis checks and first-order interpretation.
18. A synthesis in which the learner must distinguish definition, theorem, rule, local model and unsupported conclusion.

### Prerequisites already established

Canonical dependency authority gives M10 the prerequisites:

- `T22E-FND02` — functions, domains, graphs, composition, exponentials/logarithms and trigonometric foundations.
- `SIDE263` — M09 limits/continuity machinery.

M09 specifically supplies the function-limit definition, algebra of limits, punctured-domain reasoning, one-sided limits, continuity, and the radian trigonometric limits required for the sine/cosine derivative derivations. Quantifier/proof discipline from M03 is inherited transitively through M09; it is refreshed only where a derivative proof needs it.

### Reuse without reteaching

- Algebra/factoring and function notation from M01–M02.
- Composition and domains from M02.
- Radian trigonometry from M02.
- Function limits, limit laws, quotient safety, one-sided limits and continuity from M09.
- `lim(h→0) sin(h)/h=1` and the companion cosine limit from M09.
- Counterexample and proof-language discipline already exercised by M03/M09.

### Fragile prerequisites to refresh locally

- A function limit ignores the point value but a derivative numerator contains `f(a)`.
- A quotient limit requires denominator control.
- One-sided limits must agree for a two-sided finite derivative at an interior point.
- Composition domains must be audited before applying a chain rule.
- Limit laws establish a limit only after the relevant component limits/hypotheses exist.

### M10 must not assume or teach as owned material

- Integration, Riemann sums or the Fundamental Theorem of Calculus — M11.
- Taylor polynomials/series, higher-order asymptotics or remainder theorems — M12.
- A full Rolle/Mean Value Theorem unit or derivative-sign curve analysis.
- Optimization, Newton/quasi-Newton algorithms or systematic max/min solving — later optimization modules.
- L'Hôpital's rule.
- Multivariable derivatives, gradients, Jacobians or Hessians — M18.
- Matrix calculus — M19.
- Numerical differentiation / finite-difference stability — later numerical modules.
- A general inverse-function theorem or implicit-function theorem.
- A catalogue of special-function derivative tricks.

### Decisive prohibition

**M10 may use limits to build first-order local change; it may not use integration, Taylor expansion, MVT-based global control, optimization machinery or multivariable differential structure to justify that first-order theory.**

This prohibition is the analogue of M09's “limits without derivatives” boundary.

### Downstream obligations

- M11 must be able to assume a correct derivative definition, product/chain structure and elementary derivative repertoire when deriving FTC and integration techniques.
- M12 must be able to treat the derivative as a function/local coefficient and then introduce repeated derivatives and Taylor structure without repairing M10 basics.
- M18 must be able to generalize **local linearity**, not merely a list of formulas, to several variables.
- Later statistics/quant modules must be able to differentiate exponential/logarithmic objectives and nested scalar models with explicit domain awareness.

## 2. Source dossier

Sources are assigned epistemic roles; no source is treated as a syllabus authority by itself.

| ID | Source | Role in M10 | Builder decision |
| --- | --- | --- | --- |
| MIT-1801-DIFF | MIT OCW 18.01SC, Unit 1 Differentiation | Route comparator: definition → rates → rules → chain; later applications separated | Use the dependency logic, not the session count. |
| MIT-1801-RATE | MIT 18.01SC derivative-as-rate session | Physical/units interpretation | Keep rate interpretation early, after the limit object exists. |
| OS-31 | OpenStax Calculus V1 §3.1 | Definition, tangent/rate problem, equivalent difference quotients | Coverage/notation anchor. |
| OS-32 | OpenStax §3.2 | Derivative as function, differentiability/continuity relationship, higher-derivative boundary | Own derivative function now; defer repeated-derivative development to M12. |
| OS-33 | OpenStax §3.3 | Constant/sum/product/quotient/power rules | Use for coverage; derive important rules structurally rather than present a formula inventory. |
| OS-35 | OpenStax §3.5 | Trig derivatives | Reuse M09's trig limits to avoid circularity. |
| OS-36 | OpenStax §3.6 | Chain rule | Require a local-linearity derivation and changed-surface transfer. |
| OS-37 | OpenStax §3.7 | Inverse derivatives | Include only a bounded one-variable result with explicit hypotheses. |
| OS-38 | OpenStax §3.8 | Implicit differentiation | Treat as chain-rule bookkeeping for a local differentiable branch; do not claim branch existence. |
| OS-39 | OpenStax §3.9 | Exponential/log derivatives and log differentiation | State the natural-exponential assumption/normalization instead of pretending it was proved earlier. |
| LEBL-41 | Jiří Lebl, Basic Analysis I §4.1 | Definition, differentiability⇒continuity, algebraic laws, chain-rule proof discipline | Proof/hypothesis audit. Do not import §4.2 MVT, §4.3 Taylor or §4.4 inverse-function theorem. |
| MIT-18014 | MIT 18.014 Calculus with Theory, derivative lectures | Rigor comparator | Use to challenge shallow formula teaching; keep MVT in the next conceptual layer, not this module. |
| IES-WWC | IES/WWC Organizing Instruction and Study | Pedagogy | Interleave worked examples and learner work, connect representations, space retrieval, use changed-format transfer. |

Checked 2026-09-24.

Source URLs:
- https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/1.-differentiation/
- https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/1.-differentiation/part-a-definition-and-basic-rules/session-3-derivative-as-rate-of-change/
- https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative
- https://openstax.org/books/calculus-volume-1/pages/3-2-the-derivative-as-a-function
- https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules
- https://openstax.org/books/calculus-volume-1/pages/3-5-derivatives-of-trigonometric-functions
- https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule
- https://openstax.org/books/calculus-volume-1/pages/3-7-derivatives-of-inverse-functions
- https://openstax.org/books/calculus-volume-1/pages/3-8-implicit-differentiation
- https://openstax.org/books/calculus-volume-1/pages/3-9-derivatives-of-exponential-and-logarithmic-functions
- https://www.jirka.org/ra/realanal.pdf (Chapter 4 §4.1)
- https://ocw.mit.edu/courses/18-014-calculus-with-theory-fall-2010/pages/readings/
- https://ies.ed.gov/ncee/wwc/practiceguide/1

## 3. Concept dependency graph

Core nodes, written as `REQUIRES → NODE → UNLOCKS`:

1. M09 function limits + M02 slope  
   → shrinking secant slopes  
   → need for a local rate.

2. Function limits + punctured-domain logic  
   → derivative at a point as a difference-quotient limit  
   → tangent/rate interpretation and existence diagnostics.

3. Derivative at a point + one-sided limits  
   → finite differentiability test  
   → corners/cusps/endpoint distinctions.

4. Pointwise derivative  
   → derivative as a function with its own domain  
   → reusable differentiation machinery.

5. Difference-quotient identity  
   → differentiability implies continuity  
   → continuity becomes a necessary screen, not a sufficient test.

6. Derivative limit  
   → local-linear remainder criterion  
   → first-order modelling and a safe chain-rule proof language.

7. Limit linearity  
   → derivative linearity  
   → polynomials after the power rule.

8. Binomial/factorization structure + limit laws  
   → positive-integer power rule  
   → polynomial derivatives.

9. Local increments + continuity of differentiable factors  
   → product rule  
   → reciprocal/quotient structure.

10. Product rule + reciprocal derivative + nonzero base value  
    → quotient rule  
    → rational-function differentiation with preserved domains.

11. Local linearity of inner and outer functions  
    → chain rule  
    → nested dependence, inverse/implicit/log rules.

12. M09 trig limits + angle identities  
    → sine/cosine derivatives  
    → remaining elementary trig derivatives.

13. Chain rule + inverse identity  
    → inverse derivative relation under stated hypotheses  
    → square-root/rational-power and logarithm reasoning.

14. Chain rule + differentiable local branch assumption  
    → implicit differentiation  
    → tangent slopes without globally solving for y.

15. Normalized exponential local change  
    → `(e^x)'=e^x` and `(b^x)'=b^x ln b`  
    → exponential sensitivity.

16. Exponential inverse relation + chain rule  
    → `(ln x)'=1/x`  
    → logarithmic differentiation.

17. All previous nodes  
    → rule/domain/hypothesis forensics  
    → M10 synthesis and downstream readiness.

Reuse edges deliberately planned:
- S01 definition intuition reappears in S10 and S24.
- S04 one-sided/domain diagnostics reappear in S13, S17, S18, S19 and S23.
- S06 continuity screen reappears in S18/S19 and synthesis.
- S07 local linearity reappears in S14, S23 and S24.
- S09 limit-linearity proof pattern reappears in S12–S14.
- M09 trig limits are retrieved after a substantial delay in S16.

## 4. Conceptual-distinction map

| Distinction | Why a beginner conflates them | Where forced |
| --- | --- | --- |
| Average rate ≠ instantaneous rate | Both use “change/change” language | S01–S03, S24 |
| Secant slope ≠ tangent/derivative slope | A drawing can make the limit invisible | S01–S03 |
| Difference quotient undefined at h=0 ≠ derivative nonexistent | The quotient is evaluated for h≠0 and then limited | S02, S10 |
| Derivative at a point ≠ derivative function | Same prime notation masks object level | S02 vs S05 |
| Continuous ≠ differentiable | Smooth examples dominate early exposure | S04/S06/S23 |
| Finite derivative ≠ vertical tangent | “Steep” can be confused with a very large finite number | S04 |
| Tangent picture ≠ proof of differentiability | Graph resolution can hide corners/oscillation | S03/S04/S23 |
| Small error ≠ first-order negligible error | Absolute smallness ignores scaling with h | S07/S08 |
| A local linear model ≠ a global error guarantee | “Approximation” invites unbounded extrapolation | S08/S23 |
| Formula simplification ≠ restored domain | Cancelled factors/quotients can hide exclusions | S13/S15/S23 |
| Product rule ≠ product of derivatives | Pattern-matching to algebraic multiplication | S12 |
| Chain rule ≠ symbolic cancellation of dy/du | Leibniz notation can look like fractions | S14/S15 |
| Inverse derivative formula ≠ unconditional reciprocal | Invertibility/differentiability/nonzero slope matter | S18 |
| Implicit differentiation ≠ proof a global function y(x) exists | Solving for dy/dx can hide branch questions | S19 |
| Exponential derivative formula ≠ theorem with no assumptions | Real exponentials require prior construction/normalization | S20 |
| Correct symbolic derivative ≠ justified derivative on original domain | Rules have domain/hypothesis obligations | S13/S15/S17/S21/S23 |

Every distinction above must appear in instruction **and** at least one fixed assessment or synthesis task.

## 5. Failure-mode map

| False model | Why tempting | Repair | Future damage if uncorrected |
| --- | --- | --- | --- |
| “At an instant, change/time is 0/0, so velocity is undefined.” | Direct substitution is the default algebra move. | Use nonzero intervals first; take a limit. | Blocks derivative definition. |
| “A few secant slopes near the point prove the derivative.” | Numerical stabilization feels conclusive. | Require a limit argument or supplied theorem. | Weakens all later local claims. |
| “If the graph looks smooth, it is differentiable.” | Plot resolution hides failures. | One-sided quotients / exact algebra. | Breaks piecewise and nonsmooth reasoning. |
| “Continuity is the same as differentiability.” | Differentiability implies continuity, so converse is overgeneralized. | `|x|`-style counterexample. | Invalid rule use at corners. |
| “Derivative is just a formula attached to f.” | Early examples are globally differentiable polynomials. | Track derivative domain separately. | Loses exclusions in rational/log/trig work. |
| “Local linear means error is small.” | Small h often gives small absolute error. | Require error/h→0. | Makes chain/local sensitivity sloppy. |
| “Power rule is a pattern.” | Memorized school calculus. | Derive coefficient n from first-order binomial terms. | Formula catalogue mentality. |
| “(fg)'=f'g'.” | Algebraic operation is mirrored naively. | Expand finite increments and isolate first-order terms. | Corrupts likelihood/portfolio sensitivities. |
| “Quotient rule works wherever simplified answer exists.” | Algebra hides original denominator. | Preserve original domain and nearby nonzero condition. | Creates fake derivative values. |
| “Chain rule is cancellation.” | dy/du·du/dx notation resembles fractions. | Derive via local linearity; test zero inner increment case. | Unsafe proofs / wrong nested derivatives. |
| “Inverse derivative is always 1/f'.” | Reciprocal slope picture omits evaluation point and zero slope. | Write inverse point explicitly and state hypotheses. | Wrong root/log derivatives. |
| “Implicit differentiation creates a function.” | Algebra returns dy/dx. | State local-branch assumption; vertical cases separately. | Confuses relation with function. |
| “d/dx e^x=e^x by definition, no assumptions needed.” | Formula is famous. | State normalization at zero / construction convention. | Hides mathematical dependency. |
| “Any correct-looking derivative is enough.” | Computation dominates practice. | Require method legality, domain and interpretation. | Downstream theorem misuse. |

## 6. Narrative spine

The module story is:

**Finite change is measurable → a one-instant rate breaks ordinary division → M09 limits rescue the quotient → the resulting number has geometric and physical meanings → not every continuous graph admits such a finite local slope → the derivative becomes a new function → differentiability is stronger than continuity → the derivative is exactly the coefficient of the best first-order local line → that viewpoint lets algebraic operations on functions propagate local change → first principles create reusable rules → composition forces local scale factors to multiply → M09's trigonometric limits now pay off → inverse/implicit relations can be differentiated only with explicit local hypotheses → exponential/logarithmic sensitivities join the toolkit → the learner must finally choose, justify and audit the machinery rather than merely execute formulas.**

The unresolved question after M10 is intentionally not “how do I differentiate more formulas?” It is:

> If derivatives describe local change, how do local rates accumulate over an interval, and how are differentiation and accumulation related?

That is M11.

## 7. Candidate session boundaries after adversarial sizing

The graph produced **24 pedagogical atoms**. This number is an output, not a quota.

| S | Learner-state transition |
| --- | --- |
| 01 | From finite average changes to the need for a local rate. |
| 02 | From a local-rate candidate to the exact derivative limit object. |
| 03 | From a limit number to tangent slope, instantaneous rate and units. |
| 04 | From “looks smooth” to exact finite-derivative existence diagnostics. |
| 05 | From one derivative value to the derivative as a function with its own domain. |
| 06 | From observed smoothness to the theorem differentiable⇒continuous and a converse counterexample. |
| 07 | From slope limit to first-order local linearity and scaled remainder. |
| 08 | From local linearity to controlled first-order estimation without claiming a global error theorem. |
| 09 | From individual derivatives to linearity of the derivative operator. |
| 10 | From repeated polynomial patterns to the positive-integer power rule derived from first principles. |
| 11 | From single powers to polynomial derivative structure and delayed definition retrieval. |
| 12 | From separate factor changes to the product rule and first-order interaction accounting. |
| 13 | From product structure to reciprocal/quotient rules with domain preservation. |
| 14 | From nested functions to the chain rule derived through local linearity. |
| 15 | From a memorized chain rule to multi-layer composition, evaluation-point and domain audits. |
| 16 | From M09 trigonometric limits to rigorous sine/cosine derivatives. |
| 17 | From sine/cosine to other elementary trig derivatives with exclusions visible. |
| 18 | From inverse identities to a bounded inverse-derivative theorem with hypotheses. |
| 19 | From explicit formulas to implicit relations, without pretending algebra proves branch existence. |
| 20 | From an assumed normalized exponential local rate to exponential derivative structure. |
| 21 | From exponential inverse structure to logarithmic derivatives and log differentiation. |
| 22 | From rule execution to quantitative first-order sensitivity with units and scale. |
| 23 | From routine differentiation to adversarial domain/hypothesis/method forensics. |
| 24 | From isolated skills to synthesis: definition, local model, rule choice, proof and boundary control. |

### Split/merge audit

- S01/S02 remain split: intellectual need and formal limit object are different learner transitions.
- S03/S04 remain split: interpretation and existence diagnostics have different failure modes.
- S07/S08 remain split: understanding the remainder criterion is prerequisite to using a local line responsibly.
- S09/S10 remain split: derivative linearity and the power-rule proof use different mathematical mechanisms.
- S12/S13 remain split: reciprocal/quotient safety adds nonzero-neighborhood obligations absent from product structure.
- S14/S15 remain split: deriving chain rule and debugging nested use are distinct.
- S16/S17 remain split: sine/cosine require M09 limit proofs; the other trig functions are downstream algebra/domain work.
- S18/S19 remain split: inverse relations and implicit relations have distinct hypothesis traps.
- S20/S21 remain split: exponential normalization and logarithm/inverse reasoning should not be compressed into formula inventory.
- S22 is not merged into S08: delayed retrieval is intentional; later rule machinery changes the sensitivity surface.
- S23 is not “extra practice”: it explicitly trains legality/domain diagnosis before synthesis.
- S24 is architectural synthesis, not a mixed worksheet.

## 8. Adversarial design-gate findings and repairs

1. **Initial temptation: stop after the historical six ARC053 atoms.** Rejected. Those atoms omit derivative-function/domain work, differentiability⇒continuity, explicit local-linear remainder ownership, trig/exp/log closure and hypothesis forensics needed by the rebuilt M65 route.
2. **Initial temptation: import the whole OpenStax Chapter 3.** Rejected. M10 does not automatically own a broad applications unit, MVT, optimization or an unbounded inverse/implicit theorem catalogue.
3. **Initial temptation: make local linearity a picture-only “tangent approximation.”** Rejected. The scaled remainder `r(h)/h→0` is a required conceptual node and later chain-rule proof language.
4. **Initial temptation: treat inverse/implicit differentiation as routine algebra.** Rejected. The module will distinguish derivative calculation conditional on a local branch from proving that such a branch exists.
5. **Initial temptation: state exponential derivatives as assumption-free facts.** Rejected. The source dossier shows introductory texts explicitly make construction/normalization assumptions; M10 will surface them.
6. **Initial temptation: use higher derivatives in S03 acceleration.** Repaired. M10 may mention that differentiating a derivative creates a higher derivative, but systematic higher-order ownership is deferred to M12.
7. **Initial temptation: use MVT to justify local approximation errors.** Rejected. S08 will only claim the asymptotic first-order statement already equivalent to differentiability; quantified finite error bounds needing stronger theorems remain outside.

## 9. Authoring gate

Session authoring may proceed only if each session can answer:
- what exact learner-state transition occurs;
- why it sits at this point in the graph;
- which prior knowledge it consumes;
- what later reasoning it unlocks;
- what mathematical need precedes the formal machinery;
- what nearby misconception is explicitly separated;
- what representation makes the concept legible;
- what theorem/definition and hypotheses become precise;
- what the learner actually does;
- what boundary/failure case is shown;
- how Main and Transfer stay semantically independent of all prior instruction;
- what earlier idea is retrieved after delay;
- what unresolved question bridges forward.

This gate is accepted for M10 authoring. It does **not** publish M10 into the shared T22 runtime and it does not alter M01–M09.
