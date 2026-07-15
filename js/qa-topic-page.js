document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const root = document.getElementById('qa-topic-root');
  const qa = window.OCEANDATA4AI_QA;
  const auth = window.O4AI_QA_AUTH;

  if (!root || !qa) return;

  let topic;
  try {
    const { map } = await qa.loadTopics();
    topic = slug ? map[slug] : null;
  } catch (err) {
    root.innerHTML =
      '<p class="qa-error">Could not load topic. <a href="oug-help.html">Back to Ask OUG</a></p>';
    console.error(err);
    return;
  }

  if (!topic) {
    root.innerHTML =
      '<p class="qa-error">Topic not found. <a href="oug-help.html">Back to Ask OUG</a></p>';
    return;
  }

  renderTopic(root, topic, qa, auth);
});

function renderTopic(root, topic, qa, auth) {
  document.title = `${topic.title} — OceanData4AI Community`;
  setMetaDescription(topic.excerpt || topic.title);

  const breadcrumb = document.getElementById('qa-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="oug-help.html">${topic.boardLabel}</a> / <span>${escapeHtml(topic.title)}</span>`;
  }

  const replies = topic.replies || [];
  const replyHtml = replies
    .map(
      (r) => `<article class="qa-reply">
        <header><strong>${escapeHtml(r.author)}</strong> · <time>${escapeHtml(r.date)}</time></header>
        <div class="qa-reply-body">${r.body}</div>
      </article>`
    )
    .join('');

  const replySection = replies.length
    ? `<section class="qa-replies"><h2>${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}</h2>${replyHtml}</section>`
    : '<p class="qa-no-replies">No replies yet.</p>';

  const loggedIn = auth?.isLoggedIn?.();
  const replyPanel = loggedIn
    ? `<form class="qa-reply-form" id="qa-reply-form" novalidate>
        <h3>Reply</h3>
        <label for="qa-reply-body">Your answer</label>
        <textarea id="qa-reply-body" rows="5" required placeholder="Share steps, links, or follow-up questions."></textarea>
        <button type="submit" class="btn btn-primary">Post reply</button>
        <p class="form-note" id="qa-reply-note"></p>
      </form>`
    : `<div class="qa-signin-prompt">
        <p>Sign in to reply on-site.</p>
        <a href="ask.html?mode=signin&amp;return=${encodeURIComponent(window.location.href)}" class="btn btn-primary">Sign in</a>
      </div>`;

  root.innerHTML = `
    <article class="qa-thread">
      <h1>${escapeHtml(topic.title)}</h1>
      <div class="qa-thread-meta">
        <span>${escapeHtml(topic.author)}</span> · <time>${escapeHtml(topic.date)}</time>
      </div>
      <div class="qa-thread-body">${topic.body}</div>
    </article>
    ${replySection}
    ${replyPanel}
  `;

  if (loggedIn) {
    document.getElementById('qa-reply-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const note = document.getElementById('qa-reply-note');
      const bodyEl = document.getElementById('qa-reply-body');
      const body = bodyEl?.value.trim();
      if (!body) {
        if (note) note.textContent = 'Reply cannot be empty.';
        return;
      }
      const user = auth.getUser();
      window.OCEANDATA4AI_QA_STORE.addReply(topic.slug, {
        author: user.email,
        body: `<p>${escapeHtml(body).replace(/\n/g, '<br>')}</p>`,
      });
      qa.clearCache();
      setTimeout(() => window.location.replace('oug-help.html'), 0);
    });
  }
}

function setMetaDescription(text) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = text;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
