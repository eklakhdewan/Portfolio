export const ROLES = {
  "ai-engineer": {
    id: "ai-engineer",
    resumeFile: "Eklakh_Dewan_AI_Engineer.pdf",
    title: "AI Engineer",
    pitch: "I build RAG systems, agentic workflows, and applied AI pipelines with an emphasis on grounding and evidence.",
    accent: "#3e5f7a",
    projects: [
      {
        name: "AI-Powered Job Recommendations Dashboard",
        description: "Engineered a recommendation engine that converts unstructured resumes into actionable job matches using TF-IDF and dense semantic embeddings, exposed through an interactive Streamlit dashboard.",
        tags: ["Python", "scikit-learn", "Streamlit", "Semantic Search", "Embeddings"],
        link: "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Enterprise RAG / AI Search Platform",
        description: "Built a retrieval and generation pipeline combining dense retrieval with FAISS, sparse retrieval with BM25, hybrid fusion, cross-encoder reranking, and citation validation.",
        tags: ["FastAPI", "React", "FAISS", "SentenceTransformers", "Reranking"],
        link: "https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG"
      },
      {
        name: "AI Agent Workflow Experiments",
        description: "Explored agentic workflow patterns for coordinating LLM tasks and tool-driven application logic.",
        tags: ["Agentic Workflows", "LLMs", "Workflow Design"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "APX — Accounts Payable Exception Agent",
        description: "Built an autonomous financial agent for resolving accounts-payable anomalies. Designed a deterministic risk engine that retrieves vendor evidence, cross-references temporal data, and applies strict guardrails before suggesting resolution actions.",
        tags: ["Python", "Guardrails", "Financial Automation", "LLMs"],
        link: "https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent"
      },
      {
        name: "Intelligent Recruitment Platform",
        description: "Designed an AI pipeline for an Applicant Tracking System (ATS). Built custom NLP models to parse resume data, match semantic intent against job descriptions, and extract structured candidate profiles using zero-shot classification.",
        tags: ["NLP", "Zero-Shot Classification", "Transformers", "FastAPI"],
        link: "https://github.com/eklakhdewan"
      }
    ],
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
    pitch: "I design explainable ML models, retrieval architectures, and scalable end-to-end automation systems with a focus on metrics and reproducibility.",
    accent: "#526174",
    projects: [
      {
        name: "AI-Powered Job Recommendations Dashboard",
        description: "Engineered a recommendation engine that converts unstructured resumes into actionable job matches. Utilized TF-IDF vectors alongside dense semantic embeddings (SentenceTransformers) to calculate relevance scores, exposed through an interactive Streamlit dashboard.",
        tags: ["scikit-learn", "Streamlit", "Semantic Search", "Embeddings"],
        link: "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Insurance End-to-End Claims Automation",
        description: "Built a machine-learning workflow for insurance claims data covering ingestion, feature engineering, classification, and anomaly detection.",
        tags: ["Python", "XGBoost", "Data Pipelines", "Classification"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Enterprise RAG Evaluation Pipeline",
        description: "Built the evaluation framework for an AI search platform. Implemented automated testing for Recall@5, Mean Reciprocal Rank (MRR), and nDCG to statistically prove retrieval improvements over baseline models.",
        tags: ["Evaluation Metrics", "MRR", "nDCG", "Statistical Testing"],
        link: "https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG"
      }
    ],
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
    pitch: "I build reliable, observable backend systems that orchestrate complex AI workflows, retrieve data at scale, and execute safely.",
    accent: "#101a2b",
    projects: [
      {
        name: "APX — Exception Resolution Architecture",
        description: "Architected a financial exception resolution system prioritizing system reliability. Implemented deterministic validation, idempotency keys, retry mechanisms with exponential backoff, and dead-letter queues to ensure no transaction data is lost.",
        tags: ["System Design", "Idempotency", "Python", "Observability"],
        link: "https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent"
      },
      {
        name: "AI-Powered Business Operations SaaS",
        description: "Designed the backend architecture for a multi-tenant business operations platform. Utilized NestJS for scalable endpoints, integrated BullMQ and Redis for asynchronous AI task processing, and containerized the microservices using Docker.",
        tags: ["NestJS", "BullMQ", "Redis", "Docker", "Microservices"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Job Radar (Automated Pipeline)",
        description: "Built a semi-automated CI/CD pipeline using GitHub Actions to continuously scrape, parse, and evaluate job postings. Integrated Python scripts to execute cron jobs that update a centralized database dynamically.",
        tags: ["GitHub Actions", "CI/CD", "Python Automation", "Cron Jobs"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Inventory & Order Management System",
        description: "Built a Java/JDBC backend with a normalized PostgreSQL schema and transaction-oriented database operations.",
        tags: ["Java", "JDBC", "PostgreSQL", "ACID Compliance"],
        link: "https://github.com/eklakhdewan"
      }
    ],
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
    pitch: "I turn unstructured data into explainable insights and robust predictive models, backing every decision with statistical evidence.",
    accent: "#b08d57",
    projects: [
      {
        name: "AI-Powered Job Recommendations (Data Modeling)",
        description: "Conducted extensive exploratory data analysis on resumes and job descriptions. Extracted key features using TF-IDF and word embeddings. Modeled job discovery using cosine similarity to rank candidates, providing explainable skill-gap analysis.",
        tags: ["EDA", "scikit-learn", "Cosine Similarity", "NLP"],
        link: "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Insurance End-to-End Claims Automation",
        description: "Analyzed historical insurance claims data to identify fraud patterns. Performed rigorous statistical testing, handled class imbalances using SMOTE, and trained predictive models with high precision/recall trade-offs.",
        tags: ["Statistical Testing", "SMOTE", "Predictive Modeling", "Pandas"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Personal Finance & Shared Budgeting Platform",
        description: "Engineered the data layer for a personal finance app. Built complex SQL queries for aggregations, designed schemas for time-series expense tracking, and generated automated monthly analytics reports.",
        tags: ["Time-series Analysis", "SQL", "Data Modeling"],
        link: "https://github.com/eklakhdewan"
      }
    ],
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
    pitch: "I transform complex datasets into clear, actionable dashboards and automated reports to drive business intelligence.",
    accent: "#557a68",
    projects: [
      {
        name: "AI-Powered Job Recommendations Dashboard",
        description: "Designed an interactive Streamlit application that visualizes skill gaps and candidate rankings. Built intuitive data tables and charts that make the underlying machine learning logic transparent to end-users.",
        tags: ["Streamlit", "Data Visualization", "Dashboarding"],
        link: "https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Inventory & Order Management System (Analytics)",
        description: "Created sales analytics queries using SQL joins and window functions and added CSV reporting workflows.",
        tags: ["SQL", "Window Functions", "Reporting", "CSV Automation"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Personal Finance & Shared Budgeting Platform",
        description: "Developed visual dashboards for expense tracking. Grouped transaction data by category and time periods to provide users with clear, actionable insights into their spending habits.",
        tags: ["Dashboards", "Business Intelligence", "Data Aggregation"],
        link: "https://github.com/eklakhdewan"
      }
    ],
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
    pitch: "I build responsive, full-stack web applications with robust backend APIs, multi-tenant architectures, and real-time capabilities.",
    accent: "#314b60",
    projects: [
      {
        name: "AI-Powered Business Operations SaaS",
        description: "Built a full-stack web application using React and NestJS, including authentication, role-based access control, and database operations.",
        tags: ["React", "NestJS", "Multi-tenant SaaS", "TypeScript"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Real-Time Collaborative Project Management",
        description: "Developed a collaborative workspace application with real-time synchronization using WebSockets and optimistic UI patterns.",
        tags: ["WebSockets", "Optimistic UI", "JavaScript", "Real-time"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Intelligent Recruitment Platform (ATS)",
        description: "Built a full-stack Applicant Tracking System. Connected a responsive React frontend to a high-performance FastAPI backend, allowing HR teams to seamlessly upload, parse, and manage candidate resumes.",
        tags: ["FastAPI", "React", "Full-Stack Development"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Portfolio Site Architecture",
        description: "Designed a single-page, dynamically routed portfolio utilizing Vite, vanilla JavaScript, and semantic HTML. Implemented a custom LLM concierge (Haya) via OpenRouter API and set up automated CI/CD for GitHub Pages deployment.",
        tags: ["HTML/CSS/JS", "Vite", "OpenRouter API", "CI/CD"],
        link: "https://github.com/eklakhdewan/trial-portfolio"
      }
    ],
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
      { value: "91", label: "TaxTrace backend tests" },
      { value: "AI", label: "Systems focus" }
    ],
    capabilities: {
      "AI & LLM": ["RAG", "Agentic workflows", "LLM API integration", "AI task orchestration"],
      "Retrieval & NLP": ["Hybrid retrieval", "Evidence pipelines", "Embeddings"],
      "Backend & Data": ["FastAPI", "NestJS", "PostgreSQL", "REST APIs", "Async processing"],
      "Infrastructure": ["Docker", "Redis", "BullMQ", "GitHub Actions", "Cloudflare Workers"],
      "Frontend": ["TypeScript", "React", "Next.js", "Vite"]
    },
    engineeringSignals: ["Idempotency", "Retries", "Persistence", "Observability", "CI/CD", "91 backend tests in TaxTrace Stage 6"]
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


const PROJECT_ENRICHMENTS = {
  "Enterprise RAG / AI Search Platform": {
    featured: true,
    category: "AI Search / Retrieval Engineering",
    problem: "Enterprise documents are difficult to search reliably when keyword and semantic retrieval disagree and generated answers can drift beyond the evidence.",
    architecture: "Document ingestion → chunking → dense retrieval with FAISS → sparse retrieval with BM25 → hybrid fusion → cross-encoder reranking → evidence-constrained generation → citation validation.",
    engineering: ["Dense + sparse retrieval", "Hybrid fusion", "Cross-encoder reranking", "Citation mapping", "Faithfulness verification", "Pipeline observability"],
    evidence: "Built around explicit retrieval and grounding stages so relevance and answer provenance can be inspected independently.",
    metrics: ["Recall@K", "MRR", "nDCG"],
    stack: ["Python", "FastAPI", "FAISS", "BM25", "SentenceTransformers", "React"]
  },
  "APX — Accounts Payable Exception Agent": {
    featured: true,
    category: "Agentic Systems / Financial Automation",
    problem: "Accounts-payable exceptions require evidence gathering and controlled resolution rather than unconstrained LLM decisions.",
    architecture: "Evidence corpus → BM25 + dense retrieval → hybrid fusion → cross-encoder reranking → evidence validity checks → deterministic decision pipeline → persistence.",
    engineering: ["Deterministic foundation", "Hybrid evidence retrieval", "RRF fusion", "Cross-encoder reranking", "Evidence validity checks", "Persistence"],
    evidence: "The project was developed in staged phases from deterministic foundation through retrieval, agent, decision pipeline, and persistence.",
    stack: ["Python", "BM25", "Dense Retrieval", "Reranking", "LLMs", "SQLite"]
  },
  "APX — Exception Resolution Architecture": {
    featured: true,
    category: "AI Systems / Backend Architecture",
    problem: "Exception-resolution workflows need controlled execution, traceability, and failure handling before automated actions can be trusted.",
    architecture: "Evidence retrieval → validation → deterministic decision logic → guarded agent workflow → persistence and audit trail.",
    engineering: ["Idempotency", "Retry handling", "Guardrails", "Evidence validation", "Persistence", "Observability"],
    evidence: "APX was developed through five documented phases: deterministic foundation, retrieval, agent, decision pipeline, and persistence foundation.",
    stack: ["Python", "BM25", "Dense Retrieval", "FastAPI", "SQLite", "LLMs"]
  },
  "AI-Powered Job Recommendations Dashboard": {
    featured: true,
    category: "ML / Recommendation",
    problem: "Job discovery requires matching unstructured resume content against job descriptions while preserving an interpretable relevance signal.",
    architecture: "Resume/job text → TF-IDF representation + dense embeddings → similarity scoring → ranked recommendations → Streamlit dashboard.",
    engineering: ["Text normalization", "TF-IDF", "Dense embeddings", "Semantic matching", "Skill-gap analysis", "Interactive reporting"],
    evidence: "Combines sparse lexical matching with semantic embeddings instead of relying on a single representation.",
    stack: ["Python", "scikit-learn", "SentenceTransformers", "Streamlit", "Pandas"]
  },
  "AI-Powered Business Operations SaaS": {
    category: "Full-Stack / AI Systems",
    problem: "Business workflows need a multi-tenant application layer capable of handling asynchronous AI tasks without coupling user requests to long-running processing.",
    architecture: "React frontend → NestJS API → PostgreSQL → Redis/BullMQ task processing → AI service integration → Dockerized deployment.",
    engineering: ["Multi-tenancy", "RBAC", "Async processing", "Queue-based execution", "API design", "Containerization"],
    evidence: "The architecture separates synchronous application requests from background AI workloads.",
    stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Docker"]
  },
  "Intelligent Recruitment Platform": {
    category: "AI / NLP",
    problem: "Recruitment workflows require structured candidate information and relevance matching from unstructured resumes and job descriptions.",
    architecture: "Resume ingestion → parsing → structured profile extraction → lexical/semantic matching → candidate ranking → API delivery.",
    engineering: ["Resume parsing", "NLP preprocessing", "Semantic matching", "Structured extraction", "API integration"],
    evidence: "Designed as an end-to-end pipeline rather than a standalone model, connecting document processing to ranking and application delivery.",
    stack: ["Python", "FastAPI", "NLP", "Transformers", "React"]
  },
  "Portfolio Site Architecture": {
    category: "Frontend / AI Integration",
    problem: "A recruiter-facing portfolio needs role-specific content without duplicating pages and needs an AI concierge without exposing provider credentials.",
    architecture: "Vite SPA → hash-based role routing → data-driven renderer → Haya client → Cloudflare Worker → OpenRouter.",
    engineering: ["Data-driven rendering", "Role-based views", "GitHub Pages deployment", "Cloudflare Worker proxy", "Secret isolation", "LLM integration"],
    evidence: "The public frontend contains no OpenRouter API secret; Haya requests are routed through the Cloudflare Worker.",
    stack: ["Vite", "Vanilla JavaScript", "HTML/CSS", "Cloudflare Workers", "OpenRouter", "GitHub Actions"]
  },
  "TaxTrace": {
    featured: true,
    category: "AI-Assisted Tax Reconciliation / Compliance",
    problem: "Tax reconciliation workflows can require manual comparison, exception investigation, and fragmented notice-response handling.",
    architecture: "FastAPI backend → SQLAlchemy/PostgreSQL → reconciliation and exception workflow → Next.js review workspace → React Query → Tailwind UI → Alembic migrations.",
    engineering: ["Exception review workspace", "Relational persistence", "Schema migrations", "Review workflows", "API-driven frontend", "Tested backend changes"],
    evidence: "Stage 6 added task descriptions, exception and notice-case relationships, and a drafts model; the backend test suite had 91 passing tests for the stage.",
    metrics: ["91 backend tests passed at Stage 6 checkpoint"],
    stack: ["FastAPI", "Next.js", "TypeScript", "SQLAlchemy", "PostgreSQL", "React Query", "Tailwind CSS", "Alembic"]
  }
};

Object.values(ROLES).forEach(role => {
  role.projects.forEach(project => {
    const enrichment = PROJECT_ENRICHMENTS[project.name];
    if (enrichment) Object.assign(project, enrichment);
  });
});

const TAXTRACE_PROJECT = {
  name: "TaxTrace",
  description: "AI-assisted tax reconciliation and compliance platform focused on turning GST discrepancies into explainable, reviewable, and actionable workflows.",
  link: "https://github.com/Eklakh-AI-Engineer/TaxTrace",
  tags: ["FastAPI", "Next.js", "PostgreSQL", "SQLAlchemy", "Alembic"],
  featured: true,
  category: "AI-Assisted Tax Reconciliation / Compliance",
  problem: "Tax reconciliation workflows can require manual comparison, exception investigation, and fragmented notice-response handling.",
  architecture: "FastAPI backend → SQLAlchemy/PostgreSQL → reconciliation and exception workflow → Next.js review workspace → React Query → Tailwind UI → Alembic migrations.",
  engineering: ["Exception review workspace", "Relational persistence", "Schema migrations", "Review workflows", "API-driven frontend", "Tested backend changes"],
  evidence: "Stage 6 added task descriptions, exception and notice-case relationships, and a drafts model; the backend test suite had 91 passing tests for the stage.",
  metrics: ["91 backend tests passing at Stage 6"],
  stack: ["FastAPI", "Next.js", "TypeScript", "SQLAlchemy", "PostgreSQL", "React Query", "Tailwind CSS", "Alembic"]
};

["ai-engineer", "ai-systems", "web-developer"].forEach(roleId => {
  const role = ROLES[roleId];
  if (role && !role.projects.some(p => p.name === "TaxTrace")) {
    role.projects.unshift({ ...TAXTRACE_PROJECT });
  }
});


// Normalize every project to the same schema so the renderer and Haya can consume it consistently.
Object.values(ROLES).forEach(role => {
  role.projects.forEach(project => {
    project.category ||= role.title;
    project.stack ||= [...(project.tags || [])];
    project.engineering ||= [...(project.tags || [])];
    project.metrics ||= [];
    project.featured ||= false;
  });
});
