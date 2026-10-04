import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));
const by=n=>a.sessions.find(s=>s.id===`T22V3::T22E-DISC01::S${String(n).padStart(2,'0')}@1`);
for(const n of [31,32,33,34,35,36])assert(by(n),`missing new M03 S${n}`);

// S31 — nested quantifier order.
for(let n=-250;n<=250;n++){
  const m=n+1;
  assert(Number.isInteger(m)&&m>n&&Math.abs(m-n)%2===1);
}
for(let m=-250;m<=250;m++){
  const n=m;
  assert(!(m>n&&Math.abs(m-n)%2===1));
}
const allowed={a:new Set([1,2]),b:new Set([2,3]),c:new Set([1,3])};
const dependent={a:1,b:2,c:3};
for(const x of Object.keys(allowed))assert(allowed[x].has(dependent[x]));
assert.deepEqual([1,2,3].filter(y=>Object.values(allowed).every(S=>S.has(y))),[]);

// S32 — constructive existence / uniqueness.
for(const t of [-100,-7,-.5,0,2,19,100]){
  const x=(7-t)/2;
  assert(Math.abs((4*x+t)-(2*x+7))<1e-12);
  const u=x,v=x;
  assert.equal(u,v);
}
assert.deepEqual([-4,4].filter(x=>x*x===16),[-4,4]);
assert.deepEqual([-4,4].filter(x=>x>=0&&x*x===16),[4]);

// S33 — least-counterexample target mathematics.
for(let n=1;n<=50;n++)assert(3**n>=2*n+1);
for(const x of [1,0.1,17,Math.PI])assert(x/2>0&&x/2<x);

// S34 — bijection and fibres.
const subsets=[];
for(let mask=0;mask<32;mask++){
  const S=[];let bits='';
  for(let i=0;i<5;i++){const on=!!(mask&(1<<i));bits+=on?'1':'0';if(on)S.push(i+1);}
  subsets.push({S,bits});
}
assert.equal(new Set(subsets.map(x=>x.bits)).size,32);
for(const {S,bits} of subsets){
  const back=[...bits].flatMap((bit,i)=>bit==='1'?[i+1]:[]);
  assert.deepEqual(back,S);
}
const B=[];
let P=0;const fibreSizes=[];
for(let mask=1;mask<8;mask++){
  const w=mask.toString(2).padStart(3,'0');
  const ones=[...w].filter(c=>c==='1').length;
  B.push(w);P+=ones;fibreSizes.push(ones);
}
assert.equal(P,12);assert.equal(B.length,7);
assert.deepEqual([...new Set(fibreSizes)].sort(),[1,2,3]);

// S35 — both fixed identities.
const C=(n,r)=>{if(r<0||r>n)return 0;r=Math.min(r,n-r);let z=1;for(let i=1;i<=r;i++)z=z*(n-r+i)/i;return Math.round(z);};
let main35=0;for(let k=0;k<=5;k++)main35+=(5-k)*C(5,k);
assert.equal(main35,5*2**4);assert.equal(main35,80);
let transfer35=0;for(let k=0;k<=4;k++)transfer35+=C(4,k)*2**k;
assert.equal(transfer35,81);assert.equal(transfer35,3**4);

// S36 — decisive invariant and termination/rank arithmetic.
assert.equal((3+8),(4+7),'sum is intentionally non-decisive on S36 Main');
assert.notEqual(3%2,4%2,'x-parity separates Main start and target');
for(const [x,y] of [[3,8],[5,6],[7,4],[9,2]]){
  if(x>=2)assert.equal((x-2)%2,x%2);
  if(y>=2)assert.equal((x+2)%2,x%2);
}
let p=17,q=11,moves=0,prevRank=p+q;
const diff=p-q;
while(p>0&&q>0){
  p--;q--;moves++;
  const rank=p+q;
  assert(rank>=0&&Number.isInteger(rank)&&rank<prevRank);
  assert.equal(p-q,diff);
  prevRank=rank;
}
assert.deepEqual([p,q],[6,0]);assert.equal(moves,11);

const s34=by(34),s35=by(35),s36=by(36);
assert(a.evaluators[s34.transfer].reference.includes('|P|=12'));
assert(a.evaluators[s35.main].reference.includes('5·2^4=80'));
assert(a.evaluators[s35.transfer].reference.includes('3^4=81'));
assert(a.evaluators[s36.transfer].reference.includes('(6,0)'));

console.log('PASS: independent deterministic mathematics for M03 v2 S31–S36.');
