# OceanData4AI Hub — Phase 1 Demo

Static HTML Hub — 7 pages + SaaS outbound links. No build step.

## Preview

| Environment | URL |
|-------------|-----|
| **Main Hub** | https://oceandata4ai.github.io/oceandata4ai-hub/ |
| **OceanBase Community (oceanbase.ai demo)** | https://oceandata4ai.github.io/oceandata4ai-hub/oceanbase-ai/ |
| **M1 milestone** | https://oceandata4ai.github.io/oceandata4ai-hub/m1/ |
| **Phase 1 (trimmed)** | https://oceandata4ai.github.io/oceandata4ai-hub/phase1/ |

```bash
cd /Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub
python3 -m http.server 8080
# → http://localhost:8080
```

## M1 scope (2026-07)

- **Blog** categories: News, Tutorials, Deep Dives, **Builder Stories**
- Logo SVG in nav + favicon (`assets/oceandata4ai-logo.svg`)
- `sitemap.xml` for Search Console
- Formspree wiring in `js/form-config.js` (IDs after legal review)

## Pages

| File | Role |
|------|------|
| `index.html` | Home — hero, gather, blog feed, events, join CTA |
| `about.html` | Mission, neutrality, OB disclosure |
| `qa/ask.html` | Sign up / sign in demo (email verification) |
| `blog.html` | Category filters + Medium article grid |
| `events.html` | Discord-first events |
| `join.html` / `contact.html` | Forms (Formspree) |
| `fellows.html` | Contributor directory |
| `privacy.html` / `conduct.html` | Legal drafts — pending review |

## Deploy to GitHub Pages

```bash
git push github main
```

Settings → Pages → source: `main` branch, `/ (root)`.

## Formspree

See `js/form-config.js` — enable after Privacy/CoC legal sign-off.

## Ask OUG — verification email (any registering user)

When a user signs up on `qa/ask.html`, the site sends a **ClickHouse-style confirmation email** to **the email they entered** (not a fixed test address). They must click **Verify email** before posting.

1. Create a free [EmailJS](https://www.emailjs.com/) account
2. Add an email service (Gmail, SendGrid, etc.)
3. Create a template with variables: `{{to_email}}`, `{{verify_url}}`, `{{subject}}`, `{{message}}`, `{{from_name}}`
   - Set the template **To** field to `{{to_email}}`
   - Example body:

```
Hi there,

Thanks for registering an account with the OceanData4AI Community. To complete your sign up, please verify your email.

Verify email: {{verify_url}}

This link will expire after 24 hours.

Regards,
The OceanData4AI Community
```

4. Paste keys into `js/qa-email-config.js`:

```js
emailjs: {
  publicKey: 'your_public_key',
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
},
```

Until keys are set, signup still works but shows a **dev fallback link** instead of delivering mail. Production should use EmailJS, Discourse SSO, or your own SMTP API.

Server-side alternative: `scripts/send-verification-email.py` (requires `SMTP_*` env vars).
