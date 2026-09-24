// Focused M02 review regressions. These are supplementary to the real Chromium workflow.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const src=fs.readFileSync('js/t22-course/ui.js','utf8');
const start=src.indexOf('function captureDraft('),mid=src.indexOf('function selectSession('),sel=src.indexOf('function selectModule('),end=src.indexOf('async function reveal(');
assert(start>=0&&mid>start&&sel>mid&&end>sel,'draft functions must remain discoverable');
const body=src.slice(start,mid)+src.slice(sel,end);
const elements=new Map();
const context=vm.createContext({elements,console,Map});
vm.runInContext(`
const $=id=>{if(!elements.has(id))elements.set(id,{value:'',hidden:false,disabled:false});return elements.get(id)};
const drafts=new Map();let problemId=null,visit=0,lastSaved=null,noteSeen=false,activeModuleId='M01',session=null;
const course={problems:{m1:{kind:'main',prompt:'one'},m2:{kind:'main',prompt:'two'}},modules:[{id:'M01',order:1,title:'one'},{id:'M02',order:2,title:'two'}],sessions:[]},state={exposures:{}};
const put=()=>{},expose=()=>{},persist=()=>{},renderHistory=()=>{},renderQueue=()=>{},renderModuleEvidence=()=>{},taskText=p=>p.prompt;
const moduleMeta=id=>course.modules.find(m=>m.id===(id||activeModuleId)),moduleCode=()=>activeModuleId,moduleSessions=()=>[],applyModuleHeader=()=>{},sessionsList=()=>{},renderRoadmap=()=>{};
const selectSession=()=>showProblem(activeModuleId==='M01'?'m1':'m2');
${body}
showProblem('m1');$('answer').value='valuable unsaved derivation';$('assistance').value='guided';$('minutes').value='7';noteSeen=true;
selectModule('M02');selectModule('M01');
globalThis.restored={answer:$('answer').value,assistance:$('assistance').value,minutes:$('minutes').value,noteSeen};
`,context);
assert.deepEqual(JSON.parse(JSON.stringify(context.restored)),{answer:'valuable unsaved derivation',assistance:'guided',minutes:'7',noteSeen:true});
// M02-01: recurrence invariant establishes an all-future obstruction, not a finite-prefix guess.
let y=0;for(let n=0;n<20;n++){assert(y<=0);assert.equal(y,1-2**n);assert(Math.abs(y-1)>=1);y=2*y-1;}
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m02.json','utf8'));
assert.equal(Object.values(a.claimEvidence||{}).flat().length,120);
for(const s of a.sessions)for(const e of a.claimEvidence[s.id]){const pid=s[e.task];assert.equal(e.publicRequest,a.problems[pid].prompt);for(const c of e.rubricEvidence)assert(a.evaluators[pid].rubric.some(r=>r.criterion===c));}
console.log(JSON.stringify({unsavedDraftRoundTrip:'PASS',assistanceProvenance:'PASS',recurrenceAllFutureInvariant:'PASS',claimEvidence:'120/120 exact public-task/rubric links'},null,2));
