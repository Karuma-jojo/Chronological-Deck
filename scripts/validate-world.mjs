import { WORLD } from "../js/data/world.js";

const originalTerminalSnapshot = JSON.stringify(WORLD.terminals);
const originalTerminalIds = WORLD.terminals.map((terminal) => terminal.id);
const originalWorldCount = WORLD.worldCount;

await import("../js/data/law-expansion.js");
const postLawTerminalSnapshot = JSON.stringify(WORLD.terminals);
const { T22_SEEDS } = await import("../js/data/t22-quant-research.js");

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
  `Base scientific registry should remain 630 nodes before overlays, found ${originalWorldCount}.`,
);
expect(
  originalTerminalIds.length === 20,
  `Base scientific registry should remain 20 terminal routes, found ${originalTerminalIds.length}.`,
);
expect(
  JSON.stringify(terminals.slice(0, 20)) === originalTerminalSnapshot,
  "T01–T20 changed while applying overlays.",
);
expect(
  JSON.stringify(terminals.slice(0, 21)) === postLawTerminalSnapshot,
  "T01–T21 changed while applying the T22 quantitative-research overlay.",
);

expect(nodes.length === WORLD.worldCount, `WORLD.worldCount=${WORLD.worldCount}, but nodes.length=${nodes.length}.`);
expect(nodes.length === 710, `Expected the v1.2 registry to contain 710 nodes, found ${nodes.length}.`);
expect(WORLD.existingCount === 500, `Expected 500 historical/existing Chrono-Deck nodes, found ${WORLD.existingCount}.`);
expect(WORLD.newCount === 210, `Expected 210 mastery-expansion nodes, found ${WORLD.newCount}.`);
expect(idSet.size === ids.length, `Duplicate stable node IDs detected (${ids.length - idSet.size} duplicate entries).`);
expect(terminals.length === 22, `Expected 22 terminal routes after T22 overlay, found ${terminals.length}.`);

const t21 = terminals.find((terminal) => terminal.id === "T21");
expect(Boolean(t21), "Expected T21 law terminal to remain present.");
expect(t21?.name === "Law, Jurisprudence & Legal Reasoning", "T21 terminal name is not the expected law route.");
expect(t21?.count === 91, `Expected T21 to contain 91 required nodes, found ${t21?.count ?? "missing"}.`);

const t22 = terminals.find((terminal) => terminal.id === "T22");
expect(Boolean(t22), "Expected T22 Mathematical Quantitative Research terminal to load.");
expect(
  t22?.name === "Mathematical Quantitative Research & Capital Building",
  "T22 terminal name is not the expected quantitative-research route.",
);
expect(
  (t22?.required || []).length === t22?.count,
  `T22 declares count=${t22?.count ?? "missing"}, but required.length=${(t22?.required || []).length}.`,
);
expect(
  (t22?.required || []).length >= T22_SEEDS.length,
  `T22 prerequisite closure unexpectedly shrank below its ${T22_SEEDS.length} career-critical seeds.`,
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
  const requiredSet = new Set(terminal.required || []);
  for (const required of terminal.required || []) {
    expect(idSet.has(required), `${terminal.id} requires missing node ${required}.`);
  }
  expect(
    (terminal.required || []).length === terminal.count,
    `${terminal.id} declares count=${terminal.count}, but required.length=${(terminal.required || []).length}.`,
  );

  if (terminal.id === "T22") {
    for (const required of terminal.required || []) {
      const node = nodes.find((candidate) => candidate.id === required);
      for (const prerequisite of node?.masteryPrereqs || []) {
        expect(requiredSet.has(prerequisite), `T22 is not prerequisite-closed: ${required} requires ${prerequisite}.`);
      }
      expect(node?.terminalTags?.includes("T22"), `${required} is missing terminal tag T22.`);
    }
  }
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
  `World Registry OK: ${nodes.length} unique nodes, ${terminals.length} terminal routes; T01–T20 preserved, T21 law overlay validated, and T22 prerequisite closure validated (${t22.required.length} nodes).`,
);
