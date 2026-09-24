# M07 CERBERUS builder audit — Markets 0

Date: 2026-09-24  
Branch: `codex/t22-pedagogical-rebuild`  
Module: `T22E-MKT01`  
Status: **historical builder audit; superseded by independent M07-ASTRA-REVIEW.md where findings conflict**

Independent follow-up on `1e5e94842803c2221a34256daf04c40ee18b640b` found bounded repairs required despite a genuinely successful full Actions run. The zero-known-leakage, zero-hidden-obligation and all120-semantic-observer assertions below are retained as historical builder claims, not current acceptance evidence. See `M07-ASTRA-REVIEW.md` for exact counterexamples, version/provenance requirements and the repair boundary. M08 remains closed.

This record applies the reusable CERBERUS adversary distilled from Astra's M01–M06 findings. It is deliberately not labelled independent acceptance: the same builder that authored M07 performed this audit.

## Scope

Read the complete 24-session M07 pack, all 48 public Main/Transfer tasks, all 48 evaluator contracts, all 120 ownership claims, prerequisite records, instruction/task separation records, downstream M45/M47/M54/M55/M56 boundaries, shared evidence/runtime behavior and course integration guards.

M07 remains a single-module trial. M08 is not authored.

## Boundary result

M07 owns operational market literacy and arithmetic:

- price/cash-flow/payoff separation;
- simple, gross, compounded, log and explicit-cash-flow total returns;
- long/short P&L and signed exposure;
- average-cost realized/unrealized accounting;
- bid/ask/mid/spread;
- elementary market/limit-order and fill semantics;
- order lifecycle, partial fills and weighted execution;
- explicit fees and auditable cash/position/P&L ledgers.

The following remain deliberately deferred: deep order-book microstructure (M47), market-data engineering (M45–M46), asset-pricing/no-arbitrage theory (M54), portfolio theory (M55), and impact/execution optimization/TCA (M56).

## CERBERUS findings found during the build

### C-01 — executable graph versus learner roadmap prerequisite drift

The semantic dependency graph correctly required M02 because M07 owns logarithmic returns, but `course/t22/generated/roadmap.json` still listed only M01 and M05.

Disposition: repaired. M07 now consistently declares M01 + M02 + M05. This prevents logarithms from becoming hidden school knowledge.

### C-02 — hidden positive Transfer scoring obligations

The first authoring pass had several Transfer rubrics that awarded positive points for a small interpretation not explicitly requested in the public Transfer prompt. This repeats the M03/M05/M06 class of defect Astra found.

Disposition: repaired before runtime publication. Public Transfer prompts now explicitly request the scored distinction/interpretation in the affected sessions, including price-change versus return, gross-factor meaning, endpoint log ratio, return-convention distinction, long P&L versus return, simplified-short exclusions, midquote executability, fill-driven position change, quantity weighting, remaining average cost and the integrated ledger details.

### C-03 — avoidable early quote/fill ambiguity

S02 originally paired a 99/101 displayed quote with an unexplained buy fill at100.50 before the course teaches executable sides. Such a fill is not inherently impossible, but explaining why would import unnecessary venue/microstructure nuance.

Disposition: repaired. The fixed S02 Main uses a simple fill at101.00, keeping the session about order versus fill versus inventory rather than price-improvement mechanics.

### C-04 — historical stop guards blocked authorized forward progress

M05/M06 handoff checks correctly protected M07 before user authorization, but once M07 was explicitly authorized those guards became obsolete. M06 also pinned the whole course metadata version to the six-module checkpoint.

Disposition: repaired narrowly. The historical modules remain frozen; their checkers now require the authorized M07 candidate and enforce absence of M08. M06 verifies its own six-module accepted frontier while allowing the new course metadata version.

## 15-lens CERBERUS result

### Mathematics / reasoning

Independent executable checks cover:
- simple/gross/compound return arithmetic;
- an explicit counterexample to adding simple returns;
- log-return endpoint cancellation;
- simple/log conversion and domain;
- cash-distribution total return;
- long and short sign conventions;
- bid/ask crossing;
- market-fill deviation arithmetic;
- limit-price inequality;
- cancellation/partial-fill accounting;
- quantity-weighted fill prices;
- average-cost inventory;
- explicit fees;
- cash/position/equity reconciliation;
- integrated M07-S24 ledger.

No material mathematical error was found in the builder audit.

### Prerequisite forensics

M01 supplies arithmetic/percentages/signs. M02 supplies logarithms/exponentials. M05 supplies prior payoff/accounting discipline. New market terms are taught JIT before they are assessed. M06 is earlier in the route but is not required by M07.

Known hidden prerequisite count after repair: **0 identified**.

### Real-teaching audit

All 24 lessons contain actual explanatory text plus a worked example and guided check. The lesson is not merely a request to solve the fixed task.

### Instruction ↔ fixed-assessment contamination

All 24 lessons were compared against their Main and Transfer surfaces during authoring. Worked/guided numbers and decisive calculations were deliberately made distinct from the fixed assessments.

Known answer-bearing fixed-task leakage after repair: **0 identified**.

This is a builder audit, not a blinded proof that no semantic isomorphism remains; Astra should attack this explicitly.

### Ownership observability

- sessions: **24**
- fixed assessments: **48**
- required-ownership claims: **120**
- claim records: **120/120**

Every retained ownership claim points to the complete public Main request and to the exact scoring criterion that observes it. The public Main was deliberately written to elicit all five claims rather than relying on positional metadata to create fake coverage.

### Prompt ↔ rubric fairness

All Main and Transfer scoring rows were compared against public requests. C-02 records the underspecified Transfer prompts found and repaired.

Known hidden positive rubric obligations after repair: **0 identified**.

### Capability discrimination

High-risk tasks intentionally make the common shortcut fail:

- S05: +25% then−20% compounds to0%, while arithmetic addition says+5%.
- S06: log additivity must show cancellation of the intermediate price.
- S10/S11: a falling underlying can generate positive short P&L.
- S14: immediate buy must use ask and immediate sell bid.
- S16: price eligibility is separated from fill certainty.
- S18: unequal fill quantities make the unweighted average wrong.
- S22: a buy can reduce a short and cross through zero.
- S24: order constraint, fills, average execution, mark, executable exit and fees must reconcile.

### Transfer authenticity

Transfer data and surfaces differ from the instructional examples and Main fixed data. Transfers are not relied on as the sole ownership observer in v1, so a weak Transfer cannot falsely certify a claim by itself. Astra should still challenge whether each Transfer provides useful reconstruction rather than cosmetic renaming.

### Evidence / provenance

M07 introduces new stable IDs under the existing `chrono_t22_elite_course_evidence_v1` store. It does not create a new evidence namespace.

All M07 obligations begin at version1. There is no historical M07 T22-Elite lesson/task exposure to migrate before runtime integration. Any future task/evaluator or instruction edit must use the established obligation/fingerprint/instruction-version machinery.

### Runtime reality

The seven-module Chromium regression now covers:
- M07 module/session loading;
- current contract and assessment fingerprints;
- save/reveal/review;
- M07 unsaved Main/Transfer draft restoration with assistance provenance;
- answer-bearing packet exposure for both M07 fixed tasks;
- seven-module export/import;
- mobile-width and corrupt-storage invariants inherited from the shared workflow.

### Versioning

M07 is new content, so its 48 fixed tasks begin at `obligationVersion: 1`. Existing M01–M06 evidence is not rewritten or recertified.

### CI truthfulness

The full workflow must run on the exact pushed candidate head. A green previous M01–M06 run is not accepted as evidence for M07. Final run SHA/job/logs belong in `M07-REVIEW-HANDOFF.md`.

### Scope/boundary

No M08 authoring pack exists. No deep M47/M54/M55/M56 theory is taught in M07 lessons.

### Repair-of-repair

After C-02, affected Transfer prompts were re-read against their scoring rows. After C-03, S02 was re-read to ensure the session still tests order/fill/position rather than executable-side knowledge. After C-04, historical M05/M06 checkers were narrowed rather than deleted.

## External reviewer targets

Astra should spend its expensive pass primarily on:

1. semantic lesson→assessment overlap that a builder may still miss;
2. whether all 120 claims are genuinely elicited rather than merely worded into a long Main;
3. operational-finance terminology that may have convention ambiguity (notional, realized/unrealized, market/limit order language);
4. whether M07 steals any substantive M47/M54/M56 capability;
5. whether S24 is integrated but still novice-usable;
6. task-specific rubric fairness after the C-02 repair;
7. exact accepted-state CI/browser logs.

## Exact-head verification

Verified implementation head: `84baddc69643f4654eb87bf05ed907febf37b077`. Full T22 Elite Actions run `35927759177`, job `107406819179`, concluded **success**. The exact logs contain:
- PASS M07 CERBERUS structural/pedagogy — 24 sessions, 48 fixed tasks, 120 explicit semantic links;
- PASS M07 independent math — returns/logs, long-short signs, bid/ask execution, limit constraints, weighted fills, average-cost accounting, fees and ledger reconciliation;
- PASS M07 handoff — M02 logarithm edge, seven-module runtime integration, shared evidence key and M08 stop;
- PASS real Chromium seven-module workflow through M07.

Two early CI failures were useful adversarial catches rather than bypassed gates: repaired public prompts had stale `claimEvidence.publicRequest`, and a repaired S02 evaluator criterion had stale `rubricEvidence`. Both semantic ledgers were corrected to the live contracts; the equality/semantic gates were retained.

## Current disposition

**Strong CERBERUS candidate with full exact-head verification; not independently frozen.**  
Hand to Astra for bounded independent M07 review. Stop. M08 remains closed.
