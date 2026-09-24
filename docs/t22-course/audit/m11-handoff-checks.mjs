import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m11-arc510.json','utf8'));
const receipt=JSON.parse(fs.readFileSync('docs/t22-course/audit/m11-validation-receipt.json','utf8'));
const handoff=fs.readFileSync('docs/t22-course/M11-REVIEW-HANDOFF.md','utf8');
const verification=fs.readFileSync('docs/t22-course/M11-VERIFICATION.md','utf8');

assert.equal(a.module.id,'ARC510');
assert.equal(a.sessions.length,20);
assert.equal(Object.keys(a.problems).length,40);
assert.equal(Object.values(a.claimEvidence).flat().length,61);
assert.match(a.module.status,/builder-verified-independent-review-repairs-unpublished/);
assert.equal(receipt.validatedImplementationCommit,'645c3d4c96ccdf1b2ad6120f63940d388077e7e9');
assert.equal(receipt.workflow.runId,36015062169);
assert.equal(receipt.workflow.conclusion,'success');
assert.equal(receipt.evidence.mainClassificationCalibrationsToRetrieval,8);
assert.equal(receipt.evidence.sourceLedgerEntries,16);
assert.equal(receipt.evidence.protectedPreM11Blobs,99);
assert.equal(receipt.browser.m11Registered,false);

for(const doc of [handoff,verification]){
  assert(doc.includes('645c3d4c96ccdf1b2ad6120f63940d388077e7e9'));
  assert(doc.includes('36015062169'));
  assert.match(doc,/builder-verified/i);
  assert.match(doc,/unpublished/i);
  assert(doc.includes('independent pedagogical acceptance'),'handoff/verification must explicitly name independent pedagogical acceptance');
  assert(/not independent pedagogical acceptance|does \*\*not\*\* mean/i.test(doc),'handoff/verification must explicitly refuse independent acceptance');
  assert.match(doc,/M12/);
}
assert.match(handoff,/STOP for final bounded M11 confirmation/i);
assert.match(handoff,/61 claim→task→rubric links/i);
assert.match(verification,/bounded independent-review findings implemented/i);
assert.match(verification,/direct supremum proof/i);
assert.match(handoff,/S01\/S02\/S05\/S06\/S09\/S13\/S14\/S19 → retrieval/i);
console.log('PASS M11 handoff: builder-verified unpublished candidate; validation receipt pinned; independent acceptance explicitly not claimed; M12 remains closed.');
