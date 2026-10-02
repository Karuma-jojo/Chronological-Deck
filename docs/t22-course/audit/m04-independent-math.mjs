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

// S19 leaf expectation.
close(8*.1+8*.2+1*.3-2*.4,1.9);

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

// S24 synthesis and transfer audit.
const ps=.35*.8+.65*.4; close(ps,.54); close(.35*.8,.28); close(5*ps-2*(1-ps),1.78);
const flag=.25*.8+.75*.2; close(flag,.35); close(6*flag,2.1);
assert.notEqual(.8,flag);

console.log('PASS M04 v2 independent math: nonuniform conditioning, tables/trees, replacement, independence hierarchy, sequence fallacies, exact-k/complement, weighted total probability, expectation/linearity/indicators and synthesis rederived.');
