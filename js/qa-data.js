window.OCEANDATA4AI_QA_TOPICS = {
  'about-oug-discussion': {
    board: 'oug-help',
    boardLabel: 'Ask OUG',
    title: 'About Ask OUG',
    author: 'OceanData4AI Team',
    date: 'Jul 1, 2026',
    tags: [],
    pinned: true,
    body: `<p>This is the community space for open discussion, troubleshooting, and guidance on OceanBase, seekdb, and AI data infrastructure.</p>
<ul>
<li>Search existing topics before posting</li>
<li>Include version, OS, and minimal repro steps for technical questions</li>
<li>English preferred; community moderators target first response within 2 business days</li>
</ul>`,
    replies: [],
  },
  'seekdb-hybrid-empty': {
    board: 'oug-help',
    boardLabel: 'Ask OUG',
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
    boardLabel: 'Ask OUG',
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
    boardLabel: 'Ask OUG',
    title: 'Vector index build fails after upgrade to 4.3',
    author: 'dba_sea',
    date: 'Jun 28, 2026',
    tags: ['vector'],
    body: '<p>IVF index rebuild stalls at 78%; observer logs show memory limit on the node. 32GB RAM, 4c.</p>',
    replies: [],
  },
  'mysql-group-by': {
    board: 'oug-help',
    boardLabel: 'Ask OUG',
    title: 'MySQL compatibility: GROUP BY behavior difference migration',
    author: 'migrator',
    date: 'Jun 22, 2026',
    tags: ['mysql-mode'],
    body: '<p>Porting from MySQL 8 — queries with <code>ONLY_FULL_GROUP_BY</code> fail on OceanBase with different error text. Anyone mapped the gaps?</p>',
    replies: [
      { author: 'oug_mod', date: 'Jun 23, 2026', body: '<p>See docs on <code>sql_mode</code> parity; we’re tracking a few edge cases in 4.3.1 release notes.</p>' },
    ],
  },
};
