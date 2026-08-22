import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const contract = require("../obsidian-plugin/archive-contract-v3.js");

const rawFrontmatter = {
  schema_version: 3,
  arc_id: "T22-M01-A02-RAW",
  logical_arc_id: "T22-M01-A02",
  canonical_label: "T22-M01-A02",
  document_type: "raw_dump",
  document_status: "raw",
  title: "Vanishing Intervals — Ultra-Detailed Raw Dump",
  visibility: "private",
  curriculum_role: "supplementary",
  priority: "should_do",
  planning_status: "parked",
  clearance: "Core Cleared — Mastery Pending",
  module_id: "T22-M01",
  module_index: 1,
  atomic_position: 2,
  tags: ["chrono_deck", "raw_dump", "proof"],
  recovery_state: "owed",
  nominal_control_state_final: "FORGE",
  highest_effective_assistance: "GUIDE",
  chrono_revision: 99,
};

const valid = contract.validateFrontmatter(rawFrontmatter, { basename: "T22-M01-A02-RAW", path: "ARCs/T22-M01-A02-RAW.md" });
assert.deepEqual(valid.errors, []);
assert.equal(valid.logicalArcId, "T22-M01-A02");
assert.equal(valid.documentType, "raw_dump");
assert.equal(valid.clearance, "core_cleared_mastery_pending");
assert.deepEqual(valid.tags, ["chrono_deck", "raw_dump", "proof"]);
assert.equal(valid.archiveMetadata.recoveryState, "owed");
assert.equal(valid.sourceFrontmatter.chrono_revision, undefined);

const oldType = contract.validateFrontmatter({ ...rawFrontmatter, document_type: "atomic_arc_raw_dump" });
assert.ok(oldType.errors.some((value) => value.includes("document_type must be one of")));

const badPair = contract.validateFrontmatter({ ...rawFrontmatter, logical_arc_id: "T22-M01-A03" });
assert.ok(badPair.errors.some((value) => value.includes("logical_arc_id must be T22-M01-A02")));

const missingClearance = contract.validateFrontmatter({ ...rawFrontmatter, clearance: null });
assert.ok(missingClearance.errors.some((value) => value.includes("clearance is required")));

assert.equal(contract.inferSectionRole("Provenance Audit"), "provenance");
assert.equal(contract.sectionTypeForRole("provenance", "Provenance Audit"), "reflection");
assert.equal(contract.inferSectionRole("Error / Misconception Ledger"), "error_ledger");
assert.equal(contract.inferSectionRole("Unfamiliar Transfer"), "transfer");
assert.equal(contract.inferSectionRole("ARC Clearance"), "clearance");
assert.equal(contract.inferSectionRole("Proof / Implementation / Transfer / Recovery Debt"), "debt");

const markdown = `# T22-M01-A02 — Test\n\n## Mission\n<!-- CHRONO-SECTION id=mission role=mission -->\n\nFind the rate.\n\n## Provenance Audit\n<!-- CHRONO-SECTION id=provenance role=provenance -->\n\nShared split.\n\n## Short Conclusion\n<!-- CHRONO-SECTION id=conclusion role=conclusion -->\n\nThe limit is 2.\n\n## Experience / Chronicle\n<!-- CHRONO-SECTION id=chronicle role=chronicle -->\n\nI first tried secants.\n`;
const split = contract.splitMarkdown(markdown, "private");
assert.deepEqual(split.errors, []);
assert.equal(split.sections.length, 4);
assert.equal(split.sections[0].id, "mission");
assert.equal(split.sections[1].sectionRole, "provenance");
assert.equal(split.sections[1].type, "reflection");
assert.equal(split.sections[2].id, "conclusion");
assert.equal(split.sections[3].id, "chronicle");
assert.equal(split.shortConclusion, "The limit is 2.");
assert.equal(split.experience, "I first tried secants.");
assert.ok(!split.sections[0].contentMarkdown.includes("CHRONO-SECTION"));

const duplicate = contract.splitMarkdown(`## A\n<!-- CHRONO-SECTION id=same role=notes -->\nA\n## B\n<!-- CHRONO-SECTION id=same role=notes -->\nB`, "private");
assert.ok(duplicate.errors.some((value) => value.includes("Duplicate section id")));

const payload = contract.buildSyncPayload(
  rawFrontmatter,
  { basename: "T22-M01-A02-RAW", path: "Chrono-Deck/ARCs/T22-M01-A02-RAW.md" },
  `---\narc_id: T22-M01-A02-RAW\n---\n\n${markdown}`,
);
assert.deepEqual(payload.errors, []);
assert.equal(payload.document.canonicalLabel, "T22-M01-A02");
assert.equal(payload.document.clearance, "core_cleared_mastery_pending");
assert.deepEqual(payload.document.tags, ["chrono_deck", "raw_dump", "proof"]);
assert.equal(payload.document.sections.length, 4);
assert.equal(payload.document.sections[3].sectionRole, "chronicle");
assert.equal(payload.document.experience, "I first tried secants.");
assert.equal(payload.document.sourceFrontmatter.chrono_revision, undefined);

const relations = contract.collectRelationships({ related: ["[[ARC003]]", "bad link ???", "[[ARC003]]"] }, "ARC004");
assert.equal(relations.rows.length, 1);
assert.equal(relations.rows[0].toArcId, "ARC003");
assert.ok(relations.warnings.length >= 1);

const rendered = contract.renderCloudMarkdown({
  schemaVersion: 3,
  arcId: "T22-M01-A02-POLISHED",
  logicalArcId: "T22-M01-A02",
  canonicalLabel: "T22-M01-A02",
  documentType: "polished_extract",
  status: "polished",
  title: "Vanishing Intervals",
  visibility: "private",
  curriculumRole: "core",
  priority: "must_do",
  planningStatus: "parked",
  clearance: "core_cleared_mastery_pending",
  tags: ["chrono_deck"],
  sections: [{ id: "mission", sectionRole: "mission", heading: "Mission", contentMarkdown: "Find it." }],
});
assert.match(rendered, /logical_arc_id: "T22-M01-A02"/);
assert.match(rendered, /document_type: "polished_extract"/);
assert.match(rendered, /clearance: "Core Cleared — Mastery Pending"/);
assert.match(rendered, /CHRONO-SECTION id=mission role=mission/);

console.log("Obsidian Archive Contract V3 tests passed.");
