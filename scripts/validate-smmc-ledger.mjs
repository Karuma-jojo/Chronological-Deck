import ledger from "../course/smmc/ledger-2017.mjs";

const domains = new Set(["S1", "S2", "S3", "S4", "S5", "S6"]);
const overlaps = new Set(["green", "amber", "red"]);
const roles = new Set(["development", "transfer", "sealed", "open-problem"]);

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

expect(ledger.length === 8, `Expected 8 SMMC 2017 problems, found ${ledger.length}`);
expect(new Set(ledger.map(x => x.id)).size === ledger.length, "Duplicate SMMC IDs.");
expect(ledger.every(x => x.year === 2017), "2017 ledger contains another year.");
expect(ledger.every(x => x.eastRelevant === true), "All 2017 A/B problems should be East-relevant.");
expect(ledger.filter(x => x.session === "A").length === 4, "Expected four 2017 A problems.");
expect(ledger.filter(x => x.session === "B").length === 4, "Expected four 2017 B problems.");

for (const row of ledger) {
  expect(/^SMMC-2017-[AB][1-4]$/.test(row.id), `Bad ID: ${row.id}`);
  expect(domains.has(row.primaryDomain), `Bad primary domain for ${row.id}`);
  expect(overlaps.has(row.overlap), `Bad overlap for ${row.id}`);
  expect(roles.has(row.assessmentRole), `Bad assessment role for ${row.id}`);
  expect(Array.isArray(row.secondaryTags), `Missing secondary tags for ${row.id}`);
  expect(Array.isArray(row.methodTags) && row.methodTags.length > 0, `Missing methods for ${row.id}`);
  expect(Array.isArray(row.t25Sessions), `Missing T25 mapping for ${row.id}`);
  expect(Array.isArray(row.t25Bridges), `Missing T25 bridge mapping for ${row.id}`);
  expect(Array.isArray(row.bridgeNeeds), `Missing bridge-needs list for ${row.id}`);
  expect(typeof row.synopsis === "string" && row.synopsis.length > 30, `Weak synopsis for ${row.id}`);
  expect(typeof row.auditNote === "string" && row.auditNote.length > 30, `Weak audit note for ${row.id}`);
}

expect(ledger.find(x => x.id === "SMMC-2017-B4")?.assessmentRole === "open-problem",
  "2017 B4 must remain explicitly marked as an open-problem item.");

console.log("SMMC ledger validation passed: 8/8 2017 problems.");
