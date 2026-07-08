document.addEventListener('DOMContentLoaded', () => {
  const auth = window.O4AI_QA_AUTH;
  if (!auth) return;

  const loginGate = document.getElementById('qa-login-gate');
  const askPanel = document.getElementById('qa-ask-panel');
  const userBadge = document.getElementById('qa-user-badge');
  const form = document.getElementById('qa-ask-form');
  const note = document.getElementById('qa-ask-note');
  const editor = document.getElementById('qa-body-editor');
  const fileInput = document.getElementById('qa-image-input');
  const imagePreview = document.getElementById('qa-image-preview');

  const authForm = document.getElementById('qa-auth-form');
  const authNote = document.getElementById('qa-auth-note');
  const authTitle = document.getElementById('qa-auth-title');
  const authSubmit = document.getElementById('qa-auth-submit');
  const authSwitch = document.getElementById('qa-auth-switch');
  const signupFields = document.getElementById('qa-signup-fields');
  const emailDisplay = document.getElementById('qa-email-display');
  const emailValue = document.getElementById('qa-email-value');
  const emailEditBtn = document.getElementById('qa-email-edit');
  const emailField = document.getElementById('qa-email-field');
  const emailInput = document.getElementById('qa-email');
  const passwordInput = document.getElementById('qa-password');
  const passwordToggle = document.getElementById('qa-password-toggle');
  const companyInput = document.getElementById('qa-company');
  const termsInput = document.getElementById('qa-terms');
  const ruleEls = {
    minLength: document.querySelector('[data-rule="min-length"]'),
    threeGroups: document.querySelector('[data-rule="three-groups"]'),
    lower: document.querySelector('[data-rule="lower"]'),
    upper: document.querySelector('[data-rule="upper"]'),
    digit: document.querySelector('[data-rule="digit"]'),
    special: document.querySelector('[data-rule="special"]'),
  };

  let authMode = 'signup';
  let emailEditing = true;

  const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

  function setAuthMode(mode) {
    authMode = mode;
    const isSignup = mode === 'signup';
    authTitle.textContent = isSignup ? 'Sign up for Ask OUG' : 'Sign in to Ask OUG';
    authSubmit.textContent = isSignup ? 'Sign up with email' : 'Sign in with email';
    signupFields.hidden = !isSignup;
    passwordInput.autocomplete = isSignup ? 'new-password' : 'current-password';
    companyInput.required = isSignup;

    if (isSignup) {
      const hasEmail = Boolean(emailInput?.value.trim());
      emailEditing = !hasEmail;
      emailDisplay.hidden = emailEditing;
      emailField.hidden = !emailEditing;
    } else {
      emailDisplay.hidden = true;
      emailField.hidden = false;
    }
    authSwitch.innerHTML = isSignup
      ? 'Already have an account? <button type="button" class="qa-auth-link" data-auth-mode="signin">Sign in</button>'
      : 'New here? <button type="button" class="qa-auth-link" data-auth-mode="signup">Sign up</button>';
    authSwitch.querySelectorAll('[data-auth-mode]').forEach((btn) => {
      btn.addEventListener('click', () => setAuthMode(btn.dataset.authMode));
    });
  }

  function updatePasswordRules() {
    const rules = auth.getPasswordRules(passwordInput?.value || '');
    Object.entries(ruleEls).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle('is-met', Boolean(rules[key]));
    });
    return rules;
  }

  function syncEmailDisplay() {
    if (!emailInput || !emailValue) return;
    emailValue.textContent = emailInput.value.trim() || 'your.email@company.com';
  }

  function renderAuthState() {
    const user = auth.getUser();
    const loggedIn = auth.isLoggedIn();

    if (loginGate) loginGate.hidden = loggedIn;
    if (askPanel) askPanel.hidden = !loggedIn;

    if (userBadge) {
      if (!loggedIn) {
        userBadge.hidden = true;
        return;
      }
      userBadge.hidden = false;
      userBadge.innerHTML = `
        <span class="qa-user-pill">
          <span class="qa-user-avatar" aria-hidden="true">${user.displayName.charAt(0).toUpperCase()}</span>
          Signed in as <strong>${user.email}</strong>
          ${user.company ? `<span class="qa-user-provider">${user.company}</span>` : ''}
        </span>
        <button type="button" class="btn btn-ghost btn-sm" id="qa-logout-btn">Sign out</button>
      `;
      document.getElementById('qa-logout-btn')?.addEventListener('click', () => {
        auth.logout();
        renderAuthState();
        setAuthMode('signin');
      });
    }
  }

  emailEditBtn?.addEventListener('click', () => {
    emailEditing = true;
    emailDisplay.hidden = true;
    emailField.hidden = false;
    emailInput?.focus();
  });

  emailInput?.addEventListener('blur', () => {
    if (authMode !== 'signup') return;
    syncEmailDisplay();
    if (emailInput.value.trim()) {
      emailEditing = false;
      emailDisplay.hidden = false;
      emailField.hidden = true;
    }
  });

  passwordInput?.addEventListener('input', updatePasswordRules);
  passwordToggle?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    passwordToggle.textContent = isPassword ? '🙈' : '👁';
  });

  authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    authNote.textContent = '';
    authNote.classList.remove('qa-auth-error');

    try {
      if (authMode === 'signup') {
        if (!termsInput?.checked) throw new Error('Please accept the terms and privacy policy.');
        await auth.register({
          email: emailInput.value,
          password: passwordInput.value,
          company: companyInput.value,
        });
      } else {
        await auth.signIn({
          email: emailInput.value,
          password: passwordInput.value,
        });
      }
      renderAuthState();
      if (note) note.textContent = 'You are signed in. Compose your question below.';
    } catch (err) {
      authNote.textContent = err.message || 'Unable to sign in.';
      authNote.classList.add('qa-auth-error');
    }
  });

  function insertImage(dataUrl, name) {
    if (!editor) return;
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = name || 'Uploaded image';
    img.className = 'qa-inline-image';
    editor.appendChild(document.createElement('br'));
    editor.appendChild(img);
    editor.appendChild(document.createElement('br'));
    syncPreview(dataUrl, name);
  }

  function syncPreview(dataUrl, name) {
    if (!imagePreview) return;
    const item = document.createElement('div');
    item.className = 'qa-image-thumb';
    item.innerHTML = `<img src="${dataUrl}" alt="${name || 'attachment'}" /><span>${name || 'image'}</span>`;
    imagePreview.appendChild(item);
    imagePreview.hidden = false;
  }

  function handleImageFile(file) {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      note.textContent = 'Only PNG, JPEG, GIF, and WebP images are supported.';
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      note.textContent = 'Image must be 2 MB or smaller for this demo.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => insertImage(reader.result, file.name);
    reader.readAsDataURL(file);
  }

  document.getElementById('qa-insert-image')?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', () => {
    Array.from(fileInput.files || []).forEach(handleImageFile);
    fileInput.value = '';
  });

  editor?.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        handleImageFile(item.getAsFile());
      }
    }
  });

  editor?.addEventListener('dragover', (e) => {
    e.preventDefault();
    editor.classList.add('is-dragover');
  });
  editor?.addEventListener('dragleave', () => editor.classList.remove('is-dragover'));
  editor?.addEventListener('drop', (e) => {
    e.preventDefault();
    editor.classList.remove('is-dragover');
    Array.from(e.dataTransfer?.files || []).forEach(handleImageFile);
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!auth.isLoggedIn()) {
      note.textContent = 'Please sign in before posting.';
      renderAuthState();
      return;
    }
    const title = form.title.value.trim();
    const bodyHtml = editor?.innerHTML.trim() || '';
    const bodyText = editor?.innerText.trim() || '';
    if (!title || !bodyText) {
      note.textContent = 'Title and body are required.';
      return;
    }
    const user = auth.getUser();
    const draft = {
      board: form.board.value,
      title,
      bodyHtml,
      author: user.email,
      company: user.company,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('o4ai_qa_last_draft', JSON.stringify(draft));
    note.textContent = 'Preview saved locally for demo. Full posting opens after legal review & Discourse setup.';
  });

  setAuthMode('signup');
  syncEmailDisplay();
  updatePasswordRules();
  renderAuthState();
});
