import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getArc, isLaunchArc } from "./catalog.js";

const APP_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DATA_DIR = path.resolve(process.env.CHRONO_DATA_DIR || path.join(APP_ROOT, "data"));
const STORE_PATH = path.join(DATA_DIR, "sessions.json");

const CONTROL_STATES = new Set(["WALL", "FORGE", "GUIDE", "REVEAL"]);
const PHASES = new Set([
  "BOOT",
  "ENCOUNTER",
  "INVESTIGATION",
  "VERIFICATION",
  "APPLICATIONS",
  "CAPSTONE",
  "TRANSFER",
  "CLOSED_LEDGER",
  "EXTRACTED",
]);
const CLEARANCES = new Set([
  "Incomplete",
  "Core Cleared",
  "Core Cleared — Mastery Pending",
  "Fully Mastered",
]);

let mutationQueue = Promise.resolve();

function now() {
  return new Date().toISOString();
}

function codeChunk() {
  return randomBytes(3).toString("hex").toUpperCase();
}

export function normalizeResumeCode(value) {
  return String(value || "").trim().toUpperCase();
}

async function readStore() {
  try {
    const parsed = JSON.parse(await readFile(STORE_PATH, "utf8"));
    if (parsed && parsed.version === 1 && parsed.sessions) return parsed;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  return { version: 1, sessions: {} };
}

async function writeStore(store) {
  await mkdir(DATA_DIR, { recursive: true });
  const temporaryPath = `${STORE_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(temporaryPath, STORE_PATH);
}

function mutateStore(operation) {
  const task = mutationQueue.then(async () => {
    const store = await readStore();
    const result = await operation(store);
    await writeStore(store);
    return structuredClone(result);
  });
  mutationQueue = task.catch(() => undefined);
  return task;
}

function pushEvent(session, type, label, detail = undefined) {
  session.events.push({ at: now(), type, label, ...(detail ? { detail } : {}) });
  session.events = session.events.slice(-240);
}

function publicSession(session) {
  return structuredClone(session);
}

export async function createSession({ arcId, difficulty = "Rigorous" }) {
  if (!isLaunchArc(arcId)) {
    throw new Error("That Atomic ARC is cataloged but not enabled in this launch slice.");
  }
  const selection = getArc(arcId);
  if (!selection) throw new Error(`Unknown Atomic ARC: ${arcId}`);

  return mutateStore((store) => {
    let resumeCode;
    do resumeCode = `CD-${codeChunk()}-${codeChunk()}`;
    while (store.sessions[resumeCode]);

    const timestamp = now();
    const session = {
      schemaVersion: 1,
      engineVersion: "11.3",
      resumeCode,
      createdAt: timestamp,
      updatedAt: timestamp,
      module: {
        id: selection.module.id,
        index: selection.module.index,
        title: selection.module.title,
      },
      arc: { ...selection.arc },
      difficulty: String(difficulty || "Rigorous").slice(0, 80),
      controlState: "WALL",
      pendingControl: null,
      recoveryGateOwed: false,
      phase: "BOOT",
      clearance: "Incomplete",
      checkpoint: "Mission Contract not yet calibrated. Awaiting the opening scene.",
      ledgerSnapshot: {
        visibleState: "No historical scene has been opened.",
        acceptedClaims: [],
        provisionalClaims: [],
        unresolvedGate: "Boot calibration",
        proofDebt: [],
        assistanceSummary: "No assistance used. [WALL] is active.",
      },
      sequence: 1,
      events: [],
      exports: [],
    };
    pushEvent(session, "SESSION", "Session created", `${arcId} · [WALL]`);
    store.sessions[resumeCode] = session;
    return publicSession(session);
  });
}

export async function getSession(resumeCode) {
  const code = normalizeResumeCode(resumeCode);
  if (!code) return null;
  const store = await readStore();
  return store.sessions[code] ? publicSession(store.sessions[code]) : null;
}

export async function setControl({ resumeCode, control }) {
  const code = normalizeResumeCode(resumeCode);
  const requested = String(control || "").replaceAll(/[[\]\s]/g, "").toUpperCase();

  return mutateStore((store) => {
    const session = store.sessions[code];
    if (!session) throw new Error("Resume code not found.");

    session.pendingControl = null;
    if (requested === "HINT") {
      session.pendingControl = "HINT";
      pushEvent(session, "CONTROL", "[HINT] requested", "One-shot; [WALL] remains the resting state.");
    } else if (requested === "STATUS") {
      pushEvent(session, "CONTROL", "[STATUS] requested");
    } else if (CONTROL_STATES.has(requested)) {
      session.controlState = requested;
      if (requested === "GUIDE" || requested === "REVEAL") {
        session.recoveryGateOwed = true;
      }
      pushEvent(session, "CONTROL", `[${requested}] activated`);
    } else {
      throw new Error(`Unsupported control code: ${control}`);
    }

    session.updatedAt = now();
    session.sequence += 1;
    return publicSession(session);
  });
}

export async function saveCheckpoint({
  resumeCode,
  checkpoint,
  phase,
  clearance,
  recoveryGateOwed,
  eventLabel = "Checkpoint saved",
  visibleState,
  acceptedClaims,
  provisionalClaims,
  unresolvedGate,
  proofDebt,
  assistanceSummary,
}) {
  const code = normalizeResumeCode(resumeCode);
  return mutateStore((store) => {
    const session = store.sessions[code];
    if (!session) throw new Error("Resume code not found.");

    if (checkpoint !== undefined) {
      const clean = String(checkpoint).trim();
      if (clean) session.checkpoint = clean.slice(0, 4000);
    }
    if (phase !== undefined) {
      const clean = String(phase).trim().toUpperCase().replaceAll(" ", "_");
      if (!PHASES.has(clean)) throw new Error(`Unsupported mission phase: ${phase}`);
      session.phase = clean;
    }
    if (clearance !== undefined) {
      if (!CLEARANCES.has(clearance)) throw new Error(`Unsupported clearance: ${clearance}`);
      session.clearance = clearance;
    }
    if (typeof recoveryGateOwed === "boolean") session.recoveryGateOwed = recoveryGateOwed;

    const cleanList = (value) => Array.isArray(value)
      ? value.map((item) => String(item).trim().slice(0, 500)).filter(Boolean).slice(0, 30)
      : undefined;
    session.ledgerSnapshot ||= {};
    if (visibleState !== undefined) session.ledgerSnapshot.visibleState = String(visibleState).trim().slice(0, 2000);
    if (acceptedClaims !== undefined) session.ledgerSnapshot.acceptedClaims = cleanList(acceptedClaims);
    if (provisionalClaims !== undefined) session.ledgerSnapshot.provisionalClaims = cleanList(provisionalClaims);
    if (unresolvedGate !== undefined) session.ledgerSnapshot.unresolvedGate = String(unresolvedGate).trim().slice(0, 1000);
    if (proofDebt !== undefined) session.ledgerSnapshot.proofDebt = cleanList(proofDebt);
    if (assistanceSummary !== undefined) session.ledgerSnapshot.assistanceSummary = String(assistanceSummary).trim().slice(0, 1500);

    session.pendingControl = null;
    session.updatedAt = now();
    session.sequence += 1;
    pushEvent(session, "SAVE", String(eventLabel || "Checkpoint saved").slice(0, 120));
    return publicSession(session);
  });
}

export async function registerExports(resumeCode, exports) {
  const code = normalizeResumeCode(resumeCode);
  return mutateStore((store) => {
    const session = store.sessions[code];
    if (!session) throw new Error("Resume code not found.");
    session.exports.push({ at: now(), files: exports });
    session.exports = session.exports.slice(-12);
    session.phase = "EXTRACTED";
    session.updatedAt = now();
    session.sequence += 1;
    pushEvent(session, "EXTRACT", "Dual Extract created");
    return publicSession(session);
  });
}

export const sessionStorePaths = { APP_ROOT, DATA_DIR, STORE_PATH };
