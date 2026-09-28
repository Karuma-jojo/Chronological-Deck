# SMMC navigation redesign

The first foundation release still presented too much at once: a large header, course switching, unit selectors, a chapter map, lesson prose, guided checks, questions, research data and progress controls. On mobile, the learner had to scroll far before reaching the work.

This change separates three destinations: Your path, Learn & practise, and Past papers. A fresh learner sees a clear Start chapter action. The chapter map is available on request rather than repeated above each lesson. Lessons have separate Learn and Practise views, a readable step/question position, saved-attempt review and an explicit next-problem/next-lesson action. Mixed sets begin in practice mode. Backups, other courses and builder documents live in a secondary menu that stays accessible in the sticky navigation.

The bank remains six foundation steps, twelve exercises and four guided checks, plus the eight existing bridge/method units. This navigation change does not add a complete contest curriculum or recalibrate difficulty from learner data. The authored difficulty progression describes fading support, not a promise that every subsequent question is harder for every learner.

## Product contracts

- Stable unit/task IDs, old course links, saved attempts, assistance history, exports and cloud record schemas are retained.
- A saved attempt enables Next; it does not establish correctness or mastery. Learners can revisit any step through the path or lesson browser.
- Existing saved tasks can reopen help and continue without saving a duplicate attempt.
- The selected Learn/Practise activity and the path view survive a reload through URL parameters. Existing cross-course unit/task restoration remains intact.
- No hint or worked solution is automatically revealed by navigation.
- Mobile browsing collapses after lesson selection, keeping the next screen focused on learning.
- Past-paper research totals and manual T25 mappings are secondary controls; the underlying historical exposure policy is unchanged.

## Pedagogical boundary

Guided practice develops prerequisite fluency. Mixed practice requires choosing and combining ideas without a named method next to the problem. Delayed practice checks whether the learner can use the ideas after the immediately preceding example is no longer in view. Appropriate past papers follow further proof/discrete and topic preparation; this small chapter alone is not a claim of SMMC readiness.

When stuck, distinguish an unfamiliar definition or missing routine skill from not seeing how familiar tools connect. The former suggests a focused refresher; the latter warrants exploration, examples, failed approaches and eventually a hint with its use recorded. Neither endless imitation nor unexplained difficulty is the intended route.

The general learning structure is consistent with the IES/What Works Clearinghouse guide [Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): worked examples interleaved with independent exercises, spaced review and explanatory questions. This evidence does not validate a specific SMMC rank outcome or an automatic mastery threshold.

## Verification scope

Extend the existing SMMC browser workflow to cover the new path-to-lesson journey, Learn/Practise switching, all twelve exercises, next-problem/next-lesson movement, help gates, backup/restore, mobile overflow and path reload. Retain cross-course and cross-device tests, updating their navigation actions to use the visible More menu. Screenshots from the exact tested revision support visual inspection. These are interface checks, not an independent pedagogical review of the bank.
