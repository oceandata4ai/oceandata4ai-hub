document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  let filter = params.get('cat') || 'all';

  const browse = document.getElementById('disc-browse');
  if (browse) {
    const topics = window.P1Discussions.loadDiscussions();
    browse.innerHTML = window.P1_CATEGORIES.map((c) => {
      const count = topics.filter((t) => t.category === c.slug).length;
      return `
        <a class="disc-browse-card" href="index.html?cat=${c.slug}">
          <h3>${c.name}</h3>
          <p>${c.desc}</p>
          <span class="count">${count} topics</span>
        </a>`;
    }).join('');
  }

  const filters = document.getElementById('disc-filters');
  if (filters) {
    const cats = [{ slug: 'all', name: 'All' }, ...window.P1_CATEGORIES];
    filters.innerHTML = cats.map((c) =>
      `<button type="button" data-cat="${c.slug}" class="${c.slug === filter ? 'active' : ''}">${c.name}</button>`
    ).join('');

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      filter = btn.dataset.cat;
      filters.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
      renderTable();
      history.replaceState(null, '', filter === 'all' ? 'index.html' : `index.html?cat=${filter}`);
    });
  }

  function renderTable() {
    const tbody = document.getElementById('disc-tbody');
    if (!tbody) return;
    const topics = window.P1Discussions.getTopics(filter === 'all' ? null : filter);
    tbody.innerHTML = topics.map((t) => {
      const replies = t.replies.length;
      const last = replies
        ? window.P1Discussions.formatRelative(Math.max(...t.replies.map((r) => r.createdAt)))
        : window.P1Discussions.formatRelative(t.createdAt);
      return `
        <tr>
          <td>
            ${t.pinned ? '<span class="disc-pin">PINNED</span>' : ''}
            <a class="disc-topic-title" href="topic.html?id=${t.id}">${t.title}</a>
            <div class="disc-topic-meta">
              ${window.P1Discussions.catName(t.category)} · by ${t.author}
            </div>
          </td>
          <td class="num">${replies}</td>
          <td class="num hide-sm">${t.views}</td>
          <td class="num hide-sm">${last}</td>
        </tr>`;
    }).join('');
  }

  renderTable();
});
