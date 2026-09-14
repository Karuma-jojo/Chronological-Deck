// Hand-authored T25 M.Stat v4 session cards 089-092.
// These contracts implement audited syllabus steps D6.1 through J3.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_089_092 = [
  {
    id:"T25-ARC822-A1089",routeOrder:89,syllabusCode:"D6.1",targetCode:"D6",parentId:"ARC822",
    title:"Check Cauchy moment/MGF existence, separating absolute moments.",
    focus:"Diagnosing moment and MGF existence for the Cauchy law by testing the defining integrals rather than inferring values from symmetry or formal cancellation.",
    purpose:"Eliminate a high-risk probability error: a symmetric density does not guarantee a finite mean, and a principal-value cancellation is not the same object as an ordinary expectation.",
    centralCapability:"Given a Cauchy density or a closely related heavy-tailed law, determine whether requested ordinary moments, absolute moments and the MGF exist, justify each conclusion from tail integrability, and distinguish a Cauchy principal value from a genuine expectation.",
    principalObstacle:"The learner may say E[X]=0 because the density is symmetric, cancel divergent positive and negative contributions, or differentiate an MGF formula that does not exist on any neighbourhood of zero.",
    entryPrerequisites:["085-086 / D4 moment-existence and MGF-domain discipline","083-084 / D3 named continuous laws","073-074 / C6 proper and improper integral convergence"],
    requiredOwnership:[
      "Test existence of E[g(X)] through absolute integrability when ordinary expectation is claimed, rather than through formal symmetric cancellation.",
      "Show for the standard Cauchy law why the positive and negative first-moment contributions do not define a finite ordinary mean even though the density is symmetric.",
      "Distinguish an ordinary expectation from a Cauchy principal value and state that one cannot substitute for the other unless the problem explicitly asks for principal value.",
      "Determine the range of powers p for which E[|X|^p] is finite by analysing the tail order of |x|^p f(x).",
      "Reject the ordinary MGF for the Cauchy law because E[e^{tX}] fails to be finite on an open interval around t=0, instead of manipulating a nonexistent transform."
    ],
    applicationScope:"Standard or rescaled Cauchy-type heavy-tailed scalar laws and unfamiliar supplied densities whose moment existence can be decided by elementary tail comparison.",
    transferScope:"A fresh symmetric heavy-tailed density where the learner must decide whether a proposed mean, variance, absolute moment or MGF actually exists before using any symmetry or transform identity.",
    inScope:["Ordinary versus absolute moments","Tail-integrability tests","Cauchy principal value distinction","MGF existence near zero","Symmetry traps"],
    outOfScope:["Characteristic functions beyond brief recognition","Stable-law theory","Complex analysis of Cauchy transforms","Regular variation and advanced heavy-tail asymptotics"],
    exitCondition:"For one unfamiliar symmetric heavy-tailed law, correctly classify the existence of a requested ordinary moment, absolute moment and MGF, explicitly rejecting any argument that relies only on symmetry or cancellation of divergent tails.",
    nextArcBoundary:"090 · D6.2 turns from the Cauchy pathology to Laplace or another supplied density, where support, normalisation, tails and only the requested moments are derived from the given formula rather than from a memorised catalogue.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC822-A1090",routeOrder:90,syllabusCode:"D6.2",targetCode:"D6",parentId:"ARC822",
    title:"Analyse the needed part of a Laplace or unfamiliar supplied density.",
    focus:"Extracting only the needed probabilistic structure from a Laplace or unfamiliar supplied density: support, normalisation, tail probability and required moments or absolute-deviation features.",
    purpose:"Train exam-time distribution handling without catalogue bloat: a supplied density should be read from first principles, normalised and interrogated for exactly what the question asks.",
    centralCapability:"Given a Laplace density or an unfamiliar elementary density, determine its support and normalising constant, compute the requested tail/event probability, derive only the needed moments when they exist, and identify absolute-deviation structure when relevant.",
    principalObstacle:"The learner may pattern-match to a named family and import an incompatible parameterisation, integrate outside the true support, or compute unnecessary formulas before checking normalisation and existence.",
    entryPrerequisites:["089 / D6.1 moment-existence discipline","081-082 / D0 support, CDF and atoms","073-074 / C6 definite and improper integration"],
    requiredOwnership:[
      "Read the support directly from the supplied density and verify nonnegativity and unit total mass before treating it as a probability law.",
      "For a Laplace density, compute a one-sided or two-sided tail probability from the piecewise exponential structure with the correct location/scale convention.",
      "Recognise the role of |x-mu| in the Laplace density and connect it to absolute-deviation structure without overextending into inference theory.",
      "Compute a requested moment or transformed expectation only after checking that the corresponding integral is finite.",
      "For an unfamiliar supplied density, derive the required probability or moment directly instead of expanding a memorised list of named-distribution properties."
    ],
    applicationScope:"Laplace laws and elementary supplied one-dimensional densities with piecewise, compact-support or exponential/polynomial forms that can be normalised and integrated directly.",
    transferScope:"A fresh density with an unfamiliar constant or support where the learner must first establish the law, then compute only the requested probability or moment with correct existence checks.",
    inScope:["Laplace tail probabilities","Support and normalisation","Absolute-deviation structure","Requested moment calculations","Unfamiliar supplied densities"],
    outOfScope:["Maximum-likelihood estimation for Laplace parameters","Bayesian conjugacy","General exponential-family theory","Advanced robust-statistics asymptotics"],
    exitCondition:"Given one unfamiliar supplied density, establish its support and normalisation, compute a requested tail probability and one requested finite summary, and explain why no additional named-distribution machinery is needed.",
    nextArcBoundary:"091 · J3.1 leaves univariate laws and begins joint distributions, where the geometry of the full two-variable support becomes part of the probability model itself.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC824-A1091",routeOrder:91,syllabusCode:"J3.1",targetCode:"J3",parentId:"ARC824",
    title:"Recover joint/marginal laws from a finite table or planar support.",
    focus:"Recovering marginal laws from a joint table or planar density while treating support geometry, integration limits and normalisation as part of the law rather than decorative bookkeeping.",
    purpose:"Build the joint-law discipline needed for ISI problems: marginals come from summing/integrating the joint law over the legal support, and separately valid marginals do not determine the joint dependence structure.",
    centralCapability:"Given a finite joint probability table or a density on a simple planar region, identify and sketch the support, verify normalisation, derive both marginals with correct summation/integration limits, and check the results against the total mass.",
    principalObstacle:"The learner may integrate over a rectangle when the support is triangular, ignore zero-probability regions, infer the joint law from marginals alone, or produce a marginal that fails to normalise.",
    entryPrerequisites:["031-036 / P3-P6 event and conditioning foundations","083-088 / D3-D5 continuous laws and transformations","073-074 / C6 integration with interval splitting"],
    requiredOwnership:[
      "Represent a finite joint law as a table with nonnegative entries summing to one and obtain each marginal by summing across the complementary variable.",
      "For a planar density, state or sketch the support region before writing marginal integrals and derive variable-dependent limits from that geometry.",
      "Verify that the joint density integrates to one over its actual support and that each derived marginal integrates to one on its support.",
      "Explain why knowing both marginals does not in general determine the joint distribution or independence.",
      "Detect a proposed joint density or support description that is inconsistent with nonnegativity, normalisation or the stated region."
    ],
    applicationScope:"Finite joint tables and elementary two-dimensional densities on rectangles, triangles or similarly simple regions where marginals follow from one-dimensional summation or integration.",
    transferScope:"A fresh nonrectangular support whose marginal limits must be reconstructed from inequalities or a sketch rather than copied from a standard formula.",
    inScope:["Joint probability tables","Planar support geometry","Marginalisation","Normalisation checks","Nonrectangular integration limits"],
    outOfScope:["General multivariate measure theory","Copulas","High-dimensional densities","Jacobian transformations reserved for J5"],
    exitCondition:"From one unfamiliar joint table or planar support, derive both marginals using the exact legal support, verify all laws normalise, and state what dependence information remains unresolved from the marginals alone.",
    nextArcBoundary:"092 · J3.2 conditions the joint law on an observed value/event and then tests independence against the full support rather than by comparing only a few moments.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC824-A1092",routeOrder:92,syllabusCode:"J3.2",targetCode:"J3",parentId:"ARC824",
    title:"Compute a conditional law and check independence on the full support.",
    focus:"Computing conditional discrete or continuous laws only where the conditioning marginal is positive, and deciding independence from factorisation plus support compatibility across the entire joint law.",
    purpose:"Prevent two common errors: dividing by a zero marginal to create a conditional density, and declaring independence from covariance or a few matching probabilities instead of the complete joint structure.",
    centralCapability:"Given a joint table or planar density, compute a valid conditional law at an admissible conditioning value, normalise it, and determine independence by checking joint-versus-product factorisation together with the support required by independence.",
    principalObstacle:"The learner may condition at a zero-density/zero-mass marginal point, forget that a conditional density must itself normalise, or test independence locally while ignoring a support shape that makes product factorisation impossible.",
    entryPrerequisites:["091 / J3.1 joint support and marginals","033-034 / P4 conditioning and Bayes","037-040 / J1-J2 expectation/covariance foundations"],
    requiredOwnership:[
      "For a finite joint table, compute a conditional PMF by dividing the relevant joint masses by a positive conditioning marginal and verify the conditional masses sum to one.",
      "For a joint density, form f_{X|Y}(x|y)=f_{X,Y}(x,y)/f_Y(y) only for y with positive marginal density and state the resulting conditional support.",
      "Check independence by verifying f_{X,Y}=f_X f_Y or the discrete analogue on the full support, not merely at selected points.",
      "Use support geometry as an immediate diagnostic: non-product support can rule out independence even before detailed factorisation.",
      "Distinguish independence from zero covariance and from equality of a few conditional and marginal probabilities."
    ],
    applicationScope:"Finite tables and elementary absolutely continuous joint laws where marginals and conditionals are computable directly and independence can be tested exactly.",
    transferScope:"A fresh triangular or constrained support where a conditional density changes support with the conditioning variable and independence fails for structural rather than merely algebraic reasons.",
    inScope:["Conditional PMFs","Conditional densities","Positive marginal requirement","Full-law factorisation","Support-based independence checks"],
    outOfScope:["Regular conditional probability in measure-theoretic form","Conditional expectation depth reserved for J4","Jacobian transformations reserved for J5","Copula methods"],
    exitCondition:"For one unfamiliar joint law, compute a correctly normalised conditional distribution at a legal conditioning value and give a complete independence verdict using both factorisation and support, explicitly rejecting covariance-only reasoning.",
    nextArcBoundary:"093 · J4.1 begins total expectation by choosing useful conditioning information; J3 ends here with the joint, marginal, conditional and independence machinery established.",
    mode:"learn",evidencePolicy:"standard"
  }
];
