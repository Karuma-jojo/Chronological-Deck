import ledger from "../course/smmc/ledger.mjs";
import SMMC_CONNECTIONS_BY_T25 from "../course/smmc/connection-index-v1.mjs";

const expected = {};
for (const p of ledger) {
  for (const target of p.t25Targets) {
    (expected[target] ??= []).push([p.id, p.eastRelevant ? 1 : 0]);
  }
}
for (const key of Object.keys(expected)) {
  expected[key].sort((a,b)=>a[0].localeCompare(b[0]));
}
const actual = Object.fromEntries(
  Object.entries(SMMC_CONNECTIONS_BY_T25)
    .map(([k,v])=>[k,[...v].map(x=>[...x]).sort((a,b)=>a[0].localeCompare(b[0]))])
);

if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw new Error("Compact SMMC connection index drifted from canonical ledger");
}
for (const rows of Object.values(actual)) {
  for (const row of rows) {
    if (!Array.isArray(row) || row.length !== 2 || !/^SMMC-\d{4}-[ABC][1-4]$/.test(row[0]) || ![0,1].includes(row[1])) {
      throw new Error("Malformed compact SMMC connection row");
    }
  }
}
console.log(`SMMC connection index valid: ${Object.keys(actual).length} T25 targets from ${ledger.length} canonical problems.`);
