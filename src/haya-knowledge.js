/**
 * Haya grounding layer.
 *
 * Project facts come from the canonical PROJECTS registry in data.js.
 * Haya does not maintain a second copy of project names, metrics, links, or status.
 */
import { PROJECTS, ROLE_PROJECT_IDS, ROLES } from "./data.js";

const ROLE_CAPABILITIES = {
  "ai-engineer": ["RAG", "Agentic workflows", "LLM APIs", "FAISS", "BM25", "Hybrid retrieval", "Cross-encoder reranking", "FastAPI", "PostgreSQL", "Cloudflare Workers", "JavaScript", "React"],
  "ml-engineer": ["Python", "scikit-learn", "Pandas", "NumPy", "SentenceTransformers", "TF-IDF", "Semantic search", "Embeddings", "FastAPI", "Streamlit", "Recall@K", "MRR", "nDCG"],
  "ai-systems": ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "REST APIs", "RAG", "Agentic workflows", "Hybrid retrieval", "Persistence", "Observability", "Supabase", "RLS", "Realtime"],
  "data-science": ["Python", "Pandas", "NumPy", "SQL", "scikit-learn", "TF-IDF", "SentenceTransformers", "Semantic similarity", "NLP", "Streamlit"],
  "data-analyst": ["SQL", "MySQL", "PostgreSQL", "Pandas", "Data cleaning", "Data visualization", "Streamlit", "Interactive dashboards", "Reporting"],
  "web-developer": ["React", "Next.js", "TypeScript", "JavaScript", "FastAPI", "PostgreSQL", "REST APIs", "CSS", "Responsive UI", "Supabase", "Realtime", "AI API integration"]
};

const PROFILE = {
  name: "Eklakh Dewan",
  degree: "B.Tech — Artificial Intelligence & Data Science",
  institution: "KPRIET",
  graduationYear: "2027",
  cgpa: "8.55",
  focus: ["Applied AI engineering", "Retrieval-augmented generation", "AI systems", "Agentic workflows", "Machine learning", "Data and software engineering"],
  targetRoles: Object.values(ROLES).map(role => role.title),
  positioning: "Builds AI systems that retrieve, reason, recommend, and execute, with emphasis on grounding, testing, evaluation, and software engineering around AI.",
  experiencePolicy: "Experience is primarily project-based and academic; do not claim large-scale enterprise production ownership unless explicitly documented.",
  links: {
    portfolio: "https://eklakhdewan.com.np",
    github: "https://github.com/eklakhdewan",
    linkedin: "https://www.linkedin.com/in/eklakhdewan/"
  }
};

const EXPERIENCE = [{
  role: "Artificial Intelligence Intern",
  company: "Flowrage Technology",
  duration: "4 weeks (Virtual)",
  description: "Worked with resume and job-description datasets, reporting, match-rate analysis, REST API work, and integration of AI services."
}];

const INTERVIEW_GROUNDING = {
  principle: "Use portfolio evidence as interview grounding, not as a script. Keep answers conversational and do not extend claims beyond documented project evidence.",
  strengths: ["Systematic problem solving", "Strong interest in AI systems", "Persistence with difficult technical problems", "Testing and evaluation mindset", "Connecting AI/ML with software engineering"],
  developmentArea: "Prioritizing and simplifying: define the smallest high-value scope before expanding implementation.",
  recurringThemes: ["Define the problem before choosing AI.", "Use baselines and measurable evaluation.", "Separate implementation from evidence.", "Make assumptions and interfaces explicit.", "Prefer controlled experiments under compute constraints.", "Do not equate a working demo with validated production results."]
};

const HONESTY_RULES = [
  "Never invent employment, production incidents, metrics, leadership experiences, clients, users, patents, publications, or company experience.",
  "If a question asks for an experience that is not documented, say so and bridge only to the closest documented project experience.",
  "Treat project architecture as documented implementation, not proof of production scale.",
  "Treat metrics as valid only when explicitly present in the canonical project registry.",
  "Do not present targets, plans, or intended capabilities as achieved results.",
  "If the canonical portfolio data does not document an answer, say: 'The available portfolio data does not document that.'"
];

function projectForHaya(project) {
  return {
    name: project.name,
    subtitle: project.subtitle,
    ownership: "Portfolio project",
    repository: project.repo,
    demo: project.demo || null,
    category: project.category,
    status: project.status,
    summary: project.description,
    stack: project.stack,
    architecture: project.architecture,
    engineering: project.engineering,
    evidence: [project.evidence, ...(project.metrics || []).map(metric => "Metric: " + metric)],
    limitations: project.status.includes("Production-oriented")
      ? "The repository documents a production-oriented architecture; do not claim large public scale unless separately documented."
      : "Do not turn documented architecture, prototypes, or evaluation results into claims of enterprise production scale."
  };
}

export const HAYA_KNOWLEDGE = {
  profile: PROFILE,
  experience: EXPERIENCE,
  projects: PROJECTS,
  roleRelevance: ROLE_PROJECT_IDS,
  roleCapabilities: ROLE_CAPABILITIES,
  interviewGrounding: INTERVIEW_GROUNDING,
  honestyRules: HONESTY_RULES
};

export function getHayaKnowledge(roleId = null) {
  const ids = roleId && ROLE_PROJECT_IDS[roleId]
    ? ROLE_PROJECT_IDS[roleId]
    : Object.keys(PROJECTS);

  return {
    profile: PROFILE,
    experience: EXPERIENCE,
    projects: ids.map(id => PROJECTS[id]).filter(Boolean).map(projectForHaya),
    capabilities: roleId ? ROLE_CAPABILITIES[roleId] || [] : Object.values(ROLE_CAPABILITIES).flat().filter((value, index, values) => values.indexOf(value) === index),
    interviewGrounding: INTERVIEW_GROUNDING,
    honestyRules: HONESTY_RULES
  };
}

export function findKnowledgeProject(name) {
  const project = Object.values(PROJECTS).find(item => item.name === name);
  return project ? projectForHaya(project) : null;
}
