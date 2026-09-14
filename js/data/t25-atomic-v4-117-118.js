// Individually authored T25 M.Stat audited-v4 cards 117-118.
export const T25_ATOMIC_V4_117_118 = [
  {
    id: "T25-ARC826-A1117",
    routeOrder: 117,
    syllabusCode: "O4.1",
    targetCode: "O4",
    parentId: "ARC826",
    title: "Express a quantile tail as an empirical-count event.",
    focus: "Translate an event involving an order statistic or sample quantile into an equivalent statement about how many observations fall below or above a fixed threshold.",
    purpose: "Replace fragile density memorisation with the exact finite-sample count event that later makes quantile consistency a direct law-of-large-numbers argument.",
    centralCapability: "Convert one-sided order-statistic events into empirical-count inequalities with the correct threshold direction, rank convention and binomial/indicator representation.",
    principalObstacle: "Off-by-one rank errors, reversing the count inequality, or silently switching between lower and upper empirical quantile conventions can invalidate the asymptotic argument before any limit theorem is applied.",
    entryPrerequisites: ["O2 kth-order statistics", "P2 binomial counts", "L2 convergence in probability and WLLN"],
    requiredOwnership: [
      "Write X_(k) <= x and X_(k) > x as equivalent statements about the number of Xi values at or below x",
      "Track the exact integer threshold k, n-k+1 or its convention-equivalent form without off-by-one mistakes",
      "Represent the empirical count as a sum of Bernoulli indicators",
      "Identify the Bernoulli success probability as F(x) or the correct strict-inequality variant",
      "Separate finite-sample event equivalence from any asymptotic approximation",
      "State the sample-quantile convention being used when endpoint choices matter",
      "Check the event translation on the minimum and maximum special cases"
    ],
    inScope: [
      "One-sided events for kth order statistics",
      "Empirical counts at a fixed threshold",
      "Indicator-sum representations",
      "Median and ordinary sample-quantile tail events"
    ],
    outOfScope: [
      "Asymptotic normality of sample quantiles",
      "Bahadur representations",
      "Empirical-process weak convergence",
      "General quantile-process theory"
    ],
    applicationScope: "Entrance problems where a sample median or kth order statistic must be controlled by converting the event into a count of observations crossing a deterministic threshold.",
    transferScope: "An unfamiliar quantile convention or one-sided order-statistic event where the learner must reconstruct the exact count inequality rather than rely on a memorised template.",
    exitCondition: "Given a kth order statistic and a threshold x, derive the exact equivalent empirical-count event, express the count as Bernoulli indicators with the correct success probability, and verify the rank inequality on edge cases.",
    nextArcBoundary: "118 O4.2 uses strict CDF inequalities on either side of a target quantile plus the WLLN to turn those empirical-count events into tail probabilities that vanish."
  },
  {
    id: "T25-ARC826-A1118",
    routeOrder: 118,
    syllabusCode: "O4.2",
    targetCode: "O4",
    parentId: "ARC826",
    title: "Use strict CDF inequalities and WLLN to prove the requested tail limit.",
    focus: "Prove one-sided or two-sided concentration of an order-based sample quantile by choosing thresholds around the target quantile, obtaining strict CDF inequalities, and applying the WLLN to the corresponding empirical counts.",
    purpose: "Establish quantile consistency from first principles while making the identifiability condition visible: the population CDF must lie strictly on the correct side of the target probability at the chosen neighbouring thresholds.",
    centralCapability: "Turn strict population CDF separation into vanishing empirical-count tail probabilities and distinguish a proved one-sided limit from full two-sided consistency.",
    principalObstacle: "Invoking the WLLN at the target quantile without strict separation, assuming uniqueness when the CDF is flat or jumps across the target probability, or proving only one tail and then claiming full consistency are the main logical failures.",
    entryPrerequisites: ["O4.1 empirical-count event translation", "L2 WLLN and convergence in probability", "D0 CDFs and jumps"],
    requiredOwnership: [
      "Choose x_- below and x_+ above the target quantile with the required strict CDF inequalities",
      "Translate each bad quantile tail into an empirical-count event",
      "Apply the WLLN to the indicator averages at fixed thresholds",
      "Use strict separation to show the relevant count deviations have probability tending to zero",
      "Distinguish a lower-tail result from a complete two-sided consistency proof",
      "State the uniqueness or identifiability condition needed for concentration at one population quantile",
      "Recognise when a jump, flat region or quantile interval prevents the claimed point-consistency conclusion"
    ],
    inScope: [
      "Consistency of sample medians and fixed sample quantiles",
      "One-sided quantile tail limits",
      "Strict CDF separation arguments",
      "WLLN applied to empirical indicator counts"
    ],
    outOfScope: [
      "Rates of quantile convergence",
      "Quantile asymptotic normality",
      "Dvoretzky-Kiefer-Wolfowitz inequalities",
      "General Glivenko-Cantelli theory"
    ],
    applicationScope: "Entrance-level asymptotic problems asking for concentration of a median or order quantile without requiring the explicit order-statistic density.",
    transferScope: "A distribution with atoms or non-strict CDF behaviour where the learner must decide whether point consistency is actually identifiable before attempting a WLLN proof.",
    exitCondition: "For a target quantile and fixed epsilon neighbourhood, choose valid thresholds, establish the necessary strict CDF inequalities, convert both bad-tail events into empirical counts, apply the WLLN, and state exactly whether the result is one-sided or full consistency.",
    nextArcBoundary: "119 E1.1 begins Phase 6 statistical estimation by leaving order-statistic asymptotics and computing bias, variance and MSE under an explicit sampling law."
  }
];
