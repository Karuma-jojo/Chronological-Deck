// Shared navigation memory for the T25 / Aster / SMMC study workspace.
// Stores UI location only. It never grants clearance, certification, or assessment evidence.

export const WORKSPACE_NAV_KEY = "chrono_math_workspace_nav_v2";
const LEGACY_KEY = "chrono_math_workspace_nav_v1";

export function emptyWorkspaceNav() {
  return {
    version: 2,
    t25: {
      session: 1,
      presentation: "plain",
      task: "main",
      scrollY: 0,
    },
    smmc: {
      tab: "study",
      unitId: null,
      taskId: null,
      problemId: null,
      scroll: { study: 0, map: 0 },
    },
  };
}

function safeStorage() {
  try { return window.localStorage; } catch { return null; }
}

const nonnegative = value => Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : 0;

function normalize(value) {
  const fallback = emptyWorkspaceNav();
  if (!value || (value.version !== 1 && value.version !== 2)) return fallback;

  const session = Number(value.t25?.session);
  const presentation = value.t25?.presentation === "anime" ? "anime" : "plain";
  const task = value.t25?.task === "transfer" ? "transfer" : "main";
  const tab = value.smmc?.tab === "map" ? "map" : "study";

  return {
    version: 2,
    t25: {
      session: Number.isInteger(session) && session >= 1 && session <= 162 ? session : 1,
      presentation,
      task,
      scrollY: nonnegative(value.t25?.scrollY),
    },
    smmc: {
      tab,
      unitId: typeof value.smmc?.unitId === "string" ? value.smmc.unitId : null,
      taskId: typeof value.smmc?.taskId === "string" ? value.smmc.taskId : null,
      problemId: typeof value.smmc?.problemId === "string" ? value.smmc.problemId : null,
      scroll: {
        study: nonnegative(value.smmc?.scroll?.study),
        map: nonnegative(value.smmc?.scroll?.map),
      },
    },
  };
}

export function readWorkspaceNav() {
  const storage = safeStorage();
  if (!storage) return emptyWorkspaceNav();
  try {
    const raw = storage.getItem(WORKSPACE_NAV_KEY) || storage.getItem(LEGACY_KEY);
    if (!raw) return emptyWorkspaceNav();
    const normalized = normalize(JSON.parse(raw));
    if (!storage.getItem(WORKSPACE_NAV_KEY)) {
      try { storage.setItem(WORKSPACE_NAV_KEY, JSON.stringify(normalized)); } catch {}
    }
    return normalized;
  } catch {
    return emptyWorkspaceNav();
  }
}

function writeWorkspaceNav(value) {
  const normalized = normalize(value);
  const storage = safeStorage();
  if (!storage) return normalized;
  try { storage.setItem(WORKSPACE_NAV_KEY, JSON.stringify(normalized)); } catch {}
  return normalized;
}

export function rememberT25Location(patch = {}) {
  const state = readWorkspaceNav();
  const session = Number(patch.session ?? state.t25.session);
  state.t25 = {
    session: Number.isInteger(session) ? Math.min(162, Math.max(1, session)) : state.t25.session,
    presentation: patch.presentation === "anime" ? "anime" : patch.presentation === "plain" ? "plain" : state.t25.presentation,
    task: patch.task === "transfer" ? "transfer" : patch.task === "main" ? "main" : state.t25.task,
    scrollY: patch.scrollY === undefined ? state.t25.scrollY : nonnegative(patch.scrollY),
  };
  return writeWorkspaceNav(state);
}

export function rememberSmmcLocation(patch = {}) {
  const state = readWorkspaceNav();
  const tab = patch.tab ? (patch.tab === "map" ? "map" : "study") : state.smmc.tab;
  state.smmc = {
    ...state.smmc,
    tab,
    ...(patch.unitId !== undefined ? { unitId: patch.unitId || null } : {}),
    ...(patch.taskId !== undefined ? { taskId: patch.taskId || null } : {}),
    ...(patch.problemId !== undefined ? { problemId: patch.problemId || null } : {}),
    scroll: {
      ...state.smmc.scroll,
      ...(patch.scrollY !== undefined ? { [tab]: nonnegative(patch.scrollY) } : {}),
    },
  };
  return writeWorkspaceNav(state);
}

export function t25Href({ session, presentation, task, focus } = {}) {
  const state = readWorkspaceNav();
  const s = Number.isInteger(Number(session)) ? Math.min(162, Math.max(1, Number(session))) : state.t25.session;
  const mode = presentation === "anime" ? "anime" : presentation === "plain" ? "plain" : state.t25.presentation;
  const taskKind = task === "transfer" ? "transfer" : task === "main" ? "main" : state.t25.task;
  const params = new URLSearchParams({
    session: String(s),
    presentation: mode,
    task: taskKind,
  });
  if (focus) params.set("focus", focus);
  return `t25-course.html?${params.toString()}`;
}

export function smmcHref({ tab, unitId, taskId, problemId, focus } = {}) {
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
  if (focus) params.set("focus", focus);
  return `smmc-course.html?${params.toString()}`;
}

export function restoreViewport({ focusId, scrollY = 0 } = {}) {
  history.scrollRestoration = "manual";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (focusId) {
      const target = document.getElementById(focusId);
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, nonnegative(scrollY));
  }));
}
