# M08 Independent Adversarial Review — 2026-09-24

Module: `T22E-CODE01 — Quant Programming & Simulation Foundations`

Review mode: independent adversarial review of the published M08 candidate, followed by an authorized repair pass. This review did not authorize M09.

## Findings

### M08-R01 — BLOCKER — worked-example/Main contamination
Fixed Mains had materially pre-solved surfaces in S02, S13, S15, S21, S22 and S23; S19 was partially contaminated. A learner could reproduce lesson answers without demonstrating fresh transfer.

### M08-R02 — HIGH — semantic-separation checker was too lexical
The existing guard checked selected literal fragments rather than mathematical/program-semantic equivalence. It could therefore report separation while a worked example and Main were isomorphic or identical.

### M08-R03 — HIGH — prerequisite contradiction
The module boundary declared M01+M03+M04, while S06 named M02 functions-as-mappings. M03-S20 already supplies the needed functions-as-mappings prerequisite, so S06 attribution was corrected instead of silently adding M02.

### M08-R04 — HIGH — claimed programming actions were not always observable
S08 tuple iteration, S09 keyed count updates, S11 paired iteration, S18 traceback/minimal-failure reading, S21 hit accumulation and S24 model-first specification could receive linked credit from consequences rather than the claimed action.

### M08-R05 — HIGH — missing novice Python bridges
The module used `math.isclose`, `Fraction`, `product` and `Random` without teaching imports; S07 used callable parameters without explicitly teaching function objects; S18 advertised tracebacks without requiring actual traceback reading.

### M08-R06 — MEDIUM — probability sessions drifted toward math-only responses
S14-S16 could be answered substantially as M04 mathematics. Their repaired Mains now require executable filtering/enumeration/payoff mapping while retaining exact mathematics as the oracle.

### M08-R07 — MEDIUM — float comparison policy was underspecified
S02 now teaches explicit `rel_tol`/`abs_tol` policy and near-zero absolute tolerance; S03 now warns that exact-zero branching is appropriate only when the model makes that exact classification meaningful.

### M08-R08 — MEDIUM — default zip truncation lacked the native strict guard
S11 now teaches `zip(..., strict=True)` for required equal-length pairing and treats mismatch as a fail-fast `ValueError`.

## Independent arithmetic / semantics

No material numerical error was found in the original finite probability/expectation/RNG arithmetic. Repairs change assessment surfaces and observability, not the mathematical destinations. Fresh executable oracles were written for the repaired tasks.

## Disposition

**REPAIRS REQUIRED** at review time. The repair pass addresses all findings above. Final acceptance remains withheld until the repaired tree passes structural, semantic, executable-oracle and browser validation, followed by one bounded independent follow-up.
