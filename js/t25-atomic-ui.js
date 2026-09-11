import { T25_ATOMIC_AUDIT_VERSION, T25_ATOMIC_BY_PARENT } from "./data/t25-atomic-arcs.js";

const panel = document.getElementById("t25Panel");
const unitSelect = document.getElementById("t25Unit");
const contract = document.getElementById("t25Contract");

if (!panel || !unitSelect || !contract) {
  throw new Error("T25 atomic-card UI requires the T25 panel, unit selector and contract container.");
}

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

const LAMBDA_COMPILER_URL = "./prompts/%CE%BB-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md";
const LAMBDA_EXTRACTOR_URL = "./prompts/%CE%BB-ARC-Extractor-T25-CANONICAL.md";

const layer = document.createElement("div");
layer.id = "t25AtomicLayer";
contract.insertAdjacentElement("afterend", layer);

let selectedAtomicId = null;

function atomicCardText(card) {
  return [
    "T25 ATOMIC INVESTIGATION CARD",
    `Atomic audit: ${T25_ATOMIC_AUDIT_VERSION}`,
    `Parent unit: ${card.parentId}`,
    `Atomic ID: ${card.id}`,
    `Title: ${card.title}`,
    "",
    "CENTRAL CAPABILITY",
    card.centralCapability,
    "",
    "PRINCIPAL OBSTACLE",
    card.principalObstacle,
    "",
    "REQUIRED OWNERSHIP",
    ...card.requiredOwnership.map((item, i) => `${i + 1}. ${item}`),
    "",
    "IN SCOPE",
    ...card.inScope.map(item => `- ${item}`),
    "",
    "OUT OF SCOPE / DO NOT STEAL",
    ...card.outOfScope.map(item => `- ${item}`),
    "",
    "EXIT CONDITION",
    card.exitCondition,
    "",
    "COMPILER BOUNDARY",
    "Treat this card as one bounded curriculum unit. Do not broaden it to the whole parent ARC. Preserve later T25 units and sibling atomic cards. Diagnose already-owned prerequisites instead of forcing rediscovery.",
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
  if (summary) summary.textContent = `${card.id} · ${card.title}`;
}

function render() {
  const cards = activeCards();
  if (!cards.length) {
    selectedAtomicId = null;
    layer.innerHTML = "";
    layer.hidden = true;
    return;
  }

  if (!cards.some(c => c.id === selectedAtomicId)) selectedAtomicId = cards[0].id;
  layer.hidden = false;
  layer.innerHTML = `
    <details class="t25-atomic-box" open>
      <summary><strong>Atomic cards · ${esc(unitSelect.value)}</strong> · audit ${esc(T25_ATOMIC_AUDIT_VERSION)}</summary>
      <p class="t25-muted">This parent unit has ${cards.length} bounded learning cards. Copy only one card at a time into the λ T25 mission compiler; do not use the whole parent unit as one SPIRE wall.</p>
      <label>Atomic card
        <select id="t25AtomicSelect">${cards.map(c => `<option value="${esc(c.id)}">${esc(c.id)} · ${esc(c.title)}</option>`).join("")}</select>
      </label>
      <p id="t25AtomicSummary" class="t25-eyebrow"></p>
      <label>Copy-ready atomic card
        <textarea id="t25AtomicCardText" rows="18" readonly></textarea>
      </label>
      <div class="t25-actions">
        <button type="button" id="t25AtomicCopy">Copy atomic card</button>
        <a href="${LAMBDA_COMPILER_URL}" target="_blank" rel="noopener noreferrer">Open λ Compiler</a>
        <a href="${LAMBDA_EXTRACTOR_URL}" target="_blank" rel="noopener noreferrer">Open λ ARC Extractor</a>
      </div>
      <p class="t25-muted"><strong>Workflow:</strong> copy one card → λ Compiler → copy the sealed mission into the frozen ω SPIRE runtime → study → λ ARC Extractor at close.</p>
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
  selectedAtomicId = null;
  queueMicrotask(render);
});

document.addEventListener("chrono:node-selected", event => {
  if (event.detail?.terminal === "T25") {
    selectedAtomicId = null;
    queueMicrotask(render);
  }
});

document.addEventListener("chrono:t25-plan-changed", () => {
  selectedAtomicId = null;
  queueMicrotask(render);
});

render();
