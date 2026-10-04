import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));
const labs=fs.readFileSync('docs/t22-course/M03-V2-STRATEGY-LABS.md','utf8');
const by=n=>a.sessions.find(s=>s.id===`T22V3::T22E-DISC01::S${String(n).padStart(2,'0')}@1`);
const newNos=[31,32,33,34,35,36];

function tokens(x){return String(x).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(Boolean);}
function ngrams(x,n=8){const t=tokens(x),s=new Set();for(let i=0;i+n<=t.length;i++)s.add(t.slice(i,i+n).join(' '));return s;}
function overlap(a,b){const A=ngrams(a),B=ngrams(b);let k=0;for(const g of A)if(B.has(g))k++;return k/Math.max(1,Math.min(A.size,B.size));}

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
    for(const old of oldSurfaces){
      const r=overlap(p,old.text);
      assert(r<0.45,`suspicious 8-gram clone ${id} vs ${old.id}: ${r}`);
    }
  }
}
for(const phrase of [
  'm−n is odd',
  '4x+t=2x+7',
  '3^n≥2n+1',
  'all 5-bit strings',
  'pairs (w,i) where w is a 3-bit string',
  'C(4,k)2^k=81',
  'transfers exactly 2 units',
  '17 and 11 tokens'
]) assert(!labs.includes(phrase),'Strategy Lab leaked/replayed a new fixed-task surface: '+phrase);

assert(labs.includes('Placement:** after learner position 17'));
assert(labs.includes('Placement:** after learner position 36'));
assert(labs.includes('unscored diagnostic/practice only'));
assert(labs.includes('Do not reveal method names until the learner has committed'));
assert(labs.includes('Preservation is not termination'));

console.log('PASS: M03 v2 clone/contamination audit — new fixed tasks separated from old bank and v2 strategy probes avoid new fixed-task surfaces.');
