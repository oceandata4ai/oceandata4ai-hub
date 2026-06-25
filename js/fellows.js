(() => {
  const fellows = window.FELLOWS_DATA || [];

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const fellowCard = (fellow) => {
    const topics = fellow.topics.map((t) => `<span class="tag tag-slate">${escapeHtml(t)}</span>`).join('');
    const badge = fellow.featured ? '<span class="fellow-badge">Featured</span>' : '';
    return `
      <a href="fellow.html?slug=${encodeURIComponent(fellow.slug)}" class="fellow-card${fellow.featured ? ' fellow-card-featured' : ''}" data-topic="${escapeHtml(fellow.topicFilter || 'all')}">
        <div class="fellow-card-top">
          <div class="fellow-avatar fellow-avatar-${fellow.accent || 'slate'}" aria-hidden="true">${escapeHtml(fellow.initials)}</div>
          ${badge}
        </div>
        <h3>${escapeHtml(fellow.name)}</h3>
        <p class="fellow-role">${escapeHtml(fellow.role)}</p>
        <p class="fellow-bio">${escapeHtml(fellow.bio)}</p>
        <div class="fellow-topics">${topics}</div>
      </a>
    `;
  };

  const renderDirectory = () => {
    const grid = document.querySelector('[data-fellows-grid]');
    if (!grid) return;

    const applyFilter = () => {
      const filter =
        document.querySelector('.filter-tabs[data-fellow-filters] button.active')?.dataset.filter || 'all';
      grid.querySelectorAll('.fellow-card').forEach((card) => {
        const show = filter === 'all' || card.dataset.topic === filter;
        card.style.display = show ? '' : 'none';
      });
    };

    grid.innerHTML = fellows.map(fellowCard).join('');

    document.querySelectorAll('.filter-tabs[data-fellow-filters]').forEach((tabs) => {
      tabs.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        tabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter();
      });
    });
  };

  const renderFeatured = () => {
    const strip = document.querySelector('[data-fellows-featured]');
    if (!strip) return;
    const featured = fellows.filter((f) => f.featured);
    strip.innerHTML = featured.map(fellowCard).join('');
  };

  const renderProfile = () => {
    const root = document.querySelector('[data-fellow-profile]');
    if (!root) return;

    const slug = new URLSearchParams(window.location.search).get('slug');
    const fellow = fellows.find((f) => f.slug === slug);

    if (!fellow) {
      root.innerHTML = `
        <div class="fellow-not-found">
          <h1>Fellow not found</h1>
          <p>We couldn't find that profile. Browse the full directory instead.</p>
          <a href="fellows.html" class="btn btn-primary">View all Fellows</a>
        </div>
      `;
      document.title = 'Fellow — OceanData4AI Community';
      return;
    }

    document.title = `${fellow.name} — OceanData4AI Fellows`;
    const topics = fellow.topics.map((t) => `<span class="tag tag-slate">${escapeHtml(t)}</span>`).join('');
    const links = Object.entries(fellow.links || {})
      .filter(([, url]) => url)
      .map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`)
      .join('');
    const articles = (fellow.articles || [])
      .map(
        (a) => `
        <a href="${escapeHtml(a.url)}" class="fellow-article-link" target="_blank" rel="noopener noreferrer">
          <span class="tag tag-violet">${escapeHtml(a.tag)}</span>
          <span>${escapeHtml(a.title)}</span>
        </a>
      `
      )
      .join('');

    root.innerHTML = `
      <div class="fellow-profile-header">
        <div class="fellow-avatar fellow-avatar-lg fellow-avatar-${fellow.accent || 'slate'}" aria-hidden="true">${escapeHtml(fellow.initials)}</div>
        <div>
          <div class="section-kicker">Community Fellow</div>
          <h1>${escapeHtml(fellow.name)}</h1>
          <p class="fellow-role">${escapeHtml(fellow.role)}</p>
          <div class="fellow-topics">${topics}</div>
          ${links ? `<div class="fellow-links">${links}</div>` : ''}
        </div>
      </div>
      <div class="fellow-profile-body">
        <div class="about-card">
          <h3>About</h3>
          <p>${escapeHtml(fellow.bio)}</p>
        </div>
        ${
          articles
            ? `<div class="about-card" style="margin-top:20px">
          <h3>Recent articles</h3>
          <div class="fellow-articles">${articles}</div>
        </div>`
            : ''
        }
      </div>
      <p class="fellow-back"><a href="fellows.html" class="link-arrow">← All Fellows</a></p>
    `;
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderDirectory();
    renderFeatured();
    renderProfile();
  });
})();
