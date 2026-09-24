import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const py=String.raw`
import json, math, random
from fractions import Fraction
from itertools import product
out={}

# S01
cash=120; fee=7; cash=cash-fee; cash=cash+15; out["s01"]=cash

# S02 repaired fresh surface
out["s02"]=[29//6,29%6,29/6,(0.2+0.2+0.2==0.6),math.isclose(0.2+0.2+0.2,0.6,rel_tol=1e-9,abs_tol=0.0),
            math.isclose(1e-13,0.0,rel_tol=0.0,abs_tol=1e-12)]

# S04-S07
total=0
for k in range(1,6): total += k*k
out["s04"]=total
bank=10; rounds=0
while bank<20:
    bank+=3; rounds+=1
out["s05"]=[bank,rounds]
def relative_change(start,end): return (end-start)/start
out["s06"]=[relative_change(80,92),relative_change(50,45)]
def is_high(x): return x>=5
def count_event(xs,predicate):
    hits=0
    for x in xs:
        if predicate(x): hits+=1
    return hits
out["s07"]=[count_event([1,2,3,4,5,6],is_high),is_high(5),is_high(4)]

# S08-S11 repaired observability surfaces
records=[('W',3),('L',-2),('W',4)]
payoffs=[]; payoff_sum=0
for label,payoff in records:
    payoffs.append(payoff); payoff_sum+=payoff
out["s08"]=[payoffs,payoff_sum]
observations=['G','R','G','B','G','R']
counts={}
for x in observations: counts[x]=counts.get(x,0)+1
out["s09"]=[sorted(set(observations)),len(observations),counts]
a=[2,4]; b=a; b.append(6); c=a.copy(); c.append(8)
out["s10"]=[a,b,c]
values=[7,11,5]; weights=[1,4,2]
triples=[(i,v,w) for i,(v,w) in enumerate(zip(values,weights,strict=True))]
out["s11"]=[triples,sum(v*w for v,w in zip(values,weights,strict=True)),sum(weights)]

# S12-S16 exact code oracles
pairs=list(product(range(1,7),repeat=2)); hits=[x for x in pairs if sum(x)==8]
out["s12"]=[len(pairs),hits,[len(hits),len(pairs)]]
p={"A":Fraction(3,8),"B":Fraction(1,4),"C":Fraction(3,8)}
out["s13"]=[str(sum(p.values())),str(p["A"]+p["C"]),str(Fraction(1,5)),str(Fraction("0.2")),str(Fraction(0.2))]
B=[x for x in pairs if sum(x)>=10]; AB=[x for x in B if 6 in x]
out["s14"]=[len(B),len(AB),str(Fraction(len(AB),len(B)))]
A=[x for x in pairs if x[0]%2==0]
Odd=[x for x in pairs if sum(x)%2==1]
I=[x for x in pairs if x[0]%2==0 and sum(x)%2==1]
out["s15"]=[str(Fraction(len(A),36)),str(Fraction(len(Odd),36)),str(Fraction(len(I),36)),
            str(Fraction(len(A),36)*Fraction(len(Odd),36))]
pay=[5 if d==6 else -1 for d in range(1,7)]
out["s16"]=[pay,str(sum((Fraction(x,6) for x in pay),Fraction()))]

# S18 explicit validation remains active
def probability(hits,total):
    if total<=0: raise ValueError("total must be positive")
    return hits/total
try:
    probability(0,0)
except Exception as e:
    out["s18"]=[type(e).__name__,str(e)]

# S19 repaired fresh seed/call path
from random import Random
r1=Random(41); r2=Random(41)
x=[r1.random() for _ in range(4)]; y=[r2.random() for _ in range(4)]
same=(x==y); r1.random(); r1.random()
out["s19"]=[same,r1.getstate()==r2.getstate()]

# S21 repaired prescribed run
rng=Random(31415); h=sum(rng.random()<0.4 for _ in range(1200))
out["s21"]=[h,h/1200]

# S22 repaired suffix replay
r=Random(17); first=[r.random() for _ in range(2)]; st=r.getstate()
suffix=[r.random() for _ in range(3)]; r.setstate(st); replay=[r.random() for _ in range(3)]
out["s22"]=[suffix==replay,first==suffix]

# S23 bounded-followup reference witness: one valid learner-chosen diagnostic event is sum9
bugpairs=[(d,d) for d in range(1,7)]
out["s23"]=[len(bugpairs),sum(a+b==9 for a,b in bugpairs),str(Fraction(4,36))]

# S24 synthesis oracle
out["s24"]=[str(Fraction(5,36)),str(Fraction(5,36)*8+Fraction(31,36)*(-2))]
print(json.dumps(out))
`;
const r=spawnSync('python3',['-c',py],{encoding:'utf8'});
assert.equal(r.status,0,r.stderr);
const o=JSON.parse(r.stdout);
assert.equal(o.s01,128);
assert.deepEqual(o.s02.slice(0,2),[4,5]);assert(Math.abs(o.s02[2]-29/6)<1e-15);assert.equal(o.s02[3],false);assert.equal(o.s02[4],true);assert.equal(o.s02[5],true);
assert.equal(o.s04,55);assert.deepEqual(o.s05,[22,4]);
assert(Math.abs(o.s06[0]-.15)<1e-12&&Math.abs(o.s06[1]+.1)<1e-12);
assert.deepEqual(o.s07,[2,true,false]);
assert.deepEqual(o.s08,[ [3,-2,4],5 ]);
assert.deepEqual(o.s09,[['B','G','R'],6,{G:3,R:2,B:1}]);
assert.deepEqual(o.s10,[[2,4,6],[2,4,6],[2,4,6,8]]);
assert.deepEqual(o.s11,[[[0,7,1],[1,11,4],[2,5,2]],61,7]);
assert.equal(o.s12[0],36);assert.equal(o.s12[1].length,5);assert.deepEqual(o.s12[2],[5,36]);
assert.equal(o.s13[0],'1');assert.equal(o.s13[1],'3/4');assert.equal(o.s13[2],'1/5');assert.equal(o.s13[3],'1/5');assert.notEqual(o.s13[4],'1/5');
assert.deepEqual(o.s14,[6,5,'5/6']);
assert.deepEqual(o.s15,['1/2','1/2','1/4','1/4']);
assert.deepEqual(o.s16,[[-1,-1,-1,-1,-1,5],'0']);
assert.deepEqual(o.s18,['ValueError','total must be positive']);
assert.deepEqual(o.s19,[true,false]);
assert.deepEqual(o.s21,[492,0.41]);
assert.equal(o.s22[0],true);assert.equal(o.s22[1],false);
assert.deepEqual(o.s23,[6,0,'1/9']);
assert.deepEqual(o.s24,['5/36','-11/18']);
console.log('PASS M08 independent-repair executable oracles: fresh float/tolerance, callable, container/counting, strict zip, exact probability/expectation, validation, fresh RNG path, replay and synthesis arithmetic.');
