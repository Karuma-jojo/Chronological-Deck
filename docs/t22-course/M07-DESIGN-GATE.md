# T22 Elite — M07 Retrospective v1.1 Design Gate

Date: 2026-09-24  
Module: **M07 · Markets 0 — Prices, Returns & Trading Mechanics**  
Stable ID: `T22E-MKT01`  
Mode: **RETROSPECTIVE REPAIR**  
Recovered branch head before retrofit: `546103699478051ba58b82475a11156e3bed3ae9`  
Recovered full T22 workflow: run `36017308549`, **SUCCESS**  
Status: **PASS_WITH_EVIDENCE — 24-session architecture retained; bounded semantic/canonical repairs authorized**

This file retrofits M07 to the permanent v1.1 Module Builder and Adversarial Checker protocol. It does not pretend that the original 2026-09-23 build followed this method: the historical repository record shows a boundary commit followed minutes later by a single 4,608-line 24-session authoring commit. The purpose here is to reconstruct the missing pre-authoring reasoning, attack the existing architecture as if it had not been privileged by history, and preserve only what survives.

M01–M06 remain frozen. M08–M11 are unrelated accepted/repaired later work and must not be altered. No fixed M07 assessment is changed by this retrofit unless a concrete defect requires it.

## 0. Recovery receipt

- Branch: `codex/t22-pedagogical-rebuild`.
- Recovered head: `546103699478051ba58b82475a11156e3bed3ae9`.
- Exact-head T22 Elite workflow: `36017308549`, success.
- Current M07 authoring pack before retrofit: `course/t22/authoring/m07.json`, version `m07-authoring-astra-r1`.
- Current instruction version: `m07-instruction-astra-r1`.
- Historical independent review: `M07-ASTRA-REVIEW.md`.
- Historical bounded repair: `M07-RESOLUTION.md`.
- Existing semantic contract: `audit/m07-semantic-contract.json`.
- Existing M07 structure: 24 sessions, 48 fixed tasks, 120 ownership claims.
- Existing post-Astra repairs include solved-example separation, semantic claim remapping, novice short/cover and mark bridges, stronger diagnostic Transfers, exact-close evidence and provenance migration.
- No `M07-ASTRA-FOLLOWUP.md` exists; M07 is therefore not treated as independently frozen merely because later modules were built.

## 1. Boundary Contract

### Destination

After M07 the learner can independently:

1. separate market price, later cash flow, sale proceeds/payoff and net cash gain;
2. distinguish order intent, displayed quote, actual fill/trade and resulting signed position;
3. compute simple return, gross-return factor, multi-period compounded simple return and log return with domains visible;
4. distinguish price return from total return when an explicit cash distribution is supplied;
5. compute price-only long/short P&L under stated simplified conventions and keep currency P&L distinct from underlying percentage return;
6. use signed quantity, signed exposure, absolute notional and quantity scaling consistently;
7. apply an explicitly stated average-cost convention to realized/unrealized P&L and remaining inventory;
8. interpret bid, ask, spread and midquote without treating mid as a guaranteed executable price;
9. distinguish immediate executable side, market-order execution intent and limit-order price constraints from fill guarantees;
10. track partial fills, remaining working quantity, cancellations and quantity-weighted average execution;
11. separate quoted spread effects from explicitly supplied fees;
12. classify buy/sell actions by their effect on an existing signed position, including reduction, close and reversal;
13. reconcile a small unlevered cash/position/marked-equity ledger;
14. audit an integrated market-mechanics record without importing later microstructure, asset-pricing, portfolio or execution-optimization theory.

### Exact entry capabilities

M07 may reuse:

- **M01 · T22E-FND01:** signed arithmetic, ratios, percentages, units and simple equations.
- **M02 · T22E-FND02:** functions, exponentials, logarithms and inverse log/exp relationships.
- **M05 · T22E-TRD01:** payoff/P&L distinction, finite decision vocabulary and elementary accounting discipline.

M06 Bayes is earlier in the route but is not a prerequisite.

### Explicitly deferred

M07 must not teach as owned machinery:

- market-data timestamps, trade/quote joins, corporate actions or raw feed engineering — later M45/M46;
- queue priority, depth, adverse selection, price formation, market making or microprice — later M47;
- no-arbitrage, replication, state prices, risk-neutral valuation or derivatives pricing — later M54;
- covariance/portfolio theory and portfolio optimization — later M55;
- impact models, execution scheduling, implementation shortfall, VWAP/TWAP or TCA — later M56;
- general Kelly/sizing/optimization;
- stochastic-process, asymptotic or distributional return modelling;
- coding/simulation — M08+.

### Decisive prohibition

**M07 is operational market literacy plus exact elementary arithmetic under explicitly stated models. A regulator/exchange source may define generic order semantics, but M07 does not teach jurisdiction-specific trading law, venue microstructure, best-execution doctrine, impact, queue priority, asset pricing or portfolio theory.**

## 2. Source Dossier

Every source below has a specific epistemic role. External sources improve the route but do not override the T22 boundary.

| ID | Source | Type / epistemic role | Specific material inspected | Supports | Limit / deliberately not imported |
| --- | --- | --- | --- | --- | --- |
| REPO-M07 | T22 M65 skeleton, dependency graph, M07 boundary/review/resolution | repository contract | M07 prerequisites, owned/deferred capability lists, downstream owners | curriculum ownership and stop boundary | external finance courses do not expand M07 |
| MIT-15401 | MIT OCW 15.401 Finance Theory I, especially “Risk and Return” | university course route comparator | risk/return lecture route and course scope | conventional return language; confirms that deeper risk/portfolio/valuation belongs beyond an elementary mechanics module | CAPM, portfolio theory, valuation, derivatives and empirical return modelling are not imported |
| OS-FIN-151 | OpenStax Principles of Finance 2e §15.1 Risk and Return to an Individual Asset | broad coverage / notation comparator | dollar vs percentage return, holding-period return, dividends/capital gain | price-return vs total-return arithmetic; denominator at initial investment | annualization, expected return, portfolio/risk material not imported |
| SEC-ORDER | Investor.gov, “Understanding Order Types” (updated 2026-08-18) | primary market-mechanics authority | market and limit order descriptions; partial fills; execution-price uncertainty | market order has no guaranteed execution price; buy/sell limit inequalities; limit fill not guaranteed | U.S. investor bulletin is not Indian law and does not establish venue-specific rules |
| SEC-EXEC | Investor.gov, “Executing an Order” | primary market-mechanics authority | order routing/execution delay and quote-vs-fill distinction | displayed quote can differ from eventual execution; execution is not instantaneous | routing/best-execution detail is later/out of scope |
| SEC-BIDASK | Investor.gov, “Bid Price/Ask Price” / Stock Quotes | primary terminology authority | bid, ask and spread definitions | bid/ask sides and spread | no claim that midquote is universally executable |
| SEC-SHORT | Investor.gov, “An Introduction to Short Sales” (updated 2026-09-09) | primary short-sale terminology authority | borrow/sell then repurchase-to-return mechanism; fees/dividend obligations | bounded novice bridge for short/cover and price-only P&L sign | regulation, margin, locate/borrow mechanics and unlimited-loss discussion are not M07 ownership |
| FINRA-ORDER | FINRA, “Order Types” | secondary regulator/self-regulatory comparator | market/limit order execution and price uncertainty | cross-check of SEC order semantics | no venue-specific operational depth imported |
| MAA-IPG | MAA Instructional Practices Guide | general undergraduate-math pedagogy baseline | design, classroom and assessment practices | alignment, explanation, engagement, assessment integrity | does not validate this particular T22 route |
| IES-WWC | IES/WWC, Organizing Instruction and Study | general learning evidence | worked example/problem alternation; representation linking; retrieval; explanatory questions | worked→guided→independent progression and explicit representation links | recommendations span K–postsecondary; not direct experimental evidence for this adult learner/module |
| PED-SAWATZKI | Sawatzki (2017), Mathematics Education Research Journal 29(1), 25–43 | empirical financial-literacy task-design research | 10 financial dilemmas trialled by 14 teachers and >300 Year 5/6 students | tasks should fit circumstance, remain accessible/challenging and have clear pedagogical architecture; unfamiliar but imaginable contexts can be useful | primary-school population; design principles transferred cautiously |
| PED-NGU | Ngu (2019), International Journal of Mathematical Education in Science and Technology 50(2), 260–276 | empirical percentage-change research | 20 pre-service primary teachers solving simple/complex percentage-change problems | representation/percentage-change difficulties; equation-based structure can reduce cognitive load | small pre-service-teacher sample; not a direct study of adult quant learners |
| PED-PERCENT | Cincinatus & Sheffet (2016), International Journal of Research in Education and Science 2(1), 143–155 | empirical misconception research | 17 pre-service mathematics teachers; percentage misconceptions | denominator/base confusion and over-transfer of numerical procedures motivate explicit starting-price denominator contrasts | small non-random sample; used as a misconception prompt, not population estimate |

Checked 2026-09-24.

Key URLs:

- https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/pages/video-lectures-and-slides/risk-and-return/
- https://openstax.org/books/principles-finance-2e/pages/15-1-risk-and-return-to-an-individual-asset
- https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14
- https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/executing-order
- https://www.investor.gov/introduction-investing/investing-basics/glossary/ask-price
- https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-51
- https://www.finra.org/investors/investing/investment-products/stocks/order-types
- https://maa.org/resource/instructional-practices-guide/
- https://ies.ed.gov/ncee/wwc/practiceguide/1
- https://eric.ed.gov/?id=EJ1132888
- https://doi.org/10.1080/0020739X.2018.1494860
- https://eric.ed.gov/?id=EJ1105176

### Source-role decisions

- MIT is a **route comparator**, not the M07 curriculum owner. Its deeper finance sequence is deliberately excluded.
- OpenStax is the **broad return comparator**, not an authority for M07 order mechanics.
- SEC/Investor.gov is the primary generic order/short-sale terminology source; M07 explicitly labels its examples as simplified models and does not convert U.S. investor education into Indian legal claims.
- Average-cost accounting, signed-exposure notation, frozen-quote round-trip arithmetic and the unlevered marked-equity ledger are **chosen module conventions**. They are stated as such rather than presented as universal brokerage/accounting rules.
- No theorem-heavy proof source is required here because M07 owns no deep theorem. Mathematical rigor is attacked through exact object/convention typing and independent algebraic reconstruction; elementary finance prose is never the sole authority for an identity.

### User-supplied textbook layer

No M07 textbook was supplied for this retrofit. Therefore no textbook sequencing is silently inferred. A later supplied market-microstructure or investments text may be used as a comparator, but cannot override the M07/M47/M54/M55/M56 ownership boundaries.

## 3. Support-Fact / Convention Ledger

M07 is support-fact heavy rather than theorem heavy. Every item below must be visible before first consumption.

| Support fact / convention | First use | Status / source | Hypotheses / object type | M07 action | Why no later ownership theft |
| --- | --- | --- | --- | --- | --- |
| price return uses starting price as denominator | S03 | OpenStax + M01 ratios | positive starting price | derive locally | elementary return arithmetic |
| gross factor `G=P1/P0=1+R` | S04 | independently derived | positive starting price | derive locally | elementary identity |
| sequential simple returns compound by multiplying gross factors | S05 | independently derived | no external cash flow inside the stated sequence | derive locally | later stochastic-return theory not imported |
| log return `ln(P1/P0)` requires positive prices | S06 | M02 log domain + derivation | positive endpoints | derive locally | no distributional log-return modelling |
| `g=ln(1+R)`, `R=e^g-1`, hence `R>-1` for positive endpoints | S07 | M02 + derivation | positive price ratio | derive locally | no asymptotics/statistics |
| total simple return includes supplied cash distribution once | S08 | OpenStax comparator | one explicitly supplied distribution under stated holding-period model | state/derive | no valuation model |
| signed price P&L `q(P1-P0)` | S09 | chosen ledger convention | signed quantity, price-only model | state/derive | no leverage/margin model |
| short price P&L `q(P0-P1)` for q>0 shorted | S10 | SEC short-sale cash-flow model + algebra | simplified borrow-sell/repurchase, excluded costs stated | derive locally | no short-sale regulation/margin unit |
| mark is valuation input, not a cash event | S09/S12/S23 | chosen ledger convention | open inventory with supplied mark | state before use | deeper accounting/data semantics later |
| average-cost realized/unrealized bookkeeping | S12/S19 | chosen accounting convention | explicitly stated average-cost model | state before every task family | other accounting conventions remain outside ownership |
| bid/ask/spread meanings | S13 | SEC glossary | two-sided quote | define locally | no order-book depth/priority |
| immediate buy-at-ask / sell-at-bid round trip | S14 | explicit frozen-quote didactic model | quote assumed unchanged and sufficient for stated quantity | label as model | does not claim universal execution mechanics |
| market order has no fixed execution-price guarantee | S15 | SEC/FINRA | generic stock-order semantics | source-supported statement | no impact/routing model |
| buy limit ≤L; sell limit ≥L; price eligibility ≠ guaranteed fill | S16 | SEC/FINRA | generic limit-order semantics | source-supported statement | queue/depth/fill probability deferred |
| partial fills can occur | S17 | SEC order bulletin | generic order execution | source-supported statement | no venue priority |
| weighted execution average is total value / total quantity | S18 | independently derived | positive executed quantities | derive locally | no transaction-cost analytics |
| cash + q×mark marked-equity identity | S23 | chosen simple unlevered ledger | one asset, no leverage, explicit fees | state locally | no balance-sheet/margin theory |

## 4. Concept Dependency Graph

1. M01 arithmetic + M05 payoff distinction  
   → price/cash-flow/trade-event separation (S01).

2. S01 + signed arithmetic  
   → order/quote/fill/position object separation (S02).

3. Price object + M01 percentages  
   → simple return with correct base (S03).

4. S03 + ratios  
   → gross factor and multiplicative wealth representation (S04).

5. S04  
   → multi-period compounding and non-additivity of simple returns (S05).

6. S04 + M02 logarithms  
   → log return and additive log aggregation (S06)  
   → simple/log conversion and domain boundary (S07).

7. S01 + S03  
   → explicit-distribution total return (S08).

8. S02 signed position + S03 price change  
   → long P&L (S09)  
   → short P&L/sign discipline (S10)  
   → signed exposure/notional/scaling (S11).

9. S09/S11 + stated average-cost convention  
   → realized/unrealized accounting (S12).

10. S02 quote vocabulary  
    → bid/ask/mid/spread (S13)  
    → executable-side frozen-quote arithmetic (S14)  
    → market order semantics (S15)  
    → limit order semantics (S16).

11. S02 + S16  
    → order lifecycle/partial fills/cancellation (S17)  
    → weighted execution (S18).

12. S18 + S12  
    → average-cost inventory through adds/partial closes (S19).

13. S09/S10 + explicit fees  
    → gross vs net P&L (S20)  
    → spread + explicit-fee decomposition (S21).

14. S02 signed position, deliberately retrieved late  
    → action-versus-state transitions including close/reversal (S22).

15. S01/S09/S20/S22  
    → cash/position/mark ledger reconciliation (S23).

16. S13–S23  
    → integrated market-mechanics audit (S24).

Delayed retrieval is deliberate:
- S02 signed position is revisited in S22 after the learner has seen fills, shorts and fees.
- S03/S04 return distinctions recur in S08–S11.
- S13 bid/ask semantics recur in S14–S16, S21 and S24.

## 5. Conceptual-Distinction Map

| Distinction | Risk if collapsed | Forced in |
| --- | --- | --- |
| price ≠ cash flow ≠ payoff/proceeds ≠ profit | one money-valued number substitutes for another | S01 |
| order ≠ quote ≠ fill/trade ≠ position | submitted quantity treated as executed inventory | S02, S17 |
| absolute price change ≠ percentage return | unit and denominator errors | S03 |
| simple return ≠ gross factor ≠ P&L | additive/multiplicative confusion | S04–S05, S09 |
| sequential simple returns ≠ arithmetic sum | changed base ignored | S05 |
| log return ≠ simple return | numerical equality falsely assumed | S06–S07 |
| price return ≠ total return with distribution | distribution omitted/double-counted | S08 |
| long/short position sign ≠ underlying return sign | short P&L sign errors | S09–S11 |
| signed exposure ≠ absolute notional | negative exposure mistaken for negative size | S11 |
| realized ≠ unrealized P&L | closed/open units double-counted | S12, S19 |
| mark ≠ sale/cash event | valuation changes cash ledger incorrectly | S09, S12, S23 |
| bid/ask ≠ mid | midpoint treated as executable | S13–S14 |
| market order execution intent ≠ price guarantee | pre-trade quote treated as fixed fill | S15 |
| limit price eligibility ≠ guaranteed fill | price condition treated as queue/fill promise | S16 |
| submitted quantity ≠ cumulative fills ≠ remaining/cancelled quantity | inventory updated from order intent | S17 |
| weighted execution average ≠ unweighted price mean | fill quantity ignored | S18 |
| quoted spread ≠ explicit commission | costs double-counted/merged | S21 |
| buy/sell action ≠ long/short resulting state | buy always interpreted as opening long | S22 |
| cash ≠ marked inventory value ≠ marked equity | ledger fails reconciliation | S23 |
| mechanical ledger ≠ microstructure/asset-pricing explanation | later theory inferred from arithmetic | S24 |

## 6. Misconception / Failure-Mode Map

Evidence level labels:
- **research-supported:** directly motivated by cited pedagogy research;
- **source/industry-supported:** motivated by regulator/source distinctions;
- **T22-observed:** directly found in M07/M01–M06 review history;
- **theoretically plausible:** design risk, not claimed as empirical prevalence.

| False mental model | Evidence level | Diagnostic design |
| --- | --- | --- |
| “percent change is raw change or uses the ending price as base” | research-supported + T22-observed | S03 requires both raw change and starting-price denominator |
| “successive percentages add” | research-supported / proportional-reasoning literature | S05 +25%,−20% makes additive shortcut visibly fail |
| “simple and log return are interchangeable numbers” | theoretically plausible + T22 target | S07 inverse conversions + domain |
| “price decline means every holder loses” | conceptually plausible | S10/S11 short examples |
| “negative signed exposure means negative notional size” | object-type risk | S11 separate signed exposure/absolute notional |
| “marking a position is a sale” | T22-observed terminology gap | S09/S12/S23 explicitly keep cash unchanged on mark |
| “midquote is where I can trade” | source/industry-supported | S13–S14 midpoint contrast |
| “market order locks the displayed quote” | source/industry-supported | S15 quote vs actual fill |
| “limit order reaching limit guarantees execution” | source/industry-supported | S16 eligibility vs fill certainty |
| “cancel reverses prior fills” | source/industry-supported / ledger risk | S17 lifecycle |
| “average fill = mean of prices” | mathematically plausible | S18 unequal quantities |
| “latest fill becomes the cost of all inventory” | accounting-model risk | S19 diagnostic ledger |
| “commission is inside the quoted spread” | T22-observed weak-transfer target | S21 error diagnosis |
| “buy means long; sell means short” | T22-observed concept risk | S22 reduction/close/reversal |
| “a mechanically consistent ledger explains why prices/fills happened” | boundary risk | S24 explicit non-inference |

## 7. Pedagogy-Evidence Ledger

| Concept/design issue | Documented difficulty / finding | Population/context | Limitation | Design implication |
| --- | --- | --- | --- | --- |
| percentage/base reasoning | percentage problems generate denominator/base and procedure-transfer misconceptions | Cincinatus & Sheffet: 17 pre-service mathematics teachers + motivating grade-8 lesson | small non-random sample | S03 names starting-price denominator; S05 forces changed-base compounding |
| percentage-change representation | complex percentage-change problems were harder; equation representation was common/efficient in the studied group | Ngu: 20 pre-service primary teachers | small sample; not finance professionals | use explicit symbolic relation before story arithmetic; keep raw change vs normalized return separate |
| financial task contexts | useful tasks need fit-to-circumstance, challenge-with-accessibility and pedagogical architecture; unfamiliar but imaginable contexts can work | Sawatzki: 14 teachers, >300 Year 5/6 students in Darwin | school-age financial-literacy setting | tasks remain concrete and auditable; contexts change only when they change reasoning, not for cosmetic “transfer” |
| worked examples / independent practice | worked example/problem alternation and explanatory questions are supported recommendations | IES/WWC practice guide, K–postsecondary scope with recommendation-specific ratings | general learning evidence, not M07 trial | retain worked→guided→independent structure; explicit explanation prompts target distinctions |
| undergraduate quantitative course design | alignment among classroom practices, assessment and course design | MAA IPG | broad undergraduate-math baseline | ownership claims must match literal public assessment actions |

## 8. Representation Progression Map

1. **Cash-event ledger** — introduced S01; reused S08, S20, S23, S24.
2. **Order/quote/fill/position event record** — introduced S02; reused S13–S18, S22, S24.
3. **Return representations** — raw change → simple return → gross factor → chained factor → log return → total return, S03–S08.
4. **Signed inventory / P&L representation** — S09–S12; reused S17, S19, S22–S24.
5. **Two-sided quote representation** — S13; crossed/executable interpretation S14–S16; reused S21/S24.
6. **Fill table / weighted-value representation** — S17–S19; reused in S24.
7. **Average-cost ledger** — S12 then S19; not treated as universal accounting.
8. **Cash + marked inventory = marked equity** — S23; becomes a sanity-check representation for integrated work.

Each major representation reappears later in independent evidence. None is decorative.

## 9. Downstream Obligation Map

| Later owner | What it may assume from M07 | What M07 must not steal |
| --- | --- | --- |
| M45/M46 market-data engineering | trade/quote/fill vocabulary and basic ledger semantics | timestamps, joins, revisions, corporate-action/data-cleaning pipelines |
| M47 market microstructure | bid/ask, spread, market/limit basics, partial fills | depth, queue priority, adverse selection, price formation, market making, microprice |
| M54 asset pricing | return/P&L arithmetic and market vocabulary | law of one price, replication, state/risk-neutral pricing, derivatives |
| M55 portfolio construction | individual-asset return and signed-exposure vocabulary | covariance, diversification, efficient frontiers, portfolio optimization |
| M56 execution/TCA | fill, weighted execution, spread and fee decomposition | impact, scheduling, implementation shortfall, VWAP/TWAP/TCA |

M08 follows M07 in route order but is not a conceptual prerequisite relationship: M08 owns programming/simulation, not deeper market mechanics.

## 10. Narrative Spine

**First keep market objects separate. Then normalize price change into returns. Then attach signed inventory so return becomes position P&L. Then introduce the two-sided quote and distinguish order intent from execution. Then aggregate real fills into inventory/accounting. Finally reconcile cash, position, mark and costs in one auditable ledger without pretending the ledger explains market microstructure or asset value.**

Clusters:

1. **Object hygiene:** S01–S02.
2. **Return representations:** S03–S08.
3. **Position/P&L/accounting:** S09–S12.
4. **Quotes/orders/execution:** S13–S18.
5. **Inventory/cost/state integration:** S19–S23.
6. **End-to-end forensic synthesis:** S24.

The late S22 position-transition session is deliberate delayed retrieval, not a hidden prerequisite: basic signed updates are already owned by S02. S22 revisits that object after shorts, fills and fees so the learner must classify reduction/close/reversal rather than merely add signed numbers.

## 11. Candidate Pedagogical Atoms and Split/Merge Audit

The reconstructed dependency/distinction maps support **24 atoms**. The historical count survives on pedagogical grounds rather than because it already exists.

| S | Atom |
| --- | --- |
| 01 | price/cash-flow/payoff/trade-cash object separation |
| 02 | order/quote/fill/position object separation |
| 03 | simple return and starting-base discipline |
| 04 | gross factor and multiplicative wealth representation |
| 05 | sequential compounding and non-additivity |
| 06 | log return and additive endpoint-ratio derivation |
| 07 | simple↔log conversion and positive-price domain |
| 08 | price return vs total return with explicit distribution |
| 09 | long price P&L and mark meaning |
| 10 | short price P&L and sign/cash-flow bridge |
| 11 | signed exposure, absolute notional and scaling |
| 12 | realized/unrealized P&L under stated average-cost convention |
| 13 | bid/ask/mid/spread object distinctions |
| 14 | executable side and frozen-quote spread arithmetic |
| 15 | market-order execution intent vs price uncertainty |
| 16 | limit-order price constraint vs fill uncertainty |
| 17 | working/partial/filled/cancelled lifecycle |
| 18 | quantity-weighted execution aggregation |
| 19 | average-cost inventory through adds/partial closes |
| 20 | explicit fees and gross→net P&L |
| 21 | spread plus explicit fees as separate cost components |
| 22 | action direction vs resulting signed-position transition |
| 23 | cash/position/mark/equity reconciliation |
| 24 | integrated market-mechanics audit |

### Why not merge?

- **S01+S02:** money-event identity and order/execution identity are distinct novice object systems.
- **S03+S04:** normalized change and multiplicative factor are related but support different misconceptions; S04 is the prerequisite for compounding.
- **S05+S06:** simple-return compounding and log-return additivity are deliberately contrasted; merging encourages false equivalence.
- **S09+S10:** shorting reverses sign logic and needs its own novice cash-flow bridge.
- **S13+S14:** defining quote objects should precede using executable sides/spread cost.
- **S15+S16:** market-order price uncertainty and limit-order price constraints are competing policies, not one blended rule.
- **S17+S18:** lifecycle state and weighted-price aggregation are different representations.
- **S20+S21:** S20 teaches an explicit-fee operator; S21 is the crucial cost-component distinction that defeats “commission is already in spread.”
- **S22 into S17:** rejected. S17 is order lifecycle; S22 is position-state classification and delayed retrieval after shorts/inventory.
- **S23+S24:** S23 establishes a small reconciliation invariant; S24 removes the scaffolding and combines the route.

### Why not split further?

- A separate “mark” session would fragment a support convention already surfaced in S09/S12/S23.
- A separate “short-sale regulation” session would steal later/non-core scope.
- A separate “notional” or “commission” taxonomy would inflate vocabulary without a distinct learner-state transition.
- Deep queue/impact/venue execution details belong to later modules.

### Rejected alternatives

- **22 sessions:** requires merging S20/S21 or S17/S22 and hides distinct misconception targets.
- **23 sessions:** typically merges S03/S04 and weakens the additive-vs-multiplicative route.
- **25+ sessions:** adds vocabulary/industry detail rather than an owned quantitative atom.
- **reorder S22 earlier:** not required for prerequisites; its current delayed-retrieval role is pedagogically defensible and preserves stable IDs/history.

**Sizing disposition: KEEP 24.**

## 12. Evidence-Distance Calibration

Evidence labels describe distance from instruction, not prestige.

### Main

- **proof reconstruction:** S06 only. The lesson already derives log-return additivity; Main reconstructs it on fresh prices.
- **fresh Main evidence:** S24 only. It independently combines order eligibility, fills, weighted execution, mark, executable exit, fees and reconciliation.
- **retrieval/application:** S01–S05 and S07–S23. New numbers do not make those tasks fresh.

### Transfer slots

The structural label “Transfer” in the task ID does not force the evidence class to be transfer.

- **changed-surface Transfer:** S02, S11, S15, S16, S17, S19, S21, S22, S24.
  - direction/sign reversals or missing cues matter in S02/S11/S15/S16/S17/S22;
  - S19/S21/S24 require diagnosis/reconstruction of a flawed ledger or decomposition.
- **retrieval/application:** S01, S03–S10, S12–S14, S18, S20, S23.
  - these are useful parallel practice, but the mathematical/ledger decision structure is substantially the same as instruction/Main.

No task is relabelled “fresh” merely because the story, constants or direction changed.

## 13. Whole-Module Type Check

### Objects

- price is a per-unit exchange amount at a time;
- cash flow/proceeds/P&L are money amounts;
- return is dimensionless;
- signed position is inventory;
- quote is displayed market information;
- order is an instruction;
- fill/trade is executed quantity at execution price;
- mark is a valuation input;
- spread/fee are distinct cost components under the stated model.

No theorem about one object type is silently applied to another.

### Hypotheses / conventions

All calculations state or inherit:
- positive starting prices where return/log formulas require them;
- no external cash flow for simple-return compounding;
- explicitly supplied distributions/fees only;
- simplified short model exclusions;
- frozen quote where executable-side round-trip arithmetic is used;
- explicitly stated average-cost convention;
- simple unlevered one-asset ledger where marked equity is computed.

### Definitions vs interpretations

- “mid” is a derived reference, not a definition of executable price.
- “spread cost” in S14/S21 is a frozen-quote mechanical interpretation, not a universal realized execution-cost theorem.
- average cost is a chosen bookkeeping convention, not the definition of realized P&L in all systems.
- mark-to-market is a valuation operation in the stated ledger, not a cash event.

### Dependencies

Every session consumes only M01/M02/M05 or earlier M07 material plus visible support conventions.

### Future boundary

No queue/depth/impact/asset-pricing/portfolio machinery is used as a premise.

### Evidence

All 120 ownership claims were re-read against literal public requests and rubric rows. Two remaining wording overclaims were found:
- S02 C1–C3 say “Define” although the task observes identification/distinction;
- S20 C4 claims fee-vs-percentage unit distinction although the task only observes supplied fees as currency costs in the net-P&L ledger.

The implementation repair narrows those claims; no fixed assessment needs rewriting.

### Freshness

Classification is given in §12 and will be executable-regression pinned.

### Canonical state

The repaired authoring artifact must point to this design gate/source dossier and describe the completed v1.1 retrofit rather than only its 2026-09-24 construction history.

### Rendering

M07 learner text uses ordinary stored prose; the regression will reject literal escaped-newline artifacts and stale placeholders.

## 14. Bounded repair authorization

Retain:
- all 24 sessions;
- all 48 fixed tasks and evaluator rubrics;
- all stable IDs;
- all existing historical exposure/version treatment;
- instruction version, because learner-facing lessons do not change in this retrofit.

Repair:
1. narrow S02 C1–C3 from “Define …” to literal identify/distinguish capabilities;
2. narrow S20 C4 to treating supplied fees as currency costs in the net-P&L calculation;
3. add canonical Source Dossier, support-fact and pedagogy-evidence ledgers;
4. add honest Main/Transfer evidence-distance classifications;
5. update canonical module/coverage metadata;
6. add executable guards for design-gate/source roles/support facts/evidence classes/canonical state/serialization;
7. update semantic-contract/review/handoff/recovery records;
8. run full T22 Elite CI including real Chromium and inspect the actual exact-head run.

No M07 task obligation changes are authorized by this gate. If implementation uncovers a prompt/rubric defect, stop and reopen the relevant gate instead of silently changing it.

## 15. Gate receipt

| Required artifact | Disposition |
| --- | --- |
| Boundary Contract | PASS_WITH_EVIDENCE |
| Source Dossier | PASS_WITH_EVIDENCE |
| Support-Theorem/Fact Ledger | PASS_WITH_EVIDENCE |
| Concept Dependency Graph | PASS_WITH_EVIDENCE |
| Conceptual-Distinction Map | PASS_WITH_EVIDENCE |
| Misconception / Failure-Mode Map | PASS_WITH_EVIDENCE |
| Representation Progression Map | PASS_WITH_EVIDENCE |
| Downstream Obligation Map | PASS_WITH_EVIDENCE |
| Narrative Spine | PASS_WITH_EVIDENCE |
| Candidate Pedagogical Atoms | PASS_WITH_EVIDENCE |
| Split/Merge Justification | PASS_WITH_EVIDENCE |
| Candidate Session Architecture | PASS_WITH_EVIDENCE — KEEP 24 |

**Next bounded action:** implement the two ownership-wording repairs and canonical v1.1 ledgers/guards without changing fixed tasks, then run the complete module/course verification.
