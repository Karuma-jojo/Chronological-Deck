// SMMC Arsenal — Gate 3 granularity contract v1.
//
// Gate 3 measures the grain of the accepted Gate-2 raw candidates. It does not
// merge, split, delete, type, rank, prerequisite-link, relate, or gamify them.
//
// The reference unit below is diagnostic only:
//   a reusable deliberate mathematical move for which a learner can identify a
//   recognizable trigger, execute one coherent primary operation, and obtain a
//   meaningful mathematical output/progress.
//
// A candidate may intentionally live above, below, or across that reference unit.
// Gate 3 records that fact; it does not decide what the final Arsenal should do
// with the candidate.

export const ARSENAL_GATE3_ACCEPTED_GATE2_SHA =
  "ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7";

export const ARSENAL_GATE3_GATE2_MERGE_SHA =
  "7600dd377192aafe6ca777636d94474736ea4e4f";

export const ARSENAL_GATE3_REFERENCE_SCALE = Object.freeze([
  "MICRO",
  "DEPLOYABLE",
  "MACRO",
  "CROSS_SCALE",
  "UNRESOLVED",
]);

export const ARSENAL_GATE3_BUNDLE_STRUCTURE = Object.freeze([
  "SINGLE_PRIMARY_MOVE",
  "BUNDLED_MOVES",
  "UNRESOLVED",
]);

export const ARSENAL_GATE3_ACTION_SHAPE = Object.freeze([
  "EXPLICIT_ACTION",
  "IMPLICIT_ACTION",
  "LABEL_ONLY",
  "UNRESOLVED",
]);

export const ARSENAL_GATE3_CONTEXT_REACH = Object.freeze([
  "GENERAL",
  "SOURCE_LOCAL",
  "PROBLEM_LOCAL",
  "UNRESOLVED",
]);

export const ARSENAL_GATE3_BOUNDARY_TEST = Object.freeze([
  "CLEAR",
  "PARTIAL",
  "ABSENT",
  "UNRESOLVED",
]);

export const ARSENAL_GATE3_CONFIDENCE = Object.freeze([
  "HIGH",
  "MEDIUM",
  "LOW",
]);

export const ARSENAL_GATE3_STATUS = Object.freeze([
  "UNREVIEWED",
  "REVIEWED",
]);

export const ARSENAL_GATE3_FORBIDDEN_FIELDS = Object.freeze([
  "ontologyType",
  "aliases",
  "mergeIntoCandidateId",
  "mergeGroup",
  "splitInto",
  "splitCandidateIds",
  "drop",
  "keep",
  "rank",
  "rarity",
  "hardPrerequisites",
  "softPrerequisites",
  "parentCandidateId",
  "childCandidateIds",
  "candidateRelations",
  "comboIds",
  "learningOrder",
  "forge",
  "boss",
  "arena",
]);

const enumSet = values => new Set(values);
const SCALE = enumSet(ARSENAL_GATE3_REFERENCE_SCALE);
const BUNDLE = enumSet(ARSENAL_GATE3_BUNDLE_STRUCTURE);
const ACTION = enumSet(ARSENAL_GATE3_ACTION_SHAPE);
const REACH = enumSet(ARSENAL_GATE3_CONTEXT_REACH);
const BOUNDARY = enumSet(ARSENAL_GATE3_BOUNDARY_TEST);
const CONFIDENCE = enumSet(ARSENAL_GATE3_CONFIDENCE);
const STATUS = enumSet(ARSENAL_GATE3_STATUS);

const invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};

export function validateGate3GranularityRecord(record) {
  invariant(record && typeof record === "object", "Gate-3 record must be an object.");
  invariant(typeof record.candidateId === "string" && record.candidateId.length > 0, "Gate-3 record missing candidateId.");
  invariant(STATUS.has(record.status), `Gate-3 record has invalid status for ${record.candidateId}`);

  for (const field of ARSENAL_GATE3_FORBIDDEN_FIELDS) {
    invariant(!(field in record), `Gate 3 forbidden field ${field} present on ${record.candidateId}`);
  }

  if (record.status === "UNREVIEWED") {
    invariant(record.referenceScale === null, `UNREVIEWED Gate-3 record must not pre-classify scale: ${record.candidateId}`);
    invariant(record.bundleStructure === null, `UNREVIEWED Gate-3 record must not pre-classify bundle structure: ${record.candidateId}`);
    invariant(record.actionShape === null, `UNREVIEWED Gate-3 record must not pre-classify action shape: ${record.candidateId}`);
    invariant(record.contextReach === null, `UNREVIEWED Gate-3 record must not pre-classify context reach: ${record.candidateId}`);
    invariant(record.triggerBoundary === null, `UNREVIEWED Gate-3 record must not pre-score trigger boundary: ${record.candidateId}`);
    invariant(record.operationBoundary === null, `UNREVIEWED Gate-3 record must not pre-score operation boundary: ${record.candidateId}`);
    invariant(record.outputBoundary === null, `UNREVIEWED Gate-3 record must not pre-score output boundary: ${record.candidateId}`);
    invariant(record.confidence === null, `UNREVIEWED Gate-3 record must not carry confidence: ${record.candidateId}`);
    invariant(Array.isArray(record.supportingEvidenceRecordIds) && record.supportingEvidenceRecordIds.length === 0, `UNREVIEWED Gate-3 record must not cite evidence yet: ${record.candidateId}`);
    invariant(record.rationale === null, `UNREVIEWED Gate-3 record must not carry rationale: ${record.candidateId}`);
    return true;
  }

  invariant(SCALE.has(record.referenceScale), `Invalid Gate-3 referenceScale for ${record.candidateId}`);
  invariant(BUNDLE.has(record.bundleStructure), `Invalid Gate-3 bundleStructure for ${record.candidateId}`);
  invariant(ACTION.has(record.actionShape), `Invalid Gate-3 actionShape for ${record.candidateId}`);
  invariant(REACH.has(record.contextReach), `Invalid Gate-3 contextReach for ${record.candidateId}`);
  invariant(BOUNDARY.has(record.triggerBoundary), `Invalid Gate-3 triggerBoundary for ${record.candidateId}`);
  invariant(BOUNDARY.has(record.operationBoundary), `Invalid Gate-3 operationBoundary for ${record.candidateId}`);
  invariant(BOUNDARY.has(record.outputBoundary), `Invalid Gate-3 outputBoundary for ${record.candidateId}`);
  invariant(CONFIDENCE.has(record.confidence), `Invalid Gate-3 confidence for ${record.candidateId}`);
  invariant(Array.isArray(record.supportingEvidenceRecordIds) && record.supportingEvidenceRecordIds.length > 0, `Reviewed Gate-3 record must cite supporting evidence: ${record.candidateId}`);
  invariant(new Set(record.supportingEvidenceRecordIds).size === record.supportingEvidenceRecordIds.length, `Duplicate supporting evidence IDs for ${record.candidateId}`);
  invariant(typeof record.rationale === "string" && record.rationale.trim().length >= 40, `Reviewed Gate-3 record needs substantive rationale: ${record.candidateId}`);

  return true;
}

export const ARSENAL_GATE3_CONTRACT_META = Object.freeze({
  gate: 3,
  purpose: "GRANULARITY_MEASUREMENT_ONLY",
  referenceUnitIsFinalOntology: false,
  mergeSplitDecisionsAllowed: false,
  ontologyAllowed: false,
  prerequisiteGraphAllowed: false,
  rankingAllowed: false,
  candidateRelationsAllowed: false,
  learnerGamificationAllowed: false,
  gate2RawPoolImmutable: true,
});
