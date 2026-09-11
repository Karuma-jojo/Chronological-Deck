import { WORLD } from "./data/world.js";
import { T25_BY_ID, T25_BY_KEY, t25PlanUnits, setT25Plan, t25Storage } from "./data/t25-entrance-prep.js";
import { T25_EXAMS, T25_SOURCES, T25_PAPERS, T25_REVIEWED_ON } from "./data/t25-sources.js";
import { T25_COVERAGE } from "./data/t25-coverage.js";
import { T22_ATOMIC_MODULES } from "./data/t22-atomic-arcs.js";
import { T25_EVIDENCE_KEY, ASSISTANCE, QUESTION_KINDS, buildT25Prompt, newAttempt, validateEvidence, mergeEvidence } from "./t25-study.js";

const panel = document.getElementById("t25Panel");
const terminalSelect = document.getElementById("terminalSelect");
const terminal = WORLD.terminals.find(t => t.id === "T25");
if (!panel || !terminal) throw new Error("T25 panel or model is unavailable.");
const storage = t25Storage();
let evidence = { version: 1, attempts: [] }, loadError = false, rawEvidence = null, backedUpUnreadable = false;
try {
  rawEvidence = storage?.getItem(T25_EVIDENCE_KEY);
  if (rawEvidence) evidence = validateEvidence(JSON.parse(rawEvidence));
} catch { loadError = true; }
let selectedId = terminal.required[0];
const atomics = new Map(Object.entries(T22_ATOMIC_MODULES).flatMap(([parent, units]) => units.map(a => [a.id, { ...a, parent }])));
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const options = object => Object.entries(object).map(([id, name]) => `<option value="${esc(id)}">${esc(name)}</option>`).join("");
const link = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
const unitButton = key => { const u = T25_BY_KEY.get(key); return `<button type="button" class="t25-link" data-unit="${u.id}">${esc(u.title)}</button>`; };
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

panel.innerHTML = `
  <div class="t25-heading"><div><p class="t25-eyebrow">T25 · Entrance laboratory</p><h2>Mathematics first. Evidence next.</h2>
  <p>Keep Spire discoveries, written practice and small projects in one route. T22 remains your deeper research path.</p></div>
  <label>Preparation plan<select id="t25Plan">${options(Object.fromEntries(Object.entries(T25_EXAMS).map(([id, e]) => [id, id === "mstat" ? "M.Stat core only" : `M.Stat + ${e.name}`])))}</select></label></div>
  <p id="t25Advice"></p>
  <div class="t25-loop"><span>1 · Model and derive on paper</span><span>2 · Solve an unfamiliar problem</span><span>3 · Build a small experiment</span><span>4 · Return for delayed recall</span></div>
  <div class="t25-grid"><section class="t25-card" aria-labelledby="t25UnitHeading">
    <h3 id="t25UnitHeading">Choose today's mathematical target</h3>
    <label>Study unit<select id="t25Unit"></select></label><div id="t25Contract"></div>
    <p class="t25-muted">These are unit checklists, not single-session walls. Choose one breakthrough at a time. Start topic questions before finishing the route.</p>
    <div class="t25-actions"><button type="button" data-prompt="investigate">Spire investigation</button><button type="button" data-prompt="learn">Learn prerequisites</button><button type="button" data-prompt="practice">Written practice</button><button type="button" data-prompt="review">Delayed review</button><button type="button" data-prompt="project">Small project</button></div>
    <details id="t25PromptBox"><summary>Copy-ready study prompt</summary><label>Paste this into your study chat<textarea id="t25Prompt" rows="12" readonly></textarea></label><button type="button" id="t25Copy">Copy prompt</button></details>
  </section><section class="t25-card" aria-labelledby="t25EvidenceHeading">
    <h3 id="t25EvidenceHeading">Written-work evidence</h3><p>The route checkmark is a self-assessed concept milestone. Record attempts here to see what you can solve independently.</p>
    <form id="t25AttemptForm"><div class="t25-form-grid">
      <label>Date<input name="date" type="date" required></label><label>Minutes (optional)<input name="minutes" type="number" min="0.1" max="1440" step="any"></label>
      <label class="t25-wide">Question / paper reference<input name="ref" maxlength="300" placeholder="Exam, year, paper, question — or textbook and exercise" required></label>
      <label>Question source<select name="kind">${options(QUESTION_KINDS)}</select></label><label>Assistance<select name="assistance">${options(ASSISTANCE)}</select></label>
      <label>Marks earned (optional)<input name="score" type="number" step="any"></label><label>Maximum marks<input name="maxScore" type="number" min="0.01" step="any"></label>
      <label class="t25-wide">Error, correction or next check<textarea name="notes" rows="3" maxlength="4000" placeholder="What failed? What will you test next?"></textarea></label>
    </div><button type="submit">Record attempt for this unit</button></form>
    <p id="t25EvidenceSummary"></p><div id="t25Attempts" class="t25-attempts"></div>
    <p class="t25-muted">Practice records and the optional-exam choice are saved on this device only. Use the separate evidence backup below; the existing world-progress export does not include it.</p>
    <div class="t25-actions"><button type="button" id="t25Export">Export evidence</button><label class="t25-import">Import evidence<input id="t25Import" type="file" accept=".json,application/json"></label></div>
  </section></div>
  <p id="t25Status" role="status" aria-live="polite"></p>
  <details class="t25-card"><summary>Syllabus coverage and official papers</summary>
    <p>Full-syllabus scope mapping, reviewed ${T25_REVIEWED_ON}. A mapping is a study obligation, not proof that a lesson or solution has been verified. Recheck eligibility, selection rules and syllabus in your application year.</p>
    <div id="t25Coverage"></div>
    <p>GATE 2027 allows one or at most two papers from permitted combinations. ST + DA is currently allowed. This route shows one extension at a time to limit preparation scope; it does not restrict which papers you can register for.</p>
    <p>${link(T25_SOURCES.gatePairs.url, "GATE paper combinations")} · ${link(T25_SOURCES.gateEligibility.url, "GATE eligibility")} · ${link(T25_SOURCES.cmiAdmissions.url, "CMI admissions")} · ${link("./docs/t25-entrance-prep.md", "Detailed route guide")}</p>
  </details>`;

const $ = id => document.getElementById(id);
const form = $("t25AttemptForm");
form.elements.date.value = today();
form.elements.kind.value = "original";
const notify = message => { $("t25Status").textContent = message; };

function renderCoverage() {
  const exams = ["mstat", ...(terminal.plan === "mstat" ? [] : [terminal.plan]), ...(["st", "da", "ma", "cs"].includes(terminal.plan) ? ["ga"] : [])];
  $("t25Coverage").innerHTML = exams.map(exam => {
    const source = T25_SOURCES[exam];
    return `<h4>${link(source.url, source.title)}</h4>${source.provenance ? `<p class="t25-muted">${esc(source.provenance)}</p>` : ""}<div class="t25-table-wrap"><table><thead><tr><th>Official scope grouping</th><th>Study units</th></tr></thead><tbody>${T25_COVERAGE[exam].map(r => `<tr><td>${esc(r.label)}</td><td>${r.keys.map(unitButton).join(" ")}</td></tr>`).join("")}</tbody></table></div>`;
  }).join("") + `<p>${link(T25_PAPERS.mstat, "ISI M.Stat papers / resources")} · ${link(T25_PAPERS.msqe, "ISI MSQE resources")} · ${link(T25_PAPERS.cmi, "CMI past papers")} · ${link(T25_PAPERS.gate, "GATE resources")}</p>`;
}
function renderEvidence() {
  $("t25EvidenceHeading").textContent = `Written-work evidence · ${selectedId}`;
  const attempts = evidence.attempts.filter(a => a.unitId === selectedId).sort((a, b) => b.date.localeCompare(a.date));
  $("t25EvidenceSummary").textContent = `${attempts.length} attempts for this unit · ${attempts.filter(a => a.assistance === "independent").length} recorded as independent. ${evidence.attempts.length} records across all plans. No automatic mastery score.`;
  $("t25Attempts").innerHTML = attempts.slice(0, 12).map(a => `<article><strong>${esc(a.ref)}</strong><p>${esc(a.date)} · ${esc(QUESTION_KINDS[a.kind])} · ${esc(ASSISTANCE[a.assistance])}${a.score === null ? " · ungraded" : ` · ${a.score}/${a.maxScore} marks`}${a.minutes === null ? "" : ` · ${a.minutes} min`}</p><p>${esc(a.notes)}</p></article>`).join("") || "<p>No attempts recorded yet. Your first attempt is evidence, even when it exposes a gap.</p>";
  if (attempts.length > 12) $("t25Attempts").insertAdjacentHTML("beforeend", "<p>Showing the latest 12; the export contains every record.</p>");
}
function renderUnit() {
  const u = T25_BY_ID.get(selectedId);
  $("t25Unit").value = selectedId;
  $("t25Contract").innerHTML = `<p class="t25-eyebrow">${u.id} · ${esc(u.project || "Written mathematics")}</p><p>${esc(u.target)}</p><ul>${u.mastery.map(m => `<li>${esc(m)}</li>`).join("")}</ul><p><strong>Prerequisites:</strong> ${u.prerequisites.map(unitButton).join(" ") || "Diagnose elementary notation first."}</p>${u.reuse.length ? `<details><summary>Reuse related T22 study</summary><p>These links can support part of this unit. Check the entrance checklist separately; no completion transfers automatically.</p><ul>${u.reuse.map(id => { const a = atomics.get(id); return `<li><button type="button" class="t25-link" data-t22="${esc(a?.parent || "")}">${esc(id)} · ${esc(a?.title || "Reference unavailable")}</button></li>`; }).join("")}</ul></details>` : ""}`;
  $("t25Prompt").value = buildT25Prompt(selectedId, u.mode);
  $("t25PromptBox").open = false;
  renderEvidence();
}
function renderPlan() {
  $("t25Plan").value = terminal.plan;
  $("t25Unit").innerHTML = t25PlanUnits(terminal.plan).map(u => `<option value="${u.id}">${u.id} · ${esc(u.title)}</option>`).join("");
  if (!terminal.required.includes(selectedId)) selectedId = terminal.required[0];
  const exam = T25_EXAMS[terminal.plan];
  $("t25Advice").textContent = `${exam.priority}: ${exam.advice} ${terminal.count} units in this plan; units vary in breadth and may take multiple sessions.`;
  renderUnit(); renderCoverage();
}
function selectUnit(id) {
  if (!terminal.required.includes(id)) return;
  selectedId = id; renderUnit();
  document.dispatchEvent(new CustomEvent("chrono:select-node", { detail: { terminal: "T25", id } }));
}
$("t25Unit").addEventListener("change", e => selectUnit(e.target.value));
$("t25Plan").addEventListener("change", e => {
  const result = setT25Plan(e.target.value);
  renderPlan();
  document.dispatchEvent(new CustomEvent("chrono:t25-plan-changed"));
  notify(result.persisted ? "Plan updated. Existing concept progress and practice records are preserved." : "Plan updated for this session, but device storage is unavailable.");
});
panel.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.unit) selectUnit(b.dataset.unit);
  if (b.dataset.t22) document.dispatchEvent(new CustomEvent("chrono:select-node", { detail: { terminal: "T22", id: b.dataset.t22 } }));
  if (b.dataset.prompt) {
    $("t25Prompt").value = buildT25Prompt(selectedId, b.dataset.prompt);
    $("t25PromptBox").open = true;
    notify("Study prompt ready. Copy it into your study chat; no lesson has been marked complete.");
  }
});
$("t25Copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText($("t25Prompt").value); notify("Prompt copied."); }
  catch { $("t25Prompt").focus(); $("t25Prompt").select(); notify("Clipboard unavailable. The prompt is selected; copy it manually."); }
});
function persist(next) {
  evidence = next;
  let saved = false;
  try {
    if (!storage) throw new Error("Storage unavailable");
    const latest = storage.getItem(T25_EVIDENCE_KEY);
    if (latest && !loadError) evidence = mergeEvidence(validateEvidence(JSON.parse(latest)), evidence);
    storage.setItem(T25_EVIDENCE_KEY, JSON.stringify(evidence));
    saved = true;
    notify("Practice record saved on this device.");
  } catch { notify("Record kept in this session only. Export evidence now to keep it."); }
  renderEvidence();
  return saved;
}
form.addEventListener("submit", e => {
  e.preventDefault();
  try {
    if (loadError) throw new Error("Saved evidence could not be read. Export it first, then import a valid backup. Existing data has not been overwritten.");
    const f = new FormData(form), number = key => String(f.get(key)).trim() === "" ? null : Number(f.get(key));
    const a = newAttempt({ unitId: selectedId, date: f.get("date"), ref: f.get("ref"), kind: f.get("kind"), assistance: f.get("assistance"), score: number("score"), maxScore: number("maxScore"), minutes: number("minutes"), notes: f.get("notes") });
    persist(mergeEvidence(evidence, { version: 1, attempts: [a] }));
    form.reset(); form.elements.date.value = today(); form.elements.kind.value = "original";
  } catch (error) { notify(error.message); }
});
function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$("t25Export").addEventListener("click", () => {
  download(loadError ? "t25-unreadable-evidence.json" : "t25-evidence.json", loadError ? (rawEvidence ?? "") : JSON.stringify({ ...evidence, plan: terminal.plan, exportedAt: new Date().toISOString() }, null, 2));
  if (loadError) backedUpUnreadable = true;
  notify(loadError ? "Original stored data exported without alteration. You can now import a valid backup." : "Evidence exported. Back up world / T22 progress with their existing export controls too.");
});
$("t25Import").addEventListener("change", async e => {
  try {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 25000000) throw new Error("Backup exceeds the 25 MB limit.");
    const incoming = validateEvidence(JSON.parse(await file.text()));
    if (loadError && !backedUpUnreadable) throw new Error("Export the unreadable stored evidence before importing a replacement.");
    const next = mergeEvidence(evidence, incoming);
    const saved = persist(next); loadError = false;
    if (saved) notify("Backup merged and saved on this device. Your current exam choice is unchanged.");
  } catch (error) { notify(`Import failed: ${error.message}`); }
  finally { e.target.value = ""; }
});
document.addEventListener("chrono:route-rendered", e => {
  panel.hidden = e.detail.terminal !== "T25";
});
document.addEventListener("chrono:node-selected", e => {
  if (e.detail.terminal === "T25" && !terminal.required.includes(e.detail.id)) {
    notify(`${e.detail.id} belongs to an optional extension outside this plan. Its details are in the graph sidebar; choose the relevant preparation plan to add it here.`);
  }
  if (e.detail.terminal === "T25" && terminal.required.includes(e.detail.id) && e.detail.id !== selectedId) {
    selectedId = e.detail.id; renderUnit();
  }
});
document.getElementById("openT25").addEventListener("click", () => {
  document.dispatchEvent(new CustomEvent("chrono:select-node", { detail: { terminal: "T25", id: selectedId } }));
});
renderPlan(); panel.hidden = terminalSelect.value !== "T25";
if (loadError) notify("Saved practice evidence could not be read. It has been preserved. Export it before importing a valid backup.");
else if (!storage) notify("Device storage is unavailable. Export practice evidence before closing this page.");
