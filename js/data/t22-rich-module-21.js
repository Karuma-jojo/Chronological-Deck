export function buildT22RichModule21(syllabusVersion) {
  return {
    moduleId: "ARC517",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Build random variables and probability distributions as mathematical models of uncertain numerical quantities: map outcomes into values, represent discrete and continuous laws correctly, move between PMF/PDF/CDF views, derive expectations and dispersion, transform variables, reason about joint and conditional structure, quantify dependence, and recognize canonical distribution families from their generating mechanisms rather than from formula shape alone.",
    moduleDestination:
      "The learner can define random variables on explicit probability spaces; construct and validate PMFs, PDFs and CDFs; compute and interpret expectations, variances and selected moments; derive distributions under transformations; obtain marginals and conditional laws from joint models; test independence; compute and critique covariance/correlation; and choose or reject canonical distributions by support, mechanism, parameters and tail/shape implications.",
    entryPrerequisites: [
      "ARC048 probability foundations: events, conditional probability, independence and expectation intuition",
      "ARC503 sampling foundations: populations, samples and empirical distributions",
      "Single-variable calculus through integration and change of variables",
      "Basic algebra, functions, inequalities and summation notation",
    ],
    explicitlyOutOfScope: [
      "Estimator sampling distributions, bias/variance/MSE, standard errors and confidence intervals — ARC504",
      "LLN, CLT, concentration inequalities and asymptotic approximation — ARC712",
      "Likelihood, MLE, score functions and Fisher information — ARC531/ARC533",
      "Multivariate normal geometry, covariance matrices and PCA — ARC541",
      "Monte Carlo estimators and variance-reduction methods — ARC513",
      "Measure-theoretic probability, sigma-algebra construction and Radon-Nikodym theory",
    ],
    arcs: {
      "T22-M21-A01": {
        focus: "Random variables as numerical functions of outcomes, with support and induced events made explicit.",
        roleRelevance:
          "Quant models usually operate on returns, counts, prices, waiting times or losses rather than raw outcome labels; the random-variable map is what converts an event model into a numerical object that can be summarized and transformed.",
        purpose:
          "Separate the underlying probability experiment from the numerical quantity extracted from it and show how probabilities of numerical statements are inherited from events in the sample space.",
        principalObstacle:
          "A random variable is not 'a variable that changes randomly' in isolation; it is a function on outcomes, and different outcome models can induce the same numerical distribution while different functions on one experiment can induce different distributions.",
        entryPrerequisites: ["ARC048 sample spaces and events", "Functions and inverse images", "Basic set notation"],
        target:
          "Given a probability experiment and a numerical quantity of interest, define the random variable, determine its support, and translate numerical events such as X <= x or X in A back to outcome events whose probabilities can be evaluated.",
        requiredMastery: [
          "Define a random variable explicitly as a function from outcomes to numerical values",
          "Identify the support/range relevant to the induced distribution",
          "Translate statements about X into events in the underlying sample space",
          "Construct two different random variables on the same experiment and compare their induced events",
          "Show by counterexample why the outcome space and the value space must not be conflated",
          "Transfer the mapping idea to an unfamiliar return, payoff, count or waiting-time quantity",
        ],
        applicationScope:
          "Finite or conceptually simple experiments where a raw outcome is converted into a research-relevant numerical quantity such as P&L, count, score or duration.",
        transferScope:
          "A new domain where the learner must identify the underlying outcome, define the numerical map and reason through induced events rather than jumping directly to a distribution formula.",
        explicitlyOutOfScope: ["Measure-theoretic measurability", "General stochastic processes", "Named distribution families"],
        nextArcBoundary:
          "A02 owns the probability law of a discrete random variable through probability mass functions.",
      },
      "T22-M21-A02": {
        focus: "Discrete random variables, probability mass functions and probability by summation.",
        roleRelevance:
          "Counts, categories encoded numerically and finite scenario outcomes are ubiquitous in empirical research; a valid PMF is the exact probabilistic accounting object for such quantities.",
        purpose:
          "Build discrete distributions from induced outcome probabilities and enforce normalization/nonnegativity before any summary calculation.",
        principalObstacle:
          "A table or formula over possible values is not automatically a probability law: support, nonnegativity and total mass one are structural requirements, and event probabilities require summing the correct mass rather than manipulating values as if they were densities.",
        entryPrerequisites: ["T22-M21-A01", "ARC048 probability rules", "Finite/infinite sums at a working level"],
        target:
          "Construct, validate and use a PMF for a discrete random variable, including deriving it from a simple underlying experiment and computing event probabilities by summation over support.",
        requiredMastery: [
          "Derive a PMF from an explicit outcome model",
          "Check support, nonnegativity and normalization",
          "Compute probabilities of compound numerical events by summing appropriate masses",
          "Recover point probabilities and recognize atoms",
          "Diagnose an invalid PMF and repair it when possible",
          "Distinguish probability mass at a point from continuous density height",
          "Transfer PMF construction to an unfamiliar discrete mechanism",
        ],
        applicationScope:
          "Counts, finite scenario payoffs, defaults, fills, arrivals in a fixed trial structure and other discrete research quantities.",
        transferScope:
          "A new discrete mechanism whose law must be derived from the generating experiment rather than matched to a memorized named family.",
        explicitlyOutOfScope: ["Continuous densities", "Generating functions", "Asymptotic approximations"],
        nextArcBoundary:
          "A03 owns continuous random variables and probability density as probability-per-unit rather than point mass.",
      },
      "T22-M21-A03": {
        focus: "Continuous random variables, probability density and probability as area/integral.",
        roleRelevance:
          "Returns, measurement errors, durations and model parameters are often idealized continuously; researchers must interpret density correctly to avoid treating density height as probability.",
        purpose:
          "Construct continuous probability laws with valid density functions and connect interval probabilities to integration.",
        principalObstacle:
          "For a continuous variable, f(x) is generally not P(X=x); point probability can be zero while intervals have positive probability, and density may exceed one without violating probability axioms.",
        entryPrerequisites: ["T22-M21-A01-A02", "Definite integrals", "Nonnegative functions"],
        target:
          "Validate a candidate PDF, normalize simple density families, compute interval probabilities by integration, and explain precisely why density height and point probability are different objects.",
        requiredMastery: [
          "Check support, nonnegativity and unit integral for a PDF",
          "Determine a normalizing constant in a simple density",
          "Compute interval/tail probabilities by integration",
          "Explain why P(X=x)=0 for an absolutely continuous law while f(x) may be positive",
          "Construct a counterexample with density greater than one but valid total probability",
          "Diagnose dimensional/unit implications of density values",
          "Transfer density reasoning to an unfamiliar continuous quantity",
        ],
        applicationScope:
          "Idealized continuous returns, errors, waiting times and other scalar quantities where interval probabilities matter.",
        transferScope:
          "A new density shape requiring normalization, support discipline and probability-by-integration rather than formula recognition.",
        explicitlyOutOfScope: ["Mixed discrete-continuous laws in full generality", "Measure-theoretic density theory", "Kernel density estimation"],
        nextArcBoundary:
          "A04 owns the cumulative distribution function as a representation that works for both discrete and continuous laws.",
      },
      "T22-M21-A04": {
        focus: "Cumulative distribution functions as a universal representation of one-dimensional probability laws.",
        roleRelevance:
          "Quantiles, tail probabilities, threshold events and distribution comparisons are naturally expressed through CDFs, including cases where a density is unavailable or inappropriate.",
        purpose:
          "Unify discrete and continuous distribution reasoning through F(x)=P(X<=x) and its structural properties.",
        principalObstacle:
          "A CDF must be globally coherent—nondecreasing, right-continuous and with correct limiting values—and jumps encode point mass while smooth regions encode continuous accumulation.",
        entryPrerequisites: ["T22-M21-A02-A03", "Limits at an intuitive/operational level", "Piecewise functions"],
        target:
          "Construct and validate CDFs from PMFs or PDFs, recover probabilities from CDF differences, interpret jumps, and move between CDF and PMF/PDF representations where mathematically justified.",
        requiredMastery: [
          "Construct a CDF from a discrete PMF",
          "Construct a CDF from a continuous PDF by integration",
          "Check monotonicity, right-continuity and limiting behavior",
          "Recover interval and tail probabilities from CDF values with endpoint care",
          "Recover point masses from CDF jumps and densities from derivatives where differentiability holds",
          "Diagnose a function that cannot be a CDF",
          "Transfer CDF reasoning to a mixed-looking or piecewise unfamiliar law without assuming a density exists everywhere",
        ],
        applicationScope:
          "Threshold exceedance, quantile-style reasoning and comparison of scalar distributions using cumulative probabilities.",
        transferScope:
          "A law presented in an unfamiliar representation where the learner must use CDF structure to determine valid probabilities and atoms.",
        explicitlyOutOfScope: ["Formal weak convergence of CDFs", "Empirical-process theory", "Copulas"],
        nextArcBoundary:
          "A05 owns expectation as a probability-weighted functional of a random variable rather than merely an arithmetic average of observed data.",
      },
      "T22-M21-A05": {
        focus: "Expectation as probability-weighted value and as a linear functional.",
        roleRelevance:
          "Expected return, expected loss, expected utility proxies and model-implied averages are foundational research quantities; linearity makes complex models tractable even without independence.",
        purpose:
          "Generalize the finite fair-game expectation from ARC048 to arbitrary discrete/continuous random variables and functions of them.",
        principalObstacle:
          "Expectation is neither the most likely value nor a guaranteed future observation, may lie outside the support, and need not exist; moreover linearity of expectation does not require independence.",
        entryPrerequisites: ["T22-M21-A02-A04", "Sums and integrals", "ARC048 expectation intuition"],
        target:
          "Compute and interpret E[X] and E[g(X)] from a PMF/PDF, derive and use linearity, and check existence/integrability rather than assuming every distribution has a finite mean.",
        requiredMastery: [
          "Compute expectation for discrete and continuous laws",
          "Compute E[g(X)] directly from the law of X without unnecessarily deriving the full law of g(X)",
          "Derive linearity of expectation from sums/integrals",
          "Explain why linearity does not require independence",
          "Distinguish expectation from mode, median and guaranteed outcome",
          "Diagnose a heavy-tail example where a proposed mean diverges or is undefined",
          "Transfer expectation reasoning to an unfamiliar payoff or loss transformation",
        ],
        applicationScope:
          "Expected payoff, cost, count, duration or transformed risk quantity under an explicitly specified probability law.",
        transferScope:
          "A new payoff/function of a known random variable where the most efficient route is to compute its expectation from the original law.",
        explicitlyOutOfScope: ["Conditional expectation depth — A09", "Estimator expectations/bias — ARC504", "Expected utility theory"],
        nextArcBoundary:
          "A06 owns dispersion and higher moments around the distribution's center.",
      },
      "T22-M21-A06": {
        focus: "Variance, standard deviation and moments as distributional summaries with existence conditions.",
        roleRelevance:
          "Volatility and dispersion measures are central in quantitative work, but their algebra and limitations must be understood before covariance matrices, estimation or risk models are credible.",
        purpose:
          "Derive variance from squared deviation, connect it to E[X^2]-E[X]^2, establish shift/scale behavior and treat moments as model-dependent quantities rather than automatic finite numbers.",
        principalObstacle:
          "Variance is an expectation of squared deviation, not an average absolute error; it changes quadratically with scale, is invariant to shifts, and can fail to exist even when the distribution itself is valid.",
        entryPrerequisites: ["T22-M21-A05", "Algebraic expansion", "Squares and square roots"],
        target:
          "Derive and compute variance/standard deviation, reason about raw and central moments, and diagnose when moment-based summaries are misleading or nonexistent.",
        requiredMastery: [
          "Derive Var(X)=E[X^2]-E[X]^2 when the relevant moments exist",
          "Prove Var(aX+b)=a^2 Var(X) and SD(aX+b)=|a| SD(X)",
          "Compute variance from PMFs/PDFs in representative cases",
          "Distinguish raw moments from central moments and interpret low-order examples",
          "Explain why standard deviation restores the units of X while variance squares them",
          "Diagnose a distribution where a requested variance or higher moment does not exist",
          "Transfer moment reasoning to an unfamiliar risk quantity",
        ],
        applicationScope:
          "Scalar uncertainty/volatility summaries under known probability laws, with explicit checks on finite moments.",
        transferScope:
          "A rescaled, shifted or heavy-tailed quantity where the learner must predict how moments behave before computing them.",
        explicitlyOutOfScope: ["Sample variance estimator properties — ARC504", "Covariance matrices — ARC541", "Higher-moment risk modelling depth"],
        nextArcBoundary:
          "A07 owns the full probability law induced when a random variable is transformed, not merely the expectation or moments of the transformed quantity.",
      },
      "T22-M21-A07": {
        focus: "Transformations of random variables and induced distributions.",
        roleRelevance:
          "Log returns, squared residuals, standardized variables and nonlinear payoffs are transformations; deriving their laws prevents invalid density substitutions and missing Jacobian factors.",
        purpose:
          "Derive distributions of Y=g(X) using event/CDF logic first, then density change-of-variables where its hypotheses apply.",
        principalObstacle:
          "A nonlinear transformation can change support, merge multiple preimages and rescale density; simply substituting x=g^{-1}(y) into f_X without the derivative/Jacobian factor is generally wrong.",
        entryPrerequisites: ["T22-M21-A04-A06", "Single-variable derivatives", "Change of variables in integrals"],
        target:
          "Derive transformed laws using CDF/preimage reasoning and, for appropriate monotone differentiable transforms, obtain the density with the absolute derivative of the inverse; handle simple non-one-to-one cases by summing branches.",
        requiredMastery: [
          "Derive a transformed CDF from the event {g(X)<=y}",
          "Derive the one-dimensional density change-of-variables formula under explicit monotonicity/differentiability assumptions",
          "Track transformed support correctly",
          "Handle a simple many-to-one transform such as X^2 by accounting for all preimages",
          "Diagnose a missing absolute-Jacobian or support error",
          "Compare direct E[g(X)] calculation with deriving the full distribution and choose appropriately",
          "Transfer the method to an unfamiliar monotone or piecewise transform",
        ],
        applicationScope:
          "Logarithmic, affine, squared/absolute-value and other scalar transformations common in return/risk modelling.",
        transferScope:
          "A nonlinear transformation whose support/preimage structure differs from standard textbook examples.",
        explicitlyOutOfScope: ["Multivariate Jacobian density transformations", "Delta method — later inference/asymptotics", "Normalizing flows"],
        nextArcBoundary:
          "A08 owns probability laws for multiple random variables simultaneously and how marginals are recovered from joint structure.",
      },
      "T22-M21-A08": {
        focus: "Joint distributions, support geometry and marginalization.",
        roleRelevance:
          "Quant research is inherently multivariate: returns, signals, volumes and outcomes coexist, so a model must specify how probability is allocated jointly before dependence can be analyzed.",
        purpose:
          "Extend scalar probability laws to pairs/vectors at a foundational level and derive marginals from the joint law.",
        principalObstacle:
          "Knowing each marginal separately does not determine the joint distribution; support geometry and shared probability mass/density encode additional dependence information.",
        entryPrerequisites: ["T22-M21-A02-A07", "Double sums/integrals at a working level", "Cartesian products"],
        target:
          "Construct/validate simple joint PMFs or PDFs, compute probabilities over joint regions, and derive marginal laws by summing/integrating out the other variable.",
        requiredMastery: [
          "Check nonnegativity and total probability for a joint law",
          "Respect nonrectangular joint support when computing probabilities",
          "Compute joint-event probabilities by double sum/integral over the correct region",
          "Derive marginal PMFs/PDFs by summing/integrating out variables",
          "Construct two different joint laws sharing the same marginals",
          "Explain why marginals alone do not determine dependence",
          "Transfer joint-law reasoning to an unfamiliar pair of research variables",
        ],
        applicationScope:
          "Pairs of returns, signals/outcomes, counts/durations or other jointly observed quantities under a simple explicit model.",
        transferScope:
          "A joint distribution with unusual support where rote rectangular integration would fail.",
        explicitlyOutOfScope: ["High-dimensional covariance geometry — ARC541", "Copulas", "Graphical models"],
        nextArcBoundary:
          "A09 owns conditional distributions and conditional expectation obtained by restricting/reweighting a joint law given observed information.",
      },
      "T22-M21-A09": {
        focus: "Conditional distributions and conditional expectation as probability after observing another random variable.",
        roleRelevance:
          "Forecasts, signals and state estimates are conditional objects; researchers must distinguish unconditional averages from what should be expected after information is observed.",
        purpose:
          "Lift event-conditioning from ARC048 into distributional conditioning and compute conditional laws/means from joint models.",
        principalObstacle:
          "Conditioning changes the reference distribution and requires normalization; E[X|Y=y] is a function of the observed y, not generally a single unconditional number, and continuous conditioning cannot be treated as division by P(Y=y)=0.",
        entryPrerequisites: ["T22-M21-A08", "ARC048 conditional probability", "Expectation — A05"],
        target:
          "Compute discrete conditional PMFs and continuous conditional densities from a joint law where marginals are positive, then compute conditional expectations and verify the tower/total-expectation principle in concrete cases.",
        requiredMastery: [
          "Derive a conditional PMF from joint and marginal probabilities",
          "Derive a conditional density as f_XY(x,y)/f_Y(y) where the marginal density is positive",
          "Normalize and validate a conditional law",
          "Compute E[X|Y=y] from the conditional distribution",
          "Verify E[E[X|Y]]=E[X] in a finite or simple continuous example",
          "Explain why continuous conditioning is density-based rather than literal division by a zero point probability",
          "Transfer conditional-law reasoning to an unfamiliar signal/information setting",
        ],
        applicationScope:
          "Simple signal/outcome, state/measurement or subgroup models where observed information changes the distribution of a target variable.",
        transferScope:
          "A new joint model where the learner must derive the updated law and conditional mean from first principles.",
        explicitlyOutOfScope: ["Bayesian parameter inference beyond ARC502", "Kalman filtering — ARC543", "Conditional expectation as Hilbert-space projection"],
        nextArcBoundary:
          "A10 owns independence of random variables as factorization of joint structure, not merely zero association.",
      },
      "T22-M21-A10": {
        focus: "Independence of random variables through joint-law factorization.",
        roleRelevance:
          "Many derivations and simulation models simplify under independence; assuming it casually can produce false risk and inference conclusions.",
        purpose:
          "Translate event independence into distributional factorization and develop operational tests/counterexamples for random variables.",
        principalObstacle:
          "Independence is much stronger than zero covariance or visual lack of trend: the entire joint law must factor into marginals on the relevant support.",
        entryPrerequisites: ["T22-M21-A08-A09", "ARC048 independence"],
        target:
          "Determine whether random variables are independent from joint and marginal laws, derive consequences for functions/events in representative cases, and construct dependent-but-uncorrelated counterexamples in preparation for covariance.",
        requiredMastery: [
          "Test factorization of a joint PMF/PDF into marginals",
          "Use independence to factor probabilities/expectations when the required integrability conditions hold",
          "Show that functions of independent random variables remain independent in representative settings",
          "Distinguish pairwise-looking evidence from a full distributional independence claim",
          "Construct or analyze a dependent pair with zero covariance",
          "Diagnose an unjustified independence assumption from a data-generating story",
          "Transfer independence reasoning to an unfamiliar multivariable mechanism",
        ],
        applicationScope:
          "Joint models, repeated components and simulation ingredients where independence is proposed as a structural simplification.",
        transferScope:
          "A nonstandard joint law where independence must be proved or refuted rather than inferred from correlation or appearance.",
        explicitlyOutOfScope: ["Mutual information", "Conditional independence graphical models", "Mixing/time-series dependence"],
        nextArcBoundary:
          "A11 owns covariance and correlation as second-moment summaries of linear dependence, including their limitations.",
      },
      "T22-M21-A11": {
        focus: "Covariance and correlation as centered second-moment dependence summaries.",
        roleRelevance:
          "Covariance and correlation underlie portfolio risk, regression, multivariate statistics and time-series diagnostics, but they summarize only part of a joint distribution.",
        purpose:
          "Derive covariance/correlation algebra, connect independence to zero covariance under finite moments, and expose the converse failure and scale/unit issues.",
        principalObstacle:
          "Correlation is normalized linear association, not general dependence, causation or stability; covariance depends on units and both measures can be undefined or distorted by nonlinear/heavy-tailed structure.",
        entryPrerequisites: ["T22-M21-A05-A10", "Algebraic expansion", "Finite second moments"],
        target:
          "Compute and transform covariance/correlation, derive core identities, prove that independence implies zero covariance when moments exist, and use counterexamples to delimit what zero/high correlation actually establishes.",
        requiredMastery: [
          "Derive Cov(X,Y)=E[XY]-E[X]E[Y]",
          "Compute covariance and correlation from a specified joint law",
          "Derive covariance behavior under affine transformations",
          "Prove independence implies zero covariance under finite required moments",
          "Refute the converse with a concrete dependent-but-uncorrelated example",
          "Explain the unit dependence of covariance and scale invariance/sign behavior of correlation",
          "Diagnose nonlinear dependence or heavy-tail cases where correlation is inadequate or undefined",
          "Transfer the critique to an unfamiliar quantitative claim based on correlation",
        ],
        applicationScope:
          "Pairs of modeled returns/signals/outcomes where linear co-movement is relevant and finite second moments are explicitly checked.",
        transferScope:
          "A joint mechanism designed to defeat naive correlation intuition while remaining analytically tractable.",
        explicitlyOutOfScope: ["Covariance matrices and PSD geometry — ARC541", "Sample-correlation inference", "Causal interpretation"],
        nextArcBoundary:
          "A12 owns canonical discrete distribution families and the mechanisms that generate their parameters and shapes.",
      },
      "T22-M21-A12": {
        focus: "Canonical discrete distributions derived from their generating mechanisms.",
        roleRelevance:
          "Bernoulli/binomial/geometric/Poisson-type models appear throughout event, count and arrival research; correct use depends on assumptions, support and parameter meaning rather than formula matching.",
        purpose:
          "Build a compact reusable library of discrete laws by deriving or justifying them from repeated-trial, waiting-time and count mechanisms.",
        principalObstacle:
          "Named distributions are easy to misuse when independence, constant probability/rate, support or trial structure is absent; similar-looking formulas can encode different mechanisms.",
        entryPrerequisites: ["T22-M21-A01-A11", "ARC048 counting/independence", "Basic exponential/factorial algebra"],
        target:
          "Recognize, derive and use Bernoulli, binomial, geometric and Poisson distributions at a working level; compute probabilities and moments; and reject a named model when its generating assumptions or support are wrong.",
        requiredMastery: [
          "Derive Bernoulli expectation/variance from its PMF",
          "Derive the binomial PMF from independent constant-probability trials and combinatorial counting",
          "Derive/justify the geometric waiting-time law and its memoryless property",
          "Use the Poisson law for counts under an explicitly stated constant-rate/independent-increment-style idealization without claiming the full Poisson-process theory of ARC525",
          "Compute and interpret parameters, support, expectation and variance for the canonical families",
          "Distinguish mechanisms that produce binomial counts versus geometric waiting times versus Poisson counts",
          "Diagnose assumption violations such as changing trial probability, dependence or bounded-count constraints",
          "Transfer family selection to an unfamiliar discrete research mechanism",
        ],
        applicationScope:
          "Binary outcomes, bounded repeated-trial counts, waiting trials and idealized event counts.",
        transferScope:
          "A new discrete data-generating story where multiple named families appear superficially plausible and must be distinguished by mechanism.",
        explicitlyOutOfScope: ["Negative-binomial depth", "Full Poisson-process arrival-time theory — ARC525", "Distribution fitting/inference"],
        nextArcBoundary:
          "A13 owns canonical continuous distribution families, their support/tail/shape implications and mechanism-based model selection.",
      },
      "T22-M21-A13": {
        focus: "Canonical continuous distributions: uniform, exponential and normal families with mechanism, support and tail diagnostics.",
        roleRelevance:
          "Continuous model assumptions drive likelihoods, simulations and risk calculations; researchers need to know what each common family asserts before using it as a convenient default.",
        purpose:
          "Build a minimal continuous distribution toolkit while training rejection of unjustified normality or memoryless assumptions.",
        principalObstacle:
          "Matching a mean and variance does not make data normal, positive waiting times do not automatically justify an exponential law, and support/tail behavior can falsify a model before any parameter estimation begins.",
        entryPrerequisites: ["T22-M21-A03-A11", "Exponential functions", "Standardization algebra"],
        target:
          "Construct and use uniform, exponential and normal laws; derive key probabilities/moments and structural properties; standardize normal variables; and select or reject these families from support, symmetry, tail and mechanism information.",
        requiredMastery: [
          "Normalize and compute moments/probabilities for a uniform law",
          "Derive the exponential survival function from its density and verify the memoryless property",
          "Interpret the normal location/scale parameters and standardize to a standard normal variable",
          "Use CDF/quantile reasoning for continuous-family probability questions without confusing density height with probability",
          "Compare support, symmetry, tail and hazard/memoryless implications across the three families",
          "Construct a counterexample showing why equal mean/variance do not identify a distribution",
          "Reject an unjustified Gaussian or exponential model using explicit structural evidence",
          "Transfer model selection to an unfamiliar continuous research quantity",
        ],
        applicationScope:
          "Bounded idealizations, positive waiting-time models and symmetric light-tailed benchmark models used as transparent first approximations rather than unquestioned truths.",
        transferScope:
          "A new continuous modelling problem where support and mechanism conflict with a tempting named family despite superficially similar summary statistics.",
        explicitlyOutOfScope: [
          "Student-t, chi-square, beta/gamma and extreme-value families except later when specifically needed",
          "Multivariate normal geometry — ARC541",
          "Parameter estimation and goodness-of-fit inference — ARC531/ARC505",
          "Poisson-process/exponential-arrival theory — ARC525",
        ],
        nextArcBoundary:
          "M22 / ARC504 owns estimands versus estimators, estimator sampling distributions, bias/variance/MSE, standard errors and confidence intervals; M23 / ARC712 then owns LLN/CLT and finite-sample concentration.",
      },
    },
  };
}
