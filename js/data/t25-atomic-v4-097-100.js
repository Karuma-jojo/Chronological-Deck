// Individually authored T25 M.Stat audited-v4 cards 097-100.
export const T25_ATOMIC_V4_097_100 = [
  {
    id: "T25-ARC908-A1097",
    routeOrder: 97,
    syllabusCode: "J6.1",
    targetCode: "J6",
    parentId: "ARC908",
    title: "Compare minimisers of squared and absolute deviation.",
    focus: "Compare squared-loss and absolute-loss objectives for sample and distributional settings, deriving why a mean minimises squared deviation and why medians minimise absolute deviation under the stated moment conditions.",
    purpose: "Separate two superficially similar optimisation problems whose minimisers, uniqueness properties and required integrability conditions are fundamentally different.",
    centralCapability: "Derive and identify the full minimiser set for squared versus absolute deviation without assuming differentiability or uniqueness where those properties fail.",
    principalObstacle: "Automatically differentiating an absolute-value objective, assuming every median is unique, or quoting mean/median minimisation without checking finite first or second moments hides the exact conditions the result needs.",
    entryPrerequisites: ["J1 expectation", "C5 one-variable optimisation", "D0 CDFs and atoms", "F4 quantified claims"],
    requiredOwnership: [
      "Expand E[(X-a)^2] and isolate the term minimised at the mean when the second moment is finite",
      "Use one-sided slopes, finite sums or CDF probabilities to analyse E|X-a|",
      "State the median condition using P(X<=m) and P(X>=m)",
      "Retain an interval or multiple minimisers when the absolute-loss optimum is nonunique",
      "Distinguish the finite-first-moment condition from the stronger finite-second-moment condition",
      "Explain concretely why squared loss reacts differently to extreme observations from absolute loss"
    ],
    inScope: [
      "Finite samples with squared or absolute deviation",
      "Population mean as squared-loss minimiser",
      "Population medians as absolute-loss minimisers",
      "Nonunique median intervals and atoms"
    ],
    outOfScope: [
      "General convex-analysis subgradient theory",
      "Quantile regression beyond median logic",
      "Robust-statistics asymptotics",
      "Multivariate geometric medians"
    ],
    applicationScope: "Entrance problems asking for a best constant under L2 or L1 loss, including discrete laws and distributions with atoms where the absolute-loss minimiser may not be unique.",
    transferScope: "An unfamiliar weighted or mixed distribution where the learner must infer the entire minimiser set from probability mass balance instead of relying on a smooth derivative calculation.",
    exitCondition: "Given one squared-loss and one absolute-loss objective, derive the minimiser set from first principles, state the needed moment condition, and explain any nonuniqueness rather than selecting an arbitrary single value.",
    nextArcBoundary: "098 J6.2 adds weighted, reciprocal-input or two-group absolute-loss structures where the same median logic must survive a less obvious parametrisation."
  },
  {
    id: "T25-ARC908-A1098",
    routeOrder: 98,
    syllabusCode: "J6.2",
    targetCode: "J6",
    parentId: "ARC908",
    title: "Find all minimisers of one weighted, reciprocal-input or two-group absolute-loss problem.",
    focus: "Reduce a weighted, transformed-input or two-group absolute-deviation objective to the correct weighted-median or piecewise-linear optimisation problem and identify every minimiser.",
    purpose: "Transfer median logic beyond the obvious sum of |x_i-a| form so the learner can recognise the hidden L1 structure inside unfamiliar entrance-exam parametrisations.",
    centralCapability: "Rewrite a nonstandard absolute-loss objective into a transparent weighted balance problem and recover the complete minimiser set with boundary and sign cases handled correctly.",
    principalObstacle: "Transformations such as reciprocal inputs or unequal group weights can obscure which quantity is actually being median-balanced, and careless algebra can lose domain restrictions or create false unique optima.",
    entryPrerequisites: ["J6.1 squared versus absolute-loss minimisers", "F3 functions and legal domains", "C5 optimisation"],
    requiredOwnership: [
      "Convert repeated observations or coefficients into explicit positive weights",
      "Use cumulative weight on either side to identify weighted-median minimisers",
      "Preserve domain restrictions under reciprocal or other supplied positive-input transformations",
      "Handle two-group absolute-loss objectives without assuming an interior differentiable optimum",
      "List all minimisers when a flat interval occurs",
      "Check the proposed minimiser directly against the piecewise-linear objective or one-sided slopes"
    ],
    inScope: [
      "Weighted medians",
      "Two-group absolute-deviation objectives",
      "Positive-input reciprocal transforms when supplied by the problem",
      "Nonunique L1 minimiser intervals"
    ],
    outOfScope: [
      "General linear programming duality",
      "Lasso or penalised regression theory",
      "Multivariate L1 regression",
      "Asymptotic theory of sample medians"
    ],
    applicationScope: "Compact entrance problems where an apparently unusual objective becomes a weighted absolute-deviation problem after the correct algebraic re-expression.",
    transferScope: "A new parametrised L1 objective with unequal masses or a monotone transformed input, requiring the learner to discover the relevant weighted ordering and retain every valid optimum.",
    exitCondition: "For one weighted or transformed absolute-loss problem, reduce the objective to its correct weighted ordering, determine all minimisers, justify any interval of optima, and verify domain legality throughout.",
    nextArcBoundary: "099 P5.1 leaves static optimisation and begins first-step recursion for waiting times or finite-state stopping problems."
  },
  {
    id: "T25-ARC821-A1099",
    routeOrder: 99,
    syllabusCode: "P5.1",
    targetCode: "P5",
    parentId: "ARC821",
    title: "Set up one first-step/waiting-time recurrence and its finite solution.",
    focus: "Condition on the first trial or first state transition, write a recurrence for the remaining expected waiting time, solve it algebraically, and justify that the finite expectation being manipulated is legitimate in the stated elementary setting.",
    purpose: "Make stopping-time expectations a conditioning problem on what happens next, rather than a place to invoke advanced martingale machinery or memorise isolated waiting-time formulas.",
    centralCapability: "Choose a minimal state description, condition on the next outcome, form the correct expectation recurrence including the elapsed step, and solve the resulting finite system or scalar equation.",
    principalObstacle: "Forgetting to count the current step, conditioning on states that do not retain enough information, or importing a geometric formula when trials are not memoryless can invalidate the recurrence before any algebra begins.",
    entryPrerequisites: ["P4 conditioning", "J1 expectation", "D2 geometric and negative-binomial waiting times", "F2 equations"],
    requiredOwnership: [
      "Define the waiting-time or state expectation before writing equations",
      "Condition on the complete set of possible first outcomes",
      "Include the one-step time cost in the recurrence",
      "Choose enough state information to make the future description valid",
      "Solve a small linear recurrence or finite system exactly",
      "Check the resulting expectation is finite and consistent with an elementary bound or known special case"
    ],
    inScope: [
      "Geometric waiting times",
      "Pattern or finite-state waiting recurrences",
      "Repeated independent trials",
      "Small first-step expectation systems"
    ],
    outOfScope: [
      "Martingales",
      "Optional stopping theorems",
      "Infinite-state Markov-chain theory",
      "Renewal theory beyond elementary first-step equations"
    ],
    applicationScope: "Entrance-level waiting-time questions where conditioning on the next trial or transition reduces the expectation to one or a few self-referential equations.",
    transferScope: "An unfamiliar finite-state waiting problem where the learner must invent the right state variables before any recurrence can be trusted.",
    exitCondition: "For a supplied repeated-trial or finite-state waiting problem, define suitable state expectations, derive the first-step recurrence including elapsed time, solve it, and justify why the finite answer is legitimate.",
    nextArcBoundary: "100 P5.2 adds an extra conditioning event or state constraint so the learner must combine first-step recursion with additional information without confusing the two levels of conditioning."
  },
  {
    id: "T25-ARC821-A1100",
    routeOrder: 100,
    syllabusCode: "P5.2",
    targetCode: "P5",
    parentId: "ARC821",
    title: "Solve one stopping question with additional conditioning or state information.",
    focus: "Solve a waiting or stopping expectation when an extra event, partial observation or current state changes the relevant starting distribution, carefully separating conditioning on present information from the subsequent first-step recurrence.",
    purpose: "Complete the elementary stopping toolkit by handling the common exam twist where a standard waiting-time process is observed or conditioned partway through.",
    centralCapability: "Update the starting state or conditional law correctly, then apply the appropriate first-step recurrence without double-counting information or assuming memorylessness that has not been proved.",
    principalObstacle: "Treating every waiting process as memoryless, conditioning on an event and then reusing unconditional state probabilities, or counting elapsed time twice are the characteristic failure modes.",
    entryPrerequisites: ["P5.1 first-step recurrences", "P4 conditional probability", "J1 conditional expectation", "D2 geometric waiting time"],
    requiredOwnership: [
      "Translate the additional information into the correct conditional starting state or law",
      "Determine whether genuine memorylessness applies before using it",
      "Separate already elapsed time from future waiting time",
      "Write the first-step recurrence under the updated information",
      "Solve all relevant conditional states consistently",
      "Cross-check against the unconditional problem or a limiting special case when available"
    ],
    inScope: [
      "Conditioned waiting-time expectations",
      "Finite-state first-step recurrences with observed state information",
      "Geometric memorylessness when its hypotheses actually hold",
      "Repeated independent-trial stopping questions"
    ],
    outOfScope: [
      "Optional-stopping arguments",
      "General Markov stopping-time theory",
      "Doob martingales",
      "Continuous-time stopping processes"
    ],
    applicationScope: "Entrance problems that modify a familiar waiting process by revealing partial progress, conditioning on an event, or specifying an intermediate state before asking for the remaining expectation.",
    transferScope: "A new stopping problem where the learner must decide whether the extra information merely changes the starting state or destroys a tempting memoryless shortcut.",
    exitCondition: "Given a stopping or waiting problem with additional information, construct the correct conditional starting description, derive and solve the updated recurrence, and explicitly justify every use or rejection of memorylessness.",
    nextArcBoundary: "101 begins Phase 5; no Phase-5 content is imported into this card, and Phase 4 ends here as a complete audited block."
  }
];
