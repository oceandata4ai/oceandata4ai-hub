# OceanData4AI Demo 文案评审稿

> **用途：** 供品牌、英文内容、社区运营专家逐模块评审 Demo 文案。  
> **线上 Demo：** https://oceandata4ai.github.io/oceandata4ai-hub/  
> **M1 里程碑 Demo：** https://oceandata4ai.github.io/oceandata4ai-hub/m1/  
> **带页面预览的交互版：** 同目录 `review.html`（浏览器打开，左侧文案 / 右侧页面截图位）  
> **生成截图：** 在项目根目录执行 `bash scripts/capture-demo-screenshots.sh`

---

## 评审字段说明

| 列 | 含义 |
|---|---|
| **ID** | 文案唯一编号，评审意见请引用此 ID |
| **位置** | 页面 + 模块 + 视觉锚点 |
| **英文原文** | 当前 Demo 展示文案 |
| **类型** | UI 标签 / 标题 / 正文 / CTA / 元数据 |
| **截图** | 见 `screenshots/` 或 `review.html` 对应区块 |

---

## A. 全站通用（Global）

### A1. 顶部导航 · 所有主站页面

| ID | 位置 | 英文原文 | 类型 | 截图 |
|---|---|---|---|---|
| G-NAV-01 | Logo | OceanData4AI | 品牌名 | `screenshots/01-nav.png` |
| G-NAV-02 | 主导航 | About · Ask OUG · Blog · Events · Fellows · Join | 导航 | ↑ |
| G-NAV-03 | 右侧按钮 | Docs ↗ · GitHub ↗ · Discuss ↗ | CTA 外链 | ↑ |
| G-NAV-04 | 主 CTA | Join Community | 按钮 | ↑ |

### A2. 页脚 · Footer

| ID | 位置 | 英文原文 | 类型 | 截图 |
|---|---|---|---|---|
| G-FT-01 | 品牌区 | A vendor-neutral community for AI data infrastructure builders. | 正文 | `screenshots/02-footer.png` |
| G-FT-02 | 品牌区 | Initiated with support from OceanBase | 免责声明 | ↑ |
| G-FT-03 | Community 列 | About · Ask OUG · Join · Blog · Events | 链接 | ↑ |
| G-FT-04 | Resources 列 | Documentation ↗ · GitHub ↗ · Medium ↗ · Discord ↗ | 链接 | ↑ |
| G-FT-05 | Legal 列 | Privacy Policy · Code of Conduct · Contact | 链接 | ↑ |
| G-FT-06 | 底栏 | © 2026 OceanData4AI Community | 版权 | ↑ |
| G-FT-07 | 底栏 | Built for builders · Not a sales page | 定位语 | ↑ |

---

## B. 首页 Home (`index.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/index.html  
**截图：** `screenshots/home-hero.png` · `home-promo.png` · `home-fellows.png` · `home-events.png` · `home-github.png` · `home-social.png` · `home-resources.png`

### B1. Hero 主视觉

| ID | 位置 | 英文原文 | 类型 |
|---|---|---|---|
| H-01 | `<title>` / SEO | OceanData4AI Community — Where builders talk about AI data infrastructure | 元数据 |
| H-02 | H1 | Welcome to the OceanData4AI Community | 标题 |
| H-03 | Lead | Built by builders, for builders. Learn, contribute, connect, and help shape AI-native data infrastructure — from RAG and vectors to agents and hybrid search. | 正文 |

### B2. 双卡推广区 Promo Duo

| ID | 位置 | 英文原文 | 类型 |
|---|---|---|---|
| H-04 | 左卡标题 | Join 800+ builders on Discord | 标题 |
| H-05 | 左卡正文 | Get support, share ideas, and discuss RAG pipelines, vector search, and agent memory with a passionate community. | 正文 |
| H-06 | 左卡 CTA | Join Discord | 按钮 |
| H-07 | 右卡标题 | Stay up to speed with the latest | 标题 |
| H-08 | 右卡正文 | Stay informed on tutorials, deep dives, product releases, and community events — straight from the builders. | 正文 |
| H-09 | 右卡 CTA | Read the Blog | 按钮 |

### B3. Fellows Program

| ID | 位置 | 英文原文 | 类型 |
|---|---|---|---|
| H-10 | 区标题 | Community Fellows Program | H2 |
| H-11 | 区副文 | Get recognized for sharing your expertise on AI data infrastructure with the global builder community. | 正文 |
| H-12 | 左块标题 | Join the program | H3 |
| H-13 | 左块正文 | Become a Fellow within the OceanData4AI community. Submit your application showcasing your technical writing skills and experience with RAG, vectors, or agent systems. | 正文 |
| H-14 | 右块标题 | What you get | H3 |
| H-15 | 权益列表 | Early access to product previews and beta features · Invitations to exclusive community events and AMAs · Career visibility within the AI data infrastructure ecosystem · Community recognition on the Fellows directory | 列表 |
| H-16 | CTA | Apply now | 按钮 |

### B4. Upcoming Events

| ID | 位置 | 英文原文 | 类型 |
|---|---|---|---|
| H-17 | 区标题 | Upcoming events | H2 |
| H-18 | 链接 | View all events | CTA |
| H-19 | 活动1 | Tokyo Onchain Night — Jul 11, 2026 · Tokyo — Community meetup · Invite-only builder event with technical sessions | 卡片 |
| H-20 | 活动2 | Corporate Crypto Strategy Summit — Jul 14, 2026 · Tokyo — B2B summit · Executive session for financial institutions and Web3 teams | 卡片 |
| H-21 | 活动3 | Vietnam OceanData4AI Meetup — Aug TBD, 2026 · Vietnam — Local meetup · AI data infrastructure builders and community discussion | 卡片 |
| H-22 | 活动4 | Community Office Hours — Weekly · Discord (Virtual) — Virtual · Ask questions, get feedback, and connect with Fellows | 卡片 |

### B5. GitHub 贡献区

| ID | 位置 | 英文原文 | 类型 |
|---|---|---|---|
| H-23 | 标题 | Fork it. Work it. Ship it. | H2 |
| H-24 | 副文 | Join us on GitHub — contribute code, docs, and examples that help builders ship AI systems faster. | 正文 |
| H-25 | 数据 | 180+ Contributors · 12k+ PRs merged · 120+ Releases · 8.5k Stars | 统计 |
| H-26 | 底文 | Every contribution makes the ecosystem faster, smarter, and more powerful for thousands of builders around the world. | 正文 |
| H-27 | CTA | View on GitHub | 按钮 |

### B6. 频道矩阵 Follow us（6 卡）

| ID | 频道 | 标题 | 描述文案 | CTA 文案 |
|---|---|---|---|---|
| H-28 | Discord | Discord | Join 800+ builders for real-time chat, office hours, and peer help. | Follow on Discord → |
| H-29 | GitHub | GitHub | Issues, PRs, and open-source projects from the ecosystem. | Follow on GitHub → |
| H-30 | LinkedIn | LinkedIn | Learn the latest about releases, events, and community news. | Follow on LinkedIn → |
| H-31 | Medium | Medium | Tutorials, deep dives, and builder stories from the community. | Follow on Medium → |
| H-32 | Ask OUG | Ask OUG | Searchable Q&A for product questions and deployment help. | Ask OUG → |
| H-33 | Events | Events | Find out when the next meetup, AMA, or workshop will take place. | View calendar → |

### B7. More resources

| ID | 卡片 | 标题 | 描述 | CTA |
|---|---|---|---|---|
| H-34 | Docs | Documentation | Official guides, API references, and deployment docs for OceanBase and seekdb. | Read docs |
| H-35 | About | About OceanData4AI | Learn more about our mission, values, and vendor-neutral community approach. | About us |
| H-36 | Conduct | Code of Conduct | Community guidelines — be respectful, constructive, and inclusive. | Read guidelines |

---

## C. About (`about.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/about.html  
**截图：** `screenshots/about-full.png`

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| A-01 | Hero H1 | About OceanData4AI | 标题 |
| A-02 | Hero | Connecting builders who work on the data layer for AI — RAG, vectors, agents, and memory. Vendor-neutral, open, and builder-first. | 正文 |
| A-03 | Mission | OceanData4AI is a community hub for practitioners building AI applications on real data infrastructure. We share tutorials, compare approaches honestly, and help newcomers find their footing — whether they use OceanBase, seekdb, or entirely different stacks. | 正文 |
| A-04 | Neutrality | We are an open ecosystem community. OceanBase initiated and supports OceanData4AI, but our content covers multiple vendors and open-source projects. We believe trust comes from transparency, not from hiding who we are. | 正文 |
| A-05 | 列表 | One Blog — topics filtered by tags · Q&A for Q&A; Join for Fellows — separate pages, not content silos · No pay-to-play editorial; Fellows are selected on merit | 列表 |
| A-06 | Principles | Builder-first · Honest comparisons · Community voice · Safe space (Code of Conduct) | 原则卡 |
| A-07 | Stats | 847 Discord members · 2.4k GitHub stars (ecosystem) · 24 Articles published | 数据 |
| A-08 | Stats 注脚 | Community stats updated monthly · Last update: Jun 2026 | 注释 |
| A-09 | CTA | Want to contribute? — Write for the blog, host an office hour, or apply to become a Fellow. | CTA 区 |
| A-10 | CTA 按钮 | Join the community · Get in touch | 按钮 |

---

## D. Join (`join.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/join.html  
**截图：** `screenshots/join-paths.png` · `join-fellow-form.png`

### D1. Hero & 加入路径

| ID | 路径 | 标题 | 描述 | CTA |
|---|---|---|---|---|
| J-01 | Hero | Join the community | Pick your path — chat on Discord, contribute on GitHub, follow us on LinkedIn, or apply to write as a Fellow. | — |
| J-02 | Discord ★ | 💬 Discord — fastest way in | Introduce yourself in #introductions, ask questions, join office hours. No OceanBase experience required. | Join Discord ↗ |
| J-03 | GitHub | ⌥ GitHub — contribute code & docs | Star repos, open issues, submit PRs. See our contribution guidelines on GitHub. | View on GitHub ↗ |
| J-04 | Events | 📅 Events — meet us live | Office hours, workshops, and AMAs announced in Discord. Great if you prefer live interaction. | Browse events |
| J-05 | LinkedIn | LinkedIn — stay in the loop | Join our group for updates, discussions, and community news between live sessions. | Join on LinkedIn ↗ |

### D2. Fellow 申请表单

| ID | 元素 | 英文原文 |
|---|---|---|
| J-06 | 标题 | Apply as a Fellow |
| J-07 | 说明 | Fellows publish under the OceanData4AI brand, get editorial support, and help shape community content. We respond within **5–7 business days**. |
| J-08 | 字段 | Full name * · Email * · GitHub or LinkedIn * · Topic interests * · Sample writing * |
| J-09 | Topic 选项 | RAG & retrieval · Vector databases · Agent memory · Hybrid search · Knowledge engineering · Other AI data infra |
| J-10 | Hint | We look for clarity, accuracy, and builder empathy — not marketing copy. |
| J-11 | 提交 | Submit application |
| J-12 | 成功 | Thanks! Your application has been received. We'll reply within 5–7 business days. |

---

## E. Blog (`blog.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/blog.html  
**截图：** `screenshots/blog-full.png`

| ID | 模块 | 英文原文 |
|---|---|---|
| B-01 | Hero kicker | Articles |
| B-02 | H1 | Blog |
| B-03 | Hero | Tutorials, deep dives, and builder stories on AI data infrastructure — one feed, filtered by topic tags. |
| B-04 | 筛选标签 | All · News & Updates · Tutorials · Deep Dives · Builder Stories |
| B-05 | 外链 | Read on Medium |
| B-06+ | 文章卡 | 见附录「Blog 文章列表」 |

---

## F. Events (`events.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/events.html  
**截图：** `screenshots/events-full.png`

| ID | 模块 | 英文原文 |
|---|---|---|
| E-01 | H1 | Events |
| E-02 | Hero | Office hours, workshops, and AMAs — join us live on Discord. |
| E-03 | Upcoming 说明 | Dates and times are announced in Discord — check back for updates. |
| E-04 | 活动1 | Tokyo Onchain Night — Invite-only builder meetup in Shibuya… | CTA: Ask for invite ↗ |
| E-05 | 活动2 | Corporate Crypto Strategy Summit — B2B executive session… | CTA: Request details ↗ |
| E-06 | 活动3 | Vietnam OceanData4AI Meetup — Planned local meetup… | CTA: Follow updates ↗ |
| E-07 | Past events | No replays published yet. — Join Discord for announcements when recordings are available. |

---

## G. Fellows (`fellows.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/fellows.html  
**截图：** `screenshots/fellows-full.png`

| ID | 模块 | 英文原文 |
|---|---|---|
| F-01 | Kicker | Community |
| F-02 | H1 | Fellows Directory |
| F-03 | Hero | Builders who publish tutorials, deep dives, and builder stories for the community — selected on merit, not pay-to-play. |
| F-04 | Featured | Featured Fellows — Phase 1 showcase — profiles link to articles on Medium and community channels. |
| F-05 | CTA | Apply as Fellow |
| F-06 | 筛选 | All · Tutorials · Deep Dives · Builder Stories |
| F-07+ | Fellow 档案 | 见附录「Fellows 名录」 |

---

## H. Ask OUG 问答 (`qa/oug-help.html` + `qa/ask.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/qa/oug-help.html  
**截图：** `screenshots/qa-oug.png` · `qa-ask-signup.png`

### H1. 列表页

| ID | 模块 | 英文原文 |
|---|---|---|
| Q-01 | 顶栏 Banner | M1 · On-site Q&A demo · Browse topics below; posting opens after legal review |
| Q-02 | Kicker | Ask OUG |
| Q-03 | H1 | OceanBase User Group Q&A |
| Q-04 | 描述 | Your go-to space for troubleshooting and how-to help on OceanBase, seekdb, and production deployments. Report bugs, ask integration questions, share minimal repros. |
| Q-05 | CTA | Ask OUG |
| Q-06 | 置顶帖 | About Ask OUG — Search before posting. Include version, OS, and minimal repro. English preferred; BGO team responds within 2 business days. |

### H2. 注册发帖页 (`qa/ask.html`)

| ID | 模块 | 英文原文 |
|---|---|---|
| Q-07 | Banner | M1 · Ask OUG demo · Sign in required to post · Images supported in body |
| Q-08 | 注册标题 | Sign up for Ask OUG |
| Q-09 | 字段 | Email* · Password* · Company name · Terms checkbox |
| Q-10 | 密码规则 | At least 12 characters · At least 3 of: lower/upper/digit/special |
| Q-11 | Terms | I accept the Code of Conduct, Privacy Policy, and community terms |
| Q-12 | 提交 | Sign up with email |
| Q-13 | 提示 | We will email you a verification link before you can post. |
| Q-14 | 验证页 | Check your email — We sent a confirmation link to {email}. — Open the message from **The OceanData4AI Community** and click **Verify email**… |
| Q-15 | 发帖页 | Start a discussion — Ask the OceanBase User Group community. You can paste or upload images in the body. |
| Q-16 | 表单 | Title · Body · Insert image — PNG · JPEG · GIF · WebP · paste or drag |
| Q-17 | 提交 | Preview topic |
| Q-18 | 注脚 | Demo only — your topic will not be published until Q&A posting is enabled. |

---

## I. M1 Demo 差异文案 (`m1/`)

> M1 为里程碑版本，文案与主站部分不同。专家需单独评审是否保留两套口径。

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/m1/

| ID | 页面 | 与主站差异要点 |
|---|---|---|
| M1-01 | 顶栏 Banner | M1 Milestone Demo · View original hub ↗ |
| M1-02 | Home Hero | Where builders talk about *AI data infrastructure* — RAG, vectors, agents, and everything in between. |
| M1-03 | Gather 区 | Channels & external matrix — Ask OUG / Discord / Medium / GitHub / LinkedIn / Docs |
| M1-04 | About | Mission / Neutrality / One platform / vs. en.oceanbase.com 四卡 + Content split 70/20/10 |
| M1-05 | Blog | M1 · 4 content series 表格（News 15% / Tutorials 25% / Deep Dives 35% / Builder Stories 25%） |

---

## 附录 1：Blog 文章列表（主站硬编码）

| 标题 | 标签 | 摘要 | 作者 |
|---|---|---|---|
| Get Started with seekdb… | Tutorials | From zero to your first vector + full-text query in under 15 minutes. | OceanBase User Group |
| Why Your Vector Database Benchmark Is Wrong for AI Agents | Deep Dives | Why agent workloads break traditional benchmark assumptions. | Harry Zhang |
| MEMORY.md Every Turn — That's Noise, Not Memory | Deep Dives | Design agent memory that scales without polluting every context window. | Harry Zhang |
| CLI Over MCP… | Tutorials | When structured tool calls beat raw SQL for agent-friendly APIs. | OceanBase User Group |
| Beyond RAG: Why Knowledge Engineering… | Deep Dives | Curation, freshness, and trust in knowledge graphs beat naive retrieval. | Harry Zhang |
| Stop Stitching Your RAG Stack… | Tutorials | One database for vectors, full-text, and AI functions — less glue code. | OceanBase User Group |
| Building RAG & Knowledge Bases with seekdb… | Tutorials | Three architecture patterns for production RAG on a single data layer. | OceanBase User Group |
| Welcome to OceanData4AI… | News & Updates | Launching a vendor-neutral community for RAG, vectors, and agent memory. | OceanData4AI Team |
| Harness Engineering in Practice… | Builder Stories | Patterns for orchestrating multiple agents with shared memory and tools. | Harry Zhang |

---

## 附录 2：Fellows 名录（`js/fellows-data.js`）

| 姓名 | 角色 | Topics | Bio 摘要 |
|---|---|---|---|
| Harry Zhang | Community Fellow | Agent memory, RAG, Knowledge engineering | Writes on agent memory, retrieval trade-offs, and knowledge engineering for production AI systems. |
| Alex Rivera | Community Fellow | Hybrid search, seekdb, Tutorials | Hands-on tutorials for hybrid search and RAG on a single data layer. |
| Priya Sharma | Community Fellow | Agent systems, Harness engineering, User stories | Documents multi-agent systems and harness patterns in the wild. |
| Jordan Kim | Associate Fellow | Database interfaces, MCP, Agents | Explores agent-friendly database interfaces — when CLI beats MCP. |

---

## 专家评审意见栏（模板）

| ID | 评审人 | 意见类型（措辞/语气/准确性/品牌） | 具体建议 | 优先级 |
|---|---|---|---|---|
| 例 H-04 | | | 「800+」数据是否可核实？ | P1 |
| | | | | |
