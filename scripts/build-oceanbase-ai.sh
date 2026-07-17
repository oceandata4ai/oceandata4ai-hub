#!/usr/bin/env bash
# Build oceanbase.ai community demo from oceanbase-community/ sources.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/oceanbase-community"
DST="$ROOT/oceanbase-ai"
rm -rf "$DST"
mkdir -p "$DST/ecosystem" "$DST/qa" "$DST/data" "$DST/assets"

cp "$ROOT/assets/oceanbase-logo.svg" "$DST/assets/"
cp "$ROOT/assets/oceanbase-logo-dark.svg" "$DST/assets/"

cp "$SRC/index.html" "$DST/index.html"
cp "$SRC/about.html" "$DST/about.html"
cp "$SRC/contact.html" "$DST/contact.html"
cp "$SRC/events.html" "$DST/events.html"
cp "$SRC/ecosystem/"*.html "$DST/ecosystem/"
cp "$ROOT/qa/oug-help.html" "$DST/qa/oug-help.html"
cp "$ROOT/qa/topic.html" "$DST/qa/topic.html"
cp "$ROOT/qa/ask.html" "$DST/qa/ask.html"
cp "$ROOT/qa/verify.html" "$DST/qa/verify.html"
cp "$ROOT/data/topics-oceanbase.json" "$DST/data/topics.json"

python3 <<'PY'
import re
from pathlib import Path

root = Path("/Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub/oceanbase-ai")

MEDIUM_OUG = "https://medium.com/@pub_opensource_global"
PRIVACY_URL = "https://github.com/oceanbase/oceanbase?tab=security-ov-file"
COC_URL = "https://github.com/oceanbase/oceanbase?tab=coc-ov-file"
DISCORD_URL = "https://discord.com/channels/1331061822945624085/1331061823465590809"
QUICKSTART_URL = "https://en.oceanbase.com/quickstart"

NAV_ROOT = f"""      <nav class="nav-links">
        <a href="{QUICKSTART_URL}" target="_blank" rel="noopener">Get Started ↗</a>
        <a href="ecosystem/index.html" data-page="ecosystem">Ecosystem</a>
        <a href="qa/oug-help.html" data-page="qa-oug">Ask OUG</a>
        <a href="{MEDIUM_OUG}" data-page="blog" target="_blank" rel="noopener">Blog ↗</a>
        <a href="events.html" data-page="events">Events</a>
        <a href="contact.html" data-page="contact">Contact us</a>
      </nav>"""

NAV_QA = f"""      <nav class="nav-links">
        <a href="{QUICKSTART_URL}" target="_blank" rel="noopener">Get Started ↗</a>
        <a href="../ecosystem/index.html" data-page="ecosystem">Ecosystem</a>
        <a href="oug-help.html" data-page="qa-oug">Ask OUG</a>
        <a href="{MEDIUM_OUG}" data-page="blog" target="_blank" rel="noopener">Blog ↗</a>
        <a href="../events.html" data-page="events">Events</a>
        <a href="../contact.html" data-page="contact">Contact us</a>
      </nav>"""

NAV_ECO = f"""      <nav class="nav-links">
        <a href="{QUICKSTART_URL}" target="_blank" rel="noopener">Get Started ↗</a>
        <a href="index.html" data-page="ecosystem">Ecosystem</a>
        <a href="../qa/oug-help.html" data-page="qa-oug">Ask OUG</a>
        <a href="{MEDIUM_OUG}" data-page="blog" target="_blank" rel="noopener">Blog ↗</a>
        <a href="../events.html" data-page="events">Events</a>
        <a href="../contact.html" data-page="contact">Contact us</a>
      </nav>"""

FOOTER_ROOT = f"""          <ul>
            <li><a href="about.html">About us</a></li>
            <li><a href="ecosystem/index.html">Ecosystem</a></li>
            <li><a href="qa/oug-help.html">Ask OUG</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul>"""

FOOTER_QA = f"""          <ul>
            <li><a href="../about.html">About us</a></li>
            <li><a href="../ecosystem/index.html">Ecosystem</a></li>
            <li><a href="oug-help.html">Ask OUG</a></li>
            <li><a href="../events.html">Events</a></li>
            <li><a href="../contact.html">Contact us</a></li>
          </ul>"""

FOOTER_ECO = f"""          <ul>
            <li><a href="../about.html">About us</a></li>
            <li><a href="index.html">Ecosystem</a></li>
            <li><a href="../qa/oug-help.html">Ask OUG</a></li>
            <li><a href="../events.html">Events</a></li>
            <li><a href="../contact.html">Contact us</a></li>
          </ul>"""

FOOTER_RESOURCES = f"""<ul><li><a href="https://en.oceanbase.com/docs" target="_blank" rel="noopener">Documentation ↗</a></li><li><a href="https://github.com/oceanbase/oceanbase" target="_blank" rel="noopener">GitHub ↗</a></li><li><a href="{DISCORD_URL}" target="_blank" rel="noopener">Discord ↗</a></li></ul>"""

LOGO_VER = "20260717-ob-logo"

def logo_nav(href: str, prefix: str) -> str:
    return f"""      <a href="{href}" class="logo">
        <img src="{prefix}assets/oceanbase-logo.svg?v={LOGO_VER}" alt="OceanBase" class="logo-wordmark logo-wordmark-light" width="141" height="23" />
        <img src="{prefix}assets/oceanbase-logo-dark.svg?v={LOGO_VER}" alt="" aria-hidden="true" class="logo-wordmark logo-wordmark-dark" width="141" height="23" />
      </a>"""

def logo_footer(href: str, prefix: str) -> str:
    return f"""          <a href="{href}" class="logo">
            <img src="{prefix}assets/oceanbase-logo-dark.svg?v={LOGO_VER}" alt="OceanBase" class="logo-wordmark" width="141" height="23" />
          </a>"""

nav_pattern = re.compile(r'<nav class="nav-links">.*?</nav>', re.DOTALL)
logo_any_pattern = re.compile(
    r'<a href="[^"]*" class="logo">.*?</a>',
    re.DOTALL,
)

def patch_nav_logo(html: str, href: str, prefix: str) -> str:
    return logo_any_pattern.sub(logo_nav(href, prefix), html, count=1)

def patch_footer_logo(html: str, href: str, prefix: str) -> str:
    return re.sub(
        r'(<div class="footer-brand">\s*)<a href="[^"]*" class="logo">.*?</a>',
        r'\1' + logo_footer(href, prefix),
        html,
        count=1,
        flags=re.DOTALL,
    )

def patch_footer_community(html: str, footer_ul: str) -> str:
    return re.sub(
        r'(<h4>Community</h4>\s*)<ul>.*?</ul>',
        r'\1' + footer_ul,
        html,
        count=1,
        flags=re.DOTALL,
    )

def patch_footer_resources(html: str) -> str:
    return re.sub(
        r'(<div class="footer-col">\s*<h4>Resources</h4>\s*)<ul>.*?</ul>',
        r'\1' + FOOTER_RESOURCES,
        html,
        count=1,
        flags=re.DOTALL,
    )

def patch_legal(html: str) -> str:
    for path, url in [
        ("../conduct.html", COC_URL),
        ("../privacy.html", PRIVACY_URL),
        ("conduct.html", COC_URL),
        ("privacy.html", PRIVACY_URL),
    ]:
        html = re.sub(
            rf'href="{re.escape(path)}"(?: target="_blank" rel="noopener")?',
            f'href="{url}" target="_blank" rel="noopener"',
            html,
        )
    return html

def inject_signin(html: str, href: str) -> str:
    signin = (
        f'        <div class="qa-nav-user" data-qa-nav-user>\n'
        f'          <a href="{href}" class="btn btn-ghost btn-sm" data-qa-nav-signin>Sign in</a>\n'
        f'        </div>\n'
    )
    if 'data-qa-nav-user' in html:
        return html
    return html.replace(
        '      </div>\n      <button class="nav-toggle"',
        signin + '      </div>\n      <button class="nav-toggle"',
        1,
    )

def inject_auth_scripts(html: str, prefix: str) -> str:
    if f'{prefix}qa-auth.js' in html:
        return html
    snippet = (
        f'<script src="{prefix}qa-auth.js"></script>\n'
        f'  <script src="{prefix}qa-nav-auth.js?v=20260716-ob-ai"></script>\n'
        f'  <script src="{prefix}main.js?v=20260716-ob-ai" defer></script>'
    )
    needle = f'<script src="{prefix}main.js'
    if needle not in html:
        return html
    return re.sub(
        rf'<script src="{re.escape(prefix)}main\.js[^"]*"[^>]*></script>',
        snippet,
        html,
        count=1,
    )

def patch_qa_paths(html: str) -> str:
    html = html.replace('href="../assets/', 'href="../../assets/')
    html = html.replace('src="../assets/', 'src="../../assets/')
    html = html.replace('href="../css/', 'href="../../css/')
    html = html.replace('src="../js/', 'src="../../js/')
    html = html.replace('href="../js/', 'href="../../js/')
    return html

def brand_replace(html: str) -> str:
    html = html.replace("OceanData4AI Community", "OceanBase Community")
    html = html.replace("OceanData4AI", "OceanBase Community")
    html = html.replace("The OceanBase Community Community", "The OceanBase Community")
    html = html.replace("© 2026 OceanBase Community Community", "© 2026 OceanBase Community")
    html = html.replace(
        "A vendor-neutral community for AI data infrastructure builders.",
        "Distributed SQL, HTAP, and an open source ecosystem for production workloads.",
    )
    return html

def strip_contact_form(html: str) -> str:
    html = re.sub(r'\s*<p class="form-note">.*?</p>\s*', '\n', html, count=1, flags=re.DOTALL)
    html = re.sub(
        r'\s*<div class="form-group">\s*<label for="subject">Subject \*</label>\s*<select id="subject".*?</select>\s*</div>\s*',
        '\n',
        html,
        count=1,
        flags=re.DOTALL,
    )
    return html.replace('>Send message</button>', '>Submit</button>')

# Root pages
for name in ["index.html", "about.html", "contact.html", "events.html"]:
    p = root / name
    text = p.read_text(encoding="utf-8")
    text = text.replace("../qa/", "qa/")
    text = nav_pattern.sub(NAV_ROOT, text, count=1)
    text = patch_nav_logo(text, "index.html", "")
    text = patch_footer_logo(text, "index.html", "")
    text = patch_footer_community(text, FOOTER_ROOT)
    text = patch_footer_resources(text)
    text = inject_signin(text, "qa/ask.html?mode=signin")
    if name == "contact.html":
        text = strip_contact_form(text)
    if name == "index.html":
        text = inject_auth_scripts(text, "../js/")
    text = patch_legal(text)
    text = brand_replace(text)
    p.write_text(text, encoding="utf-8")

# Ecosystem pages
for name in ["index.html", "oceanbase.html", "seekdb.html", "powermem.html"]:
    p = root / "ecosystem" / name
    text = p.read_text(encoding="utf-8")
    text = text.replace("../../qa/", "../qa/")
    text = nav_pattern.sub(NAV_ECO, text, count=1)
    text = patch_nav_logo(text, "../index.html", "../")
    text = patch_footer_logo(text, "../index.html", "../")
    text = patch_footer_community(text, FOOTER_ECO)
    text = patch_footer_resources(text)
    text = inject_signin(text, "../qa/ask.html?mode=signin")
    text = patch_legal(text)
    text = brand_replace(text)
    p.write_text(text, encoding="utf-8")

# QA pages
OUG_HELP_INTRO = """            <h1>Ask OUG</h1>
            <p class="qa-board-lead">Technical Q&amp;A for OceanBase and the open source ecosystem. Search before you post — someone may have already solved it.</p>"""

for name in ["oug-help.html", "topic.html", "ask.html", "verify.html"]:
    p = root / "qa" / name
    text = p.read_text(encoding="utf-8")
    text = patch_qa_paths(text)
    if 'ob-community.css' not in text:
        text = text.replace(
            '<link rel="stylesheet" href="../../css/qa.css',
            '<link rel="stylesheet" href="../../css/ob-community.css?v=20260717-ob-logo" />\n'
            '  <link rel="stylesheet" href="../../css/qa.css',
            1,
        )
    text = nav_pattern.sub(NAV_QA, text, count=1)
    text = patch_nav_logo(text, "../index.html", "../")
    text = re.sub(
        r'<a href="\.\./join\.html"[^>]*>Join Community</a>\s*',
        '',
        text,
    )
    text = re.sub(
        r'\s*<a href="https://github.com/oceanbase/oceanbase" class="btn btn-ghost btn-sm"[^>]*>GitHub ↗</a>\s*',
        '\n',
        text,
    )
    text = re.sub(
        r'\s*<a href="https://discord.com/channels/[^"]*" class="btn btn-ghost btn-sm"[^>]*>Discuss ↗</a>\s*',
        '\n',
        text,
    )
    if 'footer-grid' in text:
        text = patch_footer_logo(text, "../index.html", "../")
        text = patch_footer_community(text, FOOTER_QA)
        text = patch_footer_resources(text)
    else:
        text = text.replace('© 2026 OceanData4AI', '© 2026 OceanBase Community')
    text = inject_signin(text, 'ask.html?mode=signin')
    if name == "oug-help.html":
        text = text.replace(
            '<div class="section-kicker">Ask OUG</div>\n            <h1>OceanBase User Group Q&amp;A</h1>',
            '<div class="section-kicker">Ask OUG</div>\n' + OUG_HELP_INTRO,
        )
        text = text.replace('<title>Ask OUG — OceanData4AI Community</title>',
                            '<title>Ask OUG — OceanBase Community</title>')
        text = inject_auth_scripts(text, '../../js/')
    if name == "ask.html":
        text = text.replace('href="../conduct.html"', f'href="{COC_URL}" target="_blank" rel="noopener"')
        text = text.replace('href="../privacy.html"', f'href="{PRIVACY_URL}" target="_blank" rel="noopener"')
        text = text.replace(
            '<script src="../../js/qa-nav-auth.js"></script>\n  <script src="../../js/main.js" defer></script>',
            '<script src="../../js/qa-nav-auth.js?v=20260716-ob-ai"></script>\n  <script src="../../js/main.js" defer></script>',
            1,
        )
    text = patch_legal(text)
    text = brand_replace(text)
    p.write_text(text, encoding="utf-8")

print("oceanbase-ai build OK:", root)
PY

cat > "$DST/README.md" <<'EOF'
# OceanBase Community Demo (oceanbase.ai)

**Preview:** `https://oceandata4ai.github.io/oceandata4ai-hub/oceanbase-ai/index.html` (after deploy)

一期 **oceanbase.ai** 社区站 Demo：

- **Home** — OceanBase 社区叙事 + Discord / Ask OUG 双 CTA + 生态卡片 + GitHub stats + Events
- **Ecosystem** — OceanBase · seekdb · PowerMem 落地页
- **Ask OUG** — 技术问答（种子帖来自 `data/topics-oceanbase.json`）
- **About · Events · Contact us** — 落地页

与 Data4AI 独立站分工见需求文档 `OceanBase 社区站需求文档（oceanbase.ai）.md`。

## Build

```bash
bash scripts/build-oceanbase-ai.sh
```

## Local preview

```bash
cd /path/to/data4ai-hub
python3 -m http.server 8765
# http://localhost:8765/oceanbase-ai/index.html
```

样式与脚本：`../css`、`../js`（仓库根目录）。
EOF

echo "Built $DST"
