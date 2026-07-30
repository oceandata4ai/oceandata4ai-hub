# Hero Banner · OceanBase Community Q&A (Discourse)

**Version**: v0.2  
**Date**: 2026-07-29  
**Owner**: Charles Wu (吴公博)  
**Developer**: Julian (热海)

---

## 1. Implementation target (Discourse)

| Item | Recommendation |
|------|----------------|
| Placement | **Category banner** on default board `oceanbase-q-a` |
| Fallback | **Welcome banner** if category banner is not themed yet |
| Reference | [TiDB 技术问题板块](https://pingkai.cn/tidbcommunity/forum/c/tidb/30022) — category title + description above topic list |

**Do not change**: left sidebar, topic list layout, or Discourse default cards.

---

## 2. Copy (English)

### 2.1 Primary copy deck

| Field | Discourse field | Copy |
|-------|-----------------|------|
| Category name | Category → Name | `OceanBase Q&A` |
| Banner title (H1) | Theme / custom HTML | `Ask OceanBase Community` |
| Category description | Category → About / description | `Join the OceanBase community. Ask OceanBase Community (OBC) is the place to ask questions, share knowledge, search previous discussions, and connect with other OceanBase users.` |

### 2.2 Short copy (if character limit)

Use when Discourse or mobile truncates:

```
Search, ask, and share solutions with DBAs and developers worldwide.
```

### 2.3 CTA buttons (if theme supports)

| Type | Label | Target | New window |
|------|-------|--------|------------|
| Primary | Ask a question | `/new-topic` (redirect to `/login` if not signed in) | No |
| Secondary | Search | `/search` (Discourse default search) | No |

### 2.4 Naming rules

- Site brand: **OceanBase Community** (short: **OBC**)
- Do **not** use: OUG, OceanBase User Group
- Tone: professional, engineer-friendly, no marketing hype
- Language: English only (shell UI; seed topics may be translated later)

---

## 3. Visual spec

### 3.1 Background asset

| File | Size | Usage |
|------|------|-------|
| `assets/banner-bg-1920x400.png` | 1920 × 400 px | Category / hero background |
| `assets/banner-bg-1920x400.svg` | scalable | Optional CSS `background-image` fallback |

### 3.2 Color tokens

| Token | Hex | Usage |
|-------|-----|-------|
| Gradient start | `#003D7A` | Banner left / top |
| Gradient end | `#005C9E` | Banner right / bottom |
| Title text | `#FFFFFF` | Main headline |
| Subtitle text | `rgba(255,255,255,0.85)` | Description |
| Accent (optional) | `#0096FE` | CTA button, matches OceanBase logo gradient |

### 3.3 Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│  [gradient background + subtle grid]                                        │
│                                                                             │
│   Ask OceanBase Community                    [ Ask a question ] [ Browse docs ] │
│   Technical Q&A for OceanBase and the open-source ecosystem — ...           │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Safe area | Keep text within **120px** left padding; **600px** max copy panel width |
| Min height | **280px** (mobile), **320–400px** (desktop) |
| Text align | Left |
| Emoji | None in v0.1 (optional `🌊` in v0.2) |
| Image style | Community photo stitch + left scrim + frosted copy panel |
| Text contrast | Narrow left scrim + light copy panel `rgba(0,25,55,0.32)` + `blur(6px)` + text-shadow |

### 3.4 Text readability (required)

Apply both layers so white copy stays readable on busy photos:

1. **Left scrim** — `::after` gradient across full banner width
2. **Copy panel** — `.hero-copy` frosted card wrapping label, H1, description, and CTAs

```css
.category-hero::after {
  background: linear-gradient(90deg,
    rgba(0, 20, 50, 0.35) 0%,
    rgba(0, 20, 50, 0.18) 28%,
    rgba(0, 20, 50, 0.06) 40%,
    transparent 48%);
}

.hero-copy {
  background: rgba(0, 25, 55, 0.32);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  padding: 24px 28px;
  max-width: 520px;
}
```

Fallback when `backdrop-filter` is unsupported: use `background: rgba(0, 25, 55, 0.85)`.

### 3.5 No-image fallback (CSS)

If PNG is not loaded, use CSS gradient only:

```css
background: linear-gradient(135deg, #003D7A 0%, #005C9E 100%);
color: #ffffff;
padding: 48px 120px;
```

### 3.6 Responsive

| Breakpoint | Behavior |
|------------|----------|
| Desktop ≥1024px | Title + description + inline CTAs |
| Tablet 768–1023px | Stack CTAs below description |
| Mobile <768px | Single column; shorten to **short copy** (§2.2); hide secondary CTA if cramped |

---

## 4. Discourse admin settings (related)

| Setting | Value |
|---------|-------|
| Site title | `OceanBase Community` |
| Site description | `Technical Q&A for OceanBase and the open-source ecosystem.` |
| Category slug | `oceanbase-q-a` |
| Category name | `OceanBase Q&A` |
| Login required to create topic | Yes |

---

## 5. Acceptance checklist

- [ ] Category name shows **OceanBase Q&A**
- [ ] Description matches §2.1 (or short copy on mobile)
- [ ] Background readable: white text passes contrast on gradient
- [ ] **Ask a question** opens new topic (or login)
- [ ] **Browse docs** opens `en.oceanbase.com/docs` in new tab
- [ ] No layout break on left sidebar / topic list below banner

---

## 6. Open items

| Item | Owner | Status |
|------|-------|--------|
| Final banner illustration (if replacing gradient) | Design | v0.1 uses `banner-bg-1920x400.png` placeholder |
| CTA visibility in default Discourse theme | Julian | Confirm theme component support |
