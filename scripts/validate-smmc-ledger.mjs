import ledger, { SMMC_LEDGER_YEARS } from "../course/smmc/ledger.mjs";
import { validateT25Targets, routeOrdersForT25Targets } from "../course/smmc/t25-crosswalk.mjs";
import {
  SMMC_PRIMARY_DOMAINS,
  SMMC_OVERLAP,
  SMMC_ASSESSMENT_ROLES,
  SMMC_SECONDARY_TAGS,
  SMMC_METHOD_TAGS,
} from "../course/smmc/schema.mjs";

const domains = new Set(Object.keys(SMMC_PRIMARY_DOMAINS));
const overlaps = new Set(SMMC_OVERLAP);
const roles = new Set(SMMC_ASSESSMENT_ROLES);
const secondary = new Set(SMMC_SECONDARY_TAGS);
const methods = new Set(SMMC_METHOD_TAGS);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

expect(SMMC_LEDGER_YEARS.join(",") === "2017,2018,2019,2020,2021,2022,2023", "Unexpected audited-year manifest.");
expect(ledger.length === 64, `Expected 64 audited SMMC problems, found ${ledger.length}`);
expect(new Set(ledger.map(x => x.id)).size === ledger.length, "Duplicate SMMC IDs.");

for (const year of SMMC_LEDGER_YEARS) {
  const rows = ledger.filter(x => x.year === year);
  const modern = year >= 2022;
  const expected = modern ? 12 : 8;
  expect(rows.length === expected, `Expected ${expected} problems for ${year}, found ${rows.length}`);
  expect(rows.filter(x => x.session === "A").length === 4, `Expected four ${year} A problems.`);
  expect(rows.filter(x => x.session === "B").length === 4, `Expected four ${year} B problems.`);
  if (modern) {
    expect(rows.filter(x => x.session === "C").length === 4, `Expected four ${year} C problems.`);
    expect(rows.filter(x => x.session === "A" || x.session === "B").every(x => x.eastRelevant === true),
      `${year} A/B problems must be East-relevant.`);
    expect(rows.filter(x => x.session === "C").every(x => x.eastRelevant === false),
      `${year} C problems must be supplementary/non-East.`);
  } else {
    expect(rows.every(x => x.eastRelevant === true), `All ${year} A/B problems should be East-relevant.`);
  }
}

for (const row of ledger) {
  const allowedSessions = row.year >= 2022 ? "[ABC]" : "[AB]";
  expect(new RegExp(`^SMMC-${row.year}-${allowedSessions}[1-4]$`).test(row.id), `Bad ID: ${row.id}`);
  expect(domains.has(row.primaryDomain), `Bad primary domain for ${row.id}`);
  expect(overlaps.has(row.overlap), `Bad overlap for ${row.id}`);
  expect(roles.has(row.assessmentRole), `Bad assessment role for ${row.id}`);
  expect(Array.isArray(row.secondaryTags), `Missing secondary tags for ${row.id}`);
  expect(row.secondaryTags.every(x => secondary.has(x)), `Unknown secondary tag for ${row.id}`);
  expect(Array.isArray(row.methodTags) && row.methodTags.length > 0, `Missing methods for ${row.id}`);
  expect(row.methodTags.every(x => methods.has(x)), `Unknown method tag for ${row.id}`);
  expect(Array.isArray(row.t25Targets) && row.t25Targets.length > 0, `Missing stable T25 target mapping for ${row.id}`);
  expect(validateT25Targets(row.t25Targets), `Unknown T25 target mapping for ${row.id}`);
  const liveOrders = routeOrdersForT25Targets(row.t25Targets);
  expect(liveOrders.length > 0 && liveOrders.every(x => Number.isInteger(x) && x >= 1 && x <= 162),
    `Live T25 route resolution failed for ${row.id}`);
  expect(Array.isArray(row.t25Bridges), `Missing T25 bridge mapping for ${row.id}`);
  expect(Array.isArray(row.bridgeNeeds), `Missing bridge-needs list for ${row.id}`);
  expect(typeof row.synopsis === "string" && row.synopsis.length > 30, `Weak synopsis for ${row.id}`);
  expect(typeof row.auditNote === "string" && row.auditNote.length > 30, `Weak audit note for ${row.id}`);
}

for (const id of [
  "SMMC-2017-B4", "SMMC-2018-B4", "SMMC-2019-B4",
  "SMMC-2020-B4", "SMMC-2021-B4", "SMMC-2022-B4", "SMMC-2023-B4",
]) {
  expect(ledger.find(x => x.id === id)?.assessmentRole === "open-problem",
    `${id} must remain explicitly marked as an open-problem item.`);
}

const counts = Object.fromEntries([...overlaps].map(k => [k, ledger.filter(x => x.overlap === k).length]));
const east = ledger.filter(x => x.eastRelevant);
const supplemental = ledger.filter(x => !x.eastRelevant);
const eastCounts = Object.fromEntries([...overlaps].map(k => [k, east.filter(x => x.overlap === k).length]));

console.log(
  `SMMC ledger validation passed: ${ledger.length}/${ledger.length} official problems; ` +
  `East=${east.length}, supplementary=${supplemental.length}; ` +
  `all green=${counts.green}, amber=${counts.amber}, red=${counts.red}; ` +
  `East green=${eastCounts.green}, amber=${eastCounts.amber}, red=${eastCounts.red}.`
);
