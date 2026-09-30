# Trial Portfolio — QA Checklist

This document contains internal QA notes and validation tasks. It is intentionally kept separate from the visitor-facing README.

## Repository checks

- [x] Home and role-aware routing are implemented.
- [x] Six role profiles are defined.
- [x] Haya assistant integration is present.
- [x] Contact form integration is present.
- [x] Role-specific resume files are referenced.
- [x] Trial-specific canonical, robots, and sitemap configuration is present.
- [x] Haya browser caching is implemented.
- [x] Haya model routing is implemented.
- [x] Haya Worker grounding and model allowlisting are implemented.
- [x] Haya request-length validation is implemented.
- [x] Haya per-IP rate limiting is implemented in Worker memory.
- [x] Haya prompt-injection policy tests are present.

## Accessibility

- [x] Semantic landmarks and skip link.
- [x] Haya message log uses `role="log"` and `aria-live="polite"`.
- [x] Haya input has an accessible label.
- [x] Haya open/close controls expose accessible names.
- [x] Escape closes Haya.
- [x] Focus returns to the Haya toggle after close.
- [x] User message contrast uses a dark background with white text.
- [x] Reduced-motion handling is present.
- [ ] Run axe against the deployed page.
- [ ] Test keyboard-only navigation end-to-end.
- [ ] Test 200% zoom.
- [ ] Test 320px, 375px, 390px, and 430px widths.

## SEO

- [x] Static identity content in initial HTML.
- [x] Static role summary in initial HTML.
- [x] Static project titles in initial HTML.
- [x] Static contact details in initial HTML.
- [x] Title and meta description.
- [x] Canonical URL.
- [x] Open Graph metadata.
- [x] Twitter metadata.
- [x] Person JSON-LD.
- [x] robots.txt.
- [x] sitemap.xml.
- [ ] Validate metadata with deployed-page tools.

## Haya security

- [x] CORS restricted to the GitHub Pages origin.
- [x] POST-only Worker endpoint.
- [x] Request body size limit.
- [x] Per-message length limit.
- [x] Message-count limit.
- [x] Per-IP rate limiting.
- [x] Prompt-injection rejection.
- [x] Profile-JSON grounding.
- [x] Server-side model allowlist.
- [x] API key remains server-side.
- [ ] Deploy the updated Worker to Cloudflare and verify the live endpoint.
- [ ] Run the policy test script in an environment with repository access.

## Case-study evidence

- [x] Four case studies are explicitly represented.
- [x] Problem field added.
- [x] My-role field reflects verified solo-development ownership where applicable.
- [x] Stack field added.
- [x] Measured-result field added.
- [x] TODOs used where evidence is missing.
- [x] Repository links included where verified.
- [x] Existing evidence-status framing preserved.
- [ ] Replace result TODOs with measured results where available.

## Performance

- [x] Browser response cache.
- [x] Cloudflare cache code.
- [x] Deterministic local answers for common factual queries.
- [x] Active-role-only context.
- [x] Fast/strong model routing.
- [x] Reduced conversation history.
- [ ] Deploy Worker cache changes.
- [ ] Add streaming response handling.
- [ ] Add request deduplication if needed.
- [ ] Run Lighthouse mobile against the deployed build.

## Important verification limitation

Repository changes can be inspected from source, but they do not prove deployed browser behavior. Final Lighthouse, axe, live Formspree, live Haya, Cloudflare Worker deployment, and visual regression checks must be performed against the deployed site.
