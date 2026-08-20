# Chrono-Deck T22 Archive MCP

This service has one deliberately narrow purpose: preserve the user's two finalized Markdown extracts for each T22 Atomic ARC and keep a synced progress ledger.

There is no game UI, no session engine, no resume-code system, no V11.3 control surface, and no duplicate conversation layer. ChatGPT handles study/play directly. This MCP only archives and retrieves records.

## Canonical storage

The source of truth is the public Git branch:

- repository: `Karuma-jojo/Chronological-Deck`
- branch: `t22-archive`
- root: `archive/`

Stable ARC layout:

```text
archive/
  README.md
  progress.json
  arcs/
    T22-M01-A02/
      raw.md
      polished.md
      manifest.json
```

The two Markdown files are stored exactly as supplied to the archive tool. `manifest.json` records SHA-256 hashes and UTF-8 byte counts. Updating the stable paths creates a new Git commit, so previous versions remain in Git history.

## Progress states

`progress.json` is the canonical synced ledger. Supported states are:

- `not_started`
- `active`
- `core_cleared`
- `mastered`

Only non-default or explicitly changed ARC entries need to be present in the JSON file.

## MCP tools

- `archive_t22_extracts` — archive a finalized raw + polished Markdown pair; optionally sync progress in the same Git commit.
- `set_t22_progress` — update one ARC's progress state.
- `get_t22_progress` — read the whole progress ledger or one ARC.
- `get_t22_archive` — read archive metadata/links, optionally including Markdown bodies.
- `verify_t22_archive` — recompute both SHA-256 hashes and compare them with the manifest.

## Run locally

Requires Node.js 20+.

```bash
cd chatgpt-app
npm install
npm test
npm start
```

The MCP endpoint is `http://localhost:8787/mcp`.

Environment variables:

- `PORT` — HTTP port.
- `CHRONO_ARCHIVE_REPO` — default `Karuma-jojo/Chronological-Deck`.
- `CHRONO_ARCHIVE_BRANCH` — default `t22-archive`.
- `CHRONO_ARCHIVE_PREFIX` — default `archive`.
- `CHRONO_GITHUB_TOKEN` — fine-grained GitHub token used for writes. Give it access only to the archive repository with **Contents: Read and write**.

Reads work against the public repository without a token. Writes fail closed when `CHRONO_GITHUB_TOKEN` is absent.

## Render

The service does not need a persistent disk because GitHub is the durable store. Render can remain on the free plan during development; a paid always-on instance only improves availability/cold-start behavior.

For an existing Render Blueprint, add `CHRONO_GITHUB_TOKEN` manually in the service's Environment settings. The Blueprint declares it with `sync: false` so the secret is never committed to Git.

## Typical use

Attach the two finalized `.md` files in ChatGPT and say, for example:

> Archive these as T22-M01-A02 and mark it mastered.

ChatGPT should read the actual file contents and call `archive_t22_extracts` without rewriting the notes.

Later:

> Show my T22 progress.

or:

> Verify the archive integrity for T22-M01-A02.

## Longevity

No online provider can honestly guarantee 100-year availability. This design avoids lock-in: the canonical records are ordinary UTF-8 Markdown/JSON files in Git with stable paths and integrity hashes. Anyone who clones or mirrors the repository has a complete usable copy even if this MCP service disappears.
