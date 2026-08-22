"use strict";

const DOCUMENT_STATUSES = new Set(["raw", "editing", "polished"]);
const VISIBILITIES = new Set(["private", "public"]);
const CURRICULUM_ROLES = new Set(["core", "supplementary", "optional"]);
const PRIORITIES = new Set(["must_do", "should_do", "nice_to_have"]);
const PLANNING_STATUSES = new Set(["pending", "active", "deferred", "parked"]);
const DOCUMENT_TYPES = new Set(["canonical", "raw_dump", "polished_extract", "proof", "recovery", "supplementary_artifact"]);
const MEDIA_STATUSES = new Set(["none", "pending", "partial", "complete"]);
const RECOVERY_STATES = new Set(["not_owed", "owed", "cleared", "unknown"]);
const ASSISTANCE_LEVELS = new Set([
  "WALL", "HINT", "FORGE", "FORGE0", "FORGE1", "FORGE2", "FORGE3", "FORGE4", "FORGE5", "GUIDE", "REVEAL",
]);
const SECTION_ROLES = new Set([
  "opening", "mission", "starting_facts", "investigation", "false_starts", "breakthrough", "main_ideas",
  "proof", "application", "transfer", "error_ledger", "provenance", "debt", "media", "conclusion",
  "chronicle", "clearance", "notes",
]);
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
  if (/^[A-Za-z][A-Za-z0-9_-]{2,127}$/.test(text)) return text.toUpperCase();
  return "";
}

function inferLogicalArcId(frontmatter, arcId) {
  const explicit = extractArcId(frontmatter?.logical_arc_id);
  if (explicit) return explicit;
  return asString(arcId).replace(/-(RAW|POLISHED)$/i, "");
}

function inferDocumentType(frontmatter, arcId) {
  const explicit = asString(frontmatter?.document_type).toLowerCase();
  if (explicit) return explicit;
  if (/-RAW$/i.test(arcId)) return "raw_dump";
  if (/-POLISHED$/i.test(arcId)) return "polished_extract";
  return "canonical";
}

function normalizeClearance(value) {
  const raw = asString(value);
  if (!raw) return "";
  const key = raw
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[—–-]+/g, "_")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const map = new Map([
    ["incomplete", "incomplete"],
    ["core_cleared", "core_cleared"],
    ["core_cleared_mastery_pending", "core_cleared_mastery_pending"],
    ["fully_mastered", "fully_mastered"],
    ["mastered", "fully_mastered"],
  ]);
  return map.get(key) || "";
}

function displayClearance(value) {
  const normalized = normalizeClearance(value);
  return ({
    incomplete: "Incomplete",
    core_cleared: "Core Cleared",
    core_cleared_mastery_pending: "Core Cleared — Mastery Pending",
    fully_mastered: "Fully Mastered",
  })[normalized] || asString(value);
}

function normalizeTags(value) {
  const raw = asList(value).flatMap((item) => {
    if (typeof item !== "string") return [item];
    return item.includes(",") ? item.split(",") : [item];
  });
  const out = [];
  const seen = new Set();
  for (const item of raw) {
    const tag = asString(item).replace(/^#+/, "");
    if (!tag) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(tag);
  }
  return out;
}

function normalizeAssistance(value) {
  const raw = asString(value).toUpperCase().replace(/[\s_-]+/g, "");
  if (!raw) return "";
  if (raw === "FORGE") return "FORGE";
  const match = raw.match(/^FORGE([0-5])$/);
  if (match) return `FORGE${match[1]}`;
  return ASSISTANCE_LEVELS.has(raw) ? raw : "";
}

function sanitizeJson(value, depth = 0) {
  if (depth > 12) return null;
  if (value === null || value === undefined) return null;
  if (["string", "number", "boolean"].includes(typeof value)) return value;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((entry) => sanitizeJson(entry, depth + 1));
  if (typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      if (key === "position" || key.startsWith("chrono_")) continue;
      out[key] = sanitizeJson(entry, depth + 1);
    }
    return out;
  }
  return String(value);
}

function validateNumberField(frontmatter, field, { integer = false, min = 0 } = {}, errors) {
  const value = frontmatter?.[field];
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number) || (integer && !Number.isInteger(number)) || number < min) {
    errors.push(`${field} must be ${integer ? "an integer" : "a number"} >= ${min} or null.`);
    return null;
  }
  return number;
}

function validateDateField(frontmatter, field, errors) {
  const value = asString(frontmatter?.[field]);
  if (!value) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) errors.push(`${field} must use YYYY-MM-DD or null.`);
  return value;
}

function validateFrontmatter(frontmatter = {}, file = null) {
  const errors = [];
  const warnings = [];
  const arcId = extractArcId(frontmatter?.arc_id);
  if (!arcId) errors.push("arc_id is required and must be a stable ARC identifier.");

  const documentType = inferDocumentType(frontmatter, arcId);
  if (!DOCUMENT_TYPES.has(documentType)) {
    errors.push(`document_type must be one of: ${[...DOCUMENT_TYPES].join(", ")}.`);
  }

  const logicalArcId = inferLogicalArcId(frontmatter, arcId);
  if (!logicalArcId) errors.push("logical_arc_id is required or must be inferable from arc_id.");
  if (!asString(frontmatter?.logical_arc_id) && ["raw_dump", "polished_extract"].includes(documentType)) {
    warnings.push(`Add explicit logical_arc_id: ${logicalArcId} to paired V3 documents.`);
  }

  const suffixType = /-RAW$/i.test(arcId) ? "raw_dump" : /-POLISHED$/i.test(arcId) ? "polished_extract" : "";
  if (suffixType && documentType !== suffixType) {
    errors.push(`${arcId} implies document_type ${suffixType}, not ${documentType}.`);
  }
  if (documentType === "raw_dump" && !/-RAW$/i.test(arcId)) errors.push("raw_dump arc_id must end with -RAW.");
  if (documentType === "polished_extract" && !/-POLISHED$/i.test(arcId)) errors.push("polished_extract arc_id must end with -POLISHED.");
  if (["raw_dump", "polished_extract"].includes(documentType)) {
    const expectedLogical = arcId.replace(/-(RAW|POLISHED)$/i, "");
    if (logicalArcId && expectedLogical && logicalArcId !== expectedLogical) {
      errors.push(`logical_arc_id must be ${expectedLogical} for ${arcId}.`);
    }
  }

  const status = asString(frontmatter?.document_status || "raw").toLowerCase();
  if (!DOCUMENT_STATUSES.has(status)) errors.push(`document_status must be one of: ${[...DOCUMENT_STATUSES].join(", ")}.`);
  const visibility = asString(frontmatter?.visibility || "private").toLowerCase();
  if (!VISIBILITIES.has(visibility)) errors.push("visibility must be private or public.");
  const curriculumRole = asString(frontmatter?.curriculum_role || "core").toLowerCase();
  if (!CURRICULUM_ROLES.has(curriculumRole)) errors.push(`curriculum_role must be one of: ${[...CURRICULUM_ROLES].join(", ")}.`);
  const priority = asString(frontmatter?.priority || "should_do").toLowerCase();
  if (!PRIORITIES.has(priority)) errors.push(`priority must be one of: ${[...PRIORITIES].join(", ")}.`);
  const planningStatus = asString(frontmatter?.planning_status || "pending").toLowerCase();
  if (!PLANNING_STATUSES.has(planningStatus)) errors.push(`planning_status must be one of: ${[...PLANNING_STATUSES].join(", ")}.`);

  const clearanceSource = asString(frontmatter?.clearance);
  const clearance = normalizeClearance(clearanceSource);
  if (clearanceSource && !clearance) errors.push("clearance must be Incomplete, Core Cleared, Core Cleared — Mastery Pending, or Fully Mastered.");
  if (!clearanceSource && ["raw_dump", "polished_extract"].includes(documentType)) {
    errors.push("clearance is required for paired RAW/POLISHED documents.");
  } else if (!clearanceSource) {
    warnings.push("clearance is missing; Supabase may retain or infer a legacy value from Markdown.");
  }

  const mediaStatus = asString(frontmatter?.media_status).toLowerCase();
  if (mediaStatus && !MEDIA_STATUSES.has(mediaStatus)) errors.push(`media_status must be one of: ${[...MEDIA_STATUSES].join(", ")}.`);

  const recoveryState = asString(frontmatter?.recovery_state).toLowerCase();
  if (recoveryState && !RECOVERY_STATES.has(recoveryState)) errors.push(`recovery_state must be one of: ${[...RECOVERY_STATES].join(", ")}.`);

  for (const field of ["nominal_control_state_final", "highest_effective_assistance"]) {
    const value = asString(frontmatter?.[field]);
    if (value && !normalizeAssistance(value)) errors.push(`${field} has an unsupported assistance state.`);
  }

  const moduleIndex = validateNumberField(frontmatter, "module_index", { integer: true, min: 0 }, errors);
  const atomicPosition = validateNumberField(frontmatter, "atomic_position", { integer: true, min: 0 }, errors);
  const atomicTotalInModule = validateNumberField(frontmatter, "atomic_total_in_module", { integer: true, min: 0 }, errors);
  const focusedHours = validateNumberField(frontmatter, "focused_hours", { integer: false, min: 0 }, errors);
  const startedAt = validateDateField(frontmatter, "started_at", errors);
  const completedAt = validateDateField(frontmatter, "completed_at", errors);

  if (!asString(frontmatter?.title)) warnings.push("title is missing; the file name will be used.");
  const basename = asString(file?.basename || file?.name).replace(/\.md$/i, "");
  if (basename && arcId && !basename.toUpperCase().startsWith(arcId)) {
    warnings.push(`Prefer file names that start with ${arcId} so document identity remains obvious.`);
  }

  const tags = normalizeTags(frontmatter?.tags);
  const archiveMetadata = {
    terminalId: asString(frontmatter?.terminal_id) || null,
    terminalTitle: asString(frontmatter?.terminal_title) || null,
    moduleId: asString(frontmatter?.module_id) || null,
    moduleIndex,
    moduleTitle: asString(frontmatter?.module_title) || null,
    canonicalNode: asString(frontmatter?.canonical_node) || null,
    atomicPosition,
    atomicTotalInModule,
    atomicAuditVersion: asString(frontmatter?.atomic_audit_version) || null,
    engineVersion: asString(frontmatter?.engine_version) || null,
    nominalControlStateFinal: normalizeAssistance(frontmatter?.nominal_control_state_final) || null,
    highestEffectiveAssistance: normalizeAssistance(frontmatter?.highest_effective_assistance) || null,
    recoveryState: recoveryState || null,
    unresolvedGate: asString(frontmatter?.unresolved_gate) || null,
    focusedHours,
    startedAt: startedAt || null,
    completedAt: completedAt || null,
    proofDebt: asList(frontmatter?.proof_debt).map((value) => sanitizeJson(value)),
    implementationDebt: asList(frontmatter?.implementation_debt).map((value) => sanitizeJson(value)),
    transferDebt: asList(frontmatter?.transfer_debt).map((value) => sanitizeJson(value)),
    recoveryDebt: asList(frontmatter?.recovery_debt).map((value) => sanitizeJson(value)),
    assistanceSummary: asString(frontmatter?.assistance_summary) || null,
    provenanceSummary: asString(frontmatter?.provenance_summary) || null,
    assistanceEvents: asList(frontmatter?.assistance_events).map((value) => sanitizeJson(value)),
  };

  return {
    arcId,
    logicalArcId,
    documentType,
    status,
    visibility,
    curriculumRole,
    priority,
    planningStatus,
    clearance,
    mediaStatus,
    tags,
    archiveMetadata,
    sourceFrontmatter: sanitizeJson(frontmatter),
    errors,
    warnings,
  };
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

function inferSectionRole(heading) {
  const value = asString(heading).toLowerCase().replace(/\s+/g, " ").trim();
  if (value === "opening") return "opening";
  if (/^mission\b|opening problem/.test(value)) return "mission";
  if (/starting (knowledge|position|facts)|allowed facts|initial (facts|assumptions)/.test(value)) return "starting_facts";
  if (/false start|wrong turn|dead end|failed approach/.test(value)) return "false_starts";
  if (/breakthrough|turning point|decisive discovery/.test(value)) return "breakthrough";
  if (/main ideas|central ideas|key ideas/.test(value)) return "main_ideas";
  if (/error|misconception|mistake/.test(value) && /ledger|record|worth remembering|audit/.test(value)) return "error_ledger";
  if (/provenance|assistance audit|ownership audit/.test(value)) return "provenance";
  if (/debt|unresolved gate|recovery owed/.test(value)) return "debt";
  if (/unfamiliar transfer|\btransfer\b/.test(value)) return "transfer";
  if (/application|applied/.test(value)) return "application";
  if (/final (derivation|proof|implementation)|\bproof\b|theorem|lemma|derivation/.test(value)) return "proof";
  if (/short conclusion|conclusion|takeaway|result/.test(value)) return "conclusion";
  if (/experience|chronicle|reflection/.test(value)) return "chronicle";
  if (/arc clearance|clearance/.test(value)) return "clearance";
  if (/media|diagram|figure|image|visual/.test(value)) return "media";
  if (/investigation|experiment|checkpoint|problem|attempt/.test(value)) return "investigation";
  return "notes";
}

function sectionTypeForRole(role, heading = "") {
  switch (role) {
    case "proof": return "proof";
    case "conclusion": case "clearance": return "conclusion";
    case "error_ledger": case "provenance": case "debt": case "chronicle": return "reflection";
    case "media": return "media";
    case "opening": return "narrative";
    case "mission": case "starting_facts": case "investigation": case "false_starts": case "breakthrough": case "main_ideas": case "application": case "transfer": return "investigation";
    default: {
      const value = asString(heading).toLowerCase();
      if (/definition|terminology|vocabulary/.test(value)) return "definition";
      if (/dialogue|hearing|conversation/.test(value)) return "dialogue";
      if (/prologue|scene|narrative/.test(value)) return "narrative";
      return "notes";
    }
  }
}

function parseSectionMarker(line) {
  const match = asString(line).match(/^<!--\s*CHRONO-SECTION\s+([\s\S]*?)\s*-->$/i);
  if (!match) return null;
  const attrs = {};
  for (const attr of match[1].matchAll(/([A-Za-z][A-Za-z0-9_-]*)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s]+))/g)) {
    attrs[attr[1].toLowerCase()] = attr[2] ?? attr[3] ?? attr[4] ?? "";
  }
  const id = asString(attrs.id);
  const role = asString(attrs.role).toLowerCase();
  if (!id || !role) return { id, role, invalid: true };
  return { id, role, invalid: false };
}

function splitMarkdown(body, defaultVisibility = "private") {
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
      if (!fenced) { fenced = true; fenceChar = fence[1][0]; }
      else if (fence[1][0] === fenceChar) { fenced = false; fenceChar = ""; }
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

  const sections = [];
  const warnings = [];
  const errors = [];
  const fallbackCounts = new Map();
  const seenIds = new Set();
  let shortConclusion = "";
  let experience = "";

  for (const chunk of chunks) {
    const contentLines = String(chunk.contentMarkdown || "").split("\n");
    let markerIndex = -1;
    let marker = null;
    for (let index = 0; index < contentLines.length; index += 1) {
      if (!contentLines[index].trim()) continue;
      const parsed = parseSectionMarker(contentLines[index]);
      if (parsed) { markerIndex = index; marker = parsed; }
      break;
    }

    if (marker?.invalid) errors.push(`Section “${chunk.heading}” has an invalid CHRONO-SECTION marker.`);
    let role = marker && !marker.invalid ? marker.role : inferSectionRole(chunk.heading);
    if (!SECTION_ROLES.has(role)) {
      errors.push(`Section “${chunk.heading}” uses unsupported section role “${role}”.`);
      role = "notes";
    }

    let id = marker && !marker.invalid ? marker.id : "";
    if (!id) {
      const base = slug(chunk.heading);
      const number = (fallbackCounts.get(base) || 0) + 1;
      fallbackCounts.set(base, number);
      id = `obs-${base}-${number}`;
      if (chunk.heading !== "Opening") warnings.push(`Section “${chunk.heading}” has no CHRONO-SECTION marker; generated unstable fallback id ${id}.`);
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(id)) errors.push(`Section “${chunk.heading}” has invalid stable section id “${id}”.`);
    if (seenIds.has(id)) errors.push(`Duplicate section id “${id}”.`);
    seenIds.add(id);

    if (markerIndex >= 0) contentLines.splice(markerIndex, 1);
    const contentMarkdown = contentLines.join("\n").replace(/^\n+|\n+$/g, "");
    const key = chunk.heading.toLowerCase().replace(/\s+/g, " ").trim();
    if (key === "short conclusion" || (role === "conclusion" && !shortConclusion)) shortConclusion = contentMarkdown;
    if (key === "experience" || key === "experience / chronicle" || key === "experience / chronicle note" || (role === "chronicle" && !experience)) experience = contentMarkdown;

    sections.push({
      id,
      sectionRole: role,
      type: sectionTypeForRole(role, chunk.heading),
      heading: chunk.heading,
      contentMarkdown,
      visibility: defaultVisibility,
      position: sections.length,
    });
  }

  return { shortConclusion, experience, sections, warnings, errors };
}

function stripFrontmatter(content) {
  return String(content || "").replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
}

function collectRelationships(frontmatter, arcId) {
  const rows = [];
  const warnings = [];
  for (const [field, relationType] of RELATION_FIELDS) {
    for (const raw of asList(frontmatter?.[field])) {
      const toArcId = extractArcId(raw);
      if (!toArcId) {
        warnings.push(`Ignored malformed ${field} relationship: ${asString(raw) || "(empty)"}.`);
        continue;
      }
      if (toArcId === arcId) {
        warnings.push(`Ignored self-relationship ${field}: ${toArcId}.`);
        continue;
      }
      rows.push({ fromArcId: arcId, toArcId, relationType, position: rows.length });
    }
  }
  const unique = new Map();
  for (const row of rows) unique.set(`${row.relationType}:${row.toArcId}`, row);
  return { rows: [...unique.values()].map((row, position) => ({ ...row, position })), warnings };
}

function buildSyncPayload(frontmatter, file, markdown) {
  const validation = validateFrontmatter(frontmatter, file);
  const split = splitMarkdown(stripFrontmatter(markdown), validation.visibility || "private");
  const relationships = collectRelationships(frontmatter, validation.arcId);
  const errors = [...validation.errors, ...split.errors];
  const warnings = [...validation.warnings, ...split.warnings, ...relationships.warnings];
  if (errors.length) return { document: null, relationships: relationships.rows, errors, warnings };

  const fileBasename = asString(file?.basename || file?.name).replace(/\.md$/i, "");
  const titleFallback = fileBasename.replace(new RegExp(`^${validation.arcId}\\s*[-—:]?\\s*`, "i"), "");
  const schemaVersionRaw = Number(frontmatter?.schema_version ?? 3);
  const schemaVersion = Number.isInteger(schemaVersionRaw) && schemaVersionRaw >= 1 ? schemaVersionRaw : 3;

  const document = {
    schemaVersion,
    arcId: validation.arcId,
    logicalArcId: validation.logicalArcId,
    documentType: validation.documentType,
    canonicalLabel: asString(frontmatter?.canonical_label || validation.logicalArcId),
    title: asString(frontmatter?.title || titleFallback, validation.logicalArcId),
    status: validation.status,
    visibility: validation.visibility,
    curriculumRole: validation.curriculumRole,
    priority: validation.priority,
    planningStatus: validation.planningStatus,
    clearance: validation.clearance || undefined,
    mediaStatus: validation.mediaStatus || undefined,
    tags: validation.tags,
    sourceFrontmatter: validation.sourceFrontmatter,
    archiveMetadata: validation.archiveMetadata,
    sourceSystem: "obsidian",
    sourcePath: asString(file?.path),
    sourceMarkdown: String(markdown || ""),
    shortConclusion: split.shortConclusion,
    experience: split.experience,
    sections: split.sections,
  };
  return { document, relationships: relationships.rows, errors, warnings };
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

function yamlScalar(value) {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return JSON.stringify(String(value));
}

function yamlLines(key, value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return [`${pad}${key}: []`];
    const lines = [`${pad}${key}:`];
    for (const item of value) {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        lines.push(`${pad}  -`);
        for (const [childKey, childValue] of Object.entries(item)) lines.push(...yamlLines(childKey, childValue, indent + 4));
      } else lines.push(`${pad}  - ${yamlScalar(item)}`);
    }
    return lines;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return [`${pad}${key}: {}`];
    const lines = [`${pad}${key}:`];
    for (const [childKey, childValue] of entries) lines.push(...yamlLines(childKey, childValue, indent + 2));
    return lines;
  }
  return [`${pad}${key}: ${yamlScalar(value)}`];
}

function renderCloudMarkdown(cloud) {
  if (asString(cloud?.sourceMarkdown)) return String(cloud.sourceMarkdown).replace(/\r\n/g, "\n");
  const arcId = extractArcId(cloud?.arcId) || "ARC";
  const logicalArcId = extractArcId(cloud?.logicalArcId) || arcId.replace(/-(RAW|POLISHED)$/i, "");
  const documentType = asString(cloud?.documentType) || inferDocumentType({}, arcId);
  const title = asString(cloud?.title || cloud?.canonicalLabel || logicalArcId);
  const sourceFrontmatter = cloud?.sourceFrontmatter && typeof cloud.sourceFrontmatter === "object" ? sanitizeJson(cloud.sourceFrontmatter) : {};
  const frontmatter = {
    ...sourceFrontmatter,
    schema_version: Number(cloud?.schemaVersion || sourceFrontmatter?.schema_version || 3),
    arc_id: arcId,
    logical_arc_id: logicalArcId,
    canonical_label: asString(cloud?.canonicalLabel || sourceFrontmatter?.canonical_label || logicalArcId),
    document_type: documentType,
    document_status: asString(cloud?.status || sourceFrontmatter?.document_status || "raw"),
    title,
    visibility: asString(cloud?.visibility || sourceFrontmatter?.visibility || "private"),
    curriculum_role: asString(cloud?.curriculumRole || sourceFrontmatter?.curriculum_role || "core"),
    priority: asString(cloud?.priority || sourceFrontmatter?.priority || "should_do"),
    planning_status: asString(cloud?.planningStatus || sourceFrontmatter?.planning_status || "pending"),
  };
  if (asString(cloud?.clearance)) frontmatter.clearance = displayClearance(cloud.clearance);
  if (Array.isArray(cloud?.tags)) frontmatter.tags = cloud.tags;
  if (asString(cloud?.mediaStatus)) frontmatter.media_status = cloud.mediaStatus;

  const relations = relationshipFrontmatter(cloud?.relationships);
  for (const [field] of RELATION_FIELDS) {
    const ids = relations.get(field) || [];
    if (ids.length) frontmatter[field] = ids.map((id) => `[[${id}]]`);
    else if (field in frontmatter) delete frontmatter[field];
  }

  const lines = ["---"];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (key === "position" || key.startsWith("chrono_") || value === undefined) continue;
    lines.push(...yamlLines(key, value));
  }
  lines.push("---", "", `# ${title}`, "");

  const sections = Array.isArray(cloud?.sections) ? cloud.sections : [];
  let hasConclusion = false;
  let hasChronicle = false;
  for (const section of sections) {
    const heading = asString(section?.heading || "Untitled section");
    const role = asString(section?.sectionRole || section?.section_role || inferSectionRole(heading));
    const id = asString(section?.id || section?.sectionId || `obs-${slug(heading)}-1`);
    lines.push(`## ${heading}`, `<!-- CHRONO-SECTION id=${id} role=${SECTION_ROLES.has(role) ? role : "notes"} -->`, "");
    const content = String(section?.contentMarkdown || "").trim();
    if (content) lines.push(content, "");
    if (role === "conclusion") hasConclusion = true;
    if (role === "chronicle") hasChronicle = true;
  }
  if (!hasConclusion && asString(cloud?.shortConclusion)) {
    lines.push("## Short Conclusion", "<!-- CHRONO-SECTION id=conclusion role=conclusion -->", "", String(cloud.shortConclusion).trim(), "");
  }
  if (!hasChronicle && asString(cloud?.experience)) {
    lines.push("## Experience / Chronicle", "<!-- CHRONO-SECTION id=chronicle role=chronicle -->", "", String(cloud.experience).trim(), "");
  }
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

module.exports = {
  DOCUMENT_TYPES,
  SECTION_ROLES,
  RELATION_FIELDS,
  asString,
  asList,
  extractArcId,
  inferLogicalArcId,
  inferDocumentType,
  normalizeClearance,
  displayClearance,
  normalizeTags,
  normalizeAssistance,
  inferSectionRole,
  sectionTypeForRole,
  parseSectionMarker,
  splitMarkdown,
  stripFrontmatter,
  collectRelationships,
  relationshipFrontmatter,
  validateFrontmatter,
  buildSyncPayload,
  renderCloudMarkdown,
};
