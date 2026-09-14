// Hand-authored T25 M.Stat v4 session cards 016-020.
// These contracts implement audited syllabus steps A3.1 through A5.3 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_016_020 = [
  {
    id:"T25-ARC812-A1016",routeOrder:16,syllabusCode:"A3.1",targetCode:"A3",parentId:"ARC812",
    title:"Prove one AM-GM-HM or Cauchy-Schwarz bound with equality conditions.",
    focus:"Using a small inequality toolkit as proof machinery rather than formula recall, with sign assumptions and equality cases treated as part of the theorem statement.",
    purpose:"Build entrance-level sharp-bound discipline: choose an inequality whose hypotheses actually fit the variables, derive the claimed bound, and identify exactly when equality is attained instead of stopping at a non-sharp estimate.",
    centralCapability:"Given a finite positive-variable or finite-vector inequality problem, select and apply AM-GM-HM or finite Cauchy-Schwarz appropriately, preserve every sign/positivity hypothesis, derive the requested bound, and determine all equality cases from the equality condition of the chosen inequality.",
    principalObstacle:"The learner may apply AM-GM to quantities that are not known positive, use Cauchy-Schwarz in a form that obscures sharpness, or state an equality case by guesswork after the algebra rather than tracing when every proof step becomes equality.",
    entryPrerequisites:["012-013 / A1 polynomial algebra and coefficient/root discipline","007-008 / F4 implication proof and counterexample discipline","001-004 / domain-safe algebra and inequality solution-set discipline"],
    requiredOwnership:[
      "State the positivity or real-valued hypotheses required before invoking AM-GM-HM or Cauchy-Schwarz.",
      "Rewrite the target expression into a form matched to a known finite inequality instead of applying a theorem by surface resemblance.",
      "Carry the proof to the requested numerical or symbolic bound without introducing an unjustified stronger or weaker claim.",
      "Derive the equality condition from the theorem used and intersect it with all problem constraints to identify every admissible equality case.",
      "Test sharpness by exhibiting or deriving an admissible equality configuration rather than merely asserting that the bound is best possible."
    ],
    applicationScope:"Finite algebraic inequalities involving positive numbers, sums, products, reciprocals or inner-product-like finite sums where AM-GM-HM or Cauchy-Schwarz gives a direct entrance-level bound.",
    transferScope:"A fresh inequality whose intended method is disguised by substitutions or constraints, requiring the learner to choose a valid theorem, expose the matching structure and recover the complete equality set independently.",
    inScope:["AM-GM-HM for positive inputs","Finite Cauchy-Schwarz","Sharp algebraic bounds","Equality conditions","Checking theorem hypotheses and admissible equality cases"],
    outOfScope:["Derivative-based optimisation or root counting reserved for C4-C5","General normed-space inequalities","Holder/Minkowski unless explicitly derived from in-scope tools","Convexity/Jensen reasoning reserved for A3.2"],
    exitCondition:"Prove one unfamiliar sharp inequality using AM-GM-HM or finite Cauchy-Schwarz, state every hypothesis before use, derive the full equality condition, and verify that each claimed equality case is admissible under the original constraints without hints.",
    nextArcBoundary:"017 · A3.2 keeps inequality reasoning but switches to a supplied convexity definition and asks for one Jensen-style application or counterexample, rather than another theorem-selection exercise.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC812-A1017",routeOrder:17,syllabusCode:"A3.2",targetCode:"A3",parentId:"ARC812",
    title:"Use a supplied convexity definition in one inequality or counterexample.",
    focus:"Reasoning from the definition of convexity supplied in the problem, including the direction of Jensen-type comparisons and the role of equality/strictness assumptions.",
    purpose:"Prepare for entrance questions that give a convexity property directly and expect the learner to exploit it without requiring a full real-analysis theory of convex functions.",
    centralCapability:"Given a stated convexity or concavity definition and an elementary function/problem, translate the definition into a usable weighted-average inequality, apply it to a finite configuration when justified, or construct a counterexample when a proposed claim drops a necessary sign, interval or convexity assumption.",
    principalObstacle:"A learner may reverse convex versus concave inequality directions, apply a supplied definition outside its stated interval, assume strict equality conditions without proof, or invoke Jensen as a memorised black box instead of connecting it to the given definition.",
    entryPrerequisites:["016 / A3.1 sharp-bound and equality-case discipline","007-008 / F4 quantified claims and decisive counterexamples","F1-F2 domain and legal-inequality reasoning"],
    requiredOwnership:[
      "Read the supplied convexity/concavity statement literally, including its domain and weight restrictions.",
      "Convert a two-point convexity relation into the finite weighted comparison requested when the problem permits the needed repeated/elementary argument.",
      "Keep convex and concave inequality directions distinct and verify that every evaluation point remains inside the stated interval.",
      "Determine equality only from conditions actually supplied or proved; do not assume strict convexity when only convexity is given.",
      "Refute a false strengthened claim by removing one necessary hypothesis and giving a concrete admissible counterexample."
    ],
    applicationScope:"Elementary finite weighted-average inequalities and true/false claims where convexity or concavity is explicitly defined or granted, with no need for second-derivative tests or abstract convex analysis.",
    transferScope:"A fresh problem that supplies an unfamiliar convexity-like definition or hides a missing domain/sign condition, requiring the learner to derive the correct comparison from the statement itself and decide whether the proposed extension survives.",
    inScope:["Supplied convexity/concavity definitions","Finite weighted Jensen-style comparisons","Domain and weight checks","Equality/strictness caution","Counterexamples after removing necessary hypotheses"],
    outOfScope:["Second-derivative convexity tests","General convex optimisation","Supporting-hyperplane theory","Calculus-based extrema or root counts reserved for later calculus targets"],
    exitCondition:"Given a new supplied convexity or concavity definition, derive and apply the requested finite comparison with correct direction and domain conditions, then identify the justified equality case or destroy an invalid strengthened claim with a decisive counterexample.",
    nextArcBoundary:"018 · A5.1 leaves inequality theory and starts sequences: monotonicity, boundedness and counterexamples become the sole focus before any convergence proof is attempted.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC905-A1018",routeOrder:18,syllabusCode:"A5.1",targetCode:"A5",parentId:"ARC905",
    title:"Decide monotonicity/boundedness and construct a counterexample.",
    focus:"Classifying sequence behaviour from its formula or recurrence and separating boundedness/monotonicity from convergence claims that require additional argument.",
    purpose:"Build the diagnostic language for later limit work while making counterexample construction routine, especially for false claims such as bounded implies convergent or monotone implies bounded.",
    centralCapability:"Given an elementary real sequence by formula or simple recurrence, determine monotonicity and boundedness with explicit inequalities, and construct or analyse a sequence that disproves a false implication among monotonicity, boundedness and convergence.",
    principalObstacle:"Finite numerical inspection can make a sequence look monotone or convergent; learners also conflate one-sided boundedness with boundedness and may cite a familiar counterexample without checking that it satisfies the exact negated claim.",
    entryPrerequisites:["014-015 / A2 indexing, finite sums and progression discipline","007-008 / F4 quantified claims and counterexample logic","006 / F3 parameter/recurrence role tracking"],
    requiredOwnership:[
      "State the indexing set and compare a_(n+1) with a_n or use an equivalent exact argument to prove monotonicity rather than infer it from early terms.",
      "Distinguish bounded above, bounded below and bounded, and provide explicit bounds valid for every index in the sequence.",
      "Recognise that boundedness alone does not imply convergence and produce a valid bounded nonconvergent example with its behaviour explained.",
      "Recognise that monotonicity alone does not guarantee finite convergence unless the needed boundedness direction is also present.",
      "When given a recurrence, prove any claimed invariant interval or monotonic direction before using it as evidence about long-run behaviour."
    ],
    applicationScope:"Elementary explicit sequences and short recurrences where signs, differences, ratios or invariant intervals settle monotonicity and boundedness without advanced analysis.",
    transferScope:"A fresh oscillatory or parameterised sequence designed to defeat pattern-recognition from its first few terms, requiring a proof-level classification and a counterexample to the nearest false general claim.",
    inScope:["Monotone increasing/decreasing sequences","Upper/lower/two-sided boundedness","Elementary recurrence invariants","Bounded nonconvergent counterexamples","Logical relations among monotonicity, boundedness and convergence"],
    outOfScope:["Formal epsilon-N convergence proofs reserved for A5.2","Series convergence tests","Continuity/differentiability machinery","Stochastic sequences and martingales"],
    exitCondition:"Classify one unfamiliar explicit or recursively defined sequence as monotone/nonmonotone and bounded/unbounded with valid all-n reasoning, then construct and justify a counterexample to one false implication among these properties without relying on numerical plots.",
    nextArcBoundary:"019 · A5.2 takes these structural diagnostics and requires an actual convergence argument for a sequence, subsequence or elementary recurrence limit.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC905-A1019",routeOrder:19,syllabusCode:"A5.2",targetCode:"A5",parentId:"ARC905",
    title:"Prove one sequence/subsequence or recurrence limit.",
    focus:"Turning the definition and elementary convergence theorems into a complete limit argument, including subsequence logic and justification of any recurrence fixed-point candidate.",
    purpose:"Move from describing sequence behaviour to proving its limit, with enough rigor to reject common shortcuts such as solving L=f(L) before proving the recurrence converges.",
    centralCapability:"For an elementary sequence, subsequence or one-step recurrence, prove a claimed limit using direct definition, squeeze, monotone-bounded reasoning or a justified recurrence argument, and explain why two distinct subsequential limits rule out convergence.",
    principalObstacle:"Learners often treat a plausible numerical limit or recurrence fixed point as proof, forget that every subsequence of a convergent sequence shares the same limit, or use a monotone convergence argument without establishing the required bound.",
    entryPrerequisites:["018 / A5.1 monotonicity, boundedness and recurrence invariants","014-015 / indexing and geometric-tail algebra","007-008 / F4 proof discipline"],
    requiredOwnership:[
      "State the convergence claim with its index variable and use an elementary proof method whose hypotheses have actually been established.",
      "Use squeeze reasoning only after proving both bounding sequences converge to the same limit.",
      "Use monotone-bounded convergence only after separately proving monotonicity and the appropriate bound.",
      "For a recurrence, justify existence of convergence before substituting a limit into the recurrence equation, and then check candidate fixed points against the established invariant region.",
      "Use subsequences correctly: derive subsequential limits from selected indices and conclude nonconvergence when two subsequences have different limits."
    ],
    applicationScope:"Elementary rational, geometric, oscillatory and recursively defined real sequences whose limits can be established by direct estimates, squeeze, monotone-bounded reasoning or simple subsequence analysis.",
    transferScope:"A fresh recurrence or oscillatory sequence where the apparent limit from computation is misleading unless an invariant region, monotonicity argument or two-subsequence obstruction is proved first.",
    inScope:["Elementary sequence convergence","Squeeze arguments","Monotone-bounded convergence examples","Subsequences and distinct subsequential limits","Simple recurrence limits with prior convergence justification"],
    outOfScope:["Abstract completeness proofs","Cauchy-sequence theory beyond what is explicitly needed","Infinite series convergence machinery","Probability limit theorems"],
    exitCondition:"Prove the limit or nonconvergence of one unfamiliar sequence or elementary recurrence from justified hypotheses, and if recurrence substitution or subsequences are used, explicitly show why those steps are logically valid rather than merely suggestive.",
    nextArcBoundary:"020 · A5.3 leaves numerical sequence limits and returns to function constraints: composition and periodicity claims must be tested from definitions and quantified logic.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC905-A1020",routeOrder:20,syllabusCode:"A5.3",targetCode:"A5",parentId:"ARC905",
    title:"Test one composition or periodicity constraint.",
    focus:"Reading composition and periodicity as global function constraints, then using definitions, iterates and counterexamples to decide what those constraints actually force.",
    purpose:"Close the elementary-function target with entrance-style functional reasoning that depends on changed-input and logical discipline, without drifting into general functional-equation theory.",
    centralCapability:"Given an elementary claim involving f∘g, f∘f, an inverse-related composition or periodicity condition, compute the relevant compositions on stated domains, translate periodicity into a for-all input condition, and prove or refute the proposed consequence with a short argument or counterexample.",
    principalObstacle:"Learners may confuse f(f(x)) with [f(x)]², infer commutativity of composition, treat one repeated value as evidence of periodicity, or forget that a period condition must hold for every legal input and that a stated period need not be fundamental.",
    entryPrerequisites:["005-006 / F3 changed-input substitution and affine composition","007-008 / F4 quantified claims and counterexamples","011 / F5.3 domain-sensitive inverses","018-019 / A5 sequence/iteration discipline"],
    requiredOwnership:[
      "Compute f∘g and g∘f by whole-input substitution and keep their domains separate; do not assume composition is commutative.",
      "Interpret f(f(x)) as composition/iteration and distinguish it from algebraic powers of f(x).",
      "State periodicity as f(x+T)=f(x) for every legal x for some nonzero T, with any domain-translation condition made explicit.",
      "Distinguish a period from a fundamental period and avoid claiming minimality unless it is proved.",
      "Test a proposed composition or periodicity consequence with quantified reasoning and construct a concrete counterexample when the implication is false."
    ],
    applicationScope:"Elementary real or finite-domain functions and short functional claims involving composition, self-composition, inverses or periodicity where direct substitution and quantified logic settle the issue.",
    transferScope:"A fresh function claim in which several sample inputs support a false periodicity or composition conclusion, requiring the learner to return to the global definition and either prove it or produce one decisive counterexample.",
    inScope:["Function composition","Self-composition/iteration","Composition with inverses on valid domains","Periodicity as a global condition","Period versus fundamental period and counterexample testing"],
    outOfScope:["General functional-equation classification","Dynamical systems and stability theory","Fourier analysis","Trigonometric equation solving reserved for G1"],
    exitCondition:"Resolve one unfamiliar composition-or-periodicity claim by computing the required compositions on their correct domains, translating every global condition with the right quantifiers, and giving either a complete short proof or a decisive counterexample without hints.",
    nextArcBoundary:"021 · G1.1 leaves general function constraints and begins unit-circle trigonometry: radians, signs, basic identities and sine/cosine rules become the next bounded capability.",
    mode:"learn",evidencePolicy:"standard"
  }
];
