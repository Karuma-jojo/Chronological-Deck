// Same-tab draft preservation for smooth T25/SMMC traversal.
// Session storage keeps unsaved working through page switches/reloads without turning it into assessment evidence.

const KEY = "chrono_math_workspace_drafts_v1";

function storage() {
  try { return window.sessionStorage; } catch { return null; }
}

function readAll() {
  const s = storage();
  if (!s) return {};
  try {
    const value = JSON.parse(s.getItem(KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function writeAll(value) {
  const s = storage();
  if (!s) return;
  try { s.setItem(KEY, JSON.stringify(value)); } catch {}
}

export function readWorkspaceDraft(scope, id) {
  if (!scope || !id) return "";
  const all = readAll();
  const value = all[scope]?.[id];
  return typeof value === "string" ? value : "";
}

export function writeWorkspaceDraft(scope, id, text) {
  if (!scope || !id) return;
  const all = readAll();
  all[scope] ||= {};
  const value = typeof text === "string" ? text : "";
  if (value) all[scope][id] = value.slice(0, 100000);
  else delete all[scope][id];
  writeAll(all);
}

export function clearWorkspaceDraft(scope, id) {
  if (!scope || !id) return;
  const all = readAll();
  if (all[scope]) delete all[scope][id];
  writeAll(all);
}
