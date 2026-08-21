const DEFAULT_TIMEOUT_MS = 20000;

function cleanBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function requireEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function boundedLimit(value, fallback = 12, max = 40) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(Math.trunc(parsed), max));
}

let authCache = null;

async function requestJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let payload = null;
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    if (!response.ok) {
      const detail = payload?.message || payload?.msg || payload?.error || payload?.hint || text || `HTTP ${response.status}`;
      throw new Error(`Supabase request failed (${response.status}): ${detail}`);
    }
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

function config() {
  return {
    base: cleanBase(requireEnv("CHRONO_SUPABASE_URL")),
    anonKey: requireEnv("CHRONO_SUPABASE_ANON_KEY"),
    email: requireEnv("CHRONO_SUPABASE_EMAIL"),
    password: requireEnv("CHRONO_SUPABASE_PASSWORD"),
  };
}

async function passwordLogin(cfg) {
  const payload = await requestJson(`${cfg.base}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: cfg.anonKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email: cfg.email, password: cfg.password }),
  });
  if (!payload?.access_token || !payload?.refresh_token) throw new Error("Supabase login did not return a usable session.");
  authCache = {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Number(payload.expires_at || Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600)),
    userId: payload.user?.id || null,
  };
  return authCache;
}

async function refreshLogin(cfg) {
  if (!authCache?.refreshToken) return passwordLogin(cfg);
  try {
    const payload = await requestJson(`${cfg.base}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: {
        apikey: cfg.anonKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({ refresh_token: authCache.refreshToken }),
    });
    authCache = {
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      expiresAt: Number(payload.expires_at || Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600)),
      userId: payload.user?.id || authCache.userId || null,
    };
    return authCache;
  } catch {
    authCache = null;
    return passwordLogin(cfg);
  }
}

async function ensureSession() {
  const cfg = config();
  const now = Math.floor(Date.now() / 1000);
  if (!authCache) return { cfg, session: await passwordLogin(cfg) };
  if (authCache.expiresAt > now + 90) return { cfg, session: authCache };
  return { cfg, session: await refreshLogin(cfg) };
}

async function authedRequest(path, { method = "POST", body = null } = {}) {
  const { cfg, session } = await ensureSession();
  return requestJson(`${cfg.base}${path}`, {
    method,
    headers: {
      apikey: cfg.anonKey,
      Authorization: `Bearer ${session.accessToken}`,
      "content-type": "application/json",
    },
    body: body === null ? undefined : JSON.stringify(body),
  });
}

export async function semanticSearchCompleted({
  query,
  logicalArcId = null,
  documentType = null,
  completedOnly = true,
  limit = 12,
}) {
  const cleanQuery = String(query || "").trim();
  if (!cleanQuery) throw new Error("Search query is required.");
  const payload = await authedRequest("/functions/v1/arc-semantic-search", {
    body: {
      query: cleanQuery,
      logicalArcId: logicalArcId || null,
      documentType: documentType || null,
      completedOnly: Boolean(completedOnly),
      limit: boundedLimit(limit, 12, 40),
    },
  });
  return {
    query: cleanQuery,
    completedOnly: Boolean(completedOnly),
    results: Array.isArray(payload?.results) ? payload.results : [],
    model: payload?.model || "gte-small",
  };
}

export async function loadArcBundle(logicalArcId) {
  const id = String(logicalArcId || "").trim();
  if (!id) throw new Error("logicalArcId is required.");
  const payload = await authedRequest("/rest/v1/rpc/chrono_load_arc_bundle", {
    body: { p_logical_arc_id: id },
  });
  return Array.isArray(payload) ? payload : [];
}

export async function semanticRelatedArcs(logicalArcId, limit = 8) {
  const id = String(logicalArcId || "").trim();
  if (!id) throw new Error("logicalArcId is required.");
  const payload = await authedRequest("/rest/v1/rpc/chrono_semantic_related_arcs", {
    body: { p_logical_arc_id: id, p_limit: boundedLimit(limit, 8, 25) },
  });
  return Array.isArray(payload) ? payload : [];
}

export async function semanticEmbeddingStatus() {
  return authedRequest("/rest/v1/rpc/chrono_semantic_embedding_status", { body: {} });
}

export async function suggestFrontmatterLinks({
  currentLogicalArcId = null,
  title = "",
  summary = "",
  topics = [],
  skills = [],
  errorThemes = [],
  limit = 8,
}) {
  const terms = [
    title,
    summary,
    Array.isArray(topics) ? topics.join(" ") : "",
    Array.isArray(skills) ? skills.join(" ") : "",
    Array.isArray(errorThemes) ? errorThemes.join(" ") : "",
  ].map((value) => String(value || "").trim()).filter(Boolean);

  if (!terms.length) throw new Error("Provide at least a title, summary, topic, skill, or error theme for enrichment.");

  const search = await semanticSearchCompleted({
    query: terms.join(" — "),
    documentType: "polished_extract",
    completedOnly: true,
    limit: Math.max(16, boundedLimit(limit, 8, 20) * 4),
  });

  const wanted = boundedLimit(limit, 8, 20);
  const grouped = new Map();
  for (const row of search.results) {
    const logicalArcId = String(row?.logical_arc_id || row?.logicalArcId || "").trim();
    if (!logicalArcId || logicalArcId === currentLogicalArcId) continue;
    const score = Number(row?.hybrid_score ?? row?.hybridScore ?? row?.semantic_score ?? row?.semanticScore ?? 0);
    const current = grouped.get(logicalArcId);
    if (!current || score > current.score) {
      grouped.set(logicalArcId, {
        logicalArcId,
        title: String(row?.title || logicalArcId),
        score,
        sectionHeading: String(row?.section_heading || row?.sectionHeading || ""),
        evidence: String(row?.content || "").slice(0, 700),
      });
    }
  }

  return {
    source: "semantic_archive_suggestion",
    authoritative: false,
    currentLogicalArcId: currentLogicalArcId || null,
    candidates: [...grouped.values()]
      .sort((a, b) => b.score - a.score || a.logicalArcId.localeCompare(b.logicalArcId))
      .slice(0, wanted),
    rule: "Use these only as candidate related/deepens links. Never infer arc_id, module identity, chronology, clearance, provenance, prerequisites, or recovery debt from semantic similarity alone.",
  };
}

export function resetArchiveAuthCacheForTests() {
  authCache = null;
}
