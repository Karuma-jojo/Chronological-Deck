# T22 Elite M65 — dependency and semantic-gate record

Status: **65-module macro ownership/order frozen; explicit graph topologically valid; semantic ancestry is checked module-by-module before publication.**

Current graph: `m65.dependencies.json` version `M65-semantic-r1-2026-09-18`.  
Semantic ledger: `SEMANTIC-PREREQUISITES.json`.  
Current recovery authority: `RUN-LOG.md`.

## What is frozen

- The 65 macro capability families and their pedagogical order are the working architecture.
- A new M66 requires written evidence that no current module can own the capability without corrupting its exit standard.
- Stable IDs, not presentation positions, own evidence identity.

## What is deliberately *not* frozen

The prerequisite edge list is corrigible when semantic inspection of real authored content reveals a missing prerequisite. A topological graph is not proof that inherited rich-module material is teachable under those edges. Before a module becomes learner-facing, its actual lessons/tasks must be traced to earlier accepted instruction or a bounded internal bridge, and its semantic-ledger row must be marked `accepted`.

## Current graph validation

- 65 unique macro IDs.
- Every declared prerequisite resolves to a module in the graph.
- Every declared prerequisite occurs earlier than its consumer.
- M01 has no hidden macro prerequisite and has passed the first semantic/pedagogical repair gate.
- Only modules marked `accepted` in the semantic ledger may be marked `authored` in the learner roadmap.

## Astra A-06 edge repairs

The first semantic pass added these previously implicit edges:

1. **M07 `T22E-MKT01` ← M02 `T22E-FND02`** because M07 explicitly owns log returns and therefore needs logarithms.
2. **M26 `ARC517` ← M18 `SIDE271`** to provide multivariable coordinate context before joint continuous laws; bounded bridge `M26-B01` still teaches iterated integration/support geometry explicitly.
3. **M33 `ARC531` ← M21 `T22E-CODE02`** because its retained numerical-MLE work needs basic solver execution/diagnostics; bridge `M33-B01` teaches only objective/domain/convergence/status interpretation, leaving advanced numerical optimization to M57.
4. **M42 `ARC542` ← M02 `T22E-FND02`** to make polynomial/precalculus ancestry executable; bridge `M42-B01` owns the minimal complex-root/modulus machinery used by AR stability.

## Named adaptation / bridge owners

- **M09 / SIDE263 — `M09-B01`:** the old entry contract that assumed ARC053 cannot be copied. M09 is adapted to teach sequence/function limits without derivatives; ARC053 remains downstream at M10.
- **M26 / ARC517 — `M26-B01`:** planar support, iterated integrals and normalization before joint continuous-density tasks.
- **M33 / ARC531 — `M33-B01`:** basic numerical MLE solver interpretation/checking, not Newton/quasi-Newton/autodiff theory.
- **M42 / ARC542 — `M42-B01`:** minimal complex numbers, conjugate roots, modulus and unit-circle stability criterion if the retained polynomial-root task remains.

These bridge declarations are design obligations, not claims that the future module has already been authored or passed.

## Continuing acceptance rule

At each module boundary:

1. inspect the real reused/new content, not only its title;
2. classify the module `new`, `reused` or `adapted`;
3. trace every actual prerequisite to an earlier accepted owner or declare a bounded internal bridge;
4. add any missing executable graph edge;
5. run the 65-node topological validator;
6. update the semantic ledger to `accepted` only after the module's teaching/tasks/coverage checks pass;
7. only then expose the module as `authored` in the learner roadmap.

This supersedes the earlier wording that described the first topological pass as a complete dependency freeze. Macro ownership/order remains frozen; semantic ancestry remains intentionally reviewable.
