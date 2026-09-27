# T22 Elite M15 / SIDE278 — Builder Verification Receipt

Status: **BUILDER VERIFIED · INDEPENDENT REVIEW PENDING · UNPUBLISHED**  
Review branch: `codex/t22-m15-review-candidate`

## Exact tested implementation

- Canonical-content cleanup commit: `3f5943024691501ff1678c9222cb1c6ac01d4203`.
- Exact Actions-tested branch head: `bb62dac23871496bb1f51626f5f3cfd4d14c2274`.
- The only change from the content commit to the tested head is the review-branch workflow trigger.
- Full T22 Elite run: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36290674513
- Run number: **#525**
- Job: `108540011754`
- Result: **SUCCESS**

This verification receipt is written after the successful run. Its documentation commit is therefore later than the tested implementation head and must not be mistaken for the run's SHA.

## Verification layers actually executed

### Schema / structure / reviewed semantic guards
`scripts/test-t22-elite-m15.mjs` passed on the exact tested head.

It checked:
- 16 design-derived sessions;
- 32 fixed Main/Transfer tasks and 32 evaluators;
- 48 literal ownership claims;
- 32 task-level semantic-separation rows;
- 17 decision audits (16 Transfers plus S16 synthesis Main);
- 18 wrong-solver discriminators;
- source-role presence and explicit boundary/deferred-topic guards;
- exact claim→public-request→rubric locators;
- conservative evidence-distance labels;
- known-bad cross-session exposure mutations;
- M15 unpublished / M01–M14 learner-registry boundary.

### Independent mathematical verification
`docs/t22-course/audit/m15-math-checks.mjs` passed on the exact tested head.

The oracles independently recompute or attack representative mathematics across all 16 sessions, including:
- orthogonality / orthonormality;
- orthogonal complements and decomposition;
- line/subspace projection;
- nearest-point distances;
- two- and three-vector Gram–Schmidt;
- transpose/null-space geometry;
- normal equations and full-rank invertibility;
- projector symmetry/idempotence;
- inconsistent least squares;
- rank-deficient fitted-vector/coefficient distinctions;
- deterministic line fitting;
- S16 two-route projection synthesis.

### Inherited regressions / prior-module preservation
The full workflow passed inherited T22 structural, mathematical, semantic, provenance and handoff guards. In particular the M14 publication checker confirmed that **M14 / SIDE276 remains the persisted learner frontier** and M15 remains outside the learner registry.

### Real browser / rendering / provenance
`scripts/test-t22-elite-m15-browser.mjs` passed in installed Chromium on the exact tested head.

The test:
- first loaded the persisted learner registry and confirmed it still contains only M01–M14;
- injected M15 into the real learner UI only inside the test browser;
- rendered all 16 M15 lessons;
- exercised all 16 staged guided-attempt → feedback paths;
- exercised all 32 fixed prompt/reference/rubric paths;
- saved attempts and checked assistance provenance;
- exported, imported and reloaded evidence;
- checked mobile-width horizontal overflow and text corruption;
- checked **304 learner surfaces** in the M15 candidate workflow.

The successful log line is:

> PASS M15 candidate browser: persisted learner registry stayed M01-M14; test-only M15 rendered all 16 lessons/guided states and 32 prompt/reference/rubric paths, saved/revealed/exported/imported/reloaded without text corruption or overflow. Surfaces checked: 304.

## Gate-10 provenance / versions

M15 was never published and no real M15 learner evidence existed during the builder-recovery repairs.

Therefore:
- stable session/task IDs remain `@1`;
- assessment `obligationVersion` remains 1;
- instruction version remains `m15-side278-instruction-v1`;
- changed mathematical instances during builder recovery do **not** recertify or delete any learner evidence because none exists for M15;
- browser-test attempts are synthetic verification data only;
- M01–M14 persisted evidence/route state is not migrated by M15.

The recovery repairs and their exact task/session locations are recorded in `M15-RESOLUTION.md`.

## Canonical-state audit

PASS.

The canonical pack now says:
- `module.status = review-candidate-unpublished`;
- 16 sessions / 32 fixed tasks / 48 ownership claims;
- publication requires exact-head verification, independent adversarial review and explicit user authorization;
- M15 is outside the persisted learner registry;
- M16+, T25 and SMMC remain outside this assignment.

Construction-history wording is retained only in historical design/pilot/resolution records, not as the canonical module state.

## Limits

This run establishes implementation integrity for the bounded M15 candidate. It does **not** establish:
- independent pedagogical acceptance;
- learner mastery or retention;
- empirical effectiveness for the user;
- correctness of future M16+ modules;
- permission to publish M15 or merge it to `main`.

## Builder-verification disposition

**PASS for independent adversarial review.**

No publication, main merge, M16 opening or learner-route change is authorized by this receipt.
