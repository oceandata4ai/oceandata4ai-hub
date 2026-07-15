/** Site-wide nav sign-in state (uses O4AI_QA_AUTH session) */
document.addEventListener('DOMContentLoaded', () => {
  const auth = window.O4AI_QA_AUTH;
  const link = document.querySelector('[data-qa-nav-signin]');
  if (!auth || !link) return;

  const signInHref = link.getAttribute('href') || link.dataset.signinHref || '#';
  const returnParam = encodeURIComponent(window.location.href);
  const baseSignIn = signInHref.split('?')[0];

  if (auth.isLoggedIn()) {
    const user = auth.getUser();
    link.textContent = user?.displayName || user?.email?.split('@')[0] || 'Account';
    link.setAttribute('aria-label', `Signed in as ${user?.email || 'community member'}`);
    link.classList.add('is-signed-in');
    return;
  }

  link.textContent = 'Sign in';
  link.href = `${baseSignIn}?mode=signin&return=${returnParam}`;
});
