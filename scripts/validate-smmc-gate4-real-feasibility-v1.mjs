// Artificial exact-search controls; no real selection, certificate or seed.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {proveRealOptionJointFeasibility as prove} from './gate4-real-option-feasibility-v1.mjs';

const limits = {visibleClusters: 4, visibleIds: 8, hiddenClusters: 3, hiddenIds: 6, giantComponentMax: 4};
const cluster = (id, labels, size = 1) => ({id, labels, members: Array.from({length: size}, (_, i) => id + ':' + i)});
const probe = (kind, groups) => ({kind, options: groups.map(clusterIds => ({clusterIds}))});

// Independent exhaustive oracle: assign every cluster unused/visible/hidden,
// then evaluate the complete final predicates. It does not follow search moves.
function exhaustive(inv, req, probes) {
  const n = inv.clusters.length;
  for (let code = 0; code < 3 ** n; code++) {
    let digits = code;
    const visible = [], hidden = [];
    for (const c of inv.clusters) {
      const side = digits % 3;
      digits = Math.floor(digits / 3);
      if (side === 1) visible.push(c);
      if (side === 2) hidden.push(c);
    }
    if (visible.length > req.limits.visibleClusters || hidden.length > req.limits.hiddenClusters) continue;
    const vi = new Set(visible.flatMap(c => c.members)), hi = new Set(hidden.flatMap(c => c.members));
    if (vi.size > req.limits.visibleIds || hi.size > req.limits.hiddenIds) continue;
    if (!req.visible.every(t => visible.some(c => c.labels.includes(t))) ||
        !req.hidden.every(t => hidden.some(c => c.labels.includes(t)))) continue;
    if (inv.crossEdges.some(([a, b]) => (vi.has(a) && hi.has(b)) || (vi.has(b) && hi.has(a)))) continue;
    if (!probes.every(p => p.options.some(o => o.clusterIds.every(id => visible.some(c => c.id === id))))) continue;
    return true;
  }
  return false;
}

// Mechanical feasibility can coexist with impossible real-option coverage.
const two = {clusters: [cluster('SYN-A', ['V', 'H']), cluster('SYN-B', ['V', 'H'])], crossEdges: []};
const req = {visible: ['V'], hidden: ['H'], limits};
assert.equal(prove(two, req, []).feasible, true);
assert.equal(prove(two, req, [probe('K', [['SYN-A', 'SYN-B']])]).feasible, false);

// Search must backtrack across real alternatives; a first option may block hidden.
const alternatives = {clusters: [cluster('SYN-A', ['V', 'H']), cluster('SYN-B', ['V'])], crossEdges: []};
const choices = [probe('K', [['SYN-A'], ['SYN-B']])];
assert.equal(prove(alternatives, req, choices).feasible, true);
assert.equal(prove(alternatives, req, [probe('K', [['SYN-A']])]).feasible, false);
const exposed = {...alternatives, crossEdges: [['SYN-A:0', 'SYN-B:0', 'SYN-E1', 'SYN-E2']]};
assert.equal(prove(exposed, req, choices).feasible, false);

// Whole normalized-name clusters count all members against each side's ID cap.
const weighted = {clusters: [cluster('SYN-A', ['V'], 3), cluster('SYN-B', ['H'])], crossEdges: []};
assert.equal(prove(weighted, {...req, limits: {...limits, visibleIds: 2}}, []).feasible, false);
assert.equal(prove(weighted, req, []).feasible, true);
assert.equal(prove(weighted, {...req, limits: {...limits, visibleClusters: 0}}, []).feasible, false);
assert.equal(prove(weighted, {...req, limits: {...limits, hiddenIds: 0}}, []).feasible, false);
assert.equal(prove(weighted, {...req, limits: {...limits, hiddenClusters: 0}}, []).feasible, false);
assert.throws(() => prove(weighted, {...req, limits: {...limits, giantComponentMax: 2}}, []), /giant/);
assert.throws(() => prove(weighted, req, [], 1), /solver cap/);
assert.throws(() => prove(weighted, req, [], 200001), /node cap/);
assert.throws(() => prove(weighted, req, [probe('K', [['FOREIGN']])]), /foreign/);
assert.throws(() => prove({...weighted, crossEdges: [['MISSING', 'SYN-B:0']]}, req, []), /foreign/);

// Fixed deterministic artificial corpus, with conjunction options, overlap,
// multiple ID weights, conflicting exposure edges, missing tags and tight caps.
let state = 0x451a923;
const rnd = n => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state % n; };
let feasibleCases = 0;
for (let test = 0; test < 240; test++) {
  const cs = Array.from({length: 6}, (_, i) => cluster('SYN-' + i,
    ['V1', 'V2', 'H1', 'H2'].filter(() => rnd(5) < 3), 1 + rnd(3)));
  const crossEdges = [];
  for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
    if (rnd(7) === 0) crossEdges.push([cs[i].members[0], cs[j].members[0]]);
  }
  const inv = {clusters: cs, crossEdges};
  const r = {visible: ['V1', 'V2'], hidden: ['H1', 'H2'], limits: {...limits,
    visibleClusters: 1 + rnd(4), visibleIds: 2 + rnd(7), hiddenClusters: 1 + rnd(3), hiddenIds: 1 + rnd(6)}};
  const ps = Array.from({length: 2}, (_, k) => probe('K' + k,
    Array.from({length: 1 + rnd(3)}, () => [...new Set([cs[rnd(6)].id, cs[rnd(6)].id])])));
  const expected = exhaustive(inv, r, ps), actual = prove(inv, r, ps);
  assert.equal(actual.feasible, expected, 'exhaustive artificial case ' + test);
  assert.deepEqual(Object.keys(actual).sort(), ['exploredNodes', 'feasible', 'witnessWithheld']);
  assert.equal(actual.witnessWithheld, true);
  assert.ok(!JSON.stringify(actual).includes('SYN-'));
  assert.deepEqual(prove({...inv, clusters: [...cs].reverse(), crossEdges: [...crossEdges].reverse()},
    {...r, visible: [...r.visible].reverse(), hidden: [...r.hidden].reverse()},
    [...ps].reverse().map(p => ({...p, options: [...p.options].reverse()}))), actual,
    'input order cannot affect result or explored nodes');
  if (expected) feasibleCases++;
}
assert.ok(feasibleCases > 0 && feasibleCases < 240, 'both outcomes exercised');
const child = spawnSync(process.execPath, [new URL('./gate4-real-option-feasibility-v1.mjs', import.meta.url).pathname,
  'SYNTHETIC-SEED-ARGUMENT-NOT-ALLOWED'], {encoding: 'utf8'});
assert.equal(child.status, 1);
assert.equal(child.stdout, '');
assert.match(child.stderr, /INVALID_INPUT/);
console.log('G4_REAL_FEASIBILITY_SYNTHETIC_OK', JSON.stringify({artificialCases: 240,
  feasibleCases, infeasibleCases: 240 - feasibleCases, exactAssignmentsPerCase: 729,
  noRealDraw: true, noSeedGeneration: true}));
