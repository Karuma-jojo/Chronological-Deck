# SMMC Final Engine Scaffold

Date: 2026-09-24  
Branch: `codex/smmc-final-engine-v1`

## Purpose

This checkpoint turns the final audit into an executable build spine without rebuilding the SMMC companion.

The existing architecture remains authoritative:

- six primary domains;
- 88-problem 2017-2025 ledger;
- East A/B versus supplementary C distinction;
- secondary content tags and method tags;
- stable T25 target crosswalk;
- GREEN / AMBER / RED semantics;
- exact-unit fail-closed unlocks;
- separate T25 and SMMC academic evidence;
- reversible workspace/navigation state.

This scaffold does **not** claim that the missing engine is finished.

## Seven build phases

1. Close primary-domain reconciliation.
2. Finish core method and bridge authoring.
3. Map every East AMBER/RED problem to exact authored units.
4. Connect canonical T25 evidence and genuine SMMC unit certification.
5. Build protected historical S-XFER attempts with 0-7 review.
6. Build the whole-paper vault and S-PAPER.
7. Finish rare specialist/open-problem routes last.

The executable phase contract lives in `course/smmc/engine-roadmap-v1.mjs`.

## Module blueprint

All 18 canonical modules now have an explicit unit-level build slot.

Already authored units are detected from the real authoring bank; planned IDs are scaffolding only and are not learner-visible until their lesson/tasks/evaluator are actually written.

The proposed `S-BRIDGE-ALG1` contest-algebra bridge is deliberately kept as **candidate-not-canonical**. It may be added only after the exact-gap pass confirms a recurring gap that is neither ordinary T25 algebra nor finite-field specialist algebra.

## Training ladder

The intended evidence ladder is now explicit:

`acquisition -> near-transfer -> mixed-neutral-synthesis -> historical-unseen-transfer`

Existing neutral Main/Transfer tasks stay useful as the first two layers. They are not promoted into historical SMMC evidence.

## Requirement-map backlog

The engine scaffold derives the entire East non-GREEN backlog directly from the canonical ledger and current exact-unit map.

A row is either:

- `mapped` — exact authored unit IDs already exist in `requirements-v1.mjs`; or
- `pending` — the problem remains fail-closed.

No placeholder requirement is allowed to unlock a problem.

## T25 readiness contract

The normal future source is `canonical-t25-evidence`.

Manual target-code entry remains a debugging/admin override only. The scaffold does not yet read the T25 evidence store; that is a later implementation phase.

## Unit certification contract

Self-report still does not certify.

The scaffold recognizes:

- missing Main/Transfer evidence;
- evidence present but review still required;
- explicit existing `certifiedAt` state.

It intentionally does **not** auto-certify after two saved attempts.

## Historical S-XFER contract

The future attempt lifecycle is now first-class:

`sealed -> in-progress -> submitted -> reviewed`

The review score scale is 0-7.

The scaffold defines durable fields and first-unseen/reattempt separation, but durable historical-state v2 and the learner-facing runner are still pending.

## Whole-paper vault

All official session papers are grouped from the ledger:

- 18 East A/B papers;
- 4 supplementary C papers;
- 4 problems per paper.

The vault policy records the crucial preservation rule:

**opening a whole organiser session PDF consumes statement-level pristine status for all four problems in that session.**

A future isolated single-problem view must genuinely hide sibling questions. Until that exists, the session PDF is a whole-paper reveal.

S-PAPER uses a three-hour session contract. A+B competition-day mode will be represented as two session records; no break duration is invented here.

## What this checkpoint intentionally does not do

- no domain relabelling;
- no new historical requirement mappings;
- no automatic T25 clearance ingestion;
- no learner-facing certification button;
- no historical attempt UI;
- no automatic 0-7 grading;
- no sealed-paper runner;
- no specialist authoring;
- no change to canonical T25 academic state.

Those are the next implementation stages, now with explicit contracts to build against.
