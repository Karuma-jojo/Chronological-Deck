// SMMC Arsenal — Gate 3 mass granularity classifier v1.
//
// IMPORTANT: this module does not invent new ruler semantics. It applies the
// independently accepted Gate-3 calibration contract at exact SHA
// 177a8efa24ebca15e2c84dbb18e96a72be5e1d08.
//
// Inputs are restricted to:
//   1. the accepted raw candidate expression; and
//   2. accepted Gate-2 evidence records owned by that exact candidate.
//
// No richer PDF reading, model familiarity, aliasing, ontology, merge/split,
// ranking, prerequisites, relations, learning order, or product decisions occur
// here. CROSS_SCALE is never emitted by this mass classifier; the only active
// CROSS_SCALE sentinel is the already-reviewed Zeitz Crux Move calibration row.

import { ARSENAL_GATE3_MASS_BUNDLE_REVIEW_V4 } from "./granularity-bundle-review-v1.mjs";

const lower = value => String(value ?? "").toLowerCase();

const EXPLICIT_ACTION_RE = /^(?:(?:how\s+to\s+prove)|analy[sz]e|apply|assume|bound|brainstorm|build|change|choose|clear|color|compare|complete|construct|count|create|define|decompose|derive|diagonalize|differentiate|disprove|divide|draw|encode|eliminate|expand|extend|extract|factor|filter|find|generalize|get|identify|instantiate|integrate|invent|invert|look|make|normalize|pair|partition|perturb|produce|prove|recast|reduce|reexpress|reflect|replace|restate|rotate|search|select|shear|show|simplify|split|steal|substitute|symmetrize|take|telescope|track|translate|treat|use|work|working|breaking|brainstorming|clearing|combining|counting|creating|defining|disproving|dividing|encoding|expanding|factoring|filtering|instantiating|inventing|pairing|partitioning|producing|proving|restating|searching|smoothing|stealing|taking|treating|using|bounding)\b/i;

const IMPLICIT_OPERATION_RE = /\b(?:argument|reformulation|reduction|construction|encoding|decomposition|comparison|normalization|approximation|bound(?:ing)?|pairing|partition(?:ing)?|factorization|substitution|elimination|expansion|replacement|projection|parametri[sz]ation|symmetrization|rearrangement|recursion|diagonalization|optimization|conditioning|descent|averaging|smoothing|counting|exchange|bootstrap|filter|transformation|translation|reflection|rotation|inversion|shearing|bisection|interpolation|extrapolation|compression|recognition|trapping|refinement|control|centering|coloring|guarding|cancellation|summation|experimentation)\b/i;

const BROAD_TOPIC_RE = /^(?:algebra|linear algebra|analysis|calculus|combinatorics|discrete mathematics|number theory|geometry|probability|statistics|graph|graph theory|groups?|rings?|fields?|polynomials?|matrices|determinants|complex numbers|inequalities|sequences?|series|functions?|recurrences?|generating functions|formal power series|ordinary generating functions|convexity|monotonicity|projective geometry|projective-geo|vector geometry|vector-geo|lattice geometry|lattice|polyhedral geometry|random walk|random walks|random-walk|random process|random processes|random-process|stopping|game|game theory|tiling|tilings?|topology|coordinate geometry|coordinates|vectors?|counting strategies|combinatorial strategies|finite graphs?|ode)$/i;

const BROAD_FAMILY_RE = /\b(?:vocabulary|language|foundations?|theory|strategies|strategy area|methods|techniques|toolbox|topics|facts and definitions|facts\/definitions)\b/i;

const COMPOUND_TOPIC_HEADING_RE = /\b(?:and|&)\b/i;
const DEDICATED_HEADING_CLAIM_RE = /\b(?:dedicated|named)\s+(?:subsection|section|chapter)\b/i;
const OPAQUE_TOKEN_RE = /^[A-Z][A-Z0-9-]{1,15}$/;
const STANDARD_MATH_WORD_RE = /\b(?:algebra|analysis|calculus|combinator|number|integer|prime|polynomial|matrix|determinant|vector|graph|geometry|probability|sequence|series|function|equation|inequality|convex|concav|modulo|mod-|valuation|divisib|root|basis|field|group|ring|set|binomial|recurrence|generating|asymptotic|symmetr|monot|parity|pigeonhole|bijection|induction|contradiction|contrapositive|invariant|descent|normal form|optimization|conditioning|expectation|random|lattice|projective|coordinate|topology)\b/i;

const SOURCE_LOCAL_CLAIM_RE = /(?:leading principles .{0,120} compact contest training .{0,120} classifying problems|explicitly defines a crossover .{0,160} frames .{0,160} as crossover tactics)/i;

const METHOD_LIKE_RE = /\b(?:proof|theorem|principle|lemma|method|tactic|strategy|argument|criterion|test|rule|algorithm|construction|reduction|reformulation|encoding|viewpoint|filter|descent|induction|contradiction|contrapositive|invariant|monovariant|pigeonhole|bijection|conditioning|recurrence|exchange|optimization|normal form|obstruction|bootstrap|inclusion[-–— ]exclusion)\b/i;

const STATIC_SCOPE_RE = /\b(?:domain|topic|area|vocabulary|language|theory|geometry|algebra|analysis|calculus|probability|groups?|rings?|fields?|sequences?|series|functions?|graphs?|scope|cross-domain)\b/i;

const OFFICIAL_OPERATIONAL_CLAIM_RE = /\b(?:applies|applying|assumes|assigns|begins|bounds|cancels|chooses|colors|combines|compares|computes|concludes|constructs|converts|counts|decomposes|deduces|defines|derives|differentiates|draws|encodes|evaluates|expands|exploits|extracts|factors|forces|forms|identifies|inducts|integrates|interprets|invokes|maintains|maps|moves|normalizes|observes|obtains|pairs|parametri[sz]es|partitions|places|projects|recovers|reduces|replaces|rewrites|rotates|sets|shifts|shows|solves|splits|substitutes|sums|swaps|tracks|translates|uses|proves|used\s+to|diagonali[sz]es)\b/i;

// Non-Battle source/index prose is deliberately parsed more narrowly. Verbs such
// as "presents", "records", "gives a section", or passive "used in the text" are
// provenance/terminology facts, not evidence of an executable operation.
const SOURCE_OPERATIONAL_CLAIM_RE = /\b(?:instructs|recommends|describes .{0,80} trigger|lists assuming|lists proving|proving .{0,80} separately|split(?:ting)? .{0,80} goal|reexpress(?:ing)? .{0,80} goal|taking an arbitrary object|finding a value|instantiates|treating .{0,80} as two givens|using a disjunction given to split)\b/i;

const OUTPUT_CLAIM_RE = /\b(?:cancels|classification|clique|coefficients?|contradiction|deduce|deduces|determines|differential equation|divisibility|equal|equality|fixed point|forces|forcing|gives|history|implies|injective|lower bound|nonnegativity|obtains|ordering|produces|recurrence|reduces|reduction|representation|root|shows|subsequence|surjective|therefore|upper bound|valuation|vanish|vanishes|yields|bound)\b/i;

const TRIGGER_CLAIM_RE = /\b(?:if|when|whenever|given|suppose|assume|case|out-of-order|smallest|largest|least|interior|minimum|maximum|odd|even|goal|condition|dense set|finite|nonzero|positive|negative|symmetry)\b/i;

// Candidate-owned evidence clauses with explicit condition/result roles.
// These supplement (but never replace) the accepted, strict evidence contract.
// The diagnostic witness is a source-literal matched span; it adds no field
// to the frozen Gate-3 record schema or to the Gate-2 corpus.
const RESULT_ROLE_SPAN_RE = /\b(?:to obtain\s+(?:boundedness|a limiting parameter)|to avoid\s+self-intersections|to block diagonal form|into existence and uniqueness obligations|intersection count changes only by even amounts|to decide convergence or divergence|to control convergence\/divergence|to bootstrap regularity from boundedness to continuity)\b/i;
const CONDITION_ROLE_SPAN_RE = /\b(?:once\s+(?:the|a|an)\s+[^,;.]{3,120}|discriminant\s+(?:is\s+)?greater than zero)\b/i;
// Reusable mathematical-result grammatical roles, applied ONLY to qualifying
// owned operational evidence. These name relationships/proofs of equivalence,
// reversibility and identification rather than three special raw candidate IDs.
const RESULT_RELATION_CLAUSES = Object.freeze([
  /\b(?:is|are|was|were|becomes?)\s+equivalent\s+to\b[^,;.]{3,140}/i,
  /\b(?:proves?|shows?|establishes?|demonstrates?)\s+(?:that\s+)?[^,;.]{2,140}?\b(?:is\s+reversible|is\s+bijective|is\s+equivalent|corresponds?\s+to)\b/i,
  /\b(?:proves?|establishes?|constructs?|demonstrates?)\s+(?:an?\s+)?(?:bijection|reversible\s+correspondence)\b[^,;.]{0,140}/i,
  /\b(?:identifies?|models?|realizes?|represents?)\s+[^,;.]{3,180}?\b(?:with|as)\s+[^,;.]{3,140}/i,
  /\b(?:holds|occurs)\s+(?:exactly\s+)?when\b[^,;.]{3,140}/i,
]);
const mathematicalResultClause = claim =>
  RESULT_RELATION_CLAUSES.map(re => claim.match(re)?.[0]).find(Boolean) ?? null;

// A raw "X to Y" expression and a corresponding verified claim saying
// "uses X to obtain Y" together identify X as the existing premise.
// This is a role agreement between the candidate and its own claim, not a
// generic "uses ..." or mathematical-noun keyword shortcut.
const namedPremiseWitness = (name, evidenceRecords) => {
  const match = /^(.{4,90}?)\s+to\s+.{4,90}$/i.exec(name.trim());
  if (!match) return null;
  const premise = match[1].toLowerCase().trim();
  for (const e of evidenceRecords) {
    if (!qualifyingClaim(e)) continue;
    const claim = e.claim ?? "";
    const use = /\b(?:uses?|applies?|starts?\s+from)\s+(.{3,140}?)\s+to\s+(?:obtain|derive|deduce|prove|show|establish|force|produce|yield)\b/i.exec(claim);
    if (use && use[1].toLowerCase().includes(premise))
      return { evidenceRecordId: e.recordId, trigger: use[1].trim() };
    const explicitPremise = /\b(?:assuming|given|under)\s+([^,;.]{4,140})/i.exec(claim);
    if (explicitPremise && explicitPremise[1].toLowerCase().includes(premise))
      return { evidenceRecordId: e.recordId, trigger: explicitPremise[1].trim() };
  }
  return null;
};

const qualifyingClaim = e => e?.evidenceBasis === "SOURCE_FACT" && e?.verificationStatus === "VERIFIED" &&
  ((e?.recordChannel === "BATTLE" && e?.claimKind === "HISTORICAL_OCCURRENCE") ||
   (e?.recordChannel === "DISCOVERY" && e?.claimKind === "DISCOVERY_HEURISTIC") ||
    e?.claimKind === "PROOF_STRUCTURE");
export function gate3ClaimBoundaryWitnesses(records) {
  return Object.freeze(records.map(e => {
    if (!qualifyingClaim(e)) return null;
    const claim = e.claim ?? "";
    const trigger = claim.match(CONDITION_ROLE_SPAN_RE)?.[0] ?? null;
    const output = claim.match(RESULT_ROLE_SPAN_RE)?.[0] ?? mathematicalResultClause(claim);
    return trigger || output ? Object.freeze({ evidenceRecordId: e.recordId, trigger, output }) : null;
  }).filter(Boolean));
}
const OUTPUT_SIGNAL_RE = /\b(?:bound|contradiction|normal form|ordering|identity|equality|estimate|count|valuation|divisibility|injectivity|surjectivity|obstruction|classification|solution|fixed point|root|recurrence|differential equation|nonnegativity)\b/i;

const DISTINCT_RESULT_RE = /\b(?:bound|contradiction|normal form|ordering|identity|equality|estimate|count|valuation|divisibility|injectivity|surjectivity|obstruction|classification|solution|fixed point|root|differential equation|nonnegativity)\b/i;

// Only constrained existing inputs or specified proof goals can lexically
// supply a triggering situation; created outputs do not count.
const EXISTING_INPUT_ACTION_RE = /^(?:diagonalize|differentiate|integrate|factor|invert|normalize|reduce|simplify|eliminate|clear|rotate|reflect|symmetrize|partition|decompose|translate|expand)\b/i;
// Input type must contain two DISTINCT structural cues: e.g. a matrix with
// a size/structure modifier. A bare "polynomial" cannot qualify itself.
const CONSTRAINED_EXISTING_INPUT_RE = /\b(?:\d+\s*(?:-?by-?|[×x])\s*\d+\s+(?:\w+\s+){0,2}(?:matrix|system|vector|determinant)|(?:polynomial|quadratic|linear|integer|cyclic|finite|symmetric|skew|homogeneous|nonnegative)\s+(?:matrix|equation|inequality|recurrence|vector|graph|system|polynomial))\b/i;
const SPECIFIC_PROOF_GOAL_RE = /^how\s+to\s+prove\s+(?:set equality|equality of sets|an? inequality|divisibility)\b/i;
// Only the PRE-destination input phrase can establish a lexical trigger.
// A constrained result is not a recognizable input; a constrained original
// remains eligible even when the wording also names its output.
const RESULT_DESTINATION_RE = /\b(?:into|to\s+(?:a|an|the)\b|to\s+(?:obtain|produce|create|construct|yield|form|become|make)\b|yielding|producing|resulting\s+in)\b/i;
const lexicalRoleTrigger = name => {
  if (SPECIFIC_PROOF_GOAL_RE.test(name)) return true;
  if (!EXISTING_INPUT_ACTION_RE.test(name)) return false;
  const destination = RESULT_DESTINATION_RE.exec(name);
  const input = destination ? name.slice(0, destination.index) : name;
  return CONSTRAINED_EXISTING_INPUT_RE.test(input);
};

const RESULTATIVE_EXPLICIT_RE = /^(?:construct|diagonalize|encode|factor|normalize|reduce|reexpress|recast|split|partition|translate|rotate|reflect|invert|symmetrize|complete|clear|eliminate|replace)\b/i;

// Broad structural coordination is an invitation to REVIEW, not proof of
// bundling. Do not constrain discovery with a finite operation-noun lexicon.
const BUNDLE_COORDINATION_RE = /\b(?:and|then|plus|followed by)\b|[\/+→&,]|->/i;
export function surfaceGate3MassBundleCandidate(candidate) {
  return BUNDLE_COORDINATION_RE.test(candidate.candidateName ?? "");
}

// All surface candidates have explicit evidence-bounded positive/negative calls.
export const ARSENAL_GATE3_MASS_BUNDLE_DECISIONS = ARSENAL_GATE3_MASS_BUNDLE_REVIEW_V4;
export const ARSENAL_GATE3_REJECTED_BUNDLE_SHORTCUT_IDS = Object.freeze([
  "RAW-OFFICIAL-074", "RAW-OFFICIAL-075", "RAW-OFFICIAL-077",
  "RAW-OFFICIAL-080", "RAW-OFFICIAL-084", "RAW-OFFICIAL-099",
  "RAW-OFFICIAL-102", "RAW-OFFICIAL-108",
]);
const bundleDecisionById = new Map(
  ARSENAL_GATE3_MASS_BUNDLE_DECISIONS.map(row => [row.candidateId, row])
);
const auditedMassBundle = candidateId =>
  bundleDecisionById.get(candidateId)?.decision === "BUNDLE";

// Semantic dependence is not established merely because an official sentence
// says "the recurrence" or "alternative route" while narrating its inputs.
const localCue = (name, claim) =>
  /\b(?:this recurrence|this problem|specific problem|particular problem|this configuration|specific configuration)\b/i.test(name) ||
  (/\brecoverability lemma\b/i.test(name) &&
   /\bfinal state determines the last move\b/i.test(claim)) ||
  (/\bsmallest nondivisible multiplier advances prime support\b/i.test(name) &&
   /\bthe recurrence to acquire that prime factor\b/i.test(claim));

const sourceLocalCue = (name, claim) =>
  (
    /^(?:strategy|tactic|tool|crux move)$/i.test(name) &&
    /\b(?:explicitly defines|his broad level|as his|strategic, tactical, or tool)\b/i.test(claim)
  ) ||
  SOURCE_LOCAL_CLAIM_RE.test(claim);

const broadByExpression = (candidate, claim) => {
  const name = candidate.candidateName.trim();
  if (BROAD_TOPIC_RE.test(name)) return true;
  if (BROAD_FAMILY_RE.test(name) && !explicitAction(name)) return true;
  if (/\b(?:distance, paths, cycles, trees and components|facts, definitions|basic vocabulary|finite graph\/game vocabulary|square-free\/prime-factor language)\b/i.test(name)) return true;
  // A source claim that this is a dedicated heading can support a broad-heading
  // reading only when the expression itself visibly joins multiple topic nouns.
  if (
    DEDICATED_HEADING_CLAIM_RE.test(claim) &&
    COMPOUND_TOPIC_HEADING_RE.test(name) &&
    !explicitAction(name)
  ) return true;
  return false;
};

const explicitAction = name => {
  const trimmed = name.trim();
  if (/^Set\s+(?:Theory|Systems?|Partitions?|Functions?)\b/i.test(trimmed)) return false;
  if (/^Use\s+of\b/i.test(trimmed)) return false;
  return EXPLICIT_ACTION_RE.test(trimmed);
};

const evidenceOperational = evidenceRecords =>
  evidenceRecords.some(e => {
    const claim = e.claim ?? "";
    const isOfficialBattle =
      e.evidenceBasis === "SOURCE_FACT" &&
      e.recordChannel === "BATTLE" &&
      e.claimKind === "HISTORICAL_OCCURRENCE" &&
      e.verificationStatus === "VERIFIED";
    return isOfficialBattle
      ? OFFICIAL_OPERATIONAL_CLAIM_RE.test(claim)
      : SOURCE_OPERATIONAL_CLAIM_RE.test(claim);
  });

const evidenceOutput = evidenceRecords =>
  evidenceRecords.some(e => qualifyingClaim(e) && OUTPUT_CLAIM_RE.test(e.claim ?? "")) ||
  gate3ClaimBoundaryWitnesses(evidenceRecords).some(w => w.output !== null);

const evidenceTrigger = evidenceRecords =>
  evidenceRecords.some(e => qualifyingClaim(e) && TRIGGER_CLAIM_RE.test(e.claim ?? "")) ||
  gate3ClaimBoundaryWitnesses(evidenceRecords).some(w => w.trigger !== null);

const richOfficial = evidenceRecords =>
  evidenceRecords.some(e =>
    e.evidenceBasis === "SOURCE_FACT" &&
    e.recordChannel === "BATTLE" &&
    e.claimKind === "HISTORICAL_OCCURRENCE" &&
    e.verificationStatus === "VERIFIED"
  );

const richDiscovery = evidenceRecords =>
  evidenceRecords.some(e =>
    e.evidenceBasis === "SOURCE_FACT" &&
    e.recordChannel === "DISCOVERY" &&
    e.claimKind === "DISCOVERY_HEURISTIC"
  );

const operationalProofStructure = evidenceRecords =>
  evidenceRecords.some(e =>
    e.evidenceBasis === "SOURCE_FACT" &&
    e.claimKind === "PROOF_STRUCTURE" &&
    SOURCE_OPERATIONAL_CLAIM_RE.test(e.claim ?? "")
  );

const bundleSupported = candidate => auditedMassBundle(candidate.candidateId);

const problemLocalReach = (candidate, evidenceRecords) => {
  const hasHistorical = evidenceRecords.some(e => Array.isArray(e.historicalProblemIds) && e.historicalProblemIds.length > 0);
  if (!hasHistorical) return false;
  const claim = evidenceRecords.map(e => e.claim ?? "").join(" ");
  return localCue(candidate.candidateName, claim);
};

const methodLike = name => METHOD_LIKE_RE.test(name);
const staticallyNonOperational = name => STATIC_SCOPE_RE.test(name) && !IMPLICIT_OPERATION_RE.test(name) && !EXPLICIT_ACTION_RE.test(name);

const supportSummary = evidenceRecords => {
  if (richOfficial(evidenceRecords)) return "candidate-owned verified official Battle evidence";
  if (richDiscovery(evidenceRecords)) return "candidate-owned canonical Discovery evidence";
  if (operationalProofStructure(evidenceRecords)) return "candidate-owned operational proof-structure evidence";
  if (evidenceRecords.every(e => e.evidenceBasis === "PROJECT_DERIVED")) return "candidate-owned project-index evidence";
  return "candidate-owned accepted source evidence";
};

const commonContextReach = (candidate, evidenceRecords) => {
  const name = candidate.candidateName.trim();
  const claim = evidenceRecords.map(e => e.claim ?? "").join(" ");
  if (sourceLocalCue(name, claim)) return "SOURCE_LOCAL";
  if (problemLocalReach(candidate, evidenceRecords)) return "PROBLEM_LOCAL";

  // Opaque all-caps/hyphen tokens do not become semantically GENERAL merely
  // because they came from an index vocabulary.
  if (OPAQUE_TOKEN_RE.test(name) && !BROAD_TOPIC_RE.test(name)) return "UNRESOLVED";

  // GENERAL requires positive source-independent semantics in the current
  // expression: recognizable mathematical vocabulary, an explicit action, a
  // method/proof form, or an accepted broad mathematical topic.
  if (
    BROAD_TOPIC_RE.test(name) ||
    STANDARD_MATH_WORD_RE.test(name) ||
    explicitAction(name) ||
    IMPLICIT_OPERATION_RE.test(name) ||
    METHOD_LIKE_RE.test(name)
  ) return "GENERAL";

  return "UNRESOLVED";
};

const boundaryForAction = ({ candidate, evidenceRecords, actionShape, operationStrength }) => {
  const name = candidate.candidateName;
  const lexicalConditionTrigger =
    /\b(?:when|whenever|if|given|assuming|under the condition|under conditions)\b/i.test(name);

  // A constrained existing object or precise proof goal can invite a move.
  // A created noun such as "Define a Function" is not a trigger.
  const lexicalObjectTrigger =
    actionShape === "EXPLICIT_ACTION" && lexicalRoleTrigger(name);

  const lexicalResult =
    actionShape === "EXPLICIT_ACTION" && RESULTATIVE_EXPLICIT_RE.test(name);
  const namedPremise = namedPremiseWitness(name, evidenceRecords);

  const hasTrigger =
    evidenceTrigger(evidenceRecords) ||
    namedPremise !== null ||
    lexicalConditionTrigger ||
    lexicalObjectTrigger;
  const hasOutput =
    evidenceOutput(evidenceRecords) ||
    OUTPUT_SIGNAL_RE.test(name) ||
    lexicalResult;

  const operationBoundary =
    operationStrength === "CLEAR" ? "CLEAR" :
    operationStrength === "PARTIAL" ? "PARTIAL" :
    actionShape === "EXPLICIT_ACTION" ? "CLEAR" :
    "UNRESOLVED";

  const triggerBoundary =
    hasTrigger && (
      richOfficial(evidenceRecords) ||
      richDiscovery(evidenceRecords) ||
      operationalProofStructure(evidenceRecords) ||
      namedPremise !== null ||
      lexicalConditionTrigger ||
      lexicalObjectTrigger
    ) ? "CLEAR" :
    hasTrigger ? "PARTIAL" :
    "UNRESOLVED";

  const outputBoundary =
    hasOutput && (
      richOfficial(evidenceRecords) ||
      richDiscovery(evidenceRecords) ||
      operationalProofStructure(evidenceRecords) ||
      lexicalResult
    ) ? "CLEAR" :
    hasOutput ? "PARTIAL" :
    actionShape === "EXPLICIT_ACTION" ? "PARTIAL" :
    "UNRESOLVED";

  return { triggerBoundary, operationBoundary, outputBoundary };
}
export function buildGate3MassAssessment(candidate, evidenceRecords) {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("Gate-3 mass classifier requires a raw candidate.");
  }
  if (!Array.isArray(evidenceRecords) || evidenceRecords.length === 0) {
    throw new Error(`Gate-3 mass classifier requires candidate-owned evidence for ${candidate?.candidateId}`);
  }
  const owned = new Set(candidate.evidenceRecordIds);
  for (const evidence of evidenceRecords) {
    if (evidence.candidateId !== candidate.candidateId || !owned.has(evidence.recordId)) {
      throw new Error(`Gate-3 mass classifier received non-owned evidence for ${candidate.candidateId}: ${evidence.recordId}`);
    }
  }

  const name = candidate.candidateName;
  const claim = evidenceRecords.map(e => e.claim ?? "").join(" ");
  const contextReach = commonContextReach(candidate, evidenceRecords);
  const support = supportSummary(evidenceRecords);

  // The accepted calibration explicitly forbids introducing a second CROSS_SCALE
  // meaning during the mass pass. This classifier therefore never emits it.

  // MP01 — broad subject/family/scope expression: confidently non-operational at
  // this grain, hence MACRO + LABEL_ONLY + ABSENT boundaries.
  if (broadByExpression(candidate, claim)) {
    return {
      candidateId: candidate.candidateId,
      referenceScale: "MACRO",
      bundleStructure: "UNRESOLVED",
      actionShape: "LABEL_ONLY",
      contextReach,
      triggerBoundary: "ABSENT",
      operationBoundary: "ABSENT",
      outputBoundary: "ABSENT",
      confidence: "HIGH",
      rationale: `MP01 broad-label rule: ${name} is expressed as a topic/family/scope rather than one deliberate move. ${support} does not make the current expression operational, so the trigger, operation, and output boundaries are affirmatively absent at this grain.`,
    };
  }

  const isExplicit = explicitAction(name);
  const hasOperationalEvidence = evidenceOperational(evidenceRecords);
  const hasImplicitOperationWord = IMPLICIT_OPERATION_RE.test(name);
  const actionShape =
    isExplicit ? "EXPLICIT_ACTION" :
    (hasOperationalEvidence || hasImplicitOperationWord) ? "IMPLICIT_ACTION" :
    "LABEL_ONLY";

  const hasBundle = bundleSupported(candidate);

  // MP02 — evidence-supported multiple-operation bundle. Multiple operations are
  // MACRO + BUNDLED_MOVES; mixed grain is NOT inferred.
  if (hasBundle) {
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape,
      operationStrength: hasOperationalEvidence || isExplicit ? "CLEAR" : "PARTIAL",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "MACRO",
      bundleStructure: "BUNDLED_MOVES",
      actionShape,
      contextReach,
      triggerBoundary: b.triggerBoundary,
      operationBoundary: b.operationBoundary,
      outputBoundary: b.outputBoundary,
      confidence: richOfficial(evidenceRecords) || operationalProofStructure(evidenceRecords) ? "HIGH" : "MEDIUM",
      rationale: `MP02 bundle rule: ${name} is supported by ${support} as containing multiple meaningful operations. Under the accepted ruler that is MACRO + BUNDLED_MOVES; no CROSS_SCALE claim is inferred merely from multiplicity.`,
    };
  }

  // MP03 — rich official occurrence describing one operation/result.
  if (richOfficial(evidenceRecords) && hasOperationalEvidence) {
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape: actionShape === "LABEL_ONLY" ? "IMPLICIT_ACTION" : actionShape,
      operationStrength: "CLEAR",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "DEPLOYABLE",
      bundleStructure: "SINGLE_PRIMARY_MOVE",
      actionShape: actionShape === "LABEL_ONLY" ? "IMPLICIT_ACTION" : actionShape,
      contextReach,
      triggerBoundary: b.triggerBoundary,
      operationBoundary: "CLEAR",
      outputBoundary: evidenceOutput(evidenceRecords) ? "CLEAR" : b.outputBoundary,
      confidence: "HIGH",
      rationale: `MP03 official-single-move rule: ${support} explicitly describes an operation for ${name}${evidenceOutput(evidenceRecords) ? " and an immediate mathematical result" : ""}. That supports one deployable primary move without importing semantics beyond the owned official claim.`,
    };
  }

  // MP04 — canonical Discovery heuristic with an operational statement.
  if (richDiscovery(evidenceRecords) && (isExplicit || hasOperationalEvidence || hasImplicitOperationWord)) {
    const shape = isExplicit ? "EXPLICIT_ACTION" : "IMPLICIT_ACTION";
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape: shape,
      operationStrength: hasOperationalEvidence || isExplicit ? "CLEAR" : "PARTIAL",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "DEPLOYABLE",
      bundleStructure: "SINGLE_PRIMARY_MOVE",
      actionShape: shape,
      contextReach,
      triggerBoundary: b.triggerBoundary,
      operationBoundary: b.operationBoundary,
      outputBoundary: b.outputBoundary,
      confidence: "HIGH",
      rationale: `MP04 discovery rule: ${support} presents ${name} as an investigation/problem-solving action. The current expression supports one primary move; any trigger or payoff not stated by the accepted record remains partial or unresolved.`,
    };
  }

  // MP05 — operational proof-structure evidence (for example a source record that
  // actually states the goal transformation), not merely a chapter heading.
  if (operationalProofStructure(evidenceRecords)) {
    const shape = isExplicit ? "EXPLICIT_ACTION" : "IMPLICIT_ACTION";
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape: shape,
      operationStrength: "CLEAR",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "DEPLOYABLE",
      bundleStructure: "SINGLE_PRIMARY_MOVE",
      actionShape: shape,
      contextReach,
      triggerBoundary: evidenceTrigger(evidenceRecords) ? "CLEAR" : b.triggerBoundary,
      operationBoundary: "CLEAR",
      outputBoundary: evidenceOutput(evidenceRecords) ? "CLEAR" : b.outputBoundary,
      confidence: "HIGH",
      rationale: `MP05 proof-structure rule: ${support} explicitly states an operation for ${name}, rather than merely naming a proof category. That supports one deployable proof move; unstated boundaries remain partial or unresolved.`,
    };
  }

  // MP06 — explicit action in the raw expression itself. Thin index evidence may
  // establish only the label, but the action wording is part of the accepted raw
  // candidate expression and can support one move without importing outside math.
  if (isExplicit) {
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape: "EXPLICIT_ACTION",
      operationStrength: "CLEAR",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "DEPLOYABLE",
      bundleStructure: "SINGLE_PRIMARY_MOVE",
      actionShape: "EXPLICIT_ACTION",
      contextReach,
      triggerBoundary: b.triggerBoundary,
      operationBoundary: "CLEAR",
      outputBoundary: b.outputBoundary,
      confidence: "MEDIUM",
      rationale: `MP06 lexical-action rule: the accepted raw expression ${name} directly states one action. ${support} adds no license for richer semantics, so only boundaries actually present in the wording/evidence are marked clear or partial; the rest fail closed.`,
    };
  }

  // MP07 — compressed operation noun plus a SEMANTICALLY DISTINCT result signal.
  // Operation nouns such as factorization/reduction/construction cannot satisfy
  // both sides by themselves. Dedicated noun-heading compounds are caught by
  // MP01 before this point. With thin evidence, operation remains PARTIAL.
  if (hasImplicitOperationWord && DISTINCT_RESULT_RE.test(name)) {
    const b = boundaryForAction({
      candidate,
      evidenceRecords,
      actionShape: "IMPLICIT_ACTION",
      operationStrength: hasOperationalEvidence ? "CLEAR" : "PARTIAL",
    });
    return {
      candidateId: candidate.candidateId,
      referenceScale: "DEPLOYABLE",
      bundleStructure: "SINGLE_PRIMARY_MOVE",
      actionShape: "IMPLICIT_ACTION",
      contextReach,
      triggerBoundary: b.triggerBoundary,
      operationBoundary: b.operationBoundary,
      outputBoundary: b.outputBoundary,
      confidence: hasOperationalEvidence ? "HIGH" : "MEDIUM",
      rationale: `MP07 compressed-operation rule: ${name} lexically identifies one operation and a meaningful result form. Under strict mode the expression itself supports an approximately deployable move, while ${support} does not justify filling any missing trigger or procedural detail.`,
    };
  }

  // MP08 — compressed operation noun without enough output/grain information.
  // Operational structure is plausible, but permitted evidence cannot complete it.
  if (hasImplicitOperationWord || methodLike(name)) {
    return {
      candidateId: candidate.candidateId,
      referenceScale: "UNRESOLVED",
      bundleStructure: "UNRESOLVED",
      actionShape: hasImplicitOperationWord ? "IMPLICIT_ACTION" : "LABEL_ONLY",
      contextReach,
      triggerBoundary: "UNRESOLVED",
      operationBoundary: hasImplicitOperationWord ? "PARTIAL" : "UNRESOLVED",
      outputBoundary: "UNRESOLVED",
      confidence: "HIGH",
      rationale: `MP08 plausibly-operational-thin-evidence rule: ${name} is method/proof/operation-like, but ${support} does not determine a responsible deployable grain or complete trigger-operation-output structure. The unresolved boundaries reflect thin evidence, not absence.`,
    };
  }

  // MP09 — static non-operational label outside the broad-topic patterns.
  if (staticallyNonOperational(name)) {
    return {
      candidateId: candidate.candidateId,
      referenceScale: "MACRO",
      bundleStructure: "UNRESOLVED",
      actionShape: "LABEL_ONLY",
      contextReach,
      triggerBoundary: "ABSENT",
      operationBoundary: "ABSENT",
      outputBoundary: "ABSENT",
      confidence: "HIGH",
      rationale: `MP09 static-scope rule: ${name} is a non-operational scope/content expression at its current grain. ${support} does not introduce a move, so trigger, operation, and output are affirmatively absent rather than merely unstated.`,
    };
  }

  // MP10 — conservative fallback. The expression is neither demonstrably broad nor
  // demonstrably one deployable move under strict candidate-owned evidence.
  return {
    candidateId: candidate.candidateId,
    referenceScale: "UNRESOLVED",
    bundleStructure: "UNRESOLVED",
    actionShape: "LABEL_ONLY",
    contextReach,
    triggerBoundary: "UNRESOLVED",
    operationBoundary: "UNRESOLVED",
    outputBoundary: "UNRESOLVED",
    confidence: "HIGH",
    rationale: `MP10 strict fallback: neither the raw expression ${name} nor ${support} supports a responsible grain or operational-boundary call under the accepted ruler. The row therefore fails closed to UNRESOLVED rather than importing general mathematical familiarity.`,
  };
}

export const ARSENAL_GATE3_MASS_CLASSIFIER_META = Object.freeze({
  version: "v6",
  calibrationAcceptanceSha: "177a8efa24ebca15e2c84dbb18e96a72be5e1d08",
  evidenceMode: "STRICT_CANDIDATE_OWNED_GATE2",
  crossScaleMode: "SOURCE_SCALE_VARIABLE_ROLE_ONLY",
  emitsCrossScale: false,
  provenanceShortcutRemoved: true,
  triggerPrepositionShortcutRemoved: true,
  distinctOperationResultRequired: true,
  bundleAuditMode: "HIGH_RECALL_STRUCTURAL_SURFACE_WITH_POSITIVE_NEGATIVE_ADJUDICATION",
  massBundleDecisions: ARSENAL_GATE3_MASS_BUNDLE_DECISIONS,
  rejectedBundleShortcutIds: ARSENAL_GATE3_REJECTED_BUNDLE_SHORTCUT_IDS,
  contextReachFallback: "UNRESOLVED",
  triggerObjectRole: "PRE_DESTINATION_INPUT_ONLY",
  evidenceRoleSpans: "VERIFIED_CANDIDATE_OWNED",
  actionHeadAudit: "FIXED_CORPUS_V5_IMPERATIVE_REVIEW",
  contextReach: "ROLE_SENSITIVE_SEMANTIC_DEPENDENCE_V6",
  evidenceResultGrammar: "VERIFIED_OWNED_RELATION_CLAUSES_V6",
  premiseRoleAgreement: "NAME_AND_VERIFIED_CLAIM_V6",
  ruleIds: Object.freeze([
    "MP01",
    "MP02",
    "MP03",
    "MP04",
    "MP05",
    "MP06",
    "MP07",
    "MP08",
    "MP09",
    "MP10",
  ]),
});
