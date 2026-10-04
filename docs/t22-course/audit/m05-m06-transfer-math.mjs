import assert from 'node:assert/strict';
const near=(a,b)=>{if(Array.isArray(a)){assert.equal(a.length,b.length);a.forEach((x,i)=>near(x,b[i]));}else assert(Math.abs(a-b)<1e-10,String(a)+' != '+String(b));};
const ev=(x,p)=>x.reduce((z,v,i)=>z+v*p[i],0),bayes=(p,h,f)=>p*h/(p*h+(1-p)*f),update=(p,lr)=>p*lr/(1-p+p*lr);
const wealth=(w,x)=>x.reduce((a,v)=>[...a,a.at(-1)+v],[w]);

// M05 v2 Transfer numeric/logic references S01–S24.
near(.25+.75,1); // S01
near([20-5,9-5,2-5],[15,4,-3]);near([60+15,60+4,60-3],[75,64,57]); // S02
near([ev([9,3,0],[.3,.5,.2]),ev([9,3,0],[.3,.5,.2])-5],[4.2,-.8]); // S03
near(ev([10,-1],[.3,.7]),2.3); // S04
near([4/.25,.25*20-4],[16,1]); // S05
near([3.2/.6,ev([8,-4],[.4,.6]),ev([8,-6],[.4,.6])],[16/3,.8,-.4]); // S06
near(ev([49,-1],[.03,.97]),.5); // S07
assert([4,2,1].every((x,i)=>x>=[3,2,0][i]));assert([4,2,1].some((x,i)=>x>[3,2,0][i])); // S08
near([1.5,-.5,2,0].reduce((a,b)=>a+b),3); // S09 preserved
near(wealth(75,[5,10,-25,8]),[75,80,90,65,73]); // S10 preserved
let peak=0;near([200,240,216,252,189].map(w=>{peak=Math.max(peak,w);return(peak-w)/peak;}),[0,0,.1,0,.25]); // S11 preserved
const paths=Array.from({length:8},(_,i)=>Array.from({length:3},(_,j)=>(i>>(2-j))&1?'W':'L').join(''));
let firstPassage=0,endpointOnly=0;const prefixes=new Set();
for(const path of paths){let w=1,hit=false,p=1;for(let i=0;i<3;i++){const win=path[i]==='W';p*=win?.6:.4;w+=win?1:-1;if(!hit&&w===0){hit=true;prefixes.add(path.slice(0,i+1));}}if(hit)firstPassage+=p;if(w<=0)endpointOnly+=p;}
assert.deepEqual([...prefixes].sort(),['L','WLL']);near(firstPassage,.496);near(endpointOnly,.352);assert(firstPassage>endpointOnly); // S12 preserved
near([150*.1,15/150],[15,.1]); // S13 preserved
near([.36/.64,250*.64,160*1.5625],[9/16,160,250]); // S14
assert(0<1&&1<20); // S15 ordinal representation exemplar
near(.5*0+.5*1.5,.75);assert(.75<1); // S16 constructive non-affine relabel
near([ev([40,100],[.5,.5]),ev([0,10],[.5,.5])],[70,5]); // S17
near([ev([4,8],[.25,.75]),ev([100,140],[.25,.75]),130-120],[7,130,10]); // S18 preserved
near([ev([10,-2],[.25,.75]),ev([4,2],[.25,.75]),ev([3,1],[.25,.75])],[1,2.5,1.5]);
near([ev([9,0],[.25,.75]),ev([4,2],[.25,.75]),ev([3,1],[.25,.75])],[2.25,2.5,1.5]); // S19
assert(4>0&&3>1); // S20: column chooses R against U, L against D from second components in transfer
// S21 transfer: row BR U to L, D to R; column BR L to U, R to D.
assert(3>1&&2>0&&2>0&&3>1);
// S22 transfer: against U column own payoff4>1, contrary to minimizing row payoff which would choose R.
assert(4>1&&0<3);
// S23
near([2/5,4*(2/5)],[.4,1.6]);
// S24 strategic transfer: row U to L, D to R; column R to both rows.
assert(4>2&&3>1&&3>1&&2>0);

// M06 transfer numeric references S01–S24.
near([35/50,35/(35+45)],[.7,.4375]);near([20000*.02*.75,20000*.98*.02,bayes(.02,.75,.02)],[300,392,75/173]);
near([10000*.03*.8,10000*.97*.01,bayes(.03,.8,.01)],[240,97,240/337]);near(30/(30+70),.3);
near([bayes(.1,.9,.1),bayes(.5,.9,.1)],[.5,.9]);near(.2*.9/.3,.6);
near([.4*.7+.6*.2,bayes(.4,.7,.2)],[.4,.7]);near(bayes(.2,.75,.25),3/7);
const c=[.2*.6,.5*.2,.3*.4],z=c.reduce((a,b)=>a+b);near(z,.34);near(c.map(x=>x/z),[6/17,5/17,6/17]);
near([100/180,bayes(.2,.5,.1)],[5/9,5/9]);near([.12/(.12+.08+.2),.12/(.12+.08)],[.3,.6]);
near([.75/.25,.25/1.25],[3,.2]);near(.35/.7,.5);near(update(.5,.25),.2);
assert(5>1&&.25<1);near([update(.1,3),update(.4,3)],[.25,2/3]);near([1.5/2.5,.75/1.75],[.6,3/7]);
near([.6*.5,.3*.4,(.6*.5)/(.3*.4)],[.3,.12,2.5]);near([.5*.4,.25*.2],[.2,.05]);
near([(.8/.4)*(.3/.1),update(.2,6)],[6,.6]);near([3*1,3*3,1/1],[3,9,1]);
near([bayes(.2,.9,.3),bayes(.6,.9,.3)],[3/7,9/11]);near([bayes(.2,.75,.05),bayes(.2,.75,.25)],[15/19,3/7]);
near([(.7/.2)*(.4/.1),bayes(.1,.7*.4,.2*.1),update(.05,14)],[14,14/23,14/33]);
// Repaired instructional examples, not fixed-task answer fixtures.
near([.5*1+.5*7,.5*50+.5*130,90-80],[4,90,10]);near([bayes(.2,.6,.1),bayes(.2,.6,.3)],[.6,1/3]);
near([210/350,bayes(.3,.7,.2)],[.6,.6]);near([.7*.6,.2*.3,.42/.06],[.42,.06,7]);
near([.7*.4,.3*.2],[.28,.06]);near([.7/.35,.6/.2,.42/.07],[2,3,6]);near([update(.25,3),update(.75,3)],[.5,.9]);
near([bayes(.3,.7,.1),bayes(.3,.7,.4)],[.75,3/7]);near([bayes(.2,.9*.4,.3*.2),update(.1,6)],[.6,.4]);
console.log('PASS all48 Transfer numeric references, finite first-hit versus endpoint enumeration, repaired worked examples; existing separate scripts cover Main calculations. Symbolic/interpretive correctness additionally requires the manual review.');
