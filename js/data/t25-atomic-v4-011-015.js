// Hand-authored T25 M.Stat v4 session cards 011-015.
// These contracts implement audited syllabus steps F5.3 through A2.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_011_015 = [
  {
    id:"T25-ARC802-A1011",routeOrder:11,syllabusCode:"F5.3",targetCode:"F5",parentId:"ARC802",
    title:"Test injectivity/surjectivity and construct an inverse on stated sets.",
    focus:"Treating domain and codomain as part of a function's definition, then testing one-to-one and onto claims against those stated sets before attempting to invert the rule.",
    purpose:"Close the foundation function block with the exact condition under which an inverse function exists, while preventing algebraic inverse-formula manipulations from replacing proofs of injectivity and surjectivity.",
    centralCapability:"Given a function together with an explicit domain and codomain, decide injectivity and surjectivity from their definitions, identify whether the function is bijective, and construct and verify an inverse exactly on the sets where a two-sided inverse is legitimate.",
    principalObstacle:"A familiar formula can tempt the learner to announce an inverse without checking the declared domain/codomain, to confuse solving y=f(x) with proving bijectivity, or to call a function noninvertible globally when an explicitly stated restriction would make the requested map bijective.",
    entryPrerequisites:["009 / F5.1 images, preimages and membership logic","010 / F5.2 relation and equivalence-class discipline","006 / F3.2 parameter/case-safe function reasoning","007-008 / F4 quantified claims and proof/counterexample discipline"],
    requiredOwnership:[
      "State the domain and codomain before judging injectivity or surjectivity; recognise that changing either can change the answer.",
      "Test injectivity from f(x1)=f(x2) implying x1=x2, or refute it with two distinct legal inputs sharing one output.",
      "Test surjectivity by taking an arbitrary codomain element and determining whether at least one legal preimage exists, rather than merely inspecting several outputs.",
      "Conclude that an inverse function on the stated codomain exists exactly when the map is bijective, and distinguish this from the always-defined preimage-set notation f^{-1}(B).",
      "Construct the inverse rule where legitimate and verify both compositions on their proper domains, including any endpoint or branch restriction required by the stated sets."
    ],
    applicationScope:"Elementary real-valued, finite-set and parameter-light functions with explicitly stated domains/codomains where injectivity, surjectivity, bijectivity and inverse construction can be settled directly from definitions and algebra.",
    transferScope:"A fresh function whose algebraic inverse formula looks plausible but whose domain or codomain hides a failure of injectivity or surjectivity, requiring the learner to diagnose the set-level obstruction and state the smallest valid conclusion.",
    inScope:["Domain/codomain-sensitive injectivity","Surjectivity onto a stated codomain","Bijectivity","Inverse-function construction","Two-sided inverse verification and simple domain restriction"],
    outOfScope:["General composition/periodicity constraints reserved for A5.3","Inverse-function differentiation","Abstract cardinality or choice arguments","Linear-map invertibility and matrix inverse reserved for M3"],
    exitCondition:"For one unfamiliar function with explicitly stated domain and codomain, prove or refute injectivity and surjectivity separately, decide bijectivity, and if bijective construct an inverse and verify both compositions on the correct sets without hints.",
    nextArcBoundary:"012 · A1.1 leaves foundational set/function logic and begins polynomial structure: factor/remainder reasoning and Vieta relations become the central tools for connecting roots with coefficients.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC803-A1012",routeOrder:12,syllabusCode:"A1.1",targetCode:"A1",parentId:"ARC803",
    title:"Use factor/remainder and Vieta in one root-coefficient problem.",
    focus:"Moving fluently between polynomial values, linear factors, roots and coefficient relations without expanding or solving more of the polynomial than the question requires.",
    purpose:"Build the compact polynomial toolkit repeatedly useful in entrance algebra: the factor/remainder theorem identifies roots and divisibility, while Vieta converts symmetric information about roots into coefficient constraints.",
    centralCapability:"Given a polynomial with numeric or symbolic coefficients, use the remainder/factor theorem and the appropriate Vieta relations to translate root information into coefficient equations or coefficient information into symmetric root constraints, while preserving degree and leading-coefficient conventions.",
    principalObstacle:"Learners often treat Vieta as a memorised quadratic formula, lose signs or leading-coefficient factors in higher-degree cases, or infer divisibility from an unchecked candidate root; another common error is to solve all roots when only a symmetric coefficient relation is needed.",
    entryPrerequisites:["003-004 / F2 equation and implication discipline","007-008 / F4 claim/proof discipline","Elementary polynomial expansion, collection of coefficients and substitution"],
    requiredOwnership:[
      "Use P(a) as the remainder on division by x-a and conclude x-a is a factor exactly when P(a)=0.",
      "Write Vieta relations with the correct signs and division by the leading coefficient for the degree actually given, not only for monic quadratics.",
      "Translate symmetric quantities such as sums or products of roots into coefficient expressions without unnecessarily solving the polynomial.",
      "Combine a known root/factor condition with Vieta or coefficient comparison to determine an unknown parameter and then check the resulting polynomial condition.",
      "Keep root multiplicity and polynomial identity claims separate unless the information supplied actually establishes them."
    ],
    applicationScope:"Polynomials of modest degree, typically quadratic through quartic or factored higher-degree expressions, where root/coefficient constraints can be obtained exactly by evaluation, factor reasoning, coefficient comparison or elementary Vieta relations.",
    transferScope:"An unfamiliar parameterised polynomial in which the useful route is hidden: the learner must recognise whether one evaluation, one factor condition or one symmetric Vieta relation settles the requested coefficient/root quantity without brute-force root solving.",
    inScope:["Remainder theorem","Factor theorem","Roots and linear factors","Vieta root-coefficient relations","Symmetric root constraints and elementary coefficient comparison"],
    outOfScope:["Repeated-root and multiplicity certification reserved for A1.2","Calculus-based root counts or monotonicity reserved for C4","Numerical root-finding algorithms","Complex polar/root-of-unity machinery reserved for A4"],
    exitCondition:"Solve one fresh root-coefficient problem by choosing and justifying factor/remainder or Vieta reasoning, preserve all signs and leading-coefficient factors, determine the requested constraint without gratuitous root solving, and verify the final condition directly in the polynomial.",
    nextArcBoundary:"013 · A1.2 keeps polynomial structure but changes the question from ordinary root/coefficient conversion to identity testing, degree/root-count logic and repeated-root multiplicity.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC803-A1013",routeOrder:13,syllabusCode:"A1.2",targetCode:"A1",parentId:"ARC803",
    title:"Test a polynomial identity or repeated-root condition using degree and roots.",
    focus:"Using the finite root capacity of a nonzero polynomial and algebraic factor multiplicity to decide identity and repeated-root claims without relying on graph shape or numerical coincidence.",
    purpose:"Complete the audited A1 target by making degree a proof tool: enough distinct zeros force a bounded-degree difference polynomial to vanish identically, while repeated roots are encoded by repeated linear factors rather than by a visually flat graph.",
    centralCapability:"Given two polynomial expressions or a polynomial with a claimed repeated root, use degree bounds, distinct-root counts and factor multiplicity to decide whether an equality is a genuine polynomial identity and whether a root occurs with the stated multiplicity, including parameter cases that change degree.",
    principalObstacle:"Agreement at several sample points can be mistaken for an identity even when the degree bound is too high, while repeated roots are often guessed from repeated numerical solutions or graph appearance; parameter values can also silently lower degree and invalidate a generic root-count argument.",
    entryPrerequisites:["012 / A1.1 factor/remainder theorem and root-coefficient reasoning","007-008 / F4 proof and counterexample discipline","F2 parameter-safe equation reasoning"],
    requiredOwnership:[
      "Form the difference of two proposed polynomial expressions and translate identity into the statement that this difference polynomial is identically zero.",
      "Use the fact that a nonzero degree-n polynomial has at most n distinct roots only when the degree bound is valid in the active parameter case.",
      "Recognise a root of multiplicity m algebraically through divisibility by (x-r)^m but not by (x-r)^(m+1), with the simpler square-factor test for a repeated root.",
      "Separate exceptional parameter values that reduce degree or change the leading coefficient before applying a degree/root-count certificate.",
      "Distinguish distinct-root count from multiplicity count and state exactly which one an identity or repeated-root argument needs."
    ],
    applicationScope:"Elementary real or complex polynomials with explicit degree bounds, known roots/factors or symbolic parameters where identity and multiplicity can be certified by algebraic root structure rather than derivative or numerical methods.",
    transferScope:"A fresh polynomial claim engineered so that many checked values suggest equality, or a parameter makes the nominal leading term disappear; the learner must identify the correct degree case and supply a decisive identity/multiplicity argument.",
    inScope:["Polynomial identities via difference polynomials","Degree and distinct-root bounds","Repeated roots","Algebraic multiplicity through factor powers","Parameter-dependent degree exceptions"],
    outOfScope:["Derivative criterion P(r)=P'(r)=0 as a primary method before calculus","Real-root location and monotonicity","General fundamental theorem of algebra proofs","Numerical polynomial approximation"],
    exitCondition:"For one unfamiliar identity-or-multiplicity problem, state the valid degree bound, separate any degree-dropping parameter case, use distinct roots or repeated factors to reach a proof-level conclusion, and explain why checking several numerical values or a graph would not by itself certify the claim.",
    nextArcBoundary:"014 · A2.1 leaves polynomial root structure and begins indexed progressions and finite sums, with AP/GP/HP conventions and exceptional cases handled explicitly.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC804-A1014",routeOrder:14,syllabusCode:"A2.1",targetCode:"A2",parentId:"ARC804",
    title:"Derive an indexed AP/GP/HP relation with exceptional cases.",
    focus:"Getting indexing, term counts and exceptional parameter values right when deriving arithmetic, geometric and harmonic-progression relations rather than recalling formulas without their conditions.",
    purpose:"Create reliable finite-sum and progression machinery for later counting, probability and sequence work, where an off-by-one term count or an illegal division by r-1 can propagate through an otherwise correct solution.",
    centralCapability:"From the definitions of AP, GP and HP, derive the requested nth-term or finite-sum relation with explicit indexing, translate HP statements through reciprocals when legal, and isolate exceptional cases such as a geometric ratio equal to one or a reciprocal term equal to zero.",
    principalObstacle:"Formula memory hides assumptions: learners frequently mix a0/a1 indexing, count n versus n+1 terms incorrectly, divide the finite-GP identity by 1-r when r=1, or treat an HP as if its terms themselves had constant difference rather than their reciprocals.",
    entryPrerequisites:["001-006 / domain-safe algebra and parameter case discipline","Elementary finite-sum notation","Ability to manipulate a linear or geometric pattern symbolically"],
    requiredOwnership:[
      "Declare the indexing convention and number of terms before writing an nth-term or sum formula.",
      "Derive an AP nth term and finite sum by pairing or elementary algebra rather than relying solely on memorisation.",
      "Derive the finite GP identity by multiplying by the ratio and subtracting, then handle r=1 separately instead of dividing by zero.",
      "Translate an HP condition into an AP condition on reciprocals only after checking that the relevant terms are nonzero.",
      "Reindex a finite AP/GP expression without changing which original terms are included or introducing an off-by-one error."
    ],
    applicationScope:"Finite arithmetic, geometric and harmonic progression questions with explicit or parameterised first terms/ratios, including reindexed sums and elementary unknown-term problems where all expressions remain algebraic.",
    transferScope:"A fresh progression problem whose notation starts at an unusual index or whose parameter hits an exceptional value, requiring the learner to rebuild the formula from the pattern and treat the exceptional case separately.",
    inScope:["AP nth terms and finite sums","GP nth terms and finite sums","HP through reciprocals","Reindexing and term counts","Ratio-one and reciprocal-domain exceptions"],
    outOfScope:["Weighted geometric and telescoping sums reserved for A2.2","General convergence and subsequence theory reserved for A5","Calculus or generating functions","Combinatorial binomial/multinomial coefficient identities reserved for P2"],
    exitCondition:"On one unfamiliar indexed progression problem, state the indexing convention, derive the needed AP/GP/HP relation from definitions, reindex correctly if required, and identify every exceptional ratio or reciprocal case before performing any division.",
    nextArcBoundary:"015 · A2.2 builds on ordinary finite GP algebra to handle weighted-geometric or telescoping sums and the convergence condition for a simple infinite geometric tail.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC804-A1015",routeOrder:15,syllabusCode:"A2.2",targetCode:"A2",parentId:"ARC804",
    title:"Evaluate a weighted geometric or telescoping sum, with its convergence condition.",
    focus:"Transforming a nonstandard-looking finite sum into cancellable or geometric structure, then distinguishing finite algebra from the extra convergence requirement needed to pass to an infinite geometric tail.",
    purpose:"Finish the finite-sums target with derivation skills rather than a catalogue of formulas: weighted geometric sums can be produced from shifted finite identities, telescoping sums from explicit cancellation, and infinite GP formulas only after proving the ratio is contractive.",
    centralCapability:"Given a finite weighted-geometric or telescoping sum, derive its value algebraically by shift/subtract, index manipulation or partial cancellation, and when an infinite geometric tail is requested state and use the condition |r|<1 while rejecting or separately describing boundary cases.",
    principalObstacle:"A learner may jump to an infinite-series formula for a finite sum, hide uncancelled endpoint terms in a telescoping pattern, or use 1/(1-r) when |r|>=1; weighted sums also invite importing a derivative trick before differentiation has been established in the route.",
    entryPrerequisites:["014 / A2.1 finite GP derivation, reindexing and exceptional cases","F1-F2 domain-safe algebra and legal transformations","Elementary factorisation and finite arithmetic"],
    requiredOwnership:[
      "Expose a telescoping pattern by writing enough consecutive terms to identify exactly which interior terms cancel and which boundary terms survive.",
      "Derive a finite weighted-geometric sum using algebraic shifting/subtraction or a proved finite-sum identity, without assuming calculus or an unproved power-series derivative rule.",
      "Keep finite-sum identities valid for all legal finite parameters separate from claims about an infinite limit.",
      "State that a real or complex geometric series with ratio r converges in this elementary setting only when |r|<1, and evaluate the resulting tail from the finite formula or geometric remainder.",
      "Check r=1, r=-1 and |r|>1 boundary/divergent cases rather than inserting them into a convergent-series formula."
    ],
    applicationScope:"Elementary finite telescoping sums, finite sums containing a polynomial-in-index weight times a geometric factor, and simple infinite geometric tails where convergence can be decided directly from the common ratio.",
    transferScope:"A fresh sum with shifted indices or disguised cancellation in which the learner must discover the transformation, preserve endpoint terms and decide whether any infinite-limit step is actually legal before giving a closed form.",
    inScope:["Finite weighted-geometric sums","Telescoping cancellation","Index shifting","Simple infinite GP tails","Convergence condition |r|<1 and boundary cases"],
    outOfScope:["Differentiating power series or generating functions","General series convergence tests","Sequence/subsequence convergence theory reserved for A5","Riemann sums reserved for C7"],
    exitCondition:"Evaluate one unfamiliar weighted-geometric or telescoping sum from an explicit algebraic derivation, show the surviving endpoint/remainder terms, and if an infinite tail is involved state and verify the exact convergence condition before taking the limit.",
    nextArcBoundary:"016 · A3.1 leaves progression algebra and begins sharp inequalities: AM-GM-HM or Cauchy-Schwarz must be proved/applied with all sign assumptions and equality conditions explicit.",
    mode:"learn",evidencePolicy:"standard"
  }
];
