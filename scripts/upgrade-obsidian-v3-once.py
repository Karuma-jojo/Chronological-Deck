from pathlib import Path
import json

root = Path('.')
main_path = root / 'obsidian-plugin/main.js'
s = main_path.read_text(encoding='utf-8')

if 'open-arc-reader' in s and 'chrono_prune_arc_revisions' in s:
    print('Obsidian v0.3 patch already applied')
    raise SystemExit(0)

# Import the official renderer + lifecycle component.
s = s.replace(
    'const {\n  Modal,',
    'const {\n  Component,\n  MarkdownRenderer,\n  Modal,',
    1,
)

marker = 'class TextPromptModal extends Modal {'
helpers = r'''
function normalizeMathBody(body) {
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let buffer = [];
  let fenced = false;
  let fenceChar = "";

  const flush = () => {
    if (!buffer.length) return;
    let text = buffer.join("\n");
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `$$\n${String(inner).trim()}\n$$`);
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${String(inner).trim()}$`);
    output.push(...text.split("\n"));
    buffer = [];
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!fenced) {
        flush();
        fenced = true;
        fenceChar = fence[1][0];
        output.push(line);
        continue;
      }
      output.push(line);
      if (fence[1][0] === fenceChar) {
        fenced = false;
        fenceChar = "";
      }
      continue;
    }
    if (fenced) output.push(line);
    else buffer.push(line);
  }
  flush();
  return output.join("\n");
}

function normalizeObsidianMath(markdown) {
  const text = String(markdown || "").replace(/\r\n/g, "\n");
  const match = text.match(/^(---\n[\s\S]*?\n---(?:\n|$))/);
  if (!match) return normalizeMathBody(text);
  return `${match[1]}${normalizeMathBody(text.slice(match[1].length))}`;
}

function readerBody(markdown) {
  const normalized = normalizeMathBody(stripFrontmatter(markdown));
  return normalized.replace(/^\s*#\s+[^\n]+\n+/, "");
}

function formatBytes(value) {
  const bytes = Math.max(0, Number(value || 0));
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

class ArcReaderModal extends Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
    this.renderComponent = null;
  }

  async onOpen() {
    this.modalEl.addClass("chrono-deck-reader-shell");
    await this.renderReader();
  }

  async renderReader() {
    if (this.renderComponent) this.renderComponent.unload();
    this.renderComponent = new Component();
    this.renderComponent.load();

    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("chrono-deck-reader");

    const fm = this.plugin.getFrontmatter(this.file);
    const arcId = extractArcId(fm?.arc_id) || this.file.basename;
    const title = asString(fm?.title || this.file.basename);
    const revision = Number(fm?.chrono_revision || 0);

    const hero = contentEl.createDiv({ cls: "chrono-deck-reader-hero" });
    hero.createDiv({ cls: "chrono-deck-reader-kicker", text: arcId });
    hero.createEl("h1", { cls: "chrono-deck-reader-title", text: title });

    const pills = hero.createDiv({ cls: "chrono-deck-reader-pills" });
    const pillValues = [
      asString(fm?.document_status || fm?.status),
      asString(fm?.curriculum_role),
      revision ? `cloud v${revision}` : "local only",
    ].filter(Boolean);
    for (const value of pillValues) pills.createSpan({ cls: "chrono-deck-reader-pill", text: value });

    const actions = hero.createDiv({ cls: "chrono-deck-reader-actions" });
    const edit = actions.createEl("button", { text: "Edit note" });
    edit.addClass("mod-cta");
    edit.onclick = () => this.close();

    const fixMath = actions.createEl("button", { text: "Fix math syntax" });
    fixMath.onclick = async () => {
      const changed = await this.plugin.normalizeMathInFile(this.file, false);
      if (changed) await this.renderReader();
      else new Notice("Chrono-Deck: math syntax is already Obsidian-compatible.");
    };

    const close = actions.createEl("button", { text: "Close" });
    close.onclick = () => this.close();

    const summaryItems = [
      ["Setting", fm?.setting],
      ["Domain", fm?.domain],
      ["Mastery", fm?.mastery],
      ["Effort", fm?.total_effort],
    ].filter(([, value]) => asString(value));

    if (summaryItems.length) {
      const summary = contentEl.createDiv({ cls: "chrono-deck-reader-summary" });
      for (const [label, raw] of summaryItems) {
        const card = summary.createDiv({ cls: "chrono-deck-reader-summary-card" });
        card.createDiv({ cls: "chrono-deck-reader-summary-label", text: label });
        card.createDiv({ cls: "chrono-deck-reader-summary-value", text: asString(raw) });
      }
    }

    const article = contentEl.createDiv({ cls: "markdown-preview-view chrono-deck-reader-markdown" });
    const sizer = article.createDiv({ cls: "markdown-preview-sizer markdown-preview-section" });
    const source = await this.app.vault.cachedRead(this.file);
    await MarkdownRenderer.render(this.app, readerBody(source), sizer, this.file.path, this.renderComponent);

    const headings = [...sizer.querySelectorAll("h2, h3")];
    if (headings.length) {
      const details = contentEl.createEl("details", { cls: "chrono-deck-reader-toc" });
      details.createEl("summary", { text: `Sections (${headings.length})` });
      const list = details.createDiv({ cls: "chrono-deck-reader-toc-list" });
      for (const heading of headings) {
        const button = list.createEl("button", { text: heading.textContent || "Section" });
        button.onclick = () => heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      article.insertAdjacentElement("beforebegin", details);
    }
  }

  onClose() {
    if (this.renderComponent) {
      this.renderComponent.unload();
      this.renderComponent = null;
    }
    this.contentEl.empty();
  }
}

'''
if marker not in s:
    raise SystemExit('Reader insertion point not found')
s = s.replace(marker, helpers + marker, 1)

# Add reader/math/storage commands before the existing supplementary command.
command_marker = '    this.addCommand({ id: "create-supplementary-arc"'
commands = r'''    this.addCommand({
      id: "open-arc-reader",
      name: "Open current ARC in beautiful reader",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.openArcReader();
        return true;
      },
    });
    this.addCommand({
      id: "normalize-current-arc-math",
      name: "Fix math rendering in current ARC",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.normalizeCurrentArcMath();
        return true;
      },
    });
    this.addCommand({
      id: "show-current-arc-revision-storage",
      name: "Show current ARC revision storage",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) this.showCurrentArcRevisionStorage();
        return true;
      },
    });
'''
if command_marker not in s:
    raise SystemExit('Command insertion point not found')
s = s.replace(command_marker, commands + command_marker, 1)

# Register ARC focus styling and clean it up on unload.
load_end = '    this.addCommand({ id: "open-chrono-deck", name: "Open Chrono-Deck website", callback: () => window.open(this.settings.chronoDeckUrl || DEFAULT_SETTINGS.chronoDeckUrl, "_blank") });\n  }\n\n  async loadSettings() {'
load_replacement = r'''    this.addCommand({ id: "open-chrono-deck", name: "Open Chrono-Deck website", callback: () => window.open(this.settings.chronoDeckUrl || DEFAULT_SETTINGS.chronoDeckUrl, "_blank") });

    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.updateArcFocusClass()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.updateArcFocusClass()));
    this.app.workspace.onLayoutReady(() => this.updateArcFocusClass());
  }

  onunload() {
    document.body.classList.remove("chrono-deck-arc-active");
  }

  async loadSettings() {'''
if load_end not in s:
    raise SystemExit('onload tail insertion point not found')
s = s.replace(load_end, load_replacement, 1)

# Add reader/editor helper methods before validateCurrentArc.
method_marker = '  async validateCurrentArc() {'
methods = r'''  updateArcFocusClass() {
    const file = this.app.workspace.getActiveFile();
    const frontmatter = file?.extension === "md" ? this.getFrontmatter(file) : {};
    document.body.classList.toggle("chrono-deck-arc-active", Boolean(extractArcId(frontmatter?.arc_id)));
  }

  async openArcReader() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      new ArcReaderModal(this.app, this, file).open();
    } catch (error) {
      new Notice(`Chrono-Deck reader: ${error.message}`, 8000);
    }
  }

  async normalizeMathInFile(file, notify = true) {
    const source = await this.app.vault.read(file);
    const normalized = normalizeObsidianMath(source);
    if (normalized === source.replace(/\r\n/g, "\n")) return false;
    await this.app.vault.modify(file, normalized);
    if (notify) new Notice("Chrono-Deck: converted \\(…\\) / \\[…\\] math to Obsidian $ / $$ MathJax delimiters.", 7000);
    return true;
  }

  async normalizeCurrentArcMath() {
    try {
      const file = this.getActiveArcFile();
      const changed = await this.normalizeMathInFile(file, true);
      if (!changed) new Notice("Chrono-Deck: math syntax is already Obsidian-compatible.");
    } catch (error) {
      new Notice(`Chrono-Deck math fix failed: ${error.message}`, 8000);
    }
  }

  async showCurrentArcRevisionStorage() {
    try {
      const file = this.getActiveArcFile();
      const validation = validateFrontmatter(this.getFrontmatter(file), file);
      if (validation.errors.length) throw new Error(validation.errors.join(" "));
      const session = await this.ensureSession();
      const stats = await this.rpc("chrono_arc_revision_stats", { p_arc_id: validation.arcId }, session);
      const count = Number(stats?.snapshotCount || 0);
      const latest = Number(stats?.latestRevision || 0);
      const bytes = Number(stats?.approxSnapshotBytes || 0);
      new Notice(`${validation.arcId}: ${count} stored revision snapshot${count === 1 ? "" : "s"}, ${formatBytes(bytes)} snapshot JSON, latest revision v${latest}.`, 9000);
    } catch (error) {
      new Notice(`Chrono-Deck revision stats failed: ${error.message}. Run the v0.3 Supabase migration first.`, 9000);
    }
  }

'''
if method_marker not in s:
    raise SystemExit('Method insertion point not found')
s = s.replace(method_marker, methods + method_marker, 1)

# After each successful sync, prune old full snapshots without making the sync depend on pruning.
notice_needle = '      this.setStatus(`${payload.document.arcId} · synced v${revision}`);\n      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";\n      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${warningText}`, 7000);'
notice_replacement = r'''      let pruned = 0;
      try {
        pruned = Number(await this.rpc("chrono_prune_arc_revisions", {
          p_arc_id: payload.document.arcId,
          p_keep_recent: 50,
          p_keep_every: 25,
        }, session)) || 0;
      } catch (pruneError) {
        console.warn("Chrono-Deck revision pruning skipped; run the v0.3 migration if needed.", pruneError);
      }
      this.setStatus(`${payload.document.arcId} · synced v${revision}`);
      const warningText = payload.warnings.length ? ` ${payload.warnings.join(" ")}` : "";
      const pruneText = pruned ? ` Pruned ${pruned} old full snapshot${pruned === 1 ? "" : "s"}.` : "";
      new Notice(`Synced ${payload.document.arcId} revision ${revision}.${pruneText}${warningText}`, 7000);'''
if notice_needle not in s:
    raise SystemExit('Sync notice insertion point not found')
s = s.replace(notice_needle, notice_replacement, 1)

main_path.write_text(s, encoding='utf-8')

manifest_path = root / 'obsidian-plugin/manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
manifest['version'] = '0.3.0'
manifest['description'] = 'Author Chrono-Deck ARC notes with a rendered reader, MathJax-friendly editing, and safe Supabase sync.'
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')

readme_path = root / 'obsidian-plugin/README.md'
readme = readme_path.read_text(encoding='utf-8')
readme = readme.replace('**v0.2.0**', '**v0.3.0**')
if '## Reader + editor experience (v0.3)' not in readme:
    readme += r'''

## Reader + editor experience (v0.3)

- **Open current ARC in beautiful reader** opens a mobile-first rendered article using Obsidian's Markdown renderer.
- Math is rendered with Obsidian MathJax. The reader understands both Obsidian `$...$` / `$$...$$` and legacy `\\(...\\)` / `\\[...\\]` delimiters.
- **Fix math rendering in current ARC** permanently converts legacy delimiters outside fenced code blocks to Obsidian-compatible MathJax delimiters.
- While an `arc_id` note is active, `styles.css` applies a narrower, calmer focus layout to Obsidian's normal editor. For the cleanest editing experience, use Obsidian **Live Preview**.
- **Show current ARC revision storage** reports how many full revision snapshots remain and their approximate JSON size.

## Revision retention (v0.3)

Run `supabase/obsidian-reader-v3.sql` once. After successful Obsidian pushes, the plugin keeps revision 1, the latest 50 full snapshots, and every 25th older revision as a milestone. Revision numbers remain monotonic; pruning old snapshot rows does not reset the revision counter.
'''
readme_path.write_text(readme, encoding='utf-8')

docs_path = root / 'docs/obsidian-bridge.md'
docs = docs_path.read_text(encoding='utf-8')
if '## Reader, MathJax, and revision retention (v0.3)' not in docs:
    docs += r'''

## Reader, MathJax, and revision retention (v0.3)

The bridge now has a presentation layer without changing canonical ownership: the `.md` file remains authoritative on the device, while **Open current ARC in beautiful reader** renders its body through Obsidian's `MarkdownRenderer` and hides raw frontmatter from the reading surface.

Chrono-Deck canonical Markdown should prefer Obsidian MathJax delimiters:

- inline: `$x^2 + y^2 = z^2$`
- display: `$$ ... $$`

The reader temporarily normalizes legacy `\\(...\\)` and `\\[...\\]` forms for display. **Fix math rendering in current ARC** can persist that conversion while leaving fenced code blocks untouched.

`supabase/obsidian-reader-v3.sql` adds bounded revision retention. The default policy keeps revision 1, the most recent 50 full snapshots, and every 25th older revision. This avoids unbounded duplication of complete Markdown/JSON snapshots while retaining dense recent history and sparse long-term milestones. Revision numbers themselves are never renumbered or reused.
'''
docs_path.write_text(docs, encoding='utf-8')

print('Patched Chrono-Deck Obsidian Bridge to v0.3.0')
