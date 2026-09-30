# Eklakh Dewan — AI Systems Engineer Portfolio

A role-aware personal portfolio focused on **AI systems, retrieval engineering, agentic workflows, backend engineering, and evidence-driven project presentation**.

Live site: https://eklakhdewan.github.io/trial-portfolio/

This repository contains the **Trial Portfolio**, an independent portfolio implementation. It is intentionally maintained separately from Eklakh Dewan's main portfolio.

---

## Overview

The portfolio is built around one professional identity:

> **AI Systems Engineer / AI Engineer**

The site presents six role-specific perspectives without creating six unrelated professional identities:

- AI Engineer
- ML Engineer
- AI Systems Engineer
- Data Scientist
- Data Analyst
- Web Developer

The role system changes the **emphasis, project ordering, capabilities, and resume** while keeping the underlying professional history consistent.

### Primary technical focus

- Retrieval-Augmented Generation (RAG)
- Dense and sparse retrieval
- Hybrid retrieval and reranking
- Evidence-grounded generation
- Agentic workflows
- LLM application engineering
- Python/FastAPI backend systems
- Full-stack application development

---

## Key Features

### Role-aware portfolio architecture

Portfolio content is driven from a centralized role/data model rather than duplicated across separate pages.

Each role can define:

- professional positioning
- relevant projects
- technical skills
- capabilities
- experience
- education
- credentials
- role-specific resume

### Haya — evidence-grounded portfolio assistant

**Haya** helps visitors navigate documented portfolio evidence, including projects, retrieval techniques, backend technologies, role relevance, experience, resumes, and repository links.

Haya is intentionally instructed to avoid fabricated metrics, unsupported experience, production claims, or promotional assertions.

Architecture:

```text
Visitor
   │
   ▼
Trial Portfolio
   │
   ▼
Cloudflare Worker
   │
   ▼
OpenRouter
```

The OpenRouter API key is kept server-side in the Cloudflare Worker rather than exposed in frontend JavaScript.

### Recruiter-oriented navigation

The interface prioritizes identity, specialization, technical evidence, relevant resume, GitHub repositories, and contact.

### Progressive enhancement

The initial HTML contains meaningful identity, positioning, resume, and contact content so the page is not completely dependent on client-side rendering.

### Contact

The portfolio uses Formspree for direct contact-form submission.

---

## Selected Engineering Evidence

### Enterprise RAG / AI Search Platform

Retrieval and generation pipeline combining dense retrieval, FAISS, BM25, hybrid retrieval, rank fusion, cross-encoder reranking, and citation validation.

Repository: https://github.com/Eklakh-AI-Engineer/ENTERPRISE-RAG

### APX — Autonomous Accounts Payable Exception Resolution Agent

Accounts-payable exception resolution system developed through deterministic foundation, retrieval, agent, decision-pipeline, and persistence stages.

Repository: https://github.com/Eklakh-AI-Engineer/APX-Autonomous-Accounts-Payable-Exception-Resolution-Agent

### TaxTrace

Backend/full-stack engineering project using FastAPI, Next.js, TypeScript, SQLAlchemy, PostgreSQL, React Query, Tailwind CSS, and Alembic.

Repository: https://github.com/Eklakh-AI-Engineer/TaxTrace

### AI-Powered Job Recommendations

Applied ML/recommendation project using TF-IDF, semantic embeddings, relevance scoring, and Streamlit.

Repository: https://github.com/Eklakh-AI-Engineer/AI-Powered-Job-Recommendations-Dashboard

### HCAD-RAG

Medical-domain retrieval research project exploring context-distraction mitigation using anisotropic matrix decoupling, biomedical embeddings, relation extraction, and MedQA evaluation.

Research claims are kept separate from verified implementation evidence.

---

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript
- Vite
- responsive design
- semantic HTML

### AI / Retrieval

- RAG
- embeddings
- dense retrieval
- BM25
- hybrid retrieval
- reranking
- LLM APIs
- agentic workflows

### Backend / Data

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- REST APIs

### Infrastructure

- GitHub Pages
- GitHub Actions
- Cloudflare Workers
- OpenRouter
- Formspree

The portfolio intentionally avoids introducing a heavyweight frontend framework when the existing static architecture is sufficient.

---

## Architecture

```text
                         ┌──────────────────────┐
                         │      Visitor         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Vite Static App   │
                         │                      │
                         │  index.html          │
                         │  src/main.js         │
                         │  src/router.js       │
                         │  src/render.js       │
                         │  src/data.js         │
                         │  src/styles.css      │
                         └───────┬──────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        Role routing        Project data       Contact form
              │                  │                  │
              │                  │                  ▼
              │                  │              Formspree
              │                  │
              ▼                  ▼
             Haya AI assistant
                    │
                    ▼
             Cloudflare Worker
                    │
                    ▼
                OpenRouter
```


---

## Repository Structure

```text
trial-portfolio/
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── robots.txt
├── sitemap.xml
├── cloudflare-worker.js
├── public/
├── src/
│   ├── main.js
│   ├── router.js
│   ├── render.js
│   ├── data.js
│   ├── bot.js
│   └── styles.css
└── .github/
    └── workflows/
        └── deploy.yml
```

The asset inventory may evolve as resumes and portfolio media are updated.

---

## Role Data Model

Role-specific content is centralized in `src/data.js`.

A simplified role structure is:

```json
{
  "id": "ai-engineer",
  "title": "AI Engineer",
  "resumeFile": "Eklakh_Dewan_AI_Engineer.pdf",
  "pitch": "...",
  "projects": [],
  "skills": [],
  "experience": []
}
```

---

## Haya Security Model

The browser does **not** contain the OpenRouter API key.

```text
Browser
   │
   │ POST
   ▼
Cloudflare Worker
   │
   ▼
OpenRouter
```

The Worker applies defensive controls including allowed-origin validation, POST-only API access, request-size limits, message-count limits, message-length limits, model allowlisting, and sanitized error responses.

For additional production hardening, platform-level rate limiting should also be enabled in Cloudflare.

---

## SEO

The Trial Portfolio is intentionally indexed as its own site.

Configured metadata includes:

- page title
- meta description
- canonical URL
- Open Graph metadata
- Twitter/X card metadata
- JSON-LD Person schema
- `robots.txt`
- `sitemap.xml`

Canonical URL: https://eklakhdewan.github.io/trial-portfolio/

The Trial Portfolio and Main Portfolio remain separate sites.

---

## Accessibility

The implementation includes accessibility-oriented foundations such as:

- semantic landmarks
- skip navigation
- logical heading structure
- keyboard-accessible controls
- visible focus states
- `aria-expanded` navigation state
- Haya dialog state
- live message updates
- reduced-motion support
- descriptive form labels
- responsive layout

Accessibility should be validated against the deployed site after significant visual or interaction changes.

---

## Performance Philosophy

The portfolio is intentionally lightweight.

Principles:

- minimal dependencies
- static hosting
- small JavaScript surface
- no unnecessary frontend framework
- restrained animation
- optimized assets
- progressive enhancement

No performance score is claimed unless it has been measured against the current deployed build.

---

## Local Development

### Requirements

- Node.js
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Deployment

The portfolio is deployed through GitHub Pages.

The GitHub Actions workflow builds the Vite application and deploys the generated static artifact.

```text
git push
   │
   ▼
GitHub Actions
   │
   ▼
npm install
   │
   ▼
npm run build
   │
   ▼
GitHub Pages
```

Published site: https://eklakhdewan.github.io/trial-portfolio/

---

## Content and Evidence Policy

The portfolio follows an evidence-first content policy.

Do not add claims such as production-grade, enterprise-grade, highly scalable, industry-leading, significantly improved accuracy, high-concurrency, large user base, production deployment, patent status, or client results unless supported by verifiable evidence.

For metrics, distinguish between measured result, evaluation metric, experiment, target, and design goal.

This is particularly important for AI/RAG projects where architecture alone does not prove production performance.

---

## QA Checklist

### Repository-verified

- [x] Home and role-aware routing are implemented.
- [x] Six role profiles are defined.
- [x] Haya assistant integration is present.
- [x] Contact form integration is present.
- [x] Role-specific resume files are referenced.
- [x] Verified project repository links are used where available.
- [x] Trial-specific canonical, robots, and sitemap configuration is present.
- [x] Haya worker validation and model allowlisting are implemented.

### Browser-level validation still required

- [ ] Lighthouse audit
- [ ] axe accessibility audit
- [ ] 320px / 375px / 390px / 430px layouts
- [ ] tablet and desktop visual validation
- [ ] 200% zoom
- [ ] keyboard-only end-to-end test
- [ ] reduced-motion end-to-end test
- [ ] live Formspree submission
- [ ] live Haya conversation
- [ ] production visual regression check

This distinction is intentional: repository inspection is not presented as browser-level testing.

---

## Design Principles

The Trial Portfolio aims for:

**Technical · Modern · Restrained · Evidence-driven**

Motion, role-specific styling, and technical visual elements should support navigation and evidence rather than compete with them.

The intended experience is an engineer's technical interface—not a generic template with an AI chatbot attached.

---

## Repository Goals

This repository demonstrates both the portfolio and the engineering decisions behind it:

- role-aware content architecture
- modular JavaScript
- progressive enhancement
- AI assistant integration
- server-side API-key isolation
- static deployment
- accessibility-conscious interaction design
- evidence-driven technical presentation

The implementation favors **small architectural improvements over unnecessary rewrites**.

---

## License

This repository is a personal portfolio project.

Unless otherwise stated, portfolio content, personal information, resumes, project descriptions, and visual assets are not licensed for reuse.