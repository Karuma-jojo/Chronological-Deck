import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  arcArchivePaths,
  normalizeMarkdown,
  sha256Utf8,
} from "../lib/github-archive.js";

const serverSource = await readFile(new URL("../server.js", import.meta.url), "utf8");
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const renderSource = await readFile(new URL("../../render.yaml", import.meta.url), "utf8");

const toolNames = [
  "archive_t22_extracts",
  "set_t22_progress",
  "get_t22_progress",
  "get_t22_archive",
  "verify_t22_archive",
];

test("v0.3 exposes only archive and progress tools", () => {
  for (const name of toolNames) {
    assert.match(serverSource, new RegExp(`registerAppTool\\([\\s\\S]*?"${name}"`));
  }
  for (const retired of [
    "open_t22_game",
    "browse_t22_modules",
    "browse_t22_arcs",
    "start_t22_arc",
    "set_v11_control",
    "save_t22_checkpoint",
    "dual_extract_t22",
  ]) {
    assert.doesNotMatch(serverSource, new RegExp(retired));
  }
  assert.doesNotMatch(serverSource, /registerAppResource|WIDGET_URI|outputTemplate/);
});

test("archive service is versioned as 0.3.0", () => {
  assert.equal(packageJson.version, "0.3.0");
  assert.match(serverSource, /const APP_VERSION = "0\.3\.0"/);
});

test("archive paths are stable and human-readable", () => {
  assert.deepEqual(arcArchivePaths("T22-M01-A02"), {
    base: "archive/arcs/T22-M01-A02",
    raw: "archive/arcs/T22-M01-A02/raw.md",
    polished: "archive/arcs/T22-M01-A02/polished.md",
    manifest: "archive/arcs/T22-M01-A02/manifest.json",
  });
});

test("Markdown text is preserved exactly and SHA-256 is deterministic", () => {
  const original = "# Test\r\n\r\nThis is a sufficiently long archival Markdown body for testing.\r\n";
  assert.equal(normalizeMarkdown(original, "Test"), original);
  assert.equal(
    sha256Utf8("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("Render declares the public archive target and keeps the write token secret", () => {
  assert.match(renderSource, /CHRONO_ARCHIVE_REPO/);
  assert.match(renderSource, /Karuma-jojo\/Chronological-Deck/);
  assert.match(renderSource, /CHRONO_ARCHIVE_BRANCH[\s\S]*t22-archive/);
  assert.match(renderSource, /CHRONO_GITHUB_TOKEN[\s\S]*sync: false/);
  assert.doesNotMatch(renderSource, /CHRONO_DATA_DIR/);
});
