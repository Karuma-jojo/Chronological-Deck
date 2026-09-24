# M11 S01 pilot gate receipt

Date: 2026-09-24  
Reviewed revision: `f77cb3228b549ad5fea7e1047640b720550e47f1`  
Scope: `T22V3::ARC510::S01@1` only

## Gate 4 — teaching

**PASS_WITH_EVIDENCE.** The lesson orients with the modelling need before notation, defines local quantity, width and contribution before use, connects to M10 rate units, completely works a signed unequal-width inventory example, then leaves a distinct guided calculation. No Riemann/integral symbol is used before it exists.

Novice audit:
- the width factor is motivated dimensionally and operationally;
- widths are positive interval sizes; contribution sign comes from the signed local quantity;
- the worked example computes every contribution and the total;
- the unequal-width ordinary-average failure is demonstrated numerically rather than asserted.

## Gate 5 — independent evidence

**PASS_WITH_EVIDENCE.**

Main asks the learner to construct a fresh battery rate×duration sum, calculate net energy with units and diagnose unweighted averaging. The deliberately wrong unweighted solver gives
`((12-4+6)/3)(1.50)=7 Wh`, not the correct `3 Wh`, and loses the construction/diagnosis credit.

Transfer changes time-rate energy accumulation into spatial linear-density mass accumulation. The learner must reconstruct density×length and diagnose both the missing-width and unit errors; merely changing numbers would not satisfy the task.

Valid alternative preserved: a duration-weighted mean rate of `2 W` multiplied by `1.50 h` is algebraically equivalent to the Main sum and must pass.

## Gate 6 — independent mathematical reconstruction and rubric fairness

**PASS_WITH_EVIDENCE.**

Main:
- `12(0.25)=3 Wh`
- `-4(0.75)=-3 Wh`
- `6(0.50)=3 Wh`
- total `=+3 Wh`.

Transfer:
- `2(0.8)+5(0.3)+1(1.1)=1.6+1.5+1.1=4.2 kg`.
- `2+5+1` adds densities and therefore retains `kg/m`, not `kg`.

Every positive rubric row is explicitly requested. Neither rubric requires an essay, notation style or theorem name absent from the public prompt.

## Gate 7 — claim observability

**PASS_WITH_EVIDENCE.** Three ownership claims are retained because each has literal public requests and cited scoring rows:
1. local quantity×width finite accumulation;
2. units through the product to total;
3. rejection of unweighted aggregation on unequal widths.

Escape attacks were recorded in `claimEvidence`. No ownership is inferred merely because related arithmetic occurs.

## Gate 8 — separation and exposure

**PASS_WITH_EVIDENCE.**

- Main classification: `fresh Main evidence`.
- Transfer classification: `changed-surface Transfer`.
- Worked/guided examples use different surfaces and numbers.
- Repository searches for the distinctive battery/cable prompts and numeric phrases returned no prior matches.
- M09/M10 do not teach or solve either fixed finite-accumulation instance.
- M11 is not registered in the learner runtime, so no historical M11 attempt/exposure exists.

## Pilot disposition

The S01 vertical slice passes Gates 4–8. The pattern that may be reused is the **method**: orient/define/connect/explain/work/guide, then task-specific wrong-solver, valid-alternative, mapping and separation audits. Its claim count, rubric-row count and assessment shape are not a template quota.

**Next:** author S02, then continue in dependency order.