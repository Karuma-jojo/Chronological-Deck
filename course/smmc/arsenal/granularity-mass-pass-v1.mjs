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

const lower = value => String(value ?? "").toLowerCase();

const EXPLICIT_ACTION_RE = /^(?:analy[sz]e|apply|assume|bound|build|change|choose|clear|color|compare|complete|construct|count|decompose|derive|diagonalize|differentiate|draw|encode|eliminate|extract|factor|find|generalize|get|identify|integrate|invert|look|make|normalize|pair|partition|prove|recast|reduce|reexpress|reflect|replace|rotate|select|set|shear|show|simplify|split|substitute|symmetrize|telescope|translate|use|work|working|clearing|counting|encoding|factoring|pairing|partitioning|smoothing|bounding)\b/i;

const IMPLICIT_OPERATION_RE = /\b(?:argument|reformulation|reduction|construction|encoding|decomposition|comparison|normalization|approximation|bound(?:ing)?|pairing|partition(?:ing)?|factorization|substitution|elimination|expansion|replacement|projection|parametri[sz]ation|symmetrization|rearrangement|recursion|diagonalization|optimization|conditioning|descent|averaging|smoothing|counting|exchange|bootstrap|filter|transformation|translation|reflection|rotation|inversion|shearing|bisection|interpolation|extrapolation|compression|recognition|centering|coloring|guarding|cancellation|summation)\b/i;

const BROAD_TOPIC_RE = /^(?:algebra|linear algebra|analysis|calculus|combinatorics|discrete mathematics|number theory|geometry|probability|statistics|graph theory|groups?|rings?|fields?|polynomials?|matrices|determinants|complex numbers|inequalities|sequences?|series|functions?|recurrences?|generating functions|formal power series|ordinary generating functions|convexity|monotonicity|projective geometry|projective-geo|vector geometry|vector-geo|lattice geometry|lattice|polyhedral geometry|random walks?|random processes?|stopping|game theory|tilings?|topology|coordinate geometry|coordinates|vectors?|counting strategies|combinatorial strategies|finite graphs?)$/i;

const BROAD_FAMILY_RE = /\b(?:vocabulary|language|foundations?|theory|strategies|strategy area|methods|techniques|toolbox|topics|facts and definitions|facts\/definitions)\b/i;

const METHOD_LIKE_RE = /\b(?:proof|theorem|principle|lemma|method|tactic|strategy|argument|criterion|test|rule|algorithm|construction|reduction|reformulation|encoding|viewpoint|filter|descent|induction|contradiction|contrapositive|invariant|monovariant|pigeonhole|bijection|conditioning|recurrence|exchange|optimization|normal form|obstruction|bootstrap|inclusion[-–— ]exclusion)\b/i;

const STATIC_SCOPE_RE = /\b(?:domain|topic|area|vocabulary|language|theory|geometry|algebra|analysis|calculus|probability|groups?|rings?|fields?|sequences?|series|functions?|graphs?|scope|cross-domain)\b/i;

const OFFICIAL_OPERATIONAL_CLAIM_RE = /\b(?:applies|applying|assumes|assigns|begins|bounds|cancels|chooses|colors|combines|compares|computes|concludes|constructs|converts|counts|decomposes|deduces|defines|derives|differentiates|draws|encodes|evaluates|expands|exploits|extracts|factors|forces|forms|identifies|inducts|integrates|interprets|invokes|maintains|maps|moves|normalizes|observes|obtains|pairs|parametri[sz]es|partitions|places|projects|recovers|reduces|replaces|rewrites|rotates|sets|shifts|shows|solves|splits|substitutes|sums|swaps|tracks|translates|uses|proves|used\s+to)\b/i;

// Non-Battle source/index prose is deliberately parsed more narrowly. Verbs such
// as "presents", "records", "gives a section", or passive "used in the text" are
// provenance/terminology facts, not evidence of an executable operation.
const SOURCE_OPERATIONAL_CLAIM_RE = /\b(?:instructs|recommends|describes .{0,80} trigger|lists assuming|lists proving|proving .{0,80} separately|split(?:ting)? .{0,80} goal|reexpress(?:ing)? .{0,80} goal|taking an arbitrary object|finding a value|instantiates|treating .{0,80} as two givens|using a disjunction given to split)\b/i;

const OUTPUT_CLAIM_RE = /\b(?:cancels|classification|clique|coefficients?|contradiction|deduce|deduces|determines|differential equation|divisibility|equal|equality|fixed point|forces|forcing|gives|history|implies|injective|lower bound|nonnegativity|obtains|ordering|produces|recurrence|reduces|reduction|representation|root|shows|subsequence|surjective|therefore|upper bound|valuation|vanish|vanishes|yields|bound)\b/i;

const TRIGGER_CLAIM_RE = /\b(?:if|when|whenever|given|suppose|assume|case|out-of-order|smallest|largest|interior|minimum|maximum|odd|even|goal|condition|dense set|finite|nonzero|positive|negative)\b/i;

const RESULT_WORD_RE = /\b(?:bound|contradiction|reduction|reformulation|representation|normal form|ordering|identity|equality|estimate|approximation|construction|decomposition|factorization|encoding|count|valuation|divisibility|injectivity|surjectivity|obstruction|classification|solution)\b/i;

const EXPLICIT_TARGET_RE = /\b(?:goal|matrix|brackets?|denominators?|polynomial|equation|inequality|graph|sequence|function|expression|sum|product|recurrence|determinant|vector|configuration|set|partition|system)\b/i;

const RESULTATIVE_EXPLICIT_RE = /^(?:construct|diagonalize|encode|factor|normalize|reduce|reexpress|recast|split|partition|translate|rotate|reflect|invert|symmetrize|complete|clear|eliminate|replace)\b/i;

const STRONG_BUNDLE_CLAIM_RE = /\b(?:and then|after which|followed by|combines|combining|nests|nesting|first .{0,80} then|after .{0,80} then)\b/i;

const ACTION_TOKEN_RE = /\b(?:replacement|expansion|clearing|normalization|differentiation|halving|construction|reduction|counting|comparison|substitution|factorization|decomposition|encoding|projection|bounding|conditioning|reflection|rotation|translation|inversion|shearing|partitioning|pairing|diagonalization)\b/gi;

const localCue = text => /\b(?:this recurrence|the recurrence|this problem|specific problem|particular problem|this configuration|specific configuration|recoverability lemma|alternative route)\b/i.test(text);

const sourceLocalCue = (name, claim) =>
  /^(?:strategy|tactic|tool|crux move)$/i.test(name) &&
  /\b(?:explicitly defines|his broad level|as his|strategic, tactical, or tool)\b/i.test(claim);

const broadByExpression = (candidate, claim) => {
  if (candidate.origin === "SMMC_SECONDARY_TAG") return true;
  const name = candidate.candidateName.trim();
  if (BROAD_TOPIC_RE.test(name)) return true;
  if (BROAD_FAMILY_RE.test(name) && !EXPLICIT_ACTION_RE.test(name)) return true;
  if (/\b(?:distance, paths, cycles, trees and components|facts, definitions|basic vocabulary|finite graph\/game vocabulary|square-free\/prime-factor language)\b/i.test(name)) return true;
  if (/\b(?:chapter|section)\b/i.test(claim) && /^(?:groups?|graph theory|counting strategies|combinatorics|geometry|probability|analysis|algebra)$/i.test(name)) return true;
  return false;
};

const explicitAction = name => EXPLICIT_ACTION_RE.test(name.trim());

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
  evidenceRecords.some(e => OUTPUT_CLAIM_RE.test(e.claim ?? ""));

const evidenceTrigger = evidenceRecords =>
  evidenceRecords.some(e => TRIGGER_CLAIM_RE.test(e.claim ?? ""));

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

const bundleSupported = (name, claim) => {
  const tokens = [...name.matchAll(ACTION_TOKEN_RE)].map(m => m[0].toLowerCase());
  const nameHasJoin = /\b(?:and|then)\b|\+|\//i.test(name);
  return STRONG_BUNDLE_CLAIM_RE.test(claim) || (nameHasJoin && new Set(tokens).size >= 2);
};

const problemLocalReach = (candidate, evidenceRecords) => {
  const hasHistorical = evidenceRecords.some(e => Array.isArray(e.historicalProblemIds) && e.historicalProblemIds.length > 0);
  if (!hasHistorical) return false;
  const text = `${candidate.candidateName} ${evidenceRecords.map(e => e.claim ?? "").join(" ")}`;
  return localCue(text);
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
  const claim = evidenceRecords.map(e => e.claim ?? "").join(" ");
  if (sourceLocalCue(candidate.candidateName, claim)) return "SOURCE_LOCAL";
  if (problemLocalReach(candidate, evidenceRecords)) return "PROBLEM_LOCAL";
  return "GENERAL";
};

const boundaryForAction = ({ candidate, evidenceRecords, actionShape, operationStrength }) => {
  const name = candidate.candidateName;
  const claim = evidenceRecords.map(e => e.claim ?? "").join(" ");
  const lexicalTargetTrigger =
    actionShape === "EXPLICIT_ACTION" && EXPLICIT_TARGET_RE.test(name);
  const lexicalResult =
    actionShape === "EXPLICIT_ACTION" && RESULTATIVE_EXPLICIT_RE.test(name);

  const hasTrigger =
    evidenceTrigger(evidenceRecords) ||
    /\b(?:when|if|for|under|given|from|with|of|on|at|in)\b/i.test(name) ||
    lexicalTargetTrigger;
  const hasOutput =
    evidenceOutput(evidenceRecords) ||
    RESULT_WORD_RE.test(name) ||
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
      lexicalTargetTrigger
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
};

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

  const hasBundle = bundleSupported(name, claim);

  // MP02 — evidence-supported multiple-operation bundle. Multiple operations are
  // MACRO + BUNDLED_MOVES; mixed grain is NOT inferred.
  if (hasBundle && (hasOperationalEvidence || isExplicit)) {
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

  // MP07 — compressed operation noun whose wording itself identifies a primary
  // transformation/reduction/construction. With only thin evidence, operation is
  // PARTIAL rather than CLEAR; the scale is deployable only when the expression
  // also exposes a meaningful output/result word.
  if (hasImplicitOperationWord && RESULT_WORD_RE.test(name)) {
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
  version: "v1",
  calibrationAcceptanceSha: "177a8efa24ebca15e2c84dbb18e96a72be5e1d08",
  evidenceMode: "STRICT_CANDIDATE_OWNED_GATE2",
  crossScaleMode: "SOURCE_SCALE_VARIABLE_ROLE_ONLY",
  emitsCrossScale: false,
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
