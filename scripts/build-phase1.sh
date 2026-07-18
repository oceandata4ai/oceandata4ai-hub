#!/usr/bin/env bash
# Build phase1 demo: copy hub pages, trim nav/footer only, fix asset paths.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DST="$ROOT/phase1"
rm -rf "$DST"
mkdir -p "$DST/qa"

cp "$ROOT/index.html" "$DST/index.html"
cp "$ROOT/about.html" "$DST/about.html"
cp "$ROOT/contact.html" "$DST/contact.html"
cp "$ROOT/events.html" "$DST/events.html"
cp "$ROOT/qa/ask.html" "$DST/qa/ask.html"
cp "$ROOT/qa/verify.html" "$DST/qa/verify.html"

python3 <<'PY'
import re
from pathlib import Path

root = Path("/Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub/phase1")

# Phase 1: Blog links out to Medium. Phase 2: on-site blog.html (see ../blog.html).
MEDIUM_OUG = "https://medium.com/@pub_global_opensource"
PRIVACY_URL = "https://github.com/oceanbase/oceanbase?tab=security-ov-file"
COC_URL = "https://github.com/oceanbase/oceanbase?tab=coc-ov-file"

NAV_ROOT = f"""      <nav class="nav-links">
        <a href="about.html" data-page="about">About</a>
        <a href="{MEDIUM_OUG}" data-page="blog" target="_blank" rel="noopener">Blog ↗</a>
        <a href="events.html" data-page="events">Events</a>
        <a href="contact.html" data-page="contact">Contact us</a>
      </nav>"""

FOOTER_COMMUNITY_ROOT = f"""          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="{MEDIUM_OUG}" target="_blank" rel="noopener">Blog ↗</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul>"""

FOOTER_COMMUNITY_ABOUT = f"""<ul><li><a href="about.html">About</a></li><li><a href="{MEDIUM_OUG}" target="_blank" rel="noopener">Blog ↗</a></li><li><a href="events.html">Events</a></li><li><a href="contact.html">Contact us</a></li></ul>"""

NAV_QA = f"""      <nav class="nav-links">
        <a href="../about.html" data-page="about">About</a>
        <a href="{MEDIUM_OUG}" data-page="blog" target="_blank" rel="noopener">Blog ↗</a>
        <a href="../events.html" data-page="events">Events</a>
        <a href="../contact.html" data-page="contact">Contact us</a>
      </nav>"""

DISCORD_URL = "https://discord.com/channels/1331061822945624085/1331061823465590809"
YOUTUBE_URL = "https://www.youtube.com/@Data4AI-m7n"
FOOTER_RESOURCES = f"""<ul><li><a href="https://en.oceanbase.com/docs" target="_blank" rel="noopener">Documentation ↗</a></li><li><a href="https://github.com/oceanbase/oceanbase" target="_blank" rel="noopener">GitHub ↗</a></li><li><a href="{DISCORD_URL}" target="_blank" rel="noopener">Discord ↗</a></li><li><a href="{YOUTUBE_URL}" target="_blank" rel="noopener">YouTube ↗</a></li></ul>"""

nav_pattern = re.compile(
    r'<nav class="nav-links">.*?</nav>',
    re.DOTALL,
)

join_btn_patterns = [
    re.compile(r'\s*<a href="(?:\.\./)?join\.html"[^>]*>Join Community</a>\s*\n', re.I),
    re.compile(r'\s*<a href="join\.html"[^>]*>Join Community</a>\s*\n', re.I),
]

footer_community_patterns = [
    (
        re.compile(
            r'(<h4>Community</h4>\s*)<ul>.*?</ul>',
            re.DOTALL,
        ),
        None,
    ),
]

CH_PROGRAM_SECTION = re.compile(
    r'\s*<section class="ch-program reveal">.*?</section>\s*',
    re.DOTALL,
)
CH_RESOURCES_SECTION = re.compile(
    r'\s*<section class="ch-resources reveal">.*?</section>\s*',
    re.DOTALL,
)

def strip_nav_github_discuss(html: str) -> str:
    html = re.sub(
        r'\s*<a href="https://github.com/oceanbase/oceanbase" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">GitHub ↗</a>\s*\n',
        '\n',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<a href="https://discord.com/channels/[^"]*" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">Discuss ↗</a>\s*\n',
        '\n',
        html,
        flags=re.I,
    )
    return html

def strip_legal_contact(html: str) -> str:
    return re.sub(
        r'(<div class="footer-col">\s*<h4>Legal</h4>\s*<ul>.*?)<li><a href="(?:\.\./)?contact\.html">Contact(?: us)?</a></li>(\s*</ul>\s*</div>)',
        r'\1\2',
        html,
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

def patch_legal_links(html: str) -> str:
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

def strip_fellows_index(html: str) -> str:
    html = CH_PROGRAM_SECTION.sub('\n', html, count=1)
    return html.replace('connect with Fellows', 'connect with builders')

def strip_phase1_index(html: str) -> str:
    html = strip_fellows_index(html)
    return CH_RESOURCES_SECTION.sub('\n', html, count=1)

def strip_phase1_about(html: str) -> str:
    return strip_fellows_about(html)

def strip_phase1_contact(html: str) -> str:
    html = re.sub(
        r'\s*<p class="form-note">.*?</p>\s*',
        '\n',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'\s*<div class="form-group">\s*<label for="subject">Subject \*</label>\s*<select id="subject" name="subject" required>.*?</select>\s*</div>\s*',
        '\n',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace('>Send message</button>', '>Submit</button>')
    return html

def strip_fellows_about(html: str) -> str:
    html = re.sub(
        r'\s*<ul>\s*<li>One <strong>Blog</strong>.*?</ul>\s*',
        '\n',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace(
        'Fellows and external authors get bylines and exposure.',
        'Community authors and external contributors get bylines and exposure.',
    )
    html = html.replace(
        "<p>Write for the blog, host an office hour, or apply to become a Fellow. We'd love to hear from you.</p>",
        "<p>Write for the blog or host an office hour. We'd love to hear from you.</p>",
    )
    return re.sub(
        r'\s*<a href="join\.html" class="btn btn-white">Join the community</a>\s*\n',
        '\n',
        html,
        count=1,
    )

def strip_fellows_contact(html: str) -> str:
    html = html.replace(
        '<p class="form-note">For Fellow applications, use the <a href="join.html#fellows" style="color:var(--accent)">Join page</a> instead. For CoC violations, see our <a href="conduct.html" style="color:var(--accent)">reporting process</a>.</p>',
        '<p class="form-note">For CoC violations, see our <a href="conduct.html" style="color:var(--accent)">reporting process</a>.</p>',
    )
    return html

def inject_signin_nav(html: str, href: str) -> str:
    if 'data-qa-nav-user' in html:
        return html
    signin = (
        f'        <div class="qa-nav-user" data-qa-nav-user>\n'
        f'          <a href="{href}" class="btn btn-ghost btn-sm" data-qa-nav-signin>Sign in</a>\n'
        f'        </div>\n'
    )
    return html.replace(
        '      </div>\n      <button class="nav-toggle"',
        signin + '      </div>\n      <button class="nav-toggle"',
        1,
    )

def inject_auth_scripts(html: str, js_prefix: str) -> str:
    if f'{js_prefix}qa-auth.js' in html:
        return html
    snippet = (
        f'<script src="{js_prefix}qa-auth.js"></script>\n'
        f'  <script src="{js_prefix}qa-nav-auth.js?v=20260715-nav-user"></script>\n'
        f'  <script src="{js_prefix}main.js" defer></script>'
    )
    return html.replace(f'<script src="{js_prefix}main.js" defer></script>', snippet, 1)

def patch_root(html: str) -> str:
    html = nav_pattern.sub(NAV_ROOT, html, count=1)
    for p in join_btn_patterns:
        html = p.sub('\n', html)
    html = inject_signin_nav(html, 'qa/ask.html?mode=signin')
    html = re.sub(
        r'(<h4>Community</h4>\s*)<ul>.*?</ul>',
        r'\1' + FOOTER_COMMUNITY_ROOT,
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace('href="assets/', 'href="../assets/')
    html = html.replace('src="assets/', 'src="../assets/')
    html = html.replace('href="css/', 'href="../css/')
    html = html.replace('href="js/', 'href="../js/')
    html = html.replace('src="js/', 'src="../js/')
    html = html.replace('href="contact.html">Contact</a>', 'href="contact.html">Contact us</a>')
    html = html.replace('https://medium.com/@pub_opensource_global', MEDIUM_OUG)
    html = inject_auth_scripts(html, '../js/')
    return html

for name in ["index.html", "about.html", "contact.html", "events.html"]:
    p = root / name
    text = p.read_text(encoding="utf-8")
    text = patch_root(text)
    if name == "contact.html":
        text = text.replace("<title>Contact —", "<title>Contact us —")
        text = text.replace("<h1>Contact</h1>", "<h1>Contact us</h1>")
    if name == "about.html":
        text = re.sub(
            r'<div class="footer-col"><h4>Community</h4><ul>.*?</ul></div>',
            '<div class="footer-col"><h4>Community</h4>' + FOOTER_COMMUNITY_ABOUT + '</div>',
            text,
            count=1,
            flags=re.DOTALL,
        )
    if name == "index.html":
        text = text.replace(
            'href="blog.html" class="btn btn-primary">Read Blog</a>',
            f'href="{MEDIUM_OUG}" class="btn btn-primary" target="_blank" rel="noopener">Read Blog</a>',
        )
        text = strip_phase1_index(text)
    elif name == "about.html":
        text = strip_phase1_about(text)
    elif name == "contact.html":
        text = strip_phase1_contact(text)
    text = patch_legal_links(text)
    text = strip_legal_contact(text)
    text = patch_footer_resources(text)
    text = strip_nav_github_discuss(text)
    p.write_text(text, encoding="utf-8")

def patch_qa(html: str) -> str:
    html = nav_pattern.sub(NAV_QA, html, count=1)
    for p in join_btn_patterns:
        html = p.sub('\n', html)
    html = html.replace('href="../assets/', 'href="../../assets/')
    html = html.replace('src="../assets/', 'src="../../assets/')
    html = html.replace('href="../css/', 'href="../../css/')
    html = html.replace('src="../js/', 'src="../../js/')
    html = html.replace('href="../js/', 'href="../../js/')
    html = html.replace('href="../contact.html">Contact</a>', 'href="../contact.html">Contact us</a>')
    html = html.replace('href="../blog.html"', f'href="{MEDIUM_OUG}" target="_blank" rel="noopener"')
    return html

for name in ["ask.html", "verify.html"]:
    p = root / "qa" / name
    text = p.read_text(encoding="utf-8")
    text = patch_qa(text)
    text = patch_legal_links(text)
    if name == "ask.html":
        text = text.replace('<title>Ask OUG — OceanData4AI Community</title>',
                            '<title>Sign in — OceanData4AI Community</title>')
        text = text.replace(
            "window.location.replace('oug-help.html');",
            "window.location.replace('../index.html');",
        )
        text = text.replace(
            '<script src="../../js/qa-nav-auth.js"></script>\n  <script src="../../js/main.js" defer></script>',
            '<script src="../../js/main.js" defer></script>',
            1,
        )
        text = text.replace(
            '<script src="../../js/main.js" defer></script>',
            '<script src="../../js/qa-nav-auth.js?v=20260715-nav-user"></script>\n  <script src="../../js/main.js" defer></script>',
            1,
        )
    if name == "verify.html":
        text = re.sub(
            r'<nav class="nav-links">.*?</nav>',
            NAV_QA,
            text,
            count=1,
            flags=re.DOTALL,
        )
    text = strip_nav_github_discuss(text)
    p.write_text(text, encoding="utf-8")

print("phase1 build OK:", root)
PY

cat > "$DST/README.md" <<'EOF'
# Phase 1 Demo (trimmed)

**URL:** `https://oceandata4ai.github.io/oceandata4ai-hub/phase1/index.html`

一期裁剪版，仅保留：**Home · Blog（外链 Medium）· Events · About · Contact us · Legal（外链）**。

- **Blog（一期）**：顶栏 / 首页 CTA 外链 [Medium](https://medium.com/@pub_global_opensource)
- **Blog（二期）**：站内 `blog.html`（见完整版 Hub）
- **Legal（一期外链）**：[Privacy Policy](https://github.com/oceanbase/oceanbase?tab=security-ov-file) · [Code of Conduct](https://github.com/oceanbase/oceanbase?tab=coc-ov-file)
- **Fellows / Join（一期不做）**：完整版保留；一期 Demo 已移除 Fellows Program 区块及相关文案
- **More resources（一期不做）**：完整版保留；一期 Demo 已移除首页 More resources 三卡片区块
- **Ask OUG（一期不做）**：`oceanbase-ai` 保留；完整版 Hub / phase1 已移除 Q&A 列表与顶栏入口
- **Sign in（一期保留）**：顶栏 Sign in → `qa/ask.html`（注册 / 登录 / 邮件验证 Demo）
- 样式与脚本复用上级目录 `../css`、`../js`、`../assets`
- 完整版 Hub：[`../index.html`](../index.html)

## 本地预览

```bash
cd /path/to/data4ai-hub
python3 -m http.server 8765
# http://localhost:8765/phase1/index.html
```
EOF

echo "Built $DST"
