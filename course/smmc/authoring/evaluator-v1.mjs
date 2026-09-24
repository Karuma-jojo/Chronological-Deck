// Engine/evaluator references for neutral SMMC training.
// Not learner-facing under WALL. These are valid routes, not mandatory proof styles.

export const SMMC_EVALUATOR_V1 = Object.freeze({
  "S-NEUTRAL-MB1-01": {
    reference: [
      "Since x+y=1, the left side is (2+x+y)/((1+x)(1+y)) = 3/(2+xy).",
      "For x,y>0 with x+y=1, xy≤1/4, so 2+xy≤9/4.",
      "The denominator is positive, hence 3/(2+xy)≥3/(9/4)=4/3.",
      "Equality in xy≤1/4 occurs exactly at x=y=1/2, so equality holds there.",
      "Because equality is actually attained, any constant larger than 4/3 fails at x=y=1/2."
    ].join(" "),
    rubric: [
      "Must preserve the inequality direction when bounding the positive denominator.",
      "Must identify equality at x=y=1/2.",
      "Must separately justify sharpness, not merely prove ≥4/3."
    ]
  },
  "S-NEUTRAL-MB1-02": {
    reference: [
      "AM-GM gives 1+a≥2√a, 1+b≥2√b, and 1+c≥2√c.",
      "Multiplying, (1+a)(1+b)(1+c)≥8√(abc)=8.",
      "At a=b=c=1, the product equals 8.",
      "Therefore the largest possible universal constant is C=8."
    ].join(" "),
    rubric: [
      "A correct alternative lower-bound route is acceptable.",
      "Must exhibit a=b=c=1 to establish sharpness."
    ]
  },
  "S-NEUTRAL-N1-01": {
    reference: [
      "84=2·30+24 and 30=1·24+6, so gcd(84,30)=6.",
      "Back-substitution gives 6=30-24=30-(84-2·30)=3·30-84.",
      "Thus one Bézout pair is u=-1, v=3.",
      "Multiplying by 3 gives 18=-3·84+9·30, so one solution is x=-3, y=9."
    ].join(" "),
    rubric: [
      "Must show Euclid, not simply state gcd=6.",
      "Must back-substitute or otherwise justify the Bézout coefficients.",
      "Any correct integer solution of the final equation is acceptable."
    ]
  },
  "S-NEUTRAL-N1-02": {
    reference: [
      "gcd(35,50)=5, and 5 divides 10, so solutions exist.",
      "Divide the congruence and modulus by 5: 7x≡2 (mod 10).",
      "Since 7·3≡1 (mod 10), multiply by 3 to get x≡6 (mod 10).",
      "Equivalently modulo 50 the five residue classes are 6,16,26,36,46.",
      "The division step is legal because the original congruence 50 | (35x-10) is equivalent to 10 | (7x-2) after factoring out 5."
    ].join(" "),
    rubric: [
      "Must use the gcd solvability condition or an equivalent divisibility argument.",
      "Must not cancel 5 while leaving modulus 50 unchanged.",
      "Must give the complete solution x≡6 (mod 10), not a single integer."
    ]
  },
  "S-NEUTRAL-GR1-01": {
    reference: [
      "Choose a vertex v0 and one incident edge, then continue at each new vertex along the edge different from the one just used.",
      "Because the graph is finite, some vertex repeats. Take the first repetition; the vertices between the two occurrences form a cycle.",
      "Every vertex on that cycle already uses both of its incident edges inside the cycle because its degree is 2.",
      "Therefore no edge can leave the cycle. Since G is connected, there cannot be any additional vertex outside it.",
      "Hence the whole graph is exactly one cycle."
    ].join(" "),
    rubric: [
      "Must use finiteness to force a repetition.",
      "Must explain why degree 2 prevents an edge from leaving the discovered cycle.",
      "Must use connectedness to conclude there are no other vertices."
    ]
  },
  "S-NEUTRAL-GR1-02": {
    reference: [
      "Make one vertex for each person and join two vertices exactly when the two people know each other.",
      "Mutual acquaintance makes this a simple undirected graph, and every vertex has degree 2.",
      "Each connected component is therefore a cycle.",
      "Seat the people from each component in that cycle order around one circular table.",
      "Then each person has exactly the two adjacent cycle vertices, which are exactly the two acquaintances."
    ].join(" "),
    rubric: [
      "Must make the graph translation explicit.",
      "May cite the degree-2 component lemma only if it has already been established.",
      "Must explain how the cycle order gives the required seating."
    ]
  },
  "S-NEUTRAL-K1-01": {
    reference: [
      "Write n identical marks in a row and consider the n-1 gaps between consecutive marks.",
      "Choose k-1 gaps for separators. The resulting k blocks have positive sizes x1,...,xk summing to n.",
      "Conversely any ordered positive k-tuple summing to n uniquely determines separator positions after x1 marks, then after x1+x2 marks, and so on.",
      "Thus the encoding is bijective with the (k-1)-subsets of n-1 gaps, giving C(n-1,k-1)."
    ].join(" "),
    rubric: [
      "Must specify both forward encoding and recovery.",
      "Must explain why block sizes are positive.",
      "A stars-and-bars drawing is acceptable if reversibility is stated."
    ]
  },
  "S-NEUTRAL-K1-02": {
    reference: [
      "Replace xi by yi=xi+1. Then each yi is positive and y1+...+yk=n+k.",
      "By the positive-parts bijection, the number is C(n+k-1,k-1).",
      "Equivalently, encode n stars and k-1 separators directly; empty blocks are now allowed.",
      "The answer differs from the positive-parts count because zeros are permitted, which shifts each coordinate by one in the reduction."
    ].join(" "),
    rubric: [
      "Must give a reversible encoding or an explicit bijective reduction to positive parts.",
      "Must obtain C(n+k-1,k-1).",
      "Must explain the role of allowing zero entries."
    ]
  },
  "S-NEUTRAL-AN1-01": {
    reference: [
      "Group the terms after the first as (1/2), then (1/3+1/4), then (1/5+...+1/8), and so on.",
      "In the block with indices 2^k+1 through 2^(k+1), there are 2^k terms and each is at least 1/2^(k+1).",
      "Therefore every such block has sum at least 1/2.",
      "After m blocks the partial sum is at least 1+m/2, which is unbounded.",
      "Hence the harmonic series diverges."
    ].join(" "),
    rubric: [
      "Must identify a family of disjoint blocks.",
      "Must give a uniform positive lower bound per block.",
      "Must conclude unbounded partial sums."
    ]
  },
  "S-NEUTRAL-AN1-02": {
    reference: [
      "For n≥1, √n≤n, so n+√n≤2n.",
      "All quantities are positive, so 1/(n+√n)≥1/(2n).",
      "The comparison series Σ 1/(2n) is one half of the harmonic series and diverges.",
      "Therefore Σ 1/(n+√n) diverges by comparison."
    ].join(" "),
    rubric: [
      "Must use the correct comparison direction for proving divergence.",
      "Must justify n+√n≤2n or an equivalent eventual inequality.",
      "Must identify a divergent benchmark."
    ]
  },
  "S-NEUTRAL-X1-01": {
    reference: [
      "Introduce d=a-b. Then (a+b)^2-(a-b)^2=4ab.",
      "Since a+b=s, we get 4ab=s^2-d^2≤s^2.",
      "Therefore ab≤s^2/4.",
      "Equality holds exactly when d=0, i.e. a=b=s/2."
    ].join(" "),
    rubric: [
      "Must introduce an auxiliary imbalance quantity or an equivalent transformed object.",
      "Must explain why its nonnegativity gives the bound.",
      "Must identify the equality condition."
    ]
  },
  "S-NEUTRAL-X1-02": {
    reference: [
      "Expand the left side: Σ_{i<j}(xi^2+xj^2-2xixj).",
      "Each xi^2 appears in exactly n-1 pairs, so the square terms contribute (n-1)Σxi^2.",
      "Also (Σxi)^2=Σxi^2+2Σ_{i<j}xixj=0, hence 2Σ_{i<j}xixj=-Σxi^2.",
      "Substituting gives (n-1)Σxi^2+Σxi^2=nΣxi^2."
    ].join(" "),
    rubric: [
      "Must organize the pairwise cross terms through an aggregate identity such as (Σxi)^2.",
      "Must use the zero-sum condition explicitly.",
      "Must obtain the exact coefficient n."
    ]
  },
  "S-NEUTRAL-N1-03": {
    reference: [
      "From x≡2 (mod 3) and x≡3 (mod 5), write x=2+3k. Then 2+3k≡3 (mod 5), so 3k≡1 (mod 5).",
      "Since 3^{-1}≡2 (mod 5), k≡2 (mod 5), hence x≡8 (mod 15).",
      "Now write x=8+15t and impose x≡2 (mod 7): 8+15t≡2, so 1+t≡2 (mod 7), hence t≡1 (mod 7).",
      "Therefore x≡23 (mod 105).",
      "Because 3,5,7 are pairwise coprime, CRT gives uniqueness modulo 3·5·7=105."
    ].join(" "),
    rubric: [
      "Must satisfy all three congruences.",
      "Must state uniqueness modulo 105.",
      "A different constructive CRT route is acceptable."
    ]
  },
  "S-NEUTRAL-N1-04": {
    reference: [
      "A class modulo 30 is coprime to 30 exactly when it is nonzero modulo 2, modulo 3, and modulo 5.",
      "There is 1 nonzero class modulo 2, 2 modulo 3, and 4 modulo 5.",
      "By CRT, every choice of these coordinates corresponds to exactly one class modulo 30.",
      "Hence there are 1·2·4=8 classes coprime to 30.",
      "They are 1,7,11,13,17,19,23,29 modulo 30."
    ].join(" "),
    rubric: [
      "Must connect coprimality with nonzero residues modulo 2,3,5.",
      "Must use CRT uniqueness or an equivalent one-to-one argument.",
      "Must obtain 8."
    ]
  },
  "S-NEUTRAL-I1-01": {
    reference: [
      "Strengthen the claim to the triple pattern (F_{3k},F_{3k+1},F_{3k+2})≡(0,1,1) modulo 2 for every k≥0.",
      "Base k=0 gives (0,1,1).",
      "Assume a triple has parity (0,1,1). Then the next three terms have parities 1+1≡0, 1+0≡1, and 0+1≡1 modulo 2.",
      "So the pattern reproduces itself for k+1.",
      "Therefore F_n is even exactly at indices divisible by 3."
    ].join(" "),
    rubric: [
      "Must state the strengthened triple pattern.",
      "Must prove the entire triple advances to the next triple.",
      "Must conclude the original iff statement."
    ]
  },
  "S-NEUTRAL-I1-02": {
    reference: [
      "Verify the consecutive base cases 12=3·4, 13=2·4+5, 14=4+2·5, and 15=3·5.",
      "Now suppose m≥12 has a representation m=4a+5b.",
      "Then m+4=4(a+1)+5b also has one.",
      "Every n≥12 is congruent modulo 4 to exactly one of 12,13,14,15, so repeated addition of 4 reaches every later integer.",
      "Equivalently this is induction with a four-case base window and step n→n+4."
    ].join(" "),
    rubric: [
      "Must establish enough consecutive base cases.",
      "Must explain why a step of +4 covers all later integers from that base window.",
      "Must keep coefficients nonnegative."
    ]
  },
  "S-NEUTRAL-W1-01": {
    reference: [
      "We prove the contrapositive. Suppose n is odd.",
      "Then n=2k+1 for some integer k, so n²=(2k+1)²=4k²+4k+1=2(2k²+2k)+1, which is odd.",
      "Thus whenever n is odd, n² is odd.",
      "Therefore, by contraposition, if n² is even then n is even, as required."
    ].join(" "),
    rubric: [
      "Must give a logically valid direct, contradiction, or contrapositive proof; examples alone do not count.",
      "If using contraposition, must explicitly connect 'odd n implies odd n²' back to the original implication.",
      "Must keep the integer witness k and parity conclusion explicit enough for the implication to be checkable."
    ]
  },
  "S-NEUTRAL-W1-02": {
    reference: [
      "Use the identity a³+b³+c³-3abc=(a+b+c)(a²+b²+c²-ab-bc-ca).",
      "The assumption a+b+c=0 makes the first factor zero.",
      "Hence a³+b³+c³-3abc=0.",
      "Rearranging gives a³+b³+c³=3abc, exactly the desired conclusion."
    ].join(" "),
    rubric: [
      "Must explicitly use a+b+c=0 rather than merely quote the final identity.",
      "Must justify the factorization, either by expansion or by a previously established algebraic identity.",
      "Must finish with the requested equality and not stop at an unexplained zero product."
    ]
  }
});

export default SMMC_EVALUATOR_V1;
