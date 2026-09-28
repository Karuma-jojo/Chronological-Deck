// Original foundation practice. No historical problem is assigned or exposed here.
export const FOUNDATION_MODULE = { id:'S-FOUNDATION-ALG1', title:'Algebra into problem solving' };
const unit=(n,title,stage,note,goals,guided=null)=>({
  id:`S-FOUNDATION-ALG1-U0${n}`,moduleId:FOUNDATION_MODULE.id,kind:'foundation',orderWithinModule:n,
  title,stage,t25Targets:[],prerequisiteUnits:n===1?[]:[`S-FOUNDATION-ALG1-U0${n-1}`],
  entry:'M01 algebra and M02 through S09: functions, substitution and polynomial notation.',
  learningNote:note,completionEvidence:goals,guided,
  mainTaskId:`S-FOUND-ALG-${2*n-1}` ,transferTaskId:`S-FOUND-ALG-${2*n}`,
  taskLabels:n<5?['Practice 1','Practice 2']:['Challenge 1','Challenge 2'],
});
export const FOUNDATION_UNITS = [
  unit(1,'Zeros and complete solution sets','Single idea',
`A zero of a function is an input at which its output is zero. For a polynomial, you can verify a proposed zero by substitution. Finding one zero does not establish that you have found every zero.

The zero-product rule says that a product of real numbers is zero exactly when at least one factor is zero. If both factors were nonzero, dividing their product by either one could not give zero. Thus (x+4)(x−1)=0 has precisely x=−4 or x=1. Substituting checks both; the zero-product rule explains completeness.

A repeated factor does not create a new distinct input: (x−5)²=0 still gives just x=5. Keep multiplicity separate from the number of distinct zeros.

When an equation has expressions on both sides, first move everything to one side. Factoring can preserve solutions that division would lose. From x(x+3)=4x, subtract 4x to obtain x(x−1)=0. Dividing by x at the start would discard the valid solution x=0.

Use this routine: state the real domain, make an equivalent equation, list candidates, check them and explain why the list is complete. These first tasks rehearse that routine; success is practice evidence, not evidence of contest readiness.`,
['Uses the zero-product rule in both directions','Keeps exceptional inputs when rearranging','Distinguishes distinct zeros from repeated factors'],
{prompt:'Solve x(x+2)=0 over the reals. A student divides by x and reports only −2. What was lost, and why?'}),
  unit(2,'What a square tells you','Single idea',
`For every real u, u²≥0, with equality exactly when u=0. This is a proof tool: rewriting an expression as a square plus a constant can prove a bound for every input, without checking infinitely many cases.

For example, x²+8x+19=(x+4)²+3. The square is nonnegative, so the expression is at least 3. At x=−4 it equals 3. A minimum needs both statements: no smaller value is possible, and this value is actually attained.

To complete the square in x²+bx+c, expand (x+b/2)²=x²+bx+b²/4, then compensate for the extra constant. You obtain (x+b/2)²+c−b²/4. You can always verify the rewrite by expanding back.

Squares can also connect two variables. Expanding gives (a−b)²=a²−2ab+b² and (a+b)²=a²+2ab+b². Consequently (a+b)²−(a−b)²=4ab. When a+b is fixed, a nonnegative square controls the product. Check when the square vanishes before claiming that a bound is attainable.

The second practice asks you to select and use that connection yourself. It is a supported combination of taught ideas, not a completely unseen method.`,
['Derives a bound from a nonnegative square','Exhibits the equality case','Separates a bound from an attained optimum'],
{prompt:'Rewrite x²−2x+4 as a square plus a constant. What is its minimum over the reals, and which input attains it?'}),
  unit(3,'When a parameter changes the answer','Combine ideas',
`A parameter is held fixed while you solve for the input. Different parameter values can change the number of solutions. Never divide by an expression involving a parameter before considering whether it might be zero.

For instance, t x=6 has x=6/t when t≠0 and no solution when t=0. By contrast, t x=0 has just x=0 when t≠0 and every real x when t=0. The exceptional case is part of the answer, not a technical afterthought.

Now consider (x−2)²=k. If k<0, no real input works. If k=0, only x=2 works. If k>0, x=2+√k and x=2−√k are two distinct solutions. This classification uses only the meaning of a square and the positive square root.

Two factors can also name the same root. In (x−r)(x−s)=0 the candidate roots are r and s; they are distinct only if r≠s. In parameter problems, write down which equalities would merge candidates, remove a coefficient, or make an equation an identity.

In each practice task, give disjoint cases covering every real parameter value. Explain both why your answers work and why there are no others.`,
['Handles a vanishing coefficient before division','Identifies coincident roots','Gives exhaustive parameter cases'],
{prompt:'How many distinct real solutions does (x+1)²=k have when k<0, k=0 and k>0? Explain each case.'}),
  unit(4,'Equations inside functions','Combine ideas',
`Composition asks you to feed one output into another function. When an equation contains f(g(x)), it can help to solve the outer condition for a temporary input t, then solve g(x)=t for each permitted t. This is an organisational choice, not a new rule about which solutions exist.

Example: let f(t)=(t−1)(t+2). To solve f(x+3)=0, first find t=1 or t=−2. Then solve x+3=1 or x+3=−2, giving x=−2 or x=−5. Substitution verifies both.

An inner function may fail to reach one of the outer candidates, or it may reach one candidate at several inputs. For real x, x² never reaches a negative value and reaches each positive value at two inputs. Do not carry an impossible branch into the final answer or discard the negative square root.

Equations such as f(f(x))=0 require two separate stages even though the function name is the same. Keep track of the input and output at each stage. At the end, substitute into the original composition and check that every branch has been considered.

The next two units mix these ideas without a worked example or a method label next to the question. Return here for a repair if needed; using the lesson is useful learning, and should be recorded as assistance.`,
['Solves outer and inner conditions in order','Checks the range of the inner function','Retains all admissible branches'],
{prompt:'Let g(t)=t². Solve g(x−2)=9 over the reals. Explain why there are two inputs, not one.'}),
  unit(5,'Mixed set A','Choose your approach',
`Attempt these questions without reading the preceding lessons immediately beforehand. They use the mathematics from this chapter, but the question will not tell you which representation to choose.

Write what you know, what must be found, and any useful attempts—even if they do not finish the problem. A numerical experiment can suggest a claim; it does not by itself prove a statement about every real input.

Save your working before opening a hint or reference. If you need help, use it and record it. A later reconstruction of this same solution is review evidence, not a fresh independent solve.`,
['Chooses an approach without a named method','Justifies completeness or a counterexample','Separates exploration from a finished argument']),
  unit(6,'Mixed set B — return later','Delayed mixed practice',
`Leave this set for a later study session if you have just completed Mixed set A. About a week is a useful starting interval; adjust it to your schedule. These are fresh tasks rather than a request to reproduce a solution you just saw.

The chapter provides the required mathematics. You still need to decide what to represent, which cases matter, and how to justify a conclusion for every permitted input. Difficulty is personal: taking longer or needing a hint does not invalidate the learning.

No score here certifies readiness for all past papers. After saving, compare the argument with the reference and identify the first unsupported step. Repair that gap before increasing the difficulty.`,
['Combines familiar ideas in a new problem','Finds equality and exceptional cases','Produces a complete argument after a delay']),
];
const prompts=[
  'Find all distinct real zeros of p(x)=(x−2)²(x+3). Explain why there are no others and why the squared factor does not produce two distinct inputs.',
  'Solve (x−1)(x+2)=2(x−1) over the reals. Give the complete solution set and explain how you avoided losing a solution.',
  'Find the minimum of q(x)=x²−6x+13 over all real x and every input attaining it. Can q(x)=3? Justify both answers.',
  'Real numbers a and b satisfy a+b=10. Find the largest possible value of ab. Prove your bound and give every equality case.',
  'For each real parameter a, find every real solution of a(x−2)=x−2. Your answer must cover all possible a.',
  'For which real values of b does (x−1)(x−b)=0 have exactly two distinct real solutions? What happens at every excluded value?',
  'Let f(t)=t²−5t+6. Find every real x satisfying f(x²)=0, and justify that your list is complete.',
  'Let f(t)=(t−1)². Find every real x satisfying f(f(x))=0. Check your answers in the original equation.',
  'Find every ordered pair of real numbers (x,y) satisfying x+y=6 and x²+y²=20. Explain why your list is complete.',
  'A student claims that if two polynomial functions agree at x=0, x=1 and x=2, they agree at every real input. Decide whether the claim is true. Give a proof or an explicit counterexample, including an input at which your example distinguishes the functions.',
  'For each real x, let H(x) be the larger of the two numbers x² and (x−4)². Find the smallest possible value of H(x), and all inputs attaining it. Prove that no smaller value is possible.',
  'Find every real number a such that x²+ax+1≥0 for every real x. Prove that all your proposed values work and every other a fails.',
];
export const FOUNDATION_PROBLEMS=Object.fromEntries(prompts.map((prompt,i)=>{
  const id=`S-FOUND-ALG-${i+1}`;
  return [id,{id,unitId:FOUNDATION_UNITS[Math.floor(i/2)].id,role:i%2?'transfer':'main',
    evidence:i<8?'Supported practice; not unseen mastery':'Fresh mixed practice if no hint or reference has been seen',prompt}];
}));
