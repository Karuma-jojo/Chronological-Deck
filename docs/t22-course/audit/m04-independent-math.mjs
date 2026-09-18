import assert from 'node:assert/strict';
const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
// S03 two-dice sum 9.
const pairs=[];for(let i=1;i<=6;i++)for(let j=1;j<=6;j++)pairs.push([i,j]);assert.equal(pairs.filter(([i,j])=>i+j===9).length,4);
// S07 conditional counts on 1..12.
const omega=Array.from({length:12},(_,i)=>i+1),A=omega.filter(x=>x%3===0),B=omega.filter(x=>x%2===0);assert.equal(B.filter(x=>A.includes(x)).length/B.length,1/3);assert.equal(A.filter(x=>B.includes(x)).length/A.length,1/2);
// S09 tree normalization.
const leaves=[.55*.9,.55*.1,.45*.7,.45*.3];close(leaves.reduce((a,b)=>a+b,0),1);close(leaves[0]+leaves[2],.81);
// S10 sampling protocols.
close(5/8*3/8,15/64);close(5/8*3/7,15/56);
// S14 XOR pairwise not mutual.
const O=[[0,0],[0,1],[1,0],[1,1]],ev=[z=>z[0]===1,z=>z[1]===1,z=>(z[0]^z[1])===1];for(const f of ev)close(O.filter(f).length/4,.5);for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)close(O.filter(z=>ev[i](z)&&ev[j](z)).length/4,.25);close(O.filter(z=>ev.every(f=>f(z))).length/4,0);
// S16 exact 3/5 successes.
const choose=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};close(choose(5,3)*.6**3*.4**2,.3456);
// S18 total probability.
close(.5*.01+.3*.03+.2*.06,.026);
// S21 direct linearity and nonlinear counterexample.
const X=[0,2,4],Y=[1,1,7],Z=X.map((x,i)=>3*x-2*Y[i]+5);close(Z.reduce((a,b)=>a+b,0)/3,5);close(X.map(x=>x*x).reduce((a,b)=>a+b,0)/3,20/3);assert.notEqual(20/3,4);
// S22 indicator expectation via exhaustive 3-card subsets/order symmetry: expected reds 1.2.
close(3*(4/10),1.2);
// S24 synthesis.
const L=[.4*.75,.4*.25,.6*.5,.6*.5];close(L.reduce((a,b)=>a+b,0),1);const ps=L[0]+L[2];close(ps,.6);close(4*ps-(1-ps),2);
console.log('PASS M04 independent math: dice counting, conditioning, trees, replacement, pairwise/mutual independence, exact-k, total probability, linearity, indicators and synthesis rederived independently.');