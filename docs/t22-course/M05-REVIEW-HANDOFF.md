# M05 v2 reconstruction review handoff — Trading Games & Decisions Under Uncertainty

Date: 2026-10-03  
Branch: `codex/t22-m05-deep-source-restart`  
Stable module: `T22E-TRD01`  
Status: **BUILDER-VALIDATED CANDIDATE IN PROGRESS — INDEPENDENT REVIEW NOT YET PERFORMED**

## Recovery authority

Published baseline recovered before edits:

- `main`: `7600dd377192aafe6ca777636d94474736ea4e4f`
- published M05 blob: `76b423ce15dbe38dd5ae4fa75ed4cff1a2dc075c`
- historical authoring version: `m05-authoring-astra-r1`
- historical instruction version: `m05-instruction-astra-r1`

The historical bounded Astra repair/acceptance remains provenance. It is **not reused as acceptance of this reconstructed v2**.

## Source-first reconstruction authority

Read, in order:

1. `M05-DEEP-SOURCE-AUDIT-v1.0.md`
2. `M05-V2-DESIGN-GATE.md`
3. `M05-BOUNDARY.md`
4. current `course/t22/authoring/m05.json`

The deep-source audit independently regenerated the module architecture before learner content was edited. Disposition:

**DEEP BOUNDED RECONSTRUCTION**

The stable M05 identity and roughly 24-session scale survive. The old session allocation does not.

## Current candidate

Authoring version:

`m05-authoring-v2-deep-source-candidate`

Instruction version:

`m05-instruction-v2-deep-source-candidate`

Module status:

`v2-deep-source-builder-candidate-awaiting-validation-and-independent-review`

Current shape:

- 24 sessions;
- 48 fixed Main/Transfer task slots;
- 120 ownership claims;
- 48/48 evidence-distance entries;
- 24/24 wrong-solver entries;
- 5 decision-audit entries;
- permanent source ledger;
- permanent representation progression ledger;
- one fresh Main claim: S24-M;
- four changed-surface Transfer claims: S04-T, S16-T, S22-T, S24-T.

The remaining tasks are deliberately labelled retrieval/reconstruction rather than inflating new numbers or context into “transfer.”

## Major architectural changes

The v2 reconstruction adds or repairs:

- decision anatomy before calculation;
- one-stage decision trees with decision/chance-node separation;
- EMV as an explicit criterion rather than an unstated universal rule;
- sensitivity analysis separated from Bayesian updating;
- statewise dominance moved earlier;
- old rapid-drill session redistributed as spaced retrieval rather than concept ownership;
- utility bridge: certain-outcome ordinal representation → lottery preferences → Bernoulli/vNM utility → expected utility → CE/risk premium;
- positive-affine versus arbitrary increasing utility-transform distinction;
- general bimatrix strategic games before any minimizing-opponent specialization;
- strictly competitive 2×2 saddle/security analysis only after the model gate;
- mixed-strategy indifference after pure best responses;
- a fresh S24 model-selection audit whose worked synthesis is mathematically different from the fixed Main.

## Preserved strong historical block

The following public task contracts were retained because their mathematical/evidence jobs remain compatible:

- S09 Main/Transfer;
- S10 Main/Transfer;
- S11 Main/Transfer;
- S12 Main/Transfer;
- S13 Main/Transfer;
- S18 Main/Transfer.

These 12 contracts preserve their historical obligation versions and assessment fingerprints.

All other 36 public contracts are materially changed and are now `obligationVersion=3`.

Stable IDs and the shared evidence store are retained.

## Historical exposure / learner evidence

Historical answer-bearing exposure remains recorded:

- old S18 answer-bearing lesson → S18-M.

Historical guided-practice exposure remains recorded separately for old S15/S16 practice and does not fabricate a reveal timestamp.

Deep reconstruction does not delete old attempts. Changed fingerprints/contracts become stale rather than silently recertified. Import/merge order must not hide older answer exposure.

## Source stack

Role-separated sources include:

- published M04 v2.1 as prerequisite authority;
- Ross for finite probability/process comparison;
- Osborne for choice, preference representation, lottery expected payoff, dominance/best responses, strictly competitive games and mixing;
- MIT ESD.72 decision analysis;
- MIT 15.060 decision trees;
- MIT 14.123 choice/preference/decision under risk;
- Stanford Levin choice under uncertainty;
- MIT/Yale game-theory route comparators;
- CFA/MSCI drawdown terminology;
- MAA undergraduate mathematics pedagogy;
- IES/WWC learning guidance;
- Konold et al. probability misconception evidence.

The sources support route/design decisions; they do not scientifically validate this exact T22 learner experience.

## Current implementation commits

Source/design stage:

- `5ea4eb96a4a88a52e98d5bbeccf78c5960682732` — deep-source audit;
- `f709eab37a0452592d7886baabb91ad8f9805b27` — v2 pre-authoring design gate.

Implementation / gates so far:

- `c1dc9b7995a5ed3bfda878c422922df70f4e21f7` — reconstructed `m05.json`;
- `272f3d4b8857298ea32e0af0f7358066b37f9f98` — candidate-aware semantic gate;
- `d1ffde82105c60c0d3ce84d7cea9de91aca2c7ad` — v2 independent-math oracle;
- `2715b8d278d31266b9995ca7e5efec11d5b8de60` — v2 Transfer math oracle;
- `ffd0bb1034e8615a0f176e5df0522695317f7286` — v2 structural/pedagogy gate;
- `0a2bad7848b5d8aa597c0ba67db28f556e430ebd` — provenance regression adaptation;
- `55e5d3d223794d9c7337c793e84a41c7b1af7bd1` — v2 boundary update.

These commits are builder-side work only. The eventual independent reviewer must use the final frozen implementation head, not one of these intermediate commits.

## Validation still required before reviewer handoff

Required:

- syntax / JSON load;
- M05 structural/pedagogy gate;
- independent M05 Main math;
- all M05 Transfer math;
- candidate semantic claim/rubric checks;
- assessment fingerprint/provenance regressions;
- historical exposure import/merge checks;
- inherited M01–M15 protections;
- actual browser traversal of all 24 M05 lessons;
- all staged guided-feedback states;
- all 48 Main/Transfer/reference/rubric surfaces;
- representation rendering;
- save → reveal → export → import → reload;
- mobile width / escaped-newline / malformed-Unicode checks;
- full T22 Elite workflow on the exact pushed head.

Do **not** write “independently accepted” until an independent reviewer has produced findings, all justified findings are repaired, and an exact-head confirmation is complete.

## Reviewer attack priorities

Attack at least:

1. whether S01 really teaches a decision model rather than just another table;
2. whether S04 decision-node versus chance-node semantics are visible in the actual UI;
3. whether S06 accidentally drifts into Bayesian interpretation;
4. whether S07's high-win-rate contrast distinguishes frequency from payoff magnitude;
5. whether S12 still discriminates first-hit ruin from endpoint-only reasoning;
6. whether S13 remains feasibility rather than optimization;
7. whether S15–S16 correctly distinguish ordinal certain-outcome utility from lottery EU representation;
8. whether S16's positive-affine/non-affine transform example is mathematically and pedagogically clean;
9. whether S18's CE/premium language remains model-relative;
10. whether S19 keeps dominance, EMV, feasibility, maximin and EU genuinely separate;
11. whether S20–S22 correctly separate chance, general strategic games and strict competition;
12. whether S23 solves only elementary indifference rather than smuggling in a general theorem;
13. whether S24-M is actually fresh after reading the complete visible lesson;
14. whether S04-T/S16-T/S22-T/S24-T really deserve changed-surface labels;
15. whether any retained public contract has become semantically stale despite matching text/fingerprint.

## Stop boundary

After full builder validation, freeze the exact candidate head and hand it to an independent adversarial reviewer.

**Do not merge to main. Do not self-declare acceptance. Do not rebuild M06/M07 in this pass.**
