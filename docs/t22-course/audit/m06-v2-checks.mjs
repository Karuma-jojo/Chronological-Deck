import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {appendSupplement} from '../../../js/t22-course/supplements.js';
import {prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,validateEvidence,emptyEvidence} from '../../../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
export const digest=x=>createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
const raw=x=>createHash('sha256').update(x).digest('hex');
const close=(x,y)=>{if(Array.isArray(y)){assert.equal(x.length,y.length);y.forEach((v,i)=>close(x[i],v));}else if(y===null)assert.equal(x,null);else assert(Number.isFinite(x)&&Math.abs(x-y)<1e-10,`${x} != ${y}`);};
const sum=x=>x.reduce((a,b)=>a+b,0),mul=x=>x.reduce((a,b)=>a*b,1);
const normalize=x=>{assert(x.every(v=>v>=0));const z=sum(x);assert(z>0,'Impossible evidence cannot be normalized');return x.map(v=>v/z);};
const posterior=(p,u,v)=>normalize([p*u,(1-p)*v])[0];
const legal=row=>{assert(row.every(x=>Number.isFinite(x)&&x>=0&&x<=1));close(sum(row),1);};
export function mathOracle(m){
 let result;
 switch(m.type){
 case 'counts':{const [N,H,HE,NE]=m.counts;assert(HE>=0&&NE>=0);if(N!==null)assert(H<=N&&HE<=H&&NE<=N-H);result=[H===null?null:HE/H,HE/(HE+NE)];break;}
 case 'bayes':result=m.scenarios.map(([p,u,v])=>{const q=posterior(p,u,v);close(q,p*u/(p*u+(1-p)*v));const total=1000000,yes=total*p*u,no=total*(1-p)*v;close(q,yes/(yes+no));return q;});break;
 case 'joint-given':{const joint=m.prior*m.rate;assert(joint<=m.evidenceMass&&m.evidenceMass-joint<=1-m.prior);result=[joint/m.evidenceMass];break;}
 case 'normalize':legal(m.prior);result=normalize(m.prior.map((p,i)=>p*m.rates[i]));break;
 case 'omitted':result=[normalize(m.masses)[0],normalize(m.masses.slice(0,2))[0]];break;
 case 'odds':result=[m.probability/(1-m.probability),m.odds/(1+m.odds)];break;
 case 'lr':result=m.pairs.map(([u,v])=>u/v);break;
 case 'direction':result=m.lrs.map(x=>Math.sign(x-1));break;
 case 'odds-update':result=m.priors.map(p=>{const o=p/(1-p)*m.lr,q=o/(1+o);close(q,posterior(p,m.lr/(1+m.lr),1/(1+m.lr)));return q;});break;
 case 'sequential-lr':{let p=m.prior,o=p/(1-p),lr=1;result=m.lrs.map(x=>{o*=x;lr*=x;p=posterior(p,x/(1+x),1/(1+x));close(p,o/(1+o));close(p,posterior(m.prior,lr/(1+lr),1/(1+lr)));return p;});break;}
 case 'chain':case 'chain-bayes':{const joints=m.factors.map(mul);result=[...joints,joints[0]/joints[1]];if(m.type==='chain-bayes'){result.push(posterior(m.prior,...joints));if(m.alternativePrior!==undefined)result.push(posterior(m.alternativePrior,...joints));}break;}
 case 'independence':result=m.laws.map(([u,v,w])=>{const row=[w,u-w,v-w,1-u-v+w];legal(row);return Math.abs(w-u*v)<1e-12?1:0;});break;
 case 'duplicate':result=[m.lr,m.lr*m.lr,1];break;
 case 'support':{legal(m.prior);const w=m.prior.map((p,i)=>p*m.rates[i]);result=[...w,sum(w),...normalize(w)];assert(w[0]===0);assert.throws(()=>normalize([0,0]));break;}
 case 'channel':{legal(m.prior);m.channel.forEach(legal);const mass=m.channel[0].map((_,s)=>sum(m.prior.map((p,h)=>p*m.channel[h][s])));const qs=mass.map((z,s)=>z===0?null:normalize(m.prior.map((p,h)=>p*m.channel[h][s])));close(mass,m.expectedMass);close(qs,m.expectedPosterior);for(let h=0;h<m.prior.length;h++)close(sum(mass.map((z,s)=>z===0?0:z*qs[s][h])),m.prior[h]);return {mass,qs};}
 case 'silence':{const [u,v]=m.positive,[d,e]=m.delivery,p=m.prior;result=[posterior(p,1-u,1-v),(1-u)/(1-v),posterior(p,1-u*d,1-v*e)];break;}
 case 'selection':{const rates=[[],[]];for(let h=0;h<2;h++){const n=m.sizes[h],r=m.reds[h];let any=0,both=0,selected=0,total=0;for(let x=0;x<n;x++)for(let y=0;y<n;y++)if(x!==y){total++;if(x<r||y<r)any++;if(x<r&&y<r)both++;selected+=((x<r?1:0)+(y<r?1:0))/2;}rates[0][h]=any/total;rates[1][h]=(m.both?both:selected)/total;}result=[...rates[0],posterior(m.prior[0],...rates[0]),...rates[1],posterior(m.prior[0],...rates[1])];break;}
 case 'mixture':case 'predictive':{let weights=m.prior;if(m.type==='predictive')weights=normalize(m.prior.map((p,h)=>p*m.evidence[h]));const table=['11','10','01','00'].map(atom=>sum(weights.map((p,h)=>p*mul([...atom].map(bit=>bit==='1'?m.rates[h]:1-m.rates[h])))));legal(table);if(m.type==='mixture')result=[...table,posterior(weights[0],...m.rates),(table[0]/(table[0]+table[1]))];else result=[...weights,sum(weights.map((p,h)=>p*m.rates[h])),...table];break;}
 case 'selected-bits':{const atoms=['00','01','10','11'].filter(x=>sum([...x].map(Number))===1);result=[atoms.length/4,atoms.filter(x=>x==='11').length/atoms.length,atoms.filter(x=>x[0]==='1').length/atoms.length,atoms.filter(x=>x[1]==='1').length/atoms.length,0];break;}
 case 'history':{m.laws.forEach(legal);result=m.orders.map(order=>{let subset=m.atoms.map((_,i)=>i),p=m.prior;return order.map(index=>{const next=subset.filter(i=>m.atoms[i][index]==='1'),rates=m.laws.map((law,h)=>{const denom=sum(subset.map(i=>law[i]));if(denom===0){assert((h===0?p:1-p)===0,'Impossible within-hypothesis prefix must have zero posterior weight');return 0;}return sum(next.map(i=>law[i]))/denom;});p=posterior(p,...rates);const batch=posterior(m.prior,...m.laws.map(law=>sum(next.map(i=>law[i]))));close(p,batch);subset=next;return p;});});close(result[0].at(-1),result[1].at(-1));break;}
 case 'predictive-missing':result=m.models.map(([rates,other])=>{for(let h=0;h<2;h++)close(m.eventMass[h]*rates[h]+(1-m.eventMass[h])*other[h],m.marginals[h]);return sum(m.weights.map((p,h)=>p*rates[h]));});break;
 case 'bounds':{const [[u,v],[r,s]]=m.marginals,p=m.prior,lo=Math.max(0,u+v-1),hi=Math.min(u,v),low=Math.max(0,r+s-1),high=Math.min(r,s);for(const x of [lo,hi])legal([x,u-x,v-x,1-u-v+x]);for(const y of [low,high])legal([y,r-y,s-y,1-r-s+y]);const minimum=posterior(p,lo,high),maximum=posterior(p,hi,low);for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){const x=lo+(hi-lo)*i/20,y=low+(high-low)*j/20,z=posterior(p,x,y);assert(z>=minimum-1e-10&&z<=maximum+1e-10);}result=[lo,hi,low,high,minimum,maximum,-m.payoff[1]/(m.payoff[0]-m.payoff[1])];break;}
 case 'joint-channel':{const prior=m.joint.map(sum);legal(prior);const masses=m.joint[0].map((_,s)=>sum(m.joint.map(row=>row[s]))),qs=masses.map((z,s)=>m.joint[0][s]/z);close(sum(masses.map((p,s)=>p*qs[s])),prior[0]);result=[prior[0],...masses,...qs,(m.joint[0][0]+m.joint[0][1])/(masses[0]+masses[1])];break;}
 case 'audit-joint':{m.laws.forEach(legal);const [u,v]=m.laws;const lr=u[0]/v[0],naive=(u[0]+u[1])/(v[0]+v[1])*(u[0]+u[2])/(v[0]+v[2]);result=[lr,posterior(m.prior,u[0],v[0]),posterior(m.prior,naive/(1+naive),1/(1+naive)),posterior(m.alternativePrior,u[0],v[0])];break;}
 case 'information':{legal(m.prior);const priorValues=m.payoffs.map(row=>sum(row.map((r,h)=>r*m.prior[h]))),baseline=Math.max(...priorValues),perfect=sum(m.prior.map((p,h)=>p*Math.max(...m.payoffs.map(row=>row[h]))));result={baseline,perfect,evpi:perfect-baseline};if(m.channel){m.channel.forEach(legal);const masses=m.channel[0].map((_,s)=>sum(m.prior.map((p,h)=>p*m.channel[h][s])));const sample=sum(masses.map((z,s)=>Math.max(...m.payoffs.map(row=>sum(row.map((r,h)=>r*m.prior[h]*m.channel[h][s]))))));const conditional=sum(masses.map((z,s)=>z===0?0:z*Math.max(...m.payoffs.map(row=>sum(row.map((r,h)=>r*m.prior[h]*m.channel[h][s]/z))))));close(sample,conditional);assert(sample>=baseline-1e-10&&sample<=perfect+1e-10);Object.assign(result,{sample,evsi:sample-baseline});if(m.cost!==undefined)result.net=sample-m.cost;if(m.observed!==undefined){const s=m.observed,z=masses[s];assert(z>0);const qs=m.prior.map((p,h)=>p*m.channel[h][s]/z);Object.assign(result,{signalMass:z,posterior:qs,observedValue:Math.max(...m.payoffs.map(row=>sum(row.map((r,h)=>r*qs[h]))))});}}for(const [k,v] of Object.entries(m.expected))close(result[k],v);return result;}
 default:throw Error('No mathematical oracle for '+m.type);
 }
 close(result,m.expected);return result;
}
export function checkCandidate(a,pin=read('docs/t22-course/audit/m06-v2-builder-contracts.json')){
 assert.equal(a.version,'m06-authoring-v2.0-r1-adversarial-repair-candidate');assert.equal(pin.status,'builder-audited-awaiting-independent-review');assert.equal(digest(a),pin.candidateDigest,'Candidate bytes differ from the reviewed builder contract');
 assert.equal(a.sessions.length,36);assert.equal(Object.keys(a.problems).length,72);assert.equal(Object.keys(a.evaluators).length,72);assert.equal(Object.keys(a.mathModels).length,72);
 assert.deepEqual(a.boundary.prerequisiteModules,['ARC048','T22E-TRD01']);
 const ids=new Set(),order=new Map(a.sessions.map(s=>[s.id,s.order]));let claims=0;
 for(const s of a.sessions){assert(!ids.has(s.id));ids.add(s.id);assert.equal(s.moduleId,'ARC502');assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'));assert(s.guidedFeedback.length>25);assert.equal(s.requiredOwnership.length,5);assert(s.entryPrerequisites.length);assert(s.representations.length);assert(s.sourceRefs.every(x=>a.sourceLedger.some(r=>r.id===x)));assert(a.wrongSolverAudit.sessions[s.id]);
  for(const req of s.entryPrerequisites){for(const m of req.matchAll(/M06-S(\d+)/g))assert(order.get(`T22V3::ARC502::S${m[1].padStart(2,'0')}@1`)<s.order,'Forward session prerequisite '+s.id+' '+req);}
  const links=a.claimEvidence[s.id];assert.equal(links.length,5);links.forEach((e,i)=>{assert.equal(e.claim,s.requiredOwnership[i]);assert.equal(e.publicRequest,a.problems[s[e.task]].prompt);const rows=a.evaluators[s[e.task]].rubric.map(r=>r.criterion);assert(e.rubricEvidence.every(c=>rows.includes(c)));assert.deepEqual(a.coverage[s.id][i],[e.task]);claims++;});
  for(const k of ['main','transfer']){const p=s[k],task=a.problems[p],ev=a.evaluators[p];assert.equal(task.kind,k);assert(task.obligationVersion>=1);assert.equal(ev.rubric.length,5);assert.equal(sum(ev.rubric.map(r=>r.points)),10);assert(a.evidenceDistance.items[p]);for(const fragment of a.instructionSeparation[s.id][k]){assert(task.prompt.includes(fragment));assert(!s.lesson.includes(fragment));}assert.equal(raw(task.prompt),a.mathModels[p].publicInputBinding.promptSha256);mathOracle(a.mathModels[p]);}
 }
 assert.equal(claims,180);assert.deepEqual(a.sessions.map(s=>Number(s.id.split('::S')[1].slice(0,2))),a.routeArchitecture.learnerRoute);adversarialContractGuards(a);return true;
}
export function adversarialContractGuards(a){
 const s30=a.sessions.find(s=>s.id.includes('::S30@')),s33=a.sessions.find(s=>s.id.includes('::S33@')),s34=a.sessions.find(s=>s.id.includes('::S34@'));
 assert(s30.lesson.includes('LR(R)=P(R|H)/P(R|Hc)'),'Early report-ratio definition must precede later formal LR lessons');
 assert(s33.lesson.includes('P(X=1,Y=1|H_i)=P(X=1|H_i)P(Y=1|H_i)'),'The pre-S19 task needs a JIT independence definition');
 assert(a.problems[s34.main].prompt.includes('are mutually independent: for every x,y,e in{0,1}'));
 assert(a.problems[s34.main].prompt.includes('P(X=x,Y=y,1_E=e|H_i)=P(X=x|H_i)P(Y=y|H_i)P(1_E=e|H_i)'));
 assert.equal(a.mathModels[s34.main].jointAssumption,'mutual-independence-X-Y-evidence-indicator-given-each-hypothesis');
 assert(a.problems[s34.transfer].prompt.includes('State and derive the conditional-partition predictive formula'),'A scored derivation must be publicly requested');
 const proof=a.evaluators[s33.main].reference;
 assert(proof.includes('I={i:w_i>0}')&&proof.includes('no l_i is evaluated')&&proof.includes('sums over I only'),'General proof must avoid undefined zero-prefix conditionals');
 return true;
}
if(process.argv[1]?.endsWith('m06-v2-checks.mjs')){
 const a=read('course/t22/authoring/m06-v2.json');checkCandidate(a);
 for(const type of ['prompt','reference','rubric','model','claim']){const b=structuredClone(a),s=b.sessions.find(s=>s.id.includes('::S35@'));if(type==='prompt')b.problems[s.main].prompt=b.problems[s.main].prompt.replace('2/5','1/2');if(type==='reference')b.evaluators[s.main].reference=b.evaluators[s.main].reference.replace('5/11','6/11');if(type==='rubric')b.evaluators[s.main].rubric[2].criterion+=' Invent independence.';if(type==='model')b.mathModels[s.main].prior=.5;if(type==='claim')b.claimEvidence[s.id][0].task='transfer';assert.throws(()=>checkCandidate(b),'Corruption accepted '+type);}
 // Numeric mutation must fail independently of the candidate hash.
 mathOracle({type:'history',prior:.5,atoms:['11','10','01','00'],laws:[[0,0,.5,.5],[.25,.25,.25,.25]],orders:[[0,1],[1,0]],expected:[[0,0],[.5,0]]});
 assert.throws(()=>mathOracle({type:'history',prior:.5,atoms:['11','10','01','00'],laws:[[0,0,.5,.5],[0,0,.5,.5]],orders:[[0,1],[1,0]],expected:[[0,0],[.5,0]]}),'Overall impossible evidence has no posterior');
 const corrupted=structuredClone(a.mathModels['T22V3::ARC502::S35-M@1']);corrupted.prior=.5;assert.throws(()=>mathOracle(corrupted));
 const old=appendSupplement(read('course/t22/authoring/m06.json'),read('course/t22/authoring/m06-decision-bridge.json'));old.modules=[old.module];const current=structuredClone(a);current.modules=[a.module];await prepareContractHashes(old);await prepareAssessmentFingerprints(old,old.evaluators);await prepareContractHashes(current);await prepareAssessmentFingerprints(current,current.evaluators);
 const changed=new Set(a.repairVersionAudit.changedFixedTasks);assert.equal(changed.size,2);
 for(const s of old.sessions){assert.equal(current.sessions.find(x=>x.id===s.id).contractHash,s.contractHash);for(const k of ['main','transfer']){const p=s[k];assert.equal(old.assessmentFingerprints[p]===current.assessmentFingerprints[p],!changed.has(p));const attempt={id:'legacy-'+p,problemId:p,at:'2026-10-06T01:00:00Z',answer:'Original independently derived evidence.',assistance:'independent',result:'secure',minutes:30,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:s.contractHash,assessmentFingerprint:old.assessmentFingerprints[p]};const state=emptyEvidence();state.attempts=[attempt];assert.equal(validateEvidence(state,current).attempts.length,1);assert.equal(evidenceIsCurrent(attempt,current),!changed.has(p));}}
 const previous=read('docs/t22-course/audit/m06-v2-previous-assessments.json'),repair=new Set(a.repairVersionAudit.adversarialRepair.changedFixedTasks);assert.equal(repair.size,3);
 let preserved=0;for(const [id,fingerprint] of Object.entries(previous.allAssessmentFingerprints)){assert.equal(current.assessmentFingerprints[id]===fingerprint,!repair.has(id));if(!repair.has(id))preserved++;}assert.equal(preserved,69);
 for(const record of previous.assessments){const id=record.problem.id;assert(repair.has(id));assert.equal(current.problems[id].obligationVersion,record.problem.obligationVersion+1);const historical={sessions:[record.session],problems:{[id]:record.problem},evaluators:{[id]:record.evaluator}};await prepareContractHashes(historical);await prepareAssessmentFingerprints(historical,historical.evaluators);assert.equal(historical.assessmentFingerprints[id],record.assessmentFingerprint);const state=emptyEvidence();state.attempts=[{id:'previous-v2-'+id,problemId:id,at:'2026-10-07T16:00:00Z',answer:'Earlier candidate response retained verbatim.',assistance:'independent',result:'secure',minutes:30,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:record.contractHash,assessmentFingerprint:record.assessmentFingerprint}];assert.deepEqual(validateEvidence(state,current).attempts,state.attempts);assert.equal(evidenceIsCurrent(state.attempts[0],current),false);}
 // Reject the reviewed semantic regressions independently of the whole-candidate hash.
 for(const defect of ['pairwise','unasked-proof','zero-support-proof','missing-definition']){const b=structuredClone(a);if(defect==='pairwise')b.problems['T22V3::ARC502::S34-M@1'].prompt=b.problems['T22V3::ARC502::S34-M@1'].prompt.replace('are mutually independent: for every x,y,e in{0,1}','are pairwise independent');if(defect==='unasked-proof')b.problems['T22V3::ARC502::S34-T@1'].prompt=b.problems['T22V3::ARC502::S34-T@1'].prompt.replace('State and derive the conditional-partition predictive formula','Discuss prediction');if(defect==='zero-support-proof')b.evaluators['T22V3::ARC502::S33-M@1'].reference=b.evaluators['T22V3::ARC502::S33-M@1'].reference.replace('no l_i is evaluated','evaluate every l_i');if(defect==='missing-definition')b.sessions.find(s=>s.id.includes('::S30@')).lesson=b.sessions.find(s=>s.id.includes('::S30@')).lesson.replace('LR(R)=P(R|H)/P(R|Hc)','ratio');assert.throws(()=>adversarialContractGuards(b),'Semantic repair regression accepted '+defect);}
 const meta=read('course/t22/generated/course-meta.json'),spec=meta.moduleSources.find(x=>x.id==='ARC502');assert.equal(spec.source,'course/t22/authoring/m06-v2.json');assert(!spec.supplements?.length,'Bridge must not be appended twice');
 const pub=read('docs/t22-rebuild/CURRENT-PUBLICATION.json').modules.find(x=>x.id==='ARC502');assert.equal(pub.runtimeSessionCount,36);assert.equal(pub.coreTaskCount,72);assert.equal(pub.contentReviewAuthority,spec.source);
 const branches=read('course/t22/extensions/capability-extensions.json');const b=branches.extensions.find(x=>x.id==='M33-B');assert.deepEqual(b.requires,['M06','M26','M33']);assert.equal(b.status,'planned-not-authored');
 console.log('PASS M06 v2-r1: 36/72/180; all72 typed mathematical models; six original and four adversarial mutation rejections; 54 historical fingerprints preserved; 69 previous-candidate fingerprints preserved and three explicitly stale; current-source and future-owner gates.');
}
