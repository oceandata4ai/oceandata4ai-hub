window.OCEANDATA4AI_QA_TOPICS = {
  'about-oug-help': {
    board: 'oug-help',
    boardLabel: 'OUG Help',
    title: 'About the OUG Help category',
    author: 'OceanData4AI Team',
    date: 'Jul 1, 2026',
    tags: [],
    pinned: true,
    body: `<p>This category is your go-to space for troubleshooting and guidance on OceanBase and seekdb.</p>
<ul>
<li>Search existing topics before posting</li>
<li>Include version, OS, and minimal repro steps</li>
<li>English preferred; BGO team targets first response within 2 business days</li>
</ul>`,
    replies: [],
  },
  'seekdb-hybrid-empty': {
    board: 'oug-help',
    boardLabel: 'OUG Help',
    title: 'seekdb hybrid search returns empty — knn + BM25 in one SQL',
    author: 'alex_dev',
    date: 'Jul 5, 2026',
    tags: ['seekdb', 'hybrid-search'],
    body: `<p>Running <code>DBMS_HYBRID_SEARCH</code> on a 50k doc table. Vector leg alone returns results; combined knn + BM25 query returns 0 rows.</p>
<pre><code>SELECT doc_id, title, score
FROM DBMS_HYBRID_SEARCH.SEARCH(
  'knowledge_base',
  '{"knn":{"k":5},"query":"agent memory"}'
);</code></pre>
<p>seekdb 1.2 · macOS · table has both vector column and FTS index.</p>`,
    replies: [
      { author: 'oug_mod', date: 'Jul 5, 2026', body: '<p>Check that the FTS index finished building (<code>SHOW INDEX</code>) and that <code>recall</code> threshold isn’t filtering everything. Try lowering <code>k</code> to 3 for a smoke test.</p>' },
      { author: 'alex_dev', date: 'Jul 6, 2026', body: '<p>FTS was still BUILDING — waited and it works now. Thanks!</p>' },
    ],
  },
  'ob-k8s-install': {
    board: 'oug-help',
    boardLabel: 'OUG Help',
    title: 'How to install OceanBase on Kubernetes (minimal prod checklist)?',
    author: 'platform_eng',
    date: 'Jul 2, 2026',
    tags: ['deployment', 'kubernetes'],
    body: '<p>Looking for a hardened single-replica dev setup vs. 3-node obcluster for staging. Any Helm values or operator tips?</p>',
    replies: [
      { author: 'harry_z', date: 'Jul 3, 2026', body: '<p>Start with the official ob-operator quickstart; for staging use 3 observers + 1 OBProxy. Happy to share our values.yaml stripped of secrets.</p>' },
    ],
  },
  'vector-index-43': {
    board: 'oug-help',
    boardLabel: 'OUG Help',
    title: 'Vector index build fails after upgrade to 4.3',
    author: 'dba_sea',
    date: 'Jun 28, 2026',
    tags: ['vector'],
    body: '<p>IVF index rebuild stalls at 78%; observer logs show memory limit on the node. 32GB RAM, 4c.</p>',
    replies: [],
  },
  'mysql-group-by': {
    board: 'oug-help',
    boardLabel: 'OUG Help',
    title: 'MySQL compatibility: GROUP BY behavior difference migration',
    author: 'migrator',
    date: 'Jun 22, 2026',
    tags: ['mysql-mode'],
    body: '<p>Porting from MySQL 8 — queries with <code>ONLY_FULL_GROUP_BY</code> fail on OceanBase with different error text. Anyone mapped the gaps?</p>',
    replies: [
      { author: 'oug_mod', date: 'Jun 23, 2026', body: '<p>See docs on <code>sql_mode</code> parity; we’re tracking a few edge cases in 4.3.1 release notes.</p>' },
    ],
  },
  'about-o4ai-chat': {
    board: 'o4ai-chat',
    boardLabel: 'O4AI Chat',
    title: 'About O4AI Chat',
    author: 'OceanData4AI Team',
    date: 'Jul 1, 2026',
    tags: [],
    pinned: true,
    body: '<p>Vendor-neutral space for AI data infrastructure builders. Jobs go in Jobs; product bugs go in <a href="oug-help.html">OUG Help</a>.</p>',
    replies: [],
  },
  'rag-chunking-2026': {
    board: 'o4ai-chat',
    boardLabel: 'O4AI Chat',
    title: 'Chunking strategies for long-context RAG in 2026',
    author: 'rag_builder',
    date: 'Jul 6, 2026',
    tags: ['rag', 'agents'],
    body: '<p>Semantic vs. fixed windows — what are you shipping in prod? Seeing a lot of debate on 512 vs 1k with overlap.</p>',
    replies: [
      { author: 'fellow_01', date: 'Jul 6, 2026', body: '<p>We use structure-aware chunks (headings) + 128-token overlap. Evals beat fixed 512 for our docs.</p>' },
    ],
  },
  'memory-md-patterns': {
    board: 'o4ai-chat',
    boardLabel: 'O4AI Chat',
    title: 'MEMORY.md patterns that actually scale',
    author: 'agent_ops',
    date: 'Jul 4, 2026',
    tags: ['agent-memory'],
    body: '<p>Beyond stuffing context every turn — hierarchical recall for coding agents. Who has a pattern that doesn’t pollute the window?</p>',
    replies: [],
  },
  'hiring-writer': {
    board: 'o4ai-chat',
    boardLabel: 'O4AI Chat',
    title: 'Hiring: Community writer for hybrid-search tutorials',
    author: 'community_team',
    date: 'Jul 2, 2026',
    tags: ['jobs'],
    body: '<p>Part-time Fellow role — English, hands-on seekdb or vector DB experience. DM via <a href="../join.html">Join</a> form.</p>',
    replies: [],
  },
  'cli-vs-mcp': {
    board: 'o4ai-chat',
    boardLabel: 'O4AI Chat',
    title: 'CLI vs MCP for database agents — community poll',
    author: 'tooling_fan',
    date: 'Jun 25, 2026',
    tags: ['mcp'],
    body: '<p>Which interface do you standardize on for tool-calling LLMs? CLI wrappers feel simpler; MCP gives schema discovery.</p>',
    replies: [
      { author: 'harry_z', date: 'Jun 26, 2026', body: '<p>MCP for discovery + narrow CLI for hot paths. Both linked in our latest tutorial on the blog.</p>' },
      { author: 'rag_builder', date: 'Jun 27, 2026', body: '<p>+1 MCP for multi-tool agents. CLI when you need shell ergonomics for ops.</p>' },
    ],
  },
};
