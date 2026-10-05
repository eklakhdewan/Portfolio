# Eklakh Dewan — AI Systems Engineer Portfolio

**Live site:** https://eklakhdewan.com.np/

Production portfolio for **AI systems, retrieval engineering, agentic workflows, backend systems, and applied AI**. The site uses a data-driven role router so recruiters can inspect the same engineering profile through targeted views without duplicating professional history.

## Role views

- **AI Engineer** — RAG, agentic workflows, applied AI pipelines
- **ML Engineer** — recommendation systems, retrieval evaluation, applied ML
- **AI Systems Engineer** — backend architecture, orchestration, persistence, reliability
- **Data Scientist** — NLP, similarity modelling, predictive workflows
- **Data Analyst** — SQL, dashboards, reporting, data visualization
- **Web Developer** — frontend, APIs, full-stack and AI integrations

## Flagship engineering work

### Enterprise RAG / AI Search Platform

Evidence-grounded retrieval system combining dense retrieval, BM25, hybrid/RRF fusion, cross-encoder reranking, citation validation, and human-verified evaluation.

Current portfolio evidence:
- 50-query frozen benchmark
- 780 human relevance judgments
- 780 provenance checks
- Hybrid Recall@10 improvement: **+9.9%**
- Hybrid nDCG@10 improvement: **+7.0%**
- Query rewriting evaluated independently and kept disabled by default after mixed retrieval results

Repository: https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG

### APX — Accounts Payable Exception Resolution Agent

Evidence-driven exception-resolution architecture developed through deterministic foundation, retrieval, agent, decision-pipeline, and persistence phases.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

### TaxTrace

AI-assisted tax reconciliation and compliance platform with a FastAPI backend and Next.js exception-review workspace.

Stack: FastAPI, Next.js, TypeScript, SQLAlchemy, PostgreSQL, React Query, Tailwind CSS, Alembic.

Recorded audit evidence (2026-10-05):
- 134 backend tests passing
- 15 frontend tests passing
- TypeScript clean
- reconciliation benchmark precision/recall: 1.000 on reported classes
- security audit: 5/5
- reconciliation core is the strongest verified workflow
- AI explanation/notice generation remains mock-backed
- currently local-run development

Repository: https://github.com/Eklakh-AI-Engineer/TaxTrace

### Tackboard

Real-time collaborative Kanban application using Supabase Auth, PostgreSQL/RLS, Supabase Realtime, and Vercel deployment.

Repository: https://github.com/Eklakh-Web-Development/Tackboard
Demo: https://tackboard-qpxfbxvx7-23ad070-3509s-projects.vercel.app/

### AI-Powered Job Recommendations Dashboard

Recommendation system combining TF-IDF and dense semantic embeddings to rank job matches from unstructured resume and job-description text.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard

### Insurance End-to-End Claims Automation

Applied ML workflow covering claims ingestion, feature engineering, classification, and anomaly-oriented analysis.

Repository: https://github.com/Eklakh-AI-Engineer/Insurance-End-to-End-Claims-Automation

## Haya — portfolio assistant

Haya is the portfolio's evidence-oriented AI assistant.

Architecture:

```
Visitor
  ↓
Vite / Vanilla JS
  ↓
Browser-side validation/cache
  ↓
Cloudflare Worker
  ↓
OpenRouter
```

The Worker keeps the provider API key server-side and applies origin validation, request limits, message-count limits, rate limiting, prompt-injection checks, model allowlisting, profile grounding, response limits, and edge caching.

Simple portfolio facts can be handled locally; LLM-backed questions are routed through the Worker.

## Technology

**Frontend**
- HTML
- CSS
- Vanilla JavaScript
- Vite
- GitHub Pages

**AI / retrieval**
- RAG
- Dense retrieval
- BM25
- Hybrid retrieval / RRF
- Cross-encoder reranking
- Evidence-grounded generation
- Agentic workflows
- LLM APIs

**Backend / infrastructure**
- Python
- FastAPI
- PostgreSQL
- Cloudflare Workers
- OpenRouter
- Formspree
- GitHub Actions

## Repository structure

```text
Portfolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── render.js
│   ├── data.js
│   ├── bot.js
│   ├── haya-interview.js
│   ├── haya-knowledge.js
│   └── styles.css
├── public/
├── tests/
├── cloudflare-worker.js
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

Haya policy/runtime checks:

```bash
npm run test:haya-all
```

## Evidence policy

The portfolio distinguishes between:
- implemented functionality
- measured results
- evaluation evidence
- design goals
- work that is still incomplete or mock-backed

No metric, deployment claim, certification, employer claim, or performance result should be presented as verified without supporting evidence.

## SEO

The site includes:
- canonical URL
- Open Graph metadata
- Twitter metadata
- JSON-LD Person schema
- robots.txt
- sitemap.xml
- semantic static landing content for crawlers

## Contact

Email: eklakh.inplace@gmail.com  
GitHub: https://github.com/eklakhdewan  
LinkedIn: https://www.linkedin.com/in/eklakhdewan/

## License

Personal portfolio. Unless otherwise stated, portfolio content, personal information, resumes, and visual assets are not licensed for reuse.
