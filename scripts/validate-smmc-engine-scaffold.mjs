import ledger from "../course/smmc/ledger.mjs";
import { SMMC_CONTENT_MODULES, SMMC_METHOD_MODULES } from "../course/smmc/curriculum-v1.mjs";
import { SMMC_REQUIREMENTS_V1 } from "../course/smmc/requirements-v1.mjs";
import { SMMC_UNITS_V1 } from "../course/smmc/authoring/units-v1.mjs";
import {
  SMMC_ENGINE_PHASES,
  SMMC_TRAINING_LADDER,
  SMMC_MODULE_BUILD_PLAN,
  SMMC_CANDIDATE_BRIDGES,
  SMMC_EAST_REQUIREMENT_BACKLOG,
  SMMC_CANONICAL_MODULE_IDS
} from "../course/smmc/engine-roadmap-v1.mjs";
import {
  SMMC_T25_READINESS_CONTRACT,
  SMMC_CERTIFICATION_POLICY,
  SMMC_XFER_CONTRACT,
  isSmmcScore,
  unitCertificationEvidence,
  createHistoricalAttemptScaffold
} from "../course/smmc/runtime/final-engine-v1.mjs";
import {
  SMMC_PAPERS_V1,
  SMMC_EAST_PAPERS_V1,
  SMMC_SUPPLEMENTARY_PAPERS_V1,
  SMMC_PAPER_VAULT_POLICY,
  paperVaultStatus,
  markWholePaperStatementSeen
} from "../course/smmc/paper-vault-v1.mjs";
import { emptySmmcState } from "../course/smmc/runtime/exposure.mjs";
import { emptySmmcStudy } from "../course/smmc/runtime/study.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const canonical = new Set([
  ...SMMC_CONTENT_MODULES.map(x => x.id),
  ...SMMC_METHOD_MODULES.map(x => x.id)
]);
expect(canonical.size === 18, "Expected exactly 18 canonical SMMC modules.");
expect(SMMC_CANONICAL_MODULE_IDS.length === 18, "Canonical module export drifted.");
expect(new Set(SMMC_MODULE_BUILD_PLAN.map(x => x.moduleId)).size === 18,
  "Build plan must cover every canonical module exactly once.");
for (const id of canonical) {
  expect(SMMC_MODULE_BUILD_PLAN.some(x => x.moduleId === id), "Missing build-plan module " + id);
}

const authored = new Set(SMMC_UNITS_V1.map(x => x.id));
const plannedRows = SMMC_MODULE_BUILD_PLAN.flatMap(x => x.units);
for (const id of authored) {
  const row = plannedRows.find(x => x.id === id);
  expect(row && row.status === "authored", "Authored unit missing from scaffold: " + id);
}
for (const row of plannedRows.filter(x => x.status === "authored")) {
  expect(authored.has(row.id), "Scaffold falsely marks unit authored: " + row.id);
}
expect(authored.has("S-METHOD-W1-U01"), "Contest proof-writing unit must be present.");
expect(SMMC_CANDIDATE_BRIDGES.some(x => x.id === "S-BRIDGE-ALG1" && x.status === "candidate-not-canonical"),
  "ALG1 contest-algebra bridge must remain an explicit candidate.");
expect(!canonical.has("S-BRIDGE-ALG1"), "Candidate ALG1 must not silently become canonical.");

expect(JSON.stringify(SMMC_TRAINING_LADDER) === JSON.stringify([
  "acquisition","near-transfer","mixed-neutral-synthesis","historical-unseen-transfer"
]), "Training ladder drifted.");
expect(SMMC_ENGINE_PHASES.length === 7, "Expected seven final-engine phases.");

const eastNonGreen = ledger.filter(p => p.eastRelevant && p.overlap !== "green");
expect(SMMC_EAST_REQUIREMENT_BACKLOG.length === eastNonGreen.length,
  "East requirement backlog must cover every non-GREEN East problem.");
const eastMapped = eastNonGreen.filter(p => SMMC_REQUIREMENTS_V1[p.id]?.length);
expect(SMMC_EAST_REQUIREMENT_BACKLOG.filter(x => x.status === "mapped").length === eastMapped.length,
  "East mapped/pending status drifted from exact requirement map.");

expect(SMMC_PAPERS_V1.length === 22, "Expected 22 official session-paper objects.");
expect(SMMC_EAST_PAPERS_V1.length === 18, "Expected 18 East A/B paper objects.");
expect(SMMC_SUPPLEMENTARY_PAPERS_V1.length === 4, "Expected four supplementary C-session paper objects.");
for (const paper of SMMC_PAPERS_V1) {
  expect(paper.problemIds.length === 4, "Every SMMC session paper must contain four ledger problems: " + paper.id);
}
const eastIds = new Set(SMMC_EAST_PAPERS_V1.flatMap(x => x.problemIds));
expect(eastIds.size === 72, "East paper vault must cover 72 unique A/B problems.");
expect([...eastIds].every(id => ledger.find(p => p.id === id)?.eastRelevant),
  "East paper vault contains a non-East problem.");
expect(SMMC_PAPER_VAULT_POLICY.sessionMinutes === 180, "S-PAPER session timer must be three hours.");

const paperState = emptySmmcState();
expect(paperVaultStatus(paperState,"2024-A").status === "sealed-pristine",
  "Fresh paper must be pristine.");
const afterWholeOpen = markWholePaperStatementSeen(
  paperState, "2024-A", "2026-09-24T08:30:00.000Z"
);
expect(afterWholeOpen.status === "statement-exposed", "Whole-paper open must consume pristine status.");
expect(afterWholeOpen.statementExposed === 4, "Whole-paper open must mark all four statements seen.");

expect(SMMC_CERTIFICATION_POLICY.selfReportCertifies === false,
  "Self-report must never certify an SMMC unit.");
const firstUnit = SMMC_UNITS_V1[0];
const hist = emptySmmcState();
hist.units[firstUnit.id] = { selfReportedComplete: true, selfReportedAt: "2026-09-24T08:00:00.000Z" };
let evidence = unitCertificationEvidence(firstUnit, emptySmmcStudy(), hist);
expect(evidence.status === "needs-attempts" && !evidence.certified,
  "Self-report alone must remain uncertified.");
const fakeStudy = {
  version: 1,
  attempts: [
    {taskId:firstUnit.mainTaskId},
    {taskId:firstUnit.transferTaskId}
  ]
};
evidence = unitCertificationEvidence(firstUnit, fakeStudy, hist);
expect(evidence.status === "review-required" && evidence.certifiableAutomatically === false,
  "Two saved tasks must still require explicit review.");

expect(SMMC_T25_READINESS_CONTRACT.preferredSource === "canonical-t25-evidence",
  "Canonical T25 evidence must be the normal readiness source.");
expect(SMMC_XFER_CONTRACT.scoreMin === 0 && SMMC_XFER_CONTRACT.scoreMax === 7,
  "Historical S-XFER score scale must be 0-7.");
expect(isSmmcScore(0) && isSmmcScore(7) && !isSmmcScore(-1) && !isSmmcScore(8),
  "SMMC score validation drifted.");
const draft = createHistoricalAttemptScaffold({
  problemId:"SMMC-2024-A1",
  startedAt:"2026-09-24T08:00:00.000Z"
});
expect(draft.lifecycle === "in-progress" && draft.score === null && draft.timeLimitMinutes === 180,
  "Historical-attempt scaffold drifted.");

console.log(
  "PASS SMMC final-engine scaffold: 18 canonical modules planned; " +
  authored.size + " authored units recognized; " +
  SMMC_EAST_REQUIREMENT_BACKLOG.length + " East non-GREEN requirement rows tracked; " +
  "18 East paper vault objects; certification/T25/S-XFER/S-PAPER contracts fail closed."
);
