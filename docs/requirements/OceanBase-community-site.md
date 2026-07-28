# OceanBase 社区站需求文档（oceanbase.ai）

> **版本**：V1.1（对齐当前 Demo）  
> **日期**：2026-07-17  
> **域名**：`oceanbase.ai`（与 AAA 独立站同步启动，市场部确认上线时间）  
> **代码基线**：`oceanbase-community/` → `scripts/build-oceanbase-ai.sh` → `oceanbase-ai/`  
> **Demo 预览**：https://oceandata4ai.github.io/oceandata4ai-hub/oceanbase-ai/index.html  
> **起草**：@Charles（文案 + 初版视觉）· 市场部审批待定

---

## 〇、战略定位（Proposal 摘要）

### 两个社区，分工明确

| 站点 | 域名 | 优先级 | 一期（7.31） | 定位 |
| --- | --- | --- | --- | --- |
| **OceanBase 社区** | `oceanbase.ai` | **高** | **落地页 + Ask OBC** | OceanBase 及生态开源（seekdb、PowerMem 等）；技术问答；与官网互链 |
| **Data4AI 社区** | 独立第三方域名（待申请） | 中 | **仅展示，无交互** | 活动、人物、Program；海外冷启动品牌阵地 |

**与官网关系**

| 阵地 | 职责 |
| --- | --- |
| `en.oceanbase.com` | 产品、销售、官方 Blog、Docs |
| `oceanbase.ai` | **社区**：落地页、生态介绍、Ask OBC（OceanBase 技术问答） |
| Data4AI 独立域名 | 活动 / Program **展示**（一期不做问答） |

---

## 一、设计风格（初版 · 待市场部审批）

### 1.1 对标与原则

| 维度 | 参考 | 说明 |
| --- | --- | --- |
| **信息架构** | [ClickHouse Community](https://clickhouse.com/community) | Hero → 双 CTA → 生态/项目卡片 → GitHub 统计 → 活动简表 → 社交矩阵 |
| **问答区** | [Databricks Discussions](https://community.databricks.com/) | Ask OBC 卡片列表（沿用现 Demo） |
| **品牌气质** | [en.oceanbase.com](https://en.oceanbase.com) | 可信、工程感、分布式数据库；AI 能力融入叙事，避免纯 hype 视觉 |
| **布局代码** | `community.css` + `ob-community.css` | 改文案与品牌资产，不推倒 IA |

### 1.2 视觉规范（当前 Demo）

| 元素 | 现 Demo 实现 |
| --- | --- |
| **Logo** | 官方 OceanBase SVG（`assets/oceanbase-logo.svg` / `oceanbase-logo-dark.svg`），构建时注入 nav / footer |
| **主色** | OceanBase 品牌色（深海蓝 + 青绿点缀，`ob-community.css`） |
| **字体** | DM Sans + JetBrains Mono |
| **Hero** | AI 时代统一分布式数据库定位 + SQL / HTAP / AI workloads |
| **双 Promo** | **Join Discord #obc** + **Ask OBC** |
| **第三屏** | **Ecosystem** 项目卡片（OceanBase · seekdb · PowerMem · GitHub） |
| **GitHub 统计** | Contributors / PRs / Releases / Stars |
| **顶栏** | **Get Started ↗** · Ecosystem · Ask OBC · Events · Contact us · Docs ↗ · Sign in |
| **去掉（一期）** | 顶栏 GitHub ↗ |

### 1.3 线框（oceanbase.ai 首页 · 当前 Demo）

```plain
┌──────────────────────────────────────────────────────────────┐
│ [OB Logo]    Get Started↗ Ecosystem Ask OBC Events Contact│
│              🌙  Docs↗  [Sign in ▾]                            │
├──────────────────────────────────────────────────────────────┤
│ Hero: Welcome to the OceanBase Community                     │
│  OceanBase — the unified open-source database for the AI era.  │
│  Distributed SQL, HTAP, and AI workloads — practitioners…    │
├──────────────────────────────────────────────────────────────┤
│ [Join Discord #obc]          [Ask a question → Ask OBC]      │
├──────────────────────────────────────────────────────────────┤
│ Ecosystem                                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │OceanBase │ │ seekdb   │ │ PowerMem │ │ GitHub → │       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├──────────────────────────────────────────────────────────────┤
│ Building in the open · GitHub stats · View on GitHub          │
├──────────────────────────────────────────────────────────────┤
│ Upcoming events → events.html · Office Hours → Luma          │
├──────────────────────────────────────────────────────────────┤
│ Find us: Discord · GitHub · X · Reddit · dev.to     │
├──────────────────────────────────────────────────────────────┤
│ Footer: Community / Resources / Legal                        │
└──────────────────────────────────────────────────────────────┘
```

### 1.4 生态落地页模板（`/ecosystem/{project}`）

每个生态项目一页，结构统一：

1. **Hero**：项目名 + 一句话定位 + GitHub / Docs CTA  
2. **What it is**：3 条 bullet  
3. **When to use**：适用场景  
4. **Get started**：链官方 Docs / 仓库  
5. **Ask OBC**：链 Ask OBC 列表

首期落地页：**OceanBase**（核心）、**seekdb**、**PowerMem**。

---

## 二、文案（英文 · 以当前 Demo 为准）

> 以下与线上一致。`[TBD]` 需市场部或产品确认。

### 2.1 首页 Home（`/`）

**`<title>`**  
`OceanBase Community — Distributed SQL, HTAP & open source`

**Meta description**  
`Join the OceanBase Community: tutorials, Q&A, and ecosystem projects including seekdb and PowerMem. Built for DBAs and architects in production.`

**Hero H1**  
`Welcome to the OceanBase Community`

**Hero Lead（两行）**  
- `OceanBase — the unified open-source database for the AI era.`  
- `Distributed SQL, HTAP, and AI workloads — with practitioners worldwide to help you ship.`

**双 Promo 卡片**

| 左卡 | 右卡 |
| --- | --- |
| **Talk with DBAs and architects on Discord** | **Stuck on a technical question?** |
| Join `#obc` for migrations, HA, tuning, and HTAP design — real answers from people who run OceanBase in production. | Ask OBC is our technical Q&A board for OceanBase and ecosystem projects. Search existing threads or post a new question. |
| CTA: **Join Discord** | CTA: **Ask a question** |

**生态区块 H2**  
`Ecosystem`

**生态区块副文案**  
`Core database, AI-native search, and agent memory — explore projects across the OceanBase ecosystem.`

**生态卡片文案**

| 项目 | 标题 | 摘要 | CTA |
| --- | --- | --- | --- |
| **OceanBase** | OceanBase Database | Distributed SQL with native HTAP — MySQL-compatible, built for scale. | Learn more → |
| **seekdb** | seekdb | AI-native hybrid search database — relational, vector, and full-text in one engine. | Learn more → |
| **PowerMem** | PowerMem | Memory system for AI agents — tiers, decay, and retrieval built for long-running workflows. | Learn more → |
| **More** | Explore all projects | Connectors, skills, and tools from the OceanBase ecosystem. | View on GitHub ↗ |

**GitHub 区块**  
`Building in the open` · `OceanBase and related projects on GitHub — stars, contributors, and releases at a glance.`  
统计：380+ Contributors · 400+ PRs · 98+ Releases · 10.2k Stars

**Events 区块**  
`Upcoming events` · CTA `View full calendar`  
- Vietnam OceanBase Meetup（Aug TBD）  
- Community Office Hours（Weekly · **Luma (Virtual)**）→ https://luma.com/user/usr-PP5iqhS4mwX95Xc

**Find us**  
`Discord` · `GitHub` · `Medium` · **`X`** · `Reddit` · **`dev.to`**

---

### 2.2 Ecosystem 索引（`/ecosystem`）

**H1**  
`Ecosystem`

**Hero Lead**  
`OceanBase is the unified distributed database for the AI era — open-source, multi-model, one engine for your most demanding workloads. Deploy, contribute to, and discuss projects across the ecosystem.`

---

### 2.3 生态落地页文案

#### `/ecosystem/oceanbase`

- **H1**：`OceanBase Database`  
- **Lead**：`Distributed SQL with true HTAP — one engine for transactional and analytical workloads.`  
- **CTA**：`Documentation ↗` · `GitHub ↗` · `Ask about OceanBase →`

#### `/ecosystem/seekdb`

- **H1**：`seekdb`  
- **Lead**：`Open-source AI-native hybrid search — relational, vector, full-text, and JSON in one store.`  
- **CTA**：`seekdb Docs ↗` · `GitHub ↗` · `Ask about seekdb →`

#### `/ecosystem/powermem`

- **H1**：`PowerMem`  
- **Lead**：`Memory infrastructure for AI agents — structured tiers, decay, and retrieval you can run yourself.`  
- **CTA**：`GitHub ↗` · `Ask about PowerMem →`

---

### 2.4 Events（`/events`）

**Hero**  
`Office hours, meetups, and workshops — join us live on Luma.`

**Upcoming**  
`Dates and times are announced on Luma — check back for updates.`  
活动 CTA：**Register Now** → https://luma.com/user/usr-PP5iqhS4mwX95Xc  
Office Hours 标签：`Luma · Virtual · Office hours`

**Past events**  
Tokyo Onchain Night · Corporate Crypto Strategy Summit（静态展示，无录制外链文案）

---

### 2.5 Ask OBC（`/qa/obc-help`）

**列表页标题**  
`Ask OBC`

**列表页副标题**  
`Technical Q&A for OceanBase and the open source ecosystem. Search before you post — someone may have already solved it.`

**主按钮**  
`Ask a question`

**种子内容**  
来源：`data/topics-oceanbase.json`（构建时复制为 `oceanbase-ai/data/topics.json`）

---

### 2.6 Contact（`/contact`）

**Lead**  
`Questions about the community, meetups, partnerships, or press? We'd love to hear from you.`

表单主按钮：**Submit**（Subject 下拉已移除）

---

### 2.7 顶栏与 Footer（全局）

**顶栏**  
`Get Started ↗`（en.oceanbase.com/quickstart）· `Ecosystem` · `Ask OBC`· `Events` · `Contact us` · `Docs ↗` · `Sign in`

**Footer Community**  
Ecosystem · Ask OBC · Events · Contact us

**Footer Resources**  
Documentation ↗ · GitHub ↗ · Discord ↗  
（**无 en.oceanbase.com**）

**Footer Legal**  
Privacy ↗ · Code of Conduct ↗（链 OceanBase GitHub 法务页）

---

## 三、Data4AI 独立站（一期 · 仅展示）

> 域名待申请；与 `oceanbase.ai` **不同站**，一期无 Ask OBC / 投稿 / 登录。

| 页面 | 内容 | 交互 |
| --- | --- | --- |
| Home | Data4AI 品牌叙事 + 链 OceanBase 社区 / Discord | 无 |
| Events | 活动列表（静态） | 外链 Discord / Luma |
| Program | 社区项目介绍 | 无 |

---

## 四、一期需求（oceanbase.ai · DDL：2026-07-31）

### 4.1 页面地图（当前 Demo）

| 页面 | 路径 | 类型 | 说明 |
| --- | --- | --- | --- |
| Home | `/oceanbase-ai/` | 落地页 | §2.1 |
| Ecosystem 索引 | `/ecosystem` | 落地页 | §2.2 |
| OceanBase | `/ecosystem/oceanbase` | 落地页 | §2.3 |
| seekdb | `/ecosystem/seekdb` | 落地页 | §2.3 |
| PowerMem | `/ecosystem/powermem` | 落地页 | §2.3 |
| Ask OBC 列表 | `/qa/obc-help` | **交互** | 卡片列表 |
| 帖子详情 | `/qa/topic/{slug}` | **交互** | 正文 + 回复 |
| 发帖/登录 | `/qa/ask` | **交互** | 邮箱注册 |
| Events | `/events` | 落地页 | Luma 注册 |
| Contact | `/contact` | 落地页 | Formspree |
| Legal | 外链 | — | Privacy / CoC |

**一期不含**：Data4AI 品牌区块。

### 4.2 构建与部署

```bash
# 源码编辑
oceanbase-community/

# 构建 Demo 输出
bash scripts/build-oceanbase-ai.sh

# 部署
GIT_HTTP_VERSION=HTTP/1.1 git push github main
```

构建脚本职责：复制页面、注入官方 Logo、统一 nav/footer、Legal 外链、Ask OBC 路径修正、Contact 表单裁剪。

### 4.3 非功能

| 项 | 说明 |
| --- | --- |
| 语言 | 英文（一期） |
| SEO | 各页 title/description 见 §二 |
| 审批 | 市场部审批 Hero、生态卡片文案 |

---

## 五、二期规划（TBD）

Ask OBC 服务端、Tags、多 Board、运营后台、搜索。

---

## 六、一期验收清单（2026-07-17 Demo 状态）

| # | 验收项 | 状态 |
| --- | --- | --- |
| 1 | Home / Ecosystem / Events / Contact 可访问 | ✅ Demo 已上线 |
| 2 | 生态落地页 oceanbase · seekdb · powermem 上线 | ✅ |
| 3 | 文案为 OceanBase 主导，无 Data4AI 主品牌残留 | ✅ |
| 4 | Ask OBC 可浏览；英文种子帖 | 进行中 |
| 5 | 注册/登录/发帖流程可用 | ✅ Demo 级 |
| 6 | Footer 链 Docs · GitHub · Discord | ✅ |
| 7 | Events 注册链 Luma | ✅ |
| 9 | 市场部审批文案已归档 | 待定 |

---

*文档版本：2026-07-17 · 对齐 Demo `oceanbase-ai/` 线上一版*
