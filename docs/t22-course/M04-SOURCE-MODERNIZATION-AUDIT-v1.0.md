# M04 Source-Driven Modernization Audit — v1.0

Date: 2026-10-02  
Branch: `codex/t22-m04-source-overhaul`  
Baseline: `main@8e0120b228d900f0ff5c520560c02df7020c658d`  
Module: `ARC048 — Finite Probability, Conditional Probability, Independence & Expectation`

## Disposition

**BOUNDED REPAIR REQUIRED.**

This is not a structural-rebuild finding. The existing 24-session spine is mathematically coherent and respects the M04→M05/M06/M26 boundary unusually well. Deleting the module would destroy useful tested structure and historical evidence without a source-supported reason.

The deep-source audit does, however, find a real modernization gap:

1. the current module lacks the permanent source/pedagogy dossier required by the post-M03 v1.7.2 standard;
2. its semantic-separation metadata predates the current evidence-distance / decision-audit / wrong-solver machinery;
3. several lessons are mathematically correct but do not yet attack well-documented probability misconceptions as directly as the new sources justify.

Historical M04-01→M04-04 repairs remain binding and must not regress.

---

## Architecture verdict

| Block | Sessions | Verdict | Rationale |
| --- | ---: | --- | --- |
| Probability objects/models | S01–S03 | retain | Strong finite-object-first route; S02 correctly prevents equiprobability from becoming the definition. |
| Event algebra | S04–S06 | retain | Clean bridge from M03 set operations into probability arithmetic. |
| Conditioning / joint probability | S07–S10 | retain + repair S07 | Sequence is sound; S07 needs stronger denominator/reversal inoculation from conditional-probability research. |
| Independence | S11–S14 | retain + repair S13 | Product→conditional→exclusivity→pairwise/mutual is coherent. Historical S11 complement derivation remains required. |
| Repeated trials | S15–S17 | retain + repair S15 | Exact path→exactly-k aggregation→complement is the right dependency order; S15 should directly attack representativeness/outcome reasoning. |
| Total probability | S18 | retain + repair | Correct forward-marginal boundary, but should contrast weighted partitioning with the empirically documented equal-average error. |
| Expectation | S19–S23 | retain | Cleanly stops before formal distribution/variance/decision theory; S21/S22 correctly emphasize no independence requirement. |
| Integration | S24 | retain | Strong forward-only synthesis; explicitly forbids posterior inversion. |

No session-count expansion is justified by the current evidence.

---

## Session-by-session hostile audit

| S | Status | Source-driven finding |
| ---: | --- | --- |
| 01 | 🟢 | Sample space/event ownership is explicit and prerequisite-safe. |
| 02 | 🟢 | Unequal atomic weights appear before classical counting; keep. |
| 03 | 🟢 | Equiprobability is explicitly a condition, not the definition. |
| 04 | 🟢 | Historical no-premature-independence repair remains intact. |
| 05 | 🟢 | Disjoint addition versus overlap is explicit; historical Transfer ownership must remain. |
| 06 | 🟢 | Inclusion–exclusion is properly motivated as overlap correction. |
| 07 | 🟠 | Correct but too uniform-example-heavy. Add nonuniform restricted mass, explicit (P(A\mid B)) vs (P(B\mid A)), denominator language and zero-denominator caveat. |
| 08 | 🟢 | Correct bridge from conditional definition to intersection multiplication. |
| 09 | 🟢 | Tree leaves normalize and disjoint leaves are added; representation has mathematical purpose. |
| 10 | 🟢 | Replacement state change and denominators are explicit. |
| 11 | 🟢 | Definition-based independence and historical complement-independence derivation are strong. |
| 12 | 🟢 | Conditional criterion uses unconditional comparison and (P(B)>0); with/without replacement context is useful. |
| 13 | 🟠 | Mathematically correct. Strengthen the conceptual contrast: for positive-probability disjoint events, conditioning on one makes the other impossible, the opposite of invariance. |
| 14 | 🟢 | Main's XOR construction genuinely exposes pairwise-not-mutual independence; do not replace it with a formula-only task. |
| 15 | 🟠 | Correct exact-path algebra but should explicitly attack “looks more random” reasoning and distinguish exact paths from aggregated events. |
| 16 | 🟢 | Derives exactly-k from combinations + disjoint equal-probability paths without stealing M26's named distribution machinery. |
| 17 | 🟢 | Complement strategy is well placed after exact paths. |
| 18 | 🟠 | Correct law of total probability. Add explicit rejection of the unweighted average of unequal branch rates; continue to forbid Bayes inversion. |
| 19 | 🟢 | Finite weighted-average definition stays below formal distribution machinery. |
| 20 | 🟢 | Correctly handles atomic multiplicity and rejects simple averaging in nonuniform models. |
| 21 | 🟢 | Strong finite-sum derivation; no independence assumption; nonlinear counterexample retained. |
| 22 | 🟢 | Historical positional-marginal repair is mathematically explicit; dependence does not block linearity. |
| 23 | 🟢 | Clean expectation-versus-mode/guarantee/preference boundary into M05. |
| 24 | 🟢 | Good integrated forward probability; no posterior or decision-policy leakage. |

---

## Cross-cutting evidence defects

### E01 — no permanent M04 Source Dossier

**Severity:** 🔴 publication blocker under current standard.

Repair: add `M04-SOURCE-DOSSIER-AND-PEDAGOGY-EVIDENCE.md` with repository, mathematical, general-pedagogy and domain-specific probability-education roles.

### E02 — evidence-distance labels are not current-standard explicit

**Severity:** 🟠 meaningful evidence repair.

The old statement “24/24 semantic separation retained” is not enough. Different data/context alone cannot certify freshness or transfer. Every fixed task needs a current classification from:

- retrieval;
- proof/reasoning reconstruction;
- fresh Main evidence;
- changed-surface Transfer.

### E03 — no current wrong-solver ledger

**Severity:** 🟠 meaningful evidence repair.

At minimum M04 must discriminate:

- favourable/total on nonuniform atoms;
- (P(A\mid B)=P(B\mid A));
- original denominator retained after conditioning;
- automatic multiplication of marginals;
- mutual exclusivity = independence;
- pairwise = mutual independence;
- replacement ignored;
- exact path confused with exactly-k event;
- total probability used as equal averaging or as Bayes;
- linearity assumed to require independence;
- (E[g(X)]=g(E[X]));
- expectation = most likely/guaranteed/decision-optimal.

### E04 — no current decision audit

**Severity:** 🟠 meaningful evidence repair.

Any task labeled fresh Main or changed-surface Transfer must record the actual mathematical decision, whether the prompt supplies it, whether visible instruction rehearses it, and exactly what the rubric scores.

---

## Repair policy

1. **Do not delete M04 or M05–M12.** Preserve current `main` as baseline and historical provenance.
2. Repair M04 on a dedicated branch.
3. Preserve stable session/task IDs unless a task contract itself changes.
4. Instruction-only repairs use session-specific instruction versions.
5. Version a fixed assessment only when its public prompt/evaluator contract materially changes.
6. Add historical answer-exposure migration only if an old lesson actually contained answer-equivalent fixed-task content; an instruction version bump alone is not contamination.
7. Re-run the full M04 + inherited T22 Elite + Chromium gates after canonical metadata is current.
8. Require a fresh exact-head adversarial follow-up before merge.

## Current conclusion

The deep sources justify **surgery, not demolition**.

M04's architecture is worth preserving. The immediate work is to modernize evidence/provenance and make conditioning, exclusivity/independence, repeated-sequence reasoning and total-probability weighting harder to fake with memorized formulas.
