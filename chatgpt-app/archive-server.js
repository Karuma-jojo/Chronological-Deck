import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { createServer as createHttpServer } from "node:http";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

import {
  loadArcBundle,
  semanticEmbeddingStatus,
  semanticRelatedArcs,
  semanticSearchCompleted,
  suggestFrontmatterLinks,
} from "./lib/archive-client.js";

const port = Number(process.env.PORT || 8790);
const MCP_PATH = "/mcp";
const PUBLIC_BASE_URL = String(process.env.CHRONO_ARCHIVE_PUBLIC_URL || `http://localhost:${port}`).replace(/\/+$/, "");
const ACCESS_TTL_SECONDS = 60 * 60;
const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30;
const CODE_TTL_SECONDS = 5 * 60;
const CLIENT_TTL_SECONDS = 60 * 60 * 24 * 365;
const usedAuthorizationCodes = new Map();

function cleanToken(value) {
  return String(value || "").trim();
}

function requireEnv(name) {
  const value = cleanToken(process.env[name]);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function safeEqualText(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && timingSafeEqual(left, right);
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function oauthSecret() {
  return requireEnv("CHRONO_ARCHIVE_OAUTH_SECRET");
}

function signPayload(kind, payload, ttlSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const body = base64url(JSON.stringify({
    ...payload,
    kind,
    iat: now,
    exp: now + ttlSeconds,
    jti: randomBytes(16).toString("hex"),
  }));
  const sig = createHmac("sha256", oauthSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyPayload(token, expectedKind) {
  const [body, sig, extra] = String(token || "").split(".");
  if (!body || !sig || extra) throw new Error("Invalid token");
  const expected = createHmac("sha256", oauthSecret()).update(body).digest("base64url");
  if (!safeEqualText(sig, expected)) throw new Error("Invalid token signature");
  let payload;
  try { payload = JSON.parse(fromBase64url(body)); } catch { throw new Error("Invalid token payload"); }
  if (payload.kind !== expectedKind) throw new Error("Invalid token kind");
  if (!Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return payload;
}

function pruneUsedCodes() {
  const now = Date.now();
  for (const [jti, expiresAt] of usedAuthorizationCodes.entries()) {
    if (expiresAt <= now) usedAuthorizationCodes.delete(jti);
  }
}

function markAuthorizationCodeUsed(payload) {
  pruneUsedCodes();
  if (usedAuthorizationCodes.has(payload.jti)) return false;
  usedAuthorizationCodes.set(payload.jti, Number(payload.exp) * 1000);
  return true;
}

function oauthAccessAuthorized(req) {
  const header = cleanToken(req.headers.authorization);
  if (!header.toLowerCase().startsWith("bearer ")) return false;
  const supplied = cleanToken(header.slice(7));
  if (!supplied) return false;

  const emergencyToken = cleanToken(process.env.CHRONO_ARCHIVE_MCP_TOKEN);
  if (emergencyToken && safeEqualText(supplied, emergencyToken)) return true;

  try {
    const payload = verifyPayload(supplied, "access");
    const allowedUserId = requireEnv("CHRONO_ARCHIVE_USER_ID");
    return payload.sub === allowedUserId && String(payload.scope || "").split(/\s+/).includes("archive.read");
  } catch {
    return false;
  }
}

function toolResult(data, summary = "Chrono-Deck archive result") {
  return {
    content: [{ type: "text", text: `${summary}\n${JSON.stringify(data, null, 2)}` }],
    structuredContent: data,
  };
}

function toolFailure(error) {
  const message = error instanceof Error ? error.message : String(error || "Unknown archive error.");
  return {
    isError: true,
    content: [{ type: "text", text: message }],
    structuredContent: { error: message },
  };
}

export function createArchiveServer() {
  const server = new McpServer({ name: "chrono-deck-private-archive", version: "0.2.0" });

  server.registerTool(
    "search_completed_arc_archive",
    {
      title: "Search completed Chrono-Deck ARCs",
      description: "Hybrid semantic + lexical search over the authenticated user's completed/parked Chrono-Deck ARC archive. Use this to retrieve conceptually related past work, mistakes, proof patterns, or exact phrases. Search results are evidence, not authoritative curriculum metadata.",
      inputSchema: z.object({
        query: z.string().min(1).max(2000),
        logicalArcId: z.string().max(120).optional(),
        documentType: z.enum(["raw_dump", "polished_extract", "canonical"]).optional(),
        completedOnly: z.boolean().default(true),
        limit: z.number().int().min(1).max(40).default(12),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const data = await semanticSearchCompleted(args);
        return toolResult(data, `Found ${data.results.length} archive chunks.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "get_arc_archive_bundle",
    {
      title: "Get one Chrono-Deck ARC bundle",
      description: "Return the RAW/POLISHED/canonical document representations registered under one logical_arc_id. Use for exact document identity checks, not semantic inference.",
      inputSchema: z.object({ logicalArcId: z.string().min(1).max(120) }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async ({ logicalArcId }) => {
      try {
        const documents = await loadArcBundle(logicalArcId);
        return toolResult({ logicalArcId, documents }, `Loaded ${documents.length} document representations.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "find_semantically_related_arcs",
    {
      title: "Find semantically related completed ARCs",
      description: "Find completed ARCs whose polished/canonical content is semantically similar to one existing logical ARC. Results are candidate related links only and must not be treated as proof of prerequisite, chronology, mastery, or provenance relationships.",
      inputSchema: z.object({
        logicalArcId: z.string().min(1).max(120),
        limit: z.number().int().min(1).max(25).default(8),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async ({ logicalArcId, limit }) => {
      try {
        const candidates = await semanticRelatedArcs(logicalArcId, limit);
        return toolResult({
          logicalArcId,
          authoritative: false,
          candidates,
          rule: "Similarity may justify a candidate `related` link for review. It does not establish prerequisite, chronology, clearance, provenance, recovery debt, or dependency.",
        }, `Found ${candidates.length} related-ARC candidates.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "suggest_arc_frontmatter_links",
    {
      title: "Suggest safe ARC frontmatter links",
      description: "Search completed Chrono-Deck polished extracts using a new/current ARC's title, summary, topics, skills, and error themes. Returns non-authoritative candidates that an extractor may use for `related` links after verifying they make sense. Never use this tool to invent IDs, module fields, chronology, clearance, provenance, prerequisites, or recovery debt.",
      inputSchema: z.object({
        currentLogicalArcId: z.string().max(120).optional(),
        title: z.string().max(500).optional(),
        summary: z.string().max(3000).optional(),
        topics: z.array(z.string().max(120)).max(40).optional(),
        skills: z.array(z.string().max(120)).max(40).optional(),
        errorThemes: z.array(z.string().max(160)).max(40).optional(),
        limit: z.number().int().min(1).max(20).default(8),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const data = await suggestFrontmatterLinks(args);
        return toolResult(data, `Generated ${data.candidates.length} non-authoritative frontmatter-link candidates.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "get_arc_embedding_status",
    {
      title: "Get Chrono-Deck embedding status",
      description: "Return how many semantic chunks are ready or still pending for the authenticated archive.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async () => {
      try {
        const data = await semanticEmbeddingStatus();
        return toolResult(data, "Semantic archive status loaded.");
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  return server;
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type, mcp-session-id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

function json(res, status, payload, extraHeaders = {}) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", ...extraHeaders });
  res.end(JSON.stringify(payload));
}

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function readBody(req, maxBytes = 64 * 1024) {
  let total = 0;
  const chunks = [];
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) throw new Error("Request body too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function validHttpsRedirect(uri) {
  try {
    const parsed = new URL(uri);
    return parsed.protocol === "https:" || (parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname));
  } catch {
    return false;
  }
}

function decodeClient(clientId) {
  const payload = verifyPayload(clientId, "client");
  if (!Array.isArray(payload.redirect_uris) || !payload.redirect_uris.length) throw new Error("Invalid client");
  return payload;
}

function authorizationServerMetadata() {
  return {
    issuer: PUBLIC_BASE_URL,
    authorization_endpoint: `${PUBLIC_BASE_URL}/oauth/authorize`,
    token_endpoint: `${PUBLIC_BASE_URL}/oauth/token`,
    registration_endpoint: `${PUBLIC_BASE_URL}/oauth/register`,
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    token_endpoint_auth_methods_supported: ["none"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: ["archive.read", "offline_access"],
  };
}

function protectedResourceMetadata() {
  return {
    resource: `${PUBLIC_BASE_URL}${MCP_PATH}`,
    authorization_servers: [PUBLIC_BASE_URL],
    scopes_supported: ["archive.read"],
    bearer_methods_supported: ["header"],
  };
}

async function authenticateArchiveOwner(email, password) {
  const base = requireEnv("CHRONO_SUPABASE_URL").replace(/\/+$/, "");
  const anonKey = requireEnv("CHRONO_SUPABASE_ANON_KEY");
  const allowedUserId = requireEnv("CHRONO_ARCHIVE_USER_ID");
  const response = await fetch(`${base}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anonKey, "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Sign-in failed");
  const data = await response.json();
  if (!data?.user?.id || data.user.id !== allowedUserId) throw new Error("This account is not authorized for the Chrono-Deck archive");
  return data.user;
}

function renderAuthorizationPage(res, params, message = "") {
  const fields = [
    "client_id", "redirect_uri", "response_type", "state", "scope", "code_challenge", "code_challenge_method",
  ].map((name) => `<input type="hidden" name="${name}" value="${htmlEscape(params.get(name) || "")}">`).join("\n");
  const warning = message ? `<p style="color:#b42318">${htmlEscape(message)}</p>` : "";
  const body = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Authorize Chrono-Deck Archive</title><style>body{font-family:system-ui,sans-serif;max-width:560px;margin:64px auto;padding:0 20px;color:#111}form{display:grid;gap:14px}input{font:inherit;padding:10px;border:1px solid #aaa;border-radius:8px}button{font:inherit;padding:11px 14px;border:0;border-radius:8px;background:#111;color:#fff;cursor:pointer}.note{color:#555;font-size:14px;line-height:1.5}</style></head><body><h1>Chrono-Deck Archive</h1><p>ChatGPT is requesting read-only access to your private semantic ARC archive.</p>${warning}<form method="post" action="/oauth/approve">${fields}<label>Supabase email<input required type="email" name="email" autocomplete="email"></label><label>Supabase password<input required type="password" name="password" autocomplete="current-password"></label><button type="submit">Authorize read-only archive access</button></form><p class="note">Your password is used only for this sign-in request and is not stored by the Chrono-Deck connector. The issued app token can only access this read-only archive MCP.</p></body></html>`;
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(body);
}

function validateAuthorizationParams(params) {
  if (params.get("response_type") !== "code") throw new Error("response_type must be code");
  if (params.get("code_challenge_method") !== "S256" || !params.get("code_challenge")) throw new Error("PKCE S256 is required");
  const client = decodeClient(params.get("client_id"));
  const redirectUri = params.get("redirect_uri") || "";
  if (!client.redirect_uris.includes(redirectUri)) throw new Error("redirect_uri is not registered for this client");
  return client;
}

function redirectOAuthError(res, redirectUri, state, error, description) {
  const target = new URL(redirectUri);
  target.searchParams.set("error", error);
  target.searchParams.set("error_description", description);
  if (state) target.searchParams.set("state", state);
  res.writeHead(302, { location: target.toString(), "cache-control": "no-store" }).end();
}

function issueOAuthTokens({ sub, clientId, scope }) {
  const grantedScope = String(scope || "archive.read offline_access").split(/\s+/).filter((item) => ["archive.read", "offline_access"].includes(item));
  if (!grantedScope.includes("archive.read")) grantedScope.unshift("archive.read");
  const scopeText = [...new Set(grantedScope)].join(" ");
  const accessToken = signPayload("access", { sub, client_id: clientId, scope: scopeText }, ACCESS_TTL_SECONDS);
  const refreshToken = signPayload("refresh", { sub, client_id: clientId, scope: scopeText }, REFRESH_TTL_SECONDS);
  return { access_token: accessToken, token_type: "Bearer", expires_in: ACCESS_TTL_SECONDS, refresh_token: refreshToken, scope: scopeText };
}

export const httpServer = createHttpServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  applyCors(res);

  try {
    if (req.method === "OPTIONS") {
      res.writeHead(204).end();
      return;
    }

    if (req.method === "GET" && (url.pathname === "/.well-known/oauth-authorization-server" || url.pathname === "/.well-known/openid-configuration")) {
      json(res, 200, authorizationServerMetadata(), { "cache-control": "public, max-age=300" });
      return;
    }

    if (req.method === "GET" && (url.pathname === "/.well-known/oauth-protected-resource" || url.pathname === "/.well-known/oauth-protected-resource/mcp")) {
      json(res, 200, protectedResourceMetadata(), { "cache-control": "public, max-age=300" });
      return;
    }

    if (req.method === "POST" && url.pathname === "/oauth/register") {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const redirectUris = Array.isArray(body.redirect_uris) ? [...new Set(body.redirect_uris.map(String))] : [];
      if (!redirectUris.length || redirectUris.length > 10 || redirectUris.some((item) => !validHttpsRedirect(item))) {
        json(res, 400, { error: "invalid_redirect_uri" });
        return;
      }
      const clientName = String(body.client_name || body.client_name_uri || "ChatGPT").slice(0, 120);
      const clientId = signPayload("client", { redirect_uris: redirectUris, client_name: clientName }, CLIENT_TTL_SECONDS);
      json(res, 201, {
        client_id: clientId,
        client_id_issued_at: Math.floor(Date.now() / 1000),
        client_name: clientName,
        redirect_uris: redirectUris,
        token_endpoint_auth_method: "none",
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
      }, { "cache-control": "no-store" });
      return;
    }

    if (req.method === "GET" && url.pathname === "/oauth/authorize") {
      try {
        validateAuthorizationParams(url.searchParams);
        renderAuthorizationPage(res, url.searchParams);
      } catch (error) {
        json(res, 400, { error: "invalid_request", error_description: error instanceof Error ? error.message : "Invalid authorization request" });
      }
      return;
    }

    if (req.method === "POST" && url.pathname === "/oauth/approve") {
      const raw = await readBody(req);
      const params = new URLSearchParams(raw);
      let client;
      try {
        client = validateAuthorizationParams(params);
      } catch (error) {
        json(res, 400, { error: "invalid_request", error_description: error instanceof Error ? error.message : "Invalid authorization request" });
        return;
      }
      const redirectUri = params.get("redirect_uri") || "";
      const state = params.get("state") || "";
      try {
        const user = await authenticateArchiveOwner(params.get("email") || "", params.get("password") || "");
        const code = signPayload("code", {
          sub: user.id,
          client_id: params.get("client_id"),
          redirect_uri: redirectUri,
          code_challenge: params.get("code_challenge"),
          scope: params.get("scope") || "archive.read offline_access",
          client_name: client.client_name || "ChatGPT",
        }, CODE_TTL_SECONDS);
        const target = new URL(redirectUri);
        target.searchParams.set("code", code);
        if (state) target.searchParams.set("state", state);
        res.writeHead(302, { location: target.toString(), "cache-control": "no-store" }).end();
      } catch {
        renderAuthorizationPage(res, params, "Sign-in failed or this Supabase account is not authorized.");
      }
      return;
    }

    if (req.method === "POST" && url.pathname === "/oauth/token") {
      const raw = await readBody(req);
      const params = new URLSearchParams(raw);
      const grantType = params.get("grant_type") || "";
      const allowedUserId = requireEnv("CHRONO_ARCHIVE_USER_ID");

      if (grantType === "authorization_code") {
        try {
          const code = verifyPayload(params.get("code"), "code");
          if (!markAuthorizationCodeUsed(code)) throw new Error("Authorization code already used");
          if (code.sub !== allowedUserId) throw new Error("Unauthorized archive user");
          if (params.get("client_id") !== code.client_id || params.get("redirect_uri") !== code.redirect_uri) throw new Error("OAuth client mismatch");
          const verifier = params.get("code_verifier") || "";
          const challenge = createHash("sha256").update(verifier).digest("base64url");
          if (!safeEqualText(challenge, code.code_challenge)) throw new Error("PKCE verification failed");
          json(res, 200, issueOAuthTokens({ sub: code.sub, clientId: code.client_id, scope: code.scope }), { "cache-control": "no-store" });
        } catch (error) {
          json(res, 400, { error: "invalid_grant", error_description: error instanceof Error ? error.message : "Invalid authorization code" }, { "cache-control": "no-store" });
        }
        return;
      }

      if (grantType === "refresh_token") {
        try {
          const refresh = verifyPayload(params.get("refresh_token"), "refresh");
          if (refresh.sub !== allowedUserId) throw new Error("Unauthorized archive user");
          if (params.get("client_id") && params.get("client_id") !== refresh.client_id) throw new Error("OAuth client mismatch");
          json(res, 200, issueOAuthTokens({ sub: refresh.sub, clientId: refresh.client_id, scope: refresh.scope }), { "cache-control": "no-store" });
        } catch (error) {
          json(res, 400, { error: "invalid_grant", error_description: error instanceof Error ? error.message : "Invalid refresh token" }, { "cache-control": "no-store" });
        }
        return;
      }

      json(res, 400, { error: "unsupported_grant_type" }, { "cache-control": "no-store" });
      return;
    }

    if (req.method === "GET" && url.pathname === "/health") {
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("ok");
      return;
    }

    if (req.method === "GET" && url.pathname === "/") {
      json(res, 200, {
        name: "Chrono-Deck Private Semantic Archive",
        version: "0.2.0",
        mcp: MCP_PATH,
        authentication: "OAuth 2.1 with PKCE (read-only archive access)",
      });
      return;
    }

    if (url.pathname === MCP_PATH && new Set(["POST", "GET", "DELETE"]).has(req.method || "")) {
      if (!oauthAccessAuthorized(req)) {
        json(res, 401, { error: "Unauthorized" }, {
          "www-authenticate": `Bearer resource_metadata="${PUBLIC_BASE_URL}/.well-known/oauth-protected-resource"`,
        });
        return;
      }

      const server = createArchiveServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
      res.on("close", () => {
        transport.close().catch(() => undefined);
        server.close().catch(() => undefined);
      });
      try {
        await server.connect(transport);
        await transport.handleRequest(req, res);
      } catch (error) {
        console.error("Chrono-Deck archive MCP request failed", error);
        if (!res.headersSent) res.writeHead(500).end("Internal server error");
      }
      return;
    }

    res.writeHead(404).end("Not Found");
  } catch (error) {
    console.error("Chrono-Deck archive HTTP error", error instanceof Error ? error.message : error);
    if (!res.headersSent) json(res, 500, { error: "Internal server error" });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  httpServer.listen(port, () => {
    console.log(`Chrono-Deck private archive MCP listening on ${PUBLIC_BASE_URL}${MCP_PATH}`);
  });
}
