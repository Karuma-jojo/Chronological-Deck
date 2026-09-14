// Hand-authored T25 M.Stat v4 session cards 056-060.
// These contracts implement audited syllabus steps M2.2 through M4.2 only.

export const T25_ATOMIC_V4_056_060 = [
  {
    id:"T25-ARC815-A1056",routeOrder:56,syllabusCode:"M2.2",targetCode:"M2",parentId:"ARC815",
    title:"Prove a parameter-dependent uniqueness or rank-bound claim.",
    focus:"Classifying parameter values by rank, nullity and consistency, then proving uniqueness or a rank bound from exact row-reduction consequences rather than determinant guesswork.",
    purpose:"Turn the rank language from M2.1 into a proof tool for the parameter-sensitive cases that commonly appear in entrance problems.",
    centralCapability:"Given a small parameter-dependent linear system or matrix, identify the exceptional parameter values, classify solution behaviour, and justify uniqueness or a claimed rank bound through pivots, null space or rank inequalities.",
    principalObstacle:"The learner may divide by a parameter before separating its zero case, infer uniqueness from consistency alone, or treat a generic row reduction as valid at exceptional values where a pivot disappears.",
    entryPrerequisites:["055 / M2.1 rank-based consistency and solution dimension","053-054 / M1 span, independence, basis and dimension","003-004 / F2 parameter-safe equation solving"],
    requiredOwnership:[
      "Separate generic and exceptional parameter values before dividing by any parameter-dependent pivot.",
      "Use rank(A), rank([A|b]) and nullity to distinguish no solution, unique solution and infinitely many solutions.",
      "Justify uniqueness by showing the homogeneous null space is trivial rather than by verbal assertion.",
      "Prove a small rank bound using row/column dependence or elementary rank inequalities available from the setup.",
      "Check every claimed parameter case against the original matrix or system after reduction."
    ],
    applicationScope:"Small parameter-dependent systems and matrices where row reduction exposes changing pivot structure, consistency and null-space dimension.",
    transferScope:"An unfamiliar matrix family in which one parameter value changes rank or consistency, requiring the learner to isolate the exceptional case and prove the classification without hidden division assumptions.",
    inScope:["Parameter-dependent rank","Consistency by augmented rank","Null-space uniqueness","Exceptional pivot cases","Elementary rank bounds"],
    outOfScope:["Determinant shortcuts reserved for M3","Abstract rank factorisation","Jordan form","Numerical conditioning"],
    exitCondition:"For one unfamiliar parameter-dependent system or matrix, give the exact parameter partition, classify solution behaviour or rank in every case, and prove the uniqueness or rank claim without illegal division.",
    nextArcBoundary:"057 · M3.1 introduces determinant, inverse and trace structure; order-sensitive matrix identities now become the bounded capability.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC815-A1057",routeOrder:57,syllabusCode:"M3.1",targetCode:"M3",parentId:"ARC815",
    title:"Use determinant/inverse/trace identities with order preserved.",
    focus:"Using determinant, inverse and trace identities correctly while respecting matrix multiplication order and the hypotheses under which inverses exist.",
    purpose:"Prevent symbolic manipulation errors that look algebraically familiar but fail for matrices because multiplication is noncommutative or an inverse is not defined.",
    centralCapability:"Simplify or prove small matrix identities using determinant multiplicativity, transpose rules, inverse-of-product order, triangular structure and basic trace cyclicity, with all dimension and invertibility assumptions stated.",
    principalObstacle:"The learner may reverse factors incorrectly, cancel noncommuting matrices, use an inverse without proving invertibility, or overextend trace cyclicity into arbitrary reordering.",
    entryPrerequisites:["051-056 / M0-M2 matrix arithmetic, row reduction and rank","012-013 / A1 polynomial identities and factors","Matrix-product order discipline from M0"],
    requiredOwnership:[
      "Use det(AB)=det(A)det(B) and det(A^T)=det(A) with conformability understood.",
      "Use (AB)^{-1}=B^{-1}A^{-1} only when both inverses exist.",
      "Relate nonzero determinant, invertibility and full rank for square matrices.",
      "Exploit triangular determinant structure and determinant changes under elementary row operations.",
      "Use trace linearity and valid cyclic rearrangement without treating trace as fully commutative."
    ],
    applicationScope:"Small square matrices and short products where determinant, inverse, trace and rank relations allow a direct exact simplification or proof.",
    transferScope:"A fresh identity containing products, inverses and traces where several tempting scalar-style cancellations are illegal and the learner must preserve order throughout.",
    inScope:["Determinant product rules","Inverse-of-product order","Trace linearity/cyclicity","Invertibility criteria","Row-operation effects on determinant"],
    outOfScope:["Determinant recurrences reserved for M3.2","Spectral trace formulas beyond elementary consequences","Matrix calculus","Jordan canonical form"],
    exitCondition:"Resolve one unfamiliar determinant/inverse/trace identity problem, stating every required hypothesis and preserving factor order at every step, with no scalar-style cancellation errors.",
    nextArcBoundary:"058 · M3.2 moves from identities to structure: derive a determinant recurrence or singularity criterion without a giant cofactor expansion.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC815-A1058",routeOrder:58,syllabusCode:"M3.2",targetCode:"M3",parentId:"ARC815",
    title:"Derive a structured determinant recurrence or singularity criterion.",
    focus:"Exploiting sparse or patterned matrices to derive a short determinant recurrence and then using it to decide singularity or evaluate determinants efficiently.",
    purpose:"Replace brute-force expansion with structure recognition, especially for tridiagonal or recursively patterned matrices typical of entrance questions.",
    centralCapability:"Given a small structured determinant sequence, expand along a sparse row or column to derive the correct recurrence with base cases, and use that recurrence to evaluate or identify singular parameter values.",
    principalObstacle:"The learner may quote a recurrence without deriving its signs and coefficients, omit base cases, or expand in a way that destroys the visible structure and creates unnecessary algebra.",
    entryPrerequisites:["057 / M3.1 determinant rules and invertibility","014-015 / A2 finite sums and geometric progressions; supply the recurrence definition when needed","012-013 / A1 polynomial factor reasoning"],
    requiredOwnership:[
      "Choose an expansion that preserves the repeated matrix pattern after taking minors.",
      "Derive the recurrence including correct signs and parameter coefficients rather than guessing it from examples.",
      "State enough base cases to determine the recurrence uniquely.",
      "Use the recurrence to compute a requested determinant or factor a small determinant sequence.",
      "Translate determinant zero into a justified singularity conclusion for the square matrix."
    ],
    applicationScope:"Tridiagonal, banded or simple recursively patterned square matrices whose minors reproduce lower-order members of the same family.",
    transferScope:"An unfamiliar patterned determinant where the recurrence is not supplied, requiring the learner to discover the sparse expansion and validate it from first principles.",
    inScope:["Structured cofactor expansion","Determinant recurrences","Base cases","Singularity criteria","Parameter roots of determinants"],
    outOfScope:["General continuant theory","Asymptotic recurrence analysis","Toeplitz spectral theory","Large symbolic determinant software"],
    exitCondition:"For one unfamiliar structured matrix family, derive a valid determinant recurrence with base cases and use it to decide a requested determinant value or exact singularity condition independently.",
    nextArcBoundary:"059 · M4.1 begins spectral structure: eigenvalues, eigenspaces and the legality of diagonalisation become the next bounded capability.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC816-A1059",routeOrder:59,syllabusCode:"M4.1",targetCode:"M4",parentId:"ARC816",
    title:"Find eigenspaces and determine whether diagonalisation is legal.",
    focus:"Computing eigenvalues and eigenspaces exactly, comparing algebraic and geometric multiplicities, and deciding whether a proposed diagonalisation is actually justified.",
    purpose:"Make diagonalisation a proved structural conclusion rather than an automatic reaction to finding eigenvalues.",
    centralCapability:"For a small real or complex matrix, obtain the characteristic polynomial, find eigenvalues and eigenspace bases, compare multiplicities, and decide diagonalizability with a complete reason.",
    principalObstacle:"The learner may count repeated eigenvalues as automatically providing enough eigenvectors, confuse algebraic with geometric multiplicity, or ignore conjugate-root implications for real matrices.",
    entryPrerequisites:["057-058 / M3 determinant and invertibility structure","012-013 / A1 polynomial roots and multiplicity","023-024 / A4 complex roots and conjugation"],
    requiredOwnership:[
      "Form and solve the characteristic equation for a small matrix using exact algebra.",
      "Find each eigenspace by solving (A-lambda I)x=0 and give a basis.",
      "Distinguish algebraic multiplicity from eigenspace dimension for repeated eigenvalues.",
      "Decide diagonalizability by whether a full eigenvector basis exists.",
      "Use trace, determinant or conjugate-root checks as consistency checks rather than substitutes for eigenspace analysis."
    ],
    applicationScope:"Small matrices with explicitly factorable characteristic polynomials and manageable eigenspaces, including repeated and complex-conjugate eigenvalue cases.",
    transferScope:"A fresh matrix with a repeated eigenvalue where diagonalizability depends on eigenspace dimension rather than on the characteristic polynomial alone.",
    inScope:["Characteristic polynomial","Eigenvalues","Eigenspaces","Algebraic/geometric multiplicity","Diagonalizability tests"],
    outOfScope:["Jordan normal form","Spectral theorem reserved for M5","Numerical eigenvalue algorithms","Infinite-dimensional operators"],
    exitCondition:"For one unfamiliar small matrix, compute all eigenvalues and eigenspace dimensions and give a rigorous yes/no diagonalizability decision, including any repeated-eigenvalue obstruction.",
    nextArcBoundary:"060 · M4.2 uses the legal spectral structure or a supplied polynomial identity to compute matrix powers and construct roots.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC816-A1060",routeOrder:60,syllabusCode:"M4.2",targetCode:"M4",parentId:"ARC816",
    title:"Use a polynomial identity or diagonalisation to obtain powers/roots.",
    focus:"Reducing matrix powers through a justified polynomial identity or legal diagonalisation, and constructing matrix square roots only under stated spectral hypotheses.",
    purpose:"Convert spectral information into concrete computation while preventing illegal diagonalisation and careless claims about existence or number of matrix roots.",
    centralCapability:"Given a diagonalizable matrix or a supplied annihilating polynomial, compute a nontrivial matrix power efficiently and, when hypotheses permit, construct and verify a square root while distinguishing existence from uniqueness or exact root counts.",
    principalObstacle:"The learner may diagonalize a defective matrix, apply scalar root choices to matrices without checking hypotheses, or claim exactly a certain number of roots when only a lower bound or construction has been proved.",
    entryPrerequisites:["059 / M4.1 eigenspaces and diagonalisation legality","057-058 / determinant and polynomial matrix structure","023-024 / A4 complex roots and branch awareness"],
    requiredOwnership:[
      "Use A=PDP^{-1} only after diagonalizability has been established and compute A^n=PD^nP^{-1} correctly.",
      "Use a supplied polynomial identity to reduce high powers of A to a bounded set of lower powers.",
      "Construct a square root spectrally only when the stated hypotheses make that construction legal.",
      "Verify any proposed root B directly by checking B^2=A rather than relying only on analogy with scalars.",
      "Distinguish proving existence or at least k roots from proving that exactly k roots exist."
    ],
    applicationScope:"Small diagonalizable matrices and matrices satisfying low-degree polynomial identities, with exact powers or explicitly constructible square roots.",
    transferScope:"An unfamiliar power/root problem where the learner must choose between diagonalisation and polynomial reduction and reject a tempting method when its hypotheses fail.",
    inScope:["Matrix powers by diagonalisation","Polynomial reduction of powers","Spectral root construction","Direct root verification","Existence versus exact-count logic"],
    outOfScope:["Jordan-form power formulas","Matrix logarithms","Functional calculus","General classification of all matrix square roots"],
    exitCondition:"Solve one unfamiliar matrix power or root problem using a legally justified method, verify the result, and state precisely whether the argument proves existence, a lower bound on roots, or an exact count.",
    nextArcBoundary:"061 · M5.1 begins symmetric matrices and quadratic forms; orthogonal spectral structure is introduced only there.",
    mode:"learn",evidencePolicy:"standard"
  }
];
