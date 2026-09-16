// Individually authored T25 M.Stat audited-v4 cards 109-112.
export const T25_ATOMIC_V4_109_112 = [
  {
    id: "T25-ARC826-A1109",
    routeOrder: 109,
    syllabusCode: "O3.1",
    targetCode: "O3",
    parentId: "ARC826",
    title: "Obtain a joint order-statistic, conditional-extreme or range law.",
    focus: "Derive or use the joint law of two iid continuous order statistics, enforce the ordering/support constraints, and obtain a conditional extreme or range law by correct integration or transformation.",
    purpose: "Move beyond one-dimensional kth-order formulas by making the combinatorial allocation of observations and the geometry of the ordered support explicit.",
    centralCapability: "Construct and manipulate a joint order-statistic density with the correct combinatorial factor, support inequalities and marginalisation needed for conditional-extreme or range questions.",
    principalObstacle: "Using a memorised joint density without checking index order, support, factorial coefficient or transformed bounds can yield an expression that integrates incorrectly or assigns mass to impossible orderings.",
    entryPrerequisites: ["O2 kth-order statistics", "J3 joint and conditional laws", "J5 transformed pairs and support geometry"],
    requiredOwnership: [
      "State the ordering constraints x<y and the index condition r<s before using a joint order-statistic density",
      "Explain the observation-count allocation below x, between x and y, and above y",
      "Recover the correct multinomial/factorial coefficient from that allocation",
      "Include the parent density factors and CDF/survival powers on their legal support",
      "Marginalise or condition with bounds derived from the ordered support",
      "Transform to a range or related statistic while retaining all support constraints",
      "Check the resulting marginal or transformed density normalises"
    ],
    inScope: [
      "Joint density of two iid continuous order statistics",
      "Conditional distribution of one order statistic given another",
      "Range or spacing laws obtained from simple transformations/integration",
      "Support and coefficient checks via minimum/maximum special cases"
    ],
    outOfScope: [
      "General point-process representations of order statistics",
      "Asymptotic extreme-value theory",
      "Poisson-process spacings",
      "General multivariate order-statistic theory beyond two selected ranks"
    ],
    applicationScope: "Entrance-level problems involving two selected order statistics, a sample range, or a conditional extreme where the main work is combinatorial allocation plus support-aware integration.",
    transferScope: "An unfamiliar pair of order ranks or transformed spacing where the learner must rebuild the coefficient and integration region instead of recalling a canned formula.",
    exitCondition: "For an iid continuous sample, derive or justify the joint law of two selected order statistics, obtain one requested conditional or range law, and verify support and normalisation.",
    nextArcBoundary: "110 O3.2 breaks the iid-order-statistic template by analysing extrema that share observations and may place positive probability on the diagonal."
  },
  {
    id: "T25-ARC826-A1110",
    routeOrder: 110,
    syllabusCode: "O3.2",
    targetCode: "O3",
    parentId: "ARC826",
    title: "Contrast it with shared-observation dependence carrying singular diagonal mass.",
    focus: "Analyse extrema built from overlapping sets of continuous observations, separating the off-diagonal absolutely continuous region from any positive probability carried by the equality set U=V because of shared data.",
    purpose: "Prevent automatic misuse of a standard two-dimensional density when the two statistics share observations: positive probability can lie on the diagonal without any individual point (u,u) being a joint atom.",
    centralCapability: "Recognise when shared observations make P(U=V)>0, compute that equality probability directly from underlying sample events, represent it as a singular component supported on the diagonal rather than as a point atom, and combine it with any off-diagonal continuous contribution without pretending one planar density describes the whole law.",
    principalObstacle: "The learner may assume P(U=V)=0 merely because the underlying observations are continuous, or may call positive probability on the whole diagonal a joint point atom even though every singleton (u,u) can still have probability zero; either mistake obscures the mixed-dimensional structure of the joint law.",
    entryPrerequisites: ["O3.1 joint order-statistic laws", "D0 atoms and mixed laws", "J3 joint-law support", "J5 recognition of singular transformed pairs"],
    requiredOwnership: [
      "Identify which observations are shared between the two extrema or statistics",
      "Characterise the event on which the two statistics are exactly equal",
      "Compute P(U=V) from the underlying sample events rather than from a nonexistent planar density on the diagonal",
      "Separate probability carried on the diagonal from the off-diagonal absolutely continuous contribution",
      "Explain why P(U=V)>0 does not imply that any singleton (u,u) has positive probability; in the usual continuous shared-observation construction the diagonal component is singular with respect to planar area rather than a collection of point atoms",
      "Recognise that the scalar difference U-V does have an atom at 0 whenever P(U=V)>0, even though the joint pair need not have a point atom",
      "Avoid applying the standard joint-order-statistic density unless its common-iid-sample rank structure is actually present",
      "Check that the diagonal singular component and all off-diagonal pieces together carry total probability one"
    ],
    inScope: [
      "Maxima/minima formed from overlapping subsets",
      "Positive equality probability induced by shared observations",
      "Singular probability supported on the diagonal plus off-diagonal continuous regions",
      "Point-atom versus diagonal-mass distinction",
      "Atom at zero for the scalar difference U-V",
      "Direct event-based probability calculations for equality"
    ],
    outOfScope: [
      "General theory of singular measures on arbitrary curves",
      "Copula decomposition theory",
      "Extreme-value asymptotics",
      "Measure-theoretic disintegration of mixed joint laws"
    ],
    applicationScope: "Entrance problems where two extrema or statistics reuse observations, so their dependence cannot be diagnosed safely from marginal continuity or a standard iid-rank formula and may include positive probability on a lower-dimensional equality set.",
    transferScope: "A new shared-data construction where the learner must discover whether equality or another lower-dimensional event has positive probability, determine whether that probability is point-atomic or spread continuously along a lower-dimensional set, and choose the representation accordingly.",
    exitCondition: "Given a shared-observation construction with continuous underlying data, determine whether P(U=V)>0, compute that probability when present, distinguish singular diagonal mass from a point atom, derive the remaining off-diagonal contribution as needed, and justify why a purely planar density is incomplete.",
    nextArcBoundary: "111 L1.1 leaves order-statistic structure and begins probability inequalities, where every bound must carry its sign and moment assumptions explicitly."
  },
  {
    id: "T25-ARC907-A1111",
    routeOrder: 111,
    syllabusCode: "L1.1",
    targetCode: "L1",
    parentId: "ARC907",
    title: "Apply Markov/Chebyshev with all moment and sign conditions.",
    focus: "Select Markov or Chebyshev from the quantity being bounded, state the required nonnegativity or finite-moment assumptions, and derive a valid one-sided or two-sided probability bound.",
    purpose: "Turn elementary inequalities into rigorous working tools rather than formula fragments, with assumptions checked before algebra and the event translated correctly.",
    centralCapability: "Derive and apply Markov and Chebyshev bounds with the correct random variable, threshold, centring, variance and legality conditions visible at every step.",
    principalObstacle: "Applying Markov to a signed variable, using Chebyshev without finite variance, confusing variance with standard deviation, or reversing event containment can produce a numerically plausible but invalid bound.",
    entryPrerequisites: ["J1 expectation; J2 variance", "P3 event manipulation", "F2 inequalities"],
    requiredOwnership: [
      "State Markov's nonnegativity and finite-expectation requirement",
      "Rewrite a requested tail event into a legal Markov form when possible",
      "State Chebyshev for a finite-variance variable centred at its mean",
      "Use variance over squared deviation threshold with correct units",
      "Justify every event inclusion used to transfer a bound",
      "Recognise when the assumptions fail and refuse the inequality",
      "Distinguish a bound from an exact probability"
    ],
    inScope: [
      "Markov bounds for nonnegative random variables",
      "Chebyshev bounds for deviations from a finite mean",
      "Simple transformed nonnegative quantities such as squared deviations",
      "Assumption and event-containment checks"
    ],
    outOfScope: [
      "Chernoff or exponential-moment bounds",
      "Hoeffding or Bernstein inequalities",
      "Martingale concentration",
      "Measure-theoretic refinements of moment inequalities"
    ],
    applicationScope: "Entrance questions asking for guaranteed tail control from limited moment information, especially when the exact distribution is unavailable or deliberately irrelevant.",
    transferScope: "An unfamiliar tail event where the learner must invent a useful nonnegative quantity or centring before choosing Markov or Chebyshev.",
    exitCondition: "For a supplied random variable and tail event, choose a legal inequality, state all assumptions, derive the bound from event containment, and explain why the result is only an upper bound.",
    nextArcBoundary: "112 L1.2 applies these bounds to sample averages and asks whether the numerical bound says anything useful rather than merely being formally correct."
  },
  {
    id: "T25-ARC907-A1112",
    routeOrder: 112,
    syllabusCode: "L1.2",
    targetCode: "L1",
    parentId: "ARC907",
    title: "Judge whether the resulting bound is informative for a sample average.",
    focus: "Compute a Markov/Chebyshev-style bound for a sample-average error from its mean and variance structure, then assess whether the bound is nontrivial, shrinking and quantitatively informative.",
    purpose: "Connect finite-sample moment bounds to the logic that later supports consistency while preventing the common mistake of treating any derived upper bound as a sharp probability estimate.",
    centralCapability: "Derive a sample-average deviation bound with the correct dependence-sensitive variance and interpret its magnitude, scaling in n and limitations.",
    principalObstacle: "Blindly substituting Var(X)/n when observations are dependent, reporting bounds above one without comment, or treating a loose upper bound as an approximation obscures the actual information content.",
    entryPrerequisites: ["L1.1 Markov/Chebyshev legality", "J2 covariance and variance of sums", "N1 sample-average notation"],
    requiredOwnership: [
      "Compute Var of an average from the actual covariance structure rather than assuming independence",
      "Use the iid variance reduction sigma^2/n only when iid or appropriate independence assumptions are established",
      "Apply Chebyshev to P(|Xbar-mu|>=epsilon) with the correct epsilon-squared denominator",
      "Cap the interpretation of a probability upper bound at the trivial ceiling one",
      "Decide whether the bound decreases with n and at what elementary rate",
      "Explain why a nontrivial upper bound is not an estimate of the true tail probability",
      "Identify when the bound is too loose to answer the practical question"
    ],
    inScope: [
      "Sample-average deviation bounds",
      "Independent or explicitly dependent finite collections",
      "Variance scaling and covariance contributions",
      "Interpretation of trivial versus informative bounds"
    ],
    outOfScope: [
      "Central-limit approximations",
      "Large-deviation rates",
      "Sub-Gaussian concentration",
      "General convergence theorems beyond what the finite-sample bound itself implies"
    ],
    applicationScope: "Finite-sample probability bounds for averages and simple statistics where only first and second moments are available and the learner must assess the usefulness of the guarantee.",
    transferScope: "A sample-average-like statistic with mild dependence, requiring the learner to rebuild its variance before deciding whether Chebyshev provides meaningful control.",
    exitCondition: "For a sample-average error event, derive the correct variance-based upper bound from the stated dependence assumptions, simplify its n-scaling, and judge explicitly whether the resulting guarantee is informative.",
    nextArcBoundary: "113 L2.1 turns shrinking probability bounds into a formal convergence-in-probability and consistency statement via the weak law or a vanishing-error argument."
  }
];
