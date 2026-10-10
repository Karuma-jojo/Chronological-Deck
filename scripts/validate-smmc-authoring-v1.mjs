import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { FOUNDATION_MODULE, FOUNDATION_UNITS } from '../course/smmc/authoring/foundation-ladder.mjs';
import ledger from "../course/smmc/ledger.mjs";
import { SMMC_METHOD_TAGS, SMMC_SECONDARY_TAGS } from "../course/smmc/schema.mjs";
import {
  SMMC_CONTENT_MODULES,
  SMMC_METHOD_MODULES,
} from "../course/smmc/curriculum-v1.mjs";
import { SMMC_REQUIREMENTS_V1 } from "../course/smmc/requirements-v1.mjs";
import { SMMC_UNITS_V1 } from "../course/smmc/authoring/units-v1.mjs";
import { SMMC_PUBLIC_PROBLEMS_V1 } from "../course/smmc/authoring/public-problems-v1.mjs";
import { SMMC_EVALUATOR_V1 } from "../course/smmc/authoring/evaluator-v1.mjs";
import {
  emptySmmcState,
  markExposure,
  exposureClass,
  markPaperExposure,
  paperExposureClass,
  paperKeyForProblem,
  paperKeysForLedger,
  pristinePaperKeys,
  mergeSmmcState,
  validateSmmcState,
} from "../course/smmc/runtime/exposure.mjs";
import { unlockStatus } from "../course/smmc/runtime/unlock.mjs";
import { officialPaperUrl } from "../course/smmc/sources-v1.mjs";
import { SMMC_OFFICIAL_SOLUTION_SOURCES_V1 } from "../course/smmc/official-solution-sources-v1.mjs";
import {
  ARSENAL_CANONICAL_SOURCES_V1,
  canonicalArsenalSource,
  isOfficialSmmcCanonicalSource,
} from "../course/smmc/arsenal/canonical-sources-v1.mjs";
import {
  ARSENAL_EVIDENCE_ADMISSIBILITY,
  ARSENAL_BASIS_STATUS_ADMISSIBILITY,
  isAdmissibleEvidenceCombination,
  validateGate1EvidenceRecord,
  validateGate1EvidenceCollection,
  validateSourceLocator,
} from "../course/smmc/arsenal/evidence-contract-v1.mjs";
import {
  ARSENAL_GATE2_RAW_CANDIDATES,
  ARSENAL_GATE2_RAW_EVIDENCE,
  ARSENAL_GATE2_LEGACY_TAG_CANDIDATES,
  ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES,
  ARSENAL_GATE2_BOOK_CANDIDATES,
  ARSENAL_GATE2_HARVEST_META,
} from "../course/smmc/arsenal/candidates-v0.mjs";
import {
  ARSENAL_GATE2_DUPLICATE_NAME_GROUPS,
  ARSENAL_GATE2_ORPHAN_EVIDENCE_IDS,
  ARSENAL_GATE2_CANDIDATES_WITHOUT_EVIDENCE,
  ARSENAL_GATE2_UNKNOWN_CANONICAL_SOURCE_FACTS,
  ARSENAL_GATE2_RAW_AUDIT_META,
} from "../course/smmc/arsenal/raw-harvest-audit-v0.mjs";
import {
  ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX,
  ARSENAL_GATE2_OFFICIAL_ROUTE_META,
} from "../course/smmc/arsenal/official-solution-route-index-v0.mjs";
import {
  ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE,
} from "../course/smmc/arsenal/official-solution-candidates-v0.mjs";
import {
  ARSENAL_GATE2_SOURCE_CLOSURE_RULE,
  ARSENAL_GATE2_SOURCE_CLOSURE_ZONES,
  ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS,
  ARSENAL_GATE2_SOURCE_CLOSURE_HARVEST_IDS,
  ARSENAL_GATE2_SOURCE_CLOSURE_EXCLUSIONS,
  ARSENAL_GATE2_SOURCE_CLOSURE_META,
} from "../course/smmc/arsenal/source-closure-manifest-v0.mjs";
import {
  ARSENAL_GATE3_ACCEPTED_GATE2_SHA,
  ARSENAL_GATE3_GATE2_MERGE_SHA,
  ARSENAL_GATE3_EVIDENCE_MODE,
  ARSENAL_GATE3_CROSS_SCALE_MODE,
  ARSENAL_GATE3_DEFERRED_SCALE_BRANCHES,
  ARSENAL_GATE3_BOUNDARY_SEMANTICS,
  ARSENAL_GATE3_CONTRACT_META,
  validateGate3GranularityRecord,
} from "../course/smmc/arsenal/granularity-contract-v1.mjs";
import {
  ARSENAL_GATE3_GRANULARITY_RECORDS,
  ARSENAL_GATE3_GRANULARITY_META,
  ARSENAL_GATE3_MASS_PASS_META,
  buildGate3AssessedCalibration,
} from "../course/smmc/arsenal/granularity-ledger-v0.mjs";
import {
  ARSENAL_GATE3_MASS_CLASSIFIER_META,
  ARSENAL_GATE3_MASS_BUNDLE_DECISIONS,
  ARSENAL_GATE3_REJECTED_BUNDLE_SHORTCUT_IDS,
  surfaceGate3MassBundleCandidate,
  buildGate3MassAssessment,
  gate3ClaimBoundaryWitnesses,
} from "../course/smmc/arsenal/granularity-mass-pass-v1.mjs";
import { ARSENAL_GATE2_ACCEPTED_SNAPSHOT_V1 } from "../course/smmc/arsenal/gate2-accepted-snapshot-v1.mjs";
import {
  ARSENAL_GATE3_DUPLICATE_NAME_AUDIT,
  ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES,
  ARSENAL_GATE3_MASS_PASS_DISTRIBUTION,
  ARSENAL_GATE3_MASS_RULE_USAGE,
  ARSENAL_GATE3_BUNDLED_AUDIT,
  ARSENAL_GATE3_EXTREME_SCALE_AUDIT,
  ARSENAL_GATE3_LOW_CONFIDENCE_AUDIT,
  ARSENAL_GATE3_OFFICIAL_UNRESOLVED_AUDIT,
  ARSENAL_GATE3_REVIEW_SENTINELS,
  ARSENAL_GATE3_FALLBACK_AUDIT,
  ARSENAL_GATE3_MASS_AUDIT_META,
} from "../course/smmc/arsenal/granularity-audit-v1.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const problemIds = new Set(ledger.map(x => x.id));
const moduleIds = new Set([
  FOUNDATION_MODULE.id,
  ...SMMC_CONTENT_MODULES.map(x => x.id),
  ...SMMC_METHOD_MODULES.map(x => x.id),
]);
const unitIds = new Set(SMMC_UNITS_V1.map(x => x.id));

for (const problem of ledger) {
  const paper = officialPaperUrl(problem);
  expect(typeof paper === "string" && paper.startsWith("https://www.simonmarais.org/"), `Missing official paper URL for ${problem.id}`);
  expect(paper.endsWith("#page=2"), `Official paper should open on problem page for ${problem.id}`);
}

const solutionYears = Object.keys(SMMC_OFFICIAL_SOLUTION_SOURCES_V1).map(Number).sort((a,b)=>a-b);
expect(
  JSON.stringify(solutionYears) === JSON.stringify([2017,2018,2019,2020,2021,2022,2023,2024,2025]),
  "Official solution provenance must cover every 2017–2025 year exactly once."
);
for (const year of solutionYears) {
  const source = SMMC_OFFICIAL_SOLUTION_SOURCES_V1[year];
  expect(source && typeof source === "object", `Missing solution source row for ${year}`);
  expect(source.sourceId === `S0-SMMC-SOLUTION-${year}`, `Bad official solution sourceId for ${year}`);
  expect(/^https:\/\/www\.simonmarais\.org\//.test(source.yearPage), `Bad official year page for ${year}`);
  expect(/^https:\/\/www\.simonmarais\.org\/uploads\//.test(source.url), `Bad official solution URL for ${year}`);
  expect(Number.isInteger(source.pages) && source.pages > 0, `Bad official solution page count for ${year}`);
  expect(/^[0-9a-f]{64}$/.test(source.sha256), `Bad official solution SHA-256 for ${year}`);
  expect(typeof source.label === "string" && source.label.includes(String(year)), `Bad official solution label for ${year}`);
}

const canonicalSourceIds = Object.keys(ARSENAL_CANONICAL_SOURCES_V1);
expect(canonicalSourceIds.length === 36, "Expected 5 books + 22 official papers + 9 official solution artifacts in canonical source registry.");
for (const [sourceId, source] of Object.entries(ARSENAL_CANONICAL_SOURCES_V1)) {
  expect(source.sourceId === sourceId, `Canonical source key/id mismatch for ${sourceId}`);
  expect(Number.isInteger(source.pages) && source.pages > 0, `Canonical source missing positive page count: ${sourceId}`);
  expect(/^[0-9a-f]{64}$/.test(source.sha256), `Canonical source missing SHA-256: ${sourceId}`);
}
expect(Boolean(canonicalArsenalSource("S1-ZEITZ-2007-2E")), "Canonical Zeitz source missing from machine-readable registry.");
expect(Boolean(canonicalArsenalSource("S0-SMMC-PAPER-2021-A")), "Canonical 2021-A paper source missing from machine-readable registry.");
expect(Boolean(canonicalArsenalSource("S0-SMMC-SOLUTION-2021")), "Canonical 2021 solution source missing from machine-readable registry.");
expect(isOfficialSmmcCanonicalSource("S0-SMMC-PAPER-2021-A"), "Official paper source must be recognized as SMMC canonical.");
expect(isOfficialSmmcCanonicalSource("S0-SMMC-SOLUTION-2021"), "Official solution source must be recognized as SMMC canonical.");
expect(!isOfficialSmmcCanonicalSource("S1-ZEITZ-2007-2E"), "Book source must not be recognized as SMMC Battle provenance.");
expect(canonicalArsenalSource("S0-SMMC-NOT-REGISTERED") === null, "Invented S0 prefix source must not resolve canonically.");

// Gate-1 research-evidence contract: complete allow-list, freshness and locator semantics.
expect(
  isAdmissibleEvidenceCombination("SOURCE_FACT", "BATTLE", "HISTORICAL_OCCURRENCE"),
  "Verified official historical occurrence must be admissible."
);
expect(
  !isAdmissibleEvidenceCombination("SOURCE_FACT", "TRANSFER", "LEARNER_PERFORMANCE"),
  "SOURCE_FACT must never certify learner Transfer."
);
expect(
  !isAdmissibleEvidenceCombination("PROJECT_DERIVED", "DISCOVERY", "DISCOVERY_HEURISTIC"),
  "PROJECT_DERIVED must never become Discovery evidence."
);
expect(
  !isAdmissibleEvidenceCombination("LEARNER_EMPIRICAL", "BATTLE", "HISTORICAL_OCCURRENCE"),
  "Learner evidence must never become historical Battle evidence."
);
expect(
  !isAdmissibleEvidenceCombination("SOURCE_LEAD", "DISCOVERY", "DISCOVERY_HEURISTIC"),
  "Noncanonical source leads must remain channel NONE."
);
expect(
  ARSENAL_EVIDENCE_ADMISSIBILITY.PROJECT_DERIVED.NONE.includes("HISTORICAL_COOCCURRENCE"),
  "Raw project co-occurrence must live in PROJECT_DERIVED + NONE."
);
expect(
  JSON.stringify(ARSENAL_BASIS_STATUS_ADMISSIBILITY.SOURCE_FACT) === JSON.stringify(["VERIFIED"]),
  "SOURCE_FACT status matrix drifted."
);
expect(
  JSON.stringify(ARSENAL_BASIS_STATUS_ADMISSIBILITY.SOURCE_LEAD) === JSON.stringify(["UNVERIFIED_SOURCE_LEAD"]),
  "SOURCE_LEAD status matrix drifted."
);

validateSourceLocator({ kind: "PDF", pdfPage: 20, printedPage: "12", section: "1.2" });
validateSourceLocator({ kind: "REPO", path: "course/smmc/ledger-2021.mjs", lineStart: 10, lineEnd: 20 });
validateSourceLocator({ kind: "WEB", url: "https://www.simonmarais.org/2025.html", retrievedAt: "2026-10-01T09:39:00+05:30" });
let ambiguousLocatorRejected = false;
try {
  validateSourceLocator("page 3");
} catch {
  ambiguousLocatorRejected = true;
}
expect(ambiguousLocatorRejected, "Ambiguous scalar page locators must be rejected.");

const baseEvidence = {
  candidateId: "candidate-test",
  candidateName: "Test candidate",
  ontologyType: null,
  claim: "test",
  sourceTerminology: null,
  supports: [],
  doesNotEstablish: [],
  confidence: "test-only",
  researcherNote: "validator fixture",
};

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "source-battle-1",
  evidenceBasis: "SOURCE_FACT",
  recordChannel: "BATTLE",
  claimKind: "HISTORICAL_OCCURRENCE",
  verificationStatus: "VERIFIED",
  sourceId: "S0-SMMC-SOLUTION-2021",
  sourceVersionOrCommit: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  sourceLocator: { kind: "PDF", pdfPage: 8, section: "A1" },
  sourceArtifactSha256: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  historicalProblemIds: ["SMMC-2021-A1"],
  learnerAttemptIds: [],
  linkedRecordIds: [],
});

let wrongFrozenHashRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-frozen-hash",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "BATTLE",
    claimKind: "HISTORICAL_OCCURRENCE",
    verificationStatus: "VERIFIED",
    sourceId: "S0-SMMC-SOLUTION-2021",
    sourceVersionOrCommit: "bad-hash-fixture",
    sourceLocator: { kind: "PDF", pdfPage: 8, section: "A1" },
    sourceArtifactSha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    historicalProblemIds: ["SMMC-2021-A1"],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  wrongFrozenHashRejected = true;
}
expect(wrongFrozenHashRejected, "Solution-backed Battle hash must equal the frozen registry hash, not merely look like SHA-256.");

let outOfRangeSolutionPageRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-solution-page",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "BATTLE",
    claimKind: "HISTORICAL_OCCURRENCE",
    verificationStatus: "VERIFIED",
    sourceId: "S0-SMMC-SOLUTION-2021",
    sourceVersionOrCommit: "canonical",
    sourceLocator: { kind: "PDF", pdfPage: 999, section: "A1" },
    sourceArtifactSha256: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
    historicalProblemIds: ["SMMC-2021-A1"],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  outOfRangeSolutionPageRejected = true;
}
expect(outOfRangeSolutionPageRejected, "Solution-backed Battle PDF locator must stay inside the frozen artifact.");

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "canonical-book-discovery",
  evidenceBasis: "SOURCE_FACT",
  recordChannel: "DISCOVERY",
  claimKind: "DISCOVERY_HEURISTIC",
  verificationStatus: "VERIFIED",
  sourceId: "S1-ZEITZ-2007-2E",
  sourceVersionOrCommit: "2007-2E",
  sourceLocator: { kind: "PDF", pdfPage: 20, section: "1.2" },
  sourceArtifactSha256: "be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565",
  historicalProblemIds: [],
  learnerAttemptIds: [],
  linkedRecordIds: [],
});

let inventedBookSourceRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-invented-book-source",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "DISCOVERY",
    claimKind: "DISCOVERY_HEURISTIC",
    verificationStatus: "VERIFIED",
    sourceId: "S9-INVENTED-BOOK-2099",
    sourceVersionOrCommit: "invented",
    sourceLocator: { kind: "PDF", pdfPage: 1, section: "Invented" },
    sourceArtifactSha256: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    historicalProblemIds: [],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  inventedBookSourceRejected = true;
}
expect(inventedBookSourceRejected, "Invented book sourceId must not pass as canonical SOURCE_FACT.");

let inventedS0BattleRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-invented-s0-battle",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "BATTLE",
    claimKind: "HISTORICAL_OCCURRENCE",
    verificationStatus: "VERIFIED",
    sourceId: "S0-SMMC-NOT-REGISTERED",
    sourceVersionOrCommit: "invented",
    sourceLocator: { kind: "PDF", pdfPage: 1, section: "A1" },
    sourceArtifactSha256: "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    historicalProblemIds: ["SMMC-2021-A1"],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  inventedS0BattleRejected = true;
}
expect(inventedS0BattleRejected, "Invented S0-SMMC-* prefix must not bypass canonical Battle provenance.");

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "source-lead-1",
  evidenceBasis: "SOURCE_LEAD",
  recordChannel: "NONE",
  claimKind: "DISCOVERY_HEURISTIC",
  verificationStatus: "UNVERIFIED_SOURCE_LEAD",
  sourceId: "LEAD-BOOK-X",
  sourceVersionOrCommit: "unregistered-edition",
  sourceLocator: { kind: "PDF", pdfPage: 17, section: "Candidate chapter" },
  sourceArtifactSha256: null,
  historicalProblemIds: [],
  learnerAttemptIds: [],
  linkedRecordIds: [],
});

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "raw-cooccurrence-1",
  evidenceBasis: "PROJECT_DERIVED",
  recordChannel: "NONE",
  claimKind: "HISTORICAL_COOCCURRENCE",
  verificationStatus: "VERIFIED",
  sourceId: "S0-project-ledger",
  sourceVersionOrCommit: "761023355678bc9088236e79bc12e68aa5107cb6",
  sourceLocator: { kind: "REPO", path: "course/smmc/ledger.mjs", lineStart: 1, lineEnd: 20 },
  sourceArtifactSha256: null,
  historicalProblemIds: ["SMMC-2021-A1"],
  learnerAttemptIds: [],
  linkedRecordIds: [],
});

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "fresh-transfer-1",
  evidenceBasis: "LEARNER_EMPIRICAL",
  recordChannel: "TRANSFER",
  claimKind: "LEARNER_PERFORMANCE",
  verificationStatus: "VERIFIED",
  sourceId: null,
  sourceVersionOrCommit: null,
  sourceLocator: null,
  sourceArtifactSha256: null,
  historicalProblemIds: [],
  learnerAttemptIds: ["attempt-fresh-1"],
  linkedRecordIds: [],
  learnerContext: {
    taskFreshness: "FRESH",
    methodPrompting: "UNPROMPTED",
    routeExposure: "UNSEEN",
  },
});

validateGate1EvidenceRecord({
  ...baseEvidence,
  recordId: "delayed-retention-1",
  evidenceBasis: "LEARNER_EMPIRICAL",
  recordChannel: "NONE",
  claimKind: "RETENTION",
  verificationStatus: "VERIFIED",
  sourceId: null,
  sourceVersionOrCommit: null,
  sourceLocator: null,
  sourceArtifactSha256: null,
  historicalProblemIds: [],
  learnerAttemptIds: ["attempt-retention-1"],
  linkedRecordIds: [],
  learnerContext: {
    taskFreshness: "SAME_TASK_DELAYED",
    methodPrompting: "UNPROMPTED",
    routeExposure: "SEEN",
  },
});

let delayedTransferRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-delayed-transfer",
    evidenceBasis: "LEARNER_EMPIRICAL",
    recordChannel: "TRANSFER",
    claimKind: "LEARNER_PERFORMANCE",
    verificationStatus: "VERIFIED",
    sourceId: null,
    sourceVersionOrCommit: null,
    sourceLocator: null,
    sourceArtifactSha256: null,
    historicalProblemIds: [],
    learnerAttemptIds: ["attempt-delayed-1"],
    linkedRecordIds: [],
    learnerContext: {
      taskFreshness: "SAME_TASK_DELAYED",
      methodPrompting: "UNPROMPTED",
      routeExposure: "UNSEEN",
    },
  });
} catch {
  delayedTransferRejected = true;
}
expect(delayedTransferRejected, "Same-task delayed reconstruction must not count as Transfer.");

let sourceFactTransferRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-source-transfer",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "TRANSFER",
    claimKind: "LEARNER_PERFORMANCE",
    verificationStatus: "VERIFIED",
    sourceId: "S1-ZEITZ-2007-2E",
    sourceVersionOrCommit: "canonical",
    sourceLocator: { kind: "PDF", pdfPage: 20, section: "1.2" },
    sourceArtifactSha256: "be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565",
    historicalProblemIds: [],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  sourceFactTransferRejected = true;
}
expect(sourceFactTransferRejected, "SOURCE_FACT + TRANSFER must be rejected globally.");

let bookBattleRejected = false;
try {
  validateGate1EvidenceRecord({
    ...baseEvidence,
    recordId: "bad-book-battle",
    evidenceBasis: "SOURCE_FACT",
    recordChannel: "BATTLE",
    claimKind: "HISTORICAL_OCCURRENCE",
    verificationStatus: "VERIFIED",
    sourceId: "S1-ZEITZ-2007-2E",
    sourceVersionOrCommit: "canonical",
    sourceLocator: { kind: "PDF", pdfPage: 20, section: "1.2" },
    sourceArtifactSha256: "be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565",
    historicalProblemIds: ["SMMC-2021-A1"],
    learnerAttemptIds: [],
    linkedRecordIds: [],
  });
} catch {
  bookBattleRejected = true;
}
expect(bookBattleRejected, "Battle channel must require frozen official SMMC provenance, not a canonical book source.");

const battleOccurrenceA = {
  ...baseEvidence,
  recordId: "occ-a",
  evidenceBasis: "SOURCE_FACT",
  recordChannel: "BATTLE",
  claimKind: "HISTORICAL_OCCURRENCE",
  verificationStatus: "VERIFIED",
  sourceId: "S0-SMMC-SOLUTION-2021",
  sourceVersionOrCommit: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  sourceLocator: { kind: "PDF", pdfPage: 8, section: "A1" },
  sourceArtifactSha256: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  historicalProblemIds: ["SMMC-2021-A1"],
  learnerAttemptIds: [],
  linkedRecordIds: [],
};
const battleOccurrenceB = {
  ...battleOccurrenceA,
  recordId: "occ-b",
  candidateId: "candidate-test-b",
  candidateName: "Test candidate B",
};
const battleCooccurrence = {
  ...baseEvidence,
  recordId: "co-battle",
  evidenceBasis: "SOURCE_FACT",
  recordChannel: "BATTLE",
  claimKind: "HISTORICAL_COOCCURRENCE",
  verificationStatus: "VERIFIED",
  sourceId: "S0-SMMC-SOLUTION-2021",
  sourceVersionOrCommit: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  sourceLocator: { kind: "PDF", pdfPage: 8, section: "A1" },
  sourceArtifactSha256: "c994c0cf8ab9364a672da4c303411a9bfe58a650f1b6adc5b4eefb55a30ffd00",
  historicalProblemIds: ["SMMC-2021-A1"],
  learnerAttemptIds: [],
  linkedRecordIds: ["occ-a", "occ-b"],
};
validateGate1EvidenceCollection([battleOccurrenceA, battleOccurrenceB, battleCooccurrence]);

let crossProblemCooccurrenceRejected = false;
try {
  validateGate1EvidenceCollection([
    battleOccurrenceA,
    { ...battleOccurrenceB, historicalProblemIds: ["SMMC-2021-A2"] },
    battleCooccurrence,
  ]);
} catch {
  crossProblemCooccurrenceRejected = true;
}
expect(crossProblemCooccurrenceRejected, "Battle co-occurrence must not link occurrences from different problems.");

let duplicateLinkedOccurrenceRejected = false;
try {
  validateGate1EvidenceCollection([
    battleOccurrenceA,
    { ...battleCooccurrence, linkedRecordIds: ["occ-a", "occ-a"] },
  ]);
} catch {
  duplicateLinkedOccurrenceRejected = true;
}
expect(duplicateLinkedOccurrenceRejected, "Battle co-occurrence must reject the same linked occurrence ID twice.");

let duplicateCandidateMoveRejected = false;
try {
  validateGate1EvidenceCollection([
    battleOccurrenceA,
    { ...battleOccurrenceB, candidateId: battleOccurrenceA.candidateId, candidateName: battleOccurrenceA.candidateName },
    battleCooccurrence,
  ]);
} catch {
  duplicateCandidateMoveRejected = true;
}
expect(duplicateCandidateMoveRejected, "Battle co-occurrence must require two distinct candidate/move IDs.");

// Gate 2 raw candidate harvest: coverage without ontology/adjudication leakage.
expect(SMMC_METHOD_TAGS.length === 44, "Expected frozen current SMMC method-tag vocabulary to contain 44 tags.");
expect(
  ARSENAL_GATE2_LEGACY_TAG_CANDIDATES.length === SMMC_METHOD_TAGS.length,
  "Gate-2 raw harvest must preserve every current SMMC method tag exactly once."
);
const legacyTerms = ARSENAL_GATE2_LEGACY_TAG_CANDIDATES.map(x => x.sourceTerminology);
expect(
  JSON.stringify([...legacyTerms].sort()) === JSON.stringify([...SMMC_METHOD_TAGS].sort()),
  "Gate-2 legacy harvest does not exactly cover SMMC_METHOD_TAGS."
);

expect(
  ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES.length === SMMC_SECONDARY_TAGS.length,
  "Gate-2 raw harvest must preserve every current SMMC secondary tag exactly once."
);
const secondaryTerms = ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES.map(x => x.sourceTerminology);
expect(
  JSON.stringify([...secondaryTerms].sort()) === JSON.stringify([...SMMC_SECONDARY_TAGS].sort()),
  "Gate-2 secondary harvest does not exactly cover SMMC_SECONDARY_TAGS."
);
expect(ARSENAL_GATE2_HARVEST_META.legacyMethodTagCount === 44, "Gate-2 legacy tag metadata drifted.");
expect(ARSENAL_GATE2_HARVEST_META.secondaryTagCandidates === 39, "Gate-2 secondary-tag metadata drifted.");
expect(ARSENAL_GATE2_HARVEST_META.ledgerBridgeCandidates === 129, "Gate-2 ledger bridge harvest count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.ledgerBridgeEvidenceRecords === 129, "Gate-2 ledger bridge evidence count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.ledgerRouteCandidates === 34, "Gate-2 ledger route harvest count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.ledgerRouteEvidenceRecords === 34, "Gate-2 ledger route evidence count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.officialSolutionCandidates === 127, "Gate-2 direct official-solution candidate count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.officialSolutionEvidenceRecords === 127, "Gate-2 direct official-solution evidence count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.bookSourceCandidates === 288, "Gate-2 book-source harvest count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.totalCandidates === 661, "Gate-2 raw candidate total drifted.");
expect(ARSENAL_GATE2_HARVEST_META.totalEvidenceRecords === 661, "Gate-2 raw evidence total drifted.");

// Gate-2 canonical-source closure is protected by a complete item-level
// reviewed decision partition, not merely by equality with a positive HARVEST set.
expect(ARSENAL_GATE2_SOURCE_CLOSURE_RULE.gate3StillClosed === true, "Source-closure certificate must not open Gate 3.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.canonicalSourcesReviewed === 5, "Source-closure certificate must cover all five canonical books.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.reviewedItems === 458, "Source-closure reviewed-item inventory count drifted.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.harvestDecisions === 375, "Source-closure HARVEST decision count drifted.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.harvestedCandidates === 288, "Source-closure unique harvested-candidate count drifted.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.exclusions === 83, "Source-closure EXCLUDE decision count drifted.");
expect(ARSENAL_GATE2_SOURCE_CLOSURE_META.everyReviewedItemHasPdfPage === true, "Every reviewed source item must carry an explicit physical PDF page.");
expect(
  typeof ARSENAL_GATE2_SOURCE_CLOSURE_RULE.closureClaim === "string" &&
  ARSENAL_GATE2_SOURCE_CLOSURE_RULE.closureClaim.includes("complete decision partition"),
  "Source-closure rule must explicitly claim an item-level decision partition."
);

const gate2BookIds = ARSENAL_GATE2_BOOK_CANDIDATES.map(x => x.candidateId);
const gate2BookById = new Map(ARSENAL_GATE2_BOOK_CANDIDATES.map(x => [x.candidateId, x]));
const closureHarvestIds = [...ARSENAL_GATE2_SOURCE_CLOSURE_HARVEST_IDS];
expect(new Set(gate2BookIds).size === gate2BookIds.length, "Book-source candidate IDs must be unique.");
expect(new Set(closureHarvestIds).size === closureHarvestIds.length, "Source-closure HARVEST candidate IDs must be unique after deduplication.");
expect(
  JSON.stringify([...gate2BookIds].sort()) === JSON.stringify([...closureHarvestIds].sort()),
  "Gate-2 canonical-book candidates must exactly equal the HARVEST side of the reviewed source-item partition."
);

// Validate bounded source zones and their frozen canonical artifacts.
const closureZones = new Map();
const closureSourceIds = new Set();
for (const zone of ARSENAL_GATE2_SOURCE_CLOSURE_ZONES) {
  const source = canonicalArsenalSource(zone.sourceId);
  expect(source && source.kind === "BOOK_PDF", `Source-closure zone uses noncanonical/nonbook source: ${zone.zoneId}`);
  expect(typeof zone.zoneId === "string" && zone.zoneId.length > 0, "Source-closure zone missing zoneId.");
  expect(!closureZones.has(zone.zoneId), `Duplicate source-closure zoneId: ${zone.zoneId}`);
  expect(typeof zone.selector === "string" && zone.selector.length > 120, `Source-closure zone needs an explicit bounded selector: ${zone.zoneId}`);
  expect(
    typeof zone.locatorSemantics === "string" &&
    zone.locatorSemantics.includes("enumerationSegments define the exhaustive"),
    `Source-closure zone must distinguish exhaustive enumeration surfaces from locator-only verification pages: ${zone.zoneId}`
  );
  for (const [kind,segments] of [["enumeration",zone.enumerationSegments],["verification",zone.verificationSegments]]) {
    expect(Array.isArray(segments), `Source-closure ${kind} segments missing: ${zone.zoneId}`);
    for (const seg of segments) {
      expect(Number.isInteger(seg.startPage) && Number.isInteger(seg.endPage) && seg.startPage >= 1 && seg.endPage >= seg.startPage, `Invalid ${kind} segment for ${zone.zoneId}`);
      expect(seg.endPage <= source.pages, `Source-closure ${kind} segment exceeds frozen PDF bounds: ${zone.zoneId}`);
      expect(typeof seg.label === "string" && seg.label.length > 12, `Source-closure segment needs a label: ${zone.zoneId}`);
    }
  }
  expect(zone.enumerationSegments.length > 0, `Every source must have at least one enumeration segment: ${zone.zoneId}`);
  closureZones.set(zone.zoneId, zone);
  closureSourceIds.add(zone.sourceId);
}
expect(closureSourceIds.size === 5, "Source-closure zones must cover every canonical book.");

const pageInsideZone = (zone,page) =>
  [...zone.enumerationSegments, ...zone.verificationSegments]
    .some(seg => page >= seg.startPage && page <= seg.endPage);

// Validate the reviewed-item inventory as a true partition.
const reviewIds = new Set();
const reviewedKeys = new Set();
const harvestDecisionCandidateIds = [];
let harvestDecisionCount = 0;
let excludeDecisionCount = 0;

for (const item of ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS) {
  expect(typeof item.reviewItemId === "string" && item.reviewItemId.length > 8, "Reviewed source item missing reviewItemId.");
  expect(!reviewIds.has(item.reviewItemId), `Duplicate reviewed source item ID: ${item.reviewItemId}`);
  reviewIds.add(item.reviewItemId);

  const source = canonicalArsenalSource(item.sourceId);
  expect(source && source.kind === "BOOK_PDF", `Reviewed source item uses noncanonical/nonbook source: ${item.reviewItemId}`);
  const zone = closureZones.get(item.zoneId);
  expect(zone && zone.sourceId === item.sourceId, `Reviewed source item has missing/mismatched closure zone: ${item.reviewItemId}`);
  expect(typeof item.sourceLabel === "string" && item.sourceLabel.trim().length > 0, `Reviewed source item missing sourceLabel: ${item.reviewItemId}`);
  expect(typeof item.section === "string" && item.section.trim().length > 0, `Reviewed source item missing section/context: ${item.reviewItemId}`);
  expect(Number.isInteger(item.pdfPage) && item.pdfPage >= 1 && item.pdfPage <= source.pages, `Reviewed source item missing/out-of-bounds physical PDF page: ${item.reviewItemId}`);
  expect(pageInsideZone(zone,item.pdfPage), `Reviewed source item locator lies outside its declared bounded source zone: ${item.reviewItemId}`);

  const reviewedKey = `${item.sourceId}|${item.zoneId}|${item.sourceLabel.trim().toLowerCase()}|${item.section.trim().toLowerCase()}`;
  expect(!reviewedKeys.has(reviewedKey), `Same reviewed source item was decisioned twice: ${reviewedKey}`);
  reviewedKeys.add(reviewedKey);

  expect(item.disposition === "HARVEST" || item.disposition === "EXCLUDE", `Reviewed source item has invalid disposition: ${item.reviewItemId}`);

  if (item.disposition === "HARVEST") {
    harvestDecisionCount += 1;
    expect(typeof item.candidateId === "string" && item.candidateId.length > 0, `HARVEST item missing candidateId: ${item.reviewItemId}`);
    expect(item.reason === undefined, `HARVEST item must not also carry an EXCLUDE reason: ${item.reviewItemId}`);
    expect(typeof item.rationale === "string" && item.rationale.length > 45, `HARVEST item needs source-qualification rationale: ${item.reviewItemId}`);
    const candidate = gate2BookById.get(item.candidateId);
    expect(candidate, `HARVEST item points to missing canonical-book candidate: ${item.reviewItemId} -> ${item.candidateId}`);
    expect(candidate.origin === item.sourceId, `HARVEST item crosses canonical sources: ${item.reviewItemId}`);
    harvestDecisionCandidateIds.push(item.candidateId);
  } else {
    excludeDecisionCount += 1;
    expect(item.candidateId === undefined, `EXCLUDE item must not also point to a candidate: ${item.reviewItemId}`);
    expect(typeof item.reason === "string" && item.reason.length > 35, `EXCLUDE item needs a substantive bounded-rule reason: ${item.reviewItemId}`);
  }
}

expect(reviewIds.size === ARSENAL_GATE2_SOURCE_CLOSURE_META.reviewedItems, "Reviewed source-item inventory metadata drifted.");
expect(harvestDecisionCount === ARSENAL_GATE2_SOURCE_CLOSURE_META.harvestDecisions, "HARVEST decision metadata drifted.");
expect(excludeDecisionCount === ARSENAL_GATE2_SOURCE_CLOSURE_META.exclusions, "EXCLUDE decision metadata drifted.");
expect(
  JSON.stringify([...new Set(harvestDecisionCandidateIds)].sort()) === JSON.stringify([...gate2BookIds].sort()),
  "Every canonical-book candidate must be justified by at least one reviewed HARVEST item, and no HARVEST item may point outside the candidate set."
);

// Derived compatibility exports must be exact projections of the item-level inventory.
expect(
  JSON.stringify([...new Set(harvestDecisionCandidateIds)].sort()) === JSON.stringify([...closureHarvestIds].sort()),
  "Derived source-closure HARVEST_IDS must equal the reviewed HARVEST projection."
);
expect(
  ARSENAL_GATE2_SOURCE_CLOSURE_EXCLUSIONS.length === excludeDecisionCount,
  "Derived source-closure EXCLUSIONS must equal the reviewed EXCLUDE projection."
);
const exclusionReviewIds = ARSENAL_GATE2_SOURCE_CLOSURE_EXCLUSIONS.map(x => x.reviewItemId);
expect(new Set(exclusionReviewIds).size === exclusionReviewIds.length, "Derived EXCLUDE projection contains duplicate reviewed-item IDs.");

// Reviewed per-source candidate counts are protected independently of total size.
const closureExpectedCounts = ARSENAL_GATE2_SOURCE_CLOSURE_META.expectedHarvestBySource;
for (const [sourceId, expected] of Object.entries(closureExpectedCounts)) {
  const actual = ARSENAL_GATE2_BOOK_CANDIDATES.filter(x => x.origin === sourceId).length;
  expect(actual === expected, `Reviewed source-closure count drift for ${sourceId}: expected ${expected}, got ${actual}`);
}

// Regression checks for every independently reported closure-integrity example.
for (const candidateId of [
  "RAW-SOURCE-e-graph-theory",
  "RAW-SOURCE-e-eliminate-floor-ceiling",
  "RAW-SOURCE-h-combining-techniques",
  "RAW-SOURCE-h-equivalent-statements",
  "RAW-SOURCE-z-algebraic-proof",
  "RAW-SOURCE-z-geometric-proof",
  "RAW-SOURCE-z-algorithmic-construction",
  "RAW-SOURCE-z-dissection",
  "RAW-SOURCE-z-similar-triangles",
]) {
  expect(closureHarvestIds.includes(candidateId), `Independent-review HARVEST regression: missing ${candidateId}`);
  expect(gate2BookIds.includes(candidateId), `Independent-review candidate missing from canonical-book harvest: ${candidateId}`);
}
for (const sourceLabel of [
  "AM-GM inequality — Cauchy's proof",
  "Cauchy-Schwarz inequality — proof",
  "Prime infinitude — classical proof",
  "Prime infinitude — Euler's proof",
  "Theorem — centroid proof",
  "Theorem — power-of-a-point proof",
]) {
  expect(
    ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS.some(x => x.sourceId === "S1-ZEITZ-2007-2E" && x.sourceLabel === sourceLabel && x.disposition === "EXCLUDE"),
    `Independent-review EXCLUDE regression: missing decision for ${sourceLabel}`
  );
}
// Literal Zeitz family-child partition required by review 5393058455.
for (const sourceLabel of [
  "Strategies → defined",
  "Strategies → angle chasing → limitations of",
  "Tactics → defined",
  "Tactics → factoring",
  "Tactics → generating functions",
  "Tactics → graph theory",
  "Tactics → modular arithmetic",
  "Tactics → modulo m filter",
  "Tools → defined",
  "Tools → weights → and Ceva's theorem",
  "Transformations → and Felix Klein",
  "Transformations → and Henri Poincare",
  "Transformations → homothety → and concurrence",
]) {
  expect(
    ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS.some(
      x => x.sourceId === "S1-ZEITZ-2007-2E" &&
           x.sourceLabel === sourceLabel &&
           Number.isInteger(x.pdfPage) &&
           (x.pdfPage === 382 || x.pdfPage === 383)
    ),
    `Independent-review Zeitz family-child regression: missing decision/locator for ${sourceLabel}`
  );
}
for (const familyPrefix of [
  "Combinatorial Strategies and Tactics →",
  "Strategies →",
  "Tactics →",
  "Tools →",
  "Transformations →",
]) {
  expect(
    ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS.some(
      x => x.sourceId === "S1-ZEITZ-2007-2E" && x.sourceLabel.startsWith(familyPrefix)
    ),
    `Zeitz family-child partition missing family ${familyPrefix}`
  );
}

for (const sourceLabel of [
  "Congruence theorems — induction proof",
  "Fermat's little theorem — induction proof",
  "Theorem — proof using area",
  "Theorem — proof using trigonometry",
  "Theorem — proof with auxiliary line",
  "Ptolemy's theorem — proof using auxiliary construction",
  "Ptolemy's theorem — proof using complex numbers",
  "Ptolemy's theorem — proof using inversion",
  "Pythagorean theorem — proof using dissection",
  "Pythagorean theorem — proof using shearing",
  "Pythagorean theorem — proof using similar triangles",
]) {
  expect(
    ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS.some(x => x.sourceId === "S1-ZEITZ-2007-2E" && x.sourceLabel === sourceLabel && x.disposition === "HARVEST"),
    `Independent-review mapped-HARVEST regression: missing decision for ${sourceLabel}`
  );
}

expect(ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE.length === 127, "Expected 127 direct official-solution occurrence records.");
for (const record of ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE) {
  expect(record.evidenceBasis === "SOURCE_FACT", `Official-solution evidence must remain SOURCE_FACT: ${record.recordId}`);
  expect(record.recordChannel === "BATTLE", `Verified official occurrence must use BATTLE channel: ${record.recordId}`);
  expect(record.claimKind === "HISTORICAL_OCCURRENCE", `Verified official occurrence must use HISTORICAL_OCCURRENCE: ${record.recordId}`);
  expect(record.verificationStatus === "VERIFIED", `Verified official occurrence status drifted: ${record.recordId}`);
  expect(Array.isArray(record.historicalProblemIds) && record.historicalProblemIds.length === 1, `Official occurrence must bind exactly one historical problem: ${record.recordId}`);
}

const rawCandidateIds = new Set();
for (const candidate of ARSENAL_GATE2_RAW_CANDIDATES) {
  expect(typeof candidate.candidateId === "string" && candidate.candidateId.length > 0, "Raw candidate missing candidateId.");
  expect(!rawCandidateIds.has(candidate.candidateId), `Duplicate Gate-2 raw candidate ID ${candidate.candidateId}`);
  rawCandidateIds.add(candidate.candidateId);
  expect(candidate.ontologyType === null, `Gate 2 must not type ${candidate.candidateId}`);
  expect(Array.isArray(candidate.aliases) && candidate.aliases.length === 0, `Gate 2 must not merge aliases for ${candidate.candidateId}`);
  expect(candidate.adjudication === null, `Gate 2 must not adjudicate ${candidate.candidateId}`);
  expect(candidate.adjudicationRationale === null, `Gate 2 must not adjudicate rationale for ${candidate.candidateId}`);
  expect(candidate.rank === null && candidate.rarity === null, `Gate 2 must not rank/gamify ${candidate.candidateId}`);
  expect(candidate.hardPrerequisites === null && candidate.softPrerequisites === null, `Gate 2 must not build prerequisites for ${candidate.candidateId}`);
  expect(candidate.candidateRelations === null, `Gate 2 must not build candidate relations for ${candidate.candidateId}`);
}

const rawEvidenceIds = new Set();
for (const record of ARSENAL_GATE2_RAW_EVIDENCE) {
  validateGate1EvidenceRecord(record);
  expect(rawCandidateIds.has(record.candidateId), `Gate-2 evidence references unknown candidate ${record.candidateId}`);
  expect(!rawEvidenceIds.has(record.recordId), `Duplicate Gate-2 evidence record ID ${record.recordId}`);
  rawEvidenceIds.add(record.recordId);
  expect(record.ontologyType === null, `Gate-2 evidence typed candidate ${record.candidateId}`);
}

for (const candidate of ARSENAL_GATE2_RAW_CANDIDATES) {
  for (const evidenceId of candidate.evidenceRecordIds) {
    expect(rawEvidenceIds.has(evidenceId), `Candidate ${candidate.candidateId} references missing evidence ${evidenceId}`);
  }
}

expect(ARSENAL_GATE2_HARVEST_META.gate === 2, "Raw harvest metadata must remain Gate 2.");
expect(ARSENAL_GATE2_HARVEST_META.status === "RAW-HARVEST-REVIEW-CANDIDATE", "Gate 2 harvest must remain an unaccepted review candidate.");
expect(ARSENAL_GATE2_HARVEST_META.ontologyFrozen === false, "Gate 2 cannot freeze ontology.");
expect(ARSENAL_GATE2_HARVEST_META.adjudicationStarted === false, "Gate 2 cannot start adjudication.");
expect(ARSENAL_GATE2_HARVEST_META.rankingStarted === false, "Gate 2 cannot rank candidates.");
expect(ARSENAL_GATE2_HARVEST_META.prerequisiteGraphStarted === false, "Gate 2 cannot start prerequisite graph.");

expect(ARSENAL_GATE2_ORPHAN_EVIDENCE_IDS.length === 0, "Gate-2 raw harvest has orphan evidence records.");
expect(ARSENAL_GATE2_CANDIDATES_WITHOUT_EVIDENCE.length === 0, "Gate-2 raw harvest has candidates with missing evidence.");
expect(ARSENAL_GATE2_UNKNOWN_CANONICAL_SOURCE_FACTS.length === 0, "Gate-2 raw harvest has SOURCE_FACT records outside the canonical registry.");
expect(
  ARSENAL_GATE2_RAW_AUDIT_META.candidateCount === ARSENAL_GATE2_RAW_CANDIDATES.length &&
  ARSENAL_GATE2_RAW_AUDIT_META.evidenceCount === ARSENAL_GATE2_RAW_EVIDENCE.length,
  "Gate-2 audit metadata count drift."
);
expect(ARSENAL_GATE2_OFFICIAL_ROUTE_META.historicalProblems === 88, "Official solution-route index must cover all 88 historical problem IDs.");
expect(ARSENAL_GATE2_OFFICIAL_ROUTE_META.labeledSolutionSections === 132, "Expected 132 explicitly labelled solution sections in frozen 2017-2025 booklets.");
expect(ARSENAL_GATE2_OFFICIAL_ROUTE_META.multiRouteProblems === 32, "Expected 32 historical problems with multiple explicitly labelled solution routes.");
expect(
  JSON.stringify([...ARSENAL_GATE2_OFFICIAL_ROUTE_META.zeroLabelledRouteProblems].sort()) === JSON.stringify(["SMMC-2017-B4","SMMC-2018-B4"]),
  "Unexpected zero-labelled-route problem set."
);
expect(
  new Set(ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX.map(x => x.problemId)).size === 88,
  "Official solution-route index contains duplicate problem IDs."
);
for (const row of ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX) {
  expect(canonicalArsenalSource(row.sourceId)?.sha256 === row.sourceArtifactSha256, `Route-index source/hash mismatch for ${row.problemId}`);
  expect(row.routeLabels.length === row.labeledRouteCount, `Route-label count mismatch for ${row.problemId}`);
}

expect(
  ARSENAL_GATE2_DUPLICATE_NAME_GROUPS.length > 0,
  "Gate-2 duplicate-name report unexpectedly empty; duplicates should be reported, not silently collapsed."
);
for (const group of ARSENAL_GATE2_DUPLICATE_NAME_GROUPS) {
  expect(group.candidateIds.length > 1, "Duplicate-name report contains singleton.");
  expect(new Set(group.candidateIds).size === group.candidateIds.length, "Duplicate-name report repeated the same candidate ID.");
}

// Gate 3 granularity calibration: exact overlay on the independently accepted Gate-2 pool.
expect(
  ARSENAL_GATE3_ACCEPTED_GATE2_SHA === "ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7",
  "Gate 3 must remain anchored to the independently accepted Gate-2 exact SHA."
);
expect(
  ARSENAL_GATE3_GATE2_MERGE_SHA === "7600dd377192aafe6ca777636d94474736ea4e4f",
  "Gate 3 must remain anchored to the merge commit that preserves the accepted Gate-2 SHA."
);
expect(ARSENAL_GATE3_CONTRACT_META.gate === 3, "Granularity contract must identify Gate 3.");
expect(ARSENAL_GATE3_CONTRACT_META.purpose === "GRANULARITY_MEASUREMENT_ONLY", "Gate 3 purpose drifted.");
expect(
  ARSENAL_GATE3_EVIDENCE_MODE === "STRICT_CANDIDATE_OWNED_GATE2" &&
  ARSENAL_GATE3_CONTRACT_META.evidenceMode === ARSENAL_GATE3_EVIDENCE_MODE,
  "Gate 3 must remain in strict candidate-owned Gate-2 evidence mode during calibration and mass review."
);
expect(
  ARSENAL_GATE3_CROSS_SCALE_MODE === "SOURCE_SCALE_VARIABLE_ROLE_ONLY" &&
  ARSENAL_GATE3_CONTRACT_META.crossScaleMode === ARSENAL_GATE3_CROSS_SCALE_MODE,
  "Gate 3 must keep mixed-grain-expression CROSS_SCALE deferred during this calibrated mass-review mode."
);
expect(
  JSON.stringify(ARSENAL_GATE3_DEFERRED_SCALE_BRANCHES) === JSON.stringify(["MIXED_GRAIN_EXPRESSION"]) &&
  JSON.stringify(ARSENAL_GATE3_CONTRACT_META.deferredScaleBranches) === JSON.stringify(ARSENAL_GATE3_DEFERRED_SCALE_BRANCHES),
  "Gate-3 deferred scale-branch contract drifted."
);
for (const state of ["CLEAR","PARTIAL","ABSENT","UNRESOLVED"]) {
  expect(
    typeof ARSENAL_GATE3_BOUNDARY_SEMANTICS[state] === "string" &&
    ARSENAL_GATE3_BOUNDARY_SEMANTICS[state].length > 80,
    `Gate-3 boundary semantics missing/substantive definition for ${state}`
  );
}
expect(
  ARSENAL_GATE3_BOUNDARY_SEMANTICS.ABSENT.includes("Mere silence is not ABSENT"),
  "Gate-3 ABSENT semantics must distinguish affirmative non-operation from mere missing evidence."
);
expect(
  ARSENAL_GATE3_BOUNDARY_SEMANTICS.UNRESOLVED.includes("plausibly relevant or implied"),
  "Gate-3 UNRESOLVED semantics must cover plausible but evidence-indeterminate boundaries."
);
for (const [field, value] of Object.entries({
  referenceUnitIsFinalOntology: false,
  mergeSplitDecisionsAllowed: false,
  ontologyAllowed: false,
  prerequisiteGraphAllowed: false,
  rankingAllowed: false,
  candidateRelationsAllowed: false,
  learnerGamificationAllowed: false,
  gate2RawPoolImmutable: true,
})) {
  expect(
    ARSENAL_GATE3_CONTRACT_META[field] === value,
    `Gate-3 boundary flag drifted: ${field}`
  );
}

expect(
  ARSENAL_GATE3_GRANULARITY_RECORDS.length === ARSENAL_GATE2_RAW_CANDIDATES.length,
  "Gate-3 granularity overlay must contain exactly one row per accepted Gate-2 raw candidate."
);
expect(ARSENAL_GATE3_GRANULARITY_RECORDS.length === 661, "Gate-3 population must remain the accepted 661-candidate Gate-2 pool.");

const gate3Ids = ARSENAL_GATE3_GRANULARITY_RECORDS.map(x => x.candidateId);
expect(new Set(gate3Ids).size === gate3Ids.length, "Duplicate Gate-3 candidate row.");
expect(
  JSON.stringify([...gate3Ids].sort()) === JSON.stringify([...rawCandidateIds].sort()),
  "Gate-3 candidate IDs must exactly equal the accepted Gate-2 raw candidate IDs."
);

const rawCandidateById = new Map(ARSENAL_GATE2_RAW_CANDIDATES.map(x => [x.candidateId, x]));
let gate3Reviewed = 0;
let gate3Unreviewed = 0;
for (const row of ARSENAL_GATE3_GRANULARITY_RECORDS) {
  validateGate3GranularityRecord(row);
  const raw = rawCandidateById.get(row.candidateId);
  expect(raw, `Gate-3 row references unknown raw candidate ${row.candidateId}`);
  expect(row.candidateName === raw.candidateName, `Gate-3 candidate-name snapshot drifted for ${row.candidateId}`);
  expect(row.origin === raw.origin, `Gate-3 origin snapshot drifted for ${row.candidateId}`);
  for (const evidenceId of row.supportingEvidenceRecordIds) {
    expect(
      raw.evidenceRecordIds.includes(evidenceId),
      `Gate-3 row cites evidence not owned by candidate ${row.candidateId}: ${evidenceId}`
    );
  }
  if (row.status === "REVIEWED") gate3Reviewed += 1;
  if (row.status === "UNREVIEWED") gate3Unreviewed += 1;
}
expect(gate3Reviewed === 661, "Gate-3 mass pass must review all 661 accepted raw candidates.");
expect(gate3Unreviewed === 0, "Gate-3 mass pass must leave zero candidates UNREVIEWED.");
expect(
  ARSENAL_GATE3_GRANULARITY_META.reviewed === gate3Reviewed &&
  ARSENAL_GATE3_GRANULARITY_META.unreviewed === gate3Unreviewed,
  "Gate-3 granularity metadata does not match the actual reviewed/unreviewed partition."
);
expect(ARSENAL_GATE3_GRANULARITY_META.status === "MASS-PASS-REVIEW-CANDIDATE", "Gate 3 mass pass must remain a review candidate rather than self-declaring completion.");
expect(ARSENAL_GATE3_GRANULARITY_META.gate2CandidateCount === 661, "Gate-3 metadata must preserve the 661-candidate Gate-2 population.");
expect(ARSENAL_GATE3_GRANULARITY_META.ontologyStarted === false, "Gate 3 must not start ontology.");
expect(ARSENAL_GATE3_GRANULARITY_META.mergeSplitStarted === false, "Gate 3 must not start merge/split adjudication.");
expect(ARSENAL_GATE3_GRANULARITY_META.prerequisiteGraphStarted === false, "Gate 3 must not start prerequisites.");
expect(ARSENAL_GATE3_GRANULARITY_META.rankingStarted === false, "Gate 3 must not rank candidates.");
expect(ARSENAL_GATE3_GRANULARITY_META.candidateRelationsStarted === false, "Gate 3 must not build candidate relations.");
expect(ARSENAL_GATE3_GRANULARITY_META.learnerGamificationStarted === false, "Gate 3 must not start Forge/Boss/Arena representation.");
expect(
  ARSENAL_GATE3_GRANULARITY_META.strictEvidenceReauditVersion === "v2-45-boundary-normalized",
  "All 45 calibration rows must remain marked as re-audited under strict candidate-owned evidence mode."
);
expect(ARSENAL_GATE3_GRANULARITY_META.massPassVersion === "v6-616-context-evidence-role-repair", "Gate-3 mass-pass version drifted.");
expect(ARSENAL_GATE3_GRANULARITY_META.calibrationRows === 45, "Gate-3 accepted calibration population must remain 45.");
expect(ARSENAL_GATE3_GRANULARITY_META.massPassRows === 616, "Gate-3 mass-pass population must be exactly the remaining 616 rows.");
expect(
  ARSENAL_GATE3_MASS_PASS_META.calibrationRows === 45 &&
  ARSENAL_GATE3_MASS_PASS_META.massRows === 616 &&
  ARSENAL_GATE3_MASS_PASS_META.totalRows === 661,
  "Gate-3 mass-pass metadata does not partition 45 accepted calibration rows + 616 mass rows = 661."
);
expect(
  ARSENAL_GATE3_MASS_PASS_META.calibrationAcceptanceSha === "177a8efa24ebca15e2c84dbb18e96a72be5e1d08" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.calibrationAcceptanceSha === ARSENAL_GATE3_MASS_PASS_META.calibrationAcceptanceSha,
  "Mass pass must remain anchored to the independently accepted ruler SHA."
);
expect(
  ARSENAL_GATE3_MASS_CLASSIFIER_META.evidenceMode === "STRICT_CANDIDATE_OWNED_GATE2" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.crossScaleMode === "SOURCE_SCALE_VARIABLE_ROLE_ONLY" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.emitsCrossScale === false,
  "Mass classifier must preserve accepted evidence mode and must not emit new CROSS_SCALE calls."
);
expect(
  ARSENAL_GATE3_MASS_CLASSIFIER_META.version === "v6" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.provenanceShortcutRemoved === true &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.triggerPrepositionShortcutRemoved === true &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.distinctOperationResultRequired === true &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.contextReachFallback === "UNRESOLVED" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.triggerObjectRole === "PRE_DESTINATION_INPUT_ONLY" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.evidenceRoleSpans === "VERIFIED_CANDIDATE_OWNED" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.actionHeadAudit === "FIXED_CORPUS_V5_IMPERATIVE_REVIEW" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.contextReach === "ROLE_SENSITIVE_SEMANTIC_DEPENDENCE_V6" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.evidenceResultGrammar === "VERIFIED_OWNED_RELATION_CLAUSES_V6" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.premiseRoleAgreement === "NAME_AND_VERIFIED_CLAIM_V6" &&
  ARSENAL_GATE3_MASS_CLASSIFIER_META.bundleAuditMode === "HIGH_RECALL_STRUCTURAL_SURFACE_WITH_POSITIVE_NEGATIVE_ADJUDICATION",
  "Gate-3 mass classifier repair metadata drifted."
);

const gate3ReviewedRows = ARSENAL_GATE3_GRANULARITY_RECORDS.filter(x => x.status === "REVIEWED");
const massRows = gate3ReviewedRows.filter(row => /^MP\d{2}\b/.test(row.rationale));
expect(massRows.length === 616, `Expected 616 mass-classified rows, found ${massRows.length}.`);
const calibrationRows = gate3ReviewedRows.filter(row => !/^MP\d{2}\b/.test(row.rationale));
expect(calibrationRows.length === 45, `Expected 45 accepted calibration rows, found ${calibrationRows.length}.`);
for (const row of massRows) {
  expect(
    /^MP(?:0[1-9]|10)\b/.test(row.rationale),
    `Mass-pass row lacks recognized MP01–MP10 rule marker: ${row.candidateId}`
  );
}


// Calibration must exercise every reference-scale outcome and the major orthogonal dimensions.
for (const scale of ["MICRO","DEPLOYABLE","MACRO","CROSS_SCALE","UNRESOLVED"]) {
  expect(gate3ReviewedRows.some(x => x.referenceScale === scale), `Gate-3 calibration does not exercise referenceScale=${scale}`);
}
for (const bundle of ["SINGLE_PRIMARY_MOVE","BUNDLED_MOVES","UNRESOLVED"]) {
  expect(gate3ReviewedRows.some(x => x.bundleStructure === bundle), `Gate-3 calibration does not exercise bundleStructure=${bundle}`);
}
for (const shape of ["EXPLICIT_ACTION","IMPLICIT_ACTION","LABEL_ONLY","UNRESOLVED"]) {
  expect(gate3ReviewedRows.some(x => x.actionShape === shape), `Gate-3 calibration does not exercise actionShape=${shape}`);
}
for (const reach of ["GENERAL","SOURCE_LOCAL","PROBLEM_LOCAL","UNRESOLVED"]) {
  expect(gate3ReviewedRows.some(x => x.contextReach === reach), `Gate-3 calibration does not exercise contextReach=${reach}`);
}

for (const confidence of ["HIGH","MEDIUM","LOW"]) {
  expect(gate3ReviewedRows.some(x => x.confidence === confidence), `Gate-3 calibration does not exercise confidence=${confidence}`);
}

// Scale and context must be independently calibrated: MICRO is not synonymous
// with PROBLEM_LOCAL, and PROBLEM_LOCAL is not synonymous with MICRO.
expect(
  gate3ReviewedRows.some(x => x.referenceScale === "MICRO" && x.contextReach !== "PROBLEM_LOCAL"),
  "Gate-3 calibration needs a genuine MICRO anchor outside PROBLEM_LOCAL context."
);
expect(
  gate3ReviewedRows.some(x => x.contextReach === "PROBLEM_LOCAL" && x.referenceScale !== "MICRO"),
  "Gate-3 calibration needs a PROBLEM_LOCAL anchor whose grain is not MICRO."
);

const recoverabilityCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-ROUTE-004");
expect(
  recoverabilityCalibration?.referenceScale === "UNRESOLVED" &&
  recoverabilityCalibration?.triggerBoundary === "UNRESOLVED" &&
  recoverabilityCalibration?.operationBoundary === "UNRESOLVED" &&
  recoverabilityCalibration?.outputBoundary === "UNRESOLVED",
  "Weak audit-note Recoverability evidence must not borrow richer official evidence from another candidate."
);

const cruxCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-z-crux-move");
expect(
  cruxCalibration?.referenceScale === "CROSS_SCALE" &&
  cruxCalibration?.bundleStructure === "SINGLE_PRIMARY_MOVE",
  "Crux Move must exercise source-defined scale variability without falsely implying a bundled move."
);
expect(
  gate3ReviewedRows.filter(x => x.referenceScale === "CROSS_SCALE").length === 1 &&
  gate3ReviewedRows.find(x => x.referenceScale === "CROSS_SCALE")?.candidateId === "RAW-SOURCE-z-crux-move",
  "The accepted ruler permits exactly one active CROSS_SCALE sentinel; mass pass must not introduce another."
);

for (const candidateId of [
  "RAW-BRIDGE-070",
  "RAW-OFFICIAL-095",
  "RAW-OFFICIAL-107",
  "RAW-SOURCE-h-combining-techniques",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.referenceScale === "MACRO" && row?.bundleStructure === "BUNDLED_MOVES",
    `Evidence-supported multi-operation bundle without mixed grain must be MACRO + BUNDLED_MOVES: ${candidateId}`
  );
}

const forcingBridgeCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-BRIDGE-002");
expect(
  forcingBridgeCalibration?.referenceScale === "MACRO" &&
  forcingBridgeCalibration?.bundleStructure === "UNRESOLVED" &&
  forcingBridgeCalibration?.actionShape === "LABEL_ONLY",
  "A bridge label that merely conjoins method-family names must not be upgraded into BUNDLED_MOVES under strict evidence mode."
);

const deferredMixedGrainCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-BRIDGE-127");
expect(
  deferredMixedGrainCalibration?.referenceScale === "UNRESOLVED" &&
  deferredMixedGrainCalibration?.bundleStructure === "UNRESOLVED",
  "Concept/object + construction wording must fail closed to UNRESOLVED while mixed-grain CROSS_SCALE is deferred."
);
expect(
  gate3ReviewedRows.filter(x => x.referenceScale === "CROSS_SCALE").length === 1 &&
  gate3ReviewedRows.find(x => x.referenceScale === "CROSS_SCALE")?.candidateId === "RAW-SOURCE-z-crux-move",
  "Crux Move must be the only active CROSS_SCALE calibration anchor until another branch is explicitly calibrated."
);

const strictDirectProof = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-h-direct-proof");
expect(
  strictDirectProof?.referenceScale === "UNRESOLVED" &&
  strictDirectProof?.bundleStructure === "UNRESOLVED" &&
  strictDirectProof?.actionShape === "LABEL_ONLY" &&
  strictDirectProof?.triggerBoundary === "UNRESOLVED" &&
  strictDirectProof?.operationBoundary === "UNRESOLVED" &&
  strictDirectProof?.outputBoundary === "UNRESOLVED",
  "TOC-level Direct Proof plausibly has operational boundaries but strict evidence cannot determine them; use UNRESOLVED, not ABSENT."
);

const gramBridgeCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-BRIDGE-052");
expect(
  gramBridgeCalibration?.referenceScale === "UNRESOLVED" &&
  gramBridgeCalibration?.bundleStructure === "UNRESOLVED" &&
  gramBridgeCalibration?.actionShape === "LABEL_ONLY" &&
  gramBridgeCalibration?.triggerBoundary === "UNRESOLVED" &&
  gramBridgeCalibration?.operationBoundary === "UNRESOLVED" &&
  gramBridgeCalibration?.outputBoundary === "UNRESOLVED",
  "Gram-matrix viewpoint bridge label plausibly carries operational content but strict evidence cannot determine any boundary."
);

const smallCasesCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-LEGACY-small-cases");
expect(
  smallCasesCalibration?.referenceScale === "UNRESOLVED" &&
  smallCasesCalibration?.actionShape === "LABEL_ONLY" &&
  smallCasesCalibration?.triggerBoundary === "UNRESOLVED" &&
  smallCasesCalibration?.operationBoundary === "UNRESOLVED" &&
  smallCasesCalibration?.outputBoundary === "UNRESOLVED",
  "Method-like SMALL-CASES shorthand plausibly has boundaries but thin schema evidence cannot determine them."
);
const crossDomainCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-LEGACY-cross-domain");
expect(
  crossDomainCalibration?.referenceScale === "UNRESOLVED" &&
  crossDomainCalibration?.actionShape === "LABEL_ONLY" &&
  crossDomainCalibration?.triggerBoundary === "ABSENT" &&
  crossDomainCalibration?.operationBoundary === "ABSENT" &&
  crossDomainCalibration?.outputBoundary === "ABSENT",
  "CROSS-DOMAIN is a scope/relation label whose current expression is affirmatively non-operational at these boundaries."
);

const factorTacticCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-z-factor-tactic");
expect(
  factorTacticCalibration?.referenceScale === "UNRESOLVED" &&
  factorTacticCalibration?.operationBoundary === "PARTIAL" &&
  factorTacticCalibration?.outputBoundary === "UNRESOLVED",
  "Factor Tactic must not import the richer source treatment beyond the attached naming/development fact."
);

// ABSENT vs UNRESOLVED calibration on comparable thin-evidence labels.
// Broad subject/category labels are affirmatively non-operational at this grain.
for (const candidateId of [
  "RAW-SECONDARY-graph",
  "RAW-SECONDARY-ode",
  "RAW-SOURCE-p-groups",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.triggerBoundary === "ABSENT" &&
    row?.operationBoundary === "ABSENT" &&
    row?.outputBoundary === "ABSENT",
    `Broad non-operational label must use ABSENT boundaries: ${candidateId}`
  );
}
// Method/theorem/lemma/viewpoint labels plausibly carry boundaries, but strict
// candidate-owned evidence cannot determine them.
for (const candidateId of [
  "RAW-SOURCE-h-direct-proof",
  "RAW-SOURCE-p-crt",
  "RAW-ROUTE-004",
  "RAW-BRIDGE-052",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.triggerBoundary === "UNRESOLVED" &&
    row?.operationBoundary === "UNRESOLVED" &&
    row?.outputBoundary === "UNRESOLVED",
    `Plausibly operational thin-evidence label must use UNRESOLVED boundaries: ${candidateId}`
  );
}


// contextReach measures semantic dependence, never provenance alone.
for (const candidateId of [
  "RAW-SECONDARY-graph",
  "RAW-SOURCE-e-graph-theory",
  "RAW-SOURCE-p-groups",
  "RAW-SOURCE-p-crt",
  "RAW-SOURCE-p-counting-strategies",
  "RAW-ROUTE-029",
  "RAW-OFFICIAL-048",
  "RAW-OFFICIAL-095",
  "RAW-OFFICIAL-107",
]) {
  expect(
    gate3ReviewedRows.find(x => x.candidateId === candidateId)?.contextReach === "GENERAL",
    `Generic mathematical wording must remain GENERAL regardless of source provenance: ${candidateId}`
  );
}
for (const candidateId of [
  "RAW-SOURCE-z-strategy-term",
  "RAW-SOURCE-z-tactic-term",
  "RAW-SOURCE-z-tool-term",
  "RAW-SOURCE-z-crux-move",
]) {
  expect(
    gate3ReviewedRows.find(x => x.candidateId === candidateId)?.contextReach === "SOURCE_LOCAL",
    `Source-authored taxonomy/role meaning must remain SOURCE_LOCAL: ${candidateId}`
  );
}
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-ROUTE-004")?.contextReach === "PROBLEM_LOCAL" &&
  gate3ReviewedRows.find(x => x.candidateId === "RAW-OFFICIAL-115")?.contextReach === "PROBLEM_LOCAL",
  "PROBLEM_LOCAL must be exercised by wording whose semantics actually depend on the attached historical problem context."
);

const crtCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-p-crt");
expect(
  crtCalibration?.referenceScale === "UNRESOLVED" &&
  crtCalibration?.bundleStructure === "UNRESOLVED" &&
  crtCalibration?.actionShape === "LABEL_ONLY" &&
  crtCalibration?.triggerBoundary === "UNRESOLVED" &&
  crtCalibration?.operationBoundary === "UNRESOLVED" &&
  crtCalibration?.outputBoundary === "UNRESOLVED",
  "Strict candidate-owned evidence mode must keep CRT operational grain unresolved when its attached Gate-2 evidence is only TOC-level source terminology."
);

const lowConfidenceCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-OFFICIAL-048");
expect(
  lowConfidenceCalibration?.confidence === "LOW" &&
  lowConfidenceCalibration?.referenceScale === "DEPLOYABLE" &&
  lowConfidenceCalibration?.actionShape === "IMPLICIT_ACTION",
  "LOW confidence must be exercised only on an evidence-supported but genuinely ambiguous assessment."
);

for (const candidateId of [
  "RAW-OFFICIAL-048",
  "RAW-OFFICIAL-073",
  "RAW-OFFICIAL-103",
  "RAW-OFFICIAL-127",
]) {
  expect(
    gate3ReviewedRows.find(x => x.candidateId === candidateId)?.actionShape === "IMPLICIT_ACTION",
    `Noun-like/compressed official candidate must remain IMPLICIT_ACTION under lexical actionShape semantics: ${candidateId}`
  );
}
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-ROUTE-029")?.actionShape === "EXPLICIT_ACTION",
  "Imperative/verb-phrase calibration anchor must remain EXPLICIT_ACTION."
);

// Exact allowlist schema must fail closed both after construction and at the
// actual assessed({...}) authoring entry point used by the mass pass.
const gate3SchemaProbe = { ...gate3ReviewedRows[0], difficulty: "HARD" };
let gate3UnknownKeyRejected = false;
try {
  validateGate3GranularityRecord(gate3SchemaProbe);
} catch {
  gate3UnknownKeyRejected = true;
}
expect(gate3UnknownKeyRejected, "Gate-3 exported-record schema must reject arbitrary unknown keys.");

let gate3AuthoringUnknownKeyRejected = false;
try {
  buildGate3AssessedCalibration({
    candidateId: "SCHEMA-PROBE",
    referenceScale: "UNRESOLVED",
    bundleStructure: "UNRESOLVED",
    actionShape: "UNRESOLVED",
    contextReach: "UNRESOLVED",
    triggerBoundary: "UNRESOLVED",
    operationBoundary: "UNRESOLVED",
    outputBoundary: "UNRESOLVED",
    confidence: "HIGH",
    rationale: "This regression probe exists only to verify that the assessed authoring helper rejects unknown keys before destructuring.",
    difficulty: "HARD",
  });
} catch {
  gate3AuthoringUnknownKeyRejected = true;
}
expect(
  gate3AuthoringUnknownKeyRejected,
  "Gate-3 assessed({...}) authoring helper must reject unknown keys before destructuring."
);

// Graduation-review regressions for systemic classifier shortcuts found in
// independent review 5406340053.

// G3-M01: opaque secondary vocabulary tokens must not become mathematical MACRO
// calls merely because of their origin/provenance.
for (const candidateId of [
  "RAW-SECONDARY-poly",
  "RAW-SECONDARY-la",
  "RAW-SECONDARY-cx",
  "RAW-SECONDARY-ff",
  "RAW-SECONDARY-fe",
  "RAW-SECONDARY-ineq",
  "RAW-SECONDARY-rec",
  "RAW-SECONDARY-gf",
  "RAW-SECONDARY-const",
  "RAW-SECONDARY-asym",
  "RAW-SECONDARY-int",
  "RAW-SECONDARY-mod",
  "RAW-SECONDARY-dio",
  "RAW-SECONDARY-val",
  "RAW-SECONDARY-gcd",
  "RAW-SECONDARY-euclid",
  "RAW-SECONDARY-cond",
  "RAW-SECONDARY-expect",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(row, `Missing opaque secondary regression row: ${candidateId}`);
  expect(
    row.referenceScale === "UNRESOLVED" &&
    row.contextReach === "UNRESOLVED",
    `Opaque secondary token must fail closed under strict evidence mode: ${candidateId}`
  );
}

// G3-M02: concrete lexical false positives / self-overlap / trigger prepositions.
const setTheoryRow = gate3ReviewedRows.find(x => x.candidateName === "Set Theory and Combinatorics of Sets");
expect(
  setTheoryRow?.actionShape === "LABEL_ONLY" &&
  setTheoryRow?.referenceScale === "MACRO",
  "Set Theory heading must not be parsed as imperative SET."
);
for (const candidateId of [
  "RAW-LEGACY-factorization",
  "RAW-LEGACY-construction",
  "RAW-SOURCE-p-factorization-divisibility",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.referenceScale !== "DEPLOYABLE",
    `Thin noun heading must not manufacture DEPLOYABLE from overlapping operation/result token: ${candidateId}`
  );
}
const searchPatternRow = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-p-search-pattern");
expect(
  searchPatternRow?.triggerBoundary === "UNRESOLVED",
  "Search for a Pattern must not treat grammatical 'for' as a trigger condition."
);

// G3-M06: accepted explicit-target trigger semantics. The frozen calibration
// says the object in "Diagonalize a 2-by-2 Polynomial Matrix" supplies a CLEAR
// trigger. The richer official duplicate must not weaken that trigger.
const diagonalizeCalibration = gate3ReviewedRows.find(x => x.candidateId === "RAW-ROUTE-029");
const diagonalizeOfficial = gate3ReviewedRows.find(x => x.candidateId === "RAW-OFFICIAL-091");
expect(
  diagonalizeCalibration?.candidateName === diagonalizeOfficial?.candidateName &&
  diagonalizeCalibration?.triggerBoundary === "CLEAR" &&
  diagonalizeOfficial?.triggerBoundary === "CLEAR",
  "Official Diagonalize-a-2-by-2-Polynomial-Matrix row must preserve the accepted lexical object-as-trigger semantics."
);
expect(
  diagonalizeOfficial?.actionShape === "EXPLICIT_ACTION",
  "Official Diagonalize-a-2-by-2-Polynomial-Matrix row must remain EXPLICIT_ACTION."
);

// G3-M03 + G3-M05: exhaustive candidate-expression bundle audit.
//
// Surface every MASS candidate whose current expression visibly contains
// multiple operation heads joined by and/plus/then/slash. Every surfaced row
// must have exactly one explicit decision. This closes both the old proof-step
// over-bundling and the one-ID-allowlist under-bundling.
// Synthetic near-miss probes test parser generalization without mutating the
// fixed 661 raw candidates or their accepted evidence records.
const syntheticActionEvidence = (name, id) => {
  const recordId = `SYN-E-${id}`;
  return buildGate3MassAssessment(
    { candidateId: id, candidateName: name, evidenceRecordIds: [recordId] },
    [{ candidateId: id, recordId, claim: `The source index names ${name}.`,
       evidenceBasis: "SOURCE_FACT", recordChannel: "NONE",
       claimKind: "SOURCE_TERMINOLOGY", verificationStatus: "VERIFIED" }]
  );
};
for (const name of ["Define a Function", "Factor a Polynomial", "Construct a Polynomial Matrix"]) {
  const row = syntheticActionEvidence(name, `SYN-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`);
  expect(row.actionShape === "EXPLICIT_ACTION" && row.triggerBoundary === "UNRESOLVED",
    `Created/generic mathematical target cannot serve as a lexical trigger: ${name}`);
}
expect(
  syntheticActionEvidence("Diagonalize a 2-by-2 Polynomial Matrix", "SYN-diagonalize").triggerBoundary === "CLEAR",
  "A constrained existing input must preserve accepted diagonalization trigger semantics."
);

// G3-M09: destination/result nouns may not masquerade as triggers.
for (const name of ["Reduce a Problem to a Finite Graph",
  "Translate a Recurrence into a Polynomial Matrix",
  "Eliminate a Variable to Obtain a Symmetric Matrix"]) {
  const row = syntheticActionEvidence(name, "SYN-OUTPUT-"+name.toLowerCase().replace(/[^a-z]+/g,"-"));
  expect(row.actionShape === "EXPLICIT_ACTION" && row.triggerBoundary === "UNRESOLVED",
    "Result representation incorrectly read as input trigger: "+name);
}
for (const name of ["Translate a Symmetric Matrix into a Graph",
  "Reduce a 2-by-2 Polynomial Matrix to a Graph",
  "Diagonalize a 2-by-2 Polynomial Matrix to Obtain Eigenvalues"]) {
  expect(syntheticActionEvidence(name,"SYN-INPUT-"+name.toLowerCase().replace(/[^a-z]+/g,"-")).triggerBoundary === "CLEAR",
    "Pre-destination constrained input must remain CLEAR: "+name);
}
// G3-M10: use only candidate-owned accepted evidence and its literal spans.
const ownedGate3Pair = id => {
  const candidate = ARSENAL_GATE2_RAW_CANDIDATES.find(c=>c.candidateId===id);
  const evidenceRecords = ARSENAL_GATE2_RAW_EVIDENCE.filter(e=>e.candidateId===id);
  expect(candidate && evidenceRecords.length, "Missing accepted owned evidence: "+id);
  return {candidate,evidenceRecords};
};
const rephraseOwnedClaim = (id,before,after) => {
  const {candidate,evidenceRecords}=ownedGate3Pair(id);
  const variants=evidenceRecords.map(e=>{
    expect(e.claim.includes(before),"Missing claim phrase: "+id+"/"+before);
    return {...e,claim:e.claim.replace(before,after)};
  });
  return buildGate3MassAssessment(candidate,variants);
};
for(const [id,key] of [["RAW-OFFICIAL-052","outputBoundary"],
  ["RAW-OFFICIAL-051","outputBoundary"],
  ["RAW-OFFICIAL-117","triggerBoundary"],["RAW-OFFICIAL-117","outputBoundary"],
  ["RAW-SOURCE-v-unique-existence","outputBoundary"]]) {
  expect(gate3ReviewedRows.find(x=>x.candidateId===id)?.[key]==="CLEAR",
    "Explicitly attested condition/result was lost: "+id+"/"+key);
}
expect(rephraseOwnedClaim("RAW-OFFICIAL-052","to obtain boundedness","and obtains boundedness").outputBoundary==="CLEAR",
  "Boundedness should survive semantic rephrasing.");
expect(rephraseOwnedClaim("RAW-OFFICIAL-117","Once the graph core","When the graph core").triggerBoundary==="CLEAR",
  "Once/When condition should remain a CLEAR trigger.");
expect(rephraseOwnedClaim("RAW-OFFICIAL-110","positive discriminant","discriminant greater than zero").triggerBoundary==="CLEAR",
  "Positive/greater-than-zero discriminant condition should remain a CLEAR trigger.");
for(const [id,role,span] of [["RAW-OFFICIAL-052","output","to obtain boundedness"],
  ["RAW-OFFICIAL-117","trigger","Once the graph core"],
  ["RAW-OFFICIAL-117","output","to block diagonal form"],
  ["RAW-SOURCE-v-unique-existence","output","into existence and uniqueness obligations"]]) {
  const witnesses=gate3ClaimBoundaryWitnesses(ownedGate3Pair(id).evidenceRecords);
  expect(witnesses.some(w=>(w[role]??"").includes(span)),"Missing literal role span: "+id+"/"+role);
}
expect(gate3ClaimBoundaryWitnesses([{recordId:"SYN-INDEX",claim:"Index names a way to obtain boundedness",
  evidenceBasis:"SOURCE_FACT",verificationStatus:"VERIFIED",claimKind:"SOURCE_TERMINOLOGY",recordChannel:"NONE"}]).length===0,
  "Source-index terminology must not become an operational result.");
// G3-M12: "the recurrence" in a Battle description identifies the source
// input, not a PROBLEM_LOCAL mathematical dependence of a reusable method.
for (const id of ["RAW-OFFICIAL-012", "RAW-OFFICIAL-038"]) {
  expect(gate3ReviewedRows.find(r=>r.candidateId===id)?.contextReach==="GENERAL",
    "Historical recurrence wording must not force problem-local reach: "+id);
}
for (const id of ["RAW-OFFICIAL-044", "RAW-OFFICIAL-115"]) {
  expect(gate3ReviewedRows.find(r=>r.candidateId===id)?.contextReach==="PROBLEM_LOCAL",
    "Genuine candidate-and-claim-local method must remain problem-local: "+id);
}
expect(rephraseOwnedClaim("RAW-OFFICIAL-012","from the recurrence","from a recurrence").contextReach==="GENERAL",
  "Changing definite/indefinite recurrence article must not alter generality.");
expect(rephraseOwnedClaim("RAW-OFFICIAL-038","the recurrence","a recurrence").contextReach==="GENERAL",
  "An official recurrence source is not a locality trigger.");

// G3-M13: evidence-owned mathematical-result roles, not a finite list of
// target theorem names. Paraphrase variants retain meaning and boundary.
for(const id of ["RAW-OFFICIAL-031","RAW-OFFICIAL-045","RAW-OFFICIAL-048"]) {
  expect(gate3ReviewedRows.find(r=>r.candidateId===id)?.outputBoundary==="CLEAR",
    "Verified explicit relational result missed: "+id);
}
for(const [id,oldText,newText] of [
  ["RAW-OFFICIAL-031","is equivalent to vanishing of its gradient","holds exactly when its gradient vanishes"],
  ["RAW-OFFICIAL-045","proves the correspondence is reversible","establishes a bijection between histories and subsets"],
  ["RAW-OFFICIAL-048","identifies a quotient","models a quotient"],
]) {
  expect(rephraseOwnedClaim(id,oldText,newText).outputBoundary==="CLEAR",
    "Equivalent evidence-owned result wording must stay CLEAR: "+id);
}
for(const id of ["RAW-OFFICIAL-031","RAW-OFFICIAL-045","RAW-OFFICIAL-048"]) {
  const spans=gate3ClaimBoundaryWitnesses(ownedGate3Pair(id).evidenceRecords);
  expect(spans.some(x=>x.output && x.output.length>=12),
    "Missing source-literal mathematical result witness: "+id);
}
expect(gate3ClaimBoundaryWitnesses([{
  recordId:"SYN-THIN-RELATION",claim:"The source index names a reversible correspondence and an equivalence.",
  evidenceBasis:"SOURCE_FACT",verificationStatus:"VERIFIED",claimKind:"SOURCE_TERMINOLOGY",recordChannel:"NONE"
}]).length===0,"Terminology may not manufacture a verified result relation.");

// G3-M14: an attested existing premise is a trigger even without "if/when".
expect(gate3ReviewedRows.find(r=>r.candidateId==="RAW-OFFICIAL-052")?.triggerBoundary==="CLEAR",
  "Integrability on compact intervals is an explicit owned input premise.");
expect(rephraseOwnedClaim("RAW-OFFICIAL-052",
  "first uses Riemann integrability on compact intervals to obtain boundedness",
  "assuming Riemann integrability on compact intervals, it obtains boundedness").triggerBoundary==="CLEAR",
  "A mathematically equivalent assumption clause must preserve the trigger.");
// G3-M11: every newly identified imperative in the fixed mass population.
for(const id of ["RAW-OFFICIAL-002","RAW-OFFICIAL-003","RAW-OFFICIAL-088","RAW-OFFICIAL-091"]) {
  expect(massRows.find(x=>x.candidateId===id)?.actionShape==="EXPLICIT_ACTION",
    "Imperative action misclassified: "+id);
}
for(const name of ["Perturb Away Degeneracies","Track Parity Under Continuous Deformation"]) {
  expect(syntheticActionEvidence(name,"SYN-ACTION-"+name.toLowerCase().replace(/[^a-z]+/g,"-")).actionShape==="EXPLICIT_ACTION",
    "Missed syntactically imperative name: "+name);
}
expect(syntheticActionEvidence("Use of a Matrix","SYN-USE-OF").actionShape==="LABEL_ONLY",
  "Use of a Matrix is a noun phrase, not an imperative.");
expect(gate3ReviewedRows.find(x=>x.candidateName==="Set Theory and Combinatorics of Sets")?.actionShape==="LABEL_ONLY",
  "Set Theory heading must remain noun-shaped.");
// G3-M08: object being defined is output, not a recognizable input trigger.
const defineFunctionRow = gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-z-define-function");
expect(defineFunctionRow?.actionShape === "EXPLICIT_ACTION" && defineFunctionRow?.triggerBoundary === "UNRESOLVED",
  "Define a Function must be explicit but have UNRESOLVED trigger; its output noun is not a situation.");
expect(gate3ReviewedRows.find(x => x.candidateId === "RAW-BRIDGE-080")?.actionShape === "IMPLICIT_ACTION",
  "Difference-variable trapping/refinement must be action-shaped, not LABEL_ONLY.");
const massCandidateIds = new Set(massRows.map(row => row.candidateId));
const surfacedMassBundleIds = ARSENAL_GATE2_RAW_CANDIDATES
  .filter(candidate => massCandidateIds.has(candidate.candidateId))
  .filter(surfaceGate3MassBundleCandidate)
  .map(candidate => candidate.candidateId)
  .sort();

const bundleDecisionIds = ARSENAL_GATE3_MASS_BUNDLE_DECISIONS
  .map(row => row.candidateId);
expect(
  new Set(bundleDecisionIds).size === bundleDecisionIds.length,
  "Mass bundle audit decision IDs must be unique."
);
const bundleDecisionById = new Map(
  ARSENAL_GATE3_MASS_BUNDLE_DECISIONS.map(row => [row.candidateId, row])
);
for (const candidateId of surfacedMassBundleIds) {
  expect(
    bundleDecisionById.has(candidateId),
    `Surfaced multi-operation mass expression lacks an explicit bundle decision: ${candidateId}`
  );
}
expect(
  JSON.stringify([...bundleDecisionIds].sort()) === JSON.stringify(surfacedMassBundleIds),
  "High-recall bundle decisions must equal all surfaced candidate IDs, with no extras or omissions."
);
expect(
  ARSENAL_GATE3_MASS_BUNDLE_DECISIONS.some(x => x.decision === "NOT_BUNDLE") &&
  ARSENAL_GATE3_MASS_BUNDLE_DECISIONS.some(x => x.decision === "BUNDLE"),
  "Bundle audit must exercise both positive and negative decisions."
);
for (const decision of ARSENAL_GATE3_MASS_BUNDLE_DECISIONS) {
  expect(
    massCandidateIds.has(decision.candidateId),
    `Mass bundle audit decision references non-mass candidate: ${decision.candidateId}`
  );
  expect(
    decision.decision === "BUNDLE" || decision.decision === "NOT_BUNDLE",
    `Every mass bundle decision must be explicitly BUNDLE or NOT_BUNDLE: ${decision.candidateId}`
  );
  expect(
    typeof decision.rationale === "string" && decision.rationale.length > 100,
    `Mass bundle audit decision needs substantive rationale: ${decision.candidateId}`
  );
}

// The three missed bundles from independent review 5436149362 are now pinned.
for (const candidateId of [
  "RAW-BRIDGE-040",
  "RAW-BRIDGE-053",
  "RAW-BRIDGE-063",
  "RAW-BRIDGE-072",
  "RAW-BRIDGE-080",
  "RAW-OFFICIAL-088",
  "RAW-OFFICIAL-093",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.referenceScale === "MACRO" &&
    row?.bundleStructure === "BUNDLED_MOVES",
    `Candidate-level bundle must be MACRO + BUNDLED_MOVES: ${candidateId}`
  );
}
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-OFFICIAL-088")?.actionShape === "EXPLICIT_ACTION",
  "Extend a Vector to a Basis and Count Free Images must be EXPLICIT_ACTION."
);

// The previously accepted mass bundle remains preserved.
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-OFFICIAL-098")?.bundleStructure === "BUNDLED_MOVES",
  "One-Variable Root Factorization plus Antisymmetry must remain a mass bundle."
);

// Later proof steps still must not promote the candidate itself into a bundle.
for (const candidateId of ARSENAL_GATE3_REJECTED_BUNDLE_SHORTCUT_IDS) {
  expect(
    gate3ReviewedRows.find(x => x.candidateId === candidateId)?.bundleStructure !== "BUNDLED_MOVES",
    `Later proof steps must not promote candidate to BUNDLED_MOVES: ${candidateId}`
  );
}

const expectedAllBundleIds = [
  // accepted 45-row calibration bundles
  "RAW-BRIDGE-070",
  "RAW-OFFICIAL-095",
  "RAW-OFFICIAL-107",
  "RAW-SOURCE-h-combining-techniques",
  // exhaustive mass candidate-expression audit bundles
  "RAW-BRIDGE-040",
  "RAW-BRIDGE-053",
  "RAW-BRIDGE-063",
  "RAW-BRIDGE-072",
  "RAW-BRIDGE-080",
  "RAW-OFFICIAL-088",
  "RAW-OFFICIAL-093",
  "RAW-OFFICIAL-098",
].sort();
expect(
  JSON.stringify(
    gate3ReviewedRows.filter(x => x.bundleStructure === "BUNDLED_MOVES")
      .map(x => x.candidateId).sort()
  ) === JSON.stringify(expectedAllBundleIds),
  "Final BUNDLED_MOVES set must equal the four accepted calibration bundles plus eight audited mass candidate-expression bundles."
);

// G3-M04: contextReach is semantic, not fallback-GENERAL.
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-e-great-ideas")?.contextReach === "SOURCE_LOCAL",
  "Engel Great Ideas must be SOURCE_LOCAL from its author-specific classification evidence."
);
expect(
  gate3ReviewedRows.find(x => x.candidateId === "RAW-SOURCE-z-crossover-tactic")?.contextReach === "SOURCE_LOCAL",
  "Zeitz Crossover Tactic must be SOURCE_LOCAL from its author-specific definition evidence."
);
for (const candidateId of [
  "RAW-SECONDARY-poly",
  "RAW-SECONDARY-la",
  "RAW-SECONDARY-cx",
]) {
  expect(
    gate3ReviewedRows.find(x => x.candidateId === candidateId)?.contextReach === "UNRESOLVED",
    `Opaque token context reach must not default to GENERAL: ${candidateId}`
  );
}

// Mass-pass review statistics: deterministic and printed for the graduation reviewer.
const gate3CountBy = key => Object.fromEntries(
  [...new Set(gate3ReviewedRows.map(row => row[key]))]
    .sort()
    .map(value => [value, gate3ReviewedRows.filter(row => row[key] === value).length])
);
const gate3Origins = [...new Set(gate3ReviewedRows.map(row => row.origin))].sort();
const gate3ByOrigin = Object.fromEntries(
  gate3Origins.map(origin => {
    const rows = gate3ReviewedRows.filter(row => row.origin === origin);
    return [origin, {
      total: rows.length,
      referenceScale: Object.fromEntries(
        [...new Set(rows.map(row => row.referenceScale))].sort()
          .map(value => [value, rows.filter(row => row.referenceScale === value).length])
      ),
      actionShape: Object.fromEntries(
        [...new Set(rows.map(row => row.actionShape))].sort()
          .map(value => [value, rows.filter(row => row.actionShape === value).length])
      ),
      contextReach: Object.fromEntries(
        [...new Set(rows.map(row => row.contextReach))].sort()
          .map(value => [value, rows.filter(row => row.contextReach === value).length])
      ),
    }];
  })
);
const gate3RuleUsage = Object.fromEntries(
  ARSENAL_GATE3_MASS_CLASSIFIER_META.ruleIds.map(ruleId => [
    ruleId,
    massRows.filter(row => row.rationale.startsWith(ruleId)).length,
  ])
);
expect(
  JSON.stringify(gate3RuleUsage) === JSON.stringify(ARSENAL_GATE3_MASS_RULE_USAGE),
  "Gate-3 exported mass-rule usage report drifted from validator recomputation."
);
expect(
  ARSENAL_GATE3_MASS_AUDIT_META.totalRows === 661 &&
  ARSENAL_GATE3_MASS_AUDIT_META.calibrationRows === 45 &&
  ARSENAL_GATE3_MASS_AUDIT_META.massRows === 616,
  "Gate-3 mass audit metadata must preserve the accepted 45 + 616 = 661 partition."
);
expect(
  ARSENAL_GATE3_MASS_AUDIT_META.activeCrossScaleRows === 1,
  "Gate-3 mass audit must report exactly one active CROSS_SCALE sentinel."
);
expect(
  ARSENAL_GATE3_MASS_AUDIT_META.unresolvedScaleRows === gate3ReviewedRows.filter(row => row.referenceScale === "UNRESOLVED").length,
  "Gate-3 unresolved-scale audit count drifted."
);
expect(
  ARSENAL_GATE3_DUPLICATE_NAME_AUDIT.length === ARSENAL_GATE2_DUPLICATE_NAME_GROUPS.length,
  "Every Gate-2 duplicate-name group must appear in the Gate-3 consistency audit."
);
expect(
  ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES.every(group =>
    group.rows.length > 1 &&
    group.classificationSignatures.length > 1
  ),
  "Gate-3 duplicate-name difference report contains a non-difference."
);

expect(
  Object.values(gate3RuleUsage).reduce((sum, count) => sum + count, 0) === 616,
  "Mass-pass rule usage must account for all 616 classified rows."
);

console.log("GATE3_V6_DISTRIBUTION_DIAGNOSTIC", JSON.stringify({
  referenceScale: gate3CountBy("referenceScale"),
  bundleStructure: gate3CountBy("bundleStructure"),
  actionShape: gate3CountBy("actionShape"),
  contextReach: gate3CountBy("contextReach"),
  triggerBoundary: gate3CountBy("triggerBoundary"),
  operationBoundary: gate3CountBy("operationBoundary"),
  outputBoundary: gate3CountBy("outputBoundary"),
  confidence: gate3CountBy("confidence"),
  ruleUsage: gate3RuleUsage,
  differingDuplicateGroups: ARSENAL_GATE3_MASS_AUDIT_META.duplicateNameGroupsWithDifferentSignatures,
}));

const EXPECTED_GATE3_MASS_DISTRIBUTION = Object.freeze({
  referenceScale: Object.freeze({ CROSS_SCALE: 1, DEPLOYABLE: 189, MACRO: 93, MICRO: 1, UNRESOLVED: 377 }),
  bundleStructure: Object.freeze({ BUNDLED_MOVES: 12, SINGLE_PRIMARY_MOVE: 190, UNRESOLVED: 459 }),
  actionShape: Object.freeze({ EXPLICIT_ACTION: 55, IMPLICIT_ACTION: 236, LABEL_ONLY: 369, UNRESOLVED: 1 }),
  contextReach: Object.freeze({ GENERAL: 443, PROBLEM_LOCAL: 7, SOURCE_LOCAL: 6, UNRESOLVED: 205 }),
  triggerBoundary: Object.freeze({ ABSENT: 82, CLEAR: 50, PARTIAL: 10, UNRESOLVED: 519 }),
  operationBoundary: Object.freeze({ ABSENT: 82, CLEAR: 181, PARTIAL: 110, UNRESOLVED: 288 }),
  outputBoundary: Object.freeze({ ABSENT: 81, CLEAR: 102, PARTIAL: 55, UNRESOLVED: 423 }),
  confidence: Object.freeze({ HIGH: 616, LOW: 1, MEDIUM: 44 }),
  ruleUsage: Object.freeze({ MP01: 39, MP02: 8, MP03: 112, MP04: 14, MP05: 12, MP06: 25, MP07: 9, MP08: 177, MP09: 31, MP10: 189 }),
});

for (const key of [
  "referenceScale",
  "bundleStructure",
  "actionShape",
  "contextReach",
  "triggerBoundary",
  "operationBoundary",
  "outputBoundary",
  "confidence",
]) {
  expect(
    JSON.stringify(gate3CountBy(key)) === JSON.stringify(EXPECTED_GATE3_MASS_DISTRIBUTION[key]),
    `Gate-3 v6 repaired mass-pass distribution drifted for ${key}`
  );
}
expect(
  JSON.stringify(gate3RuleUsage) === JSON.stringify(EXPECTED_GATE3_MASS_DISTRIBUTION.ruleUsage),
  "Gate-3 v6 repaired mass-pass rule distribution drifted."
);
expect(
  ARSENAL_GATE3_MASS_AUDIT_META.duplicateNameGroupsWithDifferentSignatures === 13,
  "Gate-3 v4 duplicate-name differing-signature count drifted."
);
expect(
  ARSENAL_GATE3_MASS_AUDIT_META.officialUnresolvedScaleRows === 3,
  "Gate-3 v4 official UNRESOLVED count must remain exactly three."
);

// Lexical-action regressions that were explicitly self-audited before handoff.
for (const candidateId of [
  "RAW-SOURCE-z-define-function",
  "RAW-SOURCE-z-order-from-chaos",
  "RAW-SOURCE-p-search-pattern",
  "RAW-SOURCE-h-prove-membership",
]) {
  const row = gate3ReviewedRows.find(x => x.candidateId === candidateId);
  expect(
    row?.referenceScale === "DEPLOYABLE" && row?.actionShape === "EXPLICIT_ACTION",
    `Explicit-action mass-pass regression: ${candidateId}`
  );
}

console.log("Gate 3 bundled audit:", JSON.stringify(ARSENAL_GATE3_BUNDLED_AUDIT));
console.log("Gate 3 extreme-scale audit:", JSON.stringify(ARSENAL_GATE3_EXTREME_SCALE_AUDIT));
console.log("Gate 3 low-confidence audit:", JSON.stringify(ARSENAL_GATE3_LOW_CONFIDENCE_AUDIT));
console.log("Gate 3 official unresolved audit:", JSON.stringify(ARSENAL_GATE3_OFFICIAL_UNRESOLVED_AUDIT));
console.log("Gate 3 review sentinels:", JSON.stringify(ARSENAL_GATE3_REVIEW_SENTINELS));
console.log("Gate 3 fallback audit:", JSON.stringify(ARSENAL_GATE3_FALLBACK_AUDIT));
console.log("Gate 3 duplicate-name audit:", JSON.stringify({
  groups: ARSENAL_GATE3_DUPLICATE_NAME_AUDIT.length,
  differingGroups: ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES.length,
  differences: ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES,
}));
console.log("Gate 3 exported distribution:", JSON.stringify(ARSENAL_GATE3_MASS_PASS_DISTRIBUTION));

console.log("Gate 3 mass-pass summary:", JSON.stringify({
  total: gate3ReviewedRows.length,
  calibrationRows: calibrationRows.length,
  massRows: massRows.length,
  referenceScale: gate3CountBy("referenceScale"),
  bundleStructure: gate3CountBy("bundleStructure"),
  actionShape: gate3CountBy("actionShape"),
  contextReach: gate3CountBy("contextReach"),
  triggerBoundary: gate3CountBy("triggerBoundary"),
  operationBoundary: gate3CountBy("operationBoundary"),
  outputBoundary: gate3CountBy("outputBoundary"),
  confidence: gate3CountBy("confidence"),
  ruleUsage: gate3RuleUsage,
  byOrigin: gate3ByOrigin,
}));

// Mechanically freeze the accepted Gate-2 ore underneath Gate 3.
//
// Layer 1: byte-level Git blob SHA-1s copied from exact accepted Gate-2 SHA
// ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7. These literals live in the
// validator rather than the mutable snapshot module, so updating the snapshot
// constant alone cannot bless changed Gate-2 files.
const ACCEPTED_GATE2_FILE_BLOBS = Object.freeze({
  "course/smmc/schema.mjs": "6d92a8f5a37b38b1ab5fb521b7e3542925920652",
  "course/smmc/arsenal/candidates-v0.mjs": "a9cbeb55a2a829a881e228be6d6b22f667baa2c7",
  "course/smmc/arsenal/ledger-bridge-candidates-v0.mjs": "c37c9c4bc749f69b8c946616ec9224f90183aa31",
  "course/smmc/arsenal/ledger-route-candidates-v0.mjs": "89c522b16b9c39ed10b02fa97a53b5262a7a8dd1",
  "course/smmc/arsenal/official-solution-candidates-v0.mjs": "1299ddf04cee2b782d7ab4490b88085bf710069c",
  "course/smmc/arsenal/official-solution-route-index-v0.mjs": "fcb59cf9e411e7a56ca5a88db4b7104dbb891170",
  "course/smmc/arsenal/source-closure-manifest-v0.mjs": "898560c151bfcc759c080f8abe64ea4a199a1ea9",
  "course/smmc/arsenal/raw-harvest-audit-v0.mjs": "18d541e9dc687032b8e968ba6b5d21e029c1450c",
  "course/smmc/arsenal/canonical-sources-v1.mjs": "4893470951d2aacd4554a4c2afee8345d0600c85",
  "course/smmc/arsenal/evidence-contract-v1.mjs": "565f72747e4901f8ea5730b23e64dddf9e60b676",
  "course/smmc/official-solution-sources-v1.mjs": "ad0b6da1856cd0c8c8aacd014baa924afe74e376",
});

for (const [path, expectedBlobSha1] of Object.entries(ACCEPTED_GATE2_FILE_BLOBS)) {
  const bytes = readFileSync(path);
  const actualBlobSha1 = createHash("sha1")
    .update(`blob ${bytes.length}\0`)
    .update(bytes)
    .digest("hex");
  expect(
    actualBlobSha1 === expectedBlobSha1,
    `Accepted Gate-2 file changed underneath Gate 3: ${path}; expected blob ${expectedBlobSha1}, got ${actualBlobSha1}`
  );
}

// Layer 2: semantic/provenance payload digest. The accepted literal is asserted
// independently of the imported snapshot value, preventing a snapshot-only
// self-update from blessing altered Gate-2 semantics.
const ACCEPTED_GATE2_SEMANTIC_SHA256 =
  "f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f";
expect(
  ARSENAL_GATE2_ACCEPTED_SNAPSHOT_V1.sha256 === ACCEPTED_GATE2_SEMANTIC_SHA256,
  "Gate-2 snapshot module digest literal drifted from the independently pinned accepted digest."
);

const gate2AcceptedPayload = {
  rawCandidates: ARSENAL_GATE2_RAW_CANDIDATES,
  rawEvidence: ARSENAL_GATE2_RAW_EVIDENCE,
  officialRouteIndex: ARSENAL_GATE2_OFFICIAL_ROUTE_INDEX,
  officialRouteMeta: ARSENAL_GATE2_OFFICIAL_ROUTE_META,
  sourceClosureRule: ARSENAL_GATE2_SOURCE_CLOSURE_RULE,
  sourceClosureZones: ARSENAL_GATE2_SOURCE_CLOSURE_ZONES,
  sourceClosureReviewedItems: ARSENAL_GATE2_SOURCE_CLOSURE_REVIEWED_ITEMS,
  sourceClosureMeta: ARSENAL_GATE2_SOURCE_CLOSURE_META,
};
const gate2AcceptedDigest = createHash("sha256")
  .update(JSON.stringify(gate2AcceptedPayload))
  .digest("hex");
expect(
  gate2AcceptedDigest === ACCEPTED_GATE2_SEMANTIC_SHA256,
  `Accepted Gate-2 semantic/provenance payload mutated underneath Gate 3: expected ${ACCEPTED_GATE2_SEMANTIC_SHA256}, got ${gate2AcceptedDigest}`
);
expect(
  ARSENAL_GATE2_ACCEPTED_SNAPSHOT_V1.acceptedGate2Sha === ARSENAL_GATE3_ACCEPTED_GATE2_SHA &&
  ARSENAL_GATE2_ACCEPTED_SNAPSHOT_V1.preservedByMergeSha === ARSENAL_GATE3_GATE2_MERGE_SHA,
  "Gate-2 accepted snapshot anchor SHA metadata drifted."
);

expect(unitIds.size === SMMC_UNITS_V1.length, "Duplicate SMMC unit ID.");
expect(Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length === 28, "Expected twenty-eight authored public problems.");
expect(Object.keys(SMMC_EVALUATOR_V1).length === 28, "Expected twenty-eight authored evaluator references.");

for (const unit of SMMC_UNITS_V1) {
  expect(moduleIds.has(unit.moduleId), `Unknown module for ${unit.id}`);
  expect(["method", "bridge", "foundation"].includes(unit.kind), `Bad unit kind for ${unit.id}`);
  expect(Array.isArray(unit.t25Targets), `Missing T25 prerequisites for ${unit.id}`);
  expect(typeof unit.learningNote === "string" && unit.learningNote.length > 120, `Weak learning note for ${unit.id}`);
  expect(SMMC_PUBLIC_PROBLEMS_V1[unit.mainTaskId], `Missing main problem for ${unit.id}`);
  expect(SMMC_PUBLIC_PROBLEMS_V1[unit.transferTaskId], `Missing transfer problem for ${unit.id}`);
  expect(SMMC_EVALUATOR_V1[unit.mainTaskId], `Missing main evaluator for ${unit.id}`);
  expect(SMMC_EVALUATOR_V1[unit.transferTaskId], `Missing transfer evaluator for ${unit.id}`);
}

for (const [id, problem] of Object.entries(SMMC_PUBLIC_PROBLEMS_V1)) {
  expect(problem.id === id, `Public problem key/id mismatch for ${id}`);
  expect(unitIds.has(problem.unitId), `Unknown unit for public problem ${id}`);
  expect(["main", "transfer"].includes(problem.role), `Bad role for ${id}`);
  expect(typeof problem.prompt === "string" && problem.prompt.length > 40, `Weak prompt for ${id}`);
  expect(!/SMMC-20\d\d-[ABC][1-4]/.test(problem.prompt), `Historical problem identifier leaked into ${id}`);
  expect(!/Simon Marais/i.test(problem.prompt), `Historical source name leaked into neutral prompt ${id}`);
}

for (const [id, ref] of Object.entries(SMMC_EVALUATOR_V1)) {
  expect(SMMC_PUBLIC_PROBLEMS_V1[id], `Evaluator has no public task: ${id}`);
  expect(typeof ref.reference === "string" && ref.reference.length > 80, `Weak evaluator reference for ${id}`);
  expect(Array.isArray(ref.rubric) && ref.rubric.length > 0, `Missing rubric for ${id}`);
}

for (const [problemId, required] of Object.entries(SMMC_REQUIREMENTS_V1)) {
  expect(problemIds.has(problemId), `Requirement map references unknown problem ${problemId}`);
  const problem = ledger.find(x => x.id === problemId);
  expect(problem.overlap !== "green", `GREEN problem ${problemId} should not require SMMC bridge completion`);
  expect(Array.isArray(required) && required.length > 0, `Empty requirement row for ${problemId}`);
  for (const unitId of required) {
    expect(unitIds.has(unitId), `Unknown authored unit ${unitId} required by ${problemId}`);
  }
}

// Exposure semantics.
const state = emptySmmcState();
const eastPaperKeys = paperKeysForLedger(ledger, { eastOnly: true });
expect(eastPaperKeys.length === 18, "Expected eighteen East A/B historical sessions.");
expect(pristinePaperKeys(state, ledger, { eastOnly: true }).length === 18, "Fresh corpus must begin with eighteen pristine East papers.");
expect(paperExposureClass(state, ledger, "2022-A").class === "pristine", "Fresh paper must be pristine.");
expect(exposureClass(state, "SMMC-2022-A1").class === "sealed", "Fresh problem must be sealed.");

markExposure(state, "SMMC-2022-A1", "domainMetadataSeenAt", "2026-09-23T12:00:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "sealed", "Planning metadata must not contaminate exposure status.");
expect(paperExposureClass(state, ledger, "2022-A").class === "pristine", "Non-hint planning metadata must not breach a paper.");

markExposure(state, "SMMC-2022-A1", "statementSeenAt", "2026-09-23T12:01:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "transfer", "Statement-only exposure should remain transfer-eligible.");
expect(exposureClass(state, "SMMC-2022-A2").class === "sealed", "Isolated statement access must not expose a sibling problem.");
expect(exposureClass(state, "SMMC-2022-B1").class === "sealed", "Isolated statement access must not spill into another paper.");
expect(paperExposureClass(state, ledger, "2022-A").class === "breached", "One isolated statement must breach, not open, its paper.");
expect(pristinePaperKeys(state, ledger, { eastOnly: true }).length === 17, "One breached East paper must leave seventeen pristine sessions.");

markExposure(state, "SMMC-2022-A1", "materialHintSeenAt", "2026-09-23T12:05:00.000Z");
expect(exposureClass(state, "SMMC-2022-A1").class === "development", "Material hint must contaminate unseen transfer.");

const wholePaper = emptySmmcState();
markPaperExposure(wholePaper, ledger, "2022-A", "paperOpenedAt", "2026-09-23T13:00:00.000Z");
expect(paperExposureClass(wholePaper, ledger, "2022-A").class === "opened", "Opening a full paper must persist an opened paper state.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(Boolean(wholePaper.exposures[problem.id]?.statementSeenAt), `Full-paper opening failed to mark ${problem.id} statement seen.`);
}
expect(exposureClass(wholePaper, "SMMC-2022-B1").class === "sealed", "Opening 2022-A must not expose 2022-B.");
expect(pristinePaperKeys(wholePaper, ledger, { eastOnly: true }).length === 17, "One opened East paper must leave seventeen pristine sessions.");

markPaperExposure(wholePaper, ledger, "2022-A", "solutionOpenedAt", "2026-09-23T13:05:00.000Z");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(exposureClass(wholePaper, problem.id).class === "development", `Full-solution exposure failed for ${problem.id}.`);
}

const paperProgress = emptySmmcState();
markPaperExposure(paperProgress, ledger, "2023-B", "attemptedAt", "2026-09-23T14:00:00.000Z");
expect(paperExposureClass(paperProgress, ledger, "2023-B").class === "attempted", "Paper attempt must outrank opened state.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2023-B")) {
  expect(Boolean(paperProgress.exposures[problem.id]?.statementSeenAt), `Paper attempt failed to mark ${problem.id} statement seen.`);
}
markPaperExposure(paperProgress, ledger, "2023-B", "arenaConsumedAt", "2026-09-23T14:05:00.000Z");
expect(paperExposureClass(paperProgress, ledger, "2023-B").class === "arena-consumed", "Arena use must be the terminal paper vault state.");

// F02: validator/merge normalization must repair semantically impossible imported/cloud states.
const openedOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {
    "SMMC-2021-A1": { statementSeenAt: "2026-09-20T09:00:00.000Z" },
  },
  papers: {
    "2021-A": { paperOpenedAt: "2026-09-20T10:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2021-A")) {
  expect(Boolean(openedOnly.exposures[problem.id]?.statementSeenAt), `paperOpenedAt did not imply statement exposure for ${problem.id}`);
}
expect(
  openedOnly.exposures["SMMC-2021-A1"].statementSeenAt === "2026-09-20T09:00:00.000Z",
  "Normalization failed to preserve an earlier existing statement timestamp."
);

const solutionOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2021-B": { solutionOpenedAt: "2026-09-20T11:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  solutionOnly.papers["2021-B"].paperOpenedAt === "2026-09-20T11:00:00.000Z",
  "solutionOpenedAt must imply paperOpenedAt."
);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2021-B")) {
  expect(solutionOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T11:00:00.000Z", `solution paper did not imply statement exposure for ${problem.id}`);
  expect(solutionOnly.exposures[problem.id]?.solutionSeenAt === "2026-09-20T11:00:00.000Z", `solution paper did not imply solution exposure for ${problem.id}`);
}

const attemptedOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2022-A": { attemptedAt: "2026-09-20T12:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(attemptedOnly.papers["2022-A"].paperOpenedAt === "2026-09-20T12:00:00.000Z", "attemptedAt must imply paperOpenedAt.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-A")) {
  expect(attemptedOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T12:00:00.000Z", `paper attempt did not imply statement exposure for ${problem.id}`);
}

const arenaOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {},
  papers: {
    "2022-B": { arenaConsumedAt: "2026-09-20T13:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(arenaOnly.papers["2022-B"].attemptedAt === "2026-09-20T13:00:00.000Z", "arenaConsumedAt must imply attemptedAt.");
expect(arenaOnly.papers["2022-B"].paperOpenedAt === "2026-09-20T13:00:00.000Z", "arenaConsumedAt must imply paperOpenedAt.");
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2022-B")) {
  expect(arenaOnly.exposures[problem.id]?.statementSeenAt === "2026-09-20T13:00:00.000Z", `arena consumption did not imply statement exposure for ${problem.id}`);
}

const historicalAttemptOnly = validateSmmcState({
  version: 1,
  attempts: [{
    id: "normalization-attempt-1",
    problemId: "SMMC-2023-A2",
    at: "2026-09-20T14:00:00.000Z",
    answer: "Historical attempt evidence.",
    assistance: "independent",
    result: "unreviewed",
    minutes: 20,
    statementSeenBefore: false,
    domainMetadataSeenBefore: false,
    materialHintSeenBefore: false,
    evaluatorSeenBefore: false,
    solutionSeenBefore: false,
  }],
  exposures: {},
  papers: {},
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  historicalAttemptOnly.exposures["SMMC-2023-A2"].statementSeenAt === "2026-09-20T14:00:00.000Z",
  "Historical attempt evidence must imply that problem statement was seen by attempt time."
);

const individualSolutionOnly = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {
    "SMMC-2024-A1": { solutionSeenAt: "2026-09-20T15:00:00.000Z" },
  },
  papers: {},
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  individualSolutionOnly.exposures["SMMC-2024-A1"].statementSeenAt === "2026-09-20T15:00:00.000Z",
  "Individual solution exposure must imply statement exposure."
);

// Merge must normalize malformed remote evidence before joining it with local state.
const normalizedRemoteMerge = mergeSmmcState(
  emptySmmcState(),
  {
    version: 1,
    attempts: [],
    exposures: {},
    papers: { "2024-B": { paperOpenedAt: "2026-09-20T16:00:00.000Z" } },
    modules: {},
    units: {},
  },
  ledger,
  [...moduleIds],
  [...unitIds]
);
for (const problem of ledger.filter(x => paperKeyForProblem(x) === "2024-B")) {
  expect(Boolean(normalizedRemoteMerge.exposures[problem.id]?.statementSeenAt), `Merged remote paper-open evidence did not normalize ${problem.id}`);
}

// G01: timestamp ordering is by absolute instant, not lexicographic ISO text.
const offsetNormalized = validateSmmcState({
  version: 1,
  attempts: [],
  exposures: {
    "SMMC-2021-A1": { statementSeenAt: "2026-09-20T09:00:00+05:30" },
  },
  papers: {
    "2021-A": { paperOpenedAt: "2026-09-20T04:00:00.000Z" },
  },
  modules: {},
  units: {},
}, ledger, [...moduleIds], [...unitIds]);
expect(
  offsetNormalized.exposures["SMMC-2021-A1"].statementSeenAt === "2026-09-20T03:30:00.000Z",
  "Validation/normalization must keep the earlier absolute instant across timezone offsets."
);
expect(
  offsetNormalized.papers["2021-A"].paperOpenedAt === "2026-09-20T04:00:00.000Z",
  "Paper timestamp canonicalization changed the represented instant."
);

const offsetMergeLocal = emptySmmcState();
offsetMergeLocal.exposures["SMMC-2022-A1"] = {
  statementSeenAt: "2026-09-20T09:00:00+05:30",
};
const offsetMergeRemote = emptySmmcState();
offsetMergeRemote.exposures["SMMC-2022-A1"] = {
  statementSeenAt: "2026-09-20T04:00:00.000Z",
};
const offsetMerged = mergeSmmcState(
  offsetMergeLocal,
  offsetMergeRemote,
  ledger,
  [...moduleIds],
  [...unitIds]
);
expect(
  offsetMerged.exposures["SMMC-2022-A1"].statementSeenAt === "2026-09-20T03:30:00.000Z",
  "Cloud merge must choose the earlier absolute instant, not the lexicographically smaller timestamp string."
);

let timezoneLessRejected = false;
try {
  validateSmmcState({
    version: 1,
    attempts: [],
    exposures: {
      "SMMC-2022-A1": { statementSeenAt: "2026-09-20T03:30:00" },
    },
    papers: {},
    modules: {},
    units: {},
  }, ledger, [...moduleIds], [...unitIds]);
} catch {
  timezoneLessRejected = true;
}
expect(
  timezoneLessRejected,
  "Timezone-less historical timestamps must be rejected so cross-device ordering is unambiguous."
);

const legacyShape = JSON.parse(JSON.stringify(wholePaper));
delete legacyShape.papers;
const legacyValidated = validateSmmcState(legacyShape, ledger, [...moduleIds], [...unitIds]);
expect(Object.keys(legacyValidated.papers).length === 0, "Legacy v1 state without paper ledger must remain import-compatible.");

const remotePaper = emptySmmcState();
markPaperExposure(remotePaper, ledger, "2022-A", "paperOpenedAt", "2026-09-23T12:55:00.000Z");
const mergedPaper = mergeSmmcState(wholePaper, remotePaper, ledger, [...moduleIds], [...unitIds]);
expect(mergedPaper.papers["2022-A"].paperOpenedAt === "2026-09-23T12:55:00.000Z", "Cloud merge must preserve earliest paper exposure.");
validateSmmcState(state, ledger, [...moduleIds], [...unitIds]);
validateSmmcState(wholePaper, ledger, [...moduleIds], [...unitIds]);

// Unlock semantics.
const green = ledger.find(x => x.id === "SMMC-2022-A1");
const greenMissing = unlockStatus(green, { clearedT25Targets: [] });
expect(greenMissing.status === "locked-t25", "GREEN problem should remain locked before T25 prerequisites.");
const greenReady = unlockStatus(green, { clearedT25Targets: green.t25Targets });
expect(greenReady.status === "ready-transfer" && greenReady.ready, "GREEN problem should unlock after T25 prerequisites.");

const amber = ledger.find(x => x.id === "SMMC-2021-A3");
const amberBlocked = unlockStatus(amber, { clearedT25Targets: amber.t25Targets });
expect(amberBlocked.status === "locked-smmc-bridge", "Mapped AMBER problem should require its bridge.");
const amberReady = unlockStatus(amber, {
  clearedT25Targets: amber.t25Targets,
  certifiedUnits: ["S-BRIDGE-GR1-U01"],
});
expect(amberReady.status === "ready-transfer" && amberReady.ready, "Mapped AMBER should unlock after bridge completion.");

const red = ledger.find(x => x.id === "SMMC-2025-A4");
const redReady = unlockStatus(red, {
  clearedT25Targets: red.t25Targets,
  certifiedUnits: ["S-BRIDGE-GR1-U01"],
});
expect(redReady.status === "requirement-map-pending" && !redReady.ready, "Unmapped RED problem must stay fail-closed.");

const pending = ledger.find(x => x.id === "SMMC-2019-A2");
const pendingStatus = unlockStatus(pending, { clearedT25Targets: pending.t25Targets });
expect(pendingStatus.status === "requirement-map-pending", "Unmapped non-GREEN problem must fail closed.");

console.log(
  `SMMC authoring v1 validation passed: ${SMMC_UNITS_V1.length} units, ` +
  `${Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length} neutral tasks, ` +
  `${Object.keys(SMMC_REQUIREMENTS_V1).length} explicit non-GREEN requirement rows.`
);
