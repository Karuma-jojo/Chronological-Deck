// Gate 3 v7D builder-only completion of previously DEFER(null) roles.
// Batch 02/02: remaining 12 v7B partly examined official mass candidates.
// Null means awaiting review in prior version, NOT mathematical UNRESOLVED.
// No authority to change v6 classifier or frozen accepted calibration.
export const ARSENAL_GATE3_V7D_BATCH_02 = Object.freeze([
  {
    "candidateId": "RAW-OFFICIAL-091",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "diagonalizes the parameter-dependent two-by-two matrix",
        "rationale": "The verified claim states that the solver actually diagonalizes the parameter-dependent 2×2 matrix after substitution. This produces a specific diagonal matrix representation, not just a proposal to use diagonalization."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Diagonalizing a parameter-dependent two-by-two polynomial matrix is a standard algebraic and linear-algebraic operation whose meaning is independent of the named competition problem."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-092",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "parametrizes polynomial roots using roots of unity and cosine values",
        "rationale": "The official claim explicitly says polynomial roots are parametrized using roots of unity and cosine values, an identifiable mathematical representation. It is more than a mere mention of roots of unity."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Relating polynomial roots to roots of unity and cosine parametrizations is a general algebraic technique; the preceding diagonalization is a local execution stage, not a source-defined meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-094",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "finite-dimensional function space",
        "rationale": "The solution works with a finite-dimensional function space after complexification, supplying the algebraic input for an upper-triangular basis. The claim does not explicitly state all operator-invariance assumptions for dilation or detail the complexification, so the full application trigger is not established."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-096",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "identifies the Minkowski sum of two triangles with the convex hull of their pairwise vertex sums",
        "rationale": "The official claim explicitly identifies the Minkowski sum of the two triangles with a convex hull of pairwise vertex sums, a concrete geometric equality; the later vertex choice for recovering a quadrilateral is an additional result."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Representing Minkowski sums of convex polygons by convex hulls of vertex sums is a source-independent fact of convex geometry, regardless of which quadrilateral the solution constructs."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-098",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "known roots",
        "rationale": "Known roots of the one-variable specialization are the existing algebraic input that enables factorization after freezing other variables. The claim does not specify the degree, multiplicities or structural antisymmetry conditions, so the complete application criterion is missing."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Factorizing a polynomial using known roots and exploiting antisymmetry to compare factors are general algebraic operations, not terminology defined by the particular original solution."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-101",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "reduces every expression to one of four linear forms",
        "rationale": "The official claim establishes that after passing modulo two and removing the subtraction/absolute-value distinction, every permitted expression reduces to one of four linear forms. This is a definite normal-form classification."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Reduction modulo two to an expression normal form is a reusable algebraic proof strategy; the particular expression language is task-specific but its mathematical method has independent meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-102",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "epigraph",
        "rationale": "The epigraph is the geometric representation used as input to the convex-hull construction, but it is a solver-selected representation and the underlying function and needed convexity/support hypotheses are not specified. It warrants PARTIAL applicability information only at the intermediate stage."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Constructing a convex envelope from an epigraph hull and using supporting segments to infer decompositions is a standard convex-geometric technique with source-independent mathematical meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-111",
    "roles": {
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Differentiating a differential equation and using a logarithmic inequality to establish strict concavity are recognizable analytic proof operations independent of the original solution curve, although sufficiency conditions remain partly unspecified."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-112",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "contradict that infimum",
        "rationale": "The owned claim asserts that a tangent-line bound contradicts the assumed infimum ratio, completing a contradiction to the no-diagonal-crossing assumption. This is a stated mathematical contradiction supporting the goal that the curve meets the diagonal."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "An infimum-based contradiction using a supporting tangent-line inequality for a concave curve is a general real-analysis strategy, regardless of the special curve in the original problem."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-114",
    "roles": {
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Mapping a pursuit problem to a graph and using graph-distance shells from an antipodal pair is a recognizable graph-game guarding strategy beyond the dodecahedron. Whether it wins under other move rules is not established by this general mathematical meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-119",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "two functions are inverses",
        "rationale": "Having inverse functions is a concrete hypothesis yielding symmetry of their graphs across y=x. Locating two crossings further requires the integral and appropriate continuity/sign conditions, which are not detailed, so the full applicability boundary is PARTIAL."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Inverse-function graph symmetry, area interpretation and crossing-location arguments are standard analytic-geometric methods, independent of the particular functions in this source."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-120",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "Discrete Map",
        "rationale": "The RAW expression identifies an iterated discrete map with orbits as the input setting. The half-plane strips and attracting region are solver-defined constructions; no sufficient dynamical inequalities ensuring invariance or trapping are supplied, so trigger information is only PARTIAL."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Constructing an invariant strip or attracting region to trap orbits of an iterated map is a general discrete-dynamical-systems method; which strip succeeds depends on the particular map."
      }
    }
  }
].map(row=>Object.freeze(row)));
