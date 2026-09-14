// Hand-authored T25 M.Stat v4 session cards 061-065.
// These contracts implement audited syllabus steps M5.1 through C2.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_061_065 = [
  {
    id:"T25-ARC906-A1061",routeOrder:61,syllabusCode:"M5.1",targetCode:"M5",parentId:"ARC906",
    title:"Relate a symmetric quadratic form to its spectrum.",
    focus:"Using orthogonal diagonalisation of a real symmetric matrix to convert a quadratic form into a weighted sum of squares and classify its sign structure from eigenvalues.",
    purpose:"Turn positive-definite and semidefinite questions into transparent spectral statements while preserving the special hypotheses that make the symmetric case fundamentally easier than a general matrix problem.",
    centralCapability:"Given a real symmetric matrix or quadratic form, use an orthogonal eigenbasis to rewrite x^T A x, classify definiteness or semidefiniteness from eigenvalue signs, and identify when A^T A is positive definite versus merely positive semidefinite.",
    principalObstacle:"The learner may apply the spectral theorem to a nonsymmetric matrix, confuse positive semidefinite with positive definite, or quote eigenvalue signs without connecting them to the quantifier over all nonzero vectors in the quadratic-form definition.",
    entryPrerequisites:["059-060 / M4 eigenspaces, diagonalisation and spectral calculations","051-058 / matrix arithmetic, rank and determinant structure","004 / F2 equation and inequality reasoning for sign claims"],
    requiredOwnership:[
      "State the orthogonal diagonalisation A=QDQ^T for a real symmetric matrix and keep the symmetry hypothesis explicit.",
      "Use y=Q^T x to derive x^T A x=sum lambda_i y_i^2 and explain why orthogonality preserves zero versus nonzero vectors.",
      "Classify positive definite, positive semidefinite, negative definite, negative semidefinite and indefinite forms from the spectrum with correct quantifiers.",
      "Prove x^T A^T A x=||Ax||^2 and use the null space to distinguish positive semidefiniteness from positive definiteness.",
      "Handle zero eigenvalues and repeated eigenvalues without confusing multiplicity with the existence of zero-value directions."
    ],
    applicationScope:"Small real symmetric matrices and quadratic forms where eigenvalues/eigenspaces can be found exactly or are supplied, including A^T A constructions and definiteness classification.",
    transferScope:"An unfamiliar symmetric matrix whose spectrum includes positive, negative or zero eigenvalues, requiring the learner to convert the quadratic form into spectral coordinates and justify the classification rather than rely on visual coefficient signs.",
    inScope:["Real symmetric spectral theorem","Quadratic forms","Positive/negative definiteness and semidefiniteness","A^T A as a squared-length form","Zero-eigenvalue directions"],
    outOfScope:["General nonsymmetric quadratic-form canonical theory","Sylvester criterion unless independently supplied","Singular-value decomposition","Convex optimisation and Hessian tests"],
    exitCondition:"For one unfamiliar real symmetric quadratic-form problem, derive the spectral sum-of-squares representation, classify the form with exact quantifiers, and justify when a related A^T A form is positive definite rather than merely semidefinite.",
    nextArcBoundary:"062 · M5.2 leaves sign classification and tests concrete projection, squared-length or supplied generalised-inverse identities directly.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC906-A1062",routeOrder:62,syllabusCode:"M5.2",targetCode:"M5",parentId:"ARC906",
    title:"Verify a projection, squared-length or generalised-inverse identity.",
    focus:"Checking orthogonal projection and related matrix identities by dimensions, algebraic properties and direct substitution instead of accepting a familiar-looking formula on sight.",
    purpose:"Build reliable matrix-identity discipline for entrance problems: a proposed projection or inverse-like expression should be verified from its defining consequences and rank assumptions, not from pattern matching.",
    centralCapability:"Given a small full-column-rank matrix or a supplied candidate identity, verify an orthogonal projection or squared-length statement, and when requested verify a proposed generalised-inverse identity directly under the stated hypotheses.",
    principalObstacle:"The learner may ignore dimension or rank conditions, assume every inverse written in a formula exists, or mistake idempotence alone for orthogonal projection without checking symmetry and the intended range.",
    entryPrerequisites:["061 / M5.1 symmetric spectral and A^T A structure","055-056 / rank, null-space and uniqueness reasoning","051-052 / matrix multiplication and transpose order"],
    requiredOwnership:[
      "Check dimensions and the existence of every displayed inverse before manipulating a proposed projection or inverse-like formula.",
      "For P=A(A^T A)^{-1}A^T under full column rank, verify symmetry and idempotence and identify its range as the column space of A.",
      "Show the residual x-Px is orthogonal to the projected column space by a direct transpose calculation.",
      "Recognise expressions such as x^T A^T A x as squared Euclidean lengths and use this to prove nonnegativity or uniqueness claims.",
      "When a generalised-inverse identity is supplied, verify exactly the requested multiplication identity directly rather than importing a full pseudoinverse theory."
    ],
    applicationScope:"Small exact matrices with stated full-rank assumptions, elementary orthogonal projection onto a column space, squared-length identities and narrowly specified inverse-like verification tasks.",
    transferScope:"A fresh candidate projection or generalised-inverse expression whose validity depends on a hidden rank or symmetry condition, requiring the learner to audit dimensions, hypotheses and defining identities before accepting it.",
    inScope:["Orthogonal projection matrices","Symmetry and idempotence checks","Column-space and residual orthogonality","Squared-length matrix identities","Direct verification of supplied generalised-inverse relations"],
    outOfScope:["SVD-derived pseudoinverse theory","Least-squares statistics beyond the projection identity","Gram-Schmidt algorithms","Numerical linear algebra and conditioning"],
    exitCondition:"Given one unfamiliar small-matrix identity problem, verify or reject the proposed projection/squared-length/generalised-inverse statement from dimensions, rank assumptions and defining algebra, with no appeal to an unproved memorised formula.",
    nextArcBoundary:"063 · C1.1 closes the linear-algebra block and begins calculus with one-sided and piecewise limits, where nearby behaviour must be separated from the function value itself.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC810-A1063",routeOrder:63,syllabusCode:"C1.1",targetCode:"C1",parentId:"ARC810",
    title:"Evaluate a one-sided or piecewise limit with a stated definition.",
    focus:"Evaluating elementary one-sided and piecewise limits by algebra, bounds and sequence-compatible reasoning while keeping the punctured-neighbourhood idea distinct from the actual value at the point.",
    purpose:"Make limit calculations logically safe before differentiation begins: a two-sided limit exists only when the relevant nearby behaviours agree, and an undefined or mismatched point value does not by itself determine that limit.",
    centralCapability:"Given an elementary rational, piecewise or sign-sensitive function, evaluate a one-sided or two-sided limit using an explicitly stated limit criterion, choosing algebraic simplification, rationalisation or bounding as appropriate.",
    principalObstacle:"The learner may substitute at the target point too early, ignore different left/right formulas, cancel factors without noting the punctured domain, or trust a graph/calculator instead of establishing the nearby behaviour analytically.",
    entryPrerequisites:["018-020 / A5 sequence, recurrence and function-behaviour discipline","006-007 / F3 changed inputs and parameter-aware functions","001-003 / domain-safe algebra and solution-set reasoning"],
    requiredOwnership:[
      "Distinguish f(a) from lim_{x->a} f(x) and explain why a removable hole can leave the limit unchanged.",
      "Evaluate left-hand and right-hand limits separately when the formula, sign or domain changes at the target point.",
      "Use exact algebraic cancellation or rationalisation only on a punctured neighbourhood where the transformation is valid.",
      "Use a simple squeeze/bound argument when direct algebra is insufficient but a standard bound is available.",
      "Declare that a two-sided limit exists only after the relevant one-sided limits are shown to exist and agree."
    ],
    applicationScope:"Elementary rational, radical, absolute-value and piecewise limits at finite points, including removable singularities and joins where one-sided analysis is decisive.",
    transferScope:"An unfamiliar piecewise or locally undefined expression requiring the learner to choose the correct side-specific representation, simplify it legally and decide whether the two-sided limit exists without relying on the displayed point value.",
    inScope:["Finite one-sided limits","Piecewise limits","Removable algebraic singularities","Rationalisation and elementary bounds","Two-sided existence from matching sides"],
    outOfScope:["Continuity proofs reserved for C1.2","Derivative limits reserved for C2","L'Hopital's rule","Taylor-series asymptotics"],
    exitCondition:"Evaluate one unfamiliar one-sided or piecewise finite limit, state the local definition or criterion being used, justify every algebraic/domain step, and decide correctly whether the corresponding two-sided limit exists.",
    nextArcBoundary:"064 · C1.2 promotes limit calculations into continuity claims and uses incompatible approaches or sequences to refute false limits.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC810-A1064",routeOrder:64,syllabusCode:"C1.2",targetCode:"C1",parentId:"ARC810",
    title:"Prove continuity or disprove a limit using two approaches.",
    focus:"Checking continuity at difficult points from the value and limiting behaviour, and disproving a claimed limit by producing two legitimate approaches with incompatible image behaviour.",
    purpose:"Give the learner a decisive proof/refutation tool for piecewise and oscillatory examples instead of relying on visual intuition or a single convenient path toward the point.",
    centralCapability:"Given a piecewise or elementary oscillatory function, prove continuity at a specified point when all conditions hold, or disprove an alleged limit by constructing two sequences or one-sided approaches that converge to the same input point but yield incompatible outputs.",
    principalObstacle:"The learner may verify only that the formula is defined, check only one approach, or confuse failure of continuity with failure of the limit when the limit exists but differs from the assigned point value.",
    entryPrerequisites:["063 / C1.1 one-sided and piecewise limits","018-019 / A5 convergent sequences and subsequences","007 / F4 claims, quantifiers and counterexamples"],
    requiredOwnership:[
      "Check continuity at a point by verifying the function is defined there, the limit exists, and the limit equals the function value.",
      "Use one-sided limits at piecewise joins and endpoints when the domain makes them the relevant tests.",
      "Apply the sequential criterion operationally: if x_n->a but f(x_n) fails to approach the claimed L, that claim is false.",
      "Construct two approaching sequences or side-specific paths that force incompatible output limits in an elementary oscillatory or rational/irrational example.",
      "Distinguish a removable discontinuity, a jump and genuine nonexistence of the limit at the level needed by the problem."
    ],
    applicationScope:"Piecewise joins, rational/irrational definitions, removable or jump discontinuities and elementary oscillatory examples where sequence or one-sided counterexamples are transparent.",
    transferScope:"A fresh continuity claim whose formula behaves differently on two dense or side-dependent classes, requiring the learner to invent two valid approaches and show why no single limit can serve both.",
    inScope:["Continuity at a point","Piecewise continuity checks","Sequential refutation of limits","Two-approach counterexamples","Elementary discontinuity classification"],
    outOfScope:["Uniform continuity","Topological continuity in abstract spaces","Epsilon-delta proofs beyond what the problem explicitly demands","Differentiability reserved for C2"],
    exitCondition:"For one unfamiliar difficult-point problem, either prove continuity with all required conditions or disprove the claimed limit by two explicit convergent approaches whose function values are incompatible, explaining exactly what conclusion fails.",
    nextArcBoundary:"065 · C2.1 turns a limit into a local sensitivity: the derivative is now built from the difference quotient rather than introduced as a rule table.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC811-A1065",routeOrder:65,syllabusCode:"C2.1",targetCode:"C2",parentId:"ARC811",
    title:"Derive a polynomial sensitivity from the difference quotient.",
    focus:"Deriving the derivative of an elementary polynomial expression directly from the difference quotient and interpreting it as the limiting slope of secants.",
    purpose:"Anchor differentiation in its defining limit before reusable rules are introduced, so later symbolic derivatives retain their domain and local-change meaning rather than becoming pattern matching.",
    centralCapability:"Given a polynomial such as x^n for positive integer n or a low-degree polynomial combination, form the difference quotient, simplify it legally, take the limit and identify the resulting local sensitivity without invoking the power rule as a premise.",
    principalObstacle:"The learner may substitute h=0 before cancelling the common factor, quote the power rule that is supposed to be derived, or manipulate (x+h)^n incorrectly and lose the limiting secant-slope interpretation.",
    entryPrerequisites:["063-064 / C1 finite limits and continuity reasoning","012-013 / A1 polynomial factors and algebraic identities","014-015 / A2 finite sums and elementary binomial structure"],
    requiredOwnership:[
      "Write f'(x)=lim_{h->0}[f(x+h)-f(x)]/h and interpret the quotient as a secant slope over a vanishing input change.",
      "Expand or factor f(x+h)-f(x) so the common factor h is exposed before taking the limit.",
      "Derive the positive-integer power rule for a representative monomial from the binomial expansion or factor identity rather than quoting it.",
      "Extend the same first-principles calculation to one small polynomial by linear algebraic simplification of the difference quotient.",
      "State the input domain on which the derived polynomial derivative is valid and keep the derivative value distinct from the original function value."
    ],
    applicationScope:"Positive-integer monomials and low-degree real polynomials where the difference quotient can be simplified exactly and the derivative limit is finite at every real input.",
    transferScope:"A fresh polynomial expression whose first-principles derivative requires choosing an efficient expansion or factorisation, cancelling only for nonzero h and taking the limit without appealing to prelearned differentiation rules.",
    inScope:["Difference quotient","Secant-to-tangent limiting slope","First-principles polynomial derivatives","Positive-integer power-rule derivation","Low-degree polynomial sensitivity"],
    outOfScope:["Product, quotient and chain rules reserved for C3","Piecewise differentiability reserved for C2.2","Higher derivatives","Taylor approximation and optimisation"],
    exitCondition:"Derive the derivative of one unfamiliar low-degree polynomial from the difference quotient alone, showing the legal cancellation and limiting step, and explain the resulting expression as local sensitivity rather than merely quoting a rule.",
    nextArcBoundary:"066 · C2.2 keeps the definition but tests differentiability at a join or oscillatory point, separating continuity from equality of one-sided derivative behaviour.",
    mode:"learn",evidencePolicy:"standard"
  }
];
