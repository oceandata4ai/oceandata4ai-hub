document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`.nav-links a[data-page="${page}"]`).forEach((el) => {
      el.classList.add('active');
    });
  }

  const filterRoot = document.getElementById('blog-filters');
  const listRoot = document.getElementById('blog-list');
  if (filterRoot && listRoot && window.M1_BLOG) {
    const render = (filter) => {
      const items = filter === 'all'
        ? window.M1_BLOG
        : window.M1_BLOG.filter((a) => a.tag === filter);
      listRoot.innerHTML = items.map((a) => `
        <a class="article-row" href="${a.url}" target="_blank" rel="noopener noreferrer" data-tag="${a.tag}">
          <div>
            <h3>${a.title}</h3>
            <div class="article-meta"><span class="tag tag-${a.tag === 'deep-dives' ? 'deep' : a.tag === 'user-stories' ? 'stories' : a.tag}">${a.tagLabel}</span> · ${a.date}</div>
          </div>
          <span aria-hidden="true">↗</span>
        </a>
      `).join('');
    };

    filterRoot.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        filterRoot.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter);
      });
    });

    render('all');
  }

  const homeBlog = document.getElementById('home-blog-list');
  if (homeBlog && window.M1_BLOG) {
    homeBlog.innerHTML = window.M1_BLOG.slice(0, 4).map((a) => `
      <a class="article-row" href="${a.url}" target="_blank" rel="noopener noreferrer">
        <div>
          <h3>${a.title}</h3>
          <div class="article-meta"><span class="tag tag-${a.tag === 'deep-dives' ? 'deep' : a.tag === 'user-stories' ? 'stories' : a.tag}">${a.tagLabel}</span> · ${a.date}</div>
        </div>
        <span aria-hidden="true">↗</span>
      </a>
    `).join('');
  }

  document.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      if (msg) {
        msg.textContent = 'Demo only — configure Formspree in production.';
        msg.style.color = 'var(--accent)';
      }
    });
  });
});

document.querySelectorAll('[data-nav-dropdown]').forEach((dropdown) => {
  const trigger = dropdown.querySelector('.nav-dropdown-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('[data-nav-dropdown].open').forEach((d) => d.classList.remove('open'));
});
