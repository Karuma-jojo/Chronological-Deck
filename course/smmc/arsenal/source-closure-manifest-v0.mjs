// SMMC Arsenal Gate 2 — canonical-source closure manifest v0.
//
// Purpose: make the final raw-source saturation decision auditable rather than
// relying on a hand-picked positive sentinel list.
//
// Gate-2 meaning only:
// - HARVEST ids are raw source candidates, not final ontology cards.
// - EXCLUDE decisions say only that a source heading/item does not satisfy this
//   bounded harvest rule as an independent raw row.
// - No exclusion is a later-gate granularity/importance/ranking judgment.

export const ARSENAL_GATE2_SOURCE_CLOSURE_RULE = Object.freeze({
  version: "v0",
  inclusionRule: "Preserve source-specific terms explicitly presented as strategies, tactics, tools, principles, methods, algorithms/proof styles, or structured proof moves; also preserve named specialist methods from the designated TOC/index/summary zones when they are plausible contest-solving machinery.",
  exclusionRule: "Exclude only pure organizational containers, generic problem buckets, notation/software scaffolding, subject/example headings without an independent move, or implementation details subordinate to an already harvested named method. Every exclusion must carry a source locator and reason.",
  sameLookingTerms: "Source-specific same-looking terms remain separate until later tribunal gates.",
  gate3StillClosed: true,
});

export const ARSENAL_GATE2_SOURCE_CLOSURE_ZONES = Object.freeze([
  {
    sourceId: "S1-ZEITZ-2007-2E",
    zoneId: "ZEITZ-TOC-STRATEGY-TACTIC",
    startPage: 14,
    endPage: 17,
    note: "Contents zones that explicitly frame strategies, methods of argument, tactics, transformations, and named tools."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    zoneId: "ZEITZ-INDEX-METHODS",
    startPage: 377,
    endPage: 383,
    note: "Index sweep for explicit strategy/tactic/tool/principle/method/algorithm/proof-style and plausible specialist-method entries."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    zoneId: "ZEITZ-EXPLICIT-FOLLOWUPS",
    startPage: 31,
    endPage: 369,
    note: "Only exact pages reached from the reviewed TOC/index terms were inspected for source wording; this is not a page-by-page whole-book noun harvest."
  },
  {
    sourceId: "S2-ENGEL-1998",
    zoneId: "ENGEL-TOC-STRATEGY",
    startPage: 7,
    endPage: 8,
    note: "Contents chapter titles explicitly framed as higher problem-solving principles/strategies."
  },
  {
    sourceId: "S2-ENGEL-1998",
    zoneId: "ENGEL-FURTHER-STRATEGIES",
    startPage: 373,
    endPage: 389,
    note: "Chapter 14 explicitly says it collects further important strategies; every subsection heading and explicit strategy statement was reviewed."
  },
  {
    sourceId: "S2-ENGEL-1998",
    zoneId: "ENGEL-INDEX-METHODS",
    startPage: 399,
    endPage: 401,
    note: "Index sweep for named principles, algorithms, proofs, encodings, recurrences, involutions, and closely related reusable moves."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    zoneId: "HAMMACK-TOC-PROOF-STRUCTURES",
    startPage: 3,
    endPage: 6,
    note: "Contents sweep of counting principles and Parts II–III proof/disproof/induction structures."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    zoneId: "HAMMACK-PROOF-STRUCTURE-FOLLOWUP",
    startPage: 150,
    endPage: 205,
    note: "Exact proof-structure sections reached from the TOC were checked for nested/combined and equivalent-statement structures."
  },
  {
    sourceId: "S4-VELLEMAN-2006-2E",
    zoneId: "VELLEMAN-SUMMARY",
    startPage: 390,
    endPage: 393,
    note: "Complete Summary of Proof Techniques: every goal form, given form, and any-proof technique was reviewed."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    zoneId: "PUTNAM-TOC",
    startPage: 6,
    endPage: 10,
    note: "Complete contents sweep; named methods/theorems/specialist techniques and plausible contest machinery were harvested, while pure organizational/problem-bucket headings were explicitly excluded."
  }
]);

export const ARSENAL_GATE2_SOURCE_CLOSURE_HARVEST_IDS = Object.freeze([
  // S1-ZEITZ-2007-2E
  "RAW-SOURCE-z-orientation",
  "RAW-SOURCE-z-penultimate-step",
  "RAW-SOURCE-z-hands-dirty",
  "RAW-SOURCE-z-wishful-thinking",
  "RAW-SOURCE-z-make-easier",
  "RAW-SOURCE-z-draw-picture",
  "RAW-SOURCE-z-recast",
  "RAW-SOURCE-z-change-point-view",
  "RAW-SOURCE-z-symmetry",
  "RAW-SOURCE-z-extreme-principle",
  "RAW-SOURCE-z-pigeonhole",
  "RAW-SOURCE-z-invariants",
  "RAW-SOURCE-z-parity",
  "RAW-SOURCE-z-mod-color",
  "RAW-SOURCE-z-monovariants",
  "RAW-SOURCE-z-factor-tactic",
  "RAW-SOURCE-z-manipulating-squares",
  "RAW-SOURCE-z-substitutions-simplifications",
  "RAW-SOURCE-z-gaussian-pairing",
  "RAW-SOURCE-z-telescope-tool",
  "RAW-SOURCE-z-pie-indicator",
  "RAW-SOURCE-z-roots-unity-filter",
  "RAW-SOURCE-z-add-zero",
  "RAW-SOURCE-z-complete-square",
  "RAW-SOURCE-z-extract-squares",
  "RAW-SOURCE-z-catalyst",
  "RAW-SOURCE-z-reflection",
  "RAW-SOURCE-z-define-function",
  "RAW-SOURCE-z-partial-fractions",
  "RAW-SOURCE-z-modulo-filter",
  "RAW-SOURCE-z-angle-chasing",
  "RAW-SOURCE-z-draw-auxiliary",
  "RAW-SOURCE-z-generalize",
  "RAW-SOURCE-z-similar-problem",
  "RAW-SOURCE-z-opportunistic",
  "RAW-SOURCE-z-optimistic",
  "RAW-SOURCE-z-peripheral-vision",
  "RAW-SOURCE-z-phantom-point",
  "RAW-SOURCE-z-produce-contradiction",
  "RAW-SOURCE-z-complex-tactic",
  "RAW-SOURCE-z-gf-tactic",
  "RAW-SOURCE-z-graph-tactic",
  "RAW-SOURCE-z-modular-tactic",
  "RAW-SOURCE-z-monotonize",
  "RAW-SOURCE-z-geometric-series-tool",
  "RAW-SOURCE-z-identity-principle",
  "RAW-SOURCE-z-invent-font",
  "RAW-SOURCE-z-monic-polynomial",
  "RAW-SOURCE-z-trig-tool",
  "RAW-SOURCE-z-undetermined-coeff",
  "RAW-SOURCE-z-weights",
  "RAW-SOURCE-z-shearing",
  "RAW-SOURCE-z-encoding",
  "RAW-SOURCE-z-count-complement",
  "RAW-SOURCE-z-partitioning",
  "RAW-SOURCE-z-inclusion-exclusion",
  "RAW-SOURCE-z-strategy-term",
  "RAW-SOURCE-z-tactic-term",
  "RAW-SOURCE-z-tool-term",
  "RAW-SOURCE-z-crux-move",
  "RAW-SOURCE-z-investigation",
  "RAW-SOURCE-z-numerical-experiment",
  "RAW-SOURCE-z-mental-toughness",
  "RAW-SOURCE-z-creativity",
  "RAW-SOURCE-z-argument-contradiction",
  "RAW-SOURCE-z-mathematical-induction",
  "RAW-SOURCE-z-crossover-tactic",
  "RAW-SOURCE-z-division-algorithm",
  "RAW-SOURCE-z-combinatorial-proof",
  "RAW-SOURCE-z-rigid-motions-vectors",
  "RAW-SOURCE-z-translation",
  "RAW-SOURCE-z-glide-reflection",
  "RAW-SOURCE-z-rotation",
  "RAW-SOURCE-z-log-differentiation",
  "RAW-SOURCE-z-look-patterns",
  "RAW-SOURCE-z-brainstorming",
  "RAW-SOURCE-z-backburner",
  "RAW-SOURCE-z-break-rules",
  "RAW-SOURCE-z-restate",
  "RAW-SOURCE-z-steal-ideas",
  "RAW-SOURCE-z-backward-induction",
  "RAW-SOURCE-z-area-proof",
  "RAW-SOURCE-z-bisection",
  "RAW-SOURCE-z-repeated-bisection",
  "RAW-SOURCE-z-average-principle",
  "RAW-SOURCE-z-algorithmic-proof",
  "RAW-SOURCE-z-euclidean-algorithm",
  "RAW-SOURCE-z-mobius-inversion",
  "RAW-SOURCE-z-pick-theorem",
  "RAW-SOURCE-z-well-ordering",
  "RAW-SOURCE-z-symmetry-product",
  "RAW-SOURCE-z-homothety",
  "RAW-SOURCE-z-inversion",
  "RAW-SOURCE-z-order-from-chaos",
  // S2-ENGEL-1998
  "RAW-SOURCE-e-invariance-principle",
  "RAW-SOURCE-e-coloring-proofs",
  "RAW-SOURCE-e-extremal-principle",
  "RAW-SOURCE-e-box-principle",
  "RAW-SOURCE-e-induction-principle",
  "RAW-SOURCE-e-working-backwards",
  "RAW-SOURCE-e-greedy",
  "RAW-SOURCE-e-divide-conquer",
  "RAW-SOURCE-e-sum-rule",
  "RAW-SOURCE-e-product-rule",
  "RAW-SOURCE-e-product-sum-rule",
  "RAW-SOURCE-e-count-bijection",
  "RAW-SOURCE-e-count-two-ways",
  "RAW-SOURCE-e-infinite-descent",
  "RAW-SOURCE-e-conjugate-numbers",
  "RAW-SOURCE-e-coding",
  "RAW-SOURCE-e-decoding",
  "RAW-SOURCE-e-automatic-solution",
  "RAW-SOURCE-e-bijective-proof",
  "RAW-SOURCE-e-combinatorial-proof",
  "RAW-SOURCE-e-heuristic-principle",
  "RAW-SOURCE-e-probabilistic-interpretation",
  "RAW-SOURCE-e-pie",
  "RAW-SOURCE-e-rearrangement",
  "RAW-SOURCE-e-reflection-principle",
  "RAW-SOURCE-e-recursion",
  "RAW-SOURCE-e-sieve-formula",
  "RAW-SOURCE-e-winning-position",
  "RAW-SOURCE-e-losing-position",
  "RAW-SOURCE-e-trig-substitution",
  "RAW-SOURCE-e-transformation-geometry",
  "RAW-SOURCE-e-roots-unity",
  "RAW-SOURCE-e-characteristic-equation",
  "RAW-SOURCE-e-symmetry",
  "RAW-SOURCE-e-parity",
  "RAW-SOURCE-e-great-ideas",
  "RAW-SOURCE-e-graph-theory",
  "RAW-SOURCE-e-equations-functions-iterations",
  "RAW-SOURCE-e-integer-functions",
  "RAW-SOURCE-e-eliminate-floor-ceiling",
  "RAW-SOURCE-e-euclidean-algorithm",
  "RAW-SOURCE-e-difference-equations",
  "RAW-SOURCE-e-involution",
  "RAW-SOURCE-e-prufer-code",
  "RAW-SOURCE-e-cayley-formula",
  "RAW-SOURCE-e-binet-formula",
  // S3-HAMMACK-BOOK-OF-PROOF-3.4
  "RAW-SOURCE-h-direct-proof",
  "RAW-SOURCE-h-using-cases",
  "RAW-SOURCE-h-contrapositive-proof",
  "RAW-SOURCE-h-contradiction-proof",
  "RAW-SOURCE-h-iff-proof",
  "RAW-SOURCE-h-existence-proof",
  "RAW-SOURCE-h-uniqueness-proof",
  "RAW-SOURCE-h-constructive-proof",
  "RAW-SOURCE-h-nonconstructive-proof",
  "RAW-SOURCE-h-induction",
  "RAW-SOURCE-h-strong-induction",
  "RAW-SOURCE-h-smallest-counterexample",
  "RAW-SOURCE-h-combinatorial-proof",
  "RAW-SOURCE-h-counterexample",
  "RAW-SOURCE-h-disprove-existence",
  "RAW-SOURCE-h-disproof-contradiction",
  "RAW-SOURCE-h-treat-similar-cases",
  "RAW-SOURCE-h-statements-contradiction",
  "RAW-SOURCE-h-conditional-contradiction",
  "RAW-SOURCE-h-combining-techniques",
  "RAW-SOURCE-h-equivalent-statements",
  "RAW-SOURCE-h-existence-uniqueness",
  "RAW-SOURCE-h-multiplication-principle",
  "RAW-SOURCE-h-addition-subtraction",
  "RAW-SOURCE-h-inclusion-exclusion",
  "RAW-SOURCE-h-division-pigeonhole",
  "RAW-SOURCE-h-logical-inference",
  "RAW-SOURCE-h-prove-membership",
  "RAW-SOURCE-h-prove-subset",
  "RAW-SOURCE-h-prove-set-equality",
  // S4-VELLEMAN-2006-2E
  "RAW-SOURCE-v-reexpress-negative",
  "RAW-SOURCE-v-contradiction",
  "RAW-SOURCE-v-direct",
  "RAW-SOURCE-v-contrapositive",
  "RAW-SOURCE-v-conjunction-split",
  "RAW-SOURCE-v-disjunction",
  "RAW-SOURCE-v-cases",
  "RAW-SOURCE-v-biconditional",
  "RAW-SOURCE-v-arbitrary-object",
  "RAW-SOURCE-v-existence-witness",
  "RAW-SOURCE-v-induction",
  "RAW-SOURCE-v-strong-induction",
  "RAW-SOURCE-v-modus-ponens",
  "RAW-SOURCE-v-modus-tollens",
  "RAW-SOURCE-v-existential-instantiation",
  "RAW-SOURCE-v-universal-instantiation",
  "RAW-SOURCE-v-disjunctive-syllogism",
  "RAW-SOURCE-v-logical-form-goal",
  "RAW-SOURCE-v-expand-definition",
  "RAW-SOURCE-v-unique-existence-given",
  "RAW-SOURCE-v-unique-existence",
  "RAW-SOURCE-v-reexpress-unique-existence",
  "RAW-SOURCE-v-reexpress-negative-given",
  "RAW-SOURCE-v-split-conjunction-given",
  "RAW-SOURCE-v-disjunction-cases-given",
  "RAW-SOURCE-v-split-biconditional-given",
  // S5-GELCA-ANDREESCU-2007
  "RAW-SOURCE-p-contradiction",
  "RAW-SOURCE-p-induction",
  "RAW-SOURCE-p-pigeonhole",
  "RAW-SOURCE-p-ordered-extremal",
  "RAW-SOURCE-p-invariants-semi",
  "RAW-SOURCE-p-algebraic-identities",
  "RAW-SOURCE-p-cauchy-schwarz",
  "RAW-SOURCE-p-triangle-inequality",
  "RAW-SOURCE-p-am-gm",
  "RAW-SOURCE-p-viete",
  "RAW-SOURCE-p-search-pattern",
  "RAW-SOURCE-p-telescopic",
  "RAW-SOURCE-p-ivp",
  "RAW-SOURCE-p-convex-functions",
  "RAW-SOURCE-p-functional-equations",
  "RAW-SOURCE-p-trig-substitution",
  "RAW-SOURCE-p-infinite-descent",
  "RAW-SOURCE-p-factorization-divisibility",
  "RAW-SOURCE-p-crt",
  "RAW-SOURCE-p-generating-functions",
  "RAW-SOURCE-p-counting-strategies",
  "RAW-SOURCE-p-inclusion-exclusion",
  "RAW-SOURCE-p-probability-relations",
  "RAW-SOURCE-p-linear-recurrence",
  "RAW-SOURCE-p-location-zeros",
  "RAW-SOURCE-p-determinants",
  "RAW-SOURCE-p-eigen",
  "RAW-SOURCE-p-taylor-fourier",
  "RAW-SOURCE-p-partial-deriv",
  "RAW-SOURCE-p-first-order-ode",
  "RAW-SOURCE-p-euler-formula",
  "RAW-SOURCE-p-telescopic-trig",
  "RAW-SOURCE-p-greatest-integer",
  "RAW-SOURCE-p-modular",
  "RAW-SOURCE-p-totient",
  "RAW-SOURCE-p-pell",
  "RAW-SOURCE-p-ramsey",
  "RAW-SOURCE-p-combinatorial-identities",
  "RAW-SOURCE-p-equally-likely",
  "RAW-SOURCE-p-geometric-prob",
  "RAW-SOURCE-p-sturm",
  "RAW-SOURCE-p-poly-derivative",
  "RAW-SOURCE-p-irreducible-poly",
  "RAW-SOURCE-p-chebyshev-poly",
  "RAW-SOURCE-p-matrix-inverse",
  "RAW-SOURCE-p-linear-systems",
  "RAW-SOURCE-p-bases",
  "RAW-SOURCE-p-cayley-hamilton",
  "RAW-SOURCE-p-perron-frobenius",
  "RAW-SOURCE-p-limit-sequences",
  "RAW-SOURCE-p-mvt",
  "RAW-SOURCE-p-riemann-sums",
  "RAW-SOURCE-p-integral-ineq",
  "RAW-SOURCE-p-multi-integral",
  "RAW-SOURCE-p-stokes",
  "RAW-SOURCE-p-higher-ode",
  "RAW-SOURCE-p-vectors",
  "RAW-SOURCE-p-coord-lines-circles",
  "RAW-SOURCE-p-integrals-geometry",
  "RAW-SOURCE-p-trig-identities",
  "RAW-SOURCE-p-flt",
  "RAW-SOURCE-p-wilson",
  "RAW-SOURCE-p-linear-dio",
  "RAW-SOURCE-p-pythagoras-eq",
  "RAW-SOURCE-p-permutations",
  "RAW-SOURCE-p-planar-euler",
  "RAW-SOURCE-p-combinatorial-geometry",
  "RAW-SOURCE-p-positivity-squares",
  "RAW-SOURCE-p-matrix-operations",
  "RAW-SOURCE-p-binary-operations",
  "RAW-SOURCE-p-groups",
  "RAW-SOURCE-p-rings",
  "RAW-SOURCE-p-series",
  "RAW-SOURCE-p-limits-functions",
  "RAW-SOURCE-p-continuous-functions",
  "RAW-SOURCE-p-derivatives-applications",
  "RAW-SOURCE-p-indefinite-integrals",
  "RAW-SOURCE-p-definite-integrals",
  "RAW-SOURCE-p-ode-techniques",
  "RAW-SOURCE-p-conics-curves",
  "RAW-SOURCE-p-higher-dim-coord-geometry",
  "RAW-SOURCE-p-prime-numbers",
  "RAW-SOURCE-p-set-combinatorics",
  "RAW-SOURCE-p-binomial-counting",
]);

export const ARSENAL_GATE2_SOURCE_CLOSURE_EXCLUSIONS = Object.freeze([
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Psychological Strategies",
    pdfPage: 14,
    section: "2.1 Psychological Strategies",
    reason: "Organizational umbrella; its explicit child moves such as Mental Toughness and Creativity are reviewed separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Strategies for Getting Started",
    pdfPage: 14,
    section: "2.2 Strategies for Getting Started",
    reason: "Organizational umbrella; Orientation and the named getting-started moves are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Methods of Argument",
    pdfPage: 14,
    section: "2.3 Methods of Argument",
    reason: "Organizational umbrella; Argument by Contradiction and Mathematical Induction are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Common Abbreviations and Stylistic Conventions",
    pdfPage: 14,
    section: "2.3",
    reason: "Notation/writing convention material, not a reusable mathematical problem-solving move under the bounded rule."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Deduction and Symbolic Logic",
    pdfPage: 14,
    section: "2.3",
    reason: "Foundational formalism/exposition rather than a discrete strategy, tactic, tool, principle, algorithm, or proof structure."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Other Important Strategies",
    pdfPage: 14,
    section: "2.4 Other Important Strategies",
    reason: "Organizational umbrella; Draw a Picture, Recast the Problem, and Change Your Point of View are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Strategies and Tactics of Counting",
    pdfPage: 16,
    section: "6.1",
    reason: "Organizational umbrella; encoding, complement, partitioning, bijection, and inclusion–exclusion moves are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "General Strategy and Tactics",
    pdfPage: 16,
    section: "7.4 Diophantine Equations",
    reason: "Section umbrella without a single source-defined move; its concrete tactics are separately harvested when explicitly named."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "A Useful Tool",
    pdfPage: 351,
    section: "9.3",
    reason: "Generic heading; the concrete tool it introduces, Logarithmic Differentiation, is harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Algorithm",
    pdfPage: 377,
    section: "Index",
    reason: "Generic concept/index container; named algorithms and methods such as Division Algorithm and Euclidean Algorithm are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Algebraic Methods",
    pdfPage: 377,
    section: "Index",
    reason: "Index umbrella; named constituent operations/tools are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Combinatorial Strategies and Tactics",
    pdfPage: 378,
    section: "Index",
    reason: "Index umbrella; the concrete counting moves beneath it are harvested separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Tactics",
    pdfPage: 382,
    section: "Index",
    reason: "Index category label, not an independent move; its named entries are reviewed separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Tools",
    pdfPage: 382,
    section: "Index",
    reason: "Index category label, not an independent move; its named entries are reviewed separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Transformations",
    pdfPage: 383,
    section: "Index",
    reason: "Family/organizational container; Reflection, Shearing, Homothety, Inversion, Translation, Glide Reflection, Rotation, and Rigid Motions are represented separately."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Physical Proof of the Average Principle",
    pdfPage: 193,
    section: "5.5 Average Principle",
    reason: "A proof of one specific inequality principle, not presented as a general reusable proof form; Average Principle itself is harvested."
  },
  {
    sourceId: "S1-ZEITZ-2007-2E",
    term: "Algorithm for Inversion",
    pdfPage: 383,
    section: "Index — transformations, inversion",
    reason: "Implementation detail subordinate to the already harvested specialist method Inversion, not a separately framed problem-solving method."
  },
  {
    sourceId: "S2-ENGEL-1998",
    term: "Further Strategies",
    pdfPage: 373,
    section: "Chapter 14",
    reason: "Chapter umbrella; all six subsection strategy headings and the explicit floor/ceiling-elimination strategy are reviewed separately."
  },
  {
    sourceId: "S2-ENGEL-1998",
    term: "Algorithm",
    pdfPage: 399,
    section: "Index",
    reason: "Generic index container; named algorithms/encodings/recurrences are harvested separately."
  },
  {
    sourceId: "S2-ENGEL-1998",
    term: "Graph",
    pdfPage: 400,
    section: "Index",
    reason: "Generic object/index entry; the explicit Further Strategies subsection Graph Theory is harvested."
  },
  {
    sourceId: "S2-ENGEL-1998",
    term: "Integer Part",
    pdfPage: 400,
    section: "Index",
    reason: "Mathematical object/index term; the reusable strategy Get Rid of Floor and Ceiling Brackets is harvested instead."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Theorems",
    pdfPage: 5,
    section: "4.1 Theorems",
    reason: "Foundational exposition about theorem statements, not a proof move."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Definitions",
    pdfPage: 5,
    section: "4.2 Definitions",
    reason: "Foundational exposition about definitions, not an independently labelled proof structure in this source."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Congruence of Integers",
    pdfPage: 5,
    section: "5.2 Congruence of Integers",
    reason: "Subject/example material used to practice contrapositive proof, not a distinct proof structure."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Mathematical Writing",
    pdfPage: 5,
    section: "5.3 Mathematical Writing",
    reason: "Writing/presentation guidance rather than a mathematical proof structure."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Some Words of Advice",
    pdfPage: 5,
    section: "6.4 Some Words of Advice",
    reason: "Advice section rather than a distinct proof move."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Proving Non-Conditional Statements",
    pdfPage: 5,
    section: "Chapter 7",
    reason: "Chapter umbrella; iff, equivalent-statements, existence/uniqueness, constructive, and non-constructive structures are reviewed separately."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Proofs Involving Sets",
    pdfPage: 5,
    section: "Chapter 8",
    reason: "Chapter umbrella; membership, subset, and set-equality proof structures are harvested separately."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Examples: Perfect Numbers",
    pdfPage: 5,
    section: "8.4",
    reason: "Example topic, not a proof structure."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Disproof",
    pdfPage: 5,
    section: "Chapter 9",
    reason: "Chapter umbrella; counterexample, disproving existence, and disproof by contradiction are harvested separately."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Mathematical Induction",
    pdfPage: 5,
    section: "Chapter 10",
    reason: "Chapter umbrella; proof by induction, strong induction, and smallest-counterexample structures are harvested separately."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "The Fundamental Theorem of Arithmetic",
    pdfPage: 5,
    section: "10.4",
    reason: "Mathematical theorem/example content, not a new proof structure."
  },
  {
    sourceId: "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    term: "Fibonacci Numbers",
    pdfPage: 5,
    section: "10.5",
    reason: "Example topic, not a new proof structure."
  },
  {
    sourceId: "S4-VELLEMAN-2006-2E",
    term: "Summary of Proof Techniques",
    pdfPage: 390,
    section: "Summary of Proof Techniques",
    reason: "Summary container; every mathematical goal/given/any-proof move inside it is reviewed separately."
  },
  {
    sourceId: "S4-VELLEMAN-2006-2E",
    term: "Proof Designer command instructions",
    pdfPage: 390,
    section: "Summary of Proof Techniques — PD paragraphs",
    reason: "Software-specific UI scaffolding rather than a separate mathematical proof technique."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Methods of Proof",
    pdfPage: 6,
    section: "Chapter 1",
    reason: "Chapter umbrella; its five named proof methods are harvested separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Algebra",
    pdfPage: 6,
    section: "Chapter 2",
    reason: "Top-level subject container, not a specific method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Real Analysis",
    pdfPage: 7,
    section: "Chapter 3",
    reason: "Top-level subject container, not a specific method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Geometry and Trigonometry",
    pdfPage: 8,
    section: "Chapter 4",
    reason: "Top-level subject container, not a specific method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Number Theory",
    pdfPage: 8,
    section: "Chapter 5",
    reason: "Top-level subject container, not a specific method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Combinatorics and Probability",
    pdfPage: 9,
    section: "Chapter 6",
    reason: "Top-level subject container, not a specific method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Identities and Inequalities",
    pdfPage: 6,
    section: "2.1",
    reason: "Section container; concrete identities/inequalities/methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Polynomials",
    pdfPage: 6,
    section: "2.2",
    reason: "Section container; named polynomial methods/results beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Linear Algebra",
    pdfPage: 7,
    section: "2.3",
    reason: "Section container; concrete matrix/determinant/vector/eigenvalue tools beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Abstract Algebra",
    pdfPage: 7,
    section: "2.4",
    reason: "Section container; binary operations, groups, and rings are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Sequences and Series",
    pdfPage: 7,
    section: "3.1",
    reason: "Section container; concrete sequence/series methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Continuity, Derivatives, and Integrals",
    pdfPage: 7,
    section: "3.2",
    reason: "Section container; named methods/theorems beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Multivariable Differential and Integral Calculus",
    pdfPage: 7,
    section: "3.3",
    reason: "Section container; concrete partial-derivative/integral/Stokes tools beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Equations with Functions as Unknowns",
    pdfPage: 7,
    section: "3.4",
    reason: "Section container; functional-equation and differential-equation techniques are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Geometry",
    pdfPage: 8,
    section: "4.1",
    reason: "Section container; concrete geometry methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Trigonometry",
    pdfPage: 8,
    section: "4.2",
    reason: "Section container; concrete trigonometric methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Integer-Valued Sequences and Functions",
    pdfPage: 8,
    section: "5.1",
    reason: "Section container; infinite descent and greatest-integer machinery beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Arithmetic",
    pdfPage: 8,
    section: "5.2",
    reason: "Section container; factorization, modular arithmetic, CRT, and named theorems beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Diophantine Equations",
    pdfPage: 8,
    section: "5.3",
    reason: "Section container; concrete Diophantine methods/equations beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Combinatorial Arguments in Set Theory and Geometry",
    pdfPage: 9,
    section: "6.1",
    reason: "Section container; concrete set/permutation/geometry/graph methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Probability",
    pdfPage: 9,
    section: "6.3",
    reason: "Section container; concrete probability methods beneath it are reviewed separately."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Other Inequalities",
    pdfPage: 6,
    section: "2.1.7",
    reason: "Generic continuation bucket rather than a named reusable method."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "A Warmup",
    pdfPage: 6,
    section: "2.2.1",
    reason: "Pedagogical warm-up label, not a method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "More About Limits of Sequences",
    pdfPage: 7,
    section: "3.1.4",
    reason: "Generic continuation heading rather than a named method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Other Geometry Problems",
    pdfPage: 8,
    section: "4.1.6",
    reason: "Problem bucket, not a named method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Some General Problems",
    pdfPage: 8,
    section: "5.1.1",
    reason: "Problem bucket, not a named method/tool."
  },
  {
    sourceId: "S5-GELCA-ANDREESCU-2007",
    term: "Other Diophantine Equations",
    pdfPage: 8,
    section: "5.3.4",
    reason: "Generic continuation/problem bucket rather than a named method/tool."
  }
]);

export const ARSENAL_GATE2_SOURCE_CLOSURE_META = Object.freeze({
  canonicalSourcesReviewed: 5,
  harvestedCandidates: ARSENAL_GATE2_SOURCE_CLOSURE_HARVEST_IDS.length,
  exclusions: ARSENAL_GATE2_SOURCE_CLOSURE_EXCLUSIONS.length,
  expectedHarvestBySource: Object.freeze({
    "S1-ZEITZ-2007-2E": 94,
    "S2-ENGEL-1998": 46,
    "S3-HAMMACK-BOOK-OF-PROOF-3.4": 30,
    "S4-VELLEMAN-2006-2E": 26,
    "S5-GELCA-ANDREESCU-2007": 84,
  }),
  note: "Reviewed manifest is intentionally exact-set protected by the authoring validator. Any future book-candidate addition/removal must update this decision manifest.",
});
