// Hand-authored T25 M.Stat v4 session cards 085-088.
// These contracts implement audited syllabus steps D4.1 through D5.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_085_088 = [
  {
    id:"T25-ARC822-A1085",routeOrder:85,syllabusCode:"D4.1",targetCode:"D4",parentId:"ARC822",
    title:"Use gamma/beta integrals and determine moment-existence ranges.",
    focus:"Using gamma and beta normalisations as working integral tools, with parameterisation, support and moment-existence conditions kept explicit rather than treating named formulas as interchangeable templates.",
    purpose:"Make gamma/beta questions structurally transparent: first identify the kernel and parameter convention, then normalise or derive the required moment, and finally state the exact parameter range under which that moment actually exists.",
    centralCapability:"Given a gamma- or beta-type density or integral, recognise the appropriate normalising structure, convert correctly between rate and scale conventions, derive ordinary or inverse moments from the defining integral, and state the sharp existence condition before using the result.",
    principalObstacle:"The learner may confuse rate with scale, shift exponents incorrectly when matching gamma/beta integrals, quote a moment formula outside its convergence range, or assume inverse moments exist merely because positive moments do.",
    entryPrerequisites:["083-084 / D3 continuous named laws and moment discipline","073-074 / C6 finite and improper integrals","043-044 / J2 expectation, variance and dependent-sum structure"],
    requiredOwnership:[
      "State the gamma density under a declared shape-rate or shape-scale convention and translate between the two without changing the underlying law.",
      "Recognise the gamma integral integral_0^infinity x^{a-1}e^{-bx} dx through a legal rescaling and extract the normalising constant rather than memorising it blindly.",
      "Recognise the beta integral on (0,1), identify its parameter restrictions and use B(a,b)=Gamma(a)Gamma(b)/Gamma(a+b) when that identity is appropriate.",
      "Derive E[X^r] for a gamma-type law by shifting the power in the defining integral and state the exact condition on r and the shape parameter for convergence.",
      "Handle inverse moments explicitly, explaining why E[X^{-m}] imposes a lower-bound condition on the shape parameter instead of assuming finiteness."
    ],
    applicationScope:"Entrance-level gamma, beta and chi-square calculations involving normalisation, ordinary moments, inverse moments and simple parameter identification under clearly stated support and convention.",
    transferScope:"An unfamiliar density proportional to x^{a-1}e^{-bx} or x^{a-1}(1-x)^{b-1}, requiring the learner to reconstruct the normalisation and moment-existence range from the integral structure rather than match a catalogue entry mechanically.",
    inScope:["Gamma rate/scale conventions","Gamma and beta normalising integrals","Ordinary and inverse moments","Moment-existence inequalities","Gamma/chi-square structural connection"],
    outOfScope:["Asymptotic gamma approximations","Incomplete gamma/beta special functions beyond a supplied identity","Bayesian conjugacy","MGF uniqueness and sum identification reserved for D4.2"],
    exitCondition:"For one unfamiliar gamma/beta-style law, derive a required ordinary or inverse moment from the defining integral, state the exact parameter range for existence and verify that the normalising convention used is internally consistent.",
    nextArcBoundary:"086 · D4.2 uses MGFs and common-rate sum structure to identify distributions, but only after establishing an actual open interval around zero on which the MGF is finite.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC822-A1086",routeOrder:86,syllabusCode:"D4.2",targetCode:"D4",parentId:"ARC822",
    title:"Identify a law or sum by an MGF with a valid existence domain.",
    focus:"Using moment generating functions as local analytic fingerprints only where they are finite on an open interval containing zero, and combining independent MGFs without hiding the independence or common-parameter conditions.",
    purpose:"Prevent formal-MGF manipulation from outrunning its hypotheses: differentiation, products and uniqueness are powerful only when the transform genuinely exists in a neighbourhood of zero and the relevant random variables satisfy the stated independence assumptions.",
    centralCapability:"Given a distribution or independent sum with a usable MGF, state its domain, differentiate only where justified, form products under independence, recognise a common-rate gamma or standard discrete sum identity, and invoke uniqueness only when the neighbourhood-of-zero condition is satisfied.",
    principalObstacle:"The learner may write an MGF where none exists, multiply transforms without independence, combine gamma laws with different rates as though they were one gamma, or use equality at isolated t-values as if it established equality in distribution.",
    entryPrerequisites:["085 / D4.1 gamma/beta moments and parameter conventions","041-044 / D1-D2 standard discrete families","038-040 / J1-J2 expectation and covariance structure"],
    requiredOwnership:[
      "Define M_X(t)=E[e^{tX}] and identify an open interval containing zero on which the expectation is finite before applying derivative or uniqueness results.",
      "Differentiate a valid MGF at zero to recover required low-order moments, keeping existence conditions explicit.",
      "For independent variables, derive M_{X+Y}(t)=M_X(t)M_Y(t) and state precisely where independence enters.",
      "Recognise that independent gamma variables with a common rate add by adding shape parameters, and refuse that simplification when the rates differ unless another derivation is supplied.",
      "Use a valid MGF identity to recognise familiar Poisson/binomial/gamma-type sums, distinguishing transform equality on a neighbourhood from unsupported formal algebra."
    ],
    applicationScope:"Standard entrance distributions with elementary MGFs, especially independent sums of Poisson, binomial/Bernoulli or common-rate gamma variables and moment extraction from a valid transform.",
    transferScope:"A fresh transform-based identification problem containing a hidden domain or independence trap, requiring the learner to audit existence first and only then use product, differentiation or uniqueness reasoning.",
    inScope:["MGF existence near zero","Moment extraction from MGFs","Products under independence","MGF uniqueness at entrance level","Common-rate gamma and standard discrete sum identities"],
    outOfScope:["Characteristic functions as a general replacement","Complex-analytic transform inversion","Cumulant-generating-function asymptotics","MGFs for laws such as Cauchy that do not exist near zero"],
    exitCondition:"Identify one unfamiliar law or independent sum using an MGF only after stating a valid neighbourhood-of-zero domain, justify every product/uniqueness step and reject at least one tempting transform argument whose hypotheses fail.",
    nextArcBoundary:"087 · D5.1 leaves transform-space identification and derives the full law of a scalar transformation, including all inverse branches, supports and absolute derivative factors.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC823-A1087",routeOrder:87,syllabusCode:"D5.1",targetCode:"D5",parentId:"ARC823",
    title:"Transform a continuous variable with every branch and correct support.",
    focus:"Deriving continuous transformed laws from CDF events or branchwise change of variables while tracking transformed support, every inverse branch and the absolute derivative factor.",
    purpose:"Make nonlinear transformations reliable rather than formulaic: the support and preimage geometry come first, so monotone one-branch formulas are never applied blindly to square, absolute-value or other many-to-one maps.",
    centralCapability:"Given a continuous X and a scalar transform Y=g(X), determine the support of Y, derive F_Y from the event {g(X)<=y} or use a branchwise density formula, include every valid inverse branch and absolute Jacobian factor, and verify that the resulting law normalises.",
    principalObstacle:"The learner may substitute one inverse and forget another, omit the absolute derivative, carry the original support into the transformed variable unchanged, or use a density formula where the CDF-event route is simpler and safer.",
    entryPrerequisites:["081-084 / D0-D3 CDFs, densities and continuous laws","067-068 / C3 legal differentiation","006-007 / F3 changed-input and parameter-aware function reasoning"],
    requiredOwnership:[
      "Determine the image/support of Y before writing a transformed density, including endpoint effects from the support of X.",
      "For a one-to-one differentiable branch, derive f_Y(y)=f_X(g^{-1}(y))|d g^{-1}(y)/dy| under the stated regularity conditions.",
      "For many-to-one maps such as X^2 or |X|, sum contributions over every inverse branch that lies in the support of X.",
      "Use the CDF-event method when branch geometry, inequalities or monotonicity make direct density substitution error-prone.",
      "Check nonnegativity and unit integral of the final transformed density and reject formulas whose support or branch count makes normalisation fail."
    ],
    applicationScope:"Affine, square, absolute-value, exponential and other elementary scalar transforms of continuous variables where supports and inverse branches can be handled exactly.",
    transferScope:"A fresh nonlinear transform with asymmetric input support so that some inverse branches contribute only on part of the output range, forcing explicit support partitioning before density assembly.",
    inScope:["CDF method for scalar transforms","One-dimensional change of variables","Multiple inverse branches","Absolute derivative factors","Transformed-support bookkeeping"],
    outOfScope:["Two-variable Jacobians reserved for J5","Delta-method approximations","Normalising flows","Measure-theoretic pushforward theory"],
    exitCondition:"Derive the law of one unfamiliar continuous scalar transformation, showing the output support, every valid inverse branch and derivative factor, and verify the final density integrates to one.",
    nextArcBoundary:"088 · D5.2 handles discontinuous transforms such as rounding, floor/ceiling or censoring, where probability masses and atoms arise from events rather than continuous Jacobian formulas.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC823-A1088",routeOrder:88,syllabusCode:"D5.2",targetCode:"D5",parentId:"ARC823",
    title:"Derive a rounded, censored or mixed law from probability events.",
    focus:"Deriving laws induced by discontinuous or many-to-one operations such as floor, ceiling, rounding and censoring, with explicit probability events used to locate atoms and mixed components.",
    purpose:"Extend transformation reasoning beyond smooth Jacobian formulas: discontinuous maps collapse intervals to points and censoring can create boundary atoms, so event probabilities—not derivative heuristics—must drive the construction.",
    centralCapability:"Given a discrete-making or censoring transform of a known variable, translate each output value or interval into a preimage event for X, compute the associated masses or continuous pieces, record any atoms, and verify the complete transformed law sums/integrates to one.",
    principalObstacle:"The learner may apply a smooth density-change formula to a discontinuous map, overlook mass accumulated at a censoring threshold, mishandle half-open rounding intervals, or forget that the transformed law can be mixed even when the original law is continuous.",
    entryPrerequisites:["087 / D5.1 support and preimage discipline","081-082 / D0 atoms, CDF jumps and mixed laws","031-034 / P3-P4 event arithmetic and conditioning conventions"],
    requiredOwnership:[
      "For floor, ceiling or rounding, express P(Y=k) as the probability of the exact preimage interval under X with endpoint conventions stated.",
      "For censoring or clipping, identify the interval of X collapsed to a boundary value and compute the resulting atom explicitly.",
      "Construct the resulting CDF or pmf/density mixture and retain both discrete and continuous components when both are present.",
      "Distinguish a jump in the transformed CDF from a high but finite density value and use jump size as point mass.",
      "Check total probability across all atoms and continuous regions, including threshold endpoints and tail pieces."
    ],
    applicationScope:"Rounding, floor/ceiling, winsorisation-style clipping, one-sided censoring and simple transforms that turn a continuous input into a discrete or mixed output law.",
    transferScope:"A fresh thresholding or quantisation rule with asymmetric endpoint conventions, requiring the learner to reconstruct all preimage events and discover where atoms appear rather than assuming the output remains continuous.",
    inScope:["Floor/ceiling transformations","Rounding intervals","Censoring and clipping","Atoms created by many-to-one maps","Mixed transformed laws"],
    outOfScope:["Survival-analysis censoring models","Multivariate transformations","Numerical quantisation-error models","D6 heavy-tail exceptions and supplied-density analysis"],
    exitCondition:"Derive the complete law of one unfamiliar rounded or censored transformation from preimage events, identify every atom and continuous component, state endpoint conventions and verify total probability one.",
    nextArcBoundary:"089 · D6.1 begins distribution exceptions by checking Cauchy moment and MGF existence, carefully separating ordinary moments, absolute moments and principal-value symmetry.",
    mode:"learn",evidencePolicy:"standard"
  }
];
