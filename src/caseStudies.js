// Case-study content; project claims are based on supplied materials.
export const caseStudies = {
  "credible-atlas": {
    "name": "Credible Atlas",
    "category": "Capstone · AI analytics",
    "tagline": "A conversational analytics platform that helps people explore datasets through natural language and share visualizations and data stories.",
    "award": "2nd Place · University capstone expo",
    "facts": [
      {
        "label": "Role",
        "value": "Software Developer — backend & AI workflow lead"
      },
      {
        "label": "Timeline",
        "value": "Sep 2025 — Apr 2026"
      },
      {
        "label": "Context",
        "value": "CU Boulder capstone with Credible"
      },
      {
        "label": "Stack",
        "value": "React · TypeScript · Node.js · Claude · MCP · Malloy · PostgreSQL · Neo4j · BigQuery · GCP"
      }
    ],
    "cover": {
      "video": "case-studies/credible-atlas/demo.mp4",
      "alt": "Credible Atlas product demo",
      "caption": "Watch Credible Atlas in action."
    },
    "sections": [
      {
        "id": "overview",
        "title": "From a question to a shared insight",
        "navTitle": "Overview",
        "body": [
          "Credible Atlas is a collaborative application for exploring public datasets from Credible Data. Users can discover a dataset, ask questions in natural language, build interactive charts, and publish visualizations or longer data stories for others to explore.",
          "Built as a CU Boulder capstone with Credible, the project connects conversational analytics with a community experience: profiles, follows, comments, likes, and saved visualizations. It earned 2nd Place at the university capstone expo."
        ]
      },
      {
        "id": "problem",
        "title": "The problem",
        "body": [
          "Moving from a dataset to a useful insight involves several steps: finding the right source, understanding its fields, writing a query, choosing a chart, and explaining the result. Atlas brings those steps into a conversational workflow so users can explore data without manually coordinating each tool.",
          "The engineering challenge was to connect natural-language requests to real, structured query results and preserve enough context for follow-up questions. The output also needed to remain useful beyond the chat—as an interactive visualization or a shareable story."
        ]
      },
      {
        "id": "role",
        "title": "My contribution",
        "navTitle": "My role",
        "body": [
          "I led the Node.js backend and AI workflow, integrated MCP services and the Claude Agent SDK, implemented Auth0 authentication, and helped architect and deploy the full-stack system on GCP. The product features below describe the broader team implementation."
        ],
        "list": [
          "Backend services connecting the application, data sources, and AI workflow.",
          "MCP integration and conversational analytics orchestration.",
          "Authentication with Auth0 and integration across the application.",
          "Full-stack architecture and GCP deployment collaboration."
        ]
      },
      {
        "id": "architecture",
        "title": "Architecture",
        "image": {
          "src": "case-studies/credible-atlas/architecture.png",
          "alt": "Atlas architecture: React and Auth0 connect through a Cloud Run reverse proxy to an Express API and PostgreSQL on a GCP virtual machine. The API integrates Claude, semantic and MCP services, BigQuery, and Neo4j, with GitHub Actions supporting deployment.",
          "fullSize": true
        },
        "caption": "Development architecture supplied with the project. Open at full resolution to inspect the connections; the implementation details below reflect the supplied source snapshot.",
        "body": [
          "A React and TypeScript frontend communicates with an Express API through an nginx reverse proxy on Cloud Run. Docker Compose runs the backend and PostgreSQL on a GCP virtual machine. Auth0 supports identity, while authenticated API routes associate conversations and usage with users.",
          "The active chat routes in the supplied source call an Anthropic SDK service that orchestrates Credible MCP tools. A separate Claude Agent SDK integration is also included. Credible’s semantic layer and Malloy queries supply data context and query results; the backend also includes BigQuery routes.",
          "PostgreSQL stores application records, conversations, published content, and usage. A graph outbox and background worker synchronize supported nodes and relationships to Neo4j. This separates graph updates from the immediate application workflow."
        ],
        "navTitle": "Architecture"
      },
      {
        "id": "flow",
        "title": "How a question becomes a chart",
        "navTitle": "AI workflow",
        "steps": [
          {
            "title": "Start with a dataset and a question",
            "text": "The chat request carries the user’s message, conversation history, and available dataset context. Authentication and usage checks happen before the agent runs."
          },
          {
            "title": "Discover the semantic context",
            "text": "The get_context tool discovers sources and then drills into their fields and measures. The prompt instructs the model to use the returned environment, package, and model path instead of inventing source identifiers."
          },
          {
            "title": "Execute a data query",
            "text": "The agent calls execute_query with a Malloy query and chart metadata, including the chart type, axes, and suggested title. The service transforms the MCP result into structured data for the application."
          },
          {
            "title": "Stream progress and render the result",
            "text": "Server-sent events carry tool activity and responses back to the client. The chart renderer supports formats including bars, lines, scatter plots, heatmaps, and treemaps."
          },
          {
            "title": "Refine and share",
            "text": "Stored query context supports follow-up questions. Users can refine the analysis, adjust chart styling, and turn results into published visualizations or stories."
          }
        ]
      },
      {
        "id": "decisions",
        "title": "Engineering choices and tradeoffs",
        "cards": [
          {
            "title": "Discover schema before querying",
            "text": "The tool workflow separates source discovery from query execution. This adds a discovery step but gives the model concrete field names and source identifiers to work with. Existing query context can be reused for follow-ups."
          },
          {
            "title": "Separate presentation from data",
            "text": "A dedicated chart-style tool handles presentation changes without rerunning the data query. Structured chart metadata connects the agent’s output to the frontend renderer."
          },
          {
            "title": "Keep long-running work visible",
            "text": "Streaming tool activity and responses gives the interface progress updates while the backend coordinates model and data-service calls. This requires the client and proxy to support an open event stream."
          },
          {
            "title": "Synchronize the graph in the background",
            "text": "The outbox worker claims pending events and applies Neo4j updates. It pauses when graph connectivity is unavailable. The tradeoff is that graph state can lag behind the relational application data."
          }
        ]
      },
      {
        "id": "product",
        "title": "Beyond the chat",
        "cards": [
          {
            "title": "Dataset discovery",
            "text": "Dataset exploration and search help users find a starting point for analysis. The backend includes package synchronization, dataset summaries, and access to live data tables."
          },
          {
            "title": "Published visualizations",
            "text": "Chart results become reusable content with detail pages and community interactions, including comments, likes, and saves."
          },
          {
            "title": "Data stories",
            "text": "A block-based editor combines narrative and charts. Stories have a publishing flow and a dedicated reader page so an analysis can be shared with its explanation."
          },
          {
            "title": "Community and profiles",
            "text": "Profiles, follows, feeds, and discussion connect individual analyses to a broader discovery experience."
          }
        ]
      },
      {
        "id": "delivery",
        "title": "Deployment and validation",
        "body": [
          "Separate development and production GitHub Actions workflows validate configuration, authenticate to GCP using workload identity, build container images, and publish them to Artifact Registry. They deploy the frontend to Cloud Run and update the backend VM through IAP, followed by frontend and API-proxy smoke checks.",
          "The repository includes server unit and integration tests, frontend service and hook tests, and a Playwright end-to-end workflow. CI is configured to build the frontend, check backend syntax, and run client and server tests. These are implemented validation workflows; the source archive alone does not establish their latest results."
        ]
      },
      {
        "id": "constraints",
        "title": "Operational considerations",
        "body": [
          "AI calls are bounded by a maximum number of tool turns, and the backend records request and token usage. Middleware checks daily request and monthly token allowances. The current limit check fails open if its own service errors, favoring availability over strict cost enforcement during that failure.",
          "The model is instructed to ground charts in successful query results and acknowledge results it cannot chart. These instructions guide behavior; they do not guarantee analytical correctness. Schema discovery, result transformation, and clear error handling remain important parts of the system."
        ]
      },
      {
        "id": "results",
        "title": "Outcome",
        "navTitle": "Results",
        "body": [
          "Credible Atlas earned 2nd Place at the university capstone expo. The implementation brings dataset discovery, conversational querying, interactive visualization, and publishing into one product.",
          "My work focused on connecting the backend and AI workflow to the rest of that experience, alongside the team’s work across the frontend, product, and data platform."
        ]
      }
    ],
    "links": [
      {
        "label": "Explore Atlas",
        "url": "https://community.credibledata.com/atlas/"
      },
      {
        "label": "Read the project story",
        "url": "https://www.credibledata.com/blog/posts/building-atlas"
      }
    ]
  },
  "neurofit-ai": {
    "name": "NeuroFit.AI",
    "category": "Personal project · AI fitness assistant",
    "tagline": "Bringing profile information, saved notes, and AI fitness workflows into one Streamlit application.",
    "facts": [
      {
        "label": "Role",
        "value": "Python application & AI workflow integration"
      },
      {
        "label": "Context",
        "value": "Personal project · Prototype"
      },
      {
        "label": "Focus",
        "value": "Profile context · Persistent notes · LangFlow integration"
      },
      {
        "label": "Stack",
        "value": "Python · Streamlit · LangFlow · AstraDB · Requests"
      }
    ],
    "sections": [
      {
        "id": "overview",
        "title": "An assistant with personal context",
        "navTitle": "Overview",
        "body": [
          "NeuroFit.AI is a fitness-assistant prototype with three workflows: asking fitness questions, requesting macro suggestions for a goal, and managing personal notes. A shared sidebar collects profile information, while AstraDB stores profiles and notes across visits.",
          "The project explores how an application can give an AI workflow useful context about the person asking a question. The Python interface assembles that context and sends it to externally configured LangFlow workflows."
        ]
      },
      {
        "id": "problem",
        "title": "The problem",
        "body": [
          "A fitness question can depend on information that is easy to lose between interactions: a person’s profile, goals, and previous notes. Re-entering that background for every question makes the experience repetitive.",
          "This prototype brings profile inputs and persistent notes alongside the question. It also separates general fitness questions from goal-based macro requests so each has a dedicated interface and flow configuration."
        ]
      },
      {
        "id": "role",
        "title": "My contribution",
        "navTitle": "My role",
        "list": [
          "Built the Streamlit interface with profile inputs and separate Ask AI, Get Macros, and Notes tabs.",
          "Connected Python request helpers to LangFlow endpoints for the two AI workflows.",
          "Integrated AstraDB profile and note storage, including note creation, retrieval, and deletion.",
          "Assembled saved notes into question context and added structured display handling for macro responses."
        ]
      },
      {
        "id": "architecture",
        "title": "Application architecture",
        "navTitle": "Architecture",
        "cards": [
          {
            "title": "Streamlit interface",
            "text": "The main application collects name, age, weight, and height. Button actions save the profile, run an AI request, or update notes, with spinners providing feedback while requests run."
          },
          {
            "title": "Persistent data",
            "text": "AstraDB stores personal_data and NOTES collections. The active interface saves profiles by name and fetches notes associated with that profile, sorted newest first."
          },
          {
            "title": "LangFlow adapter",
            "text": "The AI module maps profile and question or goal inputs into flow-component tweaks, sends an HTTP POST, and extracts text from the nested LangFlow response."
          },
          {
            "title": "Configuration",
            "text": "Database credentials and local flow identifiers are read from environment variables. The supplied version selects local LangFlow endpoints by default and also includes a cloud request branch."
          }
        ]
      },
      {
        "id": "flow",
        "title": "From saved context to an answer",
        "navTitle": "Workflow",
        "steps": [
          {
            "title": "Enter a profile",
            "text": "The visitor fills in the sidebar. Saving writes the profile to AstraDB with an updated timestamp. AI calls receive a profile string assembled from the current inputs."
          },
          {
            "title": "Capture useful notes",
            "text": "The Notes tab saves text with a profile name and creation time. Visitors can review or delete saved notes."
          },
          {
            "title": "Assemble the question context",
            "text": "For Ask AI, the app retrieves that profile’s saved notes, combines them with the question, and passes both the enriched question and profile to the configured flow."
          },
          {
            "title": "Call the external workflow",
            "text": "The request helper submits component inputs to LangFlow. This version waits synchronously for the response and returns either the output text or an API/parsing error message."
          },
          {
            "title": "Present the response",
            "text": "The question tab displays the returned answer. The macro tab uses its separate goal-based flow, attempts to parse JSON, and presents dictionary values as nutrient metrics when possible."
          }
        ]
      },
      {
        "id": "decisions",
        "title": "Implementation choices",
        "cards": [
          {
            "title": "Keep context explicit",
            "text": "The active note lookup filters by profile name and includes the saved notes in the prompt. This is straightforward to inspect, though it does not rank notes for relevance or bound their combined length."
          },
          {
            "title": "Separate the two AI tasks",
            "text": "Questions and macro goals have different flow identifiers and input mappings. The application can integrate each workflow without putting its model configuration in the UI code."
          },
          {
            "title": "Use one request adapter",
            "text": "A shared function handles HTTP submission and response extraction for both tasks. The adapter is coupled to LangFlow’s nested response structure and component identifiers."
          },
          {
            "title": "Persist data beyond the UI",
            "text": "Profiles and notes live in AstraDB, while Streamlit caches the database connection. Persistent records and the current sidebar inputs serve different purposes; the main interface does not automatically restore saved profile fields."
          }
        ]
      },
      {
        "id": "scope",
        "title": "Prototype scope and next steps",
        "body": [
          "The supplied archive contains the Python application and integration helpers, but no exported LangFlow graphs. It establishes how the app calls those flows, not their internal agents, prompts, or routing. A separate note helper includes a vectorization field, while the active question path uses profile-filtered retrieval rather than vector similarity search.",
          "Next steps would include authenticated user IDs instead of names for record ownership, stricter validation of profile and macro fields, request timeouts, and bounded retrieval as note histories grow. Exported flow definitions and integration tests would make the AI behavior easier to reproduce and evaluate."
        ]
      },
      {
        "id": "results",
        "title": "Outcome",
        "navTitle": "Outcome",
        "body": [
          "The implementation connects a profile-aware Streamlit interface, persistent notes, and two LangFlow-backed AI request paths. It demonstrates the application integration needed to carry personal context into an AI workflow and present the result in a usable interface.",
          "The project remains a prototype. The archive does not include evaluation results or test coverage establishing the quality of its generated fitness and macro suggestions."
        ]
      }
    ],
    "links": [
      {
        "label": "View on GitHub",
        "url": "https://github.com/VanshPandav/NueroFitAI"
      }
    ]
  },
  "course-recommender": {
    "name": "Graph-Driven Course Recommender",
    "category": "University project · Graph data",
    "tagline": "Exploring course discovery through learner relationships, enrollment history, and a Neo4j-backed application.",
    "facts": [
      {
        "label": "Role",
        "value": "React user flows · Node.js APIs · Graph modeling"
      },
      {
        "label": "Context",
        "value": "CU Boulder university project"
      },
      {
        "label": "Project scale",
        "value": "Over 1,000 Neo4j nodes"
      },
      {
        "label": "Stack",
        "value": "React · Node.js · Express · Neo4j · Cypher · JWT · GCP"
      }
    ],
    "sections": [
      {
        "id": "overview",
        "title": "Course discovery through connected data",
        "navTitle": "Overview",
        "body": [
          "This university project explores how a graph database can connect learners with courses. A React interface separates currently enrolled courses, completed courses, and recommendations, backed by Node.js APIs and Cypher queries in Neo4j.",
          "My project work included React user flows, backend APIs, graph modeling across more than 1,000 nodes, and deployment components. The project was presented to CU’s Office of Information Technology and received positive feedback."
        ]
      },
      {
        "id": "problem",
        "title": "The problem",
        "body": [
          "A course catalog lists what is available, but discovery also depends on what a learner has already taken. The project brings that history into the application and uses graph relationships to identify courses outside the learner’s existing enrollments and completions.",
          "The implementation is a recommendation baseline: it retrieves candidate courses through other students’ relationships and excludes courses already associated with the current learner. It does not implement similarity scoring or a ranked learning-path model."
        ]
      },
      {
        "id": "role",
        "title": "My contribution",
        "navTitle": "My role",
        "list": [
          "Developed React user flows for course discovery and profile interactions.",
          "Built Node.js APIs connecting the interface to the graph database.",
          "Modeled learner and course data across more than 1,000 Neo4j nodes.",
          "Configured deployment components and contributed to the university presentation."
        ]
      },
      {
        "id": "architecture",
        "title": "Application architecture",
        "navTitle": "Architecture",
        "cards": [
          {
            "title": "React frontend",
            "text": "Pages cover sign-up, login, profile editing, password recovery, and course discovery. The home view requests enrolled, completed, and recommended courses separately."
          },
          {
            "title": "Express API",
            "text": "Routes, controllers, and models separate HTTP handling from graph queries. Course and topic APIs include create, read, update, and delete operations."
          },
          {
            "title": "Identity and access",
            "text": "The source uses email/password authentication with bcrypt and JWT-based middleware. Protected handlers read the authenticated user’s email when requesting learner-specific course data."
          },
          {
            "title": "Neo4j graph",
            "text": "Student and Course nodes are connected through enrollment and completion relationships. Topic records and profile preferences are also represented in the backend, though the recommendation query does not use topic preferences to rank results."
          }
        ]
      },
      {
        "id": "flow",
        "title": "How recommendations are retrieved",
        "navTitle": "Query flow",
        "steps": [
          {
            "title": "Identify the learner",
            "text": "The protected recommendation endpoint obtains the student’s email from the authenticated request."
          },
          {
            "title": "Find existing course relationships",
            "text": "The query first matches the student to at least one course through ENROLLEDIN or COMPLETED_IN. In this implementation, a learner without either relationship receives no candidates from this query."
          },
          {
            "title": "Gather candidates from other students",
            "text": "A second match finds courses connected to other students through enrollment or completion. It does not require those students to share a course with the current learner."
          },
          {
            "title": "Exclude known courses",
            "text": "A negative relationship check removes courses the learner has already enrolled in or completed. DISTINCT removes duplicate candidates, and LIMIT caps the result at five."
          },
          {
            "title": "Return course details",
            "text": "The API returns course properties to the interface. There is no ORDER BY or similarity score in the query, so the five results are candidates rather than a relevance-ranked list."
          }
        ]
      },
      {
        "id": "decisions",
        "title": "Implementation choices",
        "cards": [
          {
            "title": "Represent course history as relationships",
            "text": "Enrollment and completion become graph edges that can be traversed and checked directly in Cypher. This makes the exclusion rule visible in the query."
          },
          {
            "title": "Keep query logic in the model layer",
            "text": "Controllers handle requests and responses while model functions manage Neo4j sessions and parameterized queries. Sessions are closed after operations."
          },
          {
            "title": "Make the first recommendation rule inspectable",
            "text": "Candidate selection is expressed as a short graph query rather than a trained model. The logic is easy to inspect, but has no relevance ranking or cold-start fallback."
          },
          {
            "title": "Separate frontend and backend deployment",
            "text": "The archive includes a Compute Engine provisioning script and separate frontend/backend setup scripts. The provisioning code targets two frontend VMs and one backend VM; it does not establish a load-balanced production deployment."
          }
        ]
      },
      {
        "id": "scope",
        "title": "Prototype boundaries and next steps",
        "body": [
          "The source snapshot leaves some integration work visible. The enrollment write path uses enrolledIn, while read and recommendation queries expect ENROLLEDIN. Standardizing relationship names and testing enrollment-to-recommendation behavior would be an important next step.",
          "Recommendation quality could be developed further with shared-course similarity, topic preferences, explicit ranking, and a fallback for new learners. Those are extensions to the supplied baseline, not features already demonstrated by this query.",
          "Deployment also needs reproducible configuration: the Python provisioning script references a startup script absent from the archive, and frontend code includes local API URLs. Centralized environment configuration and end-to-end tests would help validate the complete deployed workflow."
        ]
      },
      {
        "id": "results",
        "title": "Outcome",
        "navTitle": "Outcome",
        "body": [
          "The project combined React interfaces, authenticated Node.js APIs, graph modeling, and cloud deployment components in a university setting. It was presented to CU’s Office of Information Technology and received positive feedback.",
          "The source provides a concrete baseline for graph-based course discovery. The supplied archive does not establish measured recommendation accuracy, production traffic, or deployment reliability."
        ]
      }
    ],
    "links": [
      {
        "label": "View on GitHub",
        "url": "https://github.com/VanshPandav/Neo4j-Online-Course-Recommendation"
      }
    ]
  }
};
