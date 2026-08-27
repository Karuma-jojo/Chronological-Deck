import { WORLD } from "./data/world.js";
import {
  T22_ATOMIC_AUDIT_VERSION,
  T22_ATOMIC_MODULES,
  T22_ATOMIC_COUNT,
  T22_ATOMIC_TARGET_HOURS,
  T22_ATOMIC_TARGET_HOURS_PER_ARC,
  T22_ATOMIC_WORK_RANGE_HOURS,
} from "./data/t22-atomic-arcs.js";
import {
  enrichT22AtomicArc,
  getT22RichModule,
} from "./data/t22-rich-syllabus.js";

const T22_ID = "T22";
const ATOMIC_KEY = "chrono_t22_atomic_progress_v2";
const LEGACY_ATOMIC_KEY = "chrono_t22_atomic_progress_v1";
const WORLD_PROGRESS_KEY = "chrono_mastery_world_v1_progress";
const terminal = WORLD.terminals.find((candidate) => candidate.id === T22_ID);
const moduleIds = terminal?.order || [];
const moduleById = new Map((WORLD.nodes || []).map((node) => [node.id, node]));
const allAtomicIds = new Set(Object.values(T22_ATOMIC_MODULES).flat().map((arc) => arc.id));
let atomicDone = loadAtomicProgress();
let selectedModuleId = null;
let rendering = false;

function loadAtomicProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ATOMIC_KEY) || "[]");
    if (Array.isArray(parsed)) return new Set(parsed.filter((id) => allAtomicIds.has(id)));
  } catch (error) {}
  return new Set();
}

function saveAtomicProgress() {
  localStorage.setItem(ATOMIC_KEY, JSON.stringify([...atomicDone]));
}

function archiveLegacyAtomicProgress() {
  if (localStorage.getItem(ATOMIC_KEY) !== null) return;
  const legacy = localStorage.getItem(LEGACY_ATOMIC_KEY);
  if (legacy !== null) {
    // Audit v2 changed the meaning and granularity of many Axx IDs. Do not
    // silently reinterpret v1 child checkmarks as mastery of different v2 units.
    localStorage.setItem("chrono_t22_atomic_progress_v1_archived", legacy);
  }
  localStorage.setItem(ATOMIC_KEY, "[]");
  atomicDone = new Set();
}

function worldCleared() {
  try {
    const parsed = JSON.parse(localStorage.getItem(WORLD_PROGRESS_KEY) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    return new Set();
  }
}

function migrateCompletedModules() {
  const cleared = worldCleared();
  let changed = false;
  for (const moduleId of moduleIds) {
    if (!cleared.has(moduleId)) continue;
    const arcs = T22_ATOMIC_MODULES[moduleId] || [];
    if (arcs.every((arc) => atomicDone.has(arc.id))) continue;
    // Macro modules that were already cleared remain cleared. Their audited
    // children inherit completion; only partial v1 subprogress is reset.
    for (const arc of arcs) atomicDone.add(arc.id);
    changed = true;
  }
  if (changed) saveAtomicProgress();
}

function moduleIdFromDetail() {
  const text = document.getElementById("detailTitle")?.textContent || "";
  const match = text.match(/^(ARC|SIDE)\s+(\d+)/i);
  if (match) {
    const id = `${match[1].toUpperCase()}${match[2]}`;
    if (T22_ATOMIC_MODULES[id]) return id;
  }
  return selectedModuleId && T22_ATOMIC_MODULES[selectedModuleId] ? selectedModuleId : null;
}

function detailStatus() {
  const kv = document.getElementById("detailKV");
  if (!kv || kv.children.length < 2) return "locked";
  return String(kv.children[1].textContent || "locked").trim();
}

function ensureAtomicPanel() {
  let shell = document.getElementById("t22AtomicShell");
  if (shell) return shell;
  const detailKV = document.getElementById("detailKV");
  if (!detailKV) return null;

  shell = document.createElement("div");
  shell.id = "t22AtomicShell";
  shell.innerHTML = `
    <div class="section-title t22-atomic-heading">T22 atomic arcs</div>
    <div class="t22-atomic-callout" id="t22AtomicMeta"></div>
    <div class="t22-atomic-list" id="t22AtomicList"></div>
  `;
  detailKV.insertAdjacentElement("afterend", shell);
  return shell;
}

function ensureStyles() {
  if (document.getElementById("t22AtomicStyles")) return;
  const style = document.createElement("style");
  style.id = "t22AtomicStyles";
  style.textContent = `
    #t22AtomicShell{margin-top:12px}
    .t22-atomic-callout{border:1px solid var(--border);background:var(--panel2);border-radius:10px;padding:8px 9px;font-size:10px;line-height:1.45;color:var(--muted);margin-bottom:8px}
    .t22-atomic-contract{margin-top:7px;padding-top:7px;border-top:1px dashed var(--border);display:grid;gap:4px}
    .t22-atomic-list{display:grid;gap:6px}
    .t22-atomic-row{display:grid;grid-template-columns:18px minmax(0,1fr) auto;gap:7px;align-items:start;border:1px solid var(--border);background:color-mix(in srgb,var(--panel2) 88%,transparent);border-radius:9px;padding:7px 8px;font-size:10px;line-height:1.35}
    .t22-atomic-row.done{border-color:color-mix(in srgb,var(--green) 55%,var(--border));background:color-mix(in srgb,var(--green) 8%,var(--panel2))}
    .t22-atomic-row.next{border-color:var(--blue)}
    .t22-atomic-row.locked{opacity:.52}
    .t22-atomic-row input{width:15px;height:15px;margin:1px 0 0}
    .t22-atomic-code{color:var(--muted);font-size:9px;white-space:nowrap}
    .t22-atomic-title{color:var(--text)}
    .t22-atomic-title small{display:block;color:var(--muted);font-size:9px;margin-top:2px}
    .t22-atomic-card{margin-top:6px;border-top:1px dashed var(--border);padding-top:5px;color:var(--muted)}
    .t22-atomic-card summary{cursor:pointer;color:var(--text);font-size:9px;user-select:none}
    .t22-atomic-card-body{display:grid;gap:5px;margin-top:6px}
    .t22-atomic-card-body strong{color:var(--text)}
    .t22-atomic-card-body ul{margin:2px 0 0 16px;padding:0}
    .t22-atomic-card-body li{margin:1px 0}
    .t22-copy-card{justify-self:start;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:7px;padding:4px 7px;font:inherit;cursor:pointer}
    .t22-copy-card:hover{border-color:var(--blue)}
    .t22-atomic-progress-note{margin-top:6px;color:var(--muted);font-size:9px;line-height:1.4}
  `;
  document.head.appendChild(style);
}

function setModuleCheckboxMode(isAtomicModule) {
  const check = document.getElementById("clearedCheck");
  if (!check) return;
  check.disabled = isAtomicModule;
  const row = check.closest(".checkrow");
  if (!row) return;
  let note = row.querySelector(".t22-module-auto-note");
  if (isAtomicModule) {
    if (!note) {
      note = document.createElement("span");
      note.className = "t22-module-auto-note";
      note.style.color = "var(--muted)";
      note.style.fontSize = "10px";
      note.textContent = "Module clears automatically when every atomic arc below is complete.";
      row.appendChild(note);
    }
  } else if (note) {
    note.remove();
  }
}

function syncSelectedModuleClear(moduleId) {
  const arcs = T22_ATOMIC_MODULES[moduleId] || [];
  const complete = arcs.length > 0 && arcs.every((arc) => atomicDone.has(arc.id));
  const check = document.getElementById("clearedCheck");
  if (!check || moduleIdFromDetail() !== moduleId || check.checked === complete) return;

  check.checked = complete;
  check.dispatchEvent(new Event("change", { bubbles: true }));
}

function toggleAtomic(moduleId, index, checked) {
  const arcs = T22_ATOMIC_MODULES[moduleId] || [];
  if (!arcs[index]) return;

  if (checked) {
    atomicDone.add(arcs[index].id);
  } else {
    for (let i = index; i < arcs.length; i += 1) atomicDone.delete(arcs[i].id);
  }

  saveAtomicProgress();
  syncSelectedModuleClear(moduleId);
  scheduleRender();
}

function renderList(items) {
  if (!Array.isArray(items) || items.length === 0) return "<span>None specified.</span>";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function missionCardText(moduleId, moduleIndex, arc, richModule) {
  const moduleNode = moduleById.get(moduleId);
  const lines = [
    `Module ${moduleIndex + 1} / ${moduleIds.length} · atomic audit v${T22_ATOMIC_AUDIT_VERSION} · syllabus contract v${arc.syllabusVersion}`,
    `Parent: ${moduleId} — ${moduleNode?.title || moduleId}`,
    `Atomic ARC: ${arc.id} — ${arc.title}`,
    "",
    `Role target: ${arc.roleTarget || richModule?.roleTarget || "Quantitative research"}`,
    `Module purpose: ${richModule?.modulePurpose || ""}`,
    `Module destination: ${richModule?.moduleDestination || ""}`,
    "",
    `Focus: ${arc.focus || ""}`,
    `Quant-research relevance: ${arc.roleRelevance || ""}`,
    `Purpose: ${arc.purpose || ""}`,
    `Principal obstacle: ${arc.principalObstacle || ""}`,
    "",
    "Entry prerequisites:",
    ...(arc.entryPrerequisites || []).map((item) => `- ${item}`),
    "",
    `Target: ${arc.target || ""}`,
    "",
    "Required mastery:",
    ...(arc.requiredMastery || []).map((item) => `- ${item}`),
    "",
    `Application scope: ${arc.applicationScope || ""}`,
    `Transfer scope: ${arc.transferScope || ""}`,
    "",
    "Explicitly out of scope:",
    ...(arc.explicitlyOutOfScope || []).map((item) => `- ${item}`),
    "",
    `Next ARC boundary: ${arc.nextArcBoundary || ""}`,
  ];
  return lines.join("\n").trim();
}

async function copyMissionCard(moduleId, moduleIndex, arc, richModule, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(missionCardText(moduleId, moduleIndex, arc, richModule));
    button.textContent = "Copied";
  } catch (error) {
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => { button.textContent = original; }, 1200);
}

function renderRichCard(moduleId, moduleIndex, arc, richModule) {
  if (!arc.syllabusVersion) return "";
  return `
    <details class="t22-atomic-card">
      <summary>Mission syllabus card · v${escapeHtml(arc.syllabusVersion)}</summary>
      <div class="t22-atomic-card-body">
        <div><strong>Quant-research relevance</strong><br>${escapeHtml(arc.roleRelevance)}</div>
        <div><strong>Purpose</strong><br>${escapeHtml(arc.purpose)}</div>
        <div><strong>Principal obstacle</strong><br>${escapeHtml(arc.principalObstacle)}</div>
        <div><strong>Target</strong><br>${escapeHtml(arc.target)}</div>
        <div><strong>Entry prerequisites</strong>${renderList(arc.entryPrerequisites)}</div>
        <div><strong>Required mastery</strong>${renderList(arc.requiredMastery)}</div>
        <div><strong>Application envelope</strong><br>${escapeHtml(arc.applicationScope)}</div>
        <div><strong>Transfer envelope</strong><br>${escapeHtml(arc.transferScope)}</div>
        <div><strong>Explicitly out of scope</strong>${renderList(arc.explicitlyOutOfScope)}</div>
        <div><strong>Next-ARC boundary</strong><br>${escapeHtml(arc.nextArcBoundary)}</div>
        <button class="t22-copy-card" type="button">Copy mission card</button>
      </div>
    </details>
  `;
}

function renderAtomicPanel() {
  const shell = ensureAtomicPanel();
  if (!shell) return;
  const isT22 = document.getElementById("terminalSelect")?.value === T22_ID;
  const moduleId = isT22 ? moduleIdFromDetail() : null;
  const baseArcs = moduleId ? T22_ATOMIC_MODULES[moduleId] : null;
  const richModule = moduleId ? getT22RichModule(moduleId) : null;
  const arcs = baseArcs?.map((arc) => enrichT22AtomicArc(moduleId, arc));

  shell.style.display = arcs ? "block" : "none";
  setModuleCheckboxMode(Boolean(arcs));
  if (!arcs) return;

  const doneCount = arcs.filter((arc) => atomicDone.has(arc.id)).length;
  const moduleIndex = moduleIds.indexOf(moduleId);
  const status = detailStatus();
  const firstIncomplete = arcs.findIndex((arc) => !atomicDone.has(arc.id));
  const meta = document.getElementById("t22AtomicMeta");
  const list = document.getElementById("t22AtomicList");
  if (!meta || !list) return;

  const syllabusBadge = richModule ? ` · syllabus v${escapeHtml(richModule.syllabusVersion)}` : "";
  const contract = richModule ? `
    <div class="t22-atomic-contract">
      <div><strong>Role target:</strong> ${escapeHtml(richModule.roleTarget)}</div>
      <div><strong>Module purpose:</strong> ${escapeHtml(richModule.modulePurpose)}</div>
      <div><strong>Destination:</strong> ${escapeHtml(richModule.moduleDestination)}</div>
    </div>
  ` : "";
  const desiredMeta = `<strong>Module ${moduleIndex + 1} / ${moduleIds.length} · ${doneCount}/${arcs.length} atomic arcs · atomic audit v${T22_ATOMIC_AUDIT_VERSION}${syllabusBadge}</strong><br>` +
    `Content-derived decomposition: there is no per-module arc cap. Nominal bookkeeping: ~${arcs.length * T22_ATOMIC_TARGET_HOURS_PER_ARC} focused hours. Each atomic arc targets ~${T22_ATOMIC_TARGET_HOURS_PER_ARC}h; ${T22_ATOMIC_WORK_RANGE_HOURS[0]}–${T22_ATOMIC_WORK_RANGE_HOURS[1]}h is the normal range. Oversized units split or move misplaced content.${contract}`;
  if (meta.innerHTML !== desiredMeta) meta.innerHTML = desiredMeta;

  list.innerHTML = "";
  arcs.forEach((arc, index) => {
    const done = atomicDone.has(arc.id);
    const available = status !== "locked" && (done || index === 0 || atomicDone.has(arcs[index - 1].id));
    const row = document.createElement("div");
    row.className = `t22-atomic-row${done ? " done" : ""}${!done && index === firstIncomplete && available ? " next" : ""}${!available ? " locked" : ""}`;
    row.innerHTML = `
      <input type="checkbox" aria-label="Mark ${escapeHtml(arc.id)} complete" ${done ? "checked" : ""} ${available ? "" : "disabled"}>
      <div class="t22-atomic-title">
        ${escapeHtml(arc.title)}
        <small>${escapeHtml(arc.focus || "One principal obstacle → operational use → unfamiliar transfer.")}</small>
        ${renderRichCard(moduleId, moduleIndex, arc, richModule)}
      </div>
      <span class="t22-atomic-code">${escapeHtml(arc.id)} · ~${arc.targetHours}h</span>
    `;
    row.querySelector("input").addEventListener("change", (event) => toggleAtomic(moduleId, index, event.target.checked));
    const copyButton = row.querySelector(".t22-copy-card");
    copyButton?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      copyMissionCard(moduleId, moduleIndex, arc, richModule, copyButton);
    });
    list.appendChild(row);
  });

  const note = document.createElement("div");
  note.className = "t22-atomic-progress-note";
  note.textContent = richModule
    ? "Atomic progress still uses the v2 stable IDs; syllabus v3 enriches the card without reinterpreting completed A01/A02 work. Partial v1 checkmarks remain archived."
    : "Atomic audit-v2 subprogress is local to this browser. Partial v1 atomic checkmarks are archived rather than reinterpreted; completed module checkpoints are preserved through the existing Chrono-Deck progress/cloud system.";
  list.appendChild(note);
}

function renderAtomicProgress() {
  if (document.getElementById("terminalSelect")?.value !== T22_ID) return;
  const done = [...allAtomicIds].filter((id) => atomicDone.has(id)).length;
  const pct = Math.round((done / T22_ATOMIC_COUNT) * 100);
  const cleared = worldCleared();
  const modulesDone = moduleIds.filter((id) => cleared.has(id)).length;

  const metric = document.getElementById("mProgress");
  const bar = document.getElementById("routeProgressBar");
  const text = document.getElementById("routeProgressText");
  const metricText = `${done}/${T22_ATOMIC_COUNT}`;
  const barWidth = `${pct}%`;
  const progressText = `${done} atomic arcs cleared · ${T22_ATOMIC_COUNT - done} remaining · ${pct}% of T22 by content-derived work units · ${modulesDone}/${moduleIds.length} modules fully cleared · nominal bookkeeping ~${T22_ATOMIC_TARGET_HOURS} focused hours.`;

  if (metric && metric.textContent !== metricText) metric.textContent = metricText;
  if (bar && bar.style.width !== barWidth) bar.style.width = barWidth;
  if (text && text.textContent !== progressText) text.textContent = progressText;
}

function renderGraphWeights() {
  if (document.getElementById("terminalSelect")?.value !== T22_ID) return;
  document.querySelectorAll("#routeGraph g.node").forEach((group) => {
    const moduleId = group.dataset.id;
    const arcs = T22_ATOMIC_MODULES[moduleId];
    if (!arcs) return;
    const done = arcs.filter((arc) => atomicDone.has(arc.id)).length;
    const index = moduleIds.indexOf(moduleId) + 1;
    const meta = group.querySelector(".m");
    const desired = `M${String(index).padStart(2, "0")} · ${done}/${arcs.length} atoms · ~${arcs.length * T22_ATOMIC_TARGET_HOURS_PER_ARC}h`;
    if (meta && meta.textContent !== desired) meta.textContent = desired;
  });
}

function renderHeader() {
  const pill = [...document.querySelectorAll("header .pill")]
    .find((candidate) => candidate.textContent.trim().startsWith("T22:"));
  const pillText = `T22: ${moduleIds.length} modules · ${T22_ATOMIC_COUNT} atomic arcs`;
  if (pill && pill.textContent !== pillText) pill.textContent = pillText;
  const subtitle = document.querySelector("header .subtitle");
  if (subtitle && subtitle.textContent.includes("app version")) {
    const desired = subtitle.textContent.replace(/app version\s+[\d.]+/i, "app version 1.7");
    if (subtitle.textContent !== desired) subtitle.textContent = desired;
  }
  const desiredTitle = document.title.replace(/v[\d.]+/, "v1.7");
  if (document.title !== desiredTitle) document.title = desiredTitle;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[character]));
}

function render() {
  if (rendering) return;
  rendering = true;
  try {
    migrateCompletedModules();
    renderHeader();
    renderAtomicPanel();
    renderAtomicProgress();
    renderGraphWeights();
  } finally {
    rendering = false;
  }
}

let renderQueued = false;
function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
}

const graph = document.getElementById("routeGraph");
graph?.addEventListener("click", (event) => {
  const node = event.target.closest?.("g.node");
  if (node?.dataset?.id) selectedModuleId = node.dataset.id;
  scheduleRender();
});

document.getElementById("terminalSelect")?.addEventListener("change", () => {
  selectedModuleId = null;
  scheduleRender();
});

window.addEventListener("storage", (event) => {
  if (event.key === ATOMIC_KEY) atomicDone = loadAtomicProgress();
  if (event.key === ATOMIC_KEY || event.key === WORLD_PROGRESS_KEY) scheduleRender();
});

const observer = new MutationObserver(() => scheduleRender());
for (const targetId of ["detailTitle", "detailKV", "routeProgressText", "routeGraph"]) {
  const target = document.getElementById(targetId);
  if (target) observer.observe(target, { childList: true, subtree: true, characterData: true });
}

ensureStyles();
archiveLegacyAtomicProgress();
migrateCompletedModules();
render();