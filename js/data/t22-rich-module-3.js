export function buildT22RichModule3(syllabusVersion) {
  return {
    moduleId: "ARC510",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build integration as rigorous accumulation rather than an antiderivative recipe: construct totals from finite local contributions, pass to partition-independent Riemann-sum limits, derive the algebra and order structure of the definite integral, connect accumulation back to local rates through the Fundamental Theorem of Calculus, and derive the substitution and integration-by-parts transformations needed later in differential equations, probability, statistics and quantitative modelling. Finish by extending the same limit discipline to improper integrals without pre-teaching measure theory or later stochastic applications.",
    moduleDestination:
      "The learner can model a continuum total from local rates or densities, define and reason with a definite Riemann integral, use its algebra/order structure safely, derive and apply both directions of the Fundamental Theorem under explicit hypotheses, transform one-dimensional integrals by substitution and integration by parts from derivative structure rather than mnemonics, and determine convergence or divergence of representative improper integrals with explicit limiting arguments.",
    entryPrerequisites: [
      "T22 Module 1 / ARC053: derivative as local rate/local linearity, power/product/quotient rules and the one-variable chain rule",
      "T22 Module 2 / SIDE263: sequence convergence, epsilon-N logic, finite-limit algebra, squeezing and counterexample discipline",
      "Algebraic manipulation, inequalities and interval notation",
      "Finite sums and basic sigma notation, or willingness to acquire the notation inside A01",
      "Units/dimensional reasoning for rate-times-width accumulation",
    ],
    explicitlyOutOfScope: [
      "Lebesgue integration, measure theory, almost-everywhere arguments and general measurable-function machinery",
      "A full real-analysis course on continuity, compactness, uniform continuity or Riemann-integrability criteria; only the minimum local continuity hypotheses needed for the active FTC arguments belong here",
      "Multivariable integration, Jacobian-determinant change of variables and surface/volume integrals",
      "Probability distributions, densities, expectations and likelihood integrals as a subject — owned later by ARC517 and statistical modules",
      "Differential-equation modelling and solution families beyond tiny integration-based illustrations — owned later by ARC512",
      "Systematic numerical quadrature, floating-point error and numerical-stability analysis — numerical-computing responsibility lies later in ARC515/ARC585",
      "Taylor series, asymptotic expansions and integral remainder theory — owned later by SIDE267",
      "Differentiation under the integral sign, parameterized integral theorems and advanced special-function integration",
      "A catalogue of integration tricks or contest-style symbolic integration",
    ],
    arcs: {
      "T22-M03-A01": {
        focus: "Accumulation from finite local contributions: partition a domain, multiply local intensity by width, and sum signed contributions before taking any limit.",
        roleRelevance:
          "Quantitative models repeatedly turn local rates, densities, exposures or costs into totals. The finite-sum model is the discrete skeleton behind later integration, expectation, numerical aggregation and continuous-time reasoning.",
        purpose:
          "Construct accumulation as a modelling operation from finite pieces and make the rate-times-width logic, units, sign and partition dependence explicit before the definite integral is introduced.",
        principalObstacle:
          "A total over a varying quantity cannot be recovered by blindly multiplying one representative value by total width; the learner must encode heterogeneous local contributions in a partitioned sum and distinguish modelling error from mere arithmetic.",
        entryPrerequisites: [
          "T22 Module 1 local-rate interpretation",
          "Finite arithmetic sums",
          "Functions and interval notation",
          "Basic units/dimensional reasoning",
        ],
        target:
          "Given an unfamiliar varying rate or density over a finite interval, independently construct a defensible finite accumulation sum, explain every factor and unit, compare alternative partitions/sample choices, and diagnose when a proposed sum cannot represent the intended total.",
        requiredMastery: [
          "Partition a finite interval into subintervals and express each width explicitly",
          "Construct a sum of local contribution = representative intensity times subinterval width, including nonuniform widths",
          "Use sigma notation without losing the underlying modelling meaning",
          "Track physical or model units so that rate-times-width has the units of an accumulated quantity",
          "Handle signed contributions and explain cancellation rather than silently converting everything to geometric area",
          "Compare coarse and refined sums and explain why different sample choices can disagree at finite resolution",
          "Recover exact accumulation for a constant intensity and identify special cases where a finite partition already gives the exact total",
          "Diagnose common invalid constructions such as omitting the width factor, averaging unweighted samples on unequal intervals, or multiplying one arbitrary sample by total width",
          "Transfer the same finite-accumulation architecture to a different surface such as flow, cost, exposure or mass density",
        ],
        applicationScope:
          "One concrete finite-resolution accumulation problem with genuinely varying local intensity and interpretable units; nonuniform intervals or signed contributions should appear when useful.",
        transferScope:
          "A changed modelling surface in which the learner must discover the partitioned rate-times-width structure rather than being told to 'use a Riemann sum'.",
        explicitlyOutOfScope: [
          "Taking a partition-refinement limit or defining the definite integral — owned by A02",
          "General convergence proofs beyond recalling Module 2 tools",
          "FTC or antiderivatives",
          "Named quadrature rules such as trapezoidal/Simpson methods as an algorithmic topic",
          "Probability expectation notation",
        ],
        nextArcBoundary:
          "A02 asks when these partition sums approach one partition-independent value as the mesh shrinks and defines that value as the definite integral.",
      },
      "T22-M03-A02": {
        focus: "Riemann sums and the definite integral as a partition-independent refinement limit.",
        roleRelevance:
          "Research claims about continuum totals require knowing when discretized sums represent a stable mathematical quantity rather than an artifact of grid placement or sampling convention.",
        purpose:
          "Turn the finite accumulation model into a rigorous limiting object and distinguish genuine integrability from merely obtaining a plausible answer along one convenient sequence of partitions.",
        principalObstacle:
          "Refining one favorite grid is not enough: a definite integral must represent a common limiting total under admissible fine partitions/sample choices, so the learner must control both convergence and partition dependence.",
        entryPrerequisites: [
          "T22-M03-A01",
          "T22 Module 2 convergence, epsilon-N logic and squeezing",
          "Finite sums and inequalities",
          "Maximum subinterval width / mesh as a refinement measure, introduced here if needed",
        ],
        target:
          "Construct tagged Riemann sums, state an operational partition-refinement definition of the definite integral, prove representative integrals from the sum structure or bounds, and refute false integrability claims when fine partitions can support incompatible totals.",
        requiredMastery: [
          "Represent a partition, tags/sample points and the associated sum Σ f(t_i) Δx_i",
          "Explain why number of subintervals alone is not a sufficient refinement criterion when widths can be uneven; use mesh size or an equivalent control",
          "State the definite Riemann integral as a common limit under sufficiently fine admissible partitions/tags rather than one privileged grid",
          "Separate candidate discovery from proof of partition-independent convergence",
          "Prove at least one representative integral directly from finite sums or a squeeze/error bound rather than invoking FTC, which has not yet been established",
          "Show why changing finitely many point values does not automatically change a Riemann integral in elementary cases when the affected contribution can be bounded",
          "Diagnose a bounded failure case in which tag choice can keep producing incompatible sums, given any needed density/oscillation facts in the mission",
          "Distinguish signed integral from geometric area and from an arbitrary infinite series",
          "Translate a finite discretization error statement into evidence about the limiting continuum total without claiming more than the bound proves",
        ],
        applicationScope:
          "One continuum-total model whose exact quantity is approached through finer discretizations, with an explicit question about whether the observed stabilization is mathematically defensible.",
        transferScope:
          "An unfamiliar bounded function or local-intensity model where the learner must decide whether partition refinement is enough to force one total or whether sample dependence destroys the claim.",
        explicitlyOutOfScope: [
          "General necessary-and-sufficient Riemann-integrability criteria",
          "Lebesgue integration / measure-zero reasoning",
          "Improper integrals — owned by A08",
          "FTC and antiderivative evaluation — owned by A04-A05",
          "Systematic numerical quadrature/error-order analysis",
        ],
        nextArcBoundary:
          "A03 treats the definite integral as an established operator and derives the algebraic, interval and order structure needed for reliable manipulation.",
      },
      "T22-M03-A03": {
        focus: "Algebra, interval orientation, order bounds and cancellation structure of the definite integral.",
        roleRelevance:
          "Quantitative work combines, normalizes and bounds accumulated quantities constantly; valid manipulation requires knowing which identities follow from the sum-limit structure and where sign or cancellation can invalidate intuition.",
        purpose:
          "Derive the reusable structural laws of definite integration from Riemann sums/limits and build disciplined reasoning about signed totals, interval decomposition and bounds.",
        principalObstacle:
          "The integral behaves linearly but not like a generic magnitude: interval orientation, sign changes and cancellation matter, and several tempting operations such as moving absolute values through the integral are inequalities rather than identities.",
        entryPrerequisites: [
          "T22-M03-A01-A02",
          "T22 Module 2 finite-limit algebra and inequalities",
          "Basic interval/order reasoning",
        ],
        target:
          "Derive and correctly use the core algebraic, interval and order properties of the definite integral, including cancellation and quantitative bounds, without appealing to antiderivatives.",
        requiredMastery: [
          "Derive linearity for finite linear combinations from the corresponding finite-sum identities and limit laws",
          "Derive additivity across adjacent intervals and use it to decompose or recombine accumulated quantities",
          "Handle reversed limits and zero-width intervals with the correct sign conventions",
          "Use positivity/comparison: f <= g on an interval implies the corresponding integral inequality under the active integrability assumptions",
          "Derive or justify bounds of the form m(b-a) <= ∫ f <= M(b-a) when m <= f <= M",
          "Define and interpret the average value (1/(b-a))∫ f for b>a as an accumulated total normalized by interval width",
          "Distinguish ∫|f| from |∫f| and justify the inequality |∫f| <= ∫|f| in the elementary integrable setting",
          "Construct or diagnose a cancellation example where a small signed integral coexists with large positive and negative local contributions",
          "Transfer the operator laws to a composite accumulation model with several components and a nontrivial interval split",
        ],
        applicationScope:
          "One model requiring decomposition, normalization or bounding of a signed accumulated quantity rather than merely evaluating an integral symbolically.",
        transferScope:
          "A different context in which the learner must choose valid integral identities/inequalities and reject a tempting but false algebraic manipulation.",
        explicitlyOutOfScope: [
          "FTC or derivative of an accumulation function — owned by A04",
          "Antiderivative evaluation — owned by A05",
          "Probability expectation as a formal random-variable operator",
          "Normed-space/Lp theory",
          "Multidimensional integration",
        ],
        nextArcBoundary:
          "A04 turns the upper endpoint into a variable and explains why the derivative of accumulated total recovers the local integrand under the necessary local continuity hypothesis.",
      },
      "T22-M03-A04": {
        focus: "Accumulation functions and FTC Part I: recovering a local rate from the derivative of accumulated total.",
        roleRelevance:
          "The rate-versus-cumulative relationship appears throughout time series, hazards/intensities, inventory/flow models and continuous-time reasoning; the theorem is a structural bridge between local and aggregate descriptions.",
        purpose:
          "Derive why F(x)=∫_a^x f(t)dt has derivative f(x) at points where f is continuous, using the difference quotient as an average over a shrinking interval rather than memorizing 'derivative cancels integral'.",
        principalObstacle:
          "The difference quotient of an accumulation function is a local average of f, not automatically f(x); the learner must identify the exact local continuity condition that forces the shrinking average to approach the point value and see how the conclusion can fail at discontinuities.",
        entryPrerequisites: [
          "T22-M03-A02-A03",
          "T22 Module 1 derivative/difference quotient and chain rule",
          "T22 Module 2 limit and squeeze reasoning",
          "Pointwise continuity at the active point, introduced here in the minimum epsilon-neighborhood form needed for the proof",
        ],
        target:
          "Derive FTC Part I at a point of continuity from the accumulation difference quotient, use it to differentiate basic variable-endpoint accumulation functions, and diagnose failures when the continuity or endpoint logic is absent.",
        requiredMastery: [
          "Construct F(x+h)-F(x) as the integral over the short interval from x to x+h, including the sign when h<0",
          "Rewrite the difference quotient as an average value of f over that short interval",
          "Use pointwise continuity or an explicit local bound to squeeze that average toward f(x)",
          "State FTC Part I with a hypothesis strong enough for the conclusion being claimed rather than as a syntax-cancellation rule",
          "Use the theorem to recover a local rate from a cumulative function and interpret the units correctly",
          "Combine FTC Part I with the one-variable chain rule for a variable upper endpoint when the composition hypotheses are satisfied",
          "Handle a variable lower endpoint by orientation/difference of accumulation functions in an elementary case",
          "Construct or diagnose a jump-style example where the accumulation function is still meaningful but the claimed derivative at the discontinuity is not justified",
          "Distinguish endpoint differentiation from the much more advanced problem of differentiating an integral whose integrand itself depends on the parameter",
        ],
        applicationScope:
          "One cumulative-flow/exposure/cost model where the learner must recover the instantaneous local quantity from accumulated history, plus one variable-endpoint derivative calculation.",
        transferScope:
          "A changed surface where the learner must recognize the 'short-interval average -> local value' mechanism and explicitly check continuity rather than applying a cancellation mnemonic.",
        explicitlyOutOfScope: [
          "A full general theory of continuity or compactness",
          "Differentiation under the integral sign / general Leibniz integral rule",
          "Improper variable-endpoint integrals",
          "Multivariable gradients/Jacobians",
          "Probability CDF/PDF theory as a subject",
        ],
        nextArcBoundary:
          "A05 runs the bridge in the computational direction: when a known antiderivative exists, definite accumulation becomes endpoint net change via FTC Part II.",
      },
      "T22-M03-A05": {
        focus: "Antiderivatives, net change and FTC Part II as the evaluation bridge from local derivative information to definite accumulation.",
        roleRelevance:
          "Later differential equations, continuous distributions and model transformations require moving reliably between local rate laws and accumulated changes; endpoint evaluation is useful only when its theorem hypotheses and constant-of-integration logic are understood.",
        purpose:
          "Connect antiderivatives to definite integrals and derive the endpoint-difference evaluation rule as a consequence of the local/accumulation bridge rather than treating ∫ f dx = F as a notation trick.",
        principalObstacle:
          "An antiderivative is not the same object as a definite integral: antiderivatives form a constant-shift family, while the definite integral is a number/net change determined by bounds; the bridge between them needs a theorem and hypotheses.",
        entryPrerequisites: [
          "T22-M03-A01-A04",
          "T22 Module 1 differentiation rules",
          "A scoped mean-value consequence such as 'if H'=0 throughout an interval then H is constant', with its interval hypotheses made explicit; the mission may establish or supply this supporting lemma without expanding into a full mean-value-theorem unit",
        ],
        target:
          "Explain and use FTC Part II to evaluate definite integrals from antiderivatives, reconstruct net-change reasoning, and keep definite/indefinite notation and constants logically distinct.",
        requiredMastery: [
          "Define an antiderivative and explain why any two antiderivatives on an interval differ by a constant under the stated derivative-zero lemma",
          "Derive FTC Part II from the accumulation function plus the derivative-zero/constant consequence rather than merely quote endpoint brackets",
          "Evaluate definite integrals using any valid antiderivative and show explicitly why its additive constant cancels",
          "Interpret ∫_a^b r(t)dt as net change of a quantity whose derivative is r, including negative-rate intervals",
          "Distinguish a definite integral, an antiderivative family and the informal indefinite-integral notation",
          "Check an answer by differentiating the proposed antiderivative and, where useful, by sign/size bounds from A03",
          "Diagnose an invalid endpoint evaluation when the proposed antiderivative is wrong, undefined on part of the interval or relies on an unstated hypothesis",
          "Use power/product/chain-derived antiderivative knowledge without assuming a large catalogue of special-function formulas",
          "Transfer between a local rate law and total change in an unfamiliar model",
        ],
        applicationScope:
          "One net-change problem in which the sign of the rate matters and one exact definite-integral evaluation whose antiderivative can be verified from already available derivative structure or derivative facts supplied in the task.",
        transferScope:
          "A different model where the learner must decide whether endpoint evaluation is justified, identify a valid antiderivative or reject a tempting candidate, and interpret the resulting net change.",
        explicitlyOutOfScope: [
          "A full proof/development of Rolle's theorem, the Mean Value Theorem and compactness machinery",
          "A large table of exponential, logarithmic, trigonometric or special-function antiderivatives",
          "Substitution — owned by A06",
          "Integration by parts — owned by A07",
          "Improper integrals — owned by A08",
        ],
        nextArcBoundary:
          "A06 derives one-dimensional substitution from the chain rule plus FTC, so nested derivative structure can be converted into a simpler integration variable without a mnemonic-only 'du' manipulation.",
      },
      "T22-M03-A06": {
        focus: "One-dimensional substitution/change of variables as the integral counterpart of the chain rule.",
        roleRelevance:
          "Variable transformations recur in probability, likelihood work, simulation and model reparameterization. The important habit is tracking the transformation, derivative factor, bounds and domain rather than performing symbolic substitution by pattern.",
        purpose:
          "Derive substitution from chain-rule structure and FTC, then use it to simplify integrals while preserving bounds, orientation and admissibility.",
        principalObstacle:
          "A change of variable changes both the integrand and the differential scale; treating 'du' as a free symbol or changing expressions without transformed bounds/domain checks can silently change the quantity being integrated.",
        entryPrerequisites: [
          "T22-M03-A05",
          "T22 Module 1 one-variable chain rule",
          "Algebraic function composition and domain reasoning",
        ],
        target:
          "Recognize and derive the one-dimensional substitution pattern from a composition derivative, carry it out in definite and antiderivative settings with correct transformed bounds, and diagnose missing derivative/domain factors.",
        requiredMastery: [
          "Start from the chain rule for F(g(x)) and derive the corresponding integral identity rather than quote a 'u-sub' mnemonic",
          "Identify the inner transformation and the derivative scale factor in an unfamiliar integrand",
          "Transform definite bounds consistently instead of mixing x-bounds with a u-integrand",
          "Handle orientation/sign correctly when transformed endpoints reverse",
          "Verify the result by differentiating in the indefinite setting or by converting back to the original variable",
          "Recognize when a proposed substitution does not actually remove the difficult dependence or is missing the needed derivative factor",
          "State relevant domain restrictions, especially where inverses/ratios/roots used in the manipulation are not globally valid",
          "Distinguish ordinary one-dimensional substitution from probability-density transformation formulas that require additional one-to-one/multiple-branch and absolute-Jacobian reasoning",
          "Transfer the chain-rule/change-of-variable structure to a differently expressed model integral",
        ],
        applicationScope:
          "One one-dimensional transformed accumulation problem with nontrivial bounds or domain considerations; polynomial/rational compositions are sufficient, while any special-function derivative facts should be supplied rather than silently assumed.",
        transferScope:
          "An unfamiliar integral where the decisive task is recognizing the hidden composition and scale correction, including at least one plausible but invalid substitution to diagnose.",
        explicitlyOutOfScope: [
          "Multivariable change of variables and Jacobian determinants",
          "Random-variable density transformation as a full probability topic",
          "Trigonometric-substitution catalogues",
          "Advanced special-function substitutions",
          "Integration by parts",
        ],
        nextArcBoundary:
          "A07 derives integration by parts from the product rule and FTC for integrands whose difficulty comes from a product rather than a nested change of variable.",
      },
      "T22-M03-A07": {
        focus: "Integration by parts as the accumulated product rule, with deliberate decomposition and boundary-term control.",
        roleRelevance:
          "The same identity later appears in expectation manipulations, weak formulations, transforms and analytic derivations. What matters for research is structural recognition and boundary accounting, not a table of integration tricks.",
        purpose:
          "Derive integration by parts from the derivative product rule and FTC, then learn when transferring a derivative from one factor to another actually simplifies the problem.",
        principalObstacle:
          "The formula is easy to memorize and misuse: a useful decomposition must trade one derivative/antiderivative burden for an easier one, and definite integrals require boundary terms that cannot be dropped casually.",
        entryPrerequisites: [
          "T22-M03-A05",
          "T22 Module 1 product rule",
          "Verified antiderivative pairs available from prior work or supplied explicitly in the mission",
        ],
        target:
          "Derive and apply integration by parts in definite and antiderivative form, choose and justify a productive factor split, preserve boundary terms, and recognize when the method merely cycles or makes the integral worse.",
        requiredMastery: [
          "Derive ∫ u dv = uv - ∫ v du from the product rule and FTC rather than quoting it as an isolated identity",
          "Translate a product integrand into a defensible choice of differentiated and integrated factors",
          "Carry definite boundary terms with correct evaluation at both endpoints",
          "Verify an indefinite result by differentiation",
          "Use repeated integration by parts when each repetition has a clear decreasing-complexity invariant rather than by rote",
          "Recognize and diagnose a cyclic or non-improving decomposition",
          "Solve a structural problem using abstract or supplied derivative/antiderivative pairs without depending on an untaught special-function catalogue",
          "Use sign/scale bounds from A03 as a sanity check when the result permits one",
          "Transfer the product-rule reversal to an unfamiliar analytic or modelling expression",
        ],
        applicationScope:
          "One definite or symbolic product integral where the method has a clear structural advantage and boundary terms matter; special-function derivative facts may be provided as data rather than assumed as prior mastery.",
        transferScope:
          "A different product structure in which the learner must decide whether integration by parts, substitution, or neither is the appropriate transformation and defend that choice.",
        explicitlyOutOfScope: [
          "Tabular/contest integration as a memorized procedure",
          "Fourier/Laplace transform theory",
          "Stochastic integration",
          "Multidimensional divergence/Green identities",
          "A broad special-function antiderivative catalogue",
        ],
        nextArcBoundary:
          "A08 extends definite integration beyond finite bounded settings by treating infinite intervals and singular endpoints as explicit limits whose convergence must be proved.",
      },
      "T22-M03-A08": {
        focus: "Improper integrals as limits of proper integrals, with convergence/divergence and failure-case discipline.",
        roleRelevance:
          "Infinite-domain and singular-tail integrals appear later in continuous distributions, normalization constants, tail models and analytic approximations. Quantitative work needs the reflex to check existence before manipulating such expressions.",
        purpose:
          "Extend the definite integral to infinite intervals and endpoint/interior singularities by explicit limiting definitions, reusing Module 2 convergence tools rather than pretending infinity is an ordinary bound.",
        principalObstacle:
          "An improper integral is not automatically a number: each problematic endpoint creates a separate limiting claim, cancellation between divergent pieces is not ordinary convergence, and antiderivative notation can conceal divergence.",
        entryPrerequisites: [
          "T22-M03-A02-A07",
          "T22 Module 2 convergence, comparison/squeezing and divergence counterexamples",
          "Power-rule/quotient-derived algebra sufficient for p-type examples",
        ],
        target:
          "Rewrite representative improper integrals as explicit limits of proper integrals, determine convergence or divergence with justified comparison or exact evaluation, and reject invalid manipulations of infinity or singularities.",
        requiredMastery: [
          "Convert an infinite upper/lower endpoint into a one-sided limit of finite-bound integrals",
          "Split an interval at an interior singularity and require each resulting one-sided improper integral to converge separately",
          "Evaluate representative p-type tail and endpoint integrals and derive their threshold behaviour rather than memorize only the final rule",
          "Use comparison bounds to certify convergence or divergence when exact antiderivatives are inconvenient",
          "Distinguish ordinary improper convergence from cancellation-based principal-value ideas and refuse to conflate them",
          "Diagnose illegal arithmetic such as substituting infinity into an antiderivative as though infinity were a real endpoint",
          "Check whether a proposed probability-style normalization integral is finite without developing probability theory itself",
          "Construct or analyze a function whose finite truncations look stable for a while but whose improper integral ultimately diverges",
          "Transfer the convergence audit to a different infinite-domain or singular accumulation problem",
        ],
        applicationScope:
          "One tail/singularity problem with a quantitative existence question such as whether a proposed continuous weight, exposure or normalization has finite total mass, plus one comparison-based case.",
        transferScope:
          "An unfamiliar improper integral where the learner must first identify every problematic endpoint, choose exact evaluation or comparison, and separate true convergence from misleading cancellation.",
        explicitlyOutOfScope: [
          "Cauchy principal value as a developed theory",
          "Lebesgue integrability and absolute/conditional convergence in full generality",
          "Gamma/Beta functions and special-function theory",
          "Probability-distribution theory beyond a bare normalization-motivation example",
          "Asymptotic-series methods",
        ],
        nextArcBoundary:
          "Module 4 / ARC511 moves to vectors and coordinate arithmetic. Later ARC512 reuses FTC/substitution in differential equations, ARC517 reuses finite/improper integration for continuous distributions and expectations, and later multivariable/statistical modules deepen change-of-variable and analytic applications without being pre-solved here.",
      },
    },
  };
}
