import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("../server.js", import.meta.url), "utf8");
const widgetSource = await readFile(new URL("../public/chrono-deck-widget.html", import.meta.url), "utf8");

const toolNames = [
  "open_t22_game",
  "start_t22_arc",
  "set_v11_control",
  "save_t22_checkpoint",
  "dual_extract_t22",
];

test("MCP server registers every UI workflow tool", () => {
  for (const name of toolNames) {
    assert.match(serverSource, new RegExp(`registerAppTool\\([\\s\\S]*?"${name}"`));
  }
  assert.match(serverSource, /ui:\/\/chrono-deck\/t22-spire\.html/);
  assert.match(serverSource, /StreamableHTTPServerTransport/);
});

test("widget exposes all reserved V11.3 controls", () => {
  for (const code of ["WALL", "HINT", "FORGE", "GUIDE", "REVEAL", "STATUS"]) {
    assert.match(widgetSource, new RegExp(`data-code="${code}"`));
  }
  assert.match(widgetSource, /sendFollowUpMessage/);
  assert.match(widgetSource, /requestDisplayMode/);
});

test("widget and server agree on callable tool names", () => {
  for (const name of toolNames) assert.match(`${serverSource}\n${widgetSource}`, new RegExp(name));
  for (const name of ["open_t22_game", "start_t22_arc", "set_v11_control"]) {
    assert.match(widgetSource, new RegExp(name));
  }
});

