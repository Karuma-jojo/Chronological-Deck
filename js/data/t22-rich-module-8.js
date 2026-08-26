export function buildT22RichModule8(syllabusVersion) {
  return {
    moduleId: "SIDE280",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Unify quadratic geometry and the major matrix factorizations that recur throughout quantitative research. Begin with quadratic forms and definiteness, connect symmetric positive-semidefinite matrices to covariance structure, derive QR from orthonormal bases and use it for least squares, derive Cholesky from positive-definite structure and use it for correlated simulation, then develop SVD as a universal geometric factorization with pseudoinverse and low-rank approximation. The module must supply exact structural understanding while deferring floating-point algorithms, conditioning and large-scale numerical implementation to ARC585.",
    moduleDestination:
      "The learner can interpret and classify quadratic forms, test positive-(semi)definiteness using equivalent structural criteria, reason about covariance matrices, construct and interpret exact QR and Cholesky factorizations, solve full-rank least squares through QR, generate correlated variables from a valid covariance factor, derive and interpret the SVD geometrically, use the Moore-Penrose pseudoinverse in rank-deficient systems, and justify optimal low-rank approximation from singular values. The learner exits able to choose a factorization by mathematical purpose rather than by memorized recipe.",
    entryPrerequisites: [
      "T22 Module 5 / SIDE276: matrix multiplication, rank, null space, invertibility and change of basis",
      "T22 Module 6 / SIDE278: inner products, orthogonality, orthonormal bases, projection and least squares geometry",
      "T22 Module 7 / SIDE279: eigenvalues/eigenspaces and the spectral theorem for real symmetric matrices",
      "Algebraic manipulation of finite-dimensional matrix expressions",
      "Exact arithmetic; floating-point stability and implementation details are not assumed",
    ],
    explicitlyOutOfScope: [
      "Floating-point QR/Cholesky/SVD algorithms, Householder/Givens implementation details, numerical rank thresholds and backward-error analysis — owned by ARC585",
      "Regression inference, residual diagnostics and statistical modelling assumptions — owned by ARC539",
      "PCA as a full statistical data-analysis workflow — owned by ARC541",
      "Matrix-calculus gradients of quadratic forms/log-determinants — owned by ARC711",
      "Optimization theory for convex quadratic programs — owned by ARC514 and later optimization modules",
      "Random-variable theory beyond the covariance facts required to interpret PSD matrices and correlated simulation",
      "Sparse, randomized or distributed factorization algorithms",
    ],
    arcs: {
      "T22-M08-A01": {
        focus: "Quadratic forms and definiteness as directional curvature/energy of a symmetric matrix.",
        roleRelevance:
          "Quadratic forms appear in portfolio variance, least squares, Hessian curvature, Gaussian exponents and regularization. Their sign structure determines whether a direction contributes positive, zero or negative curvature/energy.",
        purpose:
          "Interpret x^T A x geometrically, reduce it to the symmetric part of A, classify positive definite, positive semidefinite, negative definite and indefinite forms, and connect definiteness to eigenvalues for real symmetric matrices.",
        principalObstacle:
          "The scalar x^T A x depends only on the symmetric part of A, and sign classification must hold for every nonzero direction—not merely for coordinate axes or a few tested vectors.",
        entryPrerequisites: [
          "T22 Module 5 matrix multiplication and transpose",
          "T22 Module 6 inner products/norms",
          "T22 Module 7 spectral theorem for real symmetric matrices",
        ],
        target:
          "Given a small real matrix or quadratic expression, independently construct the associated symmetric quadratic form, classify its definiteness with justified criteria, and explain the directional meaning of the classification.",
        requiredMastery: [
          "Expand and interpret x^T A x as a scalar quadratic expression",
          "Prove x^T A x = x^T((A+A^T)/2)x so the skew-symmetric part contributes zero",
          "State positive definite and positive semidefinite conditions with correct quantifiers over all nonzero/all vectors",
          "Use an orthogonal eigendecomposition A=QΛQ^T to derive x^T A x as a weighted sum of squared eigen-coordinates",
          "Classify definiteness from eigenvalue signs for real symmetric matrices",
          "Construct counterexamples showing that positive diagonal entries alone do not imply positive definiteness",
          "Distinguish positive semidefinite from positive definite through null directions",
          "Diagnose an invalid definiteness claim based on finitely many sampled vectors",
          "Transfer the classification to a quadratic risk/penalty surface and identify flat or descending directions",
        ],
        applicationScope:
          "One small quadratic risk or curvature model where sign and null directions have an operational interpretation.",
        transferScope:
          "An unfamiliar quadratic expression presented without matrix notation, requiring reconstruction of a symmetric matrix and structural classification.",
        explicitlyOutOfScope: [
          "Covariance matrices as a stochastic object — owned by A02",
          "Cholesky factorization — owned by A05",
          "Quadratic optimization algorithms",
          "Hessian calculus",
        ],
        nextArcBoundary:
          "A02 specializes PSD structure to covariance matrices and proves why covariance is necessarily symmetric positive semidefinite while clarifying singular covariance and redundant directions.",
      },
      "T22-M08-A02": {
        focus: "Positive-semidefinite matrices and covariance structure.",
        roleRelevance:
          "Covariance matrices encode joint variability in multivariate finance and statistics. Their PSD constraint is structural: impossible covariance specifications can otherwise slip into simulations, factor models and optimization pipelines.",
        purpose:
          "Derive symmetry and positive semidefiniteness of covariance matrices, interpret x^TΣx as variance of a linear combination, connect singular covariance to exact linear redundancy, and distinguish PSD from positive definite covariance.",
        principalObstacle:
          "Covariance is not an arbitrary symmetric table. Every vector of weights must produce a nonnegative variance, and zero variance in a nonzero direction means a deterministic linear relation rather than merely a numerical inconvenience.",
        entryPrerequisites: [
          "T22-M08-A01",
          "Basic expectation/variance identity may be used in the minimal form Var(Y)>=0 and Cov linearity needed here",
          "T22 Module 5 null-space/rank reasoning",
        ],
        target:
          "Given a proposed covariance matrix or multivariate linear combination, prove or refute covariance validity through symmetry/PSD structure, interpret portfolio variance x^TΣx, and diagnose singular directions as exact redundancies.",
        requiredMastery: [
          "Derive Σ^T=Σ from covariance symmetry",
          "Derive a^TΣa = Var(a^T X) >= 0 for any coefficient vector a",
          "Explain why a valid covariance matrix must be PSD",
          "Interpret zero quadratic variance along a nonzero vector as an exact zero-variance linear combination",
          "Relate positive definiteness of Σ to absence of nontrivial zero-variance directions",
          "Use eigenvalues or principal structural checks in small cases to reject an impossible covariance matrix",
          "Distinguish covariance from correlation and recognize unit/scale changes without developing full correlation analysis",
          "Diagnose the error of assuming every PSD covariance is invertible",
          "Transfer PSD reasoning to a factor/exposure model with redundant components",
        ],
        applicationScope:
          "One portfolio/factor covariance problem where the learner must validate the matrix and interpret a singular or near-conceptual redundancy exactly, without numerical conditioning analysis.",
        transferScope:
          "An unfamiliar symmetric matrix claimed to represent covariance, requiring proof or refutation from variance-of-linear-combination logic rather than rote eigenvalue checking alone.",
        explicitlyOutOfScope: [
          "Sampling distributions and estimation error of covariance",
          "Shrinkage covariance estimators",
          "PCA workflow — owned later by ARC541",
          "Numerical PSD repair / nearest-covariance algorithms",
        ],
        nextArcBoundary:
          "A03 returns to deterministic linear algebra and constructs QR by replacing a full-rank column basis with an orthonormal basis while recording the coordinate change in an upper-triangular factor.",
      },
      "T22-M08-A03": {
        focus: "QR factorization from orthonormalization of a full-column-rank matrix.",
        roleRelevance:
          "QR separates geometric orientation from coordinate scaling and is a core tool for stable least squares, orthonormal feature bases and later numerical algorithms.",
        purpose:
          "Derive A=QR from Gram-Schmidt/basis coordinates, establish shapes and upper-triangular structure, and interpret Q and R as orthonormal geometry plus coordinates of the original columns.",
        principalObstacle:
          "QR is not merely a matrix identity. For full-column-rank A, the columns of Q form an orthonormal basis for Col(A), while R records how each original column is assembled from that progressively constructed basis.",
        entryPrerequisites: [
          "T22 Module 6 Gram-Schmidt and orthonormal bases",
          "T22 Module 5 matrix representation and rank",
        ],
        target:
          "Construct an exact reduced QR factorization for a small full-column-rank matrix, justify the triangular structure and dimensions, and verify that Q^TQ=I and QR=A.",
        requiredMastery: [
          "Apply Gram-Schmidt to independent matrix columns and assemble the resulting orthonormal vectors into Q",
          "Derive R=Q^T A for reduced QR when Q spans Col(A)",
          "Explain why R is upper triangular under the standard sequential construction",
          "Track dimensions for an m-by-n full-column-rank matrix: Q is m-by-n and R is n-by-n in reduced QR",
          "Verify Q^TQ=I and QR=A",
          "Interpret diagonal entries of R as residual column lengths in Gram-Schmidt and explain why full column rank keeps them nonzero",
          "Recognize sign nonuniqueness unless a positive-diagonal convention is imposed",
          "Diagnose a failed QR construction caused by dependent columns",
          "Transfer QR structure to an unfamiliar basis-building problem without invoking a numerical library routine",
        ],
        applicationScope:
          "One exact feature/design matrix where orthonormal coordinates simplify interpretation of its column space.",
        transferScope:
          "A matrix presented through a set of basis vectors or model columns, requiring reconstruction of QR from geometry rather than formula lookup.",
        explicitlyOutOfScope: [
          "Householder reflections and Givens rotations as numerical algorithms — ARC585",
          "Rank-revealing/pivoted QR",
          "QR iteration for eigenvalues",
          "Least squares solution through QR — owned by A04",
        ],
        nextArcBoundary:
          "A04 uses the orthonormal-column structure of Q to convert least squares into a small triangular solve and explicitly connects this to Module 6 projection geometry.",
      },
      "T22-M08-A04": {
        focus: "QR for full-column-rank least squares.",
        roleRelevance:
          "Least squares is ubiquitous in quantitative research. QR exposes the same projection solution as normal equations while avoiding the conceptual need to form A^TA and preparing the later numerical-stability comparison.",
        purpose:
          "Derive the full-rank least-squares solution from A=QR, connect Q^Tb to orthogonal projection coordinates, solve Rx=Q^Tb, and reconcile the result with the normal equations geometrically.",
        principalObstacle:
          "The minimization is over residual norm in the original observation space, but orthonormal Q splits b into a component inside Col(A) and an orthogonal residual. The triangular equation follows from this geometry, not from a memorized QR recipe.",
        entryPrerequisites: [
          "T22-M08-A03",
          "T22 Module 6 projection and least-squares geometry",
          "T22 Module 5 triangular systems",
        ],
        target:
          "For a small full-column-rank least-squares problem, derive and solve Rx=Q^Tb, prove the residual is orthogonal to Col(A), and explain equivalence with the normal equations without importing numerical-stability claims not yet justified.",
        requiredMastery: [
          "Write Ax=QRx and use orthonormal decomposition of b relative to Col(Q)",
          "Derive the minimizer condition Rx=Q^Tb",
          "Solve the resulting upper-triangular system exactly",
          "Recover the fitted vector QQ^Tb and residual b-QQ^Tb",
          "Prove Q^T residual=0 and connect this to A^T residual=0",
          "Derive equivalence with A^TAx=A^Tb under full column rank",
          "Distinguish uniqueness of coefficient solution here from rank-deficient least squares deferred to A08",
          "Diagnose misuse of the QR formula when columns are dependent or R is singular",
          "Transfer the method to a regression-like design matrix while keeping statistical inference out of scope",
        ],
        applicationScope:
          "One deterministic overdetermined fitting/calibration problem solved by exact QR, with explicit fitted vector and residual interpretation.",
        transferScope:
          "An unfamiliar least-squares system where the learner must choose and justify QR from column-space geometry rather than default to normal equations.",
        explicitlyOutOfScope: [
          "Floating-point stability comparison of QR versus normal equations — ARC585",
          "Statistical regression inference/diagnostics — ARC539",
          "Rank-deficient least squares — A08",
          "Regularized least squares",
        ],
        nextArcBoundary:
          "A05 turns positive-definite structure into a triangular factorization A=LL^T and derives when Cholesky exists and why its pivots stay positive.",
      },
      "T22-M08-A05": {
        focus: "Cholesky factorization of symmetric positive-definite matrices.",
        roleRelevance:
          "Positive-definite covariance, Hessian and normal-equation matrices admit a highly structured triangular factorization used throughout simulation, optimization and numerical linear algebra.",
        purpose:
          "Derive the form A=LL^T for SPD matrices, construct it exactly in small cases, connect positive definiteness to positive diagonal pivots, and distinguish existence/uniqueness conditions from generic LU factorization.",
        principalObstacle:
          "Cholesky depends on symmetry and positive definiteness. A symmetric matrix with a nonpositive direction cannot support the required real positive diagonal factor, and blindly applying the recurrence can expose that failure.",
        entryPrerequisites: [
          "T22-M08-A01",
          "T22 Module 5 elimination/triangular systems",
          "Square roots and exact algebra",
        ],
        target:
          "Given a small real symmetric matrix, determine whether Cholesky is structurally admissible, construct L with positive diagonal when it is SPD, verify LL^T=A, and explain what failure of a pivot reveals.",
        requiredMastery: [
          "State the Cholesky form A=LL^T with L lower triangular and positive diagonal for SPD A",
          "Derive the entrywise recurrence by matching entries of LL^T to A",
          "Construct exact 2x2 and manageable 3x3 Cholesky factors",
          "Verify the factorization by multiplication",
          "Explain why LL^T is automatically symmetric PSD and why invertible L makes it positive definite",
          "Connect positive diagonal pivots to positive-definite structure in the exact setting",
          "Distinguish Cholesky from a generic LU factorization",
          "Diagnose failure on a symmetric indefinite or merely semidefinite matrix",
          "Transfer factorization reasoning to an SPD matrix arising as covariance or a Gram matrix",
        ],
        applicationScope:
          "One exact SPD covariance/Gram matrix where the factorization is constructed and interpreted structurally.",
        transferScope:
          "An unfamiliar symmetric matrix requiring an evidence-based decision about whether real Cholesky with positive diagonal exists before calculation.",
        explicitlyOutOfScope: [
          "Numerical Cholesky stability and implementation — ARC585",
          "Pivoted/incomplete Cholesky",
          "LDL^T factorization for indefinite matrices",
          "Correlated simulation — owned by A06",
        ],
        nextArcBoundary:
          "A06 uses a covariance factor to transform independent standardized components into variables with the desired covariance and proves the covariance propagation algebra.",
      },
      "T22-M08-A06": {
        focus: "Cholesky factors and correlated simulation.",
        roleRelevance:
          "Monte Carlo risk, portfolio stress testing and multivariate models require controlled dependence. A covariance factor translates independent standardized draws into correlated draws with a prescribed covariance.",
        purpose:
          "Derive covariance propagation Cov(Lz)=L Cov(z)L^T, use Cholesky to construct correlated vectors from standardized uncorrelated/independent components, and diagnose invalid covariance or orientation choices.",
        principalObstacle:
          "The factor must be applied with the correct orientation and assumptions. Matching marginal variances alone is insufficient; the full covariance matrix must satisfy LL^T=Σ and the standardized source vector must have identity covariance.",
        entryPrerequisites: [
          "T22-M08-A02 and A05",
          "Minimal covariance linearity needed to derive Cov(Az)=A Cov(z) A^T",
          "Basic simulation concept; programming is not required",
        ],
        target:
          "Given an SPD covariance matrix, construct a factor and prove that x=μ+Lz has covariance Σ when Cov(z)=I, then diagnose common mistakes in correlated-simulation constructions.",
        requiredMastery: [
          "Derive Cov(Az)=A Cov(z) A^T in the finite-dimensional setting",
          "Use Σ=LL^T to show Cov(Lz)=Σ when Cov(z)=I",
          "Include a mean shift μ and explain why it does not change covariance",
          "Construct a small exact Cholesky-based correlated transformation",
          "Verify resulting marginal variances and covariance/correlation entries",
          "Distinguish uncorrelated standardized inputs from stronger independence assumptions and state when independence matters for the intended joint distribution",
          "Diagnose L versus L^T orientation mistakes by direct covariance calculation",
          "Reject a proposed target covariance that is not PSD/SPD before attempting Cholesky",
          "Transfer the method to a portfolio/factor simulation specification with interpretable dependence",
        ],
        applicationScope:
          "One small multivariate risk simulation design with explicit target covariance and proof of the generated covariance structure.",
        transferScope:
          "A differently parameterized dependence problem requiring reconstruction of the correct linear transform rather than copying a memorized simulation formula.",
        explicitlyOutOfScope: [
          "Monte Carlo estimator convergence/variance reduction — ARC513",
          "Copulas and non-Gaussian dependence modelling",
          "Numerical covariance repair",
          "Random-number generator implementation",
        ],
        nextArcBoundary:
          "A07 introduces the SVD, which exists for every real matrix and decomposes its action into orthogonal input directions, nonnegative stretches and orthogonal output directions.",
      },
      "T22-M08-A07": {
        focus: "Singular values and SVD geometry for arbitrary rectangular matrices.",
        roleRelevance:
          "SVD is the universal linear-geometry tool behind numerical rank, pseudoinverses, dimensionality reduction and conditioning. It reveals how a matrix stretches orthogonal input directions even when eigenvectors are unavailable or the matrix is rectangular.",
        purpose:
          "Derive singular values/vectors from A^T A, construct A=UΣV^T in small cases, interpret rank and null directions through singular values, and contrast SVD with eigendecomposition.",
        principalObstacle:
          "Eigenvectors describe invariant directions of a square operator; singular vectors instead pair orthogonal input and output directions of an arbitrary linear map. Confusing the two obscures why SVD always exists and why singular values are nonnegative.",
        entryPrerequisites: [
          "T22 Modules 5-7",
          "T22-M08-A01",
          "Orthogonal bases and symmetric spectral theorem",
        ],
        target:
          "For a small real matrix, derive singular values from A^TA, construct compatible right/left singular vectors, assemble and verify an SVD, and explain its geometric stretching action and relation to rank/null space.",
        requiredMastery: [
          "Show A^TA is symmetric PSD and therefore has an orthonormal eigenbasis with nonnegative eigenvalues",
          "Define singular values as square roots of eigenvalues of A^TA",
          "Construct right singular vectors from eigenvectors of A^TA and left singular vectors from Av_i/σ_i for nonzero singular values",
          "Assemble reduced/full SVD shapes appropriately in representative rectangular cases",
          "Interpret A as rotate/reflect input coordinates -> nonnegative axis scaling -> rotate/reflect output coordinates",
          "Relate rank to the number of nonzero singular values and Null(A) to zero-singular-value right directions",
          "Distinguish singular values from eigenvalues and explain why they need not coincide even for square nonsymmetric matrices",
          "Verify A=UΣV^T and orthonormality conditions in a small exact example",
          "Transfer SVD geometry to an unfamiliar rectangular data/model map",
        ],
        applicationScope:
          "One rectangular transformation where singular directions reveal strong, weak and annihilated input modes.",
        transferScope:
          "An unfamiliar matrix where eigendecomposition is unavailable/inappropriate and the learner must justify why SVD is the correct structural tool.",
        explicitlyOutOfScope: [
          "Floating-point SVD algorithms and numerical rank thresholds — ARC585",
          "PCA as a statistical procedure — ARC541",
          "Pseudoinverse — A08",
          "Low-rank approximation theorem — A09",
        ],
        nextArcBoundary:
          "A08 uses reciprocal nonzero singular values to build the Moore-Penrose pseudoinverse and select canonical least-squares/minimum-norm solutions in rank-deficient problems.",
      },
      "T22-M08-A08": {
        focus: "Moore-Penrose pseudoinverse and rank-deficient linear/least-squares problems.",
        roleRelevance:
          "Real design matrices frequently contain redundant directions. The pseudoinverse provides a canonical solution rule when ordinary inverses fail, separating fitted output from non-identifiable coefficient directions.",
        purpose:
          "Construct A^+ from the SVD, derive its action on singular coordinates, solve inconsistent and underdetermined systems canonically, and distinguish minimum-residual from minimum-norm properties.",
        principalObstacle:
          "When A is rank deficient, there may be no exact solution or infinitely many. The pseudoinverse does not magically restore invertibility; it selects the least-squares fit and, among coefficient vectors with that fit, the minimum-Euclidean-norm representative.",
        entryPrerequisites: [
          "T22-M08-A07",
          "T22 Module 5 rank/null space",
          "T22 Module 6 least-squares projection geometry",
        ],
        target:
          "Given a small rank-deficient or rectangular matrix, construct A^+ from its SVD, compute A^+b, prove the least-squares/minimum-norm interpretation in singular coordinates, and diagnose what remains non-identifiable.",
        requiredMastery: [
          "Construct Σ^+ by reciprocating nonzero singular values and leaving zero singular values at zero",
          "Derive A^+=VΣ^+U^T from A=UΣV^T",
          "Use singular coordinates to show A A^+ b is the orthogonal projection of b onto Col(A)",
          "Explain why x*=A^+b minimizes residual norm for arbitrary b",
          "Explain why x* is the minimum-norm solution among all coefficient vectors achieving the least-squares fit",
          "Recover the ordinary inverse when A is square and invertible",
          "Identify null-space directions responsible for non-unique coefficients",
          "Diagnose the false claim that pseudoinverse makes a rank-deficient model identifiable",
          "Transfer pseudoinverse reasoning to a redundant feature/calibration system with interpretable coefficient ambiguity",
        ],
        applicationScope:
          "One rank-deficient fitting/calibration problem where fitted outputs are identifiable but coefficients are not, requiring a canonical minimum-norm solution.",
        transferScope:
          "An unfamiliar inconsistent or underdetermined system requiring the learner to separate existence, residual minimization and coefficient norm before applying A^+.",
        explicitlyOutOfScope: [
          "Statistical consequences of multicollinearity — ARC539",
          "Regularization/ridge regression",
          "Numerical tolerance rules for deciding whether a singular value is zero — ARC585",
          "Generalized inverses beyond Moore-Penrose",
        ],
        nextArcBoundary:
          "A09 truncates the singular spectrum and proves why keeping the largest singular components gives the best fixed-rank approximation under standard matrix norms.",
      },
      "T22-M08-A09": {
        focus: "Low-rank approximation from truncated SVD.",
        roleRelevance:
          "Low-rank structure underlies factor compression, denoising, latent representations and scalable approximations. The singular spectrum provides a principled way to quantify which linear directions carry most matrix action.",
        purpose:
          "Construct rank-k truncations of an SVD, quantify approximation error from discarded singular values, and justify the optimality of truncated SVD for fixed-rank approximation in spectral/Frobenius norms at the intended level.",
        principalObstacle:
          "Dropping small-looking entries is not the same as dropping weak matrix directions. Rank-k approximation must preserve the strongest singular modes globally, and the residual error is controlled by the discarded singular spectrum.",
        entryPrerequisites: [
          "T22-M08-A07-A08",
          "Matrix/Frobenius norm at the minimal operational level or derivable from singular-coordinate geometry",
          "Orthogonality and rank",
        ],
        target:
          "Given an SVD or a small matrix whose SVD is known, build a rank-k approximation, compute/interpret the discarded-error contribution, and justify why no other rank-k matrix can do better under the specified norm.",
        requiredMastery: [
          "Construct A_k=sum_{i=1}^k σ_i u_i v_i^T from singular triplets ordered by decreasing σ_i",
          "Show rank(A_k)<=k and interpret each rank-one term as one input-output mode",
          "Compute Frobenius residual energy from discarded singular values",
          "Identify the spectral-norm residual as the next discarded singular value",
          "State and explain the Eckart-Young optimality result at a finite-dimensional structural level",
          "Compare truncated SVD with naive entry deletion and construct a counterexample where entrywise sparsification misses global low-rank structure",
          "Choose k from an explicit approximation-error requirement when singular values are given",
          "Diagnose the invalid claim that low rank necessarily means few nonzero matrix entries",
          "Transfer low-rank reasoning to a factor/compression problem while keeping PCA inference and data-selection criteria separate",
        ],
        applicationScope:
          "One matrix compression/factor representation problem where the learner quantifies the trade-off between retained rank and approximation error.",
        transferScope:
          "An unfamiliar matrix approximation problem requiring identification of singular modes rather than surface sparsity or coordinate magnitude.",
        explicitlyOutOfScope: [
          "Statistical PCA workflow, explained-variance inference and data preprocessing — ARC541",
          "Randomized/truncated SVD algorithms for large matrices — ARC585/ARC713 territory",
          "Matrix completion and nuclear-norm optimization",
          "Model-selection theory for choosing rank from noisy data",
        ],
        nextArcBoundary:
          "Module 9 / SIDE267 returns to calculus and develops Taylor approximation/error control. Later ARC585 revisits QR, Cholesky, eigendecomposition and SVD as floating-point numerical algorithms, while ARC541 turns covariance eigenstructure/low-rank ideas into multivariate statistical methods such as PCA.",
      },
    },
  };
}
