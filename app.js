const data = window.HobbyAtlasData;

const app = document.querySelector("#app");
const categoryById = Object.fromEntries(data.categories.map((category) => [category.id, category]));
const facetById = Object.fromEntries(
  data.categories.flatMap((category) => (category.facets || []).map((facet) => [facet.id, { ...facet, category }])),
);
const logKey = "hobby-atlas-click-log";
let clickLog = JSON.parse(localStorage.getItem(logKey) || "[]");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function recordClick(label, destination) {
  clickLog.push({ timestamp: new Date().toISOString(), label, destination });
  localStorage.setItem(logKey, JSON.stringify(clickLog));
}

function hobbyCard(name, view) {
  const hobby = data.hobbies[name];
  return `<a class="hobby-card" href="#hobby/${encodeURIComponent(name)}" data-log="${escapeHtml(name)}" data-log-destination="hobby/${encodeURIComponent(name)}">
    <strong>${escapeHtml(name)}</strong><small>${escapeHtml(hobby.tags.slice(0, 2).join(" / "))}</small><span aria-hidden="true">[open]</span>
  </a>`;
}

function groupBlock(group) {
  return `<a class="group-block" href="#category/${group.id}" data-log="Open ${escapeHtml(group.label)}" data-log-destination="category/${group.id}"><div class="group-heading"><p class="label">activity</p><h2>${escapeHtml(group.label)}</h2><p>${escapeHtml(group.description || "")}</p></div>
  </a>`;
}

function renderBrowse() {
  app.innerHTML = `<div class="page"><div class="page-heading"><div><p class="label">Home</p><h1>Hobby Atlas</h1><p>Choose an activity category to explore its hobbies.</p></div><span class="view-label">WIREFRAME / 01</span></div>
    <section class="wireframe-note"><strong>Choose a category to see its hobbies.</strong><span>Every hobby opens a “you selected” page.</span></section>
    <div class="view-section"><div class="section-title"><h2>Activity categories</h2><p>Primary grouping from repeated card-sort pairings.</p></div><div class="group-list">${data.categories.map((group) => groupBlock(group)).join("")}</div></div>
  </div>`;
}

function renderCategory(id) {
  const category = categoryById[id];
  if (!category) return renderBrowse();
  const hobbyContent = category.facets
    ? `<div class="group-list facet-list">${category.facets.map((facet) => `<a class="group-block" href="#facet/${facet.id}" data-log="Open ${escapeHtml(facet.label)}" data-log-destination="facet/${facet.id}"><div class="group-heading"><p class="label">facet</p><h2>${escapeHtml(facet.label)}</h2><p>${escapeHtml(facet.description)}</p></div></a>`).join("")}</div>`
    : `<div class="hobby-grid category-grid">${category.cards.map((name) => hobbyCard(name, "activity category")).join("")}</div>`;
  app.innerHTML = `<div class="page"><a class="plain-link" href="#browse" data-log="Back to categories" data-log-destination="browse">[←] Back to categories</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity category</p><h1>${escapeHtml(category.label)}</h1><p>${escapeHtml(category.description)}</p></div><span class="view-label">LEVEL 2</span></div>
    ${hobbyContent}</div>`;
}

function renderFacet(id) {
  const facet = facetById[id];
  if (!facet) return renderBrowse();
  app.innerHTML = `<div class="page"><a class="plain-link" href="#category/${facet.category.id}" data-log="Back to ${escapeHtml(facet.category.label)}" data-log-destination="category/${facet.category.id}">[←] Back to ${escapeHtml(facet.category.label)}</a>
    <div class="page-heading compact-heading"><div><p class="label">Creative outlet facet</p><h1>${escapeHtml(facet.label)}</h1><p>${escapeHtml(facet.description)}</p></div><span class="view-label">LEVEL 3</span></div>
    <div class="hobby-grid category-grid">${facet.cards.map((name) => hobbyCard(name, "creative outlet facet")).join("")}</div></div>`;
}

function renderHobby(name) {
  const hobby = data.hobbies[name];
  if (!hobby) return renderBrowse();
  const category = categoryById[hobby.category];
  app.innerHTML = `<div class="page"><a class="plain-link" href="#browse" data-log="Back to categories" data-log-destination="browse">[←] Back to categories</a>
    <article class="selection-page"><p class="label">Leaf / selected block</p><h1>You selected: ${escapeHtml(name)}</h1><div class="selection-box"><p>${escapeHtml(hobby.blurb)}</p><dl><div><dt>Activity category</dt><dd>${escapeHtml(category.label)}</dd></div><div><dt>Tags</dt><dd>${escapeHtml(hobby.tags.join(" / "))}</dd></div><div><dt>Time to try</dt><dd>${escapeHtml(hobby.time)}</dd></div><div><dt>First step</dt><dd>${escapeHtml(hobby.startingPoint)}</dd></div></dl></div>
    <section class="related-section"><p class="label">Related leaves</p><div class="hobby-grid">${hobby.related.map((related) => hobbyCard(related, "related")).join("")}</div></section></article></div>`;
}

function renderAbout() {
  app.innerHTML = `<div class="page"><div class="page-heading"><div><p class="label">Evidence</p><h1>Card sort notes</h1><p>Labels and groupings are grounded in the supplied card-sort report.</p></div><span class="view-label">VIEW / NOTES</span></div>
    <div class="findings-grid">${data.sortFindings.map((finding) => `<article class="finding"><strong>${escapeHtml(finding.value)}</strong><h2>${escapeHtml(finding.label)}</h2><p>${escapeHtml(finding.detail)}</p></article>`).join("")}</div>
    <p><a class="plain-link" href="card-sort-report-draft.pdf" target="_blank" data-log="Open card sort report" data-log-destination="report">Open the card sort report draft [↗]</a></p></div>`;
}

function downloadLog(format) {
  const content = format === "json"
    ? JSON.stringify(clickLog, null, 2)
    : ["timestamp,label,destination", ...clickLog.map((entry) => [entry.timestamp, entry.label, entry.destination].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))].join("\n");
  const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `hobby-atlas-click-log.${format}`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderLog() {
  app.innerHTML = `<div class="page"><div class="page-heading"><div><p class="label">Research instrument</p><h1>Click log</h1><p>${clickLog.length} recorded click${clickLog.length === 1 ? "" : "s"}. Logs persist in this browser until cleared.</p></div><span class="view-label">VIEW / LOG</span></div>
    <div class="log-actions"><button class="wire-button" data-export="json">Download JSON</button><button class="wire-button" data-export="csv">Download CSV</button><button class="wire-button" data-clear-log>Clear log</button></div>
    <div class="table-wrap"><table><thead><tr><th>Timestamp</th><th>Clicked label</th><th>Destination</th></tr></thead><tbody>${clickLog.map((entry) => `<tr><td>${escapeHtml(entry.timestamp)}</td><td>${escapeHtml(entry.label)}</td><td>${escapeHtml(entry.destination)}</td></tr>`).join("") || "<tr><td colspan='3'>No clicks recorded yet.</td></tr>"}</tbody></table></div></div>`;
}

function render() {
  const [route, value] = location.hash.slice(1).split("/");
  document.querySelectorAll("[data-view-link]").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === (route === "hobby" || route === "category" || route === "facet" ? "browse" : route || "browse")));
  if (route === "facet") renderFacet(decodeURIComponent(value || ""));
  else if (route === "category") renderCategory(decodeURIComponent(value || ""));
  else if (route === "hobby") renderHobby(decodeURIComponent(value || ""));
  else if (route === "about") renderAbout();
  else if (route === "log") renderLog();
  else renderBrowse();
  app.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-log]");
  if (target) recordClick(target.dataset.log, target.dataset.logDestination);
  const exportButton = event.target.closest("[data-export]");
  if (exportButton) downloadLog(exportButton.dataset.export);
  if (event.target.closest("[data-clear-log]")) {
    clickLog = [];
    localStorage.removeItem(logKey);
    renderLog();
  }
});
window.addEventListener("hashchange", render);
render();
