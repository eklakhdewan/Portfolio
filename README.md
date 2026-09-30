# Eklakh Dewan — AI Systems Engineer Portfolio

Live site: **https://eklakhdewan.github.io/trial-portfolio/**

A role-aware portfolio for **AI systems, RAG/retrieval engineering, agentic workflows, backend systems, and applied AI**.

This is the **Trial Portfolio** and is intentionally maintained separately from Eklakh Dewan's main portfolio.

## What this portfolio shows

The site presents one engineering profile through six recruiter-focused views:

- **AI Engineer** — RAG, agentic workflows, applied AI pipelines
- **ML Engineer** — machine learning, evaluation, recommendation systems
- **AI Systems Engineer** — backend architecture, orchestration, reliability
- **Data Scientist** — NLP, statistical analysis, predictive modeling
- **Data Analyst** — SQL, dashboards, reporting
- **Web Developer** — frontend, APIs, and full-stack applications

Each view changes the emphasis and relevant resume without creating separate professional histories.

## Selected work

### HCAD-RAG
Medical-domain RAG research focused on hierarchical context preservation, evidence-grounded retrieval, reranking, and citation validation.

Current status is intentionally described as **Patent filing in progress · Final year project · KPRIET 2027**. It is not presented as a granted patent.

### Enterprise RAG / AI Search Platform
Retrieval pipeline combining dense retrieval with FAISS, BM25, hybrid fusion, cross-encoder reranking, citation validation, and evidence-constrained generation.

Repository: https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG

### APX — Accounts Payable Exception Resolution Agent
Evidence-driven exception-resolution architecture developed through deterministic foundation, retrieval, agent, decision-pipeline, and persistence stages.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

### TaxTrace
AI-assisted tax reconciliation and compliance platform with a FastAPI backend and Next.js exception-review workspace.

Stack: FastAPI, Next.js, TypeScript, SQLAlchemy, PostgreSQL, React Query, Tailwind CSS, Alembic.

Repository: https://github.com/Eklakh-AI-Engineer/TaxTrace

The Stage 6 checkpoint documented **91 backend tests passing**.

## Haya

**Haya** is the portfolio's evidence-grounded assistant.

Architecture:

```
Visitor
  ↓
Vite / Vanilla JS
  ↓
Browser cache
  ↓
Cloudflare Worker
  ↓
OpenRouter
```

The Worker keeps the OpenRouter API key server-side and applies:

- portfolio-origin CORS validation
- request-size and message-length limits
- message-count validation
- per-IP rate limiting
- prompt-injection rejection
- model allowlisting
- profile-JSON grounding
- concise output limits
- edge-response caching

Simple factual portfolio questions can be answered locally without an LLM. Normal LLM questions use the fast Llama 3.1 8B route; more complex questions can use the stronger Llama 3.3 70B route.

## Technology stack

**Frontend**
- HTML
- CSS
- Vanilla JavaScript
- Vite
- GitHub Pages

**AI / retrieval**
- RAG
- dense retrieval
- BM25
- hybrid retrieval
- reranking
- evidence-grounded generation
- agentic workflows
- LLM APIs

**Backend / infrastructure**
- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Cloudflare Workers
- OpenRouter
- Formspree
- GitHub Actions

## Repository structure

```text
trial-portfolio/
├── index.html
├── cloudflare-worker.js
├── public/
├── src/
│   ├── main.js
│   ├── router.js
│   ├── render.js
│   ├── data.js
│   ├── bot.js
│   └── styles.css
├── tests/
│   └── haya-worker-policy.test.mjs
├── docs/
│   └── CHECKLIST.md
├── robots.txt
└── sitemap.xml
```

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Evidence policy

This portfolio deliberately separates:

- documented implementation
- measured results
- evaluation targets
- design goals
- TODOs requiring additional evidence

No achievement, metric, certification, employer, deployment claim, patent grant, or performance result should be added without supporting evidence.

## GitHub metadata suggestions

**Description**

> Role-aware AI Systems Engineer portfolio focused on RAG, retrieval engineering, agentic workflows, backend systems, and applied AI.

**Topics**

`ai-engineering`, `rag`, `retrieval-augmented-generation`, `llm`, `agentic-ai`, `fastapi`, `vanilla-javascript`, `portfolio`

**Homepage**

> https://eklakhdewan.github.io/trial-portfolio/

The GitHub repository name **trial-portfolio** is already clear and honest about the site's role as a separate trial implementation. A future public-facing rename could be `ai-engineer-portfolio`, but the current URL should not be changed casually because it is already indexed and deployed.

## License

This is a personal portfolio repository. Unless otherwise stated, portfolio content, personal information, resumes, and visual assets are not licensed for reuse.
