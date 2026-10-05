export const ROLES = {
  "ai-engineer": {
    id: "ai-engineer",
    resumeFile: "Eklakh_Dewan_AI_Engineer.pdf",
    title: "AI Engineer",
    pitch: "I build RAG systems, agentic workflows, and applied AI pipelines with an emphasis on grounding and evidence.",
    accent: "#3e5f7a",
    
    skills: [
      "Retrieval-Augmented Generation (RAG)", 
      "Agentic LLM Workflows (LangChain/LangGraph)", 
      "Hybrid Search (Dense + Sparse)", 
      "Cross-encoder Reranking", 
      "Prompt Engineering & Guardrails",
      "FastAPI & Async Python"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Worked on Gemini API integration, resume parsing, and job-matching workflows using TF-IDF and dense embeddings."
      }
    ]
  },
  "ml-engineer": {
    id: "ml-engineer",
    resumeFile: "Eklakh_Dewan_ML_Engineer.pdf",
    title: "ML Engineer",
    pitch: "I work on recommendation systems, retrieval evaluation, and applied ML workflows with a focus on metrics and reproducibility.",
    accent: "#526174",
    
    skills: [
      "Machine Learning & Deep Learning", 
      "Feature Engineering & Selection",
      "Model Evaluation (Recall@K, MRR, nDCG)",
      "scikit-learn & Python Data Stack",
      "Explainable AI (SHAP, LIME)"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Practiced robust data engineering patterns. Designed data ingestion pipelines, transformed raw text inputs, and implemented ranking models to optimize the end-user experience."
      }
    ]
  },
  "ai-systems": {
    id: "ai-systems",
    resumeFile: "Eklakh_Dewan_AI_Systems.pdf",
    title: "AI Systems Engineer",
    pitch: "I build backend systems for AI workflows, with an emphasis on retrieval, persistence, validation, and observable execution.",
    accent: "#101a2b",
    
    skills: [
      "Backend System Architecture", 
      "API Design (FastAPI, NestJS, REST)",
      "Asynchronous Processing (Redis, BullMQ)", 
      "Docker & Containerization",
      "CI/CD (GitHub Actions)"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Integrated third-party LLM APIs into backend workflows, with attention to error handling and rate limits."
      }
    ]
  },
  "data-science": {
    id: "data-science",
    resumeFile: "Eklakh_Dewan_Data_Scientist.pdf",
    title: "Data Scientist",
    pitch: "I work with unstructured data, NLP, similarity-based recommendation, and data analysis with an emphasis on explainable results.",
    accent: "#b08d57",
    
    skills: [
      "Natural Language Processing (NLP)", 
      "Statistical Analysis & Hypothesis Testing",
      "Predictive Modeling & Classification",
      "SQL, Pandas, NumPy",
      "Exploratory Data Analysis (EDA)"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Cleaned and transformed messy text data for NLP pipelines. Applied TF-IDF and dense embeddings to extract actionable insights from unstructured resume documents."
      }
    ]
  },
  "data-analyst": {
    id: "data-analyst",
    resumeFile: "Eklakh_Dewan_Data_Analyst.pdf",
    title: "Data Analyst",
    pitch: "I build data-focused dashboards, SQL workflows, and reporting views that make analysis easier to inspect and use.",
    accent: "#557a68",
    
    skills: [
      "Advanced SQL (MySQL, PostgreSQL)", 
      "Streamlit & Interactive Dashboards",
      "Data Cleaning (Pandas)",
      "Business Intelligence & Reporting",
      "Data Visualization"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Analyzed resume and job description datasets. Created internal reports detailing match-rate optimizations and presented findings to improve the core matching algorithm."
      }
    ]
  },
  "web-developer": {
    id: "web-developer",
    resumeFile: "Eklakh_Dewan_Web_Developer.pdf",
    title: "Web Developer",
    pitch: "I build responsive web interfaces and backend APIs, with experience integrating AI services and data-driven workflows.",
    accent: "#314b60",
    
    skills: [
      "React & Vanilla JavaScript", 
      "TypeScript & Node.js",
      "CSS3, Flexbox & CSS Grid",
      "NestJS & FastAPI",
      "WebSockets & Real-time State"
    ],
    experience: [
      {
        role: "Artificial Intelligence Intern",
        company: "Flowrage Technology",
        duration: "4 weeks (Virtual)",
        description: "Built and documented RESTful API endpoints. Integrated third-party AI services seamlessly into web interfaces, ensuring fast load times and proper error handling on the client side."
      }
    ]
  }
};


const ROLE_ENRICHMENTS = {
  "ai-engineer": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "4 wk", label: "AI internship" },
      { value: "RAG", label: "Primary focus" }
    ],
    capabilities: {
      "AI & LLM": ["RAG", "Agentic workflows", "LLM APIs", "Prompt engineering", "Guardrails"],
      "Retrieval & NLP": ["FAISS", "BM25", "Hybrid search", "RRF", "Cross-encoder reranking", "Embeddings"],
      "Backend & Data": ["FastAPI", "Async Python", "PostgreSQL", "REST APIs"],
      "Infrastructure": ["Docker", "GitHub Actions", "Cloudflare Workers", "CI/CD"],
      "Frontend": ["JavaScript", "React", "Vite", "Responsive UI"]
    },
    engineeringSignals: ["Grounded generation", "Evidence validation", "Hybrid retrieval", "Reranking", "Observability", "Evaluation-first workflows"]
  },
  "ml-engineer": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "NLP", label: "Focus area" },
      { value: "ML", label: "Applied stack" }
    ],
    capabilities: {
      "AI & LLM": ["Embeddings", "LLM APIs", "Prompt engineering"],
      "Retrieval & NLP": ["SentenceTransformers", "TF-IDF", "Semantic search", "Hybrid retrieval", "Reranking"],
      "Backend & Data": ["Python", "scikit-learn", "Pandas", "NumPy", "FastAPI"],
      "Infrastructure": ["Docker", "GitHub Actions", "Reproducible pipelines"],
      "Frontend": ["Streamlit", "Interactive dashboards"]
    },
    engineeringSignals: ["Recall@K", "MRR", "nDCG", "Feature engineering", "Model evaluation", "Reproducibility"]
  },
  "ai-systems": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "134", label: "TaxTrace backend tests" },
      { value: "AI", label: "Systems focus" }
    ],
    capabilities: {
      "AI & LLM": ["RAG", "Agentic workflows", "LLM API integration", "AI task orchestration"],
      "Retrieval & NLP": ["Hybrid retrieval", "Evidence pipelines", "Embeddings"],
      "Backend & Data": ["FastAPI", "NestJS", "PostgreSQL", "REST APIs", "Async processing"],
      "Infrastructure": ["Docker", "Redis", "BullMQ", "GitHub Actions", "Cloudflare Workers"],
      "Frontend": ["TypeScript", "React", "Next.js", "Vite"]
    },
    engineeringSignals: ["Idempotency", "Retries", "Persistence", "Observability", "CI/CD", "134 backend tests in TaxTrace audit"]
  },
  "data-science": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "NLP", label: "Focus area" },
      { value: "ML", label: "Applied stack" }
    ],
    capabilities: {
      "AI & LLM": ["NLP", "Embeddings", "LLM-assisted workflows"],
      "Retrieval & NLP": ["TF-IDF", "SentenceTransformers", "Semantic similarity", "Text classification"],
      "Backend & Data": ["Python", "Pandas", "NumPy", "SQL", "scikit-learn"],
      "Infrastructure": ["Reproducible pipelines", "GitHub Actions"],
      "Frontend": ["Streamlit", "Data dashboards"]
    },
    engineeringSignals: ["EDA", "Hypothesis testing", "Classification", "SMOTE", "Cosine similarity", "Explainable analysis"]
  },
  "data-analyst": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "SQL", label: "Core strength" },
      { value: "BI", label: "Focus" }
    ],
    capabilities: {
      "AI & LLM": ["AI-assisted analytics", "NLP-driven matching"],
      "Retrieval & NLP": ["TF-IDF", "Semantic matching", "Text analysis"],
      "Backend & Data": ["Advanced SQL", "PostgreSQL", "MySQL", "Pandas", "Data cleaning"],
      "Infrastructure": ["CSV automation", "Reporting workflows"],
      "Frontend": ["Streamlit", "Interactive dashboards", "Data visualization"]
    },
    engineeringSignals: ["Window functions", "Reporting", "Data aggregation", "Dashboards", "Skill-gap analysis", "Business intelligence"]
  },
  "web-developer": {
    proof: [
      { value: "8.55", label: "CGPA" },
      { value: "2027", label: "Graduation" },
      { value: "Full-stack", label: "Focus" },
      { value: "AI", label: "Integration" }
    ],
    capabilities: {
      "AI & LLM": ["LLM API integration", "AI-enabled workflows", "Prompt-driven features"],
      "Retrieval & NLP": ["Resume parsing", "Semantic matching", "Embeddings"],
      "Backend & Data": ["NestJS", "FastAPI", "Node.js", "PostgreSQL", "REST APIs"],
      "Infrastructure": ["Docker", "GitHub Actions", "CI/CD", "Cloudflare Workers"],
      "Frontend": ["React", "TypeScript", "JavaScript", "CSS Grid", "Responsive UI"]
    },
    engineeringSignals: ["Multi-tenant architecture", "RBAC", "WebSockets", "Optimistic UI", "API integration", "Deployment automation"]
  }
};

Object.entries(ROLE_ENRICHMENTS).forEach(([roleId, enrichment]) => {
  if (ROLES[roleId]) Object.assign(ROLES[roleId], enrichment);
});

// Education is shared across every role view.
Object.values(ROLES).forEach(role => {
  role.education = [{
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "KPRIET",
    year: "2027",
    result: "CGPA 8.55"
  }];

  role.credentials = [{
    name: "Artificial Intelligence Internship",
    issuer: "Flowrage Technology",
    duration: "4 weeks (Virtual)",
    evidence: "Certificate available"
  }];
});


/**
 * Canonical project registry.
 *
 * This is the single source of truth for project identity, evidence, metrics,
 * links, visual evidence, status, and role-specific positioning.
 */
export const PROJECTS = {
  taxtrace: {
    id: "taxtrace",
    name: "TaxTrace",
    subtitle: "AI-assisted tax reconciliation & compliance",
    category: "AI-Assisted Tax Reconciliation / Compliance",
    status: "Pilot baseline · local development",
    repo: "https://github.com/Eklakh-AI-Engineer/TaxTrace",
    description: "AI-assisted tax reconciliation platform turning GST discrepancies into reviewable exceptions and controlled workflows.",
    problem: "Tax reconciliation can require manual comparison, exception investigation, and fragmented notice-response handling.",
    architecture: "FastAPI → SQLAlchemy/PostgreSQL → reconciliation + exception workflow → Next.js review workspace → React Query → Tailwind → Alembic.",
    engineering: ["Exception review workspace", "Relational persistence", "Schema migrations", "Review workflows", "API-driven frontend", "Tenant isolation"],
    evidence: "Recorded pilot evidence: 134 backend tests, 15 frontend tests, 7 reconciliation benchmark gate tests, 32 AI quality-gate tests; TypeScript clean; security audit 5/5.",
    metrics: ["134 backend tests", "15 frontend tests", "1.000 reconciliation precision/recall", "5/5 security audit"],
    stack: ["FastAPI", "Next.js", "TypeScript", "SQLAlchemy", "PostgreSQL", "React Query", "Tailwind CSS", "Alembic"],
    roleFocus: {
      "ai-engineer": "Controlled AI-assisted reconciliation and exception workflows.",
      "ai-systems": "Backend persistence, schema evolution, review workflow, and verification.",
      "data-analyst": "Reconciliation evidence, benchmark gates, and review-oriented data workflows.",
      "web-developer": "FastAPI + Next.js application architecture and typed frontend integration."
    },
    gallery: [
      { src: "/evidence/taxtrace-architecture.svg", alt: "TaxTrace architecture evidence diagram" }
    ]
  },
  enterpriseRag: {
    id: "enterpriseRag",
    name: "Enterprise RAG / AI Search Platform",
    subtitle: "Evidence-grounded retrieval engineering",
    category: "AI Search / Retrieval Engineering",
    status: "Evaluation complete · local",
    repo: "https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG",
    description: "Evidence-grounded retrieval system combining dense retrieval, BM25, hybrid fusion, cross-encoder reranking, citation validation, and a frozen human-verified benchmark.",
    problem: "Enterprise documents are difficult to search reliably when lexical and semantic retrieval disagree and generated answers can drift beyond the evidence.",
    architecture: "Ingestion → chunking → FAISS dense retrieval + BM25 sparse retrieval → hybrid/RRF fusion → cross-encoder reranking → evidence-constrained generation → citation validation.",
    engineering: ["Dense + sparse retrieval", "Hybrid/RRF fusion", "Cross-encoder reranking", "Human-verified evaluation", "Evidence metadata validation", "OCR fallback validation", "Citation mapping", "Query-rewriting experiment", "Pipeline observability"],
    evidence: "Frozen CHA benchmark: 50 queries, 780 human relevance judgments, 780 provenance checks. Query rewriting was evaluated separately and remains off by default after mixed retrieval results.",
    metrics: ["Recall@10 +9.9% vs Dense", "nDCG@10 +7.0% vs Dense", "50-query frozen benchmark", "780 human judgments"],
    stack: ["Python", "FastAPI", "FAISS", "BM25", "SentenceTransformers", "Cross-Encoder", "React"],
    roleFocus: {
      "ai-engineer": "Flagship RAG system with retrieval, grounding, evaluation, and observability.",
      "ml-engineer": "Retrieval evaluation, ranking metrics, and controlled experiments.",
      "ai-systems": "Layered retrieval/generation pipeline with evidence and observability boundaries.",
      "data-science": "Human-verified relevance evaluation and retrieval experimentation.",
      "web-developer": "React + FastAPI search workspace with evidence-rich result presentation."
    },
    gallery: [
      { src: "https://raw.githubusercontent.com/Eklakh-AI-Engineer/ENTERPRISE-RAG/main/screenshots/04_enterprise_rag_homepage.png", alt: "Enterprise RAG application interface" },
      { src: "https://raw.githubusercontent.com/Eklakh-AI-Engineer/ENTERPRISE-RAG/main/screenshots/05_grounded_query_response.png", alt: "Enterprise RAG grounded response with citations" },
      { src: "https://raw.githubusercontent.com/Eklakh-AI-Engineer/ENTERPRISE-RAG/main/screenshots/06_pipeline_observability_retrieved_evidence.png", alt: "Enterprise RAG retrieval observability and evidence" }
    ]
  },
  apx: {
    id: "apx",
    name: "APX — Accounts Payable Exception Resolution Agent",
    subtitle: "Evidence-constrained agentic workflow",
    category: "Agentic Systems / Financial Automation",
    status: "Phased system · development",
    repo: "https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent",
    description: "Evidence-driven accounts-payable exception-resolution system built around controlled retrieval, validation, decision logic, guardrails, and persistence.",
    problem: "Accounts-payable exceptions need evidence gathering and controlled resolution rather than unconstrained LLM decisions.",
    architecture: "Evidence corpus → BM25 + dense retrieval → hybrid/RRF fusion → cross-encoder reranking → evidence validity checks → deterministic decision pipeline → persistence.",
    engineering: ["Deterministic foundation", "Hybrid evidence retrieval", "RRF fusion", "Cross-encoder reranking", "Evidence validity checks", "Guardrails", "Persistence"],
    evidence: "Documented phased progression from deterministic foundation through retrieval, agent, decision pipeline, and persistence. Production scale is not claimed.",
    metrics: ["5 documented implementation phases", "Hybrid evidence retrieval", "Evidence validity gates"],
    stack: ["Python", "BM25", "Dense Retrieval", "Reranking", "LLMs", "SQLite"],
    roleFocus: {
      "ai-engineer": "Bounded agentic resolution with evidence and guardrails.",
      "ai-systems": "Decision pipeline, failure boundaries, persistence, and controlled execution."
    },
    gallery: [
      { src: "/evidence/apx-architecture.svg", alt: "APX evidence-constrained agent architecture diagram" }
    ]
  },
  tackboard: {
    id: "tackboard",
    name: "Tackboard",
    subtitle: "Real-time collaborative Kanban",
    category: "Real-Time Collaborative Web Application",
    status: "Deployed · production-oriented",
    repo: "https://github.com/Eklakh-Web-Development/Tackboard",
    demo: "https://tackboard-qpxfbxvx7-23ad070-3509s-projects.vercel.app/",
    description: "Real-time collaborative Kanban application with authenticated users, persistent boards, row-level security, realtime synchronization, and optimistic UI.",
    problem: "Teams need a shared workspace where board state persists and changes stay synchronized across users.",
    architecture: "Browser → Supabase Auth + Data API/RLS + Realtime → PostgreSQL → Vercel.",
    engineering: ["Authentication", "Row-level security", "Realtime synchronization", "Optimistic UI", "Persistent board storage", "Private presence", "Deployment hardening"],
    evidence: "Repository documents Supabase Auth, PostgreSQL persistence, RLS on application tables, private Realtime presence, optimistic updates, Vercel deployment, and GitHub CI verification.",
    metrics: ["Realtime collaboration", "RLS authorization boundary", "Vercel deployment"],
    stack: ["Vanilla JavaScript", "Supabase", "PostgreSQL", "Realtime", "Vercel"],
    roleFocus: {
      "ai-systems": "Realtime state, authorization boundaries, persistence, and deployment.",
      "web-developer": "Full-stack browser architecture, realtime state, auth, and production deployment."
    },
    gallery: [
      { src: "/evidence/tackboard-architecture.svg", alt: "Tackboard architecture evidence diagram" }
    ]
  },
  jobRecommendations: {
    id: "jobRecommendations",
    name: "AI-Powered Job Recommendations Dashboard",
    subtitle: "Hybrid lexical + semantic recommendation",
    category: "ML / Recommendation",
    status: "Prototype · Streamlit",
    repo: "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard",
    description: "Recommendation system that matches unstructured resumes and job descriptions using TF-IDF and dense semantic embeddings, exposed through a Streamlit dashboard.",
    problem: "Job discovery requires matching unstructured resume content against job descriptions while preserving an interpretable relevance signal.",
    architecture: "Resume/job text → normalization → TF-IDF + dense embeddings → similarity scoring → ranked recommendations → Streamlit dashboard.",
    engineering: ["Text normalization", "TF-IDF", "Dense embeddings", "Semantic matching", "Skill-gap analysis", "Interactive reporting"],
    evidence: "The documented prototype combines sparse lexical matching with dense semantic embeddings and exposes the result through an interactive Streamlit workflow.",
    metrics: ["TF-IDF baseline", "Dense semantic representation", "Ranked recommendations"],
    stack: ["Python", "scikit-learn", "SentenceTransformers", "Streamlit", "Pandas"],
    roleFocus: {
      "ai-engineer": "Applied semantic matching and recommendation workflow.",
      "ml-engineer": "Feature representations, similarity scoring, and ranking workflow.",
      "data-science": "NLP preprocessing, similarity analysis, and explainable recommendation.",
      "data-analyst": "Interactive ranking and skill-gap reporting."
    },
    gallery: [
      { src: "/evidence/job-recommendations-architecture.svg", alt: "Job recommendation pipeline evidence diagram" }
    ]
  },
  aiJobAgent: {
    id: "aiJobAgent",
    name: "AI Job Agent",
    subtitle: "Autonomous job-discovery pipeline",
    category: "Agentic Automation / Data Pipeline",
    status: "Active development",
    repo: "https://github.com/Eklakh-AI-Engineer/AI-Job-Agent",
    description: "Staged job-discovery pipeline with source abstraction, normalization, deduplication, SQLite persistence, and tested workflow components.",
    problem: "Job discovery becomes noisy when source formats, duplicates, and persistence are handled ad hoc.",
    architecture: "JobSource → normalization → deduplication → SQLite repository → downstream workflow stages.",
    engineering: ["Source abstraction", "Normalization", "Deduplication", "SQLite persistence", "Staged workflow design"],
    evidence: "Repository documentation separates implemented backend boundaries from future platform work; production autonomy is not claimed.",
    metrics: ["Source abstraction", "Deterministic normalization", "Persistent job records"],
    stack: ["Python", "SQLite", "Automation", "Agentic workflows"],
    roleFocus: {
      "ai-engineer": "Agent workflow foundations and structured automation."
    },
    gallery: [
      { src: "/evidence/ai-job-agent-architecture.svg", alt: "AI Job Agent pipeline evidence diagram" }
    ]
  },
  portfolio: {
    id: "portfolio",
    name: "Portfolio Site Architecture",
    subtitle: "Role-aware frontend + Haya evidence assistant",
    category: "Frontend / AI Integration",
    status: "Deployed · GitHub Pages",
    repo: "https://github.com/eklakhdewan/Portfolio",
    description: "Role-aware portfolio architecture using Vite and vanilla JavaScript, with Haya routed through a Cloudflare Worker so provider credentials stay server-side.",
    problem: "A recruiter-facing portfolio needs role-specific content without duplicating pages and needs an AI concierge without exposing provider credentials.",
    architecture: "Vite SPA → role router → canonical project registry → renderer → Haya client → Cloudflare Worker → OpenRouter.",
    engineering: ["Data-driven rendering", "Role-based views", "Canonical project registry", "Cloudflare Worker proxy", "Secret isolation", "GitHub Pages deployment"],
    evidence: "The public frontend does not contain the OpenRouter secret; Haya requests are routed through the Cloudflare Worker.",
    metrics: ["6 role views", "Server-side API-key isolation", "GitHub Pages deployment"],
    stack: ["Vite", "Vanilla JavaScript", "HTML/CSS", "Cloudflare Workers", "OpenRouter", "GitHub Actions"],
    roleFocus: {
      "web-developer": "Role-aware frontend architecture, deployment, and secure AI integration."
    },
    gallery: [
      { src: "/evidence/portfolio-architecture.svg", alt: "Portfolio architecture evidence diagram" }
    ]
  }
};

export const ROLE_PROJECT_IDS = {
  "ai-engineer": ["enterpriseRag", "taxtrace", "apx", "jobRecommendations"],
  "ml-engineer": ["jobRecommendations", "enterpriseRag"],
  "ai-systems": ["apx", "taxtrace", "tackboard", "enterpriseRag"],
  "data-science": ["jobRecommendations", "enterpriseRag"],
  "data-analyst": ["taxtrace", "jobRecommendations"],
  "web-developer": ["tackboard", "taxtrace", "portfolio"]
};

export const ROLE_FLAGSHIPS = {
  "ai-engineer": "enterpriseRag",
  "ml-engineer": "enterpriseRag",
  "ai-systems": "apx",
  "data-science": "enterpriseRag",
  "data-analyst": "taxtrace",
  "web-developer": "tackboard"
};

export const ROLE_PROJECTS = Object.fromEntries(
  Object.entries(ROLE_PROJECT_IDS).map(([roleId, ids]) => [
    roleId,
    ids.map(id => PROJECTS[id]).filter(Boolean).map((project, index) => ({
      ...project,
      roleFocus: project.roleFocus?.[roleId] || project.subtitle,
      featured: ROLE_FLAGSHIPS[roleId] === project.id,
      roleIndex: index + 1
    }))
  ])
);

Object.values(ROLES).forEach(role => {
  role.projects = ROLE_PROJECTS[role.id] || [];
});



