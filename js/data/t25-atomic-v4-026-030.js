// Hand-authored T25 M.Stat v4 session cards 026-030.
// These contracts implement audited syllabus steps G2.2 through P2.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_026_030 = [
  {
    id:"T25-ARC807-A1026",routeOrder:26,syllabusCode:"G2.2",targetCode:"G2",parentId:"ARC807",
    title:"Check tangency, reflection, intersections or a rational-point construction.",
    focus:"Using the line/circle equations already constructed to decide geometric consequences such as tangency, intersection multiplicity, reflection, and simple rational-point generation without trusting a diagram.",
    purpose:"Complete elementary coordinate geometry by turning geometric claims into algebraic tests whose exceptional and degenerate cases remain visible.",
    centralCapability:"Given equations for one or more lines/circles, determine tangency or intersection conditions from distance, discriminant or substitution reasoning, reflect a point or line across a simple axis/line using exact coordinates, and carry out an elementary rational-point construction when a known rational point and secant line are supplied.",
    principalObstacle:"A diagram can make tangency or intersection multiplicity look obvious; learners may also use a discriminant test without checking that the reduced equation faithfully represents the original geometry, or apply a reflection/rational-parameter formula without deriving its assumptions.",
    entryPrerequisites:["025 / G2.1 equation-first line/circle modelling","003-004 / F2 exact solution-set and boundary discipline","001-002 / F1 root/domain preservation"],
    requiredOwnership:[
      "Test line-circle or circle-circle tangency through an exact distance, discriminant or equivalent algebraic condition and state what equality means geometrically.",
      "Solve intersection systems without silently discarding repeated or degenerate solutions and distinguish zero, one and two real intersection points where appropriate.",
      "Reflect points across coordinate axes or elementary lines by deriving the coordinate transformation from midpoint/perpendicular conditions rather than memorising an unchecked formula.",
      "When a rational-point construction is supplied, parameterise a secant through a known rational point and justify why the second intersection remains rational under the stated coefficients.",
      "Separate algebraic multiplicity from distinct geometric points and revisit the original equations whenever elimination introduces an exceptional case."
    ],
    applicationScope:"Entrance-level line/circle tangency, intersection, reflection and elementary rational-point constructions reducible to exact coordinate algebra.",
    transferScope:"A fresh coordinate configuration where a visual shortcut predicts the wrong number of intersections or misses a degenerate case, requiring the learner to derive the exact algebraic condition and interpret it geometrically.",
    inScope:["Line-circle and circle-circle intersection tests","Tangency conditions","Simple coordinate reflections","Repeated versus distinct intersections","Elementary rational-point/secant construction when scaffolded"],
    outOfScope:["General conic sections","Projective geometry","Advanced Diophantine geometry","Calculus-based curvature or optimisation"],
    exitCondition:"Resolve one unfamiliar line/circle geometry problem by deriving the relevant algebraic condition, classify every real intersection/tangency case including degeneracies, and justify any reflection or rational-point step from the equations rather than the sketch.",
    nextArcBoundary:"027 · P1.1 leaves coordinate geometry and starts counting by defining ordered elementary outcomes, replacement rules and equiprobability before any factorial formula is allowed.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC809-A1027",routeOrder:27,syllabusCode:"P1.1",targetCode:"P1",parentId:"ARC809",
    title:"Specify ordered elementary outcomes and whether they are equiprobable.",
    focus:"Building the correct finite experiment before counting it: order, replacement, distinguishability and probability weights are part of the model, not details to patch in afterward.",
    purpose:"Prevent the most common probability-counting error—using favourable-over-total on a sample space that was never shown to be equally likely.",
    centralCapability:"Given a finite sampling or arrangement story, define the elementary outcomes at a level that makes order and replacement explicit, determine whether those outcomes are equiprobable under the stated mechanism, and identify what information is lost if outcomes are prematurely collapsed into unordered summaries.",
    principalObstacle:"Learners often choose an unordered sample space because the event of interest is unordered, then divide by its size as though every summary had equal probability; replacement and repeated labels can also change outcome weights even when the visible objects look symmetric.",
    entryPrerequisites:["009-011 / F5 sets, Cartesian products and stated mappings","003-004 / F2 exact-case discipline","Elementary product-rule intuition"],
    requiredOwnership:[
      "State what one elementary outcome records and whether order is included before beginning any count.",
      "Identify whether draws are with or without replacement and whether sampled objects are distinguishable under the experiment.",
      "Use Cartesian-product or sequential-choice reasoning to enumerate or count ordered outcomes when appropriate.",
      "Justify equiprobability from the mechanism rather than from visual symmetry alone, and explicitly flag nonuniform elementary outcomes.",
      "Explain why collapsing several ordered outcomes into one unordered outcome can produce unequal weights unless every collapsed class has the same size."
    ],
    applicationScope:"Finite draws, selections, sequences, dice/cards/urn-style experiments and basic arrangements where the primary task is choosing a coherent elementary sample space.",
    transferScope:"A fresh experiment in which two plausible sample spaces have different granularity, requiring the learner to decide which one supports valid probability arithmetic and whether its elementary outcomes are equally likely.",
    inScope:["Ordered sample spaces","Replacement versus no replacement","Distinguishable versus collapsed outcomes","Sequential product-rule structure","Equiprobability checks"],
    outOfScope:["Restricted-arrangement techniques reserved for P2","Conditional probability reserved for P4","Infinite sample spaces","Measure-theoretic probability"],
    exitCondition:"For one unfamiliar finite experiment, specify the elementary ordered outcomes, replacement/distinguishability assumptions and their probability weights, and defend whether favourable-over-total counting is legal without relying on unstated symmetry.",
    nextArcBoundary:"028 · P1.2 keeps the same experiment model but now derives permutation/combination counts and the conversion between ordered and unordered selections.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC809-A1028",routeOrder:28,syllabusCode:"P1.2",targetCode:"P1",parentId:"ARC809",
    title:"Derive the correct permutation/combination count for that model.",
    focus:"Deriving factorial, permutation and combination counts from sequential choices and equivalence classes of orderings rather than quoting formulas by surface resemblance.",
    purpose:"Make ordered-versus-unordered conversion explicit so later probability and restriction counts have a reliable combinatorial base.",
    centralCapability:"Given a finite selection model, count ordered constructions by sequential choices, identify how many ordered constructions correspond to each unordered selection, derive the appropriate permutation or combination expression, and state the conditions under which the division by an order-factor is valid.",
    principalObstacle:"A factorial expression can look plausible even when some choices are repeated, indistinguishable or structurally constrained; dividing by k! is valid only when each unordered object is represented by exactly k! distinct orderings under the model.",
    entryPrerequisites:["027 / P1.1 elementary-outcome and equiprobability modelling","005 / F3 changed-input/parameter bookkeeping","009 / F5 Cartesian-product counting viewpoint"],
    requiredOwnership:[
      "Derive n(n-1)… style ordered counts directly from the number of legal choices at each stage.",
      "Recognise n! as the ordered arrangement count of n distinct objects and adapt the product when only k positions are filled.",
      "Explain combinations as quotienting ordered selections by the constant number of internal orderings when that constant-class-size condition holds.",
      "Switch between ordered and unordered versions of the same selection and identify the exact multiplicative conversion factor.",
      "Reject a permutation/combination formula when repeated or indistinguishable items make the naive k! correction invalid."
    ],
    applicationScope:"Selections and arrangements of distinct objects with or without order, including standard nPk and nCk derivations and direct ordered/unordered comparisons.",
    transferScope:"A fresh counting story worded without permutation/combination terminology, requiring the learner to derive the count from choices and justify whether an order-quotient is legitimate.",
    inScope:["Product-rule derivation","Permutations of distinct objects","k-permutations","Combinations as order-quotients","Ordered/unordered conversion factors"],
    outOfScope:["Repeated-object multinomial counts reserved for P2.2","Case/gap restriction methods reserved for P2.1","Generating functions","Asymptotic combinatorics"],
    exitCondition:"Count one unfamiliar selection twice—once with order and once without—and derive the exact conversion factor from the model, explaining why the quotient is uniform and rejecting any tempting factorial expression that overcounts.",
    nextArcBoundary:"029 · P2.1 adds restrictions: cases, gaps, complements or bijections must now be chosen deliberately instead of applying an unrestricted formula.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC809-A1029",routeOrder:29,syllabusCode:"P2.1",targetCode:"P2",parentId:"ARC809",
    title:"Count one restricted arrangement using cases, gaps or a bijection.",
    focus:"Handling finite restrictions by restructuring the count into disjoint cases, complementary counts, gap placements or a bijection whose legality and non-overlap are explicit.",
    purpose:"Build the core entrance skill of choosing a counting architecture that enforces constraints cleanly rather than subtracting or multiplying ad hoc corrections.",
    centralCapability:"Given a constrained finite arrangement or selection, choose a valid case split, complement, gap method or bijection, prove that the construction covers every admissible object exactly once, and obtain the exact count without hidden overlap.",
    principalObstacle:"Cases that are not disjoint double-count; gap methods are often applied before fixing the objects that create the gaps; complement counting can be harder than the direct count if the forbidden set is not simpler, and a claimed bijection may fail to be reversible.",
    entryPrerequisites:["027-028 / P1 experiment modelling and ordered/unordered counts","014-015 / A2 finite-sum/indexing discipline","007-008 / F4 exhaustive/disjoint-case proof logic"],
    requiredOwnership:[
      "State the restriction precisely and identify whether a direct, complementary, case-based, gap or bijective count simplifies it.",
      "For case splits, prove the cases are mutually exclusive and exhaustive before summing their counts.",
      "For gap methods, first arrange the anchor objects, count available gaps correctly, and then place restricted objects without creating forbidden adjacency.",
      "For complements, define the universe and forbidden subset on the same outcome model and verify that subtraction removes exactly the undesired objects.",
      "For bijections, describe both forward and inverse constructions so equality of counts is proved rather than suggested."
    ],
    applicationScope:"Finite arrangement/selection restrictions such as adjacency, separation, inclusion/exclusion of designated objects, position conditions and simple constrained functions/pairings.",
    transferScope:"A fresh restricted-count problem where the obvious factorial-minus-something approach overlaps, requiring the learner to redesign the objects via cases, gaps, complement or a reversible encoding.",
    inScope:["Disjoint cases","Complement counting","Gap methods","Elementary bijections","Restriction-aware finite arrangements"],
    outOfScope:["General inclusion-exclusion beyond elementary event arithmetic","Generating functions","Recurrence-based combinatorics","Advanced graph enumeration"],
    exitCondition:"Solve one unfamiliar restricted arrangement exactly using a chosen case/gap/complement/bijection method, and prove in words why every admissible object is counted once and only once.",
    nextArcBoundary:"030 · P2.2 keeps restricted counting but shifts to symmetry, parity and binomial/multinomial coefficient structure, where overcounting corrections and coefficient interpretations are central.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC809-A1030",routeOrder:30,syllabusCode:"P2.2",targetCode:"P2",parentId:"ARC809",
    title:"Handle one symmetry/overcounting, parity or binomial/multinomial-coefficient problem.",
    focus:"Correcting nontrivial overcounting and interpreting binomial/multinomial coefficients as assignment counts, including parity/symmetry arguments that avoid double counting.",
    purpose:"Complete the elementary counting block with the coefficient structures that recur throughout discrete probability and with explicit tests for when symmetry division is legal.",
    centralCapability:"Given a finite count with symmetric representations, repeated categories, parity constraints or a coefficient request, derive the relevant binomial or multinomial coefficient from assignments to positions/factors, correct overcounting by actual orbit/class size when uniform, and diagnose when naive division by a symmetry factor fails.",
    principalObstacle:"Learners often divide by 2, k! or another symmetry factor merely because objects look symmetric, without checking that every counted object has the same number of representations; repeated-category counts also invite double counting when category labels or positions are conflated.",
    entryPrerequisites:["029 / P2.1 restriction-aware counting","028 / P1.2 ordered/unordered quotient logic","014-015 / A2 finite sums and geometric/binomial-style algebra"],
    requiredOwnership:[
      "Derive binomial coefficients as choices of factor/position assignments and multinomial coefficients as sequential category assignments with prescribed category sizes.",
      "Translate a coefficient in (x+y)^n or a simple multinomial expansion into an explicit counting statement instead of reading it as a memorised symbol.",
      "Apply parity or symmetry to pair/count objects only after identifying the involution or representation classes involved.",
      "Correct overcounting by the number of equivalent representations only when that number is constant across all final objects, and isolate exceptional symmetric objects when it is not.",
      "Explain why an attractive factorial count overcounts a constrained function, pairing or repeated-category arrangement and replace it with a justified count."
    ],
    applicationScope:"Binomial/multinomial coefficients, repeated-category assignments, simple parity counts, pairings/functions with elementary symmetry, and explicit overcounting diagnostics.",
    transferScope:"A fresh count where symmetry suggests a simple division but stabilisers/repeated labels create unequal representation multiplicities, requiring the learner to inspect class sizes or reformulate the count.",
    inScope:["Binomial coefficients by counting","Multinomial coefficients by assignments","Parity pairings/involutions","Uniform symmetry corrections","Overcounting diagnosis"],
    outOfScope:["Burnside/Polya theory","General group actions","Generating functions","Asymptotic coefficient estimates"],
    exitCondition:"Solve one unfamiliar symmetry/parity or binomial/multinomial counting problem, derive the coefficient or correction from the underlying assignments, and explicitly justify why each final object has the claimed number of representations—or handle the exceptional classes separately.",
    nextArcBoundary:"031 · P3.1 leaves pure counting and starts probability arithmetic on possibly nonuniform spaces: complements, inclusion-exclusion and union bounds become the bounded capability.",
    mode:"learn",evidencePolicy:"standard"
  }
];
