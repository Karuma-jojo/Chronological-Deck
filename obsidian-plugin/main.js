"use strict";

const { Notice, normalizePath } = require("obsidian");
const LegacyChronoDeckBridge = require("./main-v043");
const contract = require("./archive-contract-v3");

module.exports = class ChronoDeckBridgePluginV3 extends LegacyChronoDeckBridge {
  async validateCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      const result = contract.validateFrontmatter(this.getFrontmatter(file), file);
      if (result.errors.length) {
        new Notice(`Chrono-Deck V3: ${result.errors.join(" ")}`, 12000);
        return;
      }
      const tail = result.warnings.length ? ` Warnings: ${result.warnings.join(" ")}` : "";
      new Notice(
        `Chrono-Deck V3: ${result.arcId} → ${result.logicalArcId} (${result.documentType}) is valid.${tail}`,
        result.warnings.length ? 10000 : 7000,
      );
    } catch (error) {
      new Notice(`Chrono-Deck V3: ${error.message}`, 9000);
    }
  }

  async buildSyncPayload(file) {
    const frontmatter = this.getFrontmatter(file);
    const markdown = await this.app.vault.cachedRead(file);
    const payload = contract.buildSyncPayload(frontmatter, file, markdown);
    if (payload.errors.length) throw new Error(payload.errors.join(" "));
    return {
      document: payload.document,
      relationships: payload.relationships,
      warnings: payload.warnings,
    };
  }

  async stampCloudState(file, cloud) {
    const arcId = contract.extractArcId(cloud?.arcId);
    const revision = Number(cloud?.revision || 0);
    const relations = contract.relationshipFrontmatter(cloud?.relationships);
    const syncedAt = new Date().toISOString();

    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.arc_id = arcId;
      if (contract.asString(cloud?.logicalArcId)) fm.logical_arc_id = contract.extractArcId(cloud.logicalArcId);
      if (contract.asString(cloud?.canonicalLabel)) fm.canonical_label = contract.asString(cloud.canonicalLabel);
      if (contract.asString(cloud?.documentType)) fm.document_type = contract.asString(cloud.documentType);
      fm.title = contract.asString(cloud?.title || arcId);
      fm.document_status = contract.asString(cloud?.status || "raw");
      fm.visibility = contract.asString(cloud?.visibility || "private");
      fm.curriculum_role = contract.asString(cloud?.curriculumRole || "core");
      fm.priority = contract.asString(cloud?.priority || "should_do");
      fm.planning_status = contract.asString(cloud?.planningStatus || "pending");
      if (contract.asString(cloud?.clearance)) fm.clearance = contract.displayClearance(cloud.clearance);
      if (Array.isArray(cloud?.tags)) fm.tags = contract.normalizeTags(cloud.tags);
      if (contract.asString(cloud?.mediaStatus)) fm.media_status = contract.asString(cloud.mediaStatus);

      for (const [field] of contract.RELATION_FIELDS) {
        const ids = relations.get(field) || [];
        if (ids.length) fm[field] = ids.map((id) => `[[${id}]]`);
        else delete fm[field];
      }
      fm.chrono_revision = revision;
      fm.chrono_synced_at = syncedAt;
    });

    const fingerprint = await this.computeFileFingerprint(file);
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.chrono_revision = revision;
      fm.chrono_synced_at = syncedAt;
      fm.chrono_fingerprint = fingerprint;
    });
  }

  async writeCloudArc(cloud, { open = false } = {}) {
    const arcId = contract.extractArcId(cloud?.arcId);
    if (!arcId) throw new Error("Cloud ARC is missing a stable arcId.");
    const cloudRevision = Number(cloud?.revision || 0);
    let file = this.findLocalArcFile(arcId);
    let action = "created";

    if (file) {
      const frontmatter = this.getFrontmatter(file);
      const localRevision = Number(frontmatter?.chrono_revision || 0);
      if (localRevision === cloudRevision) {
        if (open) await this.app.workspace.getLeaf(false).openFile(file);
        return { action: "current", file, arcId, revision: cloudRevision };
      }
      if (localRevision > cloudRevision) {
        return {
          action: "conflict",
          file,
          arcId,
          revision: cloudRevision,
          reason: `local revision ${localRevision} is newer than cloud revision ${cloudRevision}`,
        };
      }
      if (await this.isTrackedFileDirty(file)) {
        return { action: "conflict", file, arcId, revision: cloudRevision, reason: "local note has unsynced edits" };
      }
      await this.app.vault.process(file, () => contract.renderCloudMarkdown(cloud));
      action = "updated";
    } else {
      await this.ensureFolder(this.settings.arcFolder);
      const path = normalizePath(`${this.settings.arcFolder}/${arcId}.md`);
      const collision = this.app.vault.getAbstractFileByPath(path);
      if (collision) throw new Error(`${path} already exists but is not recognized as ${arcId}.`);
      file = await this.app.vault.create(path, contract.renderCloudMarkdown(cloud));
    }

    await this.stampCloudState(file, cloud);
    if (open) await this.app.workspace.getLeaf(false).openFile(file);
    return { action, file, arcId, revision: cloudRevision };
  }
};
