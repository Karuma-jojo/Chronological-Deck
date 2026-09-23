import assert from "node:assert/strict";
import {T25_ATOMIC_CARDS} from "../js/data/t25-atomic-arcs.js";
import {buildPrerequisiteIndex, prerequisiteParts, ASSUMED_FOUNDATION_PREREQUISITES} from "../js/course/prerequisites.js";

const sessions=T25_ATOMIC_CARDS.map(card=>({order:card.routeOrder,card}));
const index=buildPrerequisiteIndex(sessions);
const unresolved=[];
let mentions=0,linked=0,assumed=0,links=0;

for(const session of sessions){
  for(const text of session.card.entryPrerequisites){
    mentions++;
    const result=prerequisiteParts(text,index,session.order);
    const resolved=result.parts.filter(x=>x.order);
    if(resolved.length){
      linked++;
      links+=resolved.length;
      for(const part of resolved){
        assert(part.order < session.order,`Forward/self prerequisite link: session ${session.order} "${text}" -> ${part.order}`);
      }
    }else if(result.assumed){
      assumed++;
    }else{
      unresolved.push({session:session.order,text});
    }
  }
}

assert.equal(unresolved.length,0,"Every learner-facing prerequisite must resolve to an earlier T25 route or be explicitly classified as an assumed foundation.");
const observedAssumed=new Set(sessions.flatMap(s=>s.card.entryPrerequisites).filter(t=>prerequisiteParts(t,index,Infinity).assumed));
for(const text of ASSUMED_FOUNDATION_PREREQUISITES) assert(observedAssumed.has(text),`Stale assumed-foundation classification: ${text}`);

console.log(JSON.stringify({sessions:sessions.length,mentions,linkedMentions:linked,assumedMentions:assumed,renderedLinks:links},null,2));
