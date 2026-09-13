import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { WORLD } from "../js/data/world.js";
await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const prior = structuredClone(WORLD);
const { T25_BY_KEY, t25PlanUnits, readT25Plan, setT25Plan, applyT25EntrancePrep } = await import("../js/data/t25-entrance-prep.js");
const { T25_CORE, T25_UNITS } = await import("../js/data/t25-mstat-route.js");
const { T25_ATOMIC_CARDS, T25_ATOMIC_BY_ID, T25_ATOMIC_BY_ORDER, T25_ATOMIC_BY_PARENT, T25_MSTAT_120_ROUTE } = await import("../js/data/t25-atomic-arcs.js");
const { T25_COVERAGE } = await import("../js/data/t25-coverage.js");
const { T25_EXAMS, T25_SOURCES } = await import("../js/data/t25-sources.js");
const { validateAttempt, validateEvidence, mergeEvidence, buildT25Prompt } = await import("../js/t25-study.js");
const { routeLayout, validTerminalStage } = await import("../js/route-layout.js");

assert.equal(T25_CORE.length, 50);
assert.equal(T25_UNITS.length, 108);
assert.equal(WORLD.nodes.length, 842);
assert.equal(WORLD.terminals.length, 24);
assert.equal(new Set(WORLD.nodes.map(n => n.id)).size, WORLD.nodes.length);
assert.deepEqual(WORLD.nodes.slice(0, prior.nodes.length), prior.nodes, "T25 must not change old node contracts or progress defaults");
assert.deepEqual(WORLD.terminals.slice(0, prior.terminals.length), prior.terminals, "Existing terminal scope must be unchanged");
assert.deepEqual(WORLD.current, prior.current);
assert.deepEqual(WORLD.commonScientific, prior.commonScientific);
assert.deepEqual(WORLD.commonFoundations, prior.commonFoundations);
applyT25EntrancePrep(); assert.equal(WORLD.nodes.length, 842, "Overlay is idempotent");
assert(T25_UNITS.every(u => Number(u.id.slice(3)) >= 801));
const atoms = new Set(Object.values(T22_ATOMIC_MODULES).flat().map(a => a.id));
for (const u of T25_UNITS) {
  assert(T25_SOURCES[u.source], `Missing source ${u.id}`);
  assert(u.mastery.length >= 3 && u.target.length > 20);
  for (const a of u.reuse) assert(atoms.has(a), `${u.id} refers to missing ${a}`);
  for (const mode of ["learn", "investigate", "practice", "review", "project"]) {
    const p = buildT25Prompt(u.id, mode);
    assert(p.includes(u.target) && p.includes(T25_SOURCES[u.source].url));
    assert(p.includes("Do not mark anything cleared automatically"));
  }
}
const snapshot = JSON.stringify(prior.current);
for (const plan of Object.keys(T25_EXAMS)) {
  const units = t25PlanUnits(plan), ids = new Set(units.map(u => u.id)), seen = new Set();
  assert.equal(ids.size, units.length);
  for (const u of units) {
    for (const p of u.prerequisites) assert(seen.has(p), `${plan}: ${u.key} precedes ${p}`);
    seen.add(u.key);
  }
  for (const row of [...T25_COVERAGE.mstat, ...T25_COVERAGE[plan]]) for (const key of row.keys) assert(seen.has(key), `${plan}: uncovered ${key}`);
  assert(T25_CORE.every(u => ids.has(u.id)));
  assert.equal(seen.has("aptitude"), ["st", "da", "ma", "cs"].includes(plan));
  setT25Plan(plan, WORLD, null);
  assert.equal(WORLD.terminals.find(t => t.id === "T25").count, units.length);
  assert.equal(JSON.stringify(WORLD.current), snapshot, "Plan switching must not change clearance state");
}
assert(!t25PlanUnits("mstat").some(u => u.source !== "mstat"));
assert(!t25PlanUnits("cs").some(u => u.key === "python"), "C preparation should not acquire a Python prerequisite");
const early = T25_BY_KEY.get("events");
assert.deepEqual(early.prerequisites, ["sets", "counting"], "Finite probability need not wait for calculus or programming");
assert.deepEqual(T25_CORE.slice(0, 12).map(u => u.key), [
  "language", "sets", "equations", "progressions", "sequences", "trig",
  "counting", "events", "conditional", "independence", "expectation", "discrete",
], "M.Stat must start foundation -> counting/probability -> first random variables");
assert.deepEqual(T25_CORE.slice(-3).map(u => u.key), ["lines", "conics", "exam"], "Geometry breadth must remain at the end before synthesis");
for (const key of ["sequences", "orthogonal", "probbounds", "robustloss"]) assert(T25_BY_KEY.has(key), `Missing new parent ${key}`);

// Canonical MSTAT-120 route + progressive authoring invariants.
assert.equal(T25_MSTAT_120_ROUTE.length, 120);
assert.deepEqual(T25_MSTAT_120_ROUTE.map(c => c.routeOrder), Array.from({ length: 120 }, (_, i) => i + 1));
assert.equal(new Set(T25_MSTAT_120_ROUTE.map(c => c.syllabusCode)).size, 120);
assert(T25_ATOMIC_CARDS.length >= 5 && T25_ATOMIC_CARDS.length <= 120, "Authored cards must grow progressively from the audited foundation batch");
assert.equal(T25_ATOMIC_BY_ID.size, T25_ATOMIC_CARDS.length);
assert.equal(T25_ATOMIC_BY_ORDER.size, T25_ATOMIC_CARDS.length);
assert.deepEqual(T25_ATOMIC_CARDS.map(c => c.routeOrder), Array.from({ length: T25_ATOMIC_CARDS.length }, (_, i) => i + 1), "Authored cards must remain a contiguous prefix of the canonical route");
assert.equal(new Set(T25_ATOMIC_CARDS.map(c => c.syllabusCode)).size, T25_ATOMIC_CARDS.length);
const coreIds = new Set(T25_CORE.map(u => u.id));
for (const spec of T25_MSTAT_120_ROUTE) assert(coreIds.has(spec.parentId), `${spec.syllabusCode} points outside the M.Stat parent route: ${spec.parentId}`);
for (const c of T25_ATOMIC_CARDS) {
  const spec = T25_MSTAT_120_ROUTE[c.routeOrder - 1];
  assert.equal(c.syllabusCode, spec.syllabusCode);
  assert.equal(c.parentId, spec.parentId);
  assert.equal(c.title, spec.title);
  assert(c.title.length > 5 && c.centralCapability.length > 30 && c.exitCondition.length > 30);
  assert(c.requiredOwnership.length >= 5 && c.inScope.length >= 4 && c.outOfScope.length >= 4);
}
for (const cards of T25_ATOMIC_BY_PARENT.values()) {
  assert.deepEqual(cards.map(c => c.routeOrder), [...cards].map(c => c.routeOrder).sort((a, b) => a - b));
}
assert.equal(T25_MSTAT_120_ROUTE[0].syllabusCode, "F1");
assert.equal(T25_MSTAT_120_ROUTE[20].syllabusCode, "J1");
assert.equal(T25_MSTAT_120_ROUTE[45].syllabusCode, "A1b", "Later algebra revisit must retain global position 046");
assert.equal(T25_MSTAT_120_ROUTE[80].syllabusCode, "O3b", "Order-statistic revisit must retain global position 081");
assert.equal(T25_MSTAT_120_ROUTE[119].syllabusCode, "G4");
assert.equal(T25_MSTAT_120_ROUTE[11].parentId, "ARC905");
assert.equal(T25_MSTAT_120_ROUTE[37].parentId, "ARC906");
assert.equal(T25_MSTAT_120_ROUTE[77].parentId, "ARC907");
assert.equal(T25_MSTAT_120_ROUTE[93].parentId, "ARC908");
assert.equal(T25_ATOMIC_BY_ORDER.get(1).syllabusCode, "F1");
assert.equal(T25_ATOMIC_BY_ORDER.get(5).syllabusCode, "F5a");

assert.throws(() => t25PlanUnits("constructor"));
assert.equal(readT25Plan({ getItem: () => "__proto__" }), "mstat");
assert.equal(readT25Plan({ getItem: () => { throw new Error("blocked"); } }), "mstat");
assert.equal(setT25Plan("mstat", WORLD, { setItem: () => { throw new Error("quota"); } }).persisted, false);

const attempt = { id: "test-1", unitId: "ARC817", date: "2026-09-11", ref: "Original test question", kind: "original", assistance: "hinted", score: -1, maxScore: 4, minutes: 7, notes: "Check equiprobability" };
assert.deepEqual(validateAttempt(attempt), attempt, "Negative marking must be representable");
assert.equal(validateAttempt({ ...attempt, score: null, maxScore: null, minutes: null }).score, null);
for (const bad of [{ unitId: "ARC005" }, { date: "2026-02-30" }, { score: 5 }, { score: null }, { maxScore: 0 }, { minutes: -1 }, { assistance: "mastered" }, { ref: "" }, { kind: "constructor" }]) assert.throws(() => validateAttempt({ ...attempt, ...bad }));
const one = { version: 1, attempts: [attempt] };
assert.deepEqual(mergeEvidence(one, one), one, "Reimport is idempotent");
const two = mergeEvidence(one, { version: 1, attempts: [{ ...attempt, id: "test-2", unitId: "ARC864", assistance: "independent" }] });
assert.equal(two.attempts.length, 2, "Optional-branch evidence survives core-plan use");
assert.throws(() => mergeEvidence(one, { version: 1, attempts: [{ ...attempt, notes: "conflict" }] }));
assert.equal(one.attempts[0].notes, "Check equiprobability", "Rejected import must not mutate existing records");
assert.throws(() => validateEvidence({ version: 2, attempts: [] }));
assert.throws(() => validateEvidence({ version: 1, attempts: [attempt, attempt] }));
assert(buildT25Prompt("ARC817", "investigate").includes("[WALL] does not expire"));
assert(buildT25Prompt("ARC817", "practice").includes("Never invent a PYQ label"));

const t23 = WORLD.terminals.find(t => t.id === "T23");
assert.equal(routeLayout(t23).columns.length, 6);
assert.equal(routeLayout(t23).width, 1320);
assert(validTerminalStage(5, t23));
assert(!validTerminalStage(6, t23));
assert.equal(routeLayout(WORLD.terminals.find(t => t.id === "T22")).columns.length, 5);

// Validate the actual reachable module graph, not obsolete comment markers.
const html = readFileSync("index.html", "utf8");
const entry = html.match(/<script\s+type="module"\s+src="([^"]+)"/)[1].split("?")[0];
const paths = new Set();
function checkModule(path) {
  const absolute = resolve(path); if (paths.has(absolute)) return; paths.add(absolute);
  assert(existsSync(absolute), `Missing module ${absolute}`);
  const code = readFileSync(absolute, "utf8");
  execFileSync(process.execPath, ["--input-type=module", "--check"], { input: code, stdio: ["pipe", "pipe", "pipe"] });
  for (const match of code.matchAll(/(?:from\s*|import\s*\(?\s*)["'](\.[^"']+)["']/g)) {
    checkModule(resolve(dirname(absolute), match[1].split("?")[0]));
  }
}
checkModule(entry);
for (const match of html.matchAll(/(?:href|src)="(\.\/[^"#?]+)(?:[?#][^"]*)?"/g)) assert(existsSync(match[1]), `Broken local asset ${match[1]}`);
assert(paths.has(resolve("js/t25-ui.js")));
assert(paths.has(resolve("js/t25-atomic-ui.js")));
assert(paths.has(resolve("js/data/t25-atomic-arcs.js")));
assert(paths.has(resolve("js/data/t25-entrance-prep.js")));
assert(paths.has(resolve("js/data/t25-mstat-route.js")));
const app = readFileSync("js/app.js", "utf8"), ui = readFileSync("js/t25-ui.js", "utf8"), atomicUi = readFileSync("js/t25-atomic-ui.js", "utf8");
for (const event of ["chrono:select-node", "chrono:node-selected", "chrono:route-rendered", "chrono:t25-plan-changed"]) assert(app.includes(event) && ui.includes(event), `Unwired ${event}`);
assert(atomicUi.includes("t25-atomic-map-node") && atomicUi.includes("chrono:route-rendered"), "T25 M.Stat must expose the canonical atomic route on the big map");
for (const match of ui.matchAll(/\$\("([^"]+)"\)/g)) assert((html + ui).includes(`id="${match[1]}"`), `Missing UI element ${match[1]}`);
console.log(`T25 checks passed: 7 topological plans; 108 unique units; 50-unit M.Stat parent route; canonical 120-position atomic route with ${T25_ATOMIC_CARDS.length} individually authored cards; full mapped source groups; valid T22 links; evidence validation/merge; unchanged legacy routes; 6-stage T23 layout; ${paths.size} reachable JS modules checked.`);