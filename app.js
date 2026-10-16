const data = window.HobbyAtlasData;

const app = document.querySelector('#app');
const categoryNav = document.querySelector('.category-nav');
const testBanner = document.querySelector('#test-banner');

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
                      (facet) => `<a href="#facet/${facet.id}" data-log="Open ${
                          escapeHtml(
                              facet.label)}" data-log-destination="facet/${
                          facet.id}">${escapeHtml(facet.label)}</a>`)
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
function contentBlock(name, query = '') {
  const hobby = data.hobbies[name];
  return `<a class="hobby-card" href="#hobby/${
      encodeURIComponent(
          name)}" data-log="${escapeHtml(name)}" data-log-destination="hobby/${
      encodeURIComponent(name)}">
    <strong>${escapeHtml(name)}</strong><small>${
      escapeHtml(
          hobby?.summary || hobby?.blurb ||
          '')}</small><span aria-hidden="true">→</span>
  </a>`;
}

function hobbyCard(name) {
  return contentBlock(name, activeSearchQuery);
}

function searchForm() {
  return `<form class="search-form" data-search-form role="search">
    <label class="sr-only" for="site-search">Search hobbies</label>
    <input id="site-search" type="search" name="q" placeholder="Try “creative,” “outdoorsy,” or “relaxing”…" autocomplete="off" />
    <button type="submit" aria-label="Search">Search</button>
  </form>`;
}

function groupBlock(group) {
  return `<a class="group-block" href="#category/${group.id}" data-log="Open ${
      escapeHtml(group.label)}" data-log-destination="category/${group.id}">
    <div class="group-heading"><p class="label">activity</p><h2>${
      escapeHtml(
          group.label)}</h2><p>${escapeHtml(group.description || '')}</p></div>
  </a>`;
}

function renderBrowse() {
  const hotList = [
    {
      label: 'Mahjong',
      key: 'Mahjong',
      img: 'https://source.unsplash.com/400x400/?mahjong,tiles',
      demoStyle: 'split'
    },
    {
      label: 'Pickleball',
      key: 'Pickleball',
      img: 'https://source.unsplash.com/400x400/?pickleball,sport',
      demoStyle: 'split'
    },
    {
      label: 'Scrapbooking',
      key: 'Scrapbooking',
      img: 'https://source.unsplash.com/400x400/?scrapbooking,craft',
      demoStyle: 'split'
    },
    {
      label: 'Hiking',
      key: 'Hiking/Trail Walking',
      img: 'https://source.unsplash.com/400x400/?hiking,trail',
      demoStyle: 'split'
    },
    {
      label: 'Snowshoeing',
      key: 'Snowshoeing',
      img: 'https://source.unsplash.com/400x400/?snowshoeing,winter',
      demoStyle: 'split'
    },
    {
      label: 'Sourdough',
      key: 'Sourdough',
      img: 'https://source.unsplash.com/400x400/?sourdough,bread',
      demoStyle: 'split'
    },
    {
      label: 'Gaming',
      key: 'Gaming',
      img: 'https://source.unsplash.com/400x400/?gaming,controller',
      demoStyle: 'split'
    },
    {
      label: 'Thrifting',
      key: 'Thrifting/Antiquing',
      img: 'https://source.unsplash.com/400x400/?thrift,vintage',
      demoStyle: 'split'
    },
    {
      label: 'Photography',
      key: 'Photography',
      img: 'https://source.unsplash.com/400x400/?photography,camera',
      demoStyle: 'split'
    },
    {
      label: 'Yoga',
      key: 'Yoga',
      img: 'https://source.unsplash.com/400x400/?yoga,meditation',
      demoStyle: 'split'
    },
  ];

  function makeCard({label, key, img, demoStyle}) {
    const hobby = data.hobbies[key] || {};
    const href = `#hobby/${encodeURIComponent(key)}`;
    const log = `Open ${escapeHtml(label)}`;
    const dest = `hobby/${encodeURIComponent(key)}`;

    if (demoStyle === 'overlay') {
      return `<a class="hot-card hot-card--overlay" href="${href}"
        data-log="${log}" data-log-destination="${dest}"
        style="background-image:url('${img}')">
        <div class="hot-card__scrim"></div>
        <p class="label hot-card-label">${escapeHtml(label)}</p>
        <p class="hot-card-blurb">${escapeHtml(hobby.blurb || '')}</p>
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

  app.innerHTML = `<div class="page hot-list-page">
    <div class="hot-list-header">
      <h1 class="hot-list-title">Your next hobby is in here.</h1>
    </div>
    <div class="carousel-wrap">
      <button class="carousel-btn carousel-prev" aria-label="Previous hobbies">&#8249;</button>
      <div class="carousel-track" id="carousel-track">
        <div class="carousel-inner" id="carousel-inner">${headClone}${
      realHtml}${tailClone}</div>
      </div>
      <button class="carousel-btn carousel-next" aria-label="Next hobbies">&#8250;</button>
    </div>
    <div class="hot-list-search-band"><p class="hot-list-search-prompt">Not seeing your thing? Search for it.</p><div class="hot-list-search">${
      searchForm()}</div></div>
  </div>`;

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

  function setCardWidth() {
    const cardW = (trackEl.offsetWidth - GAP * (PER_PAGE - 1)) / PER_PAGE;
    trackEl.style.setProperty('--card-w', cardW + 'px');
  }

  function moveTo(newIdx, animate) {
    idx = newIdx;
    const cardW =
        parseFloat(getComputedStyle(trackEl).getPropertyValue('--card-w'));
    const offset = idx * (cardW + GAP);
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
  window.addEventListener('resize', () => {
    setCardWidth();
    moveTo(idx, false);
  });

  prevBtn.addEventListener(
      'click', () => slide(+1));  // left arrow → strip moves left → later cards
  nextBtn.addEventListener(
      'click',
      () => slide(-1));  // right arrow → strip moves right → earlier cards
}

function searchMatches(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return data.allHobbies.filter((name) => {
    const hobby = data.hobbies[name];
    const category = categoryById[hobby.category];
    const haystack = [
      name, hobby.summary, hobby.blurb, ...(hobby.tags || []), category?.label,
      ...(data.searchConcepts[normalized] || [])
    ].join(' ').toLowerCase();
    const conceptHits =
        Object.entries(data.searchConcepts)
            .filter(
                ([term, synonyms]) => normalized === term ||
                    synonyms.some((synonym) => normalized === synonym))
            .flatMap(([term, synonyms]) => [term, ...synonyms]);
    return haystack.includes(normalized) ||
        conceptHits.some((term) => haystack.includes(term));
  });
}

function logSearch(query, resultCount) {
  const entry =
      {timestamp: new Date().toISOString(), type: 'search', query, resultCount};
  clickLog.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(clickLog));
}

function renderSearch(query, facetId = '') {
  activeSearchQuery = query;
  const results = searchMatches(query).filter((name) => {
    if (!facetId) return true;
    return data.hobbies[name].categoryIds.includes(facetId);
  });
  const facets =
      [...new Map(
           results
               .map((name) => {
                 const hobby = data.hobbies[name];
                 return hobby.categoryIds.map(
                     (categoryId) => [categoryId, categoryById[categoryId]]);
               })
               .flat())
           .values()];
  app.innerHTML = `<div class="page">
    <div class="page-heading"><div><p class="label">Search</p><h1>Find a hobby</h1>
      <p>Showing results for <strong>“${escapeHtml(query)}”</strong>.</p></div>
      <span class="view-label">VIEW / SEARCH</span></div>
    <div class="search-facets" aria-label="Narrow search results">
      <span class="label">Narrow by category</span>
      ${
      facets
          .map(
              (facet) => `<a class="facet-chip" href="#search/${
                  encodeURIComponent(query)}/${facet.id}"
        data-log="Narrow to ${
                  escapeHtml(facet.label)}" data-log-destination="search/${
                  encodeURIComponent(
                      query)}/${facet.id}">${escapeHtml(facet.label)}</a>`)
          .join('')}
    </div>
    ${
      results.length ?
          `<div class="search-results"><div class="section-title"><h2>${
              results
                  .length} matching blocks</h2><p>Literal terms plus the committed concept vocabulary.</p></div>
      <div class="hobby-grid">${
              results.map(contentBlock).join('')}</div></div>` :
          `<section class="no-results"><p class="label">No exact or concept matches</p><h2>Try a nearby idea</h2>
        <p>Search for “stars,” “bread,” “vintage,” “programming,” or “friends” to explore related vocabulary from the tree test.</p>
        <a class="wire-button" href="#browse" data-log="Return to explore" data-log-destination="browse">Return to explore</a></section>`}
  </div>`;
}

function renderCategory(id) {
  const category = categoryById[id];
  if (!category) return renderBrowse();
  const hobbyContent = category.facets ?
      `${
          category.cards?.length ?
              `<div class="hobby-grid category-grid">${
                  category.cards.map(hobbyCard).join('')}</div>` :
              ''}
       <div class="group-list facet-list">${
          category.facets
              .map(
                  (facet) => `<a class="group-block" href="#facet/${
                      facet.id}" data-log="Open ${
                      escapeHtml(facet.label)}" data-log-destination="facet/${
                      facet.id}">
           <div class="group-heading"><p class="label">facet</p><h2>${
                      escapeHtml(facet.label)}</h2><p>${
                      escapeHtml(facet.description)}</p></div></a>`)
              .join('')}</div>` :
      `<div class="hobby-grid category-grid">${
          category.cards.map(hobbyCard).join('')}</div>`;

  app.innerHTML = `<div class="page">
    <a class="plain-link back-link" href="#browse" data-log="Back to categories" data-log-destination="browse">← Back to categories</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity category</p><h1>${
      escapeHtml(category.label)}</h1><p>${
      escapeHtml(
          category
              .description)}</p></div><span class="view-label">LEVEL 2</span></div>
    ${answerButton('category/' + id)}
    ${hobbyContent}
  </div>`;
}

function renderFacet(id) {
  const facet = facetById[id];
  if (!facet) return renderBrowse();
  // Back link: parent facet if nested, otherwise parent category
  const backHref = facet.parentFacetId ? `#facet/${facet.parentFacetId}` :
                                         `#category/${facet.category.id}`;
  const backLabel = facet.parentFacetId ?
      escapeHtml(
          facetById[facet.parentFacetId]?.label || facet.category.label) :
      escapeHtml(facet.category.label);
  const backDest = facet.parentFacetId ? `facet/${facet.parentFacetId}` :
                                         `category/${facet.category.id}`;
  // Content: sub-facets (group list) or hobbies (card grid)
  const facetContent = facet.facets?.length ?
      `<div class="group-list facet-list">${
          facet.facets
              .map(
                  (sub) => `<a class="group-block" href="#facet/${
                      sub.id}" data-log="Open ${
                      escapeHtml(
                          sub.label)}" data-log-destination="facet/${sub.id}">
           <div class="group-heading"><p class="label">facet</p><h2>${
                      escapeHtml(sub.label)}</h2><p>${
                      escapeHtml(sub.description)}</p></div></a>`)
              .join('')}</div>` :
      `<div class="hobby-grid category-grid">${
          (facet.cards || []).map(hobbyCard).join('')}</div>`;
  app.innerHTML = `<div class="page">
    <a class="plain-link back-link" href="${backHref}" data-log="Back to ${
      backLabel}" data-log-destination="${backDest}">← Back to ${backLabel}</a>
    <div class="page-heading compact-heading"><div><p class="label">Activity facet</p><h1>${
      escapeHtml(facet.label)}</h1><p>${
      escapeHtml(
          facet
              .description)}</p></div><span class="view-label">LEVEL 3</span></div>
    ${answerButton('facet/' + id)}
    ${facetContent}
  </div>`;
}

function renderHobby(name) {
  const hobby = data.hobbies[name];
  if (!hobby) return renderBrowse();
  const category = categoryById[hobby.category];

  // In test mode: show only the name + answer button (no detail table — that's
  // researcher info)
  if (MODE === 'test') {
    app.innerHTML = `<div class="page">
      <a class="plain-link back-link" href="#browse" data-log="Back to categories" data-log-destination="browse">← Back to categories</a>
      <article class="selection-page">
        <h1>${escapeHtml(name)}</h1>
        ${answerButton('hobby/' + name)}
      </article>
    </div>`;
    return;
  }

  // Normal wireframe view: full detail card
  app.innerHTML = `<div class="page">
    <a class="plain-link back-link" href="#browse" data-log="Back to categories" data-log-destination="browse">← Back to categories</a>
    <article class="selection-page">
      <h1>${escapeHtml(name)}</h1>
      <div class="selection-box">
        <p>${escapeHtml(hobby.blurb)}</p>
        <dl>
          <div><dt>Activity category</dt><dd>${
      escapeHtml(category?.label || '')}</dd></div>
          <div><dt>Tags</dt><dd>${escapeHtml(hobby.tags.join(' / '))}</dd></div>
          <div><dt>Time to try</dt><dd>${escapeHtml(hobby.time)}</dd></div>
          <div><dt>First step</dt><dd>${
      escapeHtml(hobby.startingPoint)}</dd></div>
        </dl>
      </div>
      <section class="related-section"><p class="label">Related leaves</p>
        <div class="hobby-grid">${hobby.related.map(hobbyCard).join('')}</div>
      </section>
    </article>
  </div>`;
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

  const [route, value, facetId] = location.hash.slice(1).split('/');
  document.body.classList.toggle('browse-route', route === 'browse' || !route);
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

  if (route === 'facet')
    renderFacet(decodeURIComponent(value || ''));
  else if (route === 'category')
    renderCategory(decodeURIComponent(value || ''));
  else if (route === 'hobby')
    renderHobby(decodeURIComponent(value || ''));
  else if (route === 'about')
    renderAbout();
  else if (route === 'search')
    renderSearch(
        decodeURIComponent(value || ''), decodeURIComponent(facetId || ''));
  else if (route === 'log')
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


/* ─── Rotating phrase banner ──────────────────────────────────────────────
 */
(function initBanner() {
  const el = document.getElementById('banner-phrase');
  if (!el) return;

  const e = (name) => encodeURIComponent(name);
  const slogans = [
    {
      html: `The ground is overrated. Try <a class="banner-link" href="#hobby/${
          e('Rock Climbing')}">rock climbing</a>.`
    },
    {
      html: `Your <a class="banner-link" href="#hobby/${
          e('Sourdough')}">sourdough</a> starter won't feed itself.`
    },
    {
      html:
          `The moment is already leaving. <a class="banner-link" href="#hobby/${
              e('Photography')}">Photography</a> catches it.`
    },
    {
      html: `There's a <a class="banner-link" href="#hobby/${
          e('Hiking/Trail Walking')}">hiking</a> trail with your name on it.`
    },
    {
      html:
          `The universe has more going on than your inbox. Look up. Try <a class="banner-link" href="#hobby/${
              e('Astronomy')}">astronomy</a>.`
    },
    {
      html: `Start <a class="banner-link" href="#hobby/${
          e('Journaling')}">journaling</a>. Your future self will thank you.`
    },
    {
      html:
          `There's a whole world below the surface. <a class="banner-link" href="#hobby/${
              e('Freediving')}">Freediving</a> gets you there.`
    },
    {
      html:
          `Every app you use started with one line of code. <a class="banner-link" href="#hobby/${
              e('Coding')}">Coding</a> starts the same way.`
    },
    {
      html: `<a class="banner-link" href="#hobby/${
          e('Yoga')}">Yoga</a> is just stretching until it isn't.`
    },
    {
      html: `Fly <a class="banner-link" href="#hobby/${
          e('Fishing')}">fishing</a> is just a really good excuse to stand in a river.`
    },
    {
      html: `<a class="banner-link" href="#hobby/${
          e('Running')}">Running</a> is just walking but angrier. You'll be obsessed in a month.`
    },
    {
      html:
          `You've never felt cooler than you will on a <a class="banner-link" href="#hobby/${
              e('Skateboarding')}">skateboard</a> going downhill.`
    },
    {
      html: `<a class="banner-link" href="#hobby/${
          e('Origami')}">Origami</a> takes five minutes to learn and the rest of your life to master. Start today.`
    },
    {
      html: `The first thing you <a class="banner-link" href="#hobby/${
          e('Gardening')}">grow</a> yourself will taste better than anything you've bought.`
    },
    {
      html:
          `You'll be surprised how much you care about <a class="banner-link" href="#hobby/${
              e('Beekeeping')}">bees</a> once they're yours.`
    },
    {
      html: `Once you learn <a class="banner-link" href="#hobby/${
          e('Calligraphy')}">calligraphy</a> you'll want to handwrite everything.`
    },
  ];

  let index = 0;

  function showNext() {
    el.classList.add('fading');
    setTimeout(() => {
      index = (index + 1) % slogans.length;
      el.innerHTML = slogans[index].html;
      el.classList.remove('fading');
    }, 400);
  }

  el.innerHTML = slogans[0].html;
  setInterval(showNext, 15000);
})();

window.addEventListener('hashchange', render);
render();
