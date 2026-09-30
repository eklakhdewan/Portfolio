/**
 * Haya canonical candidate knowledge.
 *
 * This is the factual grounding layer for Haya.
 * Keep it limited to current, verified portfolio evidence.
 * Do not add HCAD-RAG or other retired/unsupported projects here.
 */

export const HAYA_KNOWLEDGE = {
  profile: {
    name: "Eklakh Dewan",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "KPRIET",
    graduationYear: "2027",
    cgpa: "8.55",
    focus: [
      "Applied AI engineering",
      "Retrieval-augmented generation",
      "AI systems",
      "Agentic workflows",
      "Machine learning",
      "Data and software engineering"
    ],
    targetRoles: [
      "AI Engineer",
      "ML Engineer",
      "AI Systems Engineer",
      "Data Scientist",
      "Data Analyst",
      "Web Developer"
    ],
    positioning:
      "Builds AI systems that retrieve, reason, recommend, and execute, with emphasis on grounding, testing, evaluation, and software engineering around AI.",
    experiencePolicy:
      "Experience is primarily project-based and academic; do not claim large-scale enterprise production ownership unless explicitly documented.",
    links: {
      portfolio: "https://eklakhdewan.com.np",
      github: "https://github.com/eklakhdewan",
      linkedin: "https://www.linkedin.com/in/eklakhdewan/"
    }
  },

  experience: [
    {
      role: "Artificial Intelligence Intern",
      company: "Flowrage Technology",
      duration: "4 weeks (Virtual)",
      description:
        "Worked with resume and job-description datasets, reporting, match-rate analysis, REST API work, and integration of AI services."
    }
  ],

  projects: {
    "TaxTrace": {
      name: "TaxTrace",
      ownership: "Solo project",
      repository: "https://github.com/Eklakh-AI-Engineer/TaxTrace",
      category: "AI-assisted tax reconciliation and compliance",
      summary:
        "AI-assisted tax reconciliation and compliance platform with a FastAPI backend and Next.js exception-review workspace.",
      stack: [
        "FastAPI",
        "Next.js",
        "TypeScript",
        "SQLAlchemy",
        "PostgreSQL",
        "React Query",
        "Tailwind CSS",
        "Alembic"
      ],
      architecture:
        "FastAPI backend → SQLAlchemy/PostgreSQL → reconciliation and exception workflow → Next.js review workspace → React Query → Tailwind UI → Alembic migrations.",
      evidence: [
        "Stage 6 added a description field to tasks.",
        "Stage 6 added exception_id and notice_case_id foreign keys to tasks.",
        "Stage 6 added a drafts table.",
        "91 backend tests were passing at the Stage 6 checkpoint."
      ],
      limitations:
        "The available portfolio evidence documents the Stage 6 checkpoint; do not turn it into a claim of enterprise production deployment or scale."
    },

    "Enterprise RAG / AI Search Platform": {
      name: "Enterprise RAG / AI Search Platform",
      ownership: "Solo project",
      repository: "https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG",
      category: "AI search and retrieval engineering",
      summary:
        "Retrieval pipeline combining dense retrieval with FAISS, BM25 sparse retrieval, hybrid fusion, cross-encoder reranking, citation validation, and evidence-constrained generation.",
      stack: [
        "Python",
        "FastAPI",
        "FAISS",
        "BM25",
        "SentenceTransformers",
        "React",
        "Cross-encoder reranking"
      ],
      architecture:
        "Document ingestion → chunking → dense retrieval → sparse retrieval → hybrid fusion → cross-encoder reranking → evidence-constrained generation → citation validation.",
      evidence: [
        "Dense retrieval is implemented with FAISS.",
        "Sparse retrieval uses BM25.",
        "The pipeline includes hybrid retrieval and cross-encoder reranking.",
        "Citation validation and evidence-constrained generation are part of the documented design."
      ],
      limitations:
        "Do not invent production user counts, accuracy gains, clients, or enterprise-scale deployment."
    },

    "APX — Accounts Payable Exception Resolution Agent": {
      name: "APX — Accounts Payable Exception Resolution Agent",
      ownership: "Solo project",
      repository:
        "https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent",
      category: "Agentic systems and financial workflow automation",
      summary:
        "Evidence-driven accounts-payable exception-resolution system designed around controlled retrieval, validation, decision logic, and persistence.",
      stack: [
        "Python",
        "BM25",
        "Dense retrieval",
        "Cross-encoder reranking",
        "LLMs",
        "SQLite"
      ],
      architecture:
        "Evidence corpus → BM25 + dense retrieval → hybrid fusion → reranking → evidence validity checks → decision pipeline → persistence.",
      evidence: [
        "Phase 1 established a deterministic foundation.",
        "Phase 2 added retrieval.",
        "Phase 3 added the agent.",
        "Phase 4 added the decision pipeline.",
        "Phase 5 established the persistence foundation.",
        "The documented retrieval architecture includes hybrid retrieval, RRF fusion, and cross-encoder reranking."
      ],
      limitations:
        "Do not claim autonomous production operation, financial impact, user counts, or enterprise deployment unless separately documented."
    },

    "AI-Powered Job Recommendations Dashboard": {
      name: "AI-Powered Job Recommendations Dashboard",
      ownership: "Solo project",
      repository:
        "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard",
      category: "ML and recommendation",
      summary:
        "Recommendation system that converts unstructured resumes and job descriptions into relevant job matches using TF-IDF and dense semantic embeddings, exposed through a Streamlit dashboard.",
      stack: [
        "Python",
        "scikit-learn",
        "SentenceTransformers",
        "Streamlit",
        "Pandas",
        "Semantic search",
        "Embeddings"
      ],
      architecture:
        "Resume/job text → text representation with TF-IDF and dense embeddings → similarity/matching → ranked recommendations → Streamlit dashboard.",
      evidence: [
        "The system combines TF-IDF with dense semantic embeddings.",
        "The application exposes recommendations through a Streamlit dashboard.",
        "The work includes resume/job-description matching and recommendation-oriented analysis."
      ],
      limitations:
        "Do not invent recommendation accuracy, number of users, production deployment, or business impact."
    }
  },

  roleRelevance: {
    "ai-engineer": [
      "TaxTrace",
      "Enterprise RAG / AI Search Platform",
      "APX — Accounts Payable Exception Resolution Agent",
      "AI-Powered Job Recommendations Dashboard"
    ],
    "ml-engineer": [
      "AI-Powered Job Recommendations Dashboard",
      "Enterprise RAG / AI Search Platform"
    ],
    "ai-systems": [
      "TaxTrace",
      "Enterprise RAG / AI Search Platform",
      "APX — Accounts Payable Exception Resolution Agent"
    ],
    "data-science": [
      "AI-Powered Job Recommendations Dashboard",
      "Enterprise RAG / AI Search Platform"
    ],
    "data-analyst": [
      "TaxTrace",
      "AI-Powered Job Recommendations Dashboard"
    ],
    "web-developer": [
      "TaxTrace",
      "Enterprise RAG / AI Search Platform"
    ]
  },

  roleCapabilities: {
    "ai-engineer": [
      "RAG",
      "Agentic workflows",
      "LLM APIs",
      "Prompt engineering",
      "FAISS",
      "BM25",
      "Hybrid retrieval",
      "Cross-encoder reranking",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Cloudflare Workers",
      "JavaScript",
      "React",
      "Vite"
    ],
    "ml-engineer": [
      "Python",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "SentenceTransformers",
      "TF-IDF",
      "Semantic search",
      "Embeddings",
      "FastAPI",
      "Streamlit"
    ],
    "ai-systems": [
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
      "RAG",
      "Agentic workflows",
      "Hybrid retrieval",
      "Persistence",
      "Observability",
      "Docker",
      "GitHub Actions"
    ],
    "data-science": [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "scikit-learn",
      "TF-IDF",
      "SentenceTransformers",
      "Semantic similarity",
      "NLP",
      "Streamlit"
    ],
    "data-analyst": [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "Pandas",
      "Data cleaning",
      "Data visualization",
      "Streamlit",
      "Interactive dashboards",
      "Reporting"
    ],
    "web-developer": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "CSS",
      "Responsive UI",
      "AI API integration"
    ]
  },

  interviewGrounding: {
    principle:
      "Use the uploaded HR answer bank as interview guidance, not as a script. Answers should remain conversational and grounded in verified candidate evidence.",
    strengths: [
      "Systematic problem solving",
      "Strong interest in AI systems",
      "Persistence with difficult technical problems",
      "Testing and evaluation mindset",
      "Ability to connect AI/ML with software engineering"
    ],
    developmentArea:
      "Prioritizing and simplifying: define the smallest high-value scope before expanding implementation.",
    recurringThemes: [
      "Define the problem before choosing AI.",
      "Use baselines and measurable evaluation.",
      "Separate implementation from evidence.",
      "Make assumptions and interfaces explicit.",
      "Prefer controlled experiments under compute constraints.",
      "Do not equate a working script or demo with a validated production result."
    ]
  },

  honestyRules: [
    "Never invent employment, production incidents, metrics, leadership experiences, clients, users, patents, publications, or company experience.",
    "If a question asks for an experience that is not documented, say so and bridge only to the closest documented project experience.",
    "Treat project architecture as documented implementation, not proof of production scale.",
    "Treat metrics as valid only when explicitly present in the knowledge base.",
    "Do not reintroduce HCAD-RAG; it is intentionally excluded from the current Haya knowledge base.",
    "Do not present targets, plans, or intended capabilities as achieved results.",
    "If the knowledge base does not document an answer, say: 'The available portfolio data does not document that.'"
  ]
};

export function getHayaKnowledge(roleId = null) {
  const projectNames = roleId && HAYA_KNOWLEDGE.roleRelevance[roleId]
    ? HAYA_KNOWLEDGE.roleRelevance[roleId]
    : Object.keys(HAYA_KNOWLEDGE.projects);

  return {
    profile: HAYA_KNOWLEDGE.profile,
    experience: HAYA_KNOWLEDGE.experience,
    projects: projectNames
      .map((name) => HAYA_KNOWLEDGE.projects[name])
      .filter(Boolean),
    capabilities: roleId
      ? HAYA_KNOWLEDGE.roleCapabilities[roleId] || []
      : Object.values(HAYA_KNOWLEDGE.roleCapabilities).flat().filter(
          (value, index, values) => values.indexOf(value) === index
        ),
    interviewGrounding: HAYA_KNOWLEDGE.interviewGrounding,
    honestyRules: HAYA_KNOWLEDGE.honestyRules
  };
}

export function findKnowledgeProject(name) {
  return HAYA_KNOWLEDGE.projects[name] || null;
}
