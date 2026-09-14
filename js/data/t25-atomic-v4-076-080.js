// Hand-authored T25 M.Stat v4 session cards 076-080.
// These contracts implement audited syllabus steps C7.2 through G4.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_076_080 = [
  {
    id:"T25-ARC813-A1076",routeOrder:76,syllabusCode:"C7.2",targetCode:"C7",parentId:"ARC813",
    title:"Convert a positive product into a logarithmic sum and control a singular endpoint if present.",
    focus:"Turning a positive product or geometric mean into a logarithmic sum, identifying the associated Riemann-sum structure, and supplying an explicit endpoint estimate when the logarithmic integrand is unbounded.",
    purpose:"Complete the sum/product limit toolkit without hiding singular endpoints behind formal continuity arguments: positivity justifies logarithms, while endpoint control justifies the passage from a discrete sum to an improper integral.",
    centralCapability:"Given a positive product whose exponent or geometric-mean scaling suggests a limit, take logarithms, rewrite the expression as a normalised sum, identify the limiting integral, control any singular endpoint separately, and exponentiate only after the logarithmic limit is established.",
    principalObstacle:"The learner may take logs without checking positivity, apply an ordinary compact-interval Riemann-sum theorem to an unbounded logarithmic integrand, ignore a small block of endpoint terms, or exponentiate before proving that the logarithmic sequence converges.",
    entryPrerequisites:["075 / C7.1 ordinary Riemann-sum recognition","074 / C6.2 improper endpoint convergence","014-015 / A2 products, sums and indexing"],
    requiredOwnership:[
      "Check positivity of every factor before replacing a product by the sum of its logarithms.",
      "Rewrite log of the product or geometric mean as a correctly scaled finite sum and identify the corresponding sample-point map.",
      "Distinguish a continuous bounded integrand from a logarithmic or other integrable singularity at an endpoint.",
      "Isolate a small endpoint portion and bound its contribution directly, or compare it with an appropriate improper integral, instead of invoking continuity where none exists.",
      "After the logarithmic limit is proved, use continuity of the exponential map to recover the original positive product limit."
    ],
    applicationScope:"Positive finite products and geometric means whose logarithms become ordinary or improper Riemann sums involving elementary continuous or logarithmically singular integrands.",
    transferScope:"A fresh product with one factor family approaching zero near an endpoint, requiring the learner to split off the singular edge, prove that its scaled logarithmic contribution is controlled, and only then recover the product limit.",
    inScope:["Logarithms of positive products","Geometric-mean limits","Riemann sums after logarithms","Integrable endpoint singularities","Exponentiation after limit control"],
    outOfScope:["Euler-Maclaurin expansions","Infinite products as a general theory","Complex logarithms","Tauberian or advanced asymptotic methods"],
    exitCondition:"Solve one unfamiliar positive-product limit by proving positivity, converting it to a logarithmic sum, identifying the limiting integral, supplying any required singular-endpoint estimate, and exponentiating only after the logarithmic limit is justified.",
    nextArcBoundary:"077 · G3.1 closes the calculus block and returns to coordinate geometry by classifying completed-square quadratic equations, including degenerate conic cases.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC808-A1077",routeOrder:77,syllabusCode:"G3.1",targetCode:"G3",parentId:"ARC808",
    title:"Classify a completed-square quadratic, including degeneracy.",
    focus:"Classifying plane quadratic equations after completing squares, with explicit attention to whether the resulting locus is a genuine conic, empty set, point or pair of lines.",
    purpose:"Make conic classification algebraically reliable: standard-looking coefficients do not guarantee a nondegenerate ellipse, parabola or hyperbola until signs, constants and zero cases have been audited.",
    centralCapability:"Given an axis-aligned or reducible quadratic equation in x and y, complete squares, rewrite it in standard form when possible, and classify the exact locus including nondegenerate and degenerate cases.",
    principalObstacle:"The learner may divide by a zero or wrong-signed constant, label every sum of squares an ellipse, overlook empty or point loci, or miss factorisation into a pair of lines after rearrangement.",
    entryPrerequisites:["025-026 / G2 coordinate equations and intersections","001-003 / F1-F2 domain-safe algebra and solution sets","012-013 / A1 polynomial factorisation"],
    requiredOwnership:[
      "Complete squares in x and y without changing the represented locus and isolate the constant term cleanly.",
      "Classify standard nondegenerate ellipse, hyperbola and parabola forms from their sign and coefficient structure.",
      "Recognise when the completed-square equation has no real points or collapses to a single point.",
      "Recognise and verify pair-of-lines or repeated-line degeneracies by factorisation or direct algebra.",
      "State the actual real locus rather than assigning a conic name from coefficients alone."
    ],
    applicationScope:"Second-degree coordinate equations with no xy term or with an immediately factorable structure, including translated standard forms and elementary degenerate cases.",
    transferScope:"An unfamiliar quadratic whose completed-square constant changes sign with a parameter, forcing case-by-case classification into genuine conic, point, empty locus or pair of lines.",
    inScope:["Completing squares","Standard conic forms","Empty and point degeneracies","Pair-of-lines degeneracy","Parameter-sensitive classification"],
    outOfScope:["General rotation of axes for arbitrary xy terms","Projective classification","Matrix-pencil theory","Three-dimensional quadrics"],
    exitCondition:"Classify one unfamiliar completed-square quadratic completely, including every parameter or sign case that changes the real locus, and justify any degenerate classification by direct algebra rather than by naming convention.",
    nextArcBoundary:"078 · G3.2 keeps the standard forms but recovers focus, directrix and eccentricity from the geometric definitions of the conics.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC808-A1078",routeOrder:78,syllabusCode:"G3.2",targetCode:"G3",parentId:"ARC808",
    title:"Recover focus/directrix/eccentricity for one standard conic.",
    focus:"Connecting standard parabola, ellipse and hyperbola equations to their focus-directrix definitions, focal distances and eccentricity rather than treating standard forms as disconnected formula tables.",
    purpose:"Give entrance-level conic formulas a geometric source, so shifted or sign-changed standard forms can be reconstructed reliably instead of memorised in many orientations.",
    centralCapability:"Given a nondegenerate standard or translated conic, identify its principal axis, recover focal parameters, locate focus/foci and directrix/directrices, and state the eccentricity with the correct regime for parabola, ellipse or hyperbola.",
    principalObstacle:"The learner may confuse a, b and c relations across ellipse and hyperbola, attach the focus/directrix to the wrong axis, forget translation, or use eccentricity formulas without checking which conic family is present.",
    entryPrerequisites:["077 / G3.1 conic classification and standard forms","025-026 / G2 distance and coordinate equations","021-022 / G1 elementary trigonometric and geometric identities when needed"],
    requiredOwnership:[
      "For a standard parabola, read the focal parameter from the coefficient and locate the focus and directrix in the correct orientation.",
      "For an ellipse, use c^2=a^2-b^2 with a as the semimajor axis and identify e=c/a with 0<e<1.",
      "For a hyperbola, use c^2=a^2+b^2 along the transverse axis and identify e=c/a>1.",
      "Carry translations of the centre or vertex into every focus and directrix coordinate without changing relative offsets.",
      "Check the recovered data against the defining distance-ratio relation for at least one representative point or algebraic derivation."
    ],
    applicationScope:"Nondegenerate axis-aligned parabolas, ellipses and hyperbolas in standard or translated form where focus/directrix/eccentricity data can be recovered exactly.",
    transferScope:"A fresh shifted conic presented in a less familiar orientation, requiring the learner to identify the principal axis first and reconstruct focal geometry from the standard-form parameters rather than recall a rotated list of formulas.",
    inScope:["Parabola focus/directrix","Ellipse foci and eccentricity","Hyperbola foci and eccentricity","Translated standard forms","Distance-ratio interpretation"],
    outOfScope:["Rotated general conics","Dandelin spheres","Projective geometry","Advanced optical properties of conics"],
    exitCondition:"For one unfamiliar nondegenerate standard or translated conic, recover the correct focal parameter(s), focus/foci, directrix/directrices and eccentricity, and verify consistency with the defining geometric relation.",
    nextArcBoundary:"079 · G4.1 moves from static conic data to parametrisation, requiring a parameter value to generate a point on the conic with its domain and exceptional values visible.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC808-A1079",routeOrder:79,syllabusCode:"G4.1",targetCode:"G4",parentId:"ARC808",
    title:"Use one conic parametrisation to locate a point.",
    focus:"Using a suitable standard parametrisation for a parabola, ellipse or hyperbola to generate and identify points while tracking the parameter domain and any values omitted by the chosen representation.",
    purpose:"Prepare tangent and normal problems with a coordinate representation that preserves the conic automatically, while avoiding the false idea that every convenient parametrisation covers every point in exactly one way.",
    centralCapability:"Given a standard conic and a supplied or familiar elementary parametrisation, verify that the parametrised coordinates lie on the conic, recover the point corresponding to a parameter value, and note any duplicated or exceptional coverage relevant to later tangent work.",
    principalObstacle:"The learner may use the wrong conic parametrisation, forget a scale factor, assume the parameter is literally a geometric angle in every conic, or ignore points where a rational parametrisation becomes undefined or fails to cover a special point.",
    entryPrerequisites:["077-078 / G3 standard conics and focal geometry","005-006 / F3 functions and parameter-aware inputs","021-022 / G1 trigonometric identities for ellipse parametrisation"],
    requiredOwnership:[
      "Verify a parametrisation by direct substitution into the conic equation rather than trusting its appearance.",
      "Use a standard parabola parametrisation such as (at^2,2at) or its orientation-equivalent form with the correct scale.",
      "Use trigonometric parametrisation for an ellipse and distinguish the parameter from the polar angle unless they coincide in the special case.",
      "Use a valid hyperbola parametrisation supplied by the problem or standard context, checking its real-domain restrictions.",
      "Identify any omitted, duplicated or undefined parameter values before using the parametrisation as if it were globally one-to-one."
    ],
    applicationScope:"Standard axis-aligned conics with elementary polynomial, trigonometric or supplied rational parametrisations used to produce exact points and simplify later tangent calculations.",
    transferScope:"A fresh parametrised curve claimed to be a conic, requiring the learner to verify the identity algebraically, determine which conic it traces and diagnose an exceptional parameter value or missing point.",
    inScope:["Standard conic parametrisations","Parameter-to-point conversion","Direct verification by substitution","Parameter-domain restrictions","Exceptional or duplicated coverage"],
    outOfScope:["General rational parametrisation theory","Arc length","Curvature","Projective parametrisations"],
    exitCondition:"Given one unfamiliar conic parametrisation, verify it against the conic equation, locate the requested parameter point exactly and state any domain or coverage exception that matters for subsequent geometry.",
    nextArcBoundary:"080 · G4.2 differentiates or uses algebraic contact at a parametrised conic point to derive its tangent or normal, including vertical-slope exceptions.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC808-A1080",routeOrder:80,syllabusCode:"G4.2",targetCode:"G4",parentId:"ARC808",
    title:"Derive its tangent/normal and handle a vertical-slope exception.",
    focus:"Deriving tangent and normal equations at a conic point from a parametrisation, implicit differentiation or algebraic contact, while treating vertical tangents and undefined reciprocal slopes as genuine geometric cases.",
    purpose:"Close the conic block with a method-first approach to tangency: slope formulas are consequences of differentiation or contact, and exceptional directions must be represented by equations rather than forced into finite-slope form.",
    centralCapability:"Given a standard conic point in coordinates or parameter form, derive the tangent and when requested the normal by a justified differential or contact argument, and replace slope-intercept formulas by vertical/horizontal line equations when the derivative is zero or undefined.",
    principalObstacle:"The learner may memorise a tangent formula without verifying the point, take a negative reciprocal when the tangent slope is zero or infinite, divide by a derivative that vanishes, or lose the parameter-to-coordinate relation during differentiation.",
    entryPrerequisites:["079 / G4.1 conic parametrisation","067-068 / C3 legal differentiation and chain rules","077-078 / G3 conic equations and standard geometry"],
    requiredOwnership:[
      "Differentiate an implicit conic equation at a regular point and solve for dy/dx only when the required denominator is nonzero.",
      "Differentiate a parametrisation and use dy/dx=(dy/dt)/(dx/dt) when dx/dt is nonzero, keeping zero-denominator cases separate.",
      "Derive a tangent equation through the actual point and verify it satisfies the expected first-order contact condition.",
      "Construct the normal from perpendicular direction data, using a vertical or horizontal line equation instead of an invalid reciprocal-slope expression when necessary.",
      "Recognise a vertical tangent or other exceptional direction from the derivative/parametric data and state the line equation directly."
    ],
    applicationScope:"Tangents and normals to standard parabolas, ellipses and hyperbolas at regular parameter or coordinate points, including elementary vertical/horizontal exceptional cases.",
    transferScope:"A fresh conic point at which the usual finite-slope formula breaks, requiring the learner to return to implicit or parametric derivatives and express the tangent/normal geometrically without illegal division.",
    inScope:["Implicit differentiation of conics","Parametric tangent slopes","Tangent line equations","Normal directions","Vertical/horizontal slope exceptions"],
    outOfScope:["Curvature and osculating circles","Singular algebraic-curve tangent cones","Envelope theory","Three-dimensional tangent planes"],
    exitCondition:"For one unfamiliar conic point, derive the tangent and requested normal from first principles or legal differentiation, verify the point lies on the line(s), and handle any zero/undefined slope case with the correct vertical or horizontal equation.",
    nextArcBoundary:"081 · D0.1 begins Phase 4 probability distributions by checking CDF axioms and distinguishing a jump probability from a density value.",
    mode:"learn",evidencePolicy:"standard"
  }
];
