# Chrono-Deck T22 Archive

This branch is the canonical, human-readable archive for T22 learning extracts and progress.

## Design goal

The archive must remain useful even if the Chrono-Deck app, Render deployment, database, or ChatGPT integration disappears. The canonical records are plain UTF-8 Markdown and JSON committed to Git.

## Stable layout

```text
archive/
  README.md
  progress.json
  arcs/
    T22-M01-A01/
      raw.md
      polished.md
      manifest.json
    T22-M01-A02/
      raw.md
      polished.md
      manifest.json
    ...
```

Each ARC folder has two stable Markdown paths. Updating an ARC replaces the current files, while Git history preserves every earlier version. `manifest.json` records SHA-256 hashes and byte counts so future readers can verify file integrity.

`progress.json` is the single synced progress ledger. Only ARCs that have changed from the default `not_started` state need entries.

## Progress states

- `not_started`
- `active`
- `core_cleared`
- `mastered`

An ARC can be archived at any state. Archiving notes does not automatically imply mastery unless the ingest request explicitly sets a progress state.

## Longevity

No online service can honestly guarantee availability for 100 years. This format is intentionally service-independent: plain Markdown, JSON, Git history, stable filenames, checksums, and no proprietary database requirement. Anyone who clones or mirrors the repository gets the complete archive.
