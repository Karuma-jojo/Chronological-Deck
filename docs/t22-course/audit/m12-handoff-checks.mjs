import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m12-side267.json','utf8'));
const contract=JSON.parse(fs.readFileSync('docs/t22-course/audit/m12-semantic-contract.json','utf8'));
const handoff=fs.readFileSync('docs/t22-course/M12-REVIEW-HANDOFF.md','utf8');
const verification=fs.readFileSync('docs/t22-course/M12-VERIFICATION.md','utf8');
const resolution=fs.readFileSync('docs/t22-course/M12-RESOLUTION.md','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');

assert.equal(a.module.id,'SIDE267');
assert.equal(a.module.status,'builder-validated-candidate-unpublished');
assert.equal(a.sessions.length,19);
assert.equal(Object.keys(a.problems).length,38);
assert.equal(Object.values(a.claimEvidence).flat().length,58);
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE263','ARC053']);
assert(!a.boundary.prerequisiteModules.includes('ARC510'));
assert.equal(contract.ownershipClaimCount,58);
assert.equal(contract.unpublished,true);

assert.match(handoff,/builder-validated, independently adversarially audited, bounded repairs applied; unpublished; awaiting focused independent confirmation/i);
assert.match(handoff,/3a79fd433626f5e133e759c14c114b23c580391b/);
assert.match(handoff,/36037157131/);
assert.match(handoff,/19 design-derived sessions/i);
assert.match(handoff,/38 fixed assessments/i);
assert.match(handoff,/58 retained ownership claims/i);
assert.match(handoff,/retrieval: \*\*10\*\*/i);
assert.match(handoff,/proof reconstruction: \*\*5\*\*/i);
assert.match(handoff,/fresh Main evidence: \*\*4\*\*/i);
assert.match(handoff,/changed-surface Transfer: \*\*19\*\*/i);
assert.match(handoff,/Hairer's \*A theory of regularity structures\*/i);
assert.match(handoff,/advanced \*\*non-import boundary\*\*/i);
assert.match(handoff,/S10 defines series through partial sums.*S11 adds only the bounded power-series bridge/is);
assert.match(handoff,/S17 smooth-versus-analytic/i);
assert.match(handoff,/Independent adversarial audit and bounded repair/i);
assert.match(handoff,/seven ownership rows narrowed/i);
assert.match(handoff,/19\/19 lessons/i);
assert.match(handoff,/focused independent confirmation target/i);
assert.match(handoff,/STOP at M12/i);
assert.match(handoff,/Do not author M13/i);
assert(!/independently accepted|independent acceptance complete/i.test(handoff),'handoff overclaims independent M12 acceptance');

for(const heading of [
  'Whole-module route audit','Final whole-module type check','Mathematical objects','Hypotheses',
  'Definitions versus interpretations','Representations','Dependencies','Future boundary','Evidence',
  'Separation / freshness','Mathematical reconstruction','Canonical state','Regression guard discovered during M12'
])assert.match(verification,new RegExp(heading.replace('/','\\/'),'i'),'verification missing '+heading);
assert.match(verification,/3a79fd433626f5e133e759c14c114b23c580391b/);
assert.match(verification,/36037157131/);
assert.match(verification,/Result: PASS/g);
assert.match(verification,/builder verification, not independent pedagogical acceptance/i);
assert.match(verification,/Independent adversarial audit repair/i);
assert.match(verification,/M12-A01/i);
assert.match(verification,/m12-instruction-math-checks\.mjs/i);

assert.match(resolution,/BOUNDED REPAIR — DO NOT REBUILD/i);
for(const id of ['M12-A01','M12-A02','M12-A03','M12-A04','M12-A05']) assert.match(resolution,new RegExp(id));
assert.match(resolution,/0,1,8,24,24/);
assert.match(resolution,/seven rows were narrowed/i);
assert.match(resolution,/19\/19 learner-facing lessons/i);
assert.match(resolution,/difference quotient/i);
assert.match(resolution,/M12 remains unpublished/i);
assert.match(resolution,/M13 remains closed/i);

for(const cmd of [
 'node scripts/test-t22-elite-m12.mjs',
 'node docs/t22-course/audit/m12-math-checks.mjs',
 'node docs/t22-course/audit/m12-instruction-math-checks.mjs',
 'node scripts/test-t22-elite-m12-browser.mjs'
])assert(workflow.includes(cmd),'workflow missing '+cmd);

console.log('PASS M12 handoff: bounded independent-audit repairs documented; 19/38 architecture preserved; seven ownership rows narrowed; 19/19 instructional-math checker mandatory; focused confirmation boundary explicit without claiming acceptance.');
