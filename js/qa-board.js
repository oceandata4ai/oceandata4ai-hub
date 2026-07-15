document.addEventListener('DOMContentLoaded', async () => {
  const listRoot = document.getElementById('qa-topic-list');
  if (!listRoot) return;

  const qa = window.OCEANDATA4AI_QA;
  if (!qa) return;

  try {
    const { list } = await qa.loadTopics();
    renderTopics(listRoot, list, qa);
  } catch (err) {
    listRoot.innerHTML =
      '<p class="qa-error">Could not load topics. <a href="oug-help.html">Retry</a></p>';
    console.error(err);
  }
});

function renderTopics(listRoot, topics, qa) {
  if (!topics.length) {
    listRoot.innerHTML = '<p class="qa-empty">No topics yet. <a href="ask.html?board=oug-help">Ask a question</a> to start the board.</p>';
    return;
  }

  listRoot.innerHTML = topics
    .map((topic) => {
      const replyCount = (topic.replies || []).length;
      const pinned = topic.pinned ? '<span class="qa-topic-pin">Pinned</span>' : '';
      return `<article class="qa-topic-card${topic.pinned ? ' is-pinned' : ''}">
        <div class="qa-topic-card-main">
          <div class="qa-topic-card-meta">
            ${pinned}
            <span>by ${escapeHtml(topic.author)}</span>
            <span class="qa-topic-card-dot" aria-hidden="true">·</span>
            <time>${escapeHtml(topic.activity || topic.date || '')}</time>
          </div>
          <a class="qa-topic-card-title" href="topic.html?slug=${encodeURIComponent(topic.slug)}">${escapeHtml(topic.title)}</a>
          ${topic.excerpt ? `<p class="qa-topic-card-excerpt">${escapeHtml(topic.excerpt)}</p>` : ''}
        </div>
        <div class="qa-topic-card-stats" aria-label="Topic stats">
          <div class="qa-topic-stat">
            <strong>${replyCount}</strong>
            <span>${replyCount === 1 ? 'Reply' : 'Replies'}</span>
          </div>
          <div class="qa-topic-stat">
            <strong>${escapeHtml(qa.formatViews(topic.views || 0))}</strong>
            <span>Views</span>
          </div>
        </div>
      </article>`;
    })
    .join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
