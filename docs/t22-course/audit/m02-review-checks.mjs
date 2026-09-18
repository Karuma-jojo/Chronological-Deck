// Reproduce reviewed defects at f494790; not a whole-course certification.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const src=fs.readFileSync('js/t22-course/ui.js','utf8');
const show=src.slice(src.indexOf('function showProblem('),src.indexOf('function selectSession('));
const select=src.slice(src.indexOf('function selectModule('),src.indexOf('async function reveal('));
const elements=new Map();
const context=vm.createContext({elements,console,Map});
vm.runInContext(`
const $=id=>{if(!elements.has(id))elements.set(id,{value:''});return elements.get(id)};
const drafts=new Map();let problemId=null,visit=0,lastSaved=null,noteSeen=false,activeModuleId='M01',session=null;
const course={problems:{m1:{kind:'main',prompt:'one'},m2:{kind:'main',prompt:'two'}}},state={exposures:{}};
const put=()=>{},expose=()=>{},persist=()=>{},renderHistory=()=>{},renderQueue=()=>{},renderModuleEvidence=()=>{},taskText=p=>p.prompt;
const moduleMeta=id=>({id}),applyModuleHeader=()=>{},sessionsList=()=>{},renderRoadmap=()=>{};
const selectSession=()=>showProblem(activeModuleId==='M01'?'m1':'m2');
${show}
${select}
showProblem('m1');$('answer').value='valuable unsaved derivation';
selectModule('M02');selectModule('M01');
globalThis.restored=$('answer').value;
`,context);
assert.equal(context.restored,'','Expected current defect to reproduce');
// Independent check of S20: all terms are <=0 by forward invariance.
let y=0;for(let n=0;n<16;n++){assert(y<=0);assert.equal(y,1-2**n);y=2*y-1;}
// Domain and identity checks supplement (not replace) manual derivations.
for(const x of [-8,-3,0,3,7])if(x!==-1&&x!==2)assert(Math.abs((x*x-4)/(x*x-x-2)-(x+2)/(x+1))<1e-12);
const results={reviewedCommit:'f49479068d8fb3416dbe823e9fdacd628d90e268',unsavedDraftLostOnModuleRoundTrip:context.restored==='',recurrenceInvariantChecks:'PASS',rationalIdentitySpotChecks:'PASS',method:'Actual UI function bodies executed in a minimal mocked DOM; no local browser rerun'};
console.log(JSON.stringify(results,null,2));
