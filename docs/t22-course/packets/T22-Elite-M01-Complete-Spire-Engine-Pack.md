# T22 Elite — M01 Complete Spire Engine Pack

**ENGINE ONLY — ANSWER-BEARING.** This packet contains all 17 current accepted M01 sessions, both fixed tasks for every session, references/rubrics, current repaired instruction, coverage/separation metadata and provenance notes. Do not reveal sealed answers/rubrics before the learner attempt except as permitted by the installed Spire/WALL engine.

## Attachment instructions

Load this file as the module authority for M01. Preserve the installed Master Spire / Runtime Guardian rules. Run sessions in order S01→S17 unless the installed engine explicitly authorizes another route. For each session, present learner-facing lesson/current task only at the engine's permitted stage; keep evaluator references, rubrics, sibling-task answers and provenance metadata sealed. Assistance must be recorded and must not count as independent evidence. A session pass is evidence for that session only; it does not automatically clear M01.

## Provenance

- Repository: Karuma-jojo/Chronological-Deck
- Branch: codex/t22-pedagogical-rebuild
- Course metadata version at compilation: T22E-course-0.6.0-m06
- Module: T22E-FND01 — Quantitative Foundations I — Numeracy & Algebra
- Accepted module status: authored-v1.2-a07-accepted
- Instruction version: m01-instruction-a07-separated-v1
- Repair overlay: m01-repairs-1.2-a07
- Base session packs: m01-001-005, m01-006-010, m01-011-015, m01-016-017
- Evaluator packs: eval-m01-001-005, eval-m01-006-010, eval-m01-011-015, eval-m01-016-017
- Overlay applied after base/evaluator packs: course/t22/authoring/m01-repairs-1.1.json

## Module contract

```json
{
  "order": 1,
  "id": "T22E-FND01",
  "title": "Quantitative Foundations I — Numeracy & Algebra",
  "status": "authored-v1.2-a07-accepted",
  "destination": "From a Class-10-ish starting point, become reliable with exact numerical reasoning, ratios/percentages/units, estimation, symbolic algebra, equations, inequalities, absolute value and elementary quadratics—without hidden calculator dependence.",
  "gate": "M01 is not cleared by page completion. Clearance requires independent evidence across the session ownership claims plus delayed transfer/synthesis evidence. The dedicated course page records study evidence; it does not silently rewrite legacy T22 progress.",
  "nextBoundary": "M02 owns functions, domains/ranges, graphs, coordinate geometry, parameters, transformations, exponentials/logarithms, sequences, sigma notation and essential trigonometry. M01 must not pre-teach those as the main capability."
}
```

## Session index

01. Signed numbers, order & operation structure
02. Fractions as numbers, not formatting
03. Ratios, proportions & rates
04. Percentages & percentage points
05. Sequential percentage change & reverse percentages
06. Units, conversions & dimensional reasoning
07. Estimation, scale & numerical sanity checks
08. Powers, roots & scientific notation
09. Algebraic expressions, substitution & expansion
10. Factoring & algebraic identities
11. Linear equations & reversible transformations
12. Formulas, rearrangement & parameters
13. Simultaneous linear equations & constraint intersection
14. Inequalities & sign-aware algebra
15. Absolute value as distance
16. Quadratic equations as algebraic constraints
17. M01 synthesis — quantitative algebra under pressure

---

# M01 · S01 — Signed numbers, order & operation structure

Session ID: `T22V3::T22E-FND01::S01@1`
Contract hash: `5b87e40fcc380be78c946a9bcecdd0aaf7ec0bb05905d6fb4215ba96a387eaa0`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Signed numbers, order & operation structure",
  "focus": "Signed arithmetic, order on the real line, parentheses and operation hierarchy.",
  "purpose": "Make every later calculation trustworthy by separating sign, magnitude and grouping instead of relying on calculator-shaped intuition.",
  "centralCapability": "Evaluate and compare signed numerical expressions exactly, preserving grouping and explaining sign decisions.",
  "principalObstacle": "Minus signs are often treated as decoration; a leading negative, subtraction sign and negative factor are different operations.",
  "entryPrerequisites": [
    "Whole-number arithmetic",
    "Meaning of a negative number as position below zero"
  ],
  "requiredOwnership": [
    "Evaluate nested parentheses before combining outer operations.",
    "Distinguish subtraction from adding a negative.",
    "Apply powers before an external leading negative unless parentheses say otherwise.",
    "Compare negative numbers by position on the number line, not by digit size.",
    "Perform a quick magnitude/sign sanity check before accepting an answer."
  ],
  "applicationScope": "Exact arithmetic with integers, terminating decimals and simple radicals where the main issue is sign or grouping.",
  "transferScope": "A fresh mixed expression or ordering task whose surface differs but requires the same sign-and-grouping discipline.",
  "inScope": [
    "Signed addition/subtraction",
    "Multiplication/division signs",
    "Parentheses",
    "Order of operations",
    "Numerical ordering"
  ],
  "outOfScope": [
    "Fraction techniques beyond simple use",
    "Algebraic unknowns",
    "Function notation",
    "Proof by cases"
  ],
  "exitCondition": "Correctly evaluate one unfamiliar nested signed expression and order four unfamiliar signed quantities with a one-sentence sign/magnitude justification."
}
```

## Learning note — assistance, not independent evidence

A signed number has a sign and a magnitude. On the number line, farther left means smaller. Read a numerical expression from its grouping outward: parentheses first, then powers, then multiplication/division, then addition/subtraction. A leading minus outside a power is applied after the power unless the negative base is parenthesized. Worked example: −6−[3−(−2)]+3² = −6−5+9 = −2. Guided check: evaluate −4²+(−4)²−[6−(−2)] and predict the sign before calculating.

## MAIN TASK — learner-facing

Evaluate exactly: −18 − [7 − 3(−4)] + 2^3. Then order from smallest to largest: −3, −2.75, −2.7, −2.6. Give one quick sign/magnitude sanity check for each part.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

Inside brackets: 3(−4)=−12, so 7−(−12)=19. Thus −18−19+8=−29. Ordering: −3 < −2.75 < −2.7 < −2.6. Sanity: the bracket is positive and large, so the expression should lie well below −18; all four ordered values lie between −3 and −2.6.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Nested expression is evaluated with correct grouping and sign logic."
  },
  {
    "points": 3,
    "criterion": "All four signed decimals/integers are ordered correctly."
  },
  {
    "points": 2,
    "criterion": "Ordering is justified by number-line/sign reasoning."
  },
  {
    "points": 2,
    "criterion": "A sensible magnitude/sign sanity check is stated."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

Without a calculator, evaluate −3^2 + (−3)^2 − 2[5−(−1)]. Then decide which is larger: −2.75 or −2.8, and justify using number-line order rather than calculator authority.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

−3²=−9 while (−3)²=9. The bracket is6, so the expression is −9+9−12=−12. Also −2.75 is larger than −2.8 because it lies to the right on the number line.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 5,
    "criterion": "Correctly distinguishes −3² from (−3)² and gets −12."
  },
  {
    "points": 2,
    "criterion": "Correctly identifies −2.75 as larger."
  },
  {
    "points": 3,
    "criterion": "Justification uses number-line order rather than calculator authority."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Evaluate nested parentheses before combining outer operations.
2. Distinguish subtraction from adding a negative.
3. Apply powers before an external leading negative unless parentheses say otherwise.
4. Compare negative numbers by position on the number line, not by digit size.
5. Perform a quick magnitude/sign sanity check before accepting an answer.

Coverage mapping:

```json
[
  [
    "main"
  ],
  [
    "main"
  ],
  [
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "signed arithmetic and parentheses",
    "source": "entry readiness: whole-number arithmetic plus negative-number meaning; lesson gives operation hierarchy"
  },
  {
    "item": "integer powers such as 2^3 and −3^2",
    "source": "just-in-time S01 lesson explicitly teaches power-before-leading-minus; only integer powers are used"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "−18 − [7 − 3(−4)] + 2^3",
    "−3, −2.75, −2.7, −2.6"
  ],
  "transfer": [
    "−3^2 + (−3)^2 − 2[5−(−1)]",
    "−2.75 or −2.8"
  ]
}
```

---

# M01 · S02 — Fractions as numbers, not formatting

Session ID: `T22V3::T22E-FND01::S02@1`
Contract hash: `773ca95c3945f0766beafdfac9f0a61fa2653ad7ef3e5547b5b2fc1010db09ab`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Fractions as numbers, not formatting",
  "focus": "Equivalent fractions, common denominators and exact fraction arithmetic.",
  "purpose": "Prevent later probability, rates and algebra from collapsing because fractions are manipulated as symbol patterns instead of numbers.",
  "centralCapability": "Reduce, compare, add, subtract, multiply and divide fractions while preserving exactness and explaining the denominator logic.",
  "principalObstacle": "Cross-multiplication and cancellation are often memorized without understanding when or why they preserve value.",
  "entryPrerequisites": [
    "M01-S01 signed arithmetic",
    "Multiplication tables and integer factors"
  ],
  "requiredOwnership": [
    "Reduce a fraction by a common nonzero factor.",
    "Construct a common denominator deliberately rather than by trial.",
    "Add/subtract fractions only after expressing like-sized parts.",
    "Multiply numerators and denominators then reduce cleanly.",
    "Interpret division by a nonzero fraction as multiplication by its reciprocal."
  ],
  "applicationScope": "Signed rational numbers and finite arithmetic expressions.",
  "transferScope": "A fresh exact calculation where decimal conversion would obscure structure or create avoidable rounding.",
  "inScope": [
    "Equivalent fractions",
    "Reduction",
    "Common denominators",
    "Fraction multiplication",
    "Fraction division"
  ],
  "outOfScope": [
    "Variable rational expressions",
    "Infinite decimals as limits",
    "Ratios with units reserved for S03",
    "Probability interpretation reserved for M04"
  ],
  "exitCondition": "Complete one multi-step exact fraction calculation and one comparison without premature decimal rounding."
}
```

## Learning note — assistance, not independent evidence

A fraction a/b is one number, with b≠0. Equivalent fractions come from multiplying numerator and denominator by the same nonzero factor. Addition/subtraction needs a common denominator; multiplication multiplies numerators and denominators; division by a nonzero fraction multiplies by its reciprocal. Worked example: 2/5+7/10=4/10+7/10=11/10; (4/7)(21/10)=6/5; and (5/8)÷(15/16)=(5/8)(16/15)=2/3. Guided check: reduce 21/35, then compute 7/12−1/8 and (4/9)(3/14) exactly.

## MAIN TASK — learner-facing

Compute exactly and reduce fully: 3/8 + 5/12 − 1/6. Then compute (7/9) ÷ (14/15). Do not convert to decimals until after the exact answers.

Task ID: `T22V3::T22E-FND01::S02-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

LCM(8,12,6)=24: 9/24+10/24−4/24=15/24=5/8. Also (7/9)(15/14); cancel 7 with14 and15 with9 to get 5/6.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "First expression is converted to a valid common denominator and simplified to 5/8."
  },
  {
    "points": 3,
    "criterion": "Division is converted to reciprocal multiplication and simplified to 5/6."
  },
  {
    "points": 2,
    "criterion": "Work remains exact until the end."
  },
  {
    "points": 1,
    "criterion": "No illegal cancellation across addition/subtraction."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Which is larger, 17/28 or 5/8? Then compute and reduce (5/6)(3/10) explicitly, and use that result to evaluate 1 − [2/3 − (5/6)(3/10)] exactly.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

17/28=34/56 and5/8=35/56, so5/8 is larger. (5/6)(3/10)=15/60=1/4. Then 2/3−1/4=5/12 and1−5/12=7/12.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Comparison is correct and justified exactly."
  },
  {
    "points": 2,
    "criterion": "Fraction product is explicitly reduced to1/4."
  },
  {
    "points": 3,
    "criterion": "Nested expression is simplified to7/12."
  },
  {
    "points": 2,
    "criterion": "All cancellation/common-denominator steps are valid."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Reduce a fraction by a common nonzero factor.
2. Construct a common denominator deliberately rather than by trial.
3. Add/subtract fractions only after expressing like-sized parts.
4. Multiply numerators and denominators then reduce cleanly.
5. Interpret division by a nonzero fraction as multiplication by its reciprocal.

Coverage mapping:

```json
[
  [
    "main"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "main"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "fraction notation, common denominators, reciprocal division",
    "source": "S02 lesson teaches all before independent assessment"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "3/8 + 5/12 − 1/6",
    "(7/9) ÷ (14/15)"
  ],
  "transfer": [
    "17/28 or 5/8",
    "(5/6)(3/10)"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S02-T@1`

---

# M01 · S03 — Ratios, proportions & rates

Session ID: `T22V3::T22E-FND01::S03@1`
Contract hash: `98bfcfe22ae8869e8727d8d986611ff9a37fbb373173028e95fec9f64f93df3c`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Ratios, proportions & rates",
  "focus": "Multiplicative comparison, unit rates and proportional scaling.",
  "purpose": "Build the language used later for odds, leverage, turnover, speeds, costs and normalized quantities.",
  "centralCapability": "Translate between ratio statements, proportions and unit rates, and solve a proportional scaling problem with units attached.",
  "principalObstacle": "Ratios are often confused with differences, and a:b is sometimes treated as if it already had a physical unit or probability meaning.",
  "entryPrerequisites": [
    "M01-S02 exact fractions",
    "Basic multiplication and division"
  ],
  "requiredOwnership": [
    "Interpret a:b as a multiplicative comparison.",
    "Reduce ratios while preserving order.",
    "Convert a ratio to a unit rate when units are supplied.",
    "Solve direct proportions using a scale factor or equation.",
    "Keep compound units attached through calculations."
  ],
  "applicationScope": "Finite positive/negative numerical ratios and direct proportionality.",
  "transferScope": "A rate problem with unfamiliar units or a hidden scale factor.",
  "inScope": [
    "Part-to-part ratios",
    "Part-to-whole conversion",
    "Unit rates",
    "Direct proportion",
    "Compound units"
  ],
  "outOfScope": [
    "Inverse proportion as a formal topic",
    "Probability odds",
    "Dimensional-analysis chains reserved for S06",
    "Log returns"
  ],
  "exitCondition": "Given a fresh ratio/rate situation, identify what is being compared, compute the requested scaled quantity and state the units correctly."
}
```

## Learning note — assistance, not independent evidence

A ratio compares multiplicatively; order matters. A rate is a ratio with units. Direct proportion means the same scale factor applies to every part. Worked example: a 4:7 mixture with total ₹33,000 has eleven parts, so one part is ₹3,000 and the amounts are ₹12,000 and ₹21,000. Guided check: reduce 15:25:10, then allocate ₹60,000 in that reduced ratio and verify the parts sum to the total.

## MAIN TASK — learner-facing

A toy desk processes 360 orders in 12 minutes at a constant rate. Find the unit rate in orders/minute and orders/second. At that rate, how many orders are processed in 7.5 minutes?

Task ID: `T22V3::T22E-FND01::S03-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

360/12=30 orders/minute = 0.5 order/second. In7.5 minutes:30×7.5=225 orders.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Correct unit rate 30 orders/minute."
  },
  {
    "points": 2,
    "criterion": "Correct conversion to 0.5 order/second."
  },
  {
    "points": 3,
    "criterion": "Correct scaled count 225."
  },
  {
    "points": 2,
    "criterion": "Units are carried and interpreted correctly."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

A risk-budget ratio is quoted Equity:Bond:Cash = 10:6:4. Reduce it to the simplest whole-number ratio. If the total budget is ₹84,000, allocate each part and state the equity amount as a fraction of the total.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

10:6:4 reduces by2 to5:3:2. Total ratio parts=10, so one part=₹8,400. Equity=₹42,000, Bond=₹25,200, Cash=₹16,800. Equity is5/10=1/2 of total.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 2,
    "criterion": "Reduces10:6:4 to5:3:2 while preserving order."
  },
  {
    "points": 2,
    "criterion": "Recognizes10 total reduced-ratio parts."
  },
  {
    "points": 4,
    "criterion": "All three allocations are correct."
  },
  {
    "points": 1,
    "criterion": "Equity fraction is1/2."
  },
  {
    "points": 1,
    "criterion": "Amounts sum back to₹84,000."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Interpret a:b as a multiplicative comparison.
2. Reduce ratios while preserving order.
3. Convert a ratio to a unit rate when units are supplied.
4. Solve direct proportions using a scale factor or equation.
5. Keep compound units attached through calculations.

Coverage mapping:

```json
[
  [
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "colon ratio notation and compound units",
    "source": "S03 lesson defines ratios/rates before assessment; fraction arithmetic from S02"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "360 orders in 12 minutes",
    "7.5 minutes"
  ],
  "transfer": [
    "10:6:4",
    "₹84,000"
  ]
}
```

---

# M01 · S04 — Percentages & percentage points

Session ID: `T22V3::T22E-FND01::S04@1`
Contract hash: `827552e30af36387926bc9984f21bbfd800584efbd15b10aeaa96ca87bbdc069`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Percentages & percentage points",
  "focus": "Percent as a ratio per hundred, relative change and percentage-point change.",
  "purpose": "Eliminate a common quantitative communication error before returns, probabilities and statistics depend on the distinction.",
  "centralCapability": "Convert among fractions/decimals/percentages and distinguish an absolute percentage-point move from a relative percent change.",
  "principalObstacle": "A move from 8% to10% is often called 'up 2%' even though the relative increase is25%.",
  "entryPrerequisites": [
    "M01-S02 fractions",
    "M01-S03 ratios"
  ],
  "requiredOwnership": [
    "Convert percent to decimal multiplier and back.",
    "Find a percentage of a base amount.",
    "Compute relative percent change using the original value as denominator.",
    "Compute percentage-point change between percentages.",
    "State explicitly which notion is being reported."
  ],
  "applicationScope": "Percentages, rates, probabilities and simple financial quantities.",
  "transferScope": "A changed-base or probability example where percentage points and relative percent change give very different numbers.",
  "inScope": [
    "Percent-of calculations",
    "Decimal multipliers",
    "Relative change",
    "Percentage points",
    "Base-value identification"
  ],
  "outOfScope": [
    "Sequential compounding reserved for S05",
    "Annualization",
    "Logarithmic change",
    "Statistical confidence intervals"
  ],
  "exitCondition": "Correctly report both percentage-point and relative percent changes on a fresh example and identify the base used."
}
```

## Learning note — assistance, not independent evidence

Percent means per hundred. Relative percent change uses the original value in the denominator; percentage-point change subtracts displayed percentages. Worked example: 30%→36% is +6 percentage points but a relative increase of 6/30=20%. Guided check: for 55%→44%, report the percentage-point and relative changes, then write 44% as a decimal and 0.625 as a fraction and percentage.

## MAIN TASK — learner-facing

A model's error rate falls from 8% to 6%. Report (a) the change in percentage points and (b) the relative percent reduction in error. If there were 2,500 cases at each rate, how many fewer errors does 6% imply?

Task ID: `T22V3::T22E-FND01::S04-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

Percentage-point change =6%−8%=−2 percentage points, i.e. a2-point reduction. Relative reduction=(8−6)/8=25%. Errors:200 versus150, so50 fewer.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Reports a 2-percentage-point reduction."
  },
  {
    "points": 3,
    "criterion": "Reports a 25% relative reduction using 8% as base."
  },
  {
    "points": 3,
    "criterion": "Computes 50 fewer errors."
  },
  {
    "points": 1,
    "criterion": "Clearly distinguishes the two change measures."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

A fill probability rises from 40% to 46%. Give the percentage-point increase and relative percent increase. Write 46% as a decimal. Then convert 0.375 to both a fraction in lowest terms and a percentage.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Increase=6 percentage points. Relative increase=6/40=15%. 46%=0.46. Also0.375=375/1000=3/8=37.5%.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "6 percentage points and15% relative increase are both correct."
  },
  {
    "points": 2,
    "criterion": "46% is correctly written as0.46."
  },
  {
    "points": 3,
    "criterion": "0.375 is converted to3/8 and37.5%."
  },
  {
    "points": 1,
    "criterion": "The original40% is used as the relative-change base."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Convert percent to decimal multiplier and back.
2. Find a percentage of a base amount.
3. Compute relative percent change using the original value as denominator.
4. Compute percentage-point change between percentages.
5. State explicitly which notion is being reported.

Coverage mapping:

```json
[
  [
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "percent, decimal and percentage-point notation",
    "source": "S04 lesson defines each; ratios/fractions from S02-S03"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "8% to 6%",
    "2,500 cases"
  ],
  "transfer": [
    "40% to 46%",
    "0.375"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S04-T@1`

---

# M01 · S05 — Sequential percentage change & reverse percentages

Session ID: `T22V3::T22E-FND01::S05@1`
Contract hash: `dc241f81ba7ea13a8b973a60f041e6927d83528f0f0b9ab0866acbbc5c14a651`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Sequential percentage change & reverse percentages",
  "focus": "Multiplicative percentage changes, path dependence and recovering an original base.",
  "purpose": "Prepare for returns and compounding by replacing add-the-percentages intuition with multiplier reasoning.",
  "centralCapability": "Compose successive percentage changes as multipliers, compute net change, and reverse a known percentage move.",
  "principalObstacle": "Equal up/down percentages do not cancel because the second percentage acts on a different base.",
  "entryPrerequisites": [
    "M01-S04 percentages",
    "M01-S03 multiplicative reasoning"
  ],
  "requiredOwnership": [
    "Translate +p% and −p% into multipliers.",
    "Compose sequential percentage moves by multiplication.",
    "Compute final value and net percent change from the original base.",
    "Explain why +p% then −p% is generally negative for p≠0.",
    "Recover an original value by dividing by the known multiplier."
  ],
  "applicationScope": "Two or three sequential finite percentage changes and reverse-percent problems.",
  "transferScope": "A fresh path where the same listed percentages occur in a different order or the original amount is hidden.",
  "inScope": [
    "Sequential multipliers",
    "Net percentage return",
    "Equal up/down asymmetry",
    "Reverse percentages",
    "Changed bases"
  ],
  "outOfScope": [
    "Continuous compounding",
    "Log returns",
    "Interest-rate conventions",
    "Portfolio attribution"
  ],
  "exitCondition": "On a fresh sequence, compute final and net change exactly and reverse one percentage move without adding percentages."
}
```

## Learning note — assistance, not independent evidence

Sequential percentage changes are multipliers, not labels to add. To reverse a known move, divide by its multiplier. Worked example: ₹2,500 rising 8% and then falling 20% becomes 2500×1.08×0.80=₹2,160, a net −13.6%. Guided check: start from ₹3,000, apply +12% then −7%, compute the final value and net change, and explain why the two labels should not simply be added.

## MAIN TASK — learner-facing

₹24,000 increases by12.5% and then decreases by12.5%. Find the final amount and net percentage change from the start. Separately, an item is ₹960 after a20% reduction; find its original value.

Task ID: `T22V3::T22E-FND01::S05-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

Final=24000×1.125×0.875=₹23,625. Net change=(23625−24000)/24000=−1.5625%. Original=960/0.8=₹1,200.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Final value ₹23,625 is correct."
  },
  {
    "points": 3,
    "criterion": "Net change −1.5625% is correct."
  },
  {
    "points": 2,
    "criterion": "Reverse-percentage original ₹1,200 is correct."
  },
  {
    "points": 1,
    "criterion": "Uses multiplicative reasoning, not percentage addition."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

A quantity rises10%, falls4%, then rises5%. Starting from ₹50,000, find the final value and net percentage return. Then state whether changing the order of these three percentage moves changes the final value if no fixed fees or rounding intervene.

Task ID: `T22V3::T22E-FND01::S05-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Multiplier=1.10×0.96×1.05=1.1088. Final=₹55,440; net return10.88%. With pure multiplicative percentage changes, order does not change the product, so final value is unchanged.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 5,
    "criterion": "Computes multiplier1.1088 and final ₹55,440."
  },
  {
    "points": 3,
    "criterion": "Net return10.88% is correct."
  },
  {
    "points": 2,
    "criterion": "Correctly explains order invariance for pure multiplicative changes."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Translate +p% and −p% into multipliers.
2. Compose sequential percentage moves by multiplication.
3. Compute final value and net percent change from the original base.
4. Explain why +p% then −p% is generally negative for p≠0.
5. Recover an original value by dividing by the known multiplier.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "percentage multipliers and reverse percentages",
    "source": "S05 lesson derives multiplier method before assessment; percent meaning from S04"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "₹24,000",
    "12.5%",
    "₹960"
  ],
  "transfer": [
    "₹50,000",
    "falls4%",
    "rises5%"
  ]
}
```

---

# M01 · S06 — Units, conversions & dimensional reasoning

Session ID: `T22V3::T22E-FND01::S06@1`
Contract hash: `9e8c7488f31106afe51e172e6dc528a3b178adaec84db30fc4e88fd697884847`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Units, conversions & dimensional reasoning",
  "focus": "Units as algebraic constraints on quantitative calculations.",
  "purpose": "Make nonsensical formulas visibly wrong before later work with prices, rates, volatility, time and data frequencies.",
  "centralCapability": "Carry units through calculations, perform conversion-factor chains, and reject expressions whose dimensions cannot be added or equated.",
  "principalObstacle": "Numbers are often manipulated while units are silently dropped, allowing impossible sums or conversion factors to be inverted.",
  "entryPrerequisites": [
    "M01-S03 rates",
    "M01-S02 fractions"
  ],
  "requiredOwnership": [
    "Attach units to every measured quantity.",
    "Use conversion factors equal to one so unwanted units cancel.",
    "Check that terms being added share the same dimension.",
    "Check that both sides of an equation have compatible dimensions.",
    "Distinguish dimensionless percentages/ratios from quantities carrying units."
  ],
  "applicationScope": "Length/time/count/currency examples and simple compound rates.",
  "transferScope": "A multi-step conversion or formula audit in unfamiliar units.",
  "inScope": [
    "Unit cancellation",
    "Speed/rate conversion",
    "Currency-per-unit quantities",
    "Dimensionless ratios",
    "Equation dimensional checks"
  ],
  "outOfScope": [
    "Formal dimensional-analysis theorem",
    "Physical constants",
    "Stochastic units",
    "Annualization conventions"
  ],
  "exitCondition": "Complete one multi-step conversion and identify one dimensionally invalid formula with a precise reason."
}
```

## Learning note — assistance, not independent evidence

Treat units like algebraic factors. Conversion factors equal one, so unwanted units cancel. Quantities can be added only when dimensions match, while a pure ratio or percentage is dimensionless unless a definition supplies units. Worked example: 54 km/h×(1000 m/1 km)×(1 h/3600 s)=15 m/s. Guided check: convert 108 km/h to m/s, then explain from units alone why speed×time has the dimension of distance.

## MAIN TASK — learner-facing

Convert 72 km/h to m/s. A trading fee is 0.25% of ₹80,000; compute the fee and state why 0.25% itself is dimensionless. Finally audit the formula distance = speed + time and explain the defect.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

72×1000/3600=20 m/s. Fee=0.0025×80000=₹200. The number0.25%=0.0025 is a pure ratio, so it is dimensionless. speed+time is invalid because length/time cannot be added to time, and neither side has the length dimension required for distance.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "72 km/h is correctly converted to20 m/s with unit cancellation."
  },
  {
    "points": 2,
    "criterion": "Fee₹200 is correct."
  },
  {
    "points": 2,
    "criterion": "Explains that the percentage is dimensionless."
  },
  {
    "points": 2,
    "criterion": "Dimensional defect in speed+time is correctly identified."
  },
  {
    "points": 1,
    "criterion": "Units are shown rather than stripped early."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

A data feed sends 18,000 messages in 2.5 minutes. Express the rate in messages/second. At that rate, how many messages arrive in 40 seconds? Explain why multiplying by 40 seconds is dimensionally valid.

Task ID: `T22V3::T22E-FND01::S06-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

2.5 minutes=150 seconds, so rate=18000/150=120 messages/s. In40 s:120 messages/s×40 s=4,800 messages; seconds cancel, leaving messages.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Converts2.5 minutes to150 seconds."
  },
  {
    "points": 3,
    "criterion": "Gets120 messages/s."
  },
  {
    "points": 2,
    "criterion": "Gets4,800 messages."
  },
  {
    "points": 1,
    "criterion": "Explains unit cancellation."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Attach units to every measured quantity.
2. Use conversion factors equal to one so unwanted units cancel.
3. Check that terms being added share the same dimension.
4. Check that both sides of an equation have compatible dimensions.
5. Distinguish dimensionless percentages/ratios from quantities carrying units.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main"
  ],
  [
    "main"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "conversion-factor chains and dimensional compatibility",
    "source": "S06 lesson explicitly demonstrates cancellation before assessment; rate/ratio tools from S03"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "72 km/h",
    "0.25% of ₹80,000",
    "distance = speed + time"
  ],
  "transfer": [
    "18,000 messages in 2.5 minutes",
    "40 seconds"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S06-M@1`

---

# M01 · S07 — Estimation, scale & numerical sanity checks

Session ID: `T22V3::T22E-FND01::S07@1`
Contract hash: `88844411ef6dc1a2d334a5a379f57847dd02dfce46c5a8348ed0e0892dcd7fda`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Estimation, scale & numerical sanity checks",
  "focus": "Order-of-magnitude estimates, bounds and separating exact calculation from plausibility checking.",
  "purpose": "Train the habit of catching impossible outputs before trusting a spreadsheet, model or code path.",
  "centralCapability": "Produce a defensible rough estimate, compare it with an exact result, and use magnitude/bounds to flag implausible answers.",
  "principalObstacle": "Exact arithmetic can produce false confidence when an input, unit or decimal place was entered incorrectly.",
  "entryPrerequisites": [
    "M01-S01 numerical order",
    "M01-S04 percentages"
  ],
  "requiredOwnership": [
    "Round quantities deliberately for a rough estimate.",
    "Track powers of ten separately from leading digits.",
    "State whether an estimate is upper/lower/central when relevant.",
    "Compare exact and estimated answers by relative scale.",
    "Reject results that violate obvious bounds or sign constraints."
  ],
  "applicationScope": "Finite products, percentages, counts and Fermi-style one-step estimates.",
  "transferScope": "A changed-scale problem where a misplaced decimal would produce a tenfold or hundredfold error.",
  "inScope": [
    "Rounding for estimation",
    "Scientific scale intuition",
    "Simple bounds",
    "Relative-error sanity",
    "Fermi decomposition"
  ],
  "outOfScope": [
    "Formal numerical analysis",
    "Floating-point error",
    "Asymptotic notation beyond intuitive scale",
    "Confidence intervals"
  ],
  "exitCondition": "Before exact computation, produce a reasonable range or order of magnitude and use it to assess the exact result."
}
```

## Learning note — assistance, not independent evidence

Estimate before exact calculation. Replace awkward numbers by nearby friendly values, track decimal scale separately, and distinguish a rough central estimate from a proved bound. Worked example: 603×48≈600×50=30,000, so an exact answer near thirty thousand is plausible whereas three million is not. Guided check: estimate 4,120,000×0.0019, give a plausible range, then describe a decimal-place error your estimate would catch.

## MAIN TASK — learner-facing

Estimate 1,980,000 × 0.0031 without exact multiplication, giving a plausible range and saying whether your estimate is a rough central estimate or a strict bound. Then compute it exactly and assess whether 61,380 could be believable.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

A rough central estimate is2,000,000×0.003≈6,000; a plausible rough range such as5,000–7,000 is reasonable but is not a proved bound. Exact:1,980,000×0.0031=6,138. Therefore61,380 is implausible by a factor of10.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Produces a reasonable estimate around6,000."
  },
  {
    "points": 1,
    "criterion": "Correctly labels the estimate/range as rough rather than a strict proved bound."
  },
  {
    "points": 3,
    "criterion": "Exact result6,138 is correct."
  },
  {
    "points": 2,
    "criterion": "Rejects61,380 as about10× too large."
  },
  {
    "points": 1,
    "criterion": "Explains the decimal-scale sanity check."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

A system handles 497 requests each second for 61 seconds. Estimate the total mentally, then compute the exact total. If a report says3,031,700 requests, identify the likely scale error.

Task ID: `T22V3::T22E-FND01::S07-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Estimate500×60≈30,000. Exact497×61=30,317. The reported3,031,700 is100× too large; it is incompatible with roughly500 per second for about one minute.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Estimate is near30,000."
  },
  {
    "points": 4,
    "criterion": "Exact total30,317 is correct."
  },
  {
    "points": 3,
    "criterion": "Identifies report as100× too large and explains why."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Round quantities deliberately for a rough estimate.
2. Track powers of ten separately from leading digits.
3. State whether an estimate is upper/lower/central when relevant.
4. Compare exact and estimated answers by relative scale.
5. Reject results that violate obvious bounds or sign constraints.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "rounding, decimal scale, rough central estimate versus bound",
    "source": "S07 lesson teaches these directly; no scientific notation is required in the assessment"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "1,980,000 × 0.0031",
    "61,380"
  ],
  "transfer": [
    "497 requests each second for 61 seconds",
    "3,031,700"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S07-T@1`

---

# M01 · S08 — Powers, roots & scientific notation

Session ID: `T22V3::T22E-FND01::S08@1`
Contract hash: `663a045a5614b42769cf43ff713ce251c8c4e9f273c033ad5d6435ec3dc373ef`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Powers, roots & scientific notation",
  "focus": "Exponent laws, principal square roots and scientific notation.",
  "purpose": "Create a stable symbolic/numerical base for logarithms, growth, variance scales and later algebra.",
  "centralCapability": "Evaluate and simplify integer/rational powers in elementary cases, handle principal roots correctly and combine scientific notation without losing scale.",
  "principalObstacle": "Exponent laws are often applied across addition, and √(a²) is incorrectly replaced by a without considering sign.",
  "entryPrerequisites": [
    "M01-S02 fractions",
    "M01-S01 signed arithmetic"
  ],
  "requiredOwnership": [
    "Use product/quotient/power exponent laws on multiplicative expressions.",
    "Interpret negative exponents as reciprocals for nonzero bases.",
    "Use principal square root as the nonnegative root.",
    "Write and operate on normalized scientific notation.",
    "Check powers-of-ten scale separately from mantissas."
  ],
  "applicationScope": "Real numerical expressions with integer exponents, simple rational powers and principal roots.",
  "transferScope": "A mixed scientific-notation expression or sign-sensitive root identity.",
  "inScope": [
    "Integer exponents",
    "Negative exponents",
    "Principal square roots",
    "Simple rational powers",
    "Scientific notation"
  ],
  "outOfScope": [
    "General logarithm laws reserved for M02",
    "Complex roots",
    "Power series",
    "Floating-point representation"
  ],
  "exitCondition": "Correctly simplify one mixed exponent/scientific-notation expression and state the sign condition behind √(a²)=|a|."
}
```

## Learning note — assistance, not independent evidence

Exponent laws apply to multiplicative structure. For a≠0, a^(−n)=1/a^n. Rational exponents encode roots in their real domain: a^(m/n)=(nth root of a)^m where the real root exists. The principal square root is nonnegative, so √(a²)=|a|. Scientific notation is c×10^k with 1≤|c|<10. Worked example: 32^(2/5)=4, 125^(−1/3)=1/5, and (4×10^5)(3×10^−2)=1.2×10^4. Guided check: evaluate 64^(2/3), 16^(−3/4), and normalize 37×10^6.

## MAIN TASK — learner-facing

Compute (3×10^4)(2×10^−3), 16^(3/4), and √[(-7)^2]. Explain the last answer.

Task ID: `T22V3::T22E-FND01::S08-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

(3×2)×10^(4−3)=6×10^1=60. 16^(3/4)=(16^(1/4))^3=2^3=8. √((-7)^2)=√49=7 because the principal square root is nonnegative; generally √(a²)=|a|.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Scientific-notation product is60."
  },
  {
    "points": 3,
    "criterion": "16^(3/4)=8 with valid reasoning."
  },
  {
    "points": 3,
    "criterion": "Square-root result7 and |a| principle are correct."
  },
  {
    "points": 1,
    "criterion": "Does not misuse exponent laws across addition."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Simplify exactly: (5×10^−6)/(2×10^3). Then evaluate 27^(2/3) and state why (−4)^2 and −4^2 differ.

Task ID: `T22V3::T22E-FND01::S08-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Ratio=(5/2)×10^(−9)=2.5×10^−9. 27^(2/3)=(cube root27)^2=9. (−4)^2=16 because−4 is the base; −4^2=−16 because exponentiation occurs before the external minus.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Scientific-notation quotient2.5×10^−9 is correct."
  },
  {
    "points": 3,
    "criterion": "27^(2/3)=9."
  },
  {
    "points": 3,
    "criterion": "Sign/exponent distinction is explained correctly."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Use product/quotient/power exponent laws on multiplicative expressions.
2. Interpret negative exponents as reciprocals for nonzero bases.
3. Use principal square root as the nonnegative root.
4. Write and operate on normalized scientific notation.
5. Check powers-of-ten scale separately from mantissas.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Prerequisite audit:

```json
[
  {
    "item": "integer/negative/rational exponents, roots, scientific notation",
    "source": "S08 lesson explicitly defines each, including rational exponent domain caveat, with worked and guided examples before assessment"
  }
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "(3×10^4)(2×10^−3)",
    "16^(3/4)",
    "√[(-7)^2]"
  ],
  "transfer": [
    "(5×10^−6)/(2×10^3)",
    "27^(2/3)",
    "(−4)^2 and −4^2"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S08-M@1`
- `T22V3::T22E-FND01::S08-T@1`

---

# M01 · S09 — Algebraic expressions, substitution & expansion

Session ID: `T22V3::T22E-FND01::S09@1`
Contract hash: `78ae9d21d5a72ddc0efca2236485b2b52aa88cf2188ec55e17d3f8fe8dea7564`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Algebraic expressions, substitution & expansion",
  "focus": "Variables as placeholders, exact substitution, distributivity and collection of like terms.",
  "purpose": "Move from arithmetic to symbolic manipulation without treating symbols as labels that can be changed inconsistently.",
  "centralCapability": "Evaluate an algebraic expression at specified values, expand products and collect like terms while preserving equality.",
  "principalObstacle": "Partial substitution and sign mistakes during distribution are common, especially when negative values enter powers or products.",
  "entryPrerequisites": [
    "M01-S01 signed arithmetic",
    "M01-S08 powers"
  ],
  "requiredOwnership": [
    "Substitute the full given value for each variable with parentheses when needed.",
    "Apply distributivity to every term in a bracket.",
    "Collect only genuinely like terms.",
    "Preserve equality at each simplification step.",
    "Verify a symbolic simplification by testing one legal numerical input."
  ],
  "applicationScope": "Polynomial expressions in one or two variables.",
  "transferScope": "A fresh expression with negative substitutions or nested distributive structure.",
  "inScope": [
    "Substitution",
    "Distributivity",
    "Collecting like terms",
    "Polynomial expansion",
    "Numerical verification"
  ],
  "outOfScope": [
    "Function composition reserved for M02",
    "Rational-expression domains",
    "Formal polynomial theory",
    "Calculus"
  ],
  "exitCondition": "Expand/simplify one unfamiliar polynomial expression and verify it at a chosen input."
}
```

## Learning note — assistance, not independent evidence

A variable is a placeholder for a complete value. Substitute with parentheses around negatives, distribute to every term, and combine only like terms. Worked example: if x=−3, then 2x²+x=2(−3)²+(−3)=15; also 3(a+2)−2(a−4)=a+14. A numerical check can catch mistakes but does not prove an identity for every input. Guided check: simplify 5(2x−1)−4(x+3), then compare both forms at x=−2.

## MAIN TASK — learner-facing

For E=3x²−2xy+y², evaluate E at x=−2,y=3. Then expand and simplify (2a−3)(a+4).

Task ID: `T22V3::T22E-FND01::S09-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

E=3(4)−2(−2)(3)+9=12+12+9=33. Expansion:2a²+8a−3a−12=2a²+5a−12.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Substitution is correct and gives33."
  },
  {
    "points": 4,
    "criterion": "Expansion simplifies to2a²+5a−12."
  },
  {
    "points": 2,
    "criterion": "Negative substitution/distribution is handled explicitly."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Simplify 4(2x−3)−3(x+5)+2x. Then verify your simplified form at x=2 by evaluating both original and simplified expressions.

Task ID: `T22V3::T22E-FND01::S09-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Simplify:8x−12−3x−15+2x=7x−27. Atx=2, original=4(1)−21+4=−13; simplified14−27=−13.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 5,
    "criterion": "Simplifies to7x−27."
  },
  {
    "points": 3,
    "criterion": "Both forms evaluate to−13 atx=2."
  },
  {
    "points": 2,
    "criterion": "Verification is used correctly as a check, not as a proof for all x."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Substitute the full given value for each variable with parentheses when needed.
2. Apply distributivity to every term in a bracket.
3. Collect only genuinely like terms.
4. Preserve equality at each simplification step.
5. Verify a symbolic simplification by testing one legal numerical input.

Coverage mapping:

```json
[
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "E=3x²−2xy+y²",
    "(2a−3)(a+4)"
  ],
  "transfer": [
    "4(2x−3)−3(x+5)+2x",
    "at x=2"
  ]
}
```

---

# M01 · S10 — Factoring & algebraic identities

Session ID: `T22V3::T22E-FND01::S10@1`
Contract hash: `9aac67678cbdcd374fdea717182d01feba1c80d4fa680fc6955f88f73c33c63b`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Factoring & algebraic identities",
  "focus": "Factoring as reverse distributivity and use of a small set of transparent identities.",
  "purpose": "Prepare equation solving and later symbolic simplification without relying on pattern-matching alone.",
  "centralCapability": "Factor elementary polynomial expressions by common factors, grouping or standard quadratic identities and verify by re-expansion.",
  "principalObstacle": "A guessed factorization may look plausible but fail because middle terms or signs are not checked.",
  "entryPrerequisites": [
    "M01-S09 expansion",
    "Integer factor pairs"
  ],
  "requiredOwnership": [
    "Extract the greatest common factor first.",
    "Recognize difference of squares as (a−b)(a+b).",
    "Factor simple monic and non-monic quadratics by matching product and sum.",
    "Verify every factorization by expansion.",
    "Distinguish factoring a sum from illegally cancelling terms."
  ],
  "applicationScope": "Elementary polynomial expressions up to quadratic/cubic forms built from simple identities.",
  "transferScope": "A non-monic quadratic or disguised difference-of-squares example.",
  "inScope": [
    "Common-factor extraction",
    "Difference of squares",
    "Simple trinomials",
    "Non-monic quadratic factoring",
    "Expansion check"
  ],
  "outOfScope": [
    "Polynomial long division",
    "Remainder theorem",
    "General cubic formulas",
    "Rational-function cancellation"
  ],
  "exitCondition": "Factor one unfamiliar non-monic quadratic and verify the factorization by expansion."
}
```

## Learning note — assistance, not independent evidence

Factoring reverses expansion. First remove a greatest common factor. For a non-monic quadratic ax²+bx+c, one beginner-safe route is the ac method: find two numbers whose product is ac and sum is b, split bx, then factor by grouping. Worked example: 12x²+x−6 has ac=−72; 9 and −8 sum to1, so 12x²+9x−8x−6=3x(4x+3)−2(4x+3)=(3x−2)(4x+3). Difference of squares gives A²−B²=(A−B)(A+B). Guided check: factor 10x²+7x+1 by splitting the middle term and verify by expansion.

## MAIN TASK — learner-facing

Factor completely: 6x²−x−2. Then factor 9y²−25. Verify both by expansion.

Task ID: `T22V3::T22E-FND01::S10-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

6x²−x−2=(3x−2)(2x+1), since expansion gives6x²+3x−4x−2. 9y²−25=(3y−5)(3y+5).

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Correct factorization (3x−2)(2x+1)."
  },
  {
    "points": 3,
    "criterion": "Correct difference-of-squares factorization."
  },
  {
    "points": 3,
    "criterion": "Both are verified by valid re-expansion."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Factor completely 12x²−18x, then factor x²+5x+6 and 4a²−12ab+9b². Name the identity used in the last case. Finally, can an x be 'cancelled' from x²+x to leave x+1 without first writing a product? Explain.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

12x²−18x=6x(2x−3). x²+5x+6=(x+2)(x+3). 4a²−12ab+9b²=(2a−3b)², a perfect-square identity. You cannot cancel an x across x²+x as written; first factor x²+x=x(x+1). Cancellation only makes sense inside an appropriate quotient and with the cancelled factor nonzero.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 2,
    "criterion": "Extracts GCF:6x(2x−3)."
  },
  {
    "points": 2,
    "criterion": "Factors x²+5x+6 correctly."
  },
  {
    "points": 3,
    "criterion": "Recognizes (2a−3b)² and names/justifies the perfect-square identity."
  },
  {
    "points": 3,
    "criterion": "Rejects illegal cancellation across addition and explains factorization/product requirement."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Extract the greatest common factor first.
2. Recognize difference of squares as (a−b)(a+b).
3. Factor simple monic and non-monic quadratics by matching product and sum.
4. Verify every factorization by expansion.
5. Distinguish factoring a sum from illegally cancelling terms.

Coverage mapping:

```json
[
  [
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "6x²−x−2",
    "9y²−25"
  ],
  "transfer": [
    "12x²−18x",
    "x²+5x+6",
    "4a²−12ab+9b²"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S10-M@1`

---

# M01 · S11 — Linear equations & reversible transformations

Session ID: `T22V3::T22E-FND01::S11@1`
Contract hash: `1819afbfec345a36384721c5b6355990c6acfff8b2972e0d8b53ce0325930bc2`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Linear equations & reversible transformations",
  "focus": "Equations as equality constraints and solution-preserving operations.",
  "purpose": "Replace 'move it to the other side' heuristics with reversible algebra that scales to later derivations.",
  "centralCapability": "Solve a one-variable linear equation by explicitly using equality-preserving operations and verify the candidate in the original equation.",
  "principalObstacle": "Sign flips and denominator clearing are often performed mechanically, obscuring whether the same operation was applied to both sides.",
  "entryPrerequisites": [
    "M01-S09 algebraic simplification",
    "M01-S02 fractions"
  ],
  "requiredOwnership": [
    "Interpret an equation as a set of values making both sides equal.",
    "Add/subtract the same quantity from both sides.",
    "Multiply/divide both sides by the same known nonzero quantity.",
    "Clear numerical denominators without changing the solution set.",
    "Verify the final candidate in the original equation."
  ],
  "applicationScope": "One-variable linear equations with numerical denominators and parentheses.",
  "transferScope": "A fresh equation where a tempting mental transposition creates a sign error.",
  "inScope": [
    "Linear equations",
    "Denominator clearing",
    "Parenthesis expansion",
    "Reversible steps",
    "Substitution check"
  ],
  "outOfScope": [
    "Variable-denominator equations",
    "Extraneous roots from squaring",
    "Linear systems reserved for S13",
    "Inequalities reserved for S14"
  ],
  "exitCondition": "Solve one unfamiliar fractional linear equation with a visible reversible chain and correct substitution check."
}
```

## Learning note — assistance, not independent evidence

An equation is a constraint: legal transformations preserve the same solution set. Add/subtract the same quantity on both sides, or multiply/divide both sides by the same known nonzero quantity. Worked example: (x+2)/5−1=3 gives (x+2)/5=4, then x+2=20, so x=18; substitution checks it. Guided check: solve (3x−2)/7+4=5 with a visible reversible chain and verify the candidate.

## MAIN TASK — learner-facing

Solve (3x−5)/2 − (x+1)/3 = 4. Show a reversible chain and check your answer in the original equation.

Task ID: `T22V3::T22E-FND01::S11-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

Multiply both sides by6:3(3x−5)−2(x+1)=24. So9x−15−2x−2=24, hence7x=41 and x=41/7. Substitution gives (123/7−5)/2−(41/7+1)/3 =44/7−16/7=28/7=4.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 2,
    "criterion": "Clears denominators with a valid reversible operation."
  },
  {
    "points": 4,
    "criterion": "Solves to x=41/7."
  },
  {
    "points": 2,
    "criterion": "Shows coherent algebra rather than an unexplained answer."
  },
  {
    "points": 2,
    "criterion": "Checks the result in the original equation."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Solve 5−2(3x−4)=3(x+1)+7. Then state which single operation would undo the final multiplication by a nonzero constant k in a generic equation kx=b.

Task ID: `T22V3::T22E-FND01::S11-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Left=13−6x; right=3x+10. Thus3=9x, x=1/3. To undo multiplication by nonzero k, divide both sides by k.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 6,
    "criterion": "Correctly expands and solves to x=1/3."
  },
  {
    "points": 2,
    "criterion": "States division by nonzero k."
  },
  {
    "points": 2,
    "criterion": "All equality transformations preserve both sides."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Interpret an equation as a set of values making both sides equal.
2. Add/subtract the same quantity from both sides.
3. Multiply/divide both sides by the same known nonzero quantity.
4. Clear numerical denominators without changing the solution set.
5. Verify the final candidate in the original equation.

Coverage mapping:

```json
[
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "(3x−5)/2 − (x+1)/3 = 4"
  ],
  "transfer": [
    "5−2(3x−4)=3(x+1)+7",
    "kx=b"
  ]
}
```

---

# M01 · S12 — Formulas, rearrangement & parameters

Session ID: `T22V3::T22E-FND01::S12@1`
Contract hash: `7e81f576cc849d000e33c84ad67b9e09fc6229a7575b2866bbac5fa4e413ab3e`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Formulas, rearrangement & parameters",
  "focus": "Solving formulas for different variables while tracking conditions.",
  "purpose": "Prepare for quantitative models where the same relationship must be rearranged depending on what is known.",
  "centralCapability": "Rearrange a multivariable formula for a requested variable, state any nonzero condition created by division, and verify by substitution.",
  "principalObstacle": "Symbols representing parameters are often treated as fixed decorations, causing illegal division by quantities that might be zero.",
  "entryPrerequisites": [
    "M01-S11 equation operations",
    "M01-S09 symbolic algebra"
  ],
  "requiredOwnership": [
    "Identify the requested unknown and treat other symbols as given parameters.",
    "Use reversible algebraic operations symbolically.",
    "State conditions for any denominator introduced.",
    "Keep equivalent forms organized with parentheses.",
    "Verify a rearrangement by substitution or recomposition."
  ],
  "applicationScope": "Elementary linear/rational formulas in several symbols.",
  "transferScope": "A familiar-looking return/rate formula rearranged for a different quantity than usual.",
  "inScope": [
    "Formula rearrangement",
    "Parameter roles",
    "Nonzero conditions",
    "Substitution verification",
    "Multiplicative decomposition"
  ],
  "outOfScope": [
    "General function inversion",
    "Implicit functions",
    "Differential sensitivity",
    "Matrix equations"
  ],
  "exitCondition": "Rearrange one unfamiliar formula for two different variables and state every required denominator condition."
}
```

## Learning note — assistance, not independent evidence

Treat a formula as an equation whose requested symbol is the unknown and whose other symbols are parameters. Division introduces a condition, and a rearranged form can exclude a parameter branch that the original equation still admits. Worked example: F=ma gives m=F/a only for a≠0; when a=0 the original relation requires F=0 and m is not determined by division. Guided check: from y=c+dt, solve for d and separately describe the t=0 branch.

## MAIN TASK — learner-facing

Return is r=(V1−V0)/V0 with V0≠0. Solve for V1, then solve for V0 in terms of V1 and r. State the extra condition in the second rearrangement, describe the original r=−1 branch separately, and verify the ordinary rearrangement by substitution.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

rV0=V1−V0, so V1=V0(1+r). For1+r≠0, V0=V1/(1+r). If r=−1, the original equation requires V1=0 and remains valid for any V0≠0; the solved V0 form is simply unavailable on that branch. Substituting V1/(1+r) into V0(1+r) recovers V1 when r≠−1.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 2,
    "criterion": "Derives V1=V0(1+r)."
  },
  {
    "points": 3,
    "criterion": "Derives V0=V1/(1+r) for r≠−1."
  },
  {
    "points": 2,
    "criterion": "Retains original V0≠0 condition."
  },
  {
    "points": 2,
    "criterion": "Correctly describes exceptional r=−1 branch: V1=0, any V0≠0."
  },
  {
    "points": 1,
    "criterion": "Performs a valid substitution/recomposition check."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

Given q=(a−b)/(a+b) with a+b≠0, solve for a in terms of b and q. State the condition required by the solved form, describe the original q=1 branch separately, and verify the ordinary rearrangement by substitution.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

q(a+b)=a−b gives a(q−1)=−b(1+q), so for q≠1, a=b(1+q)/(1−q). The original requires a+b≠0; under this ordinary parameterization that also forces b≠0. If q=1, the original equation becomes a+b=a−b, so b=0; then any nonzero a is valid because a+b=a≠0. Substitution verifies the q≠1 formula.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Correct ordinary rearrangement a=b(1+q)/(1−q)."
  },
  {
    "points": 2,
    "criterion": "States q≠1 for the solved form and retains original denominator condition."
  },
  {
    "points": 3,
    "criterion": "Correctly describes q=1 branch: b=0 with any nonzero a."
  },
  {
    "points": 1,
    "criterion": "Performs a valid substitution/recomposition check."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Identify the requested unknown and treat other symbols as given parameters.
2. Use reversible algebraic operations symbolically.
3. State conditions for any denominator introduced.
4. Keep equivalent forms organized with parentheses.
5. Verify a rearrangement by substitution or recomposition.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "r=(V1−V0)/V0",
    "r=−1"
  ],
  "transfer": [
    "q=(a−b)/(a+b)",
    "q=1"
  ]
}
```

---

# M01 · S13 — Simultaneous linear equations & constraint intersection

Session ID: `T22V3::T22E-FND01::S13@1`
Contract hash: `f79bd3b9156fc5d74960eb009b1bbcfb1a23d9730096558a1363530b008e8715`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Simultaneous linear equations & constraint intersection",
  "focus": "Two linear constraints determining common unknowns.",
  "purpose": "Introduce multi-equation reasoning used later in hedging, calibration and linear algebra.",
  "centralCapability": "Solve a two-equation linear system by substitution or elimination, verify both constraints and interpret the solution in context.",
  "principalObstacle": "Solving each equation separately is not enough; the same pair must satisfy both simultaneously.",
  "entryPrerequisites": [
    "M01-S11 linear equations",
    "M01-S12 formula rearrangement"
  ],
  "requiredOwnership": [
    "Interpret a system as simultaneous constraints.",
    "Choose substitution or elimination strategically.",
    "Perform elimination with legal equation operations.",
    "Detect a unique solution in ordinary nondegenerate examples.",
    "Check the final pair in both original equations."
  ],
  "applicationScope": "Two equations in two unknowns with a unique solution.",
  "transferScope": "A changed story context or coefficients requiring a different convenient elimination route.",
  "inScope": [
    "Substitution",
    "Elimination",
    "Constraint intersection",
    "Pair verification",
    "Simple word-model translation"
  ],
  "outOfScope": [
    "Dependent/inconsistent system classification in matrix language",
    "Gaussian elimination beyond2×2",
    "Least squares",
    "Optimization"
  ],
  "exitCondition": "Model and solve one fresh two-unknown constraint problem and verify both equations."
}
```

## Learning note — assistance, not independent evidence

A system asks for one pair satisfying every constraint simultaneously. Substitution replaces a variable by an equivalent expression; elimination combines equations to remove a variable. Worked example: x+y=11 and 2x−y=7. Adding gives3x=18, so x=6 and y=5; both originals check. Guided check: solve 3x+2y=17 and x−y=3 by elimination, then verify both equations.

## MAIN TASK — learner-facing

Solve 2x+3y=19 and x−y=2. Show one method and verify the pair.

Task ID: `T22V3::T22E-FND01::S13-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

From x−y=2, x=y+2. Substitute:2(y+2)+3y=19, so5y=15, y=3 and x=5. Checks:10+9=19 and5−3=2.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "Uses a valid substitution/elimination setup."
  },
  {
    "points": 4,
    "criterion": "Gets x=5,y=3."
  },
  {
    "points": 2,
    "criterion": "Checks both original equations."
  },
  {
    "points": 1,
    "criterion": "States the solution as an ordered pair/context pair."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

A desk wants positions x and y satisfying x+y=14 and 3x−2y=17. Solve by elimination and verify the pair in both original constraints.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Eliminate y by doubling x+y=14 to2x+2y=28 and add to3x−2y=17:5x=45, so x=9 and y=5. Checks:9+5=14 and27−10=17.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Uses a valid elimination operation."
  },
  {
    "points": 3,
    "criterion": "Gets x=9,y=5."
  },
  {
    "points": 3,
    "criterion": "Verifies both original constraints."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Interpret a system as simultaneous constraints.
2. Choose substitution or elimination strategically.
3. Perform elimination with legal equation operations.
4. Detect a unique solution in ordinary nondegenerate examples.
5. Check the final pair in both original equations.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "2x+3y=19",
    "x−y=2"
  ],
  "transfer": [
    "x+y=14",
    "3x−2y=17"
  ]
}
```

---

# M01 · S14 — Inequalities & sign-aware algebra

Session ID: `T22V3::T22E-FND01::S14@1`
Contract hash: `98ee6152bebb9e551b5afce5dd79c502ff626224901a86782890f6aa76b9061d`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Inequalities & sign-aware algebra",
  "focus": "Solution sets, order-preserving/reversing operations and interval answers.",
  "purpose": "Prevent later optimization and bound arguments from inheriting the classic error of dividing by a negative without reversing the inequality.",
  "centralCapability": "Solve elementary linear inequalities, reverse the relation when multiplying/dividing by a negative quantity, and express the exact solution set.",
  "principalObstacle": "Equation habits are over-transferred to inequalities, especially when a negative multiplier reverses order.",
  "entryPrerequisites": [
    "M01-S11 equation operations",
    "M01-S01 order on the real line"
  ],
  "requiredOwnership": [
    "Interpret an inequality as a set of allowed values.",
    "Add/subtract the same quantity without changing direction.",
    "Multiply/divide by a positive quantity without changing direction.",
    "Reverse the inequality when multiplying/dividing by a negative quantity.",
    "Express and test the resulting interval or ray."
  ],
  "applicationScope": "One-variable linear inequalities and chained simple bounds.",
  "transferScope": "A fresh inequality where the sign reversal occurs after several simplification steps.",
  "inScope": [
    "Linear inequalities",
    "Negative-multiplier reversal",
    "Interval notation",
    "Boundary inclusion",
    "Solution checks"
  ],
  "outOfScope": [
    "Rational sign charts",
    "Quadratic inequalities",
    "Convexity",
    "Probability inequalities"
  ],
  "exitCondition": "Solve one unfamiliar linear inequality with correct direction/boundary and verify one inside and one outside test point."
}
```

## Learning note — assistance, not independent evidence

Inequalities describe sets. Addition/subtraction preserves order; positive scaling preserves order; negative scaling reverses it. Interval notation uses square brackets for included finite endpoints, parentheses for excluded endpoints, and parentheses at infinity. Worked example: −5x≥20 gives x≤−4, written (−∞,−4]. Guided check: solve 4−2x>10, give interval notation, and test one point inside and one outside your solution.

## MAIN TASK — learner-facing

Solve (2x−3)/5 ≤ (x+4)/2. Then solve −3(2x−1)>9. Give exact interval/ray descriptions and test one point that should satisfy each solution plus one point that should fail.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

First multiply by positive10:2(2x−3)≤5(x+4), so4x−6≤5x+20 and x≥−26, i.e.[−26,∞). For example0 satisfies and−27 fails. Second:−6x+3>9, so−6x>6; divide by−6 and reverse: x<−1, i.e.(−∞,−1). For example−2 satisfies and0 fails.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "First inequality gives [−26,∞) with correct inclusive boundary."
  },
  {
    "points": 3,
    "criterion": "Second gives (−∞,−1) and correctly reverses direction."
  },
  {
    "points": 2,
    "criterion": "Interval/ray notation is correct."
  },
  {
    "points": 2,
    "criterion": "Inside/outside test points correctly verify both solution descriptions."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

Solve 7−4x≥19 and 2<3x+5≤14. Give exact interval notation.

Task ID: `T22V3::T22E-FND01::S14-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

7−4x≥19 =>−4x≥12 => x≤−3. For chain:−3<3x≤9 =>−1<x≤3, so(−1,3].

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "First solution x≤−3 is correct."
  },
  {
    "points": 5,
    "criterion": "Chained solution (−1,3] is correct."
  },
  {
    "points": 1,
    "criterion": "Negative division reversal is handled correctly."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Interpret an inequality as a set of allowed values.
2. Add/subtract the same quantity without changing direction.
3. Multiply/divide by a positive quantity without changing direction.
4. Reverse the inequality when multiplying/dividing by a negative quantity.
5. Express and test the resulting interval or ray.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "(2x−3)/5 ≤ (x+4)/2",
    "−3(2x−1)>9"
  ],
  "transfer": [
    "7−4x≥19",
    "2<3x+5≤14"
  ]
}
```

---

# M01 · S15 — Absolute value as distance

Session ID: `T22V3::T22E-FND01::S15@1`
Contract hash: `9a1d545d51dc247305bd2925bd2a5c0413ce50e8b13decc96ee863bdfc9bf9a8`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Absolute value as distance",
  "focus": "Absolute value, piecewise meaning and distance inequalities.",
  "purpose": "Turn |x| from a memorized symbol into geometric distance, which later supports norms, errors and deviations.",
  "centralCapability": "Interpret |x−a| as distance from a, solve simple absolute-value equations/inequalities and translate between algebra and intervals.",
  "principalObstacle": "Rules such as '|u|≤c means −c≤u≤c' are memorized without understanding why c must be nonnegative and why 'greater than' splits into two rays.",
  "entryPrerequisites": [
    "M01-S14 inequalities",
    "M01-S01 number-line order"
  ],
  "requiredOwnership": [
    "Interpret |x| as distance from0.",
    "Interpret |x−a| as distance from a.",
    "Solve |u|≤c for c≥0 as a double inequality.",
    "Solve |u|>c for c≥0 as two separated cases.",
    "Handle impossible/automatic cases when c<0."
  ],
  "applicationScope": "Elementary absolute-value equations and inequalities.",
  "transferScope": "A shifted/scaled distance condition rather than a bare |x| template.",
  "inScope": [
    "Distance interpretation",
    "Piecewise absolute value",
    "Bounded intervals",
    "Outside intervals",
    "Scaled/shifted forms"
  ],
  "outOfScope": [
    "Vector norms",
    "Quadratic absolute inequalities",
    "Complex modulus",
    "Optimization norms"
  ],
  "exitCondition": "Solve one unfamiliar shifted/scaled absolute-value inequality and explain the geometry in words."
}
```

## Learning note — assistance, not independent evidence

Absolute value is distance: |x| is distance from0 and |x−a| is distance from a. For c≥0, |u|≤c gives a bounded interval while |u|>c gives two outside rays. Absolute value is always nonnegative, so negative thresholds can make a condition impossible or automatic. Worked example: |x−6|≤3 gives3≤x≤9. Guided check: solve |3x+2|>8, then decide |y+1|<−3 and |y+1|≥−3 immediately from nonnegativity.

## MAIN TASK — learner-facing

Solve |2x−5|≤7 and interpret the answer as a distance statement after rewriting the inside as 2(x−2.5).

Task ID: `T22V3::T22E-FND01::S15-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

−7≤2x−5≤7 =>−2≤2x≤12 =>−1≤x≤6. Also |2(x−2.5)|≤7 means |x−2.5|≤3.5, so x lies within3.5 units of2.5: [−1,6].

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 5,
    "criterion": "Correct interval [−1,6]."
  },
  {
    "points": 3,
    "criterion": "Correctly rewrites/interprets as distance from2.5."
  },
  {
    "points": 2,
    "criterion": "Uses valid double-inequality logic."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

Solve |x+2|>4 and interpret it as a distance from −2. Briefly state what |x| measures. Then decide the solution sets of |3x−1|<−2 and |3x−1|≥−2 without case-heavy algebra.

Task ID: `undefined`  
Obligation version: `2`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

|x+2|>4 means distance from−2 exceeds4, so x<−6 or x>2. |x| is distance from0. Since absolute value is always nonnegative, |3x−1|<−2 has no real solution, while |3x−1|≥−2 is true for every real x.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Gets x<−6 or x>2 and interprets distance from−2."
  },
  {
    "points": 2,
    "criterion": "States |x| is distance from0."
  },
  {
    "points": 2,
    "criterion": "Negative-threshold strict inequality is correctly empty."
  },
  {
    "points": 2,
    "criterion": "Negative-threshold ≥ inequality is correctly all real numbers, justified by nonnegativity."
  }
]
```

## Ownership / provenance metadata

Required ownership:

1. Interpret |x| as distance from0.
2. Interpret |x−a| as distance from a.
3. Solve |u|≤c for c≥0 as a double inequality.
4. Solve |u|>c for c≥0 as two separated cases.
5. Handle impossible/automatic cases when c<0.

Coverage mapping:

```json
[
  [
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "transfer"
  ],
  [
    "transfer"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "|2x−5|≤7",
    "2(x−2.5)"
  ],
  "transfer": [
    "|x+2|>4",
    "|3x−1|<−2",
    "|3x−1|≥−2"
  ]
}
```

---

# M01 · S16 — Quadratic equations as algebraic constraints

Session ID: `T22V3::T22E-FND01::S16@1`
Contract hash: `aa6e181fb4aa4dcee6164e598a79f27b51d79ea85bdba8ec60456e98cf966e90`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "Quadratic equations as algebraic constraints",
  "focus": "Factoring, zero-product logic, completing-square awareness and the discriminant.",
  "purpose": "Supply the equation-solving machinery that M02 will later reinterpret geometrically through functions and graphs.",
  "centralCapability": "Solve elementary quadratic equations exactly, justify zero-product reasoning, and use the discriminant to classify real-root count.",
  "principalObstacle": "A factored product equal to zero is sometimes solved by 'cancelling' a factor, which can erase a valid root.",
  "entryPrerequisites": [
    "M01-S10 factoring",
    "M01-S11 equation logic",
    "M01-S08 roots"
  ],
  "requiredOwnership": [
    "Put a quadratic equation in standard zero form.",
    "Use factoring plus the zero-product property without cancelling roots away.",
    "Use the quadratic formula when factoring is inconvenient.",
    "Compute the discriminant b²−4ac.",
    "Classify two/one/no real roots from the discriminant."
  ],
  "applicationScope": "Real quadratic equations with exact coefficients and roots.",
  "transferScope": "A non-monic or non-factor-obvious quadratic requiring formula/discriminant reasoning.",
  "inScope": [
    "Factored quadratics",
    "Zero-product property",
    "Quadratic formula",
    "Discriminant",
    "Real-root classification"
  ],
  "outOfScope": [
    "Quadratic graphs reserved for M02",
    "Complex roots",
    "Vieta as a dedicated theory",
    "Optimization via derivatives"
  ],
  "exitCondition": "Solve one unfamiliar quadratic exactly and correctly classify another by discriminant without graphing."
}
```

## Learning note — assistance, not independent evidence

Put a quadratic in ax²+bx+c=0 form with a≠0. Factoring plus the zero-product property is efficient when factors are visible; when it is inconvenient, use x=(−b±√(b²−4ac))/(2a). The discriminant D=b²−4ac classifies the number of real roots. Worked example: 3x²+x−1=0 has D=13, so x=(−1±√13)/6. Guided check: solve 2x²−5x−2=0 by the formula and classify x²+6x+10=0 by its discriminant.

## MAIN TASK — learner-facing

Solve x²−7x+12=0 by factoring. Solve 2x²+3x−1=0 exactly by a justified general method; factoring is not expected. For x²+2x+5=0, state the number of real roots using the discriminant.

Task ID: `undefined`  
Obligation version: `2`

### MAIN REFERENCE — SEALED / ENGINE ONLY

x²−7x+12=(x−3)(x−4), so x=3,4. For2x²+3x−1=0, D=3²−4(2)(−1)=17, so x=(−3±√17)/4. For x²+2x+5=0, D=4−20=−16<0, hence no real roots.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 3,
    "criterion": "First quadratic is factored and solved as3,4 using zero-product logic."
  },
  {
    "points": 4,
    "criterion": "Second quadratic is solved exactly as(−3±√17)/4 using a valid general method."
  },
  {
    "points": 2,
    "criterion": "Third discriminant is−16 and no real roots is concluded."
  },
  {
    "points": 1,
    "criterion": "No valid root is cancelled away and formula assumptions are respected."
  }
]
```

## TRANSFER TASK — release only at normal transfer stage

Solve 3x²−12x+9=0 exactly. Then classify kx²+2x+1=0 for k=0 and k=1, explaining why the quadratic formula is not the right starting point in the k=0 case.

Task ID: `T22V3::T22E-FND01::S16-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

3(x²−4x+3)=3(x−1)(x−3), so x=1,3. If k=0 the equation is linear:2x+1=0 =>x=−1/2, and the quadratic formula would divide by2k=0. If k=1, discriminant4−4=0, so one repeated real root x=−1.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Gets roots1 and3."
  },
  {
    "points": 3,
    "criterion": "Handles k=0 as linear with x=−1/2 and explains division-by-zero issue."
  },
  {
    "points": 3,
    "criterion": "Handles k=1 as repeated root−1."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Put a quadratic equation in standard zero form.
2. Use factoring plus the zero-product property without cancelling roots away.
3. Use the quadratic formula when factoring is inconvenient.
4. Compute the discriminant b²−4ac.
5. Classify two/one/no real roots from the discriminant.

Coverage mapping:

```json
[
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main"
  ],
  [
    "main"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "x²−7x+12=0",
    "2x²+3x−1=0",
    "x²+2x+5=0"
  ],
  "transfer": [
    "3x²−12x+9=0",
    "kx²+2x+1=0"
  ]
}
```

Historical pre-A07 lesson exposure flags (provenance only):

- `T22V3::T22E-FND01::S16-M@1`

---

# M01 · S17 — M01 synthesis — quantitative algebra under pressure

Session ID: `T22V3::T22E-FND01::S17@1`
Contract hash: `eb7d952b6551f5dbe18b0ddf3b02b311dbf4e06828d0033dcad1a0765c25d3b1`
Instruction version: `m01-instruction-a07-separated-v1`

## Session contract

```json
{
  "title": "M01 synthesis — quantitative algebra under pressure",
  "focus": "Integrating percentages, equations, units, estimation and algebraic verification in one unfamiliar quantitative situation.",
  "purpose": "Demonstrate that the module's skills can be coordinated without a prompt telling the learner which chapter technique to use.",
  "centralCapability": "Model a multi-step quantitative scenario, estimate before solving, derive the unknown exactly, compute a net return and defend the result with independent checks.",
  "principalObstacle": "Topic labels can cue procedures; a synthesis task removes those cues and exposes whether the learner can choose the representation themselves.",
  "entryPrerequisites": [
    "M01-S01 through S16; no M02 concept is required"
  ],
  "requiredOwnership": [
    "Translate sequential percent moves into multipliers.",
    "Build an equation from the described final-value constraint.",
    "Solve for an unknown starting value exactly.",
    "Compute a net percentage result and a break-even bound.",
    "Use estimation and substitution as independent checks."
  ],
  "applicationScope": "Closed-form one-period toy account/value problems using only M01 arithmetic and algebra.",
  "transferScope": "A changed sequence with symbolic fee/starting value where the learner must choose the equation and checks independently.",
  "inScope": [
    "Mixed arithmetic",
    "Percent multipliers",
    "Equation modeling",
    "Fee/break-even algebra",
    "Sanity checking"
  ],
  "outOfScope": [
    "Probability beyond arithmetic",
    "Functions/graphs",
    "Calculus",
    "Real market claims or strategy performance"
  ],
  "exitCondition": "Complete an unfamiliar mixed quantitative problem with a model, exact solution, at least one sanity check and no hidden reliance on M02+ concepts."
}
```

## Learning note — assistance, not independent evidence

A synthesis problem hides the chapter label. Name quantities and units, estimate scale, translate percentage moves into multipliers, write an equation, solve it, and recompute the process as a check. Worked example: if C×1.08−150=21,450, then 1.08C=21,600 and C=20,000; substitution confirms. Guided check: a value rises7%, falls3%, then pays a fixed fee; write the symbolic final value and a break-even-fee inequality before inserting any numbers.

## MAIN TASK — learner-facing

A toy account starts with unknown capital C. It rises10%, then falls4%, then pays a fixed ₹240 fee. The final value is ₹52,560. (a) Estimate C before solving. (b) Find C exactly. (c) Compute the final net return relative to C. (d) What is the largest fixed fee that would still leave the account with a nonnegative net return after the same +10%,−4% moves?

Task ID: `T22V3::T22E-FND01::S17-M@1`  
Obligation version: `1`

### MAIN REFERENCE — SEALED / ENGINE ONLY

Before the fee, multiplier=1.10×0.96=1.056, so C should be about ₹52,800/1.056≈₹50,000. Equation1.056C−240=52,560 gives1.056C=52,800 and C=₹50,000. Net return=(52,560−50,000)/50,000=5.12%. Gross post-move value is₹52,800, so the largest fee preserving final≥₹50,000 is₹2,800.

### MAIN RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 2,
    "criterion": "Produces a sensible pre-solve estimate near₹50,000."
  },
  {
    "points": 3,
    "criterion": "Models and solves C=₹50,000 exactly."
  },
  {
    "points": 2,
    "criterion": "Computes net return5.12%."
  },
  {
    "points": 2,
    "criterion": "Computes break-even maximum fee₹2,800."
  },
  {
    "points": 1,
    "criterion": "Verifies by substitution/recomputation and keeps money/percent units straight."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## TRANSFER TASK — release only at normal transfer stage

A process starts at X, rises by a decimal rate a, falls by decimal rate b, then pays fixed fee f. Derive the final value. Derive the maximum fee that keeps the final value at least X. State the natural restrictions if a and b are interpreted as ordinary gains/losses smaller than100%.

Task ID: `T22V3::T22E-FND01::S17-T@1`  
Obligation version: `1`

### TRANSFER REFERENCE — SEALED / ENGINE ONLY

Final value X(1+a)(1−b)−f. Nonnegative net change requires X(1+a)(1−b)−f≥X, so f≤X[(1+a)(1−b)−1]. Under the prompt's ordinary interpretation that the quantity rises by a and falls by b, with each move smaller than100%, take X>0, f≥0, 0≤a<1 and 0≤b<1. If the bracket is negative, no nonnegative fee can restore break-even.

### TRANSFER RUBRIC — SEALED / ENGINE ONLY

```json
[
  {
    "points": 4,
    "criterion": "Correct final-value formula."
  },
  {
    "points": 4,
    "criterion": "Correct break-even fee inequality."
  },
  {
    "points": 2,
    "criterion": "States sensible domain/interpretation conditions and notes the negative-bracket case."
  }
]
```

Marking: Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

## Ownership / provenance metadata

Required ownership:

1. Translate sequential percent moves into multipliers.
2. Build an equation from the described final-value constraint.
3. Solve for an unknown starting value exactly.
4. Compute a net percentage result and a break-even bound.
5. Use estimation and substitution as independent checks.

Coverage mapping:

```json
[
  [
    "main",
    "transfer"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ],
  [
    "main",
    "transfer"
  ],
  [
    "main"
  ]
]
```

Instruction-separation audit fragments:

```json
{
  "main": [
    "₹52,560",
    "rises10%, then falls4%",
    "₹240 fee"
  ],
  "transfer": [
    "rises by a decimal rate a",
    "falls by decimal rate b",
    "fixed fee f"
  ]
}
```

---

## Historical lesson-answer-overlap provenance

```json
{
  "version": "m01-repairs-1.1-pre-a07",
  "rationale": "These fixed assessments had exact numeric/algebraic answers or exact subanswers embedded in the former lesson text. Any legacy lesson exposure lacking the new instructionVersion is conservatively treated as answer exposure for the listed fixed tasks from that timestamp onward.",
  "sessions": {
    "T22V3::T22E-FND01::S02@1": [
      "T22V3::T22E-FND01::S02-T@1"
    ],
    "T22V3::T22E-FND01::S04@1": [
      "T22V3::T22E-FND01::S04-T@1"
    ],
    "T22V3::T22E-FND01::S06@1": [
      "T22V3::T22E-FND01::S06-M@1"
    ],
    "T22V3::T22E-FND01::S07@1": [
      "T22V3::T22E-FND01::S07-T@1"
    ],
    "T22V3::T22E-FND01::S08@1": [
      "T22V3::T22E-FND01::S08-M@1",
      "T22V3::T22E-FND01::S08-T@1"
    ],
    "T22V3::T22E-FND01::S10@1": [
      "T22V3::T22E-FND01::S10-M@1"
    ],
    "T22V3::T22E-FND01::S16@1": [
      "T22V3::T22E-FND01::S16-M@1"
    ]
  }
}
```

## End of engine pack