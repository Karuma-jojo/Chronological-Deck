> **Current status (2026-09-26): PUBLISHED.** The review-era unpublished/stop statements below are historical receipts. Independent review accepted M14, the user authorized publication, SIDE276 is now registered as module 14, and M15 remains closed.

# T22 Elite — M14 Builder/Adversarial Resolution

Date: 2026-09-26  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M14 · SIDE276 · Matrices, Linear Maps & Linear Systems**  
Disposition: **BOUNDED REPAIR — PRESERVE THE 19-SESSION ARCHITECTURE**

This file records the builder-side adversarial findings discovered before any M14 learner-route publication. It is **not** an independent pedagogical acceptance record.

## Scope preserved

No finding required a rebuild.

Preserved:
- **19 design-derived sessions**
- **38 fixed Main/Transfer assessments**
- **60 current ownership claims**
- formal prerequisite: **M13 / ARC511 only**
- route: linear maps → matrix representation → matrix-vector action → composition/product → exact systems/elimination → nullspace/complete solution → column space/rank/nullity → injective/surjective → invertibility/inverse → determinant → coordinate change/similarity → synthesis
- M15 projection/least-squares, M16 eigenstructure, M17 factorizations and M23 numerical conditioning remain excluded
- M14 remains **unpublished**

## Findings and dispositions

### M14-A01 — S04 associativity was taught but not observed

**Finding.** The first S04 draft claimed learner ownership of associativity from function composition, but the fixed Main did not ask the learner to exhibit that capability.

**Repair.** S04 Main now explicitly asks why `(CA)B=C(AB)` represents the same three-stage map `R∘S∘T`, and the rubric has a dedicated observer.

**Disposition:** RESOLVED.

### M14-A02 — fixed-task answer exposure escaped a literal matrix-only scan

A first semantic scan caught several exact full-matrix reuses, but a later learner-only adversarial read found four deeper exposures that were not always represented as identical matrix literals:

- **S05 Main** duplicated the worked system/witness;
- **S06 Main** duplicated the guided augmented-matrix exercise;
- **S07 Main** duplicated the worked underdetermined system;
- **S17 Main** reused the guided basis-change matrix and therefore exposed its inverse structure.

**Repair.** All four fixed tasks were regenerated on fresh mathematical objects before learner publication. Existing IDs remain obligation version 1 because no M14 learner route or stored attempt exists.

A regression fixture now explicitly guards these four exposure classes, in addition to the full-matrix overlap scan.

**Disposition:** RESOLVED.

### M14-A03 — implicit elementary-matrix premise in S14

**Finding.** The first inverse-construction explanation jumped from “perform row operations on `[A|I]`” to an unexplained combined left multiplier `E`.

**Repair.** S14 now supplies the local bridge:
- apply a legal row operation to `I` to obtain its elementary matrix `E`;
- left multiplication `EA` applies that same row operation to `A`;
- reversibility makes `E` invertible;
- a sequence `E_k...E_1 A=I` applied simultaneously to the attached identity yields `A^{-1}`.

The support-theorem ledger records this bridge. Numerical LU/pivoting remains deferred.

**Disposition:** RESOLVED.

### M14-A04 — row-echelon definition was under-explicit

**Finding.** S07 initially used echelon language without giving the complete bounded definition before consuming pivot/free-variable structure.

**Repair.** S07 now states:
- nonzero rows precede zero rows;
- successive pivots move strictly right;
- entries below pivots are zero;
- pivot normalization to 1 belongs to reduced echelon form, not ordinary echelon form.

**Disposition:** RESOLVED.

### M14-A05 — ownership claims stronger than their public observers

Literal claim→task→rubric auditing found multiple cases where instruction was correct but the ownership sentence exceeded what the fixed task actually observed.

Repairs:
- **S01:** Transfer now derives, not merely uses, `T(0)=0`.
- **S06:** Main now publicly justifies row swap, nonzero scaling and row replacement as reversible operations.
- **S16:** Main now reconstructs the general `det(M)=0 ⇔ M noninvertible` argument from pivots/rank and determinant row rules.
- **S12:** local claim wording was narrowed from a general proof claim because S13 owns the full square-map equivalence proof.

**Disposition:** RESOLVED.

### M14-A06 — second observer audit found additional bounded gaps

A second independent-order read of all 60 ownership rows found:

- **S07:** infinite/no-solution cases were observed, but the unique-solution echelon pattern was only taught;
- **S09:** the task rejected subspace status for `b≠0`, but the claim also said when the solution set contains 0 generally;
- **S11:** rank/nullity definitions were taught but not explicitly requested publicly;
- **S12:** the claim generalized that unequal finite dimensions prevent simultaneous injectivity and surjectivity, while tasks only instantiated the fact;
- **S10/S13/S15:** wording contained “define/prove/state” strength not warranted by the local fixed observer;
- **S17:** its first claim had a valid conversion observer that was not cited in the evidence locator.

Repairs:
- S07 Transfer now states the all-variable-pivot/no-free-variable unique-solution criterion;
- S09 Main now states `0∈{x:Ax=b} ⇔ b=0`;
- S11 Main publicly states `rank(A)=dim Col(A)` and `nullity(A)=dim N(A)`;
- S12 Transfer now generalizes from rank requirements to unequal dimensions;
- S10/S13/S15 claim wording was narrowed rather than bloating tasks;
- S17 evidence mapping now cites its conversion/verification rubric row.

**Disposition:** RESOLVED.

### M14-A07 — evidence-distance labels were optimistic

**Finding.** Several fresh-number procedural Mains were labelled “fresh Main evidence” even though the method or proof architecture had been directly taught.

**Repair.** Evidence labels were conservatively recalibrated:
- S04: proof reconstruction + application;
- S09: proof reconstruction + application;
- S10: retrieval + integration;
- S12: retrieval;
- S15: retrieval + proof reconstruction;
- S17: retrieval;
- S18: proof reconstruction + application.

Transfers that were not genuinely surface changes are now labelled by their real shift, including failure-mode, changed-constraint, misconception-audit, forensic, direction-audit and adversarial-synthesis Transfer.

**Disposition:** RESOLVED.

### M14-A08 — fixed-assessment mathematics and instructional mathematics needed separate gates

**Finding.** Structural/evidence validation alone cannot certify every learner-facing worked/guided calculation.

**Repair.** Added:
- `docs/t22-course/audit/m14-math-checks.mjs` — fixed-task mathematics across all 19 sessions / 38 assessments;
- `docs/t22-course/audit/m14-instruction-math-checks.mjs` — worked/guided mathematics across 19/19 lessons;
- both are mandatory in `.github/workflows/t22-elite-checks.yml`.

The M14 structural validator remains separate so evidence semantics and mathematics cannot silently stand in for each other.

**Disposition:** RESOLVED.

### M14-A09 — determinant pedagogy source was too vague

**Finding.** The design gate said “Kazunga/Bansilal and related studies” without pinning the exact source.

**Repair.** The dossier and canonical source ledger now identify:

Cathrine Kazunga & Sarah Bansilal, “Misconceptions About Determinants,” in *Challenges and Strategies in Teaching Linear Algebra* (Springer, 2018), pp.127–145, DOI `10.1007/978-3-319-66811-6_6`.

Its population and limitation are stated explicitly; misconception frequencies are not generalized to the T22 learner.

**Disposition:** RESOLVED.

## Mathematics preserved after repair

The repairs did not alter M14's mathematical spine.

Protected distinctions remain:
- map versus basis-dependent matrix representation;
- columns versus rows;
- composition order versus scalar-style commutativity;
- system versus augmented representation;
- original matrix versus row-reduced matrix;
- nullspace/domain versus column-space/codomain;
- rank versus dimensions;
- homogeneous subspace versus affine solution translate;
- full-column versus full-row rank;
- square versus invertible;
- determinant algebra versus geometric interpretation;
- determinant magnitude versus conditioning;
- vector versus coordinate column;
- same operator versus similar matrix representations.

## Verification surface

Mandatory builder gates now include:
1. `scripts/test-t22-elite-m14.mjs`;
2. `docs/t22-course/audit/m14-math-checks.mjs`;
3. `docs/t22-course/audit/m14-instruction-math-checks.mjs`;
4. the complete inherited T22 structural/regression suite;
5. the existing shared-route Chromium workflow, which must continue to pass while M14 remains unpublished.

## Independent-review target

The next reviewer should **not** assume builder green means pedagogical acceptance.

Prioritize:
- S04 composition/product/associativity;
- S05–S07 system/elimination progression and repaired separation;
- S10 original-pivot-column argument;
- S11 rank-nullity support proof;
- S14 elementary-matrix inverse bridge;
- S15–S16 determinant characterization/singularity/geometry boundary;
- S17–S18 coordinate direction and similarity;
- all 60 literal ownership observers;
- the two M14 math checkers, especially whether they genuinely reconstruct rather than merely pin text.

Reopen the 19-session architecture only if concrete evidence requires it.

## Stop boundary

**STOP at M14 for independent review. Do not publish M14, open M15, merge to main, or reinterpret legacy progress.**


---

## v1.2 independent-review repair round — 2026-09-26

An independent review of the builder-verified head `937a4ca33a921ca87f83fa14651d87e473272ff1` applied the uploaded **T22 Module Builder and Adversarial Checker v1.2** more strictly and returned **REPAIR_REQUIRED, bounded repair, no rebuild**.

The reviewer explicitly preserved the 19-session mathematical architecture and reopened Gates 5, 7, 8, 9 and 11.

### Independent findings and current dispositions

| ID | Independent finding | Repair |
| --- | --- | --- |
| M14-R01 | Gate 11 did not render unpublished M14 itself in the learner UI. | **CLOSED.** `scripts/test-t22-elite-m14-browser.mjs` uses test-only metadata interception to load unpublished SIDE276 into the real learner UI and walks all 19 lessons/guided states plus all 38 prompt/reference/rubric paths. It first exposed and then verified repair of a real 390px overflow defect. |
| M14-R02 | `semanticSeparationAudit` merely duplicated evidence labels. | **REPAIRED.** Replaced with a genuine 38-task ledger: closest instructional examples, mathematical-instance difference and exposure disposition for every current fixed task. |
| M14-R03 | Evidence classes used non-v1.2 labels. | **REPAIRED.** Primary classes are now only `retrieval`, `proof reconstruction`, `fresh Main evidence` or `changed-surface Transfer`. Secondary mechanism descriptions are stored separately. |
| M14-R04 | Required decision audits were absent. | **REPAIRED.** Added 21 decision-audit rows: every changed-surface Transfer plus S04 product-order choice and S19 synthesis. Each records the claimed decision, prompt cueing, visible rehearsal and actual scored action. |
| M14-R05 | Gate 7 lacked generalization distance. | **REPAIRED.** All 60 ownership records now carry a reviewed `generalizationDistance` field. |
| M14-R06 | S11 claimed the general rank-nullity derivation but observed only `3+2=5`. | **REPAIRED + VERSIONED.** S11 Main is now `S11-M@2` and explicitly derives `r+(n-r)=n`, including why the n-r special null solutions span and are independent. |
| M14-R07 | S14 claim included singular rejection without a local observer. | **REPAIRED BY NARROWING.** S14 owns inverse-order reversal and the nonsquare two-sided-inverse boundary; singular rejection remains in S13. |
| M14-R08 | S18 only numerically checked determinant invariance. | **REPAIRED + VERSIONED.** S18 Main is now `S18-M@2` and publicly proves `det(P^{-1}AP)=det(A)` from multiplicativity before the numerical check. |
| M14-R09 | S19 was an integration recipe, not v1.2 synthesis. | **REPAIRED + VERSIONED.** S19 Main is now `S19-M@2`: the learner chooses the attack order, justifies at least two representation/method choices and reuses a shared row-reduction artifact while still meeting explicit output obligations. |
| M14-R10 | Misconception discriminators were not systematically run against actual rubrics. | **FOLLOW-UP REPAIRED.** The ledger now contains 19 concrete wrong-solver cases plus an explicit 16/16 design-gate coverage table tied to current task/rubric evidence. |
| M14-R11 | Math-gate prose overstated mechanical coverage. | **REPAIRED.** The fixed-task checker is now described as targeted arithmetic/property reconstruction plus reviewed reference assertions; prose proofs remain human semantic obligations. S10 non-membership was also upgraded from a weak failed-example check to an actual coefficient obstruction. |

### Additional Gate-7 repairs found by the 60-claim generalization audit

The required generalization-distance pass found additional overreach not listed in the independent review:

- **S04-C2:** narrowed “interpret each product column” to “interpret a product column,” matching the fixed observer.
- **S13-C3:** removed the unobserved “missing pivot” branch; the fixed Transfer owns rejection from a supplied nonzero null vector.
- **S16-C2:** narrowed general n-dimensional volume ownership to the 2-by-2 area/orientation interpretation actually observed.
- **S01-C3:** explicitly bounded the basis-determines-map claim to finite-dimensional coordinate settings.

### Gate-10 version/provenance receipt

Before editing public obligations, the prior head and fingerprints were captured in:

`docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json`

Versioned current tasks:

- `S07-T@1 → S07-T@2`
- `S11-M@1 → S11-M@2`
- `S18-M@1 → S18-M@2`
- `S19-M@1 → S19-M@2`

M14 was unpublished at both versions, so no learner-route attempt is silently recertified.

### Current status

**Historical first-round result:** the original v1.2 repair reached a fully green implementation checkpoint before the independent follow-up. FU-01…FU-04 below are the controlling final bounded repair.

M14 remains unpublished. M15 remains closed.


### Repaired integration result

The first complete repaired implementation/runtime checkpoint is `59f6ceaea143255d024fcb0b2b78460035024cfa`.

Full run:
https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/36221875839

Run #462: **SUCCESS**.

Gate-11 additionally found and repaired one artifact-first defect during the cycle: long M14 evaluator math could overflow the 390px learner viewport. The shared text/problem wrapping fix is pinned by exact blob in the preservation baseline, and run #462 reran the inherited M01–M13 browser suite plus the M14 candidate probe successfully.

Gate-9 integration is recorded at `docs/t22-course/audit/M14-V12-INTEGRATION-REVIEW.md` with status **PASS_WITH_EVIDENCE**. This remains builder-side evidence; independent follow-up is still required.


---

## Independent follow-up bounded repair — FU-01…FU-04

The independent follow-up preserved the 19-session architecture and found no new mathematical defect. It held acceptance for four evidence/provenance issues only.

| Finding | Final repair |
| --- | --- |
| FU-01 — S14 overclaims “prove” | Ownership narrowed to **apply and justify** the inverse-order rule on invertible square matrices plus the observed nonsquare two-sided-inverse boundary. No task change/version bump. |
| FU-02 — S09 Transfer was a context-only replay | `S09-T@1 → S09-T@2`. New Transfer starts from two unexplained same-output settings and a false finite-settings claim; the learner must infer the zero-output direction, reconstruct every preimage and prove completeness without a nullspace cue. |
| FU-03 — wrong-solver ledger did not prove the whole design-gate contract | Added stable case IDs, six explicit missing attacks, and a 16/16 `designGateCoverage` table. There are now 19 current-task wrong-solver cases. |
| FU-04 — canonical state retained stale pending/#462 language | Authoritative verification and handoff were rewritten to remove stale construction-state claims. Historical runs are labelled historical; current acceptance requires the full required workflow attached to the current branch HEAD to be green on that exact SHA. |

Gate-10 receipt for the S09 change:
- `docs/t22-course/audit/m14-followup-pre-fu-repair-version-receipt.json`

The receipt captures pre-FU head `41f3de9bf2e055efe8f2f717da55f0e56fd540b2`, green run #469 / `36222070177`, and the retired `S09-T@1` fingerprint before `S09-T@2` was authored.

### Current closure rule

The repository does not self-certify independent acceptance. Before closing the hold, the independent reviewer must verify FU-01…FU-04 against the current artifacts **and** verify that the required Actions workflow on the exact current branch HEAD is fully green.

M14 remains unpublished and M15 remains closed until that independent acceptance.


---

## Publication closure — 2026-09-26

Independent review closed the final content hold. The user then explicitly authorized publication.

Publication actions:
- add SIDE276 to the shared learner registry as module 14;
- mark SIDE276 `authored` in the roadmap;
- mark SIDE276 `accepted` in the semantic-prerequisite ledger;
- mark the canonical authoring pack `published-user-authorized-independent-accepted`;
- convert the M14 browser test from unpublished test-only injection to direct persisted-registry verification.

The review-era stop statements above remain historical evidence of the controlled process; they are superseded by this publication closure.

M14 is now the learner frontier. M15 remains closed.
