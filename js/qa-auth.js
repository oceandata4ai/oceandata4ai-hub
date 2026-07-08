/** Demo Q&A auth — replace with Discourse SSO / OAuth when hosted */
(function () {
  const STORAGE_KEY = 'o4ai_qa_session';

  function readSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeSession(session) {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }

  window.O4AI_QA_AUTH = {
    storageKey: STORAGE_KEY,

    getUser() {
      return readSession();
    },

    isLoggedIn() {
      return Boolean(readSession()?.username);
    },

    login(provider, username) {
      const user = {
        provider,
        username: username || (provider === 'github' ? 'demo_builder' : 'community_member'),
        displayName: username || (provider === 'github' ? 'Demo Builder' : 'Community Member'),
        loggedInAt: new Date().toISOString(),
      };
      writeSession(user);
      return user;
    },

    logout() {
      writeSession(null);
    },
  };
})();
