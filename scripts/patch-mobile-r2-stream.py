from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "obsidian-plugin" / "main.js"
MANIFEST = ROOT / "obsidian-plugin" / "manifest.json"
GATEWAY = ROOT / "chatgpt-app" / "media-gateway.js"


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one anchor, found {count}")
    return text.replace(old, new, 1)

text = MAIN.read_text(encoding="utf-8")
old = '''  async presignMedia(payload, session) {
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
'''
new = '''  async presignMedia(payload, session) {
    const base = this.mediaGatewayBase();
    if (!base) throw new Error("Configure the Chrono-Deck media gateway first.");
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
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
      } catch (error) {
        lastError = error;
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
      }
    }
    throw lastError || new Error("Media gateway request failed.");
  }
'''
text = replace_once(text, old, new, "presign retry")

old = '''    const upload = await this.presignMedia({
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
'''
new = '''    const upload = await this.presignMedia({
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
'''
text = replace_once(text, old, new, "client HEAD removal")
MAIN.write_text(text, encoding="utf-8")

gateway = GATEWAY.read_text(encoding="utf-8")
old = '''      if (action === "upload") {
        objectKey = makeR2ObjectKey({
          userId: user.id,
          logicalArcId: clean(body.logicalArcId),
          contentHash: clean(body.contentHash),
          fileName: clean(body.fileName),
        });
        method = "PUT";
      } else if (action === "download") {
'''
new = '''      if (action === "upload") {
        objectKey = makeR2ObjectKey({
          userId: user.id,
          logicalArcId: clean(body.logicalArcId),
          contentHash: clean(body.contentHash),
          fileName: clean(body.fileName),
        });
        method = "PUT";

        const headUrl = presignR2Object({ method: "HEAD", objectKey, expiresSeconds: 60 });
        const head = await fetch(headUrl, { method: "HEAD" });
        if (head.ok) {
          sendJson(res, 200, {
            action,
            method,
            objectKey,
            url: null,
            exists: true,
            remoteEtag: clean(head.headers.get("etag")),
            expiresSeconds,
            storageBackend: "r2",
          });
          return;
        }
        if (head.status !== 404) {
          console.error("Chrono-Deck R2 HEAD failed", head.status, await head.text().catch(() => ""));
          sendJson(res, 502, { error: `R2 existence check failed (HTTP ${head.status})` });
          return;
        }
      } else if (action === "download") {
'''
gateway = replace_once(gateway, old, new, "server-side HEAD")
old = '''      sendJson(res, 200, {
        action,
        method,
        objectKey,
        url: signedUrl,
        expiresSeconds,
        storageBackend: "r2",
      });
'''
new = '''      sendJson(res, 200, {
        action,
        method,
        objectKey,
        url: signedUrl,
        exists: false,
        remoteEtag: "",
        expiresSeconds,
        storageBackend: "r2",
      });
'''
gateway = replace_once(gateway, old, new, "presign response")
GATEWAY.write_text(gateway, encoding="utf-8")

manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
if manifest.get("version") != "0.4.1":
    raise SystemExit(f"manifest: expected 0.4.1, found {manifest.get('version')}")
manifest["version"] = "0.4.2"
MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

print("Patched mobile R2 stream handling and bumped Chrono-Deck Bridge to 0.4.2")
