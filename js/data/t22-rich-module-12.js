export function buildT22RichModule12(syllabusVersion) {
  return {
    moduleId: "ARC512",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build ordinary differential equations as models of continuous-time evolution, connect local rate laws to trajectories and initial conditions, solve representative first-order models, reason qualitatively from equilibria and phase lines, extend to coupled linear systems, use eigenstructure to classify dynamical stability, linearize nonlinear systems locally, and finish by separating mathematical model error from numerical evolution error.",
    moduleDestination:
      "The learner can formulate and analyze continuous-time dynamical models from rate laws; distinguish equations from trajectories and initial-value problems; solve and verify core first-order ODEs; classify equilibria and local stability; solve linear systems through matrix exponentials/eigenstructure at the intended level; linearize nonlinear systems near equilibria; and diagnose when an analytic, qualitative or numerical conclusion is invalid because assumptions, discretization or model structure fail.",
    entryPrerequisites: [
      "T22 Module 3 / ARC510: integration, antiderivatives, substitution and improper-integral basics",
      "T22 Module 5 / SIDE276: matrices, linear systems and matrix multiplication",
      "T22 Module 7 / SIDE279: eigenvalues, eigenvectors, diagonalization and linear dynamics",
      "T22 Module 10 / SIDE271: gradients/Jacobians, multivariable local linearity and second-order local reasoning",
      "Single-variable derivatives, chain rule, exponentials/logarithms and algebraic manipulation",
    ],
    explicitlyOutOfScope: [
      "Measure-theoretic dynamical systems, ergodic theory and advanced chaos",
      "Partial differential equations and infinite-dimensional evolution equations",
      "Laplace-transform technique as a large standalone computational catalogue",
      "Stochastic differential equations and Ito calculus",
      "Detailed numerical-analysis theory, adaptive integrators and stiffness algorithms — later numerical-computing modules own that depth",
      "Control theory, optimal control and state-estimation algorithms",
    ],
    arcs: {
      "T22-M12-A01": {
        focus: "From rate laws to differential equations.",
        roleRelevance:
          "Quantitative models often specify how a state changes locally rather than giving a closed-form trajectory; translating mechanisms into rate equations is the modelling step that precedes estimation or simulation.",
        purpose:
          "Make an ODE a precise statement that constrains a function through its derivative, not merely a symbolic equation containing dy/dt.",
        principalObstacle:
          "A local rate law describes admissible trajectories implicitly; the learner must separate state, independent variable, parameters and derivative relationships before solving anything.",
        entryPrerequisites: ["Single-variable derivative", "Functions", "Units/dimensional reasoning", "Basic modelling algebra"],
        target:
          "Construct first-order ODEs from verbal or mechanistic rate laws, identify state/parameters/domain, and verify whether a proposed trajectory satisfies the equation.",
        requiredMastery: [
          "Distinguish an algebraic relation from a differential equation",
          "Translate proportional-growth, decay, inflow/outflow or relaxation mechanisms into an ODE",
          "Track units so both sides of a rate equation are dimensionally compatible",
          "Substitute a candidate function and verify the ODE directly",
          "Identify autonomous versus explicitly time-dependent first-order equations",
          "Diagnose a model whose rate law has the wrong sign, units or dependency",
          "Transfer the formulation process to an unfamiliar evolving quantity",
        ],
        applicationScope:
          "One continuous-time growth, decay, inventory, price-adjustment or mean-reversion style mechanism formulated from first principles.",
        transferScope:
          "A new domain in which the mechanism is described verbally and the learner must determine the correct state and rate law without a template.",
        explicitlyOutOfScope: ["Solution techniques — A03", "Equilibrium analysis — A04", "Coupled systems — A05"],
        nextArcBoundary:
          "A02 adds initial conditions and uniqueness-of-trajectory reasoning so a differential equation becomes a well-posed trajectory question rather than a family of curves.",
      },
      "T22-M12-A02": {
        focus: "Initial conditions, solution families and trajectories.",
        roleRelevance:
          "A dynamic law alone usually leaves many admissible paths; research simulation and forecasting require a state at a reference time and clarity about whether that state determines a unique path.",
        purpose:
          "Distinguish general solutions from initial-value problems and understand the role of existence/uniqueness assumptions at a practical theorem-aware level.",
        principalObstacle:
          "Satisfying the same rate law does not identify one trajectory; an initial condition can select a member of a solution family only when the vector field is sufficiently well behaved.",
        entryPrerequisites: ["T22-M12-A01", "Function families", "Basic continuity/local reasoning"],
        target:
          "Use initial conditions to determine solution constants, interpret trajectories in state-time space, and recognize simple cases where uniqueness can fail.",
        requiredMastery: [
          "Distinguish a differential equation, a general solution and an initial-value problem",
          "Apply an initial condition to identify a trajectory within a solution family",
          "Verify both the ODE and the initial condition",
          "Explain why an initial state is essential for prediction",
          "State a practical local existence/uniqueness condition such as continuity plus local Lipschitz control in the state variable without pretending to prove the full theorem",
          "Analyze a standard non-Lipschitz counterexample where one initial condition admits more than one solution",
          "Transfer trajectory-selection reasoning to a new rate model",
        ],
        applicationScope:
          "One forecasting/simulation setup where two identical laws with different initial states generate different paths.",
        transferScope:
          "An unfamiliar first-order IVP requiring the learner to decide what data determine the trajectory and whether uniqueness is defensible.",
        explicitlyOutOfScope: ["Full Picard-Lindelof proof", "Boundary-value problems", "Numerical solvers — A08"],
        nextArcBoundary:
          "A03 develops exact solution structure for representative first-order equations and requires every symbolic solution to be checked against the original IVP.",
      },
      "T22-M12-A03": {
        focus: "First-order solvable models: separable and linear equations.",
        roleRelevance:
          "Closed-form benchmark models provide interpretable dynamics and ground truth against which later simulation, estimation and numerical procedures can be checked.",
        purpose:
          "Solve a compact but durable class of first-order ODEs through separation and integrating factors while preserving domain and constant-of-integration logic.",
        principalObstacle:
          "Mechanical manipulation can divide by a state value that may be zero, lose equilibrium solutions, ignore interval/domain restrictions or produce a formula that fails the original equation.",
        entryPrerequisites: ["T22-M12-A01-A02", "ARC510 integration and substitution", "Product rule", "Exponentials/logarithms"],
        target:
          "Solve and verify separable and first-order linear IVPs, including growth/decay and forced relaxation models, without losing special solutions or hiding domain restrictions.",
        requiredMastery: [
          "Recognize a separable equation and separate variables legally",
          "Identify values that cannot be divided out and check for lost equilibrium solutions",
          "Integrate both sides and handle constants consistently",
          "Derive the integrating-factor method from the product rule for y'+p(t)y=q(t)",
          "Apply an initial condition and verify the resulting solution in the original IVP",
          "Interpret transient versus forcing/steady components in a linear model",
          "Diagnose a formally manipulated solution that violates its original domain or equation",
          "Transfer the method choice to an unfamiliar first-order model",
        ],
        applicationScope:
          "Growth/decay, cooling/relaxation, inventory adjustment or mean-reverting deterministic benchmark models.",
        transferScope:
          "A first-order IVP presented without naming its type; the learner must identify structure, solve it and audit lost solutions/domain assumptions.",
        explicitlyOutOfScope: ["Large catalogues of Bernoulli/exact/Riccati tricks", "Laplace-transform tables", "Second-order constant-coefficient ODE catalogue"],
        nextArcBoundary:
          "A04 shifts from closed-form trajectories to qualitative dynamics: equilibria and phase-line reasoning when solving explicitly is unnecessary or impossible.",
      },
      "T22-M12-A04": {
        focus: "Equilibria and phase-line reasoning for autonomous scalar ODEs.",
        roleRelevance:
          "In research, long-run direction and stability often matter more than a closed form; phase-line analysis exposes those properties directly from the rate function.",
        purpose:
          "Infer qualitative trajectory behaviour from the sign and local structure of an autonomous rate law y'=f(y).",
        principalObstacle:
          "An equilibrium is defined by zero local drift, but stability depends on how nearby states move on both sides; solving f(y)=0 alone does not classify the dynamics.",
        entryPrerequisites: ["T22-M12-A01-A03", "Derivative sign reasoning", "One-variable local linearity"],
        target:
          "Find equilibria, construct phase lines, determine directional flow and classify attracting/repelling/semistable behaviour with explicit assumptions.",
        requiredMastery: [
          "Solve f(y*)=0 to locate equilibria",
          "Determine the sign of f between equilibria and draw directional flow",
          "Classify stable, unstable and semistable scalar equilibria from neighbouring trajectories",
          "Use f'(y*) as a local stability shortcut when the equilibrium is hyperbolic and explain why the zero-derivative case is inconclusive",
          "Use a nonlinear counterexample to show why f'(y*)=0 requires higher-order/sign analysis",
          "Reason about basins separated by unstable equilibria in one dimension",
          "Transfer phase-line analysis to an unfamiliar autonomous model without solving it explicitly",
        ],
        applicationScope:
          "One nonlinear saturation, population, adjustment or threshold model where equilibrium structure carries the main interpretation.",
        transferScope:
          "A new scalar autonomous rate law requiring qualitative classification from signs and local structure alone.",
        explicitlyOutOfScope: ["Global Lyapunov theory", "Bifurcation theory as a full topic", "Two-dimensional phase portraits — A05-A07"],
        nextArcBoundary:
          "A05 moves from one state variable to coupled linear systems, where a matrix replaces the scalar drift coefficient.",
      },
      "T22-M12-A05": {
        focus: "Coupled linear systems and matrix evolution.",
        roleRelevance:
          "Multi-factor adjustment, coupled inventories, linearized economic systems and state-space models all evolve several interacting variables simultaneously.",
        purpose:
          "Connect x'(t)=Ax(t) to the linear-algebra machinery already built, and construct trajectories from invariant modes rather than solving components independently by ad hoc elimination.",
        principalObstacle:
          "Coupled coordinates obscure the independent dynamical modes; the learner must recognize that eigenvectors identify directions preserved by the evolution while eigenvalues govern modal growth/decay/oscillation.",
        entryPrerequisites: ["T22 Module 7 / SIDE279", "T22-M12-A01-A04", "Matrix multiplication", "Exponentials"],
        target:
          "Solve diagonalizable constant-coefficient systems x'=Ax through eigenmodes, assemble initial conditions and interpret the matrix exponential as the evolution operator.",
        requiredMastery: [
          "Verify that v e^{lambda t} solves x'=Ax when Av=lambda v",
          "Construct the general solution from a complete eigenbasis",
          "Use the initial state to determine modal coefficients",
          "Explain e^{At} as the linear evolution map and connect diagonalization to e^{At}=P e^{Dt} P^{-1}",
          "Handle a real system with a complex-conjugate eigenpair at the level of real oscillatory trajectories",
          "Recognize that defective matrices require generalized machinery or direct matrix-exponential methods rather than pretending an eigenbasis exists",
          "Transfer modal decomposition to a new coupled linear model",
        ],
        applicationScope:
          "A small coupled linear factor, inventory, population or deterministic state-space system with interpretable modes.",
        transferScope:
          "An unfamiliar 2x2 or low-dimensional system requiring mode identification, trajectory construction and initial-state assembly.",
        explicitlyOutOfScope: ["Jordan normal form derivation", "Large-scale matrix exponential algorithms", "Discrete-time Markov chains"],
        nextArcBoundary:
          "A06 owns stability classification of linear continuous-time systems from eigenvalues, including the limits of eigenvalue-only shortcuts.",
      },
      "T22-M12-A06": {
        focus: "Eigenvalues and stability of linear continuous-time systems.",
        roleRelevance:
          "Whether perturbations decay, persist, oscillate or explode determines whether a dynamic model is usable for forecasting, filtering or local approximation.",
        purpose:
          "Translate modal solutions into precise continuous-time stability criteria and distinguish asymptotic stability from bounded/non-growing behaviour.",
        principalObstacle:
          "The sign criterion concerns real parts of continuous-time eigenvalues, and zero-real-part or defective cases require more care than the slogan 'negative eigenvalues stable'.",
        entryPrerequisites: ["T22-M12-A05", "SIDE279 eigenstructure", "Complex eigenvalue interpretation"],
        target:
          "Classify equilibrium stability for x'=Ax from spectral structure, justify the criterion from modal evolution, and identify marginal/defective edge cases where simplistic rules fail.",
        requiredMastery: [
          "Derive modal magnitude behaviour from e^{lambda t}",
          "State that all eigenvalues with strictly negative real part imply asymptotic stability for a finite-dimensional linear time-invariant system",
          "Show that any eigenvalue with positive real part yields an unstable direction",
          "Interpret nonzero imaginary parts as oscillation combined with exponential growth/decay",
          "Distinguish asymptotic stability from neutral/marginal behaviour when real parts are zero",
          "Explain why Jordan/defective structure can create polynomial growth when eigenvalues lie on the imaginary axis",
          "Compare continuous-time stability with the earlier discrete-time magnitude criterion |lambda|<1 without conflating them",
          "Transfer the classification to an unfamiliar low-dimensional system",
        ],
        applicationScope:
          "One coupled adjustment or local factor model whose practical interpretation changes under stable versus unstable parameter regimes.",
        transferScope:
          "A new matrix with mixed real/complex spectrum requiring a justified stability verdict and edge-case diagnosis.",
        explicitlyOutOfScope: ["Lyapunov equations", "Control-theoretic stabilizability", "Numerical eigenvalue conditioning — ARC585"],
        nextArcBoundary:
          "A07 uses Jacobian linearization to transfer the linear stability toolkit to nonlinear systems near equilibria, while making the local-only boundary explicit.",
      },
      "T22-M12-A07": {
        focus: "Nonlinear systems and local linearization.",
        roleRelevance:
          "Real quantitative systems are often nonlinear, but local Jacobian structure can still reveal short-range behaviour near an operating point or equilibrium.",
        purpose:
          "Use multivariable local linearity to approximate x'=f(x) near an equilibrium by perturbation dynamics u'=Ju and classify hyperbolic equilibria locally.",
        principalObstacle:
          "A Jacobian is only a local first-order model; its eigenvalues can classify hyperbolic equilibria locally but do not automatically describe global trajectories, distant basins or nonhyperbolic cases.",
        entryPrerequisites: ["T22 Module 10 / SIDE271 Jacobians", "T22-M12-A04-A06", "Multivariable local linearity"],
        target:
          "Find nonlinear equilibria, compute the Jacobian, derive perturbation dynamics and use its spectrum for justified local stability conclusions while recognizing inconclusive/nonhyperbolic cases.",
        requiredMastery: [
          "Solve f(x*)=0 for equilibria of a nonlinear autonomous system",
          "Write x=x*+u and derive u'=J(x*)u plus higher-order remainder at first order",
          "Compute the Jacobian at an equilibrium",
          "Use eigenvalue real parts to classify a hyperbolic equilibrium locally",
          "State why zero-real-part eigenvalues make linearization alone inconclusive",
          "Give or analyze a nonlinear example where identical/degenerate linearization hides different nonlinear stability behaviour",
          "Distinguish local stability from global attraction",
          "Transfer the workflow to an unfamiliar two-state nonlinear system",
        ],
        applicationScope:
          "A nonlinear adjustment, interaction or saturation model analyzed near an equilibrium rather than globally solved.",
        transferScope:
          "A novel low-dimensional nonlinear vector field requiring equilibrium finding, Jacobian construction, spectral classification and a careful statement of what remains unknown.",
        explicitlyOutOfScope: ["Center-manifold theory", "Hopf bifurcation theory", "Global Lyapunov analysis", "Chaos"],
        nextArcBoundary:
          "A08 closes the module by asking how trajectories are actually approximated computationally and how to distinguish numerical artifacts from failures of the underlying model.",
      },
      "T22-M12-A08": {
        focus: "Numerical evolution, discretization error and model failure.",
        roleRelevance:
          "Most research dynamics are simulated rather than solved symbolically; a researcher must know when an apparent trajectory is a property of the model and when it is a property of the discretization.",
        purpose:
          "Derive the forward-Euler update from local linearization, analyze its first-order error/stability behaviour on benchmark equations, and build a validation discipline for simulated ODE trajectories.",
        principalObstacle:
          "A numerical recurrence is a new discrete dynamical system; choosing a step size can change stability, accuracy and even qualitative behaviour relative to the continuous-time equation.",
        entryPrerequisites: ["T22-M12-A01-A07", "Local linear approximation", "Basic sequences/discrete iteration"],
        target:
          "Construct and audit simple numerical ODE evolution, use exact/qualitative benchmarks to diagnose discretization failure, and separate numerical error, parameter/model misspecification and genuine dynamics.",
        requiredMastery: [
          "Derive forward Euler x_{n+1}=x_n+h f(t_n,x_n) from first-order local linearization",
          "Compute Euler steps for scalar and small vector systems",
          "Compare a numerical trajectory against an exact solution or qualitative invariant when available",
          "Analyze the test equation y'=lambda y and derive Euler's amplification factor 1+h lambda",
          "Show with a concrete stable continuous-time example how an overly large step can make Euler numerically unstable",
          "Distinguish local truncation intuition from accumulated/global error at the intended level",
          "Perform step-halving or convergence checks as empirical diagnostics without treating them as proof",
          "Separate numerical instability, model misspecification and true dynamical instability in an unfamiliar case",
        ],
        applicationScope:
          "One small continuous-time research model simulated under multiple step sizes and checked against analytic or qualitative structure.",
        transferScope:
          "A new ODE simulation whose output looks plausible but must be challenged using units, invariants, exact benchmarks, step refinement and stability reasoning.",
        explicitlyOutOfScope: [
          "Runge-Kutta derivations and adaptive step-size controllers",
          "Stiffness theory and implicit solvers",
          "Production numerical ODE libraries and solver engineering",
          "Floating-point stability depth — owned by ARC585/ARC713",
        ],
        nextArcBoundary:
          "The mathematical-engine phase ends here. ARC515 next owns research programming foundations; ARC585 later returns to finite-precision numerical linear algebra, while later time-series/state-space modules own stochastic temporal models rather than continuous deterministic ODE theory.",
      },
    },
  };
}
