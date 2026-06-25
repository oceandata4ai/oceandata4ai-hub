# OceanData4AI Hub — Visual Prototype (WYSIWYG)

Static HTML prototype matching PRD Phase 1 (7-page Hub + SaaS links). Open in any browser — no build step.

## Preview

**Live demo (GitHub Pages):** https://oceandata4ai.github.io/oceandata4ai-hub/

**M1 milestone demo (separate):** https://oceandata4ai.github.io/oceandata4ai-hub/m1/

```bash
open /Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub/index.html
```

Or start a local server:

```bash
cd /Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub
python3 -m http.server 8080
# → http://localhost:8080
```

## Pages

| File | PRD page | Notes |
|------|----------|-------|
| `index.html` | Home | Hero, latest articles, gather, events, join CTA |
| `about.html` | About | Mission, neutrality, stats |
| `fellows.html` | Fellows | Directory grid + topic filters (Phase 3 preview) |
| `fellow.html?slug=…` | Fellow profile | Bio + recent articles |
| `join.html` | Join | Discord/GitHub paths + Fellows form (Formspree) |
| `blog.html` | Blog | Category filters + article grid |
| `article.html` | Blog detail | Sample tutorial + Medium/Discord sidebar |
| `events.html` | Events | Upcoming event cards + empty past state |
| `contact.html` | Contact | Contact form (Formspree) |
| `privacy.html` | Legal | GDPR-friendly template |
| `conduct.html` | Legal | Contributor Covenant summary |

## WordPress migration

Use this prototype as the **visual spec** when building in WordPress + Astra. PRD: [`oceandata4ai-community-website-prd.md`](../references/oceandata4ai-community-website-prd.md)

1. **Colors**: accent `#0d9488`, violet `#6366f1`, bg `#f8f9fb`
2. **Fonts**: DM Sans (body), JetBrains Mono (code/mark)
3. **Home sections** → Astra blocks or Elementor sections in order
4. **Forms** → Contact Form 7 (Join Fellows + Contact fields per PRD §4.3.3/4.3.6)

## Form submissions (Formspree)

Prototype forms post to [Formspree](https://formspree.io) (free tier, no backend).

1. Sign up at [formspree.io](https://formspree.io) and create **two forms**: Fellows + Contact.
2. Open each form → copy the ID from the URL `https://formspree.io/f/`**`YOUR_ID`**
3. Paste into `js/form-config.js`:

```javascript
window.OCEANDATA4AI_FORMS = {
  fellows: 'your_fellows_form_id',
  contact: 'your_contact_form_id',
};
```

4. Submit a test application → view it at **Formspree dashboard → Submissions** (email notifications optional in form settings).

Until IDs are filled in, submit shows a configuration error instead of the success message.
5. **Blog categories** → WP categories matching filter tabs

## Structure

```
data4ai-hub/
├── index.html
├── about.html
├── join.html
├── blog.html
├── article.html
├── events.html
├── contact.html
├── privacy.html
├── conduct.html
├── css/styles.css
├── js/form-config.js
└── js/main.js
```
