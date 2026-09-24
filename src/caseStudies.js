// Case study content. Empty strings/arrays are hidden on the page, so fill sections in as you write them.
// Images go in public/case-studies/<slug>/ and are referenced relative to public/ (e.g. 'case-studies/credible-atlas/architecture.png').
export const caseStudies = {
  'credible-atlas': {
    name: 'Credible Atlas',
    category: 'Capstone · AI analytics',
    tagline: 'A conversational analytics platform that helps people explore datasets through natural language and share visualizations and data stories.',
    award: '2nd Place · University capstone expo',
    facts: [
      { label: 'Role', value: 'Software Developer — backend & AI workflow lead' },
      { label: 'Timeline', value: 'Sep 2025 — Apr 2026' },
      { label: 'Context', value: 'CU Boulder capstone with Credible' },
      { label: 'Stack', value: 'Node.js · React · Claude Agent SDK · MCP · Auth0 · PostgreSQL · BigQuery · GCP' }
    ],
    // Top-of-page media. A looping demo: { video: 'case-studies/credible-atlas/demo.mp4', poster: 'projects/credible-atlas.webp', alt: 'What the demo shows', caption: '' }
    // Or an image: { src: 'case-studies/credible-atlas/hero.png', alt: '…' }
    cover: null,
    sections: [
      { id: 'overview', title: 'Overview', body: [
        'Credible Atlas lets people ask questions about their data in plain language, then turns the answers into visualizations and data stories they can share.',
        'I led the Node.js backend and AI workflow, connecting semantic context, secure tool execution, and automated visualization, and helped architect and deploy the full-stack system on GCP.'
      ] },
      // Who was stuck, on what, and why existing tools didn't solve it.
      { id: 'problem', title: 'The problem', body: [] },
      { id: 'role', title: 'My role', list: [
        'Led the Node.js backend and the AI workflow.',
        'Integrated MCP servers and the Claude Agent SDK for secure tool execution.',
        'Implemented authentication with Auth0.',
        'Helped architect and deploy the full-stack system on GCP.'
      ] },
      // Architecture diagram plus a short walkthrough of how a question becomes a chart.
      { id: 'architecture', title: 'Architecture', image: null /* { src: 'case-studies/credible-atlas/architecture.png', alt: 'Describe the diagram for screen readers' } */, caption: '', body: [] },
      // Ordered steps, e.g. { title: 'Question in', text: '…' }
      { id: 'flow', title: 'How a question becomes a chart', steps: [] },
      // Trade-offs you made: { title: 'Why MCP for tool access', text: '…' }
      { id: 'decisions', title: 'Key decisions', cards: [] },
      { id: 'results', title: 'Results', body: ['Credible Atlas was awarded 2nd Place at the university capstone expo.'] },
      { id: 'learned', title: 'What I learned', body: [] }
    ],
    links: [
      { label: 'Explore Atlas', url: 'https://community.credibledata.com/atlas/' },
      { label: 'Read the project story', url: 'https://www.credibledata.com/blog/posts/building-atlas' }
    ]
  }
};
