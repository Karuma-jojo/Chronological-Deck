# Stage A Sample 3 — T22V3-R00: Temporal Validation Firewall

Status: complete architecture-review sample. Not wired into runtime.
Evidence identity proposal: `T22V3::T22V3-R00::A01@1`
Parent capability: `T22V3-R00`
Direct prerequisites: `ARC508`, `ARC542`, `T22V3-C02`, `T22V3-MKT00`

## Why this sample is intentionally advanced

This module is **not** offered to a beginner. Its ancestry includes foundations, finite probability, scientific Python, sampling/estimation, least squares/regression, validation/leakage, time series and basic market-time language.

The architecture is being tested for both ends of the route: can it teach a novice honestly, and can it later enforce research discipline that prevents a sophisticated but invalid backtest?

## Capability target

Given timestamped features and forward-looking labels, the learner can design and defend a chronological train/test split that prevents label overlap and preprocessing leakage; enforce decision-time information availability; and specify safe temporal joins and data-vintage rules.

---

# PUBLIC LEARNER CONTENT

## 1. The decision timestamp is the research firewall

For every row, ask:

> What information was actually knowable at the instant this prediction/trade decision would have been made?

A feature is invalid if it uses data published, revised or observed after that timestamp—even if the dataframe row now contains it.

## 2. Forward labels occupy a time interval

If a row at decision time `t` is labeled by returns from `t+1` through `t+3`, that training observation consumes future outcome times `{t+1,t+2,t+3}`.

A test decision must not begin while the latest training label is still looking into the test era.

A simple invariant is:

`max(train.label_end_time) < min(test.decision_time)`.

The exact inequality can depend on timestamp convention, but it must be stated and tested.

## 3. Fit transforms on training data only

Scaling, imputation, feature selection, PCA and other learned preprocessing steps are part of the model-fitting process.

If a z-score uses the mean/standard deviation of the full dataset, the training representation already contains information about the future distribution.

Correct pattern:

1. split chronologically;
2. fit the transform on train;
3. apply that fitted transform to train/test;
4. keep the final test evaluation untouched by tuning.

## 4. Random cross-validation is not automatically valid for time series

Random folds can place future observations in a training fold used to predict earlier observations. Forward labels can also overlap across adjacent folds.

Time-aware splitters help, but the researcher still has to choose a gap/embargo that matches the label horizon and data-generating process.

## 5. “Latest revised data” can be future information

Macroeconomic/fundamental series are often revised. A historical backtest using today's revised value for a 2019 decision can give the model a number that did not exist in 2019.

Valid historical rows require the value/vintage actually available by the decision timestamp, or an explicitly justified publication lag proxy.

## 6. Temporal joins need causal direction

A nearest-time join can choose a quote that occurs **after** a trade/decision timestamp.

For point-in-time features, the default conceptual rule is usually “last observation at or before the decision time,” plus an explicit staleness tolerance. Exact-match treatment depends on the event-time convention and must be documented.

---

# PUBLIC MAIN TASK — independent evidence

You have 12 decision rows `t = 1,…,12`.

A feature `x_t`, known at the **close of decision time t**, is:

| t | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| x_t | 10 | 12 | 14 | 16 | 18 | 20 | 100 | 102 | 104 | 106 | 108 | 110 |

The target for row `t` is the **sum of returns over t+1, t+2 and t+3**. So its label window ends at `t+3`.

A researcher proposes:

1. z-score `x` once using all 12 rows;
2. randomly shuffle the rows into four cross-validation folds;
3. use the latest revised version of a macroeconomic series for every historical row.

Answer without writing code first:

**(a)** Identify three distinct leakage/validity defects in the proposal.

**(b)** Use decision rows `1–4` as the first training block. What is the earliest possible **two-row test block** whose decision times do not overlap any training-label window? List the decision rows that form the gap and the two test rows.

**(c)** Fit a z-score using only training feature values `[10,12,14,16]`. For this task use the **population** standard deviation. Compute the training mean, standard deviation, and z-scores of the two test features.

**(d)** State one machine-testable time invariant connecting training-label end times and test decision times.

**(e)** State the allowed data-vintage rule for the macro feature.

---

# PRIVATE EVALUATOR / REFERENCE

## (a) Three defects

1. **Global preprocessing leakage:** fitting mean/standard deviation on all 12 rows lets future feature distribution affect training representation.
2. **Invalid random validation:** random folds break chronology and can mix overlapping forward-label information across train/validation.
3. **Revision/look-ahead bias:** today's revised macro value may not have been available at the historical decision time.

Equivalent precise explanations earn credit.

## (b) Gap and first test block

Training decision rows are 1–4.

The last training row is `t=4`; its 3-step label uses outcome times `5,6,7` and therefore ends at time 7.

The earliest test decision time satisfying

`train label end < test decision`

is `t=8`.

Therefore:

- training decisions: `1,2,3,4`;
- gap/embargo decision rows: `5,6,7`;
- earliest two-row test block: `8,9`.

The gap here is derived from the label horizon, not selected by aesthetic preference.

## (c) Train-only z-score

Training values: `[10,12,14,16]`.

Mean:

`μ_train = (10+12+14+16)/4 = 13`.

Population variance:

`[(10−13)^2 + (12−13)^2 + (14−13)^2 + (16−13)^2] / 4`

`= (9+1+1+9)/4 = 5`.

Population standard deviation:

`σ_train = √5 ≈ 2.2360679`.

Test rows 8 and 9 have `x = 102, 104`.

Therefore:

`z_8 = (102−13)/√5 = 89/√5 ≈ 39.80201`;

`z_9 = (104−13)/√5 = 91/√5 ≈ 40.69644`.

The huge z-scores are not an arithmetic problem. They reveal a large distribution shift relative to the training block—precisely the kind of thing a global scaler would partially conceal.

## (d) Machine-testable invariant

One acceptable invariant is:

`max(train.label_end_time) < min(test.decision_time)`.

Additional required preprocessing invariant in implementation:

`transform.fit_rows ⊆ train_rows`.

## (e) Data-vintage rule

For each historical decision row, the macro feature may use only the release/vintage value available at or before that row's decision timestamp, with any publication lag encoded explicitly. A later revised value cannot be backfilled into earlier decisions unless the task is explicitly studying hindsight/revisions rather than deployable prediction.

## Rubric — 10 points

1. Identifies global-scaler leakage — 1
2. Identifies random temporal-CV problem — 1
3. Identifies revision-vintage look-ahead — 1
4. Correct last training-label end at 7 — 1
5. Correct gap rows 5,6,7 and test 8,9 — 1
6. Correct train mean 13 — 1
7. Correct population SD `√5` — 1
8. Correct test z-scores (exact or close numeric) — 1
9. States strict label-end/test-decision invariant — 1
10. States point-in-time vintage rule — 1

**Clearance threshold:** 9/10, with items 1–5 and 9 mandatory. This is a research-safety gate; a learner who cannot prevent leakage does not clear because the downstream capstone depends on it.

---

# PUBLIC TRANSFER TASK — temporal join

A trade decision table and a quote table are timestamped by instrument. Someone proposes using

`merge_asof(..., direction="nearest")`

to attach the “closest” quote to each trade decision.

1. Explain the causal failure mode.
2. State the safer join direction for a feature that must use the latest quote known **at or before** the decision time.
3. Give two assertions/checks that the research code should enforce after the join.

---

# PRIVATE TRANSFER REFERENCE

1. `nearest` may choose a quote whose timestamp is later than the decision timestamp, producing look-ahead.
2. Use a **backward** as-of match for the stated convention (subject to the project's exact-match/event-order rules).
3. Good assertions include:
   - every matched `quote_time <= decision_time` under the stated convention;
   - quote age is within an explicitly declared tolerance/staleness limit;
   - rows are sorted by join timestamp and grouped by the correct instrument key;
   - no unmatched/forward-filled quote is silently converted into a valid feature.

At least the first two are expected.

## Transfer clearance

The learner must name the temporal inequality, not merely say “use time-series CV” or “avoid leakage.” The point is executable research discipline.

---

# Coding boundary

The main task must first be solved on paper. Then code should encode the invariants rather than replace the reasoning.

Appropriate implementation work after clearance:

- build chronological split indices;
- assert label-end/test-start separation;
- fit a scaler on train only and transform test;
- compare against a deliberately leaky global-scaler result;
- construct backward as-of joins with an explicit tolerance;
- test that no matched observation occurs after the decision timestamp.

Libraries are tools, not guarantees. A time-aware splitter cannot infer the economic label horizon unless the researcher supplies the correct gap/structure.

# Validation evidence for Stage A

Independent calculation during authoring verified:

- train mean `13`;
- population variance `5`;
- population SD `√5 ≈ 2.2360679`;
- row-8 z-score `89/√5 ≈ 39.80201`;
- row-9 z-score `91/√5 ≈ 40.69644`;
- with 3-step forward labels and train rows 1–4, the final train label ends at 7 and the earliest test decision is 8.

The transfer task is consistent with pandas `merge_asof` semantics: backward selects the last right-side key less than or equal to the left key, while nearest can select either temporal side.

No runtime/progress state was changed.
