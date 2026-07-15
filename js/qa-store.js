(function () {
  const TOPICS_KEY = 'o4ai_qa_user_topics';
  const REPLIES_KEY = 'o4ai_qa_extra_replies';

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    if (window.OCEANDATA4AI_QA?.clearCache) window.OCEANDATA4AI_QA.clearCache();
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function excerptFromHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = (div.textContent || '').trim();
    return text.length > 120 ? `${text.slice(0, 117)}…` : text;
  }

  function slugify(title) {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48);
    return `${base || 'topic'}-${Date.now().toString(36).slice(-4)}`;
  }

  function displayAuthor(email) {
    const name = String(email || '').split('@')[0];
    return name || 'community';
  }

  function readAll() {
    return readJson(TOPICS_KEY, []);
  }

  function readExtraReplies() {
    return readJson(REPLIES_KEY, {});
  }

  function createTopic({ title, bodyHtml, author, board = 'oug-help', tags = [] }) {
    const now = new Date();
    const slug = slugify(title);
    const topic = {
      slug,
      board,
      boardLabel: 'Ask OUG',
      title,
      excerpt: excerptFromHtml(bodyHtml),
      author: displayAuthor(author),
      date: formatDate(now),
      createdAt: now.toISOString(),
      activity: 'just now',
      views: 1,
      tags,
      pinned: false,
      body: bodyHtml,
      replies: [],
      userPosted: true,
    };
    const all = readAll();
    all.unshift(topic);
    writeJson(TOPICS_KEY, all);
    window.dispatchEvent(new CustomEvent('o4ai:topic-posted', { detail: { slug } }));
    return slug;
  }

  function addReply(slug, { author, body }) {
    const reply = {
      author: displayAuthor(author),
      date: formatDate(new Date()),
      body,
    };
    const all = readAll();
    const topic = all.find((t) => t.slug === slug);
    if (topic) {
      topic.replies = topic.replies || [];
      topic.replies.push(reply);
      topic.activity = 'just now';
      writeJson(TOPICS_KEY, all);
      window.dispatchEvent(new CustomEvent('o4ai:reply-posted', { detail: { slug } }));
      return true;
    }
    const extras = readExtraReplies();
    extras[slug] = extras[slug] || [];
    extras[slug].push(reply);
    writeJson(REPLIES_KEY, extras);
    window.dispatchEvent(new CustomEvent('o4ai:reply-posted', { detail: { slug } }));
    return true;
  }

  function mergeExtraReplies(topics) {
    const extras = readExtraReplies();
    return topics.map((topic) => {
      const extra = extras[topic.slug];
      if (!extra?.length) return topic;
      return {
        ...topic,
        replies: [...(topic.replies || []), ...extra],
        activity: 'just now',
      };
    });
  }

  window.OCEANDATA4AI_QA_STORE = {
    readAll,
    createTopic,
    addReply,
    mergeExtraReplies,
  };
})();
