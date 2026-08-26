export function buildT22RichModule2(syllabusVersion) {
  return {
    moduleId: "SIDE263",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build rigorous deterministic convergence and limit reasoning for indexed approximations: distinguish genuine tail convergence from finite-pattern illusion, control error with epsilon-N logic, derive the elementary algebra of finite limits, and certify or refute convergence with inequalities, squeezing and adversarial counterexamples. This module supplies the limit machinery later used by integration, Taylor approximation, asymptotics and time-series reasoning without pre-teaching those later subjects.",
    moduleDestination:
      "The learner can analyze a real-valued sequence or deterministic approximation process from first principles: identify and test a candidate limit, write and use the correct epsilon-N quantifiers, prove representative limits, derive and apply finite-limit algebra with its domain conditions, use order bounds and the squeeze theorem, and construct decisive counterexamples when convergence claims fail.",
    entryPrerequisites: [
      "T22 Module 1 / ARC053, especially the distinction between candidate discovery and universal local control",
      "Algebraic manipulation and elementary inequalities",
      "Functions and function evaluation",
      "Absolute value as an error magnitude",
      "Basic logical quantifiers and proof by contradiction at an elementary level",
    ],
    explicitlyOutOfScope: [
      "Riemann sums, definite integrals and the Fundamental Theorem of Calculus — owned by Module 3 / ARC510",
      "Infinite-series technology and Taylor-series convergence/remainder analysis — owned later by SIDE267",
      "General epsilon-delta topology and a full real-analysis treatment of continuity",
      "Uniform convergence and interchange of limits with infinite sums, derivatives or integrals",
      "Measure-theoretic convergence or modes of convergence for random variables",
      "Law of Large Numbers, Central Limit Theorem and concentration inequalities — owned later by ARC712",
      "Numerical conditioning, floating-point error and algorithmic stability — owned later by ARC585",
      "Cauchy-sequence/completeness theory and proofs that depend on the least-upper-bound axiom",
    ],
    arcs: {
      "T22-M02-A01": {
        focus: "Tail behaviour: convergence, divergence and oscillation without being fooled by a finite prefix.",
        roleRelevance:
          "Quantitative research constantly asks whether an iterative estimate, approximation, diagnostic or long-run quantity is stabilizing. This arc trains the first defense against visual or finite-sample convergence stories.",
        purpose:
          "Build a precise qualitative model of sequence behaviour before introducing the formal epsilon-N proof language.",
        principalObstacle:
          "A long finite prefix can look stable, trending or periodic while saying nothing decisive about the infinite tail; moreover, 'diverges' includes qualitatively different failures such as escape to infinity and bounded oscillation.",
        entryPrerequisites: [
          "T22 Module 1",
          "Functions and algebra",
          "Index notation",
          "Absolute value / distance on the real line",
        ],
        target:
          "Given an unfamiliar real-valued sequence or deterministic approximation process, independently classify the plausible tail behaviour, identify a candidate finite limit when one exists, and produce logically relevant evidence for or against convergence without mistaking finite computation for proof.",
        requiredMastery: [
          "Interpret a sequence as an indexed function and distinguish individual terms, a finite prefix and the eventual tail",
          "Distinguish convergence to a finite real limit from divergence to +infinity or -infinity",
          "Distinguish unbounded divergence from bounded non-convergence / oscillation",
          "Use eventual behaviour ('for all sufficiently large n') rather than demanding every early term look close to the limit",
          "Generate a plausible candidate limit from algebra, computation or structure while explicitly separating candidate discovery from proof",
          "Use two subsequences with incompatible limiting behaviour as a decisive way to refute convergence in an elementary case",
          "Construct or diagnose a deceptive sequence whose first many terms suggest the wrong long-run conclusion",
          "Transfer the classification logic to an iterative estimate, approximation or model output rather than a textbook-only formula",
        ],
        applicationScope:
          "One deterministic research-style sequence such as an iterative estimate, discretization output, rolling deterministic approximation or parameterized numerical quantity; the task must require interpreting stabilization rather than merely computing terms.",
        transferScope:
          "A sequence with a different surface form where finite plots/tables are intentionally suggestive but the tail structure must decide the claim.",
        explicitlyOutOfScope: [
          "Formal epsilon-N convergence proofs — owned by A02",
          "General algebraic limit laws — owned by A03",
          "Squeeze/comparison proofs and systematic failure-case synthesis — owned by A04",
          "Infinite series",
          "Stochastic convergence or empirical asymptotics",
        ],
        nextArcBoundary:
          "A02 turns the tail intuition into the exact epsilon-N contract and makes tolerance guarantees provable rather than visual.",
      },
      "T22-M02-A02": {
        focus: "The epsilon-N definition as a user-controlled error guarantee with the correct quantifier order.",
        roleRelevance:
          "The epsilon-N pattern is a prototype for quantitative error guarantees: the analyst chooses a tolerance, then proves a finite threshold after which every admissible later output satisfies it.",
        purpose:
          "Convert 'the terms get arbitrarily close' into a rigorous tolerance-versus-index statement and learn to construct proofs by solving for a sufficient threshold N.",
        principalObstacle:
          "The logic is easy to reverse: N may depend on the requested epsilon, but epsilon may not be chosen after seeing n; and the claim must hold for every n beyond the threshold, not merely for a convenient subsequence.",
        entryPrerequisites: [
          "T22-M02-A01",
          "Absolute-value inequalities",
          "Elementary algebra",
          "Ceiling / integer-threshold reasoning",
          "Basic quantifier language",
        ],
        target:
          "State, parse and use the epsilon-N definition of convergence with the correct quantifier order, then independently construct rigorous proofs for representative elementary sequences from explicit error bounds.",
        requiredMastery: [
          "State the finite-limit definition in the form: for every epsilon > 0 there exists N such that for every n >= N, |a_n - L| < epsilon",
          "Explain in plain language what each quantifier controls and why swapping the quantifier order changes the claim",
          "Given an explicit error expression, solve for a sufficient N as a function of epsilon and convert the bound into a valid integer threshold",
          "Prove canonical examples such as 1/n^p -> 0 for a fixed positive p without appealing to a memorized limit law",
          "Handle harmless early exceptions by choosing a larger threshold rather than trying to control every term",
          "Recognize that N need only be sufficient, not minimal",
          "Prove uniqueness of a finite limit, or reconstruct the key contradiction that two distinct limits cannot both satisfy the epsilon-N definition",
          "Diagnose a bogus proof whose N secretly depends on n, whose epsilon is fixed instead of arbitrary, or which only checks selected indices",
          "Translate a practical tolerance requirement into a guaranteed iteration/index threshold",
        ],
        applicationScope:
          "One explicit approximation-error guarantee in which the learner must answer a question of the form 'how large must n be to guarantee error below the requested tolerance?'.",
        transferScope:
          "A new sequence with a different error formula requiring the learner to build N(epsilon) from inequalities rather than copy a standard proof.",
        explicitlyOutOfScope: [
          "General epsilon-delta limits of functions",
          "Uniform convergence",
          "Cauchy/completeness theory",
          "Algebraic limit laws as black boxes",
          "Asymptotic probability theorems",
        ],
        nextArcBoundary:
          "A03 uses this definition to justify the reusable algebra of finite limits instead of asking for a fresh epsilon-N proof from scratch every time.",
      },
      "T22-M02-A03": {
        focus: "Deriving the algebra of finite limits from error control, including the conditions that make products, reciprocals and quotients safe.",
        roleRelevance:
          "Research models rarely converge one scalar at a time: estimators and numerical expressions are assembled by addition, scaling, multiplication and ratios. Valid limit propagation is therefore basic mathematical plumbing for later quantitative work.",
        purpose:
          "Build the elementary finite-limit laws as consequences of epsilon-N control and learn the hidden boundedness / nonzero-denominator facts that make the nonlinear laws valid.",
        principalObstacle:
          "For sums, products and ratios, several approximation errors interact at once; a valid proof must coordinate thresholds and cannot silently divide by a sequence that may approach or hit zero.",
        entryPrerequisites: [
          "T22-M02-A02",
          "Algebraic expansion and factorization",
          "Triangle inequality",
          "Nonzero denominator logic",
        ],
        target:
          "Derive and correctly apply the standard algebraic laws for finite sequence limits, with explicit attention to boundedness of convergent sequences and denominator conditions rather than treating the rules as unconditional symbol manipulation.",
        requiredMastery: [
          "Derive the sum/difference rule by splitting an error budget between two convergent sequences",
          "Derive constant-multiple and finite linear-combination limits",
          "Show or use the fact that a convergent real sequence is eventually bounded",
          "Derive the product rule by decomposing product error into controlled pieces",
          "Show that if b_n -> B with B != 0, then b_n is bounded away from zero eventually",
          "Use that fact to justify reciprocal and quotient limit laws rather than merely quoting a denominator-not-zero slogan",
          "Apply the laws to polynomial and rational expressions in convergent sequences while checking every domain condition",
          "Coordinate multiple epsilon-N thresholds by taking a sufficiently large common N",
          "Diagnose circular or illegal limit algebra, especially quotient reasoning when the limiting denominator is zero",
          "Transfer the proof structure to a composite deterministic research expression with several convergent inputs",
        ],
        applicationScope:
          "One multi-component deterministic expression such as a ratio, normalized estimate or transformed approximation where several convergent ingredients must be combined and the denominator condition has operational meaning.",
        transferScope:
          "A structurally different expression requiring the learner to decide which limit laws are actually justified and to repair any missing boundedness/domain argument.",
        explicitlyOutOfScope: [
          "General continuity theory or arbitrary function-composition limit theorems",
          "Infinite sums / series and interchange of limits",
          "Riemann integration",
          "Taylor series",
          "Random-variable convergence",
        ],
        nextArcBoundary:
          "A04 handles convergence that is easier to certify through inequalities and bounds, and it turns common false limit intuitions into explicit counterexamples.",
      },
      "T22-M02-A04": {
        focus: "Order bounds, squeezing and adversarial failure cases: proving convergence indirectly and knowing exactly when the machinery does not apply.",
        roleRelevance:
          "Many useful quantitative guarantees come from bounding an inaccessible error between tractable envelopes. Equally important, robust research requires recognizing bounded-but-nonconvergent, denominator, oscillation and finite-evidence failure modes.",
        purpose:
          "Finish the module with inequality-based convergence tools and a deliberate counterexample discipline strong enough to prevent later misuse of limit arguments.",
        principalObstacle:
          "Bounds are informative only when they actually tighten in the right way: boundedness alone does not imply convergence, one-sided control is usually insufficient, and symbolic intuition can fail when hypotheses such as finite limits or nonzero denominators are absent.",
        entryPrerequisites: [
          "T22-M02-A01 through A03",
          "Order inequalities",
          "Absolute value",
          "Elementary proof by comparison / contradiction",
        ],
        target:
          "Prove representative limits by comparison and squeezing, use subsequences or explicit counterexamples to destroy invalid convergence claims, and state the exact hypotheses under which the module's tools are safe.",
        requiredMastery: [
          "Use two convergent bounding sequences with a common limit to prove a squeezed sequence has that limit",
          "Recast an absolute-error bound |a_n - L| <= e_n with e_n -> 0 as a direct convergence certificate",
          "Use elementary comparison to show a term or error is forced to zero",
          "Explain with a counterexample why boundedness alone does not imply convergence",
          "Explain with a counterexample why a long apparently stable finite prefix does not prove convergence",
          "Use incompatible subsequential behaviour to refute a proposed limit",
          "Recognize when quotient-limit reasoning fails because the limiting denominator is zero or no eventual lower bound exists",
          "Distinguish finite-limit laws from informal arithmetic involving infinity or indeterminate forms",
          "Construct a failure case for an overgeneralized theorem rather than only spotting a supplied example",
          "Use a quantitative envelope to certify convergence of an unfamiliar deterministic approximation",
        ],
        applicationScope:
          "One research-style approximation whose exact form is awkward but whose error can be bounded above by a simpler vanishing quantity, plus one adversarial claim that must be rejected with a concrete counterexample.",
        transferScope:
          "An unfamiliar setting in which the learner must decide whether to use squeeze/comparison, subsequences, or a counterexample; the correct method should not be signposted by the surface wording.",
        explicitlyOutOfScope: [
          "Proof of the monotone convergence theorem from completeness / least-upper-bound properties",
          "Uniform convergence",
          "Interchange of limits with infinite sums, derivatives, expectations or integrals",
          "Riemann sums and integration",
          "Taylor-series convergence tests",
          "Stochastic modes of convergence, LLN, CLT or concentration",
        ],
        nextArcBoundary:
          "Module 3 / ARC510 owns accumulation and Riemann-sum limits. Later SIDE267 owns Taylor approximation/series, ARC712 owns LLN/CLT/concentration, and ARC542 reuses convergence discipline in time-indexed modelling; this module supplies their deterministic limit foundation without pre-solving them.",
      },
    },
  };
}
