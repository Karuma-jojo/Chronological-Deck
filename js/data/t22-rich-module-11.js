export function buildT22RichModule11(syllabusVersion) {
  return {
    moduleId: "ARC711",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Extend multivariable local-linear reasoning to objectives whose variables, parameters or intermediate quantities are vectors and matrices. Establish shape-safe derivative conventions; use differentials as a derivation language; derive gradients for quadratic and least-squares objectives; develop trace identities; differentiate inverse and determinant/log-determinant expressions; assemble these tools inside statistical objectives; and finish with adversarial gradient forensics so formulas are justified rather than memorized.",
    moduleDestination:
      "The learner can derive and audit matrix-calculus gradients with explicit dimensions, convert between differential and gradient forms, justify quadratic/trace/inverse/log-determinant identities, differentiate representative statistical objectives, and detect transpose, symmetry, domain and hidden-assumption errors before those gradients feed later optimization or machine-learning algorithms.",
    entryPrerequisites: [
      "T22 Module 10 / SIDE271: total differentials, Jacobians, gradients, Hessians and multivariable chain rule",
      "T22 Module 5 / SIDE276: matrices as linear maps, products, inverses, determinants and change of basis",
      "T22 Module 6 / SIDE278 and Module 8 / SIDE280: inner products, least squares, quadratic forms, definiteness and covariance structure",
      "Fluency with matrix dimensions, transpose rules and scalar algebra",
    ],
    explicitlyOutOfScope: [
      "Optimization algorithms, line search, Newton/quasi-Newton updates and convergence theory — owned by ARC514/ARC586",
      "Automatic differentiation/backpropagation as a software system — later learning modules own algorithmic implementation",
      "Numerically stable matrix factorizations, conditioning and finite-precision linear algebra — owned by ARC585",
      "Full tensor calculus, differential geometry and coordinate-free multilinear analysis",
      "Measure-theoretic likelihood theory, asymptotic inference and Fisher information — owned by ARC531/ARC533",
    ],
    arcs: {
      "T22-M11-A01": {
        focus: "Derivative shapes, conventions and matrix-calculus notation.",
        roleRelevance:
          "Most matrix-calculus failures in quantitative work are shape or convention failures that produce plausible-looking but dimensionally wrong formulas.",
        purpose:
          "Fix a consistent derivative convention and make domain, codomain and output shape explicit before symbolic manipulation begins.",
        principalObstacle:
          "Scalar, vector and matrix variables produce derivative objects of different shapes, and silent switching between numerator-layout, denominator-layout or row/column gradient conventions can transpose an otherwise correct derivation.",
        entryPrerequisites: ["SIDE271 Jacobians and gradients", "Matrix dimensions", "Transpose rules"],
        target:
          "Infer the shape of every derivative object from the underlying map and maintain one explicit convention through representative scalar-, vector- and matrix-valued expressions.",
        requiredMastery: [
          "Classify maps by input/output shape before differentiating",
          "State a column-gradient/Jacobian convention and use it consistently",
          "Infer the dimensions of gradients and Jacobians without calculation",
          "Translate a simple derivative between equivalent row/column conventions when the convention change is stated",
          "Diagnose transpose errors using dimensions and directional perturbations",
          "Distinguish a gradient from a Jacobian and from a full higher-order tensor object",
          "Transfer shape-first reasoning to an unfamiliar parameterized matrix expression",
        ],
        applicationScope:
          "One quantitative objective or feature map where an incorrect transpose would change the implementation or interpretation.",
        transferScope:
          "A novel map with different input/output dimensions requiring shape inference before any algebra.",
        explicitlyOutOfScope: ["Trace tricks — A04", "Inverse/determinant derivatives — A05/A06", "Autodiff implementation"],
        nextArcBoundary:
          "A02 introduces differentials as the primary calculation language for converting local perturbations into shape-safe gradients.",
      },
      "T22-M11-A02": {
        focus: "Differentials as a calculation language for matrix derivatives.",
        roleRelevance:
          "Differentials let researchers derive gradients from first-order perturbations while keeping noncommutative matrix multiplication and dimensions visible.",
        purpose:
          "Use first-order differential identities to transform a scalar objective's perturbation into a canonical inner-product form from which the gradient can be read.",
        principalObstacle:
          "Matrix products do not commute, so scalar-style symbolic differentiation can silently reorder factors; the differential must preserve product order and isolate the perturbation correctly.",
        entryPrerequisites: ["T22-M11-A01", "SIDE271 total differential", "Product rule", "Frobenius inner product idea"],
        target:
          "Derive differentials of sums, products and basic matrix expressions and convert df into gradient form with respect to vector or matrix variables.",
        requiredMastery: [
          "Apply d(A+B)=dA+dB and the ordered matrix product rule",
          "Keep constant and variable factors distinct under a differential",
          "Rewrite a scalar differential as g^T dx for vector variables",
          "Rewrite a scalar differential as tr(G^T dX) for matrix variables at the intended course level",
          "Read the corresponding gradient from the canonical differential form",
          "Diagnose an illegal factor reordering in a matrix differential",
          "Verify a derived gradient against a directional first-order perturbation",
        ],
        applicationScope:
          "One matrix-parameter objective whose gradient is easier to derive through perturbations than coordinate-by-coordinate partial derivatives.",
        transferScope:
          "A changed product structure requiring disciplined differential expansion and perturbation isolation.",
        explicitlyOutOfScope: ["Full tensor differential notation", "Numerical finite differences as an algorithm", "Optimization updates"],
        nextArcBoundary:
          "A03 specializes the differential language to quadratic forms and least-squares objectives, where symmetry and residual structure matter.",
      },
      "T22-M11-A03": {
        focus: "Quadratic forms and least-squares gradients.",
        roleRelevance:
          "Quadratic losses, residual sums of squares and risk penalties are ubiquitous in regression, portfolio construction and optimization.",
        purpose:
          "Derive gradients of linear-quadratic scalar objectives from perturbation structure and expose exactly where symmetry assumptions simplify formulas.",
        principalObstacle:
          "The familiar formula grad(x^T A x)=2Ax is only valid when A is symmetric; otherwise the symmetric part A+A^T controls the gradient.",
        entryPrerequisites: ["T22-M11-A02", "SIDE280 quadratic forms", "SIDE278 least-squares geometry"],
        target:
          "Derive gradients of x^T A x, b^T x and ||Ax-b||^2, state symmetry conditions explicitly, and connect stationary normal-equation structure to the earlier geometric least-squares result without turning this into an optimization module.",
        requiredMastery: [
          "Derive grad(x^T A x)=(A+A^T)x from a differential",
          "Recover 2Ax only under an explicit symmetry condition",
          "Derive grad ||Ax-b||^2 = 2A^T(Ax-b)",
          "Relate the zero-gradient equation to the normal equations already justified geometrically",
          "Interpret dimensions and units of each term",
          "Diagnose misuse of a symmetric-matrix formula on a nonsymmetric matrix",
          "Transfer the derivation to a weighted quadratic or residual objective",
        ],
        applicationScope:
          "One least-squares, ridge-style or portfolio-risk expression where the gradient has an operational interpretation.",
        transferScope:
          "An unfamiliar quadratic objective requiring derivation from structure rather than formula recall.",
        explicitlyOutOfScope: ["Solving optimization algorithms", "Regression inference", "General constrained portfolio optimization"],
        nextArcBoundary:
          "A04 develops trace identities that let more complicated scalar matrix expressions be cyclically reorganized without illegally commuting arbitrary matrix products.",
      },
      "T22-M11-A04": {
        focus: "Trace calculus as a disciplined scalarization and rearrangement tool.",
        roleRelevance:
          "Trace identities compress matrix derivatives common in covariance, likelihood and machine-learning objectives, but careless use easily turns cyclic invariance into false commutativity.",
        purpose:
          "Use trace linearity, transpose identities and cyclic permutations to place perturbations in canonical positions and derive gradients of scalar matrix expressions.",
        principalObstacle:
          "tr(ABC)=tr(BCA) permits cyclic rotation, not arbitrary reordering; confusing the two creates incorrect gradients that may still have the right dimensions.",
        entryPrerequisites: ["T22-M11-A02", "Matrix multiplication", "Transpose algebra"],
        target:
          "Derive and apply the core trace identities needed to turn scalar matrix differentials into tr(G^T dX) while distinguishing valid cyclic moves from invalid permutations.",
        requiredMastery: [
          "Use linearity and tr(A)=tr(A^T) appropriately",
          "Justify cyclic invariance for conformable products at the intended level",
          "Convert scalar bilinear/quadratic expressions into trace form when useful",
          "Move dX by cyclic rotation without changing factor order internally",
          "Extract a matrix gradient from tr(G^T dX)",
          "Produce or diagnose a counterexample to arbitrary trace-factor commutation",
          "Transfer trace reasoning to a new scalar matrix objective",
        ],
        applicationScope:
          "One covariance-, regression- or factor-model expression where trace notation materially simplifies the derivative.",
        transferScope:
          "A new trace expression in which the learner must decide which rearrangements are legal before differentiating.",
        explicitlyOutOfScope: ["Matrix determinant lemma", "Advanced spectral trace inequalities", "Tensor traces"],
        nextArcBoundary:
          "A05 differentiates inverse-containing expressions and makes invertibility/domain conditions part of the derivative statement.",
      },
      "T22-M11-A05": {
        focus: "Derivatives of matrix inverses and inverse-dependent objectives.",
        roleRelevance:
          "Covariance weighting, generalized least squares and Gaussian objectives repeatedly differentiate inverse matrices with respect to parameters or matrix variables.",
        purpose:
          "Derive the inverse differential from the identity XX^{-1}=I and propagate it through scalar objectives without memorizing an isolated formula.",
        principalObstacle:
          "The inverse derivative contains the perturbation between two inverse factors, and the formula is meaningful only on the open domain where the matrix remains invertible.",
        entryPrerequisites: ["T22-M11-A02 and A04", "SIDE276 matrix inverse", "Matrix product order"],
        target:
          "Derive d(X^{-1})=-X^{-1}(dX)X^{-1}, state its domain conditions, and use it correctly inside representative scalar inverse-weighted expressions.",
        requiredMastery: [
          "Differentiate XX^{-1}=I to derive the inverse differential",
          "Preserve the exact factor order in d(X^{-1})",
          "State invertibility and local-domain assumptions explicitly",
          "Propagate the inverse differential through a scalar quadratic/trace expression",
          "Simplify only using justified symmetry or trace identities",
          "Diagnose a scalar-style derivative that places dX in the wrong position",
          "Transfer the identity to a parameterized inverse A(theta)^{-1} using the chain rule",
        ],
        applicationScope:
          "One covariance-weighted or generalized least-squares style objective involving an inverse matrix.",
        transferScope:
          "A new inverse-dependent scalar objective with a different surrounding product structure.",
        explicitlyOutOfScope: ["Pseudoinverse derivatives", "Numerical matrix inversion", "Woodbury derivatives and advanced identities"],
        nextArcBoundary:
          "A06 adds determinant and log-determinant derivatives, the second major ingredient in Gaussian and covariance objectives.",
      },
      "T22-M11-A06": {
        focus: "Determinant and log-determinant differentials.",
        roleRelevance:
          "Log-determinants appear in Gaussian likelihoods, entropy-like quantities, covariance regularization and volume terms.",
        purpose:
          "Establish a usable determinant/log-determinant derivative with correct invertibility/sign-domain assumptions and connect it to trace and inverse calculus.",
        principalObstacle:
          "The compact identity d log det X = tr(X^{-1} dX) hides domain restrictions and is often quoted where det X is nonpositive, singular or the chosen real logarithm is undefined.",
        entryPrerequisites: ["T22-M11-A04 and A05", "SIDE276 determinants", "Basic logarithm derivative"],
        target:
          "Derive or justify Jacobi-style determinant differentials at the intended level, obtain the log-determinant identity on an appropriate domain, and differentiate parameterized SPD/covariance expressions safely.",
        requiredMastery: [
          "State an appropriate determinant differential identity for invertible X",
          "Derive d log det X = tr(X^{-1}dX) under a valid real-log domain such as SPD matrices",
          "Distinguish log det X from log |det X| and state when each is meaningful",
          "Use the chain rule for X(theta) inside a determinant term",
          "Extract gradients from log-determinant trace differentials",
          "Diagnose a derivation applied at a singular or invalid-domain matrix",
          "Transfer the result to a new structured covariance parameterization",
        ],
        applicationScope:
          "One positive-definite covariance or precision-matrix term where determinant geometry contributes to a statistical objective.",
        transferScope:
          "A novel parameterized matrix family requiring explicit domain checking before log-determinant differentiation.",
        explicitlyOutOfScope: ["Asymptotic likelihood theory", "Random-matrix log determinants", "Numerical logdet algorithms"],
        nextArcBoundary:
          "A07 combines quadratic, trace, inverse and log-determinant pieces inside complete statistical objectives without yet teaching statistical inference itself.",
      },
      "T22-M11-A07": {
        focus: "Matrix calculus inside statistical and quantitative objectives.",
        roleRelevance:
          "Researchers routinely derive scores or training gradients for Gaussian models, covariance parameters, linear predictors and portfolio-style penalties before handing them to an optimizer.",
        purpose:
          "Assemble the preceding identities into end-to-end derivations where several matrix-calculus structures interact and assumptions determine which simplifications are legal.",
        principalObstacle:
          "Composite objectives encourage formula splicing: a locally correct identity can become globally wrong when dimensions, parameter dependence, symmetry, invertibility or evaluation points are not tracked consistently.",
        entryPrerequisites: ["T22-M11-A03 through A06", "SIDE271 chain rule", "Basic statistical-objective interpretation without inference theory"],
        target:
          "Derive gradients for representative multivariate quadratic/Gaussian-style scalar objectives, explicitly tracking every dependency and structural assumption.",
        requiredMastery: [
          "Decompose a composite scalar objective into derivative-relevant terms",
          "Identify all direct and indirect parameter dependencies",
          "Combine quadratic, inverse and log-determinant differentials without illegal commutation",
          "Exploit symmetry only after stating why it holds",
          "Check the final gradient's dimensions and domain",
          "Verify at least one directional derivative or small finite perturbation as a sanity check without treating numerical agreement as proof",
          "Diagnose a missing dependency path in a statistical objective",
          "Transfer the derivation workflow to an unfamiliar covariance/risk/loss expression",
        ],
        applicationScope:
          "A Gaussian negative-log-likelihood, covariance-model, weighted least-squares or portfolio-style objective chosen for structural richness rather than statistical inference depth.",
        transferScope:
          "A new composite objective requiring the learner to select and combine identities rather than follow a memorized template.",
        explicitlyOutOfScope: ["MLE sampling theory and score asymptotics — ARC531", "Fisher information — ARC533", "Optimization algorithms — ARC586"],
        nextArcBoundary:
          "A08 turns derivation into adversarial verification: gradients must survive shape checks, directional tests, counterexamples and hidden-assumption audits.",
      },
      "T22-M11-A08": {
        focus: "Matrix-gradient forensics, failure diagnosis and unfamiliar transfer.",
        roleRelevance:
          "A research gradient that is subtly wrong can invalidate an optimizer, likelihood fit or backtest while still producing plausible numerical output.",
        purpose:
          "Build a repeatable verification discipline for matrix derivatives using shapes, differential reconstruction, directional checks, special cases and counterexamples.",
        principalObstacle:
          "Correct-looking symbolic answers are easy to trust; robust validation requires independent structural checks that can expose transpose, factor-order, symmetry, domain and missing-chain-rule errors.",
        entryPrerequisites: ["T22-M11-A01 through A07"],
        target:
          "Audit and repair unfamiliar matrix-gradient derivations, explaining exactly which identity or assumption fails and reconstructing a defensible result from first-order perturbations.",
        requiredMastery: [
          "Perform a dimension/shape audit before judging algebra",
          "Reconstruct a claimed gradient from df to test consistency",
          "Use directional derivatives or carefully scaled finite perturbations as independent diagnostics",
          "Choose special cases such as scalar, diagonal or symmetric reductions that expose hidden errors",
          "Distinguish a counterexample from a proof of the corrected general formula",
          "Identify unstated symmetry, invertibility or independence assumptions",
          "Repair at least one plausible but wrong matrix-calculus derivation",
          "Solve an unfamiliar transfer problem combining multiple identities with no formula template supplied",
        ],
        applicationScope:
          "One adversarial review of a gradient intended for a quantitative model, likelihood or loss function, including an explicit verification record.",
        transferScope:
          "A structurally unfamiliar matrix objective where success depends on derivation and forensic checking rather than memory.",
        explicitlyOutOfScope: ["Implementing a full autodiff engine", "Optimizer convergence theory", "High-order tensor Hessian calculus"],
        nextArcBoundary:
          "Module 12 / ARC512 moves to differential equations. Later ARC586 and ARC599 consume matrix gradients in optimization and learning contexts rather than reteaching the calculus identities.",
      },
    },
  };
}
