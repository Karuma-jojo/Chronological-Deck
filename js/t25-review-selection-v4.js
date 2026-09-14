// T25 audited-v4 selection bridge for the review layer.
//
// The v4 atomic map owns learner navigation; #t25AtomicSelect remains a hidden
// compatibility control. Review state must follow the learner-facing selection
// even if a cosmetic map/detail redraw is interrupted after authoritative state
// has already changed. Duplicate notifications are harmless because the review
// layer ignores an unchanged logical ARC id.

const layer = document.getElementById("t25AtomicLayer");
if (!layer) throw new Error("T25 v4 review-selection bridge requires the atomic layer.");

function dispatchCurrentAtomicSelection() {
  const legacy = document.getElementById("t25AtomicSelect");
  const id = legacy?.value || "";
  if (!id) return;
  const routeOrder = Number(layer.dataset.selectedOrder);
  document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected", {
    detail: {
      id,
      parentId: layer.dataset.selectedParentId || document.getElementById("t25Unit")?.value || null,
      routeOrder: Number.isInteger(routeOrder) ? routeOrder : null,
    },
  }));
}

function scheduleSelectionSync() {
  queueMicrotask(dispatchCurrentAtomicSelection);
}

// The visible audited-session selector and the hidden compatibility selector.
document.addEventListener("change", event => {
  if (["t25AtomicRouteSelect", "t25AtomicSelect"].includes(event.target?.id)) scheduleSelectionSync();
});

// Map nodes plus previous/next controls all change the same authoritative state.
document.addEventListener("click", event => {
  if (event.target?.closest?.(".t25-v4-node, #t25AtomicPrev, #t25AtomicNext")) scheduleSelectionSync();
});

document.addEventListener("keydown", event => {
  if (!["Enter", " "].includes(event.key)) return;
  if (event.target?.closest?.(".t25-v4-node")) scheduleSelectionSync();
});
