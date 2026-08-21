import { createServer } from "node:http";

import { isR2Configured, makeR2ObjectKey, presignR2Object } from "./lib/r2-media.js";

const port = Number(process.env.PORT || 8791);

function clean(value) {
  return String(value || "").trim();
}

function requireEnv(name) {
  const value = clean(process.env[name]);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(payload));
}

async function readJson(req, maxBytes = 32 * 1024) {
  let total = 0;
  const chunks = [];
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) throw new Error("Request body too large");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function authenticateSupabaseOwner(req) {
  const authorization = clean(req.headers.authorization);
  if (!authorization.toLowerCase().startsWith("bearer ")) return null;

  const base = requireEnv("CHRONO_SUPABASE_URL").replace(/\/+$/, "");
  const key = requireEnv("CHRONO_SUPABASE_ANON_KEY");
  const allowedUserId = requireEnv("CHRONO_ARCHIVE_USER_ID");

  const response = await fetch(`${base}/auth/v1/user`, {
    headers: {
      apikey: key,
      Authorization: authorization,
    },
  });
  if (!response.ok) return null;
  const user = await response.json();
  if (!user?.id || user.id !== allowedUserId) return null;
  return user;
}

function validateOwnedObjectKey(userId, objectKey) {
  const value = clean(objectKey);
  if (!value || !value.startsWith(`${userId}/`)) throw new Error("Object key is outside the authenticated user's ARC namespace");
  if (value.includes("..") || value.includes("\\")) throw new Error("Invalid object key");
  return value;
}

const server = createServer(async (req, res) => {
  applyCors(res);
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  try {
    if (req.method === "OPTIONS") {
      res.writeHead(204).end();
      return;
    }

    if (req.method === "GET" && url.pathname === "/health") {
      sendJson(res, 200, {
        ok: true,
        service: "chrono-deck-media-gateway",
        r2Configured: isR2Configured(),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/presign") {
      const user = await authenticateSupabaseOwner(req);
      if (!user) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }
      if (!isR2Configured()) {
        sendJson(res, 503, { error: "R2 is not configured on the media gateway yet." });
        return;
      }

      const body = await readJson(req);
      const action = clean(body.action || "download").toLowerCase();
      const expiresSeconds = Math.max(30, Math.min(Number(body.expiresSeconds) || 300, 900));
      let objectKey;
      let method;

      if (action === "upload") {
        objectKey = makeR2ObjectKey({
          userId: user.id,
          logicalArcId: clean(body.logicalArcId),
          contentHash: clean(body.contentHash),
          fileName: clean(body.fileName),
        });
        method = "PUT";
      } else if (action === "download") {
        objectKey = validateOwnedObjectKey(user.id, body.objectKey);
        method = "GET";
      } else if (action === "head") {
        objectKey = validateOwnedObjectKey(user.id, body.objectKey);
        method = "HEAD";
      } else {
        sendJson(res, 400, { error: "action must be upload, download, or head" });
        return;
      }

      const signedUrl = presignR2Object({ method, objectKey, expiresSeconds });
      sendJson(res, 200, {
        action,
        method,
        objectKey,
        url: signedUrl,
        expiresSeconds,
        storageBackend: "r2",
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/") {
      sendJson(res, 200, {
        name: "Chrono-Deck ARC Media Gateway",
        r2Configured: isR2Configured(),
        endpoints: ["GET /health", "POST /presign"],
      });
      return;
    }

    res.writeHead(404).end("Not Found");
  } catch (error) {
    console.error("Chrono-Deck media gateway error", error instanceof Error ? error.message : error);
    if (!res.headersSent) sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`Chrono-Deck media gateway listening on port ${port}`);
});
