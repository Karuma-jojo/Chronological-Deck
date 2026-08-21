const {
  Component,
  MarkdownRenderer,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  SecretComponent,
  Setting,
  normalizePath,
  requestUrl,
} = require("obsidian");

const SESSION_SECRET_ID = "chrono-deck-session";
const DOCUMENT_STATUSES = new Set(["raw", "editing", "polished"]);
const VISIBILITIES = new Set(["private", "public"]);
const CURRICULUM_ROLES = new Set(["core", "supplementary", "optional"]);
const PRIORITIES = new Set(["must_do", "should_do", "nice_to_have"]);
const PLANNING_STATUSES = new Set(["pending", "active", "deferred", "parked"]);
const RELATION_FIELDS = [
  ["prerequisites", "prerequisite"],
  ["supplementary", "supplementary"],
  ["supplementary_to", "supplementary_to"],
  ["related", "related"],
  ["deepens", "deepens"],
  ["historical_next", "historical_next"],
  ["depends_on", "depends_on"],
  ["replaces", "replaces"],
  ["part_of", "part_of"],
  ["redirect_to", "redirect_to"],
];

const RELATION_FIELD_BY_TYPE = new Map(RELATION_FIELDS.map(([field, relationType]) => [relationType, field]));

const DEFAULT_SETTINGS = {
  supabaseUrl: "",
  email: "",
  publishableKeySecret: "chrono-deck-supabase-key",
  arcFolder: "Chrono-Deck/ARCs",
  assetFolder: "Chrono-Deck/Assets",
  mediaGatewayUrl: "https://chrono-deck-media.onrender.com",
  chronoDeckUrl: "https://karuma-jojo.github.io/Chronological-Deck/",
};


const CHRONO_MEDIA_BRIDGE_V1 = true;
const MAX_MEDIA_BYTES = 100 * 1024 * 1024;
const MEDIA_MIME_TYPES = new Map([
  ["png", "image/png"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["webp", "image/webp"],
  ["gif", "image/gif"], ["svg", "image/svg+xml"], ["avif", "image/avif"],
  ["mp4", "video/mp4"], ["webm", "video/webm"], ["mov", "video/quicktime"],
  ["mp3", "audio/mpeg"], ["m4a", "audio/mp4"], ["wav", "audio/wav"], ["ogg", "audio/ogg"],
  ["pdf", "application/pdf"],
]);

function fileExtension(value) {
  const clean = asString(value).split(/[?#]/)[0];
  const match = clean.match(/\.([A-Za-z0-9]+)$/);
  return match ? match[1].toLowerCase() : "";
}

function mediaMimeType(value) {
  return MEDIA_MIME_TYPES.get(fileExtension(value)) || "application/octet-stream";
}

function mediaType(value) {
  const ext = fileExtension(value);
  if (ext === "gif") return "gif";
  if (["png", "jpg", "jpeg", "webp", "svg", "avif"].includes(ext)) return ext === "svg" ? "diagram" : "image";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["mp3", "m4a", "wav", "ogg"].includes(ext)) return "audio";
  return "file";
}

function inferLogicalArcId(frontmatter, arcId) {
  const explicit = asString(frontmatter?.logical_arc_id);
  if (explicit) return explicit;
  return asString(arcId).replace(/-(RAW|POLISHED)$/i, "");
}

function inferDocumentType(frontmatter, arcId) {
  const explicit = asString(frontmatter?.document_type);
  if (explicit) return explicit;
  if (/-RAW$/i.test(arcId)) return "raw_dump";
  if (/-POLISHED$/i.test(arcId)) return "polished_extract";
  return "canonical";
}

function withoutFencedCode(markdown) {
  const lines = stripFrontmatter(markdown).replace(/\r\n/g, "\n").split("\n");
  let fenced = false;
  let fenceChar = "";
  return lines.map((line) => {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) { fenced = true; fenceChar = fence[1][0]; }
      else if (fence[1][0] === fenceChar) { fenced = false; fenceChar = ""; }
      return "";
    }
    return fenced ? "" : line;
  }).join("\n");
}

function normalizeMarkdownTarget(raw) {
  let value = asString(raw);
  if (!value) return "";
  if (value.startsWith("<") && value.includes(">")) value = value.slice(1, value.indexOf(">"));
  else {
    const titled = value.match(/^(\S+)(?:\s+["'(].*)$/);
    if (titled) value = titled[1];
  }
  try { value = decodeURIComponent(value); } catch {}
  return value.replace(/^file:\/\//i, "").trim();
}

function isExternalVideoUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("vimeo.com");
  } catch {
    return false;
  }
}

function discoverMediaReferences(markdown) {
  const text = withoutFencedCode(markdown);
  const found = new Map();
  const add = (kind, target, altText = "") => {
    const cleanTarget = asString(target);
    if (!cleanTarget) return;
    const key = `${kind}:${cleanTarget}`;
    if (!found.has(key)) found.set(key, { kind, target: cleanTarget, altText: asString(altText) });
  };

  for (const match of text.matchAll(/!\[\[([^\]]+)\]\]/g)) {
    const raw = match[1].split("|")[0].split("#")[0].trim();
    if (raw) add("local", raw, match[1].includes("|") ? match[1].split("|").slice(1).join("|") : "");
  }

  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const target = normalizeMarkdownTarget(match[2]);
    if (!target) continue;
    if (/^https?:\/\//i.test(target)) {
      if (isExternalVideoUrl(target)) add("external", target, match[1]);
    } else if (MEDIA_MIME_TYPES.has(fileExtension(target))) {
      add("local", target, match[1]);
    }
  }

  for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = normalizeMarkdownTarget(match[1]);
    if (target && !/^https?:\/\//i.test(target) && MEDIA_MIME_TYPES.has(fileExtension(target))) add("local", target, "");
  }

  for (const match of text.matchAll(/https?:\/\/[^\s<>)\]]+/g)) {
    const target = match[0].replace(/[.,;:!?]+$/, "");
    if (isExternalVideoUrl(target)) add("external", target, "");
  }

  return [...found.values()];
}

async function sha256Hex(arrayBuffer) {
  if (!globalThis.crypto?.subtle) throw new Error("Web Crypto SHA-256 is unavailable on this device.");
  const digest = await globalThis.crypto.subtle.digest("SHA-256", arrayBuffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function responseHeader(response, wanted) {
  const headers = response?.headers || {};
  const target = String(wanted || "").toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (String(key).toLowerCase() === target) return asString(value);
  }
  return "";
}

function safeManifestPath(value) {
  const raw = asString(value).replace(/\\/g, "/");
  if (!raw || raw.startsWith("/") || /^[A-Za-z]+:\/\//.test(raw)) return "";
  const parts = raw.split("/").filter(Boolean);
  if (parts.some((part) => part === "..")) return "";
  return normalizePath(parts.join("/"));
}

function cleanBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function asString(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

function asList(value) {
  if (value === null || value === undefined || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function extractArcId(value) {
  let text = asString(value);
  if (!text) return "";
  const wiki = text.match(/^!?\[\[([^\]]+)\]\]$/);
  if (wiki) text = wiki[1].split("|")[0].split("#")[0].trim();
  text = text.split("/").pop().replace(/\.md$/i, "").trim();
  const leading = text.match(/^([A-Za-z][A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)\b/);
  if (leading) return leading[1].toUpperCase();
  if (/^[A-Za-z][A-Za-z0-9_-]{2,63}$/.test(text)) return text.toUpperCase();
  return "";
}

function inferSectionType(heading) {
  const value = asString(heading).toLowerCase();
  if (/proof|theorem|lemma|derivation|audit/.test(value)) return "proof";
  if (/definition|terminology|vocabulary/.test(value)) return "definition";
  if (/conclusion|result|principle|takeaway/.test(value)) return "conclusion";
  if (/reflection|mistake|recovery|lesson|hardest/.test(value)) return "reflection";
  if (/dialogue|hearing|conversation/.test(value)) return "dialogue";
  if (/media|diagram|figure|image/.test(value)) return "media";
  if (/prologue|opening|scene|narrative/.test(value)) return "narrative";
  if (/mission|investigation|checkpoint|experiment|problem/.test(value)) return "investigation";
  return "notes";
}

function slug(value) {
  const normalized = asString(value)
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "section";
}

function stripFrontmatter(content) {
  return String(content || "").replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
}

function splitMarkdown(body, defaultVisibility) {
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const chunks = [];
  let current = { heading: "Opening", lines: [] };
  let fenced = false;
  let fenceChar = "";

  const flush = () => {
    const contentMarkdown = current.lines.join("\n").replace(/^\n+|\n+$/g, "");
    if (contentMarkdown || current.heading !== "Opening") chunks.push({ heading: current.heading, contentMarkdown });
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) {
        fenced = true;
        fenceChar = fence[1][0];
      } else if (fence[1][0] === fenceChar) {
        fenced = false;
        fenceChar = "";
      }
    }
    if (!fenced) {
      const h2 = line.match(/^##\s+(.+)$/);
      if (h2) {
        flush();
        current = { heading: h2[1].trim(), lines: [] };
        continue;
      }
      if (current.heading === "Opening" && /^#\s+/.test(line)) continue;
    }
    current.lines.push(line);
  }
  flush();

  let shortConclusion = "";
  let experience = "";
  const sections = [];
  const seen = new Map();

  for (const chunk of chunks) {
    const key = chunk.heading.toLowerCase().replace(/\s+/g, " ").trim();
    if (key === "short conclusion") {
      shortConclusion = chunk.contentMarkdown;
      continue;
    }
    if (key === "experience" || key === "experience / chronicle" || key === "experience / chronicle note") {
      experience = chunk.contentMarkdown;
      continue;
    }
    const base = slug(chunk.heading);
    const number = (seen.get(base) || 0) + 1;
    seen.set(base, number);
    sections.push({
      id: `obs-${base}-${number}`,
      type: inferSectionType(chunk.heading),
      heading: chunk.heading,
      contentMarkdown: chunk.contentMarkdown,
      visibility: defaultVisibility,
      position: sections.length,
    });
  }

  return { shortConclusion, experience, sections };
}

function collectRelationships(frontmatter, arcId) {
  const rows = [];
  for (const [field, relationType] of RELATION_FIELDS) {
    for (const raw of asList(frontmatter?.[field])) {
      const toArcId = extractArcId(raw);
      if (!toArcId || toArcId === arcId) continue;
      rows.push({ fromArcId: arcId, toArcId, relationType, position: rows.length });
    }
  }
  const unique = new Map();
  for (const row of rows) unique.set(`${row.relationType}:${row.toArcId}`, row);
  return [...unique.values()].map((row, position) => ({ ...row, position }));
}

function validateFrontmatter(frontmatter, file) {
  const errors = [];
  const warnings = [];
  const arcId = extractArcId(frontmatter?.arc_id);
  if (!arcId) errors.push("arc_id is required and must be a stable ARC identifier.");
  const status = asString(frontmatter?.document_status || "raw");
  if (!DOCUMENT_STATUSES.has(status)) errors.push(`document_status must be one of: ${[...DOCUMENT_STATUSES].join(", ")}.`);
  const visibility = asString(frontmatter?.visibility || "private");
  if (!VISIBILITIES.has(visibility)) errors.push("visibility must be private or public.");
  const role = asString(frontmatter?.curriculum_role || "core");
  if (!CURRICULUM_ROLES.has(role)) errors.push(`curriculum_role must be one of: ${[...CURRICULUM_ROLES].join(", ")}.`);
  const priority = asString(frontmatter?.priority || "should_do");
  if (!PRIORITIES.has(priority)) errors.push(`priority must be one of: ${[...PRIORITIES].join(", ")}.`);
  const planning = asString(frontmatter?.planning_status || "pending");
  if (!PLANNING_STATUSES.has(planning)) errors.push(`planning_status must be one of: ${[...PLANNING_STATUSES].join(", ")}.`);
  if (!asString(frontmatter?.title)) warnings.push("title is missing; the file name will be used.");
  if (file && arcId && !file.basename.toUpperCase().startsWith(arcId)) warnings.push(`Prefer file names that start with ${arcId} so wikilink relationships resolve reliably.`);
  return { arcId, errors, warnings };
}


function contentFingerprint(markdown) {
  const text = String(markdown || "").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const normalized = [];
  let inFrontmatter = lines[0] === "---";
  let frontmatterClosed = !inFrontmatter;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (index === 0 && inFrontmatter) {
      normalized.push(line);
      continue;
    }
    if (inFrontmatter && !frontmatterClosed && line === "---") {
      frontmatterClosed = true;
      normalized.push(line);
      continue;
    }
    if (inFrontmatter && !frontmatterClosed && /^chrono_[A-Za-z0-9_-]+\s*:/.test(line)) continue;
    normalized.push(line);
  }
  const payload = normalized.join("\n").replace(/\s+$/, "");
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let index = 0; index < payload.length; index += 1) {
    const code = payload.charCodeAt(index);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= code + index;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}

function yamlScalar(value) {
  return JSON.stringify(asString(value));
}

function relationshipFrontmatter(relationships) {
  const result = new Map();
  for (const [field] of RELATION_FIELDS) result.set(field, []);
  for (const row of Array.isArray(relationships) ? relationships : []) {
    const field = RELATION_FIELD_BY_TYPE.get(asString(row?.relationType));
    const id = extractArcId(row?.toArcId);
    if (!field || !id) continue;
    const list = result.get(field);
    if (!list.includes(id)) list.push(id);
  }
  return result;
}

function renderCloudMarkdown(cloud) {
  if (asString(cloud?.sourceMarkdown)) return String(cloud.sourceMarkdown).replace(/\r\n/g, "\n");
  const arcId = extractArcId(cloud?.arcId) || "ARC";
  const title = asString(cloud?.title || cloud?.canonicalLabel || arcId);
  const lines = [
    "---",
    `arc_id: ${arcId}`,
    `title: ${yamlScalar(title)}`,
    `document_status: ${asString(cloud?.status || "raw")}`,
    `visibility: ${asString(cloud?.visibility || "private")}`,
    `curriculum_role: ${asString(cloud?.curriculumRole || "core")}`,
    `priority: ${asString(cloud?.priority || "should_do")}`,
    `planning_status: ${asString(cloud?.planningStatus || "pending")}`,
  ];
  const relations = relationshipFrontmatter(cloud?.relationships);
  for (const [field] of RELATION_FIELDS) {
    const ids = relations.get(field) || [];
    if (!ids.length) continue;
    lines.push(`${field}:`);
    for (const id of ids) lines.push(`  - ${yamlScalar(`[[${id}]]`)}`);
  }
  lines.push("---", "", `# ${title}`, "");
  if (asString(cloud?.shortConclusion)) lines.push("## Short Conclusion", "", String(cloud.shortConclusion).trim(), "");
  if (asString(cloud?.experience)) lines.push("## Experience / Chronicle", "", String(cloud.experience).trim(), "");
  for (const section of Array.isArray(cloud?.sections) ? cloud.sections : []) {
    lines.push(`## ${asString(section?.heading || "Untitled section")}`, "");
    const content = String(section?.contentMarkdown || "").trim();
    if (content) lines.push(content, "");
  }
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}


function normalizeMathBody(body) {
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let buffer = [];
  let fenced = false;
  let fenceChar = "";

  const flush = () => {
    if (!buffer.length) return;
    let text = buffer.join("\n");
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `$$\n${String(inner).trim()}\n$$`);
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${String(inner).trim()}$`);
    output.push(...text.split("\n"));
    buffer = [];
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) {
        flush();
        fenced = true;
        fenceChar = fence[1][0];
        output.push(line);
        continue;
      }
      output.push(line);
      if (fence[1][0] === fenceChar) {
        fenced = false;
        fenceChar = "";
      }
      continue;
    }
    if (fenced) output.push(line);
    else buffer.push(line);
  }
  flush();
  return output.join("\n");
}

function normalizeObsidianMath(markdown) {
  const text = String(markdown || "").replace(/\r\n/g, "\n");
  const match = text.match(/^(---\n[\s\S]*?\n---(?:\n|$))/);
  if (!match) return normalizeMathBody(text);
  return `${match[1]}${normalizeMathBody(text.slice(match[1].length))}`;
}

function readerBody(markdown) {
  const normalized = normalizeMathBody(stripFrontmatter(markdown));
  return normalized.replace(/^\s*#\s+[^\n]+\n+/, "");
}

function formatBytes(value) {
  const bytes = Math.max(0, Number(value || 0));
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

class ArcReaderModal extends Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
    this.renderComponent = null;
  }

  async onOpen() {
    this.modalEl.addClass("chrono-deck-reader-shell");
    await this.renderReader();
  }

  async renderReader() {
    if (this.renderComponent) this.renderComponent.unload();
    this.renderComponent = new Component();
    this.renderComponent.load();

    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("chrono-deck-reader");

    const fm = this.plugin.getFrontmatter(this.file);
    const arcId = extractArcId(fm?.arc_id) || this.file.basename;
    const title = asString(fm?.title || this.file.basename);
    const revision = Number(fm?.chrono_revision || 0);

    const hero = contentEl.createDiv({ cls: "chrono-deck-reader-hero" });
    hero.createDiv({ cls: "chrono-deck-reader-kicker", text: arcId });
    hero.createEl("h1", { cls: "chrono-deck-reader-title", text: title });

    const pills = hero.createDiv({ cls: "chrono-deck-reader-pills" });
    const pillValues = [
      asString(fm?.document_status || fm?.status),
      asString(fm?.curriculum_role),
      revision ? `cloud v${revision}` : "local only",
    ].filter(Boolean);
    for (const value of pillValues) pills.createSpan({ cls: "chrono-deck-reader-pill", text: value });

    const actions = hero.createDiv({ cls: "chrono-deck-reader-actions" });
    const edit = actions.createEl("button", { text: "Edit note" });
    edit.addClass("mod-cta");
    edit.onclick = () => this.close();

    const fixMath = actions.createEl("button", { text: "Fix math syntax" });
    fixMath.onclick = async () => {
      const changed = await this.plugin.normalizeMathInFile(this.file, false);
      if (changed) await this.renderReader();
      else new Notice("Chrono-Deck: math syntax is already Obsidian-compatible.");
    };

    const close = actions.createEl("button", { text: "Close" });
    close.onclick = () => this.close();

    const summaryItems = [
      ["Setting", fm?.setting],
      ["Domain", fm?.domain],
      ["Mastery", fm?.mastery],
      ["Effort", fm?.total_effort],
    ].filter(([, value]) => asString(value));

    if (summaryItems.length) {
      const summary = contentEl.createDiv({ cls: "chrono-deck-reader-summary" });
      for (const [label, raw] of summaryItems) {
        const card = summary.createDiv({ cls: "chrono-deck-reader-summary-card" });
        card.createDiv({ cls: "chrono-deck-reader-summary-label", text: label });
        card.createDiv({ cls: "chrono-deck-reader-summary-value", text: asString(raw) });
      }
    }

    const article = contentEl.createDiv({ cls: "markdown-preview-view chrono-deck-reader-markdown" });
    const sizer = article.createDiv({ cls: "markdown-preview-sizer markdown-preview-section" });
    const source = await this.app.vault.cachedRead(this.file);
    await MarkdownRenderer.render(this.app, readerBody(source), sizer, this.file.path, this.renderComponent);

    const headings = [...sizer.querySelectorAll("h2, h3")];
    if (headings.length) {
      const details = contentEl.createEl("details", { cls: "chrono-deck-reader-toc" });
      details.createEl("summary", { text: `Sections (${headings.length})` });
      const list = details.createDiv({ cls: "chrono-deck-reader-toc-list" });
      for (const heading of headings) {
        const button = list.createEl("button", { text: heading.textContent || "Section" });
        button.onclick = () => heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      article.insertAdjacentElement("beforebegin", details);
    }
  }

  onClose() {
    if (this.renderComponent) {
      this.renderComponent.unload();
      this.renderComponent = null;
    }
    this.contentEl.empty();
  }
}

class TextPromptModal extends Modal {
  constructor(app, title, placeholder) {
    super(app);
    this.promptTitle = title;
    this.placeholder = placeholder;
  }
  ask() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.open();
    });
  }
  finish(value) {
    if (!this.resolve) return;
    const resolve = this.resolve;
    this.resolve = null;
    resolve(value);
    this.close();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: this.promptTitle });
    const input = contentEl.createEl("input", { type: "text", placeholder: this.placeholder || "" });
    input.style.width = "100%";
    const buttons = contentEl.createDiv({ cls: "chrono-deck-modal-actions" });
    const cancel = buttons.createEl("button", { text: "Cancel" });
    const submit = buttons.createEl("button", { text: "Create" });
    submit.addClass("mod-cta");
    cancel.onclick = () => this.finish(null);
    submit.onclick = () => this.finish(input.value.trim() || null);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") this.finish(input.value.trim() || null);
      if (event.key === "Escape") this.finish(null);
    });
    setTimeout(() => input.focus(), 0);
  }
  onClose() {
    this.contentEl.empty();
    if (this.resolve) this.finish(null);
  }
}

class PasswordModal extends Modal {
  constructor(app, email) {
    super(app);
    this.email = email;
  }
  ask() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.open();
    });
  }
  finish(value) {
    if (!this.resolve) return;
    const resolve = this.resolve;
    this.resolve = null;
    resolve(value);
    this.close();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: "Sign in to Chrono-Deck" });
    contentEl.createEl("p", { text: this.email || "Your configured Supabase account" });
    const input = contentEl.createEl("input", { type: "password", placeholder: "Password" });
    input.style.width = "100%";
    const buttons = contentEl.createDiv({ cls: "chrono-deck-modal-actions" });
    const cancel = buttons.createEl("button", { text: "Cancel" });
    const submit = buttons.createEl("button", { text: "Sign in" });
    submit.addClass("mod-cta");
    cancel.onclick = () => this.finish(null);
    submit.onclick = () => this.finish(input.value || null);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") this.finish(input.value || null);
      if (event.key === "Escape") this.finish(null);
    });
    setTimeout(() => input.focus(), 0);
  }
  onClose() {
    this.contentEl.empty();
    if (this.resolve) this.finish(null);
  }
}

class ChronoDeckSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Chrono-Deck Bridge" });

    new Setting(containerEl)
      .setName("Supabase project URL")
      .setDesc("Same project used by the Chrono-Deck website.")
      .addText((text) => text.setPlaceholder("https://YOURPROJECT.supabase.co").setValue(this.plugin.settings.supabaseUrl).onChange(async (value) => {
        this.plugin.settings.supabaseUrl = cleanBase(value);
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Supabase publishable key")
      .setDesc("Stored in Obsidian SecretStorage; the note never contains it.")
      .addComponent((el) => new SecretComponent(this.app, el).setValue(this.plugin.settings.publishableKeySecret).onChange(async (value) => {
        this.plugin.settings.publishableKeySecret = value;
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Email")
      .setDesc("Supabase Auth email. The password is prompted when signing in and is never stored.")
      .addText((text) => text.setPlaceholder("you@example.com").setValue(this.plugin.settings.email).onChange(async (value) => {
        this.plugin.settings.email = value.trim();
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("ARC folder")
      .setDesc("New supplementary ARC notes are created here.")
      .addText((text) => text.setValue(this.plugin.settings.arcFolder).onChange(async (value) => {
        this.plugin.settings.arcFolder = normalizePath(value || DEFAULT_SETTINGS.arcFolder);
        await this.plugin.saveSettings();
      }));


    new Setting(containerEl)
      .setName("ARC asset folder")
      .setDesc("Local-first media mirror. R2 restores missing assets into these paths without rewriting Markdown links.")
      .addText((text) => text.setValue(this.plugin.settings.assetFolder).onChange(async (value) => {
        this.plugin.settings.assetFolder = normalizePath(value || DEFAULT_SETTINGS.assetFolder);
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Media gateway")
      .setDesc("Authenticated Render gateway that issues short-lived R2 upload/download URLs. R2 secrets never enter Obsidian.")
      .addText((text) => text.setValue(this.plugin.settings.mediaGatewayUrl).onChange(async (value) => {
        this.plugin.settings.mediaGatewayUrl = cleanBase(value || DEFAULT_SETTINGS.mediaGatewayUrl);
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Chrono-Deck website")
      .addText((text) => text.setValue(this.plugin.settings.chronoDeckUrl).onChange(async (value) => {
        this.plugin.settings.chronoDeckUrl = value.trim();
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Account session")
      .setDesc("Access/refresh tokens are stored in Obsidian SecretStorage, not data.json.")
      .addButton((button) => button.setButtonText("Sign in").onClick(() => this.plugin.signInInteractively()))
      .addButton((button) => button.setButtonText("Forget session").onClick(() => this.plugin.clearSession()));
  }
}

module.exports = class ChronoDeckBridgePlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.statusEl = this.addStatusBarItem();
    this.setStatus("Chrono-Deck · local");
    this.addSettingTab(new ChronoDeckSettingTab(this.app, this));

    this.addCommand({ id: "validate-current-arc", name: "Validate current ARC note", checkCallback: (checking) => {
      const file = this.app.workspace.getActiveFile();
      if (!file || file.extension !== "md") return false;
      if (!checking) this.validateCurrentArc();
      return true;
    }});
    this.addCommand({ id: "sign-in", name: "Sign in to Supabase", callback: () => this.signInInteractively() });
    this.addCommand({ id: "sync-current-arc", name: "Sync current ARC to Chrono-Deck", checkCallback: (checking) => {
      const file = this.app.workspace.getActiveFile();
      if (!file || file.extension !== "md") return false;
      if (!checking) this.syncCurrentArc();
      return true;
    }});
    this.addCommand({
      id: "pull-current-arc",
      name: "Pull current ARC from Chrono-Deck",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.pullCurrentArc();
        return true;
      },
    });
    this.addCommand({ id: "pull-all-arcs", name: "Pull all Chrono-Deck ARCs to this device", callback: () => this.pullAllArcs() });
    this.addCommand({
      id: "open-arc-reader",
      name: "Open current ARC in beautiful reader",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.openArcReader();
        return true;
      },
    });
    this.addCommand({
      id: "normalize-current-arc-math",
      name: "Fix math rendering in current ARC",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.normalizeCurrentArcMath();
        return true;
      },
    });
    this.addCommand({
      id: "show-current-arc-revision-storage",
      name: "Show current ARC revision storage",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.showCurrentArcRevisionStorage();
        return true;
      },
    });

    this.addCommand({ id: "show-archive-storage-health", name: "Show Chrono-Deck archive storage health", callback: () => this.showArchiveStorageHealth() });
    this.addCommand({ id: "create-supplementary-arc", name: "Create supplementary ARC from current note", checkCallback: (checking) => {
      const file = this.app.workspace.getActiveFile();
      if (!file || file.extension !== "md") return false;
      if (!checking) this.createSupplementaryArc();
      return true;
    }});
    this.addCommand({ id: "open-chrono-deck", name: "Open Chrono-Deck website", callback: () => window.open(this.settings.chronoDeckUrl || DEFAULT_SETTINGS.chronoDeckUrl, "_blank") });

    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.updateArcFocusClass()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.updateArcFocusClass()));
    this.app.workspace.onLayoutReady(() => this.updateArcFocusClass());
  }

  onunload() {
    document.body.classList.remove("chrono-deck-arc-active");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  setStatus(text) {
    if (this.statusEl) this.statusEl.setText(text);
  }
  getActiveArcFile() {
    const file = this.app.workspace.getActiveFile();
    if (!file || file.extension !== "md") throw new Error("Open an ARC Markdown note first.");
    return file;
  }
  getFrontmatter(file) {
    return this.app.metadataCache.getFileCache(file)?.frontmatter || {};
  }

  updateArcFocusClass() {
    const file = this.app.workspace.getActiveFile();
    const frontmatter = file?.extension === "md" ? this.getFrontmatter(file) : {};
    document.body.classList.toggle("chrono-deck-arc-active", Boolean(extractArcId(frontmatter?.arc_id)));
  }

  async openArcReader() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      new ArcReaderModal(this.app, this, file).open();
    } catch (error) {
      new Notice(`Chrono-Deck reader: ${error.message}`, 8000);
    }
  }

  async normalizeMathInFile(file, notify = true) {
    const source = await this.app.vault.read(file);
    const normalized = normalizeObsidianMath(source);
    if (normalized === source.replace(/\r\n/g, "\n")) return false;
    await this.app.vault.modify(file, normalized);
    if (notify) new Notice("Chrono-Deck: converted \\(…\\) / \\[…\\] math to Obsidian $ / $$ MathJax delimiters.", 7000);
    return true;
  }

  async normalizeCurrentArcMath() {
    try {
      const file = this.getActiveArcFile();
      const changed = await this.normalizeMathInFile(file, true);
      if (!changed) new Notice("Chrono-Deck: math syntax is already Obsidian-compatible.");
    } catch (error) {
      new Notice(`Chrono-Deck math fix failed: ${error.message}`, 8000);
    }
  }

  async showCurrentArcRevisionStorage() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const session = await this.ensureSession();
      const stats = await this.rpc("chrono_arc_revision_stats", { p_arc_id: validation.arcId }, session);
      const count = Number(stats?.snapshotCount || 0);
      const latest = Number(stats?.latestRevision || 0);
      const bytes = Number(stats?.approxSnapshotBytes || 0);
      new Notice(`${validation.arcId}: ${count} stored revision snapshot${count === 1 ? "" : "s"}, ${formatBytes(bytes)} snapshot JSON, latest revision v${latest}.`, 9000);
    } catch (error) {
      new Notice(`Chrono-Deck revision stats failed: ${error.message}. Run the v0.3 Supabase migration first.`, 9000);
    }
  }

  async validateCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      const result = validateFrontmatter(this.getFrontmatter(file), file);
      if (result.errors.length) return void new Notice(`Chrono-Deck: ${result.errors.join(" ")}`, 9000);
      const tail = result.warnings.length ? ` Warnings: ${result.warnings.join(" ")}` : "";
      new Notice(`Chrono-Deck: ${result.arcId} is valid.${tail}`, 7000);
    } catch (error) {
      new Notice(`Chrono-Deck: ${error.message}`, 7000);
    }
  }

  async getPublishableKey() {
    const id = asString(this.settings.publishableKeySecret);
    if (!id) throw new Error("Choose a Supabase publishable-key secret in plugin settings.");
    const value = this.app.secretStorage.getSecret(id);
    if (!value) throw new Error(`SecretStorage has no value for “${id}”.`);
    return value;
  }
  readSession() {
    const raw = this.app.secretStorage.getSecret(SESSION_SECRET_ID);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  writeSession(session) {
    this.app.secretStorage.setSecret(SESSION_SECRET_ID, JSON.stringify(session));
  }
  async clearSession() {
    this.app.secretStorage.setSecret(SESSION_SECRET_ID, "");
    this.setStatus("Chrono-Deck · local");
    new Notice("Chrono-Deck session removed from Obsidian SecretStorage.");
  }

  async authRequest(path, payload) {
    const base = cleanBase(this.settings.supabaseUrl);
    if (!base) throw new Error("Configure the Supabase project URL first.");
    const key = await this.getPublishableKey();
    const response = await requestUrl({
      url: `${base}${path}`,
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      throw: false,
    });
    if (response.status < 200 || response.status >= 300) {
      const message = response.json?.msg || response.json?.message || response.text || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return response.json;
  }

  async signInInteractively() {
    try {
      const email = asString(this.settings.email);
      if (!email) throw new Error("Configure your Supabase email in plugin settings first.");
      const password = await new PasswordModal(this.app, email).ask();
      if (!password) return null;
      const data = await this.authRequest("/auth/v1/token?grant_type=password", { email, password });
      const session = this.normalizeSession(data);
      this.writeSession(session);
      this.setStatus(`Chrono-Deck · ${email}`);
      new Notice("Chrono-Deck signed in.");
      return session;
    } catch (error) {
      new Notice(`Chrono-Deck sign-in failed: ${error.message}`, 8000);
      return null;
    }
  }
  normalizeSession(data) {
    if (!data?.access_token || !data?.refresh_token) throw new Error("Supabase did not return a usable session.");
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at || Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600),
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
    };
  }
  async ensureSession() {
    let session = this.readSession();
    if (!session) session = await this.signInInteractively();
    if (!session) throw new Error("Sign-in cancelled.");
    if (Number(session.expires_at || 0) > Math.floor(Date.now() / 1000) + 60) return session;
    const data = await this.authRequest("/auth/v1/token?grant_type=refresh_token", { refresh_token: session.refresh_token });
    session = this.normalizeSession(data);
    this.writeSession(session);
    return session;
  }
  async rpc(name, payload, session) {
    const base = cleanBase(this.settings.supabaseUrl);
    const key = await this.getPublishableKey();
    const response = await requestUrl({
      url: `${base}/rest/v1/rpc/${name}`,
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      throw: false,
    });
    if (response.status < 200 || response.status >= 300) {
      const message = response.json?.message || response.json?.hint || response.text || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return response.json;
  }


  mediaGatewayBase() {
    return cleanBase(this.settings.mediaGatewayUrl || DEFAULT_SETTINGS.mediaGatewayUrl);
  }

  async presignMedia(payload, session) {
    const base = this.mediaGatewayBase();
    if (!base) throw new Error("Configure the Chrono-Deck media gateway first.");
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const response = await requestUrl({
          url: `${base}/presign`,
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          throw: false,
        });
        if (response.status < 200 || response.status >= 300) {
          const message = response.json?.error || response.json?.message || response.text || `HTTP ${response.status}`;
          throw new Error(`Media gateway: ${message}`);
        }
        return response.json;
      } catch (error) {
        lastError = error;
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
      }
    }
    throw lastError || new Error("Media gateway request failed.");
  }

  resolveLocalMediaFile(sourceFile, target) {
    const cleanTarget = normalizeMarkdownTarget(target);
    if (!cleanTarget) return null;
    const linked = this.app.metadataCache.getFirstLinkpathDest(cleanTarget, sourceFile.path);
    if (linked && linked.extension && linked.extension.toLowerCase() !== "md") return linked;
    const direct = this.app.vault.getAbstractFileByPath(normalizePath(cleanTarget));
    if (direct && direct.extension && direct.extension.toLowerCase() !== "md") return direct;
    return null;
  }

  async hashVaultFile(file) {
    const binary = await this.app.vault.readBinary(file);
    return { binary, contentHash: await sha256Hex(binary) };
  }

  async uploadLocalMedia(ref, sourceFile, logicalArcId, session) {
    const resolved = this.resolveLocalMediaFile(sourceFile, ref.target);
    if (!resolved) {
      return {
        slotKey: `M-${contentFingerprint(`missing:${ref.target}`)}`,
        mediaType: mediaType(ref.target), status: "missing", purpose: "Local ARC media",
        altText: ref.altText || "", fileName: asString(ref.target).split("/").pop() || "asset.bin",
        mimeType: mediaMimeType(ref.target), localPath: ref.target, storageBackend: "r2",
      };
    }

    const byteSize = Number(resolved.stat?.size || 0);
    if (byteSize > MAX_MEDIA_BYTES) {
      return {
        slotKey: `M-${contentFingerprint(`large:${resolved.path}`)}`,
        mediaType: mediaType(resolved.path), status: "skipped", purpose: "Local ARC media exceeds 100 MiB bridge safety cap",
        altText: ref.altText || "", fileName: resolved.name, mimeType: mediaMimeType(resolved.path),
        byteSize, localPath: resolved.path, storageBackend: "r2",
      };
    }

    const { binary, contentHash } = await this.hashVaultFile(resolved);
    const upload = await this.presignMedia({
      action: "upload", logicalArcId, contentHash, fileName: resolved.name, expiresSeconds: 600,
    }, session);
    let remoteEtag = asString(upload.remoteEtag || "");
    const uploadedAt = new Date().toISOString();

    if (!upload.exists) {
      if (!upload.url) throw new Error(`Media gateway returned no upload URL for ${resolved.path}.`);
      const put = await requestUrl({
        url: upload.url,
        method: "PUT",
        headers: { "Content-Type": mediaMimeType(resolved.path) },
        body: binary,
        throw: false,
      });
      if (put.status < 200 || put.status >= 300) throw new Error(`R2 upload failed for ${resolved.path} (HTTP ${put.status}).`);
      remoteEtag = responseHeader(put, "etag");
    }

    return {
      slotKey: `M-${contentFingerprint(`local:${resolved.path}`)}`,
      mediaType: mediaType(resolved.path), status: "uploaded", purpose: "Local ARC media",
      objectKey: upload.objectKey, altText: ref.altText || "", contentHash,
      fileName: resolved.name, mimeType: mediaMimeType(resolved.path), byteSize,
      localPath: resolved.path, storageBackend: "r2", remoteEtag, uploadedAt,
    };
  }

  async syncMediaForFile(file, markdown, arcId, session) {
    const frontmatter = this.getFrontmatter(file);
    const logicalArcId = inferLogicalArcId(frontmatter, arcId);
    const refs = discoverMediaReferences(markdown);
    const items = [];
    const warnings = [];

    for (const ref of refs) {
      if (ref.kind === "external") {
        items.push({
          slotKey: `M-${contentFingerprint(`external:${ref.target}`)}`,
          mediaType: "video", status: "linked", purpose: "External video",
          sourceUrl: ref.target, altText: ref.altText || "", storageBackend: "external",
        });
        continue;
      }
      try {
        items.push(await this.uploadLocalMedia(ref, file, logicalArcId, session));
      } catch (error) {
        console.warn("Chrono-Deck media upload deferred", ref.target, error);
        warnings.push(`${ref.target}: ${error.message}`);
        items.push({
          slotKey: `M-${contentFingerprint(`pending:${ref.target}`)}`,
          mediaType: mediaType(ref.target), status: "pending", purpose: "Local ARC media upload deferred",
          altText: ref.altText || "", fileName: asString(ref.target).split("/").pop() || "asset.bin",
          mimeType: mediaMimeType(ref.target), localPath: ref.target, storageBackend: "r2",
        });
      }
    }

    const manifest = await this.rpc("chrono_sync_arc_media_manifest", {
      p_arc_id: arcId,
      p_logical_arc_id: logicalArcId,
      p_items: items,
    }, session);
    return { logicalArcId, items, warnings, manifest };
  }

  async loadMediaManifest(arcId, session) {
    const value = await this.rpc("chrono_load_arc_media_manifest", { p_arc_id: arcId }, session);
    return Array.isArray(value) ? value : [];
  }

  mediaRestorePath(item, logicalArcId) {
    const original = safeManifestPath(item?.localPath);
    if (original) return original;
    const fileName = asString(item?.fileName, "asset.bin").replace(/[\\/:*?"<>|#^[\]]/g, "-");
    return normalizePath(`${this.settings.assetFolder || DEFAULT_SETTINGS.assetFolder}/${logicalArcId}/${fileName}`);
  }

  async restoreMediaForArc(file, cloud, session) {
    const arcId = extractArcId(cloud?.arcId);
    const logicalArcId = asString(cloud?.logicalArcId) || inferLogicalArcId(this.getFrontmatter(file), arcId);
    const manifest = await this.loadMediaManifest(arcId, session);
    let downloaded = 0;
    let current = 0;
    const conflicts = [];
    const warnings = [];

    for (const item of manifest) {
      if (asString(item?.storageBackend) === "external" || asString(item?.status) === "linked") continue;
      if (asString(item?.storageBackend || "r2") !== "r2" || asString(item?.status) !== "uploaded" || !asString(item?.objectKey)) continue;
      const path = this.mediaRestorePath(item, logicalArcId);
      const expectedHash = asString(item?.contentHash).toLowerCase();
      const existing = this.app.vault.getAbstractFileByPath(path);

      if (existing?.extension) {
        if (!expectedHash) { current += 1; continue; }
        try {
          const { contentHash } = await this.hashVaultFile(existing);
          if (contentHash === expectedHash) { current += 1; continue; }
          conflicts.push(`${path} differs from cloud; local file kept`);
          continue;
        } catch (error) {
          warnings.push(`${path}: ${error.message}`);
          continue;
        }
      }
      if (existing) {
        conflicts.push(`${path} exists but is not a file`);
        continue;
      }

      try {
        const ticket = await this.presignMedia({ action: "download", objectKey: item.objectKey, expiresSeconds: 600 }, session);
        const response = await requestUrl({ url: ticket.url, method: "GET", throw: false });
        if (response.status < 200 || response.status >= 300) throw new Error(`R2 download HTTP ${response.status}`);
        const binary = response.arrayBuffer;
        if (!binary) throw new Error("R2 download returned no binary body");
        if (expectedHash && await sha256Hex(binary) !== expectedHash) throw new Error("downloaded SHA-256 does not match manifest");
        const parent = path.split("/").slice(0, -1).join("/");
        await this.ensureFolder(parent);
        await this.app.vault.createBinary(path, binary);
        downloaded += 1;
      } catch (error) {
        warnings.push(`${path}: ${error.message}`);
      }
    }

    return { downloaded, current, conflicts, warnings, total: manifest.length };
  }

  async showArchiveStorageHealth() {
    try {
      const session = await this.ensureSession();
      const health = await this.rpc("chrono_archive_storage_health", {}, session);
      const relations = health?.projectRelationBytes || {};
      const relationBytes = Object.values(relations).reduce((sum, value) => sum + Number(value || 0), 0);
      new Notice(
        `Chrono-Deck storage: ${Number(health?.documents || 0)} docs / ${Number(health?.logicalArcs || 0)} logical ARCs; ` +
        `${formatBytes(health?.markdownBytes)} Markdown; ${formatBytes(health?.revisionSnapshotBytes)} revision snapshots; ` +
        `${Number(health?.embeddingChunks || 0)} embedding chunks; ${formatBytes(relationBytes)} total ARC-table relations.`,
        12000,
      );
    } catch (error) {
      new Notice(`Chrono-Deck storage health failed: ${error.message}`, 9000);
    }
  }

  async buildSyncPayload(file) {
    const frontmatter = this.getFrontmatter(file);
    const validation = validateFrontmatter(frontmatter, file);
    if (validation.errors.length) throw new Error(validation.errors.join(" "));
    const arcId = validation.arcId;
    const logicalArcId = inferLogicalArcId(frontmatter, arcId);
    const documentType = inferDocumentType(frontmatter, arcId);
    const visibility = asString(frontmatter.visibility || "private");
    const markdown = await this.app.vault.cachedRead(file);
    const split = splitMarkdown(stripFrontmatter(markdown), visibility);
    const document = {
      schemaVersion: 2,
      arcId,
      logicalArcId,
      documentType,
      canonicalLabel: asString(frontmatter.canonical_label || arcId),
      title: asString(frontmatter.title || file.basename.replace(new RegExp(`^${arcId}\\s*[-—:]?\\s*`, "i"), ""), arcId),
      status: asString(frontmatter.document_status || "raw"),
      visibility,
      curriculumRole: asString(frontmatter.curriculum_role || "core"),
      priority: asString(frontmatter.priority || "should_do"),
      planningStatus: asString(frontmatter.planning_status || "pending"),
      sourceSystem: "obsidian",
      sourcePath: file.path,
      sourceMarkdown: markdown,
      shortConclusion: split.shortConclusion,
      experience: split.experience,
      sections: split.sections,
    };
    return { document, relationships: collectRelationships(frontmatter, arcId), warnings: validation.warnings };
  }

  async computeFileFingerprint(file) {
    const markdown = await this.app.vault.cachedRead(file);
    return contentFingerprint(markdown);
  }

  async loadCloudArc(arcId, session) {
    return await this.rpc("chrono_load_obsidian_arc", { p_arc_id: arcId }, session);
  }

  async listCloudArcs(session) {
    const value = await this.rpc("chrono_list_obsidian_arcs", {}, session);
    return Array.isArray(value) ? value : [];
  }

  findLocalArcFile(arcId) {
    const wanted = extractArcId(arcId);
    if (!wanted) return null;
    for (const file of this.app.vault.getMarkdownFiles()) {
      const fmId = extractArcId(this.getFrontmatter(file)?.arc_id);
      if (fmId === wanted) return file;
    }
    return null;
  }

  async stampCloudState(file, cloud) {
    const arcId = extractArcId(cloud?.arcId);
    const revision = Number(cloud?.revision || 0);
    const relations = relationshipFrontmatter(cloud?.relationships);
    const syncedAt = new Date().toISOString();
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.arc_id = arcId;
      fm.title = asString(cloud?.title || arcId);
      fm.document_status = asString(cloud?.status || "raw");
      fm.visibility = asString(cloud?.visibility || "private");
      fm.curriculum_role = asString(cloud?.curriculumRole || "core");
      fm.priority = asString(cloud?.priority || "should_do");
      fm.planning_status = asString(cloud?.planningStatus || "pending");
      for (const [field] of RELATION_FIELDS) {
        const ids = relations.get(field) || [];
        if (ids.length) fm[field] = ids.map((id) => `[[${id}]]`);
        else delete fm[field];
      }
      fm.chrono_revision = revision;
      fm.chrono_synced_at = syncedAt;
    });
    const fingerprint = await this.computeFileFingerprint(file);
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.chrono_revision = revision;
      fm.chrono_synced_at = syncedAt;
      fm.chrono_fingerprint = fingerprint;
    });
  }

  async isTrackedFileDirty(file) {
    const frontmatter = this.getFrontmatter(file);
    const baseline = asString(frontmatter?.chrono_fingerprint);
    if (!baseline) return true;
    return (await this.computeFileFingerprint(file)) !== baseline;
  }

  async writeCloudArc(cloud, { open = false } = {}) {
    const arcId = extractArcId(cloud?.arcId);
    if (!arcId) throw new Error("Cloud ARC is missing a stable arcId.");
    const cloudRevision = Number(cloud?.revision || 0);
    let file = this.findLocalArcFile(arcId);
    let action = "created";

    if (file) {
      const frontmatter = this.getFrontmatter(file);
      const localRevision = Number(frontmatter?.chrono_revision || 0);
      if (localRevision === cloudRevision) {
        if (open) await this.app.workspace.getLeaf(false).openFile(file);
        return { action: "current", file, arcId, revision: cloudRevision };
      }
      if (localRevision > cloudRevision) {
        return { action: "conflict", file, arcId, revision: cloudRevision, reason: `local revision ${localRevision} is newer than cloud revision ${cloudRevision}` };
      }
      if (await this.isTrackedFileDirty(file)) {
        return { action: "conflict", file, arcId, revision: cloudRevision, reason: "local note has unsynced edits" };
      }
      await this.app.vault.process(file, () => renderCloudMarkdown(cloud));
      action = "updated";
    } else {
      await this.ensureFolder(this.settings.arcFolder);
      const path = normalizePath(`${this.settings.arcFolder}/${arcId}.md`);
      const collision = this.app.vault.getAbstractFileByPath(path);
      if (collision) throw new Error(`${path} already exists but is not recognized as ${arcId}.`);
      file = await this.app.vault.create(path, renderCloudMarkdown(cloud));
    }

    await this.stampCloudState(file, cloud);
    if (open) await this.app.workspace.getLeaf(false).openFile(file);
    return { action, file, arcId, revision: cloudRevision };
  }

  async pullCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const session = await this.ensureSession();
      this.setStatus(`${validation.arcId} · pulling…`);
      const cloud = await this.loadCloudArc(validation.arcId, session);
      if (!cloud) throw new Error(`${validation.arcId} does not exist in Supabase yet.`);
      const result = await this.writeCloudArc(cloud, { open: true });
      if (result.action === "conflict") {
        this.setStatus(`${validation.arcId} · conflict`);
        new Notice(`Pull stopped for ${validation.arcId}: ${result.reason}. Your local note was not changed.`, 10000);
        return;
      }
      let media = { downloaded: 0, conflicts: [], warnings: [] };
      try { media = await this.restoreMediaForArc(result.file, cloud, session); }
      catch (error) { media.warnings = [error.message]; }
      this.setStatus(`${validation.arcId} · cloud v${result.revision}`);
      const mediaText = media.downloaded ? ` Restored ${media.downloaded} media file${media.downloaded === 1 ? "" : "s"} from R2.` : "";
      const mediaProblems = [...media.conflicts, ...media.warnings];
      const mediaProblemText = mediaProblems.length ? ` Media warnings: ${mediaProblems.slice(0, 3).join("; ")}${mediaProblems.length > 3 ? "; …" : ""}` : "";
      new Notice((result.action === "current"
        ? `${validation.arcId} is already at cloud revision ${result.revision}.`
        : `Pulled ${validation.arcId} revision ${result.revision} (${result.action}).`) + mediaText + mediaProblemText, mediaProblems.length ? 12000 : 8000);
    } catch (error) {
      this.setStatus("Chrono-Deck · pull failed");
      new Notice(`Chrono-Deck pull failed: ${error.message}`, 10000);
    }
  }

  async pullAllArcs() {
    try {
      const session = await this.ensureSession();
      this.setStatus("Chrono-Deck · pulling vault…");
      const summaries = await this.listCloudArcs(session);
      let created = 0;
      let updated = 0;
      let current = 0;
      let mediaRestored = 0;
      const conflicts = [];
      const mediaWarnings = [];
      for (const summary of summaries) {
        const arcId = extractArcId(summary?.arcId);
        if (!arcId) continue;
        const cloud = await this.loadCloudArc(arcId, session);
        if (!cloud) continue;
        const result = await this.writeCloudArc(cloud);
        if (result.action === "created") created += 1;
        else if (result.action === "updated") updated += 1;
        else if (result.action === "current") current += 1;
        else if (result.action === "conflict") conflicts.push(`${arcId}: ${result.reason}`);
        if (result.action !== "conflict") {
          try {
            const media = await this.restoreMediaForArc(result.file, cloud, session);
            mediaRestored += media.downloaded;
            mediaWarnings.push(...media.conflicts.map((value) => `${arcId}: ${value}`), ...media.warnings.map((value) => `${arcId}: ${value}`));
          } catch (error) {
            mediaWarnings.push(`${arcId}: ${error.message}`);
          }
        }
      }
      this.setStatus(`Chrono-Deck · pulled ${created + updated}`);
      const conflictText = conflicts.length ? ` Conflicts skipped (${conflicts.length}): ${conflicts.slice(0, 4).join("; ")}${conflicts.length > 4 ? "; …" : ""}` : "";
      const mediaText = mediaRestored ? ` Restored ${mediaRestored} media file${mediaRestored === 1 ? "" : "s"} from R2.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media warnings (${mediaWarnings.length}): ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Cloud pull complete: ${created} created, ${updated} updated, ${current} already current.${mediaText}${conflictText}${mediaWarningText}`, conflicts.length || mediaWarnings.length ? 12000 : 8000);
    } catch (error) {
      this.setStatus("Chrono-Deck · pull failed");
      new Notice(`Chrono-Deck vault pull failed: ${error.message}`, 10000);
    }
  }

  async syncCurrentArc() {
    try {
      const file = this.getActiveArcFile();
      this.setStatus("Chrono-Deck · syncing…");
      const payload = await this.buildSyncPayload(file);
      const frontmatter = this.getFrontmatter(file);
      const localRevision = Number(frontmatter?.chrono_revision || 0);
      const session = await this.ensureSession();
      const cloud = await this.loadCloudArc(payload.document.arcId, session);
      const cloudRevision = Number(cloud?.revision || 0);
      if (cloudRevision !== localRevision) {
        throw new Error(`Revision conflict: cloud is v${cloudRevision}, but this note is based on v${localRevision}. Pull the cloud ARC first; nothing was overwritten.`);
      }
      const result = await this.rpc("chrono_sync_obsidian_arc_v2", {
        p_document: payload.document,
        p_relationships: payload.relationships,
        p_expected_revision: localRevision,
        p_note: `Synced from Obsidian: ${file.path}`,
      }, session);
      const revision = Number(result?.revision || 0);
      let mediaStatus = "none";
      let mediaCount = 0;
      const mediaWarnings = [];
      try {
        const media = await this.syncMediaForFile(file, payload.document.sourceMarkdown, payload.document.arcId, session);
        mediaStatus = asString(media.manifest?.mediaStatus || "none");
        mediaCount = media.items.filter((item) => item.status === "uploaded" || item.status === "linked").length;
        mediaWarnings.push(...media.warnings);
      } catch (error) {
        console.warn("Chrono-Deck media manifest sync deferred", error);
        mediaWarnings.push(error.message);
      }
      const syncedAt = new Date().toISOString();
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
        fm.chrono_media_status = mediaStatus;
      });
      const fingerprint = await this.computeFileFingerprint(file);
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        fm.chrono_revision = revision;
        fm.chrono_synced_at = syncedAt;
        fm.chrono_fingerprint = fingerprint;
      });
      let pruned = 0;
      try {
        pruned = Number(await this.rpc("chrono_prune_arc_revisions", {
          p_arc_id: payload.document.arcId,
          p_keep_recent: 20,
          p_keep_every: 50,
        }, session)) || 0;
      } catch (pruneError) {
        console.warn("Chrono-Deck revision pruning skipped; run the v0.3 migration if needed.", pruneError);
      }
      this.setStatus(`${payload.document.arcId} · synced v${revision}`);
      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";
      const pruneText = pruned ? ` Pruned ${pruned} old full snapshot${pruned === 1 ? "" : "s"}.` : "";
      const mediaText = mediaCount ? ` Mirrored ${mediaCount} media item${mediaCount === 1 ? "" : "s"} to R2/external links.` : "";
      const mediaWarningText = mediaWarnings.length ? ` Media deferred: ${mediaWarnings.slice(0, 3).join("; ")}${mediaWarnings.length > 3 ? "; …" : ""}` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${mediaText}${pruneText}${warningText}${mediaWarningText}`, mediaWarnings.length ? 12000 : 8000);
    } catch (error) {
      this.setStatus("Chrono-Deck · sync failed");
      new Notice(`Chrono-Deck sync failed: ${error.message}`, 10000);
    }
  }

  makeSupplementaryId() {
    const raw = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID().replace(/-/g, "").slice(0, 10)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    return `SUP-${raw.toUpperCase()}`;
  }
  async ensureFolder(path) {
    const normalized = normalizePath(path || "");
    if (!normalized) return;
    const parts = normalized.split("/").filter(Boolean);
    let current = "";
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      if (!this.app.vault.getAbstractFileByPath(current)) await this.app.vault.createFolder(current);
    }
  }
  safeFileName(value) {
    return asString(value, "Supplementary ARC").replace(/[\\/:*?"<>|#^[\]]/g, "-").replace(/\s+/g, " ").trim();
  }
  async createSupplementaryArc() {
    try {
      const source = this.getActiveArcFile();
      const sourceValidation = validateFrontmatter(this.getFrontmatter(source), source);
      if (sourceValidation.errors.length) throw new Error(sourceValidation.errors.join(" "));
      const title = await new TextPromptModal(this.app, "New supplementary ARC", "Title").ask();
      if (!title) return;
      const id = this.makeSupplementaryId();
      await this.ensureFolder(this.settings.arcFolder);
      const filename = `${id} - ${this.safeFileName(title)}.md`;
      const path = normalizePath(`${this.settings.arcFolder}/${filename}`);
      const note = `---\narc_id: ${id}\ntitle: "${title.replace(/"/g, '\\"')}"\ndocument_status: raw\nvisibility: private\ncurriculum_role: supplementary\npriority: should_do\nplanning_status: pending\nsupplementary_to:\n  - "[[${source.basename}]]"\n---\n\n# ${title}\n\n## Mission\n\n\n## Investigation\n\n\n## Conclusion\n\n`;
      const created = await this.app.vault.create(path, note);
      await this.app.fileManager.processFrontMatter(source, (fm) => {
        const existing = asList(fm.supplementary).map((item) => asString(item)).filter(Boolean);
        const link = `[[${created.basename}]]`;
        if (!existing.includes(link)) existing.push(link);
        fm.supplementary = existing;
      });
      await this.app.workspace.getLeaf(true).openFile(created);
      new Notice(`Created ${id} and linked it as supplementary to ${sourceValidation.arcId}.`);
    } catch (error) {
      new Notice(`Could not create supplementary ARC: ${error.message}`, 9000);
    }
  }
};
