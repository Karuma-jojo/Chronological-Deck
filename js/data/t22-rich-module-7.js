export function buildT22RichModule7(syllabusVersion) {
  return {
    moduleId: "SIDE279",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build finite-dimensional eigenstructure as a structural language for linear operators. Begin from invariant directions, derive eigenvalues/eigenspaces from the fixed-direction condition, separate algebraic from geometric multiplicity, characterize diagonalizability and defective cases, prove the special structure of real symmetric matrices, and finish by interpreting eigenvalues/eigenvectors in repeated linear dynamics. The module must prepare covariance/PCA, quadratic forms, numerical eigensolvers and linear dynamical systems without stealing those later topics.",
    moduleDestination:
      "The learner can identify and justify invariant directions, derive and solve eigenvalue/eigenspace problems, reason correctly about repeated eigenvalues and multiplicities, determine whether a matrix is diagonalizable, diagnose defective matrices, prove/use the orthogonal eigenspace structure of real symmetric matrices, and analyze repeated linear dynamics through eigenmodes while keeping basis, multiplicity and complex-eigenvalue caveats explicit.",
    entryPrerequisites: [
      "T22 Module 4 / ARC511: vectors, span, independence, basis and dimension",
      "T22 Module 5 / SIDE276: linear transformations, matrix representation, determinants, null space/rank, invertibility, change of basis and similarity",
      "Polynomial algebra for low-degree characteristic equations",
      "Exact algebraic manipulation and systems solving",
    ],
    explicitlyOutOfScope: [
      "Quadratic forms, positive-semidefinite matrices, covariance geometry, SVD and low-rank approximation — owned by SIDE280",
      "Numerical eigenvalue algorithms, conditioning and floating-point stability — owned by ARC585",
      "Differential-equation phase portraits and continuous-time stability — owned by ARC512",
      "PCA as a statistical/data-analysis method — deferred to covariance/factorization/statistical modules",
      "Jordan canonical form and generalized eigenvectors",
      "Spectral theory for infinite-dimensional operators",
      "General complex inner-product-space theory beyond the minimum needed to interpret complex eigenvalues",
    ],
    arcs: {
      "T22-M07-A01": {
        focus: "Invariant directions: vectors whose direction is preserved by a linear transformation.",
        roleRelevance:
          "Repeated linear transformations, covariance maps, state transitions and factor models are easiest to interpret when directions evolve independently by simple scaling. Eigenstructure begins with that invariant-direction question, not with a determinant recipe.",
        purpose:
          "Create the need for eigenvectors by asking when a nonzero direction survives a linear transformation up to scalar rescaling, and distinguish preserved direction from fixed vector or preserved length.",
        principalObstacle:
          "Learners often conflate T(v)=v with T(v)=lambda v. The core idea is directional invariance: the output stays on the same one-dimensional subspace even when magnitude or sign changes.",
        entryPrerequisites: [
          "T22 Module 5 linear transformations and matrix-vector action",
          "Span of a single nonzero vector",
          "Scalar multiples and geometric vector interpretation",
        ],
        target:
          "Given an unfamiliar linear map, independently identify or refute candidate invariant directions, justify the scalar relation T(v)=lambda v, and explain what the associated scaling factor means under one application and repeated applications.",
        requiredMastery: [
          "State the invariant-direction condition using a nonzero vector v and scalar lambda",
          "Distinguish fixed vectors, invariant directions, preserved norm and preserved subspaces",
          "Verify a candidate direction by direct transformation and scalar comparison",
          "Refute an apparent invariant direction when transformed coordinates are not proportional",
          "Explain why every nonzero vector on span(v) shares the same one-dimensional invariant subspace when v is an eigenvector",
          "Recognize simple invariant directions from diagonal/triangular/geometric transformations without solving a characteristic polynomial",
          "Predict repeated action T^k(v)=lambda^k v once invariance is established",
          "Diagnose the invalid claim that any vector whose image points roughly the same way is an eigenvector",
          "Transfer invariant-direction reasoning to a state/exposure transformation with an interpretable persistent mode",
        ],
        applicationScope:
          "One small repeated-transformation problem where identifying a preserved direction simplifies multi-step behavior.",
        transferScope:
          "An unfamiliar geometric or coordinate linear map where invariant directions must be discovered structurally before any characteristic equation is introduced.",
        explicitlyOutOfScope: [
          "Characteristic polynomials and systematic eigenvalue computation — owned by A02",
          "Multiplicity — owned by A03",
          "Diagonalization — owned by A04",
          "General invariant subspace theory beyond one-dimensional eigendirections",
        ],
        nextArcBoundary:
          "A02 turns T(v)=lambda v into the singular-system condition (A-lambda I)v=0 and develops systematic eigenvalue/eigenspace computation.",
      },
      "T22-M07-A02": {
        focus: "Characteristic equation and eigenspaces from the singularity condition (A-lambda I)v=0.",
        roleRelevance:
          "Quantitative work often needs the modes of a linear operator rather than brute-force repeated multiplication. The characteristic equation provides a systematic route from a matrix to candidate scaling modes, while eigenspaces describe all directions associated with each mode.",
        purpose:
          "Derive the characteristic equation from the invariant-direction condition, compute eigenvalues for small matrices, and construct eigenspaces as null spaces with correct nonzero-vector logic.",
        principalObstacle:
          "det(A-lambda I)=0 is not a magic formula: it appears because a nonzero solution to (A-lambda I)v=0 exists exactly when A-lambda I is singular. The learner must keep eigenvalues, eigenvectors and eigenspaces logically separated.",
        entryPrerequisites: [
          "T22-M07-A01",
          "T22 Module 5 determinants, singularity, null spaces and linear systems",
          "Polynomial algebra for low-degree equations",
        ],
        target:
          "Given a small square matrix, derive its characteristic equation, solve for eigenvalues, construct a basis for each eigenspace from a null-space calculation, and verify the results directly in Av=lambda v.",
        requiredMastery: [
          "Derive (A-lambda I)v=0 from Av=lambda v",
          "Justify why a nonzero eigenvector exists exactly when A-lambda I is singular",
          "Derive det(A-lambda I)=0 from the singularity criterion",
          "Compute characteristic polynomials/eigenvalues for representative 2x2 and manageable 3x3 cases",
          "Compute each eigenspace as Null(A-lambda I) and provide a basis",
          "Distinguish the zero vector from admissible eigenvectors while recognizing it belongs to every eigenspace as a subspace element",
          "Verify computed eigenpairs by direct multiplication",
          "Use trace/determinant checks in small cases as consistency checks rather than substitutes for derivation",
          "Diagnose errors caused by sign conventions, solving only for lambda without eigenspaces, or using det(A)=lambda",
          "Transfer the workflow to an unfamiliar operator where the eigenmodes have an operational interpretation",
        ],
        applicationScope:
          "One exact small-matrix mode-extraction problem with explicit interpretation of both eigenvalue and eigenspace.",
        transferScope:
          "A matrix presented through a linear map or model where the learner must reconstruct and solve the eigenproblem rather than pattern-match a familiar matrix form.",
        explicitlyOutOfScope: [
          "Closed-form formulas for high-degree characteristic polynomials",
          "Numerical eigensolvers — owned by ARC585",
          "Generalized eigenvalue problems",
          "Multiplicity and diagonalization criteria — owned by A03-A04",
        ],
        nextArcBoundary:
          "A03 handles repeated eigenvalues and separates algebraic multiplicity from eigenspace dimension, which determines whether enough independent eigenvectors exist.",
      },
      "T22-M07-A03": {
        focus: "Algebraic multiplicity, geometric multiplicity and repeated eigenvalues.",
        roleRelevance:
          "Repeated modes are where rote eigenvalue computation stops being enough. Quant researchers need to know whether repeated roots correspond to multiple independent directions or to compressed/defective structure before using spectral coordinates or matrix powers.",
        purpose:
          "Distinguish multiplicity of a characteristic root from dimension of its eigenspace and establish the inequalities that control how many independent eigenvectors a repeated eigenvalue contributes.",
        principalObstacle:
          "A repeated eigenvalue does not automatically provide several independent eigenvectors. Algebraic multiplicity counts polynomial repetition; geometric multiplicity counts independent eigen-directions.",
        entryPrerequisites: [
          "T22-M07-A02",
          "T22 Module 4 dimension/independence",
          "T22 Module 5 nullity",
        ],
        target:
          "For matrices with repeated eigenvalues, independently compute algebraic and geometric multiplicities, justify their relationship, and determine how many independent eigenvectors each eigenvalue actually contributes.",
        requiredMastery: [
          "Define algebraic multiplicity as multiplicity of an eigenvalue as a characteristic-polynomial root",
          "Define geometric multiplicity as dim Null(A-lambda I)",
          "Show by examples that equal algebraic multiplicity can correspond to different eigenspace dimensions",
          "Use 1 <= geometric multiplicity <= algebraic multiplicity for each eigenvalue and explain why geometric multiplicity is at least one",
          "Compute both multiplicities in representative repeated-root cases",
          "Construct independent eigenvector bases for repeated-eigenvalue eigenspaces",
          "Diagnose the false claim that a double eigenvalue necessarily gives two eigenvectors",
          "Compare matrices with the same characteristic polynomial but different eigenspace structure",
          "Transfer multiplicity reasoning to decide whether a repeated mode can support independent coordinates in a model",
        ],
        applicationScope:
          "One repeated-mode matrix problem where the practical issue is whether the model supplies enough independent mode directions, not merely the repeated eigenvalue itself.",
        transferScope:
          "Two unfamiliar matrices sharing eigenvalue data but differing in null-space structure, requiring comparison through geometric multiplicity.",
        explicitlyOutOfScope: [
          "Jordan chains/generalized eigenvectors",
          "Perturbation theory for repeated eigenvalues",
          "Diagonalization as a full criterion — owned by A04",
        ],
        nextArcBoundary:
          "A04 asks whether the accumulated eigenspaces provide a full basis, and when they do, derives diagonalization and efficient matrix powers.",
      },
      "T22-M07-A04": {
        focus: "Diagonalization and matrix powers from a basis of eigenvectors.",
        roleRelevance:
          "Diagonal coordinates decouple repeated linear transformations into independent scalar modes. This is central to state evolution, covariance/factor reasoning and efficient theoretical analysis of matrix powers.",
        purpose:
          "Derive A=PDP^{-1} from an eigenvector basis, characterize diagonalizability by the existence of enough independent eigenvectors, and use the representation to compute powers and interpret decoupled modes.",
        principalObstacle:
          "Diagonalization is a basis-change statement, not a symbolic trick. P must be invertible because its columns form a basis of eigenvectors, and D records the corresponding eigenvalues in matching order.",
        entryPrerequisites: [
          "T22-M07-A01-A03",
          "T22 Module 5 change of basis/similarity and invertibility",
        ],
        target:
          "Determine whether a small matrix is diagonalizable, construct P and D when it is, prove the similarity relation from basis action, and use it to compute/interpret A^k without repeated brute-force multiplication.",
        requiredMastery: [
          "Explain why n independent eigenvectors of an n-dimensional operator form an eigenbasis",
          "Construct P from ordered eigenvectors and D from the matching eigenvalues",
          "Derive AP=PD and hence A=PDP^{-1}",
          "Use eigenspace dimensions to decide whether enough independent eigenvectors exist",
          "Recognize that n distinct eigenvalues guarantee diagonalizability while the converse need not hold",
          "Derive A^k=PD^kP^{-1} and use it in an exact repeated-transformation problem",
          "Track eigenvector/eigenvalue column order so P and D remain consistent",
          "Diagnose an attempted diagonalization with a singular P or insufficient eigenvectors",
          "Transfer diagonal-coordinate reasoning to a model where independent modes evolve at different rates",
        ],
        applicationScope:
          "One exact repeated-state/exposure transformation where diagonalization materially simplifies multi-step analysis.",
        transferScope:
          "An unfamiliar matrix with repeated or distinct eigenvalues requiring an evidence-based decision about diagonalizability before any power formula is used.",
        explicitlyOutOfScope: [
          "Defective-matrix fallback via Jordan form",
          "Numerical diagonalization/eigendecomposition algorithms",
          "Symmetric-matrix guarantees — owned by A06",
          "Continuous-time matrix exponentials beyond a brief conceptual pointer",
        ],
        nextArcBoundary:
          "A05 studies matrices that fail this criterion, making the meaning and consequences of defectiveness explicit without introducing Jordan canonical form.",
      },
      "T22-M07-A05": {
        focus: "Defective matrices: when eigenvectors do not span the space.",
        roleRelevance:
          "Assuming every matrix admits a complete eigenbasis can silently invalidate modal decompositions. Defective cases matter precisely because repeated linear dynamics can contain coupling that ordinary eigenvectors cannot fully decouple.",
        purpose:
          "Diagnose defectiveness from eigenspace dimensions, explain exactly why ordinary diagonalization fails, and reason about the consequences without importing generalized-eigenvector machinery.",
        principalObstacle:
          "Failure of diagonalization is structural, not computational bad luck. A matrix can have all eigenvalues known yet still lack enough independent eigenvectors to form a basis.",
        entryPrerequisites: [
          "T22-M07-A03-A04",
          "T22 Module 4 basis/dimension",
        ],
        target:
          "Given a small matrix, determine whether it is defective, prove the diagnosis from total eigenspace dimension, explain why no invertible eigenvector matrix P can exist, and compare its repeated action with a diagonalizable matrix having similar eigenvalue data.",
        requiredMastery: [
          "Define defectiveness as failure to possess a complete eigenvector basis",
          "Diagnose defectiveness when the total number of independent eigenvectors is less than the space dimension",
          "Show explicitly why the candidate eigenvector matrix P is singular or incomplete",
          "Construct or analyze a canonical 2x2 repeated-eigenvalue defective example",
          "Compare a defective matrix with a diagonalizable matrix sharing the same repeated eigenvalue",
          "Explain why eigenvalues alone do not determine diagonalizability or full repeated dynamics",
          "Recognize that ordinary eigenvector coordinates cannot fully decouple the operator",
          "Diagnose the invalid move of inventing a second copy of the same eigenvector to fill P",
          "Transfer defectiveness reasoning to a model where a claimed modal decomposition lacks enough independent modes",
        ],
        applicationScope:
          "One repeated-state problem where recognizing defectiveness prevents an invalid diagonal-mode calculation.",
        transferScope:
          "An unfamiliar repeated-root matrix where the learner must decide whether failure is arithmetic, multiplicity-related, or genuinely defective.",
        explicitlyOutOfScope: [
          "Jordan canonical form",
          "Generalized eigenvectors and Jordan chains",
          "Matrix-function formulas for defective matrices",
          "Perturbation sensitivity/pseudospectra",
        ],
        nextArcBoundary:
          "A06 identifies a major class—real symmetric matrices—for which defectiveness disappears and orthogonal eigenbases are guaranteed.",
      },
      "T22-M07-A06": {
        focus: "Real symmetric matrices and the spectral theorem: orthogonal eigenspaces and orthogonal diagonalization.",
        roleRelevance:
          "Covariance matrices, Hessians and many quadratic models are symmetric. Their eigenvectors can be chosen orthonormally, giving stable geometric coordinates and making eigenvalues directly interpretable as directional action.",
        purpose:
          "Prove the key finite-dimensional consequences of symmetry: real eigenvalues, orthogonality of eigenvectors for distinct eigenvalues, and existence of an orthonormal eigenbasis; use these to obtain A=QDQ^T.",
        principalObstacle:
          "The spectral theorem is stronger than ordinary diagonalizability. Symmetry links the operator to the inner product, forcing orthogonality structure that arbitrary matrices do not possess.",
        entryPrerequisites: [
          "T22-M07-A01-A05",
          "T22 Module 6 orthogonality and orthonormal bases",
          "T22 Module 5 transpose and change-of-basis reasoning",
        ],
        target:
          "For real symmetric matrices, independently prove/use orthogonality of distinct-eigenvalue eigenspaces, explain why an orthonormal eigenbasis exists in finite dimensions, construct orthogonal diagonalizations in small cases, and contrast these guarantees with arbitrary matrices.",
        requiredMastery: [
          "Use A^T=A to derive <Av,w>=<v,Aw>",
          "Prove that eigenvectors associated with distinct real eigenvalues are orthogonal",
          "Explain why real symmetric matrices have real eigenvalues",
          "Within repeated-eigenvalue eigenspaces, choose an orthonormal basis using prior orthogonality tools",
          "State and use the finite-dimensional real spectral theorem",
          "Construct Q with orthonormal eigenvector columns and verify Q^{-1}=Q^T",
          "Derive A=QDQ^T and interpret the action as rotate/reflect coordinates -> scale eigenmodes -> return",
          "Diagnose the false claim that eigenvectors of every matrix are orthogonal",
          "Transfer the theorem to a symmetric model matrix while explicitly deferring PSD/covariance interpretations to SIDE280",
        ],
        applicationScope:
          "One symmetric-operator decomposition problem where orthogonal eigen-coordinates simplify interpretation without yet invoking quadratic forms or covariance statistics.",
        transferScope:
          "An unfamiliar matrix requiring first verification of symmetry, then use—or rejection—of spectral-theorem guarantees.",
        explicitlyOutOfScope: [
          "Positive-semidefinite matrices and covariance structure — owned by SIDE280",
          "PCA as a statistical method",
          "SVD for nonsymmetric/rectangular matrices — owned by SIDE280",
          "Numerical symmetric eigensolvers — owned by ARC585",
          "Complex Hermitian spectral theorem",
        ],
        nextArcBoundary:
          "A07 uses eigenmodes to analyze repeated discrete-time linear dynamics; SIDE280 next extends spectral structure to quadratic forms, PSD matrices and SVD.",
      },
      "T22-M07-A07": {
        focus: "Eigenstructure in discrete linear dynamics: modal growth, decay, sign alternation and oscillatory behavior.",
        roleRelevance:
          "State-space models, iterative algorithms, Markov-style updates and repeated exposure transformations all depend on how eigenmodes evolve under repeated matrix action. Spectral growth rates often determine long-run behavior.",
        purpose:
          "Use eigenstructure to analyze x_{t+1}=Ax_t in discrete time, decompose initial states into modes when an eigenbasis exists, and classify long-run behavior from eigenvalue magnitude/sign while stating limitations for defective or complex cases.",
        principalObstacle:
          "Long-run behavior depends on both eigenvalues and how the initial state projects onto corresponding eigenvectors. A large eigenvalue is irrelevant if its mode is absent, and complex/defective cases require care beyond a naive largest-eigenvalue slogan.",
        entryPrerequisites: [
          "T22-M07-A01-A06",
          "T22 Module 5 matrix powers/change of basis",
          "Basic sequences and powers",
        ],
        target:
          "For small discrete linear systems, decompose initial conditions into eigenmodes when justified, derive x_t=A^t x_0 through spectral coordinates, classify mode behavior from eigenvalue magnitude/sign, and explain the limitations of the analysis when diagonalizability or real eigenstructure fails.",
        requiredMastery: [
          "Expand an initial state in an eigenbasis and derive x_t=sum c_i lambda_i^t v_i",
          "Classify a real eigenmode with |lambda|<1 as decaying, |lambda|>1 as growing, lambda=1 as persistent, lambda=-1 as sign-alternating, and lambda=0 as extinguished after one step",
          "Handle mixtures of modes and identify asymptotically dominant contributions when their coefficients are nonzero",
          "Explain why the initial condition matters through modal coefficients",
          "Use diagonalization to compute and interpret finite-horizon and long-run states",
          "Recognize that complex conjugate eigenvalues can encode rotation/oscillation and state this qualitatively without developing full complex modal theory",
          "Recognize that defective matrices invalidate a simple full eigenbasis decomposition",
          "Diagnose the false claim that the eigenvalue of largest magnitude always determines every trajectory",
          "Transfer spectral-dynamics reasoning to an iterative quantitative model with explicit caveats",
        ],
        applicationScope:
          "One discrete-time state-transition or iterative-model problem requiring modal decomposition, long-run classification and an initial-condition sensitivity check.",
        transferScope:
          "An unfamiliar repeated linear update where the learner must decide whether eigenanalysis applies cleanly, identify relevant modes and defend the long-run claim.",
        explicitlyOutOfScope: [
          "Continuous-time differential-equation stability and matrix exponentials — owned by ARC512",
          "Markov-chain stationary distributions/mixing as a full probability topic",
          "Numerical power iteration/eigensolvers — owned by ARC585",
          "Nonlinear dynamical systems and local linearization — owned by ARC512",
          "Jordan-form dynamics for defective matrices",
        ],
        nextArcBoundary:
          "SIDE280 next develops quadratic forms, PSD/covariance structure and matrix factorizations. ARC512 later reuses eigenvalues for continuous-time coupled differential equations and stability; ARC585 later addresses numerical eigen-computation.",
      },
    },
  };
}
