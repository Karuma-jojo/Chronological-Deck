# M07 BOUNDARY — Markets 0: Prices, Returns & Trading Mechanics

Date: 2026-09-24  
Module: `T22E-MKT01`  
Order: M07  
Status: **boundary locked for single-module authoring; M08 remains closed**

## Purpose

M07 supplies the minimum market language and arithmetic required for later quantitative research without importing later asset-pricing, portfolio, microstructure, execution or data-engineering theory.

The learner should leave M07 able to read a simple trade/quote/position record, compute price and total returns, distinguish arithmetic and log-return conventions, keep long/short P&L signs straight, reason about bid/ask execution, and maintain a small auditable position/cash/P&L ledger.

## Required predecessors

- **M01 · T22E-FND01** — signed arithmetic, percentages, equations, units.
- **M02 · T22E-FND02** — functions plus exponentials/logarithms. This edge is mandatory because M07 owns log returns.
- **M05 · T22E-TRD01** — payoff/P&L distinction, finite decision vocabulary, bankroll/accounting discipline.

M06 Bayes is earlier in the route but is not a mathematical prerequisite for M07.

## M07 owns

- price versus cash flow/payoff and the meaning of a quoted transaction price;
- order, quote, trade, fill and position vocabulary;
- arithmetic/simple return and gross-return factor;
- multi-period compounding of simple returns;
- log-return definition, domain, conversion and time additivity;
- total return when an explicit cash distribution is supplied;
- long and short mark-to-market P&L arithmetic;
- quantity, signed position and notional/exposure arithmetic;
- realized versus unrealized P&L under a stated accounting convention;
- bid, ask, midquote and quoted spread;
- executable side for an immediate buy/sell;
- mechanical spread cost for an immediate round trip under frozen quotes;
- market-order intent and price uncertainty;
- limit-order price constraints and fill uncertainty;
- basic order lifecycle: working, partial, filled and cancelled;
- quantity-weighted average execution price for partial fills;
- average-cost position bookkeeping under an explicitly stated convention;
- explicit commissions/fees and net P&L;
- position transitions: buy/sell can open, add, reduce or close depending on current inventory;
- small integrated cash/position/P&L ledgers with sign/unit sanity checks.

## Explicitly deferred

- deep limit-order-book mechanics, queue priority, depth, adverse selection, price formation, market making and microprice — **M47 / ARC558**;
- market-data event streams, timestamp alignment, quote/trade joins, corporate-action cleaning and raw dataset engineering — **M45 / ARC714 and M46 / ARC715**;
- implementation shortfall, impact models, execution scheduling, fill-probability modelling and TCA — **M56 / ARC559**;
- discounting, law of one price, no-arbitrage, replication, state prices, risk-neutral pricing and derivative pricing — **M54 / ARC553**;
- covariance, portfolio risk, efficient frontiers and portfolio construction — **M55 / ARC554**;
- optimization, Kelly/general sizing and formal risk allocation;
- stochastic-process, distributional or asymptotic return modelling;
- coding/simulation — M08 and later engineering modules.

## CERBERUS publication gates

Before M07 may be handed to Astra:

1. Every one of the 120 ownership claims must point to a public request and rubric criterion that actually observes it.
2. Every lesson/worked/guided example must be numerically and structurally distinct from its fixed Main/Transfer tasks.
3. No hidden theorem, notation or order-mechanics convention may appear without an exact prior source or JIT explanation.
4. Every positive rubric obligation must be explicitly requested in the public prompt.
5. At least one task in each high-risk topic must defeat the obvious shortcut:
   - compounding versus adding returns;
   - log-return domain/additivity;
   - short-P&L sign;
   - bid/ask executable side;
   - limit price constraint versus fill guarantee;
   - partial-fill weighting;
   - realized/unrealized bookkeeping.
6. Independent math checks must recompute representative Main/Transfer answers from first principles.
7. Full T22 Elite CI must pass at the exact pushed M07 head, including real Chromium.
8. M08 authoring remains absent.

## Stop boundary

Author M07 only. Build, self-audit, validate, write `M07-REVIEW-HANDOFF.md`, then stop for external adversarial review. Do not author M08 in this pass.
