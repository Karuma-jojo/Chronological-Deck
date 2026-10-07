import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// Snapshots stay local: { cases: [{ id, results: [...] }] }. Never commit
// retrieved conversations, embeddings, owner IDs or credentials with a report.
export function evaluate(cases, snapshot) {
  const hits = new Map(snapshot.cases.map(c => [c.id, c.results]));
  if (hits.size !== cases.length) throw new Error('Incomplete benchmark snapshot');
  const rows = cases.map(c => {
    const results = hits.get(c.id);
    if (!Array.isArray(results)) throw new Error(`Missing results: ${c.id}`);
    const evidence = new RegExp(c.evidence, 'is');
    const index = results.findIndex(r => r.logical_arc_id === c.logicalArcId && evidence.test(r.content));
    return { id: c.id, split: c.split, rank: index < 0 ? null : index + 1 };
  });
  const summarize = rows => ({
    cases: rows.length,
    hitAt1: rows.filter(r => r.rank === 1).length,
    hitAt5: rows.filter(r => r.rank !== null && r.rank <= 5).length,
    mrrAt40: rows.reduce((s, r) => s + (r.rank !== null && r.rank <= 40 ? 1 / r.rank : 0), 0) / rows.length
  });
  return { ...summarize(rows), bySplit: Object.fromEntries(
    [...new Set(rows.map(r => r.split))].map(split => [split, summarize(rows.filter(r => r.split === split))])
  ), rows };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [fixturePath, snapshotPath] = process.argv.slice(2);
  if (!fixturePath || !snapshotPath) throw new Error('Usage: node scripts/score-archive-search-benchmark.mjs <fixture.json> <snapshot.json>');
  console.log(JSON.stringify(evaluate(JSON.parse(fs.readFileSync(fixturePath)).cases,
    JSON.parse(fs.readFileSync(snapshotPath))), null, 2));
}
