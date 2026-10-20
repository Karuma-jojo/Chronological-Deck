// SMMC Arsenal — Gate 3 mass-pass audit/report v1.
//
// Reporting only. This file does not adjudicate duplicates, merge aliases, or
// decide whether classification differences are right or wrong. It surfaces
// exactly the cross-origin / duplicate-looking cases required for the final
// Gate-3 graduation attack.

import { ARSENAL_GATE2_DUPLICATE_NAME_GROUPS } from "./raw-harvest-audit-v0.mjs";
import {
  ARSENAL_GATE3_GRANULARITY_RECORDS,
  ARSENAL_GATE3_MASS_PASS_META,
} from "./granularity-ledger-v0.mjs";
import { ARSENAL_GATE3_MASS_CLASSIFIER_META } from "./granularity-mass-pass-v1.mjs";

const reviewed = ARSENAL_GATE3_GRANULARITY_RECORDS.filter(row => row.status === "REVIEWED");
const rowById = new Map(reviewed.map(row => [row.candidateId, row]));

const countBy = (rows, key) => Object.freeze(Object.fromEntries(
  [...new Set(rows.map(row => row[key]))]
    .sort()
    .map(value => [value, rows.filter(row => row[key] === value).length])
));

const classificationSignature = row => [
  row.referenceScale,
  row.bundleStructure,
  row.actionShape,
  row.contextReach,
  row.triggerBoundary,
  row.operationBoundary,
  row.outputBoundary,
  row.confidence,
].join("|");

export const ARSENAL_GATE3_DUPLICATE_NAME_AUDIT = Object.freeze(
  ARSENAL_GATE2_DUPLICATE_NAME_GROUPS.map(group => {
    const rows = group.candidateIds.map(id => rowById.get(id)).filter(Boolean);
    const signatures = [...new Set(rows.map(classificationSignature))];
    return Object.freeze({
      normalizedName: group.normalizedName,
      candidateIds: group.candidateIds,
      names: group.names,
      origins: group.origins,
      classificationSignatures: Object.freeze(signatures),
      sameGranularitySignature: signatures.length === 1,
      rows: Object.freeze(rows.map(row => Object.freeze({
        candidateId: row.candidateId,
        origin: row.origin,
        referenceScale: row.referenceScale,
        bundleStructure: row.bundleStructure,
        actionShape: row.actionShape,
        contextReach: row.contextReach,
        triggerBoundary: row.triggerBoundary,
        operationBoundary: row.operationBoundary,
        outputBoundary: row.outputBoundary,
        confidence: row.confidence,
      }))),
    });
  })
);

export const ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES = Object.freeze(
  ARSENAL_GATE3_DUPLICATE_NAME_AUDIT.filter(group => !group.sameGranularitySignature)
);

const origins = [...new Set(reviewed.map(row => row.origin))].sort();

export const ARSENAL_GATE3_MASS_PASS_DISTRIBUTION = Object.freeze({
  total: reviewed.length,
  referenceScale: countBy(reviewed, "referenceScale"),
  bundleStructure: countBy(reviewed, "bundleStructure"),
  actionShape: countBy(reviewed, "actionShape"),
  contextReach: countBy(reviewed, "contextReach"),
  triggerBoundary: countBy(reviewed, "triggerBoundary"),
  operationBoundary: countBy(reviewed, "operationBoundary"),
  outputBoundary: countBy(reviewed, "outputBoundary"),
  confidence: countBy(reviewed, "confidence"),
  byOrigin: Object.freeze(Object.fromEntries(
    origins.map(origin => {
      const rows = reviewed.filter(row => row.origin === origin);
      return [origin, Object.freeze({
        total: rows.length,
        referenceScale: countBy(rows, "referenceScale"),
        bundleStructure: countBy(rows, "bundleStructure"),
        actionShape: countBy(rows, "actionShape"),
        contextReach: countBy(rows, "contextReach"),
      })];
    })
  )),
});

const massRows = reviewed.filter(row => /^MP\d{2}\b/.test(row.rationale));
export const ARSENAL_GATE3_MASS_RULE_USAGE = Object.freeze(Object.fromEntries(
  ARSENAL_GATE3_MASS_CLASSIFIER_META.ruleIds.map(ruleId => [
    ruleId,
    massRows.filter(row => row.rationale.startsWith(ruleId)).length,
  ])
));

export const ARSENAL_GATE3_BUNDLED_AUDIT = Object.freeze(
  reviewed
    .filter(row => row.bundleStructure === "BUNDLED_MOVES")
    .map(row => Object.freeze({
      candidateId: row.candidateId,
      candidateName: row.candidateName,
      origin: row.origin,
      referenceScale: row.referenceScale,
      actionShape: row.actionShape,
      triggerBoundary: row.triggerBoundary,
      operationBoundary: row.operationBoundary,
      outputBoundary: row.outputBoundary,
      confidence: row.confidence,
      rationale: row.rationale,
    }))
);

export const ARSENAL_GATE3_EXTREME_SCALE_AUDIT = Object.freeze(
  reviewed
    .filter(row => row.referenceScale === "MICRO" || row.referenceScale === "CROSS_SCALE")
    .map(row => Object.freeze({
      candidateId: row.candidateId,
      candidateName: row.candidateName,
      origin: row.origin,
      referenceScale: row.referenceScale,
      bundleStructure: row.bundleStructure,
      actionShape: row.actionShape,
      contextReach: row.contextReach,
      rationale: row.rationale,
    }))
);

export const ARSENAL_GATE3_LOW_CONFIDENCE_AUDIT = Object.freeze(
  reviewed
    .filter(row => row.confidence === "LOW")
    .map(row => Object.freeze({
      candidateId: row.candidateId,
      candidateName: row.candidateName,
      origin: row.origin,
      referenceScale: row.referenceScale,
      bundleStructure: row.bundleStructure,
      actionShape: row.actionShape,
      contextReach: row.contextReach,
      rationale: row.rationale,
    }))
);

export const ARSENAL_GATE3_OFFICIAL_UNRESOLVED_AUDIT = Object.freeze(
  reviewed
    .filter(row => row.origin === "OFFICIAL_SMMC_SOLUTION" && row.referenceScale === "UNRESOLVED")
    .map(row => Object.freeze({
      candidateId: row.candidateId,
      candidateName: row.candidateName,
      actionShape: row.actionShape,
      triggerBoundary: row.triggerBoundary,
      operationBoundary: row.operationBoundary,
      outputBoundary: row.outputBoundary,
      confidence: row.confidence,
      rationale: row.rationale,
    }))
);

export const ARSENAL_GATE3_REVIEW_SENTINELS = Object.freeze(
  origins.flatMap(origin => {
    const originRows = reviewed.filter(row => row.origin === origin);
    return ["MICRO","DEPLOYABLE","MACRO","CROSS_SCALE","UNRESOLVED"]
      .map(scale => originRows.find(row => row.referenceScale === scale))
      .filter(Boolean)
      .map(row => Object.freeze({
        candidateId: row.candidateId,
        candidateName: row.candidateName,
        origin: row.origin,
        referenceScale: row.referenceScale,
        bundleStructure: row.bundleStructure,
        actionShape: row.actionShape,
        contextReach: row.contextReach,
        triggerBoundary: row.triggerBoundary,
        operationBoundary: row.operationBoundary,
        outputBoundary: row.outputBoundary,
        confidence: row.confidence,
        rationale: row.rationale,
      }));
  })
);

export const ARSENAL_GATE3_FALLBACK_AUDIT = Object.freeze(
  origins.map(origin => {
    const rows = reviewed.filter(row => row.origin === origin && row.rationale.startsWith("MP10"));
    return Object.freeze({
      origin,
      count: rows.length,
      sampleCandidateIds: Object.freeze(rows.slice(0, 5).map(row => row.candidateId)),
    });
  }).filter(row => row.count > 0)
);

export const ARSENAL_GATE3_MASS_AUDIT_META = Object.freeze({
  status: "MASS-PASS-REVIEW-CANDIDATE",
  calibrationAcceptanceSha: ARSENAL_GATE3_MASS_PASS_META.calibrationAcceptanceSha,
  calibrationRows: ARSENAL_GATE3_MASS_PASS_META.calibrationRows,
  massRows: ARSENAL_GATE3_MASS_PASS_META.massRows,
  totalRows: reviewed.length,
  duplicateNameGroups: ARSENAL_GATE3_DUPLICATE_NAME_AUDIT.length,
  duplicateNameGroupsWithDifferentSignatures: ARSENAL_GATE3_DUPLICATE_NAME_DIFFERENCES.length,
  unresolvedScaleRows: reviewed.filter(row => row.referenceScale === "UNRESOLVED").length,
  activeCrossScaleRows: reviewed.filter(row => row.referenceScale === "CROSS_SCALE").length,
  officialUnresolvedScaleRows: ARSENAL_GATE3_OFFICIAL_UNRESOLVED_AUDIT.length,
  reviewSentinels: ARSENAL_GATE3_REVIEW_SENTINELS.length,
  note: "Duplicate-name differences are review targets only. Gate 3 does not merge, split, or adjudicate aliases.",
});
