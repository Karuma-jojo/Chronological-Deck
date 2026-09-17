import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {T25_ATOMIC_CARDS as cards} from '../js/data/t25-atomic-arcs.js';
import {T25_MSTAT_TARGETS as targets,T25_MSTAT_ROUTE as route} from '../js/data/t25-mstat-audit-v4.js';
import {bridges,capstones,objectives} from '../course/authoring/supplements.mjs';
import campaign from '../course/authoring/campaign.mjs';
const rows=(await Promise.all(Array.from({length:7},(_,i)=>import(`../course/authoring/phase-${i+1}.mjs`)))).flatMap(x=>x.default);
if(rows.length!==162||rows.some((r,i)=>r[0]!==i+1||r.length!==6||r.slice(1).some(x=>typeof x!=='string'||x.length<20)))throw Error('Incomplete authoring rows');
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const problems={},references={};
const rubric=[{points:2,criterion:'Correct model, domain and hypotheses'},{points:4,criterion:'Valid derivation or decisive counterexample'},{points:2,criterion:'Exact answer and interpretation'},{points:2,criterion:'Required exceptions, cases and justification'}];
function add(id,prompt,reference,meta={}){if(problems[id])throw Error('Duplicate '+id);problems[id]={id,prompt,...meta};references[id]={reference,rubric,marking:'Human review required. Accept every valid route. Reallocate genuinely inapplicable rubric points before marking. A task score is not automatic card clearance.'};return id;}
const sessions=rows.map(([order,lesson,main,key,transfer,tkey])=>{
 const card=cards[order-1],spec=route[order-1];
 return {order,phase:spec.phase,card,contractHash:hash(card),lesson,main:add(`T25-${String(order).padStart(3,'0')}-M`,main,key,{order,kind:'main'}),transfer:add(`T25-${String(order).padStart(3,'0')}-T`,transfer,tkey,{order,kind:'transfer'}),bridges:bridges.filter(b=>b.before.includes(order)).map(b=>b.id),prerequisiteTargets:spec.targetPrerequisites,evidenceWarning:'Map each required-ownership item to actual independent evidence. These two tasks do not automatically discharge every obligation. Compile a bounded fresh probe for any unobserved claim.'};
});
const bridgeData=bridges.map(b=>({...b,tasks:b.tasks.map(([p,k],i)=>add(`${b.id}-${i+1}`,p,k,{kind:'bridge',bridge:b.id}))}));
const caps=capstones.map(([phase,p,k])=>add(`CAP-${phase}`,p,k,{kind:'synthesis',phase}));
const mcqs=objectives.map(([phase,p,options,answer,k],i)=>{const id=add(`OBJ-${String(i+1).padStart(2,'0')}`,p,k,{kind:'objective',phase,options});references[id].answer=answer;return id;});
const sets=[];
for(let phase=1;phase<=7;phase++){
 const s=sessions.filter(x=>x.phase===phase);
 sets.push({id:`PHASE-${phase}`,title:`Phase ${phase} written checkpoint`,kind:'written',minutes:60,through:s.at(-1).order,problems:[s[0].transfer,s[Math.floor(s.length/2)].transfer,s.at(-1).transfer,caps[phase-1]]});
 sets.push({id:`OBJECTIVE-${phase}`,title:`Phase ${phase} objective calibration`,kind:'objective',minutes:12,through:s.at(-1).order,problems:mcqs.filter(id=>problems[id].phase===phase)});
}
for(const [i,through] of [50,80,118,142,162].entries()){
 const pool=sessions.slice(0,through);const ids=Array.from({length:8},(_,j)=>pool[Math.floor((j+.5)*pool.length/8)].transfer);
 sets.push({id:`MIXED-${i+1}`,title:`Cumulative written set ${i+1}`,kind:'written',minutes:100,through,problems:ids});
}
// RFC-style quoted CSV fields are decoded, including doubled quotes.
function csvLine(line){return [...line.matchAll(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g)].map(m=>m[1].startsWith('"')?m[1].slice(1,-1).replaceAll('""','"'):m[1]);}
const rawScope=await readFile(new URL('../course/sources/official-scope-2026.csv',import.meta.url),'utf8');
const scope=rawScope.trim().split(/\r?\n/).slice(1).map(line=>{const [item,codes,note]=csvLine(line);return{item,targets:codes.split(/\s+/).filter(Boolean),note};});
const questionRoutes=JSON.parse(await readFile(new URL('../course/sources/question-routes-2026-09-14.json',import.meta.url),'utf8'));
const publicData={version:'1.0.0-draft',baseCommit:'43ae1373bc33083dbe5a14eba174300dae44f5d8',status:'Authored; current validation status is in docs/t25-course/RUN-LOG.md. Not learner-piloted.',sources:{syllabus:'https://admission.isical.ac.in/Syllabus/MStat-PSA-PSB-Syllabus-2026.pdf',program:'https://admission.isical.ac.in/Programs/MStat.html',historicalAudit:'2026-09-14 v2 classification metadata; not a newly certified solution key'},targets,sessions,problems,bridges:bridgeData,sets,campaign,scope,questionRoutes,reviewDays:[7,21,60],assessmentWarning:'Sets reuse bank tasks and are not complete official-format mock papers. Timing is provisional. Exposure is local-log evidence only; outside exposure is unknown. Preserve genuinely unseen official papers for exam simulation.'};
await mkdir(new URL('../course/generated/',import.meta.url),{recursive:true});
await writeFile(new URL('../course/generated/course.json',import.meta.url),JSON.stringify(publicData,null,2)+'\n');
await writeFile(new URL('../course/generated/evaluator.json',import.meta.url),JSON.stringify(references,null,2)+'\n');
await mkdir(new URL('../docs/t25-course/',import.meta.url),{recursive:true});
const md=['# T25 current course syllabus','',`80 targets; ${sessions.length} sessions; ${Object.keys(problems).length} original tasks.`,``,publicData.status,'','Current repository card contracts govern. Historical question routes are provenance, not certified solutions.','',...sessions.flatMap(s=>[`## ${String(s.order).padStart(3,'0')} · ${s.card.syllabusCode} · ${s.card.title}`,'',s.card.centralCapability,'','Prerequisites: '+s.card.entryPrerequisites.join('; '),'','Required ownership:',...s.card.requiredOwnership.map(x=>'- '+x),'','Exit: '+s.card.exitCondition,'','Out of scope: '+s.card.outOfScope.join('; '),'']), '## Official-scope crosswalk','',...scope.map(x=>`- ${x.item}: ${x.targets.join(', ')} — ${x.note}`)];
await writeFile(new URL('../docs/t25-course/SYLLABUS.md',import.meta.url),md.join('\n')+'\n');
console.log(`Built ${sessions.length} sessions, ${Object.keys(problems).length} tasks, ${sets.length} sets, ${scope.length} scope rows, ${questionRoutes.length} historical question routes.`);
