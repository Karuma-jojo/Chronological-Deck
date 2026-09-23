import assert from 'node:assert/strict';
const near=(a,b)=>{if(Array.isArray(a)){assert.equal(a.length,b.length);a.forEach((x,i)=>near(x,b[i]));}else assert(Math.abs(a-b)<1e-10,`${a} != ${b}`);};
const ev=(x,p)=>x.reduce((z,v,i)=>z+v*p[i],0),bayes=(p,h,f)=>p*h/(p*h+(1-p)*f),update=(p,lr)=>p*lr/(1-p+p*lr);
const wealth=(w,x)=>x.reduce((a,v)=>[...a,a.at(-1)+v],[w]);
// M05 transfer numeric references S01–S24, independently recomputed from each public model.
near([18-5,7-5,2-5],[13,2,-3]);near([60+13,60+2,60-3],[73,62,57]);
near(ev([7,1,-4],[.25,.35,.4]),.5);
near([ev([9,3,0],[.3,.5,.2]),ev([9,3,0],[.3,.5,.2])-5],[4.2,-.8]);
near([2/(5+2),ev([5,-2],[.4,.6])],[2/7,.8]);
near([4/.25,.25*20-4,.25*20-5],[16,1,0]);
near([ev([20,-1],[.1,.9]),.9],[1.1,.9]);near(ev([14,-1],[.1,.9]),.5);
near([ev([6,-1],[.3,.7]),ev([2,-3],[.7,.3])],[1.1,.5]);
near([1.5,-.5,2,0].reduce((a,b)=>a+b),3);near(wealth(75,[5,10,-25,8]),[75,80,90,65,73]);
let peak=0;near([200,240,216,252,189].map(w=>{peak=Math.max(peak,w);return(peak-w)/peak;}),[0,0,.1,0,.25]);
// Two independent enumerations: eight potential paths versus disjoint first-hit prefixes.
const paths=Array.from({length:8},(_,i)=>Array.from({length:3},(_,j)=>(i>>(2-j))&1?'W':'L').join(''));
let firstPassage=0,endpointOnly=0;const prefixes=new Set();
for(const path of paths){let w=1,hit=false,p=1;for(let i=0;i<3;i++){const win=path[i]==='W';p*=win?.6:.4;w+=win?1:-1;if(!hit&&w===0){hit=true;prefixes.add(path.slice(0,i+1));}}if(hit)firstPassage+=p;if(w<=0)endpointOnly+=p;}
assert.deepEqual([...prefixes].sort(),['L','WLL']);near(firstPassage,.496);near(.4+.6*.4*.4,.496);near(endpointOnly,.352);assert(firstPassage>endpointOnly);near(wealth(1,[-1,1,1]),[1,0,1,2]);
near([150*.1,15/150],[15,.1]);near(100*1.25*.8,100);near([.2/.8,200*.8*1.25],[.25,200]);
near(ev([8,0],[.25,.75]),2);near([ev([0,10],[.5,.5]),ev([40,100],[.5,.5])],[5,70]);
near([ev([4,8],[.25,.75]),ev([100,140],[.25,.75]),130-120],[7,130,10]);
assert([2,4,1].every((x,i)=>x>=[2,3,1][i]));assert([2,4,1].some((x,i)=>x>[2,3,1][i]));
near([[2,-1,3],[0,0,0],[5,-4,6]].map(r=>Math.min(...r)),[-1,0,-4]);
const saddle=[[2,1],[0,-1]];assert(saddle[0][1]===Math.max(saddle[0][1],saddle[1][1])&&saddle[0][1]===Math.min(...saddle[0]));
near([(2+1)/(3+3),3*.5-1],[.5,.5]);near([12*.25,5/(5+5),9,(100-85)/100],[3,.5,9,.15]);
near([ev([16,-8],[.5,.5]),ev([9,2],[.5,.5]),(3+8)/(16+8)],[4,5.5,11/24]);
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
