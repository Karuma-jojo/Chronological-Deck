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
  }
]);

export default SMMC_UNITS_V1;
