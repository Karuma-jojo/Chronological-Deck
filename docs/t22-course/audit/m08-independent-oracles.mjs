import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const py=String.raw`
import json, math, random
from fractions import Fraction
from itertools import product
from random import Random
out={}

# S01 assignment/state
cash=120; fee=7; cash=cash-fee; cash=cash+15
out["s01"]=cash

# S02 division + explicit tolerance policy
out["s02"]=[29//6,29%6,29/6,(0.2+0.4==0.6),math.isclose(0.2+0.4,0.6,rel_tol=1e-12,abs_tol=1e-12),math.isclose(1e-12,0.0,rel_tol=0.0,abs_tol=1e-10)]

# S03 exact-integer boundary branching
def classify(x):
    if x<0: return "decrease"
    elif x==0: return "unchanged"
    return "increase"
out["s03"]=[classify(x) for x in [-3,0,4]]

# S04/S05 loops
total=0
for k in range(1,6): total += k*k
out["s04"]=total
bank=10; rounds=0
while bank<20:
    bank+=3; rounds+=1
out["s05"]=[bank,rounds]

# S06 functions
def relative_change(start,end): return (end-start)/start
out["s06"]=[relative_change(80,92),relative_change(50,45)]

# S07 function objects
def is_large(x): return x>=10
def count_event(xs,predicate):
    hits=0
    for x in xs:
        if predicate(x): hits+=1
    return hits
out["s07"]=[count_event([4,10,13,2],is_large),is_large(10)]

# S08 tuple records inside growing list
records=[('A',2),('B',-3),('C',5)]
t1=sum(payoff for _,payoff in records)
records.append(('D',1))
t2=sum(payoff for _,payoff in records)
out["s08"]=[t1,t2]

# S09 set/dict multiplicity
obs=['G','R','G','B','G','R']
counts={}
for label in obs:
    counts[label]=counts.get(label,0)+1
out["s09"]=[len(set(obs)),len(obs),counts]

# S10 alias/copy
a=[2,4]; b=a; b.append(6); c=a.copy(); c.append(8)
out["s10"]=[a,b,c]

# S11 strict pairing
values=[10,12,9]; weights=[2,1,3]
weighted=0; weight_total=0; triples=[]
for i,(v,w) in enumerate(zip(values,weights,strict=True)):
    weighted+=v*w; weight_total+=w; triples.append((i,v,w))
strict_failed=False
try:
    list(zip([10,12,9],[2,1],strict=True))
except ValueError:
    strict_failed=True
out["s11"]=[weighted,weight_total,triples,strict_failed]

# S12 exact Cartesian oracle
pairs=list(product(range(1,7),repeat=2))
hits=[x for x in pairs if sum(x)==8]
out["s12"]=[len(pairs),hits,str(Fraction(len(hits),len(pairs)))]

# S13 exact Fractions
A=Fraction(1,6); B=Fraction(1,3); C=Fraction(1,2)
out["s13"]=[str(A+B+C),str(A+B),str(Fraction(3,10)),str(Fraction("0.3")),str(Fraction(0.3))]

# S14 conditioning by filtering
Bset=[x for x in pairs if x[0]+x[1]<=4]
AB=[x for x in Bset if x[0]==1]
out["s14"]=[len(Bset),len(AB),str(Fraction(len(AB),len(Bset)))]

# S15 exact independence by enumeration
Aset=[x for x in pairs if x[0]%2==0]
Bset2=[x for x in pairs if x[1]>=5]
I=[x for x in pairs if x[0]%2==0 and x[1]>=5]
out["s15"]=[str(Fraction(len(Aset),36)),str(Fraction(len(Bset2),36)),str(Fraction(len(I),36)),str(Fraction(len(Aset),36)*Fraction(len(Bset2),36))]

# S16 coded payoff expectation
payoffs=[5 if face==4 else -1 for face in range(1,5)]
out["s16"]=[payoffs,str(sum(map(Fraction,payoffs))/4)]

# S17 known-case invariant
hits_even=count_event([1,2,3,4,5,6],lambda x:x%2==0)
out["s17"]=[hits_even,0<=hits_even<=6,(5>=5),(5>5)]

# S18 failing operations and explicit validation
zero_type=None
try:
    0/0
except Exception as e:
    zero_type=type(e).__name__
def probability(hits,total):
    if total<=0: raise ValueError("total must be positive")
    return hits/total
value_type=None
try:
    probability(0,0)
except Exception as e:
    value_type=type(e).__name__
idx_type=None
xs=[4,7,9]
try:
    xs[3]
except Exception as e:
    idx_type=type(e).__name__
out["s18"]=[zero_type,value_type,idx_type]

# S19 explicit RNG state/call path
r1=Random(23); r2=Random(23)
x=[r1.random() for _ in range(3)]; y=[r2.random() for _ in range(3)]
same=(x==y); r1.random(); next_equal=(r1.random()==r2.random())
out["s19"]=[same,next_equal]

# S20 Bernoulli semantics
def bernoulli(rng,p):
    if not 0<=p<=1: raise ValueError
    return rng.random()<p
out["s20"]=[all(not bernoulli(Random(i),0.0) for i in range(20)),all(bernoulli(Random(i),1.0) for i in range(20))]

# S21 fixed documented random() path
rng=Random(2026); h=sum(bernoulli(rng,Fraction(1,3)) for _ in range(1000))
out["s21"]=[h,h/1000]

# S22 state replay of three-value suffix
r=Random(31)
prefix=[r.random() for _ in range(2)]
st=r.getstate()
suffix1=[r.random() for _ in range(3)]
r.setstate(st)
suffix2=[r.random() for _ in range(3)]
out["s22"]=[suffix1==suffix2,prefix==suffix1]

# S23 support bug
bugpairs=[(d,d) for d in range(1,7)]
out["s23"]=[len(bugpairs),sum(a+b==7 for a,b in bugpairs),str(Fraction(6,36))]

# S24 synthesis oracle
out["s24"]=[str(Fraction(5,36)),str(Fraction(5,36)*8+Fraction(31,36)*(-2))]

print(json.dumps(out))
`;

const r=spawnSync('python3',['-c',py],{encoding:'utf8'});
assert.equal(r.status,0,r.stderr);
const o=JSON.parse(r.stdout);
assert.equal(o.s01,128);
assert.deepEqual(o.s02.slice(0,2),[4,5]); assert.equal(o.s02[3],false); assert.equal(o.s02[4],true); assert.equal(o.s02[5],true);
assert.deepEqual(o.s03,['decrease','unchanged','increase']);
assert.equal(o.s04,55); assert.deepEqual(o.s05,[22,4]);
assert(Math.abs(o.s06[0]-.15)<1e-12&&Math.abs(o.s06[1]+.1)<1e-12);
assert.deepEqual(o.s07,[2,true]);
assert.deepEqual(o.s08,[4,5]);
assert.equal(o.s09[0],3); assert.equal(o.s09[1],6); assert.deepEqual(o.s09[2],{G:3,R:2,B:1});
assert.deepEqual(o.s10,[[2,4,6],[2,4,6],[2,4,6,8]]);
assert.equal(o.s11[0],59); assert.equal(o.s11[1],6); assert.equal(o.s11[3],true);
assert.equal(o.s12[0],36); assert.equal(o.s12[1].length,5); assert.equal(o.s12[2],'5/36');
assert.deepEqual(o.s13.slice(0,4),['1','1/2','3/10','3/10']); assert.notEqual(o.s13[4],'3/10');
assert.deepEqual(o.s14,[6,3,'1/2']);
assert.deepEqual(o.s15,['1/2','1/3','1/6','1/6']);
assert.deepEqual(o.s16,[[-1,-1,-1,5],'1/2']);
assert.deepEqual(o.s17,[3,true,true,false]);
assert.deepEqual(o.s18,['ZeroDivisionError','ValueError','IndexError']);
assert.equal(o.s19[0],true); assert.equal(o.s19[1],false);
assert.deepEqual(o.s20,[true,true]);
assert.deepEqual(o.s21,[322,0.322]);
assert.deepEqual(o.s22,[true,false]);
assert.deepEqual(o.s23,[6,0,'1/6']);
assert.deepEqual(o.s24,['5/36','-11/18']);
console.log('PASS M08 independent executable oracles: repaired Python tasks cover imports/tolerances, callable predicates, container mutation/counting, strict zip, exact finite oracles, traceback/validation, explicit RNG state, reproducible simulation and synthesis arithmetic.');
