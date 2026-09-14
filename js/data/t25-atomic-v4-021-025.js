// Hand-authored T25 M.Stat v4 session cards 021-025.
// These contracts implement audited syllabus steps G1.1 through G2.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_021_025 = [
  {
    id:"T25-ARC805-A1021",routeOrder:21,syllabusCode:"G1.1",targetCode:"G1",parentId:"ARC805",
    title:"Establish signs, radians, basic identities and sine/cosine rules.",
    focus:"Using the unit circle and triangle geometry to control radians, quadrant signs, basic trigonometric identities and the sine/cosine rules without relying on memorised sign tables detached from geometry.",
    purpose:"Build the entrance-level trigonometric base needed for exact simplification and later periodic equations: angles, signs and identities must remain geometrically meaningful and domain-safe.",
    centralCapability:"Given an angle, unit-circle configuration or elementary triangle, convert degree/radian information when needed, determine trigonometric signs and exact relations from geometry, use core identities legally, and apply the sine or cosine rule to recover an unknown side or angle with ambiguity handled explicitly.",
    principalObstacle:"Learners often memorise quadrant signs and identities without tracking the actual angle, drop absolute values when square roots recover magnitudes, or use inverse trigonometric output as though it automatically gives every geometrically admissible triangle angle.",
    entryPrerequisites:["003-004 / F2 solution-set and sign-case discipline","001-002 / F1 principal-root and domain discipline","Elementary Euclidean triangle facts and coordinate-plane distance"],
    requiredOwnership:[
      "Interpret radians through arc length/unit-circle rotation and convert standard degree and radian measures correctly.",
      "Determine signs of sine, cosine and tangent from unit-circle coordinates or quadrant location rather than an unsupported mnemonic.",
      "Use sin²x+cos²x=1 and quotient/reciprocal identities only where denominators are legal, retaining absolute values when a principal square root requires them.",
      "Use angle-addition consequences at the elementary level to derive or verify exact trigonometric values instead of treating every identity as independent memorisation.",
      "Apply the sine and cosine rules to a stated triangle and check whether side/angle data admit zero, one or more geometrically valid configurations."
    ],
    applicationScope:"Standard-angle and elementary triangle problems involving radians, quadrant signs, exact trigonometric values, basic identities, and sine/cosine-rule calculations with explicit geometric constraints.",
    transferScope:"A fresh simplification or triangle problem where a tempting sign or inverse-trigonometric shortcut gives the wrong branch, requiring the learner to return to the unit circle or triangle constraints and justify the admissible result.",
    inScope:["Radians and standard-angle conversion","Unit-circle signs and exact values","Basic Pythagorean/quotient/reciprocal identities with domains","Elementary angle-addition consequences","Sine and cosine rules with ambiguity checks"],
    outOfScope:["Full periodic solution families reserved for G1.2","Complex exponential trigonometry reserved for A4","Calculus of trigonometric functions","General olympiad triangle geometry"],
    exitCondition:"On one unfamiliar root/trigonometric or triangle task, determine all required signs and branches from geometry, simplify with legal identities including any necessary absolute value, and obtain the requested side/angle relation with every admissible case justified without hints.",
    nextArcBoundary:"022 · G1.2 keeps the same trigonometric base but changes the capability to solving equations completely: periodic families, interval filtering and domain exclusions become mandatory.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC805-A1022",routeOrder:22,syllabusCode:"G1.2",targetCode:"G1",parentId:"ARC805",
    title:"Solve one periodic equation or triangle-identity task with domain checks.",
    focus:"Solving elementary trigonometric equations as complete solution-set problems, with periodicity, transformed angles, legal divisions and interval restrictions handled explicitly.",
    purpose:"Turn trigonometric manipulation into entrance-ready equation solving: a principal inverse-trigonometric value is only a seed, not the full answer, and algebraic transformations must preserve the original domain.",
    centralCapability:"Given an elementary equation in sine, cosine or tangent, reduce it by valid identities or substitutions, generate the complete periodic solution family, remove values excluded by the original expression, and filter correctly to a specified interval; for an identity-style triangle task, verify the geometric/domain assumptions before concluding.",
    principalObstacle:"The learner may report only one calculator branch, forget the second sine/cosine family, divide by a trigonometric factor that can be zero, or simplify through an identity whose denominator excludes solutions of the original equation.",
    entryPrerequisites:["021 / G1.1 radians, signs and basic identities","003-004 / F2 equivalent versus implication-only equation steps","001-002 / F1 denominator and root-domain preservation"],
    requiredOwnership:[
      "State the natural domain of the original trigonometric equation before transformations that introduce or cancel denominators.",
      "Reduce standard equations to reference-angle information and generate all periodic branches rather than only a principal inverse value.",
      "Handle transformed arguments such as ax+b by solving the periodic family before isolating x, preserving the period scaling correctly.",
      "Avoid losing zero-factor solutions when dividing; split cases or factor the equation when necessary.",
      "Intersect the complete family with a requested interval and verify surviving candidates in the original equation when any non-equivalent step occurred."
    ],
    applicationScope:"Elementary periodic equations and triangle-identity tasks using standard identities, factoring, transformed angles and interval restrictions, without advanced trigonometric polynomials.",
    transferScope:"A fresh equation whose obvious division or inverse-function step loses a branch or admits an excluded point, requiring full periodic parameterisation and an original-domain check to recover the exact solution set.",
    inScope:["Complete sine/cosine/tangent solution families","Reference angles and periodicity","Transformed arguments","Factoring and zero-factor cases","Specified-interval filtering and original-domain verification"],
    outOfScope:["Complex-number solution methods","Fourier or harmonic analysis","Calculus-based root counting","General functional periodicity already owned by A5.3"],
    exitCondition:"Solve one unfamiliar elementary trigonometric equation completely, showing every periodic family, preserving zero-factor cases and domain exclusions, and return exactly the solutions in the stated interval or domain with no missing or extraneous branch.",
    nextArcBoundary:"023 · A4.1 leaves real trigonometric equations and uses G1's angle control to represent complex numbers in Cartesian and polar form, including modulus and argument branch conventions.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC806-A1023",routeOrder:23,syllabusCode:"A4.1",targetCode:"A4",parentId:"ARC806",
    title:"Translate between Cartesian and polar complex form.",
    focus:"Representing a complex number equivalently as x+iy and r(cos θ+i sin θ), with modulus, argument, quadrant and the special status of zero handled explicitly.",
    purpose:"Build the representation switch that makes multiplication, powers and roots geometrically transparent while preventing argument-branch mistakes from contaminating later roots-of-unity work.",
    centralCapability:"Given a nonzero complex number in Cartesian or polar form, compute its modulus and a valid argument from its quadrant, write the complete argument family when relevant, convert accurately between representations, and use conjugation/modulus relations without assigning an argument to zero.",
    principalObstacle:"Using arctan(y/x) blindly can place the argument in the wrong quadrant; learners also confuse one principal argument with all arguments, or write a polar angle for z=0 even though its argument is undefined.",
    entryPrerequisites:["021-022 / G1 unit-circle angle and sign control","012-013 / A1 elementary polynomial/root algebra","002 / F1.2 principal-root and domain discipline"],
    requiredOwnership:[
      "Compute |z|=sqrt(x²+y²) and use the signs of x and y to locate a nonzero complex number in the correct quadrant before choosing an argument.",
      "Distinguish a chosen principal argument from the full family θ+2πk and state the convention being used when a principal range is requested.",
      "Convert x+iy to r(cos θ+i sin θ) and back exactly for standard angles and reliably for symbolic coordinates.",
      "Use conjugation to reflect the imaginary part and verify elementary identities such as z conjugate(z)=|z|² without conflating conjugate with reciprocal.",
      "Treat z=0 separately: its modulus is zero but no argument is defined, so polar-angle manipulations requiring r>0 cannot be applied to it."
    ],
    applicationScope:"Elementary complex arithmetic and representation problems involving modulus, argument, conjugation, products/quotients and standard polar angles.",
    transferScope:"A fresh complex number placed in a non-obvious quadrant or supplied through a conjugate/product relation, requiring the learner to reconstruct the correct modulus-angle data and reject an invalid branch or zero-case argument.",
    inScope:["Cartesian complex form","Modulus and conjugate","Polar/trigonometric form","Argument families and quadrant choice","The z=0 exception"],
    outOfScope:["Complex roots and De Moivre branch enumeration reserved for A4.2","Complex analysis","Euler-series derivations","General locus classification beyond elementary representation"],
    exitCondition:"Convert one unfamiliar nonzero complex expression between Cartesian and polar form, justify its quadrant and argument family, use conjugate/modulus structure correctly, and separately explain what fails if the same polar-angle step is attempted at z=0.",
    nextArcBoundary:"024 · A4.2 uses this polar representation to solve powers, roots of unity and conjugate-locus equations with every root branch accounted for.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC806-A1024",routeOrder:24,syllabusCode:"A4.2",targetCode:"A4",parentId:"ARC806",
    title:"Solve one root-of-unity or conjugate-locus question with every branch.",
    focus:"Using De Moivre and elementary Cartesian/conjugate reasoning to enumerate all complex roots or characterize a simple solution locus without dropping angular branches.",
    purpose:"Complete the entrance-level complex toolkit by making branch counting explicit: nth-root problems must produce exactly the distinct roots allowed, while conjugate equations may describe a continuum rather than a finite root list.",
    centralCapability:"Given z^n=w, a roots-of-unity condition, or an elementary equation involving z and its conjugate, choose polar or Cartesian reasoning appropriately, enumerate every distinct root branch when the solution is finite, handle w=0 separately, and recognise when the equation instead defines a geometric locus.",
    principalObstacle:"Taking only the principal nth root loses solutions; allowing arbitrary k without identifying repetition overcounts them. A second trap is treating conjugate equations like ordinary polynomials and expecting finitely many roots when they may constrain x and y to a line or circle.",
    entryPrerequisites:["023 / A4.1 Cartesian-polar conversion and argument families","012-013 / A1 polynomial roots and multiplicity discipline","021 / G1 angle periodicity and exact trigonometric values"],
    requiredOwnership:[
      "Apply De Moivre to powers and derive nth-root arguments (θ+2πk)/n rather than quoting one principal radical.",
      "List exactly n distinct nth roots for nonzero w by choosing a complete nonrepeating set of k values and explain why later k repeat.",
      "Handle z^n=0 separately and avoid polar division or argument claims at zero.",
      "Recognise roots of unity as equally spaced points on the unit circle and use their symmetry for elementary sums/products when directly requested.",
      "For equations involving conjugate(z), write z=x+iy when useful and determine whether the resulting real constraints define finitely many points or a locus."
    ],
    applicationScope:"Finite roots of powers, roots of unity, simple conjugate equations and elementary line/circle loci derivable directly from x+iy or modulus relations.",
    transferScope:"A fresh equation that superficially resembles a polynomial root problem but changes character because of conjugation or modulus, requiring the learner to choose the correct representation and classify the full solution set rather than guess its size.",
    inScope:["De Moivre powers","All nth-root branches","Roots of unity","Elementary conjugate equations","Finite solution sets versus simple loci"],
    outOfScope:["General complex polynomial theory","Residues or analytic functions","Advanced complex loci/conformal geometry","Coordinate-geometry line/circle construction reserved for G2"],
    exitCondition:"Solve one unfamiliar root-of-unity, nth-root or conjugate equation, produce every distinct finite branch when applicable, justify branch completeness and the zero exception, or state and derive the full elementary locus when the solution set is continuous.",
    nextArcBoundary:"025 · G2.1 leaves complex-plane root geometry and begins real coordinate geometry: lines, circles and distances are translated into equations before any tangency/reflection construction.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC807-A1025",routeOrder:25,syllabusCode:"G2.1",targetCode:"G2",parentId:"ARC807",
    title:"Turn a line/circle/distance problem into equations.",
    focus:"Translating coordinate-geometry language into algebraic constraints for lines, circles, centres, radii and distances, while retaining vertical-line and degenerate-circle cases.",
    purpose:"Build the modelling step that precedes tangency and intersection reasoning: entrance geometry becomes reliable only when diagram assumptions are replaced by equations derived from the stated data.",
    centralCapability:"Given coordinates and elementary geometric conditions, construct appropriate line and circle equations, use distance or perpendicularity constraints to encode the problem, complete the square to recover centre-radius data, and identify degenerate or exceptional cases before solving further.",
    principalObstacle:"Slope formulas can silently fail for vertical lines, a sketch can suggest incidences not stated in the problem, and completing the square can hide the distinction between a real circle, a point circle and an equation with no real points.",
    entryPrerequisites:["003-004 / F2 equations as exact solution sets","001-002 / F1 square/root domain discipline","Elementary Cartesian coordinates and Pythagorean distance"],
    requiredOwnership:[
      "Construct a line through stated points or satisfying a stated direction/perpendicular condition, using a form that remains valid when slope is undefined.",
      "Translate equal-distance, fixed-distance and centre/radius statements into squared-distance equations without introducing unnecessary square-root branches.",
      "Recognise x²+y²+Dx+Ey+F=0 as a circle candidate and complete the square correctly to recover its centre and squared radius.",
      "Classify the resulting radius-squared case as a genuine circle, a degenerate point or no real circle instead of assuming every quadratic-looking equation is nondegenerate.",
      "Use only incidences and geometric relations stated or algebraically derived; treat the diagram as illustrative rather than evidentiary."
    ],
    applicationScope:"Coordinate problems involving equations of lines and circles, centres, radii, distances, perpendicularity and elementary locus translation before tangency/intersection solving.",
    transferScope:"A fresh coordinate configuration with a vertical line, symbolic parameter or degenerate circle possibility, requiring an equation-first model that remains valid when the obvious slope/sketch shortcut breaks.",
    inScope:["Line equations including vertical lines","Distance and perpendicularity constraints","Circle equations","Completing the square","Real/point/empty degeneracy classification"],
    outOfScope:["Tangency, reflection and detailed intersection conditions reserved for G2.2","Conic sections beyond circles","Vector-space geometry","Calculus-based geometric optimisation"],
    exitCondition:"Translate one unfamiliar line/circle/distance configuration into a complete algebraic system, recover any centre/radius data by completing the square, and identify all vertical-line or degenerate cases without adding an assumption from the diagram.",
    nextArcBoundary:"026 · G2.2 keeps the coordinate model but moves to consequences: tangency, reflection, intersections or a rational-point construction must be decided from the equations built here.",
    mode:"learn",evidencePolicy:"standard"
  }
];
