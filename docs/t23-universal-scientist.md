# T23 — Universal Computational & Field Scientist

T23 is the **transferable scientific-method strike path** for Chrono-Deck.

It is not an attempt to create a person who knows every science. That person does not exist. T23 instead trains the reusable machinery that makes someone unusually useful when entering a new scientific team, then requires one genuine domain apprenticeship before the route can be considered complete.

## Operating idea

The route owns the full inference chain:

> **phenomenon → question → measurement → calibration → raw data → quality control → model → uncertainty → conclusion → next experiment**

A prepared CSV is therefore not the beginning of science. T23 begins upstream, with the question, physical process and measurement system that produced the numbers, and continues downstream until the next decision or experiment is justified.

## What T23 optimizes for

A T23 graduate should be able to join a serious research group and become useful by doing more than calling a machine-learning API. The target is a **computational / quantitative field scientist** who can:

1. understand what is physically or observationally being measured;
2. audit calibration, units, timing and uncertainty;
3. model enough mechanics and wave propagation to understand what the instrument can and cannot observe;
4. reconstruct and steward raw scientific data with provenance;
5. build mathematical, statistical and mechanistic models;
6. use machine learning without confusing prediction with explanation, and deploy it under realistic edge constraints when needed;
7. make research software reproducible and computationally efficient;
8. reason about signals, images, space and time;
9. work with sensors, real-time DAQ, instrumentation and autonomous systems;
10. plan for field failure, logistics and mission reliability;
11. communicate evidence clearly to specialists and non-specialists;
12. decide what measurement or experiment has the highest value next; and
13. know where generic methods end and domain expertise must take over.

## The 66-node strike path

### Phase 1 — Reality, measurement & physical/mathematical modelling

Scientific method and competing explanations lead into dimensional analysis, measurement uncertainty, calibration and traceability. The mathematical engine develops calculus, with limits and local Taylor approximation folded into the T23 calculus presentation, then integration, vectors, transformations, projections, eigensystems, matrix factorization, multivariable calculus, matrix calculus, dynamical systems and optimization. T23 now explicitly anchors that abstraction in **kinematics/rigid-body dynamics** and **waves/electromagnetic/acoustic propagation for sensing**.

**Core question:** *What exactly are we claiming to measure or model, what physical laws generate the observation, and what mathematical structure does the claim require?*

### Phase 2 — Probability, inference & experimental science

Probability, Bayesian updating, sampling, random variables, estimation, LLN/CLT/concentration, regression, likelihood, hypothesis testing, resampling, multivariate statistics, confounding, experimental design, causal inference, out-of-sample validation and evidence synthesis.

**Core question:** *How strong is the evidence, what uncertainty remains, and what alternative explanation still survives?*

### Phase 3 — Scientific computing & data systems

Scientific Python, simulation, numerical linear algebra, numerical ODE/PDE methods, optimization/automatic differentiation, performance-aware computing, SQL/columnar querying, scientific file formats, metadata, provenance, practical stewardship/interoperability, GIS/spatiotemporal alignment, imaging/remote sensing, data quality and research-software engineering.

Metadata and provenance remain because they are part of the scientific meaning of a measurement: units, time bases, calibration state, sensor identity and transformation history cannot be reconstructed after the fact by a clever model. FAIR ideas are retained as interoperability guidance rather than treated as a bureaucratic end in themselves.

**Core question:** *Can another researcher reconstruct exactly how raw observations became this result and what each value physically means?*

### Phase 4 — Signals, time, inverse problems & deployable learning

Fourier analysis, FFTs, time series, state-space estimation, inverse problems/data assimilation, statistical learning, regularization, tree ensembles, neural networks, model compression/edge inference and image representation learning.

T23 does not replace neural-network fundamentals with deployment recipes. It compresses the theory to what is needed to understand training and failure, then adds quantization, pruning, distillation, memory/latency/power constraints and target-hardware profiling.

**Core question:** *What hidden structure can be inferred from noisy indirect observations, what assumptions make that inference possible, and can the model actually run where the measurement happens?*

### Phase 5 — Real-time instrumentation, autonomy & field reliability

Sampling is followed by explicit **real-time DAQ**: interrupts, DMA intuition, ring buffers, concurrency, deterministic timing, overflow/backpressure, dropped-sample detection, synchronization and telemetry. Embedded instrumentation and timing then feed state estimation/control, robotics/localization/autonomy, and field mission safety/reliability.

**Core question:** *Will the experiment still produce interpretable science when clocks drift, buffers fill, packets disappear, weather turns, a sensor fails or communications drop?*

### Phase 6 — Reproducibility, communication, leadership & domain proof

Research provenance/open science, visualization and writing, proposals and teaching, value-of-information reasoning, experiment sequencing, team judgment and the mandatory domain apprenticeship.

**Core question:** *What should the team do next, why is it the best use of scarce time/resources, and can the reasoning survive scrutiny?*

## New T23 arcs

T23 now adds 17 focused arcs to the v1.3 post-T22 registry:

- **ARC718 — Measurement Systems, Calibration & Traceability**
- **ARC719 — Uncertainty Budgets & Error Propagation**
- **ARC720 — Scientific Data Engineering, Provenance & Stewardship**
- **ARC721 — Spatiotemporal Data, GIS & Coordinate Systems**
- **ARC722 — Remote Sensing, Imaging & Image Formation**
- **ARC723 — Scientific Data Quality, Missingness & Bias**
- **ARC724 — Research Software Engineering & Reproducible Workflows**
- **ARC725 — Real-Time Data Acquisition, Sampling & Telemetry**
- **ARC726 — Instrumentation, Embedded Systems & Scientific Timing**
- **ARC727 — Inverse Problems & Data Assimilation**
- **ARC728 — Robotics, Localization & Autonomous Field Systems**
- **ARC729 — Field Research Operations, Safety & Mission Reliability**
- **ARC730 — Scientific Visualization, Writing & Proposal Communication**
- **ARC731 — Research Leadership, Value of Information & Experiment Sequencing**
- **ARC732 — Domain Apprenticeship & Team-Science Capstone**
- **ARC733 — Kinematics & Rigid-Body Dynamics**
- **ARC734 — Waves, Electromagnetism & Propagation for Sensing**

T23 also reuses generic machinery introduced by T22 — notably matrix calculus, empirical LLN/CLT/concentration, performance-aware scientific computing and efficient data querying — while giving them T23-specific presentation where appropriate.

## Deliberate compression rather than deletion

The route remains **66 nodes**. To make room for the two physical-law anchors without bloating the gate, the standalone T23 requirements for **Sequences & Limits** and **Taylor Approximation** are removed. Their mission-relevant content is folded into the T23-specific **Calculus, Limits & Local Approximation** presentation.

This is a route-level compression only. The original Chrono-Deck nodes remain in the wider world and can still be studied in full. Nothing is deleted from the scientific registry.

Likewise, generic neural-network theory is not amputated. T23 presents that shared node as **Neural Networks, Compression & Edge Inference**: enough backpropagation/training theory to reason about the model, followed by deployment under memory, latency, power and hardware constraints.

## The domain-home rule

T23 deliberately refuses the fantasy that a generalist can walk into any laboratory and immediately outrank people who have spent fifteen years studying its phenomenon.

Before terminal completion, choose **one deep scientific home**, for example:

- Earth, ocean or polar science;
- astronomy / space science;
- physics;
- chemistry;
- biology / medicine;
- materials science;
- robotics / autonomous systems; or
- another rigorous empirical field.

The final capstone must involve a domain expert or research group. The expert should be able to identify a component of the work that the T23 learner genuinely owned.

The intended shape is therefore **T-shaped**:

> broad quantitative / computational / experimental spine  
> **+**  
> one serious scientific depth axis

## Exit artifacts

T23 is complete only after four defended artifacts.

### 1. Measurement-chain audit

Take a real or realistically simulated measurement system from phenomenon to calibrated quantity. Document the relevant propagation/physical model, sensor response, units, calibration, traceability, error sources and a complete uncertainty budget.

### 2. Raw scientific-data reconstruction

Start from raw multimodal observations rather than a prepared training table. Produce versioned ingestion, metadata/data dictionary, provenance, QC, missingness decisions, temporal/spatial alignment, dropped-sample checks where relevant, and an analysis-ready dataset.

### 3. Reproducible inference study

Answer one nontrivial scientific question using a defensible baseline plus an appropriate mechanistic, statistical or ML model. Include uncertainty, sensitivity analysis, out-of-sample validation where meaningful, computational profiling and a reproducible code/data package. If inference must run on an edge device, demonstrate the actual resource/latency trade-offs rather than quoting desktop performance.

### 4. Team-science domain capstone

Work in the chosen domain home with a genuine collaborator. Include an acquisition/field/mission plan where applicable, physical system model, failure and safety analysis, scientific deliverables, a research memo or proposal, visual communication and an oral defense. The capstone must explicitly document which conclusions depended on domain knowledge not supplied by T23.

## What T23 does not gate

The following remain selectable branches rather than universal prerequisites:

- measure-theoretic probability and very deep mathematical statistics;
- full analytical mechanics, continuum mechanics or graduate electromagnetism;
- advanced neural architectures and frontier ML specializations;
- low-level kernel/RTOS/CUDA/distributed-systems depth;
- every branch of physics, chemistry, biology, medicine or Earth science;
- discipline-specific laboratory techniques;
- desk-specific quantitative finance.

The rule is simple: **add depth when the mission makes it necessary.**

## Relationship to T22

T22 and T23 overlap heavily in mathematics, statistics, scientific computing and model skepticism, but their endpoints are different.

- **T22** asks: *Can this research survive contact with a market and capital?*
- **T23** asks: *Can this inference survive contact with measurement, physical law, hardware, the environment and a scientific team?*

A learner can progress through both. T22 is a quantitative-research career gate; T23 builds the transferable scientific identity needed for expedition, laboratory, Earth-system, robotics or other cross-disciplinary research.

## Final standard

The T23 graduate should aspire to be the person who can enter a messy project and say:

> **Show me the question. Show me the physical system. Show me the instrument. Show me how the observations were generated. Show me the raw data and provenance. Show me what you currently believe and why. Now let us determine what the evidence really supports — and what we should measure next.**

That is the transferable scientific capability T23 is designed to cultivate.