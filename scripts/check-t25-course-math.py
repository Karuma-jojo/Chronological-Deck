"""Independent symbolic/exhaustive spot checks, not a formal proof of all references."""
import json,itertools,math
from fractions import Fraction as F
from pathlib import Path
import sympy as s
x,y,a,r=s.symbols('x y a r',real=True)
checks=[]
def check(label,actual,expected):
    assert s.simplify(actual-expected)==0,(label,actual,expected)
    checks.append(label)
def truth(label,value):
    assert value,label
    checks.append(label)
check('001 cancellation',s.cancel((x*x-4)/(x*x-x-2)),(x+2)/(x+1))
check('001 transfer cancellation',s.cancel((x**3-8)/(x*x-4)),(x*x+2*x+4)/(x+2))
for n in [1,2,7]:
 check(f'015 weighted finite sum n={n}',sum(k*r**k for k in range(1,n+1)),r*(1-(n+1)*r**n+n*r**(n+1))/(1-r)**2)
check('016 mean inequality gap',(a+x)*(1/a+1/x)-4,(a-x)**2/(a*x))
truth('029 binary no-adjacency count',sum(sum(v)==3 and all(not(v[i] and v[i+1]) for i in range(7)) for v in itertools.product([0,1],repeat=8))==20)
truth('BR-N modular count',sum(sum(v)%3==0 for v in itertools.product(range(10),repeat=3))==334)
rolls=list(itertools.product(range(1,7),repeat=2))
check('033 conditional die probability',F(sum(6 in v and sum(v)==8 for v in rolls),sum(sum(v)==8 for v in rolls)),F(2,5))
check('034 Bayes',F(3,10)*F(5,100)/(F(7,10)*F(2,100)+F(3,10)*F(5,100)),F(15,29))
pairs=list(itertools.permutations([1,2,3],2))
check('039 covariance',sum(F(i*j,len(pairs)) for i,j in pairs)-4,F(-1,3))
check('041 hypergeometric',F(math.comb(5,2)*math.comb(7,2),math.comb(12,4)),F(14,33))
check('047 squared deviations',sum((k-4)**2 for k in [1,2,2,5,10]),54)
check('049 Pearson',8/s.sqrt(2*s.Rational(98,3)),4*s.sqrt(3)/7)
A=s.Matrix([[2,1],[1,2]]);P=s.Matrix([[1,1],[1,-1]])
truth('059 diagonalization',A==P*s.diag(3,1)*P.inv())
for n in [0,1,2,5]:truth(f'060 powers n={n}',A**n==s.Matrix([[3**n+1,3**n-1],[3**n-1,3**n+1]])/2)
check('073 parts integral',s.integrate(x*s.exp(x),(x,0,1)),1)
check('076 logarithmic integral',s.integrate(s.log(1+x),(x,0,1)),2*s.log(2)-1)
check('082 clipped mean',s.Rational(1,3)+s.integrate(x/3,(x,0,1)),s.Rational(1,2))
check('087 transformed density mass',s.integrate(1/(3*s.sqrt(x)),(x,0,1))+s.integrate(1/(6*s.sqrt(x)),(x,1,4)),1)
check('090 unfamiliar mean',s.integrate(x*x/2,(x,0,2)),s.Rational(4,3))
check('091 planar mass',s.integrate(2,(x,0,y),(y,0,1)),1)
check('096 Jacobian',s.det(s.Matrix([[y,x],[1-y,-x]])),-x)
check('106 dice maximum mean',sum(F(k*(2*k-1),36) for k in range(1,7)),F(161,36))
check('108 median density mass',s.integrate(30*x*x*(1-x)**2,(x,0,1)),1)
check('108 median mean',s.integrate(30*x**3*(1-x)**2,(x,0,1)),s.Rational(1,2))
check('110 offdiagonal mass',2*s.integrate(2*x,(x,0,y),(y,0,1)),s.Rational(2,3))
check('110 diagonal mass',s.integrate(x*x,(x,0,1)),s.Rational(1,3))
check('131 binomial power',4*s.Rational(3,4)**3*s.Rational(1,4)+s.Rational(3,4)**4,s.Rational(189,256))
check('134 randomized size',s.Rational(1,6)+s.Rational(1,4)*s.Rational(1,3),s.Rational(1,4))
check('134 randomized power',s.Rational(1,2)+s.Rational(1,4)*s.Rational(1,3),s.Rational(7,12))
check('142 sign power',s.Rational(3,10)**6+s.Rational(7,10)**6,s.Rational(118378,1000000))
X=s.Matrix([[1,0],[1,1],[1,2]]);Y=s.Matrix([1,2,2]);coef=(X.T*X).inv()*X.T*Y
truth('143 OLS coefficients',coef==s.Matrix([s.Rational(7,6),s.Rational(1,2)]))
values=[1,2,4,5];means=[F(sum(v),2) for v in itertools.combinations(values,2)]
check('149 WOR variance',sum((v-3)**2 for v in means)/len(means),F(5,6))
check('151 stratified variance',F(4,10)**2*F(9,10)*F(4,4)+F(6,10)**2*F(9,10)*F(9,6),F(63,100))
check('154 HT expectation',F(6+12+24+18,4),15)
check('156 contrast variance',F(5,2)*(F(1,4)+F(4,5)+F(1,6)),F(73,24))
v=[[1,3],[2,5],[4,6]];grand=F(sum(map(sum,v)),6)
total=sum((F(z)-grand)**2 for row in v for z in row)
rowss=2*sum((F(sum(row),2)-grand)**2 for row in v)
colss=3*sum((F(sum(row[j] for row in v),3)-grand)**2 for j in range(2))
check('158 total SS',total,F(35,2));check('158 block SS',rowss,9);check('158 treatment SS',colss,F(49,6));check('158 residual SS',total-rowss-colss,F(1,3))
check('160 Latin residual df p=2',(2-1)*(2-2),0)
check('161 A effect',F(3+11-1-5,2),4);check('161 B effect',F(5+11-1-3,2),6);check('161 interaction',F(1+11-3-5,2),2)
check('162 error MS',F(16,4*(3-1)),2)
# Bind checks to key text for especially consequential numerical references.
keys=json.loads(Path('course/generated/evaluator.json').read_text())
for key,fragment in [('T25-039-M','−1/3'),('T25-041-M','14/33'),('T25-106-T','161/36'),('T25-134-M','7/12'),('T25-158-M','49/6'),('T25-160-T','zero')]:
 truth(f'{key} checked result present',fragment in keys[key]['reference'])
report={'status':'passed','checks':len(checks),'coverage':'Selected independently recomputed identities, counts, probabilities, matrix results and ANOVA values. Not a proof audit of all361 tasks.','items':checks}
Path('course/generated/math-validation.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'PASS: {len(checks)} symbolic/exhaustive numerical checks. Not all-reference certification.')
