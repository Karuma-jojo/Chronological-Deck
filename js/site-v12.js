import "./data/law-expansion.js";
import { WORLD } from "./data/world.js";

try {
  await import("./data/t22-quant-research.js?v=1.5.0");
} catch (error) {
  console.error("T22 quantitative-research overlay failed to load; continuing without T22.", error);
}

try {
  await import("./data/t23-universal-scientist.js?v=1.5.0");
} catch (error) {
  console.error("T23 universal-scientist overlay failed to load; continuing without T23.", error);
}

// Recover from a persisted terminal selection that is unavailable in the
// currently loaded registry (for example, T22/T23 saved during a stale
// mixed-cache session). app.js assumes the persisted terminal exists, so clear
// only this invalid selector value and preserve all progress data.
try {
  const terminalKey = "chrono_mastery_world_v1_terminal";
  const persistedTerminal = localStorage.getItem(terminalKey);
  if (persistedTerminal && !WORLD.terminals.some((terminal) => terminal.id === persistedTerminal)) {
    localStorage.removeItem(terminalKey);
  }
} catch (error) {
  console.warn("Could not validate persisted terminal selection; continuing with app defaults.", error);
}

await import("./app.js?v=1.5.0");
await import("./vault.js?v=1.5.0");
