// Gate 3 v7C: independently auditable, builder-proposed semantic role judgments for previously deferred official cases.
// Batch 01 is NOT independently accepted and MUST NOT enter the v6 classifier.
export const ARSENAL_GATE3_V7C_BATCH_01 = Object.freeze([
  {
    "candidateId": "RAW-OFFICIAL-001",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "odd cycle",
      "rationale": "An odd cycle supplies the parity-coloring geometry, but the claim does not fully specify the allowable embedding and crossing setting."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "colors complementary regions by winding-number parity",
      "rationale": "The construction assigns winding-number parity colors to complementary regions, a definite resulting coloring."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Winding-number parity coloring is a recognizable topological method independent of this particular odd-cycle contest problem."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-002",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "self-intersections",
      "rationale": "The possible self-intersections identify a degeneracy to repair, but no full criterion for preserving all incidences is given."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "to avoid self-intersections",
      "rationale": "The arbitrarily small line perturbation removes self-intersections while preserving which relevant segments are met."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Small perturbations to avoid degeneracies are a reusable geometric proof operation, not an author-specific route."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-003",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "zero-intersection position",
      "rationale": "A deformation from an initial zero-intersection position supplies the parity-counting setup, but not the complete geometry of the line rotation."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "intersection count changes only by even amounts",
      "rationale": "The line rotation establishes an even-change invariant for intersection counts, an explicit conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Parity of intersections under continuous deformation is mathematically meaningful outside its historical drawing."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-004",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The source states only that the solver starts from the exponential Taylor expansion; it does not say which hypotheses invite this start."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Beginning from the known exponential series names an input identity but does not state a new expansion or an immediate derived result."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Taylor-series expansion names a standard analysis operation without dependence on the underlying competition problem."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-005",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "Convexity Contradiction Tool",
      "rationale": "A convexity-contradiction proof goal is signaled by the candidate name, but no interval or differentiability assumptions are recorded."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "obtain a contradiction",
      "rationale": "Two MVT applications force a nonpositive second derivative and an explicit contradiction in the official claim."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Twice applying MVT toward a derivative contradiction is a source-independent calculus argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-006",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "Riemann-integrable functions agreeing on a dense set",
      "rationale": "The claim expressly supplies the pair of Riemann-integrable functions with dense-set agreement that invites the sum comparison."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "equality of integrals",
      "rationale": "Sampling Riemann sums on the dense agreement set yields equality of the integrals, the named target conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Dense-set Riemann-sum comparison expresses a general integration proof, regardless of where it occurred."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-007",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "orders of a finite general linear group and a subgroup",
      "rationale": "Finite group and subgroup orders are the algebraic objects for Lagrange divisibility, but the particular subgroup/order question is omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "deduce divisibility",
      "rationale": "Applying Lagrange's theorem produces a definite divisibility conclusion from the group orders."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Lagrange divisibility in finite groups is applicable outside the original counting problem."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-008",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "decreasing function",
      "rationale": "Monotonicity supplies a plausible upper-sum comparison, while the partition/finite-expression structure remains underspecified."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "through an upper Riemann sum",
      "rationale": "The claim recognizes the expression as an upper Riemann sum, but does not specify the resulting numerical bound."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Bounding by upper Riemann sums is a general numerical-integration technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-009",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "distinct nodes",
      "rationale": "Distinct nodes in the Vandermonde coefficient matrix are the explicit condition ensuring invertibility."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "conclude invertibility",
      "rationale": "The solution uses distinct Vandermonde nodes to obtain invertibility of the coefficient matrix."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Vandermonde invertibility from distinct nodes is a reusable algebraic argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-010",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "A Newton-polygon alternative is named without describing the polynomial input or the condition for choosing this route."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The claim merely reports the presence of an alternative Newton-polygon route and no resulting mathematical bound or relation."
    },
    "context": {
      "boundaryDecision": "UNRESOLVED",
      "rationale": "The bare phrase Newton-Polygon Alternative gives inadequate information about whether this instance's route is a general method or local alternative."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-011",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The CRT invocation is recorded with no specified coprime moduli, congruence data or recognizable trigger."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "congruence construction",
      "rationale": "A congruence construction is reported, but the specific solution or residue constraints are not identified."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "The Chinese remainder theorem and congruence construction have source-independent number-theoretic meaning."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-012",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "from the recurrence",
      "rationale": "A recurrence is the existing source object for generating-function encoding, though its form and admissible manipulations are not specified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "derives and uses a generating function",
      "rationale": "The claim explicitly says a generating function is derived from the recurrence, so the resulting generating function is identified at this grain."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Passing from a recurrence to a generating function is a reusable encoding operation, not limited to this occurrence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-013",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The target probabilities are the quantities to be related, but the claim gives no structural hypothesis that invites this recurrence."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "derives a recurrence relation",
      "rationale": "A recurrence among the target probabilities is explicitly derived, constituting an identifiable mathematical result."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Recurrence derivation for probabilities denotes a general proof strategy rather than a local lemma."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-015",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Gaussian integers are the domain of factorization, but the specific input algebraic form and trigger for factoring are absent."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "factors in the Gaussian integers",
      "rationale": "The solver actually factors within the Gaussian integers; a factorization is a clear result even when symbolic factors are not transcribed."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Factoring in Gaussian integers is a recognizable number-theoretic operation independent of this official case."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-017",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The recorded partial route invokes 2-adic valuation but does not state what input valuation condition makes the move applicable."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The booklet reports a partial route using a valuation; it does not state a resulting valuation identity or bound."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "2-adic valuation denotes a general arithmetic tool even though the historical route achieved only partial progress."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-019",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The claim names convex-envelope construction but gives no input geometry or condition warranting its use."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Saying the solver uses the convex envelope construction does not state the envelope produced or what property it establishes."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "A convex envelope is a standard construction with meaning independent of the particular contest solution."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-020",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The convex hull is said to be used as a reduction, but the original geometric configuration is unspecified."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "structural reduction",
      "rationale": "A structural convex-hull reduction is attested, although its reduced object and exact conclusion are not identified."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Convex-hull reduction is a reusable geometric transformation rather than a one-problem term."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-021",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "after the Taylor expansion",
      "rationale": "An earlier Taylor expansion is the setting for alternating-series control; no term sign or magnitude hypotheses are stated."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The source only states that alternating-series structure is used, without identifying the resulting remainder or convergence bound."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Alternating-series control after expansion is general analysis terminology."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-022",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The source says a comparison test is applied but does not identify a benchmark series or hypotheses."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Invoking a comparison test in a convergence argument does not state whether convergence, divergence or a bound was obtained."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Comparison tests for series are standard source-independent analytic moves."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-023",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "subseries",
      "rationale": "Isolating a subseries identifies the comparison object but not which positivity or size conditions justify the inference."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "control convergence/divergence",
      "rationale": "The claim explicitly obtains control of convergence or divergence through subseries comparison, a named convergence conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Subseries comparison is an analytic method applicable without knowledge of the historical sequence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-024",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "The IVT invocation is named without a continuity interval or opposite-sign endpoint hypothesis."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Merely invoking the Intermediate Value Theorem does not report the root or intermediate value obtained."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "IVT is a general real-analysis theorem whose mathematical meaning is not tied to one contest occurrence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-025",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "triangle inequality",
      "rationale": "The norm/metric estimate is invited by a triangle-inequality setting, but the input vectors or equality conditions are unrecorded."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "the upper bound and an aligned construction for sharpness",
      "rationale": "The proof supplies an upper bound and a construction achieving sharpness, two explicit outcomes of the argument."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Triangle-inequality bounds and aligned sharpness constructions are source-independent techniques."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-026",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "AM-GM is cited in a lower-bound argument with neither the positive quantities nor their constraints stated."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "lower-bound argument",
      "rationale": "The claim reports using AM-GM to derive a lower bound, but gives no quantity or bound being established."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "AM-GM lower bounds are general inequality methods."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-027",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "eigenvector information",
      "rationale": "Eigenvector data is the existing algebraic structure used for reduction, but the vector/Gram hypotheses are underspecified."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "reduces the structure",
      "rationale": "The official route reduces its structure via eigenvectors without identifying the resulting lower-dimensional or simpler object."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Eigenvector-based linear algebra reduction has general mathematical meaning."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-028",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "A distinct bijective counting solution is reported without specifying the counted sets or suitability conditions."
    },
    "output": {
      "boundaryDecision": "PARTIAL",
      "witness": "bijective counting solution",
      "rationale": "The booklet says a bijective counting route solves the problem but identifies neither the bijection nor the counting formula."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Bijective counting is a general combinatorial technique regardless of the route's provenance."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-030",
    "trigger": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Geometric-series summation is invoked in coordinates without a stated ratio or summability condition."
    },
    "output": {
      "boundaryDecision": "UNRESOLVED",
      "witness": null,
      "rationale": "Naming geometric-series summation as a tool does not establish which expression or value was obtained."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Summing a geometric series is an independent algebraic/analytic operation."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-032",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "boundary values are larger",
      "rationale": "Larger values on the boundary of the disk explicitly justify looking for an interior global minimum."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "force zero gradient",
      "rationale": "The interior minimum exists by the boundary comparison and forces the gradient to vanish, a clear calculus conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Boundary-barrier minimization and zero-gradient reasoning are general calculus methods."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-033",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "assumes disconnection",
      "rationale": "The proof expressly assumes the lattice graph is disconnected and selects minimal-distance vertices for contradiction."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "derives a shorter connecting configuration",
      "rationale": "The minimal counterexample construction gives a strictly shorter configuration contradicting minimal distance."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Minimum-distance counterexample arguments in graph geometry are a reusable extremal technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-034",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "whose convex hull contains the blue point",
      "rationale": "The geometric hull-containment condition identifies part of the minimization input, but the full connected-set constraints are implicit."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "reduces to a minimal connected set",
      "rationale": "The solution constructs a minimal connected red-point witness whose hull contains the target blue point."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Minimizing a connected witness under hull containment is a recognizable geometric reduction."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-035",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "quadratic form with coefficients min(i,j)",
      "rationale": "A quadratic form with the specified min(i,j) coefficient pattern is the explicit algebraic input for the sum-of-squares rewrite."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "as a sum of squares of tail sums",
      "rationale": "The quadratic form is represented as a sum of squared tail sums, a definite nonnegative decomposition."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "The min(i,j) sum-of-squares identity is meaningful independent of this occurrence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-036",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "matrix with entries min(i,j)",
      "rationale": "The min(i,j) matrix structure is the precise existing object invited into a positive-semidefinite interpretation."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "proves the required nonnegativity",
      "rationale": "The matrix argument concludes the required nonnegativity via positive semidefiniteness."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Positive-semidefinite reasoning for an explicit structured matrix is general linear algebra."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-037",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "min(i,j) matrix",
      "rationale": "The min(i,j) matrix is an identifiable input object for covariance and variance interpretation."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "concludes nonnegativity from variance",
      "rationale": "Variance positivity proves the nonnegativity of the represented quadratic form."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Covariance representation and variance-based nonnegativity have source-independent meaning."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-038",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "After deriving the recurrence",
      "rationale": "A derived recurrence supplies the existing object transformed into a generating function; the recurrence formula is unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "obtains a differential equation",
      "rationale": "The formal generating-function encoding yields a differential equation for the generating function."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Recurrence-to-generating-function-to-ODE translation is a general mathematical transformation."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-040",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "two nonadjacent positive vertices",
      "rationale": "A pair of positive-weight nonadjacent vertices is the concrete configuration enabling weight transfer."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "positive support is a clique",
      "rationale": "The repeated mass transfer ends with positive support forming a clique without lowering the objective."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Clique-support compression by moving weights is a general graph optimization technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-041",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "positive contribution",
      "rationale": "Positive versus negative portions of the signed area offer a criterion for choosing the interval, without full geometry."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "chooses an interval that captures the positive contribution while excluding negative contribution",
      "rationale": "The selected interval captures positive signed area while excluding negative contribution, an identifiable extremal construction."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Signed-area interval selection is a reusable integration/optimization method."
    }
  }
].map(row => Object.freeze(row)));
