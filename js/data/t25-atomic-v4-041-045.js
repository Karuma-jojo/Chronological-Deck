// Hand-authored T25 M.Stat v4 session cards 041-045.
// These contracts implement audited syllabus steps D1.1 through N1.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_041_045 = [
  {
    id:"T25-ARC821-A1041",routeOrder:41,syllabusCode:"D1.1",targetCode:"D1",parentId:"ARC821",
    title:"Derive binomial and hypergeometric probabilities from the experiment.",
    focus:"Deriving Bernoulli/binomial and hypergeometric count probabilities from the underlying sampling experiment, with explicit support and a clean distinction between sampling with and without replacement.",
    purpose:"Make named discrete laws consequences of experiment structure rather than memorised formulas, so the learner can choose the correct law from a story and reconstruct it when memory is uncertain.",
    centralCapability:"Given a finite sampling story, specify the trial or draw mechanism, identify replacement and independence structure, derive the binomial or hypergeometric probability of a count, state its support, and justify every combinatorial factor from the experiment.",
    principalObstacle:"The learner may reach for a familiar formula before modelling the experiment, confuse independent repeated trials with sampling without replacement, or use the right-looking combination factors with the wrong denominator and support.",
    entryPrerequisites:["027-030 / P1-P2 counting models and symmetry correction","033-036 / P4-P6 conditioning and independence","037-040 / J1-J2 indicator expectations and variance algebra"],
    requiredOwnership:[
      "Recognise a Bernoulli trial and derive the binomial count law by choosing which trials succeed and multiplying the corresponding success/failure probabilities.",
      "Recognise sampling without replacement and derive the hypergeometric count law by choosing successes and failures from finite categories over the total unordered sample count.",
      "State the exact feasible support of the requested count, including boundary restrictions imposed by population sizes.",
      "Explain why replacement creates an iid-trial model while no replacement changes subsequent draw probabilities and destroys that binomial structure.",
      "Check a derived law by summing over its support conceptually or combinatorially and by testing at least one edge case."
    ],
    applicationScope:"Finite success/failure experiments and finite-population sampling questions where the requested random variable is a category count under either repeated independent trials or sampling without replacement.",
    transferScope:"A fresh sampling story whose wording hides whether observations are independent, requiring the learner to reconstruct the experiment, decide between binomial and hypergeometric structure, and derive the count probability without a formula prompt.",
    inScope:["Bernoulli trials","Binomial count law","Hypergeometric count law","Support derivation","With-versus-without-replacement diagnosis"],
    outOfScope:["Multinomial covariance reserved for D1.2","Poisson approximation reserved for D2.2","Continuous sampling laws","Asymptotic normal approximations"],
    exitCondition:"For one unfamiliar finite sampling problem, derive the appropriate binomial or hypergeometric probability law from the experiment, state the exact support, and explain precisely why the competing law is invalid in that setting.",
    nextArcBoundary:"042 · D1.2 expands from one count to several categories: multinomial means, variances, covariances and a conditional count law become the target.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC821-A1042",routeOrder:42,syllabusCode:"D1.2",targetCode:"D1",parentId:"ARC821",
    title:"Obtain multinomial means, variances, covariances and one conditional count law.",
    focus:"Extending repeated categorical trials to the multinomial count vector and deriving its first- and second-moment structure through indicators, including the negative dependence between category counts.",
    purpose:"Connect named multinomial formulas back to the indicator machinery already owned and prevent the false intuition that category counts from the same fixed total are independent.",
    centralCapability:"Given n independent categorical trials with category probabilities summing to one, derive marginal means and variances, derive cross-category covariances, and obtain a simple conditional count distribution after conditioning on one or more category totals.",
    principalObstacle:"The learner may treat multinomial category counts as independent binomials, overlook the fixed-sum constraint, or quote covariance and conditional-law formulas without seeing how shared trials create negative dependence.",
    entryPrerequisites:["041 / D1.1 binomial derivation","037-040 / indicators, expectation, variance and covariance","036 / independence distinctions"],
    requiredOwnership:[
      "Represent each category count as a sum of trial-level indicators and derive E[N_j]=np_j from linearity.",
      "Derive Var(N_j)=np_j(1-p_j) using Bernoulli indicators and justified cross-trial independence.",
      "Derive Cov(N_i,N_j)=-np_i p_j for distinct categories by analysing mutually exclusive indicators within the same trial and independence across trials.",
      "Use the fixed-total identity sum N_j=n as a consistency check on the covariance structure.",
      "Condition on a partial category total and derive one resulting binomial or reduced-multinomial law by renormalising the relevant category probabilities."
    ],
    applicationScope:"Finite iid categorical experiments such as repeated classifications, occupancy categories and survey response counts where several category totals are observed simultaneously.",
    transferScope:"A fresh multinomial story in which the learner must derive a covariance or conditional count law from indicators and the fixed-total structure rather than identify a formula by name.",
    inScope:["Multinomial count vector","Indicator derivation of moments","Negative category covariance","Fixed-total constraint","Elementary conditional count laws"],
    outOfScope:["General multivariate generating functions","Multinomial asymptotics","Dirichlet-multinomial models","Continuous multivariate distributions"],
    exitCondition:"For one unfamiliar multinomial experiment, derive at least one mean, variance and cross-category covariance and then derive a nontrivial conditional count law, explaining the dependence created by the fixed total.",
    nextArcBoundary:"043 · D2.1 changes the experiment from fixed trial counts to waiting times, where the counting convention itself must be declared before any formula is written.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC821-A1043",routeOrder:43,syllabusCode:"D2.1",targetCode:"D2",parentId:"ARC821",
    title:"Derive a waiting-time law with an explicit trials/failures convention.",
    focus:"Deriving geometric and negative-binomial waiting laws from independent Bernoulli trials while making the counting convention—trials until success versus failures before success—explicit from the start.",
    purpose:"Eliminate off-by-one ambiguity in waiting-time problems and make the support, probability mass and elementary moments trace directly to the experiment rather than to competing textbook conventions.",
    centralCapability:"Given an iid Bernoulli sequence and a specified success target, define the waiting variable precisely, derive its geometric or negative-binomial mass function under the chosen convention, state the support, and translate correctly between trials-counted and failures-counted versions.",
    principalObstacle:"Different sources use the same distribution name for shifted variables; without declaring whether the terminal success is counted, learners can produce a structurally correct formula on the wrong support or shift every moment by one.",
    entryPrerequisites:["041-042 / D1 discrete count laws","033-036 / conditioning and independence","014-015 / finite and infinite geometric sums"],
    requiredOwnership:[
      "Define whether the variable counts total trials through the r-th success or failures before the r-th success, and state the corresponding support before calculation.",
      "Derive the geometric mass from a run of failures followed by a success under iid Bernoulli trials.",
      "Derive the negative-binomial mass by locating the final required success and choosing the earlier successes among preceding trials.",
      "Translate between trials-counted and failures-counted conventions by an explicit deterministic shift rather than memorising two unrelated formulas.",
      "Use a geometric-series or elementary indicator argument to derive at least one basic waiting-time moment under the declared convention."
    ],
    applicationScope:"Repeated independent Bernoulli experiments involving the first success, the r-th success, retries, inspections or repeated attempts where a discrete waiting count is the natural variable.",
    transferScope:"A fresh waiting-time story with ambiguous everyday language, requiring the learner to define the random variable first, choose the support, derive the law, and reconcile it with an alternative convention.",
    inScope:["Geometric waiting law","Negative-binomial waiting law","Trials-versus-failures conventions","Support shifts","Elementary moments via series or indicators"],
    outOfScope:["Continuous exponential waiting times","Renewal theory","Markov chains","Poisson process arrival times"],
    exitCondition:"Derive one unfamiliar geometric or negative-binomial waiting law from the Bernoulli experiment, state the counting convention and support unambiguously, and convert the result to the alternative convention without an off-by-one error.",
    nextArcBoundary:"044 · D2.2 moves from waiting counts to Poisson sums and factorial moments, and only then permits a justified binomial-to-Poisson approximation.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC821-A1044",routeOrder:44,syllabusCode:"D2.2",targetCode:"D2",parentId:"ARC821",
    title:"Use Poisson sums/factorial moments or a justified binomial approximation.",
    focus:"Working directly with the Poisson mass function and factorial moments, and recognising the precise rare-event regime in which a binomial model can be approximated by a Poisson law.",
    purpose:"Give the learner a derivation-first command of Poisson calculations and prevent casual approximation by requiring an explicit large-n, small-p, stable-np rationale.",
    centralCapability:"Given a Poisson variable, manipulate its defining series to compute probabilities or factorial moments; given a binomial rare-event model, assess whether a Poisson approximation is justified and use the matching rate parameter with clear assumptions.",
    principalObstacle:"The learner may substitute a Poisson law merely because probabilities are small, confuse ordinary and factorial moments, or use lambda=np without checking that the binomial experiment actually lies in an appropriate rare-event regime.",
    entryPrerequisites:["043 / D2.1 waiting laws and series discipline","041 / D1.1 binomial law from the experiment","014-015 / exponential/geometric-style sum manipulation where applicable"],
    requiredOwnership:[
      "State the Poisson support and mass function and verify normalisation using the exponential series at the level needed by the problem.",
      "Compute a factorial moment such as E[X(X-1)...(X-k+1)] by shifting the Poisson sum cleanly.",
      "Recover elementary ordinary moments from factorial moments when requested, without conflating the two notions.",
      "State the qualitative binomial-to-Poisson regime: many trials, individually rare successes, and np approaching or remaining near a finite rate lambda.",
      "Use lambda=np for a finite approximation only after checking that the underlying binomial model and rare-event conditions make the approximation plausible."
    ],
    applicationScope:"Rare-event counts and finite Poisson calculations where exact sums, factorial moments or a simple binomial approximation are central and no continuous-time process machinery is needed.",
    transferScope:"A fresh count problem where the learner must decide whether Poisson is an exact model, a justified approximation to binomial, or unjustified altogether, and defend that classification quantitatively and structurally.",
    inScope:["Poisson probability mass","Poisson sums","Factorial moments","Ordinary moments from factorial moments","Binomial-to-Poisson approximation conditions"],
    outOfScope:["Poisson processes","Compound Poisson models","Normal approximation to Poisson","Formal approximation-error bounds unless supplied"],
    exitCondition:"For one unfamiliar count problem, correctly use a Poisson sum or factorial moment and, when an approximation is proposed, justify or reject the binomial-to-Poisson step from the experiment and parameter regime rather than from pattern matching.",
    nextArcBoundary:"045 · N1.1 leaves named laws and asks for a general iid sampling result: derive the variance of the sample average without assuming normality.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC828-A1045",routeOrder:45,syllabusCode:"N1.1",targetCode:"N1",parentId:"ARC828",
    title:"Derive the variance of a sample average.",
    focus:"Deriving the expectation and variance of the iid sample average from linearity and variance-of-sums algebra under finite variance, with no appeal to normality.",
    purpose:"Build the first sampling-theory identity from elementary probability alone and make clear exactly which assumptions—iid and finite variance—drive the 1/n variance reduction.",
    centralCapability:"Given iid observations X1,...,Xn with finite mean and variance, derive E[Xbar] and Var(Xbar)=sigma^2/n from first principles, identify where identical distribution and independence enter, and diagnose how the formula changes when those assumptions fail.",
    principalObstacle:"The learner may think sample-mean variance reduction is a normal-distribution fact, forget the 1/n^2 scaling from averaging, or discard covariance terms in a non-iid/dependent sample without justification.",
    entryPrerequisites:["039-040 / J2 variance-covariance algebra and dependent sums","037-038 / J1 expectation linearity","036 / independence discipline"],
    requiredOwnership:[
      "Write the sample average as n^{-1} times a sum and derive its expectation by linearity.",
      "Apply Var(aY)=a^2 Var(Y) so the averaging factor contributes 1/n^2 before the sum variance is evaluated.",
      "Use independence to eliminate cross covariances and identical distribution to replace each variance by the common sigma^2.",
      "Conclude Var(Xbar)=sigma^2/n without invoking normality or any large-sample approximation.",
      "Write the corresponding covariance-expanded expression for a dependent or non-identically distributed sample and identify which simplifications no longer hold."
    ],
    applicationScope:"Finite iid samples with finite variance and simple alternatives with unequal variances or dependence, used to expose exactly why averaging reduces variability under the standard sampling assumptions.",
    transferScope:"A fresh sample-mean problem where one iid assumption is altered, requiring the learner to return to the covariance expansion and determine which part of the familiar sigma^2/n result survives.",
    inScope:["Expectation of sample mean","Variance of sample mean","iid assumption audit","Finite-variance requirement","Dependent/non-iid contrast"],
    outOfScope:["Unbiased n-1 sample variance correction reserved for N1.2","Central limit theorem","Normal-theory sampling distributions","Asymptotic standard errors"],
    exitCondition:"Starting only from iid sampling with finite variance, independently derive E[Xbar] and Var(Xbar)=sigma^2/n, identify every assumption used, and correctly rewrite the variance expression for one non-iid or dependent alternative.",
    nextArcBoundary:"046 · N1.2 keeps the same sampling setting but derives the n-1 sample-variance correction and its unbiasedness without assuming normality.",
    mode:"learn",evidencePolicy:"standard"
  }
];
