import ledger from "../course/smmc/ledger.mjs";
import {
  SMMC_CONTENT_MODULES,
  SMMC_METHOD_MODULES,
  SMMC_LEARNING_OBJECT_TYPES,
  SMMC_UNLOCK_POLICY,
  SMMC_VISIBILITY_POLICY,
  SMMC_ASTER_POLICY,
} from "../course/smmc/curriculum-v1.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const problemIds = new Set(ledger.map(x => x.id));
const contentIds = SMMC_CONTENT_MODULES.map(x => x.id);
const methodIds = SMMC_METHOD_MODULES.map(x => x.id);
const allIds = [...contentIds, ...methodIds];

expect(new Set(allIds).size === allIds.length, "Duplicate SMMC curriculum module ID.");
expect(SMMC_CONTENT_MODULES.length >= 6, "Expected a nontrivial content-bridge architecture.");
expect(SMMC_METHOD_MODULES.length >= 6, "Expected a nontrivial method architecture.");

for (const module of SMMC_CONTENT_MODULES) {
  expect(["core-bridge", "specialist"].includes(module.tier), `Bad tier for ${module.id}`);
  expect(typeof module.title === "string" && module.title.length > 4, `Weak title for ${module.id}`);
  expect(Array.isArray(module.scope) && module.scope.length > 0, `Missing scope for ${module.id}`);
  expect(Array.isArray(module.evidence) && module.evidence.length > 0, `Missing evidence for ${module.id}`);
  for (const id of module.evidence) {
    expect(problemIds.has(id), `Unknown evidence problem ${id} in ${module.id}`);
  }
}

for (const module of SMMC_METHOD_MODULES) {
  expect(typeof module.title === "string" && module.title.length > 4, `Weak title for ${module.id}`);
  expect(Array.isArray(module.skills) && module.skills.length > 0, `Missing skills for ${module.id}`);
  expect(Number.isInteger(module.evidenceCountAll) && module.evidenceCountAll > 0,
    `Bad evidence count for ${module.id}`);
}

expect(JSON.stringify(SMMC_LEARNING_OBJECT_TYPES) === JSON.stringify(["S-BRIDGE","S-METHOD","S-XFER","S-PAPER"]),
  "Learning-object type contract drifted.");

for (const key of ["green", "amber", "red", "openProblem"]) {
  expect(typeof SMMC_UNLOCK_POLICY[key] === "string", `Missing unlock policy: ${key}`);
}
for (const key of ["development", "transfer", "sealed", "evaluator"]) {
  expect(typeof SMMC_VISIBILITY_POLICY[key] === "string", `Missing visibility policy: ${key}`);
}

expect(SMMC_ASTER_POLICY.optional === true, "Aster must remain optional.");
expect(Array.isArray(SMMC_ASTER_POLICY.forbiddenLeaks) && SMMC_ASTER_POLICY.forbiddenLeaks.length >= 4,
  "Aster forbidden-leak guard is too weak.");
expect(Array.isArray(SMMC_ASTER_POLICY.noPenaltyFor) && SMMC_ASTER_POLICY.noPenaltyFor.length >= 3,
  "Aster no-penalty guard is too weak.");

console.log(
  `SMMC curriculum validation passed: ${SMMC_CONTENT_MODULES.length} content modules, ` +
  `${SMMC_METHOD_MODULES.length} method modules, ${ledger.length} evidence problems available.`
);
