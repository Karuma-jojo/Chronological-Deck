import {
  canonicalArsenalSource,
  isOfficialSmmcCanonicalSource,
} from "./canonical-sources-v1.mjs";

// SMMC Arsenal Gate-1 evidence contract.
//
// This module freezes research-record admissibility only.
// It does NOT freeze the future Arsenal ontology. ontologyType must remain null
// through Gate 2 raw harvesting.

export const ARSENAL_EVIDENCE_BASES = Object.freeze([
  "SOURCE_FACT",
  "SOURCE_LEAD",
  "PROJECT_DERIVED",
  "LEARNER_EMPIRICAL",
  "PROJECT_SYNTHESIS",
]);

export const ARSENAL_RECORD_CHANNELS = Object.freeze([
  "BATTLE",
  "DISCOVERY",
  "TRANSFER",
  "NONE",
]);

export const ARSENAL_CLAIM_KINDS = Object.freeze([
  "SOURCE_TERMINOLOGY",
  "HISTORICAL_OCCURRENCE",
  "HISTORICAL_COOCCURRENCE",
  "DISCOVERY_HEURISTIC",
  "PROOF_STRUCTURE",
  "PREREQUISITE_MATHEMATICS",
  "TRAINING_DESIGN",
  "LEARNER_PERFORMANCE",
  "RETENTION",
  "INDEX_SIGNAL",
  "CORPUS_MEASUREMENT",
  "ONTOLOGY_PROPOSAL",
  "REPRESENTATION_PROPOSAL",
  "RELATION_PROPOSAL",
  "OTHER",
]);

export const ARSENAL_VERIFICATION_STATUSES = Object.freeze([
  "VERIFIED",
  "INDEX_LEAD",
  "UNVERIFIED_SOURCE_LEAD",
  "SYNTHESIS_PROPOSAL",
]);

export const ARSENAL_BASIS_STATUS_ADMISSIBILITY = Object.freeze({
  SOURCE_FACT: Object.freeze(["VERIFIED"]),
  SOURCE_LEAD: Object.freeze(["UNVERIFIED_SOURCE_LEAD"]),
  PROJECT_DERIVED: Object.freeze(["VERIFIED", "INDEX_LEAD"]),
  LEARNER_EMPIRICAL: Object.freeze(["VERIFIED"]),
  PROJECT_SYNTHESIS: Object.freeze(["SYNTHESIS_PROPOSAL"]),
});

// Allow-list. Every combination not listed here is forbidden.
export const ARSENAL_EVIDENCE_ADMISSIBILITY = Object.freeze({
  SOURCE_FACT: Object.freeze({
    BATTLE: Object.freeze([
      "HISTORICAL_OCCURRENCE",
      "HISTORICAL_COOCCURRENCE",
    ]),
    DISCOVERY: Object.freeze([
      "DISCOVERY_HEURISTIC",
    ]),
    TRANSFER: Object.freeze([]),
    NONE: Object.freeze([
      "SOURCE_TERMINOLOGY",
      "PROOF_STRUCTURE",
      "PREREQUISITE_MATHEMATICS",
      "TRAINING_DESIGN",
      "OTHER",
    ]),
  }),
  SOURCE_LEAD: Object.freeze({
    BATTLE: Object.freeze([]),
    DISCOVERY: Object.freeze([]),
    TRANSFER: Object.freeze([]),
    NONE: Object.freeze([
      "SOURCE_TERMINOLOGY",
      "HISTORICAL_OCCURRENCE",
      "HISTORICAL_COOCCURRENCE",
      "DISCOVERY_HEURISTIC",
      "PROOF_STRUCTURE",
      "PREREQUISITE_MATHEMATICS",
      "TRAINING_DESIGN",
      "OTHER",
    ]),
  }),
  PROJECT_DERIVED: Object.freeze({
    BATTLE: Object.freeze([]),
    DISCOVERY: Object.freeze([]),
    TRANSFER: Object.freeze([]),
    NONE: Object.freeze([
      "INDEX_SIGNAL",
      "CORPUS_MEASUREMENT",
      "HISTORICAL_COOCCURRENCE",
      "OTHER",
    ]),
  }),
  LEARNER_EMPIRICAL: Object.freeze({
    BATTLE: Object.freeze([]),
    DISCOVERY: Object.freeze([
      "LEARNER_PERFORMANCE",
    ]),
    TRANSFER: Object.freeze([
      "LEARNER_PERFORMANCE",
    ]),
    NONE: Object.freeze([
      "LEARNER_PERFORMANCE",
      "RETENTION",
      "OTHER",
    ]),
  }),
  PROJECT_SYNTHESIS: Object.freeze({
    BATTLE: Object.freeze([]),
    DISCOVERY: Object.freeze([]),
    TRANSFER: Object.freeze([]),
    NONE: Object.freeze([
      "PREREQUISITE_MATHEMATICS",
      "TRAINING_DESIGN",
      "ONTOLOGY_PROPOSAL",
      "REPRESENTATION_PROPOSAL",
      "RELATION_PROPOSAL",
      "OTHER",
    ]),
  }),
});

// FRESH means first substantive attempt on this exact task with no prior route/solution,
 // material-hint, method-cue, or rehearsal exposure. Statement-only prior exposure may
 // still be compatible with FRESH when Gate-0 exposure semantics still classify the
 // problem as transfer-eligible. SAME_TASK_DELAYED is a reattempt/reconstruction and
 // therefore retention, never Transfer.
export const ARSENAL_TASK_FRESHNESS = Object.freeze([
  "FRESH",
  "SAME_TASK_DELAYED",
  "PREVIOUSLY_SEEN",
  "UNKNOWN",
]);

export const ARSENAL_METHOD_PROMPTING = Object.freeze([
  "UNPROMPTED",
  "METHOD_CUED",
  "ROUTE_CUED",
  "UNKNOWN",
]);

export const ARSENAL_ROUTE_EXPOSURE = Object.freeze([
  "UNSEEN",
  "SEEN",
  "UNKNOWN",
]);

export const ARSENAL_SOURCE_LOCATOR_KINDS = Object.freeze([
  "PDF",
  "REPO",
  "WEB",
]);

export function isAdmissibleEvidenceCombination(evidenceBasis, recordChannel, claimKind) {
  return Boolean(
    ARSENAL_EVIDENCE_ADMISSIBILITY[evidenceBasis]?.[recordChannel]?.includes(claimKind)
  );
}

// sourceLocator grammar:
//
// PDF:
// {
//   kind: "PDF",
//   pdfPage: <1-based physical page index in the exact PDF artifact>,
//   printedPage: <optional printed page label, string>,
//   section: <optional chapter/section/problem heading>,
//   anchor: <optional short identifying phrase/label>
// }
//
// REPO:
// {
//   kind: "REPO",
//   path: <repository-relative path>,
//   lineStart: <1-based integer>,
//   lineEnd: <1-based integer >= lineStart>
// }
// sourceVersionOrCommit must separately identify the exact commit.
//
// WEB:
// {
//   kind: "WEB",
//   url: <https URL>,
//   heading: <optional page heading/fragment>,
//   retrievedAt: <optional explicit-timezone ISO timestamp>
// }
//
// "page 3" without kind/pdfPage is invalid.

const explicitTimezoneStamp = value =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
  Number.isFinite(Date.parse(value));

export function validateSourceLocator(locator) {
  if (!locator || typeof locator !== "object" || Array.isArray(locator)) {
    throw new Error("sourceLocator must be a structured object.");
  }

  if (locator.kind === "PDF") {
    if (!Number.isInteger(locator.pdfPage) || locator.pdfPage < 1) {
      throw new Error("PDF sourceLocator.pdfPage must be a 1-based positive integer.");
    }
    if (locator.printedPage !== undefined && locator.printedPage !== null && typeof locator.printedPage !== "string") {
      throw new Error("PDF printedPage must be a string when present.");
    }
    if (locator.section !== undefined && locator.section !== null && typeof locator.section !== "string") {
      throw new Error("PDF section must be a string when present.");
    }
    if (locator.anchor !== undefined && locator.anchor !== null && typeof locator.anchor !== "string") {
      throw new Error("PDF anchor must be a string when present.");
    }
    return true;
  }

  if (locator.kind === "REPO") {
    if (typeof locator.path !== "string" || !locator.path || locator.path.startsWith("/")) {
      throw new Error("REPO sourceLocator.path must be a non-empty repository-relative path.");
    }
    if (!Number.isInteger(locator.lineStart) || locator.lineStart < 1) {
      throw new Error("REPO lineStart must be a 1-based positive integer.");
    }
    if (!Number.isInteger(locator.lineEnd) || locator.lineEnd < locator.lineStart) {
      throw new Error("REPO lineEnd must be an integer >= lineStart.");
    }
    return true;
  }

  if (locator.kind === "WEB") {
    if (typeof locator.url !== "string" || !locator.url.startsWith("https://")) {
      throw new Error("WEB sourceLocator.url must be an https URL.");
    }
    if (locator.heading !== undefined && locator.heading !== null && typeof locator.heading !== "string") {
      throw new Error("WEB heading must be a string when present.");
    }
    if (locator.retrievedAt !== undefined && locator.retrievedAt !== null && !explicitTimezoneStamp(locator.retrievedAt)) {
      throw new Error("WEB retrievedAt must be an explicit-timezone ISO timestamp when present.");
    }
    return true;
  }

  throw new Error("Unknown sourceLocator kind.");
}

export function validateGate1EvidenceRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Evidence record must be an object.");
  }
  if (!ARSENAL_EVIDENCE_BASES.includes(record.evidenceBasis)) {
    throw new Error("Unknown evidenceBasis.");
  }
  if (!ARSENAL_RECORD_CHANNELS.includes(record.recordChannel)) {
    throw new Error("Unknown recordChannel.");
  }
  if (!ARSENAL_CLAIM_KINDS.includes(record.claimKind)) {
    throw new Error("Unknown claimKind.");
  }
  if (!ARSENAL_VERIFICATION_STATUSES.includes(record.verificationStatus)) {
    throw new Error("Unknown verificationStatus.");
  }
  if (!ARSENAL_BASIS_STATUS_ADMISSIBILITY[record.evidenceBasis]?.includes(record.verificationStatus)) {
    throw new Error("Forbidden evidenceBasis × verificationStatus combination.");
  }
  if (!isAdmissibleEvidenceCombination(record.evidenceBasis, record.recordChannel, record.claimKind)) {
    throw new Error("Forbidden evidenceBasis × recordChannel × claimKind combination.");
  }
  if (record.ontologyType !== null) {
    throw new Error("ontologyType must remain null through Gate 2.");
  }

  if (record.evidenceBasis === "SOURCE_LEAD" && record.recordChannel !== "NONE") {
    throw new Error("SOURCE_LEAD must use recordChannel NONE.");
  }

  if (
    record.recordChannel === "BATTLE" &&
    (record.evidenceBasis !== "SOURCE_FACT" || !isOfficialSmmcCanonicalSource(record.sourceId))
  ) {
    throw new Error("BATTLE records require a registered frozen official SMMC SOURCE_FACT source.");
  }

  const needsSourceLocator = ["SOURCE_FACT", "SOURCE_LEAD", "PROJECT_DERIVED"].includes(record.evidenceBasis);
  if (needsSourceLocator && (record.sourceLocator === null || record.sourceLocator === undefined)) {
    throw new Error("Source-backed/project-derived records require a structured sourceLocator.");
  }
  if (record.sourceLocator !== null && record.sourceLocator !== undefined) {
    validateSourceLocator(record.sourceLocator);
  }

  if (["SOURCE_FACT", "SOURCE_LEAD"].includes(record.evidenceBasis)) {
    if (typeof record.sourceId !== "string" || !record.sourceId) {
      throw new Error("SOURCE_FACT/SOURCE_LEAD records require sourceId.");
    }
  }

  if (record.evidenceBasis === "SOURCE_FACT") {
    const canonical = canonicalArsenalSource(record.sourceId);
    if (!canonical) {
      throw new Error("SOURCE_FACT sourceId is not present in the machine-readable canonical source registry.");
    }
    if (record.sourceArtifactSha256 !== canonical.sha256) {
      throw new Error("SOURCE_FACT sourceArtifactSha256 does not match the canonical source registry.");
    }
    if (record.sourceLocator?.kind !== "PDF") {
      throw new Error("Canonical SOURCE_FACT records require a PDF sourceLocator.");
    }
    if (record.sourceLocator.pdfPage > canonical.pages) {
      throw new Error("SOURCE_FACT PDF locator exceeds the canonical artifact page count.");
    }
  }

  if (record.evidenceBasis === "PROJECT_DERIVED") {
    if (typeof record.sourceVersionOrCommit !== "string" || !record.sourceVersionOrCommit) {
      throw new Error("PROJECT_DERIVED records require sourceVersionOrCommit.");
    }
  }

  if (
    record.evidenceBasis === "SOURCE_FACT" &&
    record.recordChannel === "BATTLE" &&
    record.claimKind === "HISTORICAL_OCCURRENCE"
  ) {
    if (!Array.isArray(record.historicalProblemIds) || record.historicalProblemIds.length !== 1) {
      throw new Error("Verified historical occurrence requires exactly one historicalProblemId.");
    }
  }

  if (
    record.evidenceBasis === "SOURCE_FACT" &&
    record.recordChannel === "BATTLE" &&
    record.claimKind === "HISTORICAL_COOCCURRENCE"
  ) {
    if (!Array.isArray(record.linkedRecordIds) || record.linkedRecordIds.length !== 2) {
      throw new Error("Battle co-occurrence requires exactly two linked occurrence records.");
    }
    if (new Set(record.linkedRecordIds).size !== 2) {
      throw new Error("Battle co-occurrence linked occurrence IDs must be distinct.");
    }
    if (!Array.isArray(record.historicalProblemIds) || record.historicalProblemIds.length !== 1) {
      throw new Error("Battle co-occurrence requires exactly one shared historicalProblemId.");
    }
  }

  if (record.recordChannel === "TRANSFER") {
    if (record.evidenceBasis !== "LEARNER_EMPIRICAL" || record.claimKind !== "LEARNER_PERFORMANCE") {
      throw new Error("TRANSFER requires LEARNER_EMPIRICAL + LEARNER_PERFORMANCE.");
    }
    if (record.learnerContext?.taskFreshness !== "FRESH") {
      throw new Error("TRANSFER requires a fresh task.");
    }
    if (record.learnerContext?.methodPrompting !== "UNPROMPTED") {
      throw new Error("TRANSFER requires unprompted method selection.");
    }
    if (record.learnerContext?.routeExposure !== "UNSEEN") {
      throw new Error("TRANSFER requires unseen route/solution exposure.");
    }
  }

  if (record.recordChannel === "DISCOVERY" && record.evidenceBasis === "LEARNER_EMPIRICAL") {
    if (record.learnerContext?.routeExposure !== "UNSEEN") {
      throw new Error("Learner DISCOVERY evidence requires the route to be unseen.");
    }
  }

  if (record.evidenceBasis === "LEARNER_EMPIRICAL") {
    if (!Array.isArray(record.learnerAttemptIds) || record.learnerAttemptIds.length < 1) {
      throw new Error("LEARNER_EMPIRICAL records require learnerAttemptIds.");
    }
  }

  if (record.claimKind === "RETENTION") {
    if (record.recordChannel !== "NONE") {
      throw new Error("RETENTION is not Battle/Discovery/Transfer evidence.");
    }
    if (
      record.evidenceBasis === "LEARNER_EMPIRICAL" &&
      record.learnerContext?.taskFreshness !== "SAME_TASK_DELAYED"
    ) {
      throw new Error("Learner RETENTION uses SAME_TASK_DELAYED freshness.");
    }
  }

  return true;
}

export function validateGate1EvidenceCollection(records) {
  if (!Array.isArray(records)) throw new Error("Evidence collection must be an array.");
  const byId = new Map();
  for (const record of records) {
    validateGate1EvidenceRecord(record);
    if (typeof record.recordId !== "string" || !record.recordId) {
      throw new Error("Every evidence record requires recordId.");
    }
    if (byId.has(record.recordId)) throw new Error("Duplicate evidence recordId.");
    byId.set(record.recordId, record);
  }

  for (const record of records) {
    if (
      record.evidenceBasis === "SOURCE_FACT" &&
      record.recordChannel === "BATTLE" &&
      record.claimKind === "HISTORICAL_COOCCURRENCE"
    ) {
      const sharedProblemId = record.historicalProblemIds[0];
      const linkedCandidates = new Set();
      for (const linkedId of record.linkedRecordIds) {
        const linked = byId.get(linkedId);
        if (!linked) throw new Error("Battle co-occurrence links unknown record.");
        if (
          linked.evidenceBasis !== "SOURCE_FACT" ||
          linked.recordChannel !== "BATTLE" ||
          linked.claimKind !== "HISTORICAL_OCCURRENCE" ||
          linked.verificationStatus !== "VERIFIED"
        ) {
          throw new Error("Battle co-occurrence may link only VERIFIED official occurrence records.");
        }
        if (
          !Array.isArray(linked.historicalProblemIds) ||
          linked.historicalProblemIds.length !== 1 ||
          linked.historicalProblemIds[0] !== sharedProblemId
        ) {
          throw new Error("Battle co-occurrence linked occurrences must share the same historical problem.");
        }
        if (typeof linked.candidateId !== "string" || !linked.candidateId) {
          throw new Error("Battle occurrence records require candidateId for co-occurrence validation.");
        }
        linkedCandidates.add(linked.candidateId);
      }
      if (linkedCandidates.size !== 2) {
        throw new Error("Battle co-occurrence requires two distinct candidate/move IDs.");
      }
    }
  }

  return true;
}
