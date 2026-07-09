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

## H. Ask OUG 问答 (`qa/oug-help.html` + `qa/ask.html` + `qa/topic.html` + `qa/verify.html`)

**预览：** https://oceandata4ai.github.io/oceandata4ai-hub/qa/oug-help.html  
**截图：** `screenshots/qa-oug-full.png` · `qa-ask-signup.png` · `qa-topic-full.png`

### H1. 列表页 — 顶栏与主内容

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| Q-META-01 | `<meta description>` | Product troubleshooting, how-to guides, and deployment help for OceanBase and seekdb. | SEO |
| Q-01 | 顶栏 Banner | M1 · On-site Q&A demo · Browse topics below; posting opens after legal review | 顶栏 |
| Q-02 | Kicker | Ask OUG | 标签 |
| Q-03 | H1 | OceanBase User Group Q&A | 标题 |
| Q-04 | 描述 | Your go-to space for troubleshooting and how-to help on OceanBase, seekdb, and production deployments. Report bugs, ask integration questions, share minimal repros. | 正文 |
| Q-05 | CTA | Ask OUG | 按钮 |

### H2. 列表页 — 左侧栏（Discussion / Tags）

| ID | 模块 | 英文原文 | 类型 | 备注 |
|---|---|---|---|---|
| Q-SB-01 | 侧栏标题 | Discussion | 导航区标题 | |
| Q-SB-02 | 侧栏链接 | Ask OUG | 导航项（当前页高亮） | |
| Q-SB-03 | 侧栏标题 | Tags | 标签区标题 | 见截图 |
| Q-SB-04 | 侧栏 Tag | seekdb | 筛选标签 | |
| Q-SB-05 | 侧栏 Tag | deployment | 筛选标签 | |
| Q-SB-06 | 侧栏 Tag | vector | 筛选标签 | |
| Q-SB-07 | 侧栏 Tag | hybrid-search | 筛选标签 | |
| Q-SB-NOTE | 一致性 | 侧栏无 `kubernetes` / `mysql-mode`，但话题卡片有 | — | ⚠️ 专家需确认是否补全侧栏 |

### H3. 列表页 — 话题表头与 Demo 话题

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| Q-TB-01 | 表头 | Topic | 列名 |
| Q-TB-02 | 表头 | Replies | 列名 |
| Q-TB-03 | 表头 | Views | 列名 |
| Q-TB-04 | 表头 | Activity | 列名 |
| Q-TP-01 | 置顶帖标题 | About Ask OUG | 话题 |
| Q-TP-01a | 置顶帖摘要 | Search before posting. Include version, OS, and minimal repro. English preferred; BGO team responds within 2 business days. | 摘要 |
| Q-TP-02 | 话题标题 | seekdb hybrid search returns empty — knn + BM25 in one SQL | 话题 |
| Q-TP-02a | 话题摘要 | Running DBMS_HYBRID_SEARCH on a 50k doc table; vector leg works alone but combined query returns 0 rows. | 摘要 |
| Q-TP-02b | 话题标签 | seekdb · hybrid-search | Tag |
| Q-TP-03 | 话题标题 | How to install OceanBase on Kubernetes (minimal prod checklist)? | 话题 |
| Q-TP-03a | 话题摘要 | Looking for a hardened single-replica dev setup vs. 3-node obcluster for staging. | 摘要 |
| Q-TP-03b | 话题标签 | deployment · kubernetes | Tag |
| Q-TP-04 | 话题标题 | Vector index build fails after upgrade to 4.3 | 话题 |
| Q-TP-04a | 话题摘要 | IVF index rebuild stalls at 78%; logs show memory limit on observer node. | 摘要 |
| Q-TP-04b | 话题标签 | vector | Tag |
| Q-TP-05 | 话题标题 | MySQL compatibility: GROUP BY behavior difference migration | 话题 |
| Q-TP-05a | 话题摘要 | Porting from MySQL 8 — only_full_group_by queries failing on OceanBase. | 摘要 |
| Q-TP-05b | 话题标签 | mysql-mode | Tag |

### H4. 注册 / 登录 / 发帖 (`qa/ask.html`)

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| Q-07 | Banner | M1 · Ask OUG demo · Sign in required to post · Images supported in body | 顶栏 |
| Q-08 | 注册模式标题 | Sign up for Ask OUG | 标题 |
| Q-08b | 登录模式标题 | Sign in to Ask OUG | 标题 |
| Q-09 | 字段标签 | Email* · Password* · Company name | 表单 |
| Q-09a | Email 占位 | your.email@company.com | 占位 |
| Q-09b | 编辑按钮 | Edit | 按钮 |
| Q-10 | 密码规则标题 | Your password must contain: | 规则 |
| Q-10a | 密码规则 | At least 12 characters · At least 3 of: lower / upper / digit / special | 规则项 |
| Q-11 | Terms | I accept the Code of Conduct, Privacy Policy, and community terms | 勾选 |
| Q-12 | 注册提交 | Sign up with email | 按钮 |
| Q-12b | 登录提交 | Sign in with email | 按钮 |
| Q-12c | 发送中 | Sending verification email… | 状态 |
| Q-13 | 注册提示 | We will email you a verification link before you can post. | 提示 |
| Q-13b | 切换登录 | Already have an account? Sign in | 链接 |
| Q-13c | 切换注册 | New here? Sign up | 链接 |
| Q-14 | 验证页标题 | Check your email | 标题 |
| Q-14a | 验证页正文 | We sent a confirmation link to {email}. Open the message from **The OceanData4AI Community** and click **Verify email** to finish sign up. Please open the link in the same browser where you signed up. The link expires in 24 hours. | 正文 |
| Q-14b | 验证操作 | Resend verification email · Back to sign in | 按钮 |
| Q-14c | 未收到提示 | Did not receive it? Check spam, or click Resend verification email above. | 提示 |
| Q-14d | Dev 回退 | Email service not configured — dev fallback link: · Open verification link | 仅发信失败时 |
| Q-15 | 发帖标题 | Start a discussion | H1 |
| Q-15a | 发帖引导 | Ask the OceanBase User Group community. You can paste or upload images in the body. | 正文 |
| Q-15b | 登录态 | Signed in as {email} · Sign out | 状态条 |
| Q-16 | 表单 | Title · Body · Insert image | 字段 |
| Q-16a | Title 占位 | Summarize your question | 占位 |
| Q-16b | Body 占位 | Include version, environment, and steps to reproduce if applicable. Paste screenshots here. | 占位 |
| Q-16c | 图片提示 | PNG · JPEG · GIF · WebP · paste or drag | 提示 |
| Q-17 | 提交 | Preview topic | 按钮 |
| Q-18 | 注脚 | Demo only — your topic will not be published until Q&A posting is enabled. | 注脚 |
| Q-18b | 登录后提示 | You are signed in. Compose your question below. | 提示 |
| Q-18c | 预览成功 | Preview saved locally for demo. Full posting opens after legal review & Discourse setup. | 提示 |
| Q-ERR-01 | 错误 | Please sign in before posting. · Title and body are required. · Only PNG, JPEG, GIF, and WebP images are supported. · Image must be 2 MB or smaller for this demo. | 错误 |

### H5. 话题详情页 (`qa/topic.html` + `js/qa-data.js`)

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| Q-TV-01 | Banner | M1 · On-site Q&A demo · Posting opens after legal review | 顶栏（与列表页不同） |
| Q-TV-02 | 面包屑 | {boardLabel} / {topic title} | 导航 |
| Q-TV-03 | 无回复 | No replies yet — be the first to respond after posting opens. | 空状态 |
| Q-TV-04 | 回复区标题 | Reply · {N} Reply / Replies | 标题 |
| Q-TV-05 | 回复表单说明 | Posting and replies open when hosted Q&A goes live (post legal review). Browse topics on-site for now. | 说明 |
| Q-TV-06 | 404 | Topic not found. Back to Ask OUG | 错误 |
| Q-TV-07 | 页脚 | ← Back to Q&A | 链接 |

### H6. 邮箱验证页 (`qa/verify.html`)

| ID | 模块 | 英文原文 | 类型 |
|---|---|---|---|
| Q-VF-01 | 加载中 | Verifying your email… | 状态 |
| Q-VF-02 | 成功标题 | Email verified | 标题 |
| Q-VF-03 | 成功正文 | Your email {email} is confirmed. You can now ask questions on Ask OUG. | 正文 |
| Q-VF-04 | 成功 CTA | Continue to Ask OUG | 按钮 |
| Q-VF-05 | 失败标题 | Verification failed | 标题 |
| Q-VF-06 | 失败-无效 | This verification link is invalid. | 错误 |
| Q-VF-07 | 失败-跨浏览器 | This link was opened in a different browser/device from where you signed up. Please open it in the same browser session, or sign up again and verify there. | 错误 |
| Q-VF-08 | 失败 CTA | Back to sign up | 按钮 |

---

## 附录 3：Ask OUG Demo 话题正文（`js/qa-data.js`）

| Slug | 标题 | 作者 | 标签 | 正文摘要 |
|---|---|---|---|---|
| about-oug-discussion | About Ask OUG | OceanData4AI Team | — | Community space for OceanBase, seekdb, AI data infra; search first; English preferred; 2 business day response |
| seekdb-hybrid-empty | seekdb hybrid search returns empty… | alex_dev | seekdb, hybrid-search | DBMS_HYBRID_SEARCH 50k docs; vector works, combined returns 0 |
| ob-k8s-install | How to install OceanBase on Kubernetes… | platform_eng | deployment, kubernetes | Single-replica dev vs 3-node obcluster; Helm/operator tips |
| vector-index-43 | Vector index build fails after upgrade to 4.3 | dba_sea | vector | IVF rebuild stalls 78%; memory limit on observer |
| mysql-group-by | MySQL compatibility: GROUP BY… | migrator | mysql-mode | ONLY_FULL_GROUP_BY migration from MySQL 8 |

**示例回复文案（节选）：**

- `oug_mod`: Check that the FTS index finished building… Try lowering k to 3 for a smoke test.
- `harry_z`: Start with the official ob-operator quickstart; for staging use 3 observers + 1 OBProxy.
- `oug_mod`: See docs on sql_mode parity; we're tracking edge cases in 4.3.1 release notes.

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
