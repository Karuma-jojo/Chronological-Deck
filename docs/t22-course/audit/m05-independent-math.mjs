import assert from 'node:assert/strict';
const close=(x,y,e=1e-10)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
// S01
assert.deepEqual([15-4,5-4,0-4],[11,1,-4]);assert.deepEqual([40+11,40+1,40-4],[51,41,36]);
// S02
close(.2*9+.5*2-.3*5,1.3);
// S03
close(.1*20+.4*8+.5*2,6.2);close(6.2-7,-.8);
// S04
close(4/(12+4),.25);close(.35*12-.65*4,1.6);
// S05
close(6/.4,15);close(.4*18-6,1.2);
// S06
close(.15*15+.55-.3*4,1.6);close(.15+.55,.7);
// S07
close(.02*99-.98,1);
// S08
close(.5*4-.5*2,1);close(.2*11-.8,1.4);
// S09
close(.6*3-.4*2,1);close(7*1,7);
// S10
assert.deepEqual([100,80,95,85,115],[100,100-20,100-20+15,100-20+15-10,100-20+15-10+30]);
// S11
const w=[100,120,90,108,130,104];let peak=-Infinity;const dd=w.map(x=>{peak=Math.max(peak,x);return (peak-x)/peak});assert.deepEqual(dd.map(x=>Math.round(x*100)),[0,0,25,10,0,20]);
// S12
close(.6**3,.216);
// S13
close(.5*1.5-.5,.25);close(12/80,.15);
// S14
close(100*1.5*.5,75);close(100+50-50,100);
// S15
close(.25/(1-.25),1/3);close(75*(1+1/3),100);
// S16
close(.4*14-.6,5);
// S17
close(.5*1+.5*9,5);close(.5*70+.5*150,110);
// S18
close(.5*2+.5*8,5);close(.5*80+.5*140,110);close(110-100,10);
// S19
assert([6,1,-2].every((x,i)=>x>=[5,1,-4][i]));
// S20
assert.deepEqual([[4,-3],[1,1],[7,-8]].map(r=>Math.min(...r)),[-3,1,-8]);
// S21
assert.equal(Math.max(3,0),3);assert.equal(Math.max(-1,2),2);assert.equal(Math.min(3,-1),-1);assert.equal(Math.min(0,2),0);
// S22
close(.5,2/(3+1));close(3*.5,1.5);close(.25,1/4);
// S23
close(.3*10,3);close(2/(8+2),.2);close((60-48)/60,.2);
// S24
close(.4*30-.6*10,6);close(.4*10+.6*4,6.4);close((4+10)/40,.35);
console.log('PASS M05 independent math: payoff accounting, EV/fair price, thresholds, loss metrics, bankroll/drawdown/ruin, stake bounds, multiplicative recovery, utility, dominance, adversarial matrices and synthesis rederived.');
