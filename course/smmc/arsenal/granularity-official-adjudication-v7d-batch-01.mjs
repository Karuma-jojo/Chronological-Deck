// Gate 3 v7D builder-only completion of previously DEFER(null) roles.
// Batch 01/02: original 14 v7B partially examined official mass candidates.
// Evidence witnesses must be in the SAME candidate's accepted claim or raw name.
// No v7D judgment is independently accepted, and no classifier integration occurs.
export const ARSENAL_GATE3_V7D_BATCH_01 = Object.freeze([
  {
    "candidateId": "RAW-OFFICIAL-014",
    "roles": {
      "output": {
        "boundaryDecision": "UNRESOLVED",
        "witness": null,
        "rationale": "The verified claim only says finite-projective-plane structure was used in the solved part. It does not say what incidence relation, combinatorial construction or numerical result this use produced; none can be inferred from the word 'solved'."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Finite projective planes are a standard mathematically defined incidence structure. The named Projective-Plane Method is intelligible without knowing which original competition problem used it, although its particular deployment remains undocumented."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-016",
    "roles": {
      "trigger": {
        "boundaryDecision": "UNRESOLVED",
        "witness": null,
        "rationale": "The valuation information is described as something used within a divisibility analysis, without identifying which integer, prime, valuation comparison or hypothesis made the step applicable. Named input data alone does not establish a distinct triggering condition."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "A p-adic valuation measures divisibility by a specified prime and is defined independently of this solution. The absence of its particular application condition does not make the mathematical tool source-local."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-018",
    "roles": {
      "trigger": {
        "boundaryDecision": "UNRESOLVED",
        "witness": null,
        "rationale": "The theorem is said to be invoked during an obstruction argument, but the candidate expression and official claim do not identify an integer polynomial, a proposed rational root or the divisibility constraints inviting its use."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "The Rational Root Theorem is a standard polynomial-root criterion, and the candidate's mathematical meaning does not depend on a local term or an otherwise unnamed source construction."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-029",
    "roles": {
      "trigger": {
        "boundaryDecision": "CLEAR",
        "witness": "sequence in a compact torus",
        "rationale": "Once the sequence has been placed in the compact torus, compactness supplies the concrete applicability setting for extracting a convergent subsequence. This is the intermediate stage of the move; placement of the sequence is itself a solver step, not a claim that the problem originally supplied the compact representation."
      },
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "extracts a convergent subsequence",
        "rationale": "The accepted claim explicitly reports extracting a convergent subsequence from the sequence in the compact torus. This is an achieved analytic output, rather than a mere invocation of compactness."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-031",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "equivalent to vanishing of its gradient",
        "rationale": "The verified claim states that the original target vector equation is equivalent to the scalar potential's gradient vanishing. That equivalence is a definite reformulated mathematical result, not merely the introduction of the potential."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Recasting a vector condition as a gradient-zero condition of a scalar potential is meaningful beyond this particular inverse-square distance setup. The exact potential is source-specific, but the type of mathematical transformation is general."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-045",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "correspondence is reversible",
        "rationale": "The proof establishes that legal move histories and index subsets correspond reversibly; an explicit invertible encoding is the output. The actual move rules remain instance-specific but are not required to recognize the produced bijective correspondence."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Encoding a move history by an index subset and proving the coding reversible is a general combinatorial technique. Which sequences are legal is problem-dependent, but the method expression has source-independent meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-052",
    "roles": {
      "trigger": {
        "boundaryDecision": "CLEAR",
        "witness": "Riemann integrability on compact intervals",
        "rationale": "Riemann integrability over a closed bounded interval is a recognized premise for boundedness of the function on that interval. The official claim names exactly that mathematical condition and the operation's intended boundedness result."
      },
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "obtain boundedness needed for the functional argument",
        "rationale": "The historical argument obtains boundedness from Riemann integrability, giving a definite local boundedness property needed for the later functional step. The source states this achieved result rather than only suggesting a theorem."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-054",
    "roles": {
      "output": {
        "boundaryDecision": "PARTIAL",
        "witness": "divisibility information on the polynomial coefficients",
        "rationale": "The owned claim says a modular coefficient comparison forces divisibility information about the polynomial coefficients, so some output is supported. It does not identify which coefficients, modulus power, or exact divisibility relation is established; the immediate product is PARTIAL, not a fully specified number-theoretic conclusion."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Comparing polynomial coefficients modulo a prime using divisibility of binomial coefficients is a standard algebraic maneuver with source-independent mathematical meaning, even if the exact identity to compare remains unspecified."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-055",
    "roles": {
      "output": {
        "boundaryDecision": "PARTIAL",
        "witness": "control the factor count",
        "rationale": "The accepted claim reports using multiplicative-order divisibility to control a factor count. The quantity to count and resulting inequality or formula are not supplied, so this is positive but incomplete evidence of a numerical conclusion."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Studying multiplicative orders modulo prime powers and using order divisibility in factor counts is a reusable number-theoretic argument, not a source-defined local term."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-064",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "admissible convex function",
        "rationale": "The function is explicitly convex and is the object selected for the affine-envelope representation. The precise admissible class, domain, and support-line conditions are not stated, so this identifies a partial applicability situation rather than a complete trigger."
      },
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "represents the admissible convex function as the maximum of a selected family of affine functions",
        "rationale": "The solver actually represents the convex function as a maximum of affine functions; that form is an identifiable mathematical construction. Its existence and use of supporting-line structure are explicitly asserted by the official claim."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-074",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "obtains g(x)=g(x^2)",
        "rationale": "After the normalization by x−1, the solution explicitly obtains the functional invariance identity g(x)=g(x²). This equation is a precise intermediate mathematical result; the later use with continuity and iterates is a separate stage."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Renormalizing a functional equation to reveal an iterated invariance and combining it with continuity is a general functional-equation strategy, regardless of the specific input function."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-077",
    "roles": {
      "trigger": {
        "boundaryDecision": "PARTIAL",
        "witness": "irreducible factors through their Frobenius orbits",
        "rationale": "Having irreducible factors organized by Frobenius orbits is the algebraic intermediate structure to be assembled, but it is produced or identified during the proof and the factorization hypotheses are omitted. It supports a partial stage-specific trigger rather than an already given complete criterion."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Assembling irreducible factors via Frobenius orbits and unique factorization over a finite field is a standard algebraic method with source-independent meaning."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-087",
    "roles": {
      "output": {
        "boundaryDecision": "CLEAR",
        "witness": "computes the desired average",
        "rationale": "The accepted official claim explicitly reports computing the average by double-counting matrix–nonzero-eigenvector pairs. The pairs are a constructed counting representation, not a given trigger, but the resulting average is a stated outcome."
      },
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Double counting a set of algebraic incidence pairs to derive an average is a general combinatorial linear-algebra method, independent of the historical problem's exact matrices."
      }
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-089",
    "roles": {
      "context": {
        "boundaryDecision": "GENERAL",
        "witness": null,
        "rationale": "Rank-nullity and kernel counting for a linear map over a finite field are standard finite-dimensional linear algebra. The map A↦Av is introduced inside this proof, but the mathematical technique does not depend on a local source-defined concept."
      }
    }
  }
].map(row=>Object.freeze(row)));
