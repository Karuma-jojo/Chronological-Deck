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
const terminalSelect = document.getElementById("terminalSelect");
const planSelect = document.getElementById("t25Plan");
const routeGraph = document.getElementById("routeGraph");
const routeSearch = document.getElementById("routeSearch");
const routeFilter = document.getElementById("routeFilter");
const legend = document.querySelector("#routeTab .legend");
const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailTags = document.getElementById("detailTags");
const detailKV = document.getElementById("detailKV");
const nodeControls = document.getElementById("nodeControls");

if (!panel || !unitSelect || !contract || !unitLabel || !routeGraph) {
  throw new Error("T25 atomic-card UI requires the T25 panel, unit selector, contract container and route graph.");
}

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#39;", "'": "&#39;",
}[c]));
const routeNo = value => String(value).padStart(3, "0");
const authoredByOrder = T25_ATOMIC_BY_ORDER;
const SELECT_KEY = "chrono_t25_mstat120_selected_v1";
const SVG_NS = "http://www.w3.org/2000/svg";

const LAMBDA_COMPILER_URL = "./prompts/%CE%BB-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md";
const LAMBDA_EXTRACTOR_URL = "./prompts/%CE%BB-ARC-Extractor-T25-CANONICAL.md";

const originalLegend = legend?.innerHTML || "";
const atomicSections = [
  [1, 7, "Foundation"],
  [8, 14, "Algebra, sequences & trigonometry"],
  [15, 27, "Counting & discrete probability"],
  [28, 40, "Linear algebra & complex structure"],
  [41, 54, "Calculus & inequalities"],
  [55, 71, "Continuous & joint probability"],
  [72, 82, "Descriptive, order & limit theory"],
  [83, 97, "Estimation & regression"],
  [98, 106, "Testing & intervals"],
  [107, 117, "Survey sampling & design"],
  [118, 120, "Geometry breadth"],
];

function sectionFor(order) {
  return atomicSections.find(([start, end]) => order >= start && order <= end)?.[2] || "MSTAT-120";
}

function isMstatAtomicMap() {
  return terminalSelect?.value === "T25" && (!planSelect || planSelect.value === "mstat");
}

function readSelectedOrder() {
  try {
    const value = Number(localStorage.getItem(SELECT_KEY));
    if (Number.isInteger(value) && value >= 1 && value <= T25_MSTAT_120_ROUTE.length) return value;
  } catch {}
  return T25_ATOMIC_CARDS[0]?.routeOrder || 1;
}

function saveSelectedOrder() {
  try { localStorage.setItem(SELECT_KEY, String(selectedOrder)); } catch {}
}

function ensureStyles() {
  if (document.getElementById("t25AtomicMapStyles")) return;
  const style = document.createElement("style");
  style.id = "t25AtomicMapStyles";
  style.textContent = `
    #routeGraph .t25-atomic-map-node rect{rx:9;ry:9;stroke-width:1.2}
    #routeGraph .t25-atomic-map-node.authored rect{fill:color-mix(in srgb,var(--green) 8%,var(--panel2));stroke:color-mix(in srgb,var(--green) 52%,var(--border))}
    #routeGraph .t25-atomic-map-node.planned rect{fill:color-mix(in srgb,var(--panel2) 88%,transparent);stroke:var(--border)}
    #routeGraph .t25-atomic-map-node.planned{opacity:.64}
    #routeGraph .t25-atomic-map-node.selected rect{stroke:var(--accent)!important;stroke-width:2.2}
    #routeGraph .t25-atomic-map-node.searchdim{opacity:.14}
    #routeGraph .t25-atomic-map-node .atomic-code{font-size:10px;fill:var(--text);font-weight:760}
    #routeGraph .t25-atomic-map-node .atomic-title{font-size:9px;fill:var(--text);font-weight:620}
    #routeGraph .t25-atomic-map-node .atomic-meta{font-size:7.5px;fill:var(--muted)}
    #routeGraph .t25-atomic-column{font-size:10px;fill:var(--muted);font-weight:700;text-anchor:middle}
    #routeGraph .t25-atomic-map-heading{font-size:15px;fill:var(--text);font-weight:800}
    #routeGraph .t25-atomic-map-sub{font-size:9px;fill:var(--muted)}
    #detailKV .t25-atomic-detail-actions{grid-column:1/-1;display:flex;gap:7px;flex-wrap:wrap;margin-top:4px}
    #detailKV .t25-atomic-detail-actions button{border:1px solid var(--border);background:var(--panel2);color:var(--text);border-radius:7px;padding:5px 8px;cursor:pointer}
  `;
  document.head.appendChild(style);
}

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

let selectedOrder = readSelectedOrder();

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

function titleLines(title, max = 29) {
  const words = String(title).split(/\s+/);
  const out = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= max || !line) line = next;
    else { out.push(line); line = word; }
  }
  if (line) out.push(line);
  if (out.length <= 2) return out;
  return [out[0], `${out.slice(1).join(" ").slice(0, max - 1)}…`];
}

function renderAtomicDetail() {
  if (!isMstatAtomicMap() || !detailTitle || !detailSummary || !detailTags || !detailKV) return;
  const spec = T25_MSTAT_120_ROUTE[selectedOrder - 1];
  if (!spec) return;
  const card = authoredByOrder.get(selectedOrder) || null;

  detailTitle.textContent = `${routeNo(spec.routeOrder)} · ${spec.syllabusCode} · ${spec.title}`;
  detailSummary.textContent = card
    ? card.centralCapability
    : "This study position is fixed in the canonical route, but its full atomic learning contract has not yet been individually authored and audited.";
  detailTags.innerHTML = "";
  for (const [text, cls] of [
    [card ? "authored" : "planned", card ? "existing" : "term"],
    [spec.syllabusCode, "term"],
    [spec.parentId, "term"],
    [sectionFor(spec.routeOrder), "term"],
  ]) {
    const span = document.createElement("span");
    span.className = `tag ${cls}`;
    span.textContent = text;
    detailTags.appendChild(span);
  }
  nodeControls?.classList.add("hidden");

  detailKV.innerHTML = card ? `
    <div>Route</div><div>${routeNo(spec.routeOrder)} / 120</div>
    <div>Status</div><div>AUTHORED · ready for λ compilation</div>
    <div>Parent context</div><div>${esc(parentDisplay(spec.parentId))}</div>
    <div>Focus</div><div>${esc(card.focus)}</div>
    <div>Principal obstacle</div><div>${esc(card.principalObstacle)}</div>
    <div>Exit condition</div><div>${esc(card.exitCondition)}</div>
    <div class="t25-atomic-detail-actions"><button type="button" id="t25AtomicDetailOpen">Open full atomic card</button><button type="button" id="t25AtomicDetailCopy">Copy atomic card</button></div>` : `
    <div>Route</div><div>${routeNo(spec.routeOrder)} / 120</div>
    <div>Status</div><div>PLANNED · no generic placeholder</div>
    <div>Parent context</div><div>${esc(parentDisplay(spec.parentId))}</div>
    <div>Section</div><div>${esc(sectionFor(spec.routeOrder))}</div>
    <div>Authoring</div><div>This position will become clickable study content only after its bounded contract is individually authored and audited.</div>
    <div class="t25-atomic-detail-actions"><button type="button" id="t25AtomicDetailOpen">Show route position below</button></div>`;

  document.getElementById("t25AtomicDetailOpen")?.addEventListener("click", () => {
    layer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("t25AtomicDetailCopy")?.addEventListener("click", async () => {
    if (!card) return;
    try { await navigator.clipboard.writeText(atomicCardText(card)); }
    catch { layer.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
}

function setMapChrome(active) {
  if (routeFilter) {
    routeFilter.disabled = active;
    routeFilter.title = active ? "Parent-node filters do not apply to the MSTAT-120 atomic map." : "";
  }
  for (const id of ["highlightCore", "highlightPrereqs", "clearHighlight"]) {
    const button = document.getElementById(id);
    if (button) button.disabled = active;
  }
  if (legend) {
    legend.innerHTML = active
      ? `<span><i style="background:var(--green)"></i>authored atomic card</span><span><i style="background:var(--muted)"></i>planned route position</span><span><i style="background:var(--accent)"></i>selected</span>`
      : originalLegend;
  }
}

function renderAtomicMap() {
  if (!isMstatAtomicMap()) {
    setMapChrome(false);
    return;
  }
  setMapChrome(true);
  ensureStyles();

  [...routeGraph.querySelectorAll(".render")].forEach(el => el.remove());
  const columns = 5;
  const perColumn = Math.ceil(T25_MSTAT_120_ROUTE.length / columns);
  const nodeW = 198;
  const nodeH = 58;
  const gapX = 16;
  const gapY = 9;
  const left = 18;
  const top = 92;
  const width = 1120;
  const rows = perColumn;
  const height = top + rows * (nodeH + gapY) + 40;
  const search = (routeSearch?.value || "").toLowerCase().trim();

  routeGraph.setAttribute("viewBox", `0 0 ${width} ${height}`);
  routeGraph.style.minWidth = `${width}px`;
  routeGraph.style.height = `${height}px`;

  const headingText = document.createElementNS(SVG_NS, "text");
  headingText.setAttribute("x", "18");
  headingText.setAttribute("y", "24");
  headingText.setAttribute("class", "t25-atomic-map-heading render");
  headingText.textContent = "MSTAT-120 · click any atomic study position";
  routeGraph.appendChild(headingText);

  const sub = document.createElementNS(SVG_NS, "text");
  sub.setAttribute("x", "18");
  sub.setAttribute("y", "43");
  sub.setAttribute("class", "t25-atomic-map-sub render");
  sub.textContent = `${T25_ATOMIC_CARDS.length}/120 individually authored · parent ARC IDs are context only · search works on number, code, title or parent`;
  routeGraph.appendChild(sub);

  for (let ci = 0; ci < columns; ci += 1) {
    const start = ci * perColumn + 1;
    const end = Math.min((ci + 1) * perColumn, T25_MSTAT_120_ROUTE.length);
    const x = left + ci * (nodeW + gapX);
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("x", String(x + nodeW / 2));
    label.setAttribute("y", "70");
    label.setAttribute("class", "t25-atomic-column render");
    label.textContent = `${routeNo(start)}–${routeNo(end)}`;
    routeGraph.appendChild(label);
  }

  for (const spec of T25_MSTAT_120_ROUTE) {
    const index = spec.routeOrder - 1;
    const ci = Math.floor(index / perColumn);
    const ri = index % perColumn;
    const x = left + ci * (nodeW + gapX);
    const y = top + ri * (nodeH + gapY);
    const authored = authoredByOrder.has(spec.routeOrder);
    const haystack = `${routeNo(spec.routeOrder)} ${spec.syllabusCode} ${spec.title} ${spec.parentId} ${sectionFor(spec.routeOrder)}`.toLowerCase();

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", `node render t25-atomic-map-node ${authored ? "authored" : "planned"}${selectedOrder === spec.routeOrder ? " selected" : ""}${search && !haystack.includes(search) ? " searchdim" : ""}`);
    group.setAttribute("transform", `translate(${x},${y})`);
    group.dataset.atomicOrder = String(spec.routeOrder);
    group.style.cursor = "pointer";
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${routeNo(spec.routeOrder)} ${spec.syllabusCode}: ${spec.title}; ${authored ? "authored" : "planned"}`);

    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("width", String(nodeW));
    rect.setAttribute("height", String(nodeH));
    group.appendChild(rect);

    const code = document.createElementNS(SVG_NS, "text");
    code.setAttribute("x", "8");
    code.setAttribute("y", "14");
    code.setAttribute("class", "atomic-code");
    code.textContent = `${routeNo(spec.routeOrder)} · ${spec.syllabusCode}`;
    group.appendChild(code);

    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", String(nodeW - 10));
    dot.setAttribute("cy", "10");
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", authored ? "var(--green)" : "var(--muted)");
    group.appendChild(dot);

    titleLines(spec.title).forEach((line, i) => {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("x", "8");
      text.setAttribute("y", String(29 + i * 10));
      text.setAttribute("class", "atomic-title");
      text.textContent = line;
      group.appendChild(text);
    });

    const meta = document.createElementNS(SVG_NS, "text");
    meta.setAttribute("x", "8");
    meta.setAttribute("y", "53");
    meta.setAttribute("class", "atomic-meta");
    meta.textContent = `${spec.parentId} · ${authored ? "AUTHORED" : "PLANNED"}`;
    group.appendChild(meta);

    const choose = () => chooseOrder(spec.routeOrder, { sync: true });
    group.addEventListener("click", choose);
    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose();
      }
    });
    routeGraph.appendChild(group);
  }

  // app.js renders the parent graph first; this atomic overlay is the learner-facing
  // T25 map. Keep the parent route intact in data so prerequisites/evidence still work.
  renderAtomicDetail();
}

function renderCardBody({ sync = false } = {}) {
  const spec = T25_MSTAT_120_ROUTE[selectedOrder - 1];
  if (!spec) return;
  const card = authoredByOrder.get(selectedOrder) || null;
  if (sync) syncParent(spec);

  layer.dataset.selectedAtomicId = card?.id || "";
  layer.dataset.selectedParentId = spec.parentId;
  layer.dataset.selectedOrder = String(spec.routeOrder);

  const routeSelect = document.getElementById("t25AtomicRouteSelect");
  if (routeSelect) routeSelect.value = String(selectedOrder);
  const legacyAtomicSelect = document.getElementById("t25AtomicSelect");
  if (legacyAtomicSelect) legacyAtomicSelect.value = card?.id || "";

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

  renderAtomicMap();
  renderAtomicDetail();
  document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected", {
    detail: card ? { id: card.id, parentId: card.parentId, routeOrder: card.routeOrder, syllabusCode: card.syllabusCode } : null,
  }));
}

function chooseOrder(order, { sync = true } = {}) {
  const numeric = Number(order);
  if (!Number.isInteger(numeric) || numeric < 1 || numeric > T25_MSTAT_120_ROUTE.length) return;
  selectedOrder = numeric;
  saveSelectedOrder();
  renderCardBody({ sync });
}

function render() {
  const authored = T25_ATOMIC_CARDS.length;
  const nextSpec = T25_MSTAT_120_ROUTE.find(spec => !authoredByOrder.has(spec.routeOrder)) || null;
  const nextText = nextSpec
    ? `Next unauthored: ${routeNo(nextSpec.routeOrder)} · ${nextSpec.syllabusCode} · ${nextSpec.title}.`
    : "All 120 cards have individually authored contracts.";

  layer.innerHTML = `
    <input type="hidden" id="t25AtomicSelect" value="">
    <details class="t25-atomic-box" open>
      <summary><strong>MSTAT-120 · canonical 001→120 study route</strong> · audit ${esc(T25_ATOMIC_AUDIT_VERSION)}</summary>
      <p class="t25-muted"><strong>Primary navigation:</strong> use the big T25 map below or the global number here. ARC801, ARC905, etc. are stable parent/context IDs only.</p>
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
      <p class="t25-muted"><strong>Workflow:</strong> big map / 001→120 route → one authored card → λ Compiler → frozen ω SPIRE runtime → study → λ ARC Extractor.</p>
      <p class="t25-muted">The parent grouping below follows the selected atomic position automatically. Parent completion and atomic clearance remain separate.</p>
    </details>`;

  document.getElementById("t25AtomicRouteSelect").addEventListener("change", event => chooseOrder(event.target.value));
  document.getElementById("t25AtomicPrev").addEventListener("click", () => chooseOrder(selectedOrder - 1));
  document.getElementById("t25AtomicNext").addEventListener("click", () => chooseOrder(selectedOrder + 1));
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
// the global atomic chronology. Re-selecting an atomic position re-syncs context.
unitSelect.addEventListener("change", () => {
  const context = document.getElementById("t25AtomicParentContext");
  const spec = T25_MSTAT_120_ROUTE[selectedOrder - 1];
  if (context && spec) context.textContent = `Secondary parent context: ${parentDisplay(spec.parentId)}. Parent numbering does not control chronology.`;
});

document.addEventListener("chrono:route-rendered", event => {
  if (event.detail?.terminal === "T25") queueMicrotask(renderAtomicMap);
  else setMapChrome(false);
});

document.addEventListener("chrono:t25-plan-changed", () => {
  queueMicrotask(() => {
    renderCardBody({ sync: true });
    renderAtomicMap();
  });
});

render();
queueMicrotask(renderAtomicMap);
