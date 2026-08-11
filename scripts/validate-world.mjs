import { WORLD } from "../js/data/world.js";

const originalTerminalSnapshot = JSON.stringify(WORLD.terminals);
const originalTerminalIds = WORLD.terminals.map((terminal) => terminal.id);
const originalWorldCount = WORLD.worldCount;

await import("../js/data/law-expansion.js");

const errors = [];
const nodes = Array.isArray(WORLD.nodes) ? WORLD.nodes : [];
const ids = nodes.map((node) => node.id);
const idSet = new Set(ids);
const terminals = Array.isArray(WORLD.terminals) ? WORLD.terminals : [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(
  originalWorldCount === 630,
  `Base scientific registry should remain 630 nodes before T21 overlay, found ${originalWorldCount}.`,
);
expect(
  originalTerminalIds.length === 20,
  `Base scientific registry should remain 20 terminal routes, found ${originalTerminalIds.length}.`,
);
expect(
  JSON.stringify(terminals.slice(0, 20)) === originalTerminalSnapshot,
  "T01–T20 changed while applying the T21 law overlay.",
);

expect(nodes.length === WORLD.worldCount, `WORLD.worldCount=${WORLD.worldCount}, but nodes.length=${nodes.length}.`);
expect(nodes.length === 710, `Expected the v1.1 registry to contain 710 nodes, found ${nodes.length}.`);
expect(WORLD.existingCount === 500, `Expected 500 historical/existing Chrono-Deck nodes, found ${WORLD.existingCount}.`);
expect(WORLD.newCount === 210, `Expected 210 mastery-expansion nodes, found ${WORLD.newCount}.`);
expect(idSet.size === ids.length, `Duplicate stable node IDs detected (${ids.length - idSet.size} duplicate entries).`);
expect(terminals.length === 21, `Expected 21 terminal routes, found ${terminals.length}.`);
expect(terminals.at(-1)?.id === "T21", `Expected the added terminal to be T21, found ${terminals.at(-1)?.id || "missing"}.`);
expect(
  terminals.at(-1)?.name === "Law, Jurisprudence & Legal Reasoning",
  "T21 terminal name is not the expected law route.",
);
expect(
  terminals.at(-1)?.count === 91,
  `Expected T21 to contain 91 required nodes, found ${terminals.at(-1)?.count ?? "missing"}.`,
);

for (const node of nodes) {
  expect(Boolean(node.id), "A World Registry node is missing its stable id.");
  for (const prerequisite of node.masteryPrereqs || []) {
    expect(idSet.has(prerequisite), `${node.id} masteryPrereqs references missing node ${prerequisite}.`);
  }
  for (const prerequisite of node.storyPrereqs || []) {
    expect(idSet.has(prerequisite), `${node.id} storyPrereqs references missing node ${prerequisite}.`);
  }
}

for (const terminal of terminals) {
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
  expect(idSet.has(id), `Frozen scientific core references missing node ${id}.`);
}
expect(
  (WORLD.commonScientific || []).length + (WORLD.commonFoundations || []).length === WORLD.commonCount,
  `WORLD.commonCount=${WORLD.commonCount}, but frozen arrays total ${(WORLD.commonScientific || []).length + (WORLD.commonFoundations || []).length}.`,
);

for (let arc = 631; arc <= 710; arc += 1) {
  const id = `ARC${arc}`;
  const node = nodes.find((candidate) => candidate.id === id);
  expect(Boolean(node), `T21 law overlay is missing ${id}.`);
  if (node) {
    expect(node.terminalTags?.includes("T21"), `${id} is missing terminal tag T21.`);
    expect(node.domains?.includes("Law & Jurisprudence"), `${id} is missing the Law & Jurisprudence domain.`);
  }
}

if (errors.length) {
  console.error(`World Registry validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `World Registry OK: ${nodes.length} unique nodes, ${terminals.length} terminal routes; T01–T20 preserved and T21 law overlay validated.`,
);
