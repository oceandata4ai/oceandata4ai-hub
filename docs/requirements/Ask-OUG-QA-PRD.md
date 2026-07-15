# Ask OUG 问答模块需求文档（参考 Databricks Community）

> **版本：** v0.2 · 2026-07-09  
> **参考：** [Databricks Community](https://community.databricks.com/)（Khoros 论坛）  
> **现状：** `qa/` M1 站内 Demo（静态种子数据 + localStorage 演示鉴权）  
> **目标产品名：** Ask OUG（OceanBase User Group Q&A）  
> **分期：** 共 **3 期** — 一期为 **MVP（最基本可用）**

---

## 1. 背景与目标

### 1.1 为什么做

OceanData4AI Hub 需要**可搜索、可沉淀**的产品问答能力，与 Discord 实时聊天、Medium/dev.to 长文形成互补：

| 渠道 | 定位 |
|------|------|
| Discord | 实时讨论、Office Hours |
| Blog / dev.to | 教程、深度文章 |
| **Ask OUG** | 可检索的 troubleshooting、部署、版本相关问题 |

ClickHouse 社区**没有**站内 Q&A，问答外置在 GitHub Discussions + Slack。Databricks 将 **Discussions** 作为社区核心模块——本方案参考后者，但分 **3 期**落地，一期只做 MVP。

### 1.2 产品目标

1. **一期（MVP）**：用户能浏览、阅读历史问答，内容可分享、可 SEO  
2. **二期**：用户能注册、发帖、回复，内容开始自然增长  
3. **三期**：搜索、治理、激励与规模化（含可选 Discourse 迁移）

### 1.3 非目标

- 替代 GitHub Issues  
- 复制 Databricks 的 Learning、Certifications、Groups  
- 一期不做发帖、登录、搜索、Kudos  

---

## 2. Databricks 对标 & 三期映射

| 能力域 | Databricks | 一期 MVP | 二期 | 三期 |
|--------|------------|----------|------|------|
| 帖子列表 | ✅ | ✅ | ✅ | ✅ |
| 帖子详情 + 回复（读） | ✅ | ✅ | ✅ | ✅ |
| 发帖 / 回复（写） | ✅ | ❌ | ✅ | ✅ |
| 登录注册 | ✅ | ❌ | ✅ | ✅ |
| 标签展示 | ✅ | ✅ 只展示 | ✅ 可选 | ✅ 可筛选 |
| 标签筛选 / 搜索 | ✅ | ❌ | ✅ | ✅ 增强 |
| Resolved / 最佳答案 | ✅ | ❌ | ❌ | ✅ |
| Kudos / 排行榜 | ✅ | ❌ | ❌ | ✅ |
| 用户等级 / Profile | ✅ | ❌ | 基础 | ✅ 完整 |
| 多 Board | ✅ | ❌ 单 Board | 单 Board | 可扩展 |
| Moderation | ✅ | ❌ | 基础 | ✅ |

---

## 3. 现状盘点（M1 Demo → 非 MVP）

当前 `qa/` 为**交互原型**，不计入正式一期交付：

| 模块 | 状态 | MVP 处理方式 |
|------|------|----------------|
| 列表静态 HTML vs `qa-data.js` 分裂 | 技术债 | **一期必须统一数据源** |
| localStorage 假登录 / 假发帖 | Demo | **一期移除或隐藏**，避免误导 |
| EmailJS 验证 | Demo | 挪到二期 |
| 发帖表单 UI | 已有 | 一期隐藏入口；二期启用 |

---

## 4. 信息架构

### 4.1 一期 MVP（只读）

```
Ask OUG
└── Board: oug-help          ← oug-help.html
    ├── 置顶帖
    ├── 帖子表（Topic / Replies / Views / Activity）
    └── 侧栏：Board 导航 + 标签展示（不可点）
    └── 帖子详情              ← topic.html?slug=
        ├── 楼主正文
        └── 回复流（只读）
```

### 4.2 二期起（读写）

```
+ ask.html        注册 / 登录 / 发帖
+ topic.html      回复框（登录后）
+ 标签必选（发帖时）
```

### 4.3 三期起（发现 + 社区）

```
+ 搜索 / 标签筛选 / 排序分页
+ Resolved、Kudos、用户资料、通知
+ 可选：Discourse 迁移或运营后台
```

---

## 5. 数据模型

### 5.1 Topic（一期即需）

| 字段 | 一期 MVP | 二期 | 三期 |
|------|----------|------|------|
| `slug`, `title`, `bodyHtml` | ✅ | ✅ | ✅ |
| `author`, `tags[]`, `pinned` | ✅ | ✅ | ✅ |
| `replies[]`, `replyCount`, `viewCount` | ✅ | ✅ | ✅ |
| `createdAt`, `updatedAt` | ✅ | ✅ | ✅ |
| `status` (open/resolved) | — | — | ✅ |
| `acceptedReplyId` | — | — | ✅ |

### 5.2 Reply

| 字段 | 一期 | 二期 | 三期 |
|------|------|------|------|
| `author`, `bodyHtml`, `createdAt` | ✅ 只读 | ✅ 可写 | ✅ |
| `kudos` | — | — | ✅ |

### 5.3 User（二期起）

`email`, `displayName`, `company?`, `role`, `emailVerified` — 二期上线。

**一期推荐存储：** 静态 `data/topics.json`（GitHub Pages 友好）；二期再接入 API 或 Discourse。

---

## 6. 三期路线图（核心）

---

### 一期 — MVP（最基本可用）

**一句话：** 能看、能分享、数据一致；**不能发**。

**对标 Databricks：** 相当于只开放 Discussions 的**浏览态**（未登录可看帖），无 Community 写能力。

#### 范围（In）

| # | 需求 | 优先级 |
|---|------|--------|
| 1.1 | **单一数据源** `topics.json`（或等价静态构建产物） | P0 |
| 1.2 | **动态渲染列表** `oug-help.html`，字段：Topic / Replies / Views / Activity | P0 |
| 1.3 | **动态渲染详情** `topic.html?slug=`，含回复流、代码块、图片 | P0 |
| 1.4 | **列表与详情数据一致**（replyCount、activity 同源计算） | P0 |
| 1.5 | **置顶帖** `pinned` 排最前 | P1 |
| 1.6 | **标签展示**（侧栏 + 帖内），一期**不可筛选** | P1 |
| 1.7 | **SEO**：每帖 `<title>`、`meta description`、独立 URL | P0 |
| 1.8 | **Hub 集成**：`phase1/qa/*` 顶栏入口、资源路径正确 | P0 |
| 1.9 | **种子内容**：迁移现有 5 帖 + 运营可 PR 增帖 | P0 |
| 1.10 | **移除误导**：去掉 M1 Demo 横幅；隐藏或禁用「Ask OUG」发帖 CTA，改为「Posting opens in Phase 2」或链到 Discord | P0 |
| 1.11 | **404**：无效 slug 友好页 | P1 |
| 1.12 | **移动端**：列表表格降级（沿用 `qa.css`） | P1 |

#### 范围（Out）

- 注册 / 登录 / 邮件验证  
- 发帖 / 回复  
- 搜索 / 标签筛选 / 分页  
- Kudos、Resolved、用户等级  
- 真实 viewCount 统计（可写死或省略，与详情一致即可）  

#### 技术建议

- **静态 JSON + 构建脚本**：`data/topics.json` → 列表/详情 JS 渲染  
- 与 `scripts/build-phase1.sh` 兼容，QA 页复制进 `phase1/qa/`  
- 删除或停用 `qa-auth.js` 在一期的入口引用（代码可保留给二期）  

#### 退出标准（一期验收）

- [ ] 列表 100% 来自 `topics.json`，无手写表格行  
- [ ] 任一点击进入详情，replies/views 与 JSON 一致  
- [ ] 无「已发布」假象（无 localStorage 草稿成功提示）  
- [ ] `phase1/qa/oug-help.html` 线上可访问  
- [ ] 至少 5 条有质量的种子帖可供演示  

#### 建议工期：1–2 周

---

### 二期 — 读写闭环

**一句话：** 用户能注册、发帖、回复；社区内容开始 UGC 增长。

**对标 Databricks：** Login/Register + 发 Discussion + 回帖 + 标签。

#### 范围（In）

| # | 需求 | 优先级 |
|---|------|--------|
| 2.1 | **服务端账号**（替换 localStorage Demo） | P0 |
| 2.2 | **邮箱验证**（24h 令牌，跨设备） | P0 |
| 2.3 | **发帖**：标题、正文、1–3 标签、CoC 勾选 | P0 |
| 2.4 | **回复** | P0 |
| 2.5 | **启用 ask.html** + 真预览或发帖后直接进详情 | P0 |
| 2.6 | **图片上传**（对象存储，非 base64 持久化） | P1 |
| 2.7 | **基础反垃圾**（频率限制、首帖审核可选） | P1 |
| 2.8 | **全文搜索**（标题 + 正文） | P0 |
| 2.9 | **标签筛选**（侧栏可点） | P0 |
| 2.10 | **排序**：Latest activity（默认）、Newest | P1 |
| 2.11 | **分页**（20 条/页） | P1 |
| 2.12 | **发帖前相似帖提示**（标题关键词） | P2 |
| 2.13 | **Mod 删帖/锁帖**（最小后台或 Discourse） | P2 |

#### 发帖表单（二期）

- Title（必填，≥10 字符）  
- Body（Markdown 或富文本，≥30 字符）  
- Tags（必选 1–3：`seekdb` `deployment` `vector` `hybrid-search` `mysql-compat` `k8s` …）  
- 可选：OceanBase 版本、部署环境  

#### 技术决策（二期启动前必选）

| 方案 | 适用 |
|------|------|
| **A. 轻量 API**（Serverless + DB） | 希望 UI 自控、与 Hub 深度集成 |
| **B. Discourse** | 希望快速获得成熟论坛能力，Hub 做壳或跳转 |

#### 退出标准

- [ ] 新用户：注册 → 验证邮件 → 发帖 → 收到他人回复  
- [ ] 搜索能命中已有帖；无结果引导发帖  
- [ ] 标签筛选结果正确  

#### 建议工期：4–6 周（含后端或 Discourse 搭建）

---

### 三期 — 社区成熟 & 规模化

**一句话：** 提升回答质量、可运营、可扩展。

**对标 Databricks：** Resolved、Kudos、Solution 榜、用户等级、通知。

#### 范围（In）

| # | 需求 | 优先级 |
|---|------|--------|
| 3.1 | **Resolved** + **采纳最佳答案** | P0 |
| 3.2 | **Kudos**（回复点赞） | P1 |
| 3.3 | **用户公开资料**（头像、公司、贡献数） | P1 |
| 3.4 | **贡献等级**（New / Active / Expert，简化） | P2 |
| 3.5 | **周榜**（Top helpers） | P2 |
| 3.6 | **邮件通知**（被回复、被 kudos） | P2 |
| 3.7 | **员工/合作伙伴标识** | P2 |
| 3.8 | **举报 + 审核工单** | P1 |
| 3.9 | **Hub 顶栏全局搜索**（含 Ask OUG） | P2 |
| 3.10 | **多 Board**（如 seekdb-help） | P2 |
| 3.11 | **分析看板**（发帖量、解决率、无结果搜索词） | P2 |
| 3.12 | **可选：Discourse 全量迁移** + SSO | 视二期方案 |

#### 退出标准

- [ ] 楼主可标 Resolved；最佳答案在详情页置顶  
- [ ] 运营可处理举报；有基本 Moderation 流程  
- [ ] 二期末若选 Discourse，完成迁移或明确继续自建路线  

#### 建议工期：4–6 周

---

## 7. 页面规格摘要

### 7.1 一期 MVP — `oug-help.html`

| 元素 | 规格 |
|------|------|
| 表头 | Topic · Replies · Views · Activity |
| 置顶 | `pinned` 视觉区分 |
| CTA | **隐藏发帖** 或文案「Posting coming in Phase 2」+ Discord 备选 |
| 侧栏 Tags | 展示 only，`href` 禁用或 `#` |

### 7.2 一期 MVP — `topic.html`

| 元素 | 规格 |
|------|------|
| 面包屑 | Ask OUG › Title |
| 正文 | 代码高亮、图片 |
| 回复 | 只读列表；**无回复框** |
| 底部 | 「Want to ask? Join Discord」或「Posting opens soon」 |

### 7.3 二期 — `ask.html` / 回复框

恢复完整发帖流；未登录 → Sign up / Sign in；提交后跳转详情。

### 7.4 三期 — 搜索 & Resolved

Board 顶栏搜索；Resolved 标题前缀；最佳答案区块。

---

## 8. 非功能需求

| 类别 | 一期 | 二期 | 三期 |
|------|------|------|------|
| 性能 | 首屏 < 2s | 发帖 < 3s | — |
| SEO | 每帖可索引 | 新帖自动 sitemap | — |
| 安全 | 静态只读风险低 | 消毒、CSRF、限流 | 举报审计 |
| 合规 | CoC 链接可见 | 注册勾选 CoC + Privacy | 举报通道 |

---

## 9. 与 Hub 模块边界

| 场景 | 去向 |
|------|------|
| Bug / Feature request | GitHub Issues |
| 即时求助 | Discord |
| 教程 | Medium / dev.to |
| 部署/报错（一期起） | **Ask OUG 阅读**；二期起可发帖 |
| 法务 | CoC / Contact |

---

## 10. 里程碑总览

| 阶段 | 目标 | 工期 | 依赖 |
|------|------|------|------|
| **一期 MVP** | 只读问答库，数据一致，Hub 可演示 | 1–2 周 | `topics.json` 方案；去掉 Demo 误导 |
| **二期** | 注册发帖回复 + 搜索标签 | 4–6 周 | 后端或 Discourse；邮件服务 |
| **三期** | Resolved/Kudos/运营/扩展 | 4–6 周 | 二期有真实 UGC 量 |

```
M1 Demo（现状）  →  一期 MVP（只读）  →  二期（读写）  →  三期（社区成熟）
     原型              最小可用            增长闭环          规模化
```

---

## 11. 一期 MVP 验收清单

- [ ] `data/topics.json` 为唯一真相源  
- [ ] `oug-help.html` 无硬编码 `<tr>` 帖子行  
- [ ] `topic.html?slug=` 与 JSON 中 `replies` 一致  
- [ ] 无效 slug 显示 404  
- [ ] 无 M1 Demo 横幅 / 无假发帖成功  
- [ ] `phase1/qa/` 构建正常  
- [ ] 移动端列表可读  
- [ ] 每帖有合理 `<title>` 与 meta  

---

## 12. 附录

### A. 参考链接

- Databricks Community：https://community.databricks.com/  
- 现有代码：`qa/oug-help.html`、`js/qa-data.js`、`css/qa.css`  

### B. 开放问题

1. 一期 `topics.json` 由谁维护（工程 PR vs 运营后台）？  
2. 二期默认 **自建 API** 还是 **Discourse**？  
3. 一期发帖 CTA 是**完全隐藏**还是**灰显 + Coming soon**？  
4. 二期是否支持中文帖？  

---

*文档 v0.2：原 6 期合并为 3 期；一期定义为只读 MVP。*
