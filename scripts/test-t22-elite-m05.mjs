import {checkModule} from '../docs/t22-course/audit/m05-m06-semantic-checks.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m05.json','utf8'));
checkModule(a);
const by=n=>a.sessions.find(s=>s.order===n);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;

assert.equal(a.version,'m05-authoring-v2-independent-review-repair-r1');
assert.equal(a.instructionVersion,'m05-instruction-v2-independent-review-repair-r1');
assert.equal(a.module.id,'T22E-TRD01');
assert.equal(a.module.status,'v2-independent-review-repair-r1-awaiting-full-validation-and-exact-head-confirmation');
assert.deepEqual(a.boundary.prerequisiteModules,['ARC048']);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(Object.keys(a.evidenceDistance.items).length,48);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,24);
assert.equal(Object.keys(a.decisionAudit.items).length,1);
assert(a.sourceLedger.length>=10);
assert(a.representationProgression.length>=15);
assert.equal(a.reconstructionAudit.architectureDecision,'DEEP BOUNDED RECONSTRUCTION');

const hashes=new Set();
for(const s of a.sessions){
 assert.equal(s.requiredOwnership.length,5);
 assert(/Worked /.test(s.lesson)&&s.lesson.includes('Guided check'),'Missing worked instructional stage or guided check: '+s.id);
 assert(s.guidedFeedback?.length>20);
 assert.equal(a.claimEvidence[s.id].length,5);
 assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
 assert(a.semanticSeparationAudit.sessions[s.id]);
 assert(a.wrongSolverAudit.sessions[s.id]);
 const h=crypto.createHash('sha256').update(JSON.stringify(stable({title:s.title,focus:s.focus,purpose:s.purpose,claims:s.requiredOwnership,lesson:s.lesson}))).digest('hex');
 assert(!hashes.has(h),'duplicate session payload '+s.id);hashes.add(h);
 for(const kind of ['main','transfer']){
  const id=s[kind],p=a.problems[id],ev=a.evaluators[id];
  assert([1,2,3,4].includes(p.obligationVersion),id);
  assert.equal(ev.rubric.length,5,id);
  assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10,id);
  assert(a.evidenceDistance.items[id],id);
 }
}

// Architecture / boundary pins from the deep-source rebuild.
assert(by(1).title.includes('Decision anatomy'));
assert(by(4).title.includes('decision trees'));
assert(by(4).representations?.[0]?.root.includes('DECISION NODE'));
assert.equal(a.problems[by(1).main].representations,undefined);
assert.equal(a.problems[by(4).main].representations,undefined);
assert(by(8).title.includes('dominance'));
assert(by(12).lesson.includes('first-hit')&&by(12).lesson.includes('absorption')&&by(12).lesson.includes('prefix'));
assert(by(13).lesson.includes('not')&&by(13).lesson.includes('optimization'));
assert(by(15).title.includes('ordinal representation'));
assert(by(16).lesson.includes('Positive-affine')||by(16).lesson.includes('positive-affine'));
assert(by(16).lesson.includes('arbitrary increasing'));
assert(by(20).title.includes('strategic opponents'));
assert(by(20).lesson.includes('bimatrix'));
assert(by(22).title.includes('Strictly competitive'));
assert(by(22).lesson.includes('column player\'s criterion is to make that row payoff smaller')&&by(22).lesson.includes('not inferred from an arbitrary bimatrix'));
assert(by(23).title.includes('Mixed strategies'));
assert(by(23).lesson.includes('minimize expected row payoff'));
assert(by(24).lesson.includes('Model-selection questions'));
assert(by(24).lesson.includes('Worked synthesis (path-dependent strand)'));

// Evidence-distance honesty: very few tasks claim genuine changed-surface/fresh evidence.
const classes=Object.values(a.evidenceDistance.items).map(x=>x.class);
assert.equal(classes.filter(x=>x==='fresh Main evidence').length,0);
assert.equal(classes.filter(x=>x==='changed-surface Transfer').length,1);
assert.equal(a.evidenceDistance.items[by(24).main].class,'integrated reasoning reconstruction');
assert.equal(a.evidenceDistance.items[by(16).transfer].class,'changed-surface Transfer');
assert.equal(a.evidenceDistance.items[by(4).transfer].class,'reasoning reconstruction');
assert.equal(a.evidenceDistance.items[by(22).transfer].class,'reasoning reconstruction');
assert.equal(a.evidenceDistance.items[by(24).transfer].class,'integrated reasoning reconstruction');

// Independent-review surface repairs are version4; other reconstructed contracts remain version3.
assert.equal(a.independentReviewRepairAudit.changedAssessmentIds.length,10);
const repairV4=new Set(a.independentReviewRepairAudit.changedAssessmentIds);
for(const pid of a.reconstructionAudit.materiallyChangedPublicContracts)assert.equal(a.problems[pid].obligationVersion,repairV4.has(pid)?4:3,pid);
for(const pid of a.reconstructionAudit.preservedPublicContracts)assert([1,2].includes(a.problems[pid].obligationVersion),pid);

// Critical misconception discriminators.
assert(a.wrongSolverAudit.sessions[by(4).id].plausibleWrongSolver.includes('.50/.50'));
assert(a.wrongSolverAudit.sessions[by(12).id].plausibleWrongSolver.includes('terminal bankroll'));
assert(a.wrongSolverAudit.sessions[by(16).id].plausibleWrongSolver.includes('any increasing transform'));
assert(a.wrongSolverAudit.sessions[by(20).id].plausibleWrongSolver.includes('minimizes row payoff'));
assert(a.wrongSolverAudit.sessions[by(23).id].plausibleWrongSolver.includes('50/50'));

// Boundary exclusions remain explicit.
for(const term of ['Bayes','market prices','Kelly','dynamic programming','general Nash/minimax existence']){
 assert(a.boundary.excludes.some(x=>x.includes(term)),term);
}
// Prohibited later machinery must not be taught as owned lesson content.
for(const bad of ["posterior odds","bid/ask","log return","Kelly criterion","covariance matrix","dynamic programming"]){
 assert(!a.sessions.some(s=>s.lesson.includes(bad)),'M05 lesson boundary leak: '+bad);
}

console.log('PASS M05 v2 structural/pedagogy candidate: 24 sessions, 48 tasks, 120 observed claims, deep-source route, representations, honest evidence distance, wrong-solver discrimination and boundary guards.');
