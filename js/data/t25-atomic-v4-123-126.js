// Individually authored T25 M.Stat audited-v4 cards 123-126.
export const T25_ATOMIC_V4_123_126 = [
  {
    id: "T25-ARC833-A1123",
    routeOrder: 123,
    syllabusCode: "E3.1",
    targetCode: "E3",
    parentId: "ARC833",
    title: "Write and maximise one likelihood for the recorded observations.",
    focus: "Build the likelihood for the data that were actually recorded, including censoring or rounding when present, retain every parameter-dependent support restriction, and maximise only over the legal parameter space.",
    purpose: "Make likelihood a model-of-observation calculation rather than a reflexive product of densities, so the objective, support and feasible parameter region are all correct before differentiation begins.",
    centralCapability: "Construct a likelihood from the observation mechanism, simplify it without dropping support indicators, locate interior candidates when legitimate, and compare them with all feasible boundaries or interval pieces.",
    principalObstacle: "Writing the likelihood for latent unrounded values instead of recorded observations, dropping a support indicator as a 'constant', or solving a score equation before determining the feasible set can produce an MLE for the wrong problem.",
    entryPrerequisites: ["D1/D2 sampling laws and support", "D0/D5 atoms, transformed observations and support", "C5 optimisation on a stated domain", "O1 support-extreme logic"],
    requiredOwnership: [
      "State exactly what each observed datum records before writing its contribution to the likelihood",
      "Include parameter-dependent support or censoring/rounding events in the likelihood",
      "Write the legal parameter set before taking derivatives",
      "Use a log-likelihood only after preserving every zero-likelihood constraint",
      "Solve the interior score equation when it is relevant and feasible",
      "Compare all interior candidates with feasible endpoints or interval boundaries",
      "Reject a formal critical point that violates the model or support",
      "Distinguish a maximum from a merely stationary point"
    ],
    inScope: [
      "Smooth one-parameter likelihoods with fixed support",
      "Rounded or censored recorded observations",
      "Likelihoods with simple parameter-dependent support",
      "Interior-versus-boundary maximisation on a connected feasible set"
    ],
    outOfScope: [
      "General numerical optimisation algorithms",
      "EM algorithms or latent-variable likelihood methods",
      "Asymptotic likelihood theory",
      "General KKT theory beyond the small constraints explicitly needed later"
    ],
    applicationScope: "Entrance-level likelihood problems where the main challenge is constructing the correct observed-data likelihood, preserving support restrictions and checking interior versus boundary candidates.",
    transferScope: "An unfamiliar recording mechanism such as interval rounding or censoring where the learner must derive each likelihood contribution from an event rather than reuse the raw-data density.",
    exitCondition: "Given a sampling model and the actual recorded observations, write the correct likelihood with its feasible parameter region, derive all valid candidates, compare boundaries as required, and identify the global maximiser or explain why none exists.",
    nextArcBoundary: "124 E3.2 intensifies support geometry: the feasible parameter set may be disconnected, an endpoint may dominate, or the supremum may fail to be attained."
  },
  {
    id: "T25-ARC833-A1124",
    routeOrder: 124,
    syllabusCode: "E3.2",
    targetCode: "E3",
    parentId: "ARC833",
    title: "Solve a boundary/disconnected-support likelihood and check whether a maximum exists.",
    focus: "Analyse likelihoods whose support makes the feasible parameter set boundary-driven or disconnected, and decide correctly whether the likelihood attains a maximum or only approaches a supremum.",
    purpose: "Break the habit that every likelihood problem reduces to differentiating one smooth expression on one interval, especially in moving-support families where feasibility itself changes with the parameter.",
    centralCapability: "Partition the legal parameter space into all feasible components, optimise on each component including endpoints, compare componentwise maxima or suprema, and state explicitly when no MLE exists.",
    principalObstacle: "Ignoring disconnected feasible regions, silently including an open endpoint, or declaring the largest limiting likelihood value to be an MLE even when no admissible parameter attains it.",
    entryPrerequisites: ["E3.1 observed-data likelihood construction", "D1/D2 parameter-dependent support", "F2 solution sets and interval logic", "C5 boundary optimisation"],
    requiredOwnership: [
      "Derive the feasible parameter set directly from all observations and support constraints",
      "Split a disconnected feasible set into its separate components before optimisation",
      "Track open versus closed endpoints exactly",
      "Optimise the likelihood or log-likelihood on every feasible component",
      "Compare componentwise maxima or limiting suprema globally",
      "Distinguish an attained maximum from an unattained supremum",
      "State clearly when the MLE is nonunique or does not exist",
      "Explain why differentiating outside the feasible set is irrelevant"
    ],
    inScope: [
      "Moving-support likelihoods",
      "Disconnected feasible parameter intervals",
      "Boundary and endpoint maximisation",
      "Nonexistence or nonuniqueness of an MLE"
    ],
    outOfScope: [
      "General topological existence theorems",
      "Profile likelihood in high dimensions",
      "Nonparametric likelihood",
      "Advanced constrained-optimisation algorithms"
    ],
    applicationScope: "Entrance problems where sample extrema, support restrictions or transformed observations induce a constrained or disconnected parameter domain and the likelihood maximum is not found safely by an unconstrained score equation.",
    transferScope: "A novel moving-support family in which the learner must determine the legal parameter components first and then decide whether each best value is attained.",
    exitCondition: "For a likelihood with boundary or disconnected support, derive the exact feasible set, optimise over every component, compare all candidates and limiting values, and conclude correctly whether the MLE exists and whether it is unique.",
    nextArcBoundary: "125 E4.1 assumes a valid underlying MLE has been established and asks for an MLE of a parameter function by invariance without confusing model and sample quantiles."
  },
  {
    id: "T25-ARC833-A1125",
    routeOrder: 125,
    syllabusCode: "E4.1",
    targetCode: "E4",
    parentId: "ARC833",
    title: "Find the MLE of a model probability, median or quantile by invariance.",
    focus: "Apply MLE invariance to a well-defined function of the model parameter, deriving the model probability, median or quantile from the population law before substituting the MLE of the underlying parameter.",
    purpose: "Make invariance a precise mapping statement and prevent the common confusion between a model functional evaluated at an MLE and an empirical sample quantile computed directly from the data.",
    centralCapability: "Identify the target parameter function g(theta), derive it from the model when necessary, obtain a valid MLE of theta, and report g(theta-hat) with domain and nonuniqueness issues handled correctly.",
    principalObstacle: "Substituting a sample median or sample proportion merely because the target is called a median or probability, or applying invariance when the base MLE is nonexistent or the target function is not defined on all maximisers.",
    entryPrerequisites: ["E3 valid likelihood maximisation", "D1 model probabilities", "D5 transformations", "O2/O4 distinction between model and sample quantiles"],
    requiredOwnership: [
      "Write the inferential target explicitly as a function g(theta)",
      "Derive a model median or quantile from the population CDF rather than from the observed sample ranks",
      "Obtain or reuse a valid MLE of the underlying parameter",
      "Apply invariance by evaluating g at the MLE",
      "Check the target function is defined on the legal parameter space",
      "Handle multiple base MLEs by mapping the entire maximiser set when needed",
      "Distinguish a model probability or quantile from an empirical statistic with a similar name"
    ],
    inScope: [
      "MLEs of smooth or elementary parameter functions",
      "Model probabilities evaluated at an MLE",
      "Model medians and quantiles",
      "Simple non-one-to-one target mappings when the maximiser set can be mapped explicitly"
    ],
    outOfScope: [
      "General equivariant estimation theory",
      "Delta-method standard errors",
      "Profile-likelihood confidence sets",
      "Asymptotic distribution of transformed MLEs"
    ],
    applicationScope: "Entrance questions asking for an MLE of a derived model feature after the underlying likelihood problem has already been solved correctly.",
    transferScope: "A new distributional functional whose formula must first be derived from the model, then transformed by invariance rather than replaced by an empirical analogue.",
    exitCondition: "Given a model and a valid base MLE, derive the requested model probability, median or quantile as g(theta), apply invariance correctly, and explain why the corresponding sample statistic need not be the MLE.",
    nextArcBoundary: "126 E4.2 moves from scalar invariance to a small constrained normal-mean likelihood where equality and inequality feasibility must both be checked."
  },
  {
    id: "T25-ARC833-A1126",
    routeOrder: 126,
    syllabusCode: "E4.2",
    targetCode: "E4",
    parentId: "ARC833",
    title: "Solve a small constrained normal-mean problem and check feasibility.",
    focus: "Maximise a small normal-mean likelihood under a linear equality constraint, then verify any additional inequality constraints rather than assuming the equality-constrained solution is automatically feasible.",
    purpose: "Use the geometry of quadratic normal likelihoods to solve a bounded constrained problem cleanly without turning the curriculum into a general constrained-optimisation course.",
    centralCapability: "Reduce the normal likelihood to a squared-distance problem, impose the stated equality constraint, derive the constrained maximiser, and separately enforce all inequality and parameter-space conditions.",
    principalObstacle: "Solving only the equality constraint and forgetting inequality feasibility, or applying an unconstrained sample-mean answer when the admissible mean vector lies on a lower-dimensional set.",
    entryPrerequisites: ["E3 likelihood construction", "M5 quadratic forms and projections", "J5 transformed coordinates", "C5 constrained comparison at elementary level"],
    requiredOwnership: [
      "Rewrite the normal log-likelihood as a constant minus a weighted squared-distance objective",
      "State the equality and inequality constraints before optimisation",
      "Use substitution or an elementary multiplier/projection argument for the equality constraint",
      "Check the candidate satisfies every inequality constraint",
      "If an inequality is violated, move to the relevant active boundary and re-optimise",
      "Verify the final candidate lies in the original parameter space",
      "Explain why the constrained solution differs from the unconstrained coordinatewise sample means"
    ],
    inScope: [
      "Small normal-mean likelihoods with one linear equality constraint",
      "Simple accompanying inequality constraints",
      "Weighted least-squares/projection interpretation",
      "Boundary rechecking when an inequality becomes active"
    ],
    outOfScope: [
      "General KKT theorem development",
      "High-dimensional quadratic programming",
      "Semidefinite programming",
      "General convex-duality theory"
    ],
    applicationScope: "Small entrance-level constrained normal likelihood problems where the objective is quadratic and the legal mean vector is restricted by one or two transparent algebraic conditions.",
    transferScope: "A new low-dimensional normal mean problem where the learner must identify the quadratic geometry, impose the equality restriction and independently audit inequality feasibility.",
    exitCondition: "For a stated small normal-mean model with equality and inequality constraints, derive the constrained likelihood maximiser, check all feasibility conditions, and repair the candidate on the active boundary if necessary.",
    nextArcBoundary: "127 E5.1 leaves optimisation and begins sufficiency, where the question becomes what sample information the likelihood retains about the parameter."
  }
];
