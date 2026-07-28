window.P1_CATEGORIES = [
  { slug: 'getting-started', name: 'Getting Started', desc: 'OceanBase & seekdb quick start, setup, first queries' },
  { slug: 'obc-technical', name: 'OBC Technical', desc: 'Migration, HTAP, deployment, and production ops' },
];

const STORAGE_KEY = 'p1_ask_obc_v2';

function seedDiscussions() {
  const now = Date.now();
  return [
    {
      id: 't1',
      category: 'getting-started',
      title: 'Minimal Docker setup for seekdb on Mac (Apple Silicon)?',
      author: 'alex_m',
      body: 'Looking for a minimal `docker run` example for local OceanBase / seekdb dev on M2 Mac.\n\nWhat I tried:\n```bash\ndocker pull oceanbase/seekdb:latest\n```\n\nAny recommended memory limits for a laptop?',
      replies: [
        { author: 'community_mod', body: 'Start with 4GB limit and mount a local volume for data. See the seekdb quick start in OceanBase docs.', createdAt: now - 3600000 },
      ],
      views: 142,
      createdAt: now - 86400000 * 2,
      pinned: true,
    },
    {
      id: 't2',
      category: 'obc-technical',
      title: 'ERROR 4016 — CASE NULL WHEN repro vs NOT IN subquery',
      author: 'jinglan',
      body: 'Hit `ERROR 4016 (HY000): Column count doesn\'t match` with a `CASE NULL WHEN` pattern on OceanBase. Switched to `NOT IN (SELECT …)` and it behaved closer to MySQL expectations.\n\nIs this a known semantic difference?',
      replies: [
        { author: 'mat_b', body: 'Yes — worth checking the manual section on NULL handling in CASE expressions. Your simplified repro helps.', createdAt: now - 7200000 },
        { author: 'val_n', body: 'Can you paste the minimal DDL? Happy to compare with MySQL 8.0.', createdAt: now - 3600000 },
      ],
      views: 129,
      createdAt: now - 86400000 * 5,
      pinned: false,
    },
    {
      id: 't3',
      category: 'obc-technical',
      title: 'OBD cluster deploy on Ubuntu 22.04 — best practices?',
      author: 'dba_jen',
      body: 'Planning a 3-node OceanBase cluster with OBD for a staging environment.\n\nAny checklist for sysctl / disk / network before `obd cluster deploy`?',
      replies: [
        { author: 'ocean_advocate', body: 'Pin data and log dirs to separate volumes; review the OBD deploy doc on en.oceanbase.com for kernel params.', createdAt: now - 86400000 },
      ],
      views: 96,
      createdAt: now - 86400000 * 4,
      pinned: false,
    },
  ];
}

function loadDiscussions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) { /* ignore */ }
  const seed = seedDiscussions();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveDiscussions(topics) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}

function getTopics(filterCat) {
  let topics = loadDiscussions();
  if (filterCat && filterCat !== 'all') {
    topics = topics.filter((t) => t.category === filterCat);
  }
  return topics.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    const aTime = a.replies.length ? Math.max(...a.replies.map((r) => r.createdAt), a.createdAt) : a.createdAt;
    const bTime = b.replies.length ? Math.max(...b.replies.map((r) => r.createdAt), b.createdAt) : b.createdAt;
    return bTime - aTime;
  });
}

function getTopic(id) {
  return loadDiscussions().find((t) => t.id === id);
}

function addTopic({ category, title, body, author }) {
  const topics = loadDiscussions();
  const topic = {
    id: 't' + Date.now(),
    category,
    title,
    author: author || 'anonymous',
    body,
    replies: [],
    views: 0,
    createdAt: Date.now(),
    pinned: false,
  };
  topics.unshift(topic);
  saveDiscussions(topics);
  return topic;
}

function addReply(topicId, { author, body }) {
  const topics = loadDiscussions();
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return null;
  topic.replies.push({ author, body, createdAt: Date.now() });
  saveDiscussions(topics);
  return topic;
}

function incrementViews(topicId) {
  const topics = loadDiscussions();
  const topic = topics.find((t) => t.id === topicId);
  if (topic) {
    topic.views += 1;
    saveDiscussions(topics);
  }
}

function formatRelative(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function catName(slug) {
  return window.P1_CATEGORIES.find((c) => c.slug === slug)?.name || slug;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\n/g, '<br>');
  return html;
}

function initials(name) {
  return name.split(/[_\s]/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

window.P1Discussions = {
  getTopics,
  getTopic,
  addTopic,
  addReply,
  incrementViews,
  formatRelative,
  catName,
  renderMarkdown,
  initials,
  loadDiscussions,
};
