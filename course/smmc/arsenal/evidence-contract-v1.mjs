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
  if (!isAdmissibleEvidenceCombination(record.evidenceBasis, record.recordChannel, record.claimKind)) {
    throw new Error("Forbidden evidenceBasis × recordChannel × claimKind combination.");
  }
  if (record.ontologyType !== null) {
    throw new Error("ontologyType must remain null through Gate 2.");
  }

  if (record.evidenceBasis === "SOURCE_FACT" && record.verificationStatus !== "VERIFIED") {
    throw new Error("SOURCE_FACT must be VERIFIED.");
  }
  if (
    record.evidenceBasis === "SOURCE_LEAD" &&
    (record.recordChannel !== "NONE" || record.verificationStatus !== "UNVERIFIED_SOURCE_LEAD")
  ) {
    throw new Error("SOURCE_LEAD must be NONE + UNVERIFIED_SOURCE_LEAD.");
  }
  if (
    record.evidenceBasis === "PROJECT_SYNTHESIS" &&
    record.verificationStatus !== "SYNTHESIS_PROPOSAL"
  ) {
    throw new Error("PROJECT_SYNTHESIS must be SYNTHESIS_PROPOSAL.");
  }

  if (record.sourceLocator !== null && record.sourceLocator !== undefined) {
    validateSourceLocator(record.sourceLocator);
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

  if (record.claimKind === "RETENTION" && record.recordChannel !== "NONE") {
    throw new Error("RETENTION is not Battle/Discovery/Transfer evidence.");
  }

  return true;
}
