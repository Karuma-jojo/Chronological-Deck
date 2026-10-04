import assert from 'node:assert/strict';
// Independent enumerations, not the factorial/IE formulas used by the references.
const subsets=(n,k)=>Array.from({length:2**n},(_,m)=>Array.from({length:n},(_,i)=>i+1).filter((_,i)=>m&(1<<i))).filter(a=>a.length===k);
// Historical S30 v1.7 arithmetic is no longer the live fixed contract; preserve only
// the generic subset helper below and independently check the strengthened r2 S30.
assert.equal(13*4,52);
assert(13*4>8*6,'S30 Main capacity contradiction: 52 incidences cannot fit with all 8 elements used at most 6 times');
let maps=0,onto=0;
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++)for(let e=0;e<3;e++){
  maps++;
  const vals=[a,b,c,d,e],used=new Set(vals);
  if(used.size===3){
    onto++;
    const fibre=[0,1,2].map(v=>vals.filter(x=>x===v).length);
    assert(Math.max(...fibre)>=2,'every onto map 5→3 needs a fibre of size at least 2');
  }
}
assert.equal(maps,243);assert.equal(onto,150);
function allocations(n,k,min=0){if(k===1)return n>=min?1:0;let count=0;for(let x=min;x<=n;x++)count+=allocations(n-x,k-1,min);return count;}
assert.equal(allocations(7,3),36);assert.equal(allocations(8,3,1),21);
assert.equal(allocations(10,4),286);assert.equal(allocations(10,4,1),84);
let teams=0;for(const red of subsets(8,3)){const rest=Array.from({length:8},(_,i)=>i+1).filter(x=>!red.includes(x));for(const ix of subsets(5,3)){assert.equal(ix.map(i=>rest[i-1]).length,3);teams++;}}
assert.equal(teams,560);
assert.equal(Array.from({length:100},(_,i)=>i+1).filter(x=>x%2===0||x%5===0).length,60);
function strings(chars){if(!chars.length)return new Set(['']);const out=new Set();for(let i=0;i<chars.length;i++)for(const tail of strings(chars.slice(0,i)+chars.slice(i+1)))out.add(chars[i]+tail);return out;}
assert.equal(strings('BALLOON').size,1260);
for(let mask=0;mask<2**20;mask++){
 if((mask&(mask>>1))!==0)continue;
 let n=0;for(let z=mask;z;z&=z-1)n++;
 assert(n<=10,'S29: no 11-element subset without consecutive integers');
}
console.log('PASS independent enumeration: S25 repeats/teams, S27 distributions, S28 divisibility, S29 consecutive-pair guarantee, strengthened S30 52>48 incidence bound and 150 onto maps with fibre guarantee. These checks do not certify pedagogy or independent assessment.');
