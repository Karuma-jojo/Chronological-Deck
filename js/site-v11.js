import "./data/law-expansion.js";

try {
  await import("./data/t22-quant-research.js");
} catch (error) {
  console.error("T22 quantitative-research overlay failed to load; continuing without T22.", error);
}

await import("./app.js");
await import("./vault.js");
