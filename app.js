const data = window.HobbyAtlasData;

const app = document.querySelector('#app');
const categoryNav = document.querySelector('.category-nav');
const testBanner = document.querySelector('#test-banner');


const CATEGORY_BANNERS = {
  'outdoors':         'https://res.cloudinary.com/nxwrbcvt/image/upload/outdoors.jpg',
  'movement':         'https://res.cloudinary.com/nxwrbcvt/image/upload/movement.jpg',
  'home-garden':      'https://res.cloudinary.com/nxwrbcvt/image/upload/home_and_garden.jpg',
  'games':            'https://res.cloudinary.com/nxwrbcvt/image/upload/games.jpg?v=2',
  'creative-outlets': 'https://res.cloudinary.com/nxwrbcvt/image/upload/creative_outlet.jpg',
  'education-tech':   'https://res.cloudinary.com/nxwrbcvt/image/upload/education_and_tech.jpg?v=2'
};
const categoryById = Object.fromEntries(data.categories.map((c) => [c.id, c]));
// Recursively build facetById to handle nested facets (e.g. Art > Craft >
// Needle & Thread)
function collectAllFacets(category, facets, parentFacetId = null) {
  return facets.flatMap(
      (f) => [
          [f.id, {...f, category, parentFacetId}],
          ...(f.facets ? collectAllFacets(category, f.facets, f.id) : []),
  ]);
}
const facetById = Object.fromEntries(
    data.categories.flatMap((c) => collectAllFacets(c, c.facets || [])));

// Build hobby → top-level facet reverse map for search result chips.
// For categories with facets, maps each hobby to its direct child-of-category
// facet. For flat categories (no facets), maps the hobby to the category itself
// as the chip.
var hobbyTopFacetMap = {};  // name → [{id, label, categoryId}]
var _prevHash = '';  // previous hash before last navigation, for breadcrumbs
data.categories.forEach(function(cat) {
  if (cat.facets && cat.facets.length) {
    cat.facets.forEach(function(facet) {
      collectFacetCards(facet).forEach(function(name) {
        if (!hobbyTopFacetMap[name]) hobbyTopFacetMap[name] = [];
        if (!hobbyTopFacetMap[name].some(function(f) {
              return f.id === facet.id;
            })) {
          hobbyTopFacetMap[name].push(
              {id: facet.id, label: facet.label, categoryId: cat.id});
        }
      });
    });
  } else {
    (cat.cards || []).forEach(function(name) {
      if (!hobbyTopFacetMap[name]) hobbyTopFacetMap[name] = [];
      if (!hobbyTopFacetMap[name].some(function(f) {
            return f.id === cat.id;
          })) {
        hobbyTopFacetMap[name].push(
            {id: cat.id, label: cat.label, categoryId: cat.id});
      }
    });
  }
});

// ─── URL mode detection ────────────────────────────────────────────────────
// ?test    → participant tree test session
// ?results → researcher results view
// (none)   → normal wireframe browse
const urlParams = new URLSearchParams(location.search);
const MODE = urlParams.has('test') ? 'test' :
    urlParams.has('results')       ? 'results' :
                                     'normal';

// ─── Google Sheet endpoint ─────────────────────────────────────────────────
// After deploying your Apps Script, paste the URL here and remove the
// placeholder.
const SHEET_URL =
    'https://script.google.com/macros/s/AKfycbzPNko8YFVoGak5NbCTDil8kTCZYZ4h7qdIJ5d4azeVacmJsvTSQwPie7gYI5n349tM/exec';

async function postToSheet(record) {
  if (!SHEET_URL || SHEET_URL.startsWith('PASTE')) return;
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.warn(
        'Sheet POST failed — data is still safe in localStorage:', err);
  }
}

// ─── Storage keys ──────────────────────────────────────────────────────────
const LOG_KEY = 'hobby-atlas-click-log';
const SESSION_KEY = 'hobby-atlas-test-sessions';

let clickLog = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
let testSessions = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');

// ─── Active test session state ─────────────────────────────────────────────
// phase: "preview"    → task card is showing; timer not yet started
//        "navigating" → participant is in the tree; timer running
let activeSession = null;
let activeSearchQuery = '';

// ─── Build category nav ────────────────────────────────────────────────────
categoryNav.innerHTML =
    data.categories
        .map((category) => {
          const facetLinks =
              (category.facets || [])
                  .map(
                      (facet) => `<a href="#category/${category.id}/${
                          facet.id}" data-log="Open ${
                          escapeHtml(
                              facet.label)}" data-log-destination="category/${
                          category.id}/${facet.id}">${
                          escapeHtml(facet.label)}</a>`)
                  .join('');
          return `<div class="category-menu${
              category.facets ? ' has-facets' : ''}">
    <a class="category-button" href="#category/${category.id}" data-log="Open ${
              escapeHtml(category.label)}" data-log-destination="category/${
              category.id}">${escapeHtml(category.label)}</a>
    ${
              facetLinks ?
                  `<div class="facet-menu" aria-label="${
                      escapeHtml(category.label)} facets">${facetLinks}</div>` :
                  ''}
  </div>`;
        })
        .join('');

// Hide researcher-only nav links from participants
if (MODE === 'test') {
  document
      .querySelectorAll('[data-view-link=\'about\'], [data-view-link=\'log\']')
      .forEach(el => {
        el.style.display = 'none';
      });
}

// ─── Utilities ─────────────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
                                             '&': '&amp;',
                                             '<': '&lt;',
                                             '>': '&gt;',
                                             '"': '&quot;',
                                             '\'': '&#039;'
                                           })[c]);
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
function recordClick(label, destination, query = '') {
  const entry = {
    timestamp: new Date().toISOString(),
    type: 'click',
    label,
    destination,
    query: query || null
  };
  clickLog.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(clickLog));
  // Only log to session path while actively navigating (not during task
  // preview)
  if (activeSession && activeSession.phase === 'navigating') {
    activeSession.path.push(
        {label, destination, elapsed: Date.now() - activeSession.taskStart});
  }
}

// ─── Test banner (visible during navigation phase only) ───────────────────
function updateTestBanner() {
  if (MODE !== 'test' || !activeSession ||
      activeSession.phase !== 'navigating') {
    testBanner.hidden = true;
    return;
  }
  const task = activeSession.tasks[activeSession.currentTask];
  const taskNum = activeSession.currentTask + 1;
  const total = activeSession.tasks.length;
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
  if (MODE !== 'test' || !activeSession || activeSession.phase !== 'navigating')
    return '';
  return `<div class="answer-zone">
    <p class="answer-prompt">Is this where you would find it?</p>
    <button class="wire-button answer-btn" data-answer="${
      escapeHtml(destination)}">✓ This is my answer</button>
  </div>`;
}

// ─── Test session management ───────────────────────────────────────────────
function startTest(participantName) {
  activeSession = {
    participant: participantName.trim(),
    tasks: shuffleArray([...data.tasks]),
    currentTask: 0,
    phase: 'preview',
    path: [],
    taskStart: null,
    sessionStart: new Date().toISOString(),
  };
  renderTaskPreview();
}

function beginTask() {
  if (!activeSession) return;
  activeSession.phase = 'navigating';
  activeSession.taskStart = Date.now();
  activeSession.path = [];
  updateTestBanner();
  location.hash = 'browse';
  render();
}

function finishTask(gaveUp, finalDestination) {
  if (!activeSession) return;
  const task = activeSession.tasks[activeSession.currentTask];
  const path = activeSession.path;
  const elapsed = Date.now() - (activeSession.taskStart || Date.now());

  const dest = finalDestination ||
      (path.length ? path[path.length - 1].destination : null);
  const normDest = dest ? decodeURIComponent(dest) : null;
  const success = !gaveUp && task.targets.some(t => normDest === t);

  const record = {
    participant: activeSession.participant,
    sessionStart: activeSession.sessionStart,
    taskId: task.id,
    taskText: task.text,
    targetLabel: task.targetLabel,
    firstClick: path[0]?.label || null,
    firstClickDest: path[0]?.destination || null,
    fullPath: path.map(p => p.label),
    finalDestination: normDest,
    elapsedMs: elapsed,
    gaveUp,
    success,
    timestamp: new Date().toISOString(),
  };

  testSessions.push(record);
  localStorage.setItem(SESSION_KEY, JSON.stringify(testSessions));
  postToSheet(record);

  activeSession.currentTask++;
  activeSession.phase = 'preview';
  activeSession.path = [];
  testBanner.hidden = true;

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
        <p>You'll be asked to find ${
      data.tasks.length} things on a hobby site, one at a time.</p>
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
  document.querySelector('#participant-name')?.focus();
}

function renderTaskPreview() {
  if (!activeSession) return;
  const task = activeSession.tasks[activeSession.currentTask];
  const taskNum = activeSession.currentTask + 1;
  const total = activeSession.tasks.length;
  testBanner.hidden = true;
  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div><p class="label">Tree test</p><h1>Task ${taskNum} of ${
      total}</h1></div>
      <span class="view-label">?TEST MODE</span>
    </div>
    <div class="selection-page" style="margin-top:0">
      <div class="selection-box">
        <p style="font-size:18px;line-height:1.5;margin-bottom:16px">${
      escapeHtml(task.text)}</p>
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
        <p>You've finished all ${
      data.tasks.length} tasks. Your responses have been recorded.</p>
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

  const taskRows =
      data.tasks
          .map((task, i) => {
            const rows = testSessions.filter(r => r.taskId === task.id);
            if (!rows.length) {
              return `<tr><td>${i + 1}</td><td>${
                  escapeHtml(
                      task.text)}</td><td>${escapeHtml(task.targetLabel)}</td>
        <td colspan="6" style="color:#666">No data yet</td></tr>`;
            }
            const firstClicks = {};
            const dests = {};
            rows.forEach(r => {
              if (r.firstClick)
                firstClicks[r.firstClick] =
                    (firstClicks[r.firstClick] || 0) + 1;
              if (r.finalDestination)
                dests[r.finalDestination] =
                    (dests[r.finalDestination] || 0) + 1;
            });
            const topFC =
                Object.entries(firstClicks).sort((a, b) => b[1] - a[1])[0];
            const topDest =
                Object.entries(dests).sort((a, b) => b[1] - a[1])[0];
            const giveUps = rows.filter(r => r.gaveUp).length;
            const successes = rows.filter(r => r.success).length;
            const successPct = Math.round((successes / rows.length) * 100);
            const avgSec = Math.round(
                rows.reduce((s, r) => s + r.elapsedMs, 0) / rows.length / 1000);
            return `<tr>
      <td>${i + 1}</td>
      <td>${escapeHtml(task.text)}</td>
      <td>${escapeHtml(task.targetLabel)}</td>
      <td>${rows.length}</td>
      <td>${topFC ? `${escapeHtml(topFC[0])} (${topFC[1]})` : '—'}</td>
      <td>${topDest ? `${escapeHtml(topDest[0])} (${topDest[1]})` : '—'}</td>
      <td>${successPct}%</td>
      <td>${giveUps}</td>
      <td>${avgSec}s</td>
    </tr>`;
          })
          .join('');

  const rawRows = testSessions
                      .map(r => `<tr>
      <td>${escapeHtml(r.participant)}</td>
      <td>${escapeHtml(r.taskId)}</td>
      <td>${escapeHtml(r.firstClick || '—')}</td>
      <td>${escapeHtml((r.fullPath || []).join(' → ') || '—')}</td>
      <td>${escapeHtml(r.finalDestination || '—')}</td>
      <td>${Math.round((r.elapsedMs || 0) / 1000)}s</td>
      <td>${r.gaveUp ? 'Yes' : 'No — finished'}</td>
      <td>${r.success ? '✓' : '✗'}</td>
    </tr>`).join('') ||
      `<tr><td colspan="8">No sessions recorded yet. Run <code>?test</code> with participants first.</td></tr>`;

  app.innerHTML = `<div class="page">
    <div class="page-heading">
      <div>
        <p class="label">Research instrument</p>
        <h1>Tree test results</h1>
        <p>${testSessions.length} task result${
      testSessions.length === 1 ? '' :
                                  's'} from ${participants.length} participant${
      participants.length === 1 ? '' : 's'}.</p>
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
  if (format === 'json') {
    content = JSON.stringify(testSessions, null, 2);
  } else {
    const headers = [
      'participant', 'sessionStart', 'taskId', 'taskText', 'targetLabel',
      'firstClick', 'firstClickDest', 'fullPath', 'finalDestination',
      'elapsedMs', 'gaveUp', 'success', 'timestamp'
    ];
    const rows = testSessions.map(
        r => headers
                 .map(h => {
                   const v =
                       h === 'fullPath' ? (r.fullPath || []).join(' → ') : r[h];
                   return `"${String(v ?? '').replaceAll('"', '""')}"`;
                 })
                 .join(','));
    content = [headers.join(','), ...rows].join('\n');
  }
  const blob = new Blob(
      [content], {type: format === 'json' ? 'application/json' : 'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hobby-atlas-tree-test.${format}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── Normal wireframe views ────────────────────────────────────────────────

function searchForm() {
  return `<form class="search-form" data-search-form role="search">
    <label class="sr-only" for="site-search">Search hobbies</label>
    <input id="site-search" type="search" name="q" placeholder="Try “creative,” “outdoorsy,” or “relaxing”…" autocomplete="off" />
    <button type="submit" class="search-form__icon-btn" aria-label="Search"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/></svg></button>
  </form>`;
}

function groupBlock(group) {
  var img = CATEGORY_BANNERS[group.id] || '';
  var imgStyle = img ? ' style="background-image:url(' + img + ')"' : '';
  return '<a class="group-block cat-card" href="#category/' + group.id + '"' +
    ' data-log="Open ' + escapeHtml(group.label) + '"' +
    ' data-log-destination="category/' + group.id + '"' +
    ' data-cat-id="' + group.id + '">' +
    '<div class="cat-card__img"' + imgStyle + '></div>' +
    '<div class="cat-card__overlay"></div>' +
    '<div class="cat-card__content">' +
      '<h2 class="cat-card__title">' + escapeHtml(group.label) + '</h2>' +
      '<p class="cat-card__desc">' + escapeHtml(group.description || '') + '</p>' +

    '</div>' +
  '</a>';
}

// — typo card names are sized via CSS (26px); this function is a no-op kept
// for call-site compatibility in renderBrowse / renderCategory / renderSearch.
function fitTypoNames() {}

// ── Shared typographic card template (used by all views) ──────────────────
// extraAttrs: optional string of extra HTML attributes, e.g. data-f1="..."
// data-name="..."
function typoCard(name, href, blurb, extraAttrs, nameHtml, blurbHtml) {
  var attrs = extraAttrs ? (' ' + extraAttrs) : '';
  var dest = href.replace(/^#/, '');
  return '<a class="hot-card hot-card--typo"' + attrs + ' href="' + href + '"' +
      ' data-log="Open ' + escapeHtml(name) + '"' +
      ' data-log-destination="' + escapeHtml(dest) + '">' +
      '<p class="hot-card-typo__eyebrow"></p>' +
      '<p class="hot-card-typo__name">' + (nameHtml || escapeHtml(name)) + '</p>' +
      '<p class="hot-card-blurb hot-card-typo__blurb">' + (blurbHtml || escapeHtml(blurb)) +
      '</p>' +
      '</a>';
}


// ── Photo card template (hobby has an img URL) ───────────────────────────
// LQIP swap: called by onload on the tiny placeholder img.
// Loads the full image off-screen, then swaps src and removes blur.
function _lqipLoad(img) {
  var full = img.dataset.src;
  if (!full) return;
  delete img.dataset.src;
  var loader = new Image();
  loader.onload = function() {
    img.src = full;
    img.classList.add('card-img--loaded');
  };
  loader.src = full;
}

function photoCard(name, href, blurb, imgUrl, extraAttrs, nameHtml, blurbHtml) {
  var attrs = extraAttrs ? (' ' + extraAttrs) : '';
  var dest = href.replace(/^#/, '');
  // LQIP: tiny 20px blurred version loads instantly (~300 bytes)
  var lqipUrl = imgUrl.replace(
      'f_auto,q_auto,w_600,h_600,c_fill',
      'f_auto,q_10,w_20,h_20,c_fill,e_blur:500');
  return '<a class="hot-card hot-card--photo"' + attrs + ' href="' + href +
      '"' +
      ' data-log="Open ' + escapeHtml(name) + '"' +
      ' data-log-destination="' + escapeHtml(dest) + '">' +
      '<img class="card-img" src="' + escapeHtml(lqipUrl) + '" data-src="' +
      escapeHtml(imgUrl) + '" alt="' + escapeHtml(name) +
      '" onload="_lqipLoad(this)">' +
      '<div class="card-scrim"></div>' +
      '<div class="card-text">' +
      '<p class="card-name">' + (nameHtml || escapeHtml(name)) + '</p>' +
      '<p class="card-blurb-photo">' + (blurbHtml || escapeHtml(blurb)) + '</p>' +
      '</div>' +
      '</a>';
}

function renderBrowse() {
  const hotList = [
    {label: 'Mahjong', key: 'Mahjong', rank: 'No. 01', demoStyle: 'typo'},
    {label: 'Pickleball', key: 'Pickleball', rank: 'No. 02', demoStyle: 'typo'},
    {
      label: 'Scrapbooking',
      key: 'Scrapbooking',
      rank: 'No. 03',
      demoStyle: 'typo'
    },
    {
      label: 'Hiking',
      key: 'Hiking/Trail Walking',
      rank: 'No. 04',
      demoStyle: 'typo'
    },
    {
      label: 'Snowshoeing',
      key: 'Snowshoeing',
      rank: 'No. 05',
      demoStyle: 'typo'
    },
    {label: 'Sourdough', key: 'Sourdough', rank: 'No. 06', demoStyle: 'typo'},
    {
      label: 'Gaming',
      key: 'Video Games',
      destination: 'category/games',
      rank: 'No. 07',
      demoStyle: 'typo'
    },
    {label: 'Thrifting', key: 'Thrifting', rank: 'No. 08', demoStyle: 'typo'},
    {
      label: 'Photography',
      key: 'Photography',
      rank: 'No. 09',
      demoStyle: 'typo'
    },
    {label: 'Yoga', key: 'Yoga', rank: 'No. 10', demoStyle: 'typo'},
  ];

  function makeCard({label, key, destination, rank, demoStyle}) {
    const hobby = data.hobbies[key] || {};
    const dest = destination || `hobby/${encodeURIComponent(key)}`;
    const href = `#${dest}`;
    const log = `Open ${escapeHtml(label)}`;

    if (hobby.img) {
      return photoCard(label, href, hobby.blurb || '', hobby.img);
    }

    if (demoStyle === 'overlay') {
      return `<a class="hot-card hot-card--overlay" href="${href}"
        data-log="${log}" data-log-destination="${dest}"
        style="background-image:url('${img}')">
        <div class="hot-card__scrim"></div>
        <p class="label hot-card-label">${escapeHtml(label)}</p>
        <p class="hot-card-blurb">${escapeHtml(hobby.blurb || '')}</p>
      </a>`;
    }

    if (demoStyle === 'typo') {
      return `<a class="hot-card hot-card--typo" href="${href}"
        data-log="${log}" data-log-destination="${dest}">
        <p class="label hot-card-label hot-card-typo__eyebrow">${
          escapeHtml(rank || '')}</p>
        <p class="hot-card-typo__name">${escapeHtml(label)}</p>
        <p class="hot-card-blurb hot-card-typo__blurb">${
          escapeHtml(hobby.blurb || '')}</p>
      </a>`;
    }

    if (demoStyle === 'split') {
      return `<a class="hot-card hot-card--split" href="${href}"
        data-log="${log}" data-log-destination="${dest}">
        <div class="hot-card__img" style="background-image:url('${img}')"></div>
        <div class="hot-card__text">
          <p class="label hot-card-label">${escapeHtml(label)}</p>
          <p class="hot-card-blurb">${escapeHtml(hobby.blurb || '')}</p>
        </div>
      </a>`;
    }

    return `<a class="hot-card" href="${href}"
      data-log="${log}" data-log-destination="${dest}">
      <p class="label hot-card-label">${escapeHtml(label)}</p>
      <p class="hot-card-blurb">${escapeHtml(hobby.blurb || '')}</p>
    </a>`;
  }

  // Clone buffer: last 3 real cards prepended, first 3 appended — enables
  // seamless infinite loop
  const CLONE = 3;
  const realHtml = hotList.map(makeCard).join('');
  const headClone = hotList.slice(-CLONE).map(makeCard).join('');
  const tailClone = hotList.slice(0, CLONE).map(makeCard).join('');
  const _catItems = data.categories.map(groupBlock);
  const _catRows = [];
  for (var _ri = 0; _ri < _catItems.length; _ri += 3) {
    _catRows.push('<div class="cat-row">' + _catItems.slice(_ri, _ri + 3).join('') + '</div>');
  }
  const categoryCards = _catRows.join('');

  app.innerHTML = `<div class="page hot-list-page">
    <div class="hot-list-hero">
      <div class="hot-list-header">
        <h1 class="hot-list-title">Your next <span style="color:var(--teal-shade)">hobby</span> is in here.</h1>
      </div>
      <div class="carousel-wrap">
        <button class="carousel-btn carousel-prev" aria-label="Previous hobbies"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div class="carousel-viewport">
          <div class="carousel-track" id="carousel-track">
            <div class="carousel-inner" id="carousel-inner">${headClone}${
      realHtml}${tailClone}</div>
          </div>
        </div>
        <button class="carousel-btn carousel-next" aria-label="Next hobbies"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>
      </div>
    </div>
    <section class="home-categories">
      <div class="section-title">
        <h2>Explore all categories</h2>
      </div>
      <div class="group-list">${categoryCards}</div>
      <div class="cat-explore-all">
        <a class="see-all-hobbies" href="#hobbies" data-log="See all hobbies" data-log-destination="hobbies">Explore all hobbies</a>
      </div>
    </section>
    <div class="hot-list-search-band">
      <div class="hot-list-search-layout">
        <div class="hot-list-search-copy">
          <p class="hot-list-search-prompt">Not seeing your thing? Search for it.</p>
          ${searchForm()}
        </div>
      </div>
    </div>
  </div>`;

  // — category card row-flex expand on hover —
  (function() {
    var grid = app.querySelector('.home-categories .group-list');
    if (!grid) return;
    var cards = Array.from(grid.querySelectorAll('.cat-card'));
    var hoverTimer = null;
    var currentCard = null;

    var DELAY = 300;

    function activate(card) {
      if (currentCard === card) return;
      deactivate();
      currentCard = card;
      card.classList.add('is-hovered');
      var row = card.closest('.cat-row');
      if (row) row.classList.add('has-hovered');
    }

    function deactivate() {
      if (!currentCard) return;
      currentCard.classList.remove('is-hovered');
      var row = currentCard.closest('.cat-row');
      if (row) row.classList.remove('has-hovered');
      currentCard = null;
    }

    cards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function() { activate(card); }, DELAY);
      });
      card.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimer);
      });
    });

    grid.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimer);
      deactivate();
    });
  })();

  // fitTypoNames is defined at module level — called below after layout

  // — infinite sliding carousel —
  const PER_PAGE = 4;
  const GAP = 14;
  const TOTAL = hotList.length;  // 10 real cards
  const SNAP_LO = CLONE;         // 3  — first real position
  const SNAP_HI =
      CLONE + TOTAL;  // 13 — first position fully in right clone zone
  let idx = CLONE;    // start at first real card
  let busy = false;

  const trackEl = document.getElementById('carousel-track');
  const innerEl = document.getElementById('carousel-inner');
  const prevBtn = app.querySelector('.carousel-prev');
  const nextBtn = app.querySelector('.carousel-next');

  const PEEK = 40;  // px of adjacent card visible on each edge
  const wrapEl = app.querySelector('.carousel-wrap');

  function setCardWidth() {
    const cardW = (trackEl.offsetWidth - GAP * (PER_PAGE - 1) - 2 * PEEK) / PER_PAGE;
    trackEl.style.setProperty('--card-w', cardW + 'px');
    wrapEl.style.setProperty('--card-w', cardW + 'px');
  }

  function moveTo(newIdx, animate) {
    idx = newIdx;
    const cardW =
        parseFloat(getComputedStyle(trackEl).getPropertyValue('--card-w'));
    const offset = idx * (cardW + GAP) - PEEK;
    if (!animate) {
      innerEl.style.transition = 'none';
      innerEl.style.transform = `translateX(-${offset}px)`;
      innerEl.offsetHeight;  // force reflow
      innerEl.style.transition = '';
    } else {
      innerEl.style.transform = `translateX(-${offset}px)`;
    }
  }

  function slide(dir) {
    if (busy) return;
    busy = true;
    moveTo(idx + dir, true);
    setTimeout(() => {
      // After animation, snap to real zone if we landed in a clone zone
      if (idx < SNAP_LO) moveTo(idx + TOTAL, false);
      if (idx >= SNAP_HI) moveTo(idx - TOTAL, false);
      busy = false;
    }, 370);  // just after CSS transition (350ms)
  }

  setCardWidth();
  moveTo(CLONE, false);
  requestAnimationFrame(function() {
    fitTypoNames(app, true);
  });  // run after layout so clientWidth is real
  window.addEventListener('resize', () => {
    setCardWidth();
    moveTo(idx, false);
    requestAnimationFrame(function() {
      fitTypoNames(app, true);
    });
  });

  prevBtn.addEventListener(
      'click',
      () => slide(-1));  // left arrow → strip moves right → earlier cards
  nextBtn.addEventListener(
      'click',
      () => slide(+1));  // right arrow → strip moves left → later cards

  // ── Trackpad horizontal swipe (wheel events) ───────────────────────────
  let wheelAccum = 0;
  let wheelTimer = null;

  trackEl.addEventListener('wheel', (e) => {
    // Only handle predominantly horizontal scroll (trackpad swipe)
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();

    wheelAccum += e.deltaX;

    // Reset accumulator after swipe gesture ends
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { wheelAccum = 0; }, 200);

    const threshold = 80;
    if (wheelAccum > threshold) {
      wheelAccum = 0;
      slide(+1);
    } else if (wheelAccum < -threshold) {
      wheelAccum = 0;
      slide(-1);
    }
  }, { passive: false });

  // ── Touch swipe (mobile) ─────────────────────────────────────────────────
  let touchStartX = null;

  trackEl.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  trackEl.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 40) return;
    slide(dx < 0 ? +1 : -1);
  });
}

function renderAllHobbies() {
  const cards = [...data.allHobbies].sort((a, b) => a.localeCompare(b)).map((name) => {
    const hobby = data.hobbies[name] || {};
    const href = '#hobby/' + encodeURIComponent(name);
    if (hobby.img) return photoCard(name, href, hobby.blurb || '', hobby.img);
    return typoCard(name, href, hobby.blurb || '');
  }).join('');

  app.innerHTML = `<div class="page all-hobbies-page">
    <div class="page-heading">
      <div>
        <p class="label">The full collection</p>
        <h1>All hobbies</h1>
      </div>
      <span class="view-label">${data.allHobbies.length} ideas</span>
    </div>
    <div class="all-hobbies-grid outdoors-grid">${cards}</div>
  </div>`;
}

// Levenshtein edit distance for fuzzy matching
function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > 3) return 99;
  const dp = [];
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = i === 0 ? j :
        a[i-1] === b[j-1] ? dp[i-1][j-1] :
        1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  return dp[a.length][b.length];
}

// Wrap matching text in <mark> for search result highlighting.
// Escapes the source text safely, then annotates matches.
function highlightText(text, query) {
  if (!text || !query) return escapeHtml(text || '');
  var safe = escapeHtml(text);
  var terms = [];
  var fullQ = query.trim().toLowerCase();
  if (fullQ) terms.push(fullQ);
  fullQ.split(/\s+/).forEach(function(w) {
    if (w.length > 2 && terms.indexOf(w) < 0) terms.push(w);
  });
  // Sort longest first so multi-word phrases highlight before single words
  terms.sort(function(a, b) { return b.length - a.length; });
  terms.forEach(function(term) {
    var safeT = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    safe = safe.replace(new RegExp('(' + safeT + ')', 'gi'), '<mark class="search-hl">$1</mark>');
  });
  return safe;
}

// Words that carry no hobby-search meaning — filtered out of phrases
var SEARCH_STOP_WORDS = new Set([
  'i','me','my','myself','we','our','us','you','your',
  'want','need','like','love','try','find','get','give','feel','make',
  'looking','searching','wondering','thinking',
  'to','do','todo','did','does','done','doing',
  'a','an','the','and','or','but','in','on','at','for','of','with',
  'is','are','was','were','be','been','being','have','has','had',
  'can','could','would','should','will','may','might',
  'that','this','these','those','it','its','there','their',
  'some','any','all','other','more','most','so','very','just',
  'really','quite','how','what','when','where','which','who',
  'something','anything','everything','nothing','stuff','things','thing',
  'new','good','fun','cool','interesting','nice','great','kind','type','sort',
  'hobby','hobbies','activity','activities','idea','ideas',
  'free','cheap','inexpensive','affordable','economical','budget','low','cost',
  'price','low-cost','low-price','no-cost','zero-cost','little','money',
  'without','spending','zero'
]);

function getCostSearchIntent(query) {
  const normalized = query.trim().toLowerCase();
  if (/(^|\s)(free|no[- ]?cost|zero[- ]?cost)(\s|$)/.test(normalized) ||
      /without (spending|money)/.test(normalized)) {
    return 'free';
  }
  if (/(^|\s)(cheap|inexpensive|affordable|economical|budget)(\s|$)/.test(normalized) ||
      /\blow[- ]cost\b|\blow[- ]price\b|\blittle money\b|\bon a budget\b/.test(normalized)) {
    return 'low';
  }
  return '';
}

function searchMatches(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const costIntent = getCostSearchIntent(normalized);
  const terms = normalized.split(/\s+/).filter(t => t.length > 0);

  // Strip filler/stop words to get the meaningful signal words
  // e.g. "I want todo something creative" → ["creative"]
  const meaningfulTerms = terms.filter(t => t.length > 1 && !SEARCH_STOP_WORDS.has(t));
  // Fall back to all terms only if every word was a stop word
  const activeTerms = meaningfulTerms.length > 0 ? meaningfulTerms :
      (costIntent ? [] : terms);

  // Expand concepts: collect all concept terms that match the query or any meaningful term
  const conceptHits = Object.entries(data.searchConcepts)
    .filter(([term, synonyms]) =>
      normalized === term || synonyms.some(s => normalized === s) ||
      synonyms.some(s => s.includes(normalized)) || normalized.includes(term) ||
      activeTerms.some(t => term === t || synonyms.some(s => s.includes(t)) || t.includes(term)))
    .flatMap(([term, synonyms]) => [term, ...synonyms]);

  const matches = data.allHobbies.filter((name) => {
    const hobby = data.hobbies[name];
    const details = data.hobbyDetails[name];
    const category = categoryById[hobby.category];
    if (costIntent === 'free' && details?.cost !== 'free') return false;
    if (costIntent === 'low' && !['free', '$'].includes(details?.cost)) {
      return false;
    }
    // Extended haystack: blurb, tags, startingPoint, related hobbies, category
    const haystack = [
      name,
      hobby.blurb,
      hobby.summary,
      hobby.startingPoint,
      ...(hobby.tags || []),
      ...(hobby.related || []),
      category?.label,
      ...(data.searchConcepts[normalized] || []),
    ].filter(Boolean).join(' ').toLowerCase();

    // 1. Exact substring match on full query
    if (haystack.includes(normalized)) return true;

    // 2. Concept/synonym match
    if (conceptHits.some(t => haystack.includes(t))) return true;

    // 3. Each meaningful word must match (exact or fuzzy) somewhere in haystack
    //    Using activeTerms drops fillers like "want", "something", "todo"
    const haystackWords = haystack.split(/\W+/).filter(w => w.length > 1);
    return activeTerms.every(term => {
      if (term.length <= 2) return haystack.includes(term);
      if (haystack.includes(term)) return true;
      // Allow 1 typo for 4-6 char words, 2 for 7+ char words
      const maxDist = term.length <= 6 ? 1 : 2;
      return haystackWords.some(hw => levenshtein(term, hw) <= maxDist);
    });
  });

  if (costIntent) {
    const costRank = {free: 0, '$': 1};
    matches.sort((a, b) =>
      (costRank[data.hobbyDetails[a]?.cost] ?? 2) -
      (costRank[data.hobbyDetails[b]?.cost] ?? 2));
  }
  return matches;
}

function logSearch(query, resultCount) {
  const entry =
      {timestamp: new Date().toISOString(), type: 'search', query, resultCount};
  clickLog.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(clickLog));
}

function renderSearch(query, facetId) {
  if (facetId === undefined) facetId = '';
  activeSearchQuery = query;
  var allResults = searchMatches(query);
  // Filter by top-level facet (or category for flat categories), not by
  // category
  var results = allResults.filter(function(name) {
    if (!facetId) return true;
    var facets = hobbyTopFacetMap[name] || [];
    return facets.some(function(f) {
      return f.id === facetId;
    });
  });

  // Collect unique top-level facets represented in ALL results for filter chips
  var seenFacets = {};
  var chips = [];
  allResults.forEach(function(name) {
    (hobbyTopFacetMap[name] || []).forEach(function(f) {
      if (!seenFacets[f.id]) {
        seenFacets[f.id] = true;
        chips.push(f);
      }
    });
  });

  // Hero — pre-filled search bar so users can refine from results
  var hero = '<div class="category-hero search-hero">' +
      '<form class="search-form search-form--results" data-search-form role="search">' +
      '<label class="sr-only" for="sr-refine-input">Refine search</label>' +
      '<input id="sr-refine-input" type="search" name="q" value="' + escapeHtml(query) + '" autocomplete="off" />' +
      '<button type="submit" class="search-form__icon-btn" aria-label="Search">' +
      '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/></svg>' +
      '</button></form>' +
      '<p class="search-hero__label">' +
      (results.length ? results.length + ' result' + (results.length === 1 ? '' : 's') : 'No results') +
      ' for &ldquo;' + escapeHtml(query) + '&rdquo;</p>' +
      '</div>';

  // Filter chips by top-level facet (or category for flat categories)
  var chipsHtml = '<div class="facet-filter-row">';
  chipsHtml += '<a class="facet-chip-btn' + (!facetId ? ' active' : '') +
      '" href="#search/' + encodeURIComponent(query) + '">All</a>';
  chips.forEach(function(chip) {
    chipsHtml += '<a class="facet-chip-btn' +
        (facetId === chip.id ? ' active' : '') + '" href="#search/' +
        encodeURIComponent(query) + '/' + chip.id + '">' +
        escapeHtml(chip.label) + '</a>';
  });
  chipsHtml +=
      '<label class="outdoors-search" aria-label="Filter these results">' +
      '<svg class="outdoors-search__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/></svg>' +
      '<input id="sr-filter-input" type="search" placeholder="Filter results\u2026" autocomplete="off" />' +
      '</label>' +
      '</div>';

  // Cards grid using hot-card--split (same template as category pages)
  var cardsHtml = '';
  if (results.length) {
    cardsHtml = '<div class="outdoors-grid">';
    results.forEach(function(name) {
      var hobby = data.hobbies[name] || {};
      var kwRaw = name.replace(/\/.*/, '').trim();
      var kw = encodeURIComponent(kwRaw);
      var img = 'https://source.unsplash.com/400x400/?' + kw;
      var href = '#hobby/' + encodeURIComponent(name);
      var blurb = hobby.blurb || '';
      var hName = highlightText(name, query);
      var hBlurb = highlightText(blurb, query);
      if (hobby.img) {
        cardsHtml +=
            photoCard(
                name, href, blurb, hobby.img,
                'data-name="' + name.toLowerCase() + '" class="outdoors-card"',
                hName, hBlurb)
                .replace(
                    'class="hot-card hot-card--photo"',
                    'class="hot-card hot-card--photo outdoors-card"');
      } else {
        cardsHtml +=
            typoCard(
                name, href, blurb,
                'data-name="' + name.toLowerCase() + '" class="outdoors-card"',
                hName, hBlurb)
                .replace(
                    'class="hot-card hot-card--typo"',
                    'class="hot-card hot-card--typo outdoors-card"');
      }
    });
    cardsHtml += '</div>';
  } else {
    // Build smart suggestions: hobbies that partially match, or popular picks
    var partialMatches = (function() {
      var q = query.trim().toLowerCase();
      if (!q) return [];
      // Try single-word fragments of query against hobby names/blurbs
      var words = q.split(/\s+/).filter(function(w) { return w.length > 2; });
      var scored = data.allHobbies.map(function(name) {
        var hobby = data.hobbies[name];
        var hay = [name, hobby.blurb, hobby.startingPoint, (hobby.tags||[]).join(' ')].filter(Boolean).join(' ').toLowerCase();
        var score = 0;
        words.forEach(function(w) { if (hay.includes(w)) score += 2; });
        // Fuzzy single-char tolerance on the hobby name
        if (q.length > 3) {
          var nameLow = name.toLowerCase();
          var dist = levenshtein(q, nameLow);
          if (dist <= 2) score += (3 - dist);
        }
        return { name: name, score: score };
      }).filter(function(r) { return r.score > 0; });
      scored.sort(function(a,b) { return b.score - a.score; });
      return scored.slice(0, 5).map(function(r) { return r.name; });
    })();

    var suggestionLinks = '';
    if (partialMatches.length > 0) {
      suggestionLinks = '<p class="no-results-hint">Did you mean one of these?</p><div class="no-results-suggestions">' +
        partialMatches.map(function(name) {
          return '<a class="suggestion-chip" href="#hobby/' + encodeURIComponent(name) + '">' + name + '</a>';
        }).join('') + '</div>';
    } else {
      // Fall back to a few popular picks from different categories
      var fallbacks = ['Origami','Stargazing','Sourdough','Photography','Watercolor painting'];
      suggestionLinks = '<p class="no-results-hint">Try exploring one of these:</p><div class="no-results-suggestions">' +
        fallbacks.map(function(name) {
          return '<a class="suggestion-chip" href="#hobby/' + encodeURIComponent(name) + '">' + name + '</a>';
        }).join('') + '</div>';
    }

    cardsHtml = '<section class="no-results">' +
        '<p class="label">No results for &ldquo;' + query.trim() + '&rdquo;</p>' +
        '<h2>Nothing matched — yet</h2>' +
        '<p>Try checking your spelling, or use a broader term like the activity or material involved.</p>' +
        suggestionLinks +
        '<a class="wire-button" href="#browse" data-log="Return to explore" data-log-destination="browse">Return to explore</a>' +
        '</section>';
  }

  app.innerHTML = '<div class="page outdoors-page">' + hero +
      answerButton('search/' + encodeURIComponent(query)) + chipsHtml +
      cardsHtml + '</div>';

  requestAnimationFrame(function() {
    fitTypoNames(app, false);
  });

  var srInput = document.getElementById('sr-filter-input');
  if (srInput) {
    srInput.addEventListener('input', function() {
      var q = srInput.value.toLowerCase().trim();
      document.querySelectorAll('.outdoors-card').forEach(function(card) {
        card.style.display =
            (!q || card.dataset.name.includes(q)) ? '' : 'none';
      });
    });
  }
}

function renderCategory(id, preselectedF1, preselectedF2, preselectedF3) {
  var category = categoryById[id];
  if (!category) return renderBrowse();

  // ── Visual layout for all main categories (any with an eyebrow field) ──
  if (category.eyebrow) {
    // Map facetId → child facet array (any depth)
    var facetChildMap = {};
    function buildFacetChildMap(facets) {
      (facets || []).forEach(function(f) {
        if (f.facets && f.facets.length) {
          facetChildMap[f.id] = f.facets;
          buildFacetChildMap(f.facets);
        }
      });
    }
    buildFacetChildMap(category.facets);

    // Collect cards with three-level ancestry (f1=top, f2=mid, f3=leaf)
    function collectCards(facets, ancestors) {
      var result = [];
      (facets || []).forEach(function(facet) {
        var anc = ancestors.concat(facet.id);
        if (facet.cards && facet.cards.length) {
          facet.cards.forEach(function(name) {
            result.push({
              name: name,
              f1: anc[0] || facet.id,
              f2: anc[1] || anc[0] || facet.id,
              f3: anc[2] || anc[1] || anc[0] || facet.id,
              hobby: data.hobbies[name] || {}
            });
          });
        }
        if (facet.facets)
          collectCards(facet.facets, anc).forEach(function(i) {
            result.push(i);
          });
      });
      return result;
    }

    var allCards = category.facets ? collectCards(category.facets, []) :
                                     (category.cards || []).map(function(name) {
                                       return {
                                         name: name,
                                         f1: 'all',
                                         f2: 'all',
                                         f3: 'all',
                                         hobby: data.hobbies[name] || {}
                                       };
                                     });
    allCards = allCards.filter(function(item, index, cards) {
      return cards.findIndex(function(candidate) {
        return candidate.name === item.name;
      }) === index;
    }).sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    // Hero
    var CATEGORY_BANNERS = {
      'outdoors':          'https://res.cloudinary.com/nxwrbcvt/image/upload/outdoors.jpg',
      'movement':          'https://res.cloudinary.com/nxwrbcvt/image/upload/movement.jpg',
      'home-garden':       'https://res.cloudinary.com/nxwrbcvt/image/upload/home_and_garden.jpg',
      'games':             'https://res.cloudinary.com/nxwrbcvt/image/upload/games.jpg?v=2',
      'creative-outlets':  'https://res.cloudinary.com/nxwrbcvt/image/upload/creative_outlet.jpg',
      'education-tech':    'https://res.cloudinary.com/nxwrbcvt/image/upload/education_and_tech.jpg?v=2'
    };
    var bannerImg = CATEGORY_BANNERS[id];
    var hero;
    if (bannerImg) {
      hero = '<div class="category-hero category-hero--banner">' +
        '<div class="category-hero__img" style="background-image:url(' + bannerImg + ')"></div>' +
        '<div class="category-hero__overlay"></div>' +
        '<h1 class="category-hero__title category-hero__title--banner">' + escapeHtml(category.label) + '</h1>' +
        '</div>';
    } else {
      hero = '<div class="category-hero">' +
        '<h1 class="category-hero__title">' + escapeHtml(category.label) +
        '</h1>' +
        '</div>';
    }

    // Level-1 chip row + search bar + hidden sub-rows
    var hasFacets = category.facets && category.facets.length;
    var chipsHtml = '<div class="facet-filter-row" id="cat-chips">';
    chipsHtml += '<button class="facet-chip-btn active" data-facet="all">All</button>';
    if (hasFacets) {
      category.facets.forEach(function(facet) {
        chipsHtml += '<button class="facet-chip-btn" data-facet="' + facet.id +
            '">' + escapeHtml(facet.label) + '</button>';
      });
    }
    chipsHtml += '<label class="outdoors-search" aria-label="Search ' +
        escapeHtml(category.label) + '">' +
        '<svg class="outdoors-search__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/></svg>' +
        '<input id="cat-search-input" type="search" placeholder="Search ' +
        escapeHtml(category.label.toLowerCase()) +
        '\u2026" autocomplete="off" />' +
        '</label>' +
        '</div>';
    chipsHtml +=
        '<div class="facet-filter-row facet-sub-chips" id="sub-chips" hidden></div>';
    chipsHtml +=
        '<div class="facet-filter-row facet-sub-chips" id="sub-sub-chips" hidden></div>';

    // Cards grid — f1/f2/f3 data attributes for multi-level filtering
    var cardsHtml = '<div class="outdoors-grid" id="cat-grid">';
    allCards.forEach(function(item) {
      var href = '#hobby/' + encodeURIComponent(item.name);
      var blurb = item.hobby.blurb || '';
      var _extraAttrs = 'data-f1="' + item.f1 + '" data-f2="' + item.f2 +
          '" data-f3="' + item.f3 + '" data-name="' + item.name.toLowerCase() +
          '"';
      if (item.hobby.img) {
        cardsHtml += photoCard(
                         item.name, '#hobby/' + encodeURIComponent(item.name),
                         item.hobby.blurb || '', item.hobby.img,
                         _extraAttrs + ' class="outdoors-card"')
                         .replace(
                             'class="hot-card hot-card--photo"',
                             'class="hot-card hot-card--photo outdoors-card"');
      } else {
        cardsHtml +=
            typoCard(
                item.name, '#hobby/' + encodeURIComponent(item.name),
                item.hobby.blurb || '', _extraAttrs + ' class="outdoors-card"')
                .replace(
                    'class="hot-card hot-card--typo"',
                    'class="hot-card hot-card--typo outdoors-card"');
      }
    });
    cardsHtml += '</div>';

    app.innerHTML = '<div class="page outdoors-page">' + hero +
        answerButton('category/' + id) + chipsHtml + cardsHtml +
        '<div id="see-more-container"></div>' +
        '</div>';

    requestAnimationFrame(function() {
      fitTypoNames(app, false);
    });
    requestAnimationFrame(function() {
      applyCatFilter(false);
    });

    // Populate a sub-chip row from a facet's children, or hide it
    function setSubChips(rowId, facetId, parentLabel) {
      var row = document.getElementById(rowId);
      var children = facetId !== 'all' && facetChildMap[facetId];
      if (children) {
        var allLabel = parentLabel ? 'All ' + parentLabel : 'All';
        var html = '<button class="facet-chip-btn active" data-facet="all">' +
            allLabel + '</button>';
        children.forEach(function(f) {
          html += '<button class="facet-chip-btn" data-facet="' + f.id + '">' +
              escapeHtml(f.label) + '</button>';
        });
        row.innerHTML = html;
        row.hidden = false;
      } else {
        row.innerHTML = '';
        row.hidden = true;
      }
    }

    function applyCatFilter(resetCollapse) {
      var btn1 = document.querySelector('#cat-chips .facet-chip-btn.active');
      var btn2 = document.querySelector('#sub-chips .facet-chip-btn.active');
      var btn3 =
          document.querySelector('#sub-sub-chips .facet-chip-btn.active');
      var a1 = btn1 ? btn1.dataset.facet : 'all';
      var a2 = btn2 ? btn2.dataset.facet : 'all';
      var a3 = btn3 ? btn3.dataset.facet : 'all';
      var query = (document.getElementById('cat-search-input').value || '')
                      .toLowerCase()
                      .trim();
      var cards =
          Array.from(document.querySelectorAll('#cat-grid .outdoors-card'));

      var passing = cards.filter(function(card) {
        return (a1 === 'all' || card.dataset.f1 === a1) &&
            (a2 === 'all' || card.dataset.f2 === a2) &&
            (a3 === 'all' || card.dataset.f3 === a3) &&
            (!query || card.dataset.name.includes(query));
      });

      // Show all matching cards — no collapsing
      cards.forEach(function(card) { card.style.display = 'none'; });
      passing.forEach(function(card) { card.style.display = ''; });

      // Static scroll indicator — shows count of hobbies below, not a reveal button
      var container = document.getElementById('see-more-container');
      if (passing.length > 0) {
        var svgChevron = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';
        container.innerHTML =
          '<div class="scroll-indicator has-label">' +
          svgChevron +
          '<span>' + passing.length + ' hobb' + (passing.length === 1 ? 'y' : 'ies') + ' below</span>' +
          '</div>';
        // Hide indicator once user has scrolled past the fold
        function _checkScroll() {
          var el = container.querySelector('.scroll-indicator');
          if (!el || !el.isConnected) { window.removeEventListener('scroll', _checkScroll); return; }
          var scrolled = window.scrollY > (window.innerHeight * 0.4);
          var grid = document.querySelector('.outdoors-grid');
          var gridVisible = grid && grid.getBoundingClientRect().bottom <= window.innerHeight + 10;
          el.style.opacity = (scrolled || gridVisible) ? '0' : '';
          el.style.pointerEvents = (scrolled || gridVisible) ? 'none' : '';
        }
        window.addEventListener('scroll', _checkScroll, { passive: true });
        _checkScroll();
      } else {
        container.innerHTML = '';
      }
    }

    // Level-1 clicks — populate or hide sub-chip row
    document.getElementById('cat-chips').addEventListener('click', function(e) {
      var btn = e.target.closest('.facet-chip-btn');
      if (!btn) return;
      document.querySelectorAll('#cat-chips .facet-chip-btn')
          .forEach(function(b) {
            b.classList.toggle('active', b === btn);
          });
      setSubChips('sub-chips', btn.dataset.facet, btn.textContent.trim());
      var ss = document.getElementById('sub-sub-chips');
      ss.innerHTML = '';
      ss.hidden = true;
      history.replaceState(
          null, '', '#category/' + id + '/' + btn.dataset.facet);
      applyCatFilter(true);
    });

    // Level-2 clicks — populate or hide sub-sub-chip row
    document.getElementById('sub-chips').addEventListener('click', function(e) {
      var btn = e.target.closest('.facet-chip-btn');
      if (!btn) return;
      document.querySelectorAll('#sub-chips .facet-chip-btn')
          .forEach(function(b) {
            b.classList.toggle('active', b === btn);
          });
      setSubChips('sub-sub-chips', btn.dataset.facet, btn.textContent.trim());
      var _a1 =
          (document.querySelector('#cat-chips .facet-chip-btn.active') || {
            dataset: {facet: 'all'}
          }).dataset.facet;
      history.replaceState(
          null, '', '#category/' + id + '/' + _a1 + '/' + btn.dataset.facet);
      applyCatFilter(true);
    });

    // Level-3 clicks
    document.getElementById('sub-sub-chips')
        .addEventListener('click', function(e) {
          var btn = e.target.closest('.facet-chip-btn');
          if (!btn) return;
          document.querySelectorAll('#sub-sub-chips .facet-chip-btn')
              .forEach(function(b) {
                b.classList.toggle('active', b === btn);
              });
          var _a1b =
              (document.querySelector('#cat-chips .facet-chip-btn.active') || {
                dataset: {facet: 'all'}
              }).dataset.facet;
          var _a2b =
              (document.querySelector('#sub-chips .facet-chip-btn.active') || {
                dataset: {facet: 'all'}
              }).dataset.facet;
          history.replaceState(
              null, '',
              '#category/' + id + '/' + _a1b + '/' + _a2b + '/' +
                  btn.dataset.facet);
          applyCatFilter(true);
        });

    // Live search
    document.getElementById('cat-search-input')
        .addEventListener('input', function() {
          applyCatFilter(true);
        });

    // Pre-select facets from URL (up to three levels)
    if (preselectedF1 && preselectedF1 !== 'all') {
      var preBtn1 = document.querySelector(
          '#cat-chips .facet-chip-btn[data-facet="' + preselectedF1 + '"]');
      if (preBtn1) {
        document.querySelectorAll('#cat-chips .facet-chip-btn')
            .forEach(function(b) {
              b.classList.toggle('active', b === preBtn1);
            });
        setSubChips('sub-chips', preselectedF1, preBtn1.textContent.trim());
        if (preselectedF2 && preselectedF2 !== 'all') {
          var preBtn2 = document.querySelector(
              '#sub-chips .facet-chip-btn[data-facet="' + preselectedF2 + '"]');
          if (preBtn2) {
            document.querySelectorAll('#sub-chips .facet-chip-btn')
                .forEach(function(b) {
                  b.classList.toggle('active', b === preBtn2);
                });
            setSubChips(
                'sub-sub-chips', preselectedF2, preBtn2.textContent.trim());
            if (preselectedF3 && preselectedF3 !== 'all') {
              var preBtn3 = document.querySelector(
                  '#sub-sub-chips .facet-chip-btn[data-facet="' +
                  preselectedF3 + '"]');
              if (preBtn3) {
                document.querySelectorAll('#sub-sub-chips .facet-chip-btn')
                    .forEach(function(b) {
                      b.classList.toggle('active', b === preBtn3);
                    });
              }
            }
          }
        }
        applyCatFilter(true);
      }
    }

    return;
  }

  // All main categories use the eyebrow (visual layout) path above.
  // This fallback renders a simple card grid for any category without eyebrow.
  var fallbackCards = '';  // legacy fallback (no longer used)
  app.innerHTML = '<div class="page">' +
      '<a class="plain-link back-link" href="#browse" data-log="Back to categories" data-log-destination="browse">← Back to categories</a>' +
      '<div class="page-heading compact-heading"><div><p class="label">Activity category</p><h1>' +
      escapeHtml(category.label) + '</h1><p>' +
      escapeHtml(category.description) +
      '</p></div><span class="view-label">LEVEL 2</span></div>' +
      answerButton('category/' + id) +
      '<div class="hobby-grid category-grid">' + fallbackCards + '</div>' +
      '</div>';
}


// renderFacet removed — sub-facet pages are no longer linked from navigation.
// Deep facet data is retained in data.js for collectCards() to flatten into
// category pages. Any stale #facet/ URL redirects to browse.
function renderFacet(id) {
  const facet = facetById[id];
  // Redirect to the parent category page, pre-filtered to the top-level facet
  if (facet && facet.category) {
    window.location.replace('#category/' + facet.category.id);
  } else {
    renderBrowse();
  }
}

// ── Breadcrumb builder — parses _prevHash to get navigation trail ─────────
function buildBreadcrumbHtml(hobbyName) {
  var crumbs = [{ label: 'Home', href: '#browse' }];
  if (_prevHash) {
    var parts = _prevHash.slice(1).split('/');
    if (parts[0] === 'category' && parts[1]) {
      var catId = decodeURIComponent(parts[1]);
      var cat = categoryById[catId];
      if (cat) {
        crumbs.push({ label: cat.label, href: '#category/' + catId });
        if (parts[2]) {
          var f1Id = decodeURIComponent(parts[2]);
          var f1 = facetById[f1Id];
          if (f1) {
            crumbs.push({ label: f1.label, href: '#category/' + catId + '/' + f1Id });
            if (parts[3]) {
              var f2Id = decodeURIComponent(parts[3]);
              var f2 = facetById[f2Id];
              if (f2) {
                crumbs.push({ label: f2.label, href: '#category/' + catId + '/' + f1Id + '/' + f2Id });
              }
            }
          }
        }
      }
    }
  }
  crumbs.push({ label: hobbyName, href: null });
  return crumbs.map(function(c, i) {
    if (i === crumbs.length - 1) {
      return '<span class="breadcrumb__current">' + escapeHtml(c.label) + '</span>';
    }
    return '<a class="breadcrumb__link" href="' + c.href + '">' + escapeHtml(c.label) + '</a>' +
           '<span class="breadcrumb__sep">/</span>';
  }).join('');
}

function renderHobby(name) {
  const hobby = data.hobbies[name];
  if (!hobby) return renderBrowse();
  const category = categoryById[hobby.category];
  const introVideo = data.hobbyIntroVideos[name];
  const details = data.hobbyDetails[name];

  // In test mode: show only the name + answer button
  if (MODE === 'test') {
    app.innerHTML = `<div class="page">
      <button class="back-arrow" onclick="history.back()" aria-label="Go back">←</button>
      <article class="selection-page">
        <h1>${escapeHtml(name)}</h1>
        ${answerButton('hobby/' + name)}
      </article>
    </div>`;
    return;
  }

  const relatedCards = [...(hobby.related || [])]
                           .sort((a, b) => a.localeCompare(b))
                           .map(function(relName) {
                             const rel = data.hobbies[relName] || {};
                             const href =
                                 '#hobby/' + encodeURIComponent(relName);
                             if (rel.img)
                               return photoCard(
                                   relName, href, rel.blurb || '', rel.img);
                             return typoCard(relName, href, rel.blurb || '');
                           })
                           .join('');
  const introVideoLink = introVideo ?
      `<a class="hobby-intro-video" href="${escapeHtml(introVideo)}" target="_blank" rel="noopener noreferrer">Watch intro video</a>` :
      '';
  const costRanges = {
    free: 'Free',
    '$': '$10-$30',
    '$$': '$30-$100',
    '$$$': '$100+'
  };

  // ── Hobby detail redesign ──────────────────────────────────────────────────
  {
    const breadcrumbHtml = buildBreadcrumbHtml(name);
    const embedUrl = introVideo ? introVideo.replace('https://youtu.be/', 'https://www.youtube.com/embed/') : '';
    const imgUrl = hobby.img || '';
    const tileData = [
      {blur: 4.5, opacity: .68},
      {blur: 2.8, opacity: .8},
      {blur: 1.5, opacity: .9},
      {blur: .5, opacity: .97},
      {blur: 0, opacity: 1, control: true},
    ];
    const tilesHtml = tileData.map(function(t, index) {
      const extraClass = t.control ? ' collage-tile--control' : '';
      return `<div class="collage-tile${extraClass}" style="left:${index * 18}%;background-image:url('${escapeHtml(imgUrl)}');filter:blur(${t.blur}px);opacity:${t.opacity};"></div>`;
    }).join('');
    app.innerHTML = `<div class="page hobby-page hobby-page--redesign">
      <nav class="breadcrumb" aria-label="Breadcrumb">${breadcrumbHtml}</nav>
      <section class="hobby-collage-hero">
        <div class="collage-grid">${tilesHtml}</div>
        <div class="collage-overlay">
          <p class="collage-eyebrow">${escapeHtml(category ? category.label : 'Hobby')}</p>
          <h1 class="collage-title">${escapeHtml(name)}</h1>
          <p class="collage-subtitle">${escapeHtml(hobby.blurb || '')}</p>
        </div>
      </section>
      <div class="hobby-mid-row">
        <div class="hobby-why-block">
          <p class="hobby-why-block__heading">Why Try It?</p>
          <p class="hobby-why-block__text">${escapeHtml(hobby.why || hobby.blurb || '')}</p>
        </div>
        <div class="hobby-knowhow-block">
          <p class="hobby-knowhow-block__heading">At a Glance</p>
          <dl class="hobby-knowhow-grid">
            <dt>Time to try</dt><dd>${escapeHtml(hobby.time)}</dd>
            <dt>First step</dt><dd>${escapeHtml(hobby.startingPoint)}</dd>
            ${details ? `<dt>Cost to start</dt><dd>${costRanges[details.cost] || 'Varies'}</dd>
            <dt>Basic equipment</dt><dd>${escapeHtml(details.equipment)}</dd>
            <dt>Find community</dt><dd>${escapeHtml(details.community)}</dd>` : ''}
          </dl>
        </div>
      </div>
      <hr class="hobby-divider hobby-divider--top">
      ${embedUrl ? `<div class="hobby-video-band">
      <div class="hobby-video-centered">
        <iframe
          class="hobby-video"
          src="${escapeHtml(embedUrl)}"
          title="${escapeHtml(name)} intro video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
      </div>` : ''}
      <hr class="hobby-divider hobby-divider--bottom">
      <section class="hobby-related hobby-related--full">
        <p class="hobby-related__heading">You may also like</p>
        <div class="hobby-related__grid--row">${relatedCards}</div>
      </section>
    </div>`;

    // Tutorial scroll hint — fixed pill, fades out once video scrolls into view
    if (embedUrl) {
      (function() {
        var svgChevron = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
        var hint = document.createElement('div');
        hint.className = 'scroll-indicator has-label tutorial-hint';
        hint.innerHTML = svgChevron + '<span>Watch a tutorial</span>';
        document.body.appendChild(hint);

        function checkScroll() {
          if (!hint.isConnected) { window.removeEventListener('scroll', checkScroll); return; }
          var video = document.querySelector('.hobby-video-centered');
          if (!video) { hint.style.opacity = '0'; return; }
          var rect = video.getBoundingClientRect();
          var visible = rect.top < window.innerHeight * 0.85;
          hint.style.opacity = visible ? '0' : '';
          hint.style.pointerEvents = 'none';
        }
        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();

        // Remove hint on navigation
        window.addEventListener('hashchange', function _cleanup() {
          hint.remove();
          window.removeEventListener('scroll', checkScroll);
          window.removeEventListener('hashchange', _cleanup);
        }, { once: true });
      })();
    }

    return;
  }
}

function renderAbout() {
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Evidence</p><h1>Card sort notes</h1><p>Labels and groupings are grounded in the supplied card-sort report.</p></div><span class="view-label">VIEW / NOTES</span></div>
    <div class="findings-grid">${
      data.sortFindings
          .map(
              (finding) => `<article class="finding"><strong>${
                  escapeHtml(finding.value)}</strong><h2>${
                  escapeHtml(finding.label)}</h2><p>${
                  escapeHtml(finding.detail)}</p></article>`)
          .join('')}</div>
    <p><a class="plain-link" href="card-sort-report-draft.pdf" target="_blank" data-log="Open card sort report" data-log-destination="report">Open the card sort report draft [↗]</a></p>
  </div>`;
}

function downloadLog(format) {
  const content = format === 'json' ? JSON.stringify(clickLog, null, 2) : [
    'timestamp,type,label,destination,query,resultCount',
    ...clickLog.map(
        (e) => [e.timestamp, e.type || 'click', e.label, e.destination, e.query,
                e.resultCount]
                   .map((v) => `"${String(v).replaceAll('"', '""')}"`)
                   .join(','))
  ].join('\n');
  const blob = new Blob(
      [content], {type: format === 'json' ? 'application/json' : 'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hobby-atlas-click-log.${format}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function renderLog() {
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Research instrument</p><h1>Click log</h1>
      <p>${clickLog.length} recorded click${
      clickLog.length === 1 ?
          '' :
          's'}. Logs persist in this browser until cleared.</p>
    </div><span class="view-label">VIEW / LOG</span></div>
    <div class="log-actions">
      <button class="wire-button" data-export="json">Download JSON</button>
      <button class="wire-button" data-export="csv">Download CSV</button>
      <button class="wire-button" data-clear-log>Clear log</button>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Timestamp</th><th>Event</th><th>Label / query</th><th>Destination</th><th>Query</th></tr></thead>
      <tbody>${
      clickLog
          .map(
              (e) => `<tr><td>${escapeHtml(e.timestamp)}</td><td>${
                  escapeHtml(e.type || 'click')}</td><td>${
                  escapeHtml(e.label || e.query || '')}</td><td>${
                  escapeHtml(
                      e.destination || `${e.resultCount} results`)}</td><td>${
                  escapeHtml(e.query || '—')}</td></tr>`)
          .join('') ||
      '<tr><td colspan=\'5\'>No events recorded yet.</td></tr>'}</tbody>
    </table></div>
  </div>`;
}

// ─── Router ────────────────────────────────────────────────────────────────
function render() {
  if (MODE === 'results') {
    renderResults();
    return;
  }

  if (MODE === 'test') {
    if (!activeSession) {
      renderTestWelcome();
      return;
    }
    if (activeSession.phase === 'preview') {
      renderTaskPreview();
      return;
    }
  }

  const _hashParts = location.hash.slice(1).split('/');
  const [route, value, facetId, facetId2, facetId3] = _hashParts;
  document.body.classList.toggle('browse-route', route === 'browse' || !route);
  document.body.classList.toggle(
      'category-route', route === 'category' || route === 'facet');
  document.body.classList.toggle('search-route', route === 'search');
  document.querySelectorAll('[data-view-link]')
      .forEach(
          (link) => link.classList.toggle(
              'active',
              link.dataset.viewLink ===
                  (['hobby', 'category', 'facet'].includes(route) ?
                       'browse' :
                       route || 'browse')));

  // Mark active category button
  const activeId = (route === 'category' || route === 'facet') ?
      decodeURIComponent(value || '') :
      null;
  document.querySelectorAll('.category-button').forEach(btn => {
    const href = btn.getAttribute('href') || '';
    const btnId = decodeURIComponent(href.replace('#category/', ''));
    btn.classList.toggle('active', !!activeId && btnId === activeId);
  });

  if (route === 'facet') {
    renderFacet(decodeURIComponent(value || ''));
    window.scrollTo(0, 0);
  } else if (route === 'category') {
    renderCategory(
        decodeURIComponent(value || ''), decodeURIComponent(facetId || ''),
        decodeURIComponent(facetId2 || ''), decodeURIComponent(facetId3 || ''));
    window.scrollTo(0, 0);
  } else if (route === 'hobby') {
    renderHobby(decodeURIComponent(value || ''));
    window.scrollTo(0, 0);
  } else if (route === 'about')
    renderAbout();
  else if (route === 'search')
    renderSearch(
        decodeURIComponent(value || ''), decodeURIComponent(facetId || ''));
  else if (route === 'hobbies') {
    renderAllHobbies();
    window.scrollTo(0, 0);
  } else if (route === 'log')
    renderLog();
  else
    renderBrowse();

  app.focus({preventScroll: true});
}

// ─── Event delegation ──────────────────────────────────────────────────────
document.addEventListener('click', (event) => {
  const logTarget = event.target.closest('[data-log]');
  if (logTarget)
    recordClick(
        logTarget.dataset.log, logTarget.dataset.logDestination,
        location.hash.startsWith('#search/') ? activeSearchQuery : '');

  // Start session (welcome screen)
  if (event.target.closest('[data-start-test]')) {
    const input = document.querySelector('#participant-name');
    if (!input?.value.trim()) {
      input?.focus();
      return;
    }
    startTest(input.value);
    return;
  }

  // Begin task (task preview card → enter the tree)
  if (event.target.closest('[data-begin-task]')) {
    beginTask();
    return;
  }

  // Give up current task
  if (event.target.closest('[data-give-up]')) {
    finishTask(true, null);
    return;
  }

  // "This is my answer"
  const answerBtn = event.target.closest('[data-answer]');
  if (answerBtn) {
    recordClick('This is my answer', answerBtn.dataset.answer);
    finishTask(false, answerBtn.dataset.answer);
    return;
  }

  // Click log export
  const exportBtn = event.target.closest('[data-export]');
  if (exportBtn) downloadLog(exportBtn.dataset.export);

  // Session export
  const exportSessions = event.target.closest('[data-export-sessions]');
  if (exportSessions) downloadSessions(exportSessions.dataset.exportSessions);

  // Clear click log
  if (event.target.closest('[data-clear-log]')) {
    clickLog = [];
    localStorage.removeItem(LOG_KEY);
    renderLog();
  }

  // Clear test sessions
  if (event.target.closest('[data-clear-sessions]')) {
    if (!confirm('Clear ALL tree test results? This cannot be undone.')) return;
    testSessions = [];
    localStorage.removeItem(SESSION_KEY);
    renderResults();
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-search-form]');
  if (!form) return;
  event.preventDefault();
  const query = new FormData(form).get('q')?.toString().trim() || '';
  if (!query) return;
  const results = searchMatches(query);
  logSearch(query, results.length);
  location.hash = `search/${encodeURIComponent(query)}`;
});

// Live search: update results as the user types (280ms debounce)
(function() {
  var _lsTimer = null;
  var _lastQuery = '';
  document.addEventListener('input', function(e) {
    var input = e.target;
    if (!input.matches('[data-search-form] input[name="q"]')) return;
    var query = input.value.trim();
    clearTimeout(_lsTimer);
    if (!query || query === _lastQuery) return;
    _lsTimer = setTimeout(function() {
      _lastQuery = query;
      var encoded = encodeURIComponent(query);
      var newHash = 'search/' + encoded;
      // replaceState keeps history clean while user is still typing
      history.replaceState(null, '', '#' + newHash);
      logSearch(query, searchMatches(query).length);
      renderSearch(query);
      window.scrollTo(0, 0);
      // Re-focus the input (renderSearch may have replaced it)
      var inp = document.querySelector('[data-search-form] input[name="q"]');
      if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }, 280);
  });
})();


/* ─── Rotating phrase banner ──────────────────────────────────────────────
 */
(function initBanner() {
  const el = document.getElementById('banner-phrase');
  if (!el) return;

  // Build one slogan per hobby in data.hobbies, cycling through templates
  const hobbyKeys = Object.keys(data.hobbies);
  const tmpl = [
    (_n, l) => `Your ${l} era starts now.`,
    (_n, l) => `Less scrolling. More ${l}.`,
    (_n, l) => `Give ${l} one afternoon. See what happens.`,
    (_n, l) => `${l} — you'll wonder what took you so long.`,
    (_n, l) => `The version of you that tries ${l} is cooler than you think.`,
    (_n, l) => `${l} is one click away. The rest is just showing up.`,
    (_n, l) => `${l}: underrated, until it isn't.`,
    (_n, l) => `What if ${l} was your thing this year?`,
    (_n, l) => `${l} doesn't care how busy you are. Give it an hour.`,
    (_n, l) => `No experience needed. ${l} starts somewhere.`,
    (_n, l) => `Turns out you're exactly the kind of person who would love ${l}.`,
    (_n, l) => `${l} has been waiting for you this whole time.`,
    (_n, l) => `A little curiosity could lead you to ${l}.`,
    (_n, l) => `Make room for something new: ${l}.`,
    (_n, l) => `${l} might be your next favorite way to spend a day.`,
    (_n, l) => `Try ${l}. Keep the part that makes you smile.`,
    (_n, l) => `Your next small adventure could be ${l}.`,
    (_n, l) => `${l} is a good excuse to make time for yourself.`,
    (_n, l) => `Start with ${l}, and follow where it takes you.`,
    (_n, l) => `You don't have to be good at ${l} to enjoy it.`,
    (_n, l) => `${l} is proof that hobbies don't have to be complicated.`,
    (_n, l) => `Take a break from routine and meet ${l}.`,
    (_n, l) => `There is always time to discover ${l}.`,
    (_n, l) => `${l} could be the reset your week needs.`,
    (_n, l) => `Find your kind of fun with ${l}.`,
    (_n, l) => `Somewhere between curious and committed is ${l}.`,
    (_n, l) => `${l} is a fresh way to spend your free time.`,
    (_n, l) => `Follow your curiosity all the way to ${l}.`,
    (_n, l) => `A new favorite might start with ${l}.`,
    (_n, l) => `${l} gives your hands and mind something to do.`,
    (_n, l) => `Make today a good day to try ${l}.`,
    (_n, l) => `Your free time deserves more than another scroll. Try ${l}.`,
    (_n, l) => `${l} is waiting for a first attempt, not perfection.`,
    (_n, l) => `A small start can turn into a love for ${l}.`,
    (_n, l) => `Meet the hobby that makes time disappear: ${l}.`,
    (_n, l) => `What will you make of an hour spent on ${l}?`,
    (_n, l) => `${l} belongs on your list of things to try.`,
    (_n, l) => `Let ${l} surprise you.`,
  ];

  // Shuffle so order varies each session
  const shuffled = hobbyKeys.slice().sort(() => Math.random() - 0.5);
  const slogans = shuffled.map((key, i) => {
    const name = key;
    const link = `<a class="banner-link" href="#hobby/${encodeURIComponent(key)}">${name}</a>`;
    return { html: tmpl[i % tmpl.length](name, link) };
  });

  let index = Math.floor(Math.random() * slogans.length);

  function showNext() {
    el.classList.add('fading');
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * slogans.length);
      while (slogans.length > 1 && nextIndex === index)
        nextIndex = Math.floor(Math.random() * slogans.length);
      index = nextIndex;
      el.innerHTML = slogans[index].html;
      el.classList.remove('fading');
    }, 400);
  }

  el.innerHTML = slogans[index].html;
  setInterval(showNext, 15000);
})();

window.addEventListener('hashchange', function(e) { _prevHash = e.oldURL.includes('#') ? '#' + e.oldURL.split('#').slice(1).join('#') : ''; render(); });
render();

// ─── Nav search icon expand/collapse ──────────────────────────────────────
(function() {
var toggle = document.getElementById('nav-search-toggle');
var bar = document.getElementById('nav-search-bar');
var input = document.getElementById('nav-search-input');
var closeBtn = document.getElementById('nav-search-close');
if (!toggle || !bar || !input) return;

function openSearch() {
  bar.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close search');
  input.focus();
}

function closeSearch() {
  bar.hidden = true;
  input.value = '';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open search');
}

toggle.addEventListener('click', function() {
  if (bar.hidden) {
    openSearch();
  } else {
    closeSearch();
  }
});

closeBtn.addEventListener('click', closeSearch);

input.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSearch();
    toggle.focus();
  }
});

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var q = input.value.trim();
    if (q) {
      closeSearch();
      window.location.hash = '#search/' + encodeURIComponent(q);
    }
  }
});
})();
