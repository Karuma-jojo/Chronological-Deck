export function buildT22RichModule3(syllabusVersion) {
  return {
    moduleId: "ARC510",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build integration as controlled accumulation: begin with finite additive totals, pass to Riemann-sum limits, establish the structural laws of the definite integral, connect local rates to cumulative quantities through both parts of the Fundamental Theorem of Calculus, and derive the principal one-dimensional change-of-variables and integration-by-parts mechanisms. Finish by handling convergent improper integrals with explicit limit logic and failure diagnosis. The module supplies the deterministic accumulation machinery later used by probability densities, expectations, continuous models, differential equations and quantitative approximation without pre-teaching those later subjects.",
    moduleDestination:
      "The learner can construct and interpret definite integrals from partitioned accumulation, justify their core algebra/order properties, move rigorously between derivatives and cumulative quantities via the Fundamental Theorem of Calculus, derive and use substitution and integration by parts from structural identities, and determine whether representative improper integrals converge or fail. They can explain hypotheses, error sources and domain restrictions rather than treating integration as an antiderivative lookup procedure.",
    entryPrerequisites: [
      "T22 Module 1 / ARC053: derivative as local rate, local linearity, product rule and chain rule",
      "T22 Module 2 / SIDE263: deterministic convergence, epsilon-N logic, finite-limit algebra, squeezing and counterexample discipline",
      "Algebra, functions, inequalities and interval notation",
      "Finite sums and basic sigma notation, or readiness to acquire that notation inside A01",
      "Geometric area intuition without assuming that all integrals are merely unsigned areas",
    ],
    explicitlyOutOfScope: [
      "Measure theory, Lebesgue integration and measure-theoretic probability",
      "Multivariable, line, surface or volume integrals and vector calculus",
      "General numerical quadrature algorithms, adaptive integration and floating-point error analysis",
      "Taylor approximation, Taylor series and systematic remainder bounds — owned later by SIDE267",
      "Probability-density normalization, expectation and distribution-specific integral calculations — owned later by ARC517 and subsequent statistics modules",
      "Monte Carlo integration and variance-reduction methods — owned later by ARC513",
      "Differential-equation solution theory beyond using accumulation identities — owned later by ARC512",
      "A full real-analysis construction of Riemann integrability for arbitrary pathological functions",
      "Special-function integration catalogues or extensive trigonometric-substitution technique drills",
    ],
    arcs: {
      "T22-M03-A01": {
        focus: "Accumulation as a finite additive construction before any limiting integral is introduced.",
        roleRelevance:
          "Quantitative models routinely aggregate local contributions into totals: exposure over intervals, cumulative cost, mass, work, probability approximations and discretized model outputs. Correct accumulation starts with units, signs and partition logic rather than an integral symbol.",
        purpose:
          "Make accumulation operational by decomposing an interval or system into finite pieces, assigning a contribution to each piece, and understanding how refinement changes an approximation.",
        principalObstacle:
          "A total built from changing local intensity is not generally 'typical value times total width'; the learner must track how local level, interval width, sign and units combine across a partition without yet hiding the construction behind integral notation.",
        entryPrerequisites: [
          "T22 Modules 1 and 2",
          "Arithmetic and algebra",
          "Functions on intervals",
          "Finite sums; sigma notation may be introduced here as compact bookkeeping",
        ],
        target:
          "Given an unfamiliar one-dimensional accumulation problem, independently construct a finite partition sum with correct terms, signs and units; explain what the sum approximates; and predict how changing the partition or sample points can affect the approximation.",
        requiredMastery: [
          "Construct a partition of an interval and identify subinterval widths",
          "Build a finite weighted sum of local contributions rather than applying an unexplained formula",
          "Use sigma notation to represent the same finite sum without losing the meaning of its terms",
          "Track physical or model units through value-times-width contributions",
          "Distinguish signed accumulation from unsigned geometric area",
          "Compare left-, right- or otherwise sampled finite sums on a monotone example and justify the direction of bias when possible",
          "Diagnose an invalid accumulation model caused by inconsistent widths, omitted signs or incompatible units",
          "Transfer the construction to a non-geometric context such as cumulative cost, exposure or quantity from a varying rate",
        ],
        applicationScope:
          "One finite-data or discretized research-style accumulation problem in which local intensities are observed or modelled on intervals and must be combined into a meaningful total with units and sign conventions.",
        transferScope:
          "A different surface context where the learner must discover the same weighted-sum structure rather than being handed the phrase 'Riemann sum'.",
        explicitlyOutOfScope: [
          "Formal Riemann-sum limits and the definition of the definite integral — owned by A02",
          "Fundamental Theorem of Calculus",
          "Antiderivative techniques",
          "Probability expectations",
          "Numerical quadrature algorithms",
        ],
        nextArcBoundary:
          "A02 owns the limiting step: when increasingly fine finite sums define a partition-independent definite integral.",
      },
      "T22-M03-A02": {
        focus: "Riemann sums and the definite integral as a partition-refinement limit.",
        roleRelevance:
          "This is the bridge from discrete approximations to continuous totals, a recurring quantitative pattern whenever a model replaces fine finite aggregation by a continuum representation.",
        purpose:
          "Turn the finite accumulation machinery of A01 into a well-defined continuous total by controlling the effect of partition refinement and sample-point choice.",
        principalObstacle:
          "A collection of increasingly fine sums is not automatically a unique integral: the limit must be independent of admissible sampling choices, and the learner must separate geometric intuition from the actual convergence claim.",
        entryPrerequisites: [
          "T22-M03-A01",
          "T22 Module 2 convergence and squeeze reasoning",
          "Functions and interval notation",
          "Finite sums and inequalities",
        ],
        target:
          "Construct Riemann sums for representative bounded functions, interpret the definite integral as their common refinement limit, and justify the value in elementary cases without assuming an antiderivative formula.",
        requiredMastery: [
          "Write a general tagged partition sum using function values and subinterval widths",
          "Explain mesh/refinement and why merely increasing the number of intervals is not by itself the essential convergence condition",
          "Distinguish one convenient sequence of sums from the stronger claim that admissible fine partitions/sample choices approach the same value",
          "Use upper/lower bounds or squeezing to justify a representative integral value from sums",
          "Compute an elementary definite integral directly from a summation limit in at least one nontrivial case",
          "Interpret orientation and signed accumulation when interval direction or function sign changes",
          "Diagnose a proposed 'integral' whose sampled sums do not settle to a unique refinement limit",
          "Transfer from geometric area language to an accumulation model where no area interpretation is primary",
        ],
        applicationScope:
          "One continuous accumulation problem where the learner must derive a definite integral from a discretization and explain why the continuum quantity is the limit of those finite approximations.",
        transferScope:
          "An unfamiliar bounded one-dimensional model requiring construction of the partition sum and a convergence argument, not merely evaluation via an antiderivative.",
        explicitlyOutOfScope: [
          "A full Darboux/Riemann integrability theory for pathological functions",
          "Lebesgue integration",
          "Fundamental Theorem of Calculus — owned by A04 and A05",
          "Substitution and integration by parts",
          "Monte Carlo integration",
        ],
        nextArcBoundary:
          "A03 owns reusable structural properties of the definite integral once the integral has been established as a legitimate accumulation operator.",
      },
      "T22-M03-A03": {
        focus: "Structural laws of the definite integral: linearity, interval additivity, order and quantitative bounds.",
        roleRelevance:
          "Research calculations become tractable when continuous totals can be decomposed, recombined and bounded without rebuilding a Riemann-sum proof each time. These laws also enforce unit, sign and sanity checks on later models.",
        purpose:
          "Derive the core algebraic and order structure of definite integration from finite-sum/limit reasoning and use it to manipulate and bound accumulations safely.",
        principalObstacle:
          "Integral notation invites symbolic manipulation that can conceal interval orientation, sign, boundedness and domain assumptions; the learner must know which identities are structural consequences and which require extra hypotheses.",
        entryPrerequisites: [
          "T22-M03-A01 and A02",
          "T22 Module 2 finite-limit algebra",
          "Elementary inequalities and absolute value",
        ],
        target:
          "Justify and operationally use linearity, interval splitting/orientation, monotonicity and basic magnitude bounds for definite integrals, while recognizing when a claimed manipulation is unsupported.",
        requiredMastery: [
          "Derive integral linearity from corresponding finite-sum linearity and passage to the limit",
          "Use interval additivity to split or recombine an accumulation at an interior point",
          "Handle reversed limits and explain the resulting sign change structurally",
          "Use pointwise order to justify monotonicity of integrals under appropriate integrability assumptions",
          "Derive or use bounds such as |integral f| <= integral |f| and simple sup-norm/interval-length estimates in representative cases",
          "Distinguish signed integral, total variation-like unsigned accumulation and geometric area where appropriate",
          "Diagnose a false manipulation that ignores a sign, interval boundary or required hypothesis",
          "Transfer structural decomposition to a piecewise or research-style cumulative quantity",
        ],
        applicationScope:
          "One piecewise or bounded continuous accumulation model where decomposition and bounds are more informative than direct symbolic integration.",
        transferScope:
          "A new accumulation operator presented in applied language, where the learner must recognize which integral structural laws justify a decomposition or bound.",
        explicitlyOutOfScope: [
          "Fundamental Theorem of Calculus",
          "Antiderivative tables",
          "Measure-theoretic integral inequalities",
          "Multivariable integration",
          "Numerical error estimators",
        ],
        nextArcBoundary:
          "A04 owns the first derivative-integral bridge: differentiating an accumulation function with a moving endpoint.",
      },
      "T22-M03-A04": {
        focus: "Accumulation functions and Fundamental Theorem of Calculus Part I: local recovery of the integrand.",
        roleRelevance:
          "Quantitative work often moves between an instantaneous density/rate and its cumulative curve. FTC Part I formalizes when the local slope of a cumulative quantity recovers the underlying local intensity.",
        purpose:
          "Show why an accumulated quantity F(x)=integral_a^x f(t)dt has derivative f(x) under suitable regularity, using a local average over a shrinking interval rather than memorized cancellation notation.",
        principalObstacle:
          "The derivative of an accumulation function is not magic symbol cancellation: one must show that the average value of f over a shrinking interval approaches the endpoint value, and understand why continuity/local regularity matters.",
        entryPrerequisites: [
          "T22-M03-A01 through A03",
          "T22 Module 1 derivative definition and local-rate reasoning",
          "T22 Module 2 squeeze/convergence reasoning",
          "Continuity at an intuitive working level sufficient to control nearby function values",
        ],
        target:
          "Derive FTC Part I for a representative continuous integrand from the difference quotient of an accumulation function, state the needed local regularity, and use the theorem to recover local rates from cumulative quantities.",
        requiredMastery: [
          "Construct the difference quotient for F(x)=integral_a^x f(t)dt and rewrite it as an average value of f over a short interval",
          "Use continuity/local bounds to show that short-interval average approaches f(x)",
          "Explain why FTC Part I is a local statement connecting cumulative change to instantaneous intensity",
          "Differentiate accumulation functions with fixed lower endpoint and simple variable upper endpoint forms without treating integral signs as algebraic fractions",
          "Apply the chain rule correctly when an endpoint is itself a differentiable function, while keeping the proof ownership of the core FTC argument distinct",
          "Diagnose a discontinuity or irregularity example where the naive pointwise derivative claim can fail",
          "Interpret the result in units: cumulative quantity per input unit recovers the local density/rate",
          "Transfer the theorem to an unfamiliar cumulative model rather than a geometric area problem",
        ],
        applicationScope:
          "One cumulative exposure, mass, cost, signal or other one-dimensional model where an underlying local intensity must be recovered from a cumulative function.",
        transferScope:
          "A changed model surface with a moving integration endpoint requiring the learner to identify the local average argument and any chain-rule scaling.",
        explicitlyOutOfScope: [
          "FTC Part II / evaluating definite integrals by antiderivatives — owned by A05",
          "Differentiation under an integral sign with parameter-dependent integrands",
          "Leibniz integral rule in general form",
          "Measure-theoretic differentiation theorems",
        ],
        nextArcBoundary:
          "A05 owns the converse computational bridge: using antiderivatives to evaluate definite integrals and understanding why endpoint differences work.",
      },
      "T22-M03-A05": {
        focus: "Antiderivatives and Fundamental Theorem of Calculus Part II as the evaluation bridge from local derivatives to total accumulation.",
        roleRelevance:
          "Once a cumulative quantity can be represented by an antiderivative, many continuous totals become analytically computable and interpretable without explicit partition refinement.",
        purpose:
          "Establish why a definite integral of a suitable function equals the endpoint change of any antiderivative, and separate this theorem from the distinct task of finding antiderivatives.",
        principalObstacle:
          "Learners often conflate 'integral' with 'antiderivative' and overlook constants, hypotheses and endpoint orientation; the theorem must be understood as an equality between an accumulation defined by limits and an endpoint difference derived from derivative structure.",
        entryPrerequisites: [
          "T22-M03-A04",
          "T22 Module 1 differentiation rules",
          "Basic families of elementary antiderivatives that can be reconstructed from known derivative rules",
        ],
        target:
          "Derive and use FTC Part II to evaluate representative definite integrals from antiderivatives, explain the role of arbitrary constants and interval orientation, and distinguish theorem-based evaluation from the original Riemann-sum definition.",
        requiredMastery: [
          "Explain why two antiderivatives of the same function differ by a constant on an interval under the working hypotheses",
          "Derive the endpoint-difference formula from FTC Part I plus derivative reasoning",
          "Evaluate definite integrals using an antiderivative while preserving limits and signs correctly",
          "Check an antiderivative by differentiation rather than trusting pattern matching",
          "Distinguish an indefinite-antiderivative family from a definite integral as a number/accumulation",
          "Use structural or numerical sanity checks to catch an impossible integral value",
          "Diagnose a case where an antiderivative formula is applied across a domain break without justification",
          "Transfer the theorem to a cumulative-change problem where endpoint interpretation matters more than symbolic technique",
        ],
        applicationScope:
          "One analytically tractable continuous-total problem where the endpoint difference has a clear interpretation, alongside a check against sign, scale or units.",
        transferScope:
          "An unfamiliar accumulation presented through a rate law, requiring the learner to identify an antiderivative and interpret its endpoint change rather than merely execute notation.",
        explicitlyOutOfScope: [
          "Large catalogues of integration tricks",
          "Substitution — owned by A06",
          "Integration by parts — owned by A07",
          "Improper integrals — owned by A08",
          "Differential-equation solution methods",
        ],
        nextArcBoundary:
          "A06 owns change of variables: transforming an integral consistently when the underlying coordinate is reparameterized.",
      },
      "T22-M03-A06": {
        focus: "Substitution / change of variables as the integral counterpart of the chain rule.",
        roleRelevance:
          "Variable transformations appear throughout probability, likelihood work, numerical modelling and continuous quantitative systems; correct substitution prevents silent Jacobian/scale mistakes even before multivariable Jacobians are introduced later.",
        purpose:
          "Derive one-dimensional substitution from composition and the chain rule, so transformed differentials, limits and scale factors are justified rather than mnemonic symbol replacement.",
        principalObstacle:
          "Changing variables alters both the integrand and the infinitesimal scale/limits; informal 'u-substitution' can produce wrong answers when the derivative factor, domain or endpoint mapping is incomplete.",
        entryPrerequisites: [
          "T22-M03-A05",
          "T22 Module 1 chain rule",
          "Function composition and inverse/domain reasoning",
        ],
        target:
          "Derive and apply the one-dimensional substitution theorem in representative differentiable settings, transforming integrand, differential scale and bounds consistently and checking the result by differentiation or reverse substitution.",
        requiredMastery: [
          "Derive the basic substitution identity from the chain rule and FTC rather than treating du as unexplained algebra",
          "Choose a useful substitution by recognizing a composed derivative structure",
          "Transform definite-integral bounds into the new variable consistently",
          "Track orientation/sign when a substitution reverses direction",
          "State the regularity/domain assumptions needed for the chosen transformation in the working setting",
          "Diagnose an invalid substitution with a missing derivative factor or inconsistent bounds",
          "Verify a transformed antiderivative or definite integral independently",
          "Transfer change-of-variable reasoning to a rescaled or transformed model quantity without invoking multivariable Jacobians",
        ],
        applicationScope:
          "One transformed one-dimensional model or density-like mathematical expression where reparameterization simplifies accumulation and the scale factor has a meaningful interpretation; no probability theory is required.",
        transferScope:
          "A nonstandard reparameterization where the learner must discover the mapping, derivative scale and new limits rather than match a textbook template.",
        explicitlyOutOfScope: [
          "Multivariable change of variables and Jacobian determinants — owned later by SIDE271/ARC711 and downstream probability work",
          "Probability-density transformation laws as a full topic — owned later by ARC517",
          "Trigonometric-substitution catalogues",
          "Integration by parts",
        ],
        nextArcBoundary:
          "A07 owns integration by parts, derived from product differentiation rather than coordinate transformation.",
      },
      "T22-M03-A07": {
        focus: "Integration by parts as accumulated product-rule structure and a controlled transfer of derivatives between factors.",
        roleRelevance:
          "Integration by parts underlies expectation identities, asymptotic manipulations, weak formulations and analytic simplification. The important skill is selecting and justifying a derivative transfer, not memorizing LIATE-style slogans.",
        purpose:
          "Derive integration by parts directly from the product rule and FTC, then use it strategically where moving a derivative from one factor to another simplifies the integral or exposes structure.",
        principalObstacle:
          "The identity is simple but its use is not: a poor factorization can make the problem worse, boundary terms can be lost, and repeated use can become circular unless the learner tracks what changed.",
        entryPrerequisites: [
          "T22-M03-A05",
          "T22 Module 1 product rule",
          "Algebra and basic antiderivatives",
        ],
        target:
          "Derive integration by parts, choose productive decompositions in representative definite and indefinite problems, preserve boundary terms, and diagnose circular or unjustified applications.",
        requiredMastery: [
          "Derive the integration-by-parts identity from the derivative of a product",
          "Translate correctly between differential notation and an explicit integrand-factor statement",
          "Choose which factor to differentiate and which to integrate based on structural simplification rather than a rote mnemonic alone",
          "Handle definite-integral boundary terms without dropping endpoint contributions",
          "Use repeated integration by parts when it creates a demonstrably simpler recurrence or terminates",
          "Recognize and resolve a circular application that reproduces the original integral",
          "Verify the result by differentiation or an independent definite-integral check",
          "Transfer derivative-moving logic to an unfamiliar analytic identity without importing later probability or asymptotic theory",
        ],
        applicationScope:
          "One analytically meaningful product-structured integral, potentially with a parameter treated as fixed, where the derivative-transfer interpretation is explicit and boundary terms matter.",
        transferScope:
          "A new integrand where the learner must decide whether integration by parts is structurally appropriate and justify the decomposition rather than follow a named pattern.",
        explicitlyOutOfScope: [
          "General parameter differentiation under the integral sign",
          "Stein identities and distribution-specific expectation theory",
          "Asymptotic expansion methods",
          "Improper-integral convergence at infinite or singular boundaries — owned by A08",
        ],
        nextArcBoundary:
          "A08 owns domains where the integration interval or integrand is not ordinary finite/bounded and the integral must itself be defined through an additional limit.",
      },
      "T22-M03-A08": {
        focus: "Improper integrals as limit-defined accumulations, with explicit convergence tests, boundary decomposition and failure cases.",
        roleRelevance:
          "Quantitative models frequently use infinite-support or singular mathematical expressions. Before later probability work, the learner must know that writing an integral over an infinite domain does not guarantee a finite, meaningful quantity.",
        purpose:
          "Extend definite integration cautiously to infinite intervals and endpoint/interior singularities by defining each improper piece as a limit and deciding whether those limits exist finitely.",
        principalObstacle:
          "Formal antiderivative manipulation can hide divergence: infinity is not an endpoint value, singularities cannot be crossed algebraically, and cancellation across two divergent pieces does not produce an ordinary convergent improper integral.",
        entryPrerequisites: [
          "T22-M03-A01 through A07",
          "T22 Module 2 convergence, comparison and failure-case reasoning",
          "Basic antiderivative evaluation and inequalities",
        ],
        target:
          "Define representative improper integrals through one-sided limits, determine convergence or divergence using direct evaluation or comparison, and reject invalid finite answers produced by symbolic cancellation across divergent pieces.",
        requiredMastery: [
          "Rewrite an integral over an infinite interval as the appropriate finite-bound limit before evaluating it",
          "Rewrite an endpoint or interior-singularity integral as the required one-sided limit or sum of one-sided limits",
          "Determine convergence/divergence of canonical power-tail and power-singularity examples from first principles",
          "Use comparison bounds to certify convergence or divergence when exact antiderivatives are inconvenient",
          "Explain why both sides of an interior singularity must converge separately for the ordinary improper integral to exist",
          "Distinguish ordinary improper convergence from cancellation-based principal-value ideas without developing principal-value theory",
          "Diagnose illegal substitution of infinity into an antiderivative or cancellation of divergent terms",
          "Transfer convergence reasoning to an unfamiliar infinite-support or near-singularity model expression",
        ],
        applicationScope:
          "One infinite-horizon or singular accumulation model where finiteness itself is the substantive question; the learner must justify whether the total is mathematically well-defined before interpreting it.",
        transferScope:
          "An unfamiliar tail or singularity whose convergence must be decided using limit/comparison structure rather than a memorized catalogue alone.",
        explicitlyOutOfScope: [
          "Cauchy principal value theory beyond recognizing that it is not ordinary improper convergence",
          "Lebesgue integration",
          "Complex contour integration",
          "Probability distributions and expectations as a dedicated topic — owned later by ARC517",
          "Asymptotic series and Taylor remainder theory — owned later by SIDE267",
          "Numerical treatment of improper integrals",
        ],
        nextArcBoundary:
          "Module 4 / ARC511 begins vector spaces and coordinate arithmetic. Later ARC517 reuses integration for continuous random variables and expectations, ARC513 reuses accumulation ideas for Monte Carlo estimation, SIDE267 owns Taylor approximation/series, and ARC512 owns differential equations; this module supplies the one-dimensional deterministic integration foundation without pre-solving those subjects.",
      },
    },
  };
}
