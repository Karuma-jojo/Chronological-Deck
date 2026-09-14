// First hand-authored T25 M.Stat v4 session cards.
// These are bounded session contracts from the audited v2.0 syllabus, not generated placeholders.

export const T25_ATOMIC_V4_001_005 = [
  {
    id:"T25V4-F1-01",routeOrder:1,syllabusCode:"F1.1",targetCode:"F1",parentId:"ARC801",
    title:"Compare domains before and after one cancellation.",
    focus:"Cancellation as an equality on the original legal domain, not permission to silently restore excluded inputs.",
    purpose:"Build the habit that every algebraic rewrite carries its domain with it, so later limits, likelihood supports and transformations do not inherit a false function equality.",
    centralCapability:"Given a rational expression with a cancellable factor, identify the original domain, simplify algebraically, preserve every excluded point, and decide whether the original and simplified displays define the same function or only agree on their common domain.",
    principalObstacle:"Cancellation makes the formulas look identical after simplification, which tempts the learner to forget that division by zero was illegal before the cancellation and that the removed point is still absent from the original function.",
    entryPrerequisites:["Elementary factorisation and fraction notation","Meaning of a real-valued function domain","No new T25 v4 session is required; prior F1 evidence may be used diagnostically"],
    requiredOwnership:[
      "Find denominator-zero exclusions before simplifying.",
      "Factor numerator and denominator without changing the stated domain.",
      "Cancel a common nonzero factor while explicitly carrying the original exclusion.",
      "Distinguish pointwise agreement on a shared domain from equality of functions with different domains.",
      "State the equality set and domain of each displayed expression without plugging an excluded point into the original formula."
    ],
    applicationScope:"One-variable rational expressions and simple algebraic identities where a common factor can be cancelled and a removable-looking hole may be created by the original formula.",
    transferScope:"A fresh expression with a parameter fixed in advance, multiple factors, or a disguised common factor where the same domain-preservation logic must be reconstructed rather than copied from a memorised example.",
    inScope:["Original denominator restrictions","Factoring and cancellation","Equality on the common domain","Function-domain comparison","Retaining excluded points after simplification"],
    outOfScope:["Principal-root and logarithm laws reserved for F1.2","General equation-solving transformations reserved for F2","Limit values and removable discontinuities reserved for C1","Changed-input function domains reserved for F3"],
    exitCondition:"On a fresh cancellable rational expression, state the original domain before any algebra, produce the simplified formula with the exclusion still attached, and correctly answer whether the two displayed formulas define the same function. Then repeat the domain comparison on a second unfamiliar cancellation without a hint.",
    nextArcBoundary:"002 · F1.2 moves from cancellation to principal-root, rational-power and logarithm hypotheses; it may use the domain-preservation habit established here but must not reopen cancellation as the main task.",
    mode:"learn",evidencePolicy:"diagnostic_if_established"
  },
  {
    id:"T25V4-F1-02",routeOrder:2,syllabusCode:"F1.2",targetCode:"F1",parentId:"ARC801",
    title:"Justify principal-root, rational-power and log-law conditions on a new expression.",
    focus:"The sign and domain hypotheses hidden inside roots, rational powers and real logarithm identities.",
    purpose:"Prevent familiar-looking identities from being applied outside the real domain or with the wrong principal-value convention, especially the recurrent mistake sqrt(u²)=u for negative u.",
    centralCapability:"State and justify the real-domain conditions under which principal square-root, reduced rational-power and logarithm rewrites are valid, including the absolute-value consequence sqrt(u²)=|u| and positivity requirements for real log laws.",
    principalObstacle:"Symbolic identities are often remembered without their hypotheses, so a learner may replace sqrt(u²) by u, use an unreduced rational exponent ambiguously, or split/combine logarithms when one of the required positive arguments is absent.",
    entryPrerequisites:["F1.1 domain-preservation habit or equivalent established evidence","Real-number sign and order","Elementary exponent notation"],
    requiredOwnership:[
      "Explain why the principal square root is always nonnegative.",
      "Replace sqrt(u²) by |u| and resolve |u| into sign cases when needed.",
      "Determine the real domain of an even root, reciprocal root and reduced rational power.",
      "State positivity conditions required for real logarithms and standard product/quotient/power laws.",
      "Reject or qualify a proposed root, power or logarithm identity by giving the missing domain/sign condition."
    ],
    applicationScope:"Elementary real expressions involving square roots, nth roots, rational exponents and logarithms, with emphasis on exact legal domains rather than complex branches.",
    transferScope:"A mixed expression combining a root or rational power with a logarithm where several restrictions interact and the learner must determine which rewrite is legal on which subset.",
    inScope:["Principal-root sign convention","Absolute value from sqrt(u²)","Reduced rational-power domains","Real logarithm positivity","Hypotheses for elementary log identities"],
    outOfScope:["Complex logarithms or branch cuts","Solving radical/logarithmic equations as a full F2 task","Differentiation of roots/logs reserved for C3","Asymptotic approximations or series"],
    exitCondition:"For a fresh mixed root/power/log expression, state its real domain, justify or reject each requested identity with the exact sign/positivity condition, and correctly handle sqrt(u²) for both signs of u. A second changed-surface identity must be classified without prompting.",
    nextArcBoundary:"003 · F2.1 changes the question from legal expression rewrites to whether successive equation transformations preserve exactly the same solution set.",
    mode:"learn",evidencePolicy:"diagnostic_if_established"
  },
  {
    id:"T25V4-F2-01",routeOrder:3,syllabusCode:"F2.1",targetCode:"F2",parentId:"ARC801",
    title:"Classify each step of one equation as equivalent or implication-only.",
    focus:"Equations as claims about solution sets, with every algebraic step labelled by whether it is reversible under the stated conditions.",
    purpose:"Replace the habit of treating every familiar manipulation as an equivalence with a proof-level check of reversibility, so extraneous candidates and lost solutions are detected at the step that creates them.",
    centralCapability:"Given a chain of elementary equation transformations, determine for each step whether it is logically equivalent, only forward-implicative, or conditionally equivalent after a nonzero/sign/domain condition is stated.",
    principalObstacle:"Operations such as squaring, multiplying by an expression that might be zero, dividing by a variable expression, or applying a non-injective function can change the solution set even though the algebra looks routine.",
    entryPrerequisites:["F1 domain restrictions or equivalent established evidence","Basic equation notation and substitution","Elementary implication language from ordinary mathematics"],
    requiredOwnership:[
      "Interpret solving an equation as finding exactly the inputs that make the original statement true.",
      "Recognise obviously reversible addition, subtraction and multiplication by a known nonzero constant.",
      "Detect when squaring or another non-injective operation can introduce extra candidates.",
      "Detect when division or cancellation by an expression can discard a zero case unless it is separated first.",
      "Check final candidates in the original equation whenever a step was implication-only."
    ],
    applicationScope:"Elementary real equations involving fractions, roots, squares, products and variable factors where the main task is logical classification of the transformation chain, not speed-solving a large equation family.",
    transferScope:"A deliberately plausible worked solution containing one hidden non-equivalence; the learner must locate the first unsafe step, state its missing condition, and repair the argument without being told the error type.",
    inScope:["Solution-set viewpoint","Equivalent versus one-way steps","Squaring and candidate checking","Division by variable expressions","Conditional reversibility"],
    outOfScope:["Full rational-inequality sign charts reserved for F2.2","Advanced proof quantifiers reserved for F4","Numerical root-finding","Calculus-based root counts reserved for C4"],
    exitCondition:"Audit a fresh multi-step equation solution by labelling every transformation equivalent, implication-only, or conditionally equivalent; identify any candidates that require checking and verify them against the original equation. Then diagnose one unfamiliar fake solution without a hint.",
    nextArcBoundary:"004 · F2.2 uses this solution-set discipline in inequalities, where multiplying/dividing by sign-unknown expressions and boundary handling become the main obstacle.",
    mode:"learn",evidencePolicy:"diagnostic_if_established"
  },
  {
    id:"T25V4-F2-02",routeOrder:4,syllabusCode:"F2.2",targetCode:"F2",parentId:"ARC801",
    title:"Solve one inequality by sign cases and check all boundary points.",
    focus:"Exact solution sets for rational or factored inequalities through critical points, sign intervals and boundary legality.",
    purpose:"Make inequality solving structural rather than rule-memorisation: every zero, pole and sign change must be accounted for, and equality endpoints must be admitted or excluded for a stated reason.",
    centralCapability:"Solve an elementary rational or factored real inequality by reducing it to sign analysis, listing numerator zeros and denominator exclusions, testing intervals, and assembling the exact final set with correct endpoint inclusion.",
    principalObstacle:"Learners often cross-multiply through an expression of unknown sign, forget denominator poles, or treat all critical points alike even though zeros may be included under ≤/≥ while poles can never be included.",
    entryPrerequisites:["F2.1 equivalence/implication discipline or equivalent evidence","F1 denominator-domain restrictions","Ordering and interval notation on the real line"],
    requiredOwnership:[
      "Move all terms to one side without changing the inequality relation incorrectly.",
      "Factor the relevant numerator and denominator far enough to expose critical points.",
      "Separate zeros from excluded denominator points before interval testing.",
      "Determine the sign on each interval by a justified test point or factor-parity argument.",
      "Assemble the final union of intervals with endpoint inclusion matching both the inequality symbol and the original domain."
    ],
    applicationScope:"Polynomial-product and rational inequalities in one real variable with finitely many critical points and factorable structure suitable for exact sign analysis.",
    transferScope:"A fresh inequality with repeated factors, a cancelled-looking factor, or a parameter fixed numerically so that the learner must decide which critical points actually change sign and which remain excluded.",
    inScope:["Critical-point lists","Rational sign charts","Repeated-factor sign behaviour","Boundary inclusion/exclusion","Domain-aware interval answers"],
    outOfScope:["General parameter families of inequalities","Convexity inequalities reserved for A3","Derivative-based monotonicity/root counts reserved for C4","Multivariable inequalities"],
    exitCondition:"Solve one unfamiliar rational inequality from the original expression to an exact interval-union answer, explicitly marking every zero and pole and justifying each boundary. Then explain why direct cross-multiplication would or would not have been legal in that example.",
    nextArcBoundary:"005 · F3.1 leaves equation/inequality solution sets and turns to functions evaluated at changed inputs, especially pulling a known domain back through the input transformation.",
    mode:"learn",evidencePolicy:"diagnostic_if_established"
  },
  {
    id:"T25V4-F3-01",routeOrder:5,syllabusCode:"F3.1",targetCode:"F3",parentId:"ARC801",
    title:"Track one changed input and its legal domain.",
    focus:"Treating the entire argument of a function as the input object and pulling the original domain back through a fixed change of input.",
    purpose:"Eliminate substitution errors such as confusing f(x+h) with f(x)+h and establish the domain-preimage reasoning later required by composition, transformations, differentiation and likelihood support.",
    centralCapability:"Given a function by formula and domain together with a fixed changed input such as x+h or ax+b, substitute the whole input correctly and determine exactly which x-values make the changed input land inside the original domain.",
    principalObstacle:"A function rule is often manipulated as if x were a label rather than a slot, leading to partial substitution, output shifts in place of input shifts, or reuse of the old domain without solving the new membership condition.",
    entryPrerequisites:["F1 domain reasoning","F2 solution-set reasoning for the resulting domain condition","Basic function notation and evaluation"],
    requiredOwnership:[
      "Treat the displayed variable in f(x) as a placeholder for the entire new input.",
      "Distinguish f(x+h), f(x)+h and f(x+h)-f(x) symbolically and conceptually.",
      "Substitute a fixed affine or otherwise simple input into the complete defining formula.",
      "Translate the requirement new_input ∈ Dom(f) into a condition on x and solve it exactly.",
      "Check the resulting changed-input domain against any denominator, root or logarithm restrictions already present in the formula."
    ],
    applicationScope:"Elementary one-variable functions with explicit domains and fixed changed inputs, including rational, root and logarithmic formulas where domain pullback is the main task.",
    transferScope:"An unfamiliar nested-looking expression where the input transformation is disguised algebraically; the learner must identify the actual argument first and derive its legal x-set without a template.",
    inScope:["Whole-input substitution","Input shift versus output shift","Preimage of a stated domain under a fixed input map","Domain pullback for fixed affine changes","Combining pulled-back and intrinsic formula restrictions"],
    outOfScope:["Parameter-case analysis and affine iteration reserved for F3.2","Injectivity/surjectivity/inverses reserved for F5.3","General composition/periodicity constraints reserved for A5.3","Chain-rule differentiation reserved for C3"],
    exitCondition:"For a fresh domain-restricted function and a fixed changed input, write the changed formula, derive the exact legal x-domain from first principles, and explain in one sentence why f(x+h) is not f(x)+h. Repeat on a second changed surface without a hint.",
    nextArcBoundary:"006 · F3.2 keeps changed-input reasoning but makes the parameter or affine iteration itself variable, requiring case analysis rather than a single fixed pullback.",
    mode:"learn",evidencePolicy:"standard"
  }
];
