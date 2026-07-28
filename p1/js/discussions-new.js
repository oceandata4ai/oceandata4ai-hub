document.addEventListener('DOMContentLoaded', () => {
  const catSelect = document.getElementById('category');
  if (catSelect) {
    catSelect.innerHTML = window.P1_CATEGORIES.map((c) =>
      `<option value="${c.slug}">${c.name}</option>`
    ).join('');
  }

  const params = new URLSearchParams(location.search);
  if (params.get('cat') && catSelect) catSelect.value = params.get('cat');

  document.getElementById('new-topic-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('p1_user') || 'null');
    if (!user) {
      document.body.dataset.afterAuth = 'submit';
      document.getElementById('auth-modal')?.classList.add('open');
      return;
    }
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const category = catSelect.value;
    if (!title || !body) return;
    const author = user.name.replace(/\s+/g, '_').toLowerCase();
    const topic = window.P1Discussions.addTopic({ category, title, body, author });
    location.href = `topic.html?id=${topic.id}`;
  });
});
