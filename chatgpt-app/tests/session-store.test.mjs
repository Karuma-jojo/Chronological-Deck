import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const testDataDirectory = await mkdtemp(path.join(os.tmpdir(), "chrono-deck-test-"));
process.env.CHRONO_DATA_DIR = testDataDirectory;

const { T22_CATALOG, getLaunchSlice } = await import("../lib/catalog.js");
const {
  createSession,
  getSession,
  registerExports,
  saveCheckpoint,
  setControl,
} = await import("../lib/session-store.js");
const { writeDualExtract } = await import("../lib/dual-extract.js");

test("launch slice is three validated arcs over the full T22 catalog", () => {
  const slice = getLaunchSlice();
  assert.equal(T22_CATALOG.moduleCount, 58);
  assert.equal(T22_CATALOG.atomicCount, 596);
  assert.equal(slice.module.id, "ARC053");
  assert.deepEqual(slice.module.arcs.map((arc) => arc.id), [
    "T22-M01-A01",
    "T22-M01-A02",
    "T22-M01-A03",
  ]);
});

test("session creation, V11.3 control semantics, and checkpoint resume", async () => {
  const session = await createSession({ arcId: "T22-M01-A01", difficulty: "Rigorous" });
  assert.match(session.resumeCode, /^CD-[0-9A-F]{6}-[0-9A-F]{6}$/);
  assert.equal(session.controlState, "WALL");
  assert.equal(session.phase, "BOOT");

  const hint = await setControl({ resumeCode: session.resumeCode, control: "HINT" });
  assert.equal(hint.controlState, "WALL");
  assert.equal(hint.pendingControl, "HINT");

  const guided = await setControl({ resumeCode: session.resumeCode, control: "GUIDE" });
  assert.equal(guided.controlState, "GUIDE");
  assert.equal(guided.recoveryGateOwed, true);

  const walled = await setControl({ resumeCode: session.resumeCode, control: "WALL" });
  assert.equal(walled.controlState, "WALL");
  assert.equal(walled.recoveryGateOwed, true);

  await saveCheckpoint({
    resumeCode: session.resumeCode,
    checkpoint: "The encounter is open; no decisive bridge has been accepted.",
    phase: "INVESTIGATION",
    clearance: "Incomplete",
    visibleState: "A chamber with the player's apparatus in its last visible configuration.",
    acceptedClaims: ["One submitted measurement has passed clerical verification."],
    provisionalClaims: ["A proposed universal claim remains unsupported."],
    unresolvedGate: "The central bridge has not been established.",
    proofDebt: ["The universal quantifier remains unpaid."],
    assistanceSummary: "[GUIDE] was used; a Recovery Gate is owed.",
  });
  const resumed = await getSession(session.resumeCode.toLowerCase());
  assert.equal(resumed.phase, "INVESTIGATION");
  assert.match(resumed.checkpoint, /no decisive bridge/i);
  assert.equal(resumed.recoveryGateOwed, true);
  assert.equal(resumed.ledgerSnapshot.acceptedClaims.length, 1);
  assert.match(resumed.ledgerSnapshot.unresolvedGate, /central bridge/i);
  assert.equal(resumed.ledgerSnapshot.proofDebt.length, 1);
});

test("cataloged but unvalidated arcs cannot be launched", async () => {
  await assert.rejects(
    () => createSession({ arcId: "T22-M01-A04" }),
    /not enabled in this launch slice/i,
  );
});

test("Dual Extract writes two independent Markdown files and records them", async () => {
  const session = await createSession({ arcId: "T22-M01-A02" });
  const exports = await writeDualExtract({
    session,
    publicBaseUrl: "https://chrono.example",
    rawMarkdown: "# Raw Dump\n\nThis is an independently assembled forensic record of the visible session evidence.",
    polishedMarkdown: "# Polished Extract\n\nThis is an independently assembled, canonical learning record for later study.",
  });
  assert.deepEqual(exports.map((item) => item.kind), ["raw", "polished"]);
  assert.ok(exports.every((item) => item.url.startsWith("https://chrono.example/exports/")));
  assert.ok(exports.every((item) => /^[a-z0-9-]+\.md$/.test(item.filename)));

  for (const item of exports) {
    const url = new URL(item.url);
    const [, , resumeCode, stamp, filename] = url.pathname.split("/");
    const content = await readFile(path.join(testDataDirectory, "exports", resumeCode, stamp, filename), "utf8");
    assert.match(content, /^# /);
  }

  const updated = await registerExports(session.resumeCode, exports);
  assert.equal(updated.phase, "EXTRACTED");
  assert.equal(updated.exports.length, 1);
});
