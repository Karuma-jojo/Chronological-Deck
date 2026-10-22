// Gate 4 v0 scaffold: 661 structurally anchored PENDING cases.
// Generated from independently accepted Gate-2 ore and Gate-3 diagnostics.
// No candidate disposition, mathematical treatment, canonical ID or combo is authored.
import { ARSENAL_GATE2_RAW_CANDIDATES, ARSENAL_GATE2_RAW_EVIDENCE } from "./candidates-v0.mjs";
import { ARSENAL_GATE3_GRANULARITY_RECORDS } from "./granularity-ledger-v0.mjs";
import { createGate4PendingBundle, validateGate4Bundle } from "./tribunal-contract-v1.mjs";

export const ARSENAL_GATE4_INPUTS = Object.freeze({
  acceptedContractCommit: "604c3e9715024f3248e493eb2d2d73254d4ef318",
  contractMergeCommit: "442447b3cb3a24ee7cd7a5fa9051d94f7f8ef360",
  acceptedGate2Commit: "ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7",
  acceptedGate3Commit: "147e602b32c34ffa4dfe1401e39bc0484e35f948",
  acceptedGate2SemanticSha256: "f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f",
  status: "SCHEMA_REVIEW_CANDIDATE_NOT_CALIBRATED",
});

export const ARSENAL_GATE4_PENDING_BUNDLE = createGate4PendingBundle(
  ARSENAL_GATE2_RAW_CANDIDATES, ARSENAL_GATE3_GRANULARITY_RECORDS
);
export function validateGate4PendingScaffold() {
  return validateGate4Bundle(
    ARSENAL_GATE4_PENDING_BUNDLE, ARSENAL_GATE2_RAW_CANDIDATES,
    ARSENAL_GATE2_RAW_EVIDENCE, ARSENAL_GATE3_GRANULARITY_RECORDS
  );
}
