export function buildT22RichModule9(syllabusVersion) {
  return {
    moduleId: "SIDE267",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build Taylor approximation as a controlled local-modeling method rather than a coefficient-recitation exercise. Start from first-order local linearity, derive higher-order polynomial matching from derivatives, distinguish finite Taylor polynomials from infinite Taylor series, make remainder terms operational for error control, and finish by confronting the fact that an infinitely differentiable function need not equal its Taylor series. The module should prepare later multivariable calculus, optimization, numerical analysis, asymptotics and statistical approximation without stealing their domain-specific machinery.",
    moduleDestination:
      "The learner can construct Taylor polynomials about an arbitrary center, justify their derivative-matching property, derive and recognize canonical expansions, use a valid remainder bound to certify approximation error on a stated region, choose an approximation order from a tolerance requirement, and diagnose when a Taylor series fails to represent the original function despite matching every derivative at the expansion point.",
    entryPrerequisites: [
      "T22 Module 1 / ARC053: derivative as local linearity, power/product/quotient/chain rules",
      "T22 Module 2 / SIDE263: sequence/function convergence, bounds and failure cases",
      "Algebra of finite polynomials and factorial notation",
      "Comfort differentiating elementary functions repeatedly in manageable cases",
    ],
    explicitlyOutOfScope: [
      "Multivariable Taylor expansion, Jacobians and Hessians — owned by SIDE271 and ARC711",
      "Newton's method and optimization algorithms — owned by ARC586 and later optimization modules",
      "Floating-point truncation/roundoff trade-offs and numerical stability — owned by ARC585",
      "Asymptotic probability approximations such as CLT/Delta-method style results — owned by later probability/statistics modules",
      "Power-series theory as a full complex-analysis topic",
      "General analytic continuation or complex singularity theory",
    ],
    arcs: {
      "T22-M09-A01": {
        focus: "Local polynomial approximation as systematic extension of first-order local linearity.",
        roleRelevance:
          "Quantitative models routinely replace nonlinear functions by local surrogates. Understanding what a polynomial approximation is trying to preserve is foundational for optimization, sensitivity analysis, numerical methods and asymptotic reasoning.",
        purpose:
          "Generalize the tangent-line idea from Module 1 into a local polynomial whose value and derivatives agree with the target function at a chosen center.",
        principalObstacle:
          "A polynomial can look close near a point for accidental reasons; the structural Taylor construction instead forces agreement of successive local derivative information at that point.",
        entryPrerequisites: [
          "T22 Module 1 local linearity and derivative rules",
          "Finite polynomial algebra",
          "Repeated derivatives in simple cases",
        ],
        target:
          "Given a smooth function, center a and small order n, construct the unique degree-at-most-n polynomial whose derivatives through order n match the function at a, and explain why this is a local rather than global claim.",
        requiredMastery: [
          "Recover the tangent-line approximation as the degree-1 case",
          "Set up an unknown polynomial in powers of (x-a) and impose derivative-matching conditions",
          "Derive the coefficient rule c_k=f^(k)(a)/k! for small n rather than quote it",
          "Explain why powers centered at a simplify derivative matching",
          "Verify directly that the resulting polynomial matches f and its first n derivatives at a",
          "Distinguish local agreement of derivatives from global equality of functions",
          "Construct a counterexample showing that matching only value and first derivative does not determine higher-order behaviour",
          "Transfer the construction to a nonzero expansion center without re-centering mistakes",
        ],
        applicationScope:
          "One nonlinear sensitivity/approximation problem where a low-order local polynomial gives an interpretable correction beyond the tangent line.",
        transferScope:
          "An unfamiliar smooth function centered away from zero, requiring construction from derivative constraints rather than memorized Maclaurin formulas.",
        explicitlyOutOfScope: [
          "Infinite Taylor series — owned by A03",
          "Rigorous remainder bounds — owned by A04",
          "Multivariable quadratic models",
          "Optimization algorithms",
        ],
        nextArcBoundary:
          "A02 makes the general nth-order Taylor polynomial explicit, develops coefficient structure and uses higher-order terms to capture curvature and local shape.",
      },
      "T22-M09-A02": {
        focus: "Higher-order Taylor polynomials, coefficient structure and finite-order local shape.",
        roleRelevance:
          "Second- and higher-order local models expose curvature, asymmetry and nonlinear correction terms that later drive Newton approximations, Hessian reasoning and error analysis.",
        purpose:
          "Construct and manipulate nth-order Taylor polynomials, understand factorial scaling and derivative matching, and interpret successive terms as higher-order local corrections rather than decorative algebra.",
        principalObstacle:
          "Higher-order terms must be organized by their order of vanishing near the center; the factorial coefficients are forced by repeated differentiation and are not arbitrary normalization constants.",
        entryPrerequisites: [
          "T22-M09-A01",
          "Repeated differentiation",
          "Finite sums and powers of (x-a)",
        ],
        target:
          "Build finite Taylor polynomials of chosen order, verify their matching conditions, compare approximation orders structurally, and identify the first omitted-order effect without claiming an error bound not yet proved.",
        requiredMastery: [
          "Write T_n(x)=sum_{k=0}^n f^(k)(a)(x-a)^k/k! with correct indexing and center",
          "Derive why k! appears by differentiating (x-a)^k exactly k times",
          "Construct second-, third- and higher-order polynomials for representative elementary functions",
          "Compare what information is added when increasing n by one",
          "Interpret the quadratic term as curvature information in one dimension without importing Hessians",
          "Track signs, centers and factorials in a non-Maclaurin expansion",
          "Diagnose a wrong Taylor polynomial by testing derivative-matching conditions rather than by numerical spot checks",
          "Explain why adding terms can improve local order without guaranteeing uniform improvement far from the center",
          "Transfer the method to a composed or transformed function requiring derivative-rule control",
        ],
        applicationScope:
          "One local nonlinear model where first- and second/third-order approximations are compared for structural accuracy near the center.",
        transferScope:
          "A function whose derivatives are manageable but whose canonical series is not supplied, forcing direct finite-order construction.",
        explicitlyOutOfScope: [
          "Infinite-series convergence — A03/A05",
          "Certified truncation error — A04",
          "Multivariable Hessians",
          "Newton iteration",
        ],
        nextArcBoundary:
          "A03 asks what happens if the finite Taylor-polynomial pattern is continued indefinitely and develops canonical Taylor/Maclaurin series as formal candidate representations.",
      },
      "T22-M09-A03": {
        focus: "Taylor series and canonical expansions as infinite limits of the finite polynomial pattern.",
        roleRelevance:
          "Canonical expansions of exp, sin, cos and related functions support approximations, perturbation arguments, transforms and numerical implementations throughout quantitative science.",
        purpose:
          "Move carefully from finite Taylor polynomials to an infinite Taylor-series candidate, derive standard expansions from derivatives, and distinguish formal coefficient generation from proof that the series equals the function.",
        principalObstacle:
          "Writing infinitely many derivative-matched coefficients does not by itself prove convergence, nor does convergence of the series prove convergence to the original function.",
        entryPrerequisites: [
          "T22-M09-A01 and A02",
          "T22 Module 2 sequence/series-style convergence logic as needed",
          "Repeated derivatives of elementary functions",
        ],
        target:
          "Derive canonical Maclaurin/Taylor series candidates for key elementary functions, compute with finite partial sums, and state precisely which additional convergence-to-function question remains open.",
        requiredMastery: [
          "Define the Taylor-series candidate as the infinite sum of derivative-determined coefficients",
          "Derive the Maclaurin series for e^x from its derivative pattern",
          "Derive sine and cosine series from cyclic derivatives and zero/nonzero values at the center",
          "Derive at least one additional expansion from algebraic manipulation or direct derivatives under stated validity conditions",
          "Use finite partial sums as approximations without conflating the partial sum with the infinite series",
          "Distinguish radius/region of convergence from equality with the target function",
          "Explain why derivative matching at one point is necessary but not sufficient for analytic representation",
          "Diagnose an argument that jumps from a visible pattern of coefficients to global equality",
          "Transfer a known expansion through scaling/translation while correctly transforming the center and powers",
        ],
        applicationScope:
          "One approximation or model-simplification task using a canonical expansion with an explicitly limited local/domain claim.",
        transferScope:
          "A scaled, shifted or mildly transformed elementary function whose series must be reconstructed from known structure rather than memorized verbatim.",
        explicitlyOutOfScope: [
          "Full power-series convergence theory",
          "Complex-plane singularity methods for radii of convergence",
          "General analytic continuation",
          "Remainder certification — A04",
        ],
        nextArcBoundary:
          "A04 turns approximation into a falsifiable quantitative claim by bounding the remainder between f and its degree-n Taylor polynomial.",
      },
      "T22-M09-A04": {
        focus: "Taylor remainders, truncation error and choosing order from a tolerance.",
        roleRelevance:
          "Quantitative work needs error-controlled approximations, not merely plausible-looking ones. Remainder bounds train the same discipline later used in numerical error analysis, asymptotics and model approximation.",
        purpose:
          "Use a justified remainder representation/bound to control truncation error, identify the hypotheses required, and choose an approximation order that meets a stated tolerance on a stated interval.",
        principalObstacle:
          "The next omitted term is not automatically the error. A certified bound requires control of a higher derivative over the whole interval connecting the center to the evaluation point, plus correct use of the remainder theorem's hypotheses.",
        entryPrerequisites: [
          "T22-M09-A01 through A03",
          "T22 Module 2 bounds and quantifier discipline",
          "Basic interval reasoning and maxima/bounds for elementary derivatives",
        ],
        target:
          "Given a function, center, evaluation region and tolerance, derive/use a valid Taylor remainder bound, certify the approximation error, and select the smallest practical order justified by the bound.",
        requiredMastery: [
          "State a usable Lagrange-form remainder with its differentiability hypotheses",
          "Identify a bound M for the relevant (n+1)st derivative over the required interval",
          "Derive |R_n(x)| <= M|x-a|^(n+1)/(n+1)! from the theorem",
          "Distinguish actual error from an upper bound on error",
          "Choose n to meet a specified tolerance and verify the inequality",
          "Explain why bounding the derivative only at the expansion point is insufficient",
          "Diagnose misuse of the first omitted term as a universal error estimate",
          "Compare two centers or orders and justify which gives the tighter certified approximation on a target region",
          "Transfer the method to an unfamiliar function where the main difficulty is constructing a defensible derivative bound",
        ],
        applicationScope:
          "One certified approximation problem with a numerical or modelling tolerance, including explicit statement of interval and assumptions.",
        transferScope:
          "A new function/region where the learner must reason about derivative bounds rather than merely substitute into a canned formula.",
        explicitlyOutOfScope: [
          "Floating-point roundoff and machine precision — ARC585",
          "Alternating-series-specific error theory except as an optional comparison",
          "Multivariable Taylor remainder bounds",
          "Asymptotic big-O notation as a full topic",
        ],
        nextArcBoundary:
          "A05 separates smoothness from analyticity and studies convergence/failure cases where all Taylor coefficients exist but the Taylor series does not recover the function.",
      },
      "T22-M09-A05": {
        focus: "Convergence, analyticity and failure of Taylor representation.",
        roleRelevance:
          "Approximation methods become dangerous when smoothness is mistaken for guaranteed series representation. Quantitative researchers need to know what assumptions make local expansions trustworthy and how to falsify overextended claims.",
        purpose:
          "Distinguish differentiability of all orders from analyticity, analyze the logical conditions required for Taylor polynomials to converge to the function, and study canonical failure cases.",
        principalObstacle:
          "A function may have derivatives of every order at a point, and all of those derivatives may even vanish, while the function is nonzero arbitrarily close to that point; derivative data at one point need not determine the nearby function.",
        entryPrerequisites: [
          "T22-M09-A03 and A04",
          "T22 Module 2 convergence/failure reasoning",
          "Comfort with piecewise-defined functions and limits",
        ],
        target:
          "Determine whether a Taylor-series representation claim is justified by proving remainder decay or producing a counterexample, and clearly distinguish smooth, analytic and merely formal-series statements.",
        requiredMastery: [
          "Define in operational terms what it means for a function to equal its Taylor series on a neighborhood",
          "Explain the difference between being infinitely differentiable and being analytic",
          "Analyze the standard flat-function pattern f(x)=e^(-1/x^2) for x!=0 with f(0)=0 at the level needed to see that all derivatives at 0 vanish while f(x)>0 off 0",
          "Conclude that its Taylor series at 0 is identically zero and therefore fails to represent the function away from 0",
          "Use remainder-to-zero reasoning as the decisive bridge from Taylor polynomials to equality with f",
          "Distinguish divergence of a Taylor series from convergence to the wrong function",
          "Diagnose the false claim that infinitely differentiable automatically implies equal to its Taylor series",
          "State locality carefully: a representation valid near one center need not justify arbitrary far-field use",
          "Transfer the logic to a new approximation claim and identify exactly what must be proved before trusting the series representation",
        ],
        applicationScope:
          "One model-validation scenario where a local expansion is proposed and the learner must specify evidence required before extrapolating it beyond a narrow neighborhood.",
        transferScope:
          "An unfamiliar smooth-function or approximation claim requiring separation of coefficient existence, series convergence and equality to the target function.",
        explicitlyOutOfScope: [
          "Full real-analytic function theory",
          "Complex analysis and analytic continuation",
          "Borel's theorem or advanced smooth-function construction",
          "Multivariable analyticity",
        ],
        nextArcBoundary:
          "Module 10 / SIDE271 generalizes local linear and second-order reasoning to several variables through partial derivatives, gradients, Jacobians and Hessians; later optimization and numerical modules operationalize Taylor models algorithmically.",
      },
    },
  };
}
