// Gate 3 immutability anchor for the independently accepted Gate-2 ore.
//
// This is intentionally a constant fingerprint, not a live derivation. The
// validator recomputes the same canonical JSON payload from the current branch
// and must match this accepted fingerprint exactly. Any mutation underneath
// Gate 3 therefore fails CI even when IDs/names happen to remain unchanged.

export const ARSENAL_GATE2_ACCEPTED_SNAPSHOT_V1 = Object.freeze({
  acceptedGate2Sha: "ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7",
  preservedByMergeSha: "7600dd377192aafe6ca777636d94474736ea4e4f",
  serialization: "JSON.stringify({rawCandidates,rawEvidence,officialRouteIndex,officialRouteMeta,sourceClosureRule,sourceClosureZones,sourceClosureReviewedItems,sourceClosureMeta})",
  sha256: "PENDING-CALIBRATION-REPAIR-DIGEST",
});
