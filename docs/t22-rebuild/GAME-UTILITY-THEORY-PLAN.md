# Game and utility theory: an explicit home in the existing route

The shared route already uses finite strategic decisions in M05. Its formal lottery-utility representation belongs in **M09-U**, after M05 decisions and M09's continuity/proof foundations. The deeper game block belongs **after the M53 optimization core**, where convex strategy geometry is available and the explicit M53-LP bridge proves LP strong duality. It stays inside the existing 65 capability families; there is no renumbering or unexplained new M66.

These are **planned extension contracts**, not completed modules. Each unit has an original observable exit task in `course/t22/extensions/capability-extensions.json`. The planned game block is substantial: eighteen units, with separate finite-Nash, minimax and compact-action gates. A unit can take several sittings; no lesson-count or time promise substitutes for proof.

## The route and its prerequisites

| Branch | Placement | Must already be available | Proof/evidence exit |
|---|---|---|---|
| M09-U: six utility units | After M09, revisiting M05 | Finite lotteries, supplied utility vs money, logic/quantifiers and continuity | Derive finite expected-utility representation from stated preferences and prove positive affine uniqueness |
| M09-A / M12-A | After their analysis cores | M03 proof and M09 real completeness | Finite-dimensional compactness; uniform convergence and legal interchange with counterexamples |
| M53-G-01–07 | After M53; finite Nash block | M05 strategy examples, M09-A compactness, M09-U utility, M13 finite vector notation, M52 convexity | Full finite-dimensional fixed-point bridge and mixed Nash existence for arbitrary finite players/actions |
| M53-G-08–10 | After the four-unit M53-LP proof bridge | M09-A/M15/M52/M53 geometry plus proved Farkas/LP duality, not weak duality alone | Finite rectangular minimax theorem and primal/dual equilibrium certificates |
| M53-G-11–14 | After finite equilibrium tools | Joint versus product laws and probability averaging | Correlated/coarse-correlated distinctions; regret and numerical residual certificates |
| M53-G-15–17 | Optional general-domain gate | Full finite-dimensional Kakutani bridge and correspondence vocabulary | Compact convex action-space pure equilibrium under continuity/quasiconcavity hypotheses; explicit failures without them |
| M53-G-18 | Independent game design defence | The subgates actually used in the design | Define utilities/information, certify equilibria, perturb the game, and defend what existence/selection/learning do and do not imply |

## Finite utility representation

The theorem is about preferences on **all lotteries over a finite consequence set**, with reduction of compound lotteries. Completeness and transitivity alone give an ordering; they do not justify averaging a numerical score. Add mixture continuity and mixture independence to obtain an expected-utility representation. These are assumptions about preferences, not psychological facts about every person.

The proof route constructs best/worst consequences and standard gambles, handles the all-indifferent case, assigns each consequence its equivalent best/worst mixture weight, and uses mixture independence to establish affinity. The resulting lottery index is the probability-weighted sum of consequence utilities. Reversing the argument verifies the axioms from an expected-utility representation. Normalizing the extreme consequences gives uniqueness of the standard-gamble weights; undoing normalization yields a positive affine transformation. A general increasing transformation preserves deterministic rankings but need not preserve lottery comparisons.

Exits include constructing an independence violation, proving uniqueness and distinguishing a supplied M05 utility table from a utility representation derived from preference axioms. Infinite domains, prospect theory and multiattribute utility are separate subjects. The finite theorem does not silently own them.

Primary scope checks: [MIT expected-utility notes](https://ocw.mit.edu/courses/14-123-microeconomic-theory-iii-spring-2015/a8b0b0de1bebe039bc3cccc15f1b756f_MIT14_123S15_decision.pdf) and [Stanford foundations notes](https://stanford.edu/~avidit/FTnotes.pdf), checked 2026-10-07. The course's exit tasks are original.

## General finite Nash existence

“General finite” means any finite number of players and nonempty finite action sets, with finite real-valued payoffs. Mixed strategies lie in a product of simplexes. Independent player randomization defines the multilinear expected payoffs; a correlated mediator law is a different object.

The proof gate requires an all-dimensional Sperner/Brouwer bridge, not merely a drawing of a triangle. Form positive gains

\[
 g_{ia}(x)=\max\{0,u_i(a,x_{-i})-u_i(x)\},\qquad
 F_{ia}(x)=\frac{x_{ia}+g_{ia}(x)}{1+\sum_b g_{ib}(x)}.
\]

The learner proves that this is a continuous self-map of the compact convex strategy domain and obtains a fixed point. At a fixed point, writing \(G_i=\sum_a g_{ia}\) gives \(x_{ia}G_i=g_{ia}\). If \(G_i>0\), every positive-support action has positive payoff gain. This contradicts the zero weighted sum of gains relative to the current expected payoff. Thus no player has a profitable pure deviation; averaging proves no mixed deviation is profitable either.

This establishes existence, without asserting a pure equilibrium, uniqueness, efficiency or convergence of repeated play. Original exits require no-pure-equilibrium and multiple-equilibrium constructions, support inequalities including unused actions, and a proof that a numerical solver residual certifies only the stated tolerance.

Scope source: [MIT finite-game/Nash notes](https://www.mit.edu/~6.7980/nfgs_nash.html), checked 2026-10-07. Its [Sperner/Brouwer discussion](https://www.mit.edu/~6.7980/brouwer.html) motivates the bridge; an exclusively planar proof would not satisfy this route's arbitrary-dimensional obligation.

## Finite minimax through LP duality

For a finite rectangular row-payoff matrix \(A\), the maximizing player solves

\[
\max v\quad\text{subject to }A^\top x\ge v\mathbf1,\quad
x\ge0,\quad\mathbf1^\top x=1.
\]

The minimizing player solves the dual

\[
\min w\quad\text{subject to }Ay\le w\mathbf1,\quad
y\ge0,\quad\mathbf1^\top y=1.
\]

The unit proves feasibility and finite boundedness, invokes a **proved** LP strong-duality theorem, and identifies both optimal values with the corresponding maximin/minimax expressions. Equilibrium strategies become matching lower/upper certificates. Support equalities and inequalities for unused actions matter; blindly equalizing every column can fail for degenerate games.

The finite theorem covers negative payoffs and arbitrary finite rectangular matrices. It does not establish minimax for every infinite strategy space. Source: [MIT minimax and equilibrium properties](https://www.mit.edu/~6.7980/correlated.html), checked 2026-10-07.

## General-domain and learning boundaries

The compact-action extension has its own theorem: nonempty compact convex strategy sets in finite-dimensional spaces, continuous payoffs and quasiconcavity in each player's own action. It teaches the best-response correspondence, nonempty convex values, upper hemicontinuity and the precise Kakutani theorem used. Noncompact or discontinuous counterexamples prevent blanket existence claims. Kakutani is a proof obligation in this branch, not an assumed word.

The learning units distinguish Nash, correlated and coarse-correlated equilibrium. Vanishing ordinary external regret controls an empirical coarse-correlated distribution; it does not alone prove last-iterate Nash convergence or ordinary correlated equilibrium. Existence is distinct from equilibrium selection and computation.

Repeated-game folk theorems, Bayesian games, auctions/mechanism design and stochastic games remain future specialisations. They are attractive next branches once the finite existence and information/utility foundations are secure; they are not included by changing a module title.
