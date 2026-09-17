# ISI M.Stat final syllabus: audit evidence

Version 2.0 · 14 September 2026

Read `ISI_MStat_High_Impact_Syllabus.pdf` for the study plan and its editable Markdown counterpart for reuse in your study project. This evidence package explains where the priorities came from. It does not contain a certified answer key.

## What was reviewed

The supplied official one-page 2026 M.Stat syllabus was read in full and mapped through 47 coverage checks. All 392 extracted question statements were reviewed for their mathematical topic routes: 300 PSA and 92 PSB questions across the supplied 2016–2024 and 2026 labels. Selected original PDF pages, including suspected statement defects, were visually checked. Every recorded source page was checked against the displayed question number.

The 2016 PSA and PSB uploads are byte-identical combined syllabus/sample-question documents. Their questions are counted once. No 2025 file was supplied. Source hashes identify the actual uploaded files; a year label is not a certification that a file is a distinct administered examination. The live official endpoints timed out during this audit, so the supplied 2026 syllabus remains the scope authority. Later admission rules were not verified or inferred.

## Deliverable changes

The earlier 71-target guide becomes 80 targets with 162 bounded session steps. The nine additions make matrix arithmetic, Riemann sums/log products, independence, CDFs/atoms, distribution exceptions, absolute-loss reasoning, descriptive-data updates, elementary sign tests and quantile consistency explicit.

Prerequisites are stated and checked in a complete study sequence. This sequence is separate from the priority ranking. Topic counts do not replace prerequisite judgment, and a low primary count does not remove an expressly listed official topic. The local guide IDs are not new T25 ARC IDs. No repository, archive, runtime, instructional-clearance or review-state changes are included.

## How to interpret the ledger

Each question has exactly one principal target. A multipart PSB question counts as one question, not as several questions or its number of marks. Selected secondary targets record important additional tools; they are not an exhaustive dependency closure. Principal counts and principal-or-secondary presence answer different questions.

The old classification is retained in `old_topic` for auditability. The revised categories have different boundaries, so totals should not be compared as if the old and new taxonomies were identical. The authorial priority rank combines recurrence, written-problem value and prerequisite value; it is not an official weight or a fitted probability.

The fixed eight most frequent principal blocks in 2016–2020 cover 65.0%–77.5% of principal questions in the later supplied labels. This is a retrospective stability exercise, not a prospective forecast validation: the taxonomy was constructed with the full collection visible, mechanisms repeat, the sample is small and the documents are not certified as independent administered papers. The observed minimum is not a future coverage floor, and none of these figures estimates admission probability.

## Six questions excluded from ordinary single-answer/mastery scoring

These are issues in the supplied versions, not a claim about every official release or a corrected answer key. They remain in topic counts; counts excluding them are also supplied.

| Question | Verified issue |
| --- | --- |
| 2018-PSA-04 | Two offered inverse-matrix expressions are algebraically equal under the stated assumptions. |
| 2018-PSA-15 | The displayed six-variable system has 33 real solutions, absent from the options. |
| 2019-PSB-02 | The assumptions do not ensure the real eigenvalue claims for the sum or difference; explicit rational block-matrix counterexamples are documented. |
| 2021-PSA-03 | The displayed matrix has four real square roots; the count is absent from the options. |
| 2022-PSA-19 | Fractional raw powers of a Cauchy variable are not generally real on negative inputs; the familiar moment statement concerns absolute moments. |
| 2023-PSA-29 | Above the permitted disjoint-tail range, the proposed sum of test indicators can equal two. |

The full syllabus gives the arguments and counterexamples. Exact rational arithmetic checked the matrix constructions, and enumeration checked the 33 algebraic-system candidates; the completeness argument is mathematical, not inferred from enumeration. Four additional questions carry condition notes. All other ledger rows say `route_reviewed_not_solution_certified`: absence of a flagged issue is not a correctness certificate.

## Files

| File | Use |
| --- | --- |
| `question_audit.csv` / `.json` | All 392 routes, source pages, original topics, selected secondary targets, audit notes and statement hashes. |
| `audit_statistics.json` | Counts, year presence, retrospective exercise, flagged questions, repeated mechanisms and uploaded-source hashes. |
| `syllabus_targets.json` | All 80 targets, exact scope, prerequisites, 162 session steps and learning route. |
| `official_scope_crosswalk.csv` | The 47 checks against the supplied official syllabus. |
| `validation_report.json` | Checks actually run on the final source and rendered documents, with limitations. |
| `reproduce_audit.py` | Standard-library Python check of packaged counts, dependencies, crosswalk, retrospective figures and selected exact counterexamples. |
| `SHA256SUMS.txt` | Integrity hashes of the evidence files in this package. |

After extraction, run `python3 reproduce_audit.py` in this folder. It recomputes the recorded statistics and verifies the evidence hashes; it does not independently reproduce the human topic judgments. The package omits the source examination PDFs and full question text. Matching those requires your original uploaded files.

## Validation limits and next action

All 80 prerequisite routes resolve without a cycle; the 162 session steps, 392 question identities, source page numbers and 47 crosswalk entries were checked. The final PDF has 45 pages, 80 target bookmarks and 278 valid internal navigation links. All pages were visually inspected in contact sheets; selected pages were inspected at larger size, including the final two changed pages. Structural checks found no out-of-margin text or replacement characters. External URLs are references, not a claim of live availability.

This is a scope, prioritisation and prerequisite audit with selected mathematical defect checks, not a solution audit of all 392 questions or a model of future papers. Use the PDF's page 3 for priorities, pages 5–8 for the learning order, and each target's session steps for today's bounded work. If the previously reported A01/A02 progress still applies, F1/F2 remain diagnostic-only; continue at F3 rather than restarting them.
