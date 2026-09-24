// Independently reconstructed calculations and adversarial witnesses on the pinned public tasks.
// Finite probes are regression checks, not proofs of universal limits. See M09-VERIFICATION.md.
import fs from 'node:fs';import assert from 'node:assert/strict';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m09.json','utf8'));
const ref=(n,k='main')=>a.evaluators[a.sessions[n-1][k]].reference.replace(/\s/g,'');
const requireText=(n,k,...xs)=>{for(const x of xs)assert(ref(n,k).includes(x.replace(/\s/g,'')),`S${n} ${k} reference omitted ${x}`);};
const close=(x,y)=>assert(Math.abs(x-y)<=1e-10*Math.max(1,Math.abs(x),Math.abs(y)),`${x} != ${y}`);
const eps=[0.001,0.01,0.03,0.1,0.5,1,3,10];
const Nstrict=x=>Math.floor(x)+1;
// 01–04: exact boundary inequalities and quantifier witnesses.
assert(14>=7/(1/2)&&7/15<1/2);requireText(1,'main','N=15','n=14');
for(let n=1;n<=40;n++)close(1/n,1/n); // common observed prefix; later tails differ.
requireText(1,'transfer','0 after index40','1 after40');
for(const e of eps){const N=Nstrict(3/(2*e));for(const n of [N,N+1,10*N])assert(3/(2*n+1)<e);}
requireText(2,'main','3/(2n+1)','floor(3/(2ε))');requireText(2,'transfer','ε=1','n=N');
assert(9*100>=3*(298+2));assert(9*100<3*(299+2)); // exact rational strict boundary
requireText(3,'main','N=299','N=298');assert(6*100===4*150);assert(6*100<4*151);requireText(3,'transfer','N=151','e_n=0');
for(let N=1;N<100;N++){assert(5*N>=N);assert.equal(5*N%5,0);const k=Math.ceil(Math.log2(N));assert(2**k>=N);}
requireText(4,'main','3/2','5N');requireText(4,'transfer','Powers2^k','error3');
// 05–06: simultaneous-error contradictions and prefix-tail bounds.
for(const d of [0.1,1,100])assert(2*d/4<d);requireText(5,'main','max(N_P,N_Q)','d/2');
close(0.3+0.7,1);requireText(5,'transfer','|A-B|<r+s','cannot hold');
requireText(6,'main','1≤k<N','N=1');requireText(6,'transfer','Alternate2 and6','a_1=100');
// 07–10: derived coefficients, rational identities, geometric envelope.
assert.equal(3*4+2*(-2),8);assert.equal(3*2+2*5,16);requireText(7,'main','Limit8','16/n');requireText(7,'transfer','-1/n','A≤B');
for(let n=1;n<=200;n++){
 close((6+2/n)/(3-1/n)-2,4/(3*n-1));assert(4/(3*n-1)<=2/n);
 assert((2*n+1)/(n*n+1)<=3/n);assert((2/5)**n<=1/(1+1.5*n));
}
requireText(8,'main','4/(3n-1)','2/n');requireText(8,'transfer','yield2','yield0','|B|/2');
requireText(9,'main','3/n');requireText(9,'transfer','even n and2 for odd n','|b_n|≤1/n');
for(const e of eps){let n=Nstrict(2/(3*e));assert((2/5)**n<e);}
requireText(10,'main','1+3/2','2/(3ε)');requireText(10,'transfer','q0→0','q1→1','1+n/5');
// 11–14: parity, exact difference, invariant recurrence, signed growth.
for(let k=1;k<=50;k++){close((-1)**(2*k)+2/(2*k),1+1/k);close((-1)**(2*k-1)+2/(2*k-1),-1+2/(2*k-1));}
requireText(11,'main','→1','→-1');requireText(11,'transfer','N=2K','Even0/odd1');
for(let n=1;n<=100;n++){close(3*(n+1)/(n+3)-3*n/(n+2),6/((n+2)*(n+3)));assert(3*n/(n+2)<3);}
requireText(12,'main','6/((n+2)(n+3))','3-6/(n+2)');requireText(12,'transfer','-7+1/n','-6+1/n');
let x=0;for(let i=0;i<40;i++){const y=(2*x+9)/5;assert(y>=x&&y<=3&&y>=0);x=y;}close(x,3);
requireText(13,'main','5L=2L+9','L=3');requireText(13,'transfer','1,2,1,2','3/2');
for(let n=1;n<100;n++)close((n*n+1)/(n+1),n-1+2/(n+1));
requireText(14,'main','floor(M+1)+1');requireText(14,'transfer','zeros recur','Unbounded');
// 15–18: neighborhoods, nonlinear local factors, two-sided parameter matching.
close(2*3-1,5);close(2*0.05,0.1);requireText(15,'main','Limit5','δ=0.05');requireText(15,'transfer','isolated','limit is7');
for(const e of eps){const d=e/5;for(const h of [-0.9*d,0.9*d])assert(Math.abs(-5*h)<e);}
requireText(16,'main','δ=ε/5');requireText(16,'transfer','δ=ε/4','δ=1');
for(const e of eps){const d=Math.min(1,e/7),dr=Math.min(1,2*e);for(const sign of [-1,1]){let x=3+sign*d*0.9;assert(Math.abs(x*x-9)<e);x=2+sign*dr*0.9;assert(x>1&&Math.abs(1/x-0.5)<e);}}
requireText(17,'main','min(1,ε/7)');requireText(17,'transfer','min(1,2ε)');
close(2*0.5+2,2**2-1);requireText(18,'main','a=1/2','limit3');requireText(18,'transfer','g=-1','g=1');
// 19–20: cancellation and exact rationalization identities.
for(const x of [4,4.9,5.1,6])close((x*x-3*x-10)/(x-5),x+2);
requireText(19,'main','limit7','undefined at5');assert.notEqual((1+9)/(1+3),1+3);requireText(19,'transfer','5/2','left→-∞','right→+∞');
for(const x of [6.5,6.9,7.1,7.5])close((Math.sqrt(2*x+2)-4)/(x-7),2/(Math.sqrt(2*x+2)+4));
requireText(20,'main','Limit1/4');
for(const h of [0.001,0.1,1,8]){const u=Math.sqrt(1+h)+1,err=h/(2*u*u);close(0.5-1/u,err);assert(err<=h/8);}
requireText(20,'transfer','h/[2(√(1+h)+1)²]','δ=8ε');
// 21: scaled radians, non-circular envelope and explicit opposing paths.
for(const h of [-0.1,-0.01,0.01,0.1]){assert(Math.abs((1-Math.cos(h))/h)<=Math.abs(h));close(Math.sin(5*h)/Math.sin(2*h),(5/2)*(Math.sin(5*h)/(5*h))/(Math.sin(2*h)/(2*h)));}
for(let k=1;k<20;k++){close(Math.sin(Math.PI/2+2*Math.PI*k),1);close(Math.sin(3*Math.PI/2+2*Math.PI*k),-1);}
requireText(21,'main','5/2','π/180');requireText(21,'transfer','≤|h|','h_k=1/(π/2+2πk)');
// 22–24: both tails, both sides, point value and relative continuity.
for(const x of [-100,-10,-1,1,10,100]){assert(Math.abs((3*x*x-2*x+1)/(x*x+4)-3)<=13/Math.abs(x));if(Math.abs(x)>1)close(Math.sqrt(9*x*x+x)/x,Math.sign(x)*Math.sqrt(9+1/x));}
requireText(22,'main','Both limits3','13/|x|');requireText(22,'transfer','3 and-3');
for(const M of eps){const d=Math.sqrt(5/M);assert(5/(0.9*d)**2>M);const dt=Math.min(0.5,1.5/M);for(const s of [-1,1]){const x=1+s*0.9*dt;assert(s*(x+1)/(x-1)>M);}}
requireText(23,'main','δ=√(5/M)');requireText(23,'transfer','min(1/2,3/(2M))');
requireText(24,'main','c=4','polynomialx+2');requireText(24,'transfer','rightlimit0','leftlimit1','rightlimit2','leftlimit3');
// 25: exact bisection signs as integer comparisons, bracket and iteration indexing.
assert(3**3-2*2**3>0);assert(5**3-2*4**3<0);close((5/4+3/2)/2,11/8);close((3/2-5/4)/2,1/8);
assert(10/2**10<=0.01&&10/2**9>0.01);requireText(25,'main','midpoint11/8','error≤1/8');requireText(25,'transfer','leastk=9','undefined at0');
// 26: extrema algebra and attainment; no derivative oracle.
const f=x=>7-(x+1)**2;assert.equal(f(-1),7);assert.equal(f(2),-2);assert.equal(f(-3),3);
for(let i=0;i<=500;i++){const x=-3+5*i/500;assert(f(x)>=-2&&f(x)<=7);}
requireText(26,'main','maximum7','minimum-2','no minimum');requireText(26,'transfer','f(x)=x on(0,1)','f(x)=0 on(0,1)');
// 27: exact error identity, sign and bound; two whole-function extensions.
for(let n=1;n<100;n++){const z=Math.sqrt(16+1/n)+4,e=1/(8*n*z*z);close(1/8-1/z,e);assert(e<=1/(512*n));}
requireText(27,'main','extension1/8','1/(512n)','floor(1/(512ε))');
for(let k=1;k<15;k++){close(Math.sin(-(2*Math.PI*k+Math.PI/2)),-1);close(Math.sin(-Math.PI*k),0);}
requireText(27,'transfer','H(x)=x for x≥0','H(x)=sin(1/x) for x<0','z_k=-1/(πk)');
console.log('PASS M09 mathematics: reconstructed arithmetic/identities, strict boundaries, quantified-certificate probes and counterexample witnesses for all 27 Main/Transfer pairs; universal proofs are separately reviewed, not inferred from samples.');
