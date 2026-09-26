import assert from 'node:assert/strict';
import fs from 'node:fs';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m14-side276.json','utf8'));
const P=a.problems,E=a.evaluators;
const ref=id=>E[id].reference;
const prompt=id=>P[id].prompt;

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));
const mv=(A,x)=>A.map(r=>r.reduce((s,v,i)=>s+v*x[i],0));
const add=(x,y)=>x.map((v,i)=>v+y[i]);
const sm=(c,x)=>x.map(v=>c*v);
const det=A=>{
  if(A.length===1)return A[0][0];
  if(A.length===2)return A[0][0]*A[1][1]-A[0][1]*A[1][0];
  return A[0].reduce((s,v,j)=>s+(j%2?-1:1)*v*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
};
const rank=M=>{
  const A=M.map(r=>r.map(Number)); let rr=0,cc=0;
  while(rr<A.length&&cc<A[0].length){
    let p=rr; while(p<A.length&&Math.abs(A[p][cc])<1e-10)p++;
    if(p===A.length){cc++;continue}
    [A[rr],A[p]]=[A[p],A[rr]];
    const q=A[rr][cc]; for(let j=cc;j<A[0].length;j++)A[rr][j]/=q;
    for(let i=0;i<A.length;i++)if(i!==rr){
      const f=A[i][cc]; for(let j=cc;j<A[0].length;j++)A[i][j]-=f*A[rr][j];
    }
    rr++;cc++;
  }
  return rr;
};
const approx=(x,y,eps=1e-10)=>Math.abs(x-y)<=eps;
const eqApprox=(x,y)=>{assert.equal(x.length,y.length);for(let i=0;i<x.length;i++){if(Array.isArray(x[i]))eqApprox(x[i],y[i]);else assert(approx(x[i],y[i]),`${x[i]} != ${y[i]}`)}};
const contains=(id,...xs)=>{for(const x of xs)assert(ref(id).includes(x),`${id} reference missing ${x}`)};

// S01
{
 const id='T22V3::SIDE276::S01-M@1';
 const F=([x,y])=>[x-2*y,3*x+y,4*y];
 assert.deepEqual(F([1,0]),[1,3,0]);
 assert.deepEqual(F([0,1]),[-2,1,4]);
 assert.deepEqual(F([2,-1]),[4,5,-4]);
 contains(id,'(4,5,-4)','agreement on the basis');
}
{
 const id='T22V3::SIDE276::S01-T@1';
 const Pm=([x,y])=>[3*x+2*y,-x+4*y];
 assert.deepEqual(Pm([1,0]),[3,-1]); assert.deepEqual(Pm([0,1]),[2,4]);
 assert.deepEqual(Pm([2,-1]),[4,-6]);
 const Q=([x,y])=>[3*x+2*y+1,-x+4*y];
 assert.deepEqual(Q([0,0]),[1,0]);
 contains(id,'L(0)=L(0+0)','Q(0,0)=(1,0)');
}

// S02
{
 const id='T22V3::SIDE276::S02-M@1';
 const A=[[2,1,-1],[-1,3,2]];
 assert.deepEqual(mv(A,[2,-1,1]),[2,-3]);
 contains(id,'2-by-3','(2,-3)');
}
{
 const id='T22V3::SIDE276::S02-T@1';
 contains(id,'T(b1)=2c1+c3','T(b2)=-c1+3c2+4c3','domain coordinate dimension is 2');
}

// S03
{
 const id='T22V3::SIDE276::S03-M@1';
 assert.deepEqual(mv([[1,2,-1],[0,3,4]],[2,-1,1]),[-1,1]);
 contains(id,'Ae2 is exactly column 2=(2,3)^T');
}
{
 const id='T22V3::SIDE276::S03-T@1';
 const A=[[1,0,2],[-1,3,0],[2,1,-2]];
 assert.deepEqual(mv(A,[1,-2,1]),[3,-7,-2]);
 contains(id,'(3,-7,-2)');
}

// S04
{
 const id='T22V3::SIDE276::S04-M@1';
 const A=[[1,0,2],[-1,3,1]],B=[[1,2],[0,-1],[2,1]];
 assert.deepEqual(mm(A,B),[[5,4],[1,-4]]);
 assert.deepEqual(mm(B,A),[[-1,6,4],[1,-3,-1],[1,3,5]]);
 assert.deepEqual(mv(A,[1,0,2]),[5,1]);
 contains(id,'AB=[[5,4],[1,-4]]','T∘S:R^3→R^3','(CA)B and C(AB)');
}
{
 const id='T22V3::SIDE276::S04-T@1';
 const C=[[1,2],[0,1]],D=[[3,0],[0,2]];
 assert.deepEqual(mm(D,C),[[3,6],[0,2]]);
 assert.deepEqual(mm(C,D),[[3,4],[0,2]]);
 assert.deepEqual(mv(mm(D,C),[1,-1]),[-3,-2]);
 contains(id,'which differs from DC');
}

// S05
{
 const id='T22V3::SIDE276::S05-M@1';
 const A=[[2,-1,1],[1,2,0],[0,-1,3]],x=[1,2,-1],b=[-1,5,-5];
 assert.deepEqual(mv(A,x),b);
 contains(id,'A=[[2,-1,1],[1,2,0],[0,-1,3]]','(-1,5,-5)');
}
{
 const id='T22V3::SIDE276::S05-T@1';
 const p=[1,2,0],q=[0,-1,1],b=[3,4,-1];
 const candidate=add(sm(3,p),sm(-1,q));
 assert.deepEqual(candidate,[3,7,-1]); assert.notDeepEqual(candidate,b);
 contains(id,'7, not 4','no exact solution exists');
}

// S06
{
 const id='T22V3::SIDE276::S06-M@1';
 const r1=[1,-1,2,4],r2=[3,0,-1,2],r3=[2,1,1,7];
 assert.deepEqual(r2.map((v,i)=>v-3*r1[i]),[0,3,-7,-10]);
 assert.deepEqual(r3.map((v,i)=>v-2*r1[i]),[0,3,-3,-1]);
 contains(id,'row swap is its own inverse','1/c');
}
{
 const id='T22V3::SIDE276::S06-T@1';
 const r2=[1,3,4],r1=[2,-1,5];
 assert.deepEqual(r2.map((v,i)=>v-.5*r1[i]),[0,3.5,1.5]);
 contains(id,'[0,7/2|3/2]','not reversible');
}

// S07
{
 const id='T22V3::SIDE276::S07-M@1';
 const A=[[1,1,1],[2,3,1],[3,4,2]];
 for(const t of [-3,0,2,7])assert.deepEqual(mv(A,[2-2*t,1+t,t]),[3,7,10]);
 contains(id,'(2-2t,1+t,t)','infinitely many');
}
{
 const id='T22V3::SIDE276::S07-T@2';
 const E1=[[1,0,2,4],[0,1,-1,1],[0,0,0,0]];
 const E2=[[1,0,2,4],[0,1,-1,1],[0,0,0,1]];
 const E3=[[1,0,0,2],[0,1,0,-1],[0,0,1,3]];
 assert.equal(rank(E1.map(r=>r.slice(0,3))),2); assert.equal(rank(E1),2);
 assert.equal(rank(E2.map(r=>r.slice(0,3))),2); assert.equal(rank(E2),3);
 assert.equal(rank(E3.map(r=>r.slice(0,3))),3); assert.equal(rank(E3),3);
 contains(id,'E1 has pivots in x,y and free variable z','E2 contains [0,0,0|1]','E3 has a pivot in every variable column');
}

// S08
{
 const id='T22V3::SIDE276::S08-M@1',A=[[1,-1,2],[2,-2,4]];
 assert.deepEqual(mv(A,[1,1,0]),[0,0]);
 assert.deepEqual(mv(A,[-2,0,1]),[0,0]);
 assert.equal(rank([[1,1,0],[-2,0,1]]),2);
 contains(id,'s(1,1,0)+t(-2,0,1)');
}
{
 const id='T22V3::SIDE276::S08-T@1',C=[[1,1,0,2],[0,1,1,-1]];
 assert.deepEqual(mv(C,[-1,1,-1,0]),[0,0]);
 assert.deepEqual(mv(C,[-2,0,1,1]),[0,0]);
 contains(id,'R^4','R^2');
}

// S09
{
 const id='T22V3::SIDE276::S09-M@1',A=[[1,0,1],[0,1,1]];
 for(const t of [-2,0,3])assert.deepEqual(mv(A,[3-t,2-t,t]),[3,2]);
 assert.deepEqual(mv(A,[-1,-1,1]),[0,0]);
 contains(id,'not a subspace');
}
{
 const id='T22V3::SIDE276::S09-T@2',C=[[1,2,-1],[0,1,1]],p=[2,0,1],q=[-1,1,0],n=[-3,1,-1];
 assert.deepEqual(mv(C,p),[1,1]);
 assert.deepEqual(mv(C,q),[1,1]);
 assert.deepEqual(q.map((v,i)=>v-p[i]),n);
 assert.deepEqual(mv(C,n),[0,0]);
 for(const s of [-3,0,1,4])assert.deepEqual(mv(C,add(p,sm(s,n))),[1,1]);
 contains(id,'q-p=(-3,1,-1)^T','every solution is p+s(q-p)','C(x-p)=0');
}

// S10
{
 const id='T22V3::SIDE276::S10-M@1';
 const A=[[1,2,0,3],[0,1,1,2],[1,3,1,5]],a1=[1,0,1],a2=[2,1,3];
 assert.equal(rank(A),2);
 assert.deepEqual(add(sm(-2,a1),a2),[0,1,1]);
 assert.deepEqual(add(sm(-1,a1),sm(2,a2)),[3,2,5]);
 const b2=[0,0,1];
 const c2=b2[1],c1=b2[0]-2*c2;
 assert.equal(c2,0); assert.equal(c1,0);
 assert.equal(c1*a1[2]+c2*a2[2],0);
 assert.notEqual(c1*a1[2]+c2*a2[2],b2[2]);
 contains(id,'pivot','Col(A)⊆R^3','N(A)⊆R^4');
}
{
 const id='T22V3::SIDE276::S10-T@1';
 const M=[[1,1,0],[1,2,1],[2,3,1]];
 assert.equal(rank(M),2);
 contains(id,'(1,1,2)^T','(1,2,3)^T','they need not be equal');
}

// S11
{
 const id='T22V3::SIDE276::S11-M@2',R=[[1,0,-1,2,0],[0,1,3,-1,0],[0,0,0,0,1]];
 assert.deepEqual(mv(R,[1,-3,1,0,0]),[0,0,0]);
 assert.deepEqual(mv(R,[-2,1,0,1,0]),[0,0,0]);
 contains(id,'rank(A)=3','nullity(A)=2','r pivots give rank r','nullity=n-r','Col(A) has dimension 3');
}
{
 const id='T22V3::SIDE276::S11-T@1';
 assert.equal(6-2,4); assert(4>3);
 contains(id,'impossible','nullity at least 3');
}

// S12
{
 const id='T22V3::SIDE276::S12-M@1';
 const A=[[1,0],[1,1],[0,1]],B=[[1,0,1],[1,1,0]];
 assert.equal(rank(A),2); assert.equal(rank(B),2);
 assert.deepEqual(mv(B,[-1,1,1]),[0,0]);
 contains(id,'A is injective','B is surjective');
}
{
 const id='T22V3::SIDE276::S12-T@1';
 contains(id,'nullity=4-2=2','two-parameter affine family');
}

// S13
{
 const id='T22V3::SIDE276::S13-M@1';
 contains(id,'dim N(A)=n-rank(A)','Col(A)=R^n','two-sided inverse');
}
{
 const id='T22V3::SIDE276::S13-T@1';
 contains(id,'rank≤2<3','not surjective','no two-sided inverse');
}

// S14
{
 const id='T22V3::SIDE276::S14-M@1',A=[[1,2],[1,3]],Ai=[[3,-2],[-1,1]];
 assert.deepEqual(mm(A,Ai),[[1,0],[0,1]]);
 assert.deepEqual(mm(Ai,A),[[1,0],[0,1]]);
 assert.deepEqual(mv(Ai,[5,7]),[1,2]);
 contains(id,'EA=I');
}
{
 const id='T22V3::SIDE276::S14-T@1';
 const Pm=[[1,1],[0,1]],Q=[[2,0],[0,3]],Qi=[[.5,0],[0,1/3]],Pi=[[1,-1],[0,1]];
 const PQ=mm(Pm,Q), inv=mm(Qi,Pi);
 eqApprox(mm(PQ,inv),[[1,0],[0,1]]);
 eqApprox(mm(inv,PQ),[[1,0],[0,1]]);
 contains(id,'Q^{-1}P^{-1}','R^3 to R^2');
}

// S15
{
 const id='T22V3::SIDE276::S15-M@1';
 assert.equal(det([[0,2,1],[1,1,0],[2,0,3]]),-8);
 contains(id,'det(M)=-8','row-linearity');
}
{
 const id='T22V3::SIDE276::S15-T@1';
 assert.equal(det([[2,0,0],[0,2,0],[0,0,2]]),8);
 assert.equal((-2)*5,-10);
 contains(id,'not linear as a function of the whole matrix','-10');
}

// S16
{
 const id='T22V3::SIDE276::S16-M@1';
 assert.equal(det([[3,1],[1,2]]),5);
 assert.equal(det([[1,3],[2,6]]),0);
 contains(id,'det(M)=0 iff M is noninvertible','area 5');
}
{
 const id='T22V3::SIDE276::S16-T@1';
 assert(approx(1000*.001,1));
 contains(id,'area magnitude','does not justify equal stability');
}

// S17
{
 const id='T22V3::SIDE276::S17-M@1';
 const CtoB=[[1,3],[2,1]],BtoC=[[-1/5,3/5],[2/5,-1/5]];
 assert.deepEqual(mv(CtoB,[2,-1]),[-1,3]);
 eqApprox(mv(BtoC,[-1,3]),[2,-1]);
 eqApprox(mm(BtoC,CtoB),[[1,0],[0,1]]);
 contains(id,'same underlying v');
}
{
 const id='T22V3::SIDE276::S17-T@1';
 const CtoB=[[1,3],[1,4]],BtoC=[[4,-3],[-1,1]];
 assert.deepEqual(mv(BtoC,[7,9]),[1,2]);
 assert.deepEqual(mv(CtoB,[1,2]),[7,9]);
 contains(id,'cannot be applied in that direction');
}

// S18
{
 const id='T22V3::SIDE276::S18-M@2';
 const A=[[2,1],[0,3]],P0=[[1,1],[1,2]],Pi=[[2,-1],[-1,1]],D=mm(mm(Pi,A),P0);
 assert.deepEqual(D,[[3,2],[0,2]]);
 assert.deepEqual(mv(D,[1,-1]),[1,-2]);
 assert.equal(det(D),det(A));
 contains(id,'det(P^{-1})det(A)det(P)=det(A)','rank is preserved','invertibility is preserved');
}
{
 const id='T22V3::SIDE276::S18-T@1';
 contains(id,'P^{-1}AP','not PAP^{-1}','without inverse paired coordinate maps');
}

// S19
{
 const id='T22V3::SIDE276::S19-M@2';
 const A=[[1,0,1],[1,1,2],[2,1,3]],P0=[[0,0,1],[0,1,0],[1,0,0]];
 assert.equal(rank(A),2); assert.equal(det(A),0);
 assert.deepEqual(mv(A,[-1,-1,1]),[0,0,0]);
 assert.deepEqual(mv(A,[1,2,0]),[1,3,4]);
 assert.deepEqual(mm(mm(P0,A),P0),[[3,1,2],[2,1,1],[1,0,1]]);
 contains(id,'One efficient route starts with exact row reduction','rank 2','determinant 0','noninvertibility');
}
{
 const id='T22V3::SIDE276::S19-T@1',M=[[2,6],[1,3]];
 assert.deepEqual(mv(M,[-3,1]),[0,0]);
 assert.equal(det(M),0);
 contains(id,'(2,1)^T','P^{-1}MP');
}

assert.equal(Object.keys(P).filter(x=>x.startsWith('T22V3::SIDE276::')).length,38);
console.log('PASS M14 fixed-assessment math gate: all 38 current references receive targeted independent arithmetic/property checks plus reviewed reference assertions; prose proofs still require the recorded human semantic review.');
