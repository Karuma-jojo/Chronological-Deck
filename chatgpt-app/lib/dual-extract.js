import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { normalizeResumeCode, sessionStorePaths } from "./session-store.js";

function safeSlug(value) {
  return String(value || "chrono-deck")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 80) || "chrono-deck";
}

function ensureMarkdown(value, label) {
  const clean = String(value || "").trim();
  if (clean.length < 40) throw new Error(`${label} is too short to be a valid extraction.`);
  return `${clean}\n`;
}

export async function writeDualExtract({ session, rawMarkdown, polishedMarkdown, publicBaseUrl }) {
  const resumeCode = normalizeResumeCode(session.resumeCode);
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
  const base = `${safeSlug(session.arc.id)}-${stamp.toLowerCase()}`;
  const exportDirectory = path.join(sessionStorePaths.DATA_DIR, "exports", resumeCode, stamp);
  await mkdir(exportDirectory, { recursive: true });

  const files = [
    {
      kind: "raw",
      filename: `${base}-raw-dump.md`,
      markdown: ensureMarkdown(rawMarkdown, "Raw dump"),
    },
    {
      kind: "polished",
      filename: `${base}-polished-extract.md`,
      markdown: ensureMarkdown(polishedMarkdown, "Polished extract"),
    },
  ];

  const baseUrl = String(publicBaseUrl || "http://localhost:8787").replace(/\/$/, "");
  for (const file of files) {
    await writeFile(path.join(exportDirectory, file.filename), file.markdown, "utf8");
    file.url = `${baseUrl}/exports/${encodeURIComponent(resumeCode)}/${encodeURIComponent(stamp)}/${encodeURIComponent(file.filename)}`;
    delete file.markdown;
  }

  return files;
}
