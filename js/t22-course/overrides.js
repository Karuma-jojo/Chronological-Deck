export function applyCourseOverrides(course,keys,patch){
 if(!patch) return course;
 for(const [sessionId,lesson] of Object.entries(patch.lessons||{})){
  const session=course.sessions.find(s=>s.id===sessionId);
  if(!session) throw Error(`Unknown session override ${sessionId}`);
  session.lesson=lesson;
 }
 for(const [sessionId,delta] of Object.entries(patch.sessionOverrides||{})){
  const session=course.sessions.find(s=>s.id===sessionId);
  if(!session) throw Error(`Unknown session override ${sessionId}`);
  Object.assign(session,delta);
 }
 for(const [problemId,delta] of Object.entries(patch.problems||{})){
  if(!course.problems[problemId]) throw Error(`Unknown problem override ${problemId}`);
  Object.assign(course.problems[problemId],delta);
 }
 for(const [problemId,delta] of Object.entries(patch.evaluators||{})){
  if(!keys[problemId]) throw Error(`Unknown evaluator override ${problemId}`);
  Object.assign(keys[problemId],delta);
 }
 course.instructionalAudit=patch.prerequisiteAudit||{};
 course.claimCoverage=patch.coverage||{};
 course.claimEvidence=patch.claimEvidence||{};
 course.evidenceDistance=patch.evidenceDistance||{};
 course.representationProgression=patch.representationProgression||[];
 course.retrievalPractice=patch.retrievalPractice||{};
 course.instructionSeparation=patch.instructionSeparation||{};
 course.historicalLessonAnswerOverlap=patch.historicalLessonAnswerOverlap||null;
 course.instructionVersion=patch.instructionVersion||null;
 course.authoringPolicy=patch.authoringPolicy||null;
 if(patch.readinessDiagnostic&&course.module) course.module.readinessDiagnostic=patch.readinessDiagnostic;
 return course;
}
