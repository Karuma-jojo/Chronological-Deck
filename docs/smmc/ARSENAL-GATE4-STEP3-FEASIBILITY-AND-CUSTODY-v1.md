# Gate 4 Step 3 — joint feasibility and custody handoff

**Status: engineering feasibility FOUND; independent acceptance and custody NOT COMPLETE. No selection authorization.**

The proposed Step 2 register can satisfy all 20 real investigation kinds together with every fixed visible and held-out mechanical requirement, whole-cluster allocation, cross-owner exposure separation and the existing resource caps. The seed-free search found existence in **20 nodes**, below the unchanged 200,000-node cap. It outputs no witness membership, candidate choices, hidden counts, seeds, manifests, certificates or signatures. The result is recorded in `ARSENAL-GATE4-STEP3-FEASIBILITY-RESULT-v1.json`.

This is a builder-run engineering diagnostic, not the independently controlled custodian run or authenticated exact-head acceptance required by the accepted protocol. The ephemeral search witness is discarded; it is not a selected cohort and must never be reused as one. Passing this check does not guarantee that a later seeded greedy draw succeeds. A seeded failure still requires STOP, with no reseeding, rescue picks or adaptive option substitution.

## Fixed inputs and scope

| Item | Exact identity |
| --- | --- |
| Merged sampler implementation | `e9882b895d7adde9b855c93687883f6e1216214c`; sampler `G4-CAL-SAMPLER-v0.3.3` |
| Sampler file SHA-256 | `6ebbb650f1dd90934d39578f9ae46fe615f30c0f875d7823a2e41932992bc9fb` |
| Step 2 research head | `a542a312f3b799b06b9e23b3863ffc50f4ae84be` (PR #196, still a draft proposal when this handoff was authored) |
| Register file SHA-256 | `3f12751c61ccf42dc4aa0a3b4481aca4c9762f30c6ea41e78b0623cbff5fbeac` |
| Domain-separated register content digest | `dc969b78ea183cfdfbb9adabbb9acd9ad208cb9187c73a414b219df2f8ab9e23` |
| Frozen pool | 661 raw candidates; 1,739,956 canonical bytes; SHA-256 `d404cf6b3b4810df7843881a9ffb27ea106753db9e753966ef0a6000a671ca5a` |
| Source-first register | 20 kinds, 27 alternative prospective groups, 47 distinct raw candidate IDs |
| Visible limits | At most 48 whole clusters and 160 raw IDs |
| Held-out limits | At most 16 whole clusters and 64 raw IDs |
| Giant component limit | 64 raw IDs |

These fingerprints identify the proposal. They are **not authenticated approval pins**. The checker verifies predecessor Git blobs, exact sampler bytes, register bytes/content digest, frozen pool, all mandatory investigation kinds and candidate-owned evidence references. It deliberately never calls `certifyRealProbes`, `allocate`, `sealHidden` or any signing/randomness function.

No book, frozen source/evidence row, accepted contract, sampler API, production requirement, Tribunal ledger or candidate disposition changes in this step. The separate source/eligibility AI review remains scoped to its original Step 2 head. This new checker and handoff have no independent acceptance merely because their parent research was reviewed.

## What the finite search establishes

For each cluster there are three possible states: unused, visible or held out. Each investigation requires all raw participants of at least one registered option on the visible side, expanded to their entire normalized-name clusters. Options remain research comparison groups; they create no ontology identity edges. The other predicates require all visible and held-out labels, disjoint clusters, no cross-side evidence-exposure edge and the unchanged cluster/ID caps.

At each search state the checker chooses the unmet predicate with the fewest currently feasible alternatives. A label contributes single-cluster alternatives; a real investigation contributes complete multi-cluster alternatives. It tries maximum newly covered predicates first, then lexical cluster order, and backtracks. A completion is possible only after every predicate is satisfied. Each extension adds clusters, so the finite search is exhaustive if it finishes without reaching the cap. Reaching the cap is STOP, never an infeasibility claim. Existence establishes the availability of a prospective investigation, not that its eventual mathematical verdict is MERGE, SPLIT, HOLD or any other outcome.

The positive search result is stronger than the existing mechanical-only feasibility check: real option conjunctions participate directly in the same search as hidden exclusion and visible coverage. No private membership or selected-side size appears in the public result.

## Reproduction and validation

From a checkout containing the unchanged Step 2 files and this proposal:

```sh
node scripts/validate-smmc-gate4-real-feasibility-v1.mjs
node scripts/gate4-real-option-feasibility-v1.mjs
```

The checker takes no seed, private key, output-manifest or selection arguments. It prints only the public existence report. Its synthetic validation independently enumerates all 729 unused/visible/hidden assignments for each of 240 artificial six-cluster models, and checks the search result against that final-predicate oracle. The corpus contains 30 feasible and 210 infeasible models, real-option conjunctions and alternatives, exposure conflicts, weighted clusters and tight caps. Additional controls cover mechanically feasible but real-option-infeasible inputs, required backtracking, giant components, cap STOP, foreign owners and argument rejection. Reordering input clusters, requirements and alternatives preserves the result and node count.

The dedicated workflow runs those synthetic checks and compares the full public real-input report against the committed result. CI is engineering evidence and cannot act as an independent custodian or authenticate an external approval.

## Required roles and records before a seed exists

The following are existing protocol requirements, not new defenses introduced by this handoff. Their authority is `ARSENAL-GATE4-CALIBRATION-PROTOCOL-v0.3-DRAFT.md` sections 4–7 and its v0.3 / v0.3.1 real-option and archive provisions.

| Role / record | Required concrete evidence | Current state |
| --- | --- | --- |
| Source/eligibility accepting reviewer | Independently authenticated principal and authority; exact PR/head/base; full research/register file hashes and content digest; result and source/ownership rationale; reviewed evidence inventory and hash | Separate AI technical PASS exists; external authentication is pending |
| Joint-feasibility accepting reviewer | Review this exact checker and its complete predicates, oracle controls and fixed inputs; authenticate exact reviewed head and result | Pending; builder diagnostic is not acceptance |
| Public-seed reviewer | Authorized independent principal, distinct from builder; accepted protocol/register/feasibility records obtained before generating any seed | Unassigned; no seed generated |
| Private challenge custodian | A different authorized private reviewer/custodian, using an isolated machine and storage outside builder control; accepted Ed25519 signer-ID/key binding; private access policy | Unassigned; no production key or private data created here |
| Governance verifier / immutable archive | Independently controlled approval provenance, signer authorization, original signed receipt bytes and chronology; trust pins obtained outside the challenged bundle | Not established |
| Integration / freeze | Reviewed exact source heads integrated and verified; post-merge CI and preserved source-tree identity; explicitly recorded accepted protocol head | Step 2/3 proposals are not integrated/frozen by this handoff |

A second AI process sharing the builder workspace does not satisfy the isolated-custodian requirement. A builder-authored PR body quoting a review, a successful CI run or a digest computed here does not authenticate reviewer acceptance. No native approval, custody identity, trusted key or archive chronology is invented in this proposal.

The accepting parties can use the following **unfilled record outline**. It is a checklist, not a new receipt schema or a substitute for the protocol's authenticated immutable record:

```json
{
  "status": "UNFILLED_NOT_AN_ACCEPTANCE",
  "reviewerPrincipal": null,
  "roleAndAuthority": null,
  "nativeApprovalUrlOrVerifiedSignature": null,
  "reviewedPrAndHeadSha": null,
  "priorAcceptedBaseSha": null,
  "acceptedProtocolHeadSha": null,
  "reviewedFileHashesAndRegistryDigest": null,
  "reviewedManifestPathAndHash": null,
  "completeEvidenceIdInventoryHash": null,
  "scopeAndEvidenceReferences": null,
  "independentFeasibilityResultAndRunContext": null,
  "result": null,
  "immutableArchiveReferenceAndChronology": null
}
```

## Custodian execution sequence

1. Obtain independently authenticated exact-head approval records, merged/frozen source identities and original artifacts from their accepted locations. Verify authority and independence of the public reviewer, private custodian and governance archive. Pin the custodian signer-ID/Ed25519 public key through that external process. Do not derive authority from the proposed register's own digest.
2. Before either real seed exists, the independent custodian repeats the seed-free joint check in its independently controlled environment. Publish only feasibility, nodes and the withheld-witness flag, with an authenticated record binding the checked source identities and execution context. No witness IDs or per-ID exclusions are released. The independent reviewer accepts the complete proof scope and exact checker head; failure or the 200,000-node cap is STOP.
3. Only after all pre-seed requirements pass, the independent public reviewer generates and commits a public 32-byte CSPRNG seed. The different private custodian independently generates a private 32-byte seed and a separate 32-byte commitment nonce. Encode seeds/nonce as exactly 64 lowercase hexadecimal characters and keep the private values outside builder-controlled systems. Public and private seeds must differ. No values are supplied or generated by this handoff.
4. The custodian authenticates the register acceptance record before passing its accepted content digest to `certifyRealProbes`. Construct the fixed `requirements(inv)` plus the returned certificate; run the unchanged production `allocate` once. Any unsupported option, coverage conflict, cap failure or other STOP ends that attempt. Existence of another theoretical allocation does not authorize another seed or rescue picks.
5. Keep `hiddenPrivate`, its complete seed and membership, and the nonce under private custody. Produce only the public visible manifest and `sealHidden(hiddenPrivate, nonce)` commitment for publication. Do not disclose hidden counts, witness membership, excluded IDs or search traces.
6. Construct the receipt body with `hiddenPrecommitmentBody(commitment, visibleManifest, req, {signerId, protocolHeadSha, issuedAtUtc})`, using the exact independently accepted protocol head and canonical UTC timestamp. Sign `precommitmentSignaturePayload(body)` with the authorized Ed25519 private key; the complete archived object is `{body, signature}` with the signature encoded as base64. Archive its original bytes outside builder control before builder sees cases and before rubric freeze.
7. Through the independent archive and governance process, pin all four verifier trust inputs: `digest(PRECOMMIT_RECEIPT_DOMAIN, signedReceipt)`, signer-ID/public-key binding, `digest('SMMC-G4-CAL-VISIBLE-v1', visibleManifest)` and the accepted protocol-head SHA. The receipt also binds full deterministic requirements, pool/version and sealed commitment. A self-asserted timestamp and valid signature alone do not establish historical precommitment.
8. After visible mathematical work and rubric freeze, release the original private manifest and nonce according to the protocol. Reconstruct the certified requirements from the independently accepted register. Call `verifyHidden` with the original archive pins, signed receipt, trusted public keys, inventory, requirements and visible manifest; it must verify the signature, archive identity, original head/visible hash, complete replay and nonce opening. Any mismatch is STOP. If held-out results are used for tuning, the entire allocation is spent.

The archive must retain the complete original signed receipt, original public visible manifest, accepted register and approval artifacts, signer authorization and trusted chronology. Reveal-time values cannot retroactively become the archive trust roots. Keep private seed/nonce/manifest storage separate from the public archive until authorized release.

## Bounded stopping decision

The mathematical selection-capacity concern has a positive engineering answer for the current prospective register. No additional optional hardening or sampler redesign is proposed. The remaining pre-seed blockers are concrete: authenticated exact-head approvals, independently repeated/accepted joint feasibility, independent role/custody and archive establishment, and reviewed integration/freeze.

Step 3 can be accepted only after those records exist. It cannot currently be marked complete, and visible calibration cannot begin. Step 3 acceptance would authorize the specified selection process; it would not constitute Calibration PASS or Gate 4 graduation. All **661 cases remain PENDING**, with zero primary dispositions and zero relation hypotheses. Gate 4 remains open.
