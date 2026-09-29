export const ROLES = {
  "ai-engineer": {
    id: "ai-engineer",
    resumeFile: "Eklakh_Dewan_AI_Engineer.pdf",
    title: "AI Engineer",
    pitch: "I architect and deploy production-grade RAG systems, agentic workflows, and robust AI pipelines that prioritize grounding and mitigate hallucinations.",
    accent: "#3e5f7a",
    projects: [
      {
        name: "Enterprise RAG / AI Search Platform",
        description: "Engineered a highly observable retrieval and generation platform. Combined document ingestion pipelines, dense vector retrieval (FAISS), and sparse retrieval (BM25) with hybrid rank fusion. Implemented cross-encoder reranking to ensure top-K relevance. Built citation validation mechanics to force the LLM to ground its answers strictly in the retrieved context.",
        tags: ["FastAPI", "React", "FAISS", "SentenceTransformers", "Reranking"],
        link: "https://github.com/eklakhdewan/-ENTERPRISE-RAG"
      },
      {
        name: "AgentForge AI",
        description: "Developed a no-code agentic workflow builder allowing non-technical users to orchestrate complex LLM tasks. Implemented a YAML-driven declarative engine parsing natural language intents into LangGraph state machines, deployed as highly concurrent FastAPI endpoints.",
        tags: ["LangGraph", "FastAPI", "Agentic Workflows", "YAML Parsing"],
        link: "https://github.com/eklakhdewan/AgentForge"
      },
      {
        name: "APX — Accounts Payable Exception Agent",
        description: "Built an autonomous financial agent for resolving accounts-payable anomalies. Designed a deterministic risk engine that retrieves vendor evidence, cross-references temporal data, and applies strict guardrails before suggesting resolution actions.",
        tags: ["Python", "Guardrails", "Financial Automation", "LLMs"],
        link: "https://github.com/eklakhdewan/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent"
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
        description: "Spearheaded the integration of the Google Gemini API into enterprise workflows. Developed and optimized resume parsing modules and job-matching algorithms using TF-IDF and dense embeddings, significantly improving recommendation accuracy."
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
        link: "https://github.com/eklakhdewan/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Insurance End-to-End Claims Automation",
        description: "Developed a full-lifecycle machine learning pipeline to automate insurance claims processing. Handled raw data ingestion, feature engineering, and trained gradient boosting models to classify claim validity and detect fraudulent anomalies.",
        tags: ["Python", "XGBoost", "Data Pipelines", "Classification"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Enterprise RAG Evaluation Pipeline",
        description: "Built the evaluation framework for an AI search platform. Implemented automated testing for Recall@5, Mean Reciprocal Rank (MRR), and nDCG to statistically prove retrieval improvements over baseline models.",
        tags: ["Evaluation Metrics", "MRR", "nDCG", "Statistical Testing"],
        link: "https://github.com/eklakhdewan/-ENTERPRISE-RAG"
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
        link: "https://github.com/eklakhdewan/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent"
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
        description: "Developed a robust transaction-heavy backend using Java and JDBC. Designed a normalized PostgreSQL schema that handles high-concurrency order placement while maintaining strict ACID compliance.",
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
        description: "Integrated third-party LLM APIs into stable backend architectures. Focused on error handling, rate limiting, and ensuring high availability for AI-driven endpoints."
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
        link: "https://github.com/eklakhdewan/AI-Powered-Job-Recommendations-Dashboard"
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
        link: "https://github.com/eklakhdewan/AI-Powered-Job-Recommendations-Dashboard"
      },
      {
        name: "Inventory & Order Management System (Analytics)",
        description: "Created comprehensive sales analytics pipelines. Wrote complex SQL joins and window functions to generate daily and monthly revenue reports, and implemented automated CSV export functionality for stakeholders.",
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
        description: "Engineered a full-stack, multi-tenant SaaS application. Built the frontend with React for a dynamic user experience and developed a robust NestJS backend handling authentication, role-based access control, and database operations.",
        tags: ["React", "NestJS", "Multi-tenant SaaS", "TypeScript"],
        link: "https://github.com/eklakhdewan"
      },
      {
        name: "Real-Time Collaborative Project Management",
        description: "Developed a collaborative workspace application featuring real-time synchronization. Implemented WebSockets for instant state updates and engineered optimistic UI patterns to ensure a seamless, lag-free user experience.",
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
        link: "https://eklakhdewan.com.np/"
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
