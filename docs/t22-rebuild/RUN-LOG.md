# T22 rebuild recovery state

Date: 2026-09-17
State: **STAGE A COMPLETE — STOPPED AT ASTRA ARCHITECTURE-REVIEW CHECKPOINT**
Branch: `codex/t22-pedagogical-rebuild`
Repository: `Karuma-jojo/Chronological-Deck`
Scaffold/audit base: `2b2d595b7eba84455f3225a545a96835d5d428fc`
Architecture checkpoint: `c7c66737b84b7951973c31d40c6895a3bdb9d94b`

## Verified state

- The recorded architecture checkpoint is 5 commits ahead of the scaffold/audit base and 0 behind it at the time of Stage A completion.
- Base→architecture compare changes only `docs/t22-rebuild/` files.
- No T22 runtime route, learner-progress storage, cloud schema, T25 implementation/evidence, merge target or deployed site was changed.
- No force push was used.
- T25 was inspected only as a selective architecture/reference implementation and was not restarted.
- No `AGENTS.md` was found by repository search during Stage A.

## Stage A deliverables completed

- `INVENTORY.md` — current T22 registries/evidence/runtime surfaces and migration hazards.
- `FINDINGS.md` — architecture defects, consequences and proposed repairs.
- `SOURCE-MAP.md` — current role/curriculum/documentation evidence and inference limits.
- `ROUTE.md` — repaired default/optional prerequisite sequence and manual sample ancestry traces.
- `route.dependencies.json` — machine-readable 73-node proposal.
- `MIGRATION.md` — v2 freeze, v3 identity, equivalence rules, `ARC515` split map and adapted/optional module policy.
- Three complete architecture samples:
  - `samples/T22V3-F01-percentages-units.md`
  - `samples/T22V3-T00-finite-trading-decision.md`
  - `samples/T22V3-R00-temporal-validation.md`
- `REVIEW-PACKET.md` — exact architecture checkpoint, checks, decisions, risks and Astra questions.

## Important Stage A repairs made after auditing the first proposal

1. Restored `ARC211` deterministic dynamic programming as optional depth and restored its prerequisite role for optional `ARC590` MDPs.
2. Reconciled the current `ARC515` eleven-theme programming module into four staged v3 capabilities (`C00–C03`) rather than losing debugging/tests/reproducibility obligations.
3. Added explicit core Git/version-control and basic complexity ownership to `C03` because the build specification requires them and optional `ARC717` must not be the first place complexity appears.
4. Moved full existing `ARC586` numerical optimization/autodiff to optional depth because its actual rich contract requires `ARC582 + ARC585 + ARC711 + ARC514`; the first proposal's lighter core prerequisites would have been invalid for unchanged reuse.
5. Restored `ARC514` as a direct prerequisite for core `ARC553` to match the current asset-pricing rich contract.
6. Made temporal validation (`R00`) and research-engineering/testing discipline (`C03`) explicit prerequisites for later market-data research where the invariant is actually needed.
7. Marked `ARC558`/`ARC559` prerequisite retargeting as materially adapted v3 work rather than pretending old child evidence is automatically equivalent.

## Route validation performed

Independent Stage A graph check:

- default/core nodes: 56;
- optional nodes: 17;
- total unique nodes: 73;
- every prerequisite resolves to a proposed node;
- every prerequisite occurs earlier in the declared default+optional topological order;
- no backward edge/cycle under that order;
- 57 of the current 58 T22 macro IDs are retained explicitly;
- current `ARC515` is the sole macro intentionally split/replaced;
- `ARC211 → ARC590` and advanced `ARC586` ancestry are explicit.

Manual ancestry traces for all three samples are recorded in `ROUTE.md`.

## Sample validation performed

Independent arithmetic/numerical checks were performed for all three sample main/transfer references. Key rechecked values are recorded in `REVIEW-PACKET.md` and the sample files.

For temporal-join semantics, current pandas documentation was rechecked: backward `merge_asof` chooses the last right key less than or equal to the left key; nearest chooses the closest key and can therefore be future information.

## Public-source verification performed

Current pages were rechecked on 2026-09-17 for:

- Jane Street Quantitative Research;
- IMC 2027 Graduate Quantitative Trader;
- IMC 2027 Graduate Quantitative Researcher;
- Two Sigma Quantitative Research & Data Science;
- MIT OCW 18.05 probability/statistics;
- MIT OCW 18.06SC linear algebra;
- pandas `merge_asof`;
- scikit-learn leakage/time-series validation guidance.

See `SOURCE-MAP.md` for URLs and limitations.

## Known limits / blockers

- v3 is **not wired into runtime**. Existing v2 validators intentionally remain v2 validators.
- No learner-progress migration has been executed.
- No learner pilot or empirical retention study has been performed.
- Stage A did not certify every one of the current 596 atomic arcs; it audited route/evidence architecture and dependency-sensitive rich contracts necessary to make the proposal.
- Full existing `ARC586` was moved optional, but Astra must decide whether a smaller core numerical-solver-literacy bridge is needed.
- Proposed `ARC558` entry is materially retargeted around `MKT00 + ARC714 + R00`; Astra must inspect whether any true `ARC553` prerequisite remains.
- Evidence-equivalence rules are proposals until Astra reviews identity/hash semantics.

## Actual validation/runtime limitation

Stage A documentation and graph/sample checks were performed through repository inspection and independent calculations. No new v3 Node/browser runtime suite exists yet, and existing v2 validators were not modified or misrepresented as proof of the new architecture. A local clone attempt in this environment could not resolve `github.com`; repository persistence/verification therefore used the GitHub connector/API rather than a local git working tree.

## Next action — Astra architecture review only

1. Read `START-HERE.md`, this `RUN-LOG.md`, `REVIEW-PACKET.md` and `ASTRA-AUDIT.md`.
2. Audit the recorded architecture checkpoint `c7c66737b84b7951973c31d40c6895a3bdb9d94b` and the current handoff metadata.
3. Independently trace prerequisite chains and independently solve all three sample main/transfer tasks before comparing keys.
4. Review migration/evidence semantics and the `ARC515` split, `ARC211/ARC590`, `ARC586`, `ARC558` and core/optional decisions specifically.
5. Write `docs/t22-rebuild/ASTRA-FINDINGS.md` with exact reviewed SHA, evidence, severity, repair criteria and disposition.
6. Commit/push the bounded review on this same branch.
7. **Stop. Do not bulk-author Stage B, merge or deploy unless the workflow subsequently directs it.**

## Checkpoint convention

The architecture SHA above is deliberately stable and reviewable. `REVIEW-PACKET.md` and this updated recovery log are committed afterward as metadata-only handoff files; do not create an endless chain of commits merely to insert a commit's own SHA into itself. Astra should record the actual branch head it reviews.
