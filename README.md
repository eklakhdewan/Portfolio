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

## Featured engineering work

Projects are ordered by engineering evidence and current relevance. Implementation status is intentionally distinguished from production readiness.

### 1. Enterprise RAG / AI Search Platform

Evidence-grounded retrieval system combining dense retrieval, BM25, hybrid/RRF fusion, cross-encoder reranking, citation validation, and human-verified evaluation.

Current portfolio evidence:
- 50-query frozen benchmark
- 780 human relevance judgments
- 780 provenance checks
- Hybrid Recall@10 improvement: **+9.9%**
- Hybrid nDCG@10 improvement: **+7.0%**
- Query rewriting evaluated independently and kept disabled by default after mixed retrieval results

Repository: https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG

Status: local research/engineering system; production multi-tenant release remains gated.

### 2. AI Job Agent

Job discovery, normalization, deduplication, candidate–job ranking, and application-workflow preparation with a human-approval boundary.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Job-Agent

**Release status: pre-v1.0 validation; not production-certified.** The repository records a mismatch between the frozen workbook hash and the CI input, synthetic benchmark job IDs that are not yet mapped to real persisted jobs for authoritative ranking, and incomplete alert-delivery and backup/restore verification. Do not present its current ranking baseline as production performance.

### 3. APX — Accounts Payable Exception Resolution Agent

Evidence-driven exception-resolution architecture developed through deterministic foundation, retrieval, agent, decision-pipeline, and persistence phases.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

### 4. TaxTrace

AI-assisted tax reconciliation and compliance platform with a FastAPI backend and Next.js exception-review workspace.

Stack: FastAPI, Next.js, TypeScript, SQLAlchemy, PostgreSQL, React Query, Tailwind CSS, Alembic.

Recorded repository evidence:
- 134 backend tests, 15 frontend tests, 7 reconciliation benchmark gate tests, and 32 AI quality-gate tests passing in the documented run
- TypeScript and frontend production build reported clean
- reconciliation benchmark reports 1.000 precision/recall on its reported classes; treat this as benchmark-scoped, not a general production guarantee
- AI explanations and notice generation use a mock provider in verification
- production AI provider/cost controls, observability, staging/production CI/CD, and production deployment remain pending

Status: controlled-pilot application; production deployment is not claimed.

Repository: https://github.com/Eklakh-AI-Engineer/TaxTrace

### 5. Tackboard

Real-time collaborative Kanban application using Supabase Auth, PostgreSQL/RLS, Supabase Realtime, and Vercel deployment.

Repository: https://github.com/Eklakh-Web-Development/Tackboard
Demo: https://tackboard-qpxfbxvx7-23ad070-3509s-projects.vercel.app/

### 6. AI-Powered Job Recommendations Dashboard

Recommendation system combining TF-IDF and dense semantic embeddings to rank job matches from unstructured resume and job-description text.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard

### 7. ClaimAI — Insurance Claims Automation

Applied ML prototype combining document extraction, fraud scoring, image analysis, payout estimation, and a review/settlement decision path.

Repository: https://github.com/Eklakh-AI-Engineer/Insurance-End-to-End-Claims-Automation

Status: prototype. Production model validation, insurance authorization, and regulatory certification are not claimed.

### APX status note

APX is a phased engineering system. Its latest documented milestone is Phase 6D (Observability & Security); the README records 180 passing tests in its regression accounting and a separately reported API suite of 60 passing tests with one expected skip. Production readiness, production ERP integration, and deployment-specific authorization are not claimed.

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
