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
  },
  {
    id: "S-METHOD-W1-U01",
    moduleId: "S-METHOD-W1",
    kind: "method",
    orderWithinModule: 1,
    title: "Turn scratch reasoning into a marker-ready proof",
    t25Targets: ["F4"],
    prerequisiteUnits: [],
    learningNote: [
      "A contest proof must expose the logical chain that scratchwork often leaves implicit.",
      "Begin by stating the assumptions and the exact claim, then make each implication auditable: name the quantity being used, justify divisions or cancellations, and close every case you open.",
      "A useful proof paragraph usually has a local claim, the reason it follows, and the consequence needed next.",
      "Do not replace proof with examples or phrases such as 'clearly' when the omitted step carries real content.",
      "For partial credit, isolate a correct lemma or reduction and state precisely what remains unproved rather than overclaiming a complete solution."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-W1-01",
    transferTaskId: "S-NEUTRAL-W1-02",
    completionEvidence: [
      "states assumptions and target explicitly",
      "makes every nontrivial implication and case closure visible",
      "justifies algebraic operations that require nonzero or sign conditions",
      "ends with the requested conclusion rather than stopping at an equivalent intermediate statement"
    ]
  },
  {
    id: "S-METHOD-C1-U01",
    moduleId: "S-METHOD-C1",
    kind: "method",
    orderWithinModule: 1,
    title: "Build exhaustive cases and extract reusable lemmas",
    t25Targets: ["A3", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "Before computing, choose a case variable whose possible states cover every allowed input.",
      "State cases so exactly one applies; assign equality and other boundary values explicitly instead of leaving them between cases.",
      "If the same reasoning would be repeated, isolate it as a lemma, prove it once, and cite it where needed.",
      "Prove the structural classification before doing case-specific algebra, then reassemble the cases into the exact requested conclusion.",
      "When a problem asks for a classification, existence, uniqueness or sharpness are separate obligations: do not let solving one case stand in for closing the whole proof."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-C1-01",
    transferTaskId: "S-NEUTRAL-C1-02",
    completionEvidence: [
      "chooses an exhaustive nonoverlapping case partition with boundaries assigned",
      "extracts and proves a reusable subclaim instead of duplicating reasoning",
      "closes every case and reassembles the requested global statement",
      "separates necessary and sufficient directions when giving a classification"
    ]
  },
  {
    id: "S-METHOD-E1-U01",
    moduleId: "S-METHOD-E1",
    kind: "method",
    orderWithinModule: 1,
    title: "Choose an extremal object or minimal counterexample",
    t25Targets: ["A3", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "An extremal proof chooses an allowed object that maximizes or minimizes a clearly named quantity, then uses extremality to forbid improvable local structure.",
      "The comparison move must preserve every constraint; compute the change in the objective instead of saying only that the new object is 'better'.",
      "A minimal-counterexample proof is the same architecture with a smallest bad input: reduce it to strictly smaller valid inputs, apply minimality there, and reconstruct the forbidden conclusion.",
      "Always justify that an extremal or least object exists, and make the strict improvement or strict descent explicit.",
      "Once extremality forces the local structure, finish the original existence, classification, or sharpness claim rather than stopping at the contradiction."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-E1-01",
    transferTaskId: "S-NEUTRAL-E1-02",
    completionEvidence: [
      "names the extremal object and objective and justifies existence",
      "uses a constraint-preserving local modification with a computed strict improvement",
      "derives forced structure from extremality and converts it into the requested optimum",
      "uses strict descent correctly in a minimal-counterexample argument"
    ]
  },
  {
    id: "S-METHOD-S1-U01",
    moduleId: "S-METHOD-S1",
    kind: "method",
    orderWithinModule: 1,
    title: "Exploit symmetry, parity and normalization",
    t25Targets: ["A3", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "A symmetry reduction is valid only after naming a transformation that preserves the assumptions and the quantity or claim being studied; that is what makes a without-loss-of-generality step reversible.",
      "Normalization removes irrelevant scale or location only when the problem is invariant under that change, and the inverse map back to the original variables must remain available.",
      "Parity is an invariant modulo two: before claiming it is preserved, calculate exactly how one legal move changes the tracked quantity.",
      "Symmetry identifies equivalent cases, normalization removes a redundant degree of freedom, and parity rules out unreachable states; do not use these labels as substitutes for the preserving calculation.",
      "After reducing the problem, prove both directions needed for an exact classification: every original object maps into the reduced model, and every claimed reduced possibility can be realized."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-S1-01",
    transferTaskId: "S-NEUTRAL-S1-02",
    completionEvidence: [
      "justifies a normalization by an invariant transformation and keeps the reverse interpretation",
      "uses symmetry only after proving omitted cases are equivalent",
      "identifies and proves a parity invariant from the legal move",
      "pairs an invariant obstruction with a construction when an exact reachability classification is requested"
    ]
  },
  {
    id: "S-BRIDGE-AN2-U01",
    moduleId: "S-BRIDGE-AN2",
    kind: "bridge",
    orderWithinModule: 1,
    title: "Extrema, compactness and integrability consequences",
    t25Targets: ["A5", "C1", "C6", "F4"],
    prerequisiteUnits: [],
    learningNote: [
      "For a nonempty set of real numbers bounded above, s=sup A means s is an upper bound and every number below s fails to be an upper bound; equivalently, for every ε>0 some a∈A satisfies s-ε<a≤s.",
      "Nested nonempty closed intervals behave like a compact existence machine: if I_{n+1}⊆I_n and their lengths tend to zero, the lower endpoints have a supremum lying in every interval, and shrinking length makes that common point unique.",
      "For a continuous function on a closed bounded interval, the extreme value theorem guarantees attained maxima and minima; the closed/compact hypothesis matters and should not be silently dropped.",
      "Under the ordinary compact-interval Riemann/Darboux convention used here, Riemann-integrable functions are bounded. Integrability alone does not imply continuity or attainment of a supremum.",
      "Changing an otherwise Riemann-integrable function at finitely many points preserves Riemann integrability and the integral; this is useful for building counterexamples without changing the area."
    ].join(" "),
    mainTaskId: "S-NEUTRAL-AN2-01",
    transferTaskId: "S-NEUTRAL-AN2-02",
    completionEvidence: [
      "uses a supremum with both upper-bound and approximation logic rather than treating it automatically as a maximum",
      "proves existence and uniqueness for shrinking nested closed intervals",
      "distinguishes compact-interval continuity consequences from weaker Riemann-integrability consequences",
      "uses boundedness to control a definite integral without inventing continuity"
    ]
  }
]);

export default SMMC_UNITS_V1;
