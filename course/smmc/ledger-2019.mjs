// SMMC 2019 crosswalk — official problem/solution evidence mapped to stable T25 target codes.
// Problem statements are summarized rather than reproduced.
// t25Targets is authoritative; live 1–162 route positions are resolved from canonical T25 when needed.

export default [
  {
    "id": "SMMC-2019-A1",
    "year": 2019,
    "session": "A",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "A prime-factor-driven integer recurrence; prove that the product of the 2019 smallest primes appears as a term.",
    "primaryDomain": "S4",
    "secondaryTags": [
      "PRIME",
      "REC"
    ],
    "methodTags": [
      "INDUCTION",
      "RECURRENCE-REFORMULATION",
      "MINIMAL-COUNTEREXAMPLE"
    ],
    "t25Bridges": [
      "BR-I",
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Prime-factor support of an integer and square-free product language",
      "Elementary prime-gap/minimal-not-divisible reasoning"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "T25 provides proof, induction and recurrence habits, but it is not a number-theory route; the prime-factor structure needs a bounded bridge.",
    "t25Targets": [
      "F4",
      "A5"
    ]
  },
  {
    "id": "SMMC-2019-A2",
    "year": 2019,
    "session": "A",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "Optimize two differently parenthesized expressions built from a non-associative integer operation over permutations of 1 through n.",
    "primaryDomain": "S1",
    "secondaryTags": [
      "REC",
      "CONST"
    ],
    "methodTags": [
      "INDUCTION",
      "EXCHANGE-ARGUMENT",
      "FACTORIZATION",
      "MONOTONICITY"
    ],
    "t25Bridges": [
      "BR-I"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Adjacent-swap exchange arguments for permutation optimization"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "The algebra and induction are T25-supported; the decisive adjacent-swap optimality argument is a reusable contest method not currently taught explicitly.",
    "t25Targets": [
      "F4",
      "A2",
      "P2"
    ]
  },
  {
    "id": "SMMC-2019-A3",
    "year": 2019,
    "session": "A",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "Classify rational coin biases for which a chosen subset of length-n head-tail strings can have total probability exactly one half.",
    "primaryDomain": "S6",
    "secondaryTags": [
      "POLY",
      "MOD",
      "PRIME"
    ],
    "methodTags": [
      "FACTORIZATION",
      "CASE-DECOMPOSITION",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "amber",
    "bridgeNeeds": [
      "Rational-root theorem at contest depth",
      "Modular reduction of an integer polynomial identity"
    ],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "Finite probability and counting are well covered by T25, but the rational-root and modular obstruction that force p=1/2 require a compact algebra/number-theory bridge.",
    "t25Targets": [
      "F2",
      "A1",
      "P1",
      "P2"
    ]
  },
  {
    "id": "SMMC-2019-A4",
    "year": 2019,
    "session": "A",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Construct a strictly decreasing positive sequence with divergent sum for which a specified min-truncated logarithmic series converges.",
    "primaryDomain": "S3",
    "secondaryTags": [
      "SEQ",
      "SERIES",
      "ASYM"
    ],
    "methodTags": [
      "COUNTEREXAMPLE",
      "CONSTRUCTION",
      "BOUNDING",
      "CASE-DECOMPOSITION"
    ],
    "t25Bridges": [],
    "overlap": "red",
    "bridgeNeeds": [
      "General positive-series convergence and comparison tests",
      "Purpose-built block/scale counterexample construction",
      "Logarithmic asymptotic estimates beyond T25 sequence limits"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "Current T25 explicitly leaves general series-convergence tests and infinite-series machinery out, so this problem needs genuine SMMC analysis preparation.",
    "t25Targets": [
      "F4",
      "A2",
      "A5"
    ]
  },
  {
    "id": "SMMC-2019-B1",
    "year": 2019,
    "session": "B",
    "problem": 1,
    "eastRelevant": true,
    "synopsis": "Choose integration endpoints to maximize a definite integral whose continuous integrand has a simple sign pattern.",
    "primaryDomain": "S3",
    "secondaryTags": [
      "INT",
      "INEQ"
    ],
    "methodTags": [
      "FACTORIZATION",
      "CASE-DECOMPOSITION",
      "OPTIMIZATION",
      "BOUNDING"
    ],
    "t25Bridges": [],
    "overlap": "green",
    "bridgeNeeds": [],
    "assessmentRole": "transfer",
    "classificationConfidence": "high",
    "auditNote": "The task is an unfamiliar synthesis of sign analysis and definite integration, but its mathematical prerequisites are already inside T25.",
    "t25Targets": [
      "F2",
      "C5",
      "C6"
    ]
  },
  {
    "id": "SMMC-2019-B2",
    "year": 2019,
    "session": "B",
    "problem": 2,
    "eastRelevant": true,
    "synopsis": "Prove a factorial expression involving the floor of (p-1)!/e is divisible by every odd prime p.",
    "primaryDomain": "S4",
    "secondaryTags": [
      "PRIME",
      "MOD",
      "SERIES",
      "ASYM"
    ],
    "methodTags": [
      "BOUNDING",
      "FACTORIZATION",
      "CROSS-DOMAIN"
    ],
    "t25Bridges": [
      "BR-N"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Alternating infinite-series expansion and remainder control",
      "Factorial congruence manipulation modulo a prime",
      "Legality of modular cancellation by nonzero residues"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "T25 has Taylor approximation and elementary integer/parity support, but not the alternating-series/factorial-congruence combination used by the official solution.",
    "t25Targets": [
      "F4",
      "A2",
      "C5"
    ]
  },
  {
    "id": "SMMC-2019-B3",
    "year": 2019,
    "session": "B",
    "problem": 3,
    "eastRelevant": true,
    "synopsis": "Optimize a weighted edge-sum over nonnegative vertex labels on a finite graph in terms of the graph's maximum clique size.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "GRAPH",
      "INEQ",
      "CONVEX"
    ],
    "methodTags": [
      "SMOOTHING",
      "EXTREMAL",
      "CONSTRUCTION",
      "BOUNDING",
      "SYMMETRY"
    ],
    "t25Bridges": [],
    "overlap": "red",
    "bridgeNeeds": [
      "Finite graph and clique vocabulary",
      "Mass-shifting/compression on nonadjacent vertices",
      "Extremal graph-optimization reasoning"
    ],
    "assessmentRole": "development",
    "classificationConfidence": "high",
    "auditNote": "The final inequality is T25-friendly, but the graph-theoretic compression that reduces support to a clique is a substantial missing SMMC technique.",
    "t25Targets": [
      "F4",
      "A3",
      "C5"
    ]
  },
  {
    "id": "SMMC-2019-B4",
    "year": 2019,
    "session": "B",
    "problem": 4,
    "eastRelevant": true,
    "synopsis": "Inductively generated binary strings: prove exponential upper and lower bounds, then address an open liminf/limsup counting problem.",
    "primaryDomain": "S2",
    "secondaryTags": [
      "REC",
      "ASYM",
      "CONST"
    ],
    "methodTags": [
      "CONSTRUCTION",
      "RECURRENCE-REFORMULATION",
      "BOUNDING",
      "AUXILIARY-OBJECT",
      "INDUCTION"
    ],
    "t25Bridges": [
      "BR-I"
    ],
    "overlap": "red",
    "bridgeNeeds": [
      "Recurrence-growth bounds via characteristic roots",
      "Injective/surjective combinatorial encodings",
      "Forbidden-pattern counting",
      "Research-style partial-progress discipline for the open part"
    ],
    "assessmentRole": "open-problem",
    "classificationConfidence": "high",
    "auditNote": "Part (a) already exceeds ordinary T25 combinatorics through asymptotic recurrence bounds; part (b) is explicitly open and must remain outside normal full-solution mastery expectations.",
    "t25Targets": [
      "A2",
      "A5",
      "P2"
    ]
  }
];
