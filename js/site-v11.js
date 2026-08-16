import "./data/law-expansion.js";

try {
  await import("./data/t22-quant-research.js");
} catch (error) {
  console.error("T22 overlay failed to load; continuing with the base Chrono-Deck UI.", error);
}

await import("./app.js");
await import("./vault.js");
