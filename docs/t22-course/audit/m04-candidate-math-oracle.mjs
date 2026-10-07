import assert from 'node:assert/strict';
import {criticalIds,criticalKinds,publicMathInputs,validateComputedAnswerBindings} from './m04-candidate-math-bindings.mjs';

const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);

function compute(kind,input){
  switch(kind){
    case 'weightedExpectation':{
      const mean=input.values.reduce((s,v,i)=>s+v*input.probabilities[i],0);
      return {mean,min:Math.min(...input.values),max:Math.max(...input.values)};
    }
    case 'twoEventBounds':{
      const lo=Math.max(0,input.a+input.b-1),hi=Math.min(input.a,input.b);
      return {overlap:[lo,hi],union:[input.a+input.b-hi,input.a+input.b-lo]};
    }
    case 'finiteUnionBounds':{
      return {lower:Math.max(...input.marginals),upper:input.marginals.reduce((x,y)=>x+y,0)};
    }
    case 'historyTree':{
      const [pa,pb]=input.stage1,[ax,ay]=input.stage2.A,[bx,by]=input.stage2.B;
      const s=[pa*ax*input.success.AX,pa*ay*input.success.AY,pb*bx*input.success.BX,pb*by*input.success.BY];
      const f=[pa*ax*(1-input.success.AX),pa*ay*(1-input.success.AY),pb*bx*(1-input.success.BX),pb*by*(1-input.success.BY)];
      return {successLeaves:s,failureLeaves:f,total:[...s,...f].reduce((x,y)=>x+y,0),successTotal:s.reduce((x,y)=>x+y,0)};
    }
    case 'heterogeneousExactlyOne':{
      const [p1,p2,p3]=input.successProbabilities;
      const paths=[p1*(1-p2)*(1-p3),(1-p1)*p2*(1-p3),(1-p1)*(1-p2)*p3];
      const avg=(p1+p2+p3)/3;
      return {pathMasses:paths,exactlyOne:paths.reduce((x,y)=>x+y,0),averagePShortcut:3*avg*(1-avg)**2};
    }
    case 'reportingProtocols':{
      const [hh,ht,th]=input.recordMasses; const [q1,q2]=input.selector;
      const whole=hh/(hh+ht+th);
      const obs=hh*(q1+q2)+ht*q1+th*q2;
      return {wholeRecord:whole,reportedField:hh*(q1+q2)/obs};
    }
    case 'weightedReporter':{
      const m=input.recordMasses,[q1,q2]=input.selector;
      const obs=m.HH*(q1+q2)+m.HT*q1+m.TH*q2;
      return {observationMass:obs,reportedConditional:m.HH/obs,directFilter:m.HH/(m.HH+m.HT+m.TH)};
    }
    case 'firstSuccessCap':{
      const p=input.pH,q=1-p,cap=input.cap;
      const terminal=[]; for(let k=1;k<=cap;k++) terminal.push(q**(k-1)*p); terminal.push(q**cap);
      return {terminalMasses:terminal,byCap:1-q**cap};
    }
    case 'firstToTwo':{
      const p=input.pA,q=input.pB;
      const terminal=[p*p,q*q,p*q*p,p*q*q,q*p*p,q*p*q];
      return {terminalMasses:terminal,aWins:terminal[0]+terminal[2]+terminal[4]};
    }
    case 'exitInterval':{
      const lo=Math.max(0,input.a+input.b-1),hi=Math.min(input.a,input.b);
      const union=[input.a+input.b-hi,input.a+input.b-lo];
      const expectation=union.map(u=>input.winPayoff*u+input.losePayoff*(1-u));
      const independentUnion=input.a+input.b-input.a*input.b;
      return {overlap:[lo,hi],union,expectation,independentExpectation:input.winPayoff*independentUnion+input.losePayoff*(1-independentUnion)};
    }
    default: throw Error(`Unknown M04 math oracle kind ${kind}`);
  }
}

function compare(actual,expected,path='expected'){
  if(typeof expected==='number'){close(actual,expected);return;}
  if(Array.isArray(expected)){
    assert(Array.isArray(actual),`${path} actual is not array`);assert.equal(actual.length,expected.length,`${path} length`);
    expected.forEach((x,i)=>compare(actual[i],x,`${path}[${i}]`));return;
  }
  assert(actual&&typeof actual==='object'&&!Array.isArray(actual),`${path} actual is not object`);
  assert.deepEqual(Object.keys(actual).sort(),Object.keys(expected).sort(),`${path} output coverage`);
  for(const [k,v] of Object.entries(expected)){assert(Object.hasOwn(actual,k),`${path}.${k} missing`);compare(actual[k],v,`${path}.${k}`);}
}

export function validateCandidateMathOracles(pack){
  const contract=pack.mathOracleContract;
  assert.equal(contract?.version,'m04-candidate-math-oracle-v1');
  assert.deepEqual([...contract.coveredProblems].sort(),[...criticalIds].sort(),'All ten critical assessments must stay bound');
  for(const id of contract.coveredProblems){
    const problem=pack.problems[id],evaluator=pack.evaluators[id],oracle=evaluator?.mathOracle;
    assert(problem&&evaluator&&oracle,`Missing candidate-bound math oracle for ${id}`);
    const key=id.match(/::(S\d+-[MT])@1$/)?.[1];
    assert.equal(oracle.kind,criticalKinds[key],`${id} oracle kind`);
    const inputs=publicMathInputs(id,problem);
    assert.deepEqual(oracle.inputs,inputs,`${id} oracle inputs disagree with the public model`);
    const actual=compute(oracle.kind,inputs);
    compare(actual,oracle.expected,`${id}.expected`);
    validateComputedAnswerBindings(id,problem,evaluator,actual,inputs);
    for(const token of oracle.referenceContains||[]) assert(evaluator.reference.includes(token),`${id} reference lost oracle-bound token ${token}`);
    const rubricText=evaluator.rubric.map(r=>r.criterion).join('\n');
    for(const token of oracle.rubricContains||[]) assert(rubricText.includes(token),`${id} rubric lost oracle-bound token ${token}`);
  }
  return true;
}

export function runCandidateMathMutationProbes(pack){
  const clone=()=>structuredClone(pack);
  const mustFail=(label,mutate)=>{
    const x=clone();mutate(x);
    assert.notDeepEqual(x,pack,`Mutation made no change: ${label}`);
    assert.throws(()=>validateCandidateMathOracles(x),undefined,`Mutation unexpectedly survived: ${label}`);
  };
  const s26='T22V3::ARC048::S26-M@1';
  mustFail('wrong S26 reference .48→.49',x=>{x.evaluators[s26].reference=x.evaluators[s26].reference.replace('=.48','=.49');});
  const s27='T22V3::ARC048::S27-T@1';
  mustFail('wrong S27 rubric denominator .325→.326',x=>{const r=x.evaluators[s27].rubric.find(z=>z.criterion.includes('0.325'));r.criterion=r.criterion.replace('0.325','0.326');});
  const s25='T22V3::ARC048::S25-T@1';
  mustFail('wrong S25 oracle input .30→.31 with stale expected endpoint',x=>{x.evaluators[s25].mathOracle.inputs.marginals[2]=.31;});
  const pid=key=>`T22V3::ARC048::${key}@1`;
  const replace=(text,old,value)=>{assert(text.includes(old),`Mutation target absent: ${old}`);assert.notEqual(old,value);const next=text.replace(old,value);assert.notEqual(next,text,'No-op text mutation');return next;};
  const publicCases=[
    ['S19-M','payoff −3','payoff −4'],['S25-M','P(A)=0.60','P(A)=0.65'],
    ['S25-T','0.15,0.20,0.30','0.15,0.20,0.31'],['S26-M','0.20 after history A-X','0.25 after history A-X'],
    ['S26-T','0.20,0.50,0.80','0.25,0.50,0.80'],['S27-M','each have probability1/4','each have probability1/5'],
    ['S27-T','HH:0.10, HT:0.20, TH:0.30, TT:0.40','HH:0.11, HT:0.20, TH:0.30, TT:0.39'],
    ['S28-M','stop after three trials','stop after four trials'],
    ['S28-T','A with probability0.60 and by B with0.40','A with probability0.65 and by B with0.35'],
    ['S24-T','score is+5','score is+6']
  ];
  for(const [key,old,value] of publicCases)mustFail(`${key} public premise changed`,x=>{const id=pid(key);x.problems[id].prompt=replace(x.problems[id].prompt,old,value);});
  const referenceCases=[
    ['S19-M','E[X]=2','E[X]=2.1'],['S25-M','.10≤c≤.50','.11≤c≤.50'],
    ['S25-T','ΣP(Fi)=.65','ΣP(Fi)=.66'],['S26-M','P(success)=.04+.14+.12+.18=.48','P(success)=.04+.14+.12+.18=.49'],
    ['S26-T','totaling.42','totaling.43'],['S27-M','(1/4)/(3/4)=1/3','(1/4)/(3/4)=1/4'],
    ['S27-T','totaling.325','totaling.326'],['S28-M','with masses1/2,1/4,1/8,1/8','with masses1/3,1/4,1/8,1/8'],
    ['S28-T','AA(.36)','AA(.35)'],['S24-T','lies in[2.6,5]','lies in[2.7,5]']
  ];
  const rubricCases=[
    ['S19-M','weighted terms −0.6,+0.5,+2.1','weighted terms −0.7,+0.5,+2.1'],
    ['S25-M','0.10≤P(A∩B)≤0.50','0.11≤P(A∩B)≤0.50'],
    ['S25-T','P(any failure)≤0.65','P(any failure)≤0.66'],
    ['S26-M','success .04,.14,.12,.18','success .05,.14,.12,.18'],
    ['S26-T','path masses0.02,0.08,0.32','path masses0.03,0.08,0.32'],
    ['S27-M','P(HH|H-present)=1/3','P(HH|H-present)=1/4'],
    ['S27-T','P(reported H)=0.325','P(reported H)=0.326'],
    ['S28-M','Assigns masses1/2,1/4,1/8,1/8','Assigns masses1/3,1/4,1/8,1/8'],
    ['S28-T','masses0.36,0.16','masses0.35,0.16'],
    ['S24-T','expected-score interval[2.6,5]','expected-score interval[2.7,5]']
  ];
  // Disable legacy token assertions in these tests: rejection must come from
  // computed role bindings, even when token metadata is stale or edited away.
  for(const [key,old,value] of referenceCases)mustFail(`${key} computed reference value changed without tokens`,x=>{const e=x.evaluators[pid(key)];e.mathOracle.referenceContains=[];e.mathOracle.rubricContains=[];e.reference=replace(e.reference,old,value);});
  for(const [key,old,value] of rubricCases)mustFail(`${key} computed rubric value changed without tokens`,x=>{const e=x.evaluators[pid(key)];e.mathOracle.referenceContains=[];e.mathOracle.rubricContains=[];const row=e.rubric.find(r=>r.criterion.includes(old));assert(row,`Missing rubric mutation ${key}`);row.criterion=replace(row.criterion,old,value);});
  mustFail('S26 coherent oracle differs from public and scored model',x=>{const o=x.evaluators[s26].mathOracle;o.inputs.success.AX=.25;o.expected.successLeaves[0]=.05;o.expected.failureLeaves[0]=.15;o.expected.successTotal=.49;});
  for(const [key,row,col,value] of [['S25-M',1,1,'0.65−c'],['S26-M',0,1,'0.25'],['S27-M',0,1,'1/5'],['S28-M',0,0,'HH']])mustFail(`${key} displayed model changed`,x=>{x.problems[pid(key)].representations[0].rows[row][col]=value;});
  mustFail('critical output omitted',x=>{delete x.evaluators[s26].mathOracle.expected.successLeaves;});
  mustFail('critical assessment omitted',x=>{x.mathOracleContract.coveredProblems=x.mathOracleContract.coveredProblems.filter(id=>id!==s26);});
  // Positive control: a fully consistent different instance must be accepted.
  // This prevents the bindings from degenerating into a freeze of old answers.
  const valid=clone(),ev=valid.evaluators[s26],o=ev.mathOracle;
  valid.problems[s26].prompt=replace(valid.problems[s26].prompt,'0.20 after history A-X','0.25 after history A-X');
  valid.problems[s26].representations[0].rows[0][1]='0.25';
  o.inputs.success.AX=.25;o.expected.successLeaves[0]=.05;o.expected.failureLeaves[0]=.15;o.expected.successTotal=.49;
  ev.reference=replace(ev.reference,'AX-S=.4·.5·.2=.04','AX-S=.4·.5·.25=.05');
  ev.reference=replace(ev.reference,'Failure leaves are.16,.06,.03,.27','Failure leaves are.15,.06,.03,.27');
  ev.reference=replace(ev.reference,'P(success)=.04+.14+.12+.18=.48','P(success)=.05+.14+.12+.18=.49');
  ev.rubric.find(r=>r.criterion.includes('success .04,.14,.12,.18')).criterion=replace(ev.rubric.find(r=>r.criterion.includes('success .04,.14,.12,.18')).criterion,'success .04,.14,.12,.18 and failures .16,.06,.03,.27','success .05,.14,.12,.18 and failures .15,.06,.03,.27');
  const totalRow=ev.rubric.find(r=>r.criterion.includes('P(success)=0.48'));totalRow.criterion=replace(totalRow.criterion,'P(success)=0.48','P(success)=0.49');
  o.referenceContains=[];o.rubricContains=[];
  assert.equal(validateCandidateMathOracles(valid),true,'Coherent changed instance should pass computed bindings');
  return true;
}
