import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../js/data/world.js", import.meta.url), "utf8").trim();
const match = source.match(/^export const WORLD = (.*);$/s);
if (!match) throw new Error("js/data/world.js must export WORLD as a JSON-compatible object.");

const WORLD = JSON.parse(match[1]);
const errors = [];
const nodes = Array.isArray(WORLD.nodes) ? WORLD.nodes : [];
const ids = nodes.map((node) => node.id);
const idSet = new Set(ids);

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(nodes.length === WORLD.worldCount, `WORLD.worldCount=${WORLD.worldCount}, but nodes.length=${nodes.length}.`);
expect(nodes.length === 630, `Expected the v1 registry to contain 630 nodes, found ${nodes.length}.`);
expect(idSet.size === ids.length, `Duplicate stable node IDs detected (${ids.length - idSet.size} duplicate entries).`);
expect((WORLD.terminals || []).length === 20, `Expected 20 terminal routes, found ${(WORLD.terminals || []).length}.`);

for (const node of nodes) {
  expect(Boolean(node.id), "A World Registry node is missing its stable id.");
  for (const prerequisite of node.masteryPrereqs || []) {
    expect(idSet.has(prerequisite), `${node.id} masteryPrereqs references missing node ${prerequisite}.`);
  }
  for (const prerequisite of node.storyPrereqs || []) {
    expect(idSet.has(prerequisite), `${node.id} storyPrereqs references missing node ${prerequisite}.`);
  }
}

for (const terminal of WORLD.terminals || []) {
  expect(Boolean(terminal.id), "A terminal route is missing its id.");
  for (const required of terminal.required || []) {
    expect(idSet.has(required), `${terminal.id} requires missing node ${required}.`);
  }
  expect(
    (terminal.required || []).length === terminal.count,
    `${terminal.id} declares count=${terminal.count}, but required.length=${(terminal.required || []).length}.`,
  );
}

for (const id of [...(WORLD.commonScientific || []), ...(WORLD.commonFoundations || [])]) {
  expect(idSet.has(id), `Frozen common core references missing node ${id}.`);
}
expect(
  (WORLD.commonScientific || []).length + (WORLD.commonFoundations || []).length === WORLD.commonCount,
  `WORLD.commonCount=${WORLD.commonCount}, but frozen arrays total ${(WORLD.commonScientific || []).length + (WORLD.commonFoundations || []).length}.`,
);

if (errors.length) {
  console.error(`World Registry validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`World Registry OK: ${nodes.length} unique nodes, ${(WORLD.terminals || []).length} terminal routes, all checked references resolve.`);
