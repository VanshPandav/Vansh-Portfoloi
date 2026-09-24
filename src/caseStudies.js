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
    cover: { video: 'case-studies/credible-atlas/demo.mp4', alt: 'Credible Atlas product demo', caption: 'Watch Credible Atlas in action.' },
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
      { id: 'architecture', title: 'Architecture', image: { src: 'case-studies/credible-atlas/architecture.png', alt: 'Atlas architecture: React and Auth0 connect through a Cloud Run reverse proxy to an Express API and PostgreSQL on a GCP virtual machine. The API integrates Claude, semantic and MCP services, BigQuery, and Neo4j, with GitHub Actions supporting deployment.', fullSize: true }, caption: 'Atlas development architecture. Open the diagram at full resolution to inspect the service connections.', body: [
        'The React client uses Auth0 for authentication and connects through an nginx reverse proxy on Cloud Run to the Express API. The backend and PostgreSQL run in Docker Compose on a GCP virtual machine.',
        'The API connects to the Claude Agent SDK, Credible Semantic API, and MCP services, while BigQuery supports data queries. Chat responses stream back to the client through server-sent events.',
        'A background worker processes the PostgreSQL graph outbox and writes updates to Neo4j. GitHub Actions supports deployment through Artifact Registry, Cloud Run, and the virtual machine.'
      ] },
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

// Additional studies use the same reusable page layout.
caseStudies["neurofit-ai"] = {
  "name": "NeuroFit.AI",
  "category": "Personal project · Agentic AI",
  "tagline": "Exploring how specialized agents and retrieved context can support a conversational wellness experience.",
  "facts": [
    {
      "label": "Role",
      "value": "Agent workflows & application development"
    },
    {
      "label": "Context",
      "value": "Personal project"
    },
    {
      "label": "Focus",
      "value": "Routing · Retrieval · Session persistence"
    },
    {
      "label": "Stack",
      "value": "Python · LangFlow · AstraDB · Streamlit"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Overview",
      "body": [
        "NeuroFit.AI is an AI-assisted wellness application that routes questions through specialized agents and retrieves relevant context. The project brings these components together in a Streamlit interface for exploring context-aware conversations."
      ]
    },
    {
      "id": "problem",
      "title": "The problem",
      "body": [
        "The project explores a practical question: how can a conversational application connect a user’s question with a suitable agent and useful supporting information? Answering that question involves both the AI workflow and the application that manages the conversation."
      ]
    },
    {
      "id": "role",
      "title": "My contribution",
      "list": [
        "Built multi-agent routing to direct questions through specialized agents.",
        "Integrated retrieval with AstraDB to supply relevant context.",
        "Developed a Streamlit interface with session persistence.",
        "Implemented asynchronous query execution."
      ]
    },
    {
      "id": "architecture",
      "title": "System components",
      "cards": [
        {
          "title": "Conversation interface",
          "text": "Streamlit provides the user-facing application, with session persistence supporting the conversation experience."
        },
        {
          "title": "Agent workflows",
          "text": "Python and LangFlow support the multi-agent routing workflow."
        },
        {
          "title": "Context retrieval",
          "text": "AstraDB provides the retrieval component used to bring relevant context into the workflow."
        },
        {
          "title": "Query execution",
          "text": "Asynchronous execution supports processing queries within the application."
        }
      ]
    },
    {
      "id": "results",
      "title": "Outcome",
      "body": [
        "The result was a working interface for evaluating context-aware agent workflows. The project combines routing, retrieval, and session handling into an application where those pieces can be explored together."
      ]
    }
  ],
  "links": [
    {
      "label": "View on GitHub",
      "url": "https://github.com/VanshPandav/NueroFitAI"
    }
  ]
};
caseStudies["course-recommender"] = {
  "name": "Graph-Driven Course Recommender",
  "category": "University project · Graph data",
  "tagline": "Connecting learners and courses through a graph-based recommendation application.",
  "facts": [
    {
      "label": "Role",
      "value": "Frontend, APIs & graph modeling"
    },
    {
      "label": "Context",
      "value": "CU Boulder university project"
    },
    {
      "label": "Data model",
      "value": "Over 1,000 Neo4j nodes"
    },
    {
      "label": "Stack",
      "value": "React · Node.js · Express · Neo4j · Cypher · OAuth 2.0"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Overview",
      "body": [
        "The course recommender is a personalized application built around relationships between learners and courses. It combines React user flows, Node.js APIs, and a Neo4j graph model to explore course recommendations."
      ]
    },
    {
      "id": "problem",
      "title": "The problem",
      "body": [
        "Course discovery is a useful setting for exploring connected data: the relationship between a learner and a course matters alongside the course itself. This university project used a graph-based approach to model those connections within a full-stack application."
      ]
    },
    {
      "id": "role",
      "title": "My contribution",
      "list": [
        "Developed React user flows for the application.",
        "Built Node.js APIs with OAuth 2.0 authentication.",
        "Modeled over 1,000 nodes in Neo4j.",
        "Configured deployment components and helped present the project to CU’s Office of Information Technology."
      ]
    },
    {
      "id": "architecture",
      "title": "System components",
      "cards": [
        {
          "title": "React frontend",
          "text": "The frontend provides the application’s learner-facing user flows."
        },
        {
          "title": "Node.js APIs",
          "text": "The backend connects the interface to application services, with Express and OAuth 2.0 in the stack."
        },
        {
          "title": "Neo4j graph",
          "text": "The data model represents learner and course relationships across more than 1,000 nodes, using Neo4j and Cypher."
        },
        {
          "title": "Deployment",
          "text": "Deployment components support running the frontend and backend as a connected application."
        }
      ]
    },
    {
      "id": "results",
      "title": "Outcome",
      "body": [
        "The application was presented to CU’s Office of Information Technology and received positive feedback. The project brought together interface development, authenticated APIs, graph modeling, and deployment in a university setting."
      ]
    }
  ],
  "links": [
    {
      "label": "View on GitHub",
      "url": "https://github.com/VanshPandav/Neo4j-Online-Course-Recommendation"
    }
  ]
};
