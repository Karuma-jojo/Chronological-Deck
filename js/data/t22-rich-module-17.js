export function buildT22RichModule17(syllabusVersion) {
  return {
    moduleId: "ARC048",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build probability from explicit outcome models, event algebra and counting into conditional reasoning, independence and expectation, so later Bayesian inference, random variables, sampling theory, stochastic models and market applications rest on auditable probability structure rather than intuition or formula recall.",
    moduleDestination:
      "The learner can define an experiment and sample space, encode events precisely, count equiprobable outcomes without double counting, derive and apply the probability axioms and inclusion-exclusion, reason with conditional probability and independence without conflating them, and compute/interpret expectation as a probability-weighted long-run value in finite models.",
    entryPrerequisites: [
      "Basic arithmetic, fractions, algebra and set notation",
      "Finite sums and products",
      "Logical reasoning about mutually exclusive and overlapping cases",
      "No prior formal probability course is assumed",
    ],
    explicitlyOutOfScope: [
      "Measure-theoretic probability and sigma-algebras",
      "Continuous random variables, densities and distribution functions — ARC517",
      "Bayes' rule as a dedicated inference framework — ARC502",
      "Sampling distributions and statistical inference — ARC503/ARC504 onward",
      "LLN, CLT and concentration — ARC712",
      "Markov chains, stochastic processes and time-series models — ARC524/ARC525/ARC542",
    ],
    arcs: {
      "T22-M17-A01": {
        focus: "Experiments, sample spaces, events and event algebra.",
        roleRelevance:
          "Quantitative research begins by specifying what outcomes are possible and what proposition an event actually represents; sloppy outcome models make every downstream probability statement ambiguous.",
        purpose:
          "Turn informal uncertainty into an explicit mathematical experiment whose outcomes and events can be checked, combined and falsified.",
        principalObstacle:
          "Real questions mix outcomes, labels and propositions; learners must distinguish a single outcome from a set of outcomes and construct a sample space that is mutually exclusive and exhaustive for the stated experiment.",
        entryPrerequisites: ["Elementary set notation", "Logical AND/OR/NOT", "Finite examples"],
        target:
          "Construct a valid sample space for a finite experiment, represent verbal claims as events, and manipulate complements, unions and intersections without ambiguity.",
        requiredMastery: [
          "Distinguish experiment, outcome, sample space and event",
          "Construct an exhaustive and mutually exclusive finite sample space for a stated experiment",
          "Translate verbal conditions into set notation and back without changing meaning",
          "Use union, intersection and complement correctly and verify De Morgan-style identities by outcome membership",
          "Diagnose an invalid sample space that overlaps outcomes or omits possibilities",
          "Recognize that the same physical situation may admit different sample spaces depending on the random experiment being modeled",
          "Transfer event construction to an unfamiliar research or market scenario",
        ],
        applicationScope:
          "Finite experiments such as order outcomes, categorical signals, defaults, draws or sequences where the outcome space can be enumerated or structurally described.",
        transferScope:
          "An unfamiliar uncertainty problem where the learner must decide what counts as one outcome before any probability calculation is permitted.",
        explicitlyOutOfScope: ["Infinite-measure formalism", "Random-variable notation", "Conditional probability"],
        nextArcBoundary:
          "A02 owns principled counting of finite outcome sets when direct enumeration becomes inefficient or error-prone.",
      },
      "T22-M17-A02": {
        focus: "Counting finite outcomes using product, permutation and combination structure.",
        roleRelevance:
          "Many exact probability calculations reduce to counting admissible configurations; research errors often come from silently treating ordered and unordered outcomes as the same object.",
        purpose:
          "Develop counting as a modeling skill rather than a catalogue of nPr/nCr formulas.",
        principalObstacle:
          "The same ingredients produce different counts depending on whether order matters, repetition is allowed, choices are sequential, or cases overlap.",
        entryPrerequisites: ["T22-M17-A01", "Factorials", "Finite products"],
        target:
          "Derive counts from the structure of choices, justify when permutations or combinations apply, and use counting to compute probabilities only when the relevant elementary outcomes are equiprobable.",
        requiredMastery: [
          "Derive the multiplication principle from sequential choices",
          "Explain and derive the distinction between ordered selections and unordered subsets",
          "Compute representative permutation and combination counts without double counting",
          "Use complementary counting or case partitioning when direct counting is inefficient",
          "Detect overcounting caused by symmetries or overlapping cases",
          "State explicitly why favorable/total counting requires equiprobable elementary outcomes",
          "Transfer counting logic to a new combinatorial probability problem",
        ],
        applicationScope:
          "Finite sampling, ranking, assignment and sequence problems where exact combinatorial structure determines event probabilities.",
        transferScope:
          "A problem that superficially resembles a standard combination exercise but changes ordering, replacement or indistinguishability assumptions.",
        explicitlyOutOfScope: ["Generating functions", "Asymptotic combinatorics", "Continuous probability"],
        nextArcBoundary:
          "A03 formalizes probability laws for events, including overlapping events where naive addition fails.",
      },
      "T22-M17-A03": {
        focus: "Probability axioms, complements, unions and inclusion-exclusion.",
        roleRelevance:
          "Probability models in research must obey coherent event arithmetic; inclusion-exclusion and complements are basic safeguards against impossible totals and double counting.",
        purpose:
          "Make probability rules consequences of a small coherent structure rather than isolated formulas.",
        principalObstacle:
          "Intuitive addition works only for disjoint events; overlapping events require explicit correction, and probabilities must remain normalized and nonnegative.",
        entryPrerequisites: ["T22-M17-A01-A02", "Finite sums", "Set operations"],
        target:
          "Apply the finite probability axioms to derive complement and addition rules, compute probabilities of composite events, and test whether proposed assignments are coherent.",
        requiredMastery: [
          "State nonnegativity, normalization and finite additivity for disjoint events in operational form",
          "Derive the complement rule from normalization",
          "Derive two-event inclusion-exclusion and explain the double-count correction",
          "Compute probabilities from a finite probability mass assignment without assuming uniformity",
          "Reject inconsistent assignments that violate normalization, monotonicity or basic bounds",
          "Use partitions to decompose a probability calculation into disjoint cases",
          "Transfer event arithmetic to a new reliability, signal or market-state example",
        ],
        applicationScope:
          "Finite nonuniform probability models and overlapping-event calculations relevant to risk, signals and categorical outcomes.",
        transferScope:
          "An unfamiliar event system where direct intuition suggests adding probabilities but overlap must first be diagnosed.",
        explicitlyOutOfScope: ["Countable additivity in full measure-theoretic form", "Conditional probability", "Densities"],
        nextArcBoundary:
          "A04 owns probability after conditioning on information and introduces the product/total-probability structure needed later for Bayes.",
      },
      "T22-M17-A04": {
        focus: "Conditional probability as restriction to an information-conditioned reference set.",
        roleRelevance:
          "Quantitative research constantly asks how probabilities change after observing information; conditional probability is the primitive operation behind likelihoods, Bayesian updating and state-dependent risk.",
        purpose:
          "Interpret conditioning structurally and derive the multiplication and total-probability rules without treating the vertical bar as decorative notation.",
        principalObstacle:
          "The denominator and reference population change under conditioning; base rates cannot be ignored, and P(A|B) is generally different from P(B|A).",
        entryPrerequisites: ["T22-M17-A01-A03", "Ratios", "Event intersections"],
        target:
          "Compute and interpret P(A|B) from the restricted sample space, derive the multiplication rule, and decompose probabilities over a partition using total probability.",
        requiredMastery: [
          "Derive P(A|B)=P(A∩B)/P(B) for P(B)>0 from relative mass inside B",
          "Distinguish P(A|B), P(B|A), P(A∩B) and P(A) in words and equations",
          "Derive the multiplication rule from the conditional definition",
          "Use a partition to derive/apply the law of total probability",
          "Diagnose a base-rate or denominator error in a contingency-table/tree calculation",
          "State the zero-probability denominator restriction in the finite setting",
          "Transfer conditioning to an unfamiliar diagnostic, signal or filtering scenario without invoking Bayes as a memorized formula",
        ],
        applicationScope:
          "Finite contingency tables, trees and partitioned populations where information changes the relevant reference class.",
        transferScope:
          "A setting where reversing the conditioning direction produces a plausible but wrong conclusion and the learner must reconstruct the correct denominator.",
        explicitlyOutOfScope: ["Bayes' rule as a full updating framework — ARC502", "Regular conditional probabilities", "Continuous conditioning"],
        nextArcBoundary:
          "A05 owns independence as a factorization property and separates it sharply from mutual exclusivity and mere weak association.",
      },
      "T22-M17-A05": {
        focus: "Independence of events and its distinction from mutual exclusivity.",
        roleRelevance:
          "Independence assumptions drive model factorization, likelihood construction, simulation and risk aggregation; unjustified independence is one of the most consequential shortcuts in quantitative work.",
        purpose:
          "Treat independence as a testable structural claim about joint probability rather than as vague unrelatedness.",
        principalObstacle:
          "Learners commonly confuse independent events with disjoint events or infer independence from intuition, zero-looking association or one convenient conditional probability.",
        entryPrerequisites: ["T22-M17-A03-A04", "Products of probabilities", "Conditional probability"],
        target:
          "Determine whether events are independent using factorization/conditional criteria, prove consequences in finite models, and expose cases where intuitive unrelatedness fails.",
        requiredMastery: [
          "Use P(A∩B)=P(A)P(B) as the finite-model independence criterion",
          "Show equivalence with P(A|B)=P(A) when the conditioning probability is positive",
          "Explain why nontrivial mutually exclusive events cannot be independent",
          "Construct a pair of dependent events whose marginal probabilities alone do not reveal the dependence",
          "Distinguish pairwise independence from stronger joint independence in a concrete counterexample",
          "Refuse an independence assumption when the data-generating mechanism gives no justification",
          "Transfer factorization reasoning to an unfamiliar repeated-trial or portfolio-style event model",
        ],
        applicationScope:
          "Finite repeated trials, component failures and multi-event risk models where factorization assumptions can be checked directly.",
        transferScope:
          "A model whose surface story suggests independence but a shared constraint or latent mechanism creates dependence.",
        explicitlyOutOfScope: ["Correlation of random variables — ARC517", "Conditional independence graphical models", "Mixing/time-series dependence"],
        nextArcBoundary:
          "A06 turns probabilities over finite payoff outcomes into expectation and uses fair-game/problem-of-points reasoning as a bridge to later random variables.",
      },
      "T22-M17-A06": {
        focus: "Expectation as probability-weighted value, fair games and the problem of points.",
        roleRelevance:
          "Expected value is the core aggregation operator behind pricing intuition, loss functions, risk-neutral thought experiments, Monte Carlo estimators and statistical moments.",
        purpose:
          "Build expectation from finite uncertain payoffs and distinguish expected value from the most likely outcome or a guaranteed long-run result.",
        principalObstacle:
          "A probability distribution over payoffs must be aggregated by weighting outcomes, but expectation can be non-attainable in a single trial and fairness depends on the modeled probabilities and payoffs rather than symmetry alone.",
        entryPrerequisites: ["T22-M17-A01-A05", "Finite weighted averages", "Basic algebra"],
        target:
          "Compute and derive finite expectations, price simple fair games by expected payoff, and solve problem-of-points-style divisions by conditioning on possible continuations rather than by naive score proportions.",
        requiredMastery: [
          "Derive finite expectation as the probability-weighted average of payoff values",
          "Compute expected payoff under nonuniform probabilities and distinguish it from mode, median-like intuition or guaranteed outcome",
          "Use linearity of finite sums to justify expectation of an affine payoff without assuming independence where none is needed",
          "Determine a fair entry price or fair division under an explicitly stated finite probability model",
          "Solve a problem-of-points-style interrupted-game allocation by enumerating or recursively conditioning on future outcomes",
          "Diagnose a fallacy that equates favorable probability with positive expected payoff",
          "Explain why expectation alone does not characterize risk or tail behavior",
          "Transfer expectation reasoning to an unfamiliar finite decision/payoff scenario",
        ],
        applicationScope:
          "Finite payoff, betting, contract or decision problems where expectation is meaningful but does not by itself settle risk preferences or full distributional behavior.",
        transferScope:
          "A new payoff structure with asymmetric probabilities or losses where intuitive win rate and expected value point in different directions.",
        explicitlyOutOfScope: ["General random-variable theory, variance and moments — ARC517", "Utility theory", "Asset-pricing theory", "LLN justification of sample averages — ARC712"],
        nextArcBoundary:
          "M18 / SIDE476 owns measurement uncertainty; later probability modules formalize random variables, distributions and expectation in general form.",
      },
    },
  };
}
