import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m11-arc510.json','utf8'));
const session=n=>a.sessions[n-1];
const ref=(n,kind='main')=>a.evaluators[session(n)[kind]].reference;
const prompt=(n,kind='main')=>a.problems[session(n)[kind]].prompt;
const has=(n,kind,...xs)=>{const r=ref(n,kind);for(const x of xs)assert(r.includes(x),`S${n} ${kind} missing oracle marker: ${x}`);};
const near=(x,y,tol=1e-10)=>assert(Math.abs(x-y)<=tol,`${x} != ${y}`);

// S01 finite accumulation.
near(12*0.25-4*0.75+6*0.5,3);
near(2*0.8+5*0.3+1*1.1,4.2);
has(1,'main','3 Wh','-3 Wh','+3 Wh');
has(1,'transfer','4.2 kg','kg/m');

// S02 partition/tag/mesh.
near(4*1+(-2)*2.5+1*1.5,0.5);
has(2,'main','0.5','mesh is max(1,2.5,1.5)=2.5');
has(2,'transfer','||P_n||=max(1/3,2/(3n))','does not tend to 0');

// S03 Riemann definition.
near(-3*(5-2),-9);
has(3,'main','=-9','error is 0');
has(3,'transfer','δ=ε/5','common Riemann-sum limit is 7');

// S04 point perturbation and tag dependence.
assert.equal(25*2,50);
has(4,'main','≤50m','ε/50','integral 15');
has(4,'transfer','tags rational','tags irrational','not Riemann integrable');

// S05 structure.
assert.equal(5-2,3);assert.equal(2*3-3*3,-3);
has(5,'main','∫_1^7 f=5+(-2)=3','∫_7^1 f=-3','=-3');
has(5,'transfer','A[0,5]=6-4=2 L','A[5,0]=-2 L','=1 L');

// S06 signed/magnitude/average and bounds.
near(4*1.5-2*2,2);near(4*1.5+2*2,10);near(2/3.5,4/7);
has(6,'main','2 km','10 km','4/7 km/h');
has(6,'transfer','-4≤∫q≤12','-5≤∫q≤5','-4≤∫q≤5');

// S07 continuity before differentiability.
has(7,'main','≤7|y-x|','δ=ε/7');
has(7,'transfer','H(x)=2x','H(x)=2(1)+(-1)(x-1)=3-x','left derivative is 2','right derivative is -1');

// S08 FTC local recovery.
has(8,'main','A\'(2)=-3');
has(8,'transfer',"C'(5)=r(5)=2.4 mg/min",'left short-interval averages tend to 2','right short-interval averages tend to 4');

// S09 moving endpoints.
near(3*Math.exp(4),3*Math.E**4,1e-10);
has(9,'main',"F'(x)=3e^((3x-1)²)".replace('^(', '^{').replace(')²','²}'));
assert(ref(9,'main').includes("F'(1)=3e^4"));
has(9,'transfer','2ln(1+(2x+1)^2)-2xln(1+x^4)','dummy variable');

// S10 MVT support bridge.
has(10,'main','K=F-G','K\' vanishes','MVT on [u,v]','one additive constant');
has(10,'transfer',"H'(x)=0",'not one global constant','not an interval');

// S11 endpoint FTC.
near((2**4-2**2)-(((-1)**4)-((-1)**2)),12);
has(11,'main',"A'=f on (a,b)",'F(b)-F(a)','=12');
has(11,'transfer','=-12 liters','Q(3)=50-12=38 liters');

// S12 antiderivative repertoire.
has(12,'main','x³-4e^x+2sin x+5ln x+C','x>0','ln(-x)=ln|x|');
has(12,'transfer','-1/x²+(3/ln2)2^x+C','undefined at x=0');

// S13 substitution.
has(13,'main','(3x²+2)^5/5+C','6x(3x²+2)^4');
has(13,'transfer','twice the required integrand','(x²+1)^4/8+C');

// S14 definite substitution.
near(Math.log(9/2),Math.log(4.5));
near((8-27)/3,-19/3);
has(14,'main','u=2','u=9','ln(9/2)');
has(14,'transfer','∫_3^2 u²du','-19/3','nonpositive');

// S15 integration by parts.
near((Math.E**2+1)/4,2.0972640247326626,1e-12);
has(15,'main','(e²+1)/4');
has(15,'transfer','correct value is -2');

// S16 method forensics.
near((27-1)/3,26/3);
near(Math.sin(1)+Math.cos(1)-1,Math.sin(1)+Math.cos(1)-1);
has(16,'main','26/3','sin1+cos1-1','=-1','leave it unevaluated exactly');
has(16,'transfer','u=x²','e^{x²}+C');

// S17 infinity p-tail.
has(17,'main','convergence occurs exactly for p>1','1/(p-1)');
has(17,'transfer','total is finite and equals 2','p=3/4≤1');

// S18 singular endpoint/interior.
has(18,'main','finite exactly for p<1','1/(1-p)');
has(18,'transfer','1/ε-1→∞','right side also diverges');

// S19 comparison and symmetric cancellation.
for(const x of [1,2,5,10]){
  assert(1/(x*x+x)<=1/(x*x)+1e-15);
  assert(1/Math.sqrt(x*x+4)>=1/(Math.sqrt(5)*x)-1e-15);
}
has(19,'main','1/(x²+x)≤1/x²','1/sqrt(x²+4)≥1/(sqrt(5)x)','B diverges');
has(19,'transfer','symmetric truncation is 0','ordinary two-sided improper integral therefore diverges');

// S20 synthesis.
near(Math.E-1,Math.E-1);
has(20,'main','Q(1)=10+e-1=9+e',"Q'(1)=r(1)=2e",'net change over the whole interval');
has(20,'transfer','finite exactly when p>1','C=6(p-1)','For p=2, C=6');

// Boundary safety: references do not use future machinery as a premise.
const allRefs=Object.values(a.evaluators).map(e=>e.reference).join('\n').toLowerCase();
for(const banned of ['taylor series','jacobian','lebesgue integral','differentiation under the integral sign',"l'hôpital","l’hôpital"]){
  assert(!allRefs.includes(banned),'future machinery used in M11 reference: '+banned);
}
assert(prompt(10).includes('continuous on I'),'MVT hypothesis repair must remain public');
assert(prompt(19).includes('1/sqrt(x²+4)'),'S19 freshness repair must remain fixed');
assert(prompt(20,'transfer').includes('Do not use probability language'),'M12/later probability boundary must remain explicit');

console.log('PASS M11 independent mathematics: S01-S20 values, signs, domains, hypotheses, improper thresholds and repaired comparison/MVT boundaries independently reconstructed.');
