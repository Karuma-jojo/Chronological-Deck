// Hand-authored T25 M.Stat v4 session cards 066-070.
// These contracts implement audited syllabus steps C2.2 through C4.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_066_070 = [
  {
    id:"T25-ARC811-A1066",routeOrder:66,syllabusCode:"C2.2",targetCode:"C2",parentId:"ARC811",
    title:"Test differentiability at a join or oscillatory point.",
    focus:"Testing differentiability at a piecewise join, cusp or elementary oscillatory point directly from one-sided difference quotients while separating continuity from differentiability.",
    purpose:"Prevent the common entrance-exam error of treating continuity as sufficient for differentiability or using a symbolic derivative formula at exactly the point where its hypotheses fail.",
    centralCapability:"Given a piecewise, absolute-value or elementary oscillatory function at a specified point, first check continuity where relevant, then compare the left and right difference-quotient limits and decide whether a finite derivative exists.",
    principalObstacle:"The learner may differentiate each displayed branch and substitute the join without checking one-sided derivative limits, confuse a vertical or infinite slope with an ordinary derivative, or conclude differentiability merely because the function is continuous.",
    entryPrerequisites:["065 / C2.1 difference quotient and first-principles derivative","063-064 / C1 one-sided limits and continuity","006-007 / F3-F4 piecewise functions, claims and counterexamples"],
    requiredOwnership:[
      "State that differentiability at an interior point requires a single finite difference-quotient limit and therefore implies continuity there.",
      "For a piecewise join, compute the left and right difference quotients from the original function values rather than trusting branch derivative formulas at the boundary.",
      "Use |x-a|, cusp and corner examples to distinguish continuous-but-not-differentiable behaviour from a genuine discontinuity.",
      "Handle a simple oscillatory example by estimating or constructing approaches that show the difference quotient fails to settle to one finite value.",
      "Identify exactly whether failure comes from discontinuity, unequal one-sided derivative limits, divergence, or oscillation."
    ],
    applicationScope:"Piecewise linear/polynomial joins, absolute-value cusps and elementary oscillatory functions where differentiability at one point is the issue rather than routine symbolic differentiation away from that point.",
    transferScope:"A fresh function whose separate formulas look differentiable on each side but whose join contains a hidden continuity or derivative mismatch, requiring the learner to audit the defining limit at the point itself.",
    inScope:["One-sided difference quotients","Continuity versus differentiability","Corners and cusps","Piecewise joins","Elementary oscillatory derivative failure"],
    outOfScope:["General pathological nowhere-differentiable functions","Higher derivatives","Implicit differentiation","Mean-value theorems reserved for C4"],
    exitCondition:"For one unfamiliar piecewise or oscillatory point, decide differentiability from the defining one-sided difference quotients, identify the exact failure mode if no derivative exists, and explain why continuity alone was insufficient.",
    nextArcBoundary:"067 · C3.1 leaves first-principles point testing and introduces reusable product, quotient and chain rules on legal domains.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC811-A1067",routeOrder:67,syllabusCode:"C3.1",targetCode:"C3",parentId:"ARC811",
    title:"Establish/use product, quotient and chain rules on one composite.",
    focus:"Using the product, quotient and chain rules on composite expressions while tracking every denominator, inner function and domain condition that makes the displayed derivative legal.",
    purpose:"Turn symbolic differentiation into structured local reasoning: each rule must be chosen from the expression tree and applied only where the underlying functions and required quotients are defined.",
    centralCapability:"Given an unfamiliar algebraic composite built from differentiable elementary pieces, decompose it into products, quotients and compositions, apply the corresponding rules correctly, and state the points where the resulting derivative formula is justified.",
    principalObstacle:"The learner may flatten a composition into pattern matching, omit the derivative of the inner function, reverse factors in a quotient numerator, or present a derivative formula at inputs excluded by the original function or denominator.",
    entryPrerequisites:["065-066 / C2 derivative definition and pointwise differentiability","001-003 / domain-safe algebra","006 / F3 changed-input and composition discipline"],
    requiredOwnership:[
      "Apply (fg)'=f'g+fg' with every factor evaluated at the same input and without inventing unnecessary independence-like assumptions.",
      "Apply (f/g)'=(f'g-fg')/g^2 only where g is nonzero and the required component derivatives exist.",
      "Apply the chain rule to f(g(x)) by differentiating the outer function at g(x) and multiplying by g'(x).",
      "Parse a nested expression into a clear composition/product/quotient tree before differentiating when several rules interact.",
      "State the legal input set for the original expression and remove any points where a displayed derivative formula relies on an invalid denominator or undefined component."
    ],
    applicationScope:"Polynomial and rational composites, powers of nontrivial inner functions and simple nested expressions where product, quotient and chain rules are sufficient.",
    transferScope:"A changed-input composite with several nested algebraic layers and a hidden excluded point, requiring the learner to choose the rule order, preserve the inner derivative and audit the final domain.",
    inScope:["Product rule","Quotient rule","Chain rule","Nested algebraic composites","Derivative-domain auditing"],
    outOfScope:["Trigonometric/exponential/logarithmic rule catalogue reserved for C3.2","Implicit differentiation","Multivariable chain rules","Taylor expansions"],
    exitCondition:"Differentiate one unfamiliar nested algebraic composite using the correct rule sequence, justify each rule application, and list every input where the original or derivative formula is not legally defined.",
    nextArcBoundary:"068 · C3.2 keeps the same rule discipline but extends it to trigonometric, exponential and logarithmic expressions on their legal domains.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC811-A1068",routeOrder:68,syllabusCode:"C3.2",targetCode:"C3",parentId:"ARC811",
    title:"Differentiate trigonometric, exponential and logarithmic expressions on their legal domains.",
    focus:"Differentiating elementary trigonometric, exponential and logarithmic expressions inside products and compositions while keeping radian measure and domain restrictions explicit.",
    purpose:"Complete the entrance-level differentiation toolkit without turning it into a rule dump: the learner must connect each standard derivative to its legal input set and combine it with the structural rules from C3.1.",
    centralCapability:"Given a fresh expression involving sine/cosine, exponential or logarithmic terms, differentiate it correctly with product/quotient/chain structure and identify every input where the function or resulting formula is unjustified.",
    principalObstacle:"The learner may forget the inner derivative, treat logarithms as defined on nonpositive inputs, ignore tangent/secant poles, or use trigonometric derivative identities without the radian convention that makes them valid in their standard form.",
    entryPrerequisites:["067 / C3.1 structural differentiation rules","021-022 / G1 radian trigonometry and identities","001 / domain-safe algebra"],
    requiredOwnership:[
      "Use the standard derivatives of sin x and cos x with x measured in radians, then combine them with the chain rule for changed inputs.",
      "Differentiate exponential expressions including e^{g(x)} by carrying the inner derivative explicitly.",
      "Differentiate ln(g(x)) only where g(x)>0 in the real-valued setting and track the quotient g'(x)/g(x).",
      "Derive or correctly use tangent/related derivatives only on intervals where the defining quotient is valid.",
      "Audit the final derivative against the original domain instead of letting algebraic simplification silently create or restore excluded points."
    ],
    applicationScope:"Elementary real-valued trigonometric, exponential and logarithmic composites, including changed inputs and simple products/quotients among them.",
    transferScope:"A mixed transcendental expression whose apparent symbolic derivative is easy to write but whose legal domain is narrower, requiring simultaneous rule use and exact domain bookkeeping.",
    inScope:["Sine and cosine derivatives","Elementary exponential derivatives","Natural logarithm derivatives","Changed-input transcendental composites","Real-domain restrictions"],
    outOfScope:["Inverse-trigonometric derivatives unless supplied","Complex logarithms/exponentials","Implicit differentiation","Special functions"],
    exitCondition:"Differentiate one unfamiliar mixed trigonometric/exponential/logarithmic expression, preserve every required inner factor, and state all points where either the original function or the displayed derivative is not justified.",
    nextArcBoundary:"069 · C4.1 leaves derivative computation and uses continuity plus sign information through the IVT to prove root existence without confusing it with uniqueness.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC812-A1069",routeOrder:69,syllabusCode:"C4.1",targetCode:"C4",parentId:"ARC812",
    title:"Prove existence via IVT and distinguish it from uniqueness.",
    focus:"Using the Intermediate Value Theorem with its exact continuity and sign hypotheses to prove that a root exists, while keeping existence logically separate from any claim of uniqueness.",
    purpose:"Build theorem-hypothesis discipline for root questions: a sign change plus continuity yields at least one crossing, but does not by itself control how many crossings occur.",
    centralCapability:"Given a continuous real function on a specified interval, verify the IVT hypotheses, use endpoint or subinterval signs to establish existence of a root or fixed point, and state clearly what additional reasoning would be required for uniqueness.",
    principalObstacle:"The learner may invoke IVT without continuity, treat f(a)f(b)<0 as a uniqueness theorem, ignore roots at the endpoints, or use a numerical graph as a substitute for an interval/sign argument.",
    entryPrerequisites:["063-064 / C1 continuity and one-sided limits","067-068 / C3 derivative toolkit for later monotonicity but not required for bare existence","007 / F4 theorem hypotheses and counterexamples"],
    requiredOwnership:[
      "State the IVT on a closed interval with continuity and identify the target value between f(a) and f(b).",
      "Use opposite endpoint signs, or an equivalent bracketing argument, to prove at least one zero exists in the interval.",
      "Handle the case of an endpoint zero separately rather than forcing a strict sign-change condition where it is unnecessary.",
      "Explain explicitly why the IVT conclusion is existence and not uniqueness, giving or recognising a continuous multiple-root counterexample.",
      "Translate a simple fixed-point equation g(x)=x into a root problem for h(x)=g(x)-x and bracket it by elementary interval/sign reasoning."
    ],
    applicationScope:"Continuous polynomial, rational-on-domain and elementary transcendental functions on compact intervals where exact endpoint signs or simple bounds can be established.",
    transferScope:"A fresh root or fixed-point existence claim where the useful interval is not handed over directly, requiring the learner to choose a valid bracket, verify continuity there and avoid overclaiming uniqueness.",
    inScope:["Intermediate Value Theorem","Root bracketing","Endpoint roots","Fixed-point reformulation","Existence versus uniqueness"],
    outOfScope:["Newton iteration","Topological fixed-point theorems","Complex roots","Uniqueness arguments reserved for C4.2"],
    exitCondition:"For one unfamiliar real root/fixed-point problem, choose or verify a valid interval, establish the exact IVT hypotheses and prove existence while explicitly stating why the argument does not yet prove uniqueness.",
    nextArcBoundary:"070 · C4.2 adds Rolle/MVT derivative information to bound root counts, prove uniqueness or obtain derivative-based inequalities.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC812-A1070",routeOrder:70,syllabusCode:"C4.2",targetCode:"C4",parentId:"ARC812",
    title:"Use Rolle/MVT for a root count, derivative bound or fixed-point argument.",
    focus:"Using Rolle's theorem and the Mean Value Theorem with their exact hypotheses to convert multiple roots or endpoint differences into derivative information and thereby prove root-count, uniqueness or bound statements.",
    purpose:"Give the learner the standard entrance-level contradiction engine for uniqueness and root counts: too many function coincidences force too many derivative zeros, provided the continuity and differentiability hypotheses genuinely hold.",
    centralCapability:"Given a differentiable real function on an interval, verify the theorem hypotheses and use Rolle/MVT to bound the number of roots, prove uniqueness, establish a derivative-based inequality or control a fixed-point map.",
    principalObstacle:"The learner may apply Rolle/MVT across a discontinuity or nondifferentiable point, forget the closed/open interval distinction, or infer a root-count conclusion without tracing how repeated roots force derivative zeros.",
    entryPrerequisites:["069 / C4.1 IVT existence reasoning","067-068 / C3 legal differentiation","007 / F4 quantifiers, implication and contradiction"],
    requiredOwnership:[
      "State Rolle's theorem and MVT with continuity on [a,b] and differentiability on (a,b), keeping the endpoint roles explicit.",
      "Use two distinct roots to force at least one derivative root between them and iterate the idea to bound the number of roots from information about higher or lower derivative zero counts.",
      "Use a sign-definite derivative or MVT difference formula to prove strict monotonicity and hence uniqueness of a root already known to exist.",
      "Derive a bound |f(b)-f(a)|<=M|b-a| when |f'|<=M on the relevant interval and apply the same logic to a simple fixed-point uniqueness argument.",
      "Identify which conclusion can fail when continuity, differentiability or the endpoint-equality condition needed for Rolle is removed."
    ],
    applicationScope:"Elementary differentiable functions, polynomial root-count arguments, monotonicity-based uniqueness, derivative bounds and simple fixed-point contractions handled directly by MVT estimates.",
    transferScope:"A fresh theorem-based proof where the desired conclusion is not itself about derivatives, requiring the learner to assume too many roots or compare two points and manufacture the derivative statement that Rolle/MVT supplies.",
    inScope:["Rolle's theorem","Mean Value Theorem","Root-count contradiction","Derivative-based uniqueness","Elementary MVT bounds"],
    outOfScope:["Banach fixed-point theorem as an abstract result","Taylor's theorem reserved for C5.2","Multivariable mean-value theorems","Complex analytic root counting"],
    exitCondition:"Solve one unfamiliar root-count, uniqueness or derivative-bound problem by explicitly checking Rolle/MVT hypotheses, constructing the needed derivative conclusion and explaining which hypothesis would break the proof if removed.",
    nextArcBoundary:"071 · C5.1 begins constrained one-variable optimisation: critical points must be compared with boundary values on the stated domain.",
    mode:"learn",evidencePolicy:"standard"
  }
];
