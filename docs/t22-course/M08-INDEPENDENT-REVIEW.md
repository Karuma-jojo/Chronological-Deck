# M08 Independent Adversarial Review

Date: 2026-09-24
Module: M08 / `T22E-CODE01`
Review mode: independent hostile review after publication to `main`
Reviewed baseline: `4e8755b0d0060390b18ccba846d0d7f5e6750328`
Disposition: **REPAIRS REQUIRED; no freeze/acceptance**

## Material findings

### M08-R01 — fixed Main contamination
Solved lesson instances materially overlapped fixed Main evidence in S02, S13, S15, S19, S21, S22 and S23. S21 was the clearest failure: the lesson exposed the exact 322/1000 output that Main was supposed to elicit.

### M08-R02 — lexical separation guard was semantically insufficient
The builder guard proved only that selected literal fragments did not appear verbatim in lessons. It could therefore report all sessions separated while the same mathematical/program instance and answer were still exposed.

### M08-R03 — canonical prerequisite contradiction
The module boundary declared M01+M03+M04, but S06 named M02 functions-as-mappings. M03-S20 already owns functions-as-mappings, so the S06 attribution was inconsistent with the canonical graph rather than evidence for a real M02 dependency.

### M08-R04 — hidden standard-library prerequisites
The module used `math.isclose`, `Fraction`, `product` and `Random` without actually teaching the import/name-binding step before first use.

### M08-R05 — higher-order function jump in S07
Main required passing a predicate function into another function, but the lesson did not explicitly teach that functions are values, that the function object is passed without parentheses, or that `predicate(x)` calls it later.

### M08-R06 — claimed programming actions were sometimes inferred from answers
Examples included S08 iteration, S09 keyed dictionary updates, S11 actual zip/enumerate use, S18 failure minimization, S21 hit accumulation and S24 model/event/payoff specification. Correct numbers alone did not observe the owned programming capability.

### M08-R07 — S14–S16 risked becoming M04 mathematics replay
Conditioning, independence and expectation were mathematically correct, but several fixed tasks could be completed without actually using code as the claimed mathematical oracle.

### M08-R08 — floating-point policy needed sharper boundaries
S02 taught approximate comparison, while S03 used `==0` on quantitative-looking values without explaining when exact equality is appropriate. `math.isclose` was also taught without enough tolerance-policy detail, especially comparison near zero.

### M08-R09 — S11 omitted the native strict-pairing mechanism
Current Python documents `zip(..., strict=True)` specifically for equal-length assumptions and silent truncation defense.

### M08-R10 — S18 advertised traceback competence without reading one
The lesson/task covered exception type and failing operation but did not require extracting information from an actual traceback.

## What survived review

Independent recomputation found no material numerical/reference error in the repaired target mathematics: finite counts, conditional probabilities, independence tests, exact expectations, aliasing, seeded `random()` path, state replay, P(sum=8)=5/36 and EV=-11/18 were all sound.

The 24-session macro structure was not itself the defect. The missing capabilities fit naturally into existing sessions at first use, while S14–S16 could be made genuinely computational rather than expanded into extra sessions.

## Required repair standard

No finding is closed merely by changing prose. Public tasks, evaluator rows, ownership links, provenance/versioning, executable oracles and semantic-separation checks must all agree after repair. A bounded independent follow-up is still required before freeze.
