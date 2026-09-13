import { WORLD } from "./world.js";
import { T25_CORE, T25_EXTRAS, T25_UNITS } from "./t25-mstat-route.js";
import { T25_EXAMS } from "./t25-sources.js";

export const T25_PLAN_KEY = "chrono_t25_plan_v1";
export const T25_BY_KEY = new Map(T25_UNITS.map(u => [u.key, u]));
export const T25_BY_ID = new Map(T25_UNITS.map(u => [u.id, u]));
export const T25_STAGE_NAMES = [
  "Foundations, algebra & discrete probability",
  "Linear algebra & one-variable calculus",
  "Distributions, joint laws & probability limits",
  "Estimation, regression, inference & design",
  "Geometry breadth, synthesis & extensions",
];

export function t25Storage() { try { return globalThis.localStorage; } catch { return null; } }
export function readT25Plan(storage = t25Storage()) {
  try { const key = storage?.getItem(T25_PLAN_KEY); return Object.hasOwn(T25_EXAMS, key) ? key : "mstat"; }
  catch { return "mstat"; }
}

// Prerequisite closure is intentional: e.g. MA also needs multivariable calculus;
// CS shares the relational database unit with DA, but not its Python course.
export function t25PlanUnits(plan = "mstat") {
  if (!Object.hasOwn(T25_EXAMS, plan)) throw new Error("Unknown T25 exam plan.");
  const roots = [...T25_CORE];
  if (plan !== "mstat") roots.push(...T25_EXTRAS.filter(u => u.source === plan));
  if (plan === "cs") roots.push(T25_BY_KEY.get("numericmatrix"));
  if (["st", "da", "ma", "cs"].includes(plan)) roots.push(T25_BY_KEY.get("aptitude"));
  const result = [], done = new Set(), visiting = new Set();
  function visit(u) {
    if (!u) throw new Error("Missing T25 prerequisite.");
    if (done.has(u.key)) return;
    if (visiting.has(u.key)) throw new Error(`T25 prerequisite cycle at ${u.key}.`);
    visiting.add(u.key);
    u.prerequisites.forEach(key => visit(T25_BY_KEY.get(key)));
    visiting.delete(u.key); done.add(u.key); result.push(u);
  }
  roots.forEach(visit);
  return result;
}

export function setT25Plan(plan, world = WORLD, storage = t25Storage()) {
  const units = t25PlanUnits(plan);
  const terminal = world.terminals.find(t => t.id === "T25");
  if (!terminal) throw new Error("T25 is not loaded.");
  terminal.required = units.map(u => u.id);
  terminal.order = [...terminal.required];
  terminal.count = units.length;
  terminal.plan = plan;
  terminal.summary = `${T25_CORE.length} M.Stat syllabus units${plan === "mstat" ? "" : ` + ${units.length - T25_CORE.length} units for ${T25_EXAMS[plan].name}, including shared prerequisites`}. Use Spire for bounded discoveries, written exercises for fluency, and verified papers for exam practice. Start topic questions immediately; the final synthesis unit is not a gate to PYQs.`;
  let persisted = Boolean(storage);
  try { storage?.setItem(T25_PLAN_KEY, plan); } catch { persisted = false; }
  return { terminal, persisted };
}

export function applyT25EntrancePrep(world = WORLD, plan = readT25Plan()) {
  if (world.terminals.some(t => t.id === "T25")) return world;
  if (!world.terminals.some(t => t.id === "T22") || !world.terminals.some(t => t.id === "T23")) {
    throw new Error("Load the T22 and T23 overlays before T25.");
  }
  const oldIds = new Set(world.nodes.map(n => n.id));
  for (const u of T25_UNITS) {
    if (oldIds.has(u.id)) throw new Error(`T25 ID collision: ${u.id}.`);
    oldIds.add(u.id);
    for (const key of u.prerequisites) if (!T25_BY_KEY.has(key)) throw new Error(`Unknown prerequisite ${key}.`);
  }
  for (const u of T25_UNITS) {
    const prerequisites = u.prerequisites.map(key => T25_BY_KEY.get(key).id);
    world.nodes.push({
      id: u.id, arc: `ARC ${u.id.slice(3)}`, title: u.title, kind: "new",
      level: `L${Math.min(u.stage + 1, 4)}`, domains: ["Mathematics & Statistics", ...(["da", "cs", "cmi"].includes(u.source) ? ["Computation & Information"] : [])],
      summary: u.target, masteryScope: u.mastery.join("; "), masteryPrereqs: prerequisites,
      terminalMasteryPrereqs: { T25: [...prerequisites] }, terminalStages: { T25: u.stage },
      storyPrereqs: [], crossLinks: [], playOrder: null, sourceStart: null, sourceEnd: null,
      deck: "T25 Entrance Preparation", commonGroup: null, gatewayTags: [],
      terminalTags: ["T25"], requiredByCount: 1, stage: T25_STAGE_NAMES[u.stage],
      sourceLabel: "T25 syllabus contract; official sources in the entrance panel",
    });
  }
  world.terminals.push({
    id: "T25", name: "M.Stat & Companion Entrance Preparation", field: "Mathematics & Statistics",
    umbrella: "Entrance Preparation", required: [], order: [], count: 0, gateways: [],
    stageNames: [...T25_STAGE_NAMES],
    exit: "Demonstrate syllabus coverage, independent written solutions, delayed recall and repeated timed-paper performance. The checkmark is a self-assessed concept milestone, not an admission forecast. Keep question references, assistance and corrections in the evidence log. Projects and T22 study provide supporting evidence; neither automatically clears an entrance unit.",
  });
  setT25Plan(plan, world, null);
  world.version = "1.7";
  world.title = "Chrono-Deck Scientific Mastery World v1.7";
  world.worldCount = world.nodes.length;
  world.newCount = world.nodes.filter(n => n.kind === "new").length;
  return world;
}

applyT25EntrancePrep();
