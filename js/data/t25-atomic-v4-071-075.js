// Hand-authored T25 M.Stat v4 session cards 071-075.
// These contracts implement audited syllabus steps C5.1 through C7.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_071_075 = [
  {
    id:"T25-ARC812-A1071",routeOrder:71,syllabusCode:"C5.1",targetCode:"C5",parentId:"ARC812",
    title:"Optimise on the stated domain, comparing critical points and boundaries.",
    focus:"Finding global one-variable extrema on the actual stated domain by combining derivative information with endpoint, boundary and nondifferentiable-candidate checks.",
    purpose:"Prevent the standard entrance-exam mistake of solving f'(x)=0 and declaring victory: optimisation is a comparison problem over a domain, not merely a critical-point equation.",
    centralCapability:"Given a differentiable or piecewise elementary objective on a stated interval/domain, identify every legitimate extremum candidate, classify or compare them using derivative/sign information, and determine the requested local or global optimum without ignoring boundaries.",
    principalObstacle:"The learner may equate critical points with extrema, omit endpoints or domain boundaries, apply a second-derivative test where it is inconclusive, or optimise over values that are not actually feasible.",
    entryPrerequisites:["069-070 / C4 IVT, Rolle/MVT and monotonicity reasoning","067-068 / C3 legal differentiation","001-004 / F1-F2 domain constraints and solution sets"],
    requiredOwnership:[
      "Translate the stated feasible domain into the exact interval/set over which the objective is being compared.",
      "Find interior critical points where f'=0 and also retain interior points where the derivative fails to exist but the function is defined.",
      "Use derivative signs or a valid second-derivative conclusion to classify local behaviour without treating either test as universally decisive.",
      "For a closed bounded interval, compare objective values at all interior candidates and endpoints before declaring a global maximum or minimum.",
      "For open or unbounded domains, distinguish an attained extremum from a supremum/infimum suggested only by limiting boundary behaviour."
    ],
    applicationScope:"Elementary one-variable polynomial, rational, transcendental or piecewise objectives on explicitly stated intervals or simple feasible domains, including endpoint-sensitive global optimisation.",
    transferScope:"A fresh optimisation problem whose stationary point is not the global winner, or whose optimum occurs at a boundary/nondifferentiable point, requiring a complete candidate audit rather than formula recognition.",
    inScope:["Critical points","Endpoint and boundary comparison","Local versus global extrema","Derivative sign tests","Attainment versus limiting bounds"],
    outOfScope:["Multivariable optimisation","Lagrange multipliers","Convex optimisation theory","Taylor remainder arguments reserved for C5.2"],
    exitCondition:"Solve one unfamiliar constrained one-variable optimisation problem by stating the feasible domain, producing every legitimate candidate including boundaries, comparing them correctly and justifying whether the requested extremum is actually attained.",
    nextArcBoundary:"072 · C5.2 leaves candidate comparison and justifies a local approximation or small-parameter limit using a stated Taylor remainder rather than an unsupported truncation.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC812-A1072",routeOrder:72,syllabusCode:"C5.2",targetCode:"C5",parentId:"ARC812",
    title:"Justify one local approximation or limit with a valid Taylor remainder.",
    focus:"Using a finite Taylor expansion with an explicit remainder order to justify one local approximation or limit, while preserving the domain and denominator conditions needed for the discarded terms to be negligible.",
    purpose:"Replace informal 'approximately equal' algebra with a controlled local statement: the retained terms determine the limit only after the remainder has been shown small enough relative to the relevant scale.",
    centralCapability:"Given an elementary small-parameter expression and an appropriate supplied/standard Taylor formula, retain the necessary terms, control the remainder at the required order and use that control to justify the resulting approximation or limit.",
    principalObstacle:"The learner may truncate a series with no remainder statement, keep too few terms after cancellation, divide by a quantity whose order has not been controlled, or use a local expansion outside the neighbourhood where it is valid.",
    entryPrerequisites:["071 / C5.1 local/global optimisation context","063-068 / C1-C3 limits and legal derivatives","014-015 / A2 finite-sum and order bookkeeping"],
    requiredOwnership:[
      "State a finite Taylor expansion about the relevant point together with a remainder form or valid big-O/little-o order sufficient for the problem.",
      "Determine how many terms must be retained by inspecting cancellation and the scale of the denominator or comparison quantity.",
      "Propagate the remainder through addition, multiplication and division only when the required denominator/nonzero conditions are established.",
      "Use the controlled expansion to evaluate a local limit or quantify an approximation error, rather than treating a formal power series as an identity.",
      "Recognise when a standard elementary limit is already justified and avoid invoking unnecessary higher-order machinery."
    ],
    applicationScope:"Entrance-level local limits and approximations involving elementary polynomial, exponential, logarithmic or trigonometric functions where a finite Taylor formula or standard local expansion is justified.",
    transferScope:"A fresh cancellation-heavy limit where the leading terms vanish, forcing the learner to choose a sufficient expansion order and prove that the remaining error is negligible after division by the problem's scale.",
    inScope:["Finite Taylor expansion","Remainder order","Cancellation and required expansion depth","Small-parameter limits","Controlled local approximation"],
    outOfScope:["Infinite power-series convergence theory","Analytic continuation","Multivariable Taylor formula","Asymptotic series beyond the finite remainder needed here"],
    exitCondition:"Evaluate or justify one unfamiliar local approximation/limit by writing a sufficient finite Taylor expansion, stating a valid remainder order and showing explicitly that the remainder remains negligible after all cancellations and divisions.",
    nextArcBoundary:"073 · C6.1 moves from local differential behaviour to definite integrals, choosing FTC, substitution, parts, symmetry or interval splitting only after the integrand and interval are made legal.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC813-A1073",routeOrder:73,syllabusCode:"C6.1",targetCode:"C6",parentId:"ARC813",
    title:"Evaluate a definite integral by substitution, parts or interval splitting.",
    focus:"Evaluating finite definite integrals by selecting FTC, substitution, integration by parts, symmetry or interval splitting while preserving bounds, orientation and piecewise/domain structure.",
    purpose:"Build method-selection discipline for entrance integrals: transformations are useful only when their hypotheses and transformed bounds remain correct, especially across absolute values or piecewise changes.",
    centralCapability:"Given an elementary definite integral on a finite interval, identify its structural obstacle, choose an appropriate exact method, carry bounds and signs consistently, split the interval where the formula changes, and verify the result against basic sign/size expectations.",
    principalObstacle:"The learner may change variables but forget to change bounds, apply one antiderivative across a piecewise or absolute-value break, reverse interval orientation without a sign change, or use integration by parts mechanically when a simpler symmetry/FTC argument exists.",
    entryPrerequisites:["067-068 / C3 differentiation and chain/product structure","021-022 / G1 trigonometric identities where needed","001-003 / domain-safe algebra and interval reasoning"],
    requiredOwnership:[
      "Use the Fundamental Theorem of Calculus to convert a known antiderivative into a definite integral evaluation on a legal finite interval.",
      "Perform a substitution with the differential and transformed bounds matched to the new variable, or explicitly back-substitute before using original bounds.",
      "Apply integration by parts with a deliberate choice of factors and preserve the endpoint term exactly.",
      "Exploit even/odd or interval symmetry only after verifying the required symmetry of both integrand and domain.",
      "Split at every point where an absolute value, piecewise definition or ordinary integrability issue changes the valid formula."
    ],
    applicationScope:"Finite elementary definite integrals involving polynomial, rational-on-domain, trigonometric, exponential, logarithmic, absolute-value or simple piecewise expressions.",
    transferScope:"A fresh finite integral whose shortest solution requires noticing a hidden split or symmetry before applying substitution/parts, with transformed bounds and sign checks used to catch algebraic errors.",
    inScope:["FTC evaluation","Substitution with bounds","Integration by parts","Symmetry","Piecewise and absolute-value interval splitting"],
    outOfScope:["Improper endpoint/tail convergence reserved for C6.2","Measure-theoretic integration","Special-function antiderivatives","Numerical quadrature"],
    exitCondition:"Evaluate one unfamiliar finite definite integral by choosing and justifying an appropriate method, carrying bounds and interval splits correctly, and checking the final sign or magnitude against the integrand's qualitative behaviour.",
    nextArcBoundary:"074 · C6.2 makes endpoint and infinite-tail convergence the first question; only convergent improper integrals may then be manipulated as ordinary finite quantities.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC813-A1074",routeOrder:74,syllabusCode:"C6.2",targetCode:"C6",parentId:"ARC813",
    title:"Determine the convergence range of one improper integral.",
    focus:"Determining parameter ranges for convergence of improper integrals by exposing every singular endpoint or infinite tail as a limit and comparing its local power/logarithmic behaviour with standard convergence thresholds.",
    purpose:"Make convergence logically prior to evaluation: an antiderivative expression cannot legitimise an improper integral whose defining limit fails to exist finitely.",
    centralCapability:"Given an elementary parameter-dependent improper integral, identify all improper points, split them into separate defining limits, determine convergence at each point using exact calculation or a justified comparison, and intersect the resulting parameter conditions.",
    principalObstacle:"The learner may cancel divergent pieces across a singularity, test only one endpoint, substitute infinity into an antiderivative as though it were a number, or quote a p-test with the wrong endpoint threshold.",
    entryPrerequisites:["073 / C6.1 finite definite integration methods","063 / C1 one-sided limits","003-004 / F2 equations, inequalities and solution sets"],
    requiredOwnership:[
      "Rewrite each improper endpoint, interior singularity or infinite tail as its own one-sided limit of proper integrals.",
      "Use the correct power threshold near zero/finite singularities and at infinity, deriving it from an antiderivative when uncertain rather than relying on memory alone.",
      "Split at an interior singularity and require both one-sided improper integrals to converge independently; do not use principal-value cancellation unless explicitly requested.",
      "For a parameter-dependent integrand, solve the convergence condition at every problematic point and intersect the conditions into the final parameter range.",
      "Distinguish convergence from the separate task of evaluating the integral's finite value."
    ],
    applicationScope:"Elementary improper integrals with algebraic/logarithmic endpoint behaviour or infinite tails, including parameter ranges that can be decided by exact antiderivatives or standard comparison tests.",
    transferScope:"A fresh integral with two different problematic regions imposing competing parameter inequalities, requiring separate local analysis and a final intersection rather than one global heuristic.",
    inScope:["Improper endpoint limits","Infinite tails","Interior singularities","Power/log comparison thresholds","Parameter convergence ranges"],
    outOfScope:["Cauchy principal value unless explicitly requested","Lebesgue integrability","Advanced convergence theorems","Complex contour integrals"],
    exitCondition:"For one unfamiliar parameter-dependent improper integral, identify every improper region, justify convergence or divergence separately at each one and give the exact intersected parameter range before attempting any value calculation.",
    nextArcBoundary:"075 · C7.1 turns normalised finite sums into definite integrals by identifying the mesh, sample points and limiting integrand of a Riemann sum.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC813-A1075",routeOrder:75,syllabusCode:"C7.1",targetCode:"C7",parentId:"ARC813",
    title:"Recognise and justify a Riemann-sum limit.",
    focus:"Recognising a normalised finite sum as a Riemann sum by extracting the interval, mesh width, sample points and limiting integrand, then justifying the passage to a definite integral under the appropriate regularity.",
    purpose:"Turn sum-to-integral limits into structural recognition rather than guesswork: the scaling factor and index-to-position map must match an actual partition before an integral is claimed.",
    centralCapability:"Given a finite-sum limit of the standard n-scaled type, rewrite it in Delta-x times function-at-sample-point form, identify the corresponding interval and integrand, and justify convergence to the definite integral when the integrand is continuous or otherwise covered by the elementary Riemann framework.",
    principalObstacle:"The learner may guess the integrand without matching the 1/n scale, lose an interval-length factor, map k/n to the wrong interval, or apply the continuous-function Riemann-sum rule at a singular endpoint that requires separate control.",
    entryPrerequisites:["073-074 / C6 definite and improper integral discipline","014-015 / A2 finite sums and indexing","006 / F3 changed inputs and parameter mapping"],
    requiredOwnership:[
      "Match a sum to Delta x times f(x_k) by identifying the partition interval, mesh width and sample-point formula explicitly.",
      "Account for interval lengths other than one and for affine sample points such as a+(b-a)k/n without dropping the factor b-a.",
      "Use continuity on a compact interval, or an explicitly justified elementary Riemann-integrability condition, to pass from the finite sums to the definite integral.",
      "Reindex or algebraically reshape a sum when necessary without changing its limiting contribution incorrectly.",
      "Detect an unbounded or singular endpoint and refuse to apply the ordinary continuous Riemann-sum theorem blindly; reserve the extra endpoint estimate for C7.2."
    ],
    applicationScope:"Normalised finite sums with polynomial, rational-on-domain, logarithmic or elementary transcendental sample values that correspond to ordinary Riemann sums on finite intervals.",
    transferScope:"A fresh sum with a shifted/scaled index or non-unit interval, requiring the learner to reconstruct the partition geometry and recover the exact integral including all scale factors rather than pattern-match a familiar formula.",
    inScope:["Uniform-partition Riemann sums","Affine sample-point maps","Sum-to-integral limits","Compact-interval continuity justification","Reindexing with scale preservation"],
    outOfScope:["Singular-endpoint estimates reserved for C7.2","Lebesgue integration","Euler-Maclaurin corrections","Rates of convergence for quadrature"],
    exitCondition:"Convert one unfamiliar normalised finite-sum limit into a definite integral by explicitly identifying Delta x, sample points, interval and integrand, and state why the ordinary Riemann-sum limit theorem is legal or exactly what endpoint issue prevents its use.",
    nextArcBoundary:"076 · C7.2 converts a positive product into a logarithmic sum and, when an endpoint is singular, supplies the additional estimate needed before exponentiating the resulting limit.",
    mode:"learn",evidencePolicy:"standard"
  }
];
