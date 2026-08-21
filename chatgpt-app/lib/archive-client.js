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
    archiveToken: requireEnv("CHRONO_SUPABASE_ARCHIVE_TOKEN"),
  };
}

async function archiveRequest(body) {
  const cfg = config();
  return requestJson(`${cfg.base}/functions/v1/arc-archive-access`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-chrono-archive-secret": cfg.archiveToken,
    },
    body: JSON.stringify(body || {}),
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
  const payload = await archiveRequest({
    mode: "search",
    query: cleanQuery,
    logicalArcId: logicalArcId || null,
    documentType: documentType || null,
    completedOnly: Boolean(completedOnly),
    limit: boundedLimit(limit, 12, 40),
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
  const payload = await archiveRequest({ mode: "bundle", logicalArcId: id });
  return Array.isArray(payload?.documents) ? payload.documents : [];
}

export async function semanticRelatedArcs(logicalArcId, limit = 8) {
  const id = String(logicalArcId || "").trim();
  if (!id) throw new Error("logicalArcId is required.");
  const payload = await archiveRequest({
    mode: "related",
    logicalArcId: id,
    limit: boundedLimit(limit, 8, 25),
  });
  return Array.isArray(payload?.suggestions) ? payload.suggestions : [];
}

export async function semanticEmbeddingStatus() {
  return archiveRequest({ mode: "status" });
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
  // Kept for test compatibility; token-based access has no user-session cache.
}
