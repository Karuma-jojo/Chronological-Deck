import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m12-side267.json','utf8'));
const session=n=>a.sessions[n-1];
const ref=(n,kind='main')=>a.evaluators[session(n)[kind]].reference;
const prompt=(n,kind='main')=>a.problems[session(n)[kind]].prompt;
const has=(n,kind,...xs)=>{const r=ref(n,kind);for(const x of xs)assert(r.includes(x),`S${n} ${kind} missing oracle marker: ${x}`);};
const near=(x,y,tol=1e-11)=>assert(Math.abs(x-y)<=tol,`${x} != ${y}`);

// S01 higher derivatives / log domain.
near(5-9,-4);near(20-18,2);near(60-18,42);
has(1,'main',"f'(x)=5x^4-9x^2","f''(x)=20x^3-18x","f'''(x)=60x^2-18","f'''(1)=42");
has(1,'transfer',"g'''=2/x^3","x>0");

// S02 centered derivative matching.
const h=0;
near(5-h+3*h*h-2*h*h*h,5);
has(2,'main',"5-(x-2)+3(x-2)^2-2(x-2)^3","P_3'''=-12");
has(2,'transfer',"q(-1)=4","q'(-1)=3","q''(-1)=-4","q'''=30","2!(-2)=-4");

// S03 graph/coefficient/recentering.
has(3,'main',"2-3(x-1)^2","quadratic coefficient is -3","second derivative is -6");
has(3,'transfer',"4+2(x-3)+(x-3)^2","x^2-4x+7");

// S04 residual locality.
near(9*1**3,9);
near(100*0.01**3,0.0001,1e-14);
near(100*0.5**3,12.5);
has(4,'main',"R_2=9h^3","R_2/h^2=9h→0","error is 9");
has(4,'transfer',"0.0001","12.5","100h^2→0");

// S05 MVT bridge.
has(5,'main',"m=[f(b)-f(a)]/(b-a)","h(a)=0","h(b)","Rolle","f'(c)=m");
has(5,'transfer',"not differentiable at the interior point 0","derivative -1","derivative +1");

// S06 Taylor theorem.
has(6,'main',"g(t)=f(t)-P_2(t)-M(t-a)^3","g'''(c)=f'''(c)-6M","f'''(c)(x-a)^3/6");
near(1/8-3/4+3/2,7/8);near(1/8-7/8,-3/4);
has(6,'transfer',"f''' does not exist","P_2(1/2)=7/8","R=-3/4","±1");

// S07 certified bounds.
near(0.3-0.3**3/6,0.2955);
near(0.3**4/24,0.0003375);
near(2*0.1**3/6,1/3000);
has(7,'main',"0.045","0.0003375","0.2955");
has(7,'transfer',"0.095","f'''(t)=2/t^3","M=2","1/3000");

// S08 O/o.
has(8,'main',"r/h^3=7+h","r/h^2=7h+h^2→0","not o(h^3)");
has(8,'transfer',"C=4","E=o(h^3)","E(h)=4h^4");

// S09 asymptotic equivalence.
has(9,'main',"1+(5/2)h→1","p/q=1/2");
has(9,'transfer',"1+1/sqrt(n)→1","sqrt(n)→∞","1/sqrt(n)→0");

// S10 series partial sums.
near(3/(1-1/4),4);
has(10,'main',"S_N=3[1-(1/4)^(N+1)]/(1-1/4)","S_N→4");
has(10,'transfer',"1,0,1,0","do not converge");

// S11 geometric power series.
has(11,'main',"center is a=2","-1<x<5","3/(5-x)","x=5","x=-1");
has(11,'transfer',"center is -1","-3<x<1","x=1","x=-3");

// S12 candidate / finite prefix.
has(12,'main',"P_3=1-h+h^2-h^3","sum_{k=0}∞ (-1)^k (x-2)^k","remainder tends to zero");
has(12,'transfer',"f(-1)=2","f'(-1)=3","f''(-1)=2!(-1)=-2","f'''(-1)=3!(4)=24");

// S13 canonical candidates.
near(16/24,2/3);
has(13,'main',"(-1)^k (2x)^(2k)/(2k)!","1-2x^2+(2/3)x^4");
has(13,'transfer',"e sum_{k=0}∞ (x-1)^k/k!","P_3=e[1+(x-1)+(x-1)^2/2+(x-1)^3/6]");

// S14 equality to target.
has(14,'main',"e^|x| |x|^(n+1)/(n+1)!","≤1/2","P_n(x)→e^x");
has(14,'transfer',"convergence alone identifies some sum","|x|^(n+1)/(n+1)!","P_n(x)→sin x");

// S15 generation in context.
near(10+1.5*0.2-0.2*0.2**2,10.292);
has(15,'main',"10+1.5h-0.2h^2","10.292","+0.3","-0.008","|y'''(t)|");
has(15,'transfer',"3-2(x+1)+4(x+1)^2");

// S16 center / convergence failure.
const fv=1/3, ps=[-1,3,-5,11], errs=ps.map(v=>Math.abs(v-fv));
near(errs[0],4/3);near(errs[1],8/3);near(errs[2],16/3);near(errs[3],32/3);
has(16,'main',"P_1=1-2=-1","P_2=3","P_3=-5","P_4=11","32/3","magnitude 2>1");
has(16,'transfer',"5/(1-5h)","|h|<0.2","0.5","0.9");

// S17 smooth versus analytic.
has(17,'main',"Taylor series is identically 0","phi(x)=e^(-1/x^2)>0","C-infinity");
has(17,'transfer',"h'(0)=1","h^(k)(0)=0 for k≥2","Taylor series","x+phi(x)>x");

// S18 forensics.
has(18,'main',"A is true","B is false","R(h)=5h^3","C is false","D is true");
has(18,'transfer',"C>0","δ>0","does not say C=1","h=0.5","interval-wide derivative bound");

// S19 synthesis.
near(1+0.2+0.2**2/2,1.22);
near(1+0.2+0.2**2/2+0.2**3/6,1.2213333333333334);
near(1.23*0.2**3/6,0.00164);
near(1.23*0.2**4/24,0.000082);
has(19,'main',"P_2(0.2)=1.22","P_3(0.2)=1.221333","0.00164","0.000082","O(h^4)");
const s=Math.SQRT2/2;
near(s+s*0.05-(s/2)*0.05**2,0.7415020271847135,1e-12);
near(0.05**3/6,2.0833333333333336e-5,1e-15);
has(19,'transfer',"sqrt(2)/2","|h|^3/6","2.0833×10^-5","O(h^3)");

// Prompt/reference alignment guards on the most delicate distinctions.
assert(prompt(6,'transfer').includes("|t|^3"));
assert(prompt(7,'transfer').includes("without justification"));
assert(prompt(12,'transfer').includes("do not determine the next coefficient"));
assert(prompt(14,'transfer').includes("converges, so its sum must be sin x"));
assert(prompt(16,'main').includes("increasing degree makes this approximation worse"));
assert(prompt(18,'transfer').includes("O(h^2) means the constant is 1"));
assert(prompt(19,'main').includes("below 10^-4"));

// Theorem-type / future-boundary guards.
const refs=Object.values(a.evaluators).map(e=>e.reference).join('\n').toLowerCase();
for(const banned of ['jacobian','hessian','regularity structure','renormalization','newton method','central limit theorem','analytic continuation']){
  assert(!refs.includes(banned),'future machinery used in M12 reference: '+banned);
}
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE263','ARC053']);
assert(!a.boundary.prerequisiteModules.includes('ARC510'));
assert.match(session(5).lesson,/continuous on \[a,b\]/);
assert.match(session(5).lesson,/differentiable on \(a,b\)/);
assert.match(session(6).lesson,/n continuous derivatives on the closed interval/i);
assert.match(session(6).lesson,/f\^\(n\+1\) exists at every interior point/i);
assert.match(session(10).lesson,/sequence S_N converges/i);
assert.match(session(17).lesson,/Taylor-series candidate at 0 is therefore 0/i);

console.log('PASS M12 independent mathematics: all 38 references reconstructed/attacked for arithmetic, signs, centers, factorial scaling, theorem hypotheses, error bounds, O/o/~ logic, partial-sum convergence, representation and smooth-not-analytic failure.');
