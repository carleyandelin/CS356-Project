const data = window.HobbyAtlasData;

const app = document.querySelector("#app");
const categoryNav = document.querySelector(".category-nav");
const testBanner = document.querySelector("#test-banner");

const categoryById = Object.fromEntries(data.categories.map((c) => [c.id, c]));
const facetById = Object.fromEntries(
  data.categories.flatMap((c) => (c.facets || []).map((f) => [f.id, { ...f, category: c }]))
);

// ─── URL mode detection ────────────────────────────────────────────────────
// ?test    → participant tree test session
// ?results → researcher results view
// (none)   → normal wireframe browse
const urlParams = new URLSearchParams(location.search);
const MODE = urlParams.has("test") ? "test" : urlParams.has("results") ? "results" : "normal";

// ─── Google Sheet endpoint ─────────────────────────────────────────────────
// After deploying your Apps Script, paste the URL here and remove the placeholder.
const SHEET_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

async function postToSheet(record) {
  if (!SHEET_URL || SHEET_URL.startsWith("PASTE")) return;
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.warn("Sheet POST failed — data is still safe in localStorage:", err);
  }
}

// ─── Storage keys ──────────────────────────────────────────────────────────
const LOG_KEY     = "hobby-atlas-click-log";
const SESSION_KEY = "hobby-atlas-test-sessions";

let clickLog     = JSON.parse(localStorage.getItem(LOG_KEY)     || "[]");
let testSessions = JSON.parse(localStorage.getItem(SESSION_KEY) || "[]");

// ─── Active test session state ─────────────────────────────────────────────
// phase: "preview"    → task card is showing; timer not yet started
//        "navigating" → participant is in the tree; timer running
let activeSession = null;

// ─── Build category nav ────────────────────────────────────────────────────
categoryNav.innerHTML = data.categories.map((category) => {
  const facetLinks = (category.facets || []).map((facet) =>
    `<a href="#facet/${facet.id}" data-log="Open ${escapeHtml(facet.label)}" data-log-destination="facet/${facet.id}">${escapeHtml(facet.label)}</a>`
  ).join("");
  return `<div class="category-menu${category.facets ? " has-facets" : ""}">
    <a class="category-button" href="#category/${category.id}" data-log="Open ${escapeHtml(category.label)}" data-log-destination="category/${category.id}">${escapeHtml(category.label)}</a>
    ${facetLinks ? `<div class="facet-menu" aria-label="${escapeHtml(category.label)} facets">${facetLinks}</div>` : ""}
  </div>`;
}).join("");

// Hide researcher-only nav links from participants
if (MODE === "test") {
  document.querySelectorAll("[data-view-link='about'], [data-view-link='log']").forEach(el => {
    el.style.display = "none";
  });
}

// ─── Utilities ─────────────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]
  );
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Click recording ───────────────────────────────────────────────────────
function recordClick(label, destination) {
  const entry = { timestamp: new Date().toISOString(), label, destination };
  clickLog.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(clickLog));
  // Only log to session path while actively navigating (not during task preview)
  if (activeSession && activeSession.phase === "navigating") {
    activeSession.path.push({ label, destination, elapsed: Date.now() - activeSession.taskStart });
  }
}

// ─── Test banner (visible during navigation phase only) ───────────────────
function updateTestBanner() {
  if (MODE !== "test" || !activeSession || activeSession.phase !== "navigating") {
    testBanner.hidden = true;
    return;
  }
  const task    = activeSession.tasks[activeSession.currentTask];
  const taskNum = activeSession.currentTask + 1;
  const total   = activeSession.tasks.length;
  testBanner.hidden = false;
  testBanner.innerHTML = `<div class="test-banner-inner">
    <div class="test-task-info">
      <span class="test-task-label">Task ${taskNum} of ${total}</span>
      <p class="test-task-text">${escapeHtml(task.text)}</p>
    </div>
    <button class="wire-button give-up-btn" data-give-up>I would give up</button>
  </div>`;
}

// ─── "This is my answer" button (navigation phase only) ───────────────────
function answerButton(destination) {
  if (MODE !== "test" || !activeSession || activeSession.phase !== "navigating") return "";
  return `<div class="answer-zone">
    <p class="answer-prompt">Is this where you would find it?</p>
    <button class="wire-button answer-btn" data-answer="${escapeHtml(destination)}">✓ This is my answer</button>
  </div>`;
}

// ─── Test session management ───────────────────────────────────────────────
function startTest(participantName) {
  activeSession = {
    participant:  participantName.trim(),
    tasks:        shuffleArray([...data.tasks]),
    currentTask:  0,
    phase:        "preview",
    path:         [],
    taskStart:    null,
    sessionStart: new Date().toISOString(),
  };
  renderTaskPreview();
}

function beginTask() {
  if (!activeSession) return;
  activeSession.phase     = "navigating";
  activeSession.taskStart = Date.now();
  activeSession.path      = [];
  updateTestBanner();
  location.hash = "browse";
  render();
}

function finishTask(gaveUp, finalDestination) {
  if (!activeSession) return;
  const task    = activeSession.tasks[activeSession.currentTask];
  const path    = activeSession.path;
  const elapsed = Date.now() - (activeSession.taskStart || Date.now());

  const dest     = finalDestination || (path.length ? path[path.length - 1].destination : null);
  const normDest = dest ? decodeURIComponent(dest) : null;
  const success  = !gaveUp && task.targets.some(t => normDest === t);

  const record = {
    participant:      activeSession.participant,
    sessionStart:     activeSession.sessionStart,
    taskId:           task.id,
    taskText:         task.text,
    targetLabel:      task.targetLabel,
    firstClick:       path[0]?.label         || null,
    firstClickDest:   path[0]?.destination   || null,
    fullPath:         path.map(p => p.label),
    finalDestination: normDest,
    elapsedMs:        elapsed,
    gaveUp,
    success,
    timestamp:        new Date().toISOString(),
  };

  testSessions.push(record);
  localStorage.setItem(SESSION_KEY, JSON.stringify(testSessions));
  postToSheet(record);

  activeSession.currentTask++;
  activeSession.phase = "preview";
  activeSession.path  = [];
  testBanner.hidden   = true;

  if (activeSession.currentTask >= activeSession.tasks.length) {
    activeSession = null;
    renderTestComplete();
  } else {
    renderTaskPreview();
  }
}

// ─── Test-mode views ───────────────────────────────────────────────────────
function renderTestWelcome() {
  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div><p class="label">Tree test</p><h1>Before you start</h1></div>
      <span class="view-label">?TEST MODE</span>
    </div>
    <div class="selection-page" style="margin-top:0">
      <div class="selection-box">
        <p>You'll be asked to find ${data.tasks.length} things on a hobby site, one at a time.</p>
        <p>Click around the way you normally would. When you think you've found the right spot, click <strong>"This is my answer."</strong></p>
        <p>If you can't find it, click <strong>"I would give up"</strong> at the top of the screen. That helps us too.</p>
        <p>We're testing the site, not you.</p>
      </div>
      <div class="test-intake" style="margin-top:24px">
        <label class="intake-label" for="participant-name">Enter Your Name</label>
        <input class="intake-input" id="participant-name" type="text" placeholder="First name is fine" autocomplete="off" />
        <button class="wire-button" data-start-test>Start →</button>
      </div>
    </div>
  </div>`;
  document.querySelector("#participant-name")?.focus();
}

function renderTaskPreview() {
  if (!activeSession) return;
  const task    = activeSession.tasks[activeSession.currentTask];
  const taskNum = activeSession.currentTask + 1;
  const total   = activeSession.tasks.length;
  testBanner.hidden = true;
  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div><p class="label">Tree test</p><h1>Task ${taskNum} of ${total}</h1></div>
      <span class="view-label">?TEST MODE</span>
    </div>
    <div class="selection-page" style="margin-top:0">
      <div class="selection-box">
        <p style="font-size:18px;line-height:1.5;margin-bottom:16px">${escapeHtml(task.text)}</p>
        <p style="font-size:14px;margin:0">When you find it, click <strong>"This is my answer."</strong></p>
      </div>
      <div class="test-intake" style="margin-top:24px">
        <button class="wire-button" data-begin-task>Start task →</button>
      </div>
    </div>
  </div>`;
}

function renderTestComplete() {
  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div>
        <p class="label">Tree test</p>
        <h1>All done — thank you!</h1>
        <p>You've finished all ${data.tasks.length} tasks. Your responses have been recorded.</p>
      </div>
      <span class="view-label">SESSION COMPLETE</span>
    </div>
    <section class="wireframe-note">
      <strong>Session saved.</strong>
      <span>The researcher can view and export results at <code>?results</code>.</span>
    </section>
  </div>`;
}

// ─── Results view ──────────────────────────────────────────────────────────
function renderResults() {
  const participants = [...new Set(testSessions.map(r => r.participant))];

  const taskRows = data.tasks.map((task, i) => {
    const rows = testSessions.filter(r => r.taskId === task.id);
    if (!rows.length) {
      return `<tr><td>${i + 1}</td><td>${escapeHtml(task.text)}</td><td>${escapeHtml(task.targetLabel)}</td>
        <td colspan="6" style="color:#666">No data yet</td></tr>`;
    }
    const firstClicks = {};
    const dests = {};
    rows.forEach(r => {
      if (r.firstClick)       firstClicks[r.firstClick] = (firstClicks[r.firstClick] || 0) + 1;
      if (r.finalDestination) dests[r.finalDestination]  = (dests[r.finalDestination]  || 0) + 1;
    });
    const topFC      = Object.entries(firstClicks).sort((a, b) => b[1] - a[1])[0];
    const topDest    = Object.entries(dests).sort((a, b) => b[1] - a[1])[0];
    const giveUps    = rows.filter(r => r.gaveUp).length;
    const successes  = rows.filter(r => r.success).length;
    const successPct = Math.round((successes / rows.length) * 100);
    const avgSec     = Math.round(rows.reduce((s, r) => s + r.elapsedMs, 0) / rows.length / 1000);
    return `<tr>
      <td>${i + 1}</td>
      <td>${escapeHtml(task.text)}</td>
      <td>${escapeHtml(task.targetLabel)}</td>
      <td>${rows.length}</td>
      <td>${topFC   ? `${escapeHtml(topFC[0])} (${topFC[1]})`    : "—"}</td>
      <td>${topDest ? `${escapeHtml(topDest[0])} (${topDest[1]})` : "—"}</td>
      <td>${successPct}%</td>
      <td>${giveUps}</td>
      <td>${avgSec}s</td>
    </tr>`;
  }).join("");

  const rawRows = testSessions.map(r =>
    `<tr>
      <td>${escapeHtml(r.participant)}</td>
      <td>${escapeHtml(r.taskId)}</td>
      <td>${escapeHtml(r.firstClick || "—")}</td>
      <td>${escapeHtml((r.fullPath || []).join(" → ") || "—")}</td>
      <td>${escapeHtml(r.finalDestination || "—")}</td>
      <td>${Math.round((r.elapsedMs || 0) / 1000)}s</td>
      <td>${r.gaveUp  ? "Yes" : "No — finished"}</td>
      <td>${r.success ? "✓"   : "✗"}</td>
    </tr>`
  ).join("") || `<tr><td colspan="8">No sessions recorded yet. Run <code>?test</code> with participants first.</td></tr>`;

  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div>
        <p class="label">Research instrument</p>
        <h1>Tree test results</h1>
        <p>${testSessions.length} task result${testSessions.length === 1 ? "" : "s"} from ${participants.length} participant${participants.length === 1 ? "" : "s"}.</p>
      </div>
      <span class="view-label">?RESULTS MODE</span>
    </div>
    <div class="log-actions">
      <button class="wire-button" data-export-sessions="csv">Download CSV</button>
      <button class="wire-button" data-export-sessions="json">Download JSON</button>
      <button class="wire-button" data-clear-sessions>Clear all results</button>
    </div>
    <div class="view-section">
      <div class="section-title"><h2>Task summary</h2><p>One row per task across all participants.</p></div>
      <div class="table-wrap" style="margin-top:14px">
        <table>
          <thead><tr>
            <th>#</th><th>Task</th><th>Target</th><th>Runs</th>
            <th>Top first click (n)</th><th>Top final dest. (n)</th>
            <th>Success %</th><th>Give-ups</th><th>Avg time</th>
          </tr></thead>
          <tbody>${taskRows}</tbody>
        </table>
      </div>
    </div>
    <div class="view-section">
      <div class="section-title"><h2>Raw session data</h2><p>One row per task per participant.</p></div>
      <div class="table-wrap" style="margin-top:14px">
        <table>
          <thead><tr>
            <th>Participant</th><th>Task ID</th><th>First click</th>
            <th>Full path</th><th>Final destination</th>
            <th>Time</th><th>Give up</th><th>Success</th>
          </tr></thead>
          <tbody>${rawRows}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function downloadSessions(format) {
  let content;
  if (format === "json") {
    content = JSON.stringify(testSessions, null, 2);
  } else {
    const headers = ["participant","sessionStart","taskId","taskText","targetLabel",
                     "firstClick","firstClickDest","fullPath","finalDestination",
                     "elapsedMs","gaveUp","success","timestamp"];
    const rows = testSessions.map(r =>
      headers.map(h => {
        const v = h === "fullPath" ? (r.fullPath || []).join(" → ") : r[h];
        return `"${String(v ?? "").replaceAll('"', '""')}"`;
      }).join(",")
    );
    content = [headers.join(","), ...rows].join("\n");
  }
  const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv" });
  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = `hobby-atlas-tree-test.${format}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── Normal wireframe views ────────────────────────────────────────────────
function hobbyCard(name) {
  const hobby = data.hobbies[name];
  return `<a class="hobby-card" href="#hobby/${encodeURIComponent(name)}" data-log="${escapeHtml(name)}" data-log-destination="hobby/${encodeURIComponent(name)}">
    <strong>${escapeHtml(name)}</strong><small>${escapeHtml((hobby?.tags || []).slice(0, 2).join(" / "))}</small><span aria-hidden="true">[open]</span>
  </a>`;
}

function groupBlock(group) {
  return `<a class="group-block" href="#category/${group.id}" data-log="Open ${escapeHtml(group.label)}" data-log-destination="category/${group.id}">
    <div class="group-heading"><p class="label">activity</p><h2>${escapeHtml(group.label)}</h2><p>${escapeHtml(group.description || "")}</p></div>
  </a>`;
}

function renderBrowse() {
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Home</p><h1>Hobby Atlas</h1><p>Choose an activity category to explore its hobbies.</p></div><span class="view-label">WIREFRAME / 01</span></div>
    <section class="wireframe-note"><strong>Choose a category to see its hobbies.</strong><span>Every hobby opens a "you selected" page.</span></section>
    <div class="view-section"><div class="section-title"><h2>Activity categories</h2><p>Primary grouping from repeated card-sort pairings.</p></div>
    <div class="group-list">${data.categories.map(groupBlock).join("")}</div></div>
  </div>`;
}

function renderCategory(id) {
  const category = categoryById[id];
  if (!category) return renderBrowse();
  const hobbyContent = category.facets
    ? `${category.cards?.length ? `<div class="hobby-grid category-grid">${category.cards.map(hobbyCard).join("")}</div>` : ""}
       <div class="group-list facet-list">${category.facets.map((facet) =>
         `<a class="group-block" href="#facet/${facet.id}" data-log="Open ${escapeHtml(facet.label)}" data-log-destination="facet/${facet.id}">
           <div class="group-heading"><p class="label">facet</p><h2>${escapeHtml(facet.label)}</h2><p>${escapeHtml(facet.description)}</p></div></a>`
       ).join("")}</div>`
    : `<div class="hobby-grid category-grid">${category.cards.map(hobbyCard).join("")}</div>`;

  app.innerHTML = `<div class="page">
    <a class="plain-link" href="#browse" data-log="Back to categories" data-log-destination="browse">[←] Back to categories</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity category</p><h1>${escapeHtml(category.label)}</h1><p>${escapeHtml(category.description)}</p></div><span class="view-label">LEVEL 2</span></div>
    ${answerButton("category/" + id)}
    ${hobbyContent}
  </div>`;
}

function renderFacet(id) {
  const facet = facetById[id];
  if (!facet) return renderBrowse();
  app.innerHTML = `<div class="page">
    <a class="plain-link" href="#category/${facet.category.id}" data-log="Back to ${escapeHtml(facet.category.label)}" data-log-destination="category/${facet.category.id}">[←] Back to ${escapeHtml(facet.category.label)}</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity facet</p><h1>${escapeHtml(facet.label)}</h1><p>${escapeHtml(facet.description)}</p></div><span class="view-label">LEVEL 3</span></div>
    ${answerButton("facet/" + id)}
    <div class="hobby-grid category-grid">${facet.cards.map(hobbyCard).join("")}</div>
  </div>`;
}

function renderHobby(name) {
  const hobby    = data.hobbies[name];
  if (!hobby) return renderBrowse();
  const category = categoryById[hobby.category];

  // In test mode: show only the name + answer button (no detail table — that's researcher info)
  if (MODE === "test") {
    app.innerHTML = `<div class="page">
      <a class="plain-link" href="#browse" data-log="Back to categories" data-log-destination="browse">[←] Back to categories</a>
      <article class="selection-page">
        <p class="label">Leaf / selected block</p>
        <h1>You selected: ${escapeHtml(name)}</h1>
        ${answerButton("hobby/" + name)}
      </article>
    </div>`;
    return;
  }

  // Normal wireframe view: full detail card
  app.innerHTML = `<div class="page">
    <a class="plain-link" href="#browse" data-log="Back to categories" data-log-destination="browse">[←] Back to categories</a>
    <article class="selection-page">
      <p class="label">Leaf / selected block</p>
      <h1>You selected: ${escapeHtml(name)}</h1>
      <div class="selection-box">
        <p>${escapeHtml(hobby.blurb)}</p>
        <dl>
          <div><dt>Activity category</dt><dd>${escapeHtml(category?.label || "")}</dd></div>
          <div><dt>Tags</dt><dd>${escapeHtml(hobby.tags.join(" / "))}</dd></div>
          <div><dt>Time to try</dt><dd>${escapeHtml(hobby.time)}</dd></div>
          <div><dt>First step</dt><dd>${escapeHtml(hobby.startingPoint)}</dd></div>
        </dl>
      </div>
      <section class="related-section"><p class="label">Related leaves</p>
        <div class="hobby-grid">${hobby.related.map(hobbyCard).join("")}</div>
      </section>
    </article>
  </div>`;
}

function renderAbout() {
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Evidence</p><h1>Card sort notes</h1><p>Labels and groupings are grounded in the supplied card-sort report.</p></div><span class="view-label">VIEW / NOTES</span></div>
    <div class="findings-grid">${data.sortFindings.map((finding) =>
      `<article class="finding"><strong>${escapeHtml(finding.value)}</strong><h2>${escapeHtml(finding.label)}</h2><p>${escapeHtml(finding.detail)}</p></article>`
    ).join("")}</div>
    <p><a class="plain-link" href="card-sort-report-draft.pdf" target="_blank" data-log="Open card sort report" data-log-destination="report">Open the card sort report draft [↗]</a></p>
  </div>`;
}

function downloadLog(format) {
  const content = format === "json"
    ? JSON.stringify(clickLog, null, 2)
    : ["timestamp,label,destination", ...clickLog.map((e) =>
        [e.timestamp, e.label, e.destination].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")
      )].join("\n");
  const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv" });
  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = `hobby-atlas-click-log.${format}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function renderLog() {
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Research instrument</p><h1>Click log</h1>
      <p>${clickLog.length} recorded click${clickLog.length === 1 ? "" : "s"}. Logs persist in this browser until cleared.</p>
    </div><span class="view-label">VIEW / LOG</span></div>
    <div class="log-actions">
      <button class="wire-button" data-export="json">Download JSON</button>
      <button class="wire-button" data-export="csv">Download CSV</button>
      <button class="wire-button" data-clear-log>Clear log</button>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Timestamp</th><th>Clicked label</th><th>Destination</th></tr></thead>
      <tbody>${clickLog.map((e) =>
        `<tr><td>${escapeHtml(e.timestamp)}</td><td>${escapeHtml(e.label)}</td><td>${escapeHtml(e.destination)}</td></tr>`
      ).join("") || "<tr><td colspan='3'>No clicks recorded yet.</td></tr>"}</tbody>
    </table></div>
  </div>`;
}

// ─── Router ────────────────────────────────────────────────────────────────
function render() {
  if (MODE === "results") { renderResults(); return; }

  if (MODE === "test") {
    if (!activeSession)                    { renderTestWelcome(); return; }
    if (activeSession.phase === "preview") { renderTaskPreview(); return; }
  }

  const [route, value] = location.hash.slice(1).split("/");
  document.querySelectorAll("[data-view-link]").forEach((link) =>
    link.classList.toggle("active", link.dataset.viewLink ===
      (["hobby","category","facet"].includes(route) ? "browse" : route || "browse"))
  );

  if      (route === "facet")    renderFacet(decodeURIComponent(value || ""));
  else if (route === "category") renderCategory(decodeURIComponent(value || ""));
  else if (route === "hobby")    renderHobby(decodeURIComponent(value || ""));
  else if (route === "about")    renderAbout();
  else if (route === "log")      renderLog();
  else                           renderBrowse();

  app.focus({ preventScroll: true });
}

// ─── Event delegation ──────────────────────────────────────────────────────
document.addEventListener("click", (event) => {
  const logTarget = event.target.closest("[data-log]");
  if (logTarget) recordClick(logTarget.dataset.log, logTarget.dataset.logDestination);

  // Start session (welcome screen)
  if (event.target.closest("[data-start-test]")) {
    const input = document.querySelector("#participant-name");
    if (!input?.value.trim()) { input?.focus(); return; }
    startTest(input.value);
    return;
  }

  // Begin task (task preview card → enter the tree)
  if (event.target.closest("[data-begin-task]")) {
    beginTask();
    return;
  }

  // Give up current task
  if (event.target.closest("[data-give-up]")) {
    finishTask(true, null);
    return;
  }

  // "This is my answer"
  const answerBtn = event.target.closest("[data-answer]");
  if (answerBtn) {
    recordClick("This is my answer", answerBtn.dataset.answer);
    finishTask(false, answerBtn.dataset.answer);
    return;
  }

  // Click log export
  const exportBtn = event.target.closest("[data-export]");
  if (exportBtn) downloadLog(exportBtn.dataset.export);

  // Session export
  const exportSessions = event.target.closest("[data-export-sessions]");
  if (exportSessions) downloadSessions(exportSessions.dataset.exportSessions);

  // Clear click log
  if (event.target.closest("[data-clear-log]")) {
    clickLog = [];
    localStorage.removeItem(LOG_KEY);
    renderLog();
  }

  // Clear test sessions
  if (event.target.closest("[data-clear-sessions]")) {
    if (!confirm("Clear ALL tree test results? This cannot be undone.")) return;
    testSessions = [];
    localStorage.removeItem(SESSION_KEY);
    renderResults();
  }
});

window.addEventListener("hashchange", render);
render();
