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

APX is an **evidence-grounded Accounts Payable exception-resolution system** designed to structure the investigation of invoice mismatches, missing documentation, and policy exceptions. It gathers and ranks supporting evidence, then prepares a reviewable decision proposal rather than treating model output as financial authorization.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

#### Architecture and control boundaries

```text
Exception intake
  → Deterministic validation
  → BM25 + dense retrieval
  → Hybrid/RRF fusion + cross-encoder reranking
  → Bounded agentic investigation
  → Evidence-backed decision proposal
  → Separate authorization / approval boundary
  → Persistence + observability
```

The architecture separates **decision**, **authorization**, and **execution**. Deterministic checks constrain the workflow; retrieval supplies evidence; bounded investigation can gather context; and approval controls are intended to prevent an agent's proposal from becoming an authorized financial action by itself. Persistence and observability provide foundations for inspecting the workflow. These are implementation/design descriptions, not independent proof of end-to-end resolution quality.

#### Current status and release boundary

**Status: Core engineering foundations implemented; release validation remains in progress.**

The current portfolio does not claim production readiness, proven autonomous resolution quality, production ERP integration, or live financial execution. Reproducible test and benchmark results should be reported with their exact test scope, fixture/data context, and limitations. A passing CI run is useful engineering evidence but is not, by itself, release acceptance.

Remaining release validation includes confirming the final regression/evaluation contract, checking decision and approval behavior across adversarial and failure cases, verifying persistence and observability evidence, and recording an explicit release decision. See the repository README for implementation details, current test commands, and the latest project evidence.

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

### 5. ClaimAI — Insurance Claims Automation

Applied ML prototype combining document extraction, fraud scoring, image analysis, payout estimation, and a review/settlement decision path.

Repository: https://github.com/Eklakh-AI-Engineer/Insurance-End-to-End-Claims-Automation

Status: prototype. Production model validation, insurance authorization, and regulatory certification are not claimed.

### 6. Tackboard

Real-time collaborative Kanban application using Supabase Auth, PostgreSQL/RLS, Supabase Realtime, and Vercel deployment.

Repository: https://github.com/Eklakh-Web-Development/Tackboard
Demo: https://tackboard-qpxfbxvx7-23ad070-3509s-projects.vercel.app/

### 7. AI-Powered Job Recommendations Dashboard

Recommendation system combining TF-IDF and dense semantic embeddings to rank job matches from unstructured resume and job-description text.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard

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
