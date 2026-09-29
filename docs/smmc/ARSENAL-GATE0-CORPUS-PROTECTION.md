# SMMC Arsenal — Gate 0 corpus protection

Status: **implementation candidate; independent review required before Gate 1**  
Scope: historical SMMC exposure semantics only. This gate does **not** freeze the Arsenal ontology, author Forge content, change T25, or claim SMMC mastery.

## Why this gate exists

The 2017–2025 archive contains only 88 official problems. The existing synthesis already requires exposure-aware use of this finite corpus:

- statement exposure may remain transfer-eligible;
- material hints, evaluator routes, or solutions make a problem development-only;
- a full session paper is more valuable to preserve than an isolated easy problem;
- private ledger metadata must not silently become learner-visible hints.

The previous learner UI did not enforce that contract. It explicitly allowed the official session PDF and GREEN/AMBER/RED research metadata to be opened without writing exposure state. That made future Boss/Arena evidence impossible to interpret reliably.

## Gate-0 invariants

### Problem level

The canonical problem states remain derived from the exposure ledger:

- **sealed** — no statement/material-hint/evaluator/solution exposure;
- **transfer** — statement seen, but no material route exposure;
- **development** — material hint, evaluator, or solution has been seen.

Showing the ledger synopsis is treated conservatively as statement exposure. The synopsis is now hidden by default and its reveal is isolated to the selected problem.

Showing individual problem research metadata is treated as material-hint exposure because it contains color, domain, method tags, bridge needs and audit-route information.

### Paper level

A paper/session has a persistent vault state:

- **pristine** — no problem in that session has material exposure;
- **breached** — at least one problem has isolated exposure, but the full session paper has not been opened;
- **opened** — the official full problem paper or full solution paper has been opened;
- **attempted** — historical attempt evidence exists for the session;
- **arena-consumed** — the session has been used as an Arena paper.

Opening the official problem PDF marks every problem in that year/session statement-seen. It never spills into a different session.

The runtime exposes a pristine-paper inventory. For the East archive there are 18 A/B sessions across 2017–2025.

### Persistence and merge

Paper exposure is additive and irreversible in normal learner use.

- local export/import preserves it;
- cloud merge keeps the earliest known exposure timestamp;
- legacy v1 records that predate the paper ledger remain import-compatible;
- hiding a synopsis, research panel or paper does not remove exposure.

The historical attempt schema remains backward-compatible and now preserves optional 0–7 attempt scores and delayed-reattempt timestamps when later Boss/Arena work supplies them.

## Learner UI changes

The Past Papers view now:

1. hides each ledger synopsis until an explicit isolated-exposure action;
2. warns before revealing it and marks only that problem statement-seen;
3. treats research metadata as hint-bearing and records material-hint exposure;
4. warns before opening a full official session paper;
5. marks all statements in that session before loading/opening the PDF;
6. displays both the selected problem exposure and the session vault state;
7. displays the remaining pristine East A/B session count.

Aggregate corpus totals and prerequisite planning metadata remain non-contaminating.

## Acceptance checks

The source-level validator must establish:

- 18 fresh East A/B sessions are pristine;
- isolated statement exposure breaches exactly one paper and does not expose sibling problems;
- full-paper opening marks all four statements in that session and no problem in another session;
- solution exposure makes the affected problem(s) development-only;
- legacy state without a paper ledger remains valid;
- merge preserves the earliest paper exposure timestamp.

The Chromium workflow must establish:

- synopsis is hidden on first historical-problem selection;
- isolated synopsis reveal changes only the selected problem;
- research reveal changes that problem to development-only;
- full-paper reveal writes persistent session-level exposure and all four statement timestamps;
- pristine inventory changes from 18/18 to 17/18 after the first East-session breach;
- export/import preserves both per-problem and paper-level exposure;
- neutral authored practice remains separate from historical exposure.

## Stop boundary

Do **not** begin Arsenal ontology authoring merely because this implementation exists.

Gate 0 closes only after:

1. the complete SMMC CI workflow passes on the exact implementation head; and
2. an independent reviewer checks the semantics for leakage, accidental contamination, migration hazards and browser bypasses.

Only then proceed to **Gate 1 — Arsenal Research Contract**.
