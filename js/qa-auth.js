/** Demo Q&A email auth — replace with Discourse / hosted auth when live */
(function () {
  const SESSION_KEY = 'o4ai_qa_session';
  const ACCOUNTS_KEY = 'o4ai_qa_accounts';
  const VERIFY_KEY = 'o4ai_qa_verifications';
  const LAST_VERIFY_KEY = 'o4ai_qa_last_verification';
  const RESET_MARKER_KEY = 'o4ai_qa_data_reset_version';
  const RESET_VERSION = '20260708-reset-accounts';
  const VERIFY_TTL_MS = 24 * 60 * 60 * 1000;

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

  function clearHistoricalAuthDataOnce() {
    try {
      if (localStorage.getItem(RESET_MARKER_KEY) === RESET_VERSION) return;
      [SESSION_KEY, ACCOUNTS_KEY, VERIFY_KEY, LAST_VERIFY_KEY].forEach((key) => {
        localStorage.removeItem(key);
      });
      localStorage.setItem(RESET_MARKER_KEY, RESET_VERSION);
    } catch {
      // localStorage can fail in private mode; skip cleanup silently.
    }
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

  function createVerificationToken(email) {
    const token = crypto.randomUUID().replace(/-/g, '');
    const verifications = readJson(VERIFY_KEY, {});
    verifications[token] = {
      email: email.toLowerCase(),
      expiresAt: Date.now() + VERIFY_TTL_MS,
      used: false,
    };
    writeJson(VERIFY_KEY, verifications);
    return token;
  }

  clearHistoricalAuthDataOnce();

  window.O4AI_QA_AUTH = {
    getPasswordRules,
    isValidEmail,

    getUser() {
      return readJson(SESSION_KEY, null);
    },

    isLoggedIn() {
      const user = readJson(SESSION_KEY, null);
      return Boolean(user?.email && user?.emailVerified);
    },

    isEmailVerified(email) {
      const account = this.getAccount(email);
      return Boolean(account?.emailVerified);
    },

    getAccount(email) {
      const accounts = readJson(ACCOUNTS_KEY, {});
      return accounts[email.toLowerCase()] || null;
    },

    verifyEmail(token, email) {
      if (!token || !email) return { ok: false, error: 'Invalid verification link.' };
      const normalized = email.trim().toLowerCase();
      const verifications = readJson(VERIFY_KEY, {});
      const entry = verifications[token];
      if (!entry || entry.email !== normalized) {
        return { ok: false, error: 'This verification link is invalid.' };
      }
      if (entry.used) return { ok: false, error: 'This link has already been used.' };
      if (Date.now() > entry.expiresAt) {
        return { ok: false, error: 'This link has expired. Please sign up again.' };
      }

      const accounts = readJson(ACCOUNTS_KEY, {});
      const account = accounts[normalized];
      if (!account) return { ok: false, error: 'Account not found.' };

      entry.used = true;
      verifications[token] = entry;
      writeJson(VERIFY_KEY, verifications);

      account.emailVerified = true;
      account.verifiedAt = new Date().toISOString();
      accounts[normalized] = account;
      writeJson(ACCOUNTS_KEY, accounts);

      const session = {
        email: normalized,
        displayName: normalized.split('@')[0],
        company: account.company,
        provider: 'email',
        emailVerified: true,
        loggedInAt: new Date().toISOString(),
      };
      writeJson(SESSION_KEY, session);
      return { ok: true, email: normalized };
    },

    async register({ email, password, company }) {
      const normalized = email.trim().toLowerCase();
      if (!isValidEmail(normalized)) throw new Error('Enter a valid email address.');
      if (!getPasswordRules(password).valid) throw new Error('Password does not meet requirements.');

      const accounts = readJson(ACCOUNTS_KEY, {});
      if (accounts[normalized]) throw new Error('An account with this email already exists. Sign in instead.');

      const companyName = company?.trim() || '';
      const passwordHash = await hashPassword(password);
      const token = createVerificationToken(normalized);
      accounts[normalized] = {
        email: normalized,
        company: companyName,
        passwordHash,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };
      writeJson(ACCOUNTS_KEY, accounts);
      writeJson(SESSION_KEY, null);

      return { email: normalized, company: companyName, verificationToken: token };
    },

    async signIn({ email, password }) {
      const normalized = email.trim().toLowerCase();
      const account = this.getAccount(normalized);
      if (!account) throw new Error('No account found for this email. Sign up first.');

      const passwordHash = await hashPassword(password);
      if (passwordHash !== account.passwordHash) throw new Error('Incorrect password.');
      if (!account.emailVerified) {
        throw new Error('Please verify your email before signing in. Check your inbox for the confirmation link.');
      }

      const session = {
        email: normalized,
        displayName: normalized.split('@')[0],
        company: account.company,
        provider: 'email',
        emailVerified: true,
        loggedInAt: new Date().toISOString(),
      };
      writeJson(SESSION_KEY, session);
      return session;
    },

    logout() {
      writeJson(SESSION_KEY, null);
    },

    resendVerification(email) {
      const normalized = email.trim().toLowerCase();
      if (!isValidEmail(normalized)) throw new Error('Enter a valid email address.');
      const account = this.getAccount(normalized);
      if (!account) throw new Error('No account found for this email. Sign up first.');
      if (account.emailVerified) throw new Error('This email is already verified. Sign in instead.');
      const token = createVerificationToken(normalized);
      return { email: normalized, verificationToken: token };
    },
  };
})();
