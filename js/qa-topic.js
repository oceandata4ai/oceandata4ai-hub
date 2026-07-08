document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const topics = window.OCEANDATA4AI_QA_TOPICS || {};
  const topic = slug ? topics[slug] : null;
  const root = document.getElementById('qa-topic-root');
  if (!root || !topic) {
    if (root) {
      root.innerHTML = '<p class="qa-error">Topic not found. <a href="oug-help.html">Back to Ask OUG</a></p>';
    }
    return;
  }

  document.title = `${topic.title} — OceanData4AI Community`;
  const breadcrumb = document.getElementById('qa-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="oug-help.html">${topic.boardLabel}</a> / <span>${topic.title}</span>`;
  }

  const tags = (topic.tags || [])
    .map((t) => `<span class="tag tag-slate">${t}</span>`)
    .join('');

  const replies = (topic.replies || [])
    .map(
      (r) => `<article class="qa-reply">
        <header><strong>${r.author}</strong> · <time>${r.date}</time></header>
        <div class="qa-reply-body">${r.body}</div>
      </article>`
    )
    .join('');

  root.innerHTML = `
    <article class="qa-thread">
      <h1>${topic.title}</h1>
      <div class="qa-thread-meta">
        <span>${topic.author}</span> · <time>${topic.date}</time>
        ${tags ? `<div class="qa-topic-tags">${tags}</div>` : ''}
      </div>
      <div class="qa-thread-body">${topic.body}</div>
    </article>
    ${replies ? `<section class="qa-replies"><h2>${topic.replies.length} ${topic.replies.length === 1 ? 'Reply' : 'Replies'}</h2>${replies}</section>` : '<p class="qa-no-replies">No replies yet — be the first to respond after posting opens.</p>'}
    <div class="qa-reply-form-demo">
      <h3>Reply</h3>
      <p class="form-note">Posting and replies open when hosted Q&amp;A goes live (post legal review). Browse topics on-site for now.</p>
    </div>
  `;
});
