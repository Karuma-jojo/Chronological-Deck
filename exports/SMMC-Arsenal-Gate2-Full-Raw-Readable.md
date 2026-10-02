# SMMC Arsenal — Full Raw Gate-2 Candidate List

**Status:** Gate 2 independently accepted  
**Accepted Gate-2 SHA:** `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`  
**Merged to `main` as:** `7600dd377192aafe6ca777636d94474736ea4e4f`  
**Raw pool:** **661 candidates / 661 evidence records**

> This is the complete pre-pruning raw Arsenal candidate pool at the accepted Gate-2 largest-practical-harvest point. It is intentionally overcomplete. Entries that look duplicated, broad, narrow, topic-like, proof-like, prerequisite-like, or source-specific are **not mistakes to “clean up” here**. Gate 2 deliberately made no ontology, merge/split, granularity, prerequisite, rank, rarity, or learning-order decisions.

## How to read this file

The list is organized by **where the raw lead came from**, not by a final mathematical taxonomy. The six source channels are: current SMMC method tags, current secondary/content tags, frozen ledger `bridgeNeeds`, frozen ledger `auditNote` route leads, verified official SMMC solution occurrences, and source-specific terms from the five canonical books.

For the book rows, **Claim kind** and **Channel** are Gate-1 evidence semantics, not final card types. `DISCOVERY` means a canonical source explicitly presents a discovery heuristic; `NONE` means the source establishes terminology/proof structure without claiming learner transfer. For official SMMC rows, occurrence in a frozen official solution is verified Battle evidence.

## Snapshot

| Source family | Count |
|---|---:|
| SMMC method-tag leads | 44 |
| SMMC secondary-tag leads | 39 |
| Ledger `bridgeNeeds` leads | 129 |
| Ledger `auditNote` route leads | 34 |
| Verified official-solution occurrence leads | 127 |
| Canonical-book source leads | 288 |
| **Total** | **661** |

---

## 1. Current SMMC method-tag leads — 44

These are preserved verbatim from the frozen `SMMC_METHOD_TAGS` vocabulary. They are retrieval/index leads only; Gate 2 does not assert that each is a final learner-facing Arsenal ability.

| # | Candidate | Raw ID |
|---:|---|---|
| 1 | DIRECT | `RAW-LEGACY-direct` |
| 2 | CONTRADICTION | `RAW-LEGACY-contradiction` |
| 3 | CONTRAPOSITIVE | `RAW-LEGACY-contrapositive` |
| 4 | INDUCTION | `RAW-LEGACY-induction` |
| 5 | STRONG-INDUCTION | `RAW-LEGACY-strong-induction` |
| 6 | MINIMAL-COUNTEREXAMPLE | `RAW-LEGACY-minimal-counterexample` |
| 7 | DESCENT | `RAW-LEGACY-descent` |
| 8 | EXISTENCE | `RAW-LEGACY-existence` |
| 9 | COUNTEREXAMPLE | `RAW-LEGACY-counterexample` |
| 10 | INVARIANT | `RAW-LEGACY-invariant` |
| 11 | MONOVARIANT | `RAW-LEGACY-monovariant` |
| 12 | PARITY | `RAW-LEGACY-parity` |
| 13 | COLORING | `RAW-LEGACY-coloring` |
| 14 | SYMMETRY | `RAW-LEGACY-symmetry` |
| 15 | EXTREMAL | `RAW-LEGACY-extremal` |
| 16 | PIGEONHOLE | `RAW-LEGACY-pigeonhole` |
| 17 | DOUBLE-COUNTING | `RAW-LEGACY-double-counting` |
| 18 | AVERAGING | `RAW-LEGACY-averaging` |
| 19 | CASE-DECOMPOSITION | `RAW-LEGACY-case-decomposition` |
| 20 | SUBSTITUTION | `RAW-LEGACY-substitution` |
| 21 | NORMALIZATION | `RAW-LEGACY-normalization` |
| 22 | FACTORIZATION | `RAW-LEGACY-factorization` |
| 23 | AUXILIARY-OBJECT | `RAW-LEGACY-auxiliary-object` |
| 24 | COORDINATES | `RAW-LEGACY-coordinates` |
| 25 | GRAPH-REFORMULATION | `RAW-LEGACY-graph-reformulation` |
| 26 | RECURRENCE-REFORMULATION | `RAW-LEGACY-recurrence-reformulation` |
| 27 | CROSS-DOMAIN | `RAW-LEGACY-cross-domain` |
| 28 | BOUNDING | `RAW-LEGACY-bounding` |
| 29 | MONOTONICITY | `RAW-LEGACY-monotonicity` |
| 30 | CONVEXITY | `RAW-LEGACY-convexity` |
| 31 | SMOOTHING | `RAW-LEGACY-smoothing` |
| 32 | SMALL-CASES | `RAW-LEGACY-small-cases` |
| 33 | EDGE-CASES | `RAW-LEGACY-edge-cases` |
| 34 | CONJECTURE | `RAW-LEGACY-conjecture` |
| 35 | EQUALITY-CASE | `RAW-LEGACY-equality-case` |
| 36 | LEMMA-EXTRACTION | `RAW-LEGACY-lemma-extraction` |
| 37 | CONSTRUCTION | `RAW-LEGACY-construction` |
| 38 | OPTIMIZATION | `RAW-LEGACY-optimization` |
| 39 | PARAMETERIZATION | `RAW-LEGACY-parameterization` |
| 40 | GENERATING-FUNCTION | `RAW-LEGACY-generating-function` |
| 41 | EXCHANGE-ARGUMENT | `RAW-LEGACY-exchange-argument` |
| 42 | BIJECTION | `RAW-LEGACY-bijection` |
| 43 | CONDITIONING | `RAW-LEGACY-conditioning` |
| 44 | ASYMPTOTIC-COMPARISON | `RAW-LEGACY-asymptotic-comparison` |

## 2. Current SMMC secondary/content-tag leads — 39

These are preserved verbatim from the frozen `SMMC_SECONDARY_TAGS` vocabulary. They may later turn out to be tools, topics, specialist knowledge, prerequisites, or final abilities; Gate 2 intentionally does not decide.

| # | Candidate | Raw ID |
|---:|---|---|
| 45 | POLY | `RAW-SECONDARY-poly` |
| 46 | LA | `RAW-SECONDARY-la` |
| 47 | CX | `RAW-SECONDARY-cx` |
| 48 | FF | `RAW-SECONDARY-ff` |
| 49 | FE | `RAW-SECONDARY-fe` |
| 50 | INEQ | `RAW-SECONDARY-ineq` |
| 51 | CONVEX | `RAW-SECONDARY-convex` |
| 52 | GRAPH | `RAW-SECONDARY-graph` |
| 53 | GAME | `RAW-SECONDARY-game` |
| 54 | TILING | `RAW-SECONDARY-tiling` |
| 55 | REC | `RAW-SECONDARY-rec` |
| 56 | GF | `RAW-SECONDARY-gf` |
| 57 | CONST | `RAW-SECONDARY-const` |
| 58 | SEQ | `RAW-SECONDARY-seq` |
| 59 | SERIES | `RAW-SECONDARY-series` |
| 60 | FLOOR | `RAW-SECONDARY-floor` |
| 61 | CEIL | `RAW-SECONDARY-ceil` |
| 62 | ASYM | `RAW-SECONDARY-asym` |
| 63 | INT | `RAW-SECONDARY-int` |
| 64 | ODE | `RAW-SECONDARY-ode` |
| 65 | FUNC | `RAW-SECONDARY-func` |
| 66 | MOD | `RAW-SECONDARY-mod` |
| 67 | DIO | `RAW-SECONDARY-dio` |
| 68 | VAL | `RAW-SECONDARY-val` |
| 69 | PRIME | `RAW-SECONDARY-prime` |
| 70 | GCD | `RAW-SECONDARY-gcd` |
| 71 | EUCLID | `RAW-SECONDARY-euclid` |
| 72 | COORD | `RAW-SECONDARY-coord` |
| 73 | VECTOR-GEO | `RAW-SECONDARY-vector-geo` |
| 74 | CONVEX-GEO | `RAW-SECONDARY-convex-geo` |
| 75 | LATTICE | `RAW-SECONDARY-lattice` |
| 76 | POLYHEDRAL | `RAW-SECONDARY-polyhedral` |
| 77 | PROJECTIVE-GEO | `RAW-SECONDARY-projective-geo` |
| 78 | COND | `RAW-SECONDARY-cond` |
| 79 | EXPECT | `RAW-SECONDARY-expect` |
| 80 | INDICATOR | `RAW-SECONDARY-indicator` |
| 81 | RANDOM-WALK | `RAW-SECONDARY-random-walk` |
| 82 | STOPPING | `RAW-SECONDARY-stopping` |
| 83 | RANDOM-PROCESS | `RAW-SECONDARY-random-process` |

## 3. Frozen ledger `bridgeNeeds` leads — 129

These are project-derived leads harvested from the historical problem ledger. Exact bridge wording is preserved source-specifically. They do **not** establish prerequisite status, importance, or final ability status.

| # | Candidate | Raw ID | Preserved source wording |
|---:|---|---|---|
| 84 | Finite graph/game vocabulary | `RAW-BRIDGE-001` | Finite graph/game vocabulary |
| 85 | Forcing-strategy trees and threat-pair reasoning | `RAW-BRIDGE-002` | Forcing-strategy trees and threat-pair reasoning |
| 86 | Square-free/prime-factor language | `RAW-BRIDGE-003` | Square-free/prime-factor language |
| 87 | Subset-sign cancellation / elementary inclusion-exclusion outside probability | `RAW-BRIDGE-004` | Subset-sign cancellation / elementary inclusion-exclusion outside probability |
| 88 | Gradient of a scalar field in R^2 | `RAW-BRIDGE-005` | Gradient of a scalar field in R^2 |
| 89 | Interior-minimum stationary-point reasoning | `RAW-BRIDGE-006` | Interior-minimum stationary-point reasoning |
| 90 | Compact-region/global-minimum existence at the level needed by the official route | `RAW-BRIDGE-007` | Compact-region/global-minimum existence at the level needed by the official route |
| 91 | Elementary tetrahedron/face-incidence reasoning | `RAW-BRIDGE-008` | Elementary tetrahedron/face-incidence reasoning |
| 92 | Quadratic residues modulo 4 at an elementary level | `RAW-BRIDGE-009` | Quadratic residues modulo 4 at an elementary level |
| 93 | Prime-case reduction as a contest method | `RAW-BRIDGE-010` | Prime-case reduction as a contest method |
| 94 | Finite graph connectivity and minimal connected sets | `RAW-BRIDGE-011` | Finite graph connectivity and minimal connected sets |
| 95 | Convex-hull reasoning | `RAW-BRIDGE-012` | Convex-hull reasoning |
| 96 | Lattice-geometry midpoint structure | `RAW-BRIDGE-013` | Lattice-geometry midpoint structure |
| 97 | Minimal-counterexample/extremal proof practice | `RAW-BRIDGE-014` | Minimal-counterexample/extremal proof practice |
| 98 | Asymptotic combinatorial enumeration beyond T25 | `RAW-BRIDGE-015` | Asymptotic combinatorial enumeration beyond T25 |
| 99 | Research-style partial-progress discipline for an open problem | `RAW-BRIDGE-016` | Research-style partial-progress discipline for an open problem |
| 100 | Constructive tiling/dissection reasoning | `RAW-BRIDGE-017` | Constructive tiling/dissection reasoning |
| 101 | Residue-class coverage through a recursive construction | `RAW-BRIDGE-018` | Residue-class coverage through a recursive construction |
| 102 | Elementary first-order ODE interpretation | `RAW-BRIDGE-019` | Elementary first-order ODE interpretation |
| 103 | Qualitative solution-curve reasoning | `RAW-BRIDGE-020` | Qualitative solution-curve reasoning |
| 104 | Concavity/global-behaviour arguments for ODE solutions | `RAW-BRIDGE-021` | Concavity/global-behaviour arguments for ODE solutions |
| 105 | Ordinary generating functions/formal power series | `RAW-BRIDGE-022` | Ordinary generating functions/formal power series |
| 106 | Convolution-to-product translation | `RAW-BRIDGE-023` | Convolution-to-product translation |
| 107 | Elementary separable ODE solving for a generating function | `RAW-BRIDGE-024` | Elementary separable ODE solving for a generating function |
| 108 | Density of rational numbers as an available elementary fact | `RAW-BRIDGE-025` | Density of rational numbers as an available elementary fact |
| 109 | Constructive approximation with radicals | `RAW-BRIDGE-026` | Constructive approximation with radicals |
| 110 | Finite graph distance, paths, cycles, trees and components | `RAW-BRIDGE-027` | Finite graph distance, paths, cycles, trees and components |
| 111 | Pursuit/guarding arguments on graphs | `RAW-BRIDGE-028` | Pursuit/guarding arguments on graphs |
| 112 | Symmetry reduction on a polyhedral graph | `RAW-BRIDGE-029` | Symmetry reduction on a polyhedral graph |
| 113 | Integer-lattice point enumeration under linear inequalities | `RAW-BRIDGE-030` | Integer-lattice point enumeration under linear inequalities |
| 114 | Research-style partial-progress discipline for an open counting problem | `RAW-BRIDGE-031` | Research-style partial-progress discipline for an open counting problem |
| 115 | Prime-factor support of an integer and square-free product language | `RAW-BRIDGE-032` | Prime-factor support of an integer and square-free product language |
| 116 | Elementary prime-gap/minimal-not-divisible reasoning | `RAW-BRIDGE-033` | Elementary prime-gap/minimal-not-divisible reasoning |
| 117 | Adjacent-swap exchange arguments for permutation optimization | `RAW-BRIDGE-034` | Adjacent-swap exchange arguments for permutation optimization |
| 118 | Rational-root theorem at contest depth | `RAW-BRIDGE-035` | Rational-root theorem at contest depth |
| 119 | Modular reduction of an integer polynomial identity | `RAW-BRIDGE-036` | Modular reduction of an integer polynomial identity |
| 120 | General positive-series convergence and comparison tests | `RAW-BRIDGE-037` | General positive-series convergence and comparison tests |
| 121 | Purpose-built block/scale counterexample construction | `RAW-BRIDGE-038` | Purpose-built block/scale counterexample construction |
| 122 | Logarithmic asymptotic estimates beyond T25 sequence limits | `RAW-BRIDGE-039` | Logarithmic asymptotic estimates beyond T25 sequence limits |
| 123 | Alternating infinite-series expansion and remainder control | `RAW-BRIDGE-040` | Alternating infinite-series expansion and remainder control |
| 124 | Factorial congruence manipulation modulo a prime | `RAW-BRIDGE-041` | Factorial congruence manipulation modulo a prime |
| 125 | Legality of modular cancellation by nonzero residues | `RAW-BRIDGE-042` | Legality of modular cancellation by nonzero residues |
| 126 | Finite graph and clique vocabulary | `RAW-BRIDGE-043` | Finite graph and clique vocabulary |
| 127 | Mass-shifting/compression on nonadjacent vertices | `RAW-BRIDGE-044` | Mass-shifting/compression on nonadjacent vertices |
| 128 | Extremal graph-optimization reasoning | `RAW-BRIDGE-045` | Extremal graph-optimization reasoning |
| 129 | Recurrence-growth bounds via characteristic roots | `RAW-BRIDGE-046` | Recurrence-growth bounds via characteristic roots |
| 130 | Injective/surjective combinatorial encodings | `RAW-BRIDGE-047` | Injective/surjective combinatorial encodings |
| 131 | Forbidden-pattern counting | `RAW-BRIDGE-048` | Forbidden-pattern counting |
| 132 | Research-style partial-progress discipline for the open part | `RAW-BRIDGE-049` | Research-style partial-progress discipline for the open part |
| 133 | Infimum-based self-similar lower-bound reasoning for a positive series | `RAW-BRIDGE-050` | Infimum-based self-similar lower-bound reasoning for a positive series |
| 134 | Careful passage from finite lower bounds to an infinite positive sum | `RAW-BRIDGE-051` | Careful passage from finite lower bounds to an infinite positive sum |
| 135 | Gram-matrix viewpoint for vectors | `RAW-BRIDGE-052` | Gram-matrix viewpoint for vectors |
| 136 | Recognition/use of a 5-by-5 circulant matrix from roots of unity | `RAW-BRIDGE-053` | Recognition/use of a 5-by-5 circulant matrix from roots of unity |
| 137 | Piecewise velocity-strategy design for planar pursuit | `RAW-BRIDGE-054` | Piecewise velocity-strategy design for planar pursuit |
| 138 | First-hitting-time reasoning for continuous trajectories | `RAW-BRIDGE-055` | First-hitting-time reasoning for continuous trajectories |
| 139 | Finite-field extension basics and cyclic multiplicative groups | `RAW-BRIDGE-056` | Finite-field extension basics and cyclic multiplicative groups |
| 140 | Projective-plane/projective-line construction over a finite field | `RAW-BRIDGE-057` | Projective-plane/projective-line construction over a finite field |
| 141 | Difference-set formulation and uniqueness of nonzero differences | `RAW-BRIDGE-058` | Difference-set formulation and uniqueness of nonzero differences |
| 142 | Research-style partial-progress discipline for the open classification | `RAW-BRIDGE-059` | Research-style partial-progress discipline for the open classification |
| 143 | Prime-divisibility invariants under a gcd recurrence | `RAW-BRIDGE-060` | Prime-divisibility invariants under a gcd recurrence |
| 144 | Elementary gcd/prime-factor reasoning beyond parity | `RAW-BRIDGE-061` | Elementary gcd/prime-factor reasoning beyond parity |
| 145 | 2-regular finite graphs decompose into cycles | `RAW-BRIDGE-062` | 2-regular finite graphs decompose into cycles |
| 146 | Matrix-to-incidence-graph translation and block decomposition by components | `RAW-BRIDGE-063` | Matrix-to-incidence-graph translation and block decomposition by components |
| 147 | Nested compact-set / infimum-supremum existence arguments | `RAW-BRIDGE-064` | Nested compact-set / infimum-supremum existence arguments |
| 148 | Right-continuity and one-sided limsup/liminf control for parameter-dependent limits | `RAW-BRIDGE-065` | Right-continuity and one-sided limsup/liminf control for parameter-dependent limits |
| 149 | Floor-recurrence parameter analysis beyond ordinary sequence convergence | `RAW-BRIDGE-066` | Floor-recurrence parameter analysis beyond ordinary sequence convergence |
| 150 | Basic consequences of Riemann integrability such as boundedness on compact intervals | `RAW-BRIDGE-067` | Basic consequences of Riemann integrability such as boundedness on compact intervals |
| 151 | Regularity bootstrapping from moving-average identities | `RAW-BRIDGE-068` | Regularity bootstrapping from moving-average identities |
| 152 | Compact-interval extremum reasoning or an equivalent dense-set integral argument | `RAW-BRIDGE-069` | Compact-interval extremum reasoning or an equivalent dense-set integral argument |
| 153 | Clearing denominators and primitive-integer normalization | `RAW-BRIDGE-070` | Clearing denominators and primitive-integer normalization |
| 154 | Prime divisibility of interior binomial coefficients | `RAW-BRIDGE-071` | Prime divisibility of interior binomial coefficients |
| 155 | Coefficient extraction from shifted polynomials and reduction modulo a prime | `RAW-BRIDGE-072` | Coefficient extraction from shifted polynomials and reduction modulo a prime |
| 156 | Multiplicative order modulo prime powers | `RAW-BRIDGE-073` | Multiplicative order modulo prime powers |
| 157 | Euler-totient/unit-group reasoning | `RAW-BRIDGE-074` | Euler-totient/unit-group reasoning |
| 158 | p-adic valuations and Legendre-style factorial valuation bounds | `RAW-BRIDGE-075` | p-adic valuations and Legendre-style factorial valuation bounds |
| 159 | Valuation comparison in a binomial expansion | `RAW-BRIDGE-076` | Valuation comparison in a binomial expansion |
| 160 | P/N-position reasoning for impartial games | `RAW-BRIDGE-077` | P/N-position reasoning for impartial games |
| 161 | Winning-strategy induction and move-to-losing-position logic | `RAW-BRIDGE-078` | Winning-strategy induction and move-to-losing-position logic |
| 162 | Attracting invariant regions for a discrete map | `RAW-BRIDGE-079` | Attracting invariant regions for a discrete map |
| 163 | Difference-variable trapping and refinement by residue classes | `RAW-BRIDGE-080` | Difference-variable trapping and refinement by residue classes |
| 164 | Contest-level deterministic discrete-dynamics reasoning | `RAW-BRIDGE-081` | Contest-level deterministic discrete-dynamics reasoning |
| 165 | Positive-series comparison tests | `RAW-BRIDGE-082` | Positive-series comparison tests |
| 166 | Subseries divergence arguments | `RAW-BRIDGE-083` | Subseries divergence arguments |
| 167 | Harmonic-series benchmark and block comparison | `RAW-BRIDGE-084` | Harmonic-series benchmark and block comparison |
| 168 | Elementary structural facts about one-dimensional convex functions | `RAW-BRIDGE-085` | Elementary structural facts about one-dimensional convex functions |
| 169 | Upper envelopes of affine functions and supporting/tangent-line constructions | `RAW-BRIDGE-086` | Upper envelopes of affine functions and supporting/tangent-line constructions |
| 170 | Conjugation in Q(sqrt(n)) as an elementary quadratic-irrational tool | `RAW-BRIDGE-087` | Conjugation in Q(sqrt(n)) as an elementary quadratic-irrational tool |
| 171 | 2-adic valuation for the partial results in part (b) | `RAW-BRIDGE-088` | 2-adic valuation for the partial results in part (b) |
| 172 | Power-mean/convexity argument for parity cases | `RAW-BRIDGE-089` | Power-mean/convexity argument for parity cases |
| 173 | Chinese remainder theorem | `RAW-BRIDGE-090` | Chinese remainder theorem |
| 174 | Euler totient for a square-free modulus | `RAW-BRIDGE-091` | Euler totient for a square-free modulus |
| 175 | Coprime residue-class counting | `RAW-BRIDGE-092` | Coprime residue-class counting |
| 176 | Pursuit/guarding strategy design on a grid | `RAW-BRIDGE-093` | Pursuit/guarding strategy design on a grid |
| 177 | Barrier and safe-region invariants for adversarial motion | `RAW-BRIDGE-094` | Barrier and safe-region invariants for adversarial motion |
| 178 | Base-three representation as a contest encoding | `RAW-BRIDGE-095` | Base-three representation as a contest encoding |
| 179 | Recursive forced-pair decomposition of an initial interval | `RAW-BRIDGE-096` | Recursive forced-pair decomposition of an initial interval |
| 180 | Divergence of the sum of reciprocals of the primes | `RAW-BRIDGE-097` | Divergence of the sum of reciprocals of the primes |
| 181 | Infinite-product implication from a divergent reciprocal sum | `RAW-BRIDGE-098` | Infinite-product implication from a divergent reciprocal sum |
| 182 | Conditional avoidance argument over an infinite sequence of prime targets | `RAW-BRIDGE-099` | Conditional avoidance argument over an infinite sequence of prime targets |
| 183 | Polynomial algebra over finite fields | `RAW-BRIDGE-100` | Polynomial algebra over finite fields |
| 184 | Frobenius automorphism and finite-field extensions | `RAW-BRIDGE-101` | Frobenius automorphism and finite-field extensions |
| 185 | Unique factorisation over finite-field polynomial rings | `RAW-BRIDGE-102` | Unique factorisation over finite-field polynomial rings |
| 186 | Irreducibility/reducibility theory beyond elementary factorization | `RAW-BRIDGE-103` | Irreducibility/reducibility theory beyond elementary factorization |
| 187 | Positive-series block comparison and convergence criteria | `RAW-BRIDGE-104` | Positive-series block comparison and convergence criteria |
| 188 | Parity structure of Pascal's triangle / binary no-carry encoding | `RAW-BRIDGE-105` | Parity structure of Pascal's triangle / binary no-carry encoding |
| 189 | Geometric block estimates for a non-geometric series | `RAW-BRIDGE-106` | Geometric block estimates for a non-geometric series |
| 190 | Ordinary generating functions | `RAW-BRIDGE-107` | Ordinary generating functions |
| 191 | Generating-function differentiation of a recurrence | `RAW-BRIDGE-108` | Generating-function differentiation of a recurrence |
| 192 | Elementary first-order linear ODE solving | `RAW-BRIDGE-109` | Elementary first-order linear ODE solving |
| 193 | Coefficient/asymptotic extraction for the limiting density | `RAW-BRIDGE-110` | Coefficient/asymptotic extraction for the limiting density |
| 194 | Vector spaces and matrices over the finite field F_p rather than R | `RAW-BRIDGE-111` | Vector spaces and matrices over the finite field F_p rather than R |
| 195 | Finite-field cardinality counting for affine/kernel fibers | `RAW-BRIDGE-112` | Finite-field cardinality counting for affine/kernel fibers |
| 196 | Linear operators on finite-dimensional function spaces | `RAW-BRIDGE-113` | Linear operators on finite-dimensional function spaces |
| 197 | Complexification/eigenvalue decomposition or equivalent operator structure | `RAW-BRIDGE-114` | Complexification/eigenvalue decomposition or equivalent operator structure |
| 198 | Exponential-polynomial recurrence sequences | `RAW-BRIDGE-115` | Exponential-polynomial recurrence sequences |
| 199 | Compact-torus/subsequence argument controlling oscillatory exponentials | `RAW-BRIDGE-116` | Compact-torus/subsequence argument controlling oscillatory exponentials |
| 200 | Bootstrapping high derivatives to vanish identically | `RAW-BRIDGE-117` | Bootstrapping high derivatives to vanish identically |
| 201 | Minkowski sums of planar sets | `RAW-BRIDGE-118` | Minkowski sums of planar sets |
| 202 | Elementary convex-hull reasoning for polygons | `RAW-BRIDGE-119` | Elementary convex-hull reasoning for polygons |
| 203 | Affine/parallel-line construction showing the resulting sum has the required four vertices | `RAW-BRIDGE-120` | Affine/parallel-line construction showing the resulting sum has the required four vertices |
| 204 | Vandermonde determinant/factor structure | `RAW-BRIDGE-121` | Vandermonde determinant/factor structure |
| 205 | Determinant viewed as a multivariate alternating polynomial | `RAW-BRIDGE-122` | Determinant viewed as a multivariate alternating polynomial |
| 206 | Root-of-unity coefficient comparison at contest depth | `RAW-BRIDGE-123` | Root-of-unity coefficient comparison at contest depth |
| 207 | Gaussian integers and unique factorization | `RAW-BRIDGE-124` | Gaussian integers and unique factorization |
| 208 | Rational-root theorem / primitive integer factorization at contest depth | `RAW-BRIDGE-125` | Rational-root theorem / primitive integer factorization at contest depth |
| 209 | Gauss-lemma-style reduction from rational quadratic factors to integer factors | `RAW-BRIDGE-126` | Gauss-lemma-style reduction from rational quadratic factors to integer factors |
| 210 | Convex envelope and epigraph/convex-hull construction | `RAW-BRIDGE-127` | Convex envelope and epigraph/convex-hull construction |
| 211 | Supporting chord structure of one-dimensional convex envelopes | `RAW-BRIDGE-128` | Supporting chord structure of one-dimensional convex envelopes |
| 212 | Proof that subtracting the envelope preserves convexity in the required decomposition | `RAW-BRIDGE-129` | Proof that subtracting the envelope preserves convexity in the required decomposition |

## 4. Frozen ledger `auditNote` route leads — 34

These are additional problem-specific route leads from the complete audit-note pass. They are project-derived index signals, not verified Battle occurrences.

| # | Candidate | Raw ID | Preserved route wording |
|---:|---|---|---|
| 213 | Hidden Identity Recognition | `RAW-ROUTE-001` | Hidden Identity Recognition |
| 214 | Adjacent-Swap Optimality Argument | `RAW-ROUTE-002` | Adjacent-Swap Optimality Argument |
| 215 | Graph-Theoretic Compression | `RAW-ROUTE-003` | Graph-Theoretic Compression |
| 216 | Recoverability Lemma | `RAW-ROUTE-004` | Recoverability Lemma |
| 217 | Subset Encoding | `RAW-ROUTE-005` | Subset Encoding |
| 218 | Gram-Structure Reduction | `RAW-ROUTE-006` | Gram-Structure Reduction |
| 219 | Fifth-Roots-of-Unity Reduction | `RAW-ROUTE-007` | Fifth-Roots-of-Unity Reduction |
| 220 | Direct Counting Route | `RAW-ROUTE-008` | Direct Counting Route |
| 221 | Bijective Route | `RAW-ROUTE-009` | Bijective Route |
| 222 | Shared-Condition Reduction | `RAW-ROUTE-010` | Shared-Condition Reduction |
| 223 | Membership-Bit Encoding | `RAW-ROUTE-011` | Membership-Bit Encoding |
| 224 | Geometric Interpretation of an Integral | `RAW-ROUTE-012` | Geometric Interpretation of an Integral |
| 225 | Sign-Change Polynomial Argument | `RAW-ROUTE-013` | Sign-Change Polynomial Argument |
| 226 | Shift Bijection | `RAW-ROUTE-014` | Shift Bijection |
| 227 | Affine-Envelope Representation | `RAW-ROUTE-015` | Affine-Envelope Representation |
| 228 | Half-Total Vector Centering | `RAW-ROUTE-016` | Half-Total Vector Centering |
| 229 | Aligned-Vector Sharpness Example | `RAW-ROUTE-017` | Aligned-Vector Sharpness Example |
| 230 | Conditional-Expectation Recursion | `RAW-ROUTE-018` | Conditional-Expectation Recursion |
| 231 | Direct-Sum Decomposition | `RAW-ROUTE-019` | Direct-Sum Decomposition |
| 232 | Area Pairing | `RAW-ROUTE-020` | Area Pairing |
| 233 | Cyclic-Symmetry Order Reduction | `RAW-ROUTE-021` | Cyclic-Symmetry Order Reduction |
| 234 | Information-State Counting Lower Bound | `RAW-ROUTE-022` | Information-State Counting Lower Bound |
| 235 | Invariance Under Squaring | `RAW-ROUTE-023` | Invariance Under Squaring |
| 236 | Incidence-Geometry Injectivity | `RAW-ROUTE-024` | Incidence-Geometry Injectivity |
| 237 | Rotational-Orbit Construction | `RAW-ROUTE-025` | Rotational-Orbit Construction |
| 238 | First-Step Decomposition | `RAW-ROUTE-026` | First-Step Decomposition |
| 239 | Polynomial Identity from Infinitely Many Values | `RAW-ROUTE-027` | Polynomial Identity from Infinitely Many Values |
| 240 | Lowest/Highest-Power Asymptotic Comparison | `RAW-ROUTE-028` | Lowest/Highest-Power Asymptotic Comparison |
| 241 | Diagonalize a 2-by-2 Polynomial Matrix | `RAW-ROUTE-029` | Diagonalize a 2-by-2 Polynomial Matrix |
| 242 | Roots-of-Unity/Cosine Parametrization | `RAW-ROUTE-030` | Roots-of-Unity/Cosine Parametrization |
| 243 | Interval Obstruction | `RAW-ROUTE-031` | Interval Obstruction |
| 244 | Alternating-Polynomial Determinant Structure | `RAW-ROUTE-032` | Alternating-Polynomial Determinant Structure |
| 245 | Newton-Polygon Alternative | `RAW-ROUTE-033` | Newton-Polygon Alternative |
| 246 | Mod-2 Normal-Form Reduction | `RAW-ROUTE-034` | Mod-2 Normal-Form Reduction |

## 5. Verified official SMMC solution occurrences — 127

Every row below is backed by a frozen official SMMC solution artifact and is encoded as `SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE + VERIFIED`. These rows establish only that the move occurs in that official solution; they do not establish final ontology, importance, rarity, prerequisites, or rank.

| # | Candidate | Raw ID | Problem | Official source | PDF page | Section | What the official solution does |
|---:|---|---|---|---|---:|---|---|
| 247 | Winding-Number Parity Coloring | `RAW-OFFICIAL-001` | `SMMC-2020-A1` | `S0-SMMC-SOLUTION-2020` | 2 | Solution 3 | The official solution treats an odd cycle as a closed curve, colors complementary regions by winding-number parity, and tracks parity across crossings. |
| 248 | Perturb Away Degeneracies | `RAW-OFFICIAL-002` | `SMMC-2020-A1` | `S0-SMMC-SOLUTION-2020` | 3 | Comment after Solution 3 | The official solution explicitly replaces a line by an arbitrarily small perturbation to avoid self-intersections while preserving which relevant line segments are met. |
| 249 | Track Parity Under Continuous Deformation | `RAW-OFFICIAL-003` | `SMMC-2020-A1` | `S0-SMMC-SOLUTION-2020` | 3 | Solution 4 | The official solution rotates a line from a zero-intersection position and observes that its intersection count changes only by even amounts. |
| 250 | Taylor-Series Expansion | `RAW-OFFICIAL-004` | `SMMC-2019-B2` | `S0-SMMC-SOLUTION-2019` | 8 | Solution | The official solution begins from the Taylor series expansion of the exponential function. |
| 251 | Mean Value Theorem as a Convexity Contradiction Tool | `RAW-OFFICIAL-005` | `SMMC-2021-B3` | `S0-SMMC-SOLUTION-2021` | 20 | Solution 3 | The official solution explicitly proposes applying the Mean Value Theorem twice to force a nonpositive second derivative and obtain a contradiction. |
| 252 | Dense-Set Riemann-Sum Approximation | `RAW-OFFICIAL-006` | `SMMC-2021-B3` | `S0-SMMC-SOLUTION-2021` | 20 | Solution 3 | The official solution justifies equality of integrals for Riemann-integrable functions agreeing on a dense set by using Riemann sums sampled in that dense set. |
| 253 | Lagrange's Theorem in a Finite-Group Counting Argument | `RAW-OFFICIAL-007` | `SMMC-2022-A4` | `S0-SMMC-SOLUTION-2022` | 7 | Alternative group-theoretic route | The official solution invokes Lagrange's theorem to deduce divisibility from the orders of a finite general linear group and a subgroup. |
| 254 | Upper Riemann-Sum Bounding | `RAW-OFFICIAL-008` | `SMMC-2023-C3` | `S0-SMMC-SOLUTION-2023` | 21 | Solution 2 | The official solution interprets the finite expression through an upper Riemann sum for a decreasing function. |
| 255 | Vandermonde-Matrix Invertibility | `RAW-OFFICIAL-009` | `SMMC-2025-A4` | `S0-SMMC-SOLUTION-2025` | 9 | Solution 1 | The official solution obtains a linear system whose coefficient matrix is Vandermonde and uses distinct nodes to conclude invertibility. |
| 256 | Newton-Polygon Alternative | `RAW-OFFICIAL-010` | `SMMC-2025-C2` | `S0-SMMC-SOLUTION-2025` | 23 | Solution 2 | The official solution presents a Newton-polygon-based alternative route. |
| 257 | Chinese Remainder Theorem | `RAW-OFFICIAL-011` | `SMMC-2023-C1` | `S0-SMMC-SOLUTION-2023` | 17 | Solution | The official solution explicitly uses the Chinese remainder theorem in its congruence construction. |
| 258 | Generating-Function Route | `RAW-OFFICIAL-012` | `SMMC-2018-A4` | `S0-SMMC-SOLUTION-2018` | 8 | Solution | The official solution derives and uses a generating function from the recurrence. |
| 259 | Recurrence-Relation Route | `RAW-OFFICIAL-013` | `SMMC-2018-A4` | `S0-SMMC-SOLUTION-2018` | 7 | Solution | The official solution first derives a recurrence relation for the target probabilities. |
| 260 | Projective-Plane Method | `RAW-OFFICIAL-014` | `SMMC-2020-B4` | `S0-SMMC-SOLUTION-2020` | 25 | Solution to part (a) | The official solution uses finite-projective-plane structure in the solved part. |
| 261 | Gaussian-Integer Factorization | `RAW-OFFICIAL-015` | `SMMC-2025-B4` | `S0-SMMC-SOLUTION-2025` | 17 | Solution 1 to part (a) | The official solution factors in the Gaussian integers. |
| 262 | p-adic Valuation | `RAW-OFFICIAL-016` | `SMMC-2022-A4` | `S0-SMMC-SOLUTION-2022` | 7 | Solution | The official solution uses p-adic valuation information in the divisibility analysis. |
| 263 | 2-adic Valuation | `RAW-OFFICIAL-017` | `SMMC-2023-B4` | `S0-SMMC-SOLUTION-2023` | 15 | Known partial-results discussion | The official booklet records a known partial-result route using the 2-adic valuation. |
| 264 | Rational Root Theorem | `RAW-OFFICIAL-018` | `SMMC-2019-A3` | `S0-SMMC-SOLUTION-2019` | 4 | Solution | The official solution invokes the rational root theorem as part of the obstruction argument. |
| 265 | Convex Envelope | `RAW-OFFICIAL-019` | `SMMC-2025-C4` | `S0-SMMC-SOLUTION-2025` | 25 | Solution | The official solution explicitly uses the convex envelope construction. |
| 266 | Convex-Hull Reduction | `RAW-OFFICIAL-020` | `SMMC-2017-B3` | `S0-SMMC-SOLUTION-2017` | 10 | Solution | The official solution uses the convex hull as a structural reduction. |
| 267 | Alternating-Series Control | `RAW-OFFICIAL-021` | `SMMC-2019-B2` | `S0-SMMC-SOLUTION-2019` | 8 | Solution | The official solution uses alternating-series structure after the Taylor expansion. |
| 268 | Comparison Test for Series | `RAW-OFFICIAL-022` | `SMMC-2019-A4` | `S0-SMMC-SOLUTION-2019` | 5 | Solution | The official solution explicitly applies a comparison test in the convergence argument. |
| 269 | Subseries Comparison | `RAW-OFFICIAL-023` | `SMMC-2022-C2` | `S0-SMMC-SOLUTION-2022` | 23 | Solution 1 | The official solution isolates a subseries and compares it to control convergence/divergence. |
| 270 | Intermediate Value Theorem | `RAW-OFFICIAL-024` | `SMMC-2020-B3` | `S0-SMMC-SOLUTION-2020` | 23 | Solution | The official solution explicitly invokes the Intermediate Value Theorem. |
| 271 | Triangle-Inequality Sharpness | `RAW-OFFICIAL-025` | `SMMC-2023-B1` | `S0-SMMC-SOLUTION-2023` | 9 | Solution | The official solution uses the triangle inequality for the upper bound and an aligned construction for sharpness. |
| 272 | AM-GM Bound | `RAW-OFFICIAL-026` | `SMMC-2020-A3` | `S0-SMMC-SOLUTION-2020` | 10 | Solution | The official solution uses AM-GM in a lower-bound argument. |
| 273 | Eigenvector Reduction | `RAW-OFFICIAL-027` | `SMMC-2020-A4` | `S0-SMMC-SOLUTION-2020` | 14 | Solution 3 | The official vector/Gram route reduces the structure using eigenvector information. |
| 274 | Bijective Counting Route | `RAW-OFFICIAL-028` | `SMMC-2021-B1` | `S0-SMMC-SOLUTION-2021` | 11 | Solution 2 | The official booklet gives a distinct bijective counting solution. |
| 275 | Compact-Space Subsequence | `RAW-OFFICIAL-029` | `SMMC-2025-A4` | `S0-SMMC-SOLUTION-2025` | 9 | Solution 1 | The official solution places a sequence in a compact torus and extracts a convergent subsequence. |
| 276 | Geometric-Series Summation | `RAW-OFFICIAL-030` | `SMMC-2023-A1` | `S0-SMMC-SOLUTION-2023` | 2 | Solution 1 | The official solution uses geometric-series summation in its coordinate route. |
| 277 | Potential-Function Reformulation via Gradient | `RAW-OFFICIAL-031` | `SMMC-2017-A4` | `S0-SMMC-SOLUTION-2017` | 6 | Solution | The official solution defines a scalar potential from inverse-square-type distances and observes that the target vector equation is equivalent to vanishing of its gradient. |
| 278 | Interior Minimum via Boundary Barrier | `RAW-OFFICIAL-032` | `SMMC-2017-A4` | `S0-SMMC-SOLUTION-2017` | 6 | Solution | The official solution obtains a global minimum inside a sufficiently large disk by showing the boundary values are larger, then uses the interior minimum to force zero gradient. |
| 279 | Minimum-Distance Counterexample in a Lattice Graph | `RAW-OFFICIAL-033` | `SMMC-2017-B3` | `S0-SMMC-SOLUTION-2017` | 10 | Solution | The official solution assumes disconnection and chooses red vertices in different components at minimum distance, then derives a shorter connecting configuration. |
| 280 | Minimal Connected Witness under Convex Hull | `RAW-OFFICIAL-034` | `SMMC-2017-B3` | `S0-SMMC-SOLUTION-2017` | 11 | Solution | The official solution reduces to a minimal connected set of red lattice points whose convex hull contains the blue point and exploits that minimality. |
| 281 | Hidden Sum-of-Squares Identity | `RAW-OFFICIAL-035` | `SMMC-2018-B1` | `S0-SMMC-SOLUTION-2018` | 9 | Solution 1 | The official solution rewrites the quadratic form with coefficients min(i,j) as a sum of squares of tail sums. |
| 282 | Positive-Semidefinite Matrix Reduction | `RAW-OFFICIAL-036` | `SMMC-2018-B1` | `S0-SMMC-SOLUTION-2018` | 9 | Solution 2 | The official solution recognizes the matrix with entries min(i,j) as positive semidefinite and proves the required nonnegativity through its matrix structure. |
| 283 | Covariance-Matrix Representation | `RAW-OFFICIAL-037` | `SMMC-2018-B1` | `S0-SMMC-SOLUTION-2018` | 10 | Solution 3 | The official solution represents the min(i,j) matrix as a covariance matrix and concludes nonnegativity from variance. |
| 284 | Generating Function to Differential Equation | `RAW-OFFICIAL-038` | `SMMC-2018-A4` | `S0-SMMC-SOLUTION-2018` | 8 | Solution | After deriving the recurrence, the official solution encodes it in a formal generating function and obtains a differential equation for that generating function. |
| 285 | Adjacent-Swap Improvement Argument | `RAW-OFFICIAL-039` | `SMMC-2019-A2` | `S0-SMMC-SOLUTION-2019` | 3 | Solution | The official solution shows that swapping an adjacent out-of-order pair strictly improves the objective, forcing an extremal ordering. |
| 286 | Support Compression to a Clique | `RAW-OFFICIAL-040` | `SMMC-2019-B3` | `S0-SMMC-SOLUTION-2019` | 9 | Solution | The official solution repeatedly moves the combined weight of two nonadjacent positive vertices onto one of them without decreasing the objective until the positive support is a clique. |
| 287 | Signed-Area Interval Optimization | `RAW-OFFICIAL-041` | `SMMC-2019-B1` | `S0-SMMC-SOLUTION-2019` | 7 | Solution | The official solution interprets the integral as signed area and chooses an interval that captures the positive contribution while excluding negative contribution. |
| 288 | Injective Recurrence Lower Bound | `RAW-OFFICIAL-042` | `SMMC-2019-B4` | `S0-SMMC-SOLUTION-2019` | 11 | Solution | The official solution constructs an injective map between admissible configurations that yields a Fibonacci-type recurrence lower bound. |
| 289 | Forbidden-Pattern Surjection Upper Bound | `RAW-OFFICIAL-043` | `SMMC-2019-B4` | `S0-SMMC-SOLUTION-2019` | 12 | Solution | The official solution encodes configurations by words avoiding a forbidden pattern and uses a surjective recurrence argument for the complementary bound. |
| 290 | Recoverability Lemma | `RAW-OFFICIAL-044` | `SMMC-2020-A2` | `S0-SMMC-SOLUTION-2020` | 6 | Solution 1 | The official solution observes that the final state determines the last move and recursively recovers the entire history. |
| 291 | Subset Encoding of Move Sequences | `RAW-OFFICIAL-045` | `SMMC-2020-A2` | `S0-SMMC-SOLUTION-2020` | 6 | Solution 2 | The official solution encodes legal histories by a subset of indices and proves the correspondence is reversible. |
| 292 | Recursive-Infimum Ansatz | `RAW-OFFICIAL-046` | `SMMC-2020-A3` | `S0-SMMC-SOLUTION-2020` | 9 | Solution | The official solution introduces an infimum-defined lower-bound function satisfying a self-similar relation and differentiates that relation to identify it. |
| 293 | Orthogonal-Eigenvector Projection Reduction | `RAW-OFFICIAL-047` | `SMMC-2020-A4` | `S0-SMMC-SOLUTION-2020` | 14 | Solution 3 | The official solution chooses a real eigenvector of the cyclic isometry, projects orthogonally to its complement, and uses commutation with the symmetry to reduce the geometry. |
| 294 | Finite-Field Quotient Model of the Projective Plane | `RAW-OFFICIAL-048` | `SMMC-2020-B4` | `S0-SMMC-SOLUTION-2020` | 25 | Solution to part (a) | The official solution identifies a quotient of the multiplicative group of a finite-field extension with the point set of a finite projective plane. |
| 295 | Abelian Planar Difference-Set Construction | `RAW-OFFICIAL-049` | `SMMC-2020-B4` | `S0-SMMC-SOLUTION-2020` | 26 | Solution to part (a) | The official solution extracts a subset of a cyclic quotient group whose differences encode the projective-plane incidence structure, giving an abelian planar difference set. |
| 296 | Prime-Divisibility Recurrence Invariant | `RAW-OFFICIAL-050` | `SMMC-2021-A2` | `S0-SMMC-SOLUTION-2021` | 3 | Solution | The official solution inductively tracks exactly which primes divide each recurrence term, using that divisibility pattern as the invariant. |
| 297 | Nested-Compact-Set Intersection | `RAW-OFFICIAL-051` | `SMMC-2021-A4` | `S0-SMMC-SOLUTION-2021` | 8 | Solution | The official solution builds a nested sequence of nonempty compact sets and invokes their nonempty intersection to obtain a limiting parameter. |
| 298 | Riemann Integrability to Local Boundedness | `RAW-OFFICIAL-052` | `SMMC-2021-B3` | `S0-SMMC-SOLUTION-2021` | 17 | Solution 1 | The official solution first uses Riemann integrability on compact intervals to obtain boundedness needed for the functional argument. |
| 299 | Moving-Average Regularity Bootstrap | `RAW-OFFICIAL-053` | `SMMC-2021-B3` | `S0-SMMC-SOLUTION-2021` | 18 | Solution 1 | The official solution rewrites the function through a moving-average identity and uses it to bootstrap regularity from boundedness to continuity. |
| 300 | Prime-Modulus Coefficient Extraction | `RAW-OFFICIAL-054` | `SMMC-2021-B4` | `S0-SMMC-SOLUTION-2021` | 21 | Solution | After normalization, the official solution compares coefficients modulo a prime, using divisibility of interior binomial coefficients to force divisibility information on the polynomial coefficients. |
| 301 | Multiplicative Orders modulo Prime Powers | `RAW-OFFICIAL-055` | `SMMC-2022-A4` | `S0-SMMC-SOLUTION-2022` | 6 | Solution | The official solution studies the multiplicative order of q modulo powers of p and uses its divisibility properties to control the factor count. |
| 302 | Unit-Group Cardinality Bound via Euler Totient | `RAW-OFFICIAL-056` | `SMMC-2022-A4` | `S0-SMMC-SOLUTION-2022` | 6 | Solution | The official solution bounds a multiplicative order by the cardinality of the corresponding unit group, expressed using Euler's totient function. |
| 303 | Unique Lowest-Valuation Term Controls the Sum | `RAW-OFFICIAL-057` | `SMMC-2022-A4` | `S0-SMMC-SOLUTION-2022` | 7 | Solution | In a binomial expansion, the official solution shows one term has strictly smaller p-adic valuation than every other term and therefore determines the valuation of the whole sum. |
| 304 | P/N-Position Induction | `RAW-OFFICIAL-058` | `SMMC-2022-B3` | `S0-SMMC-SOLUTION-2022` | 12 | Solution 1 | The official solution classifies game positions as winning or losing and proves the classification inductively by move-to-losing and all-moves-to-winning conditions. |
| 305 | Sprague–Grundy Reduction to Nim | `RAW-OFFICIAL-059` | `SMMC-2022-B3` | `S0-SMMC-SOLUTION-2022` | 13 | Solution 2 | An alternative official solution assigns Sprague–Grundy values and reduces the impartial game to nim-value calculations. |
| 306 | Block Comparison for a Positive Series | `RAW-OFFICIAL-060` | `SMMC-2022-C2` | `S0-SMMC-SOLUTION-2022` | 23 | Solution 1 | The official solution groups terms into fixed-size blocks and compares each block to a harmonic-type benchmark to decide convergence or divergence. |
| 307 | Characteristic-Equation Solution of a Recurrence | `RAW-OFFICIAL-061` | `SMMC-2022-C3` | `S0-SMMC-SOLUTION-2022` | 25 | Solution via a recurrence relation | The official recurrence route solves the linear recurrence by its characteristic equation. |
| 308 | Roots-of-Unity Filter on a Probability Generating Function | `RAW-OFFICIAL-062` | `SMMC-2022-C3` | `S0-SMMC-SOLUTION-2022` | 26 | Solution via a generating function | The generating-function route evaluates at fifth roots of unity to isolate coefficients in selected residue classes. |
| 309 | Shift Bijection for Ordered Tuples | `RAW-OFFICIAL-063` | `SMMC-2022-C4` | `S0-SMMC-SOLUTION-2022` | 29 | Solution | The official solution shifts every coordinate of an ordered tuple to construct a bijection between two weighted configuration classes and derive a recurrence. |
| 310 | Affine Upper-Envelope Representation | `RAW-OFFICIAL-064` | `SMMC-2023-A2` | `S0-SMMC-SOLUTION-2023` | 4 | Solution | The official solution represents the admissible convex function as the maximum of a selected family of affine functions and uses supporting-line structure. |
| 311 | Half-Total Vector Centering | `RAW-OFFICIAL-065` | `SMMC-2023-B1` | `S0-SMMC-SOLUTION-2023` | 9 | Solution | The official solution chooses half the total vector as a center, converting the target bound into a triangle-inequality estimate. |
| 312 | Recursive Expectation by Self-Similar Halves | `RAW-OFFICIAL-066` | `SMMC-2023-B2` | `S0-SMMC-SOLUTION-2023` | 10 | Solution 1 | The official solution decomposes the tournament into two equal halves and recursively computes the expected winner rank using induction and conditional expectations. |
| 313 | Direct-Sum Basis Construction | `RAW-OFFICIAL-067` | `SMMC-2023-B3` | `S0-SMMC-SOLUTION-2023` | 12 | Solution 1 | The official solution uses A plus B equal to the ambient space, decomposes each basis vector of C as a sum from A and B, and proves the resulting component vectors form bases. |
| 314 | Equal-Area Triangle Pairing | `RAW-OFFICIAL-068` | `SMMC-2023-C2` | `S0-SMMC-SOLUTION-2023` | 18 | Solution | The official solution uses equally spaced intersections and pairs adjacent opposite-colour triangles with equal area. |
| 315 | Double-Column Guarding Barrier | `RAW-OFFICIAL-069` | `SMMC-2023-C4` | `S0-SMMC-SOLUTION-2023` | 23 | Solution | The official solution assigns guards to paired columns and maintains a descending barrier invariant against the adversarial motion. |
| 316 | Ternary-Digit Classification by Forced Pairing | `RAW-OFFICIAL-070` | `SMMC-2024-A2` | `S0-SMMC-SOLUTION-2024` | 2 | Solution 1 | The official solution characterizes the admissible integers through base-three digits and proves the characterization by recursively forced pairings. |
| 317 | Forced-Pair Recursive Reduction | `RAW-OFFICIAL-071` | `SMMC-2024-A2` | `S0-SMMC-SOLUTION-2024` | 3 | Solution 1 | The official solution shows that local pairing constraints force a smaller instance, enabling induction after a ternary-scale reduction. |
| 318 | Divergent Prime Reciprocals Force an Infinite Product to Zero | `RAW-OFFICIAL-072` | `SMMC-2024-A4` | `S0-SMMC-SOLUTION-2024` | 9 | Solution | The official solution bounds an avoidance probability by an infinite product and proves that product vanishes using divergence of the sum of reciprocal primes and an exponential bound. |
| 319 | Information-State Counting Lower Bound | `RAW-OFFICIAL-073` | `SMMC-2024-B1` | `S0-SMMC-SOLUTION-2024` | 9 | Solution 1 | The official solution counts the possible answer histories after n guesses and compares that information capacity with the number of initial coin placements. |
| 320 | Invariance Under Squaring after Renormalization | `RAW-OFFICIAL-074` | `SMMC-2024-B2` | `S0-SMMC-SOLUTION-2024` | 11 | Solution | After multiplying by x-1, the official solution obtains g(x)=g(x^2) and combines this invariance with continuity and convergent iterates. |
| 321 | Incidence-Geometry Injectivity Bootstrap | `RAW-OFFICIAL-075` | `SMMC-2024-B3` | `S0-SMMC-SOLUTION-2024` | 12 | Solution 1 | The official solution first proves the line-to-point map is injective using a transversal, then bootstraps the incidence rule to a contradiction. |
| 322 | Frobenius-Fixed Polynomial Descent | `RAW-OFFICIAL-076` | `SMMC-2024-B4` | `S0-SMMC-SOLUTION-2024` | 16 | Solution to part (a) | The official solution uses Frobenius on the finite-field polynomial ring and exploits fixed polynomials to descend coefficient information to the base field. |
| 323 | UFD Assembly from Frobenius-Orbit Factors | `RAW-OFFICIAL-077` | `SMMC-2024-B4` | `S0-SMMC-SOLUTION-2024` | 17 | Solution to part (a) | The official solution combines irreducible factors through their Frobenius orbits and unique factorization to reconstruct the required factorization over the base field. |
| 324 | Irrational-Slope Degeneracy Avoidance | `RAW-OFFICIAL-078` | `SMMC-2024-C1` | `S0-SMMC-SOLUTION-2024` | 18 | Solution | The official solution chooses an irrational slope so the moving boundary avoids configurations with too many lattice points at once. |
| 325 | Four-Element Orbit Counting under 90° Rotation | `RAW-OFFICIAL-079` | `SMMC-2024-C1` | `S0-SMMC-SOLUTION-2024` | 18 | Solution | The official solution uses quarter-turn symmetry so every non-origin lattice point occurs in an orbit of four. |
| 326 | Monotone Two-Cycle Collapse to Fixed Points | `RAW-OFFICIAL-080` | `SMMC-2024-C2` | `S0-SMMC-SOLUTION-2024` | 19 | Solution | Strict monotonicity is used to show a two-cycle must be a fixed point, after which algebraic factorization completes the classification. |
| 327 | Pascal-Triangle Mod-2 Self-Similarity | `RAW-OFFICIAL-081` | `SMMC-2024-C3` | `S0-SMMC-SOLUTION-2024` | 20 | Solution 1 | The official solution exploits the recursive self-similar pattern of Pascal's triangle modulo two to count odd binomial coefficients by dyadic blocks. |
| 328 | No-Carry Binary Criterion for Odd Binomial Coefficients | `RAW-OFFICIAL-082` | `SMMC-2024-C3` | `S0-SMMC-SOLUTION-2024` | 21 | Solution 2 | The alternative official solution uses the no-carry criterion in base two to count odd binomial coefficients digit by digit. |
| 329 | First-Step Decomposition into Independent Subproblems | `RAW-OFFICIAL-083` | `SMMC-2024-C4` | `S0-SMMC-SOLUTION-2024` | 22 | Solution | The official solution conditions on the first occupied seat and decomposes the remaining seating process into independent left and right subproblems, yielding a recurrence for expectations. |
| 330 | Generating-Function Recurrence to Linear ODE | `RAW-OFFICIAL-084` | `SMMC-2024-C4` | `S0-SMMC-SOLUTION-2024` | 23 | Solution | The official solution converts the expectation recurrence into a generating-function identity and then a first-order linear differential equation. |
| 331 | Lowest/Highest-Power Asymptotic Comparison | `RAW-OFFICIAL-085` | `SMMC-2025-A1` | `S0-SMMC-SOLUTION-2025` | 1 | Solution 1 | The official solution compares the lowest nonzero polynomial powers near zero and the highest powers at infinity to rule out a finite maximum representation. |
| 332 | Polynomial Identity from Infinitely Many Values | `RAW-OFFICIAL-086` | `SMMC-2025-A1` | `S0-SMMC-SOLUTION-2025` | 1 | Solution 2 | The official solution uses infinitely many matching integer values and pigeonhole reasoning to force one candidate polynomial to agree identically with x. |
| 333 | Pair Double Counting to Compute an Average | `RAW-OFFICIAL-087` | `SMMC-2025-A2` | `S0-SMMC-SOLUTION-2025` | 2 | Solution | The official solution computes the desired average by counting pairs consisting of a matrix and one of its nonzero eigenvectors. |
| 334 | Extend a Vector to a Basis and Count Free Images | `RAW-OFFICIAL-088` | `SMMC-2025-A2` | `S0-SMMC-SOLUTION-2025` | 2 | Solution 1 | For a fixed nonzero vector, the official solution extends it to a basis and counts linear maps by freely choosing the images of the remaining basis vectors. |
| 335 | Rank-Nullity Kernel Counting over a Finite Field | `RAW-OFFICIAL-089` | `SMMC-2025-A2` | `S0-SMMC-SOLUTION-2025` | 3 | Solution 2 | The official solution considers the linear map sending a matrix A to Av, computes its rank, and counts the kernel over the finite field. |
| 336 | Conjugation Normalization to a Standard Vector | `RAW-OFFICIAL-090` | `SMMC-2025-A2` | `S0-SMMC-SOLUTION-2025` | 3 | Solution 4 | The official solution chooses an invertible change of basis carrying the fixed vector to a standard basis vector and uses conjugation to normalize the counting problem. |
| 337 | Diagonalize a 2-by-2 Polynomial Matrix | `RAW-OFFICIAL-091` | `SMMC-2025-A3` | `S0-SMMC-SOLUTION-2025` | 4 | Solution 1 | The official solution diagonalizes the parameter-dependent two-by-two matrix after an auxiliary substitution. |
| 338 | Roots-of-Unity/Cosine Parametrization | `RAW-OFFICIAL-092` | `SMMC-2025-A3` | `S0-SMMC-SOLUTION-2025` | 5 | Solution 1 | The official solution parametrizes polynomial roots using roots of unity and cosine values after diagonalization. |
| 339 | Root Interlacing by Sign Changes and IVT | `RAW-OFFICIAL-093` | `SMMC-2025-A3` | `S0-SMMC-SOLUTION-2025` | 6 | Solution 2 | The alternative official solution derives a recurrence and proves simple interlacing roots from alternating signs and the Intermediate Value Theorem. |
| 340 | Jordan-Normal-Form Upper Triangularization | `RAW-OFFICIAL-094` | `SMMC-2025-A4` | `S0-SMMC-SOLUTION-2025` | 8 | Solution 1 | After complexifying the finite-dimensional function space, the official solution uses Jordan normal form to choose a basis in which dilation acts upper triangularly. |
| 341 | Dilation–Derivative Boundedness Bootstrap | `RAW-OFFICIAL-095` | `SMMC-2025-A4` | `S0-SMMC-SOLUTION-2025` | 8 | Solution 1 | The official solution differentiates a dilation eigenrelation enough times and uses repeated halving toward zero to force a high derivative to vanish. |
| 342 | Minkowski Sum via Convex Hull of Vertex Sums | `RAW-OFFICIAL-096` | `SMMC-2025-B2` | `S0-SMMC-SOLUTION-2025` | 13 | Solution | After an affine normalization, the official solution identifies the Minkowski sum of two triangles with the convex hull of their pairwise vertex sums and chooses the vertices to recover the quadrilateral. |
| 343 | Alternating Polynomial Forces Vandermonde Factors | `RAW-OFFICIAL-097` | `SMMC-2025-B3` | `S0-SMMC-SOLUTION-2025` | 14 | Solution 1 | The official solution treats the determinant as an alternating multivariate polynomial, proves divisibility by every difference z_i-z_j, and uses degree to identify the Vandermonde factor structure. |
| 344 | One-Variable Root Factorization plus Antisymmetry | `RAW-OFFICIAL-098` | `SMMC-2025-B3` | `S0-SMMC-SOLUTION-2025` | 15 | Solution 3 | The official solution freezes all but one variable, factors using the known roots, and then uses antisymmetry to compare the remaining factors. |
| 345 | Coprime-Factor Perfect-Power Splitting | `RAW-OFFICIAL-099` | `SMMC-2025-B4` | `S0-SMMC-SOLUTION-2025` | 16 | Solution 1 to part (a) | The official solution shows two factors have gcd one or two and then uses coprimality to conclude that factors of a prime-th power are themselves prime-th powers up to the controlled common factor. |
| 346 | Expression-Induction for Piecewise-Linear Parity | `RAW-OFFICIAL-100` | `SMMC-2025-C3` | `S0-SMMC-SOLUTION-2025` | 24 | Solution 1 | The official solution inducts on the construction of the expression to show its one-variable restriction is piecewise linear with integer gradients of a fixed parity. |
| 347 | Mod-2 Normal-Form Reduction | `RAW-OFFICIAL-101` | `SMMC-2025-C3` | `S0-SMMC-SOLUTION-2025` | 24 | Solution 2 | Working modulo two, the official solution removes the distinction introduced by subtraction and absolute value and reduces every expression to one of four linear forms. |
| 348 | Epigraph Convex-Hull Construction | `RAW-OFFICIAL-102` | `SMMC-2025-C4` | `S0-SMMC-SOLUTION-2025` | 25 | Solution | The official solution constructs a convex envelope through the convex hull of an epigraph and then uses supporting-segment structure to prove the needed decomposition. |
| 349 | Threat-Pair Forcing Strategy | `RAW-OFFICIAL-103` | `SMMC-2017-A1` | `S0-SMMC-SOLUTION-2017` | 1 | Solution | The official solution chooses moves that create two simultaneous future winning threats, forcing a defensive reply before the final fork. |
| 350 | Sequence/Series Divergence Dichotomy | `RAW-OFFICIAL-104` | `SMMC-2017-A2` | `S0-SMMC-SOLUTION-2017` | 3 | Solution | The official solution splits according to whether the positive sequence tends to zero; either branch yields divergence of the partial sums. |
| 351 | Reciprocal Self-Bound for Partial Sums | `RAW-OFFICIAL-105` | `SMMC-2017-A2` | `S0-SMMC-SOLUTION-2017` | 3 | Solution | When the sequence tends to zero, the official solution compares a partial sum with the reciprocal of the next term to force unbounded growth. |
| 352 | Subset-Sign Inclusion–Exclusion Cancellation | `RAW-OFFICIAL-106` | `SMMC-2017-A3` | `S0-SMMC-SOLUTION-2017` | 4 | Lemma | The official solution sums divisor-indicator vectors over subsets with alternating signs so each coordinate cancels by the subset identity. |
| 353 | Determinant Reduction by Row Replacement and Cofactor Expansion | `RAW-OFFICIAL-107` | `SMMC-2017-A3` | `S0-SMMC-SOLUTION-2017` | 5 | Solution | The official solution replaces a row by the alternating subset combination without changing the determinant and then reduces dimension by cofactor expansion. |
| 354 | Local Replacement Closure for a Construction | `RAW-OFFICIAL-108` | `SMMC-2018-A1` | `S0-SMMC-SOLUTION-2018` | 1 | Solution | The official solution observes that replacing one tile by four similar tiles increases the tile count by three, then combines seed constructions for the residue classes. |
| 355 | Scale-Normalize a Coefficient in a Polynomial Game | `RAW-OFFICIAL-109` | `SMMC-2018-A2` | `S0-SMMC-SOLUTION-2018` | 3 | Solution | The official solution first normalizes the initial nonzero coefficient by scaling, reducing the strategic analysis to the case a=1. |
| 356 | Discriminant-Robust Strategy Construction | `RAW-OFFICIAL-110` | `SMMC-2018-A2` | `S0-SMMC-SOLUTION-2018` | 3 | Solution | The official solution chooses coefficients so every permitted ordering of the quadratic has positive discriminant, making the strategy robust to the opponent's final choice. |
| 357 | Concavity from a Differential Inequality | `RAW-OFFICIAL-111` | `SMMC-2018-A3` | `S0-SMMC-SOLUTION-2018` | 5 | Solution | The official solution differentiates the ODE and uses a logarithmic inequality to prove that the solution curve is strictly concave. |
| 358 | Infimum–Tangent Contradiction | `RAW-OFFICIAL-112` | `SMMC-2018-A3` | `S0-SMMC-SOLUTION-2018` | 5 | Lemma 1 | To prove the curve meets the diagonal, the official solution assumes otherwise, defines an infimum ratio, and uses a tangent-line bound from concavity to contradict that infimum. |
| 359 | Rational-Density Radical Approximation | `RAW-OFFICIAL-113` | `SMMC-2018-B2` | `S0-SMMC-SOLUTION-2018` | 11 | Solution | The official solution starts from a rational point inside the interval and constructs an infinite sequence of radical differences converging to that rational point. |
| 360 | Distance-Shell Guarding Strategy on a Graph | `RAW-OFFICIAL-114` | `SMMC-2018-B3` | `S0-SMMC-SOLUTION-2018` | 13 | Solution | The official solution translates the dodecahedron to its edge graph, uses graph-distance shells from an antipodal pair, and organizes the spiders' pursuit in phases. |
| 361 | Smallest Nondivisible Multiplier Advances Prime Support | `RAW-OFFICIAL-115` | `SMMC-2019-A1` | `S0-SMMC-SOLUTION-2019` | 1 | Solution | The induction step uses the fact that the smallest positive integer not divisible by the first k primes is the next prime, forcing the recurrence to acquire that prime factor. |
| 362 | Graph-Core Reduction by Laplace Elimination | `RAW-OFFICIAL-116` | `SMMC-2021-A3` | `S0-SMMC-SOLUTION-2021` | 4 | Solution | The official solution repeatedly applies Laplace expansion to strip degree-zero/degree-one structure, translates the matrix to a graph, and reduces to a 2-regular core. |
| 363 | Cycle-Block Determinant Decomposition | `RAW-OFFICIAL-117` | `SMMC-2021-A3` | `S0-SMMC-SOLUTION-2021` | 4 | Solution | Once the graph core is 2-regular, the official solution decomposes it into cycles and permutes the matrix to block diagonal form, so the determinant factors by cycle blocks. |
| 364 | Elementwise Membership-Pattern Factorization | `RAW-OFFICIAL-118` | `SMMC-2022-A2` | `S0-SMMC-SOLUTION-2022` | 3 | Solution | The official solution reduces the global union/intersection event to an allowed membership pattern for each ground-set element and multiplies the resulting independent probabilities. |
| 365 | Inverse-Graph Symmetry Area Argument | `RAW-OFFICIAL-119` | `SMMC-2022-A3` | `S0-SMMC-SOLUTION-2022` | 5 | Solution | The official solution uses that two functions are inverses, hence their graphs are symmetric about y=x, and interprets the integral geometrically to locate two crossings by continuity. |
| 366 | Attracting Invariant Strip for a Discrete Map | `RAW-OFFICIAL-120` | `SMMC-2022-B4` | `S0-SMMC-SOLUTION-2022` | 16 | Solution to part (a) | The official solution defines half-plane strips in the difference coordinate, proves an invariant region, and strengthens it to an attracting region that eventually traps every orbit. |
| 367 | Conditional-Avoidance Hitting-Probability Bound | `RAW-OFFICIAL-121` | `SMMC-2024-A4` | `S0-SMMC-SOLUTION-2024` | 8 | Lemma | Conditioning on avoiding a finite target set, the official solution lower-bounds the probability of hitting a later integer by summing over the first index that can cross that target. |
| 368 | Cyclic-Symmetry Order Reduction | `RAW-OFFICIAL-122` | `SMMC-2024-A1` | `S0-SMMC-SOLUTION-2024` | 1 | Solution 1 | The official solution uses cyclic symmetry to choose a least variable without loss of generality and converts the equalities into an order chain forcing equality. |
| 369 | Endpoint-Sign Polynomial Existence Argument | `RAW-OFFICIAL-123` | `SMMC-2022-B1` | `S0-SMMC-SOLUTION-2022` | 9 | Solution 1 | For the converse direction, the official solution forms a polynomial whose constant term and leading behaviour have opposite signs, forcing a positive real root. |
| 370 | Root-Orbit Factorization from Evenness and Conjugation | `RAW-OFFICIAL-124` | `SMMC-2022-B2` | `S0-SMMC-SOLUTION-2022` | 11 | Solution | The official solution groups roots into sign and complex-conjugation orbits, uses the common circle to identify their moduli, and factors the polynomial by those root orbits. |
| 371 | Divisibility-Collision Interval Obstruction | `RAW-OFFICIAL-125` | `SMMC-2025-B1` | `S0-SMMC-SOLUTION-2025` | 11 | Solution | The official solution chooses an interval containing only one multiple available to two domain elements with a nontrivial gcd, forcing their images to collide and contradicting injectivity on that pair. |
| 372 | Four-Step Balanced-Partition Induction | `RAW-OFFICIAL-126` | `SMMC-2025-C1` | `S0-SMMC-SOLUTION-2025` | 20 | Solution 1 | The official solution reduces the geometric minimum to balancing two sums of consecutive odd jump lengths and preserves the optimal difference by an induction step that appends four jumps. |
| 373 | Modulo-4 Square Obstruction for Odd Primes | `RAW-OFFICIAL-127` | `SMMC-2017-B2` | `S0-SMMC-SOLUTION-2017` | 9 | Solution | The official solution rules out the case of two odd primes by reducing the putative square modulo 4, which forces one of the primes to be 2. |

## 6. Canonical-book source leads — 288

These remain **source-specific**. Similar-looking entries from different books are intentionally separate raw ore until Gate 3+ adjudication.


### 6.1 Zeitz — The Art and Craft of Problem Solving (2nd ed.) — 102

| # | Candidate | Raw ID | PDF page | Source section / index location | Claim kind | Channel | Why it was harvested |
|---:|---|---|---:|---|---|---|---|
| 374 | Orientation | `RAW-SOURCE-z-orientation` | 42 | 2.2 Strategies for Getting Started | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz presents orientation as a getting-started strategy. |
| 375 | Penultimate Step | `RAW-SOURCE-z-penultimate-step` | 42 | 2.2 Strategies for Getting Started | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz explicitly lists the penultimate-step strategy among practical ways to begin. |
| 376 | Get Your Hands Dirty | `RAW-SOURCE-z-hands-dirty` | 42 | 2.2 Strategies for Getting Started | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz explicitly lists get-your-hands-dirty as a practical starting strategy. |
| 377 | Wishful Thinking | `RAW-SOURCE-z-wishful-thinking` | 42 | 2.2 Strategies for Getting Started | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz explicitly lists wishful thinking as a practical starting strategy. |
| 378 | Make It Easier | `RAW-SOURCE-z-make-easier` | 42 | 2.2 Strategies for Getting Started | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz explicitly lists make-it-easier as a practical starting strategy. |
| 379 | Draw a Picture | `RAW-SOURCE-z-draw-picture` | 14 | 2.4 Other Important Strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives Draw a Picture its own strategy heading. |
| 380 | Recast the Problem in Other Ways | `RAW-SOURCE-z-recast` | 14 | 2.4 Other Important Strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives recasting a named strategy heading. |
| 381 | Change Your Point of View | `RAW-SOURCE-z-change-point-view` | 14 | 2.4 Other Important Strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives changing point of view a named strategy heading. |
| 382 | Symmetry | `RAW-SOURCE-z-symmetry` | 14 | 3.1 Symmetry | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives symmetry a dedicated tactics section. |
| 383 | Extreme Principle | `RAW-SOURCE-z-extreme-principle` | 14 | 3.2 The Extreme Principle | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names the Extreme Principle as a tactics section. |
| 384 | Pigeonhole Principle | `RAW-SOURCE-z-pigeonhole` | 14 | 3.3 The Pigeonhole Principle | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names the Pigeonhole Principle as a tactics section. |
| 385 | Invariants | `RAW-SOURCE-z-invariants` | 14 | 3.4 Invariants | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names invariants as a tactics section. |
| 386 | Parity | `RAW-SOURCE-z-parity` | 14 | 3.4 Invariants — Parity | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names parity within his invariants treatment. |
| 387 | Modular Arithmetic and Coloring | `RAW-SOURCE-z-mod-color` | 14 | 3.4 Invariants — Modular Arithmetic and Coloring | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names modular arithmetic and coloring together within invariants. |
| 388 | Monovariants | `RAW-SOURCE-z-monovariants` | 14 | 3.4 Invariants — Monovariants | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz names monovariants within the invariants chapter. |
| 389 | Factor Tactic | `RAW-SOURCE-z-factor-tactic` | 165 | 5.2 The Factor Tactic | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly names and develops the Factor Tactic. |
| 390 | Manipulating Squares | `RAW-SOURCE-z-manipulating-squares` | 15 | 5.2 Algebraic Manipulation Revisited | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives Manipulating Squares a named subsection. |
| 391 | Substitutions and Simplifications | `RAW-SOURCE-z-substitutions-simplifications` | 15 | 5.2 Algebraic Manipulation Revisited | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives Substitutions and Simplifications a named subsection. |
| 392 | Gaussian Pairing Tool | `RAW-SOURCE-z-gaussian-pairing` | 84 | 3.1 Symmetry — Gaussian Pairing Tool | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly names the Gaussian Pairing Tool. |
| 393 | Telescope Tool | `RAW-SOURCE-z-telescope-tool` | 175 | 5.3 Geometric Series and the Telescope Tool | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly names the Telescope Tool. |
| 394 | Inclusion–Exclusion with Indicator Functions | `RAW-SOURCE-z-pie-indicator` | 229 | 6.3 PIE with Indicator Functions | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives a dedicated treatment of inclusion–exclusion using indicator functions. |
| 395 | Roots of Unity Filter | `RAW-SOURCE-z-roots-unity-filter` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists a roots-of-unity filter. |
| 396 | Add Zero Creatively | `RAW-SOURCE-z-add-zero` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists adding zero creatively. |
| 397 | Completing the Square | `RAW-SOURCE-z-complete-square` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists completing the square. |
| 398 | Extracting Squares | `RAW-SOURCE-z-extract-squares` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists extracting squares. |
| 399 | Catalyst Tool | `RAW-SOURCE-z-catalyst` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists the catalyst tool. |
| 400 | Reflection Tool | `RAW-SOURCE-z-reflection` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists reflection as a tool. |
| 401 | Define a Function | `RAW-SOURCE-z-define-function` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists defining a function. |
| 402 | Partial Fractions | `RAW-SOURCE-z-partial-fractions` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists partial fractions. |
| 403 | Filter the Problem Modulo n | `RAW-SOURCE-z-modulo-filter` | 258 | 7.4 Diophantine Equations | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz explicitly recommends filtering a Diophantine problem modulo a suitable n to constrain solutions. |
| 404 | Angle Chasing | `RAW-SOURCE-z-angle-chasing` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists angle chasing. |
| 405 | Drawing an Auxiliary Object | `RAW-SOURCE-z-draw-auxiliary` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists drawing an auxiliary object. |
| 406 | Generalize | `RAW-SOURCE-z-generalize` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists generalizing. |
| 407 | Is There a Similar Problem? | `RAW-SOURCE-z-similar-problem` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists asking whether there is a similar problem. |
| 408 | Opportunistic Strategy | `RAW-SOURCE-z-opportunistic` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists an opportunistic strategy. |
| 409 | Optimistic Strategy | `RAW-SOURCE-z-optimistic` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists an optimistic strategy. |
| 410 | Peripheral Vision | `RAW-SOURCE-z-peripheral-vision` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists peripheral vision. |
| 411 | Phantom Point | `RAW-SOURCE-z-phantom-point` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists the phantom-point strategy. |
| 412 | Produce a Contradiction | `RAW-SOURCE-z-produce-contradiction` | 382 | Index — strategies | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's strategy index explicitly lists producing a contradiction. |
| 413 | Complex Numbers as a Tactic | `RAW-SOURCE-z-complex-tactic` | 382 | Index — tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tactics index explicitly lists complex numbers. |
| 414 | Generating Functions as a Tactic | `RAW-SOURCE-z-gf-tactic` | 382 | Index — tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tactics index explicitly lists generating functions. |
| 415 | Graph Theory as a Tactic | `RAW-SOURCE-z-graph-tactic` | 382 | Index — tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tactics index explicitly lists graph theory. |
| 416 | Modular Arithmetic as a Tactic | `RAW-SOURCE-z-modular-tactic` | 382 | Index — tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tactics index explicitly lists modular arithmetic. |
| 417 | Monotonize | `RAW-SOURCE-z-monotonize` | 382 | Index — tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tactics index explicitly lists monotonizing. |
| 418 | Geometric Series Tool | `RAW-SOURCE-z-geometric-series-tool` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists the geometric-series tool. |
| 419 | Identity Principle | `RAW-SOURCE-z-identity-principle` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists the identity principle. |
| 420 | Invent a Font | `RAW-SOURCE-z-invent-font` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists inventing a font. |
| 421 | Monic Polynomial Tool | `RAW-SOURCE-z-monic-polynomial` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists monic polynomial. |
| 422 | Trigonometric Tool | `RAW-SOURCE-z-trig-tool` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists a trigonometric tool. |
| 423 | Undetermined Coefficients | `RAW-SOURCE-z-undetermined-coeff` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists undetermined coefficients. |
| 424 | Method of Weights | `RAW-SOURCE-z-weights` | 382 | Index — tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's tool index explicitly lists weights. |
| 425 | Shearing Tool | `RAW-SOURCE-z-shearing` | 382 | Index — geometry/tools | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists a shearing tool. |
| 426 | Encoding | `RAW-SOURCE-z-encoding` | 378 | Index — combinatorial strategies and tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's combinatorial-strategy index explicitly lists encoding. |
| 427 | Count the Complement | `RAW-SOURCE-z-count-complement` | 378 | Index — combinatorial strategies and tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's combinatorial-strategy index explicitly lists counting the complement. |
| 428 | Partitioning | `RAW-SOURCE-z-partitioning` | 378 | Index — combinatorial strategies and tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's combinatorial-strategy index explicitly lists partitioning. |
| 429 | Inclusion–Exclusion | `RAW-SOURCE-z-inclusion-exclusion` | 378 | Index — combinatorial strategies and tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's combinatorial-strategy index explicitly lists inclusion–exclusion. |
| 430 | Strategy | `RAW-SOURCE-z-strategy-term` | 20 | 1.2 The Three Levels of Problem Solving | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly defines Strategy as his broad level for ideas used to start and pursue problems; Gate 2 records the term without adopting it as an ontology type. |
| 431 | Tactic | `RAW-SOURCE-z-tactic-term` | 20 | 1.2 The Three Levels of Problem Solving | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly defines Tactics as broadly useful mathematical methods; Gate 2 records the term without adopting it as an ontology type. |
| 432 | Tool | `RAW-SOURCE-z-tool-term` | 20 | 1.2 The Three Levels of Problem Solving | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly defines Tools as narrowly focused techniques; Gate 2 records the term without adopting it as an ontology type. |
| 433 | Crux Move | `RAW-SOURCE-z-crux-move` | 20 | 1.2 The Three Levels of Problem Solving | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly names a crux move as a key obstacle-clearing move and notes that it can occur at strategic, tactical, or tool level; representation remains unresolved. |
| 434 | Problem Investigation | `RAW-SOURCE-z-investigation` | 20 | 1.2 From Mountaineering to Mathematics | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz distinguishes the investigation process from merely having a polished answer and recommends an organized strategic investigation. |
| 435 | Numerical Experimentation | `RAW-SOURCE-z-numerical-experiment` | 23 | 1.2 Worked example analysis | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's worked-example analysis explicitly identifies numerical experimentation as the strategy that led to the useful conjecture. |
| 436 | Mental Toughness | `RAW-SOURCE-z-mental-toughness` | 31 | 2.1 Mental Toughness: Learn from Polya's Mouse | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly presents mental toughness inside the Psychological Strategies section. |
| 437 | Creativity | `RAW-SOURCE-z-creativity` | 34 | 2.1 Creativity | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives Creativity its own subsection inside Psychological Strategies. |
| 438 | Argument by Contradiction | `RAW-SOURCE-z-argument-contradiction` | 58 | 2.3 Argument by Contradiction | `PROOF_STRUCTURE` | `NONE` | Zeitz gives argument by contradiction an explicit Methods of Argument subsection. |
| 439 | Mathematical Induction | `RAW-SOURCE-z-mathematical-induction` | 62 | 2.3 Mathematical Induction | `PROOF_STRUCTURE` | `NONE` | Zeitz gives mathematical induction an explicit Methods of Argument subsection. |
| 440 | Crossover Tactic | `RAW-SOURCE-z-crossover-tactic` | 126 | Chapter 4 — Three Important Crossover Tactics | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly defines a crossover as an idea connecting different mathematical domains and frames graph theory, complex numbers, and generating functions as crossover tactics. |
| 441 | Division Algorithm | `RAW-SOURCE-z-division-algorithm` | 241 | 7.1 GCD, LCM, and the Division Algorithm | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly names the division algorithm in the number-theory toolkit. |
| 442 | Combinatorial Proof | `RAW-SOURCE-z-combinatorial-proof` | 378 | Index — combinatorial proof | `PROOF_STRUCTURE` | `NONE` | Zeitz's index explicitly names combinatorial proof as a proof form used in the text. |
| 443 | Rigid Motions and Vectors | `RAW-SOURCE-z-rigid-motions-vectors` | 315 | 8.5 Rigid Motions and Vectors | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly develops rigid motions and vectors as geometry transformations. |
| 444 | Translation | `RAW-SOURCE-z-translation` | 315 | 8.5 Translations | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly treats translations as rigid motions usable in geometry. |
| 445 | Glide Reflection | `RAW-SOURCE-z-glide-reflection` | 318 | 8.5 Glide Reflections | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly treats glide reflection as a rigid motion. |
| 446 | Rotation | `RAW-SOURCE-z-rotation` | 319 | 8.5 Rotations | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly treats rotations as rigid motions. |
| 447 | Logarithmic Differentiation | `RAW-SOURCE-z-log-differentiation` | 352 | 9.3 A Useful Tool / Example 9.3.6 | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly presents logarithmic differentiation as a useful tool and part of a broader function-of-a-function recognition idea. |
| 448 | Algebraic Proof | `RAW-SOURCE-z-algebraic-proof` | 377 | Index — AM-GM inequality, algebraic proof | `PROOF_STRUCTURE` | `NONE` | Zeitz's index explicitly labels an algebraic proof as a proof style under AM-GM. |
| 449 | Geometric Proof | `RAW-SOURCE-z-geometric-proof` | 377 | Index — AM-GM inequality, geometric proof | `PROOF_STRUCTURE` | `NONE` | Zeitz's index explicitly labels a geometric proof as a proof style under AM-GM. |
| 450 | Deductive Argument (Direct Proof) | `RAW-SOURCE-z-deductive-argument` | 58 | 2.3 Methods of Argument — Deduction / Direct Proof | `PROOF_STRUCTURE` | `NONE` | Zeitz explicitly describes deduction as direct proof, the simplest logical form of argument. |
| 451 | Contrapositive | `RAW-SOURCE-z-contrapositive` | 58 | 2.3 Methods of Argument — contrapositive | `PROOF_STRUCTURE` | `NONE` | Zeitz explicitly presents the contrapositive as an alternate logical form used in proof. |
| 452 | Algorithmic Construction | `RAW-SOURCE-z-algorithmic-construction` | 379 | Index — Eulerian path, algorithmic construction | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly labels an algorithmic construction for an Eulerian path. |
| 453 | Dissection | `RAW-SOURCE-z-dissection` | 378 | Index — dissection | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists dissection, and later proof entries use dissection as a geometric proof method. |
| 454 | Similar Triangles | `RAW-SOURCE-z-similar-triangles` | 382 | Index — similar triangles | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index treats similar triangles as a reusable geometry method and explicitly cross-references proofs using similar triangles. |
| 455 | Composition of Transformations | `RAW-SOURCE-z-compose-transformations` | 383 | Index — transformations, composition | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's transformation index explicitly lists composition as a reusable transformation operation. |
| 456 | Look for Patterns | `RAW-SOURCE-z-look-patterns` | 380 | Index — patterns, look for | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly points to looking for patterns as a recurring problem-investigation move. |
| 457 | Brainstorming | `RAW-SOURCE-z-brainstorming` | 377 | Index | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly lists brainstorming in the problem-solving discussion. |
| 458 | Backburner Problems | `RAW-SOURCE-z-backburner` | 377 | Index | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly lists backburner problems as part of his problem-solving practice. |
| 459 | Breaking Rules | `RAW-SOURCE-z-break-rules` | 377 | Index | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly lists breaking rules in the creativity/problem-solving discussion. |
| 460 | Restating a Problem | `RAW-SOURCE-z-restate` | 381 | Index | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly lists restating a problem as a recurring move. |
| 461 | Stealing Ideas | `RAW-SOURCE-z-steal-ideas` | 382 | Index | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly lists stealing ideas in his problem-solving discussion. |
| 462 | Backward Induction | `RAW-SOURCE-z-backward-induction` | 377 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists backward induction. |
| 463 | Area as a Proof Tactic | `RAW-SOURCE-z-area-proof` | 377 | Index — area | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists area as a proof tactic. |
| 464 | Bisection Method | `RAW-SOURCE-z-bisection` | 377 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists the bisection method. |
| 465 | Repeated Bisection Method | `RAW-SOURCE-z-repeated-bisection` | 344 | Repeated-bisection discussion | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz explicitly describes the repeated bisection method as a strategy in the worked discussion. |
| 466 | Average Principle | `RAW-SOURCE-z-average-principle` | 193 | 5.5.12 The average principle | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz gives the Average Principle an explicitly named subsection. |
| 467 | Algorithmic Proof | `RAW-SOURCE-z-algorithmic-proof` | 369 | Solution 2: Algorithmic Proof | `PROOF_STRUCTURE` | `NONE` | Zeitz explicitly labels an alternative argument as an Algorithmic Proof. |
| 468 | Euclidean Algorithm | `RAW-SOURCE-z-euclidean-algorithm` | 379 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists the Euclidean algorithm. |
| 469 | Möbius Inversion Formula | `RAW-SOURCE-z-mobius-inversion` | 380 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists the Möbius inversion formula. |
| 470 | Pick's Theorem | `RAW-SOURCE-z-pick-theorem` | 381 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists Pick's theorem. |
| 471 | Well-Ordering Principle | `RAW-SOURCE-z-well-ordering` | 383 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists the well-ordering principle. |
| 472 | Symmetry-Product Principle | `RAW-SOURCE-z-symmetry-product` | 382 | Index — symmetry | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists the symmetry-product principle. |
| 473 | Homothety | `RAW-SOURCE-z-homothety` | 383 | Index — transformations | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists homothety among transformations. |
| 474 | Inversion | `RAW-SOURCE-z-inversion` | 383 | Index — transformations | `SOURCE_TERMINOLOGY` | `NONE` | Zeitz's index explicitly lists inversion among transformations. |
| 475 | Create Order out of Chaos | `RAW-SOURCE-z-order-from-chaos` | 377 | Index — chaos, creating order out of | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Zeitz's index explicitly points to creating order out of chaos in the invariants discussion. |

### 6.2 Engel — Problem-Solving Strategies — 46

| # | Candidate | Raw ID | PDF page | Source section / index location | Claim kind | Channel | Why it was harvested |
|---:|---|---|---:|---|---|---|---|
| 476 | Invariance Principle | `RAW-SOURCE-e-invariance-principle` | 5 | 1 The Invariance Principle | `SOURCE_TERMINOLOGY` | `NONE` | Engel devotes Chapter 1 to the Invariance Principle. |
| 477 | Coloring Proofs | `RAW-SOURCE-e-coloring-proofs` | 5 | 2 Coloring Proofs | `SOURCE_TERMINOLOGY` | `NONE` | Engel devotes Chapter 2 to Coloring Proofs. |
| 478 | Extremal Principle | `RAW-SOURCE-e-extremal-principle` | 5 | 3 The Extremal Principle | `SOURCE_TERMINOLOGY` | `NONE` | Engel devotes Chapter 3 to the Extremal Principle. |
| 479 | Box Principle | `RAW-SOURCE-e-box-principle` | 5 | 4 The Box Principle | `SOURCE_TERMINOLOGY` | `NONE` | Engel devotes Chapter 4 to the Box Principle. |
| 480 | Induction Principle | `RAW-SOURCE-e-induction-principle` | 5 | 8 The Induction Principle | `SOURCE_TERMINOLOGY` | `NONE` | Engel devotes Chapter 8 to the Induction Principle. |
| 481 | Working Backwards | `RAW-SOURCE-e-working-backwards` | 377 | 14.3 Working Backwards | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Engel explicitly presents Working Backwards as an old problem-solving strategy and describes its low-branching trigger. |
| 482 | Greedy Algorithm | `RAW-SOURCE-e-greedy` | 52 | 3 The Extremal Principle | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Engel introduces the greedy algorithm as a construction principle arising from an extremal search. |
| 483 | Divide and Conquer | `RAW-SOURCE-e-divide-conquer` | 91 | 5 Enumerative Combinatorics | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Engel explicitly calls Divide and Conquer a general combinatorial problem-solving strategy. |
| 484 | Sum Rule | `RAW-SOURCE-e-sum-rule` | 91 | 5 Enumerative Combinatorics | `SOURCE_TERMINOLOGY` | `NONE` | Engel names the Sum Rule within his Divide-and-Conquer counting toolkit. |
| 485 | Product Rule | `RAW-SOURCE-e-product-rule` | 91 | 5 Enumerative Combinatorics | `SOURCE_TERMINOLOGY` | `NONE` | Engel names the Product Rule within his counting toolkit. |
| 486 | Product-Sum Rule | `RAW-SOURCE-e-product-sum-rule` | 91 | 5 Enumerative Combinatorics | `SOURCE_TERMINOLOGY` | `NONE` | Engel names the Product-Sum Rule within his counting toolkit. |
| 487 | Counting by Bijection | `RAW-SOURCE-e-count-bijection` | 91 | 5 Enumerative Combinatorics | `SOURCE_TERMINOLOGY` | `NONE` | Engel explicitly names Counting by Bijection. |
| 488 | Count the Same Objects in Two Different Ways | `RAW-SOURCE-e-count-two-ways` | 91 | 5 Enumerative Combinatorics | `SOURCE_TERMINOLOGY` | `NONE` | Engel explicitly lists counting the same objects in two different ways as a counting paradigm. |
| 489 | Infinite Descent | `RAW-SOURCE-e-infinite-descent` | 129 | 6 Number Theory | `SOURCE_TERMINOLOGY` | `NONE` | Engel explicitly presents a solution by infinite descent. |
| 490 | Conjugate Numbers | `RAW-SOURCE-e-conjugate-numbers` | 378 | 14.4 Conjugate Numbers | `SOURCE_TERMINOLOGY` | `NONE` | Engel gives conjugate-number switching its own Further Strategies subsection. |
| 491 | Coding | `RAW-SOURCE-e-coding` | 399 | Index — Algorithm | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists coding under algorithms. |
| 492 | Decoding | `RAW-SOURCE-e-decoding` | 399 | Index — Algorithm | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists decoding under algorithms. |
| 493 | Automatic Solution | `RAW-SOURCE-e-automatic-solution` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists automatic solution. |
| 494 | Bijective Proof | `RAW-SOURCE-e-bijective-proof` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists bijective proof. |
| 495 | Combinatorial Proof | `RAW-SOURCE-e-combinatorial-proof` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists combinatorial proof. |
| 496 | Heuristic Principle | `RAW-SOURCE-e-heuristic-principle` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the heuristic principle. |
| 497 | Probabilistic Interpretation | `RAW-SOURCE-e-probabilistic-interpretation` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists probabilistic interpretation. |
| 498 | Principle of Inclusion and Exclusion | `RAW-SOURCE-e-pie` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the principle of inclusion and exclusion. |
| 499 | Rearrangement Inequality | `RAW-SOURCE-e-rearrangement` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the rearrangement inequality. |
| 500 | Reflection Principle | `RAW-SOURCE-e-reflection-principle` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the reflection principle. |
| 501 | Recursion | `RAW-SOURCE-e-recursion` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists recursion. |
| 502 | Sieve Formula | `RAW-SOURCE-e-sieve-formula` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the sieve formula. |
| 503 | Winning Position | `RAW-SOURCE-e-winning-position` | 400 | Index — Position | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists winning positions. |
| 504 | Losing Position | `RAW-SOURCE-e-losing-position` | 400 | Index — Position | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists losing positions. |
| 505 | Trigonometric Substitution | `RAW-SOURCE-e-trig-substitution` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists trigonometric substitution. |
| 506 | Transformation Geometry | `RAW-SOURCE-e-transformation-geometry` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists transformation geometry. |
| 507 | Roots of Unity | `RAW-SOURCE-e-roots-unity` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists roots of unity. |
| 508 | Characteristic Equation | `RAW-SOURCE-e-characteristic-equation` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists characteristic equations. |
| 509 | Symmetry | `RAW-SOURCE-e-symmetry` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists symmetry. |
| 510 | Parity | `RAW-SOURCE-e-parity` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists parity. |
| 511 | Great Ideas | `RAW-SOURCE-e-great-ideas` | 4 | Preface | `SOURCE_TERMINOLOGY` | `NONE` | Engel explicitly says Great Ideas were the leading principles of his compact contest training and a means of classifying problems. |
| 512 | Graph Theory | `RAW-SOURCE-e-graph-theory` | 373 | 14.1 Graph Theory | `SOURCE_TERMINOLOGY` | `NONE` | Engel's Further Strategies chapter explicitly singles out Graph Theory as an important strategy area. |
| 513 | Equations, Functions, and Iterations | `RAW-SOURCE-e-equations-functions-iterations` | 380 | 14.5 Equations, Functions, and Iterations | `SOURCE_TERMINOLOGY` | `NONE` | Engel gives Equations, Functions, and Iterations a dedicated subsection inside Further Strategies. |
| 514 | Integer Functions | `RAW-SOURCE-e-integer-functions` | 382 | 14.6 Integer Functions | `SOURCE_TERMINOLOGY` | `NONE` | Engel gives Integer Functions a dedicated subsection inside Further Strategies. |
| 515 | Get Rid of Floor and Ceiling Brackets | `RAW-SOURCE-e-eliminate-floor-ceiling` | 382 | 14.6 Integer Functions | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Engel explicitly says it is usually a good strategy to get rid of floor and ceiling brackets. |
| 516 | Euclidean Algorithm | `RAW-SOURCE-e-euclidean-algorithm` | 399 | Index — Algorithm | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists the Euclidean algorithm. |
| 517 | Difference Equations | `RAW-SOURCE-e-difference-equations` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists difference equations. |
| 518 | Involution | `RAW-SOURCE-e-involution` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists involution. |
| 519 | Prüfer Code | `RAW-SOURCE-e-prufer-code` | 400 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists Prüfer code. |
| 520 | Cayley's Formula | `RAW-SOURCE-e-cayley-formula` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists Cayley's formula. |
| 521 | Binet's Formula | `RAW-SOURCE-e-binet-formula` | 399 | Index | `SOURCE_TERMINOLOGY` | `NONE` | Engel's index explicitly lists Binet's formula. |

### 6.3 Hammack — Book of Proof (3.4) — 30

| # | Candidate | Raw ID | PDF page | Source section / index location | Claim kind | Channel | Why it was harvested |
|---:|---|---|---:|---|---|---|---|
| 522 | Direct Proof | `RAW-SOURCE-h-direct-proof` | 5 | 4 Direct Proof | `PROOF_STRUCTURE` | `NONE` | Hammack gives Direct Proof its own chapter. |
| 523 | Using Cases | `RAW-SOURCE-h-using-cases` | 5 | 4.4 Using Cases | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly teaches Using Cases inside Direct Proof. |
| 524 | Contrapositive Proof | `RAW-SOURCE-h-contrapositive-proof` | 5 | 5 Contrapositive Proof | `PROOF_STRUCTURE` | `NONE` | Hammack gives Contrapositive Proof its own chapter. |
| 525 | Proof by Contradiction | `RAW-SOURCE-h-contradiction-proof` | 5 | 6 Proof by Contradiction | `PROOF_STRUCTURE` | `NONE` | Hammack gives Proof by Contradiction its own chapter. |
| 526 | If-and-Only-If Proof | `RAW-SOURCE-h-iff-proof` | 5 | 7.1 If-and-Only-If Proof | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly separates if-and-only-if proof. |
| 527 | Existence Proof | `RAW-SOURCE-h-existence-proof` | 5 | 7.3 Existence Proofs | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats existence proofs. |
| 528 | Uniqueness Proof | `RAW-SOURCE-h-uniqueness-proof` | 5 | 7.3 Existence and Uniqueness Proofs | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats uniqueness as part of existence-and-uniqueness proof. |
| 529 | Constructive Proof | `RAW-SOURCE-h-constructive-proof` | 5 | 7.4 Constructive Versus Non-Constructive Proofs | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly distinguishes constructive proof. |
| 530 | Non-Constructive Proof | `RAW-SOURCE-h-nonconstructive-proof` | 5 | 7.4 Constructive Versus Non-Constructive Proofs | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly distinguishes non-constructive proof. |
| 531 | Proof by Induction | `RAW-SOURCE-h-induction` | 5 | 10.1 Proof by Induction | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats proof by induction. |
| 532 | Proof by Strong Induction | `RAW-SOURCE-h-strong-induction` | 5 | 10.2 Proof by Strong Induction | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats strong induction. |
| 533 | Proof by Smallest Counterexample | `RAW-SOURCE-h-smallest-counterexample` | 5 | 10.3 Proof by Smallest Counterexample | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats proof by smallest counterexample. |
| 534 | Combinatorial Proof | `RAW-SOURCE-h-combinatorial-proof` | 5 | 3.10 Combinatorial Proof | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly gives Combinatorial Proof its own section. |
| 535 | Counterexample | `RAW-SOURCE-h-counterexample` | 5 | 9.1 Counterexamples | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats counterexamples as a disproof technique. |
| 536 | Disproving Existence Statements | `RAW-SOURCE-h-disprove-existence` | 5 | 9.2 Disproving Existence Statements | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats disproving existence statements. |
| 537 | Disproof by Contradiction | `RAW-SOURCE-h-disproof-contradiction` | 5 | 9.3 Disproof by Contradiction | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats disproof by contradiction. |
| 538 | Treating Similar Cases | `RAW-SOURCE-h-treat-similar-cases` | 5 | 4.5 Treating Similar Cases | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly separates treating similar cases. |
| 539 | Proving Statements with Contradiction | `RAW-SOURCE-h-statements-contradiction` | 150 | 6.1 Proving Statements with Contradiction | `PROOF_STRUCTURE` | `NONE` | Hammack gives proving statements by contradiction an explicit proof-structure section. |
| 540 | Proving Conditional Statements by Contradiction | `RAW-SOURCE-h-conditional-contradiction` | 153 | 6.2 Proving Conditional Statements by Contradiction | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats contradiction as a structure for conditional statements. |
| 541 | Combining Techniques | `RAW-SOURCE-h-combining-techniques` | 154 | 6.3 Combining Techniques | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly describes combining and nesting proof techniques in proofs inside proofs. |
| 542 | Equivalent Statements | `RAW-SOURCE-h-equivalent-statements` | 161 | 7.2 Equivalent Statements | `PROOF_STRUCTURE` | `NONE` | Hammack gives proving families of equivalent statements a dedicated proof-structure section. |
| 543 | Existence-and-Uniqueness Proof | `RAW-SOURCE-h-existence-uniqueness` | 162 | 7.3 Existence Proofs; Existence and Uniqueness Proofs | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly treats the combined existence-and-uniqueness proof structure. |
| 544 | Multiplication Principle | `RAW-SOURCE-h-multiplication-principle` | 4 | 3.2 The Multiplication Principle | `SOURCE_TERMINOLOGY` | `NONE` | Hammack gives the Multiplication Principle its own section. |
| 545 | Addition and Subtraction Principles | `RAW-SOURCE-h-addition-subtraction` | 4 | 3.3 The Addition and Subtraction Principles | `SOURCE_TERMINOLOGY` | `NONE` | Hammack gives the Addition and Subtraction Principles their own section. |
| 546 | Inclusion–Exclusion Principle | `RAW-SOURCE-h-inclusion-exclusion` | 4 | 3.7 The Inclusion-Exclusion Principle | `SOURCE_TERMINOLOGY` | `NONE` | Hammack gives the Inclusion-Exclusion Principle its own section. |
| 547 | Division and Pigeonhole Principles | `RAW-SOURCE-h-division-pigeonhole` | 4 | 3.9 The Division and Pigeonhole Principles | `SOURCE_TERMINOLOGY` | `NONE` | Hammack gives the Division and Pigeonhole Principles a dedicated section. |
| 548 | Logical Inference | `RAW-SOURCE-h-logical-inference` | 4 | 2.11 Logical Inference | `PROOF_STRUCTURE` | `NONE` | Hammack explicitly gives Logical Inference a dedicated section. |
| 549 | How to Prove Membership | `RAW-SOURCE-h-prove-membership` | 5 | 8.1 How to Prove a ∈ A | `PROOF_STRUCTURE` | `NONE` | Hammack gives proving set membership an explicit proof-structure section. |
| 550 | How to Prove a Subset Relation | `RAW-SOURCE-h-prove-subset` | 5 | 8.2 How to Prove A ⊆ B | `PROOF_STRUCTURE` | `NONE` | Hammack gives proving a subset relation an explicit proof-structure section. |
| 551 | How to Prove Set Equality | `RAW-SOURCE-h-prove-set-equality` | 5 | 8.3 How to Prove A = B | `PROOF_STRUCTURE` | `NONE` | Hammack gives proving set equality an explicit proof-structure section. |

### 6.4 Velleman — How to Prove It (2nd ed.) — 26

| # | Candidate | Raw ID | PDF page | Source section / index location | Claim kind | Channel | Why it was harvested |
|---:|---|---|---:|---|---|---|---|
| 552 | Reexpress a Negative Goal | `RAW-SOURCE-v-reexpress-negative` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman lists reexpressing a negative goal as a proof technique. |
| 553 | Proof by Contradiction | `RAW-SOURCE-v-contradiction` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman lists contradiction as a technique usable in proof planning. |
| 554 | Direct Conditional Proof | `RAW-SOURCE-v-direct` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman lists assuming the antecedent and proving the consequent for P→Q. |
| 555 | Contrapositive Proof | `RAW-SOURCE-v-contrapositive` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman lists proving a conditional through its contrapositive. |
| 556 | Split a Conjunction Goal | `RAW-SOURCE-v-conjunction-split` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman instructs proving P and Q separately for a conjunction goal. |
| 557 | Prove a Disjunction | `RAW-SOURCE-v-disjunction` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman gives proof-structure options for disjunction goals. |
| 558 | Proof by Cases | `RAW-SOURCE-v-cases` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman lists proof by exhaustive cases. |
| 559 | Biconditional Proof | `RAW-SOURCE-v-biconditional` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman instructs proving both directions of a biconditional. |
| 560 | Arbitrary Object for a Universal Goal | `RAW-SOURCE-v-arbitrary-object` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman instructs taking an arbitrary object to prove a universal statement. |
| 561 | Existence Witness | `RAW-SOURCE-v-existence-witness` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman instructs finding a value that makes an existential predicate true. |
| 562 | Mathematical Induction | `RAW-SOURCE-v-induction` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman's summary includes mathematical induction. |
| 563 | Strong Induction | `RAW-SOURCE-v-strong-induction` | 390 | Summary of Proof Techniques | `PROOF_STRUCTURE` | `NONE` | Velleman's summary includes strong induction. |
| 564 | Modus Ponens | `RAW-SOURCE-v-modus-ponens` | 117 | 3.2 Proofs Involving Negations and Conditionals | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly names and explains modus ponens as a rule of inference. |
| 565 | Modus Tollens | `RAW-SOURCE-v-modus-tollens` | 117 | 3.2 Proofs Involving Negations and Conditionals | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly names and explains modus tollens as a rule of inference. |
| 566 | Existential Instantiation | `RAW-SOURCE-v-existential-instantiation` | 129 | 3.3 Proofs Involving Quantifiers | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly names existential instantiation. |
| 567 | Universal Instantiation | `RAW-SOURCE-v-universal-instantiation` | 129 | 3.3 Proofs Involving Quantifiers | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly names universal instantiation. |
| 568 | Disjunctive Syllogism | `RAW-SOURCE-v-disjunctive-syllogism` | 156 | 3.5 Proofs Involving Disjunctions | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly names disjunctive syllogism as a rule of inference. |
| 569 | Analyze the Logical Form of the Goal | `RAW-SOURCE-v-logical-form-goal` | 126 | 3 Proofs — scratch-work strategy | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Velleman repeatedly uses analysis of the goal's logical form to choose the next proof transformation. |
| 570 | Expand Definitions to Expose Logical Form | `RAW-SOURCE-v-expand-definition` | 117 | 3.2 Proofs Involving Negations and Conditionals | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Velleman explicitly notes that writing out a mathematical definition can reveal a statement's logical form and unlock proof strategy. |
| 571 | Instantiate a Unique-Existence Given | `RAW-SOURCE-v-unique-existence-given` | 393 | Summary of Proof Techniques — given ∃!x P(x) | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly instantiates a unique-existence given with a witness and its uniqueness condition. |
| 572 | Existence-and-Uniqueness Goal | `RAW-SOURCE-v-unique-existence` | 391 | Summary of Proof Techniques — ∃!x P(x) | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly instructs splitting a unique-existence goal into existence and uniqueness obligations. |
| 573 | Reexpress a Unique-Existence Goal | `RAW-SOURCE-v-reexpress-unique-existence` | 391 | Summary of Proof Techniques — ∃!x P(x) | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly gives an equivalent reexpression of a unique-existence goal. |
| 574 | Reexpress a Negative Given | `RAW-SOURCE-v-reexpress-negative-given` | 392 | Summary of Proof Techniques — given ¬P | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly recommends reexpressing a negative given as a positive statement. |
| 575 | Split a Conjunction Given | `RAW-SOURCE-v-split-conjunction-given` | 392 | Summary of Proof Techniques — given P ∧ Q | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly instructs treating a conjunction given as two givens. |
| 576 | Use a Disjunction Given for Cases | `RAW-SOURCE-v-disjunction-cases-given` | 392 | Summary of Proof Techniques — given P ∨ Q | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly instructs using a disjunction given to split the proof into cases. |
| 577 | Split a Biconditional Given | `RAW-SOURCE-v-split-biconditional-given` | 392 | Summary of Proof Techniques — given P ↔ Q | `PROOF_STRUCTURE` | `NONE` | Velleman explicitly instructs treating a biconditional given as the two conditional givens P→Q and Q→P. |

### 6.5 Gelca & Andreescu — Putnam and Beyond — 84

| # | Candidate | Raw ID | PDF page | Source section / index location | Claim kind | Channel | Why it was harvested |
|---:|---|---|---:|---|---|---|---|
| 578 | Argument by Contradiction | `RAW-SOURCE-p-contradiction` | 6 | 1.1 Argument by Contradiction | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond lists Argument by Contradiction under Methods of Proof. |
| 579 | Mathematical Induction | `RAW-SOURCE-p-induction` | 6 | 1.2 Mathematical Induction | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond lists Mathematical Induction under Methods of Proof. |
| 580 | Pigeonhole Principle | `RAW-SOURCE-p-pigeonhole` | 6 | 1.3 The Pigeonhole Principle | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond lists the Pigeonhole Principle under Methods of Proof. |
| 581 | Ordered Sets and Extremal Elements | `RAW-SOURCE-p-ordered-extremal` | 6 | 1.4 Ordered Sets and Extremal Elements | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond lists ordered sets and extremal elements under Methods of Proof. |
| 582 | Invariants and Semi-Invariants | `RAW-SOURCE-p-invariants-semi` | 6 | 1.5 Invariants and Semi-Invariants | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond lists invariants and semi-invariants under Methods of Proof. |
| 583 | Algebraic Identities | `RAW-SOURCE-p-algebraic-identities` | 6 | 2.1.1 Algebraic Identities | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Algebraic Identities a dedicated subsection. |
| 584 | Cauchy–Schwarz Inequality | `RAW-SOURCE-p-cauchy-schwarz` | 6 | 2.1.3 The Cauchy–Schwarz Inequality | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Cauchy–Schwarz a dedicated subsection. |
| 585 | Triangle Inequality | `RAW-SOURCE-p-triangle-inequality` | 6 | 2.1.4 The Triangle Inequality | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the Triangle Inequality a dedicated subsection. |
| 586 | Arithmetic Mean–Geometric Mean Inequality | `RAW-SOURCE-p-am-gm` | 6 | 2.1.5 The Arithmetic Mean–Geometric Mean Inequality | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives AM-GM a dedicated subsection. |
| 587 | Viète's Relations | `RAW-SOURCE-p-viete` | 6 | 2.2.2 Viète's Relations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Viète's relations a dedicated subsection. |
| 588 | Search for a Pattern | `RAW-SOURCE-p-search-pattern` | 7 | 3.1.1 Search for a Pattern | `DISCOVERY_HEURISTIC` | `DISCOVERY` | Putnam and Beyond gives Search for a Pattern a dedicated subsection. |
| 589 | Telescopic Series and Products | `RAW-SOURCE-p-telescopic` | 7 | 3.1.6 Telescopic Series and Products | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives telescopic series and products a dedicated subsection. |
| 590 | Intermediate Value Property | `RAW-SOURCE-p-ivp` | 7 | 3.2.3 The Intermediate Value Property | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the Intermediate Value Property a dedicated subsection. |
| 591 | Convex Functions | `RAW-SOURCE-p-convex-functions` | 7 | 3.2.6 Convex Functions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Convex Functions a dedicated subsection. |
| 592 | Functional Equations | `RAW-SOURCE-p-functional-equations` | 7 | 3.4.1 Functional Equations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Functional Equations a dedicated subsection. |
| 593 | Trigonometric Substitutions | `RAW-SOURCE-p-trig-substitution` | 8 | 4.2.3 Trigonometric Substitutions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Trigonometric Substitutions a dedicated subsection. |
| 594 | Fermat's Infinite Descent Principle | `RAW-SOURCE-p-infinite-descent` | 8 | 5.1.2 Fermat's Infinite Descent Principle | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Fermat's Infinite Descent Principle a dedicated subsection. |
| 595 | Factorization and Divisibility | `RAW-SOURCE-p-factorization-divisibility` | 8 | 5.2.1 Factorization and Divisibility | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Factorization and Divisibility a dedicated subsection. |
| 596 | Chinese Remainder Theorem | `RAW-SOURCE-p-crt` | 8 | 5.2.7 The Chinese Remainder Theorem | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the Chinese Remainder Theorem a dedicated subsection. |
| 597 | Generating Functions | `RAW-SOURCE-p-generating-functions` | 9 | 6.2.2 Generating Functions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Generating Functions a dedicated subsection. |
| 598 | Counting Strategies | `RAW-SOURCE-p-counting-strategies` | 9 | 6.2.3 Counting Strategies | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Counting Strategies a dedicated subsection. |
| 599 | Inclusion–Exclusion Principle | `RAW-SOURCE-p-inclusion-exclusion` | 9 | 6.2.4 The Inclusion–Exclusion Principle | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Inclusion–Exclusion a dedicated subsection. |
| 600 | Establishing Relations Among Probabilities | `RAW-SOURCE-p-probability-relations` | 9 | 6.3.2 Establishing Relations Among Probabilities | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives establishing relations among probabilities a dedicated subsection. |
| 601 | Linear Recursive Sequences | `RAW-SOURCE-p-linear-recurrence` | 7 | 3.1.2 Linear Recursive Sequences | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives linear recursive sequences a dedicated subsection. |
| 602 | Location of the Zeros of a Polynomial | `RAW-SOURCE-p-location-zeros` | 6 | 2.2.4 The Location of the Zeros of a Polynomial | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives polynomial zero-location a dedicated subsection. |
| 603 | Determinants | `RAW-SOURCE-p-determinants` | 7 | 2.3.2 Determinants | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives determinants a dedicated subsection. |
| 604 | Linear Transformations, Eigenvalues, Eigenvectors | `RAW-SOURCE-p-eigen` | 7 | 2.3.6 Linear Transformations, Eigenvalues, Eigenvectors | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives eigenvalue/eigenvector methods a dedicated subsection. |
| 605 | Taylor and Fourier Series | `RAW-SOURCE-p-taylor-fourier` | 7 | 3.2.11 Taylor and Fourier Series | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Taylor and Fourier series a dedicated subsection. |
| 606 | Partial Derivatives and Their Applications | `RAW-SOURCE-p-partial-deriv` | 7 | 3.3.1 Partial Derivatives and Their Applications | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives partial derivatives/applications a dedicated subsection. |
| 607 | First-Order ODEs | `RAW-SOURCE-p-first-order-ode` | 7 | 3.4.2 Ordinary Differential Equations of the First Order | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives first-order ODEs a dedicated subsection. |
| 608 | Euler's Formula | `RAW-SOURCE-p-euler-formula` | 8 | 4.2.2 Euler's Formula | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Euler's formula a dedicated subsection. |
| 609 | Telescopic Sums and Products in Trigonometry | `RAW-SOURCE-p-telescopic-trig` | 8 | 4.2.4 Telescopic Sums and Products in Trigonometry | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives trigonometric telescoping a dedicated subsection. |
| 610 | Greatest Integer Function | `RAW-SOURCE-p-greatest-integer` | 8 | 5.1.3 The Greatest Integer Function | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the greatest-integer function a dedicated subsection. |
| 611 | Modular Arithmetic | `RAW-SOURCE-p-modular` | 8 | 5.2.3 Modular Arithmetic | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives modular arithmetic a dedicated subsection. |
| 612 | Euler's Totient Function | `RAW-SOURCE-p-totient` | 8 | 5.2.6 Euler's Totient Function | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Euler's totient function a dedicated subsection. |
| 613 | Pell's Equation | `RAW-SOURCE-p-pell` | 8 | 5.3.3 Pell's Equation | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Pell's equation a dedicated subsection. |
| 614 | Ramsey Theory | `RAW-SOURCE-p-ramsey` | 9 | 6.1.5 Ramsey Theory | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Ramsey theory a dedicated subsection. |
| 615 | Combinatorial Identities | `RAW-SOURCE-p-combinatorial-identities` | 9 | 6.2.1 Combinatorial Identities | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives combinatorial identities a dedicated subsection. |
| 616 | Equally Likely Cases | `RAW-SOURCE-p-equally-likely` | 9 | 6.3.1 Equally Likely Cases | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives equally likely cases a dedicated probability subsection. |
| 617 | Geometric Probabilities | `RAW-SOURCE-p-geometric-prob` | 9 | 6.3.3 Geometric Probabilities | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives geometric probabilities a dedicated subsection. |
| 618 | Sturm's Principle | `RAW-SOURCE-p-sturm` | 6 | 2.1.6 Sturm's Principle | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Sturm's Principle a dedicated subsection. |
| 619 | Derivative of a Polynomial | `RAW-SOURCE-p-poly-derivative` | 6 | 2.2.3 The Derivative of a Polynomial | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives polynomial-derivative reasoning a dedicated subsection. |
| 620 | Irreducible Polynomials | `RAW-SOURCE-p-irreducible-poly` | 6 | 2.2.5 Irreducible Polynomials | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives irreducible polynomials a dedicated subsection. |
| 621 | Chebyshev Polynomials | `RAW-SOURCE-p-chebyshev-poly` | 6 | 2.2.6 Chebyshev Polynomials | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Chebyshev polynomials a dedicated subsection. |
| 622 | Matrix Inversion | `RAW-SOURCE-p-matrix-inverse` | 7 | 2.3.3 The Inverse of a Matrix | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives matrix inversion a dedicated subsection. |
| 623 | Systems of Linear Equations | `RAW-SOURCE-p-linear-systems` | 7 | 2.3.4 Systems of Linear Equations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives systems of linear equations a dedicated subsection. |
| 624 | Vector Spaces, Linear Combinations, Bases | `RAW-SOURCE-p-bases` | 7 | 2.3.5 Vector Spaces, Linear Combinations of Vectors, Bases | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives vector-space/basis methods a dedicated subsection. |
| 625 | Cayley–Hamilton Theorem | `RAW-SOURCE-p-cayley-hamilton` | 7 | 2.3.7 The Cayley–Hamilton and Perron–Frobenius Theorems | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond explicitly includes the Cayley–Hamilton theorem. |
| 626 | Perron–Frobenius Theorem | `RAW-SOURCE-p-perron-frobenius` | 7 | 2.3.7 The Cayley–Hamilton and Perron–Frobenius Theorems | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond explicitly includes the Perron–Frobenius theorem. |
| 627 | Limits of Sequences | `RAW-SOURCE-p-limit-sequences` | 7 | 3.1.3 Limits of Sequences | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives limits of sequences a dedicated subsection. |
| 628 | Mean Value Theorem | `RAW-SOURCE-p-mvt` | 7 | 3.2.5 The Mean Value Theorem | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the Mean Value Theorem a dedicated subsection. |
| 629 | Riemann Sums | `RAW-SOURCE-p-riemann-sums` | 7 | 3.2.9 Riemann Sums | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Riemann sums a dedicated subsection. |
| 630 | Inequalities for Integrals | `RAW-SOURCE-p-integral-ineq` | 7 | 3.2.10 Inequalities for Integrals | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives inequalities for integrals a dedicated subsection. |
| 631 | Multivariable Integrals | `RAW-SOURCE-p-multi-integral` | 7 | 3.3.2 Multivariable Integrals | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives multivariable integrals a dedicated subsection. |
| 632 | Stokes-Type Theorems | `RAW-SOURCE-p-stokes` | 7 | 3.3.3 The Many Versions of Stokes' Theorem | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the many versions of Stokes' theorem a dedicated subsection. |
| 633 | Higher-Order ODE Methods | `RAW-SOURCE-p-higher-ode` | 8 | 3.4.3 Ordinary Differential Equations of Higher Order | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives higher-order ODEs a dedicated subsection. |
| 634 | Vector Methods in Geometry | `RAW-SOURCE-p-vectors` | 8 | 4.1.1 Vectors | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond begins its geometry chapter with vector methods. |
| 635 | Coordinate Geometry of Lines and Circles | `RAW-SOURCE-p-coord-lines-circles` | 8 | 4.1.2 The Coordinate Geometry of Lines and Circles | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives coordinate geometry of lines and circles a dedicated subsection. |
| 636 | Integrals in Geometry | `RAW-SOURCE-p-integrals-geometry` | 8 | 4.1.5 Integrals in Geometry | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives integrals in geometry a dedicated subsection. |
| 637 | Trigonometric Identities | `RAW-SOURCE-p-trig-identities` | 8 | 4.2.1 Trigonometric Identities | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives trigonometric identities a dedicated subsection. |
| 638 | Fermat's Little Theorem | `RAW-SOURCE-p-flt` | 8 | 5.2.4 Fermat's Little Theorem | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Fermat's Little Theorem a dedicated subsection. |
| 639 | Wilson's Theorem | `RAW-SOURCE-p-wilson` | 8 | 5.2.5 Wilson's Theorem | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Wilson's Theorem a dedicated subsection. |
| 640 | Linear Diophantine Equations | `RAW-SOURCE-p-linear-dio` | 8 | 5.3.1 Linear Diophantine Equations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives linear Diophantine equations a dedicated subsection. |
| 641 | Equation of Pythagoras | `RAW-SOURCE-p-pythagoras-eq` | 8 | 5.3.2 The Equation of Pythagoras | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives the Pythagorean equation a dedicated subsection. |
| 642 | Permutations | `RAW-SOURCE-p-permutations` | 9 | 6.1.2 Permutations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives permutations a dedicated subsection. |
| 643 | Euler's Formula for Planar Graphs | `RAW-SOURCE-p-planar-euler` | 9 | 6.1.4 Euler's Formula for Planar Graphs | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives Euler's planar-graph formula a dedicated subsection. |
| 644 | Combinatorial Geometry | `RAW-SOURCE-p-combinatorial-geometry` | 9 | 6.1.3 Combinatorial Geometry | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives combinatorial geometry a dedicated subsection. |
| 645 | Positivity of Squares (x² ≥ 0) | `RAW-SOURCE-p-positivity-squares` | 6 | 2.1.2 x² ≥ 0 | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives x² ≥ 0 a dedicated inequalities subsection. |
| 646 | Operations with Matrices | `RAW-SOURCE-p-matrix-operations` | 7 | 2.3.1 Operations with Matrices | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives operations with matrices a dedicated subsection. |
| 647 | Binary Operations | `RAW-SOURCE-p-binary-operations` | 7 | 2.4.1 Binary Operations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives binary operations a dedicated abstract-algebra subsection. |
| 648 | Groups | `RAW-SOURCE-p-groups` | 7 | 2.4.2 Groups | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives groups a dedicated subsection. |
| 649 | Rings | `RAW-SOURCE-p-rings` | 7 | 2.4.3 Rings | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives rings a dedicated subsection. |
| 650 | Series | `RAW-SOURCE-p-series` | 7 | 3.1.5 Series | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives series a dedicated subsection. |
| 651 | Limits of Functions | `RAW-SOURCE-p-limits-functions` | 7 | 3.2.1 Limits of Functions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives limits of functions a dedicated subsection. |
| 652 | Continuous Functions | `RAW-SOURCE-p-continuous-functions` | 7 | 3.2.2 Continuous Functions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives continuous functions a dedicated subsection. |
| 653 | Derivatives and Their Applications | `RAW-SOURCE-p-derivatives-applications` | 7 | 3.2.4 Derivatives and Their Applications | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives derivatives and their applications a dedicated subsection. |
| 654 | Indefinite Integrals | `RAW-SOURCE-p-indefinite-integrals` | 7 | 3.2.7 Indefinite Integrals | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives indefinite integrals a dedicated subsection. |
| 655 | Definite Integrals | `RAW-SOURCE-p-definite-integrals` | 7 | 3.2.8 Definite Integrals | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives definite integrals a dedicated subsection. |
| 656 | Problems Solved with Techniques of Differential Equations | `RAW-SOURCE-p-ode-techniques` | 8 | 3.4.4 Problems Solved with Techniques of Differential Equations | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives problems solved with differential-equation techniques a dedicated subsection. |
| 657 | Conics and Other Curves in the Plane | `RAW-SOURCE-p-conics-curves` | 8 | 4.1.3 Conics and Other Curves in the Plane | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives conics and other plane curves a dedicated geometry subsection. |
| 658 | Coordinate Geometry in Three and More Dimensions | `RAW-SOURCE-p-higher-dim-coord-geometry` | 8 | 4.1.4 Coordinate Geometry in Three and More Dimensions | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives higher-dimensional coordinate geometry a dedicated subsection. |
| 659 | Prime Numbers | `RAW-SOURCE-p-prime-numbers` | 8 | 5.2.2 Prime Numbers | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives prime numbers a dedicated number-theory subsection. |
| 660 | Set Theory and Combinatorics of Sets | `RAW-SOURCE-p-set-combinatorics` | 9 | 6.1.1 Set Theory and Combinatorics of Sets | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives set theory and combinatorics of sets a dedicated subsection. |
| 661 | Binomial Coefficients and Counting Methods | `RAW-SOURCE-p-binomial-counting` | 9 | 6.2 Binomial Coefficients and Counting Methods | `SOURCE_TERMINOLOGY` | `NONE` | Putnam and Beyond gives binomial coefficients and counting methods a named section. |

---

## Gate-2 boundary reminder

All **661** rows above are raw candidates. At this accepted snapshot:

- `ontologyType` is still null;
- aliases are not merged;
- no candidate has been merged or split;
- no granularity disposition has been made;
- no rank or rarity has been assigned;
- no prerequisite or parent/child relation has been accepted;
- no combo graph or learning order has been built;
- no Forge, Boss, or Arena layer has begun.

The official-solution structural measurements remain **88 historical problems / 132 labelled solution sections / 32 multi-route problems** as a lower bound on route diversity. They are **not** “132 methods.”

This export is therefore best read as a **mine full of ore**, not a polished card deck. Gate 3 is where the tribunal may begin deciding what each piece actually is.
