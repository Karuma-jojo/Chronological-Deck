import "./data/law-expansion.js";
import { WORLD } from "./data/world.js";

// Previous cache-key markers retained for CI/history:
// t22-atomic-arcs.js?v=1.7.0
// t22-atomic-ui.js?v=1.7.0
// t22-atomic-arcs.js?v=1.7.1
// t22-atomic-ui.js?v=1.7.1
// t25-atomic-ui.js?v=1.8.1
// t25-atomic-ui.js?v=1.8.2
// t25-atomic-ui.js?v=1.8.3
// t25-atomic-ui.js?v=1.8.4
// t25-review-ui.js?v=1.8.1

try {
  await import("./data/t22-quant-research.js?v=1.7.1");
} catch (error) {
  console.error("T22 quantitative-research overlay failed to load; continuing without T22.", error);
}

try {
  await import("./data/t23-universal-scientist.js?v=1.7.1");
} catch (error) {
  console.error("T23 universal-scientist overlay failed to load; continuing without T23.", error);
}

try {
  await import("./data/t22-atomic-arcs.js");
} catch (error) {
  console.error("T22 atomic-arc overlay failed to load; continuing with the 58-module macro route.", error);
}

try {
  await import("./data/t25-entrance-prep.js");
} catch (error) {
  console.error("T25 entrance overlay failed to load; existing routes remain available.", error);
}

try {
  const terminalKey = "chrono_mastery_world_v1_terminal";
  const persistedTerminal = localStorage.getItem(terminalKey);
  if (persistedTerminal && !WORLD.terminals.some((terminal) => terminal.id === persistedTerminal)) localStorage.removeItem(terminalKey);
} catch (error) {
  console.warn("Could not validate persisted terminal selection; continuing with app defaults.", error);
}

await import("./app.js?v=1.8.1");
try {
  await import("./t22-atomic-ui.js?v=1.7.2");
} catch (error) {
  console.error("T22 atomic progress UI failed to load; core route progress remains available.", error);
}
try {
  await import("./t25-ui.js");
} catch (error) {
  console.error("T25 entrance UI failed to load; route progress remains available.", error);
}
try {
  await import("./t25-atomic-ui-v4.js?v=2.0.0");
} catch (error) {
  console.error("T25 audited atomic-session UI failed to load; parent-unit study remains available.", error);
}
try {
  await import("./t25-review-ui.js?v=1.8.2");
} catch (error) {
  console.error("T25 review layer unavailable; ordinary atomic study remains available.", error);
}
await import("./vault.js?v=1.7.1");
try {
  await import("./cloud-archive-ui.js?v=1.0.0");
} catch (error) {
  console.error("Cloud ARC Archive presentation unavailable; the ARC Library remains usable.", error);
}
