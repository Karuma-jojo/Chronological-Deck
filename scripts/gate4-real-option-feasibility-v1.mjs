// Seed-free engineering feasibility only. No certificate, seed or cohort is emitted.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const sorted = xs => [...xs].sort(cmp);
const require = (ok, message) => { if (!ok) throw new Error(message); };
export const MAX_NODES = 200000;

// Exhaustive finite search, up to an explicit cap. Real options are conjunctions
// of whole clusters; options within one investigation are alternatives.
// Only existence and node count leave this function. Its witness is discarded.
export function proveRealOptionJointFeasibility(inv, req, probes, maxNodes = MAX_NODES) {
  require(Number.isSafeInteger(maxNodes) && maxNodes > 0 && maxNodes <= MAX_NODES,
    'invalid feasibility node cap; STOP');
  const clusters = [...inv.clusters].sort((a, b) => cmp(a.id, b.id));
  const byId = new Map(clusters.map(c => [c.id, c]));
  require(byId.size === clusters.length, 'duplicate cluster; STOP');
  const owner = new Map();
  for (const c of clusters) {
    require(c.members.length > 0 && new Set(c.labels).size === c.labels.length,
      'invalid cluster; STOP');
    for (const id of c.members) {
      require(!owner.has(id), 'duplicate clustered member; STOP');
      owner.set(id, c.id);
    }
  }
  for (const side of ['visible', 'hidden']) {
    require(new Set(req[side]).size === req[side].length, 'duplicate requirement; STOP');
  }
  for (const key of ['visibleClusters', 'visibleIds', 'hiddenClusters', 'hiddenIds', 'giantComponentMax']) {
    require(Number.isSafeInteger(req.limits[key]) && req.limits[key] >= 0,
      'invalid feasibility limits; STOP');
  }
  require(clusters.every(c => c.members.length <= req.limits.giantComponentMax),
    'giant co-allocation component; STOP');
  require(new Set(probes.map(p => p.kind)).size === probes.length,
    'duplicate investigation; STOP');
  const investigations = probes.map(p => ({kind: p.kind, options: p.options.map(o => {
    const ids = sorted(new Set(o.clusterIds));
    require(ids.length > 0 && ids.every(id => byId.has(id)), 'foreign/empty option; STOP');
    return ids;
  })})).sort((a, b) => cmp(a.kind, b.kind));
  const neighbors = new Map(clusters.map(c => [c.id, new Set()]));
  for (const [a, b] of inv.crossEdges) {
    require(owner.has(a) && owner.has(b), 'foreign exposure owner; STOP');
    const ca = owner.get(a), cb = owner.get(b);
    if (ca !== cb) { neighbors.get(ca).add(cb); neighbors.get(cb).add(ca); }
  }
  const labels = new Map([...new Set([...req.visible, ...req.hidden])].map(tag =>
    [tag, clusters.filter(c => c.labels.includes(tag)).map(c => c.id)]));
  const coveredTags = (chosen, tags) => tags.filter(tag =>
    [...chosen].some(id => byId.get(id).labels.includes(tag))).length;
  const coveredKinds = chosen => investigations.filter(p =>
    p.options.some(ids => ids.every(id => chosen.has(id)))).length;
  let exploredNodes = 0;
  function search(visible, hidden, visibleIds, hiddenIds) {
    if (++exploredNodes > maxNodes) {
      const error = new Error('joint real-option solver cap reached; STOP; no seed draw');
      error.code = 'SOLVER_CAP';
      throw error;
    }
    const constraints = [];
    function add(side, key, options) {
      const chosen = side === 'VISIBLE' ? visible : hidden;
      const opposite = side === 'VISIBLE' ? hidden : visible;
      const count = side === 'VISIBLE' ? visibleIds : hiddenIds;
      const maxClusters = req.limits[side === 'VISIBLE' ? 'visibleClusters' : 'hiddenClusters'];
      const maxIds = req.limits[side === 'VISIBLE' ? 'visibleIds' : 'hiddenIds'];
      const eligible = options.map(ids => ids.filter(id => !chosen.has(id))).filter(ids =>
        chosen.size + ids.length <= maxClusters &&
        count + ids.reduce((n, id) => n + byId.get(id).members.length, 0) <= maxIds &&
        ids.every(id => !opposite.has(id) &&
          [...neighbors.get(id)].every(other => !opposite.has(other))));
      constraints.push({side, key, eligible});
    }
    for (const [side, chosen, tags] of [['VISIBLE', visible, req.visible], ['HIDDEN', hidden, req.hidden]]) {
      for (const tag of tags) {
        if (![...chosen].some(id => byId.get(id).labels.includes(tag))) {
          add(side, 'LABEL:' + tag, labels.get(tag).map(id => [id]));
        }
      }
    }
    for (const p of investigations) {
      if (!p.options.some(ids => ids.every(id => visible.has(id)))) add('VISIBLE', 'KIND:' + p.kind, p.options);
    }
    if (!constraints.length) return true;
    constraints.sort((a, b) => a.eligible.length - b.eligible.length || cmp(a.side, b.side) || cmp(a.key, b.key));
    const {side, eligible} = constraints[0];
    if (!eligible.length) return false;
    const chosen = side === 'VISIBLE' ? visible : hidden;
    const coverage = set => side === 'VISIBLE'
      ? coveredTags(set, req.visible) + coveredKinds(set)
      : coveredTags(set, req.hidden);
    const currentCoverage = coverage(chosen);
    const ranked = eligible.map(ids => ({ids, gain: coverage(new Set([...chosen, ...ids])) - currentCoverage}));
    ranked.sort((a, b) => b.gain - a.gain || cmp(a.ids.join('\n'), b.ids.join('\n')));
    for (const {ids} of ranked) {
      const next = new Set([...chosen, ...ids]);
      const count = ids.reduce((n, id) => n + byId.get(id).members.length, 0);
      if (side === 'VISIBLE'
        ? search(next, hidden, visibleIds + count, hiddenIds)
        : search(visible, next, visibleIds, hiddenIds + count)) return true;
    }
    return false;
  }
  const feasible = search(new Set(), new Set(), 0, 0);
  return {feasible, exploredNodes, witnessWithheld: true};
}

async function main() {
  require(process.argv.length === 2, 'this command takes no seeds, keys or cohort arguments; STOP');
  const root = new URL('../', import.meta.url);
  const read = path => readFileSync(new URL(path, root));
  const sha = bytes => createHash('sha256').update(bytes).digest('hex');
  const blob = bytes => createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
  const pins = {
    'course/smmc/arsenal/candidates-v0.mjs': 'a9cbeb55a2a829a881e228be6d6b22f667baa2c7',
    'course/smmc/arsenal/granularity-ledger-v0.mjs': 'a968f71f567d86242d183412ef5df64aefa73c70',
    'course/smmc/arsenal/tribunal-ledger-v0.mjs': '9dac5f6b6e21ad144d541ccea9088cd875b44163'
  };
  for (const [path, expected] of Object.entries(pins)) require(blob(read(path)) === expected, 'frozen predecessor blob changed; STOP');
  require(sha(read('scripts/gate4-calibration-sampler-v1.mjs')) ===
    '6ebbb650f1dd90934d39578f9ae46fe615f30c0f875d7823a2e41932992bc9fb', 'accepted sampler changed; STOP');
  const registryBytes = read('course/smmc/arsenal/gate4-real-probe-eligibility-v1.json');
  require(sha(registryBytes) === '3f12751c61ccf42dc4aa0a3b4481aca4c9762f30c6ea41e78b0623cbff5fbeac',
    'reviewed proposal bytes changed; STOP');
  const registry = JSON.parse(registryBytes);
  const {inventory, requirements, preflight, REAL_PROBES, digest} = await import('./gate4-calibration-sampler-v1.mjs');
  const {ARSENAL_GATE2_RAW_CANDIDATES: raw, ARSENAL_GATE2_RAW_EVIDENCE: evidence} =
    await import('../course/smmc/arsenal/candidates-v0.mjs');
  const {ARSENAL_GATE3_GRANULARITY_RECORDS: g3} = await import('../course/smmc/arsenal/granularity-ledger-v0.mjs');
  const inv = inventory(raw, g3, evidence), req = requirements(inv);
  require(inv.poolCount === 661 && inv.poolBytes === 1739956 && inv.poolSha256 ===
    'd404cf6b3b4810df7843881a9ffb27ea106753db9e753966ef0a6000a671ca5a', 'frozen pool changed; STOP');
  require(registry.version === 'G4-CAL-REAL-PROBES-v1' && registry.poolSha256 === inv.poolSha256,
    'registry pool/version changed; STOP');
  const registryDigest = digest('SMMC-G4-CAL-REAL-PROBES-v1', registry);
  require(registryDigest === 'dc969b78ea183cfdfbb9adabbb9acd9ad208cb9187c73a414b219df2f8ab9e23',
    'proposal content digest changed; STOP');
  require(JSON.stringify(sorted(registry.probes.map(p => p.kind))) === JSON.stringify(sorted(REAL_PROBES)),
    'investigation kinds changed; STOP');
  preflight(inv, req);
  const memberToCluster = new Map(inv.clusters.flatMap(c => c.members.map(id => [id, c.id])));
  const probes = registry.probes.map(p => ({kind: p.kind, options: p.options.map(o => {
    require(o.candidateIds.length > 0 && new Set(o.candidateIds).size === o.candidateIds.length &&
      o.candidateIds.every(id => memberToCluster.has(id)), 'invalid real option participants; STOP');
    require(o.witnesses.length === o.candidateIds.length &&
      new Set(o.witnesses.map(w => w.candidateId)).size === o.candidateIds.length &&
      o.witnesses.every(w => o.candidateIds.includes(w.candidateId) && w.evidenceRecordIds.length > 0 &&
        w.evidenceRecordIds.every(id => inv.evidenceOwners[w.candidateId].includes(id))),
      'real option evidence ownership changed; STOP');
    return {clusterIds: sorted(new Set(o.candidateIds.map(id => memberToCluster.get(id))))};
  })}));
  const result = proveRealOptionJointFeasibility(inv, req, probes);
  const report = {
    version: 'G4-CAL-JOINT-REAL-FEASIBILITY-v1',
    engineeringResult: result.feasible ? 'FEASIBLE_UNATTESTED' : 'STOP_NO_WITNESS',
    scope: 'ALL_REAL_OPTIONS_AND_MECHANICAL_VISIBLE_HIDDEN_CONSTRAINTS',
    researchHeadSha: 'a542a312f3b799b06b9e23b3863ffc50f4ae84be',
    acceptedSamplerHeadSha: 'e9882b895d7adde9b855c93687883f6e1216214c',
    poolSha256: inv.poolSha256, registryDigest, limits: req.limits, maxNodes: MAX_NODES,
    investigationKinds: probes.length, prospectiveOptions: probes.reduce((n, p) => n + p.options.length, 0),
    ...result,
    independentCustodianAttestation: 'PENDING', independentApproval: 'PENDING',
    seedsGenerated: false, realDraw: false, productionCertificateCreated: false
  };
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  if (!result.feasible) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch(error => {
    // Never serialize search state or stack traces containing possible witness data.
    const reason = error.code === 'SOLVER_CAP' ? 'SOLVER_CAP_200000' : 'INVALID_INPUT';
    process.stderr.write('G4_REAL_OPTION_FEASIBILITY_STOP: ' + reason + '; no authorization or draw.\n');
    process.exitCode = 1;
  });
}
