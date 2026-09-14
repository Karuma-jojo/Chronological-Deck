// Hand-authored T25 M.Stat v4 session cards 051-055.
// These contracts implement audited syllabus steps M0.1 through M2.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_051_055 = [
  {
    id:"T25-ARC815-A1051",routeOrder:51,syllabusCode:"M0.1",targetCode:"M0",parentId:"ARC815",
    title:"Multiply and transpose conformable matrices correctly.",
    focus:"Matrix arithmetic with dimensions visible at every step: products as row-column contractions, transpose of products with reversed order, and explicit separation of matrix multiplication from entrywise operations.",
    purpose:"Make matrix notation mechanically trustworthy before row reduction and linear-system structure are introduced; most later errors become avoidable once dimensions and multiplication order are treated as constraints rather than decoration.",
    centralCapability:"Given small rectangular or square matrices, decide which products are defined, compute them correctly, transpose sums and products with order preserved, and exhibit concretely why matrix multiplication need not commute.",
    principalObstacle:"The learner may multiply entries positionwise, ignore incompatible dimensions, assume AB=BA, or write (AB)^T=A^TB^T instead of reversing the order.",
    entryPrerequisites:["003-004 / F2 equations and solution sets","Basic finite sums and arithmetic","Function/input discipline from F3"],
    requiredOwnership:[
      "State the dimension condition for AB and predict the dimension of the product before calculating entries.",
      "Compute each entry of AB as the appropriate row-column dot product rather than entrywise multiplication.",
      "Use (AB)^T=B^TA^T and verify the reversal on a concrete example.",
      "Distinguish A^2 from entrywise squaring and explain when A^2 is even defined.",
      "Give a valid pair of matrices for which AB and BA differ, including the possibility that only one order is defined."
    ],
    applicationScope:"Small numerical and symbolic matrices, including rectangular examples chosen to force dimension checks and square examples that expose noncommutativity.",
    transferScope:"An unfamiliar mixed expression containing products, transposes and powers where some operations are illegal or order-sensitive, requiring dimensional reasoning before computation.",
    inScope:["Matrix dimensions","Matrix products","Transpose rules","Matrix powers versus entrywise powers","Noncommutativity"],
    outOfScope:["Determinants and inverses reserved for M3","Eigenvalues reserved for M4","Abstract linear maps","Tensor products"],
    exitCondition:"Without hints, simplify and compute one unfamiliar conformable matrix expression, reject every illegal product, preserve transpose order, and supply a concrete demonstration that AB need not equal BA.",
    nextArcBoundary:"052 · M0.2 keeps the same elementary matrix setting but moves from arithmetic to reversible row operations on an augmented linear system.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC815-A1052",routeOrder:52,syllabusCode:"M0.2",targetCode:"M0",parentId:"ARC815",
    title:"Perform reversible row operations on one small system.",
    focus:"Elementary row operations as reversible transformations of a linear system's equation set, with an augmented matrix used as bookkeeping rather than as an unexplained algorithm.",
    purpose:"Establish legal elimination before rank, null spaces and solution classification: every row step must preserve exactly the same solution set.",
    centralCapability:"Translate a small linear system to an augmented matrix, row-reduce it using only reversible elementary row operations, record those operations, and translate the reduced rows back into equations or solution information.",
    principalObstacle:"The learner may perform an irreversible or unrecorded manipulation, operate on only part of an augmented row, or treat row echelon form as a ritual without understanding why solutions are preserved.",
    entryPrerequisites:["051 / M0.1 matrix notation and dimensions","003-004 / F2 equations as solution sets","Elementary algebraic elimination"],
    requiredOwnership:[
      "Encode a finite linear system as an augmented matrix without losing constants or variable order.",
      "Use only row swaps, multiplication of a row by a nonzero scalar, and addition of a multiple of one row to another.",
      "Explain why each elementary row operation is reversible and therefore preserves the system's solution set.",
      "Carry every row operation across the full augmented row, including the right-hand side.",
      "Read a reduced small system back into equations and verify a candidate solution in the original system."
    ],
    applicationScope:"Two- and three-variable numerical or simple parameter-free linear systems where elimination can be completed by hand and every row operation can be audited.",
    transferScope:"A fresh augmented system containing awkward coefficients where the learner must choose efficient legal row operations and justify solution-set preservation rather than mimic a fixed elimination recipe.",
    inScope:["Augmented matrices","Elementary row operations","Row-echelon reduction","Reversibility","Solution-set preservation"],
    outOfScope:["Rank classification reserved for M2","Determinants","Matrix inversion algorithms","Numerical stability and pivoting analysis"],
    exitCondition:"Row-reduce one unfamiliar small augmented system to a useful echelon form, recording only valid reversible operations, then interpret and check the resulting solution information against the original equations.",
    nextArcBoundary:"053 · M1.1 changes viewpoint from solving equations to vector-space structure: proposed subsets and dependence relations must now be tested from definitions.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC814-A1053",routeOrder:53,syllabusCode:"M1.1",targetCode:"M1",parentId:"ARC814",
    title:"Test a proposed subspace and a dependence relation.",
    focus:"Definition-driven tests for subspaces and linear dependence, using closure and explicit coefficient relations rather than visual intuition or counting vectors.",
    purpose:"Build the logical core needed for bases and dimension: the learner must know exactly what makes a subset a vector space and exactly what a nontrivial linear relation proves.",
    centralCapability:"Given a concrete subset of a familiar vector or polynomial space and a finite vector list, test the subspace conditions and either exhibit a nontrivial dependence relation or prove that only the trivial relation is possible.",
    principalObstacle:"The learner may check only that the zero vector is present, confuse a homogeneous-looking description with automatic closure, or infer independence merely because vectors are distinct or fewer than coordinates.",
    entryPrerequisites:["051-052 / M0 matrix arithmetic and elimination","007-010 / F4-F5 mathematical claims, sets and functions","Linear equations from F2"],
    requiredOwnership:[
      "Test zero-vector membership and closure under vector addition and scalar multiplication, or use the equivalent linear-combination closure criterion.",
      "Disprove subspace status with one explicit failed condition rather than unnecessary computation.",
      "Translate linear dependence into an equation c1v1+...+ckvk=0 with coefficients not all zero.",
      "Exhibit a concrete nontrivial relation when dependence holds or row-reduce the homogeneous coefficient system to prove independence.",
      "Handle parameter-defined examples by identifying values at which closure or dependence behaviour changes."
    ],
    applicationScope:"Subsets of R^n, small matrix spaces and low-degree polynomial spaces described by elementary equations or spanning lists.",
    transferScope:"An unfamiliar constrained vector/polynomial set or parameterized vector family where superficial shape is misleading and the learner must locate the exact closure or dependence argument.",
    inScope:["Subspace tests","Linear combinations","Linear dependence","Linear independence","Elementary parameter cases"],
    outOfScope:["Basis extraction reserved for M1.2","Rank-nullity theorem","Inner-product geometry","Infinite-dimensional functional analysis"],
    exitCondition:"For one unfamiliar proposed subspace and one unfamiliar finite vector family, give a definition-based verdict with either a decisive closure counterexample/nontrivial dependence relation or a complete proof that the required condition holds.",
    nextArcBoundary:"054 · M1.2 turns those dependence tests into construction: redundant generators are removed to produce and justify a basis and dimension.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC814-A1054",routeOrder:54,syllabusCode:"M1.2",targetCode:"M1",parentId:"ARC814",
    title:"Find and justify a basis/dimension for a constrained space.",
    focus:"Constructing a basis by solving constraints or eliminating redundant generators, then proving both spanning and independence and treating exceptional parameter values separately.",
    purpose:"Prevent basis questions from collapsing into unsupported vector lists: a basis is simultaneously sufficient to generate the space and free of redundancy, and dimension follows only after both claims are justified.",
    centralCapability:"Given a small constrained vector or polynomial space, parameterize its elements or reduce a spanning family, produce a basis, prove spanning and independence, and state the resulting dimension including exceptional parameter cases.",
    principalObstacle:"The learner may count equations instead of free parameters, present a spanning set without proving independence, or miss a parameter value where a pivot disappears and the dimension changes.",
    entryPrerequisites:["053 / M1.1 subspaces and dependence","052 / M0.2 elimination","004 / F2 parameter-dependent solution sets"],
    requiredOwnership:[
      "Solve linear constraints to express every vector in the space using explicit free parameters.",
      "Read candidate spanning vectors from that parameterization or extract pivot-independent generators from a supplied spanning family.",
      "Prove that the proposed vectors span the entire stated space rather than only selected examples.",
      "Prove independence of the proposed basis vectors using a coefficient equation or elimination.",
      "Separate exceptional parameter values where pivots, constraints or generators change and recompute the dimension there."
    ],
    applicationScope:"Finite-dimensional subspaces of R^n and elementary polynomial spaces defined by linear constraints or finite spanning families.",
    transferScope:"A fresh parameter-dependent constrained space in which a tempting generic basis fails at one exceptional value, requiring the learner to detect and repair the basis/dimension claim.",
    inScope:["Spanning sets","Basis construction","Dimension","Constraint parameterization","Exceptional parameter values"],
    outOfScope:["Rank-nullity as a theorem","Change-of-basis matrices","Orthogonal bases","Infinite-dimensional bases"],
    exitCondition:"Construct and justify a basis for one unfamiliar constrained vector or polynomial space, proving both spanning and independence and correctly identifying any parameter values at which the dimension changes.",
    nextArcBoundary:"055 · M2.1 returns to Ax=b with the new basis language available: coefficient and augmented ranks now classify consistency and solution dimension.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC815-A1055",routeOrder:55,syllabusCode:"M2.1",targetCode:"M2",parentId:"ARC815",
    title:"Classify consistency and solution dimension by ranks.",
    focus:"Using row reduction to compare coefficient and augmented ranks, identify consistency, and describe the dimension of the solution family through pivot and free-variable structure.",
    purpose:"Convert elimination output into structural conclusions: no solution, a unique solution and infinitely many solutions must be distinguished by exact rank and free-variable conditions rather than by visual guesswork.",
    centralCapability:"Given Ax=b for a small finite system, row-reduce the coefficient/augmented data, determine rank(A) and rank([A|b]), classify consistency, and when consistent determine whether the solution is unique or has a positive-dimensional family.",
    principalObstacle:"The learner may confuse number of equations with rank, overlook an inconsistent row, or say 'infinitely many' without identifying the number of free variables and the associated null-space directions.",
    entryPrerequisites:["053-054 / M1 span, independence, basis and dimension","052 / M0.2 reversible row reduction","003-004 / F2 solution sets"],
    requiredOwnership:[
      "Determine coefficient rank and augmented rank from a valid echelon form rather than from the raw number of rows or columns.",
      "Use equality of coefficient and augmented ranks as the consistency criterion for Ax=b.",
      "For a consistent n-variable system, relate the number of free variables to n-rank(A) and describe the resulting solution dimension.",
      "Distinguish no solution, exactly one solution and infinitely many solutions using rank and pivot information.",
      "Write the full solution of a consistent underdetermined system as a particular solution plus free homogeneous directions."
    ],
    applicationScope:"Small exact linear systems, including rectangular coefficient matrices, where ranks and free variables can be obtained transparently by hand elimination.",
    transferScope:"An unfamiliar system whose equation count suggests the wrong answer, forcing the learner to rely on actual pivots, augmented consistency and free-variable structure instead.",
    inScope:["Coefficient rank","Augmented rank","Consistency","Free variables","Affine solution dimension"],
    outOfScope:["Parameter-dependent rank proofs reserved for M2.2","Determinants and invertibility reserved for M3","Least squares","Numerical rank"],
    exitCondition:"For one unfamiliar small system Ax=b, compute both relevant ranks, classify consistency, state the exact solution-family dimension when consistent, and express the complete solution with its free directions without hints.",
    nextArcBoundary:"056 · M2.2 makes the rank analysis parameter-dependent and asks for a proof of uniqueness or a rank bound across all exceptional cases.",
    mode:"learn",evidencePolicy:"standard"
  }
];
