import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const py=String.raw`
import json, math, random
from fractions import Fraction
from itertools import product
out={}
cash=120; fee=7; cash=cash-fee; cash=cash+15; out["s01"]=cash
out["s02"]=[17//5,17%5,17/5,(0.1+0.1+0.1==0.3),math.isclose(0.1+0.1+0.1,0.3)]
total=0
for k in range(1,6): total += k*k
out["s04"]=total
bank=10; rounds=0
while bank<20:
    bank+=3; rounds+=1
out["s05"]=[bank,rounds]
def relative_change(start,end): return (end-start)/start
out["s06"]=[relative_change(80,92),relative_change(50,45)]
a=[2,4]; b=a; b.append(6); c=a.copy(); c.append(8)
out["s10"]=[a,b,c]
values=[10,12,9]; weights=[2,1,3]
out["s11"]=[sum(v*w for v,w in zip(values,weights)),sum(weights)]
pairs=list(product(range(1,7),repeat=2)); hits=[x for x in pairs if sum(x)==8]
out["s12"]=[len(pairs),hits,[len(hits),len(pairs)]]
p={"A":Fraction(1,2),"B":Fraction(1,3),"C":Fraction(1,6)}
out["s13"]=[str(sum(p.values())),str(p["A"]+p["C"]),str(Fraction(1,10)),str(Fraction("0.1")),str(Fraction(0.1))]
B=[x for x in pairs if sum(x)>=10]; AB=[x for x in B if 6 in x]
out["s14"]=[len(B),len(AB),str(Fraction(len(AB),len(B)))]
omega=range(1,7); A=[x for x in omega if x%2==0]; C=[x for x in omega if x>=4]; I=[x for x in omega if x%2==0 and x>=4]
out["s15"]=[str(Fraction(len(A),6)),str(Fraction(len(C),6)),str(Fraction(len(I),6)),str(Fraction(len(A),6)*Fraction(len(C),6))]
out["s16"]=str(sum([-1,-1,-1,-1,-1,5],Fraction())/6)
r1=random.Random(23); r2=random.Random(23)
x=[r1.random() for _ in range(3)]; y=[r2.random() for _ in range(3)]
same=(x==y); r1.random(); next_equal=(r1.random()==r2.random())
out["s19"]=[same,next_equal]
rng=random.Random(2026); hits=sum(rng.random() < 1/3 for _ in range(1000))
out["s21"]=[hits,hits/1000]
r=random.Random(11); aa=r.random(); st=r.getstate(); bb=r.random(); r.setstate(st); cc=r.random()
out["s22"]=[bb==cc,aa==bb]
bugpairs=[(d,d) for d in range(1,7)]
out["s23"]=[len(bugpairs),sum(a+b==7 for a,b in bugpairs),str(Fraction(6,36))]
out["s24"]=[str(Fraction(5,36)),str(Fraction(5,36)*8+Fraction(31,36)*(-2))]
print(json.dumps(out))
`;
const r=spawnSync('python3',['-c',py],{encoding:'utf8'});
assert.equal(r.status,0,r.stderr);
const o=JSON.parse(r.stdout);
assert.equal(o.s01,128);
assert.deepEqual(o.s02.slice(0,3),[3,2,3.4]);assert.equal(o.s02[3],false);assert.equal(o.s02[4],true);
assert.equal(o.s04,55);assert.deepEqual(o.s05,[22,4]);
assert(Math.abs(o.s06[0]-.15)<1e-12&&Math.abs(o.s06[1]+.1)<1e-12);
assert.deepEqual(o.s10,[[2,4,6],[2,4,6],[2,4,6,8]]);
assert.deepEqual(o.s11,[59,6]);
assert.equal(o.s12[0],36);assert.equal(o.s12[1].length,5);assert.deepEqual(o.s12[2],[5,36]);
assert.equal(o.s13[0],'1');assert.equal(o.s13[1],'2/3');assert.equal(o.s13[2],'1/10');assert.equal(o.s13[3],'1/10');assert.notEqual(o.s13[4],'1/10');
assert.deepEqual(o.s14,[6,5,'5/6']);
assert.deepEqual(o.s15,['1/2','1/2','1/3','1/4']);
assert.equal(o.s16,'0');
assert.equal(o.s19[0],true);assert.equal(o.s19[1],false);
assert.deepEqual(o.s21,[322,0.322]);
assert.equal(o.s22[0],true);
assert.deepEqual(o.s23,[6,0,'1/6']);
assert.deepEqual(o.s24,['5/36','-11/18']);
console.log('PASS M08 independent executable oracles: Python assignment/control flow, float comparison, aliasing, exact products/Fractions/conditioning/independence/expectation, seeded random() path, state replay and synthesis arithmetic.');
