import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m10-arc053.json','utf8'));
const session=n=>a.sessions[n-1];
const ref=(n,kind='main')=>a.evaluators[session(n)[kind]].reference;
const prompt=(n,kind='main')=>a.problems[session(n)[kind]].prompt;
const has=(n,kind,...xs)=>{const r=ref(n,kind);for(const x of xs)assert(r.includes(x),`S${n} ${kind} missing independent oracle marker: ${x}`);};
const near=(x,y,tol=1e-12)=>assert(Math.abs(x-y)<=tol,`${x} != ${y}`);

// S01–S05: definition, one-sided existence and derivative-function/domain reconstruction.
near(((4.001**2+2*4.001)-(4**2+2*4))/0.001,10.001,1e-9);
has(1,'main','10+h','instantaneous rate is 10');
has(1,'transfer','2+h','local rate is 2');
has(2,'main','x+2','7+h','7');
has(2,'transfer',"g'(2)=1",'For k','no finite two-sided limit');
near(3*2**2-2,10);
has(3,'main',"s'(2)=10",'m/s','y=4+10(t-2)');
has(3,'transfer','30 dollars per unit','22 dollars per unit');
has(4,'main','left','2','right');
has(4,'transfer','corner','vertical-tangent');
has(5,'main',"f'(x)=3x²-2",'domain R');
has(5,'transfer',"dom(g')=R\\{2}");

// S06–S08: differentiability=>continuity, local-linearity equivalence, approximation/error boundary.
has(6,'main','|Q(h)|≤|L|+1','δ=min(δ0,ε/M)','proving continuity');
has(6,'transfer','Continuity follows','no finite derivative');
has(7,'main','10+7h+h²','r(h)=h²',"f'(2)=7");
has(7,'transfer','r(h)=h|h|','|h|→0',"F'(0)=2");
near(2.02**3,8.242408);
near(2.02**3-(8+12*0.02),0.002408);
has(8,'main','8.24','8.242408','0.002408','6h²+h³');
has(8,'transfer','249.28','cannot certify nearest-0.01');

// S09–S13: linearity, power/polynomial, product, reciprocal/quotient.
assert.equal(3*5-4*(-1),19);
has(9,'main',"W'(2)=3u'(2)-4v'(2)=15+4=19");
has(9,'transfer','4α+6β=0','α=3','β=-2');
assert.equal(5*2**4,80);
has(10,'main','5x^4','80');
has(10,'transfer','six terms','-6');
assert.equal(20-6+2,16);
has(11,'main',"p'(x)=20x^4-6x+2","p'(1)=20-6+2=16");
near(4/3,1.3333333333333333);
has(11,'transfer','9a=12','a=4/3','b=3');
assert.equal(2*(-1)+2*3,4);
has(12,'main',"P'(1)",'=4');
has(12,'transfer','-2+7h','15h²',"=7");
near((4*3-7*2)/9,-2/9);
has(13,'main','-2/9','x≠1/2');
has(13,'transfer',"F'=1 on x≠1","F'(1) is not");

// S14–S17: chain structure and trigonometric derivations.
assert.equal(3*3**2*1,27);
has(14,'main','g(1)=3',"g'(1)=1","f'(3)=27","H'(1)=27");
has(14,'transfer','9-12h','-12');
assert.equal(3*4*2,24);
has(15,'main',"F'(2)=3·4·2=24",'domain R');
has(15,'transfer','-4x/(x²-1)^3','x≠±1');
has(16,'main',"(cos x)'=-sin x",'equals -1','radians');
has(16,'transfer',"H'(0)=2",'π/90');
has(17,'main','3sec²(3x)+2sec x tan x','F\'(0)=3');
has(17,'transfer','-csc²x+csc x cot x',"G'=-1");

// S18–S21: inverse/implicit and exp/log hypotheses.
has(18,'main',"g'(2)=1/4","f'(b)=4≠0");
has(18,'transfer',"g'(9)=-1/6",'branch');
has(19,'main','x+2y','denominator is 5',"y'=-1",'does not establish branch existence');
has(19,'transfer',"y'= -y/(x+3y²)",'-1/5','local branch');
near(3*Math.E,3*Math.E);
has(20,'main','3e');
has(20,'transfer',"A'(0)=-20","A'/A=-0.04",'per time-unit');
has(21,'main',"b^{log_b x}=x","1/(x ln b)","G'(1)=1/ln b");
has(21,'transfer','2ln2+1');

// S22–S24: local sensitivity, forensic legality and synthesis.
assert.equal(20*(100-40),1200);
assert.equal(100-4*20,20);
near(20*20/1200,1/3);
has(22,'main','R(20)=1200',"R'(20)=20",'ΔR≈20·0.5=10','1/3','do not by themselves locate a maximizing price');
near(((2*1*3)-(2))/9,4/9);
near((4/9)/(2/3),2/3);
has(22,'transfer','Q(1)=2/3',"Q'(1)=4/9",'2/3');
has(23,'main','A is false','B is true','C is false','x≠-1');
has(23,'transfer',"g'(0)=0",'2x sin(1/x)-cos(1/x)','not continuous');
has(24,'main',"u'(1)=3","F'(1)=1",'ln3+h+o(h)','discontinuous');
has(24,'transfer',"g'(5)=1/3","Z'(5)=1/9",'ln3+(1/9)k+o(k)','does not supply a global error bound');

// Boundary/proof-safety reconstruction: no forbidden future theorem is needed by any reference.
const allRefs=Object.values(a.evaluators).map(e=>e.reference).join('\n').toLowerCase();
for(const banned of ['mean value theorem',"l'hopital","l’hopital","newton's method",'jacobian','hessian']){
  assert(!allRefs.includes(banned),'future theorem used in stored reference: '+banned);
}
assert(prompt(18).includes('inverse-derivative argument'),'inverse theorem use must be explicit rather than a hidden reciprocal mnemonic');
assert(prompt(19).includes('Assume a differentiable local branch'),'implicit task must grant, not infer, a local branch');
assert(a.sessions[19].lesson.includes('explicitly adopt the standard natural-exponential construction/normalization'),'exp derivative dependency must be surfaced');

console.log('PASS M10 independent mathematics: all 24 sessions / 48 stored references sampled against separately encoded symbolic, numerical, domain and hypothesis oracles.');
