// Supplements add stable obligations without rewriting reviewed core packs.
export function appendSupplement(base, supplement) {
 if (supplement.extendsModule !== base.module.id) throw Error('Supplement module mismatch');
 if (supplement.afterSession !== base.sessions.at(-1)?.id) throw Error('Supplement anchor mismatch');
 const out=structuredClone(base), ids=new Set(out.sessions.map(s=>s.id));
 for(const s of supplement.sessions){
  if(s.moduleId!==base.module.id||ids.has(s.id)||s.order!==out.sessions.length+1) throw Error('Supplement session collision/order');
  ids.add(s.id);
  for(const kind of ['main','transfer']){
   const id=s[kind];
   if(out.problems[id]||out.evaluators[id]||!supplement.problems[id]||!supplement.evaluators[id]) throw Error('Supplement task collision/missing evaluator');
   out.problems[id]=structuredClone(supplement.problems[id]);out.evaluators[id]=structuredClone(supplement.evaluators[id]);
  }
  out.sessions.push({...structuredClone(s),instructionVersion:s.instructionVersion||supplement.instructionVersion});
 }
 out.module={...out.module,...supplement.moduleAmendment};
 return out;
}

// These change destination descriptions, not an assessed learner obligation.
// The core contract and evidence hashes remain bound to their original fields.
export function routingText(text, repairs){return repairs?.textCorrections?.[text]||text;}
export function routingNotes(sessionId, repairs){return repairs?.sessionNotes?.[sessionId]||[];}

export function registerProbeBank(course, keys, bank){
 const s=course.sessions.find(x=>x.id===bank.sessionId);
 if(!s)throw Error('Probe bank session missing');
 s.replacements=s.replacements||[];s.probeMeta=s.probeMeta||{};
 for(const [id,p] of Object.entries(bank.problems)){
  if(course.problems[id]||keys[id]||!bank.evaluators[id]||!bank.probeMeta[id])throw Error('Probe collision/missing evaluator');
  s.replacements.push(id);s.probeMeta[id]=structuredClone(bank.probeMeta[id]);
  course.problems[id]=structuredClone(p);keys[id]=structuredClone(bank.evaluators[id]);
 }
 return course;
}
