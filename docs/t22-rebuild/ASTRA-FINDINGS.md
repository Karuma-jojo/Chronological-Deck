# Astra audit — current M65 roadmap and M01 course

Reviewed commit: `da0776048f47f1b9d98ad71589e015d132c309f9`.
Branch: `codex/t22-pedagogical-rebuild`.
Disposition: **usable after bounded repairs; Sol may own continued development. M01 is not yet accepted as the template for all subsequent modules.**
This supersedes review of the historical Stage-A 73-node proposal. The current RUN-LOG correctly identifies M65 and M01 as authoritative. Do not restart T22 or T25.

## Scope and evidence

Read the current M65 skeleton/dependency audit/graph, course metadata and roadmap, all 17 M01 session contracts, notes and 34 main/transfer prompts and evaluator references, core/UI/HTML, validator and release notes. Independently inspected the mathematics across those task pairs; ran selected numerical substitutions and adversarial evidence-state reproductions. The existing validator passes: 65 unique macro IDs with earlier declared prerequisites, 17 sessions, 34 tasks/evaluators, rubric totals and metadata hashes.

The comparison from the old handoff has 27 commits and 22 changed files. It adds the separate course and an index link; it does not alter historical T22 registries, T25 evidence or cloud schema. Prior source inspection checked 62 local T22 source files against GitHub blob hashes with no mismatches.

No full browser interaction/accessibility test, learner pilot, historical-progress migration, or audit of all 596 legacy atomic obligations was performed. An HTTP smoke test and the current validator cannot establish those properties. The supplied evaluator answers were visible during review; this is independent recalculation, not a blinded trial.

## What is worth preserving

- M01 has a useful fine-grained progression and separate main/transfer work. S12 denominator conditions and S17's nonnegative-fee feasibility condition deserve preservation.
- The dedicated learner surface distinguishes study evidence from automatic clearance, preserves old storage namespaces, and rejects conflicting imported attempt IDs.
- The 65-module plan restores numerical linear algebra, matrix calculus, numerical optimization and DP/MDP ancestry that the earlier optional-core proposal could not safely assume.
- Early probability/trading games and market vocabulary, followed by temporal validation and realistic research, are appropriate.
- Keep 65 as the working capability inventory. No extra macro module is justified by this bounded review; repair internal teaching bridges and dependency declarations instead.

## Required repairs before treating M01 as the reusable template

### A-01 — P1 — assessment edits do not invalidate evidence

Location: `core.js:evidenceIsCurrent`, generated session contract hashes, `test-t22-elite-m01.mjs`.

The hash includes the session description/ownership/scope, but excludes the actual main/transfer prompt, evaluator reference and rubric. Replacing a problem while keeping the description and ID makes an old attempt remain current. The reproduction script confirms this. A versioned-looking ID does not help unless semantic edits actually bump it.

Repair: define a task assessment fingerprint including prompt, task/obligation identity/version and marking contract. Store it on attempts and compare it during summaries. Preserve historical attempts. Allow reviewed nonsemantic wording changes through an explicit equivalence policy; do not silently reinterpret them.

Acceptance: change only a problem, only a rubric, or only a substantive reference condition: prior evidence becomes historical/stale. Unchanged data round-trips unchanged. Do not migrate current hashes into trustworthy new hashes without checking equivalence.

### A-02 — P1 — evaluator packet exposure bypasses independence tracking

Location: `ui.js:copyPacket/showProblem/save`, `core.js:compilerPacket/moduleEvidenceSummary`.

The copied packet contains both current and sibling answers. The UI records only `packetExportedAt` for the current task; independence checks ignore that field, and the sibling has no exposure record. Subsequent attempts can therefore count as independent even though the answers were exported to the learner's clipboard. This is a normal UI path, not a developer-tools attack.

Repair: before yielding an answer-containing packet, mark both included tasks as answer-exposed for subsequent attempts, or remove answer-containing export from the learner surface and provide a properly separated evaluator workflow. Preserve the status of attempts genuinely saved before exposure. Capture session/problem/visit before asynchronous loads so navigation cannot mark the wrong task.

Acceptance: export a main packet, then attempt main and transfer: neither later attempt counts as fresh independent evidence. A pre-export attempt remains historical evidence of its original conditions.

### A-03 — P1 — review edits count as new retention demonstrations

Location: `core.js:reviewQueue`.

Saving a review of the same answer on a later day creates another secure event. The queue counts distinct review dates as independent practice days and resets the due date. Reproduction: reviewing the September 17 answer on September 18 moves its due date from September 19 to September 25 without new mathematical work. A main-only secure answer also receives “Next delayed review” while transfer is still missing.

Repair: aggregate reviews onto their original attempt; use original attempt time for retention. Track outstanding main/transfer obligations separately. Label repeated use of an already attempted task as retrieval, not fresh transfer. Add a route for replacement tasks when both fixed references have been exposed.

Acceptance: any number of reviews of one attempt does not earn another practice day; an unfinished transfer stays due; a genuinely new attempt can change retention state.

### A-04 — P1 — beginner order still contains hidden prerequisites

Location: M01 S01, S07, S08, S14 and associated learning notes.

S01 asks the learner to order fractions and an irrational square root before S02 fractions and S08 roots. S07 assesses scientific notation before S08 owns it. S08 assesses fractional powers, but its short lesson does not define rational exponents; S14 demands interval notation without teaching its endpoint conventions.

Repair: keep S01's independent baseline within taught signed-number/operation skills and relocate the radical comparison, or explicitly supply a genuine prior-readiness/remediation bridge. Put scientific-notation instruction before its assessment. Teach rational exponents and interval notation before demanding them. Do not fix this merely by adding undeclared school knowledge to entry requirements.

Acceptance: for every new symbol/operation in the first eight sessions, name a preceding taught source or an explicit just-in-time teaching step. Independently attempted assessment must not simultaneously be that missing instruction.

### A-05 — P1 — ownership breadth exceeds teaching and evidence

Location: M01 notes, contracts and task bank.

The current notes are compact reminders, not sufficient beginner lessons. For example S10 tells the learner to seek quadratic factors but does not demonstrate how to find them. S16 claims quadratic-formula mastery, yet every real quadratic in its main/transfer tasks factors easily; a learner can pass both without ever using the formula. S15 claims negative-threshold cases but assesses a zero threshold. S02 claims fraction multiplication independently, mostly using it incidentally. Other claims should be mapped systematically.

Repair: add short worked instruction plus guided practice outside independent assessment where required, followed by a fresh task. Map each required-ownership claim to observable evidence. Add targeted probes only for actual gaps—e.g. a nontrivial irrational-root quadratic requiring justified general solution, and negative absolute-value thresholds—or narrow the claim. Preserve alternative valid routes; do not demand one algorithm when another fully establishes the claimed capability. Make prerequisite/tool learning possible without permanently exhausting the only independent task pair.

Acceptance: a claim-to-task coverage map with no unobserved claim certified, and at least one genuinely novice-usable worked instructional path per session. Keep self-ratings explicitly self-ratings.

### A-06 — P1 — macro topological validity is not semantic prerequisite approval

Location: M65 graph and reused rich-module contracts.

The order is valid for its declared edges. Some inherited content still needs explicit reconciliation:
- SIDE263's old entry text requires ARC053; the new order intentionally reverses them. Adapt the entry/teaching rather than copy the old contract.
- ARC517 A08 assumes double integrals; ARC510 is one-variable integration and SIDE271's advertised scope is derivatives. Assign a bounded iterated-integration/support-geometry bridge before joint continuous laws.
- ARC531 A09 already demands numerical MLE at M33, while full numerical optimization is M57. Put basic solver interpretation/convergence/constraints checking inside or before M33; advanced algorithms can remain later.
- ARC542 A10 requires polynomial-root stability: explicitly teach the minimal complex-root/modulus machinery if retained. M02's current outline does not clearly own it.
- M07 explicitly uses log returns, but its declared ancestors omit M02's logarithms. Several other old rich prerequisites appear earlier in the itinerary yet are absent from the executable ancestry. Being earlier happens to help a sequential reader; it does not make prerequisite-based unlocking correct.

Repair: maintain a per-module reused/adapted/prerequisite-taught ledger. Before authoring each module, trace every actual prerequisite to earlier instruction and add an edge or a bounded internal bridge. Update the graph and the “frozen” audit wording accordingly. This does not require expanding the macro count.

Acceptance before M02: document these named bridge owners and missing edges. Thereafter require semantic ancestry checks at each module boundary before publication.

## Smaller corrections

- **P2:** S12's restricted rearrangements are correct, but the references should also accept/briefly explain the original valid exceptional branches: r=-1 with V1=0 and any nonzero V0; q=1 with b=0 and any nonzero a. A denominator condition on a solved form is not proof the original equation has no solutions there.
- **P2:** Header/status text in M65-SKELETON still says no atomic authoring; REVIEW-PACKET still calls the old checkpoint current. Mark historical documents clearly and link the latest RUN-LOG.
- **P2:** The “generated” bank currently has no committed deterministic authoring/build source. Either declare JSON to be the canonical authoring source or commit its generator before scaling. Tests should compute independent expected results, not only search reference strings.
- **P2:** Session lookup uses `course.sessions[p.order-1]`. Replace it with stable-ID lookup before adding modules with their own local ordering.
- **P2:** Review intervals are product defaults, not validated retention estimates. Label them accordingly.

## Role and scope judgment

M65 is a broad advanced-study inventory, not proof of an elite employment profile. Preserve early project unlocks instead of requiring all 65 before useful work. Reproduction, research memos, failure analysis and increasingly independent projects are essential to the user's stated goal.

Current [Jane Street research requirements](https://www.janestreet.com/join-jane-street/position/8600948002/) support substantial Python, empirical modeling and communication. [IMC's graduate research role](https://www.imc.com/us/careers/jobs/4907368101) includes implementation and degree/graduation eligibility; its [trader role](https://www.imc.com/us/careers/jobs/4751729101) has a different programming emphasis. These support role differentiation, not a universal 65-module hiring threshold. Sources checked during this audit. No salary or hiring probability is inferred.

The historical temporal sample correctly describes backward joins under [pandas' documented semantics](https://pandas.pydata.org/docs/reference/api/pandas.merge_asof.html). When adapted into M43, distinguish event time from actual availability and specify strict/non-strict label-end conventions publicly.

## Sol continuation contract

1. Read this report and current RUN-LOG; verify branch head.
2. Repair A-01 through A-06 with bounded changes, preserving all prior evidence.
3. Convert the provided reproductions into desired-behavior regression tests; they currently demonstrate defects, not passing product behavior.
4. Run the existing structural validator, mathematical checks, evidence regression tests and an actual browser workflow: save, reveal, packet export, navigate during load, review, export/import and reload.
5. Save a finding-by-finding resolution table with commit IDs, test results and remaining limitations. Commit/push verified checkpoints.
6. Once those acceptance checks pass, proceed module-by-module with the same instructional/evidence gates. Another mandatory Astra pass is not required for every module.
7. Do not claim whole-course approval, overwrite legacy progress, merge or deploy on the strength of this review.

There is no reason to restart the project. The useful work should be retained and repaired.

