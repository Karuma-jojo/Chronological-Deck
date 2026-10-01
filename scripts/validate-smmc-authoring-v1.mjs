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
expect(ARSENAL_GATE2_HARVEST_META.officialSolutionCandidates === 30, "Gate-2 direct official-solution candidate count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.officialSolutionEvidenceRecords === 30, "Gate-2 direct official-solution evidence count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.bookSourceCandidates === 201, "Gate-2 book-source harvest count drifted.");
expect(ARSENAL_GATE2_HARVEST_META.totalCandidates === 477, "Gate-2 raw candidate total drifted.");
expect(ARSENAL_GATE2_HARVEST_META.totalEvidenceRecords === 477, "Gate-2 raw evidence total drifted.");

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
