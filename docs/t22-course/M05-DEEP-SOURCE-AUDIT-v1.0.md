# M05 deep-source audit — v1.0

Date: 2026-10-03  
Module: **T22E-TRD01 · Trading Games & Decisions Under Uncertainty**  
Mode: **source-first hostile audit; no M05 learner-content edit in this commit**  
Recovered `main`: `7600dd377192aafe6ca777636d94474736ea4e4f`  
Recovered M05 blob: `76b423ce15dbe38dd5ae4fa75ed4cff1a2dc075c`  
Current authoring version: `m05-authoring-astra-r1`

## 0. Disposition

### **DEEP BOUNDED RECONSTRUCTION REQUIRED**

The old M05 is not mathematically broken, and several pieces are worth preserving. But the current 24-session sequence is **not accepted as the design authority** merely because it was historically Astra-reviewed and CI-green.

The source-first regeneration finds four structural weaknesses that are large enough to reject a documentary-only retrofit:

1. the route starts with a one-game payoff table instead of a general **decision model** (actions → uncertainty/states → consequences → criterion);
2. it omits the standard and highly useful **decision-tree representation** for choices followed by chance;
3. its utility block jumps from “preference is extra structure” directly to averaging supplied utility numbers without first making the crucial distinction between an ordinal payoff representation for certain outcomes and a Bernoulli/vNM utility representation for lotteries;
4. its game-theory block jumps straight to a **row-payoff minimizer matrix**, which is legitimate only under an explicitly adversarial/strictly competitive interpretation, rather than first teaching what changes when uncertainty comes from another chooser with her own payoff.

The 24-session *scale* still looks reasonable after independent regeneration. The current **content allocation** does not. The candidate replacement route below therefore keeps the stable module ID and roughly the same footprint while freely reordering, merging and replacing sessions.

This is not yet publication acceptance and not permission to mutate `m05.json` silently. Public task contracts that change must be versioned and historical evidence preserved.

---

# 1. Recovery before judgment

Inspected on the published baseline:

- `course/t22/authoring/m05.json`;
- `M05-REVIEW-HANDOFF.md`;
- `M05-M06-ASTRA-REVIEW.md`;
- `M05-M06-RESOLUTION.md`;
- `M05-M06-ASTRA-FOLLOWUP.md`;
- `M05-M06-SEMANTIC-AUDIT.md`;
- M05 static / semantic / deterministic-math checks;
- M04 v2.1 source dossier, independent adversarial review and final confirmation;
- current M06 and M07 boundaries;
- `docs/t22-rebuild/M65-SKELETON.md`;
- T22 Module Builder / Adversarial Checker v1.2.

Historical protections that **must remain closed**:

- M05 S12 must retain first-hit / stopping / absorption semantics; endpoint-only ruin reasoning must fail;
- claim → public request → exact rubric row mapping may not revert to positional mapping;
- changed public obligations must retain obligation-version/provenance history;
- exact worked-answer exposure cannot be erased by rewriting the current lesson;
- no Kelly/general optimal sizing, Bayes, market mechanics, variance/covariance, MDPs, infinite-horizon ruin, or asset-pricing theory may leak upstream.

The historical review was explicitly a **bounded repair of the existing route**, not a source-led regeneration. That matters: its acceptance does not answer whether the existing route is the strongest current-standard route.

---

# 2. Role-separated source dossier

## 2.1 Published M04 v2.1 — prerequisite authority

Role: hard prerequisite / ownership boundary.

M05 may assume:

- legal finite probability models;
- probability mass on mutually exclusive exhaustive outcomes;
- complements, conditionals and finite trees;
- repeated independent finite paths where explicitly stated;
- finite expectation;
- linearity without independence;
- expectation is not mode, guarantee, or preference.

Design consequence: M05 should **apply** expectation and linearity to decisions; it should not spend full sessions reteaching those M04 ideas.

## 2.2 Sheldon Ross, *A First Course in Probability*, 10th ed. — probability/process comparator

User-supplied PDF inspected directly.

Relevant roles:

- standard finite expectation and probability-weighted averaging;
- repeated gambling examples;
- gambler's ruin as a classical stopping/ruin model.

Important boundary decision: Ross develops the general gambler's-ruin recurrence and later probability machinery. M05 does **not** import that theory. M05 owns only small finite-horizon ruin by explicit path / first-hit enumeration. Ross also contains a Kelly-strategy exercise; Kelly remains explicitly excluded.

## 2.3 Martin J. Osborne, *An Introduction to Game Theory* — choice/utility/game comparator

User-supplied PDF inspected directly.

Relevant route:

- Ch.1: actions, preferences and payoff representations for a single decision maker;
- Ch.2: strategic games, best responses and dominated actions;
- Ch.4: randomization / expected payoff and the appendix on representing lottery preferences by expected value of a Bernoulli payoff function;
- Ch.11: strictly competitive games and maxminimization.

Decisive design consequence: **preferences over lotteries are additional structure**. An ordinal payoff function that merely ranks certain outcomes is not automatically a Bernoulli utility index whose expectation can be used to rank lotteries. M05 needs to teach this distinction before asking learners to average “utility numbers.”

Further consequence: a one-number row-payoff matrix is not the natural first representation of a general strategic game. First show that each player has preferences/payoffs over joint action profiles; only then specialize to an explicitly strictly competitive / minimizing opponent model.

## 2.4 MIT ESD.72, *Engineering Risk-Benefit Analysis* — decision-analysis route comparator

Official MIT OpenCourseWare syllabus and notes inspected.

The decision-analysis unit proceeds through:

- multistage decision model;
- value of information;
- rational-behavior axioms;
- utility;
- risk aversion;
- multiattribute utility;
- decision analysis / risk management.

The DA1 notes describe decision analysis as structuring choices, uncertainties, outcomes and a rule for ranking options.

**Imported:** explicit decision-model anatomy; decision/chance structure; utility comes after the decision model.

**Not imported:** value of information (M06 boundary), multiattribute utility, large-system risk analysis.

Source:
https://ocw.mit.edu/courses/esd-72-engineering-risk-benefit-analysis-spring-2007/

## 2.5 MIT 15.060, *Data, Models, and Decisions* — decision-tree representation comparator

Official MIT OCW lecture summaries explicitly introduce decision trees by asking:

- what choices exist;
- what sources of uncertainty exist;
- what consequences can occur.

Design consequence: M05 should own a small finite **decision tree** with decision nodes and chance nodes, using already-owned M04 finite probabilities. This is a missing representation in current M05.

Source:
https://ocw.mit.edu/courses/15-060-data-models-and-decisions-fall-2014/

## 2.6 MIT 14.123, *Microeconomic Theory III* — preference/utility route comparator

Official MIT OCW topic order:

- choice, preference, utility, representation;
- decision under risk / vNM representation;
- risk aversion;
- later uncertainty theories and critiques.

**Imported:** preference/representation before expected utility; distinguish choice under known finite risk from broader theories of uncertainty.

**Not imported:** Savage theory, stochastic dominance as a formal topic, prospect theory, rational inattention, intertemporal choice.

Source:
https://ocw.mit.edu/courses/14-123-microeconomic-theory-iii-spring-2015/

## 2.7 Stanford Jonathan Levin, *Choice under Uncertainty* — expected-utility precision comparator

Official Stanford lecture notes inspected.

The notes place preferences on lotteries at the center of expected-utility theory and make the independence axiom part of the representation theorem.

**Imported at M05 level:** expected utility is an **assumed supplied representation of lottery preferences**, not a universal behavioral law.

**Not imported:** formal representation theorem proof or advanced axiomatic machinery.

Source:
https://www.web.stanford.edu/~jdlevin/Econ%20202/Uncertainty.pdf

## 2.8 MIT 15.025 / MIT 14.12 / Yale Econ 159 — game-theory route comparators

Independent official course materials converge on a route of:

- rationality / strategic-form model;
- dominance and best responses;
- pure equilibrium reasoning;
- mixed strategies / indifference later.

Yale's mixed-strategy handout states the key support idea: pure strategies used with positive probability in a best-response mixture must yield equal expected payoff.

**Imported:** model strategic interaction before mixed algebra; best response/dominance before randomization; indifference as the elementary mixed-strategy calculation.

**Not imported:** equilibrium-existence theorems, rationalizability machinery, repeated games, Bayesian games, auctions/mechanism design.

Sources:
- https://ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/
- https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/
- https://oyc.yale.edu/economics/econ-159

## 2.9 CFA Institute / MSCI — drawdown terminology comparators

Role: domain terminology check, not pedagogy or optimal-risk authority.

Both use peak-to-trough language for drawdown / maximum drawdown.

Design consequence: current M05's running-peak denominator is conceptually appropriate. Keep drawdown descriptive and path-based; do not turn M05 into portfolio-risk optimization.

## 2.10 MAA *Instructional Practices Guide* — undergraduate mathematics pedagogy

Role: task / assessment / design comparator.

Design consequences retained from M04 v2:

- task demand must match the claimed capability;
- conceptual distinctions require observable evidence, not merely correct arithmetic;
- representations should be connected to learning outcomes and assessment;
- rubrics must observe what the public prompt actually requests.

Source:
https://maa.org/resource/instructional-practices-guide/

## 2.11 IES/WWC, *Organizing Instruction and Study to Improve Student Learning*

Role: general learning comparator.

Useful recommendations include:

- interleave worked examples with problem solving;
- combine verbal and graphical representations;
- connect concrete and abstract representations;
- use retrieval;
- ask deep explanatory questions.

Design consequence: M05 should use tables, trees, wealth paths and matrices as working mathematical objects and then fade them; retrieval should be distributed, not mislabeled transfer.

Source:
https://ies.ed.gov/ncee/wwc/PracticeGuide/1

## 2.12 Probability / gambling misconception evidence

Drive sources including Konold et al. (1993) show that correct-looking answers can coexist with inconsistent probability reasoning and outcome-oriented intuitions.

Use in M05: wrong-solver tasks must discriminate:

- “high win rate = good game”;
- “positive EV = I should take it”;
- “expected value = typical next result”;
- “positive EV repeated often = guaranteed profit”;
- endpoint-only ruin reasoning.

Population/source limitations remain explicit. These studies do not validate this T22 module.

---

# 3. Source-driven boundary contract

## M05 owns

1. finite decision models with **known/supplied probabilities**;
2. actions, states/chance outcomes, consequences and explicit decision criteria;
3. monetary payoff accounting: gross, fee/cost, net payoff, terminal wealth;
4. expected monetary value as one **stated** criterion;
5. zero-EMV / break-even entry fee and algebraic thresholds;
6. sensitivity of a finite decision to supplied probability/payoff inputs;
7. descriptive downside summaries: probability of loss, best/worst payoff, skew / most-likely outcome;
8. one-stage finite decision trees and rollback using an explicitly stated criterion;
9. finite repeated-play expectation as an application of M04 linearity;
10. realized bankroll paths, cumulative P&L, running peaks and drawdown;
11. finite-horizon first-hit ruin by explicit enumeration with stopping/absorption;
12. hard bankroll/stake feasibility constraints;
13. multiplicative bankroll percentage arithmetic and recovery arithmetic;
14. explicit preferences as extra structure;
15. expected utility on finite lotteries **only when a Bernoulli/vNM-style utility representation is supplied/assumed**;
16. finite-table certainty equivalents and risk premiums;
17. statewise dominance and an explicitly chosen worst-case / maximin criterion;
18. elementary strategic-form games, best responses and dominance;
19. explicitly strictly competitive 2×2 maximin/minimax/saddle reasoning;
20. elementary 2×2 mixed-strategy expected-payoff / indifference calculations.

## M05 does not own

- posterior updating / Bayes / likelihood ratios / value of information → M06;
- prices, returns, orders, quotes, fills and trading mechanics → M07;
- simulation/programming → M08;
- formal distribution theory, variance/covariance → later probability/statistics modules;
- Kelly / log-optimal sizing / general optimization;
- stochastic dominance as a formal distribution topic;
- portfolio construction;
- dynamic programming / MDPs;
- infinite-horizon ruin;
- formal expected-utility representation theorem proofs;
- prospect theory / behavioral decision theory survey;
- multiattribute utility;
- general Nash/minimax existence theorems;
- repeated games / Bayesian games / auctions / mechanism design;
- no-arbitrage, replication or derivative pricing.

---

# 4. Concept dependency graph

```text
M04 finite probability + expectation
        |
        v
decision anatomy: actions -> states/chance -> consequences -> criterion
        |
        +--> monetary accounting -> EMV criterion -> zero-EMV fee / thresholds
        |                                |
        |                                +--> sensitivity + downside summaries
        |                                |
        |                                +--> one-stage decision tree
        |
        +--> repeated finite plays -> realized wealth path
                                      |
                                      +--> running peak / drawdown
                                      +--> first-hit finite ruin
                                      +--> hard feasibility constraints
                                      +--> multiplicative wealth / recovery
        |
        +--> preferences over certain consequences
                    |
                    +--> lottery preferences are extra structure
                              |
                              +--> supplied Bernoulli utility -> expected utility
                              +--> certainty equivalent / finite risk premium
        |
        +--> statewise dominance / explicit maximin criterion
        |
        +--> source of uncertainty changes: another chooser is strategic
                              |
                              +--> bimatrix / best responses / dominance
                              +--> strictly competitive specialization / saddle
                              +--> mixed randomization / indifference
        |
        v
fresh integrated decision audit
```

The graph does **not** regenerate the current route exactly. It creates a missing decision-model/tree front end, deepens the utility bridge, and requires a general strategic-game bridge before the zero-sum specialization.

---

# 5. Conceptual-distinction map

The rebuilt module must make these contrasts observable:

| Distinction | Must not collapse into |
| --- | --- |
| probability model | decision criterion |
| state/chance outcome | action chosen by decision maker |
| state of nature | strategic opponent |
| gross receipt | net payoff |
| payoff increment | wealth stock |
| expected money | most-likely / typical one-play result |
| expected money | probability of loss |
| positive EMV | universal recommendation |
| zero-EMV fee | financial market “fair value” |
| threshold / sensitivity | posterior update |
| expected total | guaranteed realized total |
| initial-loss P&L | drawdown from running peak |
| terminal wealth | first-hit ruin event |
| feasible stake set | optimal stake |
| additive dollars | multiplicative wealth factors |
| preference ranking of certain outcomes | lottery preference |
| ordinal payoff label | Bernoulli utility suitable for expectation |
| expected monetary wealth | expected utility |
| certainty equivalent | expected monetary wealth |
| local/model-specific risk premium | universal price |
| statewise dominance | maximin |
| maximin criterion | expected-value criterion |
| general 2-player payoff matrix | one-number zero-sum row-payoff matrix |
| pure best response | mixed randomization |
| 2×2 indifference algebra | general equilibrium/minimax theorem |

---

# 6. Misconception / wrong-solver map

Every retained misconception must have an observable discriminator.

| Wrong solver | Required discriminator |
| --- | --- |
| “positive EV means take the bet” | same model, explicit constraint/preference changes choice |
| “90% wins means good” | high win-rate negative-EMV and low win-rate positive-EMV contrasts |
| “EV is what usually happens” | skewed lottery with mean unlike modal outcome |
| “fair price = market price” | learner must say zero-EMV entry fee under supplied probabilities only |
| “more plays guarantee the mean” | expected total versus a possible realized path |
| “dependence blocks linearity” | apply M04 linearity to supplied dependent/unspecified play expectations |
| “final endpoint tells whether ruin occurred” | path hits 0 then hypothetical unstopped continuation recovers |
| “drawdown is loss from start” | final wealth above start but below prior peak |
| “10% down then 10% up cancels” | factor / changed-base counterexample |
| “hard cap finds optimal stake” | multiple stakes feasible under same cap |
| “utility numbers are just another payoff label” | two monotone ordinal relabelings that change an invalid EU calculation |
| “any increasing transform preserves EU rankings” | explicit finite counterexample; only appropriate positive-affine rescaling is licensed for a Bernoulli index |
| “CE is the expected cash amount” | lottery with CE different from expected wealth |
| “maximin is universally rational” | same table under a different stated criterion gives another choice |
| “column player always minimizes row payoff” | general bimatrix where column maximizes her own payoff |
| “mixed means choose 50/50” | asymmetric 2×2 indifference probability |
| “solving indifference proves a general theorem” | explicit scope statement and counterexample / theorem boundary |
| “new numbers = transfer” | evidence-distance ledger labels rehearsal honestly |

---

# 7. Representation progression

| Representation | Introduce | Connect/reuse | Fade / independent evidence |
| --- | --- | --- | --- |
| action–state–consequence table | new S01 | S03–S08, S19 | S24 learner chooses it if useful |
| accounting payoff table | S02 | EMV, downside, utility | later tasks may supply prose instead |
| decision tree (decision node + chance node) | new S04 | threshold/sensitivity; S24 | fresh task requires learner to decide table vs tree |
| sensitivity equation / threshold line | S05 | S06, S24 | prompt does not tell which input to solve for |
| outcome-profile table | S07 | criteria audit | fade into prose lottery |
| total-payoff sum | S09 | path block | later assumed |
| wealth / cumulative-P&L path | S10 | drawdown, ruin | S24 if path constraint appears |
| running-peak / drawdown table | S11 | hard constraint / synthesis | independent path from raw wealth sequence |
| first-hit tree / prefix ledger | S12 | none decorative; direct evidence | learner must reject endpoint-only solver |
| feasible-stake interval / inequality | S13 | synthesis | fresh constraint with different loss rule |
| wealth-factor chain | S14 | recovery | later no scaffold |
| certain-outcome preference ordering | S15 | S16 | distinction check |
| lottery + Bernoulli-utility table | S16–S18 | CE / criteria audit | fresh supplied utility model |
| common-state payoff matrix | S08/S19 | strategic bridge | learner must decide if probabilities matter |
| general bimatrix (two payoffs/cell) | S20 | S21 | best-response evidence |
| zero-sum row-payoff matrix | S22 | S23 | only after strictly competitive assumption stated |
| expected-payoff-vs-mix equations | S23 | S24 if used | no canned formula |

A representation counts only if it changes reasoning and is reused in evidence.

---

# 8. Hostile audit of current S01–S24

Evidence-distance classifications below refer to the **current published lesson + task pair**, not the future rebuild. Under the current M04 v2 standard, a new number/story is not transfer.

| Current S | Audit | Current Main / Transfer evidence | Source-driven disposition |
| ---: | --- | --- | --- |
| 01 | Accounting is useful, but no action/state/criterion model | retrieval / retrieval | **DEEP REWRITE**; decision anatomy precedes accounting |
| 02 | Re-teaches M04 expectation more than it teaches decision theory | retrieval / retrieval | **MERGE/REWRITE** as EMV criterion, not expectation ownership |
| 03 | Math is sound; “fair price” wording invites M07/asset-pricing confusion | retrieval / retrieval | **RETAIN, RENAME** zero-EMV / break-even entry fee |
| 04 | Useful threshold algebra | retrieval / retrieval | **RETAIN/MERGE** into general threshold atom |
| 05 | Useful payoff/fee sensitivity | retrieval / retrieval | **RETAIN/MERGE** with S04 then expand true sensitivity |
| 06 | Strong core distinction | retrieval / retrieval | **RETAIN** |
| 07 | Correct, but M04 already owns expectation≠mode/typical | retrieval / retrieval | **MERGE** into descriptive downside/skew session |
| 08 | Good anti-hidden-preference idea but not yet a real decision framework | retrieval / retrieval | **RECONSTRUCT** inside dominance/criteria audit |
| 09 | Correct theorem, but M04 already owns linearity without independence | retrieval / retrieval | **RETAIN AS APPLICATION**, do not reclaim theorem |
| 10 | Strong and downstream-useful | retrieval / retrieval | **RETAIN** |
| 11 | Strong path-dependent risk representation | retrieval / retrieval | **RETAIN**; align terminology with peak-to-trough sources |
| 12 | Historical repair is good: first hit, absorption, prefix counting | retrieval / reasoning reconstruction | **RETAIN/DEEPEN**; explicitly refuse general Ross recurrence |
| 13 | Strong boundary: feasibility ≠ optimal sizing | retrieval / retrieval | **RETAIN** with feasible-set representation |
| 14 | Valuable multiplicative wealth arithmetic | retrieval / retrieval | **MERGE** with recovery atom |
| 15 | Valuable but overlaps S14 | proof/reasoning reconstruction / retrieval | **MERGE** into one coherent factor/recovery session |
| 16 | Correct statement that preference is extra structure, but underspecified | retrieval / retrieval | **DEEP REWRITE** around preference representation |
| 17 | Calculation is correct, but it averages a supplied “utility table” without first licensing that table as a lottery-preference representation | retrieval / retrieval | **STRUCTURAL REWRITE** after new lottery-preference bridge |
| 18 | CE/risk-premium calculation is useful and mostly sound | retrieval / retrieval | **RETAIN/REWRITE** with source-precise interpretation |
| 19 | Statewise dominance is valuable | retrieval / retrieval | **MOVE EARLIER + REUSE** |
| 20 | Maximin is useful if explicitly chosen | retrieval / retrieval | **RETAIN**, then reuse strategically later |
| 21 | Main defect: row-only matrix makes “column minimizes” look general | retrieval / retrieval | **STRUCTURAL REWRITE**: general bimatrix first |
| 22 | Elementary indifference algebra is valuable | reasoning reconstruction / retrieval | **RETAIN** after strategic-model bridge and strictly competitive specialization |
| 23 | Pure interleaved retrieval, not new conceptual ownership | retrieval / retrieval | **REMOVE AS STANDALONE**; distribute retrieval strips |
| 24 | Worked example pre-rehearses the Main's exact integrated checklist; current synthesis is not fresh | retrieval / retrieval | **REBUILD COMPLETELY** as learner-selected fresh synthesis |

### Current evidence-distance conclusion

The current module has useful practice, but its `Transfer` slots do **not** currently establish transfer under the stricter post-M04 standard. On a hostile reading, **0/24 current Transfer slots earn a confident changed-surface label**. S12-T is stronger than the others because it discriminates first-hit reasoning from endpoint reasoning, but the visible lesson already teaches the same first-hit/prefix method; it is best classified as reasoning reconstruction unless redesigned.

This is not a criticism of retrieval. Retrieval is valuable. The defect is the old evidence architecture's implicit prestige attached to a field named `transfer`.

---

# 9. Independently regenerated candidate 24-session architecture

The design case regenerates a module of about 24 sessions, but **not** the current allocation.

## Block A — model a decision before calculating it

1. **Decision anatomy: actions, states/chance, consequences & criterion**  
   Build the action–state–consequence matrix. Separate model facts from the rule used to choose.

2. **Money accounting: cost/fee, gross receipt, net payoff & terminal wealth**  
   Preserve the strongest part of old S01.

3. **Expected monetary value as an explicit criterion; zero-EMV entry fee**  
   Apply M04 expectation; define “EV-fair” narrowly and avoid market-value language.

4. **One-stage decision trees: decision nodes, chance nodes & rollback**  
   New representation. Use only known finite probabilities; no value-of-information/Bayes.

5. **Break-even thresholds: solve for probability, payoff or fee**  
   Unify old S04/S05 algebra.

6. **Sensitivity & model-input audit**  
   Vary one supplied probability/payoff/cost at a time; distinguish sensitivity from updating.

7. **Downside profile: P(loss), worst/best outcome, skew & modal outcome versus EMV**  
   Merge old S06/S07; explicitly attack high-win-rate and “mean=typical” solvers.

8. **Statewise dominance before probabilities**  
   Move old S19 earlier; probability-free pruning of dominated choices under “more money preferred.”

## Block B — repetition creates paths, not guarantees

9. **Fixed-horizon repeated play: expected total versus realized total**  
   Apply M04 linearity; no theorem re-ownership.

10. **Bankroll stock, payoff increments & cumulative P&L path**

11. **Running peaks, drawdown amount/percentage & maximum drawdown**

12. **Finite-horizon first-hit ruin: stopping, absorption & prefix enumeration**  
   Preserve historical repair; no recurrence/infinite-horizon formula.

13. **Hard loss / bankroll constraints: feasible stake set, not optimal stake**

14. **Multiplicative wealth factors & recovery after drawdown**  
   Merge old S14/S15 into one coherent representation progression.

## Block C — a probability model still does not choose for you

15. **Preferences over certain consequences & ordinal payoff representation**  
   A ranking is extra structure; arbitrary numerical labels need not measure intensity.

16. **Preferences over lotteries: when expected utility is licensed**  
   New missing bridge. A Bernoulli/vNM-style utility index represents lottery preferences; it is not “any numbers consistent with the ranking.” Include a finite positive-affine-versus-arbitrary-monotone discriminator without proving the full representation theorem.

17. **Expected utility on supplied finite lotteries; risk-neutral money as a special case**  
   Compare expected money with expected utility under an explicitly supplied model.

18. **Certainty equivalent & finite risk premium**  
   CE solves supplied-utility indifference; (E[W]-CE) is model/lottery-specific. Do not promote a global risk-aversion theorem without the later analytic machinery.

19. **Decision-criteria audit: dominance, EMV, hard constraints, maximin & EU**  
   Same finite decision, different explicitly stated criteria. No universal winner without a criterion.

## Block D — chance is not an opponent

20. **States of nature versus strategic opponents; general 2×2 bimatrix anatomy**  
   Each player gets her own payoff. This is the missing bridge.

21. **Pure best responses, dominant/dominated actions & mutual best response**  
   If the term “pure Nash equilibrium” is used, define it narrowly as mutual best response and do not import existence theory.

22. **Strictly competitive 2×2 games: maximin/minimax security & pure saddle**  
   Only here is a one-number row-payoff matrix with a minimizing column player justified.

23. **Mixed strategies in 2×2: expected payoff & indifference**  
   Solve elementary mixing probabilities; no general minimax/Nash-existence theorem.

24. **Fresh integrated decision audit**  
   Learner must first identify the model type (chance vs strategic), select an auditable representation, identify which quantities/criteria are actually supplied, reject an invalid universal recommendation, and solve the necessary finite calculations. The worked lesson must use a materially different synthesis so the Main cannot be copied.

---

# 10. Split / merge justification

### Merge

- old S06 + S07 → one richer downside/skew session;
- old S04 + S05 → threshold atom plus separate sensitivity atom;
- old S14 + S15 → factor/recovery progression;
- old S23 → distributed spaced retrieval, not a concept-owning session.

### Add / replace

The freed capacity is used for concepts that the independent source stack says are missing:

- decision-model anatomy;
- decision-tree representation;
- lottery-preference / Bernoulli-utility bridge;
- general strategic-game/bimatrix bridge.

### Preserve substantially

Old S10–S13 are the strongest coherent block and should largely survive, with deeper representations/evidence.

---

# 11. Downstream obligation map

## To M06

M05 must hand off a clean distinction:

- M05: **given** probabilities + explicit decision criterion;
- M06: infer/update probabilities from evidence.

M05 must not teach value-of-information/posterior decision analysis.

## To M07

M05 should hand off:

- payoff/accounting discipline;
- wealth stock versus payoff increment;
- percentage wealth factors;
- criteria/constraint discipline.

M05 must not use bid/ask, prices/returns, fills or market mechanics as if already owned.

## To later risk / portfolio modules

M05 seeds:

- path risk (drawdown);
- feasibility constraints;
- utility/CE vocabulary.

It does not own variance/covariance, diversification, portfolio optimization, Kelly or formal risk measures.

## To later dynamic decision modules

M05's finite-horizon ruin is explicit enumeration only. Dynamic programming / MDP machinery remains later.

---

# 12. Evidence architecture required for the reconstruction

The replacement M05 must add, permanently:

- `sourceLedger`;
- `representationProgression`;
- 48-task `evidenceDistance`;
- `decisionAudit` only for genuine fresh/changed-surface decisions;
- 24-session `wrongSolverAudit`;
- current semantic-separation audit;
- exact claim → public request → rubric observer mapping for all claims.

Rules:

1. `main` and `transfer` are storage slots, not evidence prestige labels.
2. New numbers/story do not create transfer.
3. A task may honestly be retrieval.
4. A wrong solver must be capable of producing a plausibly correct-looking answer and then be forced to fail.
5. S24 is not fresh if the lesson immediately rehearses the same checklist.
6. Changed public contracts require obligation-version/provenance updates.

---

# 13. What this audit does **not** claim

- It does not prove 24 sessions is globally optimal; it says 24 remains defensible after independent regeneration.
- It does not scientifically validate the finished module.
- It does not claim the cited university syllabi are designed for this learner.
- It does not import advanced material merely because the comparator source teaches it.
- It does not publish or accept a rebuilt M05.
- It does not reopen M04.

## Next implementation gate

Construct the permanent M05 v2 design ledger from this audit, then rebuild `m05.json` on the review branch. Only after exact math/static/browser validation should an independent adversarial reviewer see a frozen candidate head.
