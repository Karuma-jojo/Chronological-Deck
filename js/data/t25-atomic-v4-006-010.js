// Hand-authored T25 M.Stat v4 session cards 006-010.
// These contracts implement audited syllabus steps F3.2 through F5.2 only.

export const T25_ATOMIC_V4_006_010 = [
  {
    id:"T25V4-F3-02",routeOrder:6,syllabusCode:"F3.2",targetCode:"F3",parentId:"ARC801",
    title:"Analyse one parameter or affine-iteration question.",
    focus:"Separating the running variable from parameters and constants while tracking how an affine rule changes under composition or repeated application.",
    purpose:"Extend fixed changed-input reasoning into parameter-sensitive problems where the legal domain, output formula or repeated affine action can change qualitatively with the parameter value.",
    centralCapability:"Given a one-variable function containing a parameter, or a simple affine map f(x)=ax+b used once or repeatedly, identify which symbols are variables versus fixed parameters, compute the requested changed or iterated expression correctly, and split into parameter cases whenever algebraic legality or behaviour changes.",
    principalObstacle:"The learner may unconsciously let a parameter vary during a calculation, confuse f(f(x)) with an algebraic square, divide by a parameter expression that could be zero, or state one formula across exceptional cases where the affine map changes type.",
    entryPrerequisites:["005 / F3.1 whole-input substitution and domain pullback","F2 solution-set and exceptional-case discipline","Elementary algebra with symbolic parameters"],
    requiredOwnership:[
      "Label the running variable, fixed parameter and numerical constants before manipulating the expression.",
      "Compute f(ax+b), f(f(x)) or a short affine iterate by substituting the entire input rather than symbol-by-symbol guessing.",
      "Detect parameter values that make a denominator zero, collapse a coefficient, or otherwise invalidate a generic algebraic step.",
      "Separate exceptional parameter cases before division or cancellation and state the resulting formula in each legal case.",
      "Explain how changing the parameter alters the map or legal input set without treating the parameter as a second free variable in the same task."
    ],
    applicationScope:"Elementary parameterised functions and short affine-iteration problems in which the main work is symbolic role-tracking, legal case separation and correct repeated substitution rather than general dynamical-systems analysis.",
    transferScope:"A fresh affine or domain-restricted parameter problem whose exceptional case is hidden inside a coefficient or denominator, requiring the learner to discover the case split and recompute the expression rather than merely substitute a memorised formula.",
    inScope:["Variable/parameter/constant roles","Short affine composition or iteration","Parameter-dependent domain conditions","Exceptional zero-coefficient cases","Case-safe algebraic simplification"],
    outOfScope:["General composition and periodicity theory reserved for A5.3","Injectivity, surjectivity and inverse construction reserved for F5.3","Long recurrence or dynamical-system analysis","Calculus-based parameter optimisation or root counting"],
    exitCondition:"On one unfamiliar parameterised function or affine-iteration problem, identify all symbol roles, derive the requested expression from whole-input substitution, isolate every exceptional parameter value before any unsafe division, and give the correct casewise conclusion without a hint.",
    nextArcBoundary:"007 · F4.1 leaves function manipulation and begins explicit mathematical-claim logic: quantified negation, necessary/sufficient language and converse testing become the central task.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25V4-F4-01",routeOrder:7,syllabusCode:"F4.1",targetCode:"F4",parentId:"ARC801",
    title:"Negate one quantified claim and test a converse.",
    focus:"Reading the logical skeleton of a mathematical sentence before deciding whether the claim, its converse or its negation is true.",
    purpose:"Build the minimum proof-language discipline needed throughout M.Stat questions: universal claims require universal support, existential claims require a witness, and negation must reverse the quantifier rather than merely insert the word not.",
    centralCapability:"Translate an elementary mathematical claim into its quantifier-and-implication structure, negate it correctly, distinguish a statement from its converse and contrapositive, and classify necessary versus sufficient conditions using a concrete example or counterexample when appropriate.",
    principalObstacle:"Natural language makes logically different claims sound similar, so learners often negate 'for every' as 'for every not', reverse an implication without justification, or confuse a condition that is sufficient with one that is necessary.",
    entryPrerequisites:["F2 solution-set logic","Basic set/function notation from ordinary mathematics","Ability to evaluate a concrete candidate example"],
    requiredOwnership:[
      "Negate a statement of the form 'for every x, P(x)' as an existential failure and negate an existential claim as a universal failure.",
      "Distinguish P implies Q from the converse Q implies P and from the contrapositive not-Q implies not-P.",
      "Translate 'P is sufficient for Q' and 'Q is necessary for P' into the same implication direction.",
      "Test a proposed converse with a strategically chosen example rather than assuming symmetry of implication.",
      "State exactly what would count as evidence for a universal claim, an existential claim and the negation of each."
    ],
    applicationScope:"Short algebraic, set-theoretic or function claims with one or two quantifiers and elementary implications, where the main task is logical translation and classification rather than a long proof.",
    transferScope:"An unfamiliar verbal claim whose surface wording hides the quantifier order or implication direction; the learner must rewrite it symbolically enough to negate it and decide whether the converse survives.",
    inScope:["Universal and existential negation","Implication direction","Converse and contrapositive distinction","Necessary versus sufficient conditions","Witnesses and counterexamples for claim testing"],
    outOfScope:["Writing a complete proof reserved for F4.2","Formal predicate-logic systems or truth-table courses","Mathematical induction","Measure-theoretic almost-sure quantifiers or advanced analysis logic"],
    exitCondition:"Given a fresh quantified implication, write its correct negation in words or symbols, state the converse and contrapositive, identify the necessary/sufficient relationship, and either validate or destroy the converse with a decisive elementary example without prompting.",
    nextArcBoundary:"008 · F4.2 turns this claim-reading skill into a finished mathematical argument: either a short proof under stated assumptions or a counterexample that decisively refutes the claim.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25V4-F4-02",routeOrder:8,syllabusCode:"F4.2",targetCode:"F4",parentId:"ARC801",
    title:"Write one short proof or a decisive counterexample.",
    focus:"Closing a small mathematical claim with a complete chain of justified steps, or refuting it with one example that satisfies the assumptions and violates the conclusion.",
    purpose:"Prevent two opposite failure modes common in entrance work: treating several confirming examples as proof, and offering a counterexample that does not actually meet the claim's hypotheses.",
    centralCapability:"For an elementary implication or universal claim, decide whether a short direct/contrapositive argument is available or whether the claim is false, then produce either a complete assumption-to-conclusion proof or a valid counterexample with every required hypothesis checked.",
    principalObstacle:"A plausible pattern can feel proven after a few examples, while an attempted counterexample can be irrelevant because it violates a hidden assumption; conversely, a proof can smuggle in the desired conclusion or an unstated converse.",
    entryPrerequisites:["007 / F4.1 quantified negation and implication structure","F2 legal algebraic transformations","Elementary algebra and set/function notation"],
    requiredOwnership:[
      "State the assumptions being used before starting the argument.",
      "Choose direct proof, contrapositive reasoning or counterexample according to the actual logical form instead of stylistic preference.",
      "Justify each algebraic or set-theoretic implication without assuming the conclusion or its converse.",
      "For a counterexample, verify every hypothesis and then show explicitly which required conclusion fails.",
      "Explain why multiple supporting examples cannot establish a universal claim but one valid counterexample can refute it."
    ],
    applicationScope:"Compact proofs and counterexamples built from elementary algebra, inequalities, sets, functions or finite structures, typically a few logically complete steps rather than theorem-heavy exposition.",
    transferScope:"A fresh true-or-false claim with misleading numerical examples, where the learner must determine whether to prove or refute it and then produce a self-contained argument without being told the method.",
    inScope:["Short direct proofs","Elementary contraposition","Counterexample construction","Hypothesis checking","Assumption-to-conclusion completeness"],
    outOfScope:["Long theorem proofs requiring later subject machinery","Formal induction schemes","Proofs using advanced real analysis or measure theory","Relations/equivalence-class definitions reserved for F5.2"],
    exitCondition:"Resolve one unfamiliar elementary claim completely: if true, give a short proof whose assumptions and implication steps are explicit; if false, give one counterexample that satisfies every premise and violates the conclusion. Then explain why the chosen argument is logically decisive.",
    nextArcBoundary:"009 · F5.1 moves from general claim logic to set membership as a calculational language for unions, intersections, complements, Cartesian products, images and preimages.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25V4-F5-01",routeOrder:9,syllabusCode:"F5.1",targetCode:"F5",parentId:"ARC802",
    title:"Translate set operations and images/preimages by membership.",
    focus:"Reducing set expressions and function-set statements to precise element-membership conditions rather than manipulating set symbols by visual pattern alone.",
    purpose:"Create a reusable membership language for later probability events, supports, inverse images and equivalence classes, while keeping image/preimage notation distinct from inverse-function notation.",
    centralCapability:"Given finite or rule-defined sets and an elementary function, translate unions, intersections, complements, set differences, Cartesian products, images and preimages into elementwise membership statements and use those statements to prove or refute a small set equality.",
    principalObstacle:"Set notation encourages symbol pushing: learners may confuse element membership with subset inclusion, reverse the direction of images and preimages, or treat f^{-1}(B) as requiring an inverse function rather than as a preimage set.",
    entryPrerequisites:["008 / F4.2 short proof/counterexample discipline","F3 function evaluation and changed-input notation","Elementary equality and membership notation"],
    requiredOwnership:[
      "Distinguish x∈A from A⊆B and translate each relation into the correct verbal claim.",
      "Expand membership in union, intersection, complement and difference using and/or/not conditions.",
      "Interpret an ordered pair in A×B with the correct first-coordinate and second-coordinate membership requirements.",
      "Compute f(A) as an image and f^{-1}(B) as a preimage without assuming that f is invertible.",
      "Prove a small set identity by two-way membership or refute it by one element lying in exactly one side."
    ],
    applicationScope:"Finite sets, interval/rule-defined subsets of the reals and elementary functions where set operations, Cartesian products, images or preimages can be determined exactly from membership conditions.",
    transferScope:"An unfamiliar nested set expression or preimage identity in which the notation is deliberately dense; the learner must unpack membership step by step and detect whether the claimed equality really holds.",
    inScope:["Membership versus subset notation","Union/intersection/complement/difference","Cartesian products","Function images","Function preimages and membership proofs"],
    outOfScope:["Testing relation axioms reserved for F5.2","Injectivity, surjectivity and inverse-function construction reserved for F5.3","Sigma-algebras or measure theory","Probability calculations on events reserved for P3"],
    exitCondition:"For a fresh function and several stated sets, compute one image and one preimage, translate a nested set expression into membership logic, and prove or disprove one set equality elementwise without confusing preimage notation with an inverse function.",
    nextArcBoundary:"010 · F5.2 uses Cartesian-product and membership language to treat a relation as a set of ordered pairs and asks whether it is an equivalence relation and what its classes are.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25V4-F5-02",routeOrder:10,syllabusCode:"F5.2",targetCode:"F5",parentId:"ARC802",
    title:"Check a relation and list its equivalence classes.",
    focus:"Testing reflexivity, symmetry and transitivity from the actual ordered-pair rule, then turning a valid equivalence relation into disjoint equivalence classes.",
    purpose:"Make relation questions proof-driven rather than pattern-driven and establish the partition viewpoint needed to reason cleanly about 'same-type' groupings on finite or elementary sets.",
    centralCapability:"Given a relation on a stated set, interpret it as a subset of the Cartesian square, test reflexivity, symmetry and transitivity with explicit reasoning, decide whether it is an equivalence relation, and if so compute the equivalence classes and verify that they partition the underlying set.",
    principalObstacle:"A relation can look symmetric or grouping-like in a few examples while failing one axiom elsewhere; transitivity in particular is often asserted from a diagram or intuition instead of checking the implication xRy and yRz implies xRz.",
    entryPrerequisites:["009 / F5.1 Cartesian products and membership logic","007-008 / F4 claim and proof discipline","Elementary finite-set enumeration"],
    requiredOwnership:[
      "Read xRy as membership of (x,y) in a specified relation and keep the underlying set explicit.",
      "Test reflexivity by checking every element is related to itself, or refute it with one missing diagonal case.",
      "Test symmetry by reversing related ordered pairs and distinguish symmetry from merely having many reciprocal examples.",
      "Test transitivity from two composable relation facts and produce a concrete violating triple when it fails.",
      "For a valid equivalence relation, compute [x]={y:xRy}, identify duplicate classes and verify the distinct classes are disjoint and cover the set."
    ],
    applicationScope:"Finite sets and elementary relations defined by equality-like rules such as congruence, parity, shared attributes or simple algebraic conditions where the three equivalence axioms can be checked directly.",
    transferScope:"A fresh relation presented as a formula, table or pair list where one axiom is subtly violated or where several named elements represent the same equivalence class, requiring proof rather than visual grouping.",
    inScope:["Relations as subsets of A×A","Reflexivity","Symmetry","Transitivity","Equivalence classes and partition check"],
    outOfScope:["Injective/surjective function tests reserved for F5.3","General partial orders or order theory","Quotient vector spaces or quotient groups","Probability conditional equivalence or statistical sufficiency"],
    exitCondition:"On an unfamiliar finite or elementary relation, decide each of reflexive, symmetric and transitive with a proof or explicit counterexample; if all hold, list every distinct equivalence class and verify that the classes cover the set without overlap.",
    nextArcBoundary:"011 · F5.3 keeps the stated-domain discipline but switches from arbitrary relations to functions: injectivity, surjectivity and construction of an inverse on the declared domain/codomain become the sole focus.",
    mode:"learn",evidencePolicy:"standard"
  }
];
