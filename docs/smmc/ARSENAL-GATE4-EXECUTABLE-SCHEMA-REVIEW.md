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


## PR #194 second independent re-review — builder repair (2026-10-22)

**Reviewed/rejected former head:** `48518f0181a70f7aabb902f847f57d7c803992aa`.
**Scope:** Preserve the independently accepted Gate 4 v0.3 contract and predecessor sources. These are executable-consistency repairs **only**, without actual mathematical adjudications.

| Finding | Implementation change | Synthetic adversarial regression |
|---|---|---|
| G4-R194-01 (SEV-1) | `validateCase` now requires each `comparisonCandidateId` to appear in the frozen raw/case inventory. Every named comparison additionally requires explicit evidence, a comparative fact, an exact shared relation, synthesis linked to the compared owner, or an explicit held-case research action naming the real ID. | Reject a fictional raw ID appended to a valid comparison; reject an otherwise-valid but undocumented real third candidate. Accept a relation-backed comparison with no duplicated comparison-evidence entry. |
| G4-R194-02 (SEV-1) | A SPLIT/COMBO **primary** must match a nonchallenged hypothesis whose typed `relationDirection.sourceId` equals that exact case's `candidateId`. SPLIT component definitions must be owned by the split source. Being listed as a component supplier/participant alone is insufficient. | Reject B's stolen SPLIT or COMBO primary where A is the source; accept A routing SPLIT or COMBO while retaining valid secondary relation references. Reject non-source-owned SPLIT components. |
| G4-R194-03 (SEV-2) | Gate 4 supplemental-evidence `candidateName` must equal the frozen raw name at the named `candidateId`. | Reject synthetic contradictory candidate-name provenance. |
| G4-R194-04 (SEV-3) | Component-definition reuse compares every contractually allowed component field by value, not whole-object `JSON.stringify` key order. | Accept identical definitions serialized with reversed property order; continue rejecting conflicting source/scope/operation definitions. |

**Review cautions:** An explicit recorded comparison context is a structural link, not evidence that the mathematical comparison is correct. In particular, a held-case action stating a real compared raw ID is only a tracked research obligation. It cannot graduate an evidentiary hold. The field-by-field component comparison does not declare two different mathematical components equivalent; it only permits identical typed definitions to share a temporary review handle.

**New acceptance required:** All four workflows must finish successfully on the repaired PR head; an independent reviewer must again challenge the exact SHA. Even green CI is not an independent mathematical or implementation PASS. **PR remains draft and unmerged.** Gate 4 calibration, 661 research adjudications and all Gates 5–15 remain locked.


## PR #194 third independent adversarial re-review — immutable terminal content + claim identities

**Rejected prior exact head:** `e6daed4511066f7c33a502bdb96058621fd3f9fe`. This is a **builder implementation-only repair response**; the accepted Gate 4 v0.3 prose contract, all Gate 0–3 artifacts and all 661 raw candidates remain unmodified.

### G4-R194-05 — Externally accepted terminal case and relation snapshots

- Added `gate4TerminalCaseDigest(case, relationById)`: a SHA-256 of the **entire substantive case object together with full authoritative records for all relation IDs that case references**. It includes even nonterminal `PROPOSED` hypotheses referenced by a terminal case; otherwise changing those could indirectly rewrite an accepted treatment.
- `validateGate4Bundle` requires a `trustedTerminalCases` Map supplied by an **independent governance caller** for **every** `REVIEWED_FOR_HANDOFF` case. Each entry has `{acceptedVersion,sha256}`. The version must exactly equal the last checked status-history event's terminal accepted SHA; the digest must match the current case plus its relation closure.
- Independently, every `REVIEWED_FOR_HANDOFF` relation requires `trustedTerminalRelations` with `{acceptedVersion,sha256}` of the entire exact reviewed relation. Its participants' last terminal event versions must agree with that reviewed version. Cases and relations that are not terminal do not assert this independent content acceptance.
- **Initial acceptance is fail-closed** without those external pins, rather than relying on a self-declared reviewer name or locally computed current hash. Later validation rejects changes to accepted rationale, hypothesis, or a referenced mathematical relation unless the accepted case is reopened by the separately required versioned, externally pinned history pathway.
- **Trust root caveat:** A builder-supplied Map cannot prove a prior independent approval by itself. The accepted immutable external registry must be version-pinned and authenticated at the caller/acceptance layer. **Do not construct trust pins from the mutable bundle under inspection.** The test harness uses synthetic digest fixtures only to exercise this trust boundary.

### G4-R194-06 — Canonicalized exact-claim duplicate detection

- Added `gate4RelationClaimIdentity(relation)`, a deterministic serialization with recursive object-property key sorting. Unordered participant IDs and `intendedDomains` (sorted by candidate ID) are normalized; SPLIT component target collections are normalized. It preserves typed relation direction, split/component definitions, full claim description, domain statements, separating witness and coupling when those materially distinguish a claim.
- This identity intentionally **excludes record ID, status, reviewer, and evidence-support lists**: separate citations or review metadata do not justify minting two authoritative hypothesis IDs for the *same exact mathematical proposal*. This is syntactic identity, **not** a claim that two semantically similar but differently worded methods are mathematically the same.
- Two full-content-equal mathematical hypotheses with different IDs and reordered object keys / reversed domain order now fail; genuinely distinct claims between the same candidate IDs remain permissible.

### Regression evidence and precise release limit

Added synthetic negative fixtures for missing terminal-case certificate, changed terminal rationale, changed terminal hypothesis, changed linked mathematical relation, absent terminal-relation certificate, changed reviewed relation with a forged current case-pin, and duplicate exact mathematical claim under reordering. Added positive fixtures for initial externally pinned case acceptance, independently pinned two-case/one-terminal-relation acceptance, harmless property reordering, and two genuinely distinct proposals between the same raw IDs.

**No source-faithfulness or mathematical truth is mechanically certified.** The synthetic approvals are test data, not real independent acceptance. All 661 actual cases remain `PENDING`, with zero dispositions or shared relations. **No Gate 4 calibration, mass adjudication or Gate 5–15 work is authorized.**

Independent exact-head review must verify the updated invariants and repeat both original attacks *without trusting the developer-created test pins*. Do not merge without a fresh independent exact-head PASS.


## PR #194 fourth independent review — evidence closure and handle alpha-renaming

**Rejected exact head:** `b2404ce1ad84299ef58130dbd387e2b78f019523`. Two SEV-1 builder-level corrections are submitted for **new independent exact-head review**, not self-accepted as Gate-4 implementation.

### G4-R194-07 — Protect substantive evidence as well as evidence IDs

- `gate4TerminalCaseDigest(case, relationById, evidenceById)` now hashes `{case, related, evidence}`; the `evidence` field includes complete, stable serialized records for every source reference in the case and *all linked relations*.
- `gate4TerminalRelationDigest(relation, evidenceById)` independently hashes `{relation, evidence}`. Evidence roots include support/synthesis/counterevidence and each declared intended-domain evidence ID; case roots include owned/raw/comparison facts and syntheses.
- Evidence closure follows `linkedRecordIds` **transitively**, validates every dependency's presence and stable ID, rejects cycles, and sorts by `recordId` for deterministic content addressing. This protects the entire reachable evidence chain against same-ID rewriting (claim, limitations, source fields or linked descendants) while preserving frozen Gate-2 evidence under the inherited Gate-2 source pins.
- Terminal acceptance requires matching content hashes from **externally accepted immutable review records**, which must be computed from the complete evidence index at original independent review. No digest can prove reviewer independence when the caller supplies a self-authored trusted map.

**Executed synthetic fixtures:** Modify an accepted direct synthesis's `claim` or `doesNotEstablish` → reject. Modify the same fields on a transitively linked synthesis → reject. Reorder independent evidence records in dependency-topological order → accept. A valid versioned terminal reopen can introduce a *new*, separately named synthesis without changing the old accepted record, but needs fresh scope/content pins before handing off again. Existing silent rationale/relation changes and history-reopen checks remain intact.

### G4-R194-08 — Normalize review-only temporary component handles

- `gate4RelationClaimIdentity` maps each handle to its `{ownerRawCandidateId,definition,scope,operation}` and substitutes tagged, normalized component meaning where the handle is used in the direction's targets. The normalized `components` multiset is deterministically sorted.
- **SPLIT** target order is not mathematically significant; its component targets are sorted by normalized meaning. **COMBO** target order *is* significant and is retained, including distinctions between raw-candidate inputs and local component targets.
- Literal handle names remain unchanged in the stored source records, with the established owner/bijection/full-definition checks. Normalization changes only the *claim-identity fingerprint*: it is neither a canonical Gate-5 object nor a mathematical proof of equivalence between differently described operations.

**Executed synthetic fixtures:** A second SPLIT record with the same mathematical claim but consistently renamed component handles now fails the one-authoritative-record check. A genuinely changed component operation still produces a distinct claim; distinct ordered COMBO operations remain distinct.

### Explicit release and trust boundary

The review-only scaffold remains **661 PENDING / 0 adjudications / 0 relation proposals**. All changes are confined to the existing five draft-PR files. Gate 0–3 and the accepted Gate 4 contract are unchanged. External accepted-case, relation, scope, and history pins must be independently authenticated; test-produced hashes are not governance certificates. Future validation after reopening also needs the independently accepted *historical* evidence/decision artifacts to establish that old evidence was not rewritten as part of the reopening process.

**DO NOT MERGE** without a fresh exact-head independent implementation PASS. Calibration, mass adjudication, Gate 5 and later gates remain locked.


## PR #194 fifth independent review — historical acceptance and within-SPLIT distinctness

**Rejected exact head:** `e3298d14766e2307d242ae9dcecba97d6371fc8e`. Findings **G4-R194-09** and **G4-R194-10** are addressed in the executable implementation only. This is a builder repair, **not independent acceptance**.

### G4-R194-09 — Historical supplemental evidence cannot be overwritten after reopening

The validator accepts an externally sourced `trustedHistoricalEvidenceManifests` registry keyed by prior terminal accepted commit version. Each manifest contains an exact `acceptedVersion`, a frozen list of **all previously accepted Gate-4 supplemental evidence record IDs** (including records cited by status events or not currently referenced), and a SHA-256 of the complete canonical content records, ordered by ID. For every `REVIEWED_FOR_HANDOFF → CHALLENGED / PROPOSED / EVIDENCE_HOLD` transition, the validator checks the accepted historical manifest *regardless of current case status*. Therefore a legitimate reopen can add newly named evidence, but may not silently modify or delete any previously accepted ID.

The original accepted historical status-history prefix hash and terminal case/relation content hashes remain separate requirements. This is an **append-only evidence-ID contract**, not merely status-history append-only enforcement. No immutable-trust claim is made from mutable bundle contents alone: reviewers or callers must verify that the manifest originated from a separately independently accepted original-version artifact, complete at that version. A developer-produced test manifest only simulates that trust root.

**Regression evidence:** Previously accepted synthesis claim rewritten while CHALLENGED rejects; deleting or changing an **accepted but not currently referenced** archived supplemental record rejects; missing external prior-evidence manifest rejects; a one-record manifest contradicting the accepted full-manifest digest rejects. A versioned reopen and subsequent reapproval can cite a **new** supplemental record with a fresh ID when its independent new scope/case certificates are supplied; the old accepted records are unchanged.

### G4-R194-10 — SPLIT's component count represents distinct mathematical descriptions

Within each `SPLIT`, each temporary component now has a distinct canonical `componentMeaning` (owner candidate ID, definition, scope, operation). Distinct arbitrary handle strings **cannot** make two identical component descriptions count as a two-way SPLIT. The existing handle-owner and exact definitions tests remain, and the earlier alpha-renaming invariance across *different* proposed hypotheses continues to work. A genuine different component operation is allowed. This structural check is **not** proof of mathematical nonequivalence; similarly phrased but genuinely different or differently phrased but equivalent components remain for independent mathematical review.

### Security and release boundary

This implementation checks externally pinned historical evidence manifests when reopening. A trusted manifest must cover **every accepted prior supplemental record**, not merely records cited by currently active cases. A caller capable of forging the trusted registry is outside the validator's security boundary; such registries must be independently approved, versioned, immutable and separately authenticated in the eventual accepted governance procedure. The provisional initial scaffold contains 661 `PENDING` cases, zero adjudications and zero proposed relations. Gates 0–3 and the previously accepted Gate 4 prose contract are not edited.

**DO NOT MERGE** until the newly amended exact head receives independent executable-contract PASS. Independent calibration design/held-out evaluation, 661 candidate treatments and Gates 5–15 stay locked.
