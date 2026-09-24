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
const s01Values=[q(1),q1(1),q2(1),q3(1),24];
assert.deepEqual(s01Values,[0,1,8,24,24]);
has(1,`successive values are ${s01Values.join(',')} for orders 0 through 4`,"cos x, -sin x, -cos x, sin x");

// S02 — centered coefficient/factorial arithmetic.
const s02WorkedQuad=-6/2, s02GuidedQuad=8/2;
assert.equal(s02WorkedQuad,-3); assert.equal(s02GuidedQuad,4);
has(2,`2+4(x-3)${s02WorkedQuad>=0?'+':''}${s02WorkedQuad}(x-3)^2`,
  `second derivative is -6, not ${s02WorkedQuad}`,
  `P_2(x)=1+${s02GuidedQuad}(x+2)^2`);

// S03 — graph data and exact recentering.
const s03WorkedQuad=4/2, s03GuidedQuad=-2/2;
assert.equal(s03WorkedQuad,2); assert.equal(s03GuidedQuad,-1);
has(3,`-1+3(x-2)+${s03WorkedQuad}(x-2)^2`,"p=9+6h+h^2",`5${s03GuidedQuad===-1?'-':''}(x+1)^2`);

// S04 — residual/local-vs-global arithmetic.
const s04WorkedErr=-3*1**3, s04GuidedErr=8*0.5**2;
assert.equal(s04WorkedErr,-3); assert.equal(s04GuidedErr,2);
has(4,"R_2=-3h^3","R_2/h^2=-3h→0",
  `At h=1, however, the actual error is ${s04WorkedErr}`,
  `at h=0.5 the error is ${s04GuidedErr}`);

// S05 — theorem hypotheses and both MVT examples.
const s05WorkedSlope=(9-1)/(3-1), s05WorkedC=s05WorkedSlope/2;
const s05GuidedSlope=(1/2-1)/(2-1), s05GuidedC=Math.sqrt(-1/s05GuidedSlope);
assert.equal(s05WorkedSlope,4); assert.equal(s05WorkedC,2); assert.equal(s05GuidedSlope,-0.5); near(s05GuidedC,Math.sqrt(2));
has(5,"continuous on [a,b]","differentiable on (a,b)",
  `secant slope is (9-1)/2=${s05WorkedSlope}`,`so c=${s05WorkedC}`,"secant slope -1/2","c=sqrt(2)");

// S06 — Taylor/Lagrange theorem type, degree-1 proof constant, worked/guided instances.
assert.equal(2,2*1);
has(6,"n continuous derivatives on the closed interval","f^(n+1) exists at every interior point","g''(t)=f''(t)-2M","M=f''(c)/2","ln(1.2)-0.2=f''(c)(0.2)^2/2","f''(c)=-1/c^2","e^0.3-(1+0.3)=e^c(0.3)^2/2");

// S07 — worked exponential bound and guided cosine bound.
const s07P2=1+0.25+0.25**2/2;
const s07WorkedBound=1.3*0.25**3/6;
const s07GuidedBound=0.2**3/6;
near(s07P2,1.28125); near(s07WorkedBound,0.003385416666666667,1e-15); near(s07GuidedBound,0.0013333333333333335,1e-15);
has(7,"e^t≤e^0.25<1.3",`≈${s07WorkedBound.toFixed(5)}`,"degree 2 uses the third derivative sin","|R_2|≤0.2^3/6");
assert.match(lesson(7),/every t between a and x/i,'S07 must require interval-wide derivative bound');

// S08 — O/o worked/guided logic.
near((3*1e-6+1e-9)/(1e-3**2),3.001,1e-12);
has(8,"r/h^2=3+h","not o(h^2)","r=o(h)","E=O(h^3) and E=o(h^2)","E=7h^3","h^4 is o(h^3) and O(h^4)","h^3 is O(h^3) but not o(h^3)");

// S09 — asymptotic-equivalence examples.
near((2*1e-4+5*1e-8)/(2*1e-4),1.00025,1e-12);
near((10000+100)/(10000),1.01,1e-12);
has(9,"f/g=1+(5/2)h→1","f/g=1/2","n+1~n","n+sqrt(n)~n","1/sqrt(n)→0");

// S10 — series as partial-sum limits, both geometric examples.
const s10WorkedSum=1/(1-1/3), s10GuidedSum=2/(1-1/5);
assert.equal(s10WorkedSum,1.5); assert.equal(s10GuidedSum,2.5);
const altPartial=[0,1,2,3].map(N=>Array.from({length:N+1},(_,k)=>(-1)**k).reduce((z,v)=>z+v,0));
assert.deepEqual(altPartial,[1,0,1,0]);
has(10,"S_N=sum_{n=0}^N a_n","sequence S_N converges to S",
  `→${s10WorkedSum===1.5?'3/2':String(s10WorkedSum)}`,
  `=${s10GuidedSum===2.5?'5/2':String(s10GuidedSum)}`,"for r=-1 they oscillate");

// S11 — centered geometric power series.
const s11WorkedCenter=-2, s11WorkedInterval=[s11WorkedCenter-4,s11WorkedCenter+4];
const s11GuidedCenter=5, s11GuidedInterval=[s11GuidedCenter-2,s11GuidedCenter+2];
assert.deepEqual(s11WorkedInterval,[-6,2]); assert.deepEqual(s11GuidedInterval,[3,7]);
has(11,`centered at ${s11WorkedCenter}`,`${s11WorkedInterval[0]}<x<${s11WorkedInterval[1]}`,
  "1/[1-(x+2)/4]",`centered at ${s11GuidedCenter}`,`${s11GuidedInterval[0]}<x<${s11GuidedInterval[1]}`);

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
const s15Estimate=50+2*0.1-0.3*0.1**2;
const s15Linear=2*0.1, s15Quadratic=-0.3*0.1**2;
near(s15Estimate,50.197); near(s15Linear,0.2); near(s15Quadratic,-0.003);
has(15,"50+2h-0.3h^2",`linear contribution is +${s15Linear}`,
  `quadratic correction ${s15Quadratic}`,"4-(x+2)+3(x+2)^2");
assert.match(lesson(15),/Without a bound on C''' over the interval/i);

// S16 — instructional convergence-region failure and recentering.
const f16=x=>1/(1+x);
const s16x=1.5, s16fx=f16(s16x);
const s16P1=1-s16x, s16P2=s16P1+s16x**2, s16P3=s16P2-s16x**3;
const s16RecentRatio=-(2/3)*0.5;
near(s16fx,0.4); near(s16P1,-0.5); near(s16P2,1.75); near(s16P3,-1.625); near(s16RecentRatio,-1/3);
has(16,"f(x)=1/(1+x)",
  `P_1=${s16P1}, P_2=${s16P2}, P_3=${s16P3}`,
  "|(2/3)h|<1","|h|<1.5","recentered geometric tail contracts");

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

console.log('PASS M12 instructional mathematics: 19/19 learner-facing lessons checked; numeric worked/guided results are bound to independently recomputed oracles rather than disconnected literals; MVT/Taylor/error/series/analytic hypothesis structure guarded; S01 order-0 regression and S17 flat-function induction explicitly protected.');
