// Edit the text and links here to update your portfolio. Leave links as [] when unavailable.
export const portfolio = {
  name: 'Vansh Pandav',
  role: 'Software Engineer',
  availability: 'Open to software engineering opportunities anywhere in the US.',
  introduction: 'I build software that makes complex systems easier to use.',
  summary: 'From AI-powered analytics to dependable backend systems, I turn data and workflows into practical, full-stack products.',
  about: 'I’m a recent M.S. Computer Science graduate from the University of Colorado Boulder. I enjoy working from a user’s problem through data models, backend services, and the product interface—turning ambiguous requirements into useful software.',
  email: 'vanshpandav@gmail.com',
  // Add a verified Formspree endpoint to enable direct message submission.
  contactFormEndpoint: 'https://formspree.io/f/xjykoadw',
  linkedin: 'https://www.linkedin.com/in/vansh-pandav/',
  github: 'https://github.com/VanshPandav',
  resume: 'assets/Vansh_Pandav.pdf',
  booking: {
    url: 'https://calendar.app.google/8hqccj3UyMCVfnnG8',
    embedUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1T3PziGBL6-bSVL6AqvEFI9Oo-wbuBFbsYVSNzpKFYO5RYUW-ohLvmtVpHBwAIGQKiFdPKHBNw?gv=true'
  },
  projects: [
    {name: 'Credible Atlas', image: 'projects/credible-atlas.webp', category: 'CAPSTONE · AI ANALYTICS', description: 'A conversational analytics platform that helps people explore datasets through natural language and share visualizations and data stories.', contribution: 'Led the Node.js backend and AI workflow, integrating MCP servers, the Claude Agent SDK, and Auth0. Helped architect and deploy the full-stack system on GCP.', tools: ['Node.js', 'React', 'Claude Agent SDK', 'MCP', 'PostgreSQL', 'BigQuery', 'GCP'], outcome: 'Awarded 2nd Place at the university capstone expo.', caseStudy: 'credible-atlas.html', links: [{label: 'Explore Atlas', url: 'https://community.credibledata.com/atlas/'}, {label: 'Read the project story', url: 'https://www.credibledata.com/blog/posts/building-atlas'}]},
    {name: 'NeuroFit.AI', caseStudy: 'neurofit-ai.html', image: 'projects/neurofit-ai.webp', category: 'PERSONAL PROJECT · AI FITNESS', description: 'A fitness-assistant prototype that brings profile information and saved notes into LangFlow-backed question and macro workflows.', contribution: 'Built the Streamlit interface, integrated AstraDB profile and note storage, and connected Python request helpers to dedicated LangFlow endpoints.', tools: ['Python', 'LangFlow', 'AstraDB', 'Streamlit'], outcome: 'Connected persistent personal context with two AI-assisted workflows in one application.', links: [{label: 'View on GitHub', url: 'https://github.com/VanshPandav/NueroFitAI'}]},
    {name: 'Graph-Driven Course Recommender', caseStudy: 'course-recommender.html', image: 'projects/graph-driven-course-recommender.webp', category: 'UNIVERSITY PROJECT · GRAPH DATA', description: 'A graph-based course discovery application that uses learner enrollment and completion relationships to suggest new courses.', contribution: 'Developed React user flows and Node.js APIs with JWT authentication, modeled over 1,000 Neo4j nodes, and configured deployment components.', tools: ['React', 'Node.js', 'Express', 'Neo4j', 'Cypher', 'JWT'], outcome: 'Presented to CU’s Office of Information Technology and received positive feedback.', links: [{label: 'View on GitHub', url: 'https://github.com/VanshPandav/Neo4j-Online-Course-Recommendation'}]},
    {name: 'Fraud Detection Visual Analytics', image: 'projects/fraud-detection-visual-analytics.webp', category: 'DATA VISUALIZATION', description: 'An interactive dashboard for exploring credit-card fraud patterns and comparing machine-learning models.', contribution: 'Created Streamlit visual workflows for inspecting class imbalance, transactions, and risk patterns.', tools: ['Python', 'Streamlit', 'Machine learning'], outcome: 'Made transaction patterns and model comparisons accessible through an interactive interface.', links: [{label: 'View team repository', url: 'https://github.com/Awaghela/Intelligent-Fraud-Detection-in-Finance-A-Machine-Learning-and-Big-Data-Perspective'}]},
    {name: 'MindIt Therapy', image: 'projects/mindit-therapy.webp', category: 'PERSONAL PROJECT · FULL STACK', description: 'A therapy-assistance platform exploring structured digital support experiences.', contribution: 'Developed backend routes, authentication, and real-time communication workflows.', tools: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'WebSockets'], outcome: 'Strengthened practical experience in API design, data flow, and full-stack integration.', links: []},
    {name: 'IndicVerse', image: 'projects/indicverse.webp', category: 'TEAM PROJECT · IMMERSIVE LEARNING', description: 'An interactive reconstruction of the Indus Valley Civilization combining 3D environments and historical storytelling.', contribution: 'Co-created interactive elements and contributed to the technical and experiential design.', tools: ['Unity', 'OpenGL', 'VR / 3D'], outcome: 'A copyright was filed for the project.', links: []},
    {name: 'AI Data Chatbot', image: 'projects/ai-data-chatbot.webp', category: 'DATA EXPLORATION', description: 'A chatbot concept that maps natural-language questions to operations over a dataset.', contribution: 'Worked on translating questions into structured data operations and simplifying dataset interactions.', tools: ['Natural-language interfaces', 'Dataset operations'], outcome: 'Explored how conversational interfaces can make data exploration more approachable.', links: []}
  ],
  experience: [
    {company: 'Credible · CU Boulder Capstone', role: 'Software Developer', dates: 'Sep 2025 — Apr 2026', text: 'Led backend and AI workflow development for Credible Atlas, connecting semantic context, secure tool execution, and automated visualization. The project earned 2nd Place at the university capstone expo.', tools: 'Node.js · MCP · Claude Agent SDK · Auth0 · GCP'},
    {company: 'CU Conference Services', role: 'Data Analyst Intern', dates: 'Apr 2025 — Apr 2026', text: 'Built financial forecasting and reporting workflows for university conference operations. Managed Stova registration and abstract-submission platforms, working with non-technical staff to turn operational needs into usable analysis.', tools: 'Python · Pandas · Streamlit · Stova'},
    {company: 'Schneider Electric', role: 'Software Development Intern', dates: 'Jun 2023 — Jul 2023', text: 'Developed ASP.NET reporting features for building-management workflows. Worked with SCADA data and SQL Server validation and reporting in the context of infrastructure projects including Riyadh Metro and Etihad Rail.', tools: 'C# · ASP.NET · SQL Server · SCADA / BMS'},
    {company: 'Polyvault Shelters', role: 'Software Development Intern', dates: 'Jul 2021 — Aug 2021', text: 'Developed and hosted an e-commerce website with product listings and payment processing, supporting the customer purchase journey.', tools: 'Web development · E-commerce · Payment processing', url: 'https://www.polyvaultauto.com/'}
  ],
  // Keep this short for a spacious cloud. The full list remains below.
  cloudSkills: ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'React', 'Node.js', 'Express', 'FastAPI', 'ASP.NET', 'Claude Agent SDK', 'MCP', 'RAG', 'LangChain', 'PostgreSQL', 'Neo4j', 'BigQuery', 'GCP', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
  skills: [
    {name: 'Languages', items: 'Python, JavaScript, Java, C++, C#, SQL'},
    {name: 'Application engineering', items: 'React, Node.js, Express, FastAPI, ASP.NET, REST APIs, OAuth 2.0, WebSockets'},
    {name: 'AI & data', items: 'Claude Agent SDK, MCP, Malloy, RAG, LangFlow, LangChain, PostgreSQL, Neo4j, BigQuery, SQL Server'},
    {name: 'Cloud & delivery', items: 'GCP, AWS, Docker, Kubernetes, CI/CD, Git'}
  ],
  education: ['M.S. Computer Science · University of Colorado Boulder · 2024–2026 · GPA 3.7', 'B.Tech. Computer Science · K.J. Somaiya College of Engineering · 2020–2024 · GPA 3.6']
};
