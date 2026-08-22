import { WORLD } from "../../js/data/world.js";

await import("../../js/data/law-expansion.js");
const { T22_ORDER } = await import("../../js/data/t22-quant-research.js");
const {
  T22_ATOMIC_AUDIT_VERSION,
  T22_ATOMIC_COUNT,
  T22_ATOMIC_MODULES,
  T22_ATOMIC_TARGET_HOURS,
} = await import("../../js/data/t22-atomic-arcs.js");
const {
  enrichT22AtomicArc,
  getT22RichModule,
} = await import("../../js/data/t22-rich-syllabus.js");

const T22 = WORLD.terminals.find((terminal) => terminal.id === "T22");
const NODE_BY_ID = new Map(WORLD.nodes.map((node) => [node.id, node]));
const LAUNCH_ARC_IDS = new Set([
  "T22-M01-A01",
  "T22-M01-A02",
  "T22-M01-A03",
]);

const HISTORICAL_SETTINGS = {
  "T22-M01-A01": {
    year: "1665",
    location: "Woolsthorpe Manor, Lincolnshire",
    cast: "Isaac Newton and four period-disguised assistants",
    territory: "Motion, measured intervals, and the problem of a rate at one instant.",
  },
  "T22-M01-A02": {
    year: "1665–1666",
    location: "Woolsthorpe Manor, Lincolnshire",
    cast: "Isaac Newton and four period-disguised assistants",
    territory: "Finite comparisons, vanishing intervals, and what survives their contraction.",
  },
  "T22-M01-A03": {
    year: "1666",
    location: "Woolsthorpe Manor, Lincolnshire",
    cast: "Isaac Newton and four period-disguised assistants",
    territory: "Curved motion, tangent behavior, and faithful local approximation.",
  },
};

function serializeModule(moduleId, moduleIndex) {
  const node = NODE_BY_ID.get(moduleId);
  const atomicArcs = T22_ATOMIC_MODULES[moduleId] ?? [];
  const richModule = getT22RichModule(moduleId);
  return {
    id: moduleId,
    index: moduleIndex + 1,
    title: node?.title ?? moduleId,
    level: node?.level ?? null,
    summary: node?.summary ?? "",
    atomicCount: atomicArcs.length,
    launchEnabled: moduleIndex === 0,
    syllabusVersion: richModule?.syllabusVersion ?? null,
    roleTarget: richModule?.roleTarget ?? null,
    modulePurpose: richModule?.modulePurpose ?? null,
    moduleDestination: richModule?.moduleDestination ?? null,
    entryPrerequisites: richModule?.entryPrerequisites ?? [],
    explicitlyOutOfScope: richModule?.explicitlyOutOfScope ?? [],
    arcs: atomicArcs.map((arc) => ({
      ...enrichT22AtomicArc(moduleId, arc),
      launchEnabled: LAUNCH_ARC_IDS.has(arc.id),
      ...(HISTORICAL_SETTINGS[arc.id] ?? {}),
    })),
  };
}

export const T22_CATALOG = {
  id: T22.id,
  title: T22.name,
  summary: T22.summary,
  moduleCount: T22_ORDER.length,
  atomicCount: T22_ATOMIC_COUNT,
  atomicTargetHours: T22_ATOMIC_TARGET_HOURS,
  auditVersion: T22_ATOMIC_AUDIT_VERSION,
  launchSlice: {
    moduleCount: 1,
    atomicCount: LAUNCH_ARC_IDS.size,
  },
  modules: T22_ORDER.map(serializeModule),
};

export function getModule(moduleId = "ARC053") {
  return T22_CATALOG.modules.find((module) => module.id === moduleId) ?? null;
}

export function getArc(arcId) {
  for (const module of T22_CATALOG.modules) {
    const arc = module.arcs.find((candidate) => candidate.id === arcId);
    if (arc) return { module, arc };
  }
  return null;
}

export function getLaunchSlice() {
  const module = getModule("ARC053");
  return {
    catalog: {
      id: T22_CATALOG.id,
      title: T22_CATALOG.title,
      summary: T22_CATALOG.summary,
      moduleCount: T22_CATALOG.moduleCount,
      atomicCount: T22_CATALOG.atomicCount,
      atomicTargetHours: T22_CATALOG.atomicTargetHours,
      auditVersion: T22_CATALOG.auditVersion,
      launchSlice: T22_CATALOG.launchSlice,
    },
    module: {
      ...module,
      arcs: module.arcs.filter((arc) => arc.launchEnabled),
    },
  };
}

export function isLaunchArc(arcId) {
  return LAUNCH_ARC_IDS.has(arcId);
}
