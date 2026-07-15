/** Site-wide nav sign-in / sign-out (uses O4AI_QA_AUTH session) */
document.addEventListener('DOMContentLoaded', () => {
  const auth = window.O4AI_QA_AUTH;
  const link = document.querySelector('[data-qa-nav-signin]');
  if (!auth || !link) return;

  const signInHref = link.getAttribute('href') || link.dataset.signinHref || '#';
  const returnParam = encodeURIComponent(window.location.href);
  const baseSignIn = signInHref.split('?')[0];

  function renderSignedOut() {
    link.textContent = 'Sign in';
    link.href = `${baseSignIn}?mode=signin&return=${returnParam}`;
    link.classList.remove('is-signed-in');
    link.removeAttribute('aria-label');
    link.hidden = false;
    const signOutBtn = link.parentElement?.querySelector('[data-qa-nav-signout]');
    if (signOutBtn) signOutBtn.remove();
  }

  function renderSignedIn() {
    const user = auth.getUser();
    const label = user?.displayName || user?.email?.split('@')[0] || 'Account';
    link.textContent = label;
    link.removeAttribute('href');
    link.classList.add('is-signed-in');
    link.setAttribute('aria-label', `Signed in as ${user?.email || 'community member'}`);
    link.setAttribute('role', 'status');

    let signOutBtn = link.parentElement?.querySelector('[data-qa-nav-signout]');
    if (!signOutBtn) {
      signOutBtn = document.createElement('button');
      signOutBtn.type = 'button';
      signOutBtn.className = 'btn btn-ghost btn-sm';
      signOutBtn.dataset.qaNavSignout = '';
      signOutBtn.textContent = 'Sign out';
      link.insertAdjacentElement('afterend', signOutBtn);
      signOutBtn.addEventListener('click', () => {
        auth.logout();
        renderSignedOut();
        window.location.reload();
      });
    }
  }

  if (auth.isLoggedIn()) {
    renderSignedIn();
  } else {
    renderSignedOut();
  }
});
