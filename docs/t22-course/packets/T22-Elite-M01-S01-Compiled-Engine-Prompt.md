# T22 Elite — M01 · Session 01 — Engine-only compiled packet

Signed numbers, order & operation structure

## Attachment instructions

This file is input to the learner's installed Spire Master/Runtime Guardian. It contains evaluator answers. Do not display or summarize its sealed contents to the learner. It does not replace or relax the installed engine's control, assistance, provenance or completion rules.

Start this session under [WALL]. On the first turn, present only the CURRENT TASK from the compiled packet and await the learner's work. Keep the session's principal obstacle, references, rubrics, learning note and sibling task private. Release the sibling task only at its normal transfer stage, without its reference. Do not provide hints, worked examples, methods or solutions under [WALL]. If assistance is explicitly authorized later, record it according to the installed engine; do not count assisted or answer-exposed work as independent evidence. Accept any valid route and judge only claims actually evidenced. Session completion does not clear M01 or the whole course.

## Source provenance

- Repository: Karuma-jojo/Chronological-Deck
- Branch: codex/t22-pedagogical-rebuild
- Frozen source commit: 2251cb2abbeb10d408ca80aa0de56461cfa9554f
- Session ID: T22V3::T22E-FND01::S01@1
- Repair overlay: m01-repairs-1.2-a07
- Sources: course/t22/generated/course-meta.json; course/t22/generated/m01-001-005.json; course/t22/generated/eval-m01-001-005.json; course/t22/authoring/m01-repairs-1.1.json.
- Generation: js/t22-course/core.js compilerPacket(), after applying the S01 entries of the canonical overlay through applyCourseOverrides() and verifying the session contract hash. The runtime packet below is unchanged. Attachment instructions, provenance and evaluator supplement are packaging additions.
- This is the new T22 Elite numeracy session, not the historical T22 M01 derivative ARC.

## Runtime compiled packet

[T22 ELITE — ENGINE ONLY; ANSWER-BEARING PACKET]

Course T22E-course-0.3.0-m03-accepted; route M65-semantic-r2-2026-09-18; module T22E-FND01; session T22V3::T22E-FND01::S01@1; contract 5b87e40fcc380be78c946a9bcecdd0aaf7ec0bb05905d6fb4215ba96a387eaa0

SESSION CONTRACT

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

CURRENT TASK

Evaluate exactly: −18 − [7 − 3(−4)] + 2^3. Then order from smallest to largest: −3, −2.75, −2.7, −2.6. Give one quick sign/magnitude sanity check for each part.

CURRENT REFERENCE

Inside brackets: 3(−4)=−12, so 7−(−12)=19. Thus −18−19+8=−29. Ordering: −3 < −2.75 < −2.7 < −2.6. Sanity: the bracket is positive and large, so the expression should lie well below −18; all four ordered values lie between −3 and −2.6.

SIBLING TASK

Without a calculator, evaluate −3^2 + (−3)^2 − 2[5−(−1)]. Then decide which is larger: −2.75 or −2.8, and justify using number-line order rather than calculator authority.

SIBLING REFERENCE

−3²=−9 while (−3)²=9. The bracket is6, so the expression is −9+9−12=−12. Also −2.75 is larger than −2.8 because it lies to the right on the number line.

LEARNING NOTE — ASSISTANCE, NOT INDEPENDENT EVIDENCE

A signed number has a sign and a magnitude. On the number line, farther left means smaller. Read a numerical expression from its grouping outward: parentheses first, then powers, then multiplication/division, then addition/subtraction. A leading minus outside a power is applied after the power unless the negative base is parenthesized. Worked example: −6−[3−(−2)]+3² = −6−5+9 = −2. Guided check: evaluate −4²+(−4)²−[6−(−2)] and predict the sign before calculating.

ASSESSMENT RULES

Accept any mathematically valid route. Separate arithmetic slips from conceptual failure. Do not infer mastery of unobserved required-ownership items. A saved/reviewed attempt is study evidence, not automatic macro-module clearance.

[END ENGINE INPUT]

## Evaluator supplement — engine only

Task ID: T22V3::T22E-FND01::S01-M@1
Obligation version: 2
Assessment fingerprint: 2c4b03f3371d348ede603bfe6a4ab404dcfa528f4a7f969fa7c2d26388970143

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

Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.

Task ID: T22V3::T22E-FND01::S01-T@1
Obligation version: 2
Assessment fingerprint: e7e72076edbf11bf7a8b1e9903df17bdad7c3c41275a5b0bd72b88387559cc02

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

Human/AI review required. Accept every mathematically valid route. A task score is evidence for this task only; it does not automatically clear every required-ownership item or the module.
