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

**ACCEPTED / FROZEN.**

Acceptance is supported by the inspected repair-head CI/browser evidence below and the final semantic reread after the bounded repairs.


## Repair checkpoint verification

Repair checkpoint: `621721bfd2793076eff68e57dd44ebae7f45b086`  
Actions run: `35970357893`  
Job: `107538366053`  
Result: **SUCCESS**

The actual job steps were inspected: syntax checks, structural/pedagogy/semantic/evidence regressions, Python executable oracles, Chromium installation and the real browser evidence workflow all completed successfully.

The final follow-up identified one **verification gap, not a curriculum defect**: M08 did not yet have a module-specific executable witness that the new S13/S23/S24 `obligationVersion` bumps change assessment fingerprints, make older attempts stale, and still preserve those attempts. A bounded regression test is therefore added before freeze. It also proves that the sizing split's new `S02F@1` ID did not renumber the pre-existing stable S03–S24 IDs.


## Final provenance-hardened validation

Head: `f048a93b8cf0fff8bcd915437b8ba2ec8bacefd5`  
Actions run: `35970605448`  
Job: `107539182656`  
Result: **SUCCESS**

The M08 regression proves that the S13/S23/S24 obligation-version bumps produce different assessment fingerprints, older attempts become stale rather than silently current, and those attempts remain preserved. It also proves that the new `T22V3::T22E-CODE01::S02F@1` ID is the sizing-split insertion while every pre-existing stable S03–S24 ID remains unchanged.

The final semantic pass over the repaired high-risk surfaces found no remaining material defect:
- S02/S03 split is coherent and float scope remains bounded to Python numerical comparison;
- S13–S17 form a clean executable-oracle progression;
- S20–S24 distinguish RNG creation, one trial, repetition, state replay and adversarial audit;
- S24 Main now requires a learner-chosen diagnostic event rather than a disguised number swap;
- all 125 ownership links are defensible after the recorded narrowing/remapping;
- browser/evidence behavior is green;
- M09 is absent/closed.

**Acceptance: M08 independently accepted/frozen.**
