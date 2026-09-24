# M01 acceptance record — prerequisite safety and ownership coverage

Status: **FINAL ACCEPTED after A-04/A-05/A-07 repairs and green structural, semantic, evidence and browser validation.**

Authoritative runtime source for M01 is the checked-in base JSON pack set listed by `course/t22/generated/course-meta.json` **plus** `course/t22/authoring/m01-repairs-1.1.json`. The directory name `generated` is historical; these checked-in JSON documents are currently canonical authored data, not an untracked build product. The repair overlay is applied deterministically before assessment fingerprints are calculated. Future modules must have equally explicit authoring provenance before they can be marked authored.

## A-04 prerequisite-order closure

The repair overlay contains a machine-readable `prerequisiteAudit` for S01-S08. In particular:

- S01 no longer assesses fractions or radicals before S02/S08. Its independent ordering task uses signed integers/decimals; integer-power precedence is taught just in time in S01.
- S02 teaches fraction notation, common denominators, multiplication and reciprocal division before those appear in independent assessment.
- S03-S06 teach ratio/rate, percent, multiplier and dimensional notation before assessment.
- S07 now uses ordinary decimal notation (`1,980,000 × 0.0031`), so scientific notation is not an undeclared prerequisite. It explicitly distinguishes a rough central estimate from a proved bound.
- S08 explicitly teaches rational exponents, their real-domain caveat, principal roots and scientific notation before independent assessment.
- S14 explicitly teaches interval endpoint conventions and the use of parentheses at infinity before interval notation is required.

The validator requires a named taught source / just-in-time source for every S01-S08 prerequisite-audit row.

## A-05 novice instruction and evidence coverage

Every one of the 17 M01 learning notes now contains:

1. a direct explanation of the capability;
2. at least one **Worked example**;
3. a **Guided check** outside independent evidence.

Opening a learning note remains recorded as assistance. It does not count as independent mastery. If a fixed task/reference has already been exposed, the course offers a solution-free fresh-probe request; such an ad-hoc probe is practice/assessment material only until registered with a stable obligation/evaluator and cannot silently grant course clearance.

The repair overlay's `coverage` object maps each required-ownership claim, by session and claim index, to the fixed main and/or transfer investigation that can observe it. Current total: **17 sessions × 5 claims = 85 mapped ownership claims**. The validator rejects missing maps, empty maps, unknown evidence kinds or a session whose map length no longer matches its ownership list.

### Targeted gaps closed

- **S02 fraction multiplication:** transfer task now asks for the product `(5/6)(3/10)` explicitly before using it inside a larger expression.
- **S03 ratio reduction:** transfer begins with `10:6:4` and requires reduction to `5:3:2` before allocation.
- **S04 percent/decimal conversion:** transfer now explicitly converts `46%` to `0.46` as well as converting `0.375`.
- **S06 dimensionless ratios:** main asks why a percentage itself is dimensionless.
- **S07 estimate type:** main distinguishes rough central estimate from strict bound.
- **S10 factoring method:** note demonstrates the `ac` split/grouping route for a non-monic quadratic; transfer also observes GCF-first and illegal-cancellation understanding.
- **S12 symbolic conditions:** both tasks ask for verification and now explicitly preserve exceptional original branches rather than treating a solved-form denominator restriction as proof of impossibility.
- **S13 elimination:** transfer explicitly demonstrates elimination ownership.
- **S14 interval notation/checking:** note teaches endpoint notation; main requires inside/outside test points.
- **S15 negative thresholds:** transfer tests both impossible and automatic negative-threshold cases and the distance meaning of `|x|`.
- **S16 quadratic formula:** main includes `2x²+3x−1=0`, whose exact roots `(−3±√17)/4` force a genuinely general quadratic method; factoring remains separately tested.

## Evidence semantics

A task score is evidence only for the task/claims it actually observes. Self-review is explicitly a self-rating. Neither a 10/10 rubric score nor completing both fixed tasks automatically clears the session or module. Assessment fingerprints include prompt, obligation version and evaluator marking contract, so substantive task/rubric/reference edits stale earlier evidence without deleting it.

## A-07 instruction / assessment separation

All 17 sessions are covered by the machine-readable `instructionSeparation` ledger. Each lesson's worked example and guided check use distinct numerical/algebraic data from both fixed tasks. The validator requires every audited task fragment to occur in the task and not occur in the lesson.

Historical overlap was handled conservatively rather than erased. The former M01 v1.1 lesson bank embedded exact answers/subanswers for S02 transfer, S04 transfer, S06 main, S07 transfer, both S08 tasks, S10 main and S16 main. Legacy lesson exposures for those sessions are migrated to answer exposure at the original lesson timestamp. Attempts saved before that timestamp remain eligible; later attempts cannot be counted as independent merely because the learner navigated away and back. New separated lessons carry `instructionVersion=m01-instruction-a07-separated-v1`, so ordinary method study does not permanently contaminate future fixed assessments.

Validated by GitHub Actions **T22 Elite checks** run `35303082691` on `1dc914c3d505abc7dd7b38b29ff1be0d3ea5c3d8`. Structural/pedagogy/evidence tests and the Playwright/Chromium browser workflow all passed, including current-lesson and legacy-lesson navigation regressions.
