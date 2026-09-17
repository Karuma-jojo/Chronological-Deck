# T22 Stage A Source Map

Checked and rechecked: 2026-09-17

Purpose: ground the route architecture in public evidence about quantitative work, standard mathematical sequencing and implementation hazards. Sources inform the architecture; none is treated as a universal hiring rubric or a mandate to copy another curriculum.

## A. Quantitative work evidence

### Jane Street — Quantitative Research

- https://www.janestreet.com/quantitative-research/
- https://www.janestreet.com/join-jane-street/position/8600948002/

Observed current role signals:
- mathematical/logical and empirical research reasoning;
- experiment design and dataset generation;
- time-series analysis, feature engineering and model building;
- market data and large-scale data work;
- researchers collaborate with traders/engineers and work on models, strategies and systems that price/trade instruments;
- programming/implementation is part of the research environment rather than a separable optional afterthought.

**Architecture implication:** T22 should not end at abstract mathematics. Statistical modeling, temporal data handling, experimental discipline and implementation must be core research capabilities.

**Caveat:** one firm's role page is evidence about that firm's current work, not a universal interview syllabus.

### IMC — Graduate Quantitative Trader / Graduate Quantitative Researcher

- https://www.imc.com/us/careers/jobs/4751729101
- https://www.imc.com/us/careers/jobs/4907368101

Observed current role signals:
- trader: analytical problem solving, strategy/algorithm improvement, decision-making under a fast workflow and collaboration; programming is listed as a plus; prior financial-market knowledge is explicitly not required;
- researcher: rigorous analytical/quantitative techniques, custom research tools, mathematical model design, implementation/deployment and strong programming.

**Architecture implication:** an early decision-under-uncertainty track is legitimate; markets can be taught progressively rather than requiring a finance degree before any trading practice. Research implementation, however, must become a real capability rather than copied code.

### Two Sigma — Quantitative Research & Data Science

- https://www.twosigma.com/careers/quantitative-research-data-science/

Observed current role signals:
- scientific thinking;
- systematic hypothesis testing;
- real-world/large datasets;
- pattern/model discovery used to reason about markets.

**Architecture implication:** reproducibility, falsifiability, validation and data provenance belong in the core, not only in a final optional capstone.

## B. Mathematics sequencing references

### MIT OpenCourseWare 18.05 — Introduction to Probability and Statistics

- https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/syllabus/

Useful scope evidence:
- counting/combinatorics;
- conditional probability and Bayes;
- random variables/distributions;
- expectation/variance/covariance;
- LLN/CLT;
- inference, confidence intervals, hypothesis tests, bootstrap and regression;
- computation/simulation throughout.

**Architecture implication:** T22's probability/statistics spine should have an explicit progression instead of treating probability as a late isolated module.

**Caveat:** MIT 18.05 itself lists multivariable calculus as a course prerequisite. T22 deliberately extracts an earlier *finite probability/expectation* bridge for trading games; it is not claiming to reproduce MIT's course prerequisite policy.

### MIT OpenCourseWare 18.06SC — Linear Algebra

- https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/syllabus/

Useful scope/order evidence:
- systems and matrix operations;
- vector spaces/bases;
- orthogonality and projections;
- least squares;
- eigenvalues/eigenvectors;
- symmetric/positive-definite matrices;
- SVD.

**Architecture implication:** the proposed linear-algebra spine preserves vectors/matrices before projection/least squares and spectral/factorization material.

**Caveat:** MIT lists multivariable calculus formally for 18.06 but also states calculus knowledge is not required to learn the linear-algebra material itself. T22 therefore treats the dependency graph by concept, not by copying MIT enrollment rules.

## C. Implementation and leakage references

### Python tutorial

- https://docs.python.org/3/tutorial/controlflow.html
- https://docs.python.org/3/tutorial/datastructures.html

**Architecture implication:** the first coding layer can be intentionally small—expressions, control flow, functions and basic containers—before scientific libraries are required.

### pandas `merge_asof`

- https://pandas.pydata.org/docs/reference/api/pandas.merge_asof.html

The current documentation distinguishes backward, forward and nearest temporal matches. A backward search chooses the last right-side key less than or equal to the left key; nearest chooses the closest key and can therefore select a future observation.

**Architecture implication:** market-data training must make causal/as-of direction an explicit invariant. A nearest timestamp join is not automatically prediction-time safe.

### scikit-learn model-selection / leakage guidance

- https://scikit-learn.org/stable/common_pitfalls.html
- https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html

**Architecture implication:** preprocessing must be fitted on training data, and temporal validation must account for chronological order. T22 adds the finance-specific requirement that split gaps also respect overlapping forward label windows rather than assuming a library splitter can infer the economic horizon.

## D. Repository evidence used in this audit

Primary internal surfaces:
- `js/data/t22-quant-research.js`;
- `js/data/t22-atomic-arcs.js`;
- `js/data/t22-rich-syllabus.js`;
- representative and dependency-sensitive `js/data/t22-rich-module-*.js`, including current `ARC515`, `ARC211`, `ARC553`, `ARC558` and `ARC586` contracts;
- `js/t22-atomic-ui.js`;
- `scripts/validate-t22-atomic.mjs`;
- `scripts/validate-t22-rich-syllabus.mjs`;
- T22 GitHub Actions workflows;
- `js/data/arc-store.js`;
- T25 `course/authoring/*`, generated evaluator/course artifacts and associated validation scripts, used only as implementation references.

## E. What the sources do *not* prove

They do not prove:
- that one exact 56-capability core is the only valid route;
- that every firm interviews identically;
- that every advanced topic is mandatory for a first role;
- that the current 596 atomic arcs are all correct merely because validators pass;
- that an API default is a safe research choice;
- that this Stage A architecture guarantees employment, trading profitability or pedagogical perfection.

Those judgments remain architecture decisions to be challenged by Astra before bulk authoring.
