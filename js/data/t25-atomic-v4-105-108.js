// Individually authored T25 M.Stat audited-v4 cards 105-108.
export const T25_ATOMIC_V4_105_108 = [
  {
    id: "T25-ARC826-A1105",
    routeOrder: 105,
    syllabusCode: "O1.1",
    targetCode: "O1",
    parentId: "ARC826",
    title: "Derive the CDF/survival of a minimum or maximum.",
    focus: "Derive laws of sample minima and maxima from the defining events, using CDFs or survival probabilities and keeping independence, iid assumptions, discreteness and endpoint behaviour explicit.",
    purpose: "Replace memorised order-statistic formulas with event-first reasoning so extrema remain reliable when the variables are discrete, nonidentically distributed or supported on shifted domains.",
    centralCapability: "Translate {min Xi > x} and {max Xi <= x} into intersection events, factor them only when independence permits, and obtain the resulting CDF or survival function on the correct support.",
    principalObstacle: "Blindly writing F(x)^n or [1-F(x)]^n assumes iid sampling and can silently fail for nonidentical variables, discrete laws, shifted supports or endpoint atoms.",
    entryPrerequisites: ["P6 independence structure", "D1 discrete distributions", "D3 continuous distributions", "D5 transformed-law support"],
    requiredOwnership: [
      "Express minimum and maximum events as intersections before simplifying",
      "Use independence explicitly when turning intersection probabilities into products",
      "Distinguish iid powers from products of nonidentical CDFs or survivals",
      "Track the support and endpoint behaviour of the extreme variable",
      "Handle continuous and discrete extrema without assuming a density exists",
      "Check the derived law is monotone and has the correct limiting values"
    ],
    inScope: [
      "Minimum and maximum of iid samples",
      "Independent nonidentical extrema",
      "Continuous and discrete parent laws",
      "CDF and survival-function derivations"
    ],
    outOfScope: [
      "Extreme-value asymptotic theory",
      "Poisson point-process limits",
      "Dependent-sample extrema beyond supplied elementary structure",
      "Record-value theory"
    ],
    applicationScope: "Entrance problems asking for exact finite-sample laws of minima or maxima, especially when the sample is shifted, discrete or independent but not identically distributed.",
    transferScope: "An unfamiliar collection of independent variables with different supports or parameters where the learner must derive the extreme law from events instead of applying an iid template.",
    exitCondition: "For a supplied independent sample, derive the exact CDF or survival law of its minimum or maximum, state where iid simplification is or is not legal, identify the transformed support, and verify limiting values.",
    nextArcBoundary: "106 O1.2 keeps the extreme-law framework but adds expectation or a nonidentical/discrete adaptation rather than introducing kth-order combinatorics yet."
  },
  {
    id: "T25-ARC826-A1106",
    routeOrder: 106,
    syllabusCode: "O1.2",
    targetCode: "O1",
    parentId: "ARC826",
    title: "Compute an extreme moment or adapt the law to nonidentical/discrete samples.",
    focus: "Use the derived extreme law to compute an expectation or adapt it to discrete or nonidentical variables, choosing direct summation, integration or a tail formula only when its assumptions are satisfied.",
    purpose: "Turn the structural law of an extreme into usable quantitative information while preserving the distinctions between continuous and discrete cases and between iid and merely independent samples.",
    centralCapability: "Compute or simplify a moment of a minimum or maximum from its actual law and re-derive the product form correctly when parameters or supports differ across observations.",
    principalObstacle: "Using a continuous tail integral for a discrete variable, forgetting shifts, or replacing unequal survival factors by a single nth power can give an answer with the right shape but the wrong value.",
    entryPrerequisites: ["O1.1 extreme CDF/survival derivation", "J1 expectation", "D3 exponential law", "D1 geometric and discrete laws"],
    requiredOwnership: [
      "Choose a valid expectation formula for the law and support at hand",
      "Carry shifts and scale parameters through an extreme-law calculation",
      "Recognise when a minimum of exponentials remains exponential and with what rate",
      "Derive the minimum of independent geometric variables with unequal parameters",
      "Use tail sums or tail integrals only on their legal domains",
      "Check a derived moment against simple monotonicity or parameter limits"
    ],
    inScope: [
      "Shifted exponential minima",
      "Geometric minima",
      "Independent nonidentical extremes",
      "Exact extreme expectations via direct or tail methods"
    ],
    outOfScope: [
      "Asymptotic extreme-value normalisations",
      "General hazard-rate ordering",
      "Record processes",
      "Heavy-tail extreme-value classification"
    ],
    applicationScope: "Finite-sample extreme-value problems where the main work is converting an already derived minimum/maximum law into an expectation or adapting it to unequal/discrete component laws.",
    transferScope: "A new family of independent variables where the learner must decide whether to use a product survival, direct mass function or tail expectation identity and justify the choice.",
    exitCondition: "Compute one nontrivial extreme moment or derive a discrete/nonidentical extreme law from first principles, with all support, shift and parameter details checked and no iid assumption inserted without evidence.",
    nextArcBoundary: "107 O2.1 moves from minima/maxima to the kth order statistic by translating the event X_(k) <= x into a binomial count under iid sampling."
  },
  {
    id: "T25-ARC826-A1107",
    routeOrder: 107,
    syllabusCode: "O2.1",
    targetCode: "O2",
    parentId: "ARC826",
    title: "Translate a kth-order event into a binomial count.",
    focus: "Express an event involving the kth order statistic as a statement about how many iid observations fall below or above a threshold, then compute that count using the appropriate binomial probability.",
    purpose: "Make the combinatorial origin of order-statistic formulas visible so the learner can rebuild them and diagnose off-by-one errors instead of memorising a finished density.",
    centralCapability: "Convert X_(k) <= x, X_(k) > x and related events into exact count inequalities and sum the corresponding binomial probabilities with the correct index range.",
    principalObstacle: "Confusing at least k with exactly k, swapping lower and upper tails, or forgetting that the binomial count argument uses iid sampling can shift every coefficient while still looking plausible.",
    entryPrerequisites: ["O1 extrema as special order statistics", "P2 binomial counting", "D0 CDF language"],
    requiredOwnership: [
      "Define the threshold count N_x = number of observations <= x",
      "Translate X_(k) <= x into N_x >= k",
      "Translate complementary kth-order events without off-by-one mistakes",
      "Use the binomial law of N_x only under iid sampling",
      "Recover the minimum and maximum cases by setting k=1 or k=n",
      "Check endpoint probabilities against the support of the parent law"
    ],
    inScope: [
      "iid order-statistic CDFs",
      "Binomial-count representations",
      "Minimum and maximum special cases",
      "Lower- and upper-tail kth-order events"
    ],
    outOfScope: [
      "Non-iid general order-statistic formulas",
      "Joint order statistics",
      "Asymptotic sample quantiles",
      "Empirical-process theory"
    ],
    applicationScope: "Entrance problems where a kth smallest or kth largest observation is best handled by counting how many sample points lie on one side of a threshold.",
    transferScope: "An unfamiliar order-statistic probability question where the learner must invent the correct count event and choose the right binomial tail rather than recall a formula.",
    exitCondition: "Given an iid sample and a kth-order event, rewrite it as an exact binomial-count condition, evaluate the corresponding probability with correct summation limits, and recover k=1 and k=n as checks.",
    nextArcBoundary: "108 O2.2 differentiates the continuous CDF to obtain the kth-order density and audits its coefficient, support and endpoint special cases."
  },
  {
    id: "T25-ARC826-A1108",
    routeOrder: 108,
    syllabusCode: "O2.2",
    targetCode: "O2",
    parentId: "ARC826",
    title: "Derive the continuous density and check its coefficient and endpoint cases.",
    focus: "Differentiate the iid continuous kth-order CDF or derive the small-interval argument to obtain the standard density with the exact factorial coefficient, powers of F and 1-F, parent density and support.",
    purpose: "Ensure the learner understands where the kth-order density comes from and can audit every combinatorial and analytic factor rather than treating it as a catalogue formula.",
    centralCapability: "Derive f_(k)(x)=n!/[(k-1)!(n-k)!] F(x)^(k-1)[1-F(x)]^(n-k)f(x) on the parent support and validate its minimum/maximum reductions.",
    principalObstacle: "Using k rather than k-1 below the marked observation, dropping the parent density factor, differentiating outside the support, or miscounting the factorial coefficient can all produce near-miss formulas.",
    entryPrerequisites: ["O2.1 binomial-count CDF", "C3 differentiation rules", "D3 continuous densities"],
    requiredOwnership: [
      "Differentiate the kth-order CDF correctly under the continuous iid assumptions",
      "Explain the roles of k-1 observations below and n-k above the marked value",
      "Obtain the coefficient n!/[(k-1)!(n-k)!] without memorisation",
      "Retain the parent density f(x) and the original support",
      "Recover minimum and maximum densities as k=1 and k=n",
      "Check normalisation directly or through the known CDF endpoints"
    ],
    inScope: [
      "Continuous iid kth-order density",
      "Combinatorial coefficient derivation",
      "Support and normalisation checks",
      "Minimum and maximum endpoint cases"
    ],
    outOfScope: [
      "Joint densities of two order statistics",
      "Range distributions",
      "Ties in discrete order statistics",
      "Asymptotic quantile distributions"
    ],
    applicationScope: "Continuous iid order-statistic problems requiring an exact kth density, a probability obtained from that density, or a consistency check against extrema.",
    transferScope: "A supplied continuous parent distribution with nonstandard support where the learner must derive the kth density and carry the support and coefficient correctly without template substitution errors.",
    exitCondition: "Derive the continuous kth-order density from the count-based CDF or local argument, justify every factor, state the support, and verify both k=1 and k=n special cases.",
    nextArcBoundary: "109 O3.1 begins joint order statistics, conditional extremes and ranges; this requires two ordered coordinates and is intentionally kept outside the current batch."
  }
];
