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
    nav.querySelectorAll('.nav-links a, .nav-dropdown-menu a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  document.querySelectorAll('[data-nav-dropdown]').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('[data-nav-dropdown].open').forEach((dropdown) => {
      dropdown.classList.remove('open');
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });

  const current = document.body.dataset.page;
  if (current) {
    document.querySelectorAll(`.nav-links a[data-page="${current}"]`).forEach((el) => {
      el.classList.add('active');
    });
    document.querySelectorAll(`.nav-dropdown-menu a[data-page="${current}"]`).forEach((el) => {
      el.classList.add('active');
      const dropdown = el.closest('[data-nav-dropdown]');
      if (dropdown) dropdown.querySelector('.nav-dropdown-trigger')?.classList.add('active');
    });
    if (current === 'qa-oug') {
      document.querySelectorAll('.nav-links a[data-page="qa-oug"]').forEach((el) => {
        el.classList.add('active');
      });
    }
  }

  document.querySelectorAll('.filter-tabs[data-tag-filters]').forEach((tabs) => {
    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      tabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.articles-grid [data-category]').forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.filter-tabs:not([data-tag-filters])').forEach((tabs) => {
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
