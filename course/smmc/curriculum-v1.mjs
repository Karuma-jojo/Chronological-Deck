// SMMC companion curriculum architecture v1.0
// Evidence-derived from the complete 2017–2025 official corpus.
// This file defines training objects, not learner-facing lesson prose.

export const SMMC_CONTENT_MODULES = Object.freeze([
  {
    id: "S-BRIDGE-N1",
    title: "Contest number theory beyond BR-N",
    tier: "core-bridge",
    purpose: "Extend T25's elementary integer/parity bridge into the recurring SMMC arithmetic toolkit without becoming a full abstract-number-theory course.",
    scope: [
      "gcd and Euclidean reasoning",
      "prime-factor and square-free structure",
      "modular arithmetic beyond parity",
      "Chinese remainder theorem and Euler-totient use",
      "rational-root and integer-polynomial obstructions",
      "factorial/binomial divisibility",
      "introductory p-adic valuations and prime-power divisibility",
      "elementary Diophantine normalization and descent"
    ],
    evidence: [
      "SMMC-2017-A3","SMMC-2017-B2","SMMC-2019-A1","SMMC-2019-A3",
      "SMMC-2019-B2","SMMC-2021-A2","SMMC-2021-B4","SMMC-2022-A4",
      "SMMC-2023-C1","SMMC-2023-B4","SMMC-2025-C2"
    ]
  },
  {
    id: "S-BRIDGE-GR1",
    title: "Graphs and discrete structural reductions",
    tier: "core-bridge",
    purpose: "Supply the graph language and structural reductions repeatedly assumed by SMMC solutions but absent from canonical T25.",
    scope: [
      "vertices, edges, degree and components",
      "paths, cycles and trees",
      "2-regular graphs as cycle unions",
      "cliques and support compression",
      "graph distance and guarding/pursuit language",
      "matrix-to-graph and geometry-to-graph translation",
      "elementary P/N position language for finite impartial games"
    ],
    evidence: [
      "SMMC-2017-A1","SMMC-2017-B3","SMMC-2018-B3","SMMC-2019-B3",
      "SMMC-2021-A3","SMMC-2022-B3","SMMC-2023-C4"
    ]
  },
  {
    id: "S-BRIDGE-AN1",
    title: "Infinite series and asymptotic constructions",
    tier: "core-bridge",
    purpose: "Add exactly the series/comparison machinery that T25 intentionally omits but SMMC repeatedly uses.",
    scope: [
      "positive-series comparison",
      "subseries divergence and harmonic benchmark",
      "alternating-series remainder control",
      "block and scale constructions",
      "asymptotic comparison of recursively defined quantities",
      "finite-to-infinite bound passage",
      "counterexample engineering with convergent/divergent series"
    ],
    evidence: [
      "SMMC-2019-A4","SMMC-2019-B2","SMMC-2020-A3",
      "SMMC-2022-C2","SMMC-2024-C3","SMMC-2024-A4"
    ]
  },
  {
    id: "S-BRIDGE-AN2",
    title: "Elementary real analysis and convex structure",
    tier: "core-bridge",
    purpose: "Bridge T25 calculus to the compactness, regularity and convex-envelope ideas that recur in harder SMMC analysis problems.",
    scope: [
      "infimum and supremum as proof tools",
      "compact-interval extrema",
      "nested compact-set existence",
      "one-sided limsup/liminf reasoning at contest depth",
      "boundedness consequences of Riemann integrability",
      "regularity bootstrapping from integral identities",
      "one-dimensional convex functions and upper/lower envelopes",
      "supporting chord/tangent arguments"
    ],
    evidence: [
      "SMMC-2017-A4","SMMC-2021-A4","SMMC-2021-B3",
      "SMMC-2023-A2","SMMC-2025-C4"
    ]
  },
  {
    id: "S-BRIDGE-GF1",
    title: "Generating functions and elementary first-order ODEs",
    tier: "core-bridge",
    purpose: "Handle the recurring recurrence-to-generating-function-to-ODE pattern without building a full differential-equations course.",
    scope: [
      "ordinary generating functions as formal encodings",
      "convolution-to-product translation",
      "differentiating generating-function recurrences",
      "separable and first-order linear ODEs",
      "qualitative monotonicity/concavity of elementary ODE solutions",
      "coefficient and limiting-density extraction at contest depth"
    ],
    evidence: [
      "SMMC-2018-A3","SMMC-2018-A4","SMMC-2024-C4"
    ]
  },
  {
    id: "S-BRIDGE-GEO1",
    title: "Structural geometry beyond coordinate geometry",
    tier: "core-bridge",
    purpose: "Add geometric structures that recur but are not worth replacing T25 geometry with a full olympiad-synthetic course.",
    scope: [
      "convex hulls and polygon structure",
      "Minkowski sums",
      "lattice and midpoint geometry",
      "tilings and dissections",
      "spatial incidence at elementary level",
      "vector/Gram reformulations when useful"
    ],
    evidence: [
      "SMMC-2017-B1","SMMC-2017-B3","SMMC-2018-A1",
      "SMMC-2020-A4","SMMC-2025-B2"
    ]
  },
  {
    id: "S-SPECIAL-ALG1",
    title: "Finite fields and polynomial algebra",
    tier: "specialist",
    purpose: "Unlock a small set of advanced algebraic SMMC problems without making abstract algebra part of the mandatory core.",
    scope: [
      "F_p as a finite field",
      "vector spaces and matrices over F_p",
      "finite-field extensions at introductory level",
      "Frobenius automorphism",
      "cyclic multiplicative groups",
      "polynomial factorisation/irreducibility over finite fields",
      "projective-line/plane constructions only where demanded"
    ],
    evidence: [
      "SMMC-2020-B4","SMMC-2024-B4","SMMC-2025-A2"
    ]
  },
  {
    id: "S-SPECIAL-ALG2",
    title: "Operator and function-space methods",
    tier: "specialist",
    purpose: "Provide a bounded route to rare linear-operator/function-space problems rather than inflating the general T25 linear-algebra syllabus.",
    scope: [
      "linear operators on finite-dimensional function spaces",
      "complexification and spectral decomposition at contest depth",
      "operator-generated recurrence sequences",
      "compact-subsequence ideas for oscillatory eigenvalues",
      "derivative bootstrapping to polynomiality"
    ],
    evidence: ["SMMC-2025-A4"]
  },
  {
    id: "S-SPECIAL-NT2",
    title: "Gaussian integers and perfect-power Diophantine methods",
    tier: "specialist",
    purpose: "Support rare open/research-flavoured Diophantine problems without making algebraic number theory a mandatory SMMC prerequisite.",
    scope: [
      "Gaussian integers and units",
      "norm and factorisation",
      "unique-factorisation reasoning at elementary contest depth",
      "Gaussian/p-adic valuation arguments",
      "perfect-power Diophantine bounding"
    ],
    evidence: ["SMMC-2025-B4"]
  }
]);

export const SMMC_METHOD_MODULES = Object.freeze([
  {
    id: "S-METHOD-B1",
    title: "Bounding, comparison and sharpness",
    evidenceCountAll: 41,
    evidenceCountNonGreen: 24,
    skills: ["choose the right quantity to bound","preserve inequality direction and strictness","find equality/sharpness examples","turn local bounds into global conclusions"]
  },
  {
    id: "S-METHOD-C1",
    title: "Case architecture and lemma extraction",
    evidenceCountAll: 46,
    note: "Combined signal from CASE-DECOMPOSITION (34) and LEMMA-EXTRACTION (12); overlap is allowed.",
    skills: ["choose exhaustive nonoverlapping cases","extract reusable subclaims","separate existence uniqueness and sharpness","compress repeated reasoning into a lemma"]
  },
  {
    id: "S-METHOD-K1",
    title: "Construction, encoding and bijection",
    evidenceCountAll: 35,
    note: "Combined signal from CONSTRUCTION (29) and BIJECTION (6); overlap is allowed.",
    skills: ["explicit constructions","recursive constructions","recoverability/injectivity","encode processes by simpler objects","prove surjectivity when needed"]
  },
  {
    id: "S-METHOD-X1",
    title: "Auxiliary objects and cross-domain translation",
    evidenceCountAll: 54,
    note: "Combined signal from AUXILIARY-OBJECT (26) and CROSS-DOMAIN (28); overlap is allowed.",
    skills: ["replace geometry by vectors/matrices","replace sparse matrices by graphs","replace probability by recurrences","introduce potentials/invariants","choose representations that expose structure"]
  },
  {
    id: "S-METHOD-I1",
    title: "Stronger induction, recurrences and invariants",
    evidenceCountAll: 40,
    note: "INDUCTION (19), RECURRENCE-REFORMULATION (13), INVARIANT (8); overlap is allowed. This extends rather than duplicates T25 BR-I.",
    skills: ["strengthen induction hypotheses","induct on the useful parameter","discover a recurrence before solving it","design invariants/monovariants","use trapping regions in discrete dynamics"]
  },
  {
    id: "S-METHOD-E1",
    title: "Extremal and minimal-counterexample reasoning",
    evidenceCountAll: 8,
    note: "EXTREMAL (6) plus MINIMAL-COUNTEREXAMPLE (2).",
    skills: ["choose an extremal object","derive forced local structure","minimal-counterexample descent","mass shifting and compression"]
  },
  {
    id: "S-METHOD-S1",
    title: "Symmetry, parity and normalization",
    evidenceCountAll: 33,
    note: "SYMMETRY (13), PARITY (8), NORMALIZATION (12); overlap is allowed.",
    skills: ["quotient by symmetry","normalize scale/location","use parity as an invariant","recognize equivalent cases"]
  },
  {
    id: "S-METHOD-O1",
    title: "Open-problem partial progress",
    evidenceCountAll: 9,
    note: "One B4-style open/research item is retained for each audited year.",
    skills: ["solve special cases","derive upper/lower bounds","reduce to a smaller subproblem","record computational patterns without claiming proof","write rigorous partial results"]
  },
  {
    id: "S-METHOD-W1",
    title: "Contest proof writing",
    evidenceCountAll: 88,
    skills: ["state assumptions explicitly","make quantifiers/cases visible","close every implication","write partial progress for credit","convert scratch reasoning into marker-readable proof"]
  }
]);

export const SMMC_LEARNING_OBJECT_TYPES = Object.freeze([
  "S-BRIDGE",
  "S-METHOD",
  "S-XFER",
  "S-PAPER"
]);

export const SMMC_UNLOCK_POLICY = Object.freeze({
  green: "Unlock a sealed S-XFER once mapped T25 prerequisites and any existing T25 bridges are cleared.",
  amber: "Clear mapped T25 prerequisites, then the bounded S-BRIDGE/S-METHOD gap, then unlock S-XFER.",
  red: "Use development problems only after the relevant specialist/core bridge; do not treat the historical problem as an ordinary T25 transfer gate.",
  openProblem: "Score rigorous partial progress separately from complete solution status."
});

export const SMMC_VISIBILITY_POLICY = Object.freeze({
  development: "May expose domain/method metadata after an honest attempt; solutions remain private until review.",
  transfer: "Before first attempt expose only the problem statement, timing rules and permitted prerequisites. Hide domain, method, bridge, solution and evaluator metadata.",
  sealed: "Hide all private metadata and preserve whole-paper timing. Do not reveal likely method, domain, answer shape or case count.",
  evaluator: "May read private solutions/tags but may not leak them into learner-facing WALL responses."
});

export const SMMC_ASTER_POLICY = Object.freeze({
  optional: true,
  mathAuthority: "Frozen SMMC task and evaluator, never story state.",
  clearanceAuthority: "SMMC evidence state, never fiction.",
  forbiddenLeaks: [
    "primary domain",
    "recommended method",
    "number of cases",
    "answer shape",
    "warm/cold feedback",
    "story metaphors that encode the mathematical breakthrough"
  ],
  noPenaltyFor: ["time spent", "wrong attempts", "requesting a neutral tool lesson", "abandoning and returning later"],
  recommendedUse: "Narrative consequence after attempt/review; never before or during WALL in a way that changes mathematical information."
});
