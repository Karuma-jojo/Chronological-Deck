# M07 RESOLUTION — Astra findings M07-01 through M07-05

## Retrospective v1.1 protocol repair — 2026-09-24

This is the current M07 repair authority. It supplements rather than erases the historical Astra repair below.

A fresh retrospective design pass rebuilt the missing pre-authoring layer in `M07-DESIGN-GATE.md`: boundary contract, source-role dossier, support-fact/convention ledger, concept dependency graph, conceptual distinctions, misconception/failure map, pedagogy-evidence ledger, representation progression, downstream obligations, narrative spine, pedagogical atoms and split/merge audit.

**Architecture result: KEEP 24 sessions.** The count is now justified by 24 distinct learner-state transitions rather than inherited from the 2026-09-23 bulk authoring commit. All 48 fixed tasks and stable IDs are preserved.

A literal reread of all 120 ownership claims found two remaining wording defects:
- S02 C1–C3 said “Define” although the public task observes identification/distinction; all three are narrowed to the literal observable action.
- S20 C4 claimed a general fee-vs-percentage unit distinction although the public task observes supplied fees as currency costs in the net-P&L calculation; the claim is narrowed accordingly.

No fixed prompt, evaluator, reference or rubric is changed. Therefore this v1.1 retrofit changes **zero assessment obligations** and bumps **no obligationVersion**. Learner-facing lessons are unchanged, so `m07-instruction-astra-r1` is retained. Only S02 and S20 capability contracts change.

Permanent additions:
- canonical source-role stack including repository authority, MIT/OpenStax comparators, SEC/FINRA market-mechanics authorities, MAA/IES pedagogy baselines and domain-specific financial/percentage-education studies;
- visible support-fact/convention ledger for return domains, signed P&L, mark, average-cost accounting, bid/ask, frozen-quote arithmetic, market/limit order semantics, partial fills, weighted execution and marked equity;
- evidence-distance calibration: Main = 22 retrieval, 1 proof reconstruction (S06), 1 fresh Main (S24); Transfer slots = 15 retrieval and 9 changed-surface Transfer;
- executable guards for source roles, support facts, pedagogy populations/limitations, canonical status, literal ownership wording, evidence classes, escaped-newline serialization and stale placeholders.

Historical Astra content/provenance repairs remain active. This repair does **not** self-certify independent acceptance. After exact-head full CI/Chromium verification, M07 remains a v1.1-retrofitted candidate for a separate bounded confirmation.


Date: 2026-09-24  
Module: `T22E-MKT01` — Markets 0: Prices, Returns & Trading Mechanics  
Independent review: `M07-ASTRA-REVIEW.md`  
Reviewed baseline: `1e5e94842803c2221a34256daf04c40ee18b640b`  
Review commit: `5fcdd778270106206a7ee862b324a89b8ea92b9f`  
Repair status: **implemented and full repair-head validated; bounded independent follow-up still required**  
Boundary: **M08 CLOSED**

## Preservation

The repair preserves the 24-session architecture, correct return/P&L/order arithmetic, stable session/problem IDs, the shared evidence key `chrono_t22_elite_course_evidence_v1`, and the downstream boundaries to M45/M47/M54/M55/M56.

No M01–M06 authoring content is reopened.

## M07-01 — solved/practice overlap

Resolved without changing the affected fixed numeric tasks merely to hide history.

Current instruction now uses distinct data:
- S07 guided conversion: `R=-.15 ↔ ln(.85)`, replacing the legacy `-.20 ↔ ln(.8)` pair.
- S16 guided sell-limit data: `49.60/49.90, L=49.80`, replacing the legacy S16-T data.
- S17 worked lifecycle: order90, fills25+15, cancel50, replacing the legacy S17-M solved lifecycle.
- S03 guided return: `90→99`, replacing the legacy S04-M `80→92` practice overlap.

Historical provenance is preserved:
- solved links: S07→S07-M, S16→S16-T, S17→S17-M;
- unsolved practice link: S03→S04-M, recorded separately and never promoted to a reference reveal;
- instruction version bumped to `m07-instruction-astra-r1`;
- timestamp-aware migration preserves pre-exposure evidence and rejects post-exposure work as independent;
- both evidence-merge orders are regression-tested so a newer clean lesson cannot erase legacy solved exposure.

## M07-02 — semantic observability

All 120 ownership links were re-audited. The repaired contract no longer assumes claim i belongs to Main rubric row i.

Important dispositions:
- S01 C1 narrowed to observable quoted-price use; C2/C4 use the actual multi-event rows.
- S04 definition/derivation labels narrowed to demonstrated computation/verification; conversion uses M1–M3.
- S05 non-additivity explanation maps to the changed-base explanation; the counterexample uses the numerical comparison rows.
- S06 log-return representation/addition/cancellation are remapped to the rows that actually demonstrate them.
- S07 derivation/sign overclaims narrowed to application and non-equality that the task actually requests.
- S09 P&L-sign interpretation is scored in the P&L row, not the underlying-return row.
- S10 sign/formula rows are corrected and the untaught “recalls” ownership language is removed.
- S11 P&L and scaling claims are remapped to their actual observers.
- S16 sell-limit constraint is Transfer-owned; immediate crossing remains Main-owned.
- S17 intermediate position evidence is now publicly requested.
- S22 sell arithmetic is Transfer-owned and an exact-close case is added.
- S24 marketability is now explicitly requested in Main.

The reviewed semantic authority is `audit/m07-semantic-contract.json`. `audit/m07-astra-repair-checks.mjs` includes mutation tests that substitute a wrong-but-existing criterion/task and require failure.

## M07-03 — public request / scoring / fill quantity

Resolved:
- S07-M no longer scores an unrequested zero-price-boundary explanation; it scores the requested strictly-positive-price domain.
- S17-M explicitly requests cumulative fill, remaining quantity and position after each fill.
- S24-M explicitly requests the initial marketability diagnosis.
- S15-T now states that **all8 units** fill at49.80; the S15 worked example likewise states all10 units fill at30.08.

Materially changed prompt/evaluator contracts are version2; unchanged assessments remain version1.

## M07-04 — novice market terminology

Resolved with bounded JIT bridges:
- S10 defines simplified shorting as selling borrowed units first and **cover** as buying them back later; q(P0−P1) is derived as sale receipts minus repurchase cost.
- Expected exclusions are limited to terms actually introduced: borrow fees, margin requirements and distributions owed.
- S09 defines a **mark** as a supplied valuation price, not a sale/cash receipt.
- S12 states that marking open inventory changes measured unrealized value but is not a new cash event.
- S23 explicitly keeps cash unchanged when only the mark changes.

No deep borrow regulation, margin calculation, queue theory or microstructure is imported.

## M07-05 — weak Transfers

Only the bounded set was redesigned:
- S19-T is now an **average-cost ledger audit** containing incorrect reported average/realized P&L that must be reconstructed from raw fills.
- S21-T is now a **spread/commission decomposition audit** in which the learner must reject the claim that explicit commissions are already inside quoted spread.
- S24-T is now an **integrated ledger audit** with a correct fill value but incorrect weighted average and net P&L; the learner must diagnose marketability and identify the erroneous ledger lines.
- S18 remains useful weighted-average practice and is not misrepresented as strong transfer.

S22-T additionally includes an exact-close-at-zero case to make the retained ownership claim genuinely observable.

## Version/provenance audit

Authoring version: `m07-authoring-astra-r1`  
Instruction version: `m07-instruction-astra-r1`

Changed fixed assessments (obligationVersion2):
- S07-M
- S09-M
- S10-M
- S15-T
- S17-M
- S19-T
- S21-T
- S22-T
- S24-M
- S24-T

Changed ownership-contract sessions:
- S01
- S04
- S06
- S07
- S10

Baseline fingerprints and contract hashes remain pinned in `audit/m07-review-baseline.json`; old evidence is retained but becomes stale where the assessment/ownership contract changed. Stable IDs are not renumbered.

## New persistent gates

- `audit/m07-semantic-contract.json` — reviewed claim→task→rubric-row contract.
- `audit/m07-astra-repair-checks.mjs` — semantic mutation tests, current/legacy instruction separation, version/fingerprint checks, solved-vs-guided exposure migration, both merge orders, terminology bridges and M08 stop.
- existing structural and independent-math gates updated for the repaired contracts/Transfers.

## Exact-head repair verification

Verified repair implementation head: `a0f76357f5e36de6e77799e2a30707c950ce1060`.

Complete T22 Elite Actions run `35952806534`, job `107484744356`, concluded **SUCCESS** on that exact SHA. Inspected logs confirm:

- PASS M07 Astra-repair structural/pedagogy — 24 sessions, 48 fixed tasks, 120 explicit claim→public-request→rubric links;
- PASS M07 independent math — return/log, long/short, bid/ask, limit, weighted-fill, average-cost, fee and ledger arithmetic;
- PASS M07 handoff — reviewed semantic contract, shared evidence key, seven-module runtime and M08 stop;
- PASS M07 Astra repair — semantic mutation contract, clean instruction, 10 versioned assessments, 5 ownership-contract changes, 3 solved-exposure links, guided-only S03→S04 overlap, novice bridges and stronger Transfers;
- real Chromium PASS through M07, including draft/assistance provenance, save/reveal/review, seven-module export/import, packet exposure, corrupt-storage preservation and mobile width.

The earlier red runs were test-harness false positives caused by brittle substring wording guards (`ln.8` matching `ln.85`, and “reported” versus “reports”). Those guards were narrowed to the actual semantic conditions; no course content was weakened to make CI green.

## Required closure

**STOP for bounded independent Astra follow-up of M07-01 through M07-05.** M07 is repaired and fully builder-verified but must not be labelled accepted/frozen until that follow-up. M08 remains closed.
