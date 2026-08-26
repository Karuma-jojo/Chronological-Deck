export function buildT22RichModule10(syllabusVersion) {
  return {
    moduleId: "SIDE271",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Generalize one-variable local sensitivity into a rigorous multivariable language. Build partial derivatives without confusing coordinate slices with full local behavior; derive directional derivatives and the gradient; define total differentiability as a single linear approximation; propagate derivatives through multivariable compositions; organize vector-valued derivatives with Jacobians; develop Hessians as second-order local structure; and finish by reading curvature, interactions and local quadratic geometry without stealing matrix-calculus or optimization algorithms from later modules.",
    moduleDestination:
      "The learner can move from coordinate-wise rates to a defensible multivariable local model, compute and interpret gradients/Jacobians/Hessians with correct shapes, derive multivariable chain rules from local linear maps, distinguish partial differentiability from total differentiability, and use second-order information to classify local geometry while diagnosing failure cases and hidden regularity assumptions.",
    entryPrerequisites: [
      "T22 Module 1 / ARC053: derivative as first-order local linearity and chain rule",
      "T22 Module 4 / ARC511 and Module 5 / SIDE276: vectors, linear maps, matrices, norms and basis-aware reasoning",
      "T22 Module 9 / SIDE267: higher-order local approximation and remainder/error discipline",
      "Algebraic fluency with functions of several variables and elementary linear systems",
    ],
    explicitlyOutOfScope: [
      "General matrix calculus with matrix-valued variables, trace identities, inverse/determinant derivatives and statistical objectives — owned by ARC711",
      "Optimization algorithms, constrained optimization, KKT conditions and Newton/quasi-Newton methods — owned by ARC514/ARC581/ARC582/ARC586",
      "Numerical differentiation and finite-difference stability — owned by ARC585",
      "Differential geometry, manifolds, tensors and coordinate-free advanced analysis",
      "Measure-theoretic multivariable analysis or a full theorem catalogue for pathological differentiability examples",
    ],
    arcs: {
      "T22-M10-A01": {
        focus: "Partial derivatives as coordinate-slice rates, and their limitations.",
        roleRelevance:
          "Quantitative models often depend on many inputs. Partial derivatives are the first sensitivity probe, but treating them as a complete local model can hide interactions and singular behavior.",
        purpose:
          "Define and compute partial derivatives from one-variable slices while making explicit what they do and do not establish about the full multivariable function.",
        principalObstacle:
          "Existence of all coordinate partial derivatives at a point does not guarantee continuity or a single linear approximation there; coordinate-wise evidence can miss behavior along other approach directions.",
        entryPrerequisites: ["One-variable derivative definition", "Functions of two or more variables", "Coordinates and vectors"],
        target:
          "Compute partial derivatives from definitions or established one-variable rules, interpret them as ceteris-paribus coordinate sensitivities, and refute the claim that their mere existence implies full differentiability.",
        requiredMastery: [
          "Construct a partial derivative by freezing all but one coordinate",
          "Compute first partials for representative smooth functions with correct held-fixed variables",
          "Interpret units and signs of coordinate sensitivities in a multivariable model",
          "Compare partial derivatives at a point with finite changes along coordinate directions",
          "Give or analyze a counterexample where all partial derivatives exist at a point but continuity or differentiability fails",
          "Diagnose an argument that infers full local linearity from coordinate slices alone",
          "Transfer the coordinate-slice idea to an unfamiliar multivariable quantity without assuming later gradient machinery",
        ],
        applicationScope:
          "One multivariable sensitivity model where individual input effects are meaningful but cross-direction behavior must be treated cautiously.",
        transferScope:
          "A new function or data-model surface requiring careful coordinate-wise interpretation and identification of what partial derivatives leave unresolved.",
        explicitlyOutOfScope: ["Gradient geometry — A02", "Total differentiability — A03", "Mixed-partial theorems — A06", "Optimization"],
        nextArcBoundary:
          "A02 asks how sensitivity behaves in arbitrary directions and identifies the gradient as the object encoding all directional rates for differentiable scalar fields.",
      },
      "T22-M10-A02": {
        focus: "Directional derivatives and the gradient as the geometry of scalar sensitivity.",
        roleRelevance:
          "Gradients are the basic local-sensitivity objects behind likelihoods, optimization, risk surfaces and machine-learning objectives.",
        purpose:
          "Move beyond coordinate directions, derive the directional-derivative formula under differentiability, and interpret the gradient geometrically through inner products.",
        principalObstacle:
          "A directional derivative is not automatically the dot product of a vector of partial derivatives with the direction; that formula depends on a genuine linear first-order approximation.",
        entryPrerequisites: ["T22-M10-A01", "Dot products, norms and angles", "One-variable chain rule"],
        target:
          "For differentiable scalar fields, derive D_u f = grad f · u, identify steepest first-order increase/decrease under a unit-direction constraint, and recognize cases where directional derivatives exist but do not assemble into a linear map.",
        requiredMastery: [
          "Define a directional derivative from a one-dimensional path through the point",
          "Derive D_u f = grad f · u from local linearity rather than quote it unconditionally",
          "Compute gradients with correct coordinate ordering",
          "Use Cauchy-Schwarz to justify the steepest-ascent direction and maximum unit directional rate",
          "Interpret zero directional rate as first-order orthogonality to the gradient",
          "Analyze a counterexample where directional derivatives exist in many/all directions but fail to form a linear directional map",
          "Transfer gradient geometry to an unfamiliar scalar response surface",
        ],
        applicationScope:
          "One local sensitivity/risk surface where a constrained direction must be chosen or interpreted using the gradient.",
        transferScope:
          "A geometrically different scalar field requiring derivation of directional behavior rather than formula matching.",
        explicitlyOutOfScope: ["Gradient-descent algorithms", "Constraints/KKT", "Matrix-variable gradients", "Full level-set theorem machinery"],
        nextArcBoundary:
          "A03 defines total differentiability and the total differential, supplying the missing hypothesis that makes directional sensitivity a single coherent linear map.",
      },
      "T22-M10-A03": {
        focus: "Total differential and multivariable local linearity.",
        roleRelevance:
          "A defensible local linear model is the foundation for perturbation analysis, error propagation, nonlinear fitting, optimization and later matrix calculus.",
        purpose:
          "Generalize the one-variable representation f(a+h)=f(a)+linear term+smaller-order remainder to several variables and distinguish total differentiability from the existence of separate partial derivatives.",
        principalObstacle:
          "The error must be small relative to the norm of the entire perturbation vector uniformly across directions; checking coordinate axes separately is insufficient.",
        entryPrerequisites: ["T22-M10-A01 and A02", "Norms", "Linear maps and matrix-vector action", "One-variable local-linearity remainder form"],
        target:
          "Establish and use f(a+h)=f(a)+L(h)+r(h) with ||r(h)||/||h|| -> 0, identify L for scalar-valued maps, and test whether a proposed derivative is genuinely direction-independent and linear.",
        requiredMastery: [
          "State total differentiability using a linear map plus a norm-controlled remainder",
          "Explain the quantifier/directional strength gained over separate partial derivatives",
          "For a scalar field, identify L(h)=grad f(a)·h when differentiability is established",
          "Use the local linear model to approximate simultaneous multi-input perturbations",
          "Verify differentiability in a manageable example by bounding the remainder relative to ||h||",
          "Diagnose a function with existing partials whose remainder cannot satisfy the total-differentiability criterion",
          "Distinguish continuity, partial differentiability, directional differentiability and total differentiability without collapsing them",
          "Transfer the remainder test to an unfamiliar multivariable function",
        ],
        applicationScope:
          "One simultaneous-input perturbation problem with an explicit first-order approximation and a statement of what error claim is justified.",
        transferScope:
          "A new nonlinear surface where the learner must construct or reject a single linear local model using norm-relative error reasoning.",
        explicitlyOutOfScope: ["General Frechet-derivative functional analysis", "Second-order models — A06/A07", "Numerical conditioning", "Optimization algorithms"],
        nextArcBoundary:
          "A04 composes these local linear maps and derives the multivariable chain rule without coordinate-only mnemonic reasoning.",
      },
      "T22-M10-A04": {
        focus: "Multivariable chain rule as composition of local linear maps.",
        roleRelevance:
          "Nested parameter transformations, feature maps, likelihoods and computational graphs all require correct propagation of multivariable sensitivity.",
        purpose:
          "Derive the multivariable chain rule from total differentials/local linear maps and make dimensions, evaluation points and dependency structure explicit.",
        principalObstacle:
          "In several variables, derivative objects have shapes and compose by linear-map multiplication; scalar outside-inside mnemonics obscure dimensions and can silently drop dependency paths.",
        entryPrerequisites: ["T22-M10-A03", "Matrix multiplication as composition", "One-variable chain rule"],
        target:
          "Derive and apply D(f∘g)(x)=Df(g(x))Dg(x) with dimension checks, including scalar-through-vector and vector-through-vector compositions.",
        requiredMastery: [
          "Derive the composition rule by substituting two first-order local models and controlling the composed remainder at the intended level",
          "Track input/intermediate/output dimensions before multiplying derivative objects",
          "Handle a scalar function of several intermediate variables depending on common inputs",
          "Expand a compact chain-rule product into coordinate partial-derivative sums and back",
          "Identify all dependency paths in a small computational graph without double-counting or omission",
          "Diagnose a dimensionally invalid or wrongly evaluated chain-rule expression",
          "Transfer the rule to an unfamiliar nested transformation with multiple outputs",
        ],
        applicationScope:
          "One nested quantitative model where a parameter affects an output through multiple intermediate quantities.",
        transferScope:
          "A changed dependency graph requiring structural composition of local maps rather than syntactic differentiation.",
        explicitlyOutOfScope: ["Full reverse-mode autodiff/backprop implementation", "Matrix-variable calculus — ARC711", "Implicit-function theorem", "Optimization"],
        nextArcBoundary:
          "A05 formalizes the derivative of vector-valued maps as a Jacobian matrix and develops shape-aware interpretation of its rows, columns and local action.",
      },
      "T22-M10-A05": {
        focus: "Jacobians as matrix representations of derivatives of vector-valued maps.",
        roleRelevance:
          "Jacobians encode local propagation through multivariate transformations used in factor models, nonlinear features, state mappings, simulation and machine learning.",
        purpose:
          "Organize all first-order output sensitivities into the matrix representation of the total derivative and connect coordinate entries to the underlying linear map.",
        principalObstacle:
          "A Jacobian is not merely a table of partials: orientation, dimensions and the map it represents determine how perturbations propagate and how chain rules compose.",
        entryPrerequisites: ["T22-M10-A03 and A04", "Matrices as linear maps", "Basis coordinates"],
        target:
          "Construct Jacobians with an explicit output-by-input convention, use J_f(a)h as the first-order output perturbation, and compose Jacobians consistently across transformations.",
        requiredMastery: [
          "State a Jacobian convention and infer its dimensions from domain/codomain",
          "Construct the Jacobian of representative vector-valued maps",
          "Interpret rows as output gradients and columns as responses to coordinate-input perturbations under the chosen convention",
          "Use J h to predict simultaneous first-order output changes",
          "Verify Jacobian chain-rule products by dimension and by at least one coordinate expansion",
          "Recognize rank-deficient local action as loss of first-order output directions without importing later inverse-function theory",
          "Diagnose transpose/orientation mistakes that produce plausible-looking but wrong derivatives",
          "Transfer the Jacobian view to a new feature/state transformation",
        ],
        applicationScope:
          "One vector-valued transformation where several observables respond jointly to several inputs and the local map must be interpreted.",
        transferScope:
          "A novel transformation requiring shape-first construction and local perturbation reasoning.",
        explicitlyOutOfScope: ["Determinant-based change-of-variables in probability", "Inverse/implicit-function theorems", "Autodiff implementation", "Matrix-valued independent variables"],
        nextArcBoundary:
          "A06 differentiates scalar gradients once more, develops Hessian structure and distinguishes second partials, mixed partials and symmetry conditions.",
      },
      "T22-M10-A06": {
        focus: "Hessians, mixed partial derivatives and second-order sensitivity.",
        roleRelevance:
          "Curvature of objective and likelihood surfaces determines local identification, sensitivity, uncertainty approximations and the behavior of second-order optimization methods later in T22.",
        purpose:
          "Construct the Hessian as the derivative/Jacobian of the gradient, understand diagonal and cross-curvature entries, and state the regularity conditions under which mixed partials can be interchanged.",
        principalObstacle:
          "Second-order cross effects are easy to treat as automatically symmetric; equality of mixed partials requires hypotheses and the Hessian's meaning depends on being evaluated as a bilinear/quadratic second-order object.",
        entryPrerequisites: ["T22-M10-A03 through A05", "Second derivatives in one variable", "Basic matrix symmetry"],
        target:
          "Compute and interpret Hessians for smooth scalar fields, justify symmetry under appropriate continuity assumptions on second partials, and detect interaction curvature that coordinate second derivatives alone miss.",
        requiredMastery: [
          "Construct H_f with consistent variable ordering",
          "Interpret diagonal entries as coordinate curvature and off-diagonal entries as local interaction curvature",
          "Relate the Hessian to the Jacobian of the gradient",
          "State a usable Clairaut/Schwarz mixed-partial symmetry condition rather than assuming symmetry universally",
          "Analyze an example where cross-partials matter to local behavior",
          "Diagnose an invalid mixed-partial swap when regularity has not been established",
          "Use h^T H h to evaluate curvature along a perturbation direction",
          "Transfer Hessian interpretation to an unfamiliar two- or three-parameter model",
        ],
        applicationScope:
          "One parameterized scalar model where cross-curvature changes the interpretation of simultaneous parameter movements.",
        transferScope:
          "A new objective/surface where the learner must distinguish coordinate curvature from directional quadratic curvature.",
        explicitlyOutOfScope: ["Observed/Fisher information — ARC531/ARC533", "Matrix-calculus Hessians — ARC711", "Newton algorithms — ARC586", "Constrained second-order conditions"],
        nextArcBoundary:
          "A07 combines gradient and Hessian into the second-order local Taylor model and reads local geometry through definiteness and directional curvature.",
      },
      "T22-M10-A07": {
        focus: "Second-order local geometry from gradients, Hessians and quadratic models.",
        roleRelevance:
          "Quantitative researchers need to read local curvature of loss, likelihood and risk surfaces before choosing or trusting optimization and approximation procedures.",
        purpose:
          "Combine the first- and second-order derivative objects into a multivariable quadratic local model and use Hessian definiteness to reason about local shape while preserving the limits of second-order tests.",
        principalObstacle:
          "A stationary point is not automatically an optimum, and an inconclusive/semidefinite Hessian does not justify a classification without higher-order or direct analysis.",
        entryPrerequisites: ["T22-M10-A06", "T22 Module 8 quadratic forms and definiteness", "T22 Module 9 Taylor approximation"],
        target:
          "Construct f(a+h) ≈ f(a)+grad f(a)^T h + 1/2 h^T H_f(a)h, classify clear positive/negative/indefinite stationary-point cases, and explicitly recognize inconclusive cases.",
        requiredMastery: [
          "Derive the form of the multivariable quadratic model from directional/second-order reasoning at the intended course level",
          "Evaluate first- and second-order terms for a proposed perturbation",
          "Use positive definite, negative definite and indefinite Hessians to distinguish strict local bowl, cap and saddle geometry at stationary points under smoothness assumptions",
          "Produce or analyze a saddle whose coordinate slices can look misleading",
          "Explain why positive semidefinite or singular Hessians may leave the second-order test inconclusive",
          "Distinguish local geometric classification from a claim of global optimality",
          "Diagnose misuse of Hessian eigenvalues away from a stationary point or without required smoothness",
          "Transfer the quadratic-model logic to an unfamiliar loss/likelihood-style surface without running an optimization algorithm",
        ],
        applicationScope:
          "One local model-selection or parameter-sensitivity scenario where curvature determines whether a nominal operating point is locally stable, flat or saddle-like in objective value.",
        transferScope:
          "A novel scalar surface requiring synthesis of gradient, Hessian, definiteness and locality rather than a memorized second-derivative test.",
        explicitlyOutOfScope: ["Newton/quasi-Newton iteration", "Global convex optimization theory", "Constraints/KKT", "Statistical likelihood inference", "Matrix-variable objectives"],
        nextArcBoundary:
          "Module 11 / ARC711 owns matrix-calculus notation and differentiation of scalar/vector/matrix expressions; later optimization modules turn gradient/Hessian geometry into algorithms.",
      },
    },
  };
}
