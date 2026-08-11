import { normalizeArcDocument } from "./arc-store.js";

const SYNCCFGKEY = "chrono_mastery_sync_config_v1";
const SYNCSESSIONKEY = "chrono_mastery_sync_session_v1";

export class CloudUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "CloudUnavailableError";
  }
}

export class CloudSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = "CloudSchemaError";
  }
}

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function cleanBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function currentContext() {
  const config = readJson(SYNCCFGKEY) || {};
  const session = readJson(SYNCSESSIONKEY) || {};
  return {
    url: cleanBase(config.url),
    key: String(config.key || "").trim(),
    accessToken: String(session.access_token || "").trim(),
    userId: String(session?.user?.id || "").trim(),
    email: String(session?.user?.email || config.email || "").trim(),
    expiresAt: Number(session.expires_at || 0),
  };
}

function cloudState() {
  const context = currentContext();
  const configured = Boolean(context.url && context.key);
  const signedIn = Boolean(configured && context.accessToken && context.userId);
  return { ...context, configured, signedIn };
}

async function parseResponse(response) {
  const raw = await response.text();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function messageFromPayload(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === "string") return payload;
  return payload.message || payload.hint || payload.details || payload.error_description || fallback;
}

function isMissingVaultSchema(response, payload) {
  const code = typeof payload === "object" ? payload?.code : "";
  return response.status === 404 || code === "PGRST202" || code === "42883" || code === "42P01";
}

function requestHeaders(context) {
  return {
    apikey: context.key,
    Authorization: `Bearer ${context.accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export async function loadArcVaultSetupSql() {
  const response = await fetch("./supabase/arc-vault.sql", { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load ARC Vault SQL (${response.status}).`);
  return response.text();
}

export class SupabaseArcRepository {
  getState() {
    return cloudState();
  }

  isConfigured() {
    return cloudState().configured;
  }

  isSignedIn() {
    return cloudState().signedIn;
  }

  requireContext() {
    const context = cloudState();
    if (!context.configured) {
      throw new CloudUnavailableError("Supabase is not configured on this device.");
    }
    if (!context.signedIn) {
      throw new CloudUnavailableError("Sign in through Cross-device cloud sync before using the cloud Vault.");
    }
    if (context.expiresAt && context.expiresAt * 1000 <= Date.now()) {
      throw new CloudUnavailableError(
        "The Supabase session is expired. Use the cloud sync panel to refresh/sign in, then try again.",
      );
    }
    return context;
  }

  async rpc(name, body) {
    const context = this.requireContext();
    const response = await fetch(`${context.url}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: requestHeaders(context),
      body: JSON.stringify(body || {}),
    });
    const payload = await parseResponse(response);
    if (!response.ok) {
      if (isMissingVaultSchema(response, payload)) {
        throw new CloudSchemaError(
          "ARC cloud tables/functions are not installed yet. Run the ARC Vault SQL once in Supabase.",
        );
      }
      if (response.status === 401 || response.status === 403) {
        throw new CloudUnavailableError(
          messageFromPayload(payload, "Cloud authorization failed. Sign in again."),
        );
      }
      throw new Error(messageFromPayload(payload, `Supabase RPC error ${response.status}`));
    }
    return payload;
  }

  async load(arcId) {
    const value = await this.rpc("chrono_load_arc_document", { p_arc_id: String(arcId) });
    return value ? normalizeArcDocument(value) : null;
  }

  async listDocuments() {
    const context = this.requireContext();
    const url = new URL(`${context.url}/rest/v1/arc_documents`);
    url.searchParams.set("user_id", `eq.${context.userId}`);
    url.searchParams.set(
      "select",
      "arc_id,schema_version,canonical_label,title,status,visibility,short_conclusion,experience,revision,created_at,updated_at",
    );
    url.searchParams.set("order", "updated_at.desc");
    const response = await fetch(url, { headers: requestHeaders(context) });
    const payload = await parseResponse(response);
    if (!response.ok) {
      if (isMissingVaultSchema(response, payload)) {
        throw new CloudSchemaError("ARC cloud tables are not installed yet. Run the ARC Vault SQL once.");
      }
      throw new Error(messageFromPayload(payload, `Cloud list error ${response.status}`));
    }
    return (Array.isArray(payload) ? payload : []).map((row) =>
      normalizeArcDocument({
        schemaVersion: row.schema_version,
        arcId: row.arc_id,
        canonicalLabel: row.canonical_label,
        title: row.title,
        status: row.status,
        visibility: row.visibility,
        shortConclusion: row.short_conclusion,
        experience: row.experience,
        sections: [],
        revision: row.revision,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }),
    );
  }

  async save(input, note = "Saved") {
    const value = await this.rpc("chrono_save_arc_document", {
      p_document: normalizeArcDocument(input),
      p_note: String(note || "Saved"),
    });
    return normalizeArcDocument(value);
  }

  async listRevisions(arcId) {
    const context = this.requireContext();
    const url = new URL(`${context.url}/rest/v1/arc_revisions`);
    url.searchParams.set("user_id", `eq.${context.userId}`);
    url.searchParams.set("arc_id", `eq.${String(arcId)}`);
    url.searchParams.set("select", "revision_id,arc_id,revision,note,created_at");
    url.searchParams.set("order", "revision.desc,created_at.desc");
    const response = await fetch(url, { headers: requestHeaders(context) });
    const payload = await parseResponse(response);
    if (!response.ok) {
      if (isMissingVaultSchema(response, payload)) {
        throw new CloudSchemaError("ARC cloud tables are not installed yet. Run the ARC Vault SQL once.");
      }
      throw new Error(messageFromPayload(payload, `Cloud revision read error ${response.status}`));
    }
    return (Array.isArray(payload) ? payload : []).map((row) => ({
      revisionId: row.revision_id,
      arcId: row.arc_id,
      revision: row.revision,
      note: row.note,
      createdAt: row.created_at,
    }));
  }

  async restoreRevision(arcId, revisionId) {
    const value = await this.rpc("chrono_restore_arc_revision", {
      p_arc_id: String(arcId),
      p_revision_id: String(revisionId),
    });
    return normalizeArcDocument(value);
  }

  async importDocument(input, note = "Imported") {
    return this.save(input, note);
  }
}
