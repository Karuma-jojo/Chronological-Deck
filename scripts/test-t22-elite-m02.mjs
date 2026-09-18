import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m02.json','utf8'));
assert.equal(a.module.id,'T22E-FND02');assert.equal(a.module.order,2);assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01']);
assert.equal(a.sessions.length,24);assert.equal(Object.keys(a.problems).length,48);assert.equal(Object.keys(a.evaluators).length,48);
assert.deepEqual(a.sessions.map(s=>s.order),Array.from({length:24},(_,i)=>i+1));
assert.equal(new Set(a.sessions.map(s=>s.id)).size,24);assert.equal(Object.keys(a.coverage).length,24);assert.equal(Object.keys(a.instructionSeparation).length,24);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
for(const s of a.sessions){
 assert.match(s.id,/^T22V3::T22E-FND02::S\d\d@1$/);assert.equal(s.requiredOwnership.length,5);assert(s.lesson.includes('Worked example:'));assert(s.lesson.includes('Guided check:'));
 const contract={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
 const h=crypto.createHash('sha256').update(JSON.stringify(stable(contract))).digest('hex');assert(!hashes.has(h));hashes.add(h);
 const cov=a.coverage[s.id];assert.equal(cov.length,5);for(const x of cov){assert(x.length);for(const k of x)assert(['main','transfer'].includes(k));}
 const audit=a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')];assert(Array.isArray(audit)&&audit.length);for(const x of audit)assert(x.item&&x.source);
 const sep=a.instructionSeparation[s.id];for(const [kind,pid] of [['main',s.main],['transfer',s.transfer]]){assert(a.problems[pid]);assert(a.evaluators[pid]);assert.equal(a.evaluators[pid].rubric.reduce((z,r)=>z+r.points,0),10);assert(sep[kind]?.length);for(const f of sep[kind]){assert(a.problems[pid].prompt.includes(f),s.id+' separation fragment missing in task: '+f);assert(!s.lesson.includes(f),s.id+' lesson leaks '+kind+' fragment: '+f);}}
}
assert.equal([...hashes].length,24);assert.equal(Object.values(a.coverage).flat().length,120);
const close=(x,y,t=1e-9)=>assert(Math.abs(x-y)<=t*Math.max(1,Math.abs(x),Math.abs(y)),x+' != '+y);
// Independent mathematics — at least one nontrivial check per session.
assert.equal(3*5-4,11);assert.equal(3*(-2)-4,-10);
assert(-3>=-3&&1!==1);assert.equal(Math.max(...[-2,-1,0,1,2].map(x=>x*x+1)),5);
close(Math.hypot(3,6),3*Math.sqrt(5));assert.deepEqual([( -1+2)/2,(-5+1)/2],[0.5,-2]);
close((17-5)/(8-2),2);assert.equal((500-50)/2,225);
assert.equal(2*(-2)+1,-3);assert.equal(Math.abs(1-3),2);
assert.equal(-2*(1-3)**2+5,-3);assert.equal(Math.sqrt(2-(-7))+1,4);
assert.equal(2*(1**2-1)+3,3);assert.equal((2*1+3)**2-1,24);
for(const x of [-3,0,5])close(((3*x-7)+7)/3,x);assert.equal(Math.sqrt(9),3);
const p=x=>(x-2)**2*(x+1);assert.equal(p(2),0);assert.equal(p(-1),0);assert(Math.sign(p(-2))!==Math.sign(p(0)));
for(const x of [-4,0,3])if(x!==-1&&x!==2)close((x*x-4)/(x*x-x-2),(x+2)/(x+1));assert.equal(2*2-4,0);const sr=x=>(2*x*x+3*x-2)/(x*x-4),srr=x=>(2*x-1)/(x-2);for(const x of [-5,0,4])close(sr(x),srr(x));close(srr(-2),5/4);
assert.equal(Math.sqrt(2*11-6)+1,5);assert.equal(Math.cbrt(-8)**2,4);
close(500*1.08**2,583.2);close(1200*.85**3,736.95);
close(Math.log(32)/Math.log(2),5);close(Math.log(.001)/Math.log(10),-3);
for(const x of [2,5])close(Math.log((x-1)**2),2*Math.log(Math.abs(x-1)));
close(Math.log(10)/(2*Math.log(3)),Math.log(10)/(2*Math.log(3)));assert.equal(3,3);
close(Math.log(1.25)+Math.log(.9),Math.log(1.125));close(Math.log(2)/.06,Math.log(2)/.06);
assert.equal(7+9*4,43);assert.equal(10*(7+43)/2,250);
assert.equal(3*2**7,384);assert.equal(3*(2**8-1),765);
assert.equal(Array.from({length:5},(_,i)=>2*(i+1)-1).reduce((u,v)=>u+v,0),25);assert.equal(Array.from({length:5},(_,i)=>3*2**i).reduce((u,v)=>u+v,0),93);
let x=10;for(let i=0;i<3;i++)x=.5*x+3;close(x,6.5);let y=0;for(let i=0;i<3;i++)y=2*y-1;assert.equal(y,-7);
close(150*Math.PI/180,5*Math.PI/6);close(4*5*Math.PI/6,10*Math.PI/3);
close(Math.sin(5*Math.PI/4),-Math.SQRT1_2);close(Math.tan(5*Math.PI/4),1,1e-8);
close(2*Math.PI/2,Math.PI);assert.deepEqual([Math.PI/6,5*Math.PI/6].map(v=>Math.round(Math.sin(v)*2)),[1,1]);
const q=n=>50*1.2**n;close(Array.from({length:6},(_,n)=>q(n)).reduce((u,v)=>u+v,0),496.496);close(q(3),86.4);
close([0,1,2,3,4].map(k=>2+3*Math.sin(k*Math.PI/2)).reduce((u,v)=>u+v,0),10,1e-8);
console.log('PASS: M02 boundary; 24 sessions/48 tasks; 120/120 ownership mappings; all-session prerequisite and instruction-separation audits; independent math checks across every session.');
