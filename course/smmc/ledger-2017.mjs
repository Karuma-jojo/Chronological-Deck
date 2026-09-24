// SMMC 2017 crosswalk — official problem/solution evidence mapped to stable T25 target codes.
// Problem statements are summarized rather than reproduced.
// t25Targets is authoritative; live 1–162 route positions are resolved from canonical T25 when needed.

export default [
  {
    "id": "SMMC-2017-A1",
    "year": 2017,
    "session": "A",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "Two-player edge-colouring game on the five vertices of a regular pentagon; determine who can force a monochromatic triangle first.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "GAME",
      "GRAPH"
    ],
    "methodTags": [
      "SYMMETRY",
      "CASE-DECOMPOSITION",
      "AUXILIARY-OBJECT"
    ],
    "t25Bridges": [],
    "overlap": "amber",
    "bridgeNeeds": [
      "Finite graph/game vocabulary",
      "Forcing-strategy trees and threat-pair reasoning"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "T25 supplies proof/case discipline and restricted counting, but not strategic graph-game technique.",
    "t25Targets": [
      "F4",
      "P2"
    ]
  },
  {
    "id": "SMMC-2017-A2",
    "year": 2017,
    "session": "A",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "A recursively defined positive real sequence; decide whether its partial sums eventually exceed a very large threshold.",
    "primaryDomain": "S3",
    "secondaryTags": [
      "SEQ",
      "REC",
      "ASYM"
    ],
    "methodTags": [
      "CASE-DECOMPOSITION",
      "BOUNDING",
      "RECURRENCE-REFORMULATION"
    ],
    "t25Bridges": [
      "BR-I"
    ],
    "overlap": "green",
    "bridgeNeeds": [],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "Current T25 sequence convergence/recurrence work plus its induction bridge supplies the needed content; discovery remains nontrivial.",
    "t25Targets": [
      "A3",
      "A5"
    ]
  },
  {
    "id": "SMMC-2017-A3",
    "year": 2017,
    "session": "A",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "A divisibility-defined 0–1 matrix; characterize invertibility in terms of whether n+1 is square-free.",
    "primaryDomain": "S4",
    "secondaryTags": [
      "LA",
      "PRIME",
      "MOD"
    ],
    "methodTags": [
      "AUXILIARY-OBJECT",
      "DOUBLE-COUNTING",
      "CASE-DECOMPOSITION",
      "FACTORIZATION",
      "LEMMA-EXTRACTION"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Square-free/prime-factor language",
      "Subset-sign cancellation / elementary inclusion-exclusion outside probability"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "Linear-algebra machinery is strongly supported by T25; the arithmetic cancellation structure needs a bounded SMMC bridge.",
    "t25Targets": [
      "F4",
      "M0",
      "M2",
      "M3"
    ]
  },
  {
    "id": "SMMC-2017-A4",
    "year": 2017,
    "session": "A",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Existence of a point in a regular 2017-gon for which a weighted inverse-power vector sum vanishes.",
    "primaryDomain": "S5",
    "secondaryTags": [
      "VECTOR-GEO",
      "CONVEX-GEO"
    ],
    "methodTags": [
      "AUXILIARY-OBJECT",
      "OPTIMIZATION",
      "BOUNDING",
      "EXISTENCE"
    ],
    "t25Bridges": [
      "BR-M"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Gradient of a scalar field in R^2",
      "Interior-minimum stationary-point reasoning",
      "Compact-region/global-minimum existence at the level needed by the official route"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "medium",
    "auditNote": "The official solution converts the vector equation into a two-variable optimization problem. T25 only provides a small multivariable-calculation bridge, not this existence/gradient toolkit.",
    "t25Targets": [
      "A3",
      "C5",
      "G2"
    ]
  },
  {
    "id": "SMMC-2017-B1",
    "year": 2017,
    "session": "B",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "Equal sums of incident edge lengths in a tetrahedron; prove the three incident lengths at every vertex satisfy triangle inequalities.",
    "primaryDomain": "S5",
    "secondaryTags": [
      "EUCLID",
      "POLYHEDRAL",
      "INEQ"
    ],
    "methodTags": [
      "SUBSTITUTION",
      "SYMMETRY",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [],
    "overlap": "amber",
    "bridgeNeeds": [
      "Elementary tetrahedron/face-incidence reasoning"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "The algebra and inequality reasoning are already available; only a very small spatial-geometry bridge is needed.",
    "t25Targets": [
      "F2",
      "A3"
    ]
  },
  {
    "id": "SMMC-2017-B2",
    "year": 2017,
    "session": "B",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "Classify prime pairs for which a symmetric exponential expression is a perfect square.",
    "primaryDomain": "S4",
    "secondaryTags": [
      "PRIME",
      "MOD",
      "INEQ"
    ],
    "methodTags": [
      "PARITY",
      "CASE-DECOMPOSITION",
      "FACTORIZATION",
      "INDUCTION",
      "BOUNDING"
    ],
    "t25Bridges": [
      "BR-I",
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Quadratic residues modulo 4 at an elementary level",
      "Prime-case reduction as a contest method"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "T25's induction, parity and inequality support is useful, but it is not a number-theory route.",
    "t25Targets": [
      "F4",
      "A3"
    ]
  },
  {
    "id": "SMMC-2017-B3",
    "year": 2017,
    "session": "B",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "A red/blue colouring of the integer lattice with segment and midpoint constraints; exclude blue points from the interior of a red triangle.",
    "primaryDomain": "S5",
    "secondaryTags": [
      "LATTICE",
      "GRAPH",
      "CONVEX-GEO"
    ],
    "methodTags": [
      "COLORING",
      "GRAPH-REFORMULATION",
      "MINIMAL-COUNTEREXAMPLE",
      "EXTREMAL",
      "CONTRADICTION",
      "LEMMA-EXTRACTION",
      "AUXILIARY-OBJECT"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Finite graph connectivity and minimal connected sets",
      "Convex-hull reasoning",
      "Lattice-geometry midpoint structure",
      "Minimal-counterexample/extremal proof practice"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "This is exactly the kind of hybrid contest proof the SMMC layer must add rather than forcing into T25.",
    "t25Targets": [
      "F4",
      "P2",
      "G2"
    ]
  },
  {
    "id": "SMMC-2017-B4",
    "year": 2017,
    "session": "B",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Open problem on asymptotic growth of quadrilateral tilings of a regular 2n-gon.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "TILING",
      "ASYM",
      "CONVEX-GEO"
    ],
    "methodTags": [
      "SMALL-CASES",
      "BOUNDING",
      "CONJECTURE",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [
      "BR-I"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Asymptotic combinatorial enumeration beyond T25",
      "Research-style partial-progress discipline for an open problem"
    ],
    "assessmentRole": "open-problem",
    "classificationConfidence": "medium",
    "auditNote": "Do not treat this as an ordinary full-solution readiness gate. SMMC explicitly awards progress on open B4-style problems.",
    "t25Targets": [
      "A2",
      "A5",
      "P2"
    ]
  }
];
