import test from "node:test";
import assert from "node:assert/strict";

import { createArchiveServer, httpServer } from "../archive-server.js";

test("private archive MCP server constructs without touching Supabase credentials", async () => {
  const server = createArchiveServer();
  assert.ok(server);
  await server.close();
});

test("archive HTTP server is created but does not listen during import", () => {
  assert.equal(httpServer.listening, false);
});
