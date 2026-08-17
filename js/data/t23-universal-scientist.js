import { WORLD } from "./world.js";

const T23_ID = "T23";

function createT23Node(number, title, level, summary, masteryPrereqs, masteryScope) {
  return {
    id: `ARC${number}`,
    arc: `ARC ${number}`,
    title,
    kind: "new",
    level,
    domains: ["General / Common", "Mathematics & Statistics", "Computation & Information", "Physics & Engineering"],
    summary,
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: [...masteryPrereqs],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "T23 Universal Scientist Strike Path",
    commonGroup: null,
    gatewayTags: ["MathStats", "CS", "Physics"],
    terminalTags: [T23_ID],
    requiredByCount: 1,
    stage: "Universal scientist strike path",
    masteryScope,
  };
}

export const T23_NEW_NODES = [
  createT23Node(
    718,
    "Measurement Systems, Calibration & Traceability",
    "L2",
    "Understand how a physical or observational phenomenon becomes a defensible numerical measurement rather than treating a dataset as ground truth.",
    ["SIDE478", "SIDE474", "SIDE476"],
    "Measurands and operational definitions; sensor response; calibration curves; reference standards and traceability; zero/span checks; drift, hysteresis and nonlinearity; repeatability versus reproducibility; detection limits; calibration records; designing measurements whose meaning survives handoff to another team.",
  ),
  createT23Node(
    719,
    "Uncertainty Budgets & Error Propagation",
    "L3",
    "Carry uncertainty from measurement through derived quantities, models and conclusions without hiding it behind a single point estimate.",
    ["ARC718", "SIDE476"],
    "Random and systematic components; covariance between errors; first-order propagation/Jacobian methods; Monte Carlo propagation; sensitivity coefficients; uncertainty budgets; significant figures; confidence versus measurement uncertainty; separating model, parameter and measurement uncertainty; reporting assumptions and dominant contributors.",
  ),
  createT23Node(
    720,
    "Scientific Data Engineering, Provenance & Stewardship",
    "L3",
    "Turn raw observations into durable scientific assets whose origin, meaning, timing and transformations can be reconstructed by other researchers.",
    ["ARC515", "ARC716", "ARC718"],
    "Raw versus calibrated/derived layers; schemas; identifiers; units and conventions; timestamps and time bases; metadata and data dictionaries; provenance; versioning; checksums; Parquet, HDF5 and NetCDF concepts; chunking/compression; reproducible ingestion and transformation manifests; FAIR principles as interoperability guidance rather than administrative ceremony.",
  ),
  createT23Node(
    721,
    "Spatiotemporal Data, GIS & Coordinate Systems",
    "L3",
    "Reason correctly about data indexed by place and time, including coordinate transforms, resolution and alignment across instruments.",
    ["ARC720", "SIDE271"],
    "Latitude/longitude and projected coordinate systems; datums; raster versus vector data; spatial joins; interpolation and gridding; spatial resolution; temporal resolution; time zones and clocks; geodesic distance; map projections and distortion; spatial autocorrelation intuition; xarray/GIS-style multidimensional data workflows.",
  ),
  createT23Node(
    722,
    "Remote Sensing, Imaging & Image Formation",
    "L3",
    "Connect optical, radar, sonar and other remote observations to the propagation physics and instrument response that give pixels and echoes physical meaning.",
    ["ARC720", "SIDE276", "ARC734"],
    "Image formation and point-spread functions; radiometry versus geometry; spatial/spectral/temporal resolution; optical, thermal, radar/SAR, lidar and sonar sensing; propagation, scattering and attenuation effects; calibration and registration; noise and artifacts; segmentation/detection tasks; multispectral data; remote-sensing products; validating image-derived measurements against ground truth.",
  ),
  createT23Node(
    723,
    "Scientific Data Quality, Missingness & Bias",
    "L3",
    "Detect the mundane defects, selection mechanisms and processing choices that can manufacture scientific conclusions from bad data.",
    ["ARC720", "ARC503", "ARC508"],
    "Missing completely at random versus informative missingness; censoring; sensor outages; stale values; duplicates; impossible values; outliers; batch effects; selection and survivorship bias; sampling-frame errors; imputation trade-offs; QC flags; anomaly review; leakage; revisions; audit trails; sensitivity analyses for cleaning decisions.",
  ),
  createT23Node(
    724,
    "Research Software Engineering & Reproducible Workflows",
    "L3",
    "Build scientific code that other people can rerun, test, inspect and extend instead of leaving a pile of irreproducible notebooks.",
    ["ARC515", "ARC713", "ARC720"],
    "Project structure; environments and dependency locking; packages and APIs; unit/integration/property tests; deterministic seeds; Git workflows; code review; command-line pipelines; workflow engines; containers; CI; configuration; logging; checkpoints; documentation; reproducible compute manifests; notebooks as interfaces rather than hidden state machines.",
  ),
  createT23Node(
    725,
    "Real-Time Data Acquisition, Sampling & Telemetry",
    "L3",
    "Capture high-rate physical measurements without silently losing timing, samples or causal ordering under real compute, bandwidth and power constraints.",
    ["ARC718", "ARC078", "ARC515"],
    "Sensor transfer functions; sampling rate and aliasing; Nyquist intuition; ADC/DAC concepts; quantization and dynamic range; anti-alias filtering; trigger/event acquisition; interrupts/ISRs and DMA intuition; ring buffers and producer-consumer concurrency; deterministic timing; buffering, backpressure and overflow; dropped-sample and packet-sequence detection; channel synchronization and timestamping; telemetry links; power/bandwidth budgets; acquisition logs and health channels.",
  ),
  createT23Node(
    726,
    "Instrumentation, Embedded Systems & Scientific Timing",
    "L3",
    "Understand enough hardware and embedded computation to debug the boundary between instruments, clocks, communications and scientific software.",
    ["ARC725", "ARC713"],
    "Microcontrollers versus single-board computers; serial/I2C/SPI/CAN-style interfaces; drivers; interrupts and real-time constraints; timestamping; clock drift and synchronization; GPS/PPS intuition; storage and buffering; watchdogs; power systems; environmental housings; fault logging; field-updatable firmware; interface contracts between instrument and analysis teams.",
  ),
  createT23Node(
    727,
    "Inverse Problems & Data Assimilation",
    "L4",
    "Infer hidden states and causes from indirect noisy observations while making non-uniqueness and prior assumptions explicit.",
    ["ARC543", "ARC585", "ARC514", "ARC719"],
    "Forward versus inverse models; identifiability and ill-posedness; regularization; Bayesian inverse problems; observation operators; priors and likelihoods; variational assimilation; sequential/Kalman-style assimilation; ensemble intuition; uncertainty propagation; diagnosing when observations cannot support the claimed reconstruction.",
  ),
  createT23Node(
    728,
    "Robotics, Localization & Autonomous Field Systems",
    "L4",
    "Integrate physical dynamics, sensing, estimation, control and planning into autonomous systems capable of collecting useful science in difficult environments.",
    ["ARC726", "ARC592", "ARC600", "ARC733"],
    "Reference frames and robot kinematics/dynamics; localization; GPS/IMU/vision/sonar sensor fusion; SLAM intuition; mapping; path planning; feedback and state estimation; autonomy levels; remote operation; communications loss; energy-aware missions; fail-safe and return-home logic; simulation, hardware-in-the-loop testing and scientific payload integration.",
  ),
  createT23Node(
    729,
    "Field Research Operations, Safety & Mission Reliability",
    "L4",
    "Plan research that still produces trustworthy science when weather, hardware, logistics and humans fail far from the laboratory.",
    ["ARC718", "ARC724", "ARC725"],
    "Mission objectives and success criteria; hazards and risk registers; redundancy; spares and repairability; pre-deployment calibration; checklists; communications plans; sample/data chain of custody; field notebooks; environmental and ethical constraints; human factors and fatigue; contingency branches; graceful degradation; post-mission data verification and incident learning.",
  ),
  createT23Node(
    730,
    "Scientific Visualization, Writing & Proposal Communication",
    "L3",
    "Make complex evidence legible enough that collaborators, reviewers, funders and students can understand what was measured, inferred and still remains uncertain.",
    ["ARC509", "ARC570", "ARC723"],
    "Information-dense scientific figures; uncertainty visualization; honest axes and scales; tables and diagrams; methods/results structure; abstracts and research memos; posters and talks; explaining models to domain experts; teaching juniors; grant/proposal logic; aims, significance, feasibility, milestones and failure modes; communicating negative results.",
  ),
  createT23Node(
    731,
    "Research Leadership, Value of Information & Experiment Sequencing",
    "L4",
    "Move from solving assigned analyses to deciding what the team should measure, test or stop doing next.",
    ["ARC507", "ARC509", "ARC570", "ARC729"],
    "Question selection; decision relevance; expected value of information; experiment sequencing; cheap discriminating tests; stopping rules; uncertainty triage; assumption audits; failure premortems; allocating scarce instrument/compute/field time; resolving model-versus-data disputes; collaboration norms; mentoring; documenting decisions so judgment is inspectable.",
  ),
  createT23Node(
    732,
    "Domain Apprenticeship & Team-Science Capstone",
    "L4",
    "Prove that the universal method spine can survive contact with one real scientific domain and a real team rather than remaining generic technical literacy.",
    ["ARC727", "ARC728", "ARC730", "ARC731"],
    "Choose one deep scientific home such as Earth/ocean/polar science, astronomy, biology, chemistry, medicine, robotics, materials or another rigorous field; study its domain foundations; work with a domain expert or research group; reproduce prior work; own a measurement-to-inference component; produce a versioned data/code package and uncertainty analysis; present/defend the result; document what required domain knowledge that T23 alone could not supply.",
  ),
  createT23Node(
    733,
    "Kinematics & Rigid-Body Dynamics",
    "L3",
    "Model translation, rotation, inertia and forces well enough to derive the physical state equations that estimators, controllers and autonomous systems depend on.",
    ["ARC511", "ARC512"],
    "Reference frames; position, orientation, velocity and acceleration; rotation matrices and quaternion intuition; Newton-Euler equations; mass and inertia tensors; forces and torques; angular momentum; work and energy; constraints; linearization and state-space models; parameter identification; simplified vehicle/robot dynamics; recognizing when rigid-body assumptions fail.",
  ),
  createT23Node(
    734,
    "Waves, Electromagnetism & Propagation for Sensing",
    "L3",
    "Ground radar, sonar, lidar, imaging and telemetry in the physical laws of wave propagation instead of treating sensor outputs as abstract arrays.",
    ["ARC512", "SIDE271"],
    "Wave-equation intuition; superposition; phase and group velocity; reflection and refraction; diffraction and interference; attenuation, dispersion and scattering; impedance; acoustic propagation and sonar; electromagnetic field/wave intuition; polarization and antennas; radar/lidar range and link-budget intuition; propagation media and environmental effects; physical limits on sensing resolution.",
  ),
];

// T23 is a methodological scientist gate, not an encyclopedia of every science.
// The Chrono spine and one chosen domain home continue in parallel; terminal
// readiness is judged by transferable measurement-to-inference competence plus
// a defended collaboration in a real scientific domain.
export const T23_ORDER = [
  // Phase 1 — reality, measurement & physical/mathematical modelling.
  "SIDE478",
  "ARC501",
  "SIDE474",
  "SIDE476",
  "ARC718",
  "ARC719",
  "ARC053",
  "ARC510",
  "ARC511",
  "SIDE276",
  "SIDE278",
  "SIDE279",
  "SIDE280",
  "SIDE271",
  "ARC711",
  "ARC512",
  "ARC733",
  "ARC734",
  "ARC514",

  // Phase 2 — probability, inference & experimental science.
  "ARC048",
  "ARC502",
  "ARC503",
  "ARC517",
  "ARC504",
  "ARC712",
  "ARC539",
  "ARC531",
  "ARC505",
  "ARC537",
  "ARC541",
  "ARC506",
  "ARC507",
  "ARC545",
  "ARC508",
  "ARC570",

  // Phase 3 — scientific computing & data systems.
  "ARC515",
  "ARC513",
  "ARC585",
  "ARC587",
  "ARC586",
  "ARC713",
  "ARC716",
  "ARC720",
  "ARC721",
  "ARC722",
  "ARC723",
  "ARC724",

  // Phase 4 — signals, time, inverse problems & deployable learning.
  "ARC078",
  "SIDE464",
  "ARC542",
  "ARC543",
  "ARC727",
  "ARC593",
  "ARC594",
  "ARC595",
  "ARC599",
  "ARC600",

  // Phase 5 — real-time instrumentation, autonomy & field reliability.
  "ARC725",
  "ARC726",
  "ARC592",
  "ARC728",
  "ARC729",

  // Phase 6 — reproducibility, communication, leadership & domain proof.
  "ARC509",
  "ARC730",
  "ARC731",
  "ARC732",
];

export const T23_PREREQS = {
  SIDE478: [],
  ARC501: ["SIDE478"],
  SIDE474: [],
  SIDE476: ["SIDE474"],
  ARC718: ["SIDE478", "SIDE474", "SIDE476"],
  ARC719: ["ARC718", "SIDE476"],
  ARC053: [],
  ARC510: ["ARC053"],
  ARC511: [],
  SIDE276: ["ARC511"],
  SIDE278: ["SIDE276"],
  SIDE279: ["SIDE276"],
  SIDE280: ["SIDE278", "SIDE279"],
  SIDE271: ["ARC510", "SIDE276"],
  ARC711: ["SIDE271", "SIDE276"],
  ARC512: ["ARC510", "SIDE276"],
  ARC733: ["ARC511", "ARC512"],
  ARC734: ["ARC512", "SIDE271"],
  ARC514: ["SIDE271", "SIDE276"],

  ARC048: [],
  ARC502: ["ARC048"],
  ARC503: ["ARC048"],
  ARC517: ["ARC048", "ARC503"],
  ARC504: ["ARC503", "ARC517", "ARC719"],
  ARC712: ["ARC517", "ARC504"],
  ARC539: ["ARC504", "SIDE278", "ARC517"],
  ARC531: ["ARC504", "ARC517"],
  ARC505: ["ARC504", "ARC712"],
  ARC537: ["ARC531"],
  ARC541: ["SIDE280", "ARC539"],
  ARC506: ["ARC503", "ARC539"],
  ARC507: ["ARC505", "ARC506", "ARC718"],
  ARC545: ["ARC507", "ARC539", "ARC506"],
  ARC508: ["ARC507", "ARC539", "ARC531"],
  ARC570: ["ARC505", "ARC507", "ARC508"],

  ARC515: ["ARC053"],
  ARC513: ["ARC517", "ARC515"],
  ARC585: ["SIDE280", "ARC515"],
  ARC587: ["ARC512", "ARC585", "ARC515"],
  ARC586: ["ARC514", "ARC585", "ARC711", "ARC515"],
  ARC713: ["ARC515", "ARC585"],
  ARC716: ["ARC515", "ARC713"],
  ARC720: ["ARC515", "ARC716", "ARC718"],
  ARC721: ["ARC720", "SIDE271"],
  ARC722: ["ARC720", "SIDE276", "ARC734"],
  ARC723: ["ARC720", "ARC503", "ARC508"],
  ARC724: ["ARC515", "ARC713", "ARC720"],

  ARC078: ["ARC053"],
  SIDE464: ["ARC078", "ARC515"],
  ARC542: ["ARC539", "ARC053"],
  ARC543: ["ARC542", "SIDE276"],
  ARC727: ["ARC543", "ARC585", "ARC514", "ARC719"],
  ARC593: ["ARC508", "ARC531", "ARC539"],
  ARC594: ["ARC593", "ARC514"],
  ARC595: ["ARC593"],
  ARC599: ["ARC593", "ARC586", "ARC711"],
  ARC600: ["ARC599", "ARC722"],

  ARC725: ["ARC718", "ARC078", "ARC515"],
  ARC726: ["ARC725", "ARC713"],
  ARC592: ["ARC078", "ARC543", "ARC514", "ARC733"],
  ARC728: ["ARC726", "ARC592", "ARC600", "ARC733"],
  ARC729: ["ARC718", "ARC724", "ARC725"],

  ARC509: ["ARC508", "ARC515", "ARC720"],
  ARC730: ["ARC509", "ARC570", "ARC723"],
  ARC731: ["ARC507", "ARC509", "ARC570", "ARC729"],
  ARC732: ["ARC727", "ARC728", "ARC730", "ARC731"],
};

export const T23_REQUIRED = [...T23_ORDER];

export const T23_DEFERRED_BRANCHES = {
  domainHomes: [
    "Physics",
    "Chemistry",
    "Biology & Medicine",
    "Earth, Ocean & Polar Science",
    "Astronomy & Space Science",
    "Materials Science",
    "Robotics & Autonomous Systems",
  ],
  advancedMathematicalDepth: ["ARC516", "ARC518", "ARC520", "ARC521", "ARC522", "ARC523"],
  deepMachineLearning: ["ARC596", "ARC597", "ARC598", "ARC601", "ARC602", "ARC603", "ARC604"],
  deepSystemsAndHpc: ["ARC168", "ARC208", "ARC216", "SIDE437", "SIDE441", "SIDE445", "SIDE460"],
};

export const T23_TERMINAL = {
  name: "Universal Computational & Field Scientist",
  field: "General Science / Scientific Computing",
  umbrella: "Cross-Disciplinary Science",
  summary:
    "A 66-node measurement-to-inference strike path for becoming unusually useful across scientific teams: scientific judgment, metrology and uncertainty, mathematical and physical modelling, probability/statistics, scientific programming and provenance, numerical computing, waves/signals/time/space, deployable machine learning, real-time instrumentation, autonomous field systems, reproducibility, communication and research leadership. T23 is a transferable-method spine, not a substitute for domain expertise.",
  exit:
    "Defend four artifacts: (1) a complete measurement-chain audit from phenomenon and instrument calibration through an uncertainty budget; (2) a raw multimodal scientific-data reconstruction with provenance, QC and spatiotemporal alignment; (3) a reproducible mechanistic/statistical/ML study with baselines, uncertainty, out-of-sample validation and computational profiling; and (4) a real team-science capstone in one chosen domain home, including a field/mission or acquisition plan, versioned data/code package, research memo/proposal and oral defense with a domain expert. T23 is not complete until the domain expert can identify a component you genuinely owned.",
  id: T23_ID,
  required: [...T23_REQUIRED],
  order: [...T23_ORDER],
  count: T23_REQUIRED.length,
  gateways: ["MathStats", "CS", "Physics"],
  stageNames: [
    "Reality, measurement & physical/mathematical modelling",
    "Probability, inference & experimental science",
    "Scientific computing & data systems",
    "Signals, time, inverse problems & deployable learning",
    "Real-time instrumentation, autonomy & field reliability",
    "Reproducibility, communication, leadership & domain proof",
  ],
  admissionAssumptions:
    "Basic arithmetic, algebra, functions and willingness to program are entry assumptions. The historical Chrono spine remains available to teach and deepen foundations, but it does not block T23 methodological progress.",
  routePolicy:
    "T23 uses terminal-specific prerequisites to preserve a finite, topological universal-method path. Limits and local Taylor approximation are compressed into the T23 calculus presentation rather than gated as separate arcs. It deliberately stops short of pretending that methods alone create a universal subject-matter expert: one serious domain home and collaboration are mandatory at the capstone, while deeper mathematics, domain science, ML and systems branches remain selectable according to the team and mission.",
  operatingModel:
    "Own the inference chain: phenomenon → question → measurement → calibration → raw data → quality control → model → uncertainty → conclusion → next experiment. The target role is the computational/quantitative scientist who can move upstream toward measurement and instrument design, model enough physical reality to understand the sensor, and move downstream toward defensible inference and the next experiment.",
};

const T23_PHASES = [
  T23_ORDER.slice(0, 19),
  T23_ORDER.slice(19, 35),
  T23_ORDER.slice(35, 47),
  T23_ORDER.slice(47, 57),
  T23_ORDER.slice(57, 62),
  T23_ORDER.slice(62),
];

const T23_PRESENTATION_OVERRIDES = {
  ARC053: {
    title: "Calculus, Limits & Local Approximation",
    scope:
      "Derivatives and rates of change; limits and convergence intuition needed for continuous models; local linearization; first- and higher-order Taylor approximation; approximation error intuition; using calculus as the local language of measurement, dynamics, optimization and uncertainty propagation.",
  },
  ARC711: {
    title: "Matrix Calculus for Scientific Models",
    scope:
      "Matrix differentials; gradients, Jacobians and Hessians; quadratic forms; trace identities; derivatives used in inverse problems, likelihoods, optimization, dynamical models and machine learning.",
  },
  ARC712: {
    title: "LLN, CLT & Concentration for Empirical Science",
    scope:
      "Working laws of large numbers and central limit ideas; standard errors and normal approximation; concentration intuition; effective sample size; dependence and heavy-tail caveats; knowing when asymptotics are not trustworthy.",
  },
  ARC713: {
    title: "Performance-Aware Scientific Computing & HPC Foundations",
    scope:
      "Time and memory complexity; data locality; allocation and copies; vectorization; profiling; batching; sparse/streaming computation; multicore and GPU/HPC decision boundaries; scaling experiments only after correctness and measurement.",
  },
  ARC716: {
    title: "Efficient Scientific Data Querying",
    scope:
      "SQL and relational thinking; filtering/projection; joins and temporal joins; grouping/window operations; columnar formats; partitioning; predicate pushdown; lazy/out-of-core workflows; querying large scientific archives without copying the world into RAM.",
  },
  ARC599: {
    title: "Neural Networks, Compression & Edge Inference",
    scope:
      "Minimal neural-network and backpropagation fundamentals needed to understand training; deployment versus training; quantization, pruning and distillation; operator and accelerator constraints; memory, latency, energy and thermal budgets; batch-one inference; representative calibration data; profiling on target hardware; distribution shift; fail-safe/fallback behavior; recognizing when a classical model is the better field choice.",
  },
  ARC509: {
    title: "Research Reproducibility, Provenance & Open Science",
    scope:
      "Research logs; provenance from raw observations to figures; versioned assumptions and transformations; reproducible pipelines; replication; data/code release decisions; negative results; open-science practices; communicating uncertainty and failure without cosmetic certainty.",
  },
};

function addTerminalTag(node, terminalId) {
  const tags = Array.isArray(node.terminalTags) ? node.terminalTags : [];
  if (!tags.includes(terminalId)) {
    tags.push(terminalId);
    node.terminalTags = tags;
    node.requiredByCount = Number(node.requiredByCount || 0) + 1;
  }
}

function addT23Nodes(world) {
  const existing = new Set((world.nodes || []).map((node) => node.id));
  for (const node of T23_NEW_NODES) {
    if (existing.has(node.id)) throw new Error(`T23 cannot add duplicate node ${node.id}.`);
    world.nodes.push({ ...node, masteryPrereqs: [...node.masteryPrereqs], terminalTags: [...node.terminalTags] });
    existing.add(node.id);
  }
}

function validateT23Order(world) {
  if (new Set(T23_ORDER).size !== T23_ORDER.length) throw new Error("T23 order contains duplicate node IDs.");
  if (T23_ORDER.length !== 66) throw new Error(`T23 strike path must contain exactly 66 nodes; found ${T23_ORDER.length}.`);

  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));
  const position = new Map(T23_ORDER.map((id, index) => [id, index]));

  for (const id of T23_ORDER) {
    if (!byId.has(id)) throw new Error(`T23 requires missing node ${id}.`);
    const prereqs = T23_PREREQS[id];
    if (!Array.isArray(prereqs)) throw new Error(`T23 is missing terminal-specific prerequisites for ${id}.`);
    for (const prereq of prereqs) {
      if (!position.has(prereq)) throw new Error(`T23 prerequisite ${prereq} for ${id} is outside the 66-node strike path.`);
      if (position.get(prereq) >= position.get(id)) {
        throw new Error(`T23 order is not topological: ${id} appears before prerequisite ${prereq}.`);
      }
    }
  }
}

function attachT23Metadata(world) {
  const byId = new Map((world.nodes || []).map((node) => [node.id, node]));

  T23_PHASES.forEach((ids, stageIndex) => {
    for (const id of ids) {
      const node = byId.get(id);
      addTerminalTag(node, T23_ID);
      node.terminalMasteryPrereqs = { ...(node.terminalMasteryPrereqs || {}), [T23_ID]: [...T23_PREREQS[id]] };
      node.terminalStages = { ...(node.terminalStages || {}), [T23_ID]: stageIndex };
    }
  });

  for (const [id, override] of Object.entries(T23_PRESENTATION_OVERRIDES)) {
    const node = byId.get(id);
    node.terminalTitles = { ...(node.terminalTitles || {}), [T23_ID]: override.title };
    node.terminalMasteryScope = { ...(node.terminalMasteryScope || {}), [T23_ID]: override.scope };
  }
}

export function applyT23UniversalScientist(world = WORLD) {
  if (world.terminals?.some((terminal) => terminal.id === T23_ID)) return world;

  if ((world.nodes || []).length !== 717 || (world.terminals || []).length !== 22) {
    throw new Error(
      `T23 expects the post-T22 717-node / 22-terminal registry; found ${world.nodes?.length || 0} nodes and ${world.terminals?.length || 0} terminals.`,
    );
  }

  if (!world.terminals.some((terminal) => terminal.id === "T22")) {
    throw new Error("T23 expects T22 to be loaded first so shared generic strike-path nodes ARC711–ARC713 and ARC716 exist.");
  }

  addT23Nodes(world);
  validateT23Order(world);
  attachT23Metadata(world);

  world.version = "1.5";
  world.title = "Chrono-Deck Scientific Mastery World v1.5";
  world.worldCount = world.nodes.length;
  world.newCount = Number(world.newCount || 0) + T23_NEW_NODES.length;
  world.terminals.push({
    ...T23_TERMINAL,
    required: [...T23_TERMINAL.required],
    order: [...T23_TERMINAL.order],
    gateways: [...T23_TERMINAL.gateways],
    stageNames: [...T23_TERMINAL.stageNames],
  });

  world.coreFrozenLabel =
    "39-node scientific core for T01–T20; T22 and T23 run separate finite strike paths for quantitative research and universal scientific method";
  world.corePolicy =
    "The 39-node scientific core remains frozen for T01–T20. T21 is a separate law and jurisprudence route. T22 is a 58-node quantitative-research hiring gate. T23 is a 66-node universal computational-and-field-science method gate that owns the measurement-to-inference chain, now explicitly anchored in rigid-body dynamics, wave propagation, real-time acquisition and edge inference, while requiring one real domain apprenticeship rather than pretending transferable methods replace subject expertise.";

  return world;
}

applyT23UniversalScientist();