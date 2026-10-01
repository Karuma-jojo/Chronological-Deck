// SMMC Arsenal Gate 2 — RAW candidate harvest v0.
//
// IMPORTANT:
// - This is a harvest, not an ontology.
// - ontologyType is deliberately null.
// - aliases are not merged here.
// - adjudication, ranking, prerequisites, parent/child relations, and combos are all null.
// - Legacy SMMC method tags are retrieval leads until official evidence is verified.
// - Source-book candidates preserve source wording even when they may later merge.
//
// Gate 3+ is responsible for granularity/adjudication.

import { SMMC_METHOD_TAGS, SMMC_SECONDARY_TAGS } from "../schema.mjs";
import {
  ARSENAL_GATE2_LEDGER_BRIDGE_CANDIDATES,
  ARSENAL_GATE2_LEDGER_BRIDGE_EVIDENCE,
  ARSENAL_GATE2_LEDGER_BRIDGE_META,
} from "./ledger-bridge-candidates-v0.mjs";

const slug = value => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const rawCandidate = ({
  id,
  name,
  origin,
  sourceTerminology = null,
  evidenceRecordIds = [],
  note = null,
}) => Object.freeze({
  candidateId: id,
  candidateName: name,
  origin,
  sourceTerminology,
  ontologyType: null,
  aliases: Object.freeze([]),
  evidenceRecordIds: Object.freeze(evidenceRecordIds),
  trigger: null,
  operation: null,
  failureModes: null,
  hardPrerequisites: null,
  softPrerequisites: null,
  candidateRelations: null,
  adjudication: null,
  adjudicationRationale: null,
  rank: null,
  rarity: null,
  note,
});

const evidence = ({
  recordId,
  candidateId,
  candidateName,
  evidenceBasis,
  recordChannel,
  claimKind,
  verificationStatus,
  sourceId,
  sourceVersionOrCommit,
  sourceLocator,
  sourceArtifactSha256,
  claim,
  sourceTerminology,
  doesNotEstablish,
  researcherNote = null,
}) => Object.freeze({
  recordId,
  candidateId,
  candidateName,
  evidenceBasis,
  recordChannel,
  claimKind,
  verificationStatus,
  ontologyType: null,
  sourceId,
  sourceVersionOrCommit,
  sourceLocator,
  sourceArtifactSha256,
  historicalProblemIds: Object.freeze([]),
  learnerAttemptIds: Object.freeze([]),
  learnerContext: null,
  claim,
  sourceTerminology,
  supports: Object.freeze(["RAW_CANDIDATE_HARVEST"]),
  doesNotEstablish,
  confidence: "source/index verified; candidate status intentionally unresolved",
  linkedRecordIds: Object.freeze([]),
  researcherNote,
});

const LEGACY_SCHEMA_COMMIT = "1a485cf7a2c495ab717cadee60a7762d96994f34";

export const ARSENAL_GATE2_LEGACY_TAG_CANDIDATES = Object.freeze(
  SMMC_METHOD_TAGS.map(tag => {
    const id = `RAW-LEGACY-${slug(tag)}`;
    return rawCandidate({
      id,
      name: tag,
      origin: "SMMC_METHOD_TAG",
      sourceTerminology: tag,
      evidenceRecordIds: [`E-${id}-schema`],
      note: "Current ledger tag preserved verbatim as a retrieval lead. No claim that it is a final learner-facing ability.",
    });
  })
);

export const ARSENAL_GATE2_LEGACY_TAG_EVIDENCE = Object.freeze(
  ARSENAL_GATE2_LEGACY_TAG_CANDIDATES.map(candidate => evidence({
    recordId: `E-${candidate.candidateId}-schema`,
    candidateId: candidate.candidateId,
    candidateName: candidate.candidateName,
    evidenceBasis: "PROJECT_DERIVED",
    recordChannel: "NONE",
    claimKind: "INDEX_SIGNAL",
    verificationStatus: "INDEX_LEAD",
    sourceId: "S0-PROJECT-SCHEMA",
    sourceVersionOrCommit: LEGACY_SCHEMA_COMMIT,
    sourceLocator: Object.freeze({
      kind: "REPO",
      path: "course/smmc/schema.mjs",
      lineStart: 27,
      lineEnd: 38,
    }),
    sourceArtifactSha256: null,
    claim: `${candidate.sourceTerminology} is present in the frozen SMMC_METHOD_TAGS vocabulary.`,
    sourceTerminology: candidate.sourceTerminology,
    doesNotEstablish: "Does not establish official historical occurrence, importance, difficulty, granularity, ontology type, or learning order.",
  }))
);

export const ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES = Object.freeze(
  SMMC_SECONDARY_TAGS.map(tag => {
    const id = `RAW-SECONDARY-${slug(tag)}`;
    return rawCandidate({
      id,
      name: tag,
      origin: "SMMC_SECONDARY_TAG",
      sourceTerminology: tag,
      evidenceRecordIds: [`E-${id}-schema`],
      note: "Current secondary/content tag preserved verbatim as a raw tool/topic/specialist lead. Gate 2 does not decide whether it belongs in the final Arsenal.",
    });
  })
);

export const ARSENAL_GATE2_SECONDARY_TAG_EVIDENCE = Object.freeze(
  ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES.map(candidate => evidence({
    recordId: `E-${candidate.candidateId}-schema`,
    candidateId: candidate.candidateId,
    candidateName: candidate.candidateName,
    evidenceBasis: "PROJECT_DERIVED",
    recordChannel: "NONE",
    claimKind: "INDEX_SIGNAL",
    verificationStatus: "INDEX_LEAD",
    sourceId: "S0-PROJECT-SCHEMA",
    sourceVersionOrCommit: LEGACY_SCHEMA_COMMIT,
    sourceLocator: Object.freeze({
      kind: "REPO",
      path: "course/smmc/schema.mjs",
      lineStart: 14,
      lineEnd: 25,
    }),
    sourceArtifactSha256: null,
    claim: `${candidate.sourceTerminology} is present in the frozen SMMC_SECONDARY_TAGS vocabulary.`,
    sourceTerminology: candidate.sourceTerminology,
    doesNotEstablish: "Does not establish that this topic/tool is a distinct Arsenal ability, its ontology type, historical use, importance, prerequisite status, or rank.",
  }))
);

// Book-source seed rows. These are intentionally source-specific; equivalent-looking
// names from different books remain separate raw candidates until the tribunal.
const SOURCE_SEEDS = Object.freeze([
  // Zeitz — contents + explicit getting-started discussion.
  ["Z-ORIENTATION","Orientation","S1-ZEITZ-2007-2E",42,"2.2 Strategies for Getting Started","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz presents orientation as a getting-started strategy."],
  ["Z-PENULTIMATE-STEP","Penultimate Step","S1-ZEITZ-2007-2E",42,"2.2 Strategies for Getting Started","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz explicitly lists the penultimate-step strategy among practical ways to begin."],
  ["Z-HANDS-DIRTY","Get Your Hands Dirty","S1-ZEITZ-2007-2E",42,"2.2 Strategies for Getting Started","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz explicitly lists get-your-hands-dirty as a practical starting strategy."],
  ["Z-WISHFUL-THINKING","Wishful Thinking","S1-ZEITZ-2007-2E",42,"2.2 Strategies for Getting Started","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz explicitly lists wishful thinking as a practical starting strategy."],
  ["Z-MAKE-EASIER","Make It Easier","S1-ZEITZ-2007-2E",42,"2.2 Strategies for Getting Started","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz explicitly lists make-it-easier as a practical starting strategy."],
  ["Z-DRAW-PICTURE","Draw a Picture","S1-ZEITZ-2007-2E",14,"2.4 Other Important Strategies","SOURCE_TERMINOLOGY","NONE","Zeitz gives Draw a Picture its own strategy heading."],
  ["Z-RECAST","Recast the Problem in Other Ways","S1-ZEITZ-2007-2E",14,"2.4 Other Important Strategies","SOURCE_TERMINOLOGY","NONE","Zeitz gives recasting a named strategy heading."],
  ["Z-CHANGE-POINT-VIEW","Change Your Point of View","S1-ZEITZ-2007-2E",14,"2.4 Other Important Strategies","SOURCE_TERMINOLOGY","NONE","Zeitz gives changing point of view a named strategy heading."],
  ["Z-SYMMETRY","Symmetry","S1-ZEITZ-2007-2E",14,"3.1 Symmetry","SOURCE_TERMINOLOGY","NONE","Zeitz gives symmetry a dedicated tactics section."],
  ["Z-EXTREME-PRINCIPLE","Extreme Principle","S1-ZEITZ-2007-2E",14,"3.2 The Extreme Principle","SOURCE_TERMINOLOGY","NONE","Zeitz names the Extreme Principle as a tactics section."],
  ["Z-PIGEONHOLE","Pigeonhole Principle","S1-ZEITZ-2007-2E",14,"3.3 The Pigeonhole Principle","SOURCE_TERMINOLOGY","NONE","Zeitz names the Pigeonhole Principle as a tactics section."],
  ["Z-INVARIANTS","Invariants","S1-ZEITZ-2007-2E",14,"3.4 Invariants","SOURCE_TERMINOLOGY","NONE","Zeitz names invariants as a tactics section."],
  ["Z-PARITY","Parity","S1-ZEITZ-2007-2E",14,"3.4 Invariants — Parity","SOURCE_TERMINOLOGY","NONE","Zeitz names parity within his invariants treatment."],
  ["Z-MOD-COLOR","Modular Arithmetic and Coloring","S1-ZEITZ-2007-2E",14,"3.4 Invariants — Modular Arithmetic and Coloring","SOURCE_TERMINOLOGY","NONE","Zeitz names modular arithmetic and coloring together within invariants."],
  ["Z-MONOVARIANTS","Monovariants","S1-ZEITZ-2007-2E",14,"3.4 Invariants — Monovariants","SOURCE_TERMINOLOGY","NONE","Zeitz names monovariants within the invariants chapter."],

  // Engel — chapter principles + explicit Working Backwards section.
  ["E-INVARIANCE-PRINCIPLE","Invariance Principle","S2-ENGEL-1998",5,"1 The Invariance Principle","SOURCE_TERMINOLOGY","NONE","Engel devotes Chapter 1 to the Invariance Principle."],
  ["E-COLORING-PROOFS","Coloring Proofs","S2-ENGEL-1998",5,"2 Coloring Proofs","SOURCE_TERMINOLOGY","NONE","Engel devotes Chapter 2 to Coloring Proofs."],
  ["E-EXTREMAL-PRINCIPLE","Extremal Principle","S2-ENGEL-1998",5,"3 The Extremal Principle","SOURCE_TERMINOLOGY","NONE","Engel devotes Chapter 3 to the Extremal Principle."],
  ["E-BOX-PRINCIPLE","Box Principle","S2-ENGEL-1998",5,"4 The Box Principle","SOURCE_TERMINOLOGY","NONE","Engel devotes Chapter 4 to the Box Principle."],
  ["E-INDUCTION-PRINCIPLE","Induction Principle","S2-ENGEL-1998",5,"8 The Induction Principle","SOURCE_TERMINOLOGY","NONE","Engel devotes Chapter 8 to the Induction Principle."],
  ["E-WORKING-BACKWARDS","Working Backwards","S2-ENGEL-1998",377,"14.3 Working Backwards","DISCOVERY_HEURISTIC","DISCOVERY","Engel explicitly presents Working Backwards as an old problem-solving strategy and describes its low-branching trigger."],

  // Hammack — contents preserve proof-technique distinctions.
  ["H-DIRECT-PROOF","Direct Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"4 Direct Proof","PROOF_STRUCTURE","NONE","Hammack gives Direct Proof its own chapter."],
  ["H-USING-CASES","Using Cases","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"4.4 Using Cases","PROOF_STRUCTURE","NONE","Hammack explicitly teaches Using Cases inside Direct Proof."],
  ["H-CONTRAPOSITIVE-PROOF","Contrapositive Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"5 Contrapositive Proof","PROOF_STRUCTURE","NONE","Hammack gives Contrapositive Proof its own chapter."],
  ["H-CONTRADICTION-PROOF","Proof by Contradiction","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"6 Proof by Contradiction","PROOF_STRUCTURE","NONE","Hammack gives Proof by Contradiction its own chapter."],
  ["H-IFF-PROOF","If-and-Only-If Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"7.1 If-and-Only-If Proof","PROOF_STRUCTURE","NONE","Hammack explicitly separates if-and-only-if proof."],
  ["H-EXISTENCE-PROOF","Existence Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"7.3 Existence Proofs","PROOF_STRUCTURE","NONE","Hammack explicitly treats existence proofs."],
  ["H-UNIQUENESS-PROOF","Uniqueness Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"7.3 Existence and Uniqueness Proofs","PROOF_STRUCTURE","NONE","Hammack explicitly treats uniqueness as part of existence-and-uniqueness proof."],
  ["H-CONSTRUCTIVE-PROOF","Constructive Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"7.4 Constructive Versus Non-Constructive Proofs","PROOF_STRUCTURE","NONE","Hammack explicitly distinguishes constructive proof."],
  ["H-NONCONSTRUCTIVE-PROOF","Non-Constructive Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"7.4 Constructive Versus Non-Constructive Proofs","PROOF_STRUCTURE","NONE","Hammack explicitly distinguishes non-constructive proof."],
  ["H-INDUCTION","Proof by Induction","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"10.1 Proof by Induction","PROOF_STRUCTURE","NONE","Hammack explicitly treats proof by induction."],
  ["H-STRONG-INDUCTION","Proof by Strong Induction","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"10.2 Proof by Strong Induction","PROOF_STRUCTURE","NONE","Hammack explicitly treats strong induction."],
  ["H-SMALLEST-COUNTEREXAMPLE","Proof by Smallest Counterexample","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"10.3 Proof by Smallest Counterexample","PROOF_STRUCTURE","NONE","Hammack explicitly treats proof by smallest counterexample."],

  // Velleman — Summary of Proof Techniques.
  ["V-REEXPRESS-NEGATIVE","Reexpress a Negative Goal","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman lists reexpressing a negative goal as a proof technique."],
  ["V-CONTRADICTION","Proof by Contradiction","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman lists contradiction as a technique usable in proof planning."],
  ["V-DIRECT","Direct Conditional Proof","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman lists assuming the antecedent and proving the consequent for P→Q."],
  ["V-CONTRAPOSITIVE","Contrapositive Proof","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman lists proving a conditional through its contrapositive."],
  ["V-CONJUNCTION-SPLIT","Split a Conjunction Goal","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman instructs proving P and Q separately for a conjunction goal."],
  ["V-DISJUNCTION","Prove a Disjunction","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman gives proof-structure options for disjunction goals."],
  ["V-CASES","Proof by Cases","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman lists proof by exhaustive cases."],
  ["V-BICONDITIONAL","Biconditional Proof","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman instructs proving both directions of a biconditional."],
  ["V-ARBITRARY-OBJECT","Arbitrary Object for a Universal Goal","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman instructs taking an arbitrary object to prove a universal statement."],
  ["V-EXISTENCE-WITNESS","Existence Witness","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman instructs finding a value that makes an existential predicate true."],
  ["V-INDUCTION","Mathematical Induction","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman's summary includes mathematical induction."],
  ["V-STRONG-INDUCTION","Strong Induction","S4-VELLEMAN-2006-2E",390,"Summary of Proof Techniques","PROOF_STRUCTURE","NONE","Velleman's summary includes strong induction."],

  // Putnam and Beyond — chapter/section terminology from the frozen PDF contents.
  ["P-CONTRADICTION","Argument by Contradiction","S5-GELCA-ANDREESCU-2007",6,"1.1 Argument by Contradiction","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond lists Argument by Contradiction under Methods of Proof."],
  ["P-INDUCTION","Mathematical Induction","S5-GELCA-ANDREESCU-2007",6,"1.2 Mathematical Induction","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond lists Mathematical Induction under Methods of Proof."],
  ["P-PIGEONHOLE","Pigeonhole Principle","S5-GELCA-ANDREESCU-2007",6,"1.3 The Pigeonhole Principle","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond lists the Pigeonhole Principle under Methods of Proof."],
  ["P-ORDERED-EXTREMAL","Ordered Sets and Extremal Elements","S5-GELCA-ANDREESCU-2007",6,"1.4 Ordered Sets and Extremal Elements","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond lists ordered sets and extremal elements under Methods of Proof."],
  ["P-INVARIANTS-SEMI","Invariants and Semi-Invariants","S5-GELCA-ANDREESCU-2007",6,"1.5 Invariants and Semi-Invariants","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond lists invariants and semi-invariants under Methods of Proof."],
  ["P-ALGEBRAIC-IDENTITIES","Algebraic Identities","S5-GELCA-ANDREESCU-2007",6,"2.1.1 Algebraic Identities","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Algebraic Identities a dedicated subsection."],
  ["P-CAUCHY-SCHWARZ","Cauchy–Schwarz Inequality","S5-GELCA-ANDREESCU-2007",6,"2.1.3 The Cauchy–Schwarz Inequality","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Cauchy–Schwarz a dedicated subsection."],
  ["P-TRIANGLE-INEQUALITY","Triangle Inequality","S5-GELCA-ANDREESCU-2007",6,"2.1.4 The Triangle Inequality","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the Triangle Inequality a dedicated subsection."],
  ["P-AM-GM","Arithmetic Mean–Geometric Mean Inequality","S5-GELCA-ANDREESCU-2007",6,"2.1.5 The Arithmetic Mean–Geometric Mean Inequality","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives AM-GM a dedicated subsection."],
  ["P-VIETE","Viète's Relations","S5-GELCA-ANDREESCU-2007",6,"2.2.2 Viète's Relations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Viète's relations a dedicated subsection."],
]);

const SOURCE_HASH = Object.freeze({
  "S1-ZEITZ-2007-2E": "be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565",
  "S2-ENGEL-1998": "abc16cf21b4389bc357246140c88422a387aceb741c539de5f5da27f954cc096",
  "S3-HAMMACK-BOOK-OF-PROOF-3.4": "e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd",
  "S4-VELLEMAN-2006-2E": "eca0a0a955668e721df2f2e2aaf0d1e31044844a8c6e1435541c5531c863c142",
  "S5-GELCA-ANDREESCU-2007": "143c74f8267984e34a6f260d1e20c51cd63e7e73c499161f85c4981e0f620fba",
});

export const ARSENAL_GATE2_BOOK_CANDIDATES = Object.freeze(
  SOURCE_SEEDS.map(([key,name,sourceId,pdfPage,section,claimKind,recordChannel,claim]) => {
    const id = `RAW-SOURCE-${slug(key)}`;
    return rawCandidate({
      id,
      name,
      origin: sourceId,
      sourceTerminology: name,
      evidenceRecordIds: [`E-${id}-source`],
      note: "Source-specific raw candidate. Deliberately not merged with legacy tags or same-looking terms from other books.",
    });
  })
);

export const ARSENAL_GATE2_BOOK_EVIDENCE = Object.freeze(
  SOURCE_SEEDS.map(([key,name,sourceId,pdfPage,section,claimKind,recordChannel,claim]) => {
    const id = `RAW-SOURCE-${slug(key)}`;
    return evidence({
      recordId: `E-${id}-source`,
      candidateId: id,
      candidateName: name,
      evidenceBasis: "SOURCE_FACT",
      recordChannel,
      claimKind,
      verificationStatus: "VERIFIED",
      sourceId,
      sourceVersionOrCommit: sourceId,
      sourceLocator: Object.freeze({
        kind: "PDF",
        pdfPage,
        section,
      }),
      sourceArtifactSha256: SOURCE_HASH[sourceId],
      claim,
      sourceTerminology: name,
      doesNotEstablish: "Does not establish that this source term is a distinct final Arsenal ability, its ontology type, granularity, prerequisites, importance, or rank.",
    });
  })
);

export const ARSENAL_GATE2_RAW_CANDIDATES = Object.freeze([
  ...ARSENAL_GATE2_LEGACY_TAG_CANDIDATES,
  ...ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES,
  ...ARSENAL_GATE2_LEDGER_BRIDGE_CANDIDATES,
  ...ARSENAL_GATE2_BOOK_CANDIDATES,
]);

export const ARSENAL_GATE2_RAW_EVIDENCE = Object.freeze([
  ...ARSENAL_GATE2_LEGACY_TAG_EVIDENCE,
  ...ARSENAL_GATE2_SECONDARY_TAG_EVIDENCE,
  ...ARSENAL_GATE2_LEDGER_BRIDGE_EVIDENCE,
  ...ARSENAL_GATE2_BOOK_EVIDENCE,
]);

export const ARSENAL_GATE2_HARVEST_META = Object.freeze({
  gate: 2,
  status: "RAW-HARVEST-IN-PROGRESS",
  legacyMethodTagCount: SMMC_METHOD_TAGS.length,
  legacyCandidates: ARSENAL_GATE2_LEGACY_TAG_CANDIDATES.length,
  secondaryTagCandidates: ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES.length,
  ledgerBridgeCandidates: ARSENAL_GATE2_LEDGER_BRIDGE_CANDIDATES.length,
  ledgerBridgeEvidenceRecords: ARSENAL_GATE2_LEDGER_BRIDGE_META.evidenceRecords,
  bookSourceCandidates: ARSENAL_GATE2_BOOK_CANDIDATES.length,
  totalCandidates: ARSENAL_GATE2_RAW_CANDIDATES.length,
  totalEvidenceRecords: ARSENAL_GATE2_RAW_EVIDENCE.length,
  ontologyFrozen: false,
  adjudicationStarted: false,
  rankingStarted: false,
  prerequisiteGraphStarted: false,
});
