import { WORLD } from "../js/data/world.js";

const originalTerminalSnapshot = JSON.stringify(WORLD.terminals);
const originalTerminalIds = WORLD.terminals.map((terminal) => terminal.id);
const originalWorldCount = WORLD.worldCount;

await import("../js/data/law-expansion.js");
const postLawTerminalSnapshot = JSON.stringify(WORLD.terminals);
const postLawNodeCount = WORLD.nodes.length;
const { T22_NEW_NODES, T22_ORDER, T22_PREREQS } = await import("../js/data/t22-quant-research.js");
const postT22TerminalSnapshot = JSON.stringify(WORLD.terminals);
const postT22NodeCount = WORLD.nodes.length;
const { T23_NEW_NODES, T23_ORDER, T23_PREREQS } = await import("../js/data/t23-universal-scientist.js");

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
expect(postLawNodeCount === 710, `Law overlay should produce 710 nodes before T22, found ${postLawNodeCount}.`);
expect(postT22NodeCount === 717, `T22 overlay should produce 717 nodes before T23, found ${postT22NodeCount}.`);
expect(
  JSON.stringify(terminals.slice(0, 20)) === originalTerminalSnapshot,
  "T01–T20 changed while applying overlays.",
);
expect(
  JSON.stringify(terminals.slice(0, 21)) === postLawTerminalSnapshot,
  "T01–T21 changed while applying the T22 quantitative-research overlay.",
);
expect(
  JSON.stringify(terminals.slice(0, 22)) === postT22TerminalSnapshot,
  "T01–T22 changed while applying the T23 universal-scientist overlay.",
);

expect(nodes.length === WORLD.worldCount, `WORLD.worldCount=${WORLD.worldCount}, but nodes.length=${nodes.length}.`);
expect(nodes.length === 732, `Expected the v1.4 registry to contain 732 nodes, found ${nodes.length}.`);
expect(WORLD.version === "1.4", `Expected WORLD.version=1.4, found ${WORLD.version}.`);
expect(WORLD.existingCount === 500, `Expected 500 historical/existing Chrono-Deck nodes, found ${WORLD.existingCount}.`);
expect(WORLD.newCount === 232, `Expected 232 mastery-expansion nodes, found ${WORLD.newCount}.`);
expect(T22_NEW_NODES.length === 7, `Expected T22 to add 7 focused nodes, found ${T22_NEW_NODES.length}.`);
expect(T23_NEW_NODES.length === 15, `Expected T23 to add 15 focused nodes, found ${T23_NEW_NODES.length}.`);
expect(idSet.size === ids.length, `Duplicate stable node IDs detected (${ids.length - idSet.size} duplicate entries).`);
expect(terminals.length === 23, `Expected 23 terminal routes after T23 overlay, found ${terminals.length}.`);

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
expect(t22?.count === 58, `Expected T22 strike path to contain exactly 58 nodes, found ${t22?.count ?? "missing"}.`);
expect(
  JSON.stringify(t22?.required || []) === JSON.stringify(T22_ORDER),
  "T22 terminal required[] must preserve the validated pedagogical order exactly.",
);
expect(
  JSON.stringify(t22?.order || []) === JSON.stringify(T22_ORDER),
  "T22 terminal order[] must match the validated strike-path order exactly.",
);
expect((t22?.stageNames || []).length === 5, "T22 should expose exactly five learning phases.");

const t23 = terminals.find((terminal) => terminal.id === "T23");
expect(Boolean(t23), "Expected T23 Universal Computational & Field Scientist terminal to load.");
expect(
  t23?.name === "Universal Computational & Field Scientist",
  "T23 terminal name is not the expected universal-scientist route.",
);
expect(t23?.count === 66, `Expected T23 strike path to contain exactly 66 nodes, found ${t23?.count ?? "missing"}.`);
expect(
  JSON.stringify(t23?.required || []) === JSON.stringify(T23_ORDER),
  "T23 terminal required[] must preserve the validated pedagogical order exactly.",
);
expect(
  JSON.stringify(t23?.order || []) === JSON.stringify(T23_ORDER),
  "T23 terminal order[] must match the validated strike-path order exactly.",
);
expect((t23?.stageNames || []).length === 6, "T23 should expose exactly six learning phases.");
expect(
  String(t23?.operatingModel || "").includes("phenomenon") && String(t23?.operatingModel || "").includes("next experiment"),
  "T23 should explicitly preserve the phenomenon-to-next-experiment operating model.",
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

const t22Set = new Set(T22_ORDER);
const t22Position = new Map(T22_ORDER.map((id, index) => [id, index]));
expect(t22Set.size === 58, `T22 order contains ${58 - t22Set.size} duplicate node(s).`);
expect(Object.keys(T22_PREREQS).length === 58, `T22 prerequisite map should cover 58 nodes, found ${Object.keys(T22_PREREQS).length}.`);

for (const id of T22_ORDER) {
  const node = nodes.find((candidate) => candidate.id === id);
  expect(Boolean(node), `T22 requires missing node ${id}.`);
  expect(node?.terminalTags?.includes("T22"), `${id} is missing terminal tag T22.`);

  const terminalPrereqs = node?.terminalMasteryPrereqs?.T22;
  expect(Array.isArray(terminalPrereqs), `${id} is missing terminal-specific T22 prerequisites.`);
  expect(
    JSON.stringify(terminalPrereqs || []) === JSON.stringify(T22_PREREQS[id] || []),
    `${id} terminal-specific prerequisites drifted from T22_PREREQS.`,
  );

  for (const prerequisite of T22_PREREQS[id] || []) {
    expect(t22Set.has(prerequisite), `T22 prerequisite ${prerequisite} for ${id} is outside the strike path.`);
    expect(
      (t22Position.get(prerequisite) ?? Infinity) < (t22Position.get(id) ?? -1),
      `T22 order is not topological: ${id} appears before prerequisite ${prerequisite}.`,
    );
  }

  const stage = node?.terminalStages?.T22;
  expect(Number.isInteger(stage) && stage >= 0 && stage <= 4, `${id} has invalid T22 phase ${String(stage)}.`);
}

for (const node of T22_NEW_NODES) {
  const live = nodes.find((candidate) => candidate.id === node.id);
  expect(Boolean(live), `T22 overlay failed to add ${node.id}.`);
  expect(live?.terminalTags?.includes("T22"), `${node.id} is missing terminal tag T22.`);
  expect(live?.deck === "T22 Quantitative Research Strike Path", `${node.id} has unexpected deck metadata.`);
}

const t23Set = new Set(T23_ORDER);
const t23Position = new Map(T23_ORDER.map((id, index) => [id, index]));
expect(t23Set.size === 66, `T23 order contains ${66 - t23Set.size} duplicate node(s).`);
expect(Object.keys(T23_PREREQS).length === 66, `T23 prerequisite map should cover 66 nodes, found ${Object.keys(T23_PREREQS).length}.`);

for (const id of T23_ORDER) {
  const node = nodes.find((candidate) => candidate.id === id);
  expect(Boolean(node), `T23 requires missing node ${id}.`);
  expect(node?.terminalTags?.includes("T23"), `${id} is missing terminal tag T23.`);

  const terminalPrereqs = node?.terminalMasteryPrereqs?.T23;
  expect(Array.isArray(terminalPrereqs), `${id} is missing terminal-specific T23 prerequisites.`);
  expect(
    JSON.stringify(terminalPrereqs || []) === JSON.stringify(T23_PREREQS[id] || []),
    `${id} terminal-specific prerequisites drifted from T23_PREREQS.`,
  );

  for (const prerequisite of T23_PREREQS[id] || []) {
    expect(t23Set.has(prerequisite), `T23 prerequisite ${prerequisite} for ${id} is outside the strike path.`);
    expect(
      (t23Position.get(prerequisite) ?? Infinity) < (t23Position.get(id) ?? -1),
      `T23 order is not topological: ${id} appears before prerequisite ${prerequisite}.`,
    );
  }

  const stage = node?.terminalStages?.T23;
  expect(Number.isInteger(stage) && stage >= 0 && stage <= 5, `${id} has invalid T23 phase ${String(stage)}.`);
}

for (const node of T23_NEW_NODES) {
  const live = nodes.find((candidate) => candidate.id === node.id);
  expect(Boolean(live), `T23 overlay failed to add ${node.id}.`);
  expect(live?.terminalTags?.includes("T23"), `${node.id} is missing terminal tag T23.`);
  expect(live?.deck === "T23 Universal Scientist Strike Path", `${node.id} has unexpected deck metadata.`);
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
  `World Registry OK: ${nodes.length} unique nodes, ${terminals.length} terminal routes; T01–T20 preserved, T21 law overlay validated, T22 58-node quantitative-research path validated, and T23 66-node universal-scientist path validated with ${T23_NEW_NODES.length} focused new nodes.`,
);
