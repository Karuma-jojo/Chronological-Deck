// First SMMC authoring units.
// These are neutral training units: they do not quote, paraphrase, or identify historical SMMC PYQs.

export const SMMC_UNITS_V1 = Object.freeze([
  {
    id: "S-METHOD-B1-U01",
    moduleId: "S-METHOD-B1",
    kind: "method",
    orderWithinModule: 1,
    title: "Choose the quantity before bounding it",
    t25Targets: ["A3", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "A useful bound starts by deciding exactly what quantity must become large or small.",
      "Then choose a representation whose denominator/numerator moves in the helpful direction.",
      "Never reverse an inequality when replacing a denominator: for positive quantities, an upper bound on the denominator gives a lower bound on the fraction.",
      "A sharp bound needs two parts: prove the inequality, then exhibit equality or a sequence approaching the constant."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-MB1-01",
    transferTaskId: "S-NEUTRAL-MB1-02",
    completionEvidence: [
      "identifies the target direction before manipulating",
      "uses a legal bound with the correct inequality direction",
      "justifies sharpness separately from validity"
    ]
  },
  {
    id: "S-BRIDGE-N1-U01",
    moduleId: "S-BRIDGE-N1",
    kind: "bridge",
    orderWithinModule: 1,
    title: "Euclid, Bézout and solvable congruences",
    t25Targets: ["F4"],
    prerequisiteUnits: [],
    learningNote: [
      "For integers a,b not both zero, gcd(a,b) is the smallest positive integer obtainable as au+bv with integers u,v.",
      "The Euclidean algorithm computes the gcd; back-substitution produces one Bézout pair.",
      "The linear congruence ax≡c (mod m) is solvable exactly when gcd(a,m) divides c.",
      "After dividing by that gcd, the reduced coefficient is invertible modulo the reduced modulus.",
      "Do not cancel a factor modulo m unless the cancellation is justified by coprimality or by first reducing the modulus correctly."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-N1-01",
    transferTaskId: "S-NEUTRAL-N1-02",
    completionEvidence: [
      "runs Euclid correctly",
      "back-substitutes a Bézout identity",
      "uses the gcd solvability criterion for a linear congruence",
      "states the complete residue-class solution"
    ]
  },
  {
    id: "S-BRIDGE-GR1-U01",
    moduleId: "S-BRIDGE-GR1",
    kind: "bridge",
    orderWithinModule: 1,
    title: "Degrees, components and cycle structure",
    t25Targets: ["F4"],
    prerequisiteUnits: [],
    learningNote: [
      "A finite simple graph consists of vertices and unordered edges with no loops or duplicate edges.",
      "The degree of a vertex is the number of incident edges; a connected component is a maximal set joined by paths.",
      "If every vertex in a finite connected simple graph has degree 2, begin walking without immediately reversing direction.",
      "Finiteness forces a repeated vertex; degree 2 prevents a branch from leaving the resulting cycle.",
      "Connectedness then forces every vertex of that component onto the same cycle."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-GR1-01",
    transferTaskId: "S-NEUTRAL-GR1-02",
    completionEvidence: [
      "uses graph degree/component language correctly",
      "proves rather than assumes the cycle decomposition",
      "translates a verbal relation into graph structure"
    ]
  },
  {
    id: "S-METHOD-K1-U01",
    moduleId: "S-METHOD-K1",
    kind: "method",
    orderWithinModule: 1,
    title: "Encode an object so it can be recovered",
    t25Targets: ["P2", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "A bijective counting argument needs an encoding and a recovery rule.",
      "Do not stop after mapping objects forward: prove that every code comes from exactly one original object.",
      "Good encodings replace a variable-looking object by fixed slots, marks or separators.",
      "When the transformation is reversible, the two sets have exactly the same size even if direct counting on one side is awkward."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-K1-01",
    transferTaskId: "S-NEUTRAL-K1-02",
    completionEvidence: [
      "defines an explicit encoding",
      "gives a recovery map or uniqueness argument",
      "distinguishes positive from nonnegative integer parts"
    ]
  },
  {
    id: "S-BRIDGE-AN1-U01",
    moduleId: "S-BRIDGE-AN1",
    kind: "bridge",
    orderWithinModule: 1,
    title: "Positive-series comparison and harmonic divergence",
    t25Targets: ["A2", "A5"],
    prerequisiteUnits: [],
    learningNote: [
      "For a positive-term series, comparison preserves the direction of difficulty: if 0≤b_n≤a_n and Σb_n diverges, then Σa_n diverges; if 0≤a_n≤b_n and Σb_n converges, then Σa_n converges.",
      "A divergent subseries forces the full positive series to diverge.",
      "The harmonic series diverges by grouping terms in dyadic blocks: each block from 2^k+1 through 2^(k+1) contributes at least 1/2.",
      "When comparing, state the inequality for all sufficiently large n and keep the comparison constant explicit."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-AN1-01",
    transferTaskId: "S-NEUTRAL-AN1-02",
    completionEvidence: [
      "proves harmonic divergence by a valid block argument",
      "chooses the correct comparison direction for divergence",
      "states why finite initial terms do not affect convergence"
    ]
  },
  {
    id: "S-METHOD-X1-U01",
    moduleId: "S-METHOD-X1",
    kind: "method",
    orderWithinModule: 1,
    title: "Introduce an auxiliary object that exposes structure",
    t25Targets: ["A3", "M0"],
    prerequisiteUnits: [],
    learningNote: [
      "An auxiliary object is useful only if it converts the original claim into a statement with clearer structure.",
      "Typical moves include introducing differences, partial sums, a graph, a polynomial, or a transformed variable.",
      "The new object must be reversible enough that information proved about it can be translated back to the original problem.",
      "After introducing it, state explicitly what property has become simpler and why."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-X1-01",
    transferTaskId: "S-NEUTRAL-X1-02",
    completionEvidence: [
      "introduces a useful transformed object rather than decorative notation",
      "proves the transformed statement cleanly",
      "translates the conclusion back to the original variables"
    ]
  },
  {
    id: "S-BRIDGE-N1-U02",
    moduleId: "S-BRIDGE-N1",
    kind: "bridge",
    orderWithinModule: 2,
    title: "Chinese remainders and coprime residue counting",
    t25Targets: ["F4", "P2"],
    prerequisiteUnits: ["S-BRIDGE-N1-U01"],
    learningNote: [
      "For pairwise coprime moduli, a compatible choice of one residue modulo each modulus determines exactly one residue class modulo their product.",
      "Constructively, solve two congruences by substituting one into the other and using a modular inverse.",
      "For a square-free modulus m=p1...pr, a residue is coprime to m exactly when it is nonzero modulo every prime pi.",
      "CRT therefore gives φ(m)=Π(pi-1) for square-free m.",
      "State uniqueness modulo the full product, not just one numerical solution."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-N1-03",
    transferTaskId: "S-NEUTRAL-N1-04",
    completionEvidence: [
      "combines pairwise-coprime congruences correctly",
      "states uniqueness modulo the product",
      "counts coprime residue classes using prime-modulus choices"
    ]
  },
  {
    id: "S-METHOD-I1-U01",
    moduleId: "S-METHOD-I1",
    kind: "method",
    orderWithinModule: 1,
    title: "Strengthen the induction claim until the step closes",
    t25Targets: ["F4", "A5"],
    prerequisiteUnits: [],
    learningNote: [
      "If an induction step needs information not contained in P(n), the right repair is often to strengthen the statement rather than force the algebra.",
      "Carry a block of neighbouring states, an invariant, or several claims simultaneously.",
      "Choose base cases large enough to initialize every component of the stronger statement.",
      "Then make the induction step reproduce the same package of information at the next index."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-I1-01",
    transferTaskId: "S-NEUTRAL-I1-02",
    completionEvidence: [
      "states a strengthened induction hypothesis explicitly",
      "chooses enough base cases for the strengthened statement",
      "shows the stronger statement reproduces itself under the recurrence or shift"
    ]
  }
]);

export default SMMC_UNITS_V1;
