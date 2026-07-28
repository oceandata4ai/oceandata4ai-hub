window.P1_CONFIG = {
  discord: 'https://discord.com/channels/1331061822945624085/1331061823465590809',
  reddit: 'https://www.reddit.com/r/OceanBase_User_Group/',
  medium: 'https://medium.com/@pub_opensource_global',
  github: 'https://github.com/oceanbase/oceanbase',
  linkedin: 'https://www.linkedin.com/groups/24360001/',
  docs: 'https://en.oceanbase.com/docs',
  website: 'https://en.oceanbase.com',
};

function p1Paths() {
  const inDisc = /\/p1\/discussions\//.test(location.pathname) || location.pathname.endsWith('/discussions');
  const inLegal = /\/p1\/legal\//.test(location.pathname);
  if (inDisc) {
    return { root: '..', assets: '../..', disc: '.', legal: '../legal', m1: '../../m1' };
  }
  if (inLegal) {
    return { root: '..', assets: '../..', disc: '../discussions', legal: '.', m1: '../../m1' };
  }
  return { root: '.', assets: '..', disc: 'discussions', legal: 'legal', m1: '../m1' };
}

function p1RenderLayout(activePage) {
  const p = p1Paths();

  const banner = document.getElementById('p1-banner');
  if (banner) {
    banner.innerHTML = `<strong>Phase 1 Demo</strong> · Home + Ask OBC + About + Contact + Legal · <a href="${p.m1}/index.html">M1 hub ↗</a>`;
  }

  const nav = document.getElementById('p1-nav');
  if (!nav) return;

  const user = JSON.parse(localStorage.getItem('p1_user') || 'null');
  const authHtml = user
    ? `<span class="user-chip"><span class="disc-avatar">${user.initials}</span>${user.name}</span>`
      + ` <button type="button" class="btn btn-ghost btn-sm" id="p1-signout">Sign out</button>`
    : `<button type="button" class="btn btn-ghost btn-sm" id="p1-signin">Sign in</button>`;

  const link = (href, page, label) =>
    `<a href="${href}" ${activePage === page ? 'class="active"' : ''}>${label}</a>`;

  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="${p.root}/index.html" class="logo">
        <img src="${p.assets}/assets/oceandata4ai-logo.svg" alt="" class="logo-img" width="36" height="36" />
        OceanData4AI
      </a>
      <nav class="nav-links">
        ${link(`${p.root}/index.html`, 'home', 'Home')}
        ${link(`${p.disc}/index.html`, 'ask-obc', 'Ask OBC')}
        ${link(`${p.root}/about.html`, 'about', 'About')}
        ${link(`${p.root}/contact.html`, 'contact', 'Contact')}
      </nav>
      <div class="nav-actions">
        <a href="${window.P1_CONFIG.discord}" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">Join Discord ↗</a>
        ${authHtml}
      </div>
      <button class="nav-toggle" type="button" aria-label="Menu"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>`;

  const footer = document.getElementById('p1-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:2rem;margin-bottom:2rem">
          <div>
            <strong>OceanData4AI</strong>
            <p style="margin:0.5rem 0 0;font-size:0.85rem;color:var(--text-muted)">Vendor-neutral community for AI data infrastructure.</p>
          </div>
          <div>
            <h4 style="margin:0 0 0.75rem;font-size:0.85rem">Community</h4>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.85rem">
              <li><a href="${p.disc}/index.html">Ask OBC</a></li>
              <li><a href="${p.root}/about.html">About</a></li>
              <li><a href="${p.root}/contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style="margin:0 0 0.75rem;font-size:0.85rem">Legal</h4>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.85rem">
              <li><a href="${p.legal}/privacy.html">Privacy Policy</a></li>
              <li><a href="${p.legal}/terms.html">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h4 style="margin:0 0 0.75rem;font-size:0.85rem">External</h4>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.85rem">
              <li><a href="${window.P1_CONFIG.website}" target="_blank" rel="noopener">en.oceanbase.com ↗</a></li>
              <li><a href="${window.P1_CONFIG.reddit}" target="_blank" rel="noopener">Reddit ↗</a></li>
            </ul>
          </div>
        </div>
        <div style="padding-top:1rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;font-size:0.8rem;color:var(--text-muted)">
          <span>© 2026 OceanData4AI · Phase 1 demo</span>
          <span>Ask OBC data stored in browser localStorage</span>
        </div>
      </div>`;
  }

  document.getElementById('p1-signin')?.addEventListener('click', () => {
    document.getElementById('auth-modal')?.classList.add('open');
  });
  document.getElementById('p1-signout')?.addEventListener('click', () => {
    localStorage.removeItem('p1_user');
    location.reload();
  });

  nav.querySelector('.nav-toggle')?.addEventListener('click', () => nav.classList.toggle('open'));
}

function p1RequireAuth() {
  const user = JSON.parse(localStorage.getItem('p1_user') || 'null');
  if (!user) {
    document.getElementById('auth-modal')?.classList.add('open');
    return null;
  }
  return user;
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page) p1RenderLayout(page);

  document.getElementById('auth-google-demo')?.addEventListener('click', () => {
    localStorage.setItem('p1_user', JSON.stringify({ name: 'Demo User', initials: 'DU', email: 'demo@example.com' }));
    document.getElementById('auth-modal')?.classList.remove('open');
    if (document.body.dataset.afterAuth === 'reload') location.reload();
    else if (document.body.dataset.afterAuth === 'submit') {
      document.getElementById('new-topic-form')?.requestSubmit();
    }
  });
  document.getElementById('auth-modal-close')?.addEventListener('click', () => {
    document.getElementById('auth-modal')?.classList.remove('open');
  });
});
