import { WORLD } from "./data/world.js";
import {
  ARC_STATUSES,
  ARC_VISIBILITIES,
  SECTION_TYPES,
  IndexedDbArcRepository,
  seedArcDocument,
} from "./data/arc-store.js";

const repository = new IndexedDbArcRepository();
const nodes = [...WORLD.nodes].sort(
  (a, b) => (a.playOrder || 99999) - (b.playOrder || 99999) || a.id.localeCompare(b.id),
);
const nodeById = new Map(nodes.map((node) => [node.id, node]));

const el = (id) => document.getElementById(id);
const arcSearch = el("vaultArcSearch");
const arcSelect = el("vaultArcSelect");
const titleInput = el("vaultTitle");
const statusSelect = el("vaultDocStatus");
const visibilitySelect = el("vaultVisibility");
const conclusionInput = el("vaultConclusion");
const experienceInput = el("vaultExperience");
const sectionsBox = el("vaultSections");
const revisionNote = el("vaultRevisionNote");
const revisionSelect = el("vaultRevisionSelect");
const statusBox = el("vaultStatus");
const metaBox = el("vaultMeta");

let currentDocument = null;
let dirty = false;
let loading = false;

function option(value, label) {
  const item = document.createElement("option");
  item.value = value;
  item.textContent = label;
  return item;
}

function setStatus(message, kind = "") {
  statusBox.textContent = message;
  statusBox.className = `vault-status${kind ? ` ${kind}` : ""}`;
}

function setDirty(value = true) {
  dirty = value;
  el("vaultDirty").textContent = dirty ? "Unsaved changes" : "Saved";
  el("vaultDirty").className = `pill${dirty ? " vault-dirty" : ""}`;
}

function searchable(node) {
  return [
    node.id,
    node.arc,
    node.title,
    node.summary,
    ...(node.domains || []),
  ]
    .join(" ")
    .toLowerCase();
}

function populateArcSelect(query = "") {
  const wanted = String(query || "").trim().toLowerCase();
  const previous = arcSelect.value || currentDocument?.arcId;
  const matches = wanted ? nodes.filter((node) => searchable(node).includes(wanted)) : nodes;
  arcSelect.innerHTML = "";
  for (const node of matches) {
    arcSelect.appendChild(option(node.id, `${node.arc || node.id} · ${node.title}`));
  }
  if (previous && matches.some((node) => node.id === previous)) arcSelect.value = previous;
  el("vaultMatchCount").textContent = `${matches.length} registry node${matches.length === 1 ? "" : "s"}`;
}

function fillStaticSelect(select, values) {
  select.innerHTML = "";
  values.forEach((value) => select.appendChild(option(value, value)));
}

function updateMeta(node, doc) {
  metaBox.innerHTML = "";
  const rows = [
    ["Stable ID", node.id],
    ["Canonical label", doc.canonicalLabel],
    ["Registry kind", node.kind || "—"],
    ["Registry level", node.level || "—"],
    ["Revision", String(doc.revision || 0)],
    ["Updated", doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "Not saved yet"],
  ];
  for (const [key, value] of rows) {
    const k = document.createElement("div");
    const v = document.createElement("div");
    k.textContent = key;
    v.textContent = value;
    metaBox.append(k, v);
  }
}

function makeSection(section) {
  const card = document.createElement("article");
  card.className = "vault-section";
  card.dataset.sectionId = section.id;

  const top = document.createElement("div");
  top.className = "vault-section-top";

  const type = document.createElement("select");
  type.className = "vault-section-type";
  SECTION_TYPES.forEach((value) => type.appendChild(option(value, value)));
  type.value = section.type;
  type.setAttribute("aria-label", "Section type");

  const visibility = document.createElement("select");
  visibility.className = "vault-section-visibility";
  ARC_VISIBILITIES.forEach((value) => visibility.appendChild(option(value, value)));
  visibility.value = section.visibility;
  visibility.setAttribute("aria-label", "Section visibility");

  const up = document.createElement("button");
  up.type = "button";
  up.textContent = "↑";
  up.title = "Move section up";
  up.addEventListener("click", () => {
    const previous = card.previousElementSibling;
    if (previous) {
      sectionsBox.insertBefore(card, previous);
      setDirty();
    }
  });

  const down = document.createElement("button");
  down.type = "button";
  down.textContent = "↓";
  down.title = "Move section down";
  down.addEventListener("click", () => {
    const next = card.nextElementSibling;
    if (next) {
      sectionsBox.insertBefore(next, card);
      setDirty();
    }
  });

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "ghost";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => {
    if (confirm(`Remove section “${heading.value || "Untitled section"}” from this draft?`)) {
      card.remove();
      setDirty();
    }
  });

  top.append(type, visibility, up, down, remove);

  const headingLabel = document.createElement("label");
  headingLabel.textContent = "Heading";
  const heading = document.createElement("input");
  heading.type = "text";
  heading.className = "vault-section-heading";
  heading.value = section.heading;
  headingLabel.appendChild(heading);

  const contentLabel = document.createElement("label");
  contentLabel.textContent = "Markdown / LaTeX content";
  const content = document.createElement("textarea");
  content.className = "vault-section-content";
  content.value = section.contentMarkdown;
  content.placeholder = "Write Markdown here. LaTeX remains plain text until rendered by the reader view.";
  contentLabel.appendChild(content);

  [type, visibility, heading, content].forEach((control) => {
    control.addEventListener("input", () => setDirty());
    control.addEventListener("change", () => setDirty());
  });

  card.append(top, headingLabel, contentLabel);
  return card;
}

function renderSections(sections) {
  sectionsBox.innerHTML = "";
  sections.forEach((section) => sectionsBox.appendChild(makeSection(section)));
}

function collectDocument() {
  if (!currentDocument) throw new Error("No ARC is open.");
  const sections = [...sectionsBox.querySelectorAll(".vault-section")].map((card, position) => ({
    id: card.dataset.sectionId,
    type: card.querySelector(".vault-section-type").value,
    heading: card.querySelector(".vault-section-heading").value,
    contentMarkdown: card.querySelector(".vault-section-content").value,
    visibility: card.querySelector(".vault-section-visibility").value,
    position,
  }));
  return {
    ...currentDocument,
    title: titleInput.value,
    status: statusSelect.value,
    visibility: visibilitySelect.value,
    shortConclusion: conclusionInput.value,
    experience: experienceInput.value,
    sections,
  };
}

async function renderRevisions(arcId) {
  const revisions = await repository.listRevisions(arcId);
  revisionSelect.innerHTML = "";
  if (!revisions.length) {
    revisionSelect.appendChild(option("", "No saved revisions yet"));
    revisionSelect.disabled = true;
    el("vaultRestore").disabled = true;
    return;
  }
  revisionSelect.disabled = false;
  el("vaultRestore").disabled = false;
  for (const revision of revisions) {
    const stamp = new Date(revision.createdAt).toLocaleString();
    revisionSelect.appendChild(
      option(revision.revisionId, `v${revision.revision} · ${revision.note} · ${stamp}`),
    );
  }
}

async function openArc(arcId, { force = false } = {}) {
  if (!force && dirty && currentDocument && currentDocument.arcId !== arcId) {
    const discard = confirm("This ARC has unsaved changes. Switch ARCs and discard those unsaved edits?");
    if (!discard) {
      arcSelect.value = currentDocument.arcId;
      return;
    }
  }

  const node = nodeById.get(arcId);
  if (!node) return;
  loading = true;
  try {
    const saved = await repository.load(arcId);
    currentDocument = saved || seedArcDocument(node);
    titleInput.value = currentDocument.title;
    statusSelect.value = currentDocument.status;
    visibilitySelect.value = currentDocument.visibility;
    conclusionInput.value = currentDocument.shortConclusion;
    experienceInput.value = currentDocument.experience;
    renderSections(currentDocument.sections);
    updateMeta(node, currentDocument);
    await renderRevisions(arcId);
    setDirty(false);
    setStatus(
      saved
        ? `Opened ${currentDocument.canonicalLabel} revision ${currentDocument.revision}.`
        : `Started an unsaved editable document for ${currentDocument.canonicalLabel}.`,
      saved ? "good" : "warn",
    );
  } catch (error) {
    console.error(error);
    setStatus(`Could not open ARC: ${error.message}`, "bad");
  } finally {
    loading = false;
  }
}

async function saveCurrent() {
  if (!currentDocument) return;
  try {
    setStatus("Saving…");
    const saved = await repository.save(
      collectDocument(),
      revisionNote.value.trim() || "Edited in Vault",
    );
    currentDocument = saved;
    revisionNote.value = "";
    updateMeta(nodeById.get(saved.arcId), saved);
    await renderRevisions(saved.arcId);
    setDirty(false);
    setStatus(`Saved ${saved.canonicalLabel} as revision ${saved.revision}.`, "good");
  } catch (error) {
    console.error(error);
    setStatus(`Save failed: ${error.message}`, "bad");
  }
}

function addSection() {
  const id = globalThis.crypto?.randomUUID
    ? crypto.randomUUID()
    : `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  sectionsBox.appendChild(
    makeSection({
      id,
      type: "notes",
      heading: "New section",
      contentMarkdown: "",
      visibility: visibilitySelect.value || "private",
    }),
  );
  setDirty();
  sectionsBox.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function downloadJson(filename, value) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function restoreSelectedRevision() {
  if (!currentDocument || !revisionSelect.value) return;
  const label = revisionSelect.selectedOptions[0]?.textContent || "selected revision";
  if (!confirm(`Restore ${label}? The current state will remain in history; restore creates a new revision.`)) {
    return;
  }
  try {
    const restored = await repository.restoreRevision(currentDocument.arcId, revisionSelect.value);
    currentDocument = restored;
    await openArc(restored.arcId, { force: true });
    setStatus(`Restored an earlier snapshot as new revision ${restored.revision}.`, "good");
  } catch (error) {
    console.error(error);
    setStatus(`Restore failed: ${error.message}`, "bad");
  }
}

async function importJson(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (!nodeById.has(parsed.arcId)) {
      throw new Error(`Unknown stable ARC ID “${parsed.arcId || "missing"}”. Add it to the World Registry first.`);
    }
    const saved = await repository.importDocument(parsed, `Imported ${file.name}`);
    arcSearch.value = "";
    populateArcSelect();
    arcSelect.value = saved.arcId;
    await openArc(saved.arcId, { force: true });
    setStatus(`Imported ${file.name} as revision ${saved.revision}.`, "good");
  } catch (error) {
    console.error(error);
    setStatus(`Import failed: ${error.message}`, "bad");
  }
}

fillStaticSelect(statusSelect, ARC_STATUSES);
fillStaticSelect(visibilitySelect, ARC_VISIBILITIES);
populateArcSelect();

const preferred = nodeById.has("ARC005") ? "ARC005" : nodes[0]?.id;
if (preferred) arcSelect.value = preferred;

arcSearch.addEventListener("input", () => populateArcSelect(arcSearch.value));
arcSelect.addEventListener("change", () => openArc(arcSelect.value));

[titleInput, statusSelect, visibilitySelect, conclusionInput, experienceInput].forEach((control) => {
  control.addEventListener("input", () => !loading && setDirty());
  control.addEventListener("change", () => !loading && setDirty());
});

el("vaultSave").addEventListener("click", saveCurrent);
el("vaultAddSection").addEventListener("click", addSection);
el("vaultRestore").addEventListener("click", restoreSelectedRevision);
el("vaultExport").addEventListener("click", () => {
  if (!currentDocument) return;
  const doc = collectDocument();
  downloadJson(`${doc.arcId.toLowerCase()}-document.json`, doc);
});
el("vaultImportBtn").addEventListener("click", () => el("vaultImportFile").click());
el("vaultImportFile").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (file) await importJson(file);
  event.target.value = "";
});

// Keep the existing three-tab router untouched for now. This listener owns only
// Vault visibility, so the legacy route/explore/story behavior remains stable.
document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", async () => {
    const isVault = button.dataset.tab === "vault";
    el("vaultTab").style.display = isVault ? "block" : "none";
    if (isVault && !currentDocument && arcSelect.value) await openArc(arcSelect.value);
  });
});

window.addEventListener("beforeunload", (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = "";
});
