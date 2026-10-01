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
import {
  ARSENAL_GATE2_LEDGER_ROUTE_CANDIDATES,
  ARSENAL_GATE2_LEDGER_ROUTE_EVIDENCE,
  ARSENAL_GATE2_LEDGER_ROUTE_META,
} from "./ledger-route-candidates-v0.mjs";
import {
  ARSENAL_GATE2_OFFICIAL_SOLUTION_CANDIDATES,
  ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE,
  ARSENAL_GATE2_OFFICIAL_SOLUTION_META,
} from "./official-solution-candidates-v0.mjs";

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

  // Deeper Zeitz tool/tactic harvest.
  ["Z-FACTOR-TACTIC","Factor Tactic","S1-ZEITZ-2007-2E",165,"5.2 The Factor Tactic","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly names and develops the Factor Tactic."],
  ["Z-MANIPULATING-SQUARES","Manipulating Squares","S1-ZEITZ-2007-2E",15,"5.2 Algebraic Manipulation Revisited","SOURCE_TERMINOLOGY","NONE","Zeitz gives Manipulating Squares a named subsection."],
  ["Z-SUBSTITUTIONS-SIMPLIFICATIONS","Substitutions and Simplifications","S1-ZEITZ-2007-2E",15,"5.2 Algebraic Manipulation Revisited","SOURCE_TERMINOLOGY","NONE","Zeitz gives Substitutions and Simplifications a named subsection."],
  ["Z-GAUSSIAN-PAIRING","Gaussian Pairing Tool","S1-ZEITZ-2007-2E",84,"3.1 Symmetry — Gaussian Pairing Tool","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly names the Gaussian Pairing Tool."],
  ["Z-TELESCOPE-TOOL","Telescope Tool","S1-ZEITZ-2007-2E",175,"5.3 Geometric Series and the Telescope Tool","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly names the Telescope Tool."],
  ["Z-PIE-INDICATOR","Inclusion–Exclusion with Indicator Functions","S1-ZEITZ-2007-2E",229,"6.3 PIE with Indicator Functions","SOURCE_TERMINOLOGY","NONE","Zeitz gives a dedicated treatment of inclusion–exclusion using indicator functions."],
  ["Z-ROOTS-UNITY-FILTER","Roots of Unity Filter","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists a roots-of-unity filter."],
  ["Z-ADD-ZERO","Add Zero Creatively","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists adding zero creatively."],
  ["Z-COMPLETE-SQUARE","Completing the Square","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists completing the square."],
  ["Z-EXTRACT-SQUARES","Extracting Squares","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists extracting squares."],
  ["Z-CATALYST","Catalyst Tool","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists the catalyst tool."],
  ["Z-REFLECTION","Reflection Tool","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists reflection as a tool."],
  ["Z-DEFINE-FUNCTION","Define a Function","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists defining a function."],
  ["Z-PARTIAL-FRACTIONS","Partial Fractions","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists partial fractions."],
  ["Z-MODULO-FILTER","Filter the Problem Modulo n","S1-ZEITZ-2007-2E",258,"7.4 Diophantine Equations","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz explicitly recommends filtering a Diophantine problem modulo a suitable n to constrain solutions."],

  // Deeper Engel strategy/counting harvest.
  ["E-GREEDY","Greedy Algorithm","S2-ENGEL-1998",52,"3 The Extremal Principle","DISCOVERY_HEURISTIC","DISCOVERY","Engel introduces the greedy algorithm as a construction principle arising from an extremal search."],
  ["E-DIVIDE-CONQUER","Divide and Conquer","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","DISCOVERY_HEURISTIC","DISCOVERY","Engel explicitly calls Divide and Conquer a general combinatorial problem-solving strategy."],
  ["E-SUM-RULE","Sum Rule","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","SOURCE_TERMINOLOGY","NONE","Engel names the Sum Rule within his Divide-and-Conquer counting toolkit."],
  ["E-PRODUCT-RULE","Product Rule","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","SOURCE_TERMINOLOGY","NONE","Engel names the Product Rule within his counting toolkit."],
  ["E-PRODUCT-SUM-RULE","Product-Sum Rule","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","SOURCE_TERMINOLOGY","NONE","Engel names the Product-Sum Rule within his counting toolkit."],
  ["E-COUNT-BIJECTION","Counting by Bijection","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","SOURCE_TERMINOLOGY","NONE","Engel explicitly names Counting by Bijection."],
  ["E-COUNT-TWO-WAYS","Count the Same Objects in Two Different Ways","S2-ENGEL-1998",91,"5 Enumerative Combinatorics","SOURCE_TERMINOLOGY","NONE","Engel explicitly lists counting the same objects in two different ways as a counting paradigm."],
  ["E-INFINITE-DESCENT","Infinite Descent","S2-ENGEL-1998",129,"6 Number Theory","SOURCE_TERMINOLOGY","NONE","Engel explicitly presents a solution by infinite descent."],
  ["E-CONJUGATE-NUMBERS","Conjugate Numbers","S2-ENGEL-1998",378,"14.4 Conjugate Numbers","SOURCE_TERMINOLOGY","NONE","Engel gives conjugate-number switching its own Further Strategies subsection."],

  // Deeper Hammack proof/disproof harvest.
  ["H-COMBINATORIAL-PROOF","Combinatorial Proof","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"3.10 Combinatorial Proof","PROOF_STRUCTURE","NONE","Hammack explicitly gives Combinatorial Proof its own section."],
  ["H-COUNTEREXAMPLE","Counterexample","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"9.1 Counterexamples","PROOF_STRUCTURE","NONE","Hammack explicitly treats counterexamples as a disproof technique."],
  ["H-DISPROVE-EXISTENCE","Disproving Existence Statements","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"9.2 Disproving Existence Statements","PROOF_STRUCTURE","NONE","Hammack explicitly treats disproving existence statements."],
  ["H-DISPROOF-CONTRADICTION","Disproof by Contradiction","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"9.3 Disproof by Contradiction","PROOF_STRUCTURE","NONE","Hammack explicitly treats disproof by contradiction."],
  ["H-TREAT-SIMILAR-CASES","Treating Similar Cases","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"4.5 Treating Similar Cases","PROOF_STRUCTURE","NONE","Hammack explicitly separates treating similar cases."],

  // Deeper Velleman rules-of-inference harvest.
  ["V-MODUS-PONENS","Modus Ponens","S4-VELLEMAN-2006-2E",117,"3.2 Proofs Involving Negations and Conditionals","PROOF_STRUCTURE","NONE","Velleman explicitly names and explains modus ponens as a rule of inference."],
  ["V-MODUS-TOLLENS","Modus Tollens","S4-VELLEMAN-2006-2E",117,"3.2 Proofs Involving Negations and Conditionals","PROOF_STRUCTURE","NONE","Velleman explicitly names and explains modus tollens as a rule of inference."],
  ["V-EXISTENTIAL-INSTANTIATION","Existential Instantiation","S4-VELLEMAN-2006-2E",129,"3.3 Proofs Involving Quantifiers","PROOF_STRUCTURE","NONE","Velleman explicitly names existential instantiation."],
  ["V-UNIVERSAL-INSTANTIATION","Universal Instantiation","S4-VELLEMAN-2006-2E",129,"3.3 Proofs Involving Quantifiers","PROOF_STRUCTURE","NONE","Velleman explicitly names universal instantiation."],
  ["V-DISJUNCTIVE-SYLLOGISM","Disjunctive Syllogism","S4-VELLEMAN-2006-2E",156,"3.5 Proofs Involving Disjunctions","PROOF_STRUCTURE","NONE","Velleman explicitly names disjunctive syllogism as a rule of inference."],

  // Broader Putnam-and-Beyond raw tool/topic harvest from the exact frozen TOC.
  ["P-SEARCH-PATTERN","Search for a Pattern","S5-GELCA-ANDREESCU-2007",7,"3.1.1 Search for a Pattern","DISCOVERY_HEURISTIC","DISCOVERY","Putnam and Beyond gives Search for a Pattern a dedicated subsection."],
  ["P-TELESCOPIC","Telescopic Series and Products","S5-GELCA-ANDREESCU-2007",7,"3.1.6 Telescopic Series and Products","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives telescopic series and products a dedicated subsection."],
  ["P-IVP","Intermediate Value Property","S5-GELCA-ANDREESCU-2007",7,"3.2.3 The Intermediate Value Property","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the Intermediate Value Property a dedicated subsection."],
  ["P-CONVEX-FUNCTIONS","Convex Functions","S5-GELCA-ANDREESCU-2007",7,"3.2.6 Convex Functions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Convex Functions a dedicated subsection."],
  ["P-FUNCTIONAL-EQUATIONS","Functional Equations","S5-GELCA-ANDREESCU-2007",7,"3.4.1 Functional Equations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Functional Equations a dedicated subsection."],
  ["P-TRIG-SUBSTITUTION","Trigonometric Substitutions","S5-GELCA-ANDREESCU-2007",8,"4.2.3 Trigonometric Substitutions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Trigonometric Substitutions a dedicated subsection."],
  ["P-INFINITE-DESCENT","Fermat's Infinite Descent Principle","S5-GELCA-ANDREESCU-2007",8,"5.1.2 Fermat's Infinite Descent Principle","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Fermat's Infinite Descent Principle a dedicated subsection."],
  ["P-FACTORIZATION-DIVISIBILITY","Factorization and Divisibility","S5-GELCA-ANDREESCU-2007",8,"5.2.1 Factorization and Divisibility","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Factorization and Divisibility a dedicated subsection."],
  ["P-CRT","Chinese Remainder Theorem","S5-GELCA-ANDREESCU-2007",8,"5.2.7 The Chinese Remainder Theorem","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the Chinese Remainder Theorem a dedicated subsection."],
  ["P-GENERATING-FUNCTIONS","Generating Functions","S5-GELCA-ANDREESCU-2007",9,"6.2.2 Generating Functions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Generating Functions a dedicated subsection."],
  ["P-COUNTING-STRATEGIES","Counting Strategies","S5-GELCA-ANDREESCU-2007",9,"6.2.3 Counting Strategies","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Counting Strategies a dedicated subsection."],
  ["P-INCLUSION-EXCLUSION","Inclusion–Exclusion Principle","S5-GELCA-ANDREESCU-2007",9,"6.2.4 The Inclusion–Exclusion Principle","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Inclusion–Exclusion a dedicated subsection."],
  ["P-PROBABILITY-RELATIONS","Establishing Relations Among Probabilities","S5-GELCA-ANDREESCU-2007",9,"6.3.2 Establishing Relations Among Probabilities","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives establishing relations among probabilities a dedicated subsection."],

  // Zeitz index sweep: preserve explicit strategy/tactic/tool labels before tribunal.
  ["Z-ANGLE-CHASING","Angle Chasing","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists angle chasing."],
  ["Z-DRAW-AUXILIARY","Drawing an Auxiliary Object","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists drawing an auxiliary object."],
  ["Z-GENERALIZE","Generalize","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists generalizing."],
  ["Z-SIMILAR-PROBLEM","Is There a Similar Problem?","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists asking whether there is a similar problem."],
  ["Z-OPPORTUNISTIC","Opportunistic Strategy","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists an opportunistic strategy."],
  ["Z-OPTIMISTIC","Optimistic Strategy","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists an optimistic strategy."],
  ["Z-PERIPHERAL-VISION","Peripheral Vision","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists peripheral vision."],
  ["Z-PHANTOM-POINT","Phantom Point","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists the phantom-point strategy."],
  ["Z-PRODUCE-CONTRADICTION","Produce a Contradiction","S1-ZEITZ-2007-2E",382,"Index — strategies","SOURCE_TERMINOLOGY","NONE","Zeitz's strategy index explicitly lists producing a contradiction."],
  ["Z-COMPLEX-TACTIC","Complex Numbers as a Tactic","S1-ZEITZ-2007-2E",382,"Index — tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's tactics index explicitly lists complex numbers."],
  ["Z-GF-TACTIC","Generating Functions as a Tactic","S1-ZEITZ-2007-2E",382,"Index — tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's tactics index explicitly lists generating functions."],
  ["Z-GRAPH-TACTIC","Graph Theory as a Tactic","S1-ZEITZ-2007-2E",382,"Index — tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's tactics index explicitly lists graph theory."],
  ["Z-MODULAR-TACTIC","Modular Arithmetic as a Tactic","S1-ZEITZ-2007-2E",382,"Index — tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's tactics index explicitly lists modular arithmetic."],
  ["Z-MONOTONIZE","Monotonize","S1-ZEITZ-2007-2E",382,"Index — tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's tactics index explicitly lists monotonizing."],
  ["Z-GEOMETRIC-SERIES-TOOL","Geometric Series Tool","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists the geometric-series tool."],
  ["Z-IDENTITY-PRINCIPLE","Identity Principle","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists the identity principle."],
  ["Z-INVENT-FONT","Invent a Font","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists inventing a font."],
  ["Z-MONIC-POLYNOMIAL","Monic Polynomial Tool","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists monic polynomial."],
  ["Z-TRIG-TOOL","Trigonometric Tool","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists a trigonometric tool."],
  ["Z-UNDETERMINED-COEFF","Undetermined Coefficients","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists undetermined coefficients."],
  ["Z-WEIGHTS","Method of Weights","S1-ZEITZ-2007-2E",382,"Index — tools","SOURCE_TERMINOLOGY","NONE","Zeitz's tool index explicitly lists weights."],
  ["Z-SHEARING","Shearing Tool","S1-ZEITZ-2007-2E",382,"Index — geometry/tools","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists a shearing tool."],
  ["Z-ENCODING","Encoding","S1-ZEITZ-2007-2E",378,"Index — combinatorial strategies and tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's combinatorial-strategy index explicitly lists encoding."],
  ["Z-COUNT-COMPLEMENT","Count the Complement","S1-ZEITZ-2007-2E",378,"Index — combinatorial strategies and tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's combinatorial-strategy index explicitly lists counting the complement."],
  ["Z-PARTITIONING","Partitioning","S1-ZEITZ-2007-2E",378,"Index — combinatorial strategies and tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's combinatorial-strategy index explicitly lists partitioning."],
  ["Z-INCLUSION-EXCLUSION","Inclusion–Exclusion","S1-ZEITZ-2007-2E",378,"Index — combinatorial strategies and tactics","SOURCE_TERMINOLOGY","NONE","Zeitz's combinatorial-strategy index explicitly lists inclusion–exclusion."],

  // Engel index sweep.
  ["E-CODING","Coding","S2-ENGEL-1998",399,"Index — Algorithm","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists coding under algorithms."],
  ["E-DECODING","Decoding","S2-ENGEL-1998",399,"Index — Algorithm","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists decoding under algorithms."],
  ["E-AUTOMATIC-SOLUTION","Automatic Solution","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists automatic solution."],
  ["E-BIJECTIVE-PROOF","Bijective Proof","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists bijective proof."],
  ["E-COMBINATORIAL-PROOF","Combinatorial Proof","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists combinatorial proof."],
  ["E-HEURISTIC-PRINCIPLE","Heuristic Principle","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the heuristic principle."],
  ["E-PROBABILISTIC-INTERPRETATION","Probabilistic Interpretation","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists probabilistic interpretation."],
  ["E-PIE","Principle of Inclusion and Exclusion","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the principle of inclusion and exclusion."],
  ["E-REARRANGEMENT","Rearrangement Inequality","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the rearrangement inequality."],
  ["E-REFLECTION-PRINCIPLE","Reflection Principle","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the reflection principle."],
  ["E-RECURSION","Recursion","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists recursion."],
  ["E-SIEVE-FORMULA","Sieve Formula","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the sieve formula."],
  ["E-WINNING-POSITION","Winning Position","S2-ENGEL-1998",400,"Index — Position","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists winning positions."],
  ["E-LOSING-POSITION","Losing Position","S2-ENGEL-1998",400,"Index — Position","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists losing positions."],
  ["E-TRIG-SUBSTITUTION","Trigonometric Substitution","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists trigonometric substitution."],
  ["E-TRANSFORMATION-GEOMETRY","Transformation Geometry","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists transformation geometry."],
  ["E-ROOTS-UNITY","Roots of Unity","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists roots of unity."],
  ["E-CHARACTERISTIC-EQUATION","Characteristic Equation","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists characteristic equations."],
  ["E-SYMMETRY","Symmetry","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists symmetry."],
  ["E-PARITY","Parity","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists parity."],

  // Further Putnam-and-Beyond TOC sweep of recurring contest tools/topics.
  ["P-LINEAR-RECURRENCE","Linear Recursive Sequences","S5-GELCA-ANDREESCU-2007",7,"3.1.2 Linear Recursive Sequences","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives linear recursive sequences a dedicated subsection."],
  ["P-LOCATION-ZEROS","Location of the Zeros of a Polynomial","S5-GELCA-ANDREESCU-2007",6,"2.2.4 The Location of the Zeros of a Polynomial","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives polynomial zero-location a dedicated subsection."],
  ["P-DETERMINANTS","Determinants","S5-GELCA-ANDREESCU-2007",7,"2.3.2 Determinants","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives determinants a dedicated subsection."],
  ["P-EIGEN","Linear Transformations, Eigenvalues, Eigenvectors","S5-GELCA-ANDREESCU-2007",7,"2.3.6 Linear Transformations, Eigenvalues, Eigenvectors","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives eigenvalue/eigenvector methods a dedicated subsection."],
  ["P-TAYLOR-FOURIER","Taylor and Fourier Series","S5-GELCA-ANDREESCU-2007",7,"3.2.11 Taylor and Fourier Series","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Taylor and Fourier series a dedicated subsection."],
  ["P-PARTIAL-DERIV","Partial Derivatives and Their Applications","S5-GELCA-ANDREESCU-2007",7,"3.3.1 Partial Derivatives and Their Applications","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives partial derivatives/applications a dedicated subsection."],
  ["P-FIRST-ORDER-ODE","First-Order ODEs","S5-GELCA-ANDREESCU-2007",7,"3.4.2 Ordinary Differential Equations of the First Order","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives first-order ODEs a dedicated subsection."],
  ["P-EULER-FORMULA","Euler's Formula","S5-GELCA-ANDREESCU-2007",8,"4.2.2 Euler's Formula","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Euler's formula a dedicated subsection."],
  ["P-TELESCOPIC-TRIG","Telescopic Sums and Products in Trigonometry","S5-GELCA-ANDREESCU-2007",8,"4.2.4 Telescopic Sums and Products in Trigonometry","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives trigonometric telescoping a dedicated subsection."],
  ["P-GREATEST-INTEGER","Greatest Integer Function","S5-GELCA-ANDREESCU-2007",8,"5.1.3 The Greatest Integer Function","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the greatest-integer function a dedicated subsection."],
  ["P-MODULAR","Modular Arithmetic","S5-GELCA-ANDREESCU-2007",8,"5.2.3 Modular Arithmetic","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives modular arithmetic a dedicated subsection."],
  ["P-TOTIENT","Euler's Totient Function","S5-GELCA-ANDREESCU-2007",8,"5.2.6 Euler's Totient Function","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Euler's totient function a dedicated subsection."],
  ["P-PELL","Pell's Equation","S5-GELCA-ANDREESCU-2007",8,"5.3.3 Pell's Equation","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Pell's equation a dedicated subsection."],
  ["P-RAMSEY","Ramsey Theory","S5-GELCA-ANDREESCU-2007",9,"6.1.5 Ramsey Theory","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Ramsey theory a dedicated subsection."],
  ["P-COMBINATORIAL-IDENTITIES","Combinatorial Identities","S5-GELCA-ANDREESCU-2007",9,"6.2.1 Combinatorial Identities","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives combinatorial identities a dedicated subsection."],
  ["P-EQUALLY-LIKELY","Equally Likely Cases","S5-GELCA-ANDREESCU-2007",9,"6.3.1 Equally Likely Cases","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives equally likely cases a dedicated probability subsection."],
  ["P-GEOMETRIC-PROB","Geometric Probabilities","S5-GELCA-ANDREESCU-2007",9,"6.3.3 Geometric Probabilities","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives geometric probabilities a dedicated subsection."],

  // Meta/problem-investigation vocabulary that Gate 1 deliberately refused to pre-type.
  ["Z-STRATEGY-TERM","Strategy","S1-ZEITZ-2007-2E",20,"1.2 The Three Levels of Problem Solving","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly defines Strategy as his broad level for ideas used to start and pursue problems; Gate 2 records the term without adopting it as an ontology type."],
  ["Z-TACTIC-TERM","Tactic","S1-ZEITZ-2007-2E",20,"1.2 The Three Levels of Problem Solving","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly defines Tactics as broadly useful mathematical methods; Gate 2 records the term without adopting it as an ontology type."],
  ["Z-TOOL-TERM","Tool","S1-ZEITZ-2007-2E",20,"1.2 The Three Levels of Problem Solving","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly defines Tools as narrowly focused techniques; Gate 2 records the term without adopting it as an ontology type."],
  ["Z-CRUX-MOVE","Crux Move","S1-ZEITZ-2007-2E",20,"1.2 The Three Levels of Problem Solving","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly names a crux move as a key obstacle-clearing move and notes that it can occur at strategic, tactical, or tool level; representation remains unresolved."],
  ["Z-INVESTIGATION","Problem Investigation","S1-ZEITZ-2007-2E",20,"1.2 From Mountaineering to Mathematics","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz distinguishes the investigation process from merely having a polished answer and recommends an organized strategic investigation."],
  ["Z-NUMERICAL-EXPERIMENT","Numerical Experimentation","S1-ZEITZ-2007-2E",23,"1.2 Worked example analysis","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's worked-example analysis explicitly identifies numerical experimentation as the strategy that led to the useful conjecture."],
  ["V-LOGICAL-FORM-GOAL","Analyze the Logical Form of the Goal","S4-VELLEMAN-2006-2E",126,"3 Proofs — scratch-work strategy","DISCOVERY_HEURISTIC","DISCOVERY","Velleman repeatedly uses analysis of the goal's logical form to choose the next proof transformation."],
  ["V-EXPAND-DEFINITION","Expand Definitions to Expose Logical Form","S4-VELLEMAN-2006-2E",117,"3.2 Proofs Involving Negations and Conditionals","DISCOVERY_HEURISTIC","DISCOVERY","Velleman explicitly notes that writing out a mathematical definition can reveal a statement's logical form and unlock proof strategy."],
  ["E-GREAT-IDEAS","Great Ideas","S2-ENGEL-1998",4,"Preface","SOURCE_TERMINOLOGY","NONE","Engel explicitly says Great Ideas were the leading principles of his compact contest training and a means of classifying problems."],

  // Further Putnam-and-Beyond named-method/tool sweep from the complete TOC.
  ["P-STURM","Sturm's Principle","S5-GELCA-ANDREESCU-2007",6,"2.1.6 Sturm's Principle","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Sturm's Principle a dedicated subsection."],
  ["P-POLY-DERIVATIVE","Derivative of a Polynomial","S5-GELCA-ANDREESCU-2007",6,"2.2.3 The Derivative of a Polynomial","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives polynomial-derivative reasoning a dedicated subsection."],
  ["P-IRREDUCIBLE-POLY","Irreducible Polynomials","S5-GELCA-ANDREESCU-2007",6,"2.2.5 Irreducible Polynomials","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives irreducible polynomials a dedicated subsection."],
  ["P-CHEBYSHEV-POLY","Chebyshev Polynomials","S5-GELCA-ANDREESCU-2007",6,"2.2.6 Chebyshev Polynomials","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Chebyshev polynomials a dedicated subsection."],
  ["P-MATRIX-INVERSE","Matrix Inversion","S5-GELCA-ANDREESCU-2007",7,"2.3.3 The Inverse of a Matrix","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives matrix inversion a dedicated subsection."],
  ["P-LINEAR-SYSTEMS","Systems of Linear Equations","S5-GELCA-ANDREESCU-2007",7,"2.3.4 Systems of Linear Equations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives systems of linear equations a dedicated subsection."],
  ["P-BASES","Vector Spaces, Linear Combinations, Bases","S5-GELCA-ANDREESCU-2007",7,"2.3.5 Vector Spaces, Linear Combinations of Vectors, Bases","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives vector-space/basis methods a dedicated subsection."],
  ["P-CAYLEY-HAMILTON","Cayley–Hamilton Theorem","S5-GELCA-ANDREESCU-2007",7,"2.3.7 The Cayley–Hamilton and Perron–Frobenius Theorems","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond explicitly includes the Cayley–Hamilton theorem."],
  ["P-PERRON-FROBENIUS","Perron–Frobenius Theorem","S5-GELCA-ANDREESCU-2007",7,"2.3.7 The Cayley–Hamilton and Perron–Frobenius Theorems","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond explicitly includes the Perron–Frobenius theorem."],
  ["P-LIMIT-SEQUENCES","Limits of Sequences","S5-GELCA-ANDREESCU-2007",7,"3.1.3 Limits of Sequences","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives limits of sequences a dedicated subsection."],
  ["P-MVT","Mean Value Theorem","S5-GELCA-ANDREESCU-2007",7,"3.2.5 The Mean Value Theorem","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the Mean Value Theorem a dedicated subsection."],
  ["P-RIEMANN-SUMS","Riemann Sums","S5-GELCA-ANDREESCU-2007",7,"3.2.9 Riemann Sums","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Riemann sums a dedicated subsection."],
  ["P-INTEGRAL-INEQ","Inequalities for Integrals","S5-GELCA-ANDREESCU-2007",7,"3.2.10 Inequalities for Integrals","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives inequalities for integrals a dedicated subsection."],
  ["P-MULTI-INTEGRAL","Multivariable Integrals","S5-GELCA-ANDREESCU-2007",7,"3.3.2 Multivariable Integrals","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives multivariable integrals a dedicated subsection."],
  ["P-STOKES","Stokes-Type Theorems","S5-GELCA-ANDREESCU-2007",7,"3.3.3 The Many Versions of Stokes' Theorem","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the many versions of Stokes' theorem a dedicated subsection."],
  ["P-HIGHER-ODE","Higher-Order ODE Methods","S5-GELCA-ANDREESCU-2007",8,"3.4.3 Ordinary Differential Equations of Higher Order","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives higher-order ODEs a dedicated subsection."],
  ["P-VECTORS","Vector Methods in Geometry","S5-GELCA-ANDREESCU-2007",8,"4.1.1 Vectors","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond begins its geometry chapter with vector methods."],
  ["P-COORD-LINES-CIRCLES","Coordinate Geometry of Lines and Circles","S5-GELCA-ANDREESCU-2007",8,"4.1.2 The Coordinate Geometry of Lines and Circles","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives coordinate geometry of lines and circles a dedicated subsection."],
  ["P-INTEGRALS-GEOMETRY","Integrals in Geometry","S5-GELCA-ANDREESCU-2007",8,"4.1.5 Integrals in Geometry","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives integrals in geometry a dedicated subsection."],
  ["P-TRIG-IDENTITIES","Trigonometric Identities","S5-GELCA-ANDREESCU-2007",8,"4.2.1 Trigonometric Identities","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives trigonometric identities a dedicated subsection."],
  ["P-FLT","Fermat's Little Theorem","S5-GELCA-ANDREESCU-2007",8,"5.2.4 Fermat's Little Theorem","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Fermat's Little Theorem a dedicated subsection."],
  ["P-WILSON","Wilson's Theorem","S5-GELCA-ANDREESCU-2007",8,"5.2.5 Wilson's Theorem","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Wilson's Theorem a dedicated subsection."],
  ["P-LINEAR-DIO","Linear Diophantine Equations","S5-GELCA-ANDREESCU-2007",8,"5.3.1 Linear Diophantine Equations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives linear Diophantine equations a dedicated subsection."],
  ["P-PYTHAGORAS-EQ","Equation of Pythagoras","S5-GELCA-ANDREESCU-2007",8,"5.3.2 The Equation of Pythagoras","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives the Pythagorean equation a dedicated subsection."],
  ["P-PERMUTATIONS","Permutations","S5-GELCA-ANDREESCU-2007",9,"6.1.2 Permutations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives permutations a dedicated subsection."],
  ["P-PLANAR-EULER","Euler's Formula for Planar Graphs","S5-GELCA-ANDREESCU-2007",9,"6.1.4 Euler's Formula for Planar Graphs","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives Euler's planar-graph formula a dedicated subsection."],
  ["P-COMBINATORIAL-GEOMETRY","Combinatorial Geometry","S5-GELCA-ANDREESCU-2007",9,"6.1.3 Combinatorial Geometry","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives combinatorial geometry a dedicated subsection."],

  // Independent Gate-2 coverage repair: explicit source-specific leads missed by the
  // first review candidate. These remain raw ore: no merge, type, rank, prerequisite,
  // relation, or granularity disposition is implied by their inclusion.

  // Zeitz — additional indexed discovery/proof tactics and specialist tools.
  ["Z-LOOK-PATTERNS","Look for Patterns","S1-ZEITZ-2007-2E",380,"Index — patterns, look for","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly points to looking for patterns as a recurring problem-investigation move."],
  ["Z-BRAINSTORMING","Brainstorming","S1-ZEITZ-2007-2E",377,"Index","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly lists brainstorming in the problem-solving discussion."],
  ["Z-BACKBURNER","Backburner Problems","S1-ZEITZ-2007-2E",377,"Index","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly lists backburner problems as part of his problem-solving practice."],
  ["Z-BREAK-RULES","Breaking Rules","S1-ZEITZ-2007-2E",377,"Index","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly lists breaking rules in the creativity/problem-solving discussion."],
  ["Z-RESTATE","Restating a Problem","S1-ZEITZ-2007-2E",381,"Index","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly lists restating a problem as a recurring move."],
  ["Z-STEAL-IDEAS","Stealing Ideas","S1-ZEITZ-2007-2E",382,"Index","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly lists stealing ideas in his problem-solving discussion."],
  ["Z-BACKWARD-INDUCTION","Backward Induction","S1-ZEITZ-2007-2E",377,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists backward induction."],
  ["Z-AREA-PROOF","Area as a Proof Tactic","S1-ZEITZ-2007-2E",377,"Index — area","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists area as a proof tactic."],
  ["Z-BISECTION","Bisection Method","S1-ZEITZ-2007-2E",377,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists the bisection method."],
  ["Z-REPEATED-BISECTION","Repeated Bisection Method","S1-ZEITZ-2007-2E",344,"Repeated-bisection discussion","SOURCE_TERMINOLOGY","NONE","Zeitz explicitly describes the repeated bisection method as a strategy in the worked discussion."],
  ["Z-AVERAGE-PRINCIPLE","Average Principle","S1-ZEITZ-2007-2E",193,"5.5.12 The average principle","SOURCE_TERMINOLOGY","NONE","Zeitz gives the Average Principle an explicitly named subsection."],
  ["Z-ALGORITHMIC-PROOF","Algorithmic Proof","S1-ZEITZ-2007-2E",369,"Solution 2: Algorithmic Proof","PROOF_STRUCTURE","NONE","Zeitz explicitly labels an alternative argument as an Algorithmic Proof."]
  ["Z-EUCLIDEAN-ALGORITHM","Euclidean Algorithm","S1-ZEITZ-2007-2E",379,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists the Euclidean algorithm."],
  ["Z-MOBIUS-INVERSION","Möbius Inversion Formula","S1-ZEITZ-2007-2E",380,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists the Möbius inversion formula."],
  ["Z-PICK-THEOREM","Pick's Theorem","S1-ZEITZ-2007-2E",381,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists Pick's theorem."],
  ["Z-WELL-ORDERING","Well-Ordering Principle","S1-ZEITZ-2007-2E",383,"Index","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists the well-ordering principle."],
  ["Z-SYMMETRY-PRODUCT","Symmetry-Product Principle","S1-ZEITZ-2007-2E",382,"Index — symmetry","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists the symmetry-product principle."],
  ["Z-HOMOTHETY","Homothety","S1-ZEITZ-2007-2E",383,"Index — transformations","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists homothety among transformations."],
  ["Z-INVERSION","Inversion","S1-ZEITZ-2007-2E",383,"Index — transformations","SOURCE_TERMINOLOGY","NONE","Zeitz's index explicitly lists inversion among transformations."],
  ["Z-ORDER-FROM-CHAOS","Create Order out of Chaos","S1-ZEITZ-2007-2E",377,"Index — chaos, creating order out of","DISCOVERY_HEURISTIC","DISCOVERY","Zeitz's index explicitly points to creating order out of chaos in the invariants discussion."],

  // Engel — additional indexed algorithms/encodings/recurrence tools.
  ["E-EUCLIDEAN-ALGORITHM","Euclidean Algorithm","S2-ENGEL-1998",399,"Index — Algorithm","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists the Euclidean algorithm."],
  ["E-DIFFERENCE-EQUATIONS","Difference Equations","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists difference equations."],
  ["E-INVOLUTION","Involution","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists involution."],
  ["E-PRUFER-CODE","Prüfer Code","S2-ENGEL-1998",400,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists Prüfer code."],
  ["E-CAYLEY-FORMULA","Cayley's Formula","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists Cayley's formula."],
  ["E-BINET-FORMULA","Binet's Formula","S2-ENGEL-1998",399,"Index","SOURCE_TERMINOLOGY","NONE","Engel's index explicitly lists Binet's formula."],

  // Hammack — proof/counting structures that are explicit source headings.
  ["H-MULTIPLICATION-PRINCIPLE","Multiplication Principle","S3-HAMMACK-BOOK-OF-PROOF-3.4",4,"3.2 The Multiplication Principle","SOURCE_TERMINOLOGY","NONE","Hammack gives the Multiplication Principle its own section."],
  ["H-ADDITION-SUBTRACTION","Addition and Subtraction Principles","S3-HAMMACK-BOOK-OF-PROOF-3.4",4,"3.3 The Addition and Subtraction Principles","SOURCE_TERMINOLOGY","NONE","Hammack gives the Addition and Subtraction Principles their own section."],
  ["H-INCLUSION-EXCLUSION","Inclusion–Exclusion Principle","S3-HAMMACK-BOOK-OF-PROOF-3.4",4,"3.7 The Inclusion-Exclusion Principle","SOURCE_TERMINOLOGY","NONE","Hammack gives the Inclusion-Exclusion Principle its own section."],
  ["H-DIVISION-PIGEONHOLE","Division and Pigeonhole Principles","S3-HAMMACK-BOOK-OF-PROOF-3.4",4,"3.9 The Division and Pigeonhole Principles","SOURCE_TERMINOLOGY","NONE","Hammack gives the Division and Pigeonhole Principles a dedicated section."],
  ["H-LOGICAL-INFERENCE","Logical Inference","S3-HAMMACK-BOOK-OF-PROOF-3.4",4,"2.11 Logical Inference","PROOF_STRUCTURE","NONE","Hammack explicitly gives Logical Inference a dedicated section."],
  ["H-PROVE-MEMBERSHIP","How to Prove Membership","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"8.1 How to Prove a ∈ A","PROOF_STRUCTURE","NONE","Hammack gives proving set membership an explicit proof-structure section."],
  ["H-PROVE-SUBSET","How to Prove a Subset Relation","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"8.2 How to Prove A ⊆ B","PROOF_STRUCTURE","NONE","Hammack gives proving a subset relation an explicit proof-structure section."],
  ["H-PROVE-SET-EQUALITY","How to Prove Set Equality","S3-HAMMACK-BOOK-OF-PROOF-3.4",5,"8.3 How to Prove A = B","PROOF_STRUCTURE","NONE","Hammack gives proving set equality an explicit proof-structure section."],

  // Velleman — explicit goal/given transformations from the summary of proof techniques.
  ["V-UNIQUE-EXISTENCE","Existence-and-Uniqueness Goal","S4-VELLEMAN-2006-2E",391,"Summary of Proof Techniques — ∃!x P(x)","PROOF_STRUCTURE","NONE","Velleman explicitly instructs splitting a unique-existence goal into existence and uniqueness obligations."],
  ["V-REEXPRESS-UNIQUE-EXISTENCE","Reexpress a Unique-Existence Goal","S4-VELLEMAN-2006-2E",391,"Summary of Proof Techniques — ∃!x P(x)","PROOF_STRUCTURE","NONE","Velleman explicitly gives an equivalent reexpression of a unique-existence goal."],
  ["V-REEXPRESS-NEGATIVE-GIVEN","Reexpress a Negative Given","S4-VELLEMAN-2006-2E",392,"Summary of Proof Techniques — given ¬P","PROOF_STRUCTURE","NONE","Velleman explicitly recommends reexpressing a negative given as a positive statement."],
  ["V-SPLIT-CONJUNCTION-GIVEN","Split a Conjunction Given","S4-VELLEMAN-2006-2E",392,"Summary of Proof Techniques — given P ∧ Q","PROOF_STRUCTURE","NONE","Velleman explicitly instructs treating a conjunction given as two givens."],
  ["V-DISJUNCTION-CASES-GIVEN","Use a Disjunction Given for Cases","S4-VELLEMAN-2006-2E",392,"Summary of Proof Techniques — given P ∨ Q","PROOF_STRUCTURE","NONE","Velleman explicitly instructs using a disjunction given to split the proof into cases."],
  ["V-SPLIT-BICONDITIONAL-GIVEN","Split a Biconditional Given","S4-VELLEMAN-2006-2E",392,"Summary of Proof Techniques — given P ↔ Q","PROOF_STRUCTURE","NONE","Velleman explicitly instructs treating a biconditional given as the two conditional givens P→Q and Q→P."],

  // Putnam and Beyond — substantive named TOC subsections omitted from the first
  // broad sweep. Generic 'other problems' continuation headings remain unharvested.
  ["P-POSITIVITY-SQUARES","Positivity of Squares (x² ≥ 0)","S5-GELCA-ANDREESCU-2007",6,"2.1.2 x² ≥ 0","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives x² ≥ 0 a dedicated inequalities subsection."],
  ["P-MATRIX-OPERATIONS","Operations with Matrices","S5-GELCA-ANDREESCU-2007",7,"2.3.1 Operations with Matrices","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives operations with matrices a dedicated subsection."],
  ["P-BINARY-OPERATIONS","Binary Operations","S5-GELCA-ANDREESCU-2007",7,"2.4.1 Binary Operations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives binary operations a dedicated abstract-algebra subsection."],
  ["P-GROUPS","Groups","S5-GELCA-ANDREESCU-2007",7,"2.4.2 Groups","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives groups a dedicated subsection."],
  ["P-RINGS","Rings","S5-GELCA-ANDREESCU-2007",7,"2.4.3 Rings","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives rings a dedicated subsection."],
  ["P-SERIES","Series","S5-GELCA-ANDREESCU-2007",7,"3.1.5 Series","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives series a dedicated subsection."],
  ["P-LIMITS-FUNCTIONS","Limits of Functions","S5-GELCA-ANDREESCU-2007",7,"3.2.1 Limits of Functions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives limits of functions a dedicated subsection."],
  ["P-CONTINUOUS-FUNCTIONS","Continuous Functions","S5-GELCA-ANDREESCU-2007",7,"3.2.2 Continuous Functions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives continuous functions a dedicated subsection."],
  ["P-DERIVATIVES-APPLICATIONS","Derivatives and Their Applications","S5-GELCA-ANDREESCU-2007",7,"3.2.4 Derivatives and Their Applications","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives derivatives and their applications a dedicated subsection."],
  ["P-INDEFINITE-INTEGRALS","Indefinite Integrals","S5-GELCA-ANDREESCU-2007",7,"3.2.7 Indefinite Integrals","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives indefinite integrals a dedicated subsection."],
  ["P-DEFINITE-INTEGRALS","Definite Integrals","S5-GELCA-ANDREESCU-2007",7,"3.2.8 Definite Integrals","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives definite integrals a dedicated subsection."],
  ["P-ODE-TECHNIQUES","Problems Solved with Techniques of Differential Equations","S5-GELCA-ANDREESCU-2007",8,"3.4.4 Problems Solved with Techniques of Differential Equations","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives problems solved with differential-equation techniques a dedicated subsection."],
  ["P-CONICS-CURVES","Conics and Other Curves in the Plane","S5-GELCA-ANDREESCU-2007",8,"4.1.3 Conics and Other Curves in the Plane","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives conics and other plane curves a dedicated geometry subsection."],
  ["P-HIGHER-DIM-COORD-GEOMETRY","Coordinate Geometry in Three and More Dimensions","S5-GELCA-ANDREESCU-2007",8,"4.1.4 Coordinate Geometry in Three and More Dimensions","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives higher-dimensional coordinate geometry a dedicated subsection."],
  ["P-PRIME-NUMBERS","Prime Numbers","S5-GELCA-ANDREESCU-2007",8,"5.2.2 Prime Numbers","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives prime numbers a dedicated number-theory subsection."],
  ["P-SET-COMBINATORICS","Set Theory and Combinatorics of Sets","S5-GELCA-ANDREESCU-2007",9,"6.1.1 Set Theory and Combinatorics of Sets","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives set theory and combinatorics of sets a dedicated subsection."],
  ["P-BINOMIAL-COUNTING","Binomial Coefficients and Counting Methods","S5-GELCA-ANDREESCU-2007",9,"6.2 Binomial Coefficients and Counting Methods","SOURCE_TERMINOLOGY","NONE","Putnam and Beyond gives binomial coefficients and counting methods a named section."],
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
  ...ARSENAL_GATE2_LEDGER_ROUTE_CANDIDATES,
  ...ARSENAL_GATE2_OFFICIAL_SOLUTION_CANDIDATES,
  ...ARSENAL_GATE2_BOOK_CANDIDATES,
]);

export const ARSENAL_GATE2_RAW_EVIDENCE = Object.freeze([
  ...ARSENAL_GATE2_LEGACY_TAG_EVIDENCE,
  ...ARSENAL_GATE2_SECONDARY_TAG_EVIDENCE,
  ...ARSENAL_GATE2_LEDGER_BRIDGE_EVIDENCE,
  ...ARSENAL_GATE2_LEDGER_ROUTE_EVIDENCE,
  ...ARSENAL_GATE2_OFFICIAL_SOLUTION_EVIDENCE,
  ...ARSENAL_GATE2_BOOK_EVIDENCE,
]);

export const ARSENAL_GATE2_HARVEST_META = Object.freeze({
  gate: 2,
  status: "RAW-HARVEST-REVIEW-CANDIDATE",
  legacyMethodTagCount: SMMC_METHOD_TAGS.length,
  legacyCandidates: ARSENAL_GATE2_LEGACY_TAG_CANDIDATES.length,
  secondaryTagCandidates: ARSENAL_GATE2_SECONDARY_TAG_CANDIDATES.length,
  ledgerBridgeCandidates: ARSENAL_GATE2_LEDGER_BRIDGE_CANDIDATES.length,
  ledgerBridgeEvidenceRecords: ARSENAL_GATE2_LEDGER_BRIDGE_META.evidenceRecords,
  ledgerRouteCandidates: ARSENAL_GATE2_LEDGER_ROUTE_META.candidates,
  ledgerRouteEvidenceRecords: ARSENAL_GATE2_LEDGER_ROUTE_META.evidenceRecords,
  officialSolutionCandidates: ARSENAL_GATE2_OFFICIAL_SOLUTION_META.candidates,
  officialSolutionEvidenceRecords: ARSENAL_GATE2_OFFICIAL_SOLUTION_META.evidenceRecords,
  bookSourceCandidates: ARSENAL_GATE2_BOOK_CANDIDATES.length,
  totalCandidates: ARSENAL_GATE2_RAW_CANDIDATES.length,
  totalEvidenceRecords: ARSENAL_GATE2_RAW_EVIDENCE.length,
  ontologyFrozen: false,
  adjudicationStarted: false,
  rankingStarted: false,
  prerequisiteGraphStarted: false,
});
