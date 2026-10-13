# Eklakh Dewan — AI Systems Engineer Portfolio

Live portfolio: **https://eklakhdewan.com.np/**

A personal engineering portfolio focused on applied AI systems, retrieval engineering, machine-learning workflows, and software engineering. The site uses a shared project registry with three role-specific views so recruiters can see relevant evidence without duplicating the underlying experience.

## Career views

- **AI & AI Systems Engineer** — RAG, hybrid retrieval, agentic workflows, evidence-grounded generation, and AI reliability.
- **Data & ML Engineer** — data processing, embeddings, ranking, NLP, and evaluation.
- **Software Engineer** — backend APIs, persistence, testing, frontend integration, and deployment.

## Selected projects

### Enterprise RAG / AI Search
Hybrid retrieval using dense search, BM25, fusion, and cross-encoder reranking, with evidence-grounded generation and benchmark-driven evaluation.

- Benchmark: 50 queries and 780 human relevance judgments.
- Reported hybrid retrieval changes: Recall@10 **+9.9%** and nDCG@10 **+7.0%** against the documented baseline.
- Query rewriting was evaluated separately and remains disabled by default after mixed retrieval results.
- Status: research/engineering system; production multi-tenant release is not claimed.

Repository: https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG

### AI Job Agent
Job discovery, normalization, deduplication, candidate–job ranking, and application-workflow preparation with a human-approval boundary.

- Status: pre-v1.0 validation. Benchmark provenance, ranking baseline, monitoring, and backup/restore verification remain release gates.
- Current ranking results should not be interpreted as production performance.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Job-Agent

### APX — Accounts Payable Exception Resolution Agent
An evidence-grounded workflow for investigating invoice exceptions and preparing reviewable decision proposals. Deterministic validation, hybrid retrieval, bounded investigation, persistence, and approval boundaries are designed to keep proposals separate from financial authorization.

- Status: core engineering foundations implemented; release validation remains in progress.
- Production ERP integration and autonomous financial execution are not claimed.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

### TaxTrace
AI-assisted tax reconciliation and compliance workflow with a FastAPI backend and a Next.js review interface.

- The repository documents automated backend/frontend tests and reconciliation benchmarks.
- Some AI flows use a mock provider; production AI-provider controls, observability, and production deployment remain pending.

Repository: https://github.com/Eklakh-AI-Engineer/TaxTrace

### Additional work
- **ClaimAI:** https://github.com/Eklakh-AI-Engineer/Insurance-End-to-End-Claims-Automation
- **AI Job Recommendations:** https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard
- **Tackboard:** https://github.com/Eklakh-Web-Development/Tackboard

## Haya portfolio assistant

Haya answers questions about the portfolio using role-specific knowledge. Its browser client routes LLM-backed requests through a Cloudflare Worker rather than exposing the provider API key in frontend code. The worker applies request validation, origin controls, rate limiting, model restrictions, and response limits.

## Technology

- **Frontend:** HTML, CSS, JavaScript, Vite
- **AI and retrieval:** Python, RAG, FAISS, BM25, hybrid retrieval, reranking, embeddings, evaluation
- **Backend and infrastructure:** FastAPI, PostgreSQL, Cloudflare Workers, GitHub Actions

## Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

Run Haya tests:

```bash
npm run test:haya-all
```

## Evidence and status policy

The portfolio distinguishes implemented functionality, measured results, test evidence, design goals, and incomplete release work. Metrics are meaningful only within their documented datasets, baselines, and test scope. A passing build or test suite is not, by itself, proof of production readiness.

## Contact

- Website: https://eklakhdewan.com.np/
- Email: eklakh.inplace@gmail.com
- GitHub: https://github.com/eklakhdewan
- LinkedIn: https://www.linkedin.com/in/eklakhdewan/
