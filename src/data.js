export const ROLES = {
  "ai-systems": {
    id: "ai-systems",
    resumeFile: "Eklakh_Dewan_AI_Systems.pdf",
    title: "AI & AI Systems Engineer",
    pitch: "I build AI applications and the systems around them: retrieval pipelines, bounded agentic workflows, evidence-grounded generation, and reliable backend services.",
    accent: "#101a2b",
    skills: ["RAG and evidence-grounded generation", "Hybrid retrieval and reranking", "Agentic workflow design", "FastAPI and backend architecture", "Evaluation, validation, and observability", "Docker and CI/CD"]
  },
  "data-ml-engineer": {
    id: "data-ml-engineer",
    resumeFile: "Eklakh_Dewan_ML_Engineer.pdf",
    title: "Data & ML Engineer",
    pitch: "I build data-driven and machine-learning workflows, from text processing and embeddings to ranking, reproducible evaluation, and model integration.",
    accent: "#526174",
    skills: ["Python, Pandas, and NumPy", "Data cleaning and transformation", "Machine learning and NLP", "TF-IDF and dense embeddings", "Ranking and retrieval evaluation", "SQL and reproducible pipelines"]
  },
  "software-engineer": {
    id: "software-engineer",
    resumeFile: "Resume.pdf",
    title: "Software Engineer",
    pitch: "I build maintainable software around real workflows, with emphasis on backend APIs, persistence, testing, frontend integration, and deployment.",
    accent: "#314b60",
    skills: ["Backend APIs and service design", "Python, JavaScript, and TypeScript", "PostgreSQL and data persistence", "Frontend and full-stack integration", "Automated testing and CI", "Docker and deployment workflows"]
  }
};

const ROLE_ENRICHMENTS = {
  "ai-systems": {
    proof: [
      { value: "8.55", label: "CGPA" }, { value: "2027", label: "Graduation" },
      { value: "780", label: "human judgments" }, { value: "AI", label: "systems focus" }
    ],
    capabilities: {
      "AI Engineering": ["RAG", "Agentic workflows", "LLM API integration", "Evidence-grounded generation", "Guardrails"],
      "Retrieval & Evaluation": ["FAISS", "BM25", "Hybrid search", "RRF", "Cross-encoder reranking", "Recall@K", "MRR", "nDCG"],
      "Backend & Data": ["FastAPI", "Python", "PostgreSQL", "REST APIs", "Persistence", "Validation"],
      "Infrastructure": ["Docker", "GitHub Actions", "Cloudflare Workers", "CI/CD", "Observability"],
      "Frontend": ["JavaScript", "React", "TypeScript", "Vite"]
    },
    engineeringSignals: ["Hybrid retrieval", "Evidence validation", "Bounded agentic workflows", "Persistence", "Observability", "Evaluation-first workflows"]
  },
  "data-ml-engineer": {
    proof: [
      { value: "8.55", label: "CGPA" }, { value: "2027", label: "Graduation" },
      { value: "50", label: "frozen RAG queries" }, { value: "ML", label: "focus" }
    ],
    capabilities: {
      "Data & Python": ["Python", "Pandas", "NumPy", "SQL", "Data cleaning", "Feature preparation"],
      "ML & NLP": ["scikit-learn", "TF-IDF", "SentenceTransformers", "Embeddings", "Semantic similarity", "Classification"],
      "Ranking & Evaluation": ["Recall@K", "MRR", "nDCG", "Ranking baselines", "Error analysis", "Reproducibility"],
      "Systems Integration": ["FastAPI", "SQLite", "PostgreSQL", "Streamlit", "GitHub Actions"]
    },
    engineeringSignals: ["Human-verified relevance judgments", "Ranking evaluation", "Controlled experiments", "Data normalization", "Reproducible pipelines"]
  },
  "software-engineer": {
    proof: [
      { value: "8.55", label: "CGPA" }, { value: "2027", label: "Graduation" },
      { value: "134", label: "TaxTrace backend tests" }, { value: "15", label: "TaxTrace frontend tests" }
    ],
    capabilities: {
      "Backend": ["Python", "FastAPI", "REST APIs", "Node.js", "NestJS"],
      "Data & Persistence": ["PostgreSQL", "SQLite", "SQLAlchemy", "Schema migrations", "Supabase"],
      "Frontend": ["JavaScript", "TypeScript", "React", "Next.js", "CSS"],
      "Engineering Practice": ["Automated testing", "GitHub Actions", "Docker", "CI/CD", "Authorization boundaries", "Realtime state"]
    },
    engineeringSignals: ["API design", "Persistence", "Automated tests", "Authorization boundaries", "Frontend/backend integration", "Deployment workflows"]
  }
};

Object.entries(ROLE_ENRICHMENTS).forEach(([roleId, enrichment]) => {
  if (ROLES[roleId]) Object.assign(ROLES[roleId], enrichment);
});

// Education is shared across every role view.
Object.values(ROLES).forEach(role => {
  role.experience = [{ role: "AI Intern", company: "Flowrage Technology", duration: "10 Jan – 11 Feb 2025 · Virtual", description: "Completed an applied AI internship covering Python data processing with Pandas and NumPy, API integration using Requests, pre-trained model inference, a job-recommendation mini-project, and interactive Streamlit dashboard workflows using Matplotlib and Seaborn." }];

  role.education = [{
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "KPRIET",
    year: "2027",
    result: "CGPA 8.55"
  }];

  role.credentials = [{
    name: "Artificial Intelligence Internship",
    issuer: "Flowrage Technology",
    duration: "10 Jan – 11 Feb 2025 · Virtual",
    evidence: "Certificate-backed"
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
      { src: "/evidence/taxtrace-product-visual.svg", alt: "TaxTrace product visual" }
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
      { src: "/evidence/Enterprise RAG Knowledge Interface.png", alt: "Enterprise RAG knowledge interface" },
      { src: "/evidence/Enterprise RAG Grounded Response UI.png", alt: "Enterprise RAG grounded response UI" },
      { src: "/evidence/Enterprise RAG Grounded Response Dashboard.png", alt: "Enterprise RAG grounded response dashboard" },
      { src: "/evidence/Enterprise RAG Analytics Dashboard.png", alt: "Enterprise RAG analytics dashboard" },
      { src: "/evidence/Enterprise RAG Performance Dashboard.png", alt: "Enterprise RAG performance dashboard" }
    ]
  },
  apx: {
    id: "apx",
    name: "APX — Accounts Payable Exception Resolution Agent",
    subtitle: "Evidence-grounded AP exception investigation",
    category: "Agentic Systems / Financial Operations",
    status: "Core foundations implemented · release validation in progress",
    repo: "https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent",
    description: "Evidence-grounded Accounts Payable exception-resolution system that organizes invoice exceptions, gathers supporting evidence, and prepares reviewable decisions behind explicit authorization boundaries.",
    problem: "Accounts Payable teams must investigate mismatches, missing documents, and policy exceptions across fragmented evidence. APX is designed to make that investigation structured and auditable without treating an LLM proposal as financial authorization.",
    architecture: "Exception intake → deterministic validation → BM25 + dense retrieval → hybrid/RRF fusion → cross-encoder reranking → bounded agentic investigation → evidence-backed decision proposal → authorization/approval controls → persistence and observability. Decision, authorization, and execution are separate boundaries.",
    engineering: ["Deterministic input and policy validation", "Hybrid lexical + dense evidence retrieval", "RRF fusion and cross-encoder reranking", "Bounded agentic investigation", "Decision rationale separated from authorization", "Approval-gated action boundary", "Persistence and observability foundations"],
    evidence: "Core engineering foundations are implemented, but release validation remains in progress. These controls describe the current design and implementation; they do not independently establish resolution accuracy, production readiness, or live financial execution. CI success alone is not release acceptance.",
    metrics: ["Release validation in progress", "Evidence-grounded decisions", "Approval boundary implemented"],
    stack: ["Python", "BM25", "Dense Retrieval", "RRF", "Cross-Encoder Reranking", "LLMs", "Persistence"],
    roleFocus: {
      "ai-engineer": "Evidence-grounded exception investigation with bounded agentic reasoning and explicit controls.",
      "ai-systems": "Deterministic validation, retrieval, decision/authorization separation, persistence, and observability."
    },
    gallery: [
      { src: "/evidence/apx-product-visual.svg", alt: "APX evidence-grounded exception-resolution architecture diagram" }
    ]
  },
  claimAI: {
    id: "claimAI",
    name: "ClaimAI — Insurance Claims Automation",
    subtitle: "Applied ML claims-processing prototype",
    category: "Applied ML / Insurance Claims",
    status: "Prototype · validation not claimed",
    repo: "https://github.com/Eklakh-AI-Engineer/Insurance-End-to-End-Claims-Automation",
    description: "Insurance-claims automation prototype combining document extraction, fraud scoring, image analysis, payout estimation, and a human-review path.",
    problem: "Claims workflows need structured evidence processing and review support without presenting prototype decisions as validated insurance adjudication.",
    architecture: "Claim submission → FastAPI → document/OCR extraction + fraud scoring + image analysis + payout estimation → prototype decision policy → human review.",
    engineering: ["FastAPI workflow", "Fraud-scoring pipeline", "Image analysis", "Payout estimation", "Review boundary", "Docker Compose"],
    evidence: "Repository explicitly classifies the system as a prototype; production model validation, insurance authorization, and regulatory certification are not claimed.",
    metrics: ["Prototype workflow", "Model validation not claimed", "Human review boundary"],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "XGBoost", "Isolation Forest", "Docker"],
    roleFocus: {
      "ai-engineer": "Applied ML pipeline with explicit review and validation boundaries.",
      "ml-engineer": "Fraud scoring, image analysis, payout estimation, and model-validation considerations.",
      "ai-systems": "API orchestration, claim evidence processing, and human review boundary."
    },
    gallery: []
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
      { src: "/evidence/tackboard-product-visual.svg", alt: "Tackboard product visual" }
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
      { src: "/evidence/job-recommendations-product-visual.svg", alt: "Job recommendation product visual" }
    ]
  },
  aiJobAgent: {
    id: "aiJobAgent",
    name: "AI Job Agent",
    subtitle: "Autonomous job-discovery pipeline",
    category: "Agentic Automation / Data Pipeline",
    status: "Pre-v1.0 · release blocked",
    repo: "https://github.com/Eklakh-AI-Engineer/AI-Job-Agent",
    description: "Staged job-discovery pipeline with source abstraction, normalization, deduplication, SQLite persistence, and tested workflow components.",
    problem: "Job discovery becomes noisy when source formats, duplicates, and persistence are handled ad hoc.",
    architecture: "JobSource → normalization → deduplication → SQLite repository → downstream workflow stages.",
    engineering: ["Source abstraction", "Normalization", "Deduplication", "SQLite persistence", "Staged workflow design"],
    evidence: "Release remains blocked: frozen workbook hash must be reconciled with CI input, synthetic benchmark job IDs must be mapped to real persisted jobs before authoritative ranking, and alert delivery plus restore validation remain incomplete.",
    metrics: ["Normalization and deduplication", "Ranking baseline blocked on real-job mapping", "Regression gate fail-closed", "Production release not certified"],
    stack: ["Python", "SQLite", "Automation", "Agentic workflows"],
    roleFocus: {
      "ai-engineer": "Agent workflow foundations and structured automation."
    },
    gallery: [
      { src: "/evidence/ai-job-agent-product-visual.svg", alt: "AI Job Agent product visual" }
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
    metrics: ["3 role views", "Server-side API-key isolation", "GitHub Pages deployment"],
    stack: ["Vite", "Vanilla JavaScript", "HTML/CSS", "Cloudflare Workers", "OpenRouter", "GitHub Actions"],
    roleFocus: {
      "web-developer": "Role-aware frontend architecture, deployment, and secure AI integration."
    },
    gallery: [
      { src: "/evidence/portfolio-product-visual.svg", alt: "Portfolio product visual" }
    ]
  }
};

export const ROLE_PROJECT_IDS = {
  "ai-systems": ["enterpriseRag", "apx", "aiJobAgent", "taxtrace", "tackboard"],
  "data-ml-engineer": ["enterpriseRag", "jobRecommendations", "claimAI", "aiJobAgent"],
  "software-engineer": ["taxtrace", "tackboard", "apx", "aiJobAgent", "portfolio"]
};

export const ROLE_FLAGSHIPS = {
  "ai-systems": "enterpriseRag",
  "data-ml-engineer": "enterpriseRag",
  "software-engineer": "taxtrace"
};

export const ROLE_PROJECTS = Object.fromEntries(
  Object.entries(ROLE_PROJECT_IDS).map(([roleId, ids]) => [
    roleId,
    ids.map(id => PROJECTS[id]).filter(Boolean).map((project, index) => ({
      ...project,
      roleFocus: project.roleFocus?.[roleId] || (roleId === "data-ml-engineer" ? (project.roleFocus?.["ml-engineer"] || project.roleFocus?.["data-science"]) : roleId === "software-engineer" ? (project.roleFocus?.["web-developer"] || project.roleFocus?.["ai-systems"]) : null) || project.subtitle,
      featured: ROLE_FLAGSHIPS[roleId] === project.id,
      roleIndex: index + 1
    }))
  ])
);

Object.values(ROLES).forEach(role => {
  role.projects = ROLE_PROJECTS[role.id] || [];
});



