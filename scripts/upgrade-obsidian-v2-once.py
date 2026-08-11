from pathlib import Path
import re

p = Path('obsidian-plugin/main.js')
s = p.read_text()

if 'chrono_sync_obsidian_arc_v2' in s and 'pull-all-arcs' in s:
    print('Obsidian v0.2 patch already applied')
    raise SystemExit(0)

needle = '];\n\nconst DEFAULT_SETTINGS = {'
insert = '''];\n\nconst RELATION_FIELD_BY_TYPE = new Map(RELATION_FIELDS.map(([field, relationType]) => [relationType, field]));\n\nconst DEFAULT_SETTINGS = {'''
if needle not in s:
    raise SystemExit('RELATION_FIELDS insertion point not found')
s = s.replace(needle, insert, 1)

marker = 'class TextPromptModal extends Modal {'
helpers = r'''
function contentFingerprint(markdown) {
  const text = String(markdown || "").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const normalized = [];
  let inFrontmatter = lines[0] === "---";
  let frontmatterClosed = !inFrontmatter;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (index === 0 && inFrontmatter) {
      normalized.push(line);
      continue;
    }
    if (inFrontmatter && !frontmatterClosed && line === "---") {
      frontmatterClosed = true;
      normalized.push(line);
      continue;
    }
    if (inFrontmatter && !frontmatterClosed && /^chrono_[A-Za-z0-9_-]+\s*:/.test(line)) continue;
    normalized.push(line);
  }
  const payload = normalized.join("\n").replace(/\s+$/, "");
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let index = 0; index < payload.length; index += 1) {
    const code = payload.charCodeAt(index);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= code + index;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}

function yamlScalar(value) {
  return JSON.stringify(asString(value));
}

function relationshipFrontmatter(relationships) {
  const result = new Map();
  for (const [field] of RELATION_FIELDS) result.set(field, []);
  for (const row of Array.isArray(relationships) ? relationships : []) {
    const field = RELATION_FIELD_BY_TYPE.get(asString(row?.relationType));
    const id = extractArcId(row?.toArcId);
    if (!field || !id) continue;
    const list = result.get(field);
    if (!list.includes(id)) list.push(id);
  }
  return result;
}

function renderCloudMarkdown(cloud) {
  if (asString(cloud?.sourceMarkdown)) return String(cloud.sourceMarkdown).replace(/\r\n/g, "\n");
  const arcId = extractArcId(cloud?.arcId) || "ARC";
  const title = asString(cloud?.title || cloud?.canonicalLabel || arcId);
  const lines = [
    "---",
    `arc_id: ${arcId}`,
    `title: ${yamlScalar(title)}`,
    `document_status: ${asString(cloud?.status || "raw")}`,
    `visibility: ${asString(cloud?.visibility || "private")}`,
    `curriculum_role: ${asString(cloud?.curriculumRole || "core")}`,
    `priority: ${asString(cloud?.priority || "should_do")}`,
    `planning_status: ${asString(cloud?.planningStatus || "pending")}`,
  ];
  const relations = relationshipFrontmatter(cloud?.relationships);
  for (const [field] of RELATION_FIELDS) {
    const ids = relations.get(field) || [];
    if (!ids.length) continue;
    lines.push(`${field}:`);
    for (const id of ids) lines.push(`  - ${yamlScalar(`[[${id}]]`)}`);
  }
  lines.push("---", "", `# ${title}`, "");
  if (asString(cloud?.shortConclusion)) lines.push("## Short Conclusion", "", String(cloud.shortConclusion).trim(), "");
  if (asString(cloud?.experience)) lines.push("## Experience / Chronicle", "", String(cloud.experience).trim(), "");
  for (const section of Array.isArray(cloud?.sections) ? cloud.sections : []) {
    lines.push(`## ${asString(section?.heading || "Untitled section")}`, "");
    const content = String(section?.contentMarkdown || "").trim();
    if (content) lines.push(content, "");
  }
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

'''
if marker not in s:
    raise SystemExit('TextPromptModal insertion point not found')
s = s.replace(marker, helpers + marker, 1)

command_marker = re.search(r'(?m)^\s*this\.addCommand\(\{\s*(?:\n\s*)?id:\s*"create-supplementary-arc"', s)
if not command_marker:
    raise SystemExit('create-supplementary-arc command insertion point not found')
commands = r'''    this.addCommand({
      id: "pull-current-arc",
      name: "Pull current ARC from Chrono-Deck",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.pullCurrentArc();
        return true;
      },
    });
    this.addCommand({ id: "pull-all-arcs", name: "Pull all Chrono-Deck ARCs to this device", callback: () => this.pullAllArcs() });
'''
pos = command_marker.start()
s = s[:pos] + commands + s[pos:]

needle = '      sourcePath: file.path,\n      shortConclusion: split.shortConclusion,'
replace = '      sourcePath: file.path,\n      sourceMarkdown: markdown,\n      shortConclusion: split.shortConclusion,'
if needle not in s:
    raise SystemExit('buildSyncPayload sourcePath insertion point not found')
s = s.replace(needle, replace, 1)

start = s.find('  async syncCurrentArc() {')
end = s.find('  makeSupplementaryId() {', start)
if start < 0 or end < 0:
    raise SystemExit('syncCurrentArc replacement bounds not found')

new_methods = r'''  async computeFileFingerprint(file) {
    const markdown = await this.app.vault.cachedRead(file);
    return contentFingerprint(markdown);
  }

  async loadCloudArc(arcId, session) {
    return await this.rpc("chrono_load_obsidian_arc", { p_arc_id: arcId }, session);
  }

  async listCloudArcs(session) {
    const value = await this.rpc("chrono_list_obsidian_arcs", {}, session);
    return Array.isArray(value) ? value : [];
  }

  findLocalArcFile(arcId) {
    const wanted = extractArcId(arcId);
    if (!wanted) return null;
    for (const file of this.app.vault.getMarkdownFiles()) {
      const fmId = extractArcId(this.getFrontmatter(file)?.arc_id);
      if (fmId === wanted) return file;
    }
    return null;
  }

  async stampCloudState(file, cloud) {
    const arcId = extractArcId(cloud?.arcId);
    const revision = Number(cloud?.revision || 0);
    const relations = relationshipFrontmatter(cloud?.relationships);
    const syncedAt = new Date().toISOString();
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.arc_id = arcId;
      fm.title = asString(cloud?.title || arcId);
      fm.document_status = asString(cloud?.status || "raw");
      fm.visibility = asString(cloud?.visibility || "private");
      fm.curriculum_role = asString(cloud?.curriculumRole || "core");
      fm.priority = asString(cloud?.priority || "should_do");
      fm.planning_status = asString(cloud?.planningStatus || "pending");
      for (const [field] of RELATION_FIELDS) {
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

  async isTrackedFileDirty(file) {
    const frontmatter = this.getFrontmatter(file);
    const baseline = asString(frontmatter?.chrono_fingerprint);
    if (!baseline) return true;
    return (await this.computeFileFingerprint(file)) !== baseline;
  }

  async writeCloudArc(cloud, { open = false } = {}) {
    const arcId = extractArcId(cloud?.arcId);
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
        return { action: "conflict", file, arcId, revision: cloudRevision, reason: `local revision ${localRevision} is newer than cloud revision ${cloudRevision}` };
      }
      if (await this.isTrackedFileDirty(file)) {
        return { action: "conflict", file, arcId, revision: cloudRevision, reason: "local note has unsynced edits" };
      }
      await this.app.vault.process(file, () => renderCloudMarkdown(cloud));
      action = "updated";
    } else {
      await this.ensureFolder(this.settings.arcFolder);
      const path = normalizePath(`${this.settings.arcFolder}/${arcId}.md`);
      const collision = this.app.vault.getAbstractFileByPath(path);
      if (collision) throw new Error(`${path} already exists but is not recognized as ${arcId}.`);
      file = await this.app.vault.create(path, renderCloudMarkdown(cloud));
    }

    await this.stampCloudState(file, cloud);
    if (open) await this.app.workspace.getLeaf(false).openFile(file);
    return { action, file, arcId, revision: cloudRevision };
  }

  async pullCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const session = await this.ensureSession();
      this.setStatus(`${validation.arcId} · pulling…`);
      const cloud = await this.loadCloudArc(validation.arcId, session);
      if (!cloud) throw new Error(`${validation.arcId} does not exist in Supabase yet.`);
      const result = await this.writeCloudArc(cloud, { open: true });
      if (result.action === "conflict") {
        this.setStatus(`${validation.arcId} · conflict`);
        new Notice(`Pull stopped for ${validation.arcId}: ${result.reason}. Your local note was not changed.`, 10000);
        return;
      }
      this.setStatus(`${validation.arcId} · cloud v${result.revision}`);
      new Notice(result.action === "current"
        ? `${validation.arcId} is already at cloud revision ${result.revision}.`
        : `Pulled ${validation.arcId} revision ${result.revision} (${result.action}).`, 7000);
    } catch (error) {
      this.setStatus("Chrono-Deck · pull failed");
      new Notice(`Chrono-Deck pull failed: ${error.message}`, 10000);
    }
  }

  async pullAllArcs() {
    try {
      const session = await this.ensureSession();
      this.setStatus("Chrono-Deck · pulling vault…");
      const summaries = await this.listCloudArcs(session);
      let created = 0;
      let updated = 0;
      let current = 0;
      const conflicts = [];
      for (const summary of summaries) {
        const arcId = extractArcId(summary?.arcId);
        if (!arcId) continue;
        const cloud = await this.loadCloudArc(arcId, session);
        if (!cloud) continue;
        const result = await this.writeCloudArc(cloud);
        if (result.action === "created") created += 1;
        else if (result.action === "updated") updated += 1;
        else if (result.action === "current") current += 1;
        else if (result.action === "conflict") conflicts.push(`${arcId}: ${result.reason}`);
      }
      this.setStatus(`Chrono-Deck · pulled ${created + updated}`);
      const conflictText = conflicts.length ? ` Conflicts skipped (${conflicts.length}): ${conflicts.slice(0, 4).join("; ")}${conflicts.length > 4 ? "; …" : ""}` : "";
      new Notice(`Cloud pull complete: ${created} created, ${updated} updated, ${current} already current.${conflictText}`, conflicts.length ? 12000 : 8000);
    } catch (error) {
      this.setStatus("Chrono-Deck · pull failed");
      new Notice(`Chrono-Deck vault pull failed: ${error.message}`, 10000);
    }
  }

  async syncCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      this.setStatus("Chrono-Deck · syncing…");
      const payload = await this.buildSyncPayload(file);
      const frontmatter = this.getFrontmatter(file);
      const localRevision = Number(frontmatter?.chrono_revision || 0);
      const session = await this.ensureSession();
      const cloud = await this.loadCloudArc(payload.document.arcId, session);
      const cloudRevision = Number(cloud?.revision || 0);
      if (cloudRevision !== localRevision) {
        throw new Error(`Revision conflict: cloud is v${cloudRevision}, but this note is based on v${localRevision}. Pull the cloud ARC first; nothing was overwritten.`);
      }
      const result = await this.rpc("chrono_sync_obsidian_arc_v2", {
        p_document: payload.document,
        p_relationships: payload.relationships,
        p_expected_revision: localRevision,
        p_note: `Synced from Obsidian: ${file.path}`,
      }, session);
      const revision = Number(result?.revision || 0);
      const syncedAt = new Date().toISOString();
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
      });
      const fingerprint = await this.computeFileFingerprint(file);
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
        fm.chrono_fingerprint = fingerprint;
      });
      this.setStatus(`${payload.document.arcId} · synced v${revision}`);
      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${warningText}`, 7000);
    } catch (error) {
      this.setStatus("Chrono-Deck · sync failed");
      new Notice(`Chrono-Deck sync failed: ${error.message}`, 10000);
    }
  }

'''
s = s[:start] + new_methods + s[end:]
p.write_text(s)
print('Patched obsidian-plugin/main.js for v0.2')
