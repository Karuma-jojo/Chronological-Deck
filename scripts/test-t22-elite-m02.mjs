import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m02.json','utf8'));
assert.equal(a.module.id,'T22E-FND02');assert.equal(a.module.order,2);assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01']);
assert.equal(a.sessions.length,24);assert.equal(Object.keys(a.problems).length,48);assert.equal(Object.keys(a.evaluators).length,48);
assert.deepEqual(a.sessions.map(s=>s.order),Array.from({length:24},(_,i)=>i+1));
assert.equal(new Set(a.sessions.map(s=>s.id)).size,24);assert.equal(Object.keys(a.coverage).length,24);assert.equal(Object.keys(a.instructionSeparation).length,24);assert.equal(Object.keys(a.claimEvidence||{}).length,24);assert.equal(a.coverageAudit?.status,'120/120 semantically re-audited through R01–R08 plus Lang-foundation L01–L10; S03 Pythagorean distance, S12 real-exponential law and S22 angle-addition ownership are now explicit downstream prerequisites');assert.equal(Object.keys(a.evidenceDistance||{}).length,48);for(const x of Object.values(a.evidenceDistance))assert(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer'].includes(x.classification)&&x.reason);assert(a.representationProgression?.length>=10);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
for(const s of a.sessions){
 assert.match(s.id,/^T22V3::T22E-FND02::S\d\d@1$/);assert.equal(s.requiredOwnership.length,5);assert(s.lesson.includes('Worked example:'));assert(s.lesson.includes('Guided check:'));
 const contract={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
 const h=crypto.createHash('sha256').update(JSON.stringify(stable(contract))).digest('hex');assert(!hashes.has(h));hashes.add(h);
 const cov=a.coverage[s.id];assert.equal(cov.length,5);for(const x of cov){assert(x.length);for(const k of x)assert(['main','transfer'].includes(k));}
 const ce=a.claimEvidence[s.id];assert.equal(ce.length,5);ce.forEach((e,i)=>{assert.equal(e.claim,s.requiredOwnership[i]);assert(['main','transfer'].includes(e.task));const pid=s[e.task];assert.equal(e.publicRequest,a.problems[pid].prompt);assert(Array.isArray(e.rubricEvidence)&&e.rubricEvidence.length);for(const criterion of e.rubricEvidence)assert(a.evaluators[pid].rubric.some(r=>r.criterion===criterion),s.id+' claim evidence rubric must be exact');});
 const audit=a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')];assert(Array.isArray(audit)&&audit.length);for(const x of audit)assert(x.item&&x.source);
 const sep=a.instructionSeparation[s.id];for(const [kind,pid] of [['main',s.main],['transfer',s.transfer]]){assert(a.problems[pid]);assert(a.evaluators[pid]);assert.equal(a.evaluators[pid].rubric.reduce((z,r)=>z+r.points,0),10);assert(sep[kind]?.length);for(const f of sep[kind]){assert(a.problems[pid].prompt.includes(f),s.id+' separation fragment missing in task: '+f);assert(!s.lesson.includes(f),s.id+' lesson leaks '+kind+' fragment: '+f);}}
}
assert.equal([...hashes].length,24);assert.equal(Object.values(a.coverage).flat().length,120);assert.equal(Object.values(a.claimEvidence).flat().length,120);

const close=(x,y,t=1e-9)=>assert(Math.abs(x-y)<=t*Math.max(1,Math.abs(x),Math.abs(y)),x+' != '+y);

// M02-01..04 semantic acceptance guards.
const s2=a.sessions.find(s=>s.order===2),s3=a.sessions.find(s=>s.order===3),s4=a.sessions.find(s=>s.order===4),s6=a.sessions.find(s=>s.order===6),s8=a.sessions.find(s=>s.order===8),s9=a.sessions.find(s=>s.order===9),s10=a.sessions.find(s=>s.order===10),s12=a.sessions.find(s=>s.order===12),s13=a.sessions.find(s=>s.order===13),s17=a.sessions.find(s=>s.order===17),s18=a.sessions.find(s=>s.order===18),s20=a.sessions.find(s=>s.order===20),s21=a.sessions.find(s=>s.order===21),s22=a.sessions.find(s=>s.order===22),s23=a.sessions.find(s=>s.order===23),s24=a.sessions.find(s=>s.order===24);
assert(s2.lesson.includes('range is the set of outputs')&&s2.lesson.includes('∪ means union'));
assert(a.problems[s8.main].prompt.includes('reciprocal 1/f(y)'));
assert(a.problems[s12.transfer].prompt.includes('grows 6% per period'));
assert(a.problems[s13.main].prompt.includes('allowed real logarithm-base conditions'));
assert(a.problems[s18.transfer].prompt.includes('Infer its constant ratio')&&a.problems[s18.transfer].prompt.includes('sanity check'));
assert(a.evaluators[s20.transfer].reference.includes('forward invariance')&&a.evaluators[s20.transfer].rubric.some(r=>r.criterion.includes('finite prefix alone earns no reasoning points')));
assert(s21.lesson.includes('cos45°=sin45°=√2/2')&&s21.lesson.includes('I(+,+), II(−,+), III(−,−), IV(+,−)'));assert(s3.representations?.some(x=>x.kind==='plot'));assert(a.problems[s3.transfer].representations?.some(x=>x.kind==='plot'));assert(a.problems[s6.transfer].representations?.length===2);assert(a.problems[s9.transfer].representations?.[0]?.kind==='plot');assert(a.problems[s10.transfer].representations?.[0]?.kind==='plot');assert(a.problems[s23.transfer].representations?.[0]?.kind==='plot');assert(a.problems[s24.transfer].representations?.[0]?.kind==='table');assert.equal(a.claimEvidence[s3.id][0].task,'transfer');assert.equal(a.claimEvidence[s23.id][0].task,'transfer');assert.equal(a.claimEvidence[s24.id][4].task,'transfer');assert(s23.lesson.includes('unit-circle coordinate')&&s24.lesson.includes('identify what kind of object the data support'));

// Lang-foundation L01/L02/L03/L05/L06/L08/L10 dependency-depth pins.
assert(!JSON.stringify(a.prerequisiteAudit.S03).includes('M01 Pythagorean'),'L01 must not invent a Pythagorean prerequisite in M01');
assert(s3.lesson.includes('Pythagorean theorem')&&s3.lesson.includes('d²=(Δx)²+(Δy)²'),'L01/L10 S03 must derive coordinate distance from a right triangle');
assert(s3.representations?.[0]?.segments?.length===3,'L01/L10 S03 must render the Δx/Δy/hypotenuse construction');
assert(a.prerequisiteAudit.S03.some(x=>x.item.includes('Pythagorean theorem')&&x.source.includes('JIT')));

assert(s4.lesson.includes('no solution')&&s4.lesson.includes('infinitely many solutions'),'L08 S04 must complete the three-way system geometry bridge');
assert.equal(s4.representations?.length,3,'L08 S04 must render intersecting, parallel and coincident cases');

assert(s12.requiredOwnership.includes('Use the positive-base real-exponential law b^(x+y)=b^x b^y.'),'L03 real-exponential law must be explicit ownership');
assert(s12.lesson.includes('extends the rational powers to all real inputs')&&s12.lesson.includes('b^(x+y)=b^x b^y'),'L03 rational→real bridge missing');
assert(s12.outOfScope.includes('Real-analysis construction of irrational exponents'),'L03 must state the construction boundary honestly');
assert.equal(a.problems[s12.main].obligationVersion,2);
assert(a.problems[s12.main].prompt.includes('use b^(x+y)=b^x b^y'));
assert(a.claimEvidence[s12.id].some(x=>x.claim.includes('real-exponential law')&&x.rubricEvidence.some(r=>r.includes('f(t+h)=f(t)·1.08^h'))),'L03 law must be independently observed');

assert(s17.lesson.includes('Write S=a₁+a₂+⋯+a_n')&&s17.lesson.includes('2S=n(a₁+a_n)'),'L05 S17 must actually derive the AP sum by pairing');
assert(a.prerequisiteAudit.S17.some(x=>x.source.includes('Derived explicitly by forward/reverse pairing')),'L05 prerequisite ledger must match lesson depth');

assert(s21.lesson.includes('isosceles right triangle with legs1,1')&&s21.lesson.includes('equilateral triangle of side2'),'L06 S21 must explicitly derive both special triangles');
assert(s21.representations?.filter(x=>x.kind==='plot'&&x.segments?.length===3).length===2,'L06 both special triangles must be rendered');

assert(s22.requiredOwnership.includes('Reconstruct and use sine/cosine angle-addition identities.'),'L02 S22 must own angle-addition identities');
assert(!s22.outOfScope.some(x=>/sum\/difference formulas/i.test(x)),'L02 addition formulas cannot remain out of scope');
assert(s22.lesson.includes('cos(A−B)=cosA cosB+sinA sinB')&&s22.lesson.includes('sin(A+B)=sinA cosB+cosA sinB'),'L02 identities must be derived before use');
assert.equal(a.problems[s22.transfer].obligationVersion,2);
assert(a.evaluators[s22.transfer].rubric.some(r=>r.criterion.includes('Derives cos(A+B)'))&&a.evaluators[s22.transfer].rubric.some(r=>r.criterion.includes('States sin(A+B)')),'L02 Transfer must observe reconstruction and sine formula');
assert.equal(a.claimEvidence[s22.id][4].task,'transfer');

// Independent follow-up R01/R04/R05/R07 semantic-observability pins.
assert.equal(a.problems[s21.transfer].obligationVersion,2);
assert(a.problems[s21.transfer].prompt.includes('7π/6 radians to degrees'));
assert.equal(a.claimEvidence[s21.id][0].task,'transfer');
assert.deepEqual(a.claimEvidence[s21.id][0].rubricEvidence,['Converts −45° to −π/4.','Converts 7π/6 radians back to 210°.'],'R04 bidirectional conversion must be literally scored in both directions');

assert.equal(a.problems[s23.main].obligationVersion,2);
assert(a.problems[s23.main].prompt.includes('compute the period by substituting B into 2π/|B|'));
assert(a.evaluators[s23.main].rubric.some(r=>r.criterion==='Explicitly computes period as 2π/|4|=π/2.'));
assert.equal(a.claimEvidence[s23.id][1].task,'main','R07 formula-period ownership must map to an explicit 2π/|B| computation');
assert(a.claimEvidence[s23.id][1].rubricEvidence.includes('Explicitly computes period as 2π/|4|=π/2.'));

assert.equal(a.problems[s23.transfer].obligationVersion,3);
assert(a.problems[s23.transfer].prompt.startsWith('Using only the supplied graph'));
assert(!a.problems[s23.transfer].prompt.includes('y=−3cos(2x)+4'),'R01 graph-reading surface must not disclose its underlying formula');
assert(a.problems[s23.transfer].prompt.includes('unrelated equation cos(4x)=0'),'R01 equation stage must be visibly separate from graph inference');
assert(a.evaluators[s23.transfer].rubric.some(r=>r.criterion.includes('matching extrema one full cycle apart')),'R01 period reading must require graph evidence');
assert.equal(a.claimEvidence[s23.id][0].task,'transfer');
assert.equal(a.claimEvidence[s23.id][4].task,'transfer');

assert.equal(a.problems[s24.transfer].obligationVersion,3);
assert(a.problems[s24.transfer].prompt.includes("State p's natural real domain and separately the restricted solution interval used here"));
assert(a.evaluators[s24.transfer].rubric.some(r=>r.criterion.includes('natural real domain θ∈ℝ')),'R05 must literally score the domain check');
assert(a.claimEvidence[s24.id][4].rubricEvidence.some(x=>x.includes('natural real domain θ∈ℝ')),'R05 exact observer must include the domain criterion');

// Independent mathematics — explicit recalculation across all 24 sessions.
assert.equal(3*5-4,11);assert.equal(3*(-2)-4,-10); // S01
assert.equal(Math.min(...[-2,-1,0,1,2,3].map(x=>x*x+1)),1);assert.equal(Math.max(...[-2,-1,0,1,2,3].map(x=>x*x+1)),10); // S02
close(Math.hypot(3,6),3*Math.sqrt(5));assert.deepEqual([(-1+2)/2,(-5+1)/2],[0.5,-2]); // S03
close((17-5)/(8-2),2);assert.equal((500-50)/2,225); // S04
assert.equal(2*(-2)+1,-3);assert.equal(Math.abs(1-3),2); // S05
assert.equal(-2*(1-3)**2+5,-3);assert.equal(Math.sqrt(2-(-7))+1,4); // S06
assert.equal(2*(1**2-1)+3,3);assert.equal((2*1+3)**2-1,24); // S07
for(const x of [-3,0,5])close(((3*x-7)+7)/3,x);assert.equal(Math.sqrt(9),3); // S08
const p=x=>(x-2)**2*(x+1);assert.equal(p(2),0);assert.equal(p(-1),0);assert(Math.sign(p(-2))!==Math.sign(p(0))); // S09
for(const x of [-4,0,3])if(x!==-1&&x!==2)close((x*x-4)/(x*x-x-2),(x+2)/(x+1));assert.equal(2*2-4,0);const sr=x=>(2*x*x+3*x-2)/(x*x-4),srr=x=>(2*x-1)/(x-2);for(const v of [-5,0,4])close(sr(v),srr(v));close(srr(-2),5/4); // S10
assert.equal(Math.sqrt(2*11-6)+1,5);assert.equal(Math.cbrt(-8)**2,4); // S11
close(500*1.08**2,583.2);close(1200*.85**3,736.95);close(1.08**(1.3+.7),1.08**1.3*1.08**.7); // S12 real-exponential addition law
close(Math.log(32)/Math.log(2),5);close(Math.log(.001)/Math.log(10),-3); // S13
for(const v of [0,2,5])close(Math.log((v-1)**2),2*Math.log(Math.abs(v-1))); // S14
close(3**(2*(Math.log(10)/(2*Math.log(3)))),10);close(100*Math.exp(-.4*(Math.log(5)/.4)),20); // S15
close(Math.log(1.25)+Math.log(.9),Math.log(1.125));close(Math.exp(.06*(Math.log(2)/.06)),2); // S16
assert.equal(7+9*4,43);assert.equal(10*(7+43)/2,250);assert.equal(20*(4+61)/2,650); // S17
assert.equal(3*2**7,384);assert.equal(3*(2**8-1),765);close(160*(1-.5**6)/(1-.5),315); // S18
assert.equal(Array.from({length:5},(_,i)=>2*(i+1)-1).reduce((u,v)=>u+v,0),25);assert.equal(Array.from({length:5},(_,i)=>3*2**i).reduce((u,v)=>u+v,0),93); // S19
let x=10;for(let i=0;i<3;i++)x=.5*x+3;close(x,6.5);let y=0;for(let i=0;i<3;i++)y=2*y-1;assert.equal(y,-7); // S20
close(150*Math.PI/180,5*Math.PI/6);close(7*Math.PI/6*180/Math.PI,210);close(4*5*Math.PI/6,10*Math.PI/3); // S21
close(Math.sin(5*Math.PI/4),-Math.SQRT1_2);close(Math.tan(5*Math.PI/4),1,1e-8);close((-3/4)**2+(3/5)**2,0.9225); // S22: exact task ratios separately checked below
close(2*Math.PI/4,Math.PI/2);assert.deepEqual([Math.PI/6,5*Math.PI/6].map(v=>Math.round(Math.sin(v)*2)),[1,1]);close(Math.cos(4*Math.PI/8),0,1e-8);close(Math.cos(4*3*Math.PI/8),0,1e-8); // S23
const q=n=>50*1.2**n;close(Array.from({length:6},(_,n)=>q(n)).reduce((u,v)=>u+v,0),496.496);close(q(3),86.4);close([0,1,2,3,4].map(k=>2+3*Math.sin(k*Math.PI/2)).reduce((u,v)=>u+v,0),10,1e-8); // S24
close(Math.cos(Math.PI/12),(Math.sqrt(6)+Math.sqrt(2))/4);close(Math.sin(Math.PI/4+Math.PI/6),Math.SQRT1_2*Math.sqrt(3)/2+Math.SQRT1_2*.5); // S22 addition formulas
// S22 task's recovered 3-4-5 triangle: sin=3/5, quadrant II implies cos=-4/5 and tan=-3/4.
close((3/5)**2+(-4/5)**2,1);close((3/5)/(-4/5),-3/4);
console.log('PASS: M02 Lang-foundation follow-up — 24 sessions/48 tasks; Pythagorean coordinate derivation, real-exponential law, AP pairing, special triangles, addition identities and three-way system geometry pinned; R01/R04/R05/R07 protections retained.');
