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
  },
  "S-NEUTRAL-C1-01": {
    reference: [
      "Lemma: if x≥y then x-y≥0, so |x-y|=x-y; if x<y then x-y<0, so |x-y|=y-x.",
      "The cases x≥y and x<y are exhaustive and disjoint, and x=y belongs to the first case.",
      "If x≥y, substituting |x-y|=x-y gives (x+y+x-y)/2=x=max(x,y) and (x+y-x+y)/2=y=min(x,y).",
      "If x<y, substituting |x-y|=y-x gives (x+y+y-x)/2=y=max(x,y) and (x+y-y+x)/2=x=min(x,y).",
      "Since both formulas hold in every case, the two identities hold for all real x,y."
    ].join(" "),
    rubric: [
      "Must choose a valid exhaustive nonoverlapping order partition and assign x=y explicitly; x≥y/x<y or the equivalent reversed convention is acceptable.",
      "Must prove the absolute-value lemma once and reuse it rather than silently assuming both formulas.",
      "Must verify both max and min identities in both cases.",
      "Must reassemble the cases into a global conclusion for all real x,y."
    ]
  },
  "S-NEUTRAL-C1-02": {
    reference: [
      "Claim: |x+y|=|x|+|y| if and only if xy≥0.",
      "First suppose xy≥0. Then x and y have the same weak sign: either both are nonnegative or both are nonpositive, with zero included. In the nonnegative case |x+y|=x+y=|x|+|y|; in the nonpositive case |x+y|=-(x+y)=(-x)+(-y)=|x|+|y|.",
      "For the opposite-sign case, prove the lemma: if a,b>0 then |a-b|<a+b. If a≥b, then |a-b|=a-b<a+b because b>0; the case b>a is symmetric.",
      "Now if xy<0, x and y are nonzero with opposite signs. Put a=|x| and b=|y|. Then |x+y|=|a-b|<a+b=|x|+|y|, so equality is impossible.",
      "Therefore equality implies xy is not negative, hence xy≥0; together with the first direction this proves the classification."
    ].join(" "),
    rubric: [
      "Must state the final classification as the iff condition xy≥0.",
      "Must choose an exhaustive nonoverlapping sign architecture and account for zero exactly; xy≥0/xy<0 or an equivalent fully closed partition is acceptable.",
      "Must prove a strict opposite-sign lemma rather than merely assert triangle-inequality equality conditions.",
      "Must prove both sufficiency and necessity and close the iff."
    ]
  },
  "S-NEUTRAL-E1-01": {
    reference: [
      "There are only n+1 feasible pairs (a,n-a), so a maximizing pair exists.",
      "Choose a maximizing pair and relabel if necessary so a≤b.",
      "If b-a≥2, the feasible pair (a+1,b-1) has the same sum n and nonnegative coordinates.",
      "Its product changes by (a+1)(b-1)-ab=b-a-1>0, contradicting maximality.",
      "Therefore every maximizing pair has |a-b|≤1. If n is even the only maximizing pair is (n/2,n/2); if n is odd the maximizing ordered pairs are ((n-1)/2,(n+1)/2) and its reversal.",
      "The maximum is floor(n²/4): n²/4 for even n and (n²-1)/4 for odd n."
    ].join(" "),
    rubric: [
      "Must justify existence of a maximizing feasible pair.",
      "Must give a constraint-preserving local move and compute its product change exactly.",
      "Must derive |a-b|≤1 from strict improvement, not merely guess balanced pairs.",
      "Must state the exact maximum and all maximizing ordered pairs, including the odd-n reversal."
    ]
  },
  "S-NEUTRAL-E1-02": {
    reference: [
      "Assume for contradiction that some integer n≥2 is not a product of primes, and let n be the least such integer; the least exists by well-ordering.",
      "The integer n is not prime, because a prime is already a product consisting of that one prime.",
      "Hence n is composite, so n=ab for integers a,b with 1<a<n and 1<b<n.",
      "By minimality of n, both a and b are products of primes.",
      "Concatenating those prime factorizations expresses n=ab as a product of primes, contradicting the choice of n.",
      "Therefore no counterexample exists."
    ].join(" "),
    rubric: [
      "Must justify the existence of a least counterexample if any counterexample exists.",
      "Must explain why the least counterexample is composite and produce factors strictly between 1 and n.",
      "Must invoke minimality only for those strictly smaller factors.",
      "Must reconstruct a prime product for n and explicitly close the contradiction."
    ]
  },
  "S-NEUTRAL-S1-01": {
    reference: [
      "The quantity R is unchanged when (x,y) is replaced by (λx,λy) for any λ>0, so normalize with λ=1/(x+y): put u=x/(x+y), v=y/(x+y). Then u,v>0 and u+v=1, and the normalization is reversible by multiplying by any positive scale.",
      "Swapping x and y preserves the domain and R, so it is legitimate to assume u≤v without loss of generality; the omitted case is recovered by the swap.",
      "Now 0<u≤1/2 and v=1-u, hence R=(u-v)²=(1-2u)². Thus 0≤1-2u<1, so 0≤R<1.",
      "Conversely, let q∈[0,1) and put r=√q∈[0,1). Choose u=(1-r)/2 and v=(1+r)/2. Then u,v>0, u+v=1, and ((u-v)/(u+v))²=r²=q.",
      "Therefore the exact range is [0,1)."
    ].join(" "),
    rubric: [
      "Must prove scale invariance before normalizing x+y to 1 and retain a reverse interpretation to positive x,y.",
      "Must justify the x↔y WLOG step by symmetry rather than simply assuming an order.",
      "Must prove the strict upper bound R<1 and include R=0 correctly.",
      "Must prove every q in [0,1) is attained by an explicit positive pair; a bound alone is not a range classification."
    ]
  },
  "S-NEUTRAL-S1-02": {
    reference: [
      "Let k be the number of switches on. A move toggling two distinct switches changes k by +2 if both were off, by -2 if both were on, and by 0 if exactly one was on.",
      "Therefore k mod 2 is invariant. Since initially k=0, every reachable state has even k.",
      "Conversely, let k be any even integer with 0≤k≤n. Select k switches, partition them into k/2 disjoint pairs, and toggle each selected pair once.",
      "Each selected switch is toggled exactly once and every unselected switch zero times, so exactly those k switches finish on. For k=0 use no moves.",
      "Hence the reachable counts are exactly the even integers k between 0 and n."
    ].join(" "),
    rubric: [
      "Must compute all three possible changes in the on-count under one legal move and deduce parity invariance.",
      "Must use the initial even parity to rule out every odd k.",
      "Must construct a legal move sequence for every admissible even k, including k=0.",
      "Must state the final classification with the bound 0≤k≤n rather than merely saying 'even'."
    ]
  },
  "S-NEUTRAL-AN2-01": {
    reference: [
      "Nestedness implies a_n is nondecreasing and b_n is nonincreasing. The set A={a_n:n≥1} is nonempty and bounded above by b_1, so let s=sup A.",
      "Fix m. Since s is an upper bound of A, a_m≤s. Also every lower endpoint a_n≤b_m: for n≥m this follows from I_n⊆I_m, while for n<m we have a_n≤a_m≤b_m. Thus b_m is an upper bound of A, so s≤b_m.",
      "Hence a_m≤s≤b_m for every m, so s belongs to every I_m.",
      "If x and y both belong to every I_m, then |x-y|≤b_m-a_m for every m.",
      "Because b_m-a_m→0, a positive distance |x-y| would eventually exceed the interval length. Therefore |x-y|=0 and x=y.",
      "Thus the common point exists and is unique."
    ].join(" "),
    rubric: [
      "Must justify that the lower endpoints have a finite supremum; merely naming sup without nonempty/bounded checks is incomplete.",
      "Must prove the supremum lies between a_m and b_m for every fixed m, not only asymptotically.",
      "Must use b_m-a_m→0 to prove uniqueness.",
      "Must conclude both existence and uniqueness of a point in the full intersection."
    ]
  },
  "S-NEUTRAL-AN2-02": {
    reference: [
      "Claim (i) is guaranteed: under the ordinary Riemann/Darboux compact-interval convention, Riemann integrability includes (equivalently requires) boundedness.",
      "Claims (ii) and (iii) are false. Let h(x)=x for 0≤x<1 and h(1)=0. It differs from the continuous function g(x)=x at one point, so by the permitted finite-modification fact h is Riemann integrable and has the same integral as g.",
      "The function h is not continuous at x=1 because the left-hand limit is 1 while h(1)=0.",
      "Its supremum is 1, since values h(x) approach 1 from below, but no x∈[0,1] has h(x)=1; hence the supremum need not be attained.",
      "If |f(x)|≤M on [0,1], then -M≤f(x)≤M. Monotonicity of the definite integral gives -M≤∫_0^1 f≤M, so |∫_0^1 f|≤M."
    ].join(" "),
    rubric: [
      "Must identify boundedness as guaranteed under the stated Riemann convention and must not infer continuity.",
      "Must use h to refute both continuity and supremum attainment, including why sup h=1 is not attained.",
      "Must invoke the supplied finite-point-modification fact to justify h remains Riemann integrable.",
      "Must derive the integral bound from -M≤f≤M and integral monotonicity, not from an unsupported mean-value claim."
    ]
  },
  "S-NEUTRAL-AN2-03": {
    reference: [
      "General lemma: if L_i are affine and F=max_i L_i, then for 0≤t≤1, each L_i((1-t)x+ty)=(1-t)L_i(x)+tL_i(y)≤(1-t)F(x)+tF(y); taking the maximum over i proves convexity of F.",
      "Compare the three lines. The crossings are -x=x-2 at x=1, -x=2x-5 at x=5/3, and x-2=2x-5 at x=3.",
      "The crossing x=5/3 is hidden below x-2 and is not an envelope switch. Direct comparison gives F(x)=-x for x≤1, F(x)=x-2 for 1≤x≤3, and F(x)=2x-5 for x≥3.",
      "On x≤1 the active piece -x decreases as x increases; on [1,3] the active piece x-2 increases; the final piece also increases.",
      "Therefore the global minimum is F(1)=-1, attained only at x=1."
    ].join(" "),
    rubric: [
      "Must prove convexity, either directly or through a correctly proved max-of-affine lemma.",
      "Must identify the hidden -x/2x-5 crossing as nonactive and give the correct active intervals and switch points 1 and 3.",
      "Must justify the global minimum from the active pieces rather than from an unverified sketch.",
      "Must state both the minimum value -1 and the unique minimizer x=1."
    ]
  },
  "S-NEUTRAL-AN2-04": {
    reference: [
      "The candidate is E(x)=-x for 0≤x≤1 and E(x)=x-2 for 1≤x≤2, equivalently E(x)=|x-1|-1.",
      "It satisfies E(0)=0, E(1)=-1, E(2)=0. Its slopes are -1 then +1, hence nondecreasing; equivalently |x-1| is convex, so E is convex.",
      "Let g be any admissible convex function. For x∈[0,1], write x=(1-x)·0+x·1. Convexity gives g(x)≤(1-x)g(0)+xg(1)≤-x=E(x).",
      "For x∈[1,2], write x=(2-x)·1+(x-1)·2. Convexity gives g(x)≤(2-x)g(1)+(x-1)g(2)≤x-2=E(x).",
      "Thus every admissible convex g lies pointwise below E, while E itself is admissible, so E is the pointwise greatest possible function."
    ].join(" "),
    rubric: [
      "Must construct the correct piecewise-affine candidate and verify all three pointwise constraints.",
      "Must prove the candidate is convex; a picture alone is insufficient.",
      "Must use convexity/chord bounds separately on [0,1] and [1,2] to dominate an arbitrary admissible g.",
      "Must conclude pointwise maximality of E, not merely that E is one admissible example."
    ]
  }
});

export default SMMC_EVALUATOR_V1;
