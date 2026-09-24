# M08 Bounded Independent Follow-up — 2026-09-24

Module: `T22E-CODE01 — Quant Programming & Simulation Foundations`  
Scope: M08 only; M09 CLOSED.  
Recovered published baseline: `2f8bd161fc9b9a0163713ed0c7f4341879b47419`.

## Review scope

The follow-up re-read all 25 learner lessons, all 50 Main/Transfer tasks, references and rubrics, and all 125 claim→public-task→rubric links. It specifically re-attacked the S02/S03 split, S13–S17 exact-oracle progression, S20–S24 RNG/simulation progression, version/provenance behavior and the prior high-risk assessment-separation repairs.

Official Python documentation was rechecked for `math.isclose`, `Random.getstate/setstate` and `zip(strict=True)`; the published Python mechanics remain correct. The defects below were local assessment/evidence-contract defects.

## Findings

- **M08-F09-01 HIGH:** S13 claimed product-rule verification and verbal-event→predicate construction without requiring either action.
- **M08-F09-02 HIGH:** S23 claimed `getstate`/`setstate` actions while supplying those actions in the Main; the seed-vs-state ownership link pointed to unrelated evidence.
- **M08-F09-03 HIGH:** S24's lesson and Main were semantically near-duplicates of the same `b=a` two-dice bug; changing sum7 to sum9 was not enough independent reconstruction.
- **M08-F09-04 MEDIUM:** bounded wording/mapping mismatches remained in S02, S03, S09, S11, S17, S18, S21 and final synthesis.

## Repair decision

Repair only those concrete defects. Do not change the 25-session sizing, prerequisites, downstream boundaries, accepted M01–M06, M07 state, T25, SMMC or legacy evidence namespace.

The repair preserves all existing stable IDs. S13-M becomes obligationVersion2; S23-M and S24-M become obligationVersion3. Claim-only corrections rely on the established session-contract hash rather than gratuitous fixed-task version bumps.

## Current disposition

**REPAIRED; FULL VALIDATION + ONE FINAL FOLLOW-UP REQUIRED BEFORE FREEZE.**

This file is not itself an acceptance certificate. The actual pushed repair head and its full CI/browser result must be inspected before M08 can be frozen.
