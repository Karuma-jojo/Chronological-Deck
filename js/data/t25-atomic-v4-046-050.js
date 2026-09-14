// Hand-authored T25 M.Stat v4 session cards 046-050.
// These contracts implement audited syllabus steps N1.2 through R1.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_046_050 = [
  {
    id:"T25-ARC828-A1046",routeOrder:46,syllabusCode:"N1.2",targetCode:"N1",parentId:"ARC828",
    title:"Derive the n-1 variance correction without assuming normality.",
    focus:"Deriving unbiased sample variance from iid finite-variance assumptions by decomposing squared deviations around the sample mean and tracking the lost degree of freedom exactly.",
    purpose:"Make the n-1 denominator a consequence of expectation algebra rather than a memorised convention, while separating unbiasedness from any unnecessary normal-distribution assumption.",
    centralCapability:"Given iid observations with finite variance, derive E[sum (X_i-Xbar)^2]=(n-1)sigma^2, explain why centring at the estimated sample mean removes one degree of freedom, and distinguish sample from population variance conventions.",
    principalObstacle:"The learner may assume normality is required, divide by n by reflex, or expand around Xbar without controlling the cross terms and the identity linking deviations from the true mean to deviations from the sample mean.",
    entryPrerequisites:["045 / N1.1 mean and variance of the sample average","039-040 / J2 variance-covariance algebra","038 / J1 expectation linearity"],
    requiredOwnership:[
      "State the iid finite-variance assumptions actually needed for unbiasedness and explicitly note that normality is not required.",
      "Use the identity sum(X_i-Xbar)^2 = sum(X_i-mu)^2 - n(Xbar-mu)^2 and justify it algebraically.",
      "Take expectations term by term to obtain (n-1)sigma^2.",
      "Distinguish the population second central moment, the n-denominator empirical variance and the unbiased n-1 sample variance.",
      "Identify what breaks or changes under non-iid sampling by locating the hidden covariance or unequal-variance terms."
    ],
    applicationScope:"Finite iid samples with finite variance, including symbolic derivations and small numerical checks of sample-variance conventions.",
    transferScope:"A fresh sampling model that tempts the learner to invoke normality or an n denominator, requiring a derivation from expectation identities and a clear audit of which assumptions are actually used.",
    inScope:["Unbiased sample variance","n-1 correction","Centred versus uncentred sums of squares","iid finite-variance assumptions","Failure modes under non-iid sampling"],
    outOfScope:["Chi-square distribution of sample variance","Normal-theory confidence intervals","Asymptotic variance estimation","ANOVA decompositions beyond the elementary identity"],
    exitCondition:"Derive the n-1 correction from first principles for an iid finite-variance sample, state every assumption used, and explain how the derivation changes if independence or identical distribution is removed.",
    nextArcBoundary:"047 · R5.1 leaves sampling-estimator derivations and moves to descriptive summaries, where denominator and quantile conventions must be stated explicitly before calculation.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC827-A1047",routeOrder:47,syllabusCode:"R5.1",targetCode:"R5",parentId:"ARC827",
    title:"Compute descriptive summaries with explicit denominator and quantile conventions.",
    focus:"Computing location, spread and moment summaries from raw data while declaring the convention whenever multiple legitimate definitions exist.",
    purpose:"Prevent apparently simple descriptive-statistics questions from becoming ambiguous through silent denominator, quartile or moment conventions.",
    centralCapability:"Given a finite dataset, compute mean, median, quantiles, IQR, raw and central moments, and sample or population variance under explicitly declared conventions, checking that the chosen definitions match the question.",
    principalObstacle:"Learners often mix n and n-1 variance denominators, use an unstated quartile interpolation rule, or confuse raw moments about zero with central moments about the mean.",
    entryPrerequisites:["046 / N1.2 sample-versus-population variance conventions","014-015 / indexed finite sums","Basic order and arithmetic from foundations"],
    requiredOwnership:[
      "Compute the arithmetic mean and median correctly from ordered or unordered finite data.",
      "State the quantile or quartile convention before using it when the position is not uniquely determined by the problem statement.",
      "Compute IQR from the declared quartiles and distinguish it from range and standard deviation.",
      "Distinguish raw moments E-like averages of x^k from central moments based on deviations from the sample mean.",
      "Label variance calculations with the exact denominator convention and avoid switching between sample and population formulas mid-solution."
    ],
    applicationScope:"Small and medium finite datasets, frequency tables and hand-computable descriptive summaries where convention discipline matters as much as arithmetic accuracy.",
    transferScope:"An unfamiliar dataset whose answer changes under competing quartile or variance conventions, requiring the learner to state a coherent rule and carry it through consistently rather than guess the examiner's intent silently.",
    inScope:["Mean and median","Quantiles and IQR","Raw and central moments","Sample and population variance","Declared conventions"],
    outOfScope:["Robust-estimation theory","Kernel quantiles","Large-sample distribution theory","Regression summaries reserved for R1"],
    exitCondition:"Compute a complete set of requested descriptive summaries for one unfamiliar dataset, explicitly declaring every denominator and quantile convention and distinguishing raw from central moments without correction.",
    nextArcBoundary:"048 · R5.2 keeps the same data summaries but makes them dynamic: sums and squared sums are updated and scale, skewness or kurtosis is interpreted under a stated convention.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC827-A1048",routeOrder:48,syllabusCode:"R5.2",targetCode:"R5",parentId:"ARC827",
    title:"Update sums/squared sums and explain a scale, skewness or kurtosis measure.",
    focus:"Updating descriptive statistics efficiently when observations are added or altered, and interpreting dimensionless scale or shape measures under explicit definitions.",
    purpose:"Replace full recomputation with algebraic bookkeeping and prevent formula-only use of coefficient of variation, skewness and kurtosis outside the conditions where they are meaningful.",
    centralCapability:"Given current sample size, sum and squared-sum information, update mean and variance after a data change and compute or interpret coefficient of variation, skewness or kurtosis with its convention and domain stated.",
    principalObstacle:"The learner may update a mean but forget the squared-sum effect, use coefficient of variation when the mean is zero or sign-sensitive, or confuse raw kurtosis with excess kurtosis.",
    entryPrerequisites:["047 / R5.1 descriptive summaries and conventions","046 / variance denominator discipline","014-015 / finite-sum algebra"],
    requiredOwnership:[
      "Update n, sum x_i and sum x_i^2 after adding or removing an observation before recomputing any derived statistic.",
      "Recover mean and a declared variance convention from updated sums and squared sums without re-listing all observations.",
      "Define coefficient of variation as a relative scale measure and state when a zero or inappropriate mean makes it misleading or undefined.",
      "State the skewness convention being used and interpret the sign qualitatively without overclaiming distributional shape.",
      "Distinguish kurtosis from excess kurtosis and account for the subtract-three convention when relevant."
    ],
    applicationScope:"Finite data updates, summary-statistic reconstruction and elementary scale/shape interpretation with explicit conventions.",
    transferScope:"A fresh update problem where only compressed summaries are available, forcing the learner to preserve sufficient bookkeeping and to reject a requested relative-shape statistic when its denominator or interpretation is not meaningful.",
    inScope:["Updating sums","Updating squared sums","Mean/variance reconstruction","Coefficient of variation","Skewness and kurtosis conventions"],
    outOfScope:["Online numerical-stability algorithms","Higher-order asymptotic moments","Robust skewness estimators","Time-series update filters"],
    exitCondition:"Update mean and variance correctly from compressed summaries after a data change and explain one scale, skewness or kurtosis measure with its convention, units and any domain restriction stated explicitly.",
    nextArcBoundary:"049 · R1.1 moves from one-variable summaries to two-variable association: Pearson and Spearman must be computed with existence and tie conditions checked.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC827-A1049",routeOrder:49,syllabusCode:"R1.1",targetCode:"R1",parentId:"ARC827",
    title:"Compute Pearson and Spearman and state their existence/tie conditions.",
    focus:"Computing linear and rank correlation while checking denominator nondegeneracy and handling tied ranks by an explicitly stated ranking rule.",
    purpose:"Separate two superficially similar measures: Pearson quantifies linear association on numerical values, while Spearman is Pearson correlation applied to ranks and targets monotone association.",
    centralCapability:"Given paired data, compute Pearson correlation and Spearman rank correlation, identify when either is undefined, apply a coherent tie rule, and explain what each coefficient does and does not measure.",
    principalObstacle:"Learners may treat Spearman as a memorised no-ties shortcut, ignore constant-variable cases where correlation is undefined, or infer independence or causation from a correlation coefficient.",
    entryPrerequisites:["047-048 / R5 descriptive summaries and variance conventions","039 / covariance identity","Basic ranking and ordered data"],
    requiredOwnership:[
      "Compute Pearson correlation from centred cross-products, standard deviations or an equivalent algebraically justified formula.",
      "Check that both marginal variances are positive before declaring Pearson correlation defined.",
      "Convert observations to ranks and compute Spearman as Pearson correlation of those ranks.",
      "Use and state an appropriate tied-rank convention rather than applying the no-ties shortcut blindly.",
      "Explain the distinction between linear association, monotone association, independence and causation."
    ],
    applicationScope:"Finite paired datasets, including tied ranks and degenerate constant-variable cases, with exact or hand-calculator correlation computations.",
    transferScope:"A fresh paired dataset where Pearson and Spearman differ substantially, requiring the learner to diagnose nonlinearity, monotonicity or ties rather than treating one coefficient as universally superior.",
    inScope:["Pearson correlation","Spearman rank correlation","Tied ranks","Undefined-correlation cases","Linear versus monotone association"],
    outOfScope:["Partial correlation","Rank-test asymptotics","Causal inference","Multiple regression"],
    exitCondition:"Compute Pearson and Spearman for one unfamiliar paired dataset, state the tie and existence conventions, and explain a meaningful difference between the two coefficients without interpreting correlation as causation or independence.",
    nextArcBoundary:"050 · R1.2 uses correlation structurally: regression-line identities, R-squared relations and counterexamples for pooling or nonlinear dependence become the bounded capability.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC827-A1050",routeOrder:50,syllabusCode:"R1.2",targetCode:"R1",parentId:"ARC827",
    title:"Use regression-line identities or construct a pooling/nonlinearity counterexample.",
    focus:"Relating the two simple-regression slopes and R-squared to correlation, while using counterexamples to expose zero-correlation dependence, nonlinear monotonicity and sign reversal under pooling.",
    purpose:"Close the elementary association block by turning correlation from a calculation into a structural object whose algebra and limitations can both be demonstrated.",
    centralCapability:"Given simple-regression summaries or a small constructed dataset, use b_yx b_xy = r^2 with sign consistency where legal, relate simple-regression R^2 to r^2, and construct or analyse a counterexample showing that pooled or nonlinear association can mislead.",
    principalObstacle:"The learner may confuse the two regression slopes, lose their units, assume zero correlation means independence, or trust a pooled correlation without checking whether group structure reverses or creates the apparent trend.",
    entryPrerequisites:["049 / R1.1 Pearson and Spearman","039 / covariance and variance identities","047-048 / descriptive scale summaries"],
    requiredOwnership:[
      "Write the slope of Y on X as Cov(X,Y)/Var(X) and the slope of X on Y as Cov(X,Y)/Var(Y) when the denominators are positive.",
      "Derive the product of the two simple-regression slopes as r^2 and keep the common sign of the slopes consistent with r.",
      "State that simple-regression R-squared with an intercept equals r^2 under the standard nondegenerate setup.",
      "Construct or verify an example of dependent variables with zero Pearson correlation or a perfectly monotone but nonlinear relation where Pearson is not plus or minus one.",
      "Explain how combining groups can change or reverse an association and identify the lurking group variable rather than treating the pooled coefficient as self-explanatory."
    ],
    applicationScope:"Simple two-variable regression identities and small finite counterexamples illustrating nonlinear dependence, monotonicity and pooled-versus-within-group association.",
    transferScope:"A fresh association problem presented through slopes, grouped summaries or an unusual nonlinear construction, requiring the learner to choose between algebraic identities and a counterexample rather than merely recompute a familiar coefficient.",
    inScope:["Simple-regression slope identities","R-squared and correlation","Zero-correlation dependence","Nonlinear monotone examples","Pooling and sign reversal"],
    outOfScope:["Multiple regression algebra","Formal omitted-variable bias formulas","Causal identification","Generalised linear models"],
    exitCondition:"Solve one unfamiliar association problem using regression-line identities or a valid counterexample, and explain precisely why correlation alone can fail under nonlinearity, dependence or pooling.",
    nextArcBoundary:"051 · M0.1 starts Phase 3 and linear algebra: multiply and transpose conformable matrices correctly, with matrix order and dimensions becoming the new central discipline.",
    mode:"learn",evidencePolicy:"standard"
  }
];
