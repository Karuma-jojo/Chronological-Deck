# Gate 4 executable contract v1 — independent implementation-review candidate

**Status:** BUILDER PROPOSAL — **NOT ACCEPTED**. Contract v0.3 is already independently accepted at source commit `604c3e9715024f3248e493eb2d2d73254d4ef318`, merged at `442447b3cb3a24ee7cd7a5fa9051d94f7f8ef360`. The executable schema and this test suite require a **new independent review at their own exact PR-head SHA**.

**Scope:** Implement contract §4B, §4C, §6/§6A, §8A and §11 as review-only software. Do NOT select mathematical dispositions, promote relations, alter Gates 0–3, unlock calibration, or create Gate 5 objects.

## Files and responsibilities

- `course/smmc/arsenal/tribunal-contract-v1.mjs`: strict exact-key schemas, evidence references, status/history transitions, relation participant closure, explicit domain comparators and graduation guard.
- `course/smmc/arsenal/tribunal-ledger-v0.mjs`: deterministic 661-case **PENDING-only** scaffold imported from frozen raw candidates and Gate-3 ledger. All relationship/evidence/review ledgers empty; no mathematics adjudicated.
- `scripts/validate-smmc-gate4-contract-v1.mjs`: pinned predecessor checks, positive scaffold and *synthetic* negative test fixtures (not Arsenal claims).
- `.github/workflows/smmc-gate4-contract.yml`: run the existing inherited SMMC validator plus this new Gate-4 validator.

## Normative structural invariants

1. Every candidate has exactly one case, stable ID, exact original name/origin/evidence IDs and SHA-256 digest of its full frozen Gate-3 row. All 661 remain present even on REJECT or evidence hold.
2. No unknown data keys, unregistered Gate-1 evidence classes, noncanonical SOURCE_FACT digests, fabricated new BATTLE role or borrowed candidate-owned facts are accepted.
3. Proposal primaries use exactly `ACCEPT / MERGE / SPLIT / PARENT_CHILD / COMBO / REJECT`. Status is independently `PENDING / EVIDENCE_HOLD / PROPOSED / CHALLENGED / REVIEWED_FOR_HANDOFF`. No automatic defaulting.
4. `EVIDENCE_HOLD` has null primary, accepted reason, Gate-4/upstream scope and concrete next action. A later-gate-owner label cannot erase unfinished research. `REVIEWED_FOR_HANDOFF` requires non-null proposal, cited syntheses, reviewer findings, and a versioned scope-review reference. Exact lifecycle events are recorded; terminal status needs explicit versioned reopen.
5. Every participant of a shared proposed MERGE, SPLIT, PARENT_CHILD or COMBO references the same unique hypothesis record. Components have review-only, owning raw IDs; no canonical IDs. MERGE records explicitly name both evidence-supported intended domains, countertest and full-domain comparison scope. An overlapping-only proposal is rejected structurally. All directional roles are typed; overt containment cycles and reversed edges are rejected.
6. Two same-scope reviewed MERGE links together with an **explicitly represented** conflicting separating witness trigger a challenge. **Software cannot determine mathematical identity or discover an unreported counterexample**; reviewers must adversarially inspect the evidence and scope. Names, domain strings, proposal booleans and author attestations alone do not prove mathematical truth.
7. An unchanged-charter graduation check requires **all 661 `REVIEWED_FOR_HANDOFF`**, zero unresolved holds or challenged relations. Signed scope reviews are not waivers. A modified gate charter, if ever adopted, requires its own separately reviewed success criteria.

## Exact-source protection

The independent existing `scripts/validate-smmc-authoring-v1.mjs` checks the eleven accepted Gate-2 blobs, semantic digest and Gate-3 protected measurements. This implementation's own script additionally pins the accepted Gate-0, Gate-1 and selected Gate-3 Git blob identities, plus the exact accepted Gate-4 contract blob and its committed-file SHA-256.

## Independent adversarial review tasks

The independent reviewer must examine both *completeness and overreach*:

- Reproduce baseline 661 PENDING check and the 660/662/duplicate/altered-name/altered-G3-row negative fixtures.
- Attempt arbitrary extra keys, fake source hash, synthetic official BATTLE evidence, cross-candidate borrowing and unsupported synthesis claims.
- Attack MERGE on a proper specialization masked by overlapping inputs; independently evaluate any full-intended-domain attestation on original sources. A passing enum check is not a mathematical proof.
- Try symmetric reference omissions, unowned temporary handles, incorrect parent-child direction, duplicate exact claims, explicit same-scope contradictions, unsupported synergy/co-presence and accidental transitive canonicalization.
- Challenge status-history omissions, terminal reopen, downstream-owner substitution and 661 individually signed waivers or 661 true evidence holds.
- Validate inherited CI at exact head; inspect diff against accepted main; confirm no frozen predecessor edit or Gate 5+ artifact.

**Stop rule:** This PR, even if structurally green, does **not** authorize calibration. A reviewer must issue an independently accepted exact-head implementation decision first. The heterogeneous calibration/held-out protocol is a *subsequent* stage with its own freeze, reviewer and adversarial approval.

**Potential limitations to scrutinize:** Exact-key/schema checks cannot enforce original-source mathematical semantics; explicit A≠C witness handling is only as complete as the research annotations; some relation direction/handle conditions are structural approximations pending independent calibration. The independent reviewer is entitled to require repairs rather than treating green CI as graduation.


## Independent PR #194 source-review repair — builder response, not acceptance

Review target: the exact independent `CHANGES REQUIRED` report on head `8c06532f83a3c27472cb121c2a27869457d39e34`. This remains an **implementation-only** repair proposal; the original reviewer must reassess the new PR head.

| Review ID | Implemented fail-closed check | Synthetic regression |
|---|---|---|
| G4-I01 (blocking) | Nonchallenged matching shared relation required whenever a case proposes MERGE, SPLIT, PARENT_CHILD or COMBO. | All four missing-relation primaries rejected; MERGE plus supported secondary COMBO remains allowed. |
| G4-I02 (blocking) | All occurrences of one temporary handle must agree on every defined field, not merely owner; within-relation definitions form an exact bijection with handles. | Two same-owner SPLIT relationships with identical handles pass; changing one operation or duplicating a handle fails. |
| G4-I03 (blocking) | Held scope must be explicitly GATE4_OWNED or UPSTREAM_AMENDMENT_REQUIRED, consistent with hold reason; requires named owner, affected question, missing evidence, next action, scope review and reviewer findings. A hold-to-proposal/challenge transition cites at least one newly referenced, candidate-owned G4 supplemental evidence record. | 661 structurally valid holds block graduation; null/misowned scope, missing question, or uncited hold exit fail. |
| G4-I04 (blocking) | Events require exact 40-hex accepted SHA; terminal reopen targets only substantive review, must reference prior terminal event SHA, and must match an **externally supplied immutable accepted status-history prefix SHA-256**. Nonterminal reopen markers are forbidden. | Valid pinned synthetic reopen passes; arbitrary SHA, terminal-to-terminal, unpinned or mutated prior history fail. |
| G4-I05 (moderate) | COMBO composed expression source must be a participating raw candidate, and completed relation requires each participant's named Gate-8 handoff. | Valid secondary COMBO with an owned temporary handle passes; nonexistent composed source, foreign handle or prematurely completed COMBO fail. |
| G4-I06 (moderate) | A REVIEWED_FOR_HANDOFF scope decision requires a matching SHA-256 in **trustedScopeReviews**, an external independently approved registry not taken from candidate-provided case/claim data. A bare reviewer's name or SHA-shaped string cannot suffice. | Completed case without certificate fails; matching independent synthetic pin passes; altered certified text fails. |

### Trust boundary / limitations for independent reviewer

`validateGate4Bundle` accepts separate `trustedScopeReviews` and `trustedStatusHistoryPrefixes` options **only from the independent governance/acceptance context**, never the current untrusted tribunal bundle. The script cannot determine whether a supplied registry is truly independent merely from its type. The implementing caller and future calibration acceptance procedure must pin those registries in separately accepted artifacts and verify authentic GitHub review provenance, not generate them by hashing the mutable proposal itself. Absence of the externally pinned registry fails closed for a completed handoff or terminal reopen.

The terminal-history pin binds an exact prefix of status events by SHA-256, so it protects prior events only when that hash was independently accepted; no mutable object containing both the records and its own hash constitutes an external attestation. Structural equivalence-domain names and countertest phrases are not mathematical verification and still require independent human/source review.

**This branch changes no accepted Gate 0–3 files or the frozen Gate 4 prose contract, creates no final ontology IDs, performs no calibration and leaves all 661 cases PENDING. Do not merge pending independent exact-head acceptance.**
