import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");

const errors = [];
const nodes = new Map((WORLD.nodes || []).map((node) => [node.id, node]));
const terminal = (WORLD.terminals || []).find((candidate) => candidate.id === "T22");

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(WORLD.version === "1.2", `Expected WORLD.version=1.2, found ${WORLD.version}.`);
expect((WORLD.nodes || []).length === 710, `Expected 710 world nodes, found ${(WORLD.nodes || []).length}.`);
expect((WORLD.terminals || []).length === 22, `Expected 22 terminal routes, found ${(WORLD.terminals || []).length}.`);
expect(Boolean(terminal), "T22 terminal was not registered.");
expect(terminal?.name === "Mathematical Quantitative Research & Capital Building", "Unexpected T22 terminal name.");
expect((terminal?.required || []).length === terminal?.count, "T22 count does not match required-node length.");
expect(new Set(terminal?.required || []).size === (terminal?.required || []).length, "T22 contains duplicate required IDs.");

const required = new Set(terminal?.required || []);
for (const id of terminal?.required || []) {
  const node = nodes.get(id);
  expect(Boolean(node), `T22 requires missing node ${id}.`);
  expect(node?.terminalTags?.includes("T22"), `${id} is missing terminal tag T22.`);
  for (const prerequisite of node?.masteryPrereqs || []) {
    expect(required.has(prerequisite), `T22 prerequisite closure failed: ${id} requires ${prerequisite}.`);
  }
}

for (const id of [...(WORLD.commonScientific || []), ...(WORLD.commonFoundations || [])]) {
  expect(required.has(id), `T22 is missing frozen-core node ${id}.`);
}

if (errors.length) {
  console.error(`T22 validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`T22 OK: ${terminal.count} prerequisite-closed nodes; 710-node world; 22 terminals; v1.2.`);
