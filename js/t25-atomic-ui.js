import {
  T25_ATOMIC_AUDIT_VERSION,
  T25_ATOMIC_CARDS,
  T25_ATOMIC_BY_PARENT,
  T25_MSTAT_120_ROUTE,
} from "./data/t25-atomic-arcs.js?v=1.8.2";

const panel = document.getElementById("t25Panel");
const unitSelect = document.getElementById("t25Unit");
const contract = document.getElementById("t25Contract");

if (!panel || !unitSelect || !contract) {
  throw new Error("T25 atomic-card UI requires the T25 panel, unit selector and contract container.");
}

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#39;",
}[c]));
const routeNo = card => String(card.routeOrder).padStart(3, "0");

const LAMBDA_COMPILER_URL = "./prompts/%CE%BB-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md";
const LAMBDA_EXTRACTOR_URL = "./prompts/%CE%BB-ARC-Extractor-T25-CANONICAL.md";

const layer = document.createElement("div");
layer.id = "t25AtomicLayer";
contract.insertAdjacentElement("afterend", layer);

let selectedAtomicId = null;

function lines(label, values, prefix = "- ") {
  return [label, ...(values || []).map((item, i) => prefix === "number" ? `${i + 1}. ${item}` : `${prefix}${item}`), ""];
}

function atomicCardText(card) {
  return [
    "T25 MSTAT-120 ATOMIC INVESTIGATION CARD",
    `Atomic audit: ${T25_ATOMIC_AUDIT_VERSION}`,
    `Global route: ${routeNo(card)} / ${T25_MSTAT_120_ROUTE.length}`,
    `Syllabus code: ${card.syllabusCode}`,
    `Parent unit: ${card.parentId}`,
    `Atomic ID: ${card.id}`,
    `Title: ${card.title}`,
    "",
    "FOCUS",
    card.focus,
    "",
    "PURPOSE",
    card.purpose,
    "",
    "CENTRAL CAPABILITY",
    card.centralCapability,
    "",
    "PRINCIPAL OBSTACLE",
    card.principalObstacle,
    "",
    ...lines("ENTRY PREREQUISITES", card.entryPrerequisites),
    ...lines("REQUIRED OWNERSHIP", card.requiredOwnership, "number"),
    "APPLICATION SCOPE",
    card.applicationScope,
    "",
    "TRANSFER SCOPE",
    card.transferScope,
    "",
    ...lines("IN SCOPE", card.inScope),
    ...lines("OUT OF SCOPE / DO NOT STEAL", card.outOfScope),
    "EXIT CONDITION",
    card.exitCondition,
    "",
    "NEXT ARC BOUNDARY",
    card.nextArcBoundary,
    "",
    "COMPILER BOUNDARY",
    "Treat this card as one bounded curriculum unit. Do not broaden it to the whole parent ARC. Preserve later T25 units and sibling atomic cards. Diagnose already-owned prerequisites instead of forcing rediscovery.",
    "",
    "ROUTE BOUNDARY",
    "The canonical study route is global 001 -> 120. Parent ARC grouping is for curriculum organization only; it does not override the global route order. A route-manifest entry is not a finished card until it has an authored atomic contract in T25_ATOMIC_CARDS.",
  ].join("\n");
}

function activeCards() {
  return T25_ATOMIC_BY_PARENT.get(unitSelect.value) || [];
}

function renderCardBody() {
  const cards = activeCards();
  if (!cards.length) return;
  const card = cards.find(c => c.id === selectedAtomicId) || cards[0];
  selectedAtomicId = card.id;
  const select = document.getElementById("t25AtomicSelect");
  const text = document.getElementById("t25AtomicCardText");
  if (select) select.value = card.id;
  if (text) text.value = atomicCardText(card);
  const summary = document.getElementById("t25AtomicSummary");
  if (summary) summary.textContent = `${routeNo(card)} / 120 · ${card.syllabusCode} · ${card.title}`;
  document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected", {
    detail: { id: card.id, parentId: card.parentId, routeOrder: card.routeOrder, syllabusCode: card.syllabusCode },
  }));
}

function render() {
  const cards = activeCards();
  if (!cards.length) {
    selectedAtomicId = null;
    layer.innerHTML = "";
    layer.hidden = true;
    document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected", { detail: null }));
    return;
  }

  if (!cards.some(c => c.id === selectedAtomicId)) selectedAtomicId = cards[0].id;
  layer.hidden = false;
  const authored = T25_ATOMIC_CARDS.length;
  const nextSpec = T25_MSTAT_120_ROUTE[authored] || null;
  const nextText = nextSpec
    ? `Next unauthored route item: ${String(nextSpec.routeOrder).padStart(3, "0")} · ${nextSpec.syllabusCode} · ${nextSpec.title}.`
    : "All 120 route items have authored atomic contracts.";

  layer.innerHTML = `
    <details class="t25-atomic-box" open>
      <summary><strong>MSTAT-120 atomic cards · ${esc(unitSelect.value)}</strong> · audit ${esc(T25_ATOMIC_AUDIT_VERSION)}</summary>
      <p class="t25-muted"><strong>Progress:</strong> ${authored} / ${T25_MSTAT_120_ROUTE.length} cards individually authored. ${esc(nextText)}</p>
      <p class="t25-muted">This parent currently contains ${cards.length} authored bounded card${cards.length === 1 ? "" : "s"}. Global numbers are study positions and never restart inside a parent ARC.</p>
      <label>Atomic card
        <select id="t25AtomicSelect">${cards.map(c => `<option value="${esc(c.id)}">${esc(routeNo(c))} · ${esc(c.syllabusCode)} · ${esc(c.title)}</option>`).join("")}</select>
      </label>
      <p id="t25AtomicSummary" class="t25-eyebrow"></p>
      <label>Copy-ready atomic card
        <textarea id="t25AtomicCardText" rows="28" readonly></textarea>
      </label>
      <div class="t25-actions">
        <button type="button" id="t25AtomicCopy">Copy atomic card</button>
        <a href="${LAMBDA_COMPILER_URL}" target="_blank" rel="noopener noreferrer">Open λ Compiler</a>
        <a href="${LAMBDA_EXTRACTOR_URL}" target="_blank" rel="noopener noreferrer">Open λ ARC Extractor</a>
      </div>
      <p class="t25-muted"><strong>Workflow:</strong> follow global 001→120 → copy one authored card → λ Compiler → frozen ω SPIRE runtime → study → λ ARC Extractor at close.</p>
      <p class="t25-muted">Parent completion remains separate: clearing one atomic card does not automatically clear ${esc(unitSelect.value)}.</p>
    </details>`;

  document.getElementById("t25AtomicSelect").addEventListener("change", event => {
    selectedAtomicId = event.target.value;
    renderCardBody();
  });

  document.getElementById("t25AtomicCopy").addEventListener("click", async () => {
    const text = document.getElementById("t25AtomicCardText");
    const status = document.getElementById("t25Status");
    try {
      await navigator.clipboard.writeText(text.value);
      if (status) status.textContent = `${selectedAtomicId} copied. Compile this card as one bounded λ mission.`;
    } catch {
      text.focus();
      text.select();
      if (status) status.textContent = "Clipboard unavailable. The atomic card is selected; copy it manually.";
    }
  });

  renderCardBody();
}

unitSelect.addEventListener("change", () => {
  queueMicrotask(render);
});

document.addEventListener("chrono:node-selected", event => {
  if (event.detail?.terminal === "T25") queueMicrotask(render);
});

document.addEventListener("chrono:t25-plan-changed", () => {
  queueMicrotask(render);
});

render();
