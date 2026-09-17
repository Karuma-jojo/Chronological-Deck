// Prerequisite bridges are learning support, never new atomic clearances.
export const bridges=[
{id:'BR-I', title:'Induction and indexed arguments', before:[14, 19, 58, 60], lesson:'To prove P(n) for every integer n≥n0, prove the base case and prove P(k) implies P(k+1) for an arbitrary k≥n0. State the range and carry the whole hypothesis. Testing finitely many cases is not induction.', tasks:[
['Prove Σ(k=1 to n)k=n(n+1)/2 by induction for n≥1.', 'Base n1. Assuming k sum k(k+1)/2, add k+1 to obtain(k+1)(k+2)/2. This proves all positive integers.'],
['Prove2^n≥n+1 for every integer n≥0 by induction. Identify where the restriction n≥0 enters.', 'Base1≥1. From2^k≥k+1, 2^(k+1)≥2k+2≥k+2 since k≥0.'],
['An argument verifies a claim for n=1, 2, 3 and declares it true for all positive integers. Explain the gap and exhibit a polynomial vanishing at those three integers but not4.', 'No induction step or universal argument. (n−1)(n−2)(n−3) vanishes at1, 2, 3 but equals6 at4.'] ]},
{id:'BR-N', title:'Integers, divisibility and parity', before:[7, 10, 30], lesson:'An integer is even if it equals2k for an integer k; divisibility a|b means b=ak for an integer k. Congruence modulo m compares integer remainders. Never infer these properties just from a decimal approximation.', tasks:[
['Prove the product of two odd integers is odd.', 'Write(2a+1)(2b+1)=2(2ab+a+b)+1, with integer expression in parentheses.'],
['Prove congruence modulo3 is transitive directly from divisibility.', 'Ifa−b=3r andb−c=3s, then a−c=3(r+s), so3 divides it.'],
['How many strings of three decimal digits, allowing leading zero, have digit sum divisible by3? Justify.', 'Digit remainder counts4, 3, 3. All same remainder contribute4³+3³+3³=118; one of each contributes6·4·3·3=216, total334.'] ]},
{id:'BR-M', title:'Partial derivatives and planar integration', before:[91, 96, 122, 126], lesson:'A partial derivative varies one coordinate while holding others fixed. Integrate a planar density over its actual region; describe the inner variable bounds in terms of the outer variable. A2×2 Jacobian determinant is ad−bc. These tools are supplied before tasks that require them, not leaked inside WALL.', tasks:[
['For h(x, y)=x²y+3y² compute both partial derivatives.', 'hx=2xy, hy=x²+6y.'],
['Evaluate the area of0<x<y<1 in two integration orders.', '∫₀¹∫₀^y dxdy=1/2; equivalently∫₀¹∫x¹ dydx=1/2.'],
['For x=uv, y=u(1−v), compute the Jacobian determinant with respect to(u, v) and its absolute value whenu>0.', 'Matrix[[v, u], [1−v, −u]], determinant−uv−u(1−v)=−u; absoluteu.'] ]}
];
export const capstones=[
[1, 'For fixed real a, solve (x²−a²)/(x−a)=2x over the original real domain. Justify every transformation. Then negate “for every a there exists a legal solution”.', 'Exclude x=a. Factoring givesx+a=2x, only candidatex=a, illegal. No solutions for anya. Negation:there exists a such that every legal x fails the equation; indeed all a satisfy it.'],
[2, 'Two fair dice are rolled. Let I indicate that the first die is even, J that the sum is even, and S=I+J. Derive the joint law of(I, J), ES, VarS andP(I=1|S=1).', 'Each pair00, 01, 10, 11 has probability1/4 because parity bits of dice are independent. ES1, VarS1/2. ConditionalS1 gives two equal possibilities, probability1/2.'],
[3, 'A is a real symmetric n×n matrix withtrA=tr(A²)=n. Prove or refute A=I. Explain the role of symmetry.', 'Real eigenvaluesλi satisfyΣ(λi−1)²=trA²−2trA+n=0. Eachλi1, and orthogonal diagonalization givesI. Without symmetry I+N for nonzero square-zero N has both tracesn but is notI.'],
[4, 'Choose Θ uniformly on(0, 1), then conditional onΘ draw independent Bernoulli(Θ) X, Y. Find the joint law, EX, VarX, Cov(X, Y), and conditional probabilityP(X=1|Y=1).', 'Mass11=EΘ²=1/3, 00=1/3, 01=10=1/6. MarginalBernoulli1/2, mean1/2, variance1/4, cov1/12, conditional(1/3)/(1/2)=2/3.'],
[5, 'For iid uniform(0, θ), maximum Mn, derive its law and proveMn→θ in probability. Find the limit law of n(1−Mn/θ) through its survival function.', 'CDF(m/θ)^n on[0, θ]. Lower-tail deviationprob(1−ε/θ)^n→0 for0<ε<θ; upper deviations impossible. For fixedt≥0, survival(1−t/n)^n for n>t→e^−t, soExp1 limit.'],
[6, 'For iid uniform(0, θ) under closed support, derive MLE, an unbiased estimator based on the maximum, and a one-sided1−α upper confidence bound. Explain why these are distinct objects.', 'MLEM. EM=nθ/(n+1), so(n+1)M/n unbiased. Upper boundM/α^(1/n) coversθ withprob1−α. Maximization, expectation andcoverage solve different requirements.'],
[7, 'Two randomized normal equal-variance groups have n1=n2=5, means2, 4, and sample variances1, 3. Derive the pooled mean-difference test, both ANOVA sums and the identityF=t². State why observational grouping would change the causal interpretation.', 'Sp²=(4+12)/8=2; difference2, SE√(.8), t=√5, df8. BetweenSS=5·1²+5·1²=10, within16; F10/2=5=t². Random assignment supports treatment comparisons; observational groups alone do not remove confounding.']
];
// Objective calibrations are original, not official PYQs or a complete exam mock.
export const objectives=[
[1, 'For f(x)=(x²−1)/(x−1) on its natural real domain, which statement is correct?', ['f is the same function as x+1 on R', 'f agrees with x+1 for x≠1 but is undefined at1', 'f(1)=2 by cancellation', 'f is undefined everywhere'], 1, 'Original denominator excludes1; the restricted rewrite isx+1 onR\\{1}.'],
[1, 'Which negates “for every real x there exists real y with y>x”?', ['For every x, every y satisfiesy≤x', 'There exists x such that every y satisfiesy≤x', 'There exists y greater than every x', 'For every y there exists x≥y'], 1, 'Negate∀x∃y(y>x) to∃x∀y(y≤x).'],
[1, 'A nonzero polynomial of degree3 has at most how many distinct real roots?', ['2', '3', '4', 'No finite bound'], 1, 'The root bound is3; repeated roots count only once as distinct roots.'],
[2, 'Two events of probabilities.4, .5 are independent. Their intersection probability is:', ['0', '.2', '.4', '.9'], 1, 'Independence givesproduct.2.'],
[2, 'X, Y have variance1 each andcovariance−.5. Var(X+Y) equals:', ['1', '2', '3', '0'], 0, '1+1+2(−.5)=1.'],
[2, 'For iid data with finite varianceσ², Σ(Xi−Xbar)²/n has expectation:', ['σ²', 'nσ²/(n−1)', '(n−1)σ²/n', '0'], 2, 'The centered sum has expectation(n−1)σ².'],
[3, 'A2×2 matrix has only eigenvalue1 and eigenspace dimension1. It is:', ['Always diagonalizable', 'Not diagonalizable', 'The identity', 'Necessarily symmetric'], 1, 'A basis would need two independent eigenvectors.'],
[3, 'The integral ∫₀¹x^−p dx is finite exactly when:', ['p>1', 'p≥1', 'p<1', 'All realp'], 2, 'Endpoint antiderivative orp-test givesp<1.'],
[3, 'If f is differentiable at a, which is guaranteed?', ['f′ is continuous at a', 'f is continuous at a', 'f has a local extremum at a', 'f′(a)≠0'], 1, 'Differentiability implies continuity, but none of the other claims follows.'],
[4, 'For standard CauchyX, E|X|^p is finite exactly when:', ['p<1', '0<p<1', '−1<p<1', 'p>−1'], 2, 'Local integrability at0 requiresp>−1; tails requirep<1.'],
[4, 'If E(X|Y)=Y andVar(X|Y)=2, withVarY=3, thenVarX is:', ['2', '3', '5', '6'], 2, 'Totalvariance2+3=5.'],
[4, 'For independent Exp1 X, Y, X/(X+Y) is:', ['Uniform(0, 1)', 'Exponential', 'Normal', 'A point mass'], 0, 'The jointsum-ratio transform factors intoGamma2 density anduniformdensity.'],
[5, 'Positive probability on the diagonalU=V with continuous marginals necessarily implies:', ['A fixed joint point atom', 'No ordinary density can represent the entire joint law', 'Independence', 'Discrete marginals'], 1, 'Diagonal has planar Lebesgue measure0; positive mass there is singular, not necessarily a point atom.'],
[5, 'Nonvanishing variance of Tn alone proves inconsistency:', ['Always', 'Never permits any conclusion alone without further conditions', 'Only because every variable is normal', 'Whenever its mean exists'], 1, 'Rare large values can preserve/diverge variance while probability deviations vanish.'],
[5, 'For iid normaldata, √n(Xbar−μ)/S has:', ['Normal law exactly', 't withn df', 't withn−1 df', 'F with1, n df'], 2, 'Independentnormal/chi-square construction uses residual dfn−1.'],
[6, 'An estimator attaining a regular Cramér–Rao bound for an unbiased estimand is:', ['Biased', 'Minimum variance among unbiased competitors covered by the bound', 'Always an MLE', 'Always sufficient'], 1, 'The bound certifies variance optimality in its stated class, not the other properties.'],
[6, 'A p-value is:', ['P(null true|data)', 'The probability under the null of an outcome at least as extreme under the specified ordering', 'Always the test size', 'The TypeII error'], 1, 'It is a tail probability under a specified null model and ordering.'],
[6, 'Zero successes in10 trials makes the ordinary Waldinterval:', ['An exact95% interval', 'Degenerate at0', 'Equal[0, 1]', 'Independent of the data'], 1, 'The plug-in variancephat(1−phat)/n iszero.'],
[7, 'A2×2 unreplicated Latin square has residual degrees of freedom:', ['0', '1', '2', '3'], 0, '(p−1)(p−2)=0 atp2.'],
[7, 'Equal first-order inclusion probabilities imply SRSWOR:', ['Always', 'Only when population values differ', 'Not in general', 'By definition'], 2, 'Cyclic-pair design gives equalinclusions but excludes some subsets.'],
[7, 'Under matching two-group normal equalvariance assumptions, ANOVA F equals:', ['t', '|t|', 't²', '2t²'], 2, 'BetweenSS divided bypooled MSE equals the squaredpooled t statistic.']
];
