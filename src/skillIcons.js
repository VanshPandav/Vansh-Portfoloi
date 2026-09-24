import { SiPython, SiJavascript, SiOpenjdk, SiCplusplus, SiDotnet, SiReact, SiNodedotjs, SiExpress, SiFastapi, SiClaude, SiModelcontextprotocol, SiLangchain, SiPostgresql, SiGooglebigquery, SiGooglecloud, SiDocker, SiKubernetes, SiGit, SiGithubactions } from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { TbBrandCSharp, TbDatabaseSearch, TbTopologyStar3 } from 'react-icons/tb';

// Brand colors are tuned for the light page: near-white marks use the ink color instead.
// `ink` is the hover label's text color where white would be unreadable on the brand color.
// `dark`/`darkInk` replace near-black marks that would vanish on the dark theme.
export const skillIcons = {
  Python: { icon: SiPython, color: '#3776ab' },
  JavaScript: { icon: SiJavascript, color: '#e0b800', ink: '#183449' },
  Java: { icon: SiOpenjdk, color: '#e76f00' },
  'C++': { icon: SiCplusplus, color: '#00599c' },
  'C#': { icon: TbBrandCSharp, color: '#68217a' },
  React: { icon: SiReact, color: '#149eca' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  Express: { icon: SiExpress, color: '#183449', dark: '#f3eee4', darkInk: '#111' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  'ASP.NET': { icon: SiDotnet, color: '#512bd4' },
  'Claude Agent SDK': { icon: SiClaude, color: '#d97757' },
  MCP: { icon: SiModelcontextprotocol, color: '#183449', dark: '#f3eee4', darkInk: '#111' },
  RAG: { icon: TbDatabaseSearch, color: '#09618d' },
  LangChain: { icon: SiLangchain, color: '#1c3c3c', dark: '#f3eee4', darkInk: '#111' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169e1' },
  Neo4j: { icon: TbTopologyStar3, color: '#018bff' },
  BigQuery: { icon: SiGooglebigquery, color: '#669df6', ink: '#183449' },
  GCP: { icon: SiGooglecloud, color: '#4285f4' },
  AWS: { icon: FaAws, color: '#ff9900', ink: '#183449' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Kubernetes: { icon: SiKubernetes, color: '#326ce5' },
  'CI/CD': { icon: SiGithubactions, color: '#2088ff' },
  Git: { icon: SiGit, color: '#f05032' }
};
