/** Site-wide nav sign-in / sign-out (uses O4AI_QA_AUTH session) */
document.addEventListener('DOMContentLoaded', () => {
  const auth = window.O4AI_QA_AUTH;
  const navActions = document.querySelector('.nav-actions');
  if (!auth || !navActions) return;

  const userSlot = ensureUserSlot(navActions);
  const signInHref = resolveSignInHref(navActions);

  function renderSignedOut() {
    userSlot.innerHTML = '';
    userSlot.classList.remove('is-open');

    const link = document.createElement('a');
    link.className = 'btn btn-ghost btn-sm';
    link.dataset.qaNavSignin = '';
    link.textContent = 'Sign in';
    link.href = `${signInHref}?mode=signin&return=${encodeURIComponent(window.location.href)}`;
    userSlot.appendChild(link);
  }

  function renderSignedIn() {
    const user = auth.getUser();
    const label = user?.displayName || user?.email?.split('@')[0] || 'Account';
    userSlot.innerHTML = '';
    userSlot.classList.remove('is-open');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn btn-ghost btn-sm qa-nav-user-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-label', `Account menu for ${user?.email || label}`);
    toggle.innerHTML = `<span class="qa-nav-user-label">${escapeHtml(label)}</span><span class="qa-nav-user-chevron" aria-hidden="true">▾</span>`;

    const menu = document.createElement('div');
    menu.className = 'qa-nav-user-menu';
    menu.hidden = true;

    const signOutBtn = document.createElement('button');
    signOutBtn.type = 'button';
    signOutBtn.className = 'qa-nav-user-item';
    signOutBtn.dataset.qaNavSignout = '';
    signOutBtn.textContent = 'Sign out';

    menu.appendChild(signOutBtn);
    userSlot.appendChild(toggle);
    userSlot.appendChild(menu);

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!userSlot.classList.contains('is-open'));
    });

    signOutBtn.addEventListener('click', () => {
      auth.logout();
      renderSignedOut();
      window.location.reload();
    });

    if (!userSlot.dataset.boundClose) {
      userSlot.dataset.boundClose = '1';
      document.addEventListener('click', (e) => {
        if (!userSlot.contains(e.target)) setOpen(false);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
      });
    }

    function setOpen(open) {
      userSlot.classList.toggle('is-open', open);
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    }
  }

  if (auth.isLoggedIn()) {
    renderSignedIn();
  } else {
    renderSignedOut();
  }
});

function ensureUserSlot(navActions) {
  let userSlot = navActions.querySelector('[data-qa-nav-user]');
  const existingSignIn = navActions.querySelector('[data-qa-nav-signin]');

  if (!userSlot) {
    userSlot = document.createElement('div');
    userSlot.className = 'qa-nav-user';
    userSlot.dataset.qaNavUser = '';
    navActions.appendChild(userSlot);
  } else {
    navActions.appendChild(userSlot);
  }

  if (existingSignIn && !userSlot.contains(existingSignIn)) {
    userSlot.appendChild(existingSignIn);
  }

  const straySignOut = navActions.querySelector('[data-qa-nav-signout]');
  if (straySignOut && !userSlot.contains(straySignOut)) {
    straySignOut.remove();
  }

  return userSlot;
}

function resolveSignInHref(navActions) {
  const existing = navActions.querySelector('[data-qa-nav-signin]');
  const href = existing?.getAttribute('href');
  if (href) return href.split('?')[0];

  const path = window.location.pathname;
  if (path.includes('/qa/')) return 'ask.html';
  if (path.includes('/phase1/')) return 'qa/ask.html';
  return 'qa/ask.html';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
