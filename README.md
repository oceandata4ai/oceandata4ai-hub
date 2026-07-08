# OceanData4AI Hub — Phase 1 Demo

Static HTML Hub matching **Phase 1 PRD** — 7 pages + **Ask OUG (M1)** + SaaS outbound links. No build step.

## Preview

| Environment | URL |
|-------------|-----|
| **Main Hub** | https://oceandata4ai.github.io/oceandata4ai-hub/ |
| **M1 milestone** | https://oceandata4ai.github.io/oceandata4ai-hub/m1/ |
| **Ask OUG** | https://oceandata4ai.github.io/oceandata4ai-hub/qa/oug-help.html |

```bash
cd /Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub
python3 -m http.server 8080
# → http://localhost:8080
```

## M1 scope (2026-07)

- **Ask OUG** in nav → Speckle-style topic list (Discourse hosted after legal review)
- **Blog** categories: News, Tutorials, Deep Dives, **Builder Stories**
- Logo SVG in nav + favicon (`assets/oceandata4ai-logo.svg`)
- `sitemap.xml` for Search Console
- Formspree wiring in `js/form-config.js` (IDs after legal review)

## Pages

| File | Role |
|------|------|
| `index.html` | Home — hero, gather, blog feed, events, join CTA |
| `about.html` | Mission, neutrality, OB disclosure |
| `qa/oug-help.html` | **M1** Ask OUG — community Q&A |
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
