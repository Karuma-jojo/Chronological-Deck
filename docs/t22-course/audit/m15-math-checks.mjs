import assert from 'node:assert/strict';
import fs from 'node:fs';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m15-side278.json','utf8'));
const eps=1e-10;
const approx=(x,y,m='')=>assert(Math.abs(x-y)<eps,`${m}: ${x} != ${y}`);
const arrApprox=(x,y,m='')=>{assert.equal(x.length,y.length,m);for(let i=0;i<x.length;i++)approx(x[i],y[i],m+'['+i+']');};
const dot=(x,y)=>x.reduce((s,v,i)=>s+v*y[i],0);
const norm2=x=>dot(x,x);
const add=(x,y)=>x.map((v,i)=>v+y[i]);
const sub=(x,y)=>x.map((v,i)=>v-y[i]);
const scale=(c,x)=>x.map(v=>c*v);
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mv=(A,x)=>A.map(r=>dot(r,x));
const mm=(A,B)=>A.map(r=>T(B).map(c=>dot(r,c)));
const inv2=A=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];assert(Math.abs(d)>eps);return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];};
const proj=(v,u)=>scale(dot(v,u)/dot(u,u),u);
const ref=n=>a.evaluators[a.sessions[n-1].main].reference;
const tref=n=>a.evaluators[a.sessions[n-1].transfer].reference;

// S01 — orthogonality / normalization / zero boundary.
{
 const u1=[1,1,0],u2=[1,-1,0],u3=[0,0,3];
 assert.equal(dot(u1,u2),0);assert.equal(dot(u1,u3),0);assert.equal(dot(u2,u3),0);
 approx(norm2(u1),2);approx(norm2(u2),2);approx(norm2(u3),9);
 assert.match(ref(1),/sqrt\(2\).*sqrt\(2\).*3/);
 assert.match(tref(1),/z3=0/);
}

// S02 — ON coefficients / finite Parseval.
{
 const q1=[1,0,0],q2=[0,3/5,4/5],q3=[0,4/5,-3/5],v=[2,5,0];
 const c=[dot(v,q1),dot(v,q2),dot(v,q3)];
 arrApprox(c,[2,3,4]);arrApprox(add(add(scale(c[0],q1),scale(c[1],q2)),scale(c[2],q3)),v);
 approx(norm2(v),c.reduce((s,z)=>s+z*z,0));
}

// S03 — complement basis.
{
 const w1=[1,1,0],w2=[0,1,1],z=[1,-1,1];
 assert.equal(dot(z,w1),0);assert.equal(dot(z,w2),0);
 const u1=[1,1,0,0],u2=[0,0,0,1],c1=[1,-1,0,0],c2=[0,0,1,0];
 assert.equal(dot(c1,u1),0);assert.equal(dot(c1,u2),0);assert.equal(dot(c2,u1),0);assert.equal(dot(c2,u2),0);
}

// S04 — concrete orthogonal decomposition / uniqueness witness.
{
 const p=[2,2,2],r=[1,-1,0],v=[3,1,2],w1=[1,1,0],w2=[0,0,1];
 arrApprox(add(p,r),v);assert.equal(dot(r,w1),0);assert.equal(dot(r,w2),0);
}

// S05 — line projection, including scale invariance.
{
 const u=[2,1,-1],v=[3,0,1],c=dot(v,u)/dot(u,u),p=scale(c,u),r=sub(v,p);
 approx(c,5/6);arrApprox(p,[5/3,5/6,-5/6]);arrApprox(r,[4/3,-5/6,11/6]);approx(dot(r,u),0);
 const aa=[1,2,2],bb=scale(3,aa),vv=[4,0,1];
 arrApprox(proj(vv,aa),proj(vv,bb),'scaled-generator projection');
}

// S06 — fresh ON-subspace projection after recovery.
{
 const q1=[1/Math.sqrt(2),0,1/Math.sqrt(2)],q2=[0,1,0],v=[4,1,0];
 const p=add(scale(dot(v,q1),q1),scale(dot(v,q2),q2)),r=sub(v,p);
 arrApprox(p,[2,1,2]);arrApprox(r,[2,0,-2]);approx(dot(r,q1),0);approx(dot(r,q2),0);
 assert.match(ref(6),/p=\(2,1,2\).*r=\(2,0,-2\)/);
}

// S07 — repaired oblique-plane nearest-point theorem.
{
 const v=[3,2,1],p=[1,2,-1],y=[0,4,0],r=sub(v,p);
 assert.equal(dot(r,[1,0,-1]),0);assert.equal(dot(r,[0,1,0]),0);
 assert.equal(norm2(sub(v,y)),14);assert.equal(norm2(r),8);assert.equal(norm2(sub(p,y)),6);
 assert.match(ref(7),/14=8\+6/);
}

// S08 — two-vector Gram–Schmidt.
{
 const v1=[1,1,0],v2=[1,0,1],u1=v1,u2=sub(v2,proj(v2,u1));
 arrApprox(u2,[.5,-.5,1]);approx(dot(u1,u2),0);
 const bad=[1,-2,1];assert.notEqual(dot([1,2,0],bad),0);
}

// S09 — repaired multi-vector Gram–Schmidt and dependent-transfer case.
{
 const v1=[1,1,1],v2=[1,0,0],v3=[0,1,0];
 const u1=v1,u2=sub(v2,proj(v2,u1)),u3=sub(sub(v3,proj(v3,u1)),proj(v3,u2));
 arrApprox(u2,[2/3,-1/3,-1/3]);arrApprox(u3,[0,.5,-.5]);
 approx(dot(u1,u2),0);approx(dot(u1,u3),0);approx(dot(u2,u3),0);
 const d1=[2,1,0],d2=[0,1,2],d3=[2,2,2];arrApprox(add(d1,d2),d3);
}

// S10 — transpose / null-space bridge.
{
 const A=[[1,2],[0,-1],[3,1]],y=[2,1,-1];
 assert.deepEqual(T(A),[[1,0,3],[2,-1,1]]);
 assert.deepEqual(mv(T(A),y),[-1,2]);
 const B=[[1,0],[1,1],[1,-1]],z=[-2,1,1];
 assert.deepEqual(mv(T(B),z),[0,0]);
}

// S11 — full-rank normal equations.
{
 const A=[[1,0],[0,1],[1,1]],b=[2,1,0],At=T(A),G=mm(At,A),rhs=mv(At,b);
 assert.deepEqual(G,[[2,1],[1,2]]);assert.deepEqual(rhs,[2,1]);
 const c=mv(inv2(G),rhs),p=mv(A,c),r=sub(b,p);
 arrApprox(c,[1,0]);arrApprox(p,[1,0,1]);arrApprox(r,[1,1,-1]);arrApprox(mv(At,r),[0,0]);
}

// S12 — repaired projector; symmetry, idempotence, residual geometry.
{
 const A=[[1,1],[1,-1],[1,0]],At=T(A),G=mm(At,A),P=mm(mm(A,inv2(G)),At);
 assert.deepEqual(G,[[3,0],[0,2]]);
 const want=[[5/6,-1/6,1/3],[-1/6,5/6,1/3],[1/3,1/3,1/3]];
 for(let i=0;i<3;i++)arrApprox(P[i],want[i]);
 const P2=mm(P,P);for(let i=0;i<3;i++)arrApprox(P2[i],P[i]);
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)approx(P[i][j],P[j][i]);
 const b=[3,0,0],p=mv(P,b),r=sub(b,p);arrApprox(p,[2.5,-.5,1]);arrApprox(r,[.5,.5,-1]);arrApprox(mv(At,r),[0,0]);
 const Q=[[1,1],[0,0]];assert.deepEqual(mm(Q,Q),Q);assert.notDeepEqual(T(Q),Q);
}

// S13 — repaired inconsistent least-squares instance.
{
 const A=[[1,0],[1,1],[0,2]],b=[1,2,4],At=T(A),G=mm(At,A),rhs=mv(At,b),x=mv(inv2(G),rhs),p=mv(A,x),r=sub(b,p);
 assert.deepEqual(G,[[2,1],[1,5]]);assert.deepEqual(rhs,[3,10]);
 arrApprox(x,[5/9,17/9]);arrApprox(p,[5/9,22/9,34/9]);arrApprox(r,[4/9,-4/9,2/9]);
 arrApprox(mv(At,r),[0,0]);approx(norm2(r),4/9);
}

// S14 — rank-deficient fit: one p, many coefficients.
{
 const A=[[1,2],[2,4],[0,0]],b=[1,2,1],p=[1,2,0],r=sub(b,p);
 arrApprox(r,[0,0,1]);approx(dot(r,[1,2,0]),0);
 for(const t of [-2,0,3])arrApprox(mv(A,[1-2*t,t]),p);
 arrApprox(mv(A,[-2,1]),[0,0,0]);
 const C=[[1,1],[1,1]],d=[1,0],pt=[.5,.5];arrApprox(mv(C,[.5,0]),pt);arrApprox(mv(C,[0,.5]),pt);
}

// S15 — deterministic line fit and residual orthogonality.
{
 const A=[[1,-1],[1,0],[1,1]],y=[1,1,3],At=T(A),G=mm(At,A),rhs=mv(At,y),x=mv(inv2(G),rhs),p=mv(A,x),r=sub(y,p);
 assert.deepEqual(G,[[3,0],[0,2]]);assert.deepEqual(rhs,[5,2]);arrApprox(x,[5/3,1]);
 arrApprox(p,[2/3,5/3,8/3]);arrApprox(r,[1/3,-2/3,1/3]);arrApprox(mv(At,r),[0,0]);
 const E=[[1,-1],[1,1],[1,2]],z=[0,2,5],Et=T(E),xe=mv(inv2(mm(Et,E)),mv(Et,z));
 arrApprox(xe,[9/7,11/7]);
}

// S16 — repaired synthesis normal-equation route and independent GS route.
{
 const A=[[1,1],[2,0],[0,1]],b=[2,1,0],At=T(A),G=mm(At,A),rhs=mv(At,b),c=mv(inv2(G),rhs),p=mv(A,c),r=sub(b,p);
 assert.deepEqual(G,[[5,1],[1,2]]);assert.deepEqual(rhs,[4,2]);arrApprox(c,[2/3,2/3]);arrApprox(p,[4/3,4/3,2/3]);arrApprox(r,[2/3,-1/3,-2/3]);arrApprox(mv(At,r),[0,0]);
 const u1=[1,2,0],u2=sub([1,0,1],proj([1,0,1],u1));
 arrApprox(u2,[4/5,-2/5,1]);
 const q1=scale(1/Math.sqrt(5),u1),q2=scale(1/(3*Math.sqrt(5)),[4,-2,5]);
 approx(dot(q1,q2),0);approx(norm2(q1),1);approx(norm2(q2),1);
 const p2=add(scale(dot(b,q1),q1),scale(dot(b,q2),q2));arrApprox(p2,p);
}

// References for repaired high-risk items must match the independently recomputed results.
for(const [n,tokens] of new Map([
 [6,['p=(2,1,2)','r=(2,0,-2)']],
 [7,['14=8+6']],
 [9,['(1,1,1)','(2,-1,-1)','(0,1,-1)']],
 [10,['(-2,1,1)']],
 [12,['5/6','-1/6','1/3']],
 [13,['(5/9,17/9)','4/9']],
 [16,['(2/3,2/3)','(4/3,4/3,2/3)']]
])){
  const text=ref(n); for(const tok of tokens)assert(text.includes(tok),`S${n} reference missing independently checked token ${tok}`);
}

console.log('PASS M15 independent math oracles: all 16 sessions have numerical/theorem-boundary checks; repaired projection, Gram–Schmidt, transpose, projector, least-squares and synthesis instances recompute correctly.');
