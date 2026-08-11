import { arcDocumentToMarkdown, parseArcMarkdown } from "./data/markdown-arc.js";

const el = (id) => document.getElementById(id);
const q = (selector, root = document) => root.querySelector(selector);

const MARKED_URL = "https://cdn.jsdelivr.net/npm/marked@18.0.7/lib/marked.umd.js";
const DOMPURIFY_URL = "https://cdn.jsdelivr.net/npm/dompurify@3.4.12/dist/purify.min.js";
const KATEX_URL = "https://cdn.jsdelivr.net/npm/katex@0.18.0/dist/katex.min.js";
const KATEX_AUTORENDER_URL = "https://cdn.jsdelivr.net/npm/katex@0.18.0/dist/contrib/auto-render.min.js";
const KATEX_CSS_URL = "https://cdn.jsdelivr.net/npm/katex@0.18.0/dist/katex.min.css";

let requestedArcId = "";
let libraryDocuments = [];
let readerGeneration = 0;
let rendererPromise = null;

function make(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function ensureStylesheet(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src, id, ready) {
  if (ready()) return Promise.resolve();
  const existing = document.getElementById(id);
  if (existing) {
    return new Promise((resolve, reject) => {
      if (ready()) resolve();
      else {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
      }
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

function ensureRenderer() {
  if (rendererPromise) return rendererPromise;
  ensureStylesheet(KATEX_CSS_URL, "chrono-katex-css");
  rendererPromise = Promise.all([
    loadScript(MARKED_URL, "chrono-marked", () => Boolean(globalThis.marked?.parse)),
    loadScript(DOMPURIFY_URL, "chrono-dompurify", () => Boolean(globalThis.DOMPurify?.sanitize)),
    loadScript(KATEX_URL, "chrono-katex", () => Boolean(globalThis.katex?.render)),
  ]).then(() =>
    loadScript(
      KATEX_AUTORENDER_URL,
      "chrono-katex-autorender",
      () => typeof globalThis.renderMathInElement === "function",
    ),
  );
  return rendererPromise;
}

ensureStylesheet("./css/black-theme.css", "chrono-black-theme");
ensureStylesheet("./css/vault-reader-v4.css", "chrono-vault-reader-v4");

function unquote(value) {
  const text = String(value || "").trim();
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1);
  }
  return text;
}

function extractFrontmatter(markdown) {
  const normalized = String(markdown || "").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { meta: {}, body: normalized };
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) return { meta: {}, body: normalized };
  const meta = {};
  let listKey = "";
  for (const line of normalized.slice(4, end).split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      if (!Array.isArray(meta[listKey])) meta[listKey] = [];
      meta[listKey].push(unquote(item[1]));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) {
      if (line.trim()) listKey = "";
      continue;
    }
    const key = match[1].toLowerCase();
    const raw = match[2].trim();
    if (!raw) {
      meta[key] = [];
      listKey = key;
    } else {
      meta[key] = unquote(raw);
      listKey = "";
    }
  }
  return { meta, body: normalized.slice(end + 5) };
}

function metaValue(meta, key) {
  const value = meta?.[key];
  if (Array.isArray(value)) return value.join(", ");
  return String(value || "").trim();
}

function currentOpenArcId() {
  const meta = el("vaultMeta");
  if (meta) {
    const children = [...meta.children];
    for (let index = 0; index < children.length - 1; index += 2) {
      if (children[index].textContent?.trim() === "Stable ID") {
        const value = children[index + 1].textContent?.trim();
        if (value) return value;
      }
    }
  }
  return el("vaultArcSelect")?.value || "";
}

function activeReaderArcId() {
  return requestedArcId || currentOpenArcId();
}

function editorSnapshot() {
  const meta = el("vaultMeta");
  let stableId = currentOpenArcId();
  let revision = 0;
  let updatedAt = "";
  if (meta) {
    const cells = [...meta.children];
    for (let i = 0; i < cells.length - 1; i += 2) {
      const key = cells[i].textContent?.trim();
      const value = cells[i + 1].textContent?.trim() || "";
      if (key === "Stable ID") stableId = value || stableId;
      if (key === "Revision") revision = Number(value || 0);
      if (key === "Updated") updatedAt = value;
    }
  }
  const sections = [...document.querySelectorAll("#vaultSections .vault-section")].map((card, position) => ({
    id: card.dataset.sectionId || `section-${position + 1}`,
    type: q(".vault-section-type", card)?.value || "notes",
    visibility: q(".vault-section-visibility", card)?.value || "private",
    heading: q(".vault-section-heading", card)?.value || "Untitled section",
    contentMarkdown: q(".vault-section-content", card)?.value || "",
    position,
  }));
  return {
    arcId: stableId,
    canonicalLabel: stableId,
    title: el("vaultTitle")?.value || stableId || "Untitled ARC",
    status: el("vaultDocStatus")?.value || "raw",
    visibility: el("vaultVisibility")?.value || "private",
    curriculumRole: "core",
    priority: "should_do",
    planningStatus: "pending",
    shortConclusion: el("vaultConclusion")?.value || "",
    experience: el("vaultExperience")?.value || "",
    sections,
    relationships: [],
    revision,
    updatedAt,
  };
}

function waitForRepository() {
  if (globalThis.chronoArcRepository) return Promise.resolve(globalThis.chronoArcRepository);
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (globalThis.chronoArcRepository) {
        clearInterval(timer);
        resolve(globalThis.chronoArcRepository);
      } else if (attempts >= 100) {
        clearInterval(timer);
        reject(new Error("Chrono-Deck ARC repository did not initialize."));
      }
    }, 25);
  });
}

function protectMath(markdown) {
  const tokens = [];
  const placeholder = (tex, display) => {
    const index = tokens.push({ tex: String(tex || "").trim(), display }) - 1;
    return `CHRONODECKMATHTOKEN${index}END`;
  };
  const protectChunk = (chunk) => {
    let text = String(chunk || "");
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, tex) => placeholder(tex, true));
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => placeholder(tex, true));
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, tex) => placeholder(tex, false));
    text = text.replace(/(^|[^\\$])\$([^$\n]+?)\$/gm, (_, prefix, tex) => `${prefix}${placeholder(tex, false)}`);
    return text;
  };

  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let buffer = [];
  let fenced = false;
  let fenceChar = "";
  const flush = () => {
    if (!buffer.length) return;
    output.push(...protectChunk(buffer.join("\n")).split("\n"));
    buffer = [];
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      flush();
      output.push(line);
      if (!fenced) {
        fenced = true;
        fenceChar = fence[1][0];
      } else if (fence[1][0] === fenceChar) {
        fenced = false;
        fenceChar = "";
      }
      continue;
    }
    if (fenced) output.push(line);
    else buffer.push(line);
  }
  flush();
  return { source: output.join("\n"), tokens };
}

function restoreMath(root, tokens) {
  if (!tokens.length) return;
  const pattern = /CHRONODECKMATHTOKEN(\d+)END/g;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const value = node.nodeValue || "";
    if (!value.includes("CHRONODECKMATHTOKEN")) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of value.matchAll(pattern)) {
      if (match.index > cursor) fragment.append(document.createTextNode(value.slice(cursor, match.index)));
      const token = tokens[Number(match[1])];
      if (token) {
        fragment.append(
          document.createTextNode(token.display ? `$$${token.tex}$$` : `$${token.tex}$`),
        );
      } else {
        fragment.append(document.createTextNode(match[0]));
      }
      cursor = match.index + match[0].length;
    }
    if (cursor < value.length) fragment.append(document.createTextNode(value.slice(cursor)));
    node.replaceWith(fragment);
  }
}

function stableIdFromText(value) {
  const text = String(value || "").trim();
  const sup = text.toUpperCase().match(/\bSUP-[A-Z0-9_-]{6,}\b/);
  if (sup) return sup[0];
  const match = text.toUpperCase().match(/\b(ARC|SIDE)\s*[-_ ]?0*(\d{1,6})\b/);
  if (!match) return "";
  return `${match[1]}${String(Number(match[2])).padStart(3, "0")}`;
}

function linkifyWikilinks(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const pattern = /\[\[([^\]]+)\]\]/g;
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || parent.closest("a,button,code,pre,.katex")) continue;
    const value = node.nodeValue || "";
    if (!value.includes("[[")) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of value.matchAll(pattern)) {
      if (match.index > cursor) fragment.append(document.createTextNode(value.slice(cursor, match.index)));
      const target = match[1].split("|")[0].split("#")[0].trim();
      const label = match[1].includes("|") ? match[1].split("|").slice(1).join("|").trim() : target;
      const arcId = stableIdFromText(target);
      if (arcId) {
        const button = make("button", "vault-wikilink", label || arcId);
        button.type = "button";
        button.addEventListener("click", () => openReaderArc(arcId));
        fragment.append(button);
      } else {
        fragment.append(document.createTextNode(match[0]));
      }
      cursor = match.index + match[0].length;
    }
    if (cursor < value.length) fragment.append(document.createTextNode(value.slice(cursor)));
    node.replaceWith(fragment);
  }
}

async function renderMarkdown(root, markdown) {
  root.innerHTML = "";
  const loading = make("div", "arc-reader-empty", "Rendering Markdown…");
  root.append(loading);
  try {
    await ensureRenderer();
    const protectedMath = protectMath(markdown);
    const rawHtml = globalThis.marked.parse(protectedMath.source, {
      gfm: true,
      breaks: false,
    });
    const safeHtml = globalThis.DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
    });
    root.innerHTML = safeHtml;
    restoreMath(root, protectedMath.tokens);
    linkifyWikilinks(root);
    globalThis.renderMathInElement(root, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
      strict: "ignore",
    });
    root.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (/^https?:/i.test(href)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  } catch (error) {
    console.error(error);
    root.innerHTML = "";
    const box = make("div", "arc-reader-render-error");
    box.append(
      make("strong", "", "The rich renderer could not load."),
      make("p", "", "Your Markdown is still safe in Supabase. Refresh when the network is available."),
    );
    const pre = make("pre");
    pre.textContent = String(markdown || "");
    box.append(pre);
    root.append(box);
  }
}

function slug(value) {
  return String(value || "section")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-") || "section";
}

function buildToc(root, toc) {
  toc.innerHTML = "";
  const seen = new Map();
  const headings = [...root.querySelectorAll("h2, h3")];
  if (!headings.length) {
    toc.hidden = true;
    return;
  }
  toc.hidden = false;
  for (const heading of headings) {
    const base = slug(heading.textContent);
    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);
    heading.id = `arc-section-${base}-${count}`;
    const button = make("button", "", heading.textContent || "Section");
    button.type = "button";
    button.addEventListener("click", () => heading.scrollIntoView({ behavior: "smooth", block: "start" }));
    toc.append(button);
  }
}

function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function readerElements() {
  return {
    card: el("arcReaderCard"),
    header: el("arcReaderHeader"),
    toc: el("arcReaderToc"),
    body: el("arcReaderBody"),
  };
}

async function renderReader() {
  const generation = ++readerGeneration;
  const { header, toc, body } = readerElements();
  if (!header || !toc || !body) return;
  const arcId = activeReaderArcId();
  header.innerHTML = "";
  toc.innerHTML = "";
  body.innerHTML = "";
  if (!arcId) {
    body.append(make("div", "arc-reader-empty", "Choose an ARC from the library."));
    return;
  }

  body.append(make("div", "arc-reader-empty", `Loading ${arcId}…`));
  try {
    const repository = await waitForRepository();
    let documentValue = await repository.load(arcId);
    if (generation !== readerGeneration) return;
    if (!documentValue && arcId === currentOpenArcId()) documentValue = editorSnapshot();
    if (!documentValue) {
      header.innerHTML = "";
      body.innerHTML = "";
      body.append(make("div", "arc-reader-empty", `${arcId} has no saved ARC document yet.`));
      return;
    }

    const exactMarkdown = String(documentValue.sourceMarkdown || "").trim();
    const markdown = exactMarkdown ? String(documentValue.sourceMarkdown) : arcDocumentToMarkdown(documentValue);
    const { meta, body: markdownBodyRaw } = extractFrontmatter(markdown);
    const markdownBody = markdownBodyRaw.replace(/^\s*#\s+[^\n]+\n+/, "");
    const title = metaValue(meta, "title") || documentValue.title || arcId;

    const top = make("div", "arc-reader-topline");
    top.append(
      make("div", "arc-reader-kicker", `${arcId} · revision ${Number(documentValue.revision || 0)}`),
      make("span", "arc-reader-source", exactMarkdown ? "Exact Markdown · Supabase" : "Structured fallback"),
    );
    const titleEl = make("h1", "", title);
    const badges = make("div", "arc-reader-badges");
    const badgeValues = [
      metaValue(meta, "document_status") || documentValue.status,
      metaValue(meta, "curriculum_role") || documentValue.curriculumRole,
      metaValue(meta, "visibility") || documentValue.visibility,
    ].filter(Boolean);
    for (const value of badgeValues) badges.append(make("span", "arc-reader-badge", value));
    header.append(top, titleEl, badges);

    const metadata = [
      ["Setting", metaValue(meta, "setting")],
      ["Domain", metaValue(meta, "domain")],
      ["Mastery", metaValue(meta, "mastery")],
      ["Effort", metaValue(meta, "total_effort")],
    ].filter(([, value]) => value);
    if (metadata.length) {
      const grid = make("div", "arc-reader-meta");
      for (const [label, value] of metadata) {
        const card = make("div", "arc-reader-meta-card");
        card.append(
          make("div", "arc-reader-meta-label", label),
          make("div", "arc-reader-meta-value", value),
        );
        grid.append(card);
      }
      header.append(grid);
    }

    const actions = make("div", "arc-reader-actions");
    const refresh = make("button", "", "Refresh");
    refresh.type = "button";
    refresh.addEventListener("click", async () => {
      await refreshLibrary();
      await renderReader();
    });
    const download = make("button", "", "Download .md");
    download.type = "button";
    download.addEventListener("click", () => downloadText(`${arcId.toLowerCase()}.md`, markdown));
    const add = make("button", "primary", "Add / replace ARC");
    add.type = "button";
    add.addEventListener("click", () => openImportDialog({ preferredArcId: arcId }));
    actions.append(refresh, download, add);
    header.append(actions);

    await renderMarkdown(body, markdownBody);
    if (generation !== readerGeneration) return;
    buildToc(body, toc);
    updateLibraryActiveState();
  } catch (error) {
    console.error(error);
    header.innerHTML = "";
    body.innerHTML = "";
    body.append(make("div", "arc-reader-render-error", `Could not load ${arcId}: ${error.message}`));
  }
}

function libraryFilterValue(documentValue) {
  return [documentValue.arcId, documentValue.canonicalLabel, documentValue.title]
    .join(" ")
    .toLowerCase();
}

function updateLibraryActiveState() {
  const current = activeReaderArcId();
  document.querySelectorAll(".vault-library-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.arcId === current);
  });
}

function renderLibrary() {
  const list = el("vaultLibraryList");
  const search = el("vaultLibrarySearch");
  if (!list) return;
  const wanted = String(search?.value || "").trim().toLowerCase();
  const rows = wanted
    ? libraryDocuments.filter((documentValue) => libraryFilterValue(documentValue).includes(wanted))
    : libraryDocuments;
  list.innerHTML = "";
  if (!rows.length) {
    list.append(
      make(
        "div",
        "vault-library-empty",
        wanted
          ? "No saved ARC matches this search."
          : "No saved ARC documents found yet. Sync one from Obsidian or use Add ARC.",
      ),
    );
    return;
  }
  for (const documentValue of rows) {
    const button = make("button", "vault-library-item");
    button.type = "button";
    button.dataset.arcId = documentValue.arcId;
    const id = make("span", "vault-library-id", documentValue.arcId);
    const copy = make("span", "vault-library-copy");
    copy.append(
      make("strong", "", documentValue.title || documentValue.canonicalLabel || documentValue.arcId),
      make(
        "span",
        "",
        documentValue.updatedAt
          ? `Updated ${new Date(documentValue.updatedAt).toLocaleDateString()}`
          : documentValue.status || "saved",
      ),
    );
    const revision = make("span", "vault-library-revision", `v${Number(documentValue.revision || 0)}`);
    button.append(id, copy, revision);
    button.addEventListener("click", () => openReaderArc(documentValue.arcId));
    list.append(button);
  }
  updateLibraryActiveState();
}

async function refreshLibrary() {
  const list = el("vaultLibraryList");
  if (list) list.innerHTML = '<div class="vault-library-empty">Refreshing library…</div>';
  try {
    const repository = await waitForRepository();
    libraryDocuments = await repository.listDocuments();
    libraryDocuments.sort(
      (a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")) || a.arcId.localeCompare(b.arcId),
    );
    renderLibrary();
  } catch (error) {
    console.error(error);
    if (list) {
      list.innerHTML = "";
      list.append(make("div", "vault-library-empty", `Could not load ARC library: ${error.message}`));
    }
  }
}

function syncLegacySelect(arcId) {
  const select = el("vaultArcSelect");
  if (!select) return false;
  const search = el("vaultArcSearch");
  if (search?.value) {
    search.value = "";
    search.dispatchEvent(new Event("input", { bubbles: true }));
  }
  const exists = [...select.options].some((option) => option.value === arcId);
  if (!exists) return false;
  select.value = arcId;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function openReaderArc(arcId) {
  const stableId = stableIdFromText(arcId) || String(arcId || "").trim();
  if (!stableId) return;
  requestedArcId = stableId;
  syncLegacySelect(stableId);
  updateLibraryActiveState();
  renderReader();
}

function setImportStatus(dialog, message, kind = "") {
  const status = q(".vault-import-status", dialog);
  if (!status) return;
  status.textContent = message;
  status.className = `vault-import-status${kind ? ` ${kind}` : ""}`;
}

function openImportDialog({ preferredArcId = "" } = {}) {
  const dialog = make("dialog", "vault-import-dialog");
  const inner = make("div", "vault-import-dialog-inner");
  const heading = make("h2", "", "Add ARC Markdown");
  const copy = make(
    "p",
    "",
    "Upload a completed .md file or paste Markdown. Obsidian sync remains the normal workflow; this is a direct web import fallback.",
  );
  const grid = make("div", "vault-import-grid");
  const arcField = make("div", "vault-import-field");
  const arcLabel = make("label", "", "ARC ID (optional if frontmatter contains arc_id)");
  const arcInput = make("input");
  arcInput.type = "text";
  arcInput.placeholder = "ARC004";
  arcInput.value = preferredArcId || "";
  arcLabel.append(arcInput);
  arcField.append(arcLabel);

  const fileField = make("div", "vault-import-field");
  const fileLabel = make("label", "", "Completed Markdown file");
  const fileInput = make("input");
  fileInput.type = "file";
  fileInput.accept = ".md,.markdown,text/markdown,text/plain";
  fileLabel.append(fileInput);
  fileField.append(fileLabel);
  grid.append(arcField, fileField);

  const sourceField = make("div", "vault-import-field");
  const sourceLabel = make("label", "", "Markdown");
  const textarea = make("textarea", "vault-import-source");
  textarea.placeholder = "Paste the completed ARC Markdown here…";
  sourceLabel.append(textarea);
  sourceField.append(sourceLabel);

  const status = make("div", "vault-import-status", "Nothing is changed until you press Import.");
  const actions = make("div", "vault-import-actions");
  const cancel = make("button", "", "Cancel");
  cancel.type = "button";
  const submit = make("button", "primary", "Import to Chrono-Deck");
  submit.type = "button";
  actions.append(cancel, submit);
  inner.append(heading, copy, grid, sourceField, status, actions);
  dialog.append(inner);
  document.body.append(dialog);

  let filename = "";
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    filename = file.name;
    textarea.value = await file.text();
    const parsed = parseArcMarkdown(textarea.value, { filename: file.name, fallbackArcId: arcInput.value });
    if (parsed.arcId) arcInput.value = parsed.arcId;
    setImportStatus(dialog, `Loaded ${file.name}. Review it, then import.`, "good");
  });

  cancel.addEventListener("click", () => dialog.close());
  submit.addEventListener("click", async () => {
    const source = textarea.value;
    if (!source.trim()) {
      setImportStatus(dialog, "Paste Markdown or choose a .md file first.", "bad");
      return;
    }
    submit.disabled = true;
    try {
      const parsed = parseArcMarkdown(source, {
        filename,
        fallbackArcId: arcInput.value,
      });
      if (!parsed.arcId) throw new Error("Could not determine the stable ARC ID. Enter ARC004-style ID above or add arc_id to frontmatter.");
      const repository = await waitForRepository();
      const existing = await repository.load(parsed.arcId);
      if (
        existing?.revision > 0 &&
        !confirm(`Replace ${parsed.arcId} cloud content with this Markdown as a new revision? Current revision v${existing.revision} stays in revision history.`)
      ) {
        submit.disabled = false;
        return;
      }
      const documentValue = {
        ...existing,
        ...parsed,
        arcId: parsed.arcId,
        canonicalLabel: parsed.canonicalLabel || existing?.canonicalLabel || parsed.arcId,
        title: parsed.title || existing?.title || parsed.arcId,
        status: parsed.status || existing?.status || "raw",
        visibility: parsed.visibility || existing?.visibility || "private",
        curriculumRole: parsed.curriculumRole || existing?.curriculumRole || "core",
        priority: parsed.priority || existing?.priority || "should_do",
        planningStatus: parsed.planningStatus || existing?.planningStatus || "pending",
        relationships: parsed.relationships?.length ? parsed.relationships : existing?.relationships || [],
        sourcePath: filename ? `web:${filename}` : "web:paste",
        sourceMarkdown: source,
      };
      const saved = await repository.importMarkdown(
        documentValue,
        source,
        `Imported from website${filename ? `: ${filename}` : " paste"}`,
      );
      requestedArcId = saved.arcId;
      syncLegacySelect(saved.arcId);
      await refreshLibrary();
      await renderReader();
      const state = repository.state();
      setImportStatus(
        dialog,
        `Imported ${saved.arcId} as revision ${saved.revision}${state.mode === "cloud" ? " in Supabase" : " locally"}.`,
        "good",
      );
      setTimeout(() => dialog.close(), 700);
    } catch (error) {
      console.error(error);
      setImportStatus(dialog, `Import failed: ${error.message}`, "bad");
      submit.disabled = false;
    }
  });

  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function buildLibrary() {
  const library = make("aside", "vault-library");
  library.id = "vaultLibrary";
  const head = make("div", "vault-library-head");
  const titleRow = make("div", "vault-library-title-row");
  titleRow.append(make("h2", "", "ARC Library"));
  const cloud = make("span", "arc-reader-source", "Supabase + local cache");
  titleRow.append(cloud);
  head.append(
    titleRow,
    make("p", "vault-library-subtitle", "Read saved ARC documents. Obsidian is the main authoring surface."),
  );
  const search = make("input", "vault-library-search");
  search.id = "vaultLibrarySearch";
  search.type = "text";
  search.placeholder = "Search saved ARCs…";
  search.addEventListener("input", renderLibrary);
  const actions = make("div", "vault-library-actions");
  const add = make("button", "primary", "+ Add ARC");
  add.type = "button";
  add.addEventListener("click", () => openImportDialog({ preferredArcId: activeReaderArcId() }));
  const refresh = make("button", "", "↻");
  refresh.type = "button";
  refresh.title = "Refresh from Supabase";
  refresh.addEventListener("click", async () => {
    await refreshLibrary();
    await renderReader();
  });
  actions.append(add, refresh);
  head.append(search, actions);
  const list = make("div", "vault-library-list");
  list.id = "vaultLibraryList";
  library.append(head, list);
  return library;
}

function buildReaderCard() {
  const card = make("section", "arc-reader-card");
  card.id = "arcReaderCard";
  const header = make("header", "arc-reader-header");
  header.id = "arcReaderHeader";
  const toc = make("nav", "arc-reader-toc");
  toc.id = "arcReaderToc";
  toc.hidden = true;
  const body = make("article", "arc-reader-body");
  body.id = "arcReaderBody";
  card.append(header, toc, body);
  return card;
}

function installReader() {
  const shell = q("#vaultTab .vault-shell");
  const editor = q("#vaultTab .vault-editor");
  const legacySidebar = q("#vaultTab .vault-sidebar");
  if (!shell || !editor || !legacySidebar || el("arcReaderCard")) return;

  const originalEditorChildren = [...editor.children];
  const library = buildLibrary();
  const reader = buildReaderCard();
  const advanced = make("details", "vault-advanced");
  const summary = make("summary", "", "Advanced / Recovery editor");
  const note = make(
    "p",
    "vault-advanced-note",
    "Use Obsidian for normal writing. These legacy controls remain for metadata repair, revision restore, and emergency recovery.",
  );
  const advancedBody = make("div", "vault-advanced-body");
  const editView = make("div", "vault-edit-view");
  editView.id = "vaultEditView";
  for (const child of originalEditorChildren) editView.append(child);
  legacySidebar.classList.add("vault-legacy-sidebar");
  advancedBody.append(legacySidebar, editView);
  advanced.append(summary, note, advancedBody);

  shell.prepend(library);
  editor.append(reader, advanced);

  const status = el("vaultStatus");
  if (status) {
    const observer = new MutationObserver(() => {
      const message = status.textContent || "";
      if (/Opened |Saved |Imported |Restored /.test(message)) {
        const opened = currentOpenArcId();
        if (opened) requestedArcId = opened;
        queueMicrotask(async () => {
          await refreshLibrary();
          await renderReader();
        });
      }
    });
    observer.observe(status, { childList: true, subtree: true, characterData: true });
  }

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.tab !== "vault") return;
      queueMicrotask(async () => {
        const opened = currentOpenArcId();
        if (opened && !requestedArcId) requestedArcId = opened;
        await refreshLibrary();
        await renderReader();
      });
    });
  });

  queueMicrotask(async () => {
    requestedArcId = currentOpenArcId();
    await refreshLibrary();
    await renderReader();
  });
}

queueMicrotask(installReader);
