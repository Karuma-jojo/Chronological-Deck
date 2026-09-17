# Stage A Sample 2 — T22V3-T00: Finite Trading Decisions

Status: complete architecture-review sample. Not wired into runtime.
Evidence identity proposal: `T22V3::T22V3-T00::A01@1`
Parent capability: `T22V3-T00`
Direct prerequisite: `ARC048`

## Ancestry trace

`T22V3-F00 → F01 → F02 → (F03/F04) → F06 → P00 → ARC048 → T22V3-T00`

Bayes, calculus, continuous distributions, optimization, market microstructure and programming are **not** prerequisites for this first trading-decision module.

## Capability target

Given a small state/payoff table, the learner can:

- compute gross and cost-adjusted expected P&L;
- distinguish expected value from probability of loss and worst loss;
- calculate a break-even fixed cost;
- make a choice only after an objective is explicitly stated;
- avoid pretending that “higher EV” is a universal risk preference.

---

# PUBLIC LEARNER CONTENT

## 1. A trade is a distribution of outcomes, not one number

For finite states `i = 1,…,n` with probabilities `p_i` and payoff `x_i`, expected payoff is

`E[X] = Σ p_i x_i`.

Expectation is a probability-weighted average across repeated comparable opportunities. It is not a promise about the next trade.

## 2. Costs belong inside the decision

If every execution pays a fixed cost `c`, then net payoff in every state is

`x_i − c`.

Because probabilities sum to one,

`E[X − c] = E[X] − c`.

A strategy with positive gross EV can have negative net EV after costs.

## 3. Break-even cost

For a fixed per-trade cost, the largest cost that leaves expected net P&L at zero is simply the gross EV:

`c* = E[X]`.

This is an expectation break-even point, not a guarantee against losses.

## 4. Risk descriptors answer different questions

Three basic quantities:

- **expected net P&L:** long-run probability-weighted average under the model;
- **probability of net loss:** how often the modeled outcome is below zero;
- **worst modeled net loss:** size of the worst state in the table.

One trade can have higher EV and also lose more frequently. Another can lose less often but have a more severe tail.

## 5. “Choose” requires an objective

If the instruction says **maximize expected net P&L only**, choose the larger expected value.

That does not prove the same choice is best for:

- a strict drawdown limit;
- a bankruptcy constraint;
- risk-averse utility;
- uncertain probabilities;
- correlated positions;
- limited capital.

Later modules add those considerations. Here we practice intellectual honesty: conclusion follows objective.

## Worked warm-up — not the assessment task

A game pays +3 with probability 0.6 and −2 with probability 0.4, with fixed cost 0.1.

Gross EV = `0.6(3) + 0.4(−2) = 1.0`.

Net EV = `1.0 − 0.1 = 0.9`.

Probability of net loss remains 0.4 because subtracting 0.1 does not change the sign of either state here.

Worst net loss = `−2.1`.

---

# PUBLIC MAIN TASK — independent evidence

Two candidate trades have the following **pre-cost** payoff distributions, in arbitrary P&L units.

## Trade A

| State | Probability | Payoff |
|---|---:|---:|
| A1 | 0.45 | +4 |
| A2 | 0.35 | +1 |
| A3 | 0.20 | −6 |

Fixed execution cost: **0.30** per trade.

## Trade B

| State | Probability | Payoff |
|---|---:|---:|
| B1 | 0.65 | +2.5 |
| B2 | 0.35 | −2 |

Fixed execution cost: **0.15** per trade.

For **each** trade:

1. compute gross expected P&L;
2. compute net expected P&L after cost;
3. compute probability of a net loss;
4. state the worst net loss;
5. compute the fixed-cost break-even threshold.

Then answer:

6. If the *only* objective is to maximize modeled expected net P&L per opportunity, which trade is chosen?
7. Give two reasons that this objective does **not** establish a universal preference between A and B.

No code for the first attempt.

---

# PRIVATE EVALUATOR / REFERENCE

## Trade A

Gross EV:

`0.45(4) + 0.35(1) + 0.20(−6)`

`= 1.8 + 0.35 − 1.2 = 0.95`.

Net EV:

`0.95 − 0.30 = 0.65`.

Net state payoffs are `+3.70`, `+0.70`, `−6.30`.

Probability of net loss = `0.20`.

Worst net loss = `−6.30`.

Expectation break-even fixed cost = `0.95`.

## Trade B

Gross EV:

`0.65(2.5) + 0.35(−2)`

`= 1.625 − 0.7 = 0.925`.

Net EV:

`0.925 − 0.15 = 0.775`.

Net state payoffs are `+2.35`, `−2.15`.

Probability of net loss = `0.35`.

Worst net loss = `−2.15`.

Expectation break-even fixed cost = `0.925`.

## Decision under the stated objective

Under the explicitly narrow objective “maximize modeled expected net P&L per opportunity,” Trade B is selected because `0.775 > 0.65`.

This is **not** a universal ranking. Relevant counterfacts visible in the table include:

- B has the higher probability of a losing outcome: 35% vs 20%;
- A has the much worse modeled tail loss: −6.30 vs −2.15.

The point is not that one of those facts automatically reverses the decision. The point is that a different objective/constraint could.

## Rubric — 10 points

1. A gross EV 0.95 — 1
2. A net EV 0.65 — 1
3. A loss probability 0.20 and worst net −6.30 — 1
4. A break-even cost 0.95 — 1
5. B gross EV 0.925 — 1
6. B net EV 0.775 — 1
7. B loss probability 0.35 and worst net −2.15 — 1
8. B break-even cost 0.925 — 1
9. Chooses B **conditional on the stated EV objective** — 1
10. Gives at least two coherent non-EV considerations without claiming they automatically dominate — 1

**Clearance threshold:** 8/10, with items 2, 6 and 9 mandatory. Confusing gross with net EV is a non-clearance error.

---

# PUBLIC TRANSFER TASK — changed structure

Two legs are executed together and depend on the **same** market state.

| Shared state | Probability | Leg 1 pre-cost | Leg 2 pre-cost |
|---|---:|---:|---:|
| U | 0.60 | +3 | −1 |
| D | 0.40 | −2 | +4 |

Each leg costs **0.20** to execute.

1. Build the combined two-state payoff table after both costs.
2. Compute combined net expected P&L.
3. Compute probability of a combined net loss.
4. Explain why it would be wrong to invent independent probabilities for the two legs' outcomes.

---

# PRIVATE TRANSFER REFERENCE

Both legs share the same state; there are only the stated U/D scenarios.

Combined pre-cost payoff:

- U: `3 + (−1) = 2`;
- D: `−2 + 4 = 2`.

Total fixed cost = `0.20 + 0.20 = 0.40`.

Combined net payoff is therefore `1.60` in **both** states.

Expected net P&L = `0.60(1.60) + 0.40(1.60) = 1.60`.

Probability of combined net loss = `0` in this stated two-state model.

Treating the legs as independent would invent state combinations the problem never supplies. Dependence is part of the payoff model.

## Transfer clearance

Learner must use the shared state table. Multiplying marginal probabilities as if the legs were independent is a blocker even if a numerical EV happens to look plausible.

---

# Coding boundary

After clearing the handwritten task, the learner may implement a tiny list/dictionary loop that:

1. checks probabilities sum to one;
2. subtracts costs state-by-state;
3. computes EV and loss probability;
4. reproduces the handwritten answer.

No Monte Carlo is needed for a two/three-state table; exact enumeration is superior here. Simulation arrives in `T22V3-C01` as a validation/experimentation tool.

# Validation evidence for Stage A

Independent arithmetic check performed during authoring:

- A gross EV `0.95`, net EV `0.65`, loss probability `0.20`, worst net `−6.30`;
- B gross EV `0.925`, net EV `0.775`, loss probability `0.35`, worst net `−2.15`;
- transfer combined net payoff `1.60` in both states, EV `1.60`, loss probability `0`.

No live trading recommendation is implied by the toy distributions. No runtime/progress state was changed.
