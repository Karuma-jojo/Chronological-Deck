#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function fail(message) {
  console.error(`Chrono-Deck archive pair: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) args[key] = true;
    else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function yamlString(value) {
  return JSON.stringify(String(value ?? ''));
}

function normalizeArcId(value) {
  return String(value || '').trim().toUpperCase();
}

function noteFrontmatter({
  documentId,
  logicalArcId,
  documentType,
  documentStatus,
  title,
  moduleId,
  moduleTitle,
  canonicalNode,
  counterpart,
  planningStatus,
}) {
  const lines = [
    '---',
    `arc_id: ${documentId}`,
    `logical_arc_id: ${logicalArcId}`,
    `document_type: ${documentType}`,
    `title: ${yamlString(title)}`,
    `document_status: ${documentStatus}`,
    'visibility: private',
    'curriculum_role: core',
    'priority: must_do',
    `planning_status: ${planningStatus}`,
    `media_status: ${documentType === 'polished_extract' ? 'pending' : 'none'}`,
  ];
  if (moduleId) lines.push(`module_id: ${yamlString(moduleId)}`);
  if (moduleTitle) lines.push(`module_title: ${yamlString(moduleTitle)}`);
  if (canonicalNode) lines.push(`canonical_node: ${yamlString(canonicalNode)}`);
  lines.push('related:', `  - ${yamlString(`[[${counterpart}]]`)}`);
  lines.push('tags: []', '---', '');
  return lines.join('\n');
}

function rawTemplate(meta) {
  return `${noteFrontmatter({ ...meta, documentType: 'raw_dump', documentStatus: 'raw', counterpart: `${meta.logicalArcId}-POLISHED` })}
# ${meta.title} — RAW DUMP

> Forensic black-box record. Preserve chronology, failed attempts, assistance, provenance, and unresolved debt. Do not sanitize.

## Opening Problem

<!-- AI-ARCHIVE: opening problem from the source conversation -->

## Starting Knowledge / Allowed Facts

<!-- AI-ARCHIVE: starting ledger and assumptions -->

## Chronological Investigation

<!-- AI-ARCHIVE: every serious attempt in actual order, including baby-step algebra when it mattered -->

## WALL Evaluations

<!-- AI-ARCHIVE: significant WALL evaluations only -->

## FORGE / GUIDE / REVEAL Audit

<!-- AI-ARCHIVE: nominal level, actual informational effect, and what was taught -->

## Turning Points

<!-- AI-ARCHIVE: conceptual pivots and breakthroughs -->

## Final Proof / Derivation / Implementation

<!-- AI-ARCHIVE: preserve actual ownership; do not silently convert guided work into USER WORK -->

## Applications

<!-- AI-ARCHIVE: post-discovery applications -->

## Unfamiliar Transfer

<!-- AI-ARCHIVE: unseen transfer and outcome -->

## Provenance by Major Bridge

<!--
BRIDGE:
NOMINAL CONTROL STATE:
HIGHEST EFFECTIVE ASSISTANCE:
USER CONTRIBUTION:
ENGINE CONTRIBUTION:
PROVENANCE:
RECOVERY OWED: YES / NO
-->

## Error Ledger

<!-- AI-ARCHIVE: errors, misconceptions, corrections, and what fixed them -->

## Proof / Prerequisite / Recovery Debt

<!-- AI-ARCHIVE: unresolved debt only; write none if none -->

## Clearance

<!-- AI-ARCHIVE: Incomplete / Core Cleared / Core Cleared — Mastery Pending / Fully Mastered -->
`;
}

function polishedTemplate(meta) {
  return `${noteFrontmatter({ ...meta, documentType: 'polished_extract', documentStatus: 'editing', counterpart: `${meta.logicalArcId}-RAW` })}
# ${meta.title}

> Canonical readable extract generated from the original ARC conversation. Preserve important mistakes and provenance, but optimize for future study and narrative coherence.

## Mission

<!-- AI-ARCHIVE: concise mission and intellectual destination -->

## Starting Position

<!-- AI-ARCHIVE: what the User knew and did not yet know -->

## Investigation Chronicle

<!-- AI-ARCHIVE: coherent narrative of the real discovery path; retain pedagogically important false starts -->

## Main Ideas

<!-- AI-ARCHIVE: canonical concepts and mathematics -->

## Final Proof / Derivation / Implementation

<!-- AI-ARCHIVE: polished final result with accurate assistance provenance -->

## Application

<!-- AI-ARCHIVE: meaningful application -->

## Unfamiliar Transfer

<!-- AI-ARCHIVE: transfer and what it demonstrated -->

## Mistakes Worth Remembering

<!-- AI-ARCHIVE: only high-value recurring errors -->

## Provenance / Assistance

<!-- AI-ARCHIVE: concise bridge-by-bridge assistance history -->

## Media

<!-- MEDIA-SLOT: add screenshots / GIFs / diagrams / video links later. Media pending must never block ARC completion. -->

## Short Conclusion

<!-- AI-ARCHIVE: compact canonical takeaway -->

## Experience / Chronicle

<!-- AI-ARCHIVE: memorable human/narrative account -->

## Clearance

<!-- AI-ARCHIVE: final status and any recovery debt -->
`;
}

const args = parseArgs(process.argv.slice(2));
const logicalArcId = normalizeArcId(args['arc-id'] || args._[0]);
const title = String(args.title || args._[1] || '').trim();

if (!logicalArcId) fail('Pass --arc-id T22-M01-A02 (or the id as the first positional argument).');
if (!title) fail('Pass --title "Atomic ARC title" (or the title as the second positional argument).');

const outputDir = path.resolve(args.out || 'Chrono-Deck/ARCs');
const planningStatus = String(args['planning-status'] || 'parked');
if (!['pending', 'active', 'deferred', 'parked'].includes(planningStatus)) fail('planning-status must be pending, active, deferred, or parked.');

const meta = {
  logicalArcId,
  title,
  moduleId: args['module-id'] || '',
  moduleTitle: args['module-title'] || '',
  canonicalNode: args['canonical-node'] || '',
  planningStatus,
};

fs.mkdirSync(outputDir, { recursive: true });

const files = [
  {
    id: `${logicalArcId}-RAW`,
    path: path.join(outputDir, `${logicalArcId}-RAW.md`),
    content: rawTemplate({ ...meta, documentId: `${logicalArcId}-RAW` }),
  },
  {
    id: `${logicalArcId}-POLISHED`,
    path: path.join(outputDir, `${logicalArcId}-POLISHED.md`),
    content: polishedTemplate({ ...meta, documentId: `${logicalArcId}-POLISHED` }),
  },
];

for (const file of files) {
  if (fs.existsSync(file.path) && !args.force) fail(`${file.path} already exists. Pass --force to replace it.`);
}

for (const file of files) {
  fs.writeFileSync(file.path, file.content, 'utf8');
  console.log(`created ${file.path}`);
}

console.log(`\nLogical ARC: ${logicalArcId}`);
console.log('Two representations created. Fill both independently from the original conversation; do not derive POLISHED from RAW.');
