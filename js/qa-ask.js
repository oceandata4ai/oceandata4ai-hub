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

  const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

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
          Signed in as <strong>${user.displayName}</strong>
          <span class="qa-user-provider">via ${user.provider}</span>
        </span>
        <button type="button" class="btn btn-ghost btn-sm" id="qa-logout-btn">Sign out</button>
      `;
      document.getElementById('qa-logout-btn')?.addEventListener('click', () => {
        auth.logout();
        renderAuthState();
      });
    }
  }

  document.querySelectorAll('[data-qa-login]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.qaLogin;
      auth.login(provider);
      renderAuthState();
      note.textContent = 'You are signed in. Compose your question below.';
    });
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
    const draft = {
      board: form.board.value,
      title,
      bodyHtml,
      author: auth.getUser().displayName,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('o4ai_qa_last_draft', JSON.stringify(draft));
    note.textContent = 'Preview saved locally for demo. Full posting opens after legal review & Discourse setup.';
  });

  renderAuthState();
});
