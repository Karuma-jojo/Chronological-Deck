import { SupabaseReviewRepository, REVIEW_TYPES, REVIEW_PROVENANCE, A01_REVIEW_TARGET, retentionSummary, localReviewDate, formatReviewDate } from "./data/review-store.js";

const anchor = document.getElementById("t25AtomicLayer");
if (!anchor) throw new Error("T25 review panel requires the atomic interface");
const repo = new SupabaseReviewRepository();
const panel = document.createElement("details");
panel.id = "t25ReviewPanel";
panel.className = "t25-review-panel";
panel.innerHTML = `<summary><strong>Revision Stack</strong> · delayed review</summary>
  <p id="t25ReviewIdentity"></p><p id="t25ReviewSummary"></p>
  <p class="t25-muted">Clearance records earlier instructional evidence. Retention records later retrieval. A failed review does not reopen this ARC.</p>
  <p id="t25ReviewStatus" role="status" aria-live="polite"></p>
  <div class="t25-actions"><button type="button" id="t25ReviewRefresh">Refresh</button><button type="button" id="t25ReviewAdd">Add review item</button><button type="button" id="t25ReviewStart">Start due review</button><button type="button" id="t25ReviewStack">View review stack</button></div>
  <div id="t25ReviewWork"></div>`;
anchor.insertAdjacentElement("afterend", panel);
const $ = id => panel.querySelector(`#${id}`);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const label = s => String(s).replaceAll("_", " ");
const options = values => values.map(v => `<option value="${v}">${label(v)}</option>`).join("");
let selected = null, items = [], authority = null, ready = false, epoch = 0, busy = false;
let authKey = "";
function identityKey() {
  const s = repo.getState();
  return JSON.stringify([s.url, s.userId, s.signedIn]);
}
function current(token) { return token === epoch && authKey === identityKey(); }
function status(text) { $("t25ReviewStatus").textContent = text; }
function setControls() {
  for (const id of ["t25ReviewAdd", "t25ReviewStart", "t25ReviewStack"]) $(id).disabled = !ready || busy;
  $("t25ReviewRefresh").disabled = busy;
}
function summary() {
  const s = retentionSummary(items);
  $("t25ReviewIdentity").textContent = selected ? `${selected.id} · Clearance: ${authority?.clearance ? label(authority.clearance).replace(/\b\w/g, c => c.toUpperCase()) : "Not loaded / not archived"}` : "";
  $("t25ReviewSummary").textContent = ready
    ? `Retention: ${label(s.state)} · Next review: ${formatReviewDate(s.due_on)} · Active items: ${s.active} · Due: ${s.due}${s.overdue ? ` (${s.overdue} overdue; this is not a knowledge judgment)` : ""}`
    : "Retention: unavailable";
}
async function refresh({ clearWork = false } = {}) {
  if (!selected) return;
  const token = ++epoch; authKey = identityKey(); ready = false; items = []; authority = null;
  if (clearWork) $("t25ReviewWork").replaceChildren();
  setControls(); summary();
  if (!repo.getState().signedIn) { status("Sign in through Cross-device cloud sync to use Revision Stack."); return; }
  status("Loading academic authority and review items…");
  const [a, r] = await Promise.allSettled([repo.authority(selected.id), repo.load(selected.id)]);
  if (!current(token)) return;
  if (a.status === "fulfilled") authority = a.value;
  if (r.status === "fulfilled") { items = r.value || []; ready = true; }
  summary(); setControls();
  status(r.status === "rejected" ? r.reason.message : a.status === "rejected" ? `Review available; academic clearance could not be loaded: ${a.reason.message}` : "Self-evaluated review. Attempt before revealing the reference; no automatic mathematical grading.");
}
function choose(detail) {
  if (selected?.id === detail?.id) return;
  selected = detail?.id ? detail : null; ++epoch; busy = false;
  panel.hidden = !selected;
  $("t25ReviewWork").replaceChildren();
  if (selected) void refresh();
}
function replaceItem(i) {
  items = [...items.filter(x => x.id !== i.id), i]; summary();
}
async function mutate(action, success) {
  const token = epoch; busy = true; setControls();
  try {
    const value = await action();
    if (!current(token)) return;
    success(value);
  } catch (error) {
    if (current(token)) status(error.message.includes("REVIEW_CONFLICT") ? `${error.message}. Your draft is still visible. Refresh and reconcile before trying again.` : `Not confirmed saved: ${error.message}. Your draft is still visible; retry when connected.`);
  } finally { if (current(token)) { busy = false; setControls(); } }
}
function editForm(item = null, preset = null) {
  const initial = item || preset || {};
  // One stable client key per form; retries do not create another item.
  const id = item?.id || crypto.randomUUID();
  const sourceKey = item?.source_key || preset?.source_key || id;
  const work = $("t25ReviewWork");
  work.innerHTML = `<form id="t25ReviewForm" class="t25-review-form">
    <h4>${item ? "Edit review item" : "Add review item"}</h4>
    ${!item && selected.id === A01_REVIEW_TARGET.logical_arc_id ? '<button type="button" id="t25ReviewA01">Prepare A01 absolute-value target</button>' : ""}
    <label>Type<select name="item_type">${options(REVIEW_TYPES)}</select></label>
    <label>Prompt / problem<textarea name="prompt" required maxlength="12000" rows="3"></textarea></label>
    <label>Reference answer / rubric<textarea name="reference" maxlength="16000" rows="4"></textarea></label>
    <label>Personal note<textarea name="personal_note" maxlength="4000" rows="3"></textarea></label>
    ${item ? `<p>Provenance: ${esc(label(item.provenance))}. Mathematical edits reset this item's current retention evidence; historical attempt snapshots remain unchanged.</p>` : `<label>Provenance<select name="provenance">${options(REVIEW_PROVENANCE.filter(x => x !== "parent_mixed"))}</select></label><p>Suggestions are saved pending. Accept them explicitly in the stack before reviewing.</p>`}
    <button type="submit">${item ? "Save changes" : "Save review item"}</button><button type="button" id="t25ReviewCancel">Cancel</button></form>`;
  const form = $("t25ReviewForm");
  for (const name of ["item_type", "prompt", "reference", "personal_note", "provenance"]) if (form.elements[name]) form.elements[name].value = initial[name] || (name === "item_type" ? "recall" : name === "provenance" ? "user_created" : "");
  $("t25ReviewA01")?.addEventListener("click", () => editForm(null, A01_REVIEW_TARGET));
  $("t25ReviewCancel").onclick = showStack;
  form.onsubmit = event => {
    event.preventDefault(); if (busy) return;
    const values = Object.fromEntries(new FormData(form));
    const button = form.querySelector('[type="submit"]'); button.disabled = true;
    void mutate(() => item ? repo.update(item, values) : repo.create({ ...values, id, source_key: sourceKey, logical_arc_id: selected.id, curriculum_scope: selected.parentId }), saved => {
      replaceItem(saved); showStack(); status(saved.state === "pending" ? "Suggestion saved pending; accept it when ready." : "Review item saved. Academic clearance is unchanged.");
    }).finally(() => { button.disabled = false; });
  };
}
function showStack() {
  const work = $("t25ReviewWork"); work.replaceChildren();
  const heading = document.createElement("h4"); heading.textContent = "Review items and history"; work.append(heading);
  if (!items.length) { const p = document.createElement("p"); p.textContent = "No items yet. Add one high-value review target."; work.append(p); }
  for (const item of [...items].sort((a, b) => (a.due_on || "z").localeCompare(b.due_on || "z"))) {
    const row = document.createElement("section"); row.className = "t25-review-item";
    row.innerHTML = `<p><strong>${esc(item.prompt)}</strong></p><p>${esc(label(item.item_type))} · ${esc(label(item.provenance))} · ${esc(item.state)} · ${esc(formatReviewDate(item.due_on))}${item.repair_recommended ? " · mini-SPIRE repair recommended" : ""}</p><div class="t25-actions"></div>`;
    const actions = row.querySelector(".t25-actions");
    const add = (title, fn) => { const b = document.createElement("button"); b.type = "button"; b.textContent = title; b.onclick = () => { if (!busy) fn(); }; actions.append(b); };
    if (item.state === "active") add(item.due_on > localReviewDate() ? "Practice early" : "Start review", () => start(item));
    add("Edit", () => editForm(item)); add("View history", () => history(item));
    add(item.state === "active" ? "Archive" : item.state === "pending" ? "Accept suggestion" : "Reactivate", () => void mutate(() => repo.update(item, { state: item.state === "active" ? "archived" : "active" }), saved => { replaceItem(saved); showStack(); status("Item updated; historical attempts are preserved."); }));
    if (item.state === "pending") add("Ignore / archive", () => void mutate(() => repo.update(item, { state: "archived" }), saved => { replaceItem(saved); showStack(); }));
    work.append(row);
  }
}
function start(item) {
  const work = $("t25ReviewWork");
  work.innerHTML = `<h4>Attempt first</h4><p id="t25ReviewQuestion"></p>
    <label>Your response / working (optional if on paper)<textarea id="t25ReviewResponse" maxlength="16000" rows="5"></textarea></label>
    <label><input type="checkbox" id="t25ReviewPaper"> I attempted this on paper</label>
    <button type="button" id="t25ReviewReveal">Reveal / check reference</button>
    <div id="t25ReviewCheck" hidden></div>`;
  $("t25ReviewQuestion").textContent = item.prompt;
  $("t25ReviewReveal").onclick = () => {
    if (!$("t25ReviewPaper").checked && !$("t25ReviewResponse").value.trim()) { status("Attempt the problem first, then enter your response or confirm your paper attempt."); return; }
    $("t25ReviewReveal").disabled = true;
    const check = $("t25ReviewCheck"); check.hidden = false;
    check.innerHTML = `<h4>Reference / rubric</h4><p id="t25ReviewReference" class="t25-review-text"></p>
      <p>Self-evaluate the reasoning, including assumptions. A simulation or matching final answer alone does not establish a proof.</p>
      <form id="t25ReviewGrade" class="t25-review-form">
      <label>Result<select name="result" required><option value="">Choose after checking</option>${options(["clean", "shaky", "failed"])}</select></label>
      <label>Error kind<select name="error_kind">${options(["none", "clerical", "conceptual", "mixed", "unknown"])}</select></label>
      <label>Assistance during this attempt<select name="assistance">${options(["none", "hint", "forge0", "guided"])}</select></label>
      <label><input type="checkbox" name="unfamiliar_transfer"> This was an unfamiliar transfer problem</label>
      <label>Notes / error explanation<textarea name="notes" maxlength="4000" rows="3"></textarea></label>
      <button type="submit">Record result</button></form>`;
    $("t25ReviewReference").textContent = item.reference || "No reference saved. Check a trustworthy source or your established derivation before self-evaluating; you can leave this attempt unrecorded.";
    const form = $("t25ReviewGrade"); let request = null;
    form.onsubmit = event => {
      event.preventDefault(); if (busy) return;
      if (!request) {
        const fields = Object.fromEntries(new FormData(form));
        request = { p_item_id: item.id, p_attempt_id: crypto.randomUUID(), p_expected_version: item.lock_version, p_reviewed_on: localReviewDate(),
          p_attempt: { ...fields, unfamiliar_transfer: fields.unfamiliar_transfer === "on", learner_response: $("t25ReviewResponse").value } };
        if (request.p_attempt.result === "clean" && ["conceptual", "mixed"].includes(request.p_attempt.error_kind)) { request = null; status("A conceptual error cannot be marked clean. Reconcile the result and error kind."); return; }
        // Freeze the payload after submission. Response-loss retries reuse exactly
        // the same ID and body, even across a local midnight.
        for (const e of form.elements) if (e.type !== "submit") e.disabled = true;
        $("t25ReviewResponse").disabled = true; $("t25ReviewPaper").disabled = true;
      }
      const button = form.querySelector('[type="submit"]'); button.disabled = true;
      void mutate(() => repo.record(request), saved => {
        replaceItem(saved.item); showStack();
        status(`Result ${saved.replayed ? "already saved; retry confirmed" : "recorded"}. Next review: ${formatReviewDate(saved.item.due_on)}.${saved.item.repair_recommended ? " Mini-SPIRE repair recommended for this target." : ""} Academic clearance is unchanged.`);
      }).finally(() => { button.disabled = false; button.textContent = "Retry same submission"; });
    };
  };
}
async function history(item) {
  const token = epoch;
  status("Loading review history…");
  try {
    const attempts = await repo.history(item.id); if (!current(token)) return;
    const work = $("t25ReviewWork"); work.innerHTML = "<h4>Historical attempts (self-evaluated)</h4>";
    for (const a of attempts) {
      const d = document.createElement("details");
      d.innerHTML = `<summary>${esc(a.reviewed_on)} · ${esc(a.result)} · ${esc(a.error_kind)} · next ${esc(a.due_after)}</summary><pre class="t25-review-text">${esc(JSON.stringify({ prompt: a.item_snapshot.prompt, reference: a.item_snapshot.reference, response: a.learner_response, notes: a.notes, assistance: a.assistance, unfamiliar_transfer: a.unfamiliar_transfer, stage_before: a.stage_before, stage_after: a.stage_after, schedule_reason: a.schedule_reason }, null, 2))}</pre>`;
      work.append(d);
    }
    status(attempts.length ? "History preserves the prompt and reference used at each attempt." : "No recorded attempts yet.");
  } catch (error) { if (current(token)) status(error.message); }
}
$("t25ReviewRefresh").onclick = () => void refresh({ clearWork: true });
$("t25ReviewAdd").onclick = () => editForm();
$("t25ReviewStack").onclick = showStack;
$("t25ReviewStart").onclick = () => {
  const due = items.filter(i => i.state === "active" && i.due_on <= localReviewDate()).sort((a, b) => a.due_on.localeCompare(b.due_on))[0];
  if (due) start(due); else { showStack(); status("Nothing due today. Early practice is available in the stack and does not advance a clean item's stage."); }
};
document.addEventListener("chrono:t25-atomic-selected", e => choose(e.detail));
function cloudChanged() {
  if (authKey !== identityKey()) { ++epoch; busy = false; void refresh({ clearWork: true }); }
}
document.addEventListener("chrono:cloud-context-changed", cloudChanged);
window.addEventListener("storage", cloudChanged);
// Do not discard an in-progress answer on tab return. Optimistic locks catch
// remote changes when saving; Refresh explicitly reloads the current stack.
document.addEventListener("visibilitychange", () => { if (!document.hidden) cloudChanged(); });
choose({ id: document.getElementById("t25AtomicSelect")?.value, parentId: document.getElementById("t25Unit")?.value });
