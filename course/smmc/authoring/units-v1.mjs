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
  }
]);

export default SMMC_UNITS_V1;
