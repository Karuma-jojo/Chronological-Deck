const el = (id) => document.getElementById(id);

let currentMode = "read";
let renderQueued = false;

function make(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function appendInline(parent, source) {
  const text = String(source || "");
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\s)]+\))/g;
  let cursor = 0;
  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > cursor) parent.append(document.createTextNode(text.slice(cursor, match.index)));
    const token = match[0];
    if (token.startsWith("`")) {
      parent.append(make("code", "", token.slice(1, -1)));
    } else if (token.startsWith("**")) {
      const strong = make("strong");
      appendInline(strong, token.slice(2, -2));
      parent.append(strong);
    } else if (token.startsWith("*")) {
      const em = make("em");
      appendInline(em, token.slice(1, -1));
      parent.append(em);
    } else {
      const parts = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
      if (parts) {
        const link = make("a", "", parts[1]);
        link.href = parts[2];
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        parent.append(link);
      } else {
        parent.append(document.createTextNode(token));
      }
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) parent.append(document.createTextNode(text.slice(cursor)));
}

function renderMarkdown(source) {
  const root = make("div", "vault-markdown");
  const lines = String(source || "").replace(/\r\n/g, "\n").split("\n");
  let paragraph = [];
  let list = null;
  let listType = "";
  let fenced = false;
  let codeLines = [];
  let mathBlock = false;
  let mathLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const p = make("p");
    appendInline(p, paragraph.join(" ").trim());
    root.append(p);
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    root.append(list);
    list = null;
    listType = "";
  };

  const flushCode = () => {
    const pre = make("pre");
    pre.append(make("code", "", codeLines.join("\n")));
    root.append(pre);
    codeLines = [];
  };

  const flushMath = () => {
    const block = make("div", "vault-math-block", mathLines.join("\n").trim());
    root.append(block);
    mathLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    if (/^\s*```/.test(line)) {
      flushParagraph();
      flushList();
      if (fenced) flushCode();
      fenced = !fenced;
      continue;
    }
    if (fenced) {
      codeLines.push(rawLine);
      continue;
    }

    if (/^\s*(\$\$|\\\[)\s*$/.test(line)) {
      flushParagraph();
      flushList();
      if (mathBlock) flushMath();
      mathBlock = !mathBlock;
      continue;
    }
    if (mathBlock) {
      mathLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,5})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const h = make(`h${Math.min(heading[1].length + 2, 6)}`);
      appendInline(h, heading[2]);
      root.append(h);
      continue;
    }

    if (/^\s*([-*_])\1\1+\s*$/.test(line)) {
      flushParagraph();
      flushList();
      root.append(make("hr"));
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      const blockquote = make("blockquote");
      appendInline(blockquote, quote[1]);
      root.append(blockquote);
      continue;
    }

    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const wantedType = ordered ? "ol" : "ul";
      if (!list || listType !== wantedType) {
        flushList();
        list = make(wantedType);
        listType = wantedType;
      }
      const li = make("li");
      appendInline(li, (ordered || unordered)[1]);
      list.append(li);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  if (fenced) flushCode();
  if (mathBlock) flushMath();
  if (!root.children.length) root.append(make("p", "vault-read-empty", "No content in this section yet."));
  return root;
}

function editorSnapshot() {
  const meta = el("vaultMeta");
  let stableId = el("vaultArcSelect")?.value || "";
  let revision = "0";
  if (meta) {
    const cells = [...meta.children];
    for (let i = 0; i < cells.length - 1; i += 2) {
      const key = cells[i].textContent?.trim();
      const value = cells[i + 1].textContent?.trim() || "";
      if (key === "Stable ID") stableId = value || stableId;
      if (key === "Revision") revision = value || revision;
    }
  }

  const sections = [...document.querySelectorAll("#vaultSections .vault-section")].map((card) => ({
    type: card.querySelector(".vault-section-type")?.value || "notes",
    visibility: card.querySelector(".vault-section-visibility")?.value || "private",
    heading: card.querySelector(".vault-section-heading")?.value || "Untitled section",
    content: card.querySelector(".vault-section-content")?.value || "",
  }));

  return {
    stableId,
    revision,
    title: el("vaultTitle")?.value || stableId || "Untitled ARC",
    status: el("vaultDocStatus")?.value || "raw",
    visibility: el("vaultVisibility")?.value || "private",
    conclusion: el("vaultConclusion")?.value || "",
    experience: el("vaultExperience")?.value || "",
    sections,
  };
}

function renderReadView() {
  renderQueued = false;
  const view = el("vaultReadView");
  if (!view) return;
  const doc = editorSnapshot();
  view.innerHTML = "";

  const article = make("article", "vault-document");
  const header = make("header", "vault-document-header");
  const kicker = make("div", "vault-document-kicker", `${doc.stableId || "ARC"} · revision ${doc.revision}`);
  const title = make("h1", "", doc.title);
  const badges = make("div", "vault-document-badges");
  badges.append(make("span", "tag", doc.status), make("span", "tag", doc.visibility));
  header.append(kicker, title, badges);
  article.append(header);

  if (doc.conclusion.trim()) {
    const box = make("section", "vault-read-highlight");
    box.append(make("div", "vault-read-label", "Short conclusion"), renderMarkdown(doc.conclusion));
    article.append(box);
  }

  if (doc.experience.trim()) {
    const box = make("section", "vault-read-chronicle");
    box.append(make("div", "vault-read-label", "Experience / chronicle"), renderMarkdown(doc.experience));
    article.append(box);
  }

  const sectionNav = make("nav", "vault-read-toc");
  const sectionList = make("div", "vault-read-sections");
  doc.sections.forEach((section, index) => {
    const sectionId = `vault-read-section-${index + 1}`;
    const link = make("a", "", section.heading);
    link.href = `#${sectionId}`;
    sectionNav.append(link);

    const block = make("section", "vault-read-section");
    block.id = sectionId;
    const top = make("div", "vault-read-section-head");
    const left = make("div");
    left.append(make("span", "vault-read-section-number", String(index + 1).padStart(2, "0")), make("h2", "", section.heading));
    const tags = make("div", "vault-document-badges");
    tags.append(make("span", "tag", section.type), make("span", "tag", section.visibility));
    top.append(left, tags);
    block.append(top, renderMarkdown(section.content));
    sectionList.append(block);
  });

  if (doc.sections.length) article.append(sectionNav, sectionList);
  else article.append(make("div", "vault-read-empty", "No sections yet. Switch to Edit mode to add one."));

  view.append(article);
}

function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  queueMicrotask(renderReadView);
}

function setMode(mode) {
  currentMode = mode === "edit" ? "edit" : "read";
  const readView = el("vaultReadView");
  const editView = el("vaultEditView");
  const readButton = el("vaultModeRead");
  const editButton = el("vaultModeEdit");
  if (!readView || !editView) return;
  const reading = currentMode === "read";
  readView.hidden = !reading;
  editView.hidden = reading;
  readButton?.classList.toggle("primary", reading);
  editButton?.classList.toggle("primary", !reading);
  if (reading) scheduleRender();
}

function installReader() {
  const editor = document.querySelector("#vaultTab .vault-editor");
  if (!editor || el("vaultReadView")) return;

  const originalChildren = [...editor.children];
  const toolbar = make("div", "vault-modebar");
  const left = make("div", "vault-modebar-copy");
  left.append(make("strong", "", "ARC document"), make("span", "", "Read cleanly by default; switch to Edit when you want to change the record."));
  const actions = make("div", "vault-actions");
  const readButton = make("button", "primary", "Read");
  readButton.id = "vaultModeRead";
  readButton.type = "button";
  const editButton = make("button", "", "Edit");
  editButton.id = "vaultModeEdit";
  editButton.type = "button";
  actions.append(readButton, editButton);
  toolbar.append(left, actions);

  const readView = make("div", "vault-read-view");
  readView.id = "vaultReadView";
  const editView = make("div", "vault-edit-view");
  editView.id = "vaultEditView";
  originalChildren.forEach((child) => editView.append(child));
  editor.append(toolbar, readView, editView);

  readButton.addEventListener("click", () => setMode("read"));
  editButton.addEventListener("click", () => setMode("edit"));

  editor.addEventListener("input", scheduleRender);
  editor.addEventListener("change", scheduleRender);

  const sections = el("vaultSections");
  if (sections) {
    const sectionObserver = new MutationObserver(scheduleRender);
    sectionObserver.observe(sections, { childList: true, subtree: true, characterData: true });
  }
  const meta = el("vaultMeta");
  if (meta) {
    const metaObserver = new MutationObserver(scheduleRender);
    metaObserver.observe(meta, { childList: true, subtree: true, characterData: true });
  }
  const status = el("vaultStatus");
  if (status) {
    const statusObserver = new MutationObserver(() => {
      scheduleRender();
      if (/Opened |Saved |Imported |Restored /.test(status.textContent || "")) setMode("read");
    });
    statusObserver.observe(status, { childList: true, subtree: true, characterData: true });
  }

  setMode("read");
}

queueMicrotask(installReader);
