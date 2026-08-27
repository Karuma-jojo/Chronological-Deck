export function buildT22RichModule16(syllabusVersion) {
  return {
    moduleId: "ARC713",
    syllabusVersion,
    roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
    modulePurpose:
      "Make scientific-computing performance an empirical, structure-aware discipline: measure bottlenecks, reason about memory layout and allocation, exploit vectorized numerical kernels, preserve cache locality, batch work under memory constraints, judge parallelism by overhead and dependency structure, and defend optimizations with reproducible benchmarks rather than folklore.",
    moduleDestination:
      "The learner can profile a research workload, identify the dominant time/memory bottleneck, explain the mechanism using algorithmic and memory-access reasoning, implement a materially better version without changing the mathematical result, validate correctness against a reference, and report performance gains with measurements that distinguish useful optimization from noise or accidental benchmark bias.",
    entryPrerequisites: [
      "T22 Module 13 / ARC515: Python, NumPy, vectorization, testing and reproducible experiments",
      "T22 Module 15 / ARC585: numerical reliability, matrix computation, sparse/large-scale trade-offs and the distinction between mathematical correctness and computational method",
      "T22 Module 14 / ARC717: time/space complexity and algorithm-selection reasoning",
      "Ability to read array shapes, loops, indexing and basic benchmark output",
    ],
    explicitlyOutOfScope: [
      "Detailed CPU microarchitecture, assembly optimization or compiler construction",
      "GPU kernel programming, CUDA/OpenCL and distributed-memory HPC",
      "Production cluster orchestration and systems administration",
      "Database/query optimization and columnar storage engines — ARC716",
      "Market-data reconstruction and temporal joins — ARC714",
      "Numerical stability/conditioning as the primary topic — ARC585",
      "General algorithm/interview breadth — ARC717",
    ],
    arcs: {
      "T22-M16-A01": {
        focus: "Empirical performance measurement, profiling and bottleneck attribution before optimization.",
        roleRelevance:
          "Quantitative researchers often spend effort accelerating code that is not dominant in wall-clock or memory cost; disciplined profiling prevents wasted engineering and misleading speed claims.",
        purpose:
          "Establish measurement as the entry condition for performance work and teach how to separate runtime, allocation, I/O and variability effects.",
        principalObstacle:
          "A slow program does not reveal its bottleneck by inspection alone: intuition can confuse hot code with frequently seen code, startup cost with steady-state cost, or noisy timing with a real improvement.",
        entryPrerequisites: ["ARC515 reproducible Python experiments", "ARC717 complexity reasoning", "Basic command-line or notebook timing"],
        target:
          "Design a reproducible benchmark/profile for a scientific workload, locate the dominant bottleneck, and justify the next optimization target with measurements rather than code aesthetics.",
        requiredMastery: [
          "Distinguish wall-clock timing, CPU time, peak/resident memory and allocation counts conceptually and choose the metric relevant to a stated bottleneck",
          "Construct a benchmark that controls warm-up, input size, repeated runs and environmental noise sufficiently for the claim being made",
          "Use line/function-level profiling evidence to identify where execution time is actually spent",
          "Reject an optimization whose measured change is within run-to-run noise or shifts cost elsewhere without improving the stated objective",
          "Explain why asymptotic complexity alone may not predict observed runtime over realistic problem sizes",
          "Document baseline hardware/software/input conditions well enough for a later comparison",
          "Transfer the profiling workflow to an unfamiliar numerical/data-processing task",
        ],
        applicationScope:
          "A medium-scale NumPy/pandas/scientific Python workload where at least two plausible bottlenecks compete for attention.",
        transferScope:
          "A new workload in which the visually largest function is not necessarily the dominant cost and the learner must gather evidence before choosing what to optimize.",
        explicitlyOutOfScope: ["Hardware performance-counter deep dives", "Assembly-level profiling", "Distributed tracing"],
        nextArcBoundary:
          "A02 explains how array layout and strides determine the physical access pattern behind seemingly similar array operations.",
      },
      "T22-M16-A02": {
        focus: "Array memory layout, strides and the cost of non-contiguous access.",
        roleRelevance:
          "Large numerical workloads are often bandwidth/cache limited; understanding how multidimensional indices map to memory is essential for predicting whether an operation streams efficiently or jumps through memory.",
        purpose:
          "Connect array shape/index notation to physical memory traversal so performance consequences can be reasoned about rather than guessed.",
        principalObstacle:
          "Two arrays with identical values and shapes can have different strides/layouts, and an apparently simple transpose/slice can change access order without copying data.",
        entryPrerequisites: ["T22-M16-A01", "NumPy arrays, shape and indexing", "Elementary row/column matrix notation"],
        target:
          "Read shape/stride information, predict contiguous versus strided traversal, and choose or restructure operations to avoid pathological memory access when it materially matters.",
        requiredMastery: [
          "Explain row-major/C-order layout operationally as a mapping from multidimensional indices to linear memory without requiring bit-level implementation details",
          "Interpret array strides and predict which axis is cheapest to traverse for a given layout",
          "Distinguish a transposed/sliced view from a newly contiguous copy and explain the performance trade-off",
          "Construct or analyze an experiment where loop/index order changes runtime while mathematical work is nominally the same",
          "Explain why contiguous access benefits prefetch/cache-line utilization at a qualitative but mechanistic level",
          "Recognize when copying once into a better layout can be cheaper than repeatedly operating through an unfavorable stride pattern",
          "Transfer stride reasoning to an unfamiliar tensor/feature-matrix operation",
        ],
        applicationScope:
          "Dense arrays/tensors used for features, simulations, linear algebra or rolling calculations where traversal order affects throughput.",
        transferScope:
          "A shape-correct but unexpectedly slow array pipeline where the learner must infer whether layout/stride structure is the plausible cause and design a confirming measurement.",
        explicitlyOutOfScope: ["CPU cache hierarchy details beyond what access-pattern reasoning needs", "GPU memory coalescing", "Compiler vector-register scheduling"],
        nextArcBoundary:
          "A03 separates cheap views from expensive copies and makes temporary allocation/lifetime part of performance reasoning.",
      },
      "T22-M16-A03": {
        focus: "Views, copies, temporary arrays and allocation-aware numerical code.",
        roleRelevance:
          "Research pipelines can become memory-bound or fail outright because innocent-looking indexing and expression chains silently allocate large intermediates.",
        purpose:
          "Make data ownership and allocation visible so memory cost is treated as a first-class computational constraint.",
        principalObstacle:
          "High-level array syntax hides whether an operation aliases existing storage, materializes a copy or creates multiple temporaries; correctness can also break when a view mutates shared data unexpectedly.",
        entryPrerequisites: ["T22-M16-A01-A02", "NumPy slicing/indexing", "Basic mutability/reference concepts"],
        target:
          "Predict and measure view/copy/allocation behavior, reduce unnecessary temporaries without introducing aliasing bugs, and justify memory-performance trade-offs.",
        requiredMastery: [
          "Distinguish basic slicing/view semantics from representative advanced-indexing/copy behavior in NumPy at an operational level",
          "Demonstrate an aliasing case where modifying a view changes the parent and explain why this is a correctness concern",
          "Identify expression chains that create large temporary arrays and estimate their order-of-magnitude memory footprint",
          "Use in-place operations, output buffers or expression restructuring only when semantics permit and explain the trade-offs",
          "Measure peak memory or allocation behavior before and after a change rather than assuming fewer source lines imply less memory",
          "Recognize when forcing contiguity or a defensive copy is justified despite its allocation cost",
          "Transfer allocation reasoning to an unfamiliar simulation or feature-engineering pipeline",
        ],
        applicationScope:
          "Large-array transformations where temporary storage, aliasing and repeated materialization affect throughput or memory feasibility.",
        transferScope:
          "A computation that is mathematically vectorized but exceeds memory because of hidden intermediates; the learner must preserve correctness while reducing live memory.",
        explicitlyOutOfScope: ["Custom memory allocators", "Manual pointer arithmetic", "Garbage-collector internals"],
        nextArcBoundary:
          "A04 revisits vectorization specifically as a performance transformation, including the cases where naive vectorization increases memory cost or does not help.",
      },
      "T22-M16-A04": {
        focus: "Vectorization as a performance transformation, with correctness equivalence and memory trade-offs.",
        roleRelevance:
          "Scientific Python gains much of its performance by moving repeated work into compiled numerical kernels, but blindly eliminating Python loops can produce giant temporaries or obscure algorithms.",
        purpose:
          "Teach when vectorization removes interpreter overhead and improves throughput, and when a different formulation is required because memory or dependency structure dominates.",
        principalObstacle:
          "'Vectorized' is not synonymous with 'fast': equivalent high-level expressions can differ in kernel fusion, temporary allocation, memory traffic and algorithmic work.",
        entryPrerequisites: ["ARC515 vectorization", "T22-M16-A01-A03", "Reference implementation/testing discipline"],
        target:
          "Transform an appropriate loop-based numerical kernel into a vectorized or library-kernel form, prove/test equivalence, measure the speed/memory change, and recognize when vectorization is the wrong optimization.",
        requiredMastery: [
          "Explain why moving elementwise/reduction work from Python iteration into compiled array kernels can reduce interpreter overhead",
          "Derive a vectorized formulation from a scalar/reference loop while preserving indexing and boundary semantics",
          "Validate vectorized output against a simple trusted reference over edge cases rather than benchmarking unchecked code",
          "Identify a vectorized expression whose large intermediates make it slower or less memory-feasible than a chunked/streamed alternative",
          "Distinguish vectorization from a genuine reduction in algorithmic complexity",
          "Choose built-in linear algebra/reduction primitives when they express the intended computation more directly than manual loops",
          "Transfer the decision to an unfamiliar rolling, simulation or pairwise-computation task",
        ],
        applicationScope:
          "Feature transforms, reductions, simulations and numerical kernels with enough repeated scalar work for Python overhead to matter.",
        transferScope:
          "A workload where the learner must compare scalar loops, array kernels and memory-aware alternatives rather than assuming the most vectorized source is best.",
        explicitlyOutOfScope: ["Writing C/Cython extensions", "JIT compiler internals", "GPU kernels"],
        nextArcBoundary:
          "A05 focuses on cache locality and traversal reuse after vectorization and layout have made memory traffic the dominant concern.",
      },
      "T22-M16-A05": {
        focus: "Cache locality, working sets and access-pattern design for numerical workloads.",
        roleRelevance:
          "Once arithmetic is cheap, repeatedly moving data through the memory hierarchy can dominate runtime; many large research tasks are limited by data movement rather than floating-point operations.",
        purpose:
          "Build a mechanistic model of temporal/spatial locality sufficient to redesign access patterns and reduce unnecessary memory traffic.",
        principalObstacle:
          "Equivalent computations can touch the same total elements yet perform very differently because one reuses nearby/recent data while another repeatedly evicts and reloads a large working set.",
        entryPrerequisites: ["T22-M16-A02-A04", "Arrays and loop nests", "Basic notion of cache/main-memory speed difference"],
        target:
          "Diagnose locality-related performance problems and restructure traversal or blocking so useful data reuse occurs before the working set is discarded.",
        requiredMastery: [
          "Explain spatial and temporal locality in terms of nearby access and reuse rather than memorized hardware slogans",
          "Predict which of two loop/access orders is likely to generate more contiguous reuse for a stated layout",
          "Relate working-set size qualitatively to why a benchmark may change regime as input size grows",
          "Construct a blocked/tiled version of a simple operation and explain how it increases data reuse without changing the mathematics",
          "Use measurement across several problem sizes to distinguish a locality hypothesis from general Python overhead",
          "Recognize that fewer arithmetic operations can still lose if they induce substantially worse memory traffic",
          "Transfer locality reasoning to an unfamiliar rolling-window, matrix or panel-data computation",
        ],
        applicationScope:
          "Dense numerical kernels and repeated window/block operations where layout and reuse affect memory bandwidth/cache behavior.",
        transferScope:
          "A workload with a sharp slowdown after some problem size, requiring a testable working-set/locality explanation rather than arbitrary micro-optimizations.",
        explicitlyOutOfScope: ["Exact cache-set mapping", "NUMA tuning", "Hardware-counter methodology in depth"],
        nextArcBoundary:
          "A06 turns memory limits into an algorithm-design constraint through chunking/batching and streaming reductions.",
      },
      "T22-M16-A06": {
        focus: "Batching, chunking and streaming computation under explicit memory constraints.",
        roleRelevance:
          "Real research datasets and simulation grids often exceed convenient RAM even though the desired statistic or transform can be computed incrementally.",
        purpose:
          "Teach how to preserve mathematical results while bounding peak memory and choosing batch size from measurable resource constraints.",
        principalObstacle:
          "Materializing every intermediate/all-pairs object is often unnecessary, but chunking can subtly change reduction semantics, boundary handling or numerical accumulation if not designed carefully.",
        entryPrerequisites: ["T22-M16-A01-A05", "Reductions/aggregations", "Memory-footprint estimation"],
        target:
          "Refactor a memory-infeasible or wasteful computation into bounded-memory batches/streams, prove or test equivalence, and select batch size using measured throughput and peak memory.",
        requiredMastery: [
          "Estimate whether a proposed full materialization fits a stated memory budget before executing it",
          "Identify associative/decomposable computations that can be accumulated batch by batch and state any numerical caveats",
          "Design chunk boundaries correctly for a representative windowed/pairwise/row-wise task, including overlap when required",
          "Compare peak memory and runtime across batch sizes and explain the throughput-versus-memory trade-off",
          "Avoid an O(n^2)-memory materialization when the final objective can be produced with substantially less live storage",
          "Validate batched output against an unbatched reference on small cases",
          "Transfer bounded-memory design to an unfamiliar large simulation or dataset transformation",
        ],
        applicationScope:
          "Large simulations, pairwise blocks, feature pipelines or matrix/data operations whose full intermediate representation is unnecessary or infeasible.",
        transferScope:
          "A task presented as 'does not fit in memory' where the learner must identify the decomposable state and build a correct streaming/batched computation.",
        explicitlyOutOfScope: ["SQL/out-of-core query engines — ARC716", "Distributed storage systems", "Numerical summation theory beyond required reliability checks"],
        nextArcBoundary:
          "A07 asks whether independent work should be parallelized at all, accounting for serialization, synchronization, startup and memory-bandwidth overhead.",
      },
      "T22-M16-A07": {
        focus: "Parallelism, dependency structure, overhead and scalability limits.",
        roleRelevance:
          "Quant workloads contain embarrassingly parallel simulations and parameter sweeps, but parallel execution can be slower when tasks are tiny, memory-bound or dominated by communication/serialization.",
        purpose:
          "Replace 'more cores is faster' with an evidence-based model of parallel speedup, overhead and serial bottlenecks.",
        principalObstacle:
          "Parallel resources do not remove dependencies or overhead: setup, scheduling, serialization, synchronization, contention and memory bandwidth can dominate the useful work.",
        entryPrerequisites: ["T22-M16-A01-A06", "Independent versus dependent tasks", "Basic ratios/percentages"],
        target:
          "Decide whether and how to parallelize a scientific workload, predict qualitative scaling limits, measure speedup/efficiency, and diagnose cases where parallelism hurts.",
        requiredMastery: [
          "Identify embarrassingly parallel versus dependency-constrained parts of a workload",
          "Use the serial-fraction logic of Amdahl's law to explain why speedup has an upper bound without treating the formula as a guarantee",
          "Compute observed speedup and parallel efficiency from benchmark data",
          "Construct or analyze a case where task granularity/serialization overhead makes multiple workers slower than one",
          "Explain why memory-bandwidth-limited vectorized kernels may not scale with additional workers",
          "Distinguish process/thread/library-level parallelism operationally enough to avoid obvious Python-level misconceptions without entering runtime internals",
          "Transfer the parallelization decision to an unfamiliar simulation, resampling or parameter-sweep workload",
        ],
        applicationScope:
          "Independent simulations, bootstrap-like workloads, parameter sweeps and CPU numerical tasks where parallel overhead can be measured against useful work.",
        transferScope:
          "A workload with apparently abundant independent tasks where the learner must establish task granularity and bottlenecks before recommending more workers.",
        explicitlyOutOfScope: ["Distributed computing frameworks", "GPU programming", "Detailed Python GIL/runtime internals", "Lock-free/concurrent data-structure design"],
        nextArcBoundary:
          "A08 integrates profiling, layout, allocation, vectorization, locality, batching and parallelism into one defended optimization project.",
      },
      "T22-M16-A08": {
        focus: "End-to-end performance optimization lab with correctness, measurement and causal attribution.",
        roleRelevance:
          "A quantitative researcher must be able to make a slow or memory-hungry analysis materially better without corrupting the result, cherry-picking a benchmark or producing an unmaintainable optimization whose mechanism is unknown.",
        purpose:
          "Integrate the module into a reproducible optimization investigation that begins with a baseline and ends with a defensible performance claim.",
        principalObstacle:
          "Several interventions may change runtime simultaneously, making it easy to claim victory without knowing which change mattered, whether correctness survived, or whether the benchmark represents the real workload.",
        entryPrerequisites: ["T22-M16-A01-A07", "ARC515 tests/reproducibility", "ARC585 numerical-reliability discipline"],
        target:
          "Take a realistic slow/memory-heavy research computation from profiled baseline to materially improved implementation, validate numerical/semantic equivalence, and defend each accepted optimization with mechanism-specific evidence.",
        requiredMastery: [
          "Record a reproducible baseline including representative input sizes, runtime distribution and memory metric where relevant",
          "Profile before changing code and rank candidate bottlenecks by evidence",
          "Apply at least two conceptually distinct optimization ideas from the module while isolating their incremental effects",
          "Preserve correctness using reference tests/tolerances appropriate to the numerical computation and explain any legitimate floating-point differences",
          "Report both runtime and memory consequences so a speedup that causes unacceptable resource growth is not hidden",
          "Reject or revert an attempted optimization that does not survive measurement or harms correctness/maintainability disproportionately",
          "Explain the causal mechanism behind the final improvement rather than presenting only before/after numbers",
          "Transfer the complete workflow to a novel research kernel and propose the next measurement if further scaling were required",
        ],
        applicationScope:
          "A realistic scientific Python workload such as simulation, feature construction, matrix/data transformation or repeated model evaluation with measurable time/memory pressure.",
        transferScope:
          "A fresh bottleneck where no prescribed trick is given; the learner must profile, hypothesize, intervene, verify and measure in the correct order.",
        explicitlyOutOfScope: ["Production distributed deployment", "Architecture-specific hand tuning", "Database engineering — ARC716"],
        nextArcBoundary:
          "Module 17 / ARC048 begins the probability sequence; M16 remains the performance toolkit later reused by Monte Carlo, data querying, market-data engineering and execution research.",
      },
    },
  };
}
