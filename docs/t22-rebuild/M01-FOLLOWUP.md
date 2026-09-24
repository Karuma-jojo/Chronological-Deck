# M01 follow-up review

Reviewed: ead0b27f26153f92e16d7c4017df6bc5b2048ef6.
Disposition: **A-07 resolved and validated. M01 final-accepted; Sol may continue to M02 under the established module gates.** No restart or mandatory repeated Astra review is needed.

## Verified

Inspected A-01/A-02/A-03 code changes: fingerprints include prompts and marking contracts; answer-packet export records both tasks; review timestamps no longer become original practice dates. Inspected instructional overrides, acceptance record and browser test. Independently verified GitHub Actions run 35271225456 completed successfully on 95f49e6d1737109149a1cab33e3ba1f9f30b3702. That is evidence of the recorded test suite, not a guarantee of pedagogy or complete ownership coverage. The current head adds the resolution log.

## A-07 — P1 — worked instruction repeats live assessment answers

Location: course/t22/authoring/m01-repairs-1.1.json and corresponding base task packs.

Concrete examples:
- S16 worked example solves 2x²+3x−1=0 with roots (−3±√17)/4. The repaired independent main task asks that exact question.
- S10 worked example fully factors 6x²−x−2, the exact main assessment expression.
- S08 teaches the exact evaluated expressions 16^(3/4), 27^(2/3), and the scientific-notation product used in its fixed assessments.
- S07 worked example 497×61 is the transfer problem itself.
- S04 guided check uses the same 40%→46% and decimal conversion as its transfer.

Worked examples are welcome, but these particular examples expose the answer to the purported independent task. Reading a learning note is tracked only for the current visit/task; subsequent navigation resets noteSeen, and these lesson-provided assessment answers are not recorded as reference exposure for all affected tasks. A learner can therefore study the exact answer and later be counted as independent.

Required bounded repair:
1. Audit all 17 lessons/guided checks against both fixed tasks. Use distinct instructional examples; preserve target skills and comparable difficulty. A few changed numbers are appropriate for a worked example, while independent transfer must still test reconstruction rather than copied steps.
2. Track answer-containing lesson exposure against every affected assessment when such overlap is intentional. Do not classify ordinary learning of a general method as permanent contamination; distinguish it from seeing the exact task answer.
3. Preserve prior attempt records; flag previously exposed affected tasks conservatively or provide a registered fresh assessment. Do not silently reset exposure while changing lessons.
4. Add a browser regression for lesson → navigate away/back → affected main/transfer, and a content review check for exact worked-example/task overlap. Tests checking only that the strings 'Worked example' and 'Guided check' exist cannot detect this problem.
5. Recheck the targeted examples/references and rerun existing structural/evidence/browser gates. Update acceptance and recovery logs, push a verified checkpoint, then continue with M02 only under the established module-by-module gates.

The remaining repair is limited. The 65-module inventory and most M01 work should be retained. No merge/deployment is authorized by this review.

## A-07 resolution

Resolved on implementation head `1dc914c3d505abc7dd7b38b29ff1be0d3ea5c3d8`.

- all 17 lessons/guided checks were audited against both fixed assessments;
- exact assessment-number reuse was removed while preserving comparable skill/difficulty;
- historical exact-answer lesson exposure is migrated with timestamp provenance instead of silently forgotten;
- pre-exposure attempts remain preserved and eligible; post-exposure attempts are not independent;
- new separated lesson exposure is versioned and is ordinary guided study, not permanent answer contamination;
- structural/content regression and browser lesson→navigate→return regressions were added.

GitHub Actions run `35303082691` passed all structural, semantic, evidence and browser steps. No merge or deployment occurred.
