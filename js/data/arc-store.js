const DB_NAME = "chrono-deck";
const DB_VERSION = 1;
const DOC_STORE = "arc_documents";
const REV_STORE = "arc_revisions";

export const ARC_SCHEMA_VERSION = 1;
export const ARC_STATUSES = ["raw", "editing", "polished"];
export const ARC_VISIBILITIES = ["private", "public"];
export const SECTION_TYPES = [
  "narrative",
  "investigation",
  "proof",
  "definition",
  "conclusion",
  "reflection",
  "dialogue",
  "media",
  "notes",
];

function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clone(value) {
  return globalThis.structuredClone
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function isoNow() {
  return new Date().toISOString();
}

function normalizeSection(section, position) {
  return {
    id: String(section?.id || uid()),
    type: SECTION_TYPES.includes(section?.type) ? section.type : "notes",
    heading: String(section?.heading || "Untitled section"),
    contentMarkdown: String(section?.contentMarkdown || ""),
    visibility: ARC_VISIBILITIES.includes(section?.visibility)
      ? section.visibility
      : "private",
    position,
  };
}

export function seedArcDocument(node) {
  if (!node?.id) throw new Error("Cannot seed an ARC document without a stable node ID.");
  const now = isoNow();
  return {
    schemaVersion: ARC_SCHEMA_VERSION,
    arcId: node.id,
    canonicalLabel: String(node.arc || node.id),
    title: String(node.title || node.arc || node.id),
    status: "raw",
    visibility: "private",
    shortConclusion: "",
    experience: "",
    sections: [
      normalizeSection(
        {
          type: "notes",
          heading: "Working notes",
          contentMarkdown: "",
          visibility: "private",
        },
        0,
      ),
    ],
    revision: 0,
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeArcDocument(input) {
  if (!input?.arcId) throw new Error("ARC document is missing arcId.");
  const now = isoNow();
  const sections = Array.isArray(input.sections) ? input.sections : [];
  return {
    schemaVersion: ARC_SCHEMA_VERSION,
    arcId: String(input.arcId),
    canonicalLabel: String(input.canonicalLabel || input.arcId),
    title: String(input.title || input.canonicalLabel || input.arcId),
    status: ARC_STATUSES.includes(input.status) ? input.status : "raw",
    visibility: ARC_VISIBILITIES.includes(input.visibility)
      ? input.visibility
      : "private",
    shortConclusion: String(input.shortConclusion || ""),
    experience: String(input.experience || ""),
    sections: sections.map(normalizeSection),
    revision: Number.isInteger(input.revision) && input.revision >= 0 ? input.revision : 0,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
  };
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB request failed."));
  });
}

function transactionDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("IndexedDB transaction failed."));
    tx.onabort = () => reject(tx.error || new Error("IndexedDB transaction aborted."));
  });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DOC_STORE)) {
        db.createObjectStore(DOC_STORE, { keyPath: "arcId" });
      }
      if (!db.objectStoreNames.contains(REV_STORE)) {
        const revisions = db.createObjectStore(REV_STORE, { keyPath: "revisionId" });
        revisions.createIndex("byArcId", "arcId", { unique: false });
        revisions.createIndex("byArcAndRevision", ["arcId", "revision"], { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open Chrono-Deck IndexedDB."));
  });
}

/**
 * Local-first ARC repository.
 *
 * The Vault UI depends only on these methods, so a future Supabase repository can
 * implement the same interface without changing the editor:
 * load, save, listDocuments, listRevisions, restoreRevision, importDocument.
 */
export class IndexedDbArcRepository {
  constructor() {
    this.dbPromise = openDatabase();
  }

  async load(arcId) {
    const db = await this.dbPromise;
    const tx = db.transaction(DOC_STORE, "readonly");
    const value = await requestResult(tx.objectStore(DOC_STORE).get(String(arcId)));
    await transactionDone(tx);
    return value ? normalizeArcDocument(value) : null;
  }

  async listDocuments() {
    const db = await this.dbPromise;
    const tx = db.transaction(DOC_STORE, "readonly");
    const values = await requestResult(tx.objectStore(DOC_STORE).getAll());
    await transactionDone(tx);
    return values.map(normalizeArcDocument);
  }

  /** Cache a cloud-sourced document locally without creating a second local revision. */
  async cacheDocument(input) {
    const db = await this.dbPromise;
    const normalized = normalizeArcDocument(input);
    const tx = db.transaction(DOC_STORE, "readwrite");
    tx.objectStore(DOC_STORE).put(normalized);
    await transactionDone(tx);
    return clone(normalized);
  }

  async save(input, note = "Saved") {
    const db = await this.dbPromise;
    const current = await this.load(input.arcId);
    const normalized = normalizeArcDocument(input);
    const saved = {
      ...normalized,
      revision: (current?.revision || 0) + 1,
      createdAt: current?.createdAt || normalized.createdAt || isoNow(),
      updatedAt: isoNow(),
    };
    const revision = {
      revisionId: uid(),
      arcId: saved.arcId,
      revision: saved.revision,
      note: String(note || "Saved"),
      createdAt: saved.updatedAt,
      snapshot: clone(saved),
    };

    const tx = db.transaction([DOC_STORE, REV_STORE], "readwrite");
    tx.objectStore(DOC_STORE).put(saved);
    tx.objectStore(REV_STORE).put(revision);
    await transactionDone(tx);
    return clone(saved);
  }

  async listRevisions(arcId) {
    const db = await this.dbPromise;
    const tx = db.transaction(REV_STORE, "readonly");
    const index = tx.objectStore(REV_STORE).index("byArcId");
    const rows = await requestResult(index.getAll(IDBKeyRange.only(String(arcId))));
    await transactionDone(tx);
    return rows.sort((a, b) => b.revision - a.revision || b.createdAt.localeCompare(a.createdAt));
  }

  async restoreRevision(arcId, revisionId) {
    const db = await this.dbPromise;
    const tx = db.transaction(REV_STORE, "readonly");
    const row = await requestResult(tx.objectStore(REV_STORE).get(String(revisionId)));
    await transactionDone(tx);
    if (!row || row.arcId !== String(arcId)) throw new Error("Revision not found for this ARC.");
    const snapshot = normalizeArcDocument(row.snapshot);
    return this.save(snapshot, `Restored revision ${row.revision}`);
  }

  async importDocument(input, note = "Imported JSON") {
    const normalized = normalizeArcDocument(input);
    return this.save(normalized, note);
  }
}
