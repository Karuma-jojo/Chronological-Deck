import fs from 'node:fs';
import {validateCandidateMathOracles,runCandidateMathMutationProbes} from './m04-candidate-math-oracle.mjs';
import assert from 'node:assert/strict';
const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);

// S03 atomic multiplicities.
const coin=['HH','HT','TH','TT'];
assert.deepEqual([0,1,2].map(k=>coin.filter(s=>[...s].filter(x=>x==='H').length===k).length),[1,2,1]);

// S05 region-ledger disjoint addition.
close(7/30+5/30,12/30);

// S06 reverse inclusion-exclusion.
assert.equal(45+35-60,20);
assert.equal(80-60,20);

// S07 nonuniform conditioning and table direction.
close(.05+.15+.20+.25+.35,1);
close((.20+.35)/(.20+.25+.35),11/16);
close((.20+.35)/(.05+.20+.35),11/12);
close(18/24,3/4); close(18/30,3/5);

// S08 multiplication-rule repair.
close(.30*.70,.21); close(.21/.40,.525);

// S09 malformed-tree repair.
const leaves=[.4*.1,.4*.9,.6*.25,.6*.75];
close(leaves.reduce((a,b)=>a+b,0),1);
close(leaves[0]+leaves[2],.19);

// S10 replacement protocol.
close(.4*.4,.16); close(.4*(3/9),2/15);

// S11 complemented-event independence on one die.
const die=[1,2,3,4,5,6],even=die.filter(x=>x%2===0),mult3=die.filter(x=>x%3===0),notMult3=die.filter(x=>x%3!==0);
close(even.length/6*mult3.length/6,die.filter(x=>x%2===0&&x%3===0).length/6);
close(even.length/6*notMult3.length/6,die.filter(x=>x%2===0&&x%3!==0).length/6);

// S12 without-replacement dependence.
close((4/6)*(3/5)+(2/6)*(4/5),2/3);
close(3/5,.6); assert.notEqual(3/5,2/3);

// S14 XOR pairwise not mutual.
const O=[[0,0],[0,1],[1,0],[1,1]],ev=[z=>z[0]===1,z=>z[1]===1,z=>(z[0]^z[1])===1];
for(const g of ev)close(O.filter(g).length/4,.5);
for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)close(O.filter(z=>ev[i](z)&&ev[j](z)).length/4,.25);
close(O.filter(z=>ev.every(g=>g(z))).length/4,0);

// S15 exact paths and unchanged next-trial probability.
close(.8**3*.2,.1024); close(.3**3*.7**2,.01323); close(.8,.8);

// S16 one-failure family.
close(6*.2*.8**5,.393216);

// S17 complements.
close(1-.75**4,.68359375); close(1-.6**5,.92224); close(.4**5,.01024);

// S18 weighted total probability.
close(.5*.01+.3*.03+.2*.06,.026);
close(.2*.4+.5*.1+.3*.25,.205);
assert.notEqual((.4+.1+.25)/3,.205);

// S19 leaf expectation after ownership-boundary repair.
close(8*.1+4*.2+1*.3-2*.4,1.1);

// S20 unequal multiplicity discriminator.
close((1+1+1+1+3+7+9+9)/8,4);
close((1+3+7+9)/4,5);
assert.notEqual(4,5);

// S21 linearity/nonlinear guard.
const X=[0,2,4],Y=[1,1,7],Z=X.map((x,i)=>3*x-2*Y[i]+5);
close(Z.reduce((a,b)=>a+b,0)/3,5);
close(X.map(x=>x*x).reduce((a,b)=>a+b,0)/3,20/3);
assert.notEqual(20/3,4);

// S22 positional marginal without replacement by exhaustive ordered 3-samples.
const cards=Array.from({length:10},(_,i)=>({id:i,red:i<4}));
const samples=[];
for(const x of cards)for(const y of cards)if(y.id!==x.id)for(const z of cards)if(z.id!==x.id&&z.id!==y.id)samples.push([x,y,z]);
assert.equal(samples.length,10*9*8);
for(let pos=0;pos<3;pos++)close(samples.filter(s=>s[pos].red).length/samples.length,4/10);
close(3*(4/10),1.2);

// S23 equal expectation does not collapse outcomes.
close(-5*.2+5*.8,3); close(3,3);

// S24 repaired fresh synthesis and transfer audit.
const ps=.4*.7+.6*.5; close(ps,.58); close(.4*.7,.28); close(4*ps-3*(1-ps),1.06);assert.notEqual(.7,ps);
const flag=.25*.8+.75*.2; close(flag,.35); close(6*flag,2.1);close((.25*.8)/flag,4/7);
assert.notEqual(.8,flag);

// v2.2 S19 weighted-mean range/units numerical core.
const s19mean=-3*.2+1*.5+7*.3;close(s19mean,2);assert(s19mean>=-3&&s19mean<=7);

// v2.2 S25 finite bounds and incomplete joint information.
const lo=Math.max(0,.6+.5-1),hi=Math.min(.6,.5);close(lo,.1);close(hi,.5);
close(.6+.5-hi,.6);close(.6+.5-lo,1);
const nestedUnion=.30,disjointUnion=.15+.20+.30;close(nestedUnion,.30);close(disjointUnion,.65);
assert(nestedUnion<=disjointUnion);

// v2.2 S26 full-history path audit.
const hist=[
 .4*.5*.2,.4*.5*.8,
 .4*.5*.7,.4*.5*.3,
 .6*.25*.8,.6*.25*.2,
 .6*.75*.4,.6*.75*.6
];
close(hist.reduce((a,b)=>a+b,0),1);
close(hist[0]+hist[2]+hist[4]+hist[6],.48);
const exactlyOne=.2*.5*.2+.8*.5*.2+.8*.5*.8;close(exactlyOne,.42);
close(3*.5*.5**2,.375);assert.notEqual(exactlyOne,.375);

// v2.2 S27 observation/reporting mechanisms.
close((1/4)/(3/4),1/3);
close((2/8)/(4/8),1/2);
const observed=.10+.20*.75+.30*.25;close(observed,.325);
close(.10/observed,4/13);close(.10/.60,1/6);assert.notEqual(4/13,1/6);

// v2.2 S28 bounded stopped experiments.
const stopped=[.5,.25,.125,.125];close(stopped.reduce((a,b)=>a+b,0),1);close(stopped.slice(0,3).reduce((a,b)=>a+b,0),7/8);
const contest=[.36,.16,.144,.096,.144,.096];close(contest.reduce((a,b)=>a+b,0),1);close(contest[0]+contest[2]+contest[4],.648);
close(.216+.144,.36);close(.096+.064,.16);

// v2.2 S24 expanded-route exit interval.
const unionLo=1.1-.5,unionHi=1.1-.1;close(unionLo,.6);close(unionHi,1);
close(6*unionLo-1,2.6);close(6*unionHi-1,5);close(6*.8-1,3.8);

const candidate=JSON.parse(fs.readFileSync('course/t22/authoring/m04.json','utf8'));
validateCandidateMathOracles(candidate);
runCandidateMathMutationProbes(candidate);
console.log('PASS M04 v2.2-r2 independent math: numeric constructions rederived and candidate-bound wrong-reference/wrong-rubric/wrong-input mutations rejected.');
