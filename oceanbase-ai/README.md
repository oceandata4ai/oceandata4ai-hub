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
