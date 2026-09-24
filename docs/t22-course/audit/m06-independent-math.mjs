import assert from 'node:assert/strict';
const close=(x,y,e=1e-10)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
// S01
close(80/100,.8);close(80/260,4/13);
// S02
assert.equal(10000*.01,100);assert.equal(9900*.05,495);close(90/585,2/13);
// S03
assert.equal(5000*.02*.95,95);assert.equal(5000*.98*.04,196);close(95/291,95/291);
// S04
close(42/(42+94),21/68);
// S05
close(.08/(.08+.9*.05),.64);close(.08/(.08+.9*.20),4/13);
// S06
close(.7*.3/.4,.525);
// S07
close(.2*.8+.8*.1,.24);close(.16/.24,2/3);
// S08
close(.05*.9/(.05*.9+.95*.1),9/28);
// S09
const c=[.5*.1,.3*.4,.2*.5],z=c.reduce((a,b)=>a+b,0);close(z,.27);close(c.map(x=>x/z).reduce((a,b)=>a+b,0),1);
// S10
close(150/(150+90),.625);close(.075/(.075+.9*.05),.625);
// S11
close(.2/.42,10/21);close(.2/.26,10/13);
// S12
close(.3/.7,3/7);close(4/(1+4),.8);
// S13
close(.72/.24,3);close(.1/.5,.2);
// S14
close((.2/.8)*3,.75);close(.75/1.75,3/7);
// S15
assert.deepEqual([.8/.4,.3/.3,.1/.5],[2,1,.2]);
// S16
close((4/99)/(1+4/99),4/103);close(4/(1+4),.8);
// S17
close(.25*3,.75);close(.75/1.75,3/7);close(1.5/2.5,.6);
// S18
close(.5*.8,.4);close(.4*.25,.1);close(.4/.1,4);
// S19
close(.6*.5,.3);assert.notEqual(.2*.4,.12);
// S20
close((.6/.2)*(.5/.25),6);close((.5*6)/(1+.5*6),.75);
// S21
close(.5/.1,5);close(5*1,5);assert.notEqual(5*5,5);
// S22
close(.008/.206,4/103);close(.08/.26,4/13);close(.4/.5,.8);
// S23
close(.08/.125,.64);close(.08/.17,8/17);close(.08/.26,4/13);
// S24
close(.05*.48/(.05*.48+.95*.03),16/35);close((16/49)/(1+16/49),16/65);
console.log('PASS M06 independent math: base-rate tables, Bayes derivation/normalization, odds/LRs, sequential/conditional evidence, double-counting guards and sensitivity calculations rederived.');
