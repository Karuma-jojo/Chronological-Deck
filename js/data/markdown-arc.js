import {
  ARC_STATUSES,
  ARC_VISIBILITIES,
  SECTION_TYPES,
  normalizeArcDocument,
} from "./arc-store.js";

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

function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

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

function normalizeArcId(value) {
  let text = String(value || "").trim();
  const wiki = text.match(/!?\[\[([^\]]+)\]\]/);
  if (wiki) text = wiki[1].split("|")[0].split("#")[0].trim();
  const sup = text.toUpperCase().match(/\bSUP-[A-Z0-9_-]{6,}\b/);
  if (sup) return sup[0];
  const match = text.toUpperCase().match(/\b(ARC|SIDE)\s*[-_ ]?0*(\d{1,6})\b/);
  if (!match) return "";
  const number = Number(match[2]);
  return `${match[1]}${String(number).padStart(3, "0")}`;
}

function asList(value) {
  if (value === null || value === undefined || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function scalar(meta, ...keys) {
  for (const key of keys) {
    const value = meta?.[key];
    if (Array.isArray(value)) {
      if (value.length) return String(value[0]);
    } else if (value !== null && value !== undefined && String(value).trim()) {
      return String(value);
    }
  }
  return "";
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
  let listKey = "";
  for (const line of block.split("\n")) {
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

function collectRelationships(meta, arcId) {
  const relationships = [];
  for (const [field, relationType] of RELATION_FIELDS) {
    for (const raw of asList(meta?.[field])) {
      const toArcId = normalizeArcId(raw);
      if (!toArcId || toArcId === arcId) continue;
      relationships.push({
        fromArcId: arcId,
        toArcId,
        relationType,
        position: relationships.length,
      });
    }
  }
  const unique = new Map();
  for (const row of relationships) unique.set(`${row.relationType}:${row.toArcId}`, row);
  return [...unique.values()].map((row, position) => ({ ...row, position }));
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

/** Parse a human-editable Markdown ARC, including the Obsidian bridge frontmatter contract. */
export function parseArcMarkdown(source, { fallbackArcId = "", filename = "" } = {}) {
  const { meta, body } = parseFrontmatter(source);
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const fileArcId = normalizeArcId(filename);
  let arcId = normalizeArcId(scalar(meta, "arc_id", "arcid")) || fileArcId || normalizeArcId(fallbackArcId);
  let title = scalar(meta, "title");
  const defaultVisibility = ARC_VISIBILITIES.includes(scalar(meta, "visibility"))
    ? scalar(meta, "visibility")
    : "private";
  const requestedStatus = scalar(meta, "document_status", "status");
  const status = ARC_STATUSES.includes(requestedStatus) ? requestedStatus : "raw";
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
        if (!title) title = cleanTitle(h1[1], fromHeading || arcId);
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
    canonicalLabel: scalar(meta, "canonical_label") || arcId,
    title,
    status,
    visibility: defaultVisibility,
    curriculumRole: scalar(meta, "curriculum_role") || "core",
    priority: scalar(meta, "priority") || "should_do",
    planningStatus: scalar(meta, "planning_status") || "pending",
    sourceSystem: "web",
    sourcePath: filename ? `web:${filename}` : "web:paste",
    sourceMarkdown: String(source || ""),
    relationships: collectRelationships(meta, arcId),
    frontmatter: meta,
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
    ...parsed,
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
    `title: ${safeFrontmatterValue(document.title)}`,
    `document_status: ${safeFrontmatterValue(document.status)}`,
    `visibility: ${safeFrontmatterValue(document.visibility)}`,
    `curriculum_role: ${safeFrontmatterValue(document.curriculumRole || "core")}`,
    `priority: ${safeFrontmatterValue(document.priority || "should_do")}`,
    `planning_status: ${safeFrontmatterValue(document.planningStatus || "pending")}`,
  ];

  const byType = new Map(RELATION_FIELDS.map(([field, relationType]) => [relationType, field]));
  const relationshipGroups = new Map();
  for (const row of document.relationships || []) {
    const field = byType.get(row.relationType);
    if (!field || !row.toArcId) continue;
    if (!relationshipGroups.has(field)) relationshipGroups.set(field, []);
    relationshipGroups.get(field).push(row.toArcId);
  }
  for (const [field] of RELATION_FIELDS) {
    const ids = relationshipGroups.get(field) || [];
    if (!ids.length) continue;
    lines.push(`${field}:`);
    for (const id of ids) lines.push(`  - ${JSON.stringify(`[[${id}]]`)}`);
  }

  lines.push("---", "", `# ${document.canonicalLabel} — ${document.title}`, "");

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
