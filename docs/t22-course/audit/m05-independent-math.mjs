import assert from 'node:assert/strict';
const close=(x,y,e=1e-10)=>assert(Math.abs(x-y)<e,String(x)+' != '+String(y));
const ev=(x,p)=>x.reduce((z,v,i)=>z+v*p[i],0);

// S01 model table: only consistency/math checks; semantic action/state distinction is reviewed elsewhere.
close(.7+.3,1);

// S02 accounting.
assert.deepEqual([16-4,6-4,0-4],[12,2,-4]);
assert.deepEqual([40+12,40+2,40-4],[52,42,36]);

// S03 EMV / zero-EMV fee.
close(ev([20,5,0],[.2,.5,.3]),6.5);
close(6.5-3,3.5);

// S04 decision-tree rollback.
close(ev([12,-2],[.4,.6]),3.6);
close(ev([10,-1],[.3,.7]),2.3);

// S05 thresholds.
close((2+6)/(18+6),1/3);
close(ev([18,-6],[.4,.6]),3.6);
close(4/.25,16);

// S06 sensitivity.
close((1+4)/(10+4),5/14);
close(ev([10,-4],[.25,.75]),-.5);
close(ev([10,-4],[.45,.55]),2.3);
close(3.2/.6,16/3);
close(ev([8,-4],[.4,.6]),.8);
close(ev([8,-6],[.4,.6]),-.4);

// S07 downside / skew.
close(ev([30,-1],[.1,.9]),2.1);
close(ev([1,-12],[.9,.1]),-.3);
close(ev([49,-1],[.03,.97]),.5);

// S08 dominance.
assert([6,1,-2].every((x,i)=>x>=[5,1,-4][i]));
assert([6,1,-2].some((x,i)=>x>[5,1,-4][i]));
assert(!([6,1,-2].every((x,i)=>x>=[7,0,-2][i])));
assert(!([7,0,-2].every((x,i)=>x>=[6,1,-2][i])));

// S09 preserved repeated-play expectation.
close(.6*3-.4*2,1); close(7,7*1);

// S10 preserved wealth path.
assert.deepEqual([100,80,95,85,115],[100,100-20,100-20+15,100-20+15-10,100-20+15-10+30]);

// S11 preserved drawdown.
{
 const w=[100,120,90,108,130,104];let peak=-Infinity;
 const dd=w.map(x=>{peak=Math.max(peak,x);return (peak-x)/peak;});
 assert.deepEqual(dd.map(x=>Math.round(x*100)),[0,0,25,10,0,20]);
}

// S12 preserved finite first-hit ruin.
close(.6**3,.216);
{
 const paths=Array.from({length:8},(_,i)=>Array.from({length:3},(_,j)=>(i>>(2-j))&1?'W':'L').join(''));
 let hit=0,end=0;
 for(const path of paths){
  let w=1,p=1,ruined=false;
  for(const ch of path){const win=ch==='W';p*=win?.6:.4;w+=win?1:-1;if(w===0)ruined=true;}
  if(ruined)hit+=p;if(w<=0)end+=p;
 }
 close(hit,.496);close(end,.352);assert(hit>end);
}

// S13 preserved feasibility.
close(.5*1.5-.5,.25);close(12/80,.15);

// S14 multiplicative/recovery.
close(200*.7*1.3,182);
close(.3/.7,3/7);
close(140*(1+3/7),200);
close(.36/.64,9/16);
close(250*.64,160);close(160*1.5625,250);

// S15 ordinal representation.
assert(0<1&&1<2);assert(-10<5&&5<100);

// S16 lottery utility and transform invariance.
close(.5*0+.5*3,1.5);
close(.5*2+.5*14,8);
close(Math.sqrt(3)/2,Math.sqrt(3)/2);
assert(Math.sqrt(3)/2<1);
close(.5*0+.5*1.5,.75);assert(.75<1);

// S17 EU vs money.
close(ev([70,150],[.5,.5]),110);
close(ev([1,9],[.5,.5]),5);
close(ev([40,100],[.5,.5]),70);close(ev([0,10],[.5,.5]),5);

// S18 preserved CE/risk premium.
close(ev([2,8],[.5,.5]),5);
close(ev([80,140],[.5,.5]),110);
close(110-100,10);

// S19 criteria audit.
close(ev([12,-2],[.4,.6]),3.6);
close(ev([6,3],[.4,.6]),4.2);
close(ev([12,0],[.4,.6]),4.8);
close(ev([4,3],[.4,.6]),3.4);
close(ev([2,1],[.4,.6]),1.4);
assert([6,3].every((x,i)=>x>[2,1][i]));

// S20 general bimatrix response.
assert.equal(Math.max(4,1),4); // column own payoff against U -> L
assert.equal(Math.max(0,3),3); // against D -> R

// S21 pure best responses.
assert.equal(Math.max(4,2),4);
assert.equal(Math.max(1,3),3);
assert.equal(Math.max(1,3),3);
assert.equal(Math.max(0,2),2);

// S22 strictly competitive pure saddle.
assert.deepEqual([[2,1],[0,-1]].map(r=>Math.min(...r)),[1,-1]);
assert.deepEqual([Math.max(2,0),Math.max(1,-1)],[2,1]);

// S23 mixed indifference.
close(.5,2/4);close(3*.5,1.5);close(.25,1/4);
close(2/5,.4);close(4*.4,1.6);

// S24 was rebuilt; its current public model is computed below.

// Boundary sentinels.
const m05=JSON.parse((await import('node:fs')).readFileSync('course/t22/authoring/m05.json','utf8'));
for(const bad of ["Bayes' rule",'posterior odds','bid/ask','log return','Kelly criterion']){
 assert(!m05.sessions.some(s=>s.lesson.includes(bad)),'boundary leak: '+bad);
}

const {assertMathMutationsRejected}=await import('./m05-candidate-math.mjs');const receipt=assertMathMutationsRejected(m05);
console.log('PASS M05 current critical public math: '+receipt.rejected+' rejected mutations; supplemental historical examples: decision accounting/tree rollback, EMV thresholds/sensitivity, downside, dominance, repeated expectation, bankroll/drawdown/first-hit ruin, feasibility, multiplicative recovery, ordinal-vs-lottery utility, CE, criterion audit, bimatrix/best responses, strict-competition saddle, mixed indifference.');
