# Phase 1 Demo (trimmed)

**URL:** `https://oceandata4ai.github.io/oceandata4ai-hub/phase1/index.html`

一期裁剪版，仅保留：**Home · Ask OUG · Blog（外链 Medium OUG）· Events · About · Contact us · Legal（外链）**。

- **Blog（一期）**：顶栏 / 首页 CTA 外链 [Medium OUG](https://medium.com/@pub_opensource_global)
- **Blog（二期）**：站内 `blog.html`（见完整版 Hub）
- **Legal（一期外链）**：[Privacy Policy](https://github.com/oceanbase/oceanbase?tab=security-ov-file) · [Code of Conduct](https://github.com/oceanbase/oceanbase?tab=coc-ov-file)
- **Fellows / Join（一期不做）**：完整版保留；一期 Demo 已移除 Fellows Program 区块及相关文案
- **More resources（一期不做）**：完整版保留；一期 Demo 已移除首页 More resources 三卡片区块

- **Ask OUG（一期）**：站内 Q&A · 浏览/发帖/回复均在 `qa/` · 种子话题来自 `data/topics.json`，用户发帖保存在浏览器本地并即时展示
- 样式与脚本复用上级目录 `../css`、`../js`、`../assets`
- 完整版 Hub：[`../index.html`](../index.html)

## 本地预览

```bash
cd /path/to/data4ai-hub
python3 -m http.server 8765
# http://localhost:8765/phase1/index.html
```
