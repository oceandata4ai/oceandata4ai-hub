document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) {
    location.href = 'index.html';
    return;
  }

  window.P1Discussions.incrementViews(id);
  const topic = window.P1Discussions.getTopic(id);
  if (!topic) {
    document.getElementById('disc-thread').innerHTML = '<p>Topic not found.</p>';
    return;
  }

  document.title = `${topic.title} — Ask OBC`;
  document.getElementById('disc-breadcrumb').innerHTML = `
    <a href="index.html">Ask OBC</a> ›
    <a href="index.html?cat=${topic.category}">${window.P1Discussions.catName(topic.category)}</a>`;
  document.getElementById('disc-topic-title').textContent = topic.title;
  document.getElementById('disc-topic-meta').innerHTML = `
    ${topic.views} views · ${topic.replies.length} replies · ${window.P1Discussions.formatRelative(topic.createdAt)}`;

  const posts = document.getElementById('disc-posts');
  const opHtml = `
    <article class="disc-post op">
      <div class="disc-post-head">
        <span class="disc-avatar">${window.P1Discussions.initials(topic.author)}</span>
        <div><strong>${topic.author}</strong><div style="font-size:0.8rem;color:var(--text-muted)">Original post</div></div>
      </div>
      <div class="disc-post-body">${window.P1Discussions.renderMarkdown(topic.body)}</div>
    </article>`;

  const replyHtml = topic.replies.map((r) => `
    <article class="disc-post">
      <div class="disc-post-head">
        <span class="disc-avatar">${window.P1Discussions.initials(r.author)}</span>
        <div><strong>${r.author}</strong><div style="font-size:0.8rem;color:var(--text-muted)">${window.P1Discussions.formatRelative(r.createdAt)}</div></div>
      </div>
      <div class="disc-post-body">${window.P1Discussions.renderMarkdown(r.body)}</div>
    </article>`).join('');

  posts.innerHTML = opHtml + replyHtml;

  document.getElementById('reply-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('p1_user') || 'null');
    if (!user) {
      document.getElementById('auth-modal')?.classList.add('open');
      return;
    }
    const body = document.getElementById('reply-body').value.trim();
    if (!body) return;
    const author = user.name.replace(/\s+/g, '_').toLowerCase();
    window.P1Discussions.addReply(id, { author, body });
    location.reload();
  });
});
