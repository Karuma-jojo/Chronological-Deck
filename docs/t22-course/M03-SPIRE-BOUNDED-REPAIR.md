> **Historical receipt — superseded for current-state claims by `M03-V17-FINAL-EVIDENCE-PROVENANCE-REPAIR.md`.** Stable task IDs were preserved, but several public prompts/evaluators were deliberately versioned later; statements below about unchanged prompts or older obligation versions are historical only.\n\n# M03 Spire bounded repair

Status: **repair candidate — awaiting independent follow-up**

Branch: `codex/m03-spire-bounded-repair`

Baseline main commit: `1524ff9d8ab622afa9f5b1fe3ce006a64e0352d9`

This bounded repair responds to an independent hostile review of the learner-facing M03 Deep Spire Master pack. It does **not** rebuild M03.

## Preserved

- 30-session architecture.
- 60 stable fixed task IDs and public prompts.
- 150 ownership claims and their Main/Transfer ownership assignments.
- M03→M04 boundary: deterministic finite reasoning/counting only.
- S18 Transfer obligationVersion 2.
- S26 Main obligationVersion 3 and general finite binomial-theorem ownership.
- S30 Transfer obligationVersion 2.

## Instruction-separation repairs

Lesson-side examples/guided checks were rewritten in S04, S05, S07, S09, S13, S14, S23, S24 and S28 so the mathematical crux of Main/Transfer is not immediately rehearsed.

S25 now includes an explicit novice bridge from repeated-object counting to labeled fixed-size groups:

[
\binom{n}{n_1}\binom{n-n_1}{n_2}\cdots
=
\frac{n!}{n_1!\cdots n_k!}.
]

S30 now includes a finite-function-counting bridge on different data: a map from an (m)-element domain to an (r)-element codomain has (r^m) possibilities; forbidding one specified output leaves ((r-1)^m).

Instruction version is now `m03-instruction-v12-evidence-retrofit-r1`.

## Evaluator-alignment repairs

The independent review found four Main evaluators scoring Transfer-owned claims. Public prompts were preserved, but the evaluator contracts changed materially, so the four Main obligations are versioned to 2.

- **S25 Main v2** no longer scores the Transfer-owned labeled-group multinomial claim.
- **S28 Main v2** no longer scores the Transfer-owned divisibility inclusion-exclusion claim.
- **S29 Main v2** no longer scores the Transfer-owned non-obvious-hole design claim.
- **S30 Main v2** no longer scores Transfer-owned finite-map noninjectivity or surjection counting.

Each changed Main rubric still totals 10 points and now scores only what its public task requests.

Authoring version is now `m03-authoring-v1.6-v12-evidence-retrofit-r1`.

## Learner-pack runtime repair

The earlier session-local method-recognition gates were rejected because they exposed the exact canonical task surface before independent assessment. They are removed.

Fresh interleaved proof-choice practice now occurs only **after S14**, and fresh counting-choice practice only **after S30**. These labs use new statements/situations, hide method labels, and are diagnostic/practice rather than canonical ownership evidence.

The v1.2 retrofit also replaces weak Transfers in S17, S23, S24 and S25 and supersedes the rejected S27 complement-counting candidate with a monomial-exponent Transfer, rebuilds all generic Transfer evaluators, removes S26 theorem leakage, records explicit evidence-distance/decision/wrong-solver audits, and fixes the S27 stars-and-bars rendering.

See `docs/t22-course/M03-V12-EVIDENCE-RETROFIT.md`.

## Follow-up gate

Do not freeze the repaired Spire pack from builder self-report.

Independent follow-up must re-check:

1. lesson → Main semantic distance;
2. lesson → Transfer semantic distance;
3. Main → Transfer changed-surface distance;
4. ownership → public request → exact rubric evidence;
5. obligation/fingerprint version handling for S25/S28/S29/S30 Main;
6. runtime method-recognition behavior on S06, S09, S10, S11, S13, S14, S18, S22, S26, S29 and S30.

S17/S19/S24 fixed Transfers remain explicit follow-up watch items. Replace them only if the reviewer concludes instructional repair and evidence relabeling cannot make their role honest.
