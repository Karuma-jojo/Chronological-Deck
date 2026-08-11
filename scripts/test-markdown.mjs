import assert from "node:assert/strict";
import {
  arcDocumentToMarkdown,
  parseArcMarkdown,
} from "../js/data/markdown-arc.js";

const source = {
  schemaVersion: 1,
  arcId: "ARC005",
  canonicalLabel: "ARC005",
  title: "Zeno and Infinite Subdivision",
  status: "editing",
  visibility: "private",
  shortConclusion: "An infinite subdivision does not by itself imply infinite traversal time.",
  experience: "I first attacked Achilles using relative speed.",
  sections: [
    {
      id: "proof-1",
      type: "proof",
      heading: "Relative velocity argument",
      contentMarkdown: "If $v_A>v_T$, then $t=L/(v_A-v_T)$.",
      visibility: "private",
      position: 0,
    },
    {
      id: "reflection-1",
      type: "reflection",
      heading: "What changed in my reasoning",
      contentMarkdown: "Infinity in the description is not automatically infinity in elapsed time.",
      visibility: "public",
      position: 1,
    },
  ],
  revision: 7,
  createdAt: "2026-08-11T00:00:00.000Z",
  updatedAt: "2026-08-11T00:00:00.000Z",
};

const markdown = arcDocumentToMarkdown(source);
const parsed = parseArcMarkdown(markdown, { filename: "arc005.md" });

assert.equal(parsed.arcId, source.arcId);
assert.equal(parsed.title, source.title);
assert.equal(parsed.status, source.status);
assert.equal(parsed.visibility, source.visibility);
assert.equal(parsed.shortConclusion, source.shortConclusion);
assert.equal(parsed.experience, source.experience);
assert.equal(parsed.sections.length, 2);
assert.deepEqual(
  parsed.sections.map(({ type, heading, contentMarkdown, visibility, position }) => ({
    type,
    heading,
    contentMarkdown,
    visibility,
    position,
  })),
  source.sections.map(({ type, heading, contentMarkdown, visibility, position }) => ({
    type,
    heading,
    contentMarkdown,
    visibility,
    position,
  })),
);

const plain = parseArcMarkdown(
  `# ARC004 — Zeno\n\n## Achilles and the tortoise\n\nRelative speed.\n\n## Proof by contradiction\n\nSuppose otherwise.\n`,
  { filename: "notes.md" },
);
assert.equal(plain.arcId, "ARC004");
assert.equal(plain.title, "Zeno");
assert.equal(plain.sections[0].type, "notes");
assert.equal(plain.sections[1].type, "proof");

console.log("Markdown ARC round-trip checks passed.");
