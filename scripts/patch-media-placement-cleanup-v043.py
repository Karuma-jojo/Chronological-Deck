from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "obsidian-plugin" / "main.js"
MANIFEST = ROOT / "obsidian-plugin" / "manifest.json"
GATEWAY = ROOT / "chatgpt-app" / "media-gateway.js"
CI = ROOT / ".github" / "workflows" / "frontend-checks.yml"
DOC = ROOT / "docs" / "obsidian-bridge.md"


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one anchor, found {count}")
    return text.replace(old, new, 1)


def replace_between(text, start_marker, end_marker, replacement, label):
    start = text.find(start_marker)
    if start < 0:
        raise SystemExit(f"{label}: start marker missing")
    end = text.find(end_marker, start)
    if end < 0:
        raise SystemExit(f"{label}: end marker missing")
    return text[:start] + replacement + text[end:]


text = MAIN.read_text(encoding="utf-8")

# Preserve exact 1-based Markdown line numbers, nearest heading, target and syntax.
new_discovery = r'''function discoverMediaReferences(markdown) {
  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  const refs = [];
  let inFrontmatter = lines[0]?.trim() === "---";
  let fenced = false;
  let fenceChar = "";
  let sourceHeading = "";

  const add = (kind, target, altText, lineNumber, embedSyntax, charIndex = 0) => {
    const cleanTarget = asString(target);
    if (!cleanTarget) return;
    const duplicate = refs.some((ref) => ref.lineNumber === lineNumber && ref.kind === kind && ref.target === cleanTarget && ref.charIndex === charIndex);
    if (duplicate) return;
    refs.push({
      kind,
      target: cleanTarget,
      altText: asString(altText),
      lineNumber,
      sourceHeading,
      embedTarget: cleanTarget,
      embedSyntax: asString(embedSyntax),
      charIndex,
      position: refs.length,
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = index + 1;

    if (inFrontmatter) {
      if (index > 0 && line.trim() === "---") inFrontmatter = false;
      continue;
    }

    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) { fenced = true; fenceChar = fence[1][0]; }
      else if (fence[1][0] === fenceChar) { fenced = false; fenceChar = ""; }
      continue;
    }
    if (fenced) continue;

    const heading = line.match(/^\s*#{1,6}\s+(.+?)\s*$/);
    if (heading) sourceHeading = heading[1].trim();

    for (const match of line.matchAll(/!\[\[([^\]]+)\]\]/g)) {
      const raw = match[1].split("|")[0].split("#")[0].trim();
      if (!raw || !MEDIA_MIME_TYPES.has(fileExtension(raw))) continue;
      const alt = match[1].includes("|") ? match[1].split("|").slice(1).join("|") : "";
      add("local", raw, alt, lineNumber, match[0], match.index || 0);
    }

    for (const match of line.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      const target = normalizeMarkdownTarget(match[2]);
      if (!target) continue;
      if (/^https?:\/\//i.test(target)) {
        if (isExternalVideoUrl(target)) add("external", target, match[1], lineNumber, match[0], match.index || 0);
      } else if (MEDIA_MIME_TYPES.has(fileExtension(target))) {
        add("local", target, match[1], lineNumber, match[0], match.index || 0);
      }
    }

    for (const match of line.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = normalizeMarkdownTarget(match[1]);
      if (target && !/^https?:\/\//i.test(target) && MEDIA_MIME_TYPES.has(fileExtension(target))) {
        add("local", target, "", lineNumber, match[0], match.index || 0);
      }
    }

    for (const match of line.matchAll(/https?:\/\/[^\s<>)\]]+/g)) {
      const target = match[0].replace(/[.,;:!?]+$/, "");
      if (!isExternalVideoUrl(target)) continue;
      if (refs.some((ref) => ref.lineNumber === lineNumber && ref.target === target)) continue;
      add("external", target, "", lineNumber, match[0], match.index || 0);
    }
  }

  return refs.map((ref, position) => ({ ...ref, position }));
}

'''
text = replace_between(text, "function discoverMediaReferences(markdown) {", "async function sha256Hex", new_discovery, "media discovery")

# Add placement helpers immediately after local media resolution.
anchor = '''  resolveLocalMediaFile(sourceFile, target) {
    const cleanTarget = normalizeMarkdownTarget(target);
    if (!cleanTarget) return null;
    const linked = this.app.metadataCache.getFirstLinkpathDest(cleanTarget, sourceFile.path);
    if (linked && linked.extension && linked.extension.toLowerCase() !== "md") return linked;
    const direct = this.app.vault.getAbstractFileByPath(normalizePath(cleanTarget));
    if (direct && direct.extension && direct.extension.toLowerCase() !== "md") return direct;
    return null;
  }
'''
replacement = anchor + '''
  mediaPlacement(ref, sourceFile) {
    return {
      position: Number.isInteger(ref?.position) ? ref.position : 0,
      sourcePath: asString(sourceFile?.path),
      lineNumber: Number(ref?.lineNumber || 0) || null,
      sourceHeading: asString(ref?.sourceHeading),
      embedTarget: asString(ref?.embedTarget || ref?.target),
      embedSyntax: asString(ref?.embedSyntax),
    };
  }

  mediaSlotKey(ref, sourceFile, kind = "local") {
    return `M-${contentFingerprint(`${kind}:${asString(sourceFile?.path)}:${Number(ref?.lineNumber || 0)}:${Number(ref?.position || 0)}:${asString(ref?.target)}`)}`;
  }
'''
text = replace_once(text, anchor, replacement, "placement helpers")

# Replace uploadLocalMedia with placement-aware occurrence identities.
start = text.index("  async uploadLocalMedia(ref, sourceFile, logicalArcId, session) {")
end = text.index("\n  async syncMediaForFile", start)
if start < 0 or end < 0:
    raise SystemExit("uploadLocalMedia anchors missing")
new_upload = r'''  async uploadLocalMedia(ref, sourceFile, logicalArcId, session) {
    const placement = this.mediaPlacement(ref, sourceFile);
    const resolved = this.resolveLocalMediaFile(sourceFile, ref.target);
    if (!resolved) {
      return {
        ...placement,
        slotKey: this.mediaSlotKey(ref, sourceFile, "missing"),
        mediaType: mediaType(ref.target), status: "missing", purpose: "Local ARC media",
        altText: ref.altText || "", fileName: asString(ref.target).split("/").pop() || "asset.bin",
        mimeType: mediaMimeType(ref.target), localPath: ref.target, storageBackend: "r2",
      };
    }

    const byteSize = Number(resolved.stat?.size || 0);
    if (byteSize > MAX_MEDIA_BYTES) {
      return {
        ...placement,
        slotKey: this.mediaSlotKey(ref, sourceFile, "large"),
        mediaType: mediaType(resolved.path), status: "skipped", purpose: "Local ARC media exceeds 100 MiB bridge safety cap",
        altText: ref.altText || "", fileName: resolved.name, mimeType: mediaMimeType(resolved.path),
        byteSize, localPath: resolved.path, storageBackend: "r2",
      };
    }

    const { binary, contentHash } = await this.hashVaultFile(resolved);
    const upload = await this.presignMedia({
      action: "upload", logicalArcId, contentHash, fileName: resolved.name, expiresSeconds: 600,
    }, session);
    let remoteEtag = asString(upload.remoteEtag || "");
    const uploadedAt = new Date().toISOString();

    if (!upload.exists) {
      if (!upload.url) throw new Error(`Media gateway returned no upload URL for ${resolved.path}.`);
      const put = await requestUrl({
        url: upload.url,
        method: "PUT",
        headers: { "Content-Type": mediaMimeType(resolved.path) },
        body: binary,
        throw: false,
      });
      if (put.status < 200 || put.status >= 300) throw new Error(`R2 upload failed for ${resolved.path} (HTTP ${put.status}).`);
      remoteEtag = responseHeader(put, "etag");
    }

    return {
      ...placement,
      slotKey: this.mediaSlotKey(ref, sourceFile, "local"),
      mediaType: mediaType(resolved.path), status: "uploaded", purpose: "Local ARC media",
      objectKey: upload.objectKey, altText: ref.altText || "", contentHash,
      fileName: resolved.name, mimeType: mediaMimeType(resolved.path), byteSize,
      localPath: resolved.path, storageBackend: "r2", remoteEtag, uploadedAt,
    };
  }
'''
text = text[:start] + new_upload + text[end:]

# Replace syncMediaForFile so a missing local binary does not orphan a still-linked cloud backup.
start = text.index("  async syncMediaForFile(file, markdown, arcId, session) {")
end = text.index("\n  async loadMediaManifest", start)
if start < 0 or end < 0:
    raise SystemExit("syncMediaForFile anchors missing")
new_sync_media = r'''  async syncMediaForFile(file, markdown, arcId, session) {
    const frontmatter = this.getFrontmatter(file);
    const logicalArcId = inferLogicalArcId(frontmatter, arcId);
    const refs = discoverMediaReferences(markdown);
    const previous = await this.loadMediaManifest(arcId, session);
    const items = [];
    const warnings = [];

    const priorForRef = (ref) => previous.find((item) => {
      if (asString(item?.storageBackend || "r2") !== "r2" || asString(item?.status) !== "uploaded" || !asString(item?.objectKey)) return false;
      const target = normalizeMarkdownTarget(ref.target);
      const priorTarget = normalizeMarkdownTarget(item?.embedTarget || item?.localPath || item?.fileName);
      if (target && priorTarget && target === priorTarget) return true;
      const targetName = target.split("/").pop();
      return targetName && targetName === asString(item?.fileName);
    });

    for (const ref of refs) {
      if (ref.kind === "external") {
        items.push({
          ...this.mediaPlacement(ref, file),
          slotKey: this.mediaSlotKey(ref, file, "external"),
          mediaType: "video", status: "linked", purpose: "External video",
          sourceUrl: ref.target, altText: ref.altText || "", storageBackend: "external",
        });
        continue;
      }
      try {
        let item = await this.uploadLocalMedia(ref, file, logicalArcId, session);
        if (item.status === "missing") {
          const prior = priorForRef(ref);
          if (prior) {
            item = {
              ...item,
              status: "uploaded",
              purpose: "Local ARC media (cloud copy retained while local binary is missing)",
              objectKey: prior.objectKey,
              contentHash: prior.contentHash,
              fileName: prior.fileName || item.fileName,
              mimeType: prior.mimeType || item.mimeType,
              byteSize: prior.byteSize,
              localPath: prior.localPath || item.localPath,
              storageBackend: "r2",
              remoteEtag: prior.remoteEtag,
              uploadedAt: prior.uploadedAt,
            };
          }
        }
        items.push(item);
      } catch (error) {
        console.warn("Chrono-Deck media upload deferred", ref.target, error);
        warnings.push(`${ref.target}: ${error.message}`);
        items.push({
          ...this.mediaPlacement(ref, file),
          slotKey: this.mediaSlotKey(ref, file, "pending"),
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
'''
text = text[:start] + new_sync_media + text[end:]

# Add media map and conservative explicit orphan purge methods after loadMediaManifest.
anchor = '''  async loadMediaManifest(arcId, session) {
    const value = await this.rpc("chrono_load_arc_media_manifest", { p_arc_id: arcId }, session);
    return Array.isArray(value) ? value : [];
  }
'''
addition = anchor + r'''

  async showCurrentArcMediaMap() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const session = await this.ensureSession();
      const manifest = await this.loadMediaManifest(validation.arcId, session);
      if (!manifest.length) return void new Notice(`${validation.arcId}: no cloud media references are recorded yet.`, 7000);
      const rows = manifest.slice(0, 8).map((item) => {
        const line = Number(item?.lineNumber || 0) ? `L${Number(item.lineNumber)}` : "line ?";
        const heading = asString(item?.sourceHeading) || "(no heading)";
        const name = asString(item?.fileName || item?.embedTarget || item?.sourceUrl || "media");
        return `${line} · ${heading} · ${name}`;
      });
      const tail = manifest.length > rows.length ? `\n…plus ${manifest.length - rows.length} more.` : "";
      new Notice(`${validation.arcId} media map:\n${rows.join("\n")}${tail}`, 15000);
    } catch (error) {
      new Notice(`Chrono-Deck media map failed: ${error.message}`, 10000);
    }
  }

  async listOrphanedMedia(session, logicalArcId = null) {
    const value = await this.rpc("chrono_list_orphaned_arc_media", {
      p_logical_arc_id: logicalArcId,
      p_limit: 2000,
    }, session);
    return Array.isArray(value) ? value : [];
  }

  async purgeOrphanedMedia() {
    try {
      const session = await this.ensureSession();
      const orphans = await this.listOrphanedMedia(session, null);
      if (!orphans.length) return void new Notice("Chrono-Deck: no unreferenced R2 media objects are waiting for cleanup.", 8000);
      const totalBytes = orphans.reduce((sum, item) => sum + Number(item?.byteSize || 0), 0);
      const answer = await new TextPromptModal(
        this.app,
        `Purge ${orphans.length} unreferenced cloud media object${orphans.length === 1 ? "" : "s"} (${formatBytes(totalBytes)})? Type PURGE to confirm.`,
        "PURGE",
      ).ask();
      if (answer !== "PURGE") return void new Notice("Chrono-Deck media purge cancelled.");

      let deleted = 0;
      let missing = 0;
      const failures = [];
      for (const item of orphans) {
        const objectKey = asString(item?.objectKey);
        if (!objectKey) continue;
        try {
          const result = await this.presignMedia({ action: "delete", objectKey }, session);
          if (!result?.deleted && !result?.missing) throw new Error("gateway did not confirm deletion");
          if (result?.missing) missing += 1;
          await this.rpc("chrono_forget_orphaned_arc_media", { p_object_key: objectKey }, session);
          deleted += 1;
        } catch (error) {
          failures.push(`${asString(item?.fileName || objectKey)}: ${error.message}`);
        }
      }
      const failureText = failures.length ? ` Failed (${failures.length}): ${failures.slice(0, 3).join("; ")}${failures.length > 3 ? "; …" : ""}` : "";
      const missingText = missing ? ` ${missing} object${missing === 1 ? " was" : "s were"} already absent in R2.` : "";
      new Notice(`Chrono-Deck cloud cleanup: removed ${deleted} orphan record${deleted === 1 ? "" : "s"} and corresponding R2 object${deleted === 1 ? "" : "s"}.${missingText}${failureText}`, failures.length ? 15000 : 10000);
    } catch (error) {
      new Notice(`Chrono-Deck media purge failed: ${error.message}`, 12000);
    }
  }
'''
text = replace_once(text, anchor, addition, "media map and purge methods")

# Register the two explicit commands.
anchor = '''    this.addCommand({ id: "show-archive-storage-health", name: "Show Chrono-Deck archive storage health", callback: () => this.showArchiveStorageHealth() });
'''
replacement = anchor + '''    this.addCommand({ id: "show-current-arc-media-map", name: "Show current ARC media map", callback: () => this.showCurrentArcMediaMap() });
    this.addCommand({ id: "purge-orphaned-media", name: "Purge unreferenced Chrono-Deck media from cloud", callback: () => this.purgeOrphanedMedia() });
'''
text = replace_once(text, anchor, replacement, "command registration")

# Surface newly orphaned objects in the normal sync toast.
old = '''        mediaStatus = asString(media.manifest?.mediaStatus || "none");
        mediaCount = media.items.filter((item) => item.status === "uploaded" || item.status === "linked").length;
        mediaWarnings.push(...media.warnings);
'''
new = '''        mediaStatus = asString(media.manifest?.mediaStatus || "none");
        mediaCount = media.items.filter((item) => item.status === "uploaded" || item.status === "linked").length;
        orphanCandidates = Number(media.manifest?.orphanCandidates || 0);
        mediaWarnings.push(...media.warnings);
'''
text = replace_once(text, old, new, "orphan count assignment")

old = '''      let mediaStatus = "none";
      let mediaCount = 0;
      const mediaWarnings = [];
'''
new = '''      let mediaStatus = "none";
      let mediaCount = 0;
      let orphanCandidates = 0;
      const mediaWarnings = [];
'''
text = replace_once(text, old, new, "orphan count declaration")

old = '''      const mediaText = mediaCount ? ` Mirrored ${mediaCount} media item${mediaCount === 1 ? "" : "s"} to R2/external links.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media deferred: ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${mediaText}${pruneText}${warningText}${mediaWarningText}`, mediaWarnings.length ? 12000 : 8000);
'''
new = '''      const mediaText = mediaCount ? ` Mirrored ${mediaCount} media item${mediaCount === 1 ? "" : "s"} to R2/external links.` : "";
      const orphanText = orphanCandidates ? ` ${orphanCandidates} unreferenced cloud media object${orphanCandidates === 1 ? " is" : "s are"} now eligible for explicit cleanup.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media deferred: ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${mediaText}${orphanText}${pruneText}${warningText}${mediaWarningText}`, mediaWarnings.length ? 12000 : 9000);
'''
text = replace_once(text, old, new, "orphan sync notice")

MAIN.write_text(text, encoding="utf-8")

# Gateway: perform destructive R2 DELETE server-side after owner namespace validation.
gateway = GATEWAY.read_text(encoding="utf-8")
old = '''      } else if (action === "head") {
        objectKey = validateOwnedObjectKey(user.id, body.objectKey);
        method = "HEAD";
      } else {
        sendJson(res, 400, { error: "action must be upload, download, or head" });
        return;
      }

      const signedUrl = presignR2Object({ method, objectKey, expiresSeconds });
'''
new = '''      } else if (action === "head") {
        objectKey = validateOwnedObjectKey(user.id, body.objectKey);
        method = "HEAD";
      } else if (action === "delete") {
        objectKey = validateOwnedObjectKey(user.id, body.objectKey);
        const deleteUrl = presignR2Object({ method: "DELETE", objectKey, expiresSeconds: 60 });
        const deleted = await fetch(deleteUrl, { method: "DELETE" });
        if (deleted.ok || deleted.status === 404) {
          sendJson(res, 200, {
            action,
            method: "DELETE",
            objectKey,
            deleted: deleted.ok,
            missing: deleted.status === 404,
            storageBackend: "r2",
          });
          return;
        }
        console.error("Chrono-Deck R2 DELETE failed", deleted.status, await deleted.text().catch(() => ""));
        sendJson(res, 502, { error: `R2 delete failed (HTTP ${deleted.status})` });
        return;
      } else {
        sendJson(res, 400, { error: "action must be upload, download, head, or delete" });
        return;
      }

      const signedUrl = presignR2Object({ method, objectKey, expiresSeconds });
'''
gateway = replace_once(gateway, old, new, "gateway delete action")
GATEWAY.write_text(gateway, encoding="utf-8")

manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
if manifest.get("version") != "0.4.2":
    raise SystemExit(f"manifest: expected 0.4.2, found {manifest.get('version')}")
manifest["version"] = "0.4.3"
MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

ci = CI.read_text(encoding="utf-8")
ci = replace_once(ci, '\"version\": \"0.4.2\"', '\"version\": \"0.4.3\"', "CI bridge version")
ci = replace_once(ci, "grep -q 'chrono_load_arc_media_manifest' obsidian-plugin/main.js\n", "grep -q 'chrono_load_arc_media_manifest' obsidian-plugin/main.js\n          grep -q 'show-current-arc-media-map' obsidian-plugin/main.js\n          grep -q 'purge-orphaned-media' obsidian-plugin/main.js\n          grep -q 'chrono_list_orphaned_arc_media' obsidian-plugin/main.js\n          grep -q 'action === \\\"delete\\\"' chatgpt-app/media-gateway.js\n          test -f supabase/arc-media-placement-cleanup-v2.sql\n", "CI media v2 contract")
CI.write_text(ci, encoding="utf-8")

if DOC.exists():
    doc = DOC.read_text(encoding="utf-8")
    marker = "## Media placement and cleanup (v0.4.3)"
    if marker not in doc:
        doc += r'''

## Media placement and cleanup (v0.4.3)

Each synced media occurrence now records its ARC/source path, 1-based Markdown line number, nearest heading, embed target and exact embed syntax in the Supabase media manifest. The R2 object remains content-addressed binary storage; placement belongs to the Markdown document/manifest layer.

Removing an embed and syncing does not immediately destroy the R2 backup. The old R2 object becomes an explicit orphan candidate only when no current ARC manifest references that object key. Use `Chrono-Deck: Purge unreferenced Chrono-Deck media from cloud` and type `PURGE` to permanently delete those R2 objects and their small Supabase orphan records. Re-adding/re-syncing a reference before purge cancels its orphan status. A temporarily missing local binary whose Markdown embed still exists retains its previous cloud object, so cleanup cannot accidentally erase the recovery copy merely because a phone attachment was deleted.
'''
        DOC.write_text(doc, encoding="utf-8")

print("Patched Chrono-Deck Bridge media placement + cleanup v0.4.3")
