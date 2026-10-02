import assert from 'node:assert/strict';
const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);

// S03 two-dice sum 9.
const pairs=[];for(let i=1;i<=6;i++)for(let j=1;j<=6;j++)pairs.push([i,j]);
assert.equal(pairs.filter(([i,j])=>i+j===9).length,4);

// S05 repaired Transfer: disjoint addition on 1..12.
const u12=Array.from({length:12},(_,i)=>i+1);
const C=u12.filter(x=>x%3===0),D=u12.filter(x=>x===10||x===11);
assert.equal(C.filter(x=>D.includes(x)).length,0);
close(C.length/12+D.length/12,6/12);

// S07 conditional counts on 1..12 plus v1.3 nonuniform restricted-mass instruction.
const A=u12.filter(x=>x%3===0),B=u12.filter(x=>x%2===0);
assert.equal(B.filter(x=>A.includes(x)).length/B.length,1/3);
assert.equal(A.filter(x=>B.includes(x)).length/A.length,1/2);
close(.70/.90,7/9);close(.70/.70,1);

// S09 tree normalization.
const leaves=[.55*.9,.55*.1,.45*.7,.45*.3];
close(leaves.reduce((a,b)=>a+b,0),1);close(leaves[0]+leaves[2],.81);

// S10 sampling protocols.
close(5/8*3/8,15/64);close(5/8*3/7,15/56);

// S11 complement-independence consequence on one die.
const die=[1,2,3,4,5,6],even=die.filter(x=>x%2===0),mult3=die.filter(x=>x%3===0),notMult3=die.filter(x=>x%3!==0);
close(even.length/6*mult3.length/6,die.filter(x=>x%2===0&&x%3===0).length/6);
close(even.length/6*notMult3.length/6,die.filter(x=>x%2===0&&x%3!==0).length/6);

// S13 positive-probability disjoint events are dependent.
close(0,0);assert.notEqual(0,(1/3)*(1/3));close(0/(1/3),0);assert.notEqual(0,1/3);

// S14 XOR pairwise not mutual.
const O=[[0,0],[0,1],[1,0],[1,1]],ev=[z=>z[0]===1,z=>z[1]===1,z=>(z[0]^z[1])===1];
for(const f of ev)close(O.filter(f).length/4,.5);
for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)close(O.filter(z=>ev[i](z)&&ev[j](z)).length/4,.25);
close(O.filter(z=>ev.every(f=>f(z))).length/4,0);

// S15 exact paths with the same success/failure counts have equal probability under constant-p independence.
close(.6*.4*.6,.4*.6*.6);close(.7*.7*.3*.3,.7*.3*.7*.3);

// S16 exact 3/5 successes.
const choose=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};
close(choose(5,3)*.6**3*.4**2,.3456);

// S18 total probability plus v1.3 unequal-branch weighting contrast.
close(.5*.01+.3*.03+.2*.06,.026);
close(.7*.02+.3*.05,.029);assert.notEqual((.02+.05)/2,.029);

// S21 direct linearity and nonlinear counterexample.
const X=[0,2,4],Y=[1,1,7],Z=X.map((x,i)=>3*x-2*Y[i]+5);
close(Z.reduce((a,b)=>a+b,0)/3,5);
close(X.map(x=>x*x).reduce((a,b)=>a+b,0)/3,20/3);
assert.notEqual(20/3,4);

// S22 positional marginal without replacement, derived by exhaustive ordered 3-samples.
const cards=Array.from({length:10},(_,i)=>({id:i,red:i<4}));
const samples=[];
for(const x of cards)for(const y of cards)if(y.id!==x.id)for(const z of cards)if(z.id!==x.id&&z.id!==y.id)samples.push([x,y,z]);
assert.equal(samples.length,10*9*8);
for(let pos=0;pos<3;pos++)close(samples.filter(s=>s[pos].red).length/samples.length,4/10);
close(3*(4/10),1.2);

// S24 v1.3 synthesis Main and count-surface Transfer.
const L=[.2*.8,.2*.2,.5*.4,.5*.6,.3*.6,.3*.4];
close(L.reduce((a,b)=>a+b,0),1);
const ps=L[0]+L[2]+L[4];close(ps,.54);close(5*ps-2*(1-ps),1.78);assert.notEqual(.8,ps);
const countLeaves=[.10,.40,.15,.15,.02,.18];close(countLeaves.reduce((a,b)=>a+b,0),1);const pf=countLeaves[0]+countLeaves[2]+countLeaves[4];close(pf,.27);close(4*pf-(1-pf),.35);assert.notEqual(.20,pf);

console.log('PASS M04 independent math v1.3 source modernization: conditional denominators, disjoint/dependent contrast, exact-path equality, weighted total probability, historical Astra repairs, linearity/indicators and versioned synthesis math rederived independently.');
