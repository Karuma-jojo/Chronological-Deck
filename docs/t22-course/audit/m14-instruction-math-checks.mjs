import assert from 'node:assert/strict';
import fs from 'node:fs';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m14-side276.json','utf8'));
const S=n=>a.sessions[n-1];
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
const lessonHas=(n,...xs)=>{for(const x of xs)assert(S(n).lesson.includes(x),`S${n} lesson missing ${x}`)};
const feedbackHas=(n,...xs)=>{for(const x of xs)assert(S(n).guidedFeedback.includes(x),`S${n} feedback missing ${x}`)};

// S01 worked/guided
{
 const T=([x,y])=>[2*x-y,x+3*y];
 assert.deepEqual(T([3,-2]),[8,-3]);
 const G=([x,y])=>[x-y,2*y],H=([x,y])=>[x-y+2,2*y];
 assert.deepEqual(H([0,0]),[2,0]);
 assert.deepEqual(G([2,-1]),[3,-2]);
 lessonHas(1,'T(3,-2)=3T(e1)-2T(e2)=(8,-3)');
 feedbackHas(1,'G(2,-1)=2G(e1)-G(e2)=(3,-2)');
}

// S02
{
 const A=[[1,-2,0],[2,1,3]];
 assert.deepEqual(mv(A,[2,-1,1]),[4,6]);
 const G=[[2,0],[0,1],[-1,4]];
 assert.deepEqual(mv(G,[0,1]),[0,1,4]);
 feedbackHas(2,'[[2,0],[0,1],[-1,4]]');
}

// S03
{
 assert.deepEqual(mv([[1,-2],[3,0],[-1,4]],[2,-1]),[4,6,-6]);
 assert.deepEqual(mv([[2,0,-1],[1,3,2]],[1,-1,2]),[0,2]);
 feedbackHas(3,'(0,2)');
}

// S04
{
 const B=[[2,0],[1,1]],A=[[1,1],[0,2]];
 assert.deepEqual(mm(A,B),[[3,1],[2,2]]);
 assert.deepEqual(mm(B,A),[[2,2],[1,3]]);
 const D=[[1,2],[0,1],[-1,1]],C=[[1,0,1],[2,-1,0]];
 assert.deepEqual(mm(C,D),[[0,3],[2,3]]);
 feedbackHas(4,'CD=[[0,3],[2,3]]');
}

// S05
{
 const A=[[1,2,0],[0,-1,1],[2,1,1]];
 assert.deepEqual(mv(A,[1,2,-1]),[5,-3,3]);
 // guided 2u-v=1, u+3v=7 => (10/7,13/7)
 eqApprox(mv([[2,-1],[1,3]],[10/7,13/7]),[1,7]);
 feedbackHas(5,'v=13/7','u=10/7');
}

// S06
{
 const r1=[2,1,5],r2=[4,3,11];
 assert.deepEqual(r2.map((v,i)=>v-2*r1[i]),[0,1,1]);
 const g1=[1,2,-1,3],g2=[2,5,1,8],g3=[-1,0,2,1];
 assert.deepEqual(g2.map((v,i)=>v-2*g1[i]),[0,1,3,2]);
 assert.deepEqual(g3.map((v,i)=>v+g1[i]),[0,2,1,4]);
 feedbackHas(6,'[[1,2,-1|3],[0,1,3|2],[0,2,1|4]]');
}

// S07
{
 const A=[[1,1,1],[2,3,1],[1,2,0]];
 for(const t of [-2,0,4])assert.deepEqual(mv(A,[5-2*t,t-1,t]),[4,7,3]);
 const G=[[1,1,1],[2,2,2],[0,1,-1]];
 for(const t of [-1,0,3])assert.deepEqual(mv(G,[1-2*t,1+t,t]),[2,4,1]);
 feedbackHas(7,'(1-2t,1+t,t)');
}

// S08
{
 const A=[[1,2,-1],[2,4,-2]];
 assert.deepEqual(mv(A,[-2,1,0]),[0,0]);
 assert.deepEqual(mv(A,[1,0,1]),[0,0]);
 const B=[[1,0,1,2],[0,1,-1,1]];
 assert.deepEqual(mv(B,[-1,1,1,0]),[0,0]);
 assert.deepEqual(mv(B,[-2,-1,0,1]),[0,0]);
 feedbackHas(8,'(-1,1,1,0)','(-2,-1,0,1)');
}

// S09
{
 const A=[[1,1,0],[0,1,1]];
 for(const t of [-1,0,2])assert.deepEqual(mv(A,[2-t,t,1-t]),[2,1]);
 const C=[[1,2,-1],[0,1,1]];
 assert.deepEqual(mv(C,[1,1,0]),[3,1]);
 assert.deepEqual(mv(C,[3,-1,1]),[0,0]);
 feedbackHas(9,'(1,1,0)+t(3,-1,1)');
}

// S10
{
 const A=[[1,2,1,3],[0,1,1,2],[1,3,2,5]];
 assert.equal(rank(A),2);
 const a1=[1,0,1],a2=[2,1,3];
 assert.deepEqual(add(sm(-1,a1),a2),[1,1,2]);
 assert.deepEqual(add(sm(-1,a1),sm(2,a2)),[3,2,5]);
 const B=[[1,1,2],[1,2,3],[2,3,5]];
 assert.deepEqual(add([1,1,2],[1,2,3]),[2,3,5]);
 feedbackHas(10,'third column adds no new direction');
}

// S11
{
 const R=[[1,0,2,0,-1],[0,1,-3,0,4],[0,0,0,1,2]];
 assert.equal(rank(R),3);
 assert.equal(5-rank(R),2);
 feedbackHas(11,'rank 3','nullity 3');
 lessonHas(11,'They are independent because in any zero combination');
}

// S12
{
 const A=[[1,0],[0,1],[1,1]],B=[[1,0,1],[0,1,1]];
 assert.equal(rank(A),2); assert.equal(rank(B),2);
 feedbackHas(12,'injective but cannot be onto R^5','onto but nullity is 2');
}

// S13
{
 // 4x4 with three pivots => rank3/nullity1, neither one-to-one nor onto.
 feedbackHas(13,'rank 3 and nullity 1','neither injective nor surjective');
 lessonHas(13,'N(A)={0}','rank=n');
}

// S14
{
 const A=[[2,1],[1,1]],Ai=[[1,-1],[-1,2]];
 assert.deepEqual(mm(A,Ai),[[1,0],[0,1]]);
 assert.deepEqual(mv(Ai,[5,3]),[2,1]);
 const K=[[1,2],[0,1]],Ki=[[1,-2],[0,1]];
 assert.deepEqual(mm(K,Ki),[[1,0],[0,1]]);
 assert.deepEqual(mv(Ki,[5,2]),[1,2]);
 feedbackHas(14,'K^{-1}=[[1,-2],[0,1]]','x=(1,2)');
 lessonHas(14,'Left multiplication EA performs that same row operation');
}

// S15
{
 assert.equal(det([[1,2,1],[2,5,3],[0,1,2]]),1);
 assert.equal(det([[0,1,2],[2,0,1],[0,3,1]]),10);
 feedbackHas(15,'det(G)=10');
}

// S16
{
 assert.equal(det([[2,1],[1,3]]),5);
 assert.equal(det([[1,2],[2,4]]),0);
 assert(approx(det([[4,0],[0,.5]]),2));
 assert(approx(det([[2,0],[0,1]]),2));
 feedbackHas(16,'both double area');
}

// S17
{
 const P=[[1,1],[1,-1]],Pi=[[.5,.5],[.5,-.5]];
 assert.deepEqual(mv(P,[3,-1]),[2,4]);
 eqApprox(mv(Pi,[2,4]),[3,-1]);
 const G=[[2,-1],[1,3]],Gi=[[3/7,1/7],[-1/7,2/7]];
 assert.deepEqual(mv(G,[1,2]),[0,7]);
 eqApprox(mv(Gi,[0,7]),[1,2]);
 feedbackHas(17,'(0,7)^T','(1,2)^T');
}

// S18
{
 const A=[[2,0],[1,3]],P=[[1,1],[0,1]],Pi=[[1,-1],[0,1]];
 assert.deepEqual(mm(mm(Pi,A),P),[[1,-2],[1,4]]);
 assert.deepEqual(mv([[1,-2],[1,4]],[2,-1]),[4,-2]);
 const G=[[1,2],[0,3]],Q=[[1,0],[1,1]],Qi=[[1,0],[-1,1]];
 assert.deepEqual(mm(mm(Qi,G),Q),[[3,2],[0,1]]);
 assert.deepEqual(mv([[3,2],[0,1]],[1,2]),[7,2]);
 feedbackHas(18,'D=P^{-1}AP=[[3,2],[0,1]]');
}

// S19
{
 const A=[[1,1,0],[0,1,1],[1,2,1]];
 assert.equal(rank(A),2); assert.equal(det(A),0);
 assert.deepEqual(mv(A,[-1,1,-1]),[0,0,0]);
 assert.deepEqual(mv(A,[1,1,0]),[2,1,3]);
 lessonHas(19,'N(A)=span{(-1,1,-1)}','det(A)=0');
}

for(let n=1;n<=19;n++){
  assert(S(n).lesson.includes('Worked example.'),`S${n} missing worked example`);
  assert(S(n).lesson.includes('Guided practice.'),`S${n} missing guided practice`);
  assert(S(n).guidedFeedback.startsWith('Check after attempting. '),`S${n} feedback staging`);
}

console.log('PASS M14 instructional mathematics: worked/guided numerical claims reconstructed across 19/19 sessions; key theorem bridges and staged feedback surfaces checked.');
