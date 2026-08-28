import { WORLD } from "../js/data/world.js";

await import("../js/data/law-expansion.js");
await import("../js/data/t22-quant-research.js");
await import("../js/data/t23-universal-scientist.js");
const { T22_ATOMIC_MODULES } = await import("../js/data/t22-atomic-arcs.js");
const { getT22RichModule, enrichT22AtomicArc } = await import("../js/data/t22-rich-syllabus.js");

const moduleId = "ARC590";
const expectedIds = Array.from({ length: 14 }, (_, i) => `T22-M46-A${String(i + 1).padStart(2, "0")}`);
const expectedTitles = [
  "From Markov Chains to Controlled Markov Processes",
  "Rewards & Costs",
  "Policies",
  "Trajectories & Returns",
  "Finite vs Infinite Horizons",
  "Discounting",
  "State-Value Functions",
  "Action-Value Functions",
  "Bellman Expectation Equation",
  "Bellman Optimality Equation",
  "Policy Evaluation",
  "Policy Improvement & Policy Iteration",
  "Value Iteration",
  "MDP Modelling & Transfer",
];
const scalarFields = ["focus", "roleRelevance", "purpose", "principalObstacle", "target", "applicationScope", "transferScope", "nextArcBoundary"];
const listFields = ["entryPrerequisites", "requiredMastery", "explicitlyOutOfScope"];
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(Boolean(WORLD.terminals.find((terminal) => terminal.id === "T22")), "T22 terminal must be loaded before M46 validation.");
const baseArcs = T22_ATOMIC_MODULES[moduleId] || [];
const richModule = getT22RichModule(moduleId);
expect(Boolean(richModule), `${moduleId} must have a rich syllabus contract.`);
expect(richModule?.moduleId === moduleId, `${moduleId} rich moduleId mismatch.`);
expect(richModule?.syllabusVersion === "3.0", `${moduleId} must use syllabusVersion=3.0.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.id)) === JSON.stringify(expectedIds), `${moduleId} stable IDs drifted.`);
expect(JSON.stringify(baseArcs.map((arc) => arc.title)) === JSON.stringify(expectedTitles), `${moduleId} audited titles drifted.`);
expect(baseArcs.every((arc) => arc.targetHours === 4), `${moduleId} targetHours drifted from 4h bookkeeping.`);
expect(Object.keys(richModule?.arcs || {}).length === expectedIds.length, `${moduleId} rich coverage mismatch.`);
expect(Boolean(richModule?.roleTarget), `${moduleId} missing roleTarget.`);
expect(Boolean(richModule?.modulePurpose), `${moduleId} missing modulePurpose.`);
expect(Boolean(richModule?.moduleDestination), `${moduleId} missing moduleDestination.`);
expect(Array.isArray(richModule?.entryPrerequisites) && richModule.entryPrerequisites.length > 0, `${moduleId} missing entryPrerequisites.`);
expect(Array.isArray(richModule?.explicitlyOutOfScope) && richModule.explicitlyOutOfScope.length > 0, `${moduleId} missing explicitlyOutOfScope.`);

for (const baseArc of baseArcs) {
  const enriched = enrichT22AtomicArc(moduleId, baseArc);
  expect(enriched.id === baseArc.id, `${baseArc.id} ID changed.`);
  expect(enriched.title === baseArc.title, `${baseArc.id} title changed.`);
  expect(enriched.targetHours === baseArc.targetHours, `${baseArc.id} targetHours changed.`);
  expect(enriched.syllabusVersion === "3.0", `${baseArc.id} missing syllabusVersion=3.0.`);
  for (const field of scalarFields) expect(typeof enriched[field] === "string" && enriched[field].trim(), `${baseArc.id} missing ${field}.`);
  for (const field of listFields) expect(Array.isArray(enriched[field]) && enriched[field].length > 0, `${baseArc.id} missing ${field}.`);
  expect(enriched.requiredMastery.length >= 5, `${baseArc.id} needs at least five mastery checks.`);
}

expect(richModule?.entryPrerequisites?.some((x) => x.includes("ARC211")) && richModule?.entryPrerequisites?.some((x) => x.includes("ARC524")), "M46 must build explicitly on deterministic DP and Markov chains.");
expect(richModule?.arcs?.["T22-M46-A01"]?.target?.includes("P(s'|s,a)"), "M46 A01 must operationalize the controlled transition kernel.");
expect(richModule?.arcs?.["T22-M46-A01"]?.requiredMastery?.some((x) => x.includes("state sufficiency")), "M46 A01 must test controlled state sufficiency.");
expect(richModule?.arcs?.["T22-M46-A02"]?.requiredMastery?.some((x) => x.includes("expected one-step reward")), "M46 A02 must connect transition-dependent rewards to expected local objective.");
expect(richModule?.arcs?.["T22-M46-A03"]?.requiredMastery?.some((x) => x.includes("stationary") || x.includes("time-indexed")), "M46 A03 must distinguish stationary from time-dependent policies.");
expect(richModule?.arcs?.["T22-M46-A04"]?.requiredMastery?.some((x) => x.includes("trajectory probability")), "M46 A04 must factor controlled trajectory probabilities.");
expect(richModule?.arcs?.["T22-M46-A05"]?.requiredMastery?.some((x) => x.includes("time-to-go")), "M46 A05 must expose finite-horizon time dependence.");
expect(richModule?.arcs?.["T22-M46-A06"]?.requiredMastery?.some((x) => x.includes("geometric-series")), "M46 A06 must justify bounded discounted return with geometric-series reasoning.");
expect(richModule?.arcs?.["T22-M46-A07"]?.target?.includes("V^pi"), "M46 A07 must operationalize fixed-policy state value.");
expect(richModule?.arcs?.["T22-M46-A08"]?.target?.includes("V^pi(s)=sum_a"), "M46 A08 must connect state and action values under a policy.");
expect(richModule?.arcs?.["T22-M46-A09"]?.requiredMastery?.some((x) => x.includes("Bellman residual")), "M46 A09 must test fixed-policy Bellman equations rather than quote them.");
expect(richModule?.arcs?.["T22-M46-A10"]?.target?.includes("Bellman optimality"), "M46 A10 must derive the optimality equation.");
expect(richModule?.arcs?.["T22-M46-A11"]?.requiredMastery?.some((x) => x.includes("I-gamma P_pi")), "M46 A11 must connect policy evaluation to the finite-state linear system.");
expect(richModule?.arcs?.["T22-M46-A12"]?.requiredMastery?.some((x) => x.includes("policy-improvement")), "M46 A12 must justify policy improvement.");
expect(richModule?.arcs?.["T22-M46-A13"]?.requiredMastery?.some((x) => x.includes("contraction")) && richModule?.arcs?.["T22-M46-A13"]?.requiredMastery?.some((x) => x.includes("Bellman residual")), "M46 A13 must combine value-iteration convergence intuition with residual diagnostics.");
expect(richModule?.arcs?.["T22-M46-A14"]?.requiredMastery?.some((x) => x.includes("solver correctness") && x.includes("model validity")), "M46 forge must separate algorithmic convergence from model validity.");
expect(richModule?.arcs?.["T22-M46-A14"]?.nextArcBoundary?.includes("ARC593"), "M46 final boundary must hand the route to supervised-learning theory rather than inventing an RL continuation.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("Q-learning")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("deep reinforcement")), "M46 must keep model-free/deep RL outside its ownership.");
expect(richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC524")) && richModule?.explicitlyOutOfScope?.some((x) => x.includes("ARC211")), "M46 must preserve earlier Markov-chain and deterministic-DP ownership.");

if (errors.length) {
  console.error(`T22 M46 rich validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`T22 M46 rich syllabus OK: ${expectedIds.length} stable MDP mission cards validated.`);
