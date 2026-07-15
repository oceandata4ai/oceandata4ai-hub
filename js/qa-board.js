document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.getElementById('qa-topic-list');
  if (!tbody) return;

  const qa = window.OCEANDATA4AI_QA;
  if (!qa) return;

  try {
    const { list } = await qa.loadTopics();
    renderTopics(tbody, list, qa);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4"><p class="qa-error">Could not load topics. <a href="oug-help.html">Retry</a></p></td></tr>`;
    console.error(err);
  }
});

function renderTopics(tbody, topics, qa) {
  tbody.innerHTML = topics
    .map((topic) => {
      const replyCount = (topic.replies || []).length;
      const rowClass = topic.pinned ? ' class="qa-pinned"' : '';
      return `<tr${rowClass}>
        <td>
          <a class="qa-topic-title" href="topic.html?slug=${encodeURIComponent(topic.slug)}">${escapeHtml(topic.title)}</a>
          <div class="qa-topic-excerpt">${escapeHtml(topic.excerpt || '')}</div>
        </td>
        <td class="num">${replyCount}</td>
        <td class="num">${qa.formatViews(topic.views || 0)}</td>
        <td class="num">${escapeHtml(topic.activity || '')}</td>
      </tr>`;
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
