"use strict";

const { Modal, Notice, normalizePath } = require("obsidian");
const LegacyChronoDeckBridge = require("./main-v043");
const contract = require("./archive-contract-v3");

class DeleteLogicalArcModal extends Modal {
  constructor(app, logicalArcId) {
    super(app);
    this.logicalArcId = logicalArcId;
    this.resolve = null;
  }

  ask() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.open();
    });
  }

  finish(value) {
    if (!this.resolve) return;
    const resolve = this.resolve;
    this.resolve = null;
    resolve(value);
    this.close();
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: `Delete ${this.logicalArcId} from Chrono-Deck cloud?` });
    contentEl.createEl("p", {
      text: "This deletes the entire logical ARC from Supabase/search, including RAW/POLISHED documents, sections, embeddings, revision snapshots, and archive relationships. Local Obsidian notes and local assets are kept. R2 binaries are not deleted now; newly unreferenced objects are only queued for the separate safe purge command.",
    });
    contentEl.createEl("p", { text: `Type ${this.logicalArcId} exactly to confirm.` });

    const input = contentEl.createEl("input", { type: "text", placeholder: this.logicalArcId });
    input.style.width = "100%";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("spellcheck", "false");

    const buttons = contentEl.createDiv({ cls: "chrono-deck-modal-actions" });
    const cancel = buttons.createEl("button", { text: "Cancel" });
    const remove = buttons.createEl("button", { text: "Delete from cloud" });
    remove.addClass("mod-warning");
    remove.disabled = true;

    const refresh = () => {
      remove.disabled = input.value.trim() !== this.logicalArcId;
    };
    input.addEventListener("input", refresh);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.finish(false);
      if (event.key === "Enter" && input.value.trim() === this.logicalArcId) this.finish(true);
    });
    cancel.onclick = () => this.finish(false);
    remove.onclick = () => {
      if (input.value.trim() === this.logicalArcId) this.finish(true);
    };
    setTimeout(() => input.focus(), 0);
  }

  onClose() {
    this.contentEl.empty();
    if (this.resolve) {
      const resolve = this.resolve;
      this.resolve = null;
      resolve(false);
    }
  }
}

module.exports = class ChronoDeckBridgePluginV3 extends LegacyChronoDeckBridge {
  async onload() {
    await super.onload();
    this.addCommand({
      id: "delete-current-logical-arc",
      name: "Delete current logical ARC from Chrono-Deck cloud",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!contract.extractArcId(this.getFrontmatter(file)?.arc_id)) return false;
        if (!checking) this.deleteCurrentLogicalArc();
        return true;
      },
    });
  }

  async rpc(name, payload, session) {
    if (name !== "chrono_sync_obsidian_arc_v2") return await super.rpc(name, payload, session);
    try {
      return await super.rpc("chrono_sync_obsidian_arc_v3", payload, session);
    } catch (error) {
      const message = String(error?.message || error || "");
      const missingV3 = /PGRST202|could not find the function|schema cache/i.test(message);
      if (!missingV3) throw error;
      return await super.rpc("chrono_sync_obsidian_arc_v2", payload, session);
    }
  }

  logicalArcIdForFile(file) {
    const frontmatter = this.getFrontmatter(file);
    const explicit = contract.extractArcId(frontmatter?.logical_arc_id);
    if (explicit) return explicit;
    const arcId = contract.extractArcId(frontmatter?.arc_id);
    return arcId ? arcId.replace(/-(RAW|POLISHED)$/i, "") : "";
  }

  async resetLocalCloudState(logicalArcId) {
    let reset = 0;
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (this.logicalArcIdForFile(file) !== logicalArcId) continue;
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        delete fm.chrono_revision;
        delete fm.chrono_synced_at;
        delete fm.chrono_fingerprint;
        delete fm.chrono_media_status;
      });
      reset += 1;
    }
    return reset;
  }

  async deleteCurrentLogicalArc() {
    try {
      const file = this.getActiveArcFile();
      const validation = contract.validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const logicalArcId = contract.extractArcId(validation.logicalArcId) || this.logicalArcIdForFile(file);
      if (!logicalArcId) throw new Error("Could not determine the stable logical ARC ID.");

      const confirmed = await new DeleteLogicalArcModal(this.app, logicalArcId).ask();
      if (!confirmed) return void new Notice("Chrono-Deck ARC deletion cancelled.");

      const session = await this.ensureSession();
      this.setStatus(`${logicalArcId} · deleting…`);
      const result = await this.rpc("chrono_delete_logical_arc", {
        p_logical_arc_id: logicalArcId,
        p_confirm_logical_arc_id: logicalArcId,
      }, session);
      const resetNotes = await this.resetLocalCloudState(logicalArcId);

      const documents = Number(result?.documentsDeleted || 0);
      const sections = Number(result?.sectionsDeleted || 0);
      const embeddings = Number(result?.embeddingChunksDeleted || 0);
      const revisions = Number(result?.revisionSnapshotsDeleted || 0) + Number(result?.logicalRevisionSnapshotsDeleted || 0);
      const relationships = Number(result?.relationshipsDeleted || 0);
      const queuedMedia = Number(result?.r2ObjectsQueuedForSafePurge || 0);

      this.setStatus(`${logicalArcId} · deleted from cloud`);
      new Notice(
        `${logicalArcId} deleted from Chrono-Deck cloud: ${documents} document${documents === 1 ? "" : "s"}, ${sections} section${sections === 1 ? "" : "s"}, ${embeddings} embedding chunk${embeddings === 1 ? "" : "s"}, ${revisions} revision snapshot${revisions === 1 ? "" : "s"}, and ${relationships} relationship${relationships === 1 ? "" : "s"} removed. Reset cloud markers on ${resetNotes} local note${resetNotes === 1 ? "" : "s"}. Local notes/assets were kept; R2 binaries were not deleted.${queuedMedia ? ` ${queuedMedia} now-unreferenced R2 object${queuedMedia === 1 ? " is" : "s are"} queued for the separate purge command.` : ""} Sync a kept note again to recreate the ARC in cloud.",
        16000,
      );
    } catch (error) {
      this.setStatus("Chrono-Deck · delete failed");
      new Notice(`Chrono-Deck ARC deletion failed: ${error.message}`, 12000);
    }
  }

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
