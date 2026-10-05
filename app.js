const data = window.HobbyAtlasData;

const app = document.querySelector("#app");
const categoryById = Object.fromEntries(data.categories.map((category) => [category.id, category]));
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

function groupBlock(group, type) {
  return `<section class="group-block"><div class="group-heading"><p class="label">${type}</p><h2>${escapeHtml(group.label)}</h2><p>${escapeHtml(group.description || "")}</p></div>
    <div class="hobby-grid">${group.cards.map((name) => hobbyCard(name, type)).join("")}</div>
    ${type === "activity" ? `<a class="plain-link" href="#category/${group.id}" data-log="Open ${escapeHtml(group.label)}" data-log-destination="category/${group.id}">Open category [→]</a>` : ""}
  </section>`;
}

function renderBrowse() {
  app.innerHTML = `<div class="page"><div class="page-heading"><div><p class="label">Home / two views</p><h1>Hobby Atlas</h1><p>One set of 27 cards, organized two ways. Choose an activity category or a PMEST-inspired lens.</p></div><span class="view-label">WIREFRAME / 01</span></div>
    <section class="wireframe-note"><strong>Click any labeled leaf to reach its end state.</strong><span>Every leaf opens a “you selected” page.</span></section>
    <div class="view-section"><div class="section-title"><h2>View A: activity categories</h2><p>Primary grouping from repeated card-sort pairings.</p></div><div class="group-list">${data.categories.map((group) => groupBlock(group, "activity")).join("")}</div></div>
    <!--
    <div class="view-section"><div class="section-title"><h2>View B: find by lens</h2><p>Alternate PMEST-inspired organization: place, motivation, experience, skill, and time.</p></div><div class="group-list">${data.facetGroups.map((group) => groupBlock(group, "lens")).join("")}</div></div>
    -->
  </div>`;
}

function renderCategory(id) {
  const category = categoryById[id];
  if (!category) return renderBrowse();
  app.innerHTML = `<div class="page"><a class="plain-link" href="#browse" data-log="Back to two views" data-log-destination="browse">[←] Back to two views</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity category</p><h1>${escapeHtml(category.label)}</h1><p>${escapeHtml(category.description)}</p></div><span class="view-label">LEVEL 2</span></div>
    <div class="hobby-grid category-grid">${category.cards.map((name) => hobbyCard(name, "activity category")).join("")}</div></div>`;
}

function renderHobby(name) {
  const hobby = data.hobbies[name];
  if (!hobby) return renderBrowse();
  const category = categoryById[hobby.category];
  app.innerHTML = `<div class="page"><a class="plain-link" href="#browse" data-log="Back to two views" data-log-destination="browse">[←] Back to two views</a>
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
  document.querySelectorAll("[data-view-link]").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === (route === "hobby" || route === "category" ? "browse" : route || "browse")));
  if (route === "category") renderCategory(decodeURIComponent(value || ""));
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
