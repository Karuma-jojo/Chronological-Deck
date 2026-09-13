const {
  T25_ATOMIC_AUDIT_VERSION,
  T25_ATOMIC_CARDS,
  T25_ATOMIC_BY_ORDER,
  T25_MSTAT_120_ROUTE,
} = await import(`./data/t25-atomic-arcs.js?v=${Date.now()}`);

const panel = document.getElementById("t25Panel");
const unitSelect = document.getElementById("t25Unit");
const contract = document.getElementById("t25Contract");
const unitLabel = unitSelect?.closest("label");
const heading = document.getElementById("t25UnitHeading");

if (!panel || !unitSelect || !contract || !unitLabel) {
  throw new Error("T25 atomic-card UI requires the T25 panel, unit selector and contract container.");
}

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#39;",
}[c]));
const routeNo = value => String(value).padStart(3, "0");
const authoredByOrder = T25_ATOMIC_BY_ORDER;

const LAMBDA_COMPILER_URL = "./prompts/%CE%BB-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md";
const LAMBDA_EXTRACTOR_URL = "./prompts/%CE%BB-ARC-Extractor-T25-CANONICAL.md";

// The 001 -> 120 route is the learner-facing chronology. Parent ARCs remain useful
// for graph compatibility, evidence grouping and prerequisite context, but they do
// not determine what the learner studies next.
const layer = document.createElement("div");
layer.id = "t25AtomicLayer";
unitLabel.insertAdjacentElement("beforebegin", layer);
if (heading) heading.textContent = "Choose one MSTAT-120 atomic target";
for (const node of unitLabel.childNodes) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
    node.textContent = "Parent grouping (secondary context)";
    break;
  }
}

let selectedOrder = Math.min(
  T25_ATOMIC_CARDS[0]?.routeOrder || 1,
  T25_MSTAT_120_ROUTE.length,
);

function lines(label, values, prefix = "- ") {
  return [label, ...(values || []).map((item, i) => prefix === "number" ? `${i + 1}. ${item}` : `${prefix}${item}`), ""];
}

function atomicCardText(card) {
  return [
    "T25 MSTAT-120 ATOMIC INVESTIGATION CARD",
    `Atomic audit: ${T25_ATOMIC_AUDIT_VERSION}`,
    `Global route: ${routeNo(card.routeOrder)} / ${T25_MSTAT_120_ROUTE.length}`,
    `Syllabus code: ${card.syllabusCode}`,
    `Parent context only: ${card.parentId}`,
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
    "Treat this atomic card as the curriculum unit. Do not broaden it to the whole parent ARC. Preserve later MSTAT-120 breakthroughs and diagnose already-owned prerequisites instead of forcing rediscovery.",
    "",
    "ROUTE BOUNDARY",
    "The canonical study chronology is global 001 -> 120. Parent ARC IDs are stable organizational/context identifiers only; their numeric order is not a study order.",
  ].join("\n");
}

function parentDisplay(parentId) {
  const option = [...unitSelect.options].find(o => o.value === parentId);
  return option?.textContent?.trim() || parentId;
}

function syncParent(spec) {
  if (!spec || unitSelect.value === spec.parentId) return;
  const option = [...unitSelect.options].find(o => o.value === spec.parentId);
  if (!option) return;
  unitSelect.value = spec.parentId;
  unitSelect.dispatchEvent(new Event("change", { bubbles: true }));
}

function routeOption(spec) {
  const authored = authoredByOrder.has(spec.routeOrder);
  const mark = authored ? "✓" : "·";
  const status = authored ? "" : " [planned]";
  return `<option value="${spec.routeOrder}">${mark} ${routeNo(spec.routeOrder)} · ${esc(spec.syllabusCode)} · ${esc(spec.title)}${status}</option>`;
}

function renderCardBody({ sync = false } = {}) {
  const spec = T25_MSTAT_120_ROUTE[selectedOrder - 1];
  if (!spec) return;
  const card = authoredByOrder.get(selectedOrder) || null;
  if (sync) syncParent(spec);

  const routeSelect = document.getElementById("t25AtomicRouteSelect");
  if (routeSelect) routeSelect.value = String(selectedOrder);

  const summary = document.getElementById("t25AtomicSummary");
  if (summary) summary.textContent = `${routeNo(spec.routeOrder)} / 120 · ${spec.syllabusCode} · ${spec.title}`;

  const context = document.getElementById("t25AtomicParentContext");
  if (context) context.textContent = `Secondary parent context: ${parentDisplay(spec.parentId)}. Parent numbering does not control chronology.`;

  const text = document.getElementById("t25AtomicCardText");
  if (text) text.value = card
    ? atomicCardText(card)
    : `MSTAT-120 ${routeNo(spec.routeOrder)} · ${spec.syllabusCode} · ${spec.title}\n\nThis route position is fixed, but its full atomic learning contract has not been individually authored and audited yet. Do not compile or study from a generic placeholder.`;

  const copy = document.getElementById("t25AtomicCopy");
  if (copy) copy.disabled = !card;
  const status = document.getElementById("t25AtomicStatus");
  if (status) status.textContent = card
    ? "AUTHORED · this card is ready for λ compilation."
    : "PLANNED · route position reserved; full card deliberately not auto-generated.";

  const prev = document.getElementById("t25AtomicPrev");
  const next = document.getElementById("t25AtomicNext");
  if (prev) prev.disabled = selectedOrder <= 1;
  if (next) next.disabled = selectedOrder >= T25_MSTAT_120_ROUTE.length;

  document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected", {
    detail: card ? { id: card.id, parentId: card.parentId, routeOrder: card.routeOrder, syllabusCode: card.syllabusCode } : null,
  }));
}

function render() {
  const authored = T25_ATOMIC_CARDS.length;
  const nextSpec = T25_MSTAT_120_ROUTE.find(spec => !authoredByOrder.has(spec.routeOrder)) || null;
  const nextText = nextSpec
    ? `Next unauthored: ${routeNo(nextSpec.routeOrder)} · ${nextSpec.syllabusCode} · ${nextSpec.title}.`
    : "All 120 cards have individually authored contracts.";

  layer.innerHTML = `
    <details class="t25-atomic-box" open>
      <summary><strong>MSTAT-120 · canonical 001→120 study route</strong> · audit ${esc(T25_ATOMIC_AUDIT_VERSION)}</summary>
      <p class="t25-muted"><strong>Primary chronology:</strong> study by the global number below. ARC801, ARC905, etc. are stable parent/context IDs only and are intentionally not numerically chronological.</p>
      <p class="t25-muted"><strong>Authoring progress:</strong> ${authored} / ${T25_MSTAT_120_ROUTE.length} cards individually authored. ${esc(nextText)}</p>
      <label>Atomic study position
        <select id="t25AtomicRouteSelect">${T25_MSTAT_120_ROUTE.map(routeOption).join("")}</select>
      </label>
      <div class="t25-actions">
        <button type="button" id="t25AtomicPrev">← Previous</button>
        <button type="button" id="t25AtomicNext">Next →</button>
      </div>
      <p id="t25AtomicSummary" class="t25-eyebrow"></p>
      <p id="t25AtomicStatus" class="t25-muted"></p>
      <p id="t25AtomicParentContext" class="t25-muted"></p>
      <label>Copy-ready atomic card
        <textarea id="t25AtomicCardText" rows="28" readonly></textarea>
      </label>
      <div class="t25-actions">
        <button type="button" id="t25AtomicCopy">Copy authored atomic card</button>
        <a href="${LAMBDA_COMPILER_URL}" target="_blank" rel="noopener noreferrer">Open λ Compiler</a>
        <a href="${LAMBDA_EXTRACTOR_URL}" target="_blank" rel="noopener noreferrer">Open λ ARC Extractor</a>
      </div>
      <p class="t25-muted"><strong>Workflow:</strong> 001→120 atomic route → one authored card → λ Compiler → frozen ω SPIRE runtime → study → λ ARC Extractor.</p>
      <p class="t25-muted">The parent grouping below follows the selected atomic position automatically. Parent completion and atomic clearance remain separate.</p>
    </details>`;

  document.getElementById("t25AtomicRouteSelect").addEventListener("change", event => {
    selectedOrder = Number(event.target.value);
    renderCardBody({ sync: true });
  });
  document.getElementById("t25AtomicPrev").addEventListener("click", () => {
    if (selectedOrder <= 1) return;
    selectedOrder -= 1;
    renderCardBody({ sync: true });
  });
  document.getElementById("t25AtomicNext").addEventListener("click", () => {
    if (selectedOrder >= T25_MSTAT_120_ROUTE.length) return;
    selectedOrder += 1;
    renderCardBody({ sync: true });
  });
  document.getElementById("t25AtomicCopy").addEventListener("click", async () => {
    const card = authoredByOrder.get(selectedOrder);
    const text = document.getElementById("t25AtomicCardText");
    const status = document.getElementById("t25Status");
    if (!card) {
      if (status) status.textContent = `Route ${routeNo(selectedOrder)} is planned but not authored yet. No placeholder was copied.`;
      return;
    }
    try {
      await navigator.clipboard.writeText(text.value);
      if (status) status.textContent = `${card.id} copied. Compile this one bounded atomic card.`;
    } catch {
      text.focus();
      text.select();
      if (status) status.textContent = "Clipboard unavailable. The authored atomic card is selected; copy it manually.";
    }
  });

  renderCardBody({ sync: true });
}

// Parent changes are allowed for evidence/context browsing, but they do not rewrite
// the global atomic chronology. Re-selecting an atomic position will re-sync context.
unitSelect.addEventListener("change", () => {
  const context = document.getElementById("t25AtomicParentContext");
  const spec = T25_MSTAT_120_ROUTE[selectedOrder - 1];
  if (context && spec) context.textContent = `Secondary parent context: ${parentDisplay(spec.parentId)}. Parent numbering does not control chronology.`;
});

document.addEventListener("chrono:t25-plan-changed", () => {
  queueMicrotask(() => renderCardBody({ sync: true }));
});

render();
