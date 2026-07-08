/** Demo Q&A email auth — replace with Discourse / hosted auth when live */
(function () {
  const SESSION_KEY = 'o4ai_qa_session';
  const ACCOUNTS_KEY = 'o4ai_qa_accounts';

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    if (value === null || value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }

  async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function getPasswordRules(password) {
    const lower = /[a-z]/.test(password);
    const upper = /[A-Z]/.test(password);
    const digit = /[0-9]/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);
    const groups = [lower, upper, digit, special].filter(Boolean).length;

    return {
      minLength: password.length >= 12,
      threeGroups: groups >= 3,
      lower,
      upper,
      digit,
      special,
      valid: password.length >= 12 && groups >= 3,
    };
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  window.O4AI_QA_AUTH = {
    getPasswordRules,
    isValidEmail,

    getUser() {
      return readJson(SESSION_KEY, null);
    },

    isLoggedIn() {
      return Boolean(readJson(SESSION_KEY, null)?.email);
    },

    getAccount(email) {
      const accounts = readJson(ACCOUNTS_KEY, {});
      return accounts[email.toLowerCase()] || null;
    },

    async register({ email, password, company }) {
      const normalized = email.trim().toLowerCase();
      if (!isValidEmail(normalized)) throw new Error('Enter a valid email address.');
      if (!getPasswordRules(password).valid) throw new Error('Password does not meet requirements.');
      if (!company?.trim()) throw new Error('Company name is required.');

      const accounts = readJson(ACCOUNTS_KEY, {});
      if (accounts[normalized]) throw new Error('An account with this email already exists. Sign in instead.');

      const passwordHash = await hashPassword(password);
      accounts[normalized] = {
        email: normalized,
        company: company.trim(),
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      writeJson(ACCOUNTS_KEY, accounts);

      const session = {
        email: normalized,
        displayName: normalized.split('@')[0],
        company: company.trim(),
        provider: 'email',
        loggedInAt: new Date().toISOString(),
      };
      writeJson(SESSION_KEY, session);
      return session;
    },

    async signIn({ email, password }) {
      const normalized = email.trim().toLowerCase();
      const account = this.getAccount(normalized);
      if (!account) throw new Error('No account found for this email. Sign up first.');

      const passwordHash = await hashPassword(password);
      if (passwordHash !== account.passwordHash) throw new Error('Incorrect password.');

      const session = {
        email: normalized,
        displayName: normalized.split('@')[0],
        company: account.company,
        provider: 'email',
        loggedInAt: new Date().toISOString(),
      };
      writeJson(SESSION_KEY, session);
      return session;
    },

    logout() {
      writeJson(SESSION_KEY, null);
    },
  };
})();
