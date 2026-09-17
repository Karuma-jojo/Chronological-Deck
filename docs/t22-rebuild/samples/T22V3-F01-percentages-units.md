# Stage A Sample 1 — T22V3-F01: Ratios, Percentages, Units & Estimation

Status: complete architecture-review sample. Not wired into runtime.
Evidence identity proposal: `T22V3::T22V3-F01::A01@1`
Parent capability: `T22V3-F01`
Direct prerequisite: `T22V3-F00`

## Capability target

The learner can translate between fractions, ratios, percentages, percentage points and unit rates; apply percentage changes multiplicatively; preserve the correct base quantity; and use units/estimation to reject impossible arithmetic.

This sample intentionally assumes **no calculus, probability, finance or programming**.

---

# PUBLIC LEARNER CONTENT

## Why this matters

A large fraction of later quant mistakes are not advanced-math mistakes. They are base mistakes:

- taking a percentage of the wrong quantity;
- adding successive percentage changes that should multiply;
- confusing a 5-percentage-point move with a 5% relative change;
- dropping units and accepting a numerically neat but dimensionally impossible answer.

Before models, a quant needs arithmetic that survives contact with money, prices and rates.

## 1. Percent means “per 100”

`r% = r / 100`.

A 12.5% increase means multiply the old amount by

`1 + 0.125 = 1.125`.

A 12.5% decrease means multiply the current amount by

`1 - 0.125 = 0.875`.

The word **current** matters. The second percentage usually acts on a different base from the first.

## 2. Successive percentage changes multiply

If an amount changes by rates `r1` and then `r2`, the final multiplier is

`(1 + r1)(1 + r2)`

with decreases represented by negative rates.

So a +10% move followed by a −10% move gives

`1.10 × 0.90 = 0.99`,

not 1. The final amount is 1% below the start.

## 3. Percentage points are not percent change

If a rate moves from 20% to 25%:

- increase in **percentage points** = `25% − 20% = 5 points`;
- relative **percent increase in the rate** = `(25 − 20) / 20 = 25%`.

Both statements can be correct because they answer different questions.

## 4. Keep the base explicit

For every percentage calculation, write:

`percentage amount = rate × base`.

Do not write only `0.4% = 96`; write `0.004 × ₹24,000 = ₹96` so the base remains visible.

## 5. Units are an error detector

If a car travels 180 km in 3 h,

`180 km / 3 h = 60 km/h`.

The units reveal what division means. If the required answer is money but your expression ends in `1/hour`, something is wrong even before evaluating the number.

## Worked example — not the assessment task

A ₹500 item rises 20%, then receives a ₹30 rebate.

1. Percentage step: `₹500 × 1.20 = ₹600`.
2. Fixed-rupee step: `₹600 − ₹30 = ₹570`.
3. Net change from original: `₹70 / ₹500 = 14%`.

Notice that a fixed rupee adjustment is not another percentage unless the problem says what base to use.

## Quick self-check before the main task

You should be able to explain, without code:

1. why +x% then −x% usually does not cancel;
2. what base a stated percentage uses;
3. the difference between percentage points and relative percent change;
4. what unit the final answer should have.

---

# PUBLIC MAIN TASK — independent evidence

An account starts with **₹24,000**.

1. It gains **12.5%**.
2. It then loses **12.5% of the new balance**.
3. A service fee equal to **0.4% of the starting balance** is charged.

Without code, compute:

**(a)** the balance after the gain and loss but before the fee;

**(b)** the fee in rupees;

**(c)** the final balance;

**(d)** the total percentage change from the starting balance;

**(e)** one sentence explaining why +12.5% and −12.5% do not cancel.

Show the base/multiplier used at each step.

## Public completion rule

A numerical answer without visible bases/multipliers is incomplete. The capability is not “calculator gives the right number”; it is “learner can represent the change correctly.”

---

# PRIVATE EVALUATOR / REFERENCE — not learner-facing at attempt time

## Main-task derivation

Gain multiplier: `1.125 = 9/8`.

Loss multiplier: `0.875 = 7/8`.

Combined multiplier before fee:

`(9/8)(7/8) = 63/64 = 0.984375`.

Therefore

`₹24,000 × 63/64 = ₹23,625`.

Fee base is explicitly the **starting** balance:

`0.004 × ₹24,000 = ₹96`.

Final balance:

`₹23,625 − ₹96 = ₹23,529`.

Absolute change:

`₹23,529 − ₹24,000 = −₹471`.

Percentage change:

`−471 / 24,000 × 100% = −1.9625%`.

The equal-looking percentage moves do not cancel because the second 12.5% is applied to a different base; equivalently `1.125 × 0.875 = 0.984375`, not 1.

## Rubric — 6 points

1. Correct first multiplier/base — 1
2. Correct pre-fee balance ₹23,625 — 1
3. Correct fee base and ₹96 fee — 1
4. Correct final balance ₹23,529 — 1
5. Correct net percentage change −1.9625% — 1
6. Correct multiplicative/base explanation — 1

**Clearance threshold:** at least 5/6 **and** no base/units error. A learner who reaches the correct final number through an incorrect percentage base does not clear.

---

# PUBLIC TRANSFER TASK

A price is initially **₹80**. It rises by **20%**, then falls by **p% of the new price**, and ends at **₹84**.

1. Find `p`.
2. Find the net percentage change from the original ₹80.
3. Explain why those two percentages are different quantities.

---

# PRIVATE TRANSFER REFERENCE

After the rise:

`₹80 × 1.20 = ₹96`.

Solve

`96(1 − p) = 84`.

So

`1 − p = 84/96 = 0.875`, hence `p = 0.125 = 12.5%`.

The final price ₹84 is `₹4` above ₹80, so net change from the original is

`4/80 = 5%`.

The 12.5% is a fall measured from the intermediate base ₹96; the 5% is the net gain measured from the original base ₹80.

## Transfer clearance

The learner must identify both bases explicitly. A lucky equation with no base explanation is partial evidence only.

---

# Coding boundary

No code is required for clearance. After the handwritten derivation, a learner may write a tiny function that applies a sequence of percentage/fixed changes and prints every base used. The code is a check, not a substitute for the representation.

Do **not** introduce NumPy/pandas here.

# Validation evidence for Stage A

Independent arithmetic check performed during authoring:

- `24000 × 1.125 × 0.875 = 23625`;
- fee `= 24000 × 0.004 = 96`;
- final `= 23529`;
- net percentage `= −1.9625%`;
- transfer `p = 12.5%`, net gain `= 5%`.

No repository runtime or learner evidence was changed by this sample.
