import { createHash } from "node:crypto";

const DEFAULT_REPO = "Karuma-jojo/Chronological-Deck";
const DEFAULT_BRANCH = "t22-archive";
const DEFAULT_PREFIX = "archive";

export const archiveConfig = {
  repo: process.env.CHRONO_ARCHIVE_REPO || DEFAULT_REPO,
  branch: process.env.CHRONO_ARCHIVE_BRANCH || DEFAULT_BRANCH,
  prefix: (process.env.CHRONO_ARCHIVE_PREFIX || DEFAULT_PREFIX).replace(/^\/+|\/+$/g, ""),
};

function splitRepo() {
  const [owner, repo] = archiveConfig.repo.split("/");
  if (!owner || !repo) throw new Error("CHRONO_ARCHIVE_REPO must be in owner/repo form.");
  return { owner, repo };
}

function apiHeaders(requireAuth = false) {
  const token = String(process.env.CHRONO_GITHUB_TOKEN || "").trim();
  if (requireAuth && !token) {
    throw new Error(
      "Archive writes are not configured. Add a fine-grained GitHub token with Contents: Read and write as CHRONO_GITHUB_TOKEN on Render.",
    );
  }
  return {
    accept: "application/vnd.github+json",
    "content-type": "application/json",
    "user-agent": "chrono-deck-t22-archive",
    "x-github-api-version": "2022-11-28",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

async function github(path, { method = "GET", body, requireAuth = false, allow404 = false } = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: apiHeaders(requireAuth),
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (allow404 && response.status === 404) return null;
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }
  if (!response.ok) {
    const detail = typeof data === "object" && data?.message ? data.message : String(data || response.statusText);
    throw new Error(`GitHub archive request failed (${response.status}): ${detail}`);
  }
  return data;
}

function apiPath(suffix) {
  const { owner, repo } = splitRepo();
  return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${suffix}`;
}

export function normalizeMarkdown(value, label) {
  const clean = String(value || "").replace(/\r\n/g, "\n").trim();
  if (clean.length < 40) throw new Error(`${label} is too short to archive.`);
  return `${clean}\n`;
}

export function sha256Utf8(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function bytesUtf8(value) {
  return Buffer.byteLength(value, "utf8");
}

function archivePath(...parts) {
  return [archiveConfig.prefix, ...parts]
    .filter(Boolean)
    .map((part) => String(part).replace(/^\/+|\/+$/g, ""))
    .join("/");
}

export function arcArchivePaths(arcId) {
  const base = archivePath("arcs", arcId);
  return {
    base,
    raw: `${base}/raw.md`,
    polished: `${base}/polished.md`,
    manifest: `${base}/manifest.json`,
  };
}

export function publicArchiveUrls(arcId) {
  const { owner, repo } = splitRepo();
  const paths = arcArchivePaths(arcId);
  const branch = encodeURIComponent(archiveConfig.branch);
  const browseBase = `https://github.com/${owner}/${repo}/blob/${branch}`;
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  return {
    folder: `https://github.com/${owner}/${repo}/tree/${branch}/${paths.base}`,
    rawMarkdown: `${rawBase}/${paths.raw}`,
    polishedMarkdown: `${rawBase}/${paths.polished}`,
    manifest: `${rawBase}/${paths.manifest}`,
    browseRaw: `${browseBase}/${paths.raw}`,
    browsePolished: `${browseBase}/${paths.polished}`,
  };
}

async function readText(path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const data = await github(
    apiPath(`/contents/${encodedPath}?ref=${encodeURIComponent(archiveConfig.branch)}`),
    { allow404: true },
  );
  if (!data) return null;
  if (data.type !== "file" || !data.content) throw new Error(`Archive path is not a readable file: ${path}`);
  return Buffer.from(String(data.content).replace(/\n/g, ""), "base64").toString("utf8");
}

export async function readProgress() {
  const path = archivePath("progress.json");
  const text = await readText(path);
  if (!text) {
    return {
      schemaVersion: 1,
      terminal: "T22",
      catalogAtomicCount: 596,
      defaultState: "not_started",
      updatedAt: null,
      arcs: {},
    };
  }
  const parsed = JSON.parse(text);
  parsed.arcs ||= {};
  return parsed;
}

async function createBlob(content) {
  return github(apiPath("/git/blobs"), {
    method: "POST",
    requireAuth: true,
    body: { content, encoding: "utf-8" },
  });
}

export async function commitFiles(files, message) {
  const refName = `heads/${archiveConfig.branch}`;
  const ref = await github(apiPath(`/git/ref/${refName}`), { requireAuth: true });
  const parentSha = ref.object.sha;
  const parentCommit = await github(apiPath(`/git/commits/${parentSha}`), { requireAuth: true });

  const entries = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const blob = await createBlob(content);
      return { path, mode: "100644", type: "blob", sha: blob.sha };
    }),
  );

  const tree = await github(apiPath("/git/trees"), {
    method: "POST",
    requireAuth: true,
    body: { base_tree: parentCommit.tree.sha, tree: entries },
  });
  const commit = await github(apiPath("/git/commits"), {
    method: "POST",
    requireAuth: true,
    body: { message, tree: tree.sha, parents: [parentSha] },
  });
  await github(apiPath(`/git/refs/${refName}`), {
    method: "PATCH",
    requireAuth: true,
    body: { sha: commit.sha, force: false },
  });
  return commit.sha;
}

function progressText(progress) {
  return `${JSON.stringify(progress, null, 2)}\n`;
}

export async function setProgress({ arcId, state, note }) {
  const progress = await readProgress();
  const now = new Date().toISOString();
  const existing = progress.arcs[arcId] || {};
  progress.arcs[arcId] = {
    ...existing,
    state,
    updatedAt: now,
    ...(note === undefined ? {} : { note: String(note).trim().slice(0, 1000) }),
  };
  progress.updatedAt = now;
  const commitSha = await commitFiles(
    { [archivePath("progress.json")]: progressText(progress) },
    `T22 progress: ${arcId} -> ${state}`,
  );
  return { progress, entry: progress.arcs[arcId], commitSha };
}

export async function archiveExtractPair({ arcId, title, rawMarkdown, polishedMarkdown, progressState }) {
  const raw = normalizeMarkdown(rawMarkdown, "Raw extract");
  const polished = normalizeMarkdown(polishedMarkdown, "Polished extract");
  const now = new Date().toISOString();
  const paths = arcArchivePaths(arcId);
  const progress = await readProgress();

  if (progressState) {
    const existing = progress.arcs[arcId] || {};
    progress.arcs[arcId] = { ...existing, state: progressState, updatedAt: now };
    progress.updatedAt = now;
  }

  const manifest = {
    schemaVersion: 1,
    terminal: "T22",
    arcId,
    title: String(title || arcId),
    archivedAt: now,
    files: {
      raw: { path: paths.raw, sha256: sha256Utf8(raw), bytes: bytesUtf8(raw) },
      polished: { path: paths.polished, sha256: sha256Utf8(polished), bytes: bytesUtf8(polished) },
    },
    progressState: progress.arcs[arcId]?.state || progress.defaultState || "not_started",
  };

  const files = {
    [paths.raw]: raw,
    [paths.polished]: polished,
    [paths.manifest]: `${JSON.stringify(manifest, null, 2)}\n`,
    ...(progressState ? { [archivePath("progress.json")]: progressText(progress) } : {}),
  };
  const commitSha = await commitFiles(files, `Archive ${arcId} extract pair`);
  return { manifest, commitSha, urls: publicArchiveUrls(arcId), progress: progress.arcs[arcId] || null };
}

export async function readArchiveEntry(arcId) {
  const paths = arcArchivePaths(arcId);
  const [raw, polished, manifestText, progress] = await Promise.all([
    readText(paths.raw),
    readText(paths.polished),
    readText(paths.manifest),
    readProgress(),
  ]);
  if (!raw || !polished || !manifestText) return null;
  return {
    arcId,
    rawMarkdown: raw,
    polishedMarkdown: polished,
    manifest: JSON.parse(manifestText),
    progress: progress.arcs[arcId] || { state: progress.defaultState || "not_started" },
    urls: publicArchiveUrls(arcId),
  };
}

export async function verifyArchiveEntry(arcId) {
  const entry = await readArchiveEntry(arcId);
  if (!entry) return null;
  const expected = entry.manifest.files || {};
  const actual = {
    raw: sha256Utf8(entry.rawMarkdown),
    polished: sha256Utf8(entry.polishedMarkdown),
  };
  return {
    arcId,
    ok: actual.raw === expected.raw?.sha256 && actual.polished === expected.polished?.sha256,
    expected: { raw: expected.raw?.sha256 || null, polished: expected.polished?.sha256 || null },
    actual,
    urls: entry.urls,
  };
}
