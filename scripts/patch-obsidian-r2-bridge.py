from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "obsidian-plugin" / "main.js"
MANIFEST = ROOT / "obsidian-plugin" / "manifest.json"
WORKFLOW = ROOT / ".github" / "workflows" / "frontend-checks.yml"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one anchor, found {count}")
    return text.replace(old, new, 1)


text = MAIN.read_text(encoding="utf-8")
if "CHRONO_MEDIA_BRIDGE_V1" in text:
    print("R2 media bridge already patched")
    raise SystemExit(0)

text = replace_once(
    text,
    '''  arcFolder: "Chrono-Deck/ARCs",
  chronoDeckUrl: "https://karuma-jojo.github.io/Chronological-Deck/",
};''',
    '''  arcFolder: "Chrono-Deck/ARCs",
  assetFolder: "Chrono-Deck/Assets",
  mediaGatewayUrl: "https://chrono-deck-media.onrender.com",
  chronoDeckUrl: "https://karuma-jojo.github.io/Chronological-Deck/",
};''',
    "default settings",
)

helpers = r'''
const CHRONO_MEDIA_BRIDGE_V1 = true;
const MAX_MEDIA_BYTES = 100 * 1024 * 1024;
const MEDIA_MIME_TYPES = new Map([
  ["png", "image/png"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["webp", "image/webp"],
  ["gif", "image/gif"], ["svg", "image/svg+xml"], ["avif", "image/avif"],
  ["mp4", "video/mp4"], ["webm", "video/webm"], ["mov", "video/quicktime"],
  ["mp3", "audio/mpeg"], ["m4a", "audio/mp4"], ["wav", "audio/wav"], ["ogg", "audio/ogg"],
  ["pdf", "application/pdf"],
]);

function fileExtension(value) {
  const clean = asString(value).split(/[?#]/)[0];
  const match = clean.match(/\.([A-Za-z0-9]+)$/);
  return match ? match[1].toLowerCase() : "";
}

function mediaMimeType(value) {
  return MEDIA_MIME_TYPES.get(fileExtension(value)) || "application/octet-stream";
}

function mediaType(value) {
  const ext = fileExtension(value);
  if (ext === "gif") return "gif";
  if (["png", "jpg", "jpeg", "webp", "svg", "avif"].includes(ext)) return ext === "svg" ? "diagram" : "image";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["mp3", "m4a", "wav", "ogg"].includes(ext)) return "audio";
  return "file";
}

function inferLogicalArcId(frontmatter, arcId) {
  const explicit = asString(frontmatter?.logical_arc_id);
  if (explicit) return explicit;
  return asString(arcId).replace(/-(RAW|POLISHED)$/i, "");
}

function inferDocumentType(frontmatter, arcId) {
  const explicit = asString(frontmatter?.document_type);
  if (explicit) return explicit;
  if (/-RAW$/i.test(arcId)) return "raw_dump";
  if (/-POLISHED$/i.test(arcId)) return "polished_extract";
  return "canonical";
}

function withoutFencedCode(markdown) {
  const lines = stripFrontmatter(markdown).replace(/\r\n/g, "\n").split("\n");
  let fenced = false;
  let fenceChar = "";
  return lines.map((line) => {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) { fenced = true; fenceChar = fence[1][0]; }
      else if (fence[1][0] === fenceChar) { fenced = false; fenceChar = ""; }
      return "";
    }
    return fenced ? "" : line;
  }).join("\n");
}

function normalizeMarkdownTarget(raw) {
  let value = asString(raw);
  if (!value) return "";
  if (value.startsWith("<") && value.includes(">")) value = value.slice(1, value.indexOf(">"));
  else {
    const titled = value.match(/^(\S+)(?:\s+["'(].*)$/);
    if (titled) value = titled[1];
  }
  try { value = decodeURIComponent(value); } catch {}
  return value.replace(/^file:\/\//i, "").trim();
}

function isExternalVideoUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("vimeo.com");
  } catch {
    return false;
  }
}

function discoverMediaReferences(markdown) {
  const text = withoutFencedCode(markdown);
  const found = new Map();
  const add = (kind, target, altText = "") => {
    const cleanTarget = asString(target);
    if (!cleanTarget) return;
    const key = `${kind}:${cleanTarget}`;
    if (!found.has(key)) found.set(key, { kind, target: cleanTarget, altText: asString(altText) });
  };

  for (const match of text.matchAll(/!\[\[([^\]]+)\]\]/g)) {
    const raw = match[1].split("|")[0].split("#")[0].trim();
    if (raw) add("local", raw, match[1].includes("|") ? match[1].split("|").slice(1).join("|") : "");
  }

  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const target = normalizeMarkdownTarget(match[2]);
    if (!target) continue;
    if (/^https?:\/\//i.test(target)) {
      if (isExternalVideoUrl(target)) add("external", target, match[1]);
    } else if (MEDIA_MIME_TYPES.has(fileExtension(target))) {
      add("local", target, match[1]);
    }
  }

  for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = normalizeMarkdownTarget(match[1]);
    if (target && !/^https?:\/\//i.test(target) && MEDIA_MIME_TYPES.has(fileExtension(target))) add("local", target, "");
  }

  for (const match of text.matchAll(/https?:\/\/[^\s<>)\]]+/g)) {
    const target = match[0].replace(/[.,;:!?]+$/, "");
    if (isExternalVideoUrl(target)) add("external", target, "");
  }

  return [...found.values()];
}

async function sha256Hex(arrayBuffer) {
  if (!globalThis.crypto?.subtle) throw new Error("Web Crypto SHA-256 is unavailable on this device.");
  const digest = await globalThis.crypto.subtle.digest("SHA-256", arrayBuffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function responseHeader(response, wanted) {
  const headers = response?.headers || {};
  const target = String(wanted || "").toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (String(key).toLowerCase() === target) return asString(value);
  }
  return "";
}

function safeManifestPath(value) {
  const raw = asString(value).replace(/\\/g, "/");
  if (!raw || raw.startsWith("/") || /^[A-Za-z]+:\/\//.test(raw)) return "";
  const parts = raw.split("/").filter(Boolean);
  if (parts.some((part) => part === "..")) return "";
  return normalizePath(parts.join("/"));
}
'''
text = replace_once(text, 'function cleanBase(value) {', helpers + '\nfunction cleanBase(value) {', "media helpers")

settings_addition = r'''
    new Setting(containerEl)
      .setName("ARC asset folder")
      .setDesc("Local-first media mirror. R2 restores missing assets into these paths without rewriting Markdown links.")
      .addText((text) => text.setValue(this.plugin.settings.assetFolder).onChange(async (value) => {
        this.plugin.settings.assetFolder = normalizePath(value || DEFAULT_SETTINGS.assetFolder);
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Media gateway")
      .setDesc("Authenticated Render gateway that issues short-lived R2 upload/download URLs. R2 secrets never enter Obsidian.")
      .addText((text) => text.setValue(this.plugin.settings.mediaGatewayUrl).onChange(async (value) => {
        this.plugin.settings.mediaGatewayUrl = cleanBase(value || DEFAULT_SETTINGS.mediaGatewayUrl);
        await this.plugin.saveSettings();
      }));

'''
text = replace_once(
    text,
    '    new Setting(containerEl)\n      .setName("Chrono-Deck website")',
    settings_addition + '    new Setting(containerEl)\n      .setName("Chrono-Deck website")',
    "settings UI",
)

command_addition = r'''
    this.addCommand({ id: "show-archive-storage-health", name: "Show Chrono-Deck archive storage health", callback: () => this.showArchiveStorageHealth() });
'''
text = replace_once(
    text,
    '    this.addCommand({ id: "create-supplementary-arc", name: "Create supplementary ARC from current note", checkCallback: (checking) => {',
    command_addition + '    this.addCommand({ id: "create-supplementary-arc", name: "Create supplementary ARC from current note", checkCallback: (checking) => {',
    "storage command",
)

media_methods = r'''
  mediaGatewayBase() {
    return cleanBase(this.settings.mediaGatewayUrl || DEFAULT_SETTINGS.mediaGatewayUrl);
  }

  async presignMedia(payload, session) {
    const base = this.mediaGatewayBase();
    if (!base) throw new Error("Configure the Chrono-Deck media gateway first.");
    const response = await requestUrl({
      url: `${base}/presign`,
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      throw: false,
    });
    if (response.status < 200 || response.status >= 300) {
      const message = response.json?.error || response.json?.message || response.text || `HTTP ${response.status}`;
      throw new Error(`Media gateway: ${message}`);
    }
    return response.json;
  }

  resolveLocalMediaFile(sourceFile, target) {
    const cleanTarget = normalizeMarkdownTarget(target);
    if (!cleanTarget) return null;
    const linked = this.app.metadataCache.getFirstLinkpathDest(cleanTarget, sourceFile.path);
    if (linked && linked.extension && linked.extension.toLowerCase() !== "md") return linked;
    const direct = this.app.vault.getAbstractFileByPath(normalizePath(cleanTarget));
    if (direct && direct.extension && direct.extension.toLowerCase() !== "md") return direct;
    return null;
  }

  async hashVaultFile(file) {
    const binary = await this.app.vault.readBinary(file);
    return { binary, contentHash: await sha256Hex(binary) };
  }

  async uploadLocalMedia(ref, sourceFile, logicalArcId, session) {
    const resolved = this.resolveLocalMediaFile(sourceFile, ref.target);
    if (!resolved) {
      return {
        slotKey: `M-${contentFingerprint(`missing:${ref.target}`)}`,
        mediaType: mediaType(ref.target), status: "missing", purpose: "Local ARC media",
        altText: ref.altText || "", fileName: asString(ref.target).split("/").pop() || "asset.bin",
        mimeType: mediaMimeType(ref.target), localPath: ref.target, storageBackend: "r2",
      };
    }

    const byteSize = Number(resolved.stat?.size || 0);
    if (byteSize > MAX_MEDIA_BYTES) {
      return {
        slotKey: `M-${contentFingerprint(`large:${resolved.path}`)}`,
        mediaType: mediaType(resolved.path), status: "skipped", purpose: "Local ARC media exceeds 100 MiB bridge safety cap",
        altText: ref.altText || "", fileName: resolved.name, mimeType: mediaMimeType(resolved.path),
        byteSize, localPath: resolved.path, storageBackend: "r2",
      };
    }

    const { binary, contentHash } = await this.hashVaultFile(resolved);
    const upload = await this.presignMedia({
      action: "upload", logicalArcId, contentHash, fileName: resolved.name, expiresSeconds: 600,
    }, session);
    const headTicket = await this.presignMedia({ action: "head", objectKey: upload.objectKey, expiresSeconds: 300 }, session);
    const head = await requestUrl({ url: headTicket.url, method: "HEAD", throw: false });
    let remoteEtag = responseHeader(head, "etag");
    let uploadedAt = new Date().toISOString();

    if (head.status === 404) {
      const put = await requestUrl({
        url: upload.url,
        method: "PUT",
        headers: { "Content-Type": mediaMimeType(resolved.path) },
        body: binary,
        throw: false,
      });
      if (put.status < 200 || put.status >= 300) throw new Error(`R2 upload failed for ${resolved.path} (HTTP ${put.status}).`);
      remoteEtag = responseHeader(put, "etag");
    } else if (head.status < 200 || head.status >= 300) {
      throw new Error(`R2 existence check failed for ${resolved.path} (HTTP ${head.status}).`);
    }

    return {
      slotKey: `M-${contentFingerprint(`local:${resolved.path}`)}`,
      mediaType: mediaType(resolved.path), status: "uploaded", purpose: "Local ARC media",
      objectKey: upload.objectKey, altText: ref.altText || "", contentHash,
      fileName: resolved.name, mimeType: mediaMimeType(resolved.path), byteSize,
      localPath: resolved.path, storageBackend: "r2", remoteEtag, uploadedAt,
    };
  }

  async syncMediaForFile(file, markdown, arcId, session) {
    const frontmatter = this.getFrontmatter(file);
    const logicalArcId = inferLogicalArcId(frontmatter, arcId);
    const refs = discoverMediaReferences(markdown);
    const items = [];
    const warnings = [];

    for (const ref of refs) {
      if (ref.kind === "external") {
        items.push({
          slotKey: `M-${contentFingerprint(`external:${ref.target}`)}`,
          mediaType: "video", status: "linked", purpose: "External video",
          sourceUrl: ref.target, altText: ref.altText || "", storageBackend: "external",
        });
        continue;
      }
      try {
        items.push(await this.uploadLocalMedia(ref, file, logicalArcId, session));
      } catch (error) {
        console.warn("Chrono-Deck media upload deferred", ref.target, error);
        warnings.push(`${ref.target}: ${error.message}`);
        items.push({
          slotKey: `M-${contentFingerprint(`pending:${ref.target}`)}`,
          mediaType: mediaType(ref.target), status: "pending", purpose: "Local ARC media upload deferred",
          altText: ref.altText || "", fileName: asString(ref.target).split("/").pop() || "asset.bin",
          mimeType: mediaMimeType(ref.target), localPath: ref.target, storageBackend: "r2",
        });
      }
    }

    const manifest = await this.rpc("chrono_sync_arc_media_manifest", {
      p_arc_id: arcId,
      p_logical_arc_id: logicalArcId,
      p_items: items,
    }, session);
    return { logicalArcId, items, warnings, manifest };
  }

  async loadMediaManifest(arcId, session) {
    const value = await this.rpc("chrono_load_arc_media_manifest", { p_arc_id: arcId }, session);
    return Array.isArray(value) ? value : [];
  }

  mediaRestorePath(item, logicalArcId) {
    const original = safeManifestPath(item?.localPath);
    if (original) return original;
    const fileName = asString(item?.fileName, "asset.bin").replace(/[\\/:*?"<>|#^[\]]/g, "-");
    return normalizePath(`${this.settings.assetFolder || DEFAULT_SETTINGS.assetFolder}/${logicalArcId}/${fileName}`);
  }

  async restoreMediaForArc(file, cloud, session) {
    const arcId = extractArcId(cloud?.arcId);
    const logicalArcId = asString(cloud?.logicalArcId) || inferLogicalArcId(this.getFrontmatter(file), arcId);
    const manifest = await this.loadMediaManifest(arcId, session);
    let downloaded = 0;
    let current = 0;
    const conflicts = [];
    const warnings = [];

    for (const item of manifest) {
      if (asString(item?.storageBackend) === "external" || asString(item?.status) === "linked") continue;
      if (asString(item?.storageBackend || "r2") !== "r2" || asString(item?.status) !== "uploaded" || !asString(item?.objectKey)) continue;
      const path = this.mediaRestorePath(item, logicalArcId);
      const expectedHash = asString(item?.contentHash).toLowerCase();
      const existing = this.app.vault.getAbstractFileByPath(path);

      if (existing?.extension) {
        if (!expectedHash) { current += 1; continue; }
        try {
          const { contentHash } = await this.hashVaultFile(existing);
          if (contentHash === expectedHash) { current += 1; continue; }
          conflicts.push(`${path} differs from cloud; local file kept`);
          continue;
        } catch (error) {
          warnings.push(`${path}: ${error.message}`);
          continue;
        }
      }
      if (existing) {
        conflicts.push(`${path} exists but is not a file`);
        continue;
      }

      try {
        const ticket = await this.presignMedia({ action: "download", objectKey: item.objectKey, expiresSeconds: 600 }, session);
        const response = await requestUrl({ url: ticket.url, method: "GET", throw: false });
        if (response.status < 200 || response.status >= 300) throw new Error(`R2 download HTTP ${response.status}`);
        const binary = response.arrayBuffer;
        if (!binary) throw new Error("R2 download returned no binary body");
        if (expectedHash && await sha256Hex(binary) !== expectedHash) throw new Error("downloaded SHA-256 does not match manifest");
        const parent = path.split("/").slice(0, -1).join("/");
        await this.ensureFolder(parent);
        await this.app.vault.createBinary(path, binary);
        downloaded += 1;
      } catch (error) {
        warnings.push(`${path}: ${error.message}`);
      }
    }

    return { downloaded, current, conflicts, warnings, total: manifest.length };
  }

  async showArchiveStorageHealth() {
    try {
      const session = await this.ensureSession();
      const health = await this.rpc("chrono_archive_storage_health", {}, session);
      const relations = health?.projectRelationBytes || {};
      const relationBytes = Object.values(relations).reduce((sum, value) => sum + Number(value || 0), 0);
      new Notice(
        `Chrono-Deck storage: ${Number(health?.documents || 0)} docs / ${Number(health?.logicalArcs || 0)} logical ARCs; ` +
        `${formatBytes(health?.markdownBytes)} Markdown; ${formatBytes(health?.revisionSnapshotBytes)} revision snapshots; ` +
        `${Number(health?.embeddingChunks || 0)} embedding chunks; ${formatBytes(relationBytes)} total ARC-table relations.`,
        12000,
      );
    } catch (error) {
      new Notice(`Chrono-Deck storage health failed: ${error.message}`, 9000);
    }
  }

'''
text = replace_once(text, '  async buildSyncPayload(file) {', media_methods + '  async buildSyncPayload(file) {', "media methods")

text = replace_once(
    text,
    '''    const arcId = validation.arcId;
    const visibility = asString(frontmatter.visibility || "private");''',
    '''    const arcId = validation.arcId;
    const logicalArcId = inferLogicalArcId(frontmatter, arcId);
    const documentType = inferDocumentType(frontmatter, arcId);
    const visibility = asString(frontmatter.visibility || "private");''',
    "payload identity",
)
text = replace_once(
    text,
    '''      schemaVersion: 2,
      arcId,
      canonicalLabel:''',
    '''      schemaVersion: 2,
      arcId,
      logicalArcId,
      documentType,
      canonicalLabel:''',
    "payload document identity",
)

pull_current_old = r'''      if (result.action === "conflict") {
        this.setStatus(`${validation.arcId} · conflict`);
        new Notice(`Pull stopped for ${validation.arcId}: ${result.reason}. Your local note was not changed.`, 10000);
        return;
      }
      this.setStatus(`${validation.arcId} · cloud v${result.revision}`);
      new Notice(result.action === "current"
        ? `${validation.arcId} is already at cloud revision ${result.revision}.`
        : `Pulled ${validation.arcId} revision ${result.revision} (${result.action}).`, 7000);'''
pull_current_new = r'''      if (result.action === "conflict") {
        this.setStatus(`${validation.arcId} · conflict`);
        new Notice(`Pull stopped for ${validation.arcId}: ${result.reason}. Your local note was not changed.`, 10000);
        return;
      }
      let media = { downloaded: 0, conflicts: [], warnings: [] };
      try { media = await this.restoreMediaForArc(result.file, cloud, session); }
      catch (error) { media.warnings = [error.message]; }
      this.setStatus(`${validation.arcId} · cloud v${result.revision}`);
      const mediaText = media.downloaded ? ` Restored ${media.downloaded} media file${media.downloaded === 1 ? "" : "s"} from R2.` : "";
      const mediaProblems = [...media.conflicts, ...media.warnings];
      const mediaProblemText = mediaProblems.length ? ` Media warnings: ${mediaProblems.slice(0, 3).join("; ")}${mediaProblems.length > 3 ? "; …" : ""}` : "";
      new Notice((result.action === "current"
        ? `${validation.arcId} is already at cloud revision ${result.revision}.`
        : `Pulled ${validation.arcId} revision ${result.revision} (${result.action}).`) + mediaText + mediaProblemText, mediaProblems.length ? 12000 : 8000);'''
text = replace_once(text, pull_current_old, pull_current_new, "pull current media")

pull_all_old = r'''      let current = 0;
      const conflicts = [];
      for (const summary of summaries) {'''
pull_all_new = r'''      let current = 0;
      let mediaRestored = 0;
      const conflicts = [];
      const mediaWarnings = [];
      for (const summary of summaries) {'''
text = replace_once(text, pull_all_old, pull_all_new, "pull all counters")

pull_all_result_old = r'''        const result = await this.writeCloudArc(cloud);
        if (result.action === "created") created += 1;
        else if (result.action === "updated") updated += 1;
        else if (result.action === "current") current += 1;
        else if (result.action === "conflict") conflicts.push(`${arcId}: ${result.reason}`);'''
pull_all_result_new = r'''        const result = await this.writeCloudArc(cloud);
        if (result.action === "created") created += 1;
        else if (result.action === "updated") updated += 1;
        else if (result.action === "current") current += 1;
        else if (result.action === "conflict") conflicts.push(`${arcId}: ${result.reason}`);
        if (result.action !== "conflict") {
          try {
            const media = await this.restoreMediaForArc(result.file, cloud, session);
            mediaRestored += media.downloaded;
            mediaWarnings.push(...media.conflicts.map((value) => `${arcId}: ${value}`), ...media.warnings.map((value) => `${arcId}: ${value}`));
          } catch (error) {
            mediaWarnings.push(`${arcId}: ${error.message}`);
          }
        }'''
text = replace_once(text, pull_all_result_old, pull_all_result_new, "pull all restore")

pull_all_notice_old = r'''      const conflictText = conflicts.length ? ` Conflicts skipped (${conflicts.length}): ${conflicts.slice(0, 4).join("; ")}${conflicts.length > 4 ? "; …" : ""}` : "";
      new Notice(`Cloud pull complete: ${created} created, ${updated} updated, ${current} already current.${conflictText}`, conflicts.length ? 12000 : 8000);'''
pull_all_notice_new = r'''      const conflictText = conflicts.length ? ` Conflicts skipped (${conflicts.length}): ${conflicts.slice(0, 4).join("; ")}${conflicts.length > 4 ? "; …" : ""}` : "";
      const mediaText = mediaRestored ? ` Restored ${mediaRestored} media file${mediaRestored === 1 ? "" : "s"} from R2.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media warnings (${mediaWarnings.length}): ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Cloud pull complete: ${created} created, ${updated} updated, ${current} already current.${mediaText}${conflictText}${mediaWarningText}`, conflicts.length || mediaWarnings.length ? 12000 : 8000);'''
text = replace_once(text, pull_all_notice_old, pull_all_notice_new, "pull all notice")

sync_anchor = r'''      const revision = Number(result?.revision || 0);
      const syncedAt = new Date().toISOString();'''
sync_replacement = r'''      const revision = Number(result?.revision || 0);
      let mediaStatus = "none";
      let mediaCount = 0;
      const mediaWarnings = [];
      try {
        const media = await this.syncMediaForFile(file, payload.document.sourceMarkdown, payload.document.arcId, session);
        mediaStatus = asString(media.manifest?.mediaStatus || "none");
        mediaCount = media.items.filter((item) => item.status === "uploaded" || item.status === "linked").length;
        mediaWarnings.push(...media.warnings);
      } catch (error) {
        console.warn("Chrono-Deck media manifest sync deferred", error);
        mediaWarnings.push(error.message);
      }
      const syncedAt = new Date().toISOString();'''
text = replace_once(text, sync_anchor, sync_replacement, "sync media")

text = replace_once(
    text,
    '''        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
      });
      const fingerprint = await this.computeFileFingerprint(file);''',
    '''        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
        fm.chrono_media_status = mediaStatus;
      });
      const fingerprint = await this.computeFileFingerprint(file);''',
    "media status stamp",
)

text = text.replace('          p_keep_recent: 50,\n          p_keep_every: 25,', '          p_keep_recent: 20,\n          p_keep_every: 50,', 1)

sync_notice_old = r'''      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";
      const pruneText = pruned ? ` Pruned ${pruned} old full snapshot${pruned === 1 ? "" : "s"}.` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${pruneText}${warningText}`, 7000);'''
sync_notice_new = r'''      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";
      const pruneText = pruned ? ` Pruned ${pruned} old full snapshot${pruned === 1 ? "" : "s"}.` : "";
      const mediaText = mediaCount ? ` Mirrored ${mediaCount} media item${mediaCount === 1 ? "" : "s"} to R2/external links.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media deferred: ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${mediaText}${pruneText}${warningText}${mediaWarningText}`, mediaWarnings.length ? 12000 : 8000);'''
text = replace_once(text, sync_notice_old, sync_notice_new, "sync notice")

MAIN.write_text(text, encoding="utf-8")

manifest = MANIFEST.read_text(encoding="utf-8")
manifest = manifest.replace('"version": "0.3.0"', '"version": "0.4.0"')
manifest = manifest.replace(
    '"description": "Author Chrono-Deck ARC notes with a rendered reader, MathJax-friendly editing, and safe Supabase sync."',
    '"description": "Author Chrono-Deck ARC notes with safe Supabase sync and automatic private R2 media mirroring."',
)
MANIFEST.write_text(manifest, encoding="utf-8")

workflow = WORKFLOW.read_text(encoding="utf-8")
workflow = workflow.replace('grep -q \'"version": "0.3.0"\' obsidian-plugin/manifest.json', 'grep -q \'"version": "0.4.0"\' obsidian-plugin/manifest.json')
anchor = "          grep -q 'chrono_prune_arc_revisions' obsidian-plugin/main.js\n"
extra = "          grep -q 'chrono_prune_arc_revisions' obsidian-plugin/main.js\n          grep -q 'CHRONO_MEDIA_BRIDGE_V1' obsidian-plugin/main.js\n          grep -q 'chrono_sync_arc_media_manifest' obsidian-plugin/main.js\n          grep -q 'chrono_load_arc_media_manifest' obsidian-plugin/main.js\n          grep -q 'chrono-deck-media.onrender.com' obsidian-plugin/main.js\n"
if anchor not in workflow:
    raise SystemExit("frontend workflow media anchor not found")
workflow = workflow.replace(anchor, extra, 1)
WORKFLOW.write_text(workflow, encoding="utf-8")

print("Patched Obsidian bridge with R2 media sync v1")
