# T22 Elite — M14 v1.2 Repair Follow-up Handoff

Date: 2026-09-26  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**

## Current status

The first independent review **did not accept M14**. It preserved the mathematical spine and 19-session architecture but returned bounded findings **M14-R01 through M14-R11** under protocol v1.2.

Those findings have now been repaired in source.

**Status: repaired implementation green; awaiting focused independent follow-up.**

M14 remains unpublished. M13 remains the learner frontier. M15 has not been opened.

## Architecture intentionally preserved

- 19 design-derived sessions
- 38 current fixed assessments
- 60 retained ownership claims
- formal prerequisite: M13 / ARC511 only
- no projection/least-squares, eigenstructure, matrix calculus or numerical-conditioning import

## v1.2 repair surface

### Gate 5

- Primary evidence classes normalized to exactly:
  - `retrieval`
  - `proof reconstruction`
  - `fresh Main evidence`
  - `changed-surface Transfer`
- Secondary task mechanisms are descriptive only.
- 21 decision-audit rows record who makes the decisive choice and what is actually scored.
- S07 Transfer was replaced with a genuine changed-surface wrong-report audit rather than a coefficient/right-hand-side perturbation.
- S19 Main was redesigned from a numbered recipe into a scored organizing-choice synthesis.

### Gate 7

Every one of the 60 ownership records now stores:
- exact current task IDs and public prompt text;
- exact rubric locators;
- literal observer rationale;
- escape attempt;
- **generalization distance**;
- disposition.

Concrete repairs include:
- S11 general `r+(n-r)=n` observer;
- S14 singular branch narrowed away;
- S18 determinant-invariance proof;
- S04 product-column wording narrowed;
- S13 missing-pivot branch narrowed;
- S16 general n-volume claim narrowed to observed 2D area/orientation.

### Gate 8

`semanticSeparationAudit` is no longer a copy of `evidenceDistance`.

It contains **38 current task rows**, each recording:
- closest answer-bearing instructional example(s);
- mathematical-instance difference;
- exposure disposition.

The old full-matrix and known-exposure regression guards remain only cheap candidate finders; they are not described as exhaustive semantic detection.

### Gate 9

S19 now asks the learner to choose an audit order and justify at least two representation/method choices. Required deliverables remain explicit and gradeable, but the computation order is not supplied.

The repaired whole-module route remains:

linear maps → matrix representation/action → composition/product → systems/elimination → nullspace/complete solution → column space/rank/nullity → injective/surjective → invertibility/inverse → determinant → coordinate change/similarity → synthesis.

### Gate 11

New test:
- `scripts/test-t22-elite-m14-browser.mjs`

It uses **test-only metadata interception** to load unpublished M14 into the real learner UI. It then walks:
- all 19 session contract/lesson surfaces;
- all 19 guided-feedback states after an attempted response;
- all 38 public task prompts;
- all 38 evaluator references;
- every rubric row;
- save/reveal evidence behavior;
- export/import/reload;
- text-corruption and mobile horizontal-overflow checks.

The persisted `course-meta.json` remains M01–M13 only.

## Assessment versions changed under Gate 10

Prior head/fingerprints:
- `docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json`

Versioned obligations:
- `S07-T@1 → S07-T@2`
- `S11-M@1 → S11-M@2`
- `S18-M@1 → S18-M@2`
- `S19-M@1 → S19-M@2`

No M14 learner-route evidence existed, so no old attempt is being silently recertified.

## Wrong-solver audit

The canonical candidate now records 13 deliberate misconception attacks against the actual current rubrics, including:
- affine offset mistaken for linearity;
- reversed composition order;
- RHS omitted from row operations;
- equation-count solution classification;
- nullspace placed in output space;
- RREF columns used for the original column space;
- impossible rank/nullity claims;
- square ⇒ invertible;
- determinant treated as whole-matrix linear;
- equal determinant ⇒ equal stability;
- reversed coordinate conversion;
- reversed similarity convention;
- multi-error synthesis memo.

## Math-checker scope

`m14-math-checks.mjs` is intentionally a **hybrid gate**:
- executable arithmetic/property reconstruction where appropriate;
- targeted invariants/counterexamples;
- reviewed reference assertions for prose obligations.

It is **not** described as a machine proof oracle for every prose proof. Human semantic review remains required.

`m14-instruction-math-checks.mjs` separately checks worked/guided learner-facing mathematics across 19/19 sessions.

## Focused independent follow-up

Full repaired implementation run #462 (`36221875839`) is green, including the actual unpublished-M14 Chromium probe. Recheck the original independent findings rather than reopening the architecture by default:

1. Does Chromium actually render M14 itself, not merely M01–M13?
2. Do all 38 Gate-8 rows identify a plausible closest instructional comparator and a real mathematical difference?
3. Are all primary evidence labels one of the four v1.2 classes and honest?
4. Do decision audits avoid claiming a learner choice when the prompt supplies it?
5. Are all 60 generalization-distance judgments defensible?
6. Is S11's general theorem now literally observed?
7. Is S14's local ownership correctly narrowed?
8. Does S18 now publicly prove determinant invariance?
9. Does S19 leave a meaningful organizing decision while remaining fairly specified?
10. Do the wrong-solver cases genuinely fail the cited current rubric rows?
11. Does verification documentation accurately limit what automated math gates establish?

If these are clean and the final documentation/checker head remains green, the independent reviewer may close the bounded repair.

## Stop boundary

**M14 only. Do not publish/register M14, open M15, merge to main or modify accepted M01–M13 content.**


## Repaired implementation evidence

- implementation/runtime head: `59f6ceaea143255d024fcb0b2b78460035024cfa`
- full Actions run: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36221875839
- run #462: **SUCCESS**
- unpublished M14 browser: **PASS**, 355 rendered learner surfaces
- Gate-9 integration: `docs/t22-course/audit/M14-V12-INTEGRATION-REVIEW.md` — **PASS_WITH_EVIDENCE**
- persisted learner registry: still M01–M13
- M15: closed

This is sufficient for **independent follow-up review**, not for self-declared acceptance or publication.
