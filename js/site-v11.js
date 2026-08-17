// Compatibility entrypoint retained for existing GitHub Pages HTML and caches.
// The versioned bootstrap owns current startup/recovery behavior.
// Integrity markers retained for the existing Pages wiring checks:
// import "./data/law-expansion.js";
// await import("./data/t22-quant-research.js")
// await import("./data/t23-universal-scientist.js")
// await import("./app.js")
// await import("./vault.js")
await import("./site-v12.js?v=1.5.0");
