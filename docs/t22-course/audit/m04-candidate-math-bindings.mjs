import assert from 'node:assert/strict';

// These are role-specific readers for ten fixed assessments, not a prose parser.
// Numeric expectations always come from the parsed public law and its computation.
export const criticalKinds=Object.freeze({
 'S19-M':'weightedExpectation','S25-M':'twoEventBounds','S25-T':'finiteUnionBounds',
 'S26-M':'historyTree','S26-T':'heterogeneousExactlyOne','S27-M':'reportingProtocols',
 'S27-T':'weightedReporter','S28-M':'firstSuccessCap','S28-T':'firstToTwo','S24-T':'exitInterval'
});
export const criticalIds=Object.keys(criticalKinds).map(k=>`T22V3::ARC048::${k}@1`);
const scalar='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:/[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))?';
const N=`(${scalar})(?!\\d|\\.\\d|[eE][+-]?\\d)`;
const list=n=>Array(n).fill(N).join(',\\s*');
const clean=s=>s.replaceAll('−','-');
const close=(a,b,label)=>assert(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-12,`${label}: ${a} != ${b}`);
function number(s){const [a,b]=clean(s).split('/').map(Number);assert(Number.isFinite(a)&&(!s.includes('/')||Number.isFinite(b)&&b!==0),`Invalid numeric literal ${s}`);return s.includes('/')?a/b:a;}
function read(text,pattern,label){const m=clean(text).match(new RegExp(pattern));assert(m,`${label}: missing numeric role`);return m.slice(1).map(number);}
function bind(text,pattern,expected,label){const values=read(text,pattern,label);assert.equal(values.length,expected.length,label+' arity');values.forEach((v,i)=>close(v,expected[i],label+`[${i}]`));}
const wordNumber=s=>({one:1,two:2,three:3,four:4,eight:8}[s]??number(s));
function law(ps,label){assert(ps.length&&ps.every(x=>Number.isFinite(x)&&x>=0&&x<=1),label+' illegal probability');close(ps.reduce((a,b)=>a+b,0),1,label+' normalization');}
function table(problem,title){const t=problem.representations?.find(r=>r.kind==='table'&&r.title===title);assert(t,problem.id+' missing mathematical table '+title);return t;}
function rows(problem,title,expected){const t=table(problem,title);assert.equal(t.rows.length,expected.length,title+' row count');assert.deepEqual(t.rows.map(r=>r[0]),expected.map(r=>r[0]),title+' labels');return t.rows;}

export function publicMathInputs(id,problem){
 const key=id.match(/::(S\d+-[MT])@1$/)?.[1],p=problem.prompt;
 let input;
 switch(key){
  case 'S19-M':{const v=read(p,`payoff ${N} with probability${N}, ${N} with probability${N}, and ${N} with probability${N}`,'payoff pairs');input={values:[v[0],v[2],v[4]],probabilities:[v[1],v[3],v[5]]};law(input.probabilities,'payoffs');break;}
  case 'S25-M':case 'S24-T':{const [a,b]=read(p,`P\\(A\\)=${N} and P\\(B\\)=${N}`,'event marginals');assert(a>=0&&a<=1&&b>=0&&b<=1,'event marginal legality');input={a,b};if(key==='S24-T'){const [winPayoff,losePayoff]=read(p,`score is${N} if A∪B occurs and${N} otherwise`,'score payoffs');input={a,b,winPayoff,losePayoff};}break;}
  case 'S25-T':{const marginals=read(p,`marginal probabilities${list(3)}`,'failure marginals');assert(marginals.every(x=>x>=0&&x<=1),'failure marginal legality');input={marginals};break;}
  case 'S26-M':{const stage1=read(p,`Stage1 chooses A with probability${N} or B with${N}`,'stage1');const s2=read(p,`probabilities are${N}/${N} after A and${N}/${N} after B`,'stage2');const s3=read(p,`success probabilities are${N} after history A-X,${N} after A-Y,${N} after B-X, and${N} after B-Y`,'full-history success laws');input={stage1,stage2:{A:s2.slice(0,2),B:s2.slice(2)},success:Object.fromEntries(['AX','AY','BX','BY'].map((h,i)=>[h,s3[i]]))};law(stage1,'stage1');law(input.stage2.A,'stage2 A');law(input.stage2.B,'stage2 B');assert(s3.every(x=>x>=0&&x<=1),'stage3 legality');break;}
  case 'S26-T':{assert(p.includes('Three trials are independent'),'public independent trial law');const successProbabilities=read(p,`success probabilities${list(3)} in positions1,2,3`,'trial probabilities');assert(successProbabilities.every(x=>x>=0&&x<=1),'trial legality');const average=successProbabilities.reduce((a,b)=>a+b,0)/3;bind(p,`average success probability${N}`,[average],'public average-p claim');input={successProbabilities};break;}
  case 'S27-M':{const [q]=read(p,`each have probability${N}`,'record atom law');assert(p.includes('Protocol R independently chooses one of the two field positions uniformly'),'public uniform independent selector law');input={recordMasses:[q,q,q,q],selector:[1/2,1/2]};law(input.recordMasses,'record law');break;}
  case 'S27-T':{const m=read(p,`HH:${N}, HT:${N}, TH:${N}, TT:${N}`,'record masses');const selector=read(p,`selects field1 with probability${N} and field2 with${N}`,'selector');input={recordMasses:Object.fromEntries(['HH','HT','TH','TT'].map((r,i)=>[r,m[i]])),selector};law(m,'record law');law(selector,'selector');assert(p.includes('reporter independently selects'),'independent reporter law');break;}
  case 'S28-M':{assert(p.includes('Independent fair H/T trials'),'fair independent stopped trials');const capText=p.match(/stop after (\w+) trials if no H has appeared/)?.[1];assert(capText,'public stopping cap');const cap=wordNumber(capText);assert(Number.isSafeInteger(cap)&&cap>0,'finite positive cap');bind(p,`including an H on trial${N}`,[cap],'inclusive public cap');input={pH:1/2,cap};break;}
  case 'S28-T':{assert(p.includes('independent rounds'),'public independent round law');const [pA,pB]=read(p,`A with probability${N} and by B with${N}`,'round probabilities');law([pA,pB],'round law');assert(p.includes('Stop as soon as either player has two wins'),'first-to-two stopping law');input={pA,pB};break;}
  default:throw Error('Unbound critical assessment '+id);
 }
 // A numeric display is part of the public premise, not decorative metadata.
 if(key==='S25-M'){
  const r=rows(problem,'Complete two-event region model',[['both'],['A only'],['B only'],['neither']]);assert.equal(r[0][1],'c');bind(r[1][1],`${N}-c`,[input.a],'A-only table');bind(r[2][1],`${N}-c`,[input.b],'B-only table');bind(r[3][1],`c-${N}`,[input.a+input.b-1],'neither table');
 }
 if(key==='S26-M'){const r=rows(problem,'Three-stage history ledger',[['A-X'],['A-Y'],['B-X'],['B-Y']]);r.forEach(([h,v])=>close(number(v),input.success[h.replace('-','')],'history table '+h));}
 if(key==='S27-M'){const r=rows(problem,'Underlying fair two-field records',[['HH'],['HT'],['TH'],['TT']]);r.forEach(([h,v],i)=>close(number(v),input.recordMasses[i],'record table '+h));}
 if(key==='S28-M'){const terminals=[...Array.from({length:input.cap},(_,k)=>'T'.repeat(k)+'H'),'T'.repeat(input.cap)];const r=rows(problem,'Stopped-record slots',terminals.map(x=>[x]));assert(r.every(x=>x[1]==='?'),'stopped slots must remain unsolved');}
 return input;
}

export function validateComputedAnswerBindings(id,problem,evaluator,out,input){
 const key=id.match(/::(S\d+-[MT])@1$/)[1],ref=evaluator.reference,rub=evaluator.rubric.map(r=>r.criterion).join('\n');
 const R=(pattern,values,label)=>bind(ref,pattern,values,id+' reference '+label);
 const B=(pattern,values,label)=>bind(rub,pattern,values,id+' rubric '+label);
 switch(key){
  case 'S19-M':{const terms=input.values.map((x,i)=>x*input.probabilities[i]);R(`Weighted terms are ${list(3)}`,terms,'weighted terms');B(`weighted terms ${list(3)}`,terms,'weighted terms');R(`E\\[X\\]=${N}`,[out.mean],'mean');B(`E\\[X\\]=${N}`,[out.mean],'mean');R(`Since ${N}≤${N}≤${N}`,[out.min,out.mean,out.max],'range');B(`bound ${N}≤${N}≤${N}`,[out.min,out.mean,out.max],'range');break;}
  case 'S25-M':{
   R(`${N}≤c≤${N}`,out.overlap,'overlap');R(`union interval is \\[${N},${N}\\]`,out.union,'union');R(`P\\(A∪B\\)=${N}-c`,[input.a+input.b],'inclusion-exclusion coefficient');R(`Region masses are c,${N}-c,${N}-c,${N}\\+c`,[input.a,input.b,1-input.a-input.b],'region expressions');
   const regions=c=>[c,input.a-c,input.b-c,1-input.a-input.b+c];R(`At c=${N} the regions \\(both,A-only,B-only,neither\\) are\\(${list(4)}\\); at c=${N} they are\\(${list(4)}\\)`,[out.overlap[0],...regions(out.overlap[0]),out.overlap[1],...regions(out.overlap[1])],'endpoint witnesses');R(`Independence would give c=${N}`,[input.a*input.b],'independent overlap');B(`${N}≤P\\(A∩B\\)≤${N}`,out.overlap,'overlap');B(`${N}≤P\\(A∪B\\)≤${N}`,out.union,'union');break;
  }
  case 'S25-T':{R(`ΣP\\(Fi\\)=${N}`,[out.upper],'union guarantee');R(`max\\(${list(3)}\\)=${N}`,[...input.marginals,out.lower],'lower guarantee');R(`disjoint to obtain ${N}`,[out.upper],'disjoint witness');R(`F1⊆F2⊆F3 to obtain ${N}`,[out.lower],'nested witness');B(`P\\(any failure\\)≤${N}`,[out.upper],'upper');B(`P\\(any failure\\)≥${N}`,[out.lower],'lower');B(`attaining${N} and${N}`,[out.lower,out.upper],'witness endpoints');break;}
  case 'S26-M':{
   ['AX','AY','BX','BY'].forEach((h,i)=>{const first=i<2?0:1,second=i%2;R(`${h}-S=${N}·${N}·${N}=${N}`,[input.stage1[first],input.stage2[h[0]][second],input.success[h],out.successLeaves[i]],h+' product');});
   R(`Failure leaves are${list(4)}`,out.failureLeaves,'failure leaves');R(`All eight sum${N}`,[out.total],'normalization');R(`P\\(success\\)=${N}\\+${N}\\+${N}\\+${N}=${N}`,[...out.successLeaves,out.successTotal],'success sum');B(`success ${list(4)} and failures ${list(4)}`,[...out.successLeaves,...out.failureLeaves],'all eight leaves');B(`terminal masses sum to${N}`,[out.total],'normalization');B(`P\\(success\\)=${N}`,[out.successTotal],'success');break;
  }
  case 'S26-T':{const p=input.successProbabilities;['SFF','FSF','FFS'].forEach((h,i)=>R(`${h}=${N}·${N}·${N}=${N}`,[...p.map((v,j)=>i===j?v:1-v),out.pathMasses[i]],h+' product'));R(`totaling${N}`,[out.exactlyOne],'exactly one');const avg=p.reduce((a,b)=>a+b,0)/3;R(`C\\(3,1\\)\\(${N}\\)\\(${N}\\)\\^2=${N}`,[avg,1-avg,out.averagePShortcut],'average-p shortcut');B(`path masses${list(3)}`,out.pathMasses,'path masses');B(`probability${N}`,[out.exactlyOne],'exactly one');B(`shortcut as${N}`,[out.averagePShortcut],'shortcut');break;}
  case 'S27-M':{const [hh,ht,th]=input.recordMasses,obs=hh+ht+th;R(`P\\(HH\\|H-present\\)=\\(${N}\\)/\\(${N}\\)=${N}`,[hh,obs,out.wholeRecord],'whole-record conditioning');R(`P\\(HH\\|selected H\\)=${N}/${N}=${N}`,[2,4,out.reportedField],'fine-atom count ratio');const counts=ref.match(/event 'selected value H' has (\w+) of (\w+) fine atoms/);assert(counts,'selected observation atom counts');close(wordNumber(counts[1]),4,'reported-H atom count');close(wordNumber(counts[2]),8,'fine atom count');const target=ref.match(/HH contributes (\w+) of those (\w+)/);assert(target,'HH selector atom counts');close(wordNumber(target[1]),2,'HH observation atom count');close(wordNumber(target[2]),8,'HH fine-space denominator');B(`P\\(HH\\|H-present\\)=${N}`,[out.wholeRecord],'whole-record conditional');B(`P\\(HH\\|selected H\\)=${N}`,[out.reportedField],'selected conditional');break;}
  case 'S27-T':{
   const m=input.recordMasses,[q1,q2]=input.selector,c=[m.HH,m.HT*q1,m.TH*q2,0];R(`HH:${N} \\(either selector\\), HT:${N}·${N}=${N}, TH:${N}·${N}=${N}, TT:${N}`,[c[0],m.HT,q1,c[1],m.TH,q2,c[2],c[3]],'observation contributions');R(`totaling${N}`,[out.observationMass],'observation denominator');R(`P\\(HH\\|reported H\\)=${N}/${N}=${N}`,[m.HH,out.observationMass,out.reportedConditional],'reported conditional');const whole=m.HH+m.HT+m.TH;R(`HH\\+HT\\+TH=${N}`,[whole],'filter denominator');R(`P\\(HH\\|at least one H\\)=${N}/${N}=${N}`,[m.HH,whole,out.directFilter],'direct filter');B(`contributions${list(4)}`,c,'contributions');B(`P\\(reported H\\)=${N}`,[out.observationMass],'denominator');B(`P\\(HH\\|reported H\\)=${N}/${N}=${N}`,[m.HH,out.observationMass,out.reportedConditional],'reported conditional');B(`H\\)=${N} and distinguishes`,[out.directFilter],'direct filter');break;
  }
  case 'S28-M':{R(`with masses${list(out.terminalMasses.length)}`,out.terminalMasses,'terminal masses');R(`exhaustive/disjoint and sum${N}`,[out.terminalMasses.reduce((a,b)=>a+b,0)],'normalization');R(`Success by the cap, including H on trial${N}, is${N}`,[input.cap,out.byCap],'inclusive success');B(`Assigns masses${list(out.terminalMasses.length)}`,out.terminalMasses,'terminal masses');B(`verifies they sum to${N}`,[1],'normalization');B(`including an H on trial${N}\\)=${N}`,[input.cap,out.byCap],'inclusive success');B(`terminal masses${list(out.terminalMasses.length)}`,out.terminalMasses,'padding mass conservation');R(`total${N}=${N}`,[out.terminalMasses[0],out.terminalMasses[0]],'first-prefix padding');R(`totaling${N}=${N}`,[out.terminalMasses[1],out.terminalMasses[1]],'second-prefix padding');R(`TTH and TTT remain${N} each`,[out.terminalMasses.at(-1)],'last-prefix padding');break;}
  case 'S28-T':{const labels=['AA','BB','ABA','ABB','BAA','BAB'];labels.forEach((h,i)=>R(`${h}\\(${N}\\)`,[out.terminalMasses[i]],h+' terminal'));R(`they sum${N}`,[out.terminalMasses.reduce((a,b)=>a+b,0)],'normalization');R(`probability=${N}\\+${N}\\+${N}=${N}`,[out.terminalMasses[0],out.terminalMasses[2],out.terminalMasses[4],out.aWins],'win sum');const p=input.pA,q=input.pB;R(`AAA\\(${N}\\)\\+AAB\\(${N}\\)=${N}`,[p**3,p*p*q,out.terminalMasses[0]],'AA padding');R(`BBA\\(${N}\\)\\+BBB\\(${N}\\)=${N}`,[q*q*p,q**3,out.terminalMasses[1]],'BB padding');B(`their masses${list(6)}`,out.terminalMasses,'terminal masses');B(`P\\(A wins\\)=${N}`,[out.aWins],'A wins');break;}
  case 'S24-T':{
   R(`${N}≤c≤${N}`,out.overlap,'overlap');R(`${N}≤u=P\\(A∪B\\)=${N}-c≤${N}`,[out.union[0],input.a+input.b,out.union[1]],'union');R(`lies in\\[${N},${N}\\]`,out.expectation,'expectation');const coeff=input.winPayoff-input.losePayoff;R(`expectation is${N}u-${N}\\(1-u\\)=${N}u-${N}`,[input.winPayoff,-input.losePayoff,coeff,-input.losePayoff],'payoff transform');
   const regions=c=>[c,input.a-c,input.b-c,1-input.a-input.b+c,input.a+input.b-c];R(`c=${N}: both${N},A-only${N},B-only${N},neither${N} \\(u=${N}\\); and c=${N}: both${N},A-only${N},B-only${N},neither${N} \\(u=${N}\\)`,[out.overlap[1],...regions(out.overlap[1]),out.overlap[0],...regions(out.overlap[0])],'endpoint witnesses');const independent=[input.a*input.b,input.a+input.b-input.a*input.b,out.independentExpectation];R(`Independence would choose c=${N},u=${N},E=${N}`,independent,'independent example');B(`overlap interval\\[${N},${N}\\] and union interval\\[${N},${N}\\]`,[...out.overlap,...out.union],'probability bounds');B(`expected-score interval\\[${N},${N}\\]`,out.expectation,'expectation bounds');B(`independence gives c=${N},u=${N},E=${N}`,independent,'independent example');break;
  }
  default:throw Error('Unbound answer '+id);
 }
}
