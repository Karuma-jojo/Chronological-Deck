# T22 Elite — M12 Pre-Authoring Design Gate

Date: 2026-09-24  
Module: **M12 · Taylor Approximation, Asymptotics & Error**  
Stable ID: `SIDE267`  
Mode: **BUILD**  
Stop boundary: **M12 review handoff; M13 remains closed**  
Recovered branch head before authoring: `b68572b53baa556940f8f6f1ddfb5e0a7fd98cae`  
Status: **PASS_WITH_EVIDENCE — pre-authoring gate complete; one representative vertical-slice pilot may begin**

This file is the hard pre-authoring gate required by the v1.1 T22 module-building protocol. The session count below was not inherited from M10, M11, MIT, OpenStax, Spivak or the five-arc legacy SIDE267 scaffold. Boundary, source roles, hidden prerequisites, conceptual distinctions, documented learner difficulties, representations and downstream obligations were settled before choosing the 19 candidate learner-state transitions.

The build preserves M01–M11. M13 is not opened. Legacy `js/data/t22-rich-module-9.js` is a historical topic inventory only. The file `js/data/t22-rich-module-12.js` is **not** the canonical M12: it is an old-numbering `ARC512` differential-equations module and must not be used as M12 authority.

## 0. Recovery receipt

- Target branch: `codex/t22-pedagogical-rebuild`.
- Recovered remote head: `b68572b53baa556940f8f6f1ddfb5e0a7fd98cae`.
- Latest head commit: `docs(t22): record verified M07 v1.1 retrofit receipt`.
- The current ancestry retains the independently reviewed M11 repair/final-confirmation checkpoint. M11's resolution records successful full workflows at implementation checkpoint `645c3d4c96ccdf1b2ad6120f63940d388077e7e9` and exact documentation/checker head `8fc909f7fa02db106518c4ca0e4f3bd02f09c731`; subsequent M07 retrofit commits propagated protected baselines through later-module guards rather than reopening M08–M11 mathematics.
- Canonical M09 source: `course/t22/authoring/m09.json`, 27 sessions.
- Canonical M10 source: `course/t22/authoring/m10-arc053.json`, 24 sessions.
- Canonical M11 source: `course/t22/authoring/m11-arc510.json`, 20 sessions; M11 explicitly excludes M12 Taylor/asymptotic machinery.
- Curriculum/dependency authority: `docs/t22-rebuild/m65.dependencies.json` gives `SIDE267` exactly `SIDE263` and `ARC053` as formal prerequisites.
- Semantic ledger currently marks `SIDE267` as `reused / pending-boundary-audit`; this design gate supplies that missing boundary audit.
- M11 is chronologically earlier but is **not** a formal M12 prerequisite. M12 may not silently rely on M11-only ownership.
- No canonical `course/t22/authoring/m12-side267.json` exists at this checkpoint.

## 1. Boundary Contract

### Destination

After M12 the learner can independently:

1. interpret higher derivatives as successive local information and use (f^{(n)}) notation with domains visible;
2. construct the unique degree-at-most-(n) polynomial about an arbitrary center (a) whose derivatives through order (n) match the target function there;
3. explain graphically and algebraically what the constant, linear, quadratic and higher terms encode, without treating Maclaurin ((a=0)) as the definition;
4. distinguish derivative matching at a point from a claim of accurate approximation away from that point;
5. state and use the one-variable Taylor theorem with Lagrange remainder with object type, interval and derivative hypotheses visible;
6. turn the remainder theorem into a certified error bound and choose an order/center that satisfies a stated tolerance;
7. distinguish actual error, a proven upper bound, and an unproved “next omitted term” heuristic;
8. use local (O(cdot)), (o(cdot)) and (sim) notation precisely as limit/bounded-ratio statements and translate finite Taylor information into bounded asymptotic statements;
9. define an infinite series through the sequence of finite partial sums and derive the geometric-series bridge from M09 geometric-sequence limits;
10. define a power series about an arbitrary center and reason about its convergence set using directly justified examples rather than importing a full convergence-test catalogue;
11. distinguish a finite Taylor polynomial, a Taylor-series candidate, convergence of that series, and equality of its sum with the original function;
12. derive and use canonical expansions for representative elementary functions only where equality to the function is justified;
13. diagnose center/range failures, including cases where increasing degree does not improve approximation at a fixed far-away point;
14. distinguish (C^infty) smoothness from analyticity and explain a smooth function whose Taylor series fails to represent it;
15. generate an appropriate local expansion from graphical/derivative/context information rather than merely recognizing or copying a supplied formula;
16. synthesize center choice, degree choice, theorem hypotheses, error certification, asymptotic language and series-representation claims without importing M13+ machinery.

### Exact entry capabilities received from M09 / SIDE263

M12 may reuse, with exact prior source:

- M09-S01–S06: tail language, epsilon contracts, negation, uniqueness and boundedness discipline;
- M09-S07–S09: finite limit algebra, products/quotients and squeeze;
- M09-S10: geometric sequences (q^n), including decay for (|q|<1);
- M09-S11–S12: subsequences and monotone bounded convergence;
- M09-S14: divergence to infinity versus oscillation;
- M09-S15–S20: function limits, punctured neighborhoods, epsilon-delta/local-bound reasoning and one-sided limits;
- M09-S21: (sin h/h	o1) in radians;
- M09-S22–S23: limits at infinity and infinite limits;
- M09-S24: pointwise continuity;
- M09-S26: Extreme Value Theorem for continuous functions on compact intervals;
- M09-S27: domain/limit/continuity synthesis discipline.

M09 **does not own infinite-series theory**. In particular, it does not establish a series as a limit of partial sums, a power series, general convergence tests, Taylor series, or interchanging infinite sums with differentiation/integration. Those cannot be treated as prior knowledge.

### Exact entry capabilities received from M10 / ARC053

M12 may reuse:

- M10-S01–S06: derivative definition, local-rate meaning, derivative function/domain and differentiability⇒continuity;
- M10-S07–S08: differentiability as first-order local linearity and the explicit distinction between an asymptotic first-order statement and a certified finite error theorem;
- M10-S09–S17: linearity, power/polynomial/product/quotient/chain and trigonometric derivative structure;
- M10-S18–S21: bounded inverse/implicit derivative reasoning and elementary exponential/logarithmic derivatives;
- M10-S22: first-order sensitivity and scale;
- M10-S23–S24: domain/hypothesis/method forensics and first-order synthesis.

M10 deliberately excludes systematic higher-order Taylor structure, a broad Mean Value Theorem unit and finite Taylor error guarantees. M12 therefore must surface any theorem support it needs.

### M11 relationship

Chronologically M11 has already exposed a bounded MVT bridge, but `m65.dependencies.json` does not make M11 a formal prerequisite of M12. Therefore:

- M12 may acknowledge M11 exposure as optional retrieval for a learner following the linear route;
- no M12 proof, task or evaluator may require M11 integration/FTC/substitution machinery;
- the compact Rolle/MVT support needed for Taylor's theorem must remain self-contained inside M12.

### New objects / notation introduced here, before first use

- higher derivatives (f'',f^{(3)},ldots,f^{(n)});
- factorial scaling (k!) as it appears in derivative matching;
- center (a), displacement (h=x-a), and “order” of a local polynomial;
- Taylor polynomial (P_{n,a});
- remainder (R_{n,a}(x)=f(x)-P_{n,a}(x));
- Lagrange remainder and the unknown intermediate point (c);
- local order notation (O(phi),o(phi)) and asymptotic equivalence (sim), always with the limiting variable/point stated;
- finite partial sum (S_N), infinite series as (lim_{N	oinfty}S_N);
- geometric series;
- power series (sum c_n(x-a)^n);
- Taylor-series **candidate** (sum f^{(n)}(a)(x-a)^n/n!);
- analytic-at-a / local Taylor representation, introduced only after series convergence and equality are separated.

### Intentionally deferred

M12 does **not** own or use as premises:

- multivariable Taylor formulas, gradients, Jacobians, Hessians or quadratic forms — later SIDE271/ARC711;
- generalized anisotropic Taylor structures, distributions, singular SPDEs, regularity structures or renormalization — far beyond T22 M12;
- Newton, quasi-Newton, optimization algorithms or second-order optimization tests;
- floating-point roundoff, truncation-vs-roundoff tradeoffs, conditioning or numerical stability;
- a full real-analysis course on series: Cauchy criterion, absolute/conditional convergence, rearrangements, ratio/root/integral/alternating tests as a catalogue;
- uniform convergence and general term-by-term differentiation/integration of infinite series;
- complex analysis, singularity-based radius arguments, analytic continuation or identity theorems;
- general Poincaré asymptotic-series theory, divergent asymptotic series, Euler–Maclaurin or Stirling theory;
- probabilistic asymptotics, LLN/CLT, Delta method, asymptotic normality or statistical efficiency;
- numerical quadrature or differential-equation solvers;
- M13 vector-space or linear-algebra machinery.

### Decisive prohibition

**M12 is a one-variable deterministic local-approximation/error module. It may build only the minimum infinite-series/power-series bridge required to make Taylor-series claims mathematically honest. No proof, worked example or assessment may smuggle in multivariable calculus, optimization, numerical-analysis, probability/statistics asymptotics, complex analysis or generalized regularity-structure machinery.**

### Downstream obligations

- The legacy SIDE271 contract explicitly expects SIDE267's higher-order local approximation and remainder/error discipline before its multivariable quadratic Taylor model. The current `m65.dependencies.json` omits this edge. That inconsistency is recorded here but **not repaired under M12-only authorization**; M12 will nevertheless provide the capability so a later M18 boundary audit can decide whether to restore the formal edge.
- Later optimization/numerical modules can reuse local polynomial/error reasoning only when their own dependency contracts explicitly permit it.
- Later statistics modules may reuse deterministic (O/o/sim) literacy but own their probabilistic asymptotic theorems themselves.
- M13 starts vectors/span/basis and does not require M12 as a mathematical prerequisite; M12 must not pre-teach it.

## 2. Source Dossier

Every source has an epistemic role. Repository scope remains the curriculum authority.

| ID | Source / exact section | Type / epistemic role | Question settled | M12 use / deliberate non-import |
| --- | --- | --- | --- | --- |
| REPO-M12 | M65 skeleton, `m65.dependencies.json`, semantic ledger, M09/M10/M11 canonical authoring and legacy SIDE267 | repository contract / curriculum authority | What does M12 own, what is actually prerequisite, and what later machinery is forbidden? | Owns the boundary. Legacy five-arc SIDE267 is topic evidence, not session architecture. |
| MIT-1801-TAY | MIT OCW 18.01SC, Unit 5 Part B, Sessions 94–101 | university course / route comparator | What conventional prerequisites lead into Taylor series? | MIT explicitly places infinite series and power series before Taylor. T22 imports a **bounded bridge**, not MIT's whole series unit or L'Hôpital material. |
| OS2-52 | OpenStax Calculus V2 §5.2 Infinite Series | open textbook / broad coverage comparator | What is the minimum honest definition of an infinite series? | Series = limit of sequence of partial sums; geometric series is the bridge. Telescoping/general convergence catalogue is not required. |
| OS2-61 | OpenStax Calculus V2 §6.1 Power Series and Functions | open textbook / notation/coverage comparator | How should center and convergence region be represented before Taylor series? | Power-series language and geometric example; no general ratio/root-test unit. |
| OS2-63 | OpenStax Calculus V2 §6.3 Taylor and Maclaurin Series | open textbook / theorem and coverage comparator | How are finite Taylor polynomial, remainder and equality-to-function separated? | Taylor polynomial, Lagrange remainder bound and remainder→0 criterion. Maclaurin is treated as a special case, not the default definition. |
| LEBL-TAYLOR | Jiří Lebl, Basic Analysis I §4.3 | rigorous theorem/hypothesis authority | What exact object/domain/hypotheses support Taylor's theorem? | Higher-derivative notation, Taylor polynomial, Lagrange remainder and smooth≠analytic boundary. Broader real-analysis/power-series chapters are not silently imported. |
| SPIVAK-20 | Michael Spivak, *Calculus*, 4th ed., Ch.20 “Approximation by Polynomial Functions,” especially pp.419–431 in-book (PDF pp.438–450) | user-supplied proof-oriented textbook / deep comparator | How does a mature proof-oriented text motivate derivative matching, remainder, failure and the finite→infinite transition? | Deep sequence/proof/problem comparator. No prose or exercises are copied. |
| DLMF-21 | NIST DLMF §2.1(i), asymptotic and order symbols | rigorous reference / asymptotic-notation authority | What exactly do (sim), (o) and (O) mean? | Definitions by ratio limit/boundedness. Full asymptotic-expansion calculus is deferred. |
| MAA-IPG | MAA Instructional Practices Guide | pedagogy guide / undergraduate-mathematics baseline | What general design/assessment practices are appropriate? | Engagement, explanation, assessment alignment and representation use; not evidence that T22 itself works. |
| IES-WWC | IES/WWC “Organizing Instruction and Study to Improve Student Learning” | pedagogy guide / general learning-evidence baseline | Which general learning practices have evidence? | Moderate-evidence spacing, worked-example/problem alternation and representation integration; active retrieval/deep questions where applicable. Population/evidence limits remain explicit. |
| PED-SMITH | Smith, Thompson & Mountcastle (2013), “Student understanding of Taylor series expansions in statistical mechanics” | empirical discipline-based education research / domain-specific difficulty source | Which Taylor-series failures actually appear in advanced undergraduates? | Forces arbitrary-center work, graph↔coefficient links, generation rather than recognition, and explicit truncation/error decisions. Population is upper-division physics, not a direct T22 sample. |
| PED-VISUAL | Soosloff, Huey & Alexander (2023), “Engaging Students in a Visual and Conceptual Approach to Taylor Series,” PRIMUS 33(9) | mathematics-education teaching reflection / supplementary design comparator | What sequence counters formula-first Taylor instruction? | Supports carefully sequenced visual/local-polynomial reasoning before formula recital. It is a teaching reflection, not a causal trial. |
| HAIRER-ADV | Martin Hairer (2014), “A theory of regularity structures,” arXiv:1303.5113v4, abstract and Appendix A “A generalised Taylor formula” | user-supplied advanced boundary comparator | How far can “Taylor expansion” generalize beyond the intended object class? | Used deliberately to define a hard non-import boundary: no distributions, inhomogeneous scalings, singular kernels, SPDEs or regularity structures in M12. |

Checked 2026-09-24.

Primary URLs:

- https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-5-exploring-the-infinite/part-b-taylor-series/
- https://openstax.org/books/calculus-volume-2/pages/5-2-infinite-series
- https://openstax.org/books/calculus-volume-2/pages/6-1-power-series-and-functions
- https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series
- https://www.jirka.org/ra/html/sec_taylor.html
- https://dlmf.nist.gov/2.1
- https://maa.org/resource/instructional-practices-guide/
- https://ies.ed.gov/ncee/wwc/PracticeGuide/1
- https://doi.org/10.1080/10511970.2023.2193967

### Why the source sequences differ, and the T22 decision

**MIT/OpenStax:** develop infinite series and power series before Taylor series. This is conventional and makes the infinite-series object legal before Taylor coefficients appear.

**Spivak:** develops finite polynomial approximation and Taylor's theorem/remainder deeply before making the transition to infinite sums. This foregrounds approximation and proof rather than coefficient-recitation.

**Smith et al.:** documents a gap between recognizing/interpreting a supplied expansion and generating/using one in a new context, plus center/truncation difficulties.

**T22 M12 chooses a deliberate hybrid:** start from M10 local linearity and arbitrary-center finite derivative matching; establish finite Taylor/remainder/error first; then introduce the *minimum* infinite-series/power-series bridge required to make Taylor-series claims legal. This preserves Spivak's conceptual/local-approximation spine while closing the explicit prerequisite gap that MIT/OpenStax reveal. It also avoids the formula-first/Maclaurin-only trap highlighted by the education evidence.

### Deep-reading decisions from Spivak

- Treat the Taylor polynomial as a derivative-matching object before treating it as a computational formula.
- Separate two limits: fixed degree with (x	o a) versus fixed (x) with degree (n	oinfty).
- Introduce the remainder explicitly before making accuracy claims.
- Include at least one example where approximation degrades away from the center.
- Include the smooth flat-function failure so derivative data at one point is not silently promoted to analytic representation.
- Preserve problem progression: construction → recentering → certified tolerance → failure/structural use. Do not copy Spivak's fixed exercises.

### Pedagogy-Evidence Ledger

| Concept | Documented learner difficulty | Population/context | Evidence limitation | Design consequence |
| --- | --- | --- | --- | --- |
| recognizing vs generating an expansion | learners may interpret/apply a supplied series but fail to generate one in a novel physical context | upper-division statistical-mechanics students, mostly senior physics majors plus a few graduate students | small, discipline-specific population; not direct evidence for T22 adults | assessments must require construction/choice, not only formula substitution |
| arbitrary center | overfamiliarity with Maclaurin can obscure the role of a nonzero center; recentering is less fluent | same paper + prior work it discusses | reported in physics/maths-ed contexts; no universal prevalence claim | introduce arbitrary (a) from the start; Maclaurin only later as (a=0) special case |
| coefficient meaning | learners can confuse coefficient values with the fact ((x-a)=0) at the center | same upper-division population | specific observed response pattern | graph↔value/slope/curvature mapping and wrong-solver discriminator |
| truncation | some students justify truncation by memorized derivative patterns rather than approximation tolerance/error | interview subset in the same study | small qualitative evidence | degree choice must be tied to stated tolerance/remainder, not “drop small terms” folklore |
| graphical/local behavior | center distance and local validity can be poorly understood | Smith discussion of prior Taylor-series studies; supplementary PRIMUS reflection | mixed evidence types | representation progression repeatedly overlays (f), (P_n), center and region |
| formula-first instruction | Taylor can be experienced as procedural coefficient recital | PRIMUS teaching reflection | descriptive/reflection, not controlled empirical evidence | discovery/local-shape questions precede formula compression |

## 3. Support-Theorem Ledger

| Support result / fact | Why needed | First consuming session | Earlier owned? | Source / scope | M12 action | Boundary note |
| --- | --- | --- | --- | --- | --- | --- |
| factorial and repeated-derivative notation | coefficient scaling | S01–S02 | factorial appears earlier in counting, but higher-derivative notation is not owned | Lebl §4.3.1 / Spivak Ch.20 | define locally | not a separate future capability |
| Fermat stationary-point lemma | prove Rolle compactly | S05 | not an M10 owned theorem | elementary consequence of derivative definition | prove locally | support only |
| Rolle theorem | derive MVT | S05 | no | continuity on [a,b], differentiability on (a,b), equal endpoint values | prove from EVT + Fermat | no applications unit |
| Mean Value Theorem | Taylor theorem proof architecture | S05–S06 | M11 exposed it chronologically but M11 is not formal prerequisite | Lebl §4.2/§4.3; exact interval hypotheses | derive from Rolle and state visibly | only the bridge needed by Taylor |
| uniqueness of derivative-matching polynomial | make coefficient formula structural, not memorized | S02 | no | direct finite-polynomial derivation; Spivak Ch.20 | prove in M12 | M12 ownership |
| Lagrange Taylor remainder | certify finite approximation | S06 | no | Lebl Thm 4.3.2 / OpenStax 6.7 / Spivak Ch.20 | prove at intended level using repeated MVT and use thereafter | M12 ownership |
| continuous function on compact interval is bounded | convert derivative continuity to a remainder bound | S07 | M09-S26 EVT | M09 + Taylor theorem | reuse exact earlier owner | no hidden compactness import |
| series = limit of partial sums | make infinite sum legal | S10 | M09 owns sequences but not series | OpenStax §5.2 / MIT S94 | derive as a definition using M09 | bounded M12 bridge |
| finite geometric-sum identity and (|r|<1Rightarrow r^N	o0) | first power-series representation | S10–S11 | finite algebra + M09-S10 | OpenStax §5.2 | derive geometric series | no general series-test unit |
| Taylor-series equality iff remainder tends to zero for the target case | distinguish coefficients from representation | S14 | no | OpenStax Thm 6.8 + finite identity (f=P_n+R_n) | derive directly | no uniform-convergence claim |
| smooth does not imply analytic | prevent false generalization | S17 | no | Lebl §4.3; Spivak flat-function example | prove/analyse one bounded example | no analytic-function theory |

Every support item is visible before first use. No theorem about sequences is silently applied to a different object class.

## 4. Concept Dependency Graph

Core edges are `REQUIRES → NODE → UNLOCKS`.

1. M10 derivative/local-linearity + finite polynomials  
   → higher derivatives and derivative data  
   → higher-order local information.

2. Higher derivatives + center (a) + polynomial algebra  
   → derivative-matching polynomial  
   → coefficient rule (f^{(k)}(a)/k!) and uniqueness.

3. Derivative-matching polynomial + graph/slope/curvature interpretation  
   → arbitrary-center representation map  
   → recentering and generation rather than formula recognition.

4. Matching polynomial + M09 limit language  
   → fixed-degree local residual/order-of-contact reasoning  
   → precise question “how good, and in what sense?”

5. M09 EVT + M10 derivative definition  
   → Fermat → Rolle → MVT support bridge  
   → legal proof engine for Lagrange remainder.

6. MVT bridge + derivative matching  
   → Taylor theorem with Lagrange remainder  
   → certified finite error.

7. Lagrange remainder + compact derivative bound  
   → explicit error inequality / order choice / center choice  
   → tolerance-driven approximation.

8. M09 bounded-ratio/limit language + finite remainder  
   → (O), (o), (sim)  
   → compressed asymptotic error statements with meaning preserved.

9. M09 sequence limits + finite sums  
   → series as partial-sum limit  
   → geometric series from M09-S10.

10. Geometric series + arbitrary center  
    → power-series object and convergence set  
    → legal infinite-polynomial language.

11. Higher derivatives + power series  
    → Taylor-series candidate  
    → finite partial sums = Taylor polynomials.

12. Taylor identity (f=P_n+R_n) + (R_n	o0)  
    → equality of Taylor series with target function  
    → justified canonical expansions.

13. Center/region reasoning + counterexamples  
    → far-field/higher-degree failure diagnostics  
    → local-vs-global discipline.

14. All derivatives exist + flat-function counterexample  
    → smooth (
eq) analytic  
    → honest series-representation claims.

15. Graphical/derivative/context representations + all prior distinctions  
    → generation/forensics/synthesis  
    → downstream higher-order approximation readiness.

## 5. Conceptual-Distinction Map

| Distinction | Failure if collapsed | Forced in |
| --- | --- | --- |
| first-order local line ≠ higher-order local polynomial | Taylor looks like an unrelated formula | S01–S02 |
| center (a) arbitrary ≠ Maclaurin center 0 | learner memorizes only (x^k) patterns | S02–S03, S13 |
| derivative-matching ≠ numerical closeness away from center | matching derivatives becomes a global accuracy claim | S03–S04, S16 |
| Taylor polynomial ≠ Taylor series | finite object confused with infinite limit | S10–S12 |
| Taylor-series candidate ≠ proven representation | coefficients treated as proof of equality | S12–S14, S17 |
| convergence of series ≠ convergence to (f) | any convergent sum is mistaken for the target | S14, S17 |
| smooth (C^infty) ≠ analytic | all derivatives assumed to determine function | S17 |
| actual error ≠ certified upper bound | inequality treated as equality | S06–S07 |
| first omitted term ≠ universal exact error | heuristic silently promoted to theorem | S07, S18 |
| fixed (n), (x	o a) ≠ fixed (x), (n	oinfty) | local approximation and series convergence become one question | S04, S12–S14 |
| (O(phi)) ≠ (o(phi)) ≠ (sim) | all symbols become “roughly equal” | S08–S09 |
| formal (sim) ≠ informal (approx) | asymptotic relation loses its limit definition | S09 |
| local asymptotic statement ≠ global numerical guarantee | (O(h^k)) used without a region/constant | S08–S09, S18 |
| degree choice ≠ center choice | “add terms” used when recentering is the real fix | S07, S16 |
| recognize supplied formula ≠ generate appropriate expansion | procedural fluency misread as transferable capability | S03, S15, S19 |
| series partial sum ≠ series sum | finite computation treated as infinity | S10–S12 |
| deterministic asymptotic notation ≠ probabilistic asymptotic theorem | later statistics machinery stolen backward | S09, boundary audit |

## 6. Misconception / Failure-Mode Map

Evidence labels: **EMP** = documented empirical/discipline-based education evidence; **SRC** = mathematical-source counterexample; **T22** = prior T22 failure class; **PLAUS** = theoretically plausible but not claimed as empirical prevalence.

| Failure model | Evidence | Discriminator / repair |
| --- | --- | --- |
| “Taylor means memorize the Maclaurin formulas.” | EMP | begin with nonzero centers and derivative matching before canonical series |
| “At the center, all higher coefficients are zero because ((x-a)=0).” | EMP | ask coefficient signs/values from graph derivatives while terms themselves vanish at the center |
| “If I can recognize/apply a supplied formula, I can generate it in a new model.” | EMP | fresh task supplies derivative/context information but no Taylor formula |
| “Higher degree is always better everywhere.” | SRC/EMP-adjacent | geometric/pole example where high-degree partial sums worsen outside convergence region |
| “Taylor polynomial = Taylor series.” | SRC/PLAUS | require finite (P_n) and infinite candidate to be named separately |
| “If the Taylor series converges, it converges to the function.” | SRC | flat-function / remainder criterion |
| “Infinitely differentiable means analytic.” | SRC | (e^{-1/x^2}) at 0 counterexample |
| “The next omitted term is the error.” | SRC/PLAUS | choose case where only an upper bound is justified; rubric requires inequality language |
| “A small graph gap proves a theorem.” | PLAUS | distinguish visualization from remainder certificate |
| “Big-O means approximately equal.” | PLAUS | force constant/neighborhood or bounded-ratio interpretation |
| “(O(h^3)) and (o(h^3)) mean the same thing.” | PLAUS | use (h^3) itself vs (h^4) as counterexamples |
| “(fsim g) means (f-g	o0).” | PLAUS | compare (x+1sim x) as (x	oinfty), despite difference 1 |
| “An infinite sum is a very long finite sum.” | PLAUS | require partial-sum sequence and its limit |
| “More terms can be kept until the answer looks stable; that certifies tolerance.” | EMP | degree selection from explicit remainder inequality |
| “A theorem can be invoked without its interval/derivative hypotheses.” | T22 | theorem-type/hypothesis task with one missing derivative bound |
| “A familiar theorem about a neighboring object is close enough.” | T22 | object-type check at every support theorem |

## 7. Representation Progression Map

1. **Graph + center marker + tangent/local polynomial overlays** — introduced S01–S03; reused S07/S16/S17 and assessments.
2. **Derivative table at a center** — introduced S01; converted into polynomial coefficients S02; reused S12/S15.
3. **Centered-power coefficient form ((x-a)^k)** — S02 onward; nonzero-center use is recurrent, not decorative.
4. **Residual/error graph or table (f-P_n)** — S04; converted to theorem bound S06–S07; reused in series equality S14.
5. **Error-bound inequality / tolerance ledger** — S07; reused S18/S19.
6. **Ratio/boundedness representation for (O/o/sim)** — S08–S09; reused in synthesis.
7. **Partial-sum sequence (S_N)** — S10; becomes power-series partial sums S11 and Taylor polynomials S12–S14.
8. **Function vs several partial-sum graphs** — S11/S16; used to distinguish local/region behavior.
9. **Four-column representation:** finite polynomial / infinite candidate / convergence claim / equality-to-(f) claim — S12–S14 and forensics.
10. **Counterexample representation** — far-field geometric failure S16 and flat smooth function S17; reused in final synthesis.

No major representation is introduced only once for decoration.

## 8. Downstream Obligation Map

| Later owner / contract | M12 exit it may need | M12 must not pre-teach |
| --- | --- | --- |
| SIDE271 legacy rich contract | one-variable higher-order local approximation, remainder/error discipline, meaning of second-order local term | gradients, Jacobians, Hessians, quadratic forms |
| ARC711 | conceptual derivative-order/local-model discipline | matrix calculus |
| ARC514 / ARC586 | local approximation/error literacy | optimization algorithms, Newton/quasi-Newton, finite-difference numerics |
| SIDE476 / later statistical modules | deterministic order notation and error-scale literacy | stochastic/probabilistic asymptotic theorems |
| ARC533/534 and other inference modules | language for asymptotic order/equivalence where their own prerequisites permit | Fisher information, asymptotic distributions, optimal tests |
| M13 / ARC511 | no direct M12 dependency | vectors/span/basis stay entirely M13 |

**Recorded architecture discrepancy:** SIDE271's legacy contract names SIDE267 as a prerequisite, while canonical `m65.dependencies.json` currently does not. M12 does not mutate M18 under this authorization.

## 9. Narrative Spine

**M10 says a differentiable function is locally a line plus a remainder that is negligible relative to the displacement. What if the line is not enough? Match not only value and slope but curvature and successive derivative data, which forces a unique centered polynomial. But derivative matching alone is not an error guarantee, so expose the theorem support, prove a Taylor remainder statement and turn it into a tolerance certificate. Compress those local error statements with precise (O/o/sim) notation rather than “approximately.” Only then ask what happens if degree keeps increasing: an infinite sum is not notation magic but a limit of finite partial sums, and a Taylor series is merely a candidate until convergence and equality to the target are separately proved. Canonical functions succeed because their remainders can be controlled; other functions fail because the center, convergence region or analyticity claim fails. Finish by making the learner choose the center, degree, representation and strength of claim rather than being told “use Taylor.”**

The unresolved question after M12 is not “what other series tricks exist?” It is how local approximation changes in many dimensions and how vector/matrix structure organizes those derivatives; that remains later.

## 10. Candidate Pedagogical Atoms and Candidate Session Architecture

The dependency/failure maps yield **19 candidate learner-state transitions**.

| S | Learner-state transition |
| --- | --- |
| 01 | From one derivative to higher derivatives as successive local information; establish (f^{(n)}), derivative cycles and factorial bookkeeping. |
| 02 | From higher-derivative data at arbitrary (a) to the unique centered degree-(n) derivative-matching polynomial; derive (f^{(k)}(a)/k!). |
| 03 | From coefficient formula to graphical/structural meaning and recentering: value, slope, curvature and higher terms around nonzero centers. |
| 04 | From “matches derivatives” to the fixed-degree local-approximation question: residuals, order of contact and why matching does not imply global closeness. |
| 05 | From M09 EVT + M10 derivative definition to a compact Fermat→Rolle→MVT support bridge used only for Taylor error. |
| 06 | From derivative matching + MVT to Taylor's theorem with Lagrange remainder, including exact hypotheses and the unknown intermediate point. |
| 07 | From a remainder formula to a certified inequality: find a derivative bound, choose degree/center to meet tolerance, distinguish actual error from bound. |
| 08 | From repeated verbose bounds to precise local (O) and (o) notation, with constants/neighborhoods and limit meanings. |
| 09 | From (O/o) to asymptotic equivalence (sim), leading-order comparison and bounded deterministic asymptotic algebra as (x	o a) or (n	oinfty). |
| 10 | From M09 sequence limits to infinite series as partial-sum limits; derive the geometric series and reject “infinite arithmetic” intuition. |
| 11 | From geometric series to power series about arbitrary centers and directly justified convergence regions/partial-sum graphs, without a convergence-test catalogue. |
| 12 | From finite Taylor polynomials + power series to the Taylor-series candidate; keep finite partial sums, infinite candidate and target function distinct. |
| 13 | From derivative patterns to canonical (e^x,sin x,cos x) and affine/recentered candidates; generate rather than quote them. |
| 14 | From candidate series to representation: use (R_n	o0) to prove equality for selected canonical functions and separate series convergence from equality to (f). |
| 15 | From formula execution to generation in a changed representation/context: graph/derivative table/verbal local model → center, order and polynomial without a supplied Taylor template. |
| 16 | From local success to center/region failure: higher degree is not globally safer; diagnose a geometric-series boundary/far-field failure and repair by recentering when legal. |
| 17 | From (C^infty) smoothness to analyticity as an extra property; analyze a flat smooth function whose Taylor series at 0 is identically zero but the function is not. |
| 18 | From isolated tools to approximation forensics: decide finite Taylor vs infinite series vs asymptotic statement; audit theorem hypotheses, bound language and omitted-term folklore. |
| 19 | From isolated capabilities to synthesis: choose center/order, build the model, certify an error, state the honest asymptotic/series claim and defend the boundary. |

### Split/merge justification

- S01/S02 are split: repeated-derivative notation and the derivative-matching construction are separate acquisition burdens.
- S02/S03 are split: algebraic construction is not graphical/representational understanding or recentering fluency.
- S03/S04 are split: interpreting coefficients does not answer how approximation error behaves.
- S04/S05 are split: motivating the error question must precede importing theorem machinery.
- S05 is deliberately bounded support, not a broad MVT applications unit.
- S06/S07 are split: theorem statement/proof and operational error certification have different failure modes.
- S07/S08 are split: a numerical inequality should exist before symbolic (O/o) compression.
- S08/S09 are split: (O/o) bounded/negligible scale and ratio-one equivalence are distinct concepts.
- S10 is not merged into S11: “series is a limit of partial sums” is the hidden prerequisite that the legacy SIDE267 skipped.
- S11/S12 are split: power series are a general object; Taylor series are derivative-determined candidates.
- S13/S14 are split: constructing a candidate and proving it equals the function are exactly the distinction M12 must protect.
- S15 is not extra practice: empirical evidence specifically warns that interpretation/application of a supplied series does not establish generation in a novel context.
- S16 and S17 are split: failure from convergence region/center is logically different from smooth-but-nonanalytic failure.
- S18 is explicit theorem/method forensics, not a mixed worksheet.
- S19 is synthesis, not another formula lesson.

### Rejected sizing alternatives

- **Legacy five-arc compression:** rejected because it hides the series prerequisite and collapses construction, theorem support, error certification and representation failure.
- **Copy MIT's eight-session Taylor-series block:** rejected because MIT's surrounding route already owns more series machinery than T22 M09 does, while M12's canonical title also requires asymptotic/error literacy.
- **Reuse M11's 20-session count:** rejected; no symmetry target exists.
- **Collapse to a 10–12 session formula course:** rejected because the documented center/generation/truncation misconceptions and theorem-hypothesis obligations would be hidden.
- **Expand into a full infinite-series unit:** rejected because M12 is Taylor/asymptotic/error focused; general series tests and uniform-convergence theory are not required downstream here.

## 11. Representative pilot

**Pilot selected: S06 — Taylor's theorem with Lagrange remainder.**

Why this pilot:
- it consumes the most delicate local support chain;
- it exposes theorem-type/domain/hypothesis mistakes early;
- it tests whether lessons distinguish a theorem from its computational interpretation;
- its Main can require proof reconstruction while Transfer changes to hypothesis/error diagnosis;
- it forces the evaluator to accept equivalent valid reasoning rather than one memorized theorem phrase.

Before any batch authoring, S06 must pass Gates 4–8: complete teaching sequence, independently reconstructed reference, fair rubric, literal ownership mapping, wrong-solver attack, evidence-distance classification and separation from instructional examples.

If the pilot exposes a pattern defect, repair the pattern before authoring S01–S05/S07–S19.

## 12. Adversarial pre-authoring findings and dispositions

1. **Hidden infinite-series prerequisite in legacy SIDE267.**  
   Legacy A03 assumes series-style convergence although current M09 explicitly excludes infinite series. **Repair:** S10–S11 form a bounded bridge from M09 partial-sequence limits/geometric decay before Taylor series appears.

2. **Canonical title says “Asymptotics,” legacy scope excluded full big-O.**  
   **Repair:** M12 owns precise deterministic local (O/o/sim) literacy and Taylor-derived order statements, but not full asymptotic-series theory or probabilistic asymptotics.

3. **Taylor remainder proof needs MVT, but M10 does not own a broad MVT unit and M11 is not a formal prerequisite.**  
   **Repair:** S05 gives a compact self-contained support bridge; MVT is not smuggled in.

4. **Maclaurin-first risk.**  
   Education evidence and the T22 transfer goal make arbitrary-center fluency central. **Repair:** nonzero center appears in S02–S03; (a=0) is later named as the Maclaurin special case.

5. **Formula-recognition masquerading as ownership.**  
   **Repair:** S15 and final synthesis require generating center/order/polynomial from changed representations without a supplied Taylor template.

6. **“Higher degree always improves” risk.**  
   **Repair:** S16 contains a direct convergence-region/far-field counterexample.

7. **Smooth⇒analytic risk.**  
   **Repair:** S17 uses a smooth flat-function counterexample and requires the learner to distinguish coefficient existence, series convergence and equality to the target.

8. **User-supplied Hairer paper is far beyond M12.**  
   **Disposition:** use as a boundary comparator only. Importing its generalized Taylor formula would violate object type, prerequisite and future-boundary rules.

9. **SIDE271 downstream-edge inconsistency.**  
   Legacy SIDE271 consumes SIDE267; canonical M65 dependency JSON currently omits it. **Disposition:** keep the required M12 exit capability and record the discrepancy; do not mutate M18 under M12-only authorization.

## 13. Authoring gate

Session authoring may proceed only if every session states:
- exact entry capabilities and visible support facts;
- one central new capability;
- conceptual obstacle and definition/theorem/interpretation distinction;
- representations introduced/reused;
- a completely solved instructional example on data distinct from fixed assessments;
- guided practice followed by scaffold fading;
- Main purpose and honest evidence-distance class;
- a Transfer whose mathematical surface genuinely changes;
- a concrete wrong-solver response that loses the intended criterion;
- a valid alternative that must still pass;
- literal claim→public request→rubric observability;
- separation from all answer-bearing instruction.

Final session count remains **19 unless the S06 pilot or subsequent local-gate evidence shows that a split/merge is necessary**. No count is protected for aesthetic symmetry.

M13 remains closed.
