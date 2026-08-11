import "./vault-reader.js";
import { WORLD } from "./data/world.js";
import {
  arcDocumentToMarkdown,
  parseArcMarkdown,
} from "./data/markdown-arc.js";
import { loadArcVaultSetupSql } from "./data/supabase-arc-store.js";

const nodeById = new Map(WORLD.nodes.map((node) => [node.id, node]));
const el = (id) => document.getElementById(id);

function downloadText(filename, text, type = "text/markdown") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setVaultStatus(message, kind = "warn") {
  const box = el("vaultStatus");
  if (!box) return;
  box.textContent = message;
  box.className = `vault-status ${kind}`;
}

function collectEditorDocument() {
  const arcId = el("vaultArcSelect")?.value;
  const node = nodeById.get(arcId);
  if (!arcId || !node) throw new Error("Open a World Registry ARC first.");
  const sections = [...document.querySelectorAll("#vaultSections .vault-section")].map(
    (card, position) => ({
      id: card.dataset.sectionId,
      type: card.querySelector(".vault-section-type")?.value || "notes",
      heading: card.querySelector(".vault-section-heading")?.value || "Untitled section",
      contentMarkdown: card.querySelector(".vault-section-content")?.value || "",
      visibility: card.querySelector(".vault-section-visibility")?.value || "private",
      position,
    }),
  );
  return {
    schemaVersion: 1,
    arcId,
    canonicalLabel: String(node.arc || node.id),
    title: el("vaultTitle")?.value || node.title || node.arc || node.id,
    status: el("vaultDocStatus")?.value || "raw",
    visibility: el("vaultVisibility")?.value || "private",
    shortConclusion: el("vaultConclusion")?.value || "",
    experience: el("vaultExperience")?.value || "",
    sections,
    revision: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function dispatchDirty() {
  const title = el("vaultTitle");
  if (title) title.dispatchEvent(new Event("input", { bubbles: true }));
}

function applyMarkdownDraft(parsed) {
  const selectedArcId = el("vaultArcSelect")?.value;
  if (!selectedArcId) throw new Error("Open the target ARC first.");
  if (parsed.arcId && parsed.arcId !== selectedArcId) {
    throw new Error(
      `${parsed.arcId} is encoded in this Markdown, but ${selectedArcId} is open. Select ${parsed.arcId} first, then import again.`,
    );
  }

  if (
    !confirm(
      `Load this Markdown into the unsaved ${selectedArcId} editor draft? Existing editor fields will be replaced, but nothing is saved until you press “Save revision”.`,
    )
  ) {
    return false;
  }

  if (parsed.title) el("vaultTitle").value = parsed.title;
  el("vaultDocStatus").value = parsed.status || "raw";
  el("vaultVisibility").value = parsed.visibility || "private";
  el("vaultConclusion").value = parsed.shortConclusion || "";
  el("vaultExperience").value = parsed.experience || "";

  const sectionsBox = el("vaultSections");
  sectionsBox.innerHTML = "";
  for (const section of parsed.sections) {
    el("vaultAddSection").click();
    const card = sectionsBox.lastElementChild;
    if (!card) continue;
    card.querySelector(".vault-section-type").value = section.type;
    card.querySelector(".vault-section-visibility").value = section.visibility;
    card.querySelector(".vault-section-heading").value = section.heading;
    card.querySelector(".vault-section-content").value = section.contentMarkdown;
  }
  dispatchDirty();
  return true;
}

function updateStorageBadge() {
  const repository = globalThis.chronoArcRepository;
  const pills = document.querySelector("#vaultTab > .panel .pills");
  if (!repository || !pills) return;
  let badge = el("vaultStorageMode");
  if (!badge) {
    badge = pills.querySelector(".pill:first-child");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "pill";
      pills.prepend(badge);
    }
    badge.id = "vaultStorageMode";
  }
  const state = repository.state();
  if (state.mode === "cloud") {
    badge.textContent = `☁ Vault: Supabase${state.cloudEmail ? ` · ${state.cloudEmail}` : ""}`;
    badge.title = "ARC saves and revision history are using Supabase; the latest document is mirrored locally.";
  } else {
    badge.textContent = "Vault: local fallback";
    badge.title = state.warning || "ARC documents are currently stored in IndexedDB on this device.";
  }
}

function installMarkdownControls() {
  const sidebar = document.querySelector("#vaultTab .vault-sidebar");
  if (!sidebar || el("vaultImportMarkdownBtn")) return;
  const firstActions = sidebar.querySelector(".vault-actions");
  if (!firstActions) return;

  const exportMarkdown = document.createElement("button");
  exportMarkdown.id = "vaultExportMarkdown";
  exportMarkdown.type = "button";
  exportMarkdown.textContent = "Export ARC .md";
  exportMarkdown.addEventListener("click", () => {
    try {
      const documentValue = collectEditorDocument();
      downloadText(`${documentValue.arcId.toLowerCase()}.md`, arcDocumentToMarkdown(documentValue));
      setVaultStatus(`Exported ${documentValue.arcId} as Markdown.`, "good");
    } catch (error) {
      setVaultStatus(`Markdown export failed: ${error.message}`, "bad");
    }
  });

  const importMarkdown = document.createElement("button");
  importMarkdown.id = "vaultImportMarkdownBtn";
  importMarkdown.type = "button";
  importMarkdown.textContent = "Import ARC .md";

  const fileInput = document.createElement("input");
  fileInput.id = "vaultImportMarkdownFile";
  fileInput.type = "file";
  fileInput.accept = ".md,.markdown,text/markdown,text/plain";
  fileInput.className = "hidden";

  importMarkdown.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = parseArcMarkdown(await file.text(), {
        fallbackArcId: el("vaultArcSelect")?.value,
        filename: file.name,
      });
      if (applyMarkdownDraft(parsed)) {
        setVaultStatus(
          `Loaded ${file.name} into the unsaved editor draft. Review the sections, then press Save revision.`,
          "good",
        );
      }
    } catch (error) {
      console.error(error);
      setVaultStatus(`Markdown import failed: ${error.message}`, "bad");
    } finally {
      event.target.value = "";
    }
  });

  firstActions.append(exportMarkdown, importMarkdown, fileInput);
}

function installCloudSetup() {
  const sidebar = document.querySelector("#vaultTab .vault-sidebar");
  if (!sidebar || el("vaultCloudSetup")) return;

  const details = document.createElement("details");
  details.id = "vaultCloudSetup";
  details.className = "vault-cloud-setup";
  const summary = document.createElement("summary");
  summary.textContent = "☁ ARC cloud storage setup";
  details.appendChild(summary);

  const note = document.createElement("p");
  note.className = "vault-note";
  note.textContent =
    "Run this SQL once in the same Supabase project used by Cross-device cloud sync. The browser keeps only the public project key plus your signed-in session; RLS restricts rows to your user ID.";

  const textarea = document.createElement("textarea");
  textarea.id = "vaultCloudSql";
  textarea.className = "sync-sql";
  textarea.readOnly = true;
  textarea.value = "Loading supabase/arc-vault.sql…";

  const copy = document.createElement("button");
  copy.type = "button";
  copy.textContent = "Copy ARC Vault SQL";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      setVaultStatus("ARC Vault SQL copied.", "good");
    } catch {
      textarea.select();
      setVaultStatus("Clipboard permission was blocked; the SQL is selected for manual copying.", "warn");
    }
  });

  details.append(note, textarea, copy);
  const firstDivider = sidebar.querySelector(".vault-divider");
  sidebar.insertBefore(details, firstDivider || sidebar.firstChild);

  loadArcVaultSetupSql()
    .then((sql) => {
      textarea.value = sql;
    })
    .catch((error) => {
      textarea.value = `Could not load SQL: ${error.message}`;
    });
}

function currentOpenArcId() {
  const meta = el("vaultMeta");
  if (!meta) return "";
  const children = [...meta.children];
  for (let index = 0; index < children.length - 1; index += 2) {
    if (children[index].textContent?.trim() === "Stable ID") {
      return children[index + 1].textContent?.trim() || "";
    }
  }
  return "";
}

function installFilteredArcAutoOpen() {
  const search = el("vaultArcSearch");
  const select = el("vaultArcSelect");
  if (!search || !select || search.dataset.arcAutoOpenInstalled === "1") return;
  search.dataset.arcAutoOpenInstalled = "1";

  search.addEventListener("input", () => {
    queueMicrotask(() => {
      if (select.options.length !== 1) return;
      const onlyArcId = select.options[0]?.value || "";
      if (!onlyArcId || onlyArcId === currentOpenArcId()) return;
      select.value = onlyArcId;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

function init() {
  installMarkdownControls();
  installCloudSetup();
  installFilteredArcAutoOpen();
  updateStorageBadge();

  const status = el("vaultStatus");
  if (status) {
    const observer = new MutationObserver(updateStorageBadge);
    observer.observe(status, { childList: true, subtree: true, characterData: true });
  }

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.tab === "vault") setTimeout(updateStorageBadge, 0);
    });
  });
}

queueMicrotask(init);
