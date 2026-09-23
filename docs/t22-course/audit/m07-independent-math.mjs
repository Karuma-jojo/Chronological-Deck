import assert from 'node:assert/strict';
const near=(a,b,t=1e-10)=>assert(Math.abs(a-b)<=t,`${a} != ${b}`);

// Independent M07 arithmetic / counterexample checks.
near(-5*42+5*1.2+5*45,21);
assert.equal(-2+7,5);
near((81-75)/75,.08);
near(92/80,1.15); near(400*(92/80),460);
near(1.25*.8-1,0); near(.25-.20,.05); assert.notEqual(1.25*.8-1,.25-.20);
near(1.10*1.20*.75-1,-.01);
near(Math.log(100/80)+Math.log(90/100),Math.log(90/80));
near(Math.exp(Math.log(.8))-1,-.2);
near((39-40+3)/40,.05); near((39-40)/40,-.025);
near(30*(28-25),90);
near(40*(30-27),120); near((-40)*(27-30),120);
near(50*(21.4-20),70); near((21.4-20)/20,.07);
near(8*(18-15)+12*(16-15),36);
near(49.10-48.90,.20); near((49.10+48.90)/2,49);
near(40*(75.20-75.50),-12);
near(10*101.40,1014); near(10*(101.40-101),4);
assert(20.20>20.10); assert(20.08<=20.10);
assert.deepEqual([30,50,50],[30,30+20,100-(30+20)]);
near((30*10+20*10.2+50*10.1)/100,10.09);
near((10*20+20*23)/30,22); near(12*(25-22),36);
near(25*(42-40)-4,46);
near(25*(49.80-50.20)-3,-13);
assert.deepEqual([-12+5,-12+5+10],[-7,3]);
near(5000-20*30-2,4398); near(4398+20*31,5018); near(20*(31-30)-2,18);
near((30*74.90+20*75)/50,74.94); near(50*(75.50-74.94),28); near((50*75.40-2)-(30*74.90+20*75+2),19);
near((5*40+15*40.10)/20,40.075); near((20*40.50-1)-(5*40+15*40.10+1),6.5);

// Shortcut attacks.
assert.notEqual(.25+(-.20),1.25*.8-1,'Adding simple returns must fail in the M07-S05 discriminator');
assert(75.20<75.50,'Frozen quote must force immediate buy ask > sell bid');
assert(20.20>20.10,'Buy limit20.10 must not cross ask20.20');
assert.notEqual((10+10.2+10.1)/3,(30*10+20*10.2+50*10.1)/100,'Unweighted fill-price mean must fail');
console.log('PASS M07 independent math: returns/logs, long-short signs, bid-ask execution, limit constraint, partial-fill weighting, average-cost accounting, fees, ledger reconciliation and integrated audit independently recomputed.');
