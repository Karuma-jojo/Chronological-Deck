import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer as createHttpServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { T22_CATALOG, getLaunchSlice, getModule } from "./lib/catalog.js";
import { writeDualExtract } from "./lib/dual-extract.js";
import {
  createSession,
  getSession,
  registerExports,
  saveCheckpoint,
  sessionStorePaths,
  setControl,
} from "./lib/session-store.js";

const APP_ROOT = path.dirname(fileURLToPath(import.meta.url));
const WIDGET_URI = "ui://chrono-deck/t22-spire-v2.html";
const WIDGET_HTML = readFileSync(path.join(APP_ROOT, "public", "chrono-deck-widget.html"), "utf8");
const PUBLIC_BASE_URL = process.env.CHRONO_PUBLIC_URL || `http://localhost:${Number(process.env.PORT || 8787)}`;
const SLICE = getLaunchSlice();

const toolMeta = (invoking, invoked) => ({
  ui: { resourceUri: WIDGET_URI },
  "openai/outputTemplate": WIDGET_URI,
  "openai/widgetAccessible": true,
  "openai/toolInvocation/invoking": invoking,
  "openai/toolInvocation/invoked": invoked,
});

const dataToolMeta = (invoking, invoked) => ({
  "openai/widgetAccessible": true,
  "openai/toolInvocation/invoking": invoking,
  "openai/toolInvocation/invoked": invoked,
});

function dataResult(message, structuredContent) {
  return {
    content: [{ type: "text", text: message }],
    structuredContent,
  };
}

function resolveModule(moduleRef) {
  const raw = String(moduleRef || "").trim();
  if (!raw) return null;
  const numeric = raw.match(/^(?:M(?:ODULE)?\s*)?(\d{1,2})$/i);
  if (numeric) {
    const index = Number(numeric[1]);
    return T22_CATALOG.modules.find((module) => module.index === index) ?? null;
  }
  const upper = raw.toUpperCase();
  const exactId = T22_CATALOG.modules.find((module) => module.id.toUpperCase() === upper);
  if (exactId) return exactId;
  const exactTitle = T22_CATALOG.modules.find((module) => module.title.toLowerCase() === raw.toLowerCase());
  if (exactTitle) return exactTitle;
  return T22_CATALOG.modules.find((module) => module.title.toLowerCase().includes(raw.toLowerCase())) ?? null;
}

function gamePayload(session = null, extras = {}) {
  return {
    app: {
      name: "Chrono-Deck: T22 Spire",
      version: "0.2.0",
      engineVersion: "11.3",
      launchStatus: "GAME_SHELL_V02",
    },
    ...SLICE,
    session,
    ...extras,
  };
}

function result(message, session = null, extras = {}) {
  return {
    content: [{ type: "text", text: message }],
    structuredContent: gamePayload(session, extras),
  };
}

function failure(error) {
  const message = error instanceof Error ? error.message : "Unknown Chrono-Deck error.";
  return {
    isError: true,
    content: [{ type: "text", text: message }],
    structuredContent: gamePayload(null, { error: message }),
  };
}

function createChronoServer() {
  const server = new McpServer({ name: "chrono-deck-t22-spire", version: "0.2.0" });

  registerAppResource(
    server,
    "Chrono-Deck T22 game screen",
    WIDGET_URI,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Cinematic T22 Spire menu and focused V11.3 investigation chamber with save/resume and Dual Extract.",
      _meta: {
        ui: { prefersBorder: false },
        "openai/widgetPrefersBorder": false,
      },
    },
    async () => ({
      contents: [{
        uri: WIDGET_URI,
        mimeType: RESOURCE_MIME_TYPE,
        text: WIDGET_HTML,
        _meta: {
          ui: { prefersBorder: false },
          "openai/widgetPrefersBorder": false,
        },
      }],
    }),
  );

  registerAppTool(
    server,
    "open_t22_game",
    {
      title: "Open T22 game",
      description: "Render the interactive Chrono-Deck T22 Spire game screen. Do not substitute a plain-text ARC list. Optionally resume a saved session by code.",
      inputSchema: { resumeCode: z.string().optional() },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: toolMeta("Opening the Spire…", "Spire opened"),
    },
    async ({ resumeCode }) => {
      try {
        if (!resumeCode) return result("T22 Spire ready. Render the interactive game menu.");
        const session = await getSession(resumeCode);
        if (!session) throw new Error("Resume code not found.");
        return result(`Resumed ${session.arc.id} at ${session.phase}.`, session, {
          modelInstruction: `Resume Chrono-Deck session ${session.resumeCode} from its saved checkpoint under V11.3. Current control state: [${session.controlState}].`,
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "browse_t22_modules",
    {
      title: "Browse T22 modules",
      description: "List the audited T22 modules for the visual Spire browser. This is catalog browsing only; it does not launch an ARC.",
      inputSchema: { query: z.string().max(120).optional() },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: dataToolMeta("Reading the Spire index…", "Spire index ready"),
    },
    async ({ query }) => {
      const needle = String(query || "").trim().toLowerCase();
      const modules = T22_CATALOG.modules
        .filter((module) => !needle || module.title.toLowerCase().includes(needle) || module.id.toLowerCase().includes(needle) || String(module.index) === needle)
        .map((module) => ({
          id: module.id,
          index: module.index,
          title: module.title,
          atomicCount: module.atomicCount,
          launchEnabled: module.launchEnabled,
        }));
      return dataResult(`${modules.length} T22 module${modules.length === 1 ? "" : "s"} found.`, {
        kind: "t22-modules",
        catalog: {
          moduleCount: T22_CATALOG.moduleCount,
          atomicCount: T22_CATALOG.atomicCount,
          auditVersion: T22_CATALOG.auditVersion,
        },
        modules,
      });
    },
  );

  registerAppTool(
    server,
    "browse_t22_arcs",
    {
      title: "Browse T22 Atomic ARCs",
      description: "List the audited Atomic ARC names for one T22 module by module number, module ID, or title. Catalog browsing does not make locked ARCs playable.",
      inputSchema: { moduleRef: z.string().min(1).max(120) },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: dataToolMeta("Opening the module ledger…", "Atomic ARC ledger ready"),
    },
    async ({ moduleRef }) => {
      const module = resolveModule(moduleRef);
      if (!module) {
        return {
          isError: true,
          content: [{ type: "text", text: `T22 module not found: ${moduleRef}` }],
          structuredContent: { kind: "t22-arcs", error: "Module not found." },
        };
      }
      return dataResult(`${module.atomicCount} Atomic ARCs in T22 Module ${module.index}.`, {
        kind: "t22-arcs",
        module: {
          id: module.id,
          index: module.index,
          title: module.title,
          atomicCount: module.atomicCount,
          launchEnabled: module.launchEnabled,
        },
        arcs: module.arcs.map((arc) => ({
          id: arc.id,
          title: arc.title,
          targetHours: arc.targetHours,
          launchEnabled: arc.launchEnabled,
          ...(arc.year ? { year: arc.year } : {}),
          ...(arc.location ? { location: arc.location } : {}),
          ...(arc.territory ? { territory: arc.territory } : {}),
        })),
      });
    },
  );

  registerAppTool(
    server,
    "start_t22_arc",
    {
      title: "Start T22 Atomic ARC",
      description: "Create a durable V11.3 session for one of the three launch-certified T22 Atomic ARCs.",
      inputSchema: {
        arcId: z.enum(["T22-M01-A01", "T22-M01-A02", "T22-M01-A03"]),
        difficulty: z.string().max(80).optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
      _meta: toolMeta("Sealing a Mission Contract…", "Mission Contract sealed"),
    },
    async ({ arcId, difficulty }) => {
      try {
        const session = await createSession({ arcId, difficulty });
        return result(`Created ${arcId}. Resume code: ${session.resumeCode}. [WALL] is active.`, session, {
          modelInstruction: `Boot ${arcId} in Live Play under Spire Master Engine V11.3. Difficulty: ${session.difficulty}. Historical setting: ${session.arc.year}, ${session.arc.location}. [WALL] is active. Construct the private finite Mission Contract, present only permitted boot information, open the encounter, and wait for the user's investigative move.`,
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "set_v11_control",
    {
      title: "Set V11.3 control",
      description: "Record an explicit V11.3 control code for the active Chrono-Deck session.",
      inputSchema: {
        resumeCode: z.string().min(8),
        control: z.enum(["WALL", "HINT", "FORGE", "GUIDE", "REVEAL", "STATUS"]),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
      _meta: toolMeta("Changing control state…", "Control state recorded"),
    },
    async ({ resumeCode, control }) => {
      try {
        const session = await setControl({ resumeCode, control });
        const suffix = control === "HINT" ? " One minimal hint is authorized; [WALL] remains the resting state." : "";
        return result(`[${control}] recorded.${suffix}`, session, {
          modelInstruction: `[${control}] for Chrono-Deck session ${session.resumeCode}. Obey the exact V11.3 control-code semantics.`,
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "save_t22_checkpoint",
    {
      title: "Save T22 checkpoint",
      description: "Persist a spoiler-safe Chrono-Deck checkpoint for reliable resume. The game master should call this after major phase changes and when the user presses Save.",
      inputSchema: {
        resumeCode: z.string().min(8),
        checkpoint: z.string().min(1).max(4000).optional(),
        phase: z.enum(["BOOT", "ENCOUNTER", "INVESTIGATION", "VERIFICATION", "APPLICATIONS", "CAPSTONE", "TRANSFER", "CLOSED_LEDGER", "EXTRACTED"]).optional(),
        clearance: z.enum(["Incomplete", "Core Cleared", "Core Cleared — Mastery Pending", "Fully Mastered"]).optional(),
        recoveryGateOwed: z.boolean().optional(),
        eventLabel: z.string().max(120).optional(),
        visibleState: z.string().max(2000).optional(),
        acceptedClaims: z.array(z.string().max(500)).max(30).optional(),
        provisionalClaims: z.array(z.string().max(500)).max(30).optional(),
        unresolvedGate: z.string().max(1000).optional(),
        proofDebt: z.array(z.string().max(500)).max(30).optional(),
        assistanceSummary: z.string().max(1500).optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false, idempotentHint: true },
      _meta: toolMeta("Writing the campaign ledger…", "Checkpoint saved"),
    },
    async (args) => {
      try {
        const session = await saveCheckpoint(args);
        return result(`Checkpoint saved under ${session.resumeCode}.`, session);
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "dual_extract_t22",
    {
      title: "Dual Extract T22 session",
      description: "Write two independent Markdown artifacts for a Chrono-Deck session: a forensic raw dump and a polished learning extract.",
      inputSchema: {
        resumeCode: z.string().min(8),
        rawMarkdown: z.string().min(40).max(500000),
        polishedMarkdown: z.string().min(40).max(500000),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
      _meta: toolMeta("Forging two records…", "Dual Extract complete"),
    },
    async ({ resumeCode, rawMarkdown, polishedMarkdown }) => {
      try {
        const session = await getSession(resumeCode);
        if (!session) throw new Error("Resume code not found.");
        const exports = await writeDualExtract({ session, rawMarkdown, polishedMarkdown, publicBaseUrl: PUBLIC_BASE_URL });
        const updated = await registerExports(session.resumeCode, exports);
        const links = exports.map((item) => `${item.kind === "raw" ? "Raw dump" : "Polished extract"}: ${item.url}`).join("\n");
        return result(`Dual Extract complete.\n${links}`, updated, { exports });
      } catch (error) {
        return failure(error);
      }
    },
  );

  return server;
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, mcp-session-id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

function safeExportPath(urlPath) {
  const parts = urlPath.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts.length !== 4 || parts[0] !== "exports") return null;
  const [, resumeCode, stamp, filename] = parts;
  if (!/^CD-[0-9A-F]{6}-[0-9A-F]{6}$/.test(resumeCode)) return null;
  if (!/^\d{4}-\d{2}-\d{2}T[0-9Z-]+$/.test(stamp)) return null;
  if (!/^[a-z0-9-]+\.md$/.test(filename)) return null;
  const root = path.join(sessionStorePaths.DATA_DIR, "exports");
  const resolved = path.resolve(root, resumeCode, stamp, filename);
  return resolved.startsWith(`${path.resolve(root)}${path.sep}`) ? { resolved, filename } : null;
}

const port = Number(process.env.PORT || 8787);
const MCP_PATH = "/mcp";

const httpServer = createHttpServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ name: "Chrono-Deck T22 Spire", version: "0.2.0", mcp: MCP_PATH }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("ok");
    return;
  }
  if (req.method === "GET" && url.pathname.startsWith("/exports/")) {
    try {
      const target = safeExportPath(url.pathname);
      if (!target) throw new Error("Invalid export path.");
      const markdown = await readFile(target.resolved);
      res.writeHead(200, {
        "content-type": "text/markdown; charset=utf-8",
        "content-disposition": `attachment; filename="${target.filename}"`,
        "cache-control": "private, max-age=300",
      });
      res.end(markdown);
    } catch {
      res.writeHead(404).end("Export not found");
    }
    return;
  }

  if (url.pathname === MCP_PATH && new Set(["POST", "GET", "DELETE"]).has(req.method || "")) {
    const server = createChronoServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on("close", () => {
      transport.close().catch(() => undefined);
      server.close().catch(() => undefined);
    });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("MCP request failed", error);
      if (!res.headersSent) res.writeHead(500).end("Internal server error");
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  httpServer.listen(port, () => {
    console.log(`Chrono-Deck T22 Spire listening on ${PUBLIC_BASE_URL}${MCP_PATH}`);
  });
}

export { createChronoServer, gamePayload, httpServer, safeExportPath };
