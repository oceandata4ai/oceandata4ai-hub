document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    const isDark = theme === 'dark';
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const current = document.body.dataset.page;
  if (current) {
    document.querySelectorAll(`.nav-links a[data-page="${current}"]`).forEach((el) => {
      el.classList.add('active');
    });
  }

  document.querySelectorAll('.filter-tabs').forEach((tabs) => {
    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      tabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('form[data-formspree]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const key = form.dataset.formspree;
      const forms = window.OCEANDATA4AI_FORMS || {};
      const formId = forms[key];
      const btn = form.querySelector('button[type="submit"]');
      const success = form.querySelector('.form-success');
      const error = form.querySelector('.form-error');

      const showError = (message) => {
        if (!error) return;
        error.textContent = message;
        error.classList.add('show');
        if (success) success.classList.remove('show');
      };

      if (!formId) {
        showError('Form not connected yet. Add your Formspree ID in js/form-config.js (see README).');
        return;
      }

      if (btn) btn.disabled = true;
      if (error) error.classList.remove('show');

      try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || 'Submission failed. Please try again.');
        }
        if (success) success.classList.add('show');
        form.reset();
      } catch (err) {
        showError(err.message || 'Something went wrong. Please try again later.');
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  });
});
