import {
  ARC_STATUSES,
  ARC_VISIBILITIES,
  SECTION_TYPES,
  normalizeArcDocument,
} from "./arc-store.js";

function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeArcId(value) {
  const match = String(value || "").toUpperCase().match(/\b(ARC|SIDE)\s*0*(\d{1,6})\b/);
  if (!match) return "";
  const number = Number(match[2]);
  return `${match[1]}${String(number).padStart(3, "0")}`;
}

function parseFrontmatter(source) {
  const text = String(source || "").replace(/^\uFEFF/, "");
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    return { meta: {}, body: text };
  }
  const normalized = text.replace(/\r\n/g, "\n");
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) return { meta: {}, body: text };
  const block = normalized.slice(4, end);
  const meta = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    meta[match[1].toLowerCase()] = value;
  }
  return { meta, body: normalized.slice(end + 5) };
}

function inferSectionType(heading) {
  const value = String(heading || "").toLowerCase();
  if (/\bproof\b|demonstration|derivation/.test(value)) return "proof";
  if (/investigation|experiment|attempt|problem|challenge/.test(value)) return "investigation";
  if (/definition|terminology|meaning/.test(value)) return "definition";
  if (/conclusion|result|takeaway|final/.test(value)) return "conclusion";
  if (/reflection|lesson|philosoph|what i learned/.test(value)) return "reflection";
  if (/dialogue|conversation|transcript|foreman|arbiter/.test(value)) return "dialogue";
  if (/media|diagram|image|figure|visual/.test(value)) return "media";
  if (/opening|scene|narrative|story|setup|prologue/.test(value)) return "narrative";
  return "notes";
}

function parseTaggedHeading(raw, defaultVisibility) {
  let heading = String(raw || "").trim();
  let type = "";
  let visibility = "";
  const tags = [];
  while (heading.startsWith("[")) {
    const end = heading.indexOf("]");
    if (end < 0) break;
    tags.push(heading.slice(1, end).trim().toLowerCase());
    heading = heading.slice(end + 1).trim();
  }
  for (const tag of tags) {
    if (SECTION_TYPES.includes(tag)) type = tag;
    if (ARC_VISIBILITIES.includes(tag)) visibility = tag;
  }
  return {
    heading: heading || "Untitled section",
    type: type || inferSectionType(heading),
    visibility: visibility || defaultVisibility,
  };
}

function cleanTitle(raw, arcId) {
  let title = String(raw || "").trim();
  if (!title) return "";
  if (arcId) {
    const escaped = arcId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    title = title.replace(new RegExp(`^${escaped}\\s*(?:[-—:·]|\\|)?\\s*`, "i"), "").trim();
  }
  return title;
}

/**
 * Parse a human-editable Markdown ARC.
 *
 * Supported canonical form:
 * ---
 * arc_id: ARC005
 * status: editing
 * visibility: private
 * ---
 * # ARC005 — Title
 * ## Short Conclusion
 * ...
 * ## Experience / Chronicle
 * ...
 * ## [proof][private] Heading
 * ...
 *
 * Plain Markdown without tags/frontmatter also works: H2 headings become sections
 * and section types are inferred from heading words.
 */
export function parseArcMarkdown(source, { fallbackArcId = "", filename = "" } = {}) {
  const { meta, body } = parseFrontmatter(source);
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const fileArcId = normalizeArcId(filename);
  let arcId = normalizeArcId(meta.arc_id || meta.arcid) || fileArcId || normalizeArcId(fallbackArcId);
  let title = "";
  const defaultVisibility = ARC_VISIBILITIES.includes(meta.visibility) ? meta.visibility : "private";
  const status = ARC_STATUSES.includes(meta.status) ? meta.status : "raw";
  let shortConclusion = "";
  let experience = "";
  const sections = [];
  let current = null;
  let opening = [];
  let fenced = false;
  let fenceMarker = "";

  const flushCurrent = () => {
    if (!current) return;
    const content = current.lines.join("\n").replace(/^\n+|\n+$/g, "");
    if (current.special === "shortConclusion") shortConclusion = content;
    else if (current.special === "experience") experience = content;
    else {
      sections.push({
        id: uid(),
        type: current.type,
        heading: current.heading,
        contentMarkdown: content,
        visibility: current.visibility,
        position: sections.length,
      });
    }
    current = null;
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) {
        fenced = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        fenced = false;
        fenceMarker = "";
      }
    }

    if (!fenced) {
      const h1 = line.match(/^#\s+(.+)$/);
      if (h1) {
        const fromHeading = normalizeArcId(h1[1]);
        if (!arcId && fromHeading) arcId = fromHeading;
        title = cleanTitle(h1[1], fromHeading || arcId);
        continue;
      }

      const h2 = line.match(/^##\s+(.+)$/);
      if (h2) {
        flushCurrent();
        const rawHeading = h2[1].trim();
        const lower = rawHeading.toLowerCase();
        if (/^short\s+conclusion$|^summary\s+conclusion$/.test(lower)) {
          current = { special: "shortConclusion", lines: [] };
        } else if (/^experience(?:\s*\/\s*chronicle)?$|^chronicle$|^experience\s+notes$/.test(lower)) {
          current = { special: "experience", lines: [] };
        } else {
          const tagged = parseTaggedHeading(rawHeading, defaultVisibility);
          current = { ...tagged, lines: [] };
        }
        continue;
      }
    }

    if (current) current.lines.push(line);
    else opening.push(line);
  }
  flushCurrent();

  const openingText = opening.join("\n").replace(/^\n+|\n+$/g, "");
  if (openingText) {
    sections.unshift({
      id: uid(),
      type: "narrative",
      heading: "Opening",
      contentMarkdown: openingText,
      visibility: defaultVisibility,
      position: 0,
    });
    sections.forEach((section, index) => {
      section.position = index;
    });
  }

  if (!sections.length) {
    sections.push({
      id: uid(),
      type: "notes",
      heading: "Imported Markdown",
      contentMarkdown: "",
      visibility: defaultVisibility,
      position: 0,
    });
  }

  return {
    arcId,
    title,
    status,
    visibility: defaultVisibility,
    shortConclusion,
    experience,
    sections,
  };
}

export function applyMarkdownToDocument(baseDocument, parsed) {
  const base = normalizeArcDocument(baseDocument);
  if (parsed.arcId && parsed.arcId !== base.arcId) {
    throw new Error(`Markdown targets ${parsed.arcId}, but the open document is ${base.arcId}.`);
  }
  return normalizeArcDocument({
    ...base,
    title: parsed.title || base.title,
    status: parsed.status || base.status,
    visibility: parsed.visibility || base.visibility,
    shortConclusion: parsed.shortConclusion || "",
    experience: parsed.experience || "",
    sections: parsed.sections,
  });
}

function safeFrontmatterValue(value) {
  const text = String(value || "");
  if (/^[A-Za-z0-9_.-]+$/.test(text)) return text;
  return JSON.stringify(text);
}

export function arcDocumentToMarkdown(input) {
  const document = normalizeArcDocument(input);
  const lines = [
    "---",
    `arc_id: ${safeFrontmatterValue(document.arcId)}`,
    `status: ${safeFrontmatterValue(document.status)}`,
    `visibility: ${safeFrontmatterValue(document.visibility)}`,
    "---",
    "",
    `# ${document.canonicalLabel} — ${document.title}`,
    "",
  ];

  if (document.shortConclusion) {
    lines.push("## Short Conclusion", "", document.shortConclusion.trim(), "");
  }
  if (document.experience) {
    lines.push("## Experience / Chronicle", "", document.experience.trim(), "");
  }

  [...document.sections]
    .sort((a, b) => a.position - b.position)
    .forEach((section) => {
      lines.push(
        `## [${section.type}][${section.visibility}] ${section.heading}`,
        "",
        section.contentMarkdown.trimEnd(),
        "",
      );
    });

  return `${lines.join("\n").replace(/\n{3,}$/g, "\n\n")}\n`;
}
