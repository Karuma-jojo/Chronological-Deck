import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const serverSource = await readFile(new URL("../server.js", import.meta.url), "utf8");
const widgetSource = await readFile(new URL("../public/chrono-deck-widget.html", import.meta.url), "utf8");

const toolNames = [
  "open_t22_game",
  "browse_t22_modules",
  "browse_t22_arcs",
  "start_t22_arc",
  "set_v11_control",
  "save_t22_checkpoint",
  "dual_extract_t22",
];

test("MCP server registers every UI workflow tool", () => {
  for (const name of toolNames) {
    assert.match(serverSource, new RegExp(`registerAppTool\\([\\s\\S]*?"${name}"`));
  }
  assert.match(serverSource, /ui:\/\/chrono-deck\/t22-spire-v3\.html/);
  assert.match(serverSource, /StreamableHTTPServerTransport/);
});

test("widget exposes all reserved V11.3 controls", () => {
  for (const code of ["WALL", "HINT", "FORGE", "GUIDE", "REVEAL", "STATUS"]) {
    assert.match(widgetSource, new RegExp(`data-code="${code}"`));
  }
});

test("widget uses the MCP Apps lifecycle safely", () => {
  assert.match(widgetSource, /ui\/initialize/);
  assert.match(widgetSource, /ui\/notifications\/initialized/);
  assert.match(widgetSource, /ui\/notifications\/tool-result/);
  assert.match(widgetSource, /ui\/notifications\/size-changed/);
  assert.match(widgetSource, /ui\/message/);
  assert.match(widgetSource, /ui\/request-display-mode/);
  assert.doesNotMatch(widgetSource, /setWidgetState/);
});

test("widget and server agree on callable tool names", () => {
  for (const name of toolNames) assert.match(`${serverSource}\n${widgetSource}`, new RegExp(name));
  for (const name of ["open_t22_game", "browse_t22_modules", "browse_t22_arcs", "start_t22_arc", "set_v11_control"]) {
    assert.match(widgetSource, new RegExp(name));
  }
});

test("v0.2 shell keeps cinematic navigation separate from the proof chamber", () => {
  for (const id of ["view-home", "view-module", "view-browser", "view-dossier", "view-live", "ledger-drawer", "reveal-modal"]) {
    assert.match(widgetSource, new RegExp(`id="${id}"`));
  }
  assert.match(widgetSource, /New Expedition/);
  assert.match(widgetSource, /Browse the Spire/);
  assert.match(widgetSource, /Enter the ARC/);
  assert.match(widgetSource, /Reveal the decisive solution\?/);
  assert.match(widgetSource, /Mission Ledger/);
});
