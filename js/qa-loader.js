(function () {
  const DATA_URL = new URL('../data/topics.json', window.location.href).href;
  let cache = null;

  function formatViews(n) {
    if (n >= 1000) {
      const k = n / 1000;
      return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, '')}k`;
    }
    return String(n);
  }

  function tagClass(tag) {
    if (tag === 'seekdb' || tag === 'deployment') return 'tag-teal';
    if (tag === 'vector') return 'tag-violet';
    return 'tag-slate';
  }

  function topicsToMap(topics) {
    return topics.reduce((map, topic) => {
      map[topic.slug] = topic;
      return map;
    }, {});
  }

  function sortTopics(topics) {
    return topics.slice().sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const da = new Date(a.createdAt || a.date);
      const db = new Date(b.createdAt || b.date);
      return db - da;
    });
  }

  function clearCache() {
    cache = null;
  }

  async function loadTopics() {
    if (cache) return cache;
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to load topics (${res.status})`);
    const data = await res.json();
    const seedTopics = data.topics || [];
    const userTopics = window.OCEANDATA4AI_QA_STORE?.readAll() || [];
    const seedSlugs = new Set(seedTopics.map((t) => t.slug));
    const merged = [
      ...userTopics.filter((t) => !seedSlugs.has(t.slug)),
      ...seedTopics,
    ];
    const withReplies = window.OCEANDATA4AI_QA_STORE?.mergeExtraReplies(merged) || merged;
    const topics = sortTopics(withReplies);
    cache = { list: topics, map: topicsToMap(topics) };
    window.OCEANDATA4AI_QA_TOPICS = cache.map;
    return cache;
  }

  window.OCEANDATA4AI_QA = {
    loadTopics,
    clearCache,
    formatViews,
    tagClass,
  };
})();
