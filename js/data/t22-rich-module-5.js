export function buildT22RichModule5(syllabusVersion) {
  return {
    moduleId: "SIDE276",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Turn the vector-space language of Module 4 into a working finite-dimensional linear-operator toolkit. Build linear transformations first as structure-preserving maps, derive matrix representation from basis action, derive matrix multiplication from composition, solve exact linear systems by elimination, organize solution structure through column space/null space/rank, characterize invertibility, derive determinant as an orientation-and-volume scaling invariant, and finish by separating an underlying linear map from its coordinate representation through change of basis and similarity. The module must prepare later projection, eigenstructure, factorizations, multivariable calculus, regression and numerical linear algebra without pre-solving them.",
    moduleDestination:
      "The learner can recognize and verify linear maps, construct and interpret their matrix representations, compose maps by matrix multiplication with correct dimension logic, solve and classify finite linear systems exactly by Gaussian elimination, reason with column space/null space/rank and rank-nullity, prove and use core invertibility equivalences, compute and interpret determinants with explicit structural meaning, and change coordinates while preserving the underlying operator through similarity. The learner exits able to treat matrices as representations of linear structure rather than rectangular arithmetic tables.",
    entryPrerequisites: [
      "T22 Module 4 / ARC511: vector arithmetic, linear combinations, span, independence, basis/dimension and dot-product geometry",
      "Basic algebra and systems of scalar equations",
      "Function notation and composition",
      "Comfort with finite sums and coordinate notation",
      "Exact arithmetic; floating-point numerical analysis is not assumed",
    ],
    explicitlyOutOfScope: [
      "Orthogonal projection, Gram-Schmidt and least squares — owned by Module 6 / SIDE278",
      "Eigenvalues, eigenspaces, diagonalization and the spectral theorem — owned by SIDE279",
      "Quadratic forms, positive-semidefinite structure, QR, Cholesky, SVD and pseudoinverses — owned by SIDE280",
      "Numerical conditioning, floating-point Gaussian elimination, pivot-growth/stability analysis, LU/QR algorithms and large-scale solvers — owned later by ARC585",
      "Partial derivatives, gradients, Jacobians and Hessians — owned by SIDE271 and ARC711",
      "Infinite-dimensional operator theory and functional analysis",
      "Jordan form or canonical-form classification",
      "Tensor algebra, multilinear algebra beyond the minimum determinant structure, or exterior algebra",
    ],
    arcs: {
      "T22-M05-A01": {
        focus: "Linear transformations as maps that preserve vector addition and scalar multiplication.",
        roleRelevance:
          "Quantitative models constantly map parameter vectors, features, states and exposures into new vector descriptions. The decisive distinction is whether a map respects linear superposition, because later matrix methods are valid precisely for that structure.",
        purpose:
          "Define linearity independently of matrices, verify or refute linearity from the two defining laws, construct maps from basis action, and distinguish linear operators from merely convenient formulas.",
        principalObstacle:
          "A map can look algebraically simple without being linear. The learner must test preservation of addition and scalar multiplication—including the forced condition T(0)=0—rather than infer linearity from appearance or from one numerical example.",
        entryPrerequisites: [
          "T22 Module 4 vector arithmetic, span and basis",
          "Function notation and composition",
          "Basic algebra",
        ],
        target:
          "Given an unfamiliar vector-valued rule or a prescribed action on a basis, independently determine whether it defines a linear transformation, justify the answer from the defining laws, and predict its action on arbitrary linear combinations.",
        requiredMastery: [
          "State linearity as T(u+v)=T(u)+T(v) and T(cv)=cT(v), or equivalently preservation of finite linear combinations",
          "Derive T(0)=0 and T(-v)=-T(v) from the linearity axioms rather than treating them as separate rules",
          "Verify linearity of representative coordinate maps by symbolic argument valid for arbitrary vectors/scalars",
          "Refute linearity with a decisive counterexample such as a nonzero translation, nonlinear component or intercept term",
          "Use basis decomposition to show that a linear transformation is determined completely by its action on a basis",
          "Construct a linear transformation from prescribed images of basis vectors and compute its action on a general vector",
          "Distinguish domain, codomain and image of an individual input without yet developing matrix column-space machinery",
          "Diagnose a claim based on checking only a few sample vectors",
          "Transfer the superposition test to a research-style map such as aggregating/scaling multicomponent signals or state variables",
        ],
        applicationScope:
          "One modelling problem where several component effects are combined through a candidate map and the learner must decide whether exact superposition is valid and what that implies operationally.",
        transferScope:
          "An unfamiliar rule described verbally, geometrically or coordinatewise where matrix notation is absent and linearity must be discovered or rejected from structure.",
        explicitlyOutOfScope: [
          "Matrix representation — owned by A02",
          "Matrix multiplication/composition — owned by A03",
          "Kernel/null-space and rank theory — owned by A05",
          "Affine transformations as a full topic",
          "Nonlinear approximation/Jacobian linearization",
        ],
        nextArcBoundary:
          "A02 chooses bases and encodes a linear transformation as a matrix whose columns are the images of basis vectors in output coordinates.",
      },
      "T22-M05-A02": {
        focus: "Matrix representation of a linear transformation and matrix-vector action as coordinate propagation.",
        roleRelevance:
          "Matrix calculations become meaningful in quantitative work only when dimensions, basis conventions and input/output semantics are controlled. A matrix is a coordinate representation of a map, not an arbitrary table of coefficients.",
        purpose:
          "Derive matrix-vector multiplication from linear transformation action on a basis, establish row/column dimension logic, and translate reliably between linear-map, column and coordinate viewpoints.",
        principalObstacle:
          "Learners often memorize row-by-column arithmetic without understanding why it computes anything. The key is that an input vector supplies coefficients for a linear combination of the matrix columns, each column representing the image of one input basis vector.",
        entryPrerequisites: [
          "T22-M05-A01",
          "T22 Module 4 basis/coordinates and linear combinations",
          "Finite sums",
        ],
        target:
          "Construct the matrix of a linear map in specified bases, compute its action on vectors from column-combination structure, infer legal dimensions before calculating, and recover the represented map from a matrix.",
        requiredMastery: [
          "Construct a matrix by placing coordinate vectors of transformed input-basis vectors as columns",
          "Derive Ax as a linear combination of matrix columns weighted by coordinates of x",
          "Compute representative matrix-vector products and interpret the output in the correct codomain",
          "Infer that an m-by-n matrix represents a map from R^n to R^m under standard bases and reject dimensionally illegal products",
          "Translate a coordinate formula for T into its standard matrix and recover coordinate formulas from a given matrix",
          "Handle nonstandard input/output bases when their coordinate data are supplied, without yet building general change-of-basis machinery",
          "Distinguish rows, columns, inputs and outputs so transposition-by-accident is detectable",
          "Use basis-vector probes to reconstruct an unknown small linear map from its action",
          "Transfer matrix action to a multicomponent research model where each column has an interpretable marginal contribution",
        ],
        applicationScope:
          "One small transformation problem in which columns encode how primitive input directions affect several output quantities, with explicit dimension and interpretation checks.",
        transferScope:
          "A differently presented linear map—formula, basis action or table of input/output responses—requiring construction or decoding of the correct matrix representation.",
        explicitlyOutOfScope: [
          "Matrix-matrix multiplication/composition — owned by A03",
          "Gaussian elimination — owned by A04",
          "Column-space/rank theory — owned by A05",
          "Sparse/storage formats or numerical implementation details",
          "Jacobians as derivative matrices",
        ],
        nextArcBoundary:
          "A03 composes linear transformations and derives matrix multiplication as the coordinate rule for applying one represented map after another.",
      },
      "T22-M05-A03": {
        focus: "Composition of linear transformations and matrix multiplication as composition in coordinates.",
        roleRelevance:
          "Research pipelines routinely chain linear operations. Correct composition order and compatible intermediate dimensions matter; a silent reversal can yield a legal-looking but conceptually wrong result.",
        purpose:
          "Derive matrix multiplication from composition, establish its dimension/order rules and algebraic properties, and interpret products structurally instead of as an isolated row-by-column procedure.",
        principalObstacle:
          "Matrix multiplication is noncommutative because composition is ordered. The learner must understand what AB means operationally, why inner dimensions must match, and why each column of AB is A applied to the corresponding column of B.",
        entryPrerequisites: [
          "T22-M05-A01-A02",
          "Function composition",
          "Finite sums / linear combinations",
        ],
        target:
          "Given a chain of compatible linear maps, independently derive the correct matrix product, compute and interpret it, and diagnose order/dimension mistakes without relying on mnemonic row-by-column rules alone.",
        requiredMastery: [
          "Derive [S∘T]=[S][T] by applying the maps to a general coordinate vector or basis vectors",
          "Explain the inner-dimension compatibility rule from codomain/domain matching",
          "Compute matrix products using either row-column entries or transformed-column structure and reconcile the two viewpoints",
          "Explain why matrix multiplication is associative through composition while generally not commutative",
          "Construct a concrete counterexample to AB=BA",
          "Use identity matrices as coordinate representations of identity maps and verify AI=IA=A when dimensions permit",
          "Distinguish scalar distributivity from illegal entrywise intuitions about matrix products",
          "Diagnose a reversed processing pipeline where BA is used instead of AB",
          "Transfer composition reasoning to a sequence of feature/state transformations with explicit intermediate dimensions",
        ],
        applicationScope:
          "One multistage linear pipeline where the learner must determine composition order, validate dimensions and interpret the resulting map rather than merely multiply two matrices.",
        transferScope:
          "An unfamiliar chain of coordinate transformations in which several possible multiplication orders are syntactically tempting but only one represents the stated process.",
        explicitlyOutOfScope: [
          "Matrix powers as eigenvalue/dynamical analysis — developed later in SIDE279",
          "Computational complexity of optimized matrix multiplication",
          "Hadamard/Kronecker products",
          "Backpropagation or Jacobian chains",
        ],
        nextArcBoundary:
          "A04 turns a matrix equation Ax=b into an exact solvability problem and develops Gaussian elimination as a structure-preserving solution procedure.",
      },
      "T22-M05-A04": {
        focus: "Linear systems and Gaussian elimination: preserving solution sets while exposing pivots, free variables and consistency.",
        roleRelevance:
          "Linear systems sit inside regression, optimization constraints, calibration and numerical models. Before later numerical algorithms, the learner needs exact structural control over existence, uniqueness and degrees of freedom.",
        purpose:
          "Represent systems as Ax=b, justify elementary row operations as equivalence-preserving, reduce augmented matrices systematically, and classify systems as inconsistent, uniquely solvable or underdetermined.",
        principalObstacle:
          "Elimination is not just arithmetic simplification: every row operation must preserve the same solution set, pivot structure must be interpreted correctly, and a reduced matrix can encode no solution, one solution or infinitely many solutions depending on consistency and free variables.",
        entryPrerequisites: [
          "T22-M05-A02-A03",
          "Basic scalar equation solving",
          "T22 Module 4 span/independence intuition",
        ],
        target:
          "Convert an unfamiliar finite linear system to matrix form, carry out exact Gaussian elimination with justified row operations, parameterize all solutions when free variables remain, and diagnose consistency/uniqueness from echelon structure.",
        requiredMastery: [
          "Translate simultaneous scalar equations into Ax=b and an augmented matrix without misplacing coefficients/constants",
          "Justify row swapping, nonzero row scaling and row replacement as operations that preserve the solution set",
          "Perform forward elimination to row-echelon form and back-substitute reliably",
          "Use reduced row-echelon form when useful while distinguishing it from the underlying solution set",
          "Identify pivot and free variables and parameterize infinitely many solutions explicitly",
          "Detect inconsistency from a row representing 0=c with c nonzero",
          "Distinguish unique solution, no solution and infinitely many solutions from structural evidence rather than equation-count heuristics",
          "Diagnose a common failure such as dividing by a zero pivot without row exchange or forgetting to apply an operation to the augmented column",
          "Transfer elimination to a small calibration/constraint problem where variables have an operational interpretation",
        ],
        applicationScope:
          "One exact calibration or constraint system with enough structure to require pivoting/free-variable reasoning, not merely a two-equation substitution exercise.",
        transferScope:
          "A differently phrased system—equations, matrix equation or model constraints—requiring formulation, elimination and structural classification.",
        explicitlyOutOfScope: [
          "Floating-point pivoting strategy, conditioning and backward error — owned by ARC585",
          "LU factorization as a numerical algorithm — owned later by ARC585",
          "Least-squares solutions of inconsistent overdetermined systems — owned by SIDE278",
          "Iterative linear solvers",
          "Symbolic determinant solution formulas such as Cramer's rule as a primary method",
        ],
        nextArcBoundary:
          "A05 organizes the patterns exposed by elimination into column space, null space and rank, and proves the dimension relationship that controls solution freedom.",
      },
      "T22-M05-A05": {
        focus: "Column space, null space and rank as structural descriptions of reachability, ambiguity and independent output directions.",
        roleRelevance:
          "Rank deficiency and null directions are the algebraic core of non-identifiability, redundant features and singular systems. Quantitative researchers need to see these as model structure, not merely solver errors.",
        purpose:
          "Connect Ax=b solvability to column span, homogeneous solutions to the null space, pivots to rank, and domain dimension to rank plus nullity.",
        principalObstacle:
          "Several related objects are easy to conflate: the column space lives in the codomain, the null space lives in the domain, row operations preserve solution relationships but generally change literal columns, and rank measures independent image directions rather than matrix size.",
        entryPrerequisites: [
          "T22-M05-A04",
          "T22 Module 4 span, independence, basis and dimension",
        ],
        target:
          "For a small matrix, determine and interpret column space, null space, rank and nullity from elimination while preserving the distinction between original columns and row-reduced coordinates, then use rank-nullity to reason about solvability and representation freedom.",
        requiredMastery: [
          "Interpret Col(A)={Ax:x in R^n} as the reachable output set and connect Ax=b solvability to b belonging to the column space",
          "Interpret Null(A)={x:Ax=0} as input directions erased by the transformation",
          "Compute a basis for the null space by solving Ax=0 and parameterizing free variables",
          "Use pivot positions from row reduction to select a basis from the corresponding columns of the original matrix for the column space",
          "Define rank as dimension of the column space / image and nullity as dimension of the null space",
          "Apply and justify the finite-dimensional rank-nullity relation rank(A)+nullity(A)=number of input coordinates",
          "Relate full column rank to uniqueness of solutions when a solution exists and full row rank to reaching every codomain vector in the appropriate finite-dimensional setting",
          "Diagnose the error of using columns of the row-reduced matrix as if they were the original column-space basis",
          "Transfer rank/null-space reasoning to a model with redundant parameters or directions that do not change observable outputs",
        ],
        applicationScope:
          "One model-identifiability/redundancy problem where a null direction or rank deficiency has a concrete interpretation, plus one reachability question stated as column-space membership.",
        transferScope:
          "An unfamiliar matrix map where the learner must decide whether ambiguity comes from the null space, unattainability from the column space, or both, and support the diagnosis algebraically.",
        explicitlyOutOfScope: [
          "Orthogonal complements and projection geometry — owned by SIDE278",
          "Singular values, numerical rank and tolerance-based rank decisions — owned by SIDE280/ARC585",
          "Statistical identifiability theory beyond the linear structural analogy",
          "Eigenvectors/eigenspaces",
        ],
        nextArcBoundary:
          "A06 specializes to square maps and asks when every output has exactly one input, developing invertibility and inverse maps through equivalent structural conditions.",
      },
      "T22-M05-A06": {
        focus: "Invertibility and inverse maps through one-to-one/onto structure, pivots, null space and exact inverse construction.",
        roleRelevance:
          "Invertibility determines whether a transformation loses information, whether a parameterization is reversible and whether square linear systems have unique solutions for every right-hand side.",
        purpose:
          "Unify the main finite-dimensional invertibility criteria before determinants are introduced, construct inverses by solving against basis vectors, and develop disciplined reasoning about when inverse notation is meaningful.",
        principalObstacle:
          "An inverse is not obtained merely because a matrix is square. The learner must connect trivial null space, full rank, pivots in every row/column, one-to-one/onto behaviour and unique solvability for every b as equivalent structural conditions.",
        entryPrerequisites: [
          "T22-M05-A04-A05",
          "Composition and identity matrices from A03",
        ],
        target:
          "Determine whether a square linear map is invertible from structural evidence, prove core equivalences, construct a small inverse by elimination when it exists, and reject inverse-based manipulations when hypotheses fail.",
        requiredMastery: [
          "Define an inverse transformation by T^{-1}∘T=I and T∘T^{-1}=I and connect it to a matrix B satisfying BA=AB=I",
          "Prove that an invertible linear map has trivial null space and is both one-to-one and onto",
          "Use equal finite domain/codomain dimension to connect injectivity, surjectivity and full rank for square maps",
          "Relate invertibility to a pivot in every row/column and to unique solvability of Ax=b for every b",
          "Construct A^{-1} for a small invertible matrix by row-reducing [A|I] and interpret each inverse column as the input producing a basis output",
          "Verify a proposed inverse by multiplication/composition",
          "Show that the inverse of a composition reverses order: (AB)^{-1}=B^{-1}A^{-1}",
          "Diagnose illegal expressions such as A^{-1} for a singular or nonsquare matrix",
          "Transfer invertibility reasoning to a reversible reparameterization or state transformation",
        ],
        applicationScope:
          "One reversible-versus-information-losing transformation problem, plus one exact small inverse construction with a structural check rather than formula-only inversion.",
        transferScope:
          "A changed setting where the learner receives rank/null-space/solvability evidence rather than a direct 'invert this matrix' prompt and must infer whether an inverse exists.",
        explicitlyOutOfScope: [
          "Determinant as an invertibility test — owned by A07",
          "Pseudoinverses — owned by SIDE280",
          "Condition numbers / numerical sensitivity of inversion — owned by ARC585",
          "Using explicit matrix inversion as the default numerical way to solve systems",
        ],
        nextArcBoundary:
          "A07 introduces determinant as a scalar invariant of square linear maps that encodes oriented volume scaling, multiplicative composition and singularity.",
      },
      "T22-M05-A07": {
        focus: "Determinants as oriented volume-scaling invariants, with row-operation structure and the singularity test.",
        roleRelevance:
          "Determinants later appear in density transformations, covariance/likelihood expressions and matrix calculus. Their useful content is structural—volume scaling, orientation, invertibility and multiplicativity—not cofactor arithmetic for its own sake.",
        purpose:
          "Build determinant from its geometric/algebraic invariance properties, compute it efficiently in small/exact cases, derive its response to elementary row operations and composition, and connect det(A)=0 to loss of dimension/invertibility.",
        principalObstacle:
          "The determinant is often taught as a mysterious expansion formula. The learner must instead connect a single scalar to how a square linear map scales oriented n-dimensional volume and why dependence collapses that scaling to zero.",
        entryPrerequisites: [
          "T22-M05-A02-A06",
          "Basis/dimension and geometric scaling intuition from Module 4",
          "Gaussian elimination",
        ],
        target:
          "Compute and interpret determinants of representative square matrices, derive their transformation under row operations and products, and use determinant zero/nonzero as a justified structural statement about invertibility and dimensional collapse.",
        requiredMastery: [
          "Interpret det(A) as signed/oriented volume scaling for a square linear map and explain why linearly dependent columns force determinant zero",
          "Derive the 2-by-2 determinant from oriented area or alternating bilinear structure rather than memorize ad-bc without meaning",
          "Compute small determinants by elimination/row-operation accounting and, where appropriate, cofactor expansion without making expansion the conceptual definition",
          "Track determinant changes under row swaps, row scaling and row replacement",
          "Use triangular-matrix structure to compute determinants as the product of diagonal entries",
          "Justify or apply det(AB)=det(A)det(B) from composition of volume scaling",
          "Connect det(A)≠0 to invertibility using the previously established rank/invertibility structure",
          "Distinguish determinant magnitude from orientation sign and reject statements such as 'large determinant means a matrix is numerically stable'",
          "Transfer determinant reasoning to a coordinate-volume or local scale-factor problem without importing multivariable Jacobian theory",
        ],
        applicationScope:
          "One transformation-volume problem and one exact invertibility/singularity diagnosis where determinant structure is informative but not used as a substitute for later conditioning analysis.",
        transferScope:
          "An unfamiliar square map where the learner must choose among row-operation, geometric and multiplicative determinant reasoning and interpret what the resulting scalar actually establishes.",
        explicitlyOutOfScope: [
          "Jacobian determinants in multivariable integration or probability transformations as a developed topic",
          "Log-determinant derivatives — owned by ARC711",
          "Determinant-based numerical conditioning claims",
          "Leibniz permutation formula as a major combinatorial unit",
          "Characteristic polynomials/eigenvalues — owned by SIDE279",
        ],
        nextArcBoundary:
          "A08 changes coordinates: the same linear map acquires different matrices in different bases, related by conjugation/similarity, while structural invariants remain attached to the underlying operator.",
      },
      "T22-M05-A08": {
        focus: "Change of basis and similarity: separating an invariant linear map from basis-dependent coordinate matrices.",
        roleRelevance:
          "Quantitative modelling constantly reparameterizes systems. Good coordinate choices can simplify interpretation or computation, but changing representation must not be mistaken for changing the underlying transformation itself.",
        purpose:
          "Construct coordinate-change matrices from bases, derive the similarity relation for one operator represented in two bases, and identify what is coordinate-dependent versus structurally invariant without entering eigenbasis theory.",
        principalObstacle:
          "Several matrices act at once—the operator, the basis-coordinate conversion and its inverse. Reversing a conversion or mixing coordinates from different bases can produce plausible arithmetic that represents the wrong map.",
        entryPrerequisites: [
          "T22-M05-A02-A07",
          "T22 Module 4 basis and coordinate uniqueness",
          "Invertibility and composition",
        ],
        target:
          "Given two finite bases and a linear operator, construct coordinate conversion maps, derive the correct similarity formula for the operator's two matrix representations, and explain which properties belong to the operator rather than to a chosen coordinate system.",
        requiredMastery: [
          "Construct a change-of-coordinate matrix whose columns encode one basis in the coordinates of another and state clearly which direction the matrix maps",
          "Convert vector coordinates between two bases and verify by reconstructing the same underlying vector",
          "Derive the operator-coordinate relation B=P^{-1}AP (or the corresponding convention-specific form) from the sequence coordinate-convert -> apply map -> convert back",
          "Explain why similar matrices represent the same linear operator in different bases rather than different operators",
          "Verify that similarity preserves rank, invertibility and determinant using prior module results",
          "Distinguish a basis change from an arbitrary left/right multiplication that changes the represented operator",
          "Diagnose an order/convention error by tracking what basis each intermediate coordinate vector belongs to",
          "Choose a simple nonstandard basis that makes a given elementary transformation easier to describe without invoking eigenvectors",
          "Transfer reparameterization reasoning to a research model where coordinates change but observable predictions of the underlying linear map must remain invariant",
        ],
        applicationScope:
          "One reparameterization problem requiring explicit coordinate conversions and a consistency check that two matrices encode the same underlying transformation.",
        transferScope:
          "An unfamiliar pair of bases or coordinate conventions where the learner must reconstruct the correct conversion direction and similarity relation from first principles rather than recall a formula mechanically.",
        explicitlyOutOfScope: [
          "Choosing eigenvector bases, diagonalization and spectral decomposition — owned by SIDE279",
          "Orthogonal change of basis, QR and Gram-Schmidt as developed algorithms — owned by SIDE278/SIDE280",
          "General canonical forms such as Jordan form",
          "Coordinate changes for nonlinear maps / Jacobians",
          "Numerical basis conditioning",
        ],
        nextArcBoundary:
          "Module 6 / SIDE278 adds inner-product geometry to subspaces: orthogonality, projection, Gram-Schmidt and least squares. SIDE279 later exploits invariant directions/eigenbases, while SIDE280 develops factorization and positive-definite structure.",
      },
    },
  };
}
