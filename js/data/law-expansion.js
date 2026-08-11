import { WORLD } from "./world.js";
import { LAW_FOUNDATIONS } from "./law-foundations.js";
import { LAW_JURISPRUDENCE } from "./law-jurisprudence.js";
import { LAW_PUBLIC } from "./law-public.js";
import { LAW_PRIVATE } from "./law-private.js";
import { LAW_PROCEDURE } from "./law-procedure.js";
import { LAW_ADVANCED } from "./law-advanced.js";

export const T21_SHARED = [
  "ARC002",
  "ARC007",
  "ARC008",
  "ARC009",
  "ARC046",
  "ARC048",
  "ARC134",
  "ARC197",
  "ARC501",
  "ARC502",
  "ARC506",
];

export const T21_GATEWAYS = ["ARC631", "ARC636", "ARC641", "ARC661", "ARC675", "ARC686"];

export const T21_NODES = [
  ...LAW_FOUNDATIONS,
  ...LAW_JURISPRUDENCE,
  ...LAW_PUBLIC,
  ...LAW_PRIVATE,
  ...LAW_PROCEDURE,
  ...LAW_ADVANCED,
];

export const T21_TERMINAL = {
  name: "Law, Jurisprudence & Legal Reasoning",
  field: "Law",
  umbrella: "Law, Jurisprudence & Public Institutions",
  summary:
    "Legal reasoning, jurisprudence, constitutional and administrative law, private and commercial law, criminal law, evidence, procedure, international law, advocacy and professional judgment.",
  exit:
    "Analyze unseen fact patterns; identify issues and controlling authority; construct and attack arguments; interpret statutes, constitutions and precedents; handle evidence and burdens of proof; write a research-backed brief and reasoned judgment; conduct an oral moot; defend jurisprudential and ethical choices.",
  id: "T21",
  required: [...T21_SHARED, ...T21_NODES.map((node) => node.id)],
  count: T21_SHARED.length + T21_NODES.length,
  gateways: ["Law"],
};

function addTerminalTag(node, terminalId) {
  const tags = Array.isArray(node.terminalTags) ? node.terminalTags : [];
  if (!tags.includes(terminalId)) {
    tags.push(terminalId);
    node.terminalTags = tags;
    node.requiredByCount = Number(node.requiredByCount || 0) + 1;
  }
}

export function applyLawExpansion(world = WORLD) {
  if (world.terminals?.some((terminal) => terminal.id === "T21")) return world;

  if ((world.nodes || []).length !== 630 || (world.terminals || []).length !== 20) {
    throw new Error(
      `T21 expects the frozen 630-node / 20-terminal base registry; found ${world.nodes?.length || 0} nodes and ${world.terminals?.length || 0} terminals.`,
    );
  }

  const existingIds = new Set((world.nodes || []).map((node) => node.id));
  for (const node of T21_NODES) {
    if (existingIds.has(node.id)) {
      throw new Error(`T21 Law expansion cannot reuse stable ID ${node.id}.`);
    }
  }

  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));
  for (const id of T21_SHARED) {
    const node = byId.get(id);
    if (!node) throw new Error(`T21 Law expansion requires missing shared node ${id}.`);
    addTerminalTag(node, "T21");
  }

  world.version = "1.1";
  world.title = "Chrono-Deck Scientific Mastery World v1.1";
  world.worldCount = 710;
  world.newCount = 210;

  if (!world.umbrellas.some((umbrella) => umbrella.id === "Law")) {
    world.umbrellas.push({ id: "Law", name: "Law, Jurisprudence & Public Institutions" });
  }
  world.gateways.Law = [...T21_GATEWAYS];

  world.nodes.push(
    ...T21_NODES.map((node) => ({
      ...node,
      domains: [...node.domains],
      storyPrereqs: [...node.storyPrereqs],
      crossLinks: [...node.crossLinks],
      masteryPrereqs: [...node.masteryPrereqs],
      gatewayTags: [...node.gatewayTags],
      terminalTags: [...node.terminalTags],
    })),
  );
  world.terminals.push({
    ...T21_TERMINAL,
    required: [...T21_TERMINAL.required],
    gateways: [...T21_TERMINAL.gateways],
  });

  world.coreFrozenLabel = "39-node scientific core for T01–T20";
  world.corePolicy =
    "Frozen for scientific routes T01–T20; T21 is a separate law and jurisprudence terminal that reuses only relevant reasoning and evidence nodes.";
  if (!world.priorityOrder.includes("Law / jurisprudence")) {
    world.priorityOrder.push("Law / jurisprudence");
  }

  return world;
}

applyLawExpansion();
