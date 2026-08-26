export function buildT22RichModule6(syllabusVersion) {
  return {
    moduleId: "SIDE278",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Add inner-product geometry to the exact linear-algebra machinery of Module 5. Build orthogonality and orthonormal coordinates, derive projection as the nearest-point construction onto a subspace, construct orthonormal bases by Gram-Schmidt, and derive least squares from projection geometry. The module should make residual orthogonality and normal equations structurally inevitable while stopping before numerical QR algorithms and full statistical regression.",
    moduleDestination:
      "The learner can reason with inner products and orthogonality, construct and verify orthogonal projections onto finite-dimensional subspaces, derive and execute Gram-Schmidt while diagnosing dependence, and formulate/solve exact least-squares problems from geometric first principles with explicit residual orthogonality, existence and uniqueness conditions.",
    entryPrerequisites: [
      "T22 Module 4 / ARC511: dot products, norms, angles, span, independence, basis and dimension",
      "T22 Module 5 / SIDE276: matrix-vector action, linear systems, column space, null space, rank and invertibility",
      "Exact algebraic manipulation and finite sums",
      "Comfort moving between vector, subspace and matrix viewpoints",
    ],
    explicitlyOutOfScope: [
      "Eigenvalues, eigenspaces, diagonalization and the spectral theorem — owned by SIDE279",
      "QR factorization as a matrix factorization and numerical QR algorithms — owned by SIDE280 and ARC585",
      "SVD, pseudoinverse and rank-deficient numerical least squares — owned by SIDE280",
      "Floating-point conditioning, stability and algorithm selection — owned by ARC585",
      "Statistical linear regression assumptions, inference, diagnostics and research workflow — owned by ARC539",
      "Weighted/generalized least squares and covariance-weighted geometry",
      "Infinite-dimensional Hilbert-space projection theory",
    ],
    arcs: {
      "T22-M06-A01": {
        focus: "Inner products, orthogonality and orthonormal sets as geometric structure for coordinates and decomposition.",
        roleRelevance:
          "Orthogonality is the geometry behind decorrelated directions, residual decomposition, projection, QR methods and many covariance/eigenvector constructions used in quantitative research.",
        purpose:
          "Turn the dot-product intuition from Module 4 into a precise toolkit for perpendicularity, orthonormal coordinates, Pythagorean decomposition and orthogonal complements.",
        principalObstacle:
          "Orthogonality is not merely a visual right angle. The learner must control which space vectors live in, prove coefficient formulas for orthonormal expansions, and distinguish pairwise orthogonality, orthonormality, independence and spanning.",
        entryPrerequisites: [
          "T22 Module 4 dot products, norms, angles, span and basis",
          "T22 Module 5 subspaces and dimension",
        ],
        target:
          "Given vectors and subspaces in finite-dimensional Euclidean space, independently establish orthogonality relations, construct/verify orthonormal sets, compute orthonormal expansion coefficients, and reason with orthogonal complements and Pythagorean identities.",
        requiredMastery: [
          "State and use orthogonality as inner product zero, with correct zero-vector caveats",
          "Prove that a nonzero orthogonal set is linearly independent",
          "Distinguish orthogonal from orthonormal and normalize a valid orthogonal set",
          "Derive coefficients c_i=<v,q_i> for expansion in an orthonormal basis rather than quote them",
          "Prove the finite Pythagorean identity for orthogonal sums and use it to compare norms",
          "Define the orthogonal complement W^perp and verify that it is a subspace",
          "Show that a vector orthogonal to every member of a spanning set is orthogonal to the whole span",
          "Diagnose false claims such as pairwise nonzero angles implying independence or zero inner product implying one vector is zero",
          "Transfer orthogonality reasoning to a collection of signal/exposure directions where coordinate contributions must separate cleanly",
        ],
        applicationScope:
          "One decomposition problem where orthonormal coordinates make contributions auditable and norm-squared separates additively.",
        transferScope:
          "An unfamiliar subspace/vector configuration where the learner must determine what is orthogonal, what spans what, and which coefficient formula is justified.",
        explicitlyOutOfScope: [
          "Projection formulas — owned by A02",
          "Gram-Schmidt construction — owned by A03",
          "Least squares — owned by A04",
          "General abstract inner-product spaces beyond finite-dimensional Euclidean examples",
        ],
        nextArcBoundary:
          "A02 uses orthogonality to characterize the unique nearest point in a subspace and derives projection formulas from the residual condition.",
      },
      "T22-M06-A02": {
        focus: "Orthogonal projection onto a subspace as the nearest-point decomposition v=p+r with p in W and r perpendicular to W.",
        roleRelevance:
          "Projection is the core geometry behind least squares, regression fitted values/residuals, factor exposure decomposition, PCA coordinates and many approximation methods.",
        purpose:
          "Derive projection from a geometric optimality condition, construct it for orthonormal and general full-rank bases, and prove the nearest-point property rather than treating projection as a memorized formula.",
        principalObstacle:
          "The projection coefficients depend on the chosen basis geometry. The simple sum <v,q_i>q_i is valid for an orthonormal basis, while a general basis requires solving orthogonality conditions; confusing the two produces silently wrong answers.",
        entryPrerequisites: [
          "T22-M06-A01",
          "T22 Module 5 matrix products, linear systems, column space and rank",
        ],
        target:
          "For a finite-dimensional subspace described by an orthonormal basis or a full-column-rank matrix A, independently derive and compute the orthogonal projection of a vector and prove that the residual is orthogonal and the projected point minimizes Euclidean distance.",
        requiredMastery: [
          "Derive proj_W(v)=sum <v,q_i>q_i for an orthonormal basis {q_i}",
          "Verify p in W and v-p in W^perp as the defining projection conditions",
          "Prove uniqueness of the orthogonal decomposition into W and W^perp",
          "Prove the nearest-point property using orthogonal decomposition/Pythagoras",
          "For full-column-rank A, derive A^T(v-Ac)=0 and solve (A^T A)c=A^T v for projection coefficients",
          "Derive the projection matrix P=A(A^T A)^{-1}A^T under full-column-rank hypotheses and explain why the hypothesis matters",
          "Verify structural identities P^2=P and P^T=P for an orthogonal projector",
          "Diagnose misuse of the orthonormal-basis coefficient formula on a nonorthogonal basis",
          "Transfer projection to a model where an observation is decomposed into explainable subspace component plus orthogonal residual",
        ],
        applicationScope:
          "One exact approximation/decomposition task using a nontrivial subspace, including interpretation of the orthogonal residual.",
        transferScope:
          "A differently represented subspace—basis vectors, column matrix or geometric constraints—requiring reconstruction of the correct projection method and hypotheses.",
        explicitlyOutOfScope: [
          "Least-squares model formulation as a full problem — owned by A04",
          "Weighted projections / generalized inner products",
          "Pseudoinverse for rank-deficient A — owned by SIDE280",
          "Numerical conditioning or stable projector computation",
        ],
        nextArcBoundary:
          "A03 constructs orthonormal bases from arbitrary independent spanning sets, supplying the geometry that makes projection and later QR methods especially clean.",
      },
      "T22-M06-A03": {
        focus: "Gram-Schmidt orthogonalization as repeated subtraction of already-explained orthogonal components.",
        roleRelevance:
          "Orthonormal bases improve geometric transparency and underpin QR factorization, stable least-squares methods and orthogonal coordinate systems used throughout quantitative computing.",
        purpose:
          "Derive Gram-Schmidt from projection, execute it exactly, prove span preservation and orthogonality, and detect what happens when the input set is dependent or nearly dependent.",
        principalObstacle:
          "The procedure is not arbitrary algebra: at each stage the new direction must remove every component in the span already built while preserving the cumulative span. A zero residual signals dependence, not a computational inconvenience.",
        entryPrerequisites: [
          "T22-M06-A01-A02",
          "T22 Module 4 independence and basis",
        ],
        target:
          "Given an ordered finite set of vectors, derive and execute Gram-Schmidt, prove that each stage preserves the appropriate span, normalize to an orthonormal basis when possible, and correctly diagnose dependence from a zero orthogonalized vector.",
        requiredMastery: [
          "Derive the kth orthogonalized vector by subtracting projections onto previously constructed orthogonal directions",
          "Compute Gram-Schmidt exactly on a nontrivial independent set",
          "Prove pairwise orthogonality of the constructed nonzero vectors",
          "Prove span(v_1,...,v_k)=span(u_1,...,u_k) at each stage",
          "Normalize the orthogonal outputs and verify orthonormality",
          "Explain why a zero new residual is equivalent to the new input lying in the span of earlier inputs",
          "Track order dependence: different input orders can produce different orthonormal bases for the same subspace",
          "Diagnose an incorrect implementation that subtracts only one prior component or uses already-normalized/non-normalized formulas inconsistently",
          "Transfer the algorithm to constructing clean basis directions for a small feature/exposure subspace",
        ],
        applicationScope:
          "One basis-cleaning problem where the learner must preserve a target span while producing orthonormal coordinates and interpreting any dependence encountered.",
        transferScope:
          "An unfamiliar ordered spanning set with awkward coordinates requiring structural checks, not just arithmetic execution.",
        explicitlyOutOfScope: [
          "QR factorization as a named matrix factorization — owned by SIDE280",
          "Modified Gram-Schmidt and floating-point stability — owned by ARC585",
          "Householder/Givens methods",
          "Eigenvector orthogonalization and spectral theorem",
        ],
        nextArcBoundary:
          "A04 uses projection geometry to solve inconsistent linear systems optimally, deriving least squares and normal equations; later SIDE280 packages orthonormalization as QR factorization.",
      },
      "T22-M06-A04": {
        focus: "Least squares as orthogonal projection of an unattainable target onto a model column space.",
        roleRelevance:
          "Least squares is foundational for regression, calibration, approximation, factor fitting and many estimation procedures. Quant research needs the geometry and failure conditions before statistical inference or numerical implementation.",
        purpose:
          "Derive least-squares optimality from residual orthogonality, connect it to projection onto Col(A), derive normal equations and characterize when the coefficient vector is unique.",
        principalObstacle:
          "When Ax=b has no exact solution, least squares does not make the residual vanish; it makes the residual orthogonal to every model direction. The fitted vector may be unique even when coefficients are not, and normal-equation inversion requires full column rank.",
        entryPrerequisites: [
          "T22-M06-A01-A03",
          "T22 Module 5 linear systems, column space, null space and rank",
        ],
        target:
          "Given an inconsistent linear model Ax≈b, independently formulate the Euclidean least-squares problem, derive A^T(Ax-b)=0 from projection geometry, solve it exactly under appropriate rank conditions, and explain fitted-value/residual uniqueness separately from coefficient uniqueness.",
        requiredMastery: [
          "Formulate least squares as minimizing ||Ax-b||^2 and interpret Ax as a point in Col(A)",
          "Derive residual orthogonality A^T(b-Ax_hat)=0 from the nearest-point condition",
          "Derive the normal equations A^T A x_hat=A^T b without treating them as a black-box formula",
          "Prove that full column rank makes A^T A invertible and hence the coefficient minimizer unique",
          "Distinguish uniqueness of the projected fitted vector from possible nonuniqueness of coefficient representations when columns are dependent",
          "Compute an exact small least-squares fit and verify the residual is orthogonal to every column of A",
          "Use Pythagorean decomposition to justify global minimality of the residual norm",
          "Diagnose invalid use of (A^T A)^{-1} when A lacks full column rank",
          "Construct a counterexample showing multiple coefficient vectors can give the same least-squares fitted value",
          "Transfer the geometry to a small calibration/factor-fitting problem and explain what the residual means operationally",
        ],
        applicationScope:
          "One overdetermined calibration or signal-fitting problem requiring formulation, exact solution, residual checks and interpretation; not statistical inference.",
        transferScope:
          "An unfamiliar approximation problem in which exact solvability fails and the learner must recognize a column-space projection problem, derive the optimality condition and audit rank assumptions.",
        explicitlyOutOfScope: [
          "Regression sampling assumptions, standard errors, hypothesis tests, leverage and diagnostics — owned by ARC539",
          "QR-based least squares algorithms — owned by SIDE280 and ARC585",
          "SVD/pseudoinverse solutions for rank-deficient problems — owned by SIDE280",
          "Weighted/generalized/nonlinear least squares",
          "Regularization such as ridge/lasso",
        ],
        nextArcBoundary:
          "SIDE279 next develops invariant directions and eigenstructure from Module-5 linear maps. SIDE280 later returns to orthogonality/least squares through QR, SVD and pseudoinverses; ARC539 later turns least squares into a statistical regression research framework.",
      },
    },
  };
}
