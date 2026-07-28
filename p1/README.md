# OceanData4AI — Phase 1 Demo

一期必保页面：**Home · Discussions · About · Contact · Legal**

| 对标 | 页面 |
|------|------|
| [ClickHouse Community](https://clickhouse.com/community) | `index.html` |
| [Databricks Discussions](https://community.databricks.com/t5/discussions/ct-p/Discussions) | `discussions/` |

## 本地预览

```bash
cd /Users/gongbo/Downloads/wechat-to-yuque/data4ai-hub
python3 -m http.server 8765
```

浏览器打开：**http://localhost:8765/p1/index.html**

## 页面地图

| 路径 | 说明 |
|------|------|
| `/p1/index.html` | Home — Hero、外链矩阵、活动、GitHub 统计 |
| `/p1/discussions/index.html` | 分区浏览 + 帖子列表 |
| `/p1/discussions/topic.html?id=t1` | 帖子详情 + 回复 |
| `/p1/discussions/new.html` | 发帖（需登录） |
| `/p1/about.html` | About |
| `/p1/contact.html` | Contact 表单 |
| `/p1/legal/privacy.html` | Privacy（法务占位） |
| `/p1/legal/terms.html` | Terms（法务占位） |

## Demo 说明

- **Discussions** 数据存在浏览器 `localStorage`（含 4 条种子帖）
- **Sign in** 为模拟 Google SSO，点击即可登录
- **Contact** 表单为演示，生产需接 SMTP / Formspree
- **Legal** 为占位文案，上线前替换法务审定版
- Blog / Fellows / Search 为 **二期**，本 Demo 未包含

## 与需求文档对应

详见：`/Users/gongbo/Downloads/OceanData4AI-社区站一期需求文档.md`
