// Gate 3 v7C: original-source-bound, individually reasoned builder decisions.
// Batch 02 of 3. Not independently accepted, not imported by v6 classifier.
export const ARSENAL_GATE3_V7C_BATCH_02 = Object.freeze([
  {
    "candidateId": "RAW-OFFICIAL-042",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "admissible configurations",
      "rationale": "The two classes of admissible configurations supply counting sets, but the precise admissibility and map conditions are not stated."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "yields a Fibonacci-type recurrence lower bound",
      "rationale": "An injection between configuration classes establishes a Fibonacci-type recurrence lower bound, an identified counting result."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Injective recurrence lower bounds are general combinatorial proof constructions."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-043",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "words avoiding a forbidden pattern",
      "rationale": "Avoidance of a forbidden word pattern specifies the combinatorial setting, although the particular pattern is omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "complementary bound",
      "rationale": "The surjective recurrence argument yields the complementary upper bound to the paired counting construction."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Word avoidance and surjective-recursion bounds have mathematical meaning outside this occurrence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-044",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "final state determines the last move",
      "rationale": "Recoverability of the last move from final state states a specific reconstruction condition, but the move rules are not detailed."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "recovers the entire history",
      "rationale": "Recursive recovery from final state reconstructs the complete move history, an identifiable result."
    },
    "context": {
      "boundaryDecision": "PROBLEM_LOCAL",
      "rationale": "The recoverability claim turns on the particular state's move-reversal structure in this contest setting."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-046",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "self-similar relation",
      "rationale": "The infimum-defined function is required to satisfy a self-similar relation, but no full equation or domain hypothesis is supplied."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "identify it",
      "rationale": "The self-similar relation is differentiated to identify the constructed lower-bound function."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Self-similar infimum ansätze and differentiation-based identification are reusable analytic proof moves."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-047",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "real eigenvector of the cyclic isometry",
      "rationale": "An eigenvector of the cyclic isometry supplies the axis for projection, although the exact eigenspace is not given."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "reduce the geometry",
      "rationale": "Projection to the orthogonal complement and symmetry commutation reduce the geometric configuration."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Eigenvector projection reductions are standard linear-algebraic geometric methods."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-049",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "cyclic quotient group",
      "rationale": "The cyclic quotient supplies the group setting for extracting a difference set, without describing all incidence assumptions."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "giving an abelian planar difference set",
      "rationale": "The chosen subset of the quotient group yields an abelian planar difference set as a concrete combinatorial construction."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Difference sets via cyclic quotients encode incidence structures in general finite geometry."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-050",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "recurrence term",
      "rationale": "The recurrence terms supply the objects whose prime divisibility is tracked; the actual recurrence relation is not supplied."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "exactly which primes divide each recurrence term",
      "rationale": "Induction identifies precisely the prime support of every recurrence term, yielding a divisibility invariant."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Inductive prime-support tracking is a general number-theoretic invariant strategy."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-051",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "nested sequence of nonempty compact sets",
      "rationale": "The required nested compact family is an intermediate construction, not original givenness; once it exists, intersection nonemptiness applies."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "obtain a limiting parameter",
      "rationale": "A nonempty nested-compact-set intersection supplies a limiting parameter, a definite existence conclusion."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Nested nonempty compact intersection arguments are source-independent topology/analysis."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-053",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "from boundedness to continuity",
      "rationale": "Boundedness is the partial regularity state from which moving-average bootstrapping proceeds; the required averaging identity is unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "from boundedness to continuity",
      "rationale": "The moving-average identity upgrades boundedness to continuity, an explicit regularity outcome."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Regularity bootstrapping via averaging is meaningful beyond one functional equation."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-056",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "multiplicative order",
      "rationale": "A multiplicative order in a unit group is the relevant quantity, but the particular modulus and divisibility question are not supplied."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "bounds a multiplicative order by the cardinality",
      "rationale": "The unit-group cardinality, expressed by Euler's totient, provides a definite upper bound on multiplicative order."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Bounding orders by finite-group cardinalities is a general arithmetic method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-058",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "move-to-losing and all-moves-to-winning conditions",
      "rationale": "The two stated P/N transition rules specify how to classify game positions inductively."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "classifies game positions as winning or losing",
      "rationale": "The argument proves a complete inductive winning/losing classification of game positions."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Inductive P/N-position classification is a reusable impartial-game strategy."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-059",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "impartial game",
      "rationale": "The setting is an impartial game admitting Sprague–Grundy analysis, though the specific legal moves are unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "reduces the impartial game to nim-value calculations",
      "rationale": "Sprague–Grundy assignment converts the game into nim-value computations, a definite simplified representation."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Sprague–Grundy-to-Nim reduction is a general combinatorial-game technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-060",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "fixed-size blocks",
      "rationale": "Terms are grouped into blocks for benchmark comparison; the sign and exact comparison hypotheses remain unstated."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "decide convergence or divergence",
      "rationale": "The blockwise comparison with a harmonic-type benchmark decides convergence or divergence of the series."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Block comparison for series is a source-independent analytic convergence method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-061",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "linear recurrence",
      "rationale": "The existing linear recurrence is the object for a characteristic equation, although coefficients and initial conditions are omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "solves the linear recurrence",
      "rationale": "Characteristic-equation analysis explicitly solves the linear recurrence, producing its solution representation."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Characteristic equations solve linear recurrences in a general algebraic setting."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-062",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "selected residue classes",
      "rationale": "Residue-class coefficient selection supplies the extraction goal, but the generating function's form is not given."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "isolate coefficients in selected residue classes",
      "rationale": "Fifth-root-of-unity evaluations select coefficients in the specified residue classes, a clear filtering outcome."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Roots-of-unity coefficient filtering is a reusable algebraic-combinatorial method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-063",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "ordered tuple",
      "rationale": "Ordered tuples are the existing structures being shifted, but the weighted-class restrictions remain unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "construct a bijection between two weighted configuration classes",
      "rationale": "Shifting coordinates constructs a bijection between two weighted classes and derives a recurrence."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Shift bijections and recurrence derivations apply generally to enumerative problems."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-065",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "total vector",
      "rationale": "A vector total is present and motivates choosing half as a center, though the exact target norm inequality is not recorded."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "converting the target bound into a triangle-inequality estimate",
      "rationale": "Centering at half the total vector transforms the target bound into a triangle-inequality estimate."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Half-total vector centering is a source-independent norm-bounding technique."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-066",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "two equal halves",
      "rationale": "The tournament's division into equal halves supplies the recursive structure, but the distribution/rules are not specified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "expected winner rank",
      "rationale": "Induction and conditional expectation recursively compute the winner's expected rank."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Recursive expectations from self-similar halves are a general probabilistic method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-067",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "A plus B equal to the ambient space",
      "rationale": "The span condition A+B equals the whole space is an explicit linear-algebra hypothesis inviting component decomposition."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "proves the resulting component vectors form bases",
      "rationale": "Decomposing vectors from C into A and B components yields vectors proved to be bases."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Direct-sum-style basis construction is a general linear-algebra argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-068",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "equally spaced intersections",
      "rationale": "Equal spacing enables paired equal-area opposite-color triangles, but the precise geometry is unstated."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "pairs adjacent opposite-colour triangles with equal area",
      "rationale": "The area-pairing construction produces equality of areas between opposite-colored adjacent triangles."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Pairing adjacent triangles of equal area is a standard Euclidean-geometric comparison construction independent of the specific original arrangement."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-069",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "paired columns",
      "rationale": "Paired guard columns are the available configuration for a barrier strategy, but the adversary's movement rules are missing."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "maintains a descending barrier invariant",
      "rationale": "The guard assignment maintains a descending barrier invariant against the adversary's motion."
    },
    "context": {
      "boundaryDecision": "UNRESOLVED",
      "rationale": "The named double-column guarding barrier is interpretable but its scope and dependence on unstated game rules are insufficient to choose GENERAL or PROBLEM_LOCAL responsibly."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-070",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "recursively forced pairings",
      "rationale": "Forced pairings signal a ternary digit structure, but not the full admissibility conditions on integers."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "characterizes the admissible integers through base-three digits",
      "rationale": "The construction gives and proves a base-three digit characterization of admissible integers."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Classifications from digit expansions and forced pairings are general number-theoretic/combinatorial methods."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-071",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "local pairing constraints",
      "rationale": "Specific local pairing restrictions force a smaller instance, but the permissible pairs are not fully specified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "force a smaller instance",
      "rationale": "The pairing constraints reduce the problem to a smaller instance, enabling ternary-scale induction."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "A reduction forced by local pair constraints supports a general structural-induction method, although the precise instance's pairing constraints are specialized."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-072",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "divergence of the sum of reciprocal primes",
      "rationale": "The divergence of prime reciprocal sums is the explicit premise driving decay of the avoidance product."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "proves that product vanishes",
      "rationale": "An exponential bound and divergent prime reciprocals force the infinite product to vanish."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Converting divergent reciprocal sums to vanishing infinite products is general analysis."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-075",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "line-to-point map",
      "rationale": "An incidence-preserving line-to-point map is the object analyzed, but the full incidence hypotheses are unstated."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "contradiction",
      "rationale": "The proof obtains injectivity using a transversal and then an incidence-rule contradiction."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Incidence-based injectivity bootstrapping is a reusable finite-geometric method."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-076",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "finite-field polynomial ring",
      "rationale": "The polynomial ring over a finite field is the algebraic setting, but the relevant fixed-point conditions are not fully specified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "descend coefficient information to the base field",
      "rationale": "Frobenius-fixed polynomials allow coefficient information to descend to the base field."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Frobenius descent in finite-field polynomial rings is a general field-theoretic argument."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-078",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "moving boundary",
      "rationale": "A moving boundary may meet too many lattice points simultaneously, motivating an irrational slope, but the exact constraints are missing."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "avoids configurations with too many lattice points at once",
      "rationale": "Selecting an irrational slope prevents simultaneous excessive lattice-point degeneracies."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Irrational slopes as degeneracy avoidance are source-independent geometry."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-079",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "non-origin lattice point",
      "rationale": "The non-origin lattice-point condition and quarter-turn symmetry explicitly identify four-element orbits."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "orbit of four",
      "rationale": "Quarter-turn action partitions non-origin lattice points into four-element orbits."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Finite orbit counting under quarter-turn symmetry is general lattice combinatorics."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-080",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "Strict monotonicity",
      "rationale": "Strict monotonicity is the explicit condition ruling out nontrivial two-cycles."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "two-cycle must be a fixed point",
      "rationale": "The argument proves any two-cycle collapses to a fixed point and completes algebraic classification."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Using strict monotonicity to collapse a nontrivial two-cycle into a fixed point is a reusable method in discrete dynamics, separate from this occurrence."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-081",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "Pascal's triangle modulo two",
      "rationale": "The parity pattern of Pascal's triangle supplies the counting structure, with the exact row/block range omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "count odd binomial coefficients by dyadic blocks",
      "rationale": "Self-similarity modulo two is used to count odd binomial coefficients over dyadic blocks."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Parity self-similarity and dyadic block counts are general combinatorial tools."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-082",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "no-carry criterion in base two",
      "rationale": "The base-two no-carry condition precisely identifies which binomial coefficients are odd."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "count odd binomial coefficients digit by digit",
      "rationale": "Applying the no-carry test yields a digitwise count of odd binomial coefficients."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "No-carry digit criteria for binomial parity are source-independent number theory."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-083",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "first occupied seat",
      "rationale": "The first occupied seat determines a decomposition into two independent sides, but the seating law is not specified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "yielding a recurrence for expectations",
      "rationale": "Conditioning on the first seat produces an expectation recurrence from independent subproblems."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "First-step conditioning and recursive independent-subproblem decomposition are general probabilistic methods."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-084",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "expectation recurrence",
      "rationale": "An already derived expectation recurrence is the input transformed into a generating function; the exact recurrence is omitted."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "first-order linear differential equation",
      "rationale": "The generating-function identity is transformed into a first-order linear differential equation."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Expectation-recurrence-to-ODE translation is general analytic combinatorics."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-085",
    "trigger": {
      "boundaryDecision": "PARTIAL",
      "witness": "lowest nonzero polynomial powers",
      "rationale": "Lowest and highest degrees supply asymptotic comparison inputs, although the competing polynomials and domain conditions are unspecified."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "rule out a finite maximum representation",
      "rationale": "Comparing orders near zero and infinity excludes the proposed finite maximum representation."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Lowest/highest-power asymptotic comparison is general algebraic analysis."
    }
  },
  {
    "candidateId": "RAW-OFFICIAL-086",
    "trigger": {
      "boundaryDecision": "CLEAR",
      "witness": "infinitely many matching integer values",
      "rationale": "Infinitely many integer agreements combined with polynomial finiteness supply an identity-forcing hypothesis."
    },
    "output": {
      "boundaryDecision": "CLEAR",
      "witness": "agree identically with x",
      "rationale": "Pigeonhole reasoning forces one polynomial candidate to equal x identically."
    },
    "context": {
      "boundaryDecision": "GENERAL",
      "rationale": "Polynomial identity from infinitely many agreement points is general algebra."
    }
  }
].map(row => Object.freeze(row)));
