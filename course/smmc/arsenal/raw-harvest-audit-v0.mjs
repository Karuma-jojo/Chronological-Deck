import {
  ARSENAL_GATE2_RAW_CANDIDATES,
  ARSENAL_GATE2_RAW_EVIDENCE,
} from "./candidates-v0.mjs";
import { canonicalArsenalSource } from "./canonical-sources-v1.mjs";

const normalize = value => String(value || "")
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const candidateIds = new Set(ARSENAL_GATE2_RAW_CANDIDATES.map(x => x.candidateId));
const evidenceIds = new Set(ARSENAL_GATE2_RAW_EVIDENCE.map(x => x.recordId));

const nameGroups = new Map();
for (const candidate of ARSENAL_GATE2_RAW_CANDIDATES) {
  const key = normalize(candidate.candidateName);
  if (!nameGroups.has(key)) nameGroups.set(key, []);
  nameGroups.get(key).push(candidate);
}

export const ARSENAL_GATE2_DUPLICATE_NAME_GROUPS = Object.freeze(
  [...nameGroups.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([normalizedName, rows]) => Object.freeze({
      normalizedName,
      candidateIds: Object.freeze(rows.map(x => x.candidateId)),
      names: Object.freeze(rows.map(x => x.candidateName)),
      origins: Object.freeze(rows.map(x => x.origin)),
    }))
    .sort((a,b) => a.normalizedName.localeCompare(b.normalizedName))
);

export const ARSENAL_GATE2_ORPHAN_EVIDENCE_IDS = Object.freeze(
  ARSENAL_GATE2_RAW_EVIDENCE
    .filter(record => !candidateIds.has(record.candidateId))
    .map(record => record.recordId)
);

export const ARSENAL_GATE2_CANDIDATES_WITHOUT_EVIDENCE = Object.freeze(
  ARSENAL_GATE2_RAW_CANDIDATES
    .filter(candidate => !candidate.evidenceRecordIds?.length || candidate.evidenceRecordIds.some(id => !evidenceIds.has(id)))
    .map(candidate => candidate.candidateId)
);

export const ARSENAL_GATE2_UNKNOWN_CANONICAL_SOURCE_FACTS = Object.freeze(
  ARSENAL_GATE2_RAW_EVIDENCE
    .filter(record => record.evidenceBasis === "SOURCE_FACT" && !canonicalArsenalSource(record.sourceId))
    .map(record => record.recordId)
);

const originCounts = new Map();
for (const candidate of ARSENAL_GATE2_RAW_CANDIDATES) {
  originCounts.set(candidate.origin, (originCounts.get(candidate.origin) || 0) + 1);
}

export const ARSENAL_GATE2_ORIGIN_COUNTS = Object.freeze(
  [...originCounts.entries()]
    .map(([origin,count]) => Object.freeze({origin,count}))
    .sort((a,b) => a.origin.localeCompare(b.origin))
);

export const ARSENAL_GATE2_RAW_AUDIT_META = Object.freeze({
  candidateCount: ARSENAL_GATE2_RAW_CANDIDATES.length,
  evidenceCount: ARSENAL_GATE2_RAW_EVIDENCE.length,
  duplicateNameGroupCount: ARSENAL_GATE2_DUPLICATE_NAME_GROUPS.length,
  orphanEvidenceCount: ARSENAL_GATE2_ORPHAN_EVIDENCE_IDS.length,
  candidatesWithoutEvidenceCount: ARSENAL_GATE2_CANDIDATES_WITHOUT_EVIDENCE.length,
  unknownCanonicalSourceFactCount: ARSENAL_GATE2_UNKNOWN_CANONICAL_SOURCE_FACTS.length,
  note: "Duplicate-name groups are reporting only. Gate 2 makes no merge/split disposition.",
});
