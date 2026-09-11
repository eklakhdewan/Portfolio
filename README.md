# Eklakh Dewan portfolio

An accessible, performance-first portfolio for Eklakh Dewan, an AI Systems Engineer focused on reliable retrieval, grounded generation, and applied AI backends.

## Requirements and scope

### Target audience and use cases

- Hiring managers and recruiters skimming for role fit, evidence, and contact information.
- AI/ML engineering teams evaluating retrieval, NLP, backend, and evaluation experience.
- Technical interviewers wanting a concise view of architecture and engineering trade-offs.
- Mentors, collaborators, and engineering reviewers exploring applied AI systems.

### Included deliverables

- One-page portfolio site with About, Experience, Projects/Case Studies, Skills, Education, Certifications, and Contact.
- Print-friendly structure for saving the page as a resume/one-pager PDF.
- Four evidence-aware case studies: Enterprise RAG, AI Job Agent, AI Job Recommendation, and APX.
- Hiring-oriented contact CTA with the verified email and professional profile links from the source document.
- Profile portrait and source-document project screenshots in `public/me.png` and `public/evidence/`.
- Direct Formspree contact form, résumé view/download actions, light/dark theme toggle, and a broader project directory.

## Tech stack and architecture

- **Frontend:** Vite-powered semantic HTML, CSS, and a small JavaScript module. The deliberately low-dependency approach keeps the first paint fast and makes the site easy to host anywhere.
- **Hosting:** GitHub Pages is the default deployment target; Netlify, Cloudflare Pages, or any static host can serve `dist/`.
- **CI/CD:** `.github/workflows/deploy.yml` installs from the lockfile, builds on pushes to `main`, uploads the artifact, and deploys GitHub Pages.
- **Accessibility:** semantic landmarks, one `h1`, skip link, visible focus styles, keyboard-friendly navigation, responsive layout, reduced visual complexity, and no color-only information.
- **Performance target:** Lighthouse Performance, Accessibility, Best Practices, and SEO all at 90+ on the production URL. Keep the page mostly text/CSS, use compressed WebP/AVIF if evidence images are later added, and avoid third-party scripts.

## MVP content map

| Source document area | Portfolio destination |
| --- | --- |
| Professional summary and differentiator | Hero and About |
| Flowrage Technology internship | Experience |
| Enterprise RAG inventory | Featured project and case study |
| AI Job Agent and APX project records | Featured case studies with current status and repository links |
| Job recommendation systems | Project case study |
| Other project inventory | “Also explored” index |
| Skills inventory | Focused Capabilities groups |
| Education and certifications | Education & credentials |
| Achievements | Hero proof point and project evidence |
| Contact/profiles | Contact form, verified links, and résumé actions |

## Section and content guidance

- **Hero:** lead with the differentiator, role, current focus, and three proof points. The first viewport is intentionally scannable in about three seconds.
- **Selected work:** show four strongest projects, with a problem-oriented title, technical tags, and a path to more detail.
- **Case studies:** use Challenge → Approach → Measure. Metrics are framed as evaluation dimensions unless the source explicitly verifies achieved results.
- **Experience:** describe the Flowrage internship through responsibilities and evidenced topics, not inflated outcomes.
- **Skills:** show a curated subset rather than the entire master inventory.
- **Education & credentials:** list the degree and certification names; add issuer dates, badge URLs, and credential IDs only after verification.
- **Contact:** keep one high-contrast CTA above the fold on mobile and desktop.
- **Theme:** the portfolio uses a single premium light corporate theme for a consistent recruiter experience.

### Visual direction

- Deep navy (`#10243e`) communicates technical confidence; electric blue (`#2563eb`) provides action contrast; cyan (`#67e8f9`) highlights active/research signals.
- Inter/system sans-serif typography keeps the page readable and modern.
- Use whitespace, short paragraphs, restrained borders, and system diagrams/screenshots only when they explain architecture.
- Responsive rules collapse grids at 850px and stack content at 560px. No horizontal scrolling is required.

## Project skeleton

```text
.
├── index.html
├── package.json
├── README.md
├── public/
│   ├── me.png
│   ├── Resume.pdf
│   ├── covers/
│   └── evidence/
├── src/
│   ├── main.js
│   ├── main.css
│   └── styles.css
└── .github/
    └── workflows/
        └── deploy.yml
```

The current MVP is intentionally a single-page site. If the project grows, extract `Home`, `Projects`, `CaseStudy`, and `Contact` into Astro or React routes while keeping the content model below.

### Data model / CMS approach

Use a JSON or headless CMS record shaped like:

```json
{
  "slug": "enterprise-rag",
  "title": "Enterprise RAG / AI Search Platform",
  "category": "AI search · RAG",
  "summary": "Retrieval and generation with measurable grounding.",
  "status": "evidence-backed",
  "stack": ["Python", "FastAPI", "React"],
  "sections": {
    "challenge": "...",
    "approach": "...",
    "measure": "..."
  },
  "links": {
    "repo": null,
    "demo": null
  }
}
```

`status` should distinguish `evidence-backed`, `research-proposed`, and `needs-verification` so the publishing workflow cannot accidentally turn a proposal into an achieved result.

## Implementation and deployment runbook

### Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Update `index.html` for content and `src/styles.css` for visual changes.

### Build for production

```bash
npm run build
npm run preview
```

The deployable static output is in `dist/`.

### Publish with GitHub Pages

1. Confirm the published email, GitHub, LinkedIn, portfolio, and LeetCode links.
2. Add any approved testimonial details and public project/demo links.
3. Push the repository to GitHub with the default branch named `main`.
4. In **Settings → Pages**, select **GitHub Actions** as the source.
5. Push to `main`; the workflow builds and deploys `dist/`.
6. For a custom domain, add the domain in Pages settings, create the provider-recommended DNS `A`/`CNAME` records, then verify HTTPS.

## Accessibility and quality checklist

- [x] Semantic `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks.
- [x] Skip link and a logical heading hierarchy.
- [x] All navigation and controls work with keyboard input.
- [x] Visible `:focus-visible` treatment with a high-contrast outline.
- [x] Mobile navigation exposes state through `aria-expanded` and `aria-controls`.
- [x] Link text is meaningful without relying on icons.
- [x] Color is not the only way information is conveyed.
- [ ] Run axe or Lighthouse against the production URL.
- [ ] Check contrast after any palette change (WCAG AA: 4.5:1 normal text, 3:1 large text).
- [ ] Test at 200% zoom, 320px width, keyboard-only navigation, and reduced-motion preference.
- [ ] Add descriptive `alt` text if project evidence images are added.
- [x] Add verified email, profile links, portrait, and project evidence images from the source document.
- [ ] Add a résumé PDF and credential URLs if you want recruiters to download or verify them directly.

## Pre-launch content QA

- Confirm current degree year, CGPA, coding-problem count, and internship dates.
- Confirm which projects are independent versus overlapping variants.
- Verify every certification issuer, date, credential ID, and URL.
- Add only achieved metrics; label research targets and expected outcomes as proposed.
- Confirm email, social profiles, résumé link, and any testimonial consent before launch.
