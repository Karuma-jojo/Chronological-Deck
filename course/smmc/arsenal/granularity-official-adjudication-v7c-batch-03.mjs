// Gate 3 v7C: original-source-bound, individually reasoned builder decisions.
// Batch 03 of 3. Pending independent semantic review; not imported by classifier.
export const ARSENAL_GATE3_V7C_BATCH_03 = Object.freeze([
  {
    "candidateId": "RAW-OFFICIAL-088",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "fixed nonzero vector",
      "rationale": "The fixed nonzero vector is the specific existing input whose basis extension enables counting the remaining linear-map images."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "counts linear maps by freely choosing the images",
      "rationale": "Extending the vector to a basis makes the freely assignable images explicit, producing the linear-map count."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Basis-extension counting for linear maps is a reusable finite-dimensional algebraic technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-090",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "fixed vector",
      "rationale": "An existing fixed vector motivates change-of-basis normalization, but the claim does not state its nonzero status or all conjugation hypotheses."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "normalize the counting problem",
      "rationale": "Conjugation and an invertible basis change carry the fixed vector to standard position, reducing the counting problem."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Change-of-basis conjugation to a standard vector is general linear algebra."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-093",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "alternating signs",
      "rationale": "Alternating signs provide the sign-change criterion for IVT and hence for interlacing-root existence."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "proves simple interlacing roots",
      "rationale": "A recurrence together with alternating signs and IVT proves simple interlacing roots, an explicit root-location conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Root interlacing by sign changes and IVT is a source-independent analytic argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-097",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "alternating multivariate polynomial",
      "rationale": "The determinant is represented as an alternating polynomial, supplying the input structure for Vandermonde divisibility."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "identify the Vandermonde factor structure",
      "rationale": "Divisibility by every difference and a degree argument identify the Vandermonde factors."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Alternating multivariate-polynomial divisibility and degree comparisons give a Vandermonde factorization method that is meaningful in arbitrary suitable determinants."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-099",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "two factors have gcd one or two",
      "rationale": "The controlled gcd permits a coprime perfect-power argument, but exact multiplicative assumptions are not fully stated."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "are themselves prime-th powers up to the controlled common factor",
      "rationale": "The argument identifies the constituent factors as prime-th powers, modulo a controlled common factor."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Coprime splitting of perfect powers is a reusable number-theoretic technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-100",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "construction of the expression",
      "rationale": "The inductively built expression supplies a recursive structure, but its formation rules are only alluded to."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "piecewise linear with integer gradients of a fixed parity",
      "rationale": "Expression induction proves its one-variable restriction is piecewise linear with parity-constrained integral gradients."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Induction over constructed expressions to derive structural parity is a general proof pattern."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-104",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "positive sequence",
      "rationale": "The given positive sequence allows a zero-limit case split, but hypotheses governing divergence are not fully reported."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "divergence of the partial sums",
      "rationale": "Both branches of the positive-sequence dichotomy yield divergence of its partial sums."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Dichotomy by term-limit behavior in series arguments is source-independent analysis."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-105",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "When the sequence tends to zero",
      "rationale": "The source records the zero-term-limit branch as the setting for the reciprocal comparison, but that limit alone is not sufficient to force divergent partial sums: positive a_n=1/n^2 tends to zero while its series converges. A further problem-specific inequality comparing partial sums with the reciprocal next term must do the work, and its hypotheses are not stated in this candidate-owned claim. Thus the trigger is PARTIAL, while the claim's historical conclusion of unbounded growth remains CLEAR output."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "force unbounded growth",
      "rationale": "Comparison of partial sums with the reciprocal next term establishes unbounded growth."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Reciprocal lower bounds for partial sums are general convergence tools."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-106",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "divisor-indicator vectors",
      "rationale": "The indicator vectors supply the combinatorial objects for alternating subset summation, but the exact divisor sets are unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "each coordinate cancels",
      "rationale": "The alternating subset identity forces each coordinate of the indicator sum to cancel."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Subset-sign inclusion-exclusion cancellation is a general discrete method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-108",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "one tile",
      "rationale": "An existing tile that admits a permitted one-to-four similar-tile replacement supplies some recognizable local construction input. The phrase 'replacing one tile by four similar tiles' describes the solver's operation rather than the trigger itself. The accepted claim does not specify which tiles are eligible or the replacement's geometric feasibility conditions, so the applicability boundary is PARTIAL; the +3 change in tile count remains a definite output."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "increases the tile count by three",
      "rationale": "A legal replacement adds three tiles; combined with residue-class seeds this gives a construction closure argument."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Local replacement closure and residue-class seed constructions are general tiling strategies."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-109",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "initial nonzero coefficient",
      "rationale": "The initial coefficient is explicitly nonzero, allowing division or scaling normalization."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "case a=1",
      "rationale": "Scaling reduces the polynomial-game analysis to the normalized coefficient case a=1."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Scaling a nonzero coefficient to normalize a polynomial is a general algebraic simplification technique and does not depend on the game's particular moves."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-110",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "every permitted ordering of the quadratic",
      "rationale": "The quadratic and its adversarial coefficient ordering are specified, but the exact admissible coefficients are not."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "positive discriminant",
      "rationale": "The selected coefficients give positive discriminant for every permitted ordering, constructing a robust strategy."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Discriminant constraints robust to coefficient choices are general polynomial-strategy reasoning."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-113",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "rational point inside the interval",
      "rationale": "An interior rational target is a clear construction goal, but interval restrictions for radical differences are omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "infinite sequence of radical differences converging to that rational point",
      "rationale": "The construction explicitly produces infinitely many radical differences converging to the chosen rational point."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Rational-density radical approximation is a reusable approximation construction."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-116",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "degree-zero/degree-one structure",
      "rationale": "The graph's low-degree vertices are the reduction opportunity, but the matrix-to-graph correspondence is built during the proof."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "reduces to a 2-regular core",
      "rationale": "Repeated Laplace elimination strips low-degree structure until a 2-regular graph core remains."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Graph-core reduction via determinant expansions is a general matrix/graph method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-117",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "Once the graph core is 2-regular",
      "rationale": "A 2-regular graph core is the explicit condition for cycle decomposition into independent blocks."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "determinant factors by cycle blocks",
      "rationale": "Cycle decomposition and block permutation yield a product factorization of the determinant."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Cycle-block determinant decomposition is a source-independent combinatorial linear-algebra method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-118",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "global union/intersection event",
      "rationale": "The global event supplies the set-theoretic probability question, but the elementwise independence assumptions are partly implicit."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "multiplies the resulting independent probabilities",
      "rationale": "Elementwise membership constraints factor the global event probability into independent products."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Membership-pattern factorization is a general probability/combinatorial method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-121",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "Conditioning on avoiding a finite target set",
      "rationale": "The conditional avoidance event is specified, but the underlying hitting-process law and crossing probabilities are missing."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "lower-bounds the probability of hitting a later integer",
      "rationale": "Summing over the first crossing index provides a lower bound for hitting a later target."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "First-crossing probability bounds under conditional avoidance are general stochastic arguments."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-122",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "cyclic symmetry",
      "rationale": "The symmetry allows rotating a variable to a least position, but the domain and ordering constraints are omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "order chain forcing equality",
      "rationale": "The cyclic reduction converts equalities into an ordering chain that forces all relevant variables equal."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "A cyclic-symmetry reduction by selecting a least variable is a reusable algebraic ordering argument, not a tactic defined only by this contest example."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-123",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "constant term and leading behaviour have opposite signs",
      "rationale": "The opposing signs at zero and at the dominant end of the polynomial supply the positive-root existence condition."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "forcing a positive real root",
      "rationale": "A polynomial with opposite constant/leading signs must cross zero at a positive real argument."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Endpoint-sign polynomial root existence is a general continuity argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-124",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "common circle",
      "rationale": "A common modulus and sign/conjugation pairing constrain the roots, though the full polynomial hypotheses are unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "factors the polynomial by those root orbits",
      "rationale": "Orbit grouping under sign and complex conjugation produces a polynomial factorization."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Factoring roots by algebraic orbit symmetry is general complex polynomial reasoning."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-125",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "interval containing only one multiple available to two domain elements with a nontrivial gcd",
      "rationale": "The collision obstruction requires the joint structural situation: two domain elements have a nontrivial gcd AND the constructed interval contains exactly one multiple available to both. A nontrivial gcd alone does not force a collision. Once that interval has been selected, the whole conjunction provides a recognizable intermediate-stage trigger for the divisibility-collision argument. The interval is a solver-chosen witness for this stage, not a claim that the initial problem already supplied it; the derived collision/injectivity contradiction remains CLEAR output."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "contradicting injectivity on that pair",
      "rationale": "The shared interval multiple forces equal images and contradicts injectivity for the selected pair."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Divisibility-collision obstructions for injective maps are source-independent arithmetic strategies."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-126",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "two sums of consecutive odd jump lengths",
      "rationale": "Balancing sums of odd jump lengths supplies the reduced combinatorial structure, but original geometry and base cases are incomplete."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "preserves the optimal difference",
      "rationale": "The four-jump induction step maintains the optimal balancing difference, an explicit inductive invariant."
    },
    "context": {
      "boundaryDecision": "UNRESOLVED",
      "rationale": "The expression invokes specialized four-jump geometry and a balancing construction, but the available wording does not settle whether its precise move is reusable or tied to the original configuration."
    }
  }
].map(row => Object.freeze(row)));
