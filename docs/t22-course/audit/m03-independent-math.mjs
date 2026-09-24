import assert from 'node:assert/strict';
// Independent enumerations, not the factorial/IE formulas used by the references.
const subsets=(n,k)=>Array.from({length:2**n},(_,m)=>Array.from({length:n},(_,i)=>i+1).filter((_,i)=>m&(1<<i))).filter(a=>a.length===k);
const triples=subsets(8,3);
assert.equal(triples.length,56);
assert.equal(triples.filter(a=>new Set(a.map(x=>x%2)).size===2).length,48);
let maps=0,onto=0;
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){maps++;if(new Set([a,b,c,d]).size===3)onto++;}
assert.equal(maps,81);assert.equal(onto,36);
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
console.log('PASS independent enumeration: S25 repeats/teams, S27 distributions, S28 divisibility, S29 consecutive-pair guarantee, S30 subsets/surjections. These checks do not certify pedagogy or independent assessment.');
