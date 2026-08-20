import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer as createHttpServer } from "node:http";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { T22_CATALOG, getArc } from "./lib/catalog.js";
import {
  archiveConfig,
  archiveExtractPair,
  publicArchiveUrls,
  readArchiveEntry,
  readProgress,
  setProgress,
  verifyArchiveEntry,
} from "./lib/github-archive.js";

const APP_VERSION = "0.3.0";
const MCP_PATH = "/mcp";
const PROGRESS_STATES = ["not_started", "active", "core_cleared", "mastered"];

const toolMeta = (invoking, invoked) => ({
  "openai/toolInvocation/invoking": invoking,
  "openai/toolInvocation/invoked": invoked,
});

function dataResult(message, structuredContent) {
  return {
    content: [{ type: "text", text: message }],
    structuredContent,
  };
}

function failure(error) {
  const message = error instanceof Error ? error.message : "Unknown Chrono-Deck archive error.";
  return {
    isError: true,
    content: [{ type: "text", text: message }],
    structuredContent: { ok: false, error: message },
  };
}

function requireArc(arcId) {
  const clean = String(arcId || "").trim().toUpperCase();
  const selection = getArc(clean);
  if (!selection) throw new Error(`Unknown T22 Atomic ARC: ${arcId}`);
  return { arcId: clean, ...selection };
}

function archiveRootUrl() {
  const [owner, repo] = archiveConfig.repo.split("/");
  return `https://github.com/${owner}/${repo}/tree/${encodeURIComponent(archiveConfig.branch)}/${archiveConfig.prefix}`;
}

function progressSummary(progress) {
  const counts = {
    not_started: T22_CATALOG.atomicCount,
    active: 0,
    core_cleared: 0,
    mastered: 0,
  };
  for (const entry of Object.values(progress.arcs || {})) {
    const state = entry?.state;
    if (!PROGRESS_STATES.includes(state) || state === "not_started") continue;
    counts.not_started -= 1;
    counts[state] += 1;
  }
  return counts;
}

function createChronoServer() {
  const server = new McpServer(
    { name: "chrono-deck-t22-archive", version: APP_VERSION },
    {
      instructions:
        "Chrono-Deck is a barebones T22 archive. Its only jobs are to preserve the user's two finalized Markdown extracts per Atomic ARC and keep a synced progress ledger. Do not run a game, invent ARC content, or create a custom UI. When the user provides two finalized .md extracts, read their actual contents and archive them verbatim with archive_t22_extracts.",
    },
  );

  registerAppTool(
    server,
    "archive_t22_extracts",
    {
      title: "Archive T22 Markdown extracts",
      description:
        "Permanently archive the two finalized Markdown extracts for one T22 Atomic ARC in the public Git-backed archive. The files are stored at stable raw.md and polished.md paths; Git history preserves earlier revisions and SHA-256 hashes verify integrity.",
      inputSchema: {
        arcId: z.string().min(8).max(32),
        rawMarkdown: z.string().min(40).max(500000),
        polishedMarkdown: z.string().min(40).max(500000),
        progressState: z.enum(PROGRESS_STATES).optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
      _meta: toolMeta("Archiving Markdown…", "Markdown archived"),
    },
    async ({ arcId, rawMarkdown, polishedMarkdown, progressState }) => {
      try {
        const selection = requireArc(arcId);
        const archived = await archiveExtractPair({
          arcId: selection.arcId,
          title: selection.arc.title,
          rawMarkdown,
          polishedMarkdown,
          progressState,
        });
        return dataResult(`Archived ${selection.arcId} as two Git-backed Markdown files.`, {
          ok: true,
          arcId: selection.arcId,
          title: selection.arc.title,
          commitSha: archived.commitSha,
          manifest: archived.manifest,
          progress: archived.progress,
          urls: archived.urls,
          archiveRoot: archiveRootUrl(),
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "set_t22_progress",
    {
      title: "Set T22 progress",
      description:
        "Sync one Atomic ARC's progress state to the canonical public progress.json ledger. This does not alter the archived Markdown files.",
      inputSchema: {
        arcId: z.string().min(8).max(32),
        state: z.enum(PROGRESS_STATES),
        note: z.string().max(1000).optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true, idempotentHint: true },
      _meta: toolMeta("Syncing progress…", "Progress synced"),
    },
    async ({ arcId, state, note }) => {
      try {
        const selection = requireArc(arcId);
        const updated = await setProgress({ arcId: selection.arcId, state, note });
        return dataResult(`${selection.arcId} progress synced to ${state}.`, {
          ok: true,
          arcId: selection.arcId,
          title: selection.arc.title,
          entry: updated.entry,
          commitSha: updated.commitSha,
          counts: progressSummary(updated.progress),
          archiveRoot: archiveRootUrl(),
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "get_t22_progress",
    {
      title: "Get T22 progress",
      description:
        "Read the canonical synced T22 progress ledger from the public Git archive. Optionally return one Atomic ARC only.",
      inputSchema: { arcId: z.string().min(8).max(32).optional() },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: true },
      _meta: toolMeta("Reading progress…", "Progress ready"),
    },
    async ({ arcId }) => {
      try {
        const progress = await readProgress();
        if (arcId) {
          const selection = requireArc(arcId);
          return dataResult(`${selection.arcId} progress loaded.`, {
            ok: true,
            arcId: selection.arcId,
            title: selection.arc.title,
            entry: progress.arcs?.[selection.arcId] || { state: progress.defaultState || "not_started" },
            archiveUrls: publicArchiveUrls(selection.arcId),
          });
        }
        return dataResult("T22 progress ledger loaded.", {
          ok: true,
          terminal: "T22",
          atomicCount: T22_CATALOG.atomicCount,
          counts: progressSummary(progress),
          updatedAt: progress.updatedAt,
          arcs: progress.arcs || {},
          archiveRoot: archiveRootUrl(),
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "get_t22_archive",
    {
      title: "Get T22 archive entry",
      description:
        "Read one archived T22 ARC entry and its stable public links. Markdown bodies are omitted by default to keep responses small; request includeMarkdown only when the actual notes are needed.",
      inputSchema: {
        arcId: z.string().min(8).max(32),
        includeMarkdown: z.boolean().optional(),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: true },
      _meta: toolMeta("Reading archive…", "Archive entry ready"),
    },
    async ({ arcId, includeMarkdown = false }) => {
      try {
        const selection = requireArc(arcId);
        const entry = await readArchiveEntry(selection.arcId);
        if (!entry) {
          return dataResult(`${selection.arcId} has no archived extract pair yet.`, {
            ok: true,
            arcId: selection.arcId,
            archived: false,
            urls: publicArchiveUrls(selection.arcId),
          });
        }
        return dataResult(`${selection.arcId} archive entry loaded.`, {
          ok: true,
          archived: true,
          arcId: selection.arcId,
          title: selection.arc.title,
          manifest: entry.manifest,
          progress: entry.progress,
          urls: entry.urls,
          ...(includeMarkdown
            ? { rawMarkdown: entry.rawMarkdown, polishedMarkdown: entry.polishedMarkdown }
            : {}),
        });
      } catch (error) {
        return failure(error);
      }
    },
  );

  registerAppTool(
    server,
    "verify_t22_archive",
    {
      title: "Verify T22 archive integrity",
      description:
        "Re-read an ARC's two public Markdown files, recompute SHA-256 hashes, and compare them with manifest.json.",
      inputSchema: { arcId: z.string().min(8).max(32) },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: true },
      _meta: toolMeta("Verifying hashes…", "Verification complete"),
    },
    async ({ arcId }) => {
      try {
        const selection = requireArc(arcId);
        const verified = await verifyArchiveEntry(selection.arcId);
        if (!verified) {
          return dataResult(`${selection.arcId} has no archived extract pair to verify.`, {
            ok: true,
            arcId: selection.arcId,
            archived: false,
          });
        }
        return dataResult(
          verified.ok
            ? `${selection.arcId} archive hashes match.`
            : `${selection.arcId} archive hash verification FAILED.`,
          { ok: verified.ok, archived: true, ...verified },
        );
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
  res.setHeader("Access-Control-Allow-Headers", "content-type, mcp-session-id, accept");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

const port = Number(process.env.PORT || 8787);
const httpServer = createHttpServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      name: "Chrono-Deck T22 Archive",
      version: APP_VERSION,
      purpose: "plain-Markdown archive + synced progress only",
      mcp: MCP_PATH,
      archiveRepo: archiveConfig.repo,
      archiveBranch: archiveConfig.branch,
      archiveRoot: archiveRootUrl(),
      githubWriteConfigured: Boolean(String(process.env.CHRONO_GITHUB_TOKEN || "").trim()),
    }));
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("ok");
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
    console.log(`Chrono-Deck T22 Archive listening on port ${port}`);
  });
}

export { createChronoServer, httpServer, progressSummary };
