# SMMC Arsenal — Gate 0 corpus protection

Status: **ACCEPTED — Gate 0 closed after independent adversarial review**  
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

## Independent adversarial review and bounded repair

The first independent review of PR #181 on head `e5de7fdd0dbdc98d2bb6d3506b40bc034f468057` returned **CHANGES REQUIRED**. Four findings were accepted as substantive and repaired without widening Gate 0.

### R01 — hidden synopsis leaked through search

**Finding:** the historical search indexed `p.synopsis` even when a problem was pristine, allowing topic words such as “cycle”, “determinant”, “gcd” or “floor” to identify likely problems without writing exposure.

**Repair:**
- a sealed problem is searchable only by non-sensitive label/ID information;
- synopsis text enters the search index only after that problem is no longer sealed;
- a protected synopsis is not merely CSS-hidden: its text is absent from the DOM until explicit reveal;
- Chromium regression verifies that `cycle` yields no pristine matches, while the already exposed 2021 A3 becomes searchable by that term without exposing siblings.

### R02 — protected reveals failed open when local persistence failed

**Finding:** the handlers mutated in-memory exposure, called `persist()`, ignored a false return, and revealed the protected material even when `localStorage.setItem()` threw.

**Repair:**
- historical exposure now uses a transactional `commitHistoricalMutation` path;
- mutations are applied to a clone, validated, and written to durable local storage **before** replacing live state;
- only a successful durable write permits synopsis, research metadata or a full paper to appear;
- storage failure leaves live exposure unchanged and keeps the protected material hidden;
- Chromium deliberately makes `localStorage.setItem()` throw for the historical key and verifies fail-closed behavior for synopsis, research and full-paper routes.

### R03 — stale in-flight cloud result could erase newer local exposure

**Finding:** an older cloud reconciliation result could arrive after a new local exposure and replace `histState` wholesale.

**Repair:**
- cloud payloads are never assigned directly over current SMMC state;
- a returned historical payload is merged with the **current live** historical state using the canonical additive merge before application;
- the same protection is applied to neutral-study state;
- if the current state contributed evidence absent from the returned cloud payload, an immediate follow-up sync is scheduled so the newer evidence is pushed back to cloud storage;
- Chromium delays an initial empty historical cloud GET, records a newer A3 exposure locally, releases the stale result, verifies the exposure survives, and requires a subsequent PATCH carrying that exposure.

### R04 — prerequisite/readiness surfaces leaked route classification

**Finding:** exact T25 target names, bridge identity and labels such as “SMMC unit needed” revealed solution architecture and indirectly distinguished overlap classes before the explicit research gate.

**Repair:**
- sealed and statement-only transfer problems show one coarse badge: **Protected**;
- exact T25 target mappings, bridge IDs, specialist/bridge distinctions and color-distinguishing readiness are hidden while the problem remains protected;
- the advanced prerequisite mapper and exact T25 connection cards are absent from the learner-visible protected surface;
- those surfaces become available only after material-hint/evaluator/solution exposure has already made the problem development material;
- Chromium verifies the protected surface contains neither the exact bridge ID nor the old class-distinguishing status, and verifies the exact mappings appear after deliberate research exposure.

These repairs preserve the original Gate-0 boundary: no Arsenal ontology, Forge curriculum, Boss scorer or Arena implementation is introduced here.

## Independent follow-up — F01 and F02

The follow-up review of repaired head `d69f67e5bed14abbf3e9aad8a2d570101a45f2d9` confirmed the original R01–R04 repairs, but found two narrower coherence holes.

### F01 — research-first development exposure still unlocked synopsis search

**Finding:** synopsis search was enabled whenever `exposureClass !== sealed`. A learner could reveal research metadata first, producing `materialHintSeenAt` without `statementSeenAt`, and then query the still-unrevealed synopsis through search.

**Repair:**
- synopsis search eligibility now depends specifically on recorded `statementSeenAt`;
- material-hint/development exposure alone does not make synopsis text searchable;
- Chromium now executes the research-first path, verifies `materialHintSeenAt` exists while `statementSeenAt` does not, confirms a synopsis keyword returns no result, then verifies search unlocks only after explicit synopsis/statement exposure.

### F02 — imported/remote stronger evidence could be semantically incoherent

**Finding:** validation accepted states such as `paperOpenedAt` with no corresponding per-problem `statementSeenAt`. Because the UI trusted `paperOpenedAt` to skip a new exposure transaction, an incoherent import could open a paper while its problems remained sealed. The same invariant issue applied to solution-paper, paper-attempt, arena-consumed, individual solution and historical-attempt evidence.

**Repair:** validation now conservatively normalizes stronger evidence into all weaker facts it necessarily implies, preserving the earliest applicable timestamp:
- individual `solutionSeenAt` → that problem's `statementSeenAt`;
- historical attempt → that problem's `statementSeenAt` no later than attempt time;
- paper `paperOpenedAt` → every problem statement in that session seen;
- paper `solutionOpenedAt` → `paperOpenedAt` plus every problem statement and solution seen;
- paper `attemptedAt` → `paperOpenedAt` plus every problem statement seen;
- `arenaConsumedAt` → `attemptedAt` + `paperOpenedAt` + every problem statement seen.

Normalization runs during validation, so it applies to local import, legacy load and each side of cloud merge before states are joined.

Source-level regressions cover every implication above, including preservation of an earlier pre-existing timestamp and malformed remote-state normalization. Chromium imports a deliberately incoherent `2021-A paperOpenedAt` record and verifies A1–A4 are normalized to statement-seen before the already-opened paper path can display the PDF.

## Final adversarial finding — G01 timestamp ordering

The final attack on head `6417758831b05b9648c7403df44002c660fc6ddb` confirmed R01–R04 and F01–F02, but found one remaining timestamp-ordering defect.

### G01 — lexicographic timestamps were not chronological across offsets

**Finding:** the old `earliest(a,b)` selected `[a,b].sort()[0]`, while the timestamp validator accepted ISO strings with timezone offsets. Lexicographic order does not necessarily equal chronological order. For example, `2026-09-20T09:00:00+05:30` represents 03:30 UTC and is earlier than `2026-09-20T04:00:00.000Z`, despite its text sorting later.

The validator also accepted timezone-less parseable date-times, which make cross-device ordering dependent on implicit interpretation.

**Repair:**
- historical evidence timestamps must now carry an explicit timezone: `Z` or `±HH:MM`;
- timezone-less historical timestamps are rejected;
- every accepted timestamp is canonicalized to UTC `toISOString()` during validation;
- `earliest()` compares absolute instants with `Date.parse()` and returns the canonical UTC instant;
- attempt times, delayed-reattempt times, problem exposures, paper exposures, module self-reports, unit self-reports and unit certification timestamps are all canonicalized.

**Regression:**
- validation receives an earlier `+05:30` exposure and a later `Z` paper timestamp and must retain the true earlier instant as `2026-09-20T03:30:00.000Z`;
- `mergeSmmcState()` receives the same cross-offset ordering conflict on local/remote problem exposure and must select the same true earlier instant;
- timezone-less exposure input is explicitly rejected.

This repair is deliberately confined to evidence-time representation and ordering. It does not widen Gate 0 into Arsenal, Boss, Arena or curriculum work.

## Closure record

Gate 0 was independently accepted on exact reviewed head:

`37cd46553ebccc6f5fa47b45beb2bf4ad3381251`

The closure review re-attacked R01–R04, F01–F02 and G01 and reported no remaining blocker within Gate-0 scope. Exact-head verification was green for SMMC authoring/Chromium, frontend integrity and T22 atomic checks.

PR #181 was subsequently merged to `main` as merge commit:

`761023355678bc9088236e79bc12e68aa5107cb6`

Gate 0 is therefore closed. Its corpus-protection invariants are now prerequisites for every later Arsenal gate and must not be weakened casually.

## Stop boundary

Do **not** begin Arsenal ontology authoring merely because this implementation exists.

Gate 0 closure conditions have been satisfied.

Later Arsenal work must preserve this gate's exposure semantics. Any change that weakens corpus isolation, transactional exposure recording, state coherence, cloud monotonicity, route-hint protection or chronological timestamp ordering requires a new Gate-0 regression review.
