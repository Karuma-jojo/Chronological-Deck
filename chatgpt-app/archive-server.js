import { timingSafeEqual } from "node:crypto";
import { createServer as createHttpServer } from "node:http";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

import {
  loadArcBundle,
  semanticEmbeddingStatus,
  semanticRelatedArcs,
  semanticSearchCompleted,
  suggestFrontmatterLinks,
} from "./lib/archive-client.js";

const port = Number(process.env.PORT || 8790);
const MCP_PATH = "/mcp";
const PUBLIC_BASE_URL = process.env.CHRONO_ARCHIVE_PUBLIC_URL || `http://localhost:${port}`;

function cleanToken(value) {
  return String(value || "").trim();
}

function authorized(req) {
  const expected = cleanToken(process.env.CHRONO_ARCHIVE_MCP_TOKEN);
  if (!expected) return false;
  const header = cleanToken(req.headers.authorization);
  if (!header.toLowerCase().startsWith("bearer ")) return false;
  const supplied = cleanToken(header.slice(7));
  if (!supplied) return false;
  const expectedBytes = Buffer.from(expected);
  const suppliedBytes = Buffer.from(supplied);
  return expectedBytes.length === suppliedBytes.length && timingSafeEqual(expectedBytes, suppliedBytes);
}

function toolResult(data, summary = "Chrono-Deck archive result") {
  return {
    content: [{ type: "text", text: `${summary}\n${JSON.stringify(data, null, 2)}` }],
    structuredContent: data,
  };
}

function toolFailure(error) {
  const message = error instanceof Error ? error.message : String(error || "Unknown archive error.");
  return {
    isError: true,
    content: [{ type: "text", text: message }],
    structuredContent: { error: message },
  };
}

export function createArchiveServer() {
  const server = new McpServer({ name: "chrono-deck-private-archive", version: "0.1.0" });

  server.registerTool(
    "search_completed_arc_archive",
    {
      title: "Search completed Chrono-Deck ARCs",
      description: "Hybrid semantic + lexical search over the authenticated user's completed/parked Chrono-Deck ARC archive. Use this to retrieve conceptually related past work, mistakes, proof patterns, or exact phrases. Search results are evidence, not authoritative curriculum metadata.",
      inputSchema: z.object({
        query: z.string().min(1).max(2000),
        logicalArcId: z.string().max(120).optional(),
        documentType: z.enum(["raw_dump", "polished_extract", "canonical"]).optional(),
        completedOnly: z.boolean().default(true),
        limit: z.number().int().min(1).max(40).default(12),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const data = await semanticSearchCompleted(args);
        return toolResult(data, `Found ${data.results.length} archive chunks.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "get_arc_archive_bundle",
    {
      title: "Get one Chrono-Deck ARC bundle",
      description: "Return the RAW/POLISHED/canonical document representations registered under one logical_arc_id. Use for exact document identity checks, not semantic inference.",
      inputSchema: z.object({ logicalArcId: z.string().min(1).max(120) }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async ({ logicalArcId }) => {
      try {
        const documents = await loadArcBundle(logicalArcId);
        return toolResult({ logicalArcId, documents }, `Loaded ${documents.length} document representations.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "find_semantically_related_arcs",
    {
      title: "Find semantically related completed ARCs",
      description: "Find completed ARCs whose polished/canonical content is semantically similar to one existing logical ARC. Results are candidate related links only and must not be treated as proof of prerequisite, chronology, mastery, or provenance relationships.",
      inputSchema: z.object({
        logicalArcId: z.string().min(1).max(120),
        limit: z.number().int().min(1).max(25).default(8),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async ({ logicalArcId, limit }) => {
      try {
        const candidates = await semanticRelatedArcs(logicalArcId, limit);
        return toolResult({
          logicalArcId,
          authoritative: false,
          candidates,
          rule: "Similarity may justify a candidate `related` link for review. It does not establish prerequisite, chronology, clearance, provenance, recovery debt, or dependency.",
        }, `Found ${candidates.length} related-ARC candidates.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "suggest_arc_frontmatter_links",
    {
      title: "Suggest safe ARC frontmatter links",
      description: "Search completed Chrono-Deck polished extracts using a new/current ARC's title, summary, topics, skills, and error themes. Returns non-authoritative candidates that an extractor may use for `related` links after verifying they make sense. Never use this tool to invent IDs, module fields, chronology, clearance, provenance, prerequisites, or recovery debt.",
      inputSchema: z.object({
        currentLogicalArcId: z.string().max(120).optional(),
        title: z.string().max(500).optional(),
        summary: z.string().max(3000).optional(),
        topics: z.array(z.string().max(120)).max(40).optional(),
        skills: z.array(z.string().max(120)).max(40).optional(),
        errorThemes: z.array(z.string().max(160)).max(40).optional(),
        limit: z.number().int().min(1).max(20).default(8),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const data = await suggestFrontmatterLinks(args);
        return toolResult(data, `Generated ${data.candidates.length} non-authoritative frontmatter-link candidates.`);
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  server.registerTool(
    "get_arc_embedding_status",
    {
      title: "Get Chrono-Deck embedding status",
      description: "Return how many semantic chunks are ready or still pending for the authenticated archive.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async () => {
      try {
        const data = await semanticEmbeddingStatus();
        return toolResult(data, "Semantic archive status loaded.");
      } catch (error) {
        return toolFailure(error);
      }
    },
  );

  return server;
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type, mcp-session-id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

export const httpServer = createHttpServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("ok");
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      name: "Chrono-Deck Private Semantic Archive",
      version: "0.1.0",
      mcp: MCP_PATH,
      authentication: "Bearer token required for MCP",
    }));
    return;
  }

  if (url.pathname === MCP_PATH && new Set(["POST", "GET", "DELETE"]).has(req.method || "")) {
    if (!authorized(req)) {
      res.writeHead(401, {
        "content-type": "application/json; charset=utf-8",
        "www-authenticate": "Bearer",
      });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }

    const server = createArchiveServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on("close", () => {
      transport.close().catch(() => undefined);
      server.close().catch(() => undefined);
    });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Chrono-Deck archive MCP request failed", error);
      if (!res.headersSent) res.writeHead(500).end("Internal server error");
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  httpServer.listen(port, () => {
    console.log(`Chrono-Deck private archive MCP listening on ${PUBLIC_BASE_URL}${MCP_PATH}`);
  });
}
