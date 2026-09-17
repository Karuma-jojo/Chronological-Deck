import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
// Review-layer guardrails. T25 atomic curriculum files are intentionally excluded:
// the audited v4 curriculum is a live hand-authored registry that must be allowed to
// grow in progressive batches without requiring a review-layer checksum rewrite.
// Stable study/runtime, T22 and archive authority boundaries remain pinned here.
// Compiler pin updated for the explicitly requested V1.2 course/anime addition.
// The test below separately preserves the complete V1.0 compiler body.
const hashes = {
  "js/t25-study.js": "b3e81f6c8fd19699cf20669a1a0ca197c0878b10702eff1a41f00ce4de79f5fe",
  "js/data/t22-atomic-arcs.js": "0eca29f54f2e60d370e1245c7d28bd98a04308bd6658ecf35804b07c478e16d1",
  "js/t22-atomic-ui.js": "4c09e3ba35ce13f2b593469c82d2b2de3b97e2ed55317146458370289ef742ba",
  "obsidian-plugin/archive-contract-v3.js": "d80a2a6dfbb5b0b32662758a7344eb1cbc1f81e21a30d39524cb27d221f7305b",
  "supabase/arc-logical-authority-v1.sql": "cf8161a6658ddb79c93f95a0b0249a692f028d8af63d2d857c977a77e32b9e42",
  "supabase/arc-logical-delete-v1.sql": "010574bfee6f2e490f75e02af7f399bffd6888d293ff8680e736dca7d6d1cbfe",
  "prompts/λ-ARC-Extractor-T25-CANONICAL.md": "7814f73845dcaa444b9e1ceb0775120a7184b3fec8b4793baa1ff0e1cd6c3479",
  "prompts/λ-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md": "63f9f6263abfb6d48f03d2dc6a06ec6f00485755b0835347f550f8357d06217d"
};
test('review addition leaves stable study contracts, T22 and archive authority unchanged',()=>{
 for(const [path,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'),hash,path);
});

test('course/anime compiler extension preserves the original V1.0 compiler body',()=>{
 const current=readFileSync("prompts/λ-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md","utf8");
 const start=current.indexOf("## 41. OPTIONAL COURSE BANK AND ANIME PRESENTATION");
 const end=current.indexOf("# T25 ATOMIC INVESTIGATION CARD",start);
 assert(start>0&&end>start);
 const original=(current.slice(0,start)+current.slice(end)).replace("CANONICAL V1.2 — Course Bank + Anime Presentation","CANONICAL V1.0");
 assert.equal(createHash('sha256').update(original).digest('hex'),'3c711a7793ac4319c0273bfd5ec1a477c67650555b2c66ebea58a87e6dff5a0a');
});
