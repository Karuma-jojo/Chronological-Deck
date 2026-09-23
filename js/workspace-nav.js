// Shared navigation memory for the T25 / Aster / SMMC study workspace.
// This stores only UI location, never academic clearance or assessment evidence.

export const WORKSPACE_NAV_KEY = "chrono_math_workspace_nav_v1";

export function emptyWorkspaceNav() {
  return {
    version: 1,
    t25: { session: 1, presentation: "plain" },
    smmc: { tab: "study", unitId: null, taskId: null, problemId: null },
  };
}

function safeStorage() {
  try { return window.localStorage; } catch { return null; }
}

export function readWorkspaceNav() {
  const fallback = emptyWorkspaceNav();
  const storage = safeStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(WORKSPACE_NAV_KEY);
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    if (!value || value.version !== 1) return fallback;
    const session = Number(value.t25?.session);
    const presentation = value.t25?.presentation === "anime" ? "anime" : "plain";
    const tab = value.smmc?.tab === "map" ? "map" : "study";
    return {
      version: 1,
      t25: {
        session: Number.isInteger(session) && session >= 1 && session <= 162 ? session : 1,
        presentation,
      },
      smmc: {
        tab,
        unitId: typeof value.smmc?.unitId === "string" ? value.smmc.unitId : null,
        taskId: typeof value.smmc?.taskId === "string" ? value.smmc.taskId : null,
        problemId: typeof value.smmc?.problemId === "string" ? value.smmc.problemId : null,
      },
    };
  } catch {
    return fallback;
  }
}

function writeWorkspaceNav(value) {
  const storage = safeStorage();
  if (!storage) return value;
  try { storage.setItem(WORKSPACE_NAV_KEY, JSON.stringify(value)); } catch {}
  return value;
}

export function rememberT25Location(session, presentation = "plain") {
  const state = readWorkspaceNav();
  state.t25 = {
    session: Number.isInteger(Number(session)) ? Math.min(162, Math.max(1, Number(session))) : state.t25.session,
    presentation: presentation === "anime" ? "anime" : "plain",
  };
  return writeWorkspaceNav(state);
}

export function rememberSmmcLocation(patch = {}) {
  const state = readWorkspaceNav();
  state.smmc = {
    ...state.smmc,
    ...(patch.tab ? { tab: patch.tab === "map" ? "map" : "study" } : {}),
    ...(patch.unitId !== undefined ? { unitId: patch.unitId || null } : {}),
    ...(patch.taskId !== undefined ? { taskId: patch.taskId || null } : {}),
    ...(patch.problemId !== undefined ? { problemId: patch.problemId || null } : {}),
  };
  return writeWorkspaceNav(state);
}

export function t25Href({ session, presentation } = {}) {
  const state = readWorkspaceNav();
  const s = Number.isInteger(Number(session)) ? Math.min(162, Math.max(1, Number(session))) : state.t25.session;
  const mode = presentation === "anime" ? "anime" : presentation === "plain" ? "plain" : state.t25.presentation;
  const params = new URLSearchParams({ session: String(s), presentation: mode });
  return `t25-course.html?${params.toString()}`;
}

export function smmcHref({ tab, unitId, taskId, problemId } = {}) {
  const state = readWorkspaceNav();
  const next = {
    tab: tab || state.smmc.tab,
    unitId: unitId !== undefined ? unitId : state.smmc.unitId,
    taskId: taskId !== undefined ? taskId : state.smmc.taskId,
    problemId: problemId !== undefined ? problemId : state.smmc.problemId,
  };
  const params = new URLSearchParams({ tab: next.tab === "map" ? "map" : "study" });
  if (next.tab === "map" && next.problemId) params.set("problem", next.problemId);
  if (next.tab !== "map" && next.unitId) params.set("unit", next.unitId);
  if (next.tab !== "map" && next.taskId) params.set("task", next.taskId);
  return `smmc-course.html?${params.toString()}`;
}
