import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));
const labs=fs.readFileSync('docs/t22-course/M03-V2-STRATEGY-LABS.md','utf8');
const pack=fs.readFileSync('docs/t22-course/artifacts/T22-Elite-M03-Master-Pack-v2.0-r4.md','utf8');
const historical=fs.readFileSync('docs/t22-course/artifacts/T22-Elite-M03-Deep-Spire-Master-Pack-v1.7.2.md','utf8');
const by=n=>a.sessions.find(s=>s.id===`T22V3::T22E-DISC01::S${String(n).padStart(2,'0')}@1`);
const newNos=[31,32,33,34,35,36];

function tokens(x){return String(x).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(Boolean);}
function ngrams(x,n=8){const t=tokens(x),s=new Set();for(let i=0;i+n<=t.length;i++)s.add(t.slice(i,i+n).join(' '));return s;}
function overlap(x,y,n=8){const A=ngrams(x,n),B=ngrams(y,n);if(!A.size||!B.size)return 0;let k=0;for(const g of A)if(B.has(g))k++;return k/Math.max(1,Math.min(A.size,B.size));}
function probes(text){
  const out=[];const re=/### (?:Fresh diagnostic probe )?([AB]\d)[^\n]*\n([\s\S]*?)(?=\n### |\n\*\*Diagnostic target|\n---)/g;
  let m;while((m=re.exec(text)))out.push({id:m[1],text:m[2].trim()});
  return out;
}
function assertNoControls(label,text){
  for(let i=0;i<text.length;i++){const code=text.charCodeAt(i);assert(code>=32||[9,10,13].includes(code),`${label} contains control U+${code.toString(16).padStart(4,'0')} at ${i}`);}
}

assert.equal(a.version,'m03-authoring-v2.0-six-tools-candidate-r4');
assertNoControls('strategy labs',labs);
assertNoControls('r4 master pack',pack);
for(const bad of [/\b3mid\b/i,/\bnge\d/i,/\bxle\d/i,/\bldots\b/i,/\bxin\b/i,/\byin\b/i,/\bforall\b/i]){
  assert(!bad.test(labs),'broken math serialization survived: '+bad);
  assert(!bad.test(pack),'broken math serialization reached master pack: '+bad);
}

// New fixed tasks remain separated from pre-v2 fixed instruction/task surfaces.
const oldSessions=a.sessions.filter(s=>!newNos.some(n=>s.id.includes(`::S${n}@1`)));
const oldSurfaces=[];
for(const s of oldSessions){
  oldSurfaces.push({id:s.id+' lesson',text:s.lesson});
  oldSurfaces.push({id:s.main,text:a.problems[s.main].prompt});
  oldSurfaces.push({id:s.transfer,text:a.problems[s.transfer].prompt});
}
for(const n of newNos){
  const s=by(n);assert(s);
  for(const id of [s.main,s.transfer]){
    const p=a.problems[id].prompt;
    assert(!s.lesson.includes(p),'fixed prompt copied into own lesson '+id);
    for(const old of oldSurfaces)assert(overlap(p,old.text)<0.45,`suspicious fixed-task 8-gram clone ${id} vs ${old.id}`);
  }
}

// Strategy probes must not be changed-constant copies of the fixed bank or historical v1.7.2 labs.
const currentProbes=probes(labs), historicalProbes=probes(historical);
assert.equal(currentProbes.length,13,'expected A1-A5 and B1-B8');
assert(historicalProbes.length>=10,'historical strategy probes not recovered');
const fixedSurfaces=[];
for(const s of a.sessions){
  fixedSurfaces.push({id:s.id+' lesson',text:s.lesson});
  fixedSurfaces.push({id:s.main,text:a.problems[s.main].prompt});
  fixedSurfaces.push({id:s.transfer,text:a.problems[s.transfer].prompt});
}
for(const p of currentProbes){
  for(const x of fixedSurfaces)assert(overlap(p.text,x.text)<0.42,`strategy probe ${p.id} too close to fixed surface ${x.id}`);
  for(const h of historicalProbes)assert(overlap(p.text,h.text)<0.42,`strategy probe ${p.id} too close to historical lab ${h.id}`);
}

// Pins for the independently requested replacements.
const map=Object.fromEntries(currentProbes.map(x=>[x.id,x.text]));
assert(map.A1.includes('(x+y)/2')&&map.A1.includes('x < y'));
const a4=map.A4.replace(/\s+/g,' ');assert(a4.includes('3 divides a−b')&&a4.includes('3 divides b−c')&&a4.includes('3 divides a−c'));
assert(map.A5.includes('aₙ₊₁ = aₙ + 2n + 1')&&map.A5.includes('conjecture an exact formula'));
assert(map.B1.includes('exactly two positions contain even symbols'));
assert(map.B2.includes('even cardinality')&&map.B2.includes('reversible'));
assert(map.B3.includes('two teams of four')&&map.B3.includes('constant factor'));
assert(map.B4.includes('difference divisible by 4'));
assert(map.B5.includes('at least one of the elements 1, 2, 3'));
assert(map.B6.includes('axis-aligned rectangles'));
assert(map.B8.includes('inserts |a−b|')&&map.B8.includes('what proves termination'));

assert(labs.includes('Placement:** after learner position 17'));
assert(labs.includes('Placement:** after learner position 36'));
assert(labs.includes('unscored diagnostic/practice only'));
assert(labs.includes('Do not reveal method names until the learner has committed'));

console.log('PASS: M03 v2 r4 clone/serialization audit — fixed tasks remain separated; strategy labs are control-clean and no longer changed-constant copies of historical probes.');
