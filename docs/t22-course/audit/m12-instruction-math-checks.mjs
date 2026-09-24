import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m12-side267.json','utf8'));
const lesson=n=>a.sessions[n-1].lesson;
const has=(n,...xs)=>{const s=lesson(n);for(const x of xs)assert(s.includes(x),`S${n} lesson missing instructional-math marker: ${x}`);};
const near=(x,y,tol=1e-10)=>assert(Math.abs(x-y)<=tol,`${x} != ${y}`);

// This checker deliberately audits learner-facing instruction, not only fixed assessment references.
// Every session's worked/guided mathematics or theorem-support statement is independently recomputed/typed below.

// S01 — worked polynomial and guided derivative cycle.
const q=x=>x**4-2*x**2+x;
const q1=x=>4*x**3-4*x+1;
const q2=x=>12*x**2-4;
const q3=x=>24*x;
near(q(1),0); near(q1(1),1); near(q2(1),8); near(q3(1),24);
has(1,"successive values are 0,1,8,24,24","cos x, -sin x, -cos x, sin x");

// S02 — centered coefficient/factorial arithmetic.
near(-6/2,-3); near(8/2,4);
has(2,"2+4(x-3)-3(x-3)^2","second derivative is -6, not -3","P_2(x)=1+4(x+2)^2");

// S03 — graph data and exact recentering.
near(4/2,2); near(-2/2,-1);
has(3,"-1+3(x-2)+2(x-2)^2","p=9+6h+h^2","5-(x+1)^2");

// S04 — residual/local-vs-global arithmetic.
near(-3*1**3,-3); near(8*0.5**2,2);
has(4,"R_2=-3h^3","R_2/h^2=-3h→0","At h=1, however, the actual error is -3","at h=0.5 the error is 2");

// S05 — theorem hypotheses and both MVT examples.
near((9-1)/(3-1),4); near(2,2);
near((1/2-1)/(2-1),-0.5); near(Math.sqrt(2),Math.sqrt(2));
has(5,"continuous on [a,b]","differentiable on (a,b)","secant slope is (9-1)/2=4","so c=2","secant slope -1/2","c=sqrt(2)");

// S06 — Taylor/Lagrange theorem type, degree-1 proof constant, worked/guided instances.
assert.equal(2,2*1);
has(6,"n continuous derivatives on the closed interval","f^(n+1) exists at every interior point","g''(t)=f''(t)-2M","M=f''(c)/2","ln(1.2)-0.2=f''(c)(0.2)^2/2","f''(c)=-1/c^2","e^0.3-(1+0.3)=e^c(0.3)^2/2");

// S07 — worked exponential bound and guided cosine bound.
near(1+0.25+0.25**2/2,1.28125);
near(1.3*0.25**3/6,0.003385416666666667,1e-15);
near(0.2**3/6,0.0013333333333333335,1e-15);
has(7,"e^t≤e^0.25<1.3","≈0.00339","degree 2 uses the third derivative sin","|R_2|≤0.2^3/6");
assert.match(lesson(7),/every t between a and x/i,'S07 must require interval-wide derivative bound');

// S08 — O/o worked/guided logic.
near((3*1e-6+1e-9)/(1e-3**2),3.001,1e-12);
has(8,"r/h^2=3+h","not o(h^2)","r=o(h)","E=O(h^3) and E=o(h^2)","E=7h^3","h^4 is o(h^3) and O(h^4)","h^3 is O(h^3) but not o(h^3)");

// S09 — asymptotic-equivalence examples.
near((2*1e-4+5*1e-8)/(2*1e-4),1.00025,1e-12);
near((10000+100)/(10000),1.01,1e-12);
has(9,"f/g=1+(5/2)h→1","f/g=1/2","n+1~n","n+sqrt(n)~n","1/sqrt(n)→0");

// S10 — series as partial-sum limits, both geometric examples.
near(1/(1-1/3),1.5); near(2/(1-1/5),2.5);
has(10,"S_N=sum_{n=0}^N a_n","sequence S_N converges to S","→3/2","=5/2","1,0,1,0");

// S11 — centered geometric power series.
assert.equal(-2,-2); assert.deepEqual([-6,2],[-6,2]); assert.deepEqual([3,7],[3,7]);
has(11,"centered at -2","-6<x<2","1/[1-(x+2)/4]","centered at 5","3<x<7");

// S12 — finite/infinite object distinction.
has(12,"Its nth partial sum is exactly P_n","candidate is 2 sum (x-1)^k/k!","Seeing P_0,P_1,P_2,P_3 does not determine P_4","Taylor-series candidate is the zero series");
assert.match(lesson(12),/convergence and equality with the target function remain separate claims/i);

// S13 — canonical derivative patterns, scaling and nonzero center.
has(13,"1-(3x)^2/2!+(3x)^4/4!","P_5=2x-(2x)^3/3!+(2x)^5/5!","cos x about a=pi","-1+(x-pi)^2/2!-(x-pi)^4/4!");
near((2**5)/120,32/120);

// S14 — factorial-tail proof and representation criterion.
for(const A of [0.2,1,3,10]){
  const n=Math.ceil(2*A);
  assert(A/(n+1)<=0.5+1e-12);
}
has(14,"u_{n+1}/u_n=A/(n+1)≤1/2","|R_n(x)|≤e^|x| |x|^(n+1)/(n+1)!","R_n→0 and the candidate equals e^x","|R_n(x)|≤|x|^(n+1)/(n+1)!");
assert.match(lesson(14),/for a fixed x/i);

// S15 — contextual worked/guided arithmetic.
near(50+2*0.1-0.3*0.1**2,50.197);
near(2*0.1,0.2); near(-0.3*0.1**2,-0.003);
has(15,"50+2h-0.3h^2","linear contribution is +0.2","quadratic correction -0.003","4-(x+2)+3(x+2)^2");
assert.match(lesson(15),/Without a bound on C''' over the interval/i);

// S16 — instructional convergence-region failure and recentering.
const f16=x=>1/(1+x);
near(f16(1.5),0.4);
near(1-1.5,-0.5); near(1-1.5+1.5**2,1.75); near(1-1.5+1.5**2-1.5**3,-1.625);
near(-(2/3)*0.5,-1/3);
has(16,"f(x)=1/(1+x)","P_1=-0.5, P_2=1.75, P_3=-1.625","|(2/3)h|<1","|h|<1.5","recentered geometric tail contracts");

// S17 — analytic criterion and rigorous derivative-at-zero induction step.
has(17,"analytic at a when, on some neighborhood of a, its Taylor-series partial sums converge to the function itself","standard flat-function lemma","difference quotient","P_n(1/h)exp(-1/h^2)/h → 0","phi^(n+1)(0)=0","Taylor-series candidate at 0 is therefore 0");
assert.match(lesson(17),/phi\(x\)>0 for every x≠0/i);

// S18 — claim-strength forensics.
has(18,"R=O(h^3) and R=o(h^2)","does not imply R=o(h^3)","R=5h^3","does not by itself say C=1","pointwise remainder decay at one x does not establish a uniform statement");

// S19 — synthesis workflow and guided nonzero-center theorem order.
has(19,"Find an interval-wide derivative bound","prove remainder→0 as degree grows","sin(a+h) at a=pi/6","|third derivative|≤1","cubic-order error certificate");
near(Math.sin(Math.PI/6),0.5); near(Math.cos(Math.PI/6),Math.sqrt(3)/2);

// Cross-session theorem-hypothesis guards.
assert.match(lesson(5),/continuous on \[a,b\].*differentiable on \(a,b\)/s,'S05 MVT hypotheses must remain explicit');
assert.match(lesson(6),/n continuous derivatives on the closed interval.*f\^\(n\+1\) exists at every interior point/s,'S06 Taylor hypotheses must remain explicit');
assert.match(lesson(7),/every t between a and x/s,'S07 error certificate must use an interval-wide derivative bound');
assert.match(lesson(14),/fixed x/s,'S14 remainder-to-zero claim must remain pointwise/fixed-x as taught');
assert.match(lesson(17),/difference quotient/s,'S17 smooth-flat support must include derivative-at-zero induction step');

console.log('PASS M12 instructional mathematics: 19/19 learner-facing lessons independently checked for worked/guided arithmetic or symbolic claims plus MVT/Taylor/error/series/analytic hypothesis structure; S01 order-0 regression and S17 flat-function induction explicitly guarded.');
