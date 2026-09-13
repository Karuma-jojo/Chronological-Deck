// Lightweight presentation layer for the existing ARC Library.
// Storage/fetching remains owned by vault-reader.js + HybridArcRepository.

function ensureStylesheet(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

ensureStylesheet("./css/cloud-archive.css?v=1", "chrono-cloud-archive-css");
// Load the current review treatment with a cache-busting URL so Pages clients
// that saw the first v1 styling do not remain stuck on that cached stylesheet.
ensureStylesheet("./css/t25-review.css?v=2", "chrono-t25-review-css-v2");

const logicalArcId = arcId => String(arcId || "").replace(/-(RAW|POLISHED)$/i, "");
const variantLabel = arcId => {
  const match = String(arcId || "").match(/-(RAW|POLISHED)$/i);
  return match ? match[1].toUpperCase() : "ARC";
};
const variantRank = label => ({ POLISHED: 0, RAW: 1, ARC: 2 }[label] ?? 3);

function repositoryState() {
  try {
    return globalThis.chronoArcRepository?.state?.() || null;
  } catch {
    return null;
  }
}

function updateArchiveHeader(groupCount = null, documentCount = null) {
  const library = document.getElementById("vaultLibrary");
  if (!library) return;
  library.classList.add("vault-cloud-archive");

  const heading = library.querySelector(".vault-library-title-row h2");
  if (heading) heading.textContent = "Cloud ARC Archive";

  const subtitle = library.querySelector(".vault-library-subtitle");
  if (subtitle) {
    subtitle.textContent =
      "Your saved ARC documents, grouped by logical learning event. Obsidian remains the main authoring surface.";
  }

  const search = document.getElementById("vaultLibrarySearch");
  if (search) search.placeholder = "Search logical ARC, title, RAW or POLISHED…";

  const titleRow = library.querySelector(".vault-library-title-row");
  let source = titleRow?.querySelector(".arc-reader-source");
  const state = repositoryState();
  if (source) {
    if (groupCount !== null && documentCount !== null) {
      source.textContent = `${groupCount} logical · ${documentCount} files`;
      source.title = state?.cloudSignedIn
        ? "Private Supabase archive for the signed-in account, with local cache fallback."
        : "Showing the available local cache. Sign in to load the private Supabase archive.";
    }
  }

  const head = library.querySelector(".vault-library-head");
  if (head && !head.querySelector(".vault-archive-privacy")) {
    const privacy = document.createElement("p");
    privacy.className = "vault-archive-privacy";
    privacy.textContent = state?.cloudSignedIn
      ? "🔒 Account-private · available on other devices after signing into the same Supabase account."
      : "🔒 Local cache shown · sign in to the same Supabase account to load your private cloud archive.";
    const subtitleNode = head.querySelector(".vault-library-subtitle");
    subtitleNode?.insertAdjacentElement("afterend", privacy);
  } else if (head) {
    const privacy = head.querySelector(".vault-archive-privacy");
    if (privacy) {
      privacy.textContent = state?.cloudSignedIn
        ? "🔒 Account-private · available on other devices after signing into the same Supabase account."
        : "🔒 Local cache shown · sign in to the same Supabase account to load your private cloud archive.";
    }
  }
}

function groupArchiveRows() {
  const list = document.getElementById("vaultLibraryList");
  if (!list) return;

  // vault-reader.js recreates direct .vault-library-item children on each
  // refresh/search. Once grouped, the buttons are nested and this becomes a no-op.
  const rows = [...list.children].filter(node => node.classList?.contains("vault-library-item"));
  if (!rows.length) {
    updateArchiveHeader();
    return;
  }

  const groups = new Map();
  for (const row of rows) {
    const arcId = row.dataset.arcId || "";
    const logicalId = logicalArcId(arcId) || arcId || "Unknown ARC";
    const variant = variantLabel(arcId);
    row.dataset.logicalArcId = logicalId;
    row.dataset.variant = variant;
    const idCell = row.querySelector(".vault-library-id");
    if (idCell) {
      idCell.textContent = variant;
      idCell.title = arcId;
      idCell.setAttribute("aria-label", `${variant} representation: ${arcId}`);
    }
    if (!groups.has(logicalId)) groups.set(logicalId, []);
    groups.get(logicalId).push(row);
  }

  const fragment = document.createDocumentFragment();
  for (const [logicalId, groupRows] of groups) {
    groupRows.sort((a, b) => variantRank(a.dataset.variant) - variantRank(b.dataset.variant));

    const group = document.createElement("section");
    group.className = "vault-archive-group";
    group.dataset.logicalArcId = logicalId;

    const head = document.createElement("div");
    head.className = "vault-archive-group-head";
    const id = document.createElement("span");
    id.className = "vault-archive-group-id";
    id.textContent = logicalId;
    const meta = document.createElement("span");
    meta.className = "vault-archive-group-meta";
    const variants = groupRows.map(row => row.dataset.variant).join(" + ");
    meta.textContent = variants;
    head.append(id, meta);

    const body = document.createElement("div");
    body.className = "vault-archive-group-body";
    for (const row of groupRows) body.append(row);

    group.append(head, body);
    fragment.append(group);
  }

  list.replaceChildren(fragment);
  updateArchiveHeader(groups.size, rows.length);
}

function installArchiveEnhancement() {
  const list = document.getElementById("vaultLibraryList");
  if (!list || list.dataset.cloudArchiveEnhanced === "1") return Boolean(list);
  list.dataset.cloudArchiveEnhanced = "1";

  let queued = false;
  const regroup = () => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      groupArchiveRows();
    });
  };

  const observer = new MutationObserver(regroup);
  observer.observe(list, { childList: true });
  regroup();
  document.addEventListener("chrono:cloud-context-changed", () => {
    updateArchiveHeader();
  });
  return true;
}

if (!installArchiveEnhancement()) {
  const observer = new MutationObserver(() => {
    if (installArchiveEnhancement()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
