// Hand-authored T25 M.Stat v4 session cards 036-040.
// These contracts implement audited syllabus steps P6.2 through J2.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_036_040 = [
  {
    id:"T25-ARC819-A1036",routeOrder:36,syllabusCode:"P6.2",targetCode:"P6",parentId:"ARC819",
    title:"Separate pairwise, mutual and conditional independence in one counterexample.",
    focus:"Distinguishing three different notions of independence by direct factorisation tests and by counterexamples, with special attention to how conditioning can create or destroy dependence.",
    purpose:"Prevent one of the most persistent probability errors: inferring mutual independence from pairwise checks, or assuming an independence statement survives after new information is revealed.",
    centralCapability:"Given three or more events and possibly a conditioning event, test pairwise and mutual independence from definitions, construct or analyse a counterexample separating them, and determine whether conditioning preserves or destroys an independence relation.",
    principalObstacle:"The learner may treat all pairwise products as sufficient for mutual independence, confuse conditional independence with unconditional independence, or appeal to intuitive unrelatedness instead of checking the exact factorisations required by the definition.",
    entryPrerequisites:["035 / P6.1 independence versus disjointness","033-034 / P4 conditional laws and Bayes partitions","031-032 / P3 event arithmetic and probability laws"],
    requiredOwnership:[
      "State pairwise independence as separate factorisations for each event pair and mutual independence as the required factorisations for every relevant finite intersection.",
      "Produce or verify a concrete example in which each pair is independent but the full collection is not mutually independent.",
      "Compute conditional event probabilities on a positive-probability conditioning event before testing conditional independence.",
      "Explain explicitly how conditioning can alter the reference population and thereby destroy or create an independence relation.",
      "Keep disjointness, pairwise independence, mutual independence and conditional independence logically separate throughout the argument."
    ],
    applicationScope:"Finite probability spaces and small event collections where exact masses can be tabulated and every relevant intersection or conditional factorisation can be checked directly.",
    transferScope:"A fresh finite construction whose pairwise checks all succeed but whose triple intersection or conditioned table exposes a different dependence structure, requiring the learner to identify precisely which notion fails.",
    inScope:["Pairwise independence","Mutual independence","Conditional independence","Finite counterexamples","Conditioning-induced changes in dependence"],
    outOfScope:["Graphical models","Sigma-algebra independence in abstract measure theory","Asymptotic dependence concepts","Random-variable independence beyond the elementary bridge needed later"],
    exitCondition:"Given one unfamiliar finite event model, classify its pairwise, mutual and conditional independence properties from exact definitions, and either construct or explain a decisive counterexample separating at least two of those notions without hints.",
    nextArcBoundary:"037 · J1.1 leaves event-level dependence and introduces random variables and indicators: outcomes must now be encoded numerically before expectations are computed.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC820-A1037",routeOrder:37,syllabusCode:"J1.1",targetCode:"J1",parentId:"ARC820",
    title:"Encode a payoff or count as a random variable or sum of indicators.",
    focus:"Turning an experiment into a numerical random variable and representing event counts as sums of 0-1 indicators before any expectation calculation is attempted.",
    purpose:"Build the representation skill that makes many probability questions simpler: once a count is decomposed into indicators, later expectation and variance calculations can follow from algebra rather than case enumeration.",
    centralCapability:"Given a finite experiment, define an appropriate random variable with its support, or express a requested count as a sum of indicator variables whose events are stated precisely, while preserving the distinction between outcomes, events and numerical values.",
    principalObstacle:"Learners often call an event itself a random variable, omit part of the support, or define indicators vaguely enough that overlaps and multiplicities become ambiguous in the later sum.",
    entryPrerequisites:["031-036 / P3-P6 event arithmetic, conditioning and independence","027-030 / P1-P2 finite sample-space and counting structure","Basic function notation from F3-F5"],
    requiredOwnership:[
      "Define a random variable as a numerical function of elementary outcomes and distinguish its support from the sample space.",
      "Construct an indicator I_A that equals 1 exactly on a stated event A and 0 otherwise.",
      "Express a count N as a sum of indicators whose individual success events correspond exactly to the counted objects.",
      "Check that overlapping events do not cause double counting unless the count itself is intended to count multiple simultaneous occurrences.",
      "List or derive the possible values of the resulting payoff or count and verify that the representation matches the original experiment on representative outcomes."
    ],
    applicationScope:"Finite payoff games, occupancy/counting experiments and repeated-trial settings where a discrete random variable or finite sum of indicators gives a natural exact representation.",
    transferScope:"A fresh counting problem in which direct enumeration is cumbersome but each object can be marked by a 0-1 success indicator, requiring the learner to invent the representation independently.",
    inScope:["Finite discrete random variables","Supports and values","Indicator variables","Counts as indicator sums","Outcome-by-outcome verification"],
    outOfScope:["Expectation calculation reserved for J1.2","Continuous random variables","Measure-theoretic random-variable definitions","Variance/covariance reserved for J2"],
    exitCondition:"For one unfamiliar finite probability experiment, define the relevant payoff/count random variable or an exact sum-of-indicators representation, identify its support or interpretation, and verify the encoding on enough outcomes to establish that no event is omitted or double-counted incorrectly.",
    nextArcBoundary:"038 · J1.2 keeps the same representation but now derives expectation using linearity, explicitly avoiding any unnecessary independence assumption.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC820-A1038",routeOrder:38,syllabusCode:"J1.2",targetCode:"J1",parentId:"ARC820",
    title:"Derive its expectation without adding an unnecessary independence assumption.",
    focus:"Computing expectations from a discrete law or indicator decomposition and using linearity in its full generality, including dependent and overlapping events.",
    purpose:"Make expected-value reasoning structurally reliable: expectation of a sum is the sum of expectations whether or not the summands are independent, and indicator expectations reduce immediately to event probabilities.",
    centralCapability:"Given a finite random variable or count represented by indicators, derive its expectation from first principles or by linearity, identify exactly where probability inputs enter, and state which steps do and do not require independence.",
    principalObstacle:"A learner may incorrectly require independence before using linearity of expectation, multiply expectations when only a sum is present, or compute an expected count by treating overlapping events as disjoint.",
    entryPrerequisites:["037 / J1.1 random-variable and indicator encoding","031-036 / event probabilities and independence distinctions","014-015 / finite sums and indexing"],
    requiredOwnership:[
      "Compute E[X] from a finite probability mass function as the weighted sum of possible values and their probabilities.",
      "Use E[I_A]=P(A) for an indicator and derive that identity rather than treating it as an unexplained shortcut.",
      "Apply linearity E[sum X_i]=sum E[X_i] without assuming independence or disjointness.",
      "Separate additive expectation arguments from multiplicative claims such as E[XY]=E[X]E[Y], which generally need additional hypotheses.",
      "Explain how dependence can change higher-order behaviour while leaving the linear expectation calculation unchanged."
    ],
    applicationScope:"Expected counts, finite payoffs and overlapping-event models where direct distribution enumeration is possible but an indicator-sum calculation is cleaner and more general.",
    transferScope:"A fresh dependent counting problem in which several indicators overlap strongly, requiring the learner to recognise that expectation still decomposes linearly and to resist introducing a false independence assumption.",
    inScope:["Finite expectation","Expectation of indicators","Linearity of expectation","Expected counts under dependence","Assumption auditing"],
    outOfScope:["Variance and covariance reserved for J2","Infinite-series expectation interchange","Conditional expectation beyond elementary event conditioning","Continuous expectation integrals"],
    exitCondition:"Derive the expectation of one unfamiliar finite payoff or dependent indicator count, showing the representation, every probability input and the linearity step, and explicitly state why independence is or is not required at each stage.",
    nextArcBoundary:"039 · J2.1 adds second moments: variance and covariance identities must be derived and then used to analyse dependent sums.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC820-A1039",routeOrder:39,syllabusCode:"J2.1",targetCode:"J2",parentId:"ARC820",
    title:"Derive variance/covariance identities and a finite dependent-sum calculation.",
    focus:"Building variance and covariance from expectations, then expanding finite sums without silently discarding dependence terms.",
    purpose:"Establish the exact second-moment algebra needed across statistics: variance of a sum contains covariance cross terms, and those terms vanish only under justified conditions.",
    centralCapability:"Given finite random variables with existing second moments, derive Var(X)=E[X²]-E[X]², define and manipulate covariance, and compute the variance of a dependent finite sum with every covariance term accounted for.",
    principalObstacle:"Learners often use Var(X+Y)=Var(X)+Var(Y) automatically, confuse zero covariance with independence, or lose the factor of two when collecting symmetric covariance cross terms.",
    entryPrerequisites:["037-038 / J1 random variables, indicators and expectation linearity","035-036 / P6 independence distinctions","Finite algebraic expansion and indexed sums"],
    requiredOwnership:[
      "Derive Var(X)=E[(X-E[X])²]=E[X²]-E[X]² whenever the needed moments exist.",
      "Define Cov(X,Y)=E[XY]-E[X]E[Y] and use its symmetry and bilinearity in finite algebraic expansions.",
      "Expand Var(sum X_i) into the individual variances plus all covariance cross terms with correct multiplicities.",
      "Set covariance terms to zero only when zero covariance is established; distinguish this from the stronger statement of independence.",
      "Check existence of the required second moments before manipulating variance or covariance expressions."
    ],
    applicationScope:"Finite discrete random variables, indicator sums and short dependent sums where expectations, second moments and pairwise covariance terms can be evaluated exactly.",
    transferScope:"A fresh dependent-sum problem where most but not all covariance terms vanish, requiring the learner to organise the expansion systematically and retain the surviving interactions.",
    inScope:["Variance identity","Covariance identity","Bilinearity","Variance of finite dependent sums","Moment-existence conditions"],
    outOfScope:["Continuous covariance integrals until continuous laws are introduced","Covariance matrices in full linear-algebra form","Asymptotic variance","Zero covariance as a general independence criterion"],
    exitCondition:"Derive and evaluate the variance of one unfamiliar finite dependent sum from expectations and covariance identities, showing every cross term and justifying exactly which terms vanish without assuming independence from zero covariance alone.",
    nextArcBoundary:"040 · J2.2 reuses the same algebra dynamically: moments and lag covariance must be propagated through an overlapping sum or linear recurrence.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC820-A1040",routeOrder:40,syllabusCode:"J2.2",targetCode:"J2",parentId:"ARC820",
    title:"Propagate moments through an overlapping sum or linear recurrence.",
    focus:"Using expectation, variance and covariance recurrences to track second-moment structure through overlapping sums or elementary linear dynamics with independent innovations.",
    purpose:"Turn static second-moment identities into a reusable propagation tool and expose how shared components generate lag covariance even when new innovations are independent.",
    centralCapability:"Given an elementary overlapping-sum construction or linear recurrence with stated innovation assumptions, propagate its mean and variance and compute at least one lag covariance by expanding shared and independent components explicitly.",
    principalObstacle:"The learner may see independent innovations and conclude the resulting process values are independent, overlook covariance created by shared past terms, or iterate a variance recursion without checking the initial condition and coefficient factors.",
    entryPrerequisites:["039 / J2.1 variance-covariance algebra","038 / J1.2 expectation linearity","036 / P6.2 mutual and conditional independence discipline"],
    requiredOwnership:[
      "Propagate expectations through a linear recurrence using linearity and the stated innovation mean.",
      "Propagate variance through a recurrence by separating scaled past variance from innovation variance and any justified covariance term.",
      "Identify which components two overlapping sums or lagged recurrence values share and use that overlap to compute covariance.",
      "Use independence of innovations only where explicitly stated and never promote it automatically to independence of the derived process values.",
      "Track the initial condition and iterate or solve a short moment recursion only to the level required by the problem."
    ],
    applicationScope:"Short moving-sum constructions and first-order linear recurrences with finite second moments and simple innovation assumptions, including one or two lag-covariance calculations.",
    transferScope:"A fresh recurrence whose shocks are independent but whose states remain correlated through shared history, requiring the learner to expose that dependence algebraically rather than rely on verbal intuition.",
    inScope:["Mean propagation","Variance recurrences","Lag covariance","Overlapping sums","Independent innovations versus dependent states"],
    outOfScope:["Stationary time-series theory","ARMA estimation","Stochastic-process asymptotics","Continuous-time stochastic recurrences"],
    exitCondition:"For one unfamiliar overlapping-sum or linear-recurrence model with stated second-moment assumptions, propagate its mean and variance and derive a nontrivial lag covariance, identifying every independence step and every dependence created by shared components.",
    nextArcBoundary:"041 · D1.1 moves from moment algebra to named discrete sampling laws: binomial and hypergeometric probabilities must be derived from the experiment itself.",
    mode:"learn",evidencePolicy:"standard"
  }
];
