import assert from 'node:assert/strict';
import fs from 'node:fs';
import { evaluate } from './score-archive-search-benchmark.mjs';

const fixture = JSON.parse(fs.readFileSync('scripts/fixtures/archive-search-benchmark-v2.json'));
assert.equal(fixture.cases.length, 30);
assert.equal(new Set(fixture.cases.map(c => c.id)).size, 30);
for (const c of fixture.cases) {
  assert.ok(c.query && c.logicalArcId && c.evidence);
  assert.ok(['development', 'held_out'].includes(c.split));
  new RegExp(c.evidence, 'is');
}
// A result from the expected ARC without the requested passage is not a hit.
const cases = [{ id: 'a', split: 'held_out', logicalArcId: 'A', evidence: 'shared input' }];
const scored = evaluate(cases, { cases: [{ id: 'a', results: [
  { logical_arc_id: 'A', content: 'an unrelated passage' },
  { logical_arc_id: 'B', content: 'shared input' },
  { logical_arc_id: 'A', content: 'SHARED INPUT' }
] }] });
assert.equal(scored.rows[0].rank, 3);
assert.equal(scored.hitAt1, 0);
assert.equal(scored.hitAt5, 1);
assert.equal(scored.mrrAt40, 1 / 3);
assert.throws(() => evaluate(cases, { cases: [] }), /Incomplete/);
console.log('Archive search fixture and benchmark scorer checks passed.');
