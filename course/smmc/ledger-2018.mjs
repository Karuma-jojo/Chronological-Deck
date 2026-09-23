// SMMC 2018 crosswalk — official problem/solution evidence mapped to stable T25 target codes.
// Problem statements are summarized rather than reproduced.
// t25Targets is authoritative; live 1–162 route positions are resolved from canonical T25 when needed.

export default [
  {
    "id": "SMMC-2018-A1",
    "year": 2018,
    "session": "A",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "Determine which n allow a square to be tiled by n rectangles all similar to a 2-by-1 rectangle.",
    "primaryDomain": "S5",
    "secondaryTags": [
      "TILING",
      "REC",
      "MOD"
    ],
    "methodTags": [
      "CONSTRUCTION",
      "INDUCTION",
      "CASE-DECOMPOSITION"
    ],
    "t25Bridges": [
      "BR-I",
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Constructive tiling/dissection reasoning",
      "Residue-class coverage through a recursive construction"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "The arithmetic progression and induction ingredients are supported by T25; the geometric construction habit is SMMC-specific.",
    "t25Targets": [
      "F4",
      "A2",
      "P2"
    ]
  },
  {
    "id": "SMMC-2018-A2",
    "year": 2018,
    "session": "A",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "Sequential coefficient-choice game for a quadratic; determine winning strategies depending on which player wants a real root.",
    "primaryDomain": "S1",
    "secondaryTags": [
      "GAME",
      "POLY",
      "INEQ"
    ],
    "methodTags": [
      "NORMALIZATION",
      "CASE-DECOMPOSITION",
      "CONSTRUCTION",
      "SYMMETRY"
    ],
    "t25Bridges": [],
    "overlap": "green",
    "bridgeNeeds": [],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "The winning strategy is creative, but the mathematical content is elementary polynomial/discriminant and sign reasoning already inside T25.",
    "t25Targets": [
      "F2",
      "F4",
      "A1"
    ]
  },
  {
    "id": "SMMC-2018-A3",
    "year": 2018,
    "session": "A",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "Analyze the positive solution of a first-order differential equation and count intersections with a fixed horizontal level.",
    "primaryDomain": "S3",
    "secondaryTags": [
      "ODE",
      "CONVEX",
      "INT",
      "ASYM"
    ],
    "methodTags": [
      "MONOTONICITY",
      "CONVEXITY",
      "CONTRADICTION",
      "BOUNDING",
      "EXISTENCE"
    ],
    "t25Bridges": [],
    "overlap": "red",
    "bridgeNeeds": [
      "Elementary first-order ODE interpretation",
      "Qualitative solution-curve reasoning",
      "Concavity/global-behaviour arguments for ODE solutions"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "T25 supplies calculus pieces but explicitly does not constitute an ODE course; the missing qualitative ODE layer is material.",
    "t25Targets": [
      "A3",
      "C1",
      "C3",
      "C4",
      "C5",
      "C6"
    ]
  },
  {
    "id": "SMMC-2018-A4",
    "year": 2018,
    "session": "A",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Random sequential seating/cup-holder process; derive the success probabilities and sum them over all n.",
    "primaryDomain": "S6",
    "secondaryTags": [
      "REC",
      "RANDOM-PROCESS",
      "GF",
      "ODE"
    ],
    "methodTags": [
      "CASE-DECOMPOSITION",
      "RECURRENCE-REFORMULATION",
      "GENERATING-FUNCTION",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [
      "BR-I"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Ordinary generating functions/formal power series",
      "Convolution-to-product translation",
      "Elementary separable ODE solving for a generating function"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "The probability decomposition is T25-friendly, but the official route relies on generating functions, which current T25 explicitly leaves out.",
    "t25Targets": [
      "A5",
      "P1",
      "P5"
    ]
  },
  {
    "id": "SMMC-2018-B1",
    "year": 2018,
    "session": "B",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "Prove nonnegativity of a quadratic double sum with coefficient min(i,j) by revealing hidden square structure.",
    "primaryDomain": "S1",
    "secondaryTags": [
      "LA",
      "INEQ"
    ],
    "methodTags": [
      "AUXILIARY-OBJECT",
      "FACTORIZATION",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [],
    "overlap": "green",
    "bridgeNeeds": [],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "Finite inequalities and positive-semidefinite/quadratic-form structure are within the current mathematical foundation; the hidden identity is the creative step.",
    "t25Targets": [
      "A3",
      "M5"
    ]
  },
  {
    "id": "SMMC-2018-B2",
    "year": 2018,
    "session": "B",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "Show that every open real interval contains infinitely many differences of square roots of positive integers.",
    "primaryDomain": "S3",
    "secondaryTags": [
      "SEQ",
      "ASYM"
    ],
    "methodTags": [
      "CONSTRUCTION",
      "BOUNDING",
      "NORMALIZATION",
      "EXISTENCE"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Density of rational numbers as an available elementary fact",
      "Constructive approximation with radicals"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "T25 supports limits and radical-domain algebra, but the density/approximation construction deserves a compact SMMC bridge.",
    "t25Targets": [
      "F1",
      "F4",
      "A5",
      "C1"
    ]
  },
  {
    "id": "SMMC-2018-B3",
    "year": 2018,
    "session": "B",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "Pursuit game on the edge graph of a regular dodecahedron; prove three spiders have a winning strategy against a beetle.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "GRAPH",
      "GAME",
      "POLYHEDRAL"
    ],
    "methodTags": [
      "GRAPH-REFORMULATION",
      "SYMMETRY",
      "CONSTRUCTION",
      "CASE-DECOMPOSITION",
      "AUXILIARY-OBJECT"
    ],
    "t25Bridges": [],
    "overlap": "red",
    "bridgeNeeds": [
      "Finite graph distance, paths, cycles, trees and components",
      "Pursuit/guarding arguments on graphs",
      "Symmetry reduction on a polyhedral graph"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "The official solution is fundamentally graph-theoretic and strategic; current T25 has no corresponding discrete-graph route.",
    "t25Targets": [
      "F4",
      "G2"
    ]
  },
  {
    "id": "SMMC-2018-B4",
    "year": 2018,
    "session": "B",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Open enumeration problem for constrained sorted 2-by-mn matrices; a full expression is known only for the requested m=5 partial case.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "CONST",
      "INEQ"
    ],
    "methodTags": [
      "PARAMETERIZATION",
      "CASE-DECOMPOSITION",
      "BOUNDING",
      "DOUBLE-COUNTING"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Integer-lattice point enumeration under linear inequalities",
      "Research-style partial-progress discipline for an open counting problem"
    ],
    "assessmentRole": "open-problem",
    "classificationConfidence": "high",
    "auditNote": "The known m=5 reduction is accessible after combinatorics/inequalities, but the stated general task is open and must not be treated as an ordinary mastery gate.",
    "t25Targets": [
      "F2",
      "F4",
      "P2"
    ]
  }
];
