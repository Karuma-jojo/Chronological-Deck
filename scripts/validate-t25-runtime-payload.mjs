import {readFile,stat} from "node:fs/promises";

const full=JSON.parse(await readFile("course/generated/course.json","utf8"));
const runtime=JSON.parse(await readFile("course/generated/runtime.json","utf8"));
const notes=JSON.parse(await readFile("course/generated/notes.json","utf8"));
const [fullStat,runtimeStat,notesStat]=await Promise.all([
  stat("course/generated/course.json"),
  stat("course/generated/runtime.json"),
  stat("course/generated/notes.json"),
]);

const expect=(condition,message)=>{if(!condition)throw new Error(message);};

expect(runtime.sessions.length===162,"Runtime session count drifted");
expect(Object.keys(runtime.problems).length===361,"Runtime task count drifted");
expect(runtime.bridges.length===full.bridges.length,"Runtime bridge count drifted");
expect(runtime.sets.length===full.sets.length,"Runtime set count drifted");
expect(runtime.campaign.length===full.campaign.length,"Runtime campaign count drifted");

for(const key of ["targets","scope","questionRoutes","sources","status","baseCommit"]){
  expect(!(key in runtime),`Audit-only key leaked into runtime payload: ${key}`);
}
expect(runtime.sessions.every(s=>!("lesson" in s)),"Session learning notes leaked into first-load runtime");
expect(runtime.bridges.every(b=>!("lesson" in b)),"Bridge learning notes leaked into first-load runtime");
expect(Object.keys(notes.sessions).length===162,"Lazy session-note bank incomplete");
expect(Object.keys(notes.bridges).length===full.bridges.length,"Lazy bridge-note bank incomplete");

for(const s of runtime.sessions){
  const canonical=full.sessions[s.order-1];
  expect(s.main===canonical.main&&s.transfer===canonical.transfer,`Runtime task IDs drifted at session ${s.order}`);
  expect(s.card.id===canonical.card.id&&s.card.syllabusCode===canonical.card.syllabusCode,`Runtime card identity drifted at session ${s.order}`);
}
expect(runtimeStat.size < fullStat.size*0.72,
  `Runtime payload regression: ${runtimeStat.size} bytes vs full ${fullStat.size}`);

console.log(JSON.stringify({
  fullBytes:fullStat.size,
  runtimeBytes:runtimeStat.size,
  notesBytes:notesStat.size,
  runtimePercent:Number((100*runtimeStat.size/fullStat.size).toFixed(1)),
}));
