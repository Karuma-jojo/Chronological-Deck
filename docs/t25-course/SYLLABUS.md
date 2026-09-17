# T25 current course syllabus

80 targets; 162 sessions; 361 original tasks.

Authored; current validation status is in docs/t25-course/RUN-LOG.md. Not learner-piloted.

Current repository card contracts govern. Historical question routes are provenance, not certified solutions.

## 001 · F1.1 · Compare domains before and after one cancellation.

Given a rational expression with a cancellable factor, identify the original domain, simplify algebraically, preserve every excluded point, and decide whether the original and simplified displays define the same function or only agree on their common domain.

Prerequisites: Elementary factorisation and fraction notation; Meaning of a real-valued function domain; No new T25 v4 session is required; prior F1 evidence may be used diagnostically

Required ownership:
- Find denominator-zero exclusions before simplifying.
- Factor numerator and denominator without changing the stated domain.
- Cancel a common nonzero factor while explicitly carrying the original exclusion.
- Distinguish pointwise agreement on a shared domain from equality of functions with different domains.
- State the equality set and domain of each displayed expression without plugging an excluded point into the original formula.

Exit: On a fresh cancellable rational expression, state the original domain before any algebra, produce the simplified formula with the exclusion still attached, and correctly answer whether the two displayed formulas define the same function. Then repeat the domain comparison on a second unfamiliar cancellation without a hint.

Out of scope: Principal-root and logarithm laws reserved for F1.2; General equation-solving transformations reserved for F2; Limit values and removable discontinuities reserved for C1; Changed-input function domains reserved for F3

## 002 · F1.2 · Justify principal-root, rational-power and log-law conditions on a new expression.

State and justify the real-domain conditions under which principal square-root, reduced rational-power and logarithm rewrites are valid, including the absolute-value consequence sqrt(u²)=|u| and positivity requirements for real log laws.

Prerequisites: F1.1 domain-preservation habit or equivalent established evidence; Real-number sign and order; Elementary exponent notation

Required ownership:
- Explain why the principal square root is always nonnegative.
- Replace sqrt(u²) by |u| and resolve |u| into sign cases when needed.
- Determine the real domain of an even root, reciprocal root and reduced rational power.
- State positivity conditions required for real logarithms and standard product/quotient/power laws.
- Reject or qualify a proposed root, power or logarithm identity by giving the missing domain/sign condition.

Exit: For a fresh mixed root/power/log expression, state its real domain, justify or reject each requested identity with the exact sign/positivity condition, and correctly handle sqrt(u²) for both signs of u. A second changed-surface identity must be classified without prompting.

Out of scope: Complex logarithms or branch cuts; Solving radical/logarithmic equations as a full F2 task; Differentiation of roots/logs reserved for C3; Asymptotic approximations or series

## 003 · F2.1 · Classify each step of one equation as equivalent or implication-only.

Given a chain of elementary equation transformations, determine for each step whether it is logically equivalent, only forward-implicative, or conditionally equivalent after a nonzero/sign/domain condition is stated.

Prerequisites: F1 domain restrictions or equivalent established evidence; Basic equation notation and substitution; Elementary implication language from ordinary mathematics

Required ownership:
- Interpret solving an equation as finding exactly the inputs that make the original statement true.
- Recognise obviously reversible addition, subtraction and multiplication by a known nonzero constant.
- Detect when squaring or another non-injective operation can introduce extra candidates.
- Detect when division or cancellation by an expression can discard a zero case unless it is separated first.
- Check final candidates in the original equation whenever a step was implication-only.

Exit: Audit a fresh multi-step equation solution by labelling every transformation equivalent, implication-only, or conditionally equivalent; identify any candidates that require checking and verify them against the original equation. Then diagnose one unfamiliar fake solution without a hint.

Out of scope: Full rational-inequality sign charts reserved for F2.2; Advanced proof quantifiers reserved for F4; Numerical root-finding; Calculus-based root counts reserved for C4

## 004 · F2.2 · Solve one inequality by sign cases and check all boundary points.

Solve an elementary rational or factored real inequality by reducing it to sign analysis, listing numerator zeros and denominator exclusions, testing intervals, and assembling the exact final set with correct endpoint inclusion.

Prerequisites: F2.1 equivalence/implication discipline or equivalent evidence; F1 denominator-domain restrictions; Ordering and interval notation on the real line

Required ownership:
- Move all terms to one side without changing the inequality relation incorrectly.
- Factor the relevant numerator and denominator far enough to expose critical points.
- Separate zeros from excluded denominator points before interval testing.
- Determine the sign on each interval by a justified test point or factor-parity argument.
- Assemble the final union of intervals with endpoint inclusion matching both the inequality symbol and the original domain.

Exit: Solve one unfamiliar rational inequality from the original expression to an exact interval-union answer, explicitly marking every zero and pole and justifying each boundary. Then explain why direct cross-multiplication would or would not have been legal in that example.

Out of scope: General parameter families of inequalities; Convexity inequalities reserved for A3; Derivative-based monotonicity/root counts reserved for C4; Multivariable inequalities

## 005 · F3.1 · Track one changed input and its legal domain.

Given a function by formula and domain together with a fixed changed input such as x+h or ax+b, substitute the whole input correctly and determine exactly which x-values make the changed input land inside the original domain.

Prerequisites: F1 domain reasoning; F2 solution-set reasoning for the resulting domain condition; Basic function notation and evaluation

Required ownership:
- Treat the displayed variable in f(x) as a placeholder for the entire new input.
- Distinguish f(x+h), f(x)+h and f(x+h)-f(x) symbolically and conceptually.
- Substitute a fixed affine or otherwise simple input into the complete defining formula.
- Translate the requirement new_input ∈ Dom(f) into a condition on x and solve it exactly.
- Check the resulting changed-input domain against any denominator, root or logarithm restrictions already present in the formula.

Exit: For a fresh domain-restricted function and a fixed changed input, write the changed formula, derive the exact legal x-domain from first principles, and explain in one sentence why f(x+h) is not f(x)+h. Repeat on a second changed surface without a hint.

Out of scope: Parameter-case analysis and affine iteration reserved for F3.2; Injectivity/surjectivity/inverses reserved for F5.3; General composition/periodicity constraints reserved for A5.3; Chain-rule differentiation reserved for C3

## 006 · F3.2 · Analyse one parameter or affine-iteration question.

Given a one-variable function containing a parameter, or a simple affine map f(x)=ax+b used once or repeatedly, identify which symbols are variables versus fixed parameters, compute the requested changed or iterated expression correctly, and split into parameter cases whenever algebraic legality or behaviour changes.

Prerequisites: 005 / F3.1 whole-input substitution and domain pullback; F2 solution-set and exceptional-case discipline; Elementary algebra with symbolic parameters

Required ownership:
- Label the running variable, fixed parameter and numerical constants before manipulating the expression.
- Compute f(ax+b), f(f(x)) or a short affine iterate by substituting the entire input rather than symbol-by-symbol guessing.
- Detect parameter values that make a denominator zero, collapse a coefficient, or otherwise invalidate a generic algebraic step.
- Separate exceptional parameter cases before division or cancellation and state the resulting formula in each legal case.
- Explain how changing the parameter alters the map or legal input set without treating the parameter as a second free variable in the same task.

Exit: On one unfamiliar parameterised function or affine-iteration problem, identify all symbol roles, derive the requested expression from whole-input substitution, isolate every exceptional parameter value before any unsafe division, and give the correct casewise conclusion without a hint.

Out of scope: General composition and periodicity theory reserved for A5.3; Injectivity, surjectivity and inverse construction reserved for F5.3; Long recurrence or dynamical-system analysis; Calculus-based parameter optimisation or root counting

## 007 · F4.1 · Negate one quantified claim and test a converse.

Translate an elementary mathematical claim into its quantifier-and-implication structure, negate it correctly, distinguish a statement from its converse and contrapositive, and classify necessary versus sufficient conditions using a concrete example or counterexample when appropriate.

Prerequisites: F2 solution-set logic; Basic set/function notation from ordinary mathematics; Ability to evaluate a concrete candidate example

Required ownership:
- Negate a statement of the form 'for every x, P(x)' as an existential failure and negate an existential claim as a universal failure.
- Distinguish P implies Q from the converse Q implies P and from the contrapositive not-Q implies not-P.
- Translate 'P is sufficient for Q' and 'Q is necessary for P' into the same implication direction.
- Test a proposed converse with a strategically chosen example rather than assuming symmetry of implication.
- State exactly what would count as evidence for a universal claim, an existential claim and the negation of each.

Exit: Given a fresh quantified implication, write its correct negation in words or symbols, state the converse and contrapositive, identify the necessary/sufficient relationship, and either validate or destroy the converse with a decisive elementary example without prompting.

Out of scope: Writing a complete proof reserved for F4.2; Formal predicate-logic systems or truth-table courses; Mathematical induction; Measure-theoretic almost-sure quantifiers or advanced analysis logic

## 008 · F4.2 · Write one short proof or a decisive counterexample.

For an elementary implication or universal claim, decide whether a short direct/contrapositive argument is available or whether the claim is false, then produce either a complete assumption-to-conclusion proof or a valid counterexample with every required hypothesis checked.

Prerequisites: 007 / F4.1 quantified negation and implication structure; F2 legal algebraic transformations; Elementary algebra and set/function notation

Required ownership:
- State the assumptions being used before starting the argument.
- Choose direct proof, contrapositive reasoning or counterexample according to the actual logical form instead of stylistic preference.
- Justify each algebraic or set-theoretic implication without assuming the conclusion or its converse.
- For a counterexample, verify every hypothesis and then show explicitly which required conclusion fails.
- Explain why multiple supporting examples cannot establish a universal claim but one valid counterexample can refute it.

Exit: Resolve one unfamiliar elementary claim completely: if true, give a short proof whose assumptions and implication steps are explicit; if false, give one counterexample that satisfies every premise and violates the conclusion. Then explain why the chosen argument is logically decisive.

Out of scope: Long theorem proofs requiring later subject machinery; Formal induction schemes; Proofs using advanced real analysis or measure theory; Relations/equivalence-class definitions reserved for F5.2

## 009 · F5.1 · Translate set operations and images/preimages by membership.

Given finite or rule-defined sets and an elementary function, translate unions, intersections, complements, set differences, Cartesian products, images and preimages into elementwise membership statements and use those statements to prove or refute a small set equality.

Prerequisites: 008 / F4.2 short proof/counterexample discipline; F3 function evaluation and changed-input notation; Elementary equality and membership notation

Required ownership:
- Distinguish x∈A from A⊆B and translate each relation into the correct verbal claim.
- Expand membership in union, intersection, complement and difference using and/or/not conditions.
- Interpret an ordered pair in A×B with the correct first-coordinate and second-coordinate membership requirements.
- Compute f(A) as an image and f^{-1}(B) as a preimage without assuming that f is invertible.
- Prove a small set identity by two-way membership or refute it by one element lying in exactly one side.

Exit: For a fresh function and several stated sets, compute one image and one preimage, translate a nested set expression into membership logic, and prove or disprove one set equality elementwise without confusing preimage notation with an inverse function.

Out of scope: Testing relation axioms reserved for F5.2; Injectivity, surjectivity and inverse-function construction reserved for F5.3; Sigma-algebras or measure theory; Probability calculations on events reserved for P3

## 010 · F5.2 · Check a relation and list its equivalence classes.

Given a relation on a stated set, interpret it as a subset of the Cartesian square, test reflexivity, symmetry and transitivity with explicit reasoning, decide whether it is an equivalence relation, and if so compute the equivalence classes and verify that they partition the underlying set.

Prerequisites: 009 / F5.1 Cartesian products and membership logic; 007-008 / F4 claim and proof discipline; Elementary finite-set enumeration

Required ownership:
- Read xRy as membership of (x,y) in a specified relation and keep the underlying set explicit.
- Test reflexivity by checking every element is related to itself, or refute it with one missing diagonal case.
- Test symmetry by reversing related ordered pairs and distinguish symmetry from merely having many reciprocal examples.
- Test transitivity from two composable relation facts and produce a concrete violating triple when it fails.
- For a valid equivalence relation, compute [x]={y:xRy}, identify duplicate classes and verify the distinct classes are disjoint and cover the set.

Exit: On an unfamiliar finite or elementary relation, decide each of reflexive, symmetric and transitive with a proof or explicit counterexample; if all hold, list every distinct equivalence class and verify that the classes cover the set without overlap.

Out of scope: Injective/surjective function tests reserved for F5.3; General partial orders or order theory; Quotient vector spaces or quotient groups; Probability conditional equivalence or statistical sufficiency

## 011 · F5.3 · Test injectivity/surjectivity and construct an inverse on stated sets.

Given a function together with an explicit domain and codomain, decide injectivity and surjectivity from their definitions, identify whether the function is bijective, and construct and verify an inverse exactly on the sets where a two-sided inverse is legitimate.

Prerequisites: 009 / F5.1 images, preimages and membership logic; 010 / F5.2 relation and equivalence-class discipline; 006 / F3.2 parameter/case-safe function reasoning; 007-008 / F4 quantified claims and proof/counterexample discipline

Required ownership:
- State the domain and codomain before judging injectivity or surjectivity; recognise that changing either can change the answer.
- Test injectivity from f(x1)=f(x2) implying x1=x2, or refute it with two distinct legal inputs sharing one output.
- Test surjectivity by taking an arbitrary codomain element and determining whether at least one legal preimage exists, rather than merely inspecting several outputs.
- Conclude that an inverse function on the stated codomain exists exactly when the map is bijective, and distinguish this from the always-defined preimage-set notation f^{-1}(B).
- Construct the inverse rule where legitimate and verify both compositions on their proper domains, including any endpoint or branch restriction required by the stated sets.

Exit: For one unfamiliar function with explicitly stated domain and codomain, prove or refute injectivity and surjectivity separately, decide bijectivity, and if bijective construct an inverse and verify both compositions on the correct sets without hints.

Out of scope: General composition/periodicity constraints reserved for A5.3; Inverse-function differentiation; Abstract cardinality or choice arguments; Linear-map invertibility and matrix inverse reserved for M3

## 012 · A1.1 · Use factor/remainder and Vieta in one root-coefficient problem.

Given a polynomial with numeric or symbolic coefficients, use the remainder/factor theorem and the appropriate Vieta relations to translate root information into coefficient equations or coefficient information into symmetric root constraints, while preserving degree and leading-coefficient conventions.

Prerequisites: 003-004 / F2 equation and implication discipline; 007-008 / F4 claim/proof discipline; Elementary polynomial expansion, collection of coefficients and substitution

Required ownership:
- Use P(a) as the remainder on division by x-a and conclude x-a is a factor exactly when P(a)=0.
- Write Vieta relations with the correct signs and division by the leading coefficient for the degree actually given, not only for monic quadratics.
- Translate symmetric quantities such as sums or products of roots into coefficient expressions without unnecessarily solving the polynomial.
- Combine a known root/factor condition with Vieta or coefficient comparison to determine an unknown parameter and then check the resulting polynomial condition.
- Keep root multiplicity and polynomial identity claims separate unless the information supplied actually establishes them.

Exit: Solve one fresh root-coefficient problem by choosing and justifying factor/remainder or Vieta reasoning, preserve all signs and leading-coefficient factors, determine the requested constraint without gratuitous root solving, and verify the final condition directly in the polynomial.

Out of scope: Repeated-root and multiplicity certification reserved for A1.2; Calculus-based root counts or monotonicity reserved for C4; Numerical root-finding algorithms; Complex polar/root-of-unity machinery reserved for A4

## 013 · A1.2 · Test a polynomial identity or repeated-root condition using degree and roots.

Given two polynomial expressions or a polynomial with a claimed repeated root, use degree bounds, distinct-root counts and factor multiplicity to decide whether an equality is a genuine polynomial identity and whether a root occurs with the stated multiplicity, including parameter cases that change degree.

Prerequisites: 012 / A1.1 factor/remainder theorem and root-coefficient reasoning; 007-008 / F4 proof and counterexample discipline; F2 parameter-safe equation reasoning

Required ownership:
- Form the difference of two proposed polynomial expressions and translate identity into the statement that this difference polynomial is identically zero.
- Use the fact that a nonzero degree-n polynomial has at most n distinct roots only when the degree bound is valid in the active parameter case.
- Recognise a root of multiplicity m algebraically through divisibility by (x-r)^m but not by (x-r)^(m+1), with the simpler square-factor test for a repeated root.
- Separate exceptional parameter values that reduce degree or change the leading coefficient before applying a degree/root-count certificate.
- Distinguish distinct-root count from multiplicity count and state exactly which one an identity or repeated-root argument needs.

Exit: For one unfamiliar identity-or-multiplicity problem, state the valid degree bound, separate any degree-dropping parameter case, use distinct roots or repeated factors to reach a proof-level conclusion, and explain why checking several numerical values or a graph would not by itself certify the claim.

Out of scope: Derivative criterion P(r)=P'(r)=0 as a primary method before calculus; Real-root location and monotonicity; General fundamental theorem of algebra proofs; Numerical polynomial approximation

## 014 · A2.1 · Derive an indexed AP/GP/HP relation with exceptional cases.

From the definitions of AP, GP and HP, derive the requested nth-term or finite-sum relation with explicit indexing, translate HP statements through reciprocals when legal, and isolate exceptional cases such as a geometric ratio equal to one or a reciprocal term equal to zero.

Prerequisites: 001-006 / domain-safe algebra and parameter case discipline; Elementary finite-sum notation; Ability to manipulate a linear or geometric pattern symbolically

Required ownership:
- Declare the indexing convention and number of terms before writing an nth-term or sum formula.
- Derive an AP nth term and finite sum by pairing or elementary algebra rather than relying solely on memorisation.
- Derive the finite GP identity by multiplying by the ratio and subtracting, then handle r=1 separately instead of dividing by zero.
- Translate an HP condition into an AP condition on reciprocals only after checking that the relevant terms are nonzero.
- Reindex a finite AP/GP expression without changing which original terms are included or introducing an off-by-one error.

Exit: On one unfamiliar indexed progression problem, state the indexing convention, derive the needed AP/GP/HP relation from definitions, reindex correctly if required, and identify every exceptional ratio or reciprocal case before performing any division.

Out of scope: Weighted geometric and telescoping sums reserved for A2.2; General convergence and subsequence theory reserved for A5; Calculus or generating functions; Combinatorial binomial/multinomial coefficient identities reserved for P2

## 015 · A2.2 · Evaluate a weighted geometric or telescoping sum, with its convergence condition.

Given a finite weighted-geometric or telescoping sum, derive its value algebraically by shift/subtract, index manipulation or partial cancellation, and when an infinite geometric tail is requested state and use the condition |r|<1 while rejecting or separately describing boundary cases.

Prerequisites: 014 / A2.1 finite GP derivation, reindexing and exceptional cases; F1-F2 domain-safe algebra and legal transformations; Elementary factorisation and finite arithmetic

Required ownership:
- Expose a telescoping pattern by writing enough consecutive terms to identify exactly which interior terms cancel and which boundary terms survive.
- Derive a finite weighted-geometric sum using algebraic shifting/subtraction or a proved finite-sum identity, without assuming calculus or an unproved power-series derivative rule.
- Keep finite-sum identities valid for all legal finite parameters separate from claims about an infinite limit.
- State that a real or complex geometric series with ratio r converges in this elementary setting only when |r|<1, and evaluate the resulting tail from the finite formula or geometric remainder.
- Check r=1, r=-1 and |r|>1 boundary/divergent cases rather than inserting them into a convergent-series formula.

Exit: Evaluate one unfamiliar weighted-geometric or telescoping sum from an explicit algebraic derivation, show the surviving endpoint/remainder terms, and if an infinite tail is involved state and verify the exact convergence condition before taking the limit.

Out of scope: Differentiating power series or generating functions; General series convergence tests; Sequence/subsequence convergence theory reserved for A5; Riemann sums reserved for C7

## 016 · A3.1 · Prove one AM-GM-HM or Cauchy-Schwarz bound with equality conditions.

Given a finite positive-variable or finite-vector inequality problem, select and apply AM-GM-HM or finite Cauchy-Schwarz appropriately, preserve every sign/positivity hypothesis, derive the requested bound, and determine all equality cases from the equality condition of the chosen inequality.

Prerequisites: 012-013 / A1 polynomial algebra and coefficient/root discipline; 007-008 / F4 implication proof and counterexample discipline; 001-004 / domain-safe algebra and inequality solution-set discipline

Required ownership:
- State the positivity or real-valued hypotheses required before invoking AM-GM-HM or Cauchy-Schwarz.
- Rewrite the target expression into a form matched to a known finite inequality instead of applying a theorem by surface resemblance.
- Carry the proof to the requested numerical or symbolic bound without introducing an unjustified stronger or weaker claim.
- Derive the equality condition from the theorem used and intersect it with all problem constraints to identify every admissible equality case.
- Test sharpness by exhibiting or deriving an admissible equality configuration rather than merely asserting that the bound is best possible.

Exit: Prove one unfamiliar sharp inequality using AM-GM-HM or finite Cauchy-Schwarz, state every hypothesis before use, derive the full equality condition, and verify that each claimed equality case is admissible under the original constraints without hints.

Out of scope: Derivative-based optimisation or root counting reserved for C4-C5; General normed-space inequalities; Holder/Minkowski unless explicitly derived from in-scope tools; Convexity/Jensen reasoning reserved for A3.2

## 017 · A3.2 · Use a supplied convexity definition in one inequality or counterexample.

Given a stated convexity or concavity definition and an elementary function/problem, translate the definition into a usable weighted-average inequality, apply it to a finite configuration when justified, or construct a counterexample when a proposed claim drops a necessary sign, interval or convexity assumption.

Prerequisites: 016 / A3.1 sharp-bound and equality-case discipline; 007-008 / F4 quantified claims and decisive counterexamples; F1-F2 domain and legal-inequality reasoning

Required ownership:
- Read the supplied convexity/concavity statement literally, including its domain and weight restrictions.
- Convert a two-point convexity relation into the finite weighted comparison requested when the problem permits the needed repeated/elementary argument.
- Keep convex and concave inequality directions distinct and verify that every evaluation point remains inside the stated interval.
- Determine equality only from conditions actually supplied or proved; do not assume strict convexity when only convexity is given.
- Refute a false strengthened claim by removing one necessary hypothesis and giving a concrete admissible counterexample.

Exit: Given a new supplied convexity or concavity definition, derive and apply the requested finite comparison with correct direction and domain conditions, then identify the justified equality case or destroy an invalid strengthened claim with a decisive counterexample.

Out of scope: Second-derivative convexity tests; General convex optimisation; Supporting-hyperplane theory; Calculus-based extrema or root counts reserved for later calculus targets

## 018 · A5.1 · Decide monotonicity/boundedness and construct a counterexample.

Given an elementary real sequence by formula or simple recurrence, determine monotonicity and boundedness with explicit inequalities, and construct or analyse a sequence that disproves a false implication among monotonicity, boundedness and convergence.

Prerequisites: 014-015 / A2 indexing, finite sums and progression discipline; 007-008 / F4 quantified claims and counterexample logic; 006 / F3 parameter/recurrence role tracking

Required ownership:
- State the indexing set and compare a_(n+1) with a_n or use an equivalent exact argument to prove monotonicity rather than infer it from early terms.
- Distinguish bounded above, bounded below and bounded, and provide explicit bounds valid for every index in the sequence.
- Recognise that boundedness alone does not imply convergence and produce a valid bounded nonconvergent example with its behaviour explained.
- Recognise that monotonicity alone does not guarantee finite convergence unless the needed boundedness direction is also present.
- When given a recurrence, prove any claimed invariant interval or monotonic direction before using it as evidence about long-run behaviour.

Exit: Classify one unfamiliar explicit or recursively defined sequence as monotone/nonmonotone and bounded/unbounded with valid all-n reasoning, then construct and justify a counterexample to one false implication among these properties without relying on numerical plots.

Out of scope: Formal epsilon-N convergence proofs reserved for A5.2; Series convergence tests; Continuity/differentiability machinery; Stochastic sequences and martingales

## 019 · A5.2 · Prove one sequence/subsequence or recurrence limit.

For an elementary sequence, subsequence or one-step recurrence, prove a claimed limit using direct definition, squeeze, monotone-bounded reasoning or a justified recurrence argument, and explain why two distinct subsequential limits rule out convergence.

Prerequisites: 018 / A5.1 monotonicity, boundedness and recurrence invariants; 014-015 / indexing and geometric-tail algebra; 007-008 / F4 proof discipline

Required ownership:
- State the convergence claim with its index variable and use an elementary proof method whose hypotheses have actually been established.
- Use squeeze reasoning only after proving both bounding sequences converge to the same limit.
- Use monotone-bounded convergence only after separately proving monotonicity and the appropriate bound.
- For a recurrence, justify existence of convergence before substituting a limit into the recurrence equation, and then check candidate fixed points against the established invariant region.
- Use subsequences correctly: derive subsequential limits from selected indices and conclude nonconvergence when two subsequences have different limits.

Exit: Prove the limit or nonconvergence of one unfamiliar sequence or elementary recurrence from justified hypotheses, and if recurrence substitution or subsequences are used, explicitly show why those steps are logically valid rather than merely suggestive.

Out of scope: Abstract completeness proofs; Cauchy-sequence theory beyond what is explicitly needed; Infinite series convergence machinery; Probability limit theorems

## 020 · A5.3 · Test one composition or periodicity constraint.

Given an elementary claim involving f∘g, f∘f, an inverse-related composition or periodicity condition, compute the relevant compositions on stated domains, translate periodicity into a for-all input condition, and prove or refute the proposed consequence with a short argument or counterexample.

Prerequisites: 005-006 / F3 changed-input substitution and affine composition; 007-008 / F4 quantified claims and counterexamples; 011 / F5.3 domain-sensitive inverses; 018-019 / A5 sequence/iteration discipline

Required ownership:
- Compute f∘g and g∘f by whole-input substitution and keep their domains separate; do not assume composition is commutative.
- Interpret f(f(x)) as composition/iteration and distinguish it from algebraic powers of f(x).
- State periodicity as f(x+T)=f(x) for every legal x for some nonzero T, with any domain-translation condition made explicit.
- Distinguish a period from a fundamental period and avoid claiming minimality unless it is proved.
- Test a proposed composition or periodicity consequence with quantified reasoning and construct a concrete counterexample when the implication is false.

Exit: Resolve one unfamiliar composition-or-periodicity claim by computing the required compositions on their correct domains, translating every global condition with the right quantifiers, and giving either a complete short proof or a decisive counterexample without hints.

Out of scope: General functional-equation classification; Dynamical systems and stability theory; Fourier analysis; Trigonometric equation solving reserved for G1

## 021 · G1.1 · Establish signs, radians, basic identities and sine/cosine rules.

Given an angle, unit-circle configuration or elementary triangle, convert degree/radian information when needed, determine trigonometric signs and exact relations from geometry, use core identities legally, and apply the sine or cosine rule to recover an unknown side or angle with ambiguity handled explicitly.

Prerequisites: 003-004 / F2 solution-set and sign-case discipline; 001-002 / F1 principal-root and domain discipline; Elementary Euclidean triangle facts and coordinate-plane distance

Required ownership:
- Interpret radians through arc length/unit-circle rotation and convert standard degree and radian measures correctly.
- Determine signs of sine, cosine and tangent from unit-circle coordinates or quadrant location rather than an unsupported mnemonic.
- Use sin²x+cos²x=1 and quotient/reciprocal identities only where denominators are legal, retaining absolute values when a principal square root requires them.
- Use angle-addition consequences at the elementary level to derive or verify exact trigonometric values instead of treating every identity as independent memorisation.
- Apply the sine and cosine rules to a stated triangle and check whether side/angle data admit zero, one or more geometrically valid configurations.

Exit: On one unfamiliar root/trigonometric or triangle task, determine all required signs and branches from geometry, simplify with legal identities including any necessary absolute value, and obtain the requested side/angle relation with every admissible case justified without hints.

Out of scope: Full periodic solution families reserved for G1.2; Complex exponential trigonometry reserved for A4; Calculus of trigonometric functions; General olympiad triangle geometry

## 022 · G1.2 · Solve one periodic equation or triangle-identity task with domain checks.

Given an elementary equation in sine, cosine or tangent, reduce it by valid identities or substitutions, generate the complete periodic solution family, remove values excluded by the original expression, and filter correctly to a specified interval; for an identity-style triangle task, verify the geometric/domain assumptions before concluding.

Prerequisites: 021 / G1.1 radians, signs and basic identities; 003-004 / F2 equivalent versus implication-only equation steps; 001-002 / F1 denominator and root-domain preservation

Required ownership:
- State the natural domain of the original trigonometric equation before transformations that introduce or cancel denominators.
- Reduce standard equations to reference-angle information and generate all periodic branches rather than only a principal inverse value.
- Handle transformed arguments such as ax+b by solving the periodic family before isolating x, preserving the period scaling correctly.
- Avoid losing zero-factor solutions when dividing; split cases or factor the equation when necessary.
- Intersect the complete family with a requested interval and verify surviving candidates in the original equation when any non-equivalent step occurred.

Exit: Solve one unfamiliar elementary trigonometric equation completely, showing every periodic family, preserving zero-factor cases and domain exclusions, and return exactly the solutions in the stated interval or domain with no missing or extraneous branch.

Out of scope: Complex-number solution methods; Fourier or harmonic analysis; Calculus-based root counting; General functional periodicity already owned by A5.3

## 023 · A4.1 · Translate between Cartesian and polar complex form.

Given a nonzero complex number in Cartesian or polar form, compute its modulus and a valid argument from its quadrant, write the complete argument family when relevant, convert accurately between representations, and use conjugation/modulus relations without assigning an argument to zero.

Prerequisites: 021-022 / G1 unit-circle angle and sign control; 012-013 / A1 elementary polynomial/root algebra; 002 / F1.2 principal-root and domain discipline

Required ownership:
- Compute |z|=sqrt(x²+y²) and use the signs of x and y to locate a nonzero complex number in the correct quadrant before choosing an argument.
- Distinguish a chosen principal argument from the full family θ+2πk and state the convention being used when a principal range is requested.
- Convert x+iy to r(cos θ+i sin θ) and back exactly for standard angles and reliably for symbolic coordinates.
- Use conjugation to reflect the imaginary part and verify elementary identities such as z conjugate(z)=|z|² without conflating conjugate with reciprocal.
- Treat z=0 separately: its modulus is zero but no argument is defined, so polar-angle manipulations requiring r>0 cannot be applied to it.

Exit: Convert one unfamiliar nonzero complex expression between Cartesian and polar form, justify its quadrant and argument family, use conjugate/modulus structure correctly, and separately explain what fails if the same polar-angle step is attempted at z=0.

Out of scope: Complex roots and De Moivre branch enumeration reserved for A4.2; Complex analysis; Euler-series derivations; General locus classification beyond elementary representation

## 024 · A4.2 · Solve one root-of-unity or conjugate-locus question with every branch.

Given z^n=w, a roots-of-unity condition, or an elementary equation involving z and its conjugate, choose polar or Cartesian reasoning appropriately, enumerate every distinct root branch when the solution is finite, handle w=0 separately, and recognise when the equation instead defines a geometric locus.

Prerequisites: 023 / A4.1 Cartesian-polar conversion and argument families; 012-013 / A1 polynomial roots and multiplicity discipline; 021 / G1 angle periodicity and exact trigonometric values

Required ownership:
- Apply De Moivre to powers and derive nth-root arguments (θ+2πk)/n rather than quoting one principal radical.
- List exactly n distinct nth roots for nonzero w by choosing a complete nonrepeating set of k values and explain why later k repeat.
- Handle z^n=0 separately and avoid polar division or argument claims at zero.
- Recognise roots of unity as equally spaced points on the unit circle and use their symmetry for elementary sums/products when directly requested.
- For equations involving conjugate(z), write z=x+iy when useful and determine whether the resulting real constraints define finitely many points or a locus.

Exit: Solve one unfamiliar root-of-unity, nth-root or conjugate equation, produce every distinct finite branch when applicable, justify branch completeness and the zero exception, or state and derive the full elementary locus when the solution set is continuous.

Out of scope: General complex polynomial theory; Residues or analytic functions; Advanced complex loci/conformal geometry; Coordinate-geometry line/circle construction reserved for G2

## 025 · G2.1 · Turn a line/circle/distance problem into equations.

Given coordinates and elementary geometric conditions, construct appropriate line and circle equations, use distance or perpendicularity constraints to encode the problem, complete the square to recover centre-radius data, and identify degenerate or exceptional cases before solving further.

Prerequisites: 003-004 / F2 equations as exact solution sets; 001-002 / F1 square/root domain discipline; Elementary Cartesian coordinates and Pythagorean distance

Required ownership:
- Construct a line through stated points or satisfying a stated direction/perpendicular condition, using a form that remains valid when slope is undefined.
- Translate equal-distance, fixed-distance and centre/radius statements into squared-distance equations without introducing unnecessary square-root branches.
- Recognise x²+y²+Dx+Ey+F=0 as a circle candidate and complete the square correctly to recover its centre and squared radius.
- Classify the resulting radius-squared case as a genuine circle, a degenerate point or no real circle instead of assuming every quadratic-looking equation is nondegenerate.
- Use only incidences and geometric relations stated or algebraically derived; treat the diagram as illustrative rather than evidentiary.

Exit: Translate one unfamiliar line/circle/distance configuration into a complete algebraic system, recover any centre/radius data by completing the square, and identify all vertical-line or degenerate cases without adding an assumption from the diagram.

Out of scope: Tangency, reflection and detailed intersection conditions reserved for G2.2; Conic sections beyond circles; Vector-space geometry; Calculus-based geometric optimisation

## 026 · G2.2 · Check tangency, reflection, intersections or a rational-point construction.

Given equations for one or more lines/circles, determine tangency or intersection conditions from distance, discriminant or substitution reasoning, reflect a point or line across a simple axis/line using exact coordinates, and carry out an elementary rational-point construction when a known rational point and secant line are supplied.

Prerequisites: 025 / G2.1 equation-first line/circle modelling; 003-004 / F2 exact solution-set and boundary discipline; 001-002 / F1 root/domain preservation

Required ownership:
- Test line-circle or circle-circle tangency through an exact distance, discriminant or equivalent algebraic condition and state what equality means geometrically.
- Solve intersection systems without silently discarding repeated or degenerate solutions and distinguish zero, one and two real intersection points where appropriate.
- Reflect points across coordinate axes or elementary lines by deriving the coordinate transformation from midpoint/perpendicular conditions rather than memorising an unchecked formula.
- When a rational-point construction is supplied, parameterise a secant through a known rational point and justify why the second intersection remains rational under the stated coefficients.
- Separate algebraic multiplicity from distinct geometric points and revisit the original equations whenever elimination introduces an exceptional case.

Exit: Resolve one unfamiliar line/circle geometry problem by deriving the relevant algebraic condition, classify every real intersection/tangency case including degeneracies, and justify any reflection or rational-point step from the equations rather than the sketch.

Out of scope: General conic sections; Projective geometry; Advanced Diophantine geometry; Calculus-based curvature or optimisation

## 027 · P1.1 · Specify ordered elementary outcomes and whether they are equiprobable.

Given a finite sampling or arrangement story, define the elementary outcomes at a level that makes order and replacement explicit, determine whether those outcomes are equiprobable under the stated mechanism, and identify what information is lost if outcomes are prematurely collapsed into unordered summaries.

Prerequisites: 009-011 / F5 sets, Cartesian products and stated mappings; 003-004 / F2 exact-case discipline; Elementary product-rule intuition

Required ownership:
- State what one elementary outcome records and whether order is included before beginning any count.
- Identify whether draws are with or without replacement and whether sampled objects are distinguishable under the experiment.
- Use Cartesian-product or sequential-choice reasoning to enumerate or count ordered outcomes when appropriate.
- Justify equiprobability from the mechanism rather than from visual symmetry alone, and explicitly flag nonuniform elementary outcomes.
- Explain why collapsing several ordered outcomes into one unordered outcome can produce unequal weights unless every collapsed class has the same size.

Exit: For one unfamiliar finite experiment, specify the elementary ordered outcomes, replacement/distinguishability assumptions and their probability weights, and defend whether favourable-over-total counting is legal without relying on unstated symmetry.

Out of scope: Restricted-arrangement techniques reserved for P2; Conditional probability reserved for P4; Infinite sample spaces; Measure-theoretic probability

## 028 · P1.2 · Derive the correct permutation/combination count for that model.

Given a finite selection model, count ordered constructions by sequential choices, identify how many ordered constructions correspond to each unordered selection, derive the appropriate permutation or combination expression, and state the conditions under which the division by an order-factor is valid.

Prerequisites: 027 / P1.1 elementary-outcome and equiprobability modelling; 005 / F3 changed-input/parameter bookkeeping; 009 / F5 Cartesian-product counting viewpoint

Required ownership:
- Derive n(n-1)… style ordered counts directly from the number of legal choices at each stage.
- Recognise n! as the ordered arrangement count of n distinct objects and adapt the product when only k positions are filled.
- Explain combinations as quotienting ordered selections by the constant number of internal orderings when that constant-class-size condition holds.
- Switch between ordered and unordered versions of the same selection and identify the exact multiplicative conversion factor.
- Reject a permutation/combination formula when repeated or indistinguishable items make the naive k! correction invalid.

Exit: Count one unfamiliar selection twice—once with order and once without—and derive the exact conversion factor from the model, explaining why the quotient is uniform and rejecting any tempting factorial expression that overcounts.

Out of scope: Repeated-object multinomial counts reserved for P2.2; Case/gap restriction methods reserved for P2.1; Generating functions; Asymptotic combinatorics

## 029 · P2.1 · Count one restricted arrangement using cases, gaps or a bijection.

Given a constrained finite arrangement or selection, choose a valid case split, complement, gap method or bijection, prove that the construction covers every admissible object exactly once, and obtain the exact count without hidden overlap.

Prerequisites: 027-028 / P1 experiment modelling and ordered/unordered counts; 014-015 / A2 finite-sum/indexing discipline; 007-008 / F4 exhaustive/disjoint-case proof logic

Required ownership:
- State the restriction precisely and identify whether a direct, complementary, case-based, gap or bijective count simplifies it.
- For case splits, prove the cases are mutually exclusive and exhaustive before summing their counts.
- For gap methods, first arrange the anchor objects, count available gaps correctly, and then place restricted objects without creating forbidden adjacency.
- For complements, define the universe and forbidden subset on the same outcome model and verify that subtraction removes exactly the undesired objects.
- For bijections, describe both forward and inverse constructions so equality of counts is proved rather than suggested.

Exit: Solve one unfamiliar restricted arrangement exactly using a chosen case/gap/complement/bijection method, and prove in words why every admissible object is counted once and only once.

Out of scope: General inclusion-exclusion beyond elementary event arithmetic; Generating functions; Recurrence-based combinatorics; Advanced graph enumeration

## 030 · P2.2 · Handle one symmetry/overcounting, parity or binomial/multinomial-coefficient problem.

Given a finite count with symmetric representations, repeated categories, parity constraints or a coefficient request, derive the relevant binomial or multinomial coefficient from assignments to positions/factors, correct overcounting by actual orbit/class size when uniform, and diagnose when naive division by a symmetry factor fails.

Prerequisites: 029 / P2.1 restriction-aware counting; 028 / P1.2 ordered/unordered quotient logic; 014-015 / A2 finite sums and geometric/binomial-style algebra

Required ownership:
- Derive binomial coefficients as choices of factor/position assignments and multinomial coefficients as sequential category assignments with prescribed category sizes.
- Translate a coefficient in (x+y)^n or a simple multinomial expansion into an explicit counting statement instead of reading it as a memorised symbol.
- Apply parity or symmetry to pair/count objects only after identifying the involution or representation classes involved.
- Correct overcounting by the number of equivalent representations only when that number is constant across all final objects, and isolate exceptional symmetric objects when it is not.
- Explain why an attractive factorial count overcounts a constrained function, pairing or repeated-category arrangement and replace it with a justified count.

Exit: Solve one unfamiliar symmetry/parity or binomial/multinomial counting problem, derive the coefficient or correction from the underlying assignments, and explicitly justify why each final object has the claimed number of representations—or handle the exceptional classes separately.

Out of scope: Burnside/Polya theory; General group actions; Generating functions; Asymptotic coefficient estimates

## 031 · P3.1 · Derive and use complement, inclusion-exclusion and union bounds.

Given a finite probability space and overlapping events, verify that the assigned masses form a coherent probability law, compute complements and unions by set decomposition, apply two- or three-event inclusion-exclusion where justified, and use the union bound as an inequality rather than an equality.

Prerequisites: 027-028 / P1 outcome modelling and counting; 009 / F5.1 set operations by membership; 007-008 / F4 proof and counterexample discipline

Required ownership:
- Check nonnegativity and normalisation of an explicitly assigned finite probability law before using it.
- Derive P(A^c)=1-P(A) from a disjoint partition rather than memorising it as an isolated formula.
- Compute P(A∪B) and small finite unions by inclusion-exclusion, identifying exactly which intersections correct the overcount.
- Use P(A∪B)≤P(A)+P(B) and its finite extension as bounds, and state why equality need not hold.
- Separate combinatorial counting from probability weighting when elementary outcomes have unequal masses.

Exit: Given one unfamiliar nonuniform finite probability model, verify coherence, compute an overlapping union exactly by set decomposition, and produce a valid union-bound estimate while explaining why it is or is not sharp.

Out of scope: Conditional probability reserved for P4; Infinite unions except the monotone-limit passage in P3.2; Independence reserved for P6; Measure-theoretic probability

## 032 · P3.2 · Pass a finite event calculation to a monotone limit with the stated probability law.

Given an increasing sequence of events A_n or a decreasing sequence with the required finite-probability context, identify its limiting union/intersection, compute the finite-stage probabilities, and pass to the limit using the appropriate continuity law; state countable additivity at the operational level without treating arbitrary limits as automatically interchangeable with probability.

Prerequisites: 031 / P3.1 finite event arithmetic and union bounds; 018-019 / A5 elementary sequence-limit logic; 009 / F5 set membership and unions/intersections

Required ownership:
- Construct finite-stage events whose union or intersection is exactly the target infinite event.
- Prove the event sequence is increasing or decreasing before invoking continuity of probability.
- Use P(∪A_n)=lim P(A_n) for increasing sequences and the corresponding decreasing-event continuity law under its stated conditions.
- Distinguish countable additivity for disjoint events from a generic sum of overlapping event probabilities.
- Carry a finite complement/inclusion-exclusion calculation through the limit without silently assuming convergence of unrelated expressions.

Exit: Represent one unfamiliar infinite union or intersection as a monotone limit of finite events, derive the finite-stage probability exactly, and justify the limiting probability with the correct continuity law and hypotheses.

Out of scope: Borel-Cantelli lemmas; Measure-theoretic continuity proofs; Almost-sure convergence; Infinite independent products except when later justified in P6

## 033 · P4.1 · Compute a conditional law directly from event masses.

Given a table, tree, finite sample space or weighted event model and information B with P(B)>0, compute P(A|B) directly from P(A∩B)/P(B), derive the multiplication rule from that definition, and construct the full conditional distribution over a finite partition when requested.

Prerequisites: 031-032 / P3 event masses and probability laws; 009 / F5 set intersections and partitions; 027 / P1 explicit sample-space modelling

Required ownership:
- State the conditioning event and verify P(B)>0 before forming a finite conditional probability.
- Interpret A|B as restricting attention to B and then measuring the fraction of B-mass lying in A.
- Compute conditional probabilities directly from event masses or table/tree entries without assuming independence.
- Derive P(A∩B)=P(A|B)P(B) and its reversed form when both conditional probabilities are defined.
- Check that a finite conditional law over a partition of B is nonnegative and sums to one.

Exit: Given one unfamiliar table or tree, compute a complete finite conditional law from raw event masses, justify the denominator change, and derive any required joint mass using the multiplication rule without assuming independence.

Out of scope: Bayes reversal and total probability reserved for P4.2; Independence tests reserved for P6; Conditional densities; Regular conditional probability

## 034 · P4.2 · Reverse the information direction using a partition and Bayes.

Given a finite partition H_1,...,H_k and observed event E, compute P(E) by total probability, then obtain posterior probabilities P(H_i|E) from prior masses and likelihoods, preserving zero/positive-mass conditions and distinguishing the direction of each conditional probability.

Prerequisites: 033 / P4.1 direct conditioning and multiplication rule; 031 / P3 finite union arithmetic; 027-028 / P1 partition/counting awareness

Required ownership:
- Identify or construct a disjoint exhaustive partition of source cases before applying total probability.
- Compute P(E)=ΣP(E|H_i)P(H_i) and explain each term as a joint route to the evidence.
- Apply Bayes as P(H_i|E)=P(E|H_i)P(H_i)/P(E) only when P(E)>0.
- Keep priors, likelihoods, joint masses and posteriors distinct in tables and trees.
- Check posterior normalisation across the partition and use that check to detect denominator or direction errors.

Exit: Solve one unfamiliar reverse-conditioning problem from raw priors and conditional evidence probabilities, derive the denominator by total probability, compute all requested posteriors, and explain exactly how the reference class changed.

Out of scope: Continuous Bayes formulas; Bayesian inference as a full statistical framework; Likelihood-ratio testing; Independence beyond what is explicitly supplied

## 035 · P6.1 · Test independence and contrast it with disjointness.

Given two events in a finite or explicitly specified probability model, test independence using P(A∩B)=P(A)P(B) or an equivalent positive-denominator conditional criterion, test disjointness separately using A∩B=∅, and explain why nonempty probability-zero overlap is not the same thing as disjointness.

Prerequisites: 033-034 / P4 conditioning and Bayes; 031 / P3 intersection/union probability arithmetic; 027 / P1 explicit outcome modelling

Required ownership:
- Test independence from the actual factorisation P(A∩B)=P(A)P(B), not from informal unrelatedness.
- Test disjointness by the set statement A∩B=∅; do not replace it by P(A∩B)=0 unless the model guarantees that every elementary outcome in the intersection would have positive mass.
- Give or diagnose a finite zero-mass counterexample in which A∩B is nonempty but P(A∩B)=0, and state why this does not make the events disjoint.
- Prove that if A and B are disjoint with P(A)>0 and P(B)>0, then they cannot be independent.
- Use P(A|B)=P(A) only when P(B)>0 and recognise it as an equivalent independence test under that condition.
- Construct or diagnose examples showing that overlapping events may be independent and that probability-zero events create trivial independence edge cases.

Exit: For one unfamiliar pair of events in an explicitly specified model, determine set-theoretic disjointness and probabilistic independence separately, justify each conclusion with the correct criterion, and handle any zero-probability overlap or zero-marginal edge case without conflating the two notions.

Out of scope: Pairwise versus mutual independence reserved for P6.2; Conditional independence after conditioning reserved for P6.2; Random-variable independence; Measure-theoretic independence

## 036 · P6.2 · Separate pairwise, mutual and conditional independence in one counterexample.

Given three or more events and possibly a conditioning event, test pairwise and mutual independence from definitions, construct or analyse a counterexample separating them, and determine whether conditioning preserves or destroys an independence relation.

Prerequisites: 035 / P6.1 independence versus disjointness; 033-034 / P4 conditional laws and Bayes partitions; 031-032 / P3 event arithmetic and probability laws

Required ownership:
- State pairwise independence as separate factorisations for each event pair and mutual independence as the required factorisations for every relevant finite intersection.
- Produce or verify a concrete example in which each pair is independent but the full collection is not mutually independent.
- Compute conditional event probabilities on a positive-probability conditioning event before testing conditional independence.
- Explain explicitly how conditioning can alter the reference population and thereby destroy or create an independence relation.
- Keep disjointness, pairwise independence, mutual independence and conditional independence logically separate throughout the argument.

Exit: Given one unfamiliar finite event model, classify its pairwise, mutual and conditional independence properties from exact definitions, and either construct or explain a decisive counterexample separating at least two of those notions without hints.

Out of scope: Graphical models; Sigma-algebra independence in abstract measure theory; Asymptotic dependence concepts; Random-variable independence beyond the elementary bridge needed later

## 037 · J1.1 · Encode a payoff or count as a random variable or sum of indicators.

Given a finite experiment, define an appropriate random variable with its support, or express a requested count as a sum of indicator variables whose events are stated precisely, while preserving the distinction between outcomes, events and numerical values.

Prerequisites: 031-036 / P3-P6 event arithmetic, conditioning and independence; 027-030 / P1-P2 finite sample-space and counting structure; Basic function notation from F3-F5

Required ownership:
- Define a random variable as a numerical function of elementary outcomes and distinguish its support from the sample space.
- Construct an indicator I_A that equals 1 exactly on a stated event A and 0 otherwise.
- Express a count N as a sum of indicators whose individual success events correspond exactly to the counted objects.
- Check that overlapping events do not cause double counting unless the count itself is intended to count multiple simultaneous occurrences.
- List or derive the possible values of the resulting payoff or count and verify that the representation matches the original experiment on representative outcomes.

Exit: For one unfamiliar finite probability experiment, define the relevant payoff/count random variable or an exact sum-of-indicators representation, identify its support or interpretation, and verify the encoding on enough outcomes to establish that no event is omitted or double-counted incorrectly.

Out of scope: Expectation calculation reserved for J1.2; Continuous random variables; Measure-theoretic random-variable definitions; Variance/covariance reserved for J2

## 038 · J1.2 · Derive its expectation without adding an unnecessary independence assumption.

Given a finite random variable or count represented by indicators, derive its expectation from first principles or by linearity, identify exactly where probability inputs enter, and state which steps do and do not require independence.

Prerequisites: 037 / J1.1 random-variable and indicator encoding; 031-036 / event probabilities and independence distinctions; 014-015 / finite sums and indexing

Required ownership:
- Compute E[X] from a finite probability mass function as the weighted sum of possible values and their probabilities.
- Use E[I_A]=P(A) for an indicator and derive that identity rather than treating it as an unexplained shortcut.
- Apply linearity E[sum X_i]=sum E[X_i] without assuming independence or disjointness.
- Separate additive expectation arguments from multiplicative claims such as E[XY]=E[X]E[Y], which generally need additional hypotheses.
- Explain how dependence can change higher-order behaviour while leaving the linear expectation calculation unchanged.

Exit: Derive the expectation of one unfamiliar finite payoff or dependent indicator count, showing the representation, every probability input and the linearity step, and explicitly state why independence is or is not required at each stage.

Out of scope: Variance and covariance reserved for J2; Infinite-series expectation interchange; Conditional expectation beyond elementary event conditioning; Continuous expectation integrals

## 039 · J2.1 · Derive variance/covariance identities and a finite dependent-sum calculation.

Given finite random variables with existing second moments, derive Var(X)=E[X²]-E[X]², define and manipulate covariance, and compute the variance of a dependent finite sum with every covariance term accounted for.

Prerequisites: 037-038 / J1 random variables, indicators and expectation linearity; 035-036 / P6 independence distinctions; Finite algebraic expansion and indexed sums

Required ownership:
- Derive Var(X)=E[(X-E[X])²]=E[X²]-E[X]² whenever the needed moments exist.
- Define Cov(X,Y)=E[XY]-E[X]E[Y] and use its symmetry and bilinearity in finite algebraic expansions.
- Expand Var(sum X_i) into the individual variances plus all covariance cross terms with correct multiplicities.
- Set covariance terms to zero only when zero covariance is established; distinguish this from the stronger statement of independence.
- Check existence of the required second moments before manipulating variance or covariance expressions.

Exit: Derive and evaluate the variance of one unfamiliar finite dependent sum from expectations and covariance identities, showing every cross term and justifying exactly which terms vanish without assuming independence from zero covariance alone.

Out of scope: Continuous covariance integrals until continuous laws are introduced; Covariance matrices in full linear-algebra form; Asymptotic variance; Zero covariance as a general independence criterion

## 040 · J2.2 · Propagate moments through an overlapping sum or linear recurrence.

Given an elementary overlapping-sum construction or linear recurrence with stated innovation assumptions, propagate its mean and variance and compute at least one lag covariance by expanding shared and independent components explicitly.

Prerequisites: 039 / J2.1 variance-covariance algebra; 038 / J1.2 expectation linearity; 036 / P6.2 mutual and conditional independence discipline

Required ownership:
- Propagate expectations through a linear recurrence using linearity and the stated innovation mean.
- Propagate variance through a recurrence by separating scaled past variance from innovation variance and any justified covariance term.
- Identify which components two overlapping sums or lagged recurrence values share and use that overlap to compute covariance.
- Use independence of innovations only where explicitly stated and never promote it automatically to independence of the derived process values.
- Track the initial condition and iterate or solve a short moment recursion only to the level required by the problem.

Exit: For one unfamiliar overlapping-sum or linear-recurrence model with stated second-moment assumptions, propagate its mean and variance and derive a nontrivial lag covariance, identifying every independence step and every dependence created by shared components.

Out of scope: Stationary time-series theory; ARMA estimation; Stochastic-process asymptotics; Continuous-time stochastic recurrences

## 041 · D1.1 · Derive binomial and hypergeometric probabilities from the experiment.

Given a finite sampling story, specify the trial or draw mechanism, identify replacement and independence structure, derive the binomial or hypergeometric probability of a count, state its support, and justify every combinatorial factor from the experiment.

Prerequisites: 027-030 / P1-P2 counting models and symmetry correction; 033-036 / P4-P6 conditioning and independence; 037-040 / J1-J2 indicator expectations and variance algebra

Required ownership:
- Recognise a Bernoulli trial and derive the binomial count law by choosing which trials succeed and multiplying the corresponding success/failure probabilities.
- Recognise sampling without replacement and derive the hypergeometric count law by choosing successes and failures from finite categories over the total unordered sample count.
- State the exact feasible support of the requested count, including boundary restrictions imposed by population sizes.
- Explain why replacement creates an iid-trial model while no replacement changes subsequent draw probabilities and destroys that binomial structure.
- Check a derived law by summing over its support conceptually or combinatorially and by testing at least one edge case.

Exit: For one unfamiliar finite sampling problem, derive the appropriate binomial or hypergeometric probability law from the experiment, state the exact support, and explain precisely why the competing law is invalid in that setting.

Out of scope: Multinomial covariance reserved for D1.2; Poisson approximation reserved for D2.2; Continuous sampling laws; Asymptotic normal approximations

## 042 · D1.2 · Obtain multinomial means, variances, covariances and one conditional count law.

Given n independent categorical trials with category probabilities summing to one, derive marginal means and variances, derive cross-category covariances, and obtain a simple conditional count distribution after conditioning on one or more category totals.

Prerequisites: 041 / D1.1 binomial derivation; 037-040 / indicators, expectation, variance and covariance; 036 / independence distinctions

Required ownership:
- Represent each category count as a sum of trial-level indicators and derive E[N_j]=np_j from linearity.
- Derive Var(N_j)=np_j(1-p_j) using Bernoulli indicators and justified cross-trial independence.
- Derive Cov(N_i,N_j)=-np_i p_j for distinct categories by analysing mutually exclusive indicators within the same trial and independence across trials.
- Use the fixed-total identity sum N_j=n as a consistency check on the covariance structure.
- Condition on a partial category total and derive one resulting binomial or reduced-multinomial law by renormalising the relevant category probabilities.

Exit: For one unfamiliar multinomial experiment, derive at least one mean, variance and cross-category covariance and then derive a nontrivial conditional count law, explaining the dependence created by the fixed total.

Out of scope: General multivariate generating functions; Multinomial asymptotics; Dirichlet-multinomial models; Continuous multivariate distributions

## 043 · D2.1 · Derive a waiting-time law with an explicit trials/failures convention.

Given an iid Bernoulli sequence and a specified success target, define the waiting variable precisely, derive its geometric or negative-binomial mass function under the chosen convention, state the support, and translate correctly between trials-counted and failures-counted versions.

Prerequisites: 041-042 / D1 discrete count laws; 033-036 / conditioning and independence; 014-015 / finite and infinite geometric sums

Required ownership:
- Define whether the variable counts total trials through the r-th success or failures before the r-th success, and state the corresponding support before calculation.
- Derive the geometric mass from a run of failures followed by a success under iid Bernoulli trials.
- Derive the negative-binomial mass by locating the final required success and choosing the earlier successes among preceding trials.
- Translate between trials-counted and failures-counted conventions by an explicit deterministic shift rather than memorising two unrelated formulas.
- Use a geometric-series or elementary indicator argument to derive at least one basic waiting-time moment under the declared convention.

Exit: Derive one unfamiliar geometric or negative-binomial waiting law from the Bernoulli experiment, state the counting convention and support unambiguously, and convert the result to the alternative convention without an off-by-one error.

Out of scope: Continuous exponential waiting times; Renewal theory; Markov chains; Poisson process arrival times

## 044 · D2.2 · Use Poisson sums/factorial moments or a justified binomial approximation.

Given a Poisson variable, manipulate its defining series to compute probabilities or factorial moments; given a binomial rare-event model, assess whether a Poisson approximation is justified and use the matching rate parameter with clear assumptions.

Prerequisites: 043 / D2.1 waiting laws and series discipline; 041 / D1.1 binomial law from the experiment; 014-015 / exponential/geometric-style sum manipulation where applicable

Required ownership:
- State the Poisson support and mass function and verify normalisation using the exponential series at the level needed by the problem.
- Compute a factorial moment such as E[X(X-1)...(X-k+1)] by shifting the Poisson sum cleanly.
- Recover elementary ordinary moments from factorial moments when requested, without conflating the two notions.
- State the qualitative binomial-to-Poisson regime: many trials, individually rare successes, and np approaching or remaining near a finite rate lambda.
- Use lambda=np for a finite approximation only after checking that the underlying binomial model and rare-event conditions make the approximation plausible.

Exit: For one unfamiliar count problem, correctly use a Poisson sum or factorial moment and, when an approximation is proposed, justify or reject the binomial-to-Poisson step from the experiment and parameter regime rather than from pattern matching.

Out of scope: Poisson processes; Compound Poisson models; Normal approximation to Poisson; Formal approximation-error bounds unless supplied

## 045 · N1.1 · Derive the variance of a sample average.

Given iid observations X1,...,Xn with finite mean and variance, derive E[Xbar] and Var(Xbar)=sigma^2/n from first principles, identify where identical distribution and independence enter, and diagnose how the formula changes when those assumptions fail.

Prerequisites: 039-040 / J2 variance-covariance algebra and dependent sums; 037-038 / J1 expectation linearity; 036 / independence discipline

Required ownership:
- Write the sample average as n^{-1} times a sum and derive its expectation by linearity.
- Apply Var(aY)=a^2 Var(Y) so the averaging factor contributes 1/n^2 before the sum variance is evaluated.
- Use independence to eliminate cross covariances and identical distribution to replace each variance by the common sigma^2.
- Conclude Var(Xbar)=sigma^2/n without invoking normality or any large-sample approximation.
- Write the corresponding covariance-expanded expression for a dependent or non-identically distributed sample and identify which simplifications no longer hold.

Exit: Starting only from iid sampling with finite variance, independently derive E[Xbar] and Var(Xbar)=sigma^2/n, identify every assumption used, and correctly rewrite the variance expression for one non-iid or dependent alternative.

Out of scope: Unbiased n-1 sample variance correction reserved for N1.2; Central limit theorem; Normal-theory sampling distributions; Asymptotic standard errors

## 046 · N1.2 · Derive the n-1 variance correction without assuming normality.

Given iid observations with finite variance, derive E[sum (X_i-Xbar)^2]=(n-1)sigma^2, explain why centring at the estimated sample mean removes one degree of freedom, and distinguish sample from population variance conventions.

Prerequisites: 045 / N1.1 mean and variance of the sample average; 039-040 / J2 variance-covariance algebra; 038 / J1 expectation linearity

Required ownership:
- State the iid finite-variance assumptions actually needed for unbiasedness and explicitly note that normality is not required.
- Use the identity sum(X_i-Xbar)^2 = sum(X_i-mu)^2 - n(Xbar-mu)^2 and justify it algebraically.
- Take expectations term by term to obtain (n-1)sigma^2.
- Distinguish the population second central moment, the n-denominator empirical variance and the unbiased n-1 sample variance.
- Identify what breaks or changes under non-iid sampling by locating the hidden covariance or unequal-variance terms.

Exit: Derive the n-1 correction from first principles for an iid finite-variance sample, state every assumption used, and explain how the derivation changes if independence or identical distribution is removed.

Out of scope: Chi-square distribution of sample variance; Normal-theory confidence intervals; Asymptotic variance estimation; ANOVA decompositions beyond the elementary identity

## 047 · R5.1 · Compute descriptive summaries with explicit denominator and quantile conventions.

Given a finite dataset, compute mean, median, quantiles, IQR, raw and central moments, and sample or population variance under explicitly declared conventions, checking that the chosen definitions match the question.

Prerequisites: 046 / N1.2 sample-versus-population variance conventions; 014-015 / indexed finite sums; Basic order and arithmetic from foundations

Required ownership:
- Compute the arithmetic mean and median correctly from ordered or unordered finite data.
- State the quantile or quartile convention before using it when the position is not uniquely determined by the problem statement.
- Compute IQR from the declared quartiles and distinguish it from range and standard deviation.
- Distinguish raw moments E-like averages of x^k from central moments based on deviations from the sample mean.
- Label variance calculations with the exact denominator convention and avoid switching between sample and population formulas mid-solution.

Exit: Compute a complete set of requested descriptive summaries for one unfamiliar dataset, explicitly declaring every denominator and quantile convention and distinguishing raw from central moments without correction.

Out of scope: Robust-estimation theory; Kernel quantiles; Large-sample distribution theory; Regression summaries reserved for R1

## 048 · R5.2 · Update sums/squared sums and explain a scale, skewness or kurtosis measure.

Given current sample size, sum and squared-sum information, update mean and variance after a data change and compute or interpret coefficient of variation, skewness or kurtosis with its convention and domain stated.

Prerequisites: 047 / R5.1 descriptive summaries and conventions; 046 / variance denominator discipline; 014-015 / finite-sum algebra

Required ownership:
- Update n, sum x_i and sum x_i^2 after adding or removing an observation before recomputing any derived statistic.
- Recover mean and a declared variance convention from updated sums and squared sums without re-listing all observations.
- Define coefficient of variation as a relative scale measure and state when a zero or inappropriate mean makes it misleading or undefined.
- State the skewness convention being used and interpret the sign qualitatively without overclaiming distributional shape.
- Distinguish kurtosis from excess kurtosis and account for the subtract-three convention when relevant.

Exit: Update mean and variance correctly from compressed summaries after a data change and explain one scale, skewness or kurtosis measure with its convention, units and any domain restriction stated explicitly.

Out of scope: Online numerical-stability algorithms; Higher-order asymptotic moments; Robust skewness estimators; Time-series update filters

## 049 · R1.1 · Compute Pearson and Spearman and state their existence/tie conditions.

Given paired data, compute Pearson correlation and Spearman rank correlation, identify when either is undefined, apply a coherent tie rule, and explain what each coefficient does and does not measure.

Prerequisites: 047-048 / R5 descriptive summaries and variance conventions; 039 / covariance identity; Basic ranking and ordered data

Required ownership:
- Compute Pearson correlation from centred cross-products, standard deviations or an equivalent algebraically justified formula.
- Check that both marginal variances are positive before declaring Pearson correlation defined.
- Convert observations to ranks and compute Spearman as Pearson correlation of those ranks.
- Use and state an appropriate tied-rank convention rather than applying the no-ties shortcut blindly.
- Explain the distinction between linear association, monotone association, independence and causation.

Exit: Compute Pearson and Spearman for one unfamiliar paired dataset, state the tie and existence conventions, and explain a meaningful difference between the two coefficients without interpreting correlation as causation or independence.

Out of scope: Partial correlation; Rank-test asymptotics; Causal inference; Multiple regression

## 050 · R1.2 · Use regression-line identities or construct a pooling/nonlinearity counterexample.

Given simple-regression summaries or a small constructed dataset, use b_yx b_xy = r^2 with sign consistency where legal, relate simple-regression R^2 to r^2, and construct or analyse a counterexample showing that pooled or nonlinear association can mislead.

Prerequisites: 049 / R1.1 Pearson and Spearman; 039 / covariance and variance identities; 047-048 / descriptive scale summaries

Required ownership:
- Write the slope of Y on X as Cov(X,Y)/Var(X) and the slope of X on Y as Cov(X,Y)/Var(Y) when the denominators are positive.
- Derive the product of the two simple-regression slopes as r^2 and keep the common sign of the slopes consistent with r.
- State that simple-regression R-squared with an intercept equals r^2 under the standard nondegenerate setup.
- Construct or verify an example of dependent variables with zero Pearson correlation or a perfectly monotone but nonlinear relation where Pearson is not plus or minus one.
- Explain how combining groups can change or reverse an association and identify the lurking group variable rather than treating the pooled coefficient as self-explanatory.

Exit: Solve one unfamiliar association problem using regression-line identities or a valid counterexample, and explain precisely why correlation alone can fail under nonlinearity, dependence or pooling.

Out of scope: Multiple regression algebra; Formal omitted-variable bias formulas; Causal identification; Generalised linear models

## 051 · M0.1 · Multiply and transpose conformable matrices correctly.

Given small rectangular or square matrices, decide which products are defined, compute them correctly, transpose sums and products with order preserved, and exhibit concretely why matrix multiplication need not commute.

Prerequisites: 003-004 / F2 equations and solution sets; Basic finite sums and arithmetic; Function/input discipline from F3

Required ownership:
- State the dimension condition for AB and predict the dimension of the product before calculating entries.
- Compute each entry of AB as the appropriate row-column dot product rather than entrywise multiplication.
- Use (AB)^T=B^TA^T and verify the reversal on a concrete example.
- Distinguish A^2 from entrywise squaring and explain when A^2 is even defined.
- Give a valid pair of matrices for which AB and BA differ, including the possibility that only one order is defined.

Exit: Without hints, simplify and compute one unfamiliar conformable matrix expression, reject every illegal product, preserve transpose order, and supply a concrete demonstration that AB need not equal BA.

Out of scope: Determinants and inverses reserved for M3; Eigenvalues reserved for M4; Abstract linear maps; Tensor products

## 052 · M0.2 · Perform reversible row operations on one small system.

Translate a small linear system to an augmented matrix, row-reduce it using only reversible elementary row operations, record those operations, and translate the reduced rows back into equations or solution information.

Prerequisites: 051 / M0.1 matrix notation and dimensions; 003-004 / F2 equations as solution sets; Elementary algebraic elimination

Required ownership:
- Encode a finite linear system as an augmented matrix without losing constants or variable order.
- Use only row swaps, multiplication of a row by a nonzero scalar, and addition of a multiple of one row to another.
- Explain why each elementary row operation is reversible and therefore preserves the system's solution set.
- Carry every row operation across the full augmented row, including the right-hand side.
- Read a reduced small system back into equations and verify a candidate solution in the original system.

Exit: Row-reduce one unfamiliar small augmented system to a useful echelon form, recording only valid reversible operations, then interpret and check the resulting solution information against the original equations.

Out of scope: Rank classification reserved for M2; Determinants; Matrix inversion algorithms; Numerical stability and pivoting analysis

## 053 · M1.1 · Test a proposed subspace and a dependence relation.

Given a concrete subset of a familiar vector or polynomial space and a finite vector list, test the subspace conditions and either exhibit a nontrivial dependence relation or prove that only the trivial relation is possible.

Prerequisites: 051-052 / M0 matrix arithmetic and elimination; 007-010 / F4-F5 mathematical claims, sets and functions; Linear equations from F2

Required ownership:
- Test zero-vector membership and closure under vector addition and scalar multiplication, or use the equivalent linear-combination closure criterion.
- Disprove subspace status with one explicit failed condition rather than unnecessary computation.
- Translate linear dependence into an equation c1v1+...+ckvk=0 with coefficients not all zero.
- Exhibit a concrete nontrivial relation when dependence holds or row-reduce the homogeneous coefficient system to prove independence.
- Handle parameter-defined examples by identifying values at which closure or dependence behaviour changes.

Exit: For one unfamiliar proposed subspace and one unfamiliar finite vector family, give a definition-based verdict with either a decisive closure counterexample/nontrivial dependence relation or a complete proof that the required condition holds.

Out of scope: Basis extraction reserved for M1.2; Rank-nullity theorem; Inner-product geometry; Infinite-dimensional functional analysis

## 054 · M1.2 · Find and justify a basis/dimension for a constrained space.

Given a small constrained vector or polynomial space, parameterize its elements or reduce a spanning family, produce a basis, prove spanning and independence, and state the resulting dimension including exceptional parameter cases.

Prerequisites: 053 / M1.1 subspaces and dependence; 052 / M0.2 elimination; 004 / F2 parameter-dependent solution sets

Required ownership:
- Solve linear constraints to express every vector in the space using explicit free parameters.
- Read candidate spanning vectors from that parameterization or extract pivot-independent generators from a supplied spanning family.
- Prove that the proposed vectors span the entire stated space rather than only selected examples.
- Prove independence of the proposed basis vectors using a coefficient equation or elimination.
- Separate exceptional parameter values where pivots, constraints or generators change and recompute the dimension there.

Exit: Construct and justify a basis for one unfamiliar constrained vector or polynomial space, proving both spanning and independence and correctly identifying any parameter values at which the dimension changes.

Out of scope: Rank-nullity as a theorem; Change-of-basis matrices; Orthogonal bases; Infinite-dimensional bases

## 055 · M2.1 · Classify consistency and solution dimension by ranks.

Given Ax=b for a small finite system, row-reduce the coefficient/augmented data, determine rank(A) and rank([A|b]), classify consistency, and when consistent determine whether the solution is unique or has a positive-dimensional family.

Prerequisites: 053-054 / M1 span, independence, basis and dimension; 052 / M0.2 reversible row reduction; 003-004 / F2 solution sets

Required ownership:
- Determine coefficient rank and augmented rank from a valid echelon form rather than from the raw number of rows or columns.
- Use equality of coefficient and augmented ranks as the consistency criterion for Ax=b.
- For a consistent n-variable system, relate the number of free variables to n-rank(A) and describe the resulting solution dimension.
- Distinguish no solution, exactly one solution and infinitely many solutions using rank and pivot information.
- Write the full solution of a consistent underdetermined system as a particular solution plus free homogeneous directions.

Exit: For one unfamiliar small system Ax=b, compute both relevant ranks, classify consistency, state the exact solution-family dimension when consistent, and express the complete solution with its free directions without hints.

Out of scope: Parameter-dependent rank proofs reserved for M2.2; Determinants and invertibility reserved for M3; Least squares; Numerical rank

## 056 · M2.2 · Prove a parameter-dependent uniqueness or rank-bound claim.

Given a small parameter-dependent linear system or matrix, identify the exceptional parameter values, classify solution behaviour, and justify uniqueness or a claimed rank bound through pivots, null space or rank inequalities.

Prerequisites: 055 / M2.1 rank-based consistency and solution dimension; 053-054 / M1 span, independence, basis and dimension; 003-004 / F2 parameter-safe equation solving

Required ownership:
- Separate generic and exceptional parameter values before dividing by any parameter-dependent pivot.
- Use rank(A), rank([A|b]) and nullity to distinguish no solution, unique solution and infinitely many solutions.
- Justify uniqueness by showing the homogeneous null space is trivial rather than by verbal assertion.
- Prove a small rank bound using row/column dependence or elementary rank inequalities available from the setup.
- Check every claimed parameter case against the original matrix or system after reduction.

Exit: For one unfamiliar parameter-dependent system or matrix, give the exact parameter partition, classify solution behaviour or rank in every case, and prove the uniqueness or rank claim without illegal division.

Out of scope: Determinant shortcuts reserved for M3; Abstract rank factorisation; Jordan form; Numerical conditioning

## 057 · M3.1 · Use determinant/inverse/trace identities with order preserved.

Simplify or prove small matrix identities using determinant multiplicativity, transpose rules, inverse-of-product order, triangular structure and basic trace cyclicity, with all dimension and invertibility assumptions stated.

Prerequisites: 051-056 / M0-M2 matrix arithmetic, row reduction and rank; 012-013 / A1 polynomial identities and factors; Matrix-product order discipline from M0

Required ownership:
- Use det(AB)=det(A)det(B) and det(A^T)=det(A) with conformability understood.
- Use (AB)^{-1}=B^{-1}A^{-1} only when both inverses exist.
- Relate nonzero determinant, invertibility and full rank for square matrices.
- Exploit triangular determinant structure and determinant changes under elementary row operations.
- Use trace linearity and valid cyclic rearrangement without treating trace as fully commutative.

Exit: Resolve one unfamiliar determinant/inverse/trace identity problem, stating every required hypothesis and preserving factor order at every step, with no scalar-style cancellation errors.

Out of scope: Determinant recurrences reserved for M3.2; Spectral trace formulas beyond elementary consequences; Matrix calculus; Jordan canonical form

## 058 · M3.2 · Derive a structured determinant recurrence or singularity criterion.

Given a small structured determinant sequence, expand along a sparse row or column to derive the correct recurrence with base cases, and use that recurrence to evaluate or identify singular parameter values.

Prerequisites: 057 / M3.1 determinant rules and invertibility; 014-015 / A2 finite sums and geometric progressions; supply the recurrence definition when needed; 012-013 / A1 polynomial factor reasoning

Required ownership:
- Choose an expansion that preserves the repeated matrix pattern after taking minors.
- Derive the recurrence including correct signs and parameter coefficients rather than guessing it from examples.
- State enough base cases to determine the recurrence uniquely.
- Use the recurrence to compute a requested determinant or factor a small determinant sequence.
- Translate determinant zero into a justified singularity conclusion for the square matrix.

Exit: For one unfamiliar structured matrix family, derive a valid determinant recurrence with base cases and use it to decide a requested determinant value or exact singularity condition independently.

Out of scope: General continuant theory; Asymptotic recurrence analysis; Toeplitz spectral theory; Large symbolic determinant software

## 059 · M4.1 · Find eigenspaces and determine whether diagonalisation is legal.

For a small real or complex matrix, obtain the characteristic polynomial, find eigenvalues and eigenspace bases, compare multiplicities, and decide diagonalizability with a complete reason.

Prerequisites: 057-058 / M3 determinant and invertibility structure; 012-013 / A1 polynomial roots and multiplicity; 023-024 / A4 complex roots and conjugation

Required ownership:
- Form and solve the characteristic equation for a small matrix using exact algebra.
- Find each eigenspace by solving (A-lambda I)x=0 and give a basis.
- Distinguish algebraic multiplicity from eigenspace dimension for repeated eigenvalues.
- Decide diagonalizability by whether a full eigenvector basis exists.
- Use trace, determinant or conjugate-root checks as consistency checks rather than substitutes for eigenspace analysis.

Exit: For one unfamiliar small matrix, compute all eigenvalues and eigenspace dimensions and give a rigorous yes/no diagonalizability decision, including any repeated-eigenvalue obstruction.

Out of scope: Jordan normal form; Spectral theorem reserved for M5; Numerical eigenvalue algorithms; Infinite-dimensional operators

## 060 · M4.2 · Use a polynomial identity or diagonalisation to obtain powers/roots.

Given a diagonalizable matrix or a supplied annihilating polynomial, compute a nontrivial matrix power efficiently and, when hypotheses permit, construct and verify a square root while distinguishing existence from uniqueness or exact root counts.

Prerequisites: 059 / M4.1 eigenspaces and diagonalisation legality; 057-058 / determinant and polynomial matrix structure; 023-024 / A4 complex roots and branch awareness

Required ownership:
- Use A=PDP^{-1} only after diagonalizability has been established and compute A^n=PD^nP^{-1} correctly.
- Use a supplied polynomial identity to reduce high powers of A to a bounded set of lower powers.
- Construct a square root spectrally only when the stated hypotheses make that construction legal.
- Verify any proposed root B directly by checking B^2=A rather than relying only on analogy with scalars.
- Distinguish proving existence or at least k roots from proving that exactly k roots exist.

Exit: Solve one unfamiliar matrix power or root problem using a legally justified method, verify the result, and state precisely whether the argument proves existence, a lower bound on roots, or an exact count.

Out of scope: Jordan-form power formulas; Matrix logarithms; Functional calculus; General classification of all matrix square roots

## 061 · M5.1 · Relate a symmetric quadratic form to its spectrum.

Given a real symmetric matrix or quadratic form, use an orthogonal eigenbasis to rewrite x^T A x, classify definiteness or semidefiniteness from eigenvalue signs, and identify when A^T A is positive definite versus merely positive semidefinite.

Prerequisites: 059-060 / M4 eigenspaces, diagonalisation and spectral calculations; 051-058 / matrix arithmetic, rank and determinant structure; 004 / F2 equation and inequality reasoning for sign claims

Required ownership:
- State the orthogonal diagonalisation A=QDQ^T for a real symmetric matrix and keep the symmetry hypothesis explicit.
- Use y=Q^T x to derive x^T A x=sum lambda_i y_i^2 and explain why orthogonality preserves zero versus nonzero vectors.
- Classify positive definite, positive semidefinite, negative definite, negative semidefinite and indefinite forms from the spectrum with correct quantifiers.
- Prove x^T A^T A x=||Ax||^2 and use the null space to distinguish positive semidefiniteness from positive definiteness.
- Handle zero eigenvalues and repeated eigenvalues without confusing multiplicity with the existence of zero-value directions.

Exit: For one unfamiliar real symmetric quadratic-form problem, derive the spectral sum-of-squares representation, classify the form with exact quantifiers, and justify when a related A^T A form is positive definite rather than merely semidefinite.

Out of scope: General nonsymmetric quadratic-form canonical theory; Sylvester criterion unless independently supplied; Singular-value decomposition; Convex optimisation and Hessian tests

## 062 · M5.2 · Verify a projection, squared-length or generalised-inverse identity.

Given a small full-column-rank matrix or a supplied candidate identity, verify an orthogonal projection or squared-length statement, and when requested verify a proposed generalised-inverse identity directly under the stated hypotheses.

Prerequisites: 061 / M5.1 symmetric spectral and A^T A structure; 055-056 / rank, null-space and uniqueness reasoning; 051-052 / matrix multiplication and transpose order

Required ownership:
- Check dimensions and the existence of every displayed inverse before manipulating a proposed projection or inverse-like formula.
- For P=A(A^T A)^{-1}A^T under full column rank, verify symmetry and idempotence and identify its range as the column space of A.
- Show the residual x-Px is orthogonal to the projected column space by a direct transpose calculation.
- Recognise expressions such as x^T A^T A x as squared Euclidean lengths and use this to prove nonnegativity or uniqueness claims.
- When a generalised-inverse identity is supplied, verify exactly the requested multiplication identity directly rather than importing a full pseudoinverse theory.

Exit: Given one unfamiliar small-matrix identity problem, verify or reject the proposed projection/squared-length/generalised-inverse statement from dimensions, rank assumptions and defining algebra, with no appeal to an unproved memorised formula.

Out of scope: SVD-derived pseudoinverse theory; Least-squares statistics beyond the projection identity; Gram-Schmidt algorithms; Numerical linear algebra and conditioning

## 063 · C1.1 · Evaluate a one-sided or piecewise limit with a stated definition.

Given an elementary rational, piecewise or sign-sensitive function, evaluate a one-sided or two-sided limit using an explicitly stated limit criterion, choosing algebraic simplification, rationalisation or bounding as appropriate.

Prerequisites: 018-020 / A5 sequence, recurrence and function-behaviour discipline; 005-006 / F3 changed inputs and parameter-aware functions; 001-003 / domain-safe algebra and solution-set reasoning

Required ownership:
- Distinguish f(a) from lim_{x->a} f(x) and explain why a removable hole can leave the limit unchanged.
- Evaluate left-hand and right-hand limits separately when the formula, sign or domain changes at the target point.
- Use exact algebraic cancellation or rationalisation only on a punctured neighbourhood where the transformation is valid.
- Use a simple squeeze/bound argument when direct algebra is insufficient but a standard bound is available.
- Declare that a two-sided limit exists only after the relevant one-sided limits are shown to exist and agree.

Exit: Evaluate one unfamiliar one-sided or piecewise finite limit, state the local definition or criterion being used, justify every algebraic/domain step, and decide correctly whether the corresponding two-sided limit exists.

Out of scope: Continuity proofs reserved for C1.2; Derivative limits reserved for C2; L'Hopital's rule; Taylor-series asymptotics

## 064 · C1.2 · Prove continuity or disprove a limit using two approaches.

Given a piecewise or elementary oscillatory function, prove continuity at a specified point when all conditions hold, or disprove an alleged limit by constructing two sequences or one-sided approaches that converge to the same input point but yield incompatible outputs.

Prerequisites: 063 / C1.1 one-sided and piecewise limits; 018-019 / A5 convergent sequences and subsequences; 007 / F4 claims, quantifiers and counterexamples

Required ownership:
- Check continuity at a point by verifying the function is defined there, the limit exists, and the limit equals the function value.
- Use one-sided limits at piecewise joins and endpoints when the domain makes them the relevant tests.
- Apply the sequential criterion operationally: if x_n->a but f(x_n) fails to approach the claimed L, that claim is false.
- Construct two approaching sequences or side-specific paths that force incompatible output limits in an elementary oscillatory or rational/irrational example.
- Distinguish a removable discontinuity, a jump and genuine nonexistence of the limit at the level needed by the problem.

Exit: For one unfamiliar difficult-point problem, either prove continuity with all required conditions or disprove the claimed limit by two explicit convergent approaches whose function values are incompatible, explaining exactly what conclusion fails.

Out of scope: Uniform continuity; Topological continuity in abstract spaces; Epsilon-delta proofs beyond what the problem explicitly demands; Differentiability reserved for C2

## 065 · C2.1 · Derive a polynomial sensitivity from the difference quotient.

Given a polynomial such as x^n for positive integer n or a low-degree polynomial combination, form the difference quotient, simplify it legally, take the limit and identify the resulting local sensitivity without invoking the power rule as a premise.

Prerequisites: 063-064 / C1 finite limits and continuity reasoning; 012-013 / A1 polynomial factors and algebraic identities; 014-015 / A2 finite sums; 030 / P2.2 binomial expansion

Required ownership:
- Write f'(x)=lim_{h->0}[f(x+h)-f(x)]/h and interpret the quotient as a secant slope over a vanishing input change.
- Expand or factor f(x+h)-f(x) so the common factor h is exposed before taking the limit.
- Derive the positive-integer power rule for a representative monomial from the binomial expansion or factor identity rather than quoting it.
- Extend the same first-principles calculation to one small polynomial by linear algebraic simplification of the difference quotient.
- State the input domain on which the derived polynomial derivative is valid and keep the derivative value distinct from the original function value.

Exit: Derive the derivative of one unfamiliar low-degree polynomial from the difference quotient alone, showing the legal cancellation and limiting step, and explain the resulting expression as local sensitivity rather than merely quoting a rule.

Out of scope: Product, quotient and chain rules reserved for C3; Piecewise differentiability reserved for C2.2; Higher derivatives; Taylor approximation and optimisation

## 066 · C2.2 · Test differentiability at a join or oscillatory point.

Given a piecewise, absolute-value or elementary oscillatory function at a specified point, first check continuity where relevant, then compare the left and right difference-quotient limits and decide whether a finite derivative exists.

Prerequisites: 065 / C2.1 difference quotient and first-principles derivative; 063-064 / C1 one-sided limits and continuity; 006-007 / F3-F4 piecewise functions, claims and counterexamples

Required ownership:
- State that differentiability at an interior point requires a single finite difference-quotient limit and therefore implies continuity there.
- For a piecewise join, compute the left and right difference quotients from the original function values rather than trusting branch derivative formulas at the boundary.
- Use |x-a|, cusp and corner examples to distinguish continuous-but-not-differentiable behaviour from a genuine discontinuity.
- Handle a simple oscillatory example by estimating or constructing approaches that show the difference quotient fails to settle to one finite value.
- Identify exactly whether failure comes from discontinuity, unequal one-sided derivative limits, divergence, or oscillation.

Exit: For one unfamiliar piecewise or oscillatory point, decide differentiability from the defining one-sided difference quotients, identify the exact failure mode if no derivative exists, and explain why continuity alone was insufficient.

Out of scope: General pathological nowhere-differentiable functions; Higher derivatives; Implicit differentiation; Mean-value theorems reserved for C4

## 067 · C3.1 · Establish/use product, quotient and chain rules on one composite.

Given an unfamiliar algebraic composite built from differentiable elementary pieces, decompose it into products, quotients and compositions, apply the corresponding rules correctly, and state the points where the resulting derivative formula is justified.

Prerequisites: 065-066 / C2 derivative definition and pointwise differentiability; 001-003 / domain-safe algebra; 006 / F3 changed-input and composition discipline

Required ownership:
- Apply (fg)'=f'g+fg' with every factor evaluated at the same input and without inventing unnecessary independence-like assumptions.
- Apply (f/g)'=(f'g-fg')/g^2 only where g is nonzero and the required component derivatives exist.
- Apply the chain rule to f(g(x)) by differentiating the outer function at g(x) and multiplying by g'(x).
- Parse a nested expression into a clear composition/product/quotient tree before differentiating when several rules interact.
- State the legal input set for the original expression and remove any points where a displayed derivative formula relies on an invalid denominator or undefined component.

Exit: Differentiate one unfamiliar nested algebraic composite using the correct rule sequence, justify each rule application, and list every input where the original or derivative formula is not legally defined.

Out of scope: Trigonometric/exponential/logarithmic rule catalogue reserved for C3.2; Implicit differentiation; Multivariable chain rules; Taylor expansions

## 068 · C3.2 · Differentiate trigonometric, exponential and logarithmic expressions on their legal domains.

Given a fresh expression involving sine/cosine, exponential or logarithmic terms, differentiate it correctly with product/quotient/chain structure and identify every input where the function or resulting formula is unjustified.

Prerequisites: 067 / C3.1 structural differentiation rules; 021-022 / G1 radian trigonometry and identities; 001 / domain-safe algebra

Required ownership:
- Use the standard derivatives of sin x and cos x with x measured in radians, then combine them with the chain rule for changed inputs.
- Differentiate exponential expressions including e^{g(x)} by carrying the inner derivative explicitly.
- Differentiate ln(g(x)) only where g(x)>0 in the real-valued setting and track the quotient g'(x)/g(x).
- Derive or correctly use tangent/related derivatives only on intervals where the defining quotient is valid.
- Audit the final derivative against the original domain instead of letting algebraic simplification silently create or restore excluded points.

Exit: Differentiate one unfamiliar mixed trigonometric/exponential/logarithmic expression, preserve every required inner factor, and state all points where either the original function or the displayed derivative is not justified.

Out of scope: Inverse-trigonometric derivatives unless supplied; Complex logarithms/exponentials; Implicit differentiation; Special functions

## 069 · C4.1 · Prove existence via IVT and distinguish it from uniqueness.

Given a continuous real function on a specified interval, verify the IVT hypotheses, use endpoint or subinterval signs to establish existence of a root or fixed point, and state clearly what additional reasoning would be required for uniqueness.

Prerequisites: 063-064 / C1 continuity and one-sided limits; 067-068 / C3 derivative toolkit for later monotonicity but not required for bare existence; 007 / F4 theorem hypotheses and counterexamples

Required ownership:
- State the IVT on a closed interval with continuity and identify the target value between f(a) and f(b).
- Use opposite endpoint signs, or an equivalent bracketing argument, to prove at least one zero exists in the interval.
- Handle the case of an endpoint zero separately rather than forcing a strict sign-change condition where it is unnecessary.
- Explain explicitly why the IVT conclusion is existence and not uniqueness, giving or recognising a continuous multiple-root counterexample.
- Translate a simple fixed-point equation g(x)=x into a root problem for h(x)=g(x)-x and bracket it by elementary interval/sign reasoning.

Exit: For one unfamiliar real root/fixed-point problem, choose or verify a valid interval, establish the exact IVT hypotheses and prove existence while explicitly stating why the argument does not yet prove uniqueness.

Out of scope: Newton iteration; Topological fixed-point theorems; Complex roots; Uniqueness arguments reserved for C4.2

## 070 · C4.2 · Use Rolle/MVT for a root count, derivative bound or fixed-point argument.

Given a differentiable real function on an interval, verify the theorem hypotheses and use Rolle/MVT to bound the number of roots, prove uniqueness, establish a derivative-based inequality or control a fixed-point map.

Prerequisites: 069 / C4.1 IVT existence reasoning; 067-068 / C3 legal differentiation; 007 / F4 quantifiers, implication and contradiction

Required ownership:
- State Rolle's theorem and MVT with continuity on [a,b] and differentiability on (a,b), keeping the endpoint roles explicit.
- Use two distinct roots to force at least one derivative root between them and iterate the idea to bound the number of roots from information about higher or lower derivative zero counts.
- Use a sign-definite derivative or MVT difference formula to prove strict monotonicity and hence uniqueness of a root already known to exist.
- Derive a bound |f(b)-f(a)|<=M|b-a| when |f'|<=M on the relevant interval and apply the same logic to a simple fixed-point uniqueness argument.
- Identify which conclusion can fail when continuity, differentiability or the endpoint-equality condition needed for Rolle is removed.

Exit: Solve one unfamiliar root-count, uniqueness or derivative-bound problem by explicitly checking Rolle/MVT hypotheses, constructing the needed derivative conclusion and explaining which hypothesis would break the proof if removed.

Out of scope: Banach fixed-point theorem as an abstract result; Taylor's theorem reserved for C5.2; Multivariable mean-value theorems; Complex analytic root counting

## 071 · C5.1 · Optimise on the stated domain, comparing critical points and boundaries.

Given a differentiable or piecewise elementary objective on a stated interval/domain, identify every legitimate extremum candidate, classify or compare them using derivative/sign information, and determine the requested local or global optimum without ignoring boundaries.

Prerequisites: 069-070 / C4 IVT, Rolle/MVT and monotonicity reasoning; 067-068 / C3 legal differentiation; 001-004 / F1-F2 domain constraints and solution sets

Required ownership:
- Translate the stated feasible domain into the exact interval/set over which the objective is being compared.
- Find interior critical points where f'=0 and also retain interior points where the derivative fails to exist but the function is defined.
- Use derivative signs or a valid second-derivative conclusion to classify local behaviour without treating either test as universally decisive.
- For a closed bounded interval, compare objective values at all interior candidates and endpoints before declaring a global maximum or minimum.
- For open or unbounded domains, distinguish an attained extremum from a supremum/infimum suggested only by limiting boundary behaviour.

Exit: Solve one unfamiliar constrained one-variable optimisation problem by stating the feasible domain, producing every legitimate candidate including boundaries, comparing them correctly and justifying whether the requested extremum is actually attained.

Out of scope: Multivariable optimisation; Lagrange multipliers; Convex optimisation theory; Taylor remainder arguments reserved for C5.2

## 072 · C5.2 · Justify one local approximation or limit with a valid Taylor remainder.

Given an elementary small-parameter expression and an appropriate supplied/standard Taylor formula, retain the necessary terms, control the remainder at the required order and use that control to justify the resulting approximation or limit.

Prerequisites: 071 / C5.1 local/global optimisation context; 063-068 / C1-C3 limits and legal derivatives; 014-015 / A2 finite-sum and order bookkeeping

Required ownership:
- State a finite Taylor expansion about the relevant point together with a remainder form or valid big-O/little-o order sufficient for the problem.
- Determine how many terms must be retained by inspecting cancellation and the scale of the denominator or comparison quantity.
- Propagate the remainder through addition, multiplication and division only when the required denominator/nonzero conditions are established.
- Use the controlled expansion to evaluate a local limit or quantify an approximation error, rather than treating a formal power series as an identity.
- Recognise when a standard elementary limit is already justified and avoid invoking unnecessary higher-order machinery.

Exit: Evaluate or justify one unfamiliar local approximation/limit by writing a sufficient finite Taylor expansion, stating a valid remainder order and showing explicitly that the remainder remains negligible after all cancellations and divisions.

Out of scope: Infinite power-series convergence theory; Analytic continuation; Multivariable Taylor formula; Asymptotic series beyond the finite remainder needed here

## 073 · C6.1 · Evaluate a definite integral by substitution, parts or interval splitting.

Given an elementary definite integral on a finite interval, identify its structural obstacle, choose an appropriate exact method, carry bounds and signs consistently, split the interval where the formula changes, and verify the result against basic sign/size expectations.

Prerequisites: 067-068 / C3 differentiation and chain/product structure; 021-022 / G1 trigonometric identities where needed; 001-003 / domain-safe algebra and interval reasoning

Required ownership:
- Use the Fundamental Theorem of Calculus to convert a known antiderivative into a definite integral evaluation on a legal finite interval.
- Perform a substitution with the differential and transformed bounds matched to the new variable, or explicitly back-substitute before using original bounds.
- Apply integration by parts with a deliberate choice of factors and preserve the endpoint term exactly.
- Exploit even/odd or interval symmetry only after verifying the required symmetry of both integrand and domain.
- Split at every point where an absolute value, piecewise definition or ordinary integrability issue changes the valid formula.

Exit: Evaluate one unfamiliar finite definite integral by choosing and justifying an appropriate method, carrying bounds and interval splits correctly, and checking the final sign or magnitude against the integrand's qualitative behaviour.

Out of scope: Improper endpoint/tail convergence reserved for C6.2; Measure-theoretic integration; Special-function antiderivatives; Numerical quadrature

## 074 · C6.2 · Determine the convergence range of one improper integral.

Given an elementary parameter-dependent improper integral, identify all improper points, split them into separate defining limits, determine convergence at each point using exact calculation or a justified comparison, and intersect the resulting parameter conditions.

Prerequisites: 073 / C6.1 finite definite integration methods; 063 / C1 one-sided limits; 003-004 / F2 equations, inequalities and solution sets

Required ownership:
- Rewrite each improper endpoint, interior singularity or infinite tail as its own one-sided limit of proper integrals.
- Use the correct power threshold near zero/finite singularities and at infinity, deriving it from an antiderivative when uncertain rather than relying on memory alone.
- Split at an interior singularity and require both one-sided improper integrals to converge independently; do not use principal-value cancellation unless explicitly requested.
- For a parameter-dependent integrand, solve the convergence condition at every problematic point and intersect the conditions into the final parameter range.
- Distinguish convergence from the separate task of evaluating the integral's finite value.

Exit: For one unfamiliar parameter-dependent improper integral, identify every improper region, justify convergence or divergence separately at each one and give the exact intersected parameter range before attempting any value calculation.

Out of scope: Cauchy principal value unless explicitly requested; Lebesgue integrability; Advanced convergence theorems; Complex contour integrals

## 075 · C7.1 · Recognise and justify a Riemann-sum limit.

Given a finite-sum limit of the standard n-scaled type, rewrite it in Delta-x times function-at-sample-point form, identify the corresponding interval and integrand, and justify convergence to the definite integral when the integrand is continuous or otherwise covered by the elementary Riemann framework.

Prerequisites: 073-074 / C6 definite and improper integral discipline; 014-015 / A2 finite sums and indexing; 006 / F3 changed inputs and parameter mapping

Required ownership:
- Match a sum to Delta x times f(x_k) by identifying the partition interval, mesh width and sample-point formula explicitly.
- Account for interval lengths other than one and for affine sample points such as a+(b-a)k/n without dropping the factor b-a.
- Use continuity on a compact interval, or an explicitly justified elementary Riemann-integrability condition, to pass from the finite sums to the definite integral.
- Reindex or algebraically reshape a sum when necessary without changing its limiting contribution incorrectly.
- Detect an unbounded or singular endpoint and refuse to apply the ordinary continuous Riemann-sum theorem blindly; reserve the extra endpoint estimate for C7.2.

Exit: Convert one unfamiliar normalised finite-sum limit into a definite integral by explicitly identifying Delta x, sample points, interval and integrand, and state why the ordinary Riemann-sum limit theorem is legal or exactly what endpoint issue prevents its use.

Out of scope: Singular-endpoint estimates reserved for C7.2; Lebesgue integration; Euler-Maclaurin corrections; Rates of convergence for quadrature

## 076 · C7.2 · Convert a positive product into a logarithmic sum and control a singular endpoint if present.

Given a positive product whose exponent or geometric-mean scaling suggests a limit, take logarithms, rewrite the expression as a normalised sum, identify the limiting integral, control any singular endpoint separately, and exponentiate only after the logarithmic limit is established.

Prerequisites: 075 / C7.1 ordinary Riemann-sum recognition; 074 / C6.2 improper endpoint convergence; 014-015 / A2 products, sums and indexing

Required ownership:
- Check positivity of every factor before replacing a product by the sum of its logarithms.
- Rewrite log of the product or geometric mean as a correctly scaled finite sum and identify the corresponding sample-point map.
- Distinguish a continuous bounded integrand from a logarithmic or other integrable singularity at an endpoint.
- Isolate a small endpoint portion and bound its contribution directly, or compare it with an appropriate improper integral, instead of invoking continuity where none exists.
- After the logarithmic limit is proved, use continuity of the exponential map to recover the original positive product limit.

Exit: Solve one unfamiliar positive-product limit by proving positivity, converting it to a logarithmic sum, identifying the limiting integral, supplying any required singular-endpoint estimate, and exponentiating only after the logarithmic limit is justified.

Out of scope: Euler-Maclaurin expansions; Infinite products as a general theory; Complex logarithms; Tauberian or advanced asymptotic methods

## 077 · G3.1 · Classify a completed-square quadratic, including degeneracy.

Given an axis-aligned or reducible quadratic equation in x and y, complete squares, rewrite it in standard form when possible, and classify the exact locus including nondegenerate and degenerate cases.

Prerequisites: 025-026 / G2 coordinate equations and intersections; 001-003 / F1-F2 domain-safe algebra and solution sets; 012-013 / A1 polynomial factorisation

Required ownership:
- Complete squares in x and y without changing the represented locus and isolate the constant term cleanly.
- Classify standard nondegenerate ellipse, hyperbola and parabola forms from their sign and coefficient structure.
- Recognise when the completed-square equation has no real points or collapses to a single point.
- Recognise and verify pair-of-lines or repeated-line degeneracies by factorisation or direct algebra.
- State the actual real locus rather than assigning a conic name from coefficients alone.

Exit: Classify one unfamiliar completed-square quadratic completely, including every parameter or sign case that changes the real locus, and justify any degenerate classification by direct algebra rather than by naming convention.

Out of scope: General rotation of axes for arbitrary xy terms; Projective classification; Matrix-pencil theory; Three-dimensional quadrics

## 078 · G3.2 · Recover focus/directrix/eccentricity for one standard conic.

Given a nondegenerate standard or translated conic, identify its principal axis, recover focal parameters, locate focus/foci and directrix/directrices, and state the eccentricity with the correct regime for parabola, ellipse or hyperbola.

Prerequisites: 077 / G3.1 conic classification and standard forms; 025-026 / G2 distance and coordinate equations; 021-022 / G1 elementary trigonometric and geometric identities when needed

Required ownership:
- For a standard parabola, read the focal parameter from the coefficient and locate the focus and directrix in the correct orientation.
- For an ellipse, use c^2=a^2-b^2 with a as the semimajor axis and identify e=c/a with 0<e<1.
- For a hyperbola, use c^2=a^2+b^2 along the transverse axis and identify e=c/a>1.
- Carry translations of the centre or vertex into every focus and directrix coordinate without changing relative offsets.
- Check the recovered data against the defining distance-ratio relation for at least one representative point or algebraic derivation.

Exit: For one unfamiliar nondegenerate standard or translated conic, recover the correct focal parameter(s), focus/foci, directrix/directrices and eccentricity, and verify consistency with the defining geometric relation.

Out of scope: Rotated general conics; Dandelin spheres; Projective geometry; Advanced optical properties of conics

## 079 · G4.1 · Use one conic parametrisation to locate a point.

Given a standard conic and a supplied or familiar elementary parametrisation, verify that the parametrised coordinates lie on the conic, recover the point corresponding to a parameter value, and note any duplicated or exceptional coverage relevant to later tangent work.

Prerequisites: 077-078 / G3 standard conics and focal geometry; 005-006 / F3 functions and parameter-aware inputs; 021-022 / G1 trigonometric identities for ellipse parametrisation

Required ownership:
- Verify a parametrisation by direct substitution into the conic equation rather than trusting its appearance.
- Use a standard parabola parametrisation such as (at^2,2at) or its orientation-equivalent form with the correct scale.
- Use trigonometric parametrisation for an ellipse and distinguish the parameter from the polar angle unless they coincide in the special case.
- Use a valid hyperbola parametrisation supplied by the problem or standard context, checking its real-domain restrictions.
- Identify any omitted, duplicated or undefined parameter values before using the parametrisation as if it were globally one-to-one.

Exit: Given one unfamiliar conic parametrisation, verify it against the conic equation, locate the requested parameter point exactly and state any domain or coverage exception that matters for subsequent geometry.

Out of scope: General rational parametrisation theory; Arc length; Curvature; Projective parametrisations

## 080 · G4.2 · Derive its tangent/normal and handle a vertical-slope exception.

Given a standard conic point in coordinates or parameter form, derive the tangent and when requested the normal by a justified differential or contact argument, and replace slope-intercept formulas by vertical/horizontal line equations when the derivative is zero or undefined.

Prerequisites: 079 / G4.1 conic parametrisation; 067-068 / C3 legal differentiation and chain rules; 077-078 / G3 conic equations and standard geometry

Required ownership:
- Differentiate an implicit conic equation at a regular point and solve for dy/dx only when the required denominator is nonzero.
- Differentiate a parametrisation and use dy/dx=(dy/dt)/(dx/dt) when dx/dt is nonzero, keeping zero-denominator cases separate.
- Derive a tangent equation through the actual point and verify it satisfies the expected first-order contact condition.
- Construct the normal from perpendicular direction data, using a vertical or horizontal line equation instead of an invalid reciprocal-slope expression when necessary.
- Recognise a vertical tangent or other exceptional direction from the derivative/parametric data and state the line equation directly.

Exit: For one unfamiliar conic point, derive the tangent and requested normal from first principles or legal differentiation, verify the point lies on the line(s), and handle any zero/undefined slope case with the correct vertical or horizontal equation.

Out of scope: Curvature and osculating circles; Singular algebraic-curve tangent cones; Envelope theory; Three-dimensional tangent planes

## 081 · D0.1 · Check CDF axioms and distinguish a jump from a density value.

Given a proposed scalar CDF, accept or reject it from monotonicity, right-continuity and limiting values; recover endpoint-sensitive probabilities and point masses from its increments and jumps; and state when differentiating a CDF does or does not legitimately produce a density.

Prerequisites: 063-064 / C1 one-sided limits and continuity; 031-032 / P3 event arithmetic on nonuniform spaces; 037-038 / J1 expectation through indicators and event notation

Required ownership:
- State the defining CDF F(x)=P(X<=x) and use it to distinguish P(X<x), P(X<=x), P(a<X<=b) and related endpoint variants.
- Check that a proposed CDF is nondecreasing, right-continuous and has limits 0 at -infinity and 1 at +infinity.
- Recover the atom at x from the jump F(x)-F(x-) and explain why a jump is probability mass rather than density height.
- For an absolutely continuous stretch, recover a density from F' only where the derivative representation is justified, while retaining the possibility of atoms elsewhere.
- Give or analyse a valid distribution for which point masses and a continuous component coexist, showing why a single ordinary PDF alone would lose information.

Exit: Independently accept or reject one unfamiliar proposed CDF with proof, compute at least one strict/non-strict endpoint probability correctly, identify every visible atom from jumps, and state precisely whether a PDF representation is available on each relevant piece.

Out of scope: Measure-theoretic Lebesgue decomposition; Weak convergence of distribution functions; Empirical-process asymptotics; Multivariate copula theory

## 082 · D0.2 · Construct or characterise a mixed/atomic law from a CDF constraint.

Given a CDF or partial law with unknown constants, determine atomic and continuous components from jumps, derivatives/integrals and total probability; then compute probabilities while preserving strict/non-strict endpoint effects and all components of the mixture.

Prerequisites: 081 / D0.1 CDF axioms, jumps and endpoint conventions; 073-074 / C6 finite and improper integration discipline; 029-032 / P2-P3 counting/event arithmetic and probability normalisation

Required ownership:
- Decompose a piecewise CDF into flat, jump and absolutely continuous pieces and identify the probability carried by each component.
- Use total mass one to solve unknown jump sizes or density normalising constants without double counting atom locations.
- Construct a valid CDF from a stated mixture containing one or more atoms plus a continuous component and verify all CDF axioms.
- Compute event probabilities that include an atomic endpoint correctly, distinguishing < from <= whenever the jump matters.
- Explain why a continuous one-dimensional marginal does not, by itself, imply that a higher-dimensional joint density exists; treat this as a warning, not as a new multivariate-density theory.

Exit: Construct or fully characterise one unfamiliar mixed law from CDF/probability constraints, verify total mass and CDF validity, and correctly evaluate an event whose answer changes if an atom at an endpoint is ignored.

Out of scope: General mixture-model estimation; Latent-class inference; Singular multivariate distributions beyond the stated warning; Measure decomposition theorems

## 083 · D3.1 · Work one uniform and one exponential probability/moment problem.

Solve representative uniform and exponential probability or moment questions, keeping support and rate/scale conventions explicit, and prove or invoke exponential memorylessness only after checking the conditioning event and positive-time hypotheses.

Prerequisites: 081-082 / D0 CDF/support/atom discipline; 073-074 / C6 definite and improper integrals; 041-044 / D1-D2 discrete named laws and waiting-time conventions; 039-040 / J2 variance and covariance calculations

Required ownership:
- For Uniform(a,b), state support and density, compute interval probabilities by length ratio/integration and derive at least one required moment directly.
- For an exponential law, state clearly whether the parameter is a rate and write the corresponding density, CDF and survival function on the correct support.
- Compute exponential probabilities and ordinary moments by integration or a justified tail-integral identity, checking convergence rather than assuming moments exist.
- Prove P(X>s+t | X>s)=P(X>t) for an exponential variable from the survival function and identify exactly where s,t>=0 and positive conditioning probability are used.
- Reject a fake memorylessness claim for a non-exponential example or a malformed conditioning event, explaining the structural reason it fails.

Exit: Solve one unfamiliar uniform problem and one unfamiliar exponential problem, with support and parameter convention stated explicitly, and include either a derivation or legally targeted use of memorylessness whose conditioning logic is fully justified.

Out of scope: Poisson-process theory beyond the waiting-time identity; Hazard-rate theory; Gamma sums reserved for D4; Statistical estimation of distribution parameters

## 084 · D3.2 · Standardise a normal probability and compute a required moment.

Given a normal variable with stated mean and variance, convert probability statements to standard-normal form without losing inequality direction or scale, use symmetry/complements correctly, and compute or derive the requested ordinary moment from Z=(X-mu)/sigma.

Prerequisites: 083 / D3.1 support/parameter discipline for named continuous laws; 005-006 / F3 changed inputs and affine transformations; 037-040 / J1-J2 expectation, variance and covariance algebra

Required ownership:
- Interpret X~N(mu,sigma^2) with sigma>0 and form Z=(X-mu)/sigma~N(0,1), distinguishing variance sigma^2 from standard deviation sigma.
- Translate one-sided and interval probability events into Z-inequalities, preserving or reversing inequality direction correctly under any additional affine transformation.
- Use standard-normal symmetry and complements to reduce probabilities to the available CDF form without double counting tails.
- Derive E[X] and Var(X) from X=mu+sigma Z and compute at least one required raw or central moment using known standard-normal moments supplied or previously established.
- State when a requested normal moment is finite and avoid importing unrelated MGF machinery before D4.

Exit: Solve one unfamiliar normal probability by explicit standardisation with all inequality and scale steps shown, then compute or derive a requested low-order moment from the affine representation X=mu+sigma Z without parameter confusion.

Out of scope: Multivariate normal distributions; CLT and asymptotic normal approximation; Normal-theory inference; MGF-based identification reserved for D4

## 085 · D4.1 · Use gamma/beta integrals and determine moment-existence ranges.

Given a gamma- or beta-type density or integral, recognise the appropriate normalising structure, convert correctly between rate and scale conventions, derive ordinary or inverse moments from the defining integral, and state the sharp existence condition before using the result.

Prerequisites: 083-084 / D3 continuous named laws and moment discipline; 073-074 / C6 finite and improper integrals; 037-040 / J1-J2 expectation, variance and dependent-sum structure

Required ownership:
- State the gamma density under a declared shape-rate or shape-scale convention and translate between the two without changing the underlying law.
- Recognise the gamma integral integral_0^infinity x^{a-1}e^{-bx} dx through a legal rescaling and extract the normalising constant rather than memorising it blindly.
- Recognise the beta integral on (0,1), identify its parameter restrictions and use B(a,b)=Gamma(a)Gamma(b)/Gamma(a+b) when that identity is appropriate.
- Derive E[X^r] for a gamma-type law by shifting the power in the defining integral and state the exact condition on r and the shape parameter for convergence.
- Handle inverse moments explicitly, explaining why E[X^{-m}] imposes a lower-bound condition on the shape parameter instead of assuming finiteness.

Exit: For one unfamiliar gamma/beta-style law, derive a required ordinary or inverse moment from the defining integral, state the exact parameter range for existence and verify that the normalising convention used is internally consistent.

Out of scope: Asymptotic gamma approximations; Incomplete gamma/beta special functions beyond a supplied identity; Bayesian conjugacy; MGF uniqueness and sum identification reserved for D4.2

## 086 · D4.2 · Identify a law or sum by an MGF with a valid existence domain.

Given a distribution or independent sum with a usable MGF, state its domain, differentiate only where justified, form products under independence, recognise a common-rate gamma or standard discrete sum identity, and invoke uniqueness only when the neighbourhood-of-zero condition is satisfied.

Prerequisites: 085 / D4.1 gamma/beta moments and parameter conventions; 041-044 / D1-D2 standard discrete families; 038-040 / J1-J2 expectation and covariance structure

Required ownership:
- Define M_X(t)=E[e^{tX}] and identify an open interval containing zero on which the expectation is finite before applying derivative or uniqueness results.
- Differentiate a valid MGF at zero to recover required low-order moments, keeping existence conditions explicit.
- For independent variables, derive M_{X+Y}(t)=M_X(t)M_Y(t) and state precisely where independence enters.
- Recognise that independent gamma variables with a common rate add by adding shape parameters, and refuse that simplification when the rates differ unless another derivation is supplied.
- Use a valid MGF identity to recognise familiar Poisson/binomial/gamma-type sums, distinguishing transform equality on a neighbourhood from unsupported formal algebra.

Exit: Identify one unfamiliar law or independent sum using an MGF only after stating a valid neighbourhood-of-zero domain, justify every product/uniqueness step and reject at least one tempting transform argument whose hypotheses fail.

Out of scope: Characteristic functions as a general replacement; Complex-analytic transform inversion; Cumulant-generating-function asymptotics; MGFs for laws such as Cauchy that do not exist near zero

## 087 · D5.1 · Transform a continuous variable with every branch and correct support.

Given a continuous X and a scalar transform Y=g(X), determine the support of Y, derive F_Y from the event {g(X)<=y} or use a branchwise density formula, include every valid inverse branch and absolute Jacobian factor, and verify that the resulting law normalises.

Prerequisites: 081-084 / D0-D3 CDFs, densities and continuous laws; 067-068 / C3 legal differentiation; 005-006 / F3 changed-input and parameter-aware function reasoning

Required ownership:
- Determine the image/support of Y before writing a transformed density, including endpoint effects from the support of X.
- For a one-to-one differentiable branch, derive f_Y(y)=f_X(g^{-1}(y))|d g^{-1}(y)/dy| under the stated regularity conditions.
- For many-to-one maps such as X^2 or |X|, sum contributions over every inverse branch that lies in the support of X.
- Use the CDF-event method when branch geometry, inequalities or monotonicity make direct density substitution error-prone.
- Check nonnegativity and unit integral of the final transformed density and reject formulas whose support or branch count makes normalisation fail.

Exit: Derive the law of one unfamiliar continuous scalar transformation, showing the output support, every valid inverse branch and derivative factor, and verify the final density integrates to one.

Out of scope: Two-variable Jacobians reserved for J5; Delta-method approximations; Normalising flows; Measure-theoretic pushforward theory

## 088 · D5.2 · Derive a rounded, censored or mixed law from probability events.

Given a discrete-making or censoring transform of a known variable, translate each output value or interval into a preimage event for X, compute the associated masses or continuous pieces, record any atoms, and verify the complete transformed law sums/integrates to one.

Prerequisites: 087 / D5.1 support and preimage discipline; 081-082 / D0 atoms, CDF jumps and mixed laws; 031-034 / P3-P4 event arithmetic and conditioning conventions

Required ownership:
- For floor, ceiling or rounding, express P(Y=k) as the probability of the exact preimage interval under X with endpoint conventions stated.
- For censoring or clipping, identify the interval of X collapsed to a boundary value and compute the resulting atom explicitly.
- Construct the resulting CDF or pmf/density mixture and retain both discrete and continuous components when both are present.
- Distinguish a jump in the transformed CDF from a high but finite density value and use jump size as point mass.
- Check total probability across all atoms and continuous regions, including threshold endpoints and tail pieces.

Exit: Derive the complete law of one unfamiliar rounded or censored transformation from preimage events, identify every atom and continuous component, state endpoint conventions and verify total probability one.

Out of scope: Survival-analysis censoring models; Multivariate transformations; Numerical quantisation-error models; D6 heavy-tail exceptions and supplied-density analysis

## 089 · D6.1 · Check Cauchy moment/MGF existence, separating absolute moments.

Given a Cauchy density or a closely related heavy-tailed law, determine whether requested ordinary moments, declared nonnegative-order absolute moments and the MGF exist, justify each conclusion from the relevant improper integrals, and distinguish a Cauchy principal value from a genuine expectation; if a negative power is explicitly requested, inspect local integrability as well as the tails.

Prerequisites: 085-086 / D4 moment-existence and MGF-domain discipline; 083-084 / D3 named continuous laws; 073-074 / C6 proper and improper integral convergence

Required ownership:
- Test existence of E[g(X)] through absolute integrability when ordinary expectation is claimed, rather than through formal symmetric cancellation.
- Show for the standard Cauchy law why the positive and negative first-moment contributions do not define a finite ordinary mean even though the density is symmetric.
- Distinguish an ordinary expectation from a Cauchy principal value and state that one cannot substitute for the other unless the problem explicitly asks for principal value.
- For the standard Cauchy law and a declared p≥0, derive that E[|X|^p] is finite exactly for 0≤p<1 by analysing the tail order |x|^(p-2); do not claim this tail criterion covers negative p.
- If a problem explicitly supplies p<0, check local behaviour near every point where |x|^p can be singular as well as the tail; for standard Cauchy this extra check at x=0 gives the full real-exponent range -1<p<1.
- Reject the ordinary MGF for the Cauchy law because E[e^{tX}] fails to be finite on an open interval around t=0, instead of manipulating a nonexistent transform.

Exit: For one Cauchy or unfamiliar symmetric heavy-tailed law, correctly classify the existence of a requested ordinary moment, a declared absolute moment and the MGF, justify every integrability claim at all relevant improper endpoints, and explicitly reject symmetry-only or divergent-cancellation arguments.

Out of scope: Characteristic functions beyond brief recognition; Stable-law theory; Complex analysis of Cauchy transforms; Regular variation and advanced heavy-tail asymptotics

## 090 · D6.2 · Analyse the needed part of a Laplace or unfamiliar supplied density.

Given a Laplace density or an unfamiliar elementary density, determine its support and normalising constant, compute the requested tail/event probability, derive only the needed moments when they exist, and identify absolute-deviation structure when relevant.

Prerequisites: 089 / D6.1 moment-existence discipline; 081-082 / D0 support, CDF and atoms; 073-074 / C6 definite and improper integration

Required ownership:
- Read the support directly from the supplied density and verify nonnegativity and unit total mass before treating it as a probability law.
- For a Laplace density, compute a one-sided or two-sided tail probability from the piecewise exponential structure with the correct location/scale convention.
- Recognise the role of |x-mu| in the Laplace density and connect it to absolute-deviation structure without overextending into inference theory.
- Compute a requested moment or transformed expectation only after checking that the corresponding integral is finite.
- For an unfamiliar supplied density, derive the required probability or moment directly instead of expanding a memorised list of named-distribution properties.

Exit: Given one unfamiliar supplied density, establish its support and normalisation, compute a requested tail probability and one requested finite summary, and explain why no additional named-distribution machinery is needed.

Out of scope: Maximum-likelihood estimation for Laplace parameters; Bayesian conjugacy; General exponential-family theory; Advanced robust-statistics asymptotics

## 091 · J3.1 · Recover joint/marginal laws from a finite table or planar support.

Given a finite joint probability table or a density on a simple planar region, identify and sketch the support, verify normalisation, derive both marginals with correct summation/integration limits, and check the results against the total mass.

Prerequisites: 031-036 / P3-P6 event and conditioning foundations; 083-088 / D3-D5 continuous laws and transformations; 073-074 / C6 integration with interval splitting

Required ownership:
- Represent a finite joint law as a table with nonnegative entries summing to one and obtain each marginal by summing across the complementary variable.
- For a planar density, state or sketch the support region before writing marginal integrals and derive variable-dependent limits from that geometry.
- Verify that the joint density integrates to one over its actual support and that each derived marginal integrates to one on its support.
- Explain why knowing both marginals does not in general determine the joint distribution or independence.
- Detect a proposed joint density or support description that is inconsistent with nonnegativity, normalisation or the stated region.

Exit: From one unfamiliar joint table or planar support, derive both marginals using the exact legal support, verify all laws normalise, and state what dependence information remains unresolved from the marginals alone.

Out of scope: General multivariate measure theory; Copulas; High-dimensional densities; Jacobian transformations reserved for J5

## 092 · J3.2 · Compute a conditional law and check independence on the full support.

Given a joint table or planar density, compute a valid conditional law at an admissible conditioning value, normalise it, and determine independence by checking joint-versus-product factorisation together with the support required by independence.

Prerequisites: 091 / J3.1 joint support and marginals; 033-034 / P4 conditioning and Bayes; 037-040 / J1-J2 expectation/covariance foundations

Required ownership:
- For a finite joint table, compute a conditional PMF by dividing the relevant joint masses by a positive conditioning marginal and verify the conditional masses sum to one.
- For a joint density, form f_{X|Y}(x|y)=f_{X,Y}(x,y)/f_Y(y) only for y with positive marginal density and state the resulting conditional support.
- Check independence by verifying f_{X,Y}=f_X f_Y or the discrete analogue on the full support, not merely at selected points.
- Use support geometry as an immediate diagnostic: non-product support can rule out independence even before detailed factorisation.
- Distinguish independence from zero covariance and from equality of a few conditional and marginal probabilities.

Exit: For one unfamiliar joint law, compute a correctly normalised conditional distribution at a legal conditioning value and give a complete independence verdict using both factorisation and support, explicitly rejecting covariance-only reasoning.

Out of scope: Regular conditional probability in measure-theoretic form; Conditional expectation depth reserved for J4; Jacobian transformations reserved for J5; Copula methods

## 093 · J4.1 · Find an expectation by conditioning on useful information.

Use the law of total expectation as a deliberate decomposition tool rather than as a formula applied after the hard work has already been done.

Prerequisites: J3 joint/marginal/conditional laws; J1 expectation; P4 conditioning and partitions

Required ownership:
- State the conditioning partition or random variable before calculating
- Compute E[X|Y=y] or branchwise conditional expectations on the correct support
- Weight conditional expectations by the corresponding probabilities or law of Y
- Use E[X]=E(E[X|Y]) with all branches retained
- Choose a conditioning variable that genuinely simplifies the problem
- Cross-check a small finite mixture directly when feasible

Exit: Given a staged or mixture experiment, choose a useful conditioning variable, derive every conditional mean, combine them with correct weights, and verify the result against a direct calculation when one is practical.

Out of scope: Measure-theoretic conditional expectation; Martingale theory; Optional stopping; Asymptotic conditioning arguments

## 094 · J4.2 · Derive total variance and apply it to a mixture or re-sampling scheme.

Decompose total variance into average conditional variance plus variance of conditional means, and diagnose which component a proposed calculation has dropped.

Prerequisites: J4.1 total expectation; J2 variance and covariance; J3 conditional laws

Required ownership:
- Derive the total-variance identity from E[X^2] and total expectation
- Compute E[Var(X|Y)] on the correct conditioning law
- Compute Var(E[X|Y]) as a separate random quantity
- Explain the within-condition versus between-condition interpretation
- Detect a solution that omits one variance component
- Verify a small mixture variance by direct second-moment calculation

Exit: For a mixture or re-sampling problem, compute the mean and variance by conditioning, exhibit both variance components explicitly, and explain why deleting either component changes the answer.

Out of scope: ANOVA theory beyond the identity; Random-effects estimation; Doob decompositions; General Hilbert-space projection theory

## 095 · J5.1 · Find one sum/ratio law by regions or convolution.

Translate a transformed event such as X+Y<=z or X/Y<=r into the correct region, derive the induced law, and normalise it over the transformed support.

Prerequisites: J3 joint/marginal laws; D5 univariate transformations; C6 definite integrals

Required ownership:
- Sketch or describe the original joint support before integrating
- Translate a sum or ratio event into inequalities in the original variables
- Derive integration limits from support intersections
- Use convolution only when its hypotheses and support are appropriate
- Handle ratio sign cases or denominator restrictions explicitly
- Check the resulting density or CDF is normalised on its transformed support

Exit: Derive one nontrivial sum or ratio law from its joint model, obtain the transformed support and piecewise limits correctly, and verify total probability one.

Out of scope: Characteristic-function convolution machinery; High-dimensional convolutions; Stable-law theory; General measure-theoretic pushforwards

## 096 · J5.2 · Establish and use a two-variable Jacobian on an invertible branch.

Apply a two-dimensional density transformation only on branches where the map is invertible, include every relevant branch, and carry support and absolute determinant factors correctly.

Prerequisites: J5.1 transformed laws by regions; M3 determinants; C3 derivatives; D5 branchwise univariate transformations

Required ownership:
- Compute the 2x2 Jacobian matrix from partial derivatives
- Compute and interpret the determinant as local area scaling
- Solve for the inverse map on a stated branch
- Use the absolute determinant of the inverse Jacobian in the density formula
- Transform the original support into the new variables
- Sum contributions from multiple valid branches when necessary
- Recognise a shared-variable construction whose law is singular and has no two-dimensional density

Exit: For a supplied two-variable transformation, derive the inverse branch or branches, compute the absolute Jacobian factor, transform the support, obtain a normalised law, and identify any case where a two-dimensional density does not exist.

Out of scope: Differential forms; General multivariate transformation theorems; Manifold integration; Singular-distribution theory beyond recognising absence of a 2D density

## 097 · J6.1 · Compare minimisers of squared and absolute deviation.

Derive and identify the full minimiser set for squared versus absolute deviation without assuming differentiability or uniqueness where those properties fail.

Prerequisites: J1 expectation; C5 one-variable optimisation; D0 CDFs and atoms; F4 quantified claims

Required ownership:
- Expand E[(X-a)^2] and isolate the term minimised at the mean when the second moment is finite
- Use one-sided slopes, finite sums or CDF probabilities to analyse E|X-a|
- State the median condition using P(X<=m) and P(X>=m)
- Retain an interval or multiple minimisers when the absolute-loss optimum is nonunique
- Distinguish the finite-first-moment condition from the stronger finite-second-moment condition
- Explain concretely why squared loss reacts differently to extreme observations from absolute loss

Exit: Given one squared-loss and one absolute-loss objective, derive the minimiser set from first principles, state the needed moment condition, and explain any nonuniqueness rather than selecting an arbitrary single value.

Out of scope: General convex-analysis subgradient theory; Quantile regression beyond median logic; Robust-statistics asymptotics; Multivariate geometric medians

## 098 · J6.2 · Find all minimisers of one weighted, reciprocal-input or two-group absolute-loss problem.

Rewrite a nonstandard absolute-loss objective into a transparent weighted balance problem and recover the complete minimiser set with boundary and sign cases handled correctly.

Prerequisites: J6.1 squared versus absolute-loss minimisers; F3 functions and legal domains; C5 optimisation

Required ownership:
- Convert repeated observations or coefficients into explicit positive weights
- Use cumulative weight on either side to identify weighted-median minimisers
- Preserve domain restrictions under reciprocal or other supplied positive-input transformations
- Handle two-group absolute-loss objectives without assuming an interior differentiable optimum
- List all minimisers when a flat interval occurs
- Check the proposed minimiser directly against the piecewise-linear objective or one-sided slopes

Exit: For one weighted or transformed absolute-loss problem, reduce the objective to its correct weighted ordering, determine all minimisers, justify any interval of optima, and verify domain legality throughout.

Out of scope: General linear programming duality; Lasso or penalised regression theory; Multivariate L1 regression; Asymptotic theory of sample medians

## 099 · P5.1 · Set up one first-step/waiting-time recurrence and its finite solution.

Choose a minimal state description, condition on the next outcome, form the correct expectation recurrence including the elapsed step, and solve the resulting finite system or scalar equation.

Prerequisites: P4 conditioning; J1 expectation; D2 geometric and negative-binomial waiting times; F2 equations

Required ownership:
- Define the waiting-time or state expectation before writing equations
- Condition on the complete set of possible first outcomes
- Include the one-step time cost in the recurrence
- Choose enough state information to make the future description valid
- Solve a small linear recurrence or finite system exactly
- Check the resulting expectation is finite and consistent with an elementary bound or known special case

Exit: For a supplied repeated-trial or finite-state waiting problem, define suitable state expectations, derive the first-step recurrence including elapsed time, solve it, and justify why the finite answer is legitimate.

Out of scope: Martingales; Optional stopping theorems; Infinite-state Markov-chain theory; Renewal theory beyond elementary first-step equations

## 100 · P5.2 · Solve one stopping question with additional conditioning or state information.

Update the starting state or conditional law correctly, then apply the appropriate first-step recurrence without double-counting information or assuming memorylessness that has not been proved.

Prerequisites: P5.1 first-step recurrences; P4 conditional probability; J4.1 total expectation by conditioning on the first step; D2 geometric waiting time

Required ownership:
- Translate the additional information into the correct conditional starting state or law
- Determine whether genuine memorylessness applies before using it
- Separate already elapsed time from future waiting time
- Write the first-step recurrence under the updated information
- Solve all relevant conditional states consistently
- Cross-check against the unconditional problem or a limiting special case when available

Exit: Given a stopping or waiting problem with additional information, construct the correct conditional starting description, derive and solve the updated recurrence, and explicitly justify every use or rejection of memorylessness.

Out of scope: Optional-stopping arguments; General Markov stopping-time theory; Doob martingales; Continuous-time stopping processes

## 101 · N3.1 · Calculate covariance and independence of jointly normal linear forms.

Given a jointly normal vector and linear forms a^T X and b^T X, compute their covariance from the covariance matrix, obtain their marginal normal laws, and justify independence exactly when the covariance vanishes.

Prerequisites: D3 normal distribution; J3 joint and marginal laws; M5 quadratic forms and covariance-matrix geometry

Required ownership:
- Compute the mean of a linear form a^T X from the mean vector
- Compute Var(a^T X)=a^T Sigma a and Cov(a^T X,b^T X)=a^T Sigma b
- State that linear transformations of a jointly normal vector remain jointly normal
- Use zero covariance to conclude independence only after joint normality has been established
- Distinguish covariance from correlation and handle zero-variance components separately
- Recognise when a covariance matrix is singular and avoid pretending a nonsingular density exists

Exit: For a jointly normal vector and two supplied linear forms, compute their means, variances and covariance, decide independence with the correct hypothesis stated, and identify any singular case rather than forcing a density argument.

Out of scope: General Gaussian-process theory; Spectral decomposition beyond what the supplied covariance calculation needs; Measure-theoretic characterisations of Gaussian vectors; Nonlinear transformations of multivariate normals

## 102 · N3.2 · Obtain a conditional normal law; handle a singular limit separately.

Given a bivariate jointly normal pair, compute the conditional normal distribution and diagnose whether the conditional variance is positive, zero or undefined under the stated parametrisation.

Prerequisites: N3.1 jointly normal linear forms; J3 conditional laws; D3 normal standardisation

Required ownership:
- Write the conditional mean in centred covariance form
- Write the conditional variance with the correct covariance-squared divided by conditioning variance term
- Convert correctly between covariance and correlation parametrisations
- Check that the conditioning variance is positive before division
- Interpret zero conditional variance as deterministic linear dependence in the singular case
- Standardise the resulting conditional normal law correctly for probability calculations

Exit: From a supplied bivariate normal model, obtain the full conditional normal law, compute one requested probability or moment, and separately explain what happens when the covariance structure becomes singular.

Out of scope: General block-matrix Schur-complement theory; High-dimensional Gaussian graphical models; Regular conditional probability theory; Bayesian conjugate-normal models beyond a supplied elementary calculation

## 103 · N2.1 · Establish normal mean/residual independence using orthogonal coordinates.

Show that the normal sample mean is independent of orthogonal residual coordinates and connect the residual squared length to a chi-square variable with the correct dimension loss.

Prerequisites: N1 sample mean and sample variance; N3 jointly normal linear forms; M5 orthogonality and squared lengths; D4 chi-square connection

Required ownership:
- Identify the unit vector in the sample-mean direction
- Construct or reason with an orthogonal change of coordinates separating mean and residual subspaces
- Use invariance of a standard multivariate normal under orthogonal transformation
- Show zero covariance between the mean coordinate and residual coordinates
- Conclude independence from joint normality
- Explain why the residual sum of squares has n-1 rather than n independent normal directions

Exit: For an iid normal sample, justify mean/residual independence through an orthogonal-coordinate argument and explain precisely why the residual squared length contributes n-1 chi-square degrees of freedom.

Out of scope: Full Cochran theorem in general quadratic-form form; General ANOVA decomposition; Non-Gaussian mean/residual independence claims; Wishart theory

## 104 · N2.2 · Assemble or reject one chi-square/t/F pivot with explicit degrees of freedom.

Given a statistic built from normal-sample components, identify its law when justified or state exactly which centring, scaling, independence or degrees-of-freedom requirement fails.

Prerequisites: N2.1 normal mean/residual independence; D4 gamma and chi-square laws; N1 sample mean and variance

Required ownership:
- Recognise a central chi-square as a sum of squared independent standard normals
- Assemble a t variable from a standard normal numerator and an independent chi-square denominator divided by its degrees of freedom
- Assemble an F variable from two independent chi-square variables each divided by its own degrees of freedom
- Track centring and scale constants explicitly
- State numerator and denominator degrees of freedom
- Reject a proposed t/F law when independence, centring, scaling or ingredient distribution is wrong
- Distinguish a bounded or otherwise structurally constrained normal ratio from a genuine t variable

Exit: Given a proposed chi-square, t or F statistic, derive every ingredient law and degrees of freedom, verify the required independence, state the final distribution if valid, or identify the exact failed condition if invalid.

Out of scope: Noncentral chi-square/t/F laws; General likelihood-ratio theory; Asymptotic chi-square approximations; Multivariate Wishart pivots

## 105 · O1.1 · Derive the CDF/survival of a minimum or maximum.

Translate {min Xi > x} and {max Xi <= x} into intersection events, factor them only when independence permits, and obtain the resulting CDF or survival function on the correct support.

Prerequisites: P6 independence structure; D1 discrete distributions; D3 continuous distributions; D5 transformed-law support

Required ownership:
- Express minimum and maximum events as intersections before simplifying
- Use independence explicitly when turning intersection probabilities into products
- Distinguish iid powers from products of nonidentical CDFs or survivals
- Track the support and endpoint behaviour of the extreme variable
- Handle continuous and discrete extrema without assuming a density exists
- Check the derived law is monotone and has the correct limiting values

Exit: For a supplied independent sample, derive the exact CDF or survival law of its minimum or maximum, state where iid simplification is or is not legal, identify the transformed support, and verify limiting values.

Out of scope: Extreme-value asymptotic theory; Poisson point-process limits; Dependent-sample extrema beyond supplied elementary structure; Record-value theory

## 106 · O1.2 · Compute an extreme moment or adapt the law to nonidentical/discrete samples.

Compute or simplify a moment of a minimum or maximum from its actual law and re-derive the product form correctly when parameters or supports differ across observations.

Prerequisites: O1.1 extreme CDF/survival derivation; J1 expectation; D3 exponential law; D2 geometric waiting-time laws

Required ownership:
- Choose a valid expectation formula for the law and support at hand
- Carry shifts and scale parameters through an extreme-law calculation
- Recognise when a minimum of exponentials remains exponential and with what rate
- Derive the minimum of independent geometric variables with unequal parameters
- Use tail sums or tail integrals only on their legal domains
- Check a derived moment against simple monotonicity or parameter limits

Exit: Compute one nontrivial extreme moment or derive a discrete/nonidentical extreme law from first principles, with all support, shift and parameter details checked and no iid assumption inserted without evidence.

Out of scope: Asymptotic extreme-value normalisations; General hazard-rate ordering; Record processes; Heavy-tail extreme-value classification

## 107 · O2.1 · Translate a kth-order event into a binomial count.

Convert X_(k) <= x, X_(k) > x and related events into exact count inequalities and sum the corresponding binomial probabilities with the correct index range.

Prerequisites: O1 extrema as special order statistics; P2 binomial counting; D0 CDF language

Required ownership:
- Define the threshold count N_x = number of observations <= x
- Translate X_(k) <= x into N_x >= k
- Translate complementary kth-order events without off-by-one mistakes
- Use the binomial law of N_x only under iid sampling
- Recover the minimum and maximum cases by setting k=1 or k=n
- Check endpoint probabilities against the support of the parent law

Exit: Given an iid sample and a kth-order event, rewrite it as an exact binomial-count condition, evaluate the corresponding probability with correct summation limits, and recover k=1 and k=n as checks.

Out of scope: Non-iid general order-statistic formulas; Joint order statistics; Asymptotic sample quantiles; Empirical-process theory

## 108 · O2.2 · Derive the continuous density and check its coefficient and endpoint cases.

Derive f_(k)(x)=n!/[(k-1)!(n-k)!] F(x)^(k-1)[1-F(x)]^(n-k)f(x) on the parent support and validate its minimum/maximum reductions.

Prerequisites: O2.1 binomial-count CDF; C3 differentiation rules; D3 continuous densities

Required ownership:
- Differentiate the kth-order CDF correctly under the continuous iid assumptions
- Explain the roles of k-1 observations below and n-k above the marked value
- Obtain the coefficient n!/[(k-1)!(n-k)!] without memorisation
- Retain the parent density f(x) and the original support
- Recover minimum and maximum densities as k=1 and k=n
- Check normalisation directly or through the known CDF endpoints

Exit: Derive the continuous kth-order density from the count-based CDF or local argument, justify every factor, state the support, and verify both k=1 and k=n special cases.

Out of scope: Joint densities of two order statistics; Range distributions; Ties in discrete order statistics; Asymptotic quantile distributions

## 109 · O3.1 · Obtain a joint order-statistic, conditional-extreme or range law.

Construct and manipulate a joint order-statistic density with the correct combinatorial factor, support inequalities and marginalisation needed for conditional-extreme or range questions.

Prerequisites: O2 kth-order statistics; J3 joint and conditional laws; J5 transformed pairs and support geometry

Required ownership:
- State the ordering constraints x<y and the index condition r<s before using a joint order-statistic density
- Explain the observation-count allocation below x, between x and y, and above y
- Recover the correct multinomial/factorial coefficient from that allocation
- Include the parent density factors and CDF/survival powers on their legal support
- Marginalise or condition with bounds derived from the ordered support
- Transform to a range or related statistic while retaining all support constraints
- Check the resulting marginal or transformed density normalises

Exit: For an iid continuous sample, derive or justify the joint law of two selected order statistics, obtain one requested conditional or range law, and verify support and normalisation.

Out of scope: General point-process representations of order statistics; Asymptotic extreme-value theory; Poisson-process spacings; General multivariate order-statistic theory beyond two selected ranks

## 110 · O3.2 · Contrast it with shared-observation dependence carrying singular diagonal mass.

Recognise when shared observations make P(U=V)>0, compute that equality probability directly from underlying sample events, represent it as a singular component supported on the diagonal rather than as a point atom, and combine it with any off-diagonal continuous contribution without pretending one planar density describes the whole law.

Prerequisites: O3.1 joint order-statistic laws; D0 atoms and mixed laws; J3 joint-law support; J5 recognition of singular transformed pairs

Required ownership:
- Identify which observations are shared between the two extrema or statistics
- Characterise the event on which the two statistics are exactly equal
- Compute P(U=V) from the underlying sample events rather than from a nonexistent planar density on the diagonal
- Separate probability carried on the diagonal from the off-diagonal absolutely continuous contribution
- Explain why P(U=V)>0 does not imply that any singleton (u,u) has positive probability; in the usual continuous shared-observation construction the diagonal component is singular with respect to planar area rather than a collection of point atoms
- Recognise that the scalar difference U-V does have an atom at 0 whenever P(U=V)>0, even though the joint pair need not have a point atom
- Avoid applying the standard joint-order-statistic density unless its common-iid-sample rank structure is actually present
- Check that the diagonal singular component and all off-diagonal pieces together carry total probability one

Exit: Given a shared-observation construction with continuous underlying data, determine whether P(U=V)>0, compute that probability when present, distinguish singular diagonal mass from a point atom, derive the remaining off-diagonal contribution as needed, and justify why a purely planar density is incomplete.

Out of scope: General theory of singular measures on arbitrary curves; Copula decomposition theory; Extreme-value asymptotics; Measure-theoretic disintegration of mixed joint laws

## 111 · L1.1 · Apply Markov/Chebyshev with all moment and sign conditions.

Derive and apply Markov and Chebyshev bounds with the correct random variable, threshold, centring, variance and legality conditions visible at every step.

Prerequisites: J1 expectation; J2 variance; P3 event manipulation; F2 inequalities

Required ownership:
- State Markov's nonnegativity and finite-expectation requirement
- Rewrite a requested tail event into a legal Markov form when possible
- State Chebyshev for a finite-variance variable centred at its mean
- Use variance over squared deviation threshold with correct units
- Justify every event inclusion used to transfer a bound
- Recognise when the assumptions fail and refuse the inequality
- Distinguish a bound from an exact probability

Exit: For a supplied random variable and tail event, choose a legal inequality, state all assumptions, derive the bound from event containment, and explain why the result is only an upper bound.

Out of scope: Chernoff or exponential-moment bounds; Hoeffding or Bernstein inequalities; Martingale concentration; Measure-theoretic refinements of moment inequalities

## 112 · L1.2 · Judge whether the resulting bound is informative for a sample average.

Derive a sample-average deviation bound with the correct dependence-sensitive variance and interpret its magnitude, scaling in n and limitations.

Prerequisites: L1.1 Markov/Chebyshev legality; J2 covariance and variance of sums; N1 sample-average notation

Required ownership:
- Compute Var of an average from the actual covariance structure rather than assuming independence
- Use the iid variance reduction sigma^2/n only when iid or appropriate independence assumptions are established
- Apply Chebyshev to P(|Xbar-mu|>=epsilon) with the correct epsilon-squared denominator
- Cap the interpretation of a probability upper bound at the trivial ceiling one
- Decide whether the bound decreases with n and at what elementary rate
- Explain why a nontrivial upper bound is not an estimate of the true tail probability
- Identify when the bound is too loose to answer the practical question

Exit: For a sample-average error event, derive the correct variance-based upper bound from the stated dependence assumptions, simplify its n-scaling, and judge explicitly whether the resulting guarantee is informative.

Out of scope: Central-limit approximations; Large-deviation rates; Sub-Gaussian concentration; General convergence theorems beyond what the finite-sample bound itself implies

## 113 · L2.1 · State WLLN and prove one iid-average consistency claim.

Prove that an iid average converges in probability to its population mean and identify exactly which assumptions justify the argument used.

Prerequisites: L1 Markov/Chebyshev bounds; N1 sample averages and moments; P3 probability events

Required ownership:
- State convergence in probability using an epsilon probability statement
- State the iid WLLN with a finite absolute mean assumption
- Identify the probability limit and the estimator sequence before calculating
- Prove a sample-average consistency claim by WLLN or by a valid vanishing-variance argument when stronger moments are available
- Distinguish unbiasedness from consistency
- Explain why a finite-variance Chebyshev proof is sufficient but not the only route to the audited WLLN statement
- Keep the target parameter fixed while n changes

Exit: Given an iid sample-average estimator, state the target and convergence mode, verify the required moment assumptions, and produce a complete proof of consistency with no appeal to unbiasedness alone.

Out of scope: Strong law of large numbers; General modes of weak convergence; Ergodic theorems; Triangular-array laws of large numbers

## 114 · L2.2 · Prove or refute consistency when terms overlap or remain correlated.

For a dependent or overlapping estimator T_n of a fixed target theta, prove consistency by showing P(|T_n-theta|>epsilon)→0 for every epsilon>0—possibly via a justified MSE/Chebyshev bound—or refute consistency by exhibiting some fixed epsilon>0 for which the error probability stays bounded away from zero along an infinite subsequence; use moment calculations only in directions that are logically valid.

Prerequisites: L2.1 convergence in probability and WLLN; J2 covariance and variance of sums; L1 finite-sample probability bounds

Required ownership:
- Identify shared observations or other dependence among summands before applying any iid law
- Compute covariance contributions rather than replacing them by zero when a second-moment route is being used
- Write Var of an average with all diagonal and off-diagonal terms when those moments are finite and relevant
- Use E[(T_n-theta)^2]→0, or equivalently vanishing MSE, as a sufficient route to T_n→theta in probability via Markov/Chebyshev
- When using bias and variance, require both bias→0 and variance→0 to obtain MSE→0; vanishing variance alone may concentrate around the wrong mean
- Refute consistency only with a valid probability-level obstruction, for example a fixed epsilon>0 and an infinite subsequence n_k with P(|T_{n_k}-theta|>epsilon) bounded below by a positive constant, or an equivalent direct contradiction to convergence in probability
- Treat persistent bias or nonvanishing variance as a diagnostic that demands further analysis, not as an automatic inconsistency certificate unless extra assumptions making the converse valid are explicitly supplied
- Explain a rare-large-error counterexample in which T_n→theta in probability while a first or second moment fails to converge appropriately, showing why moment nonconvergence alone is insufficient
- Explain why asymptotic unbiasedness alone is also insufficient for consistency
- Recognise when regrouping into genuinely independent blocks is legal and when overlap prevents it

Exit: For one dependent or overlapping estimator, identify the dependence structure, derive any relevant finite moments without dropping covariance terms, and then independently prove consistency by a valid probability bound or refute it by a fixed-epsilon nonvanishing error probability; explicitly explain why nonvanishing bias or variance alone would not settle the question.

Out of scope: Mixing conditions; Martingale convergence theorems; General dependent-process LLNs; Long-memory asymptotic theory; Uniform-integrability theory except a brief note that extra assumptions can restore some moment converses

## 115 · L3.1 · Centre/scale a sum and calibrate a normal quantile.

Construct the standardised statistic (S_n-nmu)/(sigma sqrt(n)) or its average equivalent and use a normal quantile with the correct direction and scale.

Prerequisites: L2 convergence in probability; D3 normal standardisation; N1 means and variances of sums

Required ownership:
- State the iid finite-positive-variance CLT assumptions
- Compute the exact finite-sample mean and variance of the sum or average
- Centre by n mu for sums or mu for averages
- Scale by sigma sqrt(n) for sums or sigma/sqrt(n) for averages
- Translate the target event into a standard-normal inequality without reversing signs
- Use an appropriate normal quantile and clearly label the result as asymptotic or approximate
- Apply continuity correction when approximating a lattice probability and the problem warrants it

Exit: Given an iid sum or average, state the CLT assumptions, derive the exact centring and square-root scaling, obtain the requested normal approximation or quantile, and mark its asymptotic status explicitly.

Out of scope: Berry-Esseen error bounds; Stable-law limits; General triangular-array CLTs; Functional central limit theorems

## 116 · L3.2 · Justify a block grouping or consistent plug-in approximation.

Reduce a structured statistic to a standard CLT plus a legal consistency argument, while stating precisely why blocking or plug-in replacement preserves the limiting conclusion.

Prerequisites: L3.1 iid CLT standardisation; L2 consistency; J2 covariance and independence

Required ownership:
- Verify that proposed blocks are independent before applying a blockwise CLT
- Compute each block contribution's mean and variance on the chosen scale
- Establish convergence in probability of every plug-in term before replacement
- Use an elementary Slutsky or continuous-mapping statement only after its ingredients are proved
- Keep random-denominator limits away from zero when division is used
- Distinguish an exact algebraic regrouping from an asymptotic approximation
- State the final limiting distribution with its centring and scale intact

Exit: For a structured asymptotic statistic, justify the block decomposition or plug-in convergence, apply the appropriate elementary CLT/Slutsky step, and state the limiting law without hiding any legality condition.

Out of scope: General weak-convergence theory; Delta method beyond elementary continuous mappings; Dependent-block CLTs; Empirical-process asymptotics

## 117 · O4.1 · Express a quantile tail as an empirical-count event.

Convert one-sided order-statistic events into empirical-count inequalities with the correct threshold direction, rank convention and binomial/indicator representation.

Prerequisites: O2 kth-order statistics; P2 binomial counts; L2 convergence in probability and WLLN

Required ownership:
- Write X_(k) <= x and X_(k) > x as equivalent statements about the number of Xi values at or below x
- Track the exact integer threshold k, n-k+1 or its convention-equivalent form without off-by-one mistakes
- Represent the empirical count as a sum of Bernoulli indicators
- Identify the Bernoulli success probability as F(x) or the correct strict-inequality variant
- Separate finite-sample event equivalence from any asymptotic approximation
- State the sample-quantile convention being used when endpoint choices matter
- Check the event translation on the minimum and maximum special cases

Exit: Given a kth order statistic and a threshold x, derive the exact equivalent empirical-count event, express the count as Bernoulli indicators with the correct success probability, and verify the rank inequality on edge cases.

Out of scope: Asymptotic normality of sample quantiles; Bahadur representations; Empirical-process weak convergence; General quantile-process theory

## 118 · O4.2 · Use strict CDF inequalities and WLLN to prove the requested tail limit.

Turn strict population CDF separation into vanishing empirical-count tail probabilities and distinguish a proved one-sided limit from full two-sided consistency.

Prerequisites: O4.1 empirical-count event translation; L2 WLLN and convergence in probability; D0 CDFs and jumps

Required ownership:
- Choose x_- below and x_+ above the target quantile with the required strict CDF inequalities
- Translate each bad quantile tail into an empirical-count event
- Apply the WLLN to the indicator averages at fixed thresholds
- Use strict separation to show the relevant count deviations have probability tending to zero
- Distinguish a lower-tail result from a complete two-sided consistency proof
- State the uniqueness or identifiability condition needed for concentration at one population quantile
- Recognise when a jump, flat region or quantile interval prevents the claimed point-consistency conclusion

Exit: For a target quantile and fixed epsilon neighbourhood, choose valid thresholds, establish the necessary strict CDF inequalities, convert both bad-tail events into empirical counts, apply the WLLN, and state exactly whether the result is one-sided or full consistency.

Out of scope: Rates of quantile convergence; Quantile asymptotic normality; Dvoretzky-Kiefer-Wolfowitz inequalities; General Glivenko-Cantelli theory

## 119 · E1.1 · Compute bias, variance and MSE of one estimator.

Starting from a stated estimator and sampling distribution, derive its bias, variance and MSE correctly and audit every moment, covariance and parameter dependence used in the calculation.

Prerequisites: J2 expectation, variance and covariance; N1 sample statistics; D3 standard distribution moments

Required ownership:
- Define bias as E_theta[T]-theta, or relative to the stated estimand rather than automatically to a raw model parameter
- Compute E_theta[T] from the actual sampling law and parameterisation
- Compute Var_theta(T) with covariance terms retained whenever summands are dependent
- Derive or verify MSE_theta(T)=Var_theta(T)+Bias_theta(T)^2 when the required second moments are finite
- Use factorial or transformed moments when they shorten the calculation without changing the estimand
- Keep n and theta visible so finite-sample and parameter-dependent behaviour is not lost
- State when an expectation, variance or MSE is undefined instead of manipulating a nonexistent moment

Exit: For one estimator under a fully stated sampling model, compute bias, variance and MSE from first principles, retain every dependence term and parameter restriction, and verify the MSE decomposition.

Out of scope: General decision-theoretic loss functions beyond squared error; Bayes risk and prior averaging; Asymptotic efficiency theory; Minimax estimation

## 120 · E1.2 · Compare two candidates, preserving dependence and parameter ranges.

Derive both MSE functions on a common parameter space, compare them algebraically and report the exact theta/n regions in which one estimator has smaller, equal or larger squared-error risk.

Prerequisites: E1.1 exact bias/variance/MSE; F2 inequality solution sets; J2 covariance-aware variance

Required ownership:
- Put both estimators under the same stated sampling model and estimand before comparing them
- Compute each MSE with any dependence or covariance contribution retained
- Form the exact risk difference or inequality instead of comparing bias and variance separately by eye
- Solve the inequality only on the legal parameter and sample-size domain
- Identify crossing points, equality cases and boundary values explicitly
- Explain a genuine bias-variance trade-off when the preferred estimator changes with theta or n
- Refuse a global dominance claim when the risk ordering is parameter dependent

Exit: Given two estimators, derive their exact MSEs, preserve all dependence terms, solve the MSE comparison over the admissible theta/n domain, and report every strict and equality region correctly.

Out of scope: General admissibility theory; Minimax estimators; Bayesian estimator comparison; Asymptotic relative efficiency as a substitute for exact MSE

## 121 · E2.1 · Construct a one-parameter moment estimator.

Select a useful population moment, compute it under the model, match it to the sample analogue and solve for a legal one-parameter estimator while keeping identifiability and admissibility visible.

Prerequisites: D1 discrete distribution moments; D4 gamma/beta and moment calculations; J1 expectations of statistics; J2 variance algebra

Required ownership:
- Choose a population moment whose value depends on the unknown parameter and can identify it on the stated model space
- Compute that theoretical moment with the correct distribution parameterisation
- Match it to the corresponding empirical raw or factorial moment rather than an unrelated sample summary
- Solve the resulting estimating equation and retain all algebraically possible roots until admissibility is checked
- Check the estimator against positivity, probability, integer or other model constraints
- Recognise when the moment equation has no admissible solution for a particular sample
- Distinguish the method-of-moments construction from maximising a likelihood

Exit: For a one-parameter model, derive a method-of-moments estimating equation from a valid population/sample moment pair, solve it and certify that the resulting estimator lies in the admissible parameter space when defined.

Out of scope: Generalised method of moments; Optimal estimating equations; Likelihood maximisation; Bayesian moment matching

## 122 · E2.2 · Solve a two-moment or finite-population problem and check admissibility.

Build and solve a coupled moment system, interpret each algebraic candidate in the original statistical model and retain only solutions that satisfy every model and observation constraint.

Prerequisites: E2.1 one-parameter method of moments; F2 solution-set discipline; A1 polynomial/root algebra

Required ownership:
- Choose two population moments that jointly identify the two unknown parameters when the model permits it
- Match each theoretical moment to the correct empirical counterpart with consistent normalisation
- Solve the coupled equations without discarding alternative algebraic roots prematurely
- Check positivity, ordering, support and any integer or finite-population constraints after solving
- Detect samples for which the formal moment equations have no admissible model parameter
- Explain when two roots represent the same model up to label symmetry and when they do not
- Keep method of moments conceptually separate from an MLE even if the numerical answers happen to coincide

Exit: Construct and solve the required two-moment or finite-population estimating system, list all algebraic candidates, and justify exactly which candidates are admissible under the model and observed sample.

Out of scope: High-dimensional method of moments; Generalised method of moments weighting matrices; Numerical nonlinear estimation algorithms; Asymptotic covariance theory for moment estimators

## 123 · E3.1 · Write and maximise one likelihood for the recorded observations.

Construct a likelihood from the observation mechanism, simplify it without dropping support indicators, locate interior candidates when legitimate, and compare them with all feasible boundaries or interval pieces.

Prerequisites: D1/D2 sampling laws and support; D0/D5 atoms, transformed observations and support; C5 optimisation on a stated domain; O1 support-extreme logic

Required ownership:
- State exactly what each observed datum records before writing its contribution to the likelihood
- Include parameter-dependent support or censoring/rounding events in the likelihood
- Write the legal parameter set before taking derivatives
- Use a log-likelihood only after preserving every zero-likelihood constraint
- Solve the interior score equation when it is relevant and feasible
- Compare all interior candidates with feasible endpoints or interval boundaries
- Reject a formal critical point that violates the model or support
- Distinguish a maximum from a merely stationary point

Exit: Given a sampling model and the actual recorded observations, write the correct likelihood with its feasible parameter region, derive all valid candidates, compare boundaries as required, and identify the global maximiser or explain why none exists.

Out of scope: General numerical optimisation algorithms; EM algorithms or latent-variable likelihood methods; Asymptotic likelihood theory; General KKT theory beyond the small constraints explicitly needed later

## 124 · E3.2 · Solve a boundary/disconnected-support likelihood and check whether a maximum exists.

Partition the legal parameter space into all feasible components, optimise on each component including endpoints, compare componentwise maxima or suprema, and state explicitly when no MLE exists.

Prerequisites: E3.1 observed-data likelihood construction; D1/D2 parameter-dependent support; F2 solution sets and interval logic; C5 boundary optimisation

Required ownership:
- Derive the feasible parameter set directly from all observations and support constraints
- Split a disconnected feasible set into its separate components before optimisation
- Track open versus closed endpoints exactly
- Optimise the likelihood or log-likelihood on every feasible component
- Compare componentwise maxima or limiting suprema globally
- Distinguish an attained maximum from an unattained supremum
- State clearly when the MLE is nonunique or does not exist
- Explain why differentiating outside the feasible set is irrelevant

Exit: For a likelihood with boundary or disconnected support, derive the exact feasible set, optimise over every component, compare all candidates and limiting values, and conclude correctly whether the MLE exists and whether it is unique.

Out of scope: General topological existence theorems; Profile likelihood in high dimensions; Nonparametric likelihood; Advanced constrained-optimisation algorithms

## 125 · E4.1 · Find the MLE of a model probability, median or quantile by invariance.

Identify the target parameter function g(theta), derive it from the model when necessary, obtain a valid MLE of theta, and report g(theta-hat) with domain and nonuniqueness issues handled correctly.

Prerequisites: E3 valid likelihood maximisation; D1 model probabilities; D5 transformations; O2/O4 distinction between model and sample quantiles

Required ownership:
- Write the inferential target explicitly as a function g(theta)
- Derive a model median or quantile from the population CDF rather than from the observed sample ranks
- Obtain or reuse a valid MLE of the underlying parameter
- Apply invariance by evaluating g at the MLE
- Check the target function is defined on the legal parameter space
- Handle multiple base MLEs by mapping the entire maximiser set when needed
- Distinguish a model probability or quantile from an empirical statistic with a similar name

Exit: Given a model and a valid base MLE, derive the requested model probability, median or quantile as g(theta), apply invariance correctly, and explain why the corresponding sample statistic need not be the MLE.

Out of scope: General equivariant estimation theory; Delta-method standard errors; Profile-likelihood confidence sets; Asymptotic distribution of transformed MLEs

## 126 · E4.2 · Solve a small constrained normal-mean problem and check feasibility.

Reduce the normal likelihood to a squared-distance problem, impose the stated equality constraint, derive the constrained maximiser, and separately enforce all inequality and parameter-space conditions.

Prerequisites: E3 likelihood construction; M5 quadratic forms and projections; J5 transformed coordinates; C5 constrained comparison at elementary level

Required ownership:
- Rewrite the normal log-likelihood as a constant minus a weighted squared-distance objective
- State the equality and inequality constraints before optimisation
- Use substitution or an elementary multiplier/projection argument for the equality constraint
- Check the candidate satisfies every inequality constraint
- If an inequality is violated, move to the relevant active boundary and re-optimise
- Verify the final candidate lies in the original parameter space
- Explain why the constrained solution differs from the unconstrained coordinatewise sample means

Exit: For a stated small normal-mean model with equality and inequality constraints, derive the constrained likelihood maximiser, check all feasibility conditions, and repair the candidate on the active boundary if necessary.

Out of scope: General KKT theorem development; High-dimensional quadratic programming; Semidefinite programming; General convex-duality theory

## 127 · E5.1 · Factor a likelihood with its support to establish sufficiency.

Factor a likelihood into a parameter-and-statistic term times a parameter-free remainder while preserving support restrictions, then state and justify a sufficient statistic.

Prerequisites: E3 likelihood construction; D1 support-aware laws; J3 conditional and joint laws

Required ownership:
- Write the full likelihood for the observed sample before attempting factorisation
- Retain every parameter-dependent support or feasibility indicator
- Separate the likelihood into a parameter/statistic factor and a parameter-free sample factor
- Identify exactly which sample features enter the parameter-dependent factor
- Explain why the displayed factorisation satisfies the sufficiency criterion
- Recognise when a proposed summary omits support information and is therefore insufficient
- Distinguish sufficiency from unbiasedness, consistency and efficiency

Exit: Given a one-parameter sample model, write the complete likelihood, factor it with all support restrictions visible, and justify a sufficient statistic while rejecting one plausible information-losing alternative.

Out of scope: Minimal sufficiency via general likelihood-ratio equivalence classes; Sigma-field formulations of sufficiency; Ancillarity and Basu's theorem; General exponential-family theory beyond the specific factorisation used

## 128 · E5.2 · Test what happens when a sufficient statistic is recoded or coarsened.

Prove sufficiency is preserved by an invertible recoding, and show why a coarsened statistic may fail by exhibiting parameter dependence that the coarsening no longer retains.

Prerequisites: E5.1 factorisation and support-aware sufficiency; F3 functions; F5.3 inverse mappings on stated sets; J3 conditional laws

Required ownership:
- Explain why a one-to-one transform of a sufficient statistic is sufficient
- Recover the original sufficient statistic from an invertible recoding
- Distinguish invertible recoding from many-to-one coarsening
- Test a coarsened statistic by rebuilding the likelihood factorisation or a conditional law
- Exhibit the parameter-relevant distinction lost by an insufficient coarsening
- Avoid using unbiasedness or consistency as evidence for sufficiency
- State the conclusion for the exact statistic supplied rather than a nearby familiar summary

Exit: Given one invertible recoding and one coarsening of a sufficient statistic, justify the first as sufficient and prove or disprove sufficiency of the second from likelihood or conditional-law information.

Out of scope: Blackwell ordering of experiments; Deficiency and statistical decision theory; General minimal-sufficiency theory; Measure-theoretic equivalence of generated sigma-fields

## 129 · E6.1 · Improve an unbiased estimator by conditioning on a sufficient statistic.

Compute a Rao-Blackwellised estimator explicitly and justify its unbiasedness and variance comparison by conditional expectation and total variance.

Prerequisites: E5 sufficient statistics; J4 total expectation and variance; E1 bias and variance

Required ownership:
- Start from an estimator whose unbiasedness for the target is established
- Condition on a statistic already justified as sufficient
- Compute or characterise E[U|T] as a function of T alone
- Use total expectation to verify the conditioned estimator remains unbiased
- Use total variance or the Rao-Blackwell theorem to show variance cannot increase
- Identify when the improvement is strict versus equal
- State explicitly that Rao-Blackwell improvement alone is not a UMVU certificate

Exit: Given an unbiased estimator and sufficient statistic, compute the Rao-Blackwellised estimator, prove it is unbiased, compare variances correctly, and state why this alone does not establish minimum variance among all unbiased estimators.

Out of scope: General Hilbert-space projection theory; Doob martingales; Bayesian conditional estimators; Automatic UMVU claims without a separate completeness or bound argument

## 130 · E6.2 · Certify minimum variance by completeness and by an information bound.

Execute both entrance-level minimum-variance certificate types independently: prove a UMVU conclusion from an unbiased function of a complete sufficient statistic, and prove efficiency/minimum variance within the relevant unbiased class by attaining a valid Cramer-Rao bound in a regular model; reject the standard information-bound argument when its hypotheses fail.

Prerequisites: E6.1 Rao-Blackwell improvement; E5 sufficiency; C3 differentiation; E1 unbiasedness and variance

Required ownership:
- State the unbiased comparator class and target parameter/function for every minimum-variance claim
- Use a supplied or established complete sufficient statistic with Lehmann-Scheffe correctly
- Explain why an unbiased function of a complete sufficient statistic is unique almost surely among unbiased functions of that statistic and yields the UMVU conclusion under the theorem's hypotheses
- Keep completeness distinct from sufficiency: neither word may be inferred merely because a statistic is familiar
- State the regularity assumptions supplied or verified before using a standard one-parameter Cramer-Rao inequality, including the legality of differentiating the model and the absence of the relevant moving-support obstruction
- Compute the score/Fisher information and the appropriate Cramer-Rao lower bound for the unbiased target being estimated in a regular model
- Compare the estimator variance with the bound and recognise exact attainment as the certificate under those hypotheses
- Reject routine Cramer-Rao use in a parameter-dependent-support example and state that a different optimality argument would be required
- Keep the Lehmann-Scheffe certificate and the information-bound certificate as separate evidence items; success on one does not certify the other

Exit: Complete both sub-deliverables independently: (A) on one model, prove a UMVU conclusion from an unbiased function of a complete sufficient statistic using Lehmann-Scheffe; (B) on a separate regular one-parameter model, derive the relevant Cramer-Rao bound and verify exact variance attainment. Then diagnose one brief moving-support case in which the standard Cramer-Rao route is not licensed. All hypotheses and the unbiased comparator class must be stated.

Out of scope: General information geometry; Bhattacharyya or Chapman-Robbins bounds; Semiparametric efficiency; Full completeness theory for arbitrary exponential families; Advanced equality-condition theory beyond what the supplied regular model requires

## 131 · T1.1 · Compute actual size, Type II error and power of a specified rule.

Compute rejection and non-rejection probabilities under each relevant law, identify actual size and Type II error, and write the power function with the correct parameter dependence.

Prerequisites: D1/D2 discrete laws and D3 continuous laws with their supports; D3 continuous distribution probabilities and standardisation; N2 sampling pivots and their quantiles when a sample statistic is used

Required ownership:
- State the null and alternative parameter sets before calculating probabilities
- Translate the rejection rule into an event under the model
- Compute the rejection probability under each null value relevant to size
- Take the supremum over a composite null rather than evaluating an arbitrary null point
- Compute Type II error as a non-rejection probability at a specified alternative
- Write power as the rejection probability under the alternative parameter
- Distinguish nominal level, actual size and pointwise power in a discrete test

Exit: For a specified discrete test, compute its actual size and power at a stated alternative, derive the corresponding Type II error, and explain why the actual size can be strictly below a requested nominal level.

Out of scope: Neyman-Pearson optimality proofs; Uniformly most powerful theory; Asymptotic local power; Multiple-testing procedures beyond the elementary union control in T1.2

## 132 · T1.2 · Distinguish a p-value from size and control a union of rejection events.

Define the p-value as an appropriate null-tail extremeness probability for the observed data and bound the probability of a union of rejection events without assuming independence.

Prerequisites: T1.1 size and power; P3 union/intersection probability and the union bound; D1 null distributions and support

Required ownership:
- Identify the null distribution used to calibrate extremeness
- Use the tail or two-sided convention stated by the test rather than inventing one
- Explain that the p-value is computed from the observed statistic whereas size is a property of the rejection rule
- Reject the interpretation p-value = P(H0 is true | data)
- Express a combined rejection event as a union
- Apply P(union Ai) <= sum P(Ai) without requiring independence
- Recognise when the resulting bound is conservative rather than an exact union probability

Exit: Given observed data and a null law, compute/interpret the appropriate p-value, contrast it with test size, and obtain a valid union-probability bound for several rejection events without assuming independence.

Out of scope: False discovery rate; Bonferroni optimality or advanced familywise-error procedures; Bayesian posterior probabilities of hypotheses; General selective-inference theory

## 133 · T2.1 · Order observations by the alternative/null likelihood ratio.

Derive and simplify the alternative/null likelihood ratio, establish its monotone ordering where possible, and identify which observations should enter the rejection region first.

Prerequisites: T1 testing language and rejection probabilities; E3 likelihood construction with support; D4 standard parametric families

Required ownership:
- State the two simple parameter values and their likelihoods
- Form the alternative-over-null likelihood ratio on the common/legal support
- Handle points where one hypothesis assigns zero probability or density
- Simplify the ratio without discarding parameter-independent monotone transformations
- Determine whether the ratio increases, decreases or is nonmonotone in a useful statistic
- Order outcomes by evidence for H1 relative to H0
- Write the candidate rejection region as likelihood-ratio values above a threshold

Exit: Given two simple hypotheses, derive f1/f0 with support intact, rank the observations correctly, and state the likelihood-ratio rejection ordering with the correct direction before choosing its size.

Out of scope: Composite-alternative UMP theory; General monotone likelihood-ratio theorems; Generalized likelihood-ratio tests; Asymptotic likelihood-ratio chi-square theory

## 134 · T2.2 · Calibrate an exact MP rejection region, including randomisation if required.

Convert a likelihood-ratio ordering into an exact level-alpha most-powerful test, solve for any boundary randomisation probability, and compute the resulting power under the alternative.

Prerequisites: T2.1 likelihood-ratio ordering; T1.1 actual size and power; D1/D2 discrete and D3 continuous probability calculations

Required ownership:
- Calibrate the critical region using probabilities under H0
- Choose the largest deterministic likelihood-ratio region whose null probability does not exceed alpha when appropriate
- Identify a boundary likelihood-ratio class when exact alpha is not attainable deterministically
- Solve for a randomisation probability gamma in [0,1] that gives exact null rejection probability alpha
- Keep all higher likelihood-ratio outcomes fully rejected before randomising at the boundary
- Compute the power of the calibrated test under H1
- State when no randomisation is needed because the threshold can already attain the desired level

Exit: Starting from an LR ordering, construct an exact level-alpha MP test, derive any necessary boundary randomisation probability, and verify both null size and alternative power.

Out of scope: Randomised tests outside boundary calibration; UMP tests for composite alternatives; Decision-theoretic loss optimisation; Asymptotic likelihood-ratio testing

## 135 · T3.1 · Select and derive a normal mean or variance test.

Read a normal-model testing problem, identify the exact parameter being tested and what nuisance quantities are known, derive the appropriate null pivot, and calibrate a one- or two-sided rejection rule from its exact distribution.

Prerequisites: T1 size, power and rejection-rule language; N2 exact chi-square/t/F pivots and independence; D3 standard normal law; D4 chi-square as a gamma law

Required ownership:
- State the null and alternative before selecting a statistic
- Distinguish known sigma from unknown sigma in a mean test
- Use a standard normal pivot only when its variance scale is genuinely known
- Use the t pivot only after establishing the normal numerator, independent chi-square denominator and correct degrees of freedom
- Use (n-1)S^2/sigma0^2 with chi-square n-1 for a normal variance test
- Choose upper, lower or two-sided critical regions from the alternative rather than from memorised symmetry
- Express the rejection threshold using declared null quantiles and verify the test's null calibration

Exit: Given one mean-testing case and one variance-testing case under normal sampling, derive the legal pivot, state its exact null law and degrees of freedom, and calibrate the correct one- or two-sided rejection region without formula guessing.

Out of scope: Generalized likelihood-ratio derivations for arbitrary models; Non-normal robustness theory; Asymptotic z tests when the exact normal-model pivot is unavailable; Two-sample and ANOVA equivalence, which belongs to T3.2

## 136 · T3.2 · Compare a two-sample test and its equivalent two-group ANOVA when assumptions match.

Construct the pooled two-sample t statistic with the correct standard error and n1+n2-2 degrees of freedom, derive the corresponding two-group ANOVA decomposition, and establish F=t^2 for the matching two-sided hypothesis.

Prerequisites: T3.1 exact normal mean/variance test selection; N2 t and F pivots with degrees of freedom; M5 squared-length decomposition for orthogonal components

Required ownership:
- Distinguish independent two-sample data from paired observations
- State the independent normal and common-variance assumptions before pooling
- Form the pooled variance with n1+n2-2 residual degrees of freedom
- Build the standard error for Xbar1-Xbar2 using the pooled variance
- State the exact t law under the equal-means null
- Decompose total variation into between-group and within-group sums of squares for two groups
- Show that the two-group ANOVA statistic satisfies F(1,n1+n2-2)=t^2 for the matching two-sided test
- Explain why unequal-variance, paired or one-sided alternatives require a different comparison

Exit: For two independent normal samples with a common unknown variance, derive the pooled t test and two-group ANOVA F test, prove F=t^2 with matching degrees of freedom, and state exactly which assumption or alternative changes break that equivalence.

Out of scope: Welch-Satterthwaite approximations beyond identifying that pooling is illegal; Paired t-test derivation; ANOVA with three or more groups; General linear models or multiple-comparison procedures

## 137 · T4.1 · Invert a pivot with a declared quantile-tail convention.

Identify an exact pivot for a normal mean, normal variance, exponential mean or simple support-endpoint model, assign the correct tail probabilities, invert the inequalities without reversing endpoints incorrectly, and state the resulting coverage claim.

Prerequisites: N2 exact normal chi-square/t/F pivots; E1 sampling distributions and estimator variability; T3 exact normal-model pivots and tail calibration

Required ownership:
- Write the pivot and verify that its distribution is parameter-free under the stated model
- Declare whether q_p denotes a lower-tail p quantile or use an equivalent unambiguous convention
- Allocate alpha across one or two tails before algebraic inversion
- Invert the probability event carefully and preserve the legal parameter space
- Use a t pivot for an unknown normal mean only when the exact N2 conditions hold
- Use chi-square quantiles with n-1 degrees of freedom for a normal variance interval
- State whether the resulting coverage is exact finite-sample or only approximate
- Interpret the interval as a random set covering a fixed parameter with repeated-sampling probability 1-alpha

Exit: Given one exact mean pivot and one exact scale/support pivot, derive the confidence set from a declared tail convention, verify endpoint order and parameter legality, and state the correct repeated-sampling coverage interpretation.

Out of scope: Bootstrap intervals; Bayesian credible intervals; General asymptotic Wald intervals, which belong to T5; Prediction intervals for a future observation, which belong to T4.2

## 138 · T4.2 · Contrast parameter coverage with prediction or a one-sided bound.

Read the target of inference from the problem statement, choose or derive the corresponding pivot including any additional future-observation variability, and state the correct coverage or prediction probability without conditioning on the realised interval after the fact.

Prerequisites: T4.1 pivot inversion and quantile conventions; N2 exact normal pivots and independence; J3/J4 conditional and predictive probability language

Required ownership:
- Identify whether the unknown target is fixed across repetitions or newly random in each repetition
- Explain why a confidence interval for mu does not automatically predict X_new
- Include the extra variance term contributed by a future observation when constructing a normal prediction interval
- Use a one-sided tail allocation alpha rather than alpha/2 for a one-sided confidence bound
- State the exact or approximate assumptions behind the bound or interval
- Interpret confidence as long-run parameter coverage rather than a posterior probability for the realised parameter
- Interpret prediction as repeated-sampling coverage of a future random outcome under the model
- Check that the requested direction of a bound matches the alternative or practical claim being made

Exit: Given one fixed-parameter problem and one future-observation or one-sided-bound problem, construct the correct interval/bound for each and explain precisely why their probability statements are not interchangeable.

Out of scope: Simultaneous prediction bands; Tolerance intervals; Bayesian posterior predictive intervals; Large-sample plug-in intervals, which begin in T5

## 139 · T5.1 · Construct one CLT-based test or confidence interval.

Identify an asymptotically normal estimator, derive or recognise its limiting variance, replace unknown nuisance quantities only with justified consistent estimates, and translate the resulting standardisation into a test or confidence interval.

Prerequisites: T4 exact pivot inversion and coverage; L3 CLT standardisation and plug-in approximations; T1 test size and rejection language

Required ownership:
- State the estimator and fixed parameter being targeted before standardising
- Identify the CLT or asymptotic-normality statement being used and its centring and scaling
- Derive the asymptotic variance rather than importing an unrelated standard error
- Use a consistent plug-in estimate only when Slutsky-type replacement is justified by established convergence
- Construct the requested one- or two-sided rejection region or interval using a declared normal-quantile convention
- Label the resulting inference as approximate/asymptotic rather than exact
- For a sample proportion, distinguish the null standard error used in a test from a plug-in standard error commonly used in an interval

Exit: Starting from a stated CLT or a standard sample-mean/proportion setting, derive the standardised statistic, justify any plug-in variance estimate, and construct the requested asymptotic test or confidence interval with its target and approximation status explicit.

Out of scope: Delta-method inference for general nonlinear functionals beyond what is explicitly supplied; Bootstrap or resampling confidence intervals; General M-estimation or sandwich covariance theory; Higher-order asymptotic corrections

## 140 · T5.2 · State why a boundary, small sample or plug-in assumption can invalidate it.

Inspect an approximate test or interval, identify the assumption carrying its normal calibration, and explain concretely how small counts, parameter boundaries or unstable nuisance estimation can distort size or coverage.

Prerequisites: T5.1 CLT-based construction; D1 discrete support and exact probabilities; T4 exact coverage interpretation

Required ownership:
- Distinguish an asymptotic statement from a finite-sample guarantee
- Recognise sparse-count regimes in which a normal approximation to a binomial or similar count can be poor
- Explain why a parameter near 0 or 1 can make a Wald proportion interval unstable or leave the legal parameter space
- Identify when a plug-in standard error is nearly zero, highly variable or otherwise unreliable
- Compare an approximate procedure with an available exact alternative when the problem supplies one
- State whether the main failure concerns size, coverage, interval geometry or standard-error estimation
- Avoid inventing a universal numerical sample-size threshold when the approximation quality depends on the underlying parameter

Exit: Given one asymptotic test or interval, identify the exact approximation and plug-in assumptions it uses, exhibit a concrete boundary or small-sample regime where they become unreliable, and state which inferential guarantee is thereby compromised.

Out of scope: Berry-Esseen rate calculations unless explicitly supplied; Variance-stabilising transforms as a separate theory; Bootstrap diagnostics; Advanced robust or higher-order asymptotic methods

## 141 · T6.1 · Specify the signs, null Bernoulli probability and treatment of zeros.

Define the sign variables from the observed differences or centred observations, justify their Bernoulli null law from the continuity/no-zero assumptions or a stated tie rule, and identify the effective sample size used by the count statistic.

Prerequisites: T1 exact rejection-rule, size and power language; D1 Bernoulli and binomial laws; J1 indicator encoding; P6 independence of trials and events

Required ownership:
- State the parameter/null claim the signs are intended to test
- Define each positive/negative sign indicator from the actual observation or paired difference
- Justify why the null sign probability is 1/2, or use the different supplied null probability instead
- State the continuity/no-tie assumption when using the ordinary sign test
- If zeros can occur, declare whether they are removed, split, randomised or handled by a supplied rule
- Update the effective binomial sample size after any legitimate removal of zero differences
- Distinguish paired-difference inference from a claim about two unrelated marginal medians
- Check the independence assumption needed for the Bernoulli count law

Exit: Given a one-sample or paired sign-test problem, define the sign indicators, state and justify the null Bernoulli probability, handle zeros explicitly, identify the effective sample size and explain exactly what population claim the construction tests.

Out of scope: Wilcoxon signed-rank procedures; Rank-sum or Mann-Whitney tests; Permutation-test theory beyond the elementary sign count; General nonparametric efficiency comparisons

## 142 · T6.2 · Calibrate an exact binomial sign-test rejection region.

Choose the correct lower, upper or two-tail binomial rejection set from the alternative, evaluate its exact null probability, report the attained size and modify the calibration when p0 is not one half or the effective sample size changes.

Prerequisites: T6.1 valid sign construction and tie handling; T1 actual size versus nominal level; D1 exact binomial probability calculations

Required ownership:
- Write the exact null law S~Binomial(m,p0) with the correct effective m
- Select lower- or upper-tail rejection from the direction of the alternative
- For a two-sided test, define the exact tail convention rather than assuming symmetry when p0 is not one half
- Compute the actual null rejection probability of the chosen region
- State when discreteness prevents an unrandomised test from attaining the requested nominal level
- Recognise that changing p0 changes both tail probabilities and any symmetric-looking cutoff
- Recompute the null law when the stated tie rule changes the effective count
- Relate the exact count test back to the specific median or paired-difference claim from T6.1

Exit: Given a valid sign-count model, construct the exact rejection region for the stated alternative, calculate its attained size, and explain precisely how discreteness, a changed p0 or a changed tie rule alters the calibration.

Out of scope: Randomisation machinery beyond noting when exact nominal alpha is unattainable; Large-sample normal approximation to the sign statistic; Signed-rank and other rank-based tests; Multiple-testing or sequential sign procedures

## 143 · R2.1 · Derive simple-regression normal equations with/without intercept.

Start from the stated least-squares objective, differentiate with respect to the fitted coefficients, obtain and solve the normal equations, and state the denominator/nonidentifiability condition for the slope in each model.

Prerequisites: M2 linear systems, rank and uniqueness; J2 covariance and centred-sum algebra; C3 differentiation and first-order optimality

Required ownership:
- Write the residual sum of squares for the exact model being fitted
- Differentiate the objective with respect to every fitted coefficient
- Derive the intercept normal equation sum of residuals equals zero when an intercept is present
- Derive the slope normal equation weighted residual orthogonality to the predictor
- Solve the intercept model using centred sums Sxx and Sxy
- Derive the distinct through-origin slope formula without importing centring
- State when the slope is not identifiable because the relevant predictor denominator vanishes
- Distinguish an algebraic minimiser from additional probabilistic assumptions that are not needed for least-squares fitting

Exit: Given one intercept model and one through-origin model, derive the normal equations from the objective, solve for the coefficients when identifiable, and state precisely the design degeneracy that destroys slope identification.

Out of scope: Sampling distributions or t/F inference for regression coefficients; Generalised least squares or heteroskedastic weighting; Penalised regression such as ridge or lasso; Multiple-regression projection matrices, which begin in R3

## 144 · R2.2 · Prove a residual, dummy-variable or changed-observation identity.

Translate a proposed regression identity into the normal-equation constraints, residual orthogonality and centred-sum relations that actually govern it, then prove the claim or identify the assumption under which it fails.

Prerequisites: R2.1 least-squares minimisation and normal equations; J2 covariance/centred-sum identities; M2 uniqueness of linear systems

Required ownership:
- Use the intercept normal equation to justify zero residual sum only when an intercept is fitted
- Use predictor-residual orthogonality to simplify coefficient identities
- Express simple-regression slope and intercept through centred sums when the model contains an intercept
- Analyse a binary dummy predictor by reducing the least-squares equations to group means when appropriate
- Track how a changed or shifted observation alters the sufficient centred sums before asserting a coefficient change
- Distinguish translation of all responses from alteration of one response
- Check whether a claimed identity depends on nonzero Sxx or another identifiability condition
- Prove or reject a proposed identity algebraically rather than relying on a numerical example

Exit: Prove one residual or dummy-variable identity and one changed-observation/coefficient identity from the least-squares equations, explicitly stating every intercept and nondegeneracy condition used.

Out of scope: Influence-function or leverage diagnostics as a general theory; Cook's distance or deletion diagnostics; Multiple-regression covariance matrices and omitted-variable bias; Regression hypothesis testing and confidence intervals

## 145 · R3.1 · Derive a coefficient covariance or omitted-variable bias.

Given a full-column-rank design matrix, derive beta-hat, its expectation and covariance, identify the exact assumptions needed for each statement, and express the omitted-variable bias term for a reduced model in projection/cross-product form.

Prerequisites: R2 normal equations and residual orthogonality; M2 linear systems and rank; M5 projection and quadratic-form geometry

Required ownership:
- Write the full-rank least-squares estimator as (X'X)^(-1)X'Y
- Derive E[beta-hat]=beta from E[epsilon]=0 without invoking normality
- Derive Cov(beta-hat)=sigma^2(X'X)^(-1) under homoskedastic uncorrelated errors
- State what changes when the error covariance is not sigma^2 I
- Partition the design into retained and omitted regressors and derive the reduced-model expectation
- Identify that omitted-variable bias requires an omitted effect plus nonzero projection/correlation with retained regressors
- Distinguish algebraic design rank conditions from probabilistic distribution assumptions

Exit: For a stated multiple-regression model, derive beta-hat expectation and covariance with each assumption declared, and derive one omitted-variable bias expression while explaining precisely when that bias is zero.

Out of scope: Generalised least squares derivations beyond identifying the changed covariance form; Heteroskedasticity-consistent sandwich estimators; Endogeneity/instrumental-variable theory; t/F inference, which belongs to R4

## 146 · R3.2 · Identify an estimable linear combination when separate coefficients are not identifiable.

Detect column dependence, characterise the null-space ambiguity in beta, identify estimable contrasts as those orthogonal to the coefficient null space/equivalently lying in the row space of X, and compute residual degrees of freedom from rank rather than column count.

Prerequisites: R3.1 full-rank covariance/bias derivation; M2 rank, null spaces and solution sets; M5 projections onto column spaces

Required ownership:
- Detect rank deficiency from linear dependence among design columns
- Explain why beta and beta+h generate the same fitted mean whenever Xh=0
- Distinguish non-uniqueness of coefficients from uniqueness of the projection X beta-hat
- Test whether c'beta is invariant over the null-space ambiguity
- Recognise the row-space/orthogonality criterion for estimability
- Compute residual degrees of freedom as n-rank(X)
- Avoid interpreting one generalized-inverse coefficient vector as uniquely identified parameters

Exit: Given one rank-deficient design, exhibit a coefficient ambiguity, identify at least one estimable and one non-estimable linear combination with justification, and compute residual degrees of freedom from rank(X).

Out of scope: General Moore-Penrose pseudoinverse theory beyond what is needed for one regression problem; Regularisation methods such as ridge or lasso; Bayesian identification; Regression t/F tests and confidence intervals, which begin in R4

## 147 · R4.1 · Derive a t contrast or nested-model F test under normal errors.

Given a fixed-design normal linear model and a stated coefficient contrast or nested-model null, derive the correct standard error or extra-sum-of-squares statistic, identify the exact t or F null law, and calibrate the rejection rule with the correct numerator and denominator degrees of freedom.

Prerequisites: R3 fixed-design OLS covariance and estimability; T3 exact t and F testing under normal models; T4 pivotal confidence-interval logic

Required ownership:
- State the normal linear model assumptions needed for exact finite-sample t/F inference
- Check that a requested linear contrast is estimable before assigning it a standard error
- Derive Var(c^T beta_hat)=sigma^2 c^T(X^TX)^{-1}c in the full-rank case
- Replace sigma^2 by the residual mean square with residual degrees of freedom n-rank(X)
- Form the exact t statistic for one estimable restriction and identify its residual degrees of freedom
- For nested models, express the numerator through the reduction in residual sum of squares divided by the rank difference
- Form the exact nested-model F statistic and state both numerator and denominator degrees of freedom
- Distinguish a one-dimensional t test from a multi-restriction F test and recognise the F=t^2 equivalence when the restriction count is one

Exit: Given one estimable contrast problem and one nested-model comparison under a normal linear model, independently derive the legal t or F statistic, state every degree of freedom, and explain why a plausible incorrect test is invalid.

Out of scope: Asymptotic sandwich or heteroskedasticity-robust regression inference; Generalized linear models or nonlinear regression; Model-selection criteria such as AIC or BIC; Mean-response and prediction intervals, which belong to R4.2

## 148 · R4.2 · Construct mean-response and prediction intervals and explain their difference.

For a fixed covariate vector x0 under the normal linear model, derive the standard error for x0^T beta_hat, add the new-observation variance when predicting Y0, and use the residual t pivot to build and interpret both intervals with the same declared confidence level.

Prerequisites: R4.1 exact regression t/F inference; R3 covariance of beta_hat and projection geometry; T4 distinction between parameter coverage and prediction

Required ownership:
- Define the mean-response target x0^T beta separately from a future observation Y0 at x0
- Derive Var(x0^T beta_hat)=sigma^2 x0^T(X^TX)^{-1}x0 in the full-rank fixed-design case
- Use the residual mean square and residual t degrees of freedom for exact interval construction
- Construct the confidence interval for the conditional mean response
- Add sigma^2 for independent future observation noise when constructing the prediction interval
- Explain why the prediction interval is wider at the same x0 and confidence level
- Track leverage through x0^T(X^TX)^{-1}x0 and explain how extrapolation inflates uncertainty
- Interpret repeated-sampling coverage without assigning posterior probability to the fixed unknown mean

Exit: At a stated x0, derive both the exact mean-response and future-response intervals under the normal linear model, identify every variance component and degree of freedom, and explain precisely why the prediction interval has extra uncertainty.

Out of scope: Simultaneous confidence bands such as Scheffe or Working-Hotelling bands; Random-design regression theory; Heteroskedastic or autocorrelated prediction intervals; Survey-sampling variance and finite-population correction, which begin at S1

## 149 · S1.1 · Derive SRSWR/SRSWOR mean and total variances under one population convention.

Given a finite population of size N and a simple random sample of size n, derive unbiasedness and variance for the sample mean and expanded total under SRSWR and SRSWOR, express the without-replacement variance through a declared finite-population correction, and check limiting cases such as n=N.

Prerequisites: J1 expectation; J2 variance and covariance of finite-valued variables; P4 conditioning and P6 independence on finite sample spaces; N1 iid sample-mean variance; supply the fixed-population design conventions here

Required ownership:
- State clearly that the finite population values are fixed and the randomness comes from the sampling design
- Define one finite-population mean and one variance convention before deriving any sampling variance
- Derive unbiasedness of the SRSWR sample mean and total estimator
- Derive the SRSWR variance of the sample mean from independent draws
- Derive the SRSWOR variance of the sample mean using inclusion indicators, covariance, or an equivalent finite-population argument
- Express the without-replacement variance with the correct finite-population correction under the chosen convention
- Scale the mean variance correctly to obtain the variance of the estimated population total
- Check the census limit n=N under SRSWOR and explain why the variance must vanish
- Compare SRSWR and SRSWOR precision under the same population convention rather than by mismatched formulas

Exit: From first principles and under one declared finite-population variance convention, independently derive the SRSWR and SRSWOR variances for the mean and total, compare them, and verify the n=N census limit without switching conventions.

Out of scope: Stratified estimators and optimal allocation, which begin at S2; Unequal-probability Horvitz-Thompson estimation, which belongs to S3; Ratio and regression survey estimators; Asymptotic survey inference beyond the exact design-based variance identities required here

## 150 · S1.2 · Verify a proposed sampling algorithm assigns the right probability to every possible subset.

Given a multistage, sequential, or rule-based sampling algorithm, calculate the probability of an arbitrary unordered sample of size n, account for all orderings or paths that lead to it, and decide whether the design is genuinely SRSWOR.

Prerequisites: S1.1 design-based SRS notation and finite-population setup; P1/P2 counting and combinatorial probability; P3 event decomposition; J1 indicator representation

Required ownership:
- State the defining SRSWOR requirement that every unordered size-n subset has probability 1/binomial(N,n)
- Distinguish an ordered draw sequence from the final unordered sample
- Compute the probability of one ordered path through a sequential sampling algorithm
- Sum over all admissible orderings or branches that produce the same unordered subset
- Use symmetry only after verifying that the algorithm treats all relevant labels or states symmetrically
- Produce a counterexample subset when a proposed algorithm is not simple random sampling
- Recognise standard sequential sampling without replacement as SRSWOR by its induced subset probability
- Separate equal marginal inclusion probability from the stronger requirement of equal subset probability

Exit: For one valid and one invalid proposed without-replacement sampling algorithm, independently compute induced subset probabilities and justify the classification, including the ordered-to-unordered conversion and a concrete witness of failure when needed.

Out of scope: General unequal-probability sampling theory and Horvitz-Thompson estimation; Systematic sampling variance theory; Cluster or multistage survey estimators; Stratified allocation, which begins at S2

## 151 · S2.1 · Calculate a stratified estimate and its sampling variance.

Given stratum sizes, sample sizes, stratum sample means and a declared finite-population variance convention, construct an unbiased stratified mean or total estimator and derive its sampling variance under independent within-stratum SRSWOR.

Prerequisites: S1 SRSWR/SRSWOR design expectation and variance; J2 variance of weighted sums; P6 independence of sampling across strata; finite-population variance convention declared in S1

Required ownership:
- Define W_h=N_h/N and distinguish population-share weights from sample proportions n_h/n
- Construct the stratified mean estimator as sum_h W_h ybar_h and the total estimator as sum_h N_h ybar_h
- State why independent sampling across strata makes cross-stratum covariance terms vanish
- Derive the variance contribution of each stratum under SRSWOR using its own n_h, N_h and finite-population correction
- Keep the chosen S_h^2 convention consistent with the S1 formulas instead of silently changing denominators
- Translate correctly between the variance of a stratified mean and the variance of the corresponding total
- Check limiting cases such as a fully enumerated stratum n_h=N_h contributing zero sampling variance
- Compare a proposed pooled or unweighted estimator with the correct population-share-weighted construction

Exit: Given a finite population split into at least two strata, independently construct the stratified mean or total estimator, derive its sampling variance under independent within-stratum SRSWOR using one declared variance convention, and verify a boundary case such as n_h=N_h.

Out of scope: Optimal or cost-constrained choice of n_h, which belongs to S2.2; Unequal-probability inverse-inclusion estimators, which begin at S3; Post-stratification with random realised stratum counts; Model-based regression or ratio estimators

## 152 · S2.2 · Derive an allocation under fixed size or stated costs, then check feasibility.

Starting from the S2.1 variance expression, derive proportional or Neyman allocation under equal-cost fixed-size sampling, derive the short unequal-cost rule n_h proportional to N_h S_h/sqrt(c_h) when its cost model applies, and check that the proposed allocation is feasible.

Prerequisites: S2.1 stratified estimator and sampling variance; C5 constrained one-variable optimisation intuition; S1 finite-population feasibility bounds

Required ownership:
- Express the part of stratified variance that depends on n_h before optimising
- Derive proportional allocation n_h proportional to N_h when stratum standard deviations are treated as equal
- Derive Neyman allocation n_h proportional to N_h S_h for fixed total n under equal per-unit costs
- For the stated linear cost model derive n_h proportional to N_h S_h/sqrt(c_h)
- Normalise proportionality constants so the allocation satisfies the total-size or total-cost constraint
- Check 0<=n_h<=N_h, minimum-sample requirements and integer feasibility instead of reporting an impossible continuous optimum
- Explain how a zero-variation stratum or a binding census cap changes the naive proportional solution
- Compare two feasible allocations by their implied variance rather than by slogan

Exit: Given stratum sizes, variability measures and either a fixed total n or the audited linear cost constraint, independently derive the appropriate allocation rule, compute a feasible allocation, and justify why an attractive competing rule is suboptimal or illegal.

Out of scope: General nonlinear cost functions or integer-programming algorithms; Adaptive or two-phase allocation designs; Unequal inclusion probabilities and Horvitz-Thompson estimation, which begin at S3; Advanced optimum allocation with estimated variance components and stochastic costs

## 153 · S3.1 · Compute one- and two-unit inclusion probabilities in a concrete design.

Given a fully specified finite-population sampling design, derive pi_i=P(i in s) and pi_ij=P(i and j in s), including designs where units can be reachable through overlapping selection routes, and distinguish these probabilities from draw probabilities or sample-set probabilities.

Prerequisites: S1 sample-set probabilities and design randomness; P3 inclusion-exclusion for overlapping events; J1 indicator-variable probability reasoning

Required ownership:
- Define the inclusion indicator I_i and identify pi_i=E(I_i)=P(i in s)
- Define pi_ij=E(I_i I_j)=P(i and j in s) for distinct units
- Compute inclusion through multiple selection routes using unions and inclusion-exclusion rather than naive addition
- Distinguish per-draw selection probability, first-order inclusion probability, pair inclusion probability and probability of an entire realised sample
- Recognise that pi_ij generally is not pi_i pi_j under without-replacement or otherwise dependent designs
- Check computed probabilities against 0<=pi_i<=1 and 0<=pi_ij<=min(pi_i,pi_j)
- Use fixed-size identities such as sum_i pi_i=n when the design genuinely has fixed sample size n
- Keep the finite-population quantity of interest separate from the randomness introduced by the design

Exit: Given a concrete finite-population design with at least one overlapping or dependent selection feature, independently derive all requested pi_i and pi_ij values from sample-selection events and verify them using probability bounds or a fixed-size identity when applicable.

Out of scope: Horvitz-Thompson or other inverse-probability unbiasedness proofs, reserved for S3.2; General variance estimation for Horvitz-Thompson estimators; PPS algorithm design or advanced unequal-probability sampling schemes; Model-based survey inference or nonresponse adjustment

## 154 · S3.2 · Prove an inverse-inclusion-weighted estimate is unbiased.

For a finite-population total Y=sum_i y_i and a design with known pi_i>0, express the Horvitz-Thompson form sum_i I_i y_i/pi_i and prove design-unbiasedness by linearity of expectation, then determine what additional known quantity is needed to convert a total estimate into a population mean.

Prerequisites: S3.1 first-order inclusion probabilities and indicators; J1 linearity of expectation; finite-population total versus mean distinction

Required ownership:
- Write a sample sum as a population sum using inclusion indicators I_i
- Use E(I_i)=pi_i to show E[I_i y_i/pi_i]=y_i for every unit with pi_i>0
- Apply linearity of expectation without introducing an unnecessary independence assumption
- State the positivity requirement pi_i>0 for every population unit whose contribution must be estimable
- Distinguish an unbiased estimator of a finite-population total from an estimator of a population mean
- When N is known, convert an unbiased total estimator to an unbiased mean estimator by dividing by N
- Explain why unequal inclusion probabilities make an unweighted sample sum or sample mean generally biased for the corresponding population target
- Diagnose a proposed inverse-probability expression whose weights correspond to draw probabilities rather than actual inclusion probabilities

Exit: Given unequal positive inclusion probabilities and fixed finite-population values, independently construct the inverse-inclusion-weighted estimator for a stated total, prove its design-unbiasedness from indicators, and correctly convert to a mean only when the required population size is known.

Out of scope: Horvitz-Thompson variance formulas involving second-order inclusion probabilities; Ratio estimators when population size or auxiliary totals are unknown; Calibration, generalized regression, nonresponse or post-stratification weighting; Asymptotic survey-sampling theory

## 155 · V1.1 · Specify a CRD model and derive its sum-of-squares decomposition.

Given a balanced or elementary unbalanced one-factor completely randomized experiment, state the treatment/error model, identify the role of random assignment, define treatment and grand means, and derive SSTotal = SSTreatments + SSE with the corresponding degrees-of-freedom accounting.

Prerequisites: R2 least-squares minimisation and residual decomposition; T3 normal-model testing; N2 chi-square/F construction under normal models

Required ownership:
- State a one-way CRD model such as Y_ij=mu+tau_i+epsilon_ij with an explicit identifiability convention
- Explain that treatments are assigned to experimental units by randomization and distinguish this from merely observing pre-existing groups
- Define treatment means and the grand mean from the observed responses
- Derive the total sum of squares around the grand mean
- Derive the treatment sum of squares and residual/error sum of squares and prove their decomposition
- Assign treatment degrees of freedom a-1 and error degrees of freedom N-a, with total N-1
- Recognise the least-squares/projection interpretation behind the decomposition
- State that exact F inference additionally needs the error assumptions reserved for V1.2

Exit: Given a one-factor randomized experiment, independently state the CRD model and randomization, derive the three sums of squares and all associated degrees of freedom, and explain why the decomposition is valid.

Out of scope: Exact F-test calibration and treatment contrasts, reserved for V1.2; Randomized block designs, reserved for V2; Latin squares and two blocking factors; Factorial interaction models

## 156 · V1.2 · Construct the exact F test and one treatment contrast with valid error assumptions.

Under independent normal errors with common variance in a valid CRD, form MSTreatments/MSE for testing equality of treatment means, identify both degrees of freedom, and derive the standard error/test for one estimable contrast using the pooled error variance.

Prerequisites: V1.1 CRD model and sum-of-squares decomposition; T3 exact F and t testing; N2 independence and chi-square/F pivots under normal models

Required ownership:
- State the independent normal common-variance error assumptions required for the exact finite-sample F law
- Write the omnibus null of equal treatment means and distinguish it from a specific contrast null
- Form MSTreatments=SSTreatments/(a-1) and MSE=SSE/(N-a)
- Construct F=MSTreatments/MSE and identify numerator and denominator degrees of freedom
- Explain why randomization justifies the treatment comparison while the normal/equal-variance assumptions justify the exact reference distribution
- Define an estimable treatment contrast with coefficients summing to zero under the usual treatment-mean formulation
- Use MSE to derive the standard error for one stated contrast, with sample-size weights handled correctly
- Distinguish an omnibus rejection from evidence about any particular treatment pair or contrast

Exit: Given a valid CRD under independent normal common-variance errors, independently construct and interpret the exact F test and one treatment contrast with the correct degrees of freedom and pooled-error standard error.

Out of scope: Multiple-comparison procedures and familywise-error adjustments; Heteroskedastic or nonnormal robust ANOVA; Randomized block ANOVA, which begins at V2; Factorial main effects and interactions

## 157 · V2.1 · Justify randomisation within blocks and the additive model.

Given a complete randomized-block experiment with one observation per treatment-block cell, identify treatments and blocks, state an additive model such as Y_ij=mu+tau_i+beta_j+epsilon_ij with suitable constraints, describe valid within-block randomisation, and explain why blocking can reduce residual variation when blocks capture a relevant nuisance factor.

Prerequisites: V1 CRD randomisation, treatment model and ANOVA decomposition

Required ownership:
- Identify the treatment factor and the nuisance blocking factor from an experimental description
- State the complete-block requirement that every block contains every treatment once in the elementary RBD setting
- Describe treatment randomisation separately within each block and distinguish it from unrestricted CRD randomisation
- Write an additive model Y_ij=mu+tau_i+beta_j+epsilon_ij with an explicit identifiability convention
- Explain that the additive model assigns systematic variation to treatment and block effects but contains no separately estimable treatment-by-block interaction
- Explain why useful blocking can improve treatment precision by removing predictable between-block variation from residual error
- Recognise that a blocking variable is normally chosen before observing treatment responses rather than manufactured post hoc
- Keep exact normal-theory ANOVA inference separate from the design/randomisation justification itself

Exit: Given a complete blocked experiment, independently identify treatment and block roles, specify valid within-block randomisation and an identifiable additive model, and explain both the precision rationale and the unmodelled-interaction limitation.

Out of scope: RBD sums of squares, mean squares and F table, reserved for V2.2; Estimating treatment-by-block interaction with replication; Latin squares with two blocking factors, reserved for V3; Factorial treatment interactions, reserved for V4

## 158 · V2.2 · Build the RBD ANOVA and identify the interaction/error limitation.

For t treatments and b complete blocks with one observation per cell, construct treatment, block, residual and total sums of squares and degrees of freedom, form the treatment F ratio under independent normal common-variance additive errors, and explain how treatment-by-block interaction compromises the residual/error interpretation.

Prerequisites: V2.1 within-block randomisation and additive RBD model; V1 one-way ANOVA sums of squares and exact F logic

Required ownership:
- Compute or derive total, treatment and block sums of squares from treatment means, block means and the grand mean
- Obtain residual SSE by decomposition after removing treatment and block sums of squares
- Assign degrees of freedom t-1 for treatments, b-1 for blocks, (t-1)(b-1) for residual and tb-1 total
- Form MSTreatment and MSE and use F=MSTreatment/MSE for the treatment test under the stated additive independent normal common-variance error model
- Recognise that the block mean square measures block variation and is not the denominator for the treatment F test in the standard fixed-effects RBD
- Explain why one observation per cell leaves treatment-by-block interaction confounded with the residual term
- State that material interaction can inflate or structurally alter the residual and undermine the additive-model treatment test interpretation
- Check the ANOVA degrees of freedom sum and the sum-of-squares decomposition as independent consistency diagnostics

Exit: Given a complete t-by-b randomized-block experiment, independently construct and audit the ANOVA table and treatment F test, then explain precisely why treatment-by-block interaction cannot be separated from residual error with one observation per cell.

Out of scope: Replicated block designs that separately estimate interaction and pure error; Missing-cell or incomplete-block analysis; Latin-square row/column blocking, reserved for V3; General factorial interaction ANOVA, reserved for V4

## 159 · V3.1 · Construct a valid Latin square and state its randomisation/model.

Given p treatments and two blocking factors each with p levels, construct or verify a p-by-p Latin square, identify rows, columns and treatments, describe valid random relabelling/permutation steps, and state an additive model Y_ijk=mu+rho_i+kappa_j+tau_k+epsilon with an identifiability convention and no separately modelled interactions.

Prerequisites: V2 randomized-block design, within-block randomisation and additive nuisance control

Required ownership:
- State the defining Latin-square condition: p treatments arranged in p rows and p columns with each treatment appearing once in every row and every column
- Construct a small valid Latin square, for example by cyclic generation, and verify both row and column treatment counts
- Identify the treatment factor separately from the two nuisance blocking factors represented by rows and columns
- Describe valid randomisation through appropriate permutations/relabelings of rows, columns and treatment labels rather than arbitrary cellwise reassignment
- Write an additive row-plus-column-plus-treatment model with an explicit identifiability convention
- Explain why one observation per cell leaves row-treatment, column-treatment and other interaction structure outside the elementary additive analysis
- Reject an invalid proposed square when a treatment repeats within a row or column even if global treatment counts are balanced
- Distinguish the combinatorial validity of the square from the normal/equal-variance assumptions used later for exact ANOVA inference

Exit: Given p treatments and two p-level blocking factors, independently construct and verify a valid Latin square, state a legitimate randomisation scheme and identifiable additive model, and explain the no-interaction limitation.

Out of scope: Latin-square sums of squares, mean squares and F test, reserved for V3.2; Graeco-Latin squares and higher-order blocking designs; Missing-cell Latin-square analysis; General factorial treatment interactions, reserved for V4

## 160 · V3.2 · Derive its degrees of freedom and compare treatments with the right error term.

For a p-by-p Latin square with one observation per cell, derive row, column, treatment, residual and total degrees of freedom and the corresponding sums-of-squares decomposition; when p≥3, form the treatment F statistic MSTreatment/MSE under the additive normal common-variance model, and when p=2, identify that the valid square has zero residual degrees of freedom so the standard residual-based F test cannot be formed.

Prerequisites: V3.1 valid Latin-square construction, randomisation and additive model; V2.2 blocked ANOVA decomposition and residual-error logic

Required ownership:
- Assign p-1 degrees of freedom each to rows, columns and treatments
- Derive residual degrees of freedom (p-1)(p-2) and total degrees of freedom p^2-1, and check that all components sum correctly
- Diagnose the boundary p=2 explicitly: a 2-by-2 Latin square is combinatorially valid, but residual df=0, MSE is not available as an error estimate, and the ordinary residual-based treatment F test cannot be performed
- For p≥3, construct or recover row, column and treatment sums of squares from marginal totals/means and obtain residual by subtraction
- Check independently that both degrees of freedom and sums of squares partition consistently
- Form the treatment test F=MSTreatment/MSE only when residual df>0 and the stated independent normal common-variance additive-error assumptions justify that denominator
- Explain why row and column mean squares are nuisance-block summaries rather than substitute denominators for treatment comparison
- State that unmodelled interactions are inseparable from residual variation in the elementary unreplicated square, so residual is not automatically pure replicated error
- Recognise impossible or overparameterised ANOVA tables from inconsistent df, nonexistent residual error, or claimed separately estimated interactions

Exit: Complete two boundary-aware tasks: (A) for one valid Latin square with p≥3, independently construct and audit its ANOVA table and form the treatment F test with the correct residual denominator and assumptions; (B) for p=2, correctly derive zero residual degrees of freedom and state that the ordinary residual-MSE F test is unavailable rather than inventing an error term.

Out of scope: Replicated Latin squares with separately estimable interaction components; Missing-value corrections; Graeco-Latin or crossover extensions; Alternative small-sample procedures invented to rescue the p=2 no-error-df case; Factorial main-effect and interaction contrasts, which begin at V4

## 161 · V4.1 · Construct factorial main-effect and interaction contrasts.

For a 2^k or simple mixed-level factorial experiment, identify treatment combinations, construct main-effect and interaction contrasts from cell means or totals, state whether the reported quantity is a contrast, half-contrast, or effect under the chosen coding, and interpret interaction without collapsing it into marginal main effects.

Prerequisites: V1 one-way treatment contrasts and ANOVA logic; P2 product counting for the 2^k treatment combinations; J1 finite weighted averages

Required ownership:
- Enumerate treatment combinations correctly for a 2^k or small mixed-level factorial design
- Construct a main-effect contrast by averaging/comparing the appropriate high-versus-low or level-specific cell means
- Construct a two-factor interaction as a difference of differences with a consistent sign convention
- Declare the scaling convention explicitly so a raw contrast is not confused with the reported factorial effect
- Interpret zero interaction as additivity on the response scale being analysed, not as absence of both main effects
- Explain why a substantial interaction makes a single marginal main-effect summary potentially misleading
- Recover a missing cell contrast coefficient from orthogonality/balance in elementary 2-level designs
- Keep design effects at entrance-exam depth without importing response-surface or high-order research methodology

Exit: Given a small factorial design, independently derive specified main-effect and interaction contrasts with correct signs and declared scaling, then explain what a nonzero interaction means for marginal main-effect interpretation.

Out of scope: Full general linear-model treatment of arbitrary unbalanced factorials; Fractional-factorial alias structures and design generators; Response-surface methodology; ANOVA error degrees of freedom and pooling rules, reserved for V4.2

## 162 · V4.2 · Complete an ANOVA table and explain which error/interaction assumptions supply its degrees of freedom.

For a balanced 2^k or simple mixed-level factorial experiment, assign degrees of freedom to main effects and interactions, recover missing ANOVA entries, identify the available residual/error degrees of freedom from replication, and, when no replication exists, explain exactly what assumption is made if higher-order interactions are pooled as error.

Prerequisites: V4.1 factorial main-effect and interaction contrasts; V1 exact F-test and residual mean-square logic; P2 product counting for factorial treatment combinations

Required ownership:
- Count main-effect and interaction degrees of freedom from factor level counts, including the 1-df effects of balanced two-level factors
- Determine total degrees of freedom from the number of observations and reconcile them with all model and error components
- Use replication to identify genuine within-cell/residual error degrees of freedom when repeated observations are present
- Complete missing sums of squares, mean squares or F ratios in a partially specified factorial ANOVA table
- State which mean square is the denominator for a requested effect test under the declared fixed-effects model
- Recognise that a saturated unreplicated 2^k model has no independent pure-error degrees of freedom
- Explain that pooling selected higher-order interactions as error requires an explicit assumption that those interactions are negligible
- Distinguish pooled model-based error from replicated pure error and state how a wrong pooling assumption can invalidate the test

Exit: Given a balanced factorial design and its declared replication/model assumptions, independently complete and audit the ANOVA table, identify the legitimate error degrees of freedom and denominator, and explain exactly when interaction pooling is assumption-dependent rather than pure error.

Out of scope: Fractional-factorial alias/confounding theory; Random-effects and mixed-model expected mean squares; General unbalanced Type I/II/III sums of squares; Post-entrance design-optimization or industrial DOE depth

## Official-scope crosswalk

- Arithmetic, geometric and harmonic progressions: A2, A3 — Named official scope
- Trigonometry: G1 — Named official scope
- Straight lines and circles: G2 — Named official scope
- Parabolas, ellipses and hyperbolas: G3, G4 — Named official scope
- Elementary set theory: F5 — Named official scope
- Functions and relations: F3, F5, A5 — Named official scope
- Permutations and combinations: P1, P2 — Named official scope
- Binomial and multinomial theorem: P2, D1 — P2 includes coefficient identities and expansion structure
- Theory of equations: F2, A1, C4 — Named official scope
- Complex numbers and De Moivre: A4 — Named official scope
- Vector spaces: M1, M2 — Named official scope
- Determinant, rank, trace and inverse: M0, M2, M3, M4 — Named official scope
- Systems of linear equations: M0, M2 — Named official scope
- Eigenvalues and eigenvectors: M4, M5 — Named official scope
- Limits and continuity of functions of one variable: C1, A5 — Named official scope
- Differentiation and integration: C2, C3, C6, C7 — Named official scope
- Applications of differential calculus; maxima and minima: C4, C5 — Named official scope
- Sample spaces, probability and combinatorial probability: P1, P2, P3 — Named official scope
- Conditional probability, independence and Bayes: P4, P6 — Named official scope
- Random variables and expectations: J1, J3, J4, D0 — Named official scope
- Moments and moment generating functions: J2, D4 — Named official scope
- Standard univariate discrete distributions: D1, D2 — Bernoulli, binomial, hypergeometric, geometric, negative binomial, Poisson; discrete uniform through counting
- Standard univariate continuous distributions: D3, D4, D6, N2 — Uniform, exponential, normal, gamma, beta, chi-square, t, F; compact Cauchy/Laplace extensions
- Distributions of functions of a random variable: D5, J5 — Includes branches, rounded/censored observations and transformations of pairs
- Distributions of order statistics: O1, O2, O3, O4 — Named official scope; empirical-count bridge is useful support
- Joint, marginal and conditional probability distributions: J3, J4, J5 — Named official scope
- Multinomial distribution: D1 — Named official scope
- Bivariate and multivariate normal distributions: N3 — Named official scope
- Sampling distributions of statistics: N1, N2, O1, O2 — Named official scope
- WLLN and CLT: statements and applications: L1, L2, L3, O4 — No full general convergence-theory course required
- Descriptive statistical measures: R5 — Includes declared variance, quantile, skewness and kurtosis conventions
- Pearson product-moment and Spearman rank correlation: R1 — Includes existence conditions and ties
- Simple and multiple linear regression: R2, R3 — Named official scope
- Unbiasedness and minimum variance: E1, E6 — Supporting certificates are selected tools, not separately named official topics
- Sufficiency: E5, E6 — Named official scope
- Maximum likelihood and method of moments: E2, E3, E4 — Named official scope
- Tests of hypotheses: basic concepts: T1, T3, T5, T6 — Sign/count tests are compact evidence-led support
- Simple applications of Neyman-Pearson lemma: T2 — Named official scope
- Confidence intervals: T4, T5 — Named official scope
- Inference related to regression: R4 — Named official scope; retained despite low standalone count
- CRD and analysis: V1 — Named official scope
- RBD and analysis: V2 — Named official scope
- LSD and analysis: V3 — Named official scope
- ANOVA: V1, V2, V3, V4 — Named official scope
- Elements of factorial designs: V4 — Named official scope
- SRSWR and SRSWOR: S1, S3 — Named official scope
- Stratification: S2 — Named official scope; retained despite no dedicated primary label in this corpus
